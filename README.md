# GitHub Proxy API

A Spring Boot 4.0.1 application that acts as a proxy to GitHub's public API.  
It retrieves all non-fork repositories for a given GitHub user and lists branches with the last commit SHA.

This project was built for a recruitment assessment and demonstrates:

- Java 25 +Spring Boot 4.0.1
- Clean Controller → Service → Client architecture
- Integration tests using WireMock (no mocks for API)
- Simple, minimal models and classes
- Full REST API compliance with recruiter acceptance criteria

---

## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Project Structure](#project-structure)  
3. [Running the Application](#running-the-application)  
4. [Testing the API](#testing-the-api)  
5. [Integration Tests](#integration-tests)  
6. [License](#license)

---

## Prerequisites

- Java 25 installed and `JAVA_HOME` configured
- Gradle installed (or use the included Gradle wrapper)
- Internet connection for accessing GitHub public API

---

## Project Structure


- All classes are in a single package (`com.atipera`) for simplicity
- Controller exposes `/users/{username}/repos` endpoint
- Service handles business logic
- RepositoryResponse is the only model class

---

## Running the Application

1. Open a terminal in the project root (`github-proxy-api/`).

2. **Run the application** using Gradle wrapper:

**Windows PowerShell / Command Prompt**
```powershell
.\gradlew.bat bootRun
**for Linux**
./gradlew bootRun
3.**wait until console shows**
GithubProxyApplication in 2.473 seconds (process running for 2.97) <==========---> 80% EXECUTING [1m 24s] > :bootRun
The application is now running at http://localhost:8080

4.Leave this terminal open , the server is running continuously until you stop it with CTRL + C.

Testing the API
1. Valid GitHub user
iwr http://localhost:8080/api/github/octocat/repositories -UseBasicParsing


Expected response (JSON):

[
  {
    "repositoryName": "git-consortium",
    "ownerLogin": "octocat",
    "branches": [
      {
        "name": "master",
        "lastCommitSha": "b33a9c7c02ad93f621fa38f0e9fc9e867e12fa0e"
      }
    ]
  },
  ...
]

2. Non-existing GitHub user
iwr http://localhost:8080/api/github/nonexistentuser123/repositories -UseBasicParsing -ErrorAction SilentlyContinue


Expected response (JSON):

{
  "status": 404,
  "message": "User not found"
}

Integration Tests

Run all tests to verify business logic and API integration:

.\gradlew.bat clean test


Tests use WireMock to emulate GitHub API

No mocks are used for internal service logic

Ensures correctness for both success and 404 scenarios

Notes

Application does not implement pagination, security, cache, or resilience — as per assignment requirements

Minimal models: RepositoryResponse is the only model class

Endpoint is RESTful and fully compliant with acceptance criteria

License

This project is by me(Tendai K Nyevedzanai) for recruitment purposes only.
