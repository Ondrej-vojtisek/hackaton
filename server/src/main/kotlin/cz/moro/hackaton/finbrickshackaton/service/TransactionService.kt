package cz.moro.hackaton.finbrickshackaton.service

import cz.moro.hackaton.esg.doconomy.DoconomyService
import cz.moro.hackaton.esg.engine.EsgEngine
import cz.moro.hackaton.finbrickshackaton.entity.graph.GraphTransaction
import cz.moro.hackaton.finbrickshackaton.entity.transactions.Transaction
import cz.moro.hackaton.finbrickshackaton.mapping.TransactionMapper
import org.springframework.stereotype.Service

@Service
class TransactionService(
    doconomyService: DoconomyService,
    esgEngine: EsgEngine
) {

    val transactionMapper = TransactionMapper(doconomyService, esgEngine)

    @SuppressWarnings("MagicNumber")
    fun refactorFinBricksTrxToGraphTrx(
        transactions: List<Transaction>
    ): List<GraphTransaction> {
        return transactions.map {
            transactionMapper.mapFinBrickTransactionToGraph(it)
        }
    }
}