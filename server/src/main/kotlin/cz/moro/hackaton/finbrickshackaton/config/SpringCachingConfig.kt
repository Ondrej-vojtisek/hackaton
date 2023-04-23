package cz.moro.hackaton.finbrickshackaton.config

import mu.KotlinLogging
import org.springframework.boot.autoconfigure.cache.CacheManagerCustomizer
import org.springframework.cache.CacheManager
import org.springframework.cache.annotation.CacheEvict
import org.springframework.cache.annotation.EnableCaching
import org.springframework.cache.concurrent.ConcurrentMapCacheManager
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled


@Configuration
@EnableScheduling
@EnableCaching
class SpringCachingConfig {

    private val log = KotlinLogging.logger { }

    companion object {
        const val HINTS = "hints"
    }

    @Bean
    fun cacheManager(): CacheManager {
        return ConcurrentMapCacheManager(HINTS)
    }

    @Bean
    fun customSpringCache(): CacheManagerCustomizer<ConcurrentMapCacheManager> {
        return CacheManagerCustomizer<ConcurrentMapCacheManager> { cacheManager ->
            cacheManager.setCacheNames(listOf(HINTS))
        }
    }

    @CacheEvict(value = [HINTS], allEntries = true)
    @Scheduled(fixedRateString = "\${hint.cache}")
    fun emptyHintsCache() {
        // TODO schedule caching on backand to avoid waiting on front-end
        log.trace { "Emptying $HINTS cache" }
    }
}