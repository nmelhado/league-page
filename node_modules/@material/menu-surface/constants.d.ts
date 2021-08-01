/**
 * @license
 * Copyright 2018 Google Inc.
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
declare const cssClasses: {
    ANCHOR: string;
    ANIMATING_CLOSED: string;
    ANIMATING_OPEN: string;
    FIXED: string;
    IS_OPEN_BELOW: string;
    OPEN: string;
    ROOT: string;
};
declare const strings: {
    CLOSED_EVENT: string;
    CLOSING_EVENT: string;
    OPENED_EVENT: string;
    FOCUSABLE_ELEMENTS: string;
};
declare const numbers: {
    /** Total duration of menu-surface open animation. */
    TRANSITION_OPEN_DURATION: number;
    /** Total duration of menu-surface close animation. */
    TRANSITION_CLOSE_DURATION: number;
    /** Margin left to the edge of the viewport when menu-surface is at maximum possible height. Also used as a viewport margin. */
    MARGIN_TO_EDGE: number;
    /** Ratio of anchor width to menu-surface width for switching from corner positioning to center positioning. */
    ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: number;
};
/**
 * Enum for bits in the {@see Corner) bitmap.
 */
declare enum CornerBit {
    BOTTOM = 1,
    CENTER = 2,
    RIGHT = 4,
    FLIP_RTL = 8
}
/**
 * Enum for representing an element corner for positioning the menu-surface.
 *
 * The START constants map to LEFT if element directionality is left
 * to right and RIGHT if the directionality is right to left.
 * Likewise END maps to RIGHT or LEFT depending on the directionality.
 */
declare enum Corner {
    TOP_LEFT = 0,
    TOP_RIGHT = 4,
    BOTTOM_LEFT = 1,
    BOTTOM_RIGHT = 5,
    TOP_START = 8,
    TOP_END = 12,
    BOTTOM_START = 9,
    BOTTOM_END = 13
}
export { cssClasses, strings, numbers, CornerBit, Corner };
