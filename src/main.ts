import * as core from '@actions/core'
// import * as github from '@actions/github'

import axios from 'axios'

interface CreateRepoResp {
  html_url: string
  git_url: string
}

async function run(): Promise<void> {
  try {
    const targetOrgName = core.getInput('repo-org')
    const targetRepoName = core.getInput('repo-name')
    const ghToken = core.getInput('github-token')

    const createRepoData = JSON.stringify({
      name: targetRepoName,
      private: false
    })

    const url =
      (targetOrgName && `https://api.github.com/orgs/${targetOrgName}/repos`) ||
      `https://api.github.com/user/repos`
    const config = {
      method: 'post',
      url,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${ghToken}`,
        'Content-Type': 'application/json'
      },
      data: createRepoData
    }

    const {data, status} = await axios<CreateRepoResp>(config)
    if (status === 201) {
      console.info(`Repo created successfully: ${data.html_url}`)
      core.setOutput('repo_url', data.html_url)
      core.setOutput('git_url', data.git_url)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
