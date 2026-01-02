
import { Repository, GithubRepoResponse, GithubBranchResponse, ErrorResponse } from '../types';

const BASE_URL = 'https://api.github.com';

export async function getRepositories(username: string): Promise<Repository[]> {
  const response = await fetch(`${BASE_URL}/users/${username}/repos`);
  
  if (response.status === 404) {
    const error: ErrorResponse = {
      status: 404,
      message: `User '${username}' not found on GitHub.`
    };
    throw error;
  }

  if (!response.ok) {
    throw new Error('An unexpected error occurred while fetching repositories.');
  }

  const repos: GithubRepoResponse[] = await response.json();
  
  // Filter out forks immediately to save on branch requests
  const nonForkRepos = repos.filter(repo => !repo.fork);

  const detailedRepos = await Promise.all(
    nonForkRepos.map(async (repo) => {
      const branches = await getBranches(username, repo.name);
      return {
        name: repo.name,
        ownerLogin: repo.owner.login,
        isFork: repo.fork,
        description: repo.description,
        language: repo.language,
        htmlUrl: repo.html_url,
        branches
      };
    })
  );

  return detailedRepos;
}

async function getBranches(username: string, repoName: string) {
  const response = await fetch(`${BASE_URL}/repos/${username}/${repoName}/branches`);
  if (!response.ok) return [];
  
  const branches: GithubBranchResponse[] = await response.json();
  return branches.map(b => ({
    name: b.name,
    lastCommitSha: b.commit.sha
  }));
}
