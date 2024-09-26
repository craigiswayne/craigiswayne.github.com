## Commands
https://learn.microsoft.com/en-us/cli/azure/reference-index?view=azure-cli-latest

## Variables
```shell
subscription_name=""
resource_group_name="my-resource-group"
resource_group_location="ukwest"
```

## Subscription
```shell
az login
az account set --subscription $subscription_name;
```

## Resource Groups
```shell

az group create \
  --name $resource_group_name \
  --location $resource_group_location
```

---

## App Service Plan
View all App Service Plans in your resource group

```shell
az appservice plan list --resource-group "YourResourceGroupName" --output table

# or
az appservice plan list --resource-group "YourResourceGroupName" --subscription "YourSubscriptionName" --output table
```

or if you wanna just grab the id

```shell
az appservice plan list \
  --resource-group "YourResourceGroupName" \
  --subscription "YourSubscriptionName" \
  --query "[].id" \
  --output tsv
```

---

## Virtual Networks

```shell
az network vnet list \
  --resource-group "MyResourceGroup" \
  --subscription "YourSubscriptionName" \
  --query "[].id" \
  --output tsv
```