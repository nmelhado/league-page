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
import { MDCTabScrollerAdapter } from './adapter';
import { MDCTabScrollerRTL } from './rtl-scroller';
export declare class MDCTabScrollerFoundation extends MDCFoundation<MDCTabScrollerAdapter> {
    static get cssClasses(): {
        ANIMATING: string;
        SCROLL_AREA_SCROLL: string;
        SCROLL_TEST: string;
    };
    static get strings(): {
        AREA_SELECTOR: string;
        CONTENT_SELECTOR: string;
    };
    static get defaultAdapter(): MDCTabScrollerAdapter;
    /**
     * Controls whether we should handle the transitionend and interaction events during the animation.
     */
    private isAnimating_;
    /**
     * The MDCTabScrollerRTL instance varies per browser and allows us to encapsulate the peculiar browser behavior
     * of RTL scrolling in it's own class.
     */
    private rtlScrollerInstance_?;
    constructor(adapter?: Partial<MDCTabScrollerAdapter>);
    init(): void;
    /**
     * Computes the current visual scroll position
     */
    getScrollPosition(): number;
    /**
     * Handles interaction events that occur during transition
     */
    handleInteraction(): void;
    /**
     * Handles the transitionend event
     */
    handleTransitionEnd(evt: Event): void;
    /**
     * Increment the scroll value by the scrollXIncrement using animation.
     * @param scrollXIncrement The value by which to increment the scroll position
     */
    incrementScroll(scrollXIncrement: number): void;
    /**
     * Increment the scroll value by the scrollXIncrement without animation.
     * @param scrollXIncrement The value by which to increment the scroll position
     */
    incrementScrollImmediate(scrollXIncrement: number): void;
    /**
     * Scrolls to the given scrollX value
     */
    scrollTo(scrollX: number): void;
    /**
     * @return Browser-specific {@link MDCTabScrollerRTL} instance.
     */
    getRTLScroller(): MDCTabScrollerRTL;
    /**
     * @return translateX value from a CSS matrix transform function string.
     */
    private calculateCurrentTranslateX_;
    /**
     * Calculates a safe scroll value that is > 0 and < the max scroll value
     * @param scrollX The distance to scroll
     */
    private clampScrollValue_;
    private computeCurrentScrollPositionRTL_;
    private calculateScrollEdges_;
    /**
     * Internal scroll method
     * @param scrollX The new scroll position
     */
    private scrollTo_;
    /**
     * Internal RTL scroll method
     * @param scrollX The new scroll position
     */
    private scrollToRTL_;
    /**
     * Internal method to compute the increment scroll operation values.
     * @param scrollX The desired scroll position increment
     * @return MDCTabScrollerAnimation with the sanitized values for performing the scroll operation.
     */
    private getIncrementScrollOperation_;
    /**
     * Animates the tab scrolling
     * @param animation The animation to apply
     */
    private animate_;
    /**
     * Stops scroll animation
     */
    private stopScrollAnimation_;
    /**
     * Gets the current scroll position during animation
     */
    private getAnimatingScrollPosition_;
    /**
     * Determines the RTL Scroller to use
     */
    private rtlScrollerFactory_;
    private isRTL_;
}
export default MDCTabScrollerFoundation;
