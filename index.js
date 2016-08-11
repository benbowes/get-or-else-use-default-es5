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
 * getOrElseUseDefault({ some: [window,'a.b.c'], none: ':/' }) // ':/' - does not exist, so `none` is used
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
