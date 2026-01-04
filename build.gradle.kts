plugins {
java
id("org.springframework.boot") version "4.0.1"
id("io.spring.dependency-management") version "1.1.4"
}


group = "com.atipera"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_25


repositories {
mavenCentral()
}


dependencies {
implementation("org.springframework.boot:spring-boot-starter-webmvc")
implementation("org.springframework.boot:spring-boot-starter-restclient")


testImplementation("org.springframework.boot:spring-boot-starter-test")
testImplementation("com.github.tomakehurst:wiremock-jre8:3.0.1")
}


tasks.withType<Test> {
useJUnitPlatform()
}