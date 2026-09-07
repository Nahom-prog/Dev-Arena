export const reactVeryHardQuizzes = [
  {
    "title": "React: Fiber WorkLoop Internals & Traversal",
    "description": "Deep dive into beginWork, completeWork, performUnitOfWork, and stack unwinding.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Internals"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What does `beginWork(current, workInProgress, renderLanes)` return in the Fiber work loop?",
        "options": [
          "The first child Fiber node to be processed next, or `null` if the current fiber has no children or bails out",
          "The real HTML DOM node created for that fiber",
          "A Promise resolving to the next animation frame",
          "A bitmask integer representing pending errors"
        ],
        "correctAnswer": "The first child Fiber node to be processed next, or `null` if the current fiber has no children or bails out",
        "explanation": "`beginWork` processes the fiber (executing component functions or diffing children) and returns the next child fiber to descend into."
      },
      {
        "question": "When a fiber has no more children (`beginWork` returns `null`), what function is invoked to ascend back up the tree?",
        "options": [
          "`commitRoot(root)` immediately",
          "`completeWork(current, workInProgress, renderLanes)` and traversal to `workInProgress.sibling`",
          "`abortRender(fiber)`",
          "`requestIdleCallback()`"
        ],
        "correctAnswer": "`completeWork(current, workInProgress, renderLanes)` and traversal to `workInProgress.sibling`",
        "explanation": "When a branch reaches a leaf, React calls `completeWork` on that fiber, checks for a sibling, or ascends up to `fiber.return`."
      },
      {
        "question": "What primary task is performed inside `completeWork` for host component fibers (e.g. `'div'`) during initial mount?",
        "options": [
          "Painting pixels directly to the physical display",
          "Transpiling JSX strings using Babel in a worker",
          "Instantiating the actual DOM node via the host config (`createInstance`) and appending child DOM nodes (`appendAllChildren`)",
          "Committing the transaction to IndexedDB"
        ],
        "correctAnswer": "Instantiating the actual DOM node via the host config (`createInstance`) and appending child DOM nodes (`appendAllChildren`)",
        "explanation": "In `completeWork` on initial mount, host fibers create their real DOM instances and assemble their initial DOM subtrees offscreen."
      },
      {
        "question": "What does the `unwindWork` routine do when an exception is thrown inside `beginWork` or `completeWork`?",
        "options": [
          "Instantly reloads the browser window",
          "Clears the browser's V8 heap memory",
          "Discards all DOM elements on the page",
          "Unwinds the Fiber stack upward, searching for the nearest ancestor Fiber with the `ClassComponent` or `SuspenseComponent` tag capable of handling the error/promise"
        ],
        "correctAnswer": "Unwinds the Fiber stack upward, searching for the nearest ancestor Fiber with the `ClassComponent` or `SuspenseComponent` tag capable of handling the error/promise",
        "explanation": "`unwindWork` pops fibers off the work stack looking for an error boundary or suspense handler to capture the thrown value."
      },
      {
        "question": "Why does the Fiber work loop keep `workInProgress` in a module-scoped variable rather than passing it recursively on the call stack?",
        "options": [
          "To allow the loop to be paused at any unit of work, yield execution back to the browser event loop, and resume at the exact same fiber node later",
          "To bypass JavaScript variable scoping rules",
          "Because recursive functions are illegal in ECMAScript modules",
          "To share the work progress with other browser tabs"
        ],
        "correctAnswer": "To allow the loop to be paused at any unit of work, yield execution back to the browser event loop, and resume at the exact same fiber node later",
        "explanation": "Module-scoped pointers enable cooperative multi-tasking without depending on the JavaScript call stack, making rendering interruptible."
      }
    ]
  },
  {
    "title": "React: Custom Hook Linters & Compiler AST Transform",
    "description": "AST scope analysis in eslint-plugin-react-hooks and automatic memoization compilers.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Compilers"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How does `eslint-plugin-react-hooks` detect missing dependencies in a `useEffect` hook via AST analysis?",
        "options": [
          "It executes the hook in a headless browser during linting",
          "It analyzes the ESLint Scope Manager references within the hook's callback closure and flags any variable declared in the component body that is not in the dependency array",
          "It compares string lengths of function bodies",
          "It checks git blame logs for modified variables"
        ],
        "correctAnswer": "It analyzes the ESLint Scope Manager references within the hook's callback closure and flags any variable declared in the component body that is not in the dependency array",
        "explanation": "The rule traverses the hook callback's AST closure scope, finding variables referencing the outer component function scope and verifying them against the deps array."
      },
      {
        "question": "What is the core breakthrough of the React Compiler (formerly React Forget)?",
        "options": [
          "It compiles JavaScript into native C++ binaries running on WebAssembly",
          "It replaces the Virtual DOM with direct WebGL shaders",
          "It automatically injects fine-grained memoization into component ASTs at build time, eliminating the need for manual `useMemo`, `useCallback`, and `React.memo`",
          "It removes all state from React components"
        ],
        "correctAnswer": "It automatically injects fine-grained memoization into component ASTs at build time, eliminating the need for manual `useMemo`, `useCallback`, and `React.memo`",
        "explanation": "React Compiler analyzes component data flows and automatically synthesizes memoization blocks, freeing developers from manual dependency tracking."
      },
      {
        "question": "What language invariant does the React Compiler rely on to safely memoize values?",
        "options": [
          "All files must be written in TypeScript with 100% strict types",
          "Components must never use HTML elements",
          "State can only be mutated using pointer arithmetic",
          "Components and hooks must be pure functions with respect to inputs (props/state/context) and adhere strictly to the Rules of React"
        ],
        "correctAnswer": "Components and hooks must be pure functions with respect to inputs (props/state/context) and adhere strictly to the Rules of React",
        "explanation": "Automated compiler memoization requires pure render functions; unexpected side-effects or direct prop/state mutations invalidate optimization assumptions."
      },
      {
        "question": "Why does `eslint-plugin-react-hooks` disallow calling hooks inside nested functions or if-statements?",
        "options": [
          "React relies on a fixed, deterministic call order of hooks to match each hook call with its corresponding entry in the Fiber's `memoizedState` linked list",
          "JavaScript engines reject nested function declarations in ES6",
          "V8 garbage collector throws errors on dynamic function calls",
          "It causes infinite network requests"
        ],
        "correctAnswer": "React relies on a fixed, deterministic call order of hooks to match each hook call with its corresponding entry in the Fiber's `memoizedState` linked list",
        "explanation": "Hooks are stored as nodes in a singly linked list on the fiber. Any deviation in hook call order desynchronizes internal state slots."
      },
      {
        "question": "How does the React Compiler represent memoization internally in generated output?",
        "codeSnippet": "const $ = _c(4); // Memo cache array slot",
        "options": [
          "It creates dynamic Redux stores for each variable",
          "It allocates a flat memo cache array (`_c(size)`) per component and checks slot guards to reuse cached values",
          "It saves calculations to localStorage",
          "It creates hidden DOM `<meta>` tags with JSON payloads"
        ],
        "correctAnswer": "It allocates a flat memo cache array (`_c(size)`) per component and checks slot guards to reuse cached values",
        "explanation": "React Compiler uses a lightweight indexed cache (`$ = _c(N)`) where guard checks verify whether inputs changed before reusing slot results."
      }
    ]
  },
  {
    "title": "React: RSC Flight Wire Protocol Internals",
    "description": "Chunk format parsing, module references ($L/$M), and binary streaming serialization.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "RSC"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is the format of the React Flight wire stream produced by React Server Components?",
        "options": [
          "A binary protobuf stream requiring gRPC client decoding",
          "Standard base64-encoded HTML strings",
          "A line-delimited stream of chunks where each line consists of an ID, a type code (e.g. `J` for JSON/JSX tree, `M` for Client Module reference, `S` for Symbol), and a payload",
          "A zip archive containing Webpack bundles"
        ],
        "correctAnswer": "A line-delimited stream of chunks where each line consists of an ID, a type code (e.g. `J` for JSON/JSX tree, `M` for Client Module reference, `S` for Symbol), and a payload",
        "explanation": "Flight chunks are row-based text strings (e.g., `1:I[\"./Button.js\",[\"default\"],\"\"]\n0:{\"name\":\"$1\"}`). They stream incremental JSX trees and module references."
      },
      {
        "question": "How does the Flight protocol represent a Client Component reference when serialized by the server?",
        "codeSnippet": "1:M{\"id\":\"./src/Counter.client.js\",\"name\":\"default\"}",
        "options": [
          "By compiling the client component into a WebAssembly binary string",
          "By evaluating the component to static HTML and discarding client interactivity",
          "By sending the raw component TypeScript source code",
          "As a module reference chunk (containing the client bundle file URL/chunk ID and export name) rather than the component's implementation code"
        ],
        "correctAnswer": "As a module reference chunk (containing the client bundle file URL/chunk ID and export name) rather than the component's implementation code",
        "explanation": "Flight never serializes client code; it emits a reference telling the client's module bundler which client chunk to dynamically load and mount."
      },
      {
        "question": "What happens when a Server Component returns an unresolved Promise in the Flight protocol?",
        "options": [
          "The Flight stream emits a placeholder row and continues streaming other components; once the Promise resolves, it streams the resolved chunk referencing the placeholder ID",
          "The server connection is held closed until all promises finish before sending any data",
          "The server aborts and throws a 500 error",
          "The client browser is instructed to execute the Promise locally"
        ],
        "correctAnswer": "The Flight stream emits a placeholder row and continues streaming other components; once the Promise resolves, it streams the resolved chunk referencing the placeholder ID",
        "explanation": "Flight streams out-of-order chunks as promises resolve, allowing client Suspense boundaries to resolve independently without blocking."
      },
      {
        "question": "Can native JavaScript `Map`, `Set`, and `BigInt` types be serialized over the Flight protocol?",
        "options": [
          "No, Flight only supports strings and booleans",
          "Yes, Flight includes native serializers and revivers for `Map`, `Set`, `BigInt`, `Date`, and Promises, unlike standard `JSON.stringify`",
          "Only if converted to XML first",
          "No, Flight throws a TypeError on any non-object"
        ],
        "correctAnswer": "Yes, Flight includes native serializers and revivers for `Map`, `Set`, `BigInt`, `Date`, and Promises, unlike standard `JSON.stringify`",
        "explanation": "React Flight features custom serialization tags for advanced JavaScript primitives (Dates, Maps, Sets, TypedArrays, BigInt) across the wire."
      },
      {
        "question": "Why can functions (like `onClick`) NOT be passed as props from a Server Component to a Client Component?",
        "options": [
          "Because JavaScript functions are always larger than 1MB",
          "Because HTTP headers do not allow functions",
          "Arbitrary JavaScript functions cannot be safely serialized and revived over the network boundary without introducing security risks or closing over server memory",
          "Because browsers forbid event listeners on client components"
        ],
        "correctAnswer": "Arbitrary JavaScript functions cannot be safely serialized and revived over the network boundary without introducing security risks or closing over server memory",
        "explanation": "Closures cannot be serialized across network boundaries. Only serializable data or dedicated Server Actions can cross the boundary."
      }
    ]
  },
  {
    "title": "React: Concurrent Lanes Bitmask Math & Prioritization",
    "description": "32-bit bitmasks, lane merging, starvation detection, and EntangledLanes.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Internals"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "Why does React use 32-bit bitwise integers for Lanes instead of numeric priority numbers (1, 2, 3)?",
        "options": [
          "Because JavaScript numbers only have 32 bits of total precision",
          "Because V8 disables numeric comparisons inside loops",
          "To reduce JSON file sizes",
          "Bitmasks allow expressing sets of multiple priority lanes simultaneously and performing ultra-fast subset checks and merges using bitwise operators (`&`, `|`, `~`)"
        ],
        "correctAnswer": "Bitmasks allow expressing sets of multiple priority lanes simultaneously and performing ultra-fast subset checks and merges using bitwise operators (`&`, `|`, `~`)",
        "explanation": "Bitmasks enable instant set operations: `lanes & priority`, `lanes | newLane`, and finding the highest-priority lane with `lanes & -lanes`."
      },
      {
        "question": "What does the bitwise expression `lanes & -lanes` return in React's lane scheduler?",
        "options": [
          "The lowest set bit (the single highest-priority lane in the bitmask)",
          "The bitwise inversion of all lanes",
          "Zero always",
          "A random lane chosen by the scheduler"
        ],
        "correctAnswer": "The lowest set bit (the single highest-priority lane in the bitmask)",
        "explanation": "In two's complement binary math, `x & -x` extracts the lowest set bit, which React assigns to the highest priority work unit."
      },
      {
        "question": "How does React prevent 'starvation' of low-priority transition lanes when urgent updates keep arriving continuously?",
        "options": [
          "React drops urgent updates after 100ms",
          "React tracks the `eventTimes` and expiration timestamps of pending lanes; if a lane expires without running, it is promoted to the urgent `ExpiredLanes` lane and executed synchronously",
          "React crashes the tab to reset memory",
          "React runs low-priority work in WebGL"
        ],
        "correctAnswer": "React tracks the `eventTimes` and expiration timestamps of pending lanes; if a lane expires without running, it is promoted to the urgent `ExpiredLanes` lane and executed synchronously",
        "explanation": "Expiration timers guarantee that background transition updates cannot be postponed indefinitely; once expired, they execute synchronously."
      },
      {
        "question": "What are 'Entangled Lanes' in React Fiber?",
        "options": [
          "Lanes that cause quantum entanglement in server hardware",
          "Lanes that have failed due to syntax errors",
          "Lanes that share state updates or transitions that must be rendered and committed together atomically (e.g. parallel transitions sharing a suspense boundary)",
          "Lanes reserved exclusively for class component lifecycles"
        ],
        "correctAnswer": "Lanes that share state updates or transitions that must be rendered and committed together atomically (e.g. parallel transitions sharing a suspense boundary)",
        "explanation": "Entangled lanes group related updates together so React never commits one without the other, avoiding inconsistent intermediate UI."
      },
      {
        "question": "Which lane has the absolute highest priority in React's Lanes hierarchy?",
        "options": [
          "`TransitionLane`",
          "`OffscreenLane`",
          "`IdleLane`",
          "`SyncLane` (representing discrete synchronous user actions like clicks or input changes in non-concurrent mode)"
        ],
        "correctAnswer": "`SyncLane` (representing discrete synchronous user actions like clicks or input changes in non-concurrent mode)",
        "explanation": "`SyncLane` (`0b0000000000000000000000000000001`) has the highest priority and is committed immediately without time-slicing."
      }
    ]
  },
  {
    "title": "React: Context Propagation Mechanics in Fiber",
    "description": "calculateChangedBits, propagation down child fiber chains, and bailout traps.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Internals"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "When a Context Provider's value changes, how does React locate and mark consumer components for re-rendering?",
        "options": [
          "React calls `propagateContextChange`, traversing down the provider's child Fiber tree and checking each fiber's `dependencies` list for a matching context reference, marking matching fibers with update lanes",
          "React uses a global pub/sub dictionary that calls component callback functions directly",
          "React triggers a browser `window.dispatchEvent`",
          "React unmounts and remounts the entire subtree below the provider"
        ],
        "correctAnswer": "React calls `propagateContextChange`, traversing down the provider's child Fiber tree and checking each fiber's `dependencies` list for a matching context reference, marking matching fibers with update lanes",
        "explanation": "`propagateContextChange` scans down the fiber tree, inspecting each fiber's `dependencies` list and scheduling work on any consumer matching the context."
      },
      {
        "question": "Can an intermediate component wrapped in `React.memo` or returning false in `shouldComponentUpdate` block a descendant `useContext` update?",
        "options": [
          "Yes, `React.memo` stops all context updates from reaching children",
          "No, `propagateContextChange` marks the child consumer fiber directly, bypassing intermediate memoized bailout boundaries",
          "Only in React 16, but not React 17",
          "Yes, if the intermediate component returns null"
        ],
        "correctAnswer": "No, `propagateContextChange` marks the child consumer fiber directly, bypassing intermediate memoized bailout boundaries",
        "explanation": "Context consumers receive updates directly through Fiber dependency tracking, cutting through intermediate memoized components."
      },
      {
        "question": "Where does a Fiber node store the contexts it currently subscribes to?",
        "codeSnippet": "fiber.dependencies = { firstContext: ..., lanes: ... };",
        "options": [
          "In the `fiber.stateNode` DOM property",
          "In a global Map keyed by component name",
          "On the `fiber.dependencies` linked list object",
          "In the browser's IndexedDB"
        ],
        "correctAnswer": "On the `fiber.dependencies` linked list object",
        "explanation": "Fibers maintain a `dependencies` property containing a singly-linked list of all contexts read by `useContext` during rendering."
      },
      {
        "question": "Why was the legacy `calculateChangedBits` API removed from React?",
        "options": [
          "Bitwise operations were deprecated in JavaScript",
          "Context was replaced by Redux",
          "It caused memory leaks in mobile browsers",
          "It relied on a 31-bit bitmask that was error-prone, incompatible with Concurrent Mode's lanes, and fragile to maintain"
        ],
        "correctAnswer": "It relied on a 31-bit bitmask that was error-prone, incompatible with Concurrent Mode's lanes, and fragile to maintain",
        "explanation": "`calculateChangedBits` interfered with React's internal lanes and scheduling heuristics, prompting the React team to deprecate it."
      },
      {
        "question": "How does `useContext` behave during Concurrent rendering when an update is aborted?",
        "options": [
          "Because reading context has no side effects, the fiber simply discards its workInProgress calculation without leaking memory or leaving stale event listeners",
          "It throws a ConcurrentAbort exception",
          "It reverts the provider's value to the initial default",
          "It freezes the browser event loop"
        ],
        "correctAnswer": "Because reading context has no side effects, the fiber simply discards its workInProgress calculation without leaking memory or leaving stale event listeners",
        "explanation": "Context reads are pure and stateless during the render phase, allowing Concurrent React to abandon or restart renders cleanly."
      }
    ]
  },
  {
    "title": "React: Synthetic Event System Internals",
    "description": "Plugin modules, dispatch queue composition, and root delegation in modern React.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Events"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How does React build the `dispatchQueue` when an event occurs on a DOM node in React 17+?",
        "options": [
          "It immediately invokes handlers synchronously as it climbs the real DOM tree",
          "It traverses upward from the target Fiber to the root, collecting all matching event listeners (capture and bubble phases) into an ordered dispatch queue before invoking any of them",
          "It sends the event to a Web Worker thread for queuing",
          "It runs all handlers in random asynchronous order"
        ],
        "correctAnswer": "It traverses upward from the target Fiber to the root, collecting all matching event listeners (capture and bubble phases) into an ordered dispatch queue before invoking any of them",
        "explanation": "React first collects all matching handlers along the fiber path into a dispatch queue, then iterates and executes them in sequence."
      },
      {
        "question": "What was the major architectural motivation for moving event delegation from `document` to the root DOM node in React 17?",
        "options": [
          "To speed up DOM event dispatch by 1,000%",
          "Because `document` was removed from the HTML5 specification",
          "To allow multiple independent React applications with different React versions to coexist safely on the same page without synthetic events interfering with each other",
          "To prevent native browser extensions from reading clicks"
        ],
        "correctAnswer": "To allow multiple independent React applications with different React versions to coexist safely on the same page without synthetic events interfering with each other",
        "explanation": "Attaching to the root container isolates event bubbling within each React app boundary, enabling safe micro-frontend and multi-version nesting."
      },
      {
        "question": "Why does `e.nativeEvent.stopPropagation()` NOT prevent other React synthetic event listeners on parent React components from firing?",
        "options": [
          "Because native events ignore stopPropagation",
          "Because React replaces nativeEvent with an empty object",
          "Because React runs before native events occur",
          "Because by the time the native event bubbles to the root container where React's delegator listens, the native propagation has already traversed the DOM"
        ],
        "correctAnswer": "Because by the time the native event bubbles to the root container where React's delegator listens, the native propagation has already traversed the DOM",
        "explanation": "The native event has already reached the root listener before React dispatches synthetic events. You must call `e.stopPropagation()` on the React synthetic event."
      },
      {
        "question": "Which of the following events is NOT delegated to the root container by React, but attached directly to host DOM nodes?",
        "options": [
          "`scroll`, `load`, `error`, and `cancel` (events that do not natively bubble in the browser DOM)",
          "`click`",
          "`input`",
          "`keydown`"
        ],
        "correctAnswer": "`scroll`, `load`, `error`, and `cancel` (events that do not natively bubble in the browser DOM)",
        "explanation": "Events that do not bubble natively in the DOM (such as media element events, `scroll`, and `load`) must be attached directly to the target element."
      },
      {
        "question": "How does React normalize differences between `onChange` across standard inputs, textareas, and radio buttons?",
        "options": [
          "By injecting custom C++ browser patches",
          "Through specialized Event Plugin modules (like `ChangeEventPlugin`) that listen to underlying native `input`, `click`, and `change` events and synthesize a unified `onChange`",
          "By polling the DOM every 16ms with requestAnimationFrame",
          "By converting all inputs into HTML `<canvas>` elements"
        ],
        "correctAnswer": "Through specialized Event Plugin modules (like `ChangeEventPlugin`) that listen to underlying native `input`, `click`, and `change` events and synthesize a unified `onChange`",
        "explanation": "`ChangeEventPlugin` abstracts inconsistent native browser event triggers into a predictable, consistent `onChange` event across all input types."
      }
    ]
  },
  {
    "title": "React: Offscreen & Activity API Mechanics",
    "description": "mode='hidden', state preservation, layout dormancy, and prerendering trees.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Internals"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is the primary function of the experimental React `<Activity>` (formerly `<Offscreen>`) component?",
        "codeSnippet": "<Activity mode={isActive ? 'visible' : 'hidden'}>\n  <ExpensiveChat />\n</Activity>",
        "options": [
          "It runs the component in a background Service Worker",
          "It compresses the component into an encrypted string",
          "It hides UI while preserving its full component state, Fiber tree, and real DOM nodes in memory, detaching layout effects and pausing CPU work until revived",
          "It logs user activity to Google Analytics"
        ],
        "correctAnswer": "It hides UI while preserving its full component state, Fiber tree, and real DOM nodes in memory, detaching layout effects and pausing CPU work until revived",
        "explanation": "Offscreen/Activity retains component state and DOM elements when hidden (`display: none`), running passive cleanup while preserving state for instant reactivation."
      },
      {
        "question": "What happens to `useEffect` and `useLayoutEffect` hooks when an `<Activity mode=\"hidden\">` boundary is hidden?",
        "options": [
          "They continue executing their effects at 60fps in the background",
          "They are permanently deleted and never re-run",
          "The browser throws an UnhandledAction error",
          "Their cleanup functions execute just like on unmount, and when the component becomes visible again, their setup functions re-execute"
        ],
        "correctAnswer": "Their cleanup functions execute just like on unmount, and when the component becomes visible again, their setup functions re-execute",
        "explanation": "Cleaning up effects when hidden stops background timers and subscriptions, while preserving internal `useState` and DOM state."
      },
      {
        "question": "How does `<Activity>` differ from simple CSS `display: none`?",
        "options": [
          "`<Activity>` informs React's scheduler to demote the hidden tree's render priority to `IdleLane` and pauses effect execution, saving significant CPU and memory",
          "CSS `display: none` unmounts the component completely",
          "`<Activity>` converts CSS to JavaScript",
          "There is zero difference; it is an alias for `style={{ display: 'none' }}`"
        ],
        "correctAnswer": "`<Activity>` informs React's scheduler to demote the hidden tree's render priority to `IdleLane` and pauses effect execution, saving significant CPU and memory",
        "explanation": "Offscreen integrates with the React Scheduler: updates to hidden trees run at lowest priority (`IdleLane`), avoiding interference with visible UI."
      },
      {
        "question": "How is `<Activity>` used for tab switching in high-performance applications?",
        "options": [
          "By saving tab screenshots as PNG images in memory",
          "Previous tabs are kept in `<Activity mode=\"hidden\">` so switching back occurs instantly with zero mount delay, scroll position loss, or data refetching",
          "By storing the tabs in Redis",
          "By creating an iframe per tab"
        ],
        "correctAnswer": "Previous tabs are kept in `<Activity mode=\"hidden\">` so switching back occurs instantly with zero mount delay, scroll position loss, or data refetching",
        "explanation": "Keeping inactive tabs dormant via Activity avoids expensive remounting, maintaining user scroll positions and input state."
      },
      {
        "question": "Can React prerender offscreen components before they are ever shown to the user?",
        "options": [
          "No, React components cannot be rendered unless attached to a visible screen",
          "Only if the user hovers their mouse over a link for 5 seconds",
          "Yes, React can render an `<Activity mode=\"hidden\">` tree in the background at Idle priority before the user navigates to it",
          "Only in server-side Node.js environments"
        ],
        "correctAnswer": "Yes, React can render an `<Activity mode=\"hidden\">` tree in the background at Idle priority before the user navigates to it",
        "explanation": "Background prerendering allows preparing next-step screens during idle browser time so navigation feels instantaneous."
      }
    ]
  },
  {
    "title": "React: Asset Loading & Preload Lifecycles",
    "description": "React 19 resource preloading (preload, prefetchDNS, preconnect) and hoistable tags.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "React 19"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What are 'Hoistable Tags' introduced in React 19?",
        "codeSnippet": "function MyComponent() {\n  return (\n    <div>\n      <title>User Profile</title>\n      <link rel=\"stylesheet\" href=\"/profile.css\" />\n      <h1>Profile</h1>\n    </div>\n  );\n}",
        "options": [
          "Tags that float to the top of the CSS stacking context",
          "Components that are hoisted to the window global object",
          "A Babel compilation plugin for SVG tags",
          "`<title>`, `<meta>`, and `<link>` tags declared deeply inside any component are automatically hoisted to the document `<head>` by React"
        ],
        "correctAnswer": "`<title>`, `<meta>`, and `<link>` tags declared deeply inside any component are automatically hoisted to the document `<head>` by React",
        "explanation": "React 19 natively hovers head tags (`<title>`, `<meta>`, `<link>`) to `<head>` and deduplicates them without needing external libraries like `react-helmet`."
      },
      {
        "question": "What function does `react-dom` provide to start preloading high-priority fonts or scripts before render?",
        "codeSnippet": "import { preload } from 'react-dom';\npreload('/fonts/inter.woff2', { as: 'font' });",
        "options": [
          "`preload(href, options)`",
          "`requestAsset(href)`",
          "`loadAssetSync(href)`",
          "`fetchHead(href)`"
        ],
        "correctAnswer": "`preload(href, options)`",
        "explanation": "`react-dom` provides `preload()`, `preconnect()`, `prefetchDNS()`, and `preinit()` to orchestrate early browser network requests."
      },
      {
        "question": "How does React 19 coordinate stylesheet loading with Suspense?",
        "options": [
          "React converts CSS to JavaScript strings and inlines them as HTML style attributes",
          "React suspends rendering of the component tree until an inserted stylesheet has loaded, preventing Flash of Unstyled Content (FOUC)",
          "React skips stylesheets entirely in slow connections",
          "React downloads all stylesheets via WebSockets"
        ],
        "correctAnswer": "React suspends rendering of the component tree until an inserted stylesheet has loaded, preventing Flash of Unstyled Content (FOUC)",
        "explanation": "React 19 integrates stylesheet `<link rel=\"stylesheet\">` tags with Suspense, ensuring the component tree waits for CSS before painting."
      },
      {
        "question": "What does `preinit(href, { as: 'script' })` do compared to `preload()`?",
        "options": [
          "`preinit` is for images; `preload` is for audio",
          "`preinit` runs on the server only",
          "`preinit` not only starts fetching the resource immediately, but also executes the script or attaches the stylesheet as soon as it arrives",
          "`preinit` deletes the cache after 5 seconds"
        ],
        "correctAnswer": "`preinit` not only starts fetching the resource immediately, but also executes the script or attaches the stylesheet as soon as it arrives",
        "explanation": "`preload` simply fetches the asset into cache, whereas `preinit` fetches and immediately initializes/executes the resource."
      },
      {
        "question": "How does React 19 prevent duplicate `<link rel=\"stylesheet\">` tags when multiple component instances include the same stylesheet?",
        "options": [
          "React renames the duplicate files on the web server",
          "React throws a duplicate key exception",
          "React deletes all matching styles from the cache",
          "React deduplicates hoistable tags based on their `href` prop, rendering only a single `<link>` element in the document `<head>`"
        ],
        "correctAnswer": "React deduplicates hoistable tags based on their `href` prop, rendering only a single `<link>` element in the document `<head>`",
        "explanation": "React 19 deduplicates stylesheet links by matching `href`, ensuring shared stylesheets are only injected into `<head>` once."
      }
    ]
  },
  {
    "title": "React: useSyncExternalStore & Tearing Prevention",
    "description": "Subscribing to mutable external stores without concurrent tearing.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Hooks"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is 'UI Tearing' in Concurrent React?",
        "options": [
          "A visual glitch where different components on the screen display different values for the exact same piece of external state during a single render pass",
          "Screen tearing caused by a monitor's refresh rate mismatch with the GPU",
          "When HTML elements overlap and cut off text",
          "A CSS animation frame drop on mobile devices"
        ],
        "correctAnswer": "A visual glitch where different components on the screen display different values for the exact same piece of external state during a single render pass",
        "explanation": "If an external store mutates while Concurrent React pauses work, components rendered before and after the pause read different values, tearing the UI."
      },
      {
        "question": "What are the required arguments of `useSyncExternalStore`?",
        "codeSnippet": "const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);",
        "options": [
          "`state`, `reducer`, and `initialArg`",
          "`subscribe` (callback registering listener), `getSnapshot` (function returning current store value), and optional `getServerSnapshot` for SSR",
          "`effect`, `cleanup`, and `dependencies`",
          "`target`, `event`, and `handler`"
        ],
        "correctAnswer": "`subscribe` (callback registering listener), `getSnapshot` (function returning current store value), and optional `getServerSnapshot` for SSR",
        "explanation": "`useSyncExternalStore` takes `subscribe`, a synchronous `getSnapshot` selector, and an optional `getServerSnapshot` for SSR."
      },
      {
        "question": "Why MUST `getSnapshot` return an immutable value or referentially stable object if the data has not changed?",
        "options": [
          "Because JavaScript throws an illegal reference error",
          "Because external stores must be strings",
          "If `getSnapshot` returns a new object reference on every call, React assumes the store changed and enters an infinite re-render loop",
          "It crashes the Redux DevTools extension"
        ],
        "correctAnswer": "If `getSnapshot` returns a new object reference on every call, React assumes the store changed and enters an infinite re-render loop",
        "explanation": "React compares consecutive `getSnapshot` results using `Object.is`. New object references on unchanged data trigger infinite re-renders."
      },
      {
        "question": "How does `useSyncExternalStore` prevent tearing when a store update occurs during a concurrent render?",
        "options": [
          "React locks the store using mutual exclusion locks in the OS kernel",
          "React pauses all user interactions for 5 seconds",
          "React drops the update and silences warnings",
          "React detects the store mutated mid-render, de-optimizes, and immediately restarts the render synchronously to guarantee all components read identical state"
        ],
        "correctAnswer": "React detects the store mutated mid-render, de-optimizes, and immediately restarts the render synchronously to guarantee all components read identical state",
        "explanation": "If a store mutation is detected before commit, React discards the concurrent pass and re-renders synchronously from scratch."
      },
      {
        "question": "Which libraries migrated their internal React bindings to `useSyncExternalStore` in React 18?",
        "options": [
          "Redux (`react-redux`), Zustand, and MobX",
          "Express and Fastify",
          "Lodash and Moment",
          "Webpack and Vite"
        ],
        "correctAnswer": "Redux (`react-redux`), Zustand, and MobX",
        "explanation": "All major external state management libraries adopted `useSyncExternalStore` to guarantee safe concurrent reads without tearing."
      }
    ]
  },
  {
    "title": "React: Server Actions & Progressive Enhancement",
    "description": "useActionState, formAction, and zero-JS progressive enhancement patterns.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "React 19"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is a React Server Action?",
        "codeSnippet": "async function updateName(formData) {\n  'use server';\n  await db.users.update({ name: formData.get('name') });\n}",
        "options": [
          "A server cron job scheduled in crontab",
          "An asynchronous function marked with `'use server'` that can be called from client components or HTML forms, executing securely on the server",
          "A Node.js cluster event",
          "A Redux action dispatched by express middleware"
        ],
        "correctAnswer": "An asynchronous function marked with `'use server'` that can be called from client components or HTML forms, executing securely on the server",
        "explanation": "Server Actions are asynchronous functions executed on the server, invocable via RPC from client components or form submissions."
      },
      {
        "question": "How does passing a Server Action to a `<form action={serverAction}>` achieve Progressive Enhancement?",
        "options": [
          "It converts the HTML form into an email",
          "It forces the browser to disable cookies",
          "The form can submit via standard native HTTP POST even if client JavaScript has not yet downloaded or is disabled, while using seamless AJAX when JS is active",
          "It submits the form directly to a Bitcoin node"
        ],
        "correctAnswer": "The form can submit via standard native HTTP POST even if client JavaScript has not yet downloaded or is disabled, while using seamless AJAX when JS is active",
        "explanation": "React configures standard form POST endpoints so forms submit successfully before client bundles hydrate, progressively enhancing once JS loads."
      },
      {
        "question": "What does the `useActionState` hook (formerly `useFormState`) manage?",
        "codeSnippet": "const [state, formAction, isPending] = useActionState(updateUserAction, initialState);",
        "options": [
          "Browser window resize events",
          "IndexedDB database transactions",
          "The HTML page title",
          "The state returned by the action function, the wrapped dispatch handler, and an `isPending` indicator tracking async submission progress"
        ],
        "correctAnswer": "The state returned by the action function, the wrapped dispatch handler, and an `isPending` indicator tracking async submission progress",
        "explanation": "`useActionState` manages returned action results (validation errors, success payloads) along with execution status and pending states."
      },
      {
        "question": "What hook allows a child component nested inside a form to access that form's pending submission status?",
        "codeSnippet": "function SubmitButton() {\n  const { pending } = useFormStatus();\n  return <button disabled={pending}>Submit</button>;\n}",
        "options": [
          "`useFormStatus`",
          "`usePendingForm`",
          "`useActionStatus`",
          "`useSubmitState`"
        ],
        "correctAnswer": "`useFormStatus`",
        "explanation": "`useFormStatus` reads the status of the closest parent `<form>` without having to drill props down to submit buttons."
      },
      {
        "question": "How do Server Actions secure parameters against client-side tampering when bound using `.bind()`?",
        "codeSnippet": "const updatePostWithId = updatePost.bind(null, postId);",
        "options": [
          "By sending parameters in plain text URL query strings",
          "React signs or encrypts bound arguments before sending them to the client, verifying their integrity upon submission to prevent tampering",
          "By storing the arguments in client localStorage",
          "React does not validate bound parameters"
        ],
        "correctAnswer": "React signs or encrypts bound arguments before sending them to the client, verifying their integrity upon submission to prevent tampering",
        "explanation": "Bound arguments passed to Server Actions are encrypted/signed by the server framework, preventing malicious client modifications."
      }
    ]
  },
  {
    "title": "React: Memory Allocation Profiling in Fiber Trees",
    "description": "V8 heap allocations during render, node pool reuse, and GC pressure mitigation.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Performance"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How does React minimize garbage collection pressure during continuous re-renders in Fiber?",
        "options": [
          "By calling `window.gc()` every 10 seconds",
          "By allocating all objects on the C++ stack instead of the heap",
          "By recycling existing Fiber nodes between the `current` and `workInProgress` trees via the `alternate` pointer rather than allocating fresh objects every render",
          "By disabling JavaScript garbage collection"
        ],
        "correctAnswer": "By recycling existing Fiber nodes between the `current` and `workInProgress` trees via the `alternate` pointer rather than allocating fresh objects every render",
        "explanation": "Each Fiber pairs with an `alternate` node. React toggles work between them, reusing existing objects and avoiding repeated memory allocations."
      },
      {
        "question": "What is the memory impact of instantiating inline arrow functions and object literals inside the JSX render body of large lists?",
        "options": [
          "It permanently leaks 1MB of memory per element",
          "It causes hard crashes in Google V8",
          "There is zero measurable memory impact in modern engines",
          "Thousands of short-lived closures and objects are created per render pass, increasing minor GC pauses and triggering generational GC churn"
        ],
        "correctAnswer": "Thousands of short-lived closures and objects are created per render pass, increasing minor GC pauses and triggering generational GC churn",
        "explanation": "Creating thousands of ephemeral objects per frame fills V8's young generation heap, causing frequent minor GC pauses that stutter frame rates."
      },
      {
        "question": "What is the `alternate` field on a Fiber node?",
        "codeSnippet": "workInProgress.alternate === current;",
        "options": [
          "A pointer referencing the twin Fiber node in the opposite tree (current points to workInProgress, and workInProgress points to current)",
          "An alternative CSS class name",
          "The fallback component for error boundaries",
          "A pointer to the next sibling element"
        ],
        "correctAnswer": "A pointer referencing the twin Fiber node in the opposite tree (current points to workInProgress, and workInProgress points to current)",
        "explanation": "The `alternate` pointer pairs the onscreen fiber with its offscreen counterpart, forming the foundation of dual buffering."
      },
      {
        "question": "How can large React applications diagnose memory leaks caused by lingering component closures?",
        "options": [
          "Inspect the CSS Styles tab",
          "Record an Allocation Instrumentation profile in Chrome DevTools, inspect retained closure contexts in the Allocation Timeline, and search for unmounted Fiber tags",
          "Check the HTTP response status codes",
          "Check the console output of `npm run build`"
        ],
        "correctAnswer": "Record an Allocation Instrumentation profile in Chrome DevTools, inspect retained closure contexts in the Allocation Timeline, and search for unmounted Fiber tags",
        "explanation": "Allocation timelines and heap snapshots reveal unmounted Fiber trees retained by active closures or event listeners."
      },
      {
        "question": "Why is setting unneeded DOM refs to `null` during cleanup important in long-lived single page apps?",
        "options": [
          "Because React throws an error if refs aren't cleared",
          "To prevent the browser from saving cookies",
          "To allow the browser's garbage collector to free the detached DOM element and all its internal sub-elements from the V8 C++ DOM wrapper heap",
          "Because HTML elements can only be accessed once"
        ],
        "correctAnswer": "To allow the browser's garbage collector to free the detached DOM element and all its internal sub-elements from the V8 C++ DOM wrapper heap",
        "explanation": "Lingering JavaScript references to removed DOM nodes prevent the entire detached DOM subtree from being freed from memory."
      }
    ]
  },
  {
    "title": "React: SSR Streaming & Selective Hydration",
    "description": "renderToPipeableStream, progressive HTML delivery, and priority-driven hydration.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "SSR"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What does `renderToPipeableStream` in React 18 enable on the server?",
        "options": [
          "Streams audio directly to web speakers",
          "Connects React directly to Linux pipe commands",
          "Replaces Node.js buffers with plain strings",
          "Streams HTML markup incrementally to the client as components finish rendering, allowing fast Time to First Byte without waiting for the full page to render"
        ],
        "correctAnswer": "Streams HTML markup incrementally to the client as components finish rendering, allowing fast Time to First Byte without waiting for the full page to render",
        "explanation": "`renderToPipeableStream` streams ready HTML chunks immediately, allowing the browser to render initial content while slow Suspense blocks stream later."
      },
      {
        "question": "What is 'Selective Hydration' in React 18?",
        "options": [
          "React can start hydrating parts of the HTML page wrapped in `<Suspense>` before other parts have finished streaming or hydrating, prioritizing areas the user interacts with",
          "The developer manually chooses which components to hydrate in `package.json`",
          "Hydrating only mobile users while ignoring desktop users",
          "Only hydrating components that use CSS modules"
        ],
        "correctAnswer": "React can start hydrating parts of the HTML page wrapped in `<Suspense>` before other parts have finished streaming or hydrating, prioritizing areas the user interacts with",
        "explanation": "Selective Hydration hydrates independent `<Suspense>` boundaries as they arrive. If a user clicks an unhydrated section, React prioritizes hydrating that section first."
      },
      {
        "question": "What happens if a user clicks a button inside a suspended HTML block that has NOT yet been hydrated?",
        "options": [
          "The click event is permanently dropped and ignored",
          "React captures the click event, prioritizes hydrating that specific Suspense boundary immediately, and replays the captured click event once hydrated",
          "The browser page reloads",
          "An alert error is displayed to the user"
        ],
        "correctAnswer": "React captures the click event, prioritizes hydrating that specific Suspense boundary immediately, and replays the captured click event once hydrated",
        "explanation": "React captures the user's interaction, bumps the clicked component's hydration priority to urgent, hydrates it, and replays the click."
      },
      {
        "question": "How does `renderToPipeableStream` deliver late-arriving Suspense content into the browser DOM without client JavaScript hydration?",
        "options": [
          "It triggers a meta refresh tag to reload the page",
          "It opens a WebSocket to push the innerHTML",
          "It emits HTML for the resolved content at the end of the stream accompanied by a tiny inline `<script>` that swaps the fallback template with the real content in the DOM",
          "It modifies the server file system"
        ],
        "correctAnswer": "It emits HTML for the resolved content at the end of the stream accompanied by a tiny inline `<script>` that swaps the fallback template with the real content in the DOM",
        "explanation": "An inline script swaps the fallback placeholder with the late-arriving HTML snippet immediately upon delivery, even without full client bundles."
      },
      {
        "question": "What are the two primary callbacks in `renderToPipeableStream`: `onShellReady` vs `onAllReady`?",
        "options": [
          "`onShellReady` is for Linux; `onAllReady` is for Windows",
          "`onShellReady` is for dev; `onAllReady` is for production",
          "There is no difference between them",
          "`onShellReady` fires when the initial UI shell outside Suspense boundaries is ready to stream (best for human users); `onAllReady` waits for everything (best for SEO crawlers)"
        ],
        "correctAnswer": "`onShellReady` fires when the initial UI shell outside Suspense boundaries is ready to stream (best for human users); `onAllReady` waits for everything (best for SEO crawlers)",
        "explanation": "Streaming early on `onShellReady` gives users an instant UI shell, while `onAllReady` ensures search engine bots receive complete HTML."
      }
    ]
  },
  {
    "title": "React: Error Boundary Recovery & Unwinding Fibers",
    "description": "Catching render panics, stack unwinding, and component stack synthesis.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Internals"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What internal flag is attached to a Fiber node when an error is thrown during its render phase?",
        "options": [
          "The `DidCapture` or `ShouldCapture` effect flag is marked on the nearest catching boundary fiber, and `Incomplete` is marked on failed fibers",
          "`ErrorFlag_v2`",
          "`fiber.hasCrashed = true`",
          "`fiber.exitCode = 1`"
        ],
        "correctAnswer": "The `DidCapture` or `ShouldCapture` effect flag is marked on the nearest catching boundary fiber, and `Incomplete` is marked on failed fibers",
        "explanation": "React tags failing fibers as `Incomplete` and flags the nearest error boundary with `ShouldCapture`, initiating stack unwinding."
      },
      {
        "question": "How does React generate the clean component stack trace shown in error reports?",
        "options": [
          "It reads the browser V8 native stack trace and strips out React internal functions",
          "React tracks the chain of Fiber parent nodes (`fiber.return`) during execution and formats their component names, file names, and line numbers into a synthetic component stack",
          "It queries source maps from GitHub at runtime",
          "It evaluates the component in a try-catch block 10 times"
        ],
        "correctAnswer": "React tracks the chain of Fiber parent nodes (`fiber.return`) during execution and formats their component names, file names, and line numbers into a synthetic component stack",
        "explanation": "By walking up the `fiber.return` pointer chain, React synthesizes a readable component hierarchy trace independent of browser engine internals."
      },
      {
        "question": "What happens if an Error Boundary itself throws an error inside its `render()` or `getDerivedStateFromError()`?",
        "options": [
          "React restarts the application from the root automatically",
          "The error is silently ignored and an empty div is shown",
          "The error bubbles up to the next outer ancestor Error Boundary; if none exists, the entire React root unmounts",
          "The browser tab locks indefinitely"
        ],
        "correctAnswer": "The error bubbles up to the next outer ancestor Error Boundary; if none exists, the entire React root unmounts",
        "explanation": "If a boundary throws while rendering its fallback, the error propagates upward to find an enclosing boundary, falling back to unmounting the root."
      },
      {
        "question": "Why cannot `componentDidCatch` be used to render fallback UI directly instead of `getDerivedStateFromError`?",
        "options": [
          "`componentDidCatch` cannot receive error parameters",
          "`componentDidCatch` is asynchronous and returns a Promise",
          "`componentDidCatch` only works on Android devices",
          "`componentDidCatch` runs during the synchronous commit phase (after DOM mutations), whereas `getDerivedStateFromError` runs during the render phase to schedule the fallback UI"
        ],
        "correctAnswer": "`componentDidCatch` runs during the synchronous commit phase (after DOM mutations), whereas `getDerivedStateFromError` runs during the render phase to schedule the fallback UI",
        "explanation": "`getDerivedStateFromError` computes fallback state during the render phase. `componentDidCatch` executes during the commit phase for side effects and logging."
      },
      {
        "question": "What happens to the children of an Error Boundary when it transitions to its fallback state?",
        "options": [
          "React unmounts the failed children tree, executing their `useEffect` and `componentWillUnmount` cleanups, and replaces their DOM with the fallback UI",
          "The failed children remain active in memory in hidden mode",
          "The failed children are frozen in their broken state",
          "The children's state is serialized to cookies"
        ],
        "correctAnswer": "React unmounts the failed children tree, executing their `useEffect` and `componentWillUnmount` cleanups, and replaces their DOM with the fallback UI",
        "explanation": "Switching to fallback UI cleanly unmounts the corrupted subtree, freeing DOM elements and firing unmount cleanups."
      }
    ]
  },
  {
    "title": "React: React DOM Host Component Diffs",
    "description": "diffProperties, attribute mutators, style diffs, and dangerouslySetInnerHTML safety.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Internals"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What does the `diffProperties` internal function in `react-dom` return?",
        "options": [
          "A boolean indicating whether the element changed",
          "A flat update payload array containing alternating property keys and new values that need to be mutated on the real DOM node during commit",
          "A newly cloned HTML element",
          "A CSS stylesheet string"
        ],
        "correctAnswer": "A flat update payload array containing alternating property keys and new values that need to be mutated on the real DOM node during commit",
        "explanation": "`diffProperties` compares old and new props, returning a flat array payload (e.g. `['className', 'btn-active', 'style', { color: 'red' }]`) for the commit phase."
      },
      {
        "question": "How does React handle removing a style property when updating a DOM node's `style` object?",
        "codeSnippet": "// Old: { color: 'red', fontSize: '14px' }\n// New: { color: 'blue' }",
        "options": [
          "It calls `element.removeAttribute('style')` and rebuilds the entire style string from scratch",
          "It sets `style[key] = null` which browsers reject",
          "It iterates over the old style keys that are absent in the new style object and sets `style[key] = ''` to clear them",
          "It leaves the old style active on the element"
        ],
        "correctAnswer": "It iterates over the old style keys that are absent in the new style object and sets `style[key] = ''` to clear them",
        "explanation": "React clears deleted inline styles by setting them to an empty string (`''`), which resets the property to its stylesheet default."
      },
      {
        "question": "Why does React require the `__html` key when using `dangerouslySetInnerHTML={{ __html: markup }}`?",
        "options": [
          "Because standard JavaScript objects forbid string properties named html",
          "Because `__html` is a keyword in the HTML5 spec",
          "To allow React to compile the HTML into WebAssembly",
          "As an explicit design hurdle to remind developers that injecting unescaped HTML exposes the application to Cross-Site Scripting (XSS) vulnerabilities"
        ],
        "correctAnswer": "As an explicit design hurdle to remind developers that injecting unescaped HTML exposes the application to Cross-Site Scripting (XSS) vulnerabilities",
        "explanation": "The awkward `{ __html: ... }` syntax is an intentional safeguard to force developers to acknowledge the inherent XSS security risk."
      },
      {
        "question": "How does React DOM handle custom attributes on standard HTML elements (e.g. `data-*` and `aria-*`) vs custom non-standard attributes?",
        "options": [
          "`data-*` and `aria-*` attributes are passed through directly using `setAttribute`, while unrecognized custom attributes were historically filtered out unless matching Web Component rules",
          "React renames all custom attributes to start with `react-`",
          "React ignores all `aria-*` attributes",
          "Custom attributes cause compilation errors"
        ],
        "correctAnswer": "`data-*` and `aria-*` attributes are passed through directly using `setAttribute`, while unrecognized custom attributes were historically filtered out unless matching Web Component rules",
        "explanation": "React standardizes known HTML/DOM properties as properties on the element, while `data-*`, `aria-*`, and Web Component attributes use `setAttribute`."
      },
      {
        "question": "When applying DOM property mutations during `commitUpdate`, in what thread do they run?",
        "options": [
          "In a background Web Worker thread",
          "Synchronously on the browser's main UI thread, directly mutating DOM elements",
          "On the server via an RPC call",
          "In the GPU shader pipeline"
        ],
        "correctAnswer": "Synchronously on the browser's main UI thread, directly mutating DOM elements",
        "explanation": "The DOM can only be manipulated on the main UI thread; the commit phase applies all scheduled mutations synchronously."
      }
    ]
  },
  {
    "title": "React: Effect Hooks Linked-List in Fiber",
    "description": "fiber.updateQueue, PassiveEffect flags, circular lists, and effect lifecycles.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Internals"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "Where are `useEffect` and `useLayoutEffect` records stored on a functional component's Fiber node?",
        "options": [
          "In an array stored on `window.__reactEffects`",
          "Inside the component function's prototype",
          "In a circular singly-linked list of Effect objects stored on `fiber.updateQueue.lastEffect`",
          "In a Map stored on `fiber.stateNode`"
        ],
        "correctAnswer": "In a circular singly-linked list of Effect objects stored on `fiber.updateQueue.lastEffect`",
        "explanation": "Effects are stored in a circular linked list on `fiber.updateQueue`, where `lastEffect.next` points back to the first effect in the list."
      },
      {
        "question": "What are the bit flags used to distinguish effect types inside an Effect object?",
        "options": [
          "`SyncEffect` and `AsyncEffect`",
          "`DomEffect` and `StateEffect`",
          "`ClientEffect` and `ServerEffect`",
          "`HookHasEffect` (whether dependencies changed), `HookPassive` (`useEffect`), `HookLayout` (`useLayoutEffect`), and `HookInsertion` (`useInsertionEffect`)"
        ],
        "correctAnswer": "`HookHasEffect` (whether dependencies changed), `HookPassive` (`useEffect`), `HookLayout` (`useLayoutEffect`), and `HookInsertion` (`useInsertionEffect`)",
        "explanation": "React uses bitwise tags (`HookPassive | HookHasEffect`) to determine whether an effect is layout or passive and if its dependencies changed."
      },
      {
        "question": "Why does React structure the effects list as a circular linked list?",
        "options": [
          "Storing a pointer to `lastEffect` allows O(1) appending to the tail while simultaneously granting O(1) access to the first effect via `lastEffect.next`",
          "Because circular structures cannot be garbage collected",
          "To allow infinite loops during effect execution",
          "Because JavaScript arrays do not support objects"
        ],
        "correctAnswer": "Storing a pointer to `lastEffect` allows O(1) appending to the tail while simultaneously granting O(1) access to the first effect via `lastEffect.next`",
        "explanation": "Circular linked lists give instant O(1) access to both the beginning and end of the list with a single pointer."
      },
      {
        "question": "During which phase does React execute `useEffect` cleanup and setup functions?",
        "options": [
          "Synchronously inside `beginWork`",
          "In a post-commit asynchronous task scheduled via the Scheduler at Normal priority after the browser has painted",
          "During the pre-commit DOM layout pass",
          "Before the component function is called"
        ],
        "correctAnswer": "In a post-commit asynchronous task scheduled via the Scheduler at Normal priority after the browser has painted",
        "explanation": "Passive effects (`useEffect`) are flushed asynchronously after browser paint so they don't block visual rendering."
      },
      {
        "question": "What happens if an effect cleanup function throws an unhandled error?",
        "options": [
          "All subsequent effect cleanups are permanently aborted",
          "The component is immediately remounted",
          "React catches the error, continues executing the remaining effect cleanups in that commit, and re-throws the error at the end to the error boundary",
          "The browser closes the active tab"
        ],
        "correctAnswer": "React catches the error, continues executing the remaining effect cleanups in that commit, and re-throws the error at the end to the error boundary",
        "explanation": "React ensures remaining cleanups run so memory leaks aren't created before propagating the error to the boundary."
      }
    ]
  },
  {
    "title": "React: Hook State Linked List Storage",
    "description": "fiber.memoizedState, Hook node pointers (next, queue, baseQueue), and slot dispatching.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Internals"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How are individual hooks (`useState`, `useReducer`, `useRef`) stored on a functional component Fiber?",
        "codeSnippet": "fiber.memoizedState -> Hook1 -> Hook2 -> Hook3 -> null",
        "options": [
          "In a JavaScript `Map` keyed by variable names",
          "In an array indexed by line numbers",
          "On the component's `arguments.callee` object",
          "As a linear singly-linked list of `Hook` objects stored on `fiber.memoizedState`, linked by `hook.next` pointers"
        ],
        "correctAnswer": "As a linear singly-linked list of `Hook` objects stored on `fiber.memoizedState`, linked by `hook.next` pointers",
        "explanation": "Hooks are stored in a singly linked list on `fiber.memoizedState`. Each hook has a `next` pointer pointing to the next hook in the sequence."
      },
      {
        "question": "What are the properties of an internal `Hook` object in React Fiber?",
        "options": [
          "`memoizedState` (current value), `baseState`, `baseQueue`, `queue` (pending updates), and `next` (pointer to next hook)",
          "`name`, `value`, `onChange`, and `type`",
          "`id`, `element`, `style`, and `parent`",
          "`priority`, `timestamp`, and `timeout`"
        ],
        "correctAnswer": "`memoizedState` (current value), `baseState`, `baseQueue`, `queue` (pending updates), and `next` (pointer to next hook)",
        "explanation": "A Hook object holds `memoizedState`, update queues (`queue`, `baseQueue`), and a `next` reference to form the linked list."
      },
      {
        "question": "Why does React switch internal dispatchers between `HooksDispatcherOnMount` and `HooksDispatcherOnUpdate`?",
        "options": [
          "To prevent developers from using useState on updates",
          "On mount, hooks create and append new Hook nodes to the linked list; on update, hooks read and traverse the existing Hook nodes in sequence",
          "To transpile functional components into class components on update",
          "Because mounting runs on the server while updating runs on the client"
        ],
        "correctAnswer": "On mount, hooks create and append new Hook nodes to the linked list; on update, hooks read and traverse the existing Hook nodes in sequence",
        "explanation": "`mountState` instantiates new Hook records; `updateState` advances `workInProgressHook = currentHook.next` to read existing slots."
      },
      {
        "question": "What happens if a component executes fewer hooks during an update than it did during mount?",
        "options": [
          "React fills in the missing hooks with `undefined`",
          "React restarts the computer",
          "React detects that the hook list ended prematurely while traversing `memoizedState` and throws the error: 'Rendered fewer hooks than during the previous render'",
          "The missing hooks are retained silently without error"
        ],
        "correctAnswer": "React detects that the hook list ended prematurely while traversing `memoizedState` and throws the error: 'Rendered fewer hooks than during the previous render'",
        "explanation": "When hooks are called conditionally, the linked list traversal count mismatches, triggering React's 'Rendered fewer hooks' exception."
      },
      {
        "question": "What does `hook.queue.pending` hold in a `useState` or `useReducer` hook?",
        "options": [
          "A list of HTTP network requests",
          "A queue of DOM event listeners",
          "A list of CSS animations",
          "A circular linked list of pending update objects waiting to be processed during the next render pass"
        ],
        "correctAnswer": "A circular linked list of pending update objects waiting to be processed during the next render pass",
        "explanation": "`queue.pending` points to the latest update in a circular list of pending state mutations waiting for reconciliation."
      }
    ]
  },
  {
    "title": "React: Suspense Hidden Mode & Fiber Deletions",
    "description": "Child deletion arrays, fiber.flags Deletion, and offscreen commit phases.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Suspense"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "When a Suspense boundary suspends on a Promise during an update, what happens to the currently visible primary children?",
        "options": [
          "React hides them by setting their DOM nodes to `display: none` and attaching fallback UI, rather than destroying them, preserving their DOM and state",
          "React deletes all DOM nodes immediately and cancels all state",
          "React unmounts the entire page",
          "React converts them to SVG images"
        ],
        "correctAnswer": "React hides them by setting their DOM nodes to `display: none` and attaching fallback UI, rather than destroying them, preserving their DOM and state",
        "explanation": "In Suspense updates, primary children are visually hidden rather than deleted, keeping their internal state intact until resolution."
      },
      {
        "question": "What is stored in the `fiber.deletions` array during reconciliation?",
        "options": [
          "Strings representing deleted CSS classes",
          "Child fibers that were present in the `current` tree but missing in the new `workInProgress` tree, scheduled for DOM removal and unmount cleanup during commit",
          "Variables that were garbage collected in V8",
          "A log of uninstalled npm packages"
        ],
        "correctAnswer": "Child fibers that were present in the `current` tree but missing in the new `workInProgress` tree, scheduled for DOM removal and unmount cleanup during commit",
        "explanation": "`fiber.deletions` records fibers removed from the tree so the commit phase can run unmount hooks and remove their DOM nodes."
      },
      {
        "question": "What effect flag is applied to a Fiber scheduled for deletion?",
        "options": [
          "`Destroy`",
          "`WipeOut`",
          "`Deletion` (`0b00000000000010000000000000000000` / bitmask)",
          "`Kill`"
        ],
        "correctAnswer": "`Deletion` (`0b00000000000010000000000000000000` / bitmask)",
        "explanation": "Fibers marked with the `Deletion` flag are processed by `commitMutationEffects`, triggering unmount lifecycles and DOM removal."
      },
      {
        "question": "How does React handle ref detachment for fibers marked with the `Deletion` flag?",
        "options": [
          "Refs are left pointing to the removed DOM node forever",
          "Refs are deleted from the window object",
          "React reassigns refs to document.body",
          "React synchronously sets `ref.current = null` (or invokes ref cleanup functions) before removing the DOM node from the document"
        ],
        "correctAnswer": "React synchronously sets `ref.current = null` (or invokes ref cleanup functions) before removing the DOM node from the document",
        "explanation": "React nullifies refs (or calls ref cleanups) before removing nodes, ensuring parent code doesn't retain unmounted DOM references."
      },
      {
        "question": "What happens to layout effects when a Suspense boundary toggles from fallback back to primary content?",
        "options": [
          "React fires the layout effect setup functions of the newly revealed components synchronously before painting",
          "Layout effects are skipped because the component was suspended",
          "Layout effects are converted to standard `useEffect` calls",
          "The browser ignores layout effects"
        ],
        "correctAnswer": "React fires the layout effect setup functions of the newly revealed components synchronously before painting",
        "explanation": "When primary content is revealed, its layout effects execute synchronously before paint so dimensions can be measured cleanly."
      }
    ]
  },
  {
    "title": "React: Compiler & Memoization Transformation",
    "description": "Reactive scope inference, memoization blocks, and fine-grained dependency caches.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Compilers"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is a 'Reactive Scope' in the React Compiler intermediate representation (HIR)?",
        "options": [
          "A JavaScript `try...catch` block",
          "A contiguous block of instructions that produces one or more values that must be memoized together when their shared inputs change",
          "The global scope on the window object",
          "A CSS media query scope"
        ],
        "correctAnswer": "A contiguous block of instructions that produces one or more values that must be memoized together when their shared inputs change",
        "explanation": "The compiler groups operations into reactive scopes, memoizing outputs and only re-evaluating when input dependencies change."
      },
      {
        "question": "How does the React Compiler handle mutable array mutations (like `arr.push(item)`) in components?",
        "options": [
          "It forbids arrays and throws a compile-time error",
          "It converts all arrays to immutable LinkedList objects",
          "It performs alias analysis to track mutations on local data structures, inserting memoization boundaries around the entire mutation block safely",
          "It wraps every array in a JavaScript Proxy"
        ],
        "correctAnswer": "It performs alias analysis to track mutations on local data structures, inserting memoization boundaries around the entire mutation block safely",
        "explanation": "Through alias analysis, the compiler understands that local mutations before returning JSX are safe and memoizes the entire block."
      },
      {
        "question": "What happens if a component violates the Rules of React when processed by the React Compiler?",
        "options": [
          "The entire build crashes and halts production deployment",
          "It deletes the offending file from disk",
          "It forces the application into legacy React 15 mode",
          "The compiler safely bails out of optimizing that specific component and leaves its original unmemoized code intact, compiling the rest of the application"
        ],
        "correctAnswer": "The compiler safely bails out of optimizing that specific component and leaves its original unmemoized code intact, compiling the rest of the application",
        "explanation": "The compiler uses graceful bailouts: if a component violates invariants, it skips that component without breaking the build."
      },
      {
        "question": "Why does the React Compiler eliminate the need for `useCallback` when passing event handlers to memoized children?",
        "options": [
          "The compiler automatically memoizes the callback function based on the exact variables it captures from outer scope",
          "It makes all functions global singletons",
          "It passes functions as strings over JSON",
          "It converts event handlers to inline HTML attributes"
        ],
        "correctAnswer": "The compiler automatically memoizes the callback function based on the exact variables it captures from outer scope",
        "explanation": "Because the compiler infers function closures and memoizes them automatically, manual `useCallback` calls become redundant."
      },
      {
        "question": "What is High-Level Intermediate Representation (HIR) in the React Compiler pipeline?",
        "options": [
          "A minified JavaScript string",
          "A Control Flow Graph (CFG) representation of the component with explicit basic blocks, SSA (Static Single Assignment) form, and data-flow edges",
          "A virtual DOM JSON object",
          "A binary assembly language file"
        ],
        "correctAnswer": "A Control Flow Graph (CFG) representation of the component with explicit basic blocks, SSA (Static Single Assignment) form, and data-flow edges",
        "explanation": "HIR represents code as a control-flow graph in SSA form, allowing rigorous static data-flow and mutability analysis."
      }
    ]
  },
  {
    "title": "React: Microtask vs Macrotask Event Scheduling",
    "description": "Discrete updates, batching microtasks, ensureRootIsScheduled, and event loops.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Internals"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How does React 18 schedule the batching of state updates triggered in non-React contexts (like native promises)?",
        "options": [
          "It calls `setTimeout(..., 1000)`",
          "It uses a synchronous `while(true)` spinlock",
          "It queues update lanes on the root and schedules a single reconciliation pass using `queueMicrotask` or `Promise.resolve().then(...)`",
          "It prompts the user with a browser confirmation dialog"
        ],
        "correctAnswer": "It queues update lanes on the root and schedules a single reconciliation pass using `queueMicrotask` or `Promise.resolve().then(...)`",
        "explanation": "React uses microtasks to coalesce multiple synchronous state updates within the same tick of the event loop into a single render pass."
      },
      {
        "question": "What is the purpose of `ensureRootIsScheduled(root, currentTime)` in React's Fiber reconciler?",
        "options": [
          "It ensures the root element has an HTML ID attribute",
          "It tests network connectivity to the root domain",
          "It writes the current timestamp to cookies",
          "It checks all pending lanes on the root, determines the highest priority lane, and schedules a task with the Scheduler (or microtask queue) if one isn't already scheduled"
        ],
        "correctAnswer": "It checks all pending lanes on the root, determines the highest priority lane, and schedules a task with the Scheduler (or microtask queue) if one isn't already scheduled",
        "explanation": "`ensureRootIsScheduled` evaluates pending lanes, cancels stale scheduled tasks, and schedules fresh work matching the highest-priority lane."
      },
      {
        "question": "What distinguishes a 'Discrete' event (like click or keydown) from a 'Continuous' event (like mousemove or scroll) in React scheduling?",
        "options": [
          "Discrete events run at `SyncLane` or `InputContinuousLane` and flush any pending microtasks before executing; continuous updates can be time-sliced",
          "Discrete events can only occur once in a user session",
          "Continuous events are handled exclusively on the backend server",
          "Discrete events cannot update React state"
        ],
        "correctAnswer": "Discrete events run at `SyncLane` or `InputContinuousLane` and flush any pending microtasks before executing; continuous updates can be time-sliced",
        "explanation": "Discrete events require immediate, predictable state transitions, while continuous events (scroll, drag) can yield to maintain frame rates."
      },
      {
        "question": "Why does React prefer `MessageChannel` over `window.setTimeout(..., 0)` for scheduling macro-tasks in the browser?",
        "options": [
          "`MessageChannel` runs in a separate kernel thread",
          "`setTimeout(..., 0)` enforces a minimum 4ms clamping penalty in nested calls, whereas `MessageChannel` executes immediately on the macrotask queue without clamping",
          "`setTimeout` was deprecated in HTML5",
          "`MessageChannel` works when the computer is shut down"
        ],
        "correctAnswer": "`setTimeout(..., 0)` enforces a minimum 4ms clamping penalty in nested calls, whereas `MessageChannel` executes immediately on the macrotask queue without clamping",
        "explanation": "Browsers enforce a 4ms clamp on nested `setTimeout` calls. `MessageChannel.port.postMessage` executes without this artificial delay."
      },
      {
        "question": "What happens if a state setter is invoked synchronously during the render phase (render-phase update)?",
        "codeSnippet": "function Bad() {\n  const [count, setCount] = useState(0);\n  if (count < 5) setCount(count + 1); // Render-phase update\n  return <div>{count}</div>;\n}",
        "options": [
          "The browser instantly crashes with a segmentation fault",
          "React ignores the state update completely",
          "React re-runs the component immediately in a loop up to 50 times; exceeding this limit throws 'Too many re-renders. React limits the number of renders to prevent an infinite loop'",
          "The count is reset to -1"
        ],
        "correctAnswer": "React re-runs the component immediately in a loop up to 50 times; exceeding this limit throws 'Too many re-renders. React limits the number of renders to prevent an infinite loop'",
        "explanation": "React allows limited render-phase state updates (up to 50 cycles) to handle conditional state adjustments, throwing an error if it loops endlessly."
      }
    ]
  },
  {
    "title": "React: Edge Runtime React Streaming",
    "description": "Web Streams API, TransformStream, Cloudflare Workers/Vercel Edge, and execution constraints.",
    "difficulty": "very hard",
    "tags": [
      "React",
      "Edge"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What rendering function does `react-dom/server` provide for streaming in Web Standards Edge Runtimes (Cloudflare Workers, Deno, Vercel Edge)?",
        "codeSnippet": "import { renderToReadableStream } from 'react-dom/server';",
        "options": [
          "`renderToPipeableStream`",
          "`renderToString`",
          "`renderToNodeStream`",
          "`renderToReadableStream`"
        ],
        "correctAnswer": "`renderToReadableStream`",
        "explanation": "`renderToReadableStream` outputs a standard web `ReadableStream`, whereas `renderToPipeableStream` outputs a Node.js `Writable` stream."
      },
      {
        "question": "What is a primary architectural constraint when running React SSR at the Edge compared to Node.js servers?",
        "options": [
          "Edge environments rely on V8 isolates with strict memory (e.g. 128MB) and CPU execution time limits, lacking access to Node.js native APIs (`fs`, `child_process`)",
          "Edge runtimes cannot return HTML strings",
          "Edge runtimes do not support JavaScript async/await",
          "Edge runtimes only support HTTP/1.0"
        ],
        "correctAnswer": "Edge environments rely on V8 isolates with strict memory (e.g. 128MB) and CPU execution time limits, lacking access to Node.js native APIs (`fs`, `child_process`)",
        "explanation": "Edge workers use lightweight V8 isolates with standard Web APIs rather than full Node.js runtimes, requiring portable web-standard code."
      },
      {
        "question": "How can you inject custom HTML chunks (e.g. CSRF tokens or telemetry scripts) into an ongoing `ReadableStream` produced by React?",
        "options": [
          "By modifying the React source code directly",
          "By piping the stream through a standard web `TransformStream` that intercepts and injects byte chunks before forwarding to the client response",
          "By writing to a temporary file on disk",
          "It is strictly impossible once streaming starts"
        ],
        "correctAnswer": "By piping the stream through a standard web `TransformStream` that intercepts and injects byte chunks before forwarding to the client response",
        "explanation": "`TransformStream` allows streaming transformations, letting you inject scripts or modify headers on the fly as HTML streams through."
      },
      {
        "question": "What is the Time to First Byte (TTFB) advantage of Edge Streaming SSR over centralized SSR servers?",
        "options": [
          "Edge servers have 100x faster CPU cores than central servers",
          "Edge streaming bypasses TLS encryption",
          "The Edge worker is geographically closer to the user, and streaming begins emitting the initial HTML shell within milliseconds without waiting for slow database queries",
          "Edge streaming compresses HTML with proprietary military algorithms"
        ],
        "correctAnswer": "The Edge worker is geographically closer to the user, and streaming begins emitting the initial HTML shell within milliseconds without waiting for slow database queries",
        "explanation": "Edge isolates close to the user emit the initial HTML shell almost instantly, while deferred data streams in as backend services resolve."
      },
      {
        "question": "How does `renderToReadableStream` handle an error occurring inside an asynchronous Suspense boundary at the Edge?",
        "options": [
          "The stream immediately crashes and terminates the connection",
          "The Edge worker restarts the virtual machine",
          "The client browser is sent an HTTP 404 response",
          "The stream continues emitting the fallback UI for that boundary, logs the error via the `onError` hook, and maintains a successful 200 stream status"
        ],
        "correctAnswer": "The stream continues emitting the fallback UI for that boundary, logs the error via the `onError` hook, and maintains a successful 200 stream status",
        "explanation": "Because streaming has already started (headers sent), React handles downstream component errors by streaming fallback markup and calling `onError`."
      }
    ]
  }
];
