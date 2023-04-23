package cz.moro.hackaton.finbrickshackaton.entity

import cz.moro.hackaton.finbrickshackaton.domain.ProductCategories
import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
class EsgMerchant {

    @Id
    var merchantId: String = ""
    var merchantName: String = ""
    var actualEsgIndex: Int? = 0
    var description: String = ""
    var category: ProductCategories? = null
}