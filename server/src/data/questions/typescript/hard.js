/**
 * TypeScript Hard Challenge Pack
 * 20 Distinct Topic Quizzes x 5 Focused Practical Questions = 100 Questions Total
 * Answer distribution strictly balanced: 25 A, 25 B, 25 C, 25 D
 */

export const typescriptHardQuizzes = [
  {
    "title": "TypeScript: Conditional Types (`T extends U ? X : Y`)",
    "description": "Ternary type expressions, non-distributive wrapping, and branch resolution.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How do conditional types evaluate in TypeScript?",
        "codeSnippet": "type IsString<T> = T extends string ? true : false;\ntype A = IsString<'hello'>; // true\ntype B = IsString<42>;      // false",
        "options": [
          "If the type on the left of `extends` is assignable to the type on the right, take the true branch `X`, otherwise the false branch `Y`",
          "They execute JavaScript ternary logic at runtime",
          "They compare object memory addresses",
          "They are evaluated only when calling `eval()`"
        ],
        "correctAnswer": "If the type on the left of `extends` is assignable to the type on the right, take the true branch `X`, otherwise the false branch `Y`",
        "explanation": "Conditional types take the form `T extends U ? X : Y`. When `T` is assignable to `U`, the type resolves to `X`; otherwise, it resolves to `Y`."
      },
      {
        "question": "How do you prevent a conditional type from distributing across union members?",
        "codeSnippet": "type IsNever<T> = [T] extends [never] ? true : false;",
        "options": [
          "Add the `final` keyword to the generic parameter",
          "Wrap both sides of the `extends` keyword in square brackets `[T] extends [U]`",
          "Use parentheses `(T) extends (U)`",
          "Set `noDistribute: true` in tsconfig"
        ],
        "correctAnswer": "Wrap both sides of the `extends` keyword in square brackets `[T] extends [U]`",
        "explanation": "Wrapping a type parameter in a tuple `[T]` turns off distribution, evaluating `T` as a single composite union rather than member by member."
      },
      {
        "question": "Why does `type Test<T> = T extends never ? true : false; type Result = Test<never>;` evaluate to `never` rather than `true`?",
        "options": [
          "Because `never` cannot be used in generic types",
          "Because TypeScript has a compiler bug with `never`",
          "Because `never` is an empty union; distributive conditional types over an empty union produce an empty union (`never`) with zero iterations",
          "Because `never extends never` is false"
        ],
        "correctAnswer": "Because `never` is an empty union; distributive conditional types over an empty union produce an empty union (`never`) with zero iterations",
        "explanation": "Since `never` is the empty union, distributing over it distributes zero times, yielding `never`. Wrapping `[T] extends [never]` prevents this and returns `true`."
      },
      {
        "question": "What does `TypeName<T>` evaluate to when `T` is `string | number` in `type TypeName<T> = T extends string ? 'str' : 'other'`?",
        "options": [
          "`'str'`",
          "`'other'`",
          "`never`",
          "`'str' | 'other'`"
        ],
        "correctAnswer": "`'str' | 'other'`",
        "explanation": "Because `T` is a naked type parameter, the condition distributes over `string` (yielding `'str'`) and `number` (yielding `'other'`), unioning them to `'str' | 'other'`."
      },
      {
        "question": "Can conditional types be nested to create multi-branch type resolution trees?",
        "codeSnippet": "type TypeName<T> =\n  T extends string ? 'string' :\n  T extends number ? 'number' :\n  T extends boolean ? 'boolean' :\n  'object';",
        "options": [
          "Yes, chained conditional types function like nested ternary or if-else type selectors",
          "No, TypeScript only permits a single level of conditional type nesting",
          "Only if each branch returns a primitive",
          "Only in `.d.ts` declaration files"
        ],
        "correctAnswer": "Yes, chained conditional types function like nested ternary or if-else type selectors",
        "explanation": "Conditional types can be arbitrarily nested to form exhaustive type decision trees."
      }
    ]
  },
  {
    "title": "TypeScript: The `infer` Keyword & Type Extraction",
    "description": "Pattern matching within conditional types using infer.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is the purpose of the `infer` keyword inside a conditional type?",
        "codeSnippet": "type Flatten<T> = T extends Array<infer Item> ? Item : T;",
        "options": [
          "Forces TypeScript to guess variable types at runtime",
          "Declares a type variable to be deduced from the matched structure in the `true` branch of a conditional type",
          "Imports an external type from another package",
          "Infers the execution speed of a function"
        ],
        "correctAnswer": "Declares a type variable to be deduced from the matched structure in the `true` branch of a conditional type",
        "explanation": "The `infer` keyword introduces a type variable within the `extends` clause of a conditional type, extracting component types dynamically."
      },
      {
        "question": "How is the standard `ReturnType<T>` implemented using `infer`?",
        "codeSnippet": "type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;",
        "options": [
          "`T extends Function ? T.return : void`",
          "`infer R from T.return`",
          "`T extends (...args: any[]) => infer R ? R : any`",
          "`T.getReturnType()`"
        ],
        "correctAnswer": "`T extends (...args: any[]) => infer R ? R : any`",
        "explanation": "Matching `T` against a function signature captures the return type into `R` via `infer R`."
      },
      {
        "question": "What happens if multiple `infer` declarations for the same type variable appear in co-variant positions?",
        "codeSnippet": "type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;\ntype Res = Foo<{ a: string; b: number }>;",
        "options": [
          "TypeScript produces an intersection (`string & number` = `never`)",
          "TypeScript picks the first inferred type (`string`)",
          "A compilation error occurs: duplicate infer variable",
          "TypeScript produces a union of the inferred types (`string | number`)"
        ],
        "correctAnswer": "TypeScript produces a union of the inferred types (`string | number`)",
        "explanation": "Multiple candidates for the same type variable in co-variant positions (like property values) resolve to a union of the candidates."
      },
      {
        "question": "What happens if multiple `infer` declarations for the same type variable appear in contra-variant positions (such as function arguments)?",
        "codeSnippet": "type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never;\ntype Res = Bar<{ a: (x: string) => void; b: (x: number) => void }>;",
        "options": [
          "TypeScript produces an intersection of the inferred types (`string & number` = `never`)",
          "TypeScript produces a union (`string | number`)",
          "TypeScript defaults to `unknown`",
          "TypeScript throws a syntax error"
        ],
        "correctAnswer": "TypeScript produces an intersection of the inferred types (`string & number` = `never`)",
        "explanation": "Multiple candidates for the same type variable in contra-variant positions infer as an intersection."
      },
      {
        "question": "How do you extract the unwrapped type of a Promise using `infer`?",
        "codeSnippet": "type Unpromisify<T> = T extends Promise<infer U> ? U : T;",
        "options": [
          "`T.unwrap()`",
          "`T extends Promise<infer U> ? U : T`",
          "`infer Promise.type<T>`",
          "`Awaited<infer T>`"
        ],
        "correctAnswer": "`T extends Promise<infer U> ? U : T`",
        "explanation": "Matching `T` against `Promise<infer U>` extracts the resolved payload type `U`."
      }
    ]
  },
  {
    "title": "TypeScript: Distributive Conditional Types & Naked Type Parameters",
    "description": "Automatic union distribution, preventing distribution with tuple boxing, and set logic.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is a 'naked type parameter' in the context of distributive conditional types?",
        "codeSnippet": "type Naked<T> = T extends any ? T[] : never;\ntype Boxed<T> = [T] extends [any] ? T[] : never;",
        "options": [
          "A type parameter that has no generic constraint",
          "A type parameter without a default value",
          "A type parameter that is not wrapped in another type construct (like a tuple, array, Promise, or object)",
          "A type parameter that is not exported"
        ],
        "correctAnswer": "A type parameter that is not wrapped in another type construct (like a tuple, array, Promise, or object)",
        "explanation": "A naked type parameter appears directly on the left side of `extends` without being enclosed in any wrapper type."
      },
      {
        "question": "What is the result of `type ToArray<T> = T extends any ? T[] : never; type R = ToArray<string | number>;`?",
        "options": [
          "`(string | number)[]`",
          "`string[]`",
          "`any[]`",
          "`string[] | number[]`"
        ],
        "correctAnswer": "`string[] | number[]`",
        "explanation": "Because `T` is naked, the conditional type distributes over `string` and `number` individually, producing `string[] | number[]` (NOT `(string | number)[]`)."
      },
      {
        "question": "How do you write a utility type `ToArrayNonDist<T>` that produces `(string | number)[]` when given `string | number`?",
        "codeSnippet": "type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;",
        "options": [
          "`type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;`",
          "`type ToArrayNonDist<T> = T extends any ? (T)[] : never;`",
          "`type ToArrayNonDist<T> = Array<T>;`",
          "`type ToArrayNonDist<T> = static T[];`"
        ],
        "correctAnswer": "`type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;`",
        "explanation": "Boxing `[T] extends [any]` prevents distribution, preserving the entire union as a single item `(string | number)[]`."
      },
      {
        "question": "Why does `type Diff<T, U> = T extends U ? never : T;` effectively implement the `Exclude<T, U>` utility?",
        "options": [
          "Because `never` deletes the type from memory",
          "Because for each member of union `T`, if it extends `U`, it evaluates to `never` (which is filtered out of the resulting union)",
          "Because `U` overwrites `T`",
          "Because TypeScript uses bitwise masking"
        ],
        "correctAnswer": "Because for each member of union `T`, if it extends `U`, it evaluates to `never` (which is filtered out of the resulting union)",
        "explanation": "In union types, `never | T` simplifies to `T`. Discarded members resolve to `never`, leaving only the non-matching union variants."
      },
      {
        "question": "What is the output of `type Mystery<T> = T extends true ? 1 : 2; type Out = Mystery<boolean>;`?",
        "options": [
          "`1`",
          "`2`",
          "`1 | 2`",
          "`never`"
        ],
        "correctAnswer": "`1 | 2`",
        "explanation": "In TypeScript, `boolean` is an alias for `true | false`. Because `T` is naked, it distributes over `true` (yielding `1`) and `false` (yielding `2`), resulting in `1 | 2`."
      }
    ]
  },
  {
    "title": "TypeScript: Recursive & Deep Mapped Types (`DeepReadonly`, `DeepPartial`)",
    "description": "Deep object immutability, recursive type definitions, and handling arrays/primitives.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How do you implement a `DeepReadonly<T>` type that recursively freezes nested objects and arrays?",
        "codeSnippet": "type DeepReadonly<T> = T extends Function | boolean | number | string | symbol | null | undefined\n  ? T\n  : T extends Array<infer U>\n  ? ReadonlyArray<DeepReadonly<U>>\n  : { readonly [K in keyof T]: DeepReadonly<T[K]> };",
        "options": [
          "Use `Readonly<Readonly<T>>`",
          "Set `deep: true` in the tsconfig compiler options",
          "Call `Object.freeze` in a type alias",
          "Check if `T` is a primitive or function (base case), then handle arrays recursively, then map over object keys recursively"
        ],
        "correctAnswer": "Check if `T` is a primitive or function (base case), then handle arrays recursively, then map over object keys recursively",
        "explanation": "Recursive mapped types require a termination base case for primitives/functions and distinct recursive branches for arrays and objects."
      },
      {
        "question": "What was the TypeScript version that officially enabled direct circular/recursive type references?",
        "codeSnippet": "type Json = string | number | boolean | null | Json[] | { [key: string]: Json };",
        "options": [
          "TypeScript 3.7",
          "TypeScript 2.0",
          "TypeScript 4.5",
          "TypeScript 5.0"
        ],
        "correctAnswer": "TypeScript 3.7",
        "explanation": "TypeScript 3.7 introduced generalized deferred resolution for recursive type aliases like JSON trees."
      },
      {
        "question": "What problem arises if you do not terminate recursion when mapping over function types in `DeepPartial<T>`?",
        "codeSnippet": "type BadDeepPartial<T> = { [K in keyof T]?: BadDeepPartial<T[K]> };",
        "options": [
          "It causes an immediate infinite compilation loop",
          "Functions are objects in JS; mapping over a function turns its properties (like `.bind`, `.call`, `.name`) into optional types, breaking the function call signature",
          "It converts the function to a string",
          "It crashes node.js"
        ],
        "correctAnswer": "Functions are objects in JS; mapping over a function turns its properties (like `.bind`, `.call`, `.name`) into optional types, breaking the function call signature",
        "explanation": "Functions possess object properties (`prototype`, `bind`, etc.). Without a base-case guard `T extends Function ? T : ...`, their callable nature is destroyed."
      },
      {
        "question": "How do you define `DeepRequired<T>`?",
        "codeSnippet": "type DeepRequired<T> = T extends object\n  ? { [K in keyof T]-?: DeepRequired<T[K]> }\n  : T;",
        "options": [
          "Using `!required`",
          "Using `Required<Required<T>>`",
          "Using `-?` on each property in a recursive mapped type",
          "Wrapping in `NonNullable`"
        ],
        "correctAnswer": "Using `-?` on each property in a recursive mapped type",
        "explanation": "Combining `-?` with recursive descent removes all optional markers down the entire object hierarchy."
      },
      {
        "question": "How does TypeScript protect against infinite type recursion during compilation?",
        "options": [
          "It terminates the operating system process",
          "It falls back to `any` silently without error",
          "It automatically runs garbage collection",
          "It enforces an internal recursion depth limit (typically 50-100 levels) and raises: 'Type instantiation is excessively deep and possibly infinite'"
        ],
        "correctAnswer": "It enforces an internal recursion depth limit (typically 50-100 levels) and raises: 'Type instantiation is excessively deep and possibly infinite'",
        "explanation": "TypeScript tracks instantiation depth and halts infinite recursion with error TS2589."
      }
    ]
  },
  {
    "title": "TypeScript: Advanced Template Literal Type Parsing",
    "description": "String splitting, path query parsing, and type-level pattern matching.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How do you implement a type-level `Split<S, Delimiter>` using template literal pattern matching?",
        "codeSnippet": "type Split<S extends string, D extends string> =\n  S extends `${infer Head}${D}${infer Tail}`\n    ? [Head, ...Split<Tail, D>]\n    : [S];\ntype Parts = Split<'user.address.street', '.'>; // ['user', 'address', 'street']",
        "options": [
          "Pattern match `S extends `${infer Head}${D}${infer Tail}`` and recurse on `Tail`",
          "Use `S.split(D)` in a type alias",
          "Use a RegExp in `infer`",
          "Call `Array.from(S)`"
        ],
        "correctAnswer": "Pattern match `S extends `${infer Head}${D}${infer Tail}`` and recurse on `Tail`",
        "explanation": "Template literal types can match substrings separated by a delimiter `D`, capturing prefixes into `Head` and remaining text into `Tail` recursively."
      },
      {
        "question": "What is `TrimLeft<S>` implemented as with template literal types?",
        "codeSnippet": "type TrimLeft<S extends string> = S extends ` ${infer Rest}` | `\\n${infer Rest}` | `\\t${infer Rest}` ? TrimLeft<Rest> : S;",
        "options": [
          "Calls `S.trimStart()`",
          "Recursively matches leading whitespace characters and discards them until reaching non-whitespace",
          "Replaces spaces with empty strings",
          "Deletes trailing spaces"
        ],
        "correctAnswer": "Recursively matches leading whitespace characters and discards them until reaching non-whitespace",
        "explanation": "Pattern matching against ``` ` ${infer Rest}` ``` strips one leading space per recursion step."
      },
      {
        "question": "How do you type-safely extract route parameters like `:id` from `/users/:id/posts/:postId`?",
        "codeSnippet": "type ExtractParams<T extends string> =\n  T extends `${string}:${infer Param}/${infer Rest}`\n    ? Param | ExtractParams<`/${Rest}`>\n    : T extends `${string}:${infer Param}`\n    ? Param\n    : never;\ntype Params = ExtractParams<'/users/:id/posts/:postId'>; // 'id' | 'postId'",
        "options": [
          "Using `T.match(/:[a-zA-Z]+/g)`",
          "Using `keyof Route`",
          "Using recursive template pattern matching on `${string}:${infer Param}/${infer Rest}`",
          "Using `@Param` decorators"
        ],
        "correctAnswer": "Using recursive template pattern matching on `${string}:${infer Param}/${infer Rest}`",
        "explanation": "Template literal infer matching decomposes the path string into colon-prefixed parameter identifiers."
      },
      {
        "question": "What does `type Join<T extends string[], D extends string>` produce when given `['a', 'b', 'c']` and `'-'`?",
        "codeSnippet": "type Join<T extends string[], D extends string> =\n  T extends [] ? '' :\n  T extends [infer F extends string] ? F :\n  T extends [infer F extends string, ...infer R extends string[]] ? `${F}${D}${Join<R, D>}` : string;",
        "options": [
          "`['a', '-', 'b', '-', 'c']`",
          "`string[]`",
          "`never`",
          "`'a-b-c'`"
        ],
        "correctAnswer": "`'a-b-c'`",
        "explanation": "It recursively joins tuple string elements with delimiter `D` into a single literal string `'a-b-c'`."
      },
      {
        "question": "Can template literal types parse integer numbers into numeric literals?",
        "codeSnippet": "type ToNumber<S extends string> = S extends `${infer N extends number}` ? N : never;\ntype Num = ToNumber<'42'>; // 42 (number literal)",
        "options": [
          "Yes, using `infer N extends number` inside the template string (introduced in TS 4.8)",
          "No, template types can only ever output string types",
          "Only if the number is less than 10",
          "Only in Node.js 18+"
        ],
        "correctAnswer": "Yes, using `infer N extends number` inside the template string (introduced in TS 4.8)",
        "explanation": "TypeScript 4.8 introduced type constraints on `infer` in template literals (`infer N extends number`), allowing string-to-number parsing at the type level."
      }
    ]
  },
  {
    "title": "TypeScript: Variance: Covariance & Contravariance in Function Signatures",
    "description": "Subtyping rules, method variance vs property function variance, and strictFunctionTypes.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What does the `strictFunctionTypes` compiler option enforce?",
        "codeSnippet": "interface Animal { name: string; }\ninterface Dog extends Animal { bark(): void; }\nlet f1: (x: Animal) => void = (x: Animal) => {};\nlet f2: (x: Dog) => void = (x: Dog) => {};\n// f1 = f2; // Error under strictFunctionTypes!",
        "options": [
          "All functions must return a value",
          "Function parameter types are checked contravariantly instead of bivariantly",
          "Functions cannot accept optional parameters",
          "Functions must be declared as arrow functions"
        ],
        "correctAnswer": "Function parameter types are checked contravariantly instead of bivariantly",
        "explanation": "Under `strictFunctionTypes`, function parameters are strictly contravariant: you cannot assign a function expecting a narrower type to a variable expecting a wider type."
      },
      {
        "question": "What does 'covariance' mean in type systems?",
        "options": [
          "Type compatibility inverts the subtyping direction",
          "Types must be exactly identical",
          "Type compatibility preserves the original direction: if `Sub` extends `Super`, then `Box<Sub>` is assignable to `Box<Super>` (e.g. function return types)",
          "Types can vary freely without rules"
        ],
        "correctAnswer": "Type compatibility preserves the original direction: if `Sub` extends `Super`, then `Box<Sub>` is assignable to `Box<Super>` (e.g. function return types)",
        "explanation": "Covariance means the subtype relationship is preserved in the same direction."
      },
      {
        "question": "What does 'contravariance' mean in type systems?",
        "options": [
          "Types must have the same number of keys",
          "Types vary together in lockstep",
          "Types cannot have generic parameters",
          "The subtyping relationship is reversed: if `Sub` extends `Super`, then `Consumer<Super>` is assignable to `Consumer<Sub>` (e.g. function parameter types)"
        ],
        "correctAnswer": "The subtyping relationship is reversed: if `Sub` extends `Super`, then `Consumer<Super>` is assignable to `Consumer<Sub>` (e.g. function parameter types)",
        "explanation": "Function inputs are contravariant: a handler that can process any `Animal` can safely be used wherever a handler for `Dog` is required."
      },
      {
        "question": "Why do method declarations in interfaces (`m(x: T): void`) check bivariantly even when `strictFunctionTypes: true` is enabled?",
        "codeSnippet": "interface Comparer<T> {\n  compare(a: T, b: T): number; // Bivariant method shorthand!\n}",
        "options": [
          "To preserve backward compatibility with JavaScript array patterns like `Array.prototype.push` and `Array<Dog>` assignable to `Array<Animal>`",
          "Because methods cannot have parameters",
          "Because bivariance runs faster in V8",
          "Because methods are always static"
        ],
        "correctAnswer": "To preserve backward compatibility with JavaScript array patterns like `Array.prototype.push` and `Array<Dog>` assignable to `Array<Animal>`",
        "explanation": "Method shorthand syntax (`m(x: T): void`) intentionally retains bivariant parameter checks to accommodate mutable collections like arrays."
      },
      {
        "question": "What variance annotations did TypeScript 4.7 introduce for type parameters?",
        "codeSnippet": "interface Producer<out T> { produce(): T; }\ninterface Consumer<in T> { consume(val: T): void; }",
        "options": [
          "`+` and `-`",
          "`in` (contravariant), `out` (covariant), and `in out` (invariant)",
          "`read` and `write`",
          "`up` and `down`"
        ],
        "correctAnswer": "`in` (contravariant), `out` (covariant), and `in out` (invariant)",
        "explanation": "TypeScript 4.7 added `in` and `out` keywords to explicitly annotate type parameter variance, speeding up compiler structural variance checks."
      }
    ]
  },
  {
    "title": "TypeScript: Type-Level Tuple Manipulation",
    "description": "Variadic tuple elements, push, pop, shift, unshift, and tuple concatenation.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How do you implement a `Push<T, X>` type on tuples using variadic tuple spread?",
        "codeSnippet": "type Push<T extends readonly unknown[], X> = [...T, X];\ntype Res = Push<[1, 2], 3>; // [1, 2, 3]",
        "options": [
          "`type Push<T, X> = T.push(X);`",
          "`type Push<T, X> = [T, X];`",
          "`type Push<T extends readonly unknown[], X> = [...T, X];`",
          "`type Push<T, X> = Array<T | X>;`"
        ],
        "correctAnswer": "`type Push<T extends readonly unknown[], X> = [...T, X];`",
        "explanation": "Variadic tuple elements permit spreading tuple types inside new tuple literals: `[...T, X]`."
      },
      {
        "question": "How do you extract the tail elements of a tuple (Shift / Pop)?",
        "codeSnippet": "type Shift<T extends readonly unknown[]> =\n  T extends readonly [unknown, ...infer Rest] ? Rest : [];\ntype Res = Shift<[string, number, boolean]>; // [number, boolean]",
        "options": [
          "Use `T.shift()` in a type definition",
          "Use `T[1..]`",
          "Use `Omit<T, 0>`",
          "Pattern match with `T extends readonly [unknown, ...infer Rest] ? Rest : []`"
        ],
        "correctAnswer": "Pattern match with `T extends readonly [unknown, ...infer Rest] ? Rest : []`",
        "explanation": "Pattern matching with `[unknown, ...infer Rest]` separates the head element from the remaining tail elements."
      },
      {
        "question": "What is `type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];`?",
        "options": [
          "Concatenates two tuple types into a single unified tuple",
          "Creates a union of both tuples",
          "Computes the Cartesian product of tuples",
          "Throws a compiler error: only one spread allowed"
        ],
        "correctAnswer": "Concatenates two tuple types into a single unified tuple",
        "explanation": "TypeScript 4.0 introduced variadic tuple types allowing multiple spreads within a single tuple definition."
      },
      {
        "question": "How do you reverse a tuple at the type level?",
        "codeSnippet": "type Reverse<T extends readonly unknown[]> =\n  T extends readonly [infer Head, ...infer Tail] ? [...Reverse<Tail>, Head] : [];\ntype R = Reverse<[1, 2, 3]>; // [3, 2, 1]",
        "options": [
          "Call `T.reverse()`",
          "Pattern match `[infer Head, ...infer Tail]` and recursively return `[...Reverse<Tail>, Head]`",
          "Use `[...T[-1..0]]`",
          "Use an indexed loop"
        ],
        "correctAnswer": "Pattern match `[infer Head, ...infer Tail]` and recursively return `[...Reverse<Tail>, Head]`",
        "explanation": "Recursive variadic tuple manipulation places `Head` after the recursively reversed `Tail`."
      },
      {
        "question": "What does a labeled tuple element provide?",
        "codeSnippet": "type Range = [start: number, end: number];",
        "options": [
          "It converts the tuple into an object literal at runtime",
          "It sorts the tuple keys alphabetically",
          "Readable documentation and IDE parameter hints for tuple elements without changing underlying type compatibility",
          "It forces elements to be accessed as object properties"
        ],
        "correctAnswer": "Readable documentation and IDE parameter hints for tuple elements without changing underlying type compatibility",
        "explanation": "Labeled tuple elements (e.g. `[start: number, end: number]`) offer clearer IntelliSense and documentation while remaining standard indexed tuples."
      }
    ]
  },
  {
    "title": "TypeScript: Branded & Nominal Types (Opaque Types)",
    "description": "Simulating nominal typing in a structural type system via branding / flavor symbols.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is a 'branded type' (or nominal type) in TypeScript?",
        "codeSnippet": "type UserId = string & { readonly __brand: unique symbol };\ntype PostId = string & { readonly __brand: unique symbol };",
        "options": [
          "A type that is registered with a trademark office",
          "A type created using the `brand` keyword",
          "A class that cannot be subclassed",
          "Intersecting a primitive type with a unique dummy property to prevent accidental assignment between structurally identical types"
        ],
        "correctAnswer": "Intersecting a primitive type with a unique dummy property to prevent accidental assignment between structurally identical types",
        "explanation": "Branded types attach a fictional property (often using a symbol) to make structurally identical primitives mutually incompatible."
      },
      {
        "question": "What happens if you attempt to assign a plain `string` to a `UserId` branded type without a validator or cast?",
        "codeSnippet": "let uid: UserId = 'user_123'; // Error!",
        "options": [
          "Compile error: Type 'string' is not assignable to type 'UserId'. Property '__brand' is missing in type 'string'",
          "It converts 'user_123' to a UserId class instance",
          "It assigns null",
          "It compiles silently without error"
        ],
        "correctAnswer": "Compile error: Type 'string' is not assignable to type 'UserId'. Property '__brand' is missing in type 'string'",
        "explanation": "Because plain strings lack the `__brand` property, TypeScript rejects the assignment, preventing accidental ID confusion."
      },
      {
        "question": "How is a value typically created for a branded type in production code?",
        "codeSnippet": "function makeUserId(raw: string): UserId {\n  if (!isValidUUID(raw)) throw new Error('Invalid UUID');\n  return raw as UserId;\n}",
        "options": [
          "By writing `new UserId(raw)`",
          "Through a smart constructor or validation function that validates input at runtime and performs a single cast",
          "By using `JSON.parse`",
          "Through JavaScript decorators"
        ],
        "correctAnswer": "Through a smart constructor or validation function that validates input at runtime and performs a single cast",
        "explanation": "Smart constructors validate invariants at runtime and return the branded type via controlled assertion."
      },
      {
        "question": "Does the `__brand` property exist on the object in JavaScript runtime memory?",
        "options": [
          "Yes, TypeScript adds a hidden symbol to the object prototype",
          "Yes, V8 allocates a 64-bit pointer tag for it",
          "No, it is purely a type-level fiction and occupies zero runtime memory and generates no runtime properties",
          "Yes, it is serialized in JSON.stringify"
        ],
        "correctAnswer": "No, it is purely a type-level fiction and occupies zero runtime memory and generates no runtime properties",
        "explanation": "Branding is entirely compile-time; the underlying runtime value is an ordinary unmodified primitive."
      },
      {
        "question": "What is 'flavoring' compared to strict 'branding'?",
        "codeSnippet": "type USD = number & { _flavor?: 'USD' };",
        "options": [
          "Flavoring adds color syntax highlighting in the editor",
          "Flavoring encrypts the numeric value",
          "Flavoring is deprecated in TypeScript",
          "Using an optional property (`_flavor?: ...`) allows plain numbers to be assigned to USD, but prevents assigning a different currency (e.g. EUR) to USD"
        ],
        "correctAnswer": "Using an optional property (`_flavor?: ...`) allows plain numbers to be assigned to USD, but prevents assigning a different currency (e.g. EUR) to USD",
        "explanation": "Weak brands/flavors with optional keys allow unbranded values to be assigned, while still preventing cross-brand collisions."
      }
    ]
  },
  {
    "title": "TypeScript: Polymorphic `this` & Fluent Method Chaining",
    "description": "Method chaining, returning `this` in inheritance hierarchies, and fluent APIs.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What does the polymorphic `this` return type represent in a class method?",
        "codeSnippet": "class QueryBuilder {\n  where(clause: string): this {\n    return this;\n  }\n}",
        "options": [
          "The specific subtype of the derived instance calling the method, rather than the base class itself",
          "The global `window` or `globalThis` object",
          "The parent class prototype",
          "A void return type"
        ],
        "correctAnswer": "The specific subtype of the derived instance calling the method, rather than the base class itself",
        "explanation": "Polymorphic `this` allows derived classes to inherit fluent builder methods and return the derived type instead of the base type."
      },
      {
        "question": "What happens in the following chained call?",
        "codeSnippet": "class BaseBuilder { setA(): this { return this; } }\nclass AdvancedBuilder extends BaseBuilder { setB(): this { return this; } }\nnew AdvancedBuilder().setA().setB();",
        "options": [
          "It fails because `.setA()` returns `BaseBuilder` which lacks `.setB()`",
          "It compiles cleanly because `.setA()` returns `this` typed as `AdvancedBuilder`, preserving access to `.setB()`",
          "It throws a runtime error",
          "It returns `void`"
        ],
        "correctAnswer": "It compiles cleanly because `.setA()` returns `this` typed as `AdvancedBuilder`, preserving access to `.setB()`",
        "explanation": "Because `setA()` returns polymorphic `this`, when called on `AdvancedBuilder`, the return type is `AdvancedBuilder`."
      },
      {
        "question": "Can an interface use `this` in method return signatures?",
        "codeSnippet": "interface Chainable {\n  next(): this;\n}",
        "options": [
          "No, `this` can only appear in classes",
          "Only if the interface extends `Object`",
          "Yes, any implementing class or object type will resolve `this` to its implementing shape",
          "Only in `.d.ts` files"
        ],
        "correctAnswer": "Yes, any implementing class or object type will resolve `this` to its implementing shape",
        "explanation": "Interfaces support `this` as a polymorphic return type."
      },
      {
        "question": "How can you type a function parameter that requires an explicit `this` context?",
        "codeSnippet": "function handleClick(this: HTMLButtonElement, event: Event) {\n  this.disabled = true;\n}",
        "options": [
          "Use `@this(HTMLButtonElement)`",
          "Use `bind<HTMLButtonElement>(handleClick)`",
          "It is not possible in TypeScript",
          "Declare a fake first parameter named `this` with its type annotation (`this: HTMLButtonElement`)"
        ],
        "correctAnswer": "Declare a fake first parameter named `this` with its type annotation (`this: HTMLButtonElement`)",
        "explanation": "A leading parameter named `this` is erased at compile time and specifies the required caller context."
      },
      {
        "question": "What compiler flag warns when `this` is accessed in a function without an explicit or inferred type?",
        "codeSnippet": "{\n  \"compilerOptions\": {\n    \"noImplicitThis\": true\n  }\n}",
        "options": [
          "`\"noImplicitThis\": true`",
          "`\"strictThis\": true`",
          "`\"checkThis\": true`",
          "`\"noUncheckedThis\": true`"
        ],
        "correctAnswer": "`\"noImplicitThis\": true`",
        "explanation": "`noImplicitThis` raises errors when `this` falls back to `any`."
      }
    ]
  },
  {
    "title": "TypeScript: Higher-Order Generic Inference",
    "description": "Generic function composition, curried generic inference, and pipe functions.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How does TypeScript infer types through a generic compose function `compose(f, g)`?",
        "codeSnippet": "const compose = <A, B, C>(f: (x: B) => C, g: (x: A) => B) => (x: A): C => f(g(x));",
        "options": [
          "It widens `B` to `any`",
          "TypeScript propagates type arguments across the intermediate type variable `B` to link input `A` to output `C`",
          "It requires all functions to have identical parameter types",
          "Composition is only checked at runtime"
        ],
        "correctAnswer": "TypeScript propagates type arguments across the intermediate type variable `B` to link input `A` to output `C`",
        "explanation": "TypeScript's unification algorithm threads intermediate generic type parameters through composed call sites."
      },
      {
        "question": "What happens if function arguments in `pipe(...)` are passed in forward execution order?",
        "codeSnippet": "pipe(5, (n) => n * 2, (n) => String(n));",
        "options": [
          "It fails because pipe requires reversed arguments",
          "It converts all steps into Promises",
          "TypeScript uses contextual typing from the initial value through each step sequentially to infer parameter types",
          "It requires explicit type annotations on every callback parameter"
        ],
        "correctAnswer": "TypeScript uses contextual typing from the initial value through each step sequentially to infer parameter types",
        "explanation": "Forward pipes feed the return type of each function into the parameter of the next, allowing complete contextual inference."
      },
      {
        "question": "Why might higher-order generic inference fail when passing uncalled generic functions as arguments?",
        "codeSnippet": "const map = <T, U>(arr: T[], fn: (x: T) => U): U[] => arr.map(fn);\n// map([1, 2], identity);",
        "options": [
          "Generic functions cannot be passed as values in JavaScript",
          "TypeScript forbids first-class functions",
          "Higher-order functions must be synchronous",
          "TypeScript must instantiate `identity`'s generic type parameter at the argument site before the call completes"
        ],
        "correctAnswer": "TypeScript must instantiate `identity`'s generic type parameter at the argument site before the call completes",
        "explanation": "Uncalled generic arguments require type inference from the surrounding call, which can fail if inference dependencies are circular."
      },
      {
        "question": "How do you preserve literal return types in higher-order helper functions?",
        "codeSnippet": "const createStore = <const T extends Record<string, unknown>>(config: T) => ({ ...config });",
        "options": [
          "Using `const` type parameters (`<const T>` introduced in TypeScript 5.0)",
          "Writing `as const` on the return value",
          "Using `Object.freeze`",
          "Using `Record<string, literal>`"
        ],
        "correctAnswer": "Using `const` type parameters (`<const T>` introduced in TypeScript 5.0)",
        "explanation": "TypeScript 5.0 introduced `<const T>`, which automatically applies `as const` literal inference to arguments at call sites."
      },
      {
        "question": "What is a 'type parameter instantiation' in generic functions?",
        "options": [
          "Instantiating a class with `new`",
          "The process by which the compiler substitutes concrete types for type parameters at a specific call site",
          "Allocating memory for a generic in C++",
          "Generating a JavaScript closure"
        ],
        "correctAnswer": "The process by which the compiler substitutes concrete types for type parameters at a specific call site",
        "explanation": "Type parameter instantiation replaces generic type variables with specific concrete types."
      }
    ]
  },
  {
    "title": "TypeScript: Excess Property Checks & Fresh Object Literals",
    "description": "Freshness analysis, object literal assignability, and avoiding typo bugs.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is 'freshness' regarding object literals in TypeScript?",
        "codeSnippet": "interface Options { width: number; }\n// Fresh:\nconst o1: Options = { width: 10, colour: 'red' }; // Error!\n// Non-fresh:\nconst raw = { width: 10, colour: 'red' };\nconst o2: Options = raw; // OK!",
        "options": [
          "An object that was created less than 1 second ago",
          "An object that contains only primitive values",
          "Object literals created directly in an assignment or argument position are marked 'fresh' and trigger excess property checks",
          "An object that has not been modified"
        ],
        "correctAnswer": "Object literals created directly in an assignment or argument position are marked 'fresh' and trigger excess property checks",
        "explanation": "Fresh object literals are subject to excess property checks to catch typos; once assigned to an intermediate variable, freshness is lost."
      },
      {
        "question": "Why does assigning `raw` to `o2: Options` work even though `raw` has `colour`?",
        "options": [
          "TypeScript deletes `colour` from `raw` during assignment",
          "`Options` automatically gains the `colour` property",
          "It only works in non-strict mode",
          "TypeScript uses structural subtyping: `raw` satisfies all requirements of `Options` (`width: number`), and freshness is stripped after initial declaration"
        ],
        "correctAnswer": "TypeScript uses structural subtyping: `raw` satisfies all requirements of `Options` (`width: number`), and freshness is stripped after initial declaration",
        "explanation": "Because TypeScript is structurally typed, a supertype variable can hold extra properties as long as it isn't a fresh literal."
      },
      {
        "question": "How can you intentionally bypass excess property checking on an object literal?",
        "codeSnippet": "const o: Options = { width: 10, colour: 'red' } as Options;",
        "options": [
          "Using a type assertion (`as Options`) or assigning to an intermediate variable first",
          "Adding `// @ignore` above the line",
          "Wrapping keys in quotes",
          "Using `Object.assign`"
        ],
        "correctAnswer": "Using a type assertion (`as Options`) or assigning to an intermediate variable first",
        "explanation": "Type assertions explicitly inform the compiler to bypass freshness checks on the literal."
      },
      {
        "question": "What is the primary design purpose of excess property checks?",
        "options": [
          "To improve memory allocation in V8",
          "To catch misspelled optional properties and typos that would otherwise be silently ignored due to structural subtyping",
          "To prevent developers from using JavaScript",
          "To reduce emitted bundle size"
        ],
        "correctAnswer": "To catch misspelled optional properties and typos that would otherwise be silently ignored due to structural subtyping",
        "explanation": "If you mistype an optional property like `colr` instead of `color`, excess property checks prevent it from silently failing."
      },
      {
        "question": "Does excess property checking apply to discriminated union variants?",
        "codeSnippet": "type Action = { type: 'A'; val: number } | { type: 'B'; text: string };\nconst act: Action = { type: 'A', val: 1, text: 'unused' }; // What happens?",
        "options": [
          "It merges both variants into a hybrid type",
          "It strips `text` automatically",
          "Compile error: Object literal may only specify known properties, and 'text' does not exist in type '{ type: \"A\"; val: number; }'",
          "It compiles with no warnings"
        ],
        "correctAnswer": "Compile error: Object literal may only specify known properties, and 'text' does not exist in type '{ type: \"A\"; val: number; }'",
        "explanation": "Excess property checking ensures that literal objects matching variant `'A'` do not contain extraneous properties from variant `'B'`."
      }
    ]
  },
  {
    "title": "TypeScript: Symbol Keys & Unique Symbols",
    "description": "Well-known symbols, `unique symbol` types, and symbol indexation.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is a `unique symbol` in TypeScript?",
        "codeSnippet": "const kKey: unique symbol = Symbol('key');",
        "options": [
          "A symbol that can only be used once in the entire program",
          "A symbol stored in the global Symbol registry",
          "A string encrypted as a symbol",
          "A subtype of `symbol` produced only by `const` declarations or `readonly static` properties, representing one exact unique symbol identity"
        ],
        "correctAnswer": "A subtype of `symbol` produced only by `const` declarations or `readonly static` properties, representing one exact unique symbol identity",
        "explanation": "`unique symbol` denotes an exact, distinct symbol reference that cannot be assigned to another symbol without being the exact same identifier."
      },
      {
        "question": "Can a `let` variable be typed as `unique symbol`?",
        "codeSnippet": "// let s: unique symbol = Symbol(); // Error!",
        "options": [
          "No, `unique symbol` types are only permitted on `const` declarations and `readonly static` class fields",
          "Yes, any variable can be typed as unique symbol",
          "Only in strict mode",
          "Only if initialized to null"
        ],
        "correctAnswer": "No, `unique symbol` types are only permitted on `const` declarations and `readonly static` class fields",
        "explanation": "Because `let` variables can be reassigned, their type identity could change, so `unique symbol` requires immutable bindings (`const`)."
      },
      {
        "question": "How do you use a `unique symbol` as an object key in an interface?",
        "codeSnippet": "const sym = Symbol('secret');\ninterface Hidden {\n  [sym]: string;\n}",
        "options": [
          "Writing `sym: string;` directly",
          "Using computed property name syntax `[sym]: string;` where `sym` is a `const` with type `unique symbol`",
          "Using `keyof Symbol`",
          "Symbols cannot be used in interfaces"
        ],
        "correctAnswer": "Using computed property name syntax `[sym]: string;` where `sym` is a `const` with type `unique symbol`",
        "explanation": "Computed property names in interfaces require the key variable to have a `unique symbol` or literal type."
      },
      {
        "question": "How does TypeScript type built-in symbols like `Symbol.iterator`?",
        "codeSnippet": "interface Iterable<T> {\n  [Symbol.iterator](): Iterator<T>;\n}",
        "options": [
          "As string literals",
          "As numeric indices",
          "As well-known `unique symbol` declarations on the global `SymbolConstructor` interface",
          "As private methods"
        ],
        "correctAnswer": "As well-known `unique symbol` declarations on the global `SymbolConstructor` interface",
        "explanation": "The TypeScript standard library models built-in symbols as `unique symbol` properties on `SymbolConstructor`."
      },
      {
        "question": "What is `typeof sym` when `const sym = Symbol();`?",
        "options": [
          "The general primitive `symbol`",
          "`'symbol'`",
          "`object`",
          "The `unique symbol` type specific to that declaration"
        ],
        "correctAnswer": "The `unique symbol` type specific to that declaration",
        "explanation": "`typeof sym` refers directly to the nominal `unique symbol` type associated with the binding `sym`."
      }
    ]
  },
  {
    "title": "TypeScript: Currying & Pipeline Type Definitions",
    "description": "Type-level currying, arity extraction, and accumulator tuples.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is the goal of a type-level `Curry<F>` definition?",
        "codeSnippet": "type Curry<F> = F extends (...args: infer A) => infer R\n  ? A extends [infer H, ...infer T]\n    ? (arg: H) => Curry<(...args: T) => R>\n    : R\n  : never;",
        "options": [
          "Transforms a multi-argument function signature `(a: A, b: B) => R` into a series of single-argument functions `(a: A) => (b: B) => R`",
          "Measures the execution time of curried functions",
          "Compiles closures into loops",
          "Validates function parameters with regex"
        ],
        "correctAnswer": "Transforms a multi-argument function signature `(a: A, b: B) => R` into a series of single-argument functions `(a: A) => (b: B) => R`",
        "explanation": "Type-level currying recursively consumes parameter tuple elements, returning nested unary functions."
      },
      {
        "question": "What handles the base case when currying a function with zero arguments remaining?",
        "options": [
          "It throws an error",
          "When the parameter tuple `A` is empty `[]`, it evaluates to the return type `R`",
          "It returns `void`",
          "It returns `never`"
        ],
        "correctAnswer": "When the parameter tuple `A` is empty `[]`, it evaluates to the return type `R`",
        "explanation": "Once all parameters are bound, the curried function returns the final computed return type `R`."
      },
      {
        "question": "How do pipe types typically ensure type safety across an arbitrary number of functions?",
        "codeSnippet": "function pipe<A, B, C, D>(\n  val: A,\n  fn1: (a: A) => B,\n  fn2: (b: B) => C,\n  fn3: (c: C) => D\n): D;",
        "options": [
          "Using `any` for all intermediate functions",
          "By compiling functions into WebAssembly",
          "Via overloaded signatures for 1 through 10+ arguments chaining types, or recursive tuple reduction in newer TS versions",
          "By inspecting JavaScript AST strings"
        ],
        "correctAnswer": "Via overloaded signatures for 1 through 10+ arguments chaining types, or recursive tuple reduction in newer TS versions",
        "explanation": "Production libraries like RxJS or fp-ts provide stacked generic overloads chaining intermediate types from step to step."
      },
      {
        "question": "Can currying handle functions with optional or rest parameters cleanly in TypeScript?",
        "options": [
          "Yes, rest parameters are identical to fixed tuples",
          "No, currying is strictly prohibited for rest parameters",
          "Only in Node.js environments",
          "Rest parameters and optional arguments require specialized conditional branching, as infinite or variable-length tuples cannot be simply decomposed one-by-one"
        ],
        "correctAnswer": "Rest parameters and optional arguments require specialized conditional branching, as infinite or variable-length tuples cannot be simply decomposed one-by-one",
        "explanation": "Tuples with unbounded tails (`...args: number[]`) lack fixed lengths and need custom recursive handling."
      },
      {
        "question": "What is the return type of `Curry<(x: string, y: number) => boolean>` when called with `fn('hello')(42)`?",
        "options": [
          "`boolean`",
          "`(y: number) => boolean`",
          "`string`",
          "`void`"
        ],
        "correctAnswer": "`boolean`",
        "explanation": "Calling both curried stages resolves to the final underlying return type `boolean`."
      }
    ]
  },
  {
    "title": "TypeScript: Generic Instantiation Depth Limits & Recursion Truncation",
    "description": "Compiler limits, error TS2589, tail-call optimization emulation in type-level programming.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What triggers the compiler error `Type instantiation is excessively deep and possibly infinite (TS2589)`?",
        "options": [
          "A JavaScript loop runs for more than 10 seconds",
          "A recursive conditional or mapped type exceeds TypeScript's internal recursion depth limit without reaching a base case",
          "An object contains circular property references at runtime",
          "A file has more than 10,000 lines of code"
        ],
        "correctAnswer": "A recursive conditional or mapped type exceeds TypeScript's internal recursion depth limit without reaching a base case",
        "explanation": "TS2589 is the compiler's guardrail to prevent out-of-memory crashes when resolving unbounded recursive types."
      },
      {
        "question": "What is 'Tail-Call Optimization (TCO)' emulation in TypeScript types (introduced in TS 4.5)?",
        "codeSnippet": "type Trim<S extends string, Acc extends string = ''> = ...",
        "options": [
          "An engine feature in Google Chrome V8",
          "A technique to compile TypeScript to C",
          "TypeScript 4.5 optimized conditional types where the recursive call is in the tail position, dramatically increasing allowed recursion depth (up to ~1000 levels)",
          "A way to run recursive functions without a stack"
        ],
        "correctAnswer": "TypeScript 4.5 optimized conditional types where the recursive call is in the tail position, dramatically increasing allowed recursion depth (up to ~1000 levels)",
        "explanation": "When a conditional type immediately returns the result of the recursive call without wrapping it in another type expression, TypeScript eliminates stack frames."
      },
      {
        "question": "How do you restructure a non-tail-recursive type into a tail-recursive type?",
        "options": [
          "Wrap the type in `Promise`",
          "Add `return` before the type name",
          "Use a `while` statement",
          "Accumulate intermediate results in an accumulator type parameter (`Acc extends any[] = []`) and return `Acc` at the base case"
        ],
        "correctAnswer": "Accumulate intermediate results in an accumulator type parameter (`Acc extends any[] = []`) and return `Acc` at the base case",
        "explanation": "Using an accumulator parameter allows the recursive call to sit directly in the tail position."
      },
      {
        "question": "What happens if a recursive type involves circular references in object properties?",
        "codeSnippet": "interface Node { next: Node; }",
        "options": [
          "Interfaces allow circular references because interface properties are evaluated lazily on demand",
          "It immediately triggers TS2589 at compile time",
          "It crashes the compiler",
          "Circular interfaces are forbidden"
        ],
        "correctAnswer": "Interfaces allow circular references because interface properties are evaluated lazily on demand",
        "explanation": "Interfaces and object type properties are resolved lazily when accessed, avoiding infinite recursion issues."
      },
      {
        "question": "How can you manually truncate or bound a type-level counter?",
        "codeSnippet": "type Count<T extends any[], Depth extends any[] = []> =\n  Depth['length'] extends 10 ? 'max_depth_reached' : Count<T, [...Depth, any]>;",
        "options": [
          "Use the `break` keyword",
          "Check the length of a tuple accumulator (`Depth['length'] extends Max ? ...`) to exit recursion early",
          "Throw an exception in a type guard",
          "Set `maxDepth` in tsconfig"
        ],
        "correctAnswer": "Check the length of a tuple accumulator (`Depth['length'] extends Max ? ...`) to exit recursion early",
        "explanation": "Using tuple length checks (`Depth['length'] extends N`) serves as a type-level loop counter to guarantee safe exit."
      }
    ]
  },
  {
    "title": "TypeScript: Deep Merge of Complex Object Types",
    "description": "Recursive merging, overriding properties, and resolving nested conflicts.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "Why does a simple intersection `A & B` fail as a true 'deep merge' for overlapping nested objects?",
        "codeSnippet": "type A = { config: { timeout: number } };\ntype B = { config: { retries: number } };\ntype Simple = A & B;\n// What if A has { id: string } and B has { id: number }?",
        "options": [
          "`&` deletes all nested properties",
          "`&` only works on primitive types",
          "Conflicting primitive property types intersect to `never` (e.g. `string & number = never`) instead of cleanly overriding",
          "`&` causes a syntax error on objects"
        ],
        "correctAnswer": "Conflicting primitive property types intersect to `never` (e.g. `string & number = never`) instead of cleanly overriding",
        "explanation": "Simple intersections intersect conflicting property types; if `A['id']` is `string` and `B['id']` is `number`, `(A & B)['id']` becomes `never`."
      },
      {
        "question": "How do you implement a `DeepMerge<A, B>` type that overrides primitives while recursively merging sub-objects?",
        "codeSnippet": "type DeepMerge<A, B> = {\n  [K in keyof A | keyof B]: K extends keyof B\n    ? K extends keyof A\n      ? A[K] extends object\n        ? B[K] extends object\n          ? DeepMerge<A[K], B[K]>\n          : B[K]\n        : B[K]\n      : B[K]\n    : K extends keyof A\n    ? A[K]\n    : never;\n};",
        "options": [
          "Use `Object.assign<A, B>()`",
          "Write `A + B`",
          "Use `keyof (A & B)`",
          "Iterate over `keyof A | keyof B`; if key is in both and both are objects, recurse; otherwise let `B[K]` take precedence"
        ],
        "correctAnswer": "Iterate over `keyof A | keyof B`; if key is in both and both are objects, recurse; otherwise let `B[K]` take precedence",
        "explanation": "Iterating over the union of keys and selectively recursing on object-valued properties mimics runtime `deepmerge` behavior."
      },
      {
        "question": "How should array properties be handled when deep-merging configurations?",
        "options": [
          "Typically, array types in `B` completely replace arrays in `A` (or are concatenated), depending on design intent",
          "Arrays are always converted to objects with numeric keys",
          "Arrays must be discarded",
          "Arrays cannot be properties of merged types"
        ],
        "correctAnswer": "Typically, array types in `B` completely replace arrays in `A` (or are concatenated), depending on design intent",
        "explanation": "In configuration merging, array properties are usually overwritten by the overriding config rather than deep-merged element by element."
      },
      {
        "question": "What does `MergeInsertions<T>` do to clean up messy intersection types in IDE tooltips?",
        "codeSnippet": "type MergeInsertions<T> = T extends object ? { [K in keyof T]: MergeInsertions<T[K]> } : T;",
        "options": [
          "Removes all properties from T",
          "Flattens complex intersections (like `A & B & C`) into a clean, unified object tooltip shape in hover cards",
          "Converts types into JSON strings",
          "Deletes duplicate methods"
        ],
        "correctAnswer": "Flattens complex intersections (like `A & B & C`) into a clean, unified object tooltip shape in hover cards",
        "explanation": "Mapped types force TypeScript to re-evaluate and flatten complex intersection expressions into readable object representations."
      },
      {
        "question": "What happens if one of the merged objects has an optional property and the other has a required property?",
        "options": [
          "The property becomes optional",
          "The property becomes `never`",
          "The required property type from `B` takes precedence, removing the optional marker in the merged result",
          "A compile error is triggered"
        ],
        "correctAnswer": "The required property type from `B` takes precedence, removing the optional marker in the merged result",
        "explanation": "An overriding required property satisfies and replaces the previous optional requirement."
      }
    ]
  },
  {
    "title": "TypeScript: Builder Pattern Typing with Incremental Type Accumulation",
    "description": "Tracking accumulated configuration state across fluent builder methods at the type level.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How does a type-safe Builder pattern ensure all required properties are supplied before calling `.build()`?",
        "codeSnippet": "class Builder<T = {}> {\n  set<K extends string, V>(key: K, val: V): Builder<T & Record<K, V>> {\n    return this as any;\n  }\n  build(this: Builder<{ name: string; age: number }>) { ... }\n}",
        "options": [
          "It validates properties at runtime with a regex",
          "It counts the number of method calls",
          "It uses a try-catch block inside build",
          "Each `.set()` call returns a new `Builder` accumulating the key-value type, and `.build()` specifies a `this` constraint requiring all necessary keys"
        ],
        "correctAnswer": "Each `.set()` call returns a new `Builder` accumulating the key-value type, and `.build()` specifies a `this` constraint requiring all necessary keys",
        "explanation": "By accumulating types into generic parameter `T` on each setter and constraining `this` on `.build()`, TypeScript rejects incomplete builders at compile time."
      },
      {
        "question": "What error does TypeScript throw if you call `builder.build()` before setting `'age'` in the snippet above?",
        "options": [
          "The 'this' context of type 'Builder<{ name: string; }>' is not assignable to method's 'this' of type 'Builder<{ name: string; age: number; }>'",
          "NullPointerException: age is missing",
          "TypeError: cannot call build of undefined",
          "Warning: Incomplete builder"
        ],
        "correctAnswer": "The 'this' context of type 'Builder<{ name: string; }>' is not assignable to method's 'this' of type 'Builder<{ name: string; age: number; }>'",
        "explanation": "TypeScript evaluates the `this` parameter constraint at call sites; missing properties fail the `this` type assertion."
      },
      {
        "question": "How can a builder prevent setting the exact same property twice?",
        "codeSnippet": "set<K extends string, V>(key: K extends keyof T ? never : K, val: V): Builder<T & Record<K, V>>",
        "options": [
          "Throw an error at runtime",
          "Constrain `key: K extends keyof T ? never : K` so existing keys cause a compilation error",
          "Use `Object.seal`",
          "Delete the old key"
        ],
        "correctAnswer": "Constrain `key: K extends keyof T ? never : K` so existing keys cause a compilation error",
        "explanation": "If `K` already exists in `keyof T`, resolving its type to `never` disallows passing that key name again."
      },
      {
        "question": "Does the type accumulation pattern require instantiating new JavaScript objects on every builder step?",
        "options": [
          "Yes, a new instance must be allocated for every type change",
          "Yes, because TypeScript types reflect V8 memory addresses",
          "No, the runtime implementation can mutate a single internal config object and return `this as any`, while the type system tracks static changes",
          "Only in immutable Redux stores"
        ],
        "correctAnswer": "No, the runtime implementation can mutate a single internal config object and return `this as any`, while the type system tracks static changes",
        "explanation": "The runtime implementation can reuse a single mutable instance for performance while presenting an immutable, progressive type interface."
      },
      {
        "question": "What is the primary benefit of this builder typing pattern in complex SDKs?",
        "options": [
          "Smaller bundle size in emitted JS",
          "Faster network requests",
          "Automatic encryption",
          "Compile-time guarantee that complex configurations are fully and correctly assembled without runtime validation boilerplate"
        ],
        "correctAnswer": "Compile-time guarantee that complex configurations are fully and correctly assembled without runtime validation boilerplate",
        "explanation": "It guides developers with compiler errors when mandatory configuration steps are omitted."
      }
    ]
  },
  {
    "title": "TypeScript: Union to Intersection Trick",
    "description": "The famous contra-variant function parameter inference technique (`UnionToIntersection<U>`).",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "How is the canonical `UnionToIntersection<U>` implemented in TypeScript?",
        "codeSnippet": "type UnionToIntersection<U> =\n  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;\ntype Res = UnionToIntersection<{ a: 1 } | { b: 2 }>; // { a: 1 } & { b: 2 }",
        "options": [
          "By distributing `U` into function parameter positions (contra-variant), where multiple candidates for `infer I` intersect into `I`",
          "By using `U extends any ? U & U : never`",
          "By writing `U[keyof U]`",
          "By calling `Object.assign`"
        ],
        "correctAnswer": "By distributing `U` into function parameter positions (contra-variant), where multiple candidates for `infer I` intersect into `I`",
        "explanation": "Function arguments are contravariant. When `U` distributes into `(k: U) => void`, the resulting union of functions forces `infer I` to infer the intersection of all parameter types."
      },
      {
        "question": "Why does `(k: infer I) => void` force an intersection rather than a union?",
        "options": [
          "Because `void` converts types to intersections",
          "Because function parameters are in contra-variant positions, and candidate types in contra-variant positions are combined into an intersection",
          "Because `infer` defaults to intersection for objects",
          "It is an unintended compiler glitch"
        ],
        "correctAnswer": "Because function parameters are in contra-variant positions, and candidate types in contra-variant positions are combined into an intersection",
        "explanation": "To safely call a function that could be any member of a union of function types, the argument must satisfy all signatures simultaneously, requiring an intersection."
      },
      {
        "question": "What is the result of `UnionToIntersection<string | number>`?",
        "options": [
          "`string | number`",
          "`unknown`",
          "`never` (because `string & number` is an impossible primitive intersection)",
          "`any`"
        ],
        "correctAnswer": "`never` (because `string & number` is an impossible primitive intersection)",
        "explanation": "Primitives have disjoint value spaces, so their intersection produces the bottom type `never`."
      },
      {
        "question": "What is a major practical application of `UnionToIntersection` in TypeScript libraries?",
        "options": [
          "Sorting union members alphabetically",
          "Converting JSON to XML",
          "De-duplicating arrays at runtime",
          "Merging a union of mixin interfaces or overloaded function signatures into a single unified callable/composite interface"
        ],
        "correctAnswer": "Merging a union of mixin interfaces or overloaded function signatures into a single unified callable/composite interface",
        "explanation": "It allows combining dynamic unions of contracts into a single composite type that implements all variants."
      },
      {
        "question": "Can `UnionToIntersection` convert a union of function signatures into an overloaded function type?",
        "codeSnippet": "type Fns = ((x: string) => string) | ((x: number) => number);\ntype Overloaded = UnionToIntersection<Fns>;",
        "options": [
          "Yes, intersecting function signatures in TypeScript creates an overloaded function type with multiple call signatures",
          "No, intersecting functions produces `never`",
          "Only if the functions take no arguments",
          "Only in class declarations"
        ],
        "correctAnswer": "Yes, intersecting function signatures in TypeScript creates an overloaded function type with multiple call signatures",
        "explanation": "In TypeScript, `FnA & FnB` represents an overloaded function containing the call signatures of both `FnA` and `FnB`."
      }
    ]
  },
  {
    "title": "TypeScript: Strict Bindings with `noImplicitOverride` & `exactOptionalPropertyTypes`",
    "description": "Modern strict tsconfig compiler flags for robust object design.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What does the `noImplicitOverride: true` compiler flag enforce in classes?",
        "codeSnippet": "class Parent { render() {} }\nclass Child extends Parent {\n  override render() {} // override keyword required!\n}",
        "options": [
          "Prevents any method from being overridden",
          "Methods in derived classes that override a base class method MUST include the explicit `override` keyword",
          "Forces all methods to be private",
          "Disables inheritance completely"
        ],
        "correctAnswer": "Methods in derived classes that override a base class method MUST include the explicit `override` keyword",
        "explanation": "`noImplicitOverride` prevents accidental method name collisions and protects against base class refactorings by requiring `override`."
      },
      {
        "question": "What does `exactOptionalPropertyTypes: true` enforce?",
        "codeSnippet": "interface Config { timeout?: number; }\nconst c: Config = { timeout: undefined }; // Error with exactOptionalPropertyTypes!",
        "options": [
          "Forces all properties to be required",
          "Prevents optional properties on interfaces",
          "Differentiates between an optional property being omitted versus explicitly assigned `undefined`",
          "Deletes undefined properties at runtime"
        ],
        "correctAnswer": "Differentiates between an optional property being omitted versus explicitly assigned `undefined`",
        "explanation": "Without this flag, `timeout?: number` accepts both omitting the key and explicitly passing `timeout: undefined`. With it, you cannot pass `undefined` unless typed as `number | undefined`."
      },
      {
        "question": "Why is `exactOptionalPropertyTypes` critical when working with `Object.assign` or object spread?",
        "codeSnippet": "const defaults = { timeout: 5000 };\nconst overrides = { timeout: undefined };\nconst final = { ...defaults, ...overrides }; // final.timeout becomes undefined!",
        "options": [
          "Object spread crashes on undefined",
          "It reduces bundle size",
          "It prevents prototype pollution",
          "Explicitly passing `undefined` in object spreads overwrites default values, leading to subtle runtime bugs"
        ],
        "correctAnswer": "Explicitly passing `undefined` in object spreads overwrites default values, leading to subtle runtime bugs",
        "explanation": "Spreading `{ timeout: undefined }` overrides `{ timeout: 5000 }` with `undefined`. `exactOptionalPropertyTypes` catches this at compile time."
      },
      {
        "question": "What happens if a method marked with `override` has its corresponding method deleted from the base class?",
        "codeSnippet": "class Child extends Parent {\n  override calculate() {} // Base class removed calculate()\n}",
        "options": [
          "Compile error: This member cannot have an 'override' modifier because it is not declared in the base class",
          "It creates the method on the base class automatically",
          "It falls back to a warning",
          "It compiles cleanly"
        ],
        "correctAnswer": "Compile error: This member cannot have an 'override' modifier because it is not declared in the base class",
        "explanation": "The `override` modifier guarantees that a matching base method exists; if the base method is renamed or deleted, the compiler flags the orphan override."
      },
      {
        "question": "What flag warns when a variable or parameter is declared but never read?",
        "codeSnippet": "{\n  \"compilerOptions\": {\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true\n  }\n}",
        "options": [
          "`strictVariables`",
          "`noUnusedLocals` and `noUnusedParameters`",
          "`deadCodeElimination`",
          "`cleanScope`"
        ],
        "correctAnswer": "`noUnusedLocals` and `noUnusedParameters`",
        "explanation": "These flags flag unused local variables and function parameters to prevent dead code."
      }
    ]
  },
  {
    "title": "TypeScript: Monad & Functor Typing Patterns",
    "description": "Typing algebraic structures, Option/Maybe, Either, and higher-kinded type emulation.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What is a 'Functor' type signature in TypeScript?",
        "codeSnippet": "interface Functor<T> {\n  map<U>(fn: (val: T) => U): Functor<U>;\n}",
        "options": [
          "A function that returns another function",
          "A class that cannot have state",
          "A generic data container that implements a `.map()` method transforming wrapped value `T` to `U` while preserving the structure",
          "A mathematical formula in WebAssembly"
        ],
        "correctAnswer": "A generic data container that implements a `.map()` method transforming wrapped value `T` to `U` while preserving the structure",
        "explanation": "A Functor provides a `.map()` method that applies a function to its inner value and returns a new Functor wrapping the transformed value."
      },
      {
        "question": "How does a 'Monad' differ from a Functor in terms of its type signature?",
        "codeSnippet": "interface Monad<T> extends Functor<T> {\n  flatMap<U>(fn: (val: T) => Monad<U>): Monad<U>;\n}",
        "options": [
          "Monads can only wrap strings and numbers",
          "Monads cannot use `.map()`",
          "Monads are always asynchronous",
          "A Monad adds a `.flatMap()` (or `chain` / `bind`) method that takes a function returning another Monad and flattens nested Monad layers (`Monad<Monad<U>> -> Monad<U>`)"
        ],
        "correctAnswer": "A Monad adds a `.flatMap()` (or `chain` / `bind`) method that takes a function returning another Monad and flattens nested Monad layers (`Monad<Monad<U>> -> Monad<U>`)",
        "explanation": "Monads provide `flatMap` (or `bind`) to sequence operations that themselves return monadic containers without nesting."
      },
      {
        "question": "Why does TypeScript lack native Higher-Kinded Types (HKTs) like `F<T>` where `F` itself is generic?",
        "options": [
          "TypeScript type parameters can only represent concrete types, not unapplied type constructors like `type App<F, T> = F<T>`",
          "Because JavaScript does not have classes",
          "Because HKTs are patented",
          "Because V8 does not support generic closures"
        ],
        "correctAnswer": "TypeScript type parameters can only represent concrete types, not unapplied type constructors like `type App<F, T> = F<T>`",
        "explanation": "TypeScript cannot abstract over type constructors directly (e.g. `interface Monad<F<_>>` is invalid syntax)."
      },
      {
        "question": "How do functional libraries like `fp-ts` emulate Higher-Kinded Types (HKTs) in TypeScript?",
        "codeSnippet": "interface URItoKind<A> { 'Option': Option<A>; 'Either': Either<Error, A>; }\ntype Kind<URI extends keyof URItoKind<any>, A> = URItoKind<A>[URI];",
        "options": [
          "By modifying the TypeScript compiler AST",
          "Using defunctionalization via a global type URI registry interface that maps URI strings to concrete generic types",
          "Using eval statements",
          "By converting types to classes"
        ],
        "correctAnswer": "Using defunctionalization via a global type URI registry interface that maps URI strings to concrete generic types",
        "explanation": "Lightweight higher-kinded polymorphism defunctionalizes type constructors into string URI keys in an extensible interface dictionary."
      },
      {
        "question": "How is an `Option<T>` (or `Maybe<T>`) type typically declared using a discriminated union?",
        "codeSnippet": "type Option<T> =\n  | { readonly _tag: 'Some'; readonly value: T }\n  | { readonly _tag: 'None' };",
        "options": [
          "As `T | null`",
          "As `T?`",
          "As a discriminated union with `{ _tag: 'Some'; value: T } | { _tag: 'None' }`",
          "As an Array with 0 or 1 element"
        ],
        "correctAnswer": "As a discriminated union with `{ _tag: 'Some'; value: T } | { _tag: 'None' }`",
        "explanation": "A tagged union with `Some` and `None` variants explicitly models optionality in a purely functional, monad-compatible manner."
      }
    ]
  },
  {
    "title": "TypeScript: Asynchronous Iteration & Generator Types",
    "description": "Typing `Generator<T, TReturn, TNext>`, `AsyncGenerator`, and `AsyncIterable`.",
    "difficulty": "hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 12,
    "questions": [
      {
        "question": "What are the three generic parameters of the `Generator<T, TReturn, TNext>` type?",
        "codeSnippet": "function* counter(): Generator<number, string, boolean> { ... }",
        "options": [
          "`T` is input, `TReturn` is output, `TNext` is error",
          "`T` is initial, `TReturn` is intermediate, `TNext` is final",
          "`T` is memory, `TReturn` is thread, `TNext` is process",
          "`T` is yielded value type, `TReturn` is return value type, `TNext` is value type accepted by `.next(val)`"
        ],
        "correctAnswer": "`T` is yielded value type, `TReturn` is return value type, `TNext` is value type accepted by `.next(val)`",
        "explanation": "The `Generator` interface models yields (`T`), the final `return` value (`TReturn`), and values passed into `.next(val)` (`TNext`)."
      },
      {
        "question": "How do you type an async generator function that streams chunk objects?",
        "codeSnippet": "async function* streamChunks(): AsyncGenerator<Chunk, void, unknown> {\n  while (hasMore) {\n    yield await fetchChunk();\n  }\n}",
        "options": [
          "`AsyncGenerator<Chunk, void, unknown>`",
          "`Generator<Promise<Chunk>>`",
          "`AsyncStream<Chunk>`",
          "`Promise<Generator<Chunk>>`"
        ],
        "correctAnswer": "`AsyncGenerator<Chunk, void, unknown>`",
        "explanation": "`AsyncGenerator<YieldType, ReturnType, NextType>` correctly models asynchronous generator functions."
      },
      {
        "question": "What symbol key must an object implement to be consumed by a `for await (... of ...)` loop?",
        "codeSnippet": "const asyncIterable = {\n  [Symbol.asyncIterator]() { ... }\n};",
        "options": [
          "`[Symbol.iterator]`",
          "`[Symbol.asyncIterator]`",
          "`[Symbol.async]`",
          "`'asyncIterator'`"
        ],
        "correctAnswer": "`[Symbol.asyncIterator]`",
        "explanation": "JavaScript's `for await (const x of iterable)` consumes objects providing the `[Symbol.asyncIterator]()` method."
      },
      {
        "question": "What is the inferred return type of an `async` function without explicit annotation?",
        "codeSnippet": "async function fetchUser(id: string) {\n  return { id, name: 'Alex' };\n}",
        "options": [
          "`{ id: string; name: string }`",
          "`AsyncFunction`",
          "`Promise<{ id: string; name: string }>`",
          "`any`"
        ],
        "correctAnswer": "`Promise<{ id: string; name: string }>`",
        "explanation": "All `async` functions implicitly wrap their returned values in a `Promise<T>`."
      },
      {
        "question": "What does `yield*` delegate to when called inside a typed generator?",
        "codeSnippet": "function* sub(): Generator<number> { yield 1; }\nfunction* main(): Generator<number> { yield* sub(); }",
        "options": [
          "Executes the generator on another thread",
          "Converts values to promises",
          "Clones the generator",
          "Delegates yielding to another `Iterable` whose yielded type must be assignable to the current generator's yield type"
        ],
        "correctAnswer": "Delegates yielding to another `Iterable` whose yielded type must be assignable to the current generator's yield type",
        "explanation": "`yield*` delegates to another iterable, requiring its yielded types to conform to the outer generator's yield contract."
      }
    ]
  }
];
