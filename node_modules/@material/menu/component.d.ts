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
import { MDCListFactory } from '@material/list/component';
import { MDCListIndex } from '@material/list/types';
import { MDCMenuSurfaceFactory } from '@material/menu-surface/component';
import { Corner } from '@material/menu-surface/constants';
import { MDCMenuDistance } from '@material/menu-surface/types';
import { DefaultFocusState } from './constants';
import { MDCMenuFoundation } from './foundation';
export declare type MDCMenuFactory = (el: Element, foundation?: MDCMenuFoundation) => MDCMenu;
export declare class MDCMenu extends MDCComponent<MDCMenuFoundation> {
    static attachTo(root: Element): MDCMenu;
    private menuSurfaceFactory_;
    private listFactory_;
    private menuSurface_;
    private list_;
    private handleKeydown_;
    private handleItemAction_;
    private handleMenuSurfaceOpened_;
    initialize(menuSurfaceFactory?: MDCMenuSurfaceFactory, listFactory?: MDCListFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    get open(): boolean;
    set open(value: boolean);
    get wrapFocus(): boolean;
    set wrapFocus(value: boolean);
    /**
     * Sets whether the menu has typeahead functionality.
     * @param value Whether typeahead is enabled.
     */
    set hasTypeahead(value: boolean);
    /**
     * @return Whether typeahead logic is currently matching some user prefix.
     */
    get typeaheadInProgress(): boolean;
    /**
     * Given the next desired character from the user, adds it to the typeahead
     * buffer. Then, attempts to find the next option matching the buffer. Wraps
     * around if at the end of options.
     *
     * @param nextChar The next character to add to the prefix buffer.
     * @param startingIndex The index from which to start matching. Only relevant
     *     when starting a new match sequence. To start a new match sequence,
     *     clear the buffer using `clearTypeaheadBuffer`, or wait for the buffer
     *     to clear after a set interval defined in list foundation. Defaults to
     *     the currently focused index.
     * @return The index of the matched item, or -1 if no match.
     */
    typeaheadMatchItem(nextChar: string, startingIndex?: number): number;
    /**
     * Layout the underlying list element in the case of any dynamic updates
     * to its structure.
     */
    layout(): void;
    /**
     * Return the items within the menu. Note that this only contains the set of elements within
     * the items container that are proper list items, and not supplemental / presentational DOM
     * elements.
     */
    get items(): Element[];
    /**
     * Turns on/off the underlying list's single selection mode. Used mainly
     * by select menu.
     *
     * @param singleSelection Whether to enable single selection mode.
     */
    set singleSelection(singleSelection: boolean);
    /**
     * Retrieves the selected index. Only applicable to select menus.
     * @return The selected index, which is a number for single selection and
     *     radio lists, and an array of numbers for checkbox lists.
     */
    get selectedIndex(): MDCListIndex;
    /**
     * Sets the selected index of the list. Only applicable to select menus.
     * @param index The selected index, which is a number for single selection and
     *     radio lists, and an array of numbers for checkbox lists.
     */
    set selectedIndex(index: MDCListIndex);
    set quickOpen(quickOpen: boolean);
    /**
     * Sets default focus state where the menu should focus every time when menu
     * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
     * default.
     * @param focusState Default focus state.
     */
    setDefaultFocusState(focusState: DefaultFocusState): void;
    /**
     * @param corner Default anchor corner alignment of top-left menu corner.
     */
    setAnchorCorner(corner: Corner): void;
    setAnchorMargin(margin: Partial<MDCMenuDistance>): void;
    /**
     * Sets the list item as the selected row at the specified index.
     * @param index Index of list item within menu.
     */
    setSelectedIndex(index: number): void;
    /**
     * Sets the enabled state to isEnabled for the menu item at the given index.
     * @param index Index of the menu item
     * @param isEnabled The desired enabled state of the menu item.
     */
    setEnabled(index: number, isEnabled: boolean): void;
    /**
     * @return The item within the menu at the index specified.
     */
    getOptionByIndex(index: number): Element | null;
    /**
     * @param index A menu item's index.
     * @return The primary text within the menu at the index specified.
     */
    getPrimaryTextAtIndex(index: number): string;
    setFixedPosition(isFixed: boolean): void;
    setIsHoisted(isHoisted: boolean): void;
    setAbsolutePosition(x: number, y: number): void;
    /**
     * Sets the element that the menu-surface is anchored to.
     */
    setAnchorElement(element: Element): void;
    getDefaultFoundation(): MDCMenuFoundation;
}
