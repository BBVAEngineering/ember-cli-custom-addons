# ember-cli-custom-addons

[![Build Status](https://travis-ci.org/BBVAEngineering/ember-cli-custom-addons.svg?branch=master)](https://travis-ci.org/BBVAEngineering/ember-cli-custom-addons)
[![GitHub version](https://badge.fury.io/gh/BBVAEngineering%2Fember-cli-custom-addons.svg)](https://badge.fury.io/gh/BBVAEngineering%2Fember-cli-custom-addons)
[![npm version](https://badge.fury.io/js/ember-cli-custom-addons.svg)](https://badge.fury.io/js/ember-cli-custom-addons)
[![Dependency Status](https://david-dm.org/BBVAEngineering/ember-cli-custom-addons.svg)](https://david-dm.org/BBVAEngineering/ember-cli-custom-addons)

This addon allows to create sub-applications with a different namespace of your ember-cli project.

## Information

[![NPM](https://nodei.co/npm/ember-cli-custom-addons.png?downloads=true&downloadRank=true)](https://nodei.co/npm/ember-cli-custom-addons/)

```html
<table>
  <tr>
    <td>Package</td><td>ember-cli-custom-addons</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>Ember-cli addons to build sub-applications</td>
  </tr>
  <tr>
    <td>Node Version</td>
    <td>>= 0.10</td>
  </tr>
</table>
```

## Installation

* `ember install ember-cli-custom-addons`

## Options

You can pass the follow options by setting them in `config/environment.js` as follow:

* `path`: addons path
* `exclude.addons`: exclude addons from build
* `exclude.files`: exclude addon files from build

```javascript
customAddons: {
    path: 'addons',
    exclude: {
        files: ['foo/*.coffee'],
        addons: ['foo']
    }
},
```

## Usage

* Create `addons` directory inside the project root
* Each folder inside `addons` directory will be merged with the `app` tree in a different namespace
* Extend your application resolver to load your namespaces

## Example

```html
dummy/
  - app/
    - components/
    - routes/
    - ...
  - addons/
    - foo
      - components/
      - routes/
      - ... (same as 'app')
    - bar
      - ...
  - public/
  - vendor/
  - ...
```

After build, inside `dist/assets/app.js`, will be defined the addons modules and templates in their respectives namespaces:

```js
// App
define('dummy/app', ['exports', 'ember', ...
define('dummy/components/foo', ['exports', 'ember', ...
// Addons
define('foo/components/foo', ['exports', 'ember', ...
define('foo/routes/bar', ['exports', 'ember', ...
define('bar/pods/index', ['exports', 'ember', ...
```

## Contribute

If you want to contribute to this addon, please read the [CONTRIBUTING.md](CONTRIBUTING.md).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/BBVAEngineering/ember-cli-custom-addons/tags).

## Authors

See the list of [contributors](https://github.com/BBVAEngineering/ember-cli-custom-addons/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
