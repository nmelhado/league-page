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
import { MDCTabScrollerFactory } from '@material/tab-scroller/component';
import { MDCTabFactory } from '@material/tab/component';
import { MDCTabBarFoundation } from './foundation';
export declare class MDCTabBar extends MDCComponent<MDCTabBarFoundation> {
    static attachTo(root: Element): MDCTabBar;
    private tabList_;
    private tabScroller_;
    private handleTabInteraction_;
    private handleKeyDown_;
    set focusOnActivate(focusOnActivate: boolean);
    set useAutomaticActivation(useAutomaticActivation: boolean);
    initialize(tabFactory?: MDCTabFactory, tabScrollerFactory?: MDCTabScrollerFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    getDefaultFoundation(): MDCTabBarFoundation;
    /**
     * Activates the tab at the given index
     * @param index The index of the tab
     */
    activateTab(index: number): void;
    /**
     * Scrolls the tab at the given index into view
     * @param index THe index of the tab
     */
    scrollIntoView(index: number): void;
    /**
     * Returns all the tab elements in a nice clean array
     */
    private getTabElements_;
    /**
     * Instantiates tab components on all child tab elements
     */
    private instantiateTabs_;
    /**
     * Instantiates tab scroller component on the child tab scroller element
     */
    private instantiateTabScroller_;
}
