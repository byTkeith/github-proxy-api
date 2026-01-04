package com.atipera;


import org.springframework.stereotype.Service;
import java.util.List;


/**
* Service responsible for business orchestration.
*/
@Service
public class GithubService {


private final GithubClient client;


public GithubService(GithubClient client) {
this.client = client;
}


public List<RepositoryResponse> getNonForkRepositories(String username) {
return client.getRepositories(username).stream()
.filter(repo -> !repo.fork())
.map(repo -> new RepositoryResponse(
repo.name(),
repo.owner().login(),
client.getBranches(username, repo.name())
))
.toList();
}
}