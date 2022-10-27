---
title: 'Scalable application initial setups'
date: '2022-10-27'
---

**1: engine locking** allowes strictly lock npm/yarn packages and certain node version

i) at root level create **.npmrc** file

```javascript
engine-strict=true
```

ii) at root level create **.nvmrc** file

```javascript
v16;
```

iii) inside **package.json**

```json
  "engines": {
    "node": ">=16",
    "npm": ">=8",
    "yarn": "please-use-npm"
  },

```

**2: ESLint**

```json
{
  "extends": ["next", "next/core-web-vitals", "eslint:recommended"],
  "globals": {
    "React": "readonly" //make React available globally to avoid warnings
  },
  "rules": {
    "no-unused-vars": [1, { "args": "after-used", "argsIgnorePattern": "_" }]
  }
}
```

**3: Prettier**

```console
npm install -D prettier
```

i) at root level create **.prettierignore** file for ignoring files

```json
.npm
.next
dist
node_modules
```

ii) at root level create **.prettierc** file for explicit config

```json
{ "trailingComma": "es5", "tabWidth": 2, "semi": true, "singleQuote": true }
```

iii) in package json add scripts

```json
  "scripts": {
    "lint": "next lint",
    "prettier": "prettier --write .",
    "prepare": "husky install"
  },
```

**4: Git Hooks / Husky**
Automate running certaing scripts prior to git actions.

**i)** install Husky

```console
npm install -D husky
```

**ii)** initialize Husky (will create .husky folder)

```console
npx husky install
```

**iii)** add pre-commit hook to check linting

```console
npx husky add .husky/pre-commit "npm run lint"
```

**iv)** add pre-push hook to check building

```console
npx husky add .husky/pre-push "npm run build"
```

**v)** add **"prepare"** script to package.json for husky install automation

```json
"scripts": {
    "prepare": "husky install"
}
```

**5: Commit linter**
**i)** For commit consistency install **commitlint**

```console
npm install -D @commitlint/config-conventional @commitlint/cli
```

**ii)** add commitlint.config.js file and configuration

```javascript
// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
        'changeset',
      ],
    ],
  },
};
```

**iii)** activate commit linter

```console
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

```

**6: Create .vscode folder**

**i)** inside .vscode folder add **settings.json** file

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  }
}
```

**ii)** add launch.json file for launching debug modes

```json
{
  "version": "0.1.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "pwa-chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "console": "integratedTerminal",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ],
  "resolveSourceMapLocations": ["${workspaceFolder}/**", "!**/node_modules/**"]
}
```

**7: add cross-env package** for server code debugging in browser

```console
npm i -D cross-env
```

inside package json

```json
"scripts": {
    "dev": "cross-env NODE_OPTIONS='--inspect' next dev"
}
```
