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
import { MDCTabInteractionEvent } from '@material/tab/types';
import { MDCTabBarAdapter } from './adapter';
export declare class MDCTabBarFoundation extends MDCFoundation<MDCTabBarAdapter> {
    static get strings(): {
        ARROW_LEFT_KEY: string;
        ARROW_RIGHT_KEY: string;
        END_KEY: string;
        ENTER_KEY: string;
        HOME_KEY: string;
        SPACE_KEY: string;
        TAB_ACTIVATED_EVENT: string;
        TAB_SCROLLER_SELECTOR: string;
        TAB_SELECTOR: string;
    };
    static get numbers(): {
        ARROW_LEFT_KEYCODE: number;
        ARROW_RIGHT_KEYCODE: number;
        END_KEYCODE: number;
        ENTER_KEYCODE: number;
        EXTRA_SCROLL_AMOUNT: number;
        HOME_KEYCODE: number;
        SPACE_KEYCODE: number;
    };
    static get defaultAdapter(): MDCTabBarAdapter;
    private useAutomaticActivation_;
    constructor(adapter?: Partial<MDCTabBarAdapter>);
    /**
     * Switches between automatic and manual activation modes.
     * See https://www.w3.org/TR/wai-aria-practices/#tabpanel for examples.
     */
    setUseAutomaticActivation(useAutomaticActivation: boolean): void;
    activateTab(index: number): void;
    handleKeyDown(evt: KeyboardEvent): void;
    /**
     * Handles the MDCTab:interacted event
     */
    handleTabInteraction(evt: MDCTabInteractionEvent): void;
    /**
     * Scrolls the tab at the given index into view
     * @param index The tab index to make visible
     */
    scrollIntoView(index: number): void;
    /**
     * Private method for determining the index of the destination tab based on what key was pressed
     * @param origin The original index from which to determine the destination
     * @param key The name of the key
     */
    private determineTargetFromKey_;
    /**
     * Calculates the scroll increment that will make the tab at the given index visible
     * @param index The index of the tab
     * @param nextIndex The index of the next tab
     * @param scrollPosition The current scroll position
     * @param barWidth The width of the Tab Bar
     */
    private calculateScrollIncrement_;
    /**
     * Calculates the scroll increment that will make the tab at the given index visible in RTL
     * @param index The index of the tab
     * @param nextIndex The index of the next tab
     * @param scrollPosition The current scroll position
     * @param barWidth The width of the Tab Bar
     * @param scrollContentWidth The width of the scroll content
     */
    private calculateScrollIncrementRTL_;
    /**
     * Determines the index of the adjacent tab closest to either edge of the Tab Bar
     * @param index The index of the tab
     * @param tabDimensions The dimensions of the tab
     * @param scrollPosition The current scroll position
     * @param barWidth The width of the tab bar
     */
    private findAdjacentTabIndexClosestToEdge_;
    /**
     * Determines the index of the adjacent tab closest to either edge of the Tab Bar in RTL
     * @param index The index of the tab
     * @param tabDimensions The dimensions of the tab
     * @param scrollPosition The current scroll position
     * @param barWidth The width of the tab bar
     * @param scrollContentWidth The width of the scroller content
     */
    private findAdjacentTabIndexClosestToEdgeRTL_;
    /**
     * Returns the key associated with a keydown event
     * @param evt The keydown event
     */
    private getKeyFromEvent_;
    private isActivationKey_;
    /**
     * Returns whether a given index is inclusively between the ends
     * @param index The index to test
     */
    private indexIsInRange_;
    /**
     * Returns the view's RTL property
     */
    private isRTL_;
    /**
     * Scrolls the tab at the given index into view for left-to-right user agents.
     * @param index The index of the tab to scroll into view
     */
    private scrollIntoView_;
    /**
     * Scrolls the tab at the given index into view in RTL
     * @param index The tab index to make visible
     */
    private scrollIntoViewRTL_;
}
export default MDCTabBarFoundation;
