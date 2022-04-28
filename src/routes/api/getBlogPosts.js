
const GET_POSTS= `https://api.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE}/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}&content_type=blog_post`;

export async function get() {
    const res = await fetch(GET_POSTS, {compress: true}).catch((err) => { console.error(err); });

    if(!res.ok) {
        const detailedErr = await res.text()
        return {
            status: 500,
            body: JSON.stringify({
                basicErr: "Problem retrieving blog posts",
                detailedErr
            })
        };
    }

	const data = await res.json().catch((err) => { console.error(err); });

    // Make sure only to return published posts
    data.items = data.items.filter(i => i.sys.publishedVersion)

    return {
        status: 200,
        body: JSON.stringify(data)
    };
}