import {version} from '$lib/version';

export async function get() {
    const res = await fetch('https://league-page.nmelhado.com/api/checkGlobalVersion', {compress: true})
    let needsUpdate = false;
    if(res.ok) {
        const globalVersion = await res.json();
        console.log(`VERSION CHECK: global version: ${globalVersion}, local version: ${version}`);
        console.log(version);
        // If it reaches the global checkpoint and the versions do not match
        // set needsUpdate to true to display the update prompt
        needsUpdate = globalVersion != version;
    }

    return {
        status: 200,
        body: JSON.stringify(needsUpdate)
    };
}
