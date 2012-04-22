## Compiling

```
coffee -j scripts/app.js -c lib/*.coffee src/app.coffee
coffee -j scripts/filter.js -c lib/*.coffee vender/hulu-filter/src/*.coffee vender/hulu-filter/runner/src/*.coffee src/filter.coffee
coffee -j scripts/background.js -c src/background.coffee
```