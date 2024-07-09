---
layout: post
title:  "Azure Private Storage from CLI"
date:   2024-05-28 09:03:00 +0000
categories: [azure, storage account, devops]
---

1. Create a Storage Account
2. Private Endpoint

```bash
# Define variables
subscription="your-subscription-name";
resource_group="your-resource-group-name";
deployment_name="name-of-your-deployment";
storage_account_name="your-storage-account-name";
container_name="your-container-name"
```

```bash
# login to your azure account and select the relevant subscription
az login
az account set --subscription $subscription;
```

```bash
# create a deployment group
az deployment group create \
  --name $deployment_name \
  --resource-group $resource_group \
  --template-file template.json \
  --parameters parameters.json
  
az deployment group show --resource-group $resource_group --name $deployment_name
```

```bash
# create the storage account
az storage account create \
  --name $storage_account_name \
  --resource-group $resource_group_name \
  --location $resource_group_location
  --sku Standard_LRS
```

```bash
# create the container that will be private
az storage container create \
  --name $container_name \
  --account-name $storage_account_name \
  --auth-mode login

# this should return null
az storage container show \
  --name $container_name \
  --account-name $storage_account_name \
  --auth-mode login \
  --query "properties.publicAccess"
```

```bash
az storage cors add --methods GET --origins "*" --services b --account-name $storage_account_name
```


```bash
# Generate a SAS Token
storage_account_name="your-storage-account-name";
expiry="2025-01-01T00:00:00Z"
permissions="rl";
resource_types="sco";
services="bf";

az storage account generate-sas \
    --account-name $storage_account_name \
    --expiry $expiry \
    --permissions $permissions \
    --resource-types $resource_types \
    --services $services \
    --https-only \
    --output tsv
    # optional
    --ip $from_this_ip_only
```

```bash
# Dont know what this is about
npm init -y
npm install @azure/storage-blob --save
# see index.js
```