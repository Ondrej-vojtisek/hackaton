package cz.moro.hackaton.finbrickshackaton.controller

import cz.moro.hackaton.finbrickshackaton.entity.transactions.Page
import cz.moro.hackaton.finbrickshackaton.service.FinbricksService
import io.swagger.v3.oas.annotations.responses.ApiResponse
import mu.KotlinLogging
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class FinbricksController(private val finbricksService: FinbricksService) {

    private val logger = KotlinLogging.logger {}

    @GetMapping("/transactions")
    @ApiResponse(responseCode = "404", description = "Not Found")
    fun getTransactions(): ResponseEntity<Page> {
        // Dummy user
        return ResponseEntity.ok().body(finbricksService.callAccountTransactions("86849"))
    }

    @GetMapping("/owner")
    @ApiResponse(responseCode = "404", description = "Not Found")
    fun getOwner(): ResponseEntity<String> {
        return ResponseEntity<String>(finbricksService.user.getAsJson(), HttpStatus.OK)
    }
}