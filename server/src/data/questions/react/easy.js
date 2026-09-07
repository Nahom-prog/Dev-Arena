export const reactEasyQuizzes = [
  {
    "title": "React: JSX Syntax & Elements",
    "description": "JSX expressions, fragments, and single root requirements.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Why must React components return a single root JSX element or Fragment?",
        "codeSnippet": "return (\n  <>\n    <h1>Title</h1>\n    <p>Subtitle</p>\n  </>\n);",
        "options": [
          "JSX compiles to `React.createElement()` calls, which must evaluate to a single JavaScript object",
          "Browsers cannot render more than one HTML node at once",
          "Fragments prevent CSS from leaking into other components",
          "React Fiber limits memory to one node per component"
        ],
        "correctAnswer": "JSX compiles to `React.createElement()` calls, which must evaluate to a single JavaScript object",
        "explanation": "Every JSX expression compiles into a function call (`React.createElement` or `_jsx`), which returns a single value/object."
      },
      {
        "question": "What does the fragment shorthand `<>...</>` render in the real DOM?",
        "options": [
          "A `<div>` wrapper tag",
          "No extra wrapper DOM elements: children are inserted directly into the parent container",
          "A `<fragment>` tag",
          "A `<template>` tag"
        ],
        "correctAnswer": "No extra wrapper DOM elements: children are inserted directly into the parent container",
        "explanation": "Fragments let you group children without adding unnecessary DOM nodes to HTML."
      },
      {
        "question": "When MUST you use explicit `<React.Fragment>` instead of `<>...</>`?",
        "codeSnippet": "items.map(item => (\n  <React.Fragment key={item.id}>\n    <dt>{item.term}</dt>\n    <dd>{item.desc}</dd>\n  </React.Fragment>\n))",
        "options": [
          "When adding CSS classes",
          "When using TypeScript (.tsx)",
          "When passing a `key` prop in a mapped collection",
          "When rendering more than 5 children"
        ],
        "correctAnswer": "When passing a `key` prop in a mapped collection",
        "explanation": "The shorthand `<>...</>` does not accept attributes. Passing `key` requires `<React.Fragment key={...}>`."
      },
      {
        "question": "How do you embed a dynamic JavaScript expression inside JSX?",
        "codeSnippet": "const user = 'Alex';\nreturn <h1>Hello, {user}!</h1>;",
        "options": [
          "Enclosing in double curly braces `{{user}}`",
          "Using `${user}` syntax",
          "Using quotes `\"user\"`",
          "Enclosing the expression in single curly braces `{user}`"
        ],
        "correctAnswer": "Enclosing the expression in single curly braces `{user}`",
        "explanation": "Single curly braces `{}` evaluate JavaScript expressions inside JSX."
      },
      {
        "question": "What do booleans, `null`, and `undefined` render when placed directly in JSX expression braces?",
        "options": [
          "They render nothing (blank/empty output)",
          "The literal text 'false', 'null', 'undefined'",
          "They throw a runtime error",
          "They render empty comment tags"
        ],
        "correctAnswer": "They render nothing (blank/empty output)",
        "explanation": "React ignores booleans, `null`, and `undefined` as children, enabling patterns like `{isOpen && <Modal />}`."
      }
    ]
  },
  {
    "title": "React: Props & Immutability",
    "description": "Passing data down, read-only props contract, and unidirectional data flow.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the primary rule regarding component `props`?",
        "options": [
          "Props can be modified directly by children",
          "Props are read-only: a component must never mutate its own props directly",
          "Props are global variables",
          "Props are deleted when components unmount"
        ],
        "correctAnswer": "Props are read-only: a component must never mutate its own props directly",
        "explanation": "React relies on unidirectional data flow; props are immutable inputs to components."
      },
      {
        "question": "How do you pass a numeric value `42` as a prop in JSX?",
        "codeSnippet": "<Counter count={42} />",
        "options": [
          "`<Counter count=\"42\" />` (which passes a string)",
          "`<Counter count=42 />`",
          "`<Counter count={42} />`",
          "`<Counter :count=\"42\" />`"
        ],
        "correctAnswer": "`<Counter count={42} />`",
        "explanation": "Passing non-string values (numbers, booleans, arrays, objects) requires curly braces `{}`."
      },
      {
        "question": "How can a child component notify its parent of a user interaction or data change?",
        "codeSnippet": "function Child({ onSave }) {\n  return <button onClick={() => onSave('data')}>Save</button>;\n}",
        "options": [
          "By modifying `window.parentProps`",
          "By emitting a custom DOM event",
          "By mutating the parent's state object directly",
          "By invoking a callback function passed down as a prop from the parent"
        ],
        "correctAnswer": "By invoking a callback function passed down as a prop from the parent",
        "explanation": "Parents pass callbacks down as props; children invoke them to send data up."
      },
      {
        "question": "What does the JSX spread attribute `<Component {...props} />` do?",
        "options": [
          "Forwards each key-value pair of the object as individual props to the component",
          "Passes a single prop named `props` containing the object",
          "Clones the component in memory",
          "Freezes the object"
        ],
        "correctAnswer": "Forwards each key-value pair of the object as individual props to the component",
        "explanation": "JSX spread expands object properties into individual attributes on the element."
      },
      {
        "question": "What is 'unidirectional data flow' in React?",
        "options": [
          "Data flows left-to-right across sibling components",
          "Data flows downward from parent to child via props, while events flow upward via callbacks",
          "Data is two-way bound between HTML inputs and JavaScript variables automatically",
          "Data flows from the DOM to the server only"
        ],
        "correctAnswer": "Data flows downward from parent to child via props, while events flow upward via callbacks",
        "explanation": "Top-down data flow keeps component relationships predictable and easier to debug."
      }
    ]
  },
  {
    "title": "React: `useState` Fundamentals",
    "description": "Component state, updater functions, and triggering re-renders.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does the `useState` hook return?",
        "codeSnippet": "const [count, setCount] = useState(0);",
        "options": [
          "A single reactive object with getters and setters",
          "A reference to the DOM element",
          "A tuple of 2 elements: the current state value, and a state setter function",
          "A promise resolving to the state value"
        ],
        "correctAnswer": "A tuple of 2 elements: the current state value, and a state setter function",
        "explanation": "`useState` returns an array `[state, setState]`, destructured for convenient access."
      },
      {
        "question": "What happens when you call a state setter function like `setCount(count + 1)`?",
        "options": [
          "The variable updates immediately on the next line of code",
          "The entire webpage reloads from scratch",
          "Only the HTML text node is replaced without executing the component function",
          "React schedules a re-render of the component with the updated state value"
        ],
        "correctAnswer": "React schedules a re-render of the component with the updated state value",
        "explanation": "State setters enqueue a re-render, executing the component function again to compute the updated UI."
      },
      {
        "question": "Why should `setCount(prev => prev + 1)` be used when updating state based on previous state?",
        "options": [
          "It guarantees you work with the latest pending state value and avoids stale closure bugs in batched updates",
          "It makes the update run in a web worker",
          "It prevents re-rendering",
          "It saves memory in V8"
        ],
        "correctAnswer": "It guarantees you work with the latest pending state value and avoids stale closure bugs in batched updates",
        "explanation": "Updater functions receive the latest queued state, preventing race conditions."
      },
      {
        "question": "What is lazy initial state in `useState(() => expensiveCalculation())`?",
        "options": [
          "It delays rendering by 500 milliseconds",
          "Passing a function runs the calculation ONLY during the initial mount, avoiding re-calculation on every render",
          "It loads state from localStorage asynchronously",
          "It imports the component lazily"
        ],
        "correctAnswer": "Passing a function runs the calculation ONLY during the initial mount, avoiding re-calculation on every render",
        "explanation": "Passing an initializer function ensures heavy calculations run once on mount."
      },
      {
        "question": "What happens if you mutate state directly without calling the setter function?",
        "codeSnippet": "const [user, setUser] = useState({ name: 'Dan' });\nuser.name = 'Alex'; // Direct mutation!",
        "options": [
          "React throws a fatal TypeError immediately",
          "The component re-renders twice",
          "React does NOT know state changed, so no re-render is triggered and UI becomes out of sync",
          "V8 automatically wraps the object in a Proxy"
        ],
        "correctAnswer": "React does NOT know state changed, so no re-render is triggered and UI becomes out of sync",
        "explanation": "React relies on setter calls and `Object.is` reference inequality to trigger re-renders."
      }
    ]
  },
  {
    "title": "React: Event Handling in JSX",
    "description": "Synthetic events, passing functions vs invoking functions, and event parameters.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the correct syntax for attaching a click event handler in React?",
        "codeSnippet": "function handleClick() { console.log('clicked'); }\nreturn <button onClick={handleClick}>Click</button>;",
        "options": [
          "`onClick={handleClick()}` (invoking function immediately)",
          "`onclick=\"handleClick()\"`",
          "`on-click={handleClick}`",
          "`onClick={handleClick}` (passing function reference)"
        ],
        "correctAnswer": "`onClick={handleClick}` (passing function reference)",
        "explanation": "JSX requires camelCase `onClick` and accepts a function reference without calling it immediately."
      },
      {
        "question": "What happens if you write `<button onClick={alert('Hello!')}>Click</button>`?",
        "options": [
          "The alert fires immediately on render, and `onClick` receives `undefined`",
          "The alert fires only when the user clicks the button",
          "React throws a compile error",
          "The button is disabled automatically"
        ],
        "correctAnswer": "The alert fires immediately on render, and `onClick` receives `undefined`",
        "explanation": "Placing `()` executes the function during render. Wrap it in an arrow function: `onClick={() => alert('Hello!')}`."
      },
      {
        "question": "How do you pass arguments to an event handler in JSX?",
        "codeSnippet": "return <button onClick={() => handleDelete(item.id)}>Delete</button>;",
        "options": [
          "Write `onClick={handleDelete(item.id)}`",
          "Wrap the call in an inline arrow function: `onClick={() => handleDelete(item.id)}`",
          "Write `onClick=\"handleDelete(item.id)\"`",
          "Use the `data-argument` attribute"
        ],
        "correctAnswer": "Wrap the call in an inline arrow function: `onClick={() => handleDelete(item.id)}`",
        "explanation": "An arrow function creates a closure capturing the argument to execute on click."
      },
      {
        "question": "How do you prevent default browser form submission in React?",
        "codeSnippet": "function handleSubmit(e) {\n  e.preventDefault();\n}",
        "options": [
          "Returning `false` from the function",
          "Setting `default=\"prevent\"` on the form",
          "Calling `e.preventDefault()` on the event object",
          "Deleting the form's action attribute"
        ],
        "correctAnswer": "Calling `e.preventDefault()` on the event object",
        "explanation": "In React, you cannot return `false` to prevent default behavior; you must explicitly call `e.preventDefault()`."
      },
      {
        "question": "What is `e.target` in an event handler?",
        "options": [
          "The React Fiber node representation",
          "The parent component function",
          "The current URL pathname",
          "A reference to the underlying DOM element that dispatched the event"
        ],
        "correctAnswer": "A reference to the underlying DOM element that dispatched the event",
        "explanation": "`e.target` points to the DOM element where the event originated."
      }
    ]
  },
  {
    "title": "React: Conditional Rendering (`&&`, Ternary)",
    "description": "Ternary operators, logical AND guardrails, and zero rendering traps.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How do you conditionally render one of two components in JSX?",
        "codeSnippet": "{isLoggedIn ? <UserDashboard /> : <LoginForm />}",
        "options": [
          "`{condition ? <TrueComponent /> : <FalseComponent />}`",
          "`if (condition) <TrueComponent /> else <FalseComponent />` inside JSX",
          "`<switch condition={isLoggedIn}>...`",
          "`condition && <TrueComponent /> || <FalseComponent />`"
        ],
        "correctAnswer": "`{condition ? <TrueComponent /> : <FalseComponent />}`",
        "explanation": "The ternary operator is an expression that embeds directly inside JSX curly braces."
      },
      {
        "question": "What is the 'falsy zero' trap when using logical AND (`&&`) in React?",
        "codeSnippet": "const count = 0;\nreturn <div>{count && <Badge count={count} />}</div>;",
        "options": [
          "React throws a runtime TypeError",
          "The expression evaluates to `0`, causing React to render the literal number `0` in the UI instead of nothing",
          "`Badge` is rendered with count 0",
          "The entire page crashes"
        ],
        "correctAnswer": "The expression evaluates to `0`, causing React to render the literal number `0` in the UI instead of nothing",
        "explanation": "In JS, `0 && ...` evaluates to `0`. Since `0` is a number, React renders it. Use `{count > 0 && ...}`."
      },
      {
        "question": "What can a component return if it should render nothing at all?",
        "options": [
          "`\"none\"`",
          "`undefined` (which causes a warning in older React)",
          "`null`",
          "`{}`"
        ],
        "correctAnswer": "`null`",
        "explanation": "Returning `null` tells React to mount no DOM nodes for this component."
      },
      {
        "question": "Can standard `if-else` statements be written directly inside JSX tags?",
        "options": [
          "Yes, standard if-else statements are valid inside JSX",
          "Only if the statement has no else branch",
          "Only in Next.js",
          "No, `if-else` is a statement, not an expression; JSX curly braces only accept expressions"
        ],
        "correctAnswer": "No, `if-else` is a statement, not an expression; JSX curly braces only accept expressions",
        "explanation": "JSX requires expressions that evaluate to a value. Use ternaries or move `if-else` before the return statement."
      },
      {
        "question": "How do you safely render content only when an optional object exists?",
        "codeSnippet": "{user && <h2>Hello, {user.name}!</h2>}",
        "options": [
          "Using logical AND: `{user && <h2>Hello, {user.name}!</h2>}`",
          "Using `{try { user.name } catch { null }}`",
          "Using `<user.name />`",
          "Using `@user ? <h2>...`"
        ],
        "correctAnswer": "Using logical AND: `{user && <h2>Hello, {user.name}!</h2>}`",
        "explanation": "Logical AND short-circuits on nullish values, preventing null reference errors."
      }
    ]
  },
  {
    "title": "React: List Rendering & Key Prop Importance",
    "description": "Mapping arrays, reconciliation identity, stable keys, and index-as-key pitfalls.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Which array method is standard for rendering dynamic lists in JSX?",
        "codeSnippet": "items.map(item => <li key={item.id}>{item.name}</li>)",
        "options": [
          "`.forEach()`",
          "`.map()`",
          "`.filter()`",
          "`.reduce()`"
        ],
        "correctAnswer": "`.map()`",
        "explanation": "`.map()` transforms an array of data into an array of JSX elements."
      },
      {
        "question": "Why does React require a `key` prop on elements in a list?",
        "options": [
          "Keys are required by CSS for styling",
          "Keys set the HTML `id` attribute in the DOM",
          "Keys give elements a stable identity across renders so React can track additions, removals, and reorders during reconciliation",
          "Keys encrypt the list data in memory"
        ],
        "correctAnswer": "Keys give elements a stable identity across renders so React can track additions, removals, and reorders during reconciliation",
        "explanation": "React's diffing algorithm matches old and new children by `key` to minimize DOM mutations."
      },
      {
        "question": "Why is using array index as `key` (`key={index}`) discouraged for dynamic lists?",
        "options": [
          "Indices cause JavaScript runtime exceptions",
          "Array index keys increase bundle size by 20%",
          "Indices cannot be converted to strings",
          "If items are inserted, deleted, or sorted, indices change, causing component local state to attach to the wrong item"
        ],
        "correctAnswer": "If items are inserted, deleted, or sorted, indices change, causing component local state to attach to the wrong item",
        "explanation": "Indices shift on insertion or deletion, confusing React's state matching across list items."
      },
      {
        "question": "What makes an ideal `key` in a React list?",
        "options": [
          "A unique, stable ID from your data source (like `item.id`) that does not change between renders",
          "`Math.random()` generated inside the render function",
          "`Date.now()`",
          "The index multiplied by 100"
        ],
        "correctAnswer": "A unique, stable ID from your data source (like `item.id`) that does not change between renders",
        "explanation": "Keys must be stable and unique among siblings. Generating random keys forces complete DOM recreation every render."
      },
      {
        "question": "Where should the `key` prop be placed when rendering a custom child component in a list?",
        "codeSnippet": "items.map(item => <ListItem key={item.id} data={item} />)",
        "options": [
          "Inside the `ListItem` implementation on its root `<li>` tag",
          "On the outermost JSX element returned directly inside the `.map()` callback (e.g. `<ListItem key={item.id} />`)",
          "Both on the component call and inside the component",
          "On the parent `<ul>` tag"
        ],
        "correctAnswer": "On the outermost JSX element returned directly inside the `.map()` callback (e.g. `<ListItem key={item.id} />`)",
        "explanation": "The `key` belongs on the element in the array iteration context."
      }
    ]
  },
  {
    "title": "React: Controlled Inputs & Form State",
    "description": "Single source of truth, `value` and `onChange`, and syncing form elements with state.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is a 'controlled component' in React form handling?",
        "codeSnippet": "const [email, setEmail] = useState('');\nreturn <input value={email} onChange={e => setEmail(e.target.value)} />;",
        "options": [
          "An input element controlled by a third-party jQuery library",
          "An input element that cannot be edited by the user",
          "An input element whose value is driven by React state and updated exclusively through an `onChange` handler",
          "An input element wrapped in a `<form>` tag"
        ],
        "correctAnswer": "An input element whose value is driven by React state and updated exclusively through an `onChange` handler",
        "explanation": "In controlled inputs, React state serves as the single source of truth."
      },
      {
        "question": "What warning does React issue if you pass `value` to an `<input>` without an `onChange` handler?",
        "options": [
          "Error: Missing form action",
          "Fatal: Cannot compile static input",
          "No warning: inputs are editable by default",
          "Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field."
        ],
        "correctAnswer": "Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field.",
        "explanation": "Setting `value` without `onChange` locks the input to that string unless marked `readOnly`."
      },
      {
        "question": "How do you manage a controlled checkbox in React?",
        "codeSnippet": "const [agreed, setAgreed] = useState(false);\nreturn <input type=\"checkbox\" checked={agreed} onChange={e => setAgreed(e.target.checked)} />;",
        "options": [
          "Use the `checked` attribute for value and read `e.target.checked` in `onChange`",
          "Use the `value` attribute and read `e.target.value`",
          "Use `selected={agreed}`",
          "Checkboxes cannot be controlled in React"
        ],
        "correctAnswer": "Use the `checked` attribute for value and read `e.target.checked` in `onChange`",
        "explanation": "Checkboxes use boolean `checked` rather than string `value`, reading state from `e.target.checked`."
      },
      {
        "question": "What happens if a controlled input switches from `value={undefined}` to a string?",
        "options": [
          "The input is cleared",
          "React logs a warning: A component is changing an uncontrolled input to be controlled",
          "The input element is re-created",
          "The browser crashes"
        ],
        "correctAnswer": "React logs a warning: A component is changing an uncontrolled input to be controlled",
        "explanation": "Inputs must decide whether to be controlled or uncontrolled from the start. Initialize with `''` instead of `undefined`."
      },
      {
        "question": "How can a single `onChange` handler handle multiple input fields on a form?",
        "codeSnippet": "const handleChange = (e) => {\n  setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));\n};",
        "options": [
          "Creating an array of inputs",
          "Reading `document.querySelectorAll('input')`",
          "Using computed property names with `e.target.name`: `[e.target.name]: e.target.value`",
          "Using separate state hooks only"
        ],
        "correctAnswer": "Using computed property names with `e.target.name`: `[e.target.name]: e.target.value`",
        "explanation": "Matching `name` attributes to state keys lets a single handler update form state dynamically."
      }
    ]
  },
  {
    "title": "React: Lifting State Up",
    "description": "Sharing state among sibling components by hoisting state to their closest common ancestor.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does 'lifting state up' mean in React?",
        "codeSnippet": "function Parent() {\n  const [query, setQuery] = useState('');\n  return (\n    <>\n      <SearchBar query={query} onQueryChange={setQuery} />\n      <SearchResults query={query} />\n    </>\n  );\n}",
        "options": [
          "Moving state to global Redux store",
          "Saving state in the browser URL hash",
          "Elevating state to an HTML5 web worker",
          "Moving shared state to the closest common ancestor of the components that need it"
        ],
        "correctAnswer": "Moving shared state to the closest common ancestor of the components that need it",
        "explanation": "When sibling components need the same data, lift state to their nearest common parent."
      },
      {
        "question": "Why can sibling components NOT directly read each other's local state in React?",
        "options": [
          "React maintains strictly isolated component scopes and top-down unidirectional data flow",
          "Siblings execute on different threads",
          "V8 prevents sibling closures from communicating",
          "React forbids sibling components entirely"
        ],
        "correctAnswer": "React maintains strictly isolated component scopes and top-down unidirectional data flow",
        "explanation": "Components encapsulate local state; inter-component communication routes through parents."
      },
      {
        "question": "What does the common parent pass to the two sibling components?",
        "options": [
          "Two separate Redux actions",
          "The state value to the consumer child, and an updater callback to the mutating child",
          "A shared DOM reference and a cookie",
          "A WebSocket channel"
        ],
        "correctAnswer": "The state value to the consumer child, and an updater callback to the mutating child",
        "explanation": "The parent provides data downward as props and handles mutation requests via callbacks."
      },
      {
        "question": "What is an advantage of lifting state up over introducing a global state manager?",
        "options": [
          "It makes the app run offline",
          "It encrypts state variables",
          "It maintains clear component boundaries, localizes re-renders, and avoids extra external dependencies",
          "It eliminates the need for `useState`"
        ],
        "correctAnswer": "It maintains clear component boundaries, localizes re-renders, and avoids extra external dependencies",
        "explanation": "Keeping state in the nearest parent keeps architecture clean and minimizes unnecessary re-renders."
      },
      {
        "question": "When should state NOT be lifted up?",
        "options": [
          "When the component has more than 2 props",
          "When using TypeScript",
          "When the state is a string",
          "When the state is only relevant to a single component (e.g. dropdown toggle, hover state)"
        ],
        "correctAnswer": "When the state is only relevant to a single component (e.g. dropdown toggle, hover state)",
        "explanation": "Keep state as local as possible to avoid redundant parent re-renders."
      }
    ]
  },
  {
    "title": "React: Component Composition & Children Prop",
    "description": "The `children` prop, slot patterns, containment, and avoiding prop drilling.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the special `children` prop in React?",
        "codeSnippet": "function Card({ children }) {\n  return <div className=\"card\">{children}</div>;\n}\n// Usage: <Card><h1>Title</h1></Card>",
        "options": [
          "A prop automatically populated with content nested between a component's opening and closing tags",
          "An array of child component constructor names",
          "A list of child DOM node IDs",
          "A property used only in class components"
        ],
        "correctAnswer": "A prop automatically populated with content nested between a component's opening and closing tags",
        "explanation": "Nested JSX tags pass their content into the wrapping component as `props.children`."
      },
      {
        "question": "How can you create multiple 'slots' (header, sidebar, content) using props?",
        "codeSnippet": "<Layout header={<Nav />} sidebar={<Menu />}>{mainContent}</Layout>",
        "options": [
          "Use the `<slot name=\"header\">` HTML element",
          "Pass JSX elements as named props (e.g. `header={<Nav />} sidebar={<Menu />}`)",
          "Create multiple children props: `children1`, `children2`",
          "It is not possible in React"
        ],
        "correctAnswer": "Pass JSX elements as named props (e.g. `header={<Nav />} sidebar={<Menu />}`)",
        "explanation": "Any prop can receive JSX elements, providing flexible multi-slot composition."
      },
      {
        "question": "Why does composition with `children` often reduce prop drilling?",
        "options": [
          "Children bypass the virtual DOM completely",
          "Children render before the parent mounts",
          "The parent can instantiate child components with their props directly, passing the assembled tree into the container",
          "Children share a global prototype"
        ],
        "correctAnswer": "The parent can instantiate child components with their props directly, passing the assembled tree into the container",
        "explanation": "Inversion of control lets parents configure child components directly without intermediate containers knowing about their props."
      },
      {
        "question": "What value does `children` have when a component has no nested content (`<Card />`)?",
        "options": [
          "`null`",
          "`[]` (empty array)",
          "`false`",
          "`undefined`"
        ],
        "correctAnswer": "`undefined`",
        "explanation": "When no children are passed, `props.children` defaults to `undefined`."
      },
      {
        "question": "Can `children` be a function in React (the render prop pattern)?",
        "codeSnippet": "<DataProvider>\n  {data => <div>{data.title}</div>}\n</DataProvider>",
        "options": [
          "Yes, components can invoke `children(data)` to pass data directly to consumers",
          "No, `children` must strictly be JSX elements",
          "Only in class components",
          "Only if wrapped in `React.memo`"
        ],
        "correctAnswer": "Yes, components can invoke `children(data)` to pass data directly to consumers",
        "explanation": "Render props pass a function as children to share stateful logic dynamically."
      }
    ]
  },
  {
    "title": "React: Functional Components vs Class Components",
    "description": "Stateless functions, hooks revolution, deprecation of lifecycle methods, and modern standards.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the modern standard way to write React components?",
        "options": [
          "ES6 classes extending `React.Component`",
          "JavaScript functions with React Hooks",
          "`React.createClass()` factories",
          "Web Components with customElements.define"
        ],
        "correctAnswer": "JavaScript functions with React Hooks",
        "explanation": "Function components paired with Hooks are the modern standard in React."
      },
      {
        "question": "Which class component lifecycle method corresponds to `useEffect(() => {}, [])`?",
        "options": [
          "`componentWillMount`",
          "`componentWillUpdate`",
          "`componentDidMount`",
          "`getDerivedStateFromProps`"
        ],
        "correctAnswer": "`componentDidMount`",
        "explanation": "An effect with an empty dependency array `[]` runs once after the component mounts, matching `componentDidMount`."
      },
      {
        "question": "Why did React transition from class components to functional components with Hooks?",
        "options": [
          "Classes were removed from JavaScript",
          "Function components execute in C++",
          "Classes cannot render HTML",
          "Classes were harder to optimize/minify, suffered from `this` binding issues, and made sharing logic difficult"
        ],
        "correctAnswer": "Classes were harder to optimize/minify, suffered from `this` binding issues, and made sharing logic difficult",
        "explanation": "Hooks allow composing stateful logic without class boilerplate and `this` confusion."
      },
      {
        "question": "Which feature still requires class components in React 18/19?",
        "options": [
          "Error Boundaries (`componentDidCatch` and `getDerivedStateFromError`)",
          "State management",
          "DOM ref attachments",
          "Context consumers"
        ],
        "correctAnswer": "Error Boundaries (`componentDidCatch` and `getDerivedStateFromError`)",
        "explanation": "Error Boundaries currently still require class components."
      },
      {
        "question": "Can you call React Hooks inside a class component?",
        "options": [
          "Yes, inside the `render()` method",
          "No, Hooks can ONLY be called inside functional components or custom hooks",
          "Yes, inside `componentDidMount`",
          "Only in constructors"
        ],
        "correctAnswer": "No, Hooks can ONLY be called inside functional components or custom hooks",
        "explanation": "The Rules of Hooks restrict hook calls to functional components and custom hooks."
      }
    ]
  },
  {
    "title": "React: Inline Styles & CSS Classes (`className`)",
    "description": "JSX style objects, camelCase CSS properties, className attribute, and conditional styling.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Why do we use `className` instead of `class` in JSX?",
        "options": [
          "`className` is faster for browser engines",
          "`class` is deprecated in HTML5",
          "`class` is a reserved keyword in JavaScript, so JSX uses `className` to mirror the DOM property",
          "Browsers reject `class` in AJAX applications"
        ],
        "correctAnswer": "`class` is a reserved keyword in JavaScript, so JSX uses `className` to mirror the DOM property",
        "explanation": "JSX maps to JavaScript DOM properties, where `className` represents the element's CSS class."
      },
      {
        "question": "How are inline styles passed in React JSX?",
        "codeSnippet": "<div style={{ backgroundColor: 'red', fontSize: 16 }}>Alert</div>",
        "options": [
          "As a CSS string: `style=\"background-color: red;\"`",
          "Using `css=\"...\"`",
          "Using `<style>` tags inside the div",
          "As an object with camelCase property names in double curly braces: `style={{ backgroundColor: 'red' }}`"
        ],
        "correctAnswer": "As an object with camelCase property names in double curly braces: `style={{ backgroundColor: 'red' }}`",
        "explanation": "React expects inline styles as an object with camelCased CSS keys."
      },
      {
        "question": "What unit does React automatically append to numeric styles like `fontSize: 16`?",
        "options": [
          "`px` (pixels)",
          "`em`",
          "`rem`",
          "`%`"
        ],
        "correctAnswer": "`px` (pixels)",
        "explanation": "React appends `px` to numbers on dimensional CSS properties."
      },
      {
        "question": "Which of the following is a unitless CSS property where React does NOT append `px`?",
        "options": [
          "`width`",
          "`opacity` (and `zIndex`, `lineHeight`, `flex`)",
          "`height`",
          "`padding`"
        ],
        "correctAnswer": "`opacity` (and `zIndex`, `lineHeight`, `flex`)",
        "explanation": "Properties like `opacity: 0.5` or `zIndex: 10` are unitless in CSS and remain numbers."
      },
      {
        "question": "How do you conditionally apply a CSS class name in JSX?",
        "codeSnippet": "<button className={`btn ${isActive ? 'btn-active' : ''}`}>Click</button>",
        "options": [
          "Using `class-if=\"active\"`",
          "Using multiple `className` attributes",
          "Using template literals or ternary operators: ``className={`btn ${isActive ? 'active' : ''}`}``",
          "Writing CSS rules inside the component body"
        ],
        "correctAnswer": "Using template literals or ternary operators: ``className={`btn ${isActive ? 'active' : ''}`}``",
        "explanation": "Template literals with ternary expressions provide dynamic class string formatting."
      }
    ]
  },
  {
    "title": "React: `useEffect` Basics (Mount & Cleanup)",
    "description": "Side effects, dependency arrays, cleanup functions, and lifecycle parallels.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "When does the callback inside `useEffect` run by default?",
        "options": [
          "Before the component renders",
          "Synchronously during virtual DOM diffing",
          "Only when the window is resized",
          "After the component renders and the DOM changes have painted to the screen"
        ],
        "correctAnswer": "After the component renders and the DOM changes have painted to the screen",
        "explanation": "`useEffect` runs asynchronously after browser paint, preventing visual render blocking."
      },
      {
        "question": "How do you make an effect run ONLY ONCE when the component mounts?",
        "codeSnippet": "useEffect(() => { fetchData(); }, []);",
        "options": [
          "Pass an empty dependency array `[]` as the second argument",
          "Omit the second argument entirely",
          "Return `false` from the effect",
          "Pass `[null]`"
        ],
        "correctAnswer": "Pass an empty dependency array `[]` as the second argument",
        "explanation": "An empty array `[]` indicates zero dependencies, so the effect runs only on mount."
      },
      {
        "question": "How do you clean up resources (intervals, listeners) in `useEffect`?",
        "codeSnippet": "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);",
        "options": [
          "Call `useEffect.cleanup()`",
          "Return a cleanup function from the effect callback",
          "Use a try/finally block around the component",
          "React clears intervals automatically"
        ],
        "correctAnswer": "Return a cleanup function from the effect callback",
        "explanation": "Returning a function registers a cleanup handler called before re-running and on unmount."
      },
      {
        "question": "What happens if you omit the dependency array in `useEffect(fn)`?",
        "options": [
          "The effect runs only once",
          "The effect never runs",
          "The effect runs after EVERY single render (mount and every update)",
          "React throws a compile error"
        ],
        "correctAnswer": "The effect runs after EVERY single render (mount and every update)",
        "explanation": "Without a dependency array, React executes the effect on every render cycle."
      },
      {
        "question": "What happens if you update state inside an effect with no dependency array?",
        "options": [
          "State increments once and stops",
          "React ignores the setState call",
          "The component unmounts",
          "An infinite re-render loop occurs that freezes or crashes the browser tab"
        ],
        "correctAnswer": "An infinite re-render loop occurs that freezes or crashes the browser tab",
        "explanation": "Updating state triggers a render, which re-runs the effect, creating an infinite loop."
      }
    ]
  },
  {
    "title": "React: React Developer Tools & Debugging",
    "description": "Component tree inspection, inspecting props & state, Profiler tab, and component names.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What browser extension allows inspecting the live React component hierarchy, props, and state?",
        "options": [
          "React Developer Tools",
          "Redux DevTools",
          "React Inspector Pro",
          "Chrome Elements Tab"
        ],
        "correctAnswer": "React Developer Tools",
        "explanation": "React Developer Tools provides 'Components' and 'Profiler' panels for debugging."
      },
      {
        "question": "What determines the display name of a component in React DevTools?",
        "options": [
          "The filename only",
          "The function's name or an explicit `Component.displayName` assignment",
          "The first JSX tag returned",
          "The CSS class name"
        ],
        "correctAnswer": "The function's name or an explicit `Component.displayName` assignment",
        "explanation": "DevTools uses function names or `displayName` properties to label components in the tree."
      },
      {
        "question": "What does the 'Highlight updates when components render' setting in React DevTools do?",
        "options": [
          "Highlights code syntax in the Sources tab",
          "Logs all state changes to console",
          "Draws colored borders around DOM elements whenever the associated component re-renders",
          "Highlights CSS errors"
        ],
        "correctAnswer": "Draws colored borders around DOM elements whenever the associated component re-renders",
        "explanation": "Visual flashes highlight which parts of the UI are rendering on user actions."
      },
      {
        "question": "Can you inspect and edit component `props` and `state` live inside React DevTools?",
        "options": [
          "No, DevTools is read-only",
          "Only props can be edited",
          "Only in Firefox development builds",
          "Yes, you can modify props and hook state directly in the panel to test UI reactions immediately"
        ],
        "correctAnswer": "Yes, you can modify props and hook state directly in the panel to test UI reactions immediately",
        "explanation": "DevTools allows live editing of props and state for fast interactive debugging."
      },
      {
        "question": "What does `$r` in the browser console represent when an element is selected in React DevTools?",
        "options": [
          "A reference to the currently selected React component instance or fiber node",
          "The root DOM element",
          "The React version",
          "The Redux store"
        ],
        "correctAnswer": "A reference to the currently selected React component instance or fiber node",
        "explanation": "`$r` exposes the selected component in the console, matching `$0` for DOM nodes."
      }
    ]
  },
  {
    "title": "React: Default Props & Destructuring",
    "description": "ES6 parameter default values, prop destructuring, and fallback values.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the modern standard way to set default prop values in functional components?",
        "codeSnippet": "function Avatar({ size = 48, shape = 'circle' }) {\n  return <img width={size} className={shape} />;\n}",
        "options": [
          "Using the legacy `Component.defaultProps` object",
          "Using ES6 default parameter values directly in the destructuring signature",
          "Using a switch statement inside the body",
          "Using CSS fallbacks"
        ],
        "correctAnswer": "Using ES6 default parameter values directly in the destructuring signature",
        "explanation": "ES6 default parameters (`{ size = 48 }`) are standard in modern React."
      },
      {
        "question": "When does an ES6 default parameter value trigger for a prop?",
        "options": [
          "Only when the prop is omitted",
          "When passed as `null`",
          "When the prop is completely omitted OR explicitly passed as `undefined`",
          "When passed as `false`"
        ],
        "correctAnswer": "When the prop is completely omitted OR explicitly passed as `undefined`",
        "explanation": "JavaScript default arguments trigger on `undefined`, but not on `null`."
      },
      {
        "question": "What happens if a caller passes `null` to `<Alert type={null} />` where `type = 'info'`?",
        "options": [
          "`type` falls back to `'info'`",
          "React throws a null pointer error",
          "The component returns empty string",
          "`type` receives `null` (the default value 'info' is NOT used because `null` is a defined value in JS)"
        ],
        "correctAnswer": "`type` receives `null` (the default value 'info' is NOT used because `null` is a defined value in JS)",
        "explanation": "`null` is a valid value in JavaScript and does not trigger default parameter substitution."
      },
      {
        "question": "How do you collect all remaining unspecified props in a component?",
        "codeSnippet": "function TextInput({ label, ...restProps }) {\n  return <label>{label}<input {...restProps} /></label>;\n}",
        "options": [
          "Using the rest operator: `...restProps`",
          "Using `arguments`",
          "Using `props.others`",
          "Using `Object.remainders(props)`"
        ],
        "correctAnswer": "Using the rest operator: `...restProps`",
        "explanation": "The `...restProps` pattern collects all other props into an object to forward onto child elements."
      },
      {
        "question": "How do you rename a prop while destructuring it in a function signature?",
        "options": [
          "`{ originalName as newName }`",
          "`{ originalName: newName }` syntax",
          "`{ originalName -> newName }`",
          "`{ originalName = newName }`"
        ],
        "correctAnswer": "`{ originalName: newName }` syntax",
        "explanation": "Destructuring aliasing uses `{ propName: localAlias }`."
      }
    ]
  },
  {
    "title": "React: Pure Functions in Component Logic",
    "description": "Idempotence, avoiding side effects during render, and deterministic UI output.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does it mean for a React component's render function to be 'pure'?",
        "options": [
          "It has no child components",
          "It is written in TypeScript without `any`",
          "Given the same props and state, it always returns the same JSX and causes zero side effects during rendering",
          "It does not use CSS"
        ],
        "correctAnswer": "Given the same props and state, it always returns the same JSX and causes zero side effects during rendering",
        "explanation": "React components must be pure functions of their inputs during render."
      },
      {
        "question": "Which of the following is an ILLEGAL side effect during component rendering?",
        "options": [
          "Performing a math calculation: `Math.max(a, b)`",
          "Concatenating strings",
          "Mapping over an array with `.map()`",
          "Mutating external DOM (`document.title`), initiating network fetches, or mutating external variables"
        ],
        "correctAnswer": "Mutating external DOM (`document.title`), initiating network fetches, or mutating external variables",
        "explanation": "Mutating global state or firing network calls during render causes unpredictable bugs and breaks concurrency."
      },
      {
        "question": "What happens if a component mutates an external variable during rendering?",
        "options": [
          "It produces unpredictable UI output because React can render components multiple times or in parallel",
          "React freezes the external variable",
          "The browser aborts execution",
          "The component is deleted from memory"
        ],
        "correctAnswer": "It produces unpredictable UI output because React can render components multiple times or in parallel",
        "explanation": "React re-renders components on state changes and in StrictMode; external mutations cause state to drift."
      },
      {
        "question": "Is calling `Math.random()` or `Date.now()` inside render pure?",
        "options": [
          "Yes, because Math is built-in",
          "No, it produces non-deterministic output on every render and causes hydration mismatches in SSR",
          "Yes, if stored in a `const`",
          "Only in production"
        ],
        "correctAnswer": "No, it produces non-deterministic output on every render and causes hydration mismatches in SSR",
        "explanation": "Calling non-deterministic functions during render produces unstable UI and SSR mismatches."
      },
      {
        "question": "Where SHOULD side effects (data fetching, timers, DOM mutations) be placed?",
        "options": [
          "Directly at the top of the component body",
          "Inside JSX curly braces",
          "Inside `useEffect` hooks or event handler callbacks (like `onClick`)",
          "Inside default parameter values"
        ],
        "correctAnswer": "Inside `useEffect` hooks or event handler callbacks (like `onClick`)",
        "explanation": "Side effects must live in event handlers or lifecycle effects, keeping render functions pure."
      }
    ]
  },
  {
    "title": "React: Handling Click & Form Submit Events",
    "description": "Button interactions, form submission workflows, preventing page reloads, and keyboard triggers.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Why does clicking a `<button>` inside a `<form>` trigger a page refresh if unhandled?",
        "options": [
          "React resets the page on button click",
          "Vite reloads the dev server on form events",
          "Forms require an action attribute to prevent reload",
          "HTML buttons inside forms default to `type=\"submit\"`, triggering standard browser HTTP form submission"
        ],
        "correctAnswer": "HTML buttons inside forms default to `type=\"submit\"`, triggering standard browser HTTP form submission",
        "explanation": "Buttons in forms default to `type=\"submit\"`. Single-page apps use `e.preventDefault()` to handle submission in JS."
      },
      {
        "question": "How do you make a button inside a form NOT submit the form when clicked?",
        "codeSnippet": "<button type=\"button\" onClick={handleCancel}>Cancel</button>",
        "options": [
          "Explicitly set `type=\"button\"` on the button tag",
          "Set `submit=\"false\"`",
          "Remove the button text",
          "Add `disabled`"
        ],
        "correctAnswer": "Explicitly set `type=\"button\"` on the button tag",
        "explanation": "`type=\"button\"` removes default form submit behavior."
      },
      {
        "question": "Where should the submit handler be attached for accessible forms?",
        "options": [
          "Only on the submit `<button onClick={...}>`",
          "On the `<form onSubmit={...}>` element so both button clicks and pressing Enter in inputs submit the form",
          "On every single input element",
          "On the window object"
        ],
        "correctAnswer": "On the `<form onSubmit={...}>` element so both button clicks and pressing Enter in inputs submit the form",
        "explanation": "Attaching `onSubmit` to the `<form>` ensures natural keyboard submissions (pressing Enter) work."
      },
      {
        "question": "How do you stop a click event from bubbling up to parent elements in React?",
        "options": [
          "Calling `e.preventDefault()`",
          "Returning `false`",
          "Calling `e.stopPropagation()` on the React synthetic event",
          "Setting `bubbles={false}` in JSX"
        ],
        "correctAnswer": "Calling `e.stopPropagation()` on the React synthetic event",
        "explanation": "`e.stopPropagation()` stops event propagation up the DOM tree."
      },
      {
        "question": "How do you detect when a user presses the 'Enter' key inside an input in React?",
        "options": [
          "Using `e.keyCode === 'enter'`",
          "Using `onEnter={handleSearch}`",
          "Checking `e.target.value === 'Enter'`",
          "Checking `e.key === 'Enter'` inside an `onKeyDown` or `onKeyUp` handler"
        ],
        "correctAnswer": "Checking `e.key === 'Enter'` inside an `onKeyDown` or `onKeyUp` handler",
        "explanation": "`e.key === 'Enter'` is the standard modern way to inspect keyboard events."
      }
    ]
  },
  {
    "title": "React: Boolean Props & Shorthand Syntax",
    "description": "Implicit true values, passing booleans in JSX, and truthy attribute shorthand.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does the JSX shorthand `<Modal isOpen />` evaluate to for `isOpen`?",
        "options": [
          "`isOpen={true}`",
          "`isOpen={false}`",
          "`isOpen=\"\"`",
          "`isOpen={undefined}`"
        ],
        "correctAnswer": "`isOpen={true}`",
        "explanation": "In JSX, writing a prop without a value is shorthand for `true`, mirroring HTML boolean attributes."
      },
      {
        "question": "How do you explicitly pass boolean `false` as a prop in JSX?",
        "options": [
          "`isOpen=\"false\"` (which passes a truthy string!)",
          "`isOpen={false}`",
          "`!isOpen`",
          "`isOpen=false`"
        ],
        "correctAnswer": "`isOpen={false}`",
        "explanation": "Passing literal boolean `false` requires curly braces `{false}`."
      },
      {
        "question": "What is the issue with passing `visible=\"false\"` to a child component?",
        "options": [
          "React throws a SyntaxError",
          "The prop is converted to number 0",
          "In JavaScript, non-empty strings are truthy, so `if (visible)` evaluates to `true`",
          "It works as expected without issue"
        ],
        "correctAnswer": "In JavaScript, non-empty strings are truthy, so `if (visible)` evaluates to `true`",
        "explanation": "`Boolean(\"false\") === true`. Booleans should always be passed with curly braces `{false}`."
      },
      {
        "question": "What does the HTML `disabled` attribute on `<button disabled={false}>` render in the DOM?",
        "options": [
          "`<button disabled=\"false\">`",
          "`<button disabled=\"\">`",
          "A disabled button",
          "React omits the `disabled` attribute from the rendered HTML button entirely"
        ],
        "correctAnswer": "React omits the `disabled` attribute from the rendered HTML button entirely",
        "explanation": "Passing `false` to HTML boolean attributes causes React to omit the attribute."
      },
      {
        "question": "How do you convert a number or object to a strict boolean in JSX?",
        "options": [
          "Using `Boolean(val)` or double negation `!!val`",
          "Using `val as boolean`",
          "Using `val.toBoolean()`",
          "Using `+val`"
        ],
        "correctAnswer": "Using `Boolean(val)` or double negation `!!val`",
        "explanation": "`Boolean(val)` or `!!val` ensures clean boolean evaluation in JSX expressions."
      }
    ]
  },
  {
    "title": "React: Rendering Arrays of Elements",
    "description": "Array unwrapping in JSX, fragments vs arrays, and direct element collections.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does React do when an array of JSX elements is passed in curly braces `{list}`?",
        "options": [
          "React joins them with commas",
          "React automatically iterates through the array and renders each element in order",
          "React renders only the first element",
          "React throws a TypeMismatch error"
        ],
        "correctAnswer": "React automatically iterates through the array and renders each element in order",
        "explanation": "React flattens arrays of JSX nodes and renders each child in index order."
      },
      {
        "question": "Can a React component return an array of elements directly from render?",
        "codeSnippet": "function Nav() { return [<a key=\"1\">1</a>, <a key=\"2\">2</a>]; }",
        "options": [
          "No, components must strictly return a single element",
          "Only in class components",
          "Yes, components can return an array of elements, provided each element has a `key` prop",
          "Only if the array contains fewer than 3 elements"
        ],
        "correctAnswer": "Yes, components can return an array of elements, provided each element has a `key` prop",
        "explanation": "React supports returning arrays of elements directly, though `<>...</>` fragments are generally preferred."
      },
      {
        "question": "What happens if an array element inside `{elements}` is `false` or `null`?",
        "options": [
          "React throws a null exception",
          "React renders an empty `<div></div>`",
          "The whole array is omitted",
          "React skips the null item and renders the remaining elements cleanly"
        ],
        "correctAnswer": "React skips the null item and renders the remaining elements cleanly",
        "explanation": "React filters out nullish and boolean values in arrays, rendering sibling nodes."
      },
      {
        "question": "How can you render a separator (e.g. `•`) between array items without trailing separators?",
        "codeSnippet": "items.map((item, i) => (\n  <React.Fragment key={item}>\n    <span>{item}</span>\n    {i < items.length - 1 && ' • '}\n  </React.Fragment>\n))",
        "options": [
          "Check `i < items.length - 1 && ' • '` inside the map iteration",
          "Use CSS `::after` only",
          "Use a regex",
          "Arrays cannot have separators"
        ],
        "correctAnswer": "Check `i < items.length - 1 && ' • '` inside the map iteration",
        "explanation": "Checking index against `length - 1` inserts separators strictly between items."
      },
      {
        "question": "Why is `<>{items}</>` generally preferred over returning `[items]` directly?",
        "options": [
          "Fragments render 5x faster",
          "Fragments avoid needing explicit keys on top-level array returns and look like natural HTML structure",
          "Fragments bypass V8 memory management",
          "Array returns are deprecated in React 18"
        ],
        "correctAnswer": "Fragments avoid needing explicit keys on top-level array returns and look like natural HTML structure",
        "explanation": "Fragments wrap children in standard JSX markup without demanding keys on the outer return."
      }
    ]
  },
  {
    "title": "React: Dynamic Attributes in JSX",
    "description": "Dynamic href, src, alt text, data-* attributes, and boolean attribute binding.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How do you set a dynamic image `src` and `alt` text in JSX?",
        "codeSnippet": "<img src={user.avatarUrl} alt={`${user.name}'s avatar`} />",
        "options": [
          "`<img src=\"user.avatarUrl\" alt=\"user.name\" />`",
          "`<img :src=\"user.avatarUrl\" />`",
          "`<img src={user.avatarUrl} alt={`${user.name}'s avatar`} />`",
          "`<img src=(user.avatarUrl) />`"
        ],
        "correctAnswer": "`<img src={user.avatarUrl} alt={`${user.name}'s avatar`} />`",
        "explanation": "Attributes accept expressions inside curly braces `{}` and template strings."
      },
      {
        "question": "How are custom `data-*` attributes formatted in React JSX?",
        "options": [
          "camelCase: `dataUserId={...}`",
          "Uppercase: `DATA-USER-ID={...}`",
          "Underscores: `data_user_id={...}`",
          "Standard lowercase hyphenated names: `data-user-id={...}`"
        ],
        "correctAnswer": "Standard lowercase hyphenated names: `data-user-id={...}`",
        "explanation": "`data-*` and `aria-*` attributes preserve standard hyphenated HTML casing in JSX."
      },
      {
        "question": "How are `aria-*` accessibility attributes formatted in JSX?",
        "options": [
          "Hyphenated lowercase: `aria-expanded={isOpen}` and `aria-label=\"...\"`",
          "camelCase: `ariaExpanded={isOpen}`",
          "`aria:expanded={isOpen}`",
          "`accessibility-label=\"...\"`"
        ],
        "correctAnswer": "Hyphenated lowercase: `aria-expanded={isOpen}` and `aria-label=\"...\"`",
        "explanation": "`aria-*` attributes in JSX strictly follow standard W3C hyphenated format."
      },
      {
        "question": "What happens if an attribute is set to `null` or `undefined` in JSX?",
        "options": [
          "The attribute is rendered as `placeholder=\"undefined\"`",
          "React omits the attribute completely from the rendered DOM node",
          "React throws a null attribute warning",
          "The input is disabled"
        ],
        "correctAnswer": "React omits the attribute completely from the rendered DOM node",
        "explanation": "Passing `null` or `undefined` instructs React to remove the attribute from the DOM element."
      },
      {
        "question": "How do you conditionally apply an attribute only when a condition is met?",
        "codeSnippet": "<a href={url} target={isExternal ? '_blank' : undefined}>Link</a>",
        "options": [
          "Set the attribute to `false`",
          "Use `target=\"none\"`",
          "Use a ternary returning the string or `undefined` (which removes the attribute when false)",
          "Wrap the tag in two separate if-statements"
        ],
        "correctAnswer": "Use a ternary returning the string or `undefined` (which removes the attribute when false)",
        "explanation": "Returning `undefined` for an attribute causes React to omit it cleanly."
      }
    ]
  },
  {
    "title": "React: Basic Folder Structure & Component Splitting",
    "description": "Organizing components, single responsibility principle, index exports, and file modularity.",
    "difficulty": "easy",
    "tags": [
      "React",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is a recommended practice when a component file grows beyond 200–300 lines with multiple sub-elements?",
        "options": [
          "Put all code in a single file to reduce import statements",
          "Convert functional components to class components",
          "Move the code into comments",
          "Split smaller, focused UI sections into separate child components in their own files following the Single Responsibility Principle"
        ],
        "correctAnswer": "Split smaller, focused UI sections into separate child components in their own files following the Single Responsibility Principle",
        "explanation": "Modular components are easier to test, maintain, refactor, and reason about."
      },
      {
        "question": "What is the conventional folder naming convention for reusable UI components in React projects?",
        "options": [
          "`src/components/` containing individual component folders or files (PascalCase or camelCase)",
          "`src/all_files/`",
          "`src/templates/`",
          "`src/classes/`"
        ],
        "correctAnswer": "`src/components/` containing individual component folders or files (PascalCase or camelCase)",
        "explanation": "The `src/components/` directory is standard across Vite, Next.js, and Create React App."
      },
      {
        "question": "What is the benefit of using an `index.js` (barrel file) inside a component folder?",
        "options": [
          "Speeds up browser rendering",
          "Allows other files to import cleanly from `components/Button` without specifying `components/Button/Button.jsx`",
          "Makes the component globally available without import",
          "Encrypts the component"
        ],
        "correctAnswer": "Allows other files to import cleanly from `components/Button` without specifying `components/Button/Button.jsx`",
        "explanation": "An index file provides a clean public API entry point for directory-based modules."
      },
      {
        "question": "What is a 'presentational' component compared to a 'container' component?",
        "options": [
          "A presentational component is written in CSS only",
          "A container component cannot have state",
          "A presentational component focuses exclusively on visual rendering based on props, with no complex business logic or network calls",
          "Presentational components are deprecated in React"
        ],
        "correctAnswer": "A presentational component focuses exclusively on visual rendering based on props, with no complex business logic or network calls",
        "explanation": "Separating UI rendering from business/data-fetching logic keeps visual components reusable and testable."
      },
      {
        "question": "Why should you avoid declaring one React component INSIDE the function body of another component?",
        "options": [
          "JavaScript syntax forbids nested functions",
          "It causes a fatal memory overflow in V8 immediately",
          "The child component cannot receive props",
          "`Child` is re-created as a brand new component type on every single render of `Parent`, destroying its state and forcing full DOM remounting"
        ],
        "correctAnswer": "`Child` is re-created as a brand new component type on every single render of `Parent`, destroying its state and forcing full DOM remounting",
        "explanation": "Nested component definitions create a new function reference every render, causing React to treat it as a brand new component type and resetting state/DOM."
      }
    ]
  }
];
