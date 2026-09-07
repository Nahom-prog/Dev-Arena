export const nodejsMidQuizzes = [
  {
    "title": "Node.js: Event Loop Phases & Execution Order",
    "description": "Libuv event loop phases, microtasks, process.nextTick, and setImmediate.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Internals"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "When does `process.nextTick()` execute relative to other asynchronous callbacks?",
        "options": [
          "Immediately after the current operation finishes and before the event loop advances to the next phase or microtask queue",
          "In the Timers phase with `setTimeout`",
          "In the Check phase with `setImmediate`",
          "After the entire script and all timers finish"
        ],
        "correctAnswer": "Immediately after the current operation finishes and before the event loop advances to the next phase or microtask queue",
        "explanation": "`process.nextTick()` queues callbacks in the `nextTickQueue`, which runs immediately after the current operation completes, before the event loop continues."
      },
      {
        "question": "What is the order of execution among the primary phases of the Libuv event loop?",
        "options": [
          "Poll -> Timers -> Check -> Close",
          "Timers -> Pending Callbacks -> Idle/Prepare -> Poll -> Check -> Close Callbacks",
          "Check -> Poll -> Timers -> Close",
          "Microtasks -> Macrotasks -> Timers -> Idle"
        ],
        "correctAnswer": "Timers -> Pending Callbacks -> Idle/Prepare -> Poll -> Check -> Close Callbacks",
        "explanation": "The Libuv event loop traverses Timers, Pending I/O, Idle/Prepare, Poll (waiting for new I/O), Check (`setImmediate`), and Close callbacks."
      },
      {
        "question": "When run inside an I/O callback (e.g. `fs.readFile`), which callback is guaranteed to execute first: `setImmediate` or `setTimeout(..., 0)`?",
        "codeSnippet": "fs.readFile('test.txt', () => {\n  setTimeout(() => console.log('timeout'), 0);\n  setImmediate(() => console.log('immediate'));\n});",
        "options": [
          "`setTimeout` always executes first",
          "The order is random and non-deterministic",
          "`setImmediate` always executes first, because the Poll phase moves directly to the Check phase",
          "Neither executes because fs.readFile is synchronous"
        ],
        "correctAnswer": "`setImmediate` always executes first, because the Poll phase moves directly to the Check phase",
        "explanation": "Inside an I/O callback, the event loop is in the Poll phase. The next phase entered immediately is Check (`setImmediate`)."
      },
      {
        "question": "What happens if a recursive `process.nextTick()` loop is initiated in Node.js?",
        "codeSnippet": "function loop() {\n  process.nextTick(loop);\n}\nloop();",
        "options": [
          "Node.js runs it in a background Web Worker",
          "It throws a `RangeError: Maximum call stack size exceeded` immediately",
          "Node automatically converts it to `setImmediate`",
          "It starves the event loop, preventing Node.js from ever reaching the Poll phase or handling any I/O or timers"
        ],
        "correctAnswer": "It starves the event loop, preventing Node.js from ever reaching the Poll phase or handling any I/O or timers",
        "explanation": "`process.nextTick()` flushes completely before the event loop moves on. Recursive calls starve I/O and freeze the process."
      },
      {
        "question": "What handles promise resolutions (`Promise.resolve().then(...)`) in Node.js?",
        "options": [
          "The microtask queue, which is processed immediately after the `nextTickQueue` and between each event loop phase",
          "The Poll phase in Libuv",
          "The OS kernel thread pool",
          "The Garbage Collector"
        ],
        "correctAnswer": "The microtask queue, which is processed immediately after the `nextTickQueue` and between each event loop phase",
        "explanation": "V8 microtasks (Promises, `queueMicrotask`) execute right after the `nextTickQueue` between ticks of event loop operations."
      }
    ]
  },
  {
    "title": "Node.js: Express Middleware Pipeline",
    "description": "app.use, next(), error-handling middleware signatures, and middleware chaining.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Express"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What identifies an Express error-handling middleware function from standard middleware?",
        "codeSnippet": "app.use((err, req, res, next) => {\n  res.status(500).send(err.message);\n});",
        "options": [
          "It is registered with `app.useError()`",
          "It has an exact arity of 4 arguments: `(err, req, res, next)`",
          "It returns a rejected Promise",
          "It must be named `errorHandler`"
        ],
        "correctAnswer": "It has an exact arity of 4 arguments: `(err, req, res, next)`",
        "explanation": "Express checks `fn.length === 4` to determine if a middleware function is an error handler. Omitting `next` makes it `3` and breaks error handling."
      },
      {
        "question": "What happens if a middleware does not call `next()` and does not send a response (`res.send()` / `res.json()`)?",
        "options": [
          "Express calls `next()` automatically after 5 seconds",
          "The server throws an UnhandledMiddlewareException",
          "The request hangs until the client or server timeout expires",
          "A 200 OK response is sent with an empty body"
        ],
        "correctAnswer": "The request hangs until the client or server timeout expires",
        "explanation": "Express middleware is linear and explicit. If you neither pass control along via `next()` nor terminate the response, the request hangs."
      },
      {
        "question": "How do you forward an error to Express's error-handling middleware from inside a standard route handler?",
        "codeSnippet": "app.get('/users', async (req, res, next) => {\n  try {\n    const users = await getUsers();\n    res.json(users);\n  } catch (err) {\n    next(err);\n  }\n});",
        "options": [
          "Call `res.error(err)`",
          "Use `throw new Error()` inside the async handler (in Express 4 without express-async-errors)",
          "Call `process.emit('error', err)`",
          "Pass the error object as an argument to `next(err)`"
        ],
        "correctAnswer": "Pass the error object as an argument to `next(err)`",
        "explanation": "Calling `next(err)` tells Express to bypass all remaining non-error middleware and jump directly to the next error-handling middleware."
      },
      {
        "question": "In what order does Express execute registered middleware and routes?",
        "options": [
          "Sequentially in the exact order they are declared in the code using `app.use()` and route methods",
          "Alphabetically based on route paths",
          "Post routes first, then Get routes",
          "In parallel using multi-threading"
        ],
        "correctAnswer": "Sequentially in the exact order they are declared in the code using `app.use()` and route methods",
        "explanation": "Express maintains an internal middleware stack. Incoming requests traverse middleware in the order they were mounted via `app.use()`."
      },
      {
        "question": "Why does `app.use(express.json())` need to be mounted before route definitions?",
        "options": [
          "Because express.json() initializes the TCP port",
          "To parse incoming JSON request bodies into `req.body` before the route handlers attempt to read `req.body`",
          "Because Express crashes if body-parser is mounted after routes",
          "To validate route schemas"
        ],
        "correctAnswer": "To parse incoming JSON request bodies into `req.body` before the route handlers attempt to read `req.body`",
        "explanation": "Because middleware runs in registration order, body parsers must execute before route handlers to populate `req.body`."
      }
    ]
  },
  {
    "title": "Node.js: Stream Backpressure & HighWaterMark",
    "description": "Handling write buffers, drain events, and highWaterMark limits.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Streams"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is 'Backpressure' in stream data pipelines?",
        "options": [
          "A network routing loop",
          "A database deadlocking issue",
          "A buildup of unconsumed data occurring when a data producer (Readable stream) generates data faster than the consumer (Writable stream) can process and write it",
          "A CPU cache overflow"
        ],
        "correctAnswer": "A buildup of unconsumed data occurring when a data producer (Readable stream) generates data faster than the consumer (Writable stream) can process and write it",
        "explanation": "Backpressure occurs when faster producers overwhelm slower consumers, leading to buffer accumulation in memory."
      },
      {
        "question": "What does it mean when `writableStream.write(chunk)` returns `false`?",
        "options": [
          "The write failed and data was lost",
          "The stream has closed permanently",
          "The chunk contains invalid bytes",
          "The internal write buffer has exceeded the configured `highWaterMark`, and the producer should pause writing until the `'drain'` event fires"
        ],
        "correctAnswer": "The internal write buffer has exceeded the configured `highWaterMark`, and the producer should pause writing until the `'drain'` event fires",
        "explanation": "Returning `false` is a backpressure warning indicating the stream buffer is full; producers should pause and wait for `'drain'`."
      },
      {
        "question": "What is the default `highWaterMark` buffer threshold for a standard Node.js stream?",
        "options": [
          "16KB for objectMode streams (16 objects) and 64KB (65,536 bytes) for byte streams (or 16KB for fs streams)",
          "1GB",
          "1KB",
          "100MB"
        ],
        "correctAnswer": "16KB for objectMode streams (16 objects) and 64KB (65,536 bytes) for byte streams (or 16KB for fs streams)",
        "explanation": "The default `highWaterMark` is 64KB for normal byte streams (16KB for file streams), and 16 items for `objectMode: true`."
      },
      {
        "question": "How does `readable.pipe(writable)` automatically manage backpressure?",
        "options": [
          "It drops chunks that arrive too quickly",
          "It pauses the readable stream (`readable.pause()`) when `write()` returns `false`, and resumes it (`readable.resume()`) when the writable emits `'drain'`",
          "It writes excess chunks to temporary files on disk",
          "It increases available RAM dynamically"
        ],
        "correctAnswer": "It pauses the readable stream (`readable.pause()`) when `write()` returns `false`, and resumes it (`readable.resume()`) when the writable emits `'drain'`",
        "explanation": "`pipe()` coordinates `write()`, `pause()`, and the `'drain'` event behind the scenes to balance data throughput."
      },
      {
        "question": "What happens if you continuously call `writable.write()` while ignoring a `false` return value?",
        "options": [
          "Node.js drops the extra chunks safely",
          "The operating system compresses the data",
          "Chunks will continue to buffer in Node's heap memory without limit, eventually causing process memory exhaustion and an Out-Of-Memory (OOM) crash",
          "The write stream automatically splits into two threads"
        ],
        "correctAnswer": "Chunks will continue to buffer in Node's heap memory without limit, eventually causing process memory exhaustion and an Out-Of-Memory (OOM) crash",
        "explanation": "Node does not drop data when `false` is returned; it buffers all chunks in RAM, leading to memory leaks and OOM crashes."
      }
    ]
  },
  {
    "title": "Node.js: Cluster Module & Process Scaling",
    "description": "cluster.fork, master/worker model, round-robin load distribution, and multi-core utilization.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Scaling"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Why is the `cluster` module used in Node.js applications?",
        "options": [
          "To connect multiple physical computers into a supercomputer",
          "To manage Kubernetes pods natively",
          "To cluster MongoDB databases",
          "To scale single-threaded Node.js applications across multiple CPU cores by spawning worker processes that share the same server port"
        ],
        "correctAnswer": "To scale single-threaded Node.js applications across multiple CPU cores by spawning worker processes that share the same server port",
        "explanation": "Because Node runs on a single event-loop thread, `cluster` forks child processes to utilize all CPU cores on the host machine."
      },
      {
        "question": "How does the primary (master) cluster process distribute incoming TCP connections to worker processes on Linux/macOS?",
        "options": [
          "Using a built-in Round-Robin scheduling approach where the primary process accepts connections and hands them off to workers",
          "Workers compete directly in an OS thread race condition",
          "Connections are sent to whichever worker has the most RAM",
          "Using random port forwarding"
        ],
        "correctAnswer": "Using a built-in Round-Robin scheduling approach where the primary process accepts connections and hands them off to workers",
        "explanation": "Node uses round-robin scheduling (except on Windows) to distribute incoming connections evenly across worker processes."
      },
      {
        "question": "Do cluster worker processes share JavaScript memory or global variables?",
        "codeSnippet": "// Primary sets globalVar = 100;\n// Can Worker read globalVar?",
        "options": [
          "Yes, all workers share the exact same V8 heap memory",
          "No, each worker is a completely separate operating system process with its own V8 instance, memory space, and event loop",
          "Only variables declared with `var` are shared",
          "Only if wrapped in `SharedArrayBuffer`"
        ],
        "correctAnswer": "No, each worker is a completely separate operating system process with its own V8 instance, memory space, and event loop",
        "explanation": "Cluster processes are separate OS processes with isolated memory heaps; they communicate via IPC messages or external caches like Redis."
      },
      {
        "question": "How should a cluster master handle a worker process crashing or exiting unexpectedly?",
        "codeSnippet": "cluster.on('exit', (worker, code, signal) => {\n  console.log(`Worker ${worker.process.pid} died. Forking replacement...`);\n  cluster.fork();\n});",
        "options": [
          "Exit the master process immediately",
          "Reboot the operating system",
          "Listen to the `cluster.on('exit')` event and call `cluster.fork()` to spin up a replacement worker",
          "Workers cannot crash in Node.js"
        ],
        "correctAnswer": "Listen to the `cluster.on('exit')` event and call `cluster.fork()` to spin up a replacement worker",
        "explanation": "Listening for worker exit and spawning a replacement ensures zero-downtime resilience when a worker process terminates."
      },
      {
        "question": "What is a popular production process manager that abstracts Node.js clustering automatically?",
        "options": [
          "Nodemon",
          "Babel",
          "Webpack",
          "PM2 (`pm2 start app.js -i max`)"
        ],
        "correctAnswer": "PM2 (`pm2 start app.js -i max`)",
        "explanation": "PM2 is the standard production process manager that handles clustering, zero-downtime reloads, and automatic restarts."
      }
    ]
  },
  {
    "title": "Node.js: Worker Threads & CPU-Bound Operations",
    "description": "worker_threads module, true multi-threading, message passing, and SharedArrayBuffer.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Threading"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the key difference between the `cluster` module and the `worker_threads` module?",
        "options": [
          "`cluster` creates separate OS processes with isolated memory; `worker_threads` creates threads within the SAME process that can share memory via `SharedArrayBuffer`",
          "`worker_threads` only runs on Windows",
          "`cluster` is for CPU tasks, `worker_threads` is for network only",
          "They are exact synonyms"
        ],
        "correctAnswer": "`cluster` creates separate OS processes with isolated memory; `worker_threads` creates threads within the SAME process that can share memory via `SharedArrayBuffer`",
        "explanation": "Worker threads share memory within the same process and have lower memory overhead than spawning entire new Node processes."
      },
      {
        "question": "When should you use `worker_threads` in a Node.js application?",
        "options": [
          "For database I/O and HTTP queries",
          "For heavy CPU-intensive operations (e.g. video transcoding, image resizing, complex encryption, machine learning) that would otherwise block the main event loop",
          "For serving static CSS files",
          "To read small JSON config files"
        ],
        "correctAnswer": "For heavy CPU-intensive operations (e.g. video transcoding, image resizing, complex encryption, machine learning) that would otherwise block the main event loop",
        "explanation": "I/O is already asynchronous in Node.js; worker threads are specifically designed to offload blocking CPU-heavy tasks."
      },
      {
        "question": "How do the main thread and a worker thread communicate in `worker_threads`?",
        "codeSnippet": "const worker = new Worker('./worker.js');\nworker.postMessage({ data: [1, 2, 3] });\nworker.on('message', result => console.log(result));",
        "options": [
          "By directly modifying variables on `global`",
          "Via HTTP requests on port 80",
          "Via message passing using `worker.postMessage()` and the `'message'` event on `parentPort`",
          "Through standard file writes"
        ],
        "correctAnswer": "Via message passing using `worker.postMessage()` and the `'message'` event on `parentPort`",
        "explanation": "Worker threads communicate with the main thread using an asynchronous message channel (`postMessage` and `'message'`)."
      },
      {
        "question": "What mechanism allows multiple worker threads to read and write the exact same memory without serialization overhead?",
        "options": [
          "Global variables",
          "JSON.stringify",
          "`process.env`",
          "`SharedArrayBuffer` along with `Atomics` for thread-safe operations"
        ],
        "correctAnswer": "`SharedArrayBuffer` along with `Atomics` for thread-safe operations",
        "explanation": "`SharedArrayBuffer` shares binary memory across threads without cloning, while `Atomics` prevents race conditions."
      },
      {
        "question": "What property in `worker_threads` tells you if code is executing in the main thread or a worker?",
        "codeSnippet": "import { isMainThread } from 'worker_threads';",
        "options": [
          "`isMainThread` (boolean)",
          "`process.isMaster`",
          "`worker.active`",
          "`thread.isMain`"
        ],
        "correctAnswer": "`isMainThread` (boolean)",
        "explanation": "`isMainThread` is `true` if the code runs as the entry point of the Node process, and `false` inside a Worker thread."
      }
    ]
  },
  {
    "title": "Node.js: AsyncLocalStorage & Request Context",
    "description": "async_hooks context propagation, correlation IDs, and global state elimination.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Core"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What problem does `AsyncLocalStorage` in Node's `async_hooks` module solve?",
        "options": [
          "Stores data in the client's browser localStorage",
          "Allows storing and accessing request-scoped context (like trace IDs, logged-in users) throughout asynchronous call chains without prop drilling it through every function",
          "Saves JSON to an SQLite database asynchronously",
          "Caches API responses in RAM"
        ],
        "correctAnswer": "Allows storing and accessing request-scoped context (like trace IDs, logged-in users) throughout asynchronous call chains without prop drilling it through every function",
        "explanation": "`AsyncLocalStorage` acts like React Context for asynchronous Node.js execution flows, propagating state across async callbacks."
      },
      {
        "question": "How do you run code within an `AsyncLocalStorage` context?",
        "codeSnippet": "import { AsyncLocalStorage } from 'async_hooks';\nconst asyncLocalStorage = new AsyncLocalStorage();\n\nasyncLocalStorage.run({ requestId: 'abc-123' }, () => {\n  // Context is available here and in all async child functions\n});",
        "options": [
          "`asyncLocalStorage.set(store)`",
          "`asyncLocalStorage.bind(store)`",
          "`asyncLocalStorage.run(store, callback)`",
          "`asyncLocalStorage.context(store)`"
        ],
        "correctAnswer": "`asyncLocalStorage.run(store, callback)`",
        "explanation": "The `.run()` method attaches the store data for the duration of the callback and any asynchronous operations initiated within it."
      },
      {
        "question": "How do you retrieve the current store from any nested function during execution?",
        "codeSnippet": "function logCurrentRequest() {\n  const store = asyncLocalStorage.getStore();\n  console.log(store?.requestId);\n}",
        "options": [
          "`asyncLocalStorage.read()`",
          "`process.currentStore`",
          "`global.store`",
          "`asyncLocalStorage.getStore()`"
        ],
        "correctAnswer": "`asyncLocalStorage.getStore()`",
        "explanation": "`getStore()` returns the store active in the current asynchronous execution context, or `undefined` if outside a context."
      },
      {
        "question": "Why is `AsyncLocalStorage` preferred over saving request data on `global` in a multi-tenant Node server?",
        "options": [
          "In a concurrent server handling hundreds of simultaneous requests, `global` variables overwrite each other across concurrent requests, causing data leakage between users",
          "`global` variables cannot hold objects",
          "`global` variables cause memory corruption in V8",
          "`global` variables cannot be accessed in async functions"
        ],
        "correctAnswer": "In a concurrent server handling hundreds of simultaneous requests, `global` variables overwrite each other across concurrent requests, causing data leakage between users",
        "explanation": "Because Node is single-threaded and concurrent, global state is shared across all concurrent requests, leaking user data between requests."
      },
      {
        "question": "How is `AsyncLocalStorage` commonly used in Express or Fastify logging middleware?",
        "options": [
          "To save the user's password in plaintext",
          "To attach a unique `requestId` to every incoming HTTP request, ensuring all logger calls deep in the service layer automatically tag the request ID",
          "To disable Winston logs",
          "To measure bandwidth usage"
        ],
        "correctAnswer": "To attach a unique `requestId` to every incoming HTTP request, ensuring all logger calls deep in the service layer automatically tag the request ID",
        "explanation": "Wrapping the request in `AsyncLocalStorage` allows loggers anywhere in the codebase to pull the request correlation ID effortlessly."
      }
    ]
  },
  {
    "title": "Node.js: Graceful Shutdown Patterns",
    "description": "SIGTERM, SIGINT, server.close, active connection draining, and timeout safeguards.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Production"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is a 'Graceful Shutdown' in a production Node.js service?",
        "options": [
          "Calling `process.exit(0)` immediately upon receiving a kill signal",
          "Restarting the operating system",
          "Stopping the server from accepting new connections, finishing active in-flight requests, closing database connections, and exiting cleanly without dropping client connections",
          "Sending a goodbye email to all users"
        ],
        "correctAnswer": "Stopping the server from accepting new connections, finishing active in-flight requests, closing database connections, and exiting cleanly without dropping client connections",
        "explanation": "Graceful shutdown ensures in-flight transactions and HTTP requests complete before the process terminates, preventing data corruption."
      },
      {
        "question": "Which operating system signal is sent by orchestrators (Kubernetes, Docker) to request a process terminate gracefully?",
        "options": [
          "`SIGKILL`",
          "`SIGSTOP`",
          "`SIGUSR1`",
          "`SIGTERM`"
        ],
        "correctAnswer": "`SIGTERM`",
        "explanation": "Containers receive `SIGTERM` first to allow graceful cleanup; if the process does not exit within a grace period, `SIGKILL` forcibly kills it."
      },
      {
        "question": "Why can an application NOT intercept or handle the `SIGKILL` (signal 9) signal?",
        "options": [
          "`SIGKILL` is handled directly by the operating system kernel and immediately terminates the process without notifying user space",
          "Node.js lacks permissions to read signal 9",
          "V8 converts SIGKILL to a console warning",
          "Signal 9 only exists on macOS"
        ],
        "correctAnswer": "`SIGKILL` is handled directly by the operating system kernel and immediately terminates the process without notifying user space",
        "explanation": "`SIGKILL` cannot be caught, blocked, or ignored by any process; the OS kernel forcibly tears down the process."
      },
      {
        "question": "What does `server.close(callback)` do on an HTTP server instance?",
        "options": [
          "Immediately severs all active TCP sockets",
          "Stops the server from accepting new connections while allowing existing active requests to complete, then invokes the callback when all connections close",
          "Deletes the server code from the file system",
          "Closes the terminal window"
        ],
        "correctAnswer": "Stops the server from accepting new connections while allowing existing active requests to complete, then invokes the callback when all connections close",
        "explanation": "`server.close()` stops listening for new connections while gracefully waiting for existing connections to close."
      },
      {
        "question": "Why should a graceful shutdown handler always include a fallback `setTimeout` with `process.exit(1)`?",
        "codeSnippet": "process.on('SIGTERM', () => {\n  server.close(() => process.exit(0));\n  setTimeout(() => process.exit(1), 10000).unref();\n});",
        "options": [
          "To speed up garbage collection",
          "To retry connecting to the database",
          "To guarantee the process terminates even if an in-flight request or hanging database query hangs indefinitely",
          "Because Kubernetes requires a 10-second sleep"
        ],
        "correctAnswer": "To guarantee the process terminates even if an in-flight request or hanging database query hangs indefinitely",
        "explanation": "A failsafe timeout ensures the shutdown does not hang forever if an open socket or infinite loop blocks closure."
      }
    ]
  },
  {
    "title": "Node.js: Child Process Fork & IPC Channels",
    "description": "child_process.fork, IPC channels, send/message events, and node-to-node communication.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Process"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What makes `child_process.fork()` special compared to `child_process.spawn()`?",
        "options": [
          "`fork()` runs code in the same thread",
          "`fork()` can only run Python scripts",
          "`fork()` runs without V8",
          "`fork()` is a special case of `spawn()` tailored specifically for spawning new Node.js processes, establishing a built-in Inter-Process Communication (IPC) channel automatically"
        ],
        "correctAnswer": "`fork()` is a special case of `spawn()` tailored specifically for spawning new Node.js processes, establishing a built-in Inter-Process Communication (IPC) channel automatically",
        "explanation": "`fork()` spawns a new Node.js process and creates an IPC communication channel between parent and child."
      },
      {
        "question": "How does the parent process send a message to a child spawned via `fork()`?",
        "codeSnippet": "const child = fork('./worker.js');\nchild.send({ task: 'compute', payload: 42 });",
        "options": [
          "`child.send(message)`",
          "`child.post(message)`",
          "`child.write(message)`",
          "`child.emitMessage(message)`"
        ],
        "correctAnswer": "`child.send(message)`",
        "explanation": "The IPC channel exposes a `.send()` method on the child process object in the parent."
      },
      {
        "question": "How does the child script listen for messages sent by the parent process?",
        "codeSnippet": "// Inside worker.js:\nprocess.on('message', (msg) => {\n  console.log('Received:', msg);\n});",
        "options": [
          "`process.on('ipc', callback)`",
          "`process.on('message', callback)`",
          "`process.readMessage(callback)`",
          "`window.onmessage = callback`"
        ],
        "correctAnswer": "`process.on('message', callback)`",
        "explanation": "In the child process, incoming IPC messages are received by listening to `'message'` on the global `process` object."
      },
      {
        "question": "Can an HTTP server handle or socket handle be passed from parent to child over an IPC channel?",
        "codeSnippet": "child.send('server', serverHandle);",
        "options": [
          "No, handles cannot cross process boundaries",
          "Only if serialized to JSON",
          "Yes, Node.js IPC channels support passing native server or socket handles as an optional second argument to `send()`",
          "Only in Windows environments"
        ],
        "correctAnswer": "Yes, Node.js IPC channels support passing native server or socket handles as an optional second argument to `send()`",
        "explanation": "Node allows passing underlying socket/server handles across IPC, which is the foundational mechanism behind `cluster`."
      },
      {
        "question": "How do you disconnect the IPC channel and allow the child process to exit gracefully?",
        "codeSnippet": "child.disconnect();",
        "options": [
          "`child.closeIPC()`",
          "`child.kill('IPC')`",
          "`delete child.ipc`",
          "`child.disconnect()`"
        ],
        "correctAnswer": "`child.disconnect()`",
        "explanation": "Calling `child.disconnect()` closes the IPC channel between the parent and child, removing the IPC event loop handle."
      }
    ]
  },
  {
    "title": "Node.js: File Descriptors & Low-Level fs",
    "description": "fs.open, file descriptor integers, read/write offsets, and flags ('r', 'w', 'a+').",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Filesystem"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is a 'File Descriptor' (fd) returned by `fs.open()`?",
        "codeSnippet": "const fd = await fs.open('log.txt', 'r');",
        "options": [
          "A non-negative integer representing an open file table entry managed by the operating system kernel",
          "A pointer to a C++ struct on the V8 heap",
          "A string containing the file path",
          "A cryptographic file hash"
        ],
        "correctAnswer": "A non-negative integer representing an open file table entry managed by the operating system kernel",
        "explanation": "In operating systems, a file descriptor is an integer referencing an open file in the kernel's file table."
      },
      {
        "question": "What standard file descriptors are represented by 0, 1, and 2 in operating systems and Node.js?",
        "options": [
          "0 = root, 1 = user, 2 = temp",
          "0 = stdin, 1 = stdout, 2 = stderr",
          "0 = read, 1 = write, 2 = execute",
          "0 = TCP, 1 = UDP, 2 = HTTP"
        ],
        "correctAnswer": "0 = stdin, 1 = stdout, 2 = stderr",
        "explanation": "By convention across POSIX and Windows, `0` is standard input, `1` is standard output, and `2` is standard error."
      },
      {
        "question": "What does the file flag `'a+'` signify when opening a file?",
        "options": [
          "Open file for writing only, truncating existing contents to zero length",
          "Open file in asynchronous mode",
          "Open file for reading and appending; the file is created if it does not exist",
          "Open file with administrator privileges"
        ],
        "correctAnswer": "Open file for reading and appending; the file is created if it does not exist",
        "explanation": "`'a+'` opens for reading and appending. Output is always appended to the end of the file; creates file if missing."
      },
      {
        "question": "Why is it critical to always close an opened file descriptor using `fd.close()`?",
        "options": [
          "The file is deleted from disk if left open",
          "Node.js crashes the operating system",
          "It wipes out the contents of the file",
          "Operating systems have a hard limit on open file descriptors (`ulimit -n`); failing to close them causes file descriptor leaks (`EMFILE: too many open files`)"
        ],
        "correctAnswer": "Operating systems have a hard limit on open file descriptors (`ulimit -n`); failing to close them causes file descriptor leaks (`EMFILE: too many open files`)",
        "explanation": "Leaking open file descriptors exhausts system limits, eventually throwing `EMFILE: too many open files` across the entire process."
      },
      {
        "question": "What does `fs.fstat(fd)` return?",
        "options": [
          "A `Stats` object containing file metadata (size, permissions, creation/modification times) for the given open file descriptor",
          "The status of the disk controller",
          "The network latency to the file server",
          "The number of lines in the file"
        ],
        "correctAnswer": "A `Stats` object containing file metadata (size, permissions, creation/modification times) for the given open file descriptor",
        "explanation": "`fstat` operates directly on the open file descriptor to inspect file size, timestamps, mode, and inode numbers."
      }
    ]
  },
  {
    "title": "Node.js: Compression & Zlib Streams",
    "description": "zlib.createGzip, Brotli compression, and stream compression pipelines.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Compression"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How do you compress a file using Gzip in a streaming pipeline?",
        "codeSnippet": "import zlib from 'zlib';\nimport fs from 'fs';\nimport { pipeline } from 'stream/promises';\n\nawait pipeline(\n  fs.createReadStream('input.txt'),\n  zlib.createGzip(),\n  fs.createWriteStream('input.txt.gz')\n);",
        "options": [
          "Call `zlib.compressFile('input.txt')`",
          "Pipe the readable file stream through `zlib.createGzip()` into a writable file stream",
          "Use `fs.gzip('input.txt')`",
          "Convert the file to a string and call `string.zip()`"
        ],
        "correctAnswer": "Pipe the readable file stream through `zlib.createGzip()` into a writable file stream",
        "explanation": "`zlib.createGzip()` is a Transform stream that accepts uncompressed chunks and emits compressed gzip chunks."
      },
      {
        "question": "What compression algorithm provided by Node's `zlib` module typically achieves higher compression ratios than Gzip for web assets?",
        "options": [
          "Deflate",
          "Zip",
          "Brotli (`zlib.createBrotliCompress()`)",
          "Tar"
        ],
        "correctAnswer": "Brotli (`zlib.createBrotliCompress()`)",
        "explanation": "Brotli (`br`) generally achieves 15-25% smaller file sizes than gzip for HTML, CSS, and JS text assets."
      },
      {
        "question": "What HTTP response header informs the browser that the response body is compressed with gzip?",
        "codeSnippet": "res.writeHead(200, { 'Content-Encoding': 'gzip' });",
        "options": [
          "`Accept-Encoding: gzip`",
          "`Content-Type: application/gzip`",
          "`Transfer-Mode: gzip`",
          "`Content-Encoding: gzip`"
        ],
        "correctAnswer": "`Content-Encoding: gzip`",
        "explanation": "`Content-Encoding: gzip` tells the client browser to decompress the incoming HTTP response body before parsing."
      },
      {
        "question": "What incoming request header indicates which compression algorithms the client browser supports?",
        "options": [
          "`Accept-Encoding` (e.g. `gzip, deflate, br`)",
          "`Content-Encoding`",
          "`Compress-Type`",
          "`Encoding-Support`"
        ],
        "correctAnswer": "`Accept-Encoding` (e.g. `gzip, deflate, br`)",
        "explanation": "Browsers send `Accept-Encoding: gzip, deflate, br` to inform servers of their supported decompression capabilities."
      },
      {
        "question": "What popular Express middleware automatically compresses response bodies based on `Accept-Encoding`?",
        "options": [
          "`express-gzip`",
          "`compression` (`app.use(compression())`)",
          "`body-compressor`",
          "`zlib-middleware`"
        ],
        "correctAnswer": "`compression` (`app.use(compression())`)",
        "explanation": "The standard `compression` middleware intercepts responses and compresses them with Gzip or Brotli when appropriate."
      }
    ]
  },
  {
    "title": "Node.js: TLS/SSL & HTTPS Servers",
    "description": "https.createServer, key/cert options, TLS handshakes, and self-signed certificates.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Security"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What two files are fundamentally required to create an HTTPS server using Node's `https` module?",
        "codeSnippet": "import https from 'https';\nconst server = https.createServer({\n  key: fs.readFileSync('server.key'),\n  cert: fs.readFileSync('server.cert')\n}, handler);",
        "options": [
          "A username and password",
          "A database file and a .env file",
          "A private key (`key`) and an SSL/TLS public certificate (`cert`)",
          "Two certificate authorities"
        ],
        "correctAnswer": "A private key (`key`) and an SSL/TLS public certificate (`cert`)",
        "explanation": "HTTPS requires a private key for decryption and a digital certificate to prove server identity to clients."
      },
      {
        "question": "Why should `server.key` (the private key) be kept strictly confidential on the server?",
        "options": [
          "Because Node.js will not start if the file is shared",
          "Because private keys expire in 24 hours",
          "It contains the root password to the server",
          "Anyone with the private key can decrypt intercepted traffic and impersonate the server in Man-in-the-Middle (MITM) attacks"
        ],
        "correctAnswer": "Anyone with the private key can decrypt intercepted traffic and impersonate the server in Man-in-the-Middle (MITM) attacks",
        "explanation": "The private key is the foundation of TLS encryption; compromising it breaks encryption and authentication."
      },
      {
        "question": "What error does Node.js throw when making an `https.request` to a server with an untrusted self-signed certificate?",
        "options": [
          "`DEPTH_ZERO_SELF_SIGNED_CERT`",
          "`INVALID_PROTOCOL`",
          "`HTTP_FAIL_500`",
          "`PORT_BLOCKED`"
        ],
        "correctAnswer": "`DEPTH_ZERO_SELF_SIGNED_CERT`",
        "explanation": "Node verifies certificates against built-in Mozilla root CAs, rejecting self-signed certs with `DEPTH_ZERO_SELF_SIGNED_CERT`."
      },
      {
        "question": "What is Server Name Indication (SNI) in Node.js HTTPS servers?",
        "options": [
          "A DNS caching algorithm",
          "A TLS extension that allows a single server IP address to host multiple SSL certificates for different domain names",
          "A method of naming servers in a cluster",
          "A protocol for compressing certificates"
        ],
        "correctAnswer": "A TLS extension that allows a single server IP address to host multiple SSL certificates for different domain names",
        "explanation": "SNI passes the requested domain during the initial TLS handshake so the server can present the correct certificate."
      },
      {
        "question": "Why is TLS termination commonly handled by a reverse proxy (Nginx, Cloudflare, AWS ALB) rather than raw Node.js?",
        "options": [
          "Node.js cannot run HTTPS in production",
          "Browsers reject HTTPS connections from Node.js",
          "Reverse proxies offload intensive cryptographic operations from Node's event loop and provide centralized certificate management",
          "Node.js only supports HTTP/1.0"
        ],
        "correctAnswer": "Reverse proxies offload intensive cryptographic operations from Node's event loop and provide centralized certificate management",
        "explanation": "Offloading TLS to dedicated proxies frees Node to handle application logic and simplifies cert renewals (e.g. Let's Encrypt)."
      }
    ]
  },
  {
    "title": "Node.js: DNS Resolution & Thread Pool Gotchas",
    "description": "dns.lookup vs dns.resolve, libuv thread pool blocking, and getaddrinfo subtleties.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Internals"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the critical behavioral difference between `dns.lookup()` and `dns.resolve()`?",
        "options": [
          "`dns.resolve` only works for IPv6 addresses",
          "`dns.lookup` runs in the browser; `dns.resolve` on the server",
          "There is no difference",
          "`dns.lookup` uses the operating system's synchronous `getaddrinfo(3)` call executed inside the Libuv thread pool; `dns.resolve` performs network DNS queries asynchronously without using the thread pool"
        ],
        "correctAnswer": "`dns.lookup` uses the operating system's synchronous `getaddrinfo(3)` call executed inside the Libuv thread pool; `dns.resolve` performs network DNS queries asynchronously without using the thread pool",
        "explanation": "`dns.lookup` calls OS-level `getaddrinfo`, utilizing one of the 4 Libuv worker threads. `dns.resolve` uses c-ares for pure async network resolution."
      },
      {
        "question": "Why can making thousands of outbound HTTP requests concurrently in Node.js experience unexpected latency?",
        "options": [
          "Node's default `http.request` uses `dns.lookup()`, exhausting the default 4-thread Libuv pool and queuing subsequent DNS lookups",
          "TCP only allows 10 concurrent connections",
          "V8 garbage collector locks on DNS queries",
          "HTTP requests cannot be made concurrently"
        ],
        "correctAnswer": "Node's default `http.request` uses `dns.lookup()`, exhausting the default 4-thread Libuv pool and queuing subsequent DNS lookups",
        "explanation": "Because `http.request` defaults to `dns.lookup`, many concurrent requests saturate the 4 Libuv worker threads, blocking lookups."
      },
      {
        "question": "How can you increase the size of the Libuv worker thread pool to alleviate thread starvation?",
        "options": [
          "Call `process.setThreadPoolSize(64)` inside the script",
          "Set the environment variable `UV_THREADPOOL_SIZE=64` before the Node.js process starts",
          "Pass `--threads 64` to `node`",
          "Add `\"threads\": 64` to `package.json`"
        ],
        "correctAnswer": "Set the environment variable `UV_THREADPOOL_SIZE=64` before the Node.js process starts",
        "explanation": "`UV_THREADPOOL_SIZE` must be set in the shell environment before Node starts up (up to a maximum of 1024 threads)."
      },
      {
        "question": "Which operations in Node.js utilize the Libuv worker thread pool rather than OS non-blocking notifications?",
        "options": [
          "TCP network sockets and HTTP connections",
          "`setTimeout` and `setInterval` timers",
          "`fs.*` filesystem operations, `crypto.pbkdf2` / randomBytes, `dns.lookup`, and `zlib` compression",
          "All JavaScript async functions"
        ],
        "correctAnswer": "`fs.*` filesystem operations, `crypto.pbkdf2` / randomBytes, `dns.lookup`, and `zlib` compression",
        "explanation": "Network sockets use OS polling (epoll/kqueue); file I/O, heavy crypto, zlib, and `dns.lookup` run in the Libuv thread pool."
      },
      {
        "question": "What does `dns.resolve4('google.com')` return?",
        "codeSnippet": "const addresses = await dns.promises.resolve4('google.com');",
        "options": [
          "A single IP address string",
          "An array of IPv6 addresses",
          "A DNS header object",
          "An array of IPv4 address strings"
        ],
        "correctAnswer": "An array of IPv4 address strings",
        "explanation": "`resolve4` queries DNS A records directly, returning an array of resolved IPv4 strings."
      }
    ]
  },
  {
    "title": "Node.js: Session Management & Cookies",
    "description": "httpOnly, secure, sameSite flags, express-session, and session store persistence.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Security"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does the `httpOnly: true` flag on a cookie prevent?",
        "codeSnippet": "res.cookie('sessionId', id, { httpOnly: true, secure: true });",
        "options": [
          "Prevents client-side JavaScript (`document.cookie`) from accessing the cookie, protecting it against Cross-Site Scripting (XSS) theft",
          "Forces the cookie to be sent over HTTP only, forbidding HTTPS",
          "Deletes the cookie when the browser closes",
          "Disables cookie caching on proxy servers"
        ],
        "correctAnswer": "Prevents client-side JavaScript (`document.cookie`) from accessing the cookie, protecting it against Cross-Site Scripting (XSS) theft",
        "explanation": "`httpOnly` prevents malicious JavaScript from reading session cookies via XSS attacks."
      },
      {
        "question": "What does the `SameSite: 'Lax'` cookie attribute provide?",
        "options": [
          "Allows cookies to be shared across any website on the internet",
          "Mitigates Cross-Site Request Forgery (CSRF) by preventing the cookie from being sent on cross-origin subrequests (like images or fetch), while permitting top-level navigation",
          "Restricts cookies to localhost only",
          "Encrypts the cookie payload with AES"
        ],
        "correctAnswer": "Mitigates Cross-Site Request Forgery (CSRF) by preventing the cookie from being sent on cross-origin subrequests (like images or fetch), while permitting top-level navigation",
        "explanation": "`SameSite=Lax` blocks cookies on cross-origin AJAX/POST requests while allowing them when following external links."
      },
      {
        "question": "Why should `MemoryStore` NEVER be used in production with `express-session`?",
        "options": [
          "It is limited to 10 users",
          "It crashes if cookies exceed 100 bytes",
          "It leaks memory, does not scale across multiple process instances or servers, and loses all active user sessions on process restart",
          "It requires root privileges to run"
        ],
        "correctAnswer": "It leaks memory, does not scale across multiple process instances or servers, and loses all active user sessions on process restart",
        "explanation": "`MemoryStore` stores sessions in process RAM, which doesn't scale across clusters and drops sessions on deployment. Use Redis or a database store."
      },
      {
        "question": "What does the `secure: true` flag on a cookie enforce?",
        "options": [
          "The cookie value is encrypted on the client",
          "The cookie can only be set by root users",
          "The cookie cannot be edited in browser dev tools",
          "The browser will only transmit the cookie over encrypted HTTPS connections (never unencrypted HTTP)"
        ],
        "correctAnswer": "The browser will only transmit the cookie over encrypted HTTPS connections (never unencrypted HTTP)",
        "explanation": "`secure: true` guarantees the cookie is only sent across HTTPS, protecting session tokens from plain-text eavesdropping."
      },
      {
        "question": "How does signed cookie verification work in `cookie-parser`?",
        "codeSnippet": "app.use(cookieParser('secret-signing-key'));\nres.cookie('user', 'alex', { signed: true });",
        "options": [
          "It appends an HMAC signature of the cookie value; if a client tampers with the value, the signature check fails and `req.signedCookies` rejects it",
          "It encrypts the cookie using RSA public keys",
          "It saves a copy of the cookie in a secret database",
          "It sends the cookie to a government CA"
        ],
        "correctAnswer": "It appends an HMAC signature of the cookie value; if a client tampers with the value, the signature check fails and `req.signedCookies` rejects it",
        "explanation": "Signing appends an HMAC signature (`s:val.signature`), detecting unauthorized tampering by the client."
      }
    ]
  },
  {
    "title": "Node.js: Rate Limiting & DoS Protection",
    "description": "express-rate-limit, IP-based sliding windows, Redis store distribution, and DoS mitigation.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Security"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What HTTP status code is standard when a client exceeds an API rate limit?",
        "options": [
          "`403 Forbidden`",
          "`429 Too Many Requests`",
          "`503 Service Unavailable`",
          "`400 Bad Request`"
        ],
        "correctAnswer": "`429 Too Many Requests`",
        "explanation": "HTTP `429 Too Many Requests` indicates the client has sent too many requests in a given amount of time."
      },
      {
        "question": "Why is a shared store (like Redis) required when implementing rate limiting in a clustered or multi-container environment?",
        "options": [
          "Redis is required by Express rate limit middleware",
          "In-memory stores can only count up to 10 requests",
          "In-memory rate limiters track requests per process; without a shared store, clients can bypass limits by hitting different worker processes or container replicas",
          "Operating systems forbid rate limiting without Redis"
        ],
        "correctAnswer": "In-memory rate limiters track requests per process; without a shared store, clients can bypass limits by hitting different worker processes or container replicas",
        "explanation": "A centralized store (like Redis) maintains consistent, shared rate limit counters across all server instances and processes."
      },
      {
        "question": "Why must `app.set('trust proxy', 1)` be enabled in Express when running behind a reverse proxy (like Nginx, Heroku, or AWS ALB) with rate limiters?",
        "options": [
          "To allow Express to read HTTPS cookies",
          "To speed up routing calculations",
          "To disable Cross-Origin Request Sharing",
          "Without it, `req.ip` returns the internal reverse proxy's IP address, causing all users to share a single rate limit bucket and get blocked together"
        ],
        "correctAnswer": "Without it, `req.ip` returns the internal reverse proxy's IP address, causing all users to share a single rate limit bucket and get blocked together",
        "explanation": "`trust proxy` instructs Express to trust `X-Forwarded-For` headers so `req.ip` reflects the real client IP instead of the load balancer IP."
      },
      {
        "question": "What header informs the client how many seconds they must wait before making another request after receiving a 429?",
        "options": [
          "`Retry-After`",
          "`Wait-Time`",
          "`Rate-Limit-Delay`",
          "`Cooldown`"
        ],
        "correctAnswer": "`Retry-After`",
        "explanation": "The standard `Retry-After` header indicates how long the client should wait before making a follow-up request."
      },
      {
        "question": "How does a 'Sliding Window Counter' rate limiting algorithm improve upon a 'Fixed Window' algorithm?",
        "options": [
          "It eliminates the need for timestamps",
          "It prevents request bursts at window boundaries (e.g. 100 requests at 11:59 followed by 100 requests at 12:00) from exceeding the intended rate limit",
          "It works without any CPU calculations",
          "It runs client-side in JavaScript"
        ],
        "correctAnswer": "It prevents request bursts at window boundaries (e.g. 100 requests at 11:59 followed by 100 requests at 12:00) from exceeding the intended rate limit",
        "explanation": "Fixed windows permit double the quota around boundary resets; sliding windows smooth out request counting continuously."
      }
    ]
  },
  {
    "title": "Node.js: MongoDB Connection Management",
    "description": "Mongoose connection pools, buffered commands, indexing, and connection states.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Database"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does Mongoose 'Command Buffering' do when an application performs queries before `mongoose.connect()` has resolved?",
        "options": [
          "It throws an immediate `NotConnectedError`",
          "It sends the queries to SQLite instead",
          "Mongoose queues the queries in memory and executes them automatically once the database connection successfully opens",
          "It crashes the Node process"
        ],
        "correctAnswer": "Mongoose queues the queries in memory and executes them automatically once the database connection successfully opens",
        "explanation": "Mongoose buffers queries by default until connected. However, if the connection fails, queued queries can cause memory leaks if unhandled."
      },
      {
        "question": "What option controls the maximum number of concurrent socket connections maintained in the MongoDB driver connection pool?",
        "codeSnippet": "mongoose.connect(uri, { maxPoolSize: 50 });",
        "options": [
          "`poolCount`",
          "`connectionLimit`",
          "`socketLimit`",
          "`maxPoolSize` (default 100)"
        ],
        "correctAnswer": "`maxPoolSize` (default 100)",
        "explanation": "`maxPoolSize` configures the maximum number of simultaneous socket connections open to the MongoDB server."
      },
      {
        "question": "Why should `autoIndex: false` be set in production environments when using Mongoose?",
        "codeSnippet": "mongoose.connect(uri, { autoIndex: false });",
        "options": [
          "Building indexes automatically on startup can severely degrade database performance and cause query stalls during production deployments",
          "Indexes are unsupported in production MongoDB",
          "Auto-indexing deletes existing database collections",
          "Mongoose indexes are deprecated"
        ],
        "correctAnswer": "Building indexes automatically on startup can severely degrade database performance and cause query stalls during production deployments",
        "explanation": "Building indexes on large collections in production can lock collections and consume CPU; indexes should be built via migration scripts."
      },
      {
        "question": "What does calling `.lean()` on a Mongoose query achieve?",
        "codeSnippet": "const users = await User.find().lean();",
        "options": [
          "Deletes null fields from documents",
          "Returns plain JavaScript objects instead of heavy Mongoose Documents, dramatically reducing memory usage and query execution time",
          "Compresses the returned JSON over the wire",
          "Performs a dry run without querying the database"
        ],
        "correctAnswer": "Returns plain JavaScript objects instead of heavy Mongoose Documents, dramatically reducing memory usage and query execution time",
        "explanation": "`.lean()` skips instantiating Mongoose Document wrappers (getters, setters, internal state), making read queries much faster."
      },
      {
        "question": "How do you detect when a MongoDB connection has been lost in Mongoose?",
        "codeSnippet": "mongoose.connection.on('disconnected', () => {\n  console.warn('Lost MongoDB connection');\n});",
        "options": [
          "Check `process.databaseState`",
          "Wrap every query in `try...catch`",
          "Listen to `mongoose.connection.on('disconnected', ...)`",
          "Poll the database every second"
        ],
        "correctAnswer": "Listen to `mongoose.connection.on('disconnected', ...)`",
        "explanation": "Mongoose's connection emits lifecycle events (`connected`, `disconnected`, `error`, `reconnected`) for monitoring."
      }
    ]
  },
  {
    "title": "Node.js: JWT Authentication & Verification",
    "description": "jsonwebtoken, sign, verify, token expiration, and Bearer token headers.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Auth"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What are the three parts of a JSON Web Token (JWT) separated by dots?",
        "codeSnippet": "header.payload.signature",
        "options": [
          "Username, Password, and Domain",
          "Encryption key, Data, and Timestamp",
          "Host, Path, and Query",
          "Header (algorithm & token type), Payload (claims/data), and Signature (cryptographic verification hash)"
        ],
        "correctAnswer": "Header (algorithm & token type), Payload (claims/data), and Signature (cryptographic verification hash)",
        "explanation": "A JWT consists of three base64url-encoded parts: Header, Payload, and Signature, joined by dots."
      },
      {
        "question": "Why must sensitive secrets (like passwords or credit card numbers) NEVER be stored in a standard JWT payload?",
        "options": [
          "The payload is only Base64URL-encoded, NOT encrypted; anyone with the token can decode and read the claims in plain text",
          "JWT payloads are deleted after 5 minutes",
          "JWT tokens can only store numbers",
          "Tokens are rejected by browsers if they contain strings"
        ],
        "correctAnswer": "The payload is only Base64URL-encoded, NOT encrypted; anyone with the token can decode and read the claims in plain text",
        "explanation": "A standard JWT is digitally signed, not encrypted. The contents are readable by anyone who inspects the base64 string."
      },
      {
        "question": "What error does `jwt.verify()` throw if the token's `exp` timestamp has passed?",
        "options": [
          "`InvalidTokenError`",
          "`TokenExpiredError`",
          "`TimeoutError`",
          "`AuthExpiredException`"
        ],
        "correctAnswer": "`TokenExpiredError`",
        "explanation": "`jwt.verify()` validates the `exp` claim and throws a `TokenExpiredError` (`jwt expired`) if the token is past its expiration date."
      },
      {
        "question": "How should a client send a JWT in HTTP requests according to standard conventions?",
        "codeSnippet": "Authorization: Bearer <token>",
        "options": [
          "In a query parameter `?jwt=<token>`",
          "In the `User-Agent` header",
          "In the `Authorization` header prefixed with `'Bearer '`",
          "In the HTTP body JSON key `jwt`"
        ],
        "correctAnswer": "In the `Authorization` header prefixed with `'Bearer '`",
        "explanation": "Standard authentication sends credentials via `Authorization: Bearer <token>`."
      },
      {
        "question": "What is the security advantage of using asymmetric signing algorithms (like RS256) over symmetric algorithms (like HS256)?",
        "options": [
          "RS256 tokens never expire",
          "RS256 produces tokens with zero bytes",
          "HS256 is deprecated in HTTP/2",
          "The authentication service signs tokens with a private key, while other microservices can verify tokens using only the public key without possessing the signing secret"
        ],
        "correctAnswer": "The authentication service signs tokens with a private key, while other microservices can verify tokens using only the public key without possessing the signing secret",
        "explanation": "Asymmetric cryptography allows distributing the public key widely for token verification without risking the private signing key."
      }
    ]
  },
  {
    "title": "Node.js: CORS & Cross-Origin Resource Sharing",
    "description": "CORS preflight OPTIONS requests, allowed origins, and credentials handling.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Express"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the purpose of an HTTP `OPTIONS` preflight request in CORS?",
        "options": [
          "The browser automatically sends an OPTIONS request before certain cross-origin requests (e.g. non-simple methods or custom headers) to verify if the server permits the operation",
          "To test if the internet connection is active",
          "To authenticate the user's password",
          "To compress the HTTP payload"
        ],
        "correctAnswer": "The browser automatically sends an OPTIONS request before certain cross-origin requests (e.g. non-simple methods or custom headers) to verify if the server permits the operation",
        "explanation": "Preflight checks ask the server: 'Do you permit PUT/DELETE or custom headers from my origin?' before dispatching the real request."
      },
      {
        "question": "What header must the server return to allow a frontend at `https://myapp.com` to read the response?",
        "codeSnippet": "res.setHeader('Access-Control-Allow-Origin', 'https://myapp.com');",
        "options": [
          "`Allow-Cross-Domain: https://myapp.com`",
          "`Access-Control-Allow-Origin: https://myapp.com`",
          "`CORS-Origin: true`",
          "`Origin-Accept: https://myapp.com`"
        ],
        "correctAnswer": "`Access-Control-Allow-Origin: https://myapp.com`",
        "explanation": "`Access-Control-Allow-Origin` specifies which origins are granted access to read the response data."
      },
      {
        "question": "Why will a browser reject a cross-origin request if the server responds with `Access-Control-Allow-Origin: *` AND the request included `credentials: 'include'` (cookies)?",
        "options": [
          "Wildcards are not supported in HTTP/1.1",
          "Cookies cannot be sent across domains",
          "The CORS specification strictly forbids the wildcard `*` when credentials/cookies are enabled, requiring the server to echo the exact explicit origin",
          "The browser automatically clears all cookies"
        ],
        "correctAnswer": "The CORS specification strictly forbids the wildcard `*` when credentials/cookies are enabled, requiring the server to echo the exact explicit origin",
        "explanation": "For security, credentialed requests require an explicit `Access-Control-Allow-Origin` and `Access-Control-Allow-Credentials: true`."
      },
      {
        "question": "Is CORS enforced by the server or by the client browser?",
        "options": [
          "CORS is enforced exclusively by the server firewall",
          "CORS is enforced by the DNS server",
          "CORS is enforced by the operating system kernel",
          "CORS is enforced by the client browser: the server actually processes the request and returns data, but the browser blocks JavaScript from reading it if headers mismatch"
        ],
        "correctAnswer": "CORS is enforced by the client browser: the server actually processes the request and returns data, but the browser blocks JavaScript from reading it if headers mismatch",
        "explanation": "CORS is a browser security policy. Backend servers process the request normally, but the browser withholds the response from web scripts."
      },
      {
        "question": "How do you configure the popular `cors` npm package in Express to allow only specific domains?",
        "codeSnippet": "app.use(cors({\n  origin: ['https://admin.example.com', 'https://app.example.com'],\n  credentials: true\n}));",
        "options": [
          "Pass an array or function to the `origin` option in `cors({ origin: [...] })`",
          "Pass `domains: [...]`",
          "Set `process.env.CORS_DOMAINS`",
          "Add domains to package.json"
        ],
        "correctAnswer": "Pass an array or function to the `origin` option in `cors({ origin: [...] })`",
        "explanation": "The `origin` configuration property accepts a string, regex, array of allowed origins, or a dynamic validator function."
      }
    ]
  },
  {
    "title": "Node.js: Structured Logging with Winston & Pino",
    "description": "JSON log formats, log levels, transports, and avoiding console.log in production.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Logging"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Why is structured JSON logging preferred over plain text strings in production Node.js applications?",
        "codeSnippet": "logger.info({ event: 'user_signup', userId: 42, durationMs: 120 });",
        "options": [
          "JSON logs take up 90% less disk space",
          "JSON logs can be easily parsed, indexed, filtered, and aggregated by log management systems (Datadog, ElasticSearch, CloudWatch)",
          "JSON logs are encrypted automatically",
          "Plain text logs are illegal in cloud environments"
        ],
        "correctAnswer": "JSON logs can be easily parsed, indexed, filtered, and aggregated by log management systems (Datadog, ElasticSearch, CloudWatch)",
        "explanation": "Machine-readable structured JSON logs allow centralized log analysis tools to query attributes (e.g. `userId`, `statusCode`) easily."
      },
      {
        "question": "Why is `Pino` known for exceptionally high performance compared to traditional loggers?",
        "options": [
          "It writes logs directly to the GPU",
          "It skips logging errors in production",
          "It minimizes object allocations and uses extreme asynchronous streaming, avoiding blocking the event loop on log serialization",
          "It only logs once per minute"
        ],
        "correctAnswer": "It minimizes object allocations and uses extreme asynchronous streaming, avoiding blocking the event loop on log serialization",
        "explanation": "Pino is engineered for minimal overhead, writing fast JSON streams without tying up the single-threaded event loop."
      },
      {
        "question": "What is a 'Transport' in logging libraries like Winston?",
        "codeSnippet": "const logger = winston.createLogger({\n  transports: [\n    new winston.transports.Console(),\n    new winston.transports.File({ filename: 'combined.log' })\n  ]\n});",
        "options": [
          "A network router that forwards packets",
          "A Docker container layer",
          "An HTTP redirect protocol",
          "A storage/destination device for logs (e.g. Console, File, HTTP endpoint, database)"
        ],
        "correctAnswer": "A storage/destination device for logs (e.g. Console, File, HTTP endpoint, database)",
        "explanation": "Transports define where logs are sent: stdout, rotating log files, remote syslog, or cloud monitoring endpoints."
      },
      {
        "question": "What is the standard hierarchy of log levels in RFC 5424 (from highest severity to lowest)?",
        "options": [
          "`error`, `warn`, `info`, `http`, `verbose`, `debug`, `silly`",
          "`info`, `warn`, `error`",
          "`debug`, `info`, `critical`, `fatal`",
          "`low`, `medium`, `high`, `critical`"
        ],
        "correctAnswer": "`error`, `warn`, `info`, `http`, `verbose`, `debug`, `silly`",
        "explanation": "Setting a log level (e.g. `info`) outputs all logs at that level and higher, suppressing lower severity logs (e.g. `debug`)."
      },
      {
        "question": "Why is using synchronous file transports in logging libraries dangerous under high server traffic?",
        "options": [
          "It deletes the log file if full",
          "Writing logs synchronously blocks the Node.js event loop on every request, causing severe response latency spikes",
          "It bypasses operating system security",
          "It crashes the server if the file name has a space"
        ],
        "correctAnswer": "Writing logs synchronously blocks the Node.js event loop on every request, causing severe response latency spikes",
        "explanation": "Synchronous disk writes stall the event loop. Production logging should always stream to stdout asynchronously."
      }
    ]
  },
  {
    "title": "Node.js: File Uploads with Multer",
    "description": "multipart/form-data, memoryStorage vs diskStorage, file size limits, and mime filtering.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Express"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What encoding type (`enctype`) must an HTML form use to successfully upload files via Multer?",
        "codeSnippet": "<form method=\"POST\" enctype=\"multipart/form-data\">",
        "options": [
          "`application/x-www-form-urlencoded`",
          "`text/plain`",
          "`multipart/form-data`",
          "`application/json`"
        ],
        "correctAnswer": "`multipart/form-data`",
        "explanation": "Multer is specifically designed to handle `multipart/form-data` requests containing binary file boundaries."
      },
      {
        "question": "What is the primary risk of using `multer.memoryStorage()` for large file uploads?",
        "options": [
          "The file is written to the root hard drive",
          "Memory storage deletes files immediately",
          "Memory storage converts all files to plain text",
          "The uploaded file is buffered entirely in RAM, which can easily exhaust Node.js heap memory and crash the process under concurrent uploads"
        ],
        "correctAnswer": "The uploaded file is buffered entirely in RAM, which can easily exhaust Node.js heap memory and crash the process under concurrent uploads",
        "explanation": "Buffering large files in RAM risks Out-Of-Memory crashes. Use `diskStorage` or stream files directly to cloud storage (S3)."
      },
      {
        "question": "How do you restrict file uploads to images only (JPEG/PNG) in Multer?",
        "codeSnippet": "const upload = multer({\n  fileFilter: (req, file, cb) => {\n    if (file.mimetype.startsWith('image/')) cb(null, true);\n    else cb(new Error('Only images allowed'), false);\n  }\n});",
        "options": [
          "Implement the `fileFilter(req, file, cb)` callback and check `file.mimetype`",
          "Set `accept: 'image/*'` in package.json",
          "Filter by file extension on the frontend only",
          "Multer only accepts images by default"
        ],
        "correctAnswer": "Implement the `fileFilter(req, file, cb)` callback and check `file.mimetype`",
        "explanation": "`fileFilter` inspects the file object's `mimetype` and rejects unsupported files before they are written to disk."
      },
      {
        "question": "Where does Multer attach single uploaded file metadata on the Express `req` object?",
        "codeSnippet": "app.post('/upload', upload.single('avatar'), (req, res) => {\n  console.log(req.file.path);\n});",
        "options": [
          "`req.body.file`",
          "`req.file`",
          "`req.files[0]`",
          "`req.uploadedFile`"
        ],
        "correctAnswer": "`req.file`",
        "explanation": "`upload.single('fieldName')` populates `req.file`, while `upload.array()` or `upload.fields()` populates `req.files`."
      },
      {
        "question": "How do you enforce a maximum file size limit (e.g. 5MB) in Multer?",
        "codeSnippet": "const upload = multer({\n  limits: { fileSize: 5 * 1024 * 1024 }\n});",
        "options": [
          "Pass `maxSize: '5MB'`",
          "Check the file size after writing to disk",
          "Configure the `limits: { fileSize: 5 * 1024 * 1024 }` option",
          "Set `process.env.MAX_UPLOAD_SIZE = 5MB`"
        ],
        "correctAnswer": "Configure the `limits: { fileSize: 5 * 1024 * 1024 }` option",
        "explanation": "Setting `limits.fileSize` stops the upload and emits a `LIMIT_FILE_SIZE` error if a file exceeds the byte threshold."
      }
    ]
  },
  {
    "title": "Node.js: Database Migrations in Node.js",
    "description": "Schema versioning, up/down migration scripts, migration runners, and transaction safety.",
    "difficulty": "mid",
    "tags": [
      "Node.js",
      "Database"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the purpose of Database Migrations in production applications?",
        "options": [
          "Migrating from Node.js to Python",
          "Transferring data from one cloud region to another",
          "Compressing SQL databases into zip files",
          "Managing reproducible, version-controlled changes to a database schema and data over time across different environments (dev, staging, production)"
        ],
        "correctAnswer": "Managing reproducible, version-controlled changes to a database schema and data over time across different environments (dev, staging, production)",
        "explanation": "Migrations track schema changes sequentially in code, ensuring all development and production databases stay synchronized."
      },
      {
        "question": "What do the `up` and `down` functions in a typical migration file define?",
        "codeSnippet": "export async function up(db) { ... }\nexport async function down(db) { ... }",
        "options": [
          "`up` applies the new changes; `down` rolls back or reverts those exact changes if a deployment needs to be undone",
          "`up` increases server RAM; `down` decreases server RAM",
          "`up` runs on deployment; `down` runs on system reboot",
          "`up` is for PostgreSQL; `down` is for MongoDB"
        ],
        "correctAnswer": "`up` applies the new changes; `down` rolls back or reverts those exact changes if a deployment needs to be undone",
        "explanation": "`up` moves the schema forward to the new version; `down` reverses the migration cleanly in case of a rollback."
      },
      {
        "question": "How do migration runners (like Knex, Prisma, or migrate-mongo) know which migrations have already been applied?",
        "options": [
          "They inspect git commit history at runtime",
          "They record executed migration filenames and timestamps in a dedicated database tracking table/collection (e.g. `migrations`)",
          "They read a local text file on the developer's laptop",
          "They query the npm registry"
        ],
        "correctAnswer": "They record executed migration filenames and timestamps in a dedicated database tracking table/collection (e.g. `migrations`)",
        "explanation": "Migration tools store an internal tracking table in the database itself to detect unapplied migration scripts."
      },
      {
        "question": "Why should schema migrations ideally be executed inside a single database transaction where supported?",
        "options": [
          "Transactions run 10x faster than raw SQL",
          "Transactions eliminate the need for backup copies",
          "If an error occurs halfway through applying the migration, the transaction automatically rolls back all partial changes, preventing a corrupted intermediate schema state",
          "Database drivers require transactions by default"
        ],
        "correctAnswer": "If an error occurs halfway through applying the migration, the transaction automatically rolls back all partial changes, preventing a corrupted intermediate schema state",
        "explanation": "Wrapping migrations in transactions ensures atomicity: either all schema modifications succeed, or none are applied."
      },
      {
        "question": "What is an 'Expand and Contract' (Parallel Run) migration pattern in zero-downtime deployments?",
        "options": [
          "Expanding the server RAM before running migrations",
          "Compressing the database before writing",
          "Running migrations simultaneously on 100 databases",
          "First expanding the schema by adding new columns/tables without removing old ones, deploying code that writes to both, and contracting (deleting old fields) in a later release"
        ],
        "correctAnswer": "First expanding the schema by adding new columns/tables without removing old ones, deploying code that writes to both, and contracting (deleting old fields) in a later release",
        "explanation": "Expand and contract prevents breaking running servers that still expect old columns while deploying new code that uses updated columns."
      }
    ]
  }
];
