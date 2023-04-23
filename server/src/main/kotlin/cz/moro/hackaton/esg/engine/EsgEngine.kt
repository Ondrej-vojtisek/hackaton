package cz.moro.hackaton.esg.engine

import cz.moro.hackaton.esg.doconomy.DoconomyService
import cz.moro.hackaton.finbrickshackaton.domain.ProductCategories
import mu.KotlinLogging
import org.springframework.stereotype.Service
import kotlin.random.Random

@Service
@SuppressWarnings("MagicNumber")
class EsgEngine {

    val log = KotlinLogging.logger { }
    fun countEsgScore(
        doconomyResponse: DoconomyService.DoconomyResponse,
        amount: Double?,
        categories: ProductCategories
    ): Int {
        // Count ESG Score here by given algorithm
        log.debug { "Counting ESG score for given transaction." }
        log.debug { "[$doconomyResponse], [$amount], [$categories]" }
        return Random.nextInt(3, 10)
    }
}