package cz.moro.hackaton

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication


@SpringBootApplication(scanBasePackages = ["cz.moro.hackaton"])
class FinbricksHackatonApplication

fun main(args: Array<String>) {
    runApplication<FinbricksHackatonApplication>(*args)
}
