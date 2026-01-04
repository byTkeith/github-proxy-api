package com.atipera;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;


import java.util.List;


/**
* Client responsible for communication with GitHub API.
*/
@Component
public class GithubClient {


private final RestClient restClient;


public GithubClient(@Value("${github.api.base-url}") String baseUrl) {
this.restClient = RestClient.builder()
.baseUrl(baseUrl)
.build();
}


public List<GithubRepository> getRepositories(String username) {
try {
return restClient.get()
.uri("/users/{username}/repos", username)
.retrieve()
.body(new org.springframework.core.ParameterizedTypeReference<>() {});
} catch (HttpClientErrorException e) {
if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
throw new GithubUserNotFoundException("GitHub user does not exist");
}
throw e;
}
}


public List<BranchResponse> getBranches(String username, String repo) {
List<GithubBranch> branches = restClient.get()
.uri("/repos/{username}/{repo}/branches", username, repo)
.retrieve()
.body(new org.springframework.core.ParameterizedTypeReference<>() {});


return branches.stream()
.map(branch -> new BranchResponse(branch.name(), branch.commit().sha()))
.toList();
}
}