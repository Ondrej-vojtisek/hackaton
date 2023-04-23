package cz.moro.hackaton.util

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper

class JsonUtil private constructor() {

    companion object {
        fun <T> jsonToClass(json: String, clazz: Class<T>): T = ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
            .readValue(json, clazz)
    }
}