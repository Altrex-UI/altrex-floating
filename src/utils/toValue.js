import { unref } from 'vue';

/**
 * Unwraps a ref, getter, or plain value
 * @param {*} source - Value, Ref, or getter function
 * @returns {*} Unwrapped value
 */
export function toValue(source) {
  return typeof source === 'function' ? source() : unref(source);
}
