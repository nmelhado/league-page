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
import { MDCSelectAdapter } from './adapter';
import { MDCSelectFoundationMap } from './types';
export declare class MDCSelectFoundation extends MDCFoundation<MDCSelectAdapter> {
    static get cssClasses(): {
        ACTIVATED: string;
        DISABLED: string;
        FOCUSED: string;
        INVALID: string;
        MENU_INVALID: string;
        OUTLINED: string;
        REQUIRED: string;
        ROOT: string;
        WITH_LEADING_ICON: string;
    };
    static get numbers(): {
        LABEL_SCALE: number;
        UNSET_INDEX: number;
        CLICK_DEBOUNCE_TIMEOUT_MS: number;
    };
    static get strings(): {
        ARIA_CONTROLS: string;
        ARIA_DESCRIBEDBY: string;
        ARIA_SELECTED_ATTR: string;
        CHANGE_EVENT: string;
        HIDDEN_INPUT_SELECTOR: string;
        LABEL_SELECTOR: string;
        LEADING_ICON_SELECTOR: string;
        LINE_RIPPLE_SELECTOR: string;
        MENU_SELECTOR: string;
        OUTLINE_SELECTOR: string;
        SELECTED_TEXT_SELECTOR: string;
        SELECT_ANCHOR_SELECTOR: string;
        VALUE_ATTR: string;
    };
    /**
     * See {@link MDCSelectAdapter} for typing information on parameters and return types.
     */
    static get defaultAdapter(): MDCSelectAdapter;
    private readonly leadingIcon;
    private readonly helperText;
    private disabled;
    private isMenuOpen;
    private useDefaultValidation;
    private customValidity;
    private lastSelectedIndex;
    private clickDebounceTimeout;
    private recentlyClicked;
    /**
     * @param adapter
     * @param foundationMap Map from subcomponent names to their subfoundations.
     */
    constructor(adapter?: Partial<MDCSelectAdapter>, foundationMap?: Partial<MDCSelectFoundationMap>);
    /** Returns the index of the currently selected menu item, or -1 if none. */
    getSelectedIndex(): number;
    setSelectedIndex(index: number, closeMenu?: boolean, skipNotify?: boolean): void;
    setValue(value: string, skipNotify?: boolean): void;
    getValue(): string;
    getDisabled(): boolean;
    setDisabled(isDisabled: boolean): void;
    /** Opens the menu. */
    openMenu(): void;
    /**
     * @param content Sets the content of the helper text.
     */
    setHelperTextContent(content: string): void;
    /**
     * Re-calculates if the notched outline should be notched and if the label
     * should float.
     */
    layout(): void;
    /**
     * Synchronizes the list of options with the state of the foundation. Call
     * this whenever menu options are dynamically updated.
     */
    layoutOptions(): void;
    handleMenuOpened(): void;
    handleMenuClosing(): void;
    handleMenuClosed(): void;
    /**
     * Handles value changes, via change event or programmatic updates.
     */
    handleChange(): void;
    handleMenuItemAction(index: number): void;
    /**
     * Handles focus events from select element.
     */
    handleFocus(): void;
    /**
     * Handles blur events from select element.
     */
    handleBlur(): void;
    handleClick(normalizedX: number): void;
    /**
     * Handles keydown events on select element. Depending on the type of
     * character typed, does typeahead matching or opens menu.
     */
    handleKeydown(event: KeyboardEvent): void;
    /**
     * Opens/closes the notched outline.
     */
    notchOutline(openNotch: boolean): void;
    /**
     * Sets the aria label of the leading icon.
     */
    setLeadingIconAriaLabel(label: string): void;
    /**
     * Sets the text content of the leading icon.
     */
    setLeadingIconContent(content: string): void;
    setUseDefaultValidation(useDefaultValidation: boolean): void;
    setValid(isValid: boolean): void;
    isValid(): boolean;
    setRequired(isRequired: boolean): void;
    getRequired(): boolean;
    init(): void;
    /**
     * Unfocuses the select component.
     */
    private blur;
    private syncHelperTextValidity;
    private setClickDebounceTimeout;
}
export default MDCSelectFoundation;
