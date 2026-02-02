# @altrex-ui/floating

Vue 3 composables for positioning floating elements (tooltips, dropdowns, popovers, modals).

Based on [Floating UI](https://floating-ui.com) - a low-level positioning library.

## Installation

```bash
npm install @altrex-ui/floating
```

## Quick Start

```vue
<script setup>
import { ref } from 'vue'
import { useFloating } from '@altrex-ui/floating'

const reference = ref(null)
const floating = ref(null)

const { floatingStyles } = useFloating(reference, floating, {
  placement: 'top'
})
</script>

<template>
  <button ref="reference">Hover me</button>
  <div ref="floating" :style="floatingStyles">
    Tooltip content
  </div>
</template>
```

## API

### `useFloating(reference, floating, options)`

Main composable for positioning a floating element relative to a reference element.

**Parameters:**
- `reference` (Ref): Reference element (button, input, etc.)
- `floating` (Ref): Floating element (tooltip, popover, etc.)
- `options` (Object): Configuration options
  - `placement` (String): Preferred placement ('top', 'bottom', 'left', 'right', etc.)
  - `middleware` (Array): Middleware functions (offset, flip, shift, etc.)
  - `strategy` (String): Position strategy ('absolute' or 'fixed')
  - `whileElementsMounted` (Function): Callback when elements are mounted

**Returns:**
- `x` (Ref<number>): X coordinate
- `y` (Ref<number>): Y coordinate
- `placement` (Ref<string>): Final placement
- `strategy` (Ref<string>): Position strategy
- `middlewareData` (Ref<object>): Middleware results
- `isPositioned` (Ref<boolean>): Whether positioned
- `floatingStyles` (ComputedRef<object>): Ready-to-use styles
- `update` (Function): Manually trigger update

## Middleware

### Arrow

Positions an arrow element pointing to the reference.

```vue
<script setup>
import { ref, computed } from 'vue'
import { useFloating, arrow } from '@altrex-ui/floating'

const reference = ref(null)
const floating = ref(null)
const arrowRef = ref(null)

const { floatingStyles, middlewareData } = useFloating(reference, floating, {
  placement: 'top',
  middleware: [
    arrow({ element: arrowRef })
  ]
})

const arrowX = computed(() => middlewareData.value.arrow?.x ?? 0)
const arrowY = computed(() => middlewareData.value.arrow?.y ?? 0)
</script>

<template>
  <button ref="reference">Reference</button>
  <div ref="floating" :style="floatingStyles">
    <div ref="arrowRef" :style="{ left: `${arrowX}px`, top: `${arrowY}px` }" />
    Content
  </div>
</template>
```

### Offset

Displaces the floating element from its reference.

```javascript
import { offset } from '@altrex-ui/floating'

useFloating(reference, floating, {
  middleware: [
    offset(10) // 10px offset
  ]
})
```

### Flip

Flips the floating element to opposite side if no space.

```javascript
import { flip } from '@altrex-ui/floating'

useFloating(reference, floating, {
  middleware: [
    flip()
  ]
})
```

### Shift

Shifts the floating element along the axis to keep it in view.

```javascript
import { shift } from '@altrex-ui/floating'

useFloating(reference, floating, {
  middleware: [
    shift({ padding: 5 })
  ]
})
```

### Size

Resizes the floating element based on available space.

```javascript
import { size } from '@altrex-ui/floating'

useFloating(reference, floating, {
  middleware: [
    size({
      apply({ availableWidth, availableHeight, elements }) {
        Object.assign(elements.floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`
        })
      }
    })
  ]
})
```

## Auto Update

Automatically update position when things change.

```vue
<script setup>
import { useFloating, autoUpdate } from '@altrex-ui/floating'

const { floatingStyles } = useFloating(reference, floating, {
  placement: 'top',
  whileElementsMounted: autoUpdate
})
</script>
```

## Advanced Usage

### Multiple Middleware

```javascript
import { useFloating, offset, flip, shift, arrow } from '@altrex-ui/floating'

const { floatingStyles, middlewareData } = useFloating(reference, floating, {
  placement: 'top',
  middleware: [
    offset(10),
    flip(),
    shift({ padding: 5 }),
    arrow({ element: arrowRef })
  ]
})
```

### Available Placements

- `'top'`, `'top-start'`, `'top-end'`
- `'bottom'`, `'bottom-start'`, `'bottom-end'`
- `'left'`, `'left-start'`, `'left-end'`
- `'right'`, `'right-start'`, `'right-end'`

### Position Strategies

- `'absolute'` (default) - Positioned relative to nearest positioned ancestor
- `'fixed'` - Positioned relative to viewport

## Package Exports

```javascript
// Main composable
import { useFloating } from '@altrex-ui/floating'

// Arrow middleware
import { arrow } from '@altrex-ui/floating'

// Core positioning (framework-agnostic)
import { computePosition } from '@altrex-ui/floating/core'

// DOM platform
import { autoUpdate } from '@altrex-ui/floating/dom'

// Utilities
import { toValue, getDPR } from '@altrex-ui/floating/utils'
import { getDocumentElement } from '@altrex-ui/floating/utils/dom'
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari (latest)
- Chrome Android (latest)

## License

MIT

## Credits

Based on [Floating UI](https://floating-ui.com) by Atomiks.

Converted and adapted for the Altrex Design System.
