const CSS_UNDEFINED = undefined;

const CSS_DIRECTION_INHERIT = 'inherit';
const CSS_DIRECTION_LTR = 'ltr';
const CSS_DIRECTION_RTL = 'rtl';

const CSS_FLEX_DIRECTION_ROW = 'row';
const CSS_FLEX_DIRECTION_ROW_REVERSE = 'row-reverse';
const CSS_FLEX_DIRECTION_COLUMN = 'column';
const CSS_FLEX_DIRECTION_COLUMN_REVERSE = 'column-reverse';

const CSS_JUSTIFY_FLEX_START = 'flex-start';
const CSS_JUSTIFY_CENTER = 'center';
const CSS_JUSTIFY_FLEX_END = 'flex-end';
const CSS_JUSTIFY_SPACE_BETWEEN = 'space-between';
const CSS_JUSTIFY_SPACE_AROUND = 'space-around';

const CSS_ALIGN_FLEX_START = 'flex-start';
const CSS_ALIGN_CENTER = 'center';
const CSS_ALIGN_FLEX_END = 'flex-end';
const CSS_ALIGN_STRETCH = 'stretch';

const CSS_POSITION_RELATIVE = 'relative';
const CSS_POSITION_ABSOLUTE = 'absolute';

const CSS_NOWRAP = 'no-wrap';
const CSS_WRAP = 'wrap';

const leading = {
  'row': 'left',
  'row-reverse': 'right',
  'column': 'top',
  'column-reverse': 'bottom'
};
const trailing = {
  'row': 'right',
  'row-reverse': 'left',
  'column': 'bottom',
  'column-reverse': 'top'
};
const pos = {
  'row': 'left',
  'row-reverse': 'right',
  'column': 'top',
  'column-reverse': 'bottom'
};
const dim = {
  'row': 'width',
  'row-reverse': 'width',
  'column': 'height',
  'column-reverse': 'height'
};

function isUndefined(value) {
  return value === CSS_UNDEFINED;
}

function isRowDirection(flexDirection) {
  return flexDirection === CSS_FLEX_DIRECTION_ROW ||
    flexDirection === CSS_FLEX_DIRECTION_ROW_REVERSE;
}

function isColumnDirection(flexDirection) {
  return flexDirection === CSS_FLEX_DIRECTION_COLUMN ||
    flexDirection === CSS_FLEX_DIRECTION_COLUMN_REVERSE;
}

function getLeadingMargin(node, axis) {
  let value;
  switch (axis) {
    case 'row':            value = node.style.marginLeft;   break;
    case 'row-reverse':    value = node.style.marginRight;  break;
    case 'column':         value = node.style.marginTop;    break;
    case 'column-reverse': value = node.style.marginBottom; break;
  }

  if (value !== undefined) {
    return value;
  }

  if (node.style.margin !== undefined) {
    return node.style.margin;
  }

  return 0;
}

function getTrailingMargin(node, axis) {
  let value;
  switch (axis) {
    case 'row':            value = node.style.marginRight;  break;
    case 'row-reverse':    value = node.style.marginLeft;   break;
    case 'column':         value = node.style.marginBottom; break;
    case 'column-reverse': value = node.style.marginTop;    break;
  }

  if (value != undefined) {
    return value;
  }

  if (node.style.margin !== undefined) {
    return node.style.margin;
  }

  return 0;
}

function getLeadingBorder(node, axis) {
  let value;
  switch (axis) {
    case 'row':            value = node.style.borderLeftWidth;   break;
    case 'row-reverse':    value = node.style.borderRightWidth;  break;
    case 'column':         value = node.style.borderTopWidth;    break;
    case 'column-reverse': value = node.style.borderBottomWidth; break;
  }

  if (value != undefined && value >= 0) {
    return value;
  }

  if (node.style.borderWidth !== undefined && node.style.borderWidth >= 0) {
    return node.style.borderWidth;
  }

  return 0;
}

function getTrailingBorder(node, axis) {
  let value;
  switch (axis) {
    case 'row':            value = node.style.borderRightWidth;  break;
    case 'row-reverse':    value = node.style.borderLeftWidth;   break;
    case 'column':         value = node.style.borderBottomWidth; break;
    case 'column-reverse': value = node.style.borderTopWidth;    break;
  }

  if (value != undefined && value >= 0) {
    return value;
  }

  if (node.style.borderWidth !== undefined && node.style.borderWidth >= 0) {
    return node.style.borderWidth;
  }

  return 0;
}

function getLeadingPadding(node, axis) {
  let value;
  switch (axis) {
    case 'row':            value = node.style.paddingLeft;   break;
    case 'row-reverse':    value = node.style.paddingRight;  break;
    case 'column':         value = node.style.paddingTop;    break;
    case 'column-reverse': value = node.style.paddingBottom; break;
  }

  if (value != undefined && value >= 0) {
    return value;
  }

  if (node.style.padding !== undefined && node.style.padding >= 0) {
    return node.style.padding;
  }

  return 0;
}

function getTrailingPadding(node, axis) {
  let value;
  switch (axis) {
    case 'row':            value = node.style.paddingRight;  break;
    case 'row-reverse':    value = node.style.paddingLeft;   break;
    case 'column':         value = node.style.paddingBottom; break;
    case 'column-reverse': value = node.style.paddingTop;    break;
  }

  if (value != undefined && value >= 0) {
    return value;
  }

  if (node.style.padding !== undefined && node.style.padding >= 0) {
    return node.style.padding;
  }

  return 0;
}

function getMarginAxis(node, axis) {
  return getLeadingMargin(node, axis) + getTrailingMargin(node, axis);
}

function getBorderAxis(node, axis) {
  return getLeadingBorder(node, axis) + getTrailingBorder(node, axis);
}

function getLeadingPaddingAndBorder(node, axis) {
  return getLeadingPadding(node, axis) + getLeadingBorder(node, axis);
}

function getTrailingPaddingAndBorder(node, axis) {
  return getTrailingPadding(node, axis) + getTrailingBorder(node, axis);
}

function getPaddingAndBorderAxis(node, axis) {
  return getLeadingPaddingAndBorder(node, axis) +
      getTrailingPaddingAndBorder(node, axis);
}

function getJustifyContent(node) {
  if (node.style.justifyContent) {
    return node.style.justifyContent;
  }
  return 'flex-start';
}

function getAlignContent(node) {
  if (node.style.alignContent) {
    return node.style.alignContent;
  }
  return 'flex-start';
}

function getAlignItem(node, child) {
  if (child.style.alignSelf) {
    return child.style.alignSelf;
  }
  if (node.style.alignItems) {
    return node.style.alignItems;
  }
  return 'stretch';
}

function resolveDirection(node, parentDirection) {
  let direction;
  if (node.style.direction) {
    direction = node.style.direction;
  } else {
    direction = CSS_DIRECTION_INHERIT;
  }

  if (direction === CSS_DIRECTION_INHERIT) {
    direction = (parentDirection === undefined ? CSS_DIRECTION_LTR : parentDirection);
  }

  return direction;
}

function getFlexDirection(node) {
  if (node.style.flexDirection) {
    return node.style.flexDirection;
  }
  return CSS_FLEX_DIRECTION_COLUMN;
}

function getCrossFlexDirection(flexDirection, direction) {
  if (isColumnDirection(flexDirection)) {
    return resolveAxis(CSS_FLEX_DIRECTION_ROW, direction);
  } else {
    return CSS_FLEX_DIRECTION_COLUMN;
  }
}

function resolveAxis(axis, direction) {
  if (direction === CSS_DIRECTION_RTL) {
    if (axis === CSS_FLEX_DIRECTION_ROW) {
      return CSS_FLEX_DIRECTION_ROW_REVERSE;
    } else if (axis === CSS_FLEX_DIRECTION_ROW_REVERSE) {
      return CSS_FLEX_DIRECTION_ROW;
    }
  }

  return axis;
}

function getPositionType(node) {
  if (node.style.position) {
    return node.style.position;
  }
  return CSS_POSITION_RELATIVE;
}

function isFlex(node) {
  return (
    getPositionType(node) === CSS_POSITION_RELATIVE &&
    node.style.flex > 0
  );
}

function isFlexWrap(node) {
  return node.style.flexWrap === CSS_WRAP;
}

function getDimWithMargin(node, axis) {
  return node.layout[dim[axis]] + getMarginAxis(node, axis);
}

function isDimDefined(node, axis) {
  return node.style[dim[axis]] !== undefined && node.style[dim[axis]] >= 0;
}

function isPosDefined(node, pos) {
  return node.style[pos] !== undefined;
}

function getPosition(node, pos) {
  if (node.style[pos] !== undefined) {
    return node.style[pos];
  }
  return 0;
}

function boundAxis(node, axis, value) {
  var min = {
    'row': node.style.minWidth,
    'row-reverse': node.style.minWidth,
    'column': node.style.minHeight,
    'column-reverse': node.style.minHeight
  }[axis];

  var max = {
    'row': node.style.maxWidth,
    'row-reverse': node.style.maxWidth,
    'column': node.style.maxHeight,
    'column-reverse': node.style.maxHeight
  }[axis];

  var boundValue = value;
  if (max !== undefined && max >= 0 && boundValue > max) {
    boundValue = max;
  }
  if (min !== undefined && min >= 0 && boundValue < min) {
    boundValue = min;
  }
  return boundValue;
}

function fmaxf(a, b) {
  if (a > b) {
    return a;
  }
  return b;
}

function setDimensionFromStyle(node, axis) {
  // The parent already computed us a width or height. We just skip it
  if (node.layout[dim[axis]] !== undefined) {
    return;
  }
  // We only run if there's a width or height defined
  if (!isDimDefined(node, axis)) {
    return;
  }

  // The dimensions can never be smaller than the padding and border
  node.layout[dim[axis]] = fmaxf(
    boundAxis(node, axis, node.style[dim[axis]]),
    getPaddingAndBorderAxis(node, axis)
  );
}

function getRelativePosition(node, axis) {
  if (node.style[leading[axis]] !== undefined) {
    return getPosition(node, leading[axis]);
  }
  return -getPosition(node, trailing[axis]);
}

function fillNodes(node) {
  if (!node.layout || node.isDirty) {
    node.layout = {
      width: undefined,
      height: undefined,
      top: 0,
      left: 0,
      right: undefined,
      bottom: undefined
    };
  }

  if (!node.style) {
    node.style = {};
  }

  if (!node.children) {
    node.children = [];
  }
  node.children.forEach(fillNodes);
  return node;
}

function layoutNodeImpl(node, parentMaxWidth, parentDirection) {
  const direction = resolveDirection(node, parentDirection);
  const mainAxis = resolveAxis(getFlexDirection(node), direction);
  const crossAxis = getCrossFlexDirection(mainAxis, direction);
  const resolvedRowAxis = resolveAxis(CSS_FLEX_DIRECTION_ROW, direction);

  // Handle width and height style attributes
  setDimensionFromStyle(node, mainAxis);
  setDimensionFromStyle(node, crossAxis);

  // Set the resolved resolution in the node's layout
  node.layout.direction = direction;

  node.layout[leading[mainAxis]] += getLeadingMargin(node, mainAxis) +
    getRelativePosition(node, mainAxis);
  node.layout[trailing[mainAxis]] += getTrailingMargin(node, mainAxis) +
    getRelativePosition(node, mainAxis);
  node.layout[leading[crossAxis]] += getLeadingMargin(node, crossAxis) +
    getRelativePosition(node, crossAxis);
  node.layout[trailing[crossAxis]] += getTrailingMargin(node, crossAxis) +
    getRelativePosition(node, crossAxis);

  const childCount = node.children.length;
  const paddingAndBorderAxisResolvedRow = getPaddingAndBorderAxis(node, resolvedRowAxis);

  const isNodeFlexWrap = isFlexWrap(node);

  const justifyContent = getJustifyContent(node);

  const leadingPaddingAndBorderMain = getLeadingPaddingAndBorder(node, mainAxis);
  const leadingPaddingAndBorderCross = getLeadingPaddingAndBorder(node, crossAxis);
  const paddingAndBorderAxisMain = getPaddingAndBorderAxis(node, mainAxis);
  const paddingAndBorderAxisCross = getPaddingAndBorderAxis(node, crossAxis);

  const isMainDimDefined = !isUndefined(node.layout[dim[mainAxis]]);
  const isCrossDimDefined = !isUndefined(node.layout[dim[crossAxis]]);
  const isMainRowDirection = isRowDirection(mainAxis);

  let i;
  let ii;
  let child;
  let axis;

  let firstAbsoluteChild = null;
  let currentAbsoluteChild = null;

  let definedMainDim = CSS_UNDEFINED;
  if (isMainDimDefined) {
    definedMainDim = node.layout[dim[mainAxis]] - paddingAndBorderAxisMain;
  }

  let startLine = 0;
  let endLine = 0;

  let alreadyComputedNextLayout = 0;
  let linesCrossDim = 0;
  let linesMainDim = 0;
  let linesCount = 0;
  
  while(endLine < childCount) {
    let mainContentDim = 0;

    let flexibleChildrenCount = 0;
    let totalFlexible = 0;
    let nonFlexibleChildrenCount = 0;

    let isSimpleStackMain =
        (isMainDimDefined && justifyContent === CSS_JUSTIFY_FLEX_START) ||
        (!isMainDimDefined && justifyContent !== CSS_JUSTIFY_CENTER);
    let firstComplexMain = (isSimpleStackMain ? childCount : startLine);

    let isSimpleStackCross = true;
    let firstComplexCross = childCount;

    let firstFlexChild = null;
    let currentFlexChild = null;

    let mainDim = leadingPaddingAndBorderMain;
    let crossDim = 0;

    let maxWidth;
    for (i = startLine; i < childCount; i++) {
      child = node.children[i];
      child.nextAbsoluteChild = null;
      child.nextFlexChild = null;

      const alignItem = getAlignItem(node, child);

      if (getPositionType(child) === CSS_POSITION_ABSOLUTE) {
        // Store a private linked list of absolutely positioned children
        // so that we can efficiently traverse them later.
        if (firstAbsoluteChild === null) {
          firstAbsoluteChild = child;
        }
        if (currentAbsoluteChild !== null) {
          currentAbsoluteChild.nextAbsoluteChild = child;
        }
        currentAbsoluteChild = child;

        // Pre-fill dimensions when using absolute position and both offsets for the axis are defined (either both
        // left and right or top and bottom).
        for (ii = 0; ii < 2; ii++) {
          axis = (ii !== 0) ? CSS_FLEX_DIRECTION_ROW : CSS_FLEX_DIRECTION_COLUMN;
          if (!isUndefined(node.layout[dim[axis]]) &&
              !isDimDefined(child, axis) &&
              isPosDefined(child, leading[axis]) &&
              isPosDefined(child, trailing[axis])) {
            child.layout[dim[axis]] = fmaxf(
              boundAxis(child, axis, node.layout[dim[axis]] -
                getBorderAxis(node, axis) -
                getMarginAxis(child, axis) -
                getPosition(child, leading[axis]) -
                getPosition(child, trailing[axis])),
              // You never want to go smaller than padding
              getPaddingAndBorderAxis(child, axis)
            );
          }
        }
      }

      if (isMainDimDefined && isFlex(child)) {

      } else {
        maxWidth = CSS_UNDEFINED;
        if (!isMainRowDirection) {
          if (isDimDefined(node, resolvedRowAxis)) {
            maxWidth = node.layout[dim[resolvedRowAxis]] - paddingAndBorderAxisResolvedRow;
          } else {
            maxWidth = parentMaxWidth -
              getMarginAxis(node, resolvedRowAxis) -
              paddingAndBorderAxisResolvedRow;
          }
        }
        layoutNode(child, maxWidth, direction);
      }

      if (isSimpleStackMain &&
          (getPositionType(child) !== CSS_POSITION_RELATIVE || isFlex(child))) {
        isSimpleStackMain = false;
        firstComplexMain = i;
      }

      if (isSimpleStackCross &&
          (getPositionType(child) !== CSS_POSITION_RELATIVE ||
              (alignItem !== CSS_ALIGN_STRETCH && alignItem !== CSS_ALIGN_FLEX_START) ||
              isUndefined(child.layout[dim[crossAxis]]))) {
        isSimpleStackCross = false;
        firstComplexCross = i;
      }

      endLine = i + 1;
    }

    for (i = firstComplexMain; i < endLine; i++) {
      child = node.children[i];

      if (getPositionType(child) === CSS_POSITION_ABSOLUTE &&
          isPosDefined(child, leading[mainAxis])) {
        // In case the child is position absolute and has left/top being
        // defined, we override the position to whatever the user said
        // (and margin/border).
        child.layout[pos[mainAxis]] = getPosition(child, leading[mainAxis]) +
          getLeadingBorder(node, mainAxis) +
          getLeadingMargin(child, mainAxis);
      } else {
        child.layout[pos[mainAxis]] += mainDim;
      }
    }

    for (i = firstComplexCross; i < endLine; i++) {
      child = node.children[i];

      if (getPositionType(child) === CSS_POSITION_ABSOLUTE &&
          isPosDefined(child, leading[crossAxis])) {
        // In case the child is absolutely positionned and has a
        // top/left/bottom/right being set, we override all the previously
        // computed positions to set it correctly.
        child.layout[pos[crossAxis]] = getPosition(child, leading[crossAxis]) +
          getLeadingBorder(node, crossAxis) +
          getLeadingMargin(child, crossAxis);

      } else {
        const leadingCrossDim = leadingPaddingAndBorderCross;
        child.layout[pos[crossAxis]] += linesCrossDim + leadingCrossDim;
      }
    }

    linesMainDim = fmaxf(linesMainDim, mainDim);
    linesCrossDim += crossDim; 
    linesCount += 1;
    startLine = endLine;
  }

  if (linesCount > 1 && isCrossDimDefined) {}
  
  if (!isMainDimDefined) {
    node.layout[dim[mainAxis]] = fmaxf(
      boundAxis(node, mainAxis, linesMainDim + getTrailingPaddingAndBorder(node, mainAxis)),
      paddingAndBorderAxisMain,
    );
  }
  if (!isCrossDimDefined) {
    node.layout[dim[crossAxis]] = fmaxf(
      boundAxis(node, crossAxis, linesCrossDim + paddingAndBorderAxisCross),
      paddingAndBorderAxisCross,
    );
  }

  currentAbsoluteChild = firstAbsoluteChild;
  while (currentAbsoluteChild !== null) {
    // Pre-fill dimensions when using absolute position and both offsets for
    // the axis are defined (either both left and right or top and bottom).
    for (ii = 0; ii < 2; ii++) {
      axis = (ii !== 0) ? CSS_FLEX_DIRECTION_ROW : CSS_FLEX_DIRECTION_COLUMN;

      if (!isUndefined(node.layout[dim[axis]]) &&
          !isDimDefined(currentAbsoluteChild, axis) &&
          isPosDefined(currentAbsoluteChild, leading[axis]) &&
          isPosDefined(currentAbsoluteChild, trailing[axis])) {
        currentAbsoluteChild.layout[dim[axis]] = fmaxf(
          boundAxis(currentAbsoluteChild, axis, node.layout[dim[axis]] -
            getBorderAxis(node, axis) -
            getMarginAxis(currentAbsoluteChild, axis) -
            getPosition(currentAbsoluteChild, leading[axis]) -
            getPosition(currentAbsoluteChild, trailing[axis])
          ),
          // You never want to go smaller than padding
          getPaddingAndBorderAxis(currentAbsoluteChild, axis)
        );
      }

      if (isPosDefined(currentAbsoluteChild, trailing[axis]) &&
          !isPosDefined(currentAbsoluteChild, leading[axis])) {
        currentAbsoluteChild.layout[leading[axis]] =
          node.layout[dim[axis]] -
          currentAbsoluteChild.layout[dim[axis]] -
          getPosition(currentAbsoluteChild, trailing[axis]);
      }
    }

    child = currentAbsoluteChild;
    currentAbsoluteChild = currentAbsoluteChild.nextAbsoluteChild;
    child.nextAbsoluteChild = null;
  }
}

function layoutNode(node, parentMaxWidth, parentDirection) {
  node.shouldUpdate = true;

  const direction = node.style.direction || CSS_DIRECTION_LTR;
  var skipLayout =
    !node.isDirty &&
    node.lastLayout &&
    node.lastLayout.requestedHeight === node.layout.height &&
    node.lastLayout.requestedWidth === node.layout.width &&
    node.lastLayout.parentMaxWidth === parentMaxWidth &&
    node.lastLayout.direction === direction;

  if (skipLayout) {
    node.layout.width = node.lastLayout.width;
    node.layout.height = node.lastLayout.height;
    node.layout.top = node.lastLayout.top;
    node.layout.left = node.lastLayout.left;
  } else {
    if (!node.lastLayout) {
      node.lastLayout = {};
    }

    node.lastLayout.requestedWidth = node.layout.width;
    node.lastLayout.requestedHeight = node.layout.height;
    node.lastLayout.parentMaxWidth = parentMaxWidth;
    node.lastLayout.direction = direction;

    // Reset child layouts
    node.children.forEach(function(child) {
      child.layout.width = undefined;
      child.layout.height = undefined;
      child.layout.top = 0;
      child.layout.left = 0;
    });

    layoutNodeImpl(node, parentMaxWidth, parentDirection);

    node.lastLayout.width = node.layout.width;
    node.lastLayout.height = node.layout.height;
    node.lastLayout.top = node.layout.top;
    node.lastLayout.left = node.layout.left;
  }
}

module.exports = function (node) {
  fillNodes(node);
  layoutNode(node);
}
