export const javascriptEasyQuizzes = [
  {
    "title": "JavaScript: `let`, `const` & `var` Scoping",
    "description": "Learn block scoping vs function scoping, re-assignment rules, and constant object mutations.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What error is thrown when attempting to reassign a `const` variable?",
        "codeSnippet": "const maxRetries = 3;\nmaxRetries = 5;",
        "language": "javascript",
        "options": [
          "TypeError: Assignment to constant variable",
          "ReferenceError: maxRetries is not defined",
          "SyntaxError: Identifier 'maxRetries' has already been declared",
          "RangeError: Maximum call stack size exceeded"
        ],
        "correctAnswer": "TypeError: Assignment to constant variable",
        "explanation": "`const` creates an immutable primitive binding. Reassigning a new value directly to a constant variable throws a runtime TypeError."
      },
      {
        "question": "Can properties of an object declared with `const` be modified?",
        "codeSnippet": "const user = { name: 'Nahom' };\nuser.name = 'Alex';\nconsole.log(user.name);",
        "language": "javascript",
        "options": [
          "No, `const` freezes all nested object properties",
          "Yes, `const` prevents reassigning the variable identifier itself, not mutating object contents",
          "Only in non-strict mode",
          "No, it throws a TypeError: object is read-only"
        ],
        "correctAnswer": "Yes, `const` prevents reassigning the variable identifier itself, not mutating object contents",
        "explanation": "`const` prevents variable reassignment (`user = {}`), but the underlying object in heap memory remains fully mutable unless `Object.freeze()` is used."
      },
      {
        "question": "What will `console.log(x)` output outside the `if` block?",
        "codeSnippet": "if (true) {\n  var x = 10;\n  let y = 20;\n}\nconsole.log(x);",
        "language": "javascript",
        "options": [
          "undefined",
          "ReferenceError",
          "10",
          "NaN"
        ],
        "correctAnswer": "10",
        "explanation": "`var` is function-scoped (or globally scoped), not block-scoped, so `x` leaks outside the `if` block. `let y` is block-scoped and inaccessible outside."
      },
      {
        "question": "What happens if you declare a variable with `let` twice in the same block scope?",
        "codeSnippet": "let speed = 60;\nlet speed = 80;",
        "language": "javascript",
        "options": [
          "The second assignment silently overrides the first",
          "`speed` becomes an array `[60, 80]`",
          "It logs a warning in the console",
          "SyntaxError: Identifier 'speed' has already been declared"
        ],
        "correctAnswer": "SyntaxError: Identifier 'speed' has already been declared",
        "explanation": "`let` and `const` disallow duplicate declarations within the same scope. The parser throws a compile-time SyntaxError."
      },
      {
        "question": "What is the initial value of an uninitialized `let` variable declaration?",
        "codeSnippet": "let status;\nconsole.log(status);",
        "language": "javascript",
        "options": [
          "undefined",
          "null",
          "0",
          "ReferenceError"
        ],
        "correctAnswer": "undefined",
        "explanation": "Declaring a variable with `let status;` without providing an initial value automatically initializes it to `undefined`."
      }
    ]
  },
  {
    "title": "JavaScript: Template Literals",
    "description": "String interpolation, multiline strings, expressions inside `${}`, and escaping.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "Which characters delimit a JavaScript template literal?",
        "codeSnippet": "const msg = `Hello, ${name}`;",
        "language": "javascript",
        "options": [
          "Single quotes (' ')",
          "Backticks (` `)",
          "Double quotes (\" \")",
          "Angle brackets (< >)"
        ],
        "correctAnswer": "Backticks (` `)",
        "explanation": "Template literals are enclosed by backtick characters (`` ` ``), enabling string interpolation and multiline strings."
      },
      {
        "question": "Can arbitrary JavaScript expressions and calculations be evaluated inside `${}`?",
        "codeSnippet": "const price = 50;\nconst tax = 0.1;\nconsole.log(`Total: $${price * (1 + tax)}`);",
        "language": "javascript",
        "options": [
          "No, only raw variable identifiers are permitted",
          "Only if the expression returns a boolean",
          "Yes, any valid expression can be evaluated inside the placeholder",
          "No, it requires the `eval()` helper"
        ],
        "correctAnswer": "Yes, any valid expression can be evaluated inside the placeholder",
        "explanation": "Placeholders inside `${expression}` evaluate any valid JavaScript expression, including arithmetic, function calls, and ternary operators."
      },
      {
        "question": "What does this multiline template literal preserve in the output string?",
        "codeSnippet": "const text = `Line 1\nLine 2`;",
        "language": "javascript",
        "options": [
          "It strips all line breaks and combines them with a space",
          "It throws a SyntaxError: newline not allowed in strings",
          "It converts the text to an array of lines",
          "It preserves literal newline and whitespace characters without requiring `\\n` escape codes"
        ],
        "correctAnswer": "It preserves literal newline and whitespace characters without requiring `\\n` escape codes",
        "explanation": "Template literals preserve any whitespace and newline characters present between the backticks exactly as written."
      },
      {
        "question": "What will `console.log(`${user || 'Guest'}` )` output when `user` is empty string `\"\"`?",
        "codeSnippet": "const user = '';\nconsole.log(`Welcome, ${user || 'Guest'}!`);",
        "language": "javascript",
        "options": [
          "'Welcome, Guest!'",
          "'Welcome, !'",
          "'Welcome, undefined!'",
          "'Welcome, null!'"
        ],
        "correctAnswer": "'Welcome, Guest!'",
        "explanation": "Empty string `\"\"` is falsy. The logical OR operator `||` evaluates to `'Guest'`, which is interpolated into the string."
      },
      {
        "question": "How do you include a literal dollar sign before a placeholder in a template literal?",
        "codeSnippet": "const amount = 100;\n// Expected: '$100'",
        "language": "javascript",
        "options": [
          "`$$amount`",
          "`$${amount}`",
          "`\\$${amount}`",
          "`${$amount}`"
        ],
        "correctAnswer": "`$${amount}`",
        "explanation": "The first `$` is treated as a literal character, while the second `${amount}` denotes the template expression placeholder."
      }
    ]
  },
  {
    "title": "JavaScript: Push, Pop, Shift & Unshift",
    "description": "Add and remove elements from the start and end of arrays.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What does `array.push(item)` return?",
        "codeSnippet": "const items = ['a', 'b'];\nconst result = items.push('c');",
        "language": "javascript",
        "options": [
          "The newly added element ('c')",
          "The modified array itself",
          "The new length of the array (3)",
          "A boolean indicating success"
        ],
        "correctAnswer": "The new length of the array (3)",
        "explanation": "`.push()` appends one or more elements to the end of an array and returns the updated `.length` of the array."
      },
      {
        "question": "Which method removes and returns the LAST element of an array?",
        "codeSnippet": "const stack = [10, 20, 30];\nconst popped = stack.pop();",
        "language": "javascript",
        "options": [
          "`stack.shift()`",
          "`stack.splice(0, 1)`",
          "`stack.slice(-1)`",
          "`stack.pop()`"
        ],
        "correctAnswer": "`stack.pop()`",
        "explanation": "`.pop()` removes the last element from an array and returns that removed element, decreasing the array length by 1."
      },
      {
        "question": "Which method removes the FIRST element from an array and shifts all other elements down?",
        "codeSnippet": "const queue = ['first', 'second', 'third'];\nconst item = queue.????();",
        "language": "javascript",
        "options": [
          "`queue.shift()`",
          "`queue.pop()`",
          "`queue.unshift()`",
          "`queue.pull()`"
        ],
        "correctAnswer": "`queue.shift()`",
        "explanation": "`.shift()` removes the zero-th element from an array and returns it, shifting the consecutive element indices down."
      },
      {
        "question": "What does `array.unshift(item)` do?",
        "codeSnippet": "const list = [2, 3];\nlist.unshift(1);",
        "language": "javascript",
        "options": [
          "Removes elements from the start of the array",
          "Inserts elements at the beginning of the array and returns the new length",
          "Reverses the array elements",
          "Sorts the array in descending order"
        ],
        "correctAnswer": "Inserts elements at the beginning of the array and returns the new length",
        "explanation": "`.unshift()` adds one or more elements to the front of the array and returns the new array length."
      },
      {
        "question": "What will `console.log(arr)` show after this sequence?",
        "codeSnippet": "const arr = [1, 2];\narr.push(3);\narr.shift();\nconsole.log(arr);",
        "language": "javascript",
        "options": [
          "[1, 2]",
          "[1, 3]",
          "[2, 3]",
          "[3]"
        ],
        "correctAnswer": "[2, 3]",
        "explanation": "`arr.push(3)` turns the array into `[1, 2, 3]`. Then `arr.shift()` removes `1` from the start, leaving `[2, 3]`."
      }
    ]
  },
  {
    "title": "JavaScript: Array `forEach` vs `map`",
    "description": "Side effects with `forEach` vs producing transformed arrays with `map`.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What is the return value of `Array.prototype.forEach()`?",
        "codeSnippet": "const nums = [1, 2, 3];\nconst result = nums.forEach(n => n * 2);",
        "language": "javascript",
        "options": [
          "`[2, 4, 6]`",
          "`3` (the number of items processed)",
          "A copy of the original array",
          "`undefined` (it performs side effects and returns no value)"
        ],
        "correctAnswer": "`undefined` (it performs side effects and returns no value)",
        "explanation": "`.forEach()` always returns `undefined`. It is designed strictly for executing side effects (logging, updating external variables, etc.)."
      },
      {
        "question": "What is the primary purpose of `Array.prototype.map()`?",
        "codeSnippet": "const doubles = [1, 2, 3].map(n => n * 2);",
        "language": "javascript",
        "options": [
          "To create a new array populated with the results of calling the provided function on every element",
          "To mutate the original array in place",
          "To filter out elements that are falsy",
          "To sum all numbers in the array"
        ],
        "correctAnswer": "To create a new array populated with the results of calling the provided function on every element",
        "explanation": "`.map()` produces a brand-new array of identical length containing the return values of each callback execution without mutating the input array."
      },
      {
        "question": "What arguments does the callback function passed to `.map()` receive?",
        "codeSnippet": "const items = ['a', 'b'];\nitems.map((item, index, array) => { ... });",
        "language": "javascript",
        "options": [
          "Only the current element",
          "The current element, the current index, and the original array itself",
          "The current element and the parent object",
          "The index and a boolean flag"
        ],
        "correctAnswer": "The current element, the current index, and the original array itself",
        "explanation": "The mapper callback receives three arguments: `(currentValue, index, array)`."
      },
      {
        "question": "What will `console.log(result)` output when `.map()` has no explicit return?",
        "codeSnippet": "const nums = [1, 2];\nconst result = nums.map(n => { n * 2; });\nconsole.log(result);",
        "language": "javascript",
        "options": [
          "[2, 4]",
          "[]",
          "[undefined, undefined]",
          "TypeError"
        ],
        "correctAnswer": "[undefined, undefined]",
        "explanation": "Because block body `{ n * 2; }` lacks a `return` keyword, each iteration returns `undefined`, resulting in `[undefined, undefined]`."
      },
      {
        "question": "Which method is appropriate when you want to compute a new array of formatted strings?",
        "codeSnippet": "const users = [{ name: 'A' }, { name: 'B' }];\n// Expected: ['User: A', 'User: B']",
        "language": "javascript",
        "options": [
          "`users.forEach(u => `User: ${u.name}` )`",
          "`users.push(u => `User: ${u.name}` )`",
          "`users.filter(u => `User: ${u.name}` )`",
          "`users.map(u => `User: ${u.name}` )`"
        ],
        "correctAnswer": "`users.map(u => `User: ${u.name}` )`",
        "explanation": "Transforming an array of data into a new array of formatted values is the standard role of `.map()`."
      }
    ]
  },
  {
    "title": "JavaScript: Object Property Access",
    "description": "Dot notation vs bracket notation, dynamic keys, and accessing nested properties.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "When MUST bracket notation `obj[prop]` be used instead of dot notation `obj.prop`?",
        "codeSnippet": "const data = { 'user-id': 123, role: 'admin' };",
        "language": "javascript",
        "options": [
          "When the property name contains hyphens, spaces, or comes from a dynamic variable",
          "When the object was created using `Object.create()`",
          "When the value is an array or object",
          "When running code in Node.js instead of browser"
        ],
        "correctAnswer": "When the property name contains hyphens, spaces, or comes from a dynamic variable",
        "explanation": "Dot notation requires valid JavaScript identifiers. Keys with hyphens (`'user-id'`) or variables (`obj[keyVariable]`) require bracket notation."
      },
      {
        "question": "What does accessing a non-existent property on an object return in JavaScript?",
        "codeSnippet": "const settings = { theme: 'dark' };\nconsole.log(settings.fontSize);",
        "language": "javascript",
        "options": [
          "`null`",
          "`undefined`",
          "ReferenceError: fontSize is not defined",
          "`false`"
        ],
        "correctAnswer": "`undefined`",
        "explanation": "Accessing an undeclared property on an existing object safely evaluates to `undefined` without throwing an error."
      },
      {
        "question": "What will `console.log(person[key])` output in this snippet?",
        "codeSnippet": "const key = 'name';\nconst person = { name: 'Dev', key: 'Secret' };\nconsole.log(person[key]);",
        "language": "javascript",
        "options": [
          "'Secret'",
          "undefined",
          "'Dev'",
          "TypeError"
        ],
        "correctAnswer": "'Dev'",
        "explanation": "`person[key]` evaluates variable `key` ('name'), accessing `person['name']` which is `'Dev'`. In contrast, `person.key` would access `'Secret'`."
      },
      {
        "question": "How do you delete a property from an object so it is no longer present?",
        "codeSnippet": "const car = { make: 'Tesla', model: '3' };\n// Remove 'model' completely",
        "language": "javascript",
        "options": [
          "`car.model = null;`",
          "`car.model = undefined;`",
          "`car.remove('model');`",
          "`delete car.model;`"
        ],
        "correctAnswer": "`delete car.model;`",
        "explanation": "`delete obj.prop` deletes the property binding entirely from the object so `'model' in car` evaluates to `false`."
      },
      {
        "question": "What happens when you access a property on an `undefined` value?",
        "codeSnippet": "let config;\nconsole.log(config.apiUrl);",
        "language": "javascript",
        "options": [
          "TypeError: Cannot read properties of undefined (reading 'apiUrl')",
          "undefined",
          "null",
          "false"
        ],
        "correctAnswer": "TypeError: Cannot read properties of undefined (reading 'apiUrl')",
        "explanation": "Attempting to access properties on `null` or `undefined` throws a runtime TypeError because primitives have no prototype or object wrapper."
      }
    ]
  },
  {
    "title": "JavaScript: Truthy & Falsy Values",
    "description": "Identify all falsy values in JavaScript and understand truthy coercions.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "Which of the following values is TRUTHY in JavaScript?",
        "codeSnippet": "// Identify the truthy value",
        "language": "javascript",
        "options": [
          "`0`",
          "`[]` (empty array)",
          "`\"\"` (empty string)",
          "`NaN`"
        ],
        "correctAnswer": "`[]` (empty array)",
        "explanation": "All objects and arrays (even empty ones like `[]` and `{}`) are truthy. Only `false`, `0`, `-0`, `0n`, `\"\"`, `null`, `undefined`, and `NaN` are falsy."
      },
      {
        "question": "What does `Boolean('false')` evaluate to?",
        "codeSnippet": "console.log(Boolean('false'));",
        "language": "javascript",
        "options": [
          "`false` (the string text says false)",
          "`undefined`",
          "`true` (any non-empty string is truthy)",
          "`NaN`"
        ],
        "correctAnswer": "`true` (any non-empty string is truthy)",
        "explanation": "The string `'false'` has a length of 5. Any string with length > 0 is truthy regardless of what characters it contains."
      },
      {
        "question": "What does the double exclamation mark (`!!value`) do in JavaScript?",
        "codeSnippet": "const hasToken = !!sessionStorage.getItem('token');",
        "language": "javascript",
        "options": [
          "Executes the value as a macro",
          "Checks if the value is strictly equal to null",
          "Converts the value to a floating point number",
          "Negates the value twice, effectively converting it to an explicit boolean"
        ],
        "correctAnswer": "Negates the value twice, effectively converting it to an explicit boolean",
        "explanation": "`!!` is an idiomatic shorthand for `Boolean(value)`. The first `!` converts to inverted boolean; the second `!` restores correct polarity."
      },
      {
        "question": "Which of the following is NOT one of the 8 falsy values in JavaScript?",
        "codeSnippet": "// Falsy evaluation check",
        "language": "javascript",
        "options": [
          "`'0'`",
          "`0`",
          "`null`",
          "`undefined`"
        ],
        "correctAnswer": "`'0'`",
        "explanation": "The string `'0'` is non-empty, making it truthy. The number `0` is falsy, but string `'0'` is truthy."
      },
      {
        "question": "What will this condition evaluate and log?",
        "codeSnippet": "if ({}) {\n  console.log('Pass');\n} else {\n  console.log('Fail');\n}",
        "language": "javascript",
        "options": [
          "'Fail'",
          "'Pass' (empty object is an object reference, hence truthy)",
          "SyntaxError",
          "undefined"
        ],
        "correctAnswer": "'Pass' (empty object is an object reference, hence truthy)",
        "explanation": "In JavaScript, all objects evaluate to `true` in boolean contexts, including empty `{}`."
      }
    ]
  },
  {
    "title": "JavaScript: Math & Number Utilities",
    "description": "Master `Math.floor`, `Math.ceil`, `Math.round`, `toFixed`, and `parseInt`.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What does `Math.floor(4.9)` return?",
        "codeSnippet": "console.log(Math.floor(4.9));",
        "language": "javascript",
        "options": [
          "5",
          "4.9",
          "4",
          "NaN"
        ],
        "correctAnswer": "4",
        "explanation": "`Math.floor()` rounds downwards to the nearest integer that is less than or equal to the argument."
      },
      {
        "question": "What is the return type of `(3.14159).toFixed(2)`?",
        "codeSnippet": "const formatted = (3.14159).toFixed(2);\nconsole.log(typeof formatted, formatted);",
        "language": "javascript",
        "options": [
          "`number` and `3.14`",
          "`float` and `3.14`",
          "`number` and `3.14159`",
          "`string` and `'3.14'`"
        ],
        "correctAnswer": "`string` and `'3.14'`",
        "explanation": "`.toFixed()` returns a string representation of the number formatted with the specified number of decimal digits."
      },
      {
        "question": "What does `Math.ceil(2.1)` return?",
        "codeSnippet": "console.log(Math.ceil(2.1));",
        "language": "javascript",
        "options": [
          "3",
          "2",
          "2.5",
          "0"
        ],
        "correctAnswer": "3",
        "explanation": "`Math.ceil()` always rounds up to the next highest integer."
      },
      {
        "question": "How do you generate a random integer between 1 and 10 (inclusive)?",
        "codeSnippet": "// Random integer formula",
        "language": "javascript",
        "options": [
          "`Math.random() * 10`",
          "`Math.floor(Math.random() * 10) + 1`",
          "`Math.round(Math.random() * 9)`",
          "`Math.ceil(Math.random() * 9)`"
        ],
        "correctAnswer": "`Math.floor(Math.random() * 10) + 1`",
        "explanation": "`Math.random()` generates a float in `[0, 1)`. Multiplying by 10 and flooring gives integers `0-9`, and adding 1 shifts the range to `1-10`."
      },
      {
        "question": "What does `Number.isNaN('hello')` return compared to global `isNaN('hello')`?",
        "codeSnippet": "console.log(isNaN('hello'), Number.isNaN('hello'));",
        "language": "javascript",
        "options": [
          "`true` and `true`",
          "`false` and `true`",
          "`true` and `false`",
          "`false` and `false`"
        ],
        "correctAnswer": "`true` and `false`",
        "explanation": "Global `isNaN` coerces `'hello'` to a number (yielding `NaN`), returning `true`. Modern `Number.isNaN()` does not coerce, returning `false` because `'hello'` is a string."
      }
    ]
  },
  {
    "title": "JavaScript: String Manipulation",
    "description": "Work with `.includes()`, `.slice()`, `.split()`, `.trim()`, and `.replace()`.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What does `'JavaScript'.slice(0, 4)` return?",
        "codeSnippet": "console.log('JavaScript'.slice(0, 4));",
        "language": "javascript",
        "options": [
          "'JavaS'",
          "'Script'",
          "'J'",
          "'Java'"
        ],
        "correctAnswer": "'Java'",
        "explanation": "`.slice(start, end)` extracts characters from index 0 up to (but not including) index 4, returning `'Java'`."
      },
      {
        "question": "Which method checks if a string contains a specified substring and returns a boolean?",
        "codeSnippet": "const url = 'https://devarena.io/dashboard';\nconst isSecure = url.????????('https');",
        "language": "javascript",
        "options": [
          "`url.includes('https')`",
          "`url.contains('https')`",
          "`url.has('https')`",
          "`url.matchString('https')`"
        ],
        "correctAnswer": "`url.includes('https')`",
        "explanation": "`.includes(searchString)` returns `true` if the string contains the given substring, and `false` otherwise."
      },
      {
        "question": "What does `'apple,banana,cherry'.split(',')` return?",
        "codeSnippet": "const fruits = 'apple,banana,cherry'.split(',');",
        "language": "javascript",
        "options": [
          "`'apple banana cherry'`",
          "`['apple', 'banana', 'cherry']`",
          "`{ 0: 'apple', 1: 'banana', 2: 'cherry' }`",
          "`['apple,banana,cherry']`"
        ],
        "correctAnswer": "`['apple', 'banana', 'cherry']`",
        "explanation": "`.split(separator)` divides a string into an ordered list of substrings and returns them in an array."
      },
      {
        "question": "What does `.trim()` remove from a string?",
        "codeSnippet": "const email = '  user@devarena.io  \n';\nconst clean = email.trim();",
        "language": "javascript",
        "options": [
          "All spaces in the entire string",
          "Only newline characters",
          "Whitespace from both the beginning and the end of the string",
          "Special punctuation characters"
        ],
        "correctAnswer": "Whitespace from both the beginning and the end of the string",
        "explanation": "`.trim()` removes whitespace (spaces, tabs, newlines) from both ends of a string without modifying internal spaces."
      },
      {
        "question": "Are strings mutable in JavaScript?",
        "codeSnippet": "let str = 'hello';\nstr[0] = 'H';\nconsole.log(str);",
        "language": "javascript",
        "options": [
          "'Hello'",
          "TypeError: strings are read-only",
          "undefined",
          "'hello' (strings are primitive and immutable in JavaScript)"
        ],
        "correctAnswer": "'hello' (strings are primitive and immutable in JavaScript)",
        "explanation": "Strings are primitive values and cannot be mutated in place. Index assignments like `str[0] = 'H'` fail silently (or throw in strict mode)."
      }
    ]
  },
  {
    "title": "JavaScript: Strict vs Loose Equality",
    "description": "Understand type coercion differences between `==` and `===`.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What is the primary difference between `==` and `===` in JavaScript?",
        "codeSnippet": "console.log(5 == '5', 5 === '5');",
        "language": "javascript",
        "options": [
          "`==` performs type coercion before comparing; `===` checks both value and type strictly without coercion",
          "`===` is only for strings",
          "`==` is faster than `===`",
          "There is no difference in modern browsers"
        ],
        "correctAnswer": "`==` performs type coercion before comparing; `===` checks both value and type strictly without coercion",
        "explanation": "Loose equality (`==`) coerces operands of different types before checking. Strict equality (`===`) requires both value and type to match."
      },
      {
        "question": "What does `null == undefined` and `null === undefined` evaluate to?",
        "codeSnippet": "console.log(null == undefined, null === undefined);",
        "language": "javascript",
        "options": [
          "`true` and `true`",
          "`true` and `false`",
          "`false` and `false`",
          "`false` and `true`"
        ],
        "correctAnswer": "`true` and `false`",
        "explanation": "`null` and `undefined` loosely equal each other under `==` rules, but have different types (`typeof null === 'object'`, `typeof undefined === 'undefined'`), so `===` evaluates to `false`."
      },
      {
        "question": "What does `'0' === 0` evaluate to?",
        "codeSnippet": "console.log('0' === 0);",
        "language": "javascript",
        "options": [
          "true",
          "TypeError",
          "false (string type does not match number type)",
          "NaN"
        ],
        "correctAnswer": "false (string type does not match number type)",
        "explanation": "Under strict equality (`===`), the operands have different primitive types (`string` vs `number`), so it evaluates to `false` immediately."
      },
      {
        "question": "Why should developers almost always prefer `===` over `==` in modern engineering?",
        "codeSnippet": "// Strict equality best practice",
        "language": "javascript",
        "options": [
          "Because `==` was deprecated in ES6",
          "Because `===` automatically casts numbers to 64-bit floats",
          "`==` is not supported in Node.js",
          "To avoid unintended and bug-prone implicit type coercion surprises"
        ],
        "correctAnswer": "To avoid unintended and bug-prone implicit type coercion surprises",
        "explanation": "Strict equality prevents bizarre coercion pitfalls (e.g. `\"0\" == false`, `[] == 0`) and makes code predictable and lint-compliant."
      },
      {
        "question": "What does `NaN === NaN` evaluate to?",
        "codeSnippet": "console.log(NaN === NaN);",
        "language": "javascript",
        "options": [
          "false (`NaN` is the only value in JavaScript that is not equal to itself)",
          "true",
          "TypeError",
          "undefined"
        ],
        "correctAnswer": "false (`NaN` is the only value in JavaScript that is not equal to itself)",
        "explanation": "By specification (IEEE 754), `NaN` compared to anything—including another `NaN`—always evaluates to `false`. Use `Number.isNaN()` instead."
      }
    ]
  },
  {
    "title": "JavaScript: Default Parameters",
    "description": "Fallback arguments, evaluating expressions in defaults, and order of evaluation.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What will `greet()` print when called with no arguments?",
        "codeSnippet": "function greet(name = 'Developer') {\n  return `Hello, ${name}`;\n}\nconsole.log(greet());",
        "language": "javascript",
        "options": [
          "'Hello, undefined'",
          "'Hello, Developer'",
          "TypeError: Missing argument",
          "'Hello, '"
        ],
        "correctAnswer": "'Hello, Developer'",
        "explanation": "When an argument is omitted or passed as `undefined`, JavaScript uses the default value specified in the parameter list."
      },
      {
        "question": "What happens when you pass `null` to a function with a default parameter?",
        "codeSnippet": "function logScore(score = 100) {\n  return score;\n}\nconsole.log(logScore(null));",
        "language": "javascript",
        "options": [
          "100",
          "undefined",
          "null",
          "0"
        ],
        "correctAnswer": "null",
        "explanation": "Default parameters ONLY activate for `undefined`. `null` is an intentional value representing empty object, so it is preserved."
      },
      {
        "question": "Can default parameters reference earlier parameters in the same function signature?",
        "codeSnippet": "function createArea(width, height = width * 2) {\n  return width * height;\n}\nconsole.log(createArea(5));",
        "language": "javascript",
        "options": [
          "No, parameters cannot reference other parameters",
          "Only if the function is asynchronous",
          "It throws a ReferenceError: width is not defined",
          "Yes, earlier parameters are available to later default expressions (returns 50)"
        ],
        "correctAnswer": "Yes, earlier parameters are available to later default expressions (returns 50)",
        "explanation": "Parameters are evaluated from left to right. Later parameters can reference earlier initialized parameters in their default expressions."
      },
      {
        "question": "When are default parameter expressions evaluated?",
        "codeSnippet": "function generateId(id = Math.random()) {\n  return id;\n}",
        "language": "javascript",
        "options": [
          "At call time, every time the function is invoked without that argument",
          "Once at compile time when the module loads",
          "During garbage collection",
          "Only when the function is imported"
        ],
        "correctAnswer": "At call time, every time the function is invoked without that argument",
        "explanation": "Default parameter expressions are evaluated at runtime when the function is called, producing fresh values on every invocation."
      },
      {
        "question": "What does `logStatus(undefined)` output?",
        "codeSnippet": "function logStatus(active = true) {\n  return active;\n}\nconsole.log(logStatus(undefined));",
        "language": "javascript",
        "options": [
          "undefined",
          "true",
          "false",
          "TypeError"
        ],
        "correctAnswer": "true",
        "explanation": "Passing `undefined` explicitly triggers the default parameter just like omitting the argument entirely."
      }
    ]
  },
  {
    "title": "JavaScript: Arrow Function Syntax",
    "description": "Concise syntax, implicit returns, single argument shortcuts, and returning objects.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What is the return value of this concise arrow function?",
        "codeSnippet": "const square = x => x * x;\nconsole.log(square(4));",
        "language": "javascript",
        "options": [
          "undefined",
          "NaN",
          "16 (expression body has an implicit return)",
          "TypeError"
        ],
        "correctAnswer": "16 (expression body has an implicit return)",
        "explanation": "Arrow functions without curly braces `{}` implicitly return the result of the single expression."
      },
      {
        "question": "How do you implicitly return an object literal from a concise arrow function?",
        "codeSnippet": "const makeUser = (id) => ?????;",
        "language": "javascript",
        "options": [
          "`{ id }`",
          "`return { id }`",
          "`new { id }`",
          "`({ id })` (wrapping the object literal in parentheses)"
        ],
        "correctAnswer": "`({ id })` (wrapping the object literal in parentheses)",
        "explanation": "Wrapping the object in parentheses `({ id })` prevents the engine from misinterpreting curly braces as a function block body."
      },
      {
        "question": "When are parentheses optional around arrow function parameters?",
        "codeSnippet": "// Arrow parameter syntax",
        "language": "javascript",
        "options": [
          "When there is exactly one parameter and no destructuring/defaults",
          "When there are zero parameters",
          "Whenever default values are provided",
          "Parentheses are never optional"
        ],
        "correctAnswer": "When there is exactly one parameter and no destructuring/defaults",
        "explanation": "Parentheses can be omitted only when an arrow function has exactly one simple parameter (e.g. `x => x * 2`)."
      },
      {
        "question": "Do arrow functions have their own `arguments` object?",
        "codeSnippet": "const fn = () => {\n  console.log(arguments);\n};\nfn(1, 2);",
        "language": "javascript",
        "options": [
          "Yes, it contains an array of inputs",
          "No, arrow functions do not have an `arguments` binding; use rest parameters `(...args)` instead",
          "Only in Node.js",
          "Yes, but it is deprecated"
        ],
        "correctAnswer": "No, arrow functions do not have an `arguments` binding; use rest parameters `(...args)` instead",
        "explanation": "Arrow functions do not bind `arguments`. If referenced, `arguments` looks up the enclosing standard function scope. Use `(...args) => {}`."
      },
      {
        "question": "Can arrow functions be used as constructors with the `new` keyword?",
        "codeSnippet": "const Person = (name) => { this.name = name; };\nconst p = new Person('Alex');",
        "language": "javascript",
        "options": [
          "Yes, it instantiates an object",
          "ReferenceError",
          "TypeError: Person is not a constructor",
          "It returns undefined"
        ],
        "correctAnswer": "TypeError: Person is not a constructor",
        "explanation": "Arrow functions do not possess a `[[Construct]]` internal method or prototype property, so calling them with `new` throws a TypeError."
      }
    ]
  },
  {
    "title": "JavaScript: `includes()` & `indexOf()`",
    "description": "Search arrays, check element presence, and handle index offsets.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What does `['apple', 'banana'].includes('banana')` return?",
        "codeSnippet": "const hasBanana = ['apple', 'banana'].includes('banana');",
        "language": "javascript",
        "options": [
          "1",
          "'banana'",
          "['banana']",
          "true"
        ],
        "correctAnswer": "true",
        "explanation": "`.includes()` returns a boolean (`true` or `false`) indicating whether an element is present in the array."
      },
      {
        "question": "What does `array.indexOf(item)` return when the item is NOT found?",
        "codeSnippet": "const nums = [1, 2, 3];\nconsole.log(nums.indexOf(99));",
        "language": "javascript",
        "options": [
          "-1",
          "false",
          "null",
          "undefined"
        ],
        "correctAnswer": "-1",
        "explanation": "`.indexOf()` returns the index of the first matching element, or `-1` if the element does not exist in the array."
      },
      {
        "question": "Can `Array.prototype.includes()` correctly detect `NaN` in an array?",
        "codeSnippet": "const items = [1, NaN, 2];\nconsole.log(items.includes(NaN), items.indexOf(NaN));",
        "language": "javascript",
        "options": [
          "`false` and `-1`",
          "`true` and `-1`",
          "`true` and `1`",
          "`false` and `1`"
        ],
        "correctAnswer": "`true` and `-1`",
        "explanation": "`.includes()` uses the SameValueZero comparison algorithm, allowing it to find `NaN`. `indexOf()` uses strict `===`, so it fails to locate `NaN`."
      },
      {
        "question": "How do you check if an element is in an array using `indexOf()`?",
        "codeSnippet": "const permissions = ['read', 'write'];\n// Idiomatic check before .includes() was added in ES2016",
        "language": "javascript",
        "options": [
          "`permissions.indexOf('admin') === true`",
          "`permissions.indexOf('admin') > 0`",
          "`permissions.indexOf('admin') !== -1`",
          "`permissions.indexOf('admin') != null`"
        ],
        "correctAnswer": "`permissions.indexOf('admin') !== -1`",
        "explanation": "Because an item at index 0 is valid, comparing `!== -1` is the correct way to test membership with `indexOf()`."
      },
      {
        "question": "What will `['a', 'b', 'a'].lastIndexOf('a')` return?",
        "codeSnippet": "console.log(['a', 'b', 'a'].lastIndexOf('a'));",
        "language": "javascript",
        "options": [
          "0",
          "true",
          "-1",
          "2"
        ],
        "correctAnswer": "2",
        "explanation": "`.lastIndexOf()` searches the array backwards from the end and returns the last index at which the element was found."
      }
    ]
  },
  {
    "title": "JavaScript: Object Iteration",
    "description": "Convert objects to arrays with `Object.keys`, `Object.values`, and `Object.entries`.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What does `Object.keys({ a: 1, b: 2 })` return?",
        "codeSnippet": "const keys = Object.keys({ a: 1, b: 2 });",
        "language": "javascript",
        "options": [
          "['a', 'b']",
          "[1, 2]",
          "[['a', 1], ['b', 2]]",
          "{ a: true, b: true }"
        ],
        "correctAnswer": "['a', 'b']",
        "explanation": "`Object.keys()` returns an array of a given object's own enumerable property names (keys) as strings."
      },
      {
        "question": "What does `Object.values({ x: 10, y: 20 })` return?",
        "codeSnippet": "const values = Object.values({ x: 10, y: 20 });",
        "language": "javascript",
        "options": [
          "['x', 'y']",
          "[10, 20]",
          "30",
          "{ 0: 10, 1: 20 }"
        ],
        "correctAnswer": "[10, 20]",
        "explanation": "`Object.values()` returns an array containing the property values in the same order as `for...in`."
      },
      {
        "question": "What does `Object.entries()` return?",
        "codeSnippet": "const entries = Object.entries({ name: 'Alex', age: 30 });",
        "language": "javascript",
        "options": [
          "A Map instance",
          "A string `'name: Alex, age: 30'`",
          "An array of `[key, value]` pairs: `[['name', 'Alex'], ['age', 30]]`",
          "An iterator that only yields keys"
        ],
        "correctAnswer": "An array of `[key, value]` pairs: `[['name', 'Alex'], ['age', 30]]`",
        "explanation": "`Object.entries()` returns an array of key-value pairs formatted as nested two-element arrays `[key, value]`."
      },
      {
        "question": "Which method reconstructs an object from an array of key-value pairs?",
        "codeSnippet": "const pairs = [['theme', 'dark'], ['lang', 'en']];\nconst obj = ?????(pairs);",
        "language": "javascript",
        "options": [
          "`Object.toObject(pairs)`",
          "`Object.create(pairs)`",
          "`Object.assign(pairs)`",
          "`Object.fromEntries(pairs)`"
        ],
        "correctAnswer": "`Object.fromEntries(pairs)`",
        "explanation": "`Object.fromEntries()` (ES2019) transforms a list of key-value pairs (like entries or a Map) into an object."
      },
      {
        "question": "How can you count how many keys an object has?",
        "codeSnippet": "const stats = { users: 100, active: 40, errors: 0 };\nconst count = ?????;",
        "language": "javascript",
        "options": [
          "`Object.keys(stats).length`",
          "`stats.length`",
          "`stats.size`",
          "`Object.count(stats)`"
        ],
        "correctAnswer": "`Object.keys(stats).length`",
        "explanation": "Standard objects do not have `.length` or `.size` properties. Calling `Object.keys(stats).length` counts the enumerable own keys."
      }
    ]
  },
  {
    "title": "JavaScript: Basic Destructuring",
    "description": "Unpack values from arrays and properties from objects into distinct variables.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What will `console.log(first, second)` print after array destructuring?",
        "codeSnippet": "const colors = ['red', 'green', 'blue'];\nconst [first, second] = colors;\nconsole.log(first, second);",
        "language": "javascript",
        "options": [
          "'green' 'blue'",
          "'red' 'green'",
          "['red', 'green'] undefined",
          "ReferenceError"
        ],
        "correctAnswer": "'red' 'green'",
        "explanation": "Array destructuring unpacks values positionally based on index: `first` receives index 0, and `second` receives index 1."
      },
      {
        "question": "How do you skip an element when destructuring an array?",
        "codeSnippet": "const coords = [10, 20, 30];\n// Extract only the first and third items",
        "language": "javascript",
        "options": [
          "`const [x, null, z] = coords;`",
          "`const [x, skip, z] = coords;`",
          "`const [x, , z] = coords;`",
          "`const [x; z] = coords;`"
        ],
        "correctAnswer": "`const [x, , z] = coords;`",
        "explanation": "Leaving an empty comma `[x, , z]` instructs the destructuring pattern to skip that position without binding a variable."
      },
      {
        "question": "What will `console.log(city)` output for this object destructuring?",
        "codeSnippet": "const user = { name: 'Sarah' };\nconst { city = 'Tokyo' } = user;\nconsole.log(city);",
        "language": "javascript",
        "options": [
          "undefined",
          "null",
          "ReferenceError: city is not defined",
          "'Tokyo' (fallback default value)"
        ],
        "correctAnswer": "'Tokyo' (fallback default value)",
        "explanation": "Because `user.city` is `undefined`, the default value `'Tokyo'` is assigned to the variable `city`."
      },
      {
        "question": "How do you swap two variables `a` and `b` without using a temporary variable?",
        "codeSnippet": "let a = 1, b = 2;\n// One-line swap",
        "language": "javascript",
        "options": [
          "`[a, b] = [b, a];`",
          "`a = b, b = a;`",
          "`a.swap(b);`",
          "`swap(a, b);`"
        ],
        "correctAnswer": "`[a, b] = [b, a];`",
        "explanation": "`[a, b] = [b, a]` evaluates the right-hand array `[2, 1]` and unpacks it into `a` and `b`, swapping their values cleanly."
      },
      {
        "question": "How do you unpack a property and rename it to a new local variable name?",
        "codeSnippet": "const config = { host: 'localhost' };\n// Assign property 'host' to variable 'serverHost'",
        "language": "javascript",
        "options": [
          "`const { host as serverHost } = config;`",
          "`const { host: serverHost } = config;`",
          "`const { serverHost = host } = config;`",
          "`const { host -> serverHost } = config;`"
        ],
        "correctAnswer": "`const { host: serverHost } = config;`",
        "explanation": "`{ propertyName: localVariableName }` extracts `config.host` and assigns it to a new variable called `serverHost`."
      }
    ]
  },
  {
    "title": "JavaScript: Error Handling with Try/Catch",
    "description": "Catch runtime exceptions, examine Error objects, and ensure cleanup with `finally`.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What happens when an exception is thrown inside a `try` block?",
        "codeSnippet": "try {\n  throw new Error('Something broke');\n  console.log('After');\n} catch (err) {\n  console.log('Caught');\n}",
        "language": "javascript",
        "options": [
          "The code crashes the browser tab",
          "The script re-runs the try block up to 3 times",
          "Execution jumps immediately to the `catch` block; 'After' is never logged",
          "'After' executes first, then 'Caught'"
        ],
        "correctAnswer": "Execution jumps immediately to the `catch` block; 'After' is never logged",
        "explanation": "When an error is thrown, the engine immediately suspends execution in the `try` block and transfers control to the `catch` block."
      },
      {
        "question": "What properties are standard on JavaScript `Error` objects?",
        "codeSnippet": "const err = new Error('Invalid input');",
        "language": "javascript",
        "options": [
          "`.code` and `.status`",
          "`.data` and `.payload`",
          "`.reason` only",
          "`.message` and `.name` (and `.stack`)"
        ],
        "correctAnswer": "`.message` and `.name` (and `.stack`)",
        "explanation": "Native `Error` instances have a `.name` (e.g. 'Error', 'TypeError') and a `.message` string passed during instantiation."
      },
      {
        "question": "Does the `finally` block execute if the `try` block returns early?",
        "codeSnippet": "function check() {\n  try {\n    return 'Done';\n  } finally {\n    console.log('Cleanup');\n  }\n}\ncheck();",
        "language": "javascript",
        "options": [
          "Yes, `finally` always executes before the function exits",
          "No, `return` skips the finally block",
          "Only in Node.js",
          "SyntaxError: return not allowed in try without catch"
        ],
        "correctAnswer": "Yes, `finally` always executes before the function exits",
        "explanation": "The `finally` block is guaranteed to execute even if a `return` or `throw` occurs inside `try` or `catch`."
      },
      {
        "question": "Can you omit the error parameter in the `catch` block in modern JavaScript?",
        "codeSnippet": "try {\n  JSON.parse(data);\n} catch {\n  // Optional catch binding (ES2019)\n  console.log('Invalid JSON');\n}",
        "language": "javascript",
        "options": [
          "No, `(err)` is mandatory syntax",
          "Yes, optional catch binding allows `catch { ... }` without declaring `(error)`",
          "Only if the error is a TypeError",
          "Only inside async functions"
        ],
        "correctAnswer": "Yes, optional catch binding allows `catch { ... }` without declaring `(error)`",
        "explanation": "Optional catch binding (introduced in ES2019) allows omitting `(err)` when the error variable is not needed."
      },
      {
        "question": "What will `console.log('Finished')` do in this snippet?",
        "codeSnippet": "try {\n  JSON.parse('{ invalid }');\n} catch (e) {\n  console.log('Error caught');\n}\nconsole.log('Finished');",
        "language": "javascript",
        "options": [
          "It is skipped because the script crashed",
          "It throws a SyntaxError",
          "It logs 'Finished' because the error was handled and script execution continues normally",
          "It returns null"
        ],
        "correctAnswer": "It logs 'Finished' because the error was handled and script execution continues normally",
        "explanation": "Handling an exception with `try...catch` prevents uncaught runtime crashes, allowing following code to execute normally."
      }
    ]
  },
  {
    "title": "JavaScript: The `typeof` Operator",
    "description": "Check primitive types, object classifications, and function types.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What does `typeof 42` and `typeof 'hello'` return?",
        "codeSnippet": "console.log(typeof 42, typeof 'hello');",
        "language": "javascript",
        "options": [
          "'integer' and 'string'",
          "'number' and 'text'",
          "'int' and 'str'",
          "'number' and 'string'"
        ],
        "correctAnswer": "'number' and 'string'",
        "explanation": "In JavaScript, numeric primitives evaluate to `'number'`, and text values evaluate to `'string'`."
      },
      {
        "question": "What does `typeof []` (an array) evaluate to?",
        "codeSnippet": "console.log(typeof []);",
        "language": "javascript",
        "options": [
          "'object'",
          "'array'",
          "'list'",
          "'undefined'"
        ],
        "correctAnswer": "'object'",
        "explanation": "Arrays are specialized objects in JavaScript. `typeof []` returns `'object'`. Use `Array.isArray([])` to distinguish arrays from plain objects."
      },
      {
        "question": "What does `typeof function() {}` return?",
        "codeSnippet": "console.log(typeof (() => {}));",
        "language": "javascript",
        "options": [
          "'object'",
          "'function'",
          "'arrow'",
          "'method'"
        ],
        "correctAnswer": "'function'",
        "explanation": "Even though functions inherit from `Object.prototype`, the `typeof` operator specifically identifies callable functions with `'function'`."
      },
      {
        "question": "What does `typeof undefined` return?",
        "codeSnippet": "let user;\nconsole.log(typeof user);",
        "language": "javascript",
        "options": [
          "'null'",
          "'object'",
          "'undefined'",
          "'void'"
        ],
        "correctAnswer": "'undefined'",
        "explanation": "Variables that have been declared without an assignment have value `undefined`, and `typeof undefined` returns `'undefined'`."
      },
      {
        "question": "How do you reliably verify that a variable is an Array rather than a plain Object?",
        "codeSnippet": "const data = [1, 2, 3];",
        "language": "javascript",
        "options": [
          "`typeof data === 'array'`",
          "`data.type === 'array'`",
          "`data instanceof Object`",
          "`Array.isArray(data)`"
        ],
        "correctAnswer": "`Array.isArray(data)`",
        "explanation": "`Array.isArray()` is the standard, reliable method to test whether a value is an array (even across iframes/realms)."
      }
    ]
  },
  {
    "title": "JavaScript: Ternary Operator",
    "description": "Inline conditional expressions `condition ? expr1 : expr2`.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What will `status` be assigned in this ternary expression?",
        "codeSnippet": "const score = 75;\nconst status = score >= 50 ? 'Pass' : 'Fail';",
        "language": "javascript",
        "options": [
          "'Pass'",
          "'Fail'",
          "true",
          "undefined"
        ],
        "correctAnswer": "'Pass'",
        "explanation": "Because `75 >= 50` is `true`, the expression before the colon (`'Pass'`) is evaluated and returned."
      },
      {
        "question": "What is a major advantage of the ternary operator over an `if...else` block?",
        "codeSnippet": "const label = isAvailable ? 'In Stock' : 'Sold Out';",
        "language": "javascript",
        "options": [
          "It runs asynchronously",
          "It is an expression that returns a value, allowing direct inline assignment to variables",
          "It avoids type checking",
          "It works without a condition"
        ],
        "correctAnswer": "It is an expression that returns a value, allowing direct inline assignment to variables",
        "explanation": "`if...else` is a statement, while `condition ? a : b` is an expression that evaluates directly to a value, making it ideal for variable assignments and JSX."
      },
      {
        "question": "What does the following nested ternary evaluate to?",
        "codeSnippet": "const speed = 40;\nconst tier = speed > 60 ? 'Fast' : speed > 30 ? 'Moderate' : 'Slow';",
        "language": "javascript",
        "options": [
          "'Fast'",
          "'Slow'",
          "'Moderate'",
          "undefined"
        ],
        "correctAnswer": "'Moderate'",
        "explanation": "`40 > 60` is false, so it evaluates the false branch `speed > 30 ? 'Moderate' : 'Slow'`. Since `40 > 30` is true, `'Moderate'` is returned."
      },
      {
        "question": "What will this ternary return when `count` is 0?",
        "codeSnippet": "const count = 0;\nconst msg = count ? `${count} items` : 'No items';\nconsole.log(msg);",
        "language": "javascript",
        "options": [
          "'0 items'",
          "undefined",
          "NaN",
          "'No items' (0 is falsy)"
        ],
        "correctAnswer": "'No items' (0 is falsy)",
        "explanation": "Because `0` is a falsy value, the condition evaluates to `false`, returning the fallback `'No items'`."
      },
      {
        "question": "Can you omit the else (`:`) branch in a ternary operator?",
        "codeSnippet": "// const x = isValid ? 'Yes'; // SyntaxError",
        "language": "javascript",
        "options": [
          "No, the ternary operator requires both the truthy and falsy branches separated by a colon",
          "Yes, the falsy branch defaults to undefined",
          "Yes, if enclosed in parentheses",
          "Only in TypeScript"
        ],
        "correctAnswer": "No, the ternary operator requires both the truthy and falsy branches separated by a colon",
        "explanation": "The ternary operator strictly requires three operands: `condition ? ifTrue : ifFalse`. To execute a branch conditionally without an else, use logical AND (`&&`)."
      }
    ]
  },
  {
    "title": "JavaScript: Spread Operator Basics",
    "description": "Combine arrays, clone objects, and override properties using `...` spread syntax.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What will `console.log(merged)` output?",
        "codeSnippet": "const a = [1, 2];\nconst b = [3, 4];\nconst merged = [...a, ...b];\nconsole.log(merged);",
        "language": "javascript",
        "options": [
          "[[1, 2], [3, 4]]",
          "[1, 2, 3, 4]",
          "[1, 2, [3, 4]]",
          "10"
        ],
        "correctAnswer": "[1, 2, 3, 4]",
        "explanation": "The spread operator (`...`) unpacks all elements from both arrays into a single new flat array."
      },
      {
        "question": "What happens when spreading two objects that contain identical keys?",
        "codeSnippet": "const defaults = { theme: 'light', size: 'md' };\nconst userPrefs = { theme: 'dark' };\nconst finalConfig = { ...defaults, ...userPrefs };",
        "language": "javascript",
        "options": [
          "A SyntaxError is thrown for duplicate keys",
          "The properties are merged into an array `theme: ['light', 'dark']`",
          "The property from the later object (`userPrefs.theme: 'dark'`) overwrites the earlier one",
          "`defaults.theme` is preserved and `userPrefs` is ignored"
        ],
        "correctAnswer": "The property from the later object (`userPrefs.theme: 'dark'`) overwrites the earlier one",
        "explanation": "Properties are assigned in the order they appear. If duplicate keys are encountered, the last spread object wins and overrides earlier values."
      },
      {
        "question": "How do you add an element to the end of an array without mutating the original?",
        "codeSnippet": "const items = ['a', 'b'];\nconst updated = ?????;",
        "language": "javascript",
        "options": [
          "`items.push('c')`",
          "`items.add('c')`",
          "`items + ['c']`",
          "`[...items, 'c']`"
        ],
        "correctAnswer": "`[...items, 'c']`",
        "explanation": "`[...items, 'c']` creates a new array with all existing elements followed by `'c'` without mutating the original `items` array."
      },
      {
        "question": "What does `Math.max(...[5, 12, 8, 3])` return?",
        "codeSnippet": "const numbers = [5, 12, 8, 3];\nconsole.log(Math.max(...numbers));",
        "language": "javascript",
        "options": [
          "12",
          "NaN",
          "[12]",
          "TypeError"
        ],
        "correctAnswer": "12",
        "explanation": "`Math.max` accepts comma-separated arguments, not an array. Spreading `...numbers` passes each number as an individual argument."
      },
      {
        "question": "What will `console.log(user)` show in this override pattern?",
        "codeSnippet": "const base = { role: 'guest' };\nconst user = { role: 'admin', ...base };\nconsole.log(user.role);",
        "language": "javascript",
        "options": [
          "'admin'",
          "'guest' (because `...base` was spread after `role: 'admin'`)",
          "['admin', 'guest']",
          "undefined"
        ],
        "correctAnswer": "'guest' (because `...base` was spread after `role: 'admin'`)",
        "explanation": "Because `...base` appears after `role: 'admin'`, its `role: 'guest'` property overrides the previous value."
      }
    ]
  },
  {
    "title": "JavaScript: DOM Basics & Querying",
    "description": "Select elements with `querySelector`, read and update text, and add classes.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "What does `document.querySelector('.submit-btn')` return if no matching element exists?",
        "codeSnippet": "const btn = document.querySelector('.non-existent');\nconsole.log(btn);",
        "language": "javascript",
        "options": [
          "`undefined`",
          "An empty NodeList",
          "`null`",
          "DOMException"
        ],
        "correctAnswer": "`null`",
        "explanation": "`document.querySelector()` returns the first matching Element, or `null` if no matches are found in the DOM."
      },
      {
        "question": "What is the difference between `.textContent` and `.innerHTML`?",
        "codeSnippet": "element.textContent = '<b>Hello</b>';\nelement.innerHTML = '<b>Hello</b>';",
        "language": "javascript",
        "options": [
          "`.textContent` only works on `<p>` tags",
          "`.innerHTML` is safer against XSS attacks",
          "There is no difference",
          "`.textContent` sets raw plain text (escaping HTML tags); `.innerHTML` parses the string as HTML markup"
        ],
        "correctAnswer": "`.textContent` sets raw plain text (escaping HTML tags); `.innerHTML` parses the string as HTML markup",
        "explanation": "`.textContent` treats input strictly as plain text, preventing Cross-Site Scripting (XSS). `.innerHTML` parses strings as live DOM nodes."
      },
      {
        "question": "How do you add a CSS class to a DOM element without overriding existing classes?",
        "codeSnippet": "const card = document.querySelector('.card');\n// Add class 'active'",
        "language": "javascript",
        "options": [
          "`card.classList.add('active');`",
          "`card.className = 'active';`",
          "`card.addClass('active');`",
          "`card.style.class = 'active';`"
        ],
        "correctAnswer": "`card.classList.add('active');`",
        "explanation": "`element.classList.add('active')` appends the class name safely without wiping out other pre-existing classes on the element."
      },
      {
        "question": "What collection type does `document.querySelectorAll()` return?",
        "codeSnippet": "const items = document.querySelectorAll('li');",
        "language": "javascript",
        "options": [
          "A standard JavaScript `Array`",
          "A static `NodeList`",
          "An HTMLCollection",
          "A Set of DOM nodes"
        ],
        "correctAnswer": "A static `NodeList`",
        "explanation": "`querySelectorAll` returns a static `NodeList` representing a snapshot of elements that match the selector at query time."
      },
      {
        "question": "How do you listen for a user clicking a button?",
        "codeSnippet": "const btn = document.querySelector('#pay-btn');\n// Register click handler",
        "language": "javascript",
        "options": [
          "`btn.attachEvent('onclick', handlePayment);`",
          "`btn.onClick(handlePayment);`",
          "`btn.addEventListener('click', handlePayment);`",
          "`btn.listen('click', handlePayment);`"
        ],
        "correctAnswer": "`btn.addEventListener('click', handlePayment);`",
        "explanation": "`addEventListener(eventType, callback)` is the standard W3C method for binding event handlers to DOM nodes."
      }
    ]
  },
  {
    "title": "JavaScript: Timers & Callbacks",
    "description": "Understand `setTimeout`, `setInterval`, non-blocking execution, and timer handles.",
    "difficulty": "easy",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 5,
    "questions": [
      {
        "question": "In what order will the following messages log?",
        "codeSnippet": "console.log('Start');\nsetTimeout(() => console.log('Timer'), 0);\nconsole.log('End');",
        "language": "javascript",
        "options": [
          "'Start' -> 'Timer' -> 'End'",
          "'Timer' -> 'Start' -> 'End'",
          "'End' -> 'Start' -> 'Timer'",
          "'Start' -> 'End' -> 'Timer'"
        ],
        "correctAnswer": "'Start' -> 'End' -> 'Timer'",
        "explanation": "`setTimeout` is asynchronous. Even with a 0ms delay, its callback is queued in the event loop and executes only after the current synchronous script finishes."
      },
      {
        "question": "What does `setTimeout()` return?",
        "codeSnippet": "const timerId = setTimeout(() => {}, 1000);",
        "language": "javascript",
        "options": [
          "A numeric or object identifier (timer ID) that can be passed to `clearTimeout()`",
          "A Promise that resolves after 1000ms",
          "The callback function itself",
          "undefined"
        ],
        "correctAnswer": "A numeric or object identifier (timer ID) that can be passed to `clearTimeout()`",
        "explanation": "`setTimeout` returns a unique timer identifier (integer in browsers, Timeout object in Node.js) used to cancel the scheduled execution."
      },
      {
        "question": "How do you cancel a pending `setTimeout` before it fires?",
        "codeSnippet": "const timer = setTimeout(sendNotification, 5000);\n// Cancel timer",
        "language": "javascript",
        "options": [
          "`timer.cancel()`",
          "`clearTimeout(timer)`",
          "`delete timer`",
          "`stopTimeout(timer)`"
        ],
        "correctAnswer": "`clearTimeout(timer)`",
        "explanation": "`clearTimeout(timerId)` cancels the timer matching the provided identifier, preventing the callback from running."
      },
      {
        "question": "What is the difference between `setTimeout` and `setInterval`?",
        "codeSnippet": "// Timer scheduling differences",
        "language": "javascript",
        "options": [
          "`setInterval` runs synchronously",
          "`setTimeout` cannot be cancelled",
          "`setTimeout` runs its callback once after a delay; `setInterval` runs repeatedly at periodic intervals until cancelled",
          "`setInterval` only runs up to 10 times"
        ],
        "correctAnswer": "`setTimeout` runs its callback once after a delay; `setInterval` runs repeatedly at periodic intervals until cancelled",
        "explanation": "`setTimeout` executes once after the designated delay. `setInterval` repeatedly triggers its callback every N milliseconds."
      },
      {
        "question": "What happens to `setInterval` if you forget to call `clearInterval` when a user navigates away?",
        "codeSnippet": "const interval = setInterval(updateTicker, 1000);",
        "language": "javascript",
        "options": [
          "The browser automatically terminates the interval after 1 minute",
          "It converts into a single setTimeout",
          "It pauses until the user returns",
          "It continues running indefinitely in the background, consuming CPU cycles and potentially causing memory leaks"
        ],
        "correctAnswer": "It continues running indefinitely in the background, consuming CPU cycles and potentially causing memory leaks",
        "explanation": "Intervals persist indefinitely until `clearInterval()` is explicitly invoked or the execution context (tab/page) is destroyed."
      }
    ]
  }
];
