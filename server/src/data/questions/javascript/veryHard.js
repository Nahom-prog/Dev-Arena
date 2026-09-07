export const javascriptVeryHardQuizzes = [
  {
    "title": "JavaScript: V8 TurboFan Compiler & Deopts",
    "description": "TurboFan graph IR, speculative optimization, soft vs hard bailouts, and feedback vectors.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Performance",
      "Compilers"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How does V8's TurboFan optimizing compiler achieve near-native execution speed for dynamic JavaScript functions?",
        "codeSnippet": "// V8 JIT Speculative Optimization",
        "language": "javascript",
        "options": [
          "It uses type feedback collected by the Ignition interpreter to generate speculative machine code assuming stable types",
          "It compiles code ahead of time into WebAssembly binaries",
          "It converts all numbers into 64-bit strings",
          "It runs all functions in parallel on multi-core GPU shaders"
        ],
        "correctAnswer": "It uses type feedback collected by the Ignition interpreter to generate speculative machine code assuming stable types",
        "explanation": "TurboFan inspects Type Feedback Vectors gathered during interpreted runs. If types remain homogeneous, it emits optimized native assembly assuming those types."
      },
      {
        "question": "What is a 'De-optimization' (Bailout) in V8?",
        "codeSnippet": "function add(a, b) { return a + b; }\nfor (let i = 0; i < 10000; i++) add(1, 2);\nadd('hello', 'world'); // What happens?",
        "language": "javascript",
        "options": [
          "The engine throws a TypeError and stops the program",
          "The engine detects that type assumptions were violated, discards the optimized machine code, and bails out to the Ignition interpreter",
          "TurboFan pauses the thread for 500ms to re-compile",
          "The function is executed in a background worker"
        ],
        "correctAnswer": "The engine detects that type assumptions were violated, discards the optimized machine code, and bails out to the Ignition interpreter",
        "explanation": "Passing strings to an arithmetic-optimized function invalidates type assumptions. The engine executes a 'deopt', restoring unoptimized interpreter state."
      },
      {
        "question": "What is the difference between a 'Soft Deopt' and an 'Eager (Hard) Deopt' in V8?",
        "codeSnippet": "// V8 deopt classification",
        "language": "javascript",
        "options": [
          "Soft deopt only happens in development; hard deopt happens in production",
          "Soft deopt is non-fatal; hard deopt terminates the Node.js process",
          "Soft deopt occurs at function boundaries when code can be re-compiled without immediate state repair; hard deopt happens mid-execution requiring stack frame reconstruction",
          "Hard deopt runs garbage collection synchronously"
        ],
        "correctAnswer": "Soft deopt occurs at function boundaries when code can be re-compiled without immediate state repair; hard deopt happens mid-execution requiring stack frame reconstruction",
        "explanation": "Eager/hard deopts happen in the middle of executing a function when an invariant fails (e.g. integer overflow), forcing V8 to deconstruct machine stack frames into interpreter frames."
      },
      {
        "question": "What V8 flag can you pass to Node.js to inspect functions being optimized and de-optimized in real time?",
        "codeSnippet": "$ node ???????????? app.js",
        "language": "javascript",
        "options": [
          "`--debug-compiler`",
          "`--print-jit`",
          "`--verbose-engine`",
          "`--trace-opt --trace-deopt`"
        ],
        "correctAnswer": "`--trace-opt --trace-deopt`",
        "explanation": "`--trace-opt --trace-deopt` logs messages whenever TurboFan compiles a function (e.g. `[marking ... for optimization]`) or bails out with deopt reasons."
      },
      {
        "question": "What coding pattern causes a function to be permanently marked as 'bailout / un-optimizable' in older V8 architectures?",
        "codeSnippet": "// De-optimization trap",
        "language": "javascript",
        "options": [
          "Passing the `arguments` object outside the function (leaking arguments) or dynamic `eval()` usage",
          "Using arrow functions",
          "Using `const` variables",
          "Having more than 3 parameters"
        ],
        "correctAnswer": "Passing the `arguments` object outside the function (leaking arguments) or dynamic `eval()` usage",
        "explanation": "Leaking `arguments` or invoking dynamic `eval()` prevents compilers from reasoning about scope variables and stack layouts, disabling JIT optimizations."
      }
    ]
  },
  {
    "title": "JavaScript: Ignition Bytecode Architecture",
    "description": "Understand V8's accumulator register, bytecode instructions, and bytecode dispatch.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Compilers"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What register architecture does V8's Ignition interpreter utilize?",
        "codeSnippet": "// V8 Ignition design",
        "language": "javascript",
        "options": [
          "A pure Stack machine (like JVM)",
          "An Accumulator Register machine with explicit registers `r0, r1, ...`",
          "A 32-register MIPS architecture",
          "A Turing tape simulation"
        ],
        "correctAnswer": "An Accumulator Register machine with explicit registers `r0, r1, ...`",
        "explanation": "Ignition is a register machine with an implicit 'accumulator' register (`acc`). Most bytecodes load values into `acc` or operate between registers and `acc`."
      },
      {
        "question": "What does the bytecode instruction `LdaNamedProperty a0, [0], [1]` do in Ignition?",
        "codeSnippet": "// Sample Ignition disassembly snippet",
        "language": "javascript",
        "options": [
          "Allocates a 0-byte array",
          "Calls an asynchronous function",
          "Loads a named property from argument register `a0` into the accumulator, using feedback slot `[1]` for inline caching",
          "Jumps to offset 0"
        ],
        "correctAnswer": "Loads a named property from argument register `a0` into the accumulator, using feedback slot `[1]` for inline caching",
        "explanation": "`Lda` stands for 'Load Accumulator'. `LdaNamedProperty` reads property `[0]` from object `a0` into `acc`, referencing feedback vector slot `[1]`."
      },
      {
        "question": "Why did the V8 team introduce Ignition in 2017 to replace the original Full-Codegen compiler?",
        "codeSnippet": "// V8 pipeline evolution",
        "language": "javascript",
        "options": [
          "Because C++ was deprecated in Chromium",
          "To support WebAssembly multithreading",
          "To eliminate the need for garbage collection",
          "To reduce heap memory consumption on mobile devices and provide stable feedback vectors for TurboFan"
        ],
        "correctAnswer": "To reduce heap memory consumption on mobile devices and provide stable feedback vectors for TurboFan",
        "explanation": "Full-Codegen generated bulky unoptimized machine code that consumed immense memory. Ignition bytecodes are 4x smaller, dramatically reducing mobile RAM usage."
      },
      {
        "question": "What command displays the compiled Ignition bytecode for a script in Node.js?",
        "codeSnippet": "$ node ???????????? app.js",
        "language": "javascript",
        "options": [
          "`--print-bytecode`",
          "`--show-asm`",
          "`--dump-ir`",
          "`--debug-ignition`"
        ],
        "correctAnswer": "`--print-bytecode`",
        "explanation": "`node --print-bytecode app.js` outputs the complete Ignition assembly-like bytecode generated for all parsed functions."
      },
      {
        "question": "What does `Star r0` do in Ignition bytecode assembly?",
        "codeSnippet": "Star r0",
        "language": "javascript",
        "options": [
          "Multiplies register `r0` by itself",
          "Stores the current value in the accumulator (`acc`) into register `r0`",
          "Returns register `r0` from the function",
          "Allocates a new string"
        ],
        "correctAnswer": "Stores the current value in the accumulator (`acc`) into register `r0`",
        "explanation": "`Star` stands for 'Store Accumulator Register'. It moves data from `acc` into the specified target register (`r0`)."
      }
    ]
  },
  {
    "title": "JavaScript: Abstract Syntax Trees (AST)",
    "description": "Parser phases, ESTree specification, tokenization, and code instrumentation.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Compilers",
      "Tooling"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What are the two fundamental stages of modern JavaScript parsing before AST generation?",
        "codeSnippet": "// JS Parser stages: Code -> ??? -> ??? -> AST",
        "language": "javascript",
        "options": [
          "Compilation and Linking",
          "Type checking and Execution",
          "Lexical Analysis (Tokenization/Scanning) and Syntactic Analysis (Parsing)",
          "Minification and Bundling"
        ],
        "correctAnswer": "Lexical Analysis (Tokenization/Scanning) and Syntactic Analysis (Parsing)",
        "explanation": "First, the Lexer scans characters into tokens (`Identifier`, `Keyword`, `Punctuator`). Then, the Parser validates grammar and constructs the Abstract Syntax Tree (AST)."
      },
      {
        "question": "In the ESTree AST specification, what node type represents an arrow function expression?",
        "codeSnippet": "const fn = (x) => x * 2;",
        "language": "javascript",
        "options": [
          "`FunctionDeclaration`",
          "`LambdaNode`",
          "`AnonymousBlock`",
          "`ArrowFunctionExpression`"
        ],
        "correctAnswer": "`ArrowFunctionExpression`",
        "explanation": "Under the standard ESTree spec (used by Babel, ESLint, Acorn), arrow functions are represented by `ArrowFunctionExpression` nodes."
      },
      {
        "question": "What is the Visitor Pattern in AST transformations (such as Babel plugins)?",
        "codeSnippet": "module.exports = function() {\n  return {\n    visitor: {\n      Identifier(path) { ... }\n    }\n  };\n};",
        "language": "javascript",
        "options": [
          "A design pattern that traverses AST nodes recursively, invoking handler functions whenever a matching node type is entered or exited",
          "A pattern that counts variable names",
          "A security firewall for npm packages",
          "A technique to bundle CSS with JavaScript"
        ],
        "correctAnswer": "A design pattern that traverses AST nodes recursively, invoking handler functions whenever a matching node type is entered or exited",
        "explanation": "AST visitors inspect nodes during tree traversal, allowing Babel/SWC plugins to replace, insert, or remove nodes dynamically."
      },
      {
        "question": "What distinguishes a Concrete Syntax Tree (Parse Tree) from an Abstract Syntax Tree (AST)?",
        "codeSnippet": "// CST vs AST",
        "language": "javascript",
        "options": [
          "A CST is only used in TypeScript",
          "A CST retains all syntactic trivia (semicolons, exact whitespace, grouping parentheses); an AST abstracts syntax into pure semantic hierarchy",
          "An AST contains binary machine code",
          "There is no difference in compiler theory"
        ],
        "correctAnswer": "A CST retains all syntactic trivia (semicolons, exact whitespace, grouping parentheses); an AST abstracts syntax into pure semantic hierarchy",
        "explanation": "CSTs capture 100% of concrete syntax tokens (useful for formatters like Prettier). ASTs discard irrelevant delimiters to model programmatic meaning."
      },
      {
        "question": "What does Babel's `path.scope.generateUidIdentifier('temp')` guarantee during AST transformations?",
        "codeSnippet": "const id = path.scope.generateUidIdentifier('temp');",
        "language": "javascript",
        "options": [
          "Generates a random UUID string",
          "Encrypts the variable name",
          "Generates a unique variable identifier that does not collide with any existing variable names in the current or parent scopes",
          "Creates a global variable on window"
        ],
        "correctAnswer": "Generates a unique variable identifier that does not collide with any existing variable names in the current or parent scopes",
        "explanation": "Scope managers in AST engines generate hygienic, collision-free identifiers (e.g. `_temp`, `_temp2`) avoiding variable shadowing bugs."
      }
    ]
  },
  {
    "title": "JavaScript: WebAssembly Linear Memory Interop",
    "description": "Share `WebAssembly.Memory`, pass pointers across the FFI barrier, and avoid serialization.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "WebAssembly",
      "Performance"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How is memory shared between JavaScript and WebAssembly instances?",
        "codeSnippet": "const memory = new WebAssembly.Memory({ initial: 2 }); // 2 pages",
        "language": "javascript",
        "options": [
          "Through JSON strings serialized over WebSockets",
          "Via SQLite database queries",
          "Memory cannot be shared between JS and WebAssembly",
          "Via a contiguous resizable linear buffer represented as `memory.buffer` (an `ArrayBuffer`) accessible by both JS TypedArrays and Wasm pointers"
        ],
        "correctAnswer": "Via a contiguous resizable linear buffer represented as `memory.buffer` (an `ArrayBuffer`) accessible by both JS TypedArrays and Wasm pointers",
        "explanation": "WebAssembly memory is a linear array of raw bytes. JavaScript reads and writes to this memory directly through TypedArrays over `memory.buffer`."
      },
      {
        "question": "What is the unit size of a single page of WebAssembly memory?",
        "codeSnippet": "// WebAssembly page size specification",
        "language": "javascript",
        "options": [
          "64 KiB (65,536 bytes)",
          "4 KiB (4,096 bytes)",
          "1 MiB (1,048,576 bytes)",
          "16 KiB"
        ],
        "correctAnswer": "64 KiB (65,536 bytes)",
        "explanation": "The WebAssembly specification defines memory page allocations strictly in 64-kibibyte (64 KiB) units."
      },
      {
        "question": "What happens to existing JavaScript TypedArray views when `memory.grow()` is called in WebAssembly?",
        "codeSnippet": "const u8 = new Uint8Array(memory.buffer);\nmemory.grow(1);\nconsole.log(u8.byteLength);",
        "language": "javascript",
        "options": [
          "The TypedArray automatically expands its length",
          "0 (the old `ArrayBuffer` is detached/neutered upon growth, invalidating existing TypedArray views)",
          "Throws a RangeError",
          "The view retains the old memory while new memory is allocated in a separate buffer"
        ],
        "correctAnswer": "0 (the old `ArrayBuffer` is detached/neutered upon growth, invalidating existing TypedArray views)",
        "explanation": "Growing Wasm linear memory reallocates the underlying buffer. The previous `ArrayBuffer` is detached, neutering all existing views (byteLength becomes 0)."
      },
      {
        "question": "How are JavaScript strings passed into WebAssembly C/Rust functions efficiently?",
        "codeSnippet": "// Passing strings into Wasm FFI",
        "language": "javascript",
        "options": [
          "Pass the string as a regular function argument directly",
          "Strings must be converted to JSON files on disk",
          "Encode the string into UTF-8 bytes using `TextEncoder`, write bytes into Wasm linear memory, and pass the memory offset pointer and length as integers",
          "WebAssembly natively supports JS string objects directly without memory translation"
        ],
        "correctAnswer": "Encode the string into UTF-8 bytes using `TextEncoder`, write bytes into Wasm linear memory, and pass the memory offset pointer and length as integers",
        "explanation": "Wasm only understands numbers (i32, i64, f32, f64). Complex data like strings must be copied into linear memory and referenced by pointer and byte length."
      },
      {
        "question": "What is the performance overhead of crossing the JavaScript-to-WebAssembly Foreign Function Interface (FFI) boundary?",
        "codeSnippet": "// JS <-> Wasm boundary cost",
        "language": "javascript",
        "options": [
          "Zero nanoseconds; calls are always fully inlined by the browser",
          "10 milliseconds per call",
          "Wasm calls require a full event loop tick",
          "A small calling overhead (a few nanoseconds) per call for parameter conversion and stack transitions; fine-grained calls should be batched"
        ],
        "correctAnswer": "A small calling overhead (a few nanoseconds) per call for parameter conversion and stack transitions; fine-grained calls should be batched",
        "explanation": "While fast, crossing the boundary carries slight FFI overhead. Calling Wasm functions millions of times inside tight loops should be refactored to do heavy looping inside Wasm."
      }
    ]
  },
  {
    "title": "JavaScript: IEEE-754 Bitwise Quirks & Numbers",
    "description": "Examine 64-bit double floats, sign bits, mantissa precision, and subnormal underflow.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Performance"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How are standard JavaScript numbers laid out in IEEE-754 64-bit binary floating-point representation?",
        "codeSnippet": "// IEEE-754 64-bit double precision structure",
        "language": "javascript",
        "options": [
          "1 sign bit, 11 exponent bits, and 52 fraction (mantissa/significand) bits",
          "1 sign bit, 15 exponent bits, and 48 mantissa bits",
          "32 integer bits and 32 fraction bits",
          "8 sign bits, 24 exponent bits, 32 mantissa bits"
        ],
        "correctAnswer": "1 sign bit, 11 exponent bits, and 52 fraction (mantissa/significand) bits",
        "explanation": "All standard JavaScript numbers are double-precision floats: 1 bit for sign, 11 bits for exponent (bias 1023), and 52 bits for explicit mantissa (53 bits effective precision)."
      },
      {
        "question": "Why is `Number.MAX_SAFE_INTEGER` defined specifically as $2^{53} - 1$ (9,007,199,254,740,991)?",
        "codeSnippet": "console.log(Number.MAX_SAFE_INTEGER === 2**53 - 1); // true",
        "language": "javascript",
        "options": [
          "Because the operating system register size is 53 bits",
          "Because the 52-bit mantissa plus the implicit leading bit provides exactly 53 bits of contiguous integer representation",
          "It is an arbitrary constant chosen by Netscape in 1995",
          "Because 11 exponent bits cannot represent numbers higher than 53"
        ],
        "correctAnswer": "Because the 52-bit mantissa plus the implicit leading bit provides exactly 53 bits of contiguous integer representation",
        "explanation": "With 52 explicit mantissa bits and 1 implicit hidden bit, 53 bits can uniquely represent every integer from $-(2^{53} - 1)$ to $2^{53} - 1$."
      },
      {
        "question": "How can you reliably distinguish between positive zero `+0` and negative zero `-0` in JavaScript?",
        "codeSnippet": "function isNegativeZero(n) {\n  return ?????????;\n}",
        "language": "javascript",
        "options": [
          "`n === -0`",
          "`Math.sign(n) === -1`",
          "`Object.is(n, -0)` or `n === 0 && 1 / n === -Infinity`",
          "`n < 0`"
        ],
        "correctAnswer": "`Object.is(n, -0)` or `n === 0 && 1 / n === -Infinity`",
        "explanation": "`+0 === -0` evaluates to `true`. Dividing 1 by `+0` yields `+Infinity`, while `1 / -0` yields `-Infinity`, making `1 / n === -Infinity` or `Object.is` the standard detectors."
      },
      {
        "question": "What does `Math.fround(1.337)` compute?",
        "codeSnippet": "const f32 = Math.fround(1.337);",
        "language": "javascript",
        "options": [
          "Rounds to the nearest whole integer",
          "Rounds down to the nearest fraction",
          "Formats the number to 3 decimal places",
          "The nearest 32-bit single-precision float representation of the number"
        ],
        "correctAnswer": "The nearest 32-bit single-precision float representation of the number",
        "explanation": "`Math.fround` casts a number to a 32-bit float (used in WebAssembly or WebGL shaders) to emulate single-precision float rounding errors."
      },
      {
        "question": "What are 'Subnormal' (denormalized) numbers in floating-point computation?",
        "codeSnippet": "const subnormal = 5e-324;",
        "language": "javascript",
        "options": [
          "Non-zero numbers closer to zero than the smallest normal number ($2^{-1022}$), where the implicit leading mantissa bit becomes 0",
          "Negative infinity values",
          "Numbers that produce NaN when added",
          "Complex imaginary numbers"
        ],
        "correctAnswer": "Non-zero numbers closer to zero than the smallest normal number ($2^{-1022}$), where the implicit leading mantissa bit becomes 0",
        "explanation": "When exponent bits are all zero, numbers enter the subnormal range, filling the gap between zero and $2^{-1022}$ with degraded precision at a performance penalty."
      }
    ]
  },
  {
    "title": "JavaScript: Bitwise Operations & 32-bit Conversion",
    "description": "Understand `>>> 0`, signed integer truncation, and bitwise tricks in high-performance algorithms.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Performance"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Why does `(number | 0)` convert floating point numbers to 32-bit signed integers in V8?",
        "codeSnippet": "console.log(42.85 | 0, -42.85 | 0);",
        "language": "javascript",
        "options": [
          "Because `|` rounds to the nearest even number",
          "ECMAScript bitwise operators cast operands to 32-bit integers via the `ToInt32` abstract operation before evaluating",
          "It is a compiler bug in V8",
          "It only works in 32-bit operating systems"
        ],
        "correctAnswer": "ECMAScript bitwise operators cast operands to 32-bit integers via the `ToInt32` abstract operation before evaluating",
        "explanation": "All bitwise operators (except `>>>`) coerce values to signed 32-bit integers via `ToInt32`, truncating decimal digits immediately."
      },
      {
        "question": "What does the zero-fill right shift operator `x >>> 0` accomplish?",
        "codeSnippet": "const unsigned = (-1) >>> 0;\nconsole.log(unsigned);",
        "language": "javascript",
        "options": [
          "Divides the number by 0 safely",
          "Returns 0 for all negative numbers",
          "Coerces the value to an unsigned 32-bit integer (`ToUint32`), converting `-1` into `4294967295`",
          "Bit-shifts the number 32 places to the right"
        ],
        "correctAnswer": "Coerces the value to an unsigned 32-bit integer (`ToUint32`), converting `-1` into `4294967295`",
        "explanation": "`>>> 0` forces evaluation through `ToUint32`. Negative numbers wrap around the 32-bit boundary, producing unsigned values."
      },
      {
        "question": "What will `console.log(~~4.9)` output, and why?",
        "codeSnippet": "console.log(~~4.9);",
        "language": "javascript",
        "options": [
          "5",
          "~5",
          "NaN",
          "4 (double bitwise NOT performs `ToInt32` truncation twice, discarding fractional digits)"
        ],
        "correctAnswer": "4 (double bitwise NOT performs `ToInt32` truncation twice, discarding fractional digits)",
        "explanation": "The first `~` converts to 32-bit int and inverts bits; the second `~` inverts back, effectively achieving fast integer truncation."
      },
      {
        "question": "What will `console.log(1 << 31)` output in JavaScript?",
        "codeSnippet": "console.log(1 << 31);",
        "language": "javascript",
        "options": [
          "-2147483648 (the sign bit of a 32-bit signed integer is set)",
          "2147483648",
          "0",
          "Infinity"
        ],
        "correctAnswer": "-2147483648 (the sign bit of a 32-bit signed integer is set)",
        "explanation": "Shifting 1 by 31 places moves the bit into the MSB (sign bit) of a two's-complement 32-bit integer, resulting in $-2^{31} = -2,147,483,648$."
      },
      {
        "question": "How can you check if an integer is a power of two using a single bitwise check?",
        "codeSnippet": "function isPowerOfTwo(n) {\n  return n > 0 && ????????? === 0;\n}",
        "language": "javascript",
        "options": [
          "`(n | (n - 1))`",
          "`(n & (n - 1))`",
          "`(n ^ (n - 1))`",
          "`(n >> 1)`"
        ],
        "correctAnswer": "`(n & (n - 1))`",
        "explanation": "Powers of two have a single bit set (`1000...`). Subtracting 1 flips all trailing bits (`0111...`). ANDing `n & (n - 1)` yields 0 if and only if `n` is a power of two."
      }
    ]
  },
  {
    "title": "JavaScript: Microtask Starvation & NextTick",
    "description": "Analyze microtask starvation cascades, task re-queuing, and UI loop priority.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Runtime",
      "Performance"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "In Node.js, what happens if an unhandled promise rejection occurs inside a `process.nextTick` callback?",
        "codeSnippet": "process.nextTick(() => {\n  Promise.reject(new Error('uncaught'));\n});",
        "language": "javascript",
        "options": [
          "Silently recovers and moves to the timers phase",
          "Retries the callback three times",
          "Emits `unhandledRejection` and terminates the Node.js process with a non-zero exit code (Node 15+)",
          "Catches the error in `process.on('exit')`"
        ],
        "correctAnswer": "Emits `unhandledRejection` and terminates the Node.js process with a non-zero exit code (Node 15+)",
        "explanation": "Since Node.js v15, unhandled promise rejections terminate the process with exit code 1 unless an `'unhandledRejection'` event listener is registered."
      },
      {
        "question": "Can an asynchronous recursive microtask loop be interrupted by an incoming HTTP network packet in Node.js?",
        "codeSnippet": "function recursive() {\n  queueMicrotask(recursive);\n}\nrecursive();",
        "language": "javascript",
        "options": [
          "Yes, network I/O has higher priority than microtasks",
          "Yes, after 100 iterations",
          "Yes, Node.js automatically switches to multi-threading",
          "No, the event loop will never reach the Poll phase to accept incoming packets or read sockets"
        ],
        "correctAnswer": "No, the event loop will never reach the Poll phase to accept incoming packets or read sockets",
        "explanation": "Microtasks execute immediately after the current operation and drain continuously. The loop cannot advance to the Poll phase while microtasks remain pending."
      },
      {
        "question": "What is the order of execution between `queueMicrotask`, `Promise.resolve().then()`, and `MutationObserver` in the browser?",
        "codeSnippet": "// Browser microtask queue order",
        "language": "javascript",
        "options": [
          "FIFO (First-In, First-Out): all share the same standard microtask queue and run in the order they were scheduled",
          "`MutationObserver` always runs ahead of Promises",
          "`queueMicrotask` runs ahead of everything else",
          "The browser randomizes the order for fairness"
        ],
        "correctAnswer": "FIFO (First-In, First-Out): all share the same standard microtask queue and run in the order they were scheduled",
        "explanation": "Per HTML spec, Promises, `queueMicrotask`, and `MutationObserver` all enqueue tasks onto the single unified microtask queue, which drains in strict FIFO order."
      },
      {
        "question": "What does `process.maxTickDepth` historically protect in early Node.js versions?",
        "codeSnippet": "// Node legacy process.maxTickDepth",
        "language": "javascript",
        "options": [
          "The maximum number of TCP sockets",
          "A threshold (default 1000) that forced the nextTick queue to yield to I/O to prevent infinite starvation",
          "The maximum depth of the call stack",
          "The maximum number of worker threads"
        ],
        "correctAnswer": "A threshold (default 1000) that forced the nextTick queue to yield to I/O to prevent infinite starvation",
        "explanation": "Early Node.js introduced `maxTickDepth` to prevent `nextTick` starvation, though it was later removed in favor of developer-managed scheduling."
      },
      {
        "question": "How can developers break up heavy synchronous tasks without blocking the main UI thread?",
        "codeSnippet": "// Cooperative multitasking pattern",
        "language": "javascript",
        "options": [
          "Wrapping code in a `while(true)` loop",
          "Increasing the CSS z-index of the window",
          "Chunking work and yielding to the event loop using `await new Promise(resolve => setTimeout(resolve, 0))` or `scheduler.yield()`",
          "Calling `window.gc()`"
        ],
        "correctAnswer": "Chunking work and yielding to the event loop using `await new Promise(resolve => setTimeout(resolve, 0))` or `scheduler.yield()`",
        "explanation": "Yielding control with `setTimeout(0)` or modern `scheduler.yield()` returns control to the browser, allowing pending clicks, paints, and inputs to be processed."
      }
    ]
  },
  {
    "title": "JavaScript: V8 Elements Kinds & Packed vs Holey",
    "description": "Understand `PACKED_SMI`, `PACKED_DOUBLE`, `HOLEY_ELEMENTS`, and element transitions.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Performance"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the fastest, most memory-efficient Element Kind for arrays in V8?",
        "codeSnippet": "const arr = [1, 2, 3]; // Elements Kind?",
        "language": "javascript",
        "options": [
          "`HOLEY_ELEMENTS`",
          "`PACKED_DOUBLE_ELEMENTS`",
          "`DICTIONARY_ELEMENTS`",
          "`PACKED_SMI_ELEMENTS` (densely packed Small Integers)"
        ],
        "correctAnswer": "`PACKED_SMI_ELEMENTS` (densely packed Small Integers)",
        "explanation": "`PACKED_SMI_ELEMENTS` contains only small signed integers without holes. V8 stores them as raw unboxed values, avoiding pointer lookups."
      },
      {
        "question": "Can an array's Element Kind transition backwards from a more generic type to a more specific type (e.g. from `DOUBLE` to `SMI`)?",
        "codeSnippet": "const arr = [1, 2]; // PACKED_SMI\narr.push(4.5); // Transitions to PACKED_DOUBLE\narr.pop(); // What is the Element Kind now?",
        "language": "javascript",
        "options": [
          "No, transitions are strictly one-way (lattice progression); once transitioned to `PACKED_DOUBLE`, it never reverts to `PACKED_SMI`",
          "Yes, removing the float reverts it immediately",
          "Only if the array is re-sorted",
          "Only when `arr.length = 0`"
        ],
        "correctAnswer": "No, transitions are strictly one-way (lattice progression); once transitioned to `PACKED_DOUBLE`, it never reverts to `PACKED_SMI`",
        "explanation": "V8 element transitions are strictly unidirectional. Once an array broadens to `PACKED_DOUBLE`, it remains `PACKED_DOUBLE` even if the float is removed."
      },
      {
        "question": "What creates a 'Holey' array (`HOLEY_ELEMENTS`) in V8?",
        "codeSnippet": "const arr = [1, 2, 3];\narr[100] = 99;",
        "language": "javascript",
        "options": [
          "Deleting elements with `pop()`",
          "Creating sparse indices with unallocated gaps ('holes'), forcing prototype chain lookups for missing indices",
          "Pushing objects with missing keys",
          "Freezing the array with `Object.freeze()`"
        ],
        "correctAnswer": "Creating sparse indices with unallocated gaps ('holes'), forcing prototype chain lookups for missing indices",
        "explanation": "Skipping indices creates empty slots ('holes'). For every hole, V8 must traverse `Array.prototype` to check if a prototype property exists, degrading performance."
      },
      {
        "question": "Why should you avoid pre-allocating large arrays with `new Array(size)` if you intend to populate them densely?",
        "codeSnippet": "const arr = new Array(10000); // Creates HOLEY_SMI_ELEMENTS",
        "language": "javascript",
        "options": [
          "`new Array(size)` throws a RangeError for sizes above 100",
          "It allocates memory on the GPU",
          "`new Array(size)` initializes the array in `HOLEY` mode; push-populating an empty array `[]` maintains faster `PACKED` elements",
          "It prevents the array from using `.map()`"
        ],
        "correctAnswer": "`new Array(size)` initializes the array in `HOLEY` mode; push-populating an empty array `[]` maintains faster `PACKED` elements",
        "explanation": "An array created with `new Array(size)` starts with holey elements. Populating it retains holey status, permanently missing packed V8 optimizations."
      },
      {
        "question": "What happens when an array index exceeds $2^{32} - 2$ (or is an arbitrary string)?",
        "codeSnippet": "const arr = [1, 2];\narr['custom_key'] = 'val';",
        "language": "javascript",
        "options": [
          "It throws a RangeError",
          "The array is converted into a Map",
          "The length of the array becomes Infinity",
          "The property is stored on the object's named property dictionary, not in the elements array buffer"
        ],
        "correctAnswer": "The property is stored on the object's named property dictionary, not in the elements array buffer",
        "explanation": "V8 stores indexed numeric properties in its elements store, while non-numeric keys are stored in its named properties store, without affecting `.length`."
      }
    ]
  },
  {
    "title": "JavaScript: Concurrent Marking & Sweeping",
    "description": "Examine Orinoco GC architecture, write barriers, black/grey/white tri-color marking.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Performance"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is 'Concurrent Marking' in V8's Orinoco garbage collection project?",
        "codeSnippet": "// V8 Orinoco architecture",
        "language": "javascript",
        "options": [
          "Background helper threads traverse and mark live objects while the main thread continues executing JavaScript concurrently",
          "Compressing images while downloading them",
          "Writing code to disk on two threads simultaneously",
          "Running tests in parallel across worker pools"
        ],
        "correctAnswer": "Background helper threads traverse and mark live objects while the main thread continues executing JavaScript concurrently",
        "explanation": "Concurrent marking runs on background threads while the main JS thread continues running, reducing main-thread stop-the-world pause times by 70–80%."
      },
      {
        "question": "In Tri-Color marking algorithms, what does a 'Grey' object represent?",
        "codeSnippet": "// Tri-Color marking state: White, Grey, Black",
        "language": "javascript",
        "options": [
          "An object scheduled for immediate deletion",
          "An object that has been discovered as reachable, but whose referenced children have not yet been traversed and marked",
          "An object that cannot be garbage collected",
          "A primitive string value"
        ],
        "correctAnswer": "An object that has been discovered as reachable, but whose referenced children have not yet been traversed and marked",
        "explanation": "White = unvisited (potential garbage); Grey = visited, but children pending; Black = visited along with all outgoing reference edges."
      },
      {
        "question": "What is a 'Write Barrier' in concurrent garbage collection?",
        "codeSnippet": "// V8 write barrier snippet: obj.field = value;",
        "language": "javascript",
        "options": [
          "A lock that prevents file writes during GC",
          "A security feature preventing script injection",
          "A JIT code snippet executed on field assignment that checks if a Black object is mutated to point to a White object, re-marking the child Grey",
          "A hardware instruction on NVMe drives"
        ],
        "correctAnswer": "A JIT code snippet executed on field assignment that checks if a Black object is mutated to point to a White object, re-marking the child Grey",
        "explanation": "If JS assigns a new (White) object to an already-scanned (Black) object, a write barrier flags the child as Grey so it is not accidentally swept as garbage."
      },
      {
        "question": "What is 'Parallel GC' vs 'Concurrent GC'?",
        "codeSnippet": "// Parallel vs Concurrent GC",
        "language": "javascript",
        "options": [
          "Parallel runs on GPU; Concurrent runs on CPU",
          "Parallel is synchronous; Concurrent is offline",
          "They are identical terms",
          "Parallel GC distributes stop-the-world work across multiple worker threads while the main thread is paused; Concurrent GC runs on workers WHILE the main thread executes"
        ],
        "correctAnswer": "Parallel GC distributes stop-the-world work across multiple worker threads while the main thread is paused; Concurrent GC runs on workers WHILE the main thread executes",
        "explanation": "Parallel pauses the main thread and uses multiple worker threads to finish faster. Concurrent runs on background threads without pausing the main thread."
      },
      {
        "question": "What is 'Incremental Marking'?",
        "codeSnippet": "// Incremental GC interleaving",
        "language": "javascript",
        "options": [
          "Splitting the marking phase into tiny interleaved sub-millisecond slices between JavaScript execution ticks instead of one long pause",
          "Deleting 1 byte per second",
          "Marking only objects created in the last 10 seconds",
          "Compressing heap memory incrementally"
        ],
        "correctAnswer": "Splitting the marking phase into tiny interleaved sub-millisecond slices between JavaScript execution ticks instead of one long pause",
        "explanation": "Incremental marking breaks up the marking phase into small steps interleaved with application logic, avoiding user-visible jank."
      }
    ]
  },
  {
    "title": "JavaScript: Lock-Free Concurrency & Atomics",
    "description": "Build spinlocks, Single-Producer Single-Consumer (SPSC) ring buffers, and memory fences.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Performance",
      "WebAssembly"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How is a simple Spinlock implemented using `Atomics.compareExchange()` in Web Workers?",
        "codeSnippet": "function acquireLock(lockArray) {\n  while (Atomics.compareExchange(lockArray, 0, 0, 1) !== 0) {\n    // Spin until lock is acquired\n  }\n}",
        "language": "javascript",
        "options": [
          "Calls `setTimeout` until unlocked",
          "Loops continuously until `compareExchange` successfully replaces 0 with 1, ensuring only one thread holds state 1",
          "Throws a LockError",
          "Terminates the worker thread"
        ],
        "correctAnswer": "Loops continuously until `compareExchange` successfully replaces 0 with 1, ensuring only one thread holds state 1",
        "explanation": "A spinlock uses CAS in a loop: if lock index 0 is 0 (unlocked), it atomically writes 1 (locked) and returns 0, terminating the spin loop."
      },
      {
        "question": "What is a Single-Producer Single-Consumer (SPSC) Ring Buffer in Web Worker architectures?",
        "codeSnippet": "// High-performance audio / canvas pipeline",
        "language": "javascript",
        "options": [
          "A cryptographic handshake between workers",
          "A circular DOM tree",
          "A lock-free circular FIFO queue stored in a `SharedArrayBuffer` where atomic write/read pointers allow thread communication without mutex contention",
          "A WebSocket connection pool"
        ],
        "correctAnswer": "A lock-free circular FIFO queue stored in a `SharedArrayBuffer` where atomic write/read pointers allow thread communication without mutex contention",
        "explanation": "SPSC ring buffers allow a dedicated producer thread and consumer thread to exchange high-throughput data (like real-time audio) without locking."
      },
      {
        "question": "What memory ordering guarantee do `Atomics` operations provide in the ECMAScript memory model?",
        "codeSnippet": "// ECMAScript Sequentially Consistent Memory Model",
        "language": "javascript",
        "options": [
          "Relaxed memory with no ordering guarantees",
          "Write-only consistency",
          "Eventual consistency after 500ms",
          "Sequential Consistency: all threads agree on a globally consistent total order of all atomic operations"
        ],
        "correctAnswer": "Sequential Consistency: all threads agree on a globally consistent total order of all atomic operations",
        "explanation": "JavaScript Atomics enforce Sequential Consistency (SC), acting as full memory barriers preventing compiler or CPU instruction re-ordering across atomic boundaries."
      },
      {
        "question": "What is the return value of `Atomics.wait(int32Array, index, expectedValue, timeout)`?",
        "codeSnippet": "const status = Atomics.wait(ta, 0, 0, 1000);",
        "language": "javascript",
        "options": [
          "`'ok'`, `'not-equal'`, or `'timed-out'`",
          "`true` or `false`",
          "`0` or `1`",
          "A Promise"
        ],
        "correctAnswer": "`'ok'`, `'not-equal'`, or `'timed-out'`",
        "explanation": "`Atomics.wait` returns `'not-equal'` if the value did not match `expectedValue`, `'timed-out'` if the timeout expired, or `'ok'` if woken by `Atomics.notify()`."
      },
      {
        "question": "Can `Atomics.waitAsync()` be called on the main thread in modern browsers?",
        "codeSnippet": "const res = Atomics.waitAsync(int32, 0, 0);",
        "language": "javascript",
        "options": [
          "No, Atomics are banned on the main thread",
          "Yes, because it returns a Promise and does not block the main thread synchronously",
          "Only in WebAssembly",
          "Only in Node.js"
        ],
        "correctAnswer": "Yes, because it returns a Promise and does not block the main thread synchronously",
        "explanation": "`Atomics.waitAsync()` (ES2024) is non-blocking. It returns `{ async: true, value: Promise }` (or `{ async: false, value }`), safely enabling wait semantics on the UI thread."
      }
    ]
  },
  {
    "title": "JavaScript: Lexical Scope Retention & Leaks",
    "description": "Diagnose shared lexical environment retainers, the Meteor closure leak, and hidden GC anchors.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Performance"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What causes the famous 'Meteor Closure Memory Leak' in the snippet below?",
        "codeSnippet": "let theThing = null;\nfunction replaceThing() {\n  const originalThing = theThing;\n  const unused = function() {\n    if (originalThing) console.log('hi');\n  };\n  theThing = {\n    longStr: new Array(1000000).join('*'),\n    someMethod: function() {}\n  };\n};\nsetInterval(replaceThing, 1000);",
        "language": "javascript",
        "options": [
          "Strings cannot be garbage collected",
          "The `setInterval` timer interval is too short",
          "`someMethod` and `unused` share the same lexical environment; `unused` closes over `originalThing`, keeping all prior iterations linked in a giant memory chain",
          "`originalThing` is automatically attached to `window`"
        ],
        "correctAnswer": "`someMethod` and `unused` share the same lexical environment; `unused` closes over `originalThing`, keeping all prior iterations linked in a giant memory chain",
        "explanation": "Functions declared in the same scope share a single LexicalEnvironment object. Because `unused` references `originalThing`, `someMethod` unintentionally retains that entire scope."
      },
      {
        "question": "How do you break the retainer chain in the Meteor closure leak?",
        "codeSnippet": "// Breaking closure retention",
        "language": "javascript",
        "options": [
          "Change `let theThing` to `const theThing`",
          "Use an arrow function for `someMethod`",
          "Call `delete originalThing`",
          "Set `originalThing = null;` at the end of the `replaceThing()` function body"
        ],
        "correctAnswer": "Set `originalThing = null;` at the end of the `replaceThing()` function body",
        "explanation": "Setting `originalThing = null` explicitly clears the reference inside the shared lexical scope object, allowing prior iterations to be swept."
      },
      {
        "question": "Why does V8 share lexical environments between functions declared in the same parent scope?",
        "codeSnippet": "// V8 Context allocation optimization",
        "language": "javascript",
        "options": [
          "To optimize memory and avoid allocating separate Context objects for every nested function closure",
          "Because JavaScript does not support block scoping",
          "It is required by the ECMAScript 3 specification",
          "To allow functions to share `arguments`"
        ],
        "correctAnswer": "To optimize memory and avoid allocating separate Context objects for every nested function closure",
        "explanation": "Allocating a distinct Context for every single closure would inflate heap overhead. V8 pools closed-over variables in a unified parent Context object."
      },
      {
        "question": "What tool in Chrome DevTools displays the exact chain of references holding an object in memory?",
        "codeSnippet": "// Memory leak diagnosis tool",
        "language": "javascript",
        "options": [
          "The Performance waterfall view",
          "The 'Retainers' panel in the Memory tab",
          "The Application local storage tab",
          "The Network payload inspector"
        ],
        "correctAnswer": "The 'Retainers' panel in the Memory tab",
        "explanation": "The Retainers panel shows the directed acyclic graph of pointers anchoring the selected object back to GC roots (like `window` or active stack frames)."
      },
      {
        "question": "Can an unused variable inside a function be garbage collected if no closures in that function reference it?",
        "codeSnippet": "function run() {\n  const huge = new Array(1e7);\n  return function() { console.log('active'); };\n}",
        "language": "javascript",
        "options": [
          "No, all local variables in a function are retained by any closure",
          "Only in strict mode",
          "Yes, V8 detects that `huge` is never referenced by any returned closure and omits it from the allocated Context object",
          "Only if `huge` is nullified"
        ],
        "correctAnswer": "Yes, V8 detects that `huge` is never referenced by any returned closure and omits it from the allocated Context object",
        "explanation": "V8's parser performs scope analysis: variables that are never closed over by any inner function are allocated on the stack and discarded when `run()` finishes."
      }
    ]
  },
  {
    "title": "JavaScript: Deep Prototype Traversal & IC Busting",
    "description": "Analyze polymorphic lookups, prototype cache validity cells, and mega-chains.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Performance"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How does V8 validate that an inherited property looked up via prototype chain has not been shadowed?",
        "codeSnippet": "// V8 Prototype Validity Cells",
        "language": "javascript",
        "options": [
          "By performing a full linear walk up the chain on every property access",
          "By locking the prototypes in read-only RAM",
          "By cloning the entire prototype tree into each instance",
          "Using internal 'ValidityCell' (or PrototypeChainValidity) structures on prototype shapes that invalidate when any prototype in the chain is mutated"
        ],
        "correctAnswer": "Using internal 'ValidityCell' (or PrototypeChainValidity) structures on prototype shapes that invalidate when any prototype in the chain is mutated",
        "explanation": "V8 caches inherited property offsets. A `ValidityCell` acts as a guard: if any prototype in the chain is modified, the cell invalidates and triggers re-compilation."
      },
      {
        "question": "What happens to inline caches when you add a property directly to `Object.prototype` at runtime?",
        "codeSnippet": "Object.prototype.customHelper = function() {};",
        "language": "javascript",
        "options": [
          "It invalidates prototype validity cells across the entire application, busting inline caches across all objects",
          "Only objects created after the assignment are affected",
          "It throws a TypeError in strict mode",
          "The JIT automatically inlines the helper everywhere"
        ],
        "correctAnswer": "It invalidates prototype validity cells across the entire application, busting inline caches across all objects",
        "explanation": "Mutating `Object.prototype` touches the root of nearly every prototype chain, triggering mass de-optimization and cache invalidation across the engine."
      },
      {
        "question": "Why does traversing a 10-level deep prototype chain degrade performance compared to a flat object?",
        "codeSnippet": "// Deep prototype chain traversal cost",
        "language": "javascript",
        "options": [
          "The call stack grows by 10 frames per access",
          "Cache misses require checking multiple validity cells and traversing parent shapes until the property is located or null is reached",
          "Memory must be allocated on each property read",
          "V8 converts the object to a Web Worker"
        ],
        "correctAnswer": "Cache misses require checking multiple validity cells and traversing parent shapes until the property is located or null is reached",
        "explanation": "Deep prototype hierarchies require complex inline caching and multi-level validity checks. If a cache miss occurs, the linear traversal overhead is significant."
      },
      {
        "question": "What is a 'Prototype Pollution' gadget in Node.js server security?",
        "codeSnippet": "// Prototype Pollution gadget attack",
        "language": "javascript",
        "options": [
          "A malicious npm package installed globally",
          "A hardware flaw in Intel CPUs",
          "An existing piece of application code whose behavior changes insecurely (e.g. executing shell commands) when a property is injected into `Object.prototype`",
          "A CSS injection in the admin dashboard"
        ],
        "correctAnswer": "An existing piece of application code whose behavior changes insecurely (e.g. executing shell commands) when a property is injected into `Object.prototype`",
        "explanation": "A gadget is legitimate production code (like `options.shell || '/bin/sh'`) that turns into a vulnerability if an attacker pollutes `Object.prototype.shell`."
      },
      {
        "question": "How does `Object.freeze(Object.prototype)` enhance application security?",
        "codeSnippet": "Object.freeze(Object.prototype);",
        "language": "javascript",
        "options": [
          "Prevents garbage collection from running",
          "Disables strict mode across modules",
          "Freezes all database connections",
          "Prevents prototype pollution attacks by making the root prototype completely immutable at runtime"
        ],
        "correctAnswer": "Prevents prototype pollution attacks by making the root prototype completely immutable at runtime",
        "explanation": "Freezing `Object.prototype` prevents attackers from adding or modifying properties on the global object prototype, neutralizing prototype pollution."
      }
    ]
  },
  {
    "title": "JavaScript: Proxy Invariant Guardrails",
    "description": "Explore Proxy invariants around non-configurable properties and private field traps.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Security"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Can a JavaScript Proxy intercept access to private class fields (`#privateField`)?",
        "codeSnippet": "class Secret {\n  #key = 42;\n  getKey() { return this.#key; }\n}\nconst p = new Proxy(new Secret(), {});\np.getKey();",
        "language": "javascript",
        "options": [
          "No; attempting to access `#key` through the proxy throws `TypeError: Cannot read private member #key from an object whose class did not declare it`",
          "Yes, via the `get` trap",
          "Yes, via `getPrivate` trap",
          "Only in Node.js"
        ],
        "correctAnswer": "No; attempting to access `#key` through the proxy throws `TypeError: Cannot read private member #key from an object whose class did not declare it`",
        "explanation": "Private fields use brand checks against the raw object instance. Because `this` inside `getKey()` is the Proxy (not the target), accessing `#key` throws a TypeError."
      },
      {
        "question": "How can a proxy wrapper allow methods using private fields to succeed without throwing?",
        "codeSnippet": "// Fixing proxy private field brand check",
        "language": "javascript",
        "options": [
          "Declare private fields with `public` keyword",
          "In the `get` trap, bind methods to the raw target object: `return typeof val === 'function' ? val.bind(target) : val;`",
          "Disable strict mode",
          "Use `Reflect.getPrivate()`"
        ],
        "correctAnswer": "In the `get` trap, bind methods to the raw target object: `return typeof val === 'function' ? val.bind(target) : val;`",
        "explanation": "Binding the method back to `target` ensures `this` inside the method refers to the actual class instance holding the private field slots."
      },
      {
        "question": "What happens if a Proxy `getPrototypeOf` trap returns a primitive number like `42`?",
        "codeSnippet": "const p = new Proxy({}, {\n  getPrototypeOf() { return 42; }\n});\nObject.getPrototypeOf(p);",
        "language": "javascript",
        "options": [
          "It returns 42",
          "It returns Number.prototype",
          "TypeError: 'getPrototypeOf' on proxy: trap returned neither object nor null",
          "It returns undefined"
        ],
        "correctAnswer": "TypeError: 'getPrototypeOf' on proxy: trap returned neither object nor null",
        "explanation": "An ECMAScript invariant mandates that `getPrototypeOf` traps must return an `Object` or `null`. Any other return value throws a TypeError."
      },
      {
        "question": "Can a `has` trap hide a property from the `'prop' in proxy` operator if the property is non-configurable on the target?",
        "codeSnippet": "const target = {};\nObject.defineProperty(target, 'secret', { value: 1, configurable: false });\nconst p = new Proxy(target, { has() { return false; } });\nconsole.log('secret' in p);",
        "language": "javascript",
        "options": [
          "false",
          "true",
          "undefined",
          "TypeError: 'has' on proxy: trap returned falsish for property 'secret' which exists in the proxy target as not configurable"
        ],
        "correctAnswer": "TypeError: 'has' on proxy: trap returned falsish for property 'secret' which exists in the proxy target as not configurable",
        "explanation": "A proxy invariant forbids hiding non-configurable properties from the `in` operator."
      },
      {
        "question": "What is the result of `Object.isExtensible(proxy)` if the target is non-extensible but the trap returns `true`?",
        "codeSnippet": "const target = Object.preventExtensions({});\nconst p = new Proxy(target, { isExtensible() { return true; } });\nObject.isExtensible(p);",
        "language": "javascript",
        "options": [
          "TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target",
          "true",
          "false",
          "undefined"
        ],
        "correctAnswer": "TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target",
        "explanation": "The `isExtensible` trap must strictly return the exact same boolean extensibility status as `Object.isExtensible(target)`."
      }
    ]
  },
  {
    "title": "JavaScript: Execution Contexts & Environment Records",
    "description": "Analyze Global, Function, and Module Execution Contexts, Call Stacks, and Lexical Environments.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Compilers"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What two major components constitute an ECMAScript Execution Context?",
        "codeSnippet": "// ECMAScript Execution Context anatomy",
        "language": "javascript",
        "options": [
          "A Stack pointer and an Instruction counter",
          "A Lexical Environment (for `let`/`const`) and a Variable Environment (for `var`)",
          "A Heap pointer and an Event queue",
          "A Thread ID and a Process ID"
        ],
        "correctAnswer": "A Lexical Environment (for `let`/`const`) and a Variable Environment (for `var`)",
        "explanation": "Each context contains a Lexical Environment (resolving block-scoped bindings) and a Variable Environment (resolving legacy function-scoped `var` declarations)."
      },
      {
        "question": "What is an 'Environment Record' in the specification?",
        "codeSnippet": "// Spec: Declarative vs Object Environment Record",
        "language": "javascript",
        "options": [
          "A log file saved by Node.js",
          "The list of environment variables in `process.env`",
          "The internal specification object that records identifier bindings created within its scope",
          "The AST root node"
        ],
        "correctAnswer": "The internal specification object that records identifier bindings created within its scope",
        "explanation": "An Environment Record binds identifiers (variables, functions) to values. Function scopes use Declarative Environment Records; `with` uses Object Environment Records."
      },
      {
        "question": "How does the scope chain resolution search for an identifier `x`?",
        "codeSnippet": "// Scope chain lookup traversal",
        "language": "javascript",
        "options": [
          "It searches all active threads in parallel",
          "It reads values from the DOM window directly",
          "It checks localStorage",
          "It searches the current Environment Record, then traverses the `[[OuterEnv]]` reference recursively until reaching the global record"
        ],
        "correctAnswer": "It searches the current Environment Record, then traverses the `[[OuterEnv]]` reference recursively until reaching the global record",
        "explanation": "Each environment record points to an outer parent environment record via `[[OuterEnv]]`. Traversal ascends the outer link until the identifier is found or throws `ReferenceError`."
      },
      {
        "question": "Why does the `with` statement cause severe performance de-optimizations in V8?",
        "codeSnippet": "with (user) {\n  console.log(name);\n}",
        "language": "javascript",
        "options": [
          "It inserts an object at runtime into the scope chain, making lexical variable binding locations unpredictable and uncacheable by the JIT",
          "It runs garbage collection synchronously",
          "It deletes all variables in scope",
          "It is compiled into a WebAssembly loop"
        ],
        "correctAnswer": "It inserts an object at runtime into the scope chain, making lexical variable binding locations unpredictable and uncacheable by the JIT",
        "explanation": "`with` dynamically overrides the lexical environment. The engine cannot determine at compile-time whether `name` is a local variable or a property of `user`."
      },
      {
        "question": "What creates a new Execution Context on the Call Stack?",
        "codeSnippet": "// Call stack pushing triggers",
        "language": "javascript",
        "options": [
          "Declaring a variable with `let`",
          "Invoking a function, entering module code, or evaluating script code with `eval()`",
          "Creating an array literal `[]`",
          "Adding an event listener"
        ],
        "correctAnswer": "Invoking a function, entering module code, or evaluating script code with `eval()`",
        "explanation": "A new Execution Context is created and pushed onto the call stack whenever a function is called, a module is evaluated, or global execution begins."
      }
    ]
  },
  {
    "title": "JavaScript: V8 Function Inlining Heuristics",
    "description": "Analyze inlining budget, bytecode size limits, and JIT call-site optimizations.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Performance"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is 'Function Inlining' in the V8 optimizing compiler?",
        "codeSnippet": "function square(x) { return x * x; }\nfunction distance(a, b) { return square(a) + square(b); }",
        "language": "javascript",
        "options": [
          "Writing functions in inline `<script>` tags",
          "Embedding SVG images in JavaScript",
          "Replacing the function call site with the actual body of the called function to eliminate call overhead and enable downstream optimizations",
          "Converting functions to arrow syntax"
        ],
        "correctAnswer": "Replacing the function call site with the actual body of the called function to eliminate call overhead and enable downstream optimizations",
        "explanation": "Inlining pastes the callee's body directly into the caller's IR graph, eliminating call stack frames, parameter passing, and enabling dead-code elimination."
      },
      {
        "question": "What bytecode size threshold generally determines whether V8 considers a function eligible for inlining?",
        "codeSnippet": "// V8 inlining budget (e.g. max_inlined_bytecode_size)",
        "language": "javascript",
        "options": [
          "Functions with more than 10,000 lines",
          "Any function marked `async`",
          "Functions with 0 arguments only",
          "Small functions with bytecode size below ~500 bytes (depending on engine heuristics)"
        ],
        "correctAnswer": "Small functions with bytecode size below ~500 bytes (depending on engine heuristics)",
        "explanation": "V8 maintains inlining budgets (e.g. `--max_inlined_bytecode_size`). Functions with large, complex bodies exceed the budget and will not be inlined."
      },
      {
        "question": "Can recursive functions be inlined indefinitely by V8?",
        "codeSnippet": "function recurse(n) { if (n > 0) recurse(n - 1); }",
        "language": "javascript",
        "options": [
          "No, compilers cap recursive inlining depth (usually 1 or 2 levels) to avoid exponential code bloat",
          "Yes, up to 1,000,000 levels",
          "Recursive functions are never inlined under any circumstances",
          "Only in 64-bit systems"
        ],
        "correctAnswer": "No, compilers cap recursive inlining depth (usually 1 or 2 levels) to avoid exponential code bloat",
        "explanation": "Unbounded recursive inlining would cause infinite loop compilation. Engines strictly bound recursion inlining depth."
      },
      {
        "question": "Why does polymorphic call-site behavior prevent V8 from inlining a function?",
        "codeSnippet": "function process(obj) { obj.calculate(); }\n// Called with 10 different classes...",
        "language": "javascript",
        "options": [
          "Polymorphic functions are illegal in ECMAScript",
          "If multiple candidate methods exist, the compiler cannot know which method body to inline without dynamic runtime dispatch",
          "It runs out of memory",
          "Polymorphic functions require WebAssembly"
        ],
        "correctAnswer": "If multiple candidate methods exist, the compiler cannot know which method body to inline without dynamic runtime dispatch",
        "explanation": "Inlining requires a monomorphic target. If a call site invokes multiple distinct methods across different classes, it cannot be inlined into a single body."
      },
      {
        "question": "What V8 CLI flag traces inlining decisions made by the optimizing compiler?",
        "codeSnippet": "$ node ???????????? app.js",
        "language": "javascript",
        "options": [
          "`--debug-inline`",
          "`--show-inlining`",
          "`--trace-turbo-inlining`",
          "`--log-functions`"
        ],
        "correctAnswer": "`--trace-turbo-inlining`",
        "explanation": "`node --trace-turbo-inlining app.js` outputs diagnostic logs showing every inlining success and failure along with reason codes."
      }
    ]
  },
  {
    "title": "JavaScript: V8 String Representation Internals",
    "description": "Explore ConsString, SlicedString, ThinString, and ExternalString memory topologies.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Performance",
      "Memory"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is a 'ConsString' in the V8 engine?",
        "codeSnippet": "const str = longStringA + longStringB;",
        "language": "javascript",
        "options": [
          "A string marked as a constant in memory",
          "A string compiled to WebAssembly",
          "A string stored on disk",
          "A tree structure holding references to two substrings instead of immediately allocating a new contiguous character buffer"
        ],
        "correctAnswer": "A tree structure holding references to two substrings instead of immediately allocating a new contiguous character buffer",
        "explanation": "To make string concatenation $O(1)$, V8 creates a `ConsString` pairing pointers to the two operands. Flattening into contiguous bytes is deferred until read."
      },
      {
        "question": "What is a 'SlicedString' in V8, and how can it cause accidental memory retention?",
        "codeSnippet": "const sub = hugeString.slice(0, 10);",
        "language": "javascript",
        "options": [
          "A wrapper referencing an offset and length within the parent string; holding `sub` in memory retains the entire `hugeString` parent in memory",
          "A string split by spaces",
          "An encrypted string",
          "A string stored in local storage"
        ],
        "correctAnswer": "A wrapper referencing an offset and length within the parent string; holding `sub` in memory retains the entire `hugeString` parent in memory",
        "explanation": "A `SlicedString` avoids copying characters by pointing into the parent string's buffer. If you slice a small string from a 50MB file, the entire 50MB stays pinned in RAM."
      },
      {
        "question": "How can you force a sliced string to allocate its own small buffer and release the parent string reference?",
        "codeSnippet": "// Breaking SlicedString parent retention",
        "language": "javascript",
        "options": [
          "Calling `sub.trim()`",
          "Creating a copy with `sub = (' ' + sub).slice(1)` or `sub = String.fromCharCode(...sub.split('').map(c => c.charCodeAt(0)))`",
          "Calling `delete hugeString`",
          "Calling `Object.freeze(sub)`"
        ],
        "correctAnswer": "Creating a copy with `sub = (' ' + sub).slice(1)` or `sub = String.fromCharCode(...sub.split('').map(c => c.charCodeAt(0)))`",
        "explanation": "Concatenating or reconstructing the string forces V8 to allocate a fresh contiguous buffer, severing the pointer link to the huge parent string."
      },
      {
        "question": "What is a 'ThinString' in V8?",
        "codeSnippet": "// V8 internal string transition",
        "language": "javascript",
        "options": [
          "A string containing fewer than 5 characters",
          "A string converted to 1-byte ASCII",
          "A pointer that redirects an existing string to an internalized string in the string table, eliminating duplicate memory allocations",
          "A string on the stack"
        ],
        "correctAnswer": "A pointer that redirects an existing string to an internalized string in the string table, eliminating duplicate memory allocations",
        "explanation": "When a string is internalized into V8's string table, the original string object is mutated into a `ThinString` pointing to the deduplicated canonical string."
      },
      {
        "question": "What is an 'ExternalString' in Node.js/V8?",
        "codeSnippet": "// Node.js native addon buffer sharing",
        "language": "javascript",
        "options": [
          "A string fetched via HTTP fetch",
          "A string stored in an external file",
          "A string passed via URL query parameter",
          "A JavaScript string whose character data is stored outside the V8 heap in native C++ memory"
        ],
        "correctAnswer": "A JavaScript string whose character data is stored outside the V8 heap in native C++ memory",
        "explanation": "External strings reference character arrays allocated in C++ memory outside the V8 heap, avoiding copying overhead when interacting with native addons."
      }
    ]
  },
  {
    "title": "JavaScript: Exotic Objects & Internal Slots",
    "description": "Inspect spec internal slots `[[Prototype]]`, `[[Extensible]]`, `[[Call]]`, and `[[Construct]]`.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Compilers"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the difference between an object with a `[[Call]]` internal slot and one with a `[[Construct]]` slot?",
        "codeSnippet": "// Callable vs Constructible",
        "language": "javascript",
        "options": [
          "An object with `[[Call]]` can be invoked as a function (`fn()`); `[[Construct]]` allows invocation with `new fn()` (arrow functions lack `[[Construct]]`)",
          "`[[Call]]` is for async functions only",
          "`[[Construct]]` is only for arrays",
          "There is no difference in the spec"
        ],
        "correctAnswer": "An object with `[[Call]]` can be invoked as a function (`fn()`); `[[Construct]]` allows invocation with `new fn()` (arrow functions lack `[[Construct]]`)",
        "explanation": "Arrow functions and method shorthands have `[[Call]]` but lack `[[Construct]]`. Standard function declarations possess both slots."
      },
      {
        "question": "Why does `typeof document.all` return `'undefined'` in web browsers despite being a truthy object in some checks?",
        "codeSnippet": "console.log(typeof document.all, document.all ? true : false);",
        "language": "javascript",
        "options": [
          "It is a bug in the Chrome renderer",
          "It is a legacy exotic object specified with the `[[IsHTMLDDA]]` internal slot to maintain backwards compatibility with legacy IE detection code",
          "It is a WebAssembly proxy",
          "Because it is an iframe document"
        ],
        "correctAnswer": "It is a legacy exotic object specified with the `[[IsHTMLDDA]]` internal slot to maintain backwards compatibility with legacy IE detection code",
        "explanation": "To prevent old websites from treating modern browsers as Internet Explorer (`if (document.all)`), the spec defines an exotic `[[IsHTMLDDA]]` slot that forces `typeof` to return `'undefined'`."
      },
      {
        "question": "What determines whether an object is considered 'Callable' in ECMAScript?",
        "codeSnippet": "// Specification check: IsCallable(argument)",
        "language": "javascript",
        "options": [
          "Having a `.call()` method on its prototype",
          "Being an instance of `Function`",
          "The presence of a `[[Call]]` internal method on the object",
          "Having a `.length` property"
        ],
        "correctAnswer": "The presence of a `[[Call]]` internal method on the object",
        "explanation": "The specification abstract operation `IsCallable(argument)` checks if the argument is an object with a `[[Call]]` internal method."
      },
      {
        "question": "What is the `[[ParameterMap]]` internal slot in exotic arguments objects?",
        "codeSnippet": "function test(a) { arguments[0] = 99; }",
        "language": "javascript",
        "options": [
          "A map of parameter types",
          "A TypeScript type checker table",
          "A memory buffer for rest arguments",
          "An internal mapping object that links array-indexed properties of the legacy `arguments` object to named function parameter variables"
        ],
        "correctAnswer": "An internal mapping object that links array-indexed properties of the legacy `arguments` object to named function parameter variables",
        "explanation": "In non-strict mode without default parameters, the exotic arguments object uses `[[ParameterMap]]` to synchronize indices with formal parameter bindings."
      },
      {
        "question": "What internal slot stores the actual primitive value wrapped inside a `Number` or `Boolean` object?",
        "codeSnippet": "const numObj = new Number(42);",
        "language": "javascript",
        "options": [
          "`[[NumberData]]` (or `[[BooleanData]]` / `[[StringData]]`)",
          "`[[PrimitiveValue]]`",
          "`[[Value]]`",
          "`[[Data]]`"
        ],
        "correctAnswer": "`[[NumberData]]` (or `[[BooleanData]]` / `[[StringData]]`)",
        "explanation": "The ECMAScript specification states that wrapper instances store their underlying primitive data in `[[NumberData]]`, `[[StringData]]`, `[[BooleanData]]`, or `[[SymbolData]]`."
      }
    ]
  },
  {
    "title": "JavaScript: Finalizer Queues & Resurrection",
    "description": "Analyze object resurrection risks, cleanup callbacks, and non-deterministic destruction.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Memory"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Why did the ECMAScript committee disallow access to the target object itself inside `FinalizationRegistry` callbacks?",
        "codeSnippet": "const registry = new FinalizationRegistry((heldValue) => {\n  // Target object is NOT passed here!\n});",
        "language": "javascript",
        "options": [
          "Because target objects are encrypted after death",
          "To prevent 'Object Resurrection', where an already-dead object re-attaches itself to an active global reference inside the finalizer",
          "To keep memory usage under 1MB",
          "Target objects cannot be represented in callbacks"
        ],
        "correctAnswer": "To prevent 'Object Resurrection', where an already-dead object re-attaches itself to an active global reference inside the finalizer",
        "explanation": "In languages like Java or C#, finalizers that receive the target can 'resurrect' the object by assigning `globalVar = this`. JS prevents this by passing only unlinked `heldValue`."
      },
      {
        "question": "Can an object that is only referenced by a `WeakRef` be collected during an active synchronous function execution?",
        "codeSnippet": "const ref = new WeakRef(target);\n// Can target die here before function returns?",
        "language": "javascript",
        "options": [
          "Yes, GC can collect objects at any nanosecond",
          "Only in Node.js",
          "No, objects accessed or dereferenced in a synchronous turn are kept alive at least until the end of the current microtask checkpoint",
          "Yes, if memory exceeds 500MB"
        ],
        "correctAnswer": "No, objects accessed or dereferenced in a synchronous turn are kept alive at least until the end of the current microtask checkpoint",
        "explanation": "The ECMAScript specification introduces the concept of an 'Execution Turn': an object returned by `deref()` is protected from collection until the turn finishes."
      },
      {
        "question": "What happens if a `FinalizationRegistry` cleanup callback throws an unhandled error?",
        "codeSnippet": "const reg = new FinalizationRegistry(() => { throw new Error('Cleanup failed'); });",
        "language": "javascript",
        "options": [
          "The process immediately aborts with SIGSEGV",
          "All registered finalizers are cancelled permanently",
          "The garbage collector reverts its sweep",
          "The error is reported as an unhandled exception or host-defined error event without terminating the entire engine"
        ],
        "correctAnswer": "The error is reported as an unhandled exception or host-defined error event without terminating the entire engine",
        "explanation": "An error in a finalizer does not abort the engine's GC loop. It is dispatched to the host environment as an unhandled asynchronous error."
      },
      {
        "question": "Why should `heldValue` in a `FinalizationRegistry` NOT contain a strong reference back to the target object?",
        "codeSnippet": "registry.register(target, { target }); // Anti-pattern!",
        "language": "javascript",
        "options": [
          "The registry holds a strong reference to `heldValue`, which would keep `target` alive forever and prevent GC from ever running the finalizer",
          "It throws a SyntaxError",
          "It causes an immediate stack overflow",
          "Circular references are not allowed in registries"
        ],
        "correctAnswer": "The registry holds a strong reference to `heldValue`, which would keep `target` alive forever and prevent GC from ever running the finalizer",
        "explanation": "The registry maintains a strong reference to `heldValue`. If `heldValue` points back to `target`, `target` can never be collected, creating a permanent leak."
      },
      {
        "question": "What is the recommended design pattern for cleaning up native resources associated with a JavaScript wrapper object?",
        "codeSnippet": "// Native cleanup architecture",
        "language": "javascript",
        "options": [
          "Pass the entire DOM element",
          "Pass an unlinked numeric ID or handle as `heldValue` to `FinalizationRegistry`, which tells native C++ code to free the handle",
          "Rely on `window.onunload`",
          "Call `delete target`"
        ],
        "correctAnswer": "Pass an unlinked numeric ID or handle as `heldValue` to `FinalizationRegistry`, which tells native C++ code to free the handle",
        "explanation": "Passing an independent primitive ID (e.g. `resourceId = 42`) in `heldValue` allows the finalizer to clean up native resources without holding the JS wrapper alive."
      }
    ]
  },
  {
    "title": "JavaScript: Cross-Realm Object Membranes",
    "description": "Build secure execution membranes, proxy virtualization, and cross-iframe isolation.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Security"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is an 'Object Membrane' in JavaScript security systems?",
        "codeSnippet": "// Security membrane pattern",
        "language": "javascript",
        "options": [
          "A firewall rule in Node.js",
          "A CSS overlay that disables clicks",
          "A bidirectional barrier of Proxies that wraps all objects, functions, arguments, and return values passing between two execution realms",
          "A WebAssembly encryption layer"
        ],
        "correctAnswer": "A bidirectional barrier of Proxies that wraps all objects, functions, arguments, and return values passing between two execution realms",
        "explanation": "A membrane completely isolates two object graphs: any object passed across the boundary is automatically wrapped in a proxy that reflects calls safely."
      },
      {
        "question": "Why does `iframe.contentWindow.Array !== window.Array` in multi-frame browser environments?",
        "codeSnippet": "const iframe = document.createElement('iframe');\ndocument.body.appendChild(iframe);\nconsole.log(iframe.contentWindow.Array === window.Array);",
        "language": "javascript",
        "options": [
          "Arrays in iframes are WebAssembly modules",
          "It is a cross-origin security restriction",
          "Because iframe code is loaded over HTTPS",
          "Each browser window/iframe represents a distinct ECMAScript Realm with its own set of built-in intrinsic objects and prototypes"
        ],
        "correctAnswer": "Each browser window/iframe represents a distinct ECMAScript Realm with its own set of built-in intrinsic objects and prototypes",
        "explanation": "Every realm has its own unique global object and distinct standard library instances (`Object.prototype`, `Array.prototype`, `Error.prototype`)."
      },
      {
        "question": "Why does `instanceof Array` fail when testing an array created inside an iframe against the host's `Array` constructor?",
        "codeSnippet": "const iframeArr = iframe.contentWindow.eval('[1, 2, 3]');\nconsole.log(iframeArr instanceof Array);",
        "language": "javascript",
        "options": [
          "Because `iframeArr` inherits from the iframe's `Array.prototype`, not the host's `Array.prototype`",
          "`instanceof` is disabled across iframes",
          "Arrays in iframes cannot be accessed by the parent window",
          "The array is converted to a string"
        ],
        "correctAnswer": "Because `iframeArr` inherits from the iframe's `Array.prototype`, not the host's `Array.prototype`",
        "explanation": "`instanceof` tests prototype identity. Since the iframe's `Array.prototype` does not equal `window.Array.prototype`, the check evaluates to `false`. Use `Array.isArray()`."
      },
      {
        "question": "How does Salesforce Locker Service or Google Caja use membranes for sandboxing?",
        "codeSnippet": "// Enterprise membrane sandboxing",
        "language": "javascript",
        "options": [
          "To transpile code into Python",
          "To intercept and sanitize untrusted component access to sensitive DOM APIs and global window properties without virtualization virtual machines",
          "To speed up CSS rendering",
          "To compress network packets"
        ],
        "correctAnswer": "To intercept and sanitize untrusted component access to sensitive DOM APIs and global window properties without virtualization virtual machines",
        "explanation": "Membranes wrap DOM objects with proxies, restricting untrusted components from accessing unauthorized nodes or escaping the sandbox."
      },
      {
        "question": "What happens if a membrane fails to unwrap a proxy that is passed back into its own originating realm?",
        "codeSnippet": "// Membrane proxy unwrapping requirement",
        "language": "javascript",
        "options": [
          "The browser crashes with a fatal error",
          "The object is deleted",
          "Proxy-over-proxy accumulation: The object gets wrapped in multiple layers of proxies, causing memory bloat and degraded performance",
          "The prototype chain resets to null"
        ],
        "correctAnswer": "Proxy-over-proxy accumulation: The object gets wrapped in multiple layers of proxies, causing memory bloat and degraded performance",
        "explanation": "Membranes must maintain a WeakMap of wrapped instances: if an object crosses back to its home realm, it must be unwrapped to prevent infinite proxy wrapping."
      }
    ]
  },
  {
    "title": "JavaScript: Continuation-Passing Style (CPS) & Trampolines",
    "description": "Implement CPS transformations, stack unwinding trampolines, and thunks.",
    "difficulty": "very hard",
    "tags": [
      "JavaScript",
      "Compilers",
      "Functional Programming"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is Continuation-Passing Style (CPS) in functional programming?",
        "codeSnippet": "function addCPS(a, b, k) {\n  k(a + b); // k is the continuation\n}",
        "language": "javascript",
        "options": [
          "A style that uses only `const` and `let`",
          "A design pattern for database transactions",
          "A method for serializing functions to JSON",
          "A style of programming where functions do not return values directly, but instead pass control to an explicit continuation callback"
        ],
        "correctAnswer": "A style of programming where functions do not return values directly, but instead pass control to an explicit continuation callback",
        "explanation": "In CPS, every function receives an extra callback argument representing the remainder of the computation (the 'continuation'), eliminating explicit `return`."
      },
      {
        "question": "What is a 'Thunk' in lazy evaluation and trampoline architectures?",
        "codeSnippet": "const thunk = () => computeHeavyValue(x);",
        "language": "javascript",
        "options": [
          "A nullary function (zero-argument closure) that delays the evaluation of an expression until its value is explicitly needed",
          "A corrupted memory address",
          "An HTTP header used in caching",
          "A typed array of 64-bit integers"
        ],
        "correctAnswer": "A nullary function (zero-argument closure) that delays the evaluation of an expression until its value is explicitly needed",
        "explanation": "A thunk wraps an expression in a `() => expr` function, postponing computation until the thunk is invoked."
      },
      {
        "question": "How does a Trampoline function prevent Stack Overflow errors during deeply nested recursion?",
        "codeSnippet": "function trampoline(fn) {\n  return (...args) => {\n    let result = fn(...args);\n    while (typeof result === 'function') {\n      result = result();\n    }\n    return result;\n  };\n}",
        "language": "javascript",
        "options": [
          "It increases the V8 call stack size to 1GB",
          "It executes recursive steps iteratively in a `while` loop: each step returns a thunk that is invoked after the previous frame pops off the stack",
          "It compiles the code to C++ on the fly",
          "It runs each step on a new Web Worker"
        ],
        "correctAnswer": "It executes recursive steps iteratively in a `while` loop: each step returns a thunk that is invoked after the previous frame pops off the stack",
        "explanation": "Instead of calling the next step directly on the stack, each step returns a thunk. The `while` loop unwinds the stack frame and executes the thunk, keeping stack depth at 1."
      },
      {
        "question": "What is the stack depth of a trampolined factorial function computing `factorial(100000)`?",
        "codeSnippet": "const safeFactorial = trampoline(factCPS);\nsafeFactorial(100000);",
        "language": "javascript",
        "options": [
          "100,000 stack frames",
          "50,000 stack frames",
          "Constant stack depth: $O(1)$ stack frames throughout the entire execution",
          "It throws a RangeError: Maximum call stack size exceeded"
        ],
        "correctAnswer": "Constant stack depth: $O(1)$ stack frames throughout the entire execution",
        "explanation": "Because each step returns to the trampoline loop before the next step runs, the call stack never exceeds 1 or 2 frames, eliminating stack overflow risks."
      },
      {
        "question": "What is a key compilation phase in compilers (like Babel or Kotlin/JS) that uses CPS transformations?",
        "codeSnippet": "// Generator and Async/Await lowering",
        "language": "javascript",
        "options": [
          "Minifying variable names",
          "Generating source maps",
          "Removing unused CSS",
          "Lowering ES6 generators and `async/await` state machines into plain ES5 `switch/case` state machines and continuation loops"
        ],
        "correctAnswer": "Lowering ES6 generators and `async/await` state machines into plain ES5 `switch/case` state machines and continuation loops",
        "explanation": "Babel's regenerator-runtime transforms asynchronous pausing (`await`) and generators (`yield`) into stateful continuation machines that run on older ES5 engines."
      }
    ]
  }
];
