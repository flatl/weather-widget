# Weather Widget

Embedded javascript weather widget

# Usage
```HTML
<script src="http://179.43.160.204/scripts/weather-widget.min.js"></script>
<weather-widget />
```

# Development

## Requirements

Node 14.21<br/>
yarn

## Description

### /lib

Contains generalized app modules, without implementing business logic

### /controllers

Contains app modules with realized business logic

### /helpers

Contains some helpful functions which relates to common js problems

### /types

Considered to contain common project types

## Installation and usage
```bash
yarn # install depencies
yarn dev # start dev server
yarn build # build project
yarn deploy # deploy project (take a look to deploy.sh)
```

## Goals
- Refactor to Vue 3 Composition API

- Thinking about how to make custom fonts work in Shadow DOM
