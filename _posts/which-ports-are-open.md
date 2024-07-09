---
---


```powershell
Get-NetTCPConnection | Where-Object {$_.State -eq "Listening"}
```