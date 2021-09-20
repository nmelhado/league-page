
const GET_POSTS= `https://cdn.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE}/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`;

export async function get() {
    const res = await fetch(GET_POSTS, {compress: true}).catch((err) => { console.error(err); });

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