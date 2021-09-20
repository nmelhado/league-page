export async function get({params}) {
    const blogID = params.id;
    const GET_COMMENTS= `https://api.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE}/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}&content_type=blog_comment&fields.blogID=${blogID}`;

    const res = await fetch(GET_COMMENTS, {compress: true}).catch((err) => { console.error(err); });

    if(!res.ok) {
        return {
            status: 500,
            body: "Problem retrieving blog posts"
        };
    }

	const data = await res.json().catch((err) => { console.error(err); });

    return {
        status: 200,
        body: JSON.stringify(data)
    };
}