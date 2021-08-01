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
import { MDCMenuAdapter } from './adapter';
import { DefaultFocusState } from './constants';
export declare class MDCMenuFoundation extends MDCFoundation<MDCMenuAdapter> {
    static get cssClasses(): {
        MENU_SELECTED_LIST_ITEM: string;
        MENU_SELECTION_GROUP: string;
        ROOT: string;
    };
    static get strings(): {
        ARIA_CHECKED_ATTR: string;
        ARIA_DISABLED_ATTR: string;
        CHECKBOX_SELECTOR: string;
        LIST_SELECTOR: string;
        SELECTED_EVENT: string;
    };
    static get numbers(): {
        FOCUS_ROOT_INDEX: number;
    };
    private closeAnimationEndTimerId_;
    private defaultFocusState_;
    /**
     * @see {@link MDCMenuAdapter} for typing information on parameters and return types.
     */
    static get defaultAdapter(): MDCMenuAdapter;
    constructor(adapter?: Partial<MDCMenuAdapter>);
    destroy(): void;
    handleKeydown(evt: KeyboardEvent): void;
    handleItemAction(listItem: Element): void;
    handleMenuSurfaceOpened(): void;
    /**
     * Sets default focus state where the menu should focus every time when menu
     * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
     * default.
     */
    setDefaultFocusState(focusState: DefaultFocusState): void;
    /**
     * Selects the list item at `index` within the menu.
     * @param index Index of list item within the menu.
     */
    setSelectedIndex(index: number): void;
    /**
     * Sets the enabled state to isEnabled for the menu item at the given index.
     * @param index Index of the menu item
     * @param isEnabled The desired enabled state of the menu item.
     */
    setEnabled(index: number, isEnabled: boolean): void;
    private validatedIndex_;
}
export default MDCMenuFoundation;
