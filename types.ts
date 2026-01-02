
export interface Branch {
  name: string;
  lastCommitSha: string;
}

export interface Repository {
  name: string;
  ownerLogin: string;
  branches: Branch[];
  isFork: boolean;
  description?: string;
  language?: string;
  htmlUrl: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
}

export interface GithubRepoResponse {
  name: string;
  owner: {
    login: string;
  };
  fork: boolean;
  description: string;
  language: string;
  html_url: string;
  branches_url: string;
}

export interface GithubBranchResponse {
  name: string;
  commit: {
    sha: string;
  };
}
