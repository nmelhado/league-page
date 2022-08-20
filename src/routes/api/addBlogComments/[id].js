import * as contentful from 'contentful-management';

import { getLeagueUsers } from "$lib/utils/helper";

const client = contentful.createClient({
    // This is the access token for this space. Normally you get the token in the Contentful web app
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

const lang = "en-US";

export async function post(req) {
    const space = await client.getSpace(import.meta.env.VITE_CONTENTFUL_SPACE)
        .catch(e => {
            console.error(e);
            return {
                status: 500,
                body: JSON.stringify("Problem getting contentful space")
            };
        });
    const environment = await space.getEnvironment('master')
        .catch(e => {
            console.error(e);
            return {
                status: 500,
                body: JSON.stringify("Problem getting contentful environment")
            };
        });
    
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

    let fields = {
        "blogID": {},
        "comment": {},
        "author": {}
    };

    fields.blogID[lang] = postID;
    fields.comment[lang] = comment;
    fields.author[lang] = author;

    const newComment = await environment.createEntry('blog_comment', {fields})
        .catch(e => {
            console.error(e);
            return {
                status: 500,
                body: JSON.stringify("Problem adding comment")
            };
        });

    await newComment.publish()
        .catch((e) => {
            console.error(e);
            return {
                status: 500,
                body: JSON.stringify("Problem publishing comment")
            };
        });

    // remove lang constraint
    newComment.fields.blogID = postID;
    newComment.fields.comment = comment;
    newComment.fields.author = author;

    return {
        status: 200,
        body: JSON.stringify(newComment)
    };
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