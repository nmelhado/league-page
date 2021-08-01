import type { Stats } from 'fs';
import type { EventEmitter } from 'events';

export default class CheapWatch extends EventEmitter {
	dir: string;
	filter?: Filter;
	watch: boolean;
	debounce: number;
	paths: Map<string, Stats>;
	constructor(data: object);
	init(): Promise<void>;
	close(): void;
}

interface Filter {
	(file: { path: string; stats: Stats }): Promise<boolean>;
}
