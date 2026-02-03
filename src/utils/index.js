/**
 * Core utility functions for floating UI positioning
 * Converted from @floating-ui/utils
 */

// Math constants
export const min = Math.min
export const max = Math.max
export const round = Math.round
export const floor = Math.floor

// Coordinate helpers
export const createCoords = (v) => ({ x: v, y: v })

// Sides array
export const sides = ['top', 'right', 'bottom', 'left']

// Alignments
export const alignments = ['start', 'end']

// All placements
export const placements = sides.reduce(
  (acc, side) =>
    acc.concat(side, `${side}-${alignments[0]}`, `${side}-${alignments[1]}`),
  []
)

/**
 * Clamps a value between a minimum and maximum
 */
export function clamp(start, value, end) {
  return max(start, min(value, end))
}

/**
 * Evaluates a value that can be either a static value or a function
 */
export function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value
}

/**
 * Gets the main side from a placement string
 * @example getSide('top-start') => 'top'
 */
export function getSide(placement) {
  return placement.split('-')[0]
}

/**
 * Gets the alignment from a placement string
 * @example getAlignment('top-start') => 'start'
 */
export function getAlignment(placement) {
  return placement.split('-')[1]
}

/**
 * Gets the opposite axis
 */
export function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x'
}

/**
 * Gets the length property name for an axis
 */
export function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width'
}

const yAxisSides = new Set(['top', 'bottom'])

/**
 * Gets the axis for a placement's side
 */
export function getSideAxis(placement) {
  return yAxisSides.has(getSide(placement)) ? 'y' : 'x'
}

/**
 * Gets the axis perpendicular to a placement's side
 */
export function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement))
}

/**
 * Gets alignment sides for a placement
 */
export function getAlignmentSides(placement, rects, rtl = false) {
  const alignment = getAlignment(placement)
  const alignmentAxis = getAlignmentAxis(placement)
  const length = getAxisLength(alignmentAxis)

  let mainAlignmentSide =
    alignmentAxis === 'x'
      ? alignment === (rtl ? 'end' : 'start')
        ? 'right'
        : 'left'
      : alignment === 'start'
        ? 'bottom'
        : 'top'

  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide)
  }

  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)]
}

const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
}

const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
}

/**
 * Gets the opposite placement
 * @example getOppositePlacement('top') => 'bottom'
 */
export function getOppositePlacement(placement) {
  return placement.replace(
    /left|right|bottom|top/g,
    (side) => oppositeSideMap[side]
  )
}

/**
 * Gets the placement with opposite alignment
 * @example getOppositeAlignmentPlacement('top-start') => 'top-end'
 */
export function getOppositeAlignmentPlacement(placement) {
  return placement.replace(
    /start|end/g,
    (alignment) => oppositeAlignmentMap[alignment]
  )
}

/**
 * Gets expanded placements (with opposite alignments)
 */
export function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement)

  return [
    getOppositeAlignmentPlacement(placement),
    oppositePlacement,
    getOppositeAlignmentPlacement(oppositePlacement)
  ]
}

const lrPlacement = ['left', 'right']
const rlPlacement = ['right', 'left']
const tbPlacement = ['top', 'bottom']
const btPlacement = ['bottom', 'top']

function getSideList(side, isStart, rtl) {
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rlPlacement : lrPlacement
      return isStart ? lrPlacement : rlPlacement
    case 'left':
    case 'right':
      return isStart ? tbPlacement : btPlacement
    default:
      return []
  }
}

/**
 * Gets placements on the opposite axis
 */
export function getOppositeAxisPlacements(
  placement,
  flipAlignment,
  direction,
  rtl
) {
  const alignment = getAlignment(placement)
  let list = getSideList(getSide(placement), direction === 'start', rtl)

  if (alignment) {
    list = list.map((side) => `${side}-${alignment}`)

    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement))
    }
  }

  return list
}

/**
 * Expands a partial padding object to include all sides
 */
export function expandPaddingObject(padding) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...padding }
}

/**
 * Normalizes padding to a SideObject
 */
export function getPaddingObject(padding) {
  return typeof padding !== 'number'
    ? expandPaddingObject(padding)
    : { top: padding, right: padding, bottom: padding, left: padding }
}

/**
 * Converts a Rect to a ClientRectObject
 */
export function rectToClientRect(rect) {
  const { x, y, width, height } = rect
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  }
}

// Re-export Vue-specific utilities
export { getDPR } from './getDPR.js'
export { roundByDPR } from './roundByDPR.js'
export { toValue } from './toValue.js'
export { unwrapElement } from './unwrapElement.js'
