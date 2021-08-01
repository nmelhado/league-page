/**
 * @license
 * Copyright 2017 Google Inc.
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
import { MDCProgressIndicatorFoundation } from '@material/progress-indicator/foundation';
import { MDCLinearProgressAdapter } from './adapter';
export declare class MDCLinearProgressFoundation extends MDCFoundation<MDCLinearProgressAdapter> implements MDCProgressIndicatorFoundation {
    static get cssClasses(): {
        CLOSED_CLASS: string;
        CLOSED_ANIMATION_OFF_CLASS: string;
        INDETERMINATE_CLASS: string;
        REVERSED_CLASS: string;
        ANIMATION_READY_CLASS: string;
    };
    static get strings(): {
        ARIA_HIDDEN: string;
        ARIA_VALUEMAX: string;
        ARIA_VALUEMIN: string;
        ARIA_VALUENOW: string;
        BUFFER_BAR_SELECTOR: string;
        FLEX_BASIS: string;
        PRIMARY_BAR_SELECTOR: string;
    };
    static get defaultAdapter(): MDCLinearProgressAdapter;
    private determinate;
    private progress;
    private buffer;
    private observer;
    constructor(adapter?: Partial<MDCLinearProgressAdapter>);
    init(): void;
    setDeterminate(isDeterminate: boolean): void;
    isDeterminate(): boolean;
    setProgress(value: number): void;
    getProgress(): number;
    setBuffer(value: number): void;
    getBuffer(): number;
    open(): void;
    close(): void;
    isClosed(): boolean;
    /**
     * Handles the transitionend event emitted after `close()` is called and the
     * opacity fades out. This is so that animations are removed only after the
     * progress indicator is completely hidden.
     */
    handleTransitionEnd(): void;
    destroy(): void;
    restartAnimation(): void;
    private setPrimaryBarProgress;
    private setBufferBarProgress;
    private calculateAndSetDimensions;
}
export default MDCLinearProgressFoundation;
