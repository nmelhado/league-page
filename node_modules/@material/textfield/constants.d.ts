/**
 * @license
 * Copyright 2016 Google Inc.
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
declare const strings: {
    ARIA_CONTROLS: string;
    ARIA_DESCRIBEDBY: string;
    INPUT_SELECTOR: string;
    LABEL_SELECTOR: string;
    LEADING_ICON_SELECTOR: string;
    LINE_RIPPLE_SELECTOR: string;
    OUTLINE_SELECTOR: string;
    PREFIX_SELECTOR: string;
    SUFFIX_SELECTOR: string;
    TRAILING_ICON_SELECTOR: string;
};
declare const cssClasses: {
    DISABLED: string;
    FOCUSED: string;
    HELPER_LINE: string;
    INVALID: string;
    LABEL_FLOATING: string;
    NO_LABEL: string;
    OUTLINED: string;
    ROOT: string;
    TEXTAREA: string;
    WITH_LEADING_ICON: string;
    WITH_TRAILING_ICON: string;
};
declare const numbers: {
    LABEL_SCALE: number;
};
/**
 * Whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * under the "Validation-related attributes" section.
 */
declare const VALIDATION_ATTR_WHITELIST: string[];
/**
 * Label should always float for these types as they show some UI even if value is empty.
 */
declare const ALWAYS_FLOAT_TYPES: string[];
export { cssClasses, strings, numbers, VALIDATION_ATTR_WHITELIST, ALWAYS_FLOAT_TYPES };
