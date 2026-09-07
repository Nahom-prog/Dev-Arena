/**
 * TypeScript Mid Challenge Pack
 * 20 Distinct Topic Quizzes x 5 Focused Practical Questions = 100 Questions Total
 * Answer distribution strictly balanced: 25 A, 25 B, 25 C, 25 D
 */

export const typescriptMidQuizzes = [
  {
    "title": "TypeScript: Discriminated Unions & Exhaustiveness Checks",
    "description": "Tagged unions, common discriminant fields, and compile-time exhaustive switch checks.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What constitutes a 'discriminant property' in a discriminated union?",
        "codeSnippet": "type Shape =\n  | { kind: 'circle'; radius: number }\n  | { kind: 'square'; size: number };",
        "options": [
          "A shared literal property (like `kind`) present across all variants with distinct literal values",
          "A unique method defined only on the first interface",
          "A property marked with the `discriminant` keyword",
          "Any numeric property that increments"
        ],
        "correctAnswer": "A shared literal property (like `kind`) present across all variants with distinct literal values",
        "explanation": "A discriminated union relies on a shared literal property (often `kind`, `type`, or `status`) that TypeScript uses to uniquely identify each variant."
      },
      {
        "question": "How do you enforce exhaustive switch handling at compile time?",
        "codeSnippet": "function area(s: Shape) {\n  switch (s.kind) {\n    case 'circle': return Math.PI * s.radius ** 2;\n    case 'square': return s.size ** 2;\n    default:\n      const _unreachable: never = s;\n      throw new Error('Unhandled: ' + _unreachable);\n  }\n}",
        "options": [
          "Using `@exhaustive` decorator above the switch",
          "Assigning the switch's `default` value to a variable typed `never`",
          "Adding a `final` keyword after the last case",
          "Switch statements are automatically exhaustive without any code"
        ],
        "correctAnswer": "Assigning the switch's `default` value to a variable typed `never`",
        "explanation": "If a new variant is added to `Shape` and not handled in the switch, `s` in the default case will have the type of that unhandled variant, triggering a compile-time error when assigned to `never`."
      },
      {
        "question": "Can boolean literals act as discriminants in TypeScript?",
        "codeSnippet": "type ResponseState =\n  | { ok: true; data: string[] }\n  | { ok: false; error: string };",
        "options": [
          "No, discriminants must be strings",
          "Only if the type also includes numbers",
          "Yes, `ok: true` and `ok: false` form a valid boolean discriminated union",
          "No, booleans are primitives and cannot be discriminants"
        ],
        "correctAnswer": "Yes, `ok: true` and `ok: false` form a valid boolean discriminated union",
        "explanation": "Boolean literals (`true` and `false`) are distinct literal types and work seamlessly as discriminants."
      },
      {
        "question": "What happens if two union members share the exact same discriminant literal value?",
        "codeSnippet": "type Action =\n  | { type: 'LOAD'; payload: number }\n  | { type: 'LOAD'; payload: string };",
        "options": [
          "TypeScript rejects the type declaration as duplicate",
          "The second variant is dropped silently",
          "The discriminant defaults to `any`",
          "Checking `action.type === 'LOAD'` narrows `action` to the union of both variants, with `payload: number | string`"
        ],
        "correctAnswer": "Checking `action.type === 'LOAD'` narrows `action` to the union of both variants, with `payload: number | string`",
        "explanation": "When discriminant values collide, TypeScript narrows the type down to the subset of variants that match that discriminant value."
      },
      {
        "question": "Why are discriminated unions preferred over optional properties on a single interface?",
        "codeSnippet": "// Option A: { type: 'success', data: Data } | { type: 'error', error: Error }\n// Option B: { type: string, data?: Data, error?: Error }",
        "options": [
          "Option A prevents invalid runtime states (e.g. both data and error being present, or neither being present)",
          "Option A takes up less memory in JavaScript engines",
          "Option B cannot be JSON-serialized",
          "Option A allows methods to be attached automatically"
        ],
        "correctAnswer": "Option A prevents invalid runtime states (e.g. both data and error being present, or neither being present)",
        "explanation": "Discriminated unions make impossible states unrepresentable in the type system."
      }
    ]
  },
  {
    "title": "TypeScript: Keyof & Lookup Types (`T[K]`)",
    "description": "Property key extraction, index query operators, and property type lookups.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What does the `keyof` operator produce when applied to an object type?",
        "codeSnippet": "interface User { id: number; name: string; email: string; }\ntype UserKeys = keyof User;",
        "options": [
          "An array of strings `['id', 'name', 'email']` at runtime",
          "A union of string literal types representing the keys: `'id' | 'name' | 'email'`",
          "A Map containing the property descriptors",
          "The number of keys in the object"
        ],
        "correctAnswer": "A union of string literal types representing the keys: `'id' | 'name' | 'email'`",
        "explanation": "`keyof T` yields the union of known public property names of `T`."
      },
      {
        "question": "How do you extract the type of a specific property using an indexed access (lookup) type?",
        "codeSnippet": "interface ApiResponse { data: { token: string }; statusCode: number; }\ntype Token = ApiResponse['data']['token'];",
        "options": [
          "`ApiResponse.data.token`",
          "`typeof ApiResponse['token']`",
          "`ApiResponse['data']['token']`",
          "`lookup(ApiResponse, 'token')`"
        ],
        "correctAnswer": "`ApiResponse['data']['token']`",
        "explanation": "Indexed access types use square bracket syntax `Type['key']` to query property types."
      },
      {
        "question": "What is `keyof any` in TypeScript?",
        "codeSnippet": "type Keys = keyof any;",
        "options": [
          "`string[]`",
          "`any`",
          "`never`",
          "`string | number | symbol`"
        ],
        "correctAnswer": "`string | number | symbol`",
        "explanation": "In JavaScript, object keys can only be strings, numbers, or symbols, so `keyof any` evaluates to `string | number | symbol`."
      },
      {
        "question": "How does `keyof` behave on an object type with a numeric index signature `[n: number]: string`?",
        "codeSnippet": "interface StringArray { [n: number]: string; }\ntype Index = keyof StringArray;",
        "options": [
          "`number`",
          "`string`",
          "`number | string`",
          "`never`"
        ],
        "correctAnswer": "`number`",
        "explanation": "An index signature with `[n: number]` produces `number` under `keyof`."
      },
      {
        "question": "How do you write a generic getter function that guarantees the key exists on the object and preserves return type safety?",
        "codeSnippet": "function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}",
        "options": [
          "`<T>(obj: T, key: string): any`",
          "`<T, K extends keyof T>(obj: T, key: K): T[K]`",
          "`<T, K>(obj: T, key: K): T`",
          "`(obj: object, key: keyof object): unknown`"
        ],
        "correctAnswer": "`<T, K extends keyof T>(obj: T, key: K): T[K]`",
        "explanation": "Constraining `K extends keyof T` and returning `T[K]` ensures type-safe property access."
      }
    ]
  },
  {
    "title": "TypeScript: Indexed Access Types & Record",
    "description": "The Record utility type, index signatures, and dynamic property dictionaries.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is the definition and purpose of the standard `Record<K, T>` utility type?",
        "codeSnippet": "type RoleMap = Record<'admin' | 'user', { permissions: string[] }>;",
        "options": [
          "Creates an immutable array of records",
          "Converts a database table into a TypeScript class",
          "Constructs an object type whose property keys are `K` and whose property values are `T`",
          "Creates an audio recording stream"
        ],
        "correctAnswer": "Constructs an object type whose property keys are `K` and whose property values are `T`",
        "explanation": "`Record<K, T>` is defined as `{ [P in K]: T }`, mapping each key in `K` to a value of type `T`."
      },
      {
        "question": "What error occurs if you omit a key defined in a finite `Record` union?",
        "codeSnippet": "type Page = 'home' | 'about' | 'contact';\nconst pages: Record<Page, string> = {\n  home: '/home',\n  about: '/about',\n  // contact omitted\n};",
        "options": [
          "It fills in 'contact' with undefined silently",
          "Compile error: Record cannot use union keys",
          "No error: Record keys are optional by default",
          "Property 'contact' is missing in type '{ home: string; about: string; }'"
        ],
        "correctAnswer": "Property 'contact' is missing in type '{ home: string; about: string; }'",
        "explanation": "Unless wrapped in `Partial<Record<...>>`, all keys declared in `Record<K, T>` are strictly required."
      },
      {
        "question": "How do you extract the element type of an array using indexed access?",
        "codeSnippet": "const items = ['a', 'b', 'c'];\ntype ItemType = typeof items[number];",
        "options": [
          "`typeof items[number]` or `MyArrayType[number]`",
          "`typeof items[0]`",
          "`items.type`",
          "`ArrayElement<typeof items>`"
        ],
        "correctAnswer": "`typeof items[number]` or `MyArrayType[number]`",
        "explanation": "Indexing an array type with `[number]` yields the union of all element types within that array."
      },
      {
        "question": "What does `Record<string, never>` represent?",
        "codeSnippet": "const empty: Record<string, never> = {};",
        "options": [
          "An object that crashes when indexed",
          "An object that cannot have any assignable property values (effectively an empty object)",
          "A dictionary where all values are null",
          "A function that never returns"
        ],
        "correctAnswer": "An object that cannot have any assignable property values (effectively an empty object)",
        "explanation": "Because no value can be assigned to `never`, setting any property value triggers a compile error, forcing the object to remain empty."
      },
      {
        "question": "What tsconfig setting adds `undefined` to indexed access on `Record<string, T>` to guard against accessing non-existent keys?",
        "codeSnippet": "const dict: Record<string, number> = {};\nconst val = dict['missing']; // val: number | undefined with this flag",
        "options": [
          "`strictIndexChecking: true`",
          "`safeIndexAccess: true`",
          "`noUncheckedIndexedAccess: true`",
          "`strictNullChecks: true`"
        ],
        "correctAnswer": "`noUncheckedIndexedAccess: true`",
        "explanation": "`noUncheckedIndexedAccess: true` automatically adds `undefined` to any un-narrowed index lookup, forcing explicit checks."
      }
    ]
  },
  {
    "title": "TypeScript: Generic Interfaces & Classes",
    "description": "Type parameters on interfaces, classes, constructors, and container patterns.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "How do you declare a generic interface in TypeScript?",
        "codeSnippet": "interface PaginatedResponse<T> {\n  data: T[];\n  total: number;\n  page: number;\n}",
        "options": [
          "`interface PaginatedResponse(T)`",
          "`generic interface PaginatedResponse<T>`",
          "`interface<T> PaginatedResponse`",
          "`interface PaginatedResponse<T>`"
        ],
        "correctAnswer": "`interface PaginatedResponse<T>`",
        "explanation": "Generic type parameters are placed immediately following the interface name in angle brackets `<T>`."
      },
      {
        "question": "How do generic classes infer their type parameter from constructor arguments?",
        "codeSnippet": "class Box<T> {\n  value: T;\n  constructor(val: T) { this.value = val; }\n}\nconst b = new Box(42);",
        "options": [
          "TypeScript infers `T = number` from the constructor argument `42` automatically",
          "You must always write `new Box<number>(42)` explicitly",
          "It infers `T = any` unless specified in tsconfig",
          "It throws a compile error requiring explicit annotation"
        ],
        "correctAnswer": "TypeScript infers `T = number` from the constructor argument `42` automatically",
        "explanation": "TypeScript infers class type parameters from arguments passed to the constructor."
      },
      {
        "question": "Can static members of a generic class reference the class's type parameter `T`?",
        "codeSnippet": "class Store<T> {\n  // static defaultVal: T; // Is this allowed?\n}",
        "options": [
          "Yes, static members share instance type parameters",
          "No, static members cannot reference class type parameters because static members belong to the class constructor, not instances",
          "Yes, but only if marked `readonly`",
          "Only in abstract classes"
        ],
        "correctAnswer": "No, static members cannot reference class type parameters because static members belong to the class constructor, not instances",
        "explanation": "Static members are defined on the class constructor function at runtime, where no generic instance type exists."
      },
      {
        "question": "How do you provide a default type for a generic parameter?",
        "codeSnippet": "interface CacheStore<T = string> {\n  get(key: string): T;\n}",
        "options": [
          "`<T : string>`",
          "`<T default string>`",
          "`<T = string>` assigns `string` as the fallback type if no argument is provided",
          "`<T | string>`"
        ],
        "correctAnswer": "`<T = string>` assigns `string` as the fallback type if no argument is provided",
        "explanation": "Just like default parameter values in functions, generic type parameters accept defaults via `= DefaultType`."
      },
      {
        "question": "How can a generic interface extend another generic interface with a transformed type?",
        "codeSnippet": "interface Entity { id: string; }\ninterface Repository<T extends Entity> {\n  findById(id: string): Promise<T | null>;\n}",
        "options": [
          "By writing `interface Repository implements Entity`",
          "By wrapping `Entity` in `as Entity`",
          "Interfaces cannot be constrained",
          "By constraining the type parameter with `T extends Entity`"
        ],
        "correctAnswer": "By constraining the type parameter with `T extends Entity`",
        "explanation": "`T extends Entity` ensures that any type passed to `Repository` possesses the required properties of `Entity`."
      }
    ]
  },
  {
    "title": "TypeScript: Generic Constraints (`extends`)",
    "description": "Bounding generic type variables with extends, shape requirements, and keyof bounds.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What does `<T extends { length: number }>` enforce on the type argument `T`?",
        "codeSnippet": "function printLength<T extends { length: number }>(item: T): number {\n  return item.length;\n}",
        "options": [
          "Guarantees that `item` has a numeric `length` property (e.g. strings, arrays, custom objects)",
          "Forces `item` to be an Array",
          "Prevents `item` from having more than one property",
          "Requires `item` to extend a JavaScript Error class"
        ],
        "correctAnswer": "Guarantees that `item` has a numeric `length` property (e.g. strings, arrays, custom objects)",
        "explanation": "The `extends` keyword in a type parameter declaration establishes an upper bound, requiring incoming types to satisfy the constraint shape."
      },
      {
        "question": "What error is generated if you call `printLength(123)` on `function printLength<T extends { length: number }>(item: T)`?",
        "codeSnippet": "printLength(123);",
        "options": [
          "SyntaxError: Invalid length",
          "Argument of type 'number' is not assignable to parameter of type '{ length: number; }'",
          "ReferenceError: length is undefined",
          "TypeError: 123 has no length attribute"
        ],
        "correctAnswer": "Argument of type 'number' is not assignable to parameter of type '{ length: number; }'",
        "explanation": "Numbers do not have a `length` property, so they fail the constraint check at compile time."
      },
      {
        "question": "How can one type parameter be constrained by another type parameter in the same signature?",
        "codeSnippet": "function copyProp<T, K extends keyof T>(source: T, key: K): T[K] {\n  return source[key];\n}",
        "options": [
          "`<T, K in T>`",
          "`<T, K : T>`",
          "`<T, K extends keyof T>` constrains `K` to valid keys of `T`",
          "`<T, K = keyof T>`"
        ],
        "correctAnswer": "`<T, K extends keyof T>` constrains `K` to valid keys of `T`",
        "explanation": "Type parameters can reference earlier type parameters in the same parameter list to establish dependent constraints."
      },
      {
        "question": "Can a generic constraint extend multiple interfaces simultaneously?",
        "codeSnippet": "interface Serializable { serialize(): string; }\ninterface Identifiable { id: string; }\nfunction save<T extends Serializable & Identifiable>(item: T) { ... }",
        "options": [
          "Yes, by writing `T extends A, B`",
          "No, TypeScript only allows a single interface per constraint",
          "Yes, using `T extends A | B`",
          "Yes, by combining the constraints using an intersection `&` (`T extends A & B`)"
        ],
        "correctAnswer": "Yes, by combining the constraints using an intersection `&` (`T extends A & B`)",
        "explanation": "Using an intersection `&` requires `T` to satisfy all combined interfaces."
      },
      {
        "question": "What does `T extends unknown` or `T extends any` do in a generic function?",
        "codeSnippet": "const makePair = <T extends unknown>(a: T) => [a, a];",
        "options": [
          "It acts as a syntactic hint in `.tsx` files to disambiguate the opening `<T>` from a JSX tag",
          "It strips undefined from T",
          "It forces T to be an object",
          "It disables type checking on T"
        ],
        "correctAnswer": "It acts as a syntactic hint in `.tsx` files to disambiguate the opening `<T>` from a JSX tag",
        "explanation": "In `.tsx` files, an unconstrained `<T>` arrow function can be parsed as a JSX tag. Adding `extends unknown` resolves the grammar ambiguity."
      }
    ]
  },
  {
    "title": "TypeScript: Utility Types: `Partial`, `Required`, `Readonly`",
    "description": "Core mapped utility types that transform property modifiers.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What does the `Partial<T>` utility type do to an interface?",
        "codeSnippet": "interface User { id: string; name: string; email: string; }\ntype UpdateUser = Partial<User>;",
        "options": [
          "Removes all properties from `T`",
          "Makes all properties of `T` optional (`?`)",
          "Makes all properties `readonly`",
          "Returns only properties that have default values"
        ],
        "correctAnswer": "Makes all properties of `T` optional (`?`)",
        "explanation": "`Partial<T>` is implemented as `{ [P in keyof T]?: T[P] }`, marking every property as optional."
      },
      {
        "question": "What does the `Required<T>` utility type do?",
        "codeSnippet": "interface Props { title?: string; visible?: boolean; }\ntype StrictProps = Required<Props>;",
        "options": [
          "Throws an error if any property is null",
          "Requires the object to be instantiated with `new`",
          "Removes the optional modifier (`-?`) from all properties, making them all mandatory",
          "Forces properties to be non-empty strings"
        ],
        "correctAnswer": "Removes the optional modifier (`-?`) from all properties, making them all mandatory",
        "explanation": "`Required<T>` is implemented as `{ [P in keyof T]-?: T[P] }`, stripping optionality from all keys."
      },
      {
        "question": "Are `Partial<T>` and `Readonly<T>` deep or shallow transformations by default?",
        "codeSnippet": "interface State { user: { name: string } }\nconst s: Readonly<State> = { user: { name: 'Dan' } };\ns.user.name = 'Bob'; // Does this compile?",
        "options": [
          "They are deeply recursive; all nested objects are frozen",
          "They freeze the object in V8 runtime memory",
          "They throw runtime errors on deep assignment",
          "They are shallow: only top-level properties are modified; nested properties like `user.name` remain mutable"
        ],
        "correctAnswer": "They are shallow: only top-level properties are modified; nested properties like `user.name` remain mutable",
        "explanation": "TypeScript's built-in utility types are shallow. Deep immutability requires custom recursive mapped types."
      },
      {
        "question": "How is `Readonly<T>` implemented in TypeScript's standard library?",
        "options": [
          "`type Readonly<T> = { readonly [P in keyof T]: T[P]; }`",
          "`type Readonly<T> = Object.freeze<T>`",
          "`type Readonly<T> = const T`",
          "`type Readonly<T> = T & { readonly: true }`"
        ],
        "correctAnswer": "`type Readonly<T> = { readonly [P in keyof T]: T[P]; }`",
        "explanation": "`Readonly<T>` iterates through all keys in `keyof T` and prepends the `readonly` modifier."
      },
      {
        "question": "What happens when `Partial<T>` is applied to a union type?",
        "codeSnippet": "type Union = { a: number } | { b: string };\ntype PartialUnion = Partial<Union>;",
        "options": [
          "It collapses the union into `{ a?: number; b?: string }`",
          "It distributes over the union: `Partial<{ a: number }> | Partial<{ b: string }>`",
          "It produces a compile-time error",
          "It turns into `any`"
        ],
        "correctAnswer": "It distributes over the union: `Partial<{ a: number }> | Partial<{ b: string }>`",
        "explanation": "Mapped types distribute across union components, producing a union of partial shapes."
      }
    ]
  },
  {
    "title": "TypeScript: Utility Types: `Pick` & `Omit`",
    "description": "Selecting and filtering property subsets from object types.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What does `Pick<T, K>` do?",
        "codeSnippet": "interface Todo { id: number; title: string; completed: boolean; createdAt: Date; }\ntype TodoPreview = Pick<Todo, 'id' | 'title'>;",
        "options": [
          "Picks the first `K` elements of a tuple",
          "Returns the runtime values of keys `K`",
          "Constructs a type by picking the set of properties `K` from `T`",
          "Deletes properties `K` from `T`"
        ],
        "correctAnswer": "Constructs a type by picking the set of properties `K` from `T`",
        "explanation": "`Pick<T, K extends keyof T>` creates a new object type with only the specified subset of keys."
      },
      {
        "question": "What does `Omit<T, K>` do?",
        "codeSnippet": "interface User { id: string; name: string; passwordHash: string; }\ntype SafeUser = Omit<User, 'passwordHash'>;",
        "options": [
          "Makes the keys `K` optional",
          "Replaces the types of keys `K` with `never`",
          "Throws an error if `passwordHash` is read",
          "Constructs a type by picking all properties from `T` and then removing `K`"
        ],
        "correctAnswer": "Constructs a type by picking all properties from `T` and then removing `K`",
        "explanation": "`Omit<T, K>` removes the keys specified in `K` from `T`."
      },
      {
        "question": "How is `Omit<T, K>` implemented under the hood in TypeScript?",
        "options": [
          "`type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;`",
          "`type Omit<T, K> = T - K;`",
          "`type Omit<T, K> = delete T[K];`",
          "`type Omit<T, K> = { [P in keyof T != K]: T[P] };`"
        ],
        "correctAnswer": "`type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;`",
        "explanation": "`Omit` is built by combining `Pick` with `Exclude` to exclude `K` from `keyof T`."
      },
      {
        "question": "What happens if you pass a key to `Pick<T, K>` that does not exist in `T`?",
        "codeSnippet": "interface Article { title: string; }\n// type Bad = Pick<Article, 'author'>;",
        "options": [
          "It silently ignores the missing key",
          "Compile error: Type '\"author\"' does not satisfy the constraint '\"title\"'",
          "It adds `author: undefined` to the resulting type",
          "It sets the type to `never`"
        ],
        "correctAnswer": "Compile error: Type '\"author\"' does not satisfy the constraint '\"title\"'",
        "explanation": "`Pick` constrains `K extends keyof T`, catching non-existent property names at compile time."
      },
      {
        "question": "Does `Omit<T, K>` strictly enforce that `K` must be a valid key of `T`?",
        "codeSnippet": "interface Article { title: string; }\ntype Test = Omit<Article, 'author'>; // Does this compile?",
        "options": [
          "No, it produces a compile error: 'author' is not a key of Article",
          "No, it requires `strictOmit: true` in tsconfig",
          "Yes it compiles: `Omit` constrains `K extends keyof any`, so non-existent keys are permitted without error",
          "It converts the type to `never`"
        ],
        "correctAnswer": "Yes it compiles: `Omit` constrains `K extends keyof any`, so non-existent keys are permitted without error",
        "explanation": "Because `Omit` uses `K extends keyof any`, omitting a key that does not exist on `T` is permitted."
      }
    ]
  },
  {
    "title": "TypeScript: Utility Types: `Exclude` & `Extract`",
    "description": "Filtering union types via conditional type evaluation.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What does `Exclude<T, U>` do?",
        "codeSnippet": "type Status = 'pending' | 'active' | 'archived' | 'deleted';\ntype NonDeleted = Exclude<Status, 'deleted'>;",
        "options": [
          "Excludes properties from an interface",
          "Removes undefined from a type",
          "Filters array elements at runtime",
          "Excludes from `T` all union members that are assignable to `U`"
        ],
        "correctAnswer": "Excludes from `T` all union members that are assignable to `U`",
        "explanation": "`Exclude<T, U>` evaluates conditionally over unions: `T extends U ? never : T`."
      },
      {
        "question": "What does `Extract<T, U>` do?",
        "codeSnippet": "type Event = 'click' | 'hover' | 1 | 2;\ntype StringEvents = Extract<Event, string>;",
        "options": [
          "Extracts from `T` all union members that are assignable to `U` (`'click' | 'hover'`)",
          "Extracts properties from an object into a tuple",
          "Pulls regex matches from a string",
          "Extracts keys from a class"
        ],
        "correctAnswer": "Extracts from `T` all union members that are assignable to `U` (`'click' | 'hover'`)",
        "explanation": "`Extract<T, U>` is implemented as `T extends U ? T : never`, keeping only members assignable to `U`."
      },
      {
        "question": "How does `NonNullable<T>` relate to `Exclude`?",
        "codeSnippet": "type Text = string | null | undefined;\ntype ValidText = NonNullable<Text>;",
        "options": [
          "`NonNullable<T>` deletes all null properties on objects",
          "`NonNullable<T>` is effectively `Exclude<T, null | undefined>`",
          "`NonNullable<T>` converts null to empty string",
          "They are completely unrelated"
        ],
        "correctAnswer": "`NonNullable<T>` is effectively `Exclude<T, null | undefined>`",
        "explanation": "`NonNullable<T>` removes `null` and `undefined` from the type union."
      },
      {
        "question": "Why does `Exclude` operate on unions rather than object properties?",
        "options": [
          "Because objects cannot be evaluated with conditional types",
          "Because TypeScript bans object comparisons",
          "Because distributive conditional types distribute over naked union type parameters, filtering union members individually",
          "Because `Exclude` is a JavaScript runtime function"
        ],
        "correctAnswer": "Because distributive conditional types distribute over naked union type parameters, filtering union members individually",
        "explanation": "When a naked type parameter `T` in `T extends U` receives a union, the check is applied to each member individually."
      },
      {
        "question": "What is the result of `Extract<'a' | 'b' | 'c', 'a' | 'f'>`?",
        "options": [
          "`'a' | 'b' | 'c' | 'f'`",
          "`'f'`",
          "`never`",
          "`'a'`"
        ],
        "correctAnswer": "`'a'`",
        "explanation": "Only `'a'` exists in both union operands, so only `'a'` is extracted."
      }
    ]
  },
  {
    "title": "TypeScript: Utility Types: `ReturnType` & `Parameters`",
    "description": "Function type inspection, unpacking signatures, and tuple parameter extraction.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What does `ReturnType<T>` extract?",
        "codeSnippet": "function createUser() { return { id: '1', role: 'admin' }; }\ntype User = ReturnType<typeof createUser>;",
        "options": [
          "The return type of a function type `T` (`{ id: string; role: string }`)",
          "The string name of the return statement",
          "The memory size of the return value",
          "A promise containing the return type"
        ],
        "correctAnswer": "The return type of a function type `T` (`{ id: string; role: string }`)",
        "explanation": "`ReturnType<T>` extracts what the function `T` produces when called."
      },
      {
        "question": "Why must you write `ReturnType<typeof fn>` instead of `ReturnType<fn>`?",
        "codeSnippet": "function fetchItems() { return [1, 2, 3]; }\ntype Items = ReturnType<typeof fetchItems>;",
        "options": [
          "`ReturnType` requires two arguments",
          "`fetchItems` is a runtime JavaScript value; `typeof fetchItems` queries its TypeScript type representation",
          "`typeof` converts the function to a string",
          "`fetchItems` without `typeof` deletes the function"
        ],
        "correctAnswer": "`fetchItems` is a runtime JavaScript value; `typeof fetchItems` queries its TypeScript type representation",
        "explanation": "Type-level constructs like `ReturnType<T>` require types, so values in the value space must be queried with `typeof`."
      },
      {
        "question": "What does `Parameters<T>` return?",
        "codeSnippet": "function update(id: number, active: boolean) {}\ntype UpdateArgs = Parameters<typeof update>;",
        "options": [
          "An array of string names `['id', 'active']`",
          "An object `{ id: number, active: boolean }`",
          "A tuple type representing the parameter types: `[id: number, active: boolean]`",
          "The number `2`"
        ],
        "correctAnswer": "A tuple type representing the parameter types: `[id: number, active: boolean]`",
        "explanation": "`Parameters<T>` extracts the parameter types of a function as a tuple."
      },
      {
        "question": "What does `Awaited<T>` do in modern TypeScript?",
        "codeSnippet": "type Response = Awaited<Promise<Promise<string>>>;",
        "options": [
          "Calls `.then()` on a promise at build time",
          "Pauses compiler execution until a promise resolves",
          "Converts async functions to synchronous callbacks",
          "Recursively unwraps Promise types to retrieve the final resolved type (`string`)"
        ],
        "correctAnswer": "Recursively unwraps Promise types to retrieve the final resolved type (`string`)",
        "explanation": "`Awaited<T>` models `await` operations in async functions, recursively unpacking nested Promise types."
      },
      {
        "question": "What is `ConstructorParameters<T>` used for?",
        "codeSnippet": "class Point { constructor(x: number, y: number) {} }\ntype PointArgs = ConstructorParameters<typeof Point>;",
        "options": [
          "Extracts the constructor argument types of a class constructor as a tuple (`[x: number, y: number]`)",
          "Creates a new class dynamically",
          "Validates constructor arguments at runtime",
          "Extracts the instance methods of a class"
        ],
        "correctAnswer": "Extracts the constructor argument types of a class constructor as a tuple (`[x: number, y: number]`)",
        "explanation": "`ConstructorParameters<T>` inspects the `new (...args)` signature of a class and extracts the parameter tuple."
      }
    ]
  },
  {
    "title": "TypeScript: Function Overloads & Signatures",
    "description": "Multiple call signatures, single implementation signature, and overload resolution.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "How do function overloads work in TypeScript?",
        "codeSnippet": "function format(val: string): string;\nfunction format(val: number): string;\nfunction format(val: string | number): string {\n  return String(val);\n}",
        "options": [
          "Multiple distinct function bodies with the same name are compiled into separate runtime functions",
          "Multiple overload signatures are declared without bodies, followed by one single compatible implementation signature with a body",
          "TypeScript generates a switch statement based on parameter types in emitted JS",
          "Overloads require the `overload` keyword"
        ],
        "correctAnswer": "Multiple overload signatures are declared without bodies, followed by one single compatible implementation signature with a body",
        "explanation": "TypeScript overloads declare multiple public signatures, followed by one private implementation signature that covers all variants."
      },
      {
        "question": "Can callers invoke the implementation signature directly if it is not exposed as an overload?",
        "codeSnippet": "function makeDate(timestamp: number): Date;\nfunction makeDate(m: number, d: number, y: number): Date;\nfunction makeDate(mOrTimestamp: number, d?: number, y?: number): Date { ... }",
        "options": [
          "Yes, the implementation signature is always publicly visible",
          "Only if all arguments are optional",
          "No, callers can only call signatures that match one of the explicit overload signatures (calling with 2 arguments will error)",
          "Yes, if called from another file"
        ],
        "correctAnswer": "No, callers can only call signatures that match one of the explicit overload signatures (calling with 2 arguments will error)",
        "explanation": "The implementation signature is invisible to outside callers; only the declared overload signatures are accessible."
      },
      {
        "question": "In what order does TypeScript evaluate function overload signatures during a call site?",
        "options": [
          "From bottom to top",
          "Alphabetically by parameter names",
          "By the most specific return type",
          "From top to bottom: the first matching overload signature is selected"
        ],
        "correctAnswer": "From top to bottom: the first matching overload signature is selected",
        "explanation": "TypeScript checks overloads sequentially from top to bottom, choosing the first overload that matches the call arguments."
      },
      {
        "question": "Why should union parameter types usually be preferred over function overloads when possible?",
        "options": [
          "Union types are simpler, require fewer lines, and handle callers passing dynamic union values without error",
          "Overloads are deprecated in ECMAScript",
          "Union types produce smaller bytecode",
          "Overloads cannot be used in arrow functions"
        ],
        "correctAnswer": "Union types are simpler, require fewer lines, and handle callers passing dynamic union values without error",
        "explanation": "If return types do not change based on arguments, a simple union parameter is clearer and easier for callers passing union variables."
      },
      {
        "question": "How do you declare method overloads inside an interface?",
        "codeSnippet": "interface Searcher {\n  search(query: string): string[];\n  search(id: number): string | null;\n}",
        "options": [
          "Use the `overload` keyword before each method",
          "Write multiple method signatures with the same name in the interface body",
          "Separate methods with `|`",
          "Interfaces do not support method overloads"
        ],
        "correctAnswer": "Write multiple method signatures with the same name in the interface body",
        "explanation": "In interfaces, defining multiple call signatures with the same identifier defines an overloaded method."
      }
    ]
  },
  {
    "title": "TypeScript: Custom Type Guards (`is` predicate)",
    "description": "User-defined type guards, type predicate return signatures (`arg is Type`), and safe narrowing.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is the return type syntax for a user-defined type guard?",
        "codeSnippet": "function isCat(animal: Animal): animal is Cat {\n  return (animal as Cat).meow !== undefined;\n}",
        "options": [
          "`boolean as TargetType`",
          "`guard<TargetType>`",
          "`parameterName is TargetType`",
          "`check(TargetType)`"
        ],
        "correctAnswer": "`parameterName is TargetType`",
        "explanation": "The type predicate syntax `param is Type` indicates that if the function returns `true`, TypeScript should narrow `param` to `Type`."
      },
      {
        "question": "What happens inside an `if (isCat(pet))` branch?",
        "codeSnippet": "if (isCat(pet)) {\n  pet.meow();\n}",
        "options": [
          "`pet` is converted to a Cat class instance via prototype modification",
          "`pet` becomes `any`",
          "TypeScript logs a diagnostic warning",
          "`pet` is narrowed to `Cat` within the true branch, and narrowed to exclude `Cat` in the `else` branch"
        ],
        "correctAnswer": "`pet` is narrowed to `Cat` within the true branch, and narrowed to exclude `Cat` in the `else` branch",
        "explanation": "Control flow analysis uses the type predicate to narrow the variable across both `if` and `else` branches."
      },
      {
        "question": "What runtime responsibility does a type guard function bear?",
        "options": [
          "The developer must write correct runtime boolean logic; TypeScript does not verify that the runtime checks match the type predicate",
          "TypeScript automatically writes the runtime checks inside the function body",
          "TypeScript generates byte-level checksums to guarantee memory alignment",
          "Type guards are erased at compile time and never run"
        ],
        "correctAnswer": "The developer must write correct runtime boolean logic; TypeScript does not verify that the runtime checks match the type predicate",
        "explanation": "Type predicates trust the developer's runtime logic. Returning `true` incorrectly will cause unsound type narrowing."
      },
      {
        "question": "How can type guards be used with `.filter()` to narrow array elements?",
        "codeSnippet": "const items: (string | null)[] = ['a', null, 'b'];\nconst strings: string[] = items.filter((x): x is string => x !== null);",
        "options": [
          "Using `items.filter(string)`",
          "Passing a type guard callback `(x): x is string => ...` narrows `(string | null)[]` to `string[]`",
          "Calling `items.filter<string>()`",
          "Calling `items.clean()`"
        ],
        "correctAnswer": "Passing a type guard callback `(x): x is string => ...` narrows `(string | null)[]` to `string[]`",
        "explanation": "Array.prototype.filter has an overload accepting a type predicate `(value: any) => value is T`, returning `T[]`."
      },
      {
        "question": "Can type guards use `this` as the subject of the predicate?",
        "codeSnippet": "class FileSystemNode {\n  isFile(): this is FileNode {\n    return this instanceof FileNode;\n  }\n}",
        "options": [
          "No, `this` cannot be used in type predicates",
          "Only in abstract classes",
          "Yes: `this is TargetType` narrows the instance calling the method",
          "Only in React class components"
        ],
        "correctAnswer": "Yes: `this is TargetType` narrows the instance calling the method",
        "explanation": "`this is TargetType` allows instance methods to act as type guards narrowing the calling object."
      }
    ]
  },
  {
    "title": "TypeScript: Assertion Functions (`asserts condition`)",
    "description": "Assertion signatures, non-returning validation guards, and invariants.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is an assertion function in TypeScript?",
        "codeSnippet": "function assertIsString(val: unknown): asserts val is string {\n  if (typeof val !== 'string') {\n    throw new AssertionError('Not a string');\n  }\n}",
        "options": [
          "A function that returns a boolean indicating whether an assertion passed",
          "A unit test assertion in Jest",
          "A compiler macro that deletes invalid variables",
          "A function that verifies a condition and throws an exception if false, narrowing the variable's type for the remaining execution scope"
        ],
        "correctAnswer": "A function that verifies a condition and throws an exception if false, narrowing the variable's type for the remaining execution scope",
        "explanation": "Assertion functions tell the compiler that if the function returns normally without throwing, the asserted condition holds true for subsequent code."
      },
      {
        "question": "What syntax asserts a generic boolean condition?",
        "codeSnippet": "function assert(condition: boolean, msg?: string): asserts condition {\n  if (!condition) throw new Error(msg);\n}",
        "options": [
          "`asserts condition`",
          "`returns condition`",
          "`validates condition`",
          "`check condition`"
        ],
        "correctAnswer": "`asserts condition`",
        "explanation": "`asserts condition` asserts that whatever boolean expression was passed evaluated to true."
      },
      {
        "question": "How does code following an assertion function call behave regarding types?",
        "codeSnippet": "const input: unknown = getInput();\nassertIsString(input);\nconsole.log(input.toUpperCase()); // Why does this compile?",
        "options": [
          "`input` becomes `any`",
          "TypeScript narrows `input` to `string` on subsequent lines without needing an `if` block",
          "The compiler runs the code in a sandbox first",
          "It compiles because `unknown` has a `toUpperCase` method"
        ],
        "correctAnswer": "TypeScript narrows `input` to `string` on subsequent lines without needing an `if` block",
        "explanation": "Because `assertIsString` would have thrown if `input` was not a string, reaching subsequent lines proves `input` is a `string`."
      },
      {
        "question": "What constraint applies to arrow function expressions when using assertion signatures?",
        "options": [
          "Arrow functions cannot be assertion functions",
          "Arrow functions must return `true`",
          "An explicit return type annotation (e.g. `const assertString: (x: any) => asserts x is string = ...`) is required on the arrow function",
          "Arrow functions must be asynchronous"
        ],
        "correctAnswer": "An explicit return type annotation (e.g. `const assertString: (x: any) => asserts x is string = ...`) is required on the arrow function",
        "explanation": "TypeScript requires an explicit type annotation on arrow assertion functions because assertion signatures cannot be inferred from function bodies."
      },
      {
        "question": "What happens if an assertion function returns a boolean instead of throwing an error?",
        "options": [
          "TypeScript will reject the function at compile time",
          "TypeScript converts the return value to an error",
          "The program halts",
          "TypeScript will still narrow the type on subsequent lines because the function returned normally, potentially leading to bugs"
        ],
        "correctAnswer": "TypeScript will still narrow the type on subsequent lines because the function returned normally, potentially leading to bugs",
        "explanation": "Assertion functions indicate failure exclusively by throwing; returning `false` normally signals to the compiler that the assertion passed."
      }
    ]
  },
  {
    "title": "TypeScript: Mapped Types Basics",
    "description": "Iterating over keys with `in keyof`, property modifiers, and dictionary transformations.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is the syntax for iterating over a union of keys in a mapped type?",
        "codeSnippet": "type Stringify<T> = {\n  [K in keyof T]: string;\n};",
        "options": [
          "`[K in keyof T]: ...`",
          "`[for K of keyof T]: ...`",
          "`[K extends T]: ...`",
          "`[each K in T]: ...`"
        ],
        "correctAnswer": "`[K in keyof T]: ...`",
        "explanation": "`[K in Keys]` is the fundamental mapped type syntax used to map over unions of property names."
      },
      {
        "question": "How do you remove `readonly` from all properties using a mapped type?",
        "codeSnippet": "type Mutable<T> = {\n  -readonly [K in keyof T]: T[K];\n};",
        "options": [
          "Writing `mutable [K in keyof T]`",
          "Prefixing `readonly` with a minus sign: `-readonly`",
          "Omitting `readonly`",
          "Writing `delete readonly`"
        ],
        "correctAnswer": "Prefixing `readonly` with a minus sign: `-readonly`",
        "explanation": "The `-` modifier prefix removes property modifiers (`-readonly` removes read-only, `-?` removes optionality)."
      },
      {
        "question": "What is 'key remapping' in mapped types (introduced in TypeScript 4.1)?",
        "codeSnippet": "type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};",
        "options": [
          "Renaming keys at runtime in JavaScript memory",
          "Sorting keys alphabetically",
          "Using the `as` clause to transform property keys via template literal types or filtering",
          "Replacing object keys with numbers"
        ],
        "correctAnswer": "Using the `as` clause to transform property keys via template literal types or filtering",
        "explanation": "`[K in keyof T as NewKey]` allows remapping property names dynamically."
      },
      {
        "question": "How do you filter out keys in a mapped type using key remapping?",
        "codeSnippet": "type OnlyStrings<T> = {\n  [K in keyof T as T[K] extends string ? K : never]: T[K];\n};",
        "options": [
          "Setting the value to `undefined`",
          "Using `delete K`",
          "Using `filter(K)`",
          "Remapping the key to `never` in the `as` clause excludes that property from the output type"
        ],
        "correctAnswer": "Remapping the key to `never` in the `as` clause excludes that property from the output type",
        "explanation": "Remapping a key to `never` instructs TypeScript to omit that property entirely from the resulting object shape."
      },
      {
        "question": "Can a mapped type be declared using the `interface` keyword?",
        "codeSnippet": "// interface MyMapped<T> { [K in keyof T]: string; }",
        "options": [
          "No, mapped types must be declared using `type` aliases",
          "Yes, interfaces and type aliases are identical here",
          "Yes, but only with index signatures",
          "Only in ambient declaration files"
        ],
        "correctAnswer": "No, mapped types must be declared using `type` aliases",
        "explanation": "Mapped types cannot be declared with `interface`; they require `type` alias definitions."
      }
    ]
  },
  {
    "title": "TypeScript: Template Literal Types Basics",
    "description": "String concatenation at the type level, intrinsics (`Uppercase`, `Lowercase`, `Capitalize`).",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What does a template literal type produce when given union types?",
        "codeSnippet": "type Vertical = 'top' | 'bottom';\ntype Horizontal = 'left' | 'right';\ntype Position = `${Vertical}-${Horizontal}`;",
        "options": [
          "A single string `'top-bottom-left-right'`",
          "The Cartesian product union of all combinations: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`",
          "An array of 4 strings",
          "A regular expression"
        ],
        "correctAnswer": "The Cartesian product union of all combinations: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`",
        "explanation": "Template literal types distribute over unions, producing a union containing all possible permutations."
      },
      {
        "question": "Which built-in string intrinsic converts the first character of a string literal type to uppercase?",
        "codeSnippet": "type Event = 'click';\ntype HandlerName = `on${Capitalize<Event>}`; // 'onClick'",
        "options": [
          "`Uppercase<T>`",
          "`ToTitle<T>`",
          "`Capitalize<T>`",
          "`FirstUpper<T>`"
        ],
        "correctAnswer": "`Capitalize<T>`",
        "explanation": "`Capitalize<StringType>` converts the first character of string literal types to uppercase."
      },
      {
        "question": "What intrinsic converts all characters in a string literal type to lowercase?",
        "codeSnippet": "type Normalized = Lowercase<'API_KEY'>; // 'api_key'",
        "options": [
          "`ToLowerCase<T>`",
          "`Downcase<T>`",
          "`Uncapitalize<T>`",
          "`Lowercase<T>`"
        ],
        "correctAnswer": "`Lowercase<T>`",
        "explanation": "`Lowercase<StringType>` converts all letters in the string literal to lowercase."
      },
      {
        "question": "How can template literal types be used to type CSS unit strings like `10px` or `2rem`?",
        "codeSnippet": "type CSSSize = `${number}${'px' | 'rem' | 'em' | '%'}`;",
        "options": [
          "`${number}${'px' | 'rem' | 'em' | '%'}`",
          "`number + ('px' | 'rem')`",
          "`RegExp<number>`",
          "`CSSUnit(number)`"
        ],
        "correctAnswer": "`${number}${'px' | 'rem' | 'em' | '%'}`",
        "explanation": "Interpolating `number` inside template literal types matches any valid numeric prefix string followed by the specified units."
      },
      {
        "question": "What does `Uncapitalize<T>` do?",
        "codeSnippet": "type Prop = Uncapitalize<'UserName'>;",
        "options": [
          "Converts the whole string to lowercase",
          "Converts the first character to lowercase (`'userName'`)",
          "Removes all capitals",
          "Inverts casing"
        ],
        "correctAnswer": "Converts the first character to lowercase (`'userName'`)",
        "explanation": "`Uncapitalize<T>` specifically converts only the first character to lowercase."
      }
    ]
  },
  {
    "title": "TypeScript: Declaration Merging (Interfaces & Namespaces)",
    "description": "Augmenting existing types, declaration merging rules, and namespace extension.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What happens when two interface declarations share the same identifier in the same scope?",
        "codeSnippet": "interface Box { height: number; }\ninterface Box { width: number; }",
        "options": [
          "A compile-time error: Duplicate identifier 'Box'",
          "The first declaration is discarded",
          "Declaration merging: they combine into a single `Box` interface with both `height` and `width`",
          "`Box` becomes a union type"
        ],
        "correctAnswer": "Declaration merging: they combine into a single `Box` interface with both `height` and `width`",
        "explanation": "Interfaces in TypeScript are open to declaration merging, allowing third-party libraries and modules to be augmented."
      },
      {
        "question": "How do you augment the global `Window` interface in a web application?",
        "codeSnippet": "declare global {\n  interface Window {\n    analytics: any;\n  }\n}",
        "options": [
          "By modifying the `lib.dom.d.ts` file directly",
          "By creating a `class Window`",
          "Using `window.prototype.analytics = ...`",
          "Inside `declare global { interface Window { ... } }`"
        ],
        "correctAnswer": "Inside `declare global { interface Window { ... } }`",
        "explanation": "`declare global` allows module files to merge declarations into the global scope."
      },
      {
        "question": "Can two `type` aliases with identical names merge in TypeScript?",
        "codeSnippet": "type User = { id: string };\ntype User = { name: string };",
        "options": [
          "No, duplicate type alias identifiers always throw a compilation error",
          "Yes, they merge identically to interfaces",
          "Yes, if they are both object types",
          "Only in `.d.ts` files"
        ],
        "correctAnswer": "No, duplicate type alias identifiers always throw a compilation error",
        "explanation": "Type aliases are closed to declaration merging; attempting to redeclare a type alias triggers an error."
      },
      {
        "question": "Can an interface merge with a `class` of the same name?",
        "codeSnippet": "class Album { label: string = 'EMI'; }\ninterface Album { artist: string; }",
        "options": [
          "No, classes cannot merge with interfaces",
          "Yes, the interface adds additional property requirements to the class instance shape",
          "Yes, but only if the class is abstract",
          "Only if the interface has no methods"
        ],
        "correctAnswer": "Yes, the interface adds additional property requirements to the class instance shape",
        "explanation": "An interface can merge with a class to describe additional properties present on instances."
      },
      {
        "question": "What is the conflict rule when merging two interfaces that declare the same non-function property name?",
        "codeSnippet": "interface A { x: number; }\ninterface A { x: string; }",
        "options": [
          "The property becomes a union (`number | string`)",
          "The second declaration overrides the first",
          "Subsequent declarations must have the exact same type; conflicting types cause a compile-time error",
          "The property becomes `any`"
        ],
        "correctAnswer": "Subsequent declarations must have the exact same type; conflicting types cause a compile-time error",
        "explanation": "Non-function members with the same name across merged interfaces must be of identical types."
      }
    ]
  },
  {
    "title": "TypeScript: Ambient Declarations & `.d.ts` Files",
    "description": "Type definition files, `declare` keyword, module augmentation, and typing untyped JS.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What does the `declare` keyword do in TypeScript?",
        "codeSnippet": "declare const __DEV__: boolean;",
        "options": [
          "Initializes a variable to undefined",
          "Installs a global npm package",
          "Exports the variable as a WebAssembly module",
          "Tells the compiler that a variable or entity exists at runtime in the global environment, emitting zero JavaScript code"
        ],
        "correctAnswer": "Tells the compiler that a variable or entity exists at runtime in the global environment, emitting zero JavaScript code",
        "explanation": "`declare` creates ambient declarations that exist only for type checking; no executable code is generated."
      },
      {
        "question": "What is the purpose of `.d.ts` files?",
        "codeSnippet": "// my-library.d.ts",
        "options": [
          "Declaration files containing only type information, descriptions of JavaScript libraries, and ambient declarations without runtime implementations",
          "Dynamic TypeScript scripts executed by the node runtime",
          "Debugging configuration files",
          "Data transfer schema files"
        ],
        "correctAnswer": "Declaration files containing only type information, descriptions of JavaScript libraries, and ambient declarations without runtime implementations",
        "explanation": "`.d.ts` files supply type definitions for existing JavaScript code, npm packages, or external assets."
      },
      {
        "question": "How do you tell TypeScript to allow importing image files (e.g. `.png` or `.svg`) in a frontend project?",
        "codeSnippet": "declare module '*.png' {\n  const src: string;\n  export default src;\n}",
        "options": [
          "By adding `.png` to the `include` array in tsconfig",
          "Using a wildcard ambient module declaration: `declare module '*.png' { ... }`",
          "By installing `@types/png` from npm",
          "By converting images to base64 strings"
        ],
        "correctAnswer": "Using a wildcard ambient module declaration: `declare module '*.png' { ... }`",
        "explanation": "Wildcard ambient module declarations inform TypeScript how to type non-code assets imported via bundlers."
      },
      {
        "question": "What does `declare module 'legacy-lib'` do when working with an untyped npm package?",
        "codeSnippet": "declare module 'legacy-lib';",
        "options": [
          "Downloads types from DefinitelyTyped",
          "Imports the library into window",
          "Shorthand ambient module declaration: types all imports from `'legacy-lib'` as `any`, suppressing missing type declaration errors",
          "Converts legacy CommonJS to ESM"
        ],
        "correctAnswer": "Shorthand ambient module declaration: types all imports from `'legacy-lib'` as `any`, suppressing missing type declaration errors",
        "explanation": "A bare `declare module 'pkg';` allows importing without errors, treating all exports as `any`."
      },
      {
        "question": "What compiler flag generates `.d.ts` files automatically when compiling a TypeScript project?",
        "codeSnippet": "{\n  \"compilerOptions\": {\n    \"declaration\": true\n  }\n}",
        "options": [
          "`\"emitTypes\": true`",
          "`\"generateDts\": true`",
          "`\"typesOnly\": true`",
          "`\"declaration\": true`"
        ],
        "correctAnswer": "`\"declaration\": true`",
        "explanation": "`declaration: true` directs the compiler to generate corresponding `.d.ts` files for every compiled TypeScript file."
      }
    ]
  },
  {
    "title": "TypeScript: Index Signatures vs Records",
    "description": "Dynamic dictionary keys, string vs symbol indexers, and comparing index signatures to Record.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What is the syntax for an index signature on an interface?",
        "codeSnippet": "interface ErrorMap {\n  [errorCode: string]: string;\n}",
        "options": [
          "`[key: string]: string;`",
          "`key: string -> string;`",
          "`dictionary<string, string>;`",
          "`keys: Array<string>;`"
        ],
        "correctAnswer": "`[key: string]: string;`",
        "explanation": "Index signatures are defined with square brackets: `[keyName: KeyType]: ValueType`."
      },
      {
        "question": "Can an index signature use a union of string literals as its key type?",
        "codeSnippet": "// interface Bad { [key: 'a' | 'b']: number; }",
        "options": [
          "Yes, index signatures fully support literal unions",
          "No, index signature parameter types must be `string`, `number`, `symbol`, or template literal; literal unions require a mapped type or `Record`",
          "Only if the interface has no other properties",
          "Only in strict mode"
        ],
        "correctAnswer": "No, index signature parameter types must be `string`, `number`, `symbol`, or template literal; literal unions require a mapped type or `Record`",
        "explanation": "Index signatures do not support union literal keys. Mapped types (`[K in 'a' | 'b']: number`) or `Record` must be used instead."
      },
      {
        "question": "What rule applies to explicitly declared properties when an index signature is present on an interface?",
        "codeSnippet": "interface Data {\n  [key: string]: number;\n  // name: string; // Error!\n  count: number; // OK\n}",
        "options": [
          "Explicit properties cannot be declared if an index signature exists",
          "Explicit properties must be optional",
          "All explicit properties must have types assignable to the index signature's return type (e.g. `number`)",
          "The index signature must be declared last"
        ],
        "correctAnswer": "All explicit properties must have types assignable to the index signature's return type (e.g. `number`)",
        "explanation": "Because an index signature asserts that accessing ANY string property returns the index type, all specific string properties must be subtypes of that index type."
      },
      {
        "question": "How do numeric index signatures interact with string index signatures in the same interface?",
        "codeSnippet": "interface Cache {\n  [n: number]: HTMLDivElement;\n  [s: string]: Node;\n}",
        "options": [
          "They cannot coexist in the same interface",
          "The string index must be a subtype of the numeric index",
          "Numeric indices take precedence at runtime",
          "The numeric index return type must be assignable to the string index return type (because JavaScript converts numbers to strings when indexing)"
        ],
        "correctAnswer": "The numeric index return type must be assignable to the string index return type (because JavaScript converts numbers to strings when indexing)",
        "explanation": "JavaScript converts numeric keys into strings (`obj[0]` is `obj['0']`), so the numeric index type must be a subtype of the string index type."
      },
      {
        "question": "Which of the following is a key advantage of `Record<'a' | 'b', number>` over an index signature?",
        "options": [
          "`Record` enforces that all keys in the union must be explicitly present on the object",
          "`Record` compiles to faster JavaScript",
          "`Record` allows numbers to be converted to booleans",
          "`Record` freezes the object"
        ],
        "correctAnswer": "`Record` enforces that all keys in the union must be explicitly present on the object",
        "explanation": "Index signatures treat all keys as potentially present, whereas `Record<Union, T>` requires every key in the union to be defined."
      }
    ]
  },
  {
    "title": "TypeScript: React Props & Event Handler Typing",
    "description": "Component prop typing, children types, and synthetic event typing in React.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "Which type in `@types/react` accurately types the `children` prop for any renderable React node?",
        "codeSnippet": "interface CardProps {\n  title: string;\n  children: React.ReactNode;\n}",
        "options": [
          "`React.ReactElement`",
          "`React.ReactNode`",
          "`JSX.Element`",
          "`React.Component`"
        ],
        "correctAnswer": "`React.ReactNode`",
        "explanation": "`React.ReactNode` covers all valid renderable items in JSX (elements, strings, numbers, fragments, portals, boolean, null, undefined)."
      },
      {
        "question": "How do you type an `onChange` handler for an HTML input element in React?",
        "codeSnippet": "const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n  console.log(e.target.value);\n};",
        "options": [
          "`React.InputEvent`",
          "`HTMLInputEvent`",
          "`React.ChangeEvent<HTMLInputElement>`",
          "`Event<HTMLInputElement>`"
        ],
        "correctAnswer": "`React.ChangeEvent<HTMLInputElement>`",
        "explanation": "React wraps native events in synthetic events: `React.ChangeEvent<HTMLInputElement>` provides typed access to `e.target.value`."
      },
      {
        "question": "What is the difference between `React.ReactNode` and `React.ReactElement`?",
        "options": [
          "`React.ReactNode` is only for class components",
          "`React.ReactElement` includes booleans and null",
          "They are identical aliases",
          "`React.ReactElement` represents an actual JSX element object (like `<div />`); `React.ReactNode` includes elements plus primitives (strings, numbers, null, undefined)"
        ],
        "correctAnswer": "`React.ReactElement` represents an actual JSX element object (like `<div />`); `React.ReactNode` includes elements plus primitives (strings, numbers, null, undefined)",
        "explanation": "`ReactElement` is specifically the object returned by `React.createElement`. `ReactNode` is the union of everything React can render."
      },
      {
        "question": "How do you type a button click event in React?",
        "codeSnippet": "function handleClick(e: React.MouseEvent<HTMLButtonElement>) {\n  e.preventDefault();\n}",
        "options": [
          "`React.MouseEvent<HTMLButtonElement>`",
          "`React.ClickEvent`",
          "`MouseEvent<Button>`",
          "`PointerEvent`"
        ],
        "correctAnswer": "`React.MouseEvent<HTMLButtonElement>`",
        "explanation": "`React.MouseEvent<HTMLButtonElement>` correctly types mouse click events originating from button elements."
      },
      {
        "question": "Why is explicit typing of props preferred over using `React.FC<Props>` in modern React TypeScript codebases?",
        "codeSnippet": "// Preferred: function Button({ title }: ButtonProps) { ... }\n// vs const Button: React.FC<ButtonProps> = ...",
        "options": [
          "`React.FC` is deprecated and deleted from React 19",
          "Standard function signatures are simpler, support generics cleanly, and avoid legacy implicit children issues in older @types/react",
          "`React.FC` causes runtime performance overhead in production builds",
          "`React.FC` cannot return JSX"
        ],
        "correctAnswer": "Standard function signatures are simpler, support generics cleanly, and avoid legacy implicit children issues in older @types/react",
        "explanation": "Declaring regular function components (`function Component(props: Props)`) avoids subtle issues with defaultProps, generics, and unnecessary wrapping."
      }
    ]
  },
  {
    "title": "TypeScript: Satisfies Operator (`satisfies`)",
    "description": "Validating object shapes without widening or losing specific literal type inference.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "What was the main motivation for introducing the `satisfies` operator in TypeScript 4.9?",
        "codeSnippet": "type Colors = Record<string, string | number[]>;\nconst palette = {\n  red: [255, 0, 0],\n  green: '#00ff00',\n} satisfies Colors;\npalette.green.toUpperCase(); // Allowed!",
        "options": [
          "To convert types to JSON at compile time",
          "To replace the `as` operator completely",
          "To validate that an expression matches a type WITHOUT widening the inferred type to that type",
          "To enforce runtime schema validation"
        ],
        "correctAnswer": "To validate that an expression matches a type WITHOUT widening the inferred type to that type",
        "explanation": "`satisfies` checks that the value conforms to the interface/type while retaining the exact, narrow inferred types of each property."
      },
      {
        "question": "What would happen in the previous snippet if `: Colors` was used instead of `satisfies Colors`?",
        "codeSnippet": "const palette: Colors = { red: [255, 0, 0], green: '#00ff00' };\n// palette.green.toUpperCase(); // Error!",
        "options": [
          "`palette.green` would become `any`",
          "`palette.green` would be converted to an array",
          "It would compile without issue",
          "`palette.green` is widened to `string | number[]`, so calling `.toUpperCase()` throws a compile error: Property does not exist on type 'number[]'"
        ],
        "correctAnswer": "`palette.green` is widened to `string | number[]`, so calling `.toUpperCase()` throws a compile error: Property does not exist on type 'number[]'",
        "explanation": "Type annotation widens each property to the union `string | number[]`, losing the knowledge that `green` is specifically a string."
      },
      {
        "question": "How does `satisfies` catch misspelled property keys?",
        "codeSnippet": "type Config = { timeout?: number; retries?: number };\nconst cfg = {\n  timeout: 5000,\n  retry: 3, // Error!\n} satisfies Config;",
        "options": [
          "It validates that `cfg` satisfies `Config`, catching excess or misspelled properties immediately",
          "It ignores extra properties silently",
          "It renames `retry` to `retries`",
          "It sets `retry` to undefined"
        ],
        "correctAnswer": "It validates that `cfg` satisfies `Config`, catching excess or misspelled properties immediately",
        "explanation": "`satisfies` enforces that the object literal strictly satisfies the target type, flagging unexpected properties."
      },
      {
        "question": "Can `satisfies` be combined with `as const`?",
        "codeSnippet": "const routes = {\n  home: '/',\n  admin: '/admin',\n} as const satisfies Record<string, string>;",
        "options": [
          "No, combining them causes a syntax error",
          "Yes, producing a deeply readonly, literal-inferred object that also satisfies the contract",
          "Only in TypeScript 5.5+",
          "Only inside class bodies"
        ],
        "correctAnswer": "Yes, producing a deeply readonly, literal-inferred object that also satisfies the contract",
        "explanation": "`as const satisfies Target` combines literal immutability with contract conformance validation."
      },
      {
        "question": "Does the `satisfies` operator generate any runtime JavaScript code?",
        "options": [
          "Yes, it calls an internal `__satisfies` helper",
          "Yes, it runs `instanceof` checks",
          "No, `satisfies` is completely erased during compilation and produces zero runtime overhead",
          "Yes, it freezes the object"
        ],
        "correctAnswer": "No, `satisfies` is completely erased during compilation and produces zero runtime overhead",
        "explanation": "Like all TypeScript type annotations and assertions, `satisfies` is purely compile-time."
      }
    ]
  },
  {
    "title": "TypeScript: Module Resolution & Path Aliases",
    "description": "Import path mapping, baseUrl, paths in tsconfig, and ESM resolution rules.",
    "difficulty": "mid",
    "tags": [
      "TypeScript",
      "Frontend"
    ],
    "timeLimitMinutes": 10,
    "questions": [
      {
        "question": "Which `tsconfig.json` options configure path aliases like `@components/Button`?",
        "codeSnippet": "{\n  \"compilerOptions\": {\n    \"baseUrl\": \".\",\n    \"paths\": {\n      \"@components/*\": [\"src/components/*\"]\n    }\n  }\n}",
        "options": [
          "`\"alias\"` and `\"resolve\"`",
          "`\"map\"` and `\"redirect\"`",
          "`\"importPaths\"`",
          "`\"baseUrl\"` and `\"paths\"`"
        ],
        "correctAnswer": "`\"baseUrl\"` and `\"paths\"`",
        "explanation": "TypeScript uses `baseUrl` to set the base lookup directory and `paths` to map alias patterns to relative disk paths."
      },
      {
        "question": "Does configuring `paths` in `tsconfig.json` automatically rewrite import paths in emitted JavaScript files during `tsc` build?",
        "codeSnippet": "// Source: import { Button } from '@components/Button';\n// Emitted JS: import { Button } from '@components/Button'; // Not rewritten!",
        "options": [
          "No, `tsc` does NOT rewrite module specifier strings; a bundler (Vite, Webpack, esbuild) or loader is required to resolve aliases at runtime",
          "Yes, `tsc` converts all aliases into relative `../` paths automatically",
          "Yes, if `moduleResolution` is node",
          "Only in Windows environments"
        ],
        "correctAnswer": "No, `tsc` does NOT rewrite module specifier strings; a bundler (Vite, Webpack, esbuild) or loader is required to resolve aliases at runtime",
        "explanation": "`tsc` does not alter import specifiers. Bundlers or path mapping tools (like `tsconfig-paths`) must resolve them for runtime."
      },
      {
        "question": "Why are explicit file extensions (like `.js`) required in relative ESM imports under `\"moduleResolution\": \"nodenext\"`?",
        "codeSnippet": "import { helper } from './utils.js'; // Even when utils is a TypeScript file!",
        "options": [
          "TypeScript cannot find files without extensions",
          "Node.js native ECMAScript Modules (ESM) require full specifiers with file extensions, and TypeScript preserves specifiers verbatim",
          "It speeds up file lookup by 50%",
          "Node.js deletes extensionless files"
        ],
        "correctAnswer": "Node.js native ECMAScript Modules (ESM) require full specifiers with file extensions, and TypeScript preserves specifiers verbatim",
        "explanation": "Node.js native ESM mandates file extensions in relative specifiers; TypeScript compiles `./utils.ts` to `./utils.js`, so you import `./utils.js` in source."
      },
      {
        "question": "What does `import type { User } from './types'` do?",
        "codeSnippet": "import type { User } from './types';",
        "options": [
          "Imports the type dynamically at runtime",
          "Requires the file to be a `.d.ts` file",
          "Explicitly imports `User` as a type-only import, guaranteeing it is completely erased and emits no runtime JavaScript `require` or `import`",
          "Marks the import as deprecated"
        ],
        "correctAnswer": "Explicitly imports `User` as a type-only import, guaranteeing it is completely erased and emits no runtime JavaScript `require` or `import`",
        "explanation": "Type-only imports are guaranteed to be erased at compile time, eliminating circular runtime dependencies and side effects."
      },
      {
        "question": "What tsconfig setting enforces the use of `import type` for type-only imports?",
        "codeSnippet": "{\n  \"compilerOptions\": {\n    \"verbatimModuleSyntax\": true\n  }\n}",
        "options": [
          "`strictImports: true`",
          "`noValueImports: true`",
          "`pureModules: true`",
          "`verbatimModuleSyntax: true` (or `isolatedModules: true` with `importsNotUsedAsValues`)"
        ],
        "correctAnswer": "`verbatimModuleSyntax: true` (or `isolatedModules: true` with `importsNotUsedAsValues`)",
        "explanation": "`verbatimModuleSyntax: true` strictly demands `import type` for non-value imports, simplifying bundling and transpilation."
      }
    ]
  }
];
