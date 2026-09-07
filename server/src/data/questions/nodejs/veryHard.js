export const nodejsVeryHardQuizzes = [
  {
    "title": "Node.js: V8 JIT Compilation Pipeline",
    "description": "Ignition interpreter, Sparkplug, Maglev, and TurboFan optimizing compiler tiering.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "V8"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What are the four compilation tiers in Google V8's modern execution pipeline?",
        "options": [
          "Ignition (bytecode interpreter) -> Sparkplug (non-optimizing baseline compiler) -> Maglev (mid-tier optimizing compiler) -> TurboFan (top-tier optimizing compiler)",
          "Babel -> Webpack -> V8 -> CPU",
          "Lexer -> Parser -> Interpreter -> Linker",
          "HotSpot -> C1 -> C2 -> Graal"
        ],
        "correctAnswer": "Ignition (bytecode interpreter) -> Sparkplug (non-optimizing baseline compiler) -> Maglev (mid-tier optimizing compiler) -> TurboFan (top-tier optimizing compiler)",
        "explanation": "V8 executes bytecode in Ignition, quickly compiles with Sparkplug, profiles hot functions with Maglev, and optimizes them with TurboFan."
      },
      {
        "question": "What triggers TurboFan to deoptimize (bail out of) an optimized machine code function back to interpreted bytecode?",
        "options": [
          "The computer runs low on battery",
          "A speculative type assumption fails (e.g. a function optimized for integers receives a string or an object with a different hidden class)",
          "The function executes for more than 10 seconds",
          "The function is called from an async callback"
        ],
        "correctAnswer": "A speculative type assumption fails (e.g. a function optimized for integers receives a string or an object with a different hidden class)",
        "explanation": "TurboFan optimizes code based on speculative type feedback. If an invariant is violated, V8 deoptimizes back to Ignition bytecode."
      },
      {
        "question": "What is 'On-Stack Replacement' (OSR) in V8?",
        "options": [
          "Swapping variables between CPU registers and RAM",
          "A security feature that prevents stack overflow attacks",
          "Replacing the currently executing frame of a hot loop on the physical stack with optimized machine code mid-execution without waiting for the function to return",
          "Replacing closures with global variables"
        ],
        "correctAnswer": "Replacing the currently executing frame of a hot loop on the physical stack with optimized machine code mid-execution without waiting for the function to return",
        "explanation": "OSR swaps a hot loop frame while it is running so optimization takes effect immediately without waiting for the next function invocation."
      },
      {
        "question": "What V8 flag prints deoptimization events and bailout reasons to the terminal?",
        "options": [
          "`--debug-jit`",
          "`--show-turbofan`",
          "`--bailout-log`",
          "`--trace-deopt`"
        ],
        "correctAnswer": "`--trace-deopt`",
        "explanation": "`node --trace-deopt` logs when and why functions are deoptimized by TurboFan."
      },
      {
        "question": "Why does mixing types in function arguments (polymorphic inputs) hurt TurboFan execution speed?",
        "options": [
          "TurboFan cannot generate direct, unboxed machine code instructions and must generate multiple guard checks or fall back to megamorphic call stubs",
          "V8 throws an illegal argument error",
          "It forces the CPU to switch endianness",
          "Polymorphic functions cannot be stored in memory"
        ],
        "correctAnswer": "TurboFan cannot generate direct, unboxed machine code instructions and must generate multiple guard checks or fall back to megamorphic call stubs",
        "explanation": "Monomorphic code allows TurboFan to inline functions and emit fast native CPU instructions without branch checks."
      }
    ]
  },
  {
    "title": "Node.js: Hidden Classes & Inline Caching",
    "description": "Map/Shape transitions, monomorphic vs polymorphic vs megamorphic sites, and property layout.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "V8"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is a 'Hidden Class' (also known as a 'Map' or 'Shape') in V8?",
        "options": [
          "A private class declared using the `#` symbol in JavaScript",
          "An internal C++ descriptor created by V8 that tracks an object's property layout, memory offsets, and prototype chain pointer",
          "A class encrypted in bytecode",
          "A DOM shadow root class"
        ],
        "correctAnswer": "An internal C++ descriptor created by V8 that tracks an object's property layout, memory offsets, and prototype chain pointer",
        "explanation": "V8 creates internal Maps to represent object shapes, turning slow hash-table property lookups into fast array-index memory offsets."
      },
      {
        "question": "What causes two objects with identical properties to end up with DIFFERENT hidden classes in V8?",
        "codeSnippet": "const obj1 = {}; obj1.a = 1; obj1.b = 2;\nconst obj2 = {}; obj2.b = 2; obj2.a = 1;",
        "options": [
          "Because their memory addresses differ in RAM",
          "Because obj1 has an even property value",
          "Properties were assigned in a different initialization order, creating two different transition trees and distinct Map pointers",
          "They always have the exact same hidden class"
        ],
        "correctAnswer": "Properties were assigned in a different initialization order, creating two different transition trees and distinct Map pointers",
        "explanation": "Transition trees are sensitive to insertion order. Initializing `{ a, b }` vs `{ b, a }` creates two separate hidden classes."
      },
      {
        "question": "What is an 'Inline Cache' (IC) in V8?",
        "options": [
          "A CPU L1 hardware cache",
          "A browser local storage cache",
          "A database query cache",
          "A mechanism that caches property offset lookup results directly at call sites in machine code, bypassing dictionary lookups for objects with matching Maps"
        ],
        "correctAnswer": "A mechanism that caches property offset lookup results directly at call sites in machine code, bypassing dictionary lookups for objects with matching Maps",
        "explanation": "Inline Caches remember the shape and memory offset of recent property accesses to retrieve properties in a few CPU cycles."
      },
      {
        "question": "What is the performance difference between a monomorphic call site and a megamorphic call site?",
        "options": [
          "A monomorphic call site sees only 1 hidden class (ultra-fast direct property access); a megamorphic site sees 5+ classes, dropping into slow generic hash lookups",
          "Monomorphic runs in C++; megamorphic runs in Python",
          "Megamorphic is 10x faster than monomorphic",
          "There is no performance difference"
        ],
        "correctAnswer": "A monomorphic call site sees only 1 hidden class (ultra-fast direct property access); a megamorphic site sees 5+ classes, dropping into slow generic hash lookups",
        "explanation": "Seeing more than 4 shapes forces the call site into megamorphic state, abandoning inline caches for slow hash-table lookups."
      },
      {
        "question": "Why should `delete obj.property` be avoided in performance-critical Node.js code?",
        "codeSnippet": "delete obj.x; // ANTI-PATTERN",
        "options": [
          "It permanently leaks the deleted memory",
          "Deleting properties alters the object's Map transition tree, often degrading it to slow dictionary/hash mode ('slow mode')",
          "It crashes the V8 engine on 64-bit platforms",
          "`delete` is deprecated in ES2022"
        ],
        "correctAnswer": "Deleting properties alters the object's Map transition tree, often degrading it to slow dictionary/hash mode ('slow mode')",
        "explanation": "Calling `delete` changes object shape and frequently drops the object into slow dictionary mode. Setting `obj.x = undefined` is preferred."
      }
    ]
  },
  {
    "title": "Node.js: Libuv Threadpool & Custom Work Queues",
    "description": "uv_queue_work, uv_cancel, worker thread pool starvation, and custom task scheduling.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Internals"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What does the C function `uv_queue_work(loop, req, work_cb, after_work_cb)` do in Libuv?",
        "options": [
          "Executes both callbacks synchronously on the main thread",
          "Sends the work to a remote server over TCP",
          "Offloads the computation in `work_cb` to a worker thread in the Libuv thread pool, and schedules `after_work_cb` on the main loop thread upon completion",
          "Forks a new Linux process"
        ],
        "correctAnswer": "Offloads the computation in `work_cb` to a worker thread in the Libuv thread pool, and schedules `after_work_cb` on the main loop thread upon completion",
        "explanation": "`uv_queue_work` runs intensive tasks in the Libuv thread pool and signals back to the main thread's event loop when finished."
      },
      {
        "question": "What happens when all 4 default Libuv threads are occupied by long-running CPU or cryptographic tasks?",
        "options": [
          "Libuv spawns 1,000 new threads dynamically",
          "Node.js crashes with a deadlock error",
          "Pending operations are dropped",
          "All incoming file system calls, `dns.lookup()`, and crypto operations are blocked in a waiting queue until a thread becomes available"
        ],
        "correctAnswer": "All incoming file system calls, `dns.lookup()`, and crypto operations are blocked in a waiting queue until a thread becomes available",
        "explanation": "Because the pool is finite (default 4), saturating it stalls all subsequent operations relying on the Libuv thread pool."
      },
      {
        "question": "Can a task submitted via `uv_queue_work` be cancelled using `uv_cancel()`?",
        "options": [
          "Yes, but only if the task is still waiting in the queue; once a worker thread has started executing the work callback, it cannot be cancelled",
          "Yes, it can be cancelled at any time and immediately aborted",
          "No, Libuv tasks cannot be cancelled",
          "Only in Windows IOCP"
        ],
        "correctAnswer": "Yes, but only if the task is still waiting in the queue; once a worker thread has started executing the work callback, it cannot be cancelled",
        "explanation": "`uv_cancel` only succeeds if the work request is still waiting in the queue before a worker picks it up."
      },
      {
        "question": "How does Libuv notify the main event loop that a background worker thread has finished its work callback?",
        "options": [
          "By directly invoking the JavaScript callback from the worker thread",
          "Using an internal `uv_async_t` handle or eventfd / pipe that posts an event to the main loop's poll multiplexer (epoll/kqueue)",
          "By polling a shared variable in a while-true loop",
          "Using operating system signals"
        ],
        "correctAnswer": "Using an internal `uv_async_t` handle or eventfd / pipe that posts an event to the main loop's poll multiplexer (epoll/kqueue)",
        "explanation": "Libuv uses an `async` handle to wake up the main loop safely, ensuring JS callbacks run only on the main thread."
      },
      {
        "question": "Why can native C++ code in `work_cb` NOT access V8 objects or execute JavaScript?",
        "options": [
          "V8 objects are deleted when passed to C++",
          "JavaScript does not exist in worker threads",
          "V8 isolates are not thread-safe: accessing V8 objects from background worker threads without holding a V8 Locker causes fatal race conditions and crashes",
          "C++ cannot read JavaScript memory"
        ],
        "correctAnswer": "V8 isolates are not thread-safe: accessing V8 objects from background worker threads without holding a V8 Locker causes fatal race conditions and crashes",
        "explanation": "V8 is fundamentally single-threaded per isolate. Background threads must copy raw C data and leave JS interactions for `after_work_cb` on the main thread."
      }
    ]
  },
  {
    "title": "Node.js: High-Performance Network I/O with io_uring",
    "description": "Linux io_uring kernel submission/completion rings, zero-copy socket operations, and epoll comparison.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Networking"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is `io_uring` in modern Linux kernels (5.1+)?",
        "options": [
          "A ring network topology protocol",
          "A hardware encryption ring on Intel CPUs",
          "A distributed database storage engine",
          "An asynchronous I/O interface using two shared memory ring buffers (Submission Queue and Completion Queue) between user space and kernel space, minimizing system call overhead"
        ],
        "correctAnswer": "An asynchronous I/O interface using two shared memory ring buffers (Submission Queue and Completion Queue) between user space and kernel space, minimizing system call overhead",
        "explanation": "`io_uring` eliminates system call overhead by placing I/O requests directly into shared ring buffers without context switching."
      },
      {
        "question": "How does `io_uring` eliminate system call overhead compared to `epoll` + `read()`/`write()`?",
        "options": [
          "Multiple I/O operations can be submitted and completed by writing directly to shared memory ring buffers without issuing a single `syscall` per operation",
          "By moving the Node.js process into kernel space",
          "By disabling all file permissions",
          "By running code on the network card"
        ],
        "correctAnswer": "Multiple I/O operations can be submitted and completed by writing directly to shared memory ring buffers without issuing a single `syscall` per operation",
        "explanation": "Batched submission directly into the Submission Queue allows performing hundreds of reads/writes with zero or minimal syscalls."
      },
      {
        "question": "What long-standing limitation of Linux asynchronous filesystem operations does `io_uring` solve?",
        "options": [
          "It allows reading files without a hard drive",
          "It provides true non-blocking asynchronous disk file I/O, allowing file reads and writes without needing a worker thread pool",
          "It increases file sizes to 1 petabyte",
          "It compresses all files automatically"
        ],
        "correctAnswer": "It provides true non-blocking asynchronous disk file I/O, allowing file reads and writes without needing a worker thread pool",
        "explanation": "`io_uring` finally gives Linux true async filesystem capabilities, removing the need for Libuv's thread pool for disk operations."
      },
      {
        "question": "What is 'Zero-Copy' network I/O in `io_uring`?",
        "options": [
          "Sending 0 bytes over the network",
          "Copying data with zero CPU usage",
          "Transferring data directly from network interface card (NIC) buffers to user-space buffers (or vice versa) without copying data across kernel/user space boundaries",
          "A file deletion technique"
        ],
        "correctAnswer": "Transferring data directly from network interface card (NIC) buffers to user-space buffers (or vice versa) without copying data across kernel/user space boundaries",
        "explanation": "Zero-copy networking maps kernel buffers directly to registered user buffers, avoiding redundant memcpy operations."
      },
      {
        "question": "What security concerns have caused some cloud environments or container hosts to disable `io_uring` by default?",
        "options": [
          "It consumes too much electricity",
          "It bypasses TLS encryption",
          "It disables process sandboxing",
          "A history of privilege escalation kernel vulnerabilities and the difficulty of filtering `io_uring` operations using traditional seccomp profiles"
        ],
        "correctAnswer": "A history of privilege escalation kernel vulnerabilities and the difficulty of filtering `io_uring` operations using traditional seccomp profiles",
        "explanation": "Several high-profile Linux kernel exploits targeted `io_uring`, leading some security teams to restrict it via seccomp."
      }
    ]
  },
  {
    "title": "Node.js: Slab Allocation in Buffer & Memory Leaks",
    "description": "Buffer.poolSize (8KB), slab slicing, retaining full slab allocations, and FastBuffer mechanics.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Buffers"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How does Node.js optimize memory allocations for small Buffers (under `Buffer.poolSize / 2`)?",
        "codeSnippet": "const smallBuf = Buffer.from('hello'); // Allocates from 8KB slab",
        "options": [
          "It pre-allocates an 8KB internal shared slab (`ArrayBuffer`), slicing small buffers from it to avoid thousands of small C++ allocations",
          "It saves small buffers in browser cookies",
          "It compresses them with gzip",
          "It allocates them on the CPU cache"
        ],
        "correctAnswer": "It pre-allocates an 8KB internal shared slab (`ArrayBuffer`), slicing small buffers from it to avoid thousands of small C++ allocations",
        "explanation": "Node pre-allocates an 8192-byte slab (`Buffer.poolSize`) and carves sub-buffers from it to reduce allocator overhead."
      },
      {
        "question": "What is the subtle 'Slab Retention' memory leak caused by small buffer slicing?",
        "codeSnippet": "let leak = null;\nfunction processHugePayload(bigData) {\n  const smallSlice = bigData.subarray(0, 8); // Retains entire underlying ArrayBuffer!\n  leak = smallSlice;\n}",
        "options": [
          "The buffer is deleted from memory",
          "`smallSlice` holds a reference to the ENTIRE underlying 8KB slab or large `ArrayBuffer`, preventing the garbage collector from reclaiming the parent buffer",
          "The CPU locks up",
          "Small slices cause syntax errors"
        ],
        "correctAnswer": "`smallSlice` holds a reference to the ENTIRE underlying 8KB slab or large `ArrayBuffer`, preventing the garbage collector from reclaiming the parent buffer",
        "explanation": "Slices share the underlying `ArrayBuffer`. Keeping a tiny 8-byte slice alive prevents the entire multi-megabyte parent buffer from being freed."
      },
      {
        "question": "How can you safely create an isolated copy of a buffer slice to prevent retaining the parent ArrayBuffer?",
        "codeSnippet": "const safeCopy = Buffer.from(slice); // Clones into fresh ArrayBuffer",
        "options": [
          "`slice.detach()`",
          "`Buffer.unpool(slice)`",
          "`Buffer.from(slice)` or `Uint8Array.prototype.slice.call(slice)` to clone the bytes into a dedicated fresh `ArrayBuffer`",
          "`slice.isolate()`"
        ],
        "correctAnswer": "`Buffer.from(slice)` or `Uint8Array.prototype.slice.call(slice)` to clone the bytes into a dedicated fresh `ArrayBuffer`",
        "explanation": "`Buffer.from(slice)` clones the bytes into a standalone buffer, allowing the large parent slab to be garbage collected."
      },
      {
        "question": "What is the default value of `Buffer.poolSize` in Node.js?",
        "options": [
          "`1024` bytes (1KB)",
          "`65536` bytes (64KB)",
          "`1048576` bytes (1MB)",
          "`8192` bytes (8KB)"
        ],
        "correctAnswer": "`8192` bytes (8KB)",
        "explanation": "`Buffer.poolSize` defaults to 8192 bytes (8KB). Any allocation under 4096 bytes is carved from the slab pool."
      },
      {
        "question": "What method allocates un-pooled, dedicated memory guaranteed to have its own independent `ArrayBuffer`?",
        "codeSnippet": "const buf = Buffer.allocUnsafeSlow(size);",
        "options": [
          "`Buffer.allocUnsafeSlow(size)`",
          "`Buffer.alloc(size)`",
          "`Buffer.from(size)`",
          "`Buffer.create(size)`"
        ],
        "correctAnswer": "`Buffer.allocUnsafeSlow(size)`",
        "explanation": "`Buffer.allocUnsafeSlow()` explicitly bypasses the 8KB shared pool to allocate an independent `ArrayBuffer`."
      }
    ]
  },
  {
    "title": "Node.js: Core Async Hooks Execution Tree",
    "description": "Destroy hooks, asyncId hierarchy, async wrap providers, and garbage collection tracking.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Internals"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How does `async_hooks` track the destruction and garbage collection of asynchronous resources?",
        "options": [
          "By polling memory every 10ms",
          "Through the `destroy(asyncId)` hook, triggered when the underlying C++ AsyncWrap handle is destroyed or the JS object is collected",
          "By monitoring file system writes",
          "Through a process exit handler"
        ],
        "correctAnswer": "Through the `destroy(asyncId)` hook, triggered when the underlying C++ AsyncWrap handle is destroyed or the JS object is collected",
        "explanation": "`destroy(asyncId)` is invoked when the garbage collector frees the resource's associated AsyncWrap instance."
      },
      {
        "question": "What is an `AsyncWrap` in Node.js internal C++ architecture?",
        "options": [
          "A JavaScript polyfill for Promises",
          "A CSS flexbox wrapper",
          "A base C++ class inherited by native asynchronous handles (TCPWrap, FSReqPromise, TimeoutWrap) that binds them to the `async_hooks` tracking tree",
          "An HTTP header parser"
        ],
        "correctAnswer": "A base C++ class inherited by native asynchronous handles (TCPWrap, FSReqPromise, TimeoutWrap) that binds them to the `async_hooks` tracking tree",
        "explanation": "`AsyncWrap` is the foundational C++ class linking OS handles and native requests to Node's async_hooks engine."
      },
      {
        "question": "What is the purpose of `AsyncResource.bind(fn)` in custom event libraries?",
        "codeSnippet": "const boundFn = asyncResource.bind(callback);",
        "options": [
          "It binds `this` to the function",
          "It compiles the function to bytecode",
          "It converts the function into a Promise",
          "It captures the current async context and ensures the callback executes with that context preserved, even when triggered by external non-Node callbacks"
        ],
        "correctAnswer": "It captures the current async context and ensures the callback executes with that context preserved, even when triggered by external non-Node callbacks",
        "explanation": "`bind()` ensures the execution context (and `AsyncLocalStorage` store) remains intact when callbacks are invoked by custom emitters."
      },
      {
        "question": "What does the `type` parameter passed to the `init(asyncId, type, triggerAsyncId, resource)` hook specify?",
        "options": [
          "A string naming the asynchronous provider type (e.g. `'PROMISE'`, `'TCPWRAP'`, `'FSEVENTWRAP'`, `'Timeout'`)",
          "The data type of the return value",
          "The TypeScript type signature",
          "The HTTP method"
        ],
        "correctAnswer": "A string naming the asynchronous provider type (e.g. `'PROMISE'`, `'TCPWRAP'`, `'FSEVENTWRAP'`, `'Timeout'`)",
        "explanation": "`type` identifies the category of asynchronous resource instantiated by the runtime."
      },
      {
        "question": "Why do Promise hooks in `async_hooks` have a different performance impact than handle hooks (like TCPWrap)?",
        "options": [
          "Promises are handled in kernel space",
          "Promises are created millions of times in high-throughput apps; tracking every Promise allocation causes heavy V8 deoptimizations and GC churn",
          "Promises cannot be tracked by async_hooks",
          "Handle hooks run in WebAssembly"
        ],
        "correctAnswer": "Promises are created millions of times in high-throughput apps; tracking every Promise allocation causes heavy V8 deoptimizations and GC churn",
        "explanation": "Because Promises are ephemeral and allocated prolifically, enabling promise tracking in async_hooks degrades V8 performance significantly."
      }
    ]
  },
  {
    "title": "Node.js: Low-Level TCP Socket Tuning",
    "description": "TCP_NODELAY Nagle algorithm, SO_REUSEPORT, socket buffer sizes, and TCP window scaling.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Networking"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What does `socket.setNoDelay(true)` do in Node.js, and what is its default setting?",
        "codeSnippet": "socket.setNoDelay(true);",
        "options": [
          "Delays sending packets by 100ms",
          "Disables TCP encryption",
          "Disables Nagle's algorithm (sending small packets immediately without waiting to coalesce them); enabled (`true`) by default in Node.js",
          "Increases socket buffer size to 1GB"
        ],
        "correctAnswer": "Disables Nagle's algorithm (sending small packets immediately without waiting to coalesce them); enabled (`true`) by default in Node.js",
        "explanation": "Node enables `TCP_NODELAY` by default to minimize latency for real-time web applications, disabling Nagle's algorithm."
      },
      {
        "question": "What problem does Nagle's algorithm combined with TCP Delayed ACK cause in network communication?",
        "options": [
          "Packet loss exceeding 50%",
          "Socket corruption in V8",
          "Immediate TCP disconnection",
          "A 40ms to 200ms latency stall on small payloads: Nagle waits for the peer's ACK before sending, while the peer waits to send an ACK hoping to piggyback data"
        ],
        "correctAnswer": "A 40ms to 200ms latency stall on small payloads: Nagle waits for the peer's ACK before sending, while the peer waits to send an ACK hoping to piggyback data",
        "explanation": "Nagle's algorithm and Delayed ACK create mutual waiting deadlocks that introduce artificial 40ms-200ms pauses."
      },
      {
        "question": "What is `SO_REUSEPORT` socket option supported in Linux 3.9+?",
        "options": [
          "Allows multiple independent server sockets/processes to bind to the exact same IP and port, with the Linux kernel balancing incoming connections evenly across them",
          "Allows reusing closed ports immediately without TIME_WAIT",
          "Enables port forwarding in routers",
          "Compresses network packets"
        ],
        "correctAnswer": "Allows multiple independent server sockets/processes to bind to the exact same IP and port, with the Linux kernel balancing incoming connections evenly across them",
        "explanation": "`SO_REUSEPORT` delegates connection distribution directly to the Linux kernel, avoiding user-space master process IPC bottlenecks."
      },
      {
        "question": "What is the consequence of setting socket receive/send buffers too small (`SO_RCVBUF` / `SO_SNDBUF`) under high-bandwidth latency conditions?",
        "options": [
          "Packets are corrupted with bit errors",
          "The TCP sliding window size is choked, preventing the connection from saturating the bandwidth-delay product (BDP) and capping throughput",
          "The operating system reboots",
          "Node.js converts TCP into UDP"
        ],
        "correctAnswer": "The TCP sliding window size is choked, preventing the connection from saturating the bandwidth-delay product (BDP) and capping throughput",
        "explanation": "Small buffers limit the TCP window size, restricting data in flight and crippling throughput over high-latency links."
      },
      {
        "question": "What does the `TIME_WAIT` socket state signify after closing a TCP connection?",
        "options": [
          "The server is downloading updates",
          "The socket was hacked",
          "The socket waits for 2x Maximum Segment Life (2MSL) to ensure lingering duplicate packets in the network expire before the port tuple is recycled",
          "The client rejected the disconnect request"
        ],
        "correctAnswer": "The socket waits for 2x Maximum Segment Life (2MSL) to ensure lingering duplicate packets in the network expire before the port tuple is recycled",
        "explanation": "`TIME_WAIT` prevents old delayed packets from being misinterpreted by a new connection on the same IP and port."
      }
    ]
  },
  {
    "title": "Node.js: Asymmetric Crypto & FIPS Compliance",
    "description": "ECDH elliptic curves, OpenSSL FIPS mode, crypto.generateKeyPair, and constant-time math.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Security"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How do you generate an Ed25519 asymmetric key pair asynchronously in modern Node.js?",
        "codeSnippet": "import crypto from 'crypto';\ncrypto.generateKeyPair('ed25519', options, (err, publicKey, privateKey) => { ... });",
        "options": [
          "`crypto.createAsymmetricKeys('ed25519')`",
          "`crypto.newKeys('ed25519')`",
          "`crypto.rsa.generate('ed25519')`",
          "`crypto.generateKeyPair('ed25519', options, callback)`"
        ],
        "correctAnswer": "`crypto.generateKeyPair('ed25519', options, callback)`",
        "explanation": "`crypto.generateKeyPair` generates modern elliptic curve (Ed25519, X25519) and RSA key pairs off the main thread."
      },
      {
        "question": "What does enabling OpenSSL FIPS mode (`crypto.setFips(true)`) enforce in Node.js?",
        "options": [
          "Restricts the runtime to only FIPS 140-validated cryptographic algorithms, disallowing unapproved ciphers like MD5, SHA-1, and DES",
          "Encrypts all source code on disk",
          "Requires smartcard authentication for API requests",
          "Disables HTTPS"
        ],
        "correctAnswer": "Restricts the runtime to only FIPS 140-validated cryptographic algorithms, disallowing unapproved ciphers like MD5, SHA-1, and DES",
        "explanation": "FIPS mode enforces compliance with US federal security standards, blocking insecure algorithms like MD5."
      },
      {
        "question": "What is Elliptic Curve Diffie-Hellman (ECDH) used for in Node's `crypto` module?",
        "codeSnippet": "const ecdh = crypto.createECDH('secp256k1');\nconst secret = ecdh.computeSecret(otherPublicKey);",
        "options": [
          "Encrypting files on a local disk",
          "Allowing two parties to compute a shared secret key over an insecure channel without transmitting the secret itself",
          "Generating random numbers",
          "Compressing large JSON objects"
        ],
        "correctAnswer": "Allowing two parties to compute a shared secret key over an insecure channel without transmitting the secret itself",
        "explanation": "ECDH computes shared secret keys from public/private key pairs, serving as the basis for modern TLS key exchange."
      },
      {
        "question": "Why are cryptographic operations vulnerable to Cache-Timing attacks if not written with constant-time algorithms?",
        "options": [
          "Cache files are written to `/tmp` in plaintext",
          "The CPU sends cache metrics over the network",
          "Memory access patterns that depend on secret key bits cause CPU cache hits/misses, allowing attackers to deduce keys by measuring memory access latency",
          "V8 logs cache hits to console.log"
        ],
        "correctAnswer": "Memory access patterns that depend on secret key bits cause CPU cache hits/misses, allowing attackers to deduce keys by measuring memory access latency",
        "explanation": "Branching or table lookups based on secret keys leak timing variations through the CPU cache, exposing cryptographic keys."
      },
      {
        "question": "What is the difference between `KeyObject` and raw Buffer keys in Node's modern crypto API?",
        "options": [
          "`KeyObject` is for RSA; Buffer is for AES",
          "`KeyObject` only exists in TypeScript",
          "There is no difference",
          "`KeyObject` represents an opaque handle managed by OpenSSL, preventing key material from lingering unprotected in V8 JavaScript heap memory"
        ],
        "correctAnswer": "`KeyObject` represents an opaque handle managed by OpenSSL, preventing key material from lingering unprotected in V8 JavaScript heap memory",
        "explanation": "`KeyObject` keeps cryptographic keys in native OpenSSL memory, protecting them from memory dumps and JS inspections."
      }
    ]
  },
  {
    "title": "Node.js: Zero-Copy IPC & SharedArrayBuffer Concurrency",
    "description": "Atomics.wait, Atomics.notify, futexes in Linux, and lock-free cross-thread queues.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Threading"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What does `Atomics.wait(int32Array, index, value, [timeout])` do?",
        "options": [
          "Verifies that `int32Array[index] === value` and puts the calling thread to sleep on an OS futex until awakened by `Atomics.notify()` or timeout",
          "Waits for a Promise to resolve",
          "Blocks the main Node.js event loop thread",
          "Deletes the array element"
        ],
        "correctAnswer": "Verifies that `int32Array[index] === value` and puts the calling thread to sleep on an OS futex until awakened by `Atomics.notify()` or timeout",
        "explanation": "`Atomics.wait` provides kernel futex sleeping for worker threads, waking only when notified by another thread."
      },
      {
        "question": "Why is `Atomics.wait()` strictly prohibited on the main thread in Node.js and web browsers?",
        "options": [
          "Because the main thread has no access to SharedArrayBuffer",
          "Putting the main thread to sleep blocks the entire event loop, freezing all I/O, timers, and rendering permanently",
          "V8 throws a syntax error",
          "Atomics only work on 32-bit machines"
        ],
        "correctAnswer": "Putting the main thread to sleep blocks the entire event loop, freezing all I/O, timers, and rendering permanently",
        "explanation": "Blocking the main thread with `Atomics.wait` halts event loop execution. It is only permitted in Worker threads."
      },
      {
        "question": "What underlying operating system synchronization primitive is used by `Atomics.wait` and `Atomics.notify` on Linux?",
        "options": [
          "TCP sockets",
          "Named pipes",
          "`futex` (fast userspace mutex system call)",
          "POSIX signals"
        ],
        "correctAnswer": "`futex` (fast userspace mutex system call)",
        "explanation": "Linux futexes allow zero-syscall locking in userspace unless thread contention requires sleeping or waking."
      },
      {
        "question": "How does a lock-free Single-Producer Single-Consumer (SPSC) queue achieve thread-safe communication via `SharedArrayBuffer`?",
        "options": [
          "By locking the entire memory block with `pthread_mutex`",
          "By converting data to JSON strings",
          "By pausing worker execution",
          "By using atomic head and tail index pointers with atomic load/store operations, ensuring neither thread reads partially written data without mutex locks"
        ],
        "correctAnswer": "By using atomic head and tail index pointers with atomic load/store operations, ensuring neither thread reads partially written data without mutex locks",
        "explanation": "SPSC ring buffers manipulate head/tail pointers using atomic operations, transferring data between threads with zero lock contention."
      },
      {
        "question": "What does `Atomics.compareExchange(typedArray, index, expected, replacement)` do?",
        "options": [
          "Atomically checks if `typedArray[index] === expected`; if so, sets it to `replacement`, returning the original value in a single uninterruptible atomic CPU instruction",
          "Swaps the values of two arrays",
          "Reverses the byte order",
          "Compares strings alphabetically"
        ],
        "correctAnswer": "Atomically checks if `typedArray[index] === expected`; if so, sets it to `replacement`, returning the original value in a single uninterruptible atomic CPU instruction",
        "explanation": "Compare-and-swap (CAS) is the foundational CPU primitive for constructing lock-free concurrent data structures."
      }
    ]
  },
  {
    "title": "Node.js: V8 Code Caching & Bytecode Snapshots",
    "description": "v8.compileFunction, cachedData, warmup scripts, and instant startup snapshots.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "V8"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is 'V8 Code Caching' (`cachedData`) in Node.js?",
        "codeSnippet": "const script = new vm.Script(code, { produceCachedData: true });\nconst cachedData = script.cachedData;",
        "options": [
          "Caching HTTP responses in memory",
          "Serializing compiled V8 bytecode and compile metadata to a binary buffer so future executions can skip parsing and compilation phases",
          "Minifying JavaScript code",
          "Saving console logs to disk"
        ],
        "correctAnswer": "Serializing compiled V8 bytecode and compile metadata to a binary buffer so future executions can skip parsing and compilation phases",
        "explanation": "Code caching stores compiled bytecode on disk, cutting application startup time by skipping re-parsing on subsequent runs."
      },
      {
        "question": "What does `v8.startupSnapshot.createSnapshot(config)` do in Node.js 18.8+?",
        "options": [
          "Takes a screenshot of the terminal",
          "Backs up the database",
          "Serializes the entire initialized V8 heap state into a binary snapshot file at build time, enabling sub-millisecond cold starts in serverless environments",
          "Compresses node_modules into a zip file"
        ],
        "correctAnswer": "Serializes the entire initialized V8 heap state into a binary snapshot file at build time, enabling sub-millisecond cold starts in serverless environments",
        "explanation": "V8 startup snapshots serialize an initialized heap into a binary image, restoring complete application state almost instantaneously."
      },
      {
        "question": "What flag enables automatic code caching for Node.js core modules and installed npm packages?",
        "options": [
          "`--enable-bytecode-cache`",
          "`--cache-all`",
          "`--fast-boot`",
          "`NODE_COMPILE_CACHE=path/to/cache`"
        ],
        "correctAnswer": "`NODE_COMPILE_CACHE=path/to/cache`",
        "explanation": "Node 22 introduced `NODE_COMPILE_CACHE` to persist compilation caches across process runs without manual configuration."
      },
      {
        "question": "Why will V8 reject `cachedData` generated by an earlier version of Node.js?",
        "options": [
          "Bytecode formats and V8 internal data structures change across V8 releases, causing `cachedDataRejected: true` if versions or compile flags differ",
          "Because cached data expires after 24 hours",
          "Because file permissions change",
          "To prevent license violations"
        ],
        "correctAnswer": "Bytecode formats and V8 internal data structures change across V8 releases, causing `cachedDataRejected: true` if versions or compile flags differ",
        "explanation": "Bytecode is tightly coupled to specific V8 versions and architectures; version mismatches invalidate cached data."
      },
      {
        "question": "What restrictions exist when initializing code inside a `v8.startupSnapshot` build phase?",
        "options": [
          "Code cannot use functions or objects",
          "No open file descriptors, network sockets, active timers, or pending asynchronous I/O can remain open when the snapshot is serialized",
          "Code cannot import npm packages",
          "Snapshots can only be created on Windows"
        ],
        "correctAnswer": "No open file descriptors, network sockets, active timers, or pending asynchronous I/O can remain open when the snapshot is serialized",
        "explanation": "OS handles (sockets, timers, file descriptors) cannot be serialized into heap snapshots and must be closed before snapshot creation."
      }
    ]
  },
  {
    "title": "Node.js: Undici & Modern HTTP Client Architecture",
    "description": "Undici connection pooling, pipelining, dispatchers, and replacing legacy http.Agent.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Networking"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is `Undici` in modern Node.js?",
        "options": [
          "A replacement for Express.js",
          "A database driver for SQLite",
          "The official, high-performance HTTP/1.1 client library that powers global `fetch()` natively in Node.js 18+",
          "A testing framework"
        ],
        "correctAnswer": "The official, high-performance HTTP/1.1 client library that powers global `fetch()` natively in Node.js 18+",
        "explanation": "Undici is Node's next-generation HTTP client, completely re-architected for speed and powering global `fetch()`."
      },
      {
        "question": "Why is Undici dramatically faster than the legacy `http.Agent` client in Node.js core?",
        "options": [
          "It bypasses TCP and sends data over UDP",
          "It uses multi-threading for all requests",
          "It removes SSL encryption",
          "It eliminates event emitter overhead per request, optimizes stream chunk parsing, and implements efficient connection pooling and pipelining"
        ],
        "correctAnswer": "It eliminates event emitter overhead per request, optimizes stream chunk parsing, and implements efficient connection pooling and pipelining",
        "explanation": "Undici avoids legacy EventEmitter and Stream overhead, using direct C-like state machines and connection pools."
      },
      {
        "question": "What is a `Dispatcher` in Undici architecture?",
        "options": [
          "The core interface (`Client`, `Pool`, `Agent`) responsible for queuing and dispatching HTTP requests across managed TCP connections",
          "A router for Express",
          "A load balancer hardware device",
          "An IPC message queue"
        ],
        "correctAnswer": "The core interface (`Client`, `Pool`, `Agent`) responsible for queuing and dispatching HTTP requests across managed TCP connections",
        "explanation": "Dispatchers manage connection lifecycles, connection queues, and request fulfillment in Undici."
      },
      {
        "question": "How does `undici.request()` handle streaming response bodies with minimal memory allocation?",
        "codeSnippet": "import { request } from 'undici';\nconst { statusCode, body } = await request('https://api.com');\nfor await (const chunk of body) { ... }",
        "options": [
          "It writes response data to `/tmp`",
          "`body` is an async iterable `BodyReadable` that streams incoming chunks directly from the socket without buffering the full response in memory",
          "It converts the response to a Web Worker",
          "It compresses the response using Brotli"
        ],
        "correctAnswer": "`body` is an async iterable `BodyReadable` that streams incoming chunks directly from the socket without buffering the full response in memory",
        "explanation": "`BodyReadable` supports async iteration (`for await`), streaming bytes directly from the network socket."
      },
      {
        "question": "What is HTTP/1.1 Pipelining support in Undici (`pipelining: 10`)?",
        "options": [
          "Multiplexing streams like HTTP/2",
          "Piping requests directly to stdout",
          "Sending multiple HTTP requests over a single socket without waiting for individual responses, provided the server responds in exact request order",
          "Compressing multiple HTTP requests into one"
        ],
        "correctAnswer": "Sending multiple HTTP requests over a single socket without waiting for individual responses, provided the server responds in exact request order",
        "explanation": "Pipelining queues consecutive requests on one socket without waiting for each reply, cutting round-trip times on supported servers."
      }
    ]
  },
  {
    "title": "Node.js: Native Addon ThreadSafeFunction",
    "description": "napi_threadsafe_function, calling JS from arbitrary C++ threads, and queue overflow limits.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Native Addons"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What problem does `napi_threadsafe_function` solve in Node-API C++ addons?",
        "options": [
          "Makes JavaScript multi-threaded",
          "Disables race conditions in C++",
          "Compiles C++ functions to WebAssembly",
          "Allows arbitrary background C++ threads (e.g. native audio drivers, hardware interrupts) to safely invoke JavaScript callbacks on the main Node.js event loop thread"
        ],
        "correctAnswer": "Allows arbitrary background C++ threads (e.g. native audio drivers, hardware interrupts) to safely invoke JavaScript callbacks on the main Node.js event loop thread",
        "explanation": "`ThreadSafeFunction` bridges third-party C++ threads with the V8 main thread, queuing callbacks into the event loop safely."
      },
      {
        "question": "What happens if a background C++ thread attempts to call a regular `napi_value` JavaScript function directly without a ThreadSafeFunction?",
        "options": [
          "An immediate memory corruption crash or V8 fatal assertion failure because V8 execution is not thread-safe",
          "The call executes normally",
          "The call is delayed by 10ms",
          "V8 converts the call to a Promise"
        ],
        "correctAnswer": "An immediate memory corruption crash or V8 fatal assertion failure because V8 execution is not thread-safe",
        "explanation": "Calling V8 functions from off-threads corrupts V8 state and instantly crashes the process with a segmentation fault."
      },
      {
        "question": "What does the `max_queue_size` parameter configure in `napi_create_threadsafe_function`?",
        "options": [
          "The maximum memory size of the C++ addon",
          "The maximum number of pending callback calls that can be queued before calls block or return an overflow error (`napi_queue_full`)",
          "The maximum number of threads in the OS",
          "The CPU register limit"
        ],
        "correctAnswer": "The maximum number of pending callback calls that can be queued before calls block or return an overflow error (`napi_queue_full`)",
        "explanation": "`max_queue_size` prevents unbounded memory growth if background threads push calls faster than the main event loop can process them."
      },
      {
        "question": "What must you do when a background thread is done using a `napi_threadsafe_function`?",
        "options": [
          "Delete the C++ pointer with `free()`",
          "Reboot the operating system",
          "Call `napi_release_threadsafe_function()` to decrement its reference count and allow the Node.js event loop to terminate naturally",
          "Clear the JavaScript array"
        ],
        "correctAnswer": "Call `napi_release_threadsafe_function()` to decrement its reference count and allow the Node.js event loop to terminate naturally",
        "explanation": "ThreadSafeFunctions hold an active handle on the event loop. Calling `release` allows the process to exit when idle."
      },
      {
        "question": "What is the role of the `CallJs` callback in a ThreadSafeFunction?",
        "options": [
          "A function that calls C++ from JavaScript",
          "A compiler hook for Babel",
          "A memory allocator",
          "A function executed on the main thread that converts C++ data structures into `napi_value` JavaScript arguments before calling the JS function"
        ],
        "correctAnswer": "A function executed on the main thread that converts C++ data structures into `napi_value` JavaScript arguments before calling the JS function",
        "explanation": "The `CallJs` callback runs on the main thread, marshaling native C++ payloads into V8 JS objects before invocation."
      }
    ]
  },
  {
    "title": "Node.js: Custom Module Loaders & Resolve Hooks",
    "description": "ESM loader hooks (resolve, load), module customization, and on-the-fly source code transformation.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Modules"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What command-line flag registers a custom ESM module loader hook in modern Node.js?",
        "options": [
          "`--import ./register-hooks.js` (using `module.register()`) or `--loader ./loader.mjs`",
          "`--use-loader`",
          "`--esm-hook`",
          "`--module-transform`"
        ],
        "correctAnswer": "`--import ./register-hooks.js` (using `module.register()`) or `--loader ./loader.mjs`",
        "explanation": "Node 20+ uses `module.register('./hooks.js')` loaded via `--import`, replacing legacy `--loader` flags."
      },
      {
        "question": "What are the two primary hook functions exported by a custom ESM loader module?",
        "options": [
          "`import()` and `export()`",
          "`resolve(specifier, context, nextResolve)` and `load(url, context, nextLoad)`",
          "`parse()` and `compile()`",
          "`read()` and `write()`"
        ],
        "correctAnswer": "`resolve(specifier, context, nextResolve)` and `load(url, context, nextLoad)`",
        "explanation": "`resolve` translates import specifiers to absolute file URLs, and `load` retrieves and transforms the source code."
      },
      {
        "question": "How can a custom `load` hook transpile TypeScript on the fly without an explicit build step?",
        "codeSnippet": "export async function load(url, context, nextLoad) {\n  if (url.endsWith('.ts')) {\n    const { source } = await nextLoad(url, { format: 'module' });\n    const transpiled = transpileTS(source);\n    return { format: 'module', source: transpiled };\n  }\n  return nextLoad(url, context);\n}",
        "options": [
          "Save the compiled file to node_modules",
          "Rename the file to `.js` on disk",
          "Intercept the `.ts` file in `load()`, compile its source code to JavaScript via a compiler (e.g. esbuild/swc), and return `{ format: 'module', source: transpiled }`",
          "TypeScript cannot be loaded dynamically"
        ],
        "correctAnswer": "Intercept the `.ts` file in `load()`, compile its source code to JavaScript via a compiler (e.g. esbuild/swc), and return `{ format: 'module', source: transpiled }`",
        "explanation": "Custom `load` hooks intercept source code before V8 compilation, enabling transparent runtime compilation (e.g. ts-node, tsx)."
      },
      {
        "question": "What execution environment do custom ESM module loader hooks run in in modern Node.js?",
        "options": [
          "The main thread event loop",
          "A separate OS process",
          "The browser window",
          "A dedicated, isolated Worker thread to prevent loaders from mutating global application state or leaking hooks into application code"
        ],
        "correctAnswer": "A dedicated, isolated Worker thread to prevent loaders from mutating global application state or leaking hooks into application code",
        "explanation": "Loader hooks run in a separate Worker thread to isolate module resolution logic from application execution."
      },
      {
        "question": "How do you pass communication messages between the main application thread and a registered module loader thread?",
        "options": [
          "Pass a `MessagePort` to `module.register('./hooks.js', { data: { port: messageChannel.port2 } })`",
          "Read global variables",
          "Write to a temporary file",
          "Emit process events"
        ],
        "correctAnswer": "Pass a `MessagePort` to `module.register('./hooks.js', { data: { port: messageChannel.port2 } })`",
        "explanation": "`module.register()` accepts transferable `data` (like a `MessagePort`), enabling bidirectional IPC with the loader thread."
      }
    ]
  },
  {
    "title": "Node.js: Epoll Level vs Edge Triggering in Libuv",
    "description": "Level-triggered vs edge-triggered I/O, epoll flags (EPOLLIN, EPOLLET), and draining EAGAIN.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Internals"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is the fundamental difference between 'Level-Triggered' (LT) and 'Edge-Triggered' (ET) I/O notifications in Linux `epoll`?",
        "options": [
          "Level-Triggered is for TCP; Edge-Triggered is for UDP",
          "Level-Triggered notifies continuously as long as data remains in the buffer; Edge-Triggered notifies ONLY when the state changes (new data arrives)",
          "Level-Triggered is synchronous; Edge-Triggered is asynchronous",
          "Edge-Triggered runs on the network card"
        ],
        "correctAnswer": "Level-Triggered notifies continuously as long as data remains in the buffer; Edge-Triggered notifies ONLY when the state changes (new data arrives)",
        "explanation": "Level-triggered fires as long as bytes exist to read; edge-triggered fires only on state transitions from unreadable to readable."
      },
      {
        "question": "Why does Libuv use Level-Triggered epoll mode by default instead of Edge-Triggered mode?",
        "options": [
          "Edge-Triggered is unsupported on Linux",
          "Level-Triggered uses less CPU memory",
          "Level-Triggered is simpler, less prone to subtle starvation bugs where unread bytes languish indefinitely in buffers, and matches Libuv's handle abstraction",
          "V8 requires Level-Triggered mode"
        ],
        "correctAnswer": "Level-Triggered is simpler, less prone to subtle starvation bugs where unread bytes languish indefinitely in buffers, and matches Libuv's handle abstraction",
        "explanation": "Missing a single byte in Edge-Triggered mode stalls the socket permanently. Level-Triggered mode guarantees unconsumed data is re-notified."
      },
      {
        "question": "What MUST a program do when reading from an Edge-Triggered (`EPOLLET`) non-blocking socket?",
        "options": [
          "Read exactly 1024 bytes and wait 1 second",
          "Close the socket after each read",
          "Send an ACK packet",
          "Continuously loop `read()` until it returns `-1` with `errno == EAGAIN` or `EWOULDBLOCK`, ensuring the socket buffer is completely drained"
        ],
        "correctAnswer": "Continuously loop `read()` until it returns `-1` with `errno == EAGAIN` or `EWOULDBLOCK`, ensuring the socket buffer is completely drained",
        "explanation": "Edge-triggered notifications only fire on new arrivals; callers must drain the buffer until `EAGAIN` to avoid missed data."
      },
      {
        "question": "What error code is returned by non-blocking Linux system calls when no data is currently available in the socket buffer?",
        "options": [
          "`EAGAIN` (or `EWOULDBLOCK`)",
          "`ECONNRESET`",
          "`EPIPE`",
          "`ENOENT`"
        ],
        "correctAnswer": "`EAGAIN` (or `EWOULDBLOCK`)",
        "explanation": "`EAGAIN` informs non-blocking callers that the operation would block and should be retried when the socket signals readiness."
      },
      {
        "question": "What does the `EPOLLONESHOT` flag do when polling a socket with `epoll_ctl`?",
        "options": [
          "Closes the socket after 1 byte",
          "Disables the file descriptor after an event is delivered, requiring explicit re-arming via `epoll_ctl(EPOLL_CTL_MOD)` before another event will be received",
          "Restricts the socket to 1 thread",
          "Sends 1 packet over the network"
        ],
        "correctAnswer": "Disables the file descriptor after an event is delivered, requiring explicit re-arming via `epoll_ctl(EPOLL_CTL_MOD)` before another event will be received",
        "explanation": "`EPOLLONESHOT` prevents race conditions where multiple threads wake up to process the same socket simultaneously."
      }
    ]
  },
  {
    "title": "Node.js: Tail Latency Optimization & Micro-Benchmarking",
    "description": "Mitigating tail latency (p99/p99.9), Coordinated Omission, and statistical benchmarking.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Performance"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is 'Tail Latency' (e.g. p99, p99.9) and why is it more critical than average latency in production microservices?",
        "options": [
          "The time taken to close a TCP socket",
          "The latency of the final byte in a stream",
          "The longest response times experienced by the slowest 1% or 0.1% of requests; in distributed systems with dozens of downstream calls, tail latency dominates overall user experience",
          "The average time to deploy code"
        ],
        "correctAnswer": "The longest response times experienced by the slowest 1% or 0.1% of requests; in distributed systems with dozens of downstream calls, tail latency dominates overall user experience",
        "explanation": "Even if average latency is 5ms, a p99 of 2000ms ruins user experience in fan-out microservice architectures."
      },
      {
        "question": "What primary factors cause tail latency spikes in high-throughput Node.js services?",
        "options": [
          "CSS layout reflows on the server",
          "JavaScript variable renaming",
          "V8 bytecode size",
          "Major Stop-The-World V8 GC pauses, synchronous CPU-intensive tasks blocking the event loop, and thread pool queuing for file I/O or crypto"
        ],
        "correctAnswer": "Major Stop-The-World V8 GC pauses, synchronous CPU-intensive tasks blocking the event loop, and thread pool queuing for file I/O or crypto",
        "explanation": "Stop-the-world GC pauses and event-loop-blocking synchronous code are the primary drivers of p99 latency spikes."
      },
      {
        "question": "What is 'Coordinated Omission' in load testing tools (like older ApacheBench vs Autocannon)?",
        "options": [
          "When a load testing tool waits for a slow request to complete before sending the next scheduled request, inadvertently omitting slow periods from the latency histogram",
          "When servers drop packets intentionally",
          "When two load balancers coordinate traffic",
          "A DNS caching bug"
        ],
        "correctAnswer": "When a load testing tool waits for a slow request to complete before sending the next scheduled request, inadvertently omitting slow periods from the latency histogram",
        "explanation": "Naïve load testers pause sending when the server stalls, masking the true backlog and producing overly optimistic latency measurements."
      },
      {
        "question": "Why does modern benchmarking library `Mitata` or `Tinybench` produce more reliable V8 benchmarks than `Benchmark.js`?",
        "options": [
          "They run in native C++",
          "They account for modern V8 JIT tiering (Maglev/TurboFan), warm up code properly, prevent dead code elimination, and avoid obsolete timer clamping",
          "They disable V8 garbage collection",
          "They only benchmark numbers"
        ],
        "correctAnswer": "They account for modern V8 JIT tiering (Maglev/TurboFan), warm up code properly, prevent dead code elimination, and avoid obsolete timer clamping",
        "explanation": "Modern micro-benchmarking harnesses prevent JIT dead-code elimination and properly account for multi-tier V8 compilation."
      },
      {
        "question": "What is 'Dead Code Elimination' in V8 and how can it invalidate micro-benchmarks?",
        "codeSnippet": "function bench() {\n  const res = heavyCalculation(); // Return value never used!\n}",
        "options": [
          "V8 deletes unused files on disk",
          "Variables with value null are deleted",
          "TurboFan detects that the calculated result is never read or returned, and completely strips the calculation from the compiled machine code, measuring 0ns",
          "The computer turns off"
        ],
        "correctAnswer": "TurboFan detects that the calculated result is never read or returned, and completely strips the calculation from the compiled machine code, measuring 0ns",
        "explanation": "Optimizing compilers eliminate operations whose results are never consumed, leading naive benchmarks to report artificially instant runtimes."
      }
    ]
  },
  {
    "title": "Node.js: Core Architecture & Bootstrapping",
    "description": "node.cc, internalBinding, bootstrap loaders, and C++ to JS initialization sequence.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Internals"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is the very first C++ function executed when starting the Node.js runtime?",
        "options": [
          "`main.js`",
          "`V8::Initialize()`",
          "`uv_run()`",
          "`node::Start(int argc, char** argv)` in `src/node.cc`"
        ],
        "correctAnswer": "`node::Start(int argc, char** argv)` in `src/node.cc`",
        "explanation": "The entry point of the Node executable is `node::Start` in `src/node.cc`, which parses CLI flags and boots the environment."
      },
      {
        "question": "What is `internalBinding()` in Node.js internal core modules?",
        "options": [
          "A private internal C++ binding mechanism used by Node core JS files to import native C++ functions (e.g. `internalBinding('fs')`, `internalBinding('tcp_wrap')`)",
          "A CSS binding tool",
          "A global variable on `window`",
          "An npm package manager command"
        ],
        "correctAnswer": "A private internal C++ binding mechanism used by Node core JS files to import native C++ functions (e.g. `internalBinding('fs')`, `internalBinding('tcp_wrap')`)",
        "explanation": "`internalBinding` gives internal JS libraries direct access to C++ primitives without exposing them to user-space code."
      },
      {
        "question": "What does the `lib/internal/bootstrap/node.js` script do during process initialization?",
        "options": [
          "Compiles C++ files to binary",
          "Sets up the global scope, initializes built-in prototypes, configures process error handlers, and loads the user entry-point script",
          "Installs node_modules from the web",
          "Runs unit tests"
        ],
        "correctAnswer": "Sets up the global scope, initializes built-in prototypes, configures process error handlers, and loads the user entry-point script",
        "explanation": "The bootstrap script configures `process`, `global`, error handlers, and kicks off the execution of the user's script."
      },
      {
        "question": "Why are Node.js core JavaScript modules (like `fs.js`, `http.js`) pre-compiled into the Node binary?",
        "options": [
          "Because Node.js cannot read `.js` files from disk",
          "To make the files unreadable to open source contributors",
          "To eliminate filesystem reads on startup and protect core libraries from tampering, embedding their bytecode directly into the executable via `js2c.py`",
          "To speed up CSS processing"
        ],
        "correctAnswer": "To eliminate filesystem reads on startup and protect core libraries from tampering, embedding their bytecode directly into the executable via `js2c.py`",
        "explanation": "Core JS files are embedded directly into the C++ executable binary as C char arrays during build, enabling instant startup."
      },
      {
        "question": "What is an `Environment` instance in Node.js C++ internals (`node::Environment`)?",
        "options": [
          "A copy of `process.env`",
          "The operating system name",
          "The computer terminal",
          "An object that encapsulates all runtime state for a single Node.js instance: its V8 Isolate, Libuv event loop, async_hooks, and active handles"
        ],
        "correctAnswer": "An object that encapsulates all runtime state for a single Node.js instance: its V8 Isolate, Libuv event loop, async_hooks, and active handles",
        "explanation": "A `node::Environment` struct isolates all state for one Node instance or Worker thread, holding its V8 isolate and Libuv loop."
      }
    ]
  },
  {
    "title": "Node.js: Memory Dump Analysis with LLDB & Core Dumps",
    "description": "lldb, v8-lldb plugin, post-mortem debugging, core dumps, and inspecting stack frames.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Debugging"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is an operating system 'Core Dump' in the context of a crashed Node.js application?",
        "options": [
          "A snapshot of the process's entire physical memory space, CPU registers, and execution state at the exact instant it crashed (e.g. on SIGSEGV or abort)",
          "A backup of the database",
          "A list of installed npm packages",
          "A compressed zip of the source code"
        ],
        "correctAnswer": "A snapshot of the process's entire physical memory space, CPU registers, and execution state at the exact instant it crashed (e.g. on SIGSEGV or abort)",
        "explanation": "A core dump preserves complete process memory and registers at crash time for post-mortem forensic analysis."
      },
      {
        "question": "What command-line debugger is standard on Linux and macOS for analyzing core dumps and native C++ crashes in Node.js?",
        "options": [
          "`curl`",
          "`lldb` or `gdb`",
          "`grep`",
          "`npm test`"
        ],
        "correctAnswer": "`lldb` or `gdb`",
        "explanation": "`lldb` (and `gdb`) are low-level native debuggers used to inspect stack traces, memory addresses, and registers in core dumps."
      },
      {
        "question": "Why do standard C++ debuggers (like GDB/LLDB) display unreadable stack frames (`v8::internal::...`) for running JavaScript functions without plugins?",
        "options": [
          "Because JavaScript is encrypted in memory",
          "Because GDB does not support 64-bit systems",
          "JavaScript code is dynamically JIT-compiled into memory at runtime and lacks static DWARF debugging symbols; tools like `v8-lldb` decode V8 frames dynamically",
          "Because V8 deletes function names"
        ],
        "correctAnswer": "JavaScript code is dynamically JIT-compiled into memory at runtime and lacks static DWARF debugging symbols; tools like `v8-lldb` decode V8 frames dynamically",
        "explanation": "JIT code is generated dynamically in RAM. Plugins (like `llnode` or `v8-lldb`) parse V8 internal heap structures to reconstruct JS function names and lines."
      },
      {
        "question": "What flag instructs Node.js to automatically generate a core dump file upon encountering a fatal error or abort?",
        "options": [
          "`--dump-core`",
          "`--save-crash`",
          "`--crash-file`",
          "`--abort-on-uncaught-exception`"
        ],
        "correctAnswer": "`--abort-on-uncaught-exception`",
        "explanation": "`--abort-on-uncaught-exception` aborts the process instead of cleanly exiting, triggering the OS to write a core dump."
      },
      {
        "question": "What tool in the Node.js ecosystem was specifically designed as an LLDB plugin for post-mortem inspection of Node objects and closures?",
        "options": [
          "`llnode`",
          "`nodegdb`",
          "`v8trace`",
          "`coredump-js`"
        ],
        "correctAnswer": "`llnode`",
        "explanation": "`llnode` is an LLDB plugin that inspects JS stack frames, objects, and memory leaks directly inside core dump files."
      }
    ]
  },
  {
    "title": "Node.js: Edge Computing & V8 Isolates Architecture",
    "description": "Cloudflare Workers / Deno vs Node.js, V8 Isolate memory sandboxing, and execution limits.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Architecture"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How does an Edge runtime based on V8 Isolates (like Cloudflare Workers) achieve sub-millisecond cold starts compared to containerized Node.js?",
        "options": [
          "Edge servers run on quantum computers",
          "Isolates run thousands of separate sandboxed customer contexts within a single shared OS process, avoiding OS process spawning and container virtualization overhead",
          "Edge runtimes skip compiling JavaScript",
          "Edge runtimes do not use RAM"
        ],
        "correctAnswer": "Isolates run thousands of separate sandboxed customer contexts within a single shared OS process, avoiding OS process spawning and container virtualization overhead",
        "explanation": "V8 Isolates provide secure, lightweight memory isolation within one process, spinning up in under 5 milliseconds with negligible memory overhead."
      },
      {
        "question": "What native Node.js APIs are typically UNAVAILABLE in V8 Isolate Edge runtimes?",
        "options": [
          "`fetch` and `Response`",
          "`JSON.stringify` and `JSON.parse`",
          "`fs` (local filesystem), `child_process` (spawning OS binaries), `cluster`, and native C++ addons (`.node`)",
          "`Promise` and `async/await`"
        ],
        "correctAnswer": "`fs` (local filesystem), `child_process` (spawning OS binaries), `cluster`, and native C++ addons (`.node`)",
        "explanation": "Edge isolates do not provide access to host filesystems or process execution for security and portability reasons."
      },
      {
        "question": "What is the memory limit of a typical Edge Isolate worker compared to a traditional Node.js server?",
        "options": [
          "Edge isolates have unlimited RAM",
          "Edge isolates only have 1 kilobyte of RAM",
          "Traditional Node.js is limited to 64MB",
          "Edge isolates typically restrict memory to 128MB (or less) per tenant; traditional Node.js processes comfortably allocate 1GB to 4GB+"
        ],
        "correctAnswer": "Edge isolates typically restrict memory to 128MB (or less) per tenant; traditional Node.js processes comfortably allocate 1GB to 4GB+",
        "explanation": "Isolate runtimes enforce strict memory caps (typically 128MB) to pack thousands of tenants onto a single machine."
      },
      {
        "question": "What standardized API layer has been adopted across Node.js, Deno, and Cloudflare Workers for runtime interoperability?",
        "options": [
          "WinterCG (Web-interoperable Runtimes Community Group) standards, including standard `fetch`, `Headers`, `ReadableStream`, and Web Crypto",
          "POSIX C standards",
          "CommonJS 2.0",
          "Express API standards"
        ],
        "correctAnswer": "WinterCG (Web-interoperable Runtimes Community Group) standards, including standard `fetch`, `Headers`, `ReadableStream`, and Web Crypto",
        "explanation": "WinterCG defines a common suite of web-standard APIs so server code runs seamlessly across Node, Deno, and Edge Workers."
      },
      {
        "question": "Why is CPU time strictly capped (e.g. 50ms) in serverless Edge isolates?",
        "options": [
          "CPUs overheat after 50ms",
          "Because thousands of isolates share the same host CPU cores; unbounded compute in one isolate would starve neighboring tenants on the shared thread pool",
          "To prevent JavaScript memory leaks",
          "Because Edge runtimes run on battery power"
        ],
        "correctAnswer": "Because thousands of isolates share the same host CPU cores; unbounded compute in one isolate would starve neighboring tenants on the shared thread pool",
        "explanation": "Multi-tenant isolate architectures prevent 'noisy neighbor' starvation by enforcing strict CPU time quotas on execution."
      }
    ]
  },
  {
    "title": "Node.js: Supply Chain Security & Package Integrity",
    "description": "Lockfile poisoning, npm provenance, package signing, and build-time supply chain attacks.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Security"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is a 'Lockfile Poisoning' attack in npm projects?",
        "options": [
          "Corrupting the lockfile so `npm install` crashes",
          "Deleting `package.json`",
          "A malicious actor modifies `resolved` URLs or integrity hashes in `package-lock.json` via a pull request to pull trojaned packages from an untrusted registry",
          "Encrypting the lockfile for ransom"
        ],
        "correctAnswer": "A malicious actor modifies `resolved` URLs or integrity hashes in `package-lock.json` via a pull request to pull trojaned packages from an untrusted registry",
        "explanation": "Lockfile poisoning swaps download URLs in lockfiles to secretly install compromised packages during subsequent installs."
      },
      {
        "question": "What is 'NPM Provenance' introduced via Sigstore in modern npm?",
        "codeSnippet": "npm publish --provenance",
        "options": [
          "Scans code for copyright violations",
          "Verifies the developer's credit card",
          "Translates code to French",
          "Cryptographically links published packages to their exact source GitHub repository and GitHub Actions build workflow using OpenID Connect (OIDC) and Rekor transparency logs"
        ],
        "correctAnswer": "Cryptographically links published packages to their exact source GitHub repository and GitHub Actions build workflow using OpenID Connect (OIDC) and Rekor transparency logs",
        "explanation": "NPM Provenance provides verifiable cryptographic proof that a package was built directly from a specific commit in a trusted CI pipeline."
      },
      {
        "question": "What security risk is introduced by `preinstall` and `postinstall` lifecycle scripts in npm packages?",
        "options": [
          "They execute arbitrary shell commands automatically with the user's full permissions upon running `npm install`, allowing malicious packages to install backdoors or exfiltrate env secrets",
          "They slow down installation by 2 seconds",
          "They delete git commit history",
          "They prevent packages from being imported"
        ],
        "correctAnswer": "They execute arbitrary shell commands automatically with the user's full permissions upon running `npm install`, allowing malicious packages to install backdoors or exfiltrate env secrets",
        "explanation": "Install scripts run arbitrary commands during `npm install`. Running with `--ignore-scripts` neutralizes this attack vector."
      },
      {
        "question": "How does the `--ignore-scripts` flag protect automated CI build pipelines?",
        "options": [
          "Skips running `npm test`",
          "Prevents untrusted third-party dependencies from executing arbitrary lifecycle scripts (`preinstall`, `postinstall`) during `npm install`",
          "Ignores TypeScript errors",
          "Disables ESLint"
        ],
        "correctAnswer": "Prevents untrusted third-party dependencies from executing arbitrary lifecycle scripts (`preinstall`, `postinstall`) during `npm install`",
        "explanation": "`--ignore-scripts` blocks automatic execution of untrusted scripts during dependency installation."
      },
      {
        "question": "What is a 'Typosquatting' attack on the npm registry?",
        "options": [
          "Creating typing errors in TypeScript definitions",
          "Hacking npm servers",
          "Publishing malicious packages with names nearly identical to popular libraries (e.g. `crossenv` instead of `cross-env`) hoping developers make a typo",
          "Flooding npm with spam comments"
        ],
        "correctAnswer": "Publishing malicious packages with names nearly identical to popular libraries (e.g. `crossenv` instead of `cross-env`) hoping developers make a typo",
        "explanation": "Typosquatting relies on typographical errors to trick developers into installing malicious lookalike packages."
      }
    ]
  },
  {
    "title": "Node.js: Microsecond Profiling with eBPF & USDT",
    "description": "User Statically-Defined Tracing, eBPF kernel instrumentation, and zero-overhead production probes.",
    "difficulty": "very hard",
    "tags": [
      "Node.js",
      "Profiling"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What are USDT (User Statically-Defined Tracing) probes in Node.js?",
        "options": [
          "USB hardware probes connected to server motherboards",
          "A JavaScript unit testing library",
          "A network packet sniffer",
          "DTrace/eBPF probe tracepoints compiled directly into the Node.js executable that can be dynamically enabled by the Linux kernel with zero overhead when inactive"
        ],
        "correctAnswer": "DTrace/eBPF probe tracepoints compiled directly into the Node.js executable that can be dynamically enabled by the Linux kernel with zero overhead when inactive",
        "explanation": "USDT probes embed NOP instructions in compiled binaries; enabling them dynamically via eBPF allows kernel-level tracing with zero inactive overhead."
      },
      {
        "question": "What is 'eBPF' (Extended Berkeley Packet Filter) in modern Linux production observability?",
        "options": [
          "A sandboxed in-kernel virtual machine that executes custom tracing programs safely inside the Linux kernel in response to kernel and userspace events",
          "A firewall that blocks port 80",
          "A packet routing protocol for VPNs",
          "A video compression codec"
        ],
        "correctAnswer": "A sandboxed in-kernel virtual machine that executes custom tracing programs safely inside the Linux kernel in response to kernel and userspace events",
        "explanation": "eBPF runs verified bytecode directly inside the Linux kernel, enabling non-invasive tracing of system calls, network packets, and user probes."
      },
      {
        "question": "How can eBPF profile Node.js event loop latency without modifying a single line of JavaScript code?",
        "options": [
          "By injecting console.log statements into memory",
          "By attaching eBPF kprobes to system calls (e.g. `epoll_wait`) and measuring the exact duration between when a socket event wakes up the thread and when the next poll occurs",
          "By reading the package.json file",
          "By restarting Node.js in debug mode"
        ],
        "correctAnswer": "By attaching eBPF kprobes to system calls (e.g. `epoll_wait`) and measuring the exact duration between when a socket event wakes up the thread and when the next poll occurs",
        "explanation": "Tracing `epoll_wait` entry and exit points at the kernel level gives exact event loop pause and execution timings with zero JS overhead."
      },
      {
        "question": "What is the overhead of an inactive (untraced) USDT probe in the Node.js binary?",
        "options": [
          "10% CPU overhead",
          "50MB of RAM",
          "Virtually zero: it is compiled as a single CPU `NOP` (no-operation) instruction that takes less than one CPU cycle to pass over",
          "It delays the event loop by 1ms"
        ],
        "correctAnswer": "Virtually zero: it is compiled as a single CPU `NOP` (no-operation) instruction that takes less than one CPU cycle to pass over",
        "explanation": "When inactive, a USDT probe is literally a single `NOP` instruction, making it completely safe to leave compiled into production binaries."
      },
      {
        "question": "What tool in the BCC (BPF Compiler Collection) suite profiles CPU call stacks including both kernel and user-space Node.js frames?",
        "options": [
          "`node-inspector`",
          "`top`",
          "`traceroute`",
          "`profile.py`"
        ],
        "correctAnswer": "`profile.py`",
        "explanation": "BCC's `profile.py` samples kernel and userspace stack traces via eBPF, producing combined native/kernel flamegraphs."
      }
    ]
  }
];
