# starter-typescript
Enonic XP app starter kit with support for TypeScript

# First time setup

    npm run install

# Watch (no liveReload yet)

First you need to build the app at least once:

    npm run build

Then start Enonic XP in development mode by executing the following in its own terminal:

    npm run dev

Then install the app using:

    npm run install-app

Then we can watch typescript files with

    npm run watch

# Todo

* Extend the Controller definition
* Add type definitions (request, etc)
* Add example usage of node module in controller
* Build package.json dependancies into build/resources/main/site/lib
* Add liveReload probably by using gulp-livereload, http-proxy and express

# How to add node modules

    npm run yarn add --dev compiletimemodule
    npm run yarn add runtimemodule

# Atom syntax highlighting for typescript
    apm install language-typescript-grammars-only
