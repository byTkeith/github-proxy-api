package com.atipera;


import org.springframework.web.bind.annotation.*;
import java.util.List;


/**
* REST controller exposing GitHub-related endpoints.
*/
@RestController
@RequestMapping("/api/github")
public class GithubController {


private final GithubService service;


public GithubController(GithubService service) {
this.service = service;
}


@GetMapping("/{username}/repositories")
public List<RepositoryResponse> getRepositories(@PathVariable String username) {
return service.getNonForkRepositories(username);
}
}