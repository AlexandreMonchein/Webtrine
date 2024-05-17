import _ from "lodash";

export const breakpointNames = {
  xsmall: "xsmall",
  small: "small",
  medium: "medium",
  large: "large",
  xlarge: "xlarge",
  wide: "wide",
};

export const breakpoints = {
  [breakpointNames.xsmall]: 0,
  [breakpointNames.small]: 600,
  [breakpointNames.medium]: 768,
  [breakpointNames.large]: 1024,
  [breakpointNames.xlarge]: 1440,
  [breakpointNames.wide]: 1920,
};

export const breakpointsOrder = [
  breakpointNames.xsmall,
  breakpointNames.small,
  breakpointNames.medium,
  breakpointNames.large,
  breakpointNames.xlarge,
  breakpointNames.wide,
];

export const getNextBreakpoint = (currentBreakpoint) => {
  const currentBreakpointIndex = breakpointsOrder.indexOf(currentBreakpoint);
  if (
    currentBreakpointIndex === -1 ||
    currentBreakpointIndex === breakpointsOrder.length - 1
  ) {
    return null;
  }

  return breakpointsOrder[currentBreakpointIndex + 1];
};

const breakpointMin = (name) => _.get(breakpoints, name, null);

const breakpointMax = (name) => {
  const next = getNextBreakpoint(name);

  return next ? breakpointMin(next) - 0.02 : Infinity;
};

export const breakpointMinSizes = _.mapValues(
  breakpoints,
  (size, breakpointName) => breakpointMin(breakpointName)
);

export const breakpointMaxSizes = _.mapValues(
  breakpoints,
  (size, breakpointName) => breakpointMax(breakpointName)
);

export const breakpointRanges = _.reduce(
  breakpointsOrder,
  (acc, name) => ({
    ...acc,
    [name]: [breakpointMinSizes[name], breakpointMaxSizes[name]],
  }),
  {}
);
