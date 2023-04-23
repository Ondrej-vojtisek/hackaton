package cz.moro.hackaton.finbrickshackaton.ai

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.ObjectMapper

@SuppressWarnings("ConstructorParameterNaming")
data class ChatRequest(
    val model: String = "gpt-3.5-turbo",
    val messages: List<Message>,
    val temperature: Double = 0.0,
    @JsonProperty("top_p")
    val top_p: Int = 1
) {
    data class Message(
        val role: String,
        val content: String
    )

    fun convertToJsonString() = ObjectMapper().writeValueAsString(this).trimIndent()
}