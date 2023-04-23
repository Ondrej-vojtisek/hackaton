package cz.moro.hackaton.finbrickshackaton.controller

import cz.moro.hackaton.finbrickshackaton.service.AiPromptService
import cz.moro.hackaton.finbrickshackaton.service.OpenAIService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/ai")
class AiController(
    private val aiService: OpenAIService,
    private val aiPromptService: AiPromptService
) {

    @PostMapping("/question")
    fun requestOpenAi(@RequestBody question: String): ResponseEntity<String> {
        return ResponseEntity.ok().body(aiService.sendRequestToOpenAPI(question, 1.0))
    }

    @PostMapping("/categorize")
    fun categorizeCompany(@RequestBody question: String): ResponseEntity<String> {
        return ResponseEntity.ok().body(aiPromptService.categorizeSingleCompany(question).name)
    }

    @GetMapping("/hint")
    fun requestHint() = ResponseEntity.ok().body(aiPromptService.callForHint())

}