
## App Service Plan
View all App Service Plans in your resource group

```bash
az login
az account set --subscription $subscription;
az appservice plan list --resource-group "YourResourceGroupName" --output table

# or
az appservice plan list --resource-group "YourResourceGroupName" --subscription "YourSubscriptionName" --output table
```

or if you wanna just grab the id

```bash
az appservice plan list 
  --resource-group "YourResourceGroupName" 
  --subscription "YourSubscriptionName" 
  --query "[].id" 
  --output tsv
```

---

## Virtual Networks

```bash
az network vnet list --resource-group "MyResourceGroup" --subscription "YourSubscriptionName" --query "[].id" --output tsv
```