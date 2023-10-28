import contentful from 'contentful-management'
import { json, error } from '@sveltejs/kit';

import { getLeagueTeamManagers } from "$lib/utils/helper";

const lang = "en-US";

export async function POST({request, params}) {
    const client = contentful.createClient({
        // This is the access token for this space. Normally you get the token in the Contentful web app
        accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    });
    const space = await client.getSpace(import.meta.env.VITE_CONTENTFUL_SPACE)
        .catch(e => {
            console.error(e);
            throw error(500, "Problem getting contentful space");
        });
    const environment = await space.getEnvironment('master')
        .catch(e => {
            console.error(e);
            throw error(500, "Problem getting contentful environment");
        });
    
    const authorID = params.id;
    const {comment, postID} = await request.json();

    const leagueTeamManagers = await getLeagueTeamManagers();

    const author = validateID(leagueTeamManagers, authorID);

    if(!author) {
        throw error(500, "Invalid author");
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
            throw error(500, "Problem adding comment");
        });

    await newComment.publish()
        .catch((e) => {
            console.error(e);
            throw error(500, "Problem publishing comment");
        });

    // remove lang constraint
    newComment.fields.blogID = postID;
    newComment.fields.comment = comment;
    newComment.fields.author = author;

    return json(newComment);
}

const validateID = (leagueTeamManagers, authorID) => {
    if(leagueTeamManagers.users[authorID]) {
        return leagueTeamManagers.users[authorID].user_name.toLowerCase();
    }
        
    return false;
}