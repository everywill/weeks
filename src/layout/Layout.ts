/// <reference path="Layout.d.ts" />

import * as LayoutTypes from 'LayoutTypes';

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