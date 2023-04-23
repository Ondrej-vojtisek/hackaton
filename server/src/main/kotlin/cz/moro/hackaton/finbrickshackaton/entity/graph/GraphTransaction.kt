package cz.moro.hackaton.finbrickshackaton.entity.graph

import cz.moro.hackaton.finbrickshackaton.domain.ProductCategories

class GraphTransaction {

    var referenceNumber: String? = null
    var amount: Double? = null
    var currency: String? = "CZK"
    var merchant: String? = ""
    var dateTime: String? = ""
    var waterConsumption: Double? = null
    var co2Consumption: Double? = null
    var esgScore: Int? = 0
    var isPartner: Boolean = false
    var merchantEsgDescription: String = ""
    var category: ProductCategories? = ProductCategories.SERVICES
}