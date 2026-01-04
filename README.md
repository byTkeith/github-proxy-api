# GitHub Repository Proxy API


## Description
Spring Boot application acting as a proxy for the GitHub API. It retrieves all non-fork repositories for a given user along with branch and last commit information.


## Tech Stack
- Java 25
- Spring Boot 4.0.1
- Gradle Kotlin DSL


## Endpoint
`GET /api/github/{username}/repositories`


## Error Handling
Returns 404 if GitHub user does not exist.


## Run
```bash
gradle bootRun