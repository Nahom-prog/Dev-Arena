export const htmlMidChallenges = [
  {
    "title": "HTML & CSS: Positioning (Absolute, Relative, Fixed, Sticky)",
    "description": "Containing blocks, offset properties (top/left), position: sticky scrolling threshold, and normal flow.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "Against which element does an element with `position: absolute; top: 0; left: 0;` position itself?",
        "options": [
          "Its closest ancestor element that has a `position` other than `static` (e.g. `relative`, `absolute`, `fixed`, `sticky`)",
          "Always the `<body>` element",
          "Its immediate direct parent element, regardless of positioning",
          "The browser window viewport"
        ],
        "correctAnswer": "Its closest ancestor element that has a `position` other than `static` (e.g. `relative`, `absolute`, `fixed`, `sticky`)",
        "explanation": "Absolute positioning resolves coordinates relative to the nearest positioned ancestor (containing block). If none exists, it falls back to the initial containing block (viewport)."
      },
      {
        "question": "Why might `position: sticky; top: 0;` fail to stick when scrolling past its container?",
        "codeSnippet": ".sidebar {\n  position: sticky;\n  top: 0;\n}",
        "language": "css",
        "options": [
          "An ancestor element has `overflow: hidden`, `overflow: auto`, or `overflow: scroll` set, clipping the scroll context",
          "`position: sticky` requires JavaScript to be enabled",
          "The element must have `display: flex` set",
          "`top: 0` is invalid syntax for sticky elements"
        ],
        "correctAnswer": "An ancestor element has `overflow: hidden`, `overflow: auto`, or `overflow: scroll` set, clipping the scroll context",
        "explanation": "Any ancestor with an `overflow` property other than `visible` creates a local scroll boundary that traps and disables sticky behavior."
      },
      {
        "question": "What happens to the document flow when an element is changed to `position: absolute;`?",
        "options": [
          "The element is completely removed from normal flow, causing sibling elements to fill the vacant space as if the element did not exist",
          "Sibling elements preserve an empty gap where the element originally stood",
          "The element is hidden from assistive screen readers",
          "The element is converted into an inline element"
        ],
        "correctAnswer": "The element is completely removed from normal flow, causing sibling elements to fill the vacant space as if the element did not exist",
        "explanation": "Absolute positioning takes an element entirely out of normal document flow with zero space reserved for it."
      },
      {
        "question": "How does `position: fixed;` position itself compared to `position: absolute;`?",
        "options": [
          "`fixed` positions relative to the viewport window and remains stationary during scrolling (unless an ancestor has a CSS transform/filter)",
          "`fixed` positions relative to the document root and scrolls with the page",
          "`fixed` can only be placed at the bottom of the screen",
          "`fixed` is only supported on mobile devices"
        ],
        "correctAnswer": "`fixed` positions relative to the viewport window and remains stationary during scrolling (unless an ancestor has a CSS transform/filter)",
        "explanation": "Fixed elements are pegged to the browser viewport and do not move on scroll."
      },
      {
        "question": "What does setting `top: 10px;` on a `position: relative;` element do?",
        "options": [
          "Shifts the visual rendering of the element 10px downward from its normal flow position without altering surrounding sibling layouts",
          "Pushes all following siblings down by 10px",
          "Adds 10px padding to the top of the element",
          "Aligns the element to 10px from the top of the browser screen"
        ],
        "correctAnswer": "Shifts the visual rendering of the element 10px downward from its normal flow position without altering surrounding sibling layouts",
        "explanation": "`position: relative` offsets the element visually while leaving its original box in the normal flow intact."
      }
    ]
  },
  {
    "title": "HTML & CSS: CSS Grid `auto-fit` vs `auto-fill` & `minmax()`",
    "description": "Responsive wrapping without media queries, minmax() tracks, and empty track distribution.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "What is the crucial behavioral difference between `repeat(auto-fit, minmax(200px, 1fr))` and `repeat(auto-fill, minmax(200px, 1fr))`?",
        "codeSnippet": ".grid-fit  { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }\n.grid-fill { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }",
        "language": "css",
        "options": [
          "`auto-fit` collapses any empty tracks to 0px allowing filled items to stretch across the full container; `auto-fill` preserves empty ghost tracks",
          "`auto-fit` only works in Firefox; `auto-fill` works in Chrome",
          "`auto-fill` wraps elements vertically instead of horizontally",
          "There is no difference; they are aliases"
        ],
        "correctAnswer": "`auto-fit` collapses any empty tracks to 0px allowing filled items to stretch across the full container; `auto-fill` preserves empty ghost tracks",
        "explanation": "When there are fewer items than total available columns, `auto-fit` collapses the empty tracks so the existing items expand to fill the entire row with `1fr`."
      },
      {
        "question": "How does `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));` create responsive layouts without media queries?",
        "options": [
          "Columns automatically wrap to a new row whenever the viewport width cannot accommodate another 250px track, sharing space with `1fr`",
          "It injects CSS media queries dynamically via JavaScript",
          "It forces items to 100% width on phones",
          "It scales the browser zoom level"
        ],
        "correctAnswer": "Columns automatically wrap to a new row whenever the viewport width cannot accommodate another 250px track, sharing space with `1fr`",
        "explanation": "The combination of `repeat(auto-fit, minmax(...))` recalculates column counts dynamically based on container width without media queries."
      },
      {
        "question": "Why should `minmax(0, 1fr)` often be used instead of `minmax(auto, 1fr)` inside grid columns?",
        "codeSnippet": ".grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 300px;\n}",
        "language": "css",
        "options": [
          "The default minimum for grid tracks is `auto`, which prevents items containing wide preformatted text or code blocks from shrinking below their content width",
          "To allow negative width columns",
          "To prevent grid lines from disappearing",
          "`minmax(auto, ...)` is deprecated"
        ],
        "correctAnswer": "The default minimum for grid tracks is `auto`, which prevents items containing wide preformatted text or code blocks from shrinking below their content width",
        "explanation": "By default, grid items have `min-width: auto`, which prevents shrinking smaller than inner content. Setting `minmax(0, 1fr)` allows true shrinking."
      },
      {
        "question": "What does `grid-auto-flow: dense;` do when items have varying column spans?",
        "options": [
          "Backfills and inserts smaller items into earlier empty holes left in the grid by larger spanning items",
          "Compresses all images inside grid cells",
          "Reduces grid gap to 0px",
          "Sorts items alphabetically by class name"
        ],
        "correctAnswer": "Backfills and inserts smaller items into earlier empty holes left in the grid by larger spanning items",
        "explanation": "`dense` instructs the auto-placement algorithm to attempt to fill in holes earlier in the grid if smaller items fit."
      },
      {
        "question": "Can `minmax()` be used in `grid-template-rows` as well as `grid-template-columns`?",
        "options": [
          "Yes, `minmax()` can be applied to row tracks, column tracks, and `grid-auto-rows`/`columns`",
          "No, `minmax()` only works on columns",
          "Only in CSS Grid Level 2",
          "Only if row height is specified in pixels"
        ],
        "correctAnswer": "Yes, `minmax()` can be applied to row tracks, column tracks, and `grid-auto-rows`/`columns`",
        "explanation": "`minmax()` is a universal track sizing function applicable to any grid track dimension."
      }
    ]
  },
  {
    "title": "HTML & CSS: Stacking Context & `z-index` Internals",
    "description": "Stacking context triggers (opacity, transform, filter, will-change), isolation: isolate, and z-index traps.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "Why might an element with `z-index: 9999;` still appear behind a sibling element with `z-index: 1;` on the page?",
        "codeSnippet": ".parent-a { position: relative; z-index: 1; }\n.child-a  { position: absolute; z-index: 9999; }\n.parent-b { position: relative; z-index: 2; }",
        "language": "css",
        "options": [
          "Because `child-a` is bound inside `parent-a`'s stacking context, which has a lower stacking order (`z-index: 1`) than `parent-b` (`z-index: 2`)",
          "`z-index` values cannot exceed 1000 in CSS",
          "Because `position: absolute` cancels out `z-index`",
          "Browsers invert z-index on mobile"
        ],
        "correctAnswer": "Because `child-a` is bound inside `parent-a`'s stacking context, which has a lower stacking order (`z-index: 1`) than `parent-b` (`z-index: 2`)",
        "explanation": "`z-index` only resolves within the local stacking context. No child can escape above an element that outranks its parent stacking context."
      },
      {
        "question": "Which of the following CSS properties creates a new Stacking Context on an element?",
        "options": [
          "Setting `transform`, `filter`, `opacity < 1`, or `perspective` to a non-default value",
          "Setting `display: block`",
          "Adding a CSS class name",
          "Setting `color: red`"
        ],
        "correctAnswer": "Setting `transform`, `filter`, `opacity < 1`, or `perspective` to a non-default value",
        "explanation": "Properties like `transform`, `filter`, `perspective`, and `opacity < 1` spawn a new stacking context, often surprising developers."
      },
      {
        "question": "What does the modern CSS property `isolation: isolate;` accomplish?",
        "codeSnippet": ".modal-root {\n  isolation: isolate;\n}",
        "language": "css",
        "options": [
          "Explicitly creates a new stacking context without requiring hacky tricks like `transform: translateZ(0)` or `opacity: 0.999`",
          "Isolates the element from all CSS styles on the page",
          "Runs the element in a Shadow DOM",
          "Prevents hover events from bubbling"
        ],
        "correctAnswer": "Explicitly creates a new stacking context without requiring hacky tricks like `transform: translateZ(0)` or `opacity: 0.999`",
        "explanation": "`isolation: isolate` is the clean, standards-compliant way to create a scoped stacking context."
      },
      {
        "question": "Does setting `z-index: 10;` on an element with `position: static;` have any visual layering effect?",
        "options": [
          "Yes, it brings the element forward",
          "No, `z-index` is completely ignored on standard non-flex/grid elements whose `position` is `static`",
          "It throws a CSS parse warning",
          "It forces the element to become `position: relative`"
        ],
        "correctAnswer": "No, `z-index` is completely ignored on standard non-flex/grid elements whose `position` is `static`",
        "explanation": "`z-index` only applies to positioned elements (`relative`, `absolute`, `fixed`, `sticky`) or direct flex/grid items."
      },
      {
        "question": "In what stacking order are backgrounds and borders painted relative to positioned descendants within the same stacking context?",
        "options": [
          "They are painted on top of child elements",
          "The container's background and borders are painted first at the lowest level, underneath all child contents and positioned elements",
          "They are painted at the same level as `z-index: 0`",
          "Stacking order of backgrounds is non-deterministic"
        ],
        "correctAnswer": "The container's background and borders are painted first at the lowest level, underneath all child contents and positioned elements",
        "explanation": "The painting order within a context starts with the root background and borders, followed by negative z-index, block descendants, inlines, and positive z-index."
      }
    ]
  },
  {
    "title": "HTML & CSS: CSS Pseudo-Classes (:hover, :focus-visible, :has)",
    "description": "User interaction pseudo-classes, :focus vs :focus-visible accessibility, :has parent selector, and :is/:where.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "Why is `:focus-visible` preferred over `:focus` when styling interactive focus rings?",
        "codeSnippet": "button:focus-visible {\n  outline: 2px solid #4f46e5;\n  outline-offset: 2px;\n}",
        "language": "css",
        "options": [
          "`:focus-visible` makes the outline glow in the dark",
          "`:focus-visible` displays focus indicators only when navigating via keyboard (Tab key) while hiding outline rings during mouse clicks",
          "`:focus` is deprecated in HTML5",
          "`:focus-visible` only works on touchscreens"
        ],
        "correctAnswer": "`:focus-visible` displays focus indicators only when navigating via keyboard (Tab key) while hiding outline rings during mouse clicks",
        "explanation": "`:focus-visible` provides accessibility for keyboard users without displaying focus outlines when mouse users click buttons."
      },
      {
        "question": "What revolutionary capability does the `:has()` relational pseudo-class provide in modern CSS?",
        "codeSnippet": "/* Style parent card if it contains an error message: */\n.card:has(.error-badge) {\n  border-color: #ef4444;\n}",
        "language": "css",
        "options": [
          "Checks if an element has JavaScript attached",
          "Acts as a 'parent selector', allowing styling of an element based on its descendant or following sibling elements",
          "Validates HTML syntax at runtime",
          "Checks if an image is fully cached"
        ],
        "correctAnswer": "Acts as a 'parent selector', allowing styling of an element based on its descendant or following sibling elements",
        "explanation": "`:has()` enables styling an element conditionally depending on its descendants or subsequent siblings."
      },
      {
        "question": "What is the key specificity difference between `:is()` and `:where()`?",
        "codeSnippet": ":is(header, main, footer) p { ... }\n:where(header, main, footer) p { ... }",
        "language": "css",
        "options": [
          "`:where()` adds 1 ID of specificity; `:is()` has 0",
          "`:is()` takes the specificity of its most specific argument; `:where()` always has 0 specificity",
          "`:is()` is only for classes; `:where()` is for tags",
          "There is no difference"
        ],
        "correctAnswer": "`:is()` takes the specificity of its most specific argument; `:where()` always has 0 specificity",
        "explanation": "`:where()` always counts as (0,0,0) specificity, making it ideal for base resets that are easy for callers to override."
      },
      {
        "question": "What does the pseudo-class `:target` select?",
        "codeSnippet": "section:target {\n  background-color: #fef08a;\n}",
        "language": "css",
        "options": [
          "The element currently hovered by the mouse pointer",
          "The element whose `id` matches the URL fragment hash (e.g. `#about`) currently in the browser address bar",
          "The active input receiving keyboard input",
          "The first element in the DOM"
        ],
        "correctAnswer": "The element whose `id` matches the URL fragment hash (e.g. `#about`) currently in the browser address bar",
        "explanation": "`:target` matches the unique element with an ID that matches the current URL hash fragment."
      },
      {
        "question": "Which pseudo-class matches elements that have no children at all (including whitespace text nodes)?",
        "options": [
          ":blank",
          ":empty",
          ":void",
          ":null"
        ],
        "correctAnswer": ":empty",
        "explanation": "`:empty` matches elements with zero child nodes (no element nodes and no text nodes, not even whitespace)."
      }
    ]
  },
  {
    "title": "HTML & CSS: CSS Pseudo-Elements (::before, ::after, ::marker)",
    "description": "Generated content, content property requirements, decorative styling, and ::marker custom bullets.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "Why will a `::before` or `::after` pseudo-element fail to render if the `content` property is omitted?",
        "codeSnippet": ".badge::before {\n  /* Missing content! */\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  background: green;\n}",
        "language": "css",
        "options": [
          "Pseudo-elements require an image URL",
          "The CSS specification dictates that pseudo-elements only generate boxes if `content` is defined (even as an empty string `content: '';`)",
          "Browsers hide pseudo-elements without text",
          "`content` must be set via JavaScript"
        ],
        "correctAnswer": "The CSS specification dictates that pseudo-elements only generate boxes if `content` is defined (even as an empty string `content: '';`)",
        "explanation": "Without `content: ''` (or a string/attr), the browser does not generate a box for `::before` or `::after`."
      },
      {
        "question": "Can pseudo-elements like `::before` and `::after` be applied to void elements like `<img>` or `<input>`?",
        "options": [
          "Yes, they render outside the image",
          "No, void/replaced elements cannot contain child nodes, so pseudo-elements cannot be generated inside them",
          "Only in Firefox",
          "Yes, if `display: block` is set"
        ],
        "correctAnswer": "No, void/replaced elements cannot contain child nodes, so pseudo-elements cannot be generated inside them",
        "explanation": "Replaced elements (like `<img>`, `<input>`, `<br>`) do not have internal content containers, so pseudo-elements cannot be placed inside them."
      },
      {
        "question": "What does the `::marker` pseudo-element allow you to customize?",
        "codeSnippet": "li::marker {\n  color: #4f46e5;\n  content: '▶ ';\n}",
        "language": "css",
        "options": [
          "The text cursor insertion caret",
          "The list item bullet symbol or number in ordered/unordered lists (`<li>`) and `<summary>` elements",
          "The scrollbar thumb marker",
          "The highlight color of selected text"
        ],
        "correctAnswer": "The list item bullet symbol or number in ordered/unordered lists (`<li>`) and `<summary>` elements",
        "explanation": "`::marker` styles the bullet point or ordinal numbering prefix of list items directly."
      },
      {
        "question": "How do you customize the color and background of user-highlighted text selection on a webpage?",
        "codeSnippet": "::selection {\n  background-color: #4f46e5;\n  color: #ffffff;\n}",
        "language": "css",
        "options": [
          "Use the `::highlight` pseudo-element",
          "Use the `::selection` pseudo-element",
          "Use `:selected` pseudo-class",
          "Use `:active-text`"
        ],
        "correctAnswer": "Use the `::selection` pseudo-element",
        "explanation": "`::selection` targets the portion of a document that has been highlighted by the user."
      },
      {
        "question": "Where are `::before` and `::after` pseudo-elements placed in the DOM tree relative to the parent element's content?",
        "options": [
          "`::before` is placed before the opening tag outside the element",
          "`::before` is inserted as the first child of the element; `::after` is inserted as the last child",
          "`::after` replaces the element's inner content",
          "They are placed in a parallel shadow tree"
        ],
        "correctAnswer": "`::before` is inserted as the first child of the element; `::after` is inserted as the last child",
        "explanation": "Pseudo-elements are rendered inside the target element as its first (`::before`) or last (`::after`) child."
      }
    ]
  },
  {
    "title": "HTML & CSS: Modern CSS Transitions & Easing Curves",
    "description": "transition property, cubic-bezier curves, hardware-accelerated properties, and transitionend events.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "Why should animations and transitions prioritize animating `transform` and `opacity` over `width`, `height`, or `top`?",
        "options": [
          "`width` and `height` cannot be animated in CSS",
          "`transform` and `opacity` are handled directly by the GPU compositor without triggering expensive Layout (Reflow) or Paint cycles",
          "`transform` uses less CSS code",
          "`top` does not support easing functions"
        ],
        "correctAnswer": "`transform` and `opacity` are handled directly by the GPU compositor without triggering expensive Layout (Reflow) or Paint cycles",
        "explanation": "Animating layout properties (`width`, `top`, `margin`) triggers reflow across the page. Transforms and opacity run on the GPU compositor thread at 60/120fps."
      },
      {
        "question": "What does the `cubic-bezier(x1, y1, x2, y2)` timing function define in CSS transitions?",
        "options": [
          "The color interpolation algorithm",
          "The 3D angle of a transition",
          "A mathematical Bézier velocity curve controlling the acceleration and deceleration rate of the transition over time",
          "The pixel path trajectory on screen"
        ],
        "correctAnswer": "A mathematical Bézier velocity curve controlling the acceleration and deceleration rate of the transition over time",
        "explanation": "A cubic Bézier curve maps progress over time, enabling custom easing like snappy bounces or gentle ease-outs."
      },
      {
        "question": "Why is `transition: all 0.3s ease;` considered a performance and maintainability anti-pattern?",
        "options": [
          "It crashes mobile Safari",
          "It is invalid in CSS3",
          "It forces the browser to monitor and interpolate every single animatable property (including slow layout properties), risking accidental lag and unintended side-effects",
          "It only works on links"
        ],
        "correctAnswer": "It forces the browser to monitor and interpolate every single animatable property (including slow layout properties), risking accidental lag and unintended side-effects",
        "explanation": "Targeting specific properties (`transition: transform 0.2s, opacity 0.2s`) prevents accidental transitions of layout properties."
      },
      {
        "question": "What JavaScript event fires on an element when a CSS transition finishes animating?",
        "options": [
          "animationend",
          "transitioncomplete",
          "transitionend",
          "onfinish"
        ],
        "correctAnswer": "transitionend",
        "explanation": "`transitionend` fires when a CSS transition completes, allowing chaining of UI state changes in JavaScript."
      },
      {
        "question": "How do you apply different transition durations to different properties in a single rule?",
        "codeSnippet": "button {\n  transition: transform 0.15s ease-out, background-color 0.3s ease-in;\n}",
        "language": "css",
        "options": [
          "It is impossible; all properties must share one duration",
          "Use multiple `transition` declarations stacked vertically",
          "Separate property transitions with commas in the `transition` shorthand",
          "Wrap the properties in curly braces"
        ],
        "correctAnswer": "Separate property transitions with commas in the `transition` shorthand",
        "explanation": "The `transition` property accepts a comma-separated list of individual property transitions."
      }
    ]
  },
  {
    "title": "HTML & CSS: Responsive Images, `srcset` & `<picture>` Element",
    "description": "srcset with descriptor widths (w), sizes attribute, art direction with <picture>, and AVIF/WebP formats.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "What is the primary difference between using `srcset` on an `<img>` versus using the `<picture>` element?",
        "options": [
          "`<picture>` requires JavaScript",
          "`<picture>` is for SVG; `srcset` is for JPEG",
          "`srcset` provides resolution switching (browser selects best image size based on screen DPI); `<picture>` provides art direction (serving completely different crops/formats)",
          "`srcset` only works on desktop monitors"
        ],
        "correctAnswer": "`srcset` provides resolution switching (browser selects best image size based on screen DPI); `<picture>` provides art direction (serving completely different crops/formats)",
        "explanation": "`srcset` advises the browser on available image resolutions; `<picture>` with `<source media=...>` forces explicit crops or format fallbacks."
      },
      {
        "question": "In `<img srcset='hero-400.jpg 400w, hero-800.jpg 800w' sizes='(max-width: 600px) 100vw, 50vw'>`, what does `sizes` tell the browser?",
        "options": [
          "Sets the CSS width of the image element directly",
          "Forces the image to scale to 100vw on all screens",
          "Informs the browser of the image's layout display width before CSS is downloaded, allowing optimal file selection from `srcset`",
          "Specifies the file download size in kilobytes"
        ],
        "correctAnswer": "Informs the browser of the image's layout display width before CSS is downloaded, allowing optimal file selection from `srcset`",
        "explanation": "Before CSSOM is built, the browser consults `sizes` to calculate expected render width and download the right image immediately."
      },
      {
        "question": "How do you provide next-gen image format fallback (AVIF -> WebP -> JPEG) using `<picture>`?",
        "codeSnippet": "<picture>\n  <source srcset='hero.avif' type='image/avif'>\n  <source srcset='hero.webp' type='image/webp'>\n  <img src='hero.jpg' alt='Hero'>\n</picture>",
        "language": "html",
        "options": [
          "Use a CSS `@supports` rule",
          "Pass multiple URLs inside the `src` attribute separated by commas",
          "Place `<source>` elements in order of format preference, ending with a fallback standard `<img>`",
          "Configure the web server's `.htaccess` file only"
        ],
        "correctAnswer": "Place `<source>` elements in order of format preference, ending with a fallback standard `<img>`",
        "explanation": "Browsers parse `<source>` tags from top to bottom, picking the first supported format and falling back to `<img>`."
      },
      {
        "question": "What does the attribute `loading='lazy'` on an `<img>` tag do natively in modern browsers?",
        "options": [
          "Waits 3 seconds after page load before fetching",
          "Loads the image with lower quality",
          "Defers image loading until the image is near the user's viewport scroll threshold, saving network bandwidth and speeding up initial page load",
          "Blurs the image until clicked"
        ],
        "correctAnswer": "Defers image loading until the image is near the user's viewport scroll threshold, saving network bandwidth and speeding up initial page load",
        "explanation": "Native `loading='lazy'` leverages the browser's internal intersection engine to fetch off-screen images on demand."
      },
      {
        "question": "Why should explicit `width` and `height` attributes always be included on `<img>` tags?",
        "codeSnippet": "<img src='logo.png' width='200' height='50' alt='DevArena'>",
        "language": "html",
        "options": [
          "Required by HTML5 validation",
          "To force the image to be non-responsive",
          "Allows the browser to calculate the aspect ratio and reserve layout space before download, preventing Cumulative Layout Shift (CLS)",
          "To compress the file dimensions"
        ],
        "correctAnswer": "Allows the browser to calculate the aspect ratio and reserve layout space before download, preventing Cumulative Layout Shift (CLS)",
        "explanation": "Providing dimensions lets browsers compute the aspect ratio box immediately, eliminating layout shift when images load."
      }
    ]
  },
  {
    "title": "HTML & CSS: Modern Dialog Element (`<dialog>`) & Popover API",
    "description": "showModal() vs show(), native backdrop pseudo-element (::backdrop), and HTML Popover API.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "What is the key difference between calling `dialog.showModal()` versus `dialog.show()` on an HTML `<dialog>` element?",
        "codeSnippet": "const dialog = document.querySelector('dialog');\n// Modal vs Non-modal\ndialog.showModal();",
        "language": "javascript",
        "options": [
          "`showModal()` opens in a new browser window",
          "`show()` can only be closed with the Escape key",
          "`showModal()` opens in the top-layer with focus trapping, renders a `::backdrop`, and blocks interaction with the rest of the page; `show()` opens non-modal",
          "`show()` requires CSS display: flex"
        ],
        "correctAnswer": "`showModal()` opens in the top-layer with focus trapping, renders a `::backdrop`, and blocks interaction with the rest of the page; `show()` opens non-modal",
        "explanation": "`showModal()` provides native modal dialog behavior: top-layer elevation, screen-reader inertness for background content, and `::backdrop` styling."
      },
      {
        "question": "Which pseudo-element is used to style the dimming background overlay of a `<dialog>` opened via `showModal()`?",
        "codeSnippet": "dialog::backdrop {\n  background-color: rgba(0, 0, 0, 0.7);\n  backdrop-filter: blur(4px);\n}",
        "language": "css",
        "options": [
          "::mask",
          "::overlay",
          "::backdrop",
          "::background"
        ],
        "correctAnswer": "::backdrop",
        "explanation": "`::backdrop` targets the full-viewport box rendered immediately beneath a top-layer modal element."
      },
      {
        "question": "What does the HTML Popover API (`popover='auto'`) provide without requiring custom JavaScript dialog libraries?",
        "codeSnippet": "<button popovertarget='my-menu'>Open Menu</button>\n<div id='my-menu' popover>Menu Options</div>",
        "language": "html",
        "options": [
          "Automatic responsive repositioning on mobile",
          "Automated translation into 50 languages",
          "Native top-layer rendering, light-dismiss (clicking outside or pressing Escape closes it), and automatic focus management",
          "Saves menu selections in local storage"
        ],
        "correctAnswer": "Native top-layer rendering, light-dismiss (clicking outside or pressing Escape closes it), and automatic focus management",
        "explanation": "The Popover API allows creating tooltips, dropdowns, and toast menus with built-in light-dismiss and top-layer stacking natively."
      },
      {
        "question": "How can a `<form>` inside a `<dialog>` automatically close the dialog when submitted?",
        "codeSnippet": "<dialog>\n  <form method='dialog'>\n    <button value='cancel'>Cancel</button>\n    <button value='confirm'>Confirm</button>\n  </form>\n</dialog>",
        "language": "html",
        "options": [
          "Use JavaScript `e.preventDefault()` only",
          "Add `action='close'` to the form",
          "Add `data-dismiss='modal'` to the button",
          "Set `method='dialog'` on the form; clicking submit closes the dialog and sets `dialog.returnValue` to the button's value"
        ],
        "correctAnswer": "Set `method='dialog'` on the form; clicking submit closes the dialog and sets `dialog.returnValue` to the button's value",
        "explanation": "HTML5 forms with `method='dialog'` close their containing dialog without reloading the page, recording the clicked button's value."
      },
      {
        "question": "Which keyboard key natively closes a `<dialog>` opened with `showModal()` by default?",
        "options": [
          "Backspace",
          "Enter",
          "Space",
          "Escape"
        ],
        "correctAnswer": "Escape",
        "explanation": "Pressing the Escape key triggers the native `cancel` event and closes a modal dialog."
      }
    ]
  },
  {
    "title": "HTML & CSS: Accessible Forms (ARIA Labels & Keyboard Nav)",
    "description": "aria-describedby, aria-invalid, fieldset/legend, tab index management, and accessible error messaging.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "Why should `aria-describedby` be linked to error message containers on form fields?",
        "codeSnippet": "<input id='pwd' type='password' aria-describedby='pwd-error' aria-invalid='true'>\n<span id='pwd-error' role='alert'>Password must be at least 8 characters</span>",
        "language": "html",
        "options": [
          "It forces the input to be uppercase",
          "It styles the text red via CSS",
          "It disables the input field",
          "Screen readers automatically announce the error message text immediately when the user focuses on the input field"
        ],
        "correctAnswer": "Screen readers automatically announce the error message text immediately when the user focuses on the input field",
        "explanation": "`aria-describedby` provides accessible descriptions: assistive tech reads the referenced message upon focusing the control."
      },
      {
        "question": "What is the semantic purpose of `<fieldset>` and `<legend>` when grouping related form controls?",
        "codeSnippet": "<fieldset>\n  <legend>Select Notification Preferences</legend>\n  <input type='checkbox' id='email'> <label for='email'>Email</label>\n  <input type='checkbox' id='sms'> <label for='sms'>SMS</label>\n</fieldset>",
        "language": "html",
        "options": [
          "Disables all inputs in the group by default",
          "Draws a rounded border around the form",
          "Encrypts the grouped fields on submit",
          "Groups related inputs and provides a caption (`<legend>`) that screen readers announce for every radio button or checkbox in that group"
        ],
        "correctAnswer": "Groups related inputs and provides a caption (`<legend>`) that screen readers announce for every radio button or checkbox in that group",
        "explanation": "`<fieldset>` and `<legend>` provide essential context for groups of inputs like radio buttons and checkboxes."
      },
      {
        "question": "What effect does setting `tabindex='-1'` have on an HTML element?",
        "options": [
          "Hides the element from the DOM",
          "Disables the element from receiving click events",
          "Moves the element to the very end of the tab order",
          "Makes the element programmatically focusable via JavaScript (`el.focus()`), but excludes it from sequential keyboard Tab navigation"
        ],
        "correctAnswer": "Makes the element programmatically focusable via JavaScript (`el.focus()`), but excludes it from sequential keyboard Tab navigation",
        "explanation": "`tabindex='-1'` allows JavaScript focus without adding non-interactive elements into the keyboard tab sequence."
      },
      {
        "question": "Why should `tabindex` values greater than 0 (`tabindex='1'`, `tabindex='2'`) be avoided?",
        "options": [
          "It only works in Firefox",
          "Positive tabindex is deprecated in HTML5",
          "It prevents form submission",
          "Positive tabindex disrupts natural document tab order, creating unpredictable and disorienting navigation for keyboard users"
        ],
        "correctAnswer": "Positive tabindex disrupts natural document tab order, creating unpredictable and disorienting navigation for keyboard users",
        "explanation": "Positive tabindexes jump ahead of the natural DOM flow, breaking intuitive top-to-bottom tab order."
      },
      {
        "question": "What does `aria-hidden='true'` do to an element?",
        "options": [
          "Prevents printing",
          "Hides the element visually like `display: none`",
          "Blurs the element",
          "Hides the element and all its descendants entirely from the Accessibility API tree while leaving it visually visible on screen"
        ],
        "correctAnswer": "Hides the element and all its descendants entirely from the Accessibility API tree while leaving it visually visible on screen",
        "explanation": "`aria-hidden='true'` is used to hide purely decorative icons or visual flourishes from screen readers."
      }
    ]
  },
  {
    "title": "HTML & CSS: Modern CSS Units (rem, em, ch, dvh, lvh, svh)",
    "description": "Viewport units, small/large/dynamic viewports, ch for typography widths, and rem accessibility.",
    "timeLimitMinutes": 10,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "mid",
    "questions": [
      {
        "question": "What problem do modern dynamic viewport units (`dvh`, `svh`, `lvh`) solve on mobile browsers compared to classic `vh`?",
        "options": [
          "They scale font sizes on retina displays",
          "They increase screen refresh rate from 60Hz to 120Hz",
          "They convert pixels into vector points",
          "They adapt accurately to mobile browser address bars and toolbars expanding and collapsing during scroll, eliminating jumpy layout overflow bugs"
        ],
        "correctAnswer": "They adapt accurately to mobile browser address bars and toolbars expanding and collapsing during scroll, eliminating jumpy layout overflow bugs",
        "explanation": "Classic `100vh` on mobile ignores dynamic address bars. `svh` uses the smallest viewport, `lvh` the largest, and `dvh` updates dynamically."
      },
      {
        "question": "What is the key difference between `rem` and `em` units in CSS?",
        "options": [
          "`em` is fixed to 16px regardless of inheritance",
          "`rem` is for margins; `em` is for typography",
          "`rem` does not scale when users zoom their browser",
          "`rem` is always relative to the root (`<html>`) font size; `em` is relative to the font size of its immediate parent element (compounding in nested structures)"
        ],
        "correctAnswer": "`rem` is always relative to the root (`<html>`) font size; `em` is relative to the font size of its immediate parent element (compounding in nested structures)",
        "explanation": "`rem` (root em) provides consistent sizing pegged to the root font size, avoiding the compounding inheritance issues of nested `em`s."
      },
      {
        "question": "What does `max-width: 65ch;` measure on a body text paragraph?",
        "codeSnippet": "p {\n  max-width: 65ch;\n  line-height: 1.6;\n}",
        "language": "css",
        "options": [
          "65% of the container width",
          "A fixed width of 65 centimeters",
          "65 Chinese characters",
          "Approximately the width of 65 '0' (zero) glyphs of the current font, providing optimal reading line length for typography"
        ],
        "correctAnswer": "Approximately the width of 65 '0' (zero) glyphs of the current font, providing optimal reading line length for typography",
        "explanation": "The `ch` unit represents the advance measure of the '0' character in the element's font, ideal for setting comfortable 45-75 character line lengths."
      },
      {
        "question": "Why is setting font sizes in `px` considered an accessibility problem compared to `rem`?",
        "options": [
          "Pixels cannot be converted into percentages",
          "`px` text looks blurry on high-DPI displays",
          "`px` text cannot be indexed by search engines",
          "`px` font sizes ignore user preferences if a visually impaired user increases the default font size in their operating system or browser settings"
        ],
        "correctAnswer": "`px` font sizes ignore user preferences if a visually impaired user increases the default font size in their operating system or browser settings",
        "explanation": "Hardcoded `px` overrides browser font zoom preferences. `rem` scales proportionally with user browser settings."
      },
      {
        "question": "What does `100cqw` represent in modern CSS?",
        "options": [
          "A viewport quantum unit",
          "100 cubic quarter widths",
          "100% of the screen width",
          "100% of the width of the nearest query container defined by `@container`"
        ],
        "correctAnswer": "100% of the width of the nearest query container defined by `@container`",
        "explanation": "`cqw` (container query width) represents 1% of the query container's width."
      }
    ]
  }
];
