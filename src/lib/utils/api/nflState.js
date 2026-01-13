import { get } from 'svelte/store';
import {nflStateStore} from '$lib/stores';

export const getNflState = async () => {
	if(get(nflStateStore).season) {
		return get(nflStateStore);
	}
    const res = await fetch(`https://api.sleeper.app/v1/state/nfl`, {compress: true}).catch((err) => { console.error(err); });
	const data = await res.json().catch((err) => { console.error(err); });

	if (res.ok) {
		nflStateStore.update(() => data);
		return data;
	} else {
		throw new Error(data);
	}
}