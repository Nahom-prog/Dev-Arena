export const reactMidQuizzes = [
  {
    "title": "React: useEffect Lifecycle & Cleanup",
    "description": "Mastering effect lifecycles, timer disposal, and event listeners.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Hooks"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "When exactly does the cleanup function returned by useEffect execute?",
        "codeSnippet": "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, [tick]);",
        "options": [
          "Right before the component unmounts and before re-running the effect on subsequent renders",
          "Only when the entire browser tab closes",
          "Immediately when the component finishes its first render",
          "Asynchronously 5 seconds after unmounting"
        ],
        "correctAnswer": "Right before the component unmounts and before re-running the effect on subsequent renders",
        "explanation": "React runs the previous effect cleanup before re-invoking the effect with updated dependencies, as well as on component unmount."
      },
      {
        "question": "What happens if a state setter is called inside useEffect without a dependency array?",
        "codeSnippet": "useEffect(() => {\n  setCount(c => c + 1);\n});",
        "options": [
          "React skips the effect after 3 renders",
          "It causes an infinite re-render loop because setting state triggers a re-render which runs the effect again",
          "It throws a compilation error in Babel",
          "The state setter is ignored after the initial mount"
        ],
        "correctAnswer": "It causes an infinite re-render loop because setting state triggers a re-render which runs the effect again",
        "explanation": "Without a dependency array, useEffect executes on every render. Calling setState causes another render, looping endlessly."
      },
      {
        "question": "How can you cancel an ongoing fetch request inside useEffect if the component unmounts?",
        "codeSnippet": "useEffect(() => {\n  const controller = new AbortController();\n  fetch(url, { signal: controller.signal }).then(res => res.json());\n  return () => controller.abort();\n}, [url]);",
        "options": [
          "Delete the Promise reference from window",
          "Call `fetch.cancel()` directly",
          "Return a cleanup function that calls `controller.abort()` on an `AbortController` instance",
          "Throw an error inside the catch block"
        ],
        "correctAnswer": "Return a cleanup function that calls `controller.abort()` on an `AbortController` instance",
        "explanation": "Using standard Web API AbortController in useEffect cleanup cancels inflight requests and prevents stale state updates."
      },
      {
        "question": "Why should functions used inside useEffect be declared inside the effect or wrapped in useCallback?",
        "codeSnippet": "const fetchData = () => { /* ... */ };\nuseEffect(() => {\n  fetchData();\n}, [fetchData]);",
        "options": [
          "Because JavaScript cannot call outer functions from closures",
          "Because useEffect runs in a separate Web Worker thread",
          "Because React freezes all outer variables on first render",
          "Because declaring functions in the component body creates a new function reference every render, triggering the effect repeatedly if included in dependencies"
        ],
        "correctAnswer": "Because declaring functions in the component body creates a new function reference every render, triggering the effect repeatedly if included in dependencies",
        "explanation": "Non-memoized functions change identity every render. Putting them in dependency arrays triggers infinite or excessive effect executions."
      },
      {
        "question": "What is the behavior of useEffect in React 18 StrictMode in development?",
        "options": [
          "React mounts, unmounts, and re-mounts the component immediately to verify effect cleanup logic",
          "React disables all useEffect hooks in dev mode",
          "React logs a warning if any effect takes longer than 10ms",
          "React executes the effect once and silences console output"
        ],
        "correctAnswer": "React mounts, unmounts, and re-mounts the component immediately to verify effect cleanup logic",
        "explanation": "React 18 Strict Mode mounts, unmounts, and re-mounts components in development to expose missing cleanup logic and memory leaks."
      }
    ]
  },
  {
    "title": "React: Custom Hooks Architecture",
    "description": "Designing reusable hook abstractions, encapsulation, and composability.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Hooks"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Do two components using the exact same custom hook share the same state instance?",
        "codeSnippet": "function useCounter() {\n  const [count, setCount] = useState(0);\n  return [count, setCount];\n}\nfunction CompA() { const [c] = useCounter(); }\nfunction CompB() { const [c] = useCounter(); }",
        "options": [
          "Yes, all components sharing a custom hook share a singleton state store",
          "No, custom hooks share stateful logic, but each call to the hook gets its own isolated state",
          "Only if wrapped in React.memo",
          "Yes, unless they are placed in different DOM nodes"
        ],
        "correctAnswer": "No, custom hooks share stateful logic, but each call to the hook gets its own isolated state",
        "explanation": "Custom hooks reuse stateful logic and lifecycle algorithms, not the state values themselves. Every hook call produces an isolated state slot."
      },
      {
        "question": "What is the recommended convention for naming custom hooks in React?",
        "options": [
          "Start with `hook` (e.g. `hookWindowSize`)",
          "End with `Hook` (e.g. `windowSizeHook`)",
          "Start with the prefix `use` (e.g. `useWindowSize`) so React linters can enforce Hook Rules",
          "Any camelCase name is completely fine with no convention"
        ],
        "correctAnswer": "Start with the prefix `use` (e.g. `useWindowSize`) so React linters can enforce Hook Rules",
        "explanation": "The `use` prefix tells React linters that this function contains React hook calls and must follow the Rules of Hooks."
      },
      {
        "question": "What should you return from a custom hook that provides a value and multiple action functions?",
        "options": [
          "Only a single string",
          "Always an HTML element",
          "A generator function",
          "An object `{ value, actions... }` or tuple `[value, actions]` depending on consumer ergonomics"
        ],
        "correctAnswer": "An object `{ value, actions... }` or tuple `[value, actions]` depending on consumer ergonomics",
        "explanation": "Tuples `[a, b]` work great for 1-2 items (easy renaming), while objects `{ a, b, c }` are preferred when exposing multiple properties/actions."
      },
      {
        "question": "Why should custom hook return handlers be wrapped in `useCallback` when returned to consumers?",
        "codeSnippet": "function useToggle(initial = false) {\n  const [on, setOn] = useState(initial);\n  const toggle = useCallback(() => setOn(v => !v), []);\n  return { on, toggle };\n}",
        "options": [
          "To provide a stable function reference so consumer components can use it in their dependency arrays or memoized children",
          "Because unmemoized functions cannot be exported from hooks",
          "To convert the function into an asynchronous Promise",
          "Because React will throw an error otherwise"
        ],
        "correctAnswer": "To provide a stable function reference so consumer components can use it in their dependency arrays or memoized children",
        "explanation": "Returning stable callbacks ensures callers can safely pass them to `useEffect` or `React.memo` components without accidental re-evaluations."
      },
      {
        "question": "Can custom hooks call other custom hooks inside their body?",
        "options": [
          "No, custom hooks can only call useState and useEffect",
          "Yes, custom hooks are composable and can chain primitive or custom hooks together",
          "Only in class components",
          "Only if all hooks are synchronous"
        ],
        "correctAnswer": "Yes, custom hooks are composable and can chain primitive or custom hooks together",
        "explanation": "Custom hooks are standard functions that can compose any combination of built-in and third-party custom hooks."
      }
    ]
  },
  {
    "title": "React: useMemo & Computational Optimization",
    "description": "Caching expensive calculations and stabilizing reference dependencies.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Performance"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the primary purpose of `useMemo` in React?",
        "codeSnippet": "const sortedList = useMemo(() => {\n  return list.slice().sort((a, b) => expensiveCompare(a, b));\n}, [list]);",
        "options": [
          "To run asynchronous database queries",
          "To make DOM modifications directly",
          "To cache the result of an expensive computation between re-renders when dependencies have not changed",
          "To force a component to re-render every second"
        ],
        "correctAnswer": "To cache the result of an expensive computation between re-renders when dependencies have not changed",
        "explanation": "`useMemo` memoizes expensive calculated values across renders until one of its declared dependencies changes."
      },
      {
        "question": "When does the factory function passed to `useMemo` execute?",
        "options": [
          "Asynchronously after the browser paints",
          "In a background Web Worker",
          "Only before the component unmounts",
          "Synchronously during rendering"
        ],
        "correctAnswer": "Synchronously during rendering",
        "explanation": "`useMemo` runs during render. You should not perform side effects (like network requests or DOM mutations) inside `useMemo`."
      },
      {
        "question": "What is a common pitfall of overusing `useMemo` for trivial calculations (e.g. `useMemo(() => a + b, [a, b])`)?",
        "options": [
          "The overhead of storing dependency arrays and running comparison checks exceeds the trivial cost of basic arithmetic",
          "It crashes the JavaScript engine with a stack overflow",
          "It causes React to throw a syntax error in production",
          "It turns the arithmetic into string concatenation"
        ],
        "correctAnswer": "The overhead of storing dependency arrays and running comparison checks exceeds the trivial cost of basic arithmetic",
        "explanation": "Calling `useMemo` incurs memory allocations and comparison overhead; trivial math is cheaper to re-evaluate directly."
      },
      {
        "question": "How does `useMemo` help stabilize object references passed to child components?",
        "codeSnippet": "const config = useMemo(() => ({ theme, debug: true }), [theme]);\nreturn <Child config={config} />;",
        "options": [
          "It freezes the object so child components cannot read its properties",
          "It prevents generating a new object reference on every render, allowing `React.memo(Child)` to skip unnecessary re-renders",
          "It converts the object into JSON automatically",
          "It copies the object to localStorage"
        ],
        "correctAnswer": "It prevents generating a new object reference on every render, allowing `React.memo(Child)` to skip unnecessary re-renders",
        "explanation": "Inline object literals create new references every render. `useMemo` keeps the reference stable unless dependencies change."
      },
      {
        "question": "Does React guarantee that a memoized value will never be recalculated if dependencies do not change?",
        "options": [
          "Yes, it is guaranteed to persist forever in memory until page reload",
          "Yes, but only in development mode",
          "No, React treats `useMemo` as a performance hint and may clear its cache (e.g. for offscreen components or low memory)",
          "Yes, React stores it on the disk drive"
        ],
        "correctAnswer": "No, React treats `useMemo` as a performance hint and may clear its cache (e.g. for offscreen components or low memory)",
        "explanation": "React reserves the right to dump memoized caches to reclaim memory for offscreen components. Your code should function correctly without it."
      }
    ]
  },
  {
    "title": "React: useCallback & Event Handler Memoization",
    "description": "Stabilizing function references and avoiding stale closures.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Hooks"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the difference between `useMemo` and `useCallback`?",
        "options": [
          "`useCallback` is asynchronous while `useMemo` is synchronous",
          "`useCallback` can only be used with DOM events, while `useMemo` cannot",
          "`useMemo` is deprecated in React 18",
          "`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`; it returns the memoized function itself rather than calling it"
        ],
        "correctAnswer": "`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`; it returns the memoized function itself rather than calling it",
        "explanation": "`useCallback` caches a function definition between renders, while `useMemo` caches the calculated return value of calling a function."
      },
      {
        "question": "What is a 'stale closure' bug when using `useCallback`?",
        "codeSnippet": "const [count, setCount] = useState(0);\nconst logCount = useCallback(() => {\n  console.log(count);\n}, []); // empty deps",
        "options": [
          "`logCount` captures the initial value `0` from the first render closure and will always log `0` even when `count` updates",
          "The function produces a memory leak after 10 calls",
          "`count` is deleted from memory by the garbage collector",
          "The component fails to mount"
        ],
        "correctAnswer": "`logCount` captures the initial value `0` from the first render closure and will always log `0` even when `count` updates",
        "explanation": "Because `[]` dependencies never change, the callback is never re-created and permanently closes over the initial render's variables."
      },
      {
        "question": "How can you update state inside `useCallback` without adding the state variable to the dependency array?",
        "codeSnippet": "const handleIncrement = useCallback(() => {\n  setCount(prev => prev + 1);\n}, []);",
        "options": [
          "Wrap the state variable in `eval()`",
          "Use the functional updater form `setCount(prev => prev + 1)`",
          "Declare count on `window`",
          "Call `this.forceUpdate()`"
        ],
        "correctAnswer": "Use the functional updater form `setCount(prev => prev + 1)`",
        "explanation": "Functional state updates pass the fresh state value directly to your updater callback, removing the need to include the state variable in dependencies."
      },
      {
        "question": "When does wrapping an event handler in `useCallback` actually improve performance?",
        "options": [
          "On every button click handler regardless of component structure",
          "Only when the function has more than 10 arguments",
          "When passing the handler as a prop to a child component wrapped in `React.memo` or into another hook's dependency array",
          "When using HTML `<select>` elements exclusively"
        ],
        "correctAnswer": "When passing the handler as a prop to a child component wrapped in `React.memo` or into another hook's dependency array",
        "explanation": "If the child is not memoized, it will re-render anyway whenever the parent renders, making `useCallback` redundant overhead."
      },
      {
        "question": "What does `useCallback(fn, [a, b])` return when `a` or `b` changes?",
        "options": [
          "The previous cached reference unchanged",
          "A Promise resolving to `fn`",
          "`undefined`",
          "A new reference to `fn` with the updated closure scope"
        ],
        "correctAnswer": "A new reference to `fn` with the updated closure scope",
        "explanation": "When any dependency changes, `useCallback` discards the stale reference and returns the new function created during that render."
      }
    ]
  },
  {
    "title": "React: useRef & Mutable References",
    "description": "Accessing DOM nodes and storing mutable values without triggering re-renders.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Hooks"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the primary difference between `useState` and `useRef`?",
        "options": [
          "Updating a ref (`ref.current = val`) does NOT trigger a component re-render, whereas `setState` does",
          "`useRef` values are wiped out between re-renders",
          "`useRef` can only store HTML DOM elements, never numbers or objects",
          "`useState` can only hold strings"
        ],
        "correctAnswer": "Updating a ref (`ref.current = val`) does NOT trigger a component re-render, whereas `setState` does",
        "explanation": "`useRef` returns a persistent plain JavaScript object `{ current: initialValue }` that you can mutate without causing a re-render."
      },
      {
        "question": "How do you programmatically focus an input field using `useRef` on mount?",
        "codeSnippet": "const inputRef = useRef(null);\nuseEffect(() => {\n  inputRef.current?.focus();\n}, []);\nreturn <input ref={inputRef} />;",
        "options": [
          "Call `inputRef.focus()` inside JSX directly",
          "Attach the ref to `<input ref={inputRef} />` and call `inputRef.current.focus()` inside `useEffect`",
          "Pass `autoFocus={true}` to `useRef(inputRef)`",
          "Use `document.getElementsByTagName('input')[0]` inside `render`"
        ],
        "correctAnswer": "Attach the ref to `<input ref={inputRef} />` and call `inputRef.current.focus()` inside `useEffect`",
        "explanation": "React populates `ref.current` with the DOM node upon mounting, making it safely accessible inside `useEffect`."
      },
      {
        "question": "Why should you avoid reading or writing `ref.current` during rendering?",
        "codeSnippet": "function Bad() {\n  const count = useRef(0);\n  count.current++; // WRONG\n  return <div>{count.current}</div>;\n}",
        "options": [
          "Because JavaScript throws an illegal mutation error",
          "Because refs are deleted during render",
          "Because rendering must be a pure function with no observable side-effects; reading/writing refs during render breaks Concurrent Mode and idempotency",
          "Because refs cannot be read inside JSX"
        ],
        "correctAnswer": "Because rendering must be a pure function with no observable side-effects; reading/writing refs during render breaks Concurrent Mode and idempotency",
        "explanation": "React components must remain pure during render. Mutating or reading refs during render leads to unpredictable Concurrent Mode behaviors."
      },
      {
        "question": "What is a common non-DOM use case for `useRef`?",
        "options": [
          "Storing application theme that requires instant UI repaint",
          "Replacing React Redux store completely",
          "Compiling JSX to WebAssembly",
          "Storing timer IDs (e.g. `setTimeout`), previous props/state, or tracking whether a component has mounted"
        ],
        "correctAnswer": "Storing timer IDs (e.g. `setTimeout`), previous props/state, or tracking whether a component has mounted",
        "explanation": "`useRef` is ideal for storing any mutable data that needs to persist across renders without causing a re-render when modified."
      },
      {
        "question": "What does `forwardRef` allow a custom React component to do?",
        "codeSnippet": "const MyInput = forwardRef((props, ref) => (\n  <input {...props} ref={ref} />\n));",
        "options": [
          "It allows the parent component to pass a `ref` prop down into the child's underlying DOM element",
          "It redirects the user to another web page",
          "It skips the reconciliation phase",
          "It creates an automatic ref for all child components"
        ],
        "correctAnswer": "It allows the parent component to pass a `ref` prop down into the child's underlying DOM element",
        "explanation": "By default, functional components cannot take a `ref` prop. `forwardRef` exposes the ref argument so parent components can reach inner DOM nodes."
      }
    ]
  },
  {
    "title": "React: Controlled vs Uncontrolled Forms",
    "description": "Input state management, form data extraction, and validation patterns.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Forms"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What defines a 'controlled component' in React forms?",
        "codeSnippet": "<input value={text} onChange={e => setText(e.target.value)} />",
        "options": [
          "The input is disabled and read-only by the browser",
          "The input's form data is handled by a React component state via `value` and `onChange` handlers",
          "The input is validated by the server before keystrokes register",
          "The input is rendered inside a Web Component shadow DOM"
        ],
        "correctAnswer": "The input's form data is handled by a React component state via `value` and `onChange` handlers",
        "explanation": "A controlled component has its value driven by React state, which updates via the `onChange` event handler on every user keystroke."
      },
      {
        "question": "What defines an 'uncontrolled component'?",
        "codeSnippet": "<input type=\"text\" ref={inputRef} defaultValue=\"Alice\" />",
        "options": [
          "The input cannot be submitted",
          "The input lacks an HTML ID attribute",
          "Form data is handled by the DOM itself, and values are read via refs or FormData when needed",
          "The input's value changes randomly"
        ],
        "correctAnswer": "Form data is handled by the DOM itself, and values are read via refs or FormData when needed",
        "explanation": "Uncontrolled components store their value in the DOM; you read them on submit using refs or the `FormData` API."
      },
      {
        "question": "What warning does React throw if an input starts with `value={undefined}` and later becomes `value=\"text\"`?",
        "options": [
          "State cannot be modified inside an input element",
          "Input must have a type of password",
          "Missing key prop on input",
          "A component is changing an uncontrolled input to be controlled (or vice versa)"
        ],
        "correctAnswer": "A component is changing an uncontrolled input to be controlled (or vice versa)",
        "explanation": "An initial `undefined` or `null` makes the input uncontrolled. Changing it to a defined string makes it controlled, prompting React's warning."
      },
      {
        "question": "How can you read all fields of an uncontrolled form easily on submit without creating individual refs for each field?",
        "codeSnippet": "function handleSubmit(e) {\n  e.preventDefault();\n  const data = new FormData(e.currentTarget);\n  console.log(Object.fromEntries(data.entries()));\n}",
        "options": [
          "Construct a new `FormData(e.currentTarget)` and extract values by input `name` attributes",
          "Read `window.inputs` array",
          "Loop over `document.body.children`",
          "Use `JSON.parse(e.target)`"
        ],
        "correctAnswer": "Construct a new `FormData(e.currentTarget)` and extract values by input `name` attributes",
        "explanation": "The standard browser `FormData` API reads all named inputs in a form submission cleanly without managing individual React state or refs."
      },
      {
        "question": "Why do controlled inputs provide easier real-time input masking (e.g. credit card formatting)?",
        "options": [
          "Because controlled inputs run faster in the browser engine",
          "Because the value passes through React state on every keypress, allowing transformation/formatting before updating the display",
          "Because uncontrolled inputs cannot handle numbers",
          "Because React encrypts controlled input values automatically"
        ],
        "correctAnswer": "Because the value passes through React state on every keypress, allowing transformation/formatting before updating the display",
        "explanation": "With controlled state, you can intercept `onChange`, strip non-digits, insert dashes/spaces, and set the formatted string in state."
      }
    ]
  },
  {
    "title": "React: Context API & Prop Drilling",
    "description": "Global state distribution, provider optimization, and context modularity.",
    "difficulty": "mid",
    "tags": [
      "React",
      "State Management"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What performance issue can occur when passing a non-memoized object value to a Context.Provider?",
        "codeSnippet": "<UserContext.Provider value={{ user, theme }}>\n  {children}\n</UserContext.Provider>",
        "options": [
          "The context value is reset to null after 1 second",
          "React throws a circular dependency error",
          "A new object reference is created on every render of the provider, forcing all consumer components to re-render even if `user` and `theme` did not change",
          "The children cannot access the context values"
        ],
        "correctAnswer": "A new object reference is created on every render of the provider, forcing all consumer components to re-render even if `user` and `theme` did not change",
        "explanation": "Context consumers re-render whenever the `value` prop changes by `Object.is` comparison. New object literals trigger re-renders on every parent render."
      },
      {
        "question": "How do you properly optimize a Context.Provider value object?",
        "codeSnippet": "const contextValue = useMemo(() => ({ user, theme }), [user, theme]);\nreturn <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;",
        "options": [
          "Use `Object.freeze` directly in the JSX",
          "Pass individual string props instead of an object",
          "Convert the object to an array",
          "Wrap the value object in `useMemo` with appropriate dependencies"
        ],
        "correctAnswer": "Wrap the value object in `useMemo` with appropriate dependencies",
        "explanation": "Memoizing the context value with `useMemo` ensures its reference only updates when one of the actual dependencies changes."
      },
      {
        "question": "What is an effective pattern to prevent components that only need dispatch/actions from re-rendering when state changes?",
        "options": [
          "Split state and dispatch into two separate contexts (e.g. `StateContext` and `DispatchContext`)",
          "Use `localStorage` instead of Context",
          "Disable re-renders in `package.json`",
          "Wrap all buttons in `useMemo`"
        ],
        "correctAnswer": "Split state and dispatch into two separate contexts (e.g. `StateContext` and `DispatchContext`)",
        "explanation": "Splitting state and dispatch allows components that only trigger actions to subscribe to `DispatchContext` and never re-render when state updates."
      },
      {
        "question": "What does `useContext(MyContext)` return if called outside of `<MyContext.Provider>`?",
        "codeSnippet": "const MyContext = createContext('defaultVal');",
        "options": [
          "`undefined` always",
          "The default value passed to `createContext('defaultVal')`",
          "It throws a fatal React runtime exception",
          "`null` always"
        ],
        "correctAnswer": "The default value passed to `createContext('defaultVal')`",
        "explanation": "When a component lacks a matching Provider above it in the tree, `useContext` falls back to the default argument given to `createContext`."
      },
      {
        "question": "Why should Context API NOT be used as a high-frequency global store (e.g. 60fps animations or rapid mouse position tracking)?",
        "options": [
          "Context only works with HTTP requests",
          "Context cannot store numbers",
          "Context lacks fine-grained selector subscriptions: every subscribed consumer re-renders on any value change",
          "Context pauses browser requestAnimationFrame"
        ],
        "correctAnswer": "Context lacks fine-grained selector subscriptions: every subscribed consumer re-renders on any value change",
        "explanation": "Context does not support partial slice subscriptions. Any change to the context value triggers re-renders across all consumer components."
      }
    ]
  },
  {
    "title": "React: React.memo & Component Memoization",
    "description": "Skipping component re-renders with shallow equality comparisons.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Performance"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does `React.memo` do for a functional component?",
        "codeSnippet": "const MemoizedComp = React.memo(MyComponent);",
        "options": [
          "It caches HTTP responses returned by the component",
          "It permanently blocks state updates inside the component",
          "It forces the component to render only on mobile devices",
          "It shallowly compares incoming props with previous props; if identical, React skips rendering the component and reuses the last rendered result"
        ],
        "correctAnswer": "It shallowly compares incoming props with previous props; if identical, React skips rendering the component and reuses the last rendered result",
        "explanation": "`React.memo` is a higher-order component that skips rendering when props are shallowly equal to the previous render."
      },
      {
        "question": "Does `React.memo` prevent a component from re-rendering if its internal `useState` updates?",
        "options": [
          "No, a component wrapped in `React.memo` still re-renders when its own state or context changes",
          "Yes, `React.memo` completely locks all internal state updates",
          "Only in production mode",
          "Yes, unless `forceUpdate` is called"
        ],
        "correctAnswer": "No, a component wrapped in `React.memo` still re-renders when its own state or context changes",
        "explanation": "`React.memo` only checks props passed from the parent. Internal state updates or context value changes will still trigger a re-render."
      },
      {
        "question": "What is the signature and return expectation of the custom `areEqual` comparison function in `React.memo`?",
        "codeSnippet": "React.memo(MyComp, (prevProps, nextProps) => {\n  return prevProps.id === nextProps.id;\n});",
        "options": [
          "Return `true` to force re-render, and `false` to skip re-render",
          "Return `true` if props are equal (do NOT re-render), and `false` if props are different (re-render)",
          "Return the newly calculated JSX element",
          "Return a numerical diff score between 0 and 1"
        ],
        "correctAnswer": "Return `true` if props are equal (do NOT re-render), and `false` if props are different (re-render)",
        "explanation": "Unlike `shouldComponentUpdate` which returns `true` to re-render, `areEqual` in `React.memo` returns `true` if props are equal (skip render)."
      },
      {
        "question": "Why will `<MemoizedChild onClick={() => doSomething()} />` fail to benefit from `React.memo`?",
        "options": [
          "React.memo does not support `onClick` props",
          "Arrow functions cannot be passed through props in React 18",
          "An inline arrow function creates a new function reference every time the parent renders, failing shallow equality comparison",
          "The browser garbage collector removes the click listener"
        ],
        "correctAnswer": "An inline arrow function creates a new function reference every time the parent renders, failing shallow equality comparison",
        "explanation": "Every parent render instantiates a new arrow function object in memory. Shallow equality (`prev.onClick === next.onClick`) evaluates to `false`."
      },
      {
        "question": "When should you NOT wrap a component in `React.memo`?",
        "options": [
          "When the component has more than 2 props",
          "When the component renders SVG icons",
          "When using CSS modules",
          "When the component is cheap to render or its props almost always change on every parent render anyway"
        ],
        "correctAnswer": "When the component is cheap to render or its props almost always change on every parent render anyway",
        "explanation": "If props change on every render, the shallow comparison check runs pointlessly before rendering anyway, wasting CPU cycles."
      }
    ]
  },
  {
    "title": "React: useReducer & Complex State Logic",
    "description": "Predictable state transitions, action types, and reducer purity.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Hooks"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "When is `useReducer` generally preferred over multiple `useState` calls?",
        "options": [
          "When state has complex logic, multiple sub-values, or when the next state depends on multiple previous state properties",
          "When you only need to store a single boolean toggle",
          "When you need to make asynchronous GraphQL calls",
          "When you want to bypass React reconciliation"
        ],
        "correctAnswer": "When state has complex logic, multiple sub-values, or when the next state depends on multiple previous state properties",
        "explanation": "`useReducer` consolidates state transitions into a central pure function, making complex multi-step state mutations predictable and testable."
      },
      {
        "question": "Why must reducer functions passed to `useReducer` be pure functions?",
        "codeSnippet": "function reducer(state, action) {\n  switch (action.type) {\n    case 'INCREMENT': return { ...state, count: state.count + 1 };\n    default: return state;\n  }\n}",
        "options": [
          "Because JavaScript engines forbid if-else statements inside impure functions",
          "Because React may invoke reducers multiple times during Concurrent rendering; side-effects or mutations cause inconsistent state bugs",
          "Because impure reducers cannot return JavaScript objects",
          "Because browsers will crash on impure functions"
        ],
        "correctAnswer": "Because React may invoke reducers multiple times during Concurrent rendering; side-effects or mutations cause inconsistent state bugs",
        "explanation": "Pure functions ensure that given the same state and action, the output is identical with zero side effects (no network calls, no direct mutations)."
      },
      {
        "question": "Does the `dispatch` function returned by `useReducer` maintain a stable reference across renders?",
        "codeSnippet": "const [state, dispatch] = useReducer(reducer, initialState);",
        "options": [
          "No, dispatch changes on every render",
          "Only if wrapped in `useCallback`",
          "Yes, React guarantees `dispatch` identity is stable and will not change on re-renders",
          "Only when using TypeScript"
        ],
        "correctAnswer": "Yes, React guarantees `dispatch` identity is stable and will not change on re-renders",
        "explanation": "React guarantees that `dispatch` is referentially stable across all renders, so it can safely be omitted from hook dependency arrays."
      },
      {
        "question": "How can you lazily initialize state with `useReducer` to avoid expensive computations on every render?",
        "codeSnippet": "const [state, dispatch] = useReducer(reducer, initialArg, initFunction);",
        "options": [
          "Pass a Promise to the reducer",
          "Declare `lazy: true` in the action object",
          "Call `dispatch({ type: 'INIT' })` inside `render`",
          "Pass an `init` function as the 3rd argument to `useReducer(reducer, initialArg, init)`"
        ],
        "correctAnswer": "Pass an `init` function as the 3rd argument to `useReducer(reducer, initialArg, init)`",
        "explanation": "The 3rd argument `init(initialArg)` calculates the initial state lazily once on mount rather than on every render."
      },
      {
        "question": "What happens if a reducer returns the identical state object reference (`return state`)?",
        "options": [
          "React bails out of re-rendering child components and updating the DOM",
          "React throws a runtime exception",
          "React resets state to null",
          "React logs a warning about missing mutations"
        ],
        "correctAnswer": "React bails out of re-rendering child components and updating the DOM",
        "explanation": "If the reducer returns the exact same object reference (`Object.is(state, newState)` is true), React bails out without re-rendering."
      }
    ]
  },
  {
    "title": "React: Error Boundaries & Fallback UIs",
    "description": "Catching render-phase crashes, componentDidCatch, and recovery boundaries.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Architecture"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Which lifecycle methods must a class component implement to act as an Error Boundary?",
        "options": [
          "`componentWillMount()` and `componentWillUnmount()`",
          "`static getDerivedStateFromError()` to render fallback UI and `componentDidCatch()` to log errors",
          "`renderError()` and `catchError()`",
          "`handleError()` and `postError()`"
        ],
        "correctAnswer": "`static getDerivedStateFromError()` to render fallback UI and `componentDidCatch()` to log errors",
        "explanation": "Error boundaries use `static getDerivedStateFromError(error)` to update fallback state and `componentDidCatch(error, info)` for reporting/logging."
      },
      {
        "question": "Which of the following errors can an Error Boundary NOT catch?",
        "options": [
          "Errors inside child component render methods",
          "Errors inside child component constructor",
          "Asynchronous code (e.g. `setTimeout` or `fetch`), event handlers, and SSR errors",
          "Errors inside child component lifecycle methods"
        ],
        "correctAnswer": "Asynchronous code (e.g. `setTimeout` or `fetch`), event handlers, and SSR errors",
        "explanation": "Error boundaries only catch errors thrown during rendering, lifecycle methods, and constructors in the tree below them. They do NOT catch errors in event handlers or async callbacks."
      },
      {
        "question": "Why don't functional components have a built-in `useErrorBoundary` hook in standard React?",
        "options": [
          "Functional components cannot throw errors",
          "JavaScript prohibits try-catch inside hooks",
          "Fiber architecture is being replaced",
          "React has not implemented functional equivalents for `componentDidCatch` or `getDerivedStateFromError` yet"
        ],
        "correctAnswer": "React has not implemented functional equivalents for `componentDidCatch` or `getDerivedStateFromError` yet",
        "explanation": "Error boundaries currently still require class components (or battle-tested libraries like `react-error-boundary` which wrap them)."
      },
      {
        "question": "How should you handle errors that happen inside an `onClick` event handler?",
        "codeSnippet": "const handleClick = async () => {\n  try {\n    await sendData();\n  } catch (err) {\n    setError(err.message);\n  }\n};",
        "options": [
          "Use a regular `try...catch` block inside the event handler and set component error state",
          "Wrap the button in an Error Boundary",
          "Rethrow the error into window.onerror",
          "Do nothing; React catches it automatically"
        ],
        "correctAnswer": "Use a regular `try...catch` block inside the event handler and set component error state",
        "explanation": "Because event handlers run outside of the render cycle, errors thrown inside them do not crash the React render tree and should be caught with standard `try...catch`."
      },
      {
        "question": "What is the benefit of placing multiple Error Boundaries in different sections of a web application?",
        "options": [
          "It doubles the application rendering speed",
          "A crash in one widget (e.g. a broken chat box) only replaces that widget with a fallback UI, without taking down the entire page",
          "It prevents any network errors from occurring",
          "It eliminates the need for unit testing"
        ],
        "correctAnswer": "A crash in one widget (e.g. a broken chat box) only replaces that widget with a fallback UI, without taking down the entire page",
        "explanation": "Granular error boundaries isolate component crashes, allowing the rest of the application (navigation, sidebars, dashboard) to remain fully interactive."
      }
    ]
  },
  {
    "title": "React: Portals & Modal Management",
    "description": "Rendering outside parent hierarchy with createPortal and event bubbling.",
    "difficulty": "mid",
    "tags": [
      "React",
      "DOM"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does `ReactDOM.createPortal(children, container)` do?",
        "codeSnippet": "return createPortal(\n  <div className=\"modal\">{children}</div>,\n  document.getElementById('modal-root')\n);",
        "options": [
          "Loads a web page inside an iframe",
          "Copies child elements to all browser tabs",
          "Renders children into a different DOM node outside the parent component's DOM hierarchy while retaining React tree behaviors",
          "Renders children in an isolated Web Worker"
        ],
        "correctAnswer": "Renders children into a different DOM node outside the parent component's DOM hierarchy while retaining React tree behaviors",
        "explanation": "Portals let you render a component's visual DOM node anywhere in the document (like `document.body`) while keeping its position in the React component tree."
      },
      {
        "question": "How does React synthetic event bubbling behave with portals?",
        "codeSnippet": "<div onClick={handleParentClick}>\n  <ModalWithPortal />\n</div>",
        "options": [
          "Events stop bubbling at the portal boundary and never reach the parent",
          "Events bubble to `document.body` only",
          "Synthetic events are completely disabled inside portals",
          "Events bubble according to the React component tree hierarchy, NOT the actual HTML DOM tree hierarchy"
        ],
        "correctAnswer": "Events bubble according to the React component tree hierarchy, NOT the actual HTML DOM tree hierarchy",
        "explanation": "Even if a portal renders into `#modal-root`, clicking inside the portal triggers event handlers on the React parent component according to the React virtual tree."
      },
      {
        "question": "Why are Portals widely used for Modals, Tooltips, and Dropdowns?",
        "options": [
          "To escape CSS `overflow: hidden` or `z-index` stacking context traps created by parent containers",
          "Because portals render without JavaScript",
          "Because browsers refuse to render divs without portals",
          "To speed up CSS flexbox calculation"
        ],
        "correctAnswer": "To escape CSS `overflow: hidden` or `z-index` stacking context traps created by parent containers",
        "explanation": "Parent elements with `overflow: hidden` or tricky stacking contexts clip nested modals. Portals render them at `document.body` to avoid clipping."
      },
      {
        "question": "How should you clean up a portal DOM container created dynamically on mount?",
        "codeSnippet": "useEffect(() => {\n  const el = document.createElement('div');\n  document.body.appendChild(el);\n  return () => document.body.removeChild(el);\n}, []);",
        "options": [
          "Set `el.style.display = 'none'` permanently",
          "Remove the created DOM element in the `useEffect` cleanup return function",
          "Call `ReactDOM.destroy(el)`",
          "DOM nodes clean themselves up automatically on unmount"
        ],
        "correctAnswer": "Remove the created DOM element in the `useEffect` cleanup return function",
        "explanation": "Manually appended DOM elements must be removed when the portal unmounts to prevent dangling DOM nodes and memory leaks."
      },
      {
        "question": "Can Context API values be accessed by components rendered inside a Portal?",
        "options": [
          "No, portals cut off context inheritance completely",
          "Only if the context is defined on window",
          "Yes, because the portal maintains its position within the React virtual tree and context propagates normally",
          "Only if using Redux"
        ],
        "correctAnswer": "Yes, because the portal maintains its position within the React virtual tree and context propagates normally",
        "explanation": "Portals exist at their normal position in the React hierarchy, so all React features (Context, life cycle, error boundaries) work seamlessly."
      }
    ]
  },
  {
    "title": "React: Compound Component Pattern",
    "description": "Designing flexible, expressive UI primitives that share implicit state.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Design Patterns"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the Compound Component pattern in React?",
        "codeSnippet": "<Select value={val} onChange={setVal}>\n  <Select.Option value=\"1\">One</Select.Option>\n  <Select.Option value=\"2\">Two</Select.Option>\n</Select>",
        "options": [
          "A method of combining HTML with CSS inside WebAssembly",
          "A component that imports at least 10 npm packages",
          "A deprecated pattern replaced by Redux",
          "A pattern where components work together to share implicit state and logic while giving consumers flexible control over JSX composition"
        ],
        "correctAnswer": "A pattern where components work together to share implicit state and logic while giving consumers flexible control over JSX composition",
        "explanation": "Compound components (like `<select>` and `<option>`) communicate implicitly via Context, providing an expressive and customizable API."
      },
      {
        "question": "How do subcomponents typically share state with the parent in modern Compound Components?",
        "codeSnippet": "const TabsContext = createContext();\nfunction Tabs({ children, activeTab, onChange }) {\n  return <TabsContext.Provider value={{ activeTab, onChange }}>{children}</TabsContext.Provider>;\n}",
        "options": [
          "Via an internal React Context Provider wrapping the compound component children",
          "By writing to global `window` properties",
          "By cloning DOM nodes with querySelector",
          "Through WebSocket communication"
        ],
        "correctAnswer": "Via an internal React Context Provider wrapping the compound component children",
        "explanation": "Using an internal React Context is the modern, robust approach for compound components because it works at any nesting depth."
      },
      {
        "question": "What was the legacy approach to compound components before Context was widely used?",
        "codeSnippet": "React.Children.map(children, child => React.cloneElement(child, { active, onSelect }))",
        "options": [
          "Global event emitters",
          "`React.Children.map` and `React.cloneElement` to inject props into direct children",
          "Direct prototype manipulation",
          "Using `eval` on child tags"
        ],
        "correctAnswer": "`React.Children.map` and `React.cloneElement` to inject props into direct children",
        "explanation": "Early React libraries used `React.Children.map` and `cloneElement`, but this broke if children were wrapped inside intermediate helper divs."
      },
      {
        "question": "How do compound subcomponents guard against being rendered outside of their parent container?",
        "codeSnippet": "function useTabsContext() {\n  const ctx = useContext(TabsContext);\n  if (!ctx) throw new Error('Tabs compound components must be rendered inside <Tabs>');\n  return ctx;\n}",
        "options": [
          "By checking `typeof window !== 'undefined'`",
          "By inspecting `document.referrer`",
          "By creating a custom hook that checks if context is `undefined`/`null` and throws a descriptive error",
          "By inspecting child class names"
        ],
        "correctAnswer": "By creating a custom hook that checks if context is `undefined`/`null` and throws a descriptive error",
        "explanation": "A custom consumer hook that throws an error when context is missing provides immediate developer feedback for improper usage."
      },
      {
        "question": "What is an advantage of Compound Components over a massive single component with dozens of configuration props?",
        "options": [
          "Reduces JavaScript bundle size to 0 bytes",
          "Removes the need for CSS",
          "Runs faster in WebGL",
          "High flexibility: consumers can reorder, conditionally render, or add custom wrappers around subcomponents without prop bloating"
        ],
        "correctAnswer": "High flexibility: consumers can reorder, conditionally render, or add custom wrappers around subcomponents without prop bloating",
        "explanation": "Compound components avoid prop explosion (e.g. `titleProps`, `buttonProps`, `headerContent`) by letting consumers compose the JSX structure naturally."
      }
    ]
  },
  {
    "title": "React: Higher-Order Components (HOCs)",
    "description": "Component enhancement, static hoisting, and composition patterns.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Design Patterns"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is a Higher-Order Component (HOC) in React?",
        "codeSnippet": "const withAuth = (WrappedComponent) => {\n  return (props) => {\n    const { user } = useAuth();\n    if (!user) return <LoginRedirect />;\n    return <WrappedComponent {...props} user={user} />;\n  };\n};",
        "options": [
          "A pure function that takes a component as an argument and returns an enhanced new component",
          "A component rendered at the highest z-index on the screen",
          "A class that extends HTMLElement directly",
          "A hook that replaces React.createContext"
        ],
        "correctAnswer": "A pure function that takes a component as an argument and returns an enhanced new component",
        "explanation": "An HOC is a JavaScript function that accepts a component and returns an augmented component with additional props or wrapper logic."
      },
      {
        "question": "Why must you NOT create or apply an HOC inside another component's render method?",
        "codeSnippet": "function Parent() {\n  const EnhancedChild = withRouter(Child); // ANTI-PATTERN\n  return <EnhancedChild />;\n}",
        "options": [
          "JavaScript syntax does not permit functions inside render",
          "It creates a brand new component identity on every single render, causing full unmounting, loss of state, and performance degradation",
          "It causes an immediate infinite network request loop",
          "The wrapped component cannot access HTML props"
        ],
        "correctAnswer": "It creates a brand new component identity on every single render, causing full unmounting, loss of state, and performance degradation",
        "explanation": "Applying HOCs inside render creates a new component type every render cycle, destroying the previous component tree and all internal state."
      },
      {
        "question": "What happens to static methods attached to the wrapped component when it is enhanced by an HOC?",
        "options": [
          "They are automatically copied by the JavaScript prototype chain",
          "Static methods are deleted by the browser",
          "They are not copied over automatically; you must manually hoist them or use `hoist-non-react-statics`",
          "React converts static methods to React hooks"
        ],
        "correctAnswer": "They are not copied over automatically; you must manually hoist them or use `hoist-non-react-statics`",
        "explanation": "Returning a new container component does not copy static methods from the wrapped component without explicit hoisting."
      },
      {
        "question": "Why must an HOC forward unused props to the wrapped component (`{...props}`)?",
        "options": [
          "To satisfy the React compiler license",
          "To convert props into CSS classes",
          "To prevent props from being garbage collected",
          "To ensure the wrapped component receives all props intended for it that the HOC does not consume"
        ],
        "correctAnswer": "To ensure the wrapped component receives all props intended for it that the HOC does not consume",
        "explanation": "HOCs should be transparent to props they don't explicitly consume, forwarding all other props to the wrapped component."
      },
      {
        "question": "Why have Custom Hooks largely replaced HOCs for sharing stateful logic in modern React?",
        "options": [
          "Hooks avoid wrapper hell (deeply nested component trees), prop collisions, and provide clearer data flow inside component bodies",
          "HOCs were completely removed from React 18",
          "Hooks run on the GPU while HOCs run on the CPU",
          "Hooks require zero JavaScript syntax"
        ],
        "correctAnswer": "Hooks avoid wrapper hell (deeply nested component trees), prop collisions, and provide clearer data flow inside component bodies",
        "explanation": "Hooks allow composing stateful logic flatly inside a component without adding unnecessary layers to the React component hierarchy."
      }
    ]
  },
  {
    "title": "React: Render Props Pattern",
    "description": "Inverting rendering control through functional children and dynamic render props.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Design Patterns"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the Render Props pattern in React?",
        "codeSnippet": "<MouseTracker render={({ x, y }) => (\n  <h1>The mouse position is ({x}, {y})</h1>\n)} />",
        "options": [
          "A method of injecting CSS directly into the GPU",
          "A technique for sharing code between components using a prop whose value is a function that returns React elements",
          "Passing raw HTML strings to `dangerouslySetInnerHTML`",
          "A built-in prop on all DOM tags"
        ],
        "correctAnswer": "A technique for sharing code between components using a prop whose value is a function that returns React elements",
        "explanation": "A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic."
      },
      {
        "question": "How does the 'children as a function' pattern relate to render props?",
        "codeSnippet": "<DataFetcher url=\"/api/user\">\n  {({ data, loading }) => loading ? <Spinner /> : <Profile user={data} />}\n</DataFetcher>",
        "options": [
          "It is a different language feature unique to JSX 2.0",
          "It only works with SVG elements",
          "It is the exact same pattern, but uses `props.children` as the function instead of a named prop like `render`",
          "It disables component lifecycle methods"
        ],
        "correctAnswer": "It is the exact same pattern, but uses `props.children` as the function instead of a named prop like `render`",
        "explanation": "`children` is simply another prop. Passing a function as `children` is identical in behavior to passing a function to a prop named `render`."
      },
      {
        "question": "What is a potential performance caveat when defining a render prop function inline in JSX?",
        "codeSnippet": "<Mouse render={coords => <Display {...coords} />} />",
        "options": [
          "It causes memory leaks in the browser network stack",
          "It forces the browser to recompile JavaScript every millisecond",
          "It prevents CSS animations from running",
          "An inline function creates a new reference on every render, which will bypass `React.memo` optimizations on the container component"
        ],
        "correctAnswer": "An inline function creates a new reference on every render, which will bypass `React.memo` optimizations on the container component",
        "explanation": "Creating inline functions creates new references on every render. If the container is wrapped in `React.memo`, the prop change invalidates memoization."
      },
      {
        "question": "What advantage did Render Props have over Higher-Order Components before Hooks existed?",
        "options": [
          "Explicit data flow: you can see exactly what parameters are passed and rename them freely without prop collisions",
          "Render props can be written in plain HTML without JavaScript",
          "Render props do not execute on the main thread",
          "Render props bypass the React virtual DOM completely"
        ],
        "correctAnswer": "Explicit data flow: you can see exactly what parameters are passed and rename them freely without prop collisions",
        "explanation": "Render props make where data comes from immediately obvious in the JSX, whereas HOCs inject invisible props that can collide."
      },
      {
        "question": "Can custom hooks achieve everything that render props did for sharing stateful logic?",
        "options": [
          "No, custom hooks cannot return functions",
          "Yes, custom hooks provide a cleaner and flatter syntax for sharing stateful logic without adding nesting to the JSX tree",
          "Only in Next.js applications",
          "No, hooks only work for string values"
        ],
        "correctAnswer": "Yes, custom hooks provide a cleaner and flatter syntax for sharing stateful logic without adding nesting to the JSX tree",
        "explanation": "Hooks solved the exact problem render props tackled, but with a flat, procedural syntax that eliminates nesting and wrapper boilerplate."
      }
    ]
  },
  {
    "title": "React: Synthetic Events & Native Event Bridging",
    "description": "Event pooling, event delegation roots, and stopPropagation subtleties.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Events"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is React's SyntheticEvent?",
        "options": [
          "An event generated by a neural network inside the browser",
          "A fake event that never touches the browser DOM",
          "A cross-browser wrapper around the browser's native event that normalizes event behaviors across browsers",
          "A Web Audio API synthesizer event"
        ],
        "correctAnswer": "A cross-browser wrapper around the browser's native event that normalizes event behaviors across browsers",
        "explanation": "React provides `SyntheticEvent` to ensure consistent event properties and behavior across all supported web browsers."
      },
      {
        "question": "Where does React 17+ attach its top-level event listeners?",
        "options": [
          "To the `document` object",
          "Directly to every single target HTML element",
          "To `window.top`",
          "To the root DOM container node where your React tree is mounted (e.g. `#root`)"
        ],
        "correctAnswer": "To the root DOM container node where your React tree is mounted (e.g. `#root`)",
        "explanation": "In React 17+, event listeners are attached to the root DOM container node (`rootNode`) instead of `document`, making nested React apps much safer."
      },
      {
        "question": "How do you access the browser's underlying native DOM event from a React synthetic event handler?",
        "codeSnippet": "function handleClick(e) {\n  const rawEvent = e.nativeEvent;\n}",
        "options": [
          "Via the `e.nativeEvent` property on the synthetic event object",
          "Via `window.currentEvent`",
          "By calling `e.toNative()`",
          "By casting `(e as NativeEvent)`"
        ],
        "correctAnswer": "Via the `e.nativeEvent` property on the synthetic event object",
        "explanation": "`e.nativeEvent` gives direct access to the underlying native browser event."
      },
      {
        "question": "What happened to Event Pooling (`e.persist()`) in React 17?",
        "options": [
          "Event pooling became mandatory for all mouse events",
          "Event pooling was completely removed in React 17, so event properties are no longer wiped out asynchronously",
          "It was moved to a separate npm package `react-pooling`",
          "It now runs in a WebAssembly worker"
        ],
        "correctAnswer": "Event pooling was completely removed in React 17, so event properties are no longer wiped out asynchronously",
        "explanation": "React 17 eliminated event pooling entirely. You can now read event fields inside async callbacks without needing `e.persist()`."
      },
      {
        "question": "What happens when `e.stopPropagation()` is called on a React SyntheticEvent?",
        "options": [
          "It reloads the page",
          "It halts all CSS animations on the page",
          "It prevents the event from bubbling up the React component tree and reaching parent React event handlers",
          "It cancels the HTTP request"
        ],
        "correctAnswer": "It prevents the event from bubbling up the React component tree and reaching parent React event handlers",
        "explanation": "`e.stopPropagation()` stops the synthetic event from propagating further up the React virtual tree."
      }
    ]
  },
  {
    "title": "React: Optimistic UI Updates",
    "description": "Instant feedback, failure rollbacks, and optimistic state synchronization.",
    "difficulty": "mid",
    "tags": [
      "React",
      "UX Patterns"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is an 'Optimistic UI update' in web applications?",
        "options": [
          "Showing cheerful animations to users during loading spinners",
          "Predicting which page the user will navigate to next",
          "Never checking HTTP status codes from the server",
          "Updating the UI immediately as if an asynchronous action succeeded, then rolling back if the server request fails"
        ],
        "correctAnswer": "Updating the UI immediately as if an asynchronous action succeeded, then rolling back if the server request fails",
        "explanation": "Optimistic UI makes apps feel snappy by reflecting the anticipated success state in the UI before receiving the server's response."
      },
      {
        "question": "How do you implement rollback logic when an optimistic update fails?",
        "codeSnippet": "const prevLikes = likes;\nsetLikes(likes + 1);\ntry {\n  await api.likePost(postId);\n} catch (err) {\n  setLikes(prevLikes);\n  showToast('Failed to like post');\n}",
        "options": [
          "Capture the previous state before updating, and restore it inside the `catch` block if the network call rejects",
          "Call `history.back()` in the browser",
          "Trigger a hard browser page reload",
          "Delete the database entry"
        ],
        "correctAnswer": "Capture the previous state before updating, and restore it inside the `catch` block if the network call rejects",
        "explanation": "Saving a snapshot of state before the optimistic mutation allows immediate reversion in the error catch block."
      },
      {
        "question": "What hook was introduced in React 19 to simplify optimistic UI management?",
        "codeSnippet": "const [optimisticState, setOptimistic] = useOptimistic(actualState, updateFn);",
        "options": [
          "`useRollback`",
          "`useOptimistic`",
          "`useInstantUI`",
          "`useAsyncState`"
        ],
        "correctAnswer": "`useOptimistic`",
        "explanation": "React 19 introduced `useOptimistic` specifically for managing temporary optimistic values that automatically revert when async actions finish."
      },
      {
        "question": "Why should temporary items added via optimistic updates be given temporary unique IDs (e.g. `temp-${Date.now()}`)?",
        "options": [
          "To prevent CSS classes from colliding",
          "Because MongoDB forbids integer keys",
          "To satisfy React's `key` prop requirement during rendering before the permanent server-generated ID arrives",
          "To speed up browser garbage collection"
        ],
        "correctAnswer": "To satisfy React's `key` prop requirement during rendering before the permanent server-generated ID arrives",
        "explanation": "Temporary IDs provide unique React keys for list items while awaiting the real database ID returned by the backend."
      },
      {
        "question": "What is a potential UX risk of optimistic updates if not designed carefully?",
        "options": [
          "The browser battery drains twice as fast",
          "The user's monitor brightness increases",
          "The component unmounts prematurely",
          "A user thinks their action succeeded, navigates away, and is surprised later when the unsaved change is lost due to a silent failure"
        ],
        "correctAnswer": "A user thinks their action succeeded, navigates away, and is surprised later when the unsaved change is lost due to a silent failure",
        "explanation": "If optimistic mutations fail silently without clear notifications or retry mechanisms, users experience confusing data loss."
      }
    ]
  },
  {
    "title": "React: Race Conditions in Data Fetching",
    "description": "Mitigating out-of-order network responses, cancellation, and stale payloads.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Async"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What causes a data fetching race condition in a React component?",
        "codeSnippet": "useEffect(() => {\n  fetchUser(userId).then(data => setUser(data));\n}, [userId]);",
        "options": [
          "If `userId` changes rapidly, the network request for an earlier ID may resolve AFTER the request for the latest ID, overwriting fresh data with stale data",
          "Two threads in V8 attempting to write to the same memory block",
          "The browser dropping HTTP packets due to high CPU load",
          "React re-rendering before the promise is declared"
        ],
        "correctAnswer": "If `userId` changes rapidly, the network request for an earlier ID may resolve AFTER the request for the latest ID, overwriting fresh data with stale data",
        "explanation": "Network latency is non-deterministic. A slow initial request can finish after a fast subsequent request, displaying obsolete data."
      },
      {
        "question": "How does the boolean 'ignore' flag pattern in `useEffect` prevent race conditions?",
        "codeSnippet": "useEffect(() => {\n  let ignore = false;\n  fetchData(id).then(data => {\n    if (!ignore) setData(data);\n  });\n  return () => { ignore = true; };\n}, [id]);",
        "options": [
          "It instructs the backend server to abort the SQL query",
          "The cleanup function sets `ignore = true` on re-render, so obsolete callbacks discard their result instead of updating state",
          "It disables JavaScript execution in the browser",
          "It forces the browser to discard all network caches"
        ],
        "correctAnswer": "The cleanup function sets `ignore = true` on re-render, so obsolete callbacks discard their result instead of updating state",
        "explanation": "When dependencies change or the component unmounts, the cleanup function flags the previous effect cycle as stale so its resolution is discarded."
      },
      {
        "question": "What is an advantage of using `AbortController` over the boolean ignore flag?",
        "codeSnippet": "useEffect(() => {\n  const controller = new AbortController();\n  fetch(url, { signal: controller.signal });\n  return () => controller.abort();\n}, [url]);",
        "options": [
          "`AbortController` runs synchronously inside the server",
          "`AbortController` prevents 404 HTTP errors",
          "`AbortController` actually aborts the HTTP request in flight, saving network bandwidth and browser memory",
          "`AbortController` converts the fetch request into a WebSocket"
        ],
        "correctAnswer": "`AbortController` actually aborts the HTTP request in flight, saving network bandwidth and browser memory",
        "explanation": "An `AbortController` physically terminates the ongoing HTTP connection in the browser network layer, freeing up bandwidth."
      },
      {
        "question": "Why does modern React recommend data-fetching libraries (TanStack Query, SWR) over raw `useEffect` fetching?",
        "options": [
          "They compile React components to native C++ binaries",
          "They allow fetching data without an active internet connection",
          "`useEffect` will be removed in future versions of React",
          "They handle race conditions, deduplication, caching, background refetching, and error states automatically out of the box"
        ],
        "correctAnswer": "They handle race conditions, deduplication, caching, background refetching, and error states automatically out of the box",
        "explanation": "Dedicated querying libraries abstract away edge cases like race conditions, window focus refetching, and memory caching."
      },
      {
        "question": "How should you handle the `AbortError` thrown when an aborted fetch promise rejects?",
        "codeSnippet": "catch (err) {\n  if (err.name === 'AbortError') return;\n  setError(err);\n}",
        "options": [
          "Check `if (err.name === 'AbortError')` and ignore it, because an intentional cancellation is not an application error",
          "Log an emergency critical alert to Sentry",
          "Crash the component with an error boundary",
          "Restart the browser tab"
        ],
        "correctAnswer": "Check `if (err.name === 'AbortError')` and ignore it, because an intentional cancellation is not an application error",
        "explanation": "Aborting a fetch throws a DOMException named `AbortError`. Applications should filter this out to prevent false error notifications."
      }
    ]
  },
  {
    "title": "React: State Colocation & Lifting State",
    "description": "Balancing component locality, tree scope, and global state avoidance.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Architecture"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is 'State Colocation' in React architecture?",
        "options": [
          "Storing all state in the same physical database table",
          "Keeping state as close to where it is used as possible, rather than prematurely putting everything into global state",
          "Putting all useState calls inside a single custom hook",
          "Hosting client and server on the same physical machine"
        ],
        "correctAnswer": "Keeping state as close to where it is used as possible, rather than prematurely putting everything into global state",
        "explanation": "Colocating state prevents unnecessary re-renders across distant parts of the component tree and simplifies refactoring."
      },
      {
        "question": "When should you 'Lift State Up' in React?",
        "options": [
          "When an app reaches 1,000 lines of code",
          "Whenever a component has more than 3 props",
          "When two or more sibling components need to reflect or modify the same changing data",
          "Only when using TypeScript"
        ],
        "correctAnswer": "When two or more sibling components need to reflect or modify the same changing data",
        "explanation": "Lifting state to their closest common ancestor allows sibling components to share and synchronize that state via props."
      },
      {
        "question": "What problem arises when an entire application's state is lifted to the root `<App />` component?",
        "options": [
          "React disables JSX transpilation",
          "Browser cookies are deleted",
          "The DOM can only show 10 elements",
          "Any single keystroke or state change in any child causes the entire component tree to re-render from the root"
        ],
        "correctAnswer": "Any single keystroke or state change in any child causes the entire component tree to re-render from the root",
        "explanation": "Root-level state triggers top-level re-renders. Every component in the application gets re-evaluated unless carefully memoized."
      },
      {
        "question": "How does component composition (passing JSX as `children`) help avoid lifting state?",
        "codeSnippet": "function SplitPane({ left, right }) {\n  return <div className=\"split\">{left}{right}</div>;\n}",
        "options": [
          "The parent component manages layout without knowing or re-rendering child state, keeping child state isolated within each child",
          "It forces children to run in parallel Web Workers",
          "It eliminates the need for CSS grid",
          "It compiles children ahead of time"
        ],
        "correctAnswer": "The parent component manages layout without knowing or re-rendering child state, keeping child state isolated within each child",
        "explanation": "Slot composition lets parents manage structure while children manage their own state without needing to lift state up."
      },
      {
        "question": "What is a clear indicator that state should be pushed DOWN into a child component?",
        "options": [
          "The state is an array of objects",
          "Only one specific child component consumes or modifies that state, and no other siblings care about it",
          "The state is fetched over HTTPS",
          "The component is rendered in dark mode"
        ],
        "correctAnswer": "Only one specific child component consumes or modifies that state, and no other siblings care about it",
        "explanation": "If only one child uses the state, holding it in the parent is unnecessary overhead. Colocating it down into that child is ideal."
      }
    ]
  },
  {
    "title": "React: Form Validation & Touched State",
    "description": "Tracking interaction states, blur triggers, and asynchronous field validation.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Forms"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Why should form validation errors typically only be shown after a field has been 'touched' (blurred)?",
        "options": [
          "Because browsers crash if errors render before blur",
          "Because React state cannot be updated on keypress",
          "To avoid annoying the user with error messages before they have finished typing their initial input into the field",
          "Because HTML inputs do not support errors on change"
        ],
        "correctAnswer": "To avoid annoying the user with error messages before they have finished typing their initial input into the field",
        "explanation": "Showing 'Invalid email' while the user has only typed their first three letters is poor UX. Waiting for `onBlur` provides a much cleaner experience."
      },
      {
        "question": "How do you track whether a form input has been interacted with by the user?",
        "codeSnippet": "<input\n  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}\n/>",
        "options": [
          "Check if `document.activeElement === null`",
          "Inspect the CSS `:visited` pseudo-class",
          "Store the mouse cursor coordinates",
          "Listen to the `onBlur` event on the input and update a `touched` state object with the field name"
        ],
        "correctAnswer": "Listen to the `onBlur` event on the input and update a `touched` state object with the field name",
        "explanation": "The `onBlur` event fires when focus leaves the input, signaling that the user has interacted with the field and moved on."
      },
      {
        "question": "How should a form handle validation when the user clicks 'Submit' without touching every field?",
        "codeSnippet": "function handleSubmit(e) {\n  e.preventDefault();\n  setTouched({ name: true, email: true, password: true });\n  if (isValid) submitData();\n}",
        "options": [
          "Mark all fields as touched simultaneously to reveal all validation errors at once if validation fails",
          "Block the submit button from ever being clicked",
          "Clear the form fields automatically",
          "Submit the invalid data and let the server crash"
        ],
        "correctAnswer": "Mark all fields as touched simultaneously to reveal all validation errors at once if validation fails",
        "explanation": "Marking all fields touched on submit ensures users see all missing or invalid fields immediately if they skip them."
      },
      {
        "question": "How do you debounce an asynchronous field validation (e.g. checking username availability)?",
        "codeSnippet": "useEffect(() => {\n  const timer = setTimeout(() => validateUsername(username), 500);\n  return () => clearTimeout(timer);\n}, [username]);",
        "options": [
          "Add an infinite loop inside `onChange`",
          "Use a `setTimeout` inside `useEffect` and clear the timeout in the effect's cleanup function",
          "Disable network requests in `package.json`",
          "Wrap the input in `React.memo`"
        ],
        "correctAnswer": "Use a `setTimeout` inside `useEffect` and clear the timeout in the effect's cleanup function",
        "explanation": "Debouncing postpones the API call until the user stops typing for a given duration, preventing redundant server requests."
      },
      {
        "question": "What is the recommended approach for disabling the submit button during submission?",
        "codeSnippet": "<button type=\"submit\" disabled={isSubmitting}>\n  {isSubmitting ? 'Saving...' : 'Save'}\n</button>",
        "options": [
          "Remove the button from the DOM completely",
          "Delete the form `onSubmit` handler",
          "Track an `isSubmitting` boolean state and apply the `disabled` attribute to the submit button while pending",
          "Call `window.stop()`"
        ],
        "correctAnswer": "Track an `isSubmitting` boolean state and apply the `disabled` attribute to the submit button while pending",
        "explanation": "Disabling the submit button while an async submission is pending prevents duplicate submissions and double-charges."
      }
    ]
  },
  {
    "title": "React: Clean Architecture in React Apps",
    "description": "Layered separation: UI views, custom hooks, and API client boundaries.",
    "difficulty": "mid",
    "tags": [
      "React",
      "Architecture"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "In Clean Architecture for React, where should API network calls (e.g. `axios` or `fetch`) live?",
        "options": [
          "Directly inside JSX inline `onClick` handlers",
          "Inside CSS style tags",
          "Inside the public `index.html` file",
          "In dedicated API service modules or data-layer hooks, decoupled from UI presentation components"
        ],
        "correctAnswer": "In dedicated API service modules or data-layer hooks, decoupled from UI presentation components",
        "explanation": "Decoupling API requests into dedicated service files keeps UI components focused on visual rendering and makes testing straightforward."
      },
      {
        "question": "What is the role of Custom Hooks in Clean React Architecture?",
        "options": [
          "They serve as the Presentation Logic / ViewModel layer, orchestrating state, side-effects, and domain actions for UI components",
          "They replace the backend database",
          "They compile JavaScript into WebAssembly",
          "They manage CSS animations only"
        ],
        "correctAnswer": "They serve as the Presentation Logic / ViewModel layer, orchestrating state, side-effects, and domain actions for UI components",
        "explanation": "Custom hooks bridge UI views with domain and network logic, keeping presentation components clean, declarative, and easily testable."
      },
      {
        "question": "Why is it beneficial to separate 'Smart/Container' components from 'Dumb/Presentational' components?",
        "options": [
          "Smart components run 10x faster in Google Chrome",
          "Presentational components are pure, easy to reuse in storybooks and unit tests, and independent of specific backend schemas",
          "Presentational components cannot use CSS",
          "React requires this separation by compiler rule"
        ],
        "correctAnswer": "Presentational components are pure, easy to reuse in storybooks and unit tests, and independent of specific backend schemas",
        "explanation": "Separating data-fetching containers from presentational components allows UI widgets to be reused across different data sources."
      },
      {
        "question": "What is the Single Responsibility Principle (SRP) as applied to a React component?",
        "options": [
          "A component must never have more than 1 prop",
          "An application must have exactly one root component and no children",
          "A component should ideally do one thing: either render a piece of UI, manage a specific slice of state, or orchestrate layout",
          "A component can only be mounted once in the entire application lifetime"
        ],
        "correctAnswer": "A component should ideally do one thing: either render a piece of UI, manage a specific slice of state, or orchestrate layout",
        "explanation": "SRP encourages small, focused components that are easy to understand, test, maintain, and refactor."
      },
      {
        "question": "How do barrel export files (`index.js` in a feature folder) improve codebase maintainability?",
        "codeSnippet": "// components/index.js\nexport { Button } from './Button';\nexport { Card } from './Card';",
        "options": [
          "They minify the code automatically at runtime",
          "They prevent npm install from failing",
          "They encrypt sensitive component source code",
          "They provide a unified, clean public API for a module, hiding internal file structure details from consumers"
        ],
        "correctAnswer": "They provide a unified, clean public API for a module, hiding internal file structure details from consumers",
        "explanation": "Barrel files consolidate module exports, allowing consumers to import from a single clean path rather than reaching deep into internal files."
      }
    ]
  }
];
