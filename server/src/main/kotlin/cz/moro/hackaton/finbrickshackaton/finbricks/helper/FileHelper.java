package cz.moro.hackaton.finbrickshackaton.finbricks.helper;

import java.io.IOException;
import java.io.InputStream;

public class FileHelper {

    public byte[] loadPrivateKey() {

        try (InputStream inputStream = getClass()
                .getClassLoader().getResourceAsStream("private_key.pem")) {

            return inputStream.readAllBytes();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return new byte[0];
    }
}
