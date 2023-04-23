package cz.moro.hackaton.finbrickshackaton.entity

import org.json.JSONObject


class User {
    var accountNumber: String? = null
    var iban: String? = null
    var currency: String? = null
    var countryCode: String? = null
    var productName: String? = null
    var ownerName: String? = null

    override fun toString(): String {
        return "User(accountNumber=$accountNumber, iban=$iban, currency=$currency, countryCode=$countryCode, productName=$productName, ownerName=$ownerName)"
    }

    fun getAsJson(): String {
        val jsonObject = JSONObject()
        jsonObject.put("accountNumber", this.accountNumber)
        jsonObject.put("iban", this.iban)
        jsonObject.put("currency", this.currency)
        jsonObject.put("countryCode", this.countryCode)
        jsonObject.put("productName", this.productName)
        jsonObject.put("ownerName", this.ownerName)

        return jsonObject.toString()
    }

    fun setFromJson(accountObject: JSONObject): User {
        this.accountNumber = accountObject.getJSONObject("identification").getString("accountNumber")
        this.iban = accountObject.getJSONObject("identification").getString("iban")
        this.currency = accountObject.getString("currency")
        this.countryCode = accountObject.getJSONObject("servicer").getString("countryCode")
        this.productName = accountObject.getString("productName")
        this.ownerName = accountObject.getJSONArray("ownersNames").get(0).toString()
        return this
    }

}