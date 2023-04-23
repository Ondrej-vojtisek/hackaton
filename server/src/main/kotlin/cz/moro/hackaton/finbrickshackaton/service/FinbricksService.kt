package cz.moro.hackaton.finbrickshackaton.service

import cz.moro.hackaton.finbrickshackaton.entity.User
import cz.moro.hackaton.finbrickshackaton.entity.transactions.Page
import cz.moro.hackaton.finbrickshackaton.finbricks.helper.JWSSigner
import cz.moro.hackaton.util.JsonUtil
import mu.KotlinLogging
import org.json.JSONObject
import org.slf4j.MDC
import org.springframework.stereotype.Service
import java.net.URI
import java.net.URLEncoder
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

@Service
class FinbricksService {

    private val log = KotlinLogging.logger {}

    companion object {
        const val FINBRICKS_JWS_HEADER: String = "JWS-Signature"
        const val MERCHANT_ID = "merchantId"
        const val MERCHANT_ID_VALUE = "PLACEHOLDER"
        const val CLIENT_ID = "clientId"
        const val CLIENT_ID_VALUE = "hackathon"
        const val CALLBACK_URL = "callbackUrl"
        const val CALLBACK_URL_VALUE = "https://hackaton.morosystems.cloud"
        const val API_URL = "https://api.sandbox.finbricks.com"

        // API endpoints
        const val API_AUTHENTICATE = "/auth/authenticate";
        const val API_STATUS_PAYMENT_PROVIDERS = "/status/paymentProviders";
        const val API_ACCOUNT_TRANSACTIONS = "/account/transactions";
        const val API_ACCOUNT_LIST = "/account/list";

        const val PAYMENT_PROVIDER_VALUE = "PLACEHOLDER"
        const val BANK_ACCOUNT_ID_VOJTISEK = "PLACEHOLDER"

        const val EMPTY_BODY = ""
    }

    // Cache user data for demonstration
    val user: User = callAccountList()

    // POST CALL
    fun callApiAuthenticate(): User {
        val body = prepareApiAuthenticateBody();
        val jwsData = JWSSigner.JWSData(API_AUTHENTICATE, body);
        val result = JWSSigner.signJws(jwsData, MERCHANT_ID_VALUE);

        val client = HttpClient.newBuilder().build();
        val request = HttpRequest.newBuilder()
            .uri(URI.create("${API_URL}${API_AUTHENTICATE}"))
            .POST(HttpRequest.BodyPublishers.ofString(body))
            .setHeader(FINBRICKS_JWS_HEADER, result)
            .setHeader("Content-Type", "application/json")
            .build()
        val response = client.send(request, HttpResponse.BodyHandlers.ofString());
        log.info(response.body())

        val user = User()

        return user
    }

    fun prepareApiAuthenticateBody(): String {
        val jsonObject = JSONObject()
        jsonObject.put(MERCHANT_ID, MERCHANT_ID_VALUE)
        jsonObject.put(CLIENT_ID, CLIENT_ID_VALUE)
        jsonObject.put("provider", PAYMENT_PROVIDER_VALUE)
        jsonObject.put("scope", "AISP")
        jsonObject.put(CALLBACK_URL, CALLBACK_URL_VALUE)
        return jsonObject.toString()
    }

    // GET CALL
    final fun callAccountList(): User {

        val params = mapOf(
            MERCHANT_ID to MERCHANT_ID_VALUE, CLIENT_ID to CLIENT_ID_VALUE,
            "paymentProvider" to PAYMENT_PROVIDER_VALUE
        )
        val urlParams = prepareUrlParams(params);

        val body = EMPTY_BODY
        val jwsData = JWSSigner.JWSData("${API_ACCOUNT_LIST}?${urlParams}", body);
        val result = JWSSigner.signJws(jwsData, MERCHANT_ID_VALUE);

        val preparedUrl = "${API_URL}${API_ACCOUNT_LIST}?${urlParams}"

        val client = HttpClient.newBuilder().build();
        val request = HttpRequest.newBuilder()
            .uri(URI.create(preparedUrl)).setHeader("JWS-Signature", result)
            .build();

        val response = client.send(request, HttpResponse.BodyHandlers.ofString());

        val jsonObj = JSONObject(response.body())
        val accountsArray = jsonObj.getJSONArray("accounts")

        val user = User()

        for (i in 0 until accountsArray.length()) {
            val accountObj = accountsArray.getJSONObject(i)
            if (accountObj.getString("id") == BANK_ACCOUNT_ID_VOJTISEK) {
                user.setFromJson(accountObj)
                break
            }
        }
        return user
    }

    // GET CALL
    fun callAccountTransactions(userId: String): Page {
        MDC.put("USER", userId)
        val params = mapOf(
            MERCHANT_ID to MERCHANT_ID_VALUE, CLIENT_ID to CLIENT_ID_VALUE,
            "paymentProvider" to PAYMENT_PROVIDER_VALUE, "bankAccountId" to BANK_ACCOUNT_ID_VOJTISEK
        )
        val urlParams = prepareUrlParams(params);

        val body = EMPTY_BODY
        val jwsData = JWSSigner.JWSData("${API_ACCOUNT_TRANSACTIONS}?${urlParams}", body);
        val result = JWSSigner.signJws(jwsData, MERCHANT_ID_VALUE);

        val preparedUrl = "${API_URL}${API_ACCOUNT_TRANSACTIONS}?${urlParams}"

        val client = HttpClient.newBuilder().build();
        val request = HttpRequest.newBuilder()
            .uri(URI.create(preparedUrl)).setHeader("JWS-Signature", result)
            .build();

        val response = client.send(request, HttpResponse.BodyHandlers.ofString());
        log.debug { response.body() }
        return JsonUtil.jsonToClass(response.body(), Page::class.java).also {
            MDC.clear()
        }
    }

    // GET CALL
    fun callApiStatus(): HttpResponse<String> {
        val params = mapOf(MERCHANT_ID to MERCHANT_ID_VALUE)
        val urlParams = prepareUrlParams(params);

        val body = EMPTY_BODY
        val jwsData = JWSSigner.JWSData("${API_STATUS_PAYMENT_PROVIDERS}?${urlParams}", body);
        val result = JWSSigner.signJws(jwsData, MERCHANT_ID_VALUE);

        val preparedUrl = "${API_URL}${API_STATUS_PAYMENT_PROVIDERS}?${urlParams}"

        val client = HttpClient.newBuilder().build();
        val request = HttpRequest.newBuilder()
            .uri(URI.create(preparedUrl)).setHeader("JWS-Signature", result)
            .build();

        val response = client.send(request, HttpResponse.BodyHandlers.ofString());
        log.info(response.body())
        return response
    }

    fun prepareUrlParams(params: Map<String, String>): String {
        return params.map { (k, v) -> "${(k.utf8())}=${v.utf8()}" }
            .joinToString("&");
    }

    fun String.utf8(): String = URLEncoder.encode(this, "UTF-8")

}