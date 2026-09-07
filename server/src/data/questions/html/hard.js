export const htmlHardChallenges = [
  {
    "title": "HTML & CSS: CSS Container Queries (`@container`)",
    "description": "container-type (inline-size), @container rules, cqw units, and component-level responsiveness.",
    "timeLimitMinutes": 12,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "How do CSS Container Queries (`@container`) fundamentally improve responsive design over traditional Media Queries (`@media`)?",
        "codeSnippet": ".card-wrapper {\n  container-type: inline-size;\n}\n@container (min-width: 400px) {\n  .card { display: flex; }\n}",
        "language": "css",
        "options": [
          "Styles respond to the width of the component's immediate parent container rather than the global viewport, making components truly modular and context-independent",
          "They compile to WebAssembly for higher frame rates",
          "They eliminate the need for CSS Grid",
          "They only apply inside iframes"
        ],
        "correctAnswer": "Styles respond to the width of the component's immediate parent container rather than the global viewport, making components truly modular and context-independent",
        "explanation": "Container queries evaluate the size of the containing element, allowing a card to render horizontally in a wide main section and vertically in a narrow sidebar."
      },
      {
        "question": "Why is `container-type: inline-size;` almost always preferred over `container-type: size;`?",
        "options": [
          "`container-type: size` monitors both width and height, which creates an infinite layout loop if child contents determine container height; `inline-size` tracks width only",
          "`inline-size` is 10x faster in WebKit",
          "`size` is deprecated in modern CSS",
          "`inline-size` forces the container to display inline"
        ],
        "correctAnswer": "`container-type: size` monitors both width and height, which creates an infinite layout loop if child contents determine container height; `inline-size` tracks width only",
        "explanation": "Tracking height (`size`) causes cyclic dependency when children affect container height. `inline-size` safely queries width alone."
      },
      {
        "question": "How can you name a specific container so nested children can query an outer container specifically?",
        "codeSnippet": ".sidebar {\n  container: sidebar / inline-size;\n}\n@container sidebar (min-width: 300px) {\n  /* targets sidebar container specifically */\n}",
        "language": "css",
        "options": [
          "Use the `container-name` property (or `container: name / type` shorthand) and reference it in the `@container name (...)` rule",
          "Add an ID to the `@container` rule",
          "Use CSS Modules syntax",
          "Name it via JavaScript `dataset`"
        ],
        "correctAnswer": "Use the `container-name` property (or `container: name / type` shorthand) and reference it in the `@container name (...)` rule",
        "explanation": "Named containers allow child elements to target specific ancestral query containers without ambiguity."
      },
      {
        "question": "What does the unit `50cqi` equal?",
        "options": [
          "50% of the inline size (width in horizontal writing mode) of the query container",
          "50 CSS Quantum Instructions",
          "50% of the viewport height",
          "50 container iterations"
        ],
        "correctAnswer": "50% of the inline size (width in horizontal writing mode) of the query container",
        "explanation": "`cqi` represents 1% of the query container's inline size."
      },
      {
        "question": "Can an element query itself using `@container`?",
        "options": [
          "No, an element can only query its nearest ancestral container, never its own dimensions, to avoid cyclic layout resolution loops",
          "Yes, if `self-container: true` is set",
          "Yes, with CSS Grid",
          "Only for font-size calculations"
        ],
        "correctAnswer": "No, an element can only query its nearest ancestral container, never its own dimensions, to avoid cyclic layout resolution loops",
        "explanation": "To avoid infinite loops, container queries apply only to descendants of the container, never to the container itself."
      }
    ]
  },
  {
    "title": "HTML & CSS: CSS Subgrid & Nested Grid Alignments",
    "description": "grid-template-columns: subgrid, cross-card item alignment, and nested track inheritance.",
    "timeLimitMinutes": 12,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "What major layout challenge does CSS `subgrid` solve across multiple sibling cards in a grid layout?",
        "codeSnippet": ".parent-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n.card {\n  display: grid;\n  grid-template-rows: subgrid;\n  grid-row: span 3;\n}",
        "language": "css",
        "options": [
          "Allows card internal elements (headers, descriptions, footers) to align horizontally across cards of differing content lengths using the parent grid tracks",
          "Increases CSS grid parsing speed by 50%",
          "Allows CSS grid to span across multiple browser tabs",
          "Replaces JavaScript masonry libraries completely"
        ],
        "correctAnswer": "Allows card internal elements (headers, descriptions, footers) to align horizontally across cards of differing content lengths using the parent grid tracks",
        "explanation": "`subgrid` allows a nested grid to adopt the track definitions and lines of its parent grid, aligning child elements across sibling components."
      },
      {
        "question": "What is required on the parent grid item for `subgrid` to function properly?",
        "options": [
          "The child item must span two or more parent tracks (e.g. `grid-row: span 3;`) and set `grid-template-rows: subgrid`",
          "The parent must be a flex container",
          "The items must have fixed heights in pixels",
          "`position: relative` must be declared on the root"
        ],
        "correctAnswer": "The child item must span two or more parent tracks (e.g. `grid-row: span 3;`) and set `grid-template-rows: subgrid`",
        "explanation": "A subgrid must span the parent tracks it intends to inherit before declaring `subgrid` on that axis."
      },
      {
        "question": "Can a subgrid inherit parent tracks on both columns AND rows simultaneously?",
        "codeSnippet": ".nested {\n  display: grid;\n  grid-template-columns: subgrid;\n  grid-template-rows: subgrid;\n}",
        "language": "css",
        "options": [
          "Yes, an item can be a subgrid on both axes simultaneously, adopting both parent column and row tracks",
          "No, CSS only permits subgrid on one axis at a time",
          "Only on desktop displays",
          "Only if the parent uses `repeat(auto-fit)`"
        ],
        "correctAnswer": "Yes, an item can be a subgrid on both axes simultaneously, adopting both parent column and row tracks",
        "explanation": "`subgrid` can be applied independently to `grid-template-columns`, `grid-template-rows`, or both."
      },
      {
        "question": "How does `gap` behave in a subgrid when the subgrid does not declare its own `gap`?",
        "options": [
          "It inherits the parent grid's `gap` by default, but can override it with a custom `gap` if desired",
          "The gap collapses to 0px",
          "The gap is doubled",
          "Subgrids cannot have gaps"
        ],
        "correctAnswer": "It inherits the parent grid's `gap` by default, but can override it with a custom `gap` if desired",
        "explanation": "A subgrid inherits the parent track gutters unless explicitly overridden in the subgrid definition."
      },
      {
        "question": "What happens to named grid lines defined in the parent grid when inherited by a subgrid?",
        "options": [
          "Parent line names are passed down and accessible within the subgrid, and the subgrid can also append its own local line names",
          "All line names are stripped and replaced with numeric indexes",
          "Parent names throw a CSS collision error",
          "Line names are converted to uppercase"
        ],
        "correctAnswer": "Parent line names are passed down and accessible within the subgrid, and the subgrid can also append its own local line names",
        "explanation": "Subgrid merges parent line names into its track coordinate system, preserving semantic line references."
      }
    ]
  },
  {
    "title": "HTML & CSS: CSS Keyframe Animations & GPU Compositing",
    "description": "@keyframes, will-change, composite layers, animation fill modes (forwards/backwards), and 60fps rendering.",
    "timeLimitMinutes": 12,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "What does `animation-fill-mode: forwards;` do when an animation finishes?",
        "codeSnippet": ".banner {\n  animation: slideIn 0.5s ease-out forwards;\n}",
        "language": "css",
        "options": [
          "Retains the computed CSS styles applied by the final keyframe (`100%` or `to`) after the animation completes, preventing snap-back",
          "Reverses the animation back to the start",
          "Loops the animation forever",
          "Applies the first keyframe before the animation starts"
        ],
        "correctAnswer": "Retains the computed CSS styles applied by the final keyframe (`100%` or `to`) after the animation completes, preventing snap-back",
        "explanation": "`forwards` retains the styles defined in the last executed keyframe after the animation ends."
      },
      {
        "question": "What performance consequence occurs when misusing `will-change: transform, opacity;` indiscriminately on many elements?",
        "options": [
          "Forces the browser to allocate dedicated GPU memory composite layers for each element, leading to severe VRAM exhaustion and battery drain",
          "Slows down JavaScript garbage collection",
          "Disables CSS transitions",
          "Causes text rendering to become pixelated permanently"
        ],
        "correctAnswer": "Forces the browser to allocate dedicated GPU memory composite layers for each element, leading to severe VRAM exhaustion and battery drain",
        "explanation": "Overusing `will-change` promotes too many elements to GPU layers, consuming excessive memory and degrading performance."
      },
      {
        "question": "Why is `animation-fill-mode: both;` frequently used in UI entrance animations?",
        "options": [
          "Applies the `0%` keyframe styles during any `animation-delay` before start, and retains the `100%` styles after completion",
          "Plays the animation forward and backward at the same time",
          "Runs the animation on both desktop and mobile",
          "Enables both CSS and JavaScript animation controls"
        ],
        "correctAnswer": "Applies the `0%` keyframe styles during any `animation-delay` before start, and retains the `100%` styles after completion",
        "explanation": "`both` combines `backwards` (pre-animation delay styling) and `forwards` (post-animation persistence)."
      },
      {
        "question": "How do you pause an active CSS keyframe animation via CSS alone?",
        "codeSnippet": ".spinner:hover {\n  animation-play-state: paused;\n}",
        "language": "css",
        "options": [
          "`animation-state: stop;`",
          "`animation-play-state: paused;`",
          "`animation: none;`",
          "`animation-duration: 0s;`"
        ],
        "correctAnswer": "`animation-play-state: paused;`",
        "explanation": "`animation-play-state: paused` freezes an active animation in place without resetting its progress."
      },
      {
        "question": "Which of the following creates a stepped, retro-game or typewriter text animation effect in CSS?",
        "options": [
          "`animation-timing-function: cubic-bezier(0,0,1,1);`",
          "`animation-timing-function: steps(10, end);`",
          "`animation-style: discrete;`",
          "`animation-iteration-count: segmented;`"
        ],
        "correctAnswer": "`animation-timing-function: steps(10, end);`",
        "explanation": "The `steps()` timing function divides the animation duration into equidistant intervals, producing abrupt stepped movements."
      }
    ]
  },
  {
    "title": "HTML & CSS: CSS Cascade Layers (`@layer`) & Priority Rules",
    "description": "Layer ordering, unlayered styles precedence, specificity within layers, and framework architecture.",
    "timeLimitMinutes": 12,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "In CSS Cascade Layers (`@layer`), what determines which layer wins when conflicting rules have equal importance?",
        "codeSnippet": "@layer reset, framework, components, utilities;\n\n@layer reset { h1 { color: red !important; } }\n@layer utilities { h1 { color: blue; } }",
        "language": "css",
        "options": [
          "The selector with the most IDs always wins across layers",
          "The order in which layers are declared: later declared layers take precedence over earlier declared layers (regardless of selector specificity)",
          "The layer with the shortest name wins",
          "Alphabetical order of layer names"
        ],
        "correctAnswer": "The order in which layers are declared: later declared layers take precedence over earlier declared layers (regardless of selector specificity)",
        "explanation": "In `@layer`, layer order trumps selector specificity. Rules in later layers override rules in earlier layers."
      },
      {
        "question": "Where do unlayered CSS styles (styles written outside any `@layer`) sit in the cascade hierarchy?",
        "options": [
          "Layered styles always override unlayered styles",
          "Unlayered normal styles take precedence over all normal layered styles (unlayered > layered)",
          "Unlayered styles have zero specificity",
          "Unlayered styles are completely ignored if layers exist"
        ],
        "correctAnswer": "Unlayered normal styles take precedence over all normal layered styles (unlayered > layered)",
        "explanation": "To avoid breaking legacy CSS, unlayered normal styles sit above all layered styles in the cascade."
      },
      {
        "question": "What surprising inversion occurs with `!important` inside `@layer` declarations?",
        "codeSnippet": "@layer base { p { color: green !important; } }\n@layer theme { p { color: purple !important; } }",
        "language": "css",
        "options": [
          "`!important` is invalid inside `@layer`",
          "For `!important` declarations, the layer order is reversed: earlier declared layers win over later declared layers (`base` wins over `theme`)",
          "The rule with higher specificity wins",
          "Both colors blend together"
        ],
        "correctAnswer": "For `!important` declarations, the layer order is reversed: earlier declared layers win over later declared layers (`base` wins over `theme`)",
        "explanation": "The CSS spec inverts layer priority for `!important`: important declarations in earlier layers beat important declarations in later layers."
      },
      {
        "question": "How do you declare the layer order upfront at the top of a master stylesheet?",
        "options": [
          "`@order layers(reset, base, components);`",
          "`@layer reset, base, components, overrides;`",
          "`layer-priority: reset, base, components;`",
          "`@cascade-layers: [reset, base, components];`"
        ],
        "correctAnswer": "`@layer reset, base, components, overrides;`",
        "explanation": "Declaring `@layer name1, name2, name3;` upfront establishes the definitive cascade precedence order across all modular files."
      },
      {
        "question": "Can cascade layers be nested inside other layers?",
        "codeSnippet": "@layer framework {\n  @layer base { ... }\n  @layer components { ... }\n}",
        "language": "css",
        "options": [
          "No, layers must be flat and root-level only",
          "Yes, nested layers create sub-layers addressable via dot notation (e.g. `@layer framework.components`)",
          "Only up to 2 levels",
          "Nested layers crash the browser CSS parser"
        ],
        "correctAnswer": "Yes, nested layers create sub-layers addressable via dot notation (e.g. `@layer framework.components`)",
        "explanation": "CSS supports nested layers referenced as `parent.child`, providing modular isolation for large design systems."
      }
    ]
  },
  {
    "title": "HTML & CSS: CSS Blend Modes, Filters & Backdrop Filters",
    "description": "mix-blend-mode, background-blend-mode, backdrop-filter (glassmorphism), and filter chain performance.",
    "timeLimitMinutes": 12,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "What is the key difference between `filter` and `backdrop-filter` in CSS?",
        "codeSnippet": ".glass-panel {\n  background: rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(10px);\n}",
        "language": "css",
        "options": [
          "`backdrop-filter` only works on images",
          "`filter` applies graphical effects to the element itself and all its contents; `backdrop-filter` applies effects to the area behind the element",
          "`filter` requires an SVG filter URL",
          "`backdrop-filter` is processed by the CPU instead of the GPU"
        ],
        "correctAnswer": "`filter` applies graphical effects to the element itself and all its contents; `backdrop-filter` applies effects to the area behind the element",
        "explanation": "`backdrop-filter` renders effects (like blur) on the pixels underneath the element, enabling the frosted glass effect."
      },
      {
        "question": "Why must an element have a semi-transparent background for `backdrop-filter: blur(...)` to be visible?",
        "options": [
          "Browsers disable `backdrop-filter` on solid colors",
          "If the background is fully opaque, the blurred content underneath the element is completely obscured from view",
          "It causes a rendering loop error",
          "CSS requires alpha channels for all filter operations"
        ],
        "correctAnswer": "If the background is fully opaque, the blurred content underneath the element is completely obscured from view",
        "explanation": "A solid opaque background covers the backdrop entirely, making the blurred pixels behind it invisible."
      },
      {
        "question": "What does `mix-blend-mode: multiply;` do to overlapping visual elements?",
        "options": [
          "Inverts the colors like a photographic negative",
          "Multiplies the RGB color values of the element with the colors behind it, resulting in a darker composite color (pure white becomes transparent)",
          "Lightens the underlying pixels",
          "Splits the image into CMYK color channels"
        ],
        "correctAnswer": "Multiplies the RGB color values of the element with the colors behind it, resulting in a darker composite color (pure white becomes transparent)",
        "explanation": "The `multiply` blend mode multiplies colors: black stays black, white disappears, and tones darken."
      },
      {
        "question": "What side-effect does applying `filter: blur(...)` have on an element's containing block and positioning?",
        "options": [
          "It disables pointer events on children",
          "It promotes the element into a new stacking context and containing block for all absolute and fixed descendants",
          "It forces the element to become `display: block`",
          "It prevents the element from scrolling"
        ],
        "correctAnswer": "It promotes the element into a new stacking context and containing block for all absolute and fixed descendants",
        "explanation": "Applying any non-none `filter` creates a new stacking context and acts as the containing block for fixed-position descendants."
      },
      {
        "question": "Which blend mode calculates the inverse of both layers, multiplies them, and inverts the result, always creating a lighter composite?",
        "options": [
          "multiply",
          "screen",
          "difference",
          "darken"
        ],
        "correctAnswer": "screen",
        "explanation": "`screen` multiplies the opposites of the colors, effectively lightening the image (black becomes transparent)."
      }
    ]
  },
  {
    "title": "HTML & CSS: Modern CSS Color Spaces (oklch, oklab, color-mix)",
    "description": "Perceptually uniform color spaces, wide-gamut displays (P3), color-mix() function, and light/chroma/hue.",
    "timeLimitMinutes": 12,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "Why is the `oklch()` color space revolutionizing modern design systems compared to legacy `hsl()`?",
        "codeSnippet": ":root {\n  --primary: oklch(0.65 0.24 260);\n}",
        "language": "css",
        "options": [
          "It supports 16-bit audio",
          "It is perceptually uniform: colors with the same Lightness (L) value appear equally bright to human eyes across all hues, avoiding HSL's brightness distortions",
          "It is only available on OLED displays",
          "It reduces CSS file sizes"
        ],
        "correctAnswer": "It is perceptually uniform: colors with the same Lightness (L) value appear equally bright to human eyes across all hues, avoiding HSL's brightness distortions",
        "explanation": "In HSL, yellow at 50% lightness appears blindingly bright while blue at 50% appears very dark. OKLCH fixes this with perceptual uniformity."
      },
      {
        "question": "What do the three parameters in `oklch(L C H)` represent?",
        "options": [
          "Linear, Cubic, Hexadecimal",
          "Opacity, Contrast, Highlight",
          "Lightness (0% to 100%), Chroma (color saturation/vibrancy starting at 0), and Hue (angle 0 to 360)",
          "Luminance, Chrominance, Kelvin temperature"
        ],
        "correctAnswer": "Lightness (0% to 100%), Chroma (color saturation/vibrancy starting at 0), and Hue (angle 0 to 360)",
        "explanation": "OKLCH parameters are Lightness (perceived brightness), Chroma (saturation/purity), and Hue (color wheel angle)."
      },
      {
        "question": "What does the `color-mix()` CSS function do?",
        "codeSnippet": ".btn-hover {\n  background-color: color-mix(in oklch, var(--primary) 80%, black);\n}",
        "language": "css",
        "options": [
          "Picks the color with higher contrast",
          "Generates an animated gradient between two colors",
          "Mixes two specified colors in a specified color space (like OKLCH) with defined percentage ratios natively in CSS without preprocessors",
          "Inverts the primary color"
        ],
        "correctAnswer": "Mixes two specified colors in a specified color space (like OKLCH) with defined percentage ratios natively in CSS without preprocessors",
        "explanation": "`color-mix(in color-space, color1 percentage, color2)` blends colors natively in browser engines."
      },
      {
        "question": "What advantage does the Display P3 color gamut provide over traditional sRGB?",
        "options": [
          "It uses 50% less RAM",
          "It increases CSS contrast ratios to 21:1",
          "It covers roughly 25% more vivid colors (especially vibrant greens and intense reds) visible on modern mobile and laptop screens",
          "It prevents screen burn-in"
        ],
        "correctAnswer": "It covers roughly 25% more vivid colors (especially vibrant greens and intense reds) visible on modern mobile and laptop screens",
        "explanation": "Display P3 provides a significantly wider color gamut than sRGB, allowing displays to show much more vivid colors."
      },
      {
        "question": "How can you conditionally serve Display P3 colors only to devices that physically support wide-gamut displays?",
        "codeSnippet": "@media (color-gamut: p3) {\n  :root { --vibrant-red: color(display-p3 1 0 0); }\n}",
        "language": "css",
        "options": [
          "Use `display: p3`",
          "Use `@supports (display-p3)`",
          "Use the `@media (color-gamut: p3)` media query",
          "Check `navigator.gpu` in JavaScript"
        ],
        "correctAnswer": "Use the `@media (color-gamut: p3)` media query",
        "explanation": "The `color-gamut` media query detects hardware display gamut capabilities (`srgb`, `p3`, `rec2020`)."
      }
    ]
  },
  {
    "title": "HTML & CSS: Content Visibility & DOM Rendering Performance",
    "description": "content-visibility: auto, contain-intrinsic-size, CSS containment, and rendering skips.",
    "timeLimitMinutes": 12,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "What dramatic performance optimization does `content-visibility: auto;` provide on long, content-heavy web pages?",
        "codeSnippet": ".feed-item {\n  content-visibility: auto;\n  contain-intrinsic-size: 0 500px;\n}",
        "language": "css",
        "options": [
          "Compresses HTML text in memory",
          "Converts all DOM nodes to canvas elements",
          "Skips the rendering work (layout, paint, style calculations) for off-screen elements until they approach the viewport, boosting initial load speed by up to 7x",
          "Removes off-screen elements from the DOM entirely"
        ],
        "correctAnswer": "Skips the rendering work (layout, paint, style calculations) for off-screen elements until they approach the viewport, boosting initial load speed by up to 7x",
        "explanation": "`content-visibility: auto` instructs the browser to skip layout and painting for elements outside the viewport until needed."
      },
      {
        "question": "Why MUST `contain-intrinsic-size` be specified alongside `content-visibility: auto`?",
        "options": [
          "Sets the maximum resolution of images",
          "Required by CSS syntax; omitting it throws an error",
          "Provides an estimated placeholder size so off-screen elements do not collapse to 0px, preventing jumpy scrollbars and scroll position jumping",
          "Enables browser caching"
        ],
        "correctAnswer": "Provides an estimated placeholder size so off-screen elements do not collapse to 0px, preventing jumpy scrollbars and scroll position jumping",
        "explanation": "Without an intrinsic size estimate, unrendered elements collapse to 0px height, causing erratic scrollbar jumping."
      },
      {
        "question": "What does `contain: paint;` do on an element?",
        "options": [
          "Forces GPU rasterization on every frame",
          "Restricts the element to black and white",
          "Guarantees that child elements will never paint outside the element's bounding box, allowing the browser to skip painting it entirely if off-screen",
          "Prevents SVG rendering"
        ],
        "correctAnswer": "Guarantees that child elements will never paint outside the element's bounding box, allowing the browser to skip painting it entirely if off-screen",
        "explanation": "`contain: paint` clips descendants to the box and informs the renderer that nothing paints outside."
      },
      {
        "question": "Can text inside an element with `content-visibility: auto` still be searched using browser Find in Page (Ctrl+F)?",
        "options": [
          "Only in Chromium browsers",
          "No, off-screen content is invisible to Find in Page",
          "Yes, browsers automatically render and focus matching elements when the user searches with Find in Page or follows hash links",
          "Only if `aria-hidden='false'` is set"
        ],
        "correctAnswer": "Yes, browsers automatically render and focus matching elements when the user searches with Find in Page or follows hash links",
        "explanation": "Unlike `display: none`, `content-visibility: auto` preserves full DOM accessibility and Find in Page searchability."
      },
      {
        "question": "What does `contain: layout;` communicate to the browser's layout engine?",
        "options": [
          "The element has a fixed 100px width",
          "The element cannot use CSS Grid",
          "The internal layout of the element is completely isolated from the outside page; changes inside will never trigger reflow outside",
          "Layout calculations are offloaded to Web Workers"
        ],
        "correctAnswer": "The internal layout of the element is completely isolated from the outside page; changes inside will never trigger reflow outside",
        "explanation": "`contain: layout` boundaries isolate reflow calculations, preventing localized DOM updates from triggering whole-page layout passes."
      }
    ]
  },
  {
    "title": "HTML & CSS: Web Accessibility (WCAG 2.2 & Screen Reader Tree)",
    "description": "Contrast ratios (AA/AAA), landmarks, aria-live regions (polite/assertive), and accessible names.",
    "timeLimitMinutes": 12,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "What are the minimum color contrast ratio requirements for standard body text under WCAG 2.2 Level AA and Level AAA?",
        "options": [
          "Level AA requires 10:1; Level AAA requires 20:1",
          "Level AA requires 2.0:1; Level AAA requires 3.5:1",
          "Level AA requires at least 4.5:1; Level AAA requires at least 7.0:1 (large text requires 3.0:1 and 4.5:1 respectively)",
          "Level AA applies only to black and white"
        ],
        "correctAnswer": "Level AA requires at least 4.5:1; Level AAA requires at least 7.0:1 (large text requires 3.0:1 and 4.5:1 respectively)",
        "explanation": "WCAG 2.2 AA mandates a 4.5:1 contrast ratio for normal text and 3:1 for large text (18pt+ or bold 14pt+). AAA raises these to 7:1 and 4.5:1."
      },
      {
        "question": "What is the difference between `aria-live='polite'` and `aria-live='assertive'` for dynamic notifications?",
        "codeSnippet": "<div id='toast' aria-live='polite'>New challenge available!</div>",
        "language": "html",
        "options": [
          "`polite` only works on Android",
          "`assertive` flashes the screen in red",
          "`polite` waits until the screen reader finishes speaking current announcements; `assertive` interrupts immediately with the message",
          "`assertive` reloads the page"
        ],
        "correctAnswer": "`polite` waits until the screen reader finishes speaking current announcements; `assertive` interrupts immediately with the message",
        "explanation": "`polite` queues announcements gracefully during speech pauses. `assertive` interrupts user focus immediately (reserved for critical errors)."
      },
      {
        "question": "How does an accessible name computation resolve for `<button aria-label='Close Dialog'>X</button>`?",
        "options": [
          "Screen readers ignore `aria-label` if text exists",
          "Screen readers read both: 'Close Dialog X'",
          "`aria-label` completely overrides the inner text content 'X', so screen readers announce 'Close Dialog, button'",
          "It raises an accessibility validation warning"
        ],
        "correctAnswer": "`aria-label` completely overrides the inner text content 'X', so screen readers announce 'Close Dialog, button'",
        "explanation": "According to the Accessible Name and Description Computation spec, `aria-label` overrides child text contents."
      },
      {
        "question": "What is the primary accessibility failure of placing `outline: 0;` or `outline: none;` without providing an alternative focus style?",
        "options": [
          "Causes CSS syntax validation to fail",
          "Disables mouse clicks on links",
          "Hides the button from Googlebot",
          "Violates WCAG 2.4.7 (Focus Visible), rendering the website unusable for keyboard-only and motor-impaired users who cannot see where their focus is"
        ],
        "correctAnswer": "Violates WCAG 2.4.7 (Focus Visible), rendering the website unusable for keyboard-only and motor-impaired users who cannot see where their focus is",
        "explanation": "Removing focus outlines leaves keyboard navigators blind to which element is currently active, a critical accessibility violation."
      },
      {
        "question": "What does the `role='status'` ARIA landmark implicitly declare?",
        "options": [
          "A disabled form input",
          "An emergency alert with `aria-live='assertive'`",
          "A status bar fixed to the bottom of the screen",
          "An advisory region with implicit `aria-live='polite'` and `aria-atomic='true'`, suitable for success messages and progress updates"
        ],
        "correctAnswer": "An advisory region with implicit `aria-live='polite'` and `aria-atomic='true'`, suitable for success messages and progress updates",
        "explanation": "`role='status'` designates live regions for non-critical status updates that should be spoken politely without interrupting."
      }
    ]
  },
  {
    "title": "HTML & CSS: Modern CSS Native Nesting Rules",
    "description": "CSS native nesting spec, & combinator, nesting inside media queries, and specificity behavior.",
    "timeLimitMinutes": 12,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "How does native CSS nesting (standard in all modern browsers) differ from preprocessors like SASS?",
        "codeSnippet": ".card {\n  color: black;\n  & .title { font-weight: bold; }\n  &:hover { background: #eee; }\n}",
        "language": "css",
        "options": [
          "Native nesting only works inside `@media` rules",
          "Native nesting requires Ruby to compile",
          "Native nesting cannot use the `&` symbol",
          "Native nesting is parsed directly by browser engines without build steps, wrapping nested rules in `:is()` internally"
        ],
        "correctAnswer": "Native nesting is parsed directly by browser engines without build steps, wrapping nested rules in `:is()` internally",
        "explanation": "Native CSS nesting is handled directly by browser engines. Nested rules desugar to `:is(parent) child`."
      },
      {
        "question": "Can an `@media` query be directly nested inside a CSS selector rule natively?",
        "codeSnippet": ".sidebar {\n  width: 100%;\n  @media (min-width: 768px) {\n    width: 300px;\n  }\n}",
        "language": "css",
        "options": [
          "Only in Firefox Developer Edition",
          "No, media queries must always be placed at the root level of a stylesheet",
          "Only if wrapped in `@layer`",
          "Yes, nested `@media` rules are fully supported natively; the browser automatically scopes the query to the parent selector"
        ],
        "correctAnswer": "Yes, nested `@media` rules are fully supported natively; the browser automatically scopes the query to the parent selector",
        "explanation": "Native CSS nesting allows nesting conditional group rules (`@media`, `@supports`, `@container`) directly inside style rules."
      },
      {
        "question": "What does `&_element` (BEM concatenation without spaces) do in native CSS nesting?",
        "codeSnippet": ".block {\n  &_element { color: red; }\n}",
        "language": "css",
        "options": [
          "It converts to `.block._element`",
          "It matches `.block_element` identically to SASS",
          "It creates a class named `element`",
          "It does NOT concatenate strings like SASS; native `&` represents an element selector, so `&_element` is invalid or fails to match `.block_element`"
        ],
        "correctAnswer": "It does NOT concatenate strings like SASS; native `&` represents an element selector, so `&_element` is invalid or fails to match `.block_element`",
        "explanation": "In native CSS, `&` is a selector placeholder (like `:is(.block)`), not a raw string token. BEM string concatenation is unsupported."
      },
      {
        "question": "How do you style parent elements when a nested element matches a condition natively?",
        "codeSnippet": ".card {\n  /* Style .card when it has an active child: */\n  &:has(.active) { border-color: blue; }\n}",
        "language": "css",
        "options": [
          "Parent styling is impossible in CSS",
          "Use `& < .active`",
          "Use `&..parent`",
          "Use `&:has(...)` with the `:has()` relational selector"
        ],
        "correctAnswer": "Use `&:has(...)` with the `:has()` relational selector",
        "explanation": "Combining native nesting with `:has()` allows elegant conditional parent styling."
      },
      {
        "question": "What is the specificity of `.header { & h1 { color: red; } }`?",
        "options": [
          "0 specificity",
          "0 IDs, 2 classes",
          "1 element only",
          "The specificity of `:is(.header) h1`, which is 1 class and 1 element (0, 1, 1)"
        ],
        "correctAnswer": "The specificity of `:is(.header) h1`, which is 1 class and 1 element (0, 1, 1)",
        "explanation": "Native nesting desugars to `:is(parent) child`, matching the specificity of the parent plus child."
      }
    ]
  },
  {
    "title": "HTML & CSS: Print Style Sheets & Paged Media Styling",
    "description": "@media print, @page rules, page breaks (break-inside: avoid), and hiding interactive UI.",
    "timeLimitMinutes": 12,
    "tags": [
      "HTML & CSS",
      "HTML",
      "Frontend"
    ],
    "difficulty": "hard",
    "questions": [
      {
        "question": "How do you prevent a table row or card component from being sliced in half across two printed pages?",
        "codeSnippet": ".invoice-row {\n  break-inside: avoid; /* or page-break-inside: avoid; */\n}",
        "language": "css",
        "options": [
          "`print-slice: false;`",
          "`page-split: none;`",
          "`overflow: no-break;`",
          "`break-inside: avoid;` (modern CSS Fragmentation spec)"
        ],
        "correctAnswer": "`break-inside: avoid;` (modern CSS Fragmentation spec)",
        "explanation": "`break-inside: avoid` prevents page breaks inside the targeted element when printing."
      },
      {
        "question": "How can print style sheets reveal the destination URLs of links next to anchor text on paper?",
        "codeSnippet": "@media print {\n  a[href^='http']::after {\n    content: ' (' attr(href) ')';\n  }\n}",
        "language": "css",
        "options": [
          "It is impossible in CSS without JavaScript",
          "Links automatically print URLs by default",
          "Using `@page { show-urls: true; }`",
          "Using `::after` with `content: ' (' attr(href) ')';`"
        ],
        "correctAnswer": "Using `::after` with `content: ' (' attr(href) ')';`",
        "explanation": "`attr(href)` dynamically retrieves the element's attribute value and renders it in generated content."
      },
      {
        "question": "What does the CSS `@page` rule allow you to configure for printed documents?",
        "codeSnippet": "@page {\n  size: A4 portrait;\n  margin: 20mm;\n}",
        "language": "css",
        "options": [
          "Printer Wi-Fi settings",
          "Printer ink density",
          "Double-sided scanning speed",
          "Physical paper page dimensions, orientation (portrait/landscape), and page margins"
        ],
        "correctAnswer": "Physical paper page dimensions, orientation (portrait/landscape), and page margins",
        "explanation": "`@page` controls paged media properties like paper size (`A4`, `letter`) and printable sheet margins."
      },
      {
        "question": "Which CSS property forces an element to always start at the top of a brand new printed page?",
        "options": [
          "display: new-page;",
          "page-split: top;",
          "clear: print;",
          "break-before: page;"
        ],
        "correctAnswer": "break-before: page;",
        "explanation": "`break-before: page` inserts a page break immediately before the element."
      },
      {
        "question": "Why should navigation bars, video players, and chat widgets be hidden in `@media print`?",
        "options": [
          "They violate copyright law when printed",
          "They cause printer hardware jams",
          "Printers throw HTTP 400 errors on interactive elements",
          "They waste printer paper and ink, providing zero functional value on static printed physical documents"
        ],
        "correctAnswer": "They waste printer paper and ink, providing zero functional value on static printed physical documents",
        "explanation": "Print stylesheets should strip out ephemeral interactive UI (`display: none`) to present clean document content."
      }
    ]
  }
];
