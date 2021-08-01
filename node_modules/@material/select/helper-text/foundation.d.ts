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
import { MDCFoundation } from '@material/base/foundation';
import { MDCSelectHelperTextAdapter } from './adapter';
export declare class MDCSelectHelperTextFoundation extends MDCFoundation<MDCSelectHelperTextAdapter> {
    static get cssClasses(): {
        HELPER_TEXT_VALIDATION_MSG: string;
        HELPER_TEXT_VALIDATION_MSG_PERSISTENT: string;
    };
    static get strings(): {
        ARIA_HIDDEN: string;
        ROLE: string;
    };
    /**
     * See {@link MDCSelectHelperTextAdapter} for typing information on parameters and return types.
     */
    static get defaultAdapter(): MDCSelectHelperTextAdapter;
    constructor(adapter?: Partial<MDCSelectHelperTextAdapter>);
    /**
     * @return The ID of the helper text, or null if none is set.
     */
    getId(): string | null;
    /**
     * @return Whether the helper text is currently visible.
     */
    isVisible(): boolean;
    /**
     * Sets the content of the helper text field.
     */
    setContent(content: string): void;
    /**
     * Sets the helper text to act as a validation message.
     * By default, validation messages are hidden when the select is valid and
     * visible when the select is invalid.
     *
     * @param isValidation True to make the helper text act as an error validation
     *     message.
     */
    setValidation(isValidation: boolean): void;
    /**
     * Sets the persistency of the validation helper text.
     * This keeps the validation message visible even if the select is valid,
     * though it will be displayed in the normal (grey) color.
     */
    setValidationMsgPersistent(isPersistent: boolean): void;
    /**
     * When acting as a validation message, shows/hides the helper text and
     * triggers alerts as necessary based on the select's validity.
     */
    setValidity(selectIsValid: boolean): void;
    /**
     * Makes the helper text visible to screen readers.
     */
    private showToScreenReader;
    /**
     * Hides the help text from screen readers.
     */
    private hide;
}
export default MDCSelectHelperTextFoundation;
