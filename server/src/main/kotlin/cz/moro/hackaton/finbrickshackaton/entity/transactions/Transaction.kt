package cz.moro.hackaton.finbrickshackaton.entity.transactions

class Transaction {
    var entryReference: String? = null
    var amount: Amount? = null
    var creditDebitIndicator: String? = null
    var reversalIndicator = false
    var status: String? = null
    var bookingDate: BookingDate? = null
    var valueDate: ValueDate? = null
    var bankTransactionCode: BankTransactionCode? = null
    var entryDetails: EntryDetails? = null


    class Amount {
        var value = 0.0
        var currency: String? = null
    }

    class AmountDetails {
        var instructedAmount: InstructedAmount? = null
    }

    class BankTransactionCode {
        var proprietary: Proprietary? = null
    }

    class BookingDate {
        var date: String? = null
    }

    class ClearingSystemMemberIdentification {
        var memberIdentification: String? = null
    }

    class Creditor {
        var name: String? = null
        var postalAddress: PostalAddress? = null
    }

    class DebtorAccount {
        var identification: Identification? = null
        var currency: String? = null
        var name: String? = null
    }

    class DebtorAgent {
        var financialInstitutionIdentification: FinancialInstitutionIdentification? = null
    }

    class EntryDetails {
        var transactionDetails: TransactionDetails? = null
    }

    class FinancialInstitutionIdentification {
        var bic: String? = null
        var clearingSystemMemberIdentification: ClearingSystemMemberIdentification? = null
        var name: String? = null
        var postalAddress: PostalAddress? = null
        var other: Other? = null
    }

    class Identification {
        var iban: String? = null
        var other: Other? = null
    }

    class InstructedAmount {
        var amount: Amount? = null
    }

    class Other {
        var identification: String? = null
    }

    class PostalAddress {
        var addressLine: String? = null
    }

    class Proprietary {
        var code: String? = null
        var issuer: String? = null
    }

    class References {
        var chequeNumber: String? = null
        var clearingSystemReference: String? = null
    }

    class RelatedAgents {
        var debtorAgent: DebtorAgent? = null
    }

    class RelatedParties {
        var debtorAccount: DebtorAccount? = null
        var creditor: Creditor? = null
    }

    class Root {
        var transactions: ArrayList<Transaction>? = null
    }

    class TransactionDetails {
        var references: References? = null
        var amountDetails: AmountDetails? = null
        var relatedParties: RelatedParties? = null
        var relatedAgents: RelatedAgents? = null
        var additionalTransactionInformation: String? = null
    }

    class ValueDate {
        var date: String? = null
    }
}

