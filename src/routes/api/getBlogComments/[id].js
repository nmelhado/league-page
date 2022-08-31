import contentful from 'contentful';

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: import.meta.env.VITE_CONTENTFUL_CLIENT_ACCESS_TOKEN
});

export async function get({params}) {
    const blogID = params.id;
	const data = await client.getEntries({content_type: 'blog_comment','fields.blogID': blogID})
        .catch(e => {
            console.error(e);
            return {
                status: 500,
                body: JSON.stringify({
                    basicErr: "Problem retrieving blog posts",
                })
            };
        });

    return {
        status: 200,
        body: JSON.stringify(data)
    };
}