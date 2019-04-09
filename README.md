# TypeScript Starter Kit for Enonic XP

This starter kit will set up the basics for your new Enonic project.

Once initiated, you'll have the bare minimum needed to create a new Enonic
application or library. You'll have all the folders set up, and can get
straight to programming controllers in TypeScript.

## Usage

To get started, use the `toolbox` script to initiate your project:

```bash
~ $ $XP_INSTALL/toolbox/toolbox.sh init-project -n com.example.name -d new-folder-name -r starter-typescript
```

## First time setup

    npm run install

## Watch

First you need to build the app at least once:

    npm run build

Then start Enonic XP in development mode by executing the following in its own terminal:

    npm run dev

Then install the app using:

    npm run install-app

Then we can watch typescript files with

    npm run watch

## How to add node modules

    npm run yarn add --dev compiletimemodule
    npm run yarn add runtimemodule

## Atom syntax highlighting for typescript

    apm install language-typescript-grammars-only

## Todo

* Add example usage of node module in controller
* Include service example
* Include content-type example with index.ts
* Include mixin example with index.ts
* Include siteConfig example
* Include client-side js compilation
* Include filter example
* Include error example
* Move definitions to own library
* Add TS logo to README.md
* Add smart debug logging from HTTP headers
* Add sass/css tachyons

## Compatibility

| Version       | XP version |
| ------------- | ---------- |
| 1.0.x         | 6.8.0 - 6.11.x |
| 1.1.x         | 6.8.0 - |
| 1.2.0         | 6.12.0+ |
| 1.3.0         | 6.12.0+ |
| 1.4.0         | 7.+ |

## Changelog

### 1.4.0

* Upgraded to be compatible with XP7

### 1.3.0

* Upgraded to the latest version of the Gradle plugin

### 1.2.0

* Upgraded to the latest version of the Gradle plugin

### 1.0.2

* Include sass compilation
* Build package.json dependancies into build/resources/main/site/lib
* Add liveReload probably by using gulp-livereload, http-proxy and express

### 1.0.1

* Include examples for layout and part
* Extend the Controller definition
* Add type definitions (request, etc)

### 1.0.0

* Document how to "watch" typescript files.
* Use typescript node module to compile ts filed into es5.
* Use yarn.
* Use vanilla starter.
