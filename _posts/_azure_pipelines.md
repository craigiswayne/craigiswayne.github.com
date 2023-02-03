This is what I use to build an angular app in azure-pipelines

File: azure-pipelines.yml

```
# Node.js
# Build a general Node.js project with npm.
# Add steps that analyze code, save build artifacts, deploy, and more:
# https://docs.microsoft.com/azure/devops/pipelines/languages/javascript

trigger:
  - release/*
  - main

stages:
  - stage: AllInOneStage
    jobs:
      - job: nodeThings
        timeoutInMinutes: 5
        pool: 'Default'
        steps:
          - task: NodeTool@0
            displayName: 'Install Node.js'
            inputs:
              versionSpec: '16.19.x'

          - script: |
              npm ci
            displayName: 'Install Node Packages'

          - script: |
              npm run build
            displayName: 'Angular build: PROD'

          # https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/copy-files-v2?view=azure-pipelines&tabs=yaml
          - task: CopyFiles@2
            inputs:
              SourcesFolder: '$(Build.SourcesDirectory)'
              Contents: |
                dist/microgaming.co.uk/**
                web.config
              TargetFolder: $(Build.ArtifactStagingDirectory)

          # https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/publish-build-artifacts-v1?view=azure-pipelines
          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: $(Build.ArtifactStagingDirectory)
              artifactName: BuiltOutputPROD
```

Instead of `CopyFiles@2` you could use `ArchiveFiles@2`

```
- task: ArchiveFiles@2
            displayName: 'Archive Strapi'
            inputs:
              rootFolderOrFile: ./
              includeRootFolder: false
```
