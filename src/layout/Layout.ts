/// <reference path="Layout.d.ts" />

import * as LayoutTypes from 'LayoutTypes';

const dim: LayoutTypes.css_dimension_t[] = [
  LayoutTypes.css_dimension_t.CSS_HEIGHT, // CSS_FLEX_DIRECTION_COLUMN => HEIGHT
  LayoutTypes.css_dimension_t.CSS_HEIGHT, // CSS_FLEX_DIRECTION_COLUMN_REVERSE => HEIGHT
  LayoutTypes.css_dimension_t.CSS_WIDTH, // CSS_FLEX_DIRECTION_ROW => WIDTH
  LayoutTypes.css_dimension_t.CSS_WIDTH, // CSS_FLEX_DIRECTION_ROW_REVERSE => WIDTH
];

const trailing: LayoutTypes.css_position_t[] = [
  LayoutTypes.css_position_t.CSS_BOTTOM, // CSS_FLEX_DIRECTION_COLUMN => BOTTOM
  LayoutTypes.css_position_t.CSS_TOP, // CSS_FLEX_DIRECTION_COLUMN_REVERSE => TOP
  LayoutTypes.css_position_t.CSS_RIGHT, // CSS_FLEX_DIRECTION_ROW => RIGHT
  LayoutTypes.css_position_t.CSS_LEFT, // CSS_FLEX_DIRECTION_ROW_REVERSE => LEFT
];

const leading: LayoutTypes.css_position_t[] = [
  LayoutTypes.css_position_t.CSS_TOP, // CSS_FLEX_DIRECTION_COLUMN => TOP
  LayoutTypes.css_position_t.CSS_BOTTOM, // CSS_FLEX_DIRECTION_COLUMN_REVERSE => BOTTOM
  LayoutTypes.css_position_t.CSS_LEFT, // CSS_FLEX_DIRECTION_ROW => LEFT
  LayoutTypes.css_position_t.CSS_RIGHT, // CSS_FLEX_DIRECTION_ROW_REVERSE => RIGHT
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

const isPosDefined: LayoutTypes.isDefined<LayoutTypes.css_position_t> = function (
  node: LayoutTypes.css_node_t,
  position: LayoutTypes.css_position_t,
) {
  return !isNaN(node.style.position[position]);
};

const isFlex: LayoutTypes.judge = function (
  node: LayoutTypes.css_node_t,
) {
  return node.style.position_type === LayoutTypes.css_position_type_t.CSS_POSITION_RELATIVE &&
    getFlex(node) > 0;
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

const getPosition: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  position: LayoutTypes.css_position_t,
) {
  const result = node.style.position[position];
  if (!!result) {
    return result;
  }
  return 0;
};

const getFlex: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
) {
  return node.style.flex;
};

const getFlexWrap: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
) {
  return node.style.flex_wrap === LayoutTypes.css_wrap_type_t.CSS_WRAP;
};

const getRelativePosition: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  const lead = getPosition(node, leading[axis]);
  if (!!lead) {
    return lead;
  }
  return - getPosition(node, trailing[axis]);
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
  const result = node.style.border[leading[axis]];
  if (result >= 0) {
    return result;
  }
  return 0;
};

const getTrailingBorder: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  const result = node.style.border[trailing[axis]];
  if (result >= 0) {
    return result;
  }
  return 0;
};

const getLeadingPadding: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  const result = node.style.padding[leading[axis]];
  if (result >= 0) {
    return result;
  }
  return 0;
};

const getTrailingPadding: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  const result = node.style.padding[trailing[axis]];
  if (result >= 0) {
    return result;
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

const getMaginAxis: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  return getLeadingMargin(node, axis) + getTrailingMargin(node, axis);
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

const resolveAlignItem: LayoutTypes.layoutResolver<LayoutTypes.css_align_t> = function(
  nodeAlignItems: LayoutTypes.css_align_t,
  childAlignSelf: LayoutTypes.css_align_t,
) {
  if (childAlignSelf !== LayoutTypes.css_align_t.CSS_ALIGN_AUTO) {
    return childAlignSelf;
  }
  return nodeAlignItems;
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

const getCrossFlexDirection: LayoutTypes.layoutResolver<LayoutTypes.css_flex_direction_t> = 
  function (
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

  // node.layout.position[leading[mainAxis]] +=
  //   getLeadingMargin(node, mainAxis) + getRelativePosition(node, mainAxis);
  // node.layout.position[trailing[mainAxis]] +=
  //   getTrailingMargin(node, mainAxis) + getRelativePosition(node, mainAxis);

  const childCount: number = node.children_count;

  const paddingAndBorderOnAxisCross = getPaddingAndBorderAxis(node, crossAxis);
  const isMainDimDefined = isLayoutDimDefined(node, mainAxis);
  const isCrossDimDefined = isLayoutDimDefined(node, crossAxis);

  let firstAbsoluteChild: LayoutTypes.css_node_t | null = null;
  let currentAbsoluteChild: LayoutTypes.css_node_t | null = null;

  let startLine: number = 0;
  let endLine: number = 0;

  while (endLine < childCount) {
    let mainContentDim: number = 0;
    let flexibleChildrenCount: number = 0;
    let totalFlexible: number = 0;
    let nonFlexibleChildrenCount: number = 0;

    let firstFlexChild: LayoutTypes.css_node_t | null = null;
    let currentFlexChild: LayoutTypes.css_node_t | null = null;

    // tslint:disable-next-line: no-increment-decrement
    for (let i: number = startLine; i < childCount; i ++) {
      const child: LayoutTypes.css_node_t = node.get_child(node.context, i);

      child.next_absolute_child = null;
      child.next_flex_child = null;

      const alignItem: LayoutTypes.css_align_t =
        resolveAlignItem(node.style.align_items, child.style.align_self);
      // prefill children's layout dimension as early as possible
      if (alignItem === LayoutTypes.css_align_t.CSS_ALIGN_STRETCH &&
          child.style.position_type === LayoutTypes.css_position_type_t.CSS_POSITION_RELATIVE &&
          isCrossDimDefined &&
          !isStyleDimDefined(child, crossAxis)) {
        child.layout.dimensions[dim[crossAxis]] = fmaxf(
          boundAxis(child, crossAxis, node.layout.dimensions[dim[crossAxis]] -
            paddingAndBorderOnAxisCross - getMaginAxis(child, crossAxis)),
          getPaddingAndBorderAxis(child, crossAxis),
        );
      // tslint:disable-next-line: max-line-length
      } else if (child.style.position_type === LayoutTypes.css_position_type_t.CSS_POSITION_ABSOLUTE) {
        if (firstAbsoluteChild === null) {
          firstAbsoluteChild = child;
        }
        if (currentAbsoluteChild !== null) {
          (currentAbsoluteChild as LayoutTypes.css_node_t).next_absolute_child = child;
        }
        currentAbsoluteChild = child;

        // tslint:disable-next-line: no-increment-decrement
        for (let ii = 0; ii < 2; ii++) {
          const axis: LayoutTypes.css_flex_direction_t = (ii !== 0) ?
            LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_ROW :
            LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_COLUMN;
          if (isLayoutDimDefined(node, axis) &&
              !isStyleDimDefined(child, axis) &&
              isPosDefined(child, leading[axis]) &&
              isPosDefined(child, trailing[axis])
              ) {
            child.layout.dimensions[dim[axis]] = fmaxf(
              boundAxis(child, axis, node.layout.dimensions[dim[axis]] -
                getPaddingAndBorderAxis(node, axis) -
                getMaginAxis(child, axis) -
                getPosition(child, leading[axis]) -
                getPosition(child, trailing[axis]),
                ),
              getPaddingAndBorderAxis(child, axis),
            );
          }
        }
      }

      let nextContentDim: number = 0;

      if (isMainDimDefined && isFlex(child)) {
        flexibleChildrenCount += 1;
        totalFlexible += child.style.flex;

        if (firstFlexChild === null) {
          firstFlexChild = child;
        }

        if (currentFlexChild !== null) {
          (currentFlexChild as LayoutTypes.css_node_t).next_flex_child = child;
        }
        currentFlexChild = child;

        // smallest possible size of the child for computing remaining available space
        nextContentDim = getPaddingAndBorderAxis(child, mainAxis) +
          getMaginAxis(child, mainAxis);
      } else {
        if (child.style.position_type === LayoutTypes.css_position_type_t.CSS_POSITION_RELATIVE) {
          nonFlexibleChildrenCount += 1;
        }
      }
    }
  }
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
