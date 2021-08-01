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
import { MDCComponent } from '@material/base/component';
import { MDCRippleFactory } from '@material/ripple/component';
import { MDCRippleCapableSurface } from '@material/ripple/types';
import { MDCTabIndicatorFactory } from '@material/tab-indicator/component';
import { MDCTabFoundation } from './foundation';
import { MDCTabDimensions } from './types';
export declare type MDCTabFactory = (el: Element, foundation?: MDCTabFoundation) => MDCTab;
export declare class MDCTab extends MDCComponent<MDCTabFoundation> implements MDCRippleCapableSurface {
    static attachTo(root: Element): MDCTab;
    id: string;
    private ripple_;
    private tabIndicator_;
    private content_;
    private handleClick_;
    initialize(rippleFactory?: MDCRippleFactory, tabIndicatorFactory?: MDCTabIndicatorFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    getDefaultFoundation(): MDCTabFoundation;
    /**
     * Getter for the active state of the tab
     */
    get active(): boolean;
    set focusOnActivate(focusOnActivate: boolean);
    /**
     * Activates the tab
     */
    activate(computeIndicatorClientRect?: ClientRect): void;
    /**
     * Deactivates the tab
     */
    deactivate(): void;
    /**
     * Returns the indicator's client rect
     */
    computeIndicatorClientRect(): ClientRect;
    computeDimensions(): MDCTabDimensions;
    /**
     * Focuses the tab
     */
    focus(): void;
}
