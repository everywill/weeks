declare module 'LayoutTypes' {
  export enum css_position_type_t {
    CSS_POSITION_RELATIVE = 0,
    CSS_POSITION_ABSOLUTE,
  }

  export enum css_direction_t {
    CSS_DIRECTION_INHERIT = 0,
    CSS_DIRECTION_LTR,
    CSS_DIRECTION_RTL,
  }

  export enum css_flex_direction_t {
    CSS_FLEX_DIRECTION_COLUMN = 0,
    CSS_FLEX_DIRECTION_COLUMN_REVERSE,
    CSS_FLEX_DIRECTION_ROW,
    CSS_FLEX_DIRECTION_ROW_REVERSE,
  }

  export enum css_justify_t {
    CSS_JUSTIFY_FLEX_START = 0,
    CSS_JUSTIFY_CENTER,
    CSS_JUSTIFY_FLEX_END,
    CSS_JUSTIFY_SPACE_BETWEEN,
    CSS_JUSTIFY_SPACE_AROUND,
  }

  export enum css_align_t {
    CSS_ALIGN_AUTO = 0,
    CSS_ALIGN_FLEX_START,
    CSS_ALIGN_CENTER,
    CSS_ALIGN_FLEX_END,
    CSS_ALIGN_STRETCH,
  }

  export enum css_dimension_t {
    CSS_WIDTH = 0,
    CSS_HEIGHT,
  }

  export enum css_position_t {
    CSS_LEFT = 0,
    CSS_TOP,
    CSS_RIGHT,
    CSS_BOTTOM,
  }

  export enum css_wrap_type_t {
    CSS_NOWRAP = 0,
    CSS_WRAP,
  }

  export interface css_style_t {
    direction: css_direction_t,
    position_type: css_position_type_t,

    flex_direction: css_flex_direction_t,
    justify_content: css_justify_t,
    align_content: css_align_t,
    align_items: css_align_t,
    align_self: css_align_t,
    flex_wrap: css_wrap_type_t,
    flex: number,

    position: [number, number, number, number],
    margin: [number, number, number, number],
    border: [number, number, number, number],
    padding: [number, number, number, number],
    dimensions: [number, number],
    minDimensions: [number, number],
    maxDimensions: [number, number],
  }

  export interface css_layout_t {
    position: [number, number, number, number],
    dimensions: [number, number],
    direction: css_direction_t,

    last_requested_dimensions: [number, number],
    last_parent_max_width: number,
    last_parent_max_height: number,
    last_position: [number, number],
    last_dimensions: [number, number],
    last_direction: css_direction_t,
  }

  export interface css_node_t {
    style: css_style_t,
    layout: css_layout_t,
    children_count: number,
    line_count: number,

    next_absolute_child: css_node_t,
    next_flex_child: css_node_t,
  }

  export interface layout {
    (node: css_node_t, maxWidth: number, maxHeight: number, parentDirection: css_direction_t): any
  }

  export interface eq<T> {
    (a: T | undefined, b?: T | undefined): boolean,
  }

  export interface boundAxis {
    (node: css_node_t, axis: css_flex_direction_t, value: number): number,
  }

  export interface styleGetter<T> {
    (node: css_node_t): T,
  }

  export interface layoutResolver<T> {
    (layout: T, a: any): T,
  }

  export interface compare<T> {
    (a: T, b: T): T,
  }
}