package com.atipera;


import com.github.tomakehurst.wiremock.junit5.WireMockTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import static com.github.tomakehurst.wiremock.client.WireMock.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@WireMockTest(httpPort = 8089)
class GithubIntegrationTest {


@Autowired
private TestRestTemplate restTemplate;


@Test
void shouldReturnNonForkRepositories() {
stubFor(get(urlEqualTo("/users/test/repos"))
.willReturn(okJson("[{\"name\":\"repo1\",\"fork\":false,\"owner\":{\"login\":\"test\"}}]")));


stubFor(get(urlEqualTo("/repos/test/repo1/branches"))
.willReturn(okJson("[{\"name\":\"main\",\"commit\":{\"sha\":\"abc123\"}}]")));


restTemplate.getForEntity("/api/github/test/repositories", String.class);
}


@Test
void shouldReturn404ForNonExistingUser() {
stubFor(get(urlEqualTo("/users/unknown/repos"))
.willReturn(aResponse().withStatus(404)));


restTemplate.getForEntity("/api/github/unknown/repositories", String.class);
}
}