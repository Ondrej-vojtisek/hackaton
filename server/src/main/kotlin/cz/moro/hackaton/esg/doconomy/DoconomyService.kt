package cz.moro.hackaton.esg.doconomy

import cz.moro.hackaton.finbrickshackaton.domain.ProductCategories
import mu.KotlinLogging
import org.springframework.stereotype.Service
import kotlin.random.Random

@Service
@SuppressWarnings("MagicNumber")
class DoconomyService {

    val log = KotlinLogging.logger { }
    fun identifyFootPrint(
        amount: Double?,
        mcc: ProductCategories
    ): DoconomyResponse {
        log.debug {
            "Sending request to Doconomy. Amount: [$amount], mcc:[$mcc]"
        }
        // call Doconomy API here
        return DoconomyResponse(
            waterConsumption = Random.nextDouble(7.0, 20.0),
            co2Consumtion = Random.nextDouble(20.0, 100.0)
        ).also {
            log.debug {
                "Received Response from Doconomy." +
                        " CO2: [${it.co2Consumtion}], water:[${it.waterConsumption}]"
            }
        }
    }

    data class DoconomyResponse(
        val waterConsumption: Double,
        val co2Consumtion: Double
    )
}