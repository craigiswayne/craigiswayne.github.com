| Parameters               | Description                                    | 
|--------------------------|------------------------------------------------|
| your_site_name           | This value needs to be unique across the world |
| your_app_service_plan_id | see below on how to grab this id               |


Grab the IDs of the App Service Plans in your resource group

```bash
az appservice plan list 
  --resource-group "YourResourceGroupName" 
  --subscription "YourSubscriptionName" 
  --query "[].id" 
  --output tsv
```

Grab the ID of the Virtual Network from your resource group

```bash
az network vnet list --resource-group "MyResourceGroup" --query "[].id" --output tsv
```

----

## Deploying

````powershell
$subscription_name="enterprise_solutions_prod"
$resource_group_name="rg-playitforward-prod-uksouth-001"

az deployment group create --resource-group $resource_group_name --subscription $subscription_name --template-file template.json --parameters parameters.json
````


----

notes: 

creating a service principle

> az login
> az ad sp create-for-rbac --name MyGitHubActionsApp --role contributor --scopes /subscriptions/{subscription-id}
