export const pythonMidChallenges = [
  {
    "title": "Python: Decorators & Function Wrapping (@functools.wraps)",
    "description": "Function wrapping, metadata preservation, parameterized decorators, and closure scopes.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "Why should `@functools.wraps(func)` be used inside a custom decorator wrapper?",
        "codeSnippet": "from functools import wraps\n\ndef my_decorator(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper",
        "language": "python",
        "options": [
          "It copies the original function's `__name__`, `__doc__`, and `__annotations__` to `wrapper` so introspection tools work properly",
          "It compiles the decorated function into C bytecode",
          "It prevents the function from raising exceptions",
          "It automatically runs the wrapped function in a background thread"
        ],
        "correctAnswer": "It copies the original function's `__name__`, `__doc__`, and `__annotations__` to `wrapper` so introspection tools work properly",
        "explanation": "Without `@wraps`, the decorated function takes on the name `'wrapper'` and loses its docstrings and signature inspection attributes."
      },
      {
        "question": "How do you write a decorator that accepts configuration arguments like `@repeat(num=3)`?",
        "codeSnippet": "def repeat(num=3):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            for _ in range(num):\n                res = func(*args, **kwargs)\n            return res\n        return wrapper\n    return decorator",
        "language": "python",
        "options": [
          "Write a 3-level nested function: outer function takes arguments and returns the actual decorator, which returns the wrapper",
          "Pass `*args` to `@functools.wraps`",
          "Inherit from `typing.Decorator`",
          "Use a global variable to store `num`"
        ],
        "correctAnswer": "Write a 3-level nested function: outer function takes arguments and returns the actual decorator, which returns the wrapper",
        "explanation": "A parameterized decorator is a factory: calling `repeat(3)` returns the decorator function, which then receives the target function."
      },
      {
        "question": "In what order are stacked decorators evaluated and executed?",
        "codeSnippet": "@decorator_one\n@decorator_two\ndef process():\n    pass",
        "language": "python",
        "options": [
          "Decorators wrap from bottom to top: `decorator_one(decorator_two(process))`",
          "Decorators wrap from top to bottom: `decorator_two(decorator_one(process))`",
          "They execute concurrently using thread pools",
          "Order is non-deterministic in Python 3"
        ],
        "correctAnswer": "Decorators wrap from bottom to top: `decorator_one(decorator_two(process))`",
        "explanation": "Python wraps from bottom to top. Therefore, `@decorator_two` wraps `process` first, and `@decorator_one` wraps the resulting wrapper."
      },
      {
        "question": "Can a Python class be used as a decorator?",
        "codeSnippet": "class CountCalls:\n    def __init__(self, func):\n        self.func = func\n        self.count = 0\n    def __call__(self, *args, **kwargs):\n        self.count += 1\n        return self.func(*args, **kwargs)",
        "language": "python",
        "options": [
          "Yes, implementing `__call__` makes class instances callable, allowing them to act as stateful decorators",
          "No, only functions can decorate functions in Python",
          "Yes, but only if the class inherits from `types.FunctionType`",
          "No, because classes cannot access function arguments"
        ],
        "correctAnswer": "Yes, implementing `__call__` makes class instances callable, allowing them to act as stateful decorators",
        "explanation": "Any object with a `__call__` method is callable in Python, making classes ideal for decorators that need persistent state."
      },
      {
        "question": "What does the `@property` decorator do when applied to a method?",
        "codeSnippet": "class Account:\n    def __init__(self, balance):\n        self._balance = balance\n    @property\n    def balance(self):\n        return self._balance",
        "language": "python",
        "options": [
          "Turns the method into a managed getter accessible via attribute syntax: `acc.balance` instead of `acc.balance()`",
          "Makes the balance variable completely immutable at the C level",
          "Saves the balance to a persistent SQLite database",
          "Marks the attribute as private"
        ],
        "correctAnswer": "Turns the method into a managed getter accessible via attribute syntax: `acc.balance` instead of `acc.balance()`",
        "explanation": "`@property` creates a descriptor that allows method execution via simple attribute dot-access."
      }
    ]
  },
  {
    "title": "Python: Generators, `yield` & Memory Efficiency",
    "description": "Generators, generator expressions, send() method, and lazy evaluation.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "What makes generator functions drastically more memory-efficient than returning full lists when reading large datasets?",
        "codeSnippet": "def stream_lines(filepath):\n    with open(filepath) as f:\n        for line in f:\n            yield line.strip()",
        "language": "python",
        "options": [
          "Generators produce items lazily on-demand using `yield`, pausing execution and holding only one item in memory at a time",
          "Generators compress all data using gzip in memory",
          "Generators offload items to virtual swap space on disk",
          "Generators execute in C rather than Python bytecode"
        ],
        "correctAnswer": "Generators produce items lazily on-demand using `yield`, pausing execution and holding only one item in memory at a time",
        "explanation": "`yield` pauses the generator's execution frame and yields the current value. State is resumed only when `next()` is requested."
      },
      {
        "question": "What happens when a generator function is exhausted and `next()` is called again?",
        "codeSnippet": "def simple():\n    yield 1\n\ng = simple()\nprint(next(g))\nnext(g)  # Second call",
        "language": "python",
        "options": [
          "Python raises a `StopIteration` exception",
          "It returns `None`",
          "It loops back and returns 1 again",
          "It raises an `IndexError`"
        ],
        "correctAnswer": "Python raises a `StopIteration` exception",
        "explanation": "The Python iterator protocol signals completion by raising `StopIteration`, which `for` loops catch internally to terminate."
      },
      {
        "question": "What does `yield from sub_generator()` achieve in Python 3.3+?",
        "codeSnippet": "def combined():\n    yield from range(3)\n    yield from ['a', 'b']",
        "language": "python",
        "options": [
          "Delegates iteration to the sub-generator and establishes a transparent bidirectional channel for `send()` and `throw()`",
          "Creates a new thread to run `sub_generator()`",
          "Converts the sub-generator into a tuple",
          "Catches and suppresses all errors from the sub-generator"
        ],
        "correctAnswer": "Delegates iteration to the sub-generator and establishes a transparent bidirectional channel for `send()` and `throw()`",
        "explanation": "`yield from` delegates all iteration and value transmission (`send()`, `throw()`, return values) directly to the sub-generator."
      },
      {
        "question": "How do you send data into a running generator coroutine using `.send(value)`?",
        "codeSnippet": "def receiver():\n    val = yield 'ready'\n    print('Received:', val)\n\ng = receiver()\nprint(next(g))\ng.send('hello')",
        "language": "python",
        "options": [
          "Prints 'ready', then 'Received: hello', then raises StopIteration",
          "Raises TypeError: Generators cannot accept values",
          "Prints 'Received: None'",
          "Prints 'hello' twice"
        ],
        "correctAnswer": "Prints 'ready', then 'Received: hello', then raises StopIteration",
        "explanation": "Calling `next()` primes the generator until the first `yield`. `g.send('hello')` resumes execution and assigns the value to `val`."
      },
      {
        "question": "What syntax creates an inline generator expression instead of a list comprehension?",
        "options": [
          "Parentheses: `(x * 2 for x in data)`",
          "Square brackets: `[x * 2 for x in data]`",
          "Curly braces: `{x * 2 for x in data}`",
          "Angle brackets: `<x * 2 for x in data>`"
        ],
        "correctAnswer": "Parentheses: `(x * 2 for x in data)`",
        "explanation": "Parentheses `(...)` define a generator expression, which evaluates lazily, whereas brackets `[...]` evaluate the entire list eagerly."
      }
    ]
  },
  {
    "title": "Python: Itertools & Functional Utilities",
    "description": "itertools (chain, cycle, groupby, islice), functools (reduce, lru_cache), and operator module.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "What does `@functools.lru_cache(maxsize=128)` do when decorating an expensive pure function?",
        "codeSnippet": "from functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef fib(n):\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)",
        "language": "python",
        "options": [
          "Memoizes function calls by caching results keyed by arguments up to 128 entries, discarding Least Recently Used entries on overflow",
          "Restricts the function to a maximum execution memory of 128 kilobytes",
          "Runs the function up to 128 times concurrently",
          "Saves cache results to disk across machine restarts"
        ],
        "correctAnswer": "Memoizes function calls by caching results keyed by arguments up to 128 entries, discarding Least Recently Used entries on overflow",
        "explanation": "`lru_cache` provides built-in in-memory memoization with an LRU eviction policy, turning exponential recursion into linear time."
      },
      {
        "question": "What critical prerequisite must data meet before using `itertools.groupby()`?",
        "codeSnippet": "import itertools\nitems = [{'category': 'A'}, {'category': 'B'}, {'category': 'A'}]\n# Why will groupby not group all 'A's together here?",
        "language": "python",
        "options": [
          "The iterable must be sorted by the grouping key first, because `groupby()` only aggregates consecutive matching elements",
          "Data must be stored in a set",
          "All dictionary values must be integers",
          "`groupby()` can only process single characters"
        ],
        "correctAnswer": "The iterable must be sorted by the grouping key first, because `groupby()` only aggregates consecutive matching elements",
        "explanation": "`itertools.groupby` generates a new group each time the key changes. Unsorted data will produce disjoint groups for the same key."
      },
      {
        "question": "What does `itertools.chain(iter1, iter2)` do?",
        "codeSnippet": "from itertools import chain\nprint(list(chain([1, 2], [3, 4])))",
        "language": "python",
        "options": [
          "[1, 2, 3, 4] (treats multiple consecutive sequences as a single continuous stream without copying)",
          "[(1, 3), (2, 4)]",
          "[[1, 2], [3, 4]]",
          "TypeError: chain requires tuples"
        ],
        "correctAnswer": "[1, 2, 3, 4] (treats multiple consecutive sequences as a single continuous stream without copying)",
        "explanation": "`itertools.chain` iterates over the first iterable until exhausted, then seamlessly proceeds to the next."
      },
      {
        "question": "What is the purpose of `functools.partial()`?",
        "codeSnippet": "from functools import partial\nbase_two = partial(int, base=2)\nprint(base_two('1010'))",
        "language": "python",
        "options": [
          "2",
          "10 (freezes certain argument values, returning a new callable with a simpler signature)",
          "1010",
          "TypeError: partial cannot freeze built-in functions"
        ],
        "correctAnswer": "10 (freezes certain argument values, returning a new callable with a simpler signature)",
        "explanation": "`partial(func, *args, **kwargs)` creates a new partial object that pre-binds specific arguments."
      },
      {
        "question": "What does `itertools.islice(iterable, start, stop)` provide over standard list slicing `iterable[start:stop]`?",
        "options": [
          "It reverses the slice automatically",
          "It can slice arbitrary non-indexable iterators and generators lazily without building intermediate lists",
          "It sorts the slice before returning",
          "It runs 10x slower but uses less disk space"
        ],
        "correctAnswer": "It can slice arbitrary non-indexable iterators and generators lazily without building intermediate lists",
        "explanation": "Standard slicing requires sequence indexing (`__getitem__`). `islice` consumes elements lazily from any generic iterator."
      }
    ]
  },
  {
    "title": "Python: Object-Oriented Programming & `__init__` vs `__new__`",
    "description": "Instance creation vs initialization, classmethods vs staticmethods, and singletons.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "What is the fundamental difference between `__new__` and `__init__` in Python class instantiation?",
        "options": [
          "`__new__` is called only for subclasses; `__init__` is called for base classes",
          "`__new__` is the static creator method that actually creates and returns the new object instance; `__init__` initializes the created instance",
          "`__init__` allocates memory; `__new__` assigns variables",
          "There is no difference; `__new__` is deprecated"
        ],
        "correctAnswer": "`__new__` is the static creator method that actually creates and returns the new object instance; `__init__` initializes the created instance",
        "explanation": "`__new__(cls, ...)` is called first to allocate the instance. If it returns an instance of `cls`, Python then calls `__init__(self, ...)` to initialize it."
      },
      {
        "question": "How do `@classmethod` and `@staticmethod` differ in Python?",
        "codeSnippet": "class Arena:\n    @classmethod\n    def from_config(cls, path): pass\n    \n    @staticmethod\n    def validate(ip): pass",
        "language": "python",
        "options": [
          "`@staticmethod` can only be called from instances",
          "`@classmethod` receives the class object `cls` as its implicit first argument; `@staticmethod` receives no implicit first argument",
          "`@classmethod` can modify instance variables directly",
          "`@staticmethod` creates a background thread"
        ],
        "correctAnswer": "`@classmethod` receives the class object `cls` as its implicit first argument; `@staticmethod` receives no implicit first argument",
        "explanation": "Class methods receive the class (`cls`) allowing factory instantiation. Static methods behave like plain functions placed within the class namespace."
      },
      {
        "question": "How is a Singleton pattern commonly implemented using `__new__`?",
        "codeSnippet": "class Singleton:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance",
        "language": "python",
        "options": [
          "By catching all instantiation attempts with `try/except`",
          "By caching and returning `cls._instance` on every invocation of `__new__`, ensuring only one instance ever exists",
          "By deleting `__init__` from the class dictionary",
          "By declaring the class private with double underscores"
        ],
        "correctAnswer": "By caching and returning `cls._instance` on every invocation of `__new__`, ensuring only one instance ever exists",
        "explanation": "Overriding `__new__` intercepts instance creation and returns the existing cached instance rather than constructing a new one."
      },
      {
        "question": "What does `super()` return when called inside a subclass method in Python 3?",
        "codeSnippet": "class Sub(Base):\n    def action(self):\n        super().action()",
        "language": "python",
        "options": [
          "A raw copy of the parent class definition",
          "A proxy object that delegates method calls to parent or sibling classes based on the Method Resolution Order (MRO)",
          "The top-most `object` base class instance",
          "A dictionary of parent class attributes"
        ],
        "correctAnswer": "A proxy object that delegates method calls to parent or sibling classes based on the Method Resolution Order (MRO)",
        "explanation": "`super()` returns a proxy that resolves attributes along the caller class's MRO."
      },
      {
        "question": "What does name mangling with double underscores (e.g. `__secret`) accomplish in Python?",
        "codeSnippet": "class Vault:\n    def __init__(self):\n        self.__secret = 42",
        "language": "python",
        "options": [
          "Encrypts the variable in RAM using AES",
          "Rewrites the attribute name to `_Vault__secret` to prevent accidental name collisions in subclasses",
          "Makes the attribute strictly impossible to access from outside the class",
          "Declares the attribute as thread-safe"
        ],
        "correctAnswer": "Rewrites the attribute name to `_Vault__secret` to prevent accidental name collisions in subclasses",
        "explanation": "Python mangles names starting with two leading underscores into `_ClassName__attribute` to avoid namespace collisions during inheritance."
      }
    ]
  },
  {
    "title": "Python: Magic / Dunder Methods (`__repr__`, `__str__`, `__len__`, `__eq__`)",
    "description": "Data model protocols, string representations, comparison dunders, and custom container emulations.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "What is the recommended design distinction between `__str__` and `__repr__` in Python?",
        "options": [
          "`__str__` is only for terminal printing; `__repr__` is only for web browsers",
          "`__str__` is intended for readable, human-facing output; `__repr__` should be unambiguous and ideally valid Python code to recreate the object",
          "`__repr__` is called only if `__str__` raises an exception",
          "They are identical aliases"
        ],
        "correctAnswer": "`__str__` is intended for readable, human-facing output; `__repr__` should be unambiguous and ideally valid Python code to recreate the object",
        "explanation": "As the Python documentation states: `__repr__` is for developers and debugging (unambiguous); `__str__` is for end users (readable)."
      },
      {
        "question": "If a class defines `__eq__` but does NOT define `__hash__`, what happens to its hashability in Python 3?",
        "codeSnippet": "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __eq__(self, other):\n        return (self.x, self.y) == (other.x, other.y)\n\np = Point(1, 2)\nhash(p)  # What happens?",
        "language": "python",
        "options": [
          "Python automatically computes a hash from all attributes",
          "Python sets `__hash__ = None`, making the object unhashable and raising `TypeError: unhashable type: 'Point'`",
          "It uses the memory ID as the hash fallback",
          "It returns 0"
        ],
        "correctAnswer": "Python sets `__hash__ = None`, making the object unhashable and raising `TypeError: unhashable type: 'Point'`",
        "explanation": "Defining `__eq__` implicitly invalidates the default identity-based `__hash__` to preserve the invariant that equal objects must have equal hashes."
      },
      {
        "question": "Which dunder method must an object implement so that `len(obj)` works?",
        "options": [
          "__size__",
          "__len__",
          "__count__",
          "__length__"
        ],
        "correctAnswer": "__len__",
        "explanation": "The built-in `len()` function delegates directly to the object's `__len__()` method, which must return a non-negative integer."
      },
      {
        "question": "What does implementing `__getitem__` and `__setitem__` allow an object to do?",
        "codeSnippet": "class CustomCollection:\n    def __getitem__(self, key): pass\n    def __setitem__(self, key, value): pass",
        "language": "python",
        "options": [
          "Enables calling the object as a function: `obj(key)`",
          "Enables square bracket indexing and item assignment: `obj[key]` and `obj[key] = value`",
          "Enables iteration using `for x in obj:` only if `__iter__` is also defined",
          "Enables arithmetic operators like `obj + key`"
        ],
        "correctAnswer": "Enables square bracket indexing and item assignment: `obj[key]` and `obj[key] = value`",
        "explanation": "`__getitem__` and `__setitem__` emulate container mapping/sequence indexing syntax."
      },
      {
        "question": "What does the `@functools.total_ordering` class decorator do?",
        "options": [
          "Sorts all attributes in the class alphabetically",
          "Given `__eq__` and one ordering method (`__lt__`, `__le__`, `__gt__`, or `__ge__`), it automatically generates all remaining comparison dunders",
          "Forces lists of instances to be sorted using quicksort",
          "Prevents `None` from being compared against instances"
        ],
        "correctAnswer": "Given `__eq__` and one ordering method (`__lt__`, `__le__`, `__gt__`, or `__ge__`), it automatically generates all remaining comparison dunders",
        "explanation": "`@total_ordering` reduces boilerplate by synthesizing the other comparison methods from `__eq__` and any single ordering method."
      }
    ]
  },
  {
    "title": "Python: Custom Context Managers with `contextlib`",
    "description": "contextlib.contextmanager, __enter__ and __exit__, suppression, and exit stacks.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "How does the `@contextmanager` decorator turn a generator into a valid context manager?",
        "codeSnippet": "from contextlib import contextmanager\n\n@contextmanager\ndef managed_resource():\n    resource = acquire()\n    try:\n        yield resource\n    finally:\n        release(resource)",
        "language": "python",
        "options": [
          "It spawns an async event loop around the generator",
          "Code before `yield` runs in `__enter__`; `yield` returns the resource to the `as` target; code in `finally` runs in `__exit__`",
          "It forces `release()` to run in a separate subprocess",
          "It silences all exceptions thrown inside the block"
        ],
        "correctAnswer": "Code before `yield` runs in `__enter__`; `yield` returns the resource to the `as` target; code in `finally` runs in `__exit__`",
        "explanation": "The `@contextmanager` decorator wraps the generator so execution before `yield` is `__enter__` and execution after `yield` is `__exit__`."
      },
      {
        "question": "How does an explicit `__exit__(self, exc_type, exc_val, exc_tb)` suppress an exception so it does not propagate?",
        "options": [
          "By setting `exc_val = None`",
          "By raising `StopIteration`",
          "By returning a truthy value (e.g. `return True`)",
          "By returning `None`"
        ],
        "correctAnswer": "By returning a truthy value (e.g. `return True`)",
        "explanation": "If `__exit__` returns `True`, Python suppresses the exception and continues normal execution after the `with` block."
      },
      {
        "question": "What does `contextlib.suppress(*exceptions)` accomplish?",
        "codeSnippet": "import os\nfrom contextlib import suppress\n\nwith suppress(FileNotFoundError):\n    os.remove('temp.txt')",
        "language": "python",
        "options": [
          "Converts the exception into a logging warning",
          "Deletes the exception class from the Python namespace",
          "Cleanly catches and silences specified exceptions without requiring verbose `try/except: pass` blocks",
          "Reruns the block until it succeeds"
        ],
        "correctAnswer": "Cleanly catches and silences specified exceptions without requiring verbose `try/except: pass` blocks",
        "explanation": "`contextlib.suppress` is standard syntactic sugar for catching and ignoring specific expected exceptions."
      },
      {
        "question": "When is `contextlib.ExitStack()` particularly useful?",
        "options": [
          "When reversing recursive function calls",
          "When profiling call stack depths",
          "When managing a dynamic, variable number of context managers whose count is unknown at compile time",
          "When terminating multi-threaded processes"
        ],
        "correctAnswer": "When managing a dynamic, variable number of context managers whose count is unknown at compile time",
        "explanation": "`ExitStack` allows you to programmatically enter and register multiple context managers and ensures they are all unwound in LIFO order."
      },
      {
        "question": "What happens if an exception is raised inside a `@contextmanager` block and not caught by `try/finally` around the `yield`?",
        "options": [
          "Python terminates the process immediately",
          "The generator ignores the exception and proceeds to EOF",
          "The exception is re-raised at the point of the `yield` statement inside the generator",
          "`yield` returns `None`"
        ],
        "correctAnswer": "The exception is re-raised at the point of the `yield` statement inside the generator",
        "explanation": "Any exception that occurs inside the `with` body is thrown into the generator at the `yield` via `generator.throw()`."
      }
    ]
  },
  {
    "title": "Python: Shallow vs Deep Copy & Object Identity (`is` vs `==`)",
    "description": "copy module, shallow copies of containers, recursive deep copies, and object interning.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "What is the key difference between `copy.copy(x)` (shallow) and `copy.deepcopy(x)`?",
        "codeSnippet": "import copy\na = [[1, 2], [3, 4]]\nb = copy.copy(a)\nc = copy.deepcopy(a)\n\na[0].append(99)",
        "language": "python",
        "options": [
          "Both `b` and `c` are completely isolated and do not have 99",
          "`c` is mutated, but `b` is isolated",
          "`b` reflects the mutation (`b[0]` has 99) because shallow copy references the same inner lists; `c` remains unchanged",
          "Both `b` and `c` reflect the mutation"
        ],
        "correctAnswer": "`b` reflects the mutation (`b[0]` has 99) because shallow copy references the same inner lists; `c` remains unchanged",
        "explanation": "Shallow copy constructs a new collection but inserts references to the original child objects. Deep copy recursively copies all nested objects."
      },
      {
        "question": "Why does `a == b` evaluate to `True` while `a is b` evaluates to `False` here?",
        "codeSnippet": "a = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b)\nprint(a is b)",
        "language": "python",
        "options": [
          "`==` checks memory addresses; `is` checks contents",
          "`is` checks string representations",
          "`==` checks value equality (`a.__eq__(b)`); `is` checks reference identity (`id(a) == id(b)`)",
          "`is` is only used for integers and strings"
        ],
        "correctAnswer": "`==` checks value equality (`a.__eq__(b)`); `is` checks reference identity (`id(a) == id(b)`)",
        "explanation": "`==` tests whether the contents are equivalent. `is` checks whether both variables point to the exact same object in memory."
      },
      {
        "question": "Why does `x is y` evaluate to `True` for `x = 250; y = 250`, but might evaluate to `False` for `x = 1000; y = 1000` in interactive REPL?",
        "options": [
          "Python converts large integers to floats in the REPL",
          "Integers above 256 cannot be compared with `is`",
          "CPython pre-allocates and interns a fixed global array of small integers between -5 and 256 for performance",
          "The `is` operator has a 1-byte integer limit"
        ],
        "correctAnswer": "CPython pre-allocates and interns a fixed global array of small integers between -5 and 256 for performance",
        "explanation": "CPython maintains a cache of small integer objects in the range `[-5, 256]`. References to integers in that range point to the same singleton."
      },
      {
        "question": "How does `copy.deepcopy()` handle self-referential or cyclic data structures without infinite recursion?",
        "codeSnippet": "lst = []\nlst.append(lst)\nclone = copy.deepcopy(lst)",
        "language": "python",
        "options": [
          "It skips self-referencing pointers",
          "It throws a RecursionError after 1000 iterations",
          "It maintains an internal `memo` dictionary tracking already copied object IDs across the traversal",
          "It converts the cycle into a flat tuple"
        ],
        "correctAnswer": "It maintains an internal `memo` dictionary tracking already copied object IDs across the traversal",
        "explanation": "`copy.deepcopy` passes a `memo` dict mapping `id(obj)` to its new copy, preventing infinite loops on cyclical graphs."
      },
      {
        "question": "Which of the following slicing operations creates a shallow copy of a list?",
        "options": [
          "new_list = list.fromkeys(old_list)",
          "new_list = old_list",
          "new_list = old_list[:]",
          "new_list = iter(old_list)"
        ],
        "correctAnswer": "new_list = old_list[:]",
        "explanation": "`old_list[:]` (or `list(old_list)` or `old_list.copy()`) creates a new shallow copy of the list."
      }
    ]
  },
  {
    "title": "Python: Dataclasses & Pydantic Validation",
    "description": "@dataclass decorator, default_factory, frozen dataclasses, and Pydantic models.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "What does the `@dataclass` decorator (Python 3.7+) automatically generate for a class?",
        "codeSnippet": "from dataclasses import dataclass\n\n@dataclass\nclass User:\n    id: int\n    name: str = 'Anonymous'",
        "language": "python",
        "options": [
          "REST API endpoints for the class",
          "A relational database table in PostgreSQL",
          "Standard boilerplate methods including `__init__`, `__repr__`, and `__eq__` based on typed field annotations",
          "Serialization to JSON using rapidjson"
        ],
        "correctAnswer": "Standard boilerplate methods including `__init__`, `__repr__`, and `__eq__` based on typed field annotations",
        "explanation": "`@dataclass` inspects class annotations and generates `__init__`, `__repr__`, `__eq__`, and helper methods automatically."
      },
      {
        "question": "Why must mutable defaults in dataclasses be declared using `field(default_factory=...)`?",
        "codeSnippet": "from dataclasses import dataclass, field\n\n@dataclass\nclass Team:\n    # Why not members: list = [] ?\n    members: list = field(default_factory=list)",
        "language": "python",
        "options": [
          "To force `members` to be immutable",
          "Because dataclasses cannot parse the `[]` syntax",
          "To prevent all instances of `Team` from sharing the exact same mutable list instance",
          "`default_factory` is only required for multithreaded code"
        ],
        "correctAnswer": "To prevent all instances of `Team` from sharing the exact same mutable list instance",
        "explanation": "Dataclasses disallow mutable default instances directly in class definitions; `field(default_factory=list)` ensures a fresh list is created for every instance."
      },
      {
        "question": "What effect does `@dataclass(frozen=True)` have on instances?",
        "options": [
          "Prevents the class from being inherited",
          "Compresses the object in memory",
          "Makes instances immutable; assigning to any field after creation raises a `FrozenInstanceError` and generates a `__hash__` method",
          "Disables garbage collection on instances"
        ],
        "correctAnswer": "Makes instances immutable; assigning to any field after creation raises a `FrozenInstanceError` and generates a `__hash__` method",
        "explanation": "`frozen=True` overrides `__setattr__` and `__delattr__` to raise `FrozenInstanceError` on modification, allowing instances to be hashable."
      },
      {
        "question": "What is a primary distinction between Python standard `dataclasses` and `pydantic.BaseModel`?",
        "options": [
          "Standard dataclasses cannot serialize to dictionaries",
          "Dataclasses are 100x faster than Pydantic",
          "Pydantic can only be used with FastAPI",
          "Pydantic parses and strictly enforces data types at runtime with automatic coercion and validation; standard dataclasses do not validate types at runtime"
        ],
        "correctAnswer": "Pydantic parses and strictly enforces data types at runtime with automatic coercion and validation; standard dataclasses do not validate types at runtime",
        "explanation": "Dataclasses only generate code structure. Pydantic performs deep data validation, type coercion, and error reporting at runtime."
      },
      {
        "question": "Which hook method in dataclasses runs immediately after `__init__` completes?",
        "options": [
          "__validate__",
          "__after_init__",
          "__setup__",
          "__post_init__"
        ],
        "correctAnswer": "__post_init__",
        "explanation": "The generated `__init__` calls `self.__post_init__()` if defined, allowing derived field calculations and custom validation."
      }
    ]
  },
  {
    "title": "Python: Multiprocessing vs Threading Basics",
    "description": "GIL boundaries, threading for I/O bound tasks, multiprocessing for CPU bound workloads, and IPC.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "Why does Python's `threading` module fail to speed up CPU-intensive numerical computations in standard CPython?",
        "options": [
          "The CPU disables hyperthreading for Python processes",
          "Python threads are green threads that cannot use multiple OS cores",
          "Threads share the same call stack and overwrite each other's calculations",
          "The Global Interpreter Lock (GIL) serializes bytecode execution so only one thread runs Python code at any single instant"
        ],
        "correctAnswer": "The Global Interpreter Lock (GIL) serializes bytecode execution so only one thread runs Python code at any single instant",
        "explanation": "In CPython, the GIL allows only one thread to hold the Python interpreter lock. For CPU-bound tasks, threads contend for the lock without parallel CPU speedup."
      },
      {
        "question": "When IS `threading` highly effective and appropriate in Python?",
        "options": [
          "For compressing multi-gigabyte video files",
          "For calculating millions of prime numbers",
          "For rendering 3D graphics",
          "For I/O-bound operations (network requests, database queries, disk reads) where threads spend most time waiting and release the GIL"
        ],
        "correctAnswer": "For I/O-bound operations (network requests, database queries, disk reads) where threads spend most time waiting and release the GIL",
        "explanation": "During blocking I/O calls (like socket reads or file I/O), CPython releases the GIL, allowing other threads to run concurrently."
      },
      {
        "question": "How does the `multiprocessing` module achieve true CPU parallelism across multi-core systems?",
        "options": [
          "It converts loops into C threads automatically",
          "It disables the GIL across the entire system",
          "It compiles Python functions to GPU shaders",
          "It spawns separate OS processes, each with its own independent Python interpreter and isolated memory space (bypassing the single GIL)"
        ],
        "correctAnswer": "It spawns separate OS processes, each with its own independent Python interpreter and isolated memory space (bypassing the single GIL)",
        "explanation": "Each child process created by `multiprocessing` has its own GIL and memory space, allowing true parallel execution on separate CPU cores."
      },
      {
        "question": "Why must code that starts processes with `multiprocessing` be protected with `if __name__ == '__main__':` on Windows?",
        "options": [
          "It is required by the Windows Defender antivirus scanner",
          "Windows does not support Python without the main guard",
          "To allow administrator privileges",
          "Windows uses the `spawn` start method, which imports the main module into child processes; without the guard, an infinite recursive spawn loop occurs"
        ],
        "correctAnswer": "Windows uses the `spawn` start method, which imports the main module into child processes; without the guard, an infinite recursive spawn loop occurs",
        "explanation": "On platforms without `fork` (like Windows), child processes re-import the main script. The guard prevents the child from re-spawning further processes."
      },
      {
        "question": "Which IPC (Inter-Process Communication) mechanism in `multiprocessing` provides a thread/process-safe FIFO queue?",
        "options": [
          "multiprocessing.Value",
          "multiprocessing.Pipe",
          "multiprocessing.Array",
          "multiprocessing.Queue"
        ],
        "correctAnswer": "multiprocessing.Queue",
        "explanation": "`multiprocessing.Queue` is a process-safe FIFO queue implemented using pipes and locks, serializing objects using `pickle`."
      }
    ]
  },
  {
    "title": "Python: Logging, Configuration & Virtual Environments",
    "description": "logging module hierarchy, log levels, venv isolation, and environment variables.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "What is the standard severity order of Python's built-in log levels from lowest to highest?",
        "options": [
          "TRACE < DEBUG < INFO < WARN < FATAL",
          "INFO < DEBUG < WARNING < ERROR < CRITICAL",
          "DEBUG < WARNING < INFO < CRITICAL < ERROR",
          "DEBUG < INFO < WARNING < ERROR < CRITICAL"
        ],
        "correctAnswer": "DEBUG < INFO < WARNING < ERROR < CRITICAL",
        "explanation": "Python's standard levels are: DEBUG (10), INFO (20), WARNING (30), ERROR (40), and CRITICAL (50)."
      },
      {
        "question": "Why is `logger = logging.getLogger(__name__)` recommended over calling root `logging.info()` directly in libraries?",
        "options": [
          "`logging.info()` is deprecated in Python 3.12",
          "It prevents logs from being written to the terminal",
          "It formats logs as JSON automatically",
          "It creates a modular logger within the module's hierarchical dotted namespace, allowing fine-grained log level configuration by parent applications"
        ],
        "correctAnswer": "It creates a modular logger within the module's hierarchical dotted namespace, allowing fine-grained log level configuration by parent applications",
        "explanation": "Using `__name__` mirrors the module hierarchy (`pkg.subpkg.module`), allowing consumers to configure log levels for specific packages independently."
      },
      {
        "question": "What does creating a Python virtual environment (`python -m venv .venv`) do?",
        "options": [
          "Encrypts the Python project source code",
          "Runs Python inside a Docker container",
          "Installs a virtual Linux OS inside Windows",
          "Creates an isolated directory containing a private Python executable and site-packages folder to prevent package dependency conflicts with the system Python"
        ],
        "correctAnswer": "Creates an isolated directory containing a private Python executable and site-packages folder to prevent package dependency conflicts with the system Python",
        "explanation": "A virtual environment provides an isolated directory tree with its own binaries and `site-packages`, isolating project dependencies."
      },
      {
        "question": "How do you read an environment variable with a safe fallback in standard Python?",
        "codeSnippet": "import os\nport = int(os.environ.get('PORT', 8080))",
        "language": "python",
        "options": [
          "Use `sys.env('KEY')`",
          "Use `os.getenv_or_raise('KEY')`",
          "Direct indexing `os.environ['KEY']` handles fallbacks automatically",
          "Use `os.environ.get('KEY', default)`"
        ],
        "correctAnswer": "Use `os.environ.get('KEY', default)`",
        "explanation": "`os.environ.get(var, fallback)` gracefully returns the fallback if the variable is not set, preventing `KeyError`."
      },
      {
        "question": "What happens if an unhandled exception is passed into `logger.error('Failed', exc_info=True)`?",
        "options": [
          "The traceback is written to a separate `.trace` file",
          "The process terminates immediately",
          "The exception is re-raised",
          "The logger appends the full traceback to the log message"
        ],
        "correctAnswer": "The logger appends the full traceback to the log message",
        "explanation": "`exc_info=True` (or calling `logger.exception('...')`) formats and attaches the active exception's stack trace to the log record."
      }
    ]
  }
];
