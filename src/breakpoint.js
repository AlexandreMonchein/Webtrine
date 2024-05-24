import { css } from "styled-components";

import { breakpointMaxSizes, breakpointMinSizes } from "./breakpointDef";

export const atRule = (query, styles) => () =>
  query === null
    ? css`
        ${styles}
      `
    : css`
        ${query} {
          ${styles};
        }
      `;

const generator = (conditionFn, breakpointName, styles) => {
  const condition = conditionFn(breakpointName);

  return atRule(condition === null ? null : `@media (${condition})`, styles);
};

const minCondition = (breakpointName) => {
  const size = breakpointMinSizes[breakpointName];

  return size === 0 ? null : `min-width: ${size}px`;
};

const maxCondition = (breakpointName) => {
  const size = breakpointMaxSizes[breakpointName];

  return size === Infinity ? null : `max-width: ${size}px`;
};

const min = (breakpointName, styles) =>
  generator(minCondition, breakpointName, styles);

const max = (breakpointName, styles) =>
  generator(maxCondition, breakpointName, styles);

const only = (breakpointName, styles) => {
  const minConditionValue = minCondition(breakpointName);
  const maxConditionValue = maxCondition(breakpointName);

  if (minConditionValue && maxConditionValue) {
    return atRule(
      `@media (${minConditionValue}) and (${maxConditionValue})`,
      styles
    );
  }

  return (maxConditionValue === null ? min : max)(breakpointName, styles);
};

export const bp = { max, maxCondition, min, minCondition, only };
