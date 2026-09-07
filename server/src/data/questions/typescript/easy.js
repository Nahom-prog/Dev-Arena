/**
 * TypeScript Easy Challenge Pack
 * 20 Distinct Topic Quizzes x 5 Focused Practical Questions = 100 Questions Total
 * Answer distribution strictly balanced: 25 A, 25 B, 25 C, 25 D
 */

export const typescriptEasyQuizzes = [
  {
    "title": "TypeScript: Primitive Types & Annotations",
    "description": "Type annotations for string, number, boolean, symbol, bigint, and basic type inference.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How do you explicitly annotate a variable as a string in TypeScript?",
        "codeSnippet": "let username: string = 'alex';",
        "options": [
          "By writing `let username: string = 'alex';`",
          "By writing `let username as string = 'alex';`",
          "By writing `string let username = 'alex';`",
          "By writing `let username<string> = 'alex';`"
        ],
        "correctAnswer": "By writing `let username: string = 'alex';`",
        "explanation": "TypeScript uses colon syntax (`variableName: Type`) to declare explicit static types."
      },
      {
        "question": "What type does TypeScript infer for `const maxScore = 100;`?",
        "codeSnippet": "const maxScore = 100;",
        "options": [
          "General type `number`",
          "Literal type `100`",
          "`any`",
          "`unknown`"
        ],
        "correctAnswer": "Literal type `100`",
        "explanation": "Because `maxScore` is declared with `const` and cannot be reassigned, TypeScript narrows its inferred type to the literal number `100`."
      },
      {
        "question": "Which primitive represents arbitrary large integers in TypeScript?",
        "codeSnippet": "const largeNumber: bigint = 9007199254740991n;",
        "options": [
          "`Long`",
          "`Int64`",
          "`bigint`",
          "`LargeNumber`"
        ],
        "correctAnswer": "`bigint`",
        "explanation": "TypeScript models JavaScript ES2020 `bigint` primitives with the `bigint` type keyword."
      },
      {
        "question": "What will happen if you attempt to assign `null` to a variable typed `boolean` when `strictNullChecks` is enabled?",
        "codeSnippet": "let isActive: boolean = false;\nisActive = null;",
        "options": [
          "It compiles silently and converts `null` to `false`",
          "It crashes the node server at startup",
          "`isActive` becomes `undefined`",
          "Type 'null' is not assignable to type 'boolean'"
        ],
        "correctAnswer": "Type 'null' is not assignable to type 'boolean'",
        "explanation": "With `strictNullChecks: true`, `null` and `undefined` have their own distinct types and cannot be assigned to other primitive types."
      },
      {
        "question": "What is the type of `sym` below?",
        "codeSnippet": "const sym = Symbol('unique_key');",
        "options": [
          "`typeof sym` (a unique symbol)",
          "`string`",
          "`symbol`",
          "`object`"
        ],
        "correctAnswer": "`typeof sym` (a unique symbol)",
        "explanation": "When declared with `const`, TypeScript infers `typeof sym` as a `unique symbol`, which cannot be assigned to another symbol variable."
      }
    ]
  },
  {
    "title": "TypeScript: Interface Declaration & Shape Matching",
    "description": "Defining contracts, object shape validation, and structural subtyping.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Which keyword is used to declare an object shape contract in TypeScript?",
        "codeSnippet": "interface UserProfile {\n  id: string;\n  email: string;\n}",
        "options": [
          "`contract`",
          "`interface`",
          "`schema`",
          "`struct`"
        ],
        "correctAnswer": "`interface`",
        "explanation": "`interface` is the canonical TypeScript keyword for describing object structures."
      },
      {
        "question": "What is 'structural typing' (duck typing) in TypeScript?",
        "codeSnippet": "interface Point { x: number; y: number; }\nconst p = { x: 10, y: 20, z: 30 };\nconst pt: Point = p; // Why does this work?",
        "options": [
          "Types must explicitly implement the interface with the `implements` keyword",
          "Types are only checked by their runtime class constructor names",
          "Types are compatible if their members are compatible, regardless of explicit nominal declarations",
          "Types must share the same prototype memory address"
        ],
        "correctAnswer": "Types are compatible if their members are compatible, regardless of explicit nominal declarations",
        "explanation": "TypeScript uses a structural type system: if an object has all required properties of an interface with compatible types, it satisfies that interface."
      },
      {
        "question": "How can one interface inherit properties from another interface?",
        "codeSnippet": "interface Animal {\n  name: string;\n}\ninterface Dog extends Animal {\n  breed: string;\n}",
        "options": [
          "Using the `inherits` keyword",
          "Using the `implements` keyword",
          "Using the `super` keyword",
          "Using the `extends` keyword"
        ],
        "correctAnswer": "Using the `extends` keyword",
        "explanation": "Interfaces inherit properties from other interfaces using `extends`."
      },
      {
        "question": "What happens when two interfaces with the same name are declared in the same scope?",
        "codeSnippet": "interface Settings { theme: string; }\ninterface Settings { sound: boolean; }",
        "options": [
          "Declaration merging: they combine into a single interface with both properties",
          "A compilation error: Duplicate identifier 'Settings'",
          "The second interface overwrites the first one completely",
          "Settings becomes an array of interfaces"
        ],
        "correctAnswer": "Declaration merging: they combine into a single interface with both properties",
        "explanation": "TypeScript automatically merges interface declarations with the same name into a single unified interface definition."
      },
      {
        "question": "How do you define a method signature inside an interface?",
        "codeSnippet": "interface Logger {\n  log(message: string): void;\n}",
        "options": [
          "`function log(message: string): void;`",
          "`log(message: string): void;`",
          "`def log(message: string): void;`",
          "`method log(message: string): void;`"
        ],
        "correctAnswer": "`log(message: string): void;`",
        "explanation": "Method signatures inside interfaces are written without the `function` keyword: `methodName(param: Type): ReturnType;`."
      }
    ]
  },
  {
    "title": "TypeScript: Type Aliases vs Interfaces",
    "description": "Key differences, union support, declaration merging, and when to choose each.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How do you declare a type alias in TypeScript?",
        "codeSnippet": "type Coordinate = [number, number];",
        "options": [
          "Using `alias Coordinate = [number, number];`",
          "Using `typedef Coordinate = [number, number];`",
          "Using the `type` keyword followed by the name and `=`",
          "Using `interface Coordinate = [number, number];`"
        ],
        "correctAnswer": "Using the `type` keyword followed by the name and `=`",
        "explanation": "Type aliases are defined with the syntax `type AliasName = TypeDefinition;`."
      },
      {
        "question": "Which feature can `type` aliases represent that `interface` cannot directly represent?",
        "codeSnippet": "type Status = 'pending' | 'active' | 'archived';",
        "options": [
          "Object shapes with method signatures",
          "Generic arguments",
          "Optional properties",
          "Union of primitive literal types"
        ],
        "correctAnswer": "Union of primitive literal types",
        "explanation": "An interface can only define an object shape, whereas a type alias can define unions, primitives, tuples, and intersections."
      },
      {
        "question": "Can two `type` aliases with the same name in the same scope merge like interfaces?",
        "codeSnippet": "type User = { id: string };\ntype User = { name: string };",
        "options": [
          "No, TypeScript throws 'Duplicate identifier 'User'' error",
          "Yes, they merge just like interfaces",
          "Yes, but only in strict mode",
          "No, it creates a union of both types"
        ],
        "correctAnswer": "No, TypeScript throws 'Duplicate identifier 'User'' error",
        "explanation": "Unlike interfaces, type aliases cannot be reopened or merged; duplicate type declarations trigger compile-time errors."
      },
      {
        "question": "How do you combine multiple types using a type alias?",
        "codeSnippet": "type AdminUser = User & { permissions: string[] };",
        "options": [
          "Using the `extends` keyword",
          "Using the intersection operator `&`",
          "Using the `+` operator",
          "Using the `join` keyword"
        ],
        "correctAnswer": "Using the intersection operator `&`",
        "explanation": "Type aliases use intersection types (`&`) to combine multiple object types."
      },
      {
        "question": "Which of the following statements about `interface` vs `type` is TRUE?",
        "options": [
          "Type aliases can never have generic parameters",
          "Interfaces cannot be used as function parameter types",
          "Interfaces generally provide slightly faster compilation performance for complex object hierarchies due to internal type caching",
          "Type aliases can be extended with the `extends` keyword directly in classes"
        ],
        "correctAnswer": "Interfaces generally provide slightly faster compilation performance for complex object hierarchies due to internal type caching",
        "explanation": "TypeScript's compiler optimizes interface relationships with flat type trees and cache lookups, making interfaces slightly faster for large object trees."
      }
    ]
  },
  {
    "title": "TypeScript: Optional & Readonly Properties",
    "description": "Immutable properties, optional modifier syntax, and compile-time assignment guards.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Which operator marks a property as optional in an interface or type?",
        "codeSnippet": "interface Product {\n  id: string;\n  description?: string;\n}",
        "options": [
          "The exclamation mark `!` after property name",
          "The tilde `~` before property name",
          "The pipe `|` before property name",
          "The question mark `?` after property name"
        ],
        "correctAnswer": "The question mark `?` after property name",
        "explanation": "Adding `?` makes a property optional, allowing it to be undefined or omitted."
      },
      {
        "question": "What is the effect of the `readonly` modifier on an object property?",
        "codeSnippet": "interface Account {\n  readonly accountNumber: string;\n}\nconst acc: Account = { accountNumber: '1234' };\n// acc.accountNumber = '5678';",
        "options": [
          "Prevents reassignment to the property after initialization at compile time",
          "Freezes the property at runtime using Object.freeze",
          "Deletes the property if modified",
          "Encrypts the property in local storage"
        ],
        "correctAnswer": "Prevents reassignment to the property after initialization at compile time",
        "explanation": "`readonly` is a compile-time check that disallows mutation or reassignment to the property."
      },
      {
        "question": "Does `readonly` prevent mutation of nested properties in an object?",
        "codeSnippet": "interface User {\n  readonly profile: { name: string };\n}\nconst u: User = { profile: { name: 'Dan' } };\nu.profile.name = 'Sarah';",
        "options": [
          "Yes, `readonly` deep freezes all child properties recursively",
          "No, `readonly` is shallow; nested properties can still be modified unless also marked `readonly`",
          "Yes, TypeScript errors with 'Cannot assign to name'",
          "No, but it throws a runtime TypeError in production"
        ],
        "correctAnswer": "No, `readonly` is shallow; nested properties can still be modified unless also marked `readonly`",
        "explanation": "`readonly` is shallow by default. Modifying `u.profile.name` is allowed unless `name` itself is also typed as `readonly`."
      },
      {
        "question": "How do you declare a read-only array in TypeScript?",
        "codeSnippet": "const items: readonly number[] = [1, 2, 3];\n// items.push(4);",
        "options": [
          "Using `const items = Object.seal([1, 2, 3]);`",
          "Using `immutable number[]`",
          "Prefixing the type with `readonly` (e.g. `readonly number[]` or `ReadonlyArray<number>`)",
          "Using `fixed Array<number>`"
        ],
        "correctAnswer": "Prefixing the type with `readonly` (e.g. `readonly number[]` or `ReadonlyArray<number>`)",
        "explanation": "`readonly number[]` removes mutating methods like `.push()`, `.pop()`, and `.splice()`."
      },
      {
        "question": "What type is `product.description` when `description?: string` is accessed?",
        "codeSnippet": "interface Product { id: string; description?: string; }\nfunction test(p: Product) {\n  const desc = p.description;\n}",
        "options": [
          "`string | null`",
          "`string`",
          "`any`",
          "`string | undefined`"
        ],
        "correctAnswer": "`string | undefined`",
        "explanation": "Optional properties have the implicit type `T | undefined` when retrieved."
      }
    ]
  },
  {
    "title": "TypeScript: Arrays & Basic Tuples",
    "description": "Typed arrays, fixed-length tuples, element constraints, and array destructuring.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the difference between `string[]` and `[string, number]` in TypeScript?",
        "codeSnippet": "let list: string[] = ['a', 'b'];\nlet pair: [string, number] = ['status', 200];",
        "options": [
          "`string[]` is a variable-length array of strings; `[string, number]` is a fixed tuple of 2 elements with specific types at each index",
          "`[string, number]` is converted to an object at runtime",
          "`string[]` cannot use `.map()`",
          "There is no difference; they are both dynamic lists"
        ],
        "correctAnswer": "`string[]` is a variable-length array of strings; `[string, number]` is a fixed tuple of 2 elements with specific types at each index",
        "explanation": "A tuple defines an array with fixed cardinality and known types at each specific positional index."
      },
      {
        "question": "What will TypeScript report if you do `pair[2]` on `let pair: [string, number] = ['a', 1];`?",
        "codeSnippet": "let pair: [string, number] = ['a', 1];\nconsole.log(pair[2]);",
        "options": [
          "It returns undefined with no compile error",
          "Tuple type '[string, number]' of length '2' has no element at index '2'",
          "It throws a JavaScript runtime ReferenceError",
          "It infers index 2 as type `any`"
        ],
        "correctAnswer": "Tuple type '[string, number]' of length '2' has no element at index '2'",
        "explanation": "TypeScript guards tuple access: indices beyond the declared bounds result in a compilation error."
      },
      {
        "question": "How can you type an array that holds both strings and numbers?",
        "codeSnippet": "const mixed: (string | number)[] = ['apple', 42, 'banana'];",
        "options": [
          "`string | number[]`",
          "`[string, number]`",
          "`(string | number)[]` or `Array<string | number>`",
          "`Array(string, number)`"
        ],
        "correctAnswer": "`(string | number)[]` or `Array<string | number>`",
        "explanation": "Wrapping the union in parentheses `(string | number)[]` specifies an array where any element can be either a string or a number."
      },
      {
        "question": "What does the `as const` assertion do to an array literal?",
        "codeSnippet": "const roles = ['admin', 'editor', 'viewer'] as const;",
        "options": [
          "Prevents the file from being compiled",
          "Makes the array mutable only inside functions",
          "Converts the array to a Set object",
          "Locks it into a readonly tuple of literal types `readonly ['admin', 'editor', 'viewer']`"
        ],
        "correctAnswer": "Locks it into a readonly tuple of literal types `readonly ['admin', 'editor', 'viewer']`",
        "explanation": "`as const` infers the narrowest possible types and creates a readonly tuple."
      },
      {
        "question": "Can tuples have optional elements in TypeScript?",
        "codeSnippet": "type HTTPResponse = [statusCode: number, message?: string];",
        "options": [
          "Yes, using `?` on the type or element label (e.g. `[number, string?]`)",
          "No, tuples must always be strictly fixed in size",
          "Only if all elements are optional",
          "Only when compiling to ES5"
        ],
        "correctAnswer": "Yes, using `?` on the type or element label (e.g. `[number, string?]`)",
        "explanation": "Tuples can define optional elements marked with `?` at the end of the tuple signature."
      }
    ]
  },
  {
    "title": "TypeScript: Union Types & Literal Types",
    "description": "Composing types with pipe `|`, string literal unions, and branch coverage.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What operator is used to construct a Union Type in TypeScript?",
        "codeSnippet": "type Result = Success | Failure;",
        "options": [
          "The ampersand `&` operator",
          "The pipe `|` operator",
          "The comma `,` operator",
          "The or keyword `or`"
        ],
        "correctAnswer": "The pipe `|` operator",
        "explanation": "The pipe `|` represents a union of types, meaning a value can match any one of the specified types."
      },
      {
        "question": "What is a 'string literal type' in TypeScript?",
        "codeSnippet": "let alignment: 'left' | 'center' | 'right';",
        "options": [
          "A string that is stored in read-only RAM",
          "A string that cannot contain spaces",
          "A type that requires the string to match an exact literal string value",
          "An escaped JSON string"
        ],
        "correctAnswer": "A type that requires the string to match an exact literal string value",
        "explanation": "String literal types specify exact required string contents (e.g. `'left'`), rejecting any other arbitrary strings."
      },
      {
        "question": "What error occurs when assigning `'top'` to `let alignment: 'left' | 'center' | 'right';`?",
        "codeSnippet": "alignment = 'top';",
        "options": [
          "SyntaxError: Invalid literal",
          "TypeError: cannot convert string to enum",
          "No error: string is a subtype of string",
          "Type '\"top\"' is not assignable to type '\"left\" | \"center\" | \"right\"'"
        ],
        "correctAnswer": "Type '\"top\"' is not assignable to type '\"left\" | \"center\" | \"right\"'",
        "explanation": "TypeScript verifies literal assignments against the union and rejects non-member strings."
      },
      {
        "question": "If a variable has type `string | number`, which methods can be called directly without narrowing?",
        "codeSnippet": "function printId(id: string | number) {\n  // What methods are allowed here?\n}",
        "options": [
          "Only methods common to both types (such as `toString()` and `valueOf()`)",
          "Any method on `string` or `number`",
          "`toUpperCase()` only",
          "`toFixed()` only"
        ],
        "correctAnswer": "Only methods common to both types (such as `toString()` and `valueOf()`)",
        "explanation": "Before narrowing a union, TypeScript only permits accessing properties and methods present on every member of the union."
      },
      {
        "question": "Can boolean values be used as literal types in unions?",
        "codeSnippet": "type Toggle = true | false;",
        "options": [
          "No, booleans cannot be literal types",
          "Yes, `boolean` in TypeScript is actually an alias for the union `true | false`",
          "Only `true` can be a literal",
          "Only in tsconfig strict mode"
        ],
        "correctAnswer": "Yes, `boolean` in TypeScript is actually an alias for the union `true | false`",
        "explanation": "In TypeScript's internal type system, `boolean` is defined as `true | false`."
      }
    ]
  },
  {
    "title": "TypeScript: Any vs Unknown Basics",
    "description": "Type safety trade-offs, disabling type checking with any, and type narrowing with unknown.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the critical difference between `any` and `unknown`?",
        "codeSnippet": "let a: any = 'hello';\nlet u: unknown = 'hello';\na.nonExistentMethod(); // Compiles fine\n// u.nonExistentMethod(); // What happens here?",
        "options": [
          "`unknown` can only hold strings and numbers",
          "`any` throws errors at compile time",
          "`any` disables type checking completely; `unknown` is type-safe and requires narrowing before performing operations",
          "They are identical synonyms in modern TypeScript"
        ],
        "correctAnswer": "`any` disables type checking completely; `unknown` is type-safe and requires narrowing before performing operations",
        "explanation": "`unknown` is the type-safe counterpart of `any`. You cannot call methods or properties on `unknown` without checking or narrowing its type first."
      },
      {
        "question": "Which type can be assigned to `unknown`?",
        "codeSnippet": "let val: unknown;",
        "options": [
          "Only objects",
          "Only null and undefined",
          "Only values that implement an interface",
          "Any value in JavaScript (primitives, objects, functions, symbols)"
        ],
        "correctAnswer": "Any value in JavaScript (primitives, objects, functions, symbols)",
        "explanation": "`unknown` is the top type of TypeScript's type system; every value is assignable to `unknown`."
      },
      {
        "question": "Can you assign a variable of type `unknown` to a variable of type `string` directly without assertion or narrowing?",
        "codeSnippet": "let u: unknown = 'test';\nlet s: string = u;",
        "options": [
          "No: Type 'unknown' is not assignable to type 'string'",
          "Yes, if the runtime value is actually a string",
          "Yes, TypeScript coerces it automatically",
          "Yes, but only in non-strict mode"
        ],
        "correctAnswer": "No: Type 'unknown' is not assignable to type 'string'",
        "explanation": "`unknown` cannot be assigned to any other type except `unknown` and `any` without explicit narrowing or assertion."
      },
      {
        "question": "Why should `unknown` be preferred over `any` when parsing unknown API payloads?",
        "codeSnippet": "const data: unknown = JSON.parse(response);",
        "options": [
          "It automatically validates data against JSON schemas",
          "It forces developers to validate or narrow the data structure before using it, preventing runtime crashes",
          "It speeds up JSON parsing in V8",
          "It strips invalid fields from the payload"
        ],
        "correctAnswer": "It forces developers to validate or narrow the data structure before using it, preventing runtime crashes",
        "explanation": "By typing untrusted data as `unknown`, TypeScript requires explicit validation checks before accessing properties."
      },
      {
        "question": "How can you narrow a variable of type `unknown` to `string`?",
        "codeSnippet": "function processValue(val: unknown) {\n  if (typeof val === 'string') {\n    console.log(val.toUpperCase());\n  }\n}",
        "options": [
          "By calling `val.toString()` directly",
          "Using the `eval()` function",
          "Using a type guard like `typeof val === 'string'`",
          "By deleting non-string properties"
        ],
        "correctAnswer": "Using a type guard like `typeof val === 'string'`",
        "explanation": "Inside the `if (typeof val === 'string')` block, TypeScript narrows `val` from `unknown` to `string`."
      }
    ]
  },
  {
    "title": "TypeScript: Function Parameter & Return Annotations",
    "description": "Typing arguments, return values, arrow functions, and contextual typing.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How do you annotate both parameters and return type of a function?",
        "codeSnippet": "function multiply(a: number, b: number): number {\n  return a * b;\n}",
        "options": [
          "`function multiply: number(a: number, b: number)`",
          "`number function multiply(a, b)`",
          "`function multiply(a, b) -> number`",
          "`function multiply(a: number, b: number): number`"
        ],
        "correctAnswer": "`function multiply(a: number, b: number): number`",
        "explanation": "Return types are placed after the parameter list closing parenthesis preceded by a colon: `(...): ReturnType`."
      },
      {
        "question": "How is an arrow function typed inline as a variable annotation?",
        "codeSnippet": "const greet: (name: string) => string = (name) => `Hello ${name}`;",
        "options": [
          "`(name: string) => string`",
          "`(name: string): string`",
          "`Function<string, string>`",
          "`name: string -> string`"
        ],
        "correctAnswer": "`(name: string) => string`",
        "explanation": "Function types use the `(params) => ReturnType` arrow syntax."
      },
      {
        "question": "What is 'contextual typing' in TypeScript?",
        "codeSnippet": "const names = ['Alice', 'Bob'];\nnames.forEach((name) => {\n  console.log(name.toUpperCase()); // name is inferred as string\n});",
        "options": [
          "Types must be loaded from a global Context object",
          "TypeScript infers parameter types from the location/context in which the expression appears",
          "TypeScript guesses types using machine learning",
          "Types are only resolved within React Context providers"
        ],
        "correctAnswer": "TypeScript infers parameter types from the location/context in which the expression appears",
        "explanation": "Because `names` is `string[]`, the callback parameter `name` in `.forEach` is contextually inferred as `string` without needing an annotation."
      },
      {
        "question": "What does `void` mean as a function return type?",
        "codeSnippet": "function logEvent(event: string): void {\n  console.log('Event:', event);\n}",
        "options": [
          "The function throws an error every time",
          "The function cannot take any parameters",
          "The function does not return a meaningful value (or returns undefined)",
          "The function runs asynchronously in the background"
        ],
        "correctAnswer": "The function does not return a meaningful value (or returns undefined)",
        "explanation": "`void` signals that callers should ignore any return value; in JS implementations it typically returns `undefined`."
      },
      {
        "question": "How do you define a default parameter value with type inference?",
        "codeSnippet": "function calculateDiscount(price: number, discount = 0.1) {\n  return price * (1 - discount);\n}",
        "options": [
          "`discount: number = 0.1` is strictly mandatory; TypeScript will error without `: number`",
          "`discount = 0.1` infers type `any`",
          "`discount` must be placed before `price`",
          "`discount = 0.1` automatically infers `discount: number`"
        ],
        "correctAnswer": "`discount = 0.1` automatically infers `discount: number`",
        "explanation": "Default parameter values provide contextual type inference, so `discount` is automatically inferred as `number`."
      }
    ]
  },
  {
    "title": "TypeScript: Void vs Never Basics",
    "description": "Non-returning functions, unreachable code analysis, and infinite loops.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is the key difference between `void` and `never`?",
        "codeSnippet": "function a(): void { console.log('hi'); }\nfunction b(): never { throw new Error('fail'); }",
        "options": [
          "`void` returns to the caller without a value; `never` represents a function that never completes or returns at all",
          "`never` is used when a function returns null",
          "`void` cannot have parameters; `never` can",
          "There is no difference"
        ],
        "correctAnswer": "`void` returns to the caller without a value; `never` represents a function that never completes or returns at all",
        "explanation": "`void` completes execution and returns `undefined`. `never` indicates the execution point is never reached or terminates abruptly (via exception or infinite loop)."
      },
      {
        "question": "Which of the following functions correctly has return type `never`?",
        "codeSnippet": "function fail(msg: string): never {\n  throw new Error(msg);\n}",
        "options": [
          "A function with an empty body: `function empty() {}`",
          "A function that unconditionally throws an error",
          "A function that returns `undefined`",
          "A function that returns `Promise<void>`"
        ],
        "correctAnswer": "A function that unconditionally throws an error",
        "explanation": "Because an unconditional `throw` halts normal control flow, the function never returns a value, making its return type `never`."
      },
      {
        "question": "What is the return type of a function running an infinite `while (true)` loop?",
        "codeSnippet": "function supervisor(): never {\n  while (true) {\n    work();\n  }\n}",
        "options": [
          "`void`",
          "`boolean`",
          "`never`",
          "`null`"
        ],
        "correctAnswer": "`never`",
        "explanation": "An infinite loop that never breaks or returns has the return type `never`."
      },
      {
        "question": "Can you assign any value to a variable of type `never`?",
        "codeSnippet": "let n: never;\n// n = 123;",
        "options": [
          "Yes, any number or string",
          "Yes, only null or undefined",
          "Yes, any object",
          "No, nothing can be assigned to `never` except another `never`"
        ],
        "correctAnswer": "No, nothing can be assigned to `never` except another `never`",
        "explanation": "`never` is the bottom type of the TypeScript type system; no value exists in the `never` set."
      },
      {
        "question": "How is `never` utilized in switch statement exhaustiveness checking?",
        "codeSnippet": "default:\n  const _exhaustiveCheck: never = shape;\n  return _exhaustiveCheck;",
        "options": [
          "If an unhandled union case reaches `default`, TypeScript throws a compile-time error because that case cannot be assigned to `never`",
          "It logs a warning in the console at runtime",
          "It forces the switch to restart from case 0",
          "It converts the object to a string"
        ],
        "correctAnswer": "If an unhandled union case reaches `default`, TypeScript throws a compile-time error because that case cannot be assigned to `never`",
        "explanation": "Assigning the unhandled case to `never` produces a compile-time error if any union member was omitted from the switch statement."
      }
    ]
  },
  {
    "title": "TypeScript: Enums (Numeric & String)",
    "description": "Enum definitions, reverse mappings, string vs numeric enums, and const enums.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What values do numeric enums assign by default if not explicitly initialized?",
        "codeSnippet": "enum Direction {\n  Up,\n  Down,\n  Left,\n  Right,\n}",
        "options": [
          "String representations of their keys (`'Up', 'Down', ...`)",
          "Auto-incrementing numbers starting from `0` (`Up = 0, Down = 1, ...`)",
          "Auto-incrementing numbers starting from `1`",
          "Random UUIDs"
        ],
        "correctAnswer": "Auto-incrementing numbers starting from `0` (`Up = 0, Down = 1, ...`)",
        "explanation": "By default, TypeScript numeric enums start at index `0` and increment by `1`."
      },
      {
        "question": "What is 'reverse mapping' in numeric enums?",
        "codeSnippet": "enum Status { Active = 1 }\nconsole.log(Status[1]); // Outputs 'Active'",
        "options": [
          "Numeric enums sort their keys in reverse alphabetical order",
          "Numeric enums invert negative numbers to positive",
          "Numeric enums generate an object that maps both name to value AND value to name",
          "Numeric enums delete values in reverse order"
        ],
        "correctAnswer": "Numeric enums generate an object that maps both name to value AND value to name",
        "explanation": "Numeric enums generate bidirectional mappings (`Status[Status.Active] === 'Active'`)."
      },
      {
        "question": "Do string enums support reverse mapping in TypeScript?",
        "codeSnippet": "enum Role {\n  Admin = 'ADMIN',\n  User = 'USER',\n}",
        "options": [
          "Yes, `Role['ADMIN']` returns `'Admin'`",
          "Only in Node.js environments",
          "Yes, but only if configured in tsconfig",
          "No, string enums do NOT generate reverse mappings"
        ],
        "correctAnswer": "No, string enums do NOT generate reverse mappings",
        "explanation": "String enums only map names to string values; no reverse value-to-name lookup entries are emitted."
      },
      {
        "question": "What is the primary compilation behavior of a `const enum`?",
        "codeSnippet": "const enum LogLevel {\n  Info = 1,\n  Error = 2,\n}\nconst level = LogLevel.Error;",
        "options": [
          "`const enum` members are inlined at compile sites as constants, emitting zero JavaScript object code",
          "`const enum` makes all enum members read-only at runtime via Object.freeze",
          "`const enum` cannot contain numbers",
          "`const enum` generates an ES module export"
        ],
        "correctAnswer": "`const enum` members are inlined at compile sites as constants, emitting zero JavaScript object code",
        "explanation": "`const enum` inlines values directly (e.g. `const level = 2;`) and does not generate a runtime enum object."
      },
      {
        "question": "What is a modern idiomatic alternative to enums in TypeScript codebases?",
        "codeSnippet": "export const LogLevel = {\n  Info: 'INFO',\n  Error: 'ERROR',\n} as const;\nexport type LogLevel = typeof LogLevel[keyof typeof LogLevel];",
        "options": [
          "A JavaScript class with static getters",
          "An object literal with `as const` paired with a derived union type",
          "A Map object with string keys",
          "A global Symbol registry"
        ],
        "correctAnswer": "An object literal with `as const` paired with a derived union type",
        "explanation": "`const` objects paired with `as const` and union types are widely preferred in modern TypeScript because they align cleanly with standard JavaScript semantics."
      }
    ]
  },
  {
    "title": "TypeScript: Type Assertions (`as` syntax)",
    "description": "The `as` keyword, angle-bracket syntax, and safe casting rules.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How do you perform a type assertion using modern TypeScript syntax?",
        "codeSnippet": "const input = document.getElementById('username') as HTMLInputElement;",
        "options": [
          "Using the `cast` keyword: `cast<TargetType>(expression)`",
          "Using the `to` keyword: `expression to TargetType`",
          "Using the `as` keyword: `expression as TargetType`",
          "Using `TargetType(expression)`"
        ],
        "correctAnswer": "Using the `as` keyword: `expression as TargetType`",
        "explanation": "The `as` syntax (`value as Type`) is the standard, JSX-compatible way to assert a type in TypeScript."
      },
      {
        "question": "Does a type assertion perform runtime data conversion or validation?",
        "codeSnippet": "const num = '123' as unknown as number;\nconsole.log(typeof num);",
        "options": [
          "Yes, it converts the string '123' into a numeric value 123",
          "Yes, it throws a runtime CastException if incompatible",
          "Yes, it parses numbers automatically",
          "No, type assertions are purely compile-time instructions and have zero runtime effect (typeof remains 'string')"
        ],
        "correctAnswer": "No, type assertions are purely compile-time instructions and have zero runtime effect (typeof remains 'string')",
        "explanation": "Type assertions tell the TypeScript compiler how to treat a type at compile time; they emit no runtime conversion code."
      },
      {
        "question": "Why is angle-bracket syntax (`<HTMLInputElement>el`) discouraged in TSX files?",
        "codeSnippet": "const el = <HTMLInputElement>document.getElementById('input');",
        "options": [
          "It conflicts with JSX element tag syntax in `.tsx` files",
          "Angle brackets are deprecated in modern ECMAScript",
          "Angle brackets run slower in the compiler",
          "Angle brackets only work in TypeScript 1.0"
        ],
        "correctAnswer": "It conflicts with JSX element tag syntax in `.tsx` files",
        "explanation": "In JSX/TSX files, `<Type>` is ambiguous with opening JSX tags, so the `as` operator must be used instead."
      },
      {
        "question": "When will TypeScript reject a direct type assertion `a as B`?",
        "codeSnippet": "const text = 'hello';\n// const n = text as number;",
        "options": [
          "When the variable is declared with `const`",
          "When neither type sufficiently overlaps with the other",
          "When `strictNullChecks` is false",
          "When target type has fewer than 2 properties"
        ],
        "correctAnswer": "When neither type sufficiently overlaps with the other",
        "explanation": "TypeScript only allows assertions that convert to a more specific or less specific version of a type. Non-overlapping conversions require routing through `unknown`."
      },
      {
        "question": "What is a 'double assertion' and when is it used?",
        "codeSnippet": "const val = (rawInput as unknown) as TargetShape;",
        "options": [
          "Asserting two variables simultaneously in a tuple",
          "Running an assertion twice to ensure thread safety",
          "Casting first to `unknown` (or `any`) and then to the target type to bypass non-overlapping type safety checks",
          "A technique to convert booleans to numbers"
        ],
        "correctAnswer": "Casting first to `unknown` (or `any`) and then to the target type to bypass non-overlapping type safety checks",
        "explanation": "Because `unknown` is compatible with all types, chaining `as unknown as Target` forces the compiler to accept any type conversion."
      }
    ]
  },
  {
    "title": "TypeScript: Nullable Types & Strict Null Checks",
    "description": "Handling null and undefined, tsconfig strictNullChecks, and avoiding null pointer bugs.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does the tsconfig flag `strictNullChecks: true` accomplish?",
        "codeSnippet": "// tsconfig.json: { \"compilerOptions\": { \"strictNullChecks\": true } }",
        "options": [
          "Deletes all null values from objects at build time",
          "Converts all null values into undefined automatically",
          "Throws JavaScript runtime exceptions on null assignments",
          "Ensures `null` and `undefined` are not assignable to other types unless explicitly included in a union"
        ],
        "correctAnswer": "Ensures `null` and `undefined` are not assignable to other types unless explicitly included in a union",
        "explanation": "Under `strictNullChecks`, `null` and `undefined` have their own distinct domain types and cannot be assigned to types like `string` or `number` without an explicit union."
      },
      {
        "question": "How do you declare a variable that can hold either a `string` or `null`?",
        "codeSnippet": "let middleName: string | null = null;",
        "options": [
          "`string | null`",
          "`string?`",
          "`nullable<string>`",
          "`string & null`"
        ],
        "correctAnswer": "`string | null`",
        "explanation": "A union `string | null` explicitly allows the variable to hold a string or the null primitive."
      },
      {
        "question": "What error occurs when calling `.trim()` on `let s: string | null = getVal();` without checking for null?",
        "codeSnippet": "let s: string | null = null;\ns.trim();",
        "options": [
          "SyntaxError: Null method call",
          "'s' is possibly 'null'",
          "TypeError: cannot call trim of null",
          "Warning: Null pointer detected"
        ],
        "correctAnswer": "'s' is possibly 'null'",
        "explanation": "TypeScript halts compilation with `'s' is possibly 'null'` because `null` does not have a `.trim()` method."
      },
      {
        "question": "What is the non-null assertion operator in TypeScript?",
        "codeSnippet": "const el = document.getElementById('app')!;\nel.focus();",
        "options": [
          "The double question mark `??`",
          "The prefix hashtag `#`",
          "The post-fix exclamation mark `!`",
          "The tilde `~`"
        ],
        "correctAnswer": "The post-fix exclamation mark `!`",
        "explanation": "The post-fix `!` asserts to the compiler that the preceding operand is neither `null` nor `undefined`."
      },
      {
        "question": "How does the nullish coalescing operator `??` differ from `||`?",
        "codeSnippet": "const count = 0 ?? 10; // Result: 0\nconst count2 = 0 || 10; // Result: 10",
        "options": [
          "`??` is a TypeScript-only feature that is removed in JavaScript",
          "`??` converts numbers to strings",
          "`??` requires both operands to be numbers",
          "`??` only falls back when the left operand is `null` or `undefined`, whereas `||` falls back on any falsy value (e.g. `0`, `''`, `false`)"
        ],
        "correctAnswer": "`??` only falls back when the left operand is `null` or `undefined`, whereas `||` falls back on any falsy value (e.g. `0`, `''`, `false`)",
        "explanation": "`??` specifically checks for nullish values (`null` or `undefined`), preserving valid falsy values like `0` and `''`."
      }
    ]
  },
  {
    "title": "TypeScript: Object Types & Inline Signatures",
    "description": "Inline object annotations, property qualifiers, and anonymous shapes.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How do you annotate an inline object parameter in a function signature?",
        "codeSnippet": "function sendEmail(user: { email: string; name: string }) {\n  console.log(user.email);\n}",
        "options": [
          "`user: { email: string; name: string }`",
          "`user: object(email: string, name: string)`",
          "`user: [email: string, name: string]`",
          "`user: (email: string, name: string)`"
        ],
        "correctAnswer": "`user: { email: string; name: string }`",
        "explanation": "Inline object shapes are written with curly braces containing key-type pairs separated by semicolons or commas."
      },
      {
        "question": "What does the lowercase `object` type represent in TypeScript?",
        "codeSnippet": "function create(o: object | null): void;\ncreate({ prop: 0 }); // OK\n// create(42); // Error",
        "options": [
          "Any JavaScript value including primitives",
          "Any non-primitive type (anything that is not number, string, boolean, symbol, bigint, null, or undefined)",
          "Only objects created with the `new Object()` constructor",
          "Instances of JSON objects only"
        ],
        "correctAnswer": "Any non-primitive type (anything that is not number, string, boolean, symbol, bigint, null, or undefined)",
        "explanation": "`object` (lowercase) represents any non-primitive type, rejecting primitives like numbers and strings."
      },
      {
        "question": "What does the empty object type `{}` represent in TypeScript?",
        "codeSnippet": "let val: {};\nval = 'hello'; // OK!\nval = 42; // OK!\n// val = null; // Error under strictNullChecks",
        "options": [
          "An object with zero properties only",
          "An empty dictionary",
          "Any value except `null` and `undefined` (under strictNullChecks)",
          "A frozen object"
        ],
        "correctAnswer": "Any value except `null` and `undefined` (under strictNullChecks)",
        "explanation": "In TypeScript, `{}` represents any value that can be indexed or boxed into an object, which includes all primitives except `null` and `undefined`."
      },
      {
        "question": "What happens if you supply extra properties in an inline object literal directly assigned to a typed variable?",
        "codeSnippet": "interface Point { x: number; y: number; }\nconst p: Point = { x: 1, y: 2, z: 3 };",
        "options": [
          "TypeScript silently ignores 'z' and strips it from the object",
          "TypeScript adds 'z' to the Point interface automatically",
          "It compiles without any warning",
          "Excess property check error: 'z' does not exist in type 'Point'"
        ],
        "correctAnswer": "Excess property check error: 'z' does not exist in type 'Point'",
        "explanation": "Fresh object literals undergo excess property checking when assigned directly, catching typos and unanticipated fields."
      },
      {
        "question": "How do you allow an object type to have arbitrary string keys alongside known properties?",
        "codeSnippet": "interface Options {\n  timeout: number;\n  [key: string]: any;\n}",
        "options": [
          "Using an index signature: `[key: string]: any;`",
          "Adding `...rest: any` inside the interface",
          "Setting `allowAny: true` in tsconfig",
          "Inheriting from `Array`"
        ],
        "correctAnswer": "Using an index signature: `[key: string]: any;`",
        "explanation": "An index signature `[key: string]: any;` specifies that the object can hold any number of additional string-keyed properties."
      }
    ]
  },
  {
    "title": "TypeScript: Type Narrowing with `typeof`",
    "description": "Control flow analysis using primitive type guards.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "Which JavaScript operator does TypeScript recognize to narrow primitive union types?",
        "codeSnippet": "function pad(input: string | number) {\n  if (typeof input === 'string') {\n    return input.trim();\n  }\n  return input.toFixed(2);\n}",
        "options": [
          "`instanceof`",
          "`typeof`",
          "`isType`",
          "`as`"
        ],
        "correctAnswer": "`typeof`",
        "explanation": "TypeScript's control flow analysis recognizes `typeof x === '...'` guards to narrow types within branch blocks."
      },
      {
        "question": "What type does `typeof null` return in JavaScript, and how does that affect TypeScript narrowing?",
        "codeSnippet": "function check(x: string | null) {\n  if (typeof x === 'object') {\n    // What is the type of x here?\n  }\n}",
        "options": [
          "`'null'`, so TypeScript narrows `x` to `null` directly",
          "`'undefined'`",
          "`'object'`, so `typeof x === 'object'` narrows `x` to `null` (not an error-free object check)",
          "`'primitive'`"
        ],
        "correctAnswer": "`'object'`, so `typeof x === 'object'` narrows `x` to `null` (not an error-free object check)",
        "explanation": "Because `typeof null === 'object'` in JavaScript, checking `typeof x === 'object'` on a `string | null` union narrows `x` to `null`."
      },
      {
        "question": "Which string return values does `typeof` produce that TypeScript can use for narrowing?",
        "options": [
          "`'array'`, `'date'`, `'regex'`",
          "`'integer'`, `'float'`, `'char'`",
          "`'null'`, `'class'`, `'interface'`",
          "`'string'`, `'number'`, `'bigint'`, `'boolean'`, `'symbol'`, `'undefined'`, `'object'`, and `'function'`"
        ],
        "correctAnswer": "`'string'`, `'number'`, `'bigint'`, `'boolean'`, `'symbol'`, `'undefined'`, `'object'`, and `'function'`",
        "explanation": "These are the 8 standard primitive strings returned by the ECMAScript `typeof` operator."
      },
      {
        "question": "What type is `val` inside the `else` block below?",
        "codeSnippet": "function handle(val: string | number) {\n  if (typeof val === 'string') {\n    // ...\n  } else {\n    // What type is val here?\n  }\n}",
        "options": [
          "`number`",
          "`string | number`",
          "`any`",
          "`unknown`"
        ],
        "correctAnswer": "`number`",
        "explanation": "By process of elimination in control flow analysis, removing `string` leaves `val` narrowed to `number`."
      },
      {
        "question": "Does `typeof x === 'number'` catch `NaN`?",
        "codeSnippet": "const n: unknown = NaN;\nif (typeof n === 'number') {\n  // Does this block execute?\n}",
        "options": [
          "No, `NaN` has `typeof === 'nan'`",
          "Yes, because `typeof NaN` is `'number'` in JavaScript",
          "No, TypeScript narrows `NaN` to `never`",
          "Only in strict mode"
        ],
        "correctAnswer": "Yes, because `typeof NaN` is `'number'` in JavaScript",
        "explanation": "In JavaScript, `typeof NaN === 'number'`, so `typeof x === 'number'` will be true for `NaN` values."
      }
    ]
  },
  {
    "title": "TypeScript: Type Narrowing with `instanceof`",
    "description": "Narrowing object instances via prototype chain constructor verification.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What operator narrows a union by checking an object's prototype constructor?",
        "codeSnippet": "function logDate(value: Date | string) {\n  if (value instanceof Date) {\n    console.log(value.toISOString());\n  }\n}",
        "options": [
          "`typeof`",
          "`isInstanceOf`",
          "`instanceof`",
          "`implements`"
        ],
        "correctAnswer": "`instanceof`",
        "explanation": "`instanceof` tests whether the prototype property of a constructor appears anywhere within the prototype chain of an object."
      },
      {
        "question": "Can `instanceof` be used to check TypeScript `interface` types at runtime?",
        "codeSnippet": "interface User { name: string; }\n// if (obj instanceof User) { ... }",
        "options": [
          "Yes, TypeScript converts interfaces into classes automatically",
          "Yes, if the interface has methods",
          "Only in Node.js",
          "No, because interfaces are erased at compile time and do not exist at runtime in JavaScript"
        ],
        "correctAnswer": "No, because interfaces are erased at compile time and do not exist at runtime in JavaScript",
        "explanation": "Interfaces are purely design-time constructs; the compiler produces `'User' only refers to a type, but is being used as a value here`."
      },
      {
        "question": "What is `err` narrowed to inside the catch block below?",
        "codeSnippet": "try {\n  apiCall();\n} catch (err: unknown) {\n  if (err instanceof Error) {\n    console.error(err.message);\n  }\n}",
        "options": [
          "`Error`",
          "`unknown`",
          "`any`",
          "`TypeError`"
        ],
        "correctAnswer": "`Error`",
        "explanation": "The guard `if (err instanceof Error)` narrows `err` from `unknown` to `Error`, safely allowing access to `.message`."
      },
      {
        "question": "What happens if `instanceof` is used on an object created in a different iframe or VM context?",
        "codeSnippet": "const arr = otherWindow.eval('[]') as unknown;\nif (arr instanceof Array) { ... }",
        "options": [
          "It always evaluates to `true`",
          "It may evaluate to `false` because the object inherits from a different `Array.prototype` in the other window context",
          "It throws a cross-origin security exception",
          "TypeScript rejects the code with a compile error"
        ],
        "correctAnswer": "It may evaluate to `false` because the object inherits from a different `Array.prototype` in the other window context",
        "explanation": "`instanceof` checks exact prototype equality; objects from other realms have different prototype instances."
      },
      {
        "question": "Which built-in JavaScript helper is preferred over `instanceof Array` for checking arrays across execution realms?",
        "codeSnippet": "Array.isArray(candidate);",
        "options": [
          "`typeof candidate === 'array'`",
          "`candidate instanceof Object`",
          "`Array.isArray(candidate)`",
          "`candidate.isList()`"
        ],
        "correctAnswer": "`Array.isArray(candidate)`",
        "explanation": "`Array.isArray()` is cross-realm safe and is recognized by TypeScript as a built-in type guard narrowing to `any[]`."
      }
    ]
  },
  {
    "title": "TypeScript: Type Narrowing with Truthiness & Equality",
    "description": "Narrowing using `===`, `!==`, truthiness checks, and the `in` operator.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "How does checking `if (x !== null)` narrow a variable typed `string | null | undefined`?",
        "codeSnippet": "function process(x: string | null | undefined) {\n  if (x != null) {\n    // What type is x here?\n  }\n}",
        "options": [
          "It only removes `null`, leaving `string | undefined`",
          "It converts `x` to a boolean",
          "It has no effect on TypeScript types",
          "With loose inequality `!= null`, it removes BOTH `null` and `undefined`, narrowing `x` to `string`"
        ],
        "correctAnswer": "With loose inequality `!= null`, it removes BOTH `null` and `undefined`, narrowing `x` to `string`",
        "explanation": "In JavaScript, `x != null` checks against both `null` and `undefined`. TypeScript's type checker models this exact behavior."
      },
      {
        "question": "What operator checks for the presence of a property on an object and narrows unions?",
        "codeSnippet": "type Fish = { swim: () => void };\ntype Bird = { fly: () => void };\nfunction move(animal: Fish | Bird) {\n  if ('swim' in animal) {\n    animal.swim();\n  }\n}",
        "options": [
          "The `in` operator (`'swim' in animal`)",
          "The `has` operator",
          "The `exists` operator",
          "The `contains` operator"
        ],
        "correctAnswer": "The `in` operator (`'swim' in animal`)",
        "explanation": "The `in` operator checks if a property exists on an object and narrows the union to the variant containing that key."
      },
      {
        "question": "What is a potential trap when using truthiness `if (val)` to narrow `string | undefined`?",
        "codeSnippet": "function printLength(text?: string) {\n  if (text) {\n    console.log(text.length);\n  } else {\n    console.log('No text'); // Runs if text is '' or undefined\n  }\n}",
        "options": [
          "`text` is narrowed to `never`",
          "An empty string `\"\"` is falsy, so it enters the `else` branch even though it is a valid string",
          "It throws a TypeError on undefined",
          "TypeScript refuses to compile truthiness checks on strings"
        ],
        "correctAnswer": "An empty string `\"\"` is falsy, so it enters the `else` branch even though it is a valid string",
        "explanation": "Truthiness checks fail for falsy values like empty strings `\"\"` and number `0`, which may cause unintended branching."
      },
      {
        "question": "How does strict equality `===` between two variables narrow their types?",
        "codeSnippet": "function check(a: string | number, b: string | boolean) {\n  if (a === b) {\n    // What type are a and b narrowed to?\n  }\n}",
        "options": [
          "`a` remains `string | number`",
          "Both become `any`",
          "Both `a` and `b` are narrowed to their common type: `string`",
          "`a` and `b` become `never`"
        ],
        "correctAnswer": "Both `a` and `b` are narrowed to their common type: `string`",
        "explanation": "If `a === b` evaluates to true, they must share a value of the intersection of their types, narrowing both to `string`."
      },
      {
        "question": "What does `Boolean(val)` or `!!val` do to a union type in TypeScript control flow?",
        "codeSnippet": "const filtered = ['a', null, 'b'].filter(Boolean);",
        "options": [
          "Converts all array elements into true booleans",
          "Crashes the compiler",
          "Leaves the array typed as `(string | null)[]`",
          "Filters out falsy values; in newer TypeScript versions, `filter(Boolean)` narrows array types by removing `null` and `undefined`"
        ],
        "correctAnswer": "Filters out falsy values; in newer TypeScript versions, `filter(Boolean)` narrows array types by removing `null` and `undefined`",
        "explanation": "TypeScript's standard library includes a type predicate for `Boolean` constructor narrowing."
      }
    ]
  },
  {
    "title": "TypeScript: Const Assertions (`as const`)",
    "description": "Deep immutability, literal type inference, and tuple generation via const assertions.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does appending `as const` to an object literal accomplish?",
        "codeSnippet": "const routes = {\n  home: '/',\n  login: '/login',\n} as const;",
        "options": [
          "Narrows all string/numeric properties to literal types and marks all properties as `readonly`",
          "Freezes the object at runtime via Object.freeze",
          "Transforms the object into a TypeScript enum",
          "Exports the object to other files automatically"
        ],
        "correctAnswer": "Narrows all string/numeric properties to literal types and marks all properties as `readonly`",
        "explanation": "`as const` signals to the compiler that no literal expressions should be widened and object properties are deeply readonly."
      },
      {
        "question": "What is the inferred type of `action.type` below?",
        "codeSnippet": "const action = {\n  type: 'ADD_TODO',\n  payload: 'Learn TS',\n} as const;",
        "options": [
          "`string`",
          "The literal type `'ADD_TODO'`",
          "`any`",
          "`never`"
        ],
        "correctAnswer": "The literal type `'ADD_TODO'`",
        "explanation": "Without `as const`, `type` would be widened to `string`. With `as const`, it is preserved as the literal `'ADD_TODO'`."
      },
      {
        "question": "Can you mutate an array declared with `as const`?",
        "codeSnippet": "const colors = ['red', 'green', 'blue'] as const;\n// colors.push('yellow');",
        "options": [
          "Yes, arrays are always mutable in JavaScript",
          "Yes, but only before runtime execution starts",
          "No, TypeScript emits error: Property 'push' does not exist on type 'readonly [\"red\", \"green\", \"blue\"]'",
          "Only if the array contains fewer than 10 elements"
        ],
        "correctAnswer": "No, TypeScript emits error: Property 'push' does not exist on type 'readonly [\"red\", \"green\", \"blue\"]'",
        "explanation": "`as const` infers array literals as `readonly` tuples, omitting mutating array methods."
      },
      {
        "question": "How can you derive a union type of all values in a `const` object?",
        "codeSnippet": "const Status = { Pending: 'P', Done: 'D' } as const;\ntype StatusValue = typeof Status[keyof typeof Status];",
        "options": [
          "`keyof Status`",
          "`Status.values()`",
          "`unionOf(Status)`",
          "`typeof Status[keyof typeof Status]`"
        ],
        "correctAnswer": "`typeof Status[keyof typeof Status]`",
        "explanation": "Indexing `typeof Status` by its keys `keyof typeof Status` extracts a union of all property values: `'P' | 'D'`."
      },
      {
        "question": "Does `as const` work with template literal strings?",
        "codeSnippet": "const prefix = 'api';\nconst endpoint = `${prefix}/v1` as const;",
        "options": [
          "Yes, it infers the literal type `'api/v1'` rather than the general `string`",
          "No, template strings cannot be asserted with const",
          "Only in Node.js 20+",
          "It converts the template into a RegExp"
        ],
        "correctAnswer": "Yes, it infers the literal type `'api/v1'` rather than the general `string`",
        "explanation": "Template literal strings with `as const` retain their exact evaluated literal string type."
      }
    ]
  },
  {
    "title": "TypeScript: Optional Chaining (`?.`) & Non-null Assertion (`!`)",
    "description": "Safe navigation, short-circuiting, and non-null override operators.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does optional chaining `?.` do when the target is `null` or `undefined`?",
        "codeSnippet": "const zip = user?.address?.zipCode;",
        "options": [
          "Throws a runtime NullPointerException",
          "Short-circuits immediately and returns `undefined` without throwing a TypeError",
          "Returns an empty string `\"\"`",
          "Attempts to instantiate an empty address object"
        ],
        "correctAnswer": "Short-circuits immediately and returns `undefined` without throwing a TypeError",
        "explanation": "Optional chaining `?.` evaluates the expression to `undefined` if the operand before `?.` is `null` or `undefined`."
      },
      {
        "question": "How do you optionally call a function that might be undefined?",
        "codeSnippet": "props.onSuccess?.(result);",
        "options": [
          "`props.onSuccess?(result)`",
          "`props.onSuccess!.call(result)`",
          "`props.onSuccess?.(result)`",
          "`call?(props.onSuccess, result)`"
        ],
        "correctAnswer": "`props.onSuccess?.(result)`",
        "explanation": "Optional method calls use `func?.(args)` which only invokes `func` if it is not `null` or `undefined`."
      },
      {
        "question": "What does the non-null assertion operator `!` tell the TypeScript compiler?",
        "codeSnippet": "const root = document.getElementById('root')!;",
        "options": [
          "Invert the boolean value of root",
          "Force root to be non-empty at runtime",
          "Log an error if root is missing",
          "Trust the developer: assert that `root` is neither `null` nor `undefined` at this point"
        ],
        "correctAnswer": "Trust the developer: assert that `root` is neither `null` nor `undefined` at this point",
        "explanation": "The post-fix `!` removes `null` and `undefined` from the type at compile time."
      },
      {
        "question": "What happens if a non-null asserted variable is actually `null` at runtime?",
        "codeSnippet": "const el = document.getElementById('non_existent')!;\nel.innerHTML = 'Hello';",
        "options": [
          "A JavaScript runtime TypeError: Cannot set property 'innerHTML' of null",
          "TypeScript catches it and safely creates the element",
          "The code exits cleanly with code 0",
          "It logs a compile warning"
        ],
        "correctAnswer": "A JavaScript runtime TypeError: Cannot set property 'innerHTML' of null",
        "explanation": "`!` is erased during compilation and provides zero runtime safety; accessing properties on null will throw a TypeError."
      },
      {
        "question": "How does optional chaining interact with array index access?",
        "codeSnippet": "const firstItem = items?.[0];",
        "options": [
          "`items?[0]`",
          "`items?.[0]` safely accesses index 0 only if `items` is not nullish",
          "`items.[0]?`",
          "`items.get?(0)`"
        ],
        "correctAnswer": "`items?.[0]` safely accesses index 0 only if `items` is not nullish",
        "explanation": "Optional indexing is written as `?.[index]`."
      }
    ]
  },
  {
    "title": "TypeScript: Generics 101: Simple Generic Functions",
    "description": "Generic type parameters, identity functions, and basic parameter inference.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What is a generic type parameter in TypeScript?",
        "codeSnippet": "function identity<T>(arg: T): T {\n  return arg;\n}",
        "options": [
          "A variable that automatically converts strings to numbers",
          "A parameter that can only accept the `any` type",
          "A type variable (`<T>`) that allows functions and components to capture and preserve argument types across calls",
          "A mechanism to compile code to WebAssembly"
        ],
        "correctAnswer": "A type variable (`<T>`) that allows functions and components to capture and preserve argument types across calls",
        "explanation": "Generics allow code to be reusable across different types while maintaining complete static type safety."
      },
      {
        "question": "What is the return type inferred for `output` below?",
        "codeSnippet": "function identity<T>(arg: T): T { return arg; }\nconst output = identity('hello world');",
        "options": [
          "`any`",
          "`unknown`",
          "`T`",
          "`string`"
        ],
        "correctAnswer": "`string`",
        "explanation": "TypeScript infers `T = string` from the argument `'hello world'`, so `output` has type `string`."
      },
      {
        "question": "Can a function have multiple generic type parameters?",
        "codeSnippet": "function pair<K, V>(key: K, value: V): [K, V] {\n  return [key, value];\n}",
        "options": [
          "Yes, separated by commas inside angle brackets (e.g. `<K, V>`)",
          "No, TypeScript functions only allow a single type parameter `<T>`",
          "Only if all parameters are objects",
          "Only in `.tsx` files"
        ],
        "correctAnswer": "Yes, separated by commas inside angle brackets (e.g. `<K, V>`)",
        "explanation": "Functions can accept multiple comma-separated type parameters like `<T, U, V>`."
      },
      {
        "question": "How can callers explicitly specify a generic type instead of relying on inference?",
        "codeSnippet": "const list = identity<number[]>([1, 2, 3]);",
        "options": [
          "By writing `identity(as number[], ...)`",
          "By supplying the type argument in angle brackets after the function name: `identity<number[]>(...)`",
          "By writing `identity.type(number[])(...)`",
          "By using `cast<number[]>(identity(...))`"
        ],
        "correctAnswer": "By supplying the type argument in angle brackets after the function name: `identity<number[]>(...)`",
        "explanation": "Explicit type arguments are provided inside angle brackets: `fn<Type>(args)`."
      },
      {
        "question": "Why is `identity<T>(arg: T): T` superior to `identity(arg: any): any`?",
        "options": [
          "`any` requires more CPU cycles in the JavaScript VM",
          "`<T>` validates data types at runtime",
          "Generic `<T>` preserves the exact return type matching the input; `any` loses all type safety for downstream consumers",
          "Generics automatically serialize return values to JSON"
        ],
        "correctAnswer": "Generic `<T>` preserves the exact return type matching the input; `any` loses all type safety for downstream consumers",
        "explanation": "Generics establish a static relationship between arguments and return types, ensuring autocomplete and type checking remain intact."
      }
    ]
  },
  {
    "title": "TypeScript: Basic tsconfig Options (`target`, `module`, `strict`)",
    "description": "Compiler flags, output targets, module systems, and strict mode flags.",
    "difficulty": "easy",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 8,
    "questions": [
      {
        "question": "What does the `\"target\"` option in `tsconfig.json` control?",
        "codeSnippet": "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\"\n  }\n}",
        "options": [
          "The target operating system (Windows, Mac, Linux)",
          "The CPU architecture (x64, arm64)",
          "The destination folder for compiled files",
          "The ECMAScript JavaScript version that the TypeScript compiler emits"
        ],
        "correctAnswer": "The ECMAScript JavaScript version that the TypeScript compiler emits",
        "explanation": "`target` specifies which JS version (e.g. ES5, ES2020, ESNext) downlevel syntax is transformed into."
      },
      {
        "question": "What does setting `\"strict\": true` in `tsconfig.json` do?",
        "codeSnippet": "{\n  \"compilerOptions\": {\n    \"strict\": true\n  }\n}",
        "options": [
          "Enables a suite of strict type checking options (including `strictNullChecks`, `noImplicitAny`, and `strictFunctionTypes`)",
          "Enforces JavaScript 'use strict' strings only",
          "Disables all compiler warnings",
          "Forces all variables to be `const`"
        ],
        "correctAnswer": "Enables a suite of strict type checking options (including `strictNullChecks`, `noImplicitAny`, and `strictFunctionTypes`)",
        "explanation": "`\"strict\": true` acts as a master toggle that enables all of TypeScript's strongest type safety checks."
      },
      {
        "question": "Which tsconfig option specifies the directory where compiled `.js` and `.d.ts` files are emitted?",
        "codeSnippet": "{\n  \"compilerOptions\": {\n    \"outDir\": \"./dist\"\n  }\n}",
        "options": [
          "`\"outputFolder\"`",
          "`\"outDir\"`",
          "`\"dest\"`",
          "`\"targetDir\"`"
        ],
        "correctAnswer": "`\"outDir\"`",
        "explanation": "`outDir` designates the output folder for compiled JavaScript files."
      },
      {
        "question": "What does `\"noImplicitAny\": true` prevent?",
        "codeSnippet": "// function add(a, b) { return a + b; } // Error if noImplicitAny is enabled",
        "options": [
          "Prevents developers from ever typing `: any` explicitly",
          "Prevents using third-party npm packages",
          "Prevents TypeScript from silently falling back to `any` when it cannot infer a variable or parameter type",
          "Prevents any syntax errors from compiling"
        ],
        "correctAnswer": "Prevents TypeScript from silently falling back to `any` when it cannot infer a variable or parameter type",
        "explanation": "`noImplicitAny` raises a compiler error whenever an unannotated expression defaults to `any`."
      },
      {
        "question": "What does `\"moduleResolution\": \"node\"` (or `\"node16\"` / `\"nodenext\"`) specify?",
        "options": [
          "Which version of Node.js runs the compiler",
          "Whether npm packages are installed automatically",
          "The compression format of emitted JavaScript",
          "How TypeScript searches for module files when resolving `import` statements (mimicking Node.js resolution rules)"
        ],
        "correctAnswer": "How TypeScript searches for module files when resolving `import` statements (mimicking Node.js resolution rules)",
        "explanation": "`moduleResolution` dictates the lookup algorithm TypeScript follows to locate imported modules on disk."
      }
    ]
  }
];
