import {computePosition as computePositionCore} from '../core/index.js';

import {platform} from './platform';

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
export const computePosition = (
  reference,
  floating,
  options,
) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {platform, ...options};
  const platformWithCache = {...mergedOptions.platform, _c: cache};
  return computePositionCore(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache,
  });
};

export {autoUpdate} from './autoUpdate';
export {
  arrow,
  autoPlacement,
  detectOverflow,
  flip,
  hide,
  inline,
  limitShift,
  offset,
  shift,
  size,
} from './middleware';
export {platform} from './platform';

// This export exists only for backwards compatibility. It will be removed in
// the next major version.
export {getOverflowAncestors} from '../utils/dom.js';
