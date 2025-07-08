# Use the switch expression in an idiomatic and versatile way in JavaScript

Simple usage example:

```js
import Switch from 'switch-expr-vanilla';

const NICK = 'John Doe';

console.log(
    Switch(NICK)
    .Case(s => typeof s !== 'string', 'Not string')
    .Case(s => s.length == 0, 'Too short')
    .Case(s => s.length > 50, 'Too long')
    .Case(s => !/^\w+$/.test(s), 'Invalid nickname')
    .Default('OK')
); // Output: Invalid nickname
```

It also supports lazy results:

```js
import Switch from 'switch-expr-vanilla';

const obj = undefined;

console.log(
    Switch(obj)
    .Case(o => o === undefined, () => 'Prop not found')
    .Default(() => 'OK')
); // Output: Prop not found
```

Lazy results are the way to throw errors:

```js
import Switch from 'switch-expr-vanilla';

const obj = 'foo';

console.log(
    Switch(obj)
    .Case(o => o === undefined, () => { throw new TypeError(); })
    .Default(() => 'OK')
); // Output: OK
```

You can use the input object from the switch head as part of the results:

```js
import Switch from 'switch-expr-vanilla';

const MEASUREMENT = 19;

console.log(
    Switch(MEASUREMENT)
    .Case(m => m < 9, m => m + ' is too low')
    .Case(m => m > 33, m => m + ' is too high')
    .Default(m => m + ' is alright')
); // Output: 19 is alright
```

Default value is optional:

```js
import Switch from 'switch-expr-vanilla';

const MEASUREMENT = 19;

console.log(
    Switch(MEASUREMENT)
    .Case(m => m < 9, m => m + ' is too low')
    .Case(m => m > 33, m => m + ' is too high')
    .Default()
); // Output: null
```

## Syntactic sugar for the switch expression

There are situations where matching against constant values with arrow functions is overkill:

```js
import Switch from 'switch-expr-vanilla';

const USERNAME = 'alex';

console.log(
    Switch(USERNAME)
    .Case(s => s === 'erick', 'It is the webmaster')
    .Case(s => s === 'alex', 'It is the DBA')
    .Case(s => typeof s === 'string', 'It is a visitor')
    .Default('Username not found')
); // Output: It is the DBA
```

However you can invoke the `equalTo()` function to improve conciseness:

```js
import Switch from 'switch-expr-vanilla';
import { equalTo } from 'switch-expr-vanilla';

const USERNAME = 'alex';

console.log(
    Switch(USERNAME)
    .Case(equalTo('erick'), 'It is the webmaster')
    .Case(equalTo('alex'), 'It is the DBA')
    .Case(s => typeof s === 'string', 'It is a visitor')
    .Default('Username not found')
); // Output: It is the DBA
```

You can use the `includedIn()` function to match against collections of values:

```js
import Switch from 'switch-expr-vanilla';
import { includedIn } from 'switch-expr-vanilla';

const NUMBER = 8;

console.log(
    Switch(NUMBER)
    .Case(includedIn(1, 3, 5, 7, 9), 'Positive odd less than 10')
    .Case(includedIn(2, 4, 6, 8), 'Positive even less than 10')
    .Default('Just a number')
); // Output: Positive even less than 10
```