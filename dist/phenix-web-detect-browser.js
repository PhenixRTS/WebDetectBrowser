(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["detectBrowser"] = factory();
	else
		root["phenix"] = root["phenix"] || {}, root["phenix"]["detectBrowser"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Copyright 2018 Phenix Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(_) {
    'use strict';

    function DetectBrowser(userAgent) {
        this._userAgent = userAgent || '';
    }

    DetectBrowser.prototype.detect = function() {
        var browser = 'Unknown';
        var version = '?';
        var browserMatch = this._userAgent.match(/(Chrome|Chromium|Firefox|Opera|Safari)+\//);
        var versionMatch = this._userAgent.match(/(Chrome|Chromium|Firefox|Version)+\/([0-9]+)\./);
        var isWebview = false;

        if (browserMatch && browserMatch.length >= 2) {
            browser = browserMatch[1];
        } else if (this._userAgent.match(/^\(?Mozilla/)) {
            browser = 'Mozilla';

            if (this._userAgent.match(/MSIE/)
                || this._userAgent.match(/; Trident\/.*rv:[0-9]+/)) {
                browser = 'IE';

                if (versionMatch = this._userAgent.match(/MSIE ([0-9]+)/)) { // eslint-disable-line no-cond-assign
                    version = parseInt(versionMatch[1], 10);

                    // Compatibility view?
                    if (versionMatch = this._userAgent.match(/MSIE [0-9]+.*MSIE ([0-9]+)/)) { // eslint-disable-line no-cond-assign
                        version = parseInt(versionMatch[1], 10);
                    }
                } else if (versionMatch = this._userAgent.match(/rv:([0-9]+)/)) { // eslint-disable-line no-cond-assign
                    version = parseInt(versionMatch[1], 10);
                }
            }
        }

        if (browser === 'Chrome' && this._userAgent.match(/OPR\//)) {
            // Opera pretends to be Chrome
            browser = 'Opera';
            versionMatch = this._userAgent.match(/(OPR)\/([0-9]+)\./);
        } else if (browser === 'Chrome' && this._userAgent.match(/Edge\//)) {
            // Edge pretends to be Chrome
            browser = 'Edge';
            versionMatch = this._userAgent.match(/(Edge)\/([0-9]+)\./);
        } else if ((browser === 'Firefox' || browser === 'IE') && this._userAgent.match(/Opera/)) {
            // Opera pretends to be Firefox or IE
            browser = 'Opera';
            versionMatch = this._userAgent.match(/(Opera) ([0-9]+)\./);
        } else if (browser === 'Mozilla' && this._userAgent.match(/iphone|ipod|ipad/i)) {
            browser = 'Safari';
            version = parseInt(_.get(this._userAgent.match(/OS\s([0-9]+)/), [1]), 10);
            isWebview = true;
        }

        // https://developer.chrome.com/multidevice/user-agent
        if (browser === 'Chrome' && (this._userAgent.match(/; wv/) || (this._userAgent.match(/Android/) && this._userAgent.match(/Version\/[0-9].[0-9]/)))) {
            isWebview = true;
        }

        if (browser !== 'IE' && versionMatch && versionMatch.length >= 3) {
            version = parseInt(versionMatch[2], 10);
        }

        if (navigator.product === 'ReactNative') {
            browser = 'ReactNative';
            version = navigator.productSub || '?';
        }

        return {
            browser: browser,
            version: version,
            isWebview: isWebview
        };
    };

    return DetectBrowser;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Copyright 2018 Phenix Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
    'use strict';

    var _ = function() {

    };

    _.clone = function clone(value) {
        if (_.isArray(value)) {
            return value.slice();
        }

        if (_.isObject(value)) {
            return _.assign({}, value);
        }

        return value;
    };

    _.get = function get(objectToTraverse, path, defaultValue) {
        if (_.isNullOrUndefined(objectToTraverse)) {
            return defaultValue;
        }

        assertIsObject(objectToTraverse, 'objectToTraverse');

        var properties = path;

        if (_.isString(properties)) {
            properties = buildPathFromString(path);
        } else if (!_.isArray(properties)) {
            throw new Error('Unsupported path type ' + typeof path);
        }

        var valueAtPath = _.reduce(properties, function(valueAtPath, prop) {
            if (_.isObject(valueAtPath) || _.isArray(valueAtPath)) {
                return valueAtPath[prop];
            }

            return;
        }, objectToTraverse);

        return _.isUndefined(valueAtPath) ? defaultValue : valueAtPath;
    };

    _.set = function get(objectToTraverse, path, value) {
        if (!_.isObject(objectToTraverse)) {
            return objectToTraverse;
        }

        assertIsObject(objectToTraverse, 'objectToTraverse');

        var currentLocation = objectToTraverse;
        var properties = path;

        if (_.isString(properties)) {
            properties = buildPathFromString(path);
        } else if (!_.isArray(properties)) {
            throw new Error('Unsupported path type ' + typeof path);
        }

        _.forEach(properties, function(prop, index) {
            setNextValue(currentLocation, prop, getNextValue(properties, index, currentLocation, value));

            currentLocation = currentLocation[prop];
        });

        return objectToTraverse;
    };

    _.bind = function bind(callback, that) {
        var argsAfterContext = Array.prototype.slice.call(arguments, 2);

        return function boundFunction() {
            if (!_.isFunction(callback)) {
                throw new TypeError('_.bind - callback must be a function');
            }

            var combinedArguments = argsAfterContext.concat(Array.prototype.slice.call(arguments));

            return callback.apply(that, combinedArguments);
        };
    };

    _.now = function now() {
        return new Date().getTime();
    };

    _.utc = function utc(date) {
        if (_.isNumber(date)) {
            return date;
        } else if (!date) {
            return NaN;
        }

        return Math.floor(date);
    };

    _.isoString = function isoString() {
        var now = new Date();

        if (now.toISOString) {
            return now.toISOString();
        }

        return now.getUTCFullYear() +
            '-' + _.pad(now.getUTCMonth() + 1, 2) +
            '-' + _.pad(now.getUTCDate(), 2) +
            'T' + _.pad(now.getUTCHours(), 2) +
            ':' + _.pad(now.getUTCMinutes(), 2) +
            ':' + _.pad(now.getUTCSeconds(), 2) +
            '.' + (now.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
            'Z';
    };

    _.map = function map(collection, callback) {
        assertIsObject(collection, 'collection');

        var newArray = [];

        if (collection.constructor === Array) {
            _.forEach(collection, function mapCollection(item, index) {
                if (_.isString(callback) && _.isObject(item)) {
                    newArray.push(item[callback]);
                } else if (_.isFunction(callback)) {
                    newArray.push(callback(item, index));
                }
            });
        } else {
            _.forOwn(collection, function mapCollection(value, key) {
                if (_.isFunction(callback)) {
                    newArray.push(callback(value, key));
                }
            });
        }

        return newArray;
    };

    _.values = function(collection) {
        if (!_.isObject(collection) || _.isArray(collection)) {
            throw new Error('Collection must be an object.');
        }

        return _.map(collection, function(value) {
            return value;
        });
    };

    _.keys = function(collection) {
        if (!_.isObject(collection) || _.isArray(collection)) {
            throw new Error('Collection must be an object.');
        }

        return _.map(collection, function(value, key) {
            return key;
        });
    };

    _.forEach = function forEach(collection, callback) {
        if (!_.isFunction(callback)) {
            throw new Error('Callback must be a function');
        }

        assertIsArray(collection, 'collection');

        for (var i = 0; i < collection.length; i++) {
            var callbackResponse = callback(collection[i], i);

            if (callbackResponse === false) {
                return;
            }
        }
    };

    _.forOwn = function forOwn(objectWithProperties, callback) {
        if (!_.isFunction(callback)) {
            throw new Error('Callback must be a function');
        }

        assertIsObject(objectWithProperties, 'objectWithProperties');

        var keys = Object.keys(objectWithProperties);

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];

            if (objectWithProperties.hasOwnProperty(key) || Object.prototype.hasOwnProperty.call(objectWithProperties, key)) {
                callback(objectWithProperties[key], key);
            }
        }
    };

    _.argumentsToArray = function(args) {
        if (!_.isObject(args) || !args.length) {
            throw new Error('Collection must be arguments');
        }

        var collection = [];

        for (var i = 0; i < args.length; i++) {
            collection.push(args[i]);
        }

        return collection;
    };

    _.assign = function assign(target) {
        assertIsObject(target, 'target');

        var sources = _.argumentsToArray(arguments);

        sources.shift();

        _.forEach(sources, function(source, index) {
            assertIsObject(source, 'source ' + index);

            _.forOwn(source, function(value, key) {
                target[key] = value;
            });
        });

        return target;
    };

    _.includes = function includes(collection, value) {
        if (_.isString(collection)) {
            assertIsString(value, 'Includes value and search parameter');

            return collection.indexOf(value) > -1;
        }

        if (_.isUndefined(collection) || _.isUndefined(value)) {
            return false;
        }

        assertIsObject(collection, 'collection');

        var hasValue = false;

        var checkCollection = function checkCollection(currentValue) {
            if (currentValue === value) {
                hasValue = true;
            }
        };

        if (collection.constructor === Array) {
            _.forEach(collection, checkCollection);
        } else {
            _.forOwn(collection, checkCollection);
        }

        return hasValue;
    };

    _.reduce = function reduce(collection, callback, initialValue) {
        assertIsObject(collection, 'collection');

        var result = initialValue === _.noop() ? null : initialValue;

        if (collection.constructor === Array) {
            _.forEach(collection, function(item, index) {
                result = callback(result, item, index);
            });
        } else {
            _.forOwn(collection, function(value, key) {
                result = callback(result, value, key);
            });
        }

        return result;
    };

    _.sample = function sample(collection) {
        assertIsArray(collection, 'collection');

        return collection[Math.floor(Math.random() * collection.length)];
    };

    _.uniqueId = function() {
        return (_.now() * Math.random()).toString();
    };

    _.find = function find(collection, callback, initialIndex) {
        assertIsArray(collection, 'collection');

        var hasItem;

        _.forEach(collection, function findInCollection(value, index) {
            if (callback(value) && index >= (initialIndex || 0)) {
                hasItem = value;

                return hasItem;
            }
        });

        return hasItem;
    };

    _.findIndex = function find(collection, callback, initialIndex) {
        assertIsArray(collection, 'collection');

        var hasItem;

        _.forEach(collection, function findInCollection(value, index) {
            if (callback(value, index) && index >= (initialIndex || 0)) {
                hasItem = index;

                return hasItem;
            }
        });

        return hasItem;
    };

    _.filter = function filter(collection, callback) {
        assertIsArray(collection, 'collection');

        var newCollection = [];

        _.forEach(collection, function findInCollection(value) {
            if (callback(value)) {
                newCollection.push(value);
            }
        });

        return newCollection;
    };

    _.remove = function remove(collection, callback) {
        assertIsArray(collection, 'collection');

        var filterCallback = function filterCallback(value) {
            return !callback(value);
        };

        return _.filter(collection, filterCallback);
    };

    _.take = function take(collection, size) {
        assertIsArray(collection, 'collection');

        return collection.slice(0, size);
    };

    _.hasDifferences = function hasDifferences(collectionA, collectionB, deep) {
        return _.findDifferences(collectionA, collectionB, deep).length > 0;
    };

    _.findDifferences = function findDifferences(collectionA, collectionB, deep) {
        var differences = [];
        var visitedKeys = {};

        function getDifferences(value, indexOrKey) {
            visitedKeys[indexOrKey] = 1;

            if ((_.isObject(value) || _.isArray(value)) && deep) {
                if (!_.hasIndexOrKey(collectionB, indexOrKey)) {
                    differences.push(indexOrKey);
                } else if (!_.sameTypes(collectionA[indexOrKey], collectionB[indexOrKey])) {
                    differences.push(indexOrKey);
                } else if (_.hasDifferences(collectionA[indexOrKey], collectionB[indexOrKey], deep)) {
                    differences.push(indexOrKey);
                }
            } else if (collectionA[indexOrKey] !== collectionB[indexOrKey]) {
                differences.push(indexOrKey);
            }
        }

        if (_.isArray(collectionA) && _.isArray(collectionB)) {
            if (collectionA.length > collectionB.length) {
                _.forEach(collectionA, getDifferences);
            } else {
                _.forEach(collectionB, getDifferences);
            }
        } else if (_.isObject(collectionA) && _.isObject(collectionB) && !_.isArray(collectionA) && !_.isArray(collectionB)) {
            _.forOwn(collectionA, getDifferences);

            _.forOwn(collectionB, function(value, key) {
                if (!visitedKeys.hasOwnProperty(key)) {
                    differences.push(key);
                }
            });
        } else {
            throw new Error('Object types do not match');
        }

        return differences;
    };

    _.hasIndexOrKey = function hasIndexOrKey(collection, indexOrKey) {
        if (_.isArray(collection)) {
            return collection.length > parseInt(indexOrKey);
        } else if (_.isObject(collection)) {
            return collection.hasOwnProperty(indexOrKey);
        }

        return false;
    };

    _.startsWith = function startsWith(value, prefix) {
        assertIsString(value, 'value');
        assertIsString(prefix, 'prefix');

        return value.indexOf(prefix) === 0;
    };

    _.sameTypes = function sameTypes(first, second) {
        if (_.isNullOrUndefined(first) || _.isNullOrUndefined(second)) {
            return _.isNullOrUndefined(first) && _.isNullOrUndefined(second);
        }

        if (_.isArray(first) || _.isArray(second)) {
            return _.isArray(first) && _.isArray(second);
        }

        return typeof first === typeof second;
    };

    _.freeze = function freeze(obj) {
        if ('freeze' in Object) {
            return Object.freeze(obj);
        }

        return obj;
    };

    _.noop = function() {
        return undefined;
    };

    _.isObject = function isObject(obj) {
        if (obj === null) {
            return false;
        }

        return typeof obj === 'object';
    };

    _.isArray = function isArray(array) {
        if (!_.isObject(array)) {
            return false;
        }

        return array.constructor === Array;
    };

    _.isString = function isString(string) {
        return typeof string === 'string';
    };

    _.isNumber = function isNumber(number) {
        if (isNaN(number)) {
            return false;
        }

        return typeof number === 'number';
    };

    _.isBoolean = function isBoolean(bool) {
        return typeof bool === 'boolean';
    };

    _.isFunction = function isFunction(func) {
        return typeof func === 'function';
    };

    _.isNullOrUndefined = function isNullOrUndefined(value) {
        return value === null || _.isUndefined(value);
    };

    _.isUndefined = function isUndefined(value) {
        return typeof value === 'undefined';
    };

    _.getEnumName = function getEnumName(enums, nameOrId) {
        var enumObject = null;

        var enumArray = _.map(enums, function(value) {
            return value;
        });

        if (_.isNumber(nameOrId)) {
            enumObject = _.find(enumArray, function(current) {
                return current.id === nameOrId;
            });
        } else if (_.isString(nameOrId)) {
            enumObject = _.find(enumArray, function(current) {
                return current.name.toLowerCase() === nameOrId.toLowerCase();
            });
        }

        if (enumObject) {
            return enumObject.name;
        }

        return null;
    };

    _.toString = function toString(data) {
        if (_.isString(data)) {
            return data;
        }

        if (_.isBoolean(data)) {
            return data ? 'true' : 'false';
        }

        if (_.isNumber(data)) {
            return data.toString();
        }

        var toStringStr = '';

        if (data) {
            if (_.isFunction(data.toString)) {
                toStringStr = data.toString();
            } else if (_.isObject(data.toString)) {
                try {
                    toStringStr = data.toString();
                } catch (e) {
                    toStringStr = '[object invalid toString()]';
                }
            }
        }

        if (toStringStr.indexOf('[object') !== 0) {
            return toStringStr;
        }

        var cache = [];

        return toStringStr + JSON.stringify(data, function(key, value) {
            if (_.isObject(value) && !_.isNullOrUndefined(value)) {
                if (_.includes(cache, value)) {
                    return '<recursive>';
                }

                cache.push(value);
            }

            return key === '' ? value : _.toString(value);
        });
    };

    _.pad = function padNumber(value, numberToPad) {
        assertIsNumber(value, 'value');
        assertIsNumber(numberToPad, 'numberToPad');

        var valueLength = value.toString().length;

        for (var i = 0; i < numberToPad - valueLength; i++) {
            value = '0' + value.toString();
        }

        return value.toString();
    };

    _.addEventListener = function addEventListener(target, eventName, listener, useCapture) {
        assertIsObject(target, 'target');
        assertIsString(eventName, 'eventName');
        assertIsFunction(listener, 'listener');

        if (target.phenixAddEventListener) {
            target.phenixAddEventListener.call(target, eventName, listener, !!useCapture);
        } else if (target.addEventListener) {
            target.addEventListener(eventName, listener, !!useCapture);
        } else if (target.attachEvent) {
            target.attachEvent("on" + eventName, listener);
        }
    };

    _.removeEventListener = function removeEventListener(target, eventName, listener, useCapture) {
        assertIsObject(target, 'target');
        assertIsString(eventName, 'eventName');
        assertIsFunction(listener, 'listener');

        if (target.phenixRemoveEventListener) {
            target.phenixRemoveEventListener.call(target, eventName, listener, !!useCapture);
        } else if (target.removeEventListener) {
            target.removeEventListener(eventName, listener, !!useCapture);
        } else if (target.detachEvent) {
            target.detachEvent("on" + eventName, listener);
        }
    };

    var assertIsArray = function assertIsArray(collection) {
        if (!_.isArray(collection)) {
            throw new Error('Input must be an array.');
        }
    };

    var assertIsNumber = function assertIsNumber(number, name) {
        assertIsString(name, 'name');

        if (!_.isNumber(number)) {
            throw new Error(name + ' must be a number.');
        }
    };

    var assertIsObject = function assertIsObject(collection, name) {
        assertIsString(name, 'name');

        if (!_.isObject(collection)) {
            throw new Error('collection type not supported - ' + name + ' must be an array or object.');
        }
    };

    var assertIsFunction = function assertIsFunction(callback, name) {
        assertIsString(name, 'name');

        if (!_.isFunction(callback)) {
            throw new Error(name + ' must be a function.');
        }
    };

    var assertIsString = function assertIsString(value, name) {
        if (!_.isString(name)) {
            throw new Error('Name must be a string.');
        }

        if (!_.isString(value)) {
            throw new Error(name + ' must be a string.');
        }
    };

    function buildPathFromString(stringPath) {
        var properties = stringPath.split('.');
        var path = [];

        _.forEach(properties, function(prop) {
            path = path.concat(buildSubPathFromString(prop));
        });

        return path;
    }

    function buildSubPathFromString(stringPath) {
        var possibleSubPath = '';
        var path = [];
        var countOfOpeningBrackets = 0;

        for (var i = 0; i < stringPath.length; i++) {
            if (stringPath[i] === '[') {
                countOfOpeningBrackets++;

                if (!_.isString(possibleSubPath) || countOfOpeningBrackets > 1) {
                    return [stringPath];
                }

                if (possibleSubPath) {
                    path.push(possibleSubPath);
                    possibleSubPath = '';
                }
            } else if (stringPath[i] === ']') {
                countOfOpeningBrackets--;

                if (countOfOpeningBrackets !== 0) {
                    return [stringPath];
                }

                path.push(possibleSubPath);
                possibleSubPath = '';
            } else if (i === stringPath.length - 1) {
                return [stringPath];
            } else {
                possibleSubPath += stringPath[i];
            }
        }

        return path;
    }

    function getNextValue(path, index, currentLocation, value) {
        if (path.length - 1 === index) {
            return value;
        }

        var currentPropOrIndex = path[index];
        var nextPropOrIndex = path[index + 1];

        if (_.isArray(currentLocation[currentPropOrIndex]) || _.isObject(currentLocation[currentPropOrIndex])) {
            return currentLocation[currentPropOrIndex];
        }

        if (!_.isArray(currentLocation[currentPropOrIndex]) && _.isNumber(parseInt(nextPropOrIndex))) {
            return [];
        } else if (!_.isObject(currentLocation[currentPropOrIndex]) && _.isString(nextPropOrIndex)) {
            return {};
        }

        throw new Error('Unsupported type ' + typeof currentPropOrIndex + ' when setting property or index');
    }

    function setNextValue(objectToTraverse, propertyOrIndex, value) {
        if (_.isNumber(parseInt(propertyOrIndex)) && _.isArray(objectToTraverse)) {
            return objectToTraverse[propertyOrIndex] = value;
        } else if (_.isString(propertyOrIndex) && _.isObject(objectToTraverse)) {
            return objectToTraverse[propertyOrIndex] = value;
        }

        throw new Error('Unsupported type ' + typeof propertyOrIndex + ' when setting property or index');
    }

    return _;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Copyright 2018 Phenix Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(1)
], __WEBPACK_AMD_DEFINE_RESULT__ = function(LodashLight) {
    'use strict';

    return LodashLight;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Copyright 2018 Phenix Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(0)
], __WEBPACK_AMD_DEFINE_RESULT__ = function(detectBrowser) {
    return detectBrowser;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })
/******/ ]);
});
//# sourceMappingURL=phenix-web-detect-browser.js.map