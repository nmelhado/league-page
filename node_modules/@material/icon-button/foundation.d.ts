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
import { MDCIconButtonToggleAdapter } from './adapter';
export declare class MDCIconButtonToggleFoundation extends MDCFoundation<MDCIconButtonToggleAdapter> {
    /**
     * Whether the icon button has an aria label that changes depending on
     * toggled state.
     */
    private hasToggledAriaLabel;
    static get cssClasses(): {
        ICON_BUTTON_ON: string;
        ROOT: string;
    };
    static get strings(): {
        ARIA_LABEL: string;
        ARIA_PRESSED: string;
        DATA_ARIA_LABEL_OFF: string;
        DATA_ARIA_LABEL_ON: string;
        CHANGE_EVENT: string;
    };
    static get defaultAdapter(): MDCIconButtonToggleAdapter;
    constructor(adapter?: Partial<MDCIconButtonToggleAdapter>);
    init(): void;
    handleClick(): void;
    isOn(): boolean;
    toggle(isOn?: boolean): void;
}
export default MDCIconButtonToggleFoundation;
