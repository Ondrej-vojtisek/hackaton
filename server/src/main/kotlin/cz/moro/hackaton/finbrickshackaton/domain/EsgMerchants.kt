package cz.moro.hackaton.finbrickshackaton.domain

import cz.moro.hackaton.finbrickshackaton.domain.ProductCategories.BANKING
import cz.moro.hackaton.finbrickshackaton.domain.ProductCategories.HOUSEHOLD_ITEMS
import cz.moro.hackaton.finbrickshackaton.domain.ProductCategories.RESTAURANTS
import cz.moro.hackaton.finbrickshackaton.domain.ProductCategories.TRANSPORTATION
import cz.moro.hackaton.finbrickshackaton.entity.EsgMerchant

@SuppressWarnings("all")
enum class EsgMerchants(private val merchantData: EsgMerchant) {
    ALBERT(
        EsgMerchant().apply {
            merchantId = "1156165"
            merchantName = "Albert, s.r.o."
            actualEsgIndex = 8
            category = HOUSEHOLD_ITEMS
            description =
                "Shopping at a food shop that prioritizes locally sourced, organic, and package-free goods can greatly reduce your carbon footprint and support sustainable agriculture."
        }),
    AIR_BANK(
        EsgMerchant().apply {
            merchantId = "1156999"
            merchantName = "Air Bank"
            actualEsgIndex = 9
            category = BANKING
            description =
                "Air Bank is committed to reducing its carbon footprint by using renewable energy, implementing energy-efficient measures in its branches, and offering paperless banking options. We strive to promote sustainability and support eco-friendly initiatives for a better future."
        }),
    SHELL(
        EsgMerchant().apply {
            merchantId = "1156156"
            merchantName = "Shell Co."
            actualEsgIndex = 4
            category = TRANSPORTATION
            description =
                "Our gas station company helps with ecological and social problems by offering electric vehicle charging stations, promoting fuel-efficient driving, and investing in renewable energy. We also support local communities by providing job opportunities and supporting charitable causes."
        }),
    MC_DONALD_S(
        EsgMerchant().apply {
            merchantId = "1251156"
            merchantName = "McDonald's"
            actualEsgIndex = 6
            category = RESTAURANTS
            description =
                "McDonald's has made efforts to address ecological and social problems by setting sustainability goals to reduce its carbon footprint, sourcing coffee and palm oil sustainably, and investing in renewable energy. The company also supports local communities through education, employment, and charity initiatives."
        }),
    CESKE_DRAHY_ESHOP(
        EsgMerchant().apply {
            merchantId = "1251000"
            merchantName = "www.cd.cz/eshop/"
            actualEsgIndex = 7
            category = TRANSPORTATION
            description =
                "Ceske Drahy, the Czech national railway operator, has implemented measures to reduce its carbon footprint, including investing in energy-efficient locomotives and promoting eco-friendly travel. The company also supports local communities through employment opportunities and offers special services for passengers with disabilities."
        }),
    FOODORA(
        EsgMerchant().apply {
            merchantId = "1251000"
            merchantName = "KOSIK.CZ S.R.O."
            actualEsgIndex = 7
            category = HOUSEHOLD_ITEMS
            description =
                "KosikCZ is committed to reducing its carbon footprint by implementing more sustainable practices. They use eco-friendly packaging, prioritize deliveries made by bike or on foot, and partner with environmentally conscious restaurants. Their efforts demonstrate a dedication to both quality food and a healthy planet."
        }),
    UNKNOWN(
        EsgMerchant().apply {
            merchantId = "0000000"
            merchantName = "UNKNOWN"
            actualEsgIndex = 0
            description = ""
        });

    companion object {
        fun getEsgMerchantByName(name: String): EsgMerchant {
            return EsgMerchants.values().firstOrNull {
                it.merchantData.merchantName == name
            }?.merchantData ?: UNKNOWN.merchantData
        }

        fun isPartner(
            name: String?
        ) = EsgMerchants.values().map { it.merchantData.merchantName }.contains(name)
    }

}