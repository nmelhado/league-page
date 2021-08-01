/**
 * @license
 * Copyright 2017 Google Inc.
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
import { MDCTextFieldHelperTextAdapter } from './adapter';
export declare class MDCTextFieldHelperTextFoundation extends MDCFoundation<MDCTextFieldHelperTextAdapter> {
    static get cssClasses(): {
        HELPER_TEXT_PERSISTENT: string;
        HELPER_TEXT_VALIDATION_MSG: string;
        ROOT: string;
    };
    static get strings(): {
        ARIA_HIDDEN: string;
        ROLE: string;
        ROOT_SELECTOR: string;
    };
    /**
     * See {@link MDCTextFieldHelperTextAdapter} for typing information on parameters and return types.
     */
    static get defaultAdapter(): MDCTextFieldHelperTextAdapter;
    constructor(adapter?: Partial<MDCTextFieldHelperTextAdapter>);
    getId(): string | null;
    isVisible(): boolean;
    /**
     * Sets the content of the helper text field.
     */
    setContent(content: string): void;
    isPersistent(): boolean;
    /**
     * @param isPersistent Sets the persistency of the helper text.
     */
    setPersistent(isPersistent: boolean): void;
    /**
     * @return whether the helper text acts as an error validation message.
     */
    isValidation(): boolean;
    /**
     * @param isValidation True to make the helper text act as an error validation message.
     */
    setValidation(isValidation: boolean): void;
    /**
     * Makes the helper text visible to the screen reader.
     */
    showToScreenReader(): void;
    /**
     * Sets the validity of the helper text based on the input validity.
     */
    setValidity(inputIsValid: boolean): void;
    /**
     * Hides the help text from screen readers.
     */
    private hide_;
}
export default MDCTextFieldHelperTextFoundation;
