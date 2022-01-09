import vercel from '@sveltejs/adapter-vercel';
import node from '@sveltejs/adapter-node';

const dockerBuild = process.env.DOCKER_BUILD

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		ssr: false,
		target: '#svelte',
		adapter: dockerBuild ? node() : vercel(),
	}
};

export default config;
