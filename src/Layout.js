"use strict";
/// <reference path="Layout.d.ts" />
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LayoutTypes = __importStar(require("LayoutTypes"));
var _a = LayoutTypes.css_direction_t, CSS_DIRECTION_INHERIT = _a.CSS_DIRECTION_INHERIT, CSS_DIRECTION_LTR = _a.CSS_DIRECTION_LTR, CSS_DIRECTION_RTL = _a.CSS_DIRECTION_RTL;
var _b = LayoutTypes.css_dimension_t, CSS_WIDTH = _b.CSS_WIDTH, CSS_HEIGHT = _b.CSS_HEIGHT;
var _c = LayoutTypes.css_position_t, CSS_LEFT = _c.CSS_LEFT, CSS_TOP = _c.CSS_TOP, CSS_RIGHT = _c.CSS_RIGHT, CSS_BOTTOM = _c.CSS_BOTTOM;
var _d = LayoutTypes.css_position_type_t, CSS_POSITION_RELATIVE = _d.CSS_POSITION_RELATIVE, CSS_POSITION_ABSOLUTE = _d.CSS_POSITION_ABSOLUTE;
var _e = LayoutTypes.css_wrap_type_t, CSS_NOWRAP = _e.CSS_NOWRAP, CSS_WRAP = _e.CSS_WRAP;
var _f = LayoutTypes.css_justify_t, CSS_JUSTIFY_FLEX_START = _f.CSS_JUSTIFY_FLEX_START, CSS_JUSTIFY_CENTER = _f.CSS_JUSTIFY_CENTER, CSS_JUSTIFY_FLEX_END = _f.CSS_JUSTIFY_FLEX_END, CSS_JUSTIFY_SPACE_BETWEEN = _f.CSS_JUSTIFY_SPACE_BETWEEN, CSS_JUSTIFY_SPACE_AROUND = _f.CSS_JUSTIFY_SPACE_AROUND;
var _g = LayoutTypes.css_flex_direction_t, CSS_FLEX_DIRECTION_COLUMN = _g.CSS_FLEX_DIRECTION_COLUMN, CSS_FLEX_DIRECTION_COLUMN_REVERSE = _g.CSS_FLEX_DIRECTION_COLUMN_REVERSE, CSS_FLEX_DIRECTION_ROW = _g.CSS_FLEX_DIRECTION_ROW, CSS_FLEX_DIRECTION_ROW_REVERSE = _g.CSS_FLEX_DIRECTION_ROW_REVERSE;
var _h = LayoutTypes.css_align_t, CSS_ALIGN_AUTO = _h.CSS_ALIGN_AUTO, CSS_ALIGN_FLEX_START = _h.CSS_ALIGN_FLEX_START, CSS_ALIGN_CENTER = _h.CSS_ALIGN_CENTER, CSS_ALIGN_FLEX_END = _h.CSS_ALIGN_FLEX_END, CSS_ALIGN_STRETCH = _h.CSS_ALIGN_STRETCH;
var dim = [
    CSS_HEIGHT,
    CSS_HEIGHT,
    CSS_WIDTH,
    CSS_WIDTH,
];
var leading = [
    CSS_TOP,
    CSS_BOTTOM,
    CSS_LEFT,
    CSS_RIGHT,
];
var trailing = [
    CSS_BOTTOM,
    CSS_TOP,
    CSS_RIGHT,
    CSS_LEFT,
];
var pos = [
    CSS_TOP,
    CSS_BOTTOM,
    CSS_LEFT,
    CSS_RIGHT,
];
var isLayoutDimDefined = function (node, axis) {
    var value = node.layout.dimensions[dim[axis]];
    return !!value && value >= 0.0;
};
var isStyleDimDefined = function (node, axis) {
    var value = node.style.dimensions[dim[axis]];
    return !!value && value >= 0.0;
};
var isPosDefined = function (node, position) {
    return !isNaN(node.style.position[position]);
};
var isFlex = function (node) {
    return node.style.position_type === CSS_POSITION_RELATIVE &&
        getFlex(node) > 0;
};
var isFlexWrap = function (node) {
    return node.style.flex_wrap === CSS_WRAP;
};
var eq = function (a, b) {
    if (a === undefined) {
        return b === undefined;
    }
    if (b === undefined) {
        return false;
    }
    return Math.abs(a - b) < 0.0001;
};
var fmaxf = function (a, b) {
    return (a > b) ? a : b;
};
var getPosition = function (node, position) {
    var result = node.style.position[position];
    if (!!result) {
        return result;
    }
    return 0;
};
var getFlex = function (node) {
    return node.style.flex;
};
var getRelativePosition = function (node, axis) {
    var lead = getPosition(node, leading[axis]);
    if (!!lead) {
        return lead;
    }
    return -getPosition(node, trailing[axis]);
};
var getLeadingMargin = function (node, axis) {
    return node.style.margin[leading[axis]];
};
var getTrailingMargin = function (node, axis) {
    return node.style.margin[trailing[axis]];
};
var getLeadingBorder = function (node, axis) {
    var result = node.style.border[leading[axis]];
    if (result >= 0) {
        return result;
    }
    return 0;
};
var getTrailingBorder = function (node, axis) {
    var result = node.style.border[trailing[axis]];
    if (result >= 0) {
        return result;
    }
    return 0;
};
var getLeadingPadding = function (node, axis) {
    var result = node.style.padding[leading[axis]];
    if (result >= 0) {
        return result;
    }
    return 0;
};
var getTrailingPadding = function (node, axis) {
    var result = node.style.padding[trailing[axis]];
    if (result >= 0) {
        return result;
    }
    return 0;
};
var getLeadingPaddingAndBorder = function (node, axis) {
    return getLeadingPadding(node, axis) + getLeadingBorder(node, axis);
};
var getTrailingPaddingAndBorder = function (node, axis) {
    return getTrailingPadding(node, axis) + getTrailingBorder(node, axis);
};
var getMarginAxis = function (node, axis) {
    return getLeadingMargin(node, axis) + getTrailingMargin(node, axis);
};
var getBorderAxis = function (node, axis) {
    return getLeadingPaddingAndBorder(node, axis) + getTrailingBorder(node, axis);
};
var getPaddingAndBorderAxis = function (node, axis) {
    return getLeadingPaddingAndBorder(node, axis) + getTrailingPaddingAndBorder(node, axis);
};
var boundAxis = function (node, axis, value) {
    var min = -Infinity;
    var max = Infinity;
    if (isColumnDirection(axis)) {
        min = node.style.minDimensions[CSS_HEIGHT];
        max = node.style.maxDimensions[CSS_HEIGHT];
    }
    else {
        min = node.style.minDimensions[CSS_WIDTH];
        max = node.style.maxDimensions[CSS_WIDTH];
    }
    var boundValue = value;
    if (max && max >= 0.0 && boundValue > max) {
        boundValue = max;
    }
    if (min && min >= 0.0 && boundValue < min) {
        boundValue = min;
    }
    return boundValue;
};
var setDimensionFromStyle = function (node, axis) {
    if (isLayoutDimDefined(node, axis) || !isStyleDimDefined(node, axis)) {
        return;
    }
    node.layout.dimensions[dim[axis]] = fmaxf(boundAxis(node, axis, node.style.dimensions[dim[axis]]), getPaddingAndBorderAxis(node, axis));
};
var isColumnDirection = function (flexDirection) {
    return flexDirection === CSS_FLEX_DIRECTION_COLUMN ||
        flexDirection === CSS_FLEX_DIRECTION_COLUMN_REVERSE;
};
var getDirection = function (node) {
    return node.style.direction;
};
var getFlexDirection = function (node) {
    return node.style.flex_direction;
};
var resolveDirection = function (direction, parentDirection) {
    if (direction === CSS_DIRECTION_INHERIT) {
        return parentDirection;
    }
    return direction;
};
var resolveAlignItem = function (nodeAlignItems, childAlignSelf) {
    if (childAlignSelf !== CSS_ALIGN_AUTO) {
        return childAlignSelf;
    }
    return nodeAlignItems;
};
var resolveAxis = function (flexDirection, direction) {
    if (direction === CSS_DIRECTION_RTL) {
        if (flexDirection === CSS_FLEX_DIRECTION_ROW) {
            return CSS_FLEX_DIRECTION_ROW_REVERSE;
        }
        if (flexDirection === CSS_FLEX_DIRECTION_ROW_REVERSE) {
            return CSS_FLEX_DIRECTION_COLUMN;
        }
    }
    return flexDirection;
};
var getCrossFlexDirection = function (mainAxis, direction) {
    if (isColumnDirection(mainAxis)) {
        return resolveAxis(CSS_FLEX_DIRECTION_ROW, direction);
    }
    return CSS_FLEX_DIRECTION_COLUMN;
};
var getDimWithMargin = function (node, axis) {
    return node.layout.dimensions[dim[axis]] +
        getLeadingMargin(node, axis) + getTrailingMargin(node, axis);
};
var layoutNodeImpl = function (node, parentMaxWidth, parentMaxHeight, parentDirection) {
    var direction = resolveDirection(getDirection(node), parentDirection);
    var mainAxis = resolveAxis(getFlexDirection(node), direction);
    var crossAxis = getCrossFlexDirection(mainAxis, direction);
    setDimensionFromStyle(node, mainAxis);
    setDimensionFromStyle(node, crossAxis);
    node.layout.direction = direction;
    // node.layout.position[leading[mainAxis]] +=
    //   getLeadingMargin(node, mainAxis) + getRelativePosition(node, mainAxis);
    // node.layout.position[trailing[mainAxis]] +=
    //   getTrailingMargin(node, mainAxis) + getRelativePosition(node, mainAxis);
    var childCount = node.children_count;
    var leadingPaddingAndBorderMain = getLeadingPaddingAndBorder(node, mainAxis);
    var leadingPaddingAndBorderCross = getLeadingPaddingAndBorder(node, crossAxis);
    var paddingAndBorderOnAxisMain = getPaddingAndBorderAxis(node, mainAxis);
    var paddingAndBorderOnAxisCross = getPaddingAndBorderAxis(node, crossAxis);
    var isMainDimDefined = isLayoutDimDefined(node, mainAxis);
    var isCrossDimDefined = isLayoutDimDefined(node, crossAxis);
    var isNodeFlexWrap = isFlexWrap(node);
    var justifyContent = node.style.justify_content;
    var child;
    var axis;
    var firstAbsoluteChild = null;
    var currentAbsoluteChild = null;
    var definedMainDim = undefined;
    if (isMainDimDefined) {
        definedMainDim = node.layout.dimensions[dim[mainAxis]] - paddingAndBorderOnAxisMain;
    }
    var startLine = 0;
    var endLine = 0;
    var linesMainDim = 0;
    var linesCrossDim = 0;
    var linesCount = 0;
    while (endLine < childCount) {
        var mainContentDim = 0;
        var flexibleChildrenCount = 0;
        var totalFlexible = 0;
        var nonFlexibleChildrenCount = 0;
        var isSimpleStackMain = (isMainDimDefined && justifyContent === CSS_JUSTIFY_FLEX_START) ||
            (!isMainDimDefined && justifyContent !== CSS_JUSTIFY_CENTER);
        var firstComplexMain = isSimpleStackMain ? childCount : startLine;
        var isSimpleStackCross = true;
        var firstComplexCross = childCount;
        var firstFlexChild = null;
        var currentFlexChild = null;
        var mainDim = leadingPaddingAndBorderMain;
        var crossDim = 0;
        for (var i = startLine; i < childCount; i += 1) {
            child = node.get_child(node.context, i);
            child.next_absolute_child = null;
            child.next_flex_child = null;
            var alignItem = resolveAlignItem(node.style.align_items, child.style.align_self);
            // prefill children's layout dimension as early as possible
            if (alignItem === CSS_ALIGN_STRETCH &&
                child.style.position_type === CSS_POSITION_RELATIVE &&
                isCrossDimDefined &&
                !isStyleDimDefined(child, crossAxis)) {
                child.layout.dimensions[dim[crossAxis]] = fmaxf(boundAxis(child, crossAxis, node.layout.dimensions[dim[crossAxis]] -
                    paddingAndBorderOnAxisCross - getMarginAxis(child, crossAxis)), getPaddingAndBorderAxis(child, crossAxis));
            }
            else if (child.style.position_type === CSS_POSITION_ABSOLUTE) {
                if (firstAbsoluteChild === null) {
                    firstAbsoluteChild = child;
                }
                if (currentAbsoluteChild !== null) {
                    currentAbsoluteChild.next_absolute_child = child;
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
            var nextContentDim = 0;
            if (isMainDimDefined && isFlex(child)) {
                flexibleChildrenCount += 1;
                totalFlexible += child.style.flex;
                if (firstFlexChild === null) {
                    firstFlexChild = child;
                }
                if (currentFlexChild !== null) {
                    currentFlexChild.next_flex_child = child;
                }
                currentFlexChild = child;
                // smallest possible size of the child for computing remaining available space
                nextContentDim = getPaddingAndBorderAxis(child, mainAxis) +
                    getMarginAxis(child, mainAxis);
            }
            else {
                if (child.style.position_type === CSS_POSITION_RELATIVE) {
                    nonFlexibleChildrenCount += 1;
                    nextContentDim = getDimWithMargin(child, mainAxis);
                }
            }
            if (isNodeFlexWrap &&
                isMainDimDefined &&
                mainContentDim + nextContentDim > definedMainDim &&
                i !== startLine) {
                break;
            }
            if (isSimpleStackMain &&
                (child.style.position_type !== CSS_POSITION_RELATIVE || isFlex(child))) {
                isSimpleStackMain = false;
                firstComplexMain = i;
            }
            if (isSimpleStackCross &&
                (child.style.position_type !== CSS_POSITION_RELATIVE ||
                    (alignItem !== CSS_ALIGN_STRETCH && alignItem !== CSS_ALIGN_FLEX_START) ||
                    (alignItem === CSS_ALIGN_STRETCH && !isCrossDimDefined))) {
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
        var leadingMainDim = 0;
        var betweenMainDim = 0;
        var remainingMainDim = 0;
        if (isMainDimDefined) {
            remainingMainDim = definedMainDim - mainContentDim;
        }
        else {
            remainingMainDim = fmaxf(mainContentDim, 0) - mainContentDim;
        }
        if (flexibleChildrenCount !== 0) {
            var flexibleMainDim = remainingMainDim / totalFlexible;
            var baseMainDim = void 0;
            var boundMainDim = void 0;
            currentFlexChild = firstFlexChild;
            while (currentFlexChild !== null) {
                baseMainDim = flexibleMainDim * currentFlexChild.style.flex +
                    getPaddingAndBorderAxis(currentFlexChild, mainAxis);
            }
        }
        else if (justifyContent !== CSS_JUSTIFY_FLEX_START) {
            if (justifyContent === CSS_JUSTIFY_CENTER) {
                leadingMainDim = remainingMainDim / 2;
            }
            else if (justifyContent === CSS_JUSTIFY_FLEX_END) {
                leadingMainDim = remainingMainDim;
            }
            else if (justifyContent === CSS_JUSTIFY_SPACE_BETWEEN) {
                remainingMainDim = fmaxf(remainingMainDim, 0);
                if (flexibleChildrenCount + nonFlexibleChildrenCount - 1 !== 0) {
                    betweenMainDim =
                        remainingMainDim / (flexibleChildrenCount + nonFlexibleChildrenCount - 1);
                }
                else {
                    betweenMainDim = 0;
                }
            }
            else if (justifyContent === CSS_JUSTIFY_SPACE_AROUND) {
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
        for (var ii = 0; ii < 2; ii += 1) {
            axis = (ii !== 0) ? CSS_FLEX_DIRECTION_ROW : CSS_FLEX_DIRECTION_COLUMN;
            if (isLayoutDimDefined(node, axis) &&
                !isStyleDimDefined(currentAbsoluteChild, axis) &&
                isPosDefined(currentAbsoluteChild, leading[axis]) &&
                isPosDefined(currentAbsoluteChild, trailing[axis])) {
                currentAbsoluteChild.layout.dimensions[dim[axis]] = fmaxf(boundAxis(currentAbsoluteChild, axis, node.layout.dimensions[dim[axis]] -
                    getBorderAxis(node, axis) -
                    getMarginAxis(currentAbsoluteChild, axis) -
                    getPosition(currentAbsoluteChild, leading[axis]) -
                    getPosition(currentAbsoluteChild, trailing[axis])), getPaddingAndBorderAxis(currentAbsoluteChild, axis));
            }
            if (isPosDefined(currentAbsoluteChild, trailing[axis]) &&
                !isPosDefined(currentAbsoluteChild, leading[axis])) {
                currentAbsoluteChild.layout.position[leading[axis]] =
                    node.layout.dimensions[dim[axis]] -
                        currentAbsoluteChild.layout.dimensions[dim[axis]] -
                        getPosition(currentAbsoluteChild, trailing[axis]);
            }
        }
        child = currentAbsoluteChild;
        currentAbsoluteChild = child.next_absolute_child;
        child.next_absolute_child = null;
    }
};
exports.layoutNode = function (node, parentMaxWidth, parentMaxHeight, parentDirection) {
    var layout = node.layout;
    var direction = node.style.direction;
    var skipLayout = eq(layout.last_requested_dimensions[CSS_WIDTH], layout.dimensions[CSS_WIDTH]) &&
        eq(layout.last_requested_dimensions[CSS_HEIGHT], layout.dimensions[CSS_HEIGHT]) &&
        eq(layout.last_parent_max_width, parentMaxWidth) &&
        eq(layout.last_parent_max_height, parentMaxHeight) &&
        eq(layout.last_direction, direction);
    if (skipLayout) {
        layout.dimensions[CSS_WIDTH] = layout.last_dimensions[CSS_WIDTH];
        layout.dimensions[CSS_HEIGHT] = layout.last_dimensions[CSS_HEIGHT];
        layout.position[CSS_LEFT] = layout.last_position[CSS_LEFT];
        layout.position[CSS_TOP] = layout.last_position[CSS_TOP];
    }
    else {
        layout.last_requested_dimensions[CSS_WIDTH] = layout.dimensions[CSS_WIDTH];
        layout.last_requested_dimensions[CSS_HEIGHT] = layout.dimensions[CSS_HEIGHT];
        layout.last_parent_max_width = parentMaxWidth;
        layout.last_parent_max_height = parentMaxHeight;
        layoutNodeImpl(node, parentMaxWidth, parentMaxHeight, parentDirection);
        layout.last_dimensions[CSS_WIDTH] = layout.dimensions[CSS_WIDTH];
        layout.last_dimensions[CSS_HEIGHT] = layout.dimensions[CSS_HEIGHT];
        layout.last_position[CSS_LEFT] = layout.position[CSS_LEFT];
        layout.last_position[CSS_TOP] = layout.position[CSS_TOP];
    }
};
