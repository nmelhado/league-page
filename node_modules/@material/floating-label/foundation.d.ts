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
import { MDCFoundation } from '@material/base/foundation';
import { MDCFloatingLabelAdapter } from './adapter';
export declare class MDCFloatingLabelFoundation extends MDCFoundation<MDCFloatingLabelAdapter> {
    static get cssClasses(): {
        LABEL_FLOAT_ABOVE: string;
        LABEL_REQUIRED: string;
        LABEL_SHAKE: string;
        ROOT: string;
    };
    /**
     * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
     */
    static get defaultAdapter(): MDCFloatingLabelAdapter;
    private readonly shakeAnimationEndHandler_;
    constructor(adapter?: Partial<MDCFloatingLabelAdapter>);
    init(): void;
    destroy(): void;
    /**
     * Returns the width of the label element.
     */
    getWidth(): number;
    /**
     * Styles the label to produce a shake animation to indicate an error.
     * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
     */
    shake(shouldShake: boolean): void;
    /**
     * Styles the label to float or dock.
     * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
     */
    float(shouldFloat: boolean): void;
    /**
     * Styles the label as required.
     * @param isRequired If true, adds an asterisk to the label, indicating that it is required.
     */
    setRequired(isRequired: boolean): void;
    private handleShakeAnimationEnd_;
}
export default MDCFloatingLabelFoundation;
