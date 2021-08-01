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
import { MDCFloatingLabelFactory } from '@material/floating-label/component';
import { MDCLineRippleFactory } from '@material/line-ripple/component';
import { MDCMenuFactory } from '@material/menu/component';
import { MDCNotchedOutlineFactory } from '@material/notched-outline/component';
import { MDCSelectFoundation } from './foundation';
import { MDCSelectHelperTextFactory } from './helper-text/component';
import { MDCSelectIconFactory } from './icon/component';
export declare class MDCSelect extends MDCComponent<MDCSelectFoundation> {
    static attachTo(root: Element): MDCSelect;
    private ripple;
    private menu;
    private selectAnchor;
    private selectedText;
    private hiddenInput;
    private menuElement;
    private menuItemValues;
    private leadingIcon?;
    private helperText;
    private lineRipple;
    private label;
    private outline;
    private handleFocus;
    private handleBlur;
    private handleClick;
    private handleKeydown;
    private handleMenuOpened;
    private handleMenuClosed;
    private handleMenuClosing;
    private handleMenuItemAction;
    initialize(labelFactory?: MDCFloatingLabelFactory, lineRippleFactory?: MDCLineRippleFactory, outlineFactory?: MDCNotchedOutlineFactory, menuFactory?: MDCMenuFactory, iconFactory?: MDCSelectIconFactory, helperTextFactory?: MDCSelectHelperTextFactory): void;
    /**
     * Initializes the select's event listeners and internal state based
     * on the environment's state.
     */
    initialSyncWithDOM(): void;
    destroy(): void;
    get value(): string;
    set value(value: string);
    setValue(value: string, skipNotify?: boolean): void;
    get selectedIndex(): number;
    set selectedIndex(selectedIndex: number);
    setSelectedIndex(selectedIndex: number, skipNotify?: boolean): void;
    get disabled(): boolean;
    set disabled(disabled: boolean);
    set leadingIconAriaLabel(label: string);
    /**
     * Sets the text content of the leading icon.
     */
    set leadingIconContent(content: string);
    /**
     * Sets the text content of the helper text.
     */
    set helperTextContent(content: string);
    /**
     * Enables or disables the default validation scheme where a required select
     * must be non-empty. Set to false for custom validation.
     * @param useDefaultValidation Set this to false to ignore default
     *     validation scheme.
     */
    set useDefaultValidation(useDefaultValidation: boolean);
    /**
     * Sets the current invalid state of the select.
     */
    set valid(isValid: boolean);
    /**
     * Checks if the select is in a valid state.
     */
    get valid(): boolean;
    /**
     * Sets the control to the required state.
     */
    set required(isRequired: boolean);
    /**
     * Returns whether the select is required.
     */
    get required(): boolean;
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
    getDefaultFoundation(): MDCSelectFoundation;
    /**
     * Handles setup for the menu.
     */
    private menuSetup;
    private createRipple;
    private getSelectAdapterMethods;
    private getCommonAdapterMethods;
    private getOutlineAdapterMethods;
    private getLabelAdapterMethods;
    /**
     * Calculates where the line ripple should start based on the x coordinate within the component.
     */
    private getNormalizedXCoordinate;
    private isTouchEvent;
    /**
     * Returns a map of all subcomponents to subfoundations.
     */
    private getFoundationMap;
}
