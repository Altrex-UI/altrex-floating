/**
 * @altrex-ui/floating
 *
 * Vue 3 composables for positioning floating elements
 * Based on Floating UI (https://floating-ui.com)
 */

// ========================================
// Main Vue Composable
// ========================================
export { useFloating } from './useFloating.js'

// ========================================
// Arrow Middleware
// ========================================
export { arrow } from './arrow.js'

// ========================================
// Core Positioning (Framework-Agnostic)
// ========================================
export { computePosition } from './core/index.js'

// ========================================
// Core Middleware
// ========================================
export {
  autoPlacement,
  flip,
  hide,
  inline,
  offset,
  shift,
  size,
  // Core arrow (framework-agnostic version)
  arrow as arrowCore
} from './core/index.js'

// ========================================
// DOM Platform (Browser-Specific)
// ========================================
export {
  computePosition as computePositionDOM,
  autoUpdate,
  platform,
  getOverflowAncestors,
  isElement,
  getDocumentElement
} from './dom/index.js'

// ========================================
// Vue-Specific Utilities
// ========================================
export { toValue, unwrapElement, getDPR, roundByDPR } from './utils/index.js'

// ========================================
// Core Math Utilities
// ========================================
export {
  min,
  max,
  round,
  floor,
  createCoords,
  sides,
  alignments,
  placements,
  clamp,
  evaluate,
  getSide,
  getAlignment,
  getOppositeAxis,
  getAxisLength,
  getSideAxis,
  getAlignmentAxis,
  getAlignmentSides,
  getOppositePlacement,
  getOppositeAlignmentPlacement,
  getExpandedPlacements,
  getOppositeAxisPlacements,
  expandPaddingObject,
  getPaddingObject,
  rectToClientRect
} from './utils/index.js'

// ========================================
// DOM Utilities
// ========================================
export {
  getNodeName,
  getWindow,
  isNode,
  isHTMLElement,
  isShadowRoot,
  isOverflowElement,
  isTableElement,
  isTopLayer,
  isContainingBlock,
  getContainingBlock,
  isWebKit,
  isLastTraversableNode,
  getComputedStyle,
  getNodeScroll,
  getParentNode,
  getNearestOverflowAncestor
} from './utils/dom.js'

// ========================================
// Constants
// ========================================
export {
  // Placements
  top,
  right,
  bottom,
  left,
  topStart,
  topEnd,
  rightStart,
  rightEnd,
  bottomStart,
  bottomEnd,
  leftStart,
  leftEnd,
  // Strategies
  absolute,
  fixed
} from './core/constants.js'
