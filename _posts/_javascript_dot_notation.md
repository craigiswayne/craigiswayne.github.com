Dot Notation Accessing Object

```
const hierarchy = [
            `skin.${this._skinService.current}.${this.currentEnv}`,
            `skin.${this._skinService.current}.${envName.ALL}`,
            `environment.${this.currentEnv}`,
            `global`,
        ];
        console.group('Looking for', prop);
        for (let j = 0; j < hierarchy.length && value === undefined; j++) {
            console.log('looking in...', hierarchy[j]);
            const configPath = `${hierarchy[j]}.${prop}`;
            value = configPath.split('.').reduce((o, i) => {
                if (o === undefined) {
                    return undefined;
                }
                try {
                    return o[i];
                } catch (ex) {
                    return undefined;
                }
            }, this.config);
        }
```