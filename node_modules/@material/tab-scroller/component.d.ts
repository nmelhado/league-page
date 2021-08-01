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
import { MDCTabScrollerFoundation } from './foundation';
export declare type MDCTabScrollerFactory = (el: Element, foundation?: MDCTabScrollerFoundation) => MDCTabScroller;
export declare class MDCTabScroller extends MDCComponent<MDCTabScrollerFoundation> {
    static attachTo(root: Element): MDCTabScroller;
    private content_;
    private area_;
    private handleInteraction_;
    private handleTransitionEnd_;
    initialize(): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    getDefaultFoundation(): MDCTabScrollerFoundation;
    /**
     * Returns the current visual scroll position
     */
    getScrollPosition(): number;
    /**
     * Returns the width of the scroll content
     */
    getScrollContentWidth(): number;
    /**
     * Increments the scroll value by the given amount
     * @param scrollXIncrement The pixel value by which to increment the scroll value
     */
    incrementScroll(scrollXIncrement: number): void;
    /**
     * Scrolls to the given pixel position
     * @param scrollX The pixel value to scroll to
     */
    scrollTo(scrollX: number): void;
}
