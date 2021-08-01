/**
 * @license
 * Copyright 2019 Google Inc.
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
import { MDCDataTableAdapter } from './adapter';
import { SortActionEventData } from './types';
/**
 * The Foundation of data table component containing pure business logic, any
 * logic requiring DOM manipulation are delegated to adapter methods.
 */
export declare class MDCDataTableFoundation extends MDCFoundation<MDCDataTableAdapter> {
    static get defaultAdapter(): MDCDataTableAdapter;
    constructor(adapter?: Partial<MDCDataTableAdapter>);
    /**
     * Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table.
     * Use this if registering checkbox is synchronous.
     */
    layout(): void;
    /**
     * Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table.
     * Use this if registering checkbox is asynchronous.
     */
    layoutAsync(): Promise<void>;
    /**
     * @return Returns array of row elements.
     */
    getRows(): Element[];
    /**
     * @return Array of header cell elements.
     */
    getHeaderCells(): Element[];
    /**
     * Sets selected row ids. Overwrites previously selected rows.
     * @param rowIds Array of row ids that needs to be selected.
     */
    setSelectedRowIds(rowIds: string[]): void;
    /**
     * @return Returns array of all row ids.
     */
    getRowIds(): Array<string | null>;
    /**
     * @return Returns array of selected row ids.
     */
    getSelectedRowIds(): Array<string | null>;
    /**
     * Handles header row checkbox change event.
     */
    handleHeaderRowCheckboxChange(): void;
    /**
     * Handles change event originated from row checkboxes.
     */
    handleRowCheckboxChange(event: Event): void;
    /**
     * Handles sort action on sortable header cell.
     */
    handleSortAction(eventData: SortActionEventData): void;
    /**
     * Shows progress indicator blocking only the table body content when in
     * loading state.
     */
    showProgress(): void;
    /**
     * Hides progress indicator when data table is finished loading.
     */
    hideProgress(): void;
    /**
     * Updates header row checkbox state based on number of rows selected.
     */
    private setHeaderRowCheckboxState;
    /**
     * Sets the attributes of row element based on selection state.
     */
    private selectRowAtIndex;
}
