package cz.moro.hackaton.finbrickshackaton.controller

import cz.moro.hackaton.finbrickshackaton.entity.graph.GraphTransaction
import cz.moro.hackaton.finbrickshackaton.service.FinbricksService
import cz.moro.hackaton.finbrickshackaton.service.TransactionService
import jakarta.annotation.PostConstruct
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TransactionController(
    private val transactionService: TransactionService,
    private val finBricksService: FinbricksService
) {

    private var transactions: List<GraphTransaction>? = emptyList()

    @PostConstruct
    fun loadTransactions() {
        // Cache transactions for demonstration
        // Dummy user
        transactions = finBricksService.callAccountTransactions("89756")
            .transactions?.let {
                transactionService.refactorFinBricksTrxToGraphTrx(it)
            }
    }


    @GetMapping("/transactions/all", produces = ["application/json;charset=UTF-8"])
    fun publishTransactions(): ResponseEntity<List<GraphTransaction>> {
        return ResponseEntity.ok().body(transactions)
    }
}
