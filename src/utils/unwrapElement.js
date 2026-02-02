import { getNodeName, isNode } from './dom.js';

function isComponentPublicInstance(target) {
  return target != null && typeof target === 'object' && '$el' in target;
}

/**
 * Unwraps a Vue component instance to get the underlying DOM element
 * @param {*} target - Element, component instance, or null
 * @returns {Element|null} DOM element or null
 */
export function unwrapElement(target) {
  if (isComponentPublicInstance(target)) {
    const element = target.$el;

    return isNode(element) && getNodeName(element) === '#comment'
      ? null
      : element;
  }

  return target;
}
