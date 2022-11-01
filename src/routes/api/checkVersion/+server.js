import {version} from '$lib/version';
import { json } from '@sveltejs/kit';

export async function GET() {
    const res = await fetch('https://league-page.nmelhado.com/api/checkGlobalVersion', {compress: true})
    let needsUpdate = false;
    if(res.ok) {
        const globalVersion = await res.json();
        console.log(`VERSION CHECK: global version: ${globalVersion}, local version: ${version}`);
        // If it reaches the global checkpoint and the versions do not match
        // set needsUpdate to true to display the update prompt
        needsUpdate = globalVersion != version;
    }

    return json(needsUpdate);
}
