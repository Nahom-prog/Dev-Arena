export const javascriptHardQuizzes = [
  {
    "title": "JavaScript: V8 Heap Layout & Generational GC",
    "description": "Understand Young vs Old generation, Scavenger (Semi-Space), and Major GC mark-sweep.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Node.js",
      "Performance"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "How does the V8 garbage collector divide heap memory to optimize object lifetime management?",
        "codeSnippet": "// V8 Generational Hypothesis",
        "language": "javascript",
        "options": [
          "Into Young Generation (Nursery & Intermediate semi-spaces) and Old Generation",
          "Into Stack space and Cloud space",
          "Into 64 equal segments of 16MB each",
          "Objects are kept in an unsorted single linked list"
        ],
        "correctAnswer": "Into Young Generation (Nursery & Intermediate semi-spaces) and Old Generation",
        "explanation": "Based on the generational hypothesis (most objects die young), V8 divides heap into a small, fast Young Generation collected via Scavenge, and an Old Generation for long-lived survivors."
      },
      {
        "question": "When is an object promoted from the Young Generation to the Old Generation in V8?",
        "codeSnippet": "// V8 object survival cycle",
        "language": "javascript",
        "options": [
          "As soon as its size exceeds 1KB",
          "If it survives two consecutive minor GC (Scavenge) cycles",
          "When it is frozen using `Object.freeze()`",
          "Only when assigned to the global `window` object"
        ],
        "correctAnswer": "If it survives two consecutive minor GC (Scavenge) cycles",
        "explanation": "Objects start in the Nursery semi-space. If they survive one Scavenge cycle, they move to the Intermediate semi-space; surviving a second cycle promotes them to the Old Space."
      },
      {
        "question": "Why is Minor GC (Scavenge) significantly faster than Major GC (Mark-Compact)?",
        "codeSnippet": "// Minor GC vs Major GC",
        "language": "javascript",
        "options": [
          "It runs completely in parallel on the GPU",
          "It only checks primitive numbers",
          "It only copies the tiny subset of live objects from 'From-Space' to 'To-Space', ignoring dead allocations entirely",
          "It does not pause JavaScript thread execution"
        ],
        "correctAnswer": "It only copies the tiny subset of live objects from 'From-Space' to 'To-Space', ignoring dead allocations entirely",
        "explanation": "Scavenge utilizes Cheney's copying algorithm. Because most young objects are already dead, copying the few surviving objects to the companion semi-space takes negligible time."
      },
      {
        "question": "What V8 CLI flag exposes garbage collection statistics directly in Node.js logs?",
        "codeSnippet": "$ node ???????? app.js",
        "language": "javascript",
        "options": [
          "`--debug-memory`",
          "`--log-v8`",
          "`--print-heap`",
          "`--trace-gc`"
        ],
        "correctAnswer": "`--trace-gc`",
        "explanation": "`node --trace-gc app.js` prints diagnostic lines showing each Scavenge and Mark-Sweep cycle with before/after heap sizes and pause durations."
      },
      {
        "question": "What is 'compaction' during V8's Major Mark-Sweep-Compact garbage collection?",
        "codeSnippet": "// V8 heap compaction phase",
        "language": "javascript",
        "options": [
          "Moving surviving fragmented objects into contiguous memory blocks to eliminate heap fragmentation",
          "Compressing string characters into gzip format",
          "Deleting uncalled functions from the AST",
          "Combining two arrays into one"
        ],
        "correctAnswer": "Moving surviving fragmented objects into contiguous memory blocks to eliminate heap fragmentation",
        "explanation": "Frequent allocations and deallocations leave holes in Old Space. Compaction slides surviving objects together to reclaim large contiguous memory chunks."
      }
    ]
  },
  {
    "title": "JavaScript: Microtask Starvation & Macrotasks",
    "description": "Analyze event loop starving, queue draining behavior, and UI rendering pauses.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Frontend",
      "Node.js"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What happens to browser rendering (rAF, paint) when a recursive microtask schedule executes?",
        "codeSnippet": "function starve() {\n  queueMicrotask(starve);\n}\nstarve();",
        "language": "javascript",
        "options": [
          "The browser drops frames down to 15fps but handles clicks normally",
          "UI rendering, user clicks, and timers are completely blocked; the tab appears completely frozen",
          "The microtask queue automatically pauses every 16ms to allow paint",
          "V8 converts the queue to a Web Worker automatically"
        ],
        "correctAnswer": "UI rendering, user clicks, and timers are completely blocked; the tab appears completely frozen",
        "explanation": "The event loop specification mandates that the microtask queue must be completely empty before execution yields to rendering or macrotasks. Infinite microtasks cause starvation."
      },
      {
        "question": "In Node.js, what is the execution priority difference between `process.nextTick()` and `queueMicrotask()`?",
        "codeSnippet": "process.nextTick(() => console.log('Tick'));\nqueueMicrotask(() => console.log('Micro'));",
        "language": "javascript",
        "options": [
          "`queueMicrotask` runs first",
          "Both execute concurrently on separate threads",
          "`process.nextTick` runs first; it drains its own queue before the standard Promise microtask queue",
          "The order is random depending on CPU load"
        ],
        "correctAnswer": "`process.nextTick` runs first; it drains its own queue before the standard Promise microtask queue",
        "explanation": "In Node.js, `process.nextTick` callbacks are stored on a distinct queue that is drained immediately after the current tick, preceding standard microtasks."
      },
      {
        "question": "Why does `setImmediate()` NOT starve the event loop even when called recursively in Node.js?",
        "codeSnippet": "function loop() {\n  setImmediate(loop);\n}\nloop();",
        "language": "javascript",
        "options": [
          "`setImmediate` is throttled to 50ms",
          "`setImmediate` runs on the libuv thread pool",
          "`setImmediate` throws an error after 10,000 iterations",
          "`setImmediate` queues a task in the Check phase of the event loop; between iterations, other phases (timers, I/O, poll) still run"
        ],
        "correctAnswer": "`setImmediate` queues a task in the Check phase of the event loop; between iterations, other phases (timers, I/O, poll) still run",
        "explanation": "`setImmediate` is a macrotask scheduled in the Check phase. Each execution yields control, allowing the event loop to proceed to subsequent tick phases."
      },
      {
        "question": "In what phase does `requestAnimationFrame` run relative to JavaScript macrotasks and style/layout calculations?",
        "codeSnippet": "// Browser frame lifecycle",
        "language": "javascript",
        "options": [
          "Just before the browser recalculates style, layout, and paints pixels for the frame",
          "Inside the microtask queue immediately after every promise",
          "After the paint is already on screen",
          "Inside the WebAssembly runtime"
        ],
        "correctAnswer": "Just before the browser recalculates style, layout, and paints pixels for the frame",
        "explanation": "`requestAnimationFrame` callbacks run at the start of the frame rendering pipeline, right before CSS recalculations, layout, and compositor painting."
      },
      {
        "question": "What is the output order in Node.js for this mixed tick code?",
        "codeSnippet": "setTimeout(() => console.log('Timeout'), 0);\nsetImmediate(() => console.log('Immediate'));\nprocess.nextTick(() => console.log('NextTick'));",
        "language": "javascript",
        "options": [
          "'Immediate' -> 'Timeout' -> 'NextTick'",
          "'NextTick' always logs first; 'Timeout' and 'Immediate' order depends on entry phase",
          "'Timeout' -> 'Immediate' -> 'NextTick'",
          "'NextTick' -> 'Immediate' -> 'Timeout'"
        ],
        "correctAnswer": "'NextTick' always logs first; 'Timeout' and 'Immediate' order depends on entry phase",
        "explanation": "`process.nextTick` fires immediately after the synchronous block. Whether `setTimeout` or `setImmediate` fires next depends on timer resolution and loop entry point."
      }
    ]
  },
  {
    "title": "JavaScript: Stack Frames & Tail Calls",
    "description": "Understand call stack limits, tail call optimization (PTC) requirements, and recursion.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Performance"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What condition is required for Proper Tail Calls (PTC) to avoid allocating a new stack frame in supported engines?",
        "codeSnippet": "function factorial(n, acc = 1) {\n  if (n <= 1) return acc;\n  return factorial(n - 1, n * acc); // Tail call\n}",
        "language": "javascript",
        "options": [
          "The function must be marked `async`",
          "The function must be a generator",
          "The recursive function call must be in strict mode and be the absolute final evaluation in the return statement without pending operations",
          "The arguments must be numbers less than 1,000"
        ],
        "correctAnswer": "The recursive function call must be in strict mode and be the absolute final evaluation in the return statement without pending operations",
        "explanation": "In PTC, the call must be in strict mode and the return value must be strictly the result of the tail call with no wrapping arithmetic or expressions."
      },
      {
        "question": "Why is `return n * factorial(n - 1)` NOT a valid tail call?",
        "codeSnippet": "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1); // Not a tail call\n}",
        "language": "javascript",
        "options": [
          "JavaScript disallows multiplication in return statements",
          "`factorial` is not an arrow function",
          "Because `n - 1` decrements instead of increments",
          "The multiplication `n * ...` must be computed AFTER `factorial(n - 1)` returns, requiring the parent stack frame to be retained"
        ],
        "correctAnswer": "The multiplication `n * ...` must be computed AFTER `factorial(n - 1)` returns, requiring the parent stack frame to be retained",
        "explanation": "Because the current frame must stay active to multiply `n` by the returned result, its execution context and variables cannot be discarded."
      },
      {
        "question": "What runtime error occurs when recursion exceeds the maximum call stack limit without tail call elimination?",
        "codeSnippet": "function infinite() { return infinite(); }\ninfinite();",
        "language": "javascript",
        "options": [
          "RangeError: Maximum call stack size exceeded",
          "TypeError: Stack frame destroyed",
          "ReferenceError: Stack overflow",
          "InternalError: Memory allocation failed"
        ],
        "correctAnswer": "RangeError: Maximum call stack size exceeded",
        "explanation": "When recursion pushes more stack frames than the engine allocates (typically 10,000–100,000 frames), V8 throws a `RangeError`."
      },
      {
        "question": "What programming technique transforms deep recursive algorithms into loops using a stack data structure on the heap?",
        "codeSnippet": "// Converting recursion to heap-allocated iteration",
        "language": "javascript",
        "options": [
          "Throttling",
          "Trampoline (or explicit iterative stack simulation)",
          "Currying",
          "Polyfilling"
        ],
        "correctAnswer": "Trampoline (or explicit iterative stack simulation)",
        "explanation": "A trampoline wraps recursive calls in thunks, executing them iteratively inside a `while` loop so the call stack depth never exceeds 1 frame."
      },
      {
        "question": "Why did V8 (Chrome & Node.js) choose not to enable Proper Tail Calls (PTC) by default despite ES2015 specification?",
        "codeSnippet": "// V8 PTC debate",
        "language": "javascript",
        "options": [
          "It was proved mathematically impossible in dynamic languages",
          "It slows down arithmetic by 500%",
          "It destroys error stack traces (making debugging difficult) and complicates developer tool profiling",
          "It was replaced by WebAssembly"
        ],
        "correctAnswer": "It destroys error stack traces (making debugging difficult) and complicates developer tool profiling",
        "explanation": "By discarding parent stack frames, stack traces (`error.stack`) lose caller history, which developers rely on heavily for production error logging and debugging."
      }
    ]
  },
  {
    "title": "JavaScript: WeakRef & FinalizationRegistry",
    "description": "Manage weak object references and execute cleanup callbacks upon garbage collection.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Performance"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What does `weakRef.deref()` return if the target object has already been garbage collected?",
        "codeSnippet": "const ref = new WeakRef(targetObject);\n// Some time later after GC...\nconsole.log(ref.deref());",
        "language": "javascript",
        "options": [
          "`null`",
          "Throws a ReferenceError",
          "A dead Proxy object",
          "`undefined`"
        ],
        "correctAnswer": "`undefined`",
        "explanation": "`weakRef.deref()` returns the target object if it is still alive in memory, or `undefined` if the target has been reclaimed by the garbage collector."
      },
      {
        "question": "What is the primary purpose of the `FinalizationRegistry` API?",
        "codeSnippet": "const registry = new FinalizationRegistry((heldValue) => {\n  console.log(`Cleaned up: ${heldValue}`);\n});\nregistry.register(targetObj, 'resource-123');",
        "language": "javascript",
        "options": [
          "To request a cleanup callback when a registered target object has been reclaimed by garbage collection",
          "To force immediate synchronous garbage collection of an object",
          "To prevent an object from ever being collected",
          "To serialize objects into binary buffers"
        ],
        "correctAnswer": "To request a cleanup callback when a registered target object has been reclaimed by garbage collection",
        "explanation": "`FinalizationRegistry` lets you register cleanup callbacks that run asynchronously after target objects are collected (e.g. freeing WebAssembly or native resources)."
      },
      {
        "question": "Why is it dangerous to rely on `FinalizationRegistry` callbacks for critical application logic?",
        "codeSnippet": "// FinalizationRegistry reliability",
        "language": "javascript",
        "options": [
          "The callback runs on a separate worker thread that cannot access variables",
          "Garbage collection timing is non-deterministic, and the callback may run much later or never at all if the process exits",
          "It is only supported on mobile devices",
          "It blocks the main thread for 100ms"
        ],
        "correctAnswer": "Garbage collection timing is non-deterministic, and the callback may run much later or never at all if the process exits",
        "explanation": "Engines make no guarantees on when or if GC occurs. If memory pressure is low or the tab closes, finalizers may never execute."
      },
      {
        "question": "Can primitive values (strings, numbers, booleans) be registered as targets in a `WeakRef`?",
        "codeSnippet": "const ref = new WeakRef('hello');",
        "language": "javascript",
        "options": [
          "Yes, primitives are wrapped into temporary objects",
          "Yes, but only in Node.js",
          "TypeError: WeakRef target must be an object (or non-registered Symbol)",
          "It returns undefined"
        ],
        "correctAnswer": "TypeError: WeakRef target must be an object (or non-registered Symbol)",
        "explanation": "Like `WeakMap` and `WeakSet`, `WeakRef` targets must be garbage-collectable references (objects or non-registered Symbols). Primitives throw a TypeError."
      },
      {
        "question": "How do you unregister an object from a `FinalizationRegistry` before it is collected?",
        "codeSnippet": "registry.register(target, 'metadata', unregisterToken);\n// How to cancel registration?",
        "language": "javascript",
        "options": [
          "`registry.delete(target)`",
          "`registry.cancel(target)`",
          "`unregisterToken.destroy()`",
          "`registry.unregister(unregisterToken)`"
        ],
        "correctAnswer": "`registry.unregister(unregisterToken)`",
        "explanation": "When calling `registry.register(target, heldValue, token)`, passing an unregister token allows you to remove the registration later via `registry.unregister(token)`."
      }
    ]
  },
  {
    "title": "JavaScript: Streams & Backpressure",
    "description": "Handle `ReadableStream`, `WritableStream`, pipe pipelines, and backpressure signals.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Node.js",
      "Frontend"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What is 'Backpressure' in data stream architectures?",
        "codeSnippet": "// Stream backpressure phenomenon",
        "language": "javascript",
        "options": [
          "A signaling mechanism where a slow consumer notifies a fast producer to pause reading so buffers do not overflow memory",
          "Data leaking backwards across HTTP headers",
          "An encryption handshake failure",
          "TCP packet loss due to Wi-Fi disconnects"
        ],
        "correctAnswer": "A signaling mechanism where a slow consumer notifies a fast producer to pause reading so buffers do not overflow memory",
        "explanation": "If a producer generates chunks faster than a consumer can process/write them, backpressure signals the producer to stop reading until downstream buffers drain."
      },
      {
        "question": "What happens when `writableStream.write(chunk)` returns `false` in Node.js streams?",
        "codeSnippet": "const canWrite = stream.write(chunk);\nif (!canWrite) { /* What must the producer do? */ }",
        "language": "javascript",
        "options": [
          "The stream crashed and closed permanently",
          "The internal buffer exceeded `highWaterMark`; the producer should pause until the `'drain'` event fires",
          "The chunk was discarded into `/dev/null`",
          "The stream switched into synchronous mode"
        ],
        "correctAnswer": "The internal buffer exceeded `highWaterMark`; the producer should pause until the `'drain'` event fires",
        "explanation": "Returning `false` signals that the stream's buffer reached capacity (`highWaterMark`). The producer must pause and wait for the `'drain'` event before resuming writes."
      },
      {
        "question": "What is the modern Web Streams API equivalent of Node's `.pipe()` that handles backpressure automatically?",
        "codeSnippet": "const response = await fetch('/large-video');\nresponse.body.????????(writableDestination);",
        "language": "javascript",
        "options": [
          "`pipeThrough(writableDestination)`",
          "`streamInto(writableDestination)`",
          "`pipeTo(writableDestination)`",
          "`transfer(writableDestination)`"
        ],
        "correctAnswer": "`pipeTo(writableDestination)`",
        "explanation": "`ReadableStream.prototype.pipeTo(writable)` automatically manages reading, writing, locking, closing, and backpressure between web streams."
      },
      {
        "question": "What does acquiring a reader via `stream.getReader()` do to a `ReadableStream`?",
        "codeSnippet": "const reader = readableStream.getReader();",
        "language": "javascript",
        "options": [
          "Duplicates the stream into two independent branches",
          "Converts all chunks to UTF-8 strings immediately",
          "Closes the underlying HTTP connection",
          "Locks the stream to that reader; no other reader can read from the stream until released"
        ],
        "correctAnswer": "Locks the stream to that reader; no other reader can read from the stream until released",
        "explanation": "A Web `ReadableStream` has a locked status. Calling `getReader()` creates a reader and locks the stream, preventing conflicting simultaneous reads."
      },
      {
        "question": "How do you split a single `ReadableStream` into two identical concurrent streams without reading it twice from the network?",
        "codeSnippet": "const [stream1, stream2] = readable.????();",
        "language": "javascript",
        "options": [
          "`readable.tee()`",
          "`readable.clone()`",
          "`readable.fork()`",
          "`readable.split()`"
        ],
        "correctAnswer": "`readable.tee()`",
        "explanation": "The `.tee()` method splits a readable stream into two identical branches that can be consumed independently."
      }
    ]
  },
  {
    "title": "JavaScript: Well-Known Symbols",
    "description": "Override core language protocols using `Symbol.toPrimitive`, `Symbol.hasInstance`, and `Symbol.species`.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What does the `[Symbol.toPrimitive](hint)` method allow an object to control?",
        "codeSnippet": "const wallet = {\n  amount: 50,\n  [Symbol.toPrimitive](hint) {\n    return hint === 'number' ? this.amount : `$${this.amount}`;\n  }\n};",
        "language": "javascript",
        "options": [
          "Encrypts the object properties",
          "Customizes how the object converts into primitive values based on the coercion hint ('number', 'string', 'default')",
          "Prevents the object from being serialized with JSON",
          "Converts the object into a typed array"
        ],
        "correctAnswer": "Customizes how the object converts into primitive values based on the coercion hint ('number', 'string', 'default')",
        "explanation": "`Symbol.toPrimitive` is invoked by the engine whenever an object needs to be coerced into a primitive (e.g. `+wallet` passes 'number', `${wallet}` passes 'string')."
      },
      {
        "question": "Which well-known Symbol overrides the behavior of the `instanceof` operator?",
        "codeSnippet": "class EvenNumber {\n  static [Symbol.????????](instance) {\n    return typeof instance === 'number' && instance % 2 === 0;\n  }\n}\nconsole.log(4 instanceof EvenNumber); // true",
        "language": "javascript",
        "options": [
          "`Symbol.isInstance`",
          "`Symbol.instanceOf`",
          "`Symbol.hasInstance`",
          "`Symbol.matcher`"
        ],
        "correctAnswer": "`Symbol.hasInstance`",
        "explanation": "`Symbol.hasInstance` customizes `instanceof` checks. `x instanceof Constructor` evaluates `Constructor[Symbol.hasInstance](x)`."
      },
      {
        "question": "What is `Symbol.species` used for in built-in collection subclasses?",
        "codeSnippet": "class MyArray extends Array {\n  static get [Symbol.species]() { return Array; }\n}",
        "language": "javascript",
        "options": [
          "Checks if two classes share the same parent class",
          "Defines the sorting algorithm used by `.sort()`",
          "Prevents new instances from being created",
          "Specifies the constructor function used to create derived objects in methods like `.map()` or `.filter()`"
        ],
        "correctAnswer": "Specifies the constructor function used to create derived objects in methods like `.map()` or `.filter()`",
        "explanation": "`Symbol.species` allows a subclass of `Array` or `Promise` to return base `Array` instances from chained methods like `.map()`, rather than `MyArray`."
      },
      {
        "question": "What does `[Symbol.isConcatSpreadable]: false` do when an array is passed to `Array.prototype.concat()`?",
        "codeSnippet": "const arr = [1, 2];\narr[Symbol.isConcatSpreadable] = false;\nconsole.log([0].concat(arr));",
        "language": "javascript",
        "options": [
          "`[0, [1, 2]]` (the array is appended as a single nested element rather than flattened)",
          "`[0, 1, 2]`",
          "TypeError",
          "`[0]`"
        ],
        "correctAnswer": "`[0, [1, 2]]` (the array is appended as a single nested element rather than flattened)",
        "explanation": "`Symbol.isConcatSpreadable` configures whether `.concat()` unpacks array elements or preserves the array as a discrete unit."
      },
      {
        "question": "How do you access or create a globally shared Symbol across multiple execution realms/iframes?",
        "codeSnippet": "const sym = Symbol.???('app.state');",
        "language": "javascript",
        "options": [
          "`Symbol.global('app.state')`",
          "`Symbol.for('app.state')`",
          "`Symbol.shared('app.state')`",
          "`new Symbol('app.state')`"
        ],
        "correctAnswer": "`Symbol.for('app.state')`",
        "explanation": "`Symbol.for(key)` searches the global symbol registry and returns an existing symbol with that key, or creates a new one across all realms."
      }
    ]
  },
  {
    "title": "JavaScript: Custom Async Iterators",
    "description": "Implement `Symbol.asyncIterator`, handle `for await...of`, and stream chunking.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Frontend",
      "Node.js"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What well-known Symbol must an object implement to be consumed with `for await...of`?",
        "codeSnippet": "const dataSource = {\n  [Symbol.????????]: async function* () {\n    yield 'chunk-1';\n  }\n};",
        "language": "javascript",
        "options": [
          "`Symbol.iterator`",
          "`Symbol.async`",
          "`Symbol.asyncIterator`",
          "`Symbol.stream`"
        ],
        "correctAnswer": "`Symbol.asyncIterator`",
        "explanation": "`Symbol.asyncIterator` defines the default async iterator for an object, allowing it to be consumed by `for await (const item of dataSource)`."
      },
      {
        "question": "What does an async iterator's `.next()` method return?",
        "codeSnippet": "const iter = stream[Symbol.asyncIterator]();\nconst step = iter.next();",
        "language": "javascript",
        "options": [
          "A raw `{ value, done }` object",
          "A generator",
          "An EventTarget",
          "A Promise that resolves to `{ value: any, done: boolean }`"
        ],
        "correctAnswer": "A Promise that resolves to `{ value: any, done: boolean }`",
        "explanation": "In the async iteration protocol, calling `.next()` returns a Promise that resolves to the standard `{ value, done }` iteration object."
      },
      {
        "question": "What happens if a promise rejects inside a `for await...of` loop?",
        "codeSnippet": "try {\n  for await (const data of asyncSource) {\n    console.log(data);\n  }\n} catch (err) {\n  console.log('Caught:', err);\n}",
        "language": "javascript",
        "options": [
          "Iteration terminates immediately and execution transfers to the `catch` block",
          "The rejected item is skipped and iteration continues with the next item",
          "The loop converts to synchronous execution",
          "The script aborts without catching"
        ],
        "correctAnswer": "Iteration terminates immediately and execution transfers to the `catch` block",
        "explanation": "If any awaited iteration step rejects, the `for await...of` statement throws that error immediately, halting the loop."
      },
      {
        "question": "Can `for await...of` be used to iterate over a regular synchronous array of Promises?",
        "codeSnippet": "const promises = [Promise.resolve(1), Promise.resolve(2)];\nfor await (const n of promises) { console.log(n); }",
        "language": "javascript",
        "options": [
          "No, synchronous arrays throw a TypeError with `for await`",
          "Yes, it iterates the array sequentially and awaits each Promise before proceeding to the next iteration",
          "Only if the array contains at least 10 items",
          "It resolves all promises in parallel on worker threads"
        ],
        "correctAnswer": "Yes, it iterates the array sequentially and awaits each Promise before proceeding to the next iteration",
        "explanation": "`for await...of` works on synchronous iterables whose elements are promises, awaiting each item sequentially."
      },
      {
        "question": "What method is called on an async iterator when a `for await...of` loop exits prematurely via `break` or `return`?",
        "codeSnippet": "// Cleanup on early loop exit",
        "language": "javascript",
        "options": [
          "`.destroy()`",
          "`.close()`",
          "`.return()` on the iterator (if implemented) to allow resource cleanup",
          "`.abort()`"
        ],
        "correctAnswer": "`.return()` on the iterator (if implemented) to allow resource cleanup",
        "explanation": "The iterator protocol defines optional `.return()` and `.throw()` methods. Early termination invokes `.return()` to close underlying sockets or file handles."
      }
    ]
  },
  {
    "title": "JavaScript: Binary Buffers & DataViews",
    "description": "Manipulate raw memory, understand endianness, byte offsets, and TypedArray views.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Performance",
      "WebAssembly"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "Can you directly modify bytes inside an `ArrayBuffer` without creating a TypedArray view or DataView?",
        "codeSnippet": "const buffer = new ArrayBuffer(16);\nbuffer[0] = 255;",
        "language": "javascript",
        "options": [
          "Yes, ArrayBuffer behaves like a standard array",
          "Only in Node.js Buffers",
          "Yes, but only for values under 128",
          "No, an `ArrayBuffer` represents raw fixed-length memory; you must create a TypedArray (like `Uint8Array`) or `DataView` to read or write bytes"
        ],
        "correctAnswer": "No, an `ArrayBuffer` represents raw fixed-length memory; you must create a TypedArray (like `Uint8Array`) or `DataView` to read or write bytes",
        "explanation": "`ArrayBuffer` is a raw memory chunk with no indexing interface. Direct assignment `buffer[0] = 255` sets a property on the wrapper object, not the raw buffer."
      },
      {
        "question": "What is the primary advantage of `DataView` over TypedArrays like `Uint32Array`?",
        "codeSnippet": "const view = new DataView(buffer);\nview.setUint32(0, 42, true); // Little-endian flag",
        "language": "javascript",
        "options": [
          "`DataView` provides explicit control over byte order (endianness) and allows reading mixed data types at arbitrary byte offsets",
          "`DataView` is resizable up to 10GB",
          "`DataView` runs on the GPU",
          "`DataView` supports string values directly"
        ],
        "correctAnswer": "`DataView` provides explicit control over byte order (endianness) and allows reading mixed data types at arbitrary byte offsets",
        "explanation": "TypedArrays adhere strictly to the host CPU's native endianness. `DataView` allows developers to specify big-endian or little-endian per read/write."
      },
      {
        "question": "What will `Uint8Array.of(256)[0]` return due to 8-bit unsigned integer overflow?",
        "codeSnippet": "const arr = new Uint8Array(1);\narr[0] = 256;\nconsole.log(arr[0]);",
        "language": "javascript",
        "options": [
          "255",
          "0 (256 wraps modulo 256 to 0)",
          "256",
          "RangeError: integer overflow"
        ],
        "correctAnswer": "0 (256 wraps modulo 256 to 0)",
        "explanation": "Standard `Uint8Array` clamps values using modulo 256 arithmetic: `256 % 256 = 0`. For saturation clamping at 255, use `Uint8ClampedArray`."
      },
      {
        "question": "How does `Uint8ClampedArray` behave differently from `Uint8Array` when handling color pixel values > 255?",
        "codeSnippet": "const clamped = new Uint8ClampedArray([300, -10]);\nconsole.log(clamped[0], clamped[1]);",
        "language": "javascript",
        "options": [
          "44 and 246 (modulo wrapping)",
          "TypeError",
          "255 and 0 (it clamps values to the range [0, 255] instead of wrapping modulo 256)",
          "300 and -10"
        ],
        "correctAnswer": "255 and 0 (it clamps values to the range [0, 255] instead of wrapping modulo 256)",
        "explanation": "`Uint8ClampedArray` (used extensively in HTML5 Canvas ImageData) clamps any number > 255 to 255, and any number < 0 to 0."
      },
      {
        "question": "What does creating two TypedArray views over the same `ArrayBuffer` allow?",
        "codeSnippet": "const buf = new ArrayBuffer(4);\nconst u8 = new Uint8Array(buf);\nconst u32 = new Uint32Array(buf);",
        "language": "javascript",
        "options": [
          "Throws an error: a buffer can only have one active view",
          "Duplicates the buffer into two distinct memory blocks",
          "Freezes the buffer from further writes",
          "Type punning: Mutating `u8` immediately alters the bits read by `u32` because both share the same underlying memory"
        ],
        "correctAnswer": "Type punning: Mutating `u8` immediately alters the bits read by `u32` because both share the same underlying memory",
        "explanation": "Both TypedArrays reference the exact same underlying `ArrayBuffer`. Writing to bytes in `u8` modifies the 32-bit integer read by `u32`."
      }
    ]
  },
  {
    "title": "JavaScript: Shared Memory & Atomics",
    "description": "Multithreaded state sharing with `SharedArrayBuffer`, atomic operations, and thread synchronization.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Performance",
      "WebAssembly"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What security headers are required by modern browsers to enable `SharedArrayBuffer`?",
        "codeSnippet": "// Cross-Origin Isolation requirement",
        "language": "javascript",
        "options": [
          "`Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`",
          "`Access-Control-Allow-Origin: *`",
          "`Content-Security-Policy: default-src 'self'`",
          "`Strict-Transport-Security: max-age=31536000`"
        ],
        "correctAnswer": "`Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`",
        "explanation": "To mitigate Spectre side-channel timing attacks, browsers restrict `SharedArrayBuffer` to cross-origin isolated environments via COOP and COEP headers."
      },
      {
        "question": "Why are `Atomics` operations necessary when multiple Web Workers read and write to a `SharedArrayBuffer`?",
        "codeSnippet": "Atomics.add(sharedInt32Array, 0, 1);",
        "language": "javascript",
        "options": [
          "To encrypt data in shared memory",
          "To prevent race conditions and ensure operations are performed indivisibly without memory tears",
          "Because standard math operators do not work on numbers in typed arrays",
          "To convert integers into floats"
        ],
        "correctAnswer": "To prevent race conditions and ensure operations are performed indivisibly without memory tears",
        "explanation": "`Atomics` methods ensure read-modify-write cycles complete atomically, preventing threads from corrupting shared data due to interleaved memory access."
      },
      {
        "question": "Can `Atomics.wait()` be invoked on the main browser UI thread?",
        "codeSnippet": "// In main.js UI thread:\nAtomics.wait(int32, 0, 0);",
        "language": "javascript",
        "options": [
          "Yes, it pauses until the timeout expires",
          "Only if within a setTimeout",
          "TypeError: Atomics.wait cannot be called on the main thread (to prevent freezing user interaction)",
          "Yes, but only in Chrome"
        ],
        "correctAnswer": "TypeError: Atomics.wait cannot be called on the main thread (to prevent freezing user interaction)",
        "explanation": "`Atomics.wait()` puts the calling thread to sleep. Because blocking the main thread freezes the entire browser UI, the engine disallows it on the main thread."
      },
      {
        "question": "What does `Atomics.compareExchange(ta, index, expected, replacement)` do?",
        "codeSnippet": "const oldVal = Atomics.compareExchange(typedArray, 0, 10, 20);",
        "language": "javascript",
        "options": [
          "Swaps the values at two different array indices",
          "Compares two arrays for equality",
          "Throws an error if the value is not 10",
          "If the value at `index` equals `expected`, it replaces it with `replacement`; returns the original value"
        ],
        "correctAnswer": "If the value at `index` equals `expected`, it replaces it with `replacement`; returns the original value",
        "explanation": "Compare-and-Swap (CAS) is the fundamental atomic building block for lock-free concurrency: it only updates if the current value matches the expected state."
      },
      {
        "question": "What does `Atomics.notify(typedArray, index, count)` do?",
        "codeSnippet": "Atomics.notify(int32, 0, 1);",
        "language": "javascript",
        "options": [
          "Wakes up `count` worker threads that are sleeping in `Atomics.wait()` on that specific memory index",
          "Sends an OS desktop notification",
          "Logs a message to the console on all workers",
          "Re-evaluates the script on the worker"
        ],
        "correctAnswer": "Wakes up `count` worker threads that are sleeping in `Atomics.wait()` on that specific memory index",
        "explanation": "`Atomics.notify` wakes sleeping threads waiting on the wait queue at the specified buffer index."
      }
    ]
  },
  {
    "title": "JavaScript: V8 Shapes & Inline Caching",
    "description": "Optimize object access, hidden class transitions, and avoid megamorphic de-optimizations.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Performance"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What is a 'Hidden Class' (or Shape/Map) in the V8 engine?",
        "codeSnippet": "function Point(x, y) {\n  this.x = x;\n  this.y = y;\n}",
        "language": "javascript",
        "options": [
          "A TypeScript interface compiled to JavaScript",
          "An internal C++ data structure that tracks the layout, property names, and memory offsets of JavaScript objects",
          "A class declared with private `#field` syntax",
          "A hidden symbol attached to `Object.prototype`"
        ],
        "correctAnswer": "An internal C++ data structure that tracks the layout, property names, and memory offsets of JavaScript objects",
        "explanation": "Because JS is dynamic, V8 creates internal hidden classes (Shapes) to track object property offsets in memory, enabling C++-like property lookup speed."
      },
      {
        "question": "What causes two objects with identical properties to have different hidden classes in V8?",
        "codeSnippet": "const obj1 = {}; obj1.a = 1; obj1.b = 2;\nconst obj2 = {}; obj2.b = 2; obj2.a = 1;",
        "language": "javascript",
        "options": [
          "Objects never share hidden classes unless created with `new`",
          "Assigning numeric values",
          "Adding properties in a different order causes different transition trees, producing two separate hidden classes",
          "Strict mode versus non-strict mode"
        ],
        "correctAnswer": "Adding properties in a different order causes different transition trees, producing two separate hidden classes",
        "explanation": "Hidden class transitions are order-dependent. Adding `a` then `b` traverses shape `A -> AB`, while adding `b` then `a` traverses `B -> BA`."
      },
      {
        "question": "What is 'Inline Caching' (IC) in modern JavaScript engines?",
        "codeSnippet": "function getX(point) { return point.x; }",
        "language": "javascript",
        "options": [
          "Storing function return values in localStorage",
          "Pre-calculating math operations before compilation",
          "Compressing code inside inline `<script>` tags",
          "Caching the memory offset of property `x` for a specific shape directly in the JIT machine code at the call site"
        ],
        "correctAnswer": "Caching the memory offset of property `x` for a specific shape directly in the JIT machine code at the call site",
        "explanation": "Inline caching observes the shape of incoming objects. Once a shape is seen, the JIT bypasses hash lookup and reads directly from the cached memory offset."
      },
      {
        "question": "What happens when a call site becomes 'Megamorphic' in V8?",
        "codeSnippet": "function logId(item) { return item.id; }\n// Passed objects with 10+ different shapes...",
        "language": "javascript",
        "options": [
          "The engine abandons inline cache optimization and falls back to a slow dictionary hash lookup",
          "The engine crashes with a StackOverflow",
          "All 10 shapes are merged into a single class",
          "The function is executed in a background worker"
        ],
        "correctAnswer": "The engine abandons inline cache optimization and falls back to a slow dictionary hash lookup",
        "explanation": "Monomorphic IC handles 1 shape (fastest); Polymorphic handles 2–4 shapes; passing 5+ shapes makes the site Megamorphic, dropping back to slower global lookup."
      },
      {
        "question": "Why does `delete obj.prop` harm performance in hot performance-critical code paths?",
        "codeSnippet": "delete user.temporaryFlag;",
        "language": "javascript",
        "options": [
          "It pauses the event loop for 10ms",
          "It mutates the object's hidden class into a slow dictionary mode ('hash map'), de-optimizing inline caches",
          "It deletes the entire prototype chain",
          "It triggers an immediate full garbage collection sweep"
        ],
        "correctAnswer": "It mutates the object's hidden class into a slow dictionary mode ('hash map'), de-optimizing inline caches",
        "explanation": "Using `delete` alters the shape transitions and typically drops the object into slow dictionary mode. Setting `user.temporaryFlag = undefined` is preferred in hot code."
      }
    ]
  },
  {
    "title": "JavaScript: Prototype Mutation & Deopt",
    "description": "Explore the performance impacts of `Object.setPrototypeOf()` and `__proto__` mutations.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Performance"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "Why does the MDN specification strongly warn against using `Object.setPrototypeOf()`?",
        "codeSnippet": "Object.setPrototypeOf(obj, newProto);",
        "language": "javascript",
        "options": [
          "It causes prototype pollution automatically",
          "It is not supported in Chromium browsers",
          "Mutating an object's prototype is an extremely slow operation that de-optimizes all code accessing that object and downstream prototypes",
          "It deletes all own properties on `obj`"
        ],
        "correctAnswer": "Mutating an object's prototype is an extremely slow operation that de-optimizes all code accessing that object and downstream prototypes",
        "explanation": "Modifying `[[Prototype]]` invalidates engine inline caches and optimization assumptions across every function that touches objects sharing that prototype chain."
      },
      {
        "question": "What is the recommended alternative to `Object.setPrototypeOf()` when creating an object with a custom prototype?",
        "codeSnippet": "const obj = ?????(customPrototype);",
        "language": "javascript",
        "options": [
          "`Object.assign({}, customPrototype)`",
          "`new Object(customPrototype)`",
          "`customPrototype.clone()`",
          "`Object.create(customPrototype)`"
        ],
        "correctAnswer": "`Object.create(customPrototype)`",
        "explanation": "`Object.create(proto)` creates the object with the desired prototype from inception, preventing dynamic prototype mutation penalties."
      },
      {
        "question": "What will `Object.getPrototypeOf(Object.prototype)` return?",
        "codeSnippet": "console.log(Object.getPrototypeOf(Object.prototype));",
        "language": "javascript",
        "options": [
          "`null` (it is the ultimate root of the standard prototype chain)",
          "`undefined`",
          "`Object`",
          "`Function.prototype`"
        ],
        "correctAnswer": "`null` (it is the ultimate root of the standard prototype chain)",
        "explanation": "`Object.prototype` marks the terminus of standard prototypal inheritance. Its prototype is `null`."
      },
      {
        "question": "What security risk arises from unsafe deep object merges that assign to `__proto__`?",
        "codeSnippet": "const payload = JSON.parse('{\"__proto__\": {\"isAdmin\": true}}');\nmerge(target, payload);",
        "language": "javascript",
        "options": [
          "SQL Injection",
          "Prototype Pollution: Injecting properties into `Object.prototype`, which pollutes all objects across the application runtime",
          "Buffer Overflow in V8 heap",
          "Cross-Site Scripting via CSS"
        ],
        "correctAnswer": "Prototype Pollution: Injecting properties into `Object.prototype`, which pollutes all objects across the application runtime",
        "explanation": "Unsanitized assignment to `__proto__` injects properties directly onto `Object.prototype`, affecting every object and leading to privilege escalation."
      },
      {
        "question": "How can you protect a dictionary object completely from prototype pollution attacks?",
        "codeSnippet": "const safeDictionary = Object.create(null);",
        "language": "javascript",
        "options": [
          "By using `let` instead of `const`",
          "By wrapping it in an arrow function",
          "By creating it with `Object.create(null)` so it has no `__proto__` or prototype chain to pollute",
          "By storing only string keys"
        ],
        "correctAnswer": "By creating it with `Object.create(null)` so it has no `__proto__` or prototype chain to pollute",
        "explanation": "Objects created via `Object.create(null)` do not inherit from `Object.prototype`, making them completely immune to prototype pollution via `__proto__`."
      }
    ]
  },
  {
    "title": "JavaScript: Proxy Invariants & Revocation",
    "description": "Respect ECMAScript Proxy invariant rules and implement revocable access boundaries.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Security"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What is a 'Proxy Invariant' in the ECMAScript specification?",
        "codeSnippet": "// Proxy specification constraints",
        "language": "javascript",
        "options": [
          "The requirement that proxies must have handlers",
          "A memory barrier that prevents GC",
          "A syntax check in TypeScript",
          "Rules that traps cannot violate (e.g. a trap cannot report a non-configurable, non-writable property as undefined if it exists on the target)"
        ],
        "correctAnswer": "Rules that traps cannot violate (e.g. a trap cannot report a non-configurable, non-writable property as undefined if it exists on the target)",
        "explanation": "Invariants preserve core runtime integrity. If a trap returns a value that contradicts target object property descriptors, the engine throws a TypeError."
      },
      {
        "question": "What does `Proxy.revocable(target, handler)` return?",
        "codeSnippet": "const { proxy, revoke } = Proxy.revocable(target, handler);",
        "language": "javascript",
        "options": [
          "An object containing the `proxy` instance and a `revoke` function that permanently disables the proxy",
          "A boolean indicating if the proxy was accepted",
          "A Proxy that expires after 1000ms",
          "A read-only snapshot"
        ],
        "correctAnswer": "An object containing the `proxy` instance and a `revoke` function that permanently disables the proxy",
        "explanation": "`Proxy.revocable()` returns `{ proxy, revoke }`. Calling `revoke()` renders the proxy immediately inert; subsequent operations throw a TypeError."
      },
      {
        "question": "What happens when you attempt to access a property on a revoked proxy?",
        "codeSnippet": "const { proxy, revoke } = Proxy.revocable({}, {});\nrevoke();\nconsole.log(proxy.name);",
        "language": "javascript",
        "options": [
          "undefined",
          "TypeError: Cannot perform 'get' on a proxy that has been revoked",
          "null",
          "ReferenceError"
        ],
        "correctAnswer": "TypeError: Cannot perform 'get' on a proxy that has been revoked",
        "explanation": "Once revoked, any interaction with the proxy instance throws a TypeError, making it an excellent pattern for revoking untrusted third-party access."
      },
      {
        "question": "What occurs if a `get` trap returns a different value for a non-configurable, non-writable target property?",
        "codeSnippet": "const target = {};\nObject.defineProperty(target, 'id', { value: 1, writable: false, configurable: false });\nconst p = new Proxy(target, { get() { return 999; } });\nconsole.log(p.id);",
        "language": "javascript",
        "options": [
          "It returns 999 successfully",
          "It returns 1",
          "TypeError: 'get' on proxy: property 'id' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value",
          "It returns undefined"
        ],
        "correctAnswer": "TypeError: 'get' on proxy: property 'id' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value",
        "explanation": "This is a fundamental Proxy invariant: a proxy cannot falsify the value of a non-configurable, non-writable property."
      },
      {
        "question": "Which trap intercepts constructor calls (`new Proxy()`)?",
        "codeSnippet": "const P = new Proxy(TargetClass, {\n  construct(target, argArray, newTarget) { ... }\n});",
        "language": "javascript",
        "options": [
          "`instantiate(target, args)`",
          "`apply(target, thisArg, args)`",
          "`create(target, args)`",
          "`construct(target, argArray, newTarget)`"
        ],
        "correctAnswer": "`construct(target, argArray, newTarget)`",
        "explanation": "The `construct` trap intercepts the `new` operator, receiving the target constructor, argument array, and `newTarget` constructor reference."
      }
    ]
  },
  {
    "title": "JavaScript: ShadowRealm & Sandboxing",
    "description": "Isolate execution environments, evaluate untrusted code, and understand realm boundaries.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Security"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What is the primary capability of the ECMAScript `ShadowRealm` proposal/API?",
        "codeSnippet": "const realm = new ShadowRealm();\nconst result = realm.evaluate('1 + 1');",
        "language": "javascript",
        "options": [
          "Provides an isolated global environment with distinct built-ins (`Object`, `Array`), preventing untrusted code from modifying the host realm",
          "Runs code on a background Web Worker process",
          "Compiles JavaScript code directly to C++",
          "Disables garbage collection inside the sandbox"
        ],
        "correctAnswer": "Provides an isolated global environment with distinct built-ins (`Object`, `Array`), preventing untrusted code from modifying the host realm",
        "explanation": "A `ShadowRealm` creates a separate global object and clean built-in prototypes within the same thread, preventing prototype pollution from affecting the host."
      },
      {
        "question": "What types of values can cross the boundary between a `ShadowRealm` and the host realm?",
        "codeSnippet": "// ShadowRealm boundary communication",
        "language": "javascript",
        "options": [
          "Any arbitrary object, including DOM nodes",
          "Only primitive values and wrapped callable functions",
          "Only JSON strings",
          "WebAssembly memory buffers only"
        ],
        "correctAnswer": "Only primitive values and wrapped callable functions",
        "explanation": "To prevent prototype leaks between environments, objects cannot pass directly across the realm membrane. Only primitives and wrapped functions are permitted."
      },
      {
        "question": "How does `ShadowRealm.prototype.importValue(specifier, exportName)` load modules?",
        "codeSnippet": "const add = await realm.importValue('./math.js', 'add');",
        "language": "javascript",
        "options": [
          "Synchronously executes the file on a worker",
          "Downloads the file and saves it to disk",
          "Asynchronously imports the module inside the shadow realm and returns a wrapped version of the specified export",
          "Returns the raw module namespace object"
        ],
        "correctAnswer": "Asynchronously imports the module inside the shadow realm and returns a wrapped version of the specified export",
        "explanation": "`importValue` loads a module within the isolated realm and returns a Promise resolving to the requested export as a primitive or wrapped function."
      },
      {
        "question": "Why is `eval()` or `new Function()` inside a browser inadequate for safe code sandboxing compared to ShadowRealm?",
        "codeSnippet": "// eval() security pitfalls",
        "language": "javascript",
        "options": [
          "`eval()` only runs synchronously",
          "`eval()` is not supported on HTTPS",
          "`eval()` cannot parse template strings",
          "`eval()` shares the host global object (`window`) and prototypes, allowing untrusted code to access `window.document` or mutate `Array.prototype`"
        ],
        "correctAnswer": "`eval()` shares the host global object (`window`) and prototypes, allowing untrusted code to access `window.document` or mutate `Array.prototype`",
        "explanation": "Plain `eval()` has access to the host's global scope, `window`, and DOM. ShadowRealm establishes a completely isolated global context without DOM access."
      },
      {
        "question": "Can a `ShadowRealm` access the host's `window` or `document` DOM elements directly?",
        "codeSnippet": "// DOM access in ShadowRealm",
        "language": "javascript",
        "options": [
          "No, a ShadowRealm does not have access to the host environment's DOM or global properties",
          "Yes, via `window.parent`",
          "Only if granted in the constructor",
          "Yes, all global variables are mirrored"
        ],
        "correctAnswer": "No, a ShadowRealm does not have access to the host environment's DOM or global properties",
        "explanation": "The ShadowRealm global object contains only pure ECMAScript standard built-ins; host-specific web APIs like `window`, `document`, and `fetch` are not present."
      }
    ]
  },
  {
    "title": "JavaScript: Subclassing Built-ins & Exotic Objects",
    "description": "Extend `Array`, `Error`, and `Promise`, and manage internal slots like `[[PromiseState]]`.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Frontend"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What is an 'Exotic Object' in the ECMAScript specification?",
        "codeSnippet": "// ECMAScript Exotic Object definition",
        "language": "javascript",
        "options": [
          "An object imported from an external WebAssembly module",
          "An object whose internal methods (like `[[Get]]`, `[[Set]]`, or `[[DefineOwnProperty]]`) deviate from default behavior (e.g. Array `.length` synchronization)",
          "A deprecated ActiveX object in Internet Explorer",
          "An object containing more than 1,000 properties"
        ],
        "correctAnswer": "An object whose internal methods (like `[[Get]]`, `[[Set]]`, or `[[DefineOwnProperty]]`) deviate from default behavior (e.g. Array `.length` synchronization)",
        "explanation": "Standard objects follow standard internal method algorithms. Arrays, arguments, String objects, and Proxies are 'exotic' because their internal methods contain specialized rules."
      },
      {
        "question": "When subclassing `Error` in ES6, why is `Error.captureStackTrace(this, CustomError)` often called in Node.js?",
        "codeSnippet": "class AppError extends Error {\n  constructor(msg) {\n    super(msg);\n    Error.captureStackTrace(this, AppError);\n  }\n}",
        "language": "javascript",
        "options": [
          "To print the error immediately to stderr",
          "To convert the error message to JSON",
          "To omit the constructor itself from the captured stack trace, keeping the stack trace clean for debugging",
          "Because standard errors cannot store messages"
        ],
        "correctAnswer": "To omit the constructor itself from the captured stack trace, keeping the stack trace clean for debugging",
        "explanation": "`Error.captureStackTrace(targetObject, constructorOpt)` hides internal error constructor implementation details from the generated `.stack` trace."
      },
      {
        "question": "Why was subclassing `Array` broken in ES5 pseudo-classical inheritance before ES6 classes?",
        "codeSnippet": "// ES5 Array subclassing dilemma",
        "language": "javascript",
        "options": [
          "ES5 did not allow prototype chains deeper than 2 levels",
          "Arrays could not have methods added to their prototype",
          "Because `new` was reserved for functions",
          "In ES5, the subclass constructor allocated the object first, missing the exotic `[[DefineOwnProperty]]` needed for `.length` tracking; ES6 `super()` lets `Array` allocate first"
        ],
        "correctAnswer": "In ES5, the subclass constructor allocated the object first, missing the exotic `[[DefineOwnProperty]]` needed for `.length` tracking; ES6 `super()` lets `Array` allocate first",
        "explanation": "In ES6, `super()` allows the base constructor (`Array`) to allocate the exotic instance with internal `.length` synchronization before the subclass modifies it."
      },
      {
        "question": "What must be called before accessing `this` in a subclass constructor?",
        "codeSnippet": "class Admin extends User {\n  constructor(name) {\n    // What must appear first?\n    this.role = 'admin';\n  }\n}",
        "language": "javascript",
        "options": [
          "`super()`",
          "`this.init()`",
          "`Object.assign(this)`",
          "`User.call(this)`"
        ],
        "correctAnswer": "`super()`",
        "explanation": "In derived class constructors, `this` is uninitialized in the TDZ until `super(...)` is called, which invokes the parent constructor and initializes `this`."
      },
      {
        "question": "What internal slot stores the fulfillment value or rejection reason of a Promise in the engine?",
        "codeSnippet": "// V8 internal Promise slot",
        "language": "javascript",
        "options": [
          "`[[Value]]`",
          "`[[PromiseResult]]`",
          "`[[Data]]`",
          "`[[Payload]]`"
        ],
        "correctAnswer": "`[[PromiseResult]]`",
        "explanation": "In the ECMAScript spec, Promises have `[[PromiseState]]` ('pending', 'fulfilled', 'rejected') and `[[PromiseResult]]` which stores the resolved value or rejection error."
      }
    ]
  },
  {
    "title": "JavaScript: Node.js Event Loop Phases",
    "description": "Deep dive into Timers, Pending, Poll, Check, and Close callbacks in libuv.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Node.js",
      "Backend"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "Which libuv event loop phase executes `setImmediate()` callbacks?",
        "codeSnippet": "// Node.js event loop phases",
        "language": "javascript",
        "options": [
          "Timers phase",
          "Poll phase",
          "Check phase",
          "Close callbacks phase"
        ],
        "correctAnswer": "Check phase",
        "explanation": "`setImmediate()` is dedicated to the Check phase, which executes immediately after the Poll phase completes or yields."
      },
      {
        "question": "What happens in the Poll phase of the Node.js event loop?",
        "codeSnippet": "// Libuv poll phase",
        "language": "javascript",
        "options": [
          "Executes all `setTimeout` timers",
          "Executes garbage collection sweeps",
          "Compiles newly loaded TypeScript files",
          "Calculates how long to block for incoming I/O, then processes events in the I/O queue (network, file system)"
        ],
        "correctAnswer": "Calculates how long to block for incoming I/O, then processes events in the I/O queue (network, file system)",
        "explanation": "The Poll phase retrieves new I/O events, executes their callbacks, and calculates sleep duration when waiting for incoming connections."
      },
      {
        "question": "Inside an I/O callback (e.g. `fs.readFile`), why does `setImmediate` always execute BEFORE `setTimeout(fn, 0)`?",
        "codeSnippet": "fs.readFile('data.txt', () => {\n  setTimeout(() => console.log('Timeout'), 0);\n  setImmediate(() => console.log('Immediate'));\n});",
        "language": "javascript",
        "options": [
          "The I/O callback runs in the Poll phase; the loop advances immediately to the Check phase before looping back to Timers",
          "`setImmediate` has a higher thread priority",
          "`setTimeout(0)` has a mandatory 50ms delay in Node.js",
          "File system operations freeze timers"
        ],
        "correctAnswer": "The I/O callback runs in the Poll phase; the loop advances immediately to the Check phase before looping back to Timers",
        "explanation": "From the Poll phase, the loop moves directly to the Check phase (`setImmediate`). The Timers phase cannot be reached until the next full loop iteration."
      },
      {
        "question": "Which callbacks are handled in the 'Close callbacks' phase of the event loop?",
        "codeSnippet": "socket.on('close', () => console.log('Closed'));",
        "language": "javascript",
        "options": [
          "Browser tab exit handlers",
          "Cleanup callbacks such as `socket.on('close', ...)` when a handle is abruptly closed via `uv_close()`",
          "`process.exit()` listeners",
          "Database connection timeouts"
        ],
        "correctAnswer": "Cleanup callbacks such as `socket.on('close', ...)` when a handle is abruptly closed via `uv_close()`",
        "explanation": "If a socket or handle closes abruptly (e.g. `socket.destroy()`), the `'close'` event is emitted in the dedicated Close callbacks phase."
      },
      {
        "question": "What is the libuv default thread pool size in Node.js, and what tasks utilize it?",
        "codeSnippet": "// UV_THREADPOOL_SIZE default",
        "language": "javascript",
        "options": [
          "1 thread; used for all asynchronous code",
          "16 threads; used exclusively for HTTP requests",
          "4 threads; used for file system I/O (`fs`), DNS lookups (`dns.lookup`), and crypto methods (`crypto.pbkdf2`)",
          "Unlimited threads spawned dynamically per request"
        ],
        "correctAnswer": "4 threads; used for file system I/O (`fs`), DNS lookups (`dns.lookup`), and crypto methods (`crypto.pbkdf2`)",
        "explanation": "Libuv maintains a thread pool (default size: 4, configurable via `UV_THREADPOOL_SIZE`) for blocking OS operations like synchronous file I/O and CPU-heavy crypto."
      }
    ]
  },
  {
    "title": "JavaScript: AsyncLocalStorage",
    "description": "Propagate execution contexts, trace request IDs, and manage thread-local equivalents.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Node.js",
      "Backend"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What problem does Node.js `AsyncLocalStorage` solve in server architectures?",
        "codeSnippet": "import { AsyncLocalStorage } from 'node:async_hooks';\nconst asyncLocalStorage = new AsyncLocalStorage();",
        "language": "javascript",
        "options": [
          "Stores key-value data on the local SSD drive",
          "Replaces Redis for distributed caching",
          "Provides a thread-safe SQL database",
          "Stores data that persists across asynchronous execution chains (like request tracing IDs) without passing parameters manually through every function"
        ],
        "correctAnswer": "Stores data that persists across asynchronous execution chains (like request tracing IDs) without passing parameters manually through every function",
        "explanation": "`AsyncLocalStorage` acts like thread-local storage for asynchronous Node.js execution, propagating state across timers, promises, and I/O callbacks."
      },
      {
        "question": "How do you run a callback within an isolated `AsyncLocalStorage` context?",
        "codeSnippet": "asyncLocalStorage.????(storeData, () => {\n  // Context is available here and in downstream awaits\n});",
        "language": "javascript",
        "options": [
          "`run(storeData, callback)`",
          "`execute(storeData, callback)`",
          "`bind(storeData, callback)`",
          "`start(storeData, callback)`"
        ],
        "correctAnswer": "`run(storeData, callback)`",
        "explanation": "`asyncLocalStorage.run(store, callback, ...args)` sets the active store for the duration of the synchronous callback and any asynchronous operations spawned within it."
      },
      {
        "question": "How do you retrieve the current store value from anywhere inside the active async context?",
        "codeSnippet": "const currentStore = asyncLocalStorage.????????();",
        "language": "javascript",
        "options": [
          "`read()`",
          "`getStore()`",
          "`value()`",
          "`current()`"
        ],
        "correctAnswer": "`getStore()`",
        "explanation": "`.getStore()` returns the current store associated with the active asynchronous execution context, or `undefined` if called outside an active context."
      },
      {
        "question": "Under the hood, what native V8/Node.js subsystem powers `AsyncLocalStorage`?",
        "codeSnippet": "// AsyncLocalStorage underlying mechanism",
        "language": "javascript",
        "options": [
          "POSIX thread registers",
          "Web Workers",
          "`async_hooks` and V8 promise hook events (`init`, `before`, `after`, `promiseResolve`)",
          "SharedArrayBuffer memory addresses"
        ],
        "correctAnswer": "`async_hooks` and V8 promise hook events (`init`, `before`, `after`, `promiseResolve`)",
        "explanation": "`AsyncLocalStorage` is built on top of the `async_hooks` engine API, tracking asynchronous resource creation and execution transitions across the event loop."
      },
      {
        "question": "What is a potential performance drawback of enabling `AsyncLocalStorage` heavily across an application?",
        "codeSnippet": "// ALS performance considerations",
        "language": "javascript",
        "options": [
          "It disables JIT compiler optimizations completely",
          "It limits the number of HTTP requests to 500 per second",
          "It doubles garbage collector sweep pauses",
          "Slight throughput overhead on every Promise creation and context switch due to lifecycle tracking hooks"
        ],
        "correctAnswer": "Slight throughput overhead on every Promise creation and context switch due to lifecycle tracking hooks",
        "explanation": "While modern V8 has optimized ALS significantly, tracking lifecycle events on millions of Promises introduces minor CPU and memory overhead."
      }
    ]
  },
  {
    "title": "JavaScript: RegEx Catastrophic Backtracking",
    "description": "Detect ReDoS vulnerabilities, lookbehind assertions, and sticky `/y` matching.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Security",
      "Performance"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What causes 'Catastrophic Backtracking' (ReDoS) in regular expression engines?",
        "codeSnippet": "const regex = /^(a+)+$/;\nregex.test('aaaaaaaaaaaaaaaaaaaaaaaaaaaa!');",
        "language": "javascript",
        "options": [
          "Nested quantifiers on overlapping patterns cause the NFA engine to test exponential $O(2^n)$ permutation paths on unmatched inputs",
          "The string is too long for memory buffer limits",
          "V8 does not support plus signs inside parentheses",
          "The regex compiler crashes due to a stack overflow in the AST"
        ],
        "correctAnswer": "Nested quantifiers on overlapping patterns cause the NFA engine to test exponential $O(2^n)$ permutation paths on unmatched inputs",
        "explanation": "Patterns like `(a+)+` have multiple ambiguous ways to match sequences of 'a'. When matching fails at the end, the engine backtracks through millions of combinations, freezing the thread."
      },
      {
        "question": "What does the sticky flag `/y` do differently from the global flag `/g` in RegExp?",
        "codeSnippet": "const regex = /\\d+/y;\nregex.lastIndex = 3;\nconst match = regex.exec('abc123xyz');",
        "language": "javascript",
        "options": [
          "It matches only from right to left",
          "It matches ONLY at the exact index specified by `regex.lastIndex`, without searching forward in the string",
          "It yields all matches as a generator",
          "It ignores whitespace"
        ],
        "correctAnswer": "It matches ONLY at the exact index specified by `regex.lastIndex`, without searching forward in the string",
        "explanation": "The `/y` flag matches strictly at `lastIndex`. If characters at that exact position do not match, it returns `null` immediately without scanning forward."
      },
      {
        "question": "What is the syntax for a Positive Lookbehind assertion in modern JavaScript regular expressions?",
        "codeSnippet": "// Match amount only if preceded by dollar sign: '$100'",
        "language": "javascript",
        "options": [
          "`(?=\\$)\\d+`",
          "`(?<!\\$)\\d+`",
          "`(?<=\\$)\\d+`",
          "`(?<=\\d+)\\$`"
        ],
        "correctAnswer": "`(?<=\\$)\\d+`",
        "explanation": "`(?<=pattern)` is a positive lookbehind assertion, verifying that the preceding text matches `pattern` without including it in the match result."
      },
      {
        "question": "What does the `/d` (indices) flag do in ES2022 regular expressions?",
        "codeSnippet": "const regex = /a(b)c/d;\nconst match = regex.exec('abc');\nconsole.log(match.indices);",
        "language": "javascript",
        "options": [
          "Deletes matching characters from the original string",
          "Enables decimal-only matching",
          "Compiles the regex into WebAssembly",
          "Provides start and end character index offsets `[start, end]` for each capture group in `match.indices`"
        ],
        "correctAnswer": "Provides start and end character index offsets `[start, end]` for each capture group in `match.indices`",
        "explanation": "The `/d` flag populates a `.indices` array on match results containing the start and end boundary indices of all capture groups."
      },
      {
        "question": "How can developers prevent ReDoS in user-supplied regex input?",
        "codeSnippet": "// Defensive regex architecture",
        "language": "javascript",
        "options": [
          "Use regex validation libraries, set strict timeouts (or use non-backtracking engines like RE2), and avoid nested quantifiers",
          "Convert all regexes to lower case",
          "Run the regex inside a `try...catch` block",
          "Replace all quantifiers with `*`"
        ],
        "correctAnswer": "Use regex validation libraries, set strict timeouts (or use non-backtracking engines like RE2), and avoid nested quantifiers",
        "explanation": "Standard `try/catch` cannot catch catastrophic backtracking because it is not an exception. Using linear-time engines (like Google RE2) or strict timeouts protects servers."
      }
    ]
  },
  {
    "title": "JavaScript: Heap Profiling & Retainers",
    "description": "Analyze Chrome DevTools heap snapshots, shallow vs retained size, and distance from root.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Performance",
      "Frontend"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "In a Chrome DevTools Heap Snapshot, what is the difference between 'Shallow Size' and 'Retained Size'?",
        "codeSnippet": "// DevTools memory profiling",
        "language": "javascript",
        "options": [
          "Shallow Size includes all prototypes; Retained Size excludes prototypes",
          "Shallow Size is the memory held by the object itself; Retained Size is the memory freed if the object and its exclusive references are garbage collected",
          "Retained Size is memory stored on disk; Shallow Size is in RAM",
          "There is no difference; they are aliases"
        ],
        "correctAnswer": "Shallow Size is the memory held by the object itself; Retained Size is the memory freed if the object and its exclusive references are garbage collected",
        "explanation": "Shallow size is just the object's own direct memory footprint. Retained size is the total heap size that would be freed once this object is deleted."
      },
      {
        "question": "What does 'Distance' represent in a DevTools Heap Snapshot analysis view?",
        "codeSnippet": "// Snapshot Distance metric",
        "language": "javascript",
        "options": [
          "The memory distance in bytes between two allocations",
          "The time in milliseconds since the object was created",
          "The shortest path of reference links required to reach the object from a Garbage Collection root (like window)",
          "The number of methods on the object's prototype"
        ],
        "correctAnswer": "The shortest path of reference links required to reach the object from a Garbage Collection root (like window)",
        "explanation": "Distance measures how many reference hops separate the object from the GC root. Lower distance generally indicates a higher risk of being held alive by root structures."
      },
      {
        "question": "Why do detached DOM tree nodes appear in heap snapshots with yellow or red highlights?",
        "codeSnippet": "// Detached DOM nodes in DevTools",
        "language": "javascript",
        "options": [
          "They have invalid CSS styles",
          "They are scheduled for layout animation",
          "They contain deprecated HTML tags",
          "They are detached from the render tree but still held in memory by JavaScript closures or variables, indicating a leak"
        ],
        "correctAnswer": "They are detached from the render tree but still held in memory by JavaScript closures or variables, indicating a leak",
        "explanation": "Yellow highlights in snapshots signify nodes that are not in the document tree but have active JavaScript references keeping them alive in RAM."
      },
      {
        "question": "What is the 'Dominator' of an object in graph memory theory?",
        "codeSnippet": "// Dominator tree concept",
        "language": "javascript",
        "options": [
          "A node that lies on every path from the root to the target object; deleting the dominator guarantees the target will be garbage collected",
          "The prototype at the top of the chain",
          "The variable with the longest lifetime",
          "The parent DOM element in the HTML hierarchy"
        ],
        "correctAnswer": "A node that lies on every path from the root to the target object; deleting the dominator guarantees the target will be garbage collected",
        "explanation": "In graph theory, node A dominates node B if every reference path from root to B must pass through A. Removing A guarantees B becomes unreachable."
      },
      {
        "question": "How can taking two heap snapshots before and after an action identify a memory leak?",
        "codeSnippet": "// Snapshot comparison technique",
        "language": "javascript",
        "options": [
          "Count the total number of strings",
          "Use the 'Comparison' view and filter for objects allocated between Snapshot 1 and Snapshot 2 that were not freed",
          "Compare file size on disk",
          "Look at the network waterfall tab"
        ],
        "correctAnswer": "Use the 'Comparison' view and filter for objects allocated between Snapshot 1 and Snapshot 2 that were not freed",
        "explanation": "The Comparison view shows delta allocations `# Alloc` and `# Freed`. Objects that increase continuously across identical actions reveal the leaking constructor."
      }
    ]
  },
  {
    "title": "JavaScript: Web Workers & Transferables",
    "description": "Multithreading, zero-copy `Transferable` buffers, and dedicated vs shared workers.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Performance",
      "Frontend"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What is the primary benefit of passing an `ArrayBuffer` as a 'Transferable Object' in `worker.postMessage()`?",
        "codeSnippet": "const buffer = new ArrayBuffer(1024 * 1024 * 100); // 100MB\nworker.postMessage({ buffer }, [buffer]);",
        "language": "javascript",
        "options": [
          "The buffer is automatically compressed by 50%",
          "The buffer can be edited by both threads simultaneously",
          "Zero-copy memory transfer: ownership moves instantly to the worker in $O(1)$ time, neutering the buffer on the sender thread",
          "It encrypts the payload before sending"
        ],
        "correctAnswer": "Zero-copy memory transfer: ownership moves instantly to the worker in $O(1)$ time, neutering the buffer on the sender thread",
        "explanation": "By transferring the buffer `[buffer]`, ownership of the underlying memory pointer transfers instantly without copying bytes. The original buffer's `.byteLength` becomes 0."
      },
      {
        "question": "What happens to the sender's `ArrayBuffer` after it has been transferred to a Web Worker?",
        "codeSnippet": "worker.postMessage(buffer, [buffer]);\nconsole.log(buffer.byteLength);",
        "language": "javascript",
        "options": [
          "100MB",
          "TypeError: buffer is detached",
          "undefined",
          "0 (the buffer is 'neutered' and rendered completely unusable on the sending thread)"
        ],
        "correctAnswer": "0 (the buffer is 'neutered' and rendered completely unusable on the sending thread)",
        "explanation": "Transferring transfers memory ownership. The source buffer is detached ('neutered'), and its `byteLength` becomes 0 to prevent concurrent mutation."
      },
      {
        "question": "Can a standard dedicated Web Worker access `window`, `document`, or DOM elements?",
        "codeSnippet": "// Worker environment capabilities",
        "language": "javascript",
        "options": [
          "No, workers run in an isolated `DedicatedWorkerGlobalScope` without access to `window` or the DOM tree",
          "Yes, via `window.parent`",
          "Only if imported with `<script type=\"module\">`",
          "Yes, but only in read-only mode"
        ],
        "correctAnswer": "No, workers run in an isolated `DedicatedWorkerGlobalScope` without access to `window` or the DOM tree",
        "explanation": "Workers execute on background threads and have no access to the DOM or `window`. They communicate with the main thread strictly via messaging (`postMessage`)."
      },
      {
        "question": "What distinguishes a `SharedWorker` from a dedicated `Worker`?",
        "codeSnippet": "const worker = new SharedWorker('worker.js');",
        "language": "javascript",
        "options": [
          "A `SharedWorker` runs on the GPU",
          "A `SharedWorker` can be shared across multiple browser tabs, iframes, or windows belonging to the same origin",
          "A `SharedWorker` has full access to the DOM",
          "A `SharedWorker` never terminates"
        ],
        "correctAnswer": "A `SharedWorker` can be shared across multiple browser tabs, iframes, or windows belonging to the same origin",
        "explanation": "Unlike dedicated workers (1-to-1 with a script), `SharedWorker` allows multiple pages or tabs from the same origin to connect to a single shared background worker via `MessagePort`."
      },
      {
        "question": "How do you terminate a Web Worker immediately from the main thread?",
        "codeSnippet": "const worker = new Worker('task.js');\n// Force immediate shutdown",
        "language": "javascript",
        "options": [
          "`worker.close();`",
          "`worker.kill();`",
          "`worker.terminate();`",
          "`delete worker;`"
        ],
        "correctAnswer": "`worker.terminate();`",
        "explanation": "Calling `worker.terminate()` immediately terminates the background worker thread without waiting for running tasks to finish. Inside a worker, `self.close()` can be called."
      }
    ]
  },
  {
    "title": "JavaScript: Function Arity & Internals",
    "description": "Analyze `fn.length`, argument descriptors, rest parameters, and execution stack allocations.",
    "difficulty": "hard",
    "tags": [
      "JavaScript",
      "Performance"
    ],
    "timeLimitMinutes": 7,
    "questions": [
      {
        "question": "What does `fn.length` evaluate to for a function?",
        "codeSnippet": "function calculate(a, b, c = 10, ...rest) {}\nconsole.log(calculate.length);",
        "language": "javascript",
        "options": [
          "3",
          "4",
          "undefined",
          "2 (the number of positional parameters before the first default parameter or rest operator)"
        ],
        "correctAnswer": "2 (the number of positional parameters before the first default parameter or rest operator)",
        "explanation": "`Function.prototype.length` indicates the arity of the function: specifically, the count of formal parameters before the first parameter with a default value, excluding rest parameters."
      },
      {
        "question": "In non-strict mode, how does mutating the `arguments` object affect named parameters?",
        "codeSnippet": "function update(x) {\n  arguments[0] = 99;\n  console.log(x);\n}\nupdate(10);",
        "language": "javascript",
        "options": [
          "99 (in non-strict mode without defaults/destructuring, `arguments` elements are linked/aliased to named parameters)",
          "10",
          "undefined",
          "TypeError"
        ],
        "correctAnswer": "99 (in non-strict mode without defaults/destructuring, `arguments` elements are linked/aliased to named parameters)",
        "explanation": "In legacy non-strict mode, `arguments` aliases named parameters, so mutating `arguments[0]` directly updates `x`. In strict mode, they are unlinked."
      },
      {
        "question": "Why do modern JavaScript performance guides recommend rest parameters `(...args)` over the legacy `arguments` object?",
        "codeSnippet": "// ...args vs arguments",
        "language": "javascript",
        "options": [
          "`arguments` is not supported in ES6+",
          "`arguments` is an exotic array-like object whose access often de-optimizes V8 functions (leaking arguments); rest parameters are real arrays optimized by V8",
          "`arguments` cannot be looped over with `for`",
          "`arguments` always throws in arrow functions"
        ],
        "correctAnswer": "`arguments` is an exotic array-like object whose access often de-optimizes V8 functions (leaking arguments); rest parameters are real arrays optimized by V8",
        "explanation": "Passing or leaking the `arguments` object causes V8 JIT compilers to skip optimization. Rest parameters `(...args)` construct standard arrays efficiently."
      },
      {
        "question": "What does `Function.prototype.bind()` do to the `.length` property of the resulting bound function?",
        "codeSnippet": "function multiply(a, b, c) { return a * b * c; }\nconst double = multiply.bind(null, 2);\nconsole.log(double.length);",
        "language": "javascript",
        "options": [
          "3",
          "0",
          "2 (subtracts the number of pre-bound arguments from the original function arity)",
          "1"
        ],
        "correctAnswer": "2 (subtracts the number of pre-bound arguments from the original function arity)",
        "explanation": "Bound functions adjust their `.length` property by subtracting the number of arguments bound by `.bind()`, floored at 0."
      },
      {
        "question": "What does `Object.getOwnPropertyDescriptor(fn, 'name')` reveal about a function's name property?",
        "codeSnippet": "function test() {}\nconst desc = Object.getOwnPropertyDescriptor(test, 'name');",
        "language": "javascript",
        "options": [
          "`{ writable: true, enumerable: true, configurable: true }`",
          "`undefined`",
          "`{ writable: false, enumerable: false, configurable: false }`",
          "`{ writable: false, enumerable: false, configurable: true }`"
        ],
        "correctAnswer": "`{ writable: false, enumerable: false, configurable: true }`",
        "explanation": "A function's `.name` property is non-writable and non-enumerable, but configurable (meaning it can be redefined using `Object.defineProperty()`)."
      }
    ]
  }
];
