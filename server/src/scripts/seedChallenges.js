import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

const CHALLENGES = [
  {
    title: "JavaScript Core & Web Essentials",
    description: "Foundational JavaScript trivia: array methods, closures, coercion, variable scoping, and DOM basics.",
    difficulty: "easy",
    tags: ["JavaScript", "Frontend"],
    timeLimitMinutes: 10,
    questions: [
      {
        question: "What is the return value of `typeof []` (an empty array) in JavaScript?",
        options: ['"object"', '"array"', '"list"', '"undefined"'],
        correctAnswer: '"object"',
        explanation: 'In JavaScript, arrays are objects. To check if a variable is an array, use `Array.isArray([])`.',
      },
      {
        question: "What will the following code output to the console?",
        codeSnippet: 'const nums = [1, 2, 3];\nnums.push(4);\nconsole.log(nums.length);',
        language: "javascript",
        options: ["4", "3", "TypeError: Assignment to constant variable", "undefined"],
        correctAnswer: "4",
        explanation: '`const` prevents reassigning the variable identifier (`nums = [...]`), but it does not make the underlying array immutable.',
      },
      {
        question: "Which array method returns a brand new array containing only elements that pass a given condition?",
        options: ["Array.prototype.filter()", "Array.prototype.map()", "Array.prototype.forEach()", "Array.prototype.some()"],
        correctAnswer: "Array.prototype.filter()",
        explanation: '`.filter()` creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.',
      },
      {
        question: "What is the value of `result` after executing the snippet below?",
        codeSnippet: 'const a = "5";\nconst b = 2;\nconst result = a + b;\nconsole.log(typeof result, result);',
        language: "javascript",
        options: ['string "52"', 'number 7', 'number 52', 'NaN'],
        correctAnswer: 'string "52"',
        explanation: 'When one operand of the `+` operator is a string, JavaScript coerces the other operand to a string and concatenates them.',
      },
      {
        question: "What is the output of `console.log(Boolean(0))` vs `console.log(Boolean('0'))`?",
        options: ["false, true", "false, false", "true, true", "true, false"],
        correctAnswer: "false, true",
        explanation: 'The number `0` is falsy in JavaScript, but any non-empty string like `"0"` is truthy.',
      },
    ],
  },
  {
    title: "HTML5, CSS & Frontend Layouts",
    description: "Modern CSS Flexbox, Grid, semantic HTML5 hierarchy, and client-side storage mechanisms.",
    difficulty: "easy",
    tags: ["Frontend"],
    timeLimitMinutes: 10,
    questions: [
      {
        question: "Which CSS property defines how extra space is distributed along the primary axis in a Flex container?",
        codeSnippet: '.navbar {\n  display: flex;\n  /* Space evenly between brand and links */\n  justify-content: space-between;\n}',
        language: "css",
        options: ["justify-content", "align-items", "flex-direction", "align-self"],
        correctAnswer: "justify-content",
        explanation: '`justify-content` aligns flex items along the main axis. `align-items` aligns along the cross axis.',
      },
      {
        question: "What is the key difference between `localStorage` and `sessionStorage` in the browser?",
        options: [
          "`localStorage` persists data across browser tabs and sessions; `sessionStorage` clears when the tab is closed",
          "`sessionStorage` can store up to 50MB, whereas `localStorage` is capped at 5KB",
          "`localStorage` data is automatically transmitted to the server with every HTTP request",
          "There is no difference; they are aliases for the same Web Storage API",
        ],
        correctAnswer: "`localStorage` persists data across browser tabs and sessions; `sessionStorage` clears when the tab is closed",
        explanation: '`localStorage` has no expiration time, whereas `sessionStorage` is scoped to the browser tab lifecycle.',
      },
      {
        question: "Which HTML5 semantic element should wrap the primary navigation links of a webpage?",
        options: ["<nav>", "<header>", "<section>", "<menu>"],
        correctAnswer: "<nav>",
        explanation: 'The `<nav>` HTML element represents a section of a page whose purpose is to provide navigation links.',
      },
      {
        question: "In standard CSS box model calculations with `box-sizing: border-box`, what does `width: 200px` include?",
        options: [
          "Content width + Padding + Border",
          "Content width only",
          "Content width + Margin + Padding",
          "Content width + Outline",
        ],
        correctAnswer: "Content width + Padding + Border",
        explanation: 'With `box-sizing: border-box`, padding and border are included inside the specified width and height.',
      },
    ],
  },
  {
    title: "React 19 & Component Architecture",
    description: "Hooks lifecycle, closure traps, component memoization, and modern state patterns.",
    difficulty: "mid",
    tags: ["React", "JavaScript", "Frontend"],
    timeLimitMinutes: 12,
    questions: [
      {
        question: "What is the logged output when the button is clicked once in the following component?",
        codeSnippet: 'function Counter() {\n  const [count, setCount] = useState(0);\n\n  const handleClick = () => {\n    setCount(count + 1);\n    setCount(count + 1);\n    console.log(count);\n  };\n\n  return <button onClick={handleClick}>{count}</button>;\n}',
        language: "javascript",
        options: ["0", "1", "2", "undefined"],
        correctAnswer: "0",
        explanation: 'State setters do not mutate state immediately within the current render execution frame. The `count` variable in scope is still `0`.',
      },
      {
        question: "Which React hook is designed to cache the reference of a callback function across re-renders?",
        options: ["useCallback", "useMemo", "useRef", "useTransition"],
        correctAnswer: "useCallback",
        explanation: '`useCallback(fn, deps)` returns a memoized version of the callback function that only changes if one of the dependencies has changed.',
      },
      {
        question: "What is the primary role of the `key` prop when rendering dynamic lists in React JSX?",
        options: [
          "Helps React Fiber identify which items have changed, been added, or removed during reconciliation",
          "Applies a unique CSS styling class to each list element",
          "Exposes the element index directly to the DOM window",
          "Automatically prevents SQL injections in React components",
        ],
        correctAnswer: "Helps React Fiber identify which items have changed, been added, or removed during reconciliation",
        explanation: 'Keys give elements a stable identity across renders, allowing React to minimize DOM mutations during the reconciliation algorithm.',
      },
      {
        question: "When does the cleanup function in `useEffect` execute?",
        codeSnippet: 'useEffect(() => {\n  const sub = api.subscribe();\n  return () => sub.unsubscribe(); // When does this run?\n}, [id]);',
        language: "javascript",
        options: [
          "Before the component unmounts and before re-running the effect on subsequent renders",
          "Only when the browser window is closed",
          "Synchronously during initial DOM paint",
          "After every state change anywhere in the entire application",
        ],
        correctAnswer: "Before the component unmounts and before re-running the effect on subsequent renders",
        explanation: 'React runs the effect cleanup before the component is removed from the UI and before running the effect on subsequent re-renders.',
      },
    ],
  },
  {
    title: "Node.js & Backend Architecture",
    description: "Event loop phases, Express middleware chaining, asynchronous error handling, and REST conventions.",
    difficulty: "hard",
    tags: ["Node.js", "JavaScript"],
    timeLimitMinutes: 15,
    questions: [
      {
        question: "In an Express.js application, what must you do in custom middleware to pass control to the next handler?",
        codeSnippet: 'app.use((req, res, next) => {\n  console.log("Request arrived:", req.path);\n  // How to continue to the route handler?\n  next();\n});',
        language: "javascript",
        options: ["Call next()", "Return res.continue()", "Call next(req, res)", "Return true"],
        correctAnswer: "Call next()",
        explanation: 'In Express, invoking `next()` passes control to the next middleware function in the stack.',
      },
      {
        question: "Which HTTP status code should a REST API return when creating a resource successfully?",
        options: ["201 Created", "200 OK", "204 No Content", "202 Accepted"],
        correctAnswer: "201 Created",
        explanation: '`201 Created` is the standard HTTP status code indicating that the request has succeeded and led to the creation of a new resource.',
      },
      {
        question: "In Node.js asynchronous architecture, what executes in the Microtask Queue before the next Event Loop tick?",
        codeSnippet: 'process.nextTick(() => console.log("1"));\nPromise.resolve().then(() => console.log("2"));\nsetTimeout(() => console.log("3"), 0);',
        language: "javascript",
        options: [
          "`process.nextTick` callbacks and resolved `Promise` `.then` handlers",
          "`setTimeout` callbacks only",
          "File system I/O callbacks",
          "Database connection pools",
        ],
        correctAnswer: "`process.nextTick` callbacks and resolved `Promise` `.then` handlers",
        explanation: 'Microtasks (nextTick queue and Promise job queue) are drained immediately after the currently running operation and before the event loop advances to the next phase.',
      },
      {
        question: "What is the purpose of signing a JWT (JSON Web Token) with a secret key?",
        options: [
          "To allow the server to verify that the payload has not been tampered with by the client",
          "To encrypt the payload so client-side browsers cannot read the JSON fields",
          "To compress the token string to fewer bytes",
          "To automatically refresh user passwords in the database",
        ],
        correctAnswer: "To allow the server to verify that the payload has not been tampered with by the client",
        explanation: 'JWT signatures guarantee authenticity and integrity. The payload is Base64Url-encoded (readable by anyone), but cannot be forged without the server secret.',
      },
    ],
  },
  {
    title: "TypeScript Generics & Systems Mastery",
    description: "Advanced type gymnastics: utility types, infer, conditional mapping, and Docker containerization.",
    difficulty: "very hard",
    tags: ["TypeScript", "Algorithms"],
    timeLimitMinutes: 15,
    questions: [
      {
        question: "What is the resulting type of `UserPreview` in the following TypeScript declaration?",
        codeSnippet: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  token: string;\n}\n\ntype UserPreview = Pick<User, "id" | "name">;',
        language: "typescript",
        options: [
          '{ id: string; name: string; }',
          '{ email: string; token: string; }',
          'string[]',
          'any',
        ],
        correctAnswer: '{ id: string; name: string; }',
        explanation: '`Pick<Type, Keys>` constructs a type by picking the set of properties `Keys` from `Type`.',
      },
      {
        question: "What does the `Partial<T>` utility type do to interface properties in TypeScript?",
        codeSnippet: 'interface Config {\n  host: string;\n  port: number;\n}\n\ntype OptionalConfig = Partial<Config>;',
        language: "typescript",
        options: [
          "Makes all properties in T optional (`host?: string; port?: number;`)",
          "Removes all null and undefined values from T",
          "Converts all properties to readonly constants",
          "Creates a union of all key names",
        ],
        correctAnswer: "Makes all properties in T optional (`host?: string; port?: number;`)",
        explanation: '`Partial<T>` maps over all keys in `T` and appends the `?` modifier, making every field optional.',
      },
      {
        question: "In Docker, what is the key benefit of multi-stage builds in a `Dockerfile`?",
        codeSnippet: '# Stage 1: Build\nFROM node:20-alpine AS builder\nWORKDIR /app\nRUN npm run build\n\n# Stage 2: Production Runtime\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html',
        language: "dockerfile",
        options: [
          "Dramatically reduces the final image size by discarding build tools and intermediate artifacts",
          "Allows running multiple containers on the same physical port",
          "Automatically provisions a Kubernetes cluster",
          "Eliminates the need for SSL certificates",
        ],
        correctAnswer: "Dramatically reduces the final image size by discarding build tools and intermediate artifacts",
        explanation: 'Multi-stage builds allow you to use heavy SDK images for compilation and copy only the compiled artifacts into a lightweight runtime image.',
      },
    ],
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB for arena challenge seeding...");
    await mongoose.connect(process.env.MONGO_URI);
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
