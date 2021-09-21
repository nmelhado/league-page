import { getLeagueUsers } from "$lib/utils/helper";

const lang = "en-US";

export async function post(req) {
    const authorID = req.params.id;
    const {comment, postID} = JSON.parse(req.body);

    const users = await getLeagueUsers();

    const author = validateID(users, authorID);

    if(!author) {
        return {
            status: 500,
            body: JSON.stringify("Invalid author")
        };
    }

    const POST_COMMENTS= `https://api.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE}/environments/master/entries/${makeid(postID, 10)}`;

    let fields = {
        "blogID": {},
        "comment": {},
        "author": {}
    };

    fields.blogID[lang] = postID;
    fields.comment[lang] = comment;
    fields.author[lang] = author;

    const res = await fetch(POST_COMMENTS, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`, 
            'Content-Type': 'application/vnd.contentful.management.v1+json',
            'X-Contentful-Content-Type': 'blog_comment'
        }), 
        body: JSON.stringify({
            fields
        })
    })

    const newComment = await res.json();

    if(!res.ok) {
        console.error(newComment);
        console.error(newComment?.details?.errors);
        return {
            status: 500,
            body: JSON.stringify("Problem adding comment")
        };
    }

    const commentID = newComment?.sys?.id;
    const version = newComment?.sys?.version;

    if(!commentID) {
        console.error(newComment);
        return {
            status: 500,
            body: JSON.stringify("Problem adding comment")
        };
    }
    
    const PUBLISH_COMMENT = `https://api.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE}/environments/master/entries/${commentID}/published`;

    const publishRes = await fetch(PUBLISH_COMMENT, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`, 
            'X-Contentful-Version': version
        })
    })

    const publishJson = await publishRes.json();

    if(!res.ok) {
        console.error(publishJson);
        return {
            status: 500,
            body: JSON.stringify("Problem publishing comment")
        };
    }

    return {
        status: 200,
        body: JSON.stringify(newComment)
    };
}

const makeid = (id, length) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
   }
   return `${id}-${result}`;
}

const validateID = (users, authorID) => {
    let user = null;
    for(const userKey of Object.keys(users)) {
        if(users[userKey].user_id == authorID) {
            user = users[userKey];
            break;
        }
    }
    if(!user) {
        return false;
    }
    return user.display_name;
}