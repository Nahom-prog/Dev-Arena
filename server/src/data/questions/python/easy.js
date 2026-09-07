export const pythonEasyChallenges = [
  {
    "title": "Python: Variables, Dynamic Typing & Type Hints",
    "description": "Variable reassignment, dynamically typed references, basic type annotations, and isinstance checks.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "What does the `type()` function return for the variable `x` after reassigning it?",
        "codeSnippet": "x = 42\nx = 'hello'\nprint(type(x))",
        "language": "python",
        "options": [
          "<class 'str'>",
          "<class 'int'>",
          "<class 'dynamic'>",
          "TypeError: Cannot reassign int to str"
        ],
        "correctAnswer": "<class 'str'>",
        "explanation": "Python is dynamically typed. Variables are names bound to objects in memory; reassigning `x` points the name to a string object."
      },
      {
        "question": "In Python 3, what effect do type hints have on runtime execution without external linters like mypy?",
        "codeSnippet": "def greet(name: str) -> str:\n    return f'Hello, {name}'\n\nprint(greet(123))",
        "language": "python",
        "options": [
          "Python ignores type hints at runtime and executes successfully, returning 'Hello, 123'",
          "It raises a TypeError at runtime because 123 is not a string",
          "It automatically converts 123 to '123' before entering the function",
          "It fails during the bytecode compilation phase"
        ],
        "correctAnswer": "Python ignores type hints at runtime and executes successfully, returning 'Hello, 123'",
        "explanation": "Type annotations in Python are informational metadata stored in `__annotations__`. Python does not enforce types at runtime by default."
      },
      {
        "question": "Why is `isinstance(True, int)` evaluated as `True` in Python?",
        "codeSnippet": "print(isinstance(True, int))\nprint(issubclass(bool, int))",
        "language": "python",
        "options": [
          "Because `bool` is a direct subclass of `int` in Python (with values 1 and 0)",
          "Because Python implicitly casts all comparisons to integers",
          "It is a known runtime bug in CPython 3.12",
          "Because True is stored as a 32-bit float"
        ],
        "correctAnswer": "Because `bool` is a direct subclass of `int` in Python (with values 1 and 0)",
        "explanation": "In Python, `bool` inherits from `int`. `True` and `False` behave as `1` and `0` in arithmetic operations."
      },
      {
        "question": "What is the output of multiple variable assignment and unpacking here?",
        "codeSnippet": "a, b = 10, 20\na, b = b, a\nprint(a, b)",
        "language": "python",
        "options": [
          "20 10",
          "10 20",
          "20 20",
          "SyntaxError: Tuple swapping requires a temp variable"
        ],
        "correctAnswer": "20 10",
        "explanation": "Python evaluates the right side as a tuple `(b, a)` before unpacking into `a` and `b`, achieving a clean swap without a temporary variable."
      },
      {
        "question": "What is the recommended check for testing if a variable is explicitly `None`?",
        "codeSnippet": "val = None\n# Which comparison is standard?",
        "language": "python",
        "options": [
          "`if val is None:` (identity comparison)",
          "`if val == None:` (equality comparison)",
          "`if val.is_none():`",
          "`if None in val:`"
        ],
        "correctAnswer": "`if val is None:` (identity comparison)",
        "explanation": "PEP 8 specifies using `is` or `is not` when comparing against singleton objects like `None` because it checks memory identity rather than invoking `__eq__`."
      }
    ]
  },
  {
    "title": "Python: Strings, Formatting & Slicing Nuances",
    "description": "f-strings, string immutability, stride slicing, and encoding.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "What does string slicing with negative stride `[::-1]` produce?",
        "codeSnippet": "text = 'DevArena'\nprint(text[::-1])",
        "language": "python",
        "options": [
          "'anerAveD' (reverses the string)",
          "'DevArena'",
          "'a'",
          "IndexError: Negative stride out of bounds"
        ],
        "correctAnswer": "'anerAveD' (reverses the string)",
        "explanation": "`[start:stop:step]` with a step of `-1` and omitted start/stop steps through the sequence in reverse order."
      },
      {
        "question": "Why will the following code raise a `TypeError`?",
        "codeSnippet": "s = 'Python'\ns[0] = 'J'",
        "language": "python",
        "options": [
          "Strings are immutable sequences in Python; individual characters cannot be reassigned in-place",
          "Strings can only be modified with `.replace()`",
          "Single quotes do not support item assignment; double quotes are required",
          "The index 0 is reserved for string length"
        ],
        "correctAnswer": "Strings are immutable sequences in Python; individual characters cannot be reassigned in-place",
        "explanation": "Python strings cannot be modified in-place. Any transformation requires creating a new string."
      },
      {
        "question": "What does the f-string debug specifier `=` print?",
        "codeSnippet": "score = 98\nprint(f'{score=}')",
        "language": "python",
        "options": [
          "score=98",
          "98",
          "score == 98",
          "'score': 98"
        ],
        "correctAnswer": "score=98",
        "explanation": "Introduced in Python 3.8, `{expr=}` inside an f-string evaluates and displays the expression text followed by its evaluated value."
      },
      {
        "question": "What does `str.strip()` remove by default when called without arguments?",
        "codeSnippet": "msg = '  \\n\\tWelcome Arena! \\r ' \nprint(msg.strip())",
        "language": "python",
        "options": [
          "All leading and trailing whitespace characters (spaces, tabs, newlines, carriage returns)",
          "Only ASCII space characters (' ')",
          "All punctuation marks and trailing numbers",
          "Whitespace everywhere inside the string including between words"
        ],
        "correctAnswer": "All leading and trailing whitespace characters (spaces, tabs, newlines, carriage returns)",
        "explanation": "`strip()` strips all leading and trailing whitespace characters according to the Unicode standard."
      },
      {
        "question": "What is the return type of `'arena'.encode('utf-8')`?",
        "codeSnippet": "encoded = 'arena'.encode('utf-8')\nprint(type(encoded))",
        "language": "python",
        "options": [
          "<class 'bytes'>",
          "<class 'str'>",
          "<class 'bytearray'>",
          "<class 'memoryview'>"
        ],
        "correctAnswer": "<class 'bytes'>",
        "explanation": "Encoding a string converts text characters into a sequence of raw bytes (`bytes` object)."
      }
    ]
  },
  {
    "title": "Python: Lists, Tuples & Immutability Essentials",
    "description": "Append vs extend, tuple immutability, list sorting, and memory allocation.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "What is the difference between `list.append(x)` and `list.extend(x)` when `x = [1, 2]`?",
        "codeSnippet": "a = [0]\na.append([1, 2])\n\nb = [0]\nb.extend([1, 2])",
        "language": "python",
        "options": [
          "`a` becomes `[0, [1, 2]]` (nested list), while `b` becomes `[0, 1, 2]` (unpacked elements)",
          "`a` and `b` produce identical results",
          "`append` converts elements to strings",
          "`extend` returns a new list without modifying `b` in-place"
        ],
        "correctAnswer": "`a` becomes `[0, [1, 2]]` (nested list), while `b` becomes `[0, 1, 2]` (unpacked elements)",
        "explanation": "`append` inserts the object as a single element. `extend` iterates over the argument and appends each element individually."
      },
      {
        "question": "Can a tuple contain mutable objects such as lists, and can those lists be modified?",
        "codeSnippet": "t = (1, 2, [3, 4])\nt[2].append(5)\nprint(t)",
        "language": "python",
        "options": [
          "Yes, the tuple structure is immutable, but mutable elements inside it can still be modified: `(1, 2, [3, 4, 5])`",
          "No, modifying a list inside a tuple raises a TypeError immediately",
          "Tuples convert all nested lists to tuples automatically",
          "Yes, but it creates a copy of the tuple with the updated list"
        ],
        "correctAnswer": "Yes, the tuple structure is immutable, but mutable elements inside it can still be modified: `(1, 2, [3, 4, 5])`",
        "explanation": "A tuple's references are fixed and immutable, but the objects referenced can themselves be mutable."
      },
      {
        "question": "What is the difference between `list.sort()` and the built-in `sorted(list)` function?",
        "options": [
          "`list.sort()` sorts the list in-place and returns `None`; `sorted()` returns a new sorted list",
          "`sorted()` only works on tuples; `list.sort()` works on lists",
          "`list.sort()` is O(n^2); `sorted()` is O(n log n)",
          "Both return a new copy of the sorted list"
        ],
        "correctAnswer": "`list.sort()` sorts the list in-place and returns `None`; `sorted()` returns a new sorted list",
        "explanation": "`.sort()` mutates the original list in-place for efficiency and returns `None`. `sorted()` creates and returns a new list."
      },
      {
        "question": "What does list multiplying `[0] * 4` produce vs `[[0]] * 4`?",
        "codeSnippet": "matrix = [[0]] * 3\nmatrix[0].append(1)\nprint(matrix)",
        "language": "python",
        "options": [
          "[[0, 1], [0], [0]] because each element is an isolated copy",
          "[[0, 1], [0, 1], [0, 1]] because multiplying copies the inner list's reference 3 times",
          "IndexError: Cannot multiply nested lists",
          "[[1], [0], [0]]"
        ],
        "correctAnswer": "[[0, 1], [0, 1], [0, 1]] because multiplying copies the inner list's reference 3 times",
        "explanation": "Multiplying a list containing a mutable object replicates the same object reference, not deep clones."
      },
      {
        "question": "How do you create a single-element tuple in Python?",
        "codeSnippet": "x = (42)\ny = (42,)\nprint(type(x), type(y))",
        "language": "python",
        "options": [
          "<class 'tuple'> <class 'tuple'>",
          "<class 'int'> <class 'tuple'> (the trailing comma defines the tuple)",
          "<class 'int'> <class 'int'>",
          "SyntaxError on line 2"
        ],
        "correctAnswer": "<class 'int'> <class 'tuple'> (the trailing comma defines the tuple)",
        "explanation": "Parentheses alone indicate grouping in expressions; a comma is required to tell Python it is a single-element tuple."
      }
    ]
  },
  {
    "title": "Python: Dictionaries, Sets & Hashability",
    "description": "Key uniqueness, dict comprehension, hashable types, and set operations.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "Why can a list NOT be used as a dictionary key or set element in Python?",
        "codeSnippet": "d = {}\nd[[1, 2]] = 'val'",
        "language": "python",
        "options": [
          "Because dictionary keys must be strings or ints only",
          "TypeError: unhashable type: 'list' (mutable types do not implement a stable `__hash__`)",
          "Because lists cannot be compared with `==`",
          "MemoryError: Lists exceed the 8-byte key limit"
        ],
        "correctAnswer": "TypeError: unhashable type: 'list' (mutable types do not implement a stable `__hash__`)",
        "explanation": "Dictionary keys and set items must be hashable and immutable so their hash code does not change over time."
      },
      {
        "question": "What does the dictionary union operator `|` (Python 3.9+) do?",
        "codeSnippet": "d1 = {'a': 1, 'b': 2}\nd2 = {'b': 99, 'c': 3}\nprint(d1 | d2)",
        "language": "python",
        "options": [
          "{'a': 1, 'b': 2, 'c': 3}",
          "{'a': 1, 'b': 99, 'c': 3} (merges dictionaries, with right-hand values taking precedence on collision)",
          "TypeError: Unsupported operand for dict",
          "{'b': 99}"
        ],
        "correctAnswer": "{'a': 1, 'b': 99, 'c': 3} (merges dictionaries, with right-hand values taking precedence on collision)",
        "explanation": "PEP 584 added `|` for dict merging, where the right operand overrides overlapping keys from the left."
      },
      {
        "question": "What is the result of set intersection `set_a & set_b`?",
        "codeSnippet": "a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a & b)",
        "language": "python",
        "options": [
          "{1, 2, 3, 4, 5, 6}",
          "{3, 4}",
          "{1, 2}",
          "{5, 6}"
        ],
        "correctAnswer": "{3, 4}",
        "explanation": "The `&` operator computes set intersection, returning elements present in both sets."
      },
      {
        "question": "What does `dict.setdefault(key, default)` return if `key` is already present in the dictionary?",
        "codeSnippet": "scores = {'Alex': 100}\nval = scores.setdefault('Alex', 50)\nprint(val, scores['Alex'])",
        "language": "python",
        "options": [
          "50 50",
          "100 100",
          "100 50",
          "50 100"
        ],
        "correctAnswer": "100 100",
        "explanation": "If the key exists, `setdefault` returns the existing value without modifying the dictionary."
      },
      {
        "question": "Since Python 3.7, how are dictionary keys ordered during iteration?",
        "options": [
          "Sorted by hash value",
          "Insertion order is guaranteed by the language specification",
          "Sorted alphabetically",
          "Arbitrary order that changes between runs"
        ],
        "correctAnswer": "Insertion order is guaranteed by the language specification",
        "explanation": "Starting in Python 3.7, dictionaries maintain insertion order as part of the official Python language spec."
      }
    ]
  },
  {
    "title": "Python: Control Flow, Loops & Comprehensions",
    "description": "for/else loops, break vs continue, zip and enumerate, and filtered comprehensions.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "When does the `else` clause of a Python `for` loop execute?",
        "codeSnippet": "for x in range(3):\n    if x == 10:\n        break\nelse:\n    print('Completed')",
        "language": "python",
        "options": [
          "Only when the iterable is completely empty at the start",
          "When the loop finishes iterating naturally without encountering a `break`",
          "Every time an iteration completes",
          "When an unhandled exception is thrown inside the loop"
        ],
        "correctAnswer": "When the loop finishes iterating naturally without encountering a `break`",
        "explanation": "The `else` block attached to a `for` or `while` loop runs only when the loop completes without hitting a `break` statement."
      },
      {
        "question": "What does `enumerate(items, start=1)` yield in each iteration?",
        "codeSnippet": "items = ['a', 'b']\nfor idx, val in enumerate(items, start=1):\n    print(idx, val)",
        "language": "python",
        "options": [
          "(0, 'a'), then (1, 'b')",
          "(1, 'a'), then (2, 'b')",
          "('a', 1), then ('b', 2)",
          "An error because start must be 0"
        ],
        "correctAnswer": "(1, 'a'), then (2, 'b')",
        "explanation": "`enumerate(iterable, start)` yields tuples containing a counter starting at `start` and the corresponding item."
      },
      {
        "question": "What does `zip()` do when two input iterables have different lengths by default in Python 3?",
        "codeSnippet": "names = ['Alice', 'Bob', 'Charlie']\nscores = [90, 85]\nprint(list(zip(names, scores)))",
        "language": "python",
        "options": [
          "Raises a ValueError for mismatched lengths unless `strict=True` is passed",
          "[('Alice', 90), ('Bob', 85)] (stops at the shortest iterable)",
          "Fills missing values with None: [('Alice', 90), ('Bob', 85), ('Charlie', None)]",
          "Loops the shorter list to match the longer one"
        ],
        "correctAnswer": "[('Alice', 90), ('Bob', 85)] (stops at the shortest iterable)",
        "explanation": "By default, `zip()` terminates when the shortest input iterable is exhausted. (Python 3.10 introduced `strict=True` to raise an error if lengths differ)."
      },
      {
        "question": "What does the following dictionary comprehension create?",
        "codeSnippet": "keys = ['a', 'b', 'c']\nd = {k: i for i, k in enumerate(keys)}\nprint(d)",
        "language": "python",
        "options": [
          "{0: 'a', 1: 'b', 2: 'c'}",
          "{'a': 0, 'b': 1, 'c': 2}",
          "['a', 'b', 'c']",
          "{'a': 1, 'b': 2, 'c': 3}"
        ],
        "correctAnswer": "{'a': 0, 'b': 1, 'c': 2}",
        "explanation": "The comprehension maps each key `k` to its 0-indexed position `i` from `enumerate`."
      },
      {
        "question": "What does the `pass` statement do in a Python block?",
        "options": [
          "It passes execution to the next function in the call stack",
          "It is a null operation syntactic placeholder that does nothing when executed",
          "It breaks out of the innermost loop",
          "It skips the remaining lines of the current iteration like `continue`"
        ],
        "correctAnswer": "It is a null operation syntactic placeholder that does nothing when executed",
        "explanation": "`pass` is a no-op placeholder required when Python syntax expects a statement block (such as in an empty function or class)."
      }
    ]
  },
  {
    "title": "Python: Functions, *args, **kwargs & Scoping",
    "description": "Positional-only arguments, keyword arguments, LEGB scope resolution, and closures.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "In Python parameter definitions, what do `*args` and `**kwargs` capture?",
        "codeSnippet": "def record(*args, **kwargs):\n    pass",
        "language": "python",
        "options": [
          "`args` captures lists; `kwargs` captures sets",
          "`args` captures extra positional arguments as a tuple; `kwargs` captures extra keyword arguments as a dict",
          "Both capture dictionaries of passed variables",
          "`args` is mandatory; `kwargs` cannot be empty"
        ],
        "correctAnswer": "`args` captures extra positional arguments as a tuple; `kwargs` captures extra keyword arguments as a dict",
        "explanation": "`*args` collects arbitrary positional arguments into a `tuple`, while `**kwargs` collects arbitrary keyword arguments into a `dict`."
      },
      {
        "question": "What order of namespaces does Python use to resolve variable names (the LEGB rule)?",
        "options": [
          "Local -> Global -> Built-in -> Enclosing",
          "Global -> Local -> Enclosing -> Built-in",
          "Local -> Enclosing -> Global -> Built-in",
          "Built-in -> Global -> Enclosing -> Local"
        ],
        "correctAnswer": "Local -> Enclosing -> Global -> Built-in",
        "explanation": "Python searches namespaces in order: Local function scope first, then any Enclosing functions (closure), then Module Global, then Python Built-in."
      },
      {
        "question": "What does the `global` keyword declare inside a function?",
        "codeSnippet": "count = 0\ndef increment():\n    global count\n    count += 1",
        "language": "python",
        "options": [
          "Locks `count` across all active threads",
          "Exports `count` to the operating system environment variables",
          "Indicates that `count` refers to the module-level global variable, allowing reassignment inside the function",
          "Converts `count` into an immutable constant"
        ],
        "correctAnswer": "Indicates that `count` refers to the module-level global variable, allowing reassignment inside the function",
        "explanation": "Without `global count`, assigning `count += 1` inside a function raises `UnboundLocalError` because Python treats any local assignment as creating a local variable."
      },
      {
        "question": "What does the `/` separator signify in Python 3.8+ function signatures?",
        "codeSnippet": "def calculate(x, y, /, z):\n    return x + y + z",
        "language": "python",
        "options": [
          "Division is automatically performed between `x` and `y`",
          "`x` and `y` must be floating-point numbers",
          "Arguments before `/` (`x` and `y`) must be specified positionally only and cannot be passed as keywords",
          "`z` is an optional keyword-only argument"
        ],
        "correctAnswer": "Arguments before `/` (`x` and `y`) must be specified positionally only and cannot be passed as keywords",
        "explanation": "PEP 570 introduced `/` to declare positional-only parameters. Calling `calculate(x=1, y=2, z=3)` raises a `TypeError`."
      },
      {
        "question": "What does a lambda expression return in Python?",
        "codeSnippet": "sq = lambda x: x ** 2\nprint(sq(5))",
        "language": "python",
        "options": [
          "None, unless `return` is explicitly typed inside the lambda",
          "A generator yielding 25",
          "The evaluated result of its single expression (25)",
          "A string representation of the expression"
        ],
        "correctAnswer": "The evaluated result of its single expression (25)",
        "explanation": "A Python lambda is an anonymous inline function that automatically evaluates and returns the value of its single expression."
      }
    ]
  },
  {
    "title": "Python: Mutable Default Arguments Gotcha",
    "description": "Function definition-time evaluation, persistent state gotchas, and idiomatic None defaults.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "Why does the list persist between calls in the following function?",
        "codeSnippet": "def append_to(element, target=[]):\n    target.append(element)\n    return target\n\nprint(append_to(1))\nprint(append_to(2))",
        "language": "python",
        "options": [
          "TypeError: Mutable defaults are forbidden in Python 3.10+",
          "[1], then [2] because defaults are re-instantiated on each invocation",
          "[1], then [1, 2] because default argument expressions are evaluated once when the function is defined, not per call",
          "[1], then [1] (read-only default list)"
        ],
        "correctAnswer": "[1], then [1, 2] because default argument expressions are evaluated once when the function is defined, not per call",
        "explanation": "Python creates default argument objects at function definition time. Every invocation that omits `target` shares the exact same list instance."
      },
      {
        "question": "What is the idiomatic Python pattern to avoid the mutable default argument trap?",
        "codeSnippet": "def append_to(element, target=None):\n    if target is None:\n        target = []\n    target.append(element)\n    return target",
        "language": "python",
        "options": [
          "Decorate the function with `@immutable_defaults`",
          "Use `target=list()` in the signature",
          "Use `target=None` as the default and initialize a fresh list inside the function body if `None`",
          "Pass `target=copy.deepcopy([])` in the parameter list"
        ],
        "correctAnswer": "Use `target=None` as the default and initialize a fresh list inside the function body if `None`",
        "explanation": "Using `None` as a sentinel default value ensures a new list is constructed on every call where an explicit list was not provided."
      },
      {
        "question": "Does the same persistence gotcha apply to default dictionary arguments `cache={}`?",
        "options": [
          "No, dictionaries reset automatically on function exit",
          "No, dictionaries are immutable by default in Python",
          "Yes, dictionaries are mutable, so `cache={}` is shared across all function calls",
          "Only if the dictionary keys are integers"
        ],
        "correctAnswer": "Yes, dictionaries are mutable, so `cache={}` is shared across all function calls",
        "explanation": "Any mutable object (lists, dictionaries, sets, custom instances) used as a default argument will retain mutations across calls."
      },
      {
        "question": "Where in the function object does Python store the evaluated default arguments?",
        "codeSnippet": "def greet(name, suffix='!'): pass\nprint(greet.__defaults__)",
        "language": "python",
        "options": [
          "In the global `globals()` namespace",
          "In the `sys.modules` dictionary",
          "In the `__defaults__` attribute tuple on the function object",
          "In the thread-local storage stack"
        ],
        "correctAnswer": "In the `__defaults__` attribute tuple on the function object",
        "explanation": "Positional default argument values are stored in a tuple referenced by the function's `__defaults__` attribute."
      },
      {
        "question": "What happens if a caller explicitly passes a list into `append_to('a', my_list)`?",
        "options": [
          "It overwrites the default argument with `my_list` permanently for future calls",
          "It raises a TypeError because default parameters cannot be overridden",
          "It modifies and appends to `my_list`, leaving the default argument unaffected",
          "It ignores `my_list` and uses the default list"
        ],
        "correctAnswer": "It modifies and appends to `my_list`, leaving the default argument unaffected",
        "explanation": "When an argument is explicitly supplied, Python binds the parameter to the passed object and never touches `__defaults__`."
      }
    ]
  },
  {
    "title": "Python: Basic File I/O & Context Managers",
    "description": "with open statements, file modes (r, w, a), buffering, and safe cleanup.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "Why is `with open('log.txt', 'w') as f:` preferred over manual `f.open()` and `f.close()`?",
        "options": [
          "`with` encrypts the file on disk",
          "`with` opens the file in a separate operating system thread",
          "The `with` statement guarantees the file descriptor is closed automatically, even if an exception occurs",
          "Manual `f.close()` is deprecated in Python 3"
        ],
        "correctAnswer": "The `with` statement guarantees the file descriptor is closed automatically, even if an exception occurs",
        "explanation": "Context managers (`with`) invoke `__enter__` on entry and `__exit__` on exit, guaranteeing resource cleanup even during unhandled exceptions."
      },
      {
        "question": "What is the difference between file mode `'w'` and `'a'`?",
        "options": [
          "`'w'` can only write text; `'a'` is for binary data",
          "`'w'` is for write-only; `'a'` is for async writing",
          "`'w'` truncates/overwrites existing file contents; `'a'` appends new data to the end of the file",
          "There is no difference; they are aliases"
        ],
        "correctAnswer": "`'w'` truncates/overwrites existing file contents; `'a'` appends new data to the end of the file",
        "explanation": "`'w'` wipes the file before writing, whereas `'a'` places the file pointer at the end of the file for appending."
      },
      {
        "question": "How do you read a text file line-by-line without loading the entire multi-gigabyte file into RAM?",
        "codeSnippet": "with open('large.log') as f:\n    for line in f:\n        process(line)",
        "language": "python",
        "options": [
          "Call `f.read().splitlines()`",
          "Call `f.readlines()`",
          "Iterating directly over the file object `for line in f:` uses an internal buffer and generator stream",
          "It is impossible; Python always reads entire files into memory"
        ],
        "correctAnswer": "Iterating directly over the file object `for line in f:` uses an internal buffer and generator stream",
        "explanation": "The file object is an iterator. Iterating directly over `f` yields one line at a time on demand with minimal memory footprint."
      },
      {
        "question": "Why should `encoding='utf-8'` be explicitly specified when opening text files in Python?",
        "codeSnippet": "with open('data.txt', 'r', encoding='utf-8') as f:\n    content = f.read()",
        "language": "python",
        "options": [
          "It prevents the file from being locked by antivirus software",
          "Python cannot read ASCII files without UTF-8 specified",
          "It speeds up file reading by 10x",
          "Otherwise Python falls back to platform-dependent defaults (e.g. Windows-1252 or Latin-1), risking decoding errors across OSes"
        ],
        "correctAnswer": "Otherwise Python falls back to platform-dependent defaults (e.g. Windows-1252 or Latin-1), risking decoding errors across OSes",
        "explanation": "Omitting `encoding` causes `open()` to use `locale.getpreferredencoding()`, which varies between Linux (UTF-8) and Windows (cp1252)."
      },
      {
        "question": "Which method moves the file pointer to the beginning of the file?",
        "options": [
          "f.tell(0)",
          "f.rewind()",
          "f.reset()",
          "f.seek(0)"
        ],
        "correctAnswer": "f.seek(0)",
        "explanation": "`f.seek(offset)` repositions the read/write pointer in the stream. `seek(0)` returns to byte 0 (the start of the file)."
      }
    ]
  },
  {
    "title": "Python: Common Built-in Functions & Methods",
    "description": "any/all, map/filter, len, sum, min/max with key functions, and isinstance.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "What does `any([False, 0, '', []])` return?",
        "codeSnippet": "items = [False, 0, '', []]\nprint(any(items))",
        "language": "python",
        "options": [
          "TypeError: Cannot test falsiness on lists",
          "True",
          "None",
          "False (all elements are falsy in boolean context)"
        ],
        "correctAnswer": "False (all elements are falsy in boolean context)",
        "explanation": "`any()` returns `True` if at least one element is truthy. Because all items here evaluate to `False`, it returns `False`."
      },
      {
        "question": "How do you find the longest word in a list using `max()` with a key function?",
        "codeSnippet": "words = ['apple', 'watermelon', 'fig']\nlongest = max(words, key=len)\nprint(longest)",
        "language": "python",
        "options": [
          "'fig'",
          "'apple'",
          "10",
          "'watermelon'"
        ],
        "correctAnswer": "'watermelon'",
        "explanation": "Passing `key=len` instructs `max()` to evaluate each element by its length rather than lexicographical alphabetical order."
      },
      {
        "question": "What is returned by `map(func, iterable)` in Python 3?",
        "options": [
          "A dictionary mapping inputs to outputs",
          "A list containing all transformed elements immediately",
          "A tuple of results",
          "An iterator that yields transformed items lazily on demand"
        ],
        "correctAnswer": "An iterator that yields transformed items lazily on demand",
        "explanation": "In Python 3, `map()` returns a lazy iterator (unlike Python 2 which returned a list)."
      },
      {
        "question": "What does `all([])` evaluate to on an empty list?",
        "codeSnippet": "print(all([]))",
        "language": "python",
        "options": [
          "ValueError: Empty iterable",
          "False",
          "None",
          "True (vacuous truth: no element is False)"
        ],
        "correctAnswer": "True (vacuous truth: no element is False)",
        "explanation": "`all()` returns `True` if every element is truthy. For an empty iterable, because there are no falsy elements, it vacuously returns `True`."
      },
      {
        "question": "What does the `sum()` function accept as its optional second argument?",
        "codeSnippet": "numbers = [1, 2, 3]\nprint(sum(numbers, 10))",
        "language": "python",
        "options": [
          "TypeError: sum only takes 1 argument",
          "6",
          "10",
          "16 (the start value added to the sum of the iterable)"
        ],
        "correctAnswer": "16 (the start value added to the sum of the iterable)",
        "explanation": "`sum(iterable, start=0)` begins accumulation from `start`. Here, `10 + 1 + 2 + 3 = 16`."
      }
    ]
  },
  {
    "title": "Python: Exception Handling with try/except/finally",
    "description": "Catching exceptions, exception hierarchies, raising exceptions, and the else clause.",
    "timeLimitMinutes": 10,
    "tags": [
      "Python",
      "Backend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "When does the `else` block execute in a `try/except/else/finally` construct?",
        "codeSnippet": "try:\n    x = 10 / 2\nexcept ZeroDivisionError:\n    print('Error')\nelse:\n    print('Success')\nfinally:\n    print('Done')",
        "language": "python",
        "options": [
          "Only if the `except` block re-raises the error",
          "Whenever an exception is caught and handled",
          "It executes right before `finally` regardless of exceptions",
          "Only when no exceptions were raised inside the `try` block"
        ],
        "correctAnswer": "Only when no exceptions were raised inside the `try` block",
        "explanation": "The `else` clause runs strictly if the `try` block completes successfully without raising any exceptions."
      },
      {
        "question": "Why is bare `except:` generally considered an anti-pattern in Python?",
        "codeSnippet": "try:\n    run_server()\nexcept:\n    pass",
        "language": "python",
        "options": [
          "It restarts the computer operating system",
          "It is deprecated and produces a SyntaxError in Python 3.11+",
          "It causes memory leaks in the garbage collector",
          "It catches `BaseException`, intercepting `KeyboardInterrupt` (Ctrl+C) and `SystemExit`, preventing the program from terminating cleanly"
        ],
        "correctAnswer": "It catches `BaseException`, intercepting `KeyboardInterrupt` (Ctrl+C) and `SystemExit`, preventing the program from terminating cleanly",
        "explanation": "A bare `except:` catches `BaseException`, silencing critical signals like `KeyboardInterrupt`. Idiomatic code catches `Exception` or specific subclasses."
      },
      {
        "question": "What happens if an exception is raised inside the `try` block and the `finally` block executes a `return`?",
        "codeSnippet": "def test():\n    try:\n        raise ValueError('Something failed')\n    finally:\n        return 'Recovered'\n\nprint(test())",
        "language": "python",
        "options": [
          "SyntaxError: return not allowed inside finally",
          "The ValueError is printed to stdout followed by 'Recovered'",
          "The program crashes with an unhandled ValueError",
          "'Recovered' (the `finally` return statement suppresses and discards the active exception)"
        ],
        "correctAnswer": "'Recovered' (the `finally` return statement suppresses and discards the active exception)",
        "explanation": "A `return` or `break` statement inside a `finally` block discards any active exception that was being propagated."
      },
      {
        "question": "How do you chain exceptions in Python 3 using the `from` keyword?",
        "codeSnippet": "try:\n    fetch_data()\nexcept ConnectionError as err:\n    raise ServiceError('API down') from err",
        "language": "python",
        "options": [
          "Reruns `fetch_data()` up to 3 times",
          "Replaces `err` with `ServiceError` and discards the original traceback",
          "Executes `ServiceError` on the background thread that threw `err`",
          "Sets `__cause__` on `ServiceError`, creating an explicit traceback chain indicating this error was caused by `err`"
        ],
        "correctAnswer": "Sets `__cause__` on `ServiceError`, creating an explicit traceback chain indicating this error was caused by `err`",
        "explanation": "`raise ... from err` explicitly links the new exception to the original cause in the traceback (`The above exception was the direct cause of the following exception`)."
      },
      {
        "question": "What is the base class that all standard non-system-exiting exceptions should inherit from?",
        "options": [
          "SystemError",
          "BaseException",
          "StandardError",
          "Exception"
        ],
        "correctAnswer": "Exception",
        "explanation": "Custom application exceptions should subclass `Exception` (which inherits from `BaseException`), allowing system-level exceptions to bypass application handlers."
      }
    ]
  }
];
