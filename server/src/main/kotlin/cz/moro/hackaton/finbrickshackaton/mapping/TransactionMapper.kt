package cz.moro.hackaton.finbrickshackaton.mapping

import cz.moro.hackaton.esg.doconomy.DoconomyService
import cz.moro.hackaton.esg.engine.EsgEngine
import cz.moro.hackaton.finbrickshackaton.domain.EsgMerchants
import cz.moro.hackaton.finbrickshackaton.domain.ProductCategories
import cz.moro.hackaton.finbrickshackaton.entity.graph.GraphTransaction
import cz.moro.hackaton.finbrickshackaton.entity.transactions.Transaction

@SuppressWarnings("MagicNumber")
class TransactionMapper(
    private val doconomyService: DoconomyService,
    private val esgEngine: EsgEngine
) {

    fun mapFinBrickTransactionToGraph(
        finTrx: Transaction
    ): GraphTransaction {
        return GraphTransaction().apply {
            referenceNumber = finTrx.entryReference
            amount = handleAmount(finTrx)
            currency = finTrx.amount?.currency
            dateTime = finTrx.valueDate?.date
            merchant = merchantName(finTrx.entryDetails?.transactionDetails?.relatedParties)
            handleEsgScore(finTrx, this)
            handleCreditor(finTrx.entryDetails?.transactionDetails?.relatedParties?.creditor, this)
        }
    }

    private fun merchantName(
        relatedParties: Transaction.RelatedParties?
    ) = if (relatedParties?.creditor?.name != null) {
        relatedParties.creditor?.name
    } else {
        relatedParties?.debtorAccount?.name
    }

    private fun handleEsgScore(
        finTrx: Transaction,
        graphTransaction: GraphTransaction
    ) {
        // val category = finTrx?.mcc?.value
        val footPrint = doconomyService.identifyFootPrint(
            finTrx.amount?.value, ProductCategories.UNKNOWN
        )
        val esgScore = esgEngine.countEsgScore(
            footPrint,
            finTrx.amount?.value,
            ProductCategories.UNKNOWN,
        )
        graphTransaction.waterConsumption = footPrint.waterConsumption
        graphTransaction.co2Consumption = footPrint.co2Consumtion
        graphTransaction.esgScore = esgScore
    }

    private fun handleCreditor(
        creditor: Transaction.Creditor?,
        graphTransaction: GraphTransaction
    ) {
        if (!EsgMerchants.isPartner(creditor?.name)) {
            return
        }
        graphTransaction.isPartner = true
        creditor?.name?.let {
            EsgMerchants.getEsgMerchantByName(it).also { merchant ->
                graphTransaction.merchantEsgDescription = merchant.description
                graphTransaction.esgScore = merchant.actualEsgIndex
                if (merchant.category != null) {
                    graphTransaction.category = merchant.category
                }
            }
        }
    }

    private fun handleAmount(finTrx: Transaction): Double? {
        return if (isIncomingTransaction(finTrx)) {
            finTrx.amount?.value
        } else {
            finTrx.amount?.value!! * -1
        }
    }

    private fun isIncomingTransaction(finTrx: Transaction): Boolean {
        return finTrx.entryDetails?.transactionDetails?.relatedParties?.creditor == null
    }
}