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
import { MDCCheckboxAdapter } from './adapter';
export declare class MDCCheckboxFoundation extends MDCFoundation<MDCCheckboxAdapter> {
    static get cssClasses(): {
        ANIM_CHECKED_INDETERMINATE: string;
        ANIM_CHECKED_UNCHECKED: string;
        ANIM_INDETERMINATE_CHECKED: string;
        ANIM_INDETERMINATE_UNCHECKED: string;
        ANIM_UNCHECKED_CHECKED: string;
        ANIM_UNCHECKED_INDETERMINATE: string;
        BACKGROUND: string;
        CHECKED: string;
        CHECKMARK: string;
        CHECKMARK_PATH: string;
        DISABLED: string;
        INDETERMINATE: string;
        MIXEDMARK: string;
        NATIVE_CONTROL: string;
        ROOT: string;
        SELECTED: string;
        UPGRADED: string;
    };
    static get strings(): {
        ARIA_CHECKED_ATTR: string;
        ARIA_CHECKED_INDETERMINATE_VALUE: string;
        DATA_INDETERMINATE_ATTR: string;
        NATIVE_CONTROL_SELECTOR: string;
        TRANSITION_STATE_CHECKED: string;
        TRANSITION_STATE_INDETERMINATE: string;
        TRANSITION_STATE_INIT: string;
        TRANSITION_STATE_UNCHECKED: string;
    };
    static get numbers(): {
        ANIM_END_LATCH_MS: number;
    };
    static get defaultAdapter(): MDCCheckboxAdapter;
    private currentCheckState_;
    private currentAnimationClass_;
    private animEndLatchTimer_;
    private enableAnimationEndHandler_;
    constructor(adapter?: Partial<MDCCheckboxAdapter>);
    init(): void;
    destroy(): void;
    setDisabled(disabled: boolean): void;
    /**
     * Handles the animationend event for the checkbox
     */
    handleAnimationEnd(): void;
    /**
     * Handles the change event for the checkbox
     */
    handleChange(): void;
    private transitionCheckState_;
    private determineCheckState_;
    private getTransitionAnimationClass_;
    private updateAriaChecked_;
}
export default MDCCheckboxFoundation;
