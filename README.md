

*  here is the first news: webpack 4 doesn’t need a configuration file.  
> It will look in ./src/index.js as the default entry point. Moreover, it will spit out the bundle in ./dist/index.js.

*  here is the second news: webpack 4 introduces production and development mode.  
> In webpack 4 you can get by without a single line of configuration! Just define the --mode flag and you get everything for free!

* how about overriding the default entry point?
> Here’s an example:
```
 "scripts": {
   "dev": "webpack --mode development ./foo/src/js/index.js --output ./foo/index.js",
   "build": "webpack --mode production ./foo/src/js/index.js --output ./foo/index.js"
 }
 ```

 * yarn add @babel/core babel-loader @babel/preset-env -D
 > The concept of zero configuration in webpack 4 applies to:  
 the entry point. Default to ./src/index.js  
 the output. Default to ./dist/index.js   
 production and development mode (no need to create 2 separate confs for production and development)

 ```
 // no need
"scripts": {
     "dev": "webpack --config webpack.dev.config.js  --mode development",
     "build": "webpack --config webpack.prod.config.js --mode production"
  },

 ```

 * And it’s enough. But for using loaders in webpack 4,
you still have to create a configuration file.

*  yarn add html-webpack-plugin html-loader -D
*  yarn add mini-css-extract-plugin css-loader -D
*  yarn add webpack-dev-server -D

```
"scripts": {
     "dev": "webpack --mode development",
     "build": "webpack --mode production"
   },
```

```
 "scripts": {
     "dev": "webpack-dev-server --mode development --open",
     "build": "webpack --mode production"
   },
```