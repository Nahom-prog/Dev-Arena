export const nodejsHardQuizzes = [
  {
    "title": "Node.js: Libuv Architecture & Native Event Loop",
    "description": "uv_run loop iterations, epoll/kqueue/IOCP, and platform non-blocking I/O multiplexing.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Internals"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is Libuv's role in the Node.js runtime?",
        "options": [
          "A multi-platform C library providing the event loop, non-blocking asynchronous I/O abstractions (epoll, kqueue, IOCP), and a worker thread pool",
          "The JavaScript compiler that translates JS to bytecode",
          "A CSS styling engine for server components",
          "The package manager responsible for installing node_modules"
        ],
        "correctAnswer": "A multi-platform C library providing the event loop, non-blocking asynchronous I/O abstractions (epoll, kqueue, IOCP), and a worker thread pool",
        "explanation": "Libuv bridges V8 with operating system asynchronous I/O APIs across Linux (epoll), macOS (kqueue), and Windows (IOCP)."
      },
      {
        "question": "How does Libuv determine when the event loop has no more work and can safely terminate?",
        "options": [
          "It terminates after 100 iterations automatically",
          "It checks if there are any active handles (e.g. open sockets, servers, active timers) or active requests (e.g. pending write requests) remaining",
          "When the V8 garbage collector heap reaches zero",
          "When all JavaScript files have been parsed"
        ],
        "correctAnswer": "It checks if there are any active handles (e.g. open sockets, servers, active timers) or active requests (e.g. pending write requests) remaining",
        "explanation": "Libuv counts active handles and pending requests. When `uv__has_active_handles(loop)` and `uv__has_active_reqs(loop)` are both zero, the loop exits."
      },
      {
        "question": "What multiplexing system call does Libuv use on modern Linux systems for non-blocking network socket polling?",
        "options": [
          "`kqueue`",
          "`select`",
          "`epoll` (`epoll_wait`)",
          "`IOCP`"
        ],
        "correctAnswer": "`epoll` (`epoll_wait`)",
        "explanation": "Linux uses `epoll` for O(1) event-driven I/O notifications across tens of thousands of active file descriptors."
      },
      {
        "question": "What does the Poll phase in Libuv do when there are no immediate timers and no queued I/O events?",
        "options": [
          "It spins in a 100% CPU busy-loop",
          "It crashes the process",
          "It terminates immediately",
          "It blocks the thread and waits for incoming I/O events on active sockets up to the timeout of the closest upcoming timer"
        ],
        "correctAnswer": "It blocks the thread and waits for incoming I/O events on active sockets up to the timeout of the closest upcoming timer",
        "explanation": "Libuv sleeps inside `epoll_wait`/`kevent` until an I/O event arrives or the next timer expires, consuming zero CPU while idle."
      },
      {
        "question": "Why can't regular disk file operations on Linux use `epoll` like network sockets?",
        "options": [
          "Linux does not support true non-blocking asynchronous file I/O via epoll; standard disk files are always reported as ready, requiring a thread pool to simulate async I/O",
          "Filesystem drivers are written in Python",
          "Hard drives do not support TCP",
          "Linux prohibits reading files without threads"
        ],
        "correctAnswer": "Linux does not support true non-blocking asynchronous file I/O via epoll; standard disk files are always reported as ready, requiring a thread pool to simulate async I/O",
        "explanation": "Because Linux regular files cannot be polled asynchronously with epoll, Libuv must execute blocking file I/O calls inside worker threads."
      }
    ]
  },
  {
    "title": "Node.js: V8 Engine Internals & Memory Layout",
    "description": "New Space/Nursery, Old Space, semi-space copying, and Mark-Sweep-Compact.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "V8"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What are the two primary memory generations in Google V8's heap layout?",
        "options": [
          "Stack space and Register space",
          "The Young Generation (New Space, divided into From-Space and To-Space) and the Old Generation (Old Pointer Space and Old Data Space)",
          "Thread space and Socket space",
          "CPU cache and RAM cache"
        ],
        "correctAnswer": "The Young Generation (New Space, divided into From-Space and To-Space) and the Old Generation (Old Pointer Space and Old Data Space)",
        "explanation": "V8 organizes memory into the Young Generation for short-lived objects and the Old Generation for surviving, long-lived objects."
      },
      {
        "question": "What garbage collection algorithm is used for the Young Generation in V8?",
        "options": [
          "Mark-Sweep-Compact",
          "Reference Counting",
          "Scavenge GC (Cheney's copying algorithm), which copies surviving objects between two semi-spaces (`From-space` to `To-space`)",
          "Manual pointer deletion"
        ],
        "correctAnswer": "Scavenge GC (Cheney's copying algorithm), which copies surviving objects between two semi-spaces (`From-space` to `To-space`)",
        "explanation": "Scavenge is a fast copying collector optimized for the Generational Hypothesis (most objects die young)."
      },
      {
        "question": "When does an object get promoted from the New Space to the Old Space in V8?",
        "options": [
          "When it exceeds 100 bytes",
          "When it is referenced by a global variable",
          "After 1 hour of server uptime",
          "If the object survives two consecutive Scavenge GC cycles or if `To-space` exceeds 25% occupancy during a scavenge"
        ],
        "correctAnswer": "If the object survives two consecutive Scavenge GC cycles or if `To-space` exceeds 25% occupancy during a scavenge",
        "explanation": "Surviving two Scavenge passes promotes an object to the Old Space for long-term retention."
      },
      {
        "question": "What flag configures the maximum heap size allocated for V8 in Node.js?",
        "options": [
          "`--max-old-space-size=<size_in_mb>` (e.g. `--max-old-space-size=4096`)",
          "`--max-heap=<mb>`",
          "`--v8-ram=<mb>`",
          "`--set-memory=<mb>`"
        ],
        "correctAnswer": "`--max-old-space-size=<size_in_mb>` (e.g. `--max-old-space-size=4096`)",
        "explanation": "`--max-old-space-size` sets the threshold in megabytes at which V8 triggers a full Mark-Sweep-Compact GC before throwing an OOM error."
      },
      {
        "question": "What is 'Major GC' (Mark-Sweep-Compact) in V8?",
        "options": [
          "A script that reboots Node.js",
          "A full garbage collection cycle that traverses the Old Space, marks reachable objects, sweeps dead objects, and compacts fragmented pages to defragment memory",
          "A process that flushes DNS cache",
          "A tool that minifies JavaScript files"
        ],
        "correctAnswer": "A full garbage collection cycle that traverses the Old Space, marks reachable objects, sweeps dead objects, and compacts fragmented pages to defragment memory",
        "explanation": "Major GC reclaims memory in the Old Space by marking live objects, freeing dead ones, and compacting memory to avoid fragmentation."
      }
    ]
  },
  {
    "title": "Node.js: Garbage Collection & Scavenge Cycles",
    "description": "Incremental marking, concurrent sweeping, idle GC, and GC pause monitoring.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "V8"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is 'Incremental Marking' in modern V8 GC?",
        "options": [
          "Incrementing a counter every time a variable is declared",
          "Marking memory blocks with sequential integers",
          "Splitting the marking phase into tiny slices interspersed with JavaScript execution to prevent long, stop-the-world main-thread pauses",
          "Writing GC metrics to a log file incrementally"
        ],
        "correctAnswer": "Splitting the marking phase into tiny slices interspersed with JavaScript execution to prevent long, stop-the-world main-thread pauses",
        "explanation": "Incremental marking breaks the major GC marking phase into micro-steps interleaved with JS execution, reducing latency spikes."
      },
      {
        "question": "How does V8 prevent newly created object references from being missed during incremental marking?",
        "options": [
          "By freezing the CPU cache",
          "By executing all code inside a mutex lock",
          "By restarting the GC pass from scratch",
          "Through a 'Write Barrier' that intercepts pointer writes and colors newly referenced objects grey to ensure they are visited"
        ],
        "correctAnswer": "Through a 'Write Barrier' that intercepts pointer writes and colors newly referenced objects grey to ensure they are visited",
        "explanation": "Write barriers ensure that if running JS code attaches a white (unmarked) object to a black (already marked) object, it gets marked."
      },
      {
        "question": "What flag exposes the internal `gc()` function globally in Node.js for performance benchmarks and testing?",
        "options": [
          "`--expose-gc` (`global.gc()`)",
          "`--enable-gc`",
          "`--allow-gc`",
          "`--gc-manual`"
        ],
        "correctAnswer": "`--expose-gc` (`global.gc()`)",
        "explanation": "Running Node with `--expose-gc` injects the `global.gc()` method into the runtime for explicit garbage collection triggering."
      },
      {
        "question": "How can you programmatically observe garbage collection pause durations using Node's `perf_hooks`?",
        "codeSnippet": "import { PerformanceObserver } from 'perf_hooks';\nconst obs = new PerformanceObserver((list) => {\n  for (const entry of list.getEntries()) {\n    console.log(entry.name, entry.duration);\n  }\n});\nobs.observe({ entryTypes: ['gc'] });",
        "options": [
          "Listen to `process.on('gc')`",
          "Register a `PerformanceObserver` listening to `entryTypes: ['gc']`",
          "Poll `v8.getHeapSpaceStatistics()` every 10ms",
          "Check `os.gcEvents()`"
        ],
        "correctAnswer": "Register a `PerformanceObserver` listening to `entryTypes: ['gc']`",
        "explanation": "The PerformanceObserver API emits entries for every minor (scavenge) and major GC pause with their exact duration in milliseconds."
      },
      {
        "question": "What is 'Concurrent Sweeping' in V8?",
        "options": [
          "Running two Node servers simultaneously",
          "Deleting files on disk concurrently",
          "Freeing dead object memory and returning it to free-lists in background helper threads while JavaScript continues executing on the main thread",
          "Sweeping database records in parallel"
        ],
        "correctAnswer": "Freeing dead object memory and returning it to free-lists in background helper threads while JavaScript continues executing on the main thread",
        "explanation": "Once marking is complete, background threads sweep dead memory pages without halting the main thread."
      }
    ]
  },
  {
    "title": "Node.js: V8 Heap Snapshots & Leak Diagnosis",
    "description": "v8.writeHeapSnapshot, retaining paths, shallow vs retained size, and leak detection.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Performance"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is the difference between 'Shallow Size' and 'Retained Size' in a V8 Heap Snapshot?",
        "options": [
          "'Shallow Size' is RAM; 'Retained Size' is disk storage",
          "'Shallow Size' includes prototypes; 'Retained Size' does not",
          "There is no difference",
          "'Shallow Size' is the memory directly consumed by the object itself; 'Retained Size' is the total memory freed if this object and its exclusive dependency tree were deleted"
        ],
        "correctAnswer": "'Shallow Size' is the memory directly consumed by the object itself; 'Retained Size' is the total memory freed if this object and its exclusive dependency tree were deleted",
        "explanation": "Retained size identifies the real memory footprint retained by keeping an object alive in memory."
      },
      {
        "question": "How do you programmatically take a V8 heap snapshot file from inside a running Node.js application?",
        "codeSnippet": "import v8 from 'v8';\nconst snapshotPath = v8.writeHeapSnapshot();",
        "options": [
          "`v8.writeHeapSnapshot([filename])`",
          "`process.saveHeap([filename])`",
          "`console.snapshot([filename])`",
          "`os.dumpMemory([filename])`"
        ],
        "correctAnswer": "`v8.writeHeapSnapshot([filename])`",
        "explanation": "`v8.writeHeapSnapshot()` writes a `.heapsnapshot` file to disk that can be loaded directly into Chrome DevTools for inspection."
      },
      {
        "question": "What is a 'Retaining Path' in a heap snapshot analyzer?",
        "options": [
          "The file path where the script is installed",
          "The chain of references from a GC Root (e.g. `global`, active stack frames) to the target object that prevents it from being garbage collected",
          "The route URL in Express",
          "The git commit history of the function"
        ],
        "correctAnswer": "The chain of references from a GC Root (e.g. `global`, active stack frames) to the target object that prevents it from being garbage collected",
        "explanation": "Objects remain alive as long as an unbroken reference path traces back to a GC root. Retaining paths reveal who holds the leak."
      },
      {
        "question": "What causes a 'Closure Scope Retention' memory leak in Node.js?",
        "codeSnippet": "let theThing = null;\nconst replaceThing = function () {\n  const originalThing = theThing;\n  const unused = function () { if (originalThing) console.log('hi'); };\n  theThing = { longStr: new Array(1000000).join('*'), someMethod: function () {} };\n};\nsetInterval(replaceThing, 1000);",
        "options": [
          "Closures are never garbage collected by V8 by design",
          "Calling setInterval creates a C++ memory leak",
          "Multiple closures defined in the same parent scope share a single shared closure Context object in V8; an unused closure capturing a variable prevents it from being collected by another closure",
          "Arrays cannot be stored inside objects"
        ],
        "correctAnswer": "Multiple closures defined in the same parent scope share a single shared closure Context object in V8; an unused closure capturing a variable prevents it from being collected by another closure",
        "explanation": "In V8, all closures in a scope share the same lexical context object. If any closure captures a large variable, that variable stays alive for all sibling closures."
      },
      {
        "question": "What does the `(closure)` entry in a Chrome DevTools heap snapshot represent?",
        "options": [
          "An encrypted file handle",
          "A closed network socket",
          "A database transaction",
          "A JavaScript function closure instance retaining references to variables in its enclosing scope"
        ],
        "correctAnswer": "A JavaScript function closure instance retaining references to variables in its enclosing scope",
        "explanation": "The `(closure)` constructor groups all function closures in memory, helping identify lingering callbacks."
      }
    ]
  },
  {
    "title": "Node.js: N-API / Node-API Native Addons",
    "description": "Node-API ABI stability, napi_env, napi_create_function, and C/C++ bindings.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Native Addons"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What was the primary motivation for introducing Node-API (formerly N-API)?",
        "options": [
          "To provide an Application Binary Interface (ABI) stable C API that allows compiled native addons to run across different Node.js versions without recompilation",
          "To replace JavaScript with C++ completely in web servers",
          "To speed up CSS compilation",
          "To eliminate the need for npm"
        ],
        "correctAnswer": "To provide an Application Binary Interface (ABI) stable C API that allows compiled native addons to run across different Node.js versions without recompilation",
        "explanation": "Before Node-API, upgrading Node.js broke native addon binaries due to V8 API changes. Node-API provides ABI stability across versions."
      },
      {
        "question": "What is `napi_env` in a Node-API C function?",
        "codeSnippet": "napi_value MyFunction(napi_env env, napi_callback_info info) { ... }",
        "options": [
          "An environment variable object from `process.env`",
          "An opaque pointer representing the context of the underlying V8 JavaScript engine instance and thread state",
          "The file path of the native binary",
          "A network socket pointer"
        ],
        "correctAnswer": "An opaque pointer representing the context of the underlying V8 JavaScript engine instance and thread state",
        "explanation": "`napi_env` represents the execution context that must be passed to nearly all Node-API C functions."
      },
      {
        "question": "What is `node-addon-api` in the Node.js native ecosystem?",
        "options": [
          "A package manager for compiling Python scripts",
          "A database driver for MySQL",
          "A C++ header-only wrapper around Node-API providing idiomatic C++ classes (like `Napi::Object`, `Napi::Function`, `Napi::String`) with RAII and exception handling",
          "A tool for creating Docker containers"
        ],
        "correctAnswer": "A C++ header-only wrapper around Node-API providing idiomatic C++ classes (like `Napi::Object`, `Napi::Function`, `Napi::String`) with RAII and exception handling",
        "explanation": "`node-addon-api` simplifies Node-API development by wrapping raw C pointers in idiomatic C++ classes."
      },
      {
        "question": "What does `Napi::AsyncWorker` do in a C++ native addon?",
        "options": [
          "Spawns a new Node.js process using child_process",
          "Runs JavaScript code on the GPU",
          "Encrypts network traffic",
          "Executes long-running C++ computation off the main thread in the Libuv thread pool, and invokes a completion callback on the main thread when finished"
        ],
        "correctAnswer": "Executes long-running C++ computation off the main thread in the Libuv thread pool, and invokes a completion callback on the main thread when finished",
        "explanation": "`AsyncWorker` abstracts Libuv thread scheduling so heavy C++ code doesn't block the main JS thread."
      },
      {
        "question": "What file extension is used for compiled Node.js native addon binaries?",
        "options": [
          "`.node` (e.g. `addon.node`)",
          "`.dll`",
          "`.so`",
          "`.bin`"
        ],
        "correctAnswer": "`.node` (e.g. `addon.node`)",
        "explanation": "Compiled shared libraries for Node.js are named with the `.node` extension and loaded dynamically via `require('./addon.node')`."
      }
    ]
  },
  {
    "title": "Node.js: Custom Streams Implementation",
    "description": "_read, _write, _transform, _flush, and custom backpressure controllers.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Streams"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "Which internal method must a class extending `stream.Readable` implement?",
        "codeSnippet": "class CounterStream extends Readable {\n  _read(size) {\n    this.push(String(this.count++));\n    if (this.count > 10) this.push(null);\n  }\n}",
        "options": [
          "`_fetch(size)`",
          "`_read(size)`",
          "`readChunk(size)`",
          "`_next()`"
        ],
        "correctAnswer": "`_read(size)`",
        "explanation": "Custom Readable streams must implement `_read(size)` and call `this.push(chunk)` to deliver data, or `this.push(null)` to signal EOF."
      },
      {
        "question": "What does calling `this.push(null)` inside a custom Readable stream's `_read()` signify?",
        "options": [
          "An error occurred and data was dropped",
          "The stream has been paused",
          "End of Stream (EOF): no more data is available to be read",
          "Clear the internal buffer"
        ],
        "correctAnswer": "End of Stream (EOF): no more data is available to be read",
        "explanation": "Pushing `null` signals that the stream has finished producing data, triggering the `'end'` event."
      },
      {
        "question": "Which internal method must a class extending `stream.Writable` implement?",
        "codeSnippet": "class MyWriter extends Writable {\n  _write(chunk, encoding, callback) {\n    save(chunk);\n    callback();\n  }\n}",
        "options": [
          "`_save(chunk)`",
          "`writeChunk(chunk)`",
          "`_send(chunk, callback)`",
          "`_write(chunk, encoding, callback)`"
        ],
        "correctAnswer": "`_write(chunk, encoding, callback)`",
        "explanation": "Custom Writable streams must implement `_write(chunk, encoding, callback)` and invoke `callback()` when the write completes."
      },
      {
        "question": "What are the two mandatory methods when creating a custom `stream.Transform` stream?",
        "options": [
          "`_transform(chunk, encoding, callback)` and optional `_flush(callback)`",
          "`_read` and `_write`",
          "`_pipe` and `_unpipe`",
          "`_start` and `_stop`"
        ],
        "correctAnswer": "`_transform(chunk, encoding, callback)` and optional `_flush(callback)`",
        "explanation": "`_transform` processes each chunk and pushes results, while `_flush` handles final operations before closing."
      },
      {
        "question": "What happens if a custom Writable's `_write()` method forgets to call the `callback()` argument?",
        "options": [
          "The chunk is written twice",
          "The stream hangs and never accepts subsequent chunks, causing upstream backpressure to pause data flow permanently",
          "Node.js throws a SyntaxError",
          "The stream switches to synchronous mode"
        ],
        "correctAnswer": "The stream hangs and never accepts subsequent chunks, causing upstream backpressure to pause data flow permanently",
        "explanation": "Calling `callback()` acknowledges the chunk write. Without it, the stream buffer remains locked and backpressure never clears."
      }
    ]
  },
  {
    "title": "Node.js: Advanced AsyncHooks & Context Tracking",
    "description": "init, before, after, destroy, promiseResolve, and performance overhead profiling.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Internals"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What are the four primary lifecycle hooks provided by Node's `async_hooks` module?",
        "options": [
          "`start`, `pause`, `resume`, `stop`",
          "`open`, `read`, `write`, `close`",
          "`init` (resource created), `before` (callback about to run), `after` (callback finished), and `destroy` (resource garbage collected)",
          "`mount`, `update`, `render`, `unmount`"
        ],
        "correctAnswer": "`init` (resource created), `before` (callback about to run), `after` (callback finished), and `destroy` (resource garbage collected)",
        "explanation": "`async_hooks` tracks the lifecycle of every async resource through `init`, `before`, `after`, and `destroy`."
      },
      {
        "question": "What is the difference between `executionAsyncId()` and `triggerAsyncId()` in `async_hooks`?",
        "options": [
          "`executionAsyncId` is a string; `triggerAsyncId` is a number",
          "`triggerAsyncId` only works for timers",
          "There is no difference",
          "`executionAsyncId()` is the ID of the currently executing async context; `triggerAsyncId()` is the ID of the resource that caused/scheduled this async operation"
        ],
        "correctAnswer": "`executionAsyncId()` is the ID of the currently executing async context; `triggerAsyncId()` is the ID of the resource that caused/scheduled this async operation",
        "explanation": "`triggerAsyncId` links cause and effect, revealing which operation scheduled the current async callback."
      },
      {
        "question": "Why should you avoid enabling raw `async_hooks` callbacks in latency-critical production environments without benchmarking?",
        "options": [
          "Registering async hooks adds substantial V8 overhead on every single Promise and timer allocation, measurably decreasing throughput and increasing GC pressure",
          "It disables V8 JIT compilation permanently",
          "It causes hard crashes on Linux",
          "It limits the server to 10 connections"
        ],
        "correctAnswer": "Registering async hooks adds substantial V8 overhead on every single Promise and timer allocation, measurably decreasing throughput and increasing GC pressure",
        "explanation": "Tracking every Promise allocation incurs non-trivial CPU and memory overhead; use optimized `AsyncLocalStorage` where possible."
      },
      {
        "question": "Why MUST you avoid using `console.log()` inside an `async_hooks` callback without care?",
        "options": [
          "Console logs cannot write to terminal inside C++ hooks",
          "`console.log()` is an asynchronous operation that creates new async resources, triggering an infinite recursive call loop and crashing the process",
          "It encrypts the log output",
          "The output is reversed"
        ],
        "correctAnswer": "`console.log()` is an asynchronous operation that creates new async resources, triggering an infinite recursive call loop and crashing the process",
        "explanation": "`console.log` creates async stream resources. Calling it inside `init` triggers `init` again, causing an immediate stack overflow. Use `fs.writeSync(1, msg)` instead."
      },
      {
        "question": "What does the `promiseResolve` hook in `async_hooks` track?",
        "options": [
          "Fires when a promise rejects",
          "Measures promise memory size",
          "Fires when the `resolve` function of a Promise is invoked (which may occur before the `then` callback runs)",
          "Cancels unresolved promises"
        ],
        "correctAnswer": "Fires when the `resolve` function of a Promise is invoked (which may occur before the `then` callback runs)",
        "explanation": "`promiseResolve` tracks when a promise changes state to resolved, linking the resolver to the promise resource."
      }
    ]
  },
  {
    "title": "Node.js: HTTP/2 & Multiplexing Internals",
    "description": "http2 module, binary framing, streams, HPACK header compression, and server push.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Networking"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is the primary architectural advantage of HTTP/2 over HTTP/1.1 in Node.js?",
        "options": [
          "HTTP/2 eliminates the need for SSL/TLS",
          "HTTP/2 sends data over UDP instead of TCP",
          "HTTP/2 compresses HTML using WebAssembly",
          "Multiplexing: multiple independent bidirectional request/response streams can be transmitted simultaneously over a single TCP connection, eliminating head-of-line blocking at the application layer"
        ],
        "correctAnswer": "Multiplexing: multiple independent bidirectional request/response streams can be transmitted simultaneously over a single TCP connection, eliminating head-of-line blocking at the application layer",
        "explanation": "Multiplexing allows hundreds of requests and responses to interleave over a single TCP connection without blocking."
      },
      {
        "question": "What is 'HPACK' in HTTP/2?",
        "options": [
          "A header compression format that eliminates redundant header transmission across requests using static and dynamic lookup tables",
          "A JavaScript package manager",
          "A video compression algorithm",
          "A TLS handshake optimization"
        ],
        "correctAnswer": "A header compression format that eliminates redundant header transmission across requests using static and dynamic lookup tables",
        "explanation": "HPACK compresses repetitive HTTP headers using indexed tables, significantly reducing header payload overhead."
      },
      {
        "question": "What core module in Node.js provides native HTTP/2 support?",
        "codeSnippet": "import http2 from 'http2';\nconst server = http2.createSecureServer(options, onStream);",
        "options": [
          "`http`",
          "`http2`",
          "`net`",
          "`https2`"
        ],
        "correctAnswer": "`http2`",
        "explanation": "The built-in `http2` module provides both client and server implementations of the HTTP/2 specification."
      },
      {
        "question": "Why is ALPN (Application-Layer Protocol Negotiation) required for HTTPS/HTTP2 in browsers?",
        "options": [
          "It verifies DNS records",
          "It handles user authentication",
          "It allows the client and server to negotiate whether to use HTTP/1.1 or HTTP/2 during the initial TLS handshake without an extra network roundtrip",
          "It compresses the TLS certificate"
        ],
        "correctAnswer": "It allows the client and server to negotiate whether to use HTTP/1.1 or HTTP/2 during the initial TLS handshake without an extra network roundtrip",
        "explanation": "ALPN negotiates protocol support (`h2` vs `http/1.1`) inside the TLS handshake, establishing the right protocol immediately."
      },
      {
        "question": "What is a 'Stream ID' in HTTP/2 frames?",
        "options": [
          "The database row ID",
          "The user's session token",
          "The server's process ID",
          "A 31-bit integer identifying which specific request/response stream an individual binary frame belongs to within the multiplexed TCP connection"
        ],
        "correctAnswer": "A 31-bit integer identifying which specific request/response stream an individual binary frame belongs to within the multiplexed TCP connection",
        "explanation": "Stream IDs allow the receiver to demultiplex interleaved frames into their respective distinct request/response streams."
      }
    ]
  },
  {
    "title": "Node.js: Diagnostics Channel & Subscriptions",
    "description": "diagnostics_channel, tracing modules, non-invasive telemetry, and APM instrumentation.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Diagnostics"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is the purpose of the `diagnostics_channel` module introduced in modern Node.js?",
        "options": [
          "To provide a high-performance, non-invasive pub/sub channel for libraries and core modules to publish diagnostic events without coupling to specific APM tools",
          "To output audio diagnostics to system speakers",
          "To run hardware memory diagnostics on server RAM",
          "To intercept network packets at the OS level"
        ],
        "correctAnswer": "To provide a high-performance, non-invasive pub/sub channel for libraries and core modules to publish diagnostic events without coupling to specific APM tools",
        "explanation": "`diagnostics_channel` standardizes telemetry, allowing libraries (Undici, Express) to publish tracing events with near-zero overhead when unsubscribed."
      },
      {
        "question": "How do you subscribe to a diagnostic channel named `'http.client.request.start'`?",
        "codeSnippet": "import diagnostics_channel from 'diagnostics_channel';\nconst channel = diagnostics_channel.channel('http.client.request.start');\nchannel.subscribe((message, name) => {\n  console.log('Outgoing request:', message.request);\n});",
        "options": [
          "`process.on(name, listener)`",
          "`diagnostics_channel.channel(name).subscribe(listener)`",
          "`diagnostics_channel.listen(name, listener)`",
          "`events.subscribe(name, listener)`"
        ],
        "correctAnswer": "`diagnostics_channel.channel(name).subscribe(listener)`",
        "explanation": "`diagnostics_channel.channel(name).subscribe()` registers a subscriber function to receive diagnostic messages."
      },
      {
        "question": "What is the performance cost of calling `channel.publish(data)` if no listeners are subscribed to that channel?",
        "options": [
          "It throws an unhandled channel error",
          "It buffers events until a subscriber attaches",
          "Virtually zero: a fast boolean check (`channel.hasSubscribers`) avoids any object allocation or processing",
          "It logs a warning to stderr"
        ],
        "correctAnswer": "Virtually zero: a fast boolean check (`channel.hasSubscribers`) avoids any object allocation or processing",
        "explanation": "When inactive, channels bail out immediately, adding virtually no overhead to instrumented code."
      },
      {
        "question": "Why is `diagnostics_channel` preferred over monkey-patching library prototypes for APM tracing (e.g. Datadog, New Relic)?",
        "options": [
          "Monkey-patching is illegal in modern ECMAScript",
          "Monkey-patching requires C++ compilation",
          "APM tools cannot access JavaScript prototypes",
          "Monkey-patching breaks V8 hidden classes, causes subtle compatibility bugs on library upgrades, and introduces brittle maintenance overhead"
        ],
        "correctAnswer": "Monkey-patching breaks V8 hidden classes, causes subtle compatibility bugs on library upgrades, and introduces brittle maintenance overhead",
        "explanation": "Standardized diagnostic channels eliminate fragile prototype patching, keeping internal code fast and maintainable."
      },
      {
        "question": "Can `diagnostics_channel` be used inside custom application code to emit domain events?",
        "options": [
          "Yes, any user code can create named channels and publish custom telemetry payloads",
          "No, it is strictly restricted to Node.js core modules",
          "Only if running with the `--experimental-diagnostics` flag",
          "Only in TypeScript projects"
        ],
        "correctAnswer": "Yes, any user code can create named channels and publish custom telemetry payloads",
        "explanation": "`diagnostics_channel` is a general-purpose diagnostic bus that any package or application can utilize."
      }
    ]
  },
  {
    "title": "Node.js: Core Profiling & Flamegraphs",
    "description": "node --prof, tick processor, flame graphs, and identifying CPU bottlenecks.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Performance"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "How do you generate a low-overhead sampling CPU profile using Node's built-in V8 profiler?",
        "options": [
          "Pass `--cpu-trace`",
          "Run Node with the `--prof` command-line flag: `node --prof app.js`",
          "Import `'profiler'` and call `profiler.start()`",
          "Run Node inside a Docker container"
        ],
        "correctAnswer": "Run Node with the `--prof` command-line flag: `node --prof app.js`",
        "explanation": "`node --prof` samples the call stack at regular intervals, generating an `isolate-0x...-v8.log` file."
      },
      {
        "question": "How do you process and format the raw `isolate-*.log` profile generated by `--prof` into human-readable text?",
        "options": [
          "`cat isolate-*.log`",
          "`npm run analyze isolate-*.log`",
          "`node --prof-process isolate-*.log > processed.txt`",
          "`v8-inspect isolate-*.log`"
        ],
        "correctAnswer": "`node --prof-process isolate-*.log > processed.txt`",
        "explanation": "The `--prof-process` tick processor aggregates stack samples into readable tables of C++ and JS execution times."
      },
      {
        "question": "What does the width of a box represent on a CPU Flamegraph?",
        "options": [
          "The chronological order of function execution",
          "The memory size of the function in bytes",
          "The number of times the function was called",
          "The proportion of total CPU time spent in that function and its children (wider boxes consume more CPU time)"
        ],
        "correctAnswer": "The proportion of total CPU time spent in that function and its children (wider boxes consume more CPU time)",
        "explanation": "Flamegraph box width corresponds to the percentage of CPU samples on the stack; wide flat plateaus pinpoint CPU bottlenecks."
      },
      {
        "question": "What tool allows capturing interactive flamegraphs with zero runtime restarts in production via the Chrome DevTools Protocol?",
        "options": [
          "Starting Node with `--inspect` and capturing a CPU Profile from the Performance / Profiler tab in Chrome DevTools",
          "Running `kill -9` on the process",
          "Using `console.trace()`",
          "Inspecting package-lock.json"
        ],
        "correctAnswer": "Starting Node with `--inspect` and capturing a CPU Profile from the Performance / Profiler tab in Chrome DevTools",
        "explanation": "Connecting Chrome DevTools via `--inspect` allows sampling CPU profiles dynamically under live production traffic."
      },
      {
        "question": "In a tick processor output, what does the `[C++]` section vs `[JavaScript]` section signify?",
        "options": [
          "`[C++]` indicates compilation errors",
          "`[C++]` shows CPU ticks spent executing native V8/Node.js internals or C++ bindings; `[JavaScript]` shows time spent in user JS code",
          "`[JavaScript]` is only for frontend code",
          "There is no distinction"
        ],
        "correctAnswer": "`[C++]` shows CPU ticks spent executing native V8/Node.js internals or C++ bindings; `[JavaScript]` shows time spent in user JS code",
        "explanation": "The breakdown clarifies whether CPU load is consumed by application logic or internal C++ subsystems (e.g. crypto, regex, libuv)."
      }
    ]
  },
  {
    "title": "Node.js: Zero-Downtime Hot Reloading",
    "description": "Rolling process restarts in cluster, SIGUSR2, connection draining, and PM2 reload.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Production"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "How does a zero-downtime rolling restart work in a clustered Node.js application?",
        "options": [
          "All processes are killed simultaneously and restarted in 1 millisecond",
          "Code is modified directly in memory without restarting",
          "Worker processes are replaced one by one: a new worker is forked and verified healthy before gracefully terminating an old worker, maintaining continuous request handling",
          "Incoming requests are rejected during the reload"
        ],
        "correctAnswer": "Worker processes are replaced one by one: a new worker is forked and verified healthy before gracefully terminating an old worker, maintaining continuous request handling",
        "explanation": "Rolling restarts replace workers sequentially so remaining active workers handle incoming requests without interruption."
      },
      {
        "question": "What command performs a zero-downtime cluster reload in PM2?",
        "options": [
          "`pm2 restart all` (which performs a hard restart)",
          "`pm2 refresh`",
          "`pm2 update`",
          "`pm2 reload all`"
        ],
        "correctAnswer": "`pm2 reload all`",
        "explanation": "`pm2 reload` restarts workers sequentially for zero downtime, unlike `pm2 restart` which terminates all workers at once."
      },
      {
        "question": "Which custom POSIX signal is traditionally used to instruct a Node.js cluster master to initiate a rolling restart?",
        "options": [
          "`SIGUSR2`",
          "`SIGKILL`",
          "`SIGSTOP`",
          "`SIGINT`"
        ],
        "correctAnswer": "`SIGUSR2`",
        "explanation": "`SIGUSR2` is the standard user-defined POSIX signal commonly reserved for triggering rolling software reloads."
      },
      {
        "question": "Why must a newly forked worker signal 'ready' to the master before the master terminates the old worker?",
        "codeSnippet": "// Worker sends:\nprocess.send('ready');",
        "options": [
          "Because Node.js crashes without the message",
          "To guarantee the new worker has completed database connections, warmed caches, and started listening before traffic is diverted to it",
          "To confirm the worker's PID number",
          "To verify the server clock"
        ],
        "correctAnswer": "To guarantee the new worker has completed database connections, warmed caches, and started listening before traffic is diverted to it",
        "explanation": "Prematurely killing the old worker before the new one is ready drops incoming requests during startup initialization."
      },
      {
        "question": "What happens to active WebSockets during a rolling zero-downtime reload?",
        "options": [
          "WebSockets are migrated seamlessly to the new process without disconnecting",
          "WebSockets prevent the server from ever restarting",
          "WebSockets are long-lived persistent TCP connections; when their worker gracefully shuts down, they close, requiring clients to have automated reconnection logic",
          "WebSockets are paused in the cloud"
        ],
        "correctAnswer": "WebSockets are long-lived persistent TCP connections; when their worker gracefully shuts down, they close, requiring clients to have automated reconnection logic",
        "explanation": "Persistent TCP sockets cannot be handed off to another process mid-session; clients must implement resilient exponential-backoff reconnections."
      }
    ]
  },
  {
    "title": "Node.js: Socket Hang Up & TCP Keep-Alive",
    "description": "agentkeepalive, ECONNRESET, keepAliveTimeout, headersTimeout, and socket reuse.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Networking"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What causes an `ECONNRESET` ('socket hang up') error in Node.js client HTTP requests?",
        "options": [
          "The client's WiFi was disconnected",
          "The URL contained invalid characters",
          "The DNS server returned an invalid IP",
          "The remote server abruptly closed or reset the TCP socket (sending a TCP RST packet) while the Node client was awaiting a response or sending data"
        ],
        "correctAnswer": "The remote server abruptly closed or reset the TCP socket (sending a TCP RST packet) while the Node client was awaiting a response or sending data",
        "explanation": "`ECONNRESET` happens when the peer forcibly resets the connection, often due to server timeouts or load balancer resets."
      },
      {
        "question": "Why should `server.keepAliveTimeout` in Node.js be set GREATER than the load balancer's idle timeout?",
        "options": [
          "If Node closes an idle TCP connection just as the load balancer routes an incoming request, the request hits a closing socket and fails with a 502 Bad Gateway",
          "To speed up SSL handshakes",
          "Because Node.js refuses to start otherwise",
          "To prevent memory leaks in Express"
        ],
        "correctAnswer": "If Node closes an idle TCP connection just as the load balancer routes an incoming request, the request hits a closing socket and fails with a 502 Bad Gateway",
        "explanation": "A race condition occurs if the backend times out before the load balancer; making Node's `keepAliveTimeout` higher avoids 502 race errors."
      },
      {
        "question": "What is the relationship between `server.headersTimeout` and `server.keepAliveTimeout` in Node.js?",
        "options": [
          "They must be identical integers",
          "`server.headersTimeout` must be set higher than `server.keepAliveTimeout` to prevent slow-loris header attacks and timeout race conditions",
          "`headersTimeout` must be zero",
          "`keepAliveTimeout` must be disabled"
        ],
        "correctAnswer": "`server.headersTimeout` must be set higher than `server.keepAliveTimeout` to prevent slow-loris header attacks and timeout race conditions",
        "explanation": "Node.js enforces that `headersTimeout > keepAliveTimeout` so that new requests on reused sockets have sufficient time to send headers."
      },
      {
        "question": "Why is `agentkeepalive` widely used for outbound HTTP requests in high-throughput microservices?",
        "codeSnippet": "import Agent from 'agentkeepalive';\nconst keepaliveAgent = new Agent({ maxSockets: 100, maxFreeSockets: 10, timeout: 60000 });",
        "options": [
          "It automatically encrypts HTTP into HTTPS",
          "It caches database queries",
          "It maintains a pool of persistent, reused TCP connections, avoiding the CPU and latency overhead of performing full TCP/TLS handshakes on every outbound request",
          "It compresses images over the wire"
        ],
        "correctAnswer": "It maintains a pool of persistent, reused TCP connections, avoiding the CPU and latency overhead of performing full TCP/TLS handshakes on every outbound request",
        "explanation": "Reusing TCP sockets avoids 3-way handshakes and TLS negotiations on every call, cutting API latency dramatically."
      },
      {
        "question": "What does the TCP Keep-Alive probe mechanism (`socket.setKeepAlive(true, 1000)`) do?",
        "options": [
          "Keeps the Node.js process alive forever",
          "Prevents the operating system from sleeping",
          "Measures network speed",
          "Periodically transmits empty probe packets on an idle connection to detect broken dead sockets or firewall drops before sending real data"
        ],
        "correctAnswer": "Periodically transmits empty probe packets on an idle connection to detect broken dead sockets or firewall drops before sending real data",
        "explanation": "TCP keep-alive probes detect dead network paths and keep NAT firewall bindings active across idle periods."
      }
    ]
  },
  {
    "title": "Node.js: Distributed Caching with Redis Cluster",
    "description": "Hash slots (16384), MOVED/ASK redirections, pipeline batching, and sentinel failover.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Redis"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "How does Redis Cluster distribute data keys across multiple node instances?",
        "options": [
          "Using 16,384 logical Hash Slots: keys are hashed via CRC16 (`HASH_SLOT = CRC16(key) mod 16384`), and each master node owns a subset of slots",
          "By distributing keys alphabetically",
          "Using round-robin port distribution",
          "By allocating 1GB per node randomly"
        ],
        "correctAnswer": "Using 16,384 logical Hash Slots: keys are hashed via CRC16 (`HASH_SLOT = CRC16(key) mod 16384`), and each master node owns a subset of slots",
        "explanation": "Redis Cluster shards keys across 16,384 hash slots computed from `CRC16(key) % 16384`."
      },
      {
        "question": "What does a `MOVED 3999 127.0.0.1:7002` error response from Redis Cluster signify?",
        "options": [
          "The key has been deleted",
          "The requested key's hash slot is not hosted on this node; the client should update its slot cache and re-issue the query to the specified node (`127.0.0.1:7002`)",
          "The Redis server has run out of memory",
          "The network socket was moved to another port"
        ],
        "correctAnswer": "The requested key's hash slot is not hosted on this node; the client should update its slot cache and re-issue the query to the specified node (`127.0.0.1:7002`)",
        "explanation": "`MOVED` informs the client that the slot has permanently migrated to another node; smart Redis clients (like `ioredis`) handle this automatically."
      },
      {
        "question": "How can you force multiple related Redis keys (e.g. `user:100:profile` and `user:100:orders`) to hash to the exact same hash slot for multi-key transactions?",
        "options": [
          "Put them in the same array",
          "Separate keys with commas",
          "Use Hash Tags `{...}`: only the text inside `{...}` is hashed (e.g. `{user:100}:profile` and `{user:100}:orders`)",
          "Redis Cluster does not support hash slot grouping"
        ],
        "correctAnswer": "Use Hash Tags `{...}`: only the text inside `{...}` is hashed (e.g. `{user:100}:profile` and `{user:100}:orders`)",
        "explanation": "Hash tags `{...}` force Redis to hash only the enclosed string, guaranteeing co-location on the same cluster node."
      },
      {
        "question": "What does Redis Pipelining (`redis.pipeline()`) do in a Node.js client?",
        "codeSnippet": "const pipeline = redis.pipeline();\npipeline.set('k1', 'v1');\npipeline.set('k2', 'v2');\nconst results = await pipeline.exec();",
        "options": [
          "Pipes Redis data into an operating system file",
          "Runs commands in parallel worker threads",
          "Compresses keys with gzip",
          "Batches multiple commands into a single TCP packet without waiting for individual responses, dramatically reducing round-trip latency overhead"
        ],
        "correctAnswer": "Batches multiple commands into a single TCP packet without waiting for individual responses, dramatically reducing round-trip latency overhead",
        "explanation": "Pipelining sends multiple commands together without waiting for each reply, drastically cutting network latency."
      },
      {
        "question": "What is the difference between Redis Sentinel and Redis Cluster?",
        "options": [
          "Redis Sentinel provides high availability and automatic failover for a single master-replica setup; Redis Cluster provides horizontal sharding and data distribution across multiple masters",
          "Sentinel is for caching; Cluster is for databases",
          "Sentinel only works on Windows",
          "They are exact synonyms"
        ],
        "correctAnswer": "Redis Sentinel provides high availability and automatic failover for a single master-replica setup; Redis Cluster provides horizontal sharding and data distribution across multiple masters",
        "explanation": "Sentinel monitors a single master with replicas for automatic failover. Cluster partitions data across multiple active masters."
      }
    ]
  },
  {
    "title": "Node.js: Circuit Breaker Pattern with Opossum",
    "description": "Closed, Open, and Half-Open states, failure thresholds, timeouts, and fallbacks.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Resilience"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What are the three states of a Circuit Breaker in distributed systems?",
        "options": [
          "Active, Inactive, Blocked",
          "Closed (normal operation, requests pass), Open (failing, requests fail immediately without calling service), and Half-Open (trial requests test recovery)",
          "Pending, Resolved, Rejected",
          "Running, Paused, Stopped"
        ],
        "correctAnswer": "Closed (normal operation, requests pass), Open (failing, requests fail immediately without calling service), and Half-Open (trial requests test recovery)",
        "explanation": "Circuit breakers protect failing downstream services by failing fast in the Open state and testing recovery in Half-Open."
      },
      {
        "question": "Why does an Open circuit breaker reject requests immediately without attempting network calls?",
        "options": [
          "Because the internet connection is physically severed",
          "To save electricity on the server",
          "To give the struggling downstream dependency time to recover, and prevent cascading resource exhaustion (socket pool exhaustion, thread starvation) on the caller",
          "Because the caller process crashed"
        ],
        "correctAnswer": "To give the struggling downstream dependency time to recover, and prevent cascading resource exhaustion (socket pool exhaustion, thread starvation) on the caller",
        "explanation": "Failing fast prevents callers from tying up resources waiting for timeouts from a down service, preventing cascading failure."
      },
      {
        "question": "How does a circuit breaker transition from 'Open' to 'Half-Open'?",
        "options": [
          "When the server is rebooted",
          "When an administrator clicks a button",
          "After 24 hours automatically",
          "After a configured cooldown period (`resetTimeout`), the breaker enters Half-Open and allows a limited number of probe requests through to test service health"
        ],
        "correctAnswer": "After a configured cooldown period (`resetTimeout`), the breaker enters Half-Open and allows a limited number of probe requests through to test service health",
        "explanation": "After `resetTimeout` elapses, the breaker tests the waters: if probes succeed, it closes; if they fail, it trips back to Open."
      },
      {
        "question": "What is a 'Fallback' function in a circuit breaker library like Opossum?",
        "codeSnippet": "const breaker = new CircuitBreaker(fetchUserData, options);\nbreaker.fallback(() => ({ cached: true, name: 'Default User' }));",
        "options": [
          "A degradation handler executed when the circuit is Open or the primary action fails, returning cached or default data gracefully to the user",
          "A function that retries the request 100 times",
          "A function that deletes corrupt data",
          "A database backup script"
        ],
        "correctAnswer": "A degradation handler executed when the circuit is Open or the primary action fails, returning cached or default data gracefully to the user",
        "explanation": "Fallbacks provide graceful degradation (e.g. cached data, default values) when downstream dependencies are unavailable."
      },
      {
        "question": "What metric determines when a circuit breaker should trip from Closed to Open?",
        "options": [
          "The total CPU usage of the machine",
          "The percentage of requests failing or timing out within a rolling statistical time window (e.g. `errorThresholdPercentage: 50`)",
          "The number of users online",
          "The size of the node_modules directory"
        ],
        "correctAnswer": "The percentage of requests failing or timing out within a rolling statistical time window (e.g. `errorThresholdPercentage: 50`)",
        "explanation": "Breakers monitor failure rates over a sliding time window (e.g. >50% errors over 10 seconds with at least 10 requests)."
      }
    ]
  },
  {
    "title": "Node.js: Event Loop Lag & Heartbeat Monitoring",
    "description": "perf_hooks.monitorEventLoopDelay, lag thresholds, saturation detection, and load shedding.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Monitoring"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is 'Event Loop Lag' (or Delay) in Node.js?",
        "options": [
          "The latency of the physical network cable",
          "The time taken to download an npm package",
          "The difference in time between when an asynchronous callback was scheduled to run and when it actually began executing on the event loop",
          "The delay in browser screen repainting"
        ],
        "correctAnswer": "The difference in time between when an asynchronous callback was scheduled to run and when it actually began executing on the event loop",
        "explanation": "Event loop delay measures how long callbacks wait in the queue due to synchronous CPU work blocking the thread."
      },
      {
        "question": "What native API was introduced in Node.js `perf_hooks` to measure event loop delay with extreme precision?",
        "codeSnippet": "import { monitorEventLoopDelay } from 'perf_hooks';\nconst h = monitorEventLoopDelay({ resolution: 20 });\nh.enable();",
        "options": [
          "`process.getLag()`",
          "`console.measureLag()`",
          "`v8.getEventLoopLatency()`",
          "`monitorEventLoopDelay({ resolution })`"
        ],
        "correctAnswer": "`monitorEventLoopDelay({ resolution })`",
        "explanation": "`monitorEventLoopDelay()` uses a high-resolution timer to sample event loop delay, recording percentiles in an internal histogram."
      },
      {
        "question": "What percentiles does `monitorEventLoopDelay` record in its internal histogram?",
        "codeSnippet": "console.log('p50:', h.percentile(50));\nconsole.log('p99:', h.percentile(99));",
        "options": [
          "Nanosecond-level histogram distributions including `min`, `max`, `mean`, `stddev`, and percentiles (p50, p90, p99)",
          "Only average seconds",
          "Only the maximum delay in minutes",
          "A list of function names"
        ],
        "correctAnswer": "Nanosecond-level histogram distributions including `min`, `max`, `mean`, `stddev`, and percentiles (p50, p90, p99)",
        "explanation": "The histogram provides nanosecond precision across percentiles (p50, p99, p99.9) for rigorous latency distribution analysis."
      },
      {
        "question": "What is 'Load Shedding' when event loop lag exceeds acceptable thresholds (e.g. >100ms)?",
        "options": [
          "Turning off server air conditioning",
          "The server deliberately rejects incoming non-critical requests immediately with HTTP 503 Service Unavailable to shed load and allow the event loop to recover",
          "Deleting database records to save space",
          "Rebooting the server"
        ],
        "correctAnswer": "The server deliberately rejects incoming non-critical requests immediately with HTTP 503 Service Unavailable to shed load and allow the event loop to recover",
        "explanation": "Load shedding rejects excess traffic when the event loop is saturated, preventing server collapse and preserving healthy requests."
      },
      {
        "question": "Why does high event loop delay cause health check probes (e.g. Kubernetes liveness probes) to fail?",
        "options": [
          "Kubernetes checks CPU temperatures directly",
          "The operating system closes all ports",
          "The probe HTTP endpoint callback sits starved in the event loop queue while synchronous code runs, causing Kubernetes to time out and restart the healthy pod",
          "Node.js drops all network drivers"
        ],
        "correctAnswer": "The probe HTTP endpoint callback sits starved in the event loop queue while synchronous code runs, causing Kubernetes to time out and restart the healthy pod",
        "explanation": "When synchronous CPU work starves the event loop, health check responses time out, prompting orchestrators to kill the process."
      }
    ]
  },
  {
    "title": "Node.js: Secure Password Hashing with Argon2 / Scrypt",
    "description": "crypto.scrypt, Argon2id parameters (time cost, memory cost, parallelism), and GPU-resistant hashing.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Security"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "Why are general-purpose cryptographic hashes (SHA-256, MD5) completely UNSAFE for password storage?",
        "options": [
          "They are reversible with standard algorithms",
          "They produce different hashes for the same input",
          "Node.js does not support them",
          "They are designed to be extremely fast: modern GPUs and ASICs can compute billions of SHA-256 hashes per second, making brute-force cracking trivial"
        ],
        "correctAnswer": "They are designed to be extremely fast: modern GPUs and ASICs can compute billions of SHA-256 hashes per second, making brute-force cracking trivial",
        "explanation": "Fast hash functions are catastrophic for passwords because attackers can brute-force billions of guesses per second on cheap hardware."
      },
      {
        "question": "What built-in key-derivation function is provided directly by Node's `crypto` module for memory-hard password hashing?",
        "codeSnippet": "import crypto from 'crypto';\ncrypto.scrypt('password', 'salt', 64, (err, derivedKey) => { ... });",
        "options": [
          "`crypto.scrypt()`",
          "`crypto.bcrypt()`",
          "`crypto.sha512Password()`",
          "`crypto.passwordHash()`"
        ],
        "correctAnswer": "`crypto.scrypt()`",
        "explanation": "Node core provides `crypto.scrypt()`, a memory-hard key derivation function that resists hardware ASIC cracking."
      },
      {
        "question": "What are the three tunable work factors in modern memory-hard password hashers like Argon2?",
        "options": [
          "Salt length, key length, and username length",
          "Time Cost (iterations), Memory Cost (RAM consumption), and Parallelism (number of threads)",
          "CPU temperature, GPU speed, and disk space",
          "Number of characters, capitalization, and numbers"
        ],
        "correctAnswer": "Time Cost (iterations), Memory Cost (RAM consumption), and Parallelism (number of threads)",
        "explanation": "Argon2 allows tuning iterations (time), RAM footprint (memory cost), and threads (parallelism) to defeat GPU attacks."
      },
      {
        "question": "What is the purpose of a unique cryptographic 'Salt' generated for every single user password?",
        "options": [
          "To encrypt the password using symmetric keys",
          "To shorten the length of the hash",
          "To prevent Rainbow Table attacks and ensure that two users with identical passwords will produce completely different hash strings",
          "To verify the user's email address"
        ],
        "correctAnswer": "To prevent Rainbow Table attacks and ensure that two users with identical passwords will produce completely different hash strings",
        "explanation": "A unique salt ensures identical passwords yield distinct hashes, defeating precomputed rainbow tables."
      },
      {
        "question": "Why is `timingSafeEqual()` necessary when verifying cryptographic signatures or hashes in Node.js?",
        "codeSnippet": "const match = crypto.timingSafeEqual(bufA, bufB);",
        "options": [
          "Standard comparison crashes on binary buffers",
          "`===` is slower by 500ms",
          "It converts the buffers to uppercase",
          "Standard string `===` comparison exits immediately on the first mismatched character, leaking timing information that allows attackers to reconstruct secrets via timing attacks"
        ],
        "correctAnswer": "Standard string `===` comparison exits immediately on the first mismatched character, leaking timing information that allows attackers to reconstruct secrets via timing attacks",
        "explanation": "`crypto.timingSafeEqual` takes constant time regardless of where differences occur, eliminating timing side-channel attacks."
      }
    ]
  },
  {
    "title": "Node.js: OpenTelemetry Tracing in Node.js",
    "description": "TracerProvider, Spans, W3C TraceContext header propagation, and OTLP exporters.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Telemetry"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is a 'Span' in OpenTelemetry distributed tracing?",
        "options": [
          "A single contiguous unit of work within a trace, capturing start/end timestamps, operation name, status, and metadata attributes",
          "A network bridge connecting microservices",
          "A memory allocation in V8",
          "A database table partition"
        ],
        "correctAnswer": "A single contiguous unit of work within a trace, capturing start/end timestamps, operation name, status, and metadata attributes",
        "explanation": "A Span represents an individual timed operation (e.g. an HTTP handler or database query) within a distributed trace."
      },
      {
        "question": "What standard HTTP header format is used by OpenTelemetry to propagate trace context across microservice boundaries?",
        "codeSnippet": "traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
        "options": [
          "`X-Request-ID`",
          "The W3C Trace Context `traceparent` header",
          "`X-Span-Token`",
          "`OTel-Trace-Header`"
        ],
        "correctAnswer": "The W3C Trace Context `traceparent` header",
        "explanation": "The W3C `traceparent` standard passes version, trace-id, parent-span-id, and trace-flags across HTTP hops."
      },
      {
        "question": "Why must the OpenTelemetry Node SDK be initialized BEFORE any other modules are imported in your application?",
        "codeSnippet": "// tracing.js must run first:\nimport { NodeSDK } from '@opentelemetry/sdk-node';\n// then import app.js",
        "options": [
          "Because Node requires telemetry to boot",
          "To configure V8 heap limits",
          "To allow auto-instrumentation packages to patch Node's core modules (`http`, `net`, `fs`) and database drivers before they are required by application code",
          "To enable ES module imports"
        ],
        "correctAnswer": "To allow auto-instrumentation packages to patch Node's core modules (`http`, `net`, `fs`) and database drivers before they are required by application code",
        "explanation": "Auto-instrumentation wraps underlying APIs. Initializing late misses already-imported modules, leaving them untraced."
      },
      {
        "question": "What mechanism does OpenTelemetry in Node.js use to maintain trace context across asynchronous Promise chains?",
        "options": [
          "Global variables on `process`",
          "HTTP request cookies",
          "Temporary files in `/tmp`",
          "Node's native `AsyncLocalStorage` via the `@opentelemetry/context-async-hooks` package"
        ],
        "correctAnswer": "Node's native `AsyncLocalStorage` via the `@opentelemetry/context-async-hooks` package",
        "explanation": "OpenTelemetry leverages Node's `AsyncLocalStorage` to propagate the active Span across async/await calls seamlessly."
      },
      {
        "question": "What is an 'OTLP Exporter' in an OpenTelemetry pipeline?",
        "options": [
          "A component that translates recorded Spans and Metrics into the OpenTelemetry Protocol (OTLP) and transmits them via gRPC or HTTP to a collector (e.g. Jaeger, Datadog)",
          "A tool that exports JavaScript files to TypeScript",
          "An npm command that packages Docker containers",
          "A database backup utility"
        ],
        "correctAnswer": "A component that translates recorded Spans and Metrics into the OpenTelemetry Protocol (OTLP) and transmits them via gRPC or HTTP to a collector (e.g. Jaeger, Datadog)",
        "explanation": "Exporters batch and push telemetry data over gRPC/HTTP to observability backends and collectors."
      }
    ]
  },
  {
    "title": "Node.js: WebAssembly Integration in Node.js",
    "description": "WebAssembly.instantiate, shared memory, passing typed arrays, and high-speed C/Rust execution.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "WebAssembly"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "How do you instantiate and execute a compiled `.wasm` binary module in Node.js?",
        "codeSnippet": "const wasmBuffer = fs.readFileSync('math.wasm');\nconst { instance } = await WebAssembly.instantiate(wasmBuffer, importObject);",
        "options": [
          "`child_process.execWasm('math.wasm')`",
          "`WebAssembly.instantiate(buffer, importObject)`",
          "`require('./math.wasm')`",
          "`v8.runWasm('math.wasm')`"
        ],
        "correctAnswer": "`WebAssembly.instantiate(buffer, importObject)`",
        "explanation": "`WebAssembly.instantiate()` compiles and instantiates binary WebAssembly bytes into an executable `instance`."
      },
      {
        "question": "How is data passed between JavaScript and a WebAssembly module without heavy serialization?",
        "options": [
          "By converting data to JSON strings",
          "Through TCP localhost sockets",
          "Via `WebAssembly.Memory`, an underlying `ArrayBuffer` that both JS and WASM can read and write directly using TypedArray views (e.g. `Uint8Array`)",
          "Via environment variables"
        ],
        "correctAnswer": "Via `WebAssembly.Memory`, an underlying `ArrayBuffer` that both JS and WASM can read and write directly using TypedArray views (e.g. `Uint8Array`)",
        "explanation": "Linear memory in WASM is an `ArrayBuffer`. JS accesses it via TypedArrays, allowing zero-copy data exchange."
      },
      {
        "question": "What is a major advantage of executing compiled Rust or C++ via WebAssembly in Node.js compared to C++ native addons (`.node`)?",
        "options": [
          "WASM runs 100x faster than native machine code",
          "WASM does not require RAM",
          "WASM eliminates the need for Node.js",
          "Portability and sandboxed security: WASM runs safely inside a memory-isolated sandbox and the same `.wasm` binary runs on Linux, macOS, and Windows without native toolchain compilation"
        ],
        "correctAnswer": "Portability and sandboxed security: WASM runs safely inside a memory-isolated sandbox and the same `.wasm` binary runs on Linux, macOS, and Windows without native toolchain compilation",
        "explanation": "WASM modules are secure, portable, and require no OS-specific compilation toolchains (gcc, python, make)."
      },
      {
        "question": "Can WebAssembly access the host filesystem (`fs`) or network directly without host imports?",
        "options": [
          "No, WebAssembly is strictly isolated by default and can only interact with the OS through host functions explicitly passed in its `importObject` (or WASI)",
          "Yes, WASM has unrestricted root access to the OS kernel",
          "Yes, via `wasm.readFile()`",
          "Only on Linux systems"
        ],
        "correctAnswer": "No, WebAssembly is strictly isolated by default and can only interact with the OS through host functions explicitly passed in its `importObject` (or WASI)",
        "explanation": "WASM has no direct system access; all I/O capabilities must be explicitly passed in as imported host functions."
      },
      {
        "question": "What is WASI (WebAssembly System Interface) in Node.js?",
        "codeSnippet": "import { WASI } from 'wasi';\nconst wasi = new WASI({ args: process.argv, env: process.env });",
        "options": [
          "A web server framework for Node.js",
          "A standardized system interface providing POSIX-like system calls (filesystem, clocks, random) to WebAssembly in a secure, capability-based sandbox",
          "A database query engine",
          "A replacement for npm"
        ],
        "correctAnswer": "A standardized system interface providing POSIX-like system calls (filesystem, clocks, random) to WebAssembly in a secure, capability-based sandbox",
        "explanation": "WASI provides a standardized, capability-based POSIX API layer for WebAssembly programs running outside the browser."
      }
    ]
  },
  {
    "title": "Node.js: High-Performance Binary Serialization",
    "description": "Protocol Buffers, FlatBuffers, MessagePack vs JSON.stringify, and schema compilation.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Performance"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "Why does Protocol Buffers (Protobuf) serialize data significantly faster and smaller than `JSON.stringify`?",
        "options": [
          "Protobuf compresses data with zip algorithms",
          "Protobuf encrypts keys with RSA",
          "Protobuf uses compact binary encoding with precompiled schemas and varints, omitting redundant field name strings from every payload",
          "JSON is limited to 1 kilobyte"
        ],
        "correctAnswer": "Protobuf uses compact binary encoding with precompiled schemas and varints, omitting redundant field name strings from every payload",
        "explanation": "Protobuf encodes field keys as small numeric tags rather than repetitive text strings, yielding compact binary payloads and fast parsing."
      },
      {
        "question": "What is the unique feature of FlatBuffers compared to Protobuf or JSON?",
        "options": [
          "It only works with flat 2D arrays",
          "It does not support numbers",
          "It compiles to CSS",
          "Data can be accessed directly from the binary buffer without an unpacking/deserialization step, enabling zero-parse reads"
        ],
        "correctAnswer": "Data can be accessed directly from the binary buffer without an unpacking/deserialization step, enabling zero-parse reads",
        "explanation": "FlatBuffers organizes memory with internal offsets so fields can be read directly from raw bytes without unpacking the object."
      },
      {
        "question": "What is `MessagePack` (`msgpack`) in the Node.js ecosystem?",
        "options": [
          "A binary serialization format that mirrors JSON data types but encodes them into compact binary buffers without requiring a predefined schema",
          "A chat messaging protocol for WebSockets",
          "An email delivery tool",
          "An npm package installer"
        ],
        "correctAnswer": "A binary serialization format that mirrors JSON data types but encodes them into compact binary buffers without requiring a predefined schema",
        "explanation": "MessagePack is 'like JSON, but fast and small', serializing arbitrary JSON-compatible structures into binary bytes without schemas."
      },
      {
        "question": "Why is `fast-json-stringify` substantially faster than native `JSON.stringify` in Node.js?",
        "options": [
          "It runs in parallel worker threads",
          "It uses a predefined JSON schema to generate specialized C++-like string concatenation functions at compile time, eliminating runtime type checking",
          "It skips serializing null values",
          "It compresses the output using Brotli"
        ],
        "correctAnswer": "It uses a predefined JSON schema to generate specialized C++-like string concatenation functions at compile time, eliminating runtime type checking",
        "explanation": "`fast-json-stringify` compiles a schema into an optimized serializer function tailored specifically for that data structure."
      },
      {
        "question": "When might binary serialization (Protobuf) be a POOR choice compared to standard JSON?",
        "options": [
          "When network speed is under 1Gbps",
          "When saving to MongoDB",
          "When rapid schema evolution, human readability, and seamless browser developer tools debugging are prioritized over raw byte throughput",
          "When writing REST APIs with Node.js"
        ],
        "correctAnswer": "When rapid schema evolution, human readability, and seamless browser developer tools debugging are prioritized over raw byte throughput",
        "explanation": "JSON is human-readable and universally supported in browser DevTools without needing compiled `.proto` definitions."
      }
    ]
  },
  {
    "title": "Node.js: Production Security Hardening",
    "description": "Permission Model (--permission), disabling eval, supply chain audits, and HTTP headers.",
    "difficulty": "hard",
    "tags": [
      "Node.js",
      "Security"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What does Node.js's native Permission Model (`--permission`) restrict when enabled?",
        "codeSnippet": "node --permission --allow-fs-read=/tmp app.js",
        "options": [
          "Restricts which users can log into Linux",
          "Requires biometric authentication",
          "Disables npm install",
          "Restricts access to system resources like the filesystem, child processes, and worker threads, requiring explicit allow-flags"
        ],
        "correctAnswer": "Restricts access to system resources like the filesystem, child processes, and worker threads, requiring explicit allow-flags",
        "explanation": "The Node.js Permission Model sandboxes the process, blocking unauthorized filesystem, process spawning, or thread access."
      },
      {
        "question": "What security vulnerability does `helmet` middleware mitigate in Express applications?",
        "options": [
          "Configures critical HTTP security headers (`Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`, `X-Content-Type-Options`) to protect against XSS, clickjacking, and sniffing",
          "Protects server memory from physical damage",
          "Encrypts the database password on disk",
          "Blocks automated web crawlers"
        ],
        "correctAnswer": "Configures critical HTTP security headers (`Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`, `X-Content-Type-Options`) to protect against XSS, clickjacking, and sniffing",
        "explanation": "Helmet sets sensible security headers that protect clients from XSS, MIME-sniffing, clickjacking, and insecure HTTP downgrades."
      },
      {
        "question": "What is 'Prototype Pollution' in Node.js applications?",
        "codeSnippet": "const payload = JSON.parse('{\"__proto__\": {\"isAdmin\": true}}');\nObject.assign(user, payload);",
        "options": [
          "A memory leak in the V8 garbage collector",
          "An attack where an attacker injects properties into `Object.prototype`, altering the behavior of all objects across the application",
          "Polluting the database with fake user accounts",
          "A compiler bug in Babel"
        ],
        "correctAnswer": "An attack where an attacker injects properties into `Object.prototype`, altering the behavior of all objects across the application",
        "explanation": "Modifying `Object.prototype` via recursive merges allows attackers to inject properties that alter authentication or execution logic."
      },
      {
        "question": "How can you protect against Prototype Pollution when merging user-supplied JSON objects?",
        "options": [
          "Run Node.js as root user",
          "Disable JSON parsing completely",
          "Validate incoming payloads against schemas, block `__proto__` and `constructor` keys, or use `Object.create(null)` for dictionary lookups",
          "Use plain strings instead of objects"
        ],
        "correctAnswer": "Validate incoming payloads against schemas, block `__proto__` and `constructor` keys, or use `Object.create(null)` for dictionary lookups",
        "explanation": "Sanitizing keys (`__proto__`, `constructor`, `prototype`) or freezing prototypes (`Object.freeze(Object.prototype)`) prevents pollution."
      },
      {
        "question": "What command inspects installed dependencies for known vulnerabilities using the advisory database?",
        "options": [
          "`npm check`",
          "`npm scan`",
          "`npm verify`",
          "`npm audit`"
        ],
        "correctAnswer": "`npm audit`",
        "explanation": "`npm audit` scans the project dependency tree against known security vulnerabilities cataloged in the advisory database."
      }
    ]
  }
];
