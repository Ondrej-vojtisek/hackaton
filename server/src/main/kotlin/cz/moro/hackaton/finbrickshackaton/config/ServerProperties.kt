package cz.moro.hackaton.finbrickshackaton.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import java.time.Duration

@Configuration
@ConfigurationProperties(prefix = "esg.api")
class ServerProperties {

    var openAiToken: String? = null
    var openAiUrl: String = ""
    var connectionTimeout: Duration? = null
    var readTimeout: Duration? = null
}