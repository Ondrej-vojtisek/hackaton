package cz.moro.hackaton.finbrickshackaton.controller

import cz.moro.hackaton.codebook.MccCode
import io.swagger.v3.oas.annotations.responses.ApiResponse
import mu.KotlinLogging
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/codebook")
class CodebookController {

    private val logger = KotlinLogging.logger {}

    @GetMapping("/mcc")
    @ApiResponse(responseCode = "404", description = "Not Found")
    fun getMcc(): ResponseEntity<String> {
        return ResponseEntity.ok().body(MccCode.getAllAsJson())
    }

}