import * as contentful from 'contentful';

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
});


const GET_POSTS= `https://api.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE}/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}&content_type=blog_post`;

export async function get() {
	const data = await client.getEntries({content_type: 'blog_post'});

    console.log("getBlogPosts response:");
    console.log(data);

    return {
        status: 200,
        body: JSON.stringify(data)
    };
}