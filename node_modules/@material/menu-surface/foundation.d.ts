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
import { MDCMenuSurfaceAdapter } from './adapter';
import { Corner } from './constants';
import { MDCMenuDistance } from './types';
export declare class MDCMenuSurfaceFoundation extends MDCFoundation<MDCMenuSurfaceAdapter> {
    static get cssClasses(): {
        ANCHOR: string;
        ANIMATING_CLOSED: string;
        ANIMATING_OPEN: string;
        FIXED: string;
        IS_OPEN_BELOW: string;
        OPEN: string;
        ROOT: string;
    };
    static get strings(): {
        CLOSED_EVENT: string;
        CLOSING_EVENT: string;
        OPENED_EVENT: string;
        FOCUSABLE_ELEMENTS: string;
    };
    static get numbers(): {
        TRANSITION_OPEN_DURATION: number;
        TRANSITION_CLOSE_DURATION: number;
        MARGIN_TO_EDGE: number;
        ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: number;
    };
    static get Corner(): typeof Corner;
    /**
     * @see {@link MDCMenuSurfaceAdapter} for typing information on parameters and return types.
     */
    static get defaultAdapter(): MDCMenuSurfaceAdapter;
    private isSurfaceOpen;
    private isQuickOpen;
    private isHoistedElement;
    private isFixedPosition;
    private isHorizontallyCenteredOnViewport;
    private maxHeight;
    private openAnimationEndTimerId;
    private closeAnimationEndTimerId;
    private animationRequestId;
    private anchorCorner;
    /**
     * Corner of the menu surface to which menu surface is attached to anchor.
     *
     *  Anchor corner --->+----------+
     *                    |  ANCHOR  |
     *                    +----------+
     *  Origin corner --->+--------------+
     *                    |              |
     *                    |              |
     *                    | MENU SURFACE |
     *                    |              |
     *                    |              |
     *                    +--------------+
     */
    private originCorner;
    private readonly anchorMargin;
    private readonly position;
    private dimensions;
    private measurements;
    constructor(adapter?: Partial<MDCMenuSurfaceAdapter>);
    init(): void;
    destroy(): void;
    /**
     * @param corner Default anchor corner alignment of top-left menu surface corner.
     */
    setAnchorCorner(corner: Corner): void;
    /**
     * Flip menu corner horizontally.
     */
    flipCornerHorizontally(): void;
    /**
     * @param margin Set of margin values from anchor.
     */
    setAnchorMargin(margin: Partial<MDCMenuDistance>): void;
    /** Used to indicate if the menu-surface is hoisted to the body. */
    setIsHoisted(isHoisted: boolean): void;
    /** Used to set the menu-surface calculations based on a fixed position menu. */
    setFixedPosition(isFixedPosition: boolean): void;
    /** Sets the menu-surface position on the page. */
    setAbsolutePosition(x: number, y: number): void;
    /** Sets whether menu-surface should be horizontally centered to viewport. */
    setIsHorizontallyCenteredOnViewport(isCentered: boolean): void;
    setQuickOpen(quickOpen: boolean): void;
    /**
     * Sets maximum menu-surface height on open.
     * @param maxHeight The desired max-height. Set to 0 (default) to
     *     automatically calculate max height based on available viewport space.
     */
    setMaxHeight(maxHeight: number): void;
    isOpen(): boolean;
    /**
     * Open the menu surface.
     */
    open(): void;
    /**
     * Closes the menu surface.
     */
    close(skipRestoreFocus?: boolean): void;
    /** Handle clicks and close if not within menu-surface element. */
    handleBodyClick(evt: MouseEvent): void;
    /** Handle keys that close the surface. */
    handleKeydown(evt: KeyboardEvent): void;
    private autoposition;
    /**
     * @return Measurements used to position menu surface popup.
     */
    private getAutoLayoutmeasurements;
    /**
     * Computes the corner of the anchor from which to animate and position the
     * menu surface.
     *
     * Only LEFT or RIGHT bit is used to position the menu surface ignoring RTL
     * context. E.g., menu surface will be positioned from right side on TOP_END.
     */
    private getoriginCorner;
    /**
     * @param corner Origin corner of the menu surface.
     * @return Maximum height of the menu surface, based on available space. 0 indicates should not be set.
     */
    private getMenuSurfaceMaxHeight;
    /**
     * @param corner Origin corner of the menu surface.
     * @return Horizontal offset of menu surface origin corner from corresponding anchor corner.
     */
    private getHorizontalOriginOffset;
    /**
     * @param corner Origin corner of the menu surface.
     * @return Vertical offset of menu surface origin corner from corresponding anchor corner.
     */
    private getVerticalOriginOffset;
    /** Calculates the offsets for positioning the menu-surface when the menu-surface has been hoisted to the body. */
    private adjustPositionForHoistedElement;
    /**
     * The last focused element when the menu surface was opened should regain focus, if the user is
     * focused on or within the menu surface when it is closed.
     */
    private maybeRestoreFocus;
    private hasBit;
    private setBit;
    private unsetBit;
    /**
     * isFinite that doesn't force conversion to number type.
     * Equivalent to Number.isFinite in ES2015, which is not supported in IE.
     */
    private isFinite;
}
export default MDCMenuSurfaceFoundation;
