import {version} from '$lib/version';

export async function get() {
    return {
        status: 200,
        body: JSON.stringify(version)
    };
}
