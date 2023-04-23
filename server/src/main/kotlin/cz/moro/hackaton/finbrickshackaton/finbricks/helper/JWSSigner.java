package cz.moro.hackaton.finbrickshackaton.finbricks.helper;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.bouncycastle.util.encoders.Base64;
import org.jose4j.jws.JsonWebSignature;

import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;

public class JWSSigner {

    public static class JWSData {

        final String uri;
        final String body;

        public JWSData(String uri, String body) {
            this.uri = uri;
            this.body = body;
        }

        public String getUri() {
            return uri;
        }

        public String getBody() {
            return body;
        }
    }

    public static String signJws(JWSData jwsData, String merchantId) throws Exception {

        var objectMapper = new ObjectMapper();
        String payload = objectMapper.writeValueAsString(jwsData);

        var privateKey = readPrivateKey();
        var jsonWebSignature = new JsonWebSignature();

        // algorithm RS256, RS384 or RS512
        jsonWebSignature.setAlgorithmHeaderValue("RS256");
        jsonWebSignature.setKey(privateKey);

        // setting kid param value is merchant id
        jsonWebSignature.setKeyIdHeaderValue(merchantId);
        jsonWebSignature.setHeader("typ", "JWT");
        jsonWebSignature.setPayload(payload);

        jsonWebSignature.sign();

        return jsonWebSignature.getDetachedContentCompactSerialization();
    }

    private static PrivateKey readPrivateKey() throws Exception {
        FileHelper fileHelper = new FileHelper();

        byte[] keyBytes = fileHelper.loadPrivateKey();
        String privateKeyPEM = new String(keyBytes)
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replaceAll(System.lineSeparator(), "")
                .replace("-----END PRIVATE KEY-----", "");
        PKCS8EncodedKeySpec spec =
                new PKCS8EncodedKeySpec(Base64.decode(privateKeyPEM.getBytes(StandardCharsets.UTF_8)));
        KeyFactory kf = KeyFactory.getInstance("RSA");
        return kf.generatePrivate(spec);
    }

}
