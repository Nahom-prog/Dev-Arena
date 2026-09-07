export const javascriptMidQuizzes = [
  {
    "title": "JavaScript: Closures & Lexical Scoping",
    "description": "Master private state encapsulation, lexical environments, and closure retainers.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What does the following function return after both invocations?",
        "codeSnippet": "function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst c1 = createCounter();\nconst c2 = createCounter();\nc1();\nconsole.log(c1(), c2());",
        "language": "javascript",
        "options": [
          "2 and 1",
          "2 and 2",
          "1 and 1",
          "NaN and 1"
        ],
        "correctAnswer": "2 and 1",
        "explanation": "Each call to `createCounter()` creates a unique lexical environment. `c1` increments its own `count` twice (yielding 2), while `c2` starts with its own isolated `count` at 0 (yielding 1)."
      },
      {
        "question": "Why does the standard `var` in a `for` loop print 3 three times instead of 0, 1, 2?",
        "codeSnippet": "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 50);\n}",
        "language": "javascript",
        "options": [
          "`setTimeout` freezes execution until the loop counter is destroyed",
          "`var` is function-scoped; all three callbacks share the exact same variable reference after the loop terminates",
          "Arrow functions cannot access outer loop variables",
          "The event loop discards iterations where `i < 3`"
        ],
        "correctAnswer": "`var` is function-scoped; all three callbacks share the exact same variable reference after the loop terminates",
        "explanation": "Because `var` is function-scoped rather than block-scoped, a single binding `i` is shared by all timer callbacks. By the time the timers fire, `i` has reached 3."
      },
      {
        "question": "How can you fix the loop capture problem without replacing `var` with `let`?",
        "codeSnippet": "for (var i = 0; i < 3; i++) {\n  // What pattern isolates `i` per iteration?\n}",
        "language": "javascript",
        "options": [
          "Use `window.i = i` inside the body",
          "Wrap the timer in `try { ... } catch (e) {}`",
          "Wrap each iteration in an Immediately Invoked Function Expression (IIFE) passing `i` as an argument",
          "Call `Object.freeze(i)` before scheduling the callback"
        ],
        "correctAnswer": "Wrap each iteration in an Immediately Invoked Function Expression (IIFE) passing `i` as an argument",
        "explanation": "An IIFE creates a new function-level execution context on every iteration, capturing the current value of `i` in its own parameter scope."
      },
      {
        "question": "What will the inner closure output in the following nested execution?",
        "codeSnippet": "const x = 10;\nfunction outer() {\n  const x = 20;\n  return function inner() {\n    return x * 2;\n  };\n}\nconst fn = outer();\nconsole.log(fn());",
        "language": "javascript",
        "options": [
          "20",
          "undefined",
          "ReferenceError: x is shadowed",
          "40"
        ],
        "correctAnswer": "40",
        "explanation": "JavaScript uses static (lexical) scoping. `inner` looks up `x` in its enclosing scope (`outer`), resolving `x` to 20, so `20 * 2` equals 40."
      },
      {
        "question": "Which of the following is a potential risk when closures retain references to large DOM trees?",
        "codeSnippet": "function setupListener(domElement) {\n  domElement.addEventListener('click', () => {\n    console.log(domElement.id);\n  });\n}",
        "language": "javascript",
        "options": [
          "Memory leak: The closure keeps the DOM element alive in memory even if it is removed from the document",
          "Execution halt: The browser refuses to garbage collect strings",
          "SyntaxError: DOM nodes cannot be closed over in arrow functions",
          "Stack overflow: Closure depth limits event propagation to 10 nodes"
        ],
        "correctAnswer": "Memory leak: The closure keeps the DOM element alive in memory even if it is removed from the document",
        "explanation": "If the element is removed from the DOM but the listener is never unbound, the closure holds a reference to `domElement`, preventing garbage collection."
      }
    ]
  },
  {
    "title": "JavaScript: `this` Binding & Context",
    "description": "Understand default, implicit, explicit, and lexical `this` binding mechanics.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What will `person.greet()` output when passed as an uncalled callback reference?",
        "codeSnippet": "const person = {\n  name: 'Sarah',\n  greet() {\n    return this.name;\n  }\n};\nconst fn = person.greet;\nconsole.log(fn());",
        "language": "javascript",
        "options": [
          "TypeError: cannot read property 'greet' of undefined",
          "undefined (or throws in strict mode)",
          "'Sarah'",
          "ReferenceError: name is not defined"
        ],
        "correctAnswer": "undefined (or throws in strict mode)",
        "explanation": "When `person.greet` is extracted and invoked without an object reference (`fn()`), it undergoes default binding. In strict mode `this` is `undefined`; otherwise it defaults to the global object."
      },
      {
        "question": "What is the primary difference between `.call()` and `.apply()`?",
        "codeSnippet": "function add(a, b) { return this.base + a + b; }",
        "language": "javascript",
        "options": [
          "`.call()` permanently binds `this`; `.apply()` only binds for one execution",
          "`.call()` can only be used on synchronous methods; `.apply()` returns a Promise",
          "`.call()` accepts arguments comma-separated; `.apply()` accepts arguments as an array",
          "`.call()` runs in strict mode; `.apply()` runs in non-strict mode"
        ],
        "correctAnswer": "`.call()` accepts arguments comma-separated; `.apply()` accepts arguments as an array",
        "explanation": "Both invoke the target function with explicit `this`, but `fn.call(ctx, arg1, arg2)` takes positional arguments, while `fn.apply(ctx, [arg1, arg2])` accepts an array."
      },
      {
        "question": "What happens if you invoke `.bind()` on an arrow function?",
        "codeSnippet": "const arrow = () => console.log(this.val);\nconst bound = arrow.bind({ val: 'Custom' });\nbound();",
        "language": "javascript",
        "options": [
          "It prints 'Custom'",
          "It throws a TypeError: Arrow functions are not bindable",
          "It assigns `{ val: 'Custom' }` to `globalThis`",
          "The binding has no effect on `this`; arrow functions permanently retain lexical `this`"
        ],
        "correctAnswer": "The binding has no effect on `this`; arrow functions permanently retain lexical `this`",
        "explanation": "Arrow functions capture `this` lexically from their enclosing scope at declaration time. They do not possess a `[[Construct]]` or dynamic `this` slot, so `.bind()` cannot override it."
      },
      {
        "question": "What does calling `.bind()` return?",
        "codeSnippet": "function multiply(a, b) { return a * b; }\nconst double = multiply.bind(null, 2);",
        "language": "javascript",
        "options": [
          "A new bound function with pre-configured `this` and prepended partial arguments",
          "The calculated numeric result immediately",
          "A Proxy object that intercepts calls",
          "A generator waiting for `.next()`"
        ],
        "correctAnswer": "A new bound function with pre-configured `this` and prepended partial arguments",
        "explanation": "`.bind()` returns a new exotic bound function without executing it immediately, enabling partial application (currying) of leading arguments."
      },
      {
        "question": "In the snippet below, what is logged when `dev.print()` executes?",
        "codeSnippet": "const dev = {\n  stack: 'Node.js',\n  print: () => {\n    console.log(this.stack);\n  }\n};\ndev.print();",
        "language": "javascript",
        "options": [
          "'Node.js'",
          "undefined (or global stack property)",
          "TypeError: print is not a constructor",
          "ReferenceError: stack is not defined"
        ],
        "correctAnswer": "undefined (or global stack property)",
        "explanation": "Object literals `{ ... }` do not establish a new lexical scope. The arrow function captures `this` from the outer module or window scope, where `stack` is `undefined`."
      }
    ]
  },
  {
    "title": "JavaScript: Event Loop & Microtask Order",
    "description": "Understand macrotask vs microtask queues, process ticks, and execution tick order.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend",
      "Runtime"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "In what sequence will the numbered logs appear in the console?",
        "codeSnippet": "console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);",
        "language": "javascript",
        "options": [
          "1, 2, 3, 4",
          "1, 4, 2, 3",
          "1, 4, 3, 2",
          "3, 1, 4, 2"
        ],
        "correctAnswer": "1, 4, 3, 2",
        "explanation": "1 and 4 are synchronous. Promise callbacks resolve in the Microtask queue before the Macrotask queue (`setTimeout`), yielding: 1, 4, 3, 2."
      },
      {
        "question": "Why does an infinite microtask loop freeze the browser tab while an infinite `setTimeout` loop does not?",
        "codeSnippet": "function freeze() {\n  Promise.resolve().then(freeze);\n}",
        "language": "javascript",
        "options": [
          "Promises compile directly to WebAssembly bytecode",
          "Timers run on background worker threads while Promises execute on the UI thread",
          "`setTimeout` is throttled to 1000ms after 5 calls",
          "The event loop drains the entire microtask queue before rendering or picking the next macrotask"
        ],
        "correctAnswer": "The event loop drains the entire microtask queue before rendering or picking the next macrotask",
        "explanation": "The engine exhausts all microtasks before yielding to UI rendering or Macrotasks. An endless microtask loop starves the event loop entirely."
      },
      {
        "question": "Which API schedules execution directly in the microtask queue?",
        "codeSnippet": "// Which function queues a microtask without instantiating a Promise?",
        "language": "javascript",
        "options": [
          "`queueMicrotask()`",
          "`setImmediate()`",
          "`requestAnimationFrame()`",
          "`requestIdleCallback()`"
        ],
        "correctAnswer": "`queueMicrotask()`",
        "explanation": "`queueMicrotask(callback)` explicitly queues a task on the microtask queue in modern browsers and Node.js without needing `Promise.resolve().then()` boilerplate."
      },
      {
        "question": "What is the output order of this async/await execution?",
        "codeSnippet": "async function test() {\n  console.log('A');\n  await null;\n  console.log('B');\n}\ntest();\nconsole.log('C');",
        "language": "javascript",
        "options": [
          "A, B, C",
          "A, C, B",
          "C, A, B",
          "B, A, C"
        ],
        "correctAnswer": "A, C, B",
        "explanation": "`test()` begins synchronously, logging 'A'. Encountering `await` pauses execution and queues the remainder of `test()` as a microtask. Synchronous execution continues with 'C', then 'B' resolves."
      },
      {
        "question": "Where do DOM mutation observer callbacks execute in the browser event loop?",
        "codeSnippet": "const observer = new MutationObserver(() => console.log('DOM changed'));",
        "language": "javascript",
        "options": [
          "In the Macrotask (Task) queue",
          "Synchronously during DOM manipulation",
          "In the Microtask queue",
          "Exclusively during CSS layout calculations"
        ],
        "correctAnswer": "In the Microtask queue",
        "explanation": "MutationObserver callbacks are dispatched as microtasks at the end of the current microtask checkpoint."
      }
    ]
  },
  {
    "title": "JavaScript: Prototypal Inheritance",
    "description": "Explore prototype chains, `Object.create()`, property lookups, and `hasOwnProperty`.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What does `child.hasOwnProperty('x')` return in the following setup?",
        "codeSnippet": "const parent = { x: 42 };\nconst child = Object.create(parent);\nchild.y = 100;\nconsole.log(child.hasOwnProperty('x'), child.x);",
        "language": "javascript",
        "options": [
          "true and 42",
          "true and undefined",
          "false and undefined",
          "false and 42"
        ],
        "correctAnswer": "false and 42",
        "explanation": "`x` exists on `parent` (the prototype), not as an own property on `child`. Property lookup finds `x = 42` via the prototype chain, while `hasOwnProperty('x')` returns `false`."
      },
      {
        "question": "What is the prototype of an object created via `Object.create(null)`?",
        "codeSnippet": "const dict = Object.create(null);",
        "language": "javascript",
        "options": [
          "`null` (it has no prototype and inherits no methods like `.toString` or `.hasOwnProperty`)",
          "`Object.prototype`",
          "`Function.prototype`",
          "`undefined`"
        ],
        "correctAnswer": "`null` (it has no prototype and inherits no methods like `.toString` or `.hasOwnProperty`)",
        "explanation": "`Object.create(null)` creates a dictionary object with no prototype chain. It does not inherit from `Object.prototype`, making it immune to prototype pollution."
      },
      {
        "question": "How do ES6 classes implement inheritance under the hood?",
        "codeSnippet": "class Dog extends Animal {}",
        "language": "javascript",
        "options": [
          "Through deep copying all methods from Animal to Dog during compilation",
          "Through prototypal linkage setting `Dog.prototype.__proto__ = Animal.prototype`",
          "Through dynamic proxy delegation at runtime",
          "Through private memory segments allocated by the V8 JIT compiler"
        ],
        "correctAnswer": "Through prototypal linkage setting `Dog.prototype.__proto__ = Animal.prototype`",
        "explanation": "ES6 `class` syntax is syntactic sugar over prototypal inheritance. The subclass prototype inherits from the superclass prototype."
      },
      {
        "question": "What will the following `instanceof` check evaluate to?",
        "codeSnippet": "function Developer() {}\nconst dev = new Developer();\nDeveloper.prototype = {};\nconsole.log(dev instanceof Developer);",
        "language": "javascript",
        "options": [
          "true",
          "TypeError",
          "false",
          "undefined"
        ],
        "correctAnswer": "false",
        "explanation": "`instanceof` tests whether `Constructor.prototype` appears anywhere in the instance's prototype chain. Because `Developer.prototype` was reassigned to a new object, the chain no longer matches."
      },
      {
        "question": "Which method is the safest way to check for own properties in modern JavaScript?",
        "codeSnippet": "const obj = Object.create(null);\nobj.key = 'val';",
        "language": "javascript",
        "options": [
          "`obj.hasOwnProperty('key')`",
          "`'key' in obj`",
          "`obj.isPrototypeOf('key')`",
          "`Object.hasOwn(obj, 'key')`"
        ],
        "correctAnswer": "`Object.hasOwn(obj, 'key')`",
        "explanation": "`Object.hasOwn(obj, prop)` (ES2022) works reliably even on `Object.create(null)` instances where `obj.hasOwnProperty` is not a function."
      }
    ]
  },
  {
    "title": "JavaScript: Promise Combinators",
    "description": "Compare `Promise.all`, `Promise.allSettled`, `Promise.race`, and `Promise.any`.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend",
      "Runtime"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What happens when one Promise rejects in `Promise.all([p1, p2, p3])`?",
        "codeSnippet": "const p1 = Promise.resolve('ok');\nconst p2 = Promise.reject(new Error('fail'));\nconst p3 = new Promise(res => setTimeout(res, 1000));\nPromise.all([p1, p2, p3]).catch(err => console.log(err.message));",
        "language": "javascript",
        "options": [
          "It rejects immediately with the error of the first rejected Promise, ignoring pending Promises",
          "It waits for all promises to settle before throwing an AggregateError",
          "It returns an array containing `['ok', Error, null]`",
          "It converts the rejected promise into a resolved null value"
        ],
        "correctAnswer": "It rejects immediately with the error of the first rejected Promise, ignoring pending Promises",
        "explanation": "`Promise.all` follows fail-fast behavior: if any promise rejects, the entire returned promise rejects immediately with that error."
      },
      {
        "question": "Which combinator guarantees that every promise will run to completion regardless of rejections?",
        "codeSnippet": "const results = await Promise.????([api1(), api2(), api3()]);",
        "language": "javascript",
        "options": [
          "`Promise.race`",
          "`Promise.allSettled`",
          "`Promise.any`",
          "`Promise.resolveAll`"
        ],
        "correctAnswer": "`Promise.allSettled`",
        "explanation": "`Promise.allSettled` waits until all promises have either fulfilled or rejected, returning an array of objects describing each result (`{ status, value | reason }`)."
      },
      {
        "question": "What is the primary difference between `Promise.race()` and `Promise.any()`?",
        "codeSnippet": "// race vs any with rejections",
        "language": "javascript",
        "options": [
          "`Promise.race` runs sequentially; `Promise.any` runs in parallel",
          "`Promise.any` throws on the first rejection; `Promise.race` ignores rejections",
          "`Promise.race` settles on the FIRST settled promise (fulfilled or rejected); `Promise.any` waits for the FIRST FULFILLED promise",
          "`Promise.any` only works with Fetch requests"
        ],
        "correctAnswer": "`Promise.race` settles on the FIRST settled promise (fulfilled or rejected); `Promise.any` waits for the FIRST FULFILLED promise",
        "explanation": "`Promise.race` settles as soon as ANY promise settles (even rejection). `Promise.any` ignores rejections until all fail (throwing an `AggregateError`)."
      },
      {
        "question": "What error type is thrown if all promises supplied to `Promise.any()` reject?",
        "codeSnippet": "Promise.any([Promise.reject(1), Promise.reject(2)]).catch(e => console.log(e.name));",
        "language": "javascript",
        "options": [
          "TypeError",
          "UnhandledPromiseRejection",
          "TimeoutError",
          "AggregateError"
        ],
        "correctAnswer": "AggregateError",
        "explanation": "When every input promise rejects in `Promise.any()`, it rejects with an `AggregateError` grouping all rejection reasons in its `.errors` property."
      },
      {
        "question": "What will the following code output to the console?",
        "codeSnippet": "Promise.resolve(5)\n  .then(val => val * 2)\n  .then(val => { throw new Error('Boom'); })\n  .catch(err => 42)\n  .then(val => console.log(val));",
        "language": "javascript",
        "options": [
          "42",
          "10",
          "Error: Boom",
          "undefined"
        ],
        "correctAnswer": "42",
        "explanation": "The `.catch()` handler catches the thrown error and returns `42`. This resolves the chain, passing `42` to the final `.then()` handler."
      }
    ]
  },
  {
    "title": "JavaScript: Async/Await Pitfalls",
    "description": "Avoid waterfall latency, unhandled promise rejections, and try/catch traps.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend",
      "Runtime"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What performance anti-pattern is present in this data loader?",
        "codeSnippet": "async function loadDashboard() {\n  const user = await fetchUser();\n  const posts = await fetchPosts();\n  const stats = await fetchStats();\n  return { user, posts, stats };\n}",
        "language": "javascript",
        "options": [
          "Memory leak: Awaiting inside an async function retains HTTP sockets indefinitely",
          "Async waterfall: Requests that do not depend on each other are executed serially instead of in parallel",
          "SyntaxError: Multiple awaits require individual try/catch blocks",
          "Event loop deadlock: Three awaits exceed the browser worker thread limit"
        ],
        "correctAnswer": "Async waterfall: Requests that do not depend on each other are executed serially instead of in parallel",
        "explanation": "The independent fetch operations run sequentially. Using `Promise.all([fetchUser(), fetchPosts(), fetchStats()])` allows them to execute concurrently."
      },
      {
        "question": "Why does `Array.prototype.forEach` NOT pause when using `await` inside its callback?",
        "codeSnippet": "async function processItems(items) {\n  items.forEach(async (item) => {\n    await saveItem(item);\n  });\n  console.log('All saved!');\n}",
        "language": "javascript",
        "options": [
          "Arrow functions cancel asynchronous execution inside loops",
          "`saveItem` is implicitly converted into a generator",
          "`forEach` is synchronous and does not await the promises returned by its callback",
          "V8 converts `forEach` to a background thread"
        ],
        "correctAnswer": "`forEach` is synchronous and does not await the promises returned by its callback",
        "explanation": "`forEach` does not await promises returned by its callback. 'All saved!' logs immediately before any items have actually finished saving. Use `for...of` instead."
      },
      {
        "question": "What does an `async` function always return?",
        "codeSnippet": "async function getVal() {\n  return 42;\n}",
        "language": "javascript",
        "options": [
          "The raw primitive value 42",
          "A generator iterator",
          "A callback wrapper",
          "A Promise that resolves to 42"
        ],
        "correctAnswer": "A Promise that resolves to 42",
        "explanation": "Functions marked with `async` always return a Promise. If a non-Promise value is returned, the engine automatically wraps it in `Promise.resolve(value)`."
      },
      {
        "question": "What happens if an awaited promise rejects inside an async function without a `try/catch` block?",
        "codeSnippet": "async function runner() {\n  await Promise.reject(new Error('crash'));\n}",
        "language": "javascript",
        "options": [
          "The async function returns a rejected promise",
          "The browser automatically retries the operation three times",
          "Execution continues silently with `undefined`",
          "The function returns null"
        ],
        "correctAnswer": "The async function returns a rejected promise",
        "explanation": "An unhandled rejection inside an `async` function causes the promise returned by the async function itself to reject with that error."
      },
      {
        "question": "What will `console.log(val)` output in this snippet?",
        "codeSnippet": "async function compute() {\n  return await Promise.resolve('ready');\n}\nconst val = compute();\nconsole.log(val);",
        "language": "javascript",
        "options": [
          "'ready'",
          "Promise { <pending> } (or fulfilled Promise object)",
          "undefined",
          "ReferenceError"
        ],
        "correctAnswer": "Promise { <pending> } (or fulfilled Promise object)",
        "explanation": "`compute()` returns a Promise synchronously. To access the string 'ready', you must `await compute()` or chain `.then()`."
      }
    ]
  },
  {
    "title": "JavaScript: Shallow vs Deep Cloning",
    "description": "Understand object reference mutations, `structuredClone`, and spread operator boundaries.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What will `console.log(original.meta.tags)` print after mutation?",
        "codeSnippet": "const original = { name: 'App', meta: { tags: ['dev'] } };\nconst copy = { ...original };\ncopy.meta.tags.push('prod');\nconsole.log(original.meta.tags);",
        "language": "javascript",
        "options": [
          "['dev']",
          "TypeError: Cannot mutate frozen array",
          "['dev', 'prod']",
          "undefined"
        ],
        "correctAnswer": "['dev', 'prod']",
        "explanation": "The spread operator `{ ...original }` performs a shallow copy. Nested objects like `meta` are copied by reference, so mutating `copy.meta` affects `original.meta`."
      },
      {
        "question": "Which native API creates a true deep clone of objects supporting Dates, Sets, Maps, and circular references?",
        "codeSnippet": "const deep = ???????(sourceObject);",
        "language": "javascript",
        "options": [
          "`Object.assign({}, sourceObject)`",
          "`JSON.parse(JSON.stringify(sourceObject))`",
          "`Object.clone(sourceObject)`",
          "`structuredClone(sourceObject)`"
        ],
        "correctAnswer": "`structuredClone(sourceObject)`",
        "explanation": "`structuredClone()` is the native deep-cloning algorithm in modern browsers and Node.js. It natively supports Maps, Sets, Dates, RegExp, and cyclic references."
      },
      {
        "question": "What is a major limitation of `JSON.parse(JSON.stringify(obj))` for deep copying?",
        "codeSnippet": "const data = { time: new Date(), greet: () => 'hi', key: undefined };\nconst cloned = JSON.parse(JSON.stringify(data));",
        "language": "javascript",
        "options": [
          "It drops functions and `undefined`, and serializes `Date` instances into ISO strings",
          "It crashes on any object containing arrays",
          "It runs synchronously on a separate thread",
          "It converts all numbers into strings"
        ],
        "correctAnswer": "It drops functions and `undefined`, and serializes `Date` instances into ISO strings",
        "explanation": "JSON serialization loses functions, `undefined`, and `Symbol` keys, and converts `Date` objects into plain strings without restoring Date prototypes."
      },
      {
        "question": "What happens when you pass an object with circular references to `JSON.stringify` vs `structuredClone`?",
        "codeSnippet": "const a = {};\na.self = a;",
        "language": "javascript",
        "options": [
          "Both throw a TypeError",
          "`JSON.stringify` throws TypeError (Converting circular structure to JSON); `structuredClone` successfully clones it",
          "Both succeed cleanly",
          "`JSON.stringify` succeeds; `structuredClone` throws"
        ],
        "correctAnswer": "`JSON.stringify` throws TypeError (Converting circular structure to JSON); `structuredClone` successfully clones it",
        "explanation": "`JSON.stringify` cannot handle cycles and throws a TypeError. `structuredClone` preserves internal object graph topologies and correctly replicates circular references."
      },
      {
        "question": "Does `Object.freeze()` create a deep freeze on nested properties?",
        "codeSnippet": "const config = Object.freeze({ host: 'localhost', auth: { token: 'xyz' } });\nconfig.auth.token = 'new_token';\nconsole.log(config.auth.token);",
        "language": "javascript",
        "options": [
          "'xyz'",
          "TypeError in non-strict mode",
          "'new_token' (freeze is shallow; nested objects remain mutable)",
          "undefined"
        ],
        "correctAnswer": "'new_token' (freeze is shallow; nested objects remain mutable)",
        "explanation": "`Object.freeze` only freezes top-level properties. To freeze nested structures, a recursive deep-freeze utility is necessary."
      }
    ]
  },
  {
    "title": "JavaScript: Destructuring & Rest/Spread",
    "description": "Default values, property renaming, nested destructuring, and rest operator mechanics.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What does the following renaming destructuring statement log?",
        "codeSnippet": "const user = { name: 'Alex', age: 28 };\nconst { name: username, age } = user;\nconsole.log(username, typeof name);",
        "language": "javascript",
        "options": [
          "'Alex' and 'string'",
          "ReferenceError: username is not defined",
          "undefined and 'undefined'",
          "'Alex' and 'undefined'"
        ],
        "correctAnswer": "'Alex' and 'undefined'",
        "explanation": "`{ name: username }` binds the value of `user.name` to a new variable called `username`. The identifier `name` is not declared as a local variable."
      },
      {
        "question": "When does a default parameter or destructuring default value kick in?",
        "codeSnippet": "const { timeout = 5000 } = { timeout: null };\nconsole.log(timeout);",
        "language": "javascript",
        "options": [
          "null",
          "5000",
          "undefined",
          "NaN"
        ],
        "correctAnswer": "null",
        "explanation": "Default values only apply when the property is `undefined`. `null` is a defined primitive value, so the default `5000` is NOT used."
      },
      {
        "question": "What will `rest` contain after this object destructuring?",
        "codeSnippet": "const item = { id: 1, title: 'Book', price: 20, inStock: true };\nconst { id, price, ...rest } = item;\nconsole.log(rest);",
        "language": "javascript",
        "options": [
          "['title', 'inStock']",
          "{ title: 'Book', inStock: true }",
          "{ id: 1, price: 20 }",
          "undefined"
        ],
        "correctAnswer": "{ title: 'Book', inStock: true }",
        "explanation": "The rest operator (`...rest`) gathers all remaining own enumerable properties that were not explicitly unpacked into a new object."
      },
      {
        "question": "What will `val` output in this nested array destructuring?",
        "codeSnippet": "const matrix = [[1, 2], [3, [4, 5]]];\nconst [, [, [, val]]] = matrix;\nconsole.log(val);",
        "language": "javascript",
        "options": [
          "3",
          "4",
          "5",
          "undefined"
        ],
        "correctAnswer": "5",
        "explanation": "The pattern skips index 0 (`[1, 2]`), inspects index 1 (`[3, [4, 5]]`), skips 3, inspects `[4, 5]`, skips 4, and extracts index 1 (`5`)."
      },
      {
        "question": "How do you provide a default value when destructuring a nested object property that may be missing?",
        "codeSnippet": "const res = {};\nconst { user: { name } = { name: 'Guest' } } = res;\nconsole.log(name);",
        "language": "javascript",
        "options": [
          "TypeError: Cannot read property 'name' of undefined",
          "undefined",
          "null",
          "'Guest'"
        ],
        "correctAnswer": "'Guest'",
        "explanation": "`= { name: 'Guest' }` provides a fallback object if `res.user` is undefined, allowing `name` to resolve cleanly without throwing a TypeError."
      }
    ]
  },
  {
    "title": "JavaScript: Array Methods & Immutability",
    "description": "Distinguish mutating methods (`splice`, `sort`) from immutable alternatives (`toSorted`, `slice`).",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "Which of the following array methods mutates the original array in place?",
        "codeSnippet": "const numbers = [3, 1, 2];",
        "language": "javascript",
        "options": [
          "`numbers.splice(1, 1)`",
          "`numbers.slice(1, 2)`",
          "`numbers.concat([4])`",
          "`numbers.map(n => n * 2)`"
        ],
        "correctAnswer": "`numbers.splice(1, 1)`",
        "explanation": "`splice()` mutates the source array directly by removing or replacing elements. `slice()`, `concat()`, and `map()` return new arrays without mutating."
      },
      {
        "question": "What does the modern ES2023 method `toSorted()` do differently from `.sort()`?",
        "codeSnippet": "const items = ['b', 'a', 'c'];\nconst sorted = items.toSorted();",
        "language": "javascript",
        "options": [
          "It sorts asynchronously on another thread",
          "`toSorted()` returns a new sorted copy without mutating the original array; `.sort()` mutates in place",
          "`toSorted()` only works on numbers",
          "`toSorted()` sorts in reverse order by default"
        ],
        "correctAnswer": "`toSorted()` returns a new sorted copy without mutating the original array; `.sort()` mutates in place",
        "explanation": "`Array.prototype.toSorted()` is an immutable copying method introduced in ES2023. It leaves the original array untouched."
      },
      {
        "question": "What is the return value of `[1, 2, 3].reduce((acc, curr) => acc + curr, 0)`?",
        "codeSnippet": "const total = [1, 2, 3].reduce((acc, curr) => acc + curr, 0);",
        "language": "javascript",
        "options": [
          "[1, 3, 6]",
          "0",
          "6",
          "undefined"
        ],
        "correctAnswer": "6",
        "explanation": "`reduce()` accumulates values from left to right: `0 + 1 = 1`, `1 + 2 = 3`, `3 + 3 = 6`."
      },
      {
        "question": "Why does `[10, 5, 20, 1].sort()` NOT sort numbers in ascending order by default?",
        "codeSnippet": "const sorted = [10, 5, 20, 1].sort();\nconsole.log(sorted);",
        "language": "javascript",
        "options": [
          "It throws a TypeError: compare function required",
          "Numbers are converted to binary before sorting",
          "It only sorts even numbers",
          "Elements are converted to strings and sorted according to UTF-16 code unit values ('1', '10', '20', '5')"
        ],
        "correctAnswer": "Elements are converted to strings and sorted according to UTF-16 code unit values ('1', '10', '20', '5')",
        "explanation": "Without a comparator callback, `.sort()` converts all elements to strings. '10' precedes '5' alphabetically, requiring `(a, b) => a - b` for numeric sorting."
      },
      {
        "question": "What is the difference between `Array.prototype.find()` and `Array.prototype.filter()`?",
        "codeSnippet": "const nums = [2, 4, 6, 8];",
        "language": "javascript",
        "options": [
          "`find()` returns the first matching element (or undefined); `filter()` returns an array of all matching elements",
          "`filter()` halts iteration on the first match",
          "`find()` returns a boolean",
          "`find()` mutates the source array"
        ],
        "correctAnswer": "`find()` returns the first matching element (or undefined); `filter()` returns an array of all matching elements",
        "explanation": "`find()` short-circuits upon locating the first element that satisfies the predicate. `filter()` iterates through the entire array and collects all matching elements into a new array."
      }
    ]
  },
  {
    "title": "JavaScript: Map, Set & Weak Collections",
    "description": "Compare Object vs Map, unique Set storage, and WeakMap memory reclamation.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What is a key difference between standard JavaScript `Object` keys and `Map` keys?",
        "codeSnippet": "const map = new Map();\nconst keyObj = { id: 1 };\nmap.set(keyObj, 'admin');",
        "language": "javascript",
        "options": [
          "`Map` keys cannot be strings",
          "`Map` keys can be any data type (including objects and functions); `Object` keys are coerced to strings or Symbols",
          "`Object` preserves insertion order for numeric keys; `Map` does not",
          "`Map` keys must implement the Serializable interface"
        ],
        "correctAnswer": "`Map` keys can be any data type (including objects and functions); `Object` keys are coerced to strings or Symbols",
        "explanation": "In a standard Object, `obj[{ id: 1 }] = 'val'` turns the key into `\"[object Object]\"`. A `Map` permits references like objects, functions, or primitives as distinct keys."
      },
      {
        "question": "Why can't you iterate over a `WeakMap` or read its `.size` property?",
        "codeSnippet": "const wm = new WeakMap();",
        "language": "javascript",
        "options": [
          "WeakMaps are encrypted in memory",
          "WeakMap only stores primitive numbers",
          "WeakMap keys are held weakly; because garbage collection is non-deterministic, enumerability would expose GC timing",
          "Iterators require a DOM context"
        ],
        "correctAnswer": "WeakMap keys are held weakly; because garbage collection is non-deterministic, enumerability would expose GC timing",
        "explanation": "Because the garbage collector can reclaim unreferenced keys at any arbitrary time, exposing iteration or `.size` would make program state non-deterministic."
      },
      {
        "question": "How do you quickly remove all duplicate primitives from an array?",
        "codeSnippet": "const raw = [1, 2, 2, 3, 4, 4, 1];\nconst unique = ?????;",
        "language": "javascript",
        "options": [
          "`raw.filter((x, i) => raw.indexOf(x) !== i)`",
          "`Object.keys(raw)`",
          "`raw.toUnique()`",
          "`[...new Set(raw)]`"
        ],
        "correctAnswer": "`[...new Set(raw)]`",
        "explanation": "Passing an array to `new Set(raw)` discards duplicate items. Spreading `[...new Set(raw)]` reconstructs a clean array of unique elements."
      },
      {
        "question": "What happens when an object key used in a `WeakMap` has no other references in the application?",
        "codeSnippet": "let user = { id: 99 };\nconst wm = new WeakMap();\nwm.set(user, { secret: 'XYZ' });\nuser = null;",
        "language": "javascript",
        "options": [
          "The entry is eligible for garbage collection, and both key and value will be reclaimed",
          "The entry remains permanently until the application closes",
          "An error is thrown during the next event loop tick",
          "The value is reassigned to `null` key"
        ],
        "correctAnswer": "The entry is eligible for garbage collection, and both key and value will be reclaimed",
        "explanation": "`WeakMap` does not prevent its keys from being garbage collected. Once `user` is set to `null`, the entry becomes eligible for automatic GC."
      },
      {
        "question": "What will `console.log(set.size)` output for these two object insertions?",
        "codeSnippet": "const set = new Set();\nset.add({ id: 1 });\nset.add({ id: 1 });\nconsole.log(set.size);",
        "language": "javascript",
        "options": [
          "1",
          "2 (each object literal creates a distinct reference in memory)",
          "TypeError: Objects require hash codes in Sets",
          "0"
        ],
        "correctAnswer": "2 (each object literal creates a distinct reference in memory)",
        "explanation": "`Set` tests equality using the SameValueZero algorithm. The two `{ id: 1 }` objects occupy different memory addresses, so they are treated as distinct keys."
      }
    ]
  },
  {
    "title": "JavaScript: Generators & Iterators",
    "description": "Work with `function*`, `yield`, iterable protocols, and custom sequence streams.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What does calling a generator function (`function* () {}`) return?",
        "codeSnippet": "function* getNumbers() {\n  yield 1;\n  yield 2;\n}\nconst res = getNumbers();",
        "language": "javascript",
        "options": [
          "The first yielded value: 1",
          "A Promise that settles on the final return",
          "A Generator object conforming to both the Iterable and Iterator protocols",
          "An array `[1, 2]`"
        ],
        "correctAnswer": "A Generator object conforming to both the Iterable and Iterator protocols",
        "explanation": "Calling a generator function does not execute its body immediately. Instead, it returns a Generator iterator that pauses and resumes execution via `.next()`."
      },
      {
        "question": "What object structure is returned by each call to an iterator's `.next()` method?",
        "codeSnippet": "const iter = [10].values();\nconsole.log(iter.next());",
        "language": "javascript",
        "options": [
          "`[value, done]`",
          "`{ result: any, finished: boolean }`",
          "`{ item: any, hasNext: boolean }`",
          "`{ value: any, done: boolean }`"
        ],
        "correctAnswer": "`{ value: any, done: boolean }`",
        "explanation": "The JavaScript iteration protocol specifies that `.next()` returns an object with two properties: `value` (the yielded data) and `done` (a boolean indicating completion)."
      },
      {
        "question": "What will this generator output on its second `.next()` call?",
        "codeSnippet": "function* sequence() {\n  yield 1;\n  return 2;\n  yield 3;\n}\nconst g = sequence();\ng.next();\nconsole.log(g.next());",
        "language": "javascript",
        "options": [
          "`{ value: 2, done: true }`",
          "`{ value: 3, done: false }`",
          "`{ value: 2, done: false }`",
          "`{ value: undefined, done: true }`"
        ],
        "correctAnswer": "`{ value: 2, done: true }`",
        "explanation": "A `return` statement in a generator immediately ends iteration, returning `{ value: 2, done: true }`. Subsequent yields (`yield 3`) are never reached."
      },
      {
        "question": "Which well-known Symbol must an object implement to be iterable via `for...of`?",
        "codeSnippet": "const customCollection = {\n  [Symbol.????????]: function* () {\n    yield 'a';\n  }\n};",
        "language": "javascript",
        "options": [
          "`Symbol.iterable`",
          "`Symbol.iterator`",
          "`Symbol.asyncIterator`",
          "`Symbol.generator`"
        ],
        "correctAnswer": "`Symbol.iterator`",
        "explanation": "To be iterable by `for...of`, the spread operator, or `Array.from()`, an object must have a method keyed by `Symbol.iterator` that returns an iterator."
      },
      {
        "question": "What does `yield*` (delegated yield) do inside a generator?",
        "codeSnippet": "function* sub() { yield 2; yield 3; }\nfunction* main() {\n  yield 1;\n  yield* sub();\n  yield 4;\n}",
        "language": "javascript",
        "options": [
          "Executes the sub-generator in parallel on a worker thread",
          "Multiplies the yielded result by the next number",
          "Delegates iteration control to another iterable or generator, yielding each of its values in sequence",
          "Catches all errors thrown by the sub-generator"
        ],
        "correctAnswer": "Delegates iteration control to another iterable or generator, yielding each of its values in sequence",
        "explanation": "`yield*` delegates to another iterable (array, generator, string, etc.), consuming and re-yielding all its items sequentially before continuing."
      }
    ]
  },
  {
    "title": "JavaScript: Type Coercion & Equality",
    "description": "Explore abstract vs strict equality, `Object.is`, and implicit string/number conversions.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What does `[] == ![]` evaluate to in JavaScript, and why?",
        "codeSnippet": "console.log([] == ![]);",
        "language": "javascript",
        "options": [
          "`false`: arrays with identical lengths cannot equal boolean values",
          "`TypeError`: cannot compare array to boolean",
          "`undefined`",
          "`true`: `![]` coerces to boolean `false`, which coerces to numeric `0`. `[]` coerces to string `\"\"`, which coerces to numeric `0`"
        ],
        "correctAnswer": "`true`: `![]` coerces to boolean `false`, which coerces to numeric `0`. `[]` coerces to string `\"\"`, which coerces to numeric `0`",
        "explanation": "Logical NOT `![]` produces boolean `false`. In abstract equality (`==`), boolean `false` becomes `0`, and `[]` converts via `ToPrimitive` to `\"\"` which becomes `0`. `0 == 0` is `true`."
      },
      {
        "question": "How does `Object.is()` differ from `===` strict equality?",
        "codeSnippet": "console.log(Object.is(NaN, NaN), Object.is(0, -0));",
        "language": "javascript",
        "options": [
          "`Object.is(NaN, NaN)` is `true` and `Object.is(0, -0)` is `false`; `===` evaluates `NaN === NaN` to `false` and `0 === -0` to `true`",
          "`Object.is()` performs deep comparison of nested properties",
          "`Object.is()` coerces types before checking equality",
          "`Object.is()` only compares strings and numbers"
        ],
        "correctAnswer": "`Object.is(NaN, NaN)` is `true` and `Object.is(0, -0)` is `false`; `===` evaluates `NaN === NaN` to `false` and `0 === -0` to `true`",
        "explanation": "`Object.is` implements the SameValue algorithm. Unlike `===`, it treats `NaN` as equal to `NaN`, and distinguishes positive zero `+0` from negative zero `-0`."
      },
      {
        "question": "What does `1 + '2' + 3` evaluate to?",
        "codeSnippet": "const res = 1 + '2' + 3;\nconsole.log(res);",
        "language": "javascript",
        "options": [
          "6",
          "'123'",
          "'33'",
          "NaN"
        ],
        "correctAnswer": "'123'",
        "explanation": "Binary `+` evaluates from left to right. `1 + '2'` coerces 1 to a string producing `'12'`. Then `'12' + 3` coerces 3 to a string, yielding `'123'`."
      },
      {
        "question": "What is the return value of `Boolean('0')` and `Boolean([])`?",
        "codeSnippet": "console.log(Boolean('0'), Boolean([]));",
        "language": "javascript",
        "options": [
          "`true` and `false`",
          "`false` and `false`",
          "`true` and `true`",
          "`false` and `true`"
        ],
        "correctAnswer": "`true` and `true`",
        "explanation": "In JavaScript, any non-empty string is truthy (including `'0'`), and all objects/arrays are truthy (including `[]`)."
      },
      {
        "question": "What does `typeof null` return, and why?",
        "codeSnippet": "console.log(typeof null);",
        "language": "javascript",
        "options": [
          "'null'",
          "'undefined'",
          "'primitive'",
          "'object' (a legacy bug in the initial JavaScript implementation where the type tag for objects was 0)"
        ],
        "correctAnswer": "'object' (a legacy bug in the initial JavaScript implementation where the type tag for objects was 0)",
        "explanation": "In the first JS engine, values were represented with a type tag. Objects had a tag of 0, and `null` was represented as the NULL pointer (0x00), falsely identifying it as `'object'`."
      }
    ]
  },
  {
    "title": "JavaScript: Hoisting & TDZ",
    "description": "Understand declaration hoisting, function declarations vs expressions, and the Temporal Dead Zone.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What happens when you access a `let` or `const` variable before its declaration line?",
        "codeSnippet": "console.log(hero);\nlet hero = 'Batman';",
        "language": "javascript",
        "options": [
          "ReferenceError: Cannot access 'hero' before initialization (Temporal Dead Zone)",
          "It logs `undefined`",
          "SyntaxError: let cannot be hoisted",
          "It logs `null`"
        ],
        "correctAnswer": "ReferenceError: Cannot access 'hero' before initialization (Temporal Dead Zone)",
        "explanation": "`let` and `const` variables are hoisted to the top of their block, but remain uninitialized in the Temporal Dead Zone (TDZ) until their definition line executes."
      },
      {
        "question": "What does the following snippet log?",
        "codeSnippet": "var x = 1;\nfunction test() {\n  console.log(x);\n  var x = 2;\n}\ntest();",
        "language": "javascript",
        "options": [
          "1",
          "undefined",
          "2",
          "ReferenceError"
        ],
        "correctAnswer": "undefined",
        "explanation": "Inside `test()`, `var x` is hoisted to the top of the function scope as `undefined`, shadowing the global `x = 1`. `console.log(x)` executes before `x = 2` is assigned."
      },
      {
        "question": "Can function declarations be invoked before they appear in code, unlike function expressions?",
        "codeSnippet": "sayHi();\nfunction sayHi() { console.log('Hi'); }\n\nsayBye();\nvar sayBye = function() { console.log('Bye'); };",
        "language": "javascript",
        "options": [
          "Both work cleanly",
          "Both throw ReferenceErrors",
          "`sayHi()` logs 'Hi'; `sayBye()` throws `TypeError: sayBye is not a function`",
          "`sayBye()` works; `sayHi()` throws"
        ],
        "correctAnswer": "`sayHi()` logs 'Hi'; `sayBye()` throws `TypeError: sayBye is not a function`",
        "explanation": "Function declarations are hoisted with their complete function bodies. `var sayBye` is hoisted as `undefined`, so invoking `sayBye()` throws a TypeError."
      },
      {
        "question": "What is the Temporal Dead Zone (TDZ)?",
        "codeSnippet": "// TDZ concept evaluation",
        "language": "javascript",
        "options": [
          "The 4ms delay in nested `setTimeout` callbacks",
          "The time an async Promise remains in pending state",
          "The timeout window before garbage collection cycles run",
          "The period between enter scope and variable initialization where referencing the variable throws ReferenceError"
        ],
        "correctAnswer": "The period between enter scope and variable initialization where referencing the variable throws ReferenceError",
        "explanation": "The TDZ spans from the start of the enclosing block scope until the variable declaration statement is evaluated."
      },
      {
        "question": "What will the following code output?",
        "codeSnippet": "let a = 10;\n{\n  console.log(a);\n  let a = 20;\n}",
        "language": "javascript",
        "options": [
          "ReferenceError: Cannot access 'a' before initialization",
          "10",
          "20",
          "undefined"
        ],
        "correctAnswer": "ReferenceError: Cannot access 'a' before initialization",
        "explanation": "The inner block declares `let a`, which creates a local binding that is hoisted within that block. Accessing `a` before `let a = 20` hits the inner variable's TDZ."
      }
    ]
  },
  {
    "title": "JavaScript: Memory Leaks & GC",
    "description": "Identify detached DOM trees, accidental global variables, and uncleared timers.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend",
      "Runtime"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What causes a memory leak in this interval code?",
        "codeSnippet": "function trackMetrics() {\n  const largeBuffer = new Array(1000000).fill('data');\n  setInterval(() => {\n    console.log(largeBuffer.length);\n  }, 1000);\n}",
        "language": "javascript",
        "options": [
          "Array sizes above 10,000 cannot be garbage collected",
          "The interval is never cleared with `clearInterval()`, keeping `largeBuffer` reachable via closure indefinitely",
          "`setInterval` runs on a separate process that duplicates memory",
          "`console.log` prevents strings from being freed"
        ],
        "correctAnswer": "The interval is never cleared with `clearInterval()`, keeping `largeBuffer` reachable via closure indefinitely",
        "explanation": "Active timer handles remain in the host timer table until cleared. The timer's callback retains a closure reference to `largeBuffer`, preventing GC."
      },
      {
        "question": "What is a 'Detached DOM Tree' memory leak?",
        "codeSnippet": "let cachedButton = document.getElementById('submit-btn');\ndocument.body.removeChild(cachedButton);",
        "language": "javascript",
        "options": [
          "A CSS selector that has no matching HTML elements",
          "A DOM mutation that failed to trigger layout reflow",
          "A DOM node removed from the active document tree but still referenced by a JavaScript variable, keeping the node and its sub-tree in RAM",
          "An iframe that was disconnected from the network"
        ],
        "correctAnswer": "A DOM node removed from the active document tree but still referenced by a JavaScript variable, keeping the node and its sub-tree in RAM",
        "explanation": "Even after `removeChild()`, `cachedButton` holds a JS reference to the DOM element, so the browser cannot free the element or any of its child nodes."
      },
      {
        "question": "How does the V8 garbage collector determine if memory can be reclaimed?",
        "codeSnippet": "// V8 Mark-and-Sweep algorithm",
        "language": "javascript",
        "options": [
          "Reference Counting: objects are deleted as soon as their reference count equals zero",
          "Timer cycles: objects older than 60 seconds are purged",
          "File system caching heuristics",
          "Mark-and-Sweep: it traverses the object graph from root references (window/global); unreachable objects are swept"
        ],
        "correctAnswer": "Mark-and-Sweep: it traverses the object graph from root references (window/global); unreachable objects are swept",
        "explanation": "Modern engines use Mark-and-Sweep reachability analysis. If an object cannot be reached by traversing references starting from GC roots, it is collected."
      },
      {
        "question": "In non-strict mode, what accidental behavior creates an unintended global leak?",
        "codeSnippet": "function compute() {\n  result = 42 * 10; // Notice missing let/const/var\n}",
        "language": "javascript",
        "options": [
          "It creates an accidental global variable `window.result` that is never garbage collected",
          "It throws a ReferenceError",
          "It stores the result in local storage",
          "It allocates memory in the heap but marks it read-only"
        ],
        "correctAnswer": "It creates an accidental global variable `window.result` that is never garbage collected",
        "explanation": "Without strict mode, assigning to an undeclared variable attaches it to the global object (`window.result`), which remains rooted and uncollected."
      },
      {
        "question": "Which collection type helps avoid memory leaks when caching metadata for DOM elements?",
        "codeSnippet": "const cache = new ?????();\ncache.set(domElement, { clicks: 0 });",
        "language": "javascript",
        "options": [
          "`Map`",
          "`WeakMap`",
          "`Set`",
          "`Object`"
        ],
        "correctAnswer": "`WeakMap`",
        "explanation": "`WeakMap` uses weak references for object keys. When the DOM element is removed and has no other references, its cache entry is automatically garbage collected."
      }
    ]
  },
  {
    "title": "JavaScript: DOM Event Propagation",
    "description": "Master bubbling, capturing, event delegation, and stopPropagation semantics.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "In what phase does a standard `.addEventListener('click', fn)` listen by default?",
        "codeSnippet": "btn.addEventListener('click', handler);",
        "language": "javascript",
        "options": [
          "Capturing phase",
          "Target phase only",
          "Bubbling phase (the 3rd parameter `useCapture` defaults to `false`)",
          "Paint phase"
        ],
        "correctAnswer": "Bubbling phase (the 3rd parameter `useCapture` defaults to `false`)",
        "explanation": "Event listeners default to the bubbling phase (`useCapture: false`). The event travels downwards in the capture phase, hits the target, then bubbles upward."
      },
      {
        "question": "What is the difference between `event.stopPropagation()` and `event.stopImmediatePropagation()`?",
        "codeSnippet": "el.addEventListener('click', (e) => e.stopImmediatePropagation());\nel.addEventListener('click', (e) => console.log('Second handler'));",
        "language": "javascript",
        "options": [
          "`stopPropagation` cancels default browser actions like form submissions",
          "`stopImmediatePropagation` forces synchronous execution",
          "There is no difference; they are aliases",
          "`stopPropagation` prevents the event from traveling to parent/ancestor elements; `stopImmediatePropagation` also stops other listeners on the SAME element"
        ],
        "correctAnswer": "`stopPropagation` prevents the event from traveling to parent/ancestor elements; `stopImmediatePropagation` also stops other listeners on the SAME element",
        "explanation": "`stopPropagation()` prevents ascending the DOM tree. `stopImmediatePropagation()` additionally halts any remaining listeners attached to the exact same element."
      },
      {
        "question": "What is Event Delegation?",
        "codeSnippet": "document.querySelector('ul').addEventListener('click', (e) => {\n  if (e.target.matches('li')) console.log(e.target.textContent);\n});",
        "language": "javascript",
        "options": [
          "Attaching a single event listener to a parent element to handle events from multiple child elements via bubbling",
          "Delegating DOM rendering to a Web Worker",
          "Binding an event directly to the window object with high priority",
          "Calling `event.preventDefault()` across all form elements"
        ],
        "correctAnswer": "Attaching a single event listener to a parent element to handle events from multiple child elements via bubbling",
        "explanation": "Event delegation leverages bubbling to listen on a parent container, reducing memory overhead and automatically handling dynamically added child elements."
      },
      {
        "question": "What is the difference between `e.target` and `e.currentTarget` inside an event listener?",
        "codeSnippet": "parent.addEventListener('click', (e) => {\n  console.log(e.target, e.currentTarget);\n});",
        "language": "javascript",
        "options": [
          "`e.currentTarget` is the deepest child element; `e.target` is the parent",
          "`e.target` is the element that triggered the event; `e.currentTarget` is the element the listener is attached to",
          "`e.target` only exists during capturing",
          "Both always reference the `document.body` element"
        ],
        "correctAnswer": "`e.target` is the element that triggered the event; `e.currentTarget` is the element the listener is attached to",
        "explanation": "`e.target` points to the originating element clicked by the user. `e.currentTarget` points to the element that registered the event listener."
      },
      {
        "question": "Which of the following events does NOT bubble up the DOM tree?",
        "codeSnippet": "// Identify non-bubbling UI event",
        "language": "javascript",
        "options": [
          "`click`",
          "`keydown`",
          "`focus` (use `focusin` for a bubbling alternative)",
          "`submit`"
        ],
        "correctAnswer": "`focus` (use `focusin` for a bubbling alternative)",
        "explanation": "`focus` and `blur` do not bubble. To use event delegation for input focus events, developers use `focusin` and `focusout` or capture phase listeners."
      }
    ]
  },
  {
    "title": "JavaScript: Currying & Composition",
    "description": "Implement function currying, partial application, and higher-order pipeline composition.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What is Currying in JavaScript?",
        "codeSnippet": "const add = (a) => (b) => a + b;\nconsole.log(add(2)(3)); // 5",
        "language": "javascript",
        "options": [
          "Binding a function to an object prototype permanently",
          "Caching return values based on input arguments",
          "Converting synchronous functions into async Promises",
          "Transforming a function with multiple arguments into a sequence of nesting functions each taking a single argument"
        ],
        "correctAnswer": "Transforming a function with multiple arguments into a sequence of nesting functions each taking a single argument",
        "explanation": "Currying transforms `f(a, b, c)` into `f(a)(b)(c)`, allowing individual arguments to be supplied across distinct execution stages."
      },
      {
        "question": "What is a Higher-Order Function (HOF)?",
        "codeSnippet": "const withLogging = (fn) => (...args) => {\n  console.log('calling...');\n  return fn(...args);\n};",
        "language": "javascript",
        "options": [
          "A function that accepts another function as an argument, returns a function, or both",
          "A function that runs with elevated operating system permissions",
          "A function declared with the `async` keyword",
          "A constructor function instantiated via `new`"
        ],
        "correctAnswer": "A function that accepts another function as an argument, returns a function, or both",
        "explanation": "Higher-order functions are functions that operate on other functions by taking them as arguments or returning them as results (e.g. `map`, `filter`, middleware wrappers)."
      },
      {
        "question": "What will `pipe(add5, multiply2)(10)` return with this standard pipe helper?",
        "codeSnippet": "const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);\nconst add5 = (n) => n + 5;\nconst multiply2 = (n) => n * 2;\nconsole.log(pipe(add5, multiply2)(10));",
        "language": "javascript",
        "options": [
          "25 (10 * 2 + 5 = 25)",
          "30 ((10 + 5) * 2 = 30)",
          "15",
          "TypeError: fns is not callable"
        ],
        "correctAnswer": "30 ((10 + 5) * 2 = 30)",
        "explanation": "`pipe` executes functions from left to right: first `add5(10)` yields 15, then `multiply2(15)` yields 30."
      },
      {
        "question": "What distinguishes Partial Application from Currying?",
        "codeSnippet": "// Partial Application vs Currying",
        "language": "javascript",
        "options": [
          "Partial application only works in TypeScript",
          "Currying requires the `arguments` keyword",
          "Partial application takes a function and fixes a subset of its arguments, returning a function with lower arity; currying creates a chain of single-argument functions",
          "Partial application mutates the original function"
        ],
        "correctAnswer": "Partial application takes a function and fixes a subset of its arguments, returning a function with lower arity; currying creates a chain of single-argument functions",
        "explanation": "Partial application binds some arguments up-front (`fn.bind(null, 1, 2)`). Currying decomposes a function strictly into unary (single-argument) steps."
      },
      {
        "question": "What will the following curried discount calculator produce?",
        "codeSnippet": "const applyDiscount = (rate) => (price) => price - (price * rate);\nconst tenPercent = applyDiscount(0.10);\nconsole.log(tenPercent(200));",
        "language": "javascript",
        "options": [
          "20",
          "190",
          "NaN",
          "180"
        ],
        "correctAnswer": "180",
        "explanation": "`tenPercent` is a specialized function with `rate = 0.10` fixed in closure. Calling it with 200 calculates `200 - 20 = 180`."
      }
    ]
  },
  {
    "title": "JavaScript: ESM vs CommonJS Interop",
    "description": "Understand static imports, live bindings, default export gotchas, and dynamic `import()`.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend",
      "Runtime"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What is a major architectural difference between ES Modules (ESM) and CommonJS (CJS)?",
        "codeSnippet": "// import vs require",
        "language": "javascript",
        "options": [
          "ESM imports are static and parsed at compile time with live bindings; CJS `require()` is dynamic and synchronous at runtime",
          "CommonJS does not support objects or functions",
          "ESM can only run inside the browser",
          "CommonJS cannot export multiple values"
        ],
        "correctAnswer": "ESM imports are static and parsed at compile time with live bindings; CJS `require()` is dynamic and synchronous at runtime",
        "explanation": "ESM import declarations are static, evaluated before code runs, and create read-only live bindings. `require()` in CJS executes imperatively at runtime."
      },
      {
        "question": "What are 'live bindings' in ES Modules?",
        "codeSnippet": "// counter.js: export let count = 0; export const inc = () => count++;\n// main.js: import { count, inc } from './counter.js'; inc(); console.log(count);",
        "language": "javascript",
        "options": [
          "Variables exported by ESM are automatically bound to React state",
          "When exported variables change in the exporting module, the imported variable reflects the updated value in real time",
          "Modules maintain WebSocket connections to reload values",
          "Variables can be reassigned by the importing module"
        ],
        "correctAnswer": "When exported variables change in the exporting module, the imported variable reflects the updated value in real time",
        "explanation": "In ESM, imports are live references to exported variables. When `inc()` changes `count` inside `counter.js`, `main.js` immediately reads the new value."
      },
      {
        "question": "Can an ES Module use `require()` directly without configuring a custom createRequire helper?",
        "codeSnippet": "// In a .mjs file or \"type\": \"module\" project\nconst pkg = require('./pkg.json');",
        "language": "javascript",
        "options": [
          "Yes, `require` is always available globally",
          "Yes, if top-level await is enabled",
          "No, `require` is not defined in ESM scope; use `import` or `createRequire(import.meta.url)`",
          "Only in Node.js version 12 and older"
        ],
        "correctAnswer": "No, `require` is not defined in ESM scope; use `import` or `createRequire(import.meta.url)`",
        "explanation": "In ES Modules, `require`, `__dirname`, and `__filename` are not provided. You use static `import`, dynamic `import()`, or `module.createRequire`."
      },
      {
        "question": "What does dynamic `import('./math.js')` return?",
        "codeSnippet": "const modulePromise = import('./math.js');",
        "language": "javascript",
        "options": [
          "The exported module object synchronously",
          "A generator waiting for iteration",
          "A callback function",
          "A Promise that resolves to the module namespace object containing all exports"
        ],
        "correctAnswer": "A Promise that resolves to the module namespace object containing all exports",
        "explanation": "Dynamic `import()` can be called conditionally at runtime anywhere in code and returns a Promise that resolves to the module's namespace object."
      },
      {
        "question": "Why can't you conditionally place a static `import` inside an `if` block?",
        "codeSnippet": "if (isProd) {\n  import { analytics } from './analytics.js'; // SyntaxError\n}",
        "language": "javascript",
        "options": [
          "Static `import` statements must be at top-level to enable static analysis and tree-shaking before runtime evaluation",
          "Conditionals can only contain arrow functions",
          "`import` requires an `else` branch",
          "JavaScript engines cannot parse strings inside conditionals"
        ],
        "correctAnswer": "Static `import` statements must be at top-level to enable static analysis and tree-shaking before runtime evaluation",
        "explanation": "Static `import` must appear at the top-level scope so that bundlers and engines can build the complete dependency graph prior to executing code."
      }
    ]
  },
  {
    "title": "JavaScript: Debounce & Throttle",
    "description": "Differentiate rate-limiting patterns for scroll, resize, and search input events.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What is the primary operational difference between Debouncing and Throttling?",
        "codeSnippet": "// Rate limiting strategies",
        "language": "javascript",
        "options": [
          "Debounce runs on worker threads; Throttle runs on the main thread",
          "Debounce delays execution until a quiet period of N ms has passed without new events; Throttle limits execution to at most once every N ms",
          "Throttle is for keyboard input only; Debounce is for scroll events only",
          "Debounce repeats the function N times; Throttle stops execution permanently"
        ],
        "correctAnswer": "Debounce delays execution until a quiet period of N ms has passed without new events; Throttle limits execution to at most once every N ms",
        "explanation": "Debouncing waits for a pause in events (e.g. search autocomplete typing). Throttling enforces a maximum frequency of execution (e.g. 60fps window resize/scroll)."
      },
      {
        "question": "What is the role of `clearTimeout(timer)` in a debounce implementation?",
        "codeSnippet": "function debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}",
        "language": "javascript",
        "options": [
          "Forces the timer to fire immediately",
          "Clears memory of previous arguments",
          "Resets the countdown every time a new event occurs before the previous timer elapsed",
          "Kills the browser event loop thread"
        ],
        "correctAnswer": "Resets the countdown every time a new event occurs before the previous timer elapsed",
        "explanation": "Calling `clearTimeout(timer)` cancels the previously scheduled execution, ensuring `fn` will only fire once the user stops triggering events for `delay` ms."
      },
      {
        "question": "Which scenario is the best use case for Throttling rather than Debouncing?",
        "codeSnippet": "// Choosing the right rate-limiter",
        "language": "javascript",
        "options": [
          "Submitting an e-commerce checkout form",
          "Waiting for a user to finish typing an email address before checking availability",
          "Autosaving a draft 2 seconds after typing stops",
          "Continuous infinite-scroll position checks while a user is actively scrolling"
        ],
        "correctAnswer": "Continuous infinite-scroll position checks while a user is actively scrolling",
        "explanation": "With debouncing, an infinite scroll handler would never fire while the user keeps scrolling continuously. Throttling ensures periodic checks every 100-200ms."
      },
      {
        "question": "What will happen if you do not preserve `this` context inside a debounce wrapper?",
        "codeSnippet": "button.addEventListener('click', debounce(function() {\n  console.log(this);\n}, 200));",
        "language": "javascript",
        "options": [
          "`this` inside the debounced callback will point to the `window` or `undefined` instead of the button element",
          "The function crashes with SyntaxError",
          "The button is automatically disabled",
          "The timer delay doubles"
        ],
        "correctAnswer": "`this` inside the debounced callback will point to the `window` or `undefined` instead of the button element",
        "explanation": "Inside `setTimeout`, default binding applies unless the wrapper preserves `this` (e.g. by using an arrow function or `fn.apply(this, args)`)."
      },
      {
        "question": "What does the 'leading edge' option in debounce libraries (like Lodash) do?",
        "codeSnippet": "const debounced = debounce(save, 500, { leading: true, trailing: false });",
        "language": "javascript",
        "options": [
          "Delays execution by double the wait time",
          "Fires the function immediately on the first trigger, then ignores subsequent triggers until 500ms of inactivity pass",
          "Only executes after 5 consecutive events",
          "Runs the function in reverse argument order"
        ],
        "correctAnswer": "Fires the function immediately on the first trigger, then ignores subsequent triggers until 500ms of inactivity pass",
        "explanation": "Leading edge execution triggers immediately on the initial invocation, providing instant responsiveness while locking out rapid duplicate clicks."
      }
    ]
  },
  {
    "title": "JavaScript: Proxy & Reflect",
    "description": "Leverage metaprogramming traps, property validation, and the Reflect API.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What does the `get` trap in a JavaScript Proxy intercept?",
        "codeSnippet": "const p = new Proxy(target, {\n  get(target, prop, receiver) {\n    return prop in target ? target[prop] : 'default';\n  }\n});",
        "language": "javascript",
        "options": [
          "Only function calls `p()`",
          "Property deletions `delete p.prop`",
          "Property access operations (`p.prop` or `p['prop']`)",
          "Object cloning operations"
        ],
        "correctAnswer": "Property access operations (`p.prop` or `p['prop']`)",
        "explanation": "The `get(target, prop, receiver)` trap intercepts all property access requests on the proxy instance."
      },
      {
        "question": "Why is it best practice to use `Reflect.set()` inside a Proxy `set` trap?",
        "codeSnippet": "const handler = {\n  set(target, prop, value, receiver) {\n    return Reflect.set(target, prop, value, receiver);\n  }\n};",
        "language": "javascript",
        "options": [
          "`Reflect.set` encrypts the value in memory",
          "`Reflect.set` prevents garbage collection of the property",
          "`Reflect.set` is 100x faster than standard assignment",
          "`Reflect.set` correctly passes the `receiver` to trigger setter accessors on the prototype chain and returns a boolean indicating success"
        ],
        "correctAnswer": "`Reflect.set` correctly passes the `receiver` to trigger setter accessors on the prototype chain and returns a boolean indicating success",
        "explanation": "`Reflect` methods mirror internal engine operations. `Reflect.set` returns a boolean indicating if assignment succeeded and properly forwards `receiver` for prototypes."
      },
      {
        "question": "What happens if a Proxy `set` trap returns `false` in strict mode?",
        "codeSnippet": "'use strict';\nconst p = new Proxy({}, {\n  set() { return false; }\n});\np.name = 'Test';",
        "language": "javascript",
        "options": [
          "It throws a TypeError: 'set' on proxy: trap returned falsish",
          "It silently ignores the assignment",
          "It sets the property to `false`",
          "It restarts the event loop"
        ],
        "correctAnswer": "It throws a TypeError: 'set' on proxy: trap returned falsish",
        "explanation": "In strict mode, if a `set` trap returns `false` (or a falsy value), JavaScript throws a TypeError indicating the assignment was rejected."
      },
      {
        "question": "Which trap intercepts the `delete` operator on proxy properties?",
        "codeSnippet": "delete proxy.property;",
        "language": "javascript",
        "options": [
          "`remove(target, prop)`",
          "`deleteProperty(target, prop)`",
          "`destroy(target, prop)`",
          "`drop(target, prop)`"
        ],
        "correctAnswer": "`deleteProperty(target, prop)`",
        "explanation": "The `deleteProperty` trap intercepts attempts to remove properties using the `delete` operator."
      },
      {
        "question": "How does Vue 3 leverage JavaScript Proxies compared to Vue 2's `Object.defineProperty`?",
        "codeSnippet": "// Reactive state tracking",
        "language": "javascript",
        "options": [
          "Proxies run exclusively inside WebAssembly",
          "Vue 3 Proxies remove the need for Virtual DOM",
          "Proxies can observe dynamically added properties, deletions, and array index assignments without needing `$set` helpers",
          "Proxies convert data into SQL databases"
        ],
        "correctAnswer": "Proxies can observe dynamically added properties, deletions, and array index assignments without needing `$set` helpers",
        "explanation": "`Object.defineProperty` required walking all properties upfront and could not detect new property additions or array mutations. Proxies intercept all operations dynamically."
      }
    ]
  },
  {
    "title": "JavaScript: Optional Chaining & Coalescing",
    "description": "Deep dive into `?.`, `?.()`, `??` vs `||`, and short-circuit evaluation nuances.",
    "difficulty": "mid",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 6,
    "questions": [
      {
        "question": "What is the critical difference between `a ?? b` and `a || b`?",
        "codeSnippet": "const count = 0;\nconsole.log(count ?? 10, count || 10);",
        "language": "javascript",
        "options": [
          "`??` coerces values to strings",
          "`||` is asynchronous; `??` is synchronous",
          "`??` throws if left operand is null",
          "`??` only falls back if the left operand is `null` or `undefined`; `||` falls back on ANY falsy value (including `0`, `\"\"`, `false`)"
        ],
        "correctAnswer": "`??` only falls back if the left operand is `null` or `undefined`; `||` falls back on ANY falsy value (including `0`, `\"\"`, `false`)",
        "explanation": "Nullish coalescing (`??`) considers only `null` and `undefined` nullish. Because `0` is a valid number, `0 ?? 10` returns `0`, whereas `0 || 10` returns `10`."
      },
      {
        "question": "What will `user?.address?.city` return if `user.address` is `undefined`?",
        "codeSnippet": "const user = { name: 'Dan' };\nconsole.log(user?.address?.city);",
        "language": "javascript",
        "options": [
          "undefined (short-circuits safely without throwing a TypeError)",
          "TypeError: Cannot read properties of undefined",
          "null",
          "ReferenceError"
        ],
        "correctAnswer": "undefined (short-circuits safely without throwing a TypeError)",
        "explanation": "Optional chaining (`?.`) short-circuits immediately if the target is `null` or `undefined`, returning `undefined` instead of throwing."
      },
      {
        "question": "How do you safely invoke a callback that might not be provided using optional chaining?",
        "codeSnippet": "function notify(onSuccess) {\n  // What is the clean ES2020 syntax?\n}",
        "language": "javascript",
        "options": [
          "`onSuccess?()`",
          "`onSuccess?.()`",
          "`onSuccess.?()`",
          "`invoke(onSuccess)`"
        ],
        "correctAnswer": "`onSuccess?.()`",
        "explanation": "`fn?.(arg)` checks whether `fn` is non-nullish before calling it. If `onSuccess` is undefined, the call short-circuits safely without throwing."
      },
      {
        "question": "What will `console.log(val)` output in this mixed evaluation?",
        "codeSnippet": "const val = false ?? 'fallback';\nconsole.log(val);",
        "language": "javascript",
        "options": [
          "'fallback'",
          "undefined",
          "false",
          "TypeError"
        ],
        "correctAnswer": "false",
        "explanation": "`false` is a boolean primitive, not `null` or `undefined`. Nullish coalescing evaluates `false ?? 'fallback'` to `false`."
      },
      {
        "question": "Why does JavaScript disallow chaining `??` directly with `&&` or `||` without explicit parentheses?",
        "codeSnippet": "// const x = a || b ?? c; // SyntaxError",
        "language": "javascript",
        "options": [
          "Because `??` was deprecated in ES2022",
          "`||` cannot coexist with ES modules",
          "V8 parser buffer size limitations",
          "To avoid developer confusion over operator precedence ambiguities between logical AND/OR and nullish coalescing"
        ],
        "correctAnswer": "To avoid developer confusion over operator precedence ambiguities between logical AND/OR and nullish coalescing",
        "explanation": "The specification requires explicit parentheses (e.g. `(a || b) ?? c`) to prevent ambiguous bugs where developers misinterpret operator precedence."
      }
    ]
  }
];
