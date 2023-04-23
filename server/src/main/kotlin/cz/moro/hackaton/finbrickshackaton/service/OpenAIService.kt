package cz.moro.hackaton.finbrickshackaton.service

import com.fasterxml.jackson.databind.ObjectMapper
import cz.moro.hackaton.finbrickshackaton.ai.ChatRequest
import cz.moro.hackaton.finbrickshackaton.ai.ChatResponse
import cz.moro.hackaton.finbrickshackaton.config.ServerProperties
import mu.KotlinLogging
import org.springframework.stereotype.Service
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

@Service
class OpenAIService(private val serverProperties: ServerProperties) {

    private val log = KotlinLogging.logger { }

    fun sendRequestToOpenAPI(
        message: String,
        temperature: Double
    ): String {
        val httpClient = HttpClient
            .newBuilder()
            .connectTimeout(serverProperties.connectionTimeout)
            .build()

        val request = HttpRequest.newBuilder()
            .uri(URI.create(serverProperties.openAiUrl))
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer ${serverProperties.openAiToken}")
            .POST(buildRequestBody(message, temperature))
            .timeout(serverProperties.readTimeout)
            .build()

        val response = httpClient.send(request, HttpResponse.BodyHandlers.ofString())

        log.debug { "Response Code : ${response.statusCode()}" }
        log.debug { "Response Body : ${response.body()}" }

        return processResponse(response.body())
            ?: "No response from ChatBot received."
    }

    private fun processResponse(jsonResponse: String): String? {
        val json = ObjectMapper().readValue(jsonResponse, ChatResponse::class.java)
        return json.choices?.firstOrNull()?.message?.content
    }

    private fun buildRequestBody(
        messages: String,
        temperature: Double
    ) = HttpRequest.BodyPublishers.ofString(
        ChatRequest(
            model = "gpt-3.5-turbo",
            messages = arrayListOf(buildMessage(messages)),
            temperature = temperature
        ).convertToJsonString().also {
            log.debug { it }
        }
    )

    private fun buildMessage(
        message: String
    ): ChatRequest.Message {
        return ChatRequest.Message("user", message)
    }
}