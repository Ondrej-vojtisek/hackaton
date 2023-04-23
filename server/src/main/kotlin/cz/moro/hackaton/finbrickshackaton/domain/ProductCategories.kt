package cz.moro.hackaton.finbrickshackaton.domain

enum class ProductCategories {
    LIVING,
    GIFTS,
    HOUSEHOLD_ITEMS,
    TRANSPORTATION,
    VACATION,
    HOME,
    SHOPPING,
    DOG,
    INSURANCE,
    RESTAURANTS,
    SERVICES,
    WEDDING,
    TELEPHONE,
    CASH_WITHDRAWAL,
    ENTERTAINMENT,
    FUN,
    BANKING,
    UNKNOWN;

    companion object {
        fun createListString(): String {
            return "Product categories: '{${serializableCategories()}}'"
        }

        private fun serializableCategories(): String {
            val categories: StringBuilder = StringBuilder()
            ProductCategories.values().forEach {
                categories.append("${it.name}, ")
            }
            return categories.toString().substring(0, categories.length - 2)
        }
    }
}