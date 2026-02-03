import { arrow as apply } from './dom/index.js';
import { unwrapElement } from './utils/unwrapElement';
import { toValue } from './utils/toValue';

/**
 * Positions an inner element of the floating element such that it is centered to the reference element.
 *
 * @param {Object} options - The arrow options
 * @param {*} options.element - The arrow element ref
 * @param {number} [options.padding] - Padding around the arrow
 * @returns {Object} Middleware object
 * @see https://floating-ui.com/docs/arrow
 */
export function arrow(options) {
  return {
    name: 'arrow',
    options,
    fn(args) {
      const element = unwrapElement(toValue(options.element));

      if (element == null) {
        return {};
      }

      return apply({ element, padding: options.padding }).fn(args);
    },
  };
}
