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
import { MDCList, MDCListFactory } from '@material/list/component';
import { MDCDismissibleDrawerFoundation } from './dismissible/foundation';
import { MDCDrawerFocusTrapFactory } from './util';
/**
 * @events `MDCDrawer:closed {}` Emits when the navigation drawer has closed.
 * @events `MDCDrawer:opened {}` Emits when the navigation drawer has opened.
 */
export declare class MDCDrawer extends MDCComponent<MDCDismissibleDrawerFoundation> {
    static attachTo(root: Element): MDCDrawer;
    /**
     * @return boolean Proxies to the foundation's `open`/`close` methods.
     * Also returns true if drawer is in the open position.
     */
    get open(): boolean;
    /**
     * Toggles the drawer open and closed.
     */
    set open(isOpen: boolean);
    private previousFocus_?;
    private scrim_;
    private list_?;
    private focusTrap_?;
    private focusTrapFactory_;
    private handleScrimClick_?;
    private handleKeydown_;
    private handleTransitionEnd_;
    get list(): MDCList | undefined;
    initialize(focusTrapFactory?: MDCDrawerFocusTrapFactory, listFactory?: MDCListFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    getDefaultFoundation(): MDCDismissibleDrawerFoundation;
}
