/// <reference path="Layout.d.ts" />

import * as LayoutTypes from 'LayoutTypes';

const dim: LayoutTypes.css_dimension_t[] = [
  1, // CSS_FLEX_DIRECTION_COLUMN => HEIGHT
  1, // CSS_FLEX_DIRECTION_COLUMN_REVERSE => HEIGHT
  0, // CSS_FLEX_DIRECTION_ROW => WIDTH
  0, // CSS_FLEX_DIRECTION_ROW_REVERSE => WIDTH
];

const trailing: LayoutTypes.css_position_t[] = [
  2, // CSS_FLEX_DIRECTION_COLUMN => BOTTOM
  0, // CSS_FLEX_DIRECTION_COLUMN_REVERSE => TOP
  1, // CSS_FLEX_DIRECTION_ROW => RIGHT
  3, // CSS_FLEX_DIRECTION_ROW_REVERSE => LEFT
];

const leading: LayoutTypes.css_position_t[] = [
  0, // CSS_FLEX_DIRECTION_COLUMN => TOP
  2, // CSS_FLEX_DIRECTION_COLUMN_REVERSE => BOTTOM
  3, // CSS_FLEX_DIRECTION_ROW => LEFT
  1, // CSS_FLEX_DIRECTION_ROW_REVERSE => RIGHT
];

const isLayoutDimDefined: LayoutTypes.isDefined<LayoutTypes.css_flex_direction_t> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  const value = node.layout.dimensions[dim[axis]];
  return !!value && value >= 0.0;
};

const isStyleDimDefined: LayoutTypes.isDefined<LayoutTypes.css_flex_direction_t> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  const value = node.style.dimensions[dim[axis]];
  return !!value && value >= 0.0;
};

const eq: LayoutTypes.eq<number> = function (
  a: number | undefined,
  b: number | undefined,
) {
  if (a === undefined) {
    return b === undefined;
  }

  if (b === undefined) {
    return false;
  }

  return Math.abs(a - b) < 0.0001;
};

const fmaxf: LayoutTypes.compare<number> = function (
  a: number,
  b: number,
) {
  return (a > b) ? a : b;
};

const getLeadingMargin: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  return node.style.margin[leading[axis]];
};

const getTrailingMargin: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  return node.style.margin[trailing[axis]];
};

const getLeadingBorder: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  if (node.style.border[leading[axis]] >= 0) {
    return node.style.padding[leading[axis]];
  }
  return 0;
};

const getTrailingBorder: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  if (node.style.border[trailing[axis]] >= 0) {
    return node.style.padding[leading[axis]];
  }
  return 0;
};

const getLeadingPadding: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  if (node.style.padding[leading[axis]] >= 0) {
    return node.style.padding[leading[axis]];
  }
  return 0;
};

const getTrailingPadding: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  if (node.style.padding[trailing[axis]] >= 0) {
    return node.style.padding[leading[axis]];
  }
  return 0;
};

const getLeadingPaddingAndBorder: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  return getLeadingPadding(node, axis) + getLeadingBorder(node, axis);
};

const getTrailingPaddingAndBorder: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  return getTrailingPadding(node, axis) + getTrailingBorder(node, axis);
};

const getPaddingAndBorderAxis: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  return getLeadingPaddingAndBorder(node, axis) + getTrailingPaddingAndBorder(node, axis);
};

const boundAxis: LayoutTypes.boundAxis = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
  value: number,
) {
  let min = -Infinity;
  let max = Infinity;

  if (isColumnDirection(axis)) {
    min = node.style.minDimensions[LayoutTypes.css_dimension_t.CSS_HEIGHT];
    max = node.style.maxDimensions[LayoutTypes.css_dimension_t.CSS_HEIGHT];
  } else {
    min = node.style.minDimensions[LayoutTypes.css_dimension_t.CSS_WIDTH];
    max = node.style.maxDimensions[LayoutTypes.css_dimension_t.CSS_WIDTH];
  }

  let boundValue = value;
  if (max && max >= 0.0 && boundValue > max) {
    boundValue = max;
  }
  if (min && min >= 0.0 && boundValue < min) {
    boundValue = min;
  }

  return boundValue;
};

const setDimensionFromStyle: LayoutTypes.layoutSetterOnAxis = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  if (isLayoutDimDefined(node, axis) || !isStyleDimDefined(node, axis)) {
    return;
  }
  node.layout.dimensions[dim[axis]] = fmaxf(
    boundAxis(node, axis, node.style.dimensions[dim[axis]]),
    getPaddingAndBorderAxis(node, axis),
  );
};

const isColumnDirection: LayoutTypes.eq<LayoutTypes.css_flex_direction_t> = function (
  flexDirection: LayoutTypes.css_flex_direction_t | undefined,
) {
  return flexDirection === LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_COLUMN ||
    flexDirection === LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_COLUMN_REVERSE;
};

const getDirection: LayoutTypes.styleGetter<LayoutTypes.css_direction_t> = function (
  node: LayoutTypes.css_node_t,
) {
  return node.style.direction;
};

const getFlexDirection: LayoutTypes.styleGetter<LayoutTypes.css_flex_direction_t> = function (
  node: LayoutTypes.css_node_t,
) {
  return node.style.flex_direction;
};

const resolveDirection: LayoutTypes.layoutResolver<LayoutTypes.css_direction_t> = function (
  direction: LayoutTypes.css_direction_t,
  parentDirection: LayoutTypes.css_direction_t,
) {
  if (direction === LayoutTypes.css_direction_t.CSS_DIRECTION_INHERIT) {
    return parentDirection;
  }

  return direction;
};

const resolveAxis: LayoutTypes.layoutResolver<LayoutTypes.css_flex_direction_t> = function (
  flexDirection: LayoutTypes.css_flex_direction_t,
  direction: LayoutTypes.css_direction_t,
) {
  if (direction === LayoutTypes.css_direction_t.CSS_DIRECTION_RTL) {
    if (flexDirection === LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_ROW) {
      return LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_ROW_REVERSE;
    }
    if (flexDirection === LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_ROW_REVERSE) {
      return LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_COLUMN;
    }
  }
  return flexDirection;
};

const getCrossFlexDirection: LayoutTypes.layoutResolver<LayoutTypes.css_flex_direction_t> = function (
  mainAxis: LayoutTypes.css_flex_direction_t,
  direction: LayoutTypes.css_direction_t,
) {
  if (isColumnDirection(mainAxis)) {
    return resolveAxis(LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_ROW, direction);
  }
  return LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_COLUMN;

};

const layoutNodeImpl:LayoutTypes.layout = function (
  node: LayoutTypes.css_node_t,
  parentMaxWidth: number,
  parentMaxHeight: number,
  parentDirection: LayoutTypes.css_direction_t,
) {
  const direction: LayoutTypes.css_direction_t =
    resolveDirection(getDirection(node), parentDirection);
  const mainAxis: LayoutTypes.css_flex_direction_t = resolveAxis(getFlexDirection(node), direction);
  const crossAxis: LayoutTypes.css_flex_direction_t = getCrossFlexDirection(mainAxis, direction);

  setDimensionFromStyle(node, mainAxis);
  setDimensionFromStyle(node, crossAxis);

  node.layout.direction = direction;
};

const layoutNode: LayoutTypes.layout = function (
  node: LayoutTypes.css_node_t,
  parentMaxWidth: number,
  parentMaxHeight: number,
  parentDirection: LayoutTypes.css_direction_t,
) {
  const layout: LayoutTypes.css_layout_t = node.layout;
  const direction = node.style.direction;

  const skipLayout: boolean = eq(
    layout.last_requested_dimensions[LayoutTypes.css_dimension_t.CSS_WIDTH],
    layout.dimensions[LayoutTypes.css_dimension_t.CSS_WIDTH],
  ) && eq(
    layout.last_requested_dimensions[LayoutTypes.css_dimension_t.CSS_HEIGHT],
    layout.dimensions[LayoutTypes.css_dimension_t.CSS_HEIGHT],
  ) && eq(
    layout.last_parent_max_width,
    parentMaxWidth,
  ) && eq(
    layout.last_parent_max_height,
    parentMaxHeight,
  ) && eq(
    layout.last_direction,
    direction,
  );

  if (skipLayout) {
    layout.dimensions[LayoutTypes.css_dimension_t.CSS_WIDTH] =
      layout.last_dimensions[LayoutTypes.css_dimension_t.CSS_WIDTH];
    layout.dimensions[LayoutTypes.css_dimension_t.CSS_HEIGHT] =
      layout.last_dimensions[LayoutTypes.css_dimension_t.CSS_HEIGHT];
    layout.position[LayoutTypes.css_position_t.CSS_LEFT] =
      layout.last_position[LayoutTypes.css_position_t.CSS_LEFT];
    layout.position[LayoutTypes.css_position_t.CSS_TOP] =
      layout.last_position[LayoutTypes.css_position_t.CSS_TOP];
  } else {
    layout.last_requested_dimensions[LayoutTypes.css_dimension_t.CSS_WIDTH] =
      layout.dimensions[LayoutTypes.css_dimension_t.CSS_WIDTH];
    layout.last_requested_dimensions[LayoutTypes.css_dimension_t.CSS_HEIGHT] =
      layout.dimensions[LayoutTypes.css_dimension_t.CSS_HEIGHT];
    layout.last_parent_max_width = parentMaxWidth;
    layout.last_parent_max_height = parentMaxHeight;

    layoutNodeImpl(node, parentMaxWidth, parentMaxHeight, parentDirection);

    layout.last_dimensions[LayoutTypes.css_dimension_t.CSS_WIDTH] =
      layout.dimensions[LayoutTypes.css_dimension_t.CSS_WIDTH];
    layout.last_dimensions[LayoutTypes.css_dimension_t.CSS_HEIGHT] =
      layout.dimensions[LayoutTypes.css_dimension_t.CSS_HEIGHT];
    layout.last_position[LayoutTypes.css_position_t.CSS_LEFT] =
      layout.position[LayoutTypes.css_position_t.CSS_LEFT];
    layout.last_position[LayoutTypes.css_position_t.CSS_TOP] =
      layout.position[LayoutTypes.css_position_t.CSS_TOP];
  }
};
