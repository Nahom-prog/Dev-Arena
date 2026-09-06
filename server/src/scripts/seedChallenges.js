import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";

const CHALLENGES = [
  {
    title: "TypeScript Generics & Type Systems",
    description: "Union narrowing, utility types, keyof patterns, exhaustive checks, and conditional inference.",
    difficulty: "mid",
    tags: ["TypeScript", "Frontend"],
    timeLimitMinutes: 12,
    questions: [
      {
        question: "In TypeScript, how does the compiler narrow the union type inside the `if` block?",
        codeSnippet: 'function printId(id: string | number) {\n  if (typeof id === "string") {\n    console.log(id.toUpperCase());\n  } else {\n    console.log(id.toFixed(2));\n  }\n}',
        language: "typescript",
        options: [
          "Control Flow Analysis via `typeof` type guard narrows `id` to `string` in the first branch",
          "Runtime dynamic casting automatically converts the number to string",
          "TypeScript throws a compile-time error because `.toUpperCase()` is unsafe",
          "The `any` fallback type is assigned automatically",
        ],
        correctAnswer: "Control Flow Analysis via `typeof` type guard narrows `id` to `string` in the first branch",
        explanation: "TypeScript inspects JavaScript runtime checks like `typeof`, `instanceof`, and truthiness checks to narrow union types down to more specific types within conditional code blocks.",
      },
      {
        question: "What is the resulting type of `UserProfile` when using the `Pick` and `Partial` utility types?",
        codeSnippet: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  age: number;\n}\n\ntype UserProfile = Partial<Pick<User, "name" | "email">>;',
        language: "typescript",
        options: [
          "{ name?: string; email?: string; }",
          "{ id?: string; age?: number; }",
          "{ name: string; email: string; }",
          "string | undefined",
        ],
        correctAnswer: "{ name?: string; email?: string; }",
        explanation: "`Pick<User, 'name' | 'email'>` extracts only the `name` and `email` properties. Wrapping that in `Partial<...>` makes each picked property optional (`?`).",
      },
      {
        question: "What does the `keyof typeof` pattern produce when applied to a constant configuration object?",
        codeSnippet: 'const THEME_COLORS = {\n  primary: "#10b981",\n  secondary: "#6366f1",\n  accent: "#c8ff37",\n} as const;\n\ntype ThemeKey = keyof typeof THEME_COLORS;',
        language: "typescript",
        options: [
          '"primary" | "secondary" | "accent"',
          'string',
          '"#10b981" | "#6366f1" | "#c8ff37"',
          'Record<string, string>',
        ],
        correctAnswer: '"primary" | "secondary" | "accent"',
        explanation: "`typeof THEME_COLORS` retrieves the TypeScript type of the object, and `keyof` extracts a union of its string literal keys: `'primary' | 'secondary' | 'accent'`.",
      },
      {
        question: "Why is the `never` type useful in the `default` case of an exhaustive switch statement?",
        codeSnippet: 'type Action = { type: "LOGIN" } | { type: "LOGOUT" };\n\nfunction handle(action: Action) {\n  switch (action.type) {\n    case "LOGIN": return "User logged in";\n    case "LOGOUT": return "User logged out";\n    default:\n      const _exhaustive: never = action;\n      return _exhaustive;\n  }\n}',
        language: "typescript",
        options: [
          "It forces a compile error if a new variant is added to `Action` but not handled in the switch",
          "It allows the switch statement to execute asynchronously",
          "It converts the action payload into a JSON string at runtime",
          "It suppresses any runtime errors in production builds",
        ],
        correctAnswer: "It forces a compile error if a new variant is added to `Action` but not handled in the switch",
        explanation: "Since all members of `Action` are handled, `action` in the `default` block has type `never`. If someone later adds `{ type: 'REFRESH' }` to `Action`, assigning it to `_exhaustive: never` triggers a compile-time type mismatch.",
      },
      {
        question: "In advanced TypeScript conditional types, what does the `infer` keyword do in the snippet below?",
        codeSnippet: 'type Flatten<T> = T extends Array<infer Item> ? Item : T;\n\ntype Extracted = Flatten<string[]>;',
        language: "typescript",
        options: [
          "It introduces a type variable (`Item`) to be deduced dynamically from the type being checked, resolving to `string`",
          "It imports the `Item` interface from the global namespace",
          "It casts the array into an iterable generator function",
          "It returns `any` whenever `T` is an array",
        ],
        correctAnswer: "It introduces a type variable (`Item`) to be deduced dynamically from the type being checked, resolving to `string`",
        explanation: "The `infer` keyword in conditional types allows you to declare a type variable within the `extends` clause to extract internal types (e.g. array element types or promise resolution types).",
      },
    ],
  },
  {
    title: "JavaScript Core & Web Essentials",
    description: "Scoping, coercion, array operations, closure encapsulation, and event loop microtasks.",
    difficulty: "easy",
    tags: ["JavaScript", "Frontend"],
    timeLimitMinutes: 10,
    questions: [
      {
        question: "What is the return value of `typeof null` versus `typeof undefined` in JavaScript?",
        codeSnippet: 'console.log(typeof null, typeof undefined);',
        language: "javascript",
        options: [
          '"object", "undefined"',
          '"null", "undefined"',
          '"object", "object"',
          '"undefined", "undefined"',
        ],
        correctAnswer: '"object", "undefined"',
        explanation: '`typeof null` returning `"object"` is a famous legacy quirk from the original 1995 JS engine implementation where object tags shared type code 0. `typeof undefined` correctly yields `"undefined"`.',
      },
      {
        question: "What will the following code output to the console?",
        codeSnippet: 'const user = { name: "Nahom" };\nuser.name = "Alex";\nconsole.log(user.name);',
        language: "javascript",
        options: [
          '"Alex"',
          'TypeError: Assignment to constant variable',
          '"Nahom"',
          'undefined',
        ],
        correctAnswer: '"Alex"',
        explanation: "`const` prevents reassigning the variable identifier (`user = ...`), but does not freeze the object itself. Its properties can still be modified.",
      },
      {
        question: "What is the key functional difference between `.map()` and `.forEach()` on arrays?",
        codeSnippet: 'const nums = [1, 2, 3];\nconst a = nums.forEach(n => n * 2);\nconst b = nums.map(n => n * 2);',
        language: "javascript",
        options: [
          "`.map()` returns a new transformed array; `.forEach()` returns `undefined` and only runs side effects",
          "`.forEach()` mutates the original array in place; `.map()` does not",
          "`.map()` runs asynchronously, whereas `.forEach()` is strictly synchronous",
          "There is no difference; they are aliases",
        ],
        correctAnswer: "`.map()` returns a new transformed array; `.forEach()` returns `undefined` and only runs side effects",
        explanation: "`Array.prototype.map()` collects the returned values into a brand new array of the same length, while `.forEach()` executes the callback for each item and always returns `undefined`.",
      },
      {
        question: "What does the outer function demonstrate in the following pattern?",
        codeSnippet: 'function createCounter() {\n  let count = 0;\n  return function() {\n    count += 1;\n    return count;\n  };\n}\nconst counter = createCounter();\nconsole.log(counter(), counter());',
        language: "javascript",
        options: [
          "A Closure retaining access to lexical scope variable `count` across multiple calls",
          "Prototype inheritance chaining",
          "Event delegation bubbling",
          "Dynamic variable hoisting",
        ],
        correctAnswer: "A Closure retaining access to lexical scope variable `count` across multiple calls",
        explanation: "A closure is the combination of a function bundled together with references to its surrounding lexical state. The inner function maintains access to `count` even after `createCounter` finishes running.",
      },
      {
        question: "What is the exact order of numbers printed to the console in this asynchronous snippet?",
        codeSnippet: 'console.log("1");\nsetTimeout(() => console.log("2"), 0);\nPromise.resolve().then(() => console.log("3"));\nconsole.log("4");',
        language: "javascript",
        options: [
          '"1", "4", "3", "2"',
          '"1", "2", "3", "4"',
          '"1", "4", "2", "3"',
          '"1", "3", "4", "2"',
        ],
        correctAnswer: '"1", "4", "3", "2"',
        explanation: 'Synchronous code runs first ("1", "4"). Microtasks like `Promise.then` run immediately after the current call stack before any macrotasks ("3"). Macrotasks like `setTimeout` callbacks execute on the subsequent tick ("2").',
      },
    ],
  },
  {
    title: "React 19 & Component Architecture",
    description: "Functional state updates, useCallback memoization, reconciliation keys, and effect cleanups.",
    difficulty: "mid",
    tags: ["React", "Frontend"],
    timeLimitMinutes: 12,
    questions: [
      {
        question: "What will be logged when `handleClick` is triggered once in this React component?",
        codeSnippet: 'function Counter() {\n  const [count, setCount] = useState(0);\n\n  const handleClick = () => {\n    setCount(count + 1);\n    setCount(count + 1);\n    console.log(count);\n  };\n\n  return <button onClick={handleClick}>{count}</button>;\n}',
        language: "javascript",
        options: ["0", "1", "2", "undefined"],
        correctAnswer: "0",
        explanation: 'State updater calls do not mutate the `count` variable synchronously within the current render execution frame. In this tick, `count` remains `0`. To queue consecutive updates, use `setCount(prev => prev + 1)`.',
      },
      {
        question: "Why should you pass a callback function to `useCallback` when passing handlers to memoized child components?",
        codeSnippet: 'const handleSave = useCallback(() => {\n  api.saveUser(userId);\n}, [userId]);\n\nreturn <UserCard onSave={handleSave} />;',
        language: "javascript",
        options: [
          "It maintains a stable function reference across re-renders unless `userId` changes, preventing child re-renders",
          "It moves function execution off the main browser thread to a web worker",
          "It automatically prevents SQL injection attacks in forms",
          "It caches the return value of the function",
        ],
        correctAnswer: "It maintains a stable function reference across re-renders unless `userId` changes, preventing child re-renders",
        explanation: "By default, inline functions get a new reference on every render. `useCallback` keeps the function reference identical between renders if dependencies haven't changed.",
      },
      {
        question: "Why does React warn against using array indices as `key` props when list items can be reordered or filtered?",
        codeSnippet: '{todos.map((todo, index) => (\n  <TodoItem key={index} text={todo.text} />\n))}',
        language: "javascript",
        options: [
          "Reordering items causes React to match DOM nodes by index, leading to confused component state and input bugs",
          "Indices take twice as much memory as string IDs in the Virtual DOM",
          "Array indices cannot be read by screen readers",
          "React 19 throws a fatal syntax error when index keys are used",
        ],
        correctAnswer: "Reordering items causes React to match DOM nodes by index, leading to confused component state and input bugs",
        explanation: "Keys provide a persistent identity. If you insert or delete an item, index keys shift, causing React to mistakenly reuse previous DOM and state for the wrong items.",
      },
      {
        question: "When does the cleanup function in `useEffect` execute?",
        codeSnippet: 'useEffect(() => {\n  const timer = setInterval(tick, 1000);\n  return () => clearInterval(timer); // When does this run?\n}, [roomId]);',
        language: "javascript",
        options: [
          "Before the component unmounts and before re-running the effect when dependencies change",
          "Only when the user reloads or closes the browser tab",
          "Immediately after the initial DOM paint",
          "Synchronously during component render preparation",
        ],
        correctAnswer: "Before the component unmounts and before re-running the effect when dependencies change",
        explanation: "React runs the cleanup function before applying the effect on subsequent renders when dependencies change, and also when the component unmounts from the DOM.",
      },
      {
        question: "How does React 18+ automatic batching handle multiple state updates inside asynchronous callbacks like `fetch`?",
        codeSnippet: 'fetch("/api/user").then(() => {\n  setIsLoading(false);\n  setUser(data);\n  setLastFetched(Date.now());\n  // How many re-renders happen here?\n});',
        language: "javascript",
        options: [
          "Batches all three updates into a single re-render",
          "Triggers three separate re-renders sequentially",
          "Causes an infinite render loop unless wrapped in `flushSync`",
          "Delays updates until the next page navigation",
        ],
        correctAnswer: "Batches all three updates into a single re-render",
        explanation: "In React 18+, automatic batching combines all state updates inside promises, timeouts, and native event handlers into a single render pass for better performance.",
      },
    ],
  },
  {
    title: "Node.js & Backend Architecture",
    description: "Express middleware, HTTP status semantics, JWT authentication, and event loop error handling.",
    difficulty: "mid",
    tags: ["Node.js", "Backend"],
    timeLimitMinutes: 12,
    questions: [
      {
        question: "Which HTTP status code should a RESTful API respond with when a resource is successfully created?",
        options: ["201 Created", "200 OK", "204 No Content", "202 Accepted"],
        correctAnswer: "201 Created",
        explanation: "`201 Created` indicates that the request succeeded and resulted in the creation of a new resource (typically accompanied by a `Location` header or the created entity in the response body).",
      },
      {
        question: "In an Express.js middleware function, what happens if you forget to invoke `next()` and don't send a response?",
        codeSnippet: 'app.use((req, res, next) => {\n  console.log("Processing request:", req.path);\n  // Missing next() or res.send()\n});',
        language: "javascript",
        options: [
          "The client request hangs indefinitely until a server timeout occurs",
          "Express automatically skips to the next route handler",
          "Express throws a synchronous ReferenceError",
          "The server restarts automatically",
        ],
        correctAnswer: "The client request hangs indefinitely until a server timeout occurs",
        explanation: "Middleware must either call `next()` to pass control down the pipeline or terminate the request-response cycle by sending a response (`res.send()`, `res.json()`). Otherwise the connection remains open until timeout.",
      },
      {
        question: "What guarantees that a JSON Web Token (JWT) has not been tampered with by the client?",
        options: [
          "The cryptographic signature verified by the server using a secret or public/private key pair",
          "The Base64Url encoding of the token payload",
          "The SSL/TLS certificate installed on the browser",
          "The expiration timestamp encoded in the header",
        ],
        correctAnswer: "The cryptographic signature verified by the server using a secret or public/private key pair",
        explanation: "The payload of a JWT is readable by anyone (Base64Url encoded). The security comes from the third part: the signature, which can only be verified or generated with the secret key.",
      },
      {
        question: "In Node.js, which queue has the highest execution priority right after the current operation finishes?",
        codeSnippet: 'setTimeout(() => console.log("Timeout"), 0);\nsetImmediate(() => console.log("Immediate"));\nprocess.nextTick(() => console.log("NextTick"));',
        language: "javascript",
        options: [
          "`process.nextTick` queue (runs before the event loop advances to the next phase)",
          "`setTimeout` timer queue",
          "`setImmediate` check queue",
          "`fs.readFile` I/O polling queue",
        ],
        correctAnswer: "`process.nextTick` queue (runs before the event loop advances to the next phase)",
        explanation: "`process.nextTick` is not technically part of the event loop; its queue is drained immediately after the current operation completes, regardless of the current phase of the event loop.",
      },
      {
        question: "How does Express identify a middleware function as an error-handling middleware?",
        codeSnippet: 'app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: "Internal Server Error" });\n});',
        language: "javascript",
        options: [
          "By inspecting function arity: it must declare exactly 4 arguments `(err, req, res, next)`",
          "By registering it with `app.catch()` instead of `app.use()`",
          "By naming the function `errorHandler`",
          "By wrapping it in a try/catch block",
        ],
        correctAnswer: "By inspecting function arity: it must declare exactly 4 arguments `(err, req, res, next)`",
        explanation: "Express checks `fn.length === 4` (its parameter count). If it takes 4 arguments, Express treats it as an error-handling middleware and routes errors to it.",
      },
    ],
  },
  {
    title: "PostgreSQL & Database Engineering",
    description: "Joins, indexing selectivity, ACID transactions, aggregate filtering, and relational constraints.",
    difficulty: "mid",
    tags: ["PostgreSQL", "Backend"],
    timeLimitMinutes: 12,
    questions: [
      {
        question: "What is the primary difference between `INNER JOIN` and `LEFT JOIN` in SQL queries?",
        codeSnippet: 'SELECT users.name, orders.id\nFROM users\nLEFT JOIN orders ON users.id = orders.user_id;',
        language: "sql",
        options: [
          "`LEFT JOIN` returns all records from the left table even if there is no match in the right table (filling with NULLs)",
          "`INNER JOIN` returns unmatched records as NULLs",
          "`LEFT JOIN` is only supported in MySQL, not PostgreSQL",
          "`INNER JOIN` deletes unmatched rows from disk",
        ],
        correctAnswer: "`LEFT JOIN` returns all records from the left table even if there is no match in the right table (filling with NULLs)",
        explanation: "`INNER JOIN` only returns rows where the join predicate matches in both tables. `LEFT JOIN` retains all rows from the first (left) table regardless of matches.",
      },
      {
        question: "How do database transactions maintain data integrity when multiple operations must either all succeed or all fail?",
        codeSnippet: 'BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;',
        language: "sql",
        options: [
          "Atomicity: if any statement fails before COMMIT, a ROLLBACK can restore the previous state completely",
          "Concurrency: it locks the entire database server from any other read queries",
          "Replication: it duplicates the table onto three backup hard drives",
          "Serialization: it converts SQL commands to JSON strings",
        ],
        correctAnswer: "Atomicity: if any statement fails before COMMIT, a ROLLBACK can restore the previous state completely",
        explanation: "Under ACID properties, Atomicity ensures all statements inside the transaction block are treated as a single indivisible unit: either all commit or none do.",
      },
      {
        question: "Which SQL clause filters the results of aggregated groups produced by `GROUP BY`?",
        codeSnippet: 'SELECT department_id, COUNT(*)\nFROM employees\nGROUP BY department_id\nHAVING COUNT(*) > 5;',
        language: "sql",
        options: ["HAVING", "WHERE", "FILTER", "LIMIT"],
        correctAnswer: "HAVING",
        explanation: "`WHERE` filters individual rows before aggregation occurs. `HAVING` filters the grouped and aggregated rows after `GROUP BY` is computed.",
      },
      {
        question: "Why might a B-Tree index on `email` NOT be used by PostgreSQL in the following query?",
        codeSnippet: 'SELECT * FROM users WHERE LOWER(email) = "alex@devarena.io";',
        language: "sql",
        options: [
          "Applying a function (`LOWER()`) to the column prevents the standard index from matching directly; a functional index is required",
          "PostgreSQL cannot index string columns",
          "Double quotes cause PostgreSQL to ignore indexes",
          "Indexes only work on primary keys",
        ],
        correctAnswer: "Applying a function (`LOWER()`) to the column prevents the standard index from matching directly; a functional index is required",
        explanation: "Standard B-Tree indexes store raw column values. To speed up case-insensitive searches, you must create an expression/functional index: `CREATE INDEX ON users (LOWER(email));`.",
      },
      {
        question: "What does `EXPLAIN ANALYZE` do in PostgreSQL when troubleshooting slow database queries?",
        options: [
          "Executes the query and returns the query execution plan with actual runtime timings and buffer hits",
          "Automatically rewrites the query to be 10x faster",
          "Validates SQL syntax without accessing any data",
          "Compresses the table indexes to free disk space",
        ],
        correctAnswer: "Executes the query and returns the query execution plan with actual runtime timings and buffer hits",
        explanation: "`EXPLAIN` displays the estimated execution cost from the query planner, while `EXPLAIN ANALYZE` actually runs the query to compare estimates against real execution times and scan types.",
      },
    ],
  },
  {
    title: "Next.js & App Router Architecture",
    description: "Server vs Client components, hydration boundaries, cache revalidation, and server actions.",
    difficulty: "hard",
    tags: ["Next.js", "Frontend"],
    timeLimitMinutes: 14,
    questions: [
      {
        question: "In the Next.js App Router, what is the default rendering paradigm of components inside the `app/` directory?",
        options: [
          "React Server Components (RSC) rendered on the server with zero client bundle overhead",
          "Client Components rendered strictly on the browser DOM",
          "Legacy Single Page Application (SPA) CSR only",
          "Static HTML exported to GitHub Pages",
        ],
        correctAnswer: "React Server Components (RSC) rendered on the server with zero client bundle overhead",
        explanation: "By default, all components inside `app/` are React Server Components. To use browser APIs, event listeners, or hooks like `useState`, you must add `'use client'` at the top.",
      },
      {
        question: "What commonly causes a React Hydration Mismatch error in Next.js applications?",
        codeSnippet: 'export default function Clock() {\n  return <span>Current time: {new Date().toLocaleTimeString()}</span>;\n}',
        language: "javascript",
        options: [
          "Rendering time or browser-only values that differ between server-rendered HTML and client hydration",
          "Using CSS Modules inside components",
          "Exporting components without TypeScript interfaces",
          "Loading images without the Next.js `<Image />` component",
        ],
        correctAnswer: "Rendering time or browser-only values that differ between server-rendered HTML and client hydration",
        explanation: "Hydration requires that the initial server-generated HTML matches the client's initial render tree exactly. Dynamic values like timestamps or `window.innerWidth` produce different results.",
      },
      {
        question: "In Next.js App Router, what happens to state inside `layout.jsx` when navigating between child pages?",
        codeSnippet: '// app/dashboard/layout.jsx\nexport default function DashboardLayout({ children }) {\n  const [query, setQuery] = useState("");\n  return <div><Sidebar query={query} />{children}</div>;\n}',
        language: "javascript",
        options: [
          "Layout state persists and does not re-render or reset during navigation between nested child pages",
          "Layout state is destroyed and reset on every route change",
          "Next.js reloads the entire browser window",
          "The layout is converted to a Server Action",
        ],
        correctAnswer: "Layout state persists and does not re-render or reset during navigation between nested child pages",
        explanation: "Layouts in Next.js are persistent across route transitions. When moving between nested child pages, only the child page re-renders, preserving layout state and scroll positions.",
      },
      {
        question: "How do you revalidate cached data on demand after executing a Next.js Server Action?",
        codeSnippet: '"use server";\nimport { revalidatePath } from "next/cache";\n\nexport async function updateChallenge(formData) {\n  await db.update(formData);\n  revalidatePath("/arena");\n}',
        language: "javascript",
        options: [
          "Call `revalidatePath('/arena')` to purge and refresh the cached data for that path",
          "Call `window.location.reload()` inside the server function",
          "Delete the `.next/cache` directory via child_process",
          "Restart the Node.js production server",
        ],
        correctAnswer: "Call `revalidatePath('/arena')` to purge and refresh the cached data for that path",
        explanation: "`revalidatePath()` allows you to purge cached data for a specific route on-demand, ensuring visitors receive fresh server-rendered content on subsequent requests.",
      },
      {
        question: "How do you configure a `fetch` request in a Server Component to bypass caching and fetch fresh data on every request?",
        codeSnippet: 'const res = await fetch("https://api.devarena.io/stats", {\n  /* How to disable data caching? */\n});',
        language: "javascript",
        options: [
          "`cache: 'no-store'`",
          "`next: { revalidate: Infinity }`",
          "`cache: 'force-cache'`",
          "`mode: 'no-cors'`",
        ],
        correctAnswer: "`cache: 'no-store'`",
        explanation: "Passing `{ cache: 'no-store' }` tells Next.js not to store the response in the Data Cache, dynamically fetching fresh data on each incoming user request.",
      },
    ],
  },
  {
    title: "Python & Modern Development",
    description: "List comprehensions, mutable defaults gotcha, dictionary access, decorators, and GIL concurrency.",
    difficulty: "easy",
    tags: ["Python", "Backend"],
    timeLimitMinutes: 10,
    questions: [
      {
        question: "What does the following Python list comprehension produce?",
        codeSnippet: 'numbers = [1, 2, 3, 4, 5, 6]\nevens_squared = [x**2 for x in numbers if x % 2 == 0]\nprint(evens_squared)',
        language: "python",
        options: ["[4, 16, 36]", "[1, 4, 9, 16, 25, 36]", "[2, 4, 6]", "[4, 8, 12]"],
        correctAnswer: "[4, 16, 36]",
        explanation: "The list comprehension filters numbers that are even (`2, 4, 6`) and squares each of them (`2**2 = 4, 4**2 = 16, 6**2 = 36`), yielding `[4, 16, 36]`.",
      },
      {
        question: "What unexpected behavior occurs with mutable default arguments in Python functions?",
        codeSnippet: 'def add_item(item, basket=[]):\n    basket.append(item)\n    return basket\n\nprint(add_item("apple"))\nprint(add_item("banana"))',
        language: "python",
        options: [
          '["apple"], then ["apple", "banana"] (the list persists across function invocations)',
          '["apple"], then ["banana"]',
          'TypeError: Default argument cannot be mutable',
          '["banana"], then ["apple"]',
        ],
        correctAnswer: '["apple"], then ["apple", "banana"] (the list persists across function invocations)',
        explanation: "In Python, default arguments are evaluated once when the function definition is executed, not each time the function is called. The same list object is reused across all subsequent calls.",
      },
      {
        question: "Why is `dict.get(key, default)` preferred over direct indexing `dict[key]` when reading optional keys?",
        codeSnippet: 'user = { "name": "Nahom" }\n# Direct indexing: user["email"]\n# Safe getter: user.get("email", None)',
        language: "python",
        options: [
          "`dict.get()` returns the default value instead of raising a `KeyError` if the key is absent",
          "`dict.get()` runs twice as fast as indexing",
          "`dict.get()` automatically inserts the key into the dictionary",
          "Direct indexing is deprecated in Python 3.12+",
        ],
        correctAnswer: "`dict.get()` returns the default value instead of raising a `KeyError` if the key is absent",
        explanation: "Direct dictionary indexing (`d[key]`) raises a `KeyError` when the key does not exist. Using `.get(key, fallback)` gracefully returns the fallback (or `None`).",
      },
      {
        question: "What does the `@decorator` syntax accomplish when placed above a Python function definition?",
        codeSnippet: 'def timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        res = func(*args, **kwargs)\n        print(f"Elapsed: {time.time() - start}s")\n        return res\n    return wrapper\n\n@timer\ndef process_data():\n    pass',
        language: "python",
        options: [
          "It passes `process_data` into `timer` and replaces it with the wrapped function `wrapper`",
          "It compiles the function into C extension bytecode",
          "It forces the function to run in a separate background thread",
          "It makes the function private to the current module",
        ],
        correctAnswer: "It passes `process_data` into `timer` and replaces it with the wrapped function `wrapper`",
        explanation: "`@timer` is syntactic sugar for `process_data = timer(process_data)`. It wraps the original function to add pre/post execution logic.",
      },
      {
        question: "How does CPython's Global Interpreter Lock (GIL) impact CPU-bound multi-threaded programs?",
        options: [
          "Only one native thread can execute Python bytecode at a time, limiting CPU-bound speedups with standard threads",
          "It prevents any multi-threaded program from opening network sockets",
          "It automatically distributes loops across all available CPU cores",
          "It disables garbage collection during multi-threaded execution",
        ],
        correctAnswer: "Only one native thread can execute Python bytecode at a time, limiting CPU-bound speedups with standard threads",
        explanation: "The GIL ensures thread-safe memory management in CPython by allowing only one thread to hold control of the Python interpreter at once. For CPU-bound parallel workloads, `multiprocessing` or process pools are used.",
      },
    ],
  },
  {
    title: "Docker & Containerization Mastery",
    description: "Port publishing, layer caching, multi-stage builds, volumes, and container networking.",
    difficulty: "mid",
    tags: ["Docker", "DevOps"],
    timeLimitMinutes: 12,
    questions: [
      {
        question: "What is the difference between `EXPOSE 8080` in a Dockerfile and the `-p 8080:8080` CLI flag?",
        codeSnippet: '# In Dockerfile:\nEXPOSE 8080\n\n# On CLI:\ndocker run -p 8080:8080 my-app',
        language: "dockerfile",
        options: [
          "`EXPOSE` serves as documentation metadata; `-p` actually publishes and binds the port to the host network interface",
          "`EXPOSE` opens the host firewall; `-p` is optional",
          "There is no difference; both publish the port to `0.0.0.0`",
          "`-p` only works for UDP traffic, while `EXPOSE` is for TCP",
        ],
        correctAnswer: "`EXPOSE` serves as documentation metadata; `-p` actually publishes and binds the port to the host network interface",
        explanation: "`EXPOSE` is declarative documentation indicating which ports the container intends to listen on. To actually make the port reachable from the host machine, you must publish it using `-p <host>:<container>`.",
      },
      {
        question: "Why should `COPY package*.json ./` and `RUN npm install` precede `COPY . .` in a Dockerfile?",
        codeSnippet: 'WORKDIR /app\n# Why copy package files first?\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build',
        language: "dockerfile",
        options: [
          "To leverage Docker layer caching: dependencies are only re-installed if `package.json` changes",
          "To avoid npm permission errors in Linux",
          "Docker syntax requires package files to be copied first",
          "It compresses the node_modules directory automatically",
        ],
        correctAnswer: "To leverage Docker layer caching: dependencies are only re-installed if `package.json` changes",
        explanation: "Docker caches each instruction layer. If source code changes but `package.json` does not, Docker reuses the cached `npm install` layer, accelerating build times from minutes to seconds.",
      },
      {
        question: "What is the primary benefit of multi-stage Docker builds?",
        codeSnippet: '# Stage 1: Build\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY . .\nRUN npm run build\n\n# Stage 2: Production Runtime\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html',
        language: "dockerfile",
        options: [
          "Dramatically reduces final image size by excluding build tools, package managers, and source files from the runtime image",
          "Allows running multiple containers on the same physical port",
          "Automatically provisions SSL certificates",
          "Bypasses Docker build time limits",
        ],
        correctAnswer: "Dramatically reduces final image size by excluding build tools, package managers, and source files from the runtime image",
        explanation: "Multi-stage builds allow you to use a full SDK image for compilation and copy only the compiled artifacts (`/dist`) into a lean production runtime image.",
      },
      {
        question: "What is the purpose of the `.dockerignore` file in a project root?",
        options: [
          "Prevents unnecessary files (e.g. `node_modules`, `.git`, `.env`) from being sent to the Docker build daemon",
          "Stops containers from crashing when disk space is full",
          "Instructs Docker to ignore compilation warnings",
          "Lists ports that should be kept private from the host",
        ],
        correctAnswer: "Prevents unnecessary files (e.g. `node_modules`, `.git`, `.env`) from being sent to the Docker build daemon",
        explanation: "Without `.dockerignore`, Docker sends the entire directory context (including heavy `node_modules` or local git history) to the daemon, slowing down builds and risking secret leaks.",
      },
      {
        question: "What is the key difference between a Docker bind mount and a named volume?",
        codeSnippet: '# Named volume:\ndocker run -v db_data:/var/lib/postgresql/data postgres\n\n# Bind mount:\ndocker run -v ./src:/app/src my-app',
        language: "bash",
        options: [
          "Named volumes are managed by Docker in dedicated storage; bind mounts link directly to a specific host folder path",
          "Bind mounts are faster for database storage",
          "Named volumes are deleted automatically when the container stops",
          "Bind mounts can only be mounted in read-only mode",
        ],
        correctAnswer: "Named volumes are managed by Docker in dedicated storage; bind mounts link directly to a specific host folder path",
        explanation: "Named volumes are isolated and managed entirely by Docker (ideal for databases and persistence). Bind mounts point to an explicit host file or folder (ideal for local hot-reloading development).",
      },
    ],
  },
  {
    title: "HTML5, CSS & Modern Layouts",
    description: "Box model borders, Flexbox alignment, CSS Grid responsiveness, and local storage mechanisms.",
    difficulty: "easy",
    tags: ["HTML & CSS", "Frontend"],
    timeLimitMinutes: 10,
    questions: [
      {
        question: "Under standard `box-sizing: border-box`, what does an element with `width: 300px; padding: 20px; border: 5px solid black;` measure in total width?",
        options: [
          "300px (padding and border are absorbed inside the specified width)",
          "350px",
          "325px",
          "250px",
        ],
        correctAnswer: "300px (padding and border are absorbed inside the specified width)",
        explanation: "`border-box` tells the browser that padding and borders should be included in the total specified width and height, keeping calculations predictable.",
      },
      {
        question: "Which Flexbox property controls alignment of items along the main (primary) axis?",
        codeSnippet: '.container {\n  display: flex;\n  flex-direction: row;\n  /* Which property spaces items evenly along the main row? */\n  justify-content: space-between;\n}',
        language: "css",
        options: ["justify-content", "align-items", "align-content", "flex-wrap"],
        correctAnswer: "justify-content",
        explanation: "`justify-content` distributes free space along the flex container's main axis. `align-items` governs alignment along the cross axis.",
      },
      {
        question: "What does `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));` achieve in modern CSS Grid?",
        codeSnippet: '.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}',
        language: "css",
        options: [
          "Creates a responsive layout where columns automatically wrap without needing media queries",
          "Locks the grid to exactly 4 fixed columns on all screen sizes",
          "Forces all items to expand to the full height of the viewport",
          "Disables CSS animations inside cards",
        ],
        correctAnswer: "Creates a responsive layout where columns automatically wrap without needing media queries",
        explanation: "`repeat(auto-fit, minmax(...))` dynamically fits as many 240px+ columns as will fit across the container width, sharing remaining space with `1fr`.",
      },
      {
        question: "What is the key difference between browser `localStorage` and `sessionStorage`?",
        options: [
          "`localStorage` persists data across browser tabs and sessions until deleted; `sessionStorage` clears when the tab is closed",
          "`sessionStorage` stores data on the backend server automatically",
          "`localStorage` has a strict 1KB limit, while `sessionStorage` has 500MB",
          "There is no difference; they share the same memory namespace",
        ],
        correctAnswer: "`localStorage` persists data across browser tabs and sessions until deleted; `sessionStorage` clears when the tab is closed",
        explanation: "`localStorage` data has no expiration date. `sessionStorage` is scoped to the current browser tab and lifetime of that session.",
      },
      {
        question: "In CSS specificity rules, which selector has the highest specificity weight?",
        options: [
          "Inline style attribute (`style=\"color: red;\"`)",
          "An ID selector (`#header`)",
          "A Class selector (`.nav-link`)",
          "An Element selector (`h1`)",
        ],
        correctAnswer: "Inline style attribute (`style=\"color: red;\"`)",
        explanation: "Specificity hierarchy is: Inline styles (1000) > IDs (100) > Classes/Attributes/Pseudo-classes (10) > Elements/Pseudo-elements (1). (Only `!important` overrides inline styles).",
      },
    ],
  },
  {
    title: "MongoDB & Document Databases",
    description: "BSON documents, atomic updates, Mongoose population, aggregation pipelines, and compound indexes.",
    difficulty: "mid",
    tags: ["MongoDB", "Backend"],
    timeLimitMinutes: 12,
    questions: [
      {
        question: "What data format does MongoDB use internally to store documents on disk and over the wire?",
        options: [
          "BSON (Binary JSON), extending JSON with data types like Date and ObjectId",
          "Plain ASCII JSON text files",
          "Relational table rows with strict foreign keys",
          "XML documents with strict DTD schemas",
        ],
        correctAnswer: "BSON (Binary JSON), extending JSON with data types like Date and ObjectId",
        explanation: "BSON is a binary-encoded serialization of JSON-like documents. It provides fast parsing, compact indexing, and support for additional data types such as `Date` and `ObjectId`.",
      },
      {
        question: "Which MongoDB update operator modifies specific fields without overwriting the entire document?",
        codeSnippet: 'await db.collection("users").updateOne(\n  { _id: userId },\n  { $set: { status: "active", lastLogin: new Date() } }\n);',
        language: "javascript",
        options: ["$set", "$push", "$inc", "$replace"],
        correctAnswer: "$set",
        explanation: "The `$set` operator replaces the value of specified fields with the specified values. Without `$set`, passing a raw document into `updateOne` or `replaceOne` would overwrite the entire document.",
      },
      {
        question: "In Mongoose, what does `.populate('author')` perform when querying documents with `ref` relationships?",
        codeSnippet: 'const post = await Post.findById(postId).populate("author");\nconsole.log(post.author.name);',
        language: "javascript",
        options: [
          "Executes a subsequent query to replace referenced ObjectIds with the full document from the related collection",
          "Creates a native database-level foreign key constraint",
          "Caches the document in Redis memory",
          "Serializes the model into a CSV file",
        ],
        correctAnswer: "Executes a subsequent query to replace referenced ObjectIds with the full document from the related collection",
        explanation: "Mongoose's `populate()` is client-side ORM convenience: it runs an extra `find` query behind the scenes using the stored `_id` and substitutes the populated document.",
      },
      {
        question: "In a MongoDB Aggregation Pipeline, why should `$match` stages be placed as early as possible?",
        codeSnippet: 'db.orders.aggregate([\n  { $match: { status: "completed" } },\n  { $group: { _id: "$customerId", totalSpent: { $sum: "$amount" } } }\n]);',
        language: "javascript",
        options: [
          "To leverage indexes and filter out irrelevant documents before memory-intensive grouping operations",
          "MongoDB syntax disallows `$match` after `$group`",
          "It forces MongoDB to run in single-thread mode",
          "To sort the output in alphabetical order",
        ],
        correctAnswer: "To leverage indexes and filter out irrelevant documents before memory-intensive grouping operations",
        explanation: "Placing `$match` at the beginning allows MongoDB to utilize indexes and drastically reduce the number of documents passed down through subsequent stages.",
      },
      {
        question: "What is the recommended rule of thumb for field ordering when designing a compound index in MongoDB?",
        options: [
          "Equality first, then Sort, then Range (ESR rule)",
          "Range first, then Sort, then Equality",
          "Sort first, then Equality, then Range",
          "Alphabetical order of field names",
        ],
        correctAnswer: "Equality first, then Sort, then Range (ESR rule)",
        explanation: "The ESR rule (Equality, Sort, Range) provides optimal compound index selectivity: fields with exact match queries come first, followed by sort fields to avoid in-memory sorting, followed by range filters.",
      },
    ],
  },
  {
    title: "Java & Enterprise Architecture",
    description: "String equality, Spring Boot annotations, exception hierarchy, collections, and thread safety.",
    difficulty: "mid",
    tags: ["Java", "Backend"],
    timeLimitMinutes: 12,
    questions: [
      {
        question: "What is the difference between `str1 == str2` and `str1.equals(str2)` in Java?",
        codeSnippet: 'String a = new String("dev");\nString b = new String("dev");\nSystem.out.println(a == b);\nSystem.out.println(a.equals(b));',
        language: "java",
        options: [
          "`==` tests reference identity (memory address); `.equals()` compares string content",
          "`==` compares string content; `.equals()` compares length only",
          "`==` is case-insensitive; `.equals()` is case-sensitive",
          "There is no difference; Java handles both identically",
        ],
        correctAnswer: "`==` tests reference identity (memory address); `.equals()` compares string content",
        explanation: "In Java, `==` tests whether two references point to the exact same memory object on the heap. `.equals()` tests for logical value equality.",
      },
      {
        question: "What does the `@RestController` annotation in Spring Boot do?",
        codeSnippet: '@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n    @GetMapping\n    public List<User> getUsers() { ... }\n}',
        language: "java",
        options: [
          "Combines `@Controller` and `@ResponseBody`, automatically serializing return values directly to JSON/XML responses",
          "Restricts the endpoint to authenticated admin users only",
          "Configures a WebSocket gateway",
          "Creates an in-memory H2 database table",
        ],
        correctAnswer: "Combines `@Controller` and `@ResponseBody`, automatically serializing return values directly to JSON/XML responses",
        explanation: "`@RestController` is a convenience annotation that marks the class as a web controller and adds `@ResponseBody` to every handler method so return values are written directly to the HTTP response body.",
      },
      {
        question: "In Java exception architecture, what distinguishes checked exceptions from unchecked exceptions?",
        options: [
          "Checked exceptions extend `Exception` and must be declared in `throws` or handled with `try/catch` at compile time",
          "Unchecked exceptions crash the JVM immediately without allowing error handling",
          "Checked exceptions only occur in multi-threaded code",
          "Unchecked exceptions are caught by the operating system kernel",
        ],
        correctAnswer: "Checked exceptions extend `Exception` and must be declared in `throws` or handled with `try/catch` at compile time",
        explanation: "Checked exceptions (subclasses of `Exception` except `RuntimeException`) are verified at compile time. Unchecked exceptions extend `RuntimeException` and represent programming bugs (like `NullPointerException`).",
      },
      {
        question: "What is the time complexity of retrieving an element by index (`list.get(500)`) in `ArrayList` vs `LinkedList`?",
        options: [
          "`ArrayList` is O(1) random access; `LinkedList` is O(n) sequential traversal",
          "`ArrayList` is O(n); `LinkedList` is O(1)",
          "Both are O(1)",
          "Both are O(log n)",
        ],
        correctAnswer: "`ArrayList` is O(1) random access; `LinkedList` is O(n) sequential traversal",
        explanation: "`ArrayList` is backed by a contiguous array, allowing instant constant-time O(1) index calculation. `LinkedList` must traverse node pointers sequentially from the head or tail in O(n).",
      },
      {
        question: "Why is `ConcurrentHashMap` preferred over `Collections.synchronizedMap()` in high-concurrency environments?",
        options: [
          "It uses bucket/segment-level locking allowing concurrent reads and writes, instead of locking the entire map",
          "It stores keys on disk to reduce RAM consumption",
          "It automatically prevents deadlocks in database connections",
          "It restricts map writes to a single thread",
        ],
        correctAnswer: "It uses bucket/segment-level locking allowing concurrent reads and writes, instead of locking the entire map",
        explanation: "`Collections.synchronizedMap()` synchronizes every single operation on the entire map object. `ConcurrentHashMap` allows concurrent non-blocking reads and locks individual hash buckets on write.",
      },
    ],
  },
  {
    title: "Git & Version Control Mastery",
    description: "Branching strategies, conflict resolution, rebasing vs merging, stashing, and cherry-picking.",
    difficulty: "easy",
    tags: ["Git", "DevOps"],
    timeLimitMinutes: 10,
    questions: [
      {
        question: "What is the key difference between `git fetch` and `git pull`?",
        options: [
          "`git fetch` downloads remote commits without modifying your local working branch; `git pull` fetches and merges immediately",
          "`git pull` only checks branch status; `git fetch` pushes local commits",
          "`git fetch` deletes untracked files; `git pull` keeps them",
          "There is no difference; they are aliases",
        ],
        correctAnswer: "`git fetch` downloads remote commits without modifying your local working branch; `git pull` fetches and merges immediately",
        explanation: "`git pull` is shorthand for `git fetch` followed by `git merge FETCH_HEAD`. `git fetch` gives you a safe chance to inspect remote changes without altering your working tree.",
      },
      {
        question: "How does `git rebase main` differ from `git merge main` when updating your feature branch?",
        codeSnippet: '# On feature branch:\ngit rebase main',
        language: "bash",
        options: [
          "Rebase replays your feature commits on top of main, creating a clean linear commit history without a merge commit",
          "Rebase deletes the main branch permanently",
          "Merge rewrites all existing commit timestamps and author IDs",
          "Rebase can only be performed by repository administrators",
        ],
        correctAnswer: "Rebase replays your feature commits on top of main, creating a clean linear commit history without a merge commit",
        explanation: "Rebase takes your branch's unique commits, temporarily sets them aside, advances your branch to the tip of main, and reapplies each commit on top sequentially.",
      },
      {
        question: "Which command safely shelves uncommitted working directory changes so you can switch branches?",
        codeSnippet: 'git stash\ngit checkout hotfix-branch\n# Later, return and restore changes:\ngit stash pop',
        language: "bash",
        options: ["git stash", "git checkout --force", "git reset --hard", "git clean -fd"],
        correctAnswer: "git stash",
        explanation: "`git stash` takes your modified tracked files and staged changes and saves them on a stack of unfinished changes that you can reapply at any time with `git stash pop`.",
      },
      {
        question: "What command applies a single specific commit from another branch onto your current branch?",
        codeSnippet: 'git cherry-pick a1b2c3d',
        language: "bash",
        options: ["git cherry-pick", "git rebase --onto", "git patch --single", "git apply --commit"],
        correctAnswer: "git cherry-pick",
        explanation: "`git cherry-pick <commit-hash>` selects a specific commit by its hash and applies its exact diff as a new commit on your currently checked-out branch.",
      },
      {
        question: "How do you discard all uncommitted changes in your current working directory back to the last commit?",
        options: [
          "`git restore .` (or `git reset --hard HEAD`)",
          "`git commit --amend`",
          "`git revert HEAD`",
          "`git branch -D`",
        ],
        correctAnswer: "`git restore .` (or `git reset --hard HEAD`)",
        explanation: "`git restore .` discards working tree changes in the current directory. `git reset --hard HEAD` resets both the staging area and working directory back to the last commit.",
      },
    ],
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB for arena challenge seeding...");
    await connectDB();
    console.log("✓ Connected to MongoDB");

    // 1. Find or create master system arena user (benchmark author)
    let masterUser = await User.findOne({ email: "arena.master@devarena.io" });
    if (!masterUser) {
      masterUser = await User.create({
        name: "Dev Arena Official",
        email: "arena.master@devarena.io",
        passwordHash: "$2a$10$e7K00oXmXq2z4dZt1sS67OPR8lW9M4mNq9hL6sRk4zO3Q1t2e4w5q", // Mock bcrypt hash
        role: "author",
        xp: 350,
        level: 2,
        quizzesCreated: CHALLENGES.length,
      });
      console.log("✓ Created Arena Master user");
    } else {
      masterUser.role = "author";
      masterUser.xp = 350;
      masterUser.level = 2;
      await masterUser.save();
    }

    // 2. Loop and upsert challenges
    for (const ch of CHALLENGES) {
      let quiz = await Quiz.findOne({ title: ch.title });
      if (!quiz) {
        quiz = await Quiz.create({
          title: ch.title,
          description: ch.description,
          difficulty: ch.difficulty,
          tags: ch.tags,
          timeLimitMinutes: ch.timeLimitMinutes,
          teacherId: masterUser._id,
          creatorName: "Dev Arena Official",
          status: "published",
          playsCount: Math.floor(Math.random() * 80) + 20,
        });
        console.log(`✓ Created challenge: ${ch.title} [${ch.difficulty}]`);
      } else {
        quiz.description = ch.description;
        quiz.difficulty = ch.difficulty;
        quiz.tags = ch.tags;
        quiz.status = "published";
        quiz.creatorName = "Dev Arena Official";
        await quiz.save();
        console.log(`✓ Updated challenge: ${ch.title}`);
      }

      // 3. Clear existing questions for this challenge and re-seed with fresh code snippets
      await Question.deleteMany({ quizId: quiz._id });

      for (const q of ch.questions) {
        await Question.create({
          quizId: quiz._id,
          question: q.question,
          codeSnippet: q.codeSnippet || "",
          language: q.language || "javascript",
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || "",
        });
      }
      console.log(`   ➔ Seeded ${ch.questions.length} verified questions for ${ch.title}`);
    }

    console.log("\n🚀 All Developer Arena challenges seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
