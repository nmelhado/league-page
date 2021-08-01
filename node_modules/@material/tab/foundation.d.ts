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
import { MDCTabAdapter } from './adapter';
import { MDCTabDimensions } from './types';
export declare class MDCTabFoundation extends MDCFoundation<MDCTabAdapter> {
    static get cssClasses(): {
        ACTIVE: string;
    };
    static get strings(): {
        ARIA_SELECTED: string;
        CONTENT_SELECTOR: string;
        INTERACTED_EVENT: string;
        RIPPLE_SELECTOR: string;
        TABINDEX: string;
        TAB_INDICATOR_SELECTOR: string;
    };
    static get defaultAdapter(): MDCTabAdapter;
    private focusOnActivate_;
    constructor(adapter?: Partial<MDCTabAdapter>);
    handleClick(): void;
    isActive(): boolean;
    /**
     * Sets whether the tab should focus itself when activated
     */
    setFocusOnActivate(focusOnActivate: boolean): void;
    /**
     * Activates the Tab
     */
    activate(previousIndicatorClientRect?: ClientRect): void;
    /**
     * Deactivates the Tab
     */
    deactivate(): void;
    /**
     * Returns the dimensions of the Tab
     */
    computeDimensions(): MDCTabDimensions;
}
export default MDCTabFoundation;
