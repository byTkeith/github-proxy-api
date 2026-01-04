package com.atipera;


import java.util.List;


record GithubRepository(String name, boolean fork, Owner owner) {}
record Owner(String login) {}
record GithubBranch(String name, Commit commit) {}
record Commit(String sha) {}


record RepositoryResponse(String repositoryName, String ownerLogin, List<BranchResponse> branches) {}
record BranchResponse(String name, String lastCommitSha) {}
record ErrorResponse(int status, String message) {}


class GithubUserNotFoundException extends RuntimeException {
GithubUserNotFoundException(String message) {
super(message);
}
}