@file:SuppressWarnings("all")

package cz.moro.hackaton.finbrickshackaton.ai

import com.fasterxml.jackson.annotation.JsonProperty

class ChatResponse {
    var id: String? = null

    @JsonProperty("object")
    var obj: String? = null
    var created: String? = null
    var model: String? = null
    var usage: Usage? = null
    var choices: List<Choice>? = null

    class Usage {
        var prompt_tokens: Int? = null
        var completion_tokens: Int? = null
        var total_tokens: Int? = null
    }

    class Choice {
        var message: Message? = null
        var finish_reason: String? = null
        var index: Int? = null
    }

    class Message {
        val role: String? = null
        val content: String? = null
    }
}
