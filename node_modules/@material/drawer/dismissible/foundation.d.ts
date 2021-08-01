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
import { MDCDrawerAdapter } from '../adapter';
export declare class MDCDismissibleDrawerFoundation extends MDCFoundation<MDCDrawerAdapter> {
    static get strings(): {
        APP_CONTENT_SELECTOR: string;
        CLOSE_EVENT: string;
        OPEN_EVENT: string;
        SCRIM_SELECTOR: string;
        LIST_SELECTOR: string;
        LIST_ITEM_ACTIVATED_SELECTOR: string;
    };
    static get cssClasses(): {
        ANIMATE: string;
        CLOSING: string;
        DISMISSIBLE: string;
        MODAL: string;
        OPEN: string;
        OPENING: string;
        ROOT: string;
    };
    static get defaultAdapter(): MDCDrawerAdapter;
    private animationFrame_;
    private animationTimer_;
    constructor(adapter?: Partial<MDCDrawerAdapter>);
    destroy(): void;
    /**
     * Opens the drawer from the closed state.
     */
    open(): void;
    /**
     * Closes the drawer from the open state.
     */
    close(): void;
    /**
     * Returns true if the drawer is in the open position.
     * @return true if drawer is in open state.
     */
    isOpen(): boolean;
    /**
     * Returns true if the drawer is animating open.
     * @return true if drawer is animating open.
     */
    isOpening(): boolean;
    /**
     * Returns true if the drawer is animating closed.
     * @return true if drawer is animating closed.
     */
    isClosing(): boolean;
    /**
     * Keydown handler to close drawer when key is escape.
     */
    handleKeydown(evt: KeyboardEvent): void;
    /**
     * Handles the `transitionend` event when the drawer finishes opening/closing.
     */
    handleTransitionEnd(evt: TransitionEvent): void;
    /**
     * Extension point for when drawer finishes open animation.
     */
    protected opened_(): void;
    /**
     * Extension point for when drawer finishes close animation.
     */
    protected closed_(): void;
    /**
     * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
     */
    private runNextAnimationFrame_;
    private isElement_;
}
export default MDCDismissibleDrawerFoundation;
