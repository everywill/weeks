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

const getFlexDirection: LayoutTypes.styleGetter<LayoutTypes.css_flex_direction_t> = function (
  node: LayoutTypes.css_node_t,
) {
  return node.style.flex_direction;
};

const resolveDirection: LayoutTypes.nodeResolver<LayoutTypes.css_direction_t> = function (
  node: LayoutTypes.css_node_t,
  parentDirection: LayoutTypes.css_direction_t,
) {
  let direction: LayoutTypes.css_direction_t = node.style.direction;
  if (direction === LayoutTypes.css_direction_t.CSS_DIRECTION_INHERIT) {
    direction = parentDirection;
  }

  return direction;
};

const resolveAxis: LayoutTypes.nodeResolver<LayoutTypes.css_flex_direction_t> = function (
  node: LayoutTypes.css_node_t,
  direction: LayoutTypes.css_direction_t,
) {
  const flexDirection = getFlexDirection(node);
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

const layoutNodeImpl:LayoutTypes.layout = function (
  node: LayoutTypes.css_node_t,
  parentMaxWidth: number,
  parentMaxHeight: number,
  parentDirection: LayoutTypes.css_direction_t,
) {
  const direction: LayoutTypes.css_direction_t = resolveDirection(node, parentDirection);
  const mainAxis: LayoutTypes.css_flex_direction_t = resolveAxis(node, direction);
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