package cz.moro.hackaton.finbrickshackaton.service

import cz.moro.hackaton.finbrickshackaton.config.SpringCachingConfig.Companion.HINTS
import cz.moro.hackaton.finbrickshackaton.domain.HintPrompts
import cz.moro.hackaton.finbrickshackaton.domain.ProductCategories
import mu.KotlinLogging
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class AiPromptService(private val openAIService: OpenAIService) {

    companion object {
        private const val TEMPERATURE_ZERO = 0.0
    }

    private val log = KotlinLogging.logger { }

    fun categorizeSingleCompany(companyName: String): ProductCategories {
        val start = "Choose your response only from this ENUM list:"
        val request = "else response 'UNKNOWN'. Which ENUM suits best for this company: "
        val requestEnd = "Maximum response is just one word."
        return try {
            ProductCategories.valueOf(
                openAIService.sendRequestToOpenAPI(
                    "$start ${ProductCategories.createListString()} $request $companyName, $requestEnd",
                    TEMPERATURE_ZERO
                )
            )
        } catch (ex: IllegalArgumentException) {
            log.debug(ex) { "Unknown company categorization received." }
            ProductCategories.UNKNOWN
        }
    }

    @Cacheable(HINTS)
    fun callForHint(): String {
        return openAIService.sendRequestToOpenAPI(
            HintPrompts.giveMeRandomPrompt(), 1.0
        ).replace("\"\"", "", true)
    }
}