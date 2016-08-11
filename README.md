# get-or-else-use-default-es5

![Build status](https://api.travis-ci.org/benbowes/get-or-else-use-default-es5.svg)

Simple Get Or Else module written in JavaScript ES5.

Request an object property at a given namespace with a backup value, incase the desired namespace does not yield a result.
```javascript
window.a = {x:4};
getOrElseUseDefault({ some: [window,'a.b.c'], none: {} });
// {} - does not exist, so `none` is used
getOrElseUseDefault({ some: [window,'a'], none: {} })
// {x:4} - does exist, so expected value is returned
```

### Browser compatibility
IE 9 or greater - [Array.every on Mozilla's compatibility chart](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/every#Browser_compatibility)

### The Module

```javascript
/**
 * @param {Object} someOrNoneObj
 * @param {Array} someOrNoneObj.some
 * @param {Object} someOrNoneObj.some[0] - the root object to your namespace.
 * e.g. this, window, someObj (Must exist).
 * @param {String} someOrNoneObj.some[1] - a string representation of the namespace you
 * are targeting to get it's property. e.g. 'a.b.c.d'
 * @returns {Object} the item you hope for `some`, or a backup item `none` if it does not exist.
 * @example
 * GIVEN
 * window.a = {x:4}
 *
 * getOrElseUseDefault({ some: [window,'a.b.c'], none: {} }) // {} - does not exist, so `none` is used
 * getOrElseUseDefault({ some: [window,'a'], none: {} }) // {x:4} - does exist, so expected value is returned
 */

var getOrElseUseDefault = function( someOrNoneObj ) {
  var contextObj = someOrNoneObj.some[0];
  var namespace = someOrNoneObj.some[1].split('.');
  var value = contextObj; // reassigns to obj[key] on each array.every iteration
  return (
    namespace.every( function( key ) {
      return (value = value[key]) != undefined
    })
  ) ? value : someOrNoneObj.none;
};

module.exports = getOrElseUseDefault;
```

### Run the tests
Given you have [Node](https://nodejs.org/en/) installed, `cd` into this folder and:
```
npm install
npm test

```
