/**
 * TypeScript Very Hard Challenge Pack
 * 20 Distinct Topic Quizzes x 5 Focused Practical Questions = 100 Questions Total
 * Answer distribution strictly balanced: 25 A, 25 B, 25 C, 25 D
 */

export const typescriptVeryHardQuizzes = [
  {
    "title": "TypeScript: Type-Level Arithmetic & Peano Numbers",
    "description": "Emulating addition, subtraction, multiplication, and comparisons using tuple length arithmetic.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "How is integer addition (`Add<A, B>`) typically implemented at the type level in TypeScript?",
        "codeSnippet": "type BuildTuple<L extends number, T extends any[] = []> =\n  T['length'] extends L ? T : BuildTuple<L, [...T, any]>;\ntype Add<A extends number, B extends number> =\n  [...BuildTuple<A>, ...BuildTuple<B>]['length'];\ntype Five = Add<2, 3>; // 5",
        "options": [
          "Constructing two tuples of lengths `A` and `B`, concatenating them with spread `[...TupleA, ...TupleB]`, and querying `['length']`",
          "Using JavaScript `+` operator in a type expression",
          "Using bitwise AND and XOR operators on numbers",
          "Calling `Math.add` in an ambient declaration"
        ],
        "correctAnswer": "Constructing two tuples of lengths `A` and `B`, concatenating them with spread `[...TupleA, ...TupleB]`, and querying `['length']`",
        "explanation": "Because TypeScript tuples track exact numerical literal lengths, tuple construction and concatenation provides a Peano arithmetic model at compile time."
      },
      {
        "question": "How do you implement type-level integer subtraction `Subtract<M, S>` (where M >= S)?",
        "codeSnippet": "type Subtract<M extends number, S extends number> =\n  BuildTuple<M> extends [...BuildTuple<S>, ...infer Rest]\n    ? Rest['length']\n    : never;\ntype Two = Subtract<5, 3>; // 2",
        "options": [
          "Subtracting lengths using `M - S`",
          "Matching `BuildTuple<M>` against `[...BuildTuple<S>, ...infer Rest]` and querying `Rest['length']`",
          "Popping elements in a while loop",
          "Inverting the sign bit of S"
        ],
        "correctAnswer": "Matching `BuildTuple<M>` against `[...BuildTuple<S>, ...infer Rest]` and querying `Rest['length']`",
        "explanation": "Matching the minuend tuple against a pattern containing the subtrahend tuple extracts the remaining difference in `Rest`."
      },
      {
        "question": "What is the primary practical limitation of tuple-length type-level arithmetic?",
        "options": [
          "Tuple arithmetic only works with negative numbers",
          "Tuple arithmetic requires WebAssembly",
          "TypeScript's instantiation depth and tuple size limits (typically capping operations around integers of ~1000 before TS2589 errors)",
          "It crashes the browser at runtime"
        ],
        "correctAnswer": "TypeScript's instantiation depth and tuple size limits (typically capping operations around integers of ~1000 before TS2589 errors)",
        "explanation": "Tuple length arithmetic cannot handle large numbers (e.g. 10,000+) due to compiler recursion and memory limits."
      },
      {
        "question": "How do you check if `A > B` at the type level?",
        "codeSnippet": "type GreaterThan<A extends number, B extends number> =\n  A extends B ? false :\n  BuildTuple<A> extends [...BuildTuple<B>, ...any[]] ? true : false;",
        "options": [
          "Use `A > B ? true : false`",
          "Compare string char codes",
          "Check if `Subtract<A, B>` is not never",
          "Check if `A extends B` (false); if `BuildTuple<A>` extends `[...BuildTuple<B>, ...any[]]`, then `A > B`"
        ],
        "correctAnswer": "Check if `A extends B` (false); if `BuildTuple<A>` extends `[...BuildTuple<B>, ...any[]]`, then `A > B`",
        "explanation": "If tuple `A` strictly contains tuple `B` with room to spare, `A` is strictly greater than `B`."
      },
      {
        "question": "How can type-level multiplication `Multiply<A, B>` be structured?",
        "codeSnippet": "type Multiply<A extends number, B extends number, Acc extends any[] = []> =\n  A extends 0 ? 0 :\n  BuildTuple<A> extends [any, ...infer Rest]\n    ? Multiply<Rest['length'], B, [...Acc, ...BuildTuple<B>]>\n    : Acc['length'];",
        "options": [
          "Repeated addition: recursively decrement `A` while accumulating `BuildTuple<B>` into an accumulator tuple",
          "Using `A * B`",
          "Multiplying matrix types",
          "Bit shifting numbers by 1"
        ],
        "correctAnswer": "Repeated addition: recursively decrement `A` while accumulating `BuildTuple<B>` into an accumulator tuple",
        "explanation": "Multiplication is computed as repeated addition across `A` recursion cycles."
      }
    ]
  },
  {
    "title": "TypeScript: Type-Level JSON Parser Implementation",
    "description": "Lexing and parsing JSON string literals into typed object and array representations.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "What are the two core phases of building a type-level JSON parser in TypeScript?",
        "codeSnippet": "type ParseJson<S extends string> = ParseValue<Tokenize<Trim<S>>>[0];",
        "options": [
          "Compilation and runtime evaluation via eval",
          "Tokenization (lexing the string literal into a tuple of tokens) and Parsing (recursively building AST/object types from the token stream)",
          "Hashing strings and looking up memory addresses",
          "Generating JSON schemas and validating via ajv"
        ],
        "correctAnswer": "Tokenization (lexing the string literal into a tuple of tokens) and Parsing (recursively building AST/object types from the token stream)",
        "explanation": "Complex type-level parsers mirror real compilers by separating tokenization (strings, colons, braces) from recursive descent parsing."
      },
      {
        "question": "How do you parse primitive literals like `true`, `false`, and `null` from JSON strings?",
        "codeSnippet": "type ParseLiteral<T extends string> =\n  T extends 'true' ? true :\n  T extends 'false' ? false :\n  T extends 'null' ? null : never;",
        "options": [
          "Calling `JSON.parse` at compile time",
          "Using RegExp type operators",
          "Using pattern-matching conditional types that map token strings directly to their corresponding TS primitive types",
          "Through ambient class constructors"
        ],
        "correctAnswer": "Using pattern-matching conditional types that map token strings directly to their corresponding TS primitive types",
        "explanation": "Literal tokens like `'true'` are recognized by simple conditional equality and resolved to the boolean literal `true`."
      },
      {
        "question": "How are JSON object key-value pairs parsed from `{ \"key\": \"val\" }`?",
        "options": [
          "Split string by comma and convert to tuple",
          "Use `Object.entries`",
          "Cast directly with `as object`",
          "Consume string token as key, match `:` token, parse value recursively, and recurse until matching `}`"
        ],
        "correctAnswer": "Consume string token as key, match `:` token, parse value recursively, and recurse until matching `}`",
        "explanation": "Recursive descent consumption handles key, separator, value, and closing delimiter statefully."
      },
      {
        "question": "What TypeScript 4.8 feature drastically simplified parsing numeric tokens in type-level JSON?",
        "codeSnippet": "type ParseNumber<S extends string> = S extends `${infer N extends number}` ? N : never;",
        "options": [
          "Infer type constraints in template literal types (`infer N extends number`)",
          "The `parseInt` type operator",
          "Numeric enums",
          "BigInt type operators"
        ],
        "correctAnswer": "Infer type constraints in template literal types (`infer N extends number`)",
        "explanation": "TS 4.8 enabled direct string-to-number inference without requiring manual digit parsing tables."
      },
      {
        "question": "What is a major architectural hurdle when implementing type-level JSON parsing?",
        "options": [
          "TypeScript cannot compare string characters",
          "Compiler recursion depth exhaustion on long strings and complex nested objects",
          "Strings cannot be passed to type parameters",
          "JSON keys cannot contain underscores"
        ],
        "correctAnswer": "Compiler recursion depth exhaustion on long strings and complex nested objects",
        "explanation": "Character-by-character tokenization consumes recursion frames rapidly, necessitating tail-recursive accumulation."
      }
    ]
  },
  {
    "title": "TypeScript: Type-Level SQL/GraphQL Query Parser",
    "description": "Extracting selected columns, where clauses, and schema validation from query string literals.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "How do libraries like `ts-sql` or Prisma typed SQL extract selected columns from `SELECT id, name FROM users`?",
        "codeSnippet": "type Query = 'SELECT id, name FROM users';\ntype ExtractCols<Q extends string> =\n  Q extends `SELECT ${infer Cols} FROM ${string}` ? Split<Trim<Cols>, ','> : never;",
        "options": [
          "Executing the query against a local SQLite database during compilation",
          "Calling Node.js child process from the type checker",
          "Pattern matching on ``` `SELECT ${infer Cols} FROM ${infer Table}` ``` and splitting the column strings into a tuple of literal keys",
          "Using regex capture groups in tsconfig"
        ],
        "correctAnswer": "Pattern matching on ``` `SELECT ${infer Cols} FROM ${infer Table}` ``` and splitting the column strings into a tuple of literal keys",
        "explanation": "Template literal matching decomposes the SQL statement structure and extracts the column projection at compile time."
      },
      {
        "question": "How is the extracted column tuple mapped against a database schema type `Schema['users']`?",
        "codeSnippet": "type Schema = { users: { id: number; name: string; email: string } };\ntype Result<Cols extends (keyof Schema['users'])[]> = Pick<Schema['users'], Cols[number]>;",
        "options": [
          "Writing a SQL JOIN in TypeScript",
          "Generating a GraphQL schema file",
          "Using `Object.assign`",
          "Converting the column tuple into a union via `Cols[number]` and using `Pick<TableSchema, Cols[number]>`"
        ],
        "correctAnswer": "Converting the column tuple into a union via `Cols[number]` and using `Pick<TableSchema, Cols[number]>`",
        "explanation": "`Pick<TableSchema, Cols[number]>` selects exactly the queried columns with their statically verified types."
      },
      {
        "question": "How can a type-level parser handle `SELECT *`?",
        "codeSnippet": "type HandleStar<Cols extends string, Table> = Cols extends '*' ? Table : Pick<Table, ...>;",
        "options": [
          "Branching: if `Cols` is `'*'`, return the entire table schema type without filtering",
          "Looping through all tables in the database",
          "Returning `any`",
          "`*` cannot be handled in type systems"
        ],
        "correctAnswer": "Branching: if `Cols` is `'*'`, return the entire table schema type without filtering",
        "explanation": "A simple conditional check for `'*'` resolves to the complete unabridged table shape."
      },
      {
        "question": "How do typed GraphQL document parsers type query variables like `$id: ID!`?",
        "options": [
          "They fetch the GraphQL introspection schema at runtime",
          "Template literal matching parses variable definitions into a record mapping variable names to their corresponding TS types (`string`)",
          "They compile queries into Apollo Client classes",
          "They require TypeScript decorators"
        ],
        "correctAnswer": "Template literal matching parses variable definitions into a record mapping variable names to their corresponding TS types (`string`)",
        "explanation": "Variable signatures are parsed from the query string and mapped to TS primitives (e.g. `ID!` -> `string`, `Int!` -> `number`)."
      },
      {
        "question": "What error should a typed query parser generate if a queried column does not exist on the table schema?",
        "options": [
          "It ignores the column silently",
          "It emits `undefined` in the database",
          "Type error: Type '\"non_existent\"' is not assignable to type 'keyof UsersTable'",
          "It crashes the compiler with a segmentation fault"
        ],
        "correctAnswer": "Type error: Type '\"non_existent\"' is not assignable to type 'keyof UsersTable'",
        "explanation": "Constraining column names against `keyof TableSchema` flags misspelled SQL columns before code ever runs."
      }
    ]
  },
  {
    "title": "TypeScript: Invariant Type Positions & Phantom Types",
    "description": "Controlling variance, phantom type parameters, and enforcing exact type invariance.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "What is an 'invariant' type parameter in TypeScript?",
        "options": [
          "A type parameter that cannot be changed once initialized",
          "A type parameter that only accepts primitives",
          "A type parameter that defaults to `any`",
          "A type parameter that is NEITHER covariant nor contravariant: `Box<A>` is assignable to `Box<B>` IF AND ONLY IF `A` and `B` are exactly identical"
        ],
        "correctAnswer": "A type parameter that is NEITHER covariant nor contravariant: `Box<A>` is assignable to `Box<B>` IF AND ONLY IF `A` and `B` are exactly identical",
        "explanation": "Invariance rejects both subtyping directions; types must match identically to be assignable."
      },
      {
        "question": "How do you force a type parameter `T` to be strictly invariant using structural typing tricks?",
        "codeSnippet": "type Invariant<T> = { get: () => T; set: (val: T) => void };",
        "options": [
          "Placing `T` in BOTH a covariant position (getter/return value) AND a contravariant position (setter/parameter)",
          "Marking `T` with `readonly`",
          "Using `T & never`",
          "Setting `invariant: true` in tsconfig"
        ],
        "correctAnswer": "Placing `T` in BOTH a covariant position (getter/return value) AND a contravariant position (setter/parameter)",
        "explanation": "Occupying both output (covariant) and input (contravariant) positions forces the type parameter into strict invariance."
      },
      {
        "question": "What is a 'phantom type' in TypeScript?",
        "codeSnippet": "interface FormData<State> {\n  data: Record<string, string>;\n  readonly _state?: State; // Never actually exists at runtime!\n}",
        "options": [
          "A type that disappears when exported",
          "A type parameter that appears in the type declaration but is never used in actual runtime instance values, serving solely as a compile-time state tag",
          "A type that can only be accessed inside closures",
          "A deprecated type alias"
        ],
        "correctAnswer": "A type parameter that appears in the type declaration but is never used in actual runtime instance values, serving solely as a compile-time state tag",
        "explanation": "Phantom types use unused generic parameters to track state transitions (e.g. `Validated` vs `Unvalidated`) without runtime overhead."
      },
      {
        "question": "How does TypeScript 4.7's `in out` annotation explicitly declare an invariant type parameter?",
        "codeSnippet": "interface StateMachine<in out T> {\n  // ...\n}",
        "options": [
          "Writing `invariant T`",
          "Writing `inout T`",
          "Combining both `in` (contravariant) and `out` (covariant) markers on the type parameter declaration",
          "Writing `<T = invariant>`"
        ],
        "correctAnswer": "Combining both `in` (contravariant) and `out` (covariant) markers on the type parameter declaration",
        "explanation": "`in out T` explicitly declares that `T` is invariant, avoiding compiler heuristics."
      },
      {
        "question": "Why is invariance essential when modeling mutable reference cells (like `Ref<T>`)?",
        "codeSnippet": "class Ref<T> { value: T; constructor(v: T) { this.value = v; } }",
        "options": [
          "Because mutable objects cannot be passed across threads",
          "Because V8 crashes on covariant references",
          "It is not essential; mutable cells can safely be covariant",
          "If `Ref<Dog>` were assignable to `Ref<Animal>`, you could write a `Cat` into it via `refAnimal.value = new Cat()`, breaking `Ref<Dog>`'s type safety"
        ],
        "correctAnswer": "If `Ref<Dog>` were assignable to `Ref<Animal>`, you could write a `Cat` into it via `refAnimal.value = new Cat()`, breaking `Ref<Dog>`'s type safety",
        "explanation": "Mutable containers must be invariant to prevent writing incompatible subtypes into a shared reference."
      }
    ]
  },
  {
    "title": "TypeScript: Union Permutation & Combinations at Type Level",
    "description": "Generating all permutations and combinations of union members at compile time.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "How do you generate all permutations of a union `'A' | 'B' | 'C'` as tuples?",
        "codeSnippet": "type Permutations<T, K = T> =\n  [T] extends [never] ? [] :\n  K extends K\n    ? [K, ...Permutations<Exclude<T, K>>]\n    : never;\ntype Res = Permutations<'A' | 'B'>; // ['A', 'B'] | ['B', 'A']",
        "options": [
          "Distribute over `K extends K` to select a lead element, and recursively concatenate with permutations of `Exclude<T, K>`",
          "Convert union to an array and call `.sort()`",
          "Use the `Permutation` built-in utility type",
          "Use a bitmask over union length"
        ],
        "correctAnswer": "Distribute over `K extends K` to select a lead element, and recursively concatenate with permutations of `Exclude<T, K>`",
        "explanation": "By distributing each candidate `K` and recursing on the remaining excluded elements, all factorial permutations are generated as a union of tuples."
      },
      {
        "question": "Why is `[T] extends [never]` used as the base case check instead of `T extends never`?",
        "options": [
          "Because square brackets make types run faster",
          "Because `T extends never` would distribute over `never` (the empty union), immediately returning `never` rather than the base case `[]`",
          "Because `never` cannot be compared directly",
          "To convert `T` into an array"
        ],
        "correctAnswer": "Because `T extends never` would distribute over `never` (the empty union), immediately returning `never` rather than the base case `[]`",
        "explanation": "Naked `T extends never` distributes zero times on an empty union, yielding `never`. Boxing `[T]` prevents distribution and safely hits the `[]` base case."
      },
      {
        "question": "What is the computational complexity of generating permutations for a union of size N?",
        "options": [
          "O(N) linear",
          "O(N^2) quadratic",
          "O(N!) factorial: a union of 5 elements generates 120 branches; 6 elements generates 720, rapidly hitting compiler depth limits",
          "O(log N)"
        ],
        "correctAnswer": "O(N!) factorial: a union of 5 elements generates 120 branches; 6 elements generates 720, rapidly hitting compiler depth limits",
        "explanation": "Factorial growth makes union permutation dangerous for unions with more than 4 or 5 items."
      },
      {
        "question": "How do you generate power sets (all combinations) of union elements?",
        "options": [
          "Use Cartesian multiplication",
          "Using template literal types",
          "Using bitwise AND",
          "For each element, branch into two paths: one including the element in the result tuple, and one omitting it, recursing on the remainder"
        ],
        "correctAnswer": "For each element, branch into two paths: one including the element in the result tuple, and one omitting it, recursing on the remainder",
        "explanation": "Branching on whether to include or exclude each element generates the 2^N subset combinations."
      },
      {
        "question": "What is a practical use case for type-level union permutations?",
        "options": [
          "Validating exhaustive command-line CLI flag combinations, CSS property shorthands, or matrix transformation orders",
          "Sorting array items in memory",
          "Generating random numbers",
          "Encrypting user passwords"
        ],
        "correctAnswer": "Validating exhaustive command-line CLI flag combinations, CSS property shorthands, or matrix transformation orders",
        "explanation": "Permutation types ensure that multi-attribute declarations satisfy all required arguments in any valid order."
      }
    ]
  },
  {
    "title": "TypeScript: Inverted Index Types & Bi-directional Mapping",
    "description": "Inverting key-value records and typing bidirectional mappings.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "How do you invert an object type so its values become keys and keys become values?",
        "codeSnippet": "type Invert<T extends Record<string, string>> = {\n  [K in keyof T as T[K]]: K;\n};\ntype Original = { a: '1'; b: '2' };\ntype Inverted = Invert<Original>; // { '1': 'a'; '2': 'b' }",
        "options": [
          "Writing `type Invert<T> = T['reverse']`",
          "Using key remapping `[K in keyof T as T[K]]: K;`",
          "Using `Object.entries(T).map(...)`",
          "Using `InvertRecord<T>`"
        ],
        "correctAnswer": "Using key remapping `[K in keyof T as T[K]]: K;`",
        "explanation": "Key remapping with `as T[K]` positions the original property value as the new key name, mapping it to the original key `K`."
      },
      {
        "question": "What happens if multiple keys share the exact same value in the original object during inversion?",
        "codeSnippet": "type Dup = { a: 'same'; b: 'same' };\ntype Inverted = Invert<Dup>;",
        "options": [
          "The compiler throws a Duplicate Key error",
          "One key overwrites the other unpredictably",
          "The duplicate keys combine into a union: `{ same: 'a' | 'b' }`",
          "The resulting type is `never`"
        ],
        "correctAnswer": "The duplicate keys combine into a union: `{ same: 'a' | 'b' }`",
        "explanation": "When multiple properties remap to the identical key name, TypeScript unions their mapped values (`'a' | 'b'`)."
      },
      {
        "question": "What constraint must be placed on values of `T` for `[K in keyof T as T[K]]` to be valid?",
        "options": [
          "Values must be numbers only",
          "Values must be boolean",
          "Values must be classes",
          "Values must extend `PropertyKey` (`string | number | symbol`) because object keys can only be property keys"
        ],
        "correctAnswer": "Values must extend `PropertyKey` (`string | number | symbol`) because object keys can only be property keys",
        "explanation": "Object keys in JavaScript and TypeScript can only be strings, numbers, or symbols (`PropertyKey`)."
      },
      {
        "question": "How do you type a bidirectional map class that supports lookups in both directions?",
        "codeSnippet": "class BiMap<F extends Record<string, string>> {\n  getForward<K extends keyof F>(key: K): F[K] { ... }\n  getReverse<V extends F[keyof F]>(val: V): Invert<F>[V] { ... }\n}",
        "options": [
          "Define forward lookups via `F[K]` and reverse lookups via `Invert<F>[V]`",
          "Create two separate arrays",
          "Use a double-ended queue type",
          "Use `any` for reverse lookups"
        ],
        "correctAnswer": "Define forward lookups via `F[K]` and reverse lookups via `Invert<F>[V]`",
        "explanation": "Pairing the forward type `F` with its computed inverse `Invert<F>` guarantees bidirectional type safety."
      },
      {
        "question": "What is `PropertyKey` in TypeScript?",
        "options": [
          "A private key in cryptography",
          "A built-in global type alias for `string | number | symbol`",
          "An interface for DOM properties",
          "A keyword in ES2024"
        ],
        "correctAnswer": "A built-in global type alias for `string | number | symbol`",
        "explanation": "`PropertyKey` is the standard library type representing all allowable object property key types."
      }
    ]
  },
  {
    "title": "TypeScript: Deep Path Extraction & Dot-Notation Key Resolvers (`DeepPath<T>`)",
    "description": "Type-level dot notation paths (`'user.address.street'`) and nested property value extraction.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "How do you extract all valid nested dot-notation paths of an object type?",
        "codeSnippet": "type Paths<T> = T extends object ? {\n  [K in keyof T]: K extends string\n    ? `${K}` | `${K}.${Paths<T[K]>}`\n    : never;\n}[keyof T] : never;",
        "options": [
          "Call `Object.keys(T).join('.')`",
          "Use `T.toPathArray()`",
          "Recursively map over keys, constructing template strings `${K}` and `${K}.${Paths<T[K]>}`, indexed by `[keyof T]`",
          "Use `Record<string, Path>`"
        ],
        "correctAnswer": "Recursively map over keys, constructing template strings `${K}` and `${K}.${Paths<T[K]>}`, indexed by `[keyof T]`",
        "explanation": "Constructing union template literals of each key combined with recursive paths yields all valid dot-separated paths."
      },
      {
        "question": "How do you retrieve the value type at a deep dot-notation path (`Get<T, 'a.b.c'>`)?",
        "codeSnippet": "type Get<T, P extends string> =\n  P extends `${infer Key}.${infer Rest}`\n    ? Key extends keyof T ? Get<T[Key], Rest> : never\n    : P extends keyof T ? T[P] : never;",
        "options": [
          "Use `eval(P)`",
          "Index `T[P]` directly",
          "Use `lodash.get` type helper",
          "Split path at the first dot using template infer `${infer Key}.${infer Rest}`, index `T[Key]`, and recurse with `Rest`"
        ],
        "correctAnswer": "Split path at the first dot using template infer `${infer Key}.${infer Rest}`, index `T[Key]`, and recurse with `Rest`",
        "explanation": "Iteratively decomposing the dot-notation path into `Key` and `Rest` traverses the object tree until the leaf property type is reached."
      },
      {
        "question": "What should `Paths<T>` do when encountering an array property like `tags: string[]`?",
        "options": [
          "Represent array indices either with `${number}` (e.g. `tags.${number}`) or exclude array methods like `push` and `slice`",
          "Crashes the compiler",
          "Maps to `never`",
          "Converts array into a tuple of 100 items"
        ],
        "correctAnswer": "Represent array indices either with `${number}` (e.g. `tags.${number}`) or exclude array methods like `push` and `slice`",
        "explanation": "Arrays must be specially handled to avoid listing all array prototype methods as object path properties."
      },
      {
        "question": "Why is an internal depth limiter recommended when generating `Paths<T>` for complex enterprise models?",
        "options": [
          "To speed up browser load times",
          "Circular or deeply nested references trigger combinatorial explosions and compiler errors (TS2589)",
          "TypeScript bans paths deeper than 3 levels",
          "To reduce JSON file size"
        ],
        "correctAnswer": "Circular or deeply nested references trigger combinatorial explosions and compiler errors (TS2589)",
        "explanation": "Deep or self-referential schemas can produce infinite path combinations, requiring recursion depth counters."
      },
      {
        "question": "How does a typed `get(obj, path)` function benefit from `Get<T, P>`?",
        "codeSnippet": "function get<T, P extends Paths<T>>(obj: T, path: P): Get<T, P>;",
        "options": [
          "It converts paths into SQL queries",
          "It eliminates the need for runtime lodash code",
          "The IDE autocompletes all valid nested property paths and automatically infers the exact return type at that path",
          "It freezes the returned object"
        ],
        "correctAnswer": "The IDE autocompletes all valid nested property paths and automatically infers the exact return type at that path",
        "explanation": "Pairing `Paths<T>` with `Get<T, P>` delivers full compile-time autocomplete and return-type verification."
      }
    ]
  },
  {
    "title": "TypeScript: State Machine Transitions at Type Level",
    "description": "Finite state machine encoding, valid transition tables, and illegal transition rejection.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "How can valid state machine transitions be enforced at the type level?",
        "codeSnippet": "type Transitions = {\n  idle: 'loading';\n  loading: 'success' | 'error';\n  success: 'idle';\n  error: 'idle';\n};\nfunction transition<Current extends keyof Transitions>(curr: Current, next: Transitions[Current]): Transitions[Current] { ... }",
        "options": [
          "Using a runtime switch statement",
          "Using boolean flags for each state",
          "Checking states with regex",
          "Representing state transitions in a mapping type and constraining `next` to `Transitions[Current]`"
        ],
        "correctAnswer": "Representing state transitions in a mapping type and constraining `next` to `Transitions[Current]`",
        "explanation": "A transition record maps each state to its allowed destination states, making illegal transitions a compile error."
      },
      {
        "question": "What error occurs if you call `transition('idle', 'success')` in the snippet above?",
        "options": [
          "Argument of type '\"success\"' is not assignable to parameter of type '\"loading\"'",
          "InvalidStateTransitionException at runtime",
          "Warning: Unknown transition",
          "It compiles but returns error"
        ],
        "correctAnswer": "Argument of type '\"success\"' is not assignable to parameter of type '\"loading\"'",
        "explanation": "Because `Transitions['idle']` is only `'loading'`, passing `'success'` is rejected at compile time."
      },
      {
        "question": "How do you associate specific payloads with specific states in a typed state machine?",
        "codeSnippet": "type State =\n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'success'; data: User[] }\n  | { status: 'error'; error: Error };",
        "options": [
          "Using global variables",
          "Using a discriminated union where each `status` variant holds its unique associated payload properties",
          "Storing all payloads on a single optional object",
          "Using JSON schemas"
        ],
        "correctAnswer": "Using a discriminated union where each `status` variant holds its unique associated payload properties",
        "explanation": "Discriminated unions ensure that payload properties (`data`, `error`) only exist when the corresponding status is active."
      },
      {
        "question": "How can actions trigger state transitions with strictly validated payload types?",
        "codeSnippet": "type Event =\n  | { type: 'FETCH' }\n  | { type: 'RESOLVE'; payload: User[] }\n  | { type: 'REJECT'; error: Error };",
        "options": [
          "Using Redux thunks",
          "Using event emitters without type parameters",
          "Typing events as a discriminated union and writing a reducer function `(state: State, event: Event) => State`",
          "Dispatching strings directly"
        ],
        "correctAnswer": "Typing events as a discriminated union and writing a reducer function `(state: State, event: Event) => State`",
        "explanation": "Pairing a state discriminated union with an event discriminated union provides complete type safety for state management."
      },
      {
        "question": "Can XState machine configurations be fully type-inferred using TypeScript?",
        "options": [
          "No, XState requires code generators",
          "Only in Node.js",
          "Only with class components",
          "Yes, modern XState (v5) uses deep type-level inference and setup utilities to infer state, context, and event transitions without manual generics"
        ],
        "correctAnswer": "Yes, modern XState (v5) uses deep type-level inference and setup utilities to infer state, context, and event transitions without manual generics",
        "explanation": "XState v5 was redesigned around TypeScript's advanced type inference, automatically typing state transitions and context."
      }
    ]
  },
  {
    "title": "TypeScript: Heterogeneous Deep Diff & Patch Types",
    "description": "Computing type diffs between two shapes and typing structural patch operations.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "What is a `Diff<Old, New>` object type intended to represent?",
        "codeSnippet": "type UserV1 = { id: string; name: string; age: number };\ntype UserV2 = { id: string; name: string; email: string };\ntype Delta = Diff<UserV1, UserV2>; // { added: { email: string }, removed: { age: number } }",
        "options": [
          "A type that isolates properties added, modified, or removed between two versions of an object schema",
          "A Git diff patch file string",
          "A boolean indicating if objects are equal",
          "A runtime patch function"
        ],
        "correctAnswer": "A type that isolates properties added, modified, or removed between two versions of an object schema",
        "explanation": "Type-level diffing partitions keys into added, removed, and updated buckets using key exclusion and mapped types."
      },
      {
        "question": "How do you extract properties that exist in `New` but are completely absent in `Old`?",
        "codeSnippet": "type AddedProps<Old, New> = Pick<New, Exclude<keyof New, keyof Old>>;",
        "options": [
          "`Omit<New, keyof Old>`",
          "`Pick<New, Exclude<keyof New, keyof Old>>`",
          "`New - Old`",
          "`keyof New & keyof Old`"
        ],
        "correctAnswer": "`Pick<New, Exclude<keyof New, keyof Old>>`",
        "explanation": "Excluding `keyof Old` from `keyof New` yields only the newly introduced property keys."
      },
      {
        "question": "How do you extract properties that exist in both objects but have changed types?",
        "codeSnippet": "type ModifiedProps<Old, New> = {\n  [K in keyof Old & keyof New as Old[K] extends New[K] ? never : K]: {\n    from: Old[K];\n    to: New[K];\n  };\n};",
        "options": [
          "Compare `typeof Old === typeof New`",
          "Use JSON diffing at compile time",
          "Iterate over common keys `keyof Old & keyof New`, remapping to `never` if types match, otherwise outputting `{ from: Old[K]; to: New[K] }`",
          "Set changed keys to `any`"
        ],
        "correctAnswer": "Iterate over common keys `keyof Old & keyof New`, remapping to `never` if types match, otherwise outputting `{ from: Old[K]; to: New[K] }`",
        "explanation": "Filtering out unchanged properties via `Old[K] extends New[K] ? never : K` highlights specifically the altered fields."
      },
      {
        "question": "How is an RFC 6902 JSON Patch operation typed in TypeScript?",
        "codeSnippet": "type PatchOp<T> =\n  | { op: 'add' | 'replace'; path: Paths<T>; value: any }\n  | { op: 'remove'; path: Paths<T> };",
        "options": [
          "As a single string command",
          "As an Array of numbers",
          "As a binary buffer",
          "As a discriminated union keyed on `op: 'add' | 'remove' | 'replace'` with path typed via `Paths<T>`"
        ],
        "correctAnswer": "As a discriminated union keyed on `op: 'add' | 'remove' | 'replace'` with path typed via `Paths<T>`",
        "explanation": "Discriminated unions model standard JSON Patch structures while validating target paths against the subject type."
      },
      {
        "question": "Can a type-level patch function `ApplyPatch<Original, Patch>` reconstruct the updated type?",
        "options": [
          "Yes, combining `Omit` for removals and deep merges for additions/modifications can compute the resulting type at compile time",
          "No, types cannot be patched dynamically",
          "Only if the patch has no add operations",
          "Only in WebAssembly modules"
        ],
        "correctAnswer": "Yes, combining `Omit` for removals and deep merges for additions/modifications can compute the resulting type at compile time",
        "explanation": "By modeling deletions via `Omit` and replacements via mapped overrides, the resultant patched type is fully computable."
      }
    ]
  },
  {
    "title": "TypeScript: Curried Function Inference with Placeholder Parameters",
    "description": "Ramda/Lodash-style placeholder typing (`__`) for partial application in arbitrary argument positions.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "What is the purpose of a placeholder parameter (e.g. `R.__`) in functional programming libraries?",
        "codeSnippet": "const divide = (a: number, b: number) => a / b;\nconst half = curry(divide)(R.__, 2); // half(10) === 5",
        "options": [
          "Generates a random parameter value",
          "Allows callers to skip an argument position during partial application, leaving it open to be supplied by subsequent calls",
          "Skips execution of the function",
          "Converts the argument to undefined"
        ],
        "correctAnswer": "Allows callers to skip an argument position during partial application, leaving it open to be supplied by subsequent calls",
        "explanation": "Placeholders allow partial application of later arguments while leaving earlier argument positions unbound."
      },
      {
        "question": "How is a placeholder represented at the type level in TypeScript?",
        "codeSnippet": "declare const __: unique symbol;\ntype Placeholder = typeof __;",
        "options": [
          "The string `'__'`",
          "The number `-1`",
          "A `unique symbol` type (or specific branded symbol) that identifies placeholder tokens",
          "`null`"
        ],
        "correctAnswer": "A `unique symbol` type (or specific branded symbol) that identifies placeholder tokens",
        "explanation": "A nominal `unique symbol` prevents ordinary values from accidentally matching the placeholder slot."
      },
      {
        "question": "How does the return signature handle arguments when a placeholder is passed in position 0?",
        "codeSnippet": "type ResolveArgs<Params, Args> = ...",
        "options": [
          "It permanently sets parameter 0 to `never`",
          "It throws a compile error",
          "It fills parameter 0 with `any`",
          "It retains parameter 0 in the expected parameter tuple of the returned curried function"
        ],
        "correctAnswer": "It retains parameter 0 in the expected parameter tuple of the returned curried function",
        "explanation": "Any position supplied with a placeholder remains in the parameter list of the returned function."
      },
      {
        "question": "Why is typing placeholder currying considered one of the hardest problems in TypeScript type gymnastics?",
        "options": [
          "Combinatorial permutations: each argument position can be a real value or a placeholder, creating 2^N signature permutations",
          "TypeScript forbids symbols in tuple types",
          "Currying requires runtime compilation in V8",
          "Function arity cannot be queried in TypeScript"
        ],
        "correctAnswer": "Combinatorial permutations: each argument position can be a real value or a placeholder, creating 2^N signature permutations",
        "explanation": "Arbitrary placeholder placement requires recursive tuple reconstruction across exponential combination spaces."
      },
      {
        "question": "How do production libraries like `ts-toolbelt` implement placeholder-aware currying without hitting depth limits?",
        "options": [
          "Using `any` for all curried calls",
          "Using iterative tail-call recursive tuple builders with bounded parameter limit lookup tables (typically up to 6 parameters)",
          "Generating external C++ code",
          "Using JavaScript eval"
        ],
        "correctAnswer": "Using iterative tail-call recursive tuple builders with bounded parameter limit lookup tables (typically up to 6 parameters)",
        "explanation": "Precomputed lookup tables and tail-recursive accumulators keep compilation fast for realistic function arities."
      }
    ]
  },
  {
    "title": "TypeScript: Variadic Tuple Extraction & Compiler Tail Recursion Limits",
    "description": "Pushing the limits of recursive tuple evaluation, chunking, and recursion depth avoidance.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "What is the standard instantiation depth limit for non-tail-recursive conditional types in TypeScript?",
        "options": [
          "Exactly 5 frames",
          "1,000,000 frames",
          "Approximately 50 to 100 recursion frames",
          "Unlimited"
        ],
        "correctAnswer": "Approximately 50 to 100 recursion frames",
        "explanation": "Non-tail-recursive types hit error TS2589 ('instantiation is excessively deep') around depth 50–100."
      },
      {
        "question": "How high can tail-recursive conditional types recurse in TypeScript 4.5+ before hitting limits?",
        "options": [
          "Only 10 steps",
          "Exactly 100,000 steps",
          "Tail recursion has no effect in TypeScript",
          "Around 1,000 recursive steps"
        ],
        "correctAnswer": "Around 1,000 recursive steps",
        "explanation": "TS 4.5's tail-recursion elimination raises the ceiling by roughly an order of magnitude (from ~100 to ~1000)."
      },
      {
        "question": "What is 'chunking' or 'accumulator branching' when processing very long tuple types?",
        "codeSnippet": "type Chunk<T extends any[]> =\n  T extends [any, any, any, any, any, ...infer Rest] ? ... : ...;",
        "options": [
          "Consuming multiple elements (e.g. 5 or 10 elements) in a single recursion step to reduce overall recursion frame count by 5x or 10x",
          "Splitting files into smaller chunks on disk",
          "Using `ArrayBuffer` chunks in Web Workers",
          "Compiling to WebAssembly chunks"
        ],
        "correctAnswer": "Consuming multiple elements (e.g. 5 or 10 elements) in a single recursion step to reduce overall recursion frame count by 5x or 10x",
        "explanation": "Deconstructing multiple tuple elements per step reduces total recursion steps, allowing processing of larger tuples."
      },
      {
        "question": "Why must accumulator types be placed in a default type parameter?",
        "codeSnippet": "type Repeat<N extends number, T, Acc extends any[] = []> = ...",
        "options": [
          "Default parameters run faster",
          "Callers do not have to provide the accumulator at the call site, allowing clean public APIs while retaining internal state",
          "TypeScript requires all parameters to have defaults",
          "Accumulators can only be arrays"
        ],
        "correctAnswer": "Callers do not have to provide the accumulator at the call site, allowing clean public APIs while retaining internal state",
        "explanation": "Default parameters keep internal state hidden from consumers (`Repeat<5, string>` instead of `Repeat<5, string, []>`)."
      },
      {
        "question": "What happens if a recursive type violates the tail position rule by wrapping the recursive call?",
        "codeSnippet": "// Not in tail position:\ntype Bad<T> = T extends [infer H, ...infer R] ? [H, ...Bad<R>] : [];",
        "options": [
          "The compiler crashes",
          "It compiles as `any`",
          "TypeScript cannot optimize the call, falling back to the strict ~50 frame recursion depth limit and triggering TS2589",
          "It runs at runtime instead"
        ],
        "correctAnswer": "TypeScript cannot optimize the call, falling back to the strict ~50 frame recursion depth limit and triggering TS2589",
        "explanation": "Because `[H, ...Bad<R>]` wraps the recursive call in another tuple constructor, it cannot be tail-call optimized."
      }
    ]
  },
  {
    "title": "TypeScript: Abstract Syntax Tree (AST) Type-Level Evaluation",
    "description": "Evaluating simple programming languages and mathematical expressions at compile time.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "How do you represent an AST node at the type level in TypeScript?",
        "codeSnippet": "type ASTNode =\n  | { type: 'BinaryExpr'; op: '+' | '-'; left: ASTNode; right: ASTNode }\n  | { type: 'NumericLiteral'; value: number };",
        "options": [
          "Using class constructors with prototype chains",
          "Using JSON schemas",
          "Using string comments",
          "Using recursive discriminated unions describing node types, operators, and child branches"
        ],
        "correctAnswer": "Using recursive discriminated unions describing node types, operators, and child branches",
        "explanation": "Recursive tagged unions cleanly model tree structures like AST expressions and syntax trees."
      },
      {
        "question": "How is an interpreter `Evaluate<Node>` written for the AST above?",
        "codeSnippet": "type Evaluate<N extends ASTNode> =\n  N extends { type: 'NumericLiteral' } ? N['value'] :\n  N extends { type: 'BinaryExpr'; op: '+' } ? Add<Evaluate<N['left']>, Evaluate<N['right']>> :\n  never;",
        "options": [
          "Pattern match on `N['type']` and recursively evaluate child nodes, delegating operators to type-level arithmetic helpers",
          "Use `eval()` in a type declaration",
          "Convert nodes to JavaScript strings",
          "Compile to WebAssembly"
        ],
        "correctAnswer": "Pattern match on `N['type']` and recursively evaluate child nodes, delegating operators to type-level arithmetic helpers",
        "explanation": "Recursive evaluation processes tree nodes post-order, computing compound results statically."
      },
      {
        "question": "What allows TypeScript to evaluate a Lisp-style S-expression like `'(+ 1 2)'` at compile time?",
        "options": [
          "The TypeScript compiler embeds a Lisp runtime",
          "A tokenizer parses parentheses and numbers into nested AST tuples, and an evaluator recursively reduces the AST",
          "Node.js runs an external lisp interpreter",
          "Macro expansion in tsconfig"
        ],
        "correctAnswer": "A tokenizer parses parentheses and numbers into nested AST tuples, and an evaluator recursively reduces the AST",
        "explanation": "Combining string tokenization with recursive tuple evaluation allows full compile-time language interpreters."
      },
      {
        "question": "What is the theoretical computational capability of TypeScript's type system?",
        "options": [
          "Finite state automata (regular languages only)",
          "Context-free grammar only",
          "Turing-complete: it can simulate any computation that a Turing machine can perform (subject to memory/depth constraints)",
          "Non-computable"
        ],
        "correctAnswer": "Turing-complete: it can simulate any computation that a Turing machine can perform (subject to memory/depth constraints)",
        "explanation": "TypeScript's conditional types and recursive generics make its type system mathematically Turing complete."
      },
      {
        "question": "Why should deep AST type evaluation be avoided in production application code?",
        "options": [
          "It increases emitted JavaScript bundle size",
          "It causes runtime memory leaks in production servers",
          "It makes code incompatible with modern browsers",
          "It dramatically increases IDE latency, causes editor autocompletion lag, and severely slows down continuous integration builds"
        ],
        "correctAnswer": "It dramatically increases IDE latency, causes editor autocompletion lag, and severely slows down continuous integration builds",
        "explanation": "Excessive type gymnastics consume significant CPU cycles in the TypeScript language service, harming developer experience."
      }
    ]
  },
  {
    "title": "TypeScript: Type-Level Binary Bitwise Operations & Shift Emulation",
    "description": "Emulating binary logic gates (AND, OR, XOR, NOT, Bit-shifts) on binary string types.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "How are bitwise logic gates (like `BitAnd<A, B>`) implemented on bit literal types `'0'` and `'1'`?",
        "codeSnippet": "type Bit = '0' | '1';\ntype BitAnd<A extends Bit, B extends Bit> =\n  A extends '1' ? (B extends '1' ? '1' : '0') : '0';",
        "options": [
          "Using lookup tables or nested conditional types matching `'1'` and `'0'`",
          "Using `A & B` directly",
          "Using `Math.bitwiseAnd`",
          "Calling C++ bitwise functions"
        ],
        "correctAnswer": "Using lookup tables or nested conditional types matching `'1'` and `'0'`",
        "explanation": "Binary truth tables are encoded into simple 2x2 conditional type evaluations."
      },
      {
        "question": "What is `BitXor<A, B>` defined as?",
        "codeSnippet": "type BitXor<A extends Bit, B extends Bit> = A extends B ? '0' : '1';",
        "options": [
          "`A extends '1' ? '1' : '0'`",
          "`A extends B ? '0' : '1'` (different bits produce '1', matching bits produce '0')",
          "`A extends '0' ? B : '0'`",
          "`BitAnd<A, B>`"
        ],
        "correctAnswer": "`A extends B ? '0' : '1'` (different bits produce '1', matching bits produce '0')",
        "explanation": "XOR yields `'1'` when inputs differ and `'0'` when inputs are identical."
      },
      {
        "question": "How do you emulate a Left Shift (`<<`) on a binary string `'101'`?",
        "codeSnippet": "type ShiftLeft<S extends string, N extends number> =\n  N extends 0 ? S : ShiftLeft<`${S}0`, Subtract<N, 1>>;",
        "options": [
          "Prepending `'0'` to the string",
          "Deleting the last character",
          "Appending `'0'` to the binary string for each shift step",
          "Multiplying by 10"
        ],
        "correctAnswer": "Appending `'0'` to the binary string for each shift step",
        "explanation": "In binary representation, shifting left by 1 bit corresponds to appending a `'0'` to the string."
      },
      {
        "question": "How is a multi-bit binary string like `'1010'` converted to decimal at the type level?",
        "options": [
          "Using `parseInt('1010', 2)`",
          "Using template literal infer on numbers",
          "By counting string length",
          "Recursively consume bits from left to right, doubling the accumulated total and adding the current bit"
        ],
        "correctAnswer": "Recursively consume bits from left to right, doubling the accumulated total and adding the current bit",
        "explanation": "Standard binary-to-decimal Horner's method (`acc * 2 + bit`) translates directly into recursive tuple operations."
      },
      {
        "question": "What is the primary architectural advantage of binary arithmetic over unary tuple length arithmetic in type systems?",
        "options": [
          "Logarithmic recursion depth: numbers up to 65,535 require only 16 bit operations rather than 65,535 tuple recursion steps",
          "Binary types emit faster JavaScript",
          "Binary types use less RAM in the browser",
          "Binary types work on floats"
        ],
        "correctAnswer": "Logarithmic recursion depth: numbers up to 65,535 require only 16 bit operations rather than 65,535 tuple recursion steps",
        "explanation": "Binary arithmetic operates in O(log N) depth instead of O(N) unary depth, circumventing TS2589 recursion limits."
      }
    ]
  },
  {
    "title": "TypeScript: Zero-Overhead Runtime Reflection via Type Metadata & Decorators",
    "description": "TC39 Stage 3 decorators vs legacy experimentalDecorators and emitDecoratorMetadata.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "What is the fundamental difference between legacy `experimentalDecorators` and modern TC39 Stage 3 Decorators (TS 5.0+)?",
        "options": [
          "Stage 3 decorators run only in browsers",
          "Stage 3 decorators are part of official ECMAScript standard, do not require `experimentalDecorators: true`, and take a `context` object as their second argument",
          "Legacy decorators can only be used on classes",
          "Stage 3 decorators are compile-time only and emit zero JS"
        ],
        "correctAnswer": "Stage 3 decorators are part of official ECMAScript standard, do not require `experimentalDecorators: true`, and take a `context` object as their second argument",
        "explanation": "TypeScript 5.0 introduced standard TC39 decorators with a standardized `(target, context)` signature."
      },
      {
        "question": "What did `emitDecoratorMetadata: true` do in legacy TypeScript decorator systems (NestJS, TypeORM)?",
        "codeSnippet": "{\n  \"compilerOptions\": {\n    \"experimentalDecorators\": true,\n    \"emitDecoratorMetadata\": true\n  }\n}",
        "options": [
          "Exported TypeScript interfaces to JSON",
          "Validated types at runtime with checksums",
          "Emitted runtime type metadata (`design:type`, `design:paramtypes`, `design:returntype`) using the `reflect-metadata` polyfill",
          "Generated Swagger documentation automatically"
        ],
        "correctAnswer": "Emitted runtime type metadata (`design:type`, `design:paramtypes`, `design:returntype`) using the `reflect-metadata` polyfill",
        "explanation": "Legacy `emitDecoratorMetadata` serialized parameter and return types into runtime metadata for dependency injection frameworks."
      },
      {
        "question": "Why can `emitDecoratorMetadata` fail when working with interfaces or union types?",
        "codeSnippet": "@Inject() handle(user: UserInterface) { ... } // What type metadata is emitted?",
        "options": [
          "It throws a compiler error",
          "It emits `undefined`",
          "It crashes the reflect-metadata library",
          "Interfaces and complex unions do not exist at runtime, so TypeScript emits `Object` as the fallback metadata"
        ],
        "correctAnswer": "Interfaces and complex unions do not exist at runtime, so TypeScript emits `Object` as the fallback metadata",
        "explanation": "Because interfaces are erased at compile time, the engine cannot reference an interface constructor, falling back to `Object`."
      },
      {
        "question": "What does the TC39 Stage 3 Decorator `context.addInitializer` method do?",
        "codeSnippet": "function logged(value, context) {\n  context.addInitializer(function() {\n    console.log(`Initialized ${context.name}`);\n  });\n}",
        "options": [
          "Registers a callback to execute when an instance of the class is initialized",
          "Adds a new constructor to the class",
          "Installs an npm package",
          "Registers a global service worker"
        ],
        "correctAnswer": "Registers a callback to execute when an instance of the class is initialized",
        "explanation": "`context.addInitializer` hooks into instance creation to run setup logic."
      },
      {
        "question": "How can modern TypeScript provide type safety for decorator arguments?",
        "codeSnippet": "function logMethod<This, Args extends any[], Return>(\n  target: (this: This, ...args: Args) => Return,\n  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>\n) { ... }",
        "options": [
          "Decorators cannot be typed in TypeScript",
          "Using `ClassMethodDecoratorContext<This, TargetFunction>` to constrain the decorator to compatible class methods",
          "Using `as any`",
          "Using `@types/decorator`"
        ],
        "correctAnswer": "Using `ClassMethodDecoratorContext<This, TargetFunction>` to constrain the decorator to compatible class methods",
        "explanation": "Standard decorator context types (`ClassMethodDecoratorContext`, `ClassFieldDecoratorContext`) provide complete static typing."
      }
    ]
  },
  {
    "title": "TypeScript: Higher-Ranked Types & Church Encoding at Type Level",
    "description": "Rank-2 polymorphism, Church booleans, Church numerals, and lambda calculus encoding.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "What is 'Rank-2 Polymorphism' (Higher-Ranked Types)?",
        "codeSnippet": "type UniversalRunner = (fn: <T>(x: T) => T) => [number, string];",
        "options": [
          "A function with two return statements",
          "A function that runs twice as fast",
          "A function that accepts a universally quantified (generic) function as an argument, allowing the caller to invoke it with different types",
          "A function with 2 generic arguments"
        ],
        "correctAnswer": "A function that accepts a universally quantified (generic) function as an argument, allowing the caller to invoke it with different types",
        "explanation": "Rank-2 polymorphism means a parameter itself is generic (`<T>(x: T) => T`), allowing the callee to instantiate `T` with multiple different types."
      },
      {
        "question": "How is a Church Boolean `True` encoded in lambda calculus and TypeScript types?",
        "codeSnippet": "type ChurchTrue = <T, F>(t: T, f: F) => T;\ntype ChurchFalse = <T, F>(t: T, f: F) => F;",
        "options": [
          "`ChurchTrue` returns `true` and `ChurchFalse` returns `false`",
          "`ChurchTrue` is a class extending Boolean",
          "`ChurchTrue` is a bitmask `1`",
          "`ChurchTrue` takes two options `(t, f)` and returns the first `t`; `ChurchFalse` returns the second `f`"
        ],
        "correctAnswer": "`ChurchTrue` takes two options `(t, f)` and returns the first `t`; `ChurchFalse` returns the second `f`",
        "explanation": "In Church encoding, boolean values are represented as selection functions: True selects the first branch, False selects the second."
      },
      {
        "question": "How does Church-encoded `If` work with `ChurchTrue`?",
        "codeSnippet": "type If<B extends <T, F>(t: T, f: F) => any, Then, Else> = B extends (t: Then, f: Else) => infer R ? R : never;",
        "options": [
          "Passing `Then` and `Else` directly to the Church boolean function extracts the chosen branch",
          "Using JavaScript ternary `? :`",
          "Using a switch statement",
          "Using bitwise logic"
        ],
        "correctAnswer": "Passing `Then` and `Else` directly to the Church boolean function extracts the chosen branch",
        "explanation": "Applying the Church boolean function to `Then` and `Else` selects the appropriate type branch."
      },
      {
        "question": "What is a Church Numeral representation of `2`?",
        "codeSnippet": "type ChurchTwo = <X>(f: (x: X) => X) => (x: X) => X;",
        "options": [
          "The number `2` in RAM",
          "A higher-order function that applies function `f` exactly twice: `f(f(x))`",
          "A tuple `[any, any]`",
          "A string `'2'`"
        ],
        "correctAnswer": "A higher-order function that applies function `f` exactly twice: `f(f(x))`",
        "explanation": "Church numerals represent integer N as an operator that applies a given function N times."
      },
      {
        "question": "Why does TypeScript support Rank-2 function parameters but not general Rank-N Higher-Kinded Types?",
        "options": [
          "Rank-N types are mathematically unsound",
          "Rank-2 types are an unintended parser accident",
          "TypeScript supports generic parameter signatures on functions (`(...): ...`), but lacks syntax for unapplied generic type constructors like `F<_>`",
          "Higher-ranked types are only allowed in C++"
        ],
        "correctAnswer": "TypeScript supports generic parameter signatures on functions (`(...): ...`), but lacks syntax for unapplied generic type constructors like `F<_>`",
        "explanation": "Function signatures can declare their own generic type variables, providing higher-ranked callable typing."
      }
    ]
  },
  {
    "title": "TypeScript: Nominal Identity via Private Brand Fields vs Phantom Types",
    "description": "Hard nominal typing via private class fields `#brand` vs compile-time phantom types.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "How do private class fields (`#privateField` or `private field: any`) enforce strict nominal typing in TypeScript?",
        "codeSnippet": "class USD {\n  #brand: void;\n  constructor(public amount: number) {}\n}\nclass EUR {\n  #brand: void;\n  constructor(public amount: number) {}\n}\nlet u: USD = new EUR(100); // Error!",
        "options": [
          "Private fields make classes invisible to other files",
          "Private fields throw errors on compilation",
          "Private fields are encrypted in V8",
          "TypeScript treats classes with private or protected members as nominally distinct; instances are ONLY compatible if they share the EXACT same class declaration origin"
        ],
        "correctAnswer": "TypeScript treats classes with private or protected members as nominally distinct; instances are ONLY compatible if they share the EXACT same class declaration origin",
        "explanation": "Classes with `private` or `#private` properties opt out of purely structural typing: two identical classes with private fields cannot be assigned to each other."
      },
      {
        "question": "How does private field nominalism differ from interface branding (`& { __brand: 'x' }`)?",
        "options": [
          "Interface branding can be forged by constructing an object with `__brand: 'x'`, whereas private class fields CANNOT be forged by object literals or external classes",
          "Interface branding uses more runtime memory",
          "Private fields only work with numbers",
          "There is no difference"
        ],
        "correctAnswer": "Interface branding can be forged by constructing an object with `__brand: 'x'`, whereas private class fields CANNOT be forged by object literals or external classes",
        "explanation": "Private fields create an unforgeable nominal barrier that external code cannot counterfeit without class instantiation."
      },
      {
        "question": "What is the runtime overhead of private identifier fields (`#brand`) in modern JavaScript?",
        "options": [
          "10x CPU slowdown on property access",
          "JavaScript engines store private fields in private brand symbols/weak references on instances, using minimal memory per instance",
          "Zero memory overhead because private fields are erased",
          "Private fields force heap de-optimization"
        ],
        "correctAnswer": "JavaScript engines store private fields in private brand symbols/weak references on instances, using minimal memory per instance",
        "explanation": "Native ECMAScript private fields (`#brand`) exist at runtime and use engine-managed private slots."
      },
      {
        "question": "Can an object literal `{ amount: 100 }` be assigned to `class USD { private _brand: void; constructor(public amount: number) {} }`?",
        "options": [
          "Yes, if it has the same public properties",
          "Yes, TypeScript coerces it",
          "No: Type '{ amount: number; }' is missing the private property '_brand' from type 'USD'",
          "Only if cast with `as any`"
        ],
        "correctAnswer": "No: Type '{ amount: number; }' is missing the private property '_brand' from type 'USD'",
        "explanation": "Object literals cannot synthesize private member properties, preventing accidental instantiation."
      },
      {
        "question": "When should interface branding be chosen over private class fields?",
        "options": [
          "When you want slower compilation",
          "When private fields are deprecated",
          "Only when using Webpack",
          "When working with zero-runtime-cost primitives (strings, numbers) or serializable JSON payloads without allocating class instances"
        ],
        "correctAnswer": "When working with zero-runtime-cost primitives (strings, numbers) or serializable JSON payloads without allocating class instances",
        "explanation": "Interface branding attaches compile-time labels to raw primitives (`string & Brand`) without wrapping them in class instances."
      }
    ]
  },
  {
    "title": "TypeScript: Transitive Dependency Typing & Monorepo Package Reference Types",
    "description": "Project references, composite projects, declaration maps, and monorepo build caches.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "What do 'Project References' in `tsconfig.json` allow monorepos to achieve?",
        "codeSnippet": "{\n  \"compilerOptions\": { \"composite\": true },\n  \"references\": [{ \"path\": \"../shared-utils\" }]\n}",
        "options": [
          "Split a large codebase into smaller, independently compilable packages that build incrementally using pre-compiled `.d.ts` artifacts",
          "Share global variables across all files without importing",
          "Compile frontend React to mobile iOS apps",
          "Download npm packages automatically"
        ],
        "correctAnswer": "Split a large codebase into smaller, independently compilable packages that build incrementally using pre-compiled `.d.ts` artifacts",
        "explanation": "Project references enable structured, incremental monorepo compilation by consuming referenced projects' `.d.ts` files."
      },
      {
        "question": "What compiler flag is strictly required when a project is referenced by another in a project references setup?",
        "codeSnippet": "{\n  \"compilerOptions\": {\n    \"composite\": true\n  }\n}",
        "options": [
          "`\"referenced\": true`",
          "`\"composite\": true`",
          "`\"multiProject\": true`",
          "`\"monorepo\": true`"
        ],
        "correctAnswer": "`\"composite\": true`",
        "explanation": "`composite: true` enforces build constraints (enabling `declaration`, `declarationMap`, and `rootDir`) required for project references."
      },
      {
        "question": "What does the `\"declarationMap\": true` option do in TypeScript?",
        "codeSnippet": "{\n  \"compilerOptions\": {\n    \"declaration\": true,\n    \"declarationMap\": true\n  }\n}",
        "options": [
          "Generates a graphical diagram of types in HTML",
          "Maps database schemas to types",
          "Generates source map files (`.d.ts.map`) mapping generated type declaration files back to original `.ts` source files, enabling 'Go to Definition' across packages",
          "Compresses type files"
        ],
        "correctAnswer": "Generates source map files (`.d.ts.map`) mapping generated type declaration files back to original `.ts` source files, enabling 'Go to Definition' across packages",
        "explanation": "Declaration source maps allow editors to jump directly to the original TypeScript source file rather than the compiled `.d.ts` file."
      },
      {
        "question": "What command builds an entire project-reference graph in topological dependency order?",
        "codeSnippet": "tsc --build (or tsc -b)",
        "options": [
          "`tsc --all`",
          "`tsc --monorepo`",
          "`tsc --recursive`",
          "`tsc --build` (or `tsc -b`)"
        ],
        "correctAnswer": "`tsc --build` (or `tsc -b`)",
        "explanation": "`tsc --build` orchestrates multi-project builds, calculating dependency order and skipping up-to-date projects."
      },
      {
        "question": "What is a common trap when publishing npm packages built with project references?",
        "options": [
          "Leaking private monorepo internal paths in generated `.d.ts` files instead of clean public npm package names",
          "Code becomes slower in production",
          "Node.js rejects `.d.ts` files",
          "All files become public"
        ],
        "correctAnswer": "Leaking private monorepo internal paths in generated `.d.ts` files instead of clean public npm package names",
        "explanation": "If paths are not remapped on publish, external consumers will encounter broken references to internal monorepo disk paths."
      }
    ]
  },
  {
    "title": "TypeScript: Circular Reference Handling & Weak Type Traps",
    "description": "Weak types, unexpected assignability traps, and circular type dependency mitigation.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "What is a 'Weak Type' in TypeScript?",
        "codeSnippet": "interface Options {\n  timeout?: number;\n  retries?: number;\n  logLevel?: string;\n}",
        "options": [
          "A type that uses `any`",
          "An object type where ALL properties are optional",
          "A type that is deleted during garbage collection",
          "A type created with `var`"
        ],
        "correctAnswer": "An object type where ALL properties are optional",
        "explanation": "A weak type contains exclusively optional properties."
      },
      {
        "question": "What special assignability rule did TypeScript introduce for 'Weak Types' to catch bugs?",
        "codeSnippet": "const bad = { time: 1000 };\n// const opt: Options = bad; // Error!",
        "options": [
          "Weak types can never be assigned",
          "Weak types require `as const`",
          "An object must have AT LEAST ONE common property with the weak type to be assignable; objects with zero overlapping properties are rejected",
          "Weak types must be instantiated with `new`"
        ],
        "correctAnswer": "An object must have AT LEAST ONE common property with the weak type to be assignable; objects with zero overlapping properties are rejected",
        "explanation": "The weak type check catches typos by verifying that a candidate object shares at least one property with the weak type."
      },
      {
        "question": "Why can circular type dependencies between modules cause silent `any` or compilation errors?",
        "codeSnippet": "// fileA.ts imports B from './fileB';\n// fileB.ts imports A from './fileA';",
        "options": [
          "Circular imports crash the hard drive",
          "TypeScript bans circular imports completely in all cases",
          "It causes an infinite loop at runtime in V8",
          "Type inference dependencies may form an unresolvable cycle, causing the compiler to bail out and infer `any` or trigger TS2502 ('referenced directly or indirectly')"
        ],
        "correctAnswer": "Type inference dependencies may form an unresolvable cycle, causing the compiler to bail out and infer `any` or trigger TS2502 ('referenced directly or indirectly')",
        "explanation": "Circular type definitions prevent the compiler from establishing a topological evaluation order, leading to cycle errors."
      },
      {
        "question": "How do you break circular module type dependencies in large systems?",
        "options": [
          "Extract shared interfaces and models into a dedicated third module (e.g. `types.ts`) imported by both modules",
          "Use `any` in both files",
          "Merge both files into one 20,000 line file",
          "Disable strict mode"
        ],
        "correctAnswer": "Extract shared interfaces and models into a dedicated third module (e.g. `types.ts`) imported by both modules",
        "explanation": "Extracting common contracts into an independent leaf module eliminates the dependency cycle."
      },
      {
        "question": "What is the behavior of `keyof` on a circular type?",
        "codeSnippet": "interface TreeNode { parent: TreeNode; children: TreeNode[]; }\ntype Keys = keyof TreeNode;",
        "options": [
          "Compiler throws TS2589 infinite recursion",
          "`'parent' | 'children'` (lookup of property names evaluates without looping because keys are non-recursive)",
          "`never`",
          "`string | number`"
        ],
        "correctAnswer": "`'parent' | 'children'` (lookup of property names evaluates without looping because keys are non-recursive)",
        "explanation": "`keyof` only queries the top-level property identifiers of the interface, which does not require evaluating nested types."
      }
    ]
  },
  {
    "title": "TypeScript: Type-Level Matrix Multiplication & Vector Math",
    "description": "Multidimensional tuple vectors, dot products, and matrix transformations in types.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "How is a 2D matrix represented at the type level in TypeScript?",
        "codeSnippet": "type Matrix2x2 = [\n  [1, 2],\n  [3, 4]\n];",
        "options": [
          "As a string of comma-separated numbers",
          "Using the `Float32Array` type",
          "As a nested tuple where the outer tuple represents rows and inner tuples represent column cells",
          "As an object with x and y coordinates"
        ],
        "correctAnswer": "As a nested tuple where the outer tuple represents rows and inner tuples represent column cells",
        "explanation": "Nested tuples (`Tuple<Tuple<number>>`) provide precise type-level indexation for rows and columns."
      },
      {
        "question": "How is matrix transposition (flipping rows and columns) implemented at the type level?",
        "options": [
          "Calling `matrix.transpose()`",
          "Reversing the outer tuple",
          "Rotating the matrix 90 degrees in WebGL",
          "Mapping over column indices and picking element `[Row][Col]` across all rows to form new rows"
        ],
        "correctAnswer": "Mapping over column indices and picking element `[Row][Col]` across all rows to form new rows",
        "explanation": "Transposition maps over column indices `Col` and gathers `Matrix[Row][Col]` for each row."
      },
      {
        "question": "How is a vector Dot Product `Dot<[1, 2], [3, 4]>` computed at the type level?",
        "codeSnippet": "// Dot = 1*3 + 2*4 = 3 + 8 = 11",
        "options": [
          "Multiply corresponding elements pair by pair and sum the resulting products using type-level arithmetic",
          "Concatenate the two tuples",
          "Multiply lengths of both tuples",
          "Use a dot product decorator"
        ],
        "correctAnswer": "Multiply corresponding elements pair by pair and sum the resulting products using type-level arithmetic",
        "explanation": "Dot product pairs elements across vectors, multiplies each pair, and sums the products."
      },
      {
        "question": "What dimension constraint must be enforced for matrix multiplication `A x B` to be mathematically valid?",
        "codeSnippet": "type MultiplyMatrix<A extends any[][], B extends any[][]> =\n  A[0]['length'] extends B['length'] ? ... : 'Incompatible dimensions';",
        "options": [
          "`A` and `B` must have identical dimensions",
          "The number of columns in `A` (`A[0]['length']`) must equal the number of rows in `B` (`B['length']`)",
          "`A` must be square",
          "`B` must be a 1D vector"
        ],
        "correctAnswer": "The number of columns in `A` (`A[0]['length']`) must equal the number of rows in `B` (`B['length']`)",
        "explanation": "Matrix multiplication requires `Cols(A) === Rows(B)`; validating this at compile time prevents dimensional runtime bugs."
      },
      {
        "question": "Where does compile-time vector and matrix typing find practical application in web engineering?",
        "options": [
          "Database connection pooling",
          "HTTP cookie management",
          "Type-checking shader uniforms, 3D CSS transforms (matrix3d), WebGPU pipeline layouts, and robotics kinematics",
          "DOM event bubbling"
        ],
        "correctAnswer": "Type-checking shader uniforms, 3D CSS transforms (matrix3d), WebGPU pipeline layouts, and robotics kinematics",
        "explanation": "Graphics, game engines, and numerical computing benefit from verifying matrix and vector dimensions statically."
      }
    ]
  },
  {
    "title": "TypeScript: Event-Driven State Machine with Narrowed Transitions",
    "description": "Hierarchical state charts, event narrowing, and guaranteed payload extraction.",
    "difficulty": "very hard",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 15,
    "questions": [
      {
        "question": "How do you enforce that an event can ONLY be dispatched when the state machine is in a state that permits that event?",
        "codeSnippet": "interface Machine<S extends State> {\n  send<E extends AllowedEvents<S>>(event: E): Machine<NextState<S, E>>;\n}",
        "options": [
          "Check event validity inside an if-statement at runtime",
          "Throw an error if event is unrecognized",
          "Use a global event bus",
          "Constrain the event parameter `E extends AllowedEvents<S>` based on current generic state parameter `S`"
        ],
        "correctAnswer": "Constrain the event parameter `E extends AllowedEvents<S>` based on current generic state parameter `S`",
        "explanation": "Constraining `E` based on current state `S` disallows invalid dispatch calls at compile time."
      },
      {
        "question": "What does calling `machine.send({ type: 'RESOLVE' })` produce if the machine is currently in `'idle'` (where only `'START'` is allowed)?",
        "options": [
          "Compile error: Argument of type '{ type: \"RESOLVE\"; }' is not assignable to parameter of type '{ type: \"START\"; }'",
          "It transitions silently to error state",
          "It queues the event until idle finishes",
          "It returns null"
        ],
        "correctAnswer": "Compile error: Argument of type '{ type: \"RESOLVE\"; }' is not assignable to parameter of type '{ type: \"START\"; }'",
        "explanation": "The compiler rejects the invalid event argument because `'RESOLVE'` is not permitted in the `'idle'` state."
      },
      {
        "question": "How does each `.send()` call update the machine's state type in a fluent chain?",
        "codeSnippet": "const machine = createMachine()\n  .send({ type: 'START' })     // Returns Machine<'loading'>\n  .send({ type: 'RESOLVE' });  // Returns Machine<'success'>",
        "options": [
          "It mutates a global state type",
          "`.send()` returns a new `Machine<NextState<S, E>>` instantiation, advancing the generic type tracker across each chained call",
          "It casts `this as any`",
          "It waits for promises to resolve"
        ],
        "correctAnswer": "`.send()` returns a new `Machine<NextState<S, E>>` instantiation, advancing the generic type tracker across each chained call",
        "explanation": "Returning a new generic machine container type with the updated state phantom parameter advances compile-time state tracking."
      },
      {
        "question": "How do you extract the current state's context payload without unsafe casting?",
        "codeSnippet": "const data = machine.getContext(); // Typed as User[] only when in 'success' state",
        "options": [
          "Use `machine.context as any`",
          "Wrap in try/catch",
          "Constrain or narrow `machine` using a type guard or query `State['context']` where `State` is narrowed by `machine.is('success')`",
          "Call `JSON.stringify(machine.context)`"
        ],
        "correctAnswer": "Constrain or narrow `machine` using a type guard or query `State['context']` where `State` is narrowed by `machine.is('success')`",
        "explanation": "Type guards narrowing the machine's state safely narrow the corresponding context shape."
      },
      {
        "question": "What design pattern does this state machine architecture represent?",
        "options": [
          "Singleton pattern",
          "Proxy pattern",
          "Decorator pattern",
          "Type-Level Typestate Pattern: encoding lifecycle phases into the type system so illegal operations are uncallable"
        ],
        "correctAnswer": "Type-Level Typestate Pattern: encoding lifecycle phases into the type system so illegal operations are uncallable",
        "explanation": "The Typestate pattern models object lifecycle states as distinct static types, eliminating invalid runtime calls."
      }
    ]
  }
];
