package cz.moro.hackaton.finbrickshackaton.domain

import kotlin.random.Random

enum class HintPrompts(private val prompt: String) {

    HAIKU_HINT("Give me haiku why we should be more ecological. Maximum is 30 words"),
    OPEN_BANKING_HINT("Give me hint how we can be more ecological through open-banking. Maximum is 40 words"),
    FUNNY_HINT("Give me funny hint how we can be more ecological. Maximum is 40 words"),
    SERIOUS_HINT("Give me funny hint how we can be more ecological. Maximum is 30 words"),
    PSD2_HINT("Give me hint why to use open-banking platforms. Maximum is 30 words");

    companion object {
        fun giveMeRandomPrompt(): String {
            HintPrompts.values().let {
                return it[Random.nextInt(0, it.size)].prompt
            }
        }
    }
}