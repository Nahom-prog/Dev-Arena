export const nodejsEasyQuizzes = [
  {
    "title": "Node.js: CommonJS vs ESM Modules",
    "description": "require vs import, module.exports, and module resolution rules.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Modules"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How do you export a function named `calculate` in standard CommonJS format?",
        "codeSnippet": "// CommonJS export\nfunction calculate() { return 42; }",
        "options": [
          "module.exports = { calculate };",
          "export default calculate;",
          "exports.calculate() = calculate;",
          "send { calculate };"
        ],
        "correctAnswer": "module.exports = { calculate };",
        "explanation": "In CommonJS (the traditional Node.js module system), modules export values by attaching them to `module.exports` or `exports`."
      },
      {
        "question": "How do you enable ECMAScript Modules (ESM) syntax (`import`/`export`) in a Node.js project?",
        "options": [
          "Pass `--enable-es6` to the `node` command line",
          "Add `\"type\": \"module\"` to `package.json` or use the `.mjs` file extension",
          "Install the `esm-loader` npm package globally",
          "Declare `'use esm';` at the top of every file"
        ],
        "correctAnswer": "Add `\"type\": \"module\"` to `package.json` or use the `.mjs` file extension",
        "explanation": "Setting `\"type\": \"module\"` in package.json treats all `.js` files in that package as ES modules, or you can rename files to `.mjs`."
      },
      {
        "question": "Why are `__dirname` and `__filename` undefined by default in ES modules in Node.js?",
        "options": [
          "They were removed due to security bugs in Linux",
          "V8 disables filesystem variables in strict mode",
          "ES modules are standardized across environments (browsers and runtimes) and lack CommonJS module wrapper variables; use `import.meta.url` instead",
          "They only exist in TypeScript files"
        ],
        "correctAnswer": "ES modules are standardized across environments (browsers and runtimes) and lack CommonJS module wrapper variables; use `import.meta.url` instead",
        "explanation": "`__dirname` is specific to CommonJS module wrappers. In ESM, use `fileURLToPath(import.meta.url)` to obtain paths."
      },
      {
        "question": "What is the result of importing a CommonJS module from an ES Module in modern Node.js?",
        "codeSnippet": "// In ESM: index.mjs\nimport lodash from 'lodash';",
        "options": [
          "Node.js throws a fatal SyntaxError unless compiled by Babel",
          "The file is converted to JSON automatically",
          "The process exits with code 1 immediately",
          "Node.js supports importing CommonJS default exports natively into ES modules"
        ],
        "correctAnswer": "Node.js supports importing CommonJS default exports natively into ES modules",
        "explanation": "Node.js allows ESM files to import CommonJS packages seamlessly as default imports."
      },
      {
        "question": "How do you synchronously require a JSON file in CommonJS?",
        "codeSnippet": "const config = require('./config.json');",
        "options": [
          "`require('./config.json')` automatically parses the JSON file and returns a JavaScript object",
          "It returns a raw Buffer that must be parsed with `JSON.parse`",
          "It returns a Promise resolving to JSON",
          "It throws an error because require only loads `.js` files"
        ],
        "correctAnswer": "`require('./config.json')` automatically parses the JSON file and returns a JavaScript object",
        "explanation": "Node's `require()` has built-in extension handlers for `.json`, automatically reading and parsing it synchronously."
      }
    ]
  },
  {
    "title": "Node.js: The global and process Objects",
    "description": "Command line arguments, process.env, process.cwd(), and global scoping.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Core"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does `process.argv` contain when running `node app.js --port 8080`?",
        "options": [
          "An object with parsed flags like `{ port: 8080 }`",
          "An array of strings where the first element is the node executable path, second is the script path, followed by additional CLI arguments",
          "Only the user arguments `['--port', '8080']`",
          "A string containing the raw bash command"
        ],
        "correctAnswer": "An array of strings where the first element is the node executable path, second is the script path, followed by additional CLI arguments",
        "explanation": "`process.argv[0]` is the Node path, `process.argv[1]` is the executed file path, and user flags start at index `2`."
      },
      {
        "question": "What is the difference between `process.cwd()` and `__dirname`?",
        "options": [
          "`process.cwd()` is only for Windows; `__dirname` is for Unix",
          "They are exact synonyms and always return the same string",
          "`process.cwd()` returns the current working directory from which the node command was executed; `__dirname` is the directory where the current script file resides",
          "`__dirname` is dynamic while `process.cwd()` is constant"
        ],
        "correctAnswer": "`process.cwd()` returns the current working directory from which the node command was executed; `__dirname` is the directory where the current script file resides",
        "explanation": "Running `node src/index.js` from the project root yields the project root for `process.cwd()`, but `/project/src` for `__dirname`."
      },
      {
        "question": "What type are all values retrieved from `process.env` in Node.js?",
        "codeSnippet": "process.env.PORT = 5000;\nconsole.log(typeof process.env.PORT);",
        "options": [
          "`number`",
          "`boolean`",
          "`object`",
          "`string` (environment variables are always coerced to strings or undefined)"
        ],
        "correctAnswer": "`string` (environment variables are always coerced to strings or undefined)",
        "explanation": "Environment variables in the operating system are strings. Setting a number coerces it into a string (`\"5000\"`)."
      },
      {
        "question": "How do you terminate a Node.js application process immediately with an exit code indicating failure?",
        "codeSnippet": "process.exit(1);",
        "options": [
          "`process.exit(1)`",
          "`process.terminate()`",
          "`process.kill('FAIL')`",
          "`process.abort(0)`"
        ],
        "correctAnswer": "`process.exit(1)`",
        "explanation": "`process.exit(code)` instructs Node to terminate the process; `0` indicates success, and non-zero (like `1`) indicates failure."
      },
      {
        "question": "What is the Node.js equivalent of the browser's top-level `window` object?",
        "options": [
          "`process`",
          "`global` (or `globalThis`)",
          "`document`",
          "`root`"
        ],
        "correctAnswer": "`global` (or `globalThis`)",
        "explanation": "`global` is the top-level global namespace in Node.js, accessible everywhere without an import."
      }
    ]
  },
  {
    "title": "Node.js: Path Module & File Paths",
    "description": "join vs resolve, file extensions, dirname, and cross-platform separators.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Core"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the key difference between `path.join()` and `path.resolve()`?",
        "codeSnippet": "path.join('/a', 'b', 'c');\npath.resolve('a', 'b', 'c');",
        "options": [
          "`path.resolve` checks if the file physically exists on disk",
          "`path.join` only works on Windows; `path.resolve` only on Linux",
          "`path.join` concatenates path segments using platform separators; `path.resolve` resolves segments into an absolute path prepending the current working directory if needed",
          "There is no difference"
        ],
        "correctAnswer": "`path.join` concatenates path segments using platform separators; `path.resolve` resolves segments into an absolute path prepending the current working directory if needed",
        "explanation": "`path.resolve` acts like a sequence of `cd` commands, always returning an absolute path."
      },
      {
        "question": "How does the `path` module ensure cross-platform compatibility across Windows and POSIX systems?",
        "options": [
          "It converts all backslashes to colons",
          "It renames hard drives to mount points",
          "It runs all path calculations in a virtual Linux container",
          "It uses the operating system's native path separator (`\\` on Windows, `/` on Linux/macOS) via `path.sep` automatically"
        ],
        "correctAnswer": "It uses the operating system's native path separator (`\\` on Windows, `/` on Linux/macOS) via `path.sep` automatically",
        "explanation": "Using `path.join()` or `path.resolve()` ensures you don't hardcode slashes, avoiding broken paths when running on Windows vs Linux."
      },
      {
        "question": "What does `path.extname('server/config.prod.json')` return?",
        "codeSnippet": "const ext = path.extname('server/config.prod.json');",
        "options": [
          "`.json`",
          "`json` (without dot)",
          "`.prod.json`",
          "`config.prod.json`"
        ],
        "correctAnswer": "`.json`",
        "explanation": "`path.extname()` returns the extension of the path, from the last occurrence of the `.` to the end of the string."
      },
      {
        "question": "What does `path.basename('/users/test/index.html', '.html')` return?",
        "codeSnippet": "const name = path.basename('/users/test/index.html', '.html');",
        "options": [
          "`index.html`",
          "`index`",
          "`/users/test`",
          "`html`"
        ],
        "correctAnswer": "`index`",
        "explanation": "Passing an optional second argument removes that extension from the returned file basename."
      },
      {
        "question": "How can you parse a path into an object with `{ root, dir, base, ext, name }`?",
        "options": [
          "`path.split(filePath)`",
          "`path.decompose(filePath)`",
          "`path.parse(filePath)`",
          "`path.toObject(filePath)`"
        ],
        "correctAnswer": "`path.parse(filePath)`",
        "explanation": "`path.parse()` returns an object whose properties represent the significant elements of the path."
      }
    ]
  },
  {
    "title": "Node.js: fs Module & File Operations",
    "description": "Synchronous vs asynchronous methods, fs/promises, and file manipulation.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Filesystem"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the recommended modern way to perform asynchronous file reads using promises in Node.js?",
        "codeSnippet": "import fs from 'fs/promises';\nconst data = await fs.readFile('data.txt', 'utf8');",
        "options": [
          "Use `fs.readFileSync(...)` inside a Promise constructor",
          "Use `fs.readFileAsync(...)` from the default `fs` module",
          "Wrap `fs.open` in a generator",
          "Import from `'fs/promises'` and use `await fs.readFile(...)`"
        ],
        "correctAnswer": "Import from `'fs/promises'` and use `await fs.readFile(...)`",
        "explanation": "Node.js provides promise-based filesystem methods directly under `'fs/promises'`, making `async/await` idiomatic."
      },
      {
        "question": "What does `fs.readFile('file.txt')` return if no encoding parameter (like `'utf8'`) is provided?",
        "options": [
          "A raw binary `Buffer` object",
          "A plain JavaScript string",
          "An array of characters",
          "`null`"
        ],
        "correctAnswer": "A raw binary `Buffer` object",
        "explanation": "Without an encoding specified, Node's `readFile` returns raw bytes wrapped in a `Buffer` instance."
      },
      {
        "question": "Why should synchronous file methods (e.g. `fs.readFileSync`) generally be avoided in production HTTP servers?",
        "options": [
          "They throw syntax errors when called inside express routes",
          "They block the Node.js single-threaded event loop, preventing the server from handling any other incoming requests until the disk I/O completes",
          "They delete the file after reading",
          "They corrupt the V8 heap"
        ],
        "correctAnswer": "They block the Node.js single-threaded event loop, preventing the server from handling any other incoming requests until the disk I/O completes",
        "explanation": "Synchronous I/O stops the entire Node.js main thread dead in its tracks, degrading throughput for all concurrent users."
      },
      {
        "question": "How do you create a nested directory recursively (e.g. `logs/2026/09/`) if parent directories don't exist?",
        "codeSnippet": "await fs.mkdir('logs/2026/09', { recursive: true });",
        "options": [
          "Call `fs.mkdir` 3 times in a loop",
          "Run `child_process.exec('mkdir -p')`",
          "Pass the `{ recursive: true }` option to `fs.mkdir`",
          "Use `fs.createDirectoryTree()`"
        ],
        "correctAnswer": "Pass the `{ recursive: true }` option to `fs.mkdir`",
        "explanation": "`{ recursive: true }` creates parent directories automatically without erroring if they already exist or are missing."
      },
      {
        "question": "How do you safely check if a file exists before reading in modern Node.js?",
        "options": [
          "Call `fs.exists()` (deprecated)",
          "Inspect `process.files` array",
          "Check `os.fileList`",
          "Attempt to open or read the file directly in a `try...catch` block (or check with `fs.access`), rather than checking `fs.existsSync` first to avoid race conditions (TOCTOU)"
        ],
        "correctAnswer": "Attempt to open or read the file directly in a `try...catch` block (or check with `fs.access`), rather than checking `fs.existsSync` first to avoid race conditions (TOCTOU)",
        "explanation": "Checking existence before reading creates a Time-of-Check to Time-of-Use race condition. Node docs recommend attempting the read/open and handling `ENOENT`."
      }
    ]
  },
  {
    "title": "Node.js: Buffer Fundamentals & Binary Data",
    "description": "Buffer allocation, encoding transformations (hex, base64, utf8), and byte lengths.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Buffers"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is a `Buffer` in Node.js?",
        "options": [
          "A global class representing a fixed-length sequence of raw binary bytes allocated outside the V8 JavaScript heap",
          "A temporary array stored in browser cookies",
          "A string compression algorithm",
          "A thread pool for async functions"
        ],
        "correctAnswer": "A global class representing a fixed-length sequence of raw binary bytes allocated outside the V8 JavaScript heap",
        "explanation": "Buffers store raw binary data in memory allocated directly by the C++ layer outside V8's garbage-collected heap."
      },
      {
        "question": "Why was `new Buffer(size)` deprecated in favor of `Buffer.alloc(size)` and `Buffer.from()`?",
        "options": [
          "It caused syntax errors in ES6",
          "`new Buffer(100)` allocated uninitialized memory that could expose sensitive memory contents (passwords, tokens) previously residing in RAM",
          "It was limited to 1 kilobyte",
          "Browsers refused to run it"
        ],
        "correctAnswer": "`new Buffer(100)` allocated uninitialized memory that could expose sensitive memory contents (passwords, tokens) previously residing in RAM",
        "explanation": "`new Buffer(size)` did not zero-fill memory by default, creating severe security vulnerabilities. `Buffer.alloc(size)` always zeroes memory safely."
      },
      {
        "question": "How do you encode a string into Base64 format using Node.js Buffers?",
        "codeSnippet": "const b64 = Buffer.from('Hello World').toString('base64');",
        "options": [
          "`Buffer.toBase64(str)`",
          "`btoa(Buffer(str))`",
          "`Buffer.from(str).toString('base64')`",
          "`str.encodeBase64()`"
        ],
        "correctAnswer": "`Buffer.from(str).toString('base64')`",
        "explanation": "`Buffer.from(str)` creates a buffer from a string, and `.toString('base64')` converts those bytes into base64."
      },
      {
        "question": "Why might `Buffer.byteLength('🚀')` be greater than `'🚀'.length`?",
        "options": [
          "Buffer adds a 2-byte header to every emoji",
          "The string length is miscalculated by V8",
          "Emojis are compressed by Buffer",
          "`'🚀'.length` measures UTF-16 code units (2), while `Buffer.byteLength` measures the actual bytes required in UTF-8 encoding (4 bytes)"
        ],
        "correctAnswer": "`'🚀'.length` measures UTF-16 code units (2), while `Buffer.byteLength` measures the actual bytes required in UTF-8 encoding (4 bytes)",
        "explanation": "JavaScript string length counts UTF-16 code units; UTF-8 encodes emojis and multi-byte characters into 3 or 4 bytes."
      },
      {
        "question": "How do you concatenate an array of Buffers into a single Buffer?",
        "codeSnippet": "const total = Buffer.concat([buf1, buf2, buf3]);",
        "options": [
          "`Buffer.concat([buf1, buf2, buf3])`",
          "`[buf1, buf2].join('')`",
          "`Buffer.merge(buf1, buf2)`",
          "`buf1.append(buf2)`"
        ],
        "correctAnswer": "`Buffer.concat([buf1, buf2, buf3])`",
        "explanation": "`Buffer.concat(list, [totalLength])` combines multiple buffer instances into a single contiguous buffer."
      }
    ]
  },
  {
    "title": "Node.js: EventEmitter Basics",
    "description": "Event-driven architecture, listener registration, once, and removeListener.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Events"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What core module provides the `EventEmitter` class in Node.js?",
        "codeSnippet": "import { EventEmitter } from 'events';",
        "options": [
          "`stream`",
          "`events`",
          "`process`",
          "`emitter`"
        ],
        "correctAnswer": "`events`",
        "explanation": "The `EventEmitter` class is exported by the built-in `'events'` module in Node.js core."
      },
      {
        "question": "How do you register an event listener that fires only once and then automatically removes itself?",
        "codeSnippet": "emitter.once('login', user => console.log('Welcome', user));",
        "options": [
          "`emitter.onSingle(eventName, listener)`",
          "`emitter.first(eventName, listener)`",
          "`emitter.once(eventName, listener)`",
          "`emitter.on(eventName, { once: true })`"
        ],
        "correctAnswer": "`emitter.once(eventName, listener)`",
        "explanation": "`emitter.once()` registers a one-time listener that is discarded immediately after its first invocation."
      },
      {
        "question": "What happens if an `EventEmitter` emits an `'error'` event and no listener has been registered for `'error'`?",
        "codeSnippet": "const emitter = new EventEmitter();\nemitter.emit('error', new Error('Something failed'));",
        "options": [
          "The error is silently logged to the console",
          "The error is stored in `process.lastError`",
          "Node.js ignores the event",
          "Node.js throws the error, prints a stack trace, and crashes the entire application process"
        ],
        "correctAnswer": "Node.js throws the error, prints a stack trace, and crashes the entire application process",
        "explanation": "In Node.js, an unhandled `'error'` event causes the process to crash with an unhandled exception."
      },
      {
        "question": "Are EventEmitter listeners invoked synchronously or asynchronously by default when `emit()` is called?",
        "codeSnippet": "emitter.on('ping', () => console.log('pong'));\nemitter.emit('ping');\nconsole.log('after');",
        "options": [
          "Synchronously in the order they were registered: 'pong' logs before 'after'",
          "Asynchronously on the next event loop tick: 'after' logs before 'pong'",
          "In parallel worker threads",
          "Randomly depending on system load"
        ],
        "correctAnswer": "Synchronously in the order they were registered: 'pong' logs before 'after'",
        "explanation": "`emit()` iterates through the registered listener functions and calls each one synchronously on the current stack."
      },
      {
        "question": "What is the default maximum number of listeners that can be registered for a single event before Node logs a warning?",
        "options": [
          "100",
          "10 (to help detect memory leaks)",
          "1",
          "Unlimited"
        ],
        "correctAnswer": "10 (to help detect memory leaks)",
        "explanation": "By default, registering more than 10 listeners triggers a memory leak warning. You can change this using `setMaxListeners()`."
      }
    ]
  },
  {
    "title": "Node.js: HTTP Server Fundamentals",
    "description": "http.createServer, request parsing, headers, response writeHead, and status codes.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "HTTP"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How do you create a basic HTTP server using Node's core `http` module?",
        "codeSnippet": "import http from 'http';\nconst server = http.createServer((req, res) => {\n  res.end('OK');\n});\nserver.listen(3000);",
        "options": [
          "`http.serve(3000, handler)`",
          "`new http.Server().start(3000)`",
          "`http.createServer((req, res) => { ... })`",
          "`http.listen(3000)`"
        ],
        "correctAnswer": "`http.createServer((req, res) => { ... })`",
        "explanation": "`http.createServer()` accepts a request listener callback receiving `(req, res)` and returns a `Server` instance."
      },
      {
        "question": "What class is the incoming request object (`req`) an instance of in `http.createServer`?",
        "options": [
          "`http.ClientRequest`",
          "`http.ResponseStream`",
          "`express.Request`",
          "`http.IncomingMessage` (which is a Readable stream)"
        ],
        "correctAnswer": "`http.IncomingMessage` (which is a Readable stream)",
        "explanation": "`req` is an instance of `http.IncomingMessage`, implementing the stream.Readable interface to read the request body."
      },
      {
        "question": "How do you set the HTTP response status code to 201 and send a JSON header in raw Node.js HTTP?",
        "codeSnippet": "res.writeHead(201, { 'Content-Type': 'application/json' });\nres.end(JSON.stringify({ created: true }));",
        "options": [
          "`res.writeHead(201, { 'Content-Type': 'application/json' })`",
          "`res.status(201).json()`",
          "`res.setHeaderCode(201, 'application/json')`",
          "`res.statusCode = 201; res.type = 'json'`"
        ],
        "correctAnswer": "`res.writeHead(201, { 'Content-Type': 'application/json' })`",
        "explanation": "`res.writeHead(statusCode, [statusMessage], [headers])` sends the response HTTP status and headers in one call."
      },
      {
        "question": "What happens if you do NOT call `res.end()` on the response object in an HTTP request handler?",
        "options": [
          "Node.js ends the response automatically after 10ms",
          "The client's HTTP request hangs indefinitely until the client or server times out",
          "The server restarts",
          "A 404 response is sent immediately"
        ],
        "correctAnswer": "The client's HTTP request hangs indefinitely until the client or server times out",
        "explanation": "Node.js streams HTTP responses. You must explicitly call `res.end()` to signal that all response data has been sent."
      },
      {
        "question": "Where are incoming HTTP request headers stored on `req`?",
        "codeSnippet": "const auth = req.headers['authorization'];",
        "options": [
          "On `req.headerList`",
          "In `process.headers`",
          "On `req.headers` as an object with all header names lowercased",
          "On `req.url.headers`"
        ],
        "correctAnswer": "On `req.headers` as an object with all header names lowercased",
        "explanation": "Node.js automatically lowercases all incoming header keys on `req.headers` for consistent, case-insensitive access."
      }
    ]
  },
  {
    "title": "Node.js: URL & Query String Parsing",
    "description": "Standard WHATWG URL API, URLSearchParams, and legacy url.parse deprecation.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Core"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the modern, standardized way to parse a URL string in Node.js?",
        "codeSnippet": "const myUrl = new URL('https://api.example.com/users?page=2');",
        "options": [
          "Use `url.parse(urlString)` (legacy API)",
          "Use `JSON.parse(urlString)`",
          "Split the string on `/` manually",
          "Use the global `new URL(urlString, [baseURL])` WHATWG URL API"
        ],
        "correctAnswer": "Use the global `new URL(urlString, [baseURL])` WHATWG URL API",
        "explanation": "Node.js implements the standard WHATWG URL API globally (`new URL()`), deprecating the legacy `url.parse()`."
      },
      {
        "question": "How do you read the value of a query parameter `?filter=active` using `URLSearchParams`?",
        "codeSnippet": "const myUrl = new URL('https://example.com/items?filter=active');\nconst filter = myUrl.searchParams.get('filter');",
        "options": [
          "`myUrl.searchParams.get('filter')`",
          "`myUrl.query.filter`",
          "`myUrl.params['filter']`",
          "`myUrl.search['filter']`"
        ],
        "correctAnswer": "`myUrl.searchParams.get('filter')`",
        "explanation": "`myUrl.searchParams` is a `URLSearchParams` instance with methods like `.get()`, `.has()`, `.set()`, and `.getAll()`."
      },
      {
        "question": "Why does `new URL('/api/users', 'http://localhost:3000')` require a base URL as the second argument?",
        "options": [
          "Because Node.js only works with HTTP, not HTTPS",
          "Relative path strings cannot be parsed without a base protocol and host in the WHATWG URL specification",
          "To authenticate the request with localhost",
          "Because port 3000 is required by V8"
        ],
        "correctAnswer": "Relative path strings cannot be parsed without a base protocol and host in the WHATWG URL specification",
        "explanation": "The WHATWG `URL` constructor requires absolute URLs; providing a base URL resolves relative paths like `req.url`."
      },
      {
        "question": "What does `myUrl.pathname` return for `'https://example.com:8080/products/item?id=5'`?",
        "options": [
          "`/products/item?id=5`",
          "`products/item`",
          "`/products/item`",
          "`example.com/products/item`"
        ],
        "correctAnswer": "`/products/item`",
        "explanation": "`pathname` returns the path portion of the URL excluding protocol, host, port, query string, and hash."
      },
      {
        "question": "How do you iterate over all keys and values in `myUrl.searchParams`?",
        "codeSnippet": "for (const [key, value] of myUrl.searchParams) {\n  console.log(key, value);\n}",
        "options": [
          "Convert to string and use regex",
          "Call `searchParams.forEachArray()`",
          "Search params cannot be iterated",
          "Use a `for...of` loop directly because `URLSearchParams` implements the Iterable protocol"
        ],
        "correctAnswer": "Use a `for...of` loop directly because `URLSearchParams` implements the Iterable protocol",
        "explanation": "`URLSearchParams` has built-in iterators yielding `[name, value]` pairs."
      }
    ]
  },
  {
    "title": "Node.js: Package Management & package.json",
    "description": "dependencies vs devDependencies, semver symbols (^, ~), and scripts.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "NPM"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the primary difference between `dependencies` and `devDependencies` in `package.json`?",
        "options": [
          "`dependencies` are required to run the application in production; `devDependencies` are only needed during development/building (tests, linters, bundlers)",
          "`devDependencies` are installed globally on the computer",
          "`dependencies` cannot be updated after installation",
          "`devDependencies` are ignored by git"
        ],
        "correctAnswer": "`dependencies` are required to run the application in production; `devDependencies` are only needed during development/building (tests, linters, bundlers)",
        "explanation": "Production deployments run `npm install --production` to omit `devDependencies`, saving disk space and deployment time."
      },
      {
        "question": "What does the caret `^1.4.2` mean in a `package.json` dependency version?",
        "options": [
          "Allows updates to major releases up to 9.9.9",
          "Allows updates that do not change the leftmost non-zero digit (e.g. installs compatible minor and patch releases up to `<2.0.0`)",
          "Locks the version strictly to exactly 1.4.2",
          "Allows only bug patch releases (e.g. 1.4.x)"
        ],
        "correctAnswer": "Allows updates that do not change the leftmost non-zero digit (e.g. installs compatible minor and patch releases up to `<2.0.0`)",
        "explanation": "The caret `^` allows minor and patch version upgrades without bumping the major breaking version."
      },
      {
        "question": "What does the tilde `~1.4.2` mean in SemVer?",
        "options": [
          "Allows breaking major updates",
          "Allows beta and alpha versions only",
          "Allows only patch-level updates (e.g. up to `<1.5.0`)",
          "Downloads the package from GitHub instead of npm"
        ],
        "correctAnswer": "Allows only patch-level updates (e.g. up to `<1.5.0`)",
        "explanation": "The tilde `~` restricts updates to patch releases within the specified minor version."
      },
      {
        "question": "What is the purpose of the `package-lock.json` file?",
        "options": [
          "Locks the computer screen during installation",
          "Encrypts the source code in `package.json`",
          "Prevents developers from installing new packages",
          "Records the exact version, resolved download URL, and integrity hash of every installed dependency and transitive sub-dependency for deterministic installs"
        ],
        "correctAnswer": "Records the exact version, resolved download URL, and integrity hash of every installed dependency and transitive sub-dependency for deterministic installs",
        "explanation": "`package-lock.json` guarantees that `npm install` produces identical `node_modules` trees across all machines and CI servers."
      },
      {
        "question": "What command installs dependencies strictly according to `package-lock.json` without modifying it, ideal for CI/CD pipelines?",
        "options": [
          "`npm ci`",
          "`npm install --lock`",
          "`npm sync`",
          "`npm get`"
        ],
        "correctAnswer": "`npm ci`",
        "explanation": "`npm ci` (Clean Install) installs exact versions from the lockfile and deletes existing `node_modules` for reproducible CI builds."
      }
    ]
  },
  {
    "title": "Node.js: Environment Variables & dotenv",
    "description": "Loading .env files, security considerations, and cross-env usage.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Configuration"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How do you load a `.env` file into `process.env` using the popular `dotenv` package?",
        "codeSnippet": "import 'dotenv/config';\nconsole.log(process.env.DB_HOST);",
        "options": [
          "`process.loadEnv('./.env');`",
          "`import 'dotenv/config';` or `require('dotenv').config();`",
          "`dotenv.start();`",
          "`node.loadConfig('.env');`"
        ],
        "correctAnswer": "`import 'dotenv/config';` or `require('dotenv').config();`",
        "explanation": "`dotenv.config()` parses the `.env` file and merges its key-value pairs into `process.env`."
      },
      {
        "question": "What flag was introduced in Node.js 20.6+ to load `.env` files natively without installing external packages?",
        "options": [
          "`node --dotenv app.js`",
          "`node -e .env app.js`",
          "`node --env-file=.env app.js`",
          "`node --load-config app.js`"
        ],
        "correctAnswer": "`node --env-file=.env app.js`",
        "explanation": "Node.js 20.6+ has native `.env` loading support via the `--env-file` command-line flag."
      },
      {
        "question": "Why should `.env` files containing production secrets and API keys NEVER be committed to Git?",
        "options": [
          "Git cannot push files that start with a dot",
          "It causes merge conflicts on every git pull",
          "GitHub deletes repositories with `.env` files",
          "Exposing secrets in version control creates severe security risks, allowing unauthorized access to databases, cloud providers, and third-party APIs"
        ],
        "correctAnswer": "Exposing secrets in version control creates severe security risks, allowing unauthorized access to databases, cloud providers, and third-party APIs",
        "explanation": "Always add `.env` to `.gitignore` and commit a sanitized `.env.example` file instead."
      },
      {
        "question": "Why is the `cross-env` package commonly used in npm scripts?",
        "codeSnippet": "// package.json\n\"scripts\": {\n  \"start\": \"cross-env NODE_ENV=production node app.js\"\n}",
        "options": [
          "Windows uses `set NODE_ENV=production`, while Unix uses `NODE_ENV=production`; `cross-env` normalizes setting environment variables across operating systems",
          "To translate environment variables into French and Spanish",
          "To transfer variables across browser tabs",
          "To encrypt variables over the network"
        ],
        "correctAnswer": "Windows uses `set NODE_ENV=production`, while Unix uses `NODE_ENV=production`; `cross-env` normalizes setting environment variables across operating systems",
        "explanation": "Setting inline variables in command lines differs between Windows Command Prompt and bash. `cross-env` makes it work everywhere."
      },
      {
        "question": "If an environment variable `PORT` is already set in the operating system shell, does `dotenv.config()` overwrite it by default?",
        "options": [
          "Yes, `.env` always takes priority over system variables",
          "No, `dotenv` does not overwrite existing environment variables by default unless configured with `{ override: true }`",
          "It throws an error",
          "It renames the variable to PORT_2"
        ],
        "correctAnswer": "No, `dotenv` does not overwrite existing environment variables by default unless configured with `{ override: true }`",
        "explanation": "Pre-existing environment variables (set in CI or hosting platforms like Docker or Heroku) take precedence over `.env` files by default."
      }
    ]
  },
  {
    "title": "Node.js: Timers in Node.js",
    "description": "setTimeout, setInterval, setImmediate, and unref/ref timer methods.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Timers"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does the `timer.unref()` method do on a timer created with `setTimeout` or `setInterval`?",
        "codeSnippet": "const timer = setInterval(heartbeat, 1000);\ntimer.unref();",
        "options": [
          "Cancels the timer immediately",
          "Doubles the timer delay",
          "Allows the Node.js process to exit naturally if this timer is the only active handle remaining in the event loop",
          "Runs the timer in a separate C++ thread"
        ],
        "correctAnswer": "Allows the Node.js process to exit naturally if this timer is the only active handle remaining in the event loop",
        "explanation": "An active timer normally keeps the Node.js event loop alive. Calling `.unref()` tells the event loop not to wait for this timer to exit."
      },
      {
        "question": "What does `setImmediate(callback)` do in Node.js?",
        "codeSnippet": "setImmediate(() => console.log('Immediate!'));",
        "options": [
          "Runs the callback synchronously before the current line finishes",
          "Runs the callback in 1 millisecond",
          "Executes the callback on the operating system kernel",
          "Schedules the callback to run in the 'Check' phase of the event loop right after the Poll (I/O) phase"
        ],
        "correctAnswer": "Schedules the callback to run in the 'Check' phase of the event loop right after the Poll (I/O) phase",
        "explanation": "`setImmediate()` is designed to execute code in the Check phase of the current or next event loop cycle, after I/O events."
      },
      {
        "question": "How do you stop a repeating interval timer created by `setInterval`?",
        "codeSnippet": "const id = setInterval(poll, 1000);\n// To stop:\nclearInterval(id);",
        "options": [
          "`clearInterval(id)`",
          "`timer.stop()`",
          "`delete id`",
          "`process.stopTimer(id)`"
        ],
        "correctAnswer": "`clearInterval(id)`",
        "explanation": "`clearInterval(id)` cancels a repeating timer created by `setInterval()`."
      },
      {
        "question": "What does `import { setTimeout } from 'timers/promises'` provide?",
        "codeSnippet": "import { setTimeout } from 'timers/promises';\nawait setTimeout(1000);",
        "options": [
          "A faster C++ timer",
          "A promise-based delay function that can be awaited directly: `await setTimeout(1000)`",
          "A timer that cannot be cancelled",
          "A timer that runs on the GPU"
        ],
        "correctAnswer": "A promise-based delay function that can be awaited directly: `await setTimeout(1000)`",
        "explanation": "Node.js core provides promise versions of timers in `'timers/promises'`, enabling clean `await setTimeout(ms)`."
      },
      {
        "question": "What is the return type of `setTimeout()` in Node.js compared to the browser?",
        "options": [
          "In Node.js it returns a Promise; in browser an object",
          "They are both numbers",
          "In Node.js it returns a `Timeout` object (with methods like `.unref()`, `.ref()`); in the browser it returns a numeric ID",
          "In Node.js it returns a string"
        ],
        "correctAnswer": "In Node.js it returns a `Timeout` object (with methods like `.unref()`, `.ref()`); in the browser it returns a numeric ID",
        "explanation": "Browser `setTimeout` returns an integer ID, while Node.js returns an instance of the internal `Timeout` class."
      }
    ]
  },
  {
    "title": "Node.js: OS & System Information",
    "description": "os.cpus, os.totalmem, platform, and system resource inspection.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Core"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How do you determine the number of logical CPU cores on the host machine using the `os` module?",
        "codeSnippet": "import os from 'os';\nconst numCores = os.cpus().length;",
        "options": [
          "`os.cpuCount()`",
          "`process.cores`",
          "`os.hardware.cores`",
          "`os.cpus().length`"
        ],
        "correctAnswer": "`os.cpus().length`",
        "explanation": "`os.cpus()` returns an array of objects containing information about each logical CPU core; its length indicates the core count."
      },
      {
        "question": "What does `os.platform()` return when running on Windows?",
        "options": [
          "`'win32'` (even on 64-bit Windows)",
          "`'windows'`",
          "`'win64'`",
          "`'nt'`"
        ],
        "correctAnswer": "`'win32'` (even on 64-bit Windows)",
        "explanation": "Node.js returns `'win32'` for all Windows operating systems, regardless of whether the system architecture is 32-bit or 64-bit."
      },
      {
        "question": "How do you get the amount of free system memory in bytes?",
        "codeSnippet": "const freeBytes = os.freemem();",
        "options": [
          "`os.freeMemory()`",
          "`os.freemem()`",
          "`process.memory.free`",
          "`os.meminfo().free`"
        ],
        "correctAnswer": "`os.freemem()`",
        "explanation": "`os.freemem()` returns the amount of free system memory in bytes as an integer."
      },
      {
        "question": "What does `os.homedir()` return?",
        "options": [
          "The directory where node is installed",
          "The root `/` directory",
          "The path to the current user's home directory (e.g. `C:\\Users\\username` or `/home/username`)",
          "The project directory containing package.json"
        ],
        "correctAnswer": "The path to the current user's home directory (e.g. `C:\\Users\\username` or `/home/username`)",
        "explanation": "`os.homedir()` resolves the string path of the current user's home directory cross-platform."
      },
      {
        "question": "How can you read the system uptime (seconds the computer has been running)?",
        "options": [
          "`process.uptime()`",
          "`os.systemUptime()`",
          "`os.runningTime()`",
          "`os.uptime()`"
        ],
        "correctAnswer": "`os.uptime()`",
        "explanation": "`os.uptime()` returns the system uptime in seconds. (Note: `process.uptime()` returns how long the Node process has run)."
      }
    ]
  },
  {
    "title": "Node.js: Basic Error Handling & Try-Catch",
    "description": "Error-first callbacks, async error handling, and unhandled rejections.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Errors"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the 'error-first callback' convention in classic Node.js APIs?",
        "codeSnippet": "fs.readFile('data.txt', (err, data) => {\n  if (err) return console.error(err);\n  console.log(data);\n});",
        "options": [
          "The first argument passed to the callback function is reserved for an Error object (or `null` if successful)",
          "The function must throw an error before executing",
          "Errors are sent to the first line of the file",
          "Callbacks must return `false` on error"
        ],
        "correctAnswer": "The first argument passed to the callback function is reserved for an Error object (or `null` if successful)",
        "explanation": "Node standardizes asynchronous callbacks by passing `(err, result)`, where `err` is truthy if an error occurred."
      },
      {
        "question": "What happens in modern Node.js if a Promise rejects and there is no `.catch()` or `try...catch` block to handle it?",
        "options": [
          "The rejection is silently swallowed and forgotten",
          "Node emits an `unhandledRejection` event, and the process terminates with a non-zero exit code by default",
          "The promise automatically retries 3 times",
          "The computer reboots"
        ],
        "correctAnswer": "Node emits an `unhandledRejection` event, and the process terminates with a non-zero exit code by default",
        "explanation": "Since Node.js 15, unhandled promise rejections terminate the process with exit code 1 to prevent silent crashes and memory corruption."
      },
      {
        "question": "How do you handle errors when using `await` with promise-based functions in an async function?",
        "codeSnippet": "try {\n  const res = await fetchData();\n} catch (err) {\n  console.error('Failed:', err.message);\n}",
        "options": [
          "Attach `.catch()` to the async function keyword",
          "Use `process.catch()`",
          "Wrap the `await` expression in a standard `try...catch` block",
          "Errors cannot be caught when using await"
        ],
        "correctAnswer": "Wrap the `await` expression in a standard `try...catch` block",
        "explanation": "Awaiting a rejecting promise throws an exception that can be caught using standard `try...catch` syntax."
      },
      {
        "question": "What property on an `Error` object contains the sequence of function calls that led to the error?",
        "options": [
          "`error.trace`",
          "`error.history`",
          "`error.calls`",
          "`error.stack`"
        ],
        "correctAnswer": "`error.stack`",
        "explanation": "`error.stack` is a string containing the error message along with the stack trace lines indicating files and line numbers."
      },
      {
        "question": "What event on `process` catches unhandled synchronous exceptions that bubble to the top of the event loop?",
        "codeSnippet": "process.on('uncaughtException', (err) => {\n  console.error('Fatal crash:', err);\n  process.exit(1);\n});",
        "options": [
          "`'uncaughtException'`",
          "`'crash'`",
          "`'fatalError'`",
          "`'error'`"
        ],
        "correctAnswer": "`'uncaughtException'`",
        "explanation": "The `uncaughtException` event fires when an uncaught JavaScript exception bubbles all the way back to the event loop."
      }
    ]
  },
  {
    "title": "Node.js: Console API & Formatting",
    "description": "console.log, console.error, console.table, and util.format specifiers.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Debugging"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Where does `console.log()` write its output in Node.js?",
        "options": [
          "`process.stderr`",
          "`process.stdout` (standard output stream)",
          "`process.stdin`",
          "To a file named `console.log` on disk"
        ],
        "correctAnswer": "`process.stdout` (standard output stream)",
        "explanation": "`console.log()` formats text and writes it directly to `process.stdout` followed by a newline."
      },
      {
        "question": "Where does `console.error()` write its output in Node.js?",
        "options": [
          "`process.stdout`",
          "`process.exit`",
          "`process.stderr` (standard error stream)",
          "It throws an unhandled exception"
        ],
        "correctAnswer": "`process.stderr` (standard error stream)",
        "explanation": "`console.error()` writes to `process.stderr`, allowing command-line tools to separate normal output from errors via shell redirection (`2>`)."
      },
      {
        "question": "How do you format a string using printf-style placeholders with `console.log`?",
        "codeSnippet": "console.log('User %s is %d years old', 'Alice', 30);",
        "options": [
          "Use `{0}` and `{1}` placeholders",
          "Use `$1` and `$2`",
          "Node console does not support formatting placeholders",
          "Use `%s` for strings, `%d` for numbers, and `%j` for JSON formatting"
        ],
        "correctAnswer": "Use `%s` for strings, `%d` for numbers, and `%j` for JSON formatting",
        "explanation": "Node's console internally uses `util.format()`, supporting `%s`, `%d`, `%i`, `%f`, `%j`, and `%o`."
      },
      {
        "question": "What does `console.time('query')` and `console.timeEnd('query')` do?",
        "codeSnippet": "console.time('fetch');\nawait fetchUsers();\nconsole.timeEnd('fetch');",
        "options": [
          "Starts a timer with the given label and prints the elapsed time in milliseconds when `timeEnd` is called",
          "Prints the current UTC time to the console",
          "Delays execution for a specified amount of time",
          "Measures network packet loss"
        ],
        "correctAnswer": "Starts a timer with the given label and prints the elapsed time in milliseconds when `timeEnd` is called",
        "explanation": "`console.time()` and `console.timeEnd()` measure and log the duration of operations in milliseconds."
      },
      {
        "question": "What does `console.table(data)` do when passed an array of objects?",
        "codeSnippet": "console.table([\n  { id: 1, name: 'Nahom' },\n  { id: 2, name: 'Sara' }\n]);",
        "options": [
          "Creates an HTML file containing a `<table>` tag",
          "Prints the array data formatted as an ASCII tabular grid with rows and columns",
          "Uploads data to a relational SQL database",
          "Throws a TypeError because tables only exist in HTML"
        ],
        "correctAnswer": "Prints the array data formatted as an ASCII tabular grid with rows and columns",
        "explanation": "`console.table()` formats array/object data into a readable terminal table with indices and column headers."
      }
    ]
  },
  {
    "title": "Node.js: Crypto Basics & Hashing",
    "description": "createHash, sha256 digests, and random byte generation.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Security"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How do you calculate a SHA-256 hash of a string using Node's `crypto` module?",
        "codeSnippet": "import crypto from 'crypto';\nconst hash = crypto.createHash('sha256').update('password123').digest('hex');",
        "options": [
          "`crypto.hash('sha256', data)`",
          "`crypto.sha256(data)`",
          "`crypto.createHash('sha256').update(data).digest('hex')`",
          "`crypto.digest('sha256', data)`"
        ],
        "correctAnswer": "`crypto.createHash('sha256').update(data).digest('hex')`",
        "explanation": "The `createHash` method initializes a Hash instance, `.update()` feeds data, and `.digest('hex')` produces the hex string."
      },
      {
        "question": "How do you generate 16 cryptographically strong random bytes in Node.js?",
        "codeSnippet": "const token = crypto.randomBytes(16).toString('hex');",
        "options": [
          "`Math.random(16)`",
          "`crypto.getRandom(16)`",
          "`Buffer.random(16)`",
          "`crypto.randomBytes(16)`"
        ],
        "correctAnswer": "`crypto.randomBytes(16)`",
        "explanation": "`crypto.randomBytes(size)` generates cryptographically secure pseudo-random bytes from the operating system's entropy pool."
      },
      {
        "question": "Why should `Math.random()` NEVER be used for generating security tokens, passwords, or reset links?",
        "options": [
          "`Math.random()` is not cryptographically secure: its pseudo-random algorithm is predictable and vulnerable to statistical estimation",
          "`Math.random()` only generates strings",
          "`Math.random()` runs on the GPU",
          "`Math.random()` crashes if called more than 100 times"
        ],
        "correctAnswer": "`Math.random()` is not cryptographically secure: its pseudo-random algorithm is predictable and vulnerable to statistical estimation",
        "explanation": "`Math.random()` is a PRNG designed for speed, not cryptography. Use `crypto.randomBytes()` or `crypto.randomUUID()` for security."
      },
      {
        "question": "What function generates a standard UUID v4 string natively in Node.js 15.6+?",
        "codeSnippet": "const id = crypto.randomUUID();",
        "options": [
          "`crypto.uuid()`",
          "`crypto.randomUUID()`",
          "`crypto.createUUID()`",
          "`new crypto.UUID()`"
        ],
        "correctAnswer": "`crypto.randomUUID()`",
        "explanation": "`crypto.randomUUID()` generates a RFC 4122 version 4 UUID string natively without needing the third-party `uuid` package."
      },
      {
        "question": "What is the difference between a hash (e.g. SHA-256) and encryption (e.g. AES-256)?",
        "options": [
          "Hashing is two-way; encryption is one-way",
          "Hashing requires a password to decrypt",
          "Hashing is a one-way transformation that cannot be reversed; encryption is a two-way transformation that can be decrypted with a key",
          "They are exact synonyms"
        ],
        "correctAnswer": "Hashing is a one-way transformation that cannot be reversed; encryption is a two-way transformation that can be decrypted with a key",
        "explanation": "Hashes are one-way fingerprints used for verification. Encryption protects confidential data so it can be decrypted with a secret key."
      }
    ]
  },
  {
    "title": "Node.js: Stream Basics & Piping",
    "description": "createReadStream, createWriteStream, stream.pipe, and data/end events.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Streams"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Why are streams preferred over `fs.readFile()` when working with large files (e.g. a 2GB video)?",
        "options": [
          "Streams compress the video into MP3 format",
          "Streams are processed directly by the graphics card",
          "`fs.readFile` cannot read files larger than 10MB",
          "Streams process data chunk-by-chunk in memory buffers, avoiding reading the entire 2GB file into RAM all at once"
        ],
        "correctAnswer": "Streams process data chunk-by-chunk in memory buffers, avoiding reading the entire 2GB file into RAM all at once",
        "explanation": "Streams enable memory efficiency by reading and transmitting data in small sequential chunks rather than buffering everything in RAM."
      },
      {
        "question": "How do you pipe a readable file stream directly into a writable file stream?",
        "codeSnippet": "const src = fs.createReadStream('input.txt');\nconst dest = fs.createWriteStream('output.txt');\nsrc.pipe(dest);",
        "options": [
          "`src.pipe(dest)`",
          "`dest.writeStream(src)`",
          "`src.transfer(dest)`",
          "`stream.connect(src, dest)`"
        ],
        "correctAnswer": "`src.pipe(dest)`",
        "explanation": "`readable.pipe(destination)` attaches a writable stream to the readable stream, automatically managing data flow."
      },
      {
        "question": "What events are emitted by a standard Readable stream when reading data manually?",
        "codeSnippet": "stream.on('data', chunk => { ... });\nstream.on('end', () => { ... });",
        "options": [
          "`'read'`, `'done'`, and `'fail'`",
          "`'data'` (when a chunk is ready), `'end'` (when no more data exists), and `'error'`",
          "`'message'`, `'close'`, and `'reject'`",
          "`'chunk'`, `'finish'`, and `'crash'`"
        ],
        "correctAnswer": "`'data'` (when a chunk is ready), `'end'` (when no more data exists), and `'error'`",
        "explanation": "Readable streams emit `'data'` for each buffer chunk, `'end'` when finished, and `'error'` if an issue occurs."
      },
      {
        "question": "What are the 4 fundamental stream types in Node.js?",
        "options": [
          "Input, Output, Network, and Disk",
          "Async, Sync, Micro, and Macro",
          "Readable, Writable, Duplex (both readable and writable, like sockets), and Transform (transforms data as written/read, like zlib)",
          "Text, Binary, JSON, and Buffer"
        ],
        "correctAnswer": "Readable, Writable, Duplex (both readable and writable, like sockets), and Transform (transforms data as written/read, like zlib)",
        "explanation": "Node.js defines 4 stream types: Readable, Writable, Duplex, and Transform."
      },
      {
        "question": "What is the modern promise-based alternative to `.pipe()` that handles error cleanups safely?",
        "codeSnippet": "import { pipeline } from 'stream/promises';\nawait pipeline(readStream, transformStream, writeStream);",
        "options": [
          "`stream.safePipe()`",
          "`stream.connect()`",
          "`stream.pipeAsync()`",
          "`pipeline` from `'stream/promises'`"
        ],
        "correctAnswer": "`pipeline` from `'stream/promises'`",
        "explanation": "`pipeline` automatically destroys streams and forwards errors cleanly if one stream in the chain fails."
      }
    ]
  },
  {
    "title": "Node.js: Utility Module",
    "description": "util.promisify, util.types, and util.inspect formatting.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Core"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does `util.promisify(originalFunction)` do?",
        "codeSnippet": "import util from 'util';\nimport fs from 'fs';\nconst readFileAsync = util.promisify(fs.readFile);",
        "options": [
          "Converts a function following the standard error-first callback convention into a function that returns a Promise",
          "Converts a Promise into an EventEmitter",
          "Makes an async function run synchronously",
          "Caches the result of a function in memory"
        ],
        "correctAnswer": "Converts a function following the standard error-first callback convention into a function that returns a Promise",
        "explanation": "`util.promisify()` wraps standard `(err, value)` callback functions so they can be consumed via `async/await`."
      },
      {
        "question": "What does `util.inspect(object, { depth: null, colors: true })` do?",
        "options": [
          "Checks if an object contains malware",
          "Returns a formatted string representation of an object for debugging, inspecting deep nested objects without truncating to `[Object]`",
          "Converts the object to XML format",
          "Validates the object against a TypeScript schema"
        ],
        "correctAnswer": "Returns a formatted string representation of an object for debugging, inspecting deep nested objects without truncating to `[Object]`",
        "explanation": "`util.inspect()` returns detailed string representations of objects, allowing full depth inspection."
      },
      {
        "question": "What does `util.types.isPromise(val)` check?",
        "codeSnippet": "if (util.types.isPromise(maybePromise)) { ... }",
        "options": [
          "Checks if a variable has a `.then()` method",
          "Executes the promise immediately",
          "Returns `true` if `val` is a native built-in JavaScript Promise",
          "Converts a value into a promise"
        ],
        "correctAnswer": "Returns `true` if `val` is a native built-in JavaScript Promise",
        "explanation": "`util.types` provides reliable type identification for native engine objects (Promises, RegExps, TypedArrays, etc.)."
      },
      {
        "question": "What is the inverse of `util.promisify` (converting a Promise-returning function back to callback style)?",
        "codeSnippet": "const callbackFn = util.callbackify(asyncFn);",
        "options": [
          "`util.depromisify`",
          "`util.toCallback`",
          "`util.unpromise`",
          "`util.callbackify`"
        ],
        "correctAnswer": "`util.callbackify`",
        "explanation": "`util.callbackify()` converts an `async` function into an error-first callback function."
      },
      {
        "question": "How can a custom object define its own representation when formatted by `util.inspect`?",
        "codeSnippet": "class Person {\n  [util.inspect.custom]() { return 'Person<Custom>'; }\n}",
        "options": [
          "Implement the `[util.inspect.custom](depth, options)` symbol method on the object",
          "Define a `.toDebugString()` method",
          "Define a `inspect: true` property",
          "Implement `toString()` only"
        ],
        "correctAnswer": "Implement the `[util.inspect.custom](depth, options)` symbol method on the object",
        "explanation": "Implementing `[util.inspect.custom]()` allows full control over how your class instance appears in terminal logs."
      }
    ]
  },
  {
    "title": "Node.js: Child Process Exec Basics",
    "description": "child_process.exec vs spawn, running shell commands, and buffers.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Process"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the primary difference between `child_process.exec()` and `child_process.spawn()`?",
        "options": [
          "`spawn` can only run Python scripts; `exec` runs JavaScript",
          "`exec` runs a command in a shell and buffers the entire stdout/stderr output into a callback; `spawn` streams data chunk-by-chunk via streams without a shell by default",
          "`exec` only runs on Windows; `spawn` on Linux",
          "There is no difference"
        ],
        "correctAnswer": "`exec` runs a command in a shell and buffers the entire stdout/stderr output into a callback; `spawn` streams data chunk-by-chunk via streams without a shell by default",
        "explanation": "`exec` buffers output up to `maxBuffer` (default ~1MB) in a callback, whereas `spawn` streams data as it arrives, suitable for long-running processes."
      },
      {
        "question": "Why can passing unvalidated user input directly into `child_process.exec()` lead to Remote Code Execution (RCE)?",
        "codeSnippet": "// Dangerous command injection:\nexec(`ping ${userInput}`);",
        "options": [
          "Because `exec` downloads packages from npm",
          "Because `exec` grants root privileges to all users",
          "Because `exec` invokes an underlying shell (`/bin/sh` or `cmd.exe`), attackers can inject shell operators (`; rm -rf /` or `& dir`) to execute arbitrary malicious commands",
          "Because Node.js disables firewalls during exec"
        ],
        "correctAnswer": "Because `exec` invokes an underlying shell (`/bin/sh` or `cmd.exe`), attackers can inject shell operators (`; rm -rf /` or `& dir`) to execute arbitrary malicious commands",
        "explanation": "Shell command injection occurs when untrusted input is concatenated into shell commands. Using `spawn` with an argument array avoids shell interpolation."
      },
      {
        "question": "How do you execute a command synchronously and capture its output as a string?",
        "codeSnippet": "import { execSync } from 'child_process';\nconst branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();",
        "options": [
          "`exec(command, { sync: true })`",
          "`child_process.run(command)`",
          "`process.exec(command)`",
          "`execSync(command).toString()`"
        ],
        "correctAnswer": "`execSync(command).toString()`",
        "explanation": "`execSync()` executes the command synchronously, blocking the process and returning a Buffer of the output."
      },
      {
        "question": "What happens if a command executed by `child_process.exec` outputs more data than the default `maxBuffer` limit?",
        "options": [
          "Node kills the child process and passes a `ERR_CHILD_PROCESS_STDIO_MAXBUFFER` error to the callback",
          "It automatically saves the excess data to disk",
          "The output is truncated silently",
          "The entire computer hangs"
        ],
        "correctAnswer": "Node kills the child process and passes a `ERR_CHILD_PROCESS_STDIO_MAXBUFFER` error to the callback",
        "explanation": "Exceeding `maxBuffer` triggers an error and kills the child process. Use `spawn()` for commands with large output."
      },
      {
        "question": "What core module provides `exec`, `spawn`, `fork`, and `execFile`?",
        "options": [
          "`process`",
          "`child_process`",
          "`os`",
          "`cluster`"
        ],
        "correctAnswer": "`child_process`",
        "explanation": "The `child_process` module enables Node.js to spawn and interact with child OS processes."
      }
    ]
  },
  {
    "title": "Node.js: NPM Scripts & Lifecycle Hooks",
    "description": "pre and post hooks, npx execution, and script chaining.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "NPM"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What script automatically runs BEFORE `npm run build` if defined in `package.json`?",
        "codeSnippet": "// package.json\n\"scripts\": {\n  \"prebuild\": \"npm run lint\",\n  \"build\": \"vite build\"\n}",
        "options": [
          "`beforebuild`",
          "`initbuild`",
          "`prebuild`",
          "`startbuild`"
        ],
        "correctAnswer": "`prebuild`",
        "explanation": "NPM automatically triggers scripts prefixed with `pre` before the matching script name, and `post` after it."
      },
      {
        "question": "What command can be run using `npm test` without typing `run`?",
        "options": [
          "Only `build`",
          "Only `lint`",
          "All scripts require `run`",
          "`test`, `start`, `stop`, and `restart` can all be invoked directly as `npm test` or `npm start` without the `run` keyword"
        ],
        "correctAnswer": "`test`, `start`, `stop`, and `restart` can all be invoked directly as `npm test` or `npm start` without the `run` keyword",
        "explanation": "Standard lifecycle scripts (`test`, `start`, `stop`) have shorthand aliases in npm CLI."
      },
      {
        "question": "What is `npx` used for in the Node.js ecosystem?",
        "options": [
          "Executing local npm package binaries from `node_modules/.bin` or fetching and running an npm package without installing it globally",
          "Compiling Node.js into C++",
          "Deleting npm packages from the registry",
          "Managing nginx web servers"
        ],
        "correctAnswer": "Executing local npm package binaries from `node_modules/.bin` or fetching and running an npm package without installing it globally",
        "explanation": "`npx` executes binaries directly from local dependencies or downloads and runs tools (like `npx create-react-app`) ephemerally."
      },
      {
        "question": "How do you pass additional command-line flags to an underlying npm script?",
        "codeSnippet": "npm run test -- --watch",
        "options": [
          "Put arguments in quotes: `npm run test \"--watch\"`",
          "Use a double-dash `--` separator before the extra arguments: `npm run test -- --watch`",
          "Add `+watch`",
          "Arguments cannot be passed to npm scripts"
        ],
        "correctAnswer": "Use a double-dash `--` separator before the extra arguments: `npm run test -- --watch`",
        "explanation": "The `--` tells npm to stop parsing arguments and forward all subsequent flags directly to the script command."
      },
      {
        "question": "How do you run two npm commands sequentially in a cross-platform npm script?",
        "codeSnippet": "\"build\": \"npm run build:css && npm run build:js\"",
        "options": [
          "Use `||`",
          "Use a colon `:`",
          "Use `&&` (which runs the second command only if the first succeeds)",
          "Use `,`"
        ],
        "correctAnswer": "Use `&&` (which runs the second command only if the first succeeds)",
        "explanation": "`&&` executes commands in sequence, stopping if any previous command returns a non-zero exit code."
      }
    ]
  },
  {
    "title": "Node.js: Clean Project Structure for CLI/Server",
    "description": "Layered architectures, controllers, services, routes, and config separation.",
    "difficulty": "easy",
    "tags": [
      "Node.js",
      "Architecture"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "In a standard Express / Node.js web server architecture, what is the role of a 'Controller'?",
        "options": [
          "Directly executes SQL queries and table migrations",
          "Renders CSS styles",
          "Manages the operating system thread pool",
          "Handles HTTP request/response parsing, calls business logic services, and returns appropriate status codes and responses"
        ],
        "correctAnswer": "Handles HTTP request/response parsing, calls business logic services, and returns appropriate status codes and responses",
        "explanation": "Controllers act as an HTTP boundary layer: validating input, delegating work to services, and shaping the HTTP response."
      },
      {
        "question": "Why should database queries and business calculations be placed in 'Services' rather than directly inside route handlers?",
        "options": [
          "It decouples business logic from HTTP protocols, enabling reuse in background jobs, CLI tools, and automated unit tests without mocking HTTP objects",
          "Because routes cannot run async functions",
          "Because services execute in parallel C++ threads",
          "Express requires services by default"
        ],
        "correctAnswer": "It decouples business logic from HTTP protocols, enabling reuse in background jobs, CLI tools, and automated unit tests without mocking HTTP objects",
        "explanation": "Service layers keep business logic protocol-agnostic, making testing and reuse straightforward."
      },
      {
        "question": "What line at the top of a Node.js script file allows it to be executed directly as a CLI binary in Unix environments?",
        "codeSnippet": "#!/usr/bin/env node",
        "options": [
          "`// @run-as-binary`",
          "`#!/usr/bin/env node` (the Shebang line)",
          "`use binary;`",
          "`\"bin\": true`"
        ],
        "correctAnswer": "`#!/usr/bin/env node` (the Shebang line)",
        "explanation": "The Shebang `#!/usr/bin/env node` informs the operating system shell to execute the script using the node interpreter."
      },
      {
        "question": "What field in `package.json` maps CLI command names to executable JavaScript files?",
        "codeSnippet": "// package.json\n\"bin\": {\n  \"my-cli\": \"./bin/index.js\"\n}",
        "options": [
          "`\"cli\"`",
          "`\"executable\"`",
          "`\"bin\"`",
          "`\"commands\"`"
        ],
        "correctAnswer": "`\"bin\"`",
        "explanation": "The `\"bin\"` field in `package.json` configures executable symlinks in `node_modules/.bin` when the package is installed."
      },
      {
        "question": "Why should configuration values (database URLs, ports, API secrets) be centralized in a dedicated `config/` module?",
        "options": [
          "To speed up hard drive reads",
          "Because Node.js prohibits `process.env` in controllers",
          "To hide configuration from developers",
          "It provides a single source of truth with validation and default fallbacks, avoiding scattered `process.env` lookups across the codebase"
        ],
        "correctAnswer": "It provides a single source of truth with validation and default fallbacks, avoiding scattered `process.env` lookups across the codebase",
        "explanation": "Centralized config modules validate required environment variables at startup, failing fast if critical variables are missing."
      }
    ]
  }
];
