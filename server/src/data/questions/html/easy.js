export const htmlEasyChallenges = [
  {
    "title": "HTML & CSS: Semantic Tags & Document Structure",
    "description": "Header, nav, main, article, section, footer, and document outline hierarchy.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "Why should semantic tags like `<main>` and `<nav>` be preferred over generic `<div>` elements?",
        "options": [
          "They provide machine-readable landmarks for assistive screen readers and improve search engine indexing and accessibility",
          "They render 10x faster in browser engines",
          "They apply default CSS grid styles automatically",
          "Web browsers reject pages that use only `<div>` tags"
        ],
        "correctAnswer": "They provide machine-readable landmarks for assistive screen readers and improve search engine indexing and accessibility",
        "explanation": "Semantic elements communicate structural meaning to browsers, screen readers, and search engines, creating proper accessibility landmarks."
      },
      {
        "question": "How many `<main>` elements should be visible and unhidden per HTML document?",
        "codeSnippet": "<body>\n  <header>...</header>\n  <main id='content'>...</main>\n  <footer>...</footer>\n</body>",
        "language": "html",
        "options": [
          "Exactly one active `<main>` element representing the primary content unique to that page",
          "As many as there are sections",
          "One for every article",
          "None; `<main>` is optional and deprecated"
        ],
        "correctAnswer": "Exactly one active `<main>` element representing the primary content unique to that page",
        "explanation": "The W3C/WHATWG spec specifies that a document must not have more than one active `<main>` element."
      },
      {
        "question": "What is the semantic distinction between `<article>` and `<section>`?",
        "options": [
          "`<article>` represents self-contained, independently distributable content (like a blog post); `<section>` represents a thematic grouping of content",
          "`<article>` is only for news websites; `<section>` is for eCommerce",
          "`<section>` must always contain an `<h1>`; `<article>` cannot",
          "There is no difference; they are interchangeable"
        ],
        "correctAnswer": "`<article>` represents self-contained, independently distributable content (like a blog post); `<section>` represents a thematic grouping of content",
        "explanation": "`<article>` is independent content that makes sense on its own (e.g. RSS feed item). `<section>` groups related content within a broader document."
      },
      {
        "question": "What is the role of the `<meta name='viewport' content='width=device-width, initial-scale=1.0'>` tag?",
        "options": [
          "Tells mobile browsers to match screen width in CSS pixels and disables artificial 980px desktop zooming",
          "Sets the viewport resolution to 4K",
          "Prevents the user from resizing the browser window",
          "Forces dark mode on mobile devices"
        ],
        "correctAnswer": "Tells mobile browsers to match screen width in CSS pixels and disables artificial 980px desktop zooming",
        "explanation": "The viewport meta tag establishes responsive rendering on mobile devices by setting the viewport width to the device's physical screen width."
      },
      {
        "question": "Which HTML element should wrap navigational links to identify a primary navigation menu?",
        "options": [
          "<nav>",
          "<menu>",
          "<navbar>",
          "<links>"
        ],
        "correctAnswer": "<nav>",
        "explanation": "`<nav>` is the semantic HTML element designated for major navigational blocks."
      }
    ]
  },
  {
    "title": "HTML & CSS: CSS Box Model & `box-sizing: border-box`",
    "description": "Margin, border, padding, content box, box-sizing resetting, and margin collapsing.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "Under default `box-sizing: content-box`, what is the total rendered width of a `div` with `width: 200px; padding: 20px; border: 5px solid black;`?",
        "options": [
          "250px (200px content + 40px horizontal padding + 10px horizontal border)",
          "200px",
          "225px",
          "240px"
        ],
        "correctAnswer": "250px (200px content + 40px horizontal padding + 10px horizontal border)",
        "explanation": "With `content-box`, padding and borders are added on top of the specified width: `200 + 20 + 20 + 5 + 5 = 250px`."
      },
      {
        "question": "Why do modern CSS resets include `* { box-sizing: border-box; }`?",
        "codeSnippet": "*, *::before, *::after {\n  box-sizing: border-box;\n}",
        "language": "css",
        "options": [
          "Padding and borders are absorbed inside the declared `width` and `height`, preventing layout overflow and simplifying dimension math",
          "It makes all elements display as block elements",
          "It enables hardware GPU acceleration",
          "It centers all elements horizontally"
        ],
        "correctAnswer": "Padding and borders are absorbed inside the declared `width` and `height`, preventing layout overflow and simplifying dimension math",
        "explanation": "`border-box` includes padding and borders within the element's total width and height, preventing accidental line breaks and overflow."
      },
      {
        "question": "What is CSS margin collapsing and when does it occur?",
        "codeSnippet": ".top-box { margin-bottom: 30px; }\n.bottom-box { margin-top: 20px; }",
        "language": "css",
        "options": [
          "Adjacent vertical margins of block-level elements in normal flow collapse into a single margin equal to the larger of the two (30px)",
          "Margins add together to produce 50px",
          "The smaller margin cancels out the larger margin (yielding 10px)",
          "Horizontal margins collapse to zero on mobile"
        ],
        "correctAnswer": "Adjacent vertical margins of block-level elements in normal flow collapse into a single margin equal to the larger of the two (30px)",
        "explanation": "Vertical margins collapse in normal flow: the combined space between elements becomes `max(30px, 20px) = 30px`."
      },
      {
        "question": "Do horizontal margins on adjacent inline-block elements collapse?",
        "options": [
          "No, horizontal margins never collapse under any circumstances",
          "Yes, they collapse if both elements are flex items",
          "Yes, if they exceed 50px",
          "Only in WebKit browsers"
        ],
        "correctAnswer": "No, horizontal margins never collapse under any circumstances",
        "explanation": "Margin collapsing only applies to top and bottom vertical margins of block boxes in standard flow."
      },
      {
        "question": "Which layer sits immediately outside the element's padding box?",
        "options": [
          "Border",
          "Margin",
          "Outline",
          "Content"
        ],
        "correctAnswer": "Border",
        "explanation": "From inside to outside: Content -> Padding -> Border -> Margin."
      }
    ]
  },
  {
    "title": "HTML & CSS: CSS Selectors & Specificity Hierarchy",
    "description": "Classes, IDs, element selectors, pseudo-classes, attribute selectors, and !important.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "What is the specificity calculation for the selector `#nav ul.menu li a:hover`?",
        "options": [
          "1 ID, 2 Classes/Pseudo-classes, 3 Elements (Specificity: 1, 2, 3)",
          "0 IDs, 3 Classes, 2 Elements",
          "1 ID, 1 Class, 4 Elements",
          "Specificity score of 12"
        ],
        "correctAnswer": "1 ID, 2 Classes/Pseudo-classes, 3 Elements (Specificity: 1, 2, 3)",
        "explanation": "`#nav` = 1 ID (1,0,0); `.menu` and `:hover` = 2 classes/pseudo-classes (0,2,0); `ul`, `li`, `a` = 3 elements (0,0,3). Total = (1, 2, 3)."
      },
      {
        "question": "How does `!important` affect the CSS cascade and specificity rules?",
        "options": [
          "It overrides standard specificity weight, taking precedence over all other normal author declarations regardless of selector strength",
          "It doubles the ID count of the selector",
          "It makes the CSS rule execute in JavaScript",
          "It is ignored by modern browsers"
        ],
        "correctAnswer": "It overrides standard specificity weight, taking precedence over all other normal author declarations regardless of selector strength",
        "explanation": "`!important` jumps to the important declarations cascade origin, beating standard specificity until countered by another `!important`."
      },
      {
        "question": "What does the child combinator `>` match versus the descendant combinator (space)?",
        "codeSnippet": "/* Direct child: */\ndiv > p { color: blue; }\n\n/* Descendant: */\ndiv p { color: red; }",
        "language": "css",
        "options": [
          "`>` matches direct immediate children only; a space matches any descendant regardless of nesting depth",
          "`>` matches siblings; space matches children",
          "`>` matches only the first paragraph",
          "There is no difference"
        ],
        "correctAnswer": "`>` matches direct immediate children only; a space matches any descendant regardless of nesting depth",
        "explanation": "`div > p` selects `<p>` whose immediate parent is a `<div>`. `div p` selects any `<p>` nested anywhere inside a `<div>`."
      },
      {
        "question": "What does the attribute selector `a[href^='https']` select?",
        "options": [
          "Anchor links whose `href` attribute begins with the exact string 'https'",
          "Anchor links whose `href` ends with 'https'",
          "Anchor links whose `href` contains 'https' anywhere",
          "All secure links validated with an SSL certificate"
        ],
        "correctAnswer": "Anchor links whose `href` begins with the exact string 'https'",
        "explanation": "`^=` matches strings starting with the value. `$=` matches the ending. `*=` matches anywhere."
      },
      {
        "question": "Does the `:not()` pseudo-class add specificity weight to a selector?",
        "codeSnippet": "button:not(.disabled) { opacity: 1; }",
        "language": "css",
        "options": [
          "No, `:not()` has zero specificity",
          "Yes, `:not()` adds the specificity of its argument selector (here `.disabled` adds 1 class: (0, 1, 1))",
          "It negates the element specificity to 0",
          "It adds an ID weight"
        ],
        "correctAnswer": "Yes, `:not()` adds the specificity of its argument selector (here `.disabled` adds 1 class: (0, 1, 1))",
        "explanation": "`:not()` itself does not add weight, but the most specific selector in its argument list is added to the total specificity."
      }
    ]
  },
  {
    "title": "HTML & CSS: Typography, Fonts & Text Styling",
    "description": "font-family fallback chains, web fonts, line-height, text-overflow, and font-weight.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "Why should a generic font family fallback (like `sans-serif` or `serif`) always be placed at the end of a `font-family` declaration?",
        "codeSnippet": "body {\n  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;\n}",
        "language": "css",
        "options": [
          "CSS syntax requires at least 4 fonts in every declaration",
          "If the custom fonts fail to load or are not installed, the browser falls back to the system's default generic font of that category",
          "It forces the browser to load Google Fonts asynchronously",
          "It enables subpixel font smoothing"
        ],
        "correctAnswer": "If the custom fonts fail to load or are not installed, the browser falls back to the system's default generic font of that category",
        "explanation": "Browsers evaluate the font list from left to right. The generic fallback ensures text renders properly if preceding fonts are unavailable."
      },
      {
        "question": "Why is a unitless `line-height: 1.5;` strongly preferred over fixed unit values like `line-height: 24px;`?",
        "options": [
          "Unitless line-height renders in vector format",
          "Unitless line-height scales proportionally when child elements change their `font-size`, preventing text overlap bugs",
          "`line-height: 24px` is invalid CSS",
          "Fixed units crash Safari on mobile"
        ],
        "correctAnswer": "Unitless line-height scales proportionally when child elements change their `font-size`, preventing text overlap bugs",
        "explanation": "Unitless values inherit as a multiplier. If a child increases its font size to 32px, `1.5` scales line-height to 48px, preventing text collisions."
      },
      {
        "question": "Which combination of CSS properties truncates long single-line text with an ellipsis (`...`)?",
        "codeSnippet": ".truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}",
        "language": "css",
        "options": [
          "`text-truncate: true` and `width: auto`",
          "`white-space: nowrap`, `overflow: hidden`, and `text-overflow: ellipsis`",
          "`overflow: ellipsis` only",
          "`display: inline-block` and `clip-path: ellipse()`"
        ],
        "correctAnswer": "`white-space: nowrap`, `overflow: hidden`, and `text-overflow: ellipsis`",
        "explanation": "All three properties are required: `white-space: nowrap` prevents wrapping, `overflow: hidden` clips overflow, and `text-overflow: ellipsis` renders the dots."
      },
      {
        "question": "What numeric value corresponds to `font-weight: bold` in standard CSS?",
        "options": [
          "400",
          "700",
          "500",
          "900"
        ],
        "correctAnswer": "700",
        "explanation": "In standard CSS font-weight mapping: 400 is `normal`, and 700 is `bold`."
      },
      {
        "question": "What does `font-display: swap;` do inside an `@font-face` rule?",
        "options": [
          "Swaps between serif and sans-serif on hover",
          "Renders fallback text immediately and swaps in the custom web font as soon as it finishes downloading, preventing invisible text (FOIT)",
          "Swaps the font for emoji on mobile devices",
          "Compresses the font using WOFF2"
        ],
        "correctAnswer": "Renders fallback text immediately and swaps in the custom web font as soon as it finishes downloading, preventing invisible text (FOIT)",
        "explanation": "`font-display: swap` avoids the Flash of Invisible Text (FOIT) by immediately showing a system fallback font until the custom font loads."
      }
    ]
  },
  {
    "title": "HTML & CSS: Flexbox Fundamentals (Direction & Justify)",
    "description": "display: flex, flex-direction (row, column), justify-content, and main axis vs cross axis.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "When `flex-direction: column;` is set on a flex container, what is the main axis?",
        "options": [
          "The horizontal axis (left to right)",
          "The vertical axis (top to bottom)",
          "The diagonal axis",
          "There is no main axis in column mode"
        ],
        "correctAnswer": "The vertical axis (top to bottom)",
        "explanation": "`flex-direction` determines the main axis. Setting it to `column` or `column-reverse` aligns the main axis vertically."
      },
      {
        "question": "Which `justify-content` value places equal space between flex items, with the first item pushed to the start and last item to the end?",
        "codeSnippet": ".navbar {\n  display: flex;\n  /* Which value spaces brand and nav links to opposite edges? */\n  justify-content: space-between;\n}",
        "language": "css",
        "options": [
          "space-around",
          "space-between",
          "space-evenly",
          "center"
        ],
        "correctAnswer": "space-between",
        "explanation": "`space-between` distributes remaining space between items, pinning the first item to the start edge and last item to the end edge."
      },
      {
        "question": "What does setting `margin-left: auto;` on a flex item inside a row container do?",
        "codeSnippet": ".container { display: flex; }\n.logout-btn { margin-left: auto; }",
        "language": "css",
        "options": [
          "Centers the item in the viewport",
          "Absorbs all remaining free space on the left, pushing the item to the far right edge of the container",
          "Has no effect because margins are ignored in flexbox",
          "Resets the item width to 0"
        ],
        "correctAnswer": "Absorbs all remaining free space on the left, pushing the item to the far right edge of the container",
        "explanation": "In flexbox, auto margins consume all available free space along that axis, making `margin-left: auto` an idiomatic way to push items right."
      },
      {
        "question": "By default, do flex children wrap to a new line when container width is exceeded?",
        "options": [
          "Yes, items automatically wrap at 100% width",
          "No, `flex-wrap: nowrap` is the default; items shrink to fit on a single line unless wrapping is explicitly enabled",
          "Only if the viewport is narrower than 768px",
          "Yes, if they are `<div>` elements"
        ],
        "correctAnswer": "No, `flex-wrap: nowrap` is the default; items shrink to fit on a single line unless wrapping is explicitly enabled",
        "explanation": "By default, `flex-wrap` is `nowrap`. Items shrink according to their `flex-shrink` factor to stay on a single line."
      },
      {
        "question": "What is the initial default value of `flex-direction` on a flex container?",
        "options": [
          "column",
          "row",
          "row-reverse",
          "initial-direction"
        ],
        "correctAnswer": "row",
        "explanation": "The initial value of `flex-direction` is `row`, placing items horizontally from left to right (in LTR writing modes)."
      }
    ]
  },
  {
    "title": "HTML & CSS: Flexbox Alignment (Align-Items & Cross Axis)",
    "description": "align-items (stretch, center, baseline), align-self, gap property, and flex shorthand.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "What is the default value of `align-items` on a flex container?",
        "options": [
          "`flex-start`",
          "`stretch` (causes flex items to expand to fill the container's cross-axis height if height is not explicitly set)",
          "`center`",
          "`baseline`"
        ],
        "correctAnswer": "`stretch` (causes flex items to expand to fill the container's cross-axis height if height is not explicitly set)",
        "explanation": "Default `align-items: stretch` makes child items equal in height along the cross axis."
      },
      {
        "question": "How do you align a single individual flex item differently from its siblings along the cross axis?",
        "codeSnippet": ".container { display: flex; align-items: center; }\n.special-item { align-self: flex-end; }",
        "language": "css",
        "options": [
          "Use `vertical-align: bottom`",
          "Use `justify-self` on the container",
          "Use the `align-self` property on the individual child item",
          "Wrap the item in a second flex container"
        ],
        "correctAnswer": "Use the `align-self` property on the individual child item",
        "explanation": "`align-self` allows overriding the container's `align-items` value for a specific flex item."
      },
      {
        "question": "What does the `gap` property do in modern Flexbox layouts?",
        "codeSnippet": ".tag-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}",
        "language": "css",
        "options": [
          "Increases font size by 12px",
          "Adds 12px padding around the container border",
          "Creates 12px of spacing strictly between items without adding unwanted outer margins to edges",
          "Limits the container to 12 items"
        ],
        "correctAnswer": "Creates 12px of spacing strictly between items without adding unwanted outer margins to edges",
        "explanation": "`gap` (row-gap and column-gap) sets gutters between items without needing `:last-child` negative margin hacks."
      },
      {
        "question": "What does the shorthand `flex: 1;` expand to in CSS?",
        "options": [
          "`flex-grow: 0; flex-shrink: 1; flex-basis: 100%;`",
          "`flex-grow: 1; flex-shrink: 0; flex-basis: auto;`",
          "`flex-grow: 1; flex-shrink: 1; flex-basis: 0%;`",
          "`flex-direction: 1`"
        ],
        "correctAnswer": "`flex-grow: 1; flex-shrink: 1; flex-basis: 0%;`",
        "explanation": "`flex: 1` sets grow to 1, shrink to 1, and basis to 0% (or 0px), making items share available space evenly."
      },
      {
        "question": "What does `align-items: baseline;` align items to?",
        "options": [
          "The bottom of the viewport",
          "The bottom border of the container",
          "The typographic baseline of the first line of text inside each flex item",
          "The vertical center of each image"
        ],
        "correctAnswer": "The typographic baseline of the first line of text inside each flex item",
        "explanation": "`align-items: baseline` aligns items so the text baselines line up horizontally regardless of differing font sizes."
      }
    ]
  },
  {
    "title": "HTML & CSS: CSS Grid Basics & Grid Columns",
    "description": "display: grid, grid-template-columns, fr unit, repeat(), and gap.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "What does `grid-template-columns: repeat(3, 1fr);` create in CSS Grid?",
        "codeSnippet": ".grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}",
        "language": "css",
        "options": [
          "A grid with 3 rows and 1 column",
          "Three columns fixed at 100px each",
          "Three equal-width columns, each occupying one fraction (1fr) of the remaining space",
          "A single column repeated 3 times vertically"
        ],
        "correctAnswer": "Three equal-width columns, each occupying one fraction (1fr) of the remaining space",
        "explanation": "`repeat(3, 1fr)` is shorthand for `1fr 1fr 1fr`, dividing container width into three equal fractional units."
      },
      {
        "question": "What does the `fr` (fractional) unit represent in CSS Grid?",
        "options": [
          "A percentage of the device screen resolution",
          "A fraction of the browser viewport width (1fr = 1vw)",
          "A fraction of the leftover free space in the grid container after fixed tracks are allocated",
          "A relative font ratio based on `em`"
        ],
        "correctAnswer": "A fraction of the leftover free space in the grid container after fixed tracks are allocated",
        "explanation": "The `fr` unit distributes remaining available space proportionally among tracks."
      },
      {
        "question": "How do you make a grid item span across 2 columns?",
        "codeSnippet": ".featured-card {\n  /* Span 2 columns */\n  grid-column: span 2;\n}",
        "language": "css",
        "options": [
          "`column-count: 2;`",
          "`grid-width: 2;`",
          "`grid-column: span 2;` (or `grid-column: auto / span 2;`)",
          "`flex-grow: 2;`"
        ],
        "correctAnswer": "`grid-column: span 2;` (or `grid-column: auto / span 2;`)",
        "explanation": "`grid-column: span 2` instructs the grid item to occupy two column tracks from its starting grid line."
      },
      {
        "question": "What is the primary difference between CSS Grid and Flexbox in terms of layout dimensions?",
        "options": [
          "Grid cannot use the `gap` property",
          "Flexbox is only for mobile screens; Grid is only for desktop",
          "CSS Grid is two-dimensional (simultaneously controls rows and columns); Flexbox is primarily one-dimensional (row OR column)",
          "Flexbox does not support modern browsers"
        ],
        "correctAnswer": "CSS Grid is two-dimensional (simultaneously controls rows and columns); Flexbox is primarily one-dimensional (row OR column)",
        "explanation": "Grid coordinates both horizontal columns and vertical rows together; Flexbox focuses on a single flow axis at a time."
      },
      {
        "question": "Which property sets independent gutters for rows and columns in CSS Grid?",
        "codeSnippet": ".grid {\n  display: grid;\n  row-gap: 20px;\n  column-gap: 10px;\n}",
        "language": "css",
        "options": [
          "`gutter: 20px 10px;`",
          "`margin: 20px 10px;`",
          "`gap: 20px 10px;` (row-gap then column-gap)",
          "`grid-spacing: 20px;`"
        ],
        "correctAnswer": "`gap: 20px 10px;` (row-gap then column-gap)",
        "explanation": "The `gap` shorthand takes `row-gap` followed by `column-gap`."
      }
    ]
  },
  {
    "title": "HTML & CSS: Form Elements, Inputs & Validation Attributes",
    "description": "input types, required, pattern, labels with for/id, and pseudo-classes (:invalid, :valid).",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "Why should an `<input>` element always have an associated `<label>` using the `for` attribute?",
        "codeSnippet": "<label for='user-email'>Email Address</label>\n<input id='user-email' type='email' required>",
        "language": "html",
        "options": [
          "It forces CSS validation to run",
          "Browsers disable inputs that lack a label",
          "Clicking the label focuses the input, and screen readers announce the label text when the input is selected",
          "It enables autocomplete"
        ],
        "correctAnswer": "Clicking the label focuses the input, and screen readers announce the label text when the input is selected",
        "explanation": "Matching `label for='id'` to `input id='id'` establishes programmatic accessibility association and expands the clickable target area."
      },
      {
        "question": "What browser behavior is triggered by adding the `required` attribute to an `<input>` inside a `<form>`?",
        "options": [
          "The field is populated with default placeholder text",
          "The input cannot be edited by the user",
          "The browser prevents form submission and displays a native validation tooltip if the input is left empty",
          "The input is encrypted using HTTPS"
        ],
        "correctAnswer": "The browser prevents form submission and displays a native validation tooltip if the input is left empty",
        "explanation": "`required` enforces HTML5 client-side constraint validation, blocking submission if empty."
      },
      {
        "question": "What is the difference between `type='button'` and `type='submit'` on a `<button>` inside a `<form>`?",
        "options": [
          "`type='submit'` is deprecated in HTML5",
          "`type='button'` reloads the page immediately",
          "`type='submit'` triggers form submission by default; `type='button'` has no default action and only responds to custom JavaScript event handlers",
          "There is no difference; all buttons submit forms"
        ],
        "correctAnswer": "`type='submit'` triggers form submission by default; `type='button'` has no default action and only responds to custom JavaScript event handlers",
        "explanation": "Buttons inside forms default to `type='submit'`. Specifying `type='button'` prevents unintentional form submission."
      },
      {
        "question": "Which CSS pseudo-class matches an input element whose value violates constraint validation rules?",
        "options": [
          ":dirty",
          ":error",
          ":failed",
          ":invalid"
        ],
        "correctAnswer": ":invalid",
        "explanation": "`:invalid` styles form controls whose contents fail HTML5 validation constraints (such as an invalid email or unmet `pattern`)."
      },
      {
        "question": "What attribute enables mobile virtual keyboards to show an `@` symbol and `.com` shortcut?",
        "options": [
          "role='email'",
          "inputmode='text'",
          "pattern='email'",
          "type='email'"
        ],
        "correctAnswer": "type='email'",
        "explanation": "`type='email'` instructs mobile operating systems to display an email-optimized keyboard layout."
      }
    ]
  },
  {
    "title": "HTML & CSS: Colors, Opacity, RGBA & CSS Variables",
    "description": "Hex codes, rgb/rgba, hsl, opacity vs transparent backgrounds, and CSS custom properties.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "How do CSS Custom Properties (CSS variables) declare and access a variable named `primary-color`?",
        "codeSnippet": ":root {\n  --primary-color: #4f46e5;\n}\n.btn {\n  background-color: var(--primary-color);\n}",
        "language": "css",
        "options": [
          "Declared with `const primaryColor = #4f46e5`",
          "Declared with `$` like SASS `$primary-color` and accessed with `get($primary-color)`",
          "Declared with `@primary-color` and accessed with `@primary-color`",
          "Declared with double hyphens `--primary-color` and accessed using `var(--primary-color)`"
        ],
        "correctAnswer": "Declared with double hyphens `--primary-color` and accessed using `var(--primary-color)`",
        "explanation": "CSS Custom Properties use `--` prefix for definition and `var(--name, fallback)` for consumption."
      },
      {
        "question": "What is the key visual difference between setting `opacity: 0.5;` on a card versus `background-color: rgba(0, 0, 0, 0.5);`?",
        "options": [
          "There is no difference",
          "`opacity` only works on images",
          "`rgba` is deprecated in CSS3",
          "`opacity: 0.5` makes the entire element including all child text and images semi-transparent; `rgba(...)` makes only the background semi-transparent"
        ],
        "correctAnswer": "`opacity: 0.5` makes the entire element including all child text and images semi-transparent; `rgba(...)` makes only the background semi-transparent",
        "explanation": "`opacity` applies transparency to the entire rendered element subtree. `rgba` or alpha colors only affect the specific color property."
      },
      {
        "question": "In HSL color notation `hsl(210, 100%, 50%)`, what do the three numbers represent?",
        "options": [
          "Hue, Spread, Linearity",
          "Height, Shading, Luminance",
          "Hex, Scale, Level",
          "Hue (angle 0-360 on color wheel), Saturation (percentage), Lightness (percentage)"
        ],
        "correctAnswer": "Hue (angle 0-360 on color wheel), Saturation (percentage), Lightness (percentage)",
        "explanation": "HSL stands for Hue (color wheel angle from 0 to 360), Saturation (color intensity 0-100%), and Lightness (brightness 0-100%)."
      },
      {
        "question": "What is the fallback parameter syntax in the `var()` function if `--accent` is undefined?",
        "options": [
          "var(--accent ? #ff0000)",
          "var(--accent || #ff0000)",
          "var(--accent default #ff0000)",
          "var(--accent, #ff0000)"
        ],
        "correctAnswer": "var(--accent, #ff0000)",
        "explanation": "`var(--custom-property, fallback-value)` provides a fallback if the custom property is not defined in scope."
      },
      {
        "question": "What does the 8-digit hexadecimal color `#00000080` represent in modern CSS?",
        "options": [
          "Black with a blur radius of 80px",
          "A dark shade of gray",
          "An invalid CSS syntax",
          "Pure black with approximately 50% alpha transparency (`80` hex = 128 / 255 = ~0.50)"
        ],
        "correctAnswer": "Pure black with approximately 50% alpha transparency (`80` hex = 128 / 255 = ~0.50)",
        "explanation": "In 8-digit hex notation (`#RRGGBBAA`), the final two digits represent the alpha channel from `00` (transparent) to `FF` (opaque)."
      }
    ]
  },
  {
    "title": "HTML & CSS: Media Queries & Responsive Breakpoints",
    "description": "@media rules, mobile-first design, min-width vs max-width, and prefers-color-scheme.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "easy",
    "questions": [
      {
        "question": "Why is a 'mobile-first' approach using `min-width` media queries recommended over desktop-first `max-width`?",
        "codeSnippet": "/* Mobile base: */\n.grid { display: flex; flex-direction: column; }\n\n/* Tablet & Desktop enhancements: */\n@media (min-width: 768px) {\n  .grid { flex-direction: row; }\n}",
        "language": "css",
        "options": [
          "`min-width` is required by Google SEO algorithms",
          "Mobile devices cannot parse `max-width` queries",
          "It disables touch events on desktops",
          "Base styles remain simple and lightweight for mobile devices, layering enhancements progressively as screen real estate expands"
        ],
        "correctAnswer": "Base styles remain simple and lightweight for mobile devices, layering enhancements progressively as screen real estate expands",
        "explanation": "Mobile-first establishes clean, unencumbered baseline styling for constrained screens, overriding only what needs enhancement on wider viewports."
      },
      {
        "question": "Which media feature query detects if the user has enabled Dark Mode in their operating system preferences?",
        "codeSnippet": "@media (prefers-color-scheme: dark) {\n  body {\n    background-color: #121212;\n    color: #ffffff;\n  }\n}",
        "language": "css",
        "options": [
          "`os-theme: dark`",
          "`device-theme: dark`",
          "`color-mode: dark`",
          "`prefers-color-scheme: dark`"
        ],
        "correctAnswer": "`prefers-color-scheme: dark`",
        "explanation": "`prefers-color-scheme` detects system-level dark/light mode appearance preferences."
      },
      {
        "question": "What does the media query `@media (min-width: 600px) and (max-width: 900px)` match?",
        "options": [
          "All tablet screens regardless of orientation",
          "Screens wider than 900px only",
          "Screens narrower than 600px only",
          "Screens whose viewport width is between 600px and 900px inclusive"
        ],
        "correctAnswer": "Screens whose viewport width is between 600px and 900px inclusive",
        "explanation": "Combining `min-width` and `max-width` with `and` defines a bounded width range."
      },
      {
        "question": "Which media query detects if a device uses a touch screen rather than a mouse pointer?",
        "options": [
          "`@media (input: finger)`",
          "`@media (device: touch)`",
          "`@media (hover: none)` only",
          "`@media (pointer: coarse)`"
        ],
        "correctAnswer": "`@media (pointer: coarse)`",
        "explanation": "`pointer: coarse` indicates the primary input mechanism is of limited precision, typical of fingers on a touch screen."
      },
      {
        "question": "What modern CSS Media Queries Level 4 syntax simplifies `(min-width: 400px) and (max-width: 800px)`?",
        "options": [
          "`@media (width in 400px..800px)`",
          "`@media (width: 400px to 800px)`",
          "`@media (between(400px, 800px))`",
          "`@media (400px <= width <= 800px)`"
        ],
        "correctAnswer": "`@media (400px <= width <= 800px)`",
        "explanation": "Media Queries Level 4 introduced standard mathematical range syntax (`<=`, `>=`), eliminating verbose min/max pairs."
      }
    ]
  }
];
