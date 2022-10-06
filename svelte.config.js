// import vercel from '@sveltejs/adapter-vercel';
// import node from '@sveltejs/adapter-node';

// const dockerBuild = process.env.DOCKER_BUILD

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		adapter: dockerBuild ? node() : vercel(),
// 	}
// };

// export default config;

import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(),
        prerender: {
            default: true
        }
    }
};

export default config;