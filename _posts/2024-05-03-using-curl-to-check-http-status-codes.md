Testing HTTP Status Codes using curl

```sh tests/validate-url.sh
echo "Checking HTTP Status code of: $url_to_check";

```

then call the script with one parameter
```shell
sh test/validate-url.sh https://www.example.org https://www.example.org 
```

----

### Using in azure pipelines

```yml azure-pipelines.yml
parameters:
  - name: urls_to_check
    type: object
    default:
      - https://www.example.org
      - https://example.org

steps:
  - ${{ each url in parameters.urls_to_check }}:
    - task: Bash@3
      displayName: 'Checking HTTP Status code of: ${{url}}'
      inputs:
        filePath: 'tests/status-codes.sh'
        arguments: '${{url}}'
        
```