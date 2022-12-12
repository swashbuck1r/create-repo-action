import * as core from '@actions/core'
// import * as github from '@actions/github'

import axios from 'axios'

async function run(): Promise<void> {
  try {
    const targetOrgName = core.getInput('repo-org')
    const targetRepoName = core.getInput('repo-name')
    const ghToken = core.getInput('org-admin-token')
    const createRepoData = JSON.stringify({
      name: targetRepoName,
      private: true,
      visibility: 'private'
    })

    const config = {
      method: 'post',
      url: `https://api.github.com/orgs/${targetOrgName}/repos`,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${ghToken}`,
        'Content-Type': 'application/json'
      },
      data: createRepoData
    }

    const {status} = await axios(config)
    if (status === 200) {
      console.info(
        `Repo ${targetOrgName}/${targetRepoName} created successfully!`
      )
      core.setOutput(
        'repo-url',
        `https://github.com/${targetOrgName}/${targetRepoName}`
      )
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
