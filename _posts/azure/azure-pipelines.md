```mermaid
flowchart
    Q1[Deploy an ARM Template?] --requires--> ASC[Azure Service Connection]
    Q2[Deploy an Azure Static Web App] --requires--> ASAWDT[Azure Static Web App Deployment Token]
```