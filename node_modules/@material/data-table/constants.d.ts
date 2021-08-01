/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * CSS class names used in component.
 */
export declare const cssClasses: {
    CELL: string;
    CELL_NUMERIC: string;
    CONTENT: string;
    HEADER_CELL: string;
    HEADER_CELL_LABEL: string;
    HEADER_CELL_SORTED: string;
    HEADER_CELL_SORTED_DESCENDING: string;
    HEADER_CELL_WITH_SORT: string;
    HEADER_CELL_WRAPPER: string;
    HEADER_ROW: string;
    HEADER_ROW_CHECKBOX: string;
    IN_PROGRESS: string;
    LINEAR_PROGRESS: string;
    PAGINATION_ROWS_PER_PAGE_LABEL: string;
    PAGINATION_ROWS_PER_PAGE_SELECT: string;
    PROGRESS_INDICATOR: string;
    ROOT: string;
    ROW: string;
    ROW_CHECKBOX: string;
    ROW_SELECTED: string;
    SORT_ICON_BUTTON: string;
    SORT_STATUS_LABEL: string;
    TABLE_CONTAINER: string;
};
/**
 * DOM attributes used in component.
 */
export declare const attributes: {
    ARIA_SELECTED: string;
    ARIA_SORT: string;
};
/**
 * List of data attributes used in component.
 */
export declare const dataAttributes: {
    COLUMN_ID: string;
    ROW_ID: string;
};
/**
 * CSS selectors used in component.
 */
export declare const selectors: {
    CONTENT: string;
    HEADER_CELL: string;
    HEADER_CELL_WITH_SORT: string;
    HEADER_ROW: string;
    HEADER_ROW_CHECKBOX: string;
    PROGRESS_INDICATOR: string;
    ROW: string;
    ROW_CHECKBOX: string;
    ROW_SELECTED: string;
    SORT_ICON_BUTTON: string;
    SORT_STATUS_LABEL: string;
};
/**
 * Messages used in component.
 */
export declare const messages: {
    SORTED_IN_DESCENDING: string;
    SORTED_IN_ASCENDING: string;
};
/**
 * Attributes and selectors used in component.
 * @deprecated Use `attributes`, `dataAttributes` and `selectors` instead.
 */
export declare const strings: {
    ARIA_SELECTED: string;
    ARIA_SORT: string;
    DATA_ROW_ID_ATTR: string;
    HEADER_ROW_CHECKBOX_SELECTOR: string;
    ROW_CHECKBOX_SELECTOR: string;
    ROW_SELECTED_SELECTOR: string;
    ROW_SELECTOR: string;
};
/**
 * Sort values defined by ARIA.
 * See https://www.w3.org/WAI/PF/aria/states_and_properties#aria-sort
 */
export declare enum SortValue {
    ASCENDING = "ascending",
    DESCENDING = "descending",
    NONE = "none",
    OTHER = "other"
}
/**
 * Event names used in component.
 */
export declare const events: {
    ROW_SELECTION_CHANGED: string;
    SELECTED_ALL: string;
    UNSELECTED_ALL: string;
    SORTED: string;
};
