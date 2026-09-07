export const reactHardQuizzes = [
  {
    "title": "React: Fiber Architecture & Work Loops",
    "description": "Fiber data structure, dual buffering, and linked-tree traversal.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Internals"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is a React Fiber in terms of its underlying data structure?",
        "options": [
          "A plain JavaScript object representing a unit of work, containing `child`, `sibling`, and `return` pointers to form a singly linked list tree",
          "An OS-level thread spawned via Web Workers",
          "A native C++ pointer managed by the V8 garbage collector",
          "A DOM mutation observer instance"
        ],
        "correctAnswer": "A plain JavaScript object representing a unit of work, containing `child`, `sibling`, and `return` pointers to form a singly linked list tree",
        "explanation": "Fiber transforms the recursive call stack into a singly linked tree of work units with `child`, `sibling`, and `return` pointers."
      },
      {
        "question": "What is 'Dual Buffering' in React's Fiber architecture?",
        "options": [
          "React buffers HTTP network requests in memory before dispatching",
          "React maintains two Fiber trees: the `current` tree (displayed on screen) and the `workInProgress` tree (built offscreen during render)",
          "React stores previous state in localStorage and sessionStorage",
          "React buffers keyboard events in a double-ended queue"
        ],
        "correctAnswer": "React maintains two Fiber trees: the `current` tree (displayed on screen) and the `workInProgress` tree (built offscreen during render)",
        "explanation": "Dual buffering builds changes on a `workInProgress` fiber tree. Once complete, React swaps the root pointer to make it `current` in a single atomic commit."
      },
      {
        "question": "What are the two primary phases of a React Fiber render-and-commit cycle?",
        "options": [
          "The Parsing phase and the Transpilation phase",
          "The Network phase and the Hydration phase",
          "The Render phase (asynchronous, interruptible, calculates diffs) and the Commit phase (synchronous, uninterruptible, mutates the real DOM)",
          "The Compilation phase and the Garbage Collection phase"
        ],
        "correctAnswer": "The Render phase (asynchronous, interruptible, calculates diffs) and the Commit phase (synchronous, uninterruptible, mutates the real DOM)",
        "explanation": "The render phase reconciles fibers and can be paused or restarted. The commit phase applies DOM mutations synchronously without interruption."
      },
      {
        "question": "Why did React rewrite its core reconciler from the Stack reconciler to Fiber?",
        "options": [
          "Because Stack reconciler lacked support for HTML5 elements",
          "Because JavaScript deprecated recursive functions",
          "To eliminate the need for Babel transpilation",
          "To enable time-slicing and interruptible rendering so urgent user inputs (like typing) are not blocked by heavy render trees"
        ],
        "correctAnswer": "To enable time-slicing and interruptible rendering so urgent user inputs (like typing) are not blocked by heavy render trees",
        "explanation": "The Stack reconciler was recursive and could not pause work. Fiber breaks work into chunks, allowing React to yield control back to the browser."
      },
      {
        "question": "What does the `return` pointer in a Fiber node point to?",
        "options": [
          "The parent Fiber node (the fiber to which execution returns after processing the current fiber and its siblings)",
          "The return value of the component function",
          "The previous git commit hash",
          "The next sibling DOM node"
        ],
        "correctAnswer": "The parent Fiber node (the fiber to which execution returns after processing the current fiber and its siblings)",
        "explanation": "In Fiber's linked list representation, `return` points back to the parent fiber node, mimicking the call stack."
      }
    ]
  },
  {
    "title": "React: Reconciliation Algorithm & Key Heuristics",
    "description": "Diffing heuristics, O(n) algorithmic design, and key uniqueness requirements.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Internals"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "Why does React achieve an O(n) diffing complexity instead of the theoretical minimum O(n³) tree-matching algorithm?",
        "options": [
          "By using quantum computing algorithms in WebAssembly",
          "By employing two heuristics: components of different types produce entirely different trees, and children across renders are matched via `key` props",
          "By diffing only every third element in the tree",
          "By ignoring child nodes completely"
        ],
        "correctAnswer": "By employing two heuristics: components of different types produce entirely different trees, and children across renders are matched via `key` props",
        "explanation": "React relies on two practical heuristics: differing element types rebuild the subtree entirely, and persistent `key` props identify matching elements."
      },
      {
        "question": "What occurs in the DOM when a component element changes from `<div>` to `<span>`?",
        "codeSnippet": "// Render 1: <div><Counter /></div>\n// Render 2: <span><Counter /></span>",
        "options": [
          "React mutates the DOM tagName in-place and preserves Counter's internal state",
          "React logs a warning and leaves the `<div>` unchanged",
          "React tears down the entire `<div>` subtree (unmounting `<Counter />` and wiping its internal state) and builds the `<span>` tree from scratch",
          "React throws a fatal reconciliation exception"
        ],
        "correctAnswer": "React tears down the entire `<div>` subtree (unmounting `<Counter />` and wiping its internal state) and builds the `<span>` tree from scratch",
        "explanation": "When root element types differ, React does not attempt to match children; it unmounts the old tree completely and mounts a fresh one."
      },
      {
        "question": "Why does using array indices as `key` props cause severe UI bugs in dynamic or reordered lists?",
        "codeSnippet": "items.map((item, index) => <TodoItem key={index} {...item} />)",
        "options": [
          "Array indices crash the JavaScript array prototype",
          "React prohibits numbers as keys",
          "The browser engine ignores elements with numeric keys",
          "If items are inserted, deleted, or sorted, the indices shift: React matches elements by index rather than item identity, causing input state or DOM focus to associate with the wrong item"
        ],
        "correctAnswer": "If items are inserted, deleted, or sorted, the indices shift: React matches elements by index rather than item identity, causing input state or DOM focus to associate with the wrong item",
        "explanation": "Keys indicate item identity. When keys are indices, shifting the array preserves stale component state on shifted indices."
      },
      {
        "question": "What does changing a component's `key` prop explicitly do to that component?",
        "codeSnippet": "<UserProfile key={userId} user={user} />",
        "options": [
          "Forces React to completely unmount the previous component instance, throw away its state, and mount a brand new instance",
          "Only changes the HTML `id` attribute in the DOM",
          "Caches the component in browser IndexedDB",
          "Triggers a hard page reload"
        ],
        "correctAnswer": "Forces React to completely unmount the previous component instance, throw away its state, and mount a brand new instance",
        "explanation": "Changing `key` tells React that this is a completely different component identity, immediately destroying the old instance and resetting all state."
      },
      {
        "question": "How does React handle child reconciliation when elements have stable keys during reordering?",
        "options": [
          "It deletes all DOM nodes and re-fetches the HTML from the server",
          "It reorders the existing DOM nodes using `node.insertBefore()` without destroying and recreating them",
          "It swaps the innerHTML strings directly",
          "It clones the browser tab"
        ],
        "correctAnswer": "It reorders the existing DOM nodes using `node.insertBefore()` without destroying and recreating them",
        "explanation": "Stable keys allow React to reuse Fiber instances and real DOM nodes, simply reordering them in the DOM tree with minimal mutations."
      }
    ]
  },
  {
    "title": "React: Concurrent React & Schedulers",
    "description": "Lanes model, cooperative scheduling, and non-blocking time-slicing.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Concurrent"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is the core capability that 'Concurrent React' enables?",
        "options": [
          "React components execute simultaneously on multiple physical CPU threads in parallel",
          "Database transactions are committed concurrently across multiple servers",
          "Rendering can be interrupted, paused, resumed, or abandoned in the background without blocking the browser's main UI thread",
          "React eliminates the need for JavaScript promises"
        ],
        "correctAnswer": "Rendering can be interrupted, paused, resumed, or abandoned in the background without blocking the browser's main UI thread",
        "explanation": "Concurrent React allows rendering to yield execution back to the browser event loop, ensuring user input and animations remain 60fps responsive."
      },
      {
        "question": "What is the 'Lanes' model in React's internal scheduler?",
        "options": [
          "A CSS flexbox layout manager inside React",
          "A road traffic simulation API",
          "A WebSocket communication protocol",
          "A 32-bit bitmask system where each bit represents an update priority lane (e.g., Sync, InputContinuous, Transition, Idle)"
        ],
        "correctAnswer": "A 32-bit bitmask system where each bit represents an update priority lane (e.g., Sync, InputContinuous, Transition, Idle)",
        "explanation": "Lanes use 32-bit bitmasks to express task priorities and groupings, enabling fast bitwise operations for scheduling and batching."
      },
      {
        "question": "How does the React Scheduler achieve cooperative multi-tasking (time-slicing) in modern browsers?",
        "options": [
          "It uses a work loop that checks `shouldYield()` (measuring elapsed frame time via `performance.now()`) and schedules the next slice using `MessageChannel`",
          "It calls `pthread_yield()` in the operating system kernel",
          "It uses synchronous `while(true)` loops with `alert()`",
          "It delegates rendering to WebAssembly threads"
        ],
        "correctAnswer": "It uses a work loop that checks `shouldYield()` (measuring elapsed frame time via `performance.now()`) and schedules the next slice using `MessageChannel`",
        "explanation": "React Scheduler checks if ~5ms have elapsed. If so, it yields control back to the browser via `MessageChannel` postMessage tasks."
      },
      {
        "question": "What happens to an ongoing background render if an urgent high-priority update (like a keystroke) arrives?",
        "options": [
          "React queues the keystroke until the background render finishes 5 seconds later",
          "React immediately interrupts the low-priority render, processes the urgent keystroke render first, and then restarts or resumes the background render",
          "React crashes with a concurrent conflict error",
          "The browser drops the keystroke event entirely"
        ],
        "correctAnswer": "React immediately interrupts the low-priority render, processes the urgent keystroke render first, and then restarts or resumes the background render",
        "explanation": "Urgent lanes preempt transition lanes. React pauses the transition work, flushes the urgent input update immediately, and then resumes."
      },
      {
        "question": "Can React commit partial rendering work to the screen when interrupted?",
        "options": [
          "Yes, it displays whatever DOM nodes are ready immediately",
          "Only in development mode",
          "No, commits are strictly atomic; React only commits once an entire render tree finishes completely",
          "Yes, by showing half-rendered elements"
        ],
        "correctAnswer": "No, commits are strictly atomic; React only commits once an entire render tree finishes completely",
        "explanation": "Rendering can be paused or abandoned, but the commit phase is atomic. Users never see half-rendered or inconsistent UI."
      }
    ]
  },
  {
    "title": "React: useTransition & Non-Blocking Updates",
    "description": "Marking state updates as non-urgent transitions and tracking pending states.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Concurrent"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is the primary purpose of the `useTransition` hook?",
        "codeSnippet": "const [isPending, startTransition] = useTransition();",
        "options": [
          "To create CSS fade-in and slide-out animations",
          "To transition routes in React Router",
          "To convert functional components into class components",
          "To mark expensive state updates as non-urgent transitions, keeping the user interface responsive to urgent interactions like typing"
        ],
        "correctAnswer": "To mark expensive state updates as non-urgent transitions, keeping the user interface responsive to urgent interactions like typing",
        "explanation": "`startTransition` demotes updates to a low-priority lane, allowing higher-priority events (clicks, typing) to interrupt them."
      },
      {
        "question": "What does the `isPending` boolean returned by `useTransition` indicate?",
        "codeSnippet": "{isPending && <Spinner />}",
        "options": [
          "Whether a transition update is currently executing in the background and has not yet committed to the screen",
          "Whether the network is offline",
          "Whether a component has thrown an unhandled exception",
          "Whether the browser tab is focused"
        ],
        "correctAnswer": "Whether a transition update is currently executing in the background and has not yet committed to the screen",
        "explanation": "`isPending` is `true` while React is rendering the transition in the background, allowing you to display an inline loading indicator."
      },
      {
        "question": "Can an asynchronous callback (e.g. `await fetch()`) be wrapped directly inside `startTransition` in React 18?",
        "codeSnippet": "startTransition(async () => {\n  await fetchData(); // React 18 behavior\n  setData(result);\n});",
        "options": [
          "Yes, React 18 fully supports async callbacks in startTransition",
          "In React 18, the function passed to `startTransition` must be synchronous; async transitions are only supported in React 19 Actions",
          "No, startTransition cannot call setState",
          "Yes, but only if wrapped in `useCallback`"
        ],
        "correctAnswer": "In React 18, the function passed to `startTransition` must be synchronous; async transitions are only supported in React 19 Actions",
        "explanation": "In React 18, `startTransition` expects a synchronous function that synchronously schedules state setters. React 19 extended this to async Actions."
      },
      {
        "question": "How does `startTransition` differ from `setTimeout(fn, 0)` for deferring updates?",
        "options": [
          "`setTimeout` runs on a separate GPU thread",
          "`startTransition` is only for CSS animations",
          "`startTransition` runs immediately without artificial timer delays, can be interrupted by urgent updates, and coordinates with Suspense and `isPending`",
          "`setTimeout` cancels all pending promises"
        ],
        "correctAnswer": "`startTransition` runs immediately without artificial timer delays, can be interrupted by urgent updates, and coordinates with Suspense and `isPending`",
        "explanation": "`setTimeout` is a coarse browser event loop delay. `startTransition` is integrated into React's Fiber scheduler and can be preempted."
      },
      {
        "question": "What should you NOT put inside `startTransition`?",
        "options": [
          "Filtering a list of 10,000 items",
          "Switching heavy application tabs",
          "Navigating to a new page",
          "Urgent state updates that control controlled inputs (like a text field `value`)"
        ],
        "correctAnswer": "Urgent state updates that control controlled inputs (like a text field `value`)",
        "explanation": "Direct text input state must update synchronously to avoid noticeable lag between keystrokes and text display."
      }
    ]
  },
  {
    "title": "React: useDeferredValue & Stale-While-Revalidate",
    "description": "Deferring heavy prop updates and decoupling fast inputs from slow renders.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Concurrent"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What does `useDeferredValue(value)` do in React?",
        "codeSnippet": "const deferredQuery = useDeferredValue(query);",
        "options": [
          "Returns a deferred version of the value that 'lags behind' the latest value during urgent updates, updating in a background non-blocking render",
          "Delays updating the value by a fixed 500ms timer",
          "Encrypts the value for security",
          "Caches the value permanently in WebStorage"
        ],
        "correctAnswer": "Returns a deferred version of the value that 'lags behind' the latest value during urgent updates, updating in a background non-blocking render",
        "explanation": "`useDeferredValue` allows React to render the current value with the old deferred value first, then render the deferred value offscreen in the background."
      },
      {
        "question": "How does `useDeferredValue` compare to traditional lodash `debounce`?",
        "options": [
          "`debounce` is always faster on low-end phones",
          "`useDeferredValue` adapts dynamically to device speed without arbitrary millisecond delays, and is interruptible by user input",
          "`useDeferredValue` only works on numbers",
          "`debounce` is built into the React core library"
        ],
        "correctAnswer": "`useDeferredValue` adapts dynamically to device speed without arbitrary millisecond delays, and is interruptible by user input",
        "explanation": "Debounce waits a fixed duration regardless of CPU speed. `useDeferredValue` starts rendering immediately and yields if user input arrives."
      },
      {
        "question": "How can you tell if `useDeferredValue` is currently lagging behind the fresh value to show a visual stale state?",
        "codeSnippet": "<div style={{ opacity: query !== deferredQuery ? 0.6 : 1 }}>\n  <SlowList text={deferredQuery} />\n</div>",
        "options": [
          "Check `deferredQuery.isStale`",
          "Call `useDeferredValue.isPending()`",
          "Compare `query !== deferredQuery` directly: if unequal, the deferred UI is stale and rendering in the background",
          "Read `window.isLagging`"
        ],
        "correctAnswer": "Compare `query !== deferredQuery` directly: if unequal, the deferred UI is stale and rendering in the background",
        "explanation": "Directly checking `query !== deferredQuery` indicates whether React is still working on the background render for the latest input."
      },
      {
        "question": "Why should the child component receiving `deferredValue` be wrapped in `React.memo`?",
        "codeSnippet": "const SlowList = React.memo(function SlowList({ text }) { ... });",
        "options": [
          "Because React throws an error if deferred values are passed to non-memo components",
          "To allow the child component to read localStorage",
          "To convert the child component to SVG",
          "Without `React.memo`, the child component would re-render immediately during the parent's urgent render anyway, defeating the purpose of deferring"
        ],
        "correctAnswer": "Without `React.memo`, the child component would re-render immediately during the parent's urgent render anyway, defeating the purpose of deferring",
        "explanation": "If the child isn't memoized, it will re-render whenever the parent renders. Memoizing ensures it only re-renders when `deferredValue` actually changes."
      },
      {
        "question": "Does `useDeferredValue` cause an extra initial render on mount?",
        "options": [
          "No, on initial mount, `deferredValue` receives the initial value immediately without deferring",
          "Yes, it always renders twice on initial mount",
          "Yes, it mounts with `undefined` first",
          "Only when running in production"
        ],
        "correctAnswer": "No, on initial mount, `deferredValue` receives the initial value immediately without deferring",
        "explanation": "On initial mount, the deferred value is immediately equal to the provided value; deferral only applies to subsequent updates."
      }
    ]
  },
  {
    "title": "React: useLayoutEffect vs useEffect",
    "description": "Pre-paint synchronous DOM measurement vs post-paint asynchronous effects.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Hooks"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is the key timing difference between `useLayoutEffect` and `useEffect`?",
        "options": [
          "`useLayoutEffect` runs on the server; `useEffect` runs on the client",
          "`useLayoutEffect` fires synchronously after all DOM mutations but BEFORE the browser paints to the screen; `useEffect` fires asynchronously after paint",
          "`useLayoutEffect` fires before JSX is transpiled",
          "`useLayoutEffect` runs every 10 seconds in the background"
        ],
        "correctAnswer": "`useLayoutEffect` fires synchronously after all DOM mutations but BEFORE the browser paints to the screen; `useEffect` fires asynchronously after paint",
        "explanation": "`useLayoutEffect` blocks visual painting so you can read layout measurements and mutate the DOM without causing visible visual flicker."
      },
      {
        "question": "When is `useLayoutEffect` strictly necessary over `useEffect`?",
        "codeSnippet": "useLayoutEffect(() => {\n  const { height } = ref.current.getBoundingClientRect();\n  setTooltipPos(calculate(height));\n}, []);",
        "options": [
          "When performing network fetch requests",
          "When logging page views to analytics",
          "When measuring DOM node dimensions (e.g. `getBoundingClientRect`) and mutating state/DOM before the user sees a layout shift or flicker",
          "When registering service workers"
        ],
        "correctAnswer": "When measuring DOM node dimensions (e.g. `getBoundingClientRect`) and mutating state/DOM before the user sees a layout shift or flicker",
        "explanation": "Using `useEffect` for DOM measurements can cause the initial render to paint at the wrong position, followed by a visible snap/flicker when the effect sets state."
      },
      {
        "question": "What is the major performance drawback of abusing `useLayoutEffect`?",
        "options": [
          "It crashes mobile Safari",
          "It disables hardware acceleration in the GPU",
          "It doubles CSS bundle sizes",
          "It blocks browser painting and JavaScript execution until completion, hurting Time to Interactive and frame rates"
        ],
        "correctAnswer": "It blocks browser painting and JavaScript execution until completion, hurting Time to Interactive and frame rates",
        "explanation": "Because `useLayoutEffect` is synchronous, heavy work inside it directly delays the browser from repainting the frame."
      },
      {
        "question": "What warning does React emit when `useLayoutEffect` is executed during Server-Side Rendering (SSR)?",
        "options": [
          "React warns that `useLayoutEffect` does nothing on the server because no DOM exists to measure or manipulate",
          "React throws a fatal crash and aborts node.js",
          "React deletes all CSS styles on the server",
          "React switches to client-side only mode automatically"
        ],
        "correctAnswer": "React warns that `useLayoutEffect` does nothing on the server because no DOM exists to measure or manipulate",
        "explanation": "SSR has no real DOM nodes or layout engine. Running `useLayoutEffect` on Node.js generates a warning."
      },
      {
        "question": "In what order do `useLayoutEffect` cleanups and setups run relative to child and parent components?",
        "options": [
          "Parent runs first, then child",
          "Child `useLayoutEffect` setups run BEFORE parent `useLayoutEffect` setups, following bottom-up tree order",
          "They run in random order depending on network latency",
          "Parent and child run simultaneously in parallel threads"
        ],
        "correctAnswer": "Child `useLayoutEffect` setups run BEFORE parent `useLayoutEffect` setups, following bottom-up tree order",
        "explanation": "Like all layout and mount lifecycles, child layout effects execute first as the fiber commit phase bubbles up to the parent."
      }
    ]
  },
  {
    "title": "React: useInsertionEffect & CSS-in-JS",
    "description": "Injecting dynamic style tags before layout effects and avoiding recalc cost.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Hooks"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What problem was `useInsertionEffect` specifically created to solve in React 18?",
        "options": [
          "Inserting HTML into iframes securely",
          "Injecting SQL queries into backend microservices",
          "Allowing CSS-in-JS runtime libraries to inject `<style>` tags into the DOM before any `useLayoutEffect` runs, avoiding style recalculation recalculations",
          "Inserting WebAssembly modules into React components"
        ],
        "correctAnswer": "Allowing CSS-in-JS runtime libraries to inject `<style>` tags into the DOM before any `useLayoutEffect` runs, avoiding style recalculation recalculations",
        "explanation": "`useInsertionEffect` fires before any DOM mutations or layout effects, ensuring injected styles are active before layout measurements occur."
      },
      {
        "question": "What happens if a CSS-in-JS library injects rules during `useLayoutEffect` or `useEffect`?",
        "options": [
          "The styles are permanently ignored by the browser",
          "React crashes with an invalid style error",
          "CSS variables become undefined",
          "The browser is forced to invalidate layout and recalculate styles repeatedly during the layout pass, causing severe layout thrashing"
        ],
        "correctAnswer": "The browser is forced to invalidate layout and recalculate styles repeatedly during the layout pass, causing severe layout thrashing",
        "explanation": "Injecting styles while layout effects are reading dimensions causes repeated layout recalculations (thrashing)."
      },
      {
        "question": "Can you read DOM refs or schedule state updates inside `useInsertionEffect`?",
        "options": [
          "No, refs are not yet attached and state updates are explicitly prohibited inside `useInsertionEffect`",
          "Yes, you can read refs but cannot update state",
          "Yes, you can update state but cannot read refs",
          "Yes, all operations are permitted"
        ],
        "correctAnswer": "No, refs are not yet attached and state updates are explicitly prohibited inside `useInsertionEffect`",
        "explanation": "`useInsertionEffect` is strictly scoped for injecting DOM nodes like `<style>` before the DOM is mutated or refs are attached."
      },
      {
        "question": "Who is the intended audience for `useInsertionEffect`?",
        "options": [
          "Every frontend developer building standard UI forms",
          "Library authors building runtime CSS-in-JS styling solutions; application developers should almost never need it",
          "Node.js backend engineers only",
          "Junior developers learning React"
        ],
        "correctAnswer": "Library authors building runtime CSS-in-JS styling solutions; application developers should almost never need it",
        "explanation": "React's documentation explicitly advises that `useInsertionEffect` is reserved for styling libraries (Emotion, styled-components)."
      },
      {
        "question": "What is the execution order between `useInsertionEffect`, `useLayoutEffect`, and `useEffect`?",
        "options": [
          "`useEffect` -> `useLayoutEffect` -> `useInsertionEffect`",
          "`useLayoutEffect` -> `useInsertionEffect` -> `useEffect`",
          "`useInsertionEffect` -> (DOM mutations) -> `useLayoutEffect` -> (Paint) -> `useEffect`",
          "`useInsertionEffect` -> `useEffect` -> `useLayoutEffect`"
        ],
        "correctAnswer": "`useInsertionEffect` -> (DOM mutations) -> `useLayoutEffect` -> (Paint) -> `useEffect`",
        "explanation": "`useInsertionEffect` fires first, then DOM mutations occur, followed by `useLayoutEffect`, browser paint, and finally async `useEffect`."
      }
    ]
  },
  {
    "title": "React: useImperativeHandle & Custom Ref APIs",
    "description": "Encapsulating internal methods and exposing controlled imperative interfaces.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Hooks"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is the primary function of `useImperativeHandle`?",
        "codeSnippet": "useImperativeHandle(ref, () => ({\n  focus: () => inputRef.current.focus(),\n  reset: () => setValue('')\n}));",
        "options": [
          "Creates a direct TCP socket handle",
          "Forces child components to re-render imperatively",
          "Bypasses JavaScript sandboxing",
          "Customizes the instance value exposed to parent components when using a `ref` with `forwardRef`"
        ],
        "correctAnswer": "Customizes the instance value exposed to parent components when using a `ref` with `forwardRef`",
        "explanation": "`useImperativeHandle` lets a child component expose a curated set of methods to a parent ref instead of leaking the raw DOM node."
      },
      {
        "question": "Why is exposing a custom imperative handle safer than exposing the raw underlying DOM node?",
        "options": [
          "It adheres to encapsulation: parents can only invoke permitted methods (e.g. `open()`, `close()`) rather than manipulating arbitrary DOM styles or attributes",
          "It reduces DOM memory consumption by 50%",
          "It prevents Cross-Site Scripting (XSS) automatically",
          "Raw DOM nodes cannot be attached to refs"
        ],
        "correctAnswer": "It adheres to encapsulation: parents can only invoke permitted methods (e.g. `open()`, `close()`) rather than manipulating arbitrary DOM styles or attributes",
        "explanation": "Encapsulation prevents consumers from tightly coupling to inner DOM structure, allowing you to refactor internals safely."
      },
      {
        "question": "Which React wrapper is mandatory when using `useImperativeHandle` on a custom functional component?",
        "codeSnippet": "const Modal = forwardRef((props, ref) => {\n  useImperativeHandle(ref, () => ({ open, close }));\n  return <div>Modal</div>;\n});",
        "options": [
          "`React.memo`",
          "`forwardRef`",
          "`React.lazy`",
          "`createContext`"
        ],
        "correctAnswer": "`forwardRef`",
        "explanation": "Functional components do not accept a `ref` argument unless wrapped in `React.forwardRef`."
      },
      {
        "question": "What does the 3rd argument (dependency array) of `useImperativeHandle` control?",
        "options": [
          "Lists the DOM events to listen to",
          "Defines the CSS transitions for the component",
          "Controls when the factory function re-executes to recreate the exposed handle object",
          "Specifies the HTTP headers for requests"
        ],
        "correctAnswer": "Controls when the factory function re-executes to recreate the exposed handle object",
        "explanation": "Like `useMemo`, the dependency array determines when the handle object is re-instantiated with fresh closure variables."
      },
      {
        "question": "Why should `useImperativeHandle` be used sparingly in idiomatic React applications?",
        "options": [
          "It was deprecated in React 18",
          "It only works on Chrome browsers",
          "It prevents unit tests from running",
          "React emphasizes declarative data flow via props and state; imperative code makes state changes hard to track and reason about"
        ],
        "correctAnswer": "React emphasizes declarative data flow via props and state; imperative code makes state changes hard to track and reason about",
        "explanation": "Imperative mutations break React's declarative paradigm. Most UI state should be driven declaratively through props."
      }
    ]
  },
  {
    "title": "React: useId & Accessible SSR Hydration",
    "description": "Generating collision-free stable IDs across server and client rendering.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Accessibility"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What problem was `useId` designed to solve?",
        "codeSnippet": "const id = useId();\nreturn (\n  <>\n    <label htmlFor={id}>Email</label>\n    <input id={id} type=\"email\" />\n  </>\n);",
        "options": [
          "Generating unique, deterministic IDs that match identically between SSR HTML and client hydration, avoiding hydration mismatch warnings",
          "Generating cryptographic UUIDs for database primary keys",
          "Generating CSS class names for styled-components",
          "Tracking browser cookie session IDs"
        ],
        "correctAnswer": "Generating unique, deterministic IDs that match identically between SSR HTML and client hydration, avoiding hydration mismatch warnings",
        "explanation": "Random IDs (like `Math.random()`) generate different values on server and client, causing hydration mismatches. `useId` produces identical tree-based IDs."
      },
      {
        "question": "How does `useId` formulate its internal ID strings?",
        "options": [
          "By querying the server's database auto-increment sequence",
          "Based on the component's tree position represented as a base-32 sequence flanked by colons (e.g. `:r1:`)",
          "By reading the computer's MAC address",
          "Using timestamp in nanoseconds"
        ],
        "correctAnswer": "Based on the component's tree position represented as a base-32 sequence flanked by colons (e.g. `:r1:`)",
        "explanation": "React assigns IDs based on the hierarchical traversal path within the component tree, ensuring deterministic values across renders."
      },
      {
        "question": "Why should you NOT use `useId` to generate keys in mapped lists?",
        "codeSnippet": "items.map(item => <li key={useId()}>{item.text}</li>) // ANTI-PATTERN",
        "options": [
          "Because `useId` returns numbers which keys cannot be",
          "Because `useId` crashes if called more than once",
          "Keys must be generated from the item's own data identity, and calling hooks inside array iteration violates the Rules of Hooks",
          "Because keys require CSS selectors"
        ],
        "correctAnswer": "Keys must be generated from the item's own data identity, and calling hooks inside array iteration violates the Rules of Hooks",
        "explanation": "Calling hooks inside loops violates hook rules, and list keys must reflect the data item's identity, not the component's tree position."
      },
      {
        "question": "How can you associate multiple related form elements (e.g. input, description, error message) with a single `useId()` call?",
        "codeSnippet": "const id = useId();\nreturn (\n  <>\n    <input aria-describedby={`${id}-hint ${id}-err`} />\n    <span id={`${id}-hint`}>Must be 8 characters</span>\n    <span id={`${id}-err`}>Too short</span>\n  </>\n);",
        "options": [
          "Call `useId()` 3 separate times inside the component",
          "Combine `useId` with `useRef`",
          "Store the ID in a global Redux variable",
          "Call `useId()` once and append suffixes like `${id}-hint` and `${id}-error` for related elements"
        ],
        "correctAnswer": "Call `useId()` once and append suffixes like `${id}-hint` and `${id}-error` for related elements",
        "explanation": "Calling `useId` once and appending suffixes creates grouped, accessible IDs cleanly without generating extra hook slots."
      },
      {
        "question": "What is the `identifierPrefix` option in `ReactDOMClient.createRoot` or `hydrateRoot` used for?",
        "codeSnippet": "createRoot(el, { identifierPrefix: 'app-a-' });",
        "options": [
          "Preventing ID collisions when multiple independent React applications are rendered on the exact same HTML page",
          "Adding a prefix to all CSS class names",
          "Configuring the DNS hostname for API requests",
          "Prefixing local storage keys"
        ],
        "correctAnswer": "Preventing ID collisions when multiple independent React applications are rendered on the exact same HTML page",
        "explanation": "`identifierPrefix` namespaces `useId` generated strings so multiple concurrent React roots on one page never conflict."
      }
    ]
  },
  {
    "title": "React: Automatic Batching & React 18 Queuing",
    "description": "Microtask grouping, flushSync, and cross-context state synchronization.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Internals"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is 'Automatic Batching' introduced in React 18?",
        "codeSnippet": "fetchData().then(() => {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n  // React 18 batches these into 1 single re-render\n});",
        "options": [
          "React batches HTTP network requests into a single TCP packet",
          "React automatically batches all state updates inside promises, setTimeout, and native event handlers into a single re-render",
          "React compiles multiple JSX components into a single file",
          "React aggregates database writes in IndexedDB"
        ],
        "correctAnswer": "React automatically batches all state updates inside promises, setTimeout, and native event handlers into a single re-render",
        "explanation": "Prior to React 18, only React event handlers were batched. React 18 batches all updates across promises, timeouts, and native callbacks."
      },
      {
        "question": "How can you intentionally opt-out of automatic batching to force an immediate synchronous DOM flush?",
        "codeSnippet": "import { flushSync } from 'react-dom';\nflushSync(() => {\n  setCount(c => c + 1);\n});\n// DOM is updated immediately here",
        "options": [
          "Use `setCountSync()`",
          "Pass `{ sync: true }` to `useState`",
          "Wrap the state update in `ReactDOM.flushSync()`",
          "Execute the update inside `requestIdleCallback`"
        ],
        "correctAnswer": "Wrap the state update in `ReactDOM.flushSync()`",
        "explanation": "`flushSync` forces React to flush any pending updates synchronously to the DOM immediately, bypassing batching."
      },
      {
        "question": "When might you legitimately need `flushSync`?",
        "options": [
          "On every button click in the application",
          "When making an HTTP GET request",
          "Inside `useMemo` hooks",
          "When reading layout or scrolling a DOM element immediately after updating state (e.g. auto-scrolling a chat log to the bottom)"
        ],
        "correctAnswer": "When reading layout or scrolling a DOM element immediately after updating state (e.g. auto-scrolling a chat log to the bottom)",
        "explanation": "If you need the real DOM updated synchronously before measuring scroll position or element dimensions, `flushSync` ensures it is rendered."
      },
      {
        "question": "Why should `flushSync` be used very sparingly?",
        "options": [
          "It forces synchronous reconciliation and painting, which hurts responsiveness and de-optimizes React's batching performance",
          "It deletes all component state",
          "It causes React to switch to class components",
          "It triggers browser page reloads"
        ],
        "correctAnswer": "It forces synchronous reconciliation and painting, which hurts responsiveness and de-optimizes React's batching performance",
        "explanation": "Forcing synchronous DOM updates degrades performance and can introduce frame drops if called frequently."
      },
      {
        "question": "What happens if an error is thrown inside a `flushSync` callback?",
        "options": [
          "The error is silently suppressed",
          "React still flushes pending work before rethrowing the error to the caller",
          "The browser process terminates",
          "The entire webpage is replaced with blank white space"
        ],
        "correctAnswer": "React still flushes pending work before rethrowing the error to the caller",
        "explanation": "React will ensure pending state transitions are flushed before escalating the error to the nearest error boundary."
      }
    ]
  },
  {
    "title": "React: Server Components (RSC) Architecture",
    "description": "Zero-bundle size, wire format streams, and client/server boundary contracts.",
    "difficulty": "hard",
    "tags": [
      "React",
      "RSC"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is the primary difference between React Server Components (RSC) and traditional SSR?",
        "options": [
          "SSR components cannot fetch data from databases",
          "RSC requires Python on the client machine",
          "RSC components execute exclusively on the server, never send their JavaScript code to the client bundle, and stream rendered virtual UI in a special JSON-like wire format",
          "SSR produces client-side JavaScript only, with no initial HTML"
        ],
        "correctAnswer": "RSC components execute exclusively on the server, never send their JavaScript code to the client bundle, and stream rendered virtual UI in a special JSON-like wire format",
        "explanation": "Unlike SSR which hydrates JavaScript on the client, RSC executes purely on the server, adding zero bytes to the client JavaScript bundle."
      },
      {
        "question": "What does the `'use client'` directive at the top of a file signify in an RSC framework?",
        "options": [
          "It runs the file inside the user's browser localStorage",
          "It disables server routing",
          "It converts the file to WebAssembly",
          "It marks the boundary between server-only execution and client-interactive code; components in this file and its imports are bundled for the browser"
        ],
        "correctAnswer": "It marks the boundary between server-only execution and client-interactive code; components in this file and its imports are bundled for the browser",
        "explanation": "`'use client'` defines the boundary where client interactivity (state, effects, event listeners) begins; everything outside it remains server-only."
      },
      {
        "question": "Can a React Server Component import and render a Client Component?",
        "options": [
          "Yes, Server Components can import and render Client Components, passing serializable props across the boundary",
          "No, Server Components can only import other Server Components",
          "Only via dynamic `require()` calls",
          "Only if the client component has no props"
        ],
        "correctAnswer": "Yes, Server Components can import and render Client Components, passing serializable props across the boundary",
        "explanation": "Server Components compose Client Components naturally, passing data down as serializable props across the network boundary."
      },
      {
        "question": "How can a Client Component render a Server Component without bundling the Server Component into the client JS?",
        "codeSnippet": "// ClientComp.jsx ('use client')\nexport default function ClientWrapper({ children }) {\n  return <div className=\"box\">{children}</div>;\n}",
        "options": [
          "By importing the server component file directly inside the client component",
          "By passing the Server Component as `children` or JSX slot props from a parent Server Component",
          "By calling `eval()` on the server URL",
          "It is strictly impossible in React"
        ],
        "correctAnswer": "By passing the Server Component as `children` or JSX slot props from a parent Server Component",
        "explanation": "Passing Server Components as children/props allows Client Components to wrap Server UI without importing their code into the client bundle."
      },
      {
        "question": "Which React hooks are strictly forbidden inside React Server Components?",
        "options": [
          "None, all hooks work identically in RSC",
          "`useMemo` and `useCallback` only",
          "`useState`, `useReducer`, and `useEffect`, because Server Components execute once on the server and do not maintain interactive client state",
          "`useId` only"
        ],
        "correctAnswer": "`useState`, `useReducer`, and `useEffect`, because Server Components execute once on the server and do not maintain interactive client state",
        "explanation": "Hooks that manage lifecycle or interactive client state (`useState`, `useEffect`) cannot run in Server Components."
      }
    ]
  },
  {
    "title": "React: Suspense Boundaries for Data Fetching",
    "description": "Suspending on unresolved promises, fallback coordination, and waterfall elimination.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Suspense"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "How does a component communicate to a `<Suspense>` boundary that its data is still loading?",
        "options": [
          "By returning `null` from the render function",
          "By calling `window.suspend()`",
          "By throwing a string containing 'LOADING'",
          "By throwing a Promise during rendering, which the nearest ancestor Suspense boundary catches to display its fallback UI"
        ],
        "correctAnswer": "By throwing a Promise during rendering, which the nearest ancestor Suspense boundary catches to display its fallback UI",
        "explanation": "Suspense relies on throwing a Promise during render. The Suspense boundary catches the promise and awaits its resolution before retrying."
      },
      {
        "question": "What is the benefit of nested Suspense boundaries across different UI sections?",
        "codeSnippet": "<Suspense fallback={<NavSkeleton />}>\n  <Navbar />\n  <Suspense fallback={<FeedSkeleton />}>\n    <Feed />\n  </Suspense>\n</Suspense>",
        "options": [
          "Allows parts of the page to become visible and interactive as soon as their data resolves, without waiting for slower sibling components",
          "Guarantees that components render in alphabetical order",
          "Reduces CSS file size",
          "Eliminates the need for API authentication"
        ],
        "correctAnswer": "Allows parts of the page to become visible and interactive as soon as their data resolves, without waiting for slower sibling components",
        "explanation": "Granular Suspense boundaries stream ready UI independently, preventing slow components from holding back faster parts of the page."
      },
      {
        "question": "What happens if an asynchronous data fetch throws a regular error (like 500 Internal Server Error) instead of a Promise?",
        "options": [
          "The Suspense boundary displays its fallback forever",
          "The Suspense boundary ignores it; the error bubbles up to the nearest Error Boundary",
          "The browser page refreshes",
          "React converts the error into a Promise"
        ],
        "correctAnswer": "The Suspense boundary ignores it; the error bubbles up to the nearest Error Boundary",
        "explanation": "Suspense only catches Promises. True runtime errors or rejections bubble up to the nearest Error Boundary."
      },
      {
        "question": "How does `startTransition` interact with `<Suspense>` when updating state to a new view?",
        "options": [
          "It cancels the data fetch immediately",
          "It replaces the fallback with an empty div",
          "It prevents the screen from dropping back into an existing Suspense fallback/skeleton, keeping the old UI visible until the new data is ready",
          "It hides the browser address bar"
        ],
        "correctAnswer": "It prevents the screen from dropping back into an existing Suspense fallback/skeleton, keeping the old UI visible until the new data is ready",
        "explanation": "`startTransition` avoids undesirable fallback flickers by retaining the current screen until the next suspended screen is fully prepared."
      },
      {
        "question": "What is a 'Suspense Waterfall' and how is it resolved?",
        "options": [
          "A waterfall chart in Chrome DevTools showing CPU usage",
          "An infinite loop of Suspense fallbacks",
          "A CSS layout animation issue",
          "Sequential nested components triggering fetches only after their parents finish rendering; resolved by initiating fetches in parallel or higher up the tree"
        ],
        "correctAnswer": "Sequential nested components triggering fetches only after their parents finish rendering; resolved by initiating fetches in parallel or higher up the tree",
        "explanation": "Waterfalls happen when children wait for parents to resolve before starting their own fetch. Initiating requests in parallel solves this."
      }
    ]
  },
  {
    "title": "React: Hydration Mismatches & Reconciliation Gotchas",
    "description": "SSR HTML vs CSR DOM discrepancies, suppressHydrationWarning, and two-pass rendering.",
    "difficulty": "hard",
    "tags": [
      "React",
      "SSR"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What causes a React 'Hydration Mismatch' warning during SSR?",
        "options": [
          "The HTML markup generated on the server does not match the initial virtual DOM tree generated by the client during its first render pass",
          "The client browser is running an older version of Chrome",
          "The server database is running out of disk space",
          "The CSS stylesheet failed to load over CDN"
        ],
        "correctAnswer": "The HTML markup generated on the server does not match the initial virtual DOM tree generated by the client during its first render pass",
        "explanation": "Hydration expects the client's initial render output to be identical to the server-rendered HTML. Differences trigger mismatch warnings."
      },
      {
        "question": "Which of the following commonly triggers a hydration mismatch?",
        "codeSnippet": "<span>{typeof window !== 'undefined' ? 'Client' : 'Server'}</span>",
        "options": [
          "Rendering plain text strings inside paragraphs",
          "Branching logic based on `typeof window !== 'undefined'`, `localStorage`, or `new Date().toLocaleTimeString()` during initial render",
          "Using SVG elements",
          "Importing external CSS stylesheets"
        ],
        "correctAnswer": "Branching logic based on `typeof window !== 'undefined'`, `localStorage`, or `new Date().toLocaleTimeString()` during initial render",
        "explanation": "Client-only globals or timestamps produce different markup on server vs client. During initial render, server and client outputs must match."
      },
      {
        "question": "How can you safely render client-only UI (like a user's local timezone) without triggering a hydration error?",
        "codeSnippet": "const [isMounted, setIsMounted] = useState(false);\nuseEffect(() => setIsMounted(true), []);\nif (!isMounted) return null;\nreturn <span>{localTime}</span>;",
        "options": [
          "Set `window.ignoreErrors = true`",
          "Wrap the component in `useMemo`",
          "Use a two-pass rendering pattern: render identical generic content on mount, and render client-specific data only after `useEffect` executes",
          "Disable JavaScript on the browser"
        ],
        "correctAnswer": "Use a two-pass rendering pattern: render identical generic content on mount, and render client-specific data only after `useEffect` executes",
        "explanation": "Because `useEffect` only runs on the client after initial hydration, updating state in `useEffect` safely triggers a clean client re-render."
      },
      {
        "question": "When is using `suppressHydrationWarning` on an element justified?",
        "codeSnippet": "<time suppressHydrationWarning>{currentDate}</time>",
        "options": [
          "To silence all hydration warnings across the entire application root",
          "When converting class components to functional components",
          "Whenever using TypeScript",
          "For intentionally volatile text content like current timestamps or dates where subtle second/millisecond differences are expected"
        ],
        "correctAnswer": "For intentionally volatile text content like current timestamps or dates where subtle second/millisecond differences are expected",
        "explanation": "`suppressHydrationWarning={true}` tells React not to warn for timestamps or localized dates on that specific tag (1 level deep)."
      },
      {
        "question": "What does React 18 do when it encounters an unrecoverable hydration mismatch in a subtree?",
        "options": [
          "It discards that subtree's server HTML and falls back to rendering that specific subtree from scratch on the client",
          "It crashes the entire browser tab with a fatal error",
          "It reloads the page in an infinite loop",
          "It switches to plain HTML mode with zero JavaScript"
        ],
        "correctAnswer": "It discards that subtree's server HTML and falls back to rendering that specific subtree from scratch on the client",
        "explanation": "React logs a warning and recovers gracefully by discarding mismatched HTML for that branch and client-rendering it."
      }
    ]
  },
  {
    "title": "React: Profiler API & Performance Diagnostics",
    "description": "onRender callbacks, actualDuration vs baseDuration, and commit phase costs.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Performance"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What does the `<Profiler>` component measure in React?",
        "codeSnippet": "<Profiler id=\"Navigation\" onRender={onRenderCallback}>\n  <Navigation />\n</Profiler>",
        "options": [
          "Network bandwidth consumption of images",
          "The rendering time and commit costs of the wrapped React component tree to identify performance bottlenecks",
          "The file size of the JavaScript bundle",
          "Database query execution times"
        ],
        "correctAnswer": "The rendering time and commit costs of the wrapped React component tree to identify performance bottlenecks",
        "explanation": "The React Profiler collects programmatic metrics on how often and how slowly parts of your component tree render."
      },
      {
        "question": "What is the difference between `actualDuration` and `baseDuration` in the `onRender` callback?",
        "options": [
          "`actualDuration` is in seconds; `baseDuration` is in milliseconds",
          "`baseDuration` includes network latency; `actualDuration` does not",
          "`actualDuration` is time spent rendering the current commit; `baseDuration` estimates the time to render the entire subtree from scratch without memoization",
          "`actualDuration` is measured by the GPU; `baseDuration` is measured by CPU"
        ],
        "correctAnswer": "`actualDuration` is time spent rendering the current commit; `baseDuration` estimates the time to render the entire subtree from scratch without memoization",
        "explanation": "Comparing `actualDuration` against `baseDuration` indicates how effectively `React.memo` and `useMemo` optimizations are skipping work."
      },
      {
        "question": "What does the `phase` argument (`\"mount\"` | `\"update\"`) tell you in `onRender`?",
        "options": [
          "Whether the browser is in dark mode or light mode",
          "Whether the user is logged in",
          "Whether the server is currently compiling code",
          "Whether the subtree just mounted for the first time or re-rendered due to prop, state, or context updates"
        ],
        "correctAnswer": "Whether the subtree just mounted for the first time or re-rendered due to prop, state, or context updates",
        "explanation": "`phase` identifies whether the profile sample represents the initial tree construction (`mount`) or a subsequent re-render (`update`)."
      },
      {
        "question": "Is the `<Profiler>` component enabled by default in production builds of React?",
        "options": [
          "No, profiling is disabled by default in production to eliminate overhead, requiring a special profiling production build",
          "Yes, it runs identically in all environments with zero overhead",
          "It is only enabled on mobile devices",
          "It is only enabled when using Next.js"
        ],
        "correctAnswer": "No, profiling is disabled by default in production to eliminate overhead, requiring a special profiling production build",
        "explanation": "Production builds disable profiling by default for performance; enabling it requires aliasing `react-dom/profiling`."
      },
      {
        "question": "What does the 'Why did this component render?' diagnostic inspect in React DevTools?",
        "options": [
          "The git commit message that introduced the component",
          "The exact props, state, or hooks that changed identity between consecutive renders",
          "The user's mouse coordinates",
          "The browser's operating system version"
        ],
        "correctAnswer": "The exact props, state, or hooks that changed identity between consecutive renders",
        "explanation": "React DevTools highlights which specific prop or state variables differed from the previous render, causing the re-render."
      }
    ]
  },
  {
    "title": "React: Memory Leaks in React Applications",
    "description": "Detached DOM trees, closure retention, event listener leaks, and diagnosis.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Performance"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "How can an uncancelled event listener inside `useEffect` cause a memory leak?",
        "codeSnippet": "useEffect(() => {\n  const handler = () => { /* captures component state */ };\n  window.addEventListener('resize', handler);\n  // Missing cleanup!\n}, []);",
        "options": [
          "The browser runs out of TCP sockets",
          "JavaScript deletes the window object",
          "`window` holds a persistent reference to `handler`, which retains the component's closure scope and all captured state in memory indefinitely",
          "The CPU locks at 100% permanently"
        ],
        "correctAnswer": "`window` holds a persistent reference to `handler`, which retains the component's closure scope and all captured state in memory indefinitely",
        "explanation": "Global references to closures prevent the garbage collector from reclaiming the unmounted component and its retained variables."
      },
      {
        "question": "What is a 'Detached DOM tree' leak in the context of React refs?",
        "options": [
          "DOM nodes without CSS stylesheets",
          "HTML elements that lack closing tags",
          "Elements rendered inside `<iframe />` tags",
          "Holding references to unmounted DOM nodes in global variables or persistent closures after React has removed them from the document"
        ],
        "correctAnswer": "Holding references to unmounted DOM nodes in global variables or persistent closures after React has removed them from the document",
        "explanation": "If JavaScript holds a reference to a DOM node removed from the document, the browser cannot garbage collect that node or any of its ancestors."
      },
      {
        "question": "Why does calling `setState` on an unmounted component no longer produce a console warning in React 18?",
        "options": [
          "The React team removed the warning because in practice it was a false positive for memory leaks (the memory was retained by the promise closure, not the setState call itself)",
          "React 18 automatically cancels all JavaScript promises on unmount",
          "Unmounted components are kept alive forever in React 18",
          "State setters were removed from React 18"
        ],
        "correctAnswer": "The React team removed the warning because in practice it was a false positive for memory leaks (the memory was retained by the promise closure, not the setState call itself)",
        "explanation": "The old warning led developers to add hacky `isMounted` checks which hid the real leak (the uncancelled promise/subscription closure itself)."
      },
      {
        "question": "How can you detect memory leaks in a React single-page application using Chrome DevTools?",
        "options": [
          "Check the Network tab for 404 errors",
          "Take a Heap Snapshot, perform the action and navigate away multiple times, take another Snapshot, and inspect Objects retained by unmounted Fiber nodes",
          "Inspect CSS stylesheets in the Elements tab",
          "Run `console.clear()`"
        ],
        "correctAnswer": "Take a Heap Snapshot, perform the action and navigate away multiple times, take another Snapshot, and inspect Objects retained by unmounted Fiber nodes",
        "explanation": "Comparing Heap Snapshots before and after mounting/unmounting components reveals whether Fiber nodes or DOM elements are leaking."
      },
      {
        "question": "What is an effective pattern for managing WebSocket subscriptions in React to prevent leaks?",
        "codeSnippet": "useEffect(() => {\n  const socket = new WebSocket(url);\n  socket.onmessage = handleMsg;\n  return () => socket.close();\n}, [url]);",
        "options": [
          "Open the socket on `window` and never close it",
          "Store socket messages in localStorage",
          "Always close the socket connection and detach event listeners in the `useEffect` cleanup return function",
          "Use HTTP polling instead of WebSockets"
        ],
        "correctAnswer": "Always close the socket connection and detach event listeners in the `useEffect` cleanup return function",
        "explanation": "Closing connections during cleanup ensures resources and sockets are terminated when components unmount."
      }
    ]
  },
  {
    "title": "React: Custom React Renderers & Reconciler",
    "description": "Host config methods, react-reconciler, and non-DOM platform targets.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Internals"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What npm package allows developers to create custom React renderers for platforms other than the browser DOM?",
        "options": [
          "`react-dom`",
          "`react-native-compiler`",
          "`babel-plugin-react`",
          "`react-reconciler`"
        ],
        "correctAnswer": "`react-reconciler`",
        "explanation": "`react-reconciler` contains React's Fiber reconciliation engine and allows defining a custom 'Host Config' for any rendering target (Canvas, Terminal, 3D)."
      },
      {
        "question": "What is the 'Host Config' in a custom React reconciler?",
        "options": [
          "An object containing platform-specific lifecycle methods like `createInstance`, `appendInitialChild`, `commitUpdate`, and `removeChild`",
          "A JSON file containing AWS server credentials",
          "The webpack configuration for bundling",
          "The Docker container settings for React"
        ],
        "correctAnswer": "An object containing platform-specific lifecycle methods like `createInstance`, `appendInitialChild`, `commitUpdate`, and `removeChild`",
        "explanation": "The Host Config bridges Fiber's abstract virtual operations with platform-specific commands (e.g. creating Three.js objects or terminal strings)."
      },
      {
        "question": "Which of the following popular open-source projects is built as a custom React renderer?",
        "options": [
          "`lodash` and `moment`",
          "`react-three-fiber` (Three.js WebGL) and `ink` (Interactive CLI interfaces)",
          "`axios` and `express`",
          "`docker` and `kubernetes`"
        ],
        "correctAnswer": "`react-three-fiber` (Three.js WebGL) and `ink` (Interactive CLI interfaces)",
        "explanation": "Both `react-three-fiber` (rendering to Three.js scenes) and `ink` (rendering to CLI terminal boxes) are custom reconcilers built with `react-reconciler`."
      },
      {
        "question": "What does the `createInstance(type, props)` method in a host config do?",
        "options": [
          "Initializes a new React hook slot",
          "Spawns a new Node.js server process",
          "Instantiates a platform-specific host element (e.g. `document.createElement(type)` in DOM or `new THREE.Mesh()` in WebGL)",
          "Compiles JSX into bytecode"
        ],
        "correctAnswer": "Instantiates a platform-specific host element (e.g. `document.createElement(type)` in DOM or `new THREE.Mesh()` in WebGL)",
        "explanation": "`createInstance` is invoked whenever Fiber encounters a host JSX element type (like `'div'` or `'mesh'`) to create the native target object."
      },
      {
        "question": "What is the distinction between 'mutation' and 'persistence' modes in `react-reconciler`?",
        "options": [
          "Mutation mode stores state in cookies; persistence mode stores state in IndexedDB",
          "Mutation mode runs in Web Workers; persistence mode runs on the server",
          "Mutation mode is deprecated in React 18",
          "Mutation mode mutates existing host nodes in-place (like browser DOM); persistence mode treats trees as immutable, cloning nodes on every update (like iOS CoreAnimation)"
        ],
        "correctAnswer": "Mutation mode mutates existing host nodes in-place (like browser DOM); persistence mode treats trees as immutable, cloning nodes on every update (like iOS CoreAnimation)",
        "explanation": "Renderers can choose mutation mode (`appendChild`, `removeChild`) or persistence mode (cloning modified subtrees)."
      }
    ]
  },
  {
    "title": "React: Micro-Frontend Architecture with React",
    "description": "Webpack Module Federation, shared dependencies, and isolated roots.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Architecture"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is a 'Micro-Frontend' architecture in modern frontend engineering?",
        "options": [
          "Decomposing a large frontend monolith into smaller, independently developed, tested, and deployed applications that compose together into a single user experience",
          "Writing React apps exclusively on smartwatches",
          "Minifying React components under 1 kilobyte",
          "Rendering React exclusively inside Web Workers"
        ],
        "correctAnswer": "Decomposing a large frontend monolith into smaller, independently developed, tested, and deployed applications that compose together into a single user experience",
        "explanation": "Micro-frontends allow cross-functional teams to own and deploy features independently without coordinating a monolithic deployment."
      },
      {
        "question": "How does Webpack Module Federation facilitate React micro-frontends?",
        "options": [
          "It translates React into Angular at build time",
          "It allows an application to dynamically load compiled JavaScript modules and React components from remote hosts at runtime while sharing singleton dependencies like `react` and `react-dom`",
          "It compiles React into an Electron desktop app",
          "It acts as a CDN proxy for image assets"
        ],
        "correctAnswer": "It allows an application to dynamically load compiled JavaScript modules and React components from remote hosts at runtime while sharing singleton dependencies like `react` and `react-dom`",
        "explanation": "Module Federation dynamically loads remote code at runtime and shares common libraries (like React) as singletons to prevent duplicate bundles."
      },
      {
        "question": "Why is it critical that `react` and `react-dom` are configured as shared singletons in Module Federation (`singleton: true`)?",
        "options": [
          "Browsers reject loading two scripts with the same file name",
          "Duplicate React libraries exceed the 100MB browser RAM limit",
          "Loading two distinct copies of React in the same browser window breaks React's internal context and hooks dispatcher, causing fatal runtime crashes",
          "React licensing prohibits running more than one instance per page"
        ],
        "correctAnswer": "Loading two distinct copies of React in the same browser window breaks React's internal context and hooks dispatcher, causing fatal runtime crashes",
        "explanation": "Hooks rely on a global dispatcher pointer. Two copies of React cause hooks to reference the wrong dispatcher, throwing 'Invalid Hook Call' errors."
      },
      {
        "question": "How can cross-micro-frontend communication be handled cleanly without tight coupling?",
        "options": [
          "By directly reading and writing to each other's private internal React state",
          "By querying the database directly from the browser",
          "By modifying the React Fiber prototype",
          "Via standard browser CustomEvents, a lightweight shared event bus, or URL query parameters"
        ],
        "correctAnswer": "Via standard browser CustomEvents, a lightweight shared event bus, or URL query parameters",
        "explanation": "Decoupled communication using browser-native CustomEvents or URL parameters prevents micro-frontends from becoming tightly coupled."
      },
      {
        "question": "What is a major trade-off or risk of adopting a Micro-Frontend architecture?",
        "options": [
          "Increased operational and tooling complexity, potential performance overhead from multiple network bundles, and CSS styling collisions",
          "Inability to use CSS Grid or Flexbox",
          "Browser refusal to run more than one JavaScript file",
          "Complete loss of TypeScript support"
        ],
        "correctAnswer": "Increased operational and tooling complexity, potential performance overhead from multiple network bundles, and CSS styling collisions",
        "explanation": "Micro-frontends introduce operational complexity, version drift, potential styling conflicts, and bundle duplication if not governed strictly."
      }
    ]
  },
  {
    "title": "React: State Machine Pattern with XState in React",
    "description": "Finite states, declarative transitions, and eliminating impossible states.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Design Patterns"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is an 'impossible UI state' that Finite State Machines (FSM) prevent?",
        "codeSnippet": "// Impossible state:\n{ isLoading: true, isSuccess: true, isError: true }",
        "options": [
          "A state where numbers become strings",
          "Conflicting boolean flags simultaneously being true (e.g. `isLoading && isError && isSuccess`), causing contradictory UI renderings",
          "A component rendering without an HTML tag",
          "An infinite loop in CSS transitions"
        ],
        "correctAnswer": "Conflicting boolean flags simultaneously being true (e.g. `isLoading && isError && isSuccess`), causing contradictory UI renderings",
        "explanation": "Boolean flag proliferation often leads to invalid combinations. State machines guarantee the system can only ever be in exactly one state at a time."
      },
      {
        "question": "What are the core components of a Finite State Machine?",
        "options": [
          "A database, a web server, and a client browser",
          "A reducer, an action, and a dispatch function",
          "A finite number of states, an initial state, a set of defined events, and deterministic transitions between states based on those events",
          "A HTML form, an input field, and a submit button"
        ],
        "correctAnswer": "A finite number of states, an initial state, a set of defined events, and deterministic transitions between states based on those events",
        "explanation": "An FSM is defined by finite states, events, and explicit transition rules that define which state follows an event."
      },
      {
        "question": "What hook does `@xstate/react` provide to consume state machines in React functional components?",
        "codeSnippet": "const [state, send] = useMachine(toggleMachine);",
        "options": [
          "`useStateMachine`",
          "`useFSM`",
          "`useTransitionState`",
          "`useMachine`"
        ],
        "correctAnswer": "`useMachine`",
        "explanation": "`useMachine` initializes and runs an XState machine within a React component, providing the current state and an event dispatcher (`send`)."
      },
      {
        "question": "What is the difference between 'state value' and 'context' in an XState machine?",
        "options": [
          "'State value' represents the finite state (e.g. `'idle'`, `'loading'`, `'success'`), while 'context' represents extended, quantitative data (e.g. user objects, counters)",
          "'Context' is the React Context API; 'State value' is useState",
          "'State value' is stored on the server; 'context' is client-only",
          "There is no difference; they are interchangeable synonyms"
        ],
        "correctAnswer": "'State value' represents the finite state (e.g. `'idle'`, `'loading'`, `'success'`), while 'context' represents extended, quantitative data (e.g. user objects, counters)",
        "explanation": "State values handle discrete finite states, while context stores quantitative auxiliary data associated with the machine."
      },
      {
        "question": "Why does the State Machine pattern make complex multi-step forms or wizards easier to maintain?",
        "options": [
          "It eliminates the need for HTML inputs",
          "All valid paths and transitions are declared explicitly in a state chart, preventing users from skipping steps or entering undefined states",
          "It automatically saves form data to PostgreSQL without a backend",
          "It speeds up JavaScript execution by 200%"
        ],
        "correctAnswer": "All valid paths and transitions are declared explicitly in a state chart, preventing users from skipping steps or entering undefined states",
        "explanation": "Explicit state transitions prevent invalid step progressions and provide visual diagrams that mirror business logic."
      }
    ]
  },
  {
    "title": "React: Virtualization & Infinite Windowing",
    "description": "DOM recycling, viewport overscan math, and 100,000-row list scalability.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Performance"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is 'List Virtualization' (or Windowing) in React?",
        "options": [
          "Rendering the list inside a Virtual Machine in the cloud",
          "Converting list data into WebGL textures",
          "Only rendering the subset of list items currently visible within the user's viewport (plus a small buffer), recycling DOM nodes as the user scrolls",
          "Running the list inside an iframe"
        ],
        "correctAnswer": "Only rendering the subset of list items currently visible within the user's viewport (plus a small buffer), recycling DOM nodes as the user scrolls",
        "explanation": "Windowing creates DOM elements only for items within the visible scroll window, keeping the DOM light even for 100,000+ items."
      },
      {
        "question": "What happens to browser performance when rendering 50,000 DOM nodes without virtualization?",
        "options": [
          "The browser instantly formats the hard drive",
          "JavaScript syntax errors in the console",
          "CSS animations run at 120fps",
          "Huge memory footprint, sluggish scrolling, high layout calculation times, and major frame drops during user interaction"
        ],
        "correctAnswer": "Huge memory footprint, sluggish scrolling, high layout calculation times, and major frame drops during user interaction",
        "explanation": "Tens of thousands of real DOM nodes overwhelm browser layout engines and garbage collectors, degrading performance."
      },
      {
        "question": "What is the purpose of 'overscan' in virtualized lists like `react-window`?",
        "codeSnippet": "<FixedSizeList overscanCount={5} ... />",
        "options": [
          "Renders a small buffer of items just above and below the visible viewport to prevent blank white flashes during rapid scrolling",
          "Scans images for malware before rendering",
          "Scales down font sizes on high-DPI displays",
          "Pre-renders audio files"
        ],
        "correctAnswer": "Renders a small buffer of items just above and below the visible viewport to prevent blank white flashes during rapid scrolling",
        "explanation": "Overscan ensures items just beyond the visible screen are pre-rendered so fast scrolling displays content seamlessly."
      },
      {
        "question": "How does a virtualized list maintain the appearance of a massive scrollable area with only 10 DOM elements?",
        "codeSnippet": "<div style={{ height: totalItems * itemHeight, position: 'relative' }}>\n  {visibleItems.map(item => (\n    <div style={{ position: 'absolute', top: item.index * itemHeight }}>...</div>\n  ))}\n</div>",
        "options": [
          "By zooming the browser viewport out to 1%",
          "An outer wrapper div is sized to the full phantom height (`totalCount * itemHeight`), and visible child nodes are positioned absolutely using `top` offsets",
          "By continuously resizing the browser window",
          "Using SVG path clipping"
        ],
        "correctAnswer": "An outer wrapper div is sized to the full phantom height (`totalCount * itemHeight`), and visible child nodes are positioned absolutely using `top` offsets",
        "explanation": "The phantom container creates the full native scrollbar height, while absolutely positioned visible elements move to match the scroll position."
      },
      {
        "question": "Why is virtualizing dynamic, variable-height items harder than fixed-height items?",
        "options": [
          "Variable-height elements are unsupported in HTML5",
          "CSS flexbox breaks when heights vary",
          "The height of each item cannot be known until it is rendered in the DOM, requiring measurement caches and position offset recalculations",
          "React cannot calculate fractions"
        ],
        "correctAnswer": "The height of each item cannot be known until it is rendered in the DOM, requiring measurement caches and position offset recalculations",
        "explanation": "Variable heights require measuring real DOM heights dynamically, caching them, and recalculating cumulative scroll offsets."
      }
    ]
  },
  {
    "title": "React: Immutable Data Structures & Structural Sharing",
    "description": "Referential stability, Immer proxies, and avoiding accidental deep clones.",
    "difficulty": "hard",
    "tags": [
      "React",
      "Performance"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is 'Structural Sharing' in immutable data libraries like Immer or Immutable.js?",
        "options": [
          "Sharing state variables across different browser tabs via WebSockets",
          "Compressing JSON objects using gzip",
          "Converting objects to binary buffers",
          "Unchanged branches of a data tree are reused by reference in the new state, and only modified nodes and their direct ancestors are cloned"
        ],
        "correctAnswer": "Unchanged branches of a data tree are reused by reference in the new state, and only modified nodes and their direct ancestors are cloned",
        "explanation": "Structural sharing avoids deep cloning unchanged parts of a tree, maximizing memory efficiency and enabling fast `===` equality checks."
      },
      {
        "question": "How does Immer's `produce` function allow intuitive state mutations while preserving immutability?",
        "codeSnippet": "const nextState = produce(state, draft => {\n  draft.users[0].name = 'Alice';\n});",
        "options": [
          "It wraps the state in JavaScript `Proxy` objects that record mutations to a 'draft', generating a brand new structurally-shared immutable object at the end",
          "It freezes the entire operating system memory",
          "It converts the object to a string and uses regular expressions",
          "It transpiles JavaScript into WebAssembly"
        ],
        "correctAnswer": "It wraps the state in JavaScript `Proxy` objects that record mutations to a 'draft', generating a brand new structurally-shared immutable object at the end",
        "explanation": "Immer uses ES6 Proxies to intercept mutations on a draft object, producing a copy with minimal structural modifications."
      },
      {
        "question": "Why does `JSON.parse(JSON.stringify(state))` perform poorly for immutable updates?",
        "options": [
          "It crashes on any string longer than 100 characters",
          "It creates deep clones of every single object regardless of whether it changed, breaks referential equality for all memoized components, and loses Date/Function/Map types",
          "It cannot parse arrays",
          "It makes an asynchronous HTTP request to JSON servers"
        ],
        "correctAnswer": "It creates deep clones of every single object regardless of whether it changed, breaks referential equality for all memoized components, and loses Date/Function/Map types",
        "explanation": "Deep cloning wipes referential equality across the entire object tree (forcing every memoized child to re-render) and strips unsupported data types."
      },
      {
        "question": "How does structural sharing directly optimize `React.memo` performance?",
        "options": [
          "It compiles components to C++ binaries",
          "It eliminates the need for keys in lists",
          "Components whose props reference unchanged branches retain identical object references (`prevProps.item === nextProps.item`), allowing `React.memo` to skip re-renders",
          "It prevents the browser from garbage collecting"
        ],
        "correctAnswer": "Components whose props reference unchanged branches retain identical object references (`prevProps.item === nextProps.item`), allowing `React.memo` to skip re-renders",
        "explanation": "Because unchanged branches keep their exact memory address, shallow equality checks (`===`) pass immediately without deep comparisons."
      },
      {
        "question": "What happens if you accidentally mutate a draft outside of Immer's `produce` block?",
        "options": [
          "The browser tab closes immediately",
          "React logs a warning and formats the computer disk",
          "The mutation is sent to GitHub as a pull request",
          "Immer freezes state objects with `Object.freeze` in development, throwing a TypeError if mutated directly outside `produce`"
        ],
        "correctAnswer": "Immer freezes state objects with `Object.freeze` in development, throwing a TypeError if mutated directly outside `produce`",
        "explanation": "Immer freezes produced states in development to guarantee immutability and catch accidental direct mutations immediately."
      }
    ]
  }
];
