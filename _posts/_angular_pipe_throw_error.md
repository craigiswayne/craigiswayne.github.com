Break out of a pipe observable

```javascript
this.httpClient.get(apiEndpoint)
  .pipe(
      map( resp => {
        if(resp.error !== null){
          // THROW ERROR HERE SO THAT IT BREAKS OUT OF further `tap` pipes
          // It will then jump straight to the `catchError` part
          throw(new Error());
        }
        return resp;
      }),
      catchError( (error, caught) => {
        // DO THINGS HERE to handle API ERRORS
        return caught;
      })
    );
```
