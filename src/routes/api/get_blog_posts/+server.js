import contentful from 'contentful';
import { json, error } from '@sveltejs/kit';

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: import.meta.env.VITE_CONTENTFUL_CLIENT_ACCESS_TOKEN
});

export async function GET() {
	const data = await client.getEntries({content_type: 'blog_post'})
        .catch(e=> {
            console.error(e);
            return error(500, "Problem retrieving blog posts");
        });

    return json(data);
}