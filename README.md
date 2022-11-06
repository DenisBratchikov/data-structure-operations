# js-collection-operations

`js-collection-operations` lets you easily find **union**, **intersection**, **difference**, **symmetric difference** and **includes** of JavaScript Arrays, Sets and Array-like Objects. Also you can find **map** and **filter** functions for Sets and Array-like Objects.

## Installation

Using npm:

```bash
  npm i js-collection-operations
```

or using yarn:

```bash
  yarn add js-collection-operations
```

## Contents

- [union](#union)
- [intersection](#intersection)
- [difference](#difference)
- [symmetric difference](#symmetric-difference)
- [includes](#includes)
- [map](#map)
- [filter](#filter)

## Usage

### union

```typescript
import { union } from 'js-collection-operations';

union([1, 2, 3], [2, 3, 4, 5]); // [1, 2, 3, 4, 5]

union(new Set(['a', 'b', 'c'], new Set('c', 'd'))); // Set(4) {'a', 'b', 'c', 'd'}

union({ 0: 'foo', 1: 'bar', length: 2 }, { 0: 'hello', length: 1 }); // ['foo', 'bar', 'hello']
```

### intersection

```typescript
import { intersection } from 'js-collection-operations';

intersection([1, 2, 3], [2, 3, 4, 5]); // [2, 3]

intersection(new Set(['a', 'b', 'c'], new Set('c', 'd'))); // Set(1) {'c'}

intersection({ 0: 'foo', 1: 'bar', length: 2 }, { 0: 'foo', length: 1 }); // ['foo']
```

### difference

```typescript
import { difference } from 'js-collection-operations';

difference([1, 2, 3], [2, 3, 4, 5]); // [1]

difference(new Set(['a', 'b', 'c'], new Set('c', 'd'))); // Set(2) {'a', 'b'}

difference({ 0: 'foo', 1: 'bar', length: 2 }, { 0: 'foo', length: 1 }); // ['bar']
```

### symmetric difference

```typescript
import { symmetricDifference as symDiff } from 'js-collection-operations';

symDiff([1, 2, 3], [2, 3, 4, 5]); // [1, 4, 5]

symDiff(new Set(['a', 'b', 'c'], new Set('c', 'd'))); // Set(3) {'a', 'b', 'd'}

symDiff({ 0: 'q', 1: 'w' length: 2 }, { 0: 'w', 1: 'e', length: 2 }); // ['q', 'e']
```

### includes

```typescript
import { includes } from 'js-collection-operations';

includes([1, 2, 3], [3, 1]); // true

includes(new Set(['a', 'b', 'c'], new Set('a', 'd'))); // false

includes({ 0: 'foo', 1: 'bar', length: 2 }, { 0: 'foo', length: 1 }); // true
```

### map

```typescript
import { map } from 'js-collection-operations';

map(new Set([1, 2, 3]), (value) => value * 2); // Set(3) {2, 4, 6}

map({ 0: 'a', 1: 'b', length: 2 }, (value) => value.toUpperCase()); // ['A', 'B']
```

### filter

```typescript
import { filter } from 'js-collection-operations';

filter(new Set([1, 2, 3, 4]), (value) => value % 2 === 1); // Set(2) {1, 3}

filter({ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, (value) => value < 'c'); // ['a', 'b']
```

## Bug Reports & Feature Requests

Please use the [issue tracker](https://github.com/DenisBratchikov/js-collection-operations/issues) to report any bugs or file feature requests.
