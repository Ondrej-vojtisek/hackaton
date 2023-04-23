package cz.moro.hackaton.finbrickshackaton

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import cz.moro.hackaton.finbrickshackaton.entity.transactions.Page
import cz.moro.hackaton.finbrickshackaton.entity.transactions.Transaction
import org.junit.jupiter.api.Test

class OverAllTest {

    @Test
    fun testIt() {
        val json = Thread.currentThread()
            .contextClassLoader.getResource("transaction.json")?.readText()
        ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
            .readValue(json, Transaction::class.java).also {
                println(it.entryDetails?.transactionDetails?.relatedParties?.creditor?.name)
            }
    }

    @Test
    fun testIt2() {
        val json = Thread.currentThread()
            .contextClassLoader.getResource("listOfTransactions.json")?.readText()

        ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false).readValue(json, Page::class.java)
            .also { println(it?.transactions?.firstOrNull()?.amount) }
    }
}