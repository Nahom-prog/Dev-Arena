export const pythonVeryHardChallenges = [
  {
    "title": "Python: CPython Bytecode & `dis` Module Internals",
    "description": "Opcode evaluation, evaluation loop (_PyEval_EvalFrameDefault), code objects, and co_code inspection.",
    "timeLimitMinutes": 15,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "In CPython's virtual machine, where does bytecode execution physically take place?",
        "options": [
          "Inside the `_PyEval_EvalFrameDefault()` giant C switch loop in `Python/ceval.c`",
          "Directly on the host CPU's instruction pipeline without software interpretation",
          "Inside a JIT compiler written in Rust",
          "In the operating system kernel via eBPF probes"
        ],
        "correctAnswer": "Inside the `_PyEval_EvalFrameDefault()` giant C switch loop in `Python/ceval.c`",
        "explanation": "CPython executes bytecode within `_PyEval_EvalFrameDefault()` in `ceval.c`, dispatching opcodes using computed gotos or a giant switch statement."
      },
      {
        "question": "What does the following disassembly from `dis.dis()` reveal about constant folding?",
        "codeSnippet": "import dis\ndef calc():\n    return 60 * 60 * 24\ndis.dis(calc)",
        "language": "python",
        "options": [
          "CPython's peephole/AST optimizer folds arithmetic on constants at compile time, loading `86400` via a single `LOAD_CONST` opcode",
          "It emits three separate `BINARY_OP` opcodes at runtime",
          "It delegates the calculation to the math coprocessor",
          "It converts the calculation into a string"
        ],
        "correctAnswer": "CPython's peephole/AST optimizer folds arithmetic on constants at compile time, loading `86400` via a single `LOAD_CONST` opcode",
        "explanation": "CPython's AST optimizer evaluates constant binary expressions at compilation time, storing the folded result directly in `co_consts`."
      },
      {
        "question": "Why is `LOAD_FAST` significantly faster than `LOAD_GLOBAL` in CPython bytecode?",
        "options": [
          "`LOAD_FAST` indexes directly into a fixed-size C array on the frame object; `LOAD_GLOBAL` performs dictionary lookups across globals and builtins",
          "`LOAD_FAST` runs on CPU registers while `LOAD_GLOBAL` runs in RAM",
          "`LOAD_FAST` bypasses type checking",
          "`LOAD_GLOBAL` requires network verification"
        ],
        "correctAnswer": "`LOAD_FAST` indexes directly into a fixed-size C array on the frame object; `LOAD_GLOBAL` performs dictionary lookups across globals and builtins",
        "explanation": "Local variables are indexed by integer offsets in a contiguous C array (`fastlocals`). Globals require hash lookups in `f_globals` and `f_builtins`."
      },
      {
        "question": "What does the `code` object's `co_varnames` attribute contain?",
        "codeSnippet": "def sample(a, b):\n    c = a + b\n    return c\nprint(sample.__code__.co_varnames)",
        "language": "python",
        "options": [
          "A tuple containing parameter names followed by local variable names: `('a', 'b', 'c')`",
          "All global variables accessed inside the function",
          "The function docstrings",
          "The raw binary bytecode instructions"
        ],
        "correctAnswer": "A tuple containing parameter names followed by local variable names: `('a', 'b', 'c')`",
        "explanation": "`co_varnames` is a tuple of all local variable names, starting with arguments, used by `LOAD_FAST` and `STORE_FAST`."
      },
      {
        "question": "What bytecode instruction layout change was introduced in Python 3.6+ with wordcode?",
        "options": [
          "All bytecode instructions were standardized to exactly 2 bytes (1 byte opcode, 1 byte oparg), simplifying jump offsets and decoding",
          "Bytecode instructions became 64-bit wide",
          "Opcodes were replaced with LLVM IR",
          "Bytecode was encrypted to prevent decompilation"
        ],
        "correctAnswer": "All bytecode instructions were standardized to exactly 2 bytes (1 byte opcode, 1 byte oparg), simplifying jump offsets and decoding",
        "explanation": "Python 3.6 introduced wordcode, fixing instructions at 16 bits (2 bytes). Extended arguments use `EXTENDED_ARG` opcodes."
      }
    ]
  },
  {
    "title": "Python: C Extensions & Cython / CFFI Performance",
    "description": "Python/C API (PyObject), GIL release, CFFI out-of-line mode, and Cython cdef declarations.",
    "timeLimitMinutes": 15,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What is the memory structure of a standard `PyObject` header in CPython?",
        "codeSnippet": "typedef struct _object {\n    _PyObject_HEAD_EXTRA\n    Py_ssize_t ob_refcnt;\n    struct _typeobject *ob_type;\n} PyObject;",
        "language": "c",
        "options": [
          "A reference counter (`ob_refcnt`) and a pointer to the type object (`ob_type`) representing its dynamic type",
          "A 64-bit hash code and a string name",
          "A virtual function table and a mutex lock",
          "A garbage collector timestamp and process ID"
        ],
        "correctAnswer": "A reference counter (`ob_refcnt`) and a pointer to the type object (`ob_type`) representing its dynamic type",
        "explanation": "Every Python object shares the `PyObject_HEAD` containing the reference count and type pointer."
      },
      {
        "question": "In Cython, how does `cdef double calculate(double x):` achieve near-C native execution speed?",
        "options": [
          "It bypasses Python object wrapping, reference counting, and dynamic dispatch, generating raw C function calls using unboxed C data types",
          "It compiles the code to WebAssembly",
          "It runs the function on the GPU",
          "It disables all memory allocation"
        ],
        "correctAnswer": "It bypasses Python object wrapping, reference counting, and dynamic dispatch, generating raw C function calls using unboxed C data types",
        "explanation": "`cdef` declares unboxed native C variables and functions, eliminating Python object wrapping overhead and dynamic lookups."
      },
      {
        "question": "What must a C-extension developer be extremely vigilant about when using `Py_BEGIN_ALLOW_THREADS` and `Py_END_ALLOW_THREADS`?",
        "options": [
          "No Python/C API functions or `PyObject*` manipulations may be called while the GIL is released, or severe memory corruption/crashes will occur",
          "It disables CPU caching",
          "It invalidates all memory pointers",
          "Threads must be terminated within 100 milliseconds"
        ],
        "correctAnswer": "No Python/C API functions or `PyObject*` manipulations may be called while the GIL is released, or severe memory corruption/crashes will occur",
        "explanation": "While the GIL is dropped, touching any `PyObject` or invoking Python C APIs without re-acquiring the GIL causes fatal race conditions."
      },
      {
        "question": "Why is CFFI's 'API-mode out-of-line' configuration preferred over Python's built-in `ctypes` for production C library interop?",
        "options": [
          "CFFI parses real C header files with a C compiler at build time, verifying struct layouts and types natively, whereas `ctypes` relies on runtime guessing",
          "`ctypes` is deprecated in Python 3.12",
          "CFFI runs in a separate process",
          "`ctypes` cannot call standard shared libraries (.so / .dll)"
        ],
        "correctAnswer": "CFFI parses real C header files with a C compiler at build time, verifying struct layouts and types natively, whereas `ctypes` relies on runtime guessing",
        "explanation": "Out-of-line CFFI compiles a true C extension module at build time, eliminating runtime dynamic lookup overhead and catching struct layout bugs."
      },
      {
        "question": "What macro must be called in C extensions when returning a borrowed reference to increment its refcount?",
        "options": [
          "Py_INCREF(obj) (or Py_NewRef(obj))",
          "Py_RETAIN(obj)",
          "Py_HOLD(obj)",
          "Py_LOCK(obj)"
        ],
        "correctAnswer": "Py_INCREF(obj) (or Py_NewRef(obj))",
        "explanation": "Returning an object to the Python runtime transfers ownership, requiring `Py_INCREF` (or Python 3.10's `Py_NewRef`) so the caller owns the reference."
      }
    ]
  },
  {
    "title": "Python: Frame Evaluation & Custom Bytecode Optimizers",
    "description": "PEP 523 (Python frame evaluation API), JIT interception, sys.settrace overhead, and opcode hot-patching.",
    "timeLimitMinutes": 15,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What capability did PEP 523 introduce to CPython via `_PyInterpreterState_SetEvalFrameFunc`?",
        "options": [
          "Allows third-party JIT compilers and profilers to plug in custom C frame evaluation functions to intercept and compile bytecode frames before execution",
          "Allows writing Python code directly in assembly",
          "Removes the Python runtime stack",
          "Enables hardware virtualization for Python"
        ],
        "correctAnswer": "Allows third-party JIT compilers and profilers to plug in custom C frame evaluation functions to intercept and compile bytecode frames before execution",
        "explanation": "PEP 523 exposed the frame evaluation function pointer, enabling tools like Pyjion, PyTorch Dynamo, and Microsoft debuggers to hook execution."
      },
      {
        "question": "Why does `sys.settrace()` incur massive performance overhead (often 10x-20x slowdown)?",
        "options": [
          "It forces CPython to drop into slow unoptimized execution and invoke a Python callback function for every single executed line or bytecode opcode",
          "It writes execution logs directly to disk synchronously",
          "It disables multi-core processing",
          "It re-compiles the script on every line"
        ],
        "correctAnswer": "It forces CPython to drop into slow unoptimized execution and invoke a Python callback function for every single executed line or bytecode opcode",
        "explanation": "`sys.settrace` hooks every instruction and line step, causing thousands of Python callback invocations that prevent bytecode optimizations."
      },
      {
        "question": "How does PyTorch's `torch.compile` (TorchDynamo) use the PEP 523 frame evaluation API?",
        "options": [
          "Intercepts Python frames, parses the bytecode into an FX graph, extracts PyTorch tensor operations for Triton compilation, and falls back to Python for arbitrary code",
          "Replaces CPython with a custom C++ runtime",
          "Runs Python scripts inside CUDA kernels",
          "Disables Python's dynamic typing"
        ],
        "correctAnswer": "Intercepts Python frames, parses the bytecode into an FX graph, extracts PyTorch tensor operations for Triton compilation, and falls back to Python for arbitrary code",
        "explanation": "TorchDynamo intercepts frame evaluation, extracts numerical tensor graphs for compilation, and safely guards and falls back on non-tensor operations."
      },
      {
        "question": "What is stored in a Python frame object's `f_back` attribute?",
        "options": [
          "The return value of the previous frame",
          "A pointer to the calling frame that invoked the current frame, forming the linked execution call stack",
          "The compiled bytecode of the parent module",
          "The garbage collector generation pointer"
        ],
        "correctAnswer": "A pointer to the calling frame that invoked the current frame, forming the linked execution call stack",
        "explanation": "`f_back` links to the caller's frame, allowing tracebacks and inspection modules like `inspect` to unwind the call stack."
      },
      {
        "question": "In Python 3.11+, what does the Adaptive Specializing Interpreter (PEP 659) do with bytecode opcodes?",
        "options": [
          "Translates Python to machine code using LLVM",
          "Dynamically replaces generic opcodes (like `BINARY_OP`) with specialized instructions (like `BINARY_OP_ADD_INT`) after observing consistent operand types at runtime",
          "Disables garbage collection during hot loops",
          "Pre-allocates 1GB of heap memory"
        ],
        "correctAnswer": "Dynamically replaces generic opcodes (like `BINARY_OP`) with specialized instructions (like `BINARY_OP_ADD_INT`) after observing consistent operand types at runtime",
        "explanation": "PEP 659 introduced quickening and specializing adaptive bytecode: hot opcodes morph into type-specialized fast paths inline."
      }
    ]
  },
  {
    "title": "Python: Asyncio Task Cancellation, Shielding & Exception Groups",
    "description": "CancelledError handling, asyncio.shield gotchas, BaseExceptionGroup unwrapping, and task leak prevention.",
    "timeLimitMinutes": 15,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What must you do if you catch `asyncio.CancelledError` inside a coroutine to ensure task cancellation contracts are respected?",
        "codeSnippet": "try:\n    await stream_data()\nexcept asyncio.CancelledError:\n    clean_up()\n    raise  # Why re-raise?",
        "language": "python",
        "options": [
          "Suppress it by returning `None`",
          "Always re-raise `CancelledError` after cleanup so the calling TaskGroup or event loop knows the task was successfully cancelled",
          "Convert it to a `RuntimeError`",
          "Call `loop.stop()`"
        ],
        "correctAnswer": "Always re-raise `CancelledError` after cleanup so the calling TaskGroup or event loop knows the task was successfully cancelled",
        "explanation": "Suppressing `CancelledError` causes the task to report successful completion instead of cancellation, breaking structured concurrency invariants."
      },
      {
        "question": "What common misconception exists regarding `asyncio.shield(coro())`?",
        "options": [
          "`asyncio.shield` makes the coroutine run in a separate OS thread",
          "Shielding protects the inner task from cancellation, but if the outer caller is cancelled, the shielded task continues running in the background as an orphaned task",
          "`asyncio.shield` prevents `CancelledError` from being raised anywhere",
          "`asyncio.shield` can only protect HTTP requests"
        ],
        "correctAnswer": "Shielding protects the inner task from cancellation, but if the outer caller is cancelled, the shielded task continues running in the background as an orphaned task",
        "explanation": "`asyncio.shield` protects the wrapped task from the caller's cancellation, but does NOT prevent the caller from being cancelled, potentially abandoning background work."
      },
      {
        "question": "How do you handle multiple concurrent exceptions in Python 3.11+ with the `except*` syntax?",
        "codeSnippet": "try:\n    async with asyncio.TaskGroup() as tg:\n        tg.create_task(task1())\n        tg.create_task(task2())\nexcept* ValueError as eg:\n    handle_value_errors(eg)\nexcept* KeyError as eg:\n    handle_key_errors(eg)",
        "language": "python",
        "options": [
          "`except*` retries failed tasks up to 3 times",
          "`except*` pattern-matches and splits an `ExceptionGroup`, allowing different handlers to execute for different concurrent exception types simultaneously",
          "`except*` silences all exceptions across tasks",
          "`except*` runs in a separate thread"
        ],
        "correctAnswer": "`except*` pattern-matches and splits an `ExceptionGroup`, allowing different handlers to execute for different concurrent exception types simultaneously",
        "explanation": "PEP 654 introduced `except*` to unwrap `ExceptionGroup` hierarchies, routing each exception to its matching handler."
      },
      {
        "question": "In Python 3.8+, why does `asyncio.CancelledError` inherit from `BaseException` rather than `Exception`?",
        "options": [
          "Because cancellation is an operating system hardware error",
          "To prevent generic `except Exception:` blocks from accidentally swallowing cancellation signals and preventing tasks from exiting",
          "To allow cancellation to run in C mode",
          "It is a legacy compatibility quirk"
        ],
        "correctAnswer": "To prevent generic `except Exception:` blocks from accidentally swallowing cancellation signals and preventing tasks from exiting",
        "explanation": "Inheriting from `BaseException` ensures standard application `except Exception:` blocks do not catch and swallow cancellation."
      },
      {
        "question": "What happens if a coroutine attempts to `await` another operation inside `except asyncio.CancelledError:` during task shutdown?",
        "options": [
          "Python raises a fatal panic immediately",
          "In Python 3.11+, cancelling a task marks it with an uncancel count, allowing cleanup code to perform asynchronous teardown awaits before cancellation completes",
          "The event loop terminates instantly",
          "The await operation is discarded"
        ],
        "correctAnswer": "In Python 3.11+, cancelling a task marks it with an uncancel count, allowing cleanup code to perform asynchronous teardown awaits before cancellation completes",
        "explanation": "Python 3.11 introduced `uncancel()` and cancellation counters so async cleanup handlers can safely await asynchronous flush operations."
      }
    ]
  },
  {
    "title": "Python: Free-Threaded Python 3.13 (No-GIL Internals & Mimalloc)",
    "description": "PEP 703 (free-threaded CPython), biased reference counting, mimalloc arenas, and thread-safe collections.",
    "timeLimitMinutes": 15,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What major architecture change does PEP 703 (Python 3.13 free-threaded build) introduce to CPython?",
        "options": [
          "Replaces the C interpreter with an LLVM JIT exclusively",
          "Makes the Global Interpreter Lock (GIL) completely optional, allowing true multi-threaded parallel execution of Python bytecode across CPU cores",
          "Rewrites CPython in Rust",
          "Disables multi-threading in favor of async/await only"
        ],
        "correctAnswer": "Makes the Global Interpreter Lock (GIL) completely optional, allowing true multi-threaded parallel execution of Python bytecode across CPU cores",
        "explanation": "PEP 703 removes the GIL requirement in `--disable-gil` builds, enabling multi-core parallelism for CPU-bound multi-threaded workloads."
      },
      {
        "question": "How does free-threaded Python 3.13 handle reference counting without the GIL destroying multi-threaded performance?",
        "options": [
          "Disables reference counting entirely and uses a pure tracing GC",
          "Biased Reference Counting (BRC): the owning thread updates reference counts with cheap local operations; non-owning threads use atomic increments",
          "Uses hardware transactional memory exclusively",
          "Locks the entire RAM bus"
        ],
        "correctAnswer": "Biased Reference Counting (BRC): the owning thread updates reference counts with cheap local operations; non-owning threads use atomic increments",
        "explanation": "Biased Reference Counting avoids expensive atomic CAS instructions when an object is accessed only by the thread that created it."
      },
      {
        "question": "Which high-performance memory allocator does free-threaded CPython integrate to handle thread-safe allocations?",
        "options": [
          "tcmalloc",
          "mimalloc (Microsoft's compact, thread-safe memory allocator)",
          "jemalloc",
          "glibc ptmalloc"
        ],
        "correctAnswer": "mimalloc (Microsoft's compact, thread-safe memory allocator)",
        "explanation": "CPython uses mimalloc for thread-local memory allocation pools, preventing heap contention across concurrent threads."
      },
      {
        "question": "In free-threaded Python, what protection is applied to standard mutable data structures like dictionaries and lists?",
        "options": [
          "The GIL is re-enabled whenever a dictionary is created",
          "Fine-grained per-object locks or internal lock-free reader-writer concurrency primitives to preserve internal integrity during concurrent access",
          "Dictionaries are converted into immutable tuples",
          "Access is serialized using global mutexes"
        ],
        "correctAnswer": "Fine-grained per-object locks or internal lock-free reader-writer concurrency primitives to preserve internal integrity during concurrent access",
        "explanation": "CPython introduces internal fine-grained locks to container implementations to protect internal pointers from data corruption without a single GIL."
      },
      {
        "question": "How do existing C-extension packages indicate compatibility with free-threaded Python 3.13?",
        "options": [
          "By passing `--no-gil` to pip",
          "By declaring `Py_MOD_GIL_NOT_USED` in the module definition slots; otherwise CPython re-enables the GIL when the module is imported",
          "By recompiling with Clang 18",
          "C extensions cannot be loaded in free-threaded Python"
        ],
        "correctAnswer": "By declaring `Py_MOD_GIL_NOT_USED` in the module definition slots; otherwise CPython re-enables the GIL when the module is imported",
        "explanation": "If an imported C extension does not explicitly flag `Py_MOD_GIL_NOT_USED`, CPython re-activates the GIL to avoid unsafe memory crashes."
      }
    ]
  },
  {
    "title": "Python: Advanced Type Variance, ParamSpec & Protocol Duck-Typing",
    "description": "Covariance and contravariance, typing.Protocol (structural subtyping), ParamSpec, and TypeGuard.",
    "timeLimitMinutes": 15,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What is the difference between Covariance and Contravariance in generic type definitions (`TypeVar`)?",
        "options": [
          "Covariant is for functions; Contravariant is for classes",
          "Covariant (`covariant=True`) preserves subtyping direction (`List[Dog]` is a subtype of `List[Animal]`); Contravariant (`contravariant=True`) reverses it",
          "Covariant is mutable; Contravariant is immutable",
          "There is no difference in Python typing"
        ],
        "correctAnswer": "Covariant (`covariant=True`) preserves subtyping direction (`List[Dog]` is a subtype of `List[Animal]`); Contravariant (`contravariant=True`) reverses it",
        "explanation": "Covariance matches the subtype direction (common for read-only containers). Contravariance reverses it (common for function arguments/consumers)."
      },
      {
        "question": "What does `typing.Protocol` enable in Python static type checkers?",
        "codeSnippet": "from typing import Protocol\n\nclass Renderable(Protocol):\n    def render(self) -> str: ...",
        "language": "python",
        "options": [
          "Enforces runtime validation on all method calls",
          "Defines a network communication protocol",
          "Structural subtyping (static duck typing): any class implementing `render()` is treated as `Renderable` without explicit inheritance",
          "Serializes classes to gRPC protobufs"
        ],
        "correctAnswer": "Structural subtyping (static duck typing): any class implementing `render()` is treated as `Renderable` without explicit inheritance",
        "explanation": "Protocols enable static duck typing: types match based on matching method/attribute shapes rather than nominal inheritance."
      },
      {
        "question": "What problem does `typing.ParamSpec` solve when typing high-order decorator functions?",
        "codeSnippet": "from typing import Callable, ParamSpec, TypeVar\nP = ParamSpec('P')\nR = TypeVar('R')\ndef logged(f: Callable[P, R]) -> Callable[P, R]: ...",
        "language": "python",
        "options": [
          "Compiles parameters into C types",
          "Allows decorators to take keyword-only arguments",
          "Preserves the exact parameter types and keywords of the decorated function so IDE autocomplete and type checks are not erased into `Any`",
          "Enforces runtime type validation"
        ],
        "correctAnswer": "Preserves the exact parameter types and keywords of the decorated function so IDE autocomplete and type checks are not erased into `Any`",
        "explanation": "`ParamSpec` captures arbitrary callable parameter specifications, preserving signatures across wrapper decorators."
      },
      {
        "question": "What does `typing.TypeGuard[T]` accomplish when returned from a validation function?",
        "codeSnippet": "def is_str_list(val: list[object]) -> TypeGuard[list[str]]:\n    return all(isinstance(x, str) for x in val)",
        "language": "python",
        "options": [
          "Freezes the list from receiving non-string values",
          "Raises a TypeError if the check fails",
          "Narrows the type in downstream conditional blocks from `list[object]` to `list[str]` based on the function's boolean return",
          "Generates a dataclass validator"
        ],
        "correctAnswer": "Narrows the type in downstream conditional blocks from `list[object]` to `list[str]` based on the function's boolean return",
        "explanation": "`TypeGuard` instructs static type checkers to narrow the tested variable's type within an `if` branch when the function returns `True`."
      },
      {
        "question": "What is `typing.Self` (Python 3.11+) used for in class method annotations?",
        "options": [
          "Makes the method private",
          "Replaces `self` in parameter signatures",
          "Represents the current enclosing class type dynamically, ensuring method chaining returns the exact subclass type rather than the base class",
          "Prevents method overriding in subclasses"
        ],
        "correctAnswer": "Represents the current enclosing class type dynamically, ensuring method chaining returns the exact subclass type rather than the base class",
        "explanation": "`Self` dynamically resolves to the derived subclass type in fluent interfaces and builder patterns."
      }
    ]
  },
  {
    "title": "Python: Custom Memory Allocators & PyMalloc Arenas",
    "description": "PyMalloc small object allocator, Arenas (256KB), Pools (4KB), Blocks, and pymem profiling.",
    "timeLimitMinutes": 15,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What is the primary role of PyMalloc in CPython's memory architecture?",
        "options": [
          "Allocates GPU tensors for machine learning",
          "Manages virtual memory swap space on disk",
          "A specialized small-object allocator optimized for rapid allocation/deallocation of objects <= 512 bytes, mitigating OS heap fragmentation",
          "Compresses large strings in RAM"
        ],
        "correctAnswer": "A specialized small-object allocator optimized for rapid allocation/deallocation of objects <= 512 bytes, mitigating OS heap fragmentation",
        "explanation": "PyMalloc handles allocations of 512 bytes or less. It bypasses standard `malloc()` to avoid heap fragmentation and kernel overhead."
      },
      {
        "question": "What is the hierarchical structure of memory managed by PyMalloc?",
        "options": [
          "Segments -> Clusters -> Nodes",
          "Pages -> Cache lines -> Bytes",
          "Arenas (256 KB aligned memory chunks) -> divided into Pools (4 KB operating system pages) -> divided into uniform fixed-size Blocks",
          "Buckets -> Slots -> Pointers"
        ],
        "correctAnswer": "Arenas (256 KB aligned memory chunks) -> divided into Pools (4 KB operating system pages) -> divided into uniform fixed-size Blocks",
        "explanation": "PyMalloc requests 256KB Arenas from the OS. Arenas are subdivided into 4KB Pools, each dedicated to blocks of a single fixed size class."
      },
      {
        "question": "Why might a long-running Python process not release memory back to the operating system after freeing millions of objects?",
        "options": [
          "The garbage collector disables `free()` calls",
          "CPython never returns memory to the OS by design",
          "An Arena can only be returned to the OS if every single Pool and Block within that 256KB Arena is completely empty; single pinned objects prevent deallocation",
          "Because operating systems cache all freed memory permanently"
        ],
        "correctAnswer": "An Arena can only be returned to the OS if every single Pool and Block within that 256KB Arena is completely empty; single pinned objects prevent deallocation",
        "explanation": "If even a single 16-byte object remains allocated inside a 256KB arena, the OS cannot reclaim the physical memory pages for that arena."
      },
      {
        "question": "How can you debug and profile CPython memory block allocations at runtime?",
        "options": [
          "Read `/proc/self/python_mem`",
          "Inspect `sys.memory_dump()`",
          "Use the `tracemalloc` standard library module, which records tracebacks where memory blocks were allocated",
          "Use `gc.get_memory_usage()`"
        ],
        "correctAnswer": "Use the `tracemalloc` standard library module, which records tracebacks where memory blocks were allocated",
        "explanation": "`tracemalloc` hooks into Python's memory allocators to trace memory allocations back to specific source lines."
      },
      {
        "question": "What environment variable allows switching Python from PyMalloc to the standard system `malloc` for Valgrind debugging?",
        "options": [
          "PYTHON_HEAP=system",
          "PY_NO_ARENA=1",
          "PYTHONMALLOC=malloc",
          "USE_GLIBC_MALLOC=1"
        ],
        "correctAnswer": "PYTHONMALLOC=malloc",
        "explanation": "Setting `PYTHONMALLOC=malloc` disables PyMalloc, routing all allocations through standard `malloc` so tools like Valgrind or ASan work cleanly."
      }
    ]
  },
  {
    "title": "Python: AST Manipulation & Code Generation",
    "description": "ast module, NodeVisitor and NodeTransformer, compile() function, and dynamic code generation.",
    "timeLimitMinutes": 15,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What is the difference between `ast.NodeVisitor` and `ast.NodeTransformer`?",
        "options": [
          "`NodeTransformer` runs on C++ ASTs",
          "`NodeVisitor` parses strings; `NodeTransformer` compiles bytecode",
          "`NodeVisitor` traverses AST nodes read-only; `NodeTransformer` allows modifying, replacing, or deleting nodes to rewrite code trees dynamically",
          "There is no difference; `NodeTransformer` is an alias"
        ],
        "correctAnswer": "`NodeVisitor` traverses AST nodes read-only; `NodeTransformer` allows modifying, replacing, or deleting nodes to rewrite code trees dynamically",
        "explanation": "`NodeTransformer` overrides node visitor methods to return modified or replacement nodes, enabling dynamic source-to-source transpilation."
      },
      {
        "question": "How do you turn an AST tree back into executable Python bytecode?",
        "codeSnippet": "import ast\ntree = ast.parse('x = 10 + 20')\n# How to compile tree to bytecode?\ncode_obj = compile(tree, filename='<ast>', mode='exec')",
        "language": "python",
        "options": [
          "`ast.compile_tree(tree)`",
          "`tree.to_bytecode()`",
          "`compile(tree, filename='<ast>', mode='exec')` compiles the AST directly into a code object ready for `exec()`",
          "`dis.assemble(tree)`"
        ],
        "correctAnswer": "`compile(tree, filename='<ast>', mode='exec')` compiles the AST directly into a code object ready for `exec()`",
        "explanation": "Python's built-in `compile()` function accepts AST objects directly and produces executable code objects."
      },
      {
        "question": "What function introduced in Python 3.9 turns an AST object back into formatted Python source code string?",
        "options": [
          "ast.stringify(tree)",
          "ast.to_source(tree)",
          "ast.unparse(tree)",
          "ast.dump_code(tree)"
        ],
        "correctAnswer": "ast.unparse(tree)",
        "explanation": "`ast.unparse()` converts an AST back into valid Python source code, simplifying code generation and linters."
      },
      {
        "question": "Why must `ast.fix_missing_locations(tree)` be called after mutating an AST before compiling it?",
        "options": [
          "To format indentation",
          "To remove unused variables",
          "To verify syntax validity",
          "To propagate `lineno` and `col_offset` attributes to newly synthesized nodes, preventing compilation errors and broken tracebacks"
        ],
        "correctAnswer": "To propagate `lineno` and `col_offset` attributes to newly synthesized nodes, preventing compilation errors and broken tracebacks",
        "explanation": "CPython bytecode compilation requires line numbers and column offsets on all nodes; `fix_missing_locations` populates these from parent nodes."
      },
      {
        "question": "What security risk exists when passing untrusted user code to `ast.literal_eval()`?",
        "options": [
          "It exposes environment variables",
          "It allows arbitrary shell injection",
          "It can cause buffer overflows in the kernel",
          "`ast.literal_eval()` is safe: it only evaluates literal structures (strings, numbers, tuples, lists, dicts, booleans, None) and rejects arbitrary code execution"
        ],
        "correctAnswer": "`ast.literal_eval()` is safe: it only evaluates literal structures (strings, numbers, tuples, lists, dicts, booleans, None) and rejects arbitrary code execution",
        "explanation": "`literal_eval` parses only primitive literals and container trees, safely preventing code execution like `__import__` or method invocation."
      }
    ]
  },
  {
    "title": "Python: Profiling with cProfile, Py-Spy & Flame Graphs",
    "description": "cProfile statistical vs deterministic profiling, py-spy non-invasive sampling, and flame graphs.",
    "timeLimitMinutes": 15,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What distinguishes `cProfile` (deterministic profiling) from `py-spy` (sampling profiling)?",
        "options": [
          "`cProfile` can only profile multi-threaded applications",
          "`cProfile` requires admin privileges; `py-spy` does not",
          "`py-spy` only profiles C extensions",
          "`cProfile` hooks into every function call/return (higher overhead); `py-spy` samples the process memory from outside without modifying or slowing down production code"
        ],
        "correctAnswer": "`cProfile` hooks into every function call/return (higher overhead); `py-spy` samples the process memory from outside without modifying or slowing down production code",
        "explanation": "`cProfile` is deterministic and measures every call, adding overhead. `py-spy` reads process memory via OS APIs (`process_vm_readv`) with zero runtime code changes."
      },
      {
        "question": "In `pstats` output from `cProfile`, what does `tottime` represent versus `cumtime`?",
        "options": [
          "`tottime` is the total time spent solely in the given function excluding sub-calls; `cumtime` is the cumulative time including all sub-function calls",
          "`tottime` includes sub-calls; `cumtime` is CPU time only",
          "`tottime` is thread time; `cumtime` is process time",
          "`tottime` is real time; `cumtime` is virtual clock time"
        ],
        "correctAnswer": "`tottime` is the total time spent solely in the given function excluding sub-calls; `cumtime` is cumulative time including all sub-function calls",
        "explanation": "`tottime` isolates function-specific overhead; `cumtime` measures the full execution time from function entry to exit including all children."
      },
      {
        "question": "How do you read a flame graph visualization generated from a Python profiler?",
        "options": [
          "Tall bars indicate low CPU usage",
          "The x-axis represents chronological time from start to end",
          "The colors indicate memory consumption",
          "The x-axis represents the percentage of total CPU time spent (wider bars mean more CPU time); the y-axis represents the call stack depth from root to leaf"
        ],
        "correctAnswer": "The x-axis represents the percentage of total CPU time spent (wider bars mean more CPU time); the y-axis represents the call stack depth from root to leaf",
        "explanation": "Flame graph horizontal width corresponds to the fraction of CPU samples. Vertical height shows the call stack hierarchy."
      },
      {
        "question": "What is the overhead of Python's built-in `profile` module compared to `cProfile`?",
        "options": [
          "There is no difference; they are aliases",
          "`profile` is faster than `cProfile`",
          "`profile` compiles code to machine code",
          "`profile` is written in pure Python and adds immense overhead (often 100x slower); `cProfile` is a C extension with significantly lower overhead"
        ],
        "correctAnswer": "`profile` is written in pure Python and adds immense overhead (often 100x slower); `cProfile` is a C extension with significantly lower overhead",
        "explanation": "`cProfile` is implemented in C for low overhead. Pure Python `profile` is primarily kept for historical reference."
      },
      {
        "question": "Which command runs `py-spy` to generate a live, interactive top-like view of a running Python PID in terminal?",
        "options": [
          "py-spy inspect <PID>",
          "py-spy trace <PID>",
          "py-spy monitor <PID>",
          "py-spy top --pid <PID>"
        ],
        "correctAnswer": "py-spy top --pid <PID>",
        "explanation": "`py-spy top --pid <PID>` launches an interactive curses terminal UI displaying real-time active functions and stack traces."
      }
    ]
  },
  {
    "title": "Python: Zero-Copy Buffer Protocol & Shared Memory IPC",
    "description": "memoryview, PEP 3118 (buffer protocol), multiprocessing.shared_memory, and zero-copy byte processing.",
    "timeLimitMinutes": 15,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What does Python's `memoryview` object achieve when slicing large byte sequences?",
        "codeSnippet": "data = bytearray(100 * 1024 * 1024)  # 100MB\nview = memoryview(data)\nchunk = view[10:1000]",
        "language": "python",
        "options": [
          "Freezes the bytearray permanently",
          "Copies data into GPU memory",
          "Compresses the buffer",
          "Creates a zero-copy pointer slice directly over the existing buffer memory without allocating a new 100MB or 990-byte copy"
        ],
        "correctAnswer": "Creates a zero-copy pointer slice directly over the existing buffer memory without allocating a new 100MB or 990-byte copy",
        "explanation": "`memoryview` implements the Python Buffer Protocol (PEP 3118), exposing low-level contiguous memory addresses without memory duplication."
      },
      {
        "question": "How does `multiprocessing.shared_memory.SharedMemory` (Python 3.8+) allow processes to share gigabytes of data with zero IPC serialization overhead?",
        "options": [
          "Uses Redis in the background",
          "Sends data over local TCP loopback sockets",
          "Writes data to an in-memory SQLite database",
          "Allocates raw POSIX/Windows shared memory segments mapped directly into each process's virtual address space, allowing instant read/write access without pickling"
        ],
        "correctAnswer": "Allocates raw POSIX/Windows shared memory segments mapped directly into each process's virtual address space, allowing instant read/write access without pickling",
        "explanation": "`SharedMemory` maps a shared memory region across processes, eliminating the CPU cost of pickling large datasets."
      },
      {
        "question": "What happens if you attempt to resize a `bytearray` while an active `memoryview` is referencing it?",
        "codeSnippet": "b = bytearray(b'hello')\nv = memoryview(b)\nb.extend(b' world')  # What happens?",
        "language": "python",
        "options": [
          "CPython segfaults immediately",
          "The bytearray resizes and reallocates memory seamlessly",
          "The memoryview is destroyed automatically",
          "Raises `BufferError: Existing exports of data: object cannot be re-sized` to prevent invalidating the memoryview's raw memory pointer"
        ],
        "correctAnswer": "Raises `BufferError: Existing exports of data: object cannot be re-sized` to prevent invalidating the memoryview's raw memory pointer",
        "explanation": "To preserve memory safety, any object with active buffer exports increments an export counter and blocks resizing."
      },
      {
        "question": "What does the `cast()` method on a `memoryview` do?",
        "codeSnippet": "view = memoryview(b'\\x01\\x00\\x00\\x00')\nints = view.cast('i')",
        "language": "python",
        "options": [
          "Allocates a new integer array",
          "Converts the bytes into an ASCII string",
          "Casts the memory into a NumPy array",
          "Reinterprets the underlying raw memory bytes as a structured C data type (e.g. 32-bit signed integer) with zero copying"
        ],
        "correctAnswer": "Reinterprets the underlying raw memory bytes as a structured C data type (e.g. 32-bit signed integer) with zero copying",
        "explanation": "`memoryview.cast(format)` reinterprets the raw memory according to `struct` module format codes without duplicating bytes."
      },
      {
        "question": "Why must `shared_memory.close()` and `shared_memory.unlink()` both be called when cleaning up shared memory?",
        "options": [
          "`unlink()` clears the process page tables",
          "`close()` is for Windows; `unlink()` is for Linux",
          "Calling both is redundant; `close()` does everything",
          "`close()` unmaps the shared segment from the current process; `unlink()` tells the OS kernel to completely destroy and deallocate the shared memory segment"
        ],
        "correctAnswer": "`close()` unmaps the shared segment from the current process; `unlink()` tells the OS kernel to completely destroy and deallocate the shared memory segment",
        "explanation": "`close()` detaches the process file descriptor; `unlink()` destroys the shared segment in the OS kernel so it doesn't leak after process termination."
      }
    ]
  }
];
