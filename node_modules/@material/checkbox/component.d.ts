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
import { MDCRipple } from '@material/ripple/component';
import { MDCRippleCapableSurface } from '@material/ripple/types';
import { MDCCheckboxFoundation } from './foundation';
export declare type MDCCheckboxFactory = (el: Element, foundation?: MDCCheckboxFoundation) => MDCCheckbox;
export declare class MDCCheckbox extends MDCComponent<MDCCheckboxFoundation> implements MDCRippleCapableSurface {
    static attachTo(root: Element): MDCCheckbox;
    get ripple(): MDCRipple;
    get checked(): boolean;
    set checked(checked: boolean);
    get indeterminate(): boolean;
    set indeterminate(indeterminate: boolean);
    get disabled(): boolean;
    set disabled(disabled: boolean);
    get value(): string;
    set value(value: string);
    private readonly ripple_;
    private handleChange_;
    private handleAnimationEnd_;
    initialize(): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    getDefaultFoundation(): MDCCheckboxFoundation;
    private createRipple_;
    private installPropertyChangeHooks_;
    private uninstallPropertyChangeHooks_;
    private get nativeControl_();
}
