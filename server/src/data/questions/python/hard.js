export const pythonHardChallenges = [
  {
    "title": "Python: Asyncio Event Loop & Coroutine Mechanics",
    "description": "async/await, Future and Task objects, asyncio.gather vs TaskGroup, and blocking call pitfalls.",
    "timeLimitMinutes": 12,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "What actually happens under the hood when `await coroutine` is executed inside an async function?",
        "options": [
          "It yields control back to the active event loop, pausing the current frame until the awaited awaitable completes and schedules resumption",
          "It creates a new native OS thread to run the coroutine in parallel",
          "It blocks the entire process until the coroutine finishes",
          "It converts the coroutine into a synchronous callback"
        ],
        "correctAnswer": "It yields control back to the active event loop, pausing the current frame until the awaited awaitable completes and schedules resumption",
        "explanation": "`await` suspends the coroutine's execution frame and yields control back to the asyncio event loop so other scheduled tasks can run."
      },
      {
        "question": "What critical flaw occurs if you invoke `time.sleep(5)` inside an `asyncio` coroutine?",
        "codeSnippet": "import asyncio, time\n\nasync def handle_request():\n    time.sleep(5)  # What is wrong with this?\n    return 'done'",
        "language": "python",
        "options": [
          "It synchronously blocks the entire OS thread running the single event loop, freezing all other concurrent asyncio tasks for 5 seconds",
          "Python raises a `BlockingIOError` at runtime",
          "The coroutine is cancelled automatically",
          "The event loop migrates other tasks to worker threads"
        ],
        "correctAnswer": "It synchronously blocks the entire OS thread running the single event loop, freezing all other concurrent asyncio tasks for 5 seconds",
        "explanation": "Standard synchronous blocking calls block the single thread running the asyncio loop. Non-blocking `asyncio.sleep(5)` must be used instead."
      },
      {
        "question": "How should you safely execute a CPU-bound or blocking synchronous library call from an `asyncio` application?",
        "codeSnippet": "loop = asyncio.get_running_loop()\n# How to run blocking_io() without stalling the event loop?",
        "language": "python",
        "options": [
          "`await asyncio.to_thread(blocking_io)` (or `loop.run_in_executor(None, blocking_io)`) to delegate to a thread pool",
          "`await blocking_io()` directly",
          "Wrap `blocking_io` in `@asyncio.coroutine`",
          "`asyncio.create_task(blocking_io())`"
        ],
        "correctAnswer": "`await asyncio.to_thread(blocking_io)` (or `loop.run_in_executor(None, blocking_io)`) to delegate to a thread pool",
        "explanation": "`asyncio.to_thread()` offloads blocking work to a worker thread from `ThreadPoolExecutor`, freeing the event loop to continue serving tasks."
      },
      {
        "question": "What is the key difference between `asyncio.gather()` and Python 3.11's `asyncio.TaskGroup()`?",
        "options": [
          "`TaskGroup` provides structured concurrency: if any child task raises an exception, all other tasks in the group are immediately cancelled and errors are collected in an `ExceptionGroup`",
          "`TaskGroup` can only run up to 4 tasks",
          "`asyncio.gather` is multi-process while `TaskGroup` is multi-threaded",
          "`asyncio.gather` was removed in Python 3.12"
        ],
        "correctAnswer": "`TaskGroup` provides structured concurrency: if any child task raises an exception, all other tasks in the group are immediately cancelled and errors are collected in an `ExceptionGroup`",
        "explanation": "`TaskGroup` enforces structured concurrency: tasks cannot leak out of the `async with` block, and failure in one cleanly cancels the others."
      },
      {
        "question": "What does calling `asyncio.create_task(coro())` do?",
        "options": [
          "Schedules the coroutine to run on the event loop concurrently as an `asyncio.Task` and returns immediately without blocking",
          "Blocks until the coroutine finishes execution",
          "Compiles the coroutine to C",
          "Spawns a new OS subprocess"
        ],
        "correctAnswer": "Schedules the coroutine to run on the event loop concurrently as an `asyncio.Task` and returns immediately without blocking",
        "explanation": "`create_task` wraps the coroutine into a `Task` and registers it with the loop's queue to run during the next loop iteration."
      }
    ]
  },
  {
    "title": "Python: Async Context Managers & Async Iterators",
    "description": "__aenter__, __aexit__, __aiter__, __anext__, and streaming async generators.",
    "timeLimitMinutes": 12,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "Which special dunder methods must a class implement to act as an asynchronous context manager (`async with`)?",
        "options": [
          "`__aenter__(self)` and `__aexit__(self, exc_type, exc_val, exc_tb)` returning awaitables",
          "`__enter__` and `__exit__` with `@asyncio.coroutine`",
          "`__async_enter__` and `__async_exit__`",
          "`__open__` and `__close__`"
        ],
        "correctAnswer": "`__aenter__(self)` and `__aexit__(self, exc_type, exc_val, exc_tb)` returning awaitables",
        "explanation": "Python evaluates `await obj.__aenter__()` on entry and `await obj.__aexit__(...)` on exit."
      },
      {
        "question": "What exception must an asynchronous iterator raise from `__anext__` to signal the end of iteration?",
        "options": [
          "StopAsyncIteration",
          "StopIteration",
          "GeneratorExit",
          "AsyncTimeoutError"
        ],
        "correctAnswer": "StopAsyncIteration",
        "explanation": "Asynchronous iterators raise `StopAsyncIteration` from `__anext__()` to terminate an `async for` loop."
      },
      {
        "question": "What does an `async def` function containing a `yield` statement create in Python?",
        "codeSnippet": "async def ticker(delay, count):\n    for i in range(count):\n        await asyncio.sleep(delay)\n        yield i",
        "language": "python",
        "options": [
          "An asynchronous generator function that can be consumed with `async for item in ticker():`",
          "A synchronous list of promises",
          "A syntax error because `yield` and `await` cannot coexist in the same function",
          "A multi-threaded queue"
        ],
        "correctAnswer": "An asynchronous generator function that can be consumed with `async for item in ticker():`",
        "explanation": "Combining `async def` with `yield` produces an async generator, allowing asynchronous streaming of items over time."
      },
      {
        "question": "Why can `StopIteration` NOT be raised directly inside an asynchronous generator?",
        "options": [
          "Raising `StopIteration` inside an async generator raises a `RuntimeError` under PEP 479 to prevent iterator corruption",
          "Because async generators have no end",
          "Because it causes CPython memory fragmentation",
          "It is automatically caught and discarded by Python"
        ],
        "correctAnswer": "Raising `StopIteration` inside an async generator raises a `RuntimeError` under PEP 479 to prevent iterator corruption",
        "explanation": "Under PEP 479, raising `StopIteration` from any generator is converted into a `RuntimeError`. Async generators must use simple `return` or let execution finish."
      },
      {
        "question": "What does `contextlib.asynccontextmanager` provide?",
        "options": [
          "A decorator that turns an async generator with a single `yield` into an asynchronous context manager (`async with`)",
          "A connection pool for PostgreSQL",
          "An async memory profiler",
          "A thread-safe lock for async queues"
        ],
        "correctAnswer": "A decorator that turns an async generator with a single `yield` into an asynchronous context manager (`async with`)",
        "explanation": "`@asynccontextmanager` allows defining `async with` resource handlers with concise generator syntax."
      }
    ]
  },
  {
    "title": "Python: CPython Global Interpreter Lock (GIL) & Native Impact",
    "description": "GIL implementation details, atomic bytecode ops, C-extension GIL release, and multithreading overhead.",
    "timeLimitMinutes": 12,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "Why does CPython rely on the Global Interpreter Lock (GIL)?",
        "options": [
          "To protect CPython's reference-counting memory management from concurrent race conditions without needing fine-grained locks on every PyObject",
          "Because x86 processors do not support multi-threaded memory access",
          "To guarantee that Python scripts run at the exact same clock speed on all computers",
          "To prevent unauthorized reverse engineering of Python bytecode"
        ],
        "correctAnswer": "To protect CPython's reference-counting memory management from concurrent race conditions without needing fine-grained locks on every PyObject",
        "explanation": "CPython's internal memory management uses reference counting. Without the GIL, every reference increment/decrement would require individual locks, crippling single-threaded performance."
      },
      {
        "question": "How does CPython periodically switch between running threads in a multi-threaded Python program?",
        "options": [
          "By checking an evaluation counter / interval (`sys.getswitchinterval()`, default 5ms) and releasing the GIL to give waiting threads a turn",
          "Whenever a function returns",
          "Only when a thread explicitly calls `time.sleep()`",
          "Via hardware interrupts from the motherboard BIOS"
        ],
        "correctAnswer": "By checking an evaluation counter / interval (`sys.getswitchinterval()`, default 5ms) and releasing the GIL to give waiting threads a turn",
        "explanation": "CPython uses a switch interval timer (default 5 milliseconds). When it expires, the running thread drops the GIL so waiting threads can acquire it."
      },
      {
        "question": "Why are high-performance numeric libraries like NumPy, PyTorch, and OpenCV able to achieve full multi-core CPU parallel speedups in Python?",
        "options": [
          "Their underlying C/C++/Fortran routines explicitly call `Py_BEGIN_ALLOW_THREADS` to release the GIL during heavy numerical computations",
          "They replace the CPython interpreter with PyPy at runtime",
          "They run in the GPU memory space only",
          "They bypass Python's memory manager completely by compiling to WebAssembly"
        ],
        "correctAnswer": "Their underlying C/C++/Fortran routines explicitly call `Py_BEGIN_ALLOW_THREADS` to release the GIL during heavy numerical computations",
        "explanation": "C extensions can release the GIL with `Py_BEGIN_ALLOW_THREADS` while operating on pure C buffers, allowing threads to run in parallel across CPU cores."
      },
      {
        "question": "What is the 'convoy effect' or GIL contention in multi-threaded CPU-heavy Python programs?",
        "options": [
          "Threads crash due to stack overflow",
          "Threads spend excessive CPU time repeatedly acquiring and releasing OS mutexes, often making multi-threaded execution slower than single-threaded execution",
          "Memory leaks caused by deadlocked dictionaries",
          "CPython throttling the CPU fan speed"
        ],
        "correctAnswer": "Threads spend excessive CPU time repeatedly acquiring and releasing OS mutexes, often making multi-threaded execution slower than single-threaded execution",
        "explanation": "When multiple CPU-bound threads fight for the GIL, the OS context-switching overhead and lock contention frequently cause performance to degrade below single-thread speeds."
      },
      {
        "question": "Are operations in Python like `list.append(x)` atomic under CPython's GIL?",
        "options": [
          "No, all Python operations are prone to race conditions unless protected by `threading.Lock`",
          "Yes, `list.append` translates to a single CPython bytecode instruction (`LIST_APPEND`), meaning it cannot be interrupted mid-operation by a thread switch",
          "Only if the list contains fewer than 100 elements",
          "Only on 64-bit operating systems"
        ],
        "correctAnswer": "Yes, `list.append` translates to a single CPython bytecode instruction (`LIST_APPEND`), meaning it cannot be interrupted mid-operation by a thread switch",
        "explanation": "In CPython, single bytecode operations without intervening evaluation loops execute atomically because thread switches only happen between bytecode steps."
      }
    ]
  },
  {
    "title": "Python: Metaclasses & Class Creation Pipeline",
    "description": "type as a metaclass, __init_subclass__, __prepare__, and class factories.",
    "timeLimitMinutes": 12,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "What is the relationship between `type` and classes in Python?",
        "options": [
          "`type` is an abstract base class that cannot be instantiated",
          "`type` is the default metaclass of all standard classes in Python; all classes are themselves instances of `type`",
          "`type` is a C wrapper that only works on primitive types",
          "`type` is only used for checking object classes"
        ],
        "correctAnswer": "`type` is the default metaclass of all standard classes in Python; all classes are themselves instances of `type`",
        "explanation": "In Python, classes are first-class objects created by metaclasses. By default, `class Foo: pass` is created by `type(name, bases, dict)`."
      },
      {
        "question": "What does the `__init_subclass__` class method (Python 3.6+) allow you to do without writing a full metaclass?",
        "codeSnippet": "class PluginBase:\n    registry = []\n    def __init_subclass__(cls, **kwargs):\n        super().__init_subclass__(**kwargs)\n        cls.registry.append(cls)",
        "language": "python",
        "options": [
          "Replaces `__init__` on all instances of the subclass",
          "Customizes and intercepts subclass creation cleanly with standard inheritance, eliminating the need for custom metaclasses for simple registration/validation",
          "Prevents the subclass from being instantiated",
          "Creates a subprocess for each subclass"
        ],
        "correctAnswer": "Customizes and intercepts subclass creation cleanly with standard inheritance, eliminating the need for custom metaclasses for simple registration/validation",
        "explanation": "PEP 487 introduced `__init_subclass__` to provide an ergonomic hook whenever a class is derived, solving 90% of metaclass use cases."
      },
      {
        "question": "What is the purpose of the metaclass `__prepare__(name, bases, **kwargs)` method?",
        "options": [
          "Allocates C heap memory before the class definition is parsed",
          "Returns the namespace mapping (such as an `OrderedDict` or custom tracking dict) to be used when executing the class body",
          "Clears global variables before class creation",
          "Initializes the docstrings for the class"
        ],
        "correctAnswer": "Returns the namespace mapping (such as an `OrderedDict` or custom tracking dict) to be used when executing the class body",
        "explanation": "`__prepare__` is called before the class body is evaluated to return the mapping object that records class attributes as they are defined."
      },
      {
        "question": "What happens when two base classes have incompatible metaclasses during multiple inheritance?",
        "options": [
          "Python silently selects the first base class's metaclass",
          "Python raises a `TypeError: metaclass conflict: the metaclass of a derived class must be a (non-strict) subclass of the metaclasses of all its bases`",
          "Python falls back to standard `type`",
          "Python terminates the interpreter"
        ],
        "correctAnswer": "Python raises a `TypeError: metaclass conflict: the metaclass of a derived class must be a (non-strict) subclass of the metaclasses of all its bases`",
        "explanation": "A derived class's metaclass must inherit from all of its bases' metaclasses; otherwise, Python raises a metaclass conflict error."
      },
      {
        "question": "How do you dynamically create a new class named `'DynamicModel'` with base `object` and attribute `x = 10` using `type`?",
        "options": [
          "`DynamicModel = type.create('DynamicModel', x=10)`",
          "`DynamicModel = type('DynamicModel', (object,), {'x': 10})`",
          "`DynamicModel = class('DynamicModel', object, {'x': 10})`",
          "`DynamicModel = new.class('DynamicModel', {'x': 10})`"
        ],
        "correctAnswer": "`DynamicModel = type('DynamicModel', (object,), {'x': 10})`",
        "explanation": "Calling `type(name, bases_tuple, dict_of_attrs)` dynamically constructs and returns a new class."
      }
    ]
  },
  {
    "title": "Python: Descriptors (`__get__`, `__set__`, `__delete__`) & Properties",
    "description": "Data descriptors vs non-data descriptors, attribute lookup order, and descriptor protocols.",
    "timeLimitMinutes": 12,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "What is the critical distinction between a Data Descriptor and a Non-Data Descriptor?",
        "options": [
          "A Data Descriptor stores values in SQLite; a Non-Data Descriptor stores them in RAM",
          "A Data Descriptor implements `__set__` (or `__delete__`); a Non-Data Descriptor only implements `__get__`",
          "Non-Data Descriptors cannot be assigned to class attributes",
          "Data Descriptors can only hold numeric data"
        ],
        "correctAnswer": "A Data Descriptor implements `__set__` (or `__delete__`); a Non-Data Descriptor only implements `__get__`",
        "explanation": "Defining `__set__` or `__delete__` makes an object a data descriptor, which alters the attribute resolution priority over instance dictionaries."
      },
      {
        "question": "What is the exact lookup precedence order when accessing `obj.attr` on an instance?",
        "options": [
          "Instance `__dict__` -> Data descriptor in class -> Non-data descriptor -> `__getattr__`",
          "Data descriptor in class -> Instance `__dict__` -> Non-data descriptor in class -> Class `__dict__` -> `__getattr__`",
          "Class `__dict__` -> Instance `__dict__` -> Data descriptor",
          "`__getattr__` -> Instance `__dict__` -> Class `__dict__`"
        ],
        "correctAnswer": "Data descriptor in class -> Instance `__dict__` -> Non-data descriptor in class -> Class `__dict__` -> `__getattr__`",
        "explanation": "Data descriptors take highest precedence (shadowing the instance `__dict__`), whereas non-data descriptors can be shadowed by instance attributes."
      },
      {
        "question": "How do Python functions implement methods on class instances under the hood?",
        "options": [
          "Python duplicates the function bytecode for every new instance",
          "Function objects implement the descriptor protocol via `__get__`, returning a bound method object `types.MethodType(func, instance)` when accessed on an instance",
          "Instances maintain function pointers in an internal C vtable",
          "The interpreter injects `self` via regex rewriting before execution"
        ],
        "correctAnswer": "Function objects implement the descriptor protocol via `__get__`, returning a bound method object `types.MethodType(func, instance)` when accessed on an instance",
        "explanation": "Functions are non-data descriptors. When accessed via `instance.func`, `func.__get__(instance, owner)` binds `self` to `instance`."
      },
      {
        "question": "What does `__set_name__(self, owner, name)` (Python 3.6+) do for descriptors?",
        "codeSnippet": "class Typed:\n    def __set_name__(self, owner, name):\n        self.public_name = name\n        self.private_name = '_' + name",
        "language": "python",
        "options": [
          "Changes the descriptor's class name dynamically",
          "Automatically informs the descriptor of the class attribute name it was assigned to during class creation",
          "Renames the owner class in `sys.modules`",
          "Registers the attribute with type hints"
        ],
        "correctAnswer": "Automatically informs the descriptor of the class attribute name it was assigned to during class creation",
        "explanation": "`__set_name__` is invoked automatically when the class is constructed, passing the attribute name to eliminate boilerplate name duplication."
      },
      {
        "question": "What is the difference between `__getattr__` and `__getattribute__`?",
        "options": [
          "`__getattr__` is called for data descriptors only",
          "`__getattribute__` is called unconditionally for every single attribute access; `__getattr__` is called only as a fallback when an attribute is not found",
          "`__getattribute__` only works on private attributes",
          "There is no difference; they are aliases"
        ],
        "correctAnswer": "`__getattribute__` is called unconditionally for every single attribute access; `__getattr__` is called only as a fallback when an attribute is not found",
        "explanation": "`__getattribute__` intercepts all attribute reads. `__getattr__` is only invoked when standard lookup raises `AttributeError`."
      }
    ]
  },
  {
    "title": "Python: Method Resolution Order (MRO) & `super()` Internals",
    "description": "C3 linearization algorithm, multiple inheritance diamond problem, and cooperative multiple inheritance.",
    "timeLimitMinutes": 12,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "Which algorithm does Python use to determine the Method Resolution Order (MRO) in multiple inheritance?",
        "options": [
          "Depth-First Search (DFS) with loop detection",
          "C3 Linearization Algorithm",
          "Breadth-First Search (BFS)",
          "Dijkstra's Shortest Path Algorithm"
        ],
        "correctAnswer": "C3 Linearization Algorithm",
        "explanation": "Python adopted the C3 linearization algorithm in Python 2.3 to guarantee monotonicity and preserve local precedence order in complex diamond inheritance graphs."
      },
      {
        "question": "How do you inspect the computed MRO of a class `Cls`?",
        "options": [
          "`Cls.get_parents()`",
          "`Cls.__hierarchy__`",
          "`Cls.__mro__` (or `Cls.mro()`)",
          "`sys.mro(Cls)`"
        ],
        "correctAnswer": "`Cls.__mro__` (or `Cls.mro()`)",
        "explanation": "The MRO is stored as a tuple on the class's `__mro__` attribute or can be retrieved via the `Cls.mro()` class method."
      },
      {
        "question": "In cooperative multiple inheritance, why must every subclass implementation of a method invoke `super().method(*args, **kwargs)`?",
        "options": [
          "To reset the class call counter",
          "Because Python syntax disallows overriding methods without `super()`",
          "To ensure the method call propagates to the next class in the runtime MRO chain, which may be a sibling class rather than a direct parent",
          "To enable garbage collection for parent classes"
        ],
        "correctAnswer": "To ensure the method call propagates to the next class in the runtime MRO chain, which may be a sibling class rather than a direct parent",
        "explanation": "`super()` searches the dynamic MRO of the calling instance, allowing cooperative sibling delegation in diamond hierarchies."
      },
      {
        "question": "Why will Python raise `TypeError: Cannot create a consistent method resolution order (MRO)` for certain class definitions?",
        "options": [
          "When base classes contain abstract methods",
          "When a class inherits from more than 3 classes",
          "When the inheritance graph violates local precedence order or monotonicity requirements of the C3 algorithm",
          "When inheritance depth exceeds 10 levels"
        ],
        "correctAnswer": "When the inheritance graph violates local precedence order or monotonicity requirements of the C3 algorithm",
        "explanation": "If an inheritance configuration cannot satisfy both local precedence order and monotonicity, C3 rejects the hierarchy with a `TypeError`."
      },
      {
        "question": "What is the final base class at the end of every Python 3 class's MRO?",
        "options": [
          "builtins.BaseClass",
          "builtins.type",
          "builtins.object",
          "None"
        ],
        "correctAnswer": "builtins.object",
        "explanation": "All classes in Python 3 inherit from `object`, making `object` the root termination point of every MRO sequence."
      }
    ]
  },
  {
    "title": "Python: Memory Management, Reference Counting & Cyclic GC",
    "description": "PyObject reference counts, cyclic garbage collector, generations (0, 1, 2), and sys.getrefcount.",
    "timeLimitMinutes": 12,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "What is Python's primary memory deallocation mechanism for releasing objects from RAM?",
        "options": [
          "Manual memory freeing with `free()`",
          "Stop-the-world generational mark-and-sweep only",
          "Immediate reference counting: an object is deallocated the instant its `ob_refcnt` drops to zero",
          "Periodic operating system page reclaims"
        ],
        "correctAnswer": "Immediate reference counting: an object is deallocated the instant its `ob_refcnt` drops to zero",
        "explanation": "CPython's core memory reclamation is deterministic reference counting: when `ob_refcnt == 0`, its deallocator is invoked immediately."
      },
      {
        "question": "What problem requires CPython to maintain a secondary cyclic garbage collector (`gc` module)?",
        "codeSnippet": "a = []\nb = []\na.append(b)\nb.append(a)\ndel a, b",
        "language": "python",
        "options": [
          "Slow dictionary lookups",
          "Memory fragmentation in virtual memory",
          "Circular reference cycles: objects referencing each other never reach a reference count of zero even when completely unreachable from roots",
          "Memory leaks in C extensions"
        ],
        "correctAnswer": "Circular reference cycles: objects referencing each other never reach a reference count of zero even when completely unreachable from roots",
        "explanation": "Reference counting cannot collect circular references because the cycle keeps refcounts >= 1. The cyclic GC detects and collects these unreachable isolated cycles."
      },
      {
        "question": "How does CPython's generational cyclic garbage collector organize tracked objects?",
        "options": [
          "Into separate stacks per thread",
          "Into 10 hash buckets ordered by allocation size",
          "Into three generations (0, 1, 2) based on survival across collections; younger generations are scanned much more frequently than older ones",
          "Alphabetically by variable name"
        ],
        "correctAnswer": "Into three generations (0, 1, 2) based on survival across collections; younger generations are scanned much more frequently than older ones",
        "explanation": "Based on the weak generational hypothesis (most objects die young), CPython segregates objects into 3 generations, scanning Gen 0 frequently and Gen 2 rarely."
      },
      {
        "question": "Why does `sys.getrefcount(obj)` return a count that is 1 higher than expected?",
        "codeSnippet": "x = object()\nprint(sys.getrefcount(x))  # Prints 2",
        "language": "python",
        "options": [
          "`x` is referenced by the garbage collector",
          "Python always pads reference counts by 1 for safety",
          "Passing `x` into `sys.getrefcount()` creates a temporary reference to `x` inside the function call frame",
          "Because `object()` is a singleton"
        ],
        "correctAnswer": "Passing `x` into `sys.getrefcount()` creates a temporary reference to `x` inside the function call frame",
        "explanation": "The function parameter itself holds a reference to the argument during evaluation, temporarily bumping the count by 1."
      },
      {
        "question": "Which types of objects are exempt from cyclic GC tracking in CPython?",
        "options": [
          "User-defined class instances",
          "Lists and dictionaries",
          "Stateless/atomic immutable types like integers, floats, and strings that cannot contain references to other objects",
          "All objects created in the main thread"
        ],
        "correctAnswer": "Stateless/atomic immutable types like integers, floats, and strings that cannot contain references to other objects",
        "explanation": "Atomic types cannot participate in reference cycles, so CPython avoids overhead by untracking them from the cyclic collector."
      }
    ]
  },
  {
    "title": "Python: Weakref & Memory Leak Mitigation",
    "description": "weakref.ref, weakref.WeakValueDictionary, circular graph caches, and finalizing callbacks.",
    "timeLimitMinutes": 12,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "What is a `weakref` in Python and how does it prevent memory leaks?",
        "codeSnippet": "import weakref\n\nclass Node:\n    pass\n\nn = Node()\nr = weakref.ref(n)",
        "language": "python",
        "options": [
          "It moves the object to an in-memory Redis cache",
          "It compresses the object to half its byte size",
          "It references an object without incrementing its reference count, allowing the object to be garbage collected when only weak references remain",
          "It creates a deep clone that updates asynchronously"
        ],
        "correctAnswer": "It references an object without incrementing its reference count, allowing the object to be garbage collected when only weak references remain",
        "explanation": "Weak references do not protect an object from deallocation. If all strong references vanish, the object is reclaimed and `r()` returns `None`."
      },
      {
        "question": "When is `weakref.WeakValueDictionary` ideal in architectural design?",
        "options": [
          "For caching database passwords",
          "For persistent disk caching",
          "For in-memory caches: entries are automatically removed from the dictionary as soon as their values are no longer referenced anywhere else in the application",
          "For multithreaded priority queues"
        ],
        "correctAnswer": "For in-memory caches: entries are automatically removed from the dictionary as soon as their values are no longer referenced anywhere else in the application",
        "explanation": "`WeakValueDictionary` holds weak references to its values. When a value object dies, its key is purged automatically without manual cache eviction."
      },
      {
        "question": "What does `weakref.finalize(obj, cleanup_func, *args)` provide over legacy `__del__` methods?",
        "options": [
          "Freezes `obj` from receiving modifications",
          "Forces immediate deletion of `obj` at the OS level",
          "Registers a reliable cleanup callback executed when `obj` is collected without impeding cyclic GC collection or causing resurrection bugs common with `__del__`",
          "Runs `cleanup_func` in a separate Docker container"
        ],
        "correctAnswer": "Registers a reliable cleanup callback executed when `obj` is collected without impeding cyclic GC collection or causing resurrection bugs common with `__del__`",
        "explanation": "`weakref.finalize` is the modern, safe alternative to `__del__` for resource cleanup without interfering with cyclic GC traversals."
      },
      {
        "question": "Can built-in types like `list` or `dict` have weak references directly attached to them in CPython?",
        "codeSnippet": "import weakref\nl = [1, 2, 3]\nr = weakref.ref(l)  # What happens?",
        "language": "python",
        "options": [
          "Returns `None`",
          "Succeeds and creates the weakref",
          "Converts the list into a tuple",
          "Raises `TypeError: cannot create weak reference to 'list' object` (subclassing `list` is required to enable weakref support)"
        ],
        "correctAnswer": "Raises `TypeError: cannot create weak reference to 'list' object` (subclassing `list` is required to enable weakref support)",
        "explanation": "CPython omits `__weakreflist__` pointers from built-in containers (`list`, `dict`, `int`, `tuple`) to save memory. A subclass must be used to support weak references."
      },
      {
        "question": "What does calling a weak reference object `r()` return after the target object has been destroyed?",
        "codeSnippet": "r = weakref.ref(node)\ndel node\nprint(r())",
        "language": "python",
        "options": [
          "An empty object",
          "Raises ReferenceError",
          "Raises ValueError",
          "None"
        ],
        "correctAnswer": "None",
        "explanation": "Dereferencing a dead weak reference by calling `r()` returns `None`."
      }
    ]
  },
  {
    "title": "Python: ThreadPoolExecutor & ProcessPoolExecutor Concurrency",
    "description": "concurrent.futures, Future objects, map vs submit, as_completed, and exception handling.",
    "timeLimitMinutes": 12,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "What is the primary architectural difference between `ThreadPoolExecutor` and `ProcessPoolExecutor` in `concurrent.futures`?",
        "options": [
          "`ThreadPoolExecutor` supports async/await natively; `ProcessPoolExecutor` does not",
          "`ThreadPoolExecutor` is for Linux only; `ProcessPoolExecutor` is for Windows only",
          "`ProcessPoolExecutor` cannot return values from worker functions",
          "`ThreadPoolExecutor` shares memory in a single process (limited by GIL for CPU tasks); `ProcessPoolExecutor` uses isolated worker processes on separate CPU cores with serialized IPC"
        ],
        "correctAnswer": "`ThreadPoolExecutor` shares memory in a single process (limited by GIL for CPU tasks); `ProcessPoolExecutor` uses isolated worker processes on separate CPU cores with serialized IPC",
        "explanation": "Threads share the process memory space. Processes require data to be pickled and transmitted across pipes, but execute in parallel across separate GIL instances."
      },
      {
        "question": "What does `concurrent.futures.as_completed(futures)` yield?",
        "codeSnippet": "from concurrent.futures import ThreadPoolExecutor, as_completed\n\nwith ThreadPoolExecutor() as executor:\n    futures = [executor.submit(fetch, url) for url in urls]\n    for f in as_completed(futures):\n        data = f.result()",
        "language": "python",
        "options": [
          "Yields only futures that raised exceptions",
          "Yields futures strictly in the original list order",
          "Waits until all futures finish and returns a list of results",
          "An iterator that yields futures in the order they finish execution (fastest to slowest), rather than submission order"
        ],
        "correctAnswer": "An iterator that yields futures in the order they finish execution (fastest to slowest), rather than submission order",
        "explanation": "`as_completed` allows you to process results immediately as each task completes, minimizing overall latency."
      },
      {
        "question": "What happens if a worker function submitted to an executor raises an unhandled exception?",
        "codeSnippet": "future = executor.submit(failing_task)\n# Later:\nres = future.result()",
        "language": "python",
        "options": [
          "The exception is converted to a string in `future.error`",
          "The worker thread crashes the entire host process immediately",
          "`future.result()` returns `None` and discards the exception",
          "The exception is captured and re-raised when `future.result()` is called"
        ],
        "correctAnswer": "The exception is captured and re-raised when `future.result()` is called",
        "explanation": "Futures store exceptions internally. Calling `result()` re-raises the exception with its original traceback in the calling thread."
      },
      {
        "question": "Why must objects passed as arguments to `ProcessPoolExecutor.submit()` be picklable?",
        "options": [
          "Only objects inheriting from `dict` can be passed to processes",
          "To encrypt arguments across the network",
          "To convert Python objects into C structs",
          "Arguments must be serialized via `pickle` to transmit across OS process boundaries through pipes/queues"
        ],
        "correctAnswer": "Arguments must be serialized via `pickle` to transmit across OS process boundaries through pipes/queues",
        "explanation": "Processes have separate memory spaces. Python uses `pickle` to serialize arguments sent to child workers and deserialize results."
      },
      {
        "question": "What is the behavior of `executor.map(func, iterable)` when an exception occurs in one of the calls?",
        "options": [
          "It retries the failed item 3 times",
          "The entire map call fails immediately before any task starts",
          "Failed items are replaced by `None` in the returned iterator",
          "The exception is raised when iterating over the returned generator at the position of the failed item"
        ],
        "correctAnswer": "The exception is raised when iterating over the returned generator at the position of the failed item",
        "explanation": "`executor.map` returns a generator. When consumption reaches the index where an exception was thrown, that exception is raised."
      }
    ]
  },
  {
    "title": "Python: Socket Programming & Low-Level Network I/O",
    "description": "socket module, TCP handshakes, non-blocking sockets, select/selectors, and buffer flushing.",
    "timeLimitMinutes": 12,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "Why can `socket.recv(4096)` return fewer than 4096 bytes even if the sender transmitted 4096 bytes?",
        "options": [
          "Because 4096 bytes was compressed by the kernel",
          "Because Python sockets have an MTU limit of 1460 bytes",
          "It indicates a network transmission error",
          "TCP is a stream-oriented protocol with no message boundaries; `recv` returns whatever data is currently available in the OS network buffer"
        ],
        "correctAnswer": "TCP is a stream-oriented protocol with no message boundaries; `recv` returns whatever data is currently available in the OS network buffer",
        "explanation": "TCP streams have no message delimitation. Applications must loop until the full expected message length is received or a delimiter is encountered."
      },
      {
        "question": "What does setting `sock.setblocking(False)` do to socket operations like `recv()` or `accept()`?",
        "options": [
          "Drops all incoming packets",
          "Spawns a background thread to handle socket reads",
          "Enables UDP mode on the socket",
          "Operations return immediately; if no data is available, they raise `BlockingIOError` (EWOULDBLOCK) instead of stalling the thread"
        ],
        "correctAnswer": "Operations return immediately; if no data is available, they raise `BlockingIOError` (EWOULDBLOCK) instead of stalling the thread",
        "explanation": "Non-blocking sockets return immediately without waiting for network events, raising `BlockingIOError` when the operation would otherwise block."
      },
      {
        "question": "What does Python's `selectors` module provide over raw `select.select()`?",
        "options": [
          "A replacement for HTTP/2",
          "Asynchronous DNS lookups",
          "Automatic TLS certificate generation",
          "High-level I/O multiplexing that automatically chooses the most efficient OS polling mechanism (`epoll` on Linux, `kqueue` on macOS) via `DefaultSelector`"
        ],
        "correctAnswer": "High-level I/O multiplexing that automatically chooses the most efficient OS polling mechanism (`epoll` on Linux, `kqueue` on macOS) via `DefaultSelector`",
        "explanation": "`selectors.DefaultSelector` abstracts platform-specific multiplexing APIs (`epoll`, `kqueue`, `select`) behind a uniform interface."
      },
      {
        "question": "Why should `SO_REUSEADDR` be enabled on server listening sockets?",
        "codeSnippet": "sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)",
        "language": "python",
        "options": [
          "Increases TCP window size to 1MB",
          "Allows multiple separate servers to listen on the same port simultaneously",
          "Enables IPv6 dual-stack support",
          "Allows immediate binding to the port even if it is in the TCP `TIME_WAIT` state from a recently restarted server instance"
        ],
        "correctAnswer": "Allows immediate binding to the port even if it is in the TCP `TIME_WAIT` state from a recently restarted server instance",
        "explanation": "Without `SO_REUSEADDR`, restarting a server immediately after shutdown fails with `Address already in use` due to the TCP `TIME_WAIT` cooldown."
      },
      {
        "question": "What does `socket.sendall(data)` guarantee compared to `socket.send(data)`?",
        "options": [
          "Compresses data using DEFLATE",
          "Broadcasts data to all devices on the local subnet",
          "Encrypts data using SSL before transmission",
          "Continues sending chunks in a loop until all bytes have been transmitted or an error occurs"
        ],
        "correctAnswer": "Continues sending chunks in a loop until all bytes have been transmitted or an error occurs",
        "explanation": "`send()` may transmit only a fraction of the data and return the number of bytes sent. `sendall()` loops until the entire buffer is sent."
      }
    ]
  }
];
