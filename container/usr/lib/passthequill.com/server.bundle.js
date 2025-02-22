module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "dedent"
var external_dedent_ = __webpack_require__(19);
var external_dedent_default = /*#__PURE__*/__webpack_require__.n(external_dedent_);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/always-return.js
/* harmony default export */ var always_return = (something => () => something);

// EXTERNAL MODULE: external "clone-deep"
var external_clone_deep_ = __webpack_require__(13);
var external_clone_deep_default = /*#__PURE__*/__webpack_require__.n(external_clone_deep_);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/clone_object.js
/* harmony default export */ var clone_object = (anObject => Object.assign({}, anObject));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/m-set_map.js
/* harmony default export */ var m_set_map = ((key, value) => aMap => {
  aMap.set(key, value)
  return aMap
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/m-set_object.js
/* harmony default export */ var m_set_object = ((key, value) => anObject => {
  anObject[key] = value
  return anObject
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/reduce_map.js
/* harmony default export */ var reduce_map = ((reducerFunction, result) => aMap => {
  for (const [key, value] of aMap) {
    result = reducerFunction(result, value, key, aMap)
  }
  return result
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/reduce_object.js
/* harmony default export */ var reduce_object = ((reducerFunction, start) => anObject => {
  return Array.prototype.reduce.call(
    Object.keys(anObject),
    (result, key) => reducerFunction(result, anObject[key], key, anObject),
    start
  )
});

// EXTERNAL MODULE: external "object-inspect"
var external_object_inspect_ = __webpack_require__(45);
var external_object_inspect_default = /*#__PURE__*/__webpack_require__.n(external_object_inspect_);

// EXTERNAL MODULE: external "type-detect"
var external_type_detect_ = __webpack_require__(8);
var external_type_detect_default = /*#__PURE__*/__webpack_require__.n(external_type_detect_);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/first_map-or-set.js
/* harmony default export */ var first_map_or_set = (aMapOrSet => aMapOrSet[Symbol.iterator]().next().value);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/first-character-to-lower-case.js
/* harmony default export */ var first_character_to_lower_case = (str => str[0].toLowerCase() + str.slice(1));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/flow.js
/* harmony default export */ var flow = (functionArray => arg =>
  functionArray.reduce((result, aFunction) => aFunction(result), arg));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/pass-through.js


/* harmony default export */ var pass_through = ((arg, functionArray) => flow(functionArray)(arg));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/contains_string.js
/* harmony default export */ var contains_string = (possibleSubString => fullString =>
  fullString.indexOf(possibleSubString) !== -1);

// EXTERNAL MODULE: external "universal-eol"
var external_universal_eol_ = __webpack_require__(46);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/get-first-n-lines.js
/* harmony default export */ var get_first_n_lines = (numberOfLinesToGet => aString => {
  const lines = ['']

  let i = 0,
    numLinesReached = false

  while (!numLinesReached && i < aString.length) {
    const currentCharacter = aString[i],
      nextCharacter = aString[i + 1]

    if (isNewline(currentCharacter, nextCharacter)) {
      if (currentCharacter === '\r') i += 1

      numLinesReached = lines.length === numberOfLinesToGet
      if (!numLinesReached) lines.push('')
    } else lines[lines.length - 1] += aString[i]

    i += 1
  }

  return {
    lines,
    moreLinesExist: numLinesReached,
  }
});

//
//------------------//
// Helper Functions //
//------------------//

function isNewline(currentCharacter, nextCharacter) {
  return (
    currentCharacter === '\n' ||
    (currentCharacter === '\r' && nextCharacter === '\n')
  )
}

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/truncate-to-n-lines.js



/* harmony default export */ var truncate_to_n_lines = (numberOfLines => aString => {
  const { lines, moreLinesExist } = get_first_n_lines(numberOfLines)(aString)
  if (moreLinesExist) lines.push('...')

  return lines.join(external_universal_eol_["EOL"])
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/truncate-to-n-chars.js



const hasNewline = contains_string('\n')

/* harmony default export */ var truncate_to_n_chars = (numberOfCharacters => aString => {
  if (hasNewline(aString)) {
    throw new Error(
      "You can't call 'truncate-to-n-chars' on a multi-line string" +
        `\nstring passed: ${truncate_to_n_lines(2)(aString)}`
    )
  }

  if (aString.length > numberOfCharacters) {
    aString = aString.slice(0, numberOfCharacters) + '...'
  }

  return aString
});

// CONCATENATED MODULE: ./node_modules/fes/lib/helpers.js
//---------//
// Imports //
//---------//









//
//------//
// Init //
//------//

const typeToSpecialCase = getTypeToSpecialCase()

//
//------//
// Main //
//------//

const getType = something => {
  const type = external_type_detect_default()(something)

  return typeToSpecialCase[type] || first_character_to_lower_case(type)
}

//
// used in 'can-combine_(map|set).js'
//
// there's no helpful way to display all the shared keys with maps and sets, so
//   let's just display the first one
//
function getFirstSharedKeyString(duplicateKeys) {
  return pass_through(duplicateKeys, [
    first_map_or_set,
    external_object_inspect_default.a,
    truncate_to_n_chars(20),
  ])
}

//
//------------------//
// Helper Functions //
//------------------//

function getTypeToSpecialCase() {
  return {
    HTMLCollection: 'htmlCollection'
  }
}

//
//---------//
// Exports //
//---------//



// CONCATENATED MODULE: ./node_modules/fes/lib/internal/assign-over-recursively.js
//---------//
// Imports //
//---------//











//
//------//
// Main //
//------//

const assignOverRecursively = {
  map: mapThatGetsAssignedOver => {
    return reduce_map((result, newValue, key) => {
      const existingValue = result.get(key)
      return m_set_map(key, merge(existingValue, newValue))(result)
    }, new Map(mapThatGetsAssignedOver))
  },

  object: objectThatGetsAssignedOver => {
    return reduce_object((result, newValue, key) => {
      const existingValue = result[key]
      return m_set_object(key, merge(existingValue, newValue))(result)
    }, clone_object(objectThatGetsAssignedOver))
  },
}

//
// this has to be declared after `assignOverRecursively` because it utilizes
//   that structure
//
const typeToAssignRecursively = getTypeToAssignRecursively()

//
//------------------//
// Helper Functions //
//------------------//

function merge(existingValue, newValue) {
  const existingValueType = getType(existingValue),
    newValueType = getType(newValue)

  const mergeFunction =
    existingValueType === newValueType
      ? typeToAssignRecursively[newValueType] || overwriteWithDeepClone
      : overwriteWithDeepClone

  return mergeFunction(existingValue)(newValue)
}

function overwriteWithDeepClone(_unusedExistingValue) {
  return newValue => external_clone_deep_default()(newValue)
}

function cloneAndMergeSets(firstSet) {
  return secondSet => {
    const cloneOfFirstSet = external_clone_deep_default()(firstSet),
      cloneOfSecondSet = external_clone_deep_default()(secondSet)

    return new Set([...cloneOfFirstSet, ...cloneOfSecondSet])
  }
}

function getTypeToAssignRecursively() {
  return {
    map: assignOverRecursively.map,
    object: assignOverRecursively.object,
    set: cloneAndMergeSets,
  }
}

//
//---------//
// Exports //
//---------//

/* harmony default export */ var assign_over_recursively = (assignOverRecursively);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/assign-over_map.js
/* harmony default export */ var assign_over_map = (mapThatGetsAssignedOver => primaryMap =>
  new Map([...mapThatGetsAssignedOver, ...primaryMap]));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/assign-over_object.js
/* harmony default export */ var assign_over_object = (objectThatGetsAssignedOver => primaryObject =>
  Object.assign({}, objectThatGetsAssignedOver, primaryObject));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/assign-over_set.js
/* harmony default export */ var assign_over_set = (setThatGetsAssignedOver => primarySet =>
  new Set([...setThatGetsAssignedOver, ...primarySet]));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/reduce_set.js
/* harmony default export */ var reduce_set = ((reducerFunction, result) => aSet => {
  for (const value of aSet) {
    result = reducerFunction(result, value, value, aSet)
  }
  return result
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/keep-intersection_set.js


/* harmony default export */ var keep_intersection_set = (set1 => set2 => {
  return reduce_set((result, set1Value) => {
    if (set2.has(set1Value)) result.add(set1Value)
    return result
  }, new Set())(set1)
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/set-of-keys_map.js
/* harmony default export */ var set_of_keys_map = (aMap => new Set(aMap.keys()));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/can-combine_map.js




/* harmony default export */ var can_combine_map = (map1 => map2 => {
  const setOfMap1Keys = set_of_keys_map(map1),
    setOfMap2Keys = set_of_keys_map(map2),
    duplicateKeys = keep_intersection_set(setOfMap1Keys)(setOfMap2Keys)

  if (duplicateKeys.size) {
    const firstSharedKeyString = getFirstSharedKeyString(duplicateKeys)

    return new Error(
      'Unable to combine the passed maps as they have at least one shared key' +
        `first shared key found: ${firstSharedKeyString}`
    )
  }
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/get-array-of-values_set.js
/* harmony default export */ var get_array_of_values_set = (aSet => [...aSet]);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/join_array-like.js
/* harmony default export */ var join_array_like = (aString => arrayLike =>
  Array.prototype.join.call(arrayLike, aString));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/keep-first_array-like.js
/* harmony default export */ var keep_first_array_like = (numberOfElementsToKeep => arrayLike =>
  Array.prototype.slice.call(arrayLike, 0, numberOfElementsToKeep));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/for-each_array-like.js
/* harmony default export */ var for_each_array_like = (eachFunction => arrayLike => {
  for (let i = 0; i < arrayLike.length; i += 1) {
    eachFunction(arrayLike[i], i, arrayLike)
  }
  return arrayLike
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/map_array-like.js


/* harmony default export */ var map_array_like = (mapFunction => arrayLike => {
  const result = new Array(arrayLike.length)

  for_each_array_like((element, idx) => {
    result[idx] = mapFunction(element, idx, arrayLike)
  })(arrayLike)

  return result
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/m-append_array-like.js
//
// README
// - This file is not correct strictly speaking, as strings are both immutable
//   and 'array-like'.  This is thus a convenience method for declaring
//   array-like behavior for functions where mutability gives us speed gains
//   and strings must be handled alongside
//

/* harmony default export */ var m_append_array_like = (value => arrayLike => {
  if (typeof arrayLike === 'string') return arrayLike + value

  Array.prototype.push.call(arrayLike, value)
  return arrayLike
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/set-of-keys_object.js
/* harmony default export */ var set_of_keys_object = (anObject => new Set(Object.keys(anObject)));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/can-combine_object.js
//---------//
// Imports //
//---------//











//
//------//
// Main //
//------//

/* harmony default export */ var can_combine_object = (object1 => object2 => {
  const setOfObject1Keys = set_of_keys_object(object1),
    setOfObject2Keys = set_of_keys_object(object2),
    duplicateKeys = keep_intersection_set(setOfObject1Keys)(setOfObject2Keys)

  if (duplicateKeys.size) {
    const [s, aKeyOrKeys] =
        duplicateKeys.size === 1 ? ['', 'a key'] : ['s', 'keys'],
      numberOfKeysToShow = 3,
      numberOfKeysNotShown = duplicateKeys.size - numberOfKeysToShow,
      sharedKeysString = pass_through(duplicateKeys, [
        get_array_of_values_set,
        keep_first_array_like(numberOfKeysToShow),
        map_array_like(truncate_to_n_chars(20)),
        keys => {
          return numberOfKeysNotShown > 0
            ? m_append_array_like(`...(${numberOfKeysNotShown} more)`)(keys)
            : keys
        },
        join_array_like(', '),
      ])

    return new Error(
      `Unable to combine the passed objects as they share ${aKeyOrKeys}` +
        `\nkey${s} shared: ${sharedKeysString}`
    )
  }
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/can-combine_set.js



/* harmony default export */ var can_combine_set = (set1 => set2 => {
  const duplicateKeys = keep_intersection_set(set1)(set2)

  if (duplicateKeys.size) {
    const firstSharedKeyString = getFirstSharedKeyString(duplicateKeys)

    return new Error(
      'Unable to combine the passed sets as they have at least one shared value' +
        `first shared value found: ${firstSharedKeyString}`
    )
  }
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/clone_arguments.js
/* harmony default export */ var clone_arguments = (anArgumentsObject => returnArguments(...anArgumentsObject));

function returnArguments() {
  return arguments
}

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/clone_array.js
/* harmony default export */ var clone_array = (anArray => anArray.slice());

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/copy-own-enumerable-props.js
//
// README
//  - I can't think of a good name for this file.  This function's purpose is to
//    take <something> which has own enumberable properties and copy them onto
//    <cloned something>.  This allows us to copy own enumerable properties
//    from/to e.g. a function
//

/* harmony default export */ var copy_own_enumerable_props = ((originalSomething, clonedSomething) => {
  for (const key of Object.keys(originalSomething)) {
    clonedSomething[key] = originalSomething[key]
  }
  return clonedSomething
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/clone_date.js


/* harmony default export */ var clone_date = (aDate => copy_own_enumerable_props(aDate, new Date(aDate.getTime())));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/construct_0arg.js
/* harmony default export */ var construct_0arg = (ctor => () => new ctor());

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/construct_1arg.js
/* harmony default export */ var construct_1arg = (ctor => arg => new ctor(arg));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/contains-all_set.js
/* harmony default export */ var contains_all_set = (setOfValuesToCheckFor => aSet => {
  let allAreContained = true

  for (const value of setOfValuesToCheckFor) {
    allAreContained = aSet.has(value)
    if (!allAreContained) break
  }

  return allAreContained
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/contains-all_array-like.js


/* harmony default export */ var contains_all_array_like = (setOfElementsToCheckFor => inThisArrayLike =>
  contains_all_set(setOfElementsToCheckFor)(new Set(inThisArrayLike)));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/contains-any_set.js
/* harmony default export */ var contains_any_set = (setOfValuesToCheckFor => aSet => {
  let anyAreContained = false

  for (const value of setOfValuesToCheckFor) {
    anyAreContained = aSet.has(value)
    if (anyAreContained) break
  }

  return anyAreContained
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/contains-any_array-like.js


/* harmony default export */ var contains_any_array_like = (setOfElementsToCheckFor => inThisArrayLike =>
  contains_any_set(setOfElementsToCheckFor)(new Set(inThisArrayLike)));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/contains-any_string.js


/* harmony default export */ var contains_any_string = (setOfStringsToCheckFor => inThisString => {
  let result = false

  for (const possibleSubString of setOfStringsToCheckFor) {
    if (contains_string(possibleSubString)(inThisString)) {
      result = true
      break
    }
  }

  return result
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/create-empty-collection-from-instance.js


const typeToEmptyCollectionCreator = getTypeToEmptyCollectionCreator()

/* harmony default export */ var create_empty_collection_from_instance = (collection => typeToEmptyCollectionCreator[getType(collection)]());

//
//------------------//
// Helper Functions //
//------------------//

function getTypeToEmptyCollectionCreator() {
  return {
    array: () => [],
    float32Array: () => new Float32Array(),
    float64Array: () => new Float64Array(),
    int16Array: () => new Int16Array(),
    int32Array: () => new Int32Array(),
    int8Array: () => new Int8Array(),
    map: () => new Map(),
    object: () => ({}),
    set: () => new Set(),
    string: () => '',
    uint16Array: () => new Uint16Array(),
    uint32Array: () => new Uint32Array(),
    uint8Array: () => new Uint8Array(),
    uint8ClampedArray: () => new Uint8ClampedArray(),
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/discard-all_set.js


/* harmony default export */ var discard_all_set = (setOfValuesToRemove => fromASet =>
  reduce_set((result, value) => {
    if (!setOfValuesToRemove.has(value)) result.add(value)
    return result
  }, new Set())(fromASet));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/discard-at_array-like.js
/* harmony default export */ var discard_at_array_like = (idxToRemove => arrayLike =>
  Array.prototype.concat.call(
    Array.prototype.slice.call(arrayLike, 0, idxToRemove),
    Array.prototype.slice.call(arrayLike, idxToRemove + 1)
  ));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/discard-first_array-like.js
/* harmony default export */ var discard_first_array_like = (numberOfElementsToDiscard => arrayLike =>
  Array.prototype.slice.call(arrayLike, numberOfElementsToDiscard));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/discard-first_string.js
/* harmony default export */ var discard_first_string = (numberOfCharactersToDiscard => aString =>
  String.prototype.slice.call(aString, numberOfCharactersToDiscard));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/discard-last_array-like.js
/* harmony default export */ var discard_last_array_like = (numberOfElementsToDiscard => arrayLike =>
  arrayLike.slice(0, -numberOfElementsToDiscard));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/discard-when_array-like.js
/* harmony default export */ var discard_when_array_like = (shouldDiscard => arrayLike => {
  const result = []
  Array.prototype.forEach.call(arrayLike, (value, index) => {
    if (!shouldDiscard(value, index, arrayLike)) result.push(value)
  })
  return result
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/filter_object.js


/* harmony default export */ var filter_object = (predicate =>
  reduce_object((result, value, key, anObject) => {
    if (predicate(value, key, anObject)) result[key] = value

    return result
  }, {}));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/find-first-when_array-like.js
/* harmony default export */ var find_first_when_array_like = (predicate => anArrayLike => {
  for (let i = 0; i < anArrayLike.length; i += 1) {
    const value = anArrayLike[i]
    if (predicate(value, i, anArrayLike)) return value
  }
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/first-key_object.js
/* harmony default export */ var first_key_object = (anObject => Object.keys(anObject)[0]);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/first_array-like.js
/* harmony default export */ var first_array_like = (anArrayLike => anArrayLike[0]);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/flip.js
/* harmony default export */ var flip = (aFunction => (first, second) => aFunction(second, first));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/get-count_object.js
/* harmony default export */ var get_count_object = (anObject => Object.keys(anObject).length);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/get-value-at_object.js
/* harmony default export */ var get_value_at_object = (key => anObject => anObject[key]);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/get-value-from_object.js
/* harmony default export */ var get_value_from_object = (anObject => key => anObject[key]);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/has-key_object.js
/* harmony default export */ var has_key_object = (key => anObject => anObject[key] !== undefined || key in anObject);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/has-own-enumerable-key.js
/* harmony default export */ var has_own_enumerable_key = (key => something =>
  something != null &&
  typeof something === 'object' &&
  new Set(Object.keys(something)).has(key));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/invoke.js
/* harmony default export */ var invoke = (aFunction => aFunction());

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/is-empty_has-length.js
/* harmony default export */ var is_empty_has_length = (something => something.length === 0);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/is-empty_has-size.js
/* harmony default export */ var is_empty_has_size = (something => something.size === 0);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/is-empty_object.js
/* harmony default export */ var is_empty_object = (anObject => Object.keys(anObject).length === 0);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/negate.js
/* harmony default export */ var negate = (predicate => (...args) => !predicate(...args));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/is-laden_has-length.js


/* harmony default export */ var is_laden_has_length = (negate(is_empty_has_length));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/is-laden_has-size.js


/* harmony default export */ var is_laden_has_size = (negate(is_empty_has_size));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/is-laden_object.js


/* harmony default export */ var is_laden_object = (negate(is_empty_object));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/is-truthy.js
/* harmony default export */ var is_truthy = (something => !!something);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/join_set.js
/* harmony default export */ var join_set = (aString => aSet => {
  if (!aSet.size) return ''

  const iterator = aSet.values()
  let { value } = iterator.next(),
    result = `${value}`

  for (value of iterator) {
    result += `${aString}${value}`
  }

  return result
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/jstring.js
/* harmony default export */ var jstring = (something => {
  const replacer = createReplacer()

  return '' + JSON.stringify(something, replacer, 2)
});

function createReplacer() {
  //
  // I'm choosing to use 'replacer' because I don't like 'utils.inspect'.
  //   To solve the problem of circular json structures, I'm just keeping track
  //   of all objects added.  I think I actually prefer this because it provides
  //   both a more concise and acurate structure of the data.
  //
  const duplicateObjects = new Map()

  return (key, value) => {
    if (value && typeof value === 'object') {
      if (duplicateObjects.has(value)) {
        return `<duplicate of '${duplicateObjects.get(value)}'>`
      } else {
        duplicateObjects.set(value, key)
        return value
      }
    }
    return typeof value === 'function' ? '<function>' : value
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/keep-first_string.js
/* harmony default export */ var keep_first_string = (numberOfCharactersToKeep => aString =>
  String.prototype.slice.call(aString, 0, numberOfCharactersToKeep));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/keep-intersection_array.js


/* harmony default export */ var keep_intersection_array = (array1 => array2 => {
  const setOfArray1Values = new Set(array1),
    setOfArray2Values = new Set(array2)

  return reduce_set((result, array1value) => {
    if (setOfArray2Values.has(array1value)) result.push(array1value)
    return result
  }, [])(setOfArray1Values)
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/keep-when_array-like.js
/* harmony default export */ var keep_when_array_like = (filterFunction => arrayLike =>
  Array.prototype.filter.call(arrayLike, filterFunction));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/last_array-like.js
/* harmony default export */ var last_array_like = (arrayLike => Array.prototype.slice.call(arrayLike, -1));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/m-assign-over_map.js
/* harmony default export */ var m_assign_over_map = (mapThatGetsAssignedInto => primaryMap => {
  for (const [key, value] of primaryMap) {
    mapThatGetsAssignedInto.set(key, value)
  }
  return mapThatGetsAssignedInto
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/m-assign-over_object.js
/* harmony default export */ var m_assign_over_object = (objectThatGetsAssignedInto => primaryObject =>
  Object.assign(objectThatGetsAssignedInto, primaryObject));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/m-assign-over_set.js
/* harmony default export */ var m_assign_over_set = (setThatGetsAssignedInto => primarySet => {
  for (const value of primarySet) {
    setThatGetsAssignedInto.add(value)
  }
  return setThatGetsAssignedInto
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/m-map_array-like.js


/* harmony default export */ var m_map_array_like = (mapFunction => arrayLike => {
  for_each_array_like((element, idx) => {
    arrayLike[idx] = mapFunction(element, idx, arrayLike)
  })(arrayLike)

  return arrayLike
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/m-map_object.js


/* harmony default export */ var m_map_object = (mapFunction => object => {
  return reduce_object((result, value, key) => {
    result[key] = mapFunction(value, key, object)
    return result
  }, object)(object)
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/m-transform-properties.js



/* harmony default export */ var m_transform_properties = (transforms => anObject => {
  return reduce_object((result, aTransform, key) => {
    if (has_key_object(key)(anObject))
      result[key] = aTransform(anObject[key], key, anObject)
    return result
  }, anObject)(transforms)
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/map_object.js


/* harmony default export */ var map_object = (mapFunction => object => {
  const result = {}

  for_each_array_like(key => {
    result[key] = mapFunction(object[key], key, object)
  })(Object.keys(object))

  return result
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/noop.js
/* harmony default export */ var noop = (() => {});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/reduce_array-like.js
/* harmony default export */ var reduce_array_like = ((reducerFunction, start) => arrayLike =>
  Array.prototype.reduce.call(arrayLike, reducerFunction, start));

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/repeat_string.js
//
// implementation thanks to Jon Schlinkert
//
/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

/* harmony default export */ var repeat_string = (numberOfTimes => stringToRepeat => {
  // cover common, quick use cases
  if (numberOfTimes === 1) return stringToRepeat
  if (numberOfTimes === 2) return stringToRepeat + stringToRepeat

  const max = stringToRepeat.length * numberOfTimes
  let result = ''

  while (max > result.length && numberOfTimes > 1) {
    if (numberOfTimes & 1) {
      result += stringToRepeat
    }

    numberOfTimes >>= 1
    stringToRepeat += stringToRepeat
  }

  result += stringToRepeat
  result = result.substr(0, max)

  return result
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/return-first-argument.js
/* harmony default export */ var return_first_argument = (firstArgument => firstArgument);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/strictly-equals.js
/* harmony default export */ var strictly_equals = (val1 => val2 => val1 === val2);

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/transform-properties_array.js


/* harmony default export */ var transform_properties_array = (transforms => anArray => {
  return map_array_like((value, key) => {
    const aTransform = transforms[key]
    return aTransform ? aTransform(value, key, anArray) : value
  })(anArray)
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/transform-properties_object.js


/* harmony default export */ var transform_properties_object = (transforms => anObject => {
  return reduce_object((result, value, key) => {
    const aTransform = transforms[key]
    result[key] = aTransform ? aTransform(value, key, anObject) : value
    return result
  }, {})(anObject)
});

// CONCATENATED MODULE: ./node_modules/fes/lib/internal/index.js



























































































// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/helpers.js
//---------//
// Imports //
//---------//









//
//------//
// Main //
//------//

const findFirstValueWithTruthyKey = flow([find_first_when_array_like(first_array_like), get_value_at_object(1)])

const formatGivenArgument = ({ anArg, argIdx }) => {
  const argToString = pass_through(anArg, [jstring, truncate_to_n_lines(3)])

  return `Argument ${argIdx} given: ${argToString}`
}

const setIfNotDefined = (obj, key, val) => {
  if (obj[key] === undefined) obj[key] = val
  return obj
}

const throwOrReject = (error, isAsynchronous) => {
  if (isAsynchronous) return Promise.reject(error)
  else throw error
}

const setOfTypedArrays = getSetOfTypedArrays()

//
//------------------//
// Helper Functions //
//------------------//

function getSetOfTypedArrays() {
  return new Set([
    'float32Array',
    'float64Array',
    'int16Array',
    'int32Array',
    'int8Array',
    'uint16Array',
    'uint32Array',
    'uint8Array',
    'uint8ClampedArray',
  ])
}

//
//---------//
// Exports //
//---------//



// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/approve-data-argument.js
//---------//
// Imports //
//---------//








//
//------//
// Init //
//------//

const truncateDataArg = flow([jstring, truncate_to_n_lines(3)])

//
//------//
// Main //
//------//

function approveDataArgument(
  args,
  authorDefinedApproveArguments,
  definition,
  specialCaseProperties = {}
) {
  const { takesAnyDataType } = specialCaseProperties,
    {
      name,
      isArrayOfData,
      shouldThrowOnExtraDataArguments,
      typeToDataDependentProps,
      typeToFunction,
    } = definition

  // it's not possible for args.length === 0 here
  if (args.length !== 1 && shouldThrowOnExtraDataArguments) {
    const truncatedArgs = pass_through(args, [
      map_array_like((anArg, argIdx) => ({ anArg, argIdx })),
      m_map_array_like(formatGivenArgument),
    ])

    return new Error(
      external_dedent_default()(`
        You passed more than a single data argument to '${name}'
        Number of arguments passed: ${args.length}

        ${join_array_like('\n\n')(truncatedArgs)}
      `)
    )
  }

  const dataArg = args[0]

  if (isArrayOfData) {
    const dataType = getType(dataArg)
    if (dataType !== 'array') {
      return new Error(
        external_dedent_default()(`
          The function '${name}' was passed a data argument type of
            '${dataType}' but requires an array

          Data argument passed: ${truncateDataArg(dataArg)}
        `)
      )
    }
  } else if (!takesAnyDataType) {
    const dataTypes = Object.keys(typeToFunction || typeToDataDependentProps),
      setOfValidDataTypes = new Set(dataTypes),
      dataType = getType(dataArg)

    if (!setOfValidDataTypes.has(dataType)) {
      const validDataTypesString = pass_through(setOfValidDataTypes, [
        consolidateTypedArrays,
        join_set(', '),
      ])
      return new Error(
        external_dedent_default()(`
          The function '${name}' was passed a data argument type
            of '${dataType}'

          Allowed types: ${validDataTypesString}

          Data argument passed: ${truncateDataArg(dataArg)}
        `)
      )
    }
  }

  // might also be a function or undefined
  const maybeError = authorDefinedApproveArguments(dataArg)
  if (getType(maybeError) === 'error') return maybeError
}

function consolidateTypedArrays(setOfValidDataTypes) {
  let result = setOfValidDataTypes
  if (contains_all_set(setOfTypedArrays)(setOfValidDataTypes)) {
    result = discard_all_set(setOfTypedArrays)(setOfValidDataTypes)
    result.add('any typed array e.g. int8Array or float32Array')
  }

  return result
}

// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/approve-types.js
//---------//
// Imports //
//---------//






//
//------//
// Main //
//------//

//
// TODO: separate this method in two.  One for argumentTypes and one
//   for serviceArgumentTypes
//
const approveTypes = arg => {
  const {
      args,
      expectedArgumentTypes,
      expectedServiceArgumentTypes,
      name,
    } = arg,
    allExpectedTypes = expectedArgumentTypes || expectedServiceArgumentTypes

  // sanity check
  validateArg(arg)

  const areServiceArguments = !!expectedServiceArgumentTypes,
    str = {
      arguments: areServiceArguments ? 'service arguments' : 'arguments',
    },
    functionChain = [
      keep_when_array_like(argumentIsWrongType),
      map_array_like(toInvalidTypeError),
      reduce_array_like(toAllIndecesAndMessages, { indices: [], messages: [] }),
      toInvalidTypeErrorMessage,
    ]

  if (areServiceArguments) {
    functionChain.unshift(keep_first_array_like(expectedServiceArgumentTypes.length))
  }

  return pass_through(args, functionChain)

  // scoped helper functions

  function toInvalidTypeErrorMessage({ indices, messages }) {
    if (!indices.length) return

    const truncatedArgs = pass_through(indices, [
        map_array_like(argIdx => ({ anArg: args[argIdx], argIdx })),
        map_array_like(formatGivenArgument),
      ]),
      firstLine =
        `'${name}' was passed one or more ${str.arguments} with` +
        ' incorrect types'

    return (
      firstLine +
      `\n${join_array_like('\n\n')(messages)}` +
      `\n\n${join_array_like('\n\n')(truncatedArgs)}`
    )
  }

  function toInvalidTypeError(anArg, idx) {
    const actualType = getType(anArg),
      setOfExpectedTypes = allExpectedTypes[idx],
      initialMessage = `Argument ${idx} has type ${actualType} but was supposed to have `,
      restOfMessage =
        setOfExpectedTypes.size > 1
          ? `one of the following types: ${join_set(', ')(setOfExpectedTypes)}`
          : `the type ${first_map_or_set(setOfExpectedTypes)}`,
      message = initialMessage + restOfMessage

    return { idx, message }
  }

  function argumentIsWrongType(anArg, idx) {
    const setOfExpectedTypes = allExpectedTypes[idx]
    if (setOfExpectedTypes.has('any')) return false

    const actualType = getType(anArg)

    return !setOfExpectedTypes.has(actualType)
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function toAllIndecesAndMessages(result, { idx, message }) {
  const { indices, messages } = result

  indices.push(idx)
  messages.push(message)

  return result
}

function validateArg(arg) {
  const { expectedArgumentTypes, expectedServiceArgumentTypes } = arg

  if (expectedArgumentTypes === expectedServiceArgumentTypes) {
    throw new Error(
      'This function requires either a property expectedArgumentTypes or' +
        ' expectedServiceArgumentTypes' +
        `\n\nArgument passed: ${jstring(arg)}`
    )
  } else if (!expectedArgumentTypes && !expectedServiceArgumentTypes) {
    throw new Error(
      'This function requires either a property expectedArgumentTypes OR' +
        ' expectedServiceArgumentTypes, not both' +
        `\n\nArgument passed: ${jstring(arg)}`
    )
  }
}

//
//---------//
// Exports //
//---------//

/* harmony default export */ var approve_types = (approveTypes);

// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/approve-service-arguments.js
//---------//
// Imports //
//---------//







//
//------//
// Main //
//------//

//
// expectedServiceArgumentTypes is not extracted from definition because it's
//   also used in `create-type-to-data-utility` which must first determine the
//   data argument type before passing
//   `typeToDataDependentProps[data argument type].expectedServiceArgumentTypes`
//
const common = (
  args,
  authorDefinedApproveArguments,
  definition,
  expectedServiceArgumentTypes
) => {
  const { name, shouldThrowOnExtraServiceArguments } = definition,
    numberOfServiceArguments = expectedServiceArgumentTypes.length

  if (
    (args.length !== numberOfServiceArguments &&
      shouldThrowOnExtraServiceArguments) ||
    (args.length < numberOfServiceArguments &&
      !shouldThrowOnExtraServiceArguments)
  ) {
    const truncatedArgs = pass_through(args, [
      map_array_like((anArg, argIdx) => ({ anArg, argIdx })),
      m_map_array_like(formatGivenArgument),
    ])

    return new Error(
      `The function '${name}' requires ${numberOfServiceArguments} service` +
        ` arguments.   You passed ${args.length}.` +
        `\n\n${join_array_like('\n\n')(truncatedArgs)}`
    )
  }

  const errorMessage = approve_types({
    args,
    expectedServiceArgumentTypes,
    name,
  })
  if (errorMessage) return new Error(errorMessage)

  // might also be a function or undefined
  const maybeError = authorDefinedApproveArguments(...args)
  if (getType(maybeError) === 'error') return maybeError
}

const dataDependent = common,
  independent = (args, authorDefinedApproveArguments, definition) =>
    common(
      args,
      authorDefinedApproveArguments,
      definition,
      definition.expectedServiceArgumentTypes
    )

//
//---------//
// Exports //
//---------//

/* harmony default export */ var approve_service_arguments = ({ dataDependent, independent });

// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/normalize/expected-argument-types.js


function normalizeExpectedArgumentTypes(expectedArgumentTypes) {
  return map_array_like(oneOrManyTypes => {
    oneOrManyTypes = Array.isArray(oneOrManyTypes)
      ? oneOrManyTypes
      : [oneOrManyTypes]

    return new Set(oneOrManyTypes)
  })(expectedArgumentTypes)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/normalize/has-no-data-argument.js



const normalizeHasNoDataArgument = props => {
  return transform_properties_object({
    expectedArgumentTypes: normalizeExpectedArgumentTypes,
  })(props)
}

/* harmony default export */ var has_no_data_argument = (normalizeHasNoDataArgument);

// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/normalize/type-to-function.js
//
// TODO: move this file to a higher scope as other files utilize it
//

//---------//
// Imports //
//---------//






//
//------//
// Init //
//------//

const { assign: type_to_function_assign } = Object

//
//------//
// Main //
//------//

function normalizeTypeToFunction(typeToFunction) {
  const { arrayLike, mapOrSet, object } = typeToFunction
  let normalized = clone_object(typeToFunction)

  if (arrayLike) {
    normalized = type_to_function_assign(
      {
        allArrays: arrayLike,
        arguments: arrayLike,
        string: arrayLike,
        htmlCollection: arrayLike,
      },
      normalized
    )

    delete normalized.arrayLike
  }

  if (mapOrSet) {
    type_to_function_assign(normalized, {
      map: mapOrSet,
      set: mapOrSet,
    })

    delete normalized.mapOrSet
  }

  // this must happen before the 'untypedArray' check, because otherwise typed
  //   arrays will be added when they shouldn't be
  normalizeArrays(normalized)

  if (!normalized.function && object) {
    normalized.function = object
  }
  if (!normalized.error && object) {
    normalized.error = object
  }

  return normalized
}

function normalizeArrays(normalized) {
  if (!normalized.allArrays && !normalized.typedArray) return normalized
  if (normalized.allArrays && normalized.typedArray) {
    throw new Error(
      'You cannot declare allArrays and typedArray' +
        `\nutility name: ${normalized.name}`
    )
  }

  let arrayFunction
  if (normalized.allArrays) {
    arrayFunction = normalized.array = normalized.allArrays
    delete normalized.allArrays
  } else {
    arrayFunction = normalized.typedArray
    delete normalized.typedArray
  }

  return reduce_set(
    (result, aTypedArray) =>
      setIfNotDefined(result, aTypedArray, arrayFunction),
    normalized
  )(setOfTypedArrays)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/normalize/type-to-data-dependent-props.js
//---------//
// Imports //
//---------//






//
//------//
// Main //
//------//

/* harmony default export */ var type_to_data_dependent_props = (flow([
  map_object(
    transform_properties_object({
      expectedServiceArgumentTypes: normalizeExpectedArgumentTypes,
    })
  ),
  normalizeTypeToFunction,
]));

// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/normalize/definition.js
//---------//
// Imports //
//---------//












//
//------//
// Main //
//------//

const normalizeDefinition = definition => {
  const { mergeDefinitionWith } = definition

  if (mergeDefinitionWith) {
    definition = recursivelyMergeDefinition(definition, mergeDefinitionWith)
  }

  const {
    flippedFrom,
    hasNoDataArgument,
    name,
    expectedServiceArgumentTypes = [],
    transformResult = return_first_argument,
    approveArguments = () => noop,
  } = definition

  Object.assign(definition, {
    approveArguments,
    transformResult,
    hasDataArgument: !hasNoDataArgument,
    hasServiceArguments: expectedServiceArgumentTypes.length !== 0,
  })

  if (definition.hasDataArgument) {
    setIfNotDefined(definition, 'shouldThrowOnExtraDataArguments', true)
  } else {
    delete definition.transformResult
  }

  if (definition.hasServiceArguments) {
    setIfNotDefined(definition, 'shouldThrowOnExtraServiceArguments', true)
  }

  if (flippedFrom) {
    Object.assign(definition, flippedFrom, { name })
    if (definition.isDataFirst) {
      throw new Error(
        "Don't flip utilities which are already data-first.  For sake of" +
          ' simplicity we should only be flipping data-last utilities'
      )
    }
    if (!definition.hasDataArgument) {
      throw new Error(
        'You must flip a utility which has a data argument.  Flipping means' +
          ' you flip the service and data arguments around e.g. ' +
          ' `getValueAt(key)(object)` vs `getValueFrom(object)(key)`'
      )
    }

    definition.isFlipped = true
    definition.isDataFirst = true
    delete definition.flippedFrom
  }

  return transform_properties_object({
    expectedServiceArgumentTypes: normalizeExpectedArgumentTypes,
    hasNoDataArgument: has_no_data_argument,
    typeToDataDependentProps: type_to_data_dependent_props,
    typeToFunction: normalizeTypeToFunction,
  })(definition)
}

//
//------------------//
// Helper Functions //
//------------------//

function recursivelyMergeDefinition(definition, definitionToMergeWith) {
  delete definition.mergeDefinitionWith
  definition = assign_over_recursively.object(definitionToMergeWith)(definition)

  return definition.mergeDefinitionWith
    ? recursivelyMergeDefinition(definition, definition.mergeDefinitionWith)
    : definition
}

//
//---------//
// Exports //
//---------//

/* harmony default export */ var normalize_definition = (normalizeDefinition);

// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/create-array-of-data-utility.js
//
// TODO: reorganize special-case consumption of approveDataArgument to better
//   handle isArrayOfData (below we pass 'noop' which should be avoidable).
//
// TODO: figure out sane way to implement
//   alongside 'create-data-dependent-utility'
//
// TODO: handle service arguments
//

//---------//
// Imports //
//---------//




















//
//------//
// Main //
//------//

const createArrayOfDataUtility = definition => {
  const {
      isAsynchronous,
      name,
      transformResult,
      typeToFunction,
    } = definition,
    throwIfCalledDirectly = createThrowIfCalledDirectly(definition)

  return reduce_object(toTypeSpecificUtility, throwIfCalledDirectly)(typeToFunction)

  // scoped helper functinos

  function toTypeSpecificUtility(pluralTypeToFunction, theFunction, dataType) {
    return m_set_object(dataType + 's', typedUtility)(pluralTypeToFunction)

    function typedUtility(...dataArgs) {
      let error =
        approveDataArgument(dataArgs, noop, definition) ||
        approveElementTypes(name, dataArgs, dataType)
      if (error) return throwOrReject(error, isAsynchronous)

      error = definition.approveArguments(dataArgs[0])
      if (getType(error) === 'error') return throwOrReject(error, isAsynchronous)

      // phew no errors.  Onward!

      const validDataArg = dataArgs[0]
      return transformResult(theFunction(validDataArg))
    }
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function createThrowIfCalledDirectly(definition) {
  const { isAsynchronous, name, typeToFunction } = definition

  return function throwIfCalledDirectly(arg) {
    const example = `${name}.${first_key_object(typeToFunction)}s(...)`,
      expectedType = getType(arg) === 'array' ? getType(arg[0]) : null,
      hint = has_own_enumerable_key(expectedType)(typeToFunction)
        ? `Hint: you probably meant to call ${name}.${expectedType}s(...)`
        : ''

    const error = new Error(
      external_dedent_default()(`
        ${name} requires you specify the type such as ${example}.

        Without specifying the type, fes can't return a reasonable value in the
        case of an empty list.

        ${hint}
      `)
    )

    return throwOrReject(error, isAsynchronous)
  }
}

function approveElementTypes(name, dataArgs, dataType) {
  const arrayOfData = dataArgs[0],
    invalidElements = discard_when_array_like(flow([getType, strictly_equals(dataType)]))(
      arrayOfData
    )

  if (is_laden_has_length(invalidElements)) {
    const firstInvalidElement = invalidElements[0],
      firstInvalidElementString = pass_through(firstInvalidElement, [
        jstring,
        truncate_to_n_lines(3),
      ])
    return new Error(
      `The function '${name}.${dataType}s' was passed at least one element of an incorrect type` +
        `\nfirst invalid element type: ${getType(firstInvalidElement)}` +
        `\nfirst invalid element: ${firstInvalidElementString}`
    )
  }
}

//
//---------//
// Exports //
//---------//

/* harmony default export */ var create_array_of_data_utility = (createArrayOfDataUtility);

// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/create-no-data-argument-utility.js
//---------//
// Imports //
//---------//










//
//------//
// Main //
//------//

const createNoDataArgumentUtility = definition => {
  const { hasNoDataArgument, isAsynchronous, name } = definition,
    {
      expectedArgumentTypes,
      shouldThrowOnExtraArguments = true,
      theFunction,
      transformResult = return_first_argument,
    } = hasNoDataArgument

  return (...args) => {
    const error = approveArguments(args)

    if (error) return throwOrReject(error, isAsynchronous)

    // no errors, we good fam

    return transformResult(theFunction(...args))
  }

  // scoped helper functions

  function approveArguments(args) {
    const numberOfExpectedArguments = Object.keys(expectedArgumentTypes).length

    if (
      args.length < numberOfExpectedArguments ||
      (shouldThrowOnExtraArguments && args.length > numberOfExpectedArguments)
    ) {
      const truncatedArgs = pass_through(args, [
        map_array_like((anArg, argIdx) => ({ anArg, argIdx })),
        m_map_array_like(formatGivenArgument),
      ])

      return new Error(
        `The function '${name}' requires ${numberOfExpectedArguments}` +
          ` arguments.   You passed ${args.length}.` +
          `\n\n${join_array_like('\n\n')(truncatedArgs)}`
      )
    }

    const errorMessage = approve_types({
      args,
      expectedArgumentTypes,
      name,
    })
    if (errorMessage) return new Error(errorMessage)
  }
}

//
//---------//
// Exports //
//---------//

/* harmony default export */ var create_no_data_argument_utility = (createNoDataArgumentUtility);

// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/create-data-dependent-utility.js
//
// README
// - I can not think of a better name for this file.  Of course most of the
//   utilities are "data dependent" in that they provide different functionality
//   depending on the data argument passed.  This file however handles utilities
//   with the property `typeToDataDependentProps` whose functions have
//   other properties which are data-dependent.  The current two properties
//   available are `expectedServiceArgumentTypes`
//   and `transformServiceArguments`
//
// - Currently this type of utility will never be unary
//

//---------//
// Imports //
//---------//











//
//------//
// Main //
//------//

const createTypeToDataUtility = (definition, specialCaseProperties) => {
  const { isDataFirst, isFlipped } = specialCaseProperties,
    { isAsynchronous, typeToDataDependentProps } = definition

  //
  // TODO: rewrite below to handle 'isDataFirst' case more appropriately i.e. if
  //   the data argument is first then we can run validation before service
  //   arguments are passed.  The code may turn hairy as a result.
  //

  return (...firstArgs) => (...secondArgs) => {
    const [dataArgs, serviceArgs] = isDataFirst
      ? [firstArgs, secondArgs]
      : [secondArgs, firstArgs]

    //
    // need to validate data before service arguments because the service
    //   arguments depend on the data
    //
    let error = approveDataArgument(
      dataArgs,
      //
      // TODO: if approveArguments is passed in the root definition, then we
      //   should use that instead.  This is somewhat related to the above todo
      //   because we should be potentially running checks when firstArgs
      //   is passed
      //
      noop,
      definition,
      specialCaseProperties
    )
    if (error) return throwOrReject(error, isAsynchronous)

    let dataType = getType(dataArgs[0])
    if (!has_own_enumerable_key(dataType)(typeToDataDependentProps)) dataType = 'any'

    const {
        theFunction,
        approveArguments = definition.approveArguments,
        expectedServiceArgumentTypes = definition.expectedServiceArgumentTypes,
        transformResult = definition.transformResult,
        transformServiceArguments = definition.transformServiceArguments,
      } = typeToDataDependentProps[dataType],
      authorDefinedApproveArguments = approveArguments

    error = approve_service_arguments.dataDependent(
      serviceArgs,
      authorDefinedApproveArguments(dataArgs[0]),
      definition,
      expectedServiceArgumentTypes
    )
    if (error) return throwOrReject(error, isAsynchronous)

    // success woo woo

    if (transformServiceArguments) {
      const serviceArguments = isDataFirst ? secondArgs : firstArgs

      m_transform_properties(transformServiceArguments)(serviceArguments)
    }

    const result = isFlipped
      ? theFunction(...secondArgs)(...firstArgs)
      : theFunction(...firstArgs)(...secondArgs)

    return transformResult(result)
  }
}

//
//---------//
// Exports //
//---------//

/* harmony default export */ var create_data_dependent_utility = (createTypeToDataUtility);

// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/special-case.js
//---------//
// Imports //
//---------//












//
//------//
// Main //
//------//

const handleSpecialCaseUtility = definition => {
  const specialCaseProperties = getSpecialCaseProperties(definition),
    {
      expectedServiceArgumentTypes,
      hasNoDataArgument,
      isArrayOfData,
      typeToDataDependentProps,
    } = definition

  const createUtility = findFirstValueWithTruthyKey([
    [hasNoDataArgument, create_no_data_argument_utility],
    [isArrayOfData, create_array_of_data_utility],
    [typeToDataDependentProps, create_data_dependent_utility],
    [expectedServiceArgumentTypes, createPseudoCurriedFunction],
    [!expectedServiceArgumentTypes, createUnaryFunction],
  ])

  return createUtility(definition, specialCaseProperties)
}

const utilityIsSpecialCase = definition => {
  return is_laden_object(getSpecialCaseProperties(definition))
}

//
//------------------//
// Helper Functions //
//------------------//

function getSpecialCaseProperties(definition) {
  const {
    hasDataArgument,
    isArrayOfData,
    isDataFirst,
    isFlipped,
    shouldThrowOnExtraDataArguments,
    shouldThrowOnExtraServiceArguments,
    transformResult,
    transformServiceArguments,
    typeToDataDependentProps,
    typeToFunction,
  } = definition

  const result = filter_object(is_truthy)({
    hasNoDataArgument: !hasDataArgument,
    hasServiceArgumentTransforms: !!transformServiceArguments,
    isArrayOfData,
    isDataFirst,
    isFlipped,
    takesAnyDataType: !!(
      hasDataArgument && (typeToFunction || typeToDataDependentProps).any
    ),
    transformResult: transformResult !== return_first_argument,
    typeToDataDependentProps,
  })

  if (
    has_key_object('shouldThrowOnExtraDataArguments', definition) &&
    !shouldThrowOnExtraDataArguments
  ) {
    result.ignoreExtraDataArguments = true
  }

  if (
    has_key_object('shouldThrowOnExtraServiceArguments', definition) &&
    !shouldThrowOnExtraServiceArguments
  ) {
    result.ignoreExtraServiceArguments = true
  }

  return result
}

function createUnaryFunction(definition, specialCaseProperties) {
  const {
    approveArguments: authorDefinedApproveArguments,
    isAsynchronous,
    transformResult,
    typeToFunction,
  } = definition

  return (...dataArgs) => {
    const error = approveDataArgument(
      dataArgs,
      authorDefinedApproveArguments,
      definition,
      specialCaseProperties
    )
    if (error) return throwOrReject(error, isAsynchronous)

    // no errors - good to go!

    const validDataArg = dataArgs[0],
      dataType = getType(validDataArg),
      theFunction = typeToFunction[dataType] || typeToFunction.any

    return transformResult(theFunction(validDataArg))
  }
}

function createPseudoCurriedFunction(definition, specialCaseProperties) {
  //
  // remember we will never have a utility that was configured to be data-first
  //   and flipped at the same time.  That gets caught during normalization
  //
  const { isDataFirst, isFlipped } = specialCaseProperties,
    {
      approveArguments: authorDefinedApproveArguments,
      isAsynchronous,
      transformResult,
      transformServiceArguments,
    } = definition,
    [approveFirstArgs, approveSecondArgs] = isDataFirst
      ? [approveDataArgument, approve_service_arguments.independent]
      : [approve_service_arguments.independent, approveDataArgument]

  return (...firstArgs) => {
    let error = approveFirstArgs(
      firstArgs,
      authorDefinedApproveArguments,
      definition,
      specialCaseProperties
    )
    if (error) throw error

    // no errors yet

    return (...secondArgs) => {
      error = approveSecondArgs(
        secondArgs,
        authorDefinedApproveArguments(...firstArgs),
        definition,
        specialCaseProperties
      )
      if (error) return throwOrReject(error, isAsynchronous)

      // success woo woo

      const { typeToFunction } = definition,
        validDataArg = isDataFirst ? firstArgs[0] : secondArgs[0],
        dataType = getType(validDataArg)

      let maybeTransformedFirstArgs = firstArgs

      if (transformServiceArguments) {
        const transformArgs = transform_properties_array(transformServiceArguments)
        if (isDataFirst) secondArgs = transformArgs(secondArgs)
        else maybeTransformedFirstArgs = transformArgs(firstArgs)
      }

      const theFunction = typeToFunction[dataType] || typeToFunction.any,
        result = isFlipped
          ? theFunction(...secondArgs)(...maybeTransformedFirstArgs)
          : theFunction(...maybeTransformedFirstArgs)(...secondArgs)

      return transformResult(result)
    }
  }
}

//
//---------//
// Exports //
//---------//



// CONCATENATED MODULE: ./node_modules/fes/lib/create/utility/index.js
//---------//
// Imports //
//---------//










//
//------//
// Main //
//------//

const utility_createUtility = definition => {
  definition = normalize_definition(clone_object(definition))

  const { expectedServiceArgumentTypes } = definition

  const createUtilityFrom = findFirstValueWithTruthyKey([
    [utilityIsSpecialCase(definition), handleSpecialCaseUtility],
    [expectedServiceArgumentTypes, utility_createPseudoCurriedFunction],
    [!expectedServiceArgumentTypes, utility_createUnaryFunction],
  ])

  return createUtilityFrom(definition)
}

//
//------------------//
// Helper Functions //
//------------------//

function utility_createUnaryFunction(definition) {
  const {
    approveArguments: authorDefinedApproveArguments,
    isAsynchronous,
    typeToFunction,
  } = definition

  return (...dataArgs) => {
    const error = approveDataArgument(
      dataArgs,
      authorDefinedApproveArguments,
      definition
    )
    if (error) return throwOrReject(error, isAsynchronous)

    // no errors - good to go!

    const validDataArg = dataArgs[0],
      dataType = getType(validDataArg)

    return typeToFunction[dataType](validDataArg)
  }
}

function utility_createPseudoCurriedFunction(definition) {
  const {
    approveArguments: authorDefinedApproveArguments,
    isAsynchronous,
    typeToFunction,
  } = definition

  return (...serviceArgs) => {
    let error = approve_service_arguments.independent(
      serviceArgs,
      authorDefinedApproveArguments,
      definition
    )
    if (error) throw error

    // no errors yet

    return (...dataArgs) => {
      error = approveDataArgument(
        dataArgs,
        authorDefinedApproveArguments(...serviceArgs),
        definition
      )
      if (error) return throwOrReject(error, isAsynchronous)

      // success woo woo

      const validDataArg = dataArgs[0],
        dataType = getType(validDataArg)

      return typeToFunction[dataType](...serviceArgs)(validDataArg)
    }
  }
}

//
//---------//
// Exports //
//---------//

/* harmony default export */ var utility = (utility_createUtility);

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/contains-all.js


/* harmony default export */ var contains_all = ({
  name: 'containsAll',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: [['array', 'set']],
  transformServiceArguments: [arrayOrSet => new Set(arrayOrSet)],
  typeToFunction: {
    arrayLike: contains_all_array_like,
    map,
    object: contains_all_object,
    set: contains_all_set,
  },
});

//
//-------------//
// Helper Fxns //
//-------------//

function contains_all_object(setOfValuesToCheck) {
  return anObject => {
    const inThisSetOfValues = new Set(Object.values(anObject))
    return contains_all_set(setOfValuesToCheck)(inThisSetOfValues)
  }
}

function map(setOfValuesToCheck) {
  return aMap => {
    const inThisSetOfValues = new Set(aMap.values())
    return contains_all_set(setOfValuesToCheck)(inThisSetOfValues)
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/all-contained-in.js


/* harmony default export */ var all_contained_in = ({
  name: 'allContainedIn',
  flippedFrom: contains_all,
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/all.js
/* harmony default export */ var definitions_all = ({
  name: 'all',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    arrayLike: all_arrayLike,
    map: all_map,
    object: all_object,
    set,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function all_arrayLike(predicate) {
  return anArrayLike => {
    let stillTruthy = true,
      i = 0

    while (stillTruthy && i < anArrayLike.length) {
      stillTruthy = predicate(anArrayLike[i], i, anArrayLike)
      i += 1
    }

    return stillTruthy
  }
}

function all_map(predicate) {
  return aMap => {
    let stillTruthy = true

    for (const [key, val] of aMap) {
      stillTruthy = predicate(val, key, aMap)
      if (!stillTruthy) break
    }

    return stillTruthy
  }
}

function all_object(predicate) {
  return anObject => {
    const keys = Object.keys(anObject)

    let stillTruthy = true,
      i = 0

    while (stillTruthy && i < keys.length) {
      const aKey = keys[i]
      stillTruthy = predicate(anObject[aKey], aKey, anObject)
      i += 1
    }

    return stillTruthy
  }
}

function set(predicate) {
  return aSet => {
    let stillTruthy = true

    for (const value of aSet) {
      stillTruthy = predicate(value, value, aSet)
      if (!stillTruthy) break
    }

    return stillTruthy
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/always-return.js


/* harmony default export */ var definitions_always_return = ({
  name: 'alwaysReturn',
  hasNoDataArgument: {
    expectedArgumentTypes: ['any'],
    theFunction: always_return,
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/any.js
/* harmony default export */ var any = ({
  name: 'any',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    arrayLike: any_arrayLike,
    map: any_map,
    object: any_object,
    set: any_set,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function any_arrayLike(predicate) {
  return anArrayLike => {
    for (let i = 0; i < anArrayLike.length; i += 1) {
      if (predicate(anArrayLike[i], i, anArrayLike)) return true
    }

    return false
  }
}

function any_object(predicate) {
  return anObject => {
    const keys = Object.keys(anObject)

    for (const aKey of keys) {
      if (predicate(anObject[aKey], aKey, anObject)) return true
    }

    return false
  }
}

function any_map(predicate) {
  return aMap => {
    for (const [key, val] of aMap) {
      if (predicate(val, key, aMap)) return true
    }

    return false
  }
}

function any_set(predicate) {
  return aSet => {
    for (const val of aSet) {
      if (predicate(val, val, aSet)) return true
    }

    return false
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/append-all.js
/* harmony default export */ var append_all = ({
  name: 'appendAll',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['array'],
  typeToFunction: {
    array: appendAll,
  },
});

function appendAll(appendThese) {
  return toThis => toThis.concat(appendThese)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/append.js
/* harmony default export */ var append = ({
  name: 'append',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    array: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: appendArray,
    },
    string: {
      expectedServiceArgumentTypes: ['string'],
      theFunction: appendString,
    },
  },
});

function appendArray(appendThis) {
  appendThis = [appendThis]
  return toThisArray => toThisArray.concat(appendThis)
}

function appendString(appendThisString) {
  return toThisString => toThisString + appendThisString
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/append-to.js


/* harmony default export */ var append_to = ({
  name: 'appendTo',
  flippedFrom: append,
  shouldThrowOnExtraServiceArguments: false,
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/apply-at.js
//
// TODO: validate data argument to be anything besides undefined and null
//

/* harmony default export */ var apply_at = ({
  name: 'applyAt',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['string', ['array', 'arguments']],
  typeToFunction: { any: apply },
});

function apply(key, argumentsToApply) {
  return something => something[key](...argumentsToApply)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/apply.js
/* harmony default export */ var definitions_apply = ({
  name: 'apply',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: [['array', 'arguments']],
  typeToFunction: { function: apply_apply },
});

function apply_apply(argumentsToApply) {
  return aFunction => aFunction(...argumentsToApply)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/apply-to.js


/* harmony default export */ var apply_to = ({
  name: 'applyTo',
  flippedFrom: definitions_apply,
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/assign-over-all.js


/* harmony default export */ var assign_over_all = ({
  name: 'assignOverAll',
  isArrayOfData: true,
  typeToFunction: {
    map: createAssignOverAll(m_assign_over_map, construct_0arg(Map)),
    object: createAssignOverAll(m_assign_over_object, construct_0arg(Object)),
    set: createAssignOverAll(m_assign_over_set, construct_0arg(Set)),
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function createAssignOverAll(mAssign, createInitialResult) {
  return reduce_array_like(
    (result, element) => mAssign(result)(element),
    createInitialResult()
  )
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/assign-over-recursively.js


/* harmony default export */ var definitions_assign_over_recursively = ({
  name: 'assignOverRecursively',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    object: {
      expectedServiceArgumentTypes: ['object'],
      theFunction: assign_over_recursively.object,
    },
    map: {
      expectedServiceArgumentTypes: ['map'],
      theFunction: assign_over_recursively.map,
    },
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/assign-over.js


/* harmony default export */ var assign_over = ({
  name: 'assignOver',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    object: {
      expectedServiceArgumentTypes: ['object'],
      theFunction: assign_over_object,
    },
    map: {
      expectedServiceArgumentTypes: ['map'],
      theFunction: assign_over_map,
    },
    set: {
      expectedServiceArgumentTypes: ['set'],
      theFunction: assign_over_set,
    },
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/clone-deep.js
//
// README
//   - Currently I just want cloneDeep to take in arguments which can actually
//     be cloned deeply.  In the future I may change my mind to allow any type
//     or maybe just those which are clone'able.  Gotta figure out what makes
//     sense as I come across use-cases.
//



/* harmony default export */ var clone_deep = ({
  name: 'cloneDeep',
  typeToFunction: {
    arguments: external_clone_deep_default.a,
    array: external_clone_deep_default.a,
    object: external_clone_deep_default.a,
    map: external_clone_deep_default.a,
    set: external_clone_deep_default.a,
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/clone.js


/* harmony default export */ var clone = ({
  name: 'clone',
  typeToFunction: {
    allArrays: clone_array,
    arguments: clone_arguments,
    buffer: aBuffer => Buffer.from(aBuffer),
    object: clone_object,
    date: clone_date,
    regExp,
    map: aMap => new Map(aMap),
    set: aSet => new Set(aSet),
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function regExp(aRegexp) {
  const clonedRegexp = new RegExp(aRegexp.source, aRegexp.flags)
  clonedRegexp.lastIndex = aRegexp.lastIndex
  return clonedRegexp
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/coerce-to.js
//
// TODO: decide whether this method belongs in this library.  It's not very
//   stable due to the fallback, but enforcing a finite number of constructors
//   also doesn't seem very useful.  hmmmm
//

//------//
// Init //
//------//

const constructorToCoerce = getConstructorToCoerce(),
  fallbackCoerce = (anything, aConstructorFunction) =>
    new aConstructorFunction(anything)

//
//------//
// Main //
//------//

/* harmony default export */ var coerce_to = ({
  name: 'coerceTo',
  isDataFirst: true,
  shouldThrowOnExtraServiceArguments: false,
  expectedServiceArgumentTypes: ['any'],
  typeToFunction: {
    function: aConstructorFunction => anything => {
      const coerce = constructorToCoerce.has(aConstructorFunction)
        ? constructorToCoerce.get(aConstructorFunction)
        : fallbackCoerce

      return coerce(anything, aConstructorFunction)
    },
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function getConstructorToCoerce() {
  return new Map([
    [Boolean, anything => !!anything],
    [Array, anything => Array.from(anything)],
  ])
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/combine-all.js
//---------//
// Imports //
//---------//



//
//------//
// Main //
//------//

/* harmony default export */ var combine_all = ({
  name: 'combineAll',
  isArrayOfData: true,
  typeToFunction: {
    map: createCombineAll(m_assign_over_map, can_combine_map, construct_0arg(Map)),
    object: createCombineAll(
      m_assign_over_object,
      can_combine_object,
      construct_0arg(Object)
    ),
    set: createCombineAll(m_assign_over_set, can_combine_set, construct_0arg(Set)),
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function createCombineAll(mAssign, canCombine, createInitialResult) {
  return function combineAll(arrayOfData) {
    return reduce_array_like((result, element) => {
      //
      // it's cleaner to separate validation from application logic, however
      //   in this case it's unreasonable to iterate through all the elements
      //   while merging their keys just to determine up front whether the input
      //   is valid.  It makes much more sense to validate while we
      //   iterate through.
      //
      const error = canCombine(result)(element)
      if (error) throw error

      return mAssign(result)(element)
    }, createInitialResult())(arrayOfData)
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/combine.js



/* harmony default export */ var combine = ({
  name: 'combine',
  mergeDefinitionWith: assign_over,
  typeToDataDependentProps: {
    map: {
      approveArguments: can_combine_map,
    },
    object: {
      approveArguments: can_combine_object,
    },
    set: {
      approveArguments: can_combine_set,
    },
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/construct.js
/* harmony default export */ var construct = ({
  name: 'construct',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: { array },
});

//
//------------------//
// Helper Functions //
//------------------//

function array(constructorFunction) {
  return argumentsArray => new constructorFunction(...argumentsArray)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/construct_1arg.js


/* harmony default export */ var definitions_construct_1arg = ({
  name: 'construct_1arg',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: { any: construct_1arg },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/contains.js


/* harmony default export */ var contains = ({
  name: 'contains',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['any'],
  typeToDataDependentProps: {
    arrayLike: { theFunction: contains_arrayLike },
    map: { theFunction: contains_map },
    object: { theFunction: contains_object },
    set: { theFunction: contains_set },
    string: {
      expectedServiceArgumentTypes: ['string'],
      theFunction: contains_string,
    },
  },
});

//
//-------------//
// Helper Fxns //
//-------------//

function contains_arrayLike(element) {
  return anArrayLike =>
    Array.prototype.indexOf.call(anArrayLike, element) !== -1
}

function contains_object(valueToSearchFor) {
  return anObject => Object.values(anObject).indexOf(valueToSearchFor) !== -1
}

function contains_map(valueToSearchFor) {
  return aMap => {
    let found = false

    for (const aValue of aMap.values()) {
      found = valueToSearchFor === aValue
      if (found) break
    }

    return found
  }
}

function contains_set(valueToSearchFor) {
  return aSet => aSet.has(valueToSearchFor)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/contained-in.js


/* harmony default export */ var contained_in = ({
  name: 'containedIn',
  flippedFrom: contains,
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/contains-any.js


/* harmony default export */ var contains_any = ({
  name: 'containsAny',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: [['array', 'set']],
  transformServiceArguments: [arrayOrSet => new Set(arrayOrSet)],
  typeToFunction: {
    arrayLike: contains_any_array_like,
    map: contains_any_map,
    object: contains_any_object,
    set: contains_any_set,
    string: contains_any_string,
  },
});

//
//-------------//
// Helper Fxns //
//-------------//

function contains_any_object(setOfValuesToCheck) {
  return anObject => {
    const inThisSetOfValues = new Set(Object.values(anObject))
    return contains_any_set(setOfValuesToCheck)(inThisSetOfValues)
  }
}

function contains_any_map(setOfValuesToCheck) {
  return aMap => {
    const inThisSetOfValues = new Set(aMap.values())
    return contains_any_set(setOfValuesToCheck)(inThisSetOfValues)
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/contains-only.js


/* harmony default export */ var contains_only = ({
  name: 'containsOnly',
  expectedServiceArgumentTypes: [['array', 'set']],
  transformServiceArguments: [arrayOrSet => new Set(arrayOrSet)],
  typeToFunction: {
    arrayLike: contains_only_arrayLike,
    map: contains_only_map,
    object: contains_only_object,
    set: contains_only_set,
  },
});

//
//-------------//
// Helper Fxns //
//-------------//

function contains_only_arrayLike(setOfValuesToCheck) {
  return anArrayLike => {
    const inThisSetOfValues = new Set(anArrayLike)
    return containsOnly(setOfValuesToCheck, inThisSetOfValues)
  }
}

function contains_only_object(setOfValuesToCheck) {
  return anObject => {
    const inThisSetOfValues = new Set(Object.values(anObject))
    return containsOnly(setOfValuesToCheck, inThisSetOfValues)
  }
}

function contains_only_map(setOfValuesToCheck) {
  return aMap => {
    const inThisSetOfValues = new Set(aMap.values())
    return containsOnly(setOfValuesToCheck, inThisSetOfValues)
  }
}

function contains_only_set(setOfValuesToCheck) {
  return aSet => containsOnly(setOfValuesToCheck, aSet)
}

function containsOnly(set1, set2) {
  return contains_all_set(set1)(set2) && set1.size === set2.size
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/discard-all.js
//---------//
// Imports //
//---------//



//
//------//
// Main //
//------//

/* harmony default export */ var discard_all = ({
  name: 'discardAll',
  expectedServiceArgumentTypes: [['array', 'set']],
  transformServiceArguments: [arrayOrSet => new Set(arrayOrSet)],
  typeToFunction: {
    arrayLike: discard_all_arrayLike,
    map: discard_all_map,
    object: discard_all_object,
    set: discard_all_set,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function discard_all_arrayLike(setOfValuesToRemove) {
  return collection =>
    reduce_array_like((result, value) => {
      if (!setOfValuesToRemove.has(value)) m_append_array_like(value)(result)
      return result
    }, create_empty_collection_from_instance(collection))(collection)
}

function discard_all_map(setOfValuesToRemove) {
  return aMap =>
    reduce_map((result, value, key) => {
      if (!setOfValuesToRemove.has(value)) result.set(key, value)
      return result
    }, new Map())(aMap)
}

function discard_all_object(setOfValuesToRemove) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (!setOfValuesToRemove.has(value)) result[key] = value
      return result
    }, {})(anObject)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/discard-first-while.js


/* harmony default export */ var discard_first_while = ({
  name: 'discardFirstWhile',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: { arrayLike: discard_first_while_arrayLike },
});

//
//-------------//
// Helper Fxns //
//-------------//

function discard_first_while_arrayLike(predicate) {
  return anArrayLike => {
    let i = 0,
      keepDropping = true

    while (keepDropping && i < anArrayLike.length) {
      keepDropping = predicate(anArrayLike[i], i, anArrayLike)
      if (keepDropping) i += 1
    }

    return discard_first_array_like(i)(anArrayLike)
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/discard-first.js



/* harmony default export */ var discard_first = ({
  name: 'discardFirst',
  expectedServiceArgumentTypes: ['number'],
  typeToFunction: { arrayLike: discard_first_array_like, string: discard_first_string },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/discard-last-while.js


/* harmony default export */ var discard_last_while = ({
  name: 'discardLastWhile',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: { arrayLike: discard_last_while_arrayLike },
});

//
//-------------//
// Helper Fxns //
//-------------//

function discard_last_while_arrayLike(predicate) {
  return anArrayLike => {
    let idx = anArrayLike.length - 1,
      keepDropping = true

    while (keepDropping && idx >= 0) {
      keepDropping = predicate(anArrayLike[idx], idx, anArrayLike)
      if (keepDropping) idx -= 1
    }

    return keep_first_array_like(idx + 1)(anArrayLike)
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/discard-last.js


/* harmony default export */ var discard_last = ({
  name: 'discardFirst',
  expectedServiceArgumentTypes: ['number'],
  typeToFunction: { arrayLike: discard_last_array_like },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/keep-when.js


/* harmony default export */ var keep_when = ({
  name: 'keepWhen',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    arrayLike: keep_when_arrayLike,
    map: keep_when_map,
    object: keep_when_object,
    set: keep_when_set,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function keep_when_arrayLike(predicate) {
  return anArrayLike =>
    reduce_array_like((result, value, index) => {
      if (predicate(value, index, anArrayLike)) result.push(value)
      return result
    }, [])(anArrayLike)
}

function keep_when_map(predicate) {
  return aMap =>
    reduce_map((result, value, key) => {
      if (predicate(value, key, aMap)) result.set(key, value)
      return result
    }, new Map())(aMap)
}

function keep_when_object(predicate) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (predicate(value, key, anObject)) result[key] = value
      return result
    }, {})(anObject)
}

function keep_when_set(predicate) {
  return aSet =>
    reduce_set((result, value) => {
      if (predicate(value, value, aSet)) result.add(value)
      return result
    }, new Set())(aSet)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/discard-when.js
//---------//
// Imports //
//---------//





//
//------//
// Main //
//------//

const composedTypeToFunction = negatePredicates(
  keep_when.typeToFunction
)

/* harmony default export */ var discard_when = ({
  name: 'discardWhen',
  expectedServiceArgumentTypes: keep_when.expectedServiceArgumentTypes,
  typeToFunction: composedTypeToFunction,
});

//
//------------------//
// Helper Functions //
//------------------//

function negatePredicates(typeToFunction) {
  return map_object(keepWhen => predicate => keepWhen(negate(predicate)))(
    typeToFunction
  )
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/discard.js
//---------//
// Imports //
//---------//



//
//------//
// Main //
//------//

/* harmony default export */ var discard = ({
  name: 'discard',
  expectedServiceArgumentTypes: ['any'],
  typeToFunction: {
    arrayLike: discard_arrayLike,
    map: discard_map,
    object: discard_object,
    set: discard_set,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function discard_arrayLike(valueToRemove) {
  return anArrayLike =>
    reduce_array_like((result, value) => {
      if (value !== valueToRemove) m_append_array_like(value)(result)
      return result
    }, create_empty_collection_from_instance(anArrayLike))(anArrayLike)
}

function discard_map(valueToRemove) {
  return aMap => {
    const result = new Map()
    for (const [key, value] of aMap) {
      if (value !== valueToRemove) result.set(key, value)
    }
    return result
  }
}

function discard_object(valueToRemove) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (value !== valueToRemove) result[key] = value
      return result
    }, {})(anObject)
}

function discard_set(valueToRemove) {
  return aSet => {
    const result = new Set(aSet)
    result.delete(valueToRemove)
    return result
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/find-first-when.js


/* harmony default export */ var find_first_when = ({
  name: 'findFirstWhen',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    arrayLike: find_first_when_array_like,
    map: find_first_when_map,
    set: find_first_when_set,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function find_first_when_map(predicate) {
  return aMap => {
    for (const [key, value] of aMap) {
      if (predicate(value, key, aMap)) return value
    }
  }
}

function find_first_when_set(predicate) {
  return aSet => {
    for (const value of aSet) {
      if (predicate(value, value, aSet)) return value
    }
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/find-first.js
/* harmony default export */ var find_first = ({
  name: 'findFirst',
  expectedServiceArgumentTypes: ['any'],
  typeToFunction: {
    arrayLike: find_first_arrayLike,
    map: find_first_map,
    set: find_first_set,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function find_first_arrayLike(valueToFind) {
  return anArrayLike => {
    for (const value of anArrayLike) {
      if (value === valueToFind) return value
    }
  }
}

function find_first_map(valueToFind) {
  return aMap => {
    for (const [_unused_key, value] of aMap) {
      if (value === valueToFind) return value
    }
  }
}

function find_first_set(valueToFind) {
  return aSet => {
    return aSet.has(valueToFind) ? valueToFind : undefined
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/first.js


/* harmony default export */ var first = ({
  name: 'first',
  typeToFunction: { arrayLike: first_array_like },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/flatten.js
//
// README
// - flattens a single level
//



/* harmony default export */ var flatten = ({
  name: 'flatten',
  typeToFunction: { array: flatten_array },
});

//
//------------------//
// Helper Functions //
//------------------//

function flatten_array(anArray) {
  return reduce_array_like((result, element) => {
    if (Array.isArray(element)) Array.prototype.push.apply(result, element)
    else result.push(element)

    return result
  }, [])(anArray)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/flow.js


/* harmony default export */ var definitions_flow = ({
  name: 'flow',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['array'],
  typeToFunction: { any: flow },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/for-each.js


/* harmony default export */ var for_each = ({
  name: 'forEach',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    arrayLike: for_each_array_like,
    map: for_each_map,
    object: for_each_object,
    set: for_each_set,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function for_each_map(forEach) {
  return aMap => {
    for (const [key, value] of aMap) {
      forEach(value, key, aMap)
    }
    return aMap
  }
}

function for_each_object(forEachFunction) {
  return anObject => {
    for_each_array_like(key => forEachFunction(anObject[key], key, anObject))(
      Object.keys(anObject)
    )
    return anObject
  }
}

function for_each_set(forEach) {
  return aSet => {
    for (const value of aSet) {
      forEach(value, value, aSet)
    }
    return aSet
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/get-array-of-keys.js
/* harmony default export */ var get_array_of_keys = ({
  name: 'getArrayOfKeys',
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: {
    map: aMap => [...aMap.keys()],
    object: Object.keys,
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/get-array-of-values.js


/* harmony default export */ var get_array_of_values = ({
  name: 'getArrayOfValues',
  typeToFunction: {
    map: aMap => [...aMap.values()],
    object: Object.values,
    set: get_array_of_values_set,
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/get-count.js


/* harmony default export */ var get_count = ({
  name: 'getCount',
  typeToFunction: {
    arrayLike: anArrayLike => anArrayLike.length,
    mapOrSet: aMapOrSet => aMapOrSet.size,
    object: get_count_object,
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/get-value-at-path.js
//
// README
//   - I'm leaving out map and arrayLike because I have only ever needed this
//     function with nested objects.  If you find another use-case please let
//     me know so I can understand it and figure out a solution.
//

//---------//
// Imports //
//---------//




//
//------//
// Init //
//------//

const getAllButLastKey = discard_last_array_like(1)

//
//------//
// Main //
//------//

/* harmony default export */ var get_value_at_path = ({
  name: 'getValueAtPath',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['array'],
  typeToFunction: {
    object: getValueAtPath_object,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function getValueAtPath_object(arrayOfKeys) {
  const allButLastKey = getAllButLastKey(arrayOfKeys),
    lastKey = last_array_like(arrayOfKeys)

  return anObject => {
    for (const key of allButLastKey) {
      if (anObject[key] === null || typeof anObject[key] !== 'object') {
        return
      }

      anObject = anObject[key]
    }
    return anObject[lastKey]
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/get-value-at.js


/* harmony default export */ var get_value_at = ({
  name: 'getValueAt',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    arrayLike: {
      expectedServiceArgumentTypes: [['number', 'string']],
      theFunction: get_value_at_object,
    },
    map: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: key => aMap => aMap.get(key),
    },
    object: {
      expectedServiceArgumentTypes: [['number', 'string']],
      theFunction: get_value_at_object,
    },
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/get-value-from.js


/* harmony default export */ var get_value_from = ({
  name: 'getValueFrom',
  flippedFrom: get_value_at,
  shouldThrowOnExtraServiceArguments: false,
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/has-key.js


/* harmony default export */ var has_key = ({
  name: 'hasKey',
  typeToDataDependentProps: {
    arrayLike: {
      expectedServiceArgumentTypes: [['number', 'string']],
      theFunction: has_key_object,
    },
    map: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: hasKey_map,
    },
    object: {
      expectedServiceArgumentTypes: [['number', 'string']],
      theFunction: has_key_object,
    },
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function hasKey_map(key) {
  return aMap => aMap.has(key)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/has-own-enumerable-key.js


/* harmony default export */ var definitions_has_own_enumerable_key = ({
  name: 'hasOwnEnumerableKey',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['string'],
  typeToFunction: {
    any: has_own_enumerable_key,
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/invoke-at.js
const defaultInvokeAt = { theFunction: invokeAt_object }

/* harmony default export */ var invoke_at = ({
  name: 'invokeAt',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: [['number', 'string']],
  typeToDataDependentProps: {
    arguments: defaultInvokeAt,
    array: defaultInvokeAt,
    map: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: invokeAt_map,
    },
    object: defaultInvokeAt,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function invokeAt_object(key) {
  return anObject => anObject[key]()
}

function invokeAt_map(key) {
  return aMap => aMap.get(key)()
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/invoke.js


/* harmony default export */ var definitions_invoke = ({
  name: 'invoke',
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: { function: invoke },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/is-between-exclusive.js
/* harmony default export */ var is_between_exclusive = ({
  name: 'isBetweenExclusive',
  expectedServiceArgumentTypes: ['number', 'number'],
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: {
    number: (min, max) => aNumber => {
      return aNumber > min && aNumber < max
    },
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/is-between-inclusive.js
/* harmony default export */ var is_between_inclusive = ({
  name: 'isBetweenInclusive',
  expectedServiceArgumentTypes: ['number', 'number'],
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: {
    number: (min, max) => aNumber => {
      return aNumber >= min && aNumber <= max
    },
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/is-laden.js


/* harmony default export */ var is_laden = ({
  name: 'isLaden',
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: {
    any: is_laden_any,
    arrayLike: is_laden_has_length,
    mapOrSet: is_laden_has_size,
    object: is_laden_object,
  },
});

function is_laden_any(something) {
  return !!(something && (something.length || something.size))
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/is-empty.js




const is_empty_composedTypeToFunction = map_object(negate)(is_laden.typeToFunction)

/* harmony default export */ var is_empty = ({
  name: 'isEmpty',
  typeToFunction: is_empty_composedTypeToFunction,
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/is-falsey.js
/* harmony default export */ var is_falsey = ({
  name: 'isFalsey',
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: { any: something => !something },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/is-greater-than.js
/* harmony default export */ var is_greater_than = ({
  name: 'isGreaterThan',
  expectedServiceArgumentTypes: ['number'],
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: {
    number: right => left => {
      return left > right
    },
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/is-less-than.js
/* harmony default export */ var is_less_than = ({
  name: 'isLessThan',
  expectedServiceArgumentTypes: ['number'],
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: {
    number: right => left => {
      return left < right
    },
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/is-truthy.js


/* harmony default export */ var definitions_is_truthy = ({
  name: 'isTruthy',
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: { any: is_truthy },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/join.js


/* harmony default export */ var join = ({
  name: 'join',
  expectedServiceArgumentTypes: ['string'],
  typeToFunction: {
    arguments: join_array_like,
    array: join_array_like,
    set: join_set,
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/keep-all.js
//---------//
// Imports //
//---------//



//
//------//
// Main //
//------//

/* harmony default export */ var keep_all = ({
  name: 'keepAll',
  expectedServiceArgumentTypes: [['array', 'set', 'string']],
  transformServiceArguments: [arraySetOrString => new Set(arraySetOrString)],
  typeToFunction: {
    arrayLike: keep_all_arrayLike,
    map: keep_all_map,
    object: keep_all_object,
    set: keep_all_set,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function keep_all_arrayLike(setOfValuesToKeep) {
  return anArrayLike =>
    reduce_array_like((result, value) => {
      if (setOfValuesToKeep.has(value)) result = m_append_array_like(value)(result)
      return result
    }, create_empty_collection_from_instance(anArrayLike))(anArrayLike)
}

function keep_all_map(setOfValuesToKeep) {
  return aMap =>
    reduce_map((result, value, key) => {
      if (setOfValuesToKeep.has(value)) result.set(key, value)
      return result
    }, new Map())(aMap)
}

function keep_all_object(setOfValuesToKeep) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (setOfValuesToKeep.has(value)) result[key] = value
      return result
    }, {})(anObject)
}

function keep_all_set(setOfValuesToKeep) {
  return aSet => {
    const result = new Set()
    for (const value of aSet) {
      if (setOfValuesToKeep.has(value)) result.add(value)
    }
    return result
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/keep-first.js



/* harmony default export */ var keep_first = ({
  name: 'keepFirst',
  expectedServiceArgumentTypes: ['number'],
  typeToFunction: { arrayLike: keep_first_array_like, string: keep_first_string },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/keep-intersection.js
//
// README
//   - I'm writing this initially to support array and set only.  It might make
//     sense to expand it to key/value collections but I'm going to wait until
//     I encounter a use-case before implementing that.
//



/* harmony default export */ var keep_intersection = ({
  name: 'keep',
  typeToDataDependentProps: {
    array: {
      expectedServiceArgumentTypes: ['array'],
      theFunction: keep_intersection_array,
    },
    set: {
      expectedServiceArgumentTypes: ['set'],
      theFunction: keep_intersection_set,
    },
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/keep.js
//---------//
// Imports //
//---------//



//
//------//
// Main //
//------//

/* harmony default export */ var keep = ({
  name: 'keep',
  expectedServiceArgumentTypes: ['any'],
  typeToFunction: {
    arrayLike: keep_arrayLike,
    map: keep_map,
    object: keep_object,
    set: keep_set,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function keep_arrayLike(valueToKeep) {
  return anArrayLike =>
    reduce_array_like((result, value) => {
      if (value === valueToKeep) result = m_append_array_like(value)(result)
      return result
    }, create_empty_collection_from_instance(anArrayLike))(anArrayLike)
}

function keep_map(valueToKeep) {
  return aMap =>
    reduce_map((result, value, key) => {
      if (value === valueToKeep) result.set(key, value)
      return result
    }, new Map())(aMap)
}

function keep_object(valueToKeep) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (value === valueToKeep) result[key] = value
      return result
    }, {})(anObject)
}

function keep_set(valueToKeep) {
  return aSet => {
    return aSet.has(valueToKeep) ? new Set([valueToKeep]) : new Set()
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/last.js
/* harmony default export */ var last = ({
  name: 'last',
  typeToFunction: {
    arrayLike: collection => collection[collection.length - 1],
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/m-append-all.js
/* harmony default export */ var m_append_all = ({
  name: 'mAppendAll',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['array'],
  typeToFunction: {
    array: mAppendAll,
  },
});

function mAppendAll(appendThese) {
  return toThis => {
    Array.prototype.push.apply(toThis, appendThese)
    return toThis
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/m-append.js
/* harmony default export */ var m_append = ({
  name: 'mAppend',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['any'],
  typeToFunction: {
    array: mAppend,
  },
});

function mAppend(element) {
  return anArray => {
    anArray.push(element)
    return anArray
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/m-append-to.js


/* harmony default export */ var m_append_to = ({
  name: 'mAppendTo',
  flippedFrom: m_append,
  shouldThrowOnExtraServiceArguments: false,
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/m-assign-over.js




/* harmony default export */ var m_assign_over = ({
  name: 'mAssignOver',
  mergeDefinitionWith: assign_over,
  typeToDataDependentProps: {
    object: {
      theFunction: m_assign_over_object,
    },
    map: {
      theFunction: m_assign_over_map,
    },
    set: {
      theFunction: m_assign_over_set,
    },
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/m-combine.js



/* harmony default export */ var m_combine = ({
  name: 'mCombine',
  mergeDefinitionWith: m_assign_over,
  typeToDataDependentProps: {
    map: {
      approveArguments: can_combine_map,
    },
    object: {
      approveArguments: can_combine_object,
    },
    set: {
      approveArguments: can_combine_set,
    },
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/m-map.js


/* harmony default export */ var m_map = ({
  name: 'mMap',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    array: m_map_array_like,
    arguments: m_map_array_like,
    object: m_map_object,
    map: m_map_map,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function m_map_map(mapperFunction) {
  return aMap => {
    for (const [key, value] of aMap) {
      aMap.set(key, mapperFunction(value, key, aMap))
    }
    return aMap
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/m-omit.js
/* harmony default export */ var m_omit = ({
  name: 'mOmit',
  typeToDataDependentProps: {
    object: {
      expectedServiceArgumentTypes: [['number', 'string']],
      theFunction: mOmit_object,
    },
    map: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: mOmit_map,
    },
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function mOmit_object(key) {
  return anObject => {
    delete anObject[key]
    return anObject
  }
}
function mOmit_map(key) {
  return aMap => {
    aMap.delete(key)
    return aMap
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/m-prepend.js
/* harmony default export */ var m_prepend = ({
  name: 'mPrepend',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    array: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: mPrependArray,
    },
  },
});

function mPrependArray(prependThis) {
  return toThis => {
    toThis.unshift(prependThis)
    return toThis
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/m-set.js


/* harmony default export */ var m_set = ({
  name: 'mSet',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    object: {
      expectedServiceArgumentTypes: ['string', 'any'],
      theFunction: m_set_object,
    },
    map: {
      expectedServiceArgumentTypes: ['any', 'any'],
      theFunction: m_set_map,
    },
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/map-keys.js


/* harmony default export */ var map_keys = ({
  name: 'mapKeys',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    object: map_keys_object,
    map: map_keys_map,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function map_keys_object(mapperFunction) {
  return anObject =>
    reduce_object((result, value, key) => {
      const newKey = mapperFunction(key, value, anObject)
      result[newKey] = value
      return result
    }, {})(anObject)
}
function map_keys_map(mapperFunction) {
  return aMap => {
    const result = new Map()
    for (const [key, value] of aMap) {
      const newKey = mapperFunction(key, value, aMap)
      result.set(newKey, value)
    }
    return result
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/map.js


/* harmony default export */ var definitions_map = ({
  name: 'map',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    arrayLike: map_array_like,
    object: map_object,
    map: map_map,
    set: map_set,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function map_map(mapperFunction) {
  return aMap => {
    const result = new Map()

    for (const [key, value] of aMap) {
      result.set(key, mapperFunction(value, key, aMap))
    }

    return result
  }
}

function map_set(mapperFunction) {
  return aSet => {
    const result = new Set()

    for (const value of aSet) {
      result.add(mapperFunction(value, value, aSet))
    }

    return result
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/none.js


/* harmony default export */ var none = ({
  name: 'none',
  mergeDefinitionWith: any,
  transformResult: result => !result,
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/omit-all.js


/* harmony default export */ var omit_all = ({
  name: 'omitAll',
  expectedServiceArgumentTypes: [['array', 'set']],
  transformServiceArguments: {
    0: arrayOrSet => new Set(arrayOrSet),
  },
  typeToFunction: {
    map: omit_all_map,
    object: omit_all_object,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function omit_all_map(setOfKeysToRemove) {
  return aMap => {
    const result = new Map()
    for (const [key, value] of aMap) {
      if (!setOfKeysToRemove.has(key)) result.set(key, value)
    }
    return result
  }
}

function omit_all_object(setOfKeysToRemove) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (!setOfKeysToRemove.has(key)) result[key] = value
      return result
    }, {})(anObject)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/pick-when.js


/* harmony default export */ var pick_when = ({
  name: 'pickWhen',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    map: pick_when_map,
    object: pick_when_object,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function pick_when_map(predicate) {
  return aMap => {
    const result = new Map()
    for (const [key, value] of aMap) {
      if (predicate(key, value, aMap)) result.set(key, value)
    }
    return result
  }
}

function pick_when_object(predicate) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (predicate(key, value, anObject)) result[key] = value
      return result
    }, {})(anObject)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/omit-when.js




const omit_when_composedTypeToFunction = omit_when_negatePredicates(
  pick_when.typeToFunction
)

/* harmony default export */ var omit_when = ({
  name: 'omitWhen',
  expectedServiceArgumentTypes: pick_when.expectedServiceArgumentTypes,
  typeToFunction: omit_when_composedTypeToFunction,
});

//
//------------------//
// Helper Functions //
//------------------//

function omit_when_negatePredicates(typeToFunction) {
  return map_object(pickWhen => predicate => pickWhen(negate(predicate)))(
    typeToFunction
  )
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/omit.js
/* harmony default export */ var omit = ({
  name: 'omit',
  typeToDataDependentProps: {
    map: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: omit_map,
    },
    object: {
      expectedServiceArgumentTypes: [['number', 'string']],
      theFunction: omit_object,
    },
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function omit_map(keyToRemove) {
  return aMap => {
    const result = new Map(aMap)
    result.delete(keyToRemove)
    return result
  }
}

function omit_object(keyToRemove) {
  return anObject => {
    const result = Object.assign({}, anObject)
    delete result[keyToRemove]
    return result
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/pass-through.js


/* harmony default export */ var definitions_pass_through = ({
  name: 'passThrough',
  hasNoDataArgument: {
    expectedArgumentTypes: ['any', 'array'],
    theFunction: pass_through,
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/pick-all.js


/* harmony default export */ var pick_all = ({
  name: 'pickAll',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: [['array', 'set']],
  transformServiceArguments: {
    0: arrayOrSet => new Set(arrayOrSet),
  },
  typeToFunction: {
    map: pick_all_map,
    object: pick_all_object,
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function pick_all_map(setOfKeysToPick) {
  return aMap => {
    const result = new Map()
    for (const [key, value] of aMap) {
      if (setOfKeysToPick.has(key)) result.set(key, value)
    }
    return result
  }
}

function pick_all_object(setOfKeysToPick) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (setOfKeysToPick.has(key)) result[key] = value
      return result
    }, {})(anObject)
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/pick-all-from.js


/* harmony default export */ var pick_all_from = ({
  name: 'pickAllFrom',
  flippedFrom: pick_all,
  shouldThrowOnExtraServiceArguments: false,
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/prepend.js
/* harmony default export */ var prepend = ({
  name: 'prepend',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    array: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: prependArray,
    },
    string: {
      expectedServiceArgumentTypes: ['string'],
      theFunction: prependString,
    },
  },
});

function prependArray(prependThis) {
  prependThis = [prependThis]
  return toThis => prependThis.concat(toThis)
}

function prependString(prependThis) {
  return toThis => prependThis + toThis
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/reduce.js


/* harmony default export */ var reduce = ({
  name: 'reduce',
  expectedServiceArgumentTypes: ['function', 'any'],
  typeToFunction: {
    arrayLike: reduce_array_like,
    map: reduce_map,
    object: reduce_object,
    set: reduce_set,
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/reduce-fresh.js



/* harmony default export */ var reduce_fresh = ({
  name: 'reduceFresh',
  mergeDefinitionWith: reduce,
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['function', 'function'],
  transformServiceArguments: {
    1: invoke,
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/return-first-argument.js


//
// also called the 'identity function'
// https://en.wikipedia.org/wiki/Identity_function
//
/* harmony default export */ var definitions_return_first_argument = ({
  name: 'returnFirstArgument',
  hasNoDataArgument: {
    expectedArgumentTypes: ['any'],
    shouldThrowOnExtraArguments: false,
    theFunction: return_first_argument,
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/reverse.js


/* harmony default export */ var reverse = ({
  name: 'reverse',
  typeToFunction: { arrayLike: reverse_arrayLike, string },
});

//
//------------------//
// Helper Functions //
//------------------//

function reverse_arrayLike(anArrayLike) {
  return clone_array(anArrayLike).reverse()
}

function string(aString) {
  return aString
    .split('')
    .reverse()
    .join('')
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/set-of-keys.js


/* harmony default export */ var set_of_keys = ({
  name: 'setOfKeys',
  typeToFunction: {
    map: set_of_keys_map,
    object: set_of_keys_object,
  },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/set.js
/* harmony default export */ var definitions_set = ({
  name: 'set',
  typeToDataDependentProps: {
    object: {
      expectedServiceArgumentTypes: [['number', 'string'], 'any'],
      theFunction: set_object,
    },
    map: {
      expectedServiceArgumentTypes: ['any', 'any'],
      theFunction: set_map,
    },
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function set_map(key, value) {
  return aMap => {
    const result = new Map(aMap)
    result.set(key, value)
    return result
  }
}

function set_object(key, value) {
  return anObject => {
    const result = Object.assign({}, anObject)
    result[key] = value
    return result
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/starts-with.js
/* harmony default export */ var starts_with = ({
  name: 'startsWith',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    arrayLike: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: startsWith,
    },
    string: {
      expectedServiceArgumentTypes: ['string'],
      theFunction: startsWith,
    },
  },
});

//
//-------------//
// Helper Fxns //
//-------------//

function startsWith(mightStartWith_arrayLike) {
  return anArrayLike => {
    if (mightStartWith_arrayLike.length > anArrayLike.length) return false

    for (let i = 0; i < mightStartWith_arrayLike.length; i += 1) {
      if (mightStartWith_arrayLike[i] !== anArrayLike[i]) return false
    }

    return true
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/strictly-equals.js


/* harmony default export */ var definitions_strictly_equals = ({
  name: 'strictlyEquals',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['any'],
  typeToFunction: { any: strictly_equals },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/transform-properties.js
//
// TODO: validate service arguments to ensure values are functions
//



/* harmony default export */ var transform_properties = ({
  name: 'transformProperties',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    map: {
      expectedServiceArgumentTypes: ['map'],
      theFunction: transformProperties_map,
    },
    object: {
      expectedServiceArgumentTypes: ['object'],
      theFunction: transform_properties_object,
    },
  },
});

//
//------------------//
// Helper Functions //
//------------------//

function transformProperties_map(mapOfTransforms) {
  return aMap => {
    const result = new Map()

    for (const [key, value] of aMap) {
      if (mapOfTransforms.has(key)) {
        const transform = mapOfTransforms.get(key)
        result.set(key, transform(value, key, aMap))
      } else result.set(key, value)
    }

    return result
  }
}

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/truncate-to-n-chars.js
//
// TODO: approve no newlines
//



/* harmony default export */ var definitions_truncate_to_n_chars = ({
  name: 'truncateToNChars',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['number'],
  typeToFunction: { string: truncate_to_n_chars },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/truncate-to-n-lines.js


/* harmony default export */ var definitions_truncate_to_n_lines = ({
  name: 'truncateToNLines',
  expectedServiceArgumentTypes: ['number'],
  typeToFunction: { string: truncate_to_n_lines },
});

// CONCATENATED MODULE: ./node_modules/fes/lib/definitions/unique.js


/* harmony default export */ var unique = ({
  name: 'unique',
  typeToFunction: {
    array: anArray => [...new Set(anArray)],
    string: aString => join_set('')(new Set(aString)),
  },
});

// CONCATENATED MODULE: ./node_modules/fes/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return allContainedIn; });
/* unused harmony export all */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return alwaysReturn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fes_any; });
/* unused harmony export appendAll */
/* unused harmony export appendTo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return fes_append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return applyAt; });
/* unused harmony export applyTo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return fes_apply; });
/* unused harmony export assignOverAll */
/* unused harmony export assignOverRecursively */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return assignOver; });
/* unused harmony export cloneDeep */
/* unused harmony export clone */
/* unused harmony export coerceTo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return fes_combineAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return fes_combine; });
/* unused harmony export construct */
/* unused harmony export construct_1arg */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return containedIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return containsAll; });
/* unused harmony export containsAny */
/* unused harmony export containsOnly */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return fes_contains; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return discardAll; });
/* unused harmony export discardFirstWhile */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return discardFirst; });
/* unused harmony export discardLastWhile */
/* unused harmony export discardLast */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return discardWhen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return fes_discard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return findFirstWhen; });
/* unused harmony export findFirst */
/* unused harmony export first */
/* unused harmony export flatten */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return fes_flow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return getArrayOfKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return getArrayOfValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return getCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return getValueAtPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return getValueAt; });
/* unused harmony export getValueFrom */
/* unused harmony export hasKey */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return hasOwnEnumerableKey; });
/* unused harmony export invokeAt */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return fes_invoke; });
/* unused harmony export isBetweenExclusive */
/* unused harmony export isBetweenInclusive */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return isEmpty; });
/* unused harmony export isFalsey */
/* unused harmony export isGreaterThan */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return isLaden; });
/* unused harmony export isLessThan */
/* unused harmony export isTruthy */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return fes_join; });
/* unused harmony export keepAll */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return keepFirst; });
/* unused harmony export keepIntersection */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return fes_keepWhen; });
/* unused harmony export keep */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return fes_last; });
/* unused harmony export mAppendAll */
/* unused harmony export mAppendTo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return fes_mAppend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return mAssignOver; });
/* unused harmony export mCombine */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return mMap; });
/* unused harmony export mOmit */
/* unused harmony export mPrepend */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return mSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return mapKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return fes_map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return fes_none; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return omitAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return omitWhen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return fes_omit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return passThrough; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return pickAllFrom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return pickAll; });
/* unused harmony export pickWhen */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return fes_prepend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V", function() { return reduceFresh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "U", function() { return fes_reduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "W", function() { return returnFirstArgument; });
/* unused harmony export reverse */
/* unused harmony export setOfKeys */
/* unused harmony export set */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return fes_startsWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return strictlyEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return transformProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ab", function() { return truncateToNChars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bb", function() { return truncateToNLines; });
/* unused harmony export unique */



const allContainedIn = utility(all_contained_in)


const fes_all = utility(definitions_all)


const alwaysReturn = utility(definitions_always_return)


const fes_any = utility(any)


const fes_appendAll = utility(append_all)


const appendTo = utility(append_to)


const fes_append = utility(append)


const applyAt = utility(apply_at)


const applyTo = utility(apply_to)


const fes_apply = utility(definitions_apply)


const assignOverAll = utility(assign_over_all)


const fes_assignOverRecursively = utility(definitions_assign_over_recursively)


const assignOver = utility(assign_over)


const cloneDeep = utility(clone_deep)


const fes_clone = utility(clone)


const coerceTo = utility(coerce_to)


const fes_combineAll = utility(combine_all)


const fes_combine = utility(combine)


const fes_construct = utility(construct)


const fes_construct_1arg = utility(definitions_construct_1arg)


const containedIn = utility(contained_in)


const containsAll = utility(contains_all)


const containsAny = utility(contains_any)


const fes_containsOnly = utility(contains_only)


const fes_contains = utility(contains)


const discardAll = utility(discard_all)


const discardFirstWhile = utility(discard_first_while)


const discardFirst = utility(discard_first)


const discardLastWhile = utility(discard_last_while)


const discardLast = utility(discard_last)


const discardWhen = utility(discard_when)


const fes_discard = utility(discard)


const findFirstWhen = utility(find_first_when)


const findFirst = utility(find_first)


const fes_first = utility(first)


const fes_flatten = utility(flatten)


const fes_flow = utility(definitions_flow)


const forEach = utility(for_each)


const getArrayOfKeys = utility(get_array_of_keys)


const getArrayOfValues = utility(get_array_of_values)


const getCount = utility(get_count)


const getValueAtPath = utility(get_value_at_path)


const getValueAt = utility(get_value_at)


const getValueFrom = utility(get_value_from)


const hasKey = utility(has_key)


const hasOwnEnumerableKey = utility(definitions_has_own_enumerable_key)


const invokeAt = utility(invoke_at)


const fes_invoke = utility(definitions_invoke)


const isBetweenExclusive = utility(is_between_exclusive)


const isBetweenInclusive = utility(is_between_inclusive)


const isEmpty = utility(is_empty)


const isFalsey = utility(is_falsey)


const isGreaterThan = utility(is_greater_than)


const isLaden = utility(is_laden)


const isLessThan = utility(is_less_than)


const isTruthy = utility(definitions_is_truthy)


const fes_join = utility(join)


const keepAll = utility(keep_all)


const keepFirst = utility(keep_first)


const keepIntersection = utility(keep_intersection)


const fes_keepWhen = utility(keep_when)


const fes_keep = utility(keep)


const fes_last = utility(last)


const fes_mAppendAll = utility(m_append_all)


const mAppendTo = utility(m_append_to)


const fes_mAppend = utility(m_append)


const mAssignOver = utility(m_assign_over)


const mCombine = utility(m_combine)


const mMap = utility(m_map)


const mOmit = utility(m_omit)


const mPrepend = utility(m_prepend)


const mSet = utility(m_set)


const mapKeys = utility(map_keys)


const fes_map = utility(definitions_map)


const fes_none = utility(none)


const omitAll = utility(omit_all)


const omitWhen = utility(omit_when)


const fes_omit = utility(omit)


const passThrough = utility(definitions_pass_through)


const pickAllFrom = utility(pick_all_from)


const pickAll = utility(pick_all)


const fes_pickWhen = utility(pick_when)


const fes_prepend = utility(prepend)


const reduceFresh = utility(reduce_fresh)


const fes_reduce = utility(reduce)


const returnFirstArgument = utility(definitions_return_first_argument)


const fes_reverse = utility(reverse)


const setOfKeys = utility(set_of_keys)


const fes_set = utility(definitions_set)


const fes_startsWith = utility(starts_with)


const strictlyEquals = utility(definitions_strictly_equals)


const transformProperties = utility(transform_properties)


const truncateToNChars = utility(definitions_truncate_to_n_chars)


const truncateToNLines = utility(definitions_truncate_to_n_lines)


const fes_unique = utility(unique)




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "couchdb-base64"
var external_couchdb_base64_ = __webpack_require__(6);
var external_couchdb_base64_default = /*#__PURE__*/__webpack_require__.n(external_couchdb_base64_);

// EXTERNAL MODULE: external "tedent"
var external_tedent_ = __webpack_require__(3);
var external_tedent_default = /*#__PURE__*/__webpack_require__.n(external_tedent_);

// EXTERNAL MODULE: external "type-detect"
var external_type_detect_ = __webpack_require__(8);
var external_type_detect_default = /*#__PURE__*/__webpack_require__.n(external_type_detect_);

// EXTERNAL MODULE: ./lib/server/db/dal/preset-fields.js
var preset_fields = __webpack_require__(18);

// CONCATENATED MODULE: ./lib/server/db/dal/helpers.js
const methods = new Set(['create', 'delete', 'get', 'update']);

// EXTERNAL MODULE: ./lib/universal/utils.js + 9 modules
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/fes/index.js + 199 modules
var fes = __webpack_require__(0);

// CONCATENATED MODULE: ./lib/server/db/dal/create-method-to-approve-args.js
//---------//
// Imports //
//---------//






 //
//------//
// Init //
//------//

const shouldApprove = getShouldApprove(),
      {
  keys
} = Object,
      {
  _id,
  _rev
} = preset_fields["a" /* default */],
      propertyIsTruthy = fes["w" /* getValueAt */],
      validOptions = new Set(['allow404', 'returnRawResponse']); //
//------//
// Main //
//------//

const createMethodToApproveArgs = databaseDefinition => {
  const {
    fields,
    hasCustomId
  } = databaseDefinition;
  return Object(fes["U" /* reduce */])((methodToApproveArgs, method) => {
    let fieldsToApprove = [];
    if (shouldApprove.fields(method)) fieldsToApprove.push(...fields);
    if (shouldApprove.documentId(method)) fieldsToApprove.push(_id);
    if (shouldApprove.revision(method)) fieldsToApprove.push(_rev);

    if (method === 'create') {
      fieldsToApprove = Object(fes["p" /* discardWhen */])(Object(fes["y" /* hasOwnEnumerableKey */])('autogenerate'))(fieldsToApprove);
    }

    const approveArgs = createApproveArgs(fieldsToApprove, method, hasCustomId);
    return Object(fes["J" /* mSet */])(method, approveArgs)(methodToApproveArgs);
  }, {})(methods);
}; //
//------------------//
// Helper Functions //
//------------------//


function createApproveArgs(fieldsToApprove, method, hasCustomId) {
  const approveFieldNames = createApproveFieldNames(fieldsToApprove),
        fieldNameToApprove = Object(fes["U" /* reduce */])(toApprove, {})(fieldsToApprove);
  return (...args) => {
    if (Object(fes["A" /* isEmpty */])(args)) return new Error('You must pass a single argument');

    if (args.length > 2) {
      const truncatedArgs = Object(utils["z" /* truncateDirtyArgs */])(args);
      return new Error(external_tedent_default()(`
          You passed more than two arguments
          Arguments passed:

          ${truncatedArgs}
        `));
    }

    let firstArg = args[0];
    const firstArgType = external_type_detect_default()(firstArg),
          secondArg = args[1] || {},
          secondArgType = external_type_detect_default()(secondArg);

    if (firstArgType !== 'Object') {
      return new Error(external_tedent_default()(`
          The first argument passed was not type 'Object' (via type-detect)
          Type: ${firstArgType}
          nArg: ${Object(utils["y" /* truncate */])(firstArg)}
        `));
    }

    if (secondArgType !== 'Object') {
      return new Error(external_tedent_default()(`
          The second argument passed was not type 'Object' (via type-detect)
          Type: ${secondArgType}
          Arg: ${Object(utils["y" /* truncate */])(secondArg)}
        `));
    }

    const optionsError = approveOptions(secondArg);
    if (optionsError) return optionsError;

    if (hasCustomId) {
      if (method === 'create') {
        if (!firstArg._id) {
          return new Error(external_tedent_default()(`
              This database requires you pass a custom _id
              Arg: ${Object(utils["y" /* truncate */])(firstArg)}
            `));
        }

        firstArg = Object(fes["N" /* omit */])('_id')(firstArg);
      }

      if (!external_couchdb_base64_default.a.isCouchdbBase64String(firstArg._id)) {
        return new Error(external_tedent_default()(`
            _id must pass isCouchdbBase64String

            _id: ${firstArg._id}
          `));
      }
    }

    const error = approveFieldNames(firstArg);
    if (error) return error;
    const fieldToErrorMessage = Object(fes["Q" /* passThrough */])(firstArg, [Object(fes["Z" /* transformProperties */])(fieldNameToApprove), Object(fes["E" /* keepWhen */])(utils["j" /* isTruthy */])]);

    if (Object(fes["B" /* isLaden */])(fieldToErrorMessage)) {
      const invalidFields = Object(fes["R" /* pickAll */])(keys(fieldToErrorMessage))(firstArg),
            truncatedFields = Object(utils["z" /* truncateDirtyArgs */])(invalidFields);
      const errorReasons = Object(fes["Q" /* passThrough */])(fieldToErrorMessage, [Object(fes["U" /* reduce */])(toArrayOfReasons, []), Object(fes["C" /* join */])('\n\n')]);
      const invalidFieldsMessage = `The following fields are invalid: ${truncatedFields}`,
            errorReasonMessage = external_tedent_default()(`
          They are invalid for the following reasons:

          ${errorReasons}
        `);
      return new Error(`${invalidFieldsMessage}\n\n${errorReasonMessage}`);
    }
  };
}

function createApproveFieldNames(fieldsToApprove) {
  const validFieldNames = Object(fes["K" /* map */])(Object(fes["w" /* getValueAt */])('name'))(fieldsToApprove),
        requiredFieldNames = Object(fes["Q" /* passThrough */])(fieldsToApprove, [Object(fes["E" /* keepWhen */])(propertyIsTruthy('isRequired')), Object(fes["K" /* map */])(Object(fes["w" /* getValueAt */])('name'))]);
  return fieldsObject => {
    const fieldNamesPassed = keys(fieldsObject),
          invalidFields = Object(fes["O" /* omitAll */])(validFieldNames)(fieldsObject);

    if (Object(fes["B" /* isLaden */])(invalidFields)) {
      const invalidFieldsErrorMessage = Object(utils["z" /* truncateDirtyArgs */])(invalidFields),
            fieldsAllowedMessage = Object(fes["B" /* isLaden */])(validFieldNames) ? Object(fes["C" /* join */])(', ')(validFieldNames) : '<none>';
      return new Error(external_tedent_default()(`
          Invalid fields were passed
          Fields allowed: ${fieldsAllowedMessage}
          Fields passed: ${invalidFieldsErrorMessage}
        `));
    }

    const missingFields = Object(fes["n" /* discardAll */])(fieldNamesPassed)(requiredFieldNames);

    if (Object(fes["B" /* isLaden */])(missingFields)) {
      return new Error(`The following fields are missing: ${Object(fes["C" /* join */])(', ')(missingFields)}`);
    }
  };
}

function toApprove(fieldToApprove, field) {
  return Object(fes["J" /* mSet */])(field.name, field.approve)(fieldToApprove);
}

function getShouldApprove() {
  return {
    documentId: Object(fes["j" /* containedIn */])(['delete', 'get', 'update']),
    fields: Object(fes["j" /* containedIn */])(['create', 'update']),
    revision: Object(fes["j" /* containedIn */])(['delete', 'update'])
  };
}

function toArrayOfReasons(result, reason, key) {
  return Object(fes["G" /* mAppend */])(`${key}: ${reason}`)(result);
}

function approveOptions(secondArg) {
  const invalidKeys = Object(fes["Q" /* passThrough */])(secondArg, [fes["t" /* getArrayOfKeys */], Object(fes["n" /* discardAll */])(validOptions)]);

  if (Object(fes["B" /* isLaden */])(invalidKeys)) {
    return new Error(external_tedent_default()(`
        Invalid options were passed
        Options allowed: ${Object(fes["C" /* join */])(', ')(validOptions)}
        Invalid options passed: ${Object(fes["C" /* join */])(', ')(invalidKeys)}
      `));
  }

  const invalidOptions = Object(fes["p" /* discardWhen */])(isBoolean)(secondArg);

  if (Object(fes["B" /* isLaden */])(invalidOptions)) {
    return new Error(external_tedent_default()(`
        All options must be typeof boolean
        Invalid options: ${Object(utils["z" /* truncateDirtyArgs */])(invalidOptions)}
      `));
  }
}

function isBoolean(value) {
  return typeof value === 'boolean';
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var create_method_to_approve_args = (createMethodToApproveArgs);
// EXTERNAL MODULE: ./lib/server/db/dal/database-name-to-definition.js
var database_name_to_definition = __webpack_require__(27);

// CONCATENATED MODULE: ./lib/server/db/dal/section-to-create-error-message.js
//---------//
// Imports //
//---------//


 //
//------//
// Init //
//------//

const methodNameToAction = getMethodNameToAction(),
      setOfVowels = new Set('aeiou'); //
//------//
// Main //
//------//

const sections = ['couchdb', 'fallback', 'invalidArgs'],
      sectionToCreateErrorMessage = Object(fes["U" /* reduce */])(toCreateMessage, {})(sections); //
//------------------//
// Helper Functions //
//------------------//

function toCreateMessage(sectionToCreateMessage, section) {
  return Object(fes["J" /* mSet */])(section, createMessage)(sectionToCreateMessage);

  function createMessage(methodName, databaseName, args, invalidArgsMessage = '') {
    const action = methodNameToAction[methodName],
          firstLetterIsVowel = setOfVowels.has(databaseName[0]),
          aOrAn = firstLetterIsVowel ? 'an' : 'a',
          friendly = `${action} ${aOrAn} ${databaseName} record`,
          truncatedArgs = Object(utils["z" /* truncateDirtyArgs */])(args);
    let detailed = external_tedent_default()(`
      while ${friendly}

      section: ${section}
    `);

    if (invalidArgsMessage) {
      detailed += `\n${invalidArgsMessage}`;
    }

    detailed += `\n\n${truncatedArgs}`;
    return {
      friendly,
      detailed
    };
  }
}

function getMethodNameToAction() {
  return {
    create: 'creating',
    delete: 'deleting',
    get: 'getting',
    update: 'updating'
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var section_to_create_error_message = (sectionToCreateErrorMessage);
// EXTERNAL MODULE: ./lib/server/api/couchdb.js
var couchdb = __webpack_require__(16);

// CONCATENATED MODULE: ./lib/server/api/index.js


// EXTERNAL MODULE: ./lib/server/db/couchdb-id-utils.js
var couchdb_id_utils = __webpack_require__(17);

// EXTERNAL MODULE: ./lib/server/utils.js + 1 modules
var server_utils = __webpack_require__(4);

// CONCATENATED MODULE: ./lib/server/db/dal/index.js
//---------//
// Imports //
//---------//








 //
//------//
// Main //
//------//

const databaseNameToAccessLayer = Object(fes["I" /* mMap */])(definitionToAccessLayer)(database_name_to_definition["a" /* default */]),
      defaultOptions = {
  returnRawResponse: false,
  allow404: false
},
      applyDefaults = Object(fes["g" /* assignOver */])(defaultOptions); //
//------------------//
// Helper Functions //
//------------------//

function definitionToAccessLayer(databaseDefinition, databaseName) {
  const {
    fields
  } = databaseDefinition;
  const couchdbAccessor = couchdb["a" /* default */].createDbAccessor(Object(utils["h" /* dashelize */])(databaseName)),
        methodToApproveArgs = create_method_to_approve_args(databaseDefinition),
        fieldToAutogenerate = Object(fes["Q" /* passThrough */])(fields, [Object(fes["E" /* keepWhen */])(Object(fes["y" /* hasOwnEnumerableKey */])('autogenerate')), Object(fes["U" /* reduce */])((result, field) => Object(fes["J" /* mSet */])(field.name, field.autogenerate)(result), {})]);
  return Object(fes["U" /* reduce */])(toAccessLayer, {})(methods); // helper functions scoped to 'definitionToAccessLayer'

  function toAccessLayer(result, method) {
    return Object(fes["J" /* mSet */])(method, accessor)(result); // helper functions scoped to 'toAccessLayer'

    function accessor(...args) {
      const errorArgs = [method, databaseName, args],
            reject = (section, error) => {
        const message = section_to_create_error_message[section](...errorArgs);
        error.message = message.detailed + '\n\n' + error.message;
        return Object(server_utils["c" /* handleServerErrorSync */])(message.friendly, error);
      };

      try {
        const error = methodToApproveArgs[method](...args);
        if (error) return reject('invalidArgs', error); // input is valid woo woo

        const handleServerError = Object(server_utils["a" /* createHandleServerError */])(section_to_create_error_message.couchdb, errorArgs);
        let validArg = args[0],
            couchdbMethod = `${method}Document`;
        const options = applyDefaults(args[1] || {});

        if (method === 'get' && validArg._rev) {
          couchdbMethod += 'AtRevision';
        } else if (method === 'create') {
          const autogeneratedFields = Object(fes["K" /* map */])(fes["z" /* invoke */])(fieldToAutogenerate);
          validArg = Object(fes["h" /* combine */])(validArg)(autogeneratedFields);
          if (!validArg._id) validArg._id = Object(couchdb_id_utils["a" /* createCouchdbId */])();
        }

        return couchdbAccessor[couchdbMethod](validArg, options).catch(handleServerError);
      } catch (error) {
        return reject('fallback', error);
      }
    }
  }
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var dal = (databaseNameToAccessLayer);
// EXTERNAL MODULE: ./lib/server/db/dal/database-names.js
var database_names = __webpack_require__(20);

// CONCATENATED MODULE: ./lib/server/db/create-and-delete-all-dbs.js
//---------//
// Imports //
//---------//


 //
//------//
// Init //
//------//

const {
  createDb,
  deleteDb
} = couchdb["a" /* default */],
      pAll = arrayOfPromises => Promise.all(arrayOfPromises),
      deleteIfExists = name => deleteDb(name, {
  allow404: true
}); //
//------//
// Main //
//------//


const createAllDatabases = () => Object(fes["Q" /* passThrough */])(database_names["a" /* default */], [Object(fes["K" /* map */])(createDb), pAll]),
      deleteAllDatabases = () => Object(fes["Q" /* passThrough */])(database_names["a" /* default */], [Object(fes["K" /* map */])(deleteIfExists), pAll]); //
//---------//
// Exports //
//---------//



// CONCATENATED MODULE: ./lib/server/db/helpers.js
//---------//
// Imports //
//---------//
 //
//------//
// Main //
//------//

const pickIdAndRev = Object(fes["R" /* pickAll */])(['_id', '_rev']);
const removeCouchdbProperties = Object(fes["P" /* omitWhen */])(Object(fes["X" /* startsWith */])('_')); //
//---------//
// Exports //
//---------//


// CONCATENATED MODULE: ./lib/server/db/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return createAllDatabases; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "c", function() { return deleteAllDatabases; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return couchdb_id_utils["a" /* createCouchdbId */]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "d", function() { return couchdb_id_utils["b" /* docidToHash */]; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return /* unused reexport */undefined; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return /* unused reexport */undefined; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return /* unused reexport */undefined; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return /* unused reexport */undefined; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "e", function() { return couchdb_id_utils["c" /* hashToDocid */]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "f", function() { return pickIdAndRev; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "g", function() { return removeCouchdbProperties; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return dal; });






/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "decamelize"
var external_decamelize_ = __webpack_require__(42);
var external_decamelize_default = /*#__PURE__*/__webpack_require__.n(external_decamelize_);

// EXTERNAL MODULE: external "tedent"
var external_tedent_ = __webpack_require__(3);
var external_tedent_default = /*#__PURE__*/__webpack_require__.n(external_tedent_);

// EXTERNAL MODULE: external "error-stack-parser"
var external_error_stack_parser_ = __webpack_require__(43);
var external_error_stack_parser_default = /*#__PURE__*/__webpack_require__.n(external_error_stack_parser_);

// EXTERNAL MODULE: external "lodash/random"
var random_ = __webpack_require__(44);
var random_default = /*#__PURE__*/__webpack_require__.n(random_);

// EXTERNAL MODULE: external "type-detect"
var external_type_detect_ = __webpack_require__(8);
var external_type_detect_default = /*#__PURE__*/__webpack_require__.n(external_type_detect_);

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(25);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// EXTERNAL MODULE: ./node_modules/fes/index.js + 199 modules
var fes = __webpack_require__(0);

// EXTERNAL MODULE: ./lib/universal/axios-helpers.js
var axios_helpers = __webpack_require__(10);

// CONCATENATED MODULE: ./lib/universal/api.js
//---------//
// Imports //
//---------//


 //
//------//
// Init //
//------//

const axiosInstance = external_axios_default.a.create({
  baseURL: 'http://localhost:8080/' + 'api/'
}),
      methodsWithData = new Set(['post', 'put']); //
//------//
// Main //
//------//

const api = Object(fes["U" /* reduce */])(toApi, {})(['delete', 'get', 'post', 'put']); //
//------------------//
// Helper Functions //
//------------------//

function toApi(methodToApiCall, method) {
  const apiCall = methodsWithData.has(method) ? apiCall_With_Data : apiCall_Without_Data;
  return Object(fes["J" /* mSet */])(method, apiCall)(methodToApiCall); //
  // async because if a synchronous error occurs then it will be rejected
  //   instead of thrown
  //

  function apiCall_With_Data(url, data, options) {
    try {
      const axiosOptions = Object(axios_helpers["a" /* getAxiosOptions */])(options),
            maybeTransformResult = Object(axios_helpers["b" /* getResponseTransform */])(options);
      return axiosInstance[method](url, data, axiosOptions).then(maybeTransformResult);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  function apiCall_Without_Data(url, options) {
    try {
      const axiosOptions = Object(axios_helpers["a" /* getAxiosOptions */])(options),
            maybeTransformResult = Object(axios_helpers["b" /* getResponseTransform */])(options);
      return axiosInstance[method](url, axiosOptions).then(maybeTransformResult);
    } catch (e) {
      return Promise.reject(e);
    }
  }
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var universal_api = (api);
// CONCATENATED MODULE: ./lib/universal/jstring.js
/* harmony default export */ var jstring = (something => {
  return typeof something === 'string' ? something : '' + JSON.stringify(something, createReplacer(), 2);
});

function createReplacer() {
  const duplicateObjects = new Map();
  return (key, value) => {
    if (value && typeof value === 'object') {
      if (duplicateObjects.has(value)) {
        return `<duplicate of '${duplicateObjects.get(value)}'>`;
      } else {
        duplicateObjects.set(value, key);
        return value;
      }
    }

    return typeof value === 'function' ? '<function>' : value;
  };
}
// CONCATENATED MODULE: ./lib/universal/truncate-dirty-args.js
//---------//
// Imports //
//---------//


 //
//------//
// Main //
//------//
//
// the term 'dirty' means either invalid or not yet validated.  It is the reason
//   we need to truncate the values because otherwise we would have known data
//   and thus be able to format it nicely.
//
// this method handles a few types of 'args'
//   1. an array of arguments (array-like)
//   2. an 'arguments' object (array-like)
//   3. an object representing the arguments to a function which only takes a
//      single argument object (named as opposed to numeric key-value pairs).
//      I often use this convention to simplify input validation
//

const truncateDirtyArgs = args => {
  const isObject = external_type_detect_default()(args) === 'Object',
        [take3, toArray] = isObject ? [take3_object, fes["u" /* getArrayOfValues */]] : [Object(fes["D" /* keepFirst */])(3), fes["W" /* returnFirstArgument */]];
  return Object(fes["Q" /* passThrough */])(args, [take3, Object(fes["I" /* mMap */])(Object(fes["r" /* flow */])([jstring, Object(fes["bb" /* truncateToNLines */])(3)])), Object(fes["I" /* mMap */])((aString, key) => `${key}: ${aString}`), toArray, Object(fes["C" /* join */])('\n\n'), maybeAddMoreIndicator(Object(fes["v" /* getCount */])(args))]);
}; //
//------------------//
// Helper Functions //
//------------------//


function take3_object(anObject) {
  const keys = Object.keys(anObject);
  if (keys.length <= 3) return anObject;
  const result = {};

  for (let i = 0; i < 3; i += 1) {
    const currentKey = keys[i];
    result[currentKey] = anObject[currentKey];
  }

  return result;
}

function maybeAddMoreIndicator(numArguments) {
  return truncatedArgs => {
    return numArguments > 3 ? Object(fes["d" /* append */])(`\n...(${numArguments - 3} more)`)(truncatedArgs) : truncatedArgs;
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var truncate_dirty_args = (truncateDirtyArgs);
// CONCATENATED MODULE: ./lib/universal/create-approve-simple-input.js
//---------//
// Imports //
//---------//



 //
//------//
// Main //
//------//
//
// Validates
//   1. a single argument was passed
//   2. the single argument is an object
//   3. the object only has the expected arguments
//   4. the object is not missing any arguments
//

const createApproveSimpleInput = context => {
  const createError = message => new Error(`Error while ${context}\n${message}`);

  return function approveSimpleInput(arrayOfArguments, requiredProperties) {
    if (arrayOfArguments.length !== 1) {
      const firstThree = arrayOfArguments.length > 3 ? 'first three ' : '',
            truncatedArguments = truncate_dirty_args(arrayOfArguments);
      return createError(external_tedent_default()(`
          This method requires a single object argument
          number of arguments passed: ${arrayOfArguments.length}
          ${firstThree}arguments passed: ${truncatedArguments}
        `));
    }

    const input = arrayOfArguments[0];

    if (input === null || typeof input !== 'object') {
      return createError(external_tedent_default()(`
          Input must be an object
          input passed: ${jstring(input)}
        `));
    }

    const passedKeys = Object.keys(input),
          unexpectedProperties = Object(fes["n" /* discardAll */])(requiredProperties)(passedKeys);

    if (Object(fes["B" /* isLaden */])(unexpectedProperties)) {
      return createError(external_tedent_default()(`
          The following unexpected properties were passed:
          ${Object(fes["C" /* join */])(', ')(unexpectedProperties)}
        `));
    }

    const missingProperties = Object(fes["n" /* discardAll */])(passedKeys)(requiredProperties);

    if (Object(fes["B" /* isLaden */])(missingProperties)) {
      return createError(`The following properties are missing: ${Object(fes["C" /* join */])(', ')(missingProperties)}`);
    }
  };
}; //
//---------//
// Exports //
//---------//


/* harmony default export */ var create_approve_simple_input = (createApproveSimpleInput);
// CONCATENATED MODULE: ./lib/universal/repeat-string.js
//
// implementation thanks to Jon Schlinkert
//

/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/* harmony default export */ var repeat_string = (numberOfTimes => stringToRepeat => {
  // cover common, quick use cases
  if (numberOfTimes === 1) return stringToRepeat;
  if (numberOfTimes === 2) return stringToRepeat + stringToRepeat;
  const max = stringToRepeat.length * numberOfTimes;
  let result = '';

  while (max > result.length && numberOfTimes > 1) {
    if (numberOfTimes & 1) {
      result += stringToRepeat;
    }

    numberOfTimes >>= 1;
    stringToRepeat += stringToRepeat;
  }

  result += stringToRepeat;
  result = result.substr(0, max);
  return result;
});
// CONCATENATED MODULE: ./lib/universal/truncate.js


const truncate = Object(fes["r" /* flow */])([jstring, Object(fes["bb" /* truncateToNLines */])(3)]);
/* harmony default export */ var universal_truncate = (truncate);
// CONCATENATED MODULE: ./lib/universal/set-value-at-path.js
//
// README
//   - This is an old implementation I wrote that "works".  I need to rewrite it
//     using my current conventions
//
//---------//
// Imports //
//---------//


 //
//------//
// Init //
//------//

const setOfAssignableTypes = new Set(['object', 'function']); //
//------//
// Main //
//------//

const setValueAtPath = (propertyPath, val) => object => {
  // not sure what the desired case would be for an empty propertyPath, so
  //   throwing an error until I encounter it
  if (!propertyPath.length) {
    throw new Error(external_tedent_default()(`
        setValueAtPath requires a laden path
        propertyPath: JSON.stringify(propertyPath, null, 2)
      `));
  }

  let i = 0,
      shouldCheckForKey = true,
      tmpObject = object;

  while (i < propertyPath.length - 1) {
    const key = propertyPath[i];

    if (!shouldCheckForKey) {
      if (i < propertyPath.length - 1) {
        tmpObject = tmpObject[key] = {};
      } else if (i === propertyPath.length - 1) {
        tmpObject[key] = val;
      }
    } else {
      if (!hasKey(key, tmpObject) || tmpObject[key] === undefined) {
        if (i < propertyPath.length - 1) {
          tmpObject = tmpObject[key] = {};
          shouldCheckForKey = false;
        } else if (i === propertyPath.length - 1) {
          tmpObject[key] = val;
        }
      } else {
        if (!setOfAssignableTypes.has(typeof tmpObject[key])) {
          throw new Error(external_tedent_default()(`
              setValueAtPath was given a path containing an unassignable key

              propertyPath: ${Object(fes["C" /* join */])(', ')(propertyPath)}
              unassignable key: ${key}
              value at key: ${universal_truncate(tmpObject[key])}
              typeof value at key: ${typeof tmpObject[key]}
              assignable types: ${Object(fes["C" /* join */])(', ')(setOfAssignableTypes)}
            `));
        }

        tmpObject = tmpObject[key];
      }
    }

    i += 1;
  }

  tmpObject[propertyPath[i]] = val;
  return object;
}; //
//------------------//
// Helper Functions //
//------------------//


function hasKey(key, anObject) {
  return isAnObject(anObject) && (anObject[key] !== undefined || key in anObject);
}

function isAnObject(anObject) {
  return typeof anObject === 'object' && anObject !== null;
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var set_value_at_path = (setValueAtPath);
// EXTERNAL MODULE: external "sourcemapped-stacktrace"
var external_sourcemapped_stacktrace_ = __webpack_require__(47);

// CONCATENATED MODULE: ./lib/universal/promise-utils.js
//---------//
// Imports //
//---------//
 //
//------//
// Main //
//------//

const promiseFlow = arrayOfFunctions => arg => Object(fes["U" /* reduce */])((result, possiblyAsyncFn) => result.then(possiblyAsyncFn), Promise.resolve(arg))(arrayOfFunctions);

function resolveAllProperties(anObject) {
  return Object(fes["Q" /* passThrough */])(anObject, [toPairs, Object(fes["I" /* mMap */])(resolveAll), resolveAll, then(fromPairs)]);
}

function resolveAll(anArray) {
  return Promise.all(anArray);
}

function settleAll(arrayOfPromises) {
  return Object(fes["Q" /* passThrough */])(arrayOfPromises, [Object(fes["K" /* map */])(settle), resolveAll]);
}

function then(callThis) {
  return aPromise => aPromise.then.call(aPromise, callThis);
} //
//------------------//
// Helper Functions //
//------------------//


function fromPairs(anArray) {
  return Object(fes["U" /* reduce */])((res, [key, val]) => Object(fes["J" /* mSet */])(key, val)(res), {})(anArray);
}

function toPairs(obj) {
  return Object(fes["I" /* mMap */])(aKey => [aKey, obj[aKey]])(Object.keys(obj));
}

function settle(aPromise) {
  return aPromise.then(successVal => ({
    value: successVal,
    status: 'resolve'
  }), err => ({
    value: err,
    status: 'reject'
  }));
} //
//---------//
// Exports //
//---------//



// CONCATENATED MODULE: ./lib/universal/assign-all-leaves.js
//---------//
// Imports //
//---------//

 //
//------//
// Main //
//------//

const assignAllLeaves = state => updatedState => {
  return Object(fes["U" /* reduce */])(toUpdatedState, state)(updatedState);
}; //
//------------------//
// Helper Functions //
//------------------//


function toUpdatedState(resultState, updatedValue, keyToUpdate) {
  const previousValue = resultState[keyToUpdate];

  if (isArray(updatedValue)) {
    const shouldKeepTraversing = assign_all_leaves_isObject(previousValue) && assign_all_leaves_isObject(updatedValue);
    resultState[keyToUpdate] = shouldKeepTraversing ? Object(fes["U" /* reduce */])(toUpdatedState, previousValue)(updatedValue) : updatedValue;
  } else if (assign_all_leaves_isObject(updatedValue)) {
    resultState[keyToUpdate] = Object(fes["U" /* reduce */])(toUpdatedState, previousValue)(updatedValue);
  } else {
    resultState[keyToUpdate] = updatedValue;
  }

  return resultState;
}

function isArray(value) {
  return external_type_detect_default()(value) === 'Array';
}

function assign_all_leaves_isObject(value) {
  return external_type_detect_default()(value) === 'Object';
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var assign_all_leaves = (assignAllLeaves);
// CONCATENATED MODULE: ./lib/universal/utils.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return approveAllPropertiesAreLaden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return approveIsBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return approveIsLaden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return approveIsLadenString; });
/* unused harmony export bindAll */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return callEach; });
/* unused harmony export capitalizeFirstLetter */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return createRange; });
/* unused harmony export createRejectWrapper */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return dashelize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return discardPreceding; });
/* unused harmony export findFirstValueWithTruthyKey */
/* unused harmony export getRandomElementFrom */
/* unused harmony export hasLength */
/* unused harmony export isFalsey */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return isTruthy; });
/* unused harmony export keepAllButLast */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return utils_log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return logError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return logErrorToServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return logResponseError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return mAddToSet; });
/* unused harmony export mRemoveAtIndex */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return noop; });
/* unused harmony export reject */
/* unused harmony export removeExtension */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return sequentiallyResolveEach; });
/* unused harmony export setShowErrorView */
/* unused harmony export setShowNotFoundOrErrorView */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return toCommaList; });
/* unused harmony export toEnum */
/* unused harmony export toWrittenList */
/* unused harmony export waitMs */
/* unused harmony export wrapIn */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "r", function() { return promiseFlow; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "t", function() { return resolveAll; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "u", function() { return resolveAllProperties; });
/* unused concated harmony import null */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return /* unused export */ undefined; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "w", function() { return then; });
/* unused concated harmony import assignAllLeaves */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return /* unused export */ undefined; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "f", function() { return create_approve_simple_input; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "k", function() { return jstring; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "s", function() { return repeat_string; });
/* unused concated harmony import setValueAtPath */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return /* unused export */ undefined; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "y", function() { return universal_truncate; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "z", function() { return truncate_dirty_args; });
//---------//
// Imports //
//---------//













 //
//------//
// Init //
//------//

const currentCommitHash = process.env.CURRENT_COMMIT_HASH,
      isDevelopment = "production" === 'development',
      skipRequestRe = /webpack-internal/; //
//------//
// Main //
//------//
//
// This method assumes anObject is an object with keys
//

const approveAllPropertiesAreLaden = anObject => {
  const invalidProps = Object(fes["E" /* keepWhen */])(val => Object(fes["A" /* isEmpty */])(val))(anObject);

  if (Object(fes["B" /* isLaden */])(invalidProps)) {
    const stringifiedInvalidProps = Object(fes["Q" /* passThrough */])(invalidProps, [Object(fes["K" /* map */])(value => '' + value), jstring]);
    return new Error(external_tedent_default()(`
        The following properties must be truthy
        invalid props: ${stringifiedInvalidProps}
      `));
  }
};

const approveIsBoolean = value => {
  if (typeof value !== 'boolean') {
    return external_tedent_default()(`
      Value must be typeof 'boolean'
      typeof value: ${typeof value}
      value: ${jstring(value)}
    `);
  }
};

const approveIsLaden = value => {
  if (Object(fes["A" /* isEmpty */])(value)) {
    return external_tedent_default()(`
      Value must pass 'isLaden'
      value: ${jstring(value)}
    `);
  }
};

const approveIsLadenString = value => {
  if (typeof value !== 'string') {
    return external_tedent_default()(`
      value is not typeof 'string'
      typeof value: ${typeof value}
      value: ${jstring(value)}
    `);
  } else if (value === '') {
    return 'value cannot be an empty string';
  }
};

const bindAll = (arrayOfPropNames, object) => {
  const result = {};
  arrayOfPropNames.forEach(propName => {
    result[propName] = object[propName].bind(object);
  });
  return result;
};

const callEach = (anArgument, arrayOfFunctions) => {
  Object(fes["s" /* forEach */])(fn => fn(anArgument))(arrayOfFunctions);
  return anArgument;
};

const capitalizeFirstLetter = aString => aString[0].toUpperCase() + aString.slice(1);

function createRange(start = 0, end) {
  if (arguments.length === 1) {
    if (start === 0) return [];
    end = start > 0 ? start - 1 : start + 1;
    start = 0;
  }

  let j = start;
  const result = new Array(Math.abs(end - start) + 1),
        stepJ = start < end ? () => {
    j += 1;
  } : () => {
    j -= 1;
  };

  for (let i = 0; i < result.length; i += 1) {
    result[i] = j;
    stepJ();
  }

  return result;
}

const createRejectWrapper = reject => messageOrError => {
  const error = external_type_detect_default()(messageOrError) === 'Error' ? messageOrError : new Error(messageOrError);
  return reject(error);
};

const dashelize = aString => external_decamelize_default()(aString, '-');

const discardPreceding = maybeStartsWithThis => {
  const shouldDiscardFrom = Object(fes["X" /* startsWith */])(maybeStartsWithThis),
        discardPrecedingFrom = Object(fes["o" /* discardFirst */])(maybeStartsWithThis.length);
  return fullString => {
    return shouldDiscardFrom(fullString) ? discardPrecedingFrom(fullString) : fullString;
  };
};

const findFirstValueWithTruthyKey = arrayOfPairs => {
  for (const [key, value] of arrayOfPairs) {
    if (key) return value;
  }
};

const getRandomElementFrom = anArray => {
  return anArray[random_default()(0, anArray.length - 1)];
};

const hasLength = length => something => Object(fes["w" /* getValueAt */])('length')(something) === length;

const isFalsey = something => !something;

const isTruthy = something => !!something;

const keepAllButLast = anArray => anArray.slice(0, -1);

const utils_log = something => {
  console.log(something); // eslint-disable-line no-console
};

const logError = err => {
  if (err.response) {
    err.message = 'Error ' + err.message;
    logResponseError(console, err);
  } else console.error(err); // eslint-disable-line no-console

};

const logErrorToServer = ({
  context,
  error,
  ignoreStack
}) => {
  if (!error) {
    error = new Error('(no error was passed)');
    ignoreStack = true;
  }

  if (ignoreStack) {
    return universal_api.post('/log', createPostBody(error, context, '(no stack)')).catch(noop);
  }

  const eventualStack = undefined ? Object(external_sourcemapped_stacktrace_["mapStackTrace"])(error, {
    shouldSkipRequest
  }) : Promise.resolve(external_error_stack_parser_default.a.parse(error).map(Object(fes["w" /* getValueAt */])('source')));
  error.wasReported = true;
  return eventualStack.catch(eventualStackError => {
    //
    // if there's an error parsing the stack then we also want to log that
    //   on the server
    //
    // a non-parsed stack property includes the message because devs know
    //   better than you
    logError(eventualStackError.stack);
    return universal_api.post('/log', createPostBody(eventualStackError, 'during mapStackTrace', eventualStackError.stack)).then(Object(fes["b" /* alwaysReturn */])(undefined));
  }).then((stack = error.stack) => {
    if (Array.isArray(stack)) stack = stack.join('\n');else if (typeof stack !== 'string') stack = '<unexpected stack value>';

    if (isDevelopment) {
      logError(external_tedent_default()(`
              occurred ${context}

              ${error.message}

              ${stack}
            `));
    }

    return universal_api.post('/log', createPostBody(error, context, stack));
  }) // nothing left to do
  .catch(noop);
};

const logResponseError = (log, e) => {
  const requestInfo = e.request ? `
      request
        url: ${e.config.url}
        method: ${e.config.method}
        data: ${jstring(tryParse(e.config.data))}
    `.trim() : '';
  const responseInfo = e.response ? `
      response
        status: ${e.response.status}
        message: ${e.response.statusText}
        data: ${jstring(e.response.data)}
    `.trim() : '';
  return log.error(external_tedent_default()(`
      axios error: ${e.message}

      ${requestInfo}

      ${responseInfo}
    `) + '\n\n\n\n');
};

const mAddToSet = something => aSet => aSet.add(something);

const mRemoveAtIndex = index => anArray => {
  anArray.splice(index, 1);
  return anArray;
};

const noop = () => {};

const utils_reject = msg => Promise.reject(new Error(msg));

const removeExtension = filename => {
  const periodIndex = filename.lastIndexOf('.');
  return filename.slice(0, periodIndex);
};

const sequentiallyResolveEach = (asyncFunctions, arg) => {
  return Object(fes["U" /* reduce */])(toResolvedPromise, Promise.resolve(arg))(asyncFunctions);
};

const setShowErrorView = commit => _unused_error => {
  // TODO: create universal logger and log the error here
  commit('setShowErrorView', true, {
    root: true
  });
};

const setShowNotFoundOrErrorView = commit => error => {
  const status = Object(fes["x" /* getValueAtPath */])(['response', 'status'])(error),
        mutation = status === 404 ? 'setShowNotFoundView' : 'setShowErrorView';
  logErrorToServer({
    context: 'during route - setShowNotFoundOrErrorView',
    error
  });
  commit(mutation, true, {
    root: true
  });
};

const toCommaList = Object(fes["C" /* join */])(', ');
const toEnum = Object(fes["V" /* reduceFresh */])((result, val) => Object(fes["J" /* mSet */])(val, val)(result), () => ({}));

const toWrittenList = arrayOfStrings => {
  if (arrayOfStrings.length === 0) return '';else if (arrayOfStrings.length === 1) return arrayOfStrings[0];
  return keepAllButLast(arrayOfStrings).join(', ') + Object(fes["F" /* last */])(arrayOfStrings);
};

const tryParse = something => {
  try {
    return JSON.parse(something);
  } catch (_e) {
    return something;
  }
};

const waitMs = ms => new Promise(resolve => {
  setTimeout(resolve, ms);
});

const wrapIn = (left, right) => value => `${left}${value}${right}`; //
//------------------//
// Helper Functions //
//------------------//


function createPostBody(error, context, stack) {
  const body = {
    stack,
    commitHash: currentCommitHash,
    context: `occurred ${context}`,
    environment: 'server',
    message: error.message
  };

  if (error.response) {
    const {
      config,
      data
    } = error.response;
    body.other = {
      config: Object(fes["Q" /* passThrough */])(config, [Object(fes["R" /* pickAll */])(['header', 'method', 'url']), jstring]),
      data: jstring(data)
    };
  }

  return body;
}

function shouldSkipRequest(fileName) {
  return skipRequestRe.test(fileName);
}

function toResolvedPromise(result, asyncFunction) {
  return result.then(asyncFunction);
} //
//---------//
// Exports //
//---------//






/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("tedent");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(48);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);

// EXTERNAL MODULE: external "hashids"
var external_hashids_ = __webpack_require__(49);
var external_hashids_default = /*#__PURE__*/__webpack_require__.n(external_hashids_);

// EXTERNAL MODULE: external "pify"
var external_pify_ = __webpack_require__(26);
var external_pify_default = /*#__PURE__*/__webpack_require__.n(external_pify_);

// EXTERNAL MODULE: external "tedent"
var external_tedent_ = __webpack_require__(3);
var external_tedent_default = /*#__PURE__*/__webpack_require__.n(external_tedent_);

// EXTERNAL MODULE: ./lib/universal/utils.js + 9 modules
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/fes/index.js + 199 modules
var fes = __webpack_require__(0);

// CONCATENATED MODULE: ./lib/server/create-approve-request.js
//
// README
//   - Because we're stuck with an unfortunate side-effect'ful web server api,
//     this function sets ctx's status and body properties as well as returns
//     whether the request body was valid.
//
//---------//
// Imports //
//---------//


 //
//------//
// Init //
//------//

const propertyIsTruthy = fes["w" /* getValueAt */]; //
//------//
// Main //
//------//
//
// validationInfo has the shape
// {
//   approve: value => string (error message) | undefined
//   isRequired: <boolean>
// }
//

const createApproveRequest = inputIdToValidationInfo => {
  return function approveRequest(ctx) {
    const requestIsUnapproved = createRequestIsUnapproved(inputIdToValidationInfo, ctx);
    return Object(fes["q" /* findFirstWhen */])(requestIsUnapproved)([approveExpectedProperties, approveRequiredProperties, approveValidProperties]);
  };
}; //
//------------------//
// Helper Functions //
//------------------//


function createRequestIsUnapproved(inputIdToValidationInfo, ctx) {
  return function requestIsUnapproved(approveFunction) {
    return approveFunction(inputIdToValidationInfo, ctx.request.body);
  };
}

function approveExpectedProperties(inputIdToValidationInfo, requestBody) {
  const allowedKeys = Object.keys(inputIdToValidationInfo),
        unexpectedProperties = Object(fes["O" /* omitAll */])(allowedKeys)(requestBody),
        numberOfUnexpectedProperties = Object(fes["v" /* getCount */])(unexpectedProperties);

  if (numberOfUnexpectedProperties > 0) {
    const unexpectedPropsString = Object(utils["z" /* truncateDirtyArgs */])(unexpectedProperties);
    return external_tedent_default()(`
      Unexpected properties were passed
      expected keys: ${Object(fes["C" /* join */])(', ')(allowedKeys)}
      unexpected props passed: ${unexpectedPropsString}
    `);
  }
}

function approveRequiredProperties(inputIdToValidationInfo, requestBody) {
  const requiredKeys = toRequiredKeys(inputIdToValidationInfo),
        passedKeys = Object.keys(requestBody),
        missingKeys = Object(fes["n" /* discardAll */])(passedKeys)(requiredKeys);

  if (Object(fes["B" /* isLaden */])(missingKeys)) {
    return `You are missing the following keys: ${Object(fes["C" /* join */])(', ')(missingKeys)}`;
  }
}

function approveValidProperties(inputIdToValidationInfo, requestBody) {
  const inputIdToApprove = Object(fes["K" /* map */])(Object(fes["w" /* getValueAt */])('approve'))(inputIdToValidationInfo),
        invalidIdToReason = Object(fes["Q" /* passThrough */])(requestBody, [Object(fes["K" /* map */])((value, key) => inputIdToApprove[key](value)), Object(fes["E" /* keepWhen */])(fes["B" /* isLaden */])]),
        numberOfInvalidProperties = Object(fes["v" /* getCount */])(invalidIdToReason);

  if (numberOfInvalidProperties > 0) {
    const invalidProps = Object(fes["Q" /* passThrough */])(invalidIdToReason, [fes["t" /* getArrayOfKeys */], Object(fes["S" /* pickAllFrom */])(requestBody), utils["z" /* truncateDirtyArgs */]]),
          reasons = Object(fes["Q" /* passThrough */])(invalidIdToReason, [Object(fes["K" /* map */])((value, key) => `${key}: ${value}`), fes["u" /* getArrayOfValues */], Object(fes["C" /* join */])('\n\n')]);
    return external_tedent_default()(`
      Invalid properties were passed:
      ${invalidProps}

      reasons:
      ${reasons}
    `);
  }
}

function toRequiredKeys(inputIdToValidationInfo) {
  return Object(fes["Q" /* passThrough */])(inputIdToValidationInfo, [Object(fes["E" /* keepWhen */])(propertyIsTruthy('isRequired')), fes["t" /* getArrayOfKeys */]]);
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var create_approve_request = (createApproveRequest);
// EXTERNAL MODULE: ./lib/universal/input-validation-info/index.js + 2 modules
var input_validation_info = __webpack_require__(29);

// EXTERNAL MODULE: ./lib/server/log/index.js + 2 modules
var log = __webpack_require__(9);

// EXTERNAL MODULE: ./config/app.js
var app = __webpack_require__(5);

// CONCATENATED MODULE: ./lib/server/utils.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createHandleServerError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createIfRequestIsValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return handleServerErrorSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return hasher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ifResponseIsNot404; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ifStatusIsNot404; });
/* unused harmony export maybeReadFile */
/* unused harmony export readdir */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return readFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return readRawFile; });
/* unused harmony export writeFile */
//---------//
// Imports //
//---------//







 //
//------//
// Init //
//------//

const pFs = external_pify_default()(external_fs_default.a); //
//------//
// Main //
//------//

const createHandleServerError = (createMessage, arrayOfArgs) => error => {
  const message = createMessage(...arrayOfArgs);
  error.message = message.detailed + '\n\n' + error.message;
  return handleServerErrorSync(message.friendly, error);
};

const createIfRequestIsValid = endpointId => {
  const approveRequest = create_approve_request(input_validation_info["a" /* default */][endpointId]);
  return runThisIfValid => ctx => {
    const errorMessage = approveRequest(ctx);

    if (errorMessage) {
      ctx.status = 400;
      ctx.body = {
        error: errorMessage
      };
    } else {
      return runThisIfValid(ctx);
    }
  };
};

const handleServerErrorSync = (friendlyMessage, error) => {
  //
  // we want to let upstream know this has been logged/handled by the server.
  //   We also need to provide the friendly message so the web server code knows
  //   what to send to the client.
  //
  friendlyMessage = `An error occurred ${friendlyMessage}`;
  Object.assign(error, {
    isHandled: true,
    friendlyMessage
  });
  log["a" /* default */].server.error(error);
  return Promise.reject(error);
};

const hasher = new external_hashids_default.a(app["e" /* salt */].hashid);

const ifResponseIsNot404 = (ctx, runThisIfNot404) => response => {
  if (response.status === 404) {
    ctx.status = 404;
    return {
      is404: true
    };
  }

  return runThisIfNot404(response.data);
}; // TODO: figure out a better way to manage 404s.  I'm hoping a better solution
//   reveals itself soon


const ifStatusIsNot404 = runThisIfNot404 => result => {
  return result.is404 ? undefined : runThisIfNot404(result);
};

const maybeReadFile = fpath => readFile(fpath).catch(utils["q" /* noop */]);

const readdir = fpath => pFs.readdir(fpath);

const readFile = fpath => pFs.readFile(fpath, 'utf8');

const readRawFile = fpath => pFs.readFile(fpath);

const writeFile = fpath => content => pFs.writeFile(fpath, content); //
//---------//
// Exports //
//---------//




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export authorEmail */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return baseUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return couchdbAuth; });
/* unused harmony export domain */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return liveUpdateWebsocket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return logDirectory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return salt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return serverPort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return smtpAuth; });
//------//
// Init //
//------//
const domain = 'test.passthequill.com',
      liveUpdateWebsocketPort = 8081,
      serverPort = 8080; //
//------//
// Main //
//------//
//
// TODO: look into authentication alternatives
// I didn't look into the authentication mechanisms much, but they did note
//   basic auth to be lesser performant.
//

const authorEmail = `phil@test.passthequill.com`,
      couchdbAuth = {
  username: 'phil',
  password: 'nEyn7MTRPKbNr479fGIrIQqiaE5gKEhS'
},
      baseUrl = {
  couchdb: 'http://couchdb',
  external: `https://${domain}`,
  local: `http://localhost:${serverPort}`
},
      liveUpdateWebsocket = {
  port: liveUpdateWebsocketPort,
  url: `wss://${domain}:${liveUpdateWebsocketPort}/ws/`
},
      logDirectory = `/home/phil/logs/${domain}`,
      salt = {
  email: '$2a$11$eMKM3cKwBb/cjQDpc18PW.',
  hashid: 'Mu0MzXl4bppsYZ1USy8L_ZE5IwZ0M9xI'
},
      smtpAuth = {
  user: `info@test.passthequill.com`,
  pass: 'CWPTZWpM7D1bJiqwrlBAQQ4PHAS_JP9Q' //
  //---------//
  // Exports //
  //---------//

};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("couchdb-base64");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("type-detect");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "winston"
var external_winston_ = __webpack_require__(31);
var external_winston_default = /*#__PURE__*/__webpack_require__.n(external_winston_);

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(11);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);

// EXTERNAL MODULE: external "winston-daily-rotate-file"
var external_winston_daily_rotate_file_ = __webpack_require__(63);

// EXTERNAL MODULE: ./config/app.js
var app = __webpack_require__(5);

// CONCATENATED MODULE: ./lib/server/log/create-daily-rotating-logger.js
//---------//
// Imports //
//---------//



 //
//------//
// Init //
//------//

const {
  Logger
} = external_winston_default.a,
      levels = {
  error: 0,
  concern: 1,
  info: 2 //
  //------//
  // Main //
  //------//

};

const createDailyRotatingLogger = name => {
  const transport = new external_winston_default.a.transports.DailyRotateFile({
    dirname: external_path_default.a.resolve(app["d" /* logDirectory */], name),
    filename: '%DATE%.log',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    utc: true
  });
  return new Logger({
    levels,
    transports: [transport]
  });
}; //
//---------//
// Exports //
//---------//



/* harmony default export */ var create_daily_rotating_logger = (createDailyRotatingLogger);
// EXTERNAL MODULE: ./lib/universal/utils.js + 9 modules
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/fes/index.js + 199 modules
var fes = __webpack_require__(0);

// CONCATENATED MODULE: ./lib/server/log/create-winston-wrapper.js
//---------//
// Imports //
//---------//


 //
//------//
// Main //
//------//

const createWinstonWrapper = name => {
  const dailyRotatingLogger = create_daily_rotating_logger(name);
  return Object(fes["K" /* map */])(toWrapper)(levels); // scoped helper functions

  function toWrapper(_unused_levelInteger, levelName) {
    return (...args) => {
      if (levelName === 'error') return logError(dailyRotatingLogger, ...args);else return logMessage(dailyRotatingLogger, levelName, args[0]);
    };
  }
};

function logMessage(dailyRotatingLogger, levelName, message) {
  dailyRotatingLogger[levelName](message);
}

function logError(dailyRotatingLogger, ...args) {
  // eslint-disable-next-line prefer-const
  let [prependToError, error] = args;

  if (args.length === 2) {
    error.message = prependToError + '\n\n' + error.message;
  } else {
    error = prependToError;
  }

  if (error.request) {
    Object(utils["o" /* logResponseError */])(dailyRotatingLogger, error);
    return;
  }

  Object(fes["Q" /* passThrough */])(error.stack, [Object(utils["i" /* discardPreceding */])('Error: '), Object(utils["i" /* discardPreceding */])('error '), Object(fes["d" /* append */])('\n\n\n\n'), dailyRotatingLogger.error]);
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var create_winston_wrapper = (createWinstonWrapper);
// CONCATENATED MODULE: ./lib/server/log/index.js

/* harmony default export */ var log = __webpack_exports__["a"] = ({
  http: create_winston_wrapper('http'),
  server: create_winston_wrapper('server')
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getAxiosOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getResponseTransform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return returnData; });
/* harmony import */ var fes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
//---------//
// Imports //
//---------//
 //
//------//
// Init //
//------//

const possibleCustomOptions = new Set(['allow404', 'returnRawResponse']),
      allow404 = status => {
  return status >= 200 && status < 300 || status === 404;
}; //
//------//
// Main //
//------//


const getAxiosOptions = (options = {}) => {
  const derivedAxiosOptions = deriveAxiosOptions(options),
        axiosOptions = Object(fes__WEBPACK_IMPORTED_MODULE_0__[/* omitAll */ "O"])(possibleCustomOptions)(options);
  return Object(fes__WEBPACK_IMPORTED_MODULE_0__[/* combine */ "h"])(axiosOptions)(derivedAxiosOptions);
};

const getResponseTransform = (options = {}) => {
  return options.returnRawResponse ? fes__WEBPACK_IMPORTED_MODULE_0__[/* returnFirstArgument */ "W"] : returnData;
};

const returnData = Object(fes__WEBPACK_IMPORTED_MODULE_0__[/* getValueAt */ "w"])('data'); //
//------------------//
// Helper Functions //
//------------------//

function deriveAxiosOptions(options) {
  return options.allow404 ? {
    validateStatus: allow404
  } : {};
} //
//---------//
// Exports //
//---------//




/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return approveEmailType; });
/* unused harmony export isValidEmailType */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return validEmailTypes; });
/* harmony import */ var tedent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var tedent__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tedent__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var fes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
//---------//
// Imports //
//---------//


 //
//------//
// Init //
//------//

const validSendEmailTypes = ['invitation', 'room-created']; //
//------//
// Main //
//------//

const validEmailTypes = {
  send: new Set(validSendEmailTypes),
  unsubscribe: new Set(['all', ...validSendEmailTypes])
},
      isValidEmailType = {
  send: Object(fes__WEBPACK_IMPORTED_MODULE_2__[/* containedIn */ "j"])(validEmailTypes.send),
  unsubscribe: Object(fes__WEBPACK_IMPORTED_MODULE_2__[/* containedIn */ "j"])(validEmailTypes.unsubscribe)
},
      approveEmailType = {
  send: approveSendEmailType,
  unsubscribe: approveUnsubscribeEmailType //
  //------------------//
  // Helper Functions //
  //------------------//

};

function approveSendEmailType(value) {
  if (!isValidEmailType.send(value)) {
    return tedent__WEBPACK_IMPORTED_MODULE_0___default()(`
      '${value}' is an invalid send email type
      email types available: ${Object(_utils__WEBPACK_IMPORTED_MODULE_1__[/* toCommaList */ "x"])(validEmailTypes.send)}
    `);
  }
}

function approveUnsubscribeEmailType(value) {
  if (!isValidEmailType.unsubscribe(value)) {
    return tedent__WEBPACK_IMPORTED_MODULE_0___default()(`
      '${value}' is an invalid unsubscribe email type
      email types available: ${Object(_utils__WEBPACK_IMPORTED_MODULE_1__[/* toCommaList */ "x"])(validEmailTypes.unsubscribe)}
    `);
  }
} //
//---------//
// Exports //
//---------//




/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("clone-deep");

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (new Set(['displayNameAndSecretWord', 'gameRoomBasics', 'friendsGuessWithMultiMatch', 'friendsGuessWithSingleMatch', 'friendsGuessNoMatch', 'myFirstGuess', 'afterGuessWithMatch', 'afterGuessNoMatch', 'myGuessWithPriorMatch', 'myGuessNoPriorMatch']));

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var server_db_dal_database_names__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var server_db_couchdb_id_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var server_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var universal_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var project_root_config_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);
/* harmony import */ var universal_axios_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var fes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(0);
//---------//
// Imports //
//---------//







 //
//------//
// Init //
//------//

const couchdb = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: project_root_config_app__WEBPACK_IMPORTED_MODULE_5__[/* baseUrl */ "a"].couchdb,
  auth: project_root_config_app__WEBPACK_IMPORTED_MODULE_5__[/* couchdbAuth */ "b"]
}); //
//------//
// Main //
//------//

const api = {
  createDb,
  createDbAccessor,
  createDbAndAccessor,
  deleteDb,
  getAllDocuments,
  getAllIds,
  replicateAllDbs,
  revertToFixture
};

function createDbAccessor(name) {
  return {
    createDocument,
    deleteDocument,
    getDocument,
    getDocumentAtRevision,
    updateDocument // scoped helper functions

  };

  function createDocument(data) {
    const error = approveId(data._id);
    if (error) Object(server_utils__WEBPACK_IMPORTED_MODULE_3__[/* handleServerErrorSync */ "c"])(`error creating a ${name} record`, error);
    return couchdb.put(`/${name}/${data._id}`, Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* omit */ "N"])('_id')(data)).then(normalizeData).then(universal_axios_helpers__WEBPACK_IMPORTED_MODULE_6__[/* returnData */ "c"]);
  }

  function deleteDocument({
    _id,
    _rev
  }, options) {
    const error = approveIdAndRev(_id, _rev);
    if (error) Object(server_utils__WEBPACK_IMPORTED_MODULE_3__[/* handleServerErrorSync */ "c"])(`error deleting a ${name} record`, error);
    const maybeTransformResponse = Object(universal_axios_helpers__WEBPACK_IMPORTED_MODULE_6__[/* getResponseTransform */ "b"])(options),
          axiosOptions = Object(universal_axios_helpers__WEBPACK_IMPORTED_MODULE_6__[/* getAxiosOptions */ "a"])(options);
    return couchdb.delete(`/${name}/${_id}?rev=${_rev}`, axiosOptions).then(maybeTransformResponse);
  }

  function getDocument({
    _id
  }, options) {
    const error = approveId(_id);
    if (error) Object(server_utils__WEBPACK_IMPORTED_MODULE_3__[/* handleServerErrorSync */ "c"])(`error getting a ${name} record`, error);
    const maybeTransformResponse = Object(universal_axios_helpers__WEBPACK_IMPORTED_MODULE_6__[/* getResponseTransform */ "b"])(options),
          axiosOptions = Object(universal_axios_helpers__WEBPACK_IMPORTED_MODULE_6__[/* getAxiosOptions */ "a"])(options);
    return couchdb.get(`/${name}/${_id}`, axiosOptions).then(maybeTransformResponse);
  }

  function getDocumentAtRevision({
    _id,
    _rev
  }) {
    const error = approveIdAndRev(_id, _rev);
    if (error) Object(server_utils__WEBPACK_IMPORTED_MODULE_3__[/* handleServerErrorSync */ "c"])(`error getting a ${name} record`, error);
    return couchdb.get(`/${name}/${_id}?rev=${_rev}`).then(universal_axios_helpers__WEBPACK_IMPORTED_MODULE_6__[/* returnData */ "c"]);
  }

  function updateDocument(data) {
    const {
      _id,
      _rev
    } = data,
          error = approveIdAndRev(_id, _rev);
    if (error) Object(server_utils__WEBPACK_IMPORTED_MODULE_3__[/* handleServerErrorSync */ "c"])(`error updating a ${name} record`, error);
    data = Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* omitAll */ "O"])(['_id', '_rev'])(data);
    return couchdb.put(`/${name}/${_id}?rev=${_rev}`, data).then(normalizeData).then(universal_axios_helpers__WEBPACK_IMPORTED_MODULE_6__[/* returnData */ "c"]);
  }
} //
//------------------//
// Helper Functions //
//------------------//


function approveId(_id) {
  if (!_id) return new Error("The key '_id' is missing");
}

function approveIdAndRev(_id, _rev) {
  const missingKeys = [];
  if (!_id) missingKeys.push('_id');
  if (!_rev) missingKeys.push('_rev');

  if (Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* isLaden */ "B"])(missingKeys)) {
    return new Error(`The following keys are missing: ${Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* join */ "C"])(', ')(missingKeys)}`);
  }
}

function createDb(name) {
  return couchdb.put(`/${name}`);
}

async function createDbAndAccessor(name) {
  await createDb(name);
  return createDbAccessor(name);
}

function deleteDb(name, options) {
  const axiosOptions = Object(universal_axios_helpers__WEBPACK_IMPORTED_MODULE_6__[/* getAxiosOptions */ "a"])(options);
  return couchdb.delete(`/${name}`, axiosOptions);
}

function getAllDocuments(name) {
  return couchdb.get(`/${name}/_all_docs`).then(response => Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* passThrough */ "Q"])(response.data.rows, [Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* map */ "K"])(row => ({
    _id: row.id,
    _rev: row.value.rev
  })), Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* mMap */ "I"])(({
    _id,
    _rev
  }) => couchdb.get(`/${name}/${_id}?rev=${_rev}`)), universal_utils__WEBPACK_IMPORTED_MODULE_4__[/* resolveAll */ "t"]])).then(Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* map */ "K"])(Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* getValueAt */ "w"])('data')));
}

function getAllIds(name) {
  return couchdb.get(`/${name}/_all_docs`).then(response => Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* map */ "K"])(Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* getValueAt */ "w"])('id'))(response.data.rows));
}

function normalizeData(response) {
  //
  // normalize the data
  //   - id => _id
  //   - rev => _rev
  //     ** this keeps the api consistent -> simpler code
  //
  //   - ok => remove
  //     ** unsure why this exists, seems to overlap the http status
  //
  response.data = Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* passThrough */ "Q"])(response.data, [Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* omit */ "N"])('ok'), Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* mapKeys */ "L"])(Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* prepend */ "T"])('_'))]);
  return response;
}

function replicateAllDbs(fixtureName) {
  return Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* passThrough */ "Q"])(server_db_dal_database_names__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], [Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* map */ "K"])(deletePreviousReplication), universal_utils__WEBPACK_IMPORTED_MODULE_4__[/* resolveAll */ "t"], Object(universal_utils__WEBPACK_IMPORTED_MODULE_4__[/* then */ "w"])(Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* flow */ "r"])([Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* mMap */ "I"])(replicate), universal_utils__WEBPACK_IMPORTED_MODULE_4__[/* resolveAll */ "t"]]))]); // scoped helper functions

  function deletePreviousReplication(dbName) {
    return Promise.all([dbName, deleteDb(getFixtureDbName(fixtureName, dbName), {
      allow404: true
    })]);
  }

  function replicate([dbName]) {
    return couchdb.post(`/_replicate`, {
      id: getFixtureDbName(fixtureName, dbName),
      source: dbName,
      target: getFixtureDbName(fixtureName, dbName),
      create_target: true
    });
  }
}

function revertToFixture(fixtureName) {
  return Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* passThrough */ "Q"])(server_db_dal_database_names__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], [Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* map */ "K"])(deleteCurrentDb), universal_utils__WEBPACK_IMPORTED_MODULE_4__[/* resolveAll */ "t"], Object(universal_utils__WEBPACK_IMPORTED_MODULE_4__[/* then */ "w"])(Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* flow */ "r"])([Object(fes__WEBPACK_IMPORTED_MODULE_7__[/* mMap */ "I"])(restoreFixture), universal_utils__WEBPACK_IMPORTED_MODULE_4__[/* resolveAll */ "t"]]))]); // scoped helper functions

  function deleteCurrentDb(dbName) {
    return Promise.all([dbName, deleteDb(dbName)]);
  }

  function restoreFixture([dbName]) {
    return couchdb.post(`/_replicate`, {
      id: Object(server_db_couchdb_id_utils__WEBPACK_IMPORTED_MODULE_2__[/* createCouchdbId */ "a"])(),
      source: getFixtureDbName(fixtureName, dbName),
      target: dbName,
      create_target: true
    });
  }
}

function getFixtureDbName(fixtureName, dbName) {
  return `${fixtureName}_${dbName}`;
} //
//---------//
// Exports //
//---------//


/* harmony default export */ __webpack_exports__["a"] = (api);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createCouchdbId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return docidToHash; });
/* unused harmony export getCouchdbIdFromString */
/* unused harmony export getMomentCreated */
/* unused harmony export getRandom3ByteUInt */
/* unused harmony export getSecondsSinceMyEpoch */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hashToDocid; });
/* harmony import */ var couchdb_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var couchdb_base64__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(couchdb_base64__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var server_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var fes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
//---------//
// Imports //
//---------//



 //
//------//
// Init //
//------//

const myEpoch = moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc('2018.01.01', 'YYYY.MM.DD'),
      max3ByteUInt = 2 ** 24,
      timestampBits = 36,
      randomBits = 24,
      numberOfTimestampCharacters = timestampBits / 6,
      getTimestampCharactersFrom = Object(fes__WEBPACK_IMPORTED_MODULE_3__[/* keepFirst */ "D"])(numberOfTimestampCharacters),
      getRandomCharactersFrom = Object(fes__WEBPACK_IMPORTED_MODULE_3__[/* discardFirst */ "o"])(numberOfTimestampCharacters); //
//------//
// Main //
//------//
//
// creates a 60-bit string.  The first 36 bits are the seconds since
//   'myEpoch'.  The next 24 bits are random
//
// 36 bits of seconds gives us unique timestamps til year 4195
// 24 bits of randomness is overkill to prevent collisions for ids created
//   on the same second
//
// a great article on creating ids can be found hurr:
//   https://eager.io/blog/how-long-does-an-id-need-to-be/
//
// Note: I don't expect to be reaching any performance bottlenecks with ids, but
//   I did want to follow best-practice for sake of learning.  In that regard,
//   here is relevant couchdb documentation for document id performance:
//   http://docs.couchdb.org/en/2.1.1/maintenance/performance.html#document-s-id
//

const createCouchdbId = () => {
  const secondsSinceMyEpoch = moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc().diff(myEpoch, 'seconds'),
        random3ByteUInt = createRandom3ByteUInt(); //
  // 'base64' below refers to the custom base64 encoding provided
  //   by couchdb-base64
  //

  const base64Timestamp = encodeTimestamp(secondsSinceMyEpoch),
        base64Random = encodeRandomUInt(random3ByteUInt);
  return base64Timestamp + base64Random;
}; //
// docid is a couchdb-base64 encoded string
//


const docidToHash = docid => {
  const secondsSinceMyEpoch = getSecondsSinceMyEpoch(docid),
        random3ByteUInt = getRandom3ByteUInt(docid);
  return server_utils__WEBPACK_IMPORTED_MODULE_2__[/* hasher */ "d"].encode(secondsSinceMyEpoch, random3ByteUInt);
};

const getCouchdbIdFromString = aString => {
  return couchdb_base64__WEBPACK_IMPORTED_MODULE_0___default.a.encodeFromString(aString);
};

const getMomentCreated = docid => moment__WEBPACK_IMPORTED_MODULE_1___default()(myEpoch).add(getSecondsSinceMyEpoch(docid), 'seconds');

const getRandom3ByteUInt = docid => couchdb_base64__WEBPACK_IMPORTED_MODULE_0___default.a.decodeToUInt(getRandomCharactersFrom(docid));

const getSecondsSinceMyEpoch = docid => couchdb_base64__WEBPACK_IMPORTED_MODULE_0___default.a.decodeToUInt(getTimestampCharactersFrom(docid));

const hashToDocid = hash => {
  const [secondsSinceMyEpoch, randome3ByteUInt] = server_utils__WEBPACK_IMPORTED_MODULE_2__[/* hasher */ "d"].decode(hash);

  if (!secondsSinceMyEpoch) {
    throw new Error(`Unable to decode the hash: ${'' + hash}`);
  }

  const encodedTimestamp = encodeTimestamp(secondsSinceMyEpoch),
        encodedRandomUInt = encodeRandomUInt(randome3ByteUInt);
  return encodedTimestamp + encodedRandomUInt;
}; //
//------------------//
// Helper Functions //
//------------------//


function encodeTimestamp(secondsSinceMyEpoch) {
  return couchdb_base64__WEBPACK_IMPORTED_MODULE_0___default.a.encodeFromUInt({
    uint: secondsSinceMyEpoch,
    totalBits: timestampBits
  });
}

function encodeRandomUInt(random3ByteUInt) {
  return couchdb_base64__WEBPACK_IMPORTED_MODULE_0___default.a.encodeFromUInt({
    uint: random3ByteUInt,
    totalBits: randomBits
  });
}

function createRandom3ByteUInt() {
  return Math.floor(Math.random() * max3ByteUInt);
} //
//---------//
// Exports //
//---------//




/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var tedent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var tedent__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tedent__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var type_detect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var type_detect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(type_detect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _normalize_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var universal_input_validation_info__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29);
/* harmony import */ var universal_set_of_understands_keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var server_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4);
/* harmony import */ var universal_email_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);
/* harmony import */ var universal_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2);
/* harmony import */ var fes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(0);
//---------//
// Imports //
//---------//








 //
//------//
// Init //
//------//

const initialUnderstands = getInitialUnderstands(),
      validReasons = new Set(['game finished']),
      availableReasons = Object(universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* toCommaList */ "x"])(validReasons),
      isValidReason = Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* containedIn */ "j"])(validReasons),
      approveSecretWord = universal_input_validation_info__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].initPlayer.secretWord.approve,
      requiredGuessKeys = new Set(['hasAnyMatchingLetters', 'isCorrect', 'word']),
      validGuessKeys = new Set(['chosenLetter', ...requiredGuessKeys]); //
//------//
// Main //
//------//

const presetFields = Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* map */ "K"])(_normalize_field__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({
  _id: {
    approve: universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* approveIsLadenString */ "d"]
  },
  _rev: {
    approve: universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* approveIsLadenString */ "d"]
  },
  closedReason: {
    name: 'reason',
    approve: value => {
      if (!isValidReason(value)) {
        return tedent__WEBPACK_IMPORTED_MODULE_0___default()(`
          '${value}' is an invalid reason
          reasons available: ${availableReasons}
        `);
      }
    }
  },
  displayName: {
    isRequired: false
  },
  emailSentType: {
    name: 'type',
    approve: universal_email_types__WEBPACK_IMPORTED_MODULE_6__[/* approveEmailType */ "a"].send
  },
  emailUnsubscribeTypes: {
    name: 'types',
    approve: value => {
      const valueType = type_detect__WEBPACK_IMPORTED_MODULE_1___default()(value);

      if (valueType !== 'Array') {
        return tedent__WEBPACK_IMPORTED_MODULE_0___default()(`
          must be an array of valid unsubscribe types
          type of value passed: ${valueType}
          value passed: ${Object(universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* truncate */ "y"])(value)}
        `);
      }

      const invalidTypes = Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* discardAll */ "n"])(universal_email_types__WEBPACK_IMPORTED_MODULE_6__[/* validEmailTypes */ "b"].unsubscribe)(value);

      if (Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* isLaden */ "B"])(invalidTypes)) {
        return tedent__WEBPACK_IMPORTED_MODULE_0___default()(`
          Some invalid unsubscribe email types were passed
          invalid types passed: ${Object(universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* toCommaList */ "x"])(invalidTypes)}
          types available: all, ${Object(universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* toCommaList */ "x"])(universal_email_types__WEBPACK_IMPORTED_MODULE_6__[/* validEmailTypes */ "b"].unsubscribe)}
        `);
      }
    }
  },
  guesses: {
    autogenerate: () => [],
    approve: value => {
      const valueType = type_detect__WEBPACK_IMPORTED_MODULE_1___default()(value);

      if (valueType !== 'Array') {
        return tedent__WEBPACK_IMPORTED_MODULE_0___default()(`
          must have type 'Array' (according to typeDetect)
          type of value passed: ${valueType}
          value passed: ${Object(universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* truncate */ "y"])(value)}
        `);
      }

      const invalidGuesses = Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* discardWhen */ "p"])(isValidGuess)(value);

      if (Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* isLaden */ "B"])(invalidGuesses)) {
        const invalidGuessesString = Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* passThrough */ "Q"])(invalidGuesses, [Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* keepFirst */ "D"])(3), Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* map */ "K"])(universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* truncate */ "y"])]);
        return tedent__WEBPACK_IMPORTED_MODULE_0___default()(`
          Some invalid guesses were passed
          invalid guesses passed: ${invalidGuessesString}
        `);
      }
    }
  },
  hasEnteredGame: {
    approve: universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* approveIsBoolean */ "b"],
    autogenerate: Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* alwaysReturn */ "b"])(false)
  },
  isActive: {
    approve: universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* approveIsBoolean */ "b"],
    autogenerate: Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* alwaysReturn */ "b"])(true)
  },
  player1Hash: {
    isRequired: false
  },
  player2Hash: {
    isRequired: false
  },
  playerNumber: {
    name: 'number',
    approve: value => {
      if (value !== 1 && value !== 2) {
        return tedent__WEBPACK_IMPORTED_MODULE_0___default()(`
          Player number must be 1 or 2
          value passed: ${Object(universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* truncate */ "y"])(value)}
        `);
      }
    }
  },
  playerNumberTurn: {
    autogenerate: Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* alwaysReturn */ "b"])(2),
    approve: value => {
      if (value !== 1 && value !== 2) {
        return tedent__WEBPACK_IMPORTED_MODULE_0___default()(`
          Player number turn must be 1 or 2
          value passed: ${Object(universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* truncate */ "y"])(value)}
        `);
      }
    }
  },
  playerWord: {
    name: 'secretWord',
    approve: approveSecretWord,
    isRequired: false
  },
  roomHash: {
    approve: value => {
      if (server_utils__WEBPACK_IMPORTED_MODULE_5__[/* hasher */ "d"].decode(value).length !== 2) {
        return `'${value}' is an invalid roomHash.  It doesn't decode to two numbers`;
      }
    }
  },
  understands: {
    autogenerate: Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* alwaysReturn */ "b"])(initialUnderstands),
    approve: value => {
      if (typeof value !== 'object' || value === null) {
        return tedent__WEBPACK_IMPORTED_MODULE_0___default()(`
          must be typeof 'object'
          type of value passed: ${typeof value}
          value passed: ${Object(universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* truncate */ "y"])(value)}
        `);
      }

      const keysPassed = Object.keys(value),
            extraProps = Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* discardAll */ "n"])(universal_set_of_understands_keys__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(keysPassed);

      if (Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* isLaden */ "B"])(extraProps)) {
        const unexpectedPropsString = Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* passThrough */ "Q"])(extraProps, [Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* keepFirst */ "D"])(5), Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* join */ "C"])(', ')]),
              maybeEllipses = extraProps.length > 5 ? ', ...' : '';
        return tedent__WEBPACK_IMPORTED_MODULE_0___default()(`
          At least one unexpected property was passed
          ${unexpectedPropsString}${maybeEllipses}
        `);
      }

      const missingProps = Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* discardAll */ "n"])(keysPassed)(universal_set_of_understands_keys__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);

      if (Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* isLaden */ "B"])(missingProps)) {
        const missingPropsString = Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* passThrough */ "Q"])(missingProps, [Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* keepFirst */ "D"])(5), Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* join */ "C"])(', ')]),
              maybeEllipses = missingProps.length > 5 ? ', ...' : '';
        return tedent__WEBPACK_IMPORTED_MODULE_0___default()(`
          At least one property is missing
          ${missingPropsString}${maybeEllipses}
        `);
      }

      const invalidProps = Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* discardWhen */ "p"])(isTypeofBoolean)(value);

      if (Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* isLaden */ "B"])(invalidProps)) {
        const invalidPropsString = Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* passThrough */ "Q"])(invalidProps, [Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* keepFirst */ "D"])(3), Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* map */ "K"])(universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* truncate */ "y"])]),
              maybeEllipses = Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* getCount */ "v"])(invalidProps) > 5 ? '...\n' : '';
        return 'At least one property is not typoef boolean' + `\n${invalidPropsString}${maybeEllipses}`;
      }
    }
  },
  userAgent: {
    isRequired: false,
    approve: universal_utils__WEBPACK_IMPORTED_MODULE_7__[/* noop */ "q"]
  }
}); //
//------------------//
// Helper Functions //
//------------------//

function isTypeofBoolean(value) {
  return typeof value === 'boolean';
}

function isValidGuess(value) {
  const dirtyKeys = Object.keys(value);
  return typeof value === 'object' && Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* allContainedIn */ "a"])(validGuessKeys)(dirtyKeys) && Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* containsAll */ "l"])(requiredGuessKeys)(dirtyKeys);
}

function getInitialUnderstands() {
  return Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* reduce */ "U"])(toFalse, {})(universal_set_of_understands_keys__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);
}

function toFalse(result, key) {
  return Object(fes__WEBPACK_IMPORTED_MODULE_8__[/* mSet */ "J"])(key, false)(result);
} //
//---------//
// Exports //
//---------//


/* harmony default export */ __webpack_exports__["a"] = (presetFields);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("dedent");

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _database_name_to_definition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var universal_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var fes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (Object(fes__WEBPACK_IMPORTED_MODULE_2__[/* mMap */ "I"])(universal_utils__WEBPACK_IMPORTED_MODULE_1__[/* dashelize */ "h"])(Object.keys(_database_name_to_definition__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])));

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("koa2-ratelimit");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var universal_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var fes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
//---------//
// Imports //
//---------//

 //
//------//
// Main //
//------//

const normalizeField = (aField, key) => {
  aField = typeof aField === 'string' ? {
    name: aField
  } : aField;
  return Object(fes__WEBPACK_IMPORTED_MODULE_1__[/* assignOver */ "g"])({
    approve: universal_utils__WEBPACK_IMPORTED_MODULE_0__[/* approveIsLaden */ "c"],
    name: key,
    isRequired: true
  })(aField);
}; //
//---------//
// Exports //
//---------//


/* harmony default export */ __webpack_exports__["a"] = (normalizeField);

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("pify");

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _normalize_field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _preset_fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var fes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
//---------//
// Imports //
//---------//


 //
//------//
// Init //
//------//

const {
  closedReason,
  displayName,
  emailSentType,
  emailUnsubscribeTypes,
  guesses,
  hasEnteredGame,
  isActive,
  player1Hash,
  player2Hash,
  playerNumber,
  playerNumberTurn,
  playerWord,
  roomHash,
  understands,
  userAgent
} = _preset_fields__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]; //
//------//
// Main //
//------//

const databaseNameToDefinition = Object(fes__WEBPACK_IMPORTED_MODULE_2__[/* map */ "K"])(normalize)({
  activeRoom: {
    fields: [playerNumberTurn, player1Hash, player2Hash]
  },
  closedRoom: {
    fields: [closedReason, roomHash]
  },
  emailSent: {
    fields: ['to', emailSentType]
  },
  emailUnsubscription: {
    //
    // _id should be the encrypted email to ensure we don't duplicate entries
    //
    hasCustomId: true,
    fields: [emailUnsubscribeTypes]
  },
  log: {
    fields: ['commitHash', 'context', 'environment', 'ip', 'message', 'stack', userAgent]
  },
  player: {
    fields: ['encryptedEmail', displayName, guesses, hasEnteredGame, playerNumber, playerWord, roomHash]
  },
  guide: {
    //
    // _id should be the encrypted email which enforces one guide per user
    //
    hasCustomId: true,
    fields: [isActive, understands]
  }
}); //
//------------------//
// Helper Functions //
//------------------//

function normalize(databaseDefinition) {
  return Object(fes__WEBPACK_IMPORTED_MODULE_2__[/* passThrough */ "Q"])(databaseDefinition, [Object(fes__WEBPACK_IMPORTED_MODULE_2__[/* assignOver */ "g"])({
    fields: []
  }), Object(fes__WEBPACK_IMPORTED_MODULE_2__[/* transformProperties */ "Z"])({
    fields: Object(fes__WEBPACK_IMPORTED_MODULE_2__[/* map */ "K"])(_normalize_field__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])
  })]);
} //
//---------//
// Exports //
//---------//


/* harmony default export */ __webpack_exports__["a"] = (databaseNameToDefinition);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "ws"
var external_ws_ = __webpack_require__(22);
var external_ws_default = /*#__PURE__*/__webpack_require__.n(external_ws_);

// EXTERNAL MODULE: ./lib/server/log/index.js + 2 modules
var log = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/fes/index.js + 199 modules
var fes = __webpack_require__(0);

// EXTERNAL MODULE: ./config/debug.js
var debug = __webpack_require__(14);

// CONCATENATED MODULE: ./create/websocket-server/debug.js
//---------//
// Imports //
//---------//



 //
//------//
// Init //
//------//

const {
  websocketPort
} = debug["a" /* default */]; //
//------//
// Main //
//------//

const createWebsocketServer = () => {
  const server = new external_ws_default.a.Server({
    port: websocketPort
  });

  server.broadcast = data => {
    const sendData = Object(fes["f" /* applyAt */])('send', [data, handleBroadcastError]);
    Object(fes["Q" /* passThrough */])(server.clients, [Object(fes["E" /* keepWhen */])(isOpen), Object(fes["s" /* forEach */])(sendData)]);
  };

  server.on('connection', ws => {
    ws.on('error', handleConnectionError);
  });
  return server;
}; //
//------------------//
// Helper Functions //
//------------------//


function handleBroadcastError(error) {
  if (!error) return;
  log["a" /* default */].server.error('occurred when attempting to broadcast', error);
}

function handleConnectionError(error) {
  log["a" /* default */].server.error('occurred with the connection to a client', error);
}

function isOpen(client) {
  return client.readyState === external_ws_default.a.OPEN;
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var websocket_server_debug = (createWebsocketServer);
// EXTERNAL MODULE: external "http"
var external_http_ = __webpack_require__(54);
var external_http_default = /*#__PURE__*/__webpack_require__.n(external_http_);

// EXTERNAL MODULE: ./config/app.js
var app = __webpack_require__(5);

// EXTERNAL MODULE: ./lib/universal/utils.js + 9 modules
var utils = __webpack_require__(2);

// CONCATENATED MODULE: ./create/websocket-server/live-update.js
//
// TODO: implement connection limit
// TODO: implement connection verification
// TODO: validate playerHash & roomHash pair
//
//---------//
// Imports //
//---------//




 //
//------//
// Init //
//------//

const playerHashToClientSockets = {},
      clientSocketToPlayerHash = new Map(); //
//------//
// Main //
//------//

const live_update_createWebsocketServer = () => {
  const server = external_http_default.a.createServer();
  const websocketServer = new external_ws_default.a.Server({
    server
  });
  websocketServer.on('connection', ws => {
    ws.isAlive = true;
    ws.on('pong', keepAlive);
    ws.on('error', handleErrorEvent);
    ws.on('close', () => {
      const playerHash = clientSocketToPlayerHash.get(ws),
            clientSockets = playerHashToClientSockets[playerHash];
      clientSocketToPlayerHash.delete(ws);

      if (clientSockets) {
        clientSockets.delete(ws);
        if (Object(fes["A" /* isEmpty */])(clientSockets)) delete playerHashToClientSockets[playerHash];
      }
    });
    ws.on('message', messageData => {
      if (messageData === 'ping') {
        ws.send('pong');
        return;
      }

      const {
        id,
        data
      } = JSON.parse(messageData);

      if (id === 'initial-connection') {
        const {
          playerHash,
          _unused_roomHash
        } = data;
        let clientSockets = playerHashToClientSockets[playerHash];

        if (!clientSockets) {
          clientSockets = playerHashToClientSockets[playerHash] = new Set();
        }

        clientSockets.add(ws);
        clientSocketToPlayerHash.set(ws, playerHash);
      }
    });
  });
  setInterval(pruneDeadConnections, 30000);
  server.listen(app["c" /* liveUpdateWebsocket */].port);
  return {
    maybeUpdateClient,
    server: websocketServer
  };
}; //
//------------------//
// Helper Functions //
//------------------//


function keepAlive() {
  this.isAlive = true;
}

function maybeUpdateClient({
  data,
  playerHash
}) {
  const clientSockets = playerHashToClientSockets[playerHash];
  if (!clientSockets) return;
  Object(fes["s" /* forEach */])(ws => {
    ws.send(JSON.stringify(data), handleSendError);
  })(clientSockets);
}

function handleSendError(error) {
  if (!error) return;
  Object(utils["n" /* logErrorToServer */])({
    context: 'while sending liveUpdate data',
    error
  });
}

function pruneDeadConnections() {
  Object(fes["s" /* forEach */])((clientSockets, playerHash) => {
    Object(fes["s" /* forEach */])(ws => {
      if (!ws.isAlive) {
        clientSockets.delete(ws);
        clientSocketToPlayerHash.delete(ws);
        ws.terminate();
      }

      ws.isAlive = false;
      ws.ping(utils["q" /* noop */]);
    })(clientSockets);

    if (Object(fes["A" /* isEmpty */])(clientSockets)) {
      delete playerHashToClientSockets[playerHash];
    }
  })(playerHashToClientSockets);
}

function handleErrorEvent(error) {
  Object(utils["n" /* logErrorToServer */])({
    context: 'in error event of liveUpdate websocket',
    error
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var live_update = (live_update_createWebsocketServer);
// CONCATENATED MODULE: ./create/websocket-server/index.js


/* harmony default export */ var websocket_server = __webpack_exports__["a"] = ({
  debug: websocket_server_debug,
  liveUpdate: live_update
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "tedent"
var external_tedent_ = __webpack_require__(3);
var external_tedent_default = /*#__PURE__*/__webpack_require__.n(external_tedent_);

// EXTERNAL MODULE: ./lib/universal/set-of-understands-keys.js
var set_of_understands_keys = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/fes/index.js + 199 modules
var fes = __webpack_require__(0);

// EXTERNAL MODULE: ./lib/universal/utils.js + 9 modules
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./lib/universal/email/types.js
var types = __webpack_require__(12);

// CONCATENATED MODULE: ./lib/universal/set-of-valid-words.js
//
// this the '2of12inf' word list downloaded from here:
//   http://wordlist.aspell.net/12dicts/
//
// version 6.0.2
//
/* harmony default export */ var set_of_valid_words = (new Set(['a', 'abaci', 'aback', 'abaft', 'abase', 'abash', 'abate', 'abbe', 'abbes', 'abbey', 'abbot', 'abeam', 'abed', 'abet', 'abets', 'abhor', 'abide', 'able', 'abler', 'ably', 'abode', 'abort', 'about', 'above', 'abs', 'abuse', 'abut', 'abuts', 'abuzz', 'abyss', 'ace', 'aced', 'aces', 'ache', 'ached', 'aches', 'achoo', 'achy', 'acid', 'acids', 'acing', 'acme', 'acmes', 'acne', 'acnes', 'acorn', 'acre', 'acres', 'acrid', 'act', 'acted', 'actor', 'acts', 'acute', 'ad', 'adage', 'adapt', 'add', 'added', 'adder', 'addle', 'adds', 'adept', 'adieu', 'adios', 'adman', 'admen', 'admit', 'admix', 'ado', 'adobe', 'adopt', 'adore', 'adorn', 'ados', 'ads', 'adult', 'adz', 'adze', 'adzes', 'aegis', 'aeon', 'aeons', 'aerie', 'aery', 'afar', 'affix', 'afire', 'afoot', 'afoul', 'aft', 'after', 'again', 'agape', 'agar', 'agars', 'agate', 'agave', 'age', 'aged', 'agent', 'ages', 'agile', 'aging', 'aglow', 'ago', 'agog', 'agony', 'agree', 'ague', 'agues', 'ah', 'aha', 'ahead', 'ahem', 'ahoy', 'aid', 'aide', 'aided', 'aides', 'aids', 'ail', 'ailed', 'ails', 'aim', 'aimed', 'aims', 'air', 'aired', 'airs', 'airy', 'aisle', 'aitch', 'ajar', 'akin', 'alack', 'alarm', 'alas', 'alb', 'albs', 'album', 'alder', 'ale', 'alert', 'ales', 'alga', 'algae', 'algal', 'alias', 'alibi', 'alien', 'align', 'alike', 'aline', 'alit', 'alive', 'alkyd', 'all', 'allay', 'alley', 'allot', 'allow', 'alloy', 'alls', 'ally', 'alms', 'aloe', 'aloes', 'aloft', 'aloha', 'alone', 'along', 'aloof', 'aloud', 'alp', 'alpha', 'alps', 'also', 'altar', 'alter', 'altho', 'alto', 'altos', 'alum', 'alums', 'am', 'amass', 'amaze', 'amber', 'amble', 'ameba', 'amen', 'amend', 'amid', 'amide', 'amigo', 'amir', 'amirs', 'amiss', 'amity', 'ammo', 'ammos', 'amnia', 'amok', 'among', 'amour', 'amp', 'ample', 'amply', 'amps', 'ampul', 'amuck', 'amuse', 'an', 'anal', 'and', 'anent', 'anew', 'angel', 'anger', 'angle', 'angry', 'angst', 'ani', 'anime', 'anion', 'anise', 'ankh', 'ankhs', 'ankle', 'annex', 'annoy', 'annul', 'anode', 'anon', 'ant', 'ante', 'anted', 'antes', 'anti', 'antic', 'antis', 'ants', 'antsy', 'anus', 'anvil', 'any', 'aorta', 'apace', 'apart', 'ape', 'aped', 'apes', 'apex', 'aphid', 'aping', 'apish', 'app', 'appal', 'apple', 'apply', 'apps', 'apron', 'apse', 'apses', 'apt', 'apter', 'aptly', 'aqua', 'aquae', 'aquas', 'arbor', 'arc', 'arced', 'arch', 'arcs', 'ardor', 'are', 'area', 'areal', 'areas', 'arena', 'ares', 'argon', 'argot', 'argue', 'aria', 'arias', 'arid', 'arise', 'ark', 'arks', 'arm', 'armed', 'armor', 'arms', 'army', 'aroma', 'arose', 'arras', 'array', 'arrow', 'arson', 'art', 'arts', 'artsy', 'arty', 'arum', 'arums', 'as', 'ascot', 'ash', 'ashen', 'ashes', 'ashy', 'aside', 'ask', 'asked', 'askew', 'asks', 'asp', 'aspen', 'aspic', 'asps', 'ass', 'assay', 'asses', 'asset', 'aster', 'astir', 'at', 'ate', 'atilt', 'atlas', 'atoll', 'atom', 'atoms', 'atone', 'atop', 'atria', 'attar', 'attic', 'audio', 'audit', 'auger', 'aught', 'augur', 'auk', 'auks', 'aunt', 'aunts', 'aunty', 'aura', 'aurae', 'aural', 'auras', 'auto', 'autos', 'auxin', 'avail', 'avast', 'aver', 'avers', 'avert', 'avian', 'avid', 'avoid', 'avow', 'avows', 'aw', 'await', 'awake', 'award', 'aware', 'awash', 'away', 'awe', 'awed', 'awes', 'awful', 'awing', 'awl', 'awls', 'awn', 'awns', 'awoke', 'awol', 'awry', 'ax', 'axe', 'axed', 'axes', 'axial', 'axing', 'axiom', 'axis', 'axle', 'axles', 'axon', 'axons', 'ay', 'ayah', 'ayahs', 'aye', 'ayes', 'azure', 'baa', 'baaed', 'baas', 'babe', 'babel', 'babes', 'baby', 'back', 'backs', 'bacon', 'bad', 'baddy', 'bade', 'badge', 'badly', 'bads', 'bag', 'bagel', 'baggy', 'bags', 'bah', 'baht', 'bahts', 'bail', 'bails', 'bairn', 'bait', 'baits', 'baize', 'bake', 'baked', 'baker', 'bakes', 'bald', 'balds', 'bale', 'baled', 'baler', 'bales', 'balk', 'balks', 'balky', 'ball', 'balls', 'balm', 'balms', 'balmy', 'balsa', 'ban', 'banal', 'band', 'bands', 'bandy', 'bane', 'banes', 'bang', 'bangs', 'bani', 'banjo', 'bank', 'banks', 'banns', 'bans', 'bar', 'barb', 'barbs', 'bard', 'bards', 'bare', 'bared', 'barer', 'bares', 'barf', 'barfs', 'barge', 'bark', 'barks', 'barn', 'barns', 'baron', 'barre', 'bars', 'basal', 'base', 'based', 'baser', 'bases', 'bash', 'basic', 'basil', 'basin', 'basis', 'bask', 'basks', 'bass', 'bassi', 'basso', 'bast', 'baste', 'basts', 'bat', 'batch', 'bate', 'bated', 'bates', 'bath', 'bathe', 'baths', 'batik', 'baton', 'bats', 'batty', 'baud', 'bauds', 'baulk', 'bawd', 'bawds', 'bawdy', 'bawl', 'bawls', 'bay', 'bayed', 'bayou', 'bays', 'be', 'beach', 'bead', 'beads', 'beady', 'beak', 'beaks', 'beam', 'beams', 'bean', 'beans', 'bear', 'beard', 'bears', 'beast', 'beat', 'beats', 'beau', 'beaus', 'beaut', 'beaux', 'bebop', 'beck', 'becks', 'bed', 'bedim', 'beds', 'bee', 'beech', 'beef', 'beefs', 'beefy', 'been', 'beep', 'beeps', 'beer', 'beers', 'beery', 'bees', 'beet', 'beets', 'befit', 'befog', 'beg', 'began', 'begat', 'beget', 'begin', 'begot', 'begs', 'begum', 'begun', 'beige', 'being', 'belay', 'belch', 'belie', 'bell', 'belle', 'bells', 'belly', 'below', 'belt', 'belts', 'bench', 'bend', 'bends', 'bent', 'bents', 'beret', 'berg', 'bergs', 'berm', 'berms', 'berry', 'berth', 'beryl', 'beset', 'besom', 'besot', 'best', 'bests', 'bet', 'beta', 'betas', 'betel', 'bets', 'bevel', 'bevy', 'bey', 'beys', 'bezel', 'bi', 'bias', 'bib', 'bible', 'bibs', 'bicep', 'bid', 'biddy', 'bide', 'bided', 'bides', 'bidet', 'bids', 'bier', 'biers', 'big', 'bight', 'bigot', 'bijou', 'bike', 'biked', 'biker', 'bikes', 'bile', 'biles', 'bilge', 'bilk', 'bilks', 'bill', 'bills', 'billy', 'bimbo', 'bin', 'bind', 'binds', 'binge', 'bingo', 'bins', 'bio', 'bios', 'biped', 'birch', 'bird', 'birds', 'birth', 'bis', 'bison', 'bit', 'bitch', 'bite', 'biter', 'bites', 'bits', 'bitty', 'biz', 'blab', 'blabs', 'black', 'blade', 'blah', 'blahs', 'blame', 'bland', 'blank', 'blare', 'blase', 'blast', 'blaze', 'bleak', 'blear', 'bleat', 'bled', 'bleed', 'bleep', 'blend', 'blent', 'bless', 'blest', 'blew', 'blimp', 'blind', 'bling', 'blini', 'blink', 'blip', 'blips', 'bliss', 'blitz', 'bloat', 'blob', 'blobs', 'bloc', 'block', 'blocs', 'blog', 'blogs', 'bloke', 'blond', 'blood', 'bloom', 'bloop', 'blot', 'blots', 'blow', 'blown', 'blows', 'blowy', 'blue', 'blued', 'bluer', 'blues', 'bluet', 'bluff', 'blunt', 'blur', 'blurb', 'blurs', 'blurt', 'blush', 'boa', 'boar', 'board', 'boars', 'boas', 'boast', 'boat', 'boats', 'bob', 'bobby', 'bobs', 'bocce', 'bocci', 'bock', 'bocks', 'bod', 'bode', 'boded', 'bodes', 'bods', 'body', 'boffo', 'bog', 'bogey', 'boggy', 'bogie', 'bogs', 'bogus', 'bogy', 'boil', 'boils', 'bola', 'bolas', 'bold', 'bole', 'boles', 'boll', 'bolls', 'bolt', 'bolts', 'bolus', 'bomb', 'bombs', 'bond', 'bonds', 'bone', 'boned', 'boner', 'bones', 'boney', 'bong', 'bongo', 'bongs', 'bonny', 'bonus', 'bony', 'boo', 'boob', 'boobs', 'booby', 'booed', 'book', 'books', 'boom', 'booms', 'boon', 'boons', 'boor', 'boors', 'boos', 'boost', 'boot', 'booth', 'boots', 'booty', 'booze', 'boozy', 'bop', 'bops', 'borax', 'bore', 'bored', 'borer', 'bores', 'born', 'borne', 'boron', 'bosh', 'bosom', 'boss', 'bossy', 'bosun', 'botch', 'both', 'bough', 'bound', 'bout', 'bouts', 'bow', 'bowed', 'bowel', 'bower', 'bowl', 'bowls', 'bows', 'box', 'boxed', 'boxer', 'boxes', 'boxy', 'boy', 'boys', 'bozo', 'bozos', 'bra', 'brace', 'bract', 'brad', 'brads', 'brae', 'braes', 'brag', 'brags', 'braid', 'brain', 'brake', 'bran', 'brand', 'brans', 'bras', 'brash', 'brass', 'brat', 'brats', 'brave', 'bravo', 'brawl', 'brawn', 'bray', 'brays', 'braze', 'bread', 'break', 'bream', 'bred', 'breed', 'breve', 'brew', 'brews', 'briar', 'bribe', 'brick', 'bride', 'brie', 'brief', 'brier', 'bries', 'brig', 'brigs', 'brim', 'brims', 'brine', 'bring', 'brink', 'briny', 'brisk', 'bro', 'broad', 'broil', 'broke', 'bronc', 'brood', 'brook', 'broom', 'bros', 'broth', 'brow', 'brown', 'brows', 'brr', 'bruin', 'bruit', 'brunt', 'brush', 'brusk', 'brute', 'bub', 'bubo', 'bubs', 'buck', 'bucks', 'bud', 'buddy', 'budge', 'buds', 'buff', 'buffs', 'bug', 'buggy', 'bugle', 'bugs', 'build', 'built', 'bulb', 'bulbs', 'bulge', 'bulgy', 'bulk', 'bulks', 'bulky', 'bull', 'bulls', 'bully', 'bum', 'bump', 'bumps', 'bumpy', 'bums', 'bun', 'bunch', 'bunco', 'bung', 'bungs', 'bunk', 'bunko', 'bunks', 'bunny', 'buns', 'bunt', 'bunts', 'buoy', 'buoys', 'bur', 'burbs', 'burg', 'burgh', 'burgs', 'burka', 'burl', 'burls', 'burly', 'burn', 'burns', 'burnt', 'burp', 'burps', 'burqa', 'burr', 'burro', 'burrs', 'burs', 'bursa', 'burst', 'bury', 'bus', 'busby', 'bused', 'buses', 'bush', 'bushy', 'buss', 'bust', 'busts', 'busty', 'busy', 'but', 'butch', 'buts', 'butt', 'butte', 'butts', 'buxom', 'buy', 'buyer', 'buys', 'buzz', 'by', 'bye', 'byes', 'bylaw', 'byte', 'bytes', 'byway', 'cab', 'cabal', 'cabby', 'cabin', 'cable', 'cabs', 'cacao', 'cache', 'cacti', 'cad', 'caddy', 'cadet', 'cadge', 'cadre', 'cads', 'cafe', 'cafes', 'cage', 'caged', 'cages', 'cagey', 'cagy', 'cairn', 'cake', 'caked', 'cakes', 'calf', 'calfs', 'calif', 'calk', 'calks', 'call', 'calla', 'calls', 'calm', 'calms', 'calve', 'calyx', 'cam', 'came', 'camel', 'cameo', 'camp', 'camps', 'campy', 'cams', 'can', 'canal', 'candy', 'cane', 'caned', 'caner', 'canes', 'canny', 'canoe', 'canon', 'cans', 'canst', 'cant', 'canto', 'cants', 'cap', 'cape', 'caped', 'caper', 'capes', 'capo', 'capon', 'capos', 'caps', 'car', 'carat', 'carbs', 'card', 'cards', 'care', 'cared', 'carer', 'cares', 'caret', 'cargo', 'carny', 'carob', 'carol', 'carom', 'carp', 'carpi', 'carps', 'carry', 'cars', 'cart', 'carts', 'carve', 'case', 'cased', 'cases', 'cash', 'cask', 'casks', 'cast', 'caste', 'casts', 'cat', 'catch', 'cater', 'cats', 'catty', 'caulk', 'cause', 'cave', 'caved', 'caves', 'cavil', 'caw', 'cawed', 'caws', 'cay', 'cays', 'cease', 'ceca', 'cecal', 'cecum', 'cedar', 'cede', 'ceded', 'ceder', 'cedes', 'cell', 'celli', 'cello', 'cells', 'cent', 'cents', 'chafe', 'chaff', 'chain', 'chair', 'chalk', 'champ', 'chant', 'chaos', 'chap', 'chaps', 'chapt', 'char', 'chard', 'charm', 'chars', 'chart', 'chary', 'chase', 'chasm', 'chat', 'chats', 'cheap', 'cheat', 'check', 'cheek', 'cheep', 'cheer', 'chef', 'chefs', 'chemo', 'chert', 'chess', 'chest', 'chew', 'chews', 'chewy', 'chi', 'chic', 'chick', 'chics', 'chid', 'chide', 'chief', 'child', 'chile', 'chili', 'chill', 'chime', 'chimp', 'chin', 'china', 'chine', 'chink', 'chino', 'chins', 'chip', 'chips', 'chirp', 'chis', 'chit', 'chits', 'chive', 'chock', 'choir', 'choke', 'chomp', 'chop', 'chops', 'chord', 'chore', 'chose', 'chow', 'chows', 'chub', 'chubs', 'chuck', 'chug', 'chugs', 'chum', 'chump', 'chums', 'chunk', 'churl', 'churn', 'chute', 'chyme', 'ciao', 'cider', 'cigar', 'cilia', 'cinch', 'circa', 'cirri', 'cite', 'cited', 'cites', 'city', 'civet', 'civic', 'civil', 'clack', 'clad', 'claim', 'clam', 'clamp', 'clams', 'clan', 'clang', 'clank', 'clans', 'clap', 'claps', 'clash', 'clasp', 'class', 'claw', 'claws', 'clay', 'clays', 'clean', 'clear', 'cleat', 'clef', 'clefs', 'cleft', 'clerk', 'clew', 'clews', 'click', 'cliff', 'climb', 'clime', 'cling', 'clink', 'clip', 'clips', 'clipt', 'clit', 'clits', 'cloak', 'clock', 'clod', 'clods', 'clog', 'clogs', 'clomp', 'clone', 'clonk', 'clop', 'clops', 'close', 'clot', 'cloth', 'clots', 'cloud', 'clout', 'clove', 'clown', 'cloy', 'cloys', 'club', 'clubs', 'cluck', 'clue', 'clued', 'clues', 'clump', 'clung', 'clunk', 'coach', 'coal', 'coals', 'coast', 'coat', 'coats', 'coax', 'cob', 'cobra', 'cobs', 'coca', 'cocas', 'cocci', 'cock', 'cocks', 'cocky', 'coco', 'cocoa', 'cocos', 'cod', 'coda', 'codas', 'code', 'coded', 'coder', 'codes', 'codex', 'cods', 'coed', 'coeds', 'cog', 'cogs', 'coho', 'cohos', 'coif', 'coifs', 'coil', 'coils', 'coin', 'coins', 'coke', 'coked', 'cokes', 'cola', 'colas', 'cold', 'colds', 'colic', 'colon', 'color', 'colt', 'colts', 'coma', 'comas', 'comb', 'combo', 'combs', 'come', 'comer', 'comes', 'comet', 'comfy', 'comic', 'comma', 'comp', 'comps', 'con', 'conch', 'condo', 'cone', 'cones', 'coney', 'conga', 'conic', 'conk', 'conks', 'cons', 'cony', 'coo', 'cooed', 'cook', 'cooks', 'cooky', 'cool', 'cools', 'coon', 'coons', 'coop', 'coops', 'coos', 'coot', 'coots', 'cop', 'copay', 'cope', 'coped', 'copes', 'copra', 'cops', 'copse', 'copy', 'coral', 'cord', 'cords', 'core', 'cored', 'corer', 'cores', 'corgi', 'cork', 'corks', 'corm', 'corms', 'corn', 'corns', 'corny', 'corps', 'cos', 'coses', 'cost', 'costs', 'cosy', 'cot', 'cote', 'cotes', 'cots', 'couch', 'cough', 'could', 'count', 'coup', 'coupe', 'coups', 'court', 'cove', 'coven', 'cover', 'coves', 'covet', 'covey', 'cow', 'cowed', 'cower', 'cowl', 'cowls', 'cows', 'coy', 'coyer', 'coyly', 'coypu', 'cozen', 'cozy', 'crab', 'crabs', 'crack', 'craft', 'crag', 'crags', 'cram', 'cramp', 'crams', 'crane', 'crank', 'crap', 'crape', 'craps', 'crash', 'crass', 'crate', 'crave', 'craw', 'crawl', 'craws', 'craze', 'crazy', 'creak', 'cream', 'credo', 'creed', 'creek', 'creel', 'creep', 'creme', 'crepe', 'crept', 'cress', 'crest', 'crew', 'crews', 'crib', 'cribs', 'crick', 'cried', 'crier', 'cries', 'crime', 'crimp', 'crisp', 'croak', 'croci', 'crock', 'crone', 'crony', 'crook', 'croon', 'crop', 'crops', 'cross', 'croup', 'crow', 'crowd', 'crown', 'crows', 'crud', 'crude', 'cruds', 'cruel', 'cruet', 'crumb', 'cruse', 'crush', 'crust', 'crux', 'cry', 'crypt', 'cub', 'cube', 'cubed', 'cuber', 'cubes', 'cubic', 'cubit', 'cubs', 'cud', 'cuds', 'cue', 'cued', 'cues', 'cuff', 'cuffs', 'cuing', 'cull', 'culls', 'cult', 'cults', 'cum', 'cumin', 'cums', 'cunt', 'cunts', 'cup', 'cupid', 'cups', 'cur', 'curb', 'curbs', 'curd', 'curds', 'cure', 'cured', 'curer', 'cures', 'curia', 'curie', 'curio', 'curl', 'curls', 'curly', 'curry', 'curs', 'curse', 'curst', 'curt', 'curve', 'curvy', 'cushy', 'cusp', 'cusps', 'cuss', 'cut', 'cute', 'cuter', 'cutie', 'cuts', 'cutup', 'cyan', 'cyans', 'cycle', 'cyder', 'cynic', 'cyst', 'cysts', 'czar', 'czars', 'dab', 'dabs', 'dace', 'daces', 'dacha', 'dad', 'daddy', 'dado', 'dados', 'dads', 'daffy', 'daft', 'daily', 'dairy', 'dais', 'daisy', 'dale', 'dales', 'dally', 'dam', 'dame', 'dames', 'damn', 'damns', 'damp', 'damps', 'dams', 'dance', 'dandy', 'dang', 'dangs', 'dank', 'dare', 'dared', 'darer', 'dares', 'dark', 'darks', 'darn', 'darns', 'dart', 'darts', 'dash', 'data', 'date', 'dated', 'dater', 'dates', 'datum', 'daub', 'daubs', 'daunt', 'davit', 'dawn', 'dawns', 'day', 'days', 'daze', 'dazed', 'dazes', 'dead', 'deaf', 'deal', 'deals', 'dealt', 'dean', 'deans', 'dear', 'dears', 'deary', 'death', 'deb', 'debar', 'debit', 'debs', 'debt', 'debts', 'debug', 'debut', 'decaf', 'decal', 'decay', 'deck', 'decks', 'decor', 'decoy', 'decry', 'deed', 'deeds', 'deem', 'deems', 'deep', 'deeps', 'deer', 'deers', 'def', 'defer', 'defog', 'deft', 'defy', 'degas', 'deice', 'deify', 'deign', 'deism', 'deist', 'deity', 'delay', 'delft', 'deli', 'delis', 'dell', 'dells', 'delta', 'delve', 'demo', 'demon', 'demos', 'demur', 'den', 'denim', 'dens', 'dense', 'dent', 'dents', 'deny', 'depot', 'depth', 'derby', 'desk', 'desks', 'deter', 'detox', 'deuce', 'devil', 'dew', 'dews', 'dewy', 'dhoti', 'dhow', 'dhows', 'dial', 'dials', 'diary', 'dibs', 'dice', 'diced', 'dices', 'dicey', 'dick', 'dicks', 'dicky', 'dicta', 'did', 'dido', 'didos', 'didst', 'die', 'died', 'dies', 'diet', 'diets', 'dig', 'digit', 'digs', 'dike', 'diked', 'dikes', 'dill', 'dills', 'dilly', 'dim', 'dime', 'dimes', 'dimly', 'dims', 'din', 'dinar', 'dine', 'dined', 'diner', 'dines', 'ding', 'dingo', 'dings', 'dingy', 'dinky', 'dins', 'dint', 'dints', 'diode', 'dip', 'dippy', 'dips', 'dire', 'direr', 'dirge', 'dirk', 'dirks', 'dirt', 'dirts', 'dirty', 'dis', 'disc', 'disco', 'discs', 'dish', 'disk', 'disks', 'diss', 'ditch', 'ditsy', 'ditto', 'ditty', 'ditz', 'ditzy', 'diva', 'divan', 'divas', 'dive', 'dived', 'diver', 'dives', 'divot', 'divvy', 'dizzy', 'djinn', 'do', 'doc', 'dock', 'docks', 'docs', 'dodge', 'dodo', 'dodos', 'doe', 'doer', 'doers', 'does', 'doff', 'doffs', 'dog', 'doge', 'doges', 'doggy', 'dogie', 'dogma', 'dogs', 'dogy', 'doh', 'dohs', 'doily', 'doing', 'dole', 'doled', 'doles', 'doll', 'dolls', 'dolly', 'dolor', 'dolt', 'dolts', 'dome', 'domed', 'domes', 'don', 'dona', 'donas', 'done', 'dong', 'dongs', 'donor', 'dons', 'donut', 'doom', 'dooms', 'door', 'doors', 'dopa', 'dopas', 'dope', 'doped', 'doper', 'dopes', 'dopey', 'dopy', 'dork', 'dorks', 'dorky', 'dorm', 'dorms', 'dory', 'dos', 'dose', 'dosed', 'doses', 'dost', 'dot', 'dote', 'doted', 'doter', 'dotes', 'doth', 'dots', 'dotty', 'doubt', 'dough', 'dour', 'douse', 'dove', 'doves', 'dowdy', 'dowel', 'dower', 'down', 'downs', 'downy', 'dowry', 'dowse', 'doyen', 'doze', 'dozed', 'dozen', 'dozes', 'drab', 'drabs', 'draft', 'drag', 'drags', 'drain', 'drake', 'dram', 'drama', 'drams', 'drank', 'drape', 'drat', 'draw', 'drawl', 'drawn', 'draws', 'dray', 'drays', 'dread', 'dream', 'drear', 'dregs', 'dress', 'drest', 'drew', 'dried', 'drier', 'dries', 'drift', 'drill', 'drily', 'drink', 'drip', 'drips', 'dript', 'drive', 'droll', 'drone', 'drool', 'droop', 'drop', 'drops', 'dross', 'drove', 'drown', 'drub', 'drubs', 'drug', 'drugs', 'druid', 'drum', 'drums', 'drunk', 'drupe', 'dry', 'dryad', 'dryer', 'dryly', 'drys', 'dual', 'dub', 'dubs', 'ducal', 'ducat', 'duchy', 'duck', 'ducks', 'ducky', 'duct', 'ducts', 'dud', 'dude', 'duded', 'dudes', 'duds', 'due', 'duel', 'duels', 'dues', 'duet', 'duets', 'duff', 'duffs', 'dug', 'duh', 'duke', 'dukes', 'dull', 'dulls', 'dully', 'duly', 'dumb', 'dummy', 'dump', 'dumps', 'dumpy', 'dun', 'dunce', 'dune', 'dunes', 'dung', 'dungs', 'dunk', 'dunks', 'dunno', 'duns', 'duo', 'duos', 'dupe', 'duped', 'duper', 'dupes', 'duple', 'durst', 'durum', 'dusk', 'dusks', 'dusky', 'dust', 'dusts', 'dusty', 'dutch', 'duty', 'duvet', 'dwarf', 'dweeb', 'dwell', 'dwelt', 'dye', 'dyed', 'dyer', 'dyers', 'dyes', 'dying', 'dyke', 'dykes', 'each', 'eager', 'eagle', 'ear', 'eared', 'earl', 'earls', 'early', 'earn', 'earns', 'ears', 'earth', 'ease', 'eased', 'easel', 'eases', 'east', 'easts', 'easy', 'eat', 'eaten', 'eater', 'eats', 'eave', 'eaves', 'ebb', 'ebbed', 'ebbs', 'ebony', 'echo', 'echos', 'eclat', 'ecru', 'ecrus', 'ed', 'eddy', 'edema', 'edge', 'edged', 'edger', 'edges', 'edgy', 'edict', 'edify', 'edit', 'edits', 'eds', 'educe', 'eek', 'eel', 'eels', 'eerie', 'eery', 'egad', 'egg', 'egged', 'eggs', 'egis', 'ego', 'egos', 'egret', 'eh', 'eider', 'eight', 'eject', 'eke', 'eked', 'ekes', 'eking', 'elan', 'eland', 'elans', 'elate', 'elbow', 'elder', 'elect', 'elegy', 'elf', 'elfin', 'elide', 'elite', 'elk', 'elks', 'ell', 'ells', 'elm', 'elms', 'elope', 'else', 'elude', 'elver', 'elves', 'em', 'email', 'embed', 'ember', 'emcee', 'emend', 'emery', 'emir', 'emirs', 'emit', 'emits', 'emo', 'emoji', 'emos', 'emote', 'empty', 'ems', 'emu', 'emus', 'en', 'enact', 'end', 'ended', 'endow', 'ends', 'endue', 'enema', 'enemy', 'enjoy', 'ennui', 'enrol', 'ens', 'ensue', 'enter', 'entry', 'enure', 'envoy', 'envy', 'eon', 'eons', 'epee', 'epees', 'epic', 'epics', 'epoch', 'epoxy', 'equal', 'equip', 'era', 'eras', 'erase', 'ere', 'erect', 'erg', 'ergo', 'ergot', 'ergs', 'erode', 'err', 'erred', 'error', 'errs', 'erst', 'eruct', 'erupt', 'espy', 'essay', 'ester', 'eta', 'etas', 'etch', 'ether', 'ethic', 'ethos', 'ethyl', 'etude', 'euro', 'euros', 'evade', 'eve', 'even', 'evens', 'event', 'ever', 'every', 'eves', 'evict', 'evil', 'evils', 'evoke', 'ewe', 'ewer', 'ewers', 'ewes', 'ex', 'exact', 'exalt', 'exam', 'exams', 'excel', 'exec', 'execs', 'exert', 'exes', 'exile', 'exist', 'exit', 'exits', 'expel', 'expo', 'expos', 'extol', 'extra', 'exude', 'exult', 'exurb', 'eye', 'eyed', 'eyes', 'eying', 'eyrie', 'eyry', 'fa', 'fable', 'face', 'faced', 'faces', 'facet', 'fact', 'facts', 'fad', 'fade', 'faded', 'fades', 'fads', 'faery', 'fag', 'fagot', 'fags', 'fail', 'fails', 'fain', 'faint', 'fair', 'fairs', 'fairy', 'faith', 'fake', 'faked', 'faker', 'fakes', 'fakir', 'fall', 'falls', 'false', 'fame', 'famed', 'fames', 'fan', 'fancy', 'fang', 'fangs', 'fanny', 'fans', 'far', 'farad', 'farce', 'fare', 'fared', 'fares', 'farm', 'farms', 'faro', 'faros', 'fart', 'farts', 'fas', 'fast', 'fasts', 'fat', 'fatal', 'fate', 'fated', 'fates', 'fats', 'fatty', 'fatwa', 'fault', 'faun', 'fauna', 'fauns', 'favor', 'fawn', 'fawns', 'fax', 'faxed', 'faxes', 'fay', 'fayer', 'fays', 'faze', 'fazed', 'fazes', 'fear', 'fears', 'feast', 'feat', 'feats', 'fecal', 'feces', 'fed', 'feds', 'fee', 'feed', 'feeds', 'feel', 'feels', 'fees', 'feet', 'feign', 'feint', 'fell', 'fells', 'felon', 'felt', 'felts', 'femur', 'fen', 'fence', 'fend', 'fends', 'fens', 'feral', 'fern', 'ferns', 'ferny', 'ferry', 'fess', 'fest', 'fests', 'feta', 'fetal', 'fetas', 'fetch', 'fete', 'feted', 'fetes', 'fetid', 'fetus', 'feud', 'feuds', 'fever', 'few', 'fewer', 'fey', 'fez', 'fezes', 'fiat', 'fiats', 'fib', 'fiber', 'fibre', 'fibs', 'fiche', 'fichu', 'ficus', 'fie', 'fief', 'fiefs', 'field', 'fiend', 'fiery', 'fife', 'fifer', 'fifes', 'fifth', 'fifty', 'fig', 'fight', 'figs', 'filch', 'file', 'filed', 'filer', 'files', 'filet', 'fill', 'fills', 'filly', 'film', 'films', 'filmy', 'filth', 'fin', 'final', 'finch', 'find', 'finds', 'fine', 'fined', 'finer', 'fines', 'finis', 'fink', 'finks', 'finny', 'fins', 'fiord', 'fir', 'fire', 'fired', 'firer', 'fires', 'firm', 'firms', 'firs', 'first', 'firth', 'fish', 'fishy', 'fist', 'fists', 'fit', 'fitly', 'fits', 'five', 'fives', 'fix', 'fixed', 'fixer', 'fixes', 'fizz', 'fizzy', 'fjord', 'flab', 'flabs', 'flack', 'flag', 'flags', 'flail', 'flair', 'flak', 'flake', 'flaky', 'flame', 'flan', 'flank', 'flans', 'flap', 'flaps', 'flare', 'flash', 'flask', 'flat', 'flats', 'flaw', 'flaws', 'flax', 'flay', 'flays', 'flea', 'fleas', 'fleck', 'fled', 'flee', 'flees', 'fleet', 'flesh', 'flew', 'flex', 'flick', 'flied', 'flier', 'flies', 'fling', 'flint', 'flip', 'flips', 'flirt', 'flit', 'flits', 'float', 'flock', 'floe', 'floes', 'flog', 'flogs', 'flood', 'floor', 'flop', 'flops', 'flora', 'floss', 'flour', 'flout', 'flow', 'flown', 'flows', 'flu', 'flub', 'flubs', 'flue', 'flues', 'fluff', 'fluid', 'fluke', 'fluky', 'flume', 'flung', 'flunk', 'flus', 'flush', 'flute', 'flux', 'fly', 'flyby', 'flyer', 'foal', 'foals', 'foam', 'foams', 'foamy', 'fob', 'fobs', 'focal', 'foci', 'focus', 'foe', 'foes', 'fog', 'fogey', 'foggy', 'fogs', 'fogy', 'foil', 'foils', 'foist', 'fold', 'folds', 'folio', 'folk', 'folks', 'folly', 'fond', 'fondu', 'font', 'fonts', 'food', 'foods', 'fool', 'fools', 'foot', 'foots', 'fop', 'fops', 'for', 'fora', 'foray', 'force', 'ford', 'fords', 'fore', 'fores', 'forge', 'forgo', 'fork', 'forks', 'form', 'forms', 'fort', 'forte', 'forth', 'forts', 'forty', 'forum', 'foul', 'fouls', 'found', 'fount', 'four', 'fours', 'fowl', 'fowls', 'fox', 'foxed', 'foxes', 'foxy', 'foyer', 'frack', 'frail', 'frame', 'franc', 'frank', 'frat', 'frats', 'fraud', 'fray', 'frays', 'freak', 'free', 'freed', 'freer', 'frees', 'fresh', 'fret', 'frets', 'friar', 'fried', 'frier', 'fries', 'frig', 'frigs', 'frill', 'frisk', 'fritz', 'friz', 'frizz', 'fro', 'frock', 'frog', 'frogs', 'from', 'frond', 'front', 'frosh', 'frost', 'froth', 'frown', 'froze', 'fruit', 'frump', 'fry', 'fryer', 'fuck', 'fucks', 'fudge', 'fuel', 'fuels', 'fugal', 'fugue', 'full', 'fulls', 'fully', 'fume', 'fumed', 'fumes', 'fumy', 'fun', 'fund', 'funds', 'fungi', 'funk', 'funks', 'funky', 'funny', 'funs', 'fur', 'furl', 'furls', 'furor', 'furry', 'furs', 'fury', 'furze', 'fuse', 'fused', 'fusee', 'fuses', 'fuss', 'fussy', 'fusty', 'futon', 'futz', 'fuze', 'fuzed', 'fuzes', 'fuzz', 'fuzzy', 'gab', 'gabby', 'gable', 'gabs', 'gad', 'gads', 'gaff', 'gaffe', 'gaffs', 'gag', 'gaga', 'gage', 'gaged', 'gages', 'gags', 'gaily', 'gain', 'gains', 'gait', 'gaits', 'gal', 'gala', 'galas', 'gale', 'gales', 'gall', 'galls', 'gals', 'game', 'gamed', 'gamer', 'games', 'gamey', 'gamin', 'gamma', 'gamut', 'gamy', 'gang', 'gangs', 'gaol', 'gaols', 'gap', 'gape', 'gaped', 'gapes', 'gaps', 'gar', 'garb', 'garbs', 'gars', 'gas', 'gases', 'gash', 'gasp', 'gasps', 'gassy', 'gate', 'gated', 'gates', 'gator', 'gaudy', 'gauge', 'gaunt', 'gauze', 'gauzy', 'gave', 'gavel', 'gawk', 'gawks', 'gawky', 'gay', 'gayer', 'gayly', 'gays', 'gaze', 'gazed', 'gazer', 'gazes', 'gear', 'gears', 'gecko', 'gee', 'geed', 'geek', 'geeks', 'geeky', 'gees', 'geese', 'geez', 'gel', 'geld', 'gelds', 'gelid', 'gels', 'gelt', 'gem', 'gems', 'gene', 'genes', 'genie', 'genii', 'genre', 'gent', 'gents', 'genus', 'geode', 'germ', 'germs', 'get', 'gets', 'getup', 'ghat', 'ghats', 'ghost', 'ghoul', 'giant', 'gibe', 'gibed', 'gibes', 'giddy', 'gift', 'gifts', 'gig', 'gigs', 'gild', 'gilds', 'gill', 'gills', 'gilt', 'gilts', 'gimme', 'gimp', 'gimps', 'gimpy', 'gin', 'gins', 'gipsy', 'gird', 'girds', 'girl', 'girls', 'girly', 'girt', 'girth', 'girts', 'gismo', 'gist', 'gists', 'give', 'given', 'giver', 'gives', 'gizmo', 'glace', 'glad', 'glade', 'glads', 'gland', 'glans', 'glare', 'glass', 'glaze', 'gleam', 'glean', 'glee', 'glees', 'glen', 'glens', 'glib', 'glide', 'glint', 'glitz', 'gloat', 'glob', 'globe', 'globs', 'gloom', 'glop', 'glops', 'glory', 'gloss', 'glove', 'glow', 'glows', 'glue', 'glued', 'glues', 'gluey', 'glum', 'glut', 'gluts', 'gnarl', 'gnash', 'gnat', 'gnats', 'gnaw', 'gnawn', 'gnaws', 'gnome', 'gnu', 'gnus', 'go', 'goad', 'goads', 'goal', 'goals', 'goat', 'goats', 'gob', 'gobs', 'god', 'godly', 'gods', 'goer', 'goers', 'goes', 'gofer', 'going', 'gold', 'golds', 'golf', 'golfs', 'golly', 'gonad', 'gone', 'goner', 'gong', 'gongs', 'gonna', 'goo', 'good', 'goods', 'goody', 'gooey', 'goof', 'goofs', 'goofy', 'gook', 'gooks', 'goon', 'goons', 'goop', 'goops', 'goos', 'goose', 'gore', 'gored', 'gores', 'gorge', 'gorp', 'gorps', 'gorse', 'gory', 'gosh', 'got', 'gotta', 'gouge', 'gourd', 'gout', 'gouts', 'gouty', 'gown', 'gowns', 'grab', 'grabs', 'grace', 'grad', 'grade', 'grads', 'graft', 'grain', 'gram', 'grams', 'grand', 'grant', 'grape', 'graph', 'grasp', 'grass', 'grate', 'grave', 'gravy', 'gray', 'grays', 'graze', 'great', 'grebe', 'greed', 'green', 'greet', 'grew', 'grey', 'greys', 'grid', 'grids', 'grief', 'grill', 'grim', 'grime', 'grimy', 'grin', 'grind', 'grins', 'grip', 'gripe', 'grips', 'gript', 'grist', 'grit', 'grits', 'groan', 'groat', 'grog', 'grogs', 'groin', 'groom', 'grope', 'gross', 'group', 'grout', 'grove', 'grow', 'growl', 'grown', 'grows', 'grub', 'grubs', 'gruel', 'gruff', 'grump', 'grunt', 'guano', 'guard', 'guava', 'guess', 'guest', 'guff', 'guffs', 'guide', 'guild', 'guile', 'guilt', 'guise', 'gulag', 'gulch', 'gulf', 'gulfs', 'gull', 'gulls', 'gully', 'gulp', 'gulps', 'gum', 'gumbo', 'gummy', 'gums', 'gun', 'gunk', 'gunks', 'gunky', 'gunny', 'guns', 'guppy', 'guru', 'gurus', 'gush', 'gushy', 'gussy', 'gust', 'gusto', 'gusts', 'gusty', 'gut', 'guts', 'gutsy', 'gutty', 'guy', 'guyed', 'guys', 'gym', 'gyms', 'gyp', 'gyps', 'gypsy', 'gyro', 'gyros', 'gyve', 'gyved', 'gyves', 'ha', 'habit', 'hack', 'hacks', 'had', 'hadj', 'hadji', 'hadst', 'haft', 'hafts', 'hag', 'hags', 'hah', 'haiku', 'hail', 'hails', 'hair', 'hairs', 'hairy', 'hajj', 'hajji', 'hake', 'hakes', 'halal', 'hale', 'haled', 'haler', 'hales', 'half', 'hall', 'hallo', 'halls', 'halo', 'halos', 'halt', 'halts', 'halve', 'ham', 'hammy', 'hams', 'hand', 'hands', 'handy', 'hang', 'hangs', 'hank', 'hanks', 'hanky', 'hap', 'haply', 'happy', 'haps', 'hard', 'hardy', 'hare', 'hared', 'harem', 'hares', 'hark', 'harks', 'harm', 'harms', 'harp', 'harps', 'harpy', 'harry', 'harsh', 'hart', 'harts', 'has', 'hash', 'hasp', 'hasps', 'hast', 'haste', 'hasty', 'hat', 'hatch', 'hate', 'hated', 'hater', 'hates', 'hath', 'hats', 'haul', 'hauls', 'haunt', 'have', 'haven', 'haves', 'havoc', 'haw', 'hawed', 'hawk', 'hawks', 'haws', 'hay', 'hayed', 'hays', 'haze', 'hazed', 'hazel', 'hazer', 'hazes', 'hazy', 'he', 'head', 'heads', 'heady', 'heal', 'heals', 'heap', 'heaps', 'hear', 'heard', 'hears', 'heart', 'heat', 'heath', 'heats', 'heave', 'heavy', 'heck', 'hecks', 'hedge', 'heed', 'heeds', 'heel', 'heels', 'heft', 'hefts', 'hefty', 'heir', 'heirs', 'heist', 'held', 'helix', 'hell', 'hello', 'hells', 'helm', 'helms', 'helot', 'help', 'helps', 'helve', 'hem', 'heme', 'hemes', 'hemp', 'hemps', 'hems', 'hen', 'hence', 'henna', 'hens', 'hep', 'her', 'herb', 'herbs', 'herd', 'herds', 'here', 'heres', 'hero', 'heron', 'heros', 'hers', 'hertz', 'hes', 'hew', 'hewed', 'hewer', 'hewn', 'hews', 'hex', 'hexed', 'hexes', 'hey', 'hi', 'hick', 'hicks', 'hid', 'hide', 'hided', 'hider', 'hides', 'hie', 'hied', 'hies', 'high', 'highs', 'hike', 'hiked', 'hiker', 'hikes', 'hill', 'hills', 'hilly', 'hilt', 'hilts', 'him', 'hims', 'hind', 'hinds', 'hinge', 'hint', 'hints', 'hip', 'hippo', 'hippy', 'hips', 'hire', 'hired', 'hires', 'his', 'hiss', 'hist', 'hit', 'hitch', 'hits', 'hive', 'hived', 'hives', 'hmm', 'ho', 'hoagy', 'hoard', 'hoary', 'hoax', 'hob', 'hobby', 'hobo', 'hobos', 'hobs', 'hock', 'hocks', 'hod', 'hods', 'hoe', 'hoed', 'hoer', 'hoers', 'hoes', 'hog', 'hogan', 'hogs', 'hoist', 'hoke', 'hoked', 'hokes', 'hokey', 'hokum', 'hold', 'holds', 'hole', 'holed', 'holes', 'holey', 'holly', 'holy', 'home', 'homed', 'homer', 'homes', 'homey', 'homo', 'homos', 'homy', 'hon', 'hone', 'honed', 'honer', 'hones', 'honey', 'honk', 'honks', 'honky', 'honor', 'hons', 'hooch', 'hood', 'hoods', 'hooey', 'hoof', 'hoofs', 'hook', 'hooka', 'hooks', 'hooky', 'hoop', 'hoops', 'hoot', 'hoots', 'hop', 'hope', 'hoped', 'hopes', 'hops', 'hora', 'horas', 'horde', 'horn', 'horns', 'horny', 'horse', 'horsy', 'hos', 'hose', 'hosed', 'hoses', 'host', 'hosts', 'hot', 'hotel', 'hotly', 'hots', 'hound', 'hour', 'houri', 'hours', 'house', 'hove', 'hovel', 'hover', 'how', 'howdy', 'howl', 'howls', 'hows', 'hub', 'hubby', 'hubs', 'hue', 'hued', 'hues', 'huff', 'huffs', 'huffy', 'hug', 'huge', 'huger', 'hugs', 'huh', 'hula', 'hulas', 'hulk', 'hulks', 'hull', 'hullo', 'hulls', 'hum', 'human', 'humid', 'humor', 'hump', 'humph', 'humps', 'hums', 'humus', 'hunch', 'hung', 'hunk', 'hunks', 'hunky', 'hunt', 'hunts', 'hurl', 'hurls', 'hurry', 'hurt', 'hurts', 'hush', 'husk', 'husks', 'husky', 'hussy', 'hut', 'hutch', 'huts', 'huzza', 'hydra', 'hydro', 'hyena', 'hying', 'hymen', 'hymn', 'hymns', 'hype', 'hyped', 'hyper', 'hypes', 'hypo', 'hypos', 'i', 'iamb', 'iambi', 'iambs', 'ibex', 'ibis', 'ice', 'iced', 'ices', 'icier', 'icily', 'icing', 'icky', 'icon', 'icons', 'ictus', 'icy', 'id', 'idea', 'ideal', 'ideas', 'idem', 'ides', 'idiom', 'idiot', 'idle', 'idled', 'idler', 'idles', 'idly', 'idol', 'idols', 'ids', 'idyl', 'idyll', 'idyls', 'if', 'iffy', 'ifs', 'igloo', 'ikon', 'ikons', 'ilea', 'ileum', 'ilia', 'ilium', 'ilk', 'ilks', 'ill', 'ills', 'image', 'imago', 'imam', 'imams', 'imbed', 'imbue', 'imp', 'impel', 'imply', 'imps', 'in', 'inane', 'inapt', 'inbox', 'inch', 'incur', 'index', 'indue', 'inept', 'inert', 'infer', 'info', 'infos', 'infra', 'ingot', 'ink', 'inked', 'inks', 'inky', 'inlay', 'inlet', 'inn', 'inner', 'inns', 'input', 'ins', 'inset', 'inter', 'into', 'intro', 'inure', 'ion', 'ionic', 'ions', 'iota', 'iotas', 'irate', 'ire', 'ires', 'iris', 'irk', 'irked', 'irks', 'iron', 'irons', 'irony', 'is', 'isle', 'isles', 'islet', 'ism', 'isms', 'issue', 'it', 'itch', 'itchy', 'item', 'items', 'its', 'ivied', 'ivies', 'ivory', 'ivy', 'jab', 'jabot', 'jabs', 'jack', 'jacks', 'jade', 'jaded', 'jades', 'jag', 'jags', 'jail', 'jails', 'jam', 'jamb', 'jambs', 'jams', 'japan', 'jape', 'japed', 'japes', 'jar', 'jars', 'jato', 'jatos', 'jaunt', 'java', 'javas', 'jaw', 'jawed', 'jaws', 'jay', 'jays', 'jazz', 'jazzy', 'jean', 'jeans', 'jeep', 'jeeps', 'jeer', 'jeers', 'jeez', 'jehad', 'jell', 'jello', 'jells', 'jelly', 'jenny', 'jerk', 'jerks', 'jerky', 'jest', 'jests', 'jet', 'jets', 'jetty', 'jew', 'jewed', 'jewel', 'jews', 'jib', 'jibe', 'jibed', 'jibes', 'jibs', 'jiff', 'jiffs', 'jiffy', 'jig', 'jigs', 'jihad', 'jilt', 'jilts', 'jimmy', 'jinn', 'jinni', 'jinns', 'jinx', 'jive', 'jived', 'jives', 'job', 'jobs', 'jock', 'jocks', 'jog', 'jogs', 'john', 'johns', 'join', 'joins', 'joint', 'joist', 'joke', 'joked', 'joker', 'jokes', 'jokey', 'joky', 'jolly', 'jolt', 'jolts', 'josh', 'jot', 'jots', 'joule', 'joust', 'jowl', 'jowls', 'jowly', 'joy', 'joyed', 'joys', 'judge', 'judo', 'judos', 'jug', 'jugs', 'juice', 'juicy', 'julep', 'jumbo', 'jump', 'jumps', 'jumpy', 'junco', 'junk', 'junks', 'junky', 'junta', 'juror', 'jury', 'just', 'jut', 'jute', 'jutes', 'juts', 'kabob', 'kale', 'kales', 'kapok', 'kappa', 'kaput', 'karat', 'karma', 'kart', 'karts', 'kayak', 'kayo', 'kayos', 'kazoo', 'kebab', 'kebob', 'keel', 'keels', 'keen', 'keens', 'keep', 'keeps', 'keg', 'kegs', 'kelp', 'kelps', 'ken', 'keno', 'kenos', 'kens', 'kent', 'kepi', 'kepis', 'kept', 'kerb', 'kerbs', 'ketch', 'key', 'keyed', 'keys', 'khaki', 'khan', 'khans', 'kick', 'kicks', 'kicky', 'kid', 'kiddo', 'kiddy', 'kids', 'kill', 'kills', 'kiln', 'kilns', 'kilo', 'kilos', 'kilt', 'kilts', 'kin', 'kind', 'kinda', 'kinds', 'kine', 'king', 'kings', 'kink', 'kinks', 'kinky', 'kiosk', 'kip', 'kips', 'kirk', 'kirks', 'kiss', 'kit', 'kite', 'kited', 'kites', 'kith', 'kiths', 'kits', 'kitty', 'kiwi', 'kiwis', 'klutz', 'knack', 'knave', 'knead', 'knee', 'kneed', 'kneel', 'knees', 'knell', 'knelt', 'knew', 'knife', 'knish', 'knit', 'knits', 'knob', 'knobs', 'knock', 'knoll', 'knot', 'knots', 'know', 'known', 'knows', 'knurl', 'koala', 'kola', 'kolas', 'kook', 'kooks', 'kooky', 'kopek', 'kraal', 'kraut', 'krill', 'krona', 'krone', 'kudos', 'kudzu', 'la', 'lab', 'label', 'labia', 'labor', 'labs', 'lac', 'lace', 'laced', 'laces', 'lack', 'lacks', 'lacs', 'lacy', 'lad', 'lade', 'laded', 'laden', 'lades', 'ladle', 'lads', 'lady', 'lag', 'lager', 'lags', 'laid', 'lain', 'lair', 'laird', 'lairs', 'laity', 'lake', 'lakes', 'lam', 'lama', 'lamas', 'lamb', 'lambs', 'lame', 'lamed', 'lamer', 'lames', 'lamp', 'lamps', 'lams', 'lanai', 'lance', 'land', 'lands', 'lane', 'lanes', 'lank', 'lanky', 'lap', 'lapel', 'lapin', 'laps', 'lapse', 'larch', 'lard', 'lards', 'lardy', 'large', 'largo', 'lark', 'larks', 'larva', 'las', 'laser', 'lash', 'lass', 'lasso', 'last', 'lasts', 'latch', 'late', 'later', 'latex', 'lath', 'lathe', 'laths', 'latte', 'laud', 'lauds', 'laugh', 'lava', 'lavas', 'lave', 'laved', 'laves', 'law', 'lawn', 'lawns', 'laws', 'lax', 'laxer', 'laxly', 'lay', 'layer', 'lays', 'layup', 'laze', 'lazed', 'lazes', 'lazy', 'lea', 'leach', 'lead', 'leads', 'leaf', 'leafs', 'leafy', 'leak', 'leaks', 'leaky', 'lean', 'leans', 'leant', 'leap', 'leaps', 'leapt', 'learn', 'leas', 'lease', 'leash', 'least', 'leave', 'lech', 'led', 'ledge', 'lee', 'leech', 'leek', 'leeks', 'leer', 'leers', 'leery', 'lees', 'left', 'lefts', 'lefty', 'leg', 'legal', 'leggy', 'legit', 'legs', 'lei', 'leis', 'lemon', 'lemur', 'lend', 'lends', 'lens', 'lent', 'lento', 'leper', 'lept', 'lepta', 'less', 'lest', 'let', 'lets', 'letup', 'levee', 'level', 'lever', 'levy', 'lewd', 'liar', 'liars', 'lib', 'libel', 'libs', 'lice', 'licit', 'lick', 'licks', 'lid', 'lido', 'lidos', 'lids', 'lie', 'lied', 'lief', 'liege', 'lien', 'liens', 'lies', 'lieu', 'lieus', 'life', 'lifer', 'lift', 'lifts', 'light', 'like', 'liked', 'liken', 'liker', 'likes', 'lilac', 'lilt', 'lilts', 'lily', 'limb', 'limbo', 'limbs', 'lime', 'limed', 'limes', 'limit', 'limn', 'limns', 'limo', 'limos', 'limp', 'limps', 'limy', 'line', 'lined', 'linen', 'liner', 'lines', 'ling', 'lingo', 'lings', 'link', 'links', 'lint', 'lints', 'linty', 'lion', 'lions', 'lip', 'lipid', 'lippy', 'lips', 'lira', 'liras', 'lire', 'lisle', 'lisp', 'lisps', 'list', 'lists', 'lit', 'lite', 'liter', 'lithe', 'litre', 'live', 'lived', 'liven', 'liver', 'lives', 'livid', 'llama', 'llano', 'lo', 'load', 'loads', 'loaf', 'loafs', 'loam', 'loams', 'loamy', 'loan', 'loans', 'loath', 'lob', 'lobar', 'lobby', 'lobe', 'lobed', 'lobes', 'lobs', 'local', 'loch', 'lochs', 'loci', 'lock', 'locks', 'loco', 'locus', 'lode', 'lodes', 'lodge', 'loft', 'lofts', 'lofty', 'log', 'loge', 'loges', 'logic', 'login', 'logo', 'logon', 'logos', 'logs', 'logy', 'loin', 'loins', 'loll', 'lolls', 'lone', 'loner', 'long', 'longs', 'look', 'looks', 'loom', 'looms', 'loon', 'loons', 'loony', 'loop', 'loops', 'loopy', 'loose', 'loot', 'loots', 'lop', 'lope', 'loped', 'lopes', 'lops', 'lord', 'lords', 'lore', 'lores', 'loris', 'lorn', 'lorry', 'lose', 'loser', 'loses', 'loss', 'lost', 'lot', 'loth', 'lots', 'lotto', 'lotus', 'loud', 'lour', 'lours', 'louse', 'lousy', 'lout', 'louts', 'love', 'loved', 'lover', 'loves', 'low', 'lowed', 'lower', 'lowly', 'lows', 'lox', 'loxes', 'loyal', 'luau', 'luaus', 'lube', 'lubed', 'lubes', 'lucid', 'luck', 'lucks', 'lucky', 'lucre', 'luff', 'luffs', 'lug', 'lugs', 'lull', 'lulls', 'lump', 'lumps', 'lumpy', 'lunar', 'lunch', 'lung', 'lunge', 'lungs', 'lupin', 'lupus', 'lurch', 'lure', 'lured', 'lures', 'lurid', 'lurk', 'lurks', 'lush', 'lust', 'lusts', 'lusty', 'lute', 'lutes', 'lye', 'lyes', 'lying', 'lymph', 'lynch', 'lynx', 'lyre', 'lyres', 'lyric', 'ma', 'mac', 'macaw', 'mace', 'maced', 'maces', 'mach', 'macho', 'machs', 'macro', 'macs', 'mad', 'madam', 'made', 'madly', 'mads', 'mafia', 'mag', 'magi', 'magic', 'magma', 'mags', 'magus', 'maid', 'maids', 'mail', 'mails', 'maim', 'maims', 'main', 'mains', 'maize', 'major', 'make', 'maker', 'makes', 'male', 'males', 'mall', 'malls', 'malt', 'malts', 'malty', 'mama', 'mamas', 'mamba', 'mambo', 'mamma', 'mammy', 'man', 'mane', 'maned', 'manes', 'manga', 'mange', 'mango', 'mangy', 'mania', 'manic', 'manly', 'manna', 'manor', 'mans', 'manse', 'manta', 'many', 'map', 'maple', 'maps', 'mar', 'march', 'mare', 'mares', 'maria', 'mark', 'marks', 'marl', 'marls', 'marry', 'mars', 'marsh', 'mart', 'marts', 'mas', 'maser', 'mash', 'mask', 'masks', 'mason', 'mass', 'mast', 'masts', 'mat', 'match', 'mate', 'mated', 'mates', 'math', 'maths', 'mats', 'matt', 'matte', 'matts', 'matzo', 'maul', 'mauls', 'mauve', 'maven', 'mavin', 'maw', 'maws', 'max', 'maxed', 'maxes', 'maxi', 'maxim', 'maxis', 'may', 'maybe', 'mayo', 'mayor', 'mayos', 'mays', 'mayst', 'maze', 'mazes', 'me', 'mead', 'meads', 'meal', 'meals', 'mealy', 'mean', 'means', 'meant', 'meany', 'meat', 'meats', 'meaty', 'mecca', 'medal', 'media', 'medic', 'meds', 'meed', 'meeds', 'meek', 'meet', 'meets', 'mega', 'meh', 'meld', 'melds', 'melee', 'melon', 'melt', 'melts', 'meme', 'memes', 'memo', 'memos', 'men', 'mend', 'mends', 'menu', 'menus', 'meow', 'meows', 'mercy', 'mere', 'meres', 'merge', 'merit', 'merry', 'mesa', 'mesas', 'mesh', 'meson', 'mess', 'messy', 'met', 'metal', 'mete', 'meted', 'meter', 'metes', 'metre', 'metro', 'mew', 'mewed', 'mewl', 'mewls', 'mews', 'mezzo', 'mi', 'mica', 'micas', 'mice', 'micra', 'micro', 'mid', 'middy', 'midge', 'midi', 'midis', 'midst', 'mien', 'miens', 'miff', 'miffs', 'might', 'mike', 'miked', 'mikes', 'mil', 'milch', 'mild', 'milds', 'mile', 'miler', 'miles', 'milf', 'milfs', 'milk', 'milks', 'milky', 'mill', 'mills', 'mils', 'milt', 'milts', 'mime', 'mimed', 'mimes', 'mimic', 'mince', 'mind', 'minds', 'mine', 'mined', 'miner', 'mines', 'mini', 'minim', 'minis', 'mink', 'minks', 'minor', 'mint', 'mints', 'minty', 'minus', 'minx', 'mire', 'mired', 'mires', 'mirth', 'miry', 'mis', 'misdo', 'miser', 'miss', 'mist', 'mists', 'misty', 'mite', 'miter', 'mites', 'mitre', 'mitt', 'mitts', 'mix', 'mixed', 'mixer', 'mixes', 'mixt', 'mkay', 'moan', 'moans', 'moat', 'moats', 'mob', 'mobs', 'mocha', 'mock', 'mocks', 'mod', 'modal', 'mode', 'model', 'modem', 'modes', 'mods', 'mogul', 'moil', 'moils', 'moire', 'moist', 'molar', 'mold', 'molds', 'moldy', 'mole', 'moles', 'moll', 'molls', 'molly', 'molt', 'molts', 'mom', 'momma', 'mommy', 'moms', 'money', 'monk', 'monks', 'mono', 'monos', 'month', 'moo', 'mooch', 'mood', 'moods', 'moody', 'mooed', 'moon', 'moons', 'moor', 'moors', 'moos', 'moose', 'moot', 'moots', 'mop', 'mope', 'moped', 'moper', 'mopes', 'mopey', 'mops', 'mopy', 'moral', 'moray', 'more', 'morel', 'mores', 'morn', 'morns', 'moron', 'morph', 'mosey', 'mosh', 'moss', 'mossy', 'most', 'mosts', 'mot', 'mote', 'motel', 'motes', 'motet', 'moth', 'moths', 'motif', 'motor', 'mots', 'motto', 'moue', 'moues', 'mould', 'moult', 'mound', 'mount', 'mourn', 'mouse', 'mousy', 'mouth', 'move', 'moved', 'mover', 'moves', 'movie', 'mow', 'mowed', 'mower', 'mown', 'mows', 'moxie', 'mu', 'much', 'muck', 'mucks', 'mucky', 'mucus', 'mud', 'muddy', 'muds', 'muff', 'muffs', 'mufti', 'mug', 'muggy', 'mugs', 'mulch', 'mulct', 'mule', 'mules', 'mull', 'mulls', 'mum', 'mummy', 'mumps', 'mums', 'munch', 'mural', 'murk', 'murks', 'murky', 'mus', 'muse', 'mused', 'muses', 'mush', 'mushy', 'music', 'musk', 'musks', 'musky', 'muss', 'mussy', 'must', 'musts', 'musty', 'mute', 'muted', 'muter', 'mutes', 'mutt', 'mutts', 'my', 'myna', 'mynah', 'mynas', 'myrrh', 'myth', 'myths', 'nab', 'nabob', 'nabs', 'nacho', 'nacre', 'nadir', 'nae', 'nag', 'nags', 'naiad', 'naif', 'naifs', 'nail', 'nails', 'naive', 'naked', 'name', 'named', 'names', 'nanny', 'nap', 'nape', 'napes', 'nappy', 'naps', 'narc', 'narcs', 'nark', 'narks', 'nary', 'nasal', 'nasty', 'natal', 'natch', 'natty', 'naval', 'nave', 'navel', 'naves', 'navy', 'nay', 'nays', 'neap', 'neaps', 'near', 'nears', 'neat', 'neath', 'neck', 'necks', 'nee', 'need', 'needs', 'needy', 'neigh', 'neon', 'neons', 'nerd', 'nerds', 'nerdy', 'nerve', 'nervy', 'nest', 'nests', 'net', 'nets', 'nett', 'netts', 'never', 'nevi', 'nevus', 'new', 'newel', 'newer', 'newly', 'news', 'newsy', 'newt', 'newts', 'next', 'nexts', 'nexus', 'nib', 'nibs', 'nice', 'nicer', 'niche', 'nick', 'nicks', 'niece', 'nifty', 'nigga', 'nigh', 'night', 'nil', 'nils', 'nimbi', 'nine', 'nines', 'ninja', 'ninny', 'ninth', 'nip', 'nippy', 'nips', 'nisei', 'nit', 'nite', 'niter', 'nites', 'nitre', 'nits', 'nix', 'nixed', 'nixes', 'no', 'noble', 'nobly', 'nod', 'nodal', 'node', 'nodes', 'nods', 'noel', 'noels', 'noes', 'nohow', 'noise', 'noisy', 'nomad', 'nonce', 'none', 'nook', 'nooks', 'noon', 'noons', 'noose', 'nope', 'nor', 'norm', 'norms', 'north', 'nos', 'nose', 'nosed', 'noses', 'nosey', 'nosh', 'nosy', 'not', 'notch', 'note', 'noted', 'notes', 'noun', 'nouns', 'nova', 'novae', 'novas', 'novel', 'now', 'noway', 'nows', 'nth', 'nu', 'nub', 'nubby', 'nubs', 'nude', 'nuder', 'nudes', 'nudge', 'nuke', 'nuked', 'nukes', 'null', 'numb', 'numbs', 'nun', 'nuns', 'nurse', 'nus', 'nut', 'nuts', 'nutty', 'nylon', 'nymph', 'oaf', 'oafs', 'oak', 'oaken', 'oaks', 'oakum', 'oar', 'oared', 'oars', 'oases', 'oasis', 'oat', 'oaten', 'oath', 'oaths', 'oats', 'obese', 'obey', 'obeys', 'obi', 'obis', 'obit', 'obits', 'oboe', 'oboes', 'occur', 'ocean', 'ocher', 'ochre', 'octet', 'odd', 'odder', 'oddly', 'odds', 'ode', 'odes', 'odium', 'odor', 'odors', 'odour', 'of', 'off', 'offal', 'offed', 'offer', 'offs', 'oft', 'often', 'ogle', 'ogled', 'ogler', 'ogles', 'ogre', 'ogres', 'oh', 'ohm', 'ohms', 'oho', 'ohs', 'oil', 'oiled', 'oils', 'oily', 'oink', 'oinks', 'okapi', 'okay', 'okays', 'okra', 'okras', 'old', 'olden', 'older', 'oldie', 'olds', 'ole', 'oleo', 'oleos', 'oles', 'olive', 'om', 'omega', 'omen', 'omens', 'omit', 'omits', 'oms', 'on', 'once', 'onces', 'one', 'ones', 'onion', 'only', 'onset', 'onto', 'onus', 'onyx', 'ooh', 'oohed', 'oohs', 'oops', 'ooze', 'oozed', 'oozes', 'oozy', 'op', 'opal', 'opals', 'ope', 'oped', 'open', 'opens', 'opera', 'opes', 'opine', 'oping', 'opium', 'ops', 'opt', 'opted', 'optic', 'opts', 'opus', 'or', 'oral', 'orals', 'orate', 'orb', 'orbit', 'orbs', 'orc', 'orcs', 'order', 'ore', 'ores', 'organ', 'orgy', 'oriel', 'orris', 'orzo', 'orzos', 'osier', 'other', 'otter', 'ouch', 'ought', 'ounce', 'our', 'ours', 'oust', 'ousts', 'out', 'outdo', 'outed', 'outer', 'outgo', 'outre', 'outs', 'ouzo', 'ouzos', 'ova', 'oval', 'ovals', 'ovary', 'ovate', 'oven', 'ovens', 'over', 'overs', 'overt', 'ovoid', 'ovule', 'ovum', 'ow', 'owe', 'owed', 'owes', 'owing', 'owl', 'owlet', 'owls', 'own', 'owned', 'owner', 'owns', 'ox', 'oxbow', 'oxen', 'oxide', 'ozone', 'pa', 'pace', 'paced', 'pacer', 'paces', 'pack', 'packs', 'pact', 'pacts', 'pad', 'paddy', 'padre', 'pads', 'paean', 'pagan', 'page', 'paged', 'pager', 'pages', 'paid', 'pail', 'pails', 'pain', 'pains', 'paint', 'pair', 'pairs', 'pal', 'pale', 'paled', 'paler', 'pales', 'pall', 'palls', 'palm', 'palms', 'palmy', 'pals', 'palsy', 'pan', 'panda', 'pane', 'panel', 'panes', 'pang', 'pangs', 'panic', 'pans', 'pansy', 'pant', 'pants', 'panty', 'pap', 'papa', 'papal', 'papas', 'papaw', 'paper', 'pappy', 'paps', 'par', 'para', 'paras', 'parch', 'pare', 'pared', 'parer', 'pares', 'park', 'parka', 'parks', 'parry', 'pars', 'parse', 'part', 'parts', 'party', 'pas', 'pasha', 'pass', 'passe', 'past', 'pasta', 'paste', 'pasts', 'pasty', 'pat', 'patch', 'pate', 'pates', 'path', 'paths', 'patio', 'pats', 'patsy', 'patty', 'pause', 'pave', 'paved', 'paves', 'paw', 'pawed', 'pawl', 'pawls', 'pawn', 'pawns', 'paws', 'pay', 'payed', 'payee', 'payer', 'pays', 'pea', 'peace', 'peach', 'peak', 'peaks', 'peal', 'peals', 'pear', 'pearl', 'pears', 'peas', 'pease', 'peat', 'peats', 'peaty', 'pecan', 'peck', 'pecks', 'pecs', 'pedal', 'pee', 'peed', 'peek', 'peeks', 'peel', 'peels', 'peen', 'peens', 'peep', 'peeps', 'peer', 'peers', 'pees', 'peeve', 'peg', 'pegs', 'peke', 'pekes', 'pekoe', 'pelf', 'pelfs', 'pelt', 'pelts', 'pen', 'penal', 'pence', 'pend', 'pends', 'penes', 'penis', 'penny', 'pens', 'pent', 'peon', 'peons', 'peony', 'pep', 'peppy', 'peps', 'per', 'perch', 'peril', 'perk', 'perks', 'perky', 'perm', 'perms', 'pert', 'pesky', 'peso', 'pesos', 'pest', 'pesto', 'pests', 'pet', 'petal', 'peter', 'pets', 'petty', 'pew', 'pewee', 'pewit', 'pews', 'phase', 'phat', 'phew', 'phi', 'phial', 'phis', 'phlox', 'phone', 'phony', 'photo', 'phyla', 'pi', 'piano', 'pic', 'pica', 'picas', 'pick', 'picks', 'picky', 'picot', 'pics', 'pie', 'piece', 'pied', 'pier', 'piers', 'pies', 'piety', 'pig', 'piggy', 'pigmy', 'pigs', 'piing', 'pike', 'piked', 'piker', 'pikes', 'pilaf', 'pilau', 'pile', 'piled', 'piles', 'pill', 'pills', 'pilot', 'pimp', 'pimps', 'pin', 'pinch', 'pine', 'pined', 'pines', 'piney', 'ping', 'pings', 'pink', 'pinko', 'pinks', 'pinky', 'pinon', 'pins', 'pint', 'pinto', 'pints', 'pinup', 'piny', 'pious', 'pip', 'pipe', 'piped', 'piper', 'pipes', 'pipit', 'pips', 'pique', 'pis', 'piss', 'pit', 'pita', 'pitas', 'pitch', 'pith', 'piths', 'pithy', 'piton', 'pits', 'pity', 'pivot', 'pix', 'pixel', 'pixie', 'pixy', 'pizza', 'place', 'plaid', 'plain', 'plait', 'plan', 'plane', 'plank', 'plans', 'plant', 'plash', 'plat', 'plate', 'plats', 'platy', 'play', 'plays', 'plaza', 'plea', 'plead', 'pleas', 'pleat', 'plebe', 'pled', 'plied', 'plies', 'plod', 'plods', 'plop', 'plops', 'plot', 'plots', 'plow', 'plows', 'ploy', 'ploys', 'pluck', 'plug', 'plugs', 'plum', 'plumb', 'plume', 'plump', 'plums', 'plumy', 'plunk', 'plus', 'plush', 'ply', 'poach', 'pock', 'pocks', 'pod', 'podia', 'pods', 'poem', 'poems', 'poesy', 'poet', 'poets', 'poi', 'point', 'pois', 'poise', 'poke', 'poked', 'poker', 'pokes', 'pokey', 'poky', 'pol', 'polar', 'pole', 'poled', 'poles', 'polio', 'polka', 'poll', 'polls', 'polo', 'polos', 'pols', 'polyp', 'pomp', 'pomps', 'pond', 'ponds', 'pone', 'pones', 'pony', 'pooch', 'poof', 'poofs', 'pooh', 'poohs', 'pool', 'pools', 'poop', 'poops', 'poor', 'pop', 'pope', 'popes', 'poppa', 'poppy', 'pops', 'porch', 'pore', 'pored', 'pores', 'porgy', 'pork', 'porks', 'porky', 'porn', 'porno', 'porns', 'port', 'ports', 'pose', 'posed', 'poser', 'poses', 'posh', 'posit', 'posse', 'post', 'posts', 'posy', 'pot', 'pots', 'potty', 'pouch', 'pound', 'pour', 'pours', 'pout', 'pouts', 'power', 'pox', 'poxes', 'pram', 'prams', 'prank', 'prate', 'prawn', 'pray', 'prays', 'preen', 'prep', 'preps', 'press', 'prey', 'preys', 'price', 'prick', 'pricy', 'pride', 'pried', 'prier', 'pries', 'prig', 'prigs', 'prim', 'prime', 'primp', 'print', 'prior', 'prise', 'prism', 'privy', 'prize', 'pro', 'probe', 'prod', 'prods', 'prof', 'profs', 'prom', 'promo', 'proms', 'prone', 'prong', 'proof', 'prop', 'props', 'pros', 'prose', 'prosy', 'proud', 'prove', 'prow', 'prowl', 'prows', 'proxy', 'prude', 'prune', 'pry', 'pryer', 'psalm', 'pshaw', 'psi', 'psis', 'psst', 'psych', 'pub', 'pubes', 'pubic', 'pubis', 'pubs', 'puce', 'puces', 'puck', 'pucks', 'pudgy', 'puff', 'puffs', 'puffy', 'pug', 'pugs', 'puke', 'puked', 'pukes', 'pukka', 'pule', 'puled', 'pules', 'pull', 'pulls', 'pulp', 'pulps', 'pulpy', 'pulse', 'puma', 'pumas', 'pump', 'pumps', 'pun', 'punch', 'punk', 'punks', 'puns', 'punt', 'punts', 'puny', 'pup', 'pupa', 'pupae', 'pupal', 'pupas', 'pupil', 'puppy', 'pups', 'pure', 'puree', 'purer', 'purge', 'purl', 'purls', 'purr', 'purrs', 'purse', 'pus', 'puses', 'push', 'pushy', 'puss', 'pussy', 'put', 'puts', 'putt', 'putts', 'putty', 'pwn', 'pwned', 'pwns', 'pygmy', 'pylon', 'pyre', 'pyres', 'pyx', 'pyxes', 'qua', 'quack', 'quad', 'quads', 'quaff', 'quail', 'quake', 'quaky', 'qualm', 'quark', 'quart', 'quash', 'quasi', 'quay', 'quays', 'queen', 'queer', 'quell', 'query', 'quest', 'queue', 'quick', 'quid', 'quids', 'quiet', 'quill', 'quilt', 'quint', 'quip', 'quips', 'quire', 'quirk', 'quirt', 'quit', 'quite', 'quits', 'quiz', 'quoin', 'quoit', 'quota', 'quote', 'quoth', 'rabbi', 'rabid', 'race', 'raced', 'racer', 'races', 'rack', 'racks', 'racy', 'rad', 'radar', 'radii', 'radio', 'radon', 'rads', 'raft', 'rafts', 'rag', 'raga', 'ragas', 'rage', 'raged', 'rages', 'rags', 'rah', 'raid', 'raids', 'rail', 'rails', 'rain', 'rains', 'rainy', 'raise', 'raja', 'rajah', 'rajas', 'rake', 'raked', 'rakes', 'rally', 'ram', 'ramie', 'ramp', 'ramps', 'rams', 'ran', 'ranch', 'rand', 'randy', 'ranee', 'rang', 'range', 'rangy', 'rani', 'ranis', 'rank', 'ranks', 'rant', 'rants', 'rap', 'rape', 'raped', 'raper', 'rapes', 'rapid', 'raps', 'rapt', 'rare', 'rared', 'rarer', 'rares', 'rash', 'rasp', 'rasps', 'raspy', 'rat', 'rate', 'rated', 'rater', 'rates', 'ratio', 'rats', 'ratty', 'rave', 'raved', 'ravel', 'raven', 'raves', 'raw', 'rawer', 'raws', 'ray', 'rayon', 'rays', 'raze', 'razed', 'razes', 'razor', 'razz', 're', 'reach', 'react', 'read', 'reads', 'ready', 'real', 'realm', 'ream', 'reams', 'reap', 'reaps', 'rear', 'rearm', 'rears', 'rebel', 'rebid', 'rebus', 'rebut', 'rec', 'recap', 'recs', 'recta', 'recto', 'recur', 'red', 'redid', 'redo', 'reds', 'redye', 'reed', 'reeds', 'reedy', 'reef', 'reefs', 'reek', 'reeks', 'reel', 'reels', 'reeve', 'ref', 'refer', 'refit', 'refs', 'regal', 'rehab', 'reign', 'rein', 'reins', 'relax', 'relay', 'relic', 'relit', 'rely', 'rem', 'remap', 'remit', 'remix', 'rems', 'renal', 'rend', 'rends', 'renew', 'rent', 'rents', 'reorg', 'rep', 'repay', 'repel', 'reply', 'reps', 'reran', 'rerun', 'res', 'reset', 'resew', 'resin', 'resow', 'rest', 'rests', 'retch', 'retie', 'retro', 'retry', 'reuse', 'rev', 'revel', 'revs', 'revue', 'rewed', 'rhea', 'rheas', 'rheum', 'rhino', 'rho', 'rhos', 'rhyme', 'rial', 'rials', 'rib', 'ribs', 'rice', 'riced', 'ricer', 'rices', 'rich', 'rick', 'ricks', 'rid', 'ride', 'rider', 'rides', 'ridge', 'ridgy', 'rids', 'rife', 'rifer', 'riff', 'riffs', 'rifle', 'rift', 'rifts', 'rig', 'right', 'rigid', 'rigor', 'rigs', 'rile', 'riled', 'riles', 'rill', 'rills', 'rim', 'rime', 'rimed', 'rimes', 'rims', 'rind', 'rinds', 'ring', 'rings', 'rink', 'rinks', 'rinse', 'riot', 'riots', 'rip', 'ripe', 'ripen', 'riper', 'rips', 'rise', 'risen', 'riser', 'rises', 'risk', 'risks', 'risky', 'rite', 'rites', 'ritzy', 'rival', 'rive', 'rived', 'riven', 'river', 'rives', 'rivet', 'riyal', 'roach', 'road', 'roads', 'roam', 'roams', 'roan', 'roans', 'roar', 'roars', 'roast', 'rob', 'robe', 'robed', 'robes', 'robin', 'robot', 'robs', 'rock', 'rocks', 'rocky', 'rod', 'rode', 'rodeo', 'rods', 'roe', 'roes', 'roger', 'rogue', 'roil', 'roils', 'role', 'roles', 'roll', 'rolls', 'roman', 'romeo', 'romp', 'romps', 'rondo', 'rood', 'roods', 'roof', 'roofs', 'rook', 'rooks', 'room', 'rooms', 'roomy', 'roost', 'root', 'roots', 'rope', 'roped', 'roper', 'ropes', 'ropy', 'rose', 'roses', 'rosin', 'rosy', 'rot', 'rote', 'rotes', 'rotor', 'rots', 'roue', 'roues', 'rouge', 'rough', 'round', 'rouse', 'roust', 'rout', 'route', 'routs', 'rove', 'roved', 'rover', 'roves', 'row', 'rowdy', 'rowed', 'rowel', 'rower', 'rows', 'royal', 'rub', 'rube', 'rubes', 'ruble', 'rubs', 'ruby', 'ruddy', 'rude', 'ruder', 'rue', 'rued', 'rues', 'ruff', 'ruffs', 'rug', 'rugby', 'rugs', 'ruin', 'ruing', 'ruins', 'rule', 'ruled', 'ruler', 'rules', 'rum', 'rumba', 'rummy', 'rumor', 'rump', 'rumps', 'rums', 'run', 'rune', 'runes', 'rung', 'rungs', 'runic', 'runny', 'runs', 'runt', 'runts', 'runty', 'rupee', 'rural', 'ruse', 'ruses', 'rush', 'rushy', 'rusk', 'rusks', 'rust', 'rusts', 'rusty', 'rut', 'ruts', 'rutty', 'rye', 'ryes', 'saber', 'sable', 'sabot', 'sabra', 'sabre', 'sac', 'sack', 'sacks', 'sacra', 'sacs', 'sad', 'sadly', 'safe', 'safer', 'safes', 'sag', 'saga', 'sagas', 'sage', 'sager', 'sages', 'saggy', 'sago', 'sagos', 'sags', 'sahib', 'said', 'sail', 'sails', 'saint', 'saith', 'sake', 'sakes', 'saki', 'sakis', 'salad', 'sale', 'sales', 'sally', 'salon', 'salsa', 'salt', 'salts', 'salty', 'salve', 'salvo', 'samba', 'same', 'sand', 'sands', 'sandy', 'sane', 'saner', 'sang', 'sank', 'sans', 'sap', 'sappy', 'saps', 'saran', 'saree', 'sarge', 'sari', 'saris', 'sash', 'sass', 'sassy', 'sat', 'satay', 'sate', 'sated', 'sates', 'satin', 'satyr', 'sauce', 'saucy', 'sauna', 'saute', 'save', 'saved', 'saver', 'saves', 'savor', 'savoy', 'savvy', 'saw', 'sawed', 'sawn', 'saws', 'sax', 'saxes', 'say', 'says', 'scab', 'scabs', 'scad', 'scads', 'scald', 'scale', 'scalp', 'scaly', 'scam', 'scamp', 'scams', 'scan', 'scans', 'scant', 'scar', 'scare', 'scarf', 'scarp', 'scars', 'scary', 'scat', 'scats', 'scene', 'scent', 'schmo', 'schwa', 'scion', 'scoff', 'scold', 'scone', 'scoop', 'scoot', 'scope', 'score', 'scorn', 'scour', 'scout', 'scow', 'scowl', 'scows', 'scrag', 'scram', 'scrap', 'scree', 'screw', 'scrim', 'scrip', 'scrod', 'scrub', 'scuba', 'scud', 'scuds', 'scuff', 'scull', 'scum', 'scums', 'scurf', 'sea', 'seal', 'seals', 'seam', 'seams', 'seamy', 'sear', 'sears', 'seas', 'seat', 'seats', 'sec', 'secs', 'sect', 'sects', 'sedan', 'sedge', 'sedgy', 'see', 'seed', 'seeds', 'seedy', 'seek', 'seeks', 'seem', 'seems', 'seen', 'seep', 'seeps', 'seer', 'seers', 'sees', 'segue', 'seine', 'seize', 'self', 'sell', 'sells', 'semen', 'semi', 'semis', 'send', 'sends', 'senna', 'senor', 'sense', 'sent', 'sepal', 'sepia', 'septa', 'sera', 'sere', 'serer', 'serf', 'serfs', 'serge', 'serif', 'serum', 'serve', 'servo', 'set', 'sets', 'setup', 'seven', 'sever', 'sew', 'sewed', 'sewer', 'sewn', 'sews', 'sex', 'sexed', 'sexes', 'sexy', 'sh', 'shack', 'shad', 'shade', 'shads', 'shady', 'shaft', 'shag', 'shags', 'shah', 'shahs', 'shake', 'shaky', 'shale', 'shall', 'shalt', 'sham', 'shame', 'shams', 'shank', 'shape', 'shard', 'share', 'shark', 'sharp', 'shat', 'shave', 'shawl', 'shay', 'shays', 'she', 'sheaf', 'shear', 'shed', 'sheds', 'sheen', 'sheep', 'sheer', 'sheet', 'sheik', 'shelf', 'shell', 'sherd', 'shes', 'shew', 'shewn', 'shews', 'shh', 'shied', 'shier', 'shies', 'shift', 'shill', 'shim', 'shims', 'shin', 'shine', 'shins', 'shiny', 'ship', 'ships', 'shire', 'shirk', 'shirr', 'shirt', 'shit', 'shits', 'shiv', 'shivs', 'shlep', 'shoal', 'shoat', 'shock', 'shod', 'shoe', 'shoed', 'shoes', 'shone', 'shoo', 'shook', 'shoon', 'shoos', 'shoot', 'shop', 'shops', 'shore', 'shorn', 'short', 'shot', 'shots', 'shout', 'shove', 'show', 'shown', 'shows', 'showy', 'shred', 'shrew', 'shrub', 'shrug', 'shuck', 'shun', 'shuns', 'shunt', 'shush', 'shut', 'shuts', 'shy', 'shyer', 'shyly', 'sibyl', 'sic', 'sick', 'sicko', 'sicks', 'sics', 'side', 'sided', 'sides', 'sidle', 'siege', 'sieve', 'sift', 'sifts', 'sigh', 'sighs', 'sight', 'sigma', 'sign', 'signs', 'silk', 'silks', 'silky', 'sill', 'sills', 'silly', 'silo', 'silos', 'silt', 'silts', 'silty', 'sim', 'sims', 'sin', 'since', 'sine', 'sines', 'sinew', 'sing', 'singe', 'sings', 'sink', 'sinks', 'sins', 'sinus', 'sip', 'sips', 'sir', 'sire', 'sired', 'siree', 'siren', 'sires', 'sirs', 'sirup', 'sis', 'sisal', 'sises', 'sissy', 'sit', 'sitar', 'site', 'sited', 'sites', 'sits', 'situp', 'six', 'sixes', 'sixth', 'sixty', 'size', 'sized', 'sizes', 'ska', 'skas', 'skate', 'skeet', 'skein', 'skew', 'skews', 'ski', 'skid', 'skids', 'skied', 'skier', 'skies', 'skiff', 'skill', 'skim', 'skimp', 'skims', 'skin', 'skins', 'skip', 'skips', 'skirt', 'skis', 'skit', 'skits', 'skoal', 'skulk', 'skull', 'skunk', 'sky', 'skyed', 'slab', 'slabs', 'slack', 'slag', 'slags', 'slain', 'slake', 'slam', 'slams', 'slang', 'slant', 'slap', 'slaps', 'slash', 'slat', 'slate', 'slats', 'slave', 'slaw', 'slaws', 'slay', 'slays', 'sled', 'sleds', 'sleek', 'sleep', 'sleet', 'slept', 'slew', 'slews', 'slice', 'slick', 'slid', 'slide', 'slier', 'slily', 'slim', 'slime', 'slims', 'slimy', 'sling', 'slink', 'slip', 'slips', 'slit', 'slits', 'slob', 'slobs', 'sloe', 'sloes', 'slog', 'slogs', 'sloop', 'slop', 'slope', 'slops', 'slosh', 'slot', 'sloth', 'slots', 'slow', 'slows', 'slue', 'slued', 'slues', 'slug', 'slugs', 'slum', 'slump', 'slums', 'slung', 'slunk', 'slur', 'slurp', 'slurs', 'slush', 'slut', 'sluts', 'sly', 'slyer', 'slyly', 'smack', 'small', 'smart', 'smash', 'smear', 'smell', 'smelt', 'smile', 'smirk', 'smit', 'smite', 'smith', 'smock', 'smog', 'smogs', 'smoke', 'smoky', 'smote', 'smug', 'smut', 'smuts', 'snack', 'snafu', 'snag', 'snags', 'snail', 'snake', 'snaky', 'snap', 'snaps', 'snare', 'snarl', 'sneak', 'sneer', 'snide', 'sniff', 'snip', 'snipe', 'snips', 'snit', 'snits', 'snob', 'snobs', 'snood', 'snoop', 'snoot', 'snore', 'snort', 'snot', 'snots', 'snout', 'snow', 'snows', 'snowy', 'snub', 'snubs', 'snuck', 'snuff', 'snug', 'snugs', 'so', 'soak', 'soaks', 'soap', 'soaps', 'soapy', 'soar', 'soars', 'sob', 'sober', 'sobs', 'sock', 'socks', 'sod', 'soda', 'sodas', 'sods', 'sofa', 'sofas', 'soft', 'softy', 'soggy', 'soil', 'soils', 'sol', 'solar', 'sold', 'sole', 'soled', 'soles', 'soli', 'solid', 'solo', 'solos', 'sols', 'solve', 'some', 'son', 'sonar', 'song', 'songs', 'sonic', 'sonny', 'sons', 'soon', 'soot', 'sooth', 'soots', 'sooty', 'sop', 'soppy', 'sops', 'sore', 'sorer', 'sores', 'sorry', 'sort', 'sorta', 'sorts', 'sos', 'sot', 'sots', 'sou', 'sough', 'soul', 'souls', 'sound', 'soup', 'soups', 'soupy', 'sour', 'sours', 'sous', 'souse', 'south', 'sow', 'sowed', 'sower', 'sown', 'sows', 'sox', 'soy', 'soya', 'soyas', 'soys', 'spa', 'space', 'spacy', 'spade', 'spake', 'spam', 'spams', 'span', 'spank', 'spans', 'spar', 'spare', 'spark', 'spars', 'spas', 'spasm', 'spat', 'spate', 'spats', 'spawn', 'spay', 'spays', 'speak', 'spear', 'spec', 'speck', 'specs', 'sped', 'speed', 'spell', 'spelt', 'spend', 'spent', 'sperm', 'spew', 'spews', 'spice', 'spicy', 'spied', 'spiel', 'spies', 'spike', 'spiky', 'spill', 'spilt', 'spin', 'spine', 'spins', 'spiny', 'spire', 'spiry', 'spit', 'spite', 'spits', 'splat', 'splay', 'split', 'spoil', 'spoke', 'spoof', 'spook', 'spool', 'spoon', 'spoor', 'spore', 'sport', 'spot', 'spots', 'spout', 'sprat', 'spray', 'spree', 'sprig', 'spry', 'spud', 'spuds', 'spume', 'spumy', 'spun', 'spunk', 'spur', 'spurn', 'spurs', 'spurt', 'sputa', 'spy', 'squab', 'squad', 'squat', 'squaw', 'squib', 'squid', 'ssh', 'stab', 'stabs', 'stack', 'staff', 'stag', 'stage', 'stags', 'stagy', 'staid', 'stain', 'stair', 'stake', 'stale', 'stalk', 'stall', 'stamp', 'stand', 'stank', 'staph', 'star', 'stare', 'stark', 'stars', 'start', 'stash', 'stat', 'state', 'stats', 'stave', 'stay', 'stays', 'stead', 'steak', 'steal', 'steam', 'steed', 'steel', 'steep', 'steer', 'stein', 'stem', 'stems', 'steno', 'stent', 'step', 'steps', 'stern', 'stet', 'stets', 'stew', 'stews', 'stick', 'sties', 'stiff', 'stile', 'still', 'stilt', 'sting', 'stink', 'stint', 'stir', 'stirs', 'stoat', 'stock', 'stogy', 'stoic', 'stoke', 'stole', 'stomp', 'stone', 'stony', 'stood', 'stool', 'stoop', 'stop', 'stops', 'store', 'stork', 'storm', 'story', 'stoup', 'stout', 'stove', 'stow', 'stows', 'strap', 'straw', 'stray', 'strep', 'strew', 'stria', 'strip', 'strop', 'strum', 'strut', 'stub', 'stubs', 'stuck', 'stud', 'studs', 'study', 'stuff', 'stump', 'stun', 'stung', 'stunk', 'stuns', 'stunt', 'sty', 'stye', 'styes', 'style', 'styli', 'stymy', 'suave', 'sub', 'subs', 'such', 'suck', 'sucks', 'suds', 'sudsy', 'sue', 'sued', 'suede', 'sues', 'suet', 'suets', 'suety', 'sugar', 'suing', 'suit', 'suite', 'suits', 'sulfa', 'sulk', 'sulks', 'sulky', 'sully', 'sum', 'sumac', 'sumo', 'sumos', 'sump', 'sumps', 'sums', 'sun', 'sung', 'sunk', 'sunny', 'suns', 'sunup', 'sup', 'super', 'supra', 'sups', 'sure', 'surer', 'surf', 'surfs', 'surge', 'surly', 'sushi', 'swab', 'swabs', 'swag', 'swags', 'swain', 'swam', 'swami', 'swamp', 'swan', 'swank', 'swans', 'swap', 'swaps', 'sward', 'swarm', 'swash', 'swat', 'swath', 'swats', 'sway', 'sways', 'swear', 'sweat', 'swede', 'sweep', 'sweet', 'swell', 'swept', 'swift', 'swig', 'swigs', 'swill', 'swim', 'swims', 'swine', 'swing', 'swipe', 'swirl', 'swish', 'swob', 'swobs', 'swoon', 'swoop', 'swop', 'swops', 'sword', 'swore', 'sworn', 'swum', 'swung', 'sylph', 'sync', 'synch', 'syncs', 'synod', 'syrup', 'tab', 'tabby', 'tabla', 'table', 'taboo', 'tabor', 'tabs', 'tabu', 'tabus', 'tacit', 'tack', 'tacks', 'tacky', 'taco', 'tacos', 'tact', 'tacts', 'tad', 'tads', 'taffy', 'tag', 'tags', 'taiga', 'tail', 'tails', 'taint', 'take', 'taken', 'taker', 'takes', 'talc', 'talcs', 'tale', 'tales', 'tali', 'talk', 'talks', 'talky', 'tall', 'tally', 'talon', 'talus', 'tam', 'tame', 'tamed', 'tamer', 'tames', 'tamp', 'tamps', 'tams', 'tan', 'tang', 'tango', 'tangs', 'tangy', 'tank', 'tanks', 'tans', 'tansy', 'tap', 'tape', 'taped', 'taper', 'tapes', 'tapir', 'taps', 'tar', 'tardy', 'tare', 'tared', 'tares', 'tarn', 'tarns', 'taro', 'taros', 'tarot', 'tarp', 'tarps', 'tarry', 'tars', 'tarsi', 'tart', 'tarts', 'taser', 'task', 'tasks', 'taste', 'tasty', 'tat', 'tater', 'tats', 'tau', 'taunt', 'taupe', 'taus', 'taut', 'tawny', 'tax', 'taxed', 'taxer', 'taxes', 'taxi', 'taxis', 'tea', 'teach', 'teak', 'teaks', 'teal', 'teals', 'team', 'teams', 'tear', 'tears', 'teary', 'teas', 'tease', 'teat', 'teats', 'tech', 'techs', 'tee', 'teed', 'teem', 'teems', 'teen', 'teens', 'teeny', 'tees', 'teeth', 'telex', 'tell', 'tells', 'telly', 'temp', 'tempi', 'tempo', 'temps', 'tempt', 'ten', 'tend', 'tends', 'tenet', 'tenon', 'tenor', 'tens', 'tense', 'tent', 'tenth', 'tents', 'tepee', 'tepid', 'term', 'terms', 'tern', 'terns', 'terry', 'terse', 'test', 'tests', 'testy', 'tetra', 'text', 'texts', 'than', 'thane', 'thank', 'that', 'thaw', 'thaws', 'the', 'thee', 'theft', 'their', 'them', 'theme', 'then', 'thens', 'there', 'therm', 'these', 'theta', 'thew', 'thews', 'they', 'thick', 'thief', 'thigh', 'thin', 'thine', 'thing', 'think', 'thins', 'third', 'this', 'tho', 'thole', 'thong', 'thorn', 'those', 'thou', 'thous', 'three', 'threw', 'throb', 'throe', 'throw', 'thru', 'thrum', 'thud', 'thuds', 'thug', 'thugs', 'thumb', 'thump', 'thus', 'thy', 'thyme', 'thymi', 'ti', 'tiara', 'tibia', 'tic', 'tick', 'ticks', 'tics', 'tidal', 'tide', 'tided', 'tides', 'tidy', 'tie', 'tied', 'tier', 'tiers', 'ties', 'tiff', 'tiffs', 'tiger', 'tight', 'tike', 'tikes', 'tilde', 'tile', 'tiled', 'tiler', 'tiles', 'till', 'tills', 'tilt', 'tilts', 'time', 'timed', 'timer', 'times', 'timid', 'tin', 'tine', 'tines', 'ting', 'tinge', 'tings', 'tinny', 'tins', 'tint', 'tints', 'tiny', 'tip', 'tipi', 'tipis', 'tips', 'tipsy', 'tire', 'tired', 'tires', 'tiro', 'tiros', 'tis', 'tit', 'titan', 'tithe', 'title', 'tits', 'tizzy', 'to', 'toad', 'toads', 'toady', 'toast', 'today', 'toddy', 'toe', 'toed', 'toes', 'toffy', 'tofu', 'tofus', 'tog', 'toga', 'togae', 'togas', 'togs', 'toil', 'toils', 'toke', 'toked', 'token', 'tokes', 'told', 'tole', 'toles', 'toll', 'tolls', 'tom', 'tomb', 'tombs', 'tome', 'tomes', 'toms', 'ton', 'tonal', 'tone', 'toned', 'toner', 'tones', 'tong', 'tongs', 'tonic', 'tonne', 'tons', 'tony', 'too', 'took', 'tool', 'tools', 'toot', 'tooth', 'toots', 'top', 'topaz', 'topic', 'tops', 'toque', 'tor', 'torah', 'torch', 'tore', 'torn', 'tors', 'torsi', 'torso', 'tort', 'torte', 'torts', 'toss', 'tost', 'tot', 'total', 'tote', 'toted', 'totem', 'totes', 'tots', 'touch', 'tough', 'tour', 'tours', 'tout', 'touts', 'tow', 'towed', 'towel', 'tower', 'town', 'towns', 'tows', 'toxic', 'toxin', 'toy', 'toyed', 'toys', 'trace', 'track', 'tract', 'trade', 'trail', 'train', 'trait', 'tram', 'tramp', 'trams', 'trap', 'traps', 'trash', 'trawl', 'tray', 'trays', 'tread', 'treat', 'tree', 'treed', 'trees', 'trek', 'treks', 'trend', 'tress', 'trey', 'treys', 'triad', 'trial', 'tribe', 'trice', 'trick', 'tried', 'trier', 'tries', 'trig', 'trigs', 'trike', 'trill', 'trim', 'trims', 'trio', 'trios', 'trip', 'tripe', 'trips', 'trite', 'trod', 'troll', 'tromp', 'troop', 'trope', 'trot', 'troth', 'trots', 'trout', 'trove', 'trow', 'trows', 'troy', 'truce', 'truck', 'true', 'trued', 'truer', 'trues', 'truly', 'trump', 'trunk', 'truss', 'trust', 'truth', 'try', 'tryst', 'tsar', 'tsars', 'tub', 'tuba', 'tubal', 'tubas', 'tubby', 'tube', 'tubed', 'tuber', 'tubes', 'tubs', 'tuck', 'tucks', 'tuft', 'tufts', 'tug', 'tugs', 'tulip', 'tulle', 'tumid', 'tummy', 'tumor', 'tun', 'tuna', 'tunas', 'tune', 'tuned', 'tuner', 'tunes', 'tunic', 'tunny', 'tuns', 'tuque', 'turbo', 'turd', 'turds', 'turf', 'turfs', 'turfy', 'turn', 'turns', 'tush', 'tusk', 'tusks', 'tut', 'tutor', 'tuts', 'tutti', 'tutu', 'tutus', 'tux', 'tuxes', 'twain', 'twang', 'twas', 'tweak', 'tweed', 'tween', 'tweet', 'twerk', 'twerp', 'twice', 'twig', 'twigs', 'twill', 'twin', 'twine', 'twins', 'twirl', 'twist', 'twit', 'twits', 'twixt', 'two', 'twos', 'tying', 'tyke', 'tykes', 'type', 'typed', 'types', 'typo', 'typos', 'tyre', 'tyres', 'tyro', 'tyros', 'tzar', 'tzars', 'udder', 'ugh', 'ugly', 'uh', 'ukase', 'ulcer', 'ulna', 'ulnae', 'ulnar', 'ulnas', 'ultra', 'um', 'umbel', 'umber', 'umbra', 'umiak', 'ump', 'umped', 'umps', 'unbar', 'unbid', 'uncap', 'uncle', 'uncut', 'under', 'undid', 'undo', 'undue', 'unfed', 'unfit', 'unfix', 'unify', 'union', 'unit', 'unite', 'units', 'unity', 'unlit', 'unman', 'unpin', 'unsay', 'untie', 'until', 'unto', 'unwed', 'unzip', 'up', 'upend', 'upon', 'upped', 'upper', 'ups', 'upset', 'urban', 'urea', 'ureas', 'urge', 'urged', 'urges', 'uric', 'urine', 'urn', 'urns', 'us', 'usage', 'use', 'used', 'user', 'users', 'uses', 'usher', 'using', 'usual', 'usurp', 'usury', 'uteri', 'utter', 'uvula', 'vacua', 'vague', 'vain', 'vale', 'vales', 'valet', 'valid', 'valor', 'value', 'valve', 'vamp', 'vamps', 'van', 'vane', 'vanes', 'vans', 'vape', 'vaped', 'vapes', 'vapid', 'vapor', 'vary', 'vase', 'vases', 'vast', 'vasts', 'vat', 'vats', 'vault', 'vaunt', 'veal', 'veals', 'veep', 'veeps', 'veer', 'veers', 'veg', 'vegan', 'veges', 'vegs', 'veil', 'veils', 'vein', 'veins', 'vela', 'velar', 'veld', 'velds', 'veldt', 'velum', 'venal', 'vend', 'vends', 'venom', 'vent', 'vents', 'venue', 'verb', 'verbs', 'verge', 'verse', 'verso', 'verve', 'very', 'vest', 'vests', 'vet', 'vetch', 'veto', 'vets', 'vex', 'vexed', 'vexes', 'via', 'vial', 'vials', 'viand', 'vibe', 'vibes', 'vicar', 'vice', 'viced', 'vices', 'video', 'vie', 'vied', 'vies', 'view', 'views', 'vigil', 'vigor', 'vile', 'viler', 'villa', 'villi', 'vim', 'vims', 'vine', 'vines', 'vino', 'vinos', 'vinyl', 'viol', 'viola', 'viols', 'viper', 'viral', 'vireo', 'virus', 'visa', 'visas', 'vise', 'vised', 'vises', 'visit', 'visor', 'vista', 'vita', 'vitae', 'vital', 'vitas', 'viva', 'vivas', 'vivid', 'vixen', 'vizir', 'vizor', 'vocal', 'vodka', 'vogue', 'voice', 'void', 'voids', 'voila', 'voile', 'vole', 'voles', 'volt', 'volts', 'vomit', 'vote', 'voted', 'voter', 'votes', 'vouch', 'vow', 'vowed', 'vowel', 'vows', 'vulva', 'vying', 'wack', 'wacko', 'wacks', 'wacky', 'wad', 'wade', 'waded', 'wader', 'wades', 'wadi', 'wadis', 'wads', 'wafer', 'waft', 'wafts', 'wag', 'wage', 'waged', 'wager', 'wages', 'wagon', 'wags', 'waif', 'waifs', 'wail', 'wails', 'wain', 'wains', 'waist', 'wait', 'waits', 'waive', 'wake', 'waked', 'waken', 'wakes', 'wale', 'waled', 'wales', 'walk', 'walks', 'wall', 'walls', 'waltz', 'wan', 'wand', 'wands', 'wane', 'waned', 'wanes', 'wanly', 'wanna', 'want', 'wants', 'war', 'ward', 'wards', 'ware', 'wares', 'warm', 'warms', 'warn', 'warns', 'warp', 'warps', 'wars', 'wart', 'warts', 'warty', 'wary', 'was', 'wash', 'washy', 'wasp', 'wasps', 'wast', 'waste', 'watch', 'water', 'watt', 'watts', 'wave', 'waved', 'waver', 'waves', 'wavy', 'wax', 'waxed', 'waxen', 'waxes', 'waxy', 'way', 'ways', 'we', 'weak', 'weal', 'weals', 'wean', 'weans', 'wear', 'wears', 'weary', 'weave', 'web', 'webs', 'wed', 'wedge', 'weds', 'wee', 'weed', 'weeds', 'weedy', 'week', 'weeks', 'ween', 'weens', 'weeny', 'weep', 'weeps', 'weepy', 'weer', 'wees', 'weest', 'weft', 'wefts', 'weigh', 'weir', 'weird', 'weirs', 'welch', 'weld', 'welds', 'well', 'wells', 'welsh', 'welt', 'welts', 'wen', 'wench', 'wend', 'wends', 'wens', 'went', 'wept', 'were', 'west', 'wests', 'wet', 'wetly', 'wets', 'whack', 'whale', 'wham', 'whams', 'wharf', 'what', 'whats', 'wheal', 'wheat', 'whee', 'wheel', 'whelk', 'whelm', 'whelp', 'when', 'whens', 'where', 'whet', 'whets', 'whew', 'whey', 'wheys', 'which', 'whiff', 'while', 'whim', 'whims', 'whine', 'whiny', 'whip', 'whips', 'whir', 'whirl', 'whirr', 'whirs', 'whisk', 'whist', 'whit', 'white', 'whits', 'whiz', 'whizz', 'who', 'whoa', 'whole', 'whom', 'whoop', 'whore', 'whorl', 'whose', 'whoso', 'why', 'whys', 'wick', 'wicks', 'wide', 'widen', 'wider', 'widow', 'width', 'wield', 'wife', 'wig', 'wight', 'wigs', 'wiki', 'wikis', 'wild', 'wilds', 'wile', 'wiled', 'wiles', 'will', 'wills', 'wilt', 'wilts', 'wily', 'wimp', 'wimps', 'wimpy', 'win', 'wince', 'winch', 'wind', 'winds', 'windy', 'wine', 'wined', 'wines', 'wing', 'wings', 'wink', 'winks', 'wino', 'winos', 'wins', 'winy', 'wipe', 'wiped', 'wiper', 'wipes', 'wire', 'wired', 'wires', 'wiry', 'wise', 'wiser', 'wises', 'wish', 'wisp', 'wisps', 'wispy', 'wist', 'wit', 'witch', 'with', 'withe', 'wits', 'witty', 'wive', 'wived', 'wives', 'wiz', 'wizes', 'woad', 'woads', 'woe', 'woes', 'wok', 'woke', 'woken', 'woks', 'wold', 'wolds', 'wolf', 'wolfs', 'woman', 'womb', 'wombs', 'women', 'won', 'wonk', 'wonks', 'wonky', 'wont', 'wonts', 'woo', 'wood', 'woods', 'woody', 'wooed', 'wooer', 'woof', 'woofs', 'wool', 'wools', 'wooly', 'woos', 'woozy', 'word', 'words', 'wordy', 'wore', 'work', 'works', 'world', 'worm', 'worms', 'wormy', 'worn', 'worry', 'worse', 'worst', 'wort', 'worth', 'worts', 'would', 'wound', 'wove', 'woven', 'wow', 'wowed', 'wows', 'wrack', 'wrap', 'wraps', 'wrapt', 'wrath', 'wreak', 'wreck', 'wren', 'wrens', 'wrest', 'wrier', 'wring', 'wrist', 'writ', 'write', 'writs', 'wrong', 'wrote', 'wroth', 'wrung', 'wry', 'wryer', 'wryly', 'wurst', 'wuss', 'wussy', 'xenon', 'xerox', 'xi', 'xis', 'xylem', 'ya', 'yacht', 'yack', 'yacks', 'yahoo', 'yak', 'yaks', 'yam', 'yams', 'yang', 'yangs', 'yank', 'yanks', 'yap', 'yaps', 'yard', 'yards', 'yarn', 'yarns', 'yaw', 'yawed', 'yawl', 'yawls', 'yawn', 'yawns', 'yaws', 'ye', 'yea', 'yeah', 'yeahs', 'year', 'yearn', 'years', 'yeas', 'yeast', 'yegg', 'yeggs', 'yell', 'yells', 'yelp', 'yelps', 'yen', 'yens', 'yep', 'yeps', 'yes', 'yeses', 'yet', 'yeti', 'yetis', 'yew', 'yews', 'yield', 'yikes', 'yin', 'yins', 'yip', 'yipe', 'yips', 'yo', 'yodel', 'yoga', 'yogas', 'yogi', 'yogin', 'yogis', 'yoke', 'yoked', 'yokel', 'yokes', 'yolk', 'yolks', 'yon', 'yore', 'yores', 'you', 'young', 'your', 'yours', 'yous', 'youth', 'yow', 'yowl', 'yowls', 'yuan', 'yucca', 'yuck', 'yucks', 'yucky', 'yuk', 'yuks', 'yule', 'yules', 'yum', 'yummy', 'yup', 'yuppy', 'yups', 'yurt', 'yurts', 'zany', 'zap', 'zaps', 'zeal', 'zeals', 'zebra', 'zebu', 'zebus', 'zed', 'zeds', 'zero', 'zeros', 'zest', 'zests', 'zesty', 'zeta', 'zetas', 'zilch', 'zinc', 'zincs', 'zing', 'zings', 'zingy', 'zip', 'zippy', 'zips', 'zit', 'zits', 'zloty', 'zombi', 'zonal', 'zone', 'zoned', 'zones', 'zoo', 'zoom', 'zooms', 'zoos']));
// CONCATENATED MODULE: ./lib/universal/input-validation-info/approve.js
//---------//
// Imports //
//---------//



 //
//------//
// Main //
//------//

const approveEach = arrayOfApprovals => {
  //
  // each approval is ready to lazily call.  No arguments are needed.  If an
  //   error message is returned then the remaining approvals are not executed
  //
  return Object(fes["q" /* findFirstWhen */])(fes["z" /* invoke */])(arrayOfApprovals);
}; //
// see above README to understand why each approval function returns a
//   wrapper function
//


const createApprover = ({
  fieldName,
  value
}) => {
  return {
    containedIn,
    doesNotContain,
    hasLength,
    isLadenString,
    isValidWord,
    maxLength,
    noDuplicateLetters // scoped helper functions

  };

  function containedIn(setOfValues) {
    return () => {
      if (!Object(fes["j" /* containedIn */])(setOfValues)(value)) {
        return external_tedent_default()(`
          ${fieldName} must be one of the available values

          available values: ${Object(fes["C" /* join */])(', ')(setOfValues)}
          value given: ${Object(utils["y" /* truncate */])(value)}
        `);
      }
    };
  }

  function doesNotContain(aString) {
    return () => {
      if (Object(fes["k" /* contains */])(aString)(value)) {
        return external_tedent_default()(`
          ${fieldName} cannot contain newlines
          value: ${Object(utils["y" /* truncate */])(value)}
        `);
      }
    };
  }

  function hasLength(n) {
    return () => {
      if (value.length !== n) {
        return external_tedent_default()(`
          ${fieldName} must have ${n} characters
          value.length: ${value.length}
          value: ${Object(utils["y" /* truncate */])(value)}
        `);
      }
    };
  }

  function isValidWord() {
    if (!set_of_valid_words.has(value)) {
      return external_tedent_default()(`
        ${fieldName} must be a valid word
        value: ${Object(utils["y" /* truncate */])(value)}
      `);
    }
  }

  function isLadenString() {
    return helper_isLadenString(fieldName)(value);
  }

  function maxLength(max) {
    return () => {
      if (value.length > max) {
        return external_tedent_default()(`
          ${fieldName} cannot be greater than ${max} characters
          max length: ${max}
          value.length: ${value.length}
          value: ${Object(utils["y" /* truncate */])(value)}
        `);
      }
    };
  }

  function noDuplicateLetters() {
    if (new Set(value).size !== value.length) {
      return external_tedent_default()(`
        ${fieldName} cannot have duplicate letters
        string passed: ${value}
      `);
    }
  }
};

const approve_isLadenString = helper_isLadenString; //
//------------------//
// Helper Functions //
//------------------//

function helper_isLadenString(fieldName) {
  return value => {
    if (typeof value !== 'string' || !value) {
      return external_tedent_default()(`
        ${fieldName} must be a non-empty string
        typeof value: ${typeof value}
        value: ${Object(utils["y" /* truncate */])(value)}
      `);
    }
  };
} //
//---------//
// Exports //
//---------//



// CONCATENATED MODULE: ./lib/universal/input-validation-info/index.js
//
// README
//   - This structure is very brittle atm because I'm still trying to figure out
//     a clean way to share these structures between the back and frontends.
//     At first I thought all forms would share validation info with a post
//     endpoint but this is not true for forms which have no submit button.
//     Anyway, we can refactor it later so let's move forward!
//
//---------//
// Imports //
//---------//





 //
//------//
// Init //
//------//

const commitHashRe = /^[a-f0-9]{40}$/i,
      initPlayer = getInitPlayerValidationInfo(); //
//------//
// Main //
//------//

const inputValidationInfo = Object(fes["K" /* map */])(normalize)({
  createARoom: {
    player1Email: {},
    player2Email: {}
  },
  displayName: {
    displayName: initPlayer.displayName
  },
  emailResubscribe: {
    type: {
      approve: types["a" /* approveEmailType */].unsubscribe
    }
  },
  emailUnsubscribe: {
    type: {
      approve: types["a" /* approveEmailType */].unsubscribe
    }
  },
  guess: {
    guess: {
      approve: value => {
        if (value && typeof value === 'string') {
          value = value.toLowerCase().trim();
        }

        const {
          isLadenString,
          isValidWord,
          maxLength
        } = createApprover({
          fieldName: 'guess',
          value
        });
        return approveEach([isLadenString, maxLength(5), isValidWord]);
      }
    }
  },
  initPlayer,
  log: {
    commitHash: {
      approve: value => {
        if (!commitHashRe.test(value)) {
          return external_tedent_default()(`
              commitHash must match the regex ${commitHashRe.toString()}
              value: ${Object(utils["y" /* truncate */])(value)}
            `);
        }
      }
    },
    context: {
      approve: value => {
        const {
          doesNotContain,
          isLadenString,
          maxLength
        } = createApprover({
          fieldName: 'context',
          value
        });
        return approveEach([isLadenString, maxLength(500), doesNotContain('\n')]);
      }
    },
    environment: {
      approve: value => {
        const {
          containedIn
        } = createApprover({
          fieldName: 'environment',
          value
        });
        return containedIn(['client', 'server', 'ssr']);
      }
    },
    message: {
      approve: approve_isLadenString('message')
    },
    other: {
      isRequired: false
    },
    stack: {
      approve: approve_isLadenString('stack')
    }
  },
  revealLetter: {
    chosenLetter: {
      approve: value => {
        const {
          hasLength,
          isLadenString
        } = createApprover({
          fieldName: 'chosenLetter',
          value
        });
        return approveEach([isLadenString, hasLength(1)]);
      }
    }
  },
  secretWord: {
    secretWord: initPlayer.secretWord
  },
  understands: {
    understands: {
      approve: value => {
        const {
          containedIn
        } = createApprover({
          fieldName: 'understands',
          value
        });
        return containedIn(set_of_understands_keys["a" /* default */]);
      }
    }
  }
}); //
//------------------//
// Helper Functions //
//------------------//

function getInitPlayerValidationInfo() {
  return {
    displayName: {
      approve: value => {
        const {
          isLadenString,
          maxLength
        } = createApprover({
          fieldName: 'displayName',
          value
        });
        return approveEach([isLadenString, maxLength(15)]);
      }
    },
    secretWord: {
      approve: value => {
        if (value && typeof value === 'string') {
          value = value.toLowerCase().trim();
        }

        const approver = createApprover({
          fieldName: 'secretWord',
          value
        });
        const {
          isLadenString,
          hasLength,
          isValidWord,
          noDuplicateLetters
        } = approver;
        return approveEach([isLadenString, hasLength(5), noDuplicateLetters, isValidWord]);
      }
    }
  };
}

function normalize(inputIdToValidationInfo, _unused_apiEndpointKey) {
  return Object(fes["K" /* map */])(Object(fes["g" /* assignOver */])({
    approve: utils["c" /* approveIsLaden */],
    isRequired: true
  }))(inputIdToValidationInfo);
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var input_validation_info = __webpack_exports__["a"] = (inputValidationInfo);

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var fes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
//---------//
// Imports //
//---------//
 //
//------//
// Main //
//------//

const client = {
  'initially-hidden': addClientStylesIfTruthy({
    visibility: 'hidden',
    opacity: 0
  }),
  'initially-removed': addClientStylesIfTruthy({
    display: 'none'
  }) //
  // custom ssr directives must be used on dom elements (not vue components) until
  //   this issue is fixed:
  //   https://github.com/vuejs/vue/issues/8551
  //

};
const ssr = {
  'initially-hidden': addSsrStylesIfTruthy({
    visibility: 'hidden',
    opacity: 0
  }),
  'initially-removed': addSsrStylesIfTruthy({
    display: 'none'
  }) //
  //------------------//
  // Helper Functions //
  //------------------//

};

function addClientStylesIfTruthy(styles) {
  return {
    bind(element, {
      expression,
      value
    }) {
      if (value || expression === undefined) Object(fes__WEBPACK_IMPORTED_MODULE_0__[/* forEach */ "s"])((val, key) => element.style[key] = val)(styles);
    }

  };
}

function addSsrStylesIfTruthy(styles) {
  return (vnodeWithData, vnodeDirective) => {
    const {
      expression,
      value
    } = vnodeDirective;
    if (value || expression === undefined) addStylesToVNode(styles, vnodeWithData);
  };
} //
// This code is ripped from:
//   https://github.com/vuejs/vue/blob/52719ccab8fccffbdf497b96d3731dc86f04c1ce/src/platforms/web/server/directives/show.js
//


function addStylesToVNode(styles, vnode) {
  const currentVNodeStyle = vnode.data.style || (vnode.data.style = {});

  if (Array.isArray(currentVNodeStyle)) {
    currentVNodeStyle.push(styles);
  } else {
    Object(fes__WEBPACK_IMPORTED_MODULE_0__[/* mAssignOver */ "H"])(currentVNodeStyle)(styles);
  }
} //
//---------//
// Exports //
//---------//


/* harmony default export */ __webpack_exports__["a"] = ({
  client,
  ssr
});

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("lru-cache");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("koa-compress");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("koa-vue-ssr_init-dev-server");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("koa-useragent");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("decamelize");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("error-stack-parser");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("lodash/random");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("object-inspect");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("universal-eol");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("sourcemapped-stacktrace");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("hashids");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("@koa/cors");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(handlebars__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var project_root_config_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var server_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var fes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var universal_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2);
//
// README
//   - unfortunateley there doesn't seem to be a great way to automatically
//     validate compiled template input.  The below approach is manual.
//
//---------//
// Imports //
//---------//






 //
//------//
// Init //
//------//

const globalTemplateVariables = getGlobalTemplateVariables(),
      templateNameToRequiredProperties = getTemplateNameToRequiredProperties();
registerHandlebarsHelpers(); //
//------//
// Main //
//------//

let templateNameToCompile;

const getTemplateNameToCompile = () => {
  if (!templateNameToCompile) {
    templateNameToCompile = Object(universal_utils__WEBPACK_IMPORTED_MODULE_6__[/* resolveAllProperties */ "u"])({
      youAreInvited: readTemplates('you-are-invited'),
      youCreatedARoom: readTemplates('you-created-a-room')
    }).then(templateNameToHtmlAndText => {
      return Object(fes__WEBPACK_IMPORTED_MODULE_5__[/* passThrough */ "Q"])(templateNameToHtmlAndText, [Object(fes__WEBPACK_IMPORTED_MODULE_5__[/* mMap */ "I"])(compileHtmlAndText), Object(fes__WEBPACK_IMPORTED_MODULE_5__[/* mMap */ "I"])(toCompileFunction)]);
    });
  }

  return templateNameToCompile;
}; //
//------------------//
// Helper Functions //
//------------------//


function compileHtmlAndText(htmlAndText) {
  return Object(fes__WEBPACK_IMPORTED_MODULE_5__[/* mMap */ "I"])(handlebars__WEBPACK_IMPORTED_MODULE_1___default.a.compile)(htmlAndText);
} //
// This method should only ever be called on pre-validated input, so I'm only
//   going to perform light validation here as a sanity check.
//


function toCompileFunction(compiledHtmlAndText, templateName) {
  const approve = Object(universal_utils__WEBPACK_IMPORTED_MODULE_6__[/* createApproveSimpleInput */ "f"])(`compiling template '${templateName}'`),
        requiredProperties = templateNameToRequiredProperties[templateName];
  return approveThenCompile;

  function approveThenCompile(...arrayOfArguments) {
    const maybeError = approve(arrayOfArguments, requiredProperties) || Object(universal_utils__WEBPACK_IMPORTED_MODULE_6__[/* approveAllPropertiesAreLaden */ "a"])(arrayOfArguments[0]);
    if (maybeError) return {
      error: maybeError
    };
    const finalTemplateVariables = Object(fes__WEBPACK_IMPORTED_MODULE_5__[/* combine */ "h"])(arrayOfArguments[0])(globalTemplateVariables);
    return Object(fes__WEBPACK_IMPORTED_MODULE_5__[/* map */ "K"])(Object(fes__WEBPACK_IMPORTED_MODULE_5__[/* apply */ "e"])([finalTemplateVariables]))(compiledHtmlAndText);
  }
} //
// Per usual - input must be an object whose properties match the expected
//   template variables
//


function getTemplateNameToRequiredProperties() {
  return {
    youAreInvited: new Set(['emailSentHash', 'playerHash', 'roomHash']),
    youCreatedARoom: new Set(['emailSentHash', 'playerHash', 'roomHash'])
  };
}

function readTemplates(fileName) {
  return Object(universal_utils__WEBPACK_IMPORTED_MODULE_6__[/* resolveAllProperties */ "u"])({
    html: Object(server_utils__WEBPACK_IMPORTED_MODULE_4__[/* readFile */ "g"])(path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve(__dirname, `./templates/${fileName}.inline.html`)),
    text: Object(server_utils__WEBPACK_IMPORTED_MODULE_4__[/* readFile */ "g"])(path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve(__dirname, `./templates/${fileName}.txt`))
  });
}

function getGlobalTemplateVariables() {
  return {
    global: {
      externalBaseUrl: project_root_config_app__WEBPACK_IMPORTED_MODULE_3__[/* baseUrl */ "a"].external
    }
  };
}

function registerHandlebarsHelpers() {
  //
  // This helper is used to prevent gmail from quoting text
  //   from here: https://stackoverflow.com/a/41191561/984407
  //
  handlebars__WEBPACK_IMPORTED_MODULE_1___default.a.registerHelper('invisibleRandomSpan', () => {
    const time = String(Date.now()),
          hash = crypto__WEBPACK_IMPORTED_MODULE_0___default.a.createHash('md5').update(time).digest('hex').substr(0, 5);
    return `<span style="display: none !important;">${hash}</span>`;
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ __webpack_exports__["a"] = (getTemplateNameToCompile);
/* WEBPACK VAR INJECTION */}.call(this, "lib/server/email"))

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_bodyparser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var server_api_couchdb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _websocket_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
/* harmony import */ var universal_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
//---------//
// Imports //
//---------//




 //
//------//
// Main //
//------//

const createDebugRouter = currentFixtureName => createPostRevertToFixture(new koa_router__WEBPACK_IMPORTED_MODULE_1___default.a(), Object(universal_utils__WEBPACK_IMPORTED_MODULE_4__[/* dashelize */ "h"])(currentFixtureName)); //
//------------------//
// Helper Functions //
//------------------//


function createPostRevertToFixture(...args) {
  const [debugRouter, initialFixtureName] = args,
        websocketServer = _websocket_server__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].debug();
  return debugRouter.use(koa_bodyparser__WEBPACK_IMPORTED_MODULE_0___default()()).post('/revert-to-fixture', ctx => {
    const {
      fixtureName = initialFixtureName
    } = ctx.request.body;
    return server_api_couchdb__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].revertToFixture(fixtureName).then(() => {
      websocketServer.broadcast('reload page');
      ctx.status = 200;
      ctx.body = {
        result: `fixture '${fixtureName}' successfully reverted`
      };
    });
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ __webpack_exports__["a"] = (createDebugRouter);

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var server_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
//---------//
// Imports //
//---------//

 //
//------//
// Main //
//------//

const createPageRouter = getRenderer => {
  const pageRouter = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a();
  return pageRouter.get('*', ctx => {
    const {
      renderToString
    } = getRenderer(),
          vueContext = {
      url: ctx.url
    };
    return renderToString(vueContext).then(html => {
      ctx.status = vueContext.httpStatusCode;
      ctx.body = html;
    }).catch(error => {
      server_log__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].server.error('unexpected error occurred during renderToString', error);
      return Promise.reject(error);
    });
  });
}; //
//---------//
// Exports //
//---------//


/* harmony default export */ __webpack_exports__["a"] = (createPageRouter);

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("vue-server-renderer");

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var rate_limit_namespaceObject = {};
__webpack_require__.r(rate_limit_namespaceObject);
__webpack_require__.d(rate_limit_namespaceObject, "allRequests", function() { return allRequests; });
__webpack_require__.d(rate_limit_namespaceObject, "perIp", function() { return perIp; });
var log_rate_limit_namespaceObject = {};
__webpack_require__.r(log_rate_limit_namespaceObject);
__webpack_require__.d(log_rate_limit_namespaceObject, "allRequests", function() { return rate_limit_allRequests; });
__webpack_require__.d(log_rate_limit_namespaceObject, "perIp", function() { return rate_limit_perIp; });

// EXTERNAL MODULE: external "koa-bodyparser"
var external_koa_bodyparser_ = __webpack_require__(23);
var external_koa_bodyparser_default = /*#__PURE__*/__webpack_require__.n(external_koa_bodyparser_);

// EXTERNAL MODULE: external "koa-router"
var external_koa_router_ = __webpack_require__(7);
var external_koa_router_default = /*#__PURE__*/__webpack_require__.n(external_koa_router_);

// EXTERNAL MODULE: external "koa-useragent"
var external_koa_useragent_ = __webpack_require__(41);
var external_koa_useragent_default = /*#__PURE__*/__webpack_require__.n(external_koa_useragent_);

// EXTERNAL MODULE: external "couchdb-base64"
var external_couchdb_base64_ = __webpack_require__(6);
var external_couchdb_base64_default = /*#__PURE__*/__webpack_require__.n(external_couchdb_base64_);

// EXTERNAL MODULE: external "tedent"
var external_tedent_ = __webpack_require__(3);
var external_tedent_default = /*#__PURE__*/__webpack_require__.n(external_tedent_);

// EXTERNAL MODULE: ./lib/server/db/index.js + 7 modules
var db = __webpack_require__(1);

// EXTERNAL MODULE: ./lib/server/log/index.js + 2 modules
var log = __webpack_require__(9);

// CONCATENATED MODULE: ./create/router/api/helpers.js
//---------//
// Imports //
//---------//

 //
//------//
// Main //
//------//
//
// It's worth noting that any errors reaching this function which aren't already
//   handled means there is a bug.  All async operations are in charge of
//   logging their own contextual errors and providing a friendly error message
//   for end users.  Granted even those errors are either bugs or people messing
//   with the api, but those are expected.
//

const createHandleErrorDuringRoute = (ctx, createErrorMessage) => error => {
  ctx.status = 500;

  if (error.isHandled) {
    ctx.body = {
      error: error.friendlyMessage
    };
    return;
  }

  const possiblyAsyncErrorMessage = createErrorMessage(ctx);
  return Promise.resolve(possiblyAsyncErrorMessage).then(message => {
    message.detailed += '\n\n';
    message.detailed += external_tedent_default()(`
      Note: This should be looked into because it means we missed handling an
            error somewhere.
    `);
    log["a" /* default */].server.error(message.detailed, error);
    ctx.body = {
      error: `An error occurred while ${message.friendly}`
    };
  });
}; //
//---------//
// Exports //
//---------//



// EXTERNAL MODULE: ./lib/server/utils.js + 1 modules
var utils = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/fes/index.js + 199 modules
var fes = __webpack_require__(0);

// CONCATENATED MODULE: ./create/router/api/email/resubscribe.js
//---------//
// Imports //
//---------//






 //
//------//
// Init //
//------//

const ifRequestIsValid = Object(utils["b" /* createIfRequestIsValid */])('emailUnsubscribe'),
      optionsForGet = {
  allow404: true,
  returnRawResponse: true //
  //------//
  // Main //
  //------//

};

const createResubscribeRouter = () => createPostRoute(new external_koa_router_default.a()); //
//------------------//
// Helper Functions //
//------------------//
//
// Returns one of two success results
// {
//   result: 'already subscribed' | 'subscribed successfully'
// }
//


function createPostRoute(resubscribeRouter) {
  return resubscribeRouter.post('/:emailSentHash', ifRequestIsValid(ctx => {
    const {
      emailSentHash
    } = ctx.params,
          {
      type
    } = ctx.request.body,
          handleError = createHandleErrorDuringRoute(ctx, resubscribe_createErrorMessage);

    try {
      const resubscribeToType = createResubscribeToType(ctx, type);
      return db["b" /* dal */].emailSent.get({
        _id: Object(db["e" /* hashToDocid */])(emailSentHash)
      }, optionsForGet).then(Object(utils["e" /* ifResponseIsNot404 */])(ctx, resubscribeToType)).catch(handleError);
    } catch (error) {
      return handleError(error);
    }
  }));
}

function createResubscribeToType(ctx, type) {
  return ({
    to: encryptedEmail
  }) => db["b" /* dal */].emailUnsubscription.get({
    _id: external_couchdb_base64_default.a.encodeFromString(encryptedEmail)
  }).then(({
    _id,
    _rev,
    types: unsubscribedTypes
  }) => {
    // remember we're subscribed if we're _not_ unsubscribed
    const isAlreadySubscribed = !Object(fes["j" /* containedIn */])(unsubscribedTypes)(type);
    if (isAlreadySubscribed) return {
      result: 'already subscribed'
    };
    const updatedTypes = Object(fes["m" /* discard */])(type)(unsubscribedTypes);
    return db["b" /* dal */].emailUnsubscription.update({
      _id,
      _rev,
      types: updatedTypes
    }).then(Object(fes["b" /* alwaysReturn */])({
      result: 'subscribed successfully'
    }));
  }).then(result => {
    ctx.status = 200;
    ctx.body = result;
  });
}

function resubscribe_createErrorMessage(ctx) {
  const {
    emailSentHash
  } = ctx.params,
        {
    type
  } = ctx.request.body;
  return {
    friendly: 'attempting to update your unsubscribe settings',
    detailed: external_tedent_default()(`
      error occurred during POST resubscribe
        hash: ${emailSentHash}
        type: ${type}
    `)
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var resubscribe = (createResubscribeRouter);
// EXTERNAL MODULE: external "@koa/cors"
var cors_ = __webpack_require__(50);
var cors_default = /*#__PURE__*/__webpack_require__.n(cors_);

// EXTERNAL MODULE: ./lib/universal/email/types.js
var types = __webpack_require__(12);

// CONCATENATED MODULE: ./create/router/api/email/unsubscribe/via-encrypted-email.js
//---------//
// Imports //
//---------//




 //
//------//
// Init //
//------//

const via_encrypted_email_optionsForGet = {
  allow404: true,
  returnRawResponse: true
},
      typeToUnsubscribe = createTypeToUnsubscribe(); //
//------//
// Main //
//------//
//
// Returns one of two success results
// {
//   result: 'already unsubscribed' | 'unsubscribed successfully'
// }
//

const unsubscribe = (encryptedEmail, emailType) => typeToUnsubscribe[emailType](encryptedEmail); //
//------------------//
// Helper Functions //
//------------------//


function createTypeToUnsubscribe() {
  return Object(fes["U" /* reduce */])(toUnsubscribeFunctions, {})(types["b" /* validEmailTypes */].unsubscribe);
}

function toUnsubscribeFunctions(typeToFunction, type) {
  return Object(fes["J" /* mSet */])(type, unsubscribeFromType)(typeToFunction);

  function unsubscribeFromType(encryptedEmail) {
    const _id = external_couchdb_base64_default.a.encodeFromString(encryptedEmail);

    return db["b" /* dal */].emailUnsubscription.get({
      _id
    }, via_encrypted_email_optionsForGet).then(response => {
      if (response.status === 404) {
        return db["b" /* dal */].emailUnsubscription.create({
          _id,
          types: [type]
        }).then(Object(fes["b" /* alwaysReturn */])({
          result: 'unsubscribed successfully'
        }));
      } else {
        // not 404
        const {
          types: currentTypes
        } = response.data,
              setOfCurrentTypes = new Set(currentTypes);
        if (setOfCurrentTypes.has(type)) return {
          result: 'already unsubscribed'
        };
        const {
          _rev
        } = response.data;
        return db["b" /* dal */].emailUnsubscription.update({
          _rev,
          _id,
          types: Object(fes["G" /* mAppend */])(type)(currentTypes)
        }).then(Object(fes["b" /* alwaysReturn */])({
          result: 'unsubscribed successfully'
        }));
      }
    }).catch(Object(utils["a" /* createHandleServerError */])(via_encrypted_email_createErrorMessage, [encryptedEmail]));
  }
} //
//------------------//
// Helper Functions //
//------------------//


function via_encrypted_email_createErrorMessage(encryptedEmail) {
  return {
    friendly: 'unsubscribing your email',
    detailed: `error creating or retrieving the emailUnsubscription with the encrypted email '${encryptedEmail}'`
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var via_encrypted_email = (unsubscribe);
// CONCATENATED MODULE: ./create/router/api/email/unsubscribe/via-email-sent-hash.js



const unsubscribeViaEmailSentHash = (emailSentHash, emailType) => db["b" /* dal */].emailSent.get({
  _id: Object(db["e" /* hashToDocid */])(emailSentHash)
}).then(({
  to: encryptedEmail
}) => via_encrypted_email(encryptedEmail, emailType));

/* harmony default export */ var via_email_sent_hash = (unsubscribeViaEmailSentHash);
// CONCATENATED MODULE: ./create/router/api/email/unsubscribe/index.js
//---------//
// Imports //
//---------//







 //
//------//
// Init //
//------//

const unsubscribe_createErrorMessage = getCreateErrorMessage(),
      unsubscribe_ifRequestIsValid = Object(utils["b" /* createIfRequestIsValid */])('emailUnsubscribe'),
      //
// each email sent has an associated type which the List-Unsubscribe header is
//   bound to.
//
listOfApplicableTypes = Object(fes["C" /* join */])('|')(types["b" /* validEmailTypes */].send); //
//------//
// Main //
//------//

const createUnsubscribeRouter = () => Object(fes["Q" /* passThrough */])(new external_koa_router_default.a(), [createListUnsubscribeRoute, unsubscribe_createPostRoute]); //
//------------------//
// Helper Functions //
//------------------//
//
// these non-restful route is for the List-Unsubscribe header
//


function createListUnsubscribeRoute(unsubscribeRouter) {
  const nonRestfulUrl = `/:emailType(${listOfApplicableTypes})/:emailSentHash`;
  return unsubscribeRouter.post(nonRestfulUrl, cors_default()(), ctx => {
    const {
      emailSentHash,
      emailType
    } = ctx.params,
          handleError = createHandleErrorDuringRoute(ctx, unsubscribe_createErrorMessage.nonRestful.post);

    try {
      return via_email_sent_hash(emailSentHash, emailType).then(result => {
        ctx.status = 200;
        ctx.body = result;
      }).catch(handleError);
    } catch (error) {
      return handleError(error);
    }
  });
} //
// this more restful POST routes are called by the unsubscribe views triggered
//   by users clicking the unsubscribe confirmation button
//


function unsubscribe_createPostRoute(unsubscribeRouter) {
  return unsubscribeRouter.post('/:emailSentHash', unsubscribe_ifRequestIsValid(ctx => {
    const {
      emailSentHash
    } = ctx.params,
          {
      type
    } = ctx.request.body,
          handleError = createHandleErrorDuringRoute(ctx, unsubscribe_createErrorMessage.post);

    try {
      return via_email_sent_hash(emailSentHash, type).then(result => {
        ctx.status = 200;
        ctx.body = result;
      }).catch(handleError);
    } catch (error) {
      return handleError(error);
    }
  }));
}

function getCreateErrorMessage() {
  const friendly = 'attempting to update your unsubscribe settings';
  return {
    nonRestful: {
      post: ctx => {
        const {
          emailSentHash,
          emailSentType
        } = ctx.params;
        return {
          friendly,
          detailed: external_tedent_default()(`
            error occurred during non-restful POST unsubscribe
              hash: ${emailSentHash}
              emailSentType: ${emailSentType}
          `)
        };
      }
    },
    post: ctx => {
      const {
        emailSentHash
      } = ctx.params,
            {
        type
      } = ctx.request.body;
      return {
        friendly,
        detailed: external_tedent_default()(`
          error occurred during POST unsubscribe
            hash: ${emailSentHash}
            type: ${type}
        `)
      };
    }
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var email_unsubscribe = (createUnsubscribeRouter);
// CONCATENATED MODULE: ./create/router/api/email/unsubscriptions.js
//---------//
// Imports //
//---------//




 //
//------//
// Init //
//------//

const unsubscriptions_optionsForGet = {
  allow404: true,
  returnRawResponse: true //
  //------//
  // Main //
  //------//

};

const createUnsubscriptionsRouter = () => createGetRoute(new external_koa_router_default.a()); //
//------------------//
// Helper Functions //
//------------------//


function createGetRoute(unsubscriptionsRouter) {
  return unsubscriptionsRouter.get('/:emailSentHash', ctx => {
    const {
      emailSentHash
    } = ctx.params,
          handleError = createHandleErrorDuringRoute(ctx, unsubscriptions_createErrorMessage);

    try {
      const returnUnsubscriptions = createReturnUnsubscriptions(ctx);
      return Promise.resolve().then(() => db["b" /* dal */].emailSent.get({
        _id: Object(db["e" /* hashToDocid */])(emailSentHash)
      }, unsubscriptions_optionsForGet)).then(Object(utils["e" /* ifResponseIsNot404 */])(ctx, returnUnsubscriptions)).catch(handleError);
    } catch (error) {
      return handleError(error);
    }
  });
}

function createReturnUnsubscriptions(ctx) {
  return ({
    to: encryptedEmail
  }) => {
    const _id = external_couchdb_base64_default.a.encodeFromString(encryptedEmail);

    return db["b" /* dal */].emailUnsubscription.get({
      _id
    }, unsubscriptions_optionsForGet).then(response => {
      const types = response.status === 404 ? [] : response.data.types;
      ctx.status = 200;
      ctx.body = {
        types
      };
      return;
    });
  };
}

function unsubscriptions_createErrorMessage(ctx) {
  const {
    emailSentHash
  } = ctx.params;
  return {
    friendly: 'attempting to retrieve unsubscribe settings',
    detailed: `error occurred during GET unsubscribe for the hash '${emailSentHash}'`
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var unsubscriptions = (createUnsubscriptionsRouter);
// CONCATENATED MODULE: ./create/router/api/email/index.js
//---------//
// Imports //
//---------//



 //
//------//
// Main //
//------//

const createEmailRouter = () => {
  const emailRouter = new external_koa_router_default.a(),
        resubscribeRouter = resubscribe(),
        unsubscribeRouter = email_unsubscribe(),
        unsubscriptionsRouter = unsubscriptions();
  emailRouter.use('/resubscribe', resubscribeRouter.routes(), resubscribeRouter.allowedMethods()); //
  // The unsubscribe endpoint exists because we must use GET to unsubscribe from
  //   emails.  It is not restful and shouldn't be used from the app.  Without
  //   this restriction we
  //

  emailRouter.use('/unsubscribe', unsubscribeRouter.routes(), unsubscribeRouter.allowedMethods());
  return emailRouter.use('/unsubscriptions', unsubscriptionsRouter.routes(), unsubscriptionsRouter.allowedMethods());
}; //
//---------//
// Exports //
//---------//


/* harmony default export */ var api_email = (createEmailRouter);
// EXTERNAL MODULE: ./lib/universal/utils.js + 9 modules
var universal_utils = __webpack_require__(2);

// CONCATENATED MODULE: ./create/router/api/room/helpers.js
//---------//
// Imports //
//---------//



 //
//------//
// Init //
//------//

const helpers_optionsForGet = {
  allow404: true,
  returnRawResponse: true //
  //------//
  // Main //
  //------//

};

const attachToState = something => (ctx, next) => {
  Object(fes["H" /* mAssignOver */])(ctx.state)(something);
  return next();
};

const authorize = ctx => {
  try {
    const {
      roomHash
    } = ctx.params;
    const playerHash = ctx.state.routeName === 'getRoom' ? ctx.request.query['player-hash'] : ctx.params.playerHash;
    return db["b" /* dal */].activeRoom.get({
      _id: Object(db["e" /* hashToDocid */])(roomHash)
    }, helpers_optionsForGet).then(Object(utils["e" /* ifResponseIsNot404 */])(ctx, roomData => {
      const {
        player1Hash,
        player2Hash
      } = roomData,
            possiblePlayerHashes = new Set([player1Hash, player2Hash]);

      if (!possiblePlayerHashes.has(playerHash)) {
        ctx.status = 404;
        ctx.body = {
          error: "The room isn't associated with your specified playerHash"
        };
        return {
          is404: true
        };
      } else {
        return {
          ctx,
          currentPlayerHash: playerHash,
          player1Hash,
          player2Hash,
          roomData
        };
      }
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

const getRoomAndPlayers = arg => {
  const {
    roomData
  } = arg;
  return getCurrentAndOtherPlayerData(arg).then(result => Object(fes["H" /* mAssignOver */])(result)({
    roomData
  }));
};

const getCurrentAndOtherPlayerData = arg => {
  const {
    ctx,
    currentPlayerHash,
    player1Hash,
    player2Hash
  } = arg;
  return Promise.all([db["b" /* dal */].player.get({
    _id: Object(db["e" /* hashToDocid */])(player1Hash)
  }), db["b" /* dal */].player.get({
    _id: Object(db["e" /* hashToDocid */])(player2Hash)
  })]).then(([player1Data, player2Data]) => {
    const [currentPlayer, otherPlayer] = currentPlayerHash === player1Hash ? [player1Data, player2Data] : [player2Data, player1Data];
    return {
      ctx,
      currentPlayer,
      otherPlayer
    };
  });
};

const getCurrentPlayerData = ({
  ctx,
  currentPlayerHash
}) => {
  return Object(universal_utils["u" /* resolveAllProperties */])({
    ctx,
    currentPlayer: db["b" /* dal */].player.get({
      _id: Object(db["e" /* hashToDocid */])(currentPlayerHash)
    })
  });
};

const getOtherPlayerData = ({
  ctx,
  currentPlayerHash,
  roomData
}) => {
  const {
    player1Hash,
    player2Hash
  } = roomData,
        otherPlayerHash = currentPlayerHash === player1Hash ? player2Hash : player1Hash;
  return Object(universal_utils["u" /* resolveAllProperties */])({
    ctx,
    otherPlayer: db["b" /* dal */].player.get({
      _id: Object(db["e" /* hashToDocid */])(otherPlayerHash)
    })
  });
};

const sanitize = {
  player: {
    current: Object(fes["R" /* pickAll */])(['number', 'displayName', 'guesses', 'hasEnteredGame', 'secretWord']),
    other: Object(fes["r" /* flow */])([Object(fes["R" /* pickAll */])(['displayName', 'guesses', 'hasEnteredGame', 'secretWord']), changeSecretWordToHasSecretWord])
  },
  room: Object(fes["R" /* pickAll */])(['playerNumberTurn']) //
  //------------------//
  // Helper Functions //
  //------------------//

};

function changeSecretWordToHasSecretWord(data) {
  data.hasWord = !!data.secretWord;
  delete data.secretWord;
  return data;
} //
//---------//
// Exports //
//---------//



// CONCATENATED MODULE: ./create/router/api/room/get.js
//---------//
// Imports //
//---------//







 //
//------//
// Main //
//------//

function get_createGetRoute({
  router
}) {
  router.get('/:roomHash', attachToState({
    routeName: 'getRoom'
  }), getRoom);
}

function getRoom(ctx) {
  const playerHash = ctx.request.query['player-hash'];

  if (!playerHash) {
    ctx.status = 400;
    ctx.body = {
      error: "the query parameter 'player-hash' is required"
    };
    return;
  }

  const handleError = createHandleErrorDuringRoute(ctx, get_createErrorMessage);
  return authorize(ctx).then(Object(utils["f" /* ifStatusIsNot404 */])(Object(universal_utils["r" /* promiseFlow */])([getRoomAndPlayers, getGuideForCurrentPlayer, sanitizeAndReturnAllData]))).catch(handleError);
}

function getGuideForCurrentPlayer(result) {
  const {
    encryptedEmail
  } = result.currentPlayer,
        _id = external_couchdb_base64_default.a.encodeFromString(encryptedEmail);

  return db["b" /* dal */].guide.get({
    _id
  }).then(guide => Object(fes["H" /* mAssignOver */])(result)({
    guide
  }));
}

function sanitizeAndReturnAllData(result) {
  const {
    ctx,
    guide,
    roomData,
    currentPlayer,
    otherPlayer
  } = result;
  ctx.status = 200;
  ctx.body = {
    currentPlayer: sanitize.player.current(currentPlayer),
    guide: Object(db["g" /* removeCouchdbProperties */])(guide),
    otherPlayer: sanitize.player.other(otherPlayer),
    room: sanitize.room(roomData)
  };
}

function get_createErrorMessage(ctx) {
  const {
    roomHash
  } = ctx.params,
        playerHash = ctx.request.query['player-hash'];
  return {
    friendly: 'retrieving player data',
    detailed: external_tedent_default()(`
      during GET player
        playerHash: ${playerHash}
        roomHash: ${roomHash}
    `)
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var get = (get_createGetRoute);
// CONCATENATED MODULE: ./create/router/api/room/post/disable-guide.js
//---------//
// Imports //
//---------//






 //
//------//
// Main //
//------//

function createPostDisableGuide({
  router
}) {
  router.post('/:roomHash/player/:playerHash/disable-guide', ctx => {
    const handleError = createHandleErrorDuringRoute(ctx, disable_guide_createErrorMessage);
    return authorize(ctx).then(Object(utils["f" /* ifStatusIsNot404 */])(Object(universal_utils["r" /* promiseFlow */])([getCurrentPlayerData, disableGuideAndReturnResult]))).catch(handleError);
  });
}

function disableGuideAndReturnResult({
  ctx,
  currentPlayer
}) {
  const {
    encryptedEmail
  } = currentPlayer,
        _id = external_couchdb_base64_default.a.encodeFromString(encryptedEmail);

  return db["b" /* dal */].guide.get({
    _id
  }).then(guideData => {
    guideData.isActive = false;
    return db["b" /* dal */].guide.update(guideData);
  }).then(() => {
    ctx.body = {
      result: 'guide successfully disabled'
    };
    ctx.status = 200;
  });
}

function disable_guide_createErrorMessage(ctx) {
  const {
    playerHash,
    roomHash
  } = ctx.params;
  return {
    friendly: 'disabling your guide',
    detailed: external_tedent_default()(`
      error occurred during POST disable-guide
        roomHash: ${roomHash}
        playerHash: ${playerHash}
    `)
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var disable_guide = (createPostDisableGuide);
// CONCATENATED MODULE: ./create/router/api/room/post/helpers.js
//---------//
// Imports //
//---------//

 //
//------//
// Main //
//------//

const notifyOtherPlayer = {
  displayName: arg => {
    const {
      otherPlayer,
      updatedCurrentPlayer
    } = arg;
    arg.ctx.state.websocketServer.maybeUpdateClient({
      playerHash: Object(db["d" /* docidToHash */])(otherPlayer._id),
      data: {
        id: 'otherPlayerEnteredDisplayName',
        data: {
          commitOrDispatch: 'commit',
          type: 'room/updateOtherPlayer',
          payload: {
            otherPlayer: sanitize.player.other(updatedCurrentPlayer)
          }
        }
      }
    });
    return arg;
  } //
  //---------//
  // Exports //
  //---------//

};

// CONCATENATED MODULE: ./create/router/api/room/post/display-name.js
//---------//
// Imports //
//---------//







 //
//------//
// Init //
//------//

const display_name_ifRequestIsValid = Object(utils["b" /* createIfRequestIsValid */])('displayName'); //
//------//
// Main //
//------//

function createPostDisplayName({
  router,
  websocketServer
}) {
  router.post('/:roomHash/player/:playerHash/display-name', attachToState({
    websocketServer
  }), display_name_ifRequestIsValid(handlePostDisplayName));
} //
//------------------//
// Helper Functions //
//------------------//


function handlePostDisplayName(ctx) {
  const handleError = createHandleErrorDuringRoute(ctx, display_name_createErrorMessage);
  return authorize(ctx).then(Object(utils["f" /* ifStatusIsNot404 */])(Object(universal_utils["r" /* promiseFlow */])([getCurrentAndOtherPlayerData, updateDisplayName, notifyOtherPlayer.displayName, returnCurrentPlayer]))).catch(handleError);
}

function updateDisplayName({
  ctx,
  currentPlayer,
  otherPlayer
}) {
  const {
    displayName
  } = ctx.request.body,
        {
    _id,
    _rev
  } = currentPlayer,
        updatedCurrentPlayer = Object(db["g" /* removeCouchdbProperties */])(currentPlayer);
  updatedCurrentPlayer.displayName = displayName;
  return db["b" /* dal */].player.update(Object(fes["h" /* combine */])(updatedCurrentPlayer)({
    _id,
    _rev
  })).then(Object(fes["b" /* alwaysReturn */])({
    ctx,
    otherPlayer,
    updatedCurrentPlayer
  }));
}

function returnCurrentPlayer({
  ctx,
  updatedCurrentPlayer
}) {
  ctx.status = 200;
  ctx.body = {
    currentPlayer: sanitize.player.current(updatedCurrentPlayer)
  };
}

function display_name_createErrorMessage(ctx) {
  const {
    playerHash,
    roomHash
  } = ctx.params,
        {
    displayName
  } = ctx.request.body;
  return {
    friendly: 'adding display name',
    detailed: external_tedent_default()(`
      error occurred during POST display-name
        playerHash: ${playerHash}
        roomHash: ${roomHash}
        displayName: ${displayName}
    `)
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var display_name = (createPostDisplayName);
// CONCATENATED MODULE: ./create/router/api/room/post/enter-game.js
//
// TODO: rename room -> game when in relation to entering.  Currently 'room'
//   means a couple things which is confusing.
//
//---------//
// Imports //
//---------//






 //
//------//
// Main //
//------//

function enter_game_createPostDisableGuide({
  router,
  websocketServer
}) {
  router.post('/:roomHash/player/:playerHash/enter-game', attachToState({
    websocketServer
  }), handlePostEnteringGame);
} //
//------------------//
// Helper Functions //
//------------------//


function handlePostEnteringGame(ctx) {
  const handleError = createHandleErrorDuringRoute(ctx, enter_game_createErrorMessage);
  return authorize(ctx).then(Object(utils["f" /* ifStatusIsNot404 */])(Object(universal_utils["r" /* promiseFlow */])([getCurrentAndOtherPlayerData, updateEnteredGame, enter_game_notifyOtherPlayer, enter_game_returnCurrentPlayer]))).catch(handleError);
}

function enter_game_notifyOtherPlayer(arg) {
  const {
    ctx,
    otherPlayer,
    updatedCurrentPlayer
  } = arg;
  ctx.state.websocketServer.maybeUpdateClient({
    playerHash: Object(db["d" /* docidToHash */])(otherPlayer._id),
    data: {
      id: 'otherPlayerEnteredGame',
      data: {
        commitOrDispatch: 'commit',
        type: 'room/updateOtherPlayer',
        payload: {
          otherPlayer: sanitize.player.other(updatedCurrentPlayer)
        }
      }
    }
  });
  return arg;
}

function updateEnteredGame({
  ctx,
  currentPlayer,
  otherPlayer
}) {
  currentPlayer.hasEnteredGame = true;
  return db["b" /* dal */].player.update(currentPlayer).then(Object(fes["b" /* alwaysReturn */])({
    ctx,
    updatedCurrentPlayer: currentPlayer,
    otherPlayer
  }));
}

function enter_game_returnCurrentPlayer({
  ctx,
  currentPlayer
}) {
  ctx.body = {
    currentPlayer
  };
  ctx.status = 200;
}

function enter_game_createErrorMessage(ctx) {
  const {
    playerHash,
    roomHash
  } = ctx.params;
  return {
    friendly: 'entering the game',
    detailed: external_tedent_default()(`
      error occurred during POST entering-game
        roomHash: ${roomHash}
        playerHash: ${playerHash}
    `)
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var enter_game = (enter_game_createPostDisableGuide);
// CONCATENATED MODULE: ./create/router/api/room/post/guess.js
//
// TODO: extract shared code between this file and post_init-player
//   into helpers.js
//
//---------//
// Imports //
//---------//






 //
//------//
// Init //
//------//

const guess_ifRequestIsValid = Object(utils["b" /* createIfRequestIsValid */])('guess'),
      atLeastOneLetter = fes["c" /* any */]; //
//------//
// Main //
//------//

function createPostGuess({
  router,
  websocketServer
}) {
  const addGuess = createAddGuess(websocketServer);
  router.post('/:roomHash/player/:playerHash/guess', guess_ifRequestIsValid(addGuess));
} //
//------------------//
// Helper Functions //
//------------------//


function createAddGuess(websocketServer) {
  return ctx => {
    const {
      body
    } = ctx.request;
    body.guess = body.guess.toLowerCase().trim();
    const handleError = createHandleErrorDuringRoute(ctx, guess_createErrorMessage);
    return authorize(ctx).then(Object(utils["f" /* ifStatusIsNot404 */])(Object(universal_utils["r" /* promiseFlow */])([getRoomAndPlayers, addGuessAndReturnCurrentPlayer]))).catch(handleError);
  }; // helper function scoped to 'createAddGuess'

  function addGuessAndReturnCurrentPlayer(result) {
    const {
      ctx,
      currentPlayer,
      otherPlayer,
      roomData
    } = result,
          {
      guess: guessedWord
    } = ctx.request.body,
          {
      secretWord
    } = otherPlayer,
          roomIdAndRev = Object(db["f" /* pickIdAndRev */])(roomData),
          playerIdAndRev = Object(db["f" /* pickIdAndRev */])(currentPlayer),
          updatedRoomData = Object(db["g" /* removeCouchdbProperties */])(roomData),
          playerData = Object(db["g" /* removeCouchdbProperties */])(currentPlayer),
          hasAnyMatchingLetters = atLeastOneLetter(Object(fes["j" /* containedIn */])(secretWord))(guessedWord);
    const guess = {
      hasAnyMatchingLetters,
      word: guessedWord,
      isCorrect: secretWord === guessedWord
    };
    mToggleTurn(updatedRoomData);
    Object(fes["G" /* mAppend */])(guess)(playerData.guesses);
    return Promise.all([db["b" /* dal */].activeRoom.update(Object(fes["h" /* combine */])(updatedRoomData)(roomIdAndRev)), db["b" /* dal */].player.update(Object(fes["h" /* combine */])(playerData)(playerIdAndRev))]).then(() => {
      const sanitizedRoom = sanitize.room(updatedRoomData);
      websocketServer.maybeUpdateClient({
        playerHash: Object(db["d" /* docidToHash */])(otherPlayer._id),
        data: {
          id: 'otherPlayerGuessed',
          data: {
            commitOrDispatch: 'commit',
            type: 'room/updateOtherPlayerAndRoom',
            payload: {
              otherPlayer: sanitize.player.other(playerData),
              room: sanitizedRoom
            }
          }
        }
      });
      ctx.status = 200;
      ctx.body = {
        room: sanitizedRoom,
        currentPlayer: sanitize.player.current(playerData)
      };
    });
  }
}

function guess_createErrorMessage(ctx) {
  const {
    playerHash,
    roomHash
  } = ctx.params,
        guess = ctx.request.body;
  return {
    friendly: 'adding your guess',
    detailed: external_tedent_default()(`
      error occurred during POST guess
        playerHash: ${playerHash}
        roomHash: ${roomHash}
        guess: ${guess}
    `)
  };
}

function mToggleTurn(updatedRoomData) {
  const {
    playerNumberTurn
  } = updatedRoomData;
  updatedRoomData.playerNumberTurn = playerNumberTurn === 1 ? 2 : 1;
  return updatedRoomData;
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var post_guess = (createPostGuess);
// CONCATENATED MODULE: ./create/router/api/room/post/init-player.js
//---------//
// Imports //
//---------//







 //
//------//
// Init //
//------//

const init_player_ifRequestIsValid = Object(utils["b" /* createIfRequestIsValid */])('initPlayer'); //
//------//
// Main //
//------//

function createPostInitPlayer({
  router,
  websocketServer
}) {
  router.post('/:roomHash/player/:playerHash', attachToState({
    routeName: 'initPlayer',
    websocketServer
  }), init_player_ifRequestIsValid(handlePostInitPlayer));
}

function handlePostInitPlayer(ctx) {
  const {
    body
  } = ctx.request,
        handleError = createHandleErrorDuringRoute(ctx, init_player_createErrorMessage);
  body.secretWord = body.secretWord.toLowerCase().trim();
  return authorize(ctx).then(Object(utils["f" /* ifStatusIsNot404 */])(Object(universal_utils["r" /* promiseFlow */])([getCurrentAndOtherPlayerData, initPlayer, notifyOtherPlayer.displayName, returnCurrentAndOtherPlayer]))).catch(handleError);
} // helper function scoped to 'createInitializePlayer'


function initPlayer(result) {
  const {
    ctx,
    currentPlayer,
    otherPlayer
  } = result,
        newPlayerData = ctx.request.body,
        {
    _id,
    _rev
  } = currentPlayer,
        existingPlayerData = Object(db["g" /* removeCouchdbProperties */])(currentPlayer),
        updatedCurrentPlayer = Object(fes["g" /* assignOver */])(existingPlayerData)(newPlayerData);
  return db["b" /* dal */].player.update(Object(fes["h" /* combine */])(updatedCurrentPlayer)({
    _id,
    _rev
  })).then(Object(fes["b" /* alwaysReturn */])({
    ctx,
    updatedCurrentPlayer,
    otherPlayer
  }));
}

function returnCurrentAndOtherPlayer(result) {
  const {
    ctx,
    otherPlayer,
    updatedCurrentPlayer
  } = result;
  ctx.status = 200;
  ctx.body = {
    currentPlayer: sanitize.player.current(updatedCurrentPlayer),
    otherPlayer: sanitize.player.other(otherPlayer)
  };
}

function init_player_createErrorMessage(ctx) {
  const {
    playerHash,
    roomHash
  } = ctx.params,
        {
    displayName,
    secretWord
  } = ctx.request.body;
  return {
    friendly: 'adding secret word and display name',
    detailed: external_tedent_default()(`
      error occurred during POST init-player
        playerHash: ${playerHash}
        roomHash: ${roomHash}
        displayName: ${displayName}
        secretWord: ${secretWord}
    `)
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var init_player = (createPostInitPlayer);
// CONCATENATED MODULE: ./create/router/api/room/post/reveal-letter.js
//---------//
// Imports //
//---------//






 //
//------//
// Init //
//------//

const reveal_letter_ifRequestIsValid = Object(utils["b" /* createIfRequestIsValid */])('revealLetter'); //
//------//
// Main //
//------//

function createPostRevealLetter({
  router,
  websocketServer
}) {
  const revealLetter = createRevealLetter(websocketServer);
  router.post('/:roomHash/player/:playerHash/reveal-letter', reveal_letter_ifRequestIsValid(revealLetter));
} //
//------------------//
// Helper Functions //
//------------------//


function createRevealLetter(websocketServer) {
  return ctx => {
    const handleError = createHandleErrorDuringRoute(ctx, reveal_letter_createErrorMessage);
    return authorize(ctx).then(Object(utils["f" /* ifStatusIsNot404 */])(Object(universal_utils["r" /* promiseFlow */])([getOtherPlayerData, revealLetterAndReturnOtherPlayer]))).catch(handleError);
  }; // helper function scoped to createRevealLetter

  function revealLetterAndReturnOtherPlayer({
    ctx,
    otherPlayer
  }) {
    const playerIdAndRev = Object(db["f" /* pickIdAndRev */])(otherPlayer),
          updatedOtherPlayer = Object(db["g" /* removeCouchdbProperties */])(otherPlayer),
          {
      chosenLetter
    } = ctx.request.body,
          lastGuess = Object(fes["F" /* last */])(updatedOtherPlayer.guesses);
    Object(fes["H" /* mAssignOver */])(lastGuess)({
      chosenLetter
    });
    return db["b" /* dal */].player.update(Object(fes["h" /* combine */])(updatedOtherPlayer)(playerIdAndRev)).then(() => {
      websocketServer.maybeUpdateClient({
        playerHash: Object(db["d" /* docidToHash */])(otherPlayer._id),
        data: {
          id: 'otherPlayerChoseLetter',
          data: {
            commitOrDispatch: 'commit',
            type: 'room/updateCurrentPlayer',
            payload: {
              currentPlayer: sanitize.player.current(updatedOtherPlayer)
            }
          }
        }
      });
      ctx.status = 200;
      ctx.body = {
        otherPlayer: sanitize.player.other(updatedOtherPlayer)
      };
    });
  }
}

function reveal_letter_createErrorMessage(ctx) {
  const {
    playerHash,
    roomHash
  } = ctx.params,
        {
    chosenLetter
  } = ctx.request.body;
  return {
    friendly: 'marking your chosen letter',
    detailed: external_tedent_default()(`
      error occurred during POST reveal-letter
        playerHash: ${playerHash}
        roomHash: ${roomHash}
        chosenLetter: ${chosenLetter}
    `)
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var reveal_letter = (createPostRevealLetter);
// CONCATENATED MODULE: ./create/router/api/room/post/secret-word.js
//---------//
// Imports //
//---------//






 //
//------//
// Init //
//------//

const secret_word_ifRequestIsValid = Object(utils["b" /* createIfRequestIsValid */])('secretWord'); //
//------//
// Main //
//------//

function secret_word_createPostInitPlayer({
  router
}) {
  router.post('/:roomHash/player/:playerHash/secret-word', secret_word_ifRequestIsValid(handlePostSecretWord));
} //
//------------------//
// Helper Functions //
//------------------//


function handlePostSecretWord(ctx) {
  const {
    body
  } = ctx.request,
        handleError = createHandleErrorDuringRoute(ctx, secret_word_createErrorMessage);
  body.secretWord = body.secretWord.toLowerCase().trim();
  return authorize(ctx).then(Object(utils["f" /* ifStatusIsNot404 */])(Object(universal_utils["r" /* promiseFlow */])([getCurrentAndOtherPlayerData, updateSecretWord, secret_word_returnCurrentPlayer]))).catch(handleError);
}

function updateSecretWord(result) {
  const {
    ctx,
    currentPlayer
  } = result,
        {
    secretWord
  } = ctx.request.body,
        {
    _id,
    _rev
  } = currentPlayer,
        updatedCurrentPlayer = Object(db["g" /* removeCouchdbProperties */])(currentPlayer);
  updatedCurrentPlayer.secretWord = secretWord;
  return db["b" /* dal */].player.update(Object(fes["h" /* combine */])(updatedCurrentPlayer)({
    _id,
    _rev
  })).then(Object(fes["b" /* alwaysReturn */])({
    ctx,
    updatedCurrentPlayer
  }));
}

function secret_word_returnCurrentPlayer({
  ctx,
  updatedCurrentPlayer
}) {
  ctx.status = 200;
  ctx.body = {
    currentPlayer: sanitize.player.current(updatedCurrentPlayer)
  };
}

function secret_word_createErrorMessage(ctx) {
  const {
    playerHash,
    roomHash
  } = ctx.params,
        {
    secretWord
  } = ctx.request.body;
  return {
    friendly: 'adding secret word',
    detailed: external_tedent_default()(`
      error occurred during POST secret-word
        playerHash: ${playerHash}
        roomHash: ${roomHash}
        secretWord: ${secretWord}
    `)
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var secret_word = (secret_word_createPostInitPlayer);
// CONCATENATED MODULE: ./create/router/api/room/post/understands.js
//---------//
// Imports //
//---------//







 //
//------//
// Init //
//------//

const understands_ifRequestIsValid = Object(utils["b" /* createIfRequestIsValid */])('understands'); //
//------//
// Main //
//------//

function understands_createPostDisableGuide({
  router
}) {
  router.post('/:roomHash/player/:playerHash/understands', understands_ifRequestIsValid(getPlayerDataAndMarkAsUnderstood));
} //
//------------------//
// Helper Functions //
//------------------//


function getPlayerDataAndMarkAsUnderstood(ctx) {
  const handleError = createHandleErrorDuringRoute(ctx, understands_createErrorMessage);
  return authorize(ctx).then(Object(utils["f" /* ifStatusIsNot404 */])(Object(universal_utils["r" /* promiseFlow */])([getCurrentPlayerData, updateGuide, returnResult]))).catch(handleError);
}

function updateGuide({
  ctx,
  currentPlayer
}) {
  const {
    understands: understandsKey
  } = ctx.request.body,
        {
    encryptedEmail
  } = currentPlayer,
        _id = external_couchdb_base64_default.a.encodeFromString(encryptedEmail);

  return db["b" /* dal */].guide.get({
    _id
  }).then(guideData => {
    guideData.understands[understandsKey] = true;
    return db["b" /* dal */].guide.update(guideData);
  }).then(Object(fes["b" /* alwaysReturn */])({
    ctx
  }));
}

function returnResult({
  ctx
}) {
  ctx.body = {
    result: 'successfully marked as understood'
  };
  ctx.status = 200;
}

function understands_createErrorMessage(ctx) {
  const {
    playerHash,
    roomHash
  } = ctx.params,
        {
    understands
  } = ctx.request.body;
  return {
    friendly: "marking an aspect of the game as 'understood'",
    detailed: external_tedent_default()(`
      error occurred during POST understands
        roomHash: ${roomHash}
        playerHash: ${playerHash}
        understands: ${understands}
    `)
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var post_understands = (understands_createPostDisableGuide);
// CONCATENATED MODULE: ./create/router/api/room/post/index.js
//
// TODO: turn these post methods from procedural code into declared objects
//
//---------//
// Imports //
//---------//








 //
//------//
// Main //
//------//

const createPostRoutes = arg => Object(universal_utils["e" /* callEach */])(arg, [disable_guide, display_name, enter_game, post_guess, init_player, reveal_letter, secret_word, post_understands]); //
//---------//
// Exports //
//---------//


/* harmony default export */ var post = (createPostRoutes);
// CONCATENATED MODULE: ./create/router/api/room/index.js
//---------//
// Imports //
//---------//



 //
//------//
// Main //
//------//

const createRoomRouter = websocketServer => {
  const router = new external_koa_router_default.a();
  Object(universal_utils["e" /* callEach */])({
    router,
    websocketServer
  }, [get, post]);
  return router;
}; //
//---------//
// Exports //
//---------//


/* harmony default export */ var room = (createRoomRouter);
// CONCATENATED MODULE: ./create/router/api/create-a-room/create-email-sent-records-and-room.js
//---------//
// Imports //
//---------//


 //
//------//
// Init //
//------//

const guideOpts = {
  returnRawResponse: true,
  allow404: true //
  //------//
  // Main //
  //------//

};

const createEmailSentRecordsAndRoom = encryptedEmails => {
  const [player1EncryptedEmail, player2EncryptedEmail] = encryptedEmails,
        player = Object(universal_utils["u" /* resolveAllProperties */])({
    one: resolvePlayer(player1EncryptedEmail, 'room-created'),
    two: resolvePlayer(player2EncryptedEmail, 'invitation')
  });
  return Object(universal_utils["u" /* resolveAllProperties */])({
    player,
    roomData: db["b" /* dal */].activeRoom.create({})
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function resolvePlayer(encryptedEmail, emailType) {
  const guideId = external_couchdb_base64_default.a.encodeFromString(encryptedEmail);
  return Object(universal_utils["u" /* resolveAllProperties */])({
    encryptedEmail,
    emailSentData: createEmailSentRecord(encryptedEmail, emailType),
    guide: db["b" /* dal */].guide.get({
      _id: guideId
    }, guideOpts),
    guideId
  });
}

function createEmailSentRecord(encryptedEmail, emailType) {
  return db["b" /* dal */].emailSent.create({
    to: encryptedEmail,
    type: emailType
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var create_email_sent_records_and_room = (createEmailSentRecordsAndRoom);
// EXTERNAL MODULE: ./lib/server/db/dal/preset-fields.js
var preset_fields = __webpack_require__(18);

// EXTERNAL MODULE: ./lib/universal/set-of-understands-keys.js
var set_of_understands_keys = __webpack_require__(15);

// CONCATENATED MODULE: ./create/router/api/create-a-room/create-players-and-update-game.js
//---------//
// Imports //
//---------//




 //
//------//
// Init //
//------//

const initialUnderstands = Object(fes["U" /* reduce */])(toFalse, {})(set_of_understands_keys["a" /* default */]); //
//------//
// Main //
//------//
//
// TODO: clean this up a bit - seems unnecessarily heavy on declaring and
//   passing around variables
//

const createGameAndPlayers = responses => {
  const {
    player,
    roomData
  } = responses,
        roomHash = Object(db["d" /* docidToHash */])(roomData._id);
  return Object(universal_utils["u" /* resolveAllProperties */])({
    roomData,
    roomHash,
    player1Data: createPlayer(1, roomHash, player.one.encryptedEmail),
    player1EmailSentHash: Object(db["d" /* docidToHash */])(player.one.emailSentData._id),
    player2Data: createPlayer(2, roomHash, player.two.encryptedEmail),
    player2EmailSentHash: Object(db["d" /* docidToHash */])(player.two.emailSentData._id),
    //
    // this basically causes a side-effect for later, since we don't need to
    //   return guide data until the room is GET'd.
    //
    maybeCreateGuides: maybeCreateGuides(player)
  }).then(responses => {
    const {
      player1Data,
      player2Data,
      roomData
    } = responses,
          {
      _id,
      _rev
    } = roomData,
          responsesSansRoomData = Object(fes["N" /* omit */])('roomData')(responses);
    return db["b" /* dal */].activeRoom.update({
      _id,
      _rev,
      player1Hash: Object(db["d" /* docidToHash */])(player1Data._id),
      player2Hash: Object(db["d" /* docidToHash */])(player2Data._id),
      playerNumberTurn: preset_fields["a" /* default */].playerNumberTurn.autogenerate()
    }).then(Object(fes["b" /* alwaysReturn */])(responsesSansRoomData));
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function maybeCreateGuides(player) {
  const createPlayer1Guide = player.one.guide.status === 404 ? db["b" /* dal */].guide.create({
    _id: player.one.guideId
  }) : null;
  const createPlayer2Guide = player.two.guide.status === 404 ? db["b" /* dal */].guide.create({
    _id: player.two.guideId
  }) : null;
  return Object(universal_utils["u" /* resolveAllProperties */])({
    createPlayer1Guide,
    createPlayer2Guide
  });
}

function createPlayer(number, roomHash, encryptedEmail) {
  return db["b" /* dal */].player.create({
    encryptedEmail,
    roomHash,
    number
  });
}

function toFalse(result, key) {
  return Object(fes["J" /* mSet */])(key, false)(result);
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var create_players_and_update_game = (createGameAndPlayers);
// EXTERNAL MODULE: external "nodemailer"
var external_nodemailer_ = __webpack_require__(51);
var external_nodemailer_default = /*#__PURE__*/__webpack_require__.n(external_nodemailer_);

// EXTERNAL MODULE: external "pify"
var external_pify_ = __webpack_require__(26);
var external_pify_default = /*#__PURE__*/__webpack_require__.n(external_pify_);

// EXTERNAL MODULE: ./config/debug.js
var debug = __webpack_require__(14);

// EXTERNAL MODULE: ./lib/server/email/get-template-name-to-compile.js
var get_template_name_to_compile = __webpack_require__(52);

// EXTERNAL MODULE: ./config/app.js
var app = __webpack_require__(5);

// CONCATENATED MODULE: ./lib/server/email/get-template-name-to-send.js
//---------//
// Imports //
//---------//









 //
//------//
// Init //
//------//

const {
  preventEmailFromSending
} = debug["a" /* default */]; //
//------//
// Main //
//------//

const smtpTransporter = createSmtpTransporter(),
      templateNameToInfo = getTemplateNameToInfo(),
      send = external_pify_default()(smtpTransporter.sendMail.bind(smtpTransporter));
let templateNameToSend;

const getTemplateNameToSendEmail = () => {
  if (!templateNameToSend) {
    templateNameToSend = createTemplateNameToSend();
  }

  return templateNameToSend;
}; //
//------------------//
// Helper Functions //
//------------------//


function createTemplateNameToSend() {
  return Object(get_template_name_to_compile["a" /* default */])().then(Object(fes["K" /* map */])(toApproveThenSend)); // scoped helper functions

  function toApproveThenSend(approveThenCompileHtmlAndText, templateName) {
    const approveInput = Object(universal_utils["f" /* createApproveSimpleInput */])(`sending email '${templateName}'`),
          {
      messageData,
      requiredProperties,
      type
    } = templateNameToInfo[templateName];
    return function approveThenSend(...arrayOfArguments) {
      const maybeError = approveInput(arrayOfArguments, requiredProperties) || Object(universal_utils["a" /* approveAllPropertiesAreLaden */])(arrayOfArguments[0]);
      if (maybeError) return handleSendError(maybeError);
      const input = arrayOfArguments[0],
            {
        error: err,
        html,
        text
      } = approveThenCompileHtmlAndText(input.templateVariables);
      if (err) return handleSendError(err); // valid input, phew!

      const {
        emailSentHash
      } = input.templateVariables,
            listUnsubscribeUrl = app["a" /* baseUrl */].external + `/api/email/unsubscribe/${type}/${emailSentHash}`,
            inputMessageData = Object(fes["N" /* omit */])('templateVariables')(input),
            finalMessageData = fes["i" /* combineAll */].objects([messageData, inputMessageData, {
        html,
        text,
        headers: {
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
        },
        list: {
          unsubscribe: {
            url: listUnsubscribeUrl
          }
        }
      }]);

      if (false) {}

      const handleServerError = Object(utils["a" /* createHandleServerError */])(get_template_name_to_send_createErrorMessage, [type, emailSentHash, input]);
      return send(finalMessageData).catch(handleServerError);
    };
  }
}

function get_template_name_to_send_createErrorMessage(type, emailSentHash, input) {
  return {
    friendly: 'sending an email',
    detailed: external_tedent_default()(`
      occurred while sending an email
      type: ${type}
      emailSentHash: ${emailSentHash}
      templateVariables: ${Object(universal_utils["k" /* jstring */])(input.templateVariables)}
    `)
  };
}

function handleSendError(error) {
  return Object(utils["c" /* handleServerErrorSync */])('occurred while sending an email', error);
}

function getTemplateNameToInfo() {
  return Object(fes["K" /* map */])(normalizeTemplateInfo)({
    youAreInvited: {
      type: 'invitation',
      requiredProperties: new Set(['to']),
      messageData: {
        from: app["g" /* smtpAuth */].user,
        subject: 'Your friend has invited you to Pass The Quill'
      }
    },
    youCreatedARoom: {
      type: 'room-created',
      requiredProperties: new Set(['to']),
      messageData: {
        from: app["g" /* smtpAuth */].user,
        subject: 'You created a room'
      }
    }
  });
}

function normalizeTemplateInfo(templateInfo) {
  return Object(fes["Z" /* transformProperties */])({
    requiredProperties: Object(universal_utils["p" /* mAddToSet */])('templateVariables')
  })(templateInfo);
}

function createSmtpTransporter() {
  return external_nodemailer_default.a.createTransport({
    host: 'mail.passthequill.com',
    auth: app["g" /* smtpAuth */],
    authMethod: 'LOGIN',
    secure: false,
    requireTLS: true,
    pool: true,
    rateLimit: 5
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var get_template_name_to_send = (getTemplateNameToSendEmail);
// CONCATENATED MODULE: ./create/router/api/create-a-room/create-send-emails.js
//---------//
// Imports //
//---------//


 //------//
// Main //
//------//

const createSendEmails = (player1Email, player2Email) => {
  return responses => {
    const {
      player1Data,
      player1EmailSentHash,
      player2Data,
      player2EmailSentHash,
      roomHash
    } = responses;
    const player1 = {
      email: player1Email,
      emailSentHash: player1EmailSentHash,
      hash: Object(db["d" /* docidToHash */])(player1Data._id)
    },
          player2 = {
      email: player2Email,
      emailSentHash: player2EmailSentHash,
      hash: Object(db["d" /* docidToHash */])(player2Data._id)
    };
    return Object(universal_utils["u" /* resolveAllProperties */])({
      player1SendResult: create_send_emails_send(player1, roomHash, 'youCreatedARoom'),
      player2SendResult: create_send_emails_send(player2, roomHash, 'youAreInvited')
    });
  };
}; //
//------------------//
// Helper Functions //
//------------------//


function create_send_emails_send(player, roomHash, templateName) {
  return get_template_name_to_send().then(templateNameToSendEmail => {
    const sendEmail = templateNameToSendEmail[templateName];
    return sendEmail({
      to: player.email,
      templateVariables: {
        emailSentHash: player.emailSentHash,
        playerHash: player.hash,
        roomHash
      }
    });
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var create_send_emails = (createSendEmails);
// CONCATENATED MODULE: ./create/router/api/create-a-room/if-not-unsubscribed.js
//---------//
// Imports //
//---------//

 //
//------//
// Init //
//------//
//
// the wording here is goofy because there's no such thing as subscribing to an
//   email, however 'not unsubscribed' is a double negative, so we're left with
//   two evils
//

const isSubscribedTo = {
  roomCreated: Object(fes["M" /* none */])(Object(fes["j" /* containedIn */])(['room-created', 'all'])),
  invitation: Object(fes["M" /* none */])(Object(fes["j" /* containedIn */])(['invitation', 'all'])) //
  //------//
  // Main //
  //------//

};

const ifNotUnsubscribed = asyncFunctions => {
  return responses => {
    const [player1UnsubscriptionTypes, player2UnsubscriptionTypes, encryptedEmails] = responses;
    const player1 = {
      isSubscribed: isSubscribedTo.roomCreated(player1UnsubscriptionTypes)
    },
          player2 = {
      isSubscribed: isSubscribedTo.invitation(player2UnsubscriptionTypes)
    },
          bothAreSubscribed = player1.isSubscribed && player2.isSubscribed;
    if (bothAreSubscribed) return Object(universal_utils["v" /* sequentiallyResolveEach */])(asyncFunctions, encryptedEmails);
    const unsubscribedPlayers = [];
    if (!player1.isSubscribed) Object(fes["G" /* mAppend */])('player1')(unsubscribedPlayers);
    if (!player2.isSubscribed) Object(fes["G" /* mAppend */])('player2')(unsubscribedPlayers);
    return {
      unsubscribedPlayers
    };
  };
}; //
//---------//
// Exports //
//---------//


/* harmony default export */ var if_not_unsubscribed = (ifNotUnsubscribed);
// EXTERNAL MODULE: external "koa2-ratelimit"
var external_koa2_ratelimit_ = __webpack_require__(21);

// CONCATENATED MODULE: ./create/router/api/create-a-room/rate-limit.js
//---------//
// Imports //
//---------//



 //
//------//
// Main //
//------//

const allRequests = getCreateARoomConstantRateLimiter();
const perIp = getCreateARoomIpRateLimiter(); //
//------------------//
// Helper Functions //
//------------------//

function getCreateARoomIpRateLimiter() {
  const max = 10,
        interval = {
    min: 30
  };
  return external_koa2_ratelimit_["RateLimit"].middleware({
    interval,
    max,
    keyGenerator: ctx => ctx.request.ip,
    onLimitReached: ctx => {
      log["a" /* default */].http.concern(external_tedent_default()(`
          Max create-a-room rate limit reached for ip: ${ctx.request.ip}
            max: ${max}
            interval: ${Object(universal_utils["k" /* jstring */])(interval)}
        `));
    },
    message: 'Too many rooms created from this IP'
  });
} //
// This is just meant to prevent spoofed IP spam.  It'd be nice not to have my
//   email server blacklisted :)
//


function getCreateARoomConstantRateLimiter() {
  const max = 100,
        interval = {
    min: 1
  };
  return external_koa2_ratelimit_["RateLimit"].middleware({
    interval,
    max,
    keyGenerator: () => 'constant',
    onLimitReached: () => {
      log["a" /* default */].http.concern(external_tedent_default()(`
          Max create-a-room constant rate limit reached
            max: ${max}
            interval: ${Object(universal_utils["k" /* jstring */])(interval)}
        `));
    },
    message: external_tedent_default()(`
      Unfortunately it seems this server is getting spammed with requests.
        Please understand that on the web it's difficult to prevent determined
        "bad guys".
    `)
  });
} //
//---------//
// Exports //
//---------//



// EXTERNAL MODULE: external "bcryptjs"
var external_bcryptjs_ = __webpack_require__(33);
var external_bcryptjs_default = /*#__PURE__*/__webpack_require__.n(external_bcryptjs_);

// CONCATENATED MODULE: ./lib/server/email/encrypt.js
//---------//
// Imports //
//---------//



 //
//------//
// Main //
//------//

const encryptEmail = email => external_bcryptjs_default.a.hash(email, app["e" /* salt */].email).catch(Object(utils["a" /* createHandleServerError */])(createEncryptEmailMessage, [email]));

const encryptAllEmails = allEmails => Object(fes["Q" /* passThrough */])(allEmails, [Object(fes["K" /* map */])(email => external_bcryptjs_default.a.hash(email, app["e" /* salt */].email)), eventualEncryptedEmails => Promise.all(eventualEncryptedEmails).catch(Object(utils["a" /* createHandleServerError */])(createEncryptAllEmailsMessage, [allEmails]))]); //
//------------------//
// Helper Functions //
//------------------//


function createEncryptEmailMessage(email) {
  return {
    friendly: 'encrypting the email address',
    detailed: `error while encrypting the email address: ${email}`
  };
}

function createEncryptAllEmailsMessage(allEmails) {
  return {
    friendly: 'error while encrypting the email addresses',
    detailed: 'error while encrypting the following email addresses:' + `${Object(fes["K" /* map */])(Object(fes["T" /* prepend */])('\n'))(allEmails)}`
  };
} //
//---------//
// Exports //
//---------//



// CONCATENATED MODULE: ./create/router/api/create-a-room/index.js
//---------//
// Imports //
//---------//











 //
//------//
// Init //
//------//

const create_a_room_ifRequestIsValid = Object(utils["b" /* createIfRequestIsValid */])('createARoom'),
      create_a_room_optionsForGet = {
  allow404: true,
  returnRawResponse: true //
  //------//
  // Main //
  //------//

};
const create_a_room_post = create_a_room_ifRequestIsValid(ctx => {
  const {
    player1Email,
    player2Email
  } = ctx.request.body,
        handleError = createHandleErrorDuringRoute(ctx, create_a_room_createErrorMessage);

  try {
    const sendEmails = create_send_emails(player1Email, player2Email);
    return encryptAllEmails([player1Email, player2Email]).then(getUnsubscribedTypes).then(if_not_unsubscribed([create_email_sent_records_and_room, create_players_and_update_game, sendEmails])).then(({
      unsubscribedPlayers = []
    }) => {
      ctx.status = 200;
      const result = Object(fes["B" /* isLaden */])(unsubscribedPlayers) ? 'emails were not sent due to one or both players being unsubscribed' : 'emails sent successfully';
      ctx.body = {
        result,
        unsubscribedPlayers
      };
    }).catch(handleError);
  } catch (error) {
    return handleError(error);
  }
});

function getUnsubscribedTypes(encryptedEmails) {
  const [player1EncryptedEmail, player2EncryptedEmail] = encryptedEmails;
  return Promise.all([getEmailUnsubscriptionTypes(player1EncryptedEmail), getEmailUnsubscriptionTypes(player2EncryptedEmail), encryptedEmails]);
}

function getEmailUnsubscriptionTypes(encryptedEmail) {
  const _id = external_couchdb_base64_default.a.encodeFromString(encryptedEmail);

  return db["b" /* dal */].emailUnsubscription.get({
    _id
  }, create_a_room_optionsForGet).then(response => {
    return response.status === 404 ? [] : response.data.types;
  });
}

function create_a_room_createErrorMessage(ctx) {
  const {
    player1Email,
    player2Email
  } = ctx.request.body;
  return encryptAllEmails([player1Email, player2Email]).then(([player1EncryptedEmail, player2EncryptedEmail]) => {
    const friendly = 'creating a room',
          detailed = external_tedent_default()(`
          An error occurred while creating a room
          player1EncryptedEmail: ${player1EncryptedEmail}
          player2EncryptedEmail: ${player2EncryptedEmail}
        `);
    return {
      detailed,
      friendly
    };
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var create_a_room = ({
  post: create_a_room_post,
  rateLimit: rate_limit_namespaceObject
});
// EXTERNAL MODULE: ./create/websocket-server/index.js + 2 modules
var websocket_server = __webpack_require__(28);

// CONCATENATED MODULE: ./create/router/api/log/rate-limit.js
//---------//
// Imports //
//---------//



 //
//------//
// Main //
//------//

const rate_limit_allRequests = getLogConstantRateLimiter();
const rate_limit_perIp = getLogIpRateLimiter(); //
//------------------//
// Helper Functions //
//------------------//

function getLogIpRateLimiter() {
  const max = 10,
        interval = {
    min: 1
  };
  return external_koa2_ratelimit_["RateLimit"].middleware({
    interval,
    max,
    keyGenerator: ctx => ctx.request.ip,
    onLimitReached: ctx => {
      log["a" /* default */].http.concern(`Max log rate limit reached for ip: ${ctx.request.ip}` + `\n  max: ${max}` + `\n  interval: ${Object(universal_utils["k" /* jstring */])(interval)}`);
    },
    message: 'Too many logs created from this IP'
  });
} //
// This is just meant to prevent spoofed IP spam.  It'd be nice not to have my
//   log files fill up with nonsense :)
//


function getLogConstantRateLimiter() {
  const max = 100,
        interval = {
    min: 1
  };
  return external_koa2_ratelimit_["RateLimit"].middleware({
    interval,
    max,
    keyGenerator: () => 'constant',
    onLimitReached: () => {
      log["a" /* default */].http.concern('Max log constant rate limit reached' + `\n  max: ${max}` + `\n  interval: ${Object(universal_utils["k" /* jstring */])(interval)}`);
    },
    message: external_tedent_default()(`
      Unfortunately it seems this server is getting spammed with requests.
        Please understand that on the web it's difficult to prevent determined
        "bad guys".
    `)
  });
} //
//---------//
// Exports //
//---------//



// CONCATENATED MODULE: ./create/router/api/log/index.js
//---------//
// Imports //
//---------//






 //
//------//
// Init //
//------//

const log_ifRequestIsValid = Object(utils["b" /* createIfRequestIsValid */])('log'); //
//------//
// Main //
//------//

const log_post = log_ifRequestIsValid(ctx => {
  try {
    const {
      commitHash,
      context,
      environment
    } = ctx.request.body,
          {
      ip
    } = ctx.request,
          {
      userAgent
    } = ctx,
          {
      message,
      stack
    } = Object(fes["Q" /* passThrough */])(ctx.request.body, [Object(fes["R" /* pickAll */])(['message', 'stack']), Object(fes["K" /* map */])(truncate)]),
          logRecord = {
      commitHash,
      context,
      environment,
      ip,
      message,
      stack,
      userAgent
    };
    const handleError = createHandleErrorDuringRoute(ctx, log_createErrorMessage);
    ctx.state.logRecord = logRecord;
    return db["b" /* dal */].log.create(logRecord).then(() => {
      ctx.status = 200;
      ctx.body = {
        result: 'log created successfully'
      };
    }).catch(handleError);
  } catch (e) {
    // no need to throw errors if logging has an issue
    Object(universal_utils["m" /* logError */])(e);
    return Promise.resolve();
  }
}); //
//------------------//
// Helper Functions //
//------------------//

function truncate(aString) {
  return Object(fes["Q" /* passThrough */])(aString, [Object(fes["bb" /* truncateToNLines */])(20), Object(fes["f" /* applyAt */])('split', ['\n']), Object(fes["K" /* map */])(Object(fes["ab" /* truncateToNChars */])(200)), Object(fes["C" /* join */])('\n')]);
}

function log_createErrorMessage(ctx) {
  const {
    commitHash,
    context,
    environment,
    ip,
    message,
    stack,
    userAgent
  } = ctx.state.logRecord;
  const friendly = 'creating a log',
        detailed = external_tedent_default()(`
      An error occurred while creating a log

      commitHash: ${commitHash}
      context: ${context}
      environment: ${environment}
      ip: ${ip}
      message: ${message}
      stack: ${stack}
      userAgent: ${userAgent}
    `);
  return {
    detailed,
    friendly
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var api_log = ({
  post: log_post,
  rateLimit: log_rate_limit_namespaceObject
});
// CONCATENATED MODULE: ./create/router/api/index.js
//---------//
// Imports //
//---------//








 //
//------//
// Main //
//------//

const createApiRouter = () => {
  const apiRouter = new external_koa_router_default.a(),
        websocketServer = websocket_server["a" /* default */].liveUpdate(),
        emailRouter = api_email(),
        roomRouter = room(websocketServer);
  apiRouter.use(external_koa_bodyparser_default()()).use('/email', emailRouter.routes(), emailRouter.allowedMethods()).use('/room', roomRouter.routes(), roomRouter.allowedMethods()).post('/log', api_log.rateLimit.allRequests, api_log.rateLimit.perIp, external_koa_useragent_default.a, api_log.post);
  if (debug["a" /* default */].preventEmailFromSending) apiRouter.post('/create-a-room', create_a_room.post);else {
    apiRouter.post('/create-a-room', create_a_room.rateLimit.allRequests, create_a_room.rateLimit.perIp, create_a_room.post);
  }
  return apiRouter;
}; //
//---------//
// Exports //
//---------//


/* harmony default export */ var api = __webpack_exports__["a"] = (createApiRouter);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./lib/server/api/couchdb.js
var couchdb = __webpack_require__(16);

// EXTERNAL MODULE: external "couchdb-base64"
var external_couchdb_base64_ = __webpack_require__(6);
var external_couchdb_base64_default = /*#__PURE__*/__webpack_require__.n(external_couchdb_base64_);

// EXTERNAL MODULE: external "tedent"
var external_tedent_ = __webpack_require__(3);
var external_tedent_default = /*#__PURE__*/__webpack_require__.n(external_tedent_);

// EXTERNAL MODULE: ./lib/server/db/index.js + 7 modules
var db = __webpack_require__(1);

// EXTERNAL MODULE: ./lib/universal/utils.js + 9 modules
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./config/app.js
var app = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/fes/index.js + 199 modules
var fes = __webpack_require__(0);

// CONCATENATED MODULE: ./dev/fixture-name-to-install/both-initialized_player1-guided.js
//
// README
//   - In the future I'll add a better fixture system, but for now 'guided' here
//     refers to the fact that player1 understands 'gameRoomBasics' but
//     nothing more
//
//---------//
// Imports //
//---------//






 //
//------//
// Init //
//------//

const logThenNewline = msg => {
  Object(utils["l" /* log */])(msg + '\n');
};

const test1EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.u6Ps74veAJJWW1b/iPFes9iuT8rpoYC',
      test2EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.zvRdVlidIL8krbeEJi2CJYTnMfi6hYC',
      player1GuideId = external_couchdb_base64_default.a.encodeFromString(test1EncryptedEmail),
      player2GuideId = external_couchdb_base64_default.a.encodeFromString(test2EncryptedEmail); //
//------//
// Main //
//------//

const both_initialized_player1_guided_name = 'both-initialized-player1-guided';

const both_initialized_player1_guided_install = () => {
  return Promise.all([createRoom(), db["b" /* dal */].guide.create({
    _id: player1GuideId
  }), db["b" /* dal */].guide.create({
    _id: player2GuideId
  }), createEmailSentRecord(test1EncryptedEmail, 'room-created'), createEmailSentRecord(test2EncryptedEmail, 'invitation')]).then(createPlayersAndSetupGuides).then(roomAndPlayerData => {
    const {
      roomHash,
      roomId,
      roomRev,
      player1Hash,
      player2Hash
    } = roomAndPlayerData;
    Object(utils["l" /* log */])(`player 1 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player1Hash}\n`);
    Object(utils["l" /* log */])(`player 2 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player2Hash}\n`);
    return db["b" /* dal */].activeRoom.update({
      _id: roomId,
      _rev: roomRev,
      player1Hash,
      player2Hash,
      playerNumberTurn: 2
    });
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function createEmailSentRecord(to, type) {
  return db["b" /* dal */].emailSent.create({
    to,
    type
  }).then(({
    _id
  }) => {
    logThenNewline(external_tedent_default()(`
        emailSent:
          hash: ${Object(db["d" /* docidToHash */])(_id)}
      `));
  });
}

function createRoom() {
  return db["b" /* dal */].activeRoom.create({}).then(({
    _id,
    _rev
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    logThenNewline(external_tedent_default()(`
        room:
          hash: ${hash}
      `));
    return {
      hash,
      _id,
      _rev
    };
  });
}

function createPlayersAndSetupGuides([roomData, player1Guide, player2Guide]) {
  const {
    hash,
    _id,
    _rev
  } = roomData;
  return Promise.all([createAPlayer(test1EncryptedEmail, 1, hash, 'Space Ghost', 'coast'), createAPlayer(test2EncryptedEmail, 2, hash, 'Wonder Woman', 'guest'), setupGuide(player1Guide), disableGuide(player2Guide)]).then(([player1Hash, player2Hash]) => {
    return {
      roomHash: hash,
      roomId: _id,
      roomRev: _rev,
      player1Hash,
      player2Hash
    };
  });
}

function setupGuide({
  _id
}) {
  return db["b" /* dal */].guide.get({
    _id
  }).then(guideData => {
    Object(fes["H" /* mAssignOver */])(guideData.understands)({
      displayNameAndSecretWord: true,
      gameRoomBasics: true
    });
    return db["b" /* dal */].guide.update(guideData);
  });
}

function disableGuide({
  _id
}) {
  return db["b" /* dal */].guide.get({
    _id
  }).then(guideData => {
    guideData.isActive = false;
    return db["b" /* dal */].guide.update(guideData);
  });
}

function createAPlayer(encryptedEmail, number, roomHash, displayName, secretWord) {
  const playerData = {
    displayName,
    encryptedEmail,
    number,
    roomHash,
    secretWord
  };
  return db["b" /* dal */].player.create(playerData).then(({
    _id
  }) => db["b" /* dal */].player.get({
    _id
  })).then(playerData => {
    playerData.hasEnteredGame = true;
    return db["b" /* dal */].player.update(playerData);
  }).then(({
    _id
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    logThenNewline(external_tedent_default()(`
          player:
            hash: ${hash}
            number: ${number}
        `));
    return hash;
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var both_initialized_player1_guided = ({
  install: both_initialized_player1_guided_install,
  name: both_initialized_player1_guided_name
});
// CONCATENATED MODULE: ./dev/fixture-name-to-install/both-initialized_player2-guided.js
//
// README
//   - In the future I'll add a better fixture system, but for now 'guided' here
//     refers to the fact that player1 understands 'gameRoomBasics' but
//     nothing more
//
//---------//
// Imports //
//---------//






 //
//------//
// Init //
//------//

const both_initialized_player2_guided_logThenNewline = msg => {
  Object(utils["l" /* log */])(msg + '\n');
};

const both_initialized_player2_guided_test1EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.u6Ps74veAJJWW1b/iPFes9iuT8rpoYC',
      both_initialized_player2_guided_test2EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.zvRdVlidIL8krbeEJi2CJYTnMfi6hYC',
      both_initialized_player2_guided_player1GuideId = external_couchdb_base64_default.a.encodeFromString(both_initialized_player2_guided_test1EncryptedEmail),
      both_initialized_player2_guided_player2GuideId = external_couchdb_base64_default.a.encodeFromString(both_initialized_player2_guided_test2EncryptedEmail); //
//------//
// Main //
//------//

const both_initialized_player2_guided_name = 'both-initialized-player2-guided';

const both_initialized_player2_guided_install = () => {
  return Promise.all([both_initialized_player2_guided_createRoom(), db["b" /* dal */].guide.create({
    _id: both_initialized_player2_guided_player1GuideId
  }), db["b" /* dal */].guide.create({
    _id: both_initialized_player2_guided_player2GuideId
  }), both_initialized_player2_guided_createEmailSentRecord(both_initialized_player2_guided_test1EncryptedEmail, 'room-created'), both_initialized_player2_guided_createEmailSentRecord(both_initialized_player2_guided_test2EncryptedEmail, 'invitation')]).then(both_initialized_player2_guided_createPlayersAndSetupGuides).then(roomAndPlayerData => {
    const {
      roomHash,
      roomId,
      roomRev,
      player1Hash,
      player2Hash
    } = roomAndPlayerData;
    Object(utils["l" /* log */])(`player 1 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player1Hash}\n`);
    Object(utils["l" /* log */])(`player 2 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player2Hash}\n`);
    return db["b" /* dal */].activeRoom.update({
      _id: roomId,
      _rev: roomRev,
      player1Hash,
      player2Hash,
      playerNumberTurn: 2
    });
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function both_initialized_player2_guided_createEmailSentRecord(to, type) {
  return db["b" /* dal */].emailSent.create({
    to,
    type
  }).then(({
    _id
  }) => {
    both_initialized_player2_guided_logThenNewline(external_tedent_default()(`
        emailSent:
          hash: ${Object(db["d" /* docidToHash */])(_id)}
      `));
  });
}

function both_initialized_player2_guided_createRoom() {
  return db["b" /* dal */].activeRoom.create({}).then(({
    _id,
    _rev
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    both_initialized_player2_guided_logThenNewline(external_tedent_default()(`
        room:
          hash: ${hash}
      `));
    return {
      hash,
      _id,
      _rev
    };
  });
}

function both_initialized_player2_guided_createPlayersAndSetupGuides([roomData, player1Guide, player2Guide]) {
  const {
    hash,
    _id,
    _rev
  } = roomData;
  return Promise.all([both_initialized_player2_guided_createAPlayer(both_initialized_player2_guided_test1EncryptedEmail, 1, hash, 'Space Ghost', 'coast'), both_initialized_player2_guided_createAPlayer(both_initialized_player2_guided_test2EncryptedEmail, 2, hash, 'Wonder Woman', 'guest'), both_initialized_player2_guided_disableGuide(player1Guide), both_initialized_player2_guided_setupGuide(player2Guide)]).then(([player1Hash, player2Hash]) => {
    return {
      roomHash: hash,
      roomId: _id,
      roomRev: _rev,
      player1Hash,
      player2Hash
    };
  });
}

function both_initialized_player2_guided_setupGuide({
  _id
}) {
  return db["b" /* dal */].guide.get({
    _id
  }).then(guideData => {
    Object(fes["H" /* mAssignOver */])(guideData.understands)({
      displayNameAndSecretWord: true,
      gameRoomBasics: true
    });
    return db["b" /* dal */].guide.update(guideData);
  });
}

function both_initialized_player2_guided_disableGuide({
  _id
}) {
  return db["b" /* dal */].guide.get({
    _id
  }).then(guideData => {
    guideData.isActive = false;
    return db["b" /* dal */].guide.update(guideData);
  });
}

function both_initialized_player2_guided_createAPlayer(encryptedEmail, number, roomHash, displayName, secretWord) {
  const playerData = {
    displayName,
    encryptedEmail,
    number,
    roomHash,
    secretWord
  };
  return db["b" /* dal */].player.create(playerData).then(({
    _id
  }) => db["b" /* dal */].player.get({
    _id
  })).then(playerData => {
    playerData.hasEnteredGame = true;
    return db["b" /* dal */].player.update(playerData);
  }).then(({
    _id
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    both_initialized_player2_guided_logThenNewline(external_tedent_default()(`
        player:
          hash: ${hash}
          number: ${number}
      `));
    return hash;
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var both_initialized_player2_guided = ({
  install: both_initialized_player2_guided_install,
  name: both_initialized_player2_guided_name
});
// CONCATENATED MODULE: ./dev/fixture-name-to-install/both-players-initialized.js
//---------//
// Imports //
//---------//





 //
//------//
// Init //
//------//

const both_players_initialized_logThenNewline = msg => {
  Object(utils["l" /* log */])(msg + '\n');
};

const both_players_initialized_test1EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.u6Ps74veAJJWW1b/iPFes9iuT8rpoYC',
      both_players_initialized_test2EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.zvRdVlidIL8krbeEJi2CJYTnMfi6hYC',
      both_players_initialized_player1GuideId = external_couchdb_base64_default.a.encodeFromString(both_players_initialized_test1EncryptedEmail),
      both_players_initialized_player2GuideId = external_couchdb_base64_default.a.encodeFromString(both_players_initialized_test2EncryptedEmail); //
//------//
// Main //
//------//

const both_players_initialized_name = 'both-players-initialized';

const both_players_initialized_install = () => {
  return Promise.all([both_players_initialized_createRoom(), db["b" /* dal */].guide.create({
    _id: both_players_initialized_player1GuideId
  }), db["b" /* dal */].guide.create({
    _id: both_players_initialized_player2GuideId
  }), both_players_initialized_createEmailSentRecord(both_players_initialized_test1EncryptedEmail, 'room-created'), both_players_initialized_createEmailSentRecord(both_players_initialized_test2EncryptedEmail, 'invitation')]).then(createPlayersAndDisableGuides).then(roomAndPlayerData => {
    const {
      roomHash,
      roomId,
      roomRev,
      player1Hash,
      player2Hash
    } = roomAndPlayerData;
    Object(utils["l" /* log */])(`player 1 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player1Hash}\n`);
    Object(utils["l" /* log */])(`player 2 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player2Hash}\n`);
    return db["b" /* dal */].activeRoom.update({
      _id: roomId,
      _rev: roomRev,
      player1Hash,
      player2Hash,
      playerNumberTurn: 2
    });
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function both_players_initialized_createEmailSentRecord(to, type) {
  return db["b" /* dal */].emailSent.create({
    to,
    type
  }).then(({
    _id
  }) => {
    both_players_initialized_logThenNewline(external_tedent_default()(`
        emailSent:
          hash: ${Object(db["d" /* docidToHash */])(_id)}
      `));
  });
}

function both_players_initialized_createRoom() {
  return db["b" /* dal */].activeRoom.create({}).then(({
    _id,
    _rev
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    both_players_initialized_logThenNewline(external_tedent_default()(`
        room:
          hash: ${hash}
      `));
    return {
      hash,
      _id,
      _rev
    };
  });
}

function createPlayersAndDisableGuides([roomData, player1Guide, player2Guide]) {
  const {
    hash,
    _id,
    _rev
  } = roomData;
  return Promise.all([both_players_initialized_createAPlayer(both_players_initialized_test1EncryptedEmail, 1, hash, 'Space Ghost', 'coast'), both_players_initialized_createAPlayer(both_players_initialized_test2EncryptedEmail, 2, hash, 'Wonder Woman', 'guest'), both_players_initialized_disableGuide(player1Guide), both_players_initialized_disableGuide(player2Guide)]).then(([player1Hash, player2Hash]) => {
    return {
      roomHash: hash,
      roomId: _id,
      roomRev: _rev,
      player1Hash,
      player2Hash
    };
  });
}

function both_players_initialized_disableGuide({
  _id
}) {
  return db["b" /* dal */].guide.get({
    _id
  }).then(guideData => {
    guideData.isActive = false;
    return db["b" /* dal */].guide.update(guideData);
  });
}

function both_players_initialized_createAPlayer(encryptedEmail, number, roomHash, displayName, secretWord) {
  const playerData = {
    displayName,
    encryptedEmail,
    number,
    roomHash,
    secretWord
  };
  return db["b" /* dal */].player.create(playerData).then(({
    _id
  }) => db["b" /* dal */].player.get({
    _id
  })).then(playerData => {
    playerData.hasEnteredGame = true;
    return db["b" /* dal */].player.update(playerData);
  }).then(({
    _id
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    both_players_initialized_logThenNewline(external_tedent_default()(`
          player:
            hash: ${hash}
            number: ${number}
        `));
    return hash;
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var both_players_initialized = ({
  install: both_players_initialized_install,
  name: both_players_initialized_name
});
// CONCATENATED MODULE: ./dev/fixture-name-to-install/lot-of-guesses.js
//---------//
// Imports //
//---------//




 //
//------//
// Init //
//------//

const lot_of_guesses_logThenNewline = msg => {
  Object(utils["l" /* log */])(msg + '\n');
};

const lot_of_guesses_test1EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.u6Ps74veAJJWW1b/iPFes9iuT8rpoYC',
      lot_of_guesses_test2EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.zvRdVlidIL8krbeEJi2CJYTnMfi6hYC'; //
//------//
// Main //
//------//

const lot_of_guesses_name = 'lot-of-guesses';

const lot_of_guesses_install = () => {
  return Promise.all([lot_of_guesses_createRoom(), lot_of_guesses_createEmailSentRecord(lot_of_guesses_test1EncryptedEmail, 'room-created'), lot_of_guesses_createEmailSentRecord(lot_of_guesses_test2EncryptedEmail, 'invitation')]).then(createPlayers).then(roomAndPlayerData => {
    const {
      roomHash,
      roomId,
      roomRev,
      player1Hash,
      player2Hash
    } = roomAndPlayerData;
    Object(utils["l" /* log */])(`player 1 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player1Hash}\n`);
    Object(utils["l" /* log */])(`player 2 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player2Hash}\n`);
    return db["b" /* dal */].activeRoom.update({
      _id: roomId,
      _rev: roomRev,
      player1Hash,
      player2Hash,
      playerNumberTurn: 2
    });
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function lot_of_guesses_createEmailSentRecord(to, type) {
  return db["b" /* dal */].emailSent.create({
    to,
    type
  }).then(({
    _id
  }) => {
    lot_of_guesses_logThenNewline(external_tedent_default()(`
        emailSent:
          hash: ${Object(db["d" /* docidToHash */])(_id)}
      `));
  });
}

function lot_of_guesses_createRoom() {
  return db["b" /* dal */].activeRoom.create({}).then(({
    _id,
    _rev
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    lot_of_guesses_logThenNewline(external_tedent_default()(`
        room:
          hash: ${hash}
      `));
    return {
      hash,
      _id,
      _rev
    };
  });
}

function createPlayers([roomData]) {
  const {
    hash,
    _id,
    _rev
  } = roomData;
  return Promise.all([lot_of_guesses_createAPlayer(lot_of_guesses_test1EncryptedEmail, 1, hash, 'Space Ghost', 'coast'), lot_of_guesses_createAPlayer(lot_of_guesses_test2EncryptedEmail, 2, hash, 'Wonder Woman', 'guest')]).then(([player1, player2]) => {
    const player1IdAndRev = Object(db["f" /* pickIdAndRev */])(player1),
          player2IdAndRev = Object(db["f" /* pickIdAndRev */])(player2),
          player1Data = Object(db["g" /* removeCouchdbProperties */])(player1),
          player2Data = Object(db["g" /* removeCouchdbProperties */])(player2);
    player1Data.guesses = Object(utils["g" /* createRange */])(10).map(() => ({
      hasAnyMatchingLetters: true,
      isCorrect: false,
      secretWord: 'guard',
      chosenLetter: 'g'
    }));
    player2Data.guesses = Object(utils["g" /* createRange */])(10).map(() => ({
      hasAnyMatchingLetters: true,
      isCorrect: false,
      secretWord: 'guard',
      chosenLetter: 'a'
    }));
    return Promise.all([db["b" /* dal */].player.update(Object(fes["h" /* combine */])(player1IdAndRev)(player1Data)), db["b" /* dal */].player.update(Object(fes["h" /* combine */])(player2IdAndRev)(player2Data))]).then(Object(fes["b" /* alwaysReturn */])([player1, player2]));
  }).then(([player1, player2]) => {
    return {
      roomHash: hash,
      roomId: _id,
      roomRev: _rev,
      player1Hash: Object(db["d" /* docidToHash */])(player1._id),
      player2Hash: Object(db["d" /* docidToHash */])(player2._id)
    };
  });
}

function lot_of_guesses_createAPlayer(encryptedEmail, number, roomHash, displayName, secretWord) {
  const playerData = {
    displayName,
    encryptedEmail,
    number,
    roomHash,
    secretWord
  };
  return db["b" /* dal */].player.create(playerData).then(({
    _id
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    lot_of_guesses_logThenNewline(external_tedent_default()(`
        player:
          hash: ${hash}
          number: ${number}
      `));
    return db["b" /* dal */].player.get({
      _id
    });
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var lot_of_guesses = ({
  install: lot_of_guesses_install,
  name: lot_of_guesses_name
});
// CONCATENATED MODULE: ./dev/fixture-name-to-install/only-player1-is-initialized.js
//---------//
// Imports //
//---------//





 //
//------//
// Init //
//------//

const only_player1_is_initialized_logThenNewline = msg => {
  Object(utils["l" /* log */])(msg + '\n');
};

const only_player1_is_initialized_test1EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.u6Ps74veAJJWW1b/iPFes9iuT8rpoYC',
      only_player1_is_initialized_test2EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.zvRdVlidIL8krbeEJi2CJYTnMfi6hYC',
      isUndefined = Object(fes["Y" /* strictlyEquals */])(undefined); //
//------//
// Main //
//------//

const only_player1_is_initialized_name = 'only-player1-is-initialized';

const only_player1_is_initialized_install = () => {
  return Promise.all([only_player1_is_initialized_createRoom(), only_player1_is_initialized_createEmailSentRecord(only_player1_is_initialized_test1EncryptedEmail, 'room-created'), only_player1_is_initialized_createEmailSentRecord(only_player1_is_initialized_test2EncryptedEmail, 'invitation')]).then(only_player1_is_initialized_createPlayers).then(roomAndPlayerData => {
    const {
      roomHash,
      roomId,
      roomRev,
      player1Hash,
      player2Hash
    } = roomAndPlayerData;
    Object(utils["l" /* log */])(`player 1 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player1Hash}\n`);
    Object(utils["l" /* log */])(`player 2 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player2Hash}\n`);
    return db["b" /* dal */].activeRoom.update({
      _id: roomId,
      _rev: roomRev,
      player1Hash,
      player2Hash,
      playerNumberTurn: 2
    });
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function only_player1_is_initialized_createEmailSentRecord(to, type) {
  return db["b" /* dal */].emailSent.create({
    to,
    type
  }).then(({
    _id
  }) => {
    only_player1_is_initialized_logThenNewline(external_tedent_default()(`
        emailSent:
          hash: ${Object(db["d" /* docidToHash */])(_id)}
      `));
  });
}

function only_player1_is_initialized_createRoom() {
  return db["b" /* dal */].activeRoom.create({}).then(({
    _id,
    _rev
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    only_player1_is_initialized_logThenNewline(external_tedent_default()(`
        room:
          hash: ${hash}
      `));
    return {
      hash,
      _id,
      _rev
    };
  });
}

function only_player1_is_initialized_createPlayers([roomData]) {
  const {
    hash,
    _id,
    _rev
  } = roomData;
  return Promise.all([only_player1_is_initialized_createAPlayer(only_player1_is_initialized_test1EncryptedEmail, 1, hash, 'Space Ghost', 'coast'), only_player1_is_initialized_createAPlayer(only_player1_is_initialized_test2EncryptedEmail, 2, hash)]).then(([player1Hash, player2Hash]) => {
    return {
      roomHash: hash,
      roomId: _id,
      roomRev: _rev,
      player1Hash,
      player2Hash
    };
  });
}

function only_player1_is_initialized_createAPlayer(encryptedEmail, number, roomHash, displayName, secretWord) {
  const playerData = Object(fes["p" /* discardWhen */])(isUndefined)({
    displayName,
    encryptedEmail,
    number,
    roomHash,
    secretWord
  });
  return db["b" /* dal */].player.create(playerData).then(({
    _id
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    only_player1_is_initialized_logThenNewline(external_tedent_default()(`
        player:
          hash: ${hash}
          number: ${number}
      `));
    return hash;
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var only_player1_is_initialized = ({
  install: only_player1_is_initialized_install,
  name: only_player1_is_initialized_name
});
// CONCATENATED MODULE: ./dev/fixture-name-to-install/only-player2-is-initialized.js
//---------//
// Imports //
//---------//





 //
//------//
// Init //
//------//

const only_player2_is_initialized_logThenNewline = msg => {
  Object(utils["l" /* log */])(msg + '\n');
};

const only_player2_is_initialized_test1EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.u6Ps74veAJJWW1b/iPFes9iuT8rpoYC',
      only_player2_is_initialized_test2EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.zvRdVlidIL8krbeEJi2CJYTnMfi6hYC',
      only_player2_is_initialized_isUndefined = Object(fes["Y" /* strictlyEquals */])(undefined); //
//------//
// Main //
//------//

const only_player2_is_initialized_name = 'only-player2-is-initialized';

const only_player2_is_initialized_install = () => {
  return Promise.all([only_player2_is_initialized_createRoom(), only_player2_is_initialized_createEmailSentRecord(only_player2_is_initialized_test1EncryptedEmail, 'room-created'), only_player2_is_initialized_createEmailSentRecord(only_player2_is_initialized_test2EncryptedEmail, 'invitation')]).then(only_player2_is_initialized_createPlayers).then(roomAndPlayerData => {
    const {
      roomHash,
      roomId,
      roomRev,
      player1Hash,
      player2Hash
    } = roomAndPlayerData;
    Object(utils["l" /* log */])(`player 1 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player1Hash}\n`);
    Object(utils["l" /* log */])(`player 2 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player2Hash}\n`);
    return db["b" /* dal */].activeRoom.update({
      _id: roomId,
      _rev: roomRev,
      player1Hash,
      player2Hash,
      playerNumberTurn: 2
    });
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function only_player2_is_initialized_createEmailSentRecord(to, type) {
  return db["b" /* dal */].emailSent.create({
    to,
    type
  }).then(({
    _id
  }) => {
    only_player2_is_initialized_logThenNewline(external_tedent_default()(`
        emailSent:
          hash: ${Object(db["d" /* docidToHash */])(_id)}
      `));
  });
}

function only_player2_is_initialized_createRoom() {
  return db["b" /* dal */].activeRoom.create({}).then(({
    _id,
    _rev
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    only_player2_is_initialized_logThenNewline(external_tedent_default()(`
        room:
          hash: ${hash}
      `));
    return {
      hash,
      _id,
      _rev
    };
  });
}

function only_player2_is_initialized_createPlayers([roomData]) {
  const {
    hash,
    _id,
    _rev
  } = roomData;
  return Promise.all([only_player2_is_initialized_createAPlayer(only_player2_is_initialized_test1EncryptedEmail, 1, hash), only_player2_is_initialized_createAPlayer(only_player2_is_initialized_test2EncryptedEmail, 2, hash, 'Wonder Woman', 'guest')]).then(([player1Hash, player2Hash]) => {
    return {
      roomHash: hash,
      roomId: _id,
      roomRev: _rev,
      player1Hash,
      player2Hash
    };
  });
}

function only_player2_is_initialized_createAPlayer(encryptedEmail, number, roomHash, displayName, secretWord) {
  const playerData = Object(fes["p" /* discardWhen */])(only_player2_is_initialized_isUndefined)({
    displayName,
    encryptedEmail,
    number,
    roomHash,
    secretWord
  });
  return db["b" /* dal */].player.create(playerData).then(({
    _id
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    only_player2_is_initialized_logThenNewline(external_tedent_default()(`
        player:
          hash: ${hash}
          number: ${number}
      `));
    return hash;
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var only_player2_is_initialized = ({
  install: only_player2_is_initialized_install,
  name: only_player2_is_initialized_name
});
// CONCATENATED MODULE: ./dev/fixture-name-to-install/player1-must-guess-no-match.js
//---------//
// Imports //
//---------//




 //
//------//
// Init //
//------//

const player1_must_guess_no_match_logThenNewline = msg => {
  Object(utils["l" /* log */])(msg + '\n');
};

const player1_must_guess_no_match_test1EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.u6Ps74veAJJWW1b/iPFes9iuT8rpoYC',
      player1_must_guess_no_match_test2EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.zvRdVlidIL8krbeEJi2CJYTnMfi6hYC'; //
//------//
// Main //
//------//

const player1_must_guess_no_match_name = 'player1-must-guess-no-match';

const player1_must_guess_no_match_install = () => {
  return Promise.all([player1_must_guess_no_match_createRoom(), player1_must_guess_no_match_createEmailSentRecord(player1_must_guess_no_match_test1EncryptedEmail, 'room-created'), player1_must_guess_no_match_createEmailSentRecord(player1_must_guess_no_match_test2EncryptedEmail, 'invitation')]).then(player1_must_guess_no_match_createPlayers).then(roomAndPlayerData => {
    const {
      roomHash,
      roomId,
      roomRev,
      player1Hash,
      player2Hash
    } = roomAndPlayerData;
    Object(utils["l" /* log */])(`player 1 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player1Hash}\n`);
    Object(utils["l" /* log */])(`player 2 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player2Hash}\n`);
    return db["b" /* dal */].activeRoom.update({
      _id: roomId,
      _rev: roomRev,
      player1Hash,
      player2Hash,
      playerNumberTurn: 1
    });
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function player1_must_guess_no_match_createEmailSentRecord(to, type) {
  return db["b" /* dal */].emailSent.create({
    to,
    type
  }).then(({
    _id
  }) => {
    player1_must_guess_no_match_logThenNewline(external_tedent_default()(`
        emailSent:
          hash: ${Object(db["d" /* docidToHash */])(_id)}
      `));
  });
}

function player1_must_guess_no_match_createRoom() {
  return db["b" /* dal */].activeRoom.create({}).then(({
    _id,
    _rev
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    player1_must_guess_no_match_logThenNewline(external_tedent_default()(`
        room:
          hash: ${hash}
      `));
    return {
      hash,
      _id,
      _rev
    };
  });
}

function player1_must_guess_no_match_createPlayers([roomData]) {
  const {
    hash,
    _id,
    _rev
  } = roomData;
  return Promise.all([player1_must_guess_no_match_createAPlayer(player1_must_guess_no_match_test1EncryptedEmail, 1, hash, 'Space Ghost', 'coast'), player1_must_guess_no_match_createAPlayer(player1_must_guess_no_match_test2EncryptedEmail, 2, hash, 'Wonder Woman', 'guest')]).then(([player1, player2]) => {
    const idAndRev = Object(db["f" /* pickIdAndRev */])(player2),
          player2Data = Object(db["g" /* removeCouchdbProperties */])(player2);
    player2Data.guesses = [{
      hasAnyMatchingLetters: false,
      isCorrect: false,
      secretWord: 'help'
    }];
    return db["b" /* dal */].player.update(Object(fes["h" /* combine */])(idAndRev)(player2Data)).then(Object(fes["b" /* alwaysReturn */])([player1, player2]));
  }).then(([player1, player2]) => {
    return {
      roomHash: hash,
      roomId: _id,
      roomRev: _rev,
      player1Hash: Object(db["d" /* docidToHash */])(player1._id),
      player2Hash: Object(db["d" /* docidToHash */])(player2._id)
    };
  });
}

function player1_must_guess_no_match_createAPlayer(encryptedEmail, number, roomHash, displayName, secretWord) {
  const playerData = {
    displayName,
    encryptedEmail,
    number,
    roomHash,
    secretWord
  };
  return db["b" /* dal */].player.create(playerData).then(({
    _id
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    player1_must_guess_no_match_logThenNewline(external_tedent_default()(`
        player:
          hash: ${hash}
          number: ${number}
      `));
    return db["b" /* dal */].player.get({
      _id
    });
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var player1_must_guess_no_match = ({
  install: player1_must_guess_no_match_install,
  name: player1_must_guess_no_match_name
});
// CONCATENATED MODULE: ./dev/fixture-name-to-install/player1-must-guess-with-match.js
//---------//
// Imports //
//---------//




 //
//------//
// Init //
//------//

const player1_must_guess_with_match_logThenNewline = msg => {
  Object(utils["l" /* log */])(msg + '\n');
};

const player1_must_guess_with_match_test1EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.u6Ps74veAJJWW1b/iPFes9iuT8rpoYC',
      player1_must_guess_with_match_test2EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.zvRdVlidIL8krbeEJi2CJYTnMfi6hYC'; //
//------//
// Main //
//------//

const player1_must_guess_with_match_name = 'player1-must-guess-with-match';

const player1_must_guess_with_match_install = () => {
  return Promise.all([player1_must_guess_with_match_createRoom(), player1_must_guess_with_match_createEmailSentRecord(player1_must_guess_with_match_test1EncryptedEmail, 'room-created'), player1_must_guess_with_match_createEmailSentRecord(player1_must_guess_with_match_test2EncryptedEmail, 'invitation')]).then(player1_must_guess_with_match_createPlayers).then(roomAndPlayerData => {
    const {
      roomHash,
      roomId,
      roomRev,
      player1Hash,
      player2Hash
    } = roomAndPlayerData;
    Object(utils["l" /* log */])(`player 1 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player1Hash}\n`);
    Object(utils["l" /* log */])(`player 2 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player2Hash}\n`);
    return db["b" /* dal */].activeRoom.update({
      _id: roomId,
      _rev: roomRev,
      player1Hash,
      player2Hash,
      playerNumberTurn: 1
    });
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function player1_must_guess_with_match_createEmailSentRecord(to, type) {
  return db["b" /* dal */].emailSent.create({
    to,
    type
  }).then(({
    _id
  }) => {
    player1_must_guess_with_match_logThenNewline(external_tedent_default()(`
        emailSent:
          hash: ${Object(db["d" /* docidToHash */])(_id)}
      `));
  });
}

function player1_must_guess_with_match_createRoom() {
  return db["b" /* dal */].activeRoom.create({}).then(({
    _id,
    _rev
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    player1_must_guess_with_match_logThenNewline(external_tedent_default()(`
        room:
          hash: ${hash}
      `));
    return {
      hash,
      _id,
      _rev
    };
  });
}

function player1_must_guess_with_match_createPlayers([roomData]) {
  const {
    hash,
    _id,
    _rev
  } = roomData;
  return Promise.all([player1_must_guess_with_match_createAPlayer(player1_must_guess_with_match_test1EncryptedEmail, 1, hash, 'Space Ghost', 'coast'), player1_must_guess_with_match_createAPlayer(player1_must_guess_with_match_test2EncryptedEmail, 2, hash, 'Wonder Woman', 'guest')]).then(([player1, player2]) => {
    const idAndRev = Object(db["f" /* pickIdAndRev */])(player2),
          player2Data = Object(db["g" /* removeCouchdbProperties */])(player2);
    player2Data.guesses = [{
      hasAnyMatchingLetters: true,
      isCorrect: false,
      secretWord: 'blast',
      chosenLetter: 'a'
    }];
    return db["b" /* dal */].player.update(Object(fes["h" /* combine */])(idAndRev)(player2Data)).then(Object(fes["b" /* alwaysReturn */])([player1, player2]));
  }).then(([player1, player2]) => {
    return {
      roomHash: hash,
      roomId: _id,
      roomRev: _rev,
      player1Hash: Object(db["d" /* docidToHash */])(player1._id),
      player2Hash: Object(db["d" /* docidToHash */])(player2._id)
    };
  });
}

function player1_must_guess_with_match_createAPlayer(encryptedEmail, number, roomHash, displayName, secretWord) {
  const playerData = {
    displayName,
    encryptedEmail,
    number,
    roomHash,
    secretWord
  };
  return db["b" /* dal */].player.create(playerData).then(({
    _id
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    player1_must_guess_with_match_logThenNewline(external_tedent_default()(`
        player:
          hash: ${hash}
          number: ${number}
      `));
    return db["b" /* dal */].player.get({
      _id
    });
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var player1_must_guess_with_match = ({
  install: player1_must_guess_with_match_install,
  name: player1_must_guess_with_match_name
});
// CONCATENATED MODULE: ./dev/fixture-name-to-install/player1-must-reveal-a-letter.js
//---------//
// Imports //
//---------//




 //
//------//
// Init //
//------//

const player1_must_reveal_a_letter_logThenNewline = msg => {
  Object(utils["l" /* log */])(msg + '\n');
};

const player1_must_reveal_a_letter_test1EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.u6Ps74veAJJWW1b/iPFes9iuT8rpoYC',
      player1_must_reveal_a_letter_test2EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.zvRdVlidIL8krbeEJi2CJYTnMfi6hYC'; //
//------//
// Main //
//------//

const player1_must_reveal_a_letter_name = 'player1-must-reveal-a-letter';

const player1_must_reveal_a_letter_install = () => {
  return Promise.all([player1_must_reveal_a_letter_createRoom(), player1_must_reveal_a_letter_createEmailSentRecord(player1_must_reveal_a_letter_test1EncryptedEmail, 'room-created'), player1_must_reveal_a_letter_createEmailSentRecord(player1_must_reveal_a_letter_test2EncryptedEmail, 'invitation')]).then(player1_must_reveal_a_letter_createPlayers).then(roomAndPlayerData => {
    const {
      roomHash,
      roomId,
      roomRev,
      player1Hash,
      player2Hash
    } = roomAndPlayerData;
    Object(utils["l" /* log */])(`player 1 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player1Hash}\n`);
    Object(utils["l" /* log */])(`player 2 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player2Hash}\n`);
    return db["b" /* dal */].activeRoom.update({
      _id: roomId,
      _rev: roomRev,
      player1Hash,
      player2Hash,
      playerNumberTurn: 1
    });
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function player1_must_reveal_a_letter_createEmailSentRecord(to, type) {
  return db["b" /* dal */].emailSent.create({
    to,
    type
  }).then(({
    _id
  }) => {
    player1_must_reveal_a_letter_logThenNewline(external_tedent_default()(`
        emailSent:
          hash: ${Object(db["d" /* docidToHash */])(_id)}
      `));
  });
}

function player1_must_reveal_a_letter_createRoom() {
  return db["b" /* dal */].activeRoom.create({}).then(({
    _id,
    _rev
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    player1_must_reveal_a_letter_logThenNewline(external_tedent_default()(`
        room:
          hash: ${hash}
      `));
    return {
      hash,
      _id,
      _rev
    };
  });
}

function player1_must_reveal_a_letter_createPlayers([roomData]) {
  const {
    hash,
    _id,
    _rev
  } = roomData;
  return Promise.all([player1_must_reveal_a_letter_createAPlayer(player1_must_reveal_a_letter_test1EncryptedEmail, 1, hash, 'Space Ghost', 'coast'), player1_must_reveal_a_letter_createAPlayer(player1_must_reveal_a_letter_test2EncryptedEmail, 2, hash, 'Wonder Woman', 'guest')]).then(([player1, player2]) => {
    const idAndRev = Object(db["f" /* pickIdAndRev */])(player2),
          player2Data = Object(db["g" /* removeCouchdbProperties */])(player2);
    player2Data.guesses = [{
      isCorrect: false,
      hasAnyMatchingLetters: true,
      secretWord: 'blast'
    }];
    return db["b" /* dal */].player.update(Object(fes["h" /* combine */])(idAndRev)(player2Data)).then(Object(fes["b" /* alwaysReturn */])([player1, player2]));
  }).then(([player1, player2]) => {
    return {
      roomHash: hash,
      roomId: _id,
      roomRev: _rev,
      player1Hash: Object(db["d" /* docidToHash */])(player1._id),
      player2Hash: Object(db["d" /* docidToHash */])(player2._id)
    };
  });
}

function player1_must_reveal_a_letter_createAPlayer(encryptedEmail, number, roomHash, displayName, secretWord) {
  const playerData = {
    displayName,
    encryptedEmail,
    number,
    roomHash,
    secretWord
  };
  return db["b" /* dal */].player.create(playerData).then(({
    _id
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    player1_must_reveal_a_letter_logThenNewline(external_tedent_default()(`
        player:
          hash: ${hash}
          number: ${number}
      `));
    return db["b" /* dal */].player.get({
      _id
    });
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var player1_must_reveal_a_letter = ({
  install: player1_must_reveal_a_letter_install,
  name: player1_must_reveal_a_letter_name
});
// CONCATENATED MODULE: ./dev/fixture-name-to-install/player2-must-reveal-a-letter.js
//---------//
// Imports //
//---------//




 //
//------//
// Init //
//------//

const player2_must_reveal_a_letter_logThenNewline = msg => {
  Object(utils["l" /* log */])(msg + '\n');
};

const player2_must_reveal_a_letter_test1EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.u6Ps74veAJJWW1b/iPFes9iuT8rpoYC',
      player2_must_reveal_a_letter_test2EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.zvRdVlidIL8krbeEJi2CJYTnMfi6hYC'; //
//------//
// Main //
//------//

const player2_must_reveal_a_letter_name = 'player2-must-reveal-a-letter';

const player2_must_reveal_a_letter_install = () => {
  return Promise.all([player2_must_reveal_a_letter_createRoom(), player2_must_reveal_a_letter_createEmailSentRecord(player2_must_reveal_a_letter_test1EncryptedEmail, 'room-created'), player2_must_reveal_a_letter_createEmailSentRecord(player2_must_reveal_a_letter_test2EncryptedEmail, 'invitation')]).then(player2_must_reveal_a_letter_createPlayers).then(roomAndPlayerData => {
    const {
      roomHash,
      roomId,
      roomRev,
      player1Hash,
      player2Hash
    } = roomAndPlayerData;
    Object(utils["l" /* log */])(`player 1 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player1Hash}\n`);
    Object(utils["l" /* log */])(`player 2 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player2Hash}\n`);
    return db["b" /* dal */].activeRoom.update({
      _id: roomId,
      _rev: roomRev,
      player1Hash,
      player2Hash,
      playerNumberTurn: 2
    });
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function player2_must_reveal_a_letter_createEmailSentRecord(to, type) {
  return db["b" /* dal */].emailSent.create({
    to,
    type
  }).then(({
    _id
  }) => {
    player2_must_reveal_a_letter_logThenNewline(external_tedent_default()(`
        emailSent:
          hash: ${Object(db["d" /* docidToHash */])(_id)}
      `));
  });
}

function player2_must_reveal_a_letter_createRoom() {
  return db["b" /* dal */].activeRoom.create({}).then(({
    _id,
    _rev
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    player2_must_reveal_a_letter_logThenNewline(external_tedent_default()(`
        room:
          hash: ${hash}
      `));
    return {
      hash,
      _id,
      _rev
    };
  });
}

function player2_must_reveal_a_letter_createPlayers([roomData]) {
  const {
    hash,
    _id,
    _rev
  } = roomData;
  return Promise.all([player2_must_reveal_a_letter_createAPlayer(player2_must_reveal_a_letter_test1EncryptedEmail, 1, hash, 'Space Ghost', 'coast'), player2_must_reveal_a_letter_createAPlayer(player2_must_reveal_a_letter_test2EncryptedEmail, 2, hash, 'Wonder Woman', 'guest')]).then(([player1, player2]) => {
    const player1IdAndRev = Object(db["f" /* pickIdAndRev */])(player1),
          player2IdAndRev = Object(db["f" /* pickIdAndRev */])(player2),
          player1Data = Object(db["g" /* removeCouchdbProperties */])(player1),
          player2Data = Object(db["g" /* removeCouchdbProperties */])(player2);
    player1Data.guesses = [{
      hasAnyMatchingLetters: true,
      isCorrect: 'false',
      secretWord: 'coast'
    }];
    player2Data.guesses = [{
      hasAnyMatchingLetters: true,
      isCorrect: 'false',
      secretWord: 'blast',
      chosenLetter: 'a'
    }];
    return Promise.all([db["b" /* dal */].player.update(Object(fes["h" /* combine */])(player1IdAndRev)(player1Data)), db["b" /* dal */].player.update(Object(fes["h" /* combine */])(player2IdAndRev)(player2Data))]).then(Object(fes["b" /* alwaysReturn */])([player1, player2]));
  }).then(([player1, player2]) => {
    return {
      roomHash: hash,
      roomId: _id,
      roomRev: _rev,
      player1Hash: Object(db["d" /* docidToHash */])(player1._id),
      player2Hash: Object(db["d" /* docidToHash */])(player2._id)
    };
  });
}

function player2_must_reveal_a_letter_createAPlayer(encryptedEmail, number, roomHash, displayName, secretWord) {
  const playerData = {
    displayName,
    encryptedEmail,
    number,
    roomHash,
    secretWord
  };
  return db["b" /* dal */].player.create(playerData).then(({
    _id
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    player2_must_reveal_a_letter_logThenNewline(external_tedent_default()(`
        player:
          hash: ${hash}
          number: ${number}
      `));
    return db["b" /* dal */].player.get({
      _id
    });
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var player2_must_reveal_a_letter = ({
  install: player2_must_reveal_a_letter_install,
  name: player2_must_reveal_a_letter_name
});
// CONCATENATED MODULE: ./dev/fixture-name-to-install/player2-must-guess.js
//---------//
// Imports //
//---------//




 //
//------//
// Init //
//------//

const player2_must_guess_logThenNewline = msg => {
  Object(utils["l" /* log */])(msg + '\n');
};

const player2_must_guess_test1EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.u6Ps74veAJJWW1b/iPFes9iuT8rpoYC',
      player2_must_guess_test2EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.zvRdVlidIL8krbeEJi2CJYTnMfi6hYC'; //
//------//
// Main //
//------//

const player2_must_guess_name = 'player2-must-guess';

const player2_must_guess_install = () => {
  return Promise.all([player2_must_guess_createRoom(), player2_must_guess_createEmailSentRecord(player2_must_guess_test1EncryptedEmail, 'room-created'), player2_must_guess_createEmailSentRecord(player2_must_guess_test2EncryptedEmail, 'invitation')]).then(player2_must_guess_createPlayers).then(roomAndPlayerData => {
    const {
      roomHash,
      roomId,
      roomRev,
      player1Hash,
      player2Hash
    } = roomAndPlayerData;
    Object(utils["l" /* log */])(`player 1 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player1Hash}\n`);
    Object(utils["l" /* log */])(`player 2 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player2Hash}\n`);
    return db["b" /* dal */].activeRoom.update({
      _id: roomId,
      _rev: roomRev,
      player1Hash,
      player2Hash,
      playerNumberTurn: 2
    });
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function player2_must_guess_createEmailSentRecord(to, type) {
  return db["b" /* dal */].emailSent.create({
    to,
    type
  }).then(({
    _id
  }) => {
    player2_must_guess_logThenNewline(external_tedent_default()(`
        emailSent:
          hash: ${Object(db["d" /* docidToHash */])(_id)}
      `));
  });
}

function player2_must_guess_createRoom() {
  return db["b" /* dal */].activeRoom.create({}).then(({
    _id,
    _rev
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    player2_must_guess_logThenNewline(external_tedent_default()(`
        room:
          hash: ${hash}
      `));
    return {
      hash,
      _id,
      _rev
    };
  });
}

function player2_must_guess_createPlayers([roomData]) {
  const {
    hash,
    _id,
    _rev
  } = roomData;
  return Promise.all([player2_must_guess_createAPlayer(player2_must_guess_test1EncryptedEmail, 1, hash, 'Space Ghost', 'coast'), player2_must_guess_createAPlayer(player2_must_guess_test2EncryptedEmail, 2, hash, 'Wonder Woman', 'guest')]).then(([player1, player2]) => {
    const player1IdAndRev = Object(db["f" /* pickIdAndRev */])(player1),
          player2IdAndRev = Object(db["f" /* pickIdAndRev */])(player2),
          player1Data = Object(db["g" /* removeCouchdbProperties */])(player1),
          player2Data = Object(db["g" /* removeCouchdbProperties */])(player2);
    player1Data.guesses = [{
      secretWord: 'coast',
      hasAnyMatchingLetters: true,
      chosenLetter: 's'
    }];
    player2Data.guesses = [{
      secretWord: 'blast',
      hasAnyMatchingLetters: true,
      chosenLetter: 'a'
    }];
    return Promise.all([db["b" /* dal */].player.update(Object(fes["h" /* combine */])(player1IdAndRev)(player1Data)), db["b" /* dal */].player.update(Object(fes["h" /* combine */])(player2IdAndRev)(player2Data))]).then(Object(fes["b" /* alwaysReturn */])([player1, player2]));
  }).then(([player1, player2]) => {
    return {
      roomHash: hash,
      roomId: _id,
      roomRev: _rev,
      player1Hash: Object(db["d" /* docidToHash */])(player1._id),
      player2Hash: Object(db["d" /* docidToHash */])(player2._id)
    };
  });
}

function player2_must_guess_createAPlayer(encryptedEmail, number, roomHash, displayName, secretWord) {
  const playerData = {
    displayName,
    encryptedEmail,
    number,
    roomHash,
    secretWord
  };
  return db["b" /* dal */].player.create(playerData).then(({
    _id
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    player2_must_guess_logThenNewline(external_tedent_default()(`
        player:
          hash: ${hash}
          number: ${number}
      `));
    return db["b" /* dal */].player.get({
      _id
    });
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var player2_must_guess = ({
  install: player2_must_guess_install,
  name: player2_must_guess_name
});
// CONCATENATED MODULE: ./dev/fixture-name-to-install/room-exists.js
//---------//
// Imports //
//---------//





 //
//------//
// Init //
//------//

const room_exists_logThenNewline = msg => {
  Object(utils["l" /* log */])(msg + '\n');
};

const room_exists_test1EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.u6Ps74veAJJWW1b/iPFes9iuT8rpoYC',
      room_exists_test2EncryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.zvRdVlidIL8krbeEJi2CJYTnMfi6hYC',
      room_exists_player1GuideId = external_couchdb_base64_default.a.encodeFromString(room_exists_test1EncryptedEmail),
      room_exists_player2GuideId = external_couchdb_base64_default.a.encodeFromString(room_exists_test2EncryptedEmail); //
//------//
// Main //
//------//

const room_exists_name = 'room-exists';

const room_exists_install = () => {
  return Promise.all([room_exists_createRoom(), room_exists_createEmailSentRecord(room_exists_test1EncryptedEmail, 'room-created', 1), room_exists_createEmailSentRecord(room_exists_test2EncryptedEmail, 'invitation', 2), db["b" /* dal */].guide.create({
    _id: room_exists_player1GuideId
  }), db["b" /* dal */].guide.create({
    _id: room_exists_player2GuideId
  })]).then(room_exists_createPlayers).then(roomAndPlayerData => {
    const {
      roomHash,
      roomId,
      roomRev,
      player1Hash,
      player2Hash
    } = roomAndPlayerData;
    Object(utils["l" /* log */])(`player 1 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player1Hash}\n`);
    Object(utils["l" /* log */])(`player 2 room url: ${app["a" /* baseUrl */].local}/room/` + `${roomHash}/player/${player2Hash}\n`);
    return db["b" /* dal */].activeRoom.update({
      _id: roomId,
      _rev: roomRev,
      player1Hash,
      player2Hash,
      playerNumberTurn: 2
    });
  });
}; //
//------------------//
// Helper Functions //
//------------------//


function room_exists_createEmailSentRecord(to, type, playerNumber) {
  return db["b" /* dal */].emailSent.create({
    to,
    type
  }).then(({
    _id
  }) => {
    room_exists_logThenNewline(external_tedent_default()(`
        emailSent:
          hash: ${Object(db["d" /* docidToHash */])(_id)}
          player number: ${playerNumber}
      `));
  });
}

function room_exists_createRoom() {
  return db["b" /* dal */].activeRoom.create({}).then(({
    _id,
    _rev
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    room_exists_logThenNewline(external_tedent_default()(`
        room hash: ${hash}
      `));
    return {
      hash,
      _id,
      _rev
    };
  });
}

function room_exists_createPlayers([roomData]) {
  const {
    hash,
    _id,
    _rev
  } = roomData;
  return Promise.all([room_exists_createAPlayer(room_exists_test1EncryptedEmail, hash, 1), room_exists_createAPlayer(room_exists_test2EncryptedEmail, hash, 2)]).then(([player1Hash, player2Hash]) => {
    return {
      roomHash: hash,
      roomId: _id,
      roomRev: _rev,
      player1Hash,
      player2Hash
    };
  });
}

function room_exists_createAPlayer(encryptedEmail, roomHash, number) {
  return db["b" /* dal */].player.create({
    encryptedEmail,
    roomHash,
    number
  }).then(({
    _id
  }) => {
    const hash = Object(db["d" /* docidToHash */])(_id);
    room_exists_logThenNewline(external_tedent_default()(`
          player ${number} hash: ${hash}
        `));
    return hash;
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var room_exists = ({
  install: room_exists_install,
  name: room_exists_name
});
// CONCATENATED MODULE: ./dev/fixture-name-to-install/unsubscription-exists.js
//---------//
// Imports //
//---------//




 //
//------//
// Init //
//------//

const unsubscription_exists_logThenNewline = msg => {
  Object(utils["l" /* log */])(msg + '\n');
};

const unsubscription_exists_encryptedEmail = '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.CsqjI/FojsBBWhLQ09HHL94QpyLTs1e'; //
//------//
// Main //
//------//

const unsubscription_exists_name = 'unsubscription-exists';

const unsubscription_exists_install = () => Promise.all([createUnsubscription(), unsubscription_exists_createEmailSentRecord()]); //
//------------------//
// Helper Functions //
//------------------//


function createUnsubscription() {
  return db["b" /* dal */].emailUnsubscription.create({
    _id: external_couchdb_base64_default.a.encodeFromString(unsubscription_exists_encryptedEmail),
    types: ['all', 'invitation', 'room-created']
  });
}

function unsubscription_exists_createEmailSentRecord() {
  return db["b" /* dal */].emailSent.create({
    to: unsubscription_exists_encryptedEmail,
    type: 'room-created'
  }).then(({
    _id
  }) => {
    unsubscription_exists_logThenNewline(external_tedent_default()(`
          emailSent:
            hash: ${Object(db["d" /* docidToHash */])(_id)}
        `));
  });
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var unsubscription_exists = ({
  install: unsubscription_exists_install,
  name: unsubscription_exists_name
});
// CONCATENATED MODULE: ./dev/fixture-name-to-install/index.js
//
// README
//   - This code assumes only one fixture will be installed at a time.
//
// TODO: extract the common code from each fixture so the fixtures themselves
//   can be lightweight and composed of the shared pieces.  I imagine
//   something like:
// createRoom.then(createBothPlayers).then(createGuessForPlayer1).then(...)
//
//---------//
// Imports //
//---------//















 //
//------//
// Init //
//------//

const fixtures = getFixtures(); //
//------//
// Main //
//------//

const fixtureNameToInstall = Object(fes["Q" /* passThrough */])(fixtures, [Object(fes["K" /* map */])(createInstall), Object(fes["J" /* mSet */])('none', utils["q" /* noop */])]); //
//------------------//
// Helper Functions //
//------------------//

function createInstall({
  install,
  name
}) {
  return () => {
    logHeader(`installing fixture '${name}'`);
    return install().then(() => couchdb["a" /* default */].replicateAllDbs(name)).then(() => {
      logHeader(`'${name}' installed`);
    });
  };
}

function logHeader(header) {
  const border = Object(utils["s" /* repeatString */])(header.length)('-');
  Object(utils["l" /* log */])(`${border}\n${header}\n${border}\n`);
}

function getFixtures() {
  return {
    bothInitializedPlayer1Guided: both_initialized_player1_guided,
    bothInitializedPlayer2Guided: both_initialized_player2_guided,
    bothPlayersInitialized: both_players_initialized,
    lotOfGuesses: lot_of_guesses,
    onlyPlayer1IsInitialized: only_player1_is_initialized,
    onlyPlayer2IsInitialized: only_player2_is_initialized,
    player1MustGuessNoMatch: player1_must_guess_no_match,
    player1MustGuessWithMatch: player1_must_guess_with_match,
    player1MustRevealALetter: player1_must_reveal_a_letter,
    player2MustRevealALetter: player2_must_reveal_a_letter,
    player2MustGuess: player2_must_guess,
    roomExists: room_exists,
    unsubscriptionExists: unsubscription_exists
  };
} //
//---------//
// Exports //
//---------//


/* harmony default export */ var fixture_name_to_install = __webpack_exports__["a"] = (fixtureNameToInstall);

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var longjohn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62);
/* harmony import */ var longjohn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(longjohn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lru_cache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(37);
/* harmony import */ var lru_cache__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lru_cache__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var tedent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3);
/* harmony import */ var tedent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(tedent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var koa_compress__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(38);
/* harmony import */ var koa_compress__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(koa_compress__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(39);
/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var koa_vue_ssr_init_dev_server__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(40);
/* harmony import */ var koa_vue_ssr_init_dev_server__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(koa_vue_ssr_init_dev_server__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(11);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _create_router_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(58);
/* harmony import */ var _create_router_debug__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(55);
/* harmony import */ var _create_router_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(56);
/* harmony import */ var _dev_fixture_name_to_install__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(59);
/* harmony import */ var universal_directives__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(34);
/* harmony import */ var project_root_config_debug__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(14);
/* harmony import */ var vue_server_renderer__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(57);
/* harmony import */ var vue_server_renderer__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(vue_server_renderer__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var server_db__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(1);
/* harmony import */ var server_utils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(4);
/* harmony import */ var project_root_config_app__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(5);
/* harmony import */ var universal_utils__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(2);
//
// TODO: log all errors to server (couchdb) and only console.error when logging
//   to the server fails
//
//-------------//
// Pre-Imports //
//-------------//

 //
//---------//
// Imports //
//---------//




















 //
//------//
// Init //
//------//

const {
  localHostIp,
  webpackHotClientPort
} = project_root_config_debug__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"];

const distDir = path__WEBPACK_IMPORTED_MODULE_10___default.a.resolve(__dirname, 'dist'),
      highlight = chalk__WEBPACK_IMPORTED_MODULE_4___default.a.green,
      isDevelopment = "production" === 'development',
      shouldInitDevServer = true,
      templatePath = path__WEBPACK_IMPORTED_MODULE_10___default.a.resolve(__dirname, 'index.template.html'),
      imagesPath = path__WEBPACK_IMPORTED_MODULE_10___default.a.resolve(__dirname, 'assets/images'),
      faviconPath = path__WEBPACK_IMPORTED_MODULE_10___default.a.resolve(imagesPath, 'favicon'),
      webpackConfigs = project_root_config_debug__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].webpackConfigs,
      fixtureNameCamel = 'roomExists',
      installFixture = () => _dev_fixture_name_to_install__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"][fixtureNameCamel]();

logUnhandledRejections(); //
//------//
// Main //
//------//

maybeInitDevDatabase().then(() => Object(universal_utils__WEBPACK_IMPORTED_MODULE_21__[/* resolveAllProperties */ "u"])({
  ico: Object(server_utils__WEBPACK_IMPORTED_MODULE_19__[/* readRawFile */ "h"])(faviconPath + '.ico'),
  png16: Object(server_utils__WEBPACK_IMPORTED_MODULE_19__[/* readRawFile */ "h"])(faviconPath + '.16.png'),
  png32: Object(server_utils__WEBPACK_IMPORTED_MODULE_19__[/* readRawFile */ "h"])(faviconPath + '.32.png')
})).then(imageContents => {
  const koaApp = createInitialKoaApp(imageContents);
  return isDevelopment && shouldInitDevServer ? initDevServer(koaApp) : initNonDevServer(koaApp);
}).then(({
  getRenderer,
  koaApp
}) => {
  const router = createRouter(getRenderer);

  if (!isDevelopment || !shouldInitDevServer) {
    koaApp.use(koa_static__WEBPACK_IMPORTED_MODULE_8___default()(distDir));
  }

  koaApp.use(router.routes()).use(router.allowedMethods());
  const listenArgs = [project_root_config_app__WEBPACK_IMPORTED_MODULE_20__[/* serverPort */ "f"]];
  if (isDevelopment) listenArgs.push(localHostIp);
  koaApp.listen(...listenArgs); // eslint-disable-next-line no-console

  console.log(`The server is running on port: ${highlight(project_root_config_app__WEBPACK_IMPORTED_MODULE_20__[/* serverPort */ "f"])}`);
}).catch(universal_utils__WEBPACK_IMPORTED_MODULE_21__[/* logError */ "m"]); //
//------------------//
// Helper Functions //
//------------------//

function createInitialKoaApp(imageContents) {
  const koaApp = new koa__WEBPACK_IMPORTED_MODULE_2___default.a(),
        imageToBody = getImageToBody(imageContents); // ensures request.ip is correct

  koaApp.proxy = true;
  koaApp.use(koa_compress__WEBPACK_IMPORTED_MODULE_7___default()()).use((ctx, next) => {
    const maybeBody = imageToBody[ctx.url];

    if (maybeBody) {
      ctx.type = ctx.url === '/favicon.ico' ? 'image/x-icon' : 'image/png';
      ctx.body = maybeBody;
      return;
    } else {
      return next();
    }
  });
  return koaApp;
}

function getImageToBody(imageContents) {
  return {
    '/favicon.ico': imageContents.ico,
    '/favicon.png': imageContents.png16,
    '/favicon.16.png': imageContents.png16,
    '/favicon.32.png': imageContents.png32
  };
} //
// TODO: rename koa-vue-ssr_init-dev-server to be more generic so it can handle
//   non-dev-server usage as well.  Some of this code is currently duplicated.
//


function initNonDevServer(koaApp) {
  return Promise.all([Object(server_utils__WEBPACK_IMPORTED_MODULE_19__[/* readFile */ "g"])(path__WEBPACK_IMPORTED_MODULE_10___default.a.resolve(distDir, 'vue-ssr-client-manifest.json')), Object(server_utils__WEBPACK_IMPORTED_MODULE_19__[/* readFile */ "g"])(path__WEBPACK_IMPORTED_MODULE_10___default.a.resolve(distDir, 'vue-ssr-server-bundle.json')), Object(server_utils__WEBPACK_IMPORTED_MODULE_19__[/* readFile */ "g"])(templatePath)]).then(([ssrClientManifest, ssrServerBundle, template]) => {
    const bundleRenderer = Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_17__["createBundleRenderer"])(JSON.parse(ssrServerBundle), {
      //
      // doesn't matter whether we use client or ssr output paths as they
      //   should be the same
      //
      basedir: webpackConfigs.client.output.path,
      cache: lru_cache__WEBPACK_IMPORTED_MODULE_5___default()({
        max: 1000,
        maxAge: 1000 * 60 * 15
      }),
      clientManifest: JSON.parse(ssrClientManifest),
      directives: universal_directives__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].ssr,
      runInNewContext: false,
      template
    });
    return {
      koaApp,
      getRenderer: () => bundleRenderer
    };
  });
}

function initDevServer(koaApp) {
  return koa_vue_ssr_init_dev_server__WEBPACK_IMPORTED_MODULE_9___default()({
    directives: universal_directives__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].ssr,
    koaApp,
    koaWebpackOptions: {
      devMiddleware: {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      },
      hotClient: {
        host: localHostIp,
        port: webpackHotClientPort
      }
    },
    webpackConfigs,
    templatePath
  });
}

function maybeInitDevDatabase() {
  if (!isDevelopment) return Promise.resolve();
  return Object(server_db__WEBPACK_IMPORTED_MODULE_18__[/* deleteAllDatabases */ "c"])().then(server_db__WEBPACK_IMPORTED_MODULE_18__[/* createAllDatabases */ "a"]).then(installFixture);
}

function createRouter(getRenderer) {
  const router = {
    root: new koa_router__WEBPACK_IMPORTED_MODULE_3___default.a(),
    api: Object(_create_router_api__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"])(),
    page: Object(_create_router_page__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])(getRenderer)
  };
  router.root.use('/ping', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    ctx.status = 200;
  }).use('/api', router.api.routes(), router.api.allowedMethods()).use(router.page.routes(), router.page.allowedMethods());

  if (isDevelopment) {
    router.debug = Object(_create_router_debug__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(fixtureNameCamel);
    router.root.use('/debug', router.debug.routes(), router.debug.allowedMethods());
  }

  return router.root;
}

function logUnhandledRejections() {
  process.on('unhandledRejection', (reason, p) => {
    let error = reason;

    if (!(error instanceof Error)) {
      error = new Error(Object(universal_utils__WEBPACK_IMPORTED_MODULE_21__[/* jstring */ "k"])(reason));
    }

    error.message = tedent__WEBPACK_IMPORTED_MODULE_6___default()(`
      ${error.message}

      at promise: ${p}
    `);
    Object(universal_utils__WEBPACK_IMPORTED_MODULE_21__[/* logErrorToServer */ "n"])({
      context: '- node unhandledRejection',
      error
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(this, ""))

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("longjohn");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("winston-daily-rotate-file");

/***/ })
/******/ ]);
//# sourceMappingURL=server.bundle.js.map