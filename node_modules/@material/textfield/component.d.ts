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
import { MDCComponent } from '@material/base/component';
import { MDCFloatingLabelFactory } from '@material/floating-label/component';
import { MDCLineRippleFactory } from '@material/line-ripple/component';
import { MDCNotchedOutlineFactory } from '@material/notched-outline/component';
import { MDCRipple, MDCRippleFactory } from '@material/ripple/component';
import { MDCRippleCapableSurface } from '@material/ripple/types';
import { MDCTextFieldCharacterCounterFactory } from './character-counter/component';
import { MDCTextFieldFoundation } from './foundation';
import { MDCTextFieldHelperTextFactory } from './helper-text/component';
import { MDCTextFieldIconFactory } from './icon/component';
export declare class MDCTextField extends MDCComponent<MDCTextFieldFoundation> implements MDCRippleCapableSurface {
    static attachTo(root: Element): MDCTextField;
    ripple: MDCRipple | null;
    private input_;
    private characterCounter_;
    private helperText_;
    private label_;
    private leadingIcon_;
    private lineRipple_;
    private outline_;
    private trailingIcon_;
    private prefix_;
    private suffix_;
    initialize(rippleFactory?: MDCRippleFactory, lineRippleFactory?: MDCLineRippleFactory, helperTextFactory?: MDCTextFieldHelperTextFactory, characterCounterFactory?: MDCTextFieldCharacterCounterFactory, iconFactory?: MDCTextFieldIconFactory, labelFactory?: MDCFloatingLabelFactory, outlineFactory?: MDCNotchedOutlineFactory): void;
    destroy(): void;
    /**
     * Initializes the Text Field's internal state based on the environment's
     * state.
     */
    initialSyncWithDOM(): void;
    get value(): string;
    /**
     * @param value The value to set on the input.
     */
    set value(value: string);
    get disabled(): boolean;
    /**
     * @param disabled Sets the Text Field disabled or enabled.
     */
    set disabled(disabled: boolean);
    get valid(): boolean;
    /**
     * @param valid Sets the Text Field valid or invalid.
     */
    set valid(valid: boolean);
    get required(): boolean;
    /**
     * @param required Sets the Text Field to required.
     */
    set required(required: boolean);
    get pattern(): string;
    /**
     * @param pattern Sets the input element's validation pattern.
     */
    set pattern(pattern: string);
    get minLength(): number;
    /**
     * @param minLength Sets the input element's minLength.
     */
    set minLength(minLength: number);
    get maxLength(): number;
    /**
     * @param maxLength Sets the input element's maxLength.
     */
    set maxLength(maxLength: number);
    get min(): string;
    /**
     * @param min Sets the input element's min.
     */
    set min(min: string);
    get max(): string;
    /**
     * @param max Sets the input element's max.
     */
    set max(max: string);
    get step(): string;
    /**
     * @param step Sets the input element's step.
     */
    set step(step: string);
    /**
     * Sets the helper text element content.
     */
    set helperTextContent(content: string);
    /**
     * Sets the aria label of the leading icon.
     */
    set leadingIconAriaLabel(label: string);
    /**
     * Sets the text content of the leading icon.
     */
    set leadingIconContent(content: string);
    /**
     * Sets the aria label of the trailing icon.
     */
    set trailingIconAriaLabel(label: string);
    /**
     * Sets the text content of the trailing icon.
     */
    set trailingIconContent(content: string);
    /**
     * Enables or disables the use of native validation. Use this for custom validation.
     * @param useNativeValidation Set this to false to ignore native input validation.
     */
    set useNativeValidation(useNativeValidation: boolean);
    /**
     * Gets the text content of the prefix, or null if it does not exist.
     */
    get prefixText(): string | null;
    /**
     * Sets the text content of the prefix, if it exists.
     */
    set prefixText(prefixText: string | null);
    /**
     * Gets the text content of the suffix, or null if it does not exist.
     */
    get suffixText(): string | null;
    /**
     * Sets the text content of the suffix, if it exists.
     */
    set suffixText(suffixText: string | null);
    /**
     * Focuses the input element.
     */
    focus(): void;
    /**
     * Recomputes the outline SVG path for the outline element.
     */
    layout(): void;
    getDefaultFoundation(): MDCTextFieldFoundation;
    private getRootAdapterMethods_;
    private getInputAdapterMethods_;
    private getLabelAdapterMethods_;
    private getLineRippleAdapterMethods_;
    private getOutlineAdapterMethods_;
    /**
     * @return A map of all subcomponents to subfoundations.
     */
    private getFoundationMap_;
    private createRipple_;
}
