/// <reference path="Layout.d.ts" />

import * as LayoutTypes from 'LayoutTypes';

const dim: LayoutTypes.css_dimension_t[] = [
  LayoutTypes.css_dimension_t.CSS_HEIGHT, // CSS_FLEX_DIRECTION_COLUMN => HEIGHT
  LayoutTypes.css_dimension_t.CSS_HEIGHT, // CSS_FLEX_DIRECTION_COLUMN_REVERSE => HEIGHT
  LayoutTypes.css_dimension_t.CSS_WIDTH, // CSS_FLEX_DIRECTION_ROW => WIDTH
  LayoutTypes.css_dimension_t.CSS_WIDTH, // CSS_FLEX_DIRECTION_ROW_REVERSE => WIDTH
];

const leading: LayoutTypes.css_position_t[] = [
  LayoutTypes.css_position_t.CSS_TOP, // CSS_FLEX_DIRECTION_COLUMN => TOP
  LayoutTypes.css_position_t.CSS_BOTTOM, // CSS_FLEX_DIRECTION_COLUMN_REVERSE => BOTTOM
  LayoutTypes.css_position_t.CSS_LEFT, // CSS_FLEX_DIRECTION_ROW => LEFT
  LayoutTypes.css_position_t.CSS_RIGHT, // CSS_FLEX_DIRECTION_ROW_REVERSE => RIGHT
];

const trailing: LayoutTypes.css_position_t[] = [
  LayoutTypes.css_position_t.CSS_BOTTOM, // CSS_FLEX_DIRECTION_COLUMN => BOTTOM
  LayoutTypes.css_position_t.CSS_TOP, // CSS_FLEX_DIRECTION_COLUMN_REVERSE => TOP
  LayoutTypes.css_position_t.CSS_RIGHT, // CSS_FLEX_DIRECTION_ROW => RIGHT
  LayoutTypes.css_position_t.CSS_LEFT, // CSS_FLEX_DIRECTION_ROW_REVERSE => LEFT
];

const pos: LayoutTypes.css_position_t[] = [
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

const isFlexWrap: LayoutTypes.judge = function (
  node: LayoutTypes.css_node_t,
) {
  return node.style.flex_wrap === LayoutTypes.css_wrap_type_t.CSS_WRAP;
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

const getMarginAxis: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  return getLeadingMargin(node, axis) + getTrailingMargin(node, axis);
};

const getBorderAxis: LayoutTypes.styleGetter<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  return getLeadingPaddingAndBorder(node, axis) + getTrailingBorder(node, axis);
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

const getDimWithMargin: LayoutTypes.nodeResolver<number> = function (
  node: LayoutTypes.css_node_t,
  axis: LayoutTypes.css_flex_direction_t,
) {
  return node.layout.dimensions[dim[axis]] +
    getLeadingMargin(node, axis) + getTrailingMargin(node, axis);
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

  const leadingPaddingAndBorderMain: number = getLeadingPaddingAndBorder(node, mainAxis);
  const leadingPaddingAndBorderCross: number = getLeadingPaddingAndBorder(node, crossAxis);
  const paddingAndBorderOnAxisMain: number = getPaddingAndBorderAxis(node, mainAxis);
  const paddingAndBorderOnAxisCross: number = getPaddingAndBorderAxis(node, crossAxis);
  const isMainDimDefined: boolean = isLayoutDimDefined(node, mainAxis);
  const isCrossDimDefined: boolean = isLayoutDimDefined(node, crossAxis);
  const isNodeFlexWrap: boolean = isFlexWrap(node);
  const justifyContent: LayoutTypes.css_justify_t = node.style.justify_content;

  let child: LayoutTypes.css_node_t;
  let axis: LayoutTypes.css_flex_direction_t;

  let firstAbsoluteChild: LayoutTypes.css_node_t | null = null;
  let currentAbsoluteChild: LayoutTypes.css_node_t | null = null;

  let definedMainDim: number | undefined = undefined;
  if (isMainDimDefined) {
    definedMainDim = node.layout.dimensions[dim[mainAxis]] - paddingAndBorderOnAxisMain;
  }

  let startLine: number = 0;
  let endLine: number = 0;

  let linesMainDim: number = 0;
  let linesCrossDim: number = 0;
  let linesCount: number = 0;

  while (endLine < childCount) {
    let mainContentDim: number = 0;
    let flexibleChildrenCount: number = 0;
    let totalFlexible: number = 0;
    let nonFlexibleChildrenCount: number = 0;

    let isSimpleStackMain: boolean =
      (isMainDimDefined && justifyContent === LayoutTypes.css_justify_t.CSS_JUSTIFY_FLEX_START) ||
      (!isMainDimDefined && justifyContent !== LayoutTypes.css_justify_t.CSS_JUSTIFY_CENTER);
    let firstComplexMain: number = isSimpleStackMain ? childCount : startLine;

    let isSimpleStackCross = true;
    let firstComplexCross = childCount;

    let firstFlexChild: LayoutTypes.css_node_t | null = null;
    let currentFlexChild: LayoutTypes.css_node_t | null = null;

    let mainDim: number = leadingPaddingAndBorderMain;
    let crossDim: number = 0;

    // tslint:disable-next-line: no-increment-decrement
    for (let i: number = startLine; i < childCount; i ++) {
      child = node.get_child(node.context, i);

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
            paddingAndBorderOnAxisCross - getMarginAxis(child, crossAxis)),
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
        // for (let ii = 0; ii < 2; ii++) {
        //   const axis: LayoutTypes.css_flex_direction_t = (ii !== 0) ?
        //     LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_ROW :
        //     LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_COLUMN;
        //   if (isLayoutDimDefined(node, axis) &&
        //       !isStyleDimDefined(child, axis) &&
        //       isPosDefined(child, leading[axis]) &&
        //       isPosDefined(child, trailing[axis])
        //       ) {
        //     child.layout.dimensions[dim[axis]] = fmaxf(
        //       boundAxis(child, axis, node.layout.dimensions[dim[axis]] -
        //         getPaddingAndBorderAxis(node, axis) -
        //         getMaginAxis(child, axis) -
        //         getPosition(child, leading[axis]) -
        //         getPosition(child, trailing[axis]),
        //         ),
        //       getPaddingAndBorderAxis(child, axis),
        //     );
        //   }
        // }
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
          getMarginAxis(child, mainAxis);
      } else {
        if (child.style.position_type === LayoutTypes.css_position_type_t.CSS_POSITION_RELATIVE) {
          nonFlexibleChildrenCount += 1;
          nextContentDim = getDimWithMargin(child, mainAxis);
        }
      }

      if (isNodeFlexWrap &&
          isMainDimDefined &&
          mainContentDim + nextContentDim > (definedMainDim as number) &&
          i !== startLine) {
        break;
      }

      if (isSimpleStackMain &&
          // tslint:disable-next-line: max-line-length
          (child.style.position_type !== LayoutTypes.css_position_type_t.CSS_POSITION_RELATIVE || isFlex(child))) {
        isSimpleStackMain = false;
        firstComplexMain = i;
      }

      if (isSimpleStackCross &&
          (child.style.position_type !== LayoutTypes.css_position_type_t.CSS_POSITION_RELATIVE ||
            // tslint:disable-next-line: max-line-length
            (alignItem !== LayoutTypes.css_align_t.CSS_ALIGN_STRETCH && alignItem !== LayoutTypes.css_align_t.CSS_ALIGN_FLEX_START) ||
            (alignItem === LayoutTypes.css_align_t.CSS_ALIGN_STRETCH && !isCrossDimDefined))) {
        isSimpleStackCross = false;
        firstComplexCross = i;
      }

      if (isSimpleStackMain) {
        child.layout.position[pos[mainAxis]] += mainDim;

        mainDim += getDimWithMargin(child, mainAxis);
        crossDim = fmaxf(crossDim, boundAxis(child, crossAxis, getDimWithMargin(child, crossAxis)));
      }
      if (isSimpleStackCross) {
        child.layout.position[pos[crossAxis]] += linesCrossDim + leadingPaddingAndBorderCross;
      }

      mainContentDim += nextContentDim;
      endLine = i + 1;
    }

    // postion children(not absolute-positioned) on main-axis
    let leadingMainDim: number = 0;
    let betweenMainDim: number = 0;

    let remainingMainDim: number = 0;
    if (isMainDimDefined) {
      remainingMainDim = definedMainDim as number - mainContentDim;
    } else {
      remainingMainDim = fmaxf(mainContentDim, 0) - mainContentDim;
    }

    if (flexibleChildrenCount !== 0) {
      let flexibleMainDim: number = remainingMainDim / totalFlexible;
      let baseMainDim: number;
      let boundMainDim: number;

      currentFlexChild = firstFlexChild;
      while (currentFlexChild !== null) {
        baseMainDim = flexibleMainDim * currentFlexChild.style.flex +
          getPaddingAndBorderAxis(currentFlexChild, mainAxis);
      }
    } else if (justifyContent !== LayoutTypes.css_justify_t.CSS_JUSTIFY_FLEX_START) {
      if (justifyContent === LayoutTypes.css_justify_t.CSS_JUSTIFY_CENTER) {
        leadingMainDim = remainingMainDim / 2;
      } else if (justifyContent === LayoutTypes.css_justify_t.CSS_JUSTIFY_FLEX_END) {
        leadingMainDim = remainingMainDim;
      } else if (justifyContent === LayoutTypes.css_justify_t.CSS_JUSTIFY_SPACE_BETWEEN) {
        remainingMainDim = fmaxf(remainingMainDim, 0);
        if (flexibleChildrenCount + nonFlexibleChildrenCount - 1 !== 0) {
          betweenMainDim =
            remainingMainDim / (flexibleChildrenCount + nonFlexibleChildrenCount - 1);
        } else {
          betweenMainDim = 0;
        }
      } else if (justifyContent === LayoutTypes.css_justify_t.CSS_JUSTIFY_SPACE_AROUND) {
        betweenMainDim = remainingMainDim / (flexibleChildrenCount + nonFlexibleChildrenCount);
        leadingMainDim = betweenMainDim / 2;
      }
    }

    linesCrossDim += crossDim;
    linesMainDim = fmaxf(linesMainDim, mainDim);
    linesCount += 1;
    startLine = endLine;
  }


  // layout child on cross-axis according to alignContent when multiple lines
  if (linesCount > 1 && isCrossDimDefined) {

  }


  // fill and position absolute-positioned child
  currentAbsoluteChild = firstAbsoluteChild;
  while (currentAbsoluteChild !== null) {
    // tslint:disable-next-line: no-increment-decrement
    for (let ii = 0; ii < 2; ii++) {
      axis = (ii !== 0) ?
        LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_ROW :
        LayoutTypes.css_flex_direction_t.CSS_FLEX_DIRECTION_COLUMN;
      if (isLayoutDimDefined(node, axis) &&
          !isStyleDimDefined(currentAbsoluteChild, axis) &&
          isPosDefined(currentAbsoluteChild, leading[axis]) &&
          isPosDefined(currentAbsoluteChild, trailing[axis])) {
        currentAbsoluteChild.layout.dimensions[dim[axis]] = fmaxf(
          boundAxis(currentAbsoluteChild, axis, node.layout.dimensions[dim[axis]] -
            getBorderAxis(node, axis) -
            getMarginAxis(currentAbsoluteChild, axis) -
            getPosition(currentAbsoluteChild, leading[axis]) - 
            getPosition(currentAbsoluteChild, trailing[axis])),
          getPaddingAndBorderAxis(currentAbsoluteChild, axis),
        );
      }

      if (isPosDefined(currentAbsoluteChild, trailing[axis]) &&
          !isPosDefined(currentAbsoluteChild, leading[axis])) {
        currentAbsoluteChild.layout.position[leading[axis]] =
            node.layout.dimensions[dim[axis]] -
            currentAbsoluteChild.layout.dimensions[dim[axis]] -
            getPosition(currentAbsoluteChild, trailing[axis]);
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
