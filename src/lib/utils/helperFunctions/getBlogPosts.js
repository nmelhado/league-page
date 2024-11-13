import { get } from 'svelte/store';
import {posts} from '$lib/stores';

export const getBlogPosts = async (servFetch, bypass = false) => {
	if(get(posts)[0]?.items && !bypass) {
		return {posts: get(posts), fresh: false};
	}
    const smartFetch = servFetch ?? fetch;
    
    const res = await smartFetch(`/api/getBlogPosts`, {compress: true});
    
	if(!res.ok) {
		const errs = await res.text();
		console.error(errs);
		if(get(posts)[0]?.items) {	
			return {posts: get(posts), fresh: true}
		}
		return {posts: [], fresh: true}
	}

	const newPosts = await res.json();

	// sort the results by create date
	const finalPosts = [...newPosts.items].sort((a, b) => Date.parse(b.sys.createdAt) - Date.parse(a.sys.createdAt));

	posts.update(() => finalPosts);

	return {posts: finalPosts, fresh: true};
}

export const generateParagraph = (paragraph, indent = true) => {
    let {paragraphText, newIndent} = genElementStart(paragraph.nodeType, indent, paragraph.data.target);
    indent = newIndent;

    for(const element of paragraph.content) {
        paragraphText += genContent(element, indent);
    }
    paragraphText += genElementEnd(paragraph.nodeType, indent);
    
    return paragraphText;
}

const genElementStart = (nodeType, indent, target) => {
    let paragraphText = "";

    switch (nodeType) {
        case 'heading-1':
            if(indent) {
                paragraphText = '<h1 class="heading-1">'
            }
            break;
        case 'heading-2':
            if(indent) {
                paragraphText = '<h2 class="heading-2">'
            }
            break;
        case 'heading-3':
            if(indent) {
                paragraphText = '<h3 class="heading-3">'
            }
            break;
        case 'heading-4':
            if(indent) {
                paragraphText = '<h4 class="heading-4">'
            }
            break;
        case 'heading-5':
            if(indent) {
                paragraphText = '<h5 class="heading-5">'
            }
            break;
        case 'heading-6':
            if(indent) {
                paragraphText = '<h6 class="heading-6">'
            }
            break;
        case 'paragraph':
            if(indent) {
                paragraphText = '<p class="bodyParagraph">'
            }
            break;
        case 'table':
            paragraphText = '<table>'
            break;
        case 'table-row':
            paragraphText = '<tr>'
            break;
        case 'table-cell':
            paragraphText = '<td>'
            break;
        case 'table-header-cell':
            paragraphText = '<th>'
            break;
        case 'unordered-list':
            paragraphText = '<ul>'
            break;
        case 'ordered-list':
            paragraphText = '<ol>'
            break;
        case 'blockquote':
            paragraphText = '<blockquote>'
            indent = false;
            break;
        case 'hr':
            paragraphText = '<hr />'
            break;
        case 'embedded-asset-block':
            paragraphText = `<br /><div class="blogImg"><img class="innerImg" src="${getImg(target)}" alt="${target.fields.title}" /></div>`
            break;
    
        default:
            break;
    }
    return {paragraphText, newIndent: indent};
}

const genElementEnd = (nodeType, indent) => {
    switch (nodeType) {
        case 'heading-1':
            if(indent) {
                return '</h1>';
            }
            return '';
        case 'heading-2':
            if(indent) {
                return '</h2>';
            }
            return '';
        case 'heading-3':
            if(indent) {
                return '</h3>'
            }
            return '';
        case 'heading-4':
            if(indent) {
                return '</h4>';
            }
            return '';
        case 'heading-5':
            if(indent) {
                return '</h5>';
            }
            return '';
        case 'heading-6':
            if(indent) {
                return '</h6>';
            }
            return '';
        case 'paragraph':
            if(indent) {
                return '</p>';
            }
            return '';
        case 'table':
            return '</table>';
        case 'table-row':
            return '</tr>';
        case 'table-cell':
            return '</td>';
        case 'table-header-cell':
            return '</th>';
        case 'unordered-list':
            return '</ul>';
        case 'blockquote':
            return '</blockquote>';
        case 'ordered-list':
            return '</ol>';
        default:
            return '';
    }
}

const genContent = (element, indent) => {
    let paragraphText = '';

    // if the node type is a paragraph, then recursively call generateParagraph on it
    switch(element.nodeType) {
        case 'paragraph':
            return generateParagraph(element, indent);
        case 'list-item':
            paragraphText += '<li>';
            paragraphText += generateParagraph(element, false);
            paragraphText += '</li>';
            return paragraphText;
        case 'embedded-asset-block':
        case 'ordered-list':
        case 'unordered-list':
        case 'table':
        case 'table-row':
        case 'table-cell':
        case 'table-header-cell':
            return generateParagraph(element, false);
    }

    // add modifiers
    paragraphText += genOpeningModifiers(element.marks)
    // add content
    if(element.nodeType == 'text') {
        paragraphText += element.value;
    }
    if(element.nodeType == 'hyperlink') {
        paragraphText += `<a href="${element.data.uri}" class="blogLink">`;
        paragraphText += generateParagraph(element);
        paragraphText += '</a>';
    }
    // add closing modifiers
    paragraphText += genClosingModifiers(element.marks);
    return paragraphText;
}

// helper function for generateParagraph that shouldn't be exported
const getImg = (img) => {
    return `https://${img.fields.file.url.split('//')[1]}?fm=jpg&fl=progressive`;
}

const genOpeningModifiers = (marks) => {
    let modifiers = '';
    if(marks) {
        for(const mark of marks) {
            // add bold text
            if(mark.type == 'bold') {
                modifiers += '<b>';
            }
            // add italic modifier
            if(mark.type == 'italic') {
                modifiers += '<i>';
            }
            // add underline text
            if(mark.type == 'underline') {
                modifiers += '<u>';
            }
            // add code text
            if(mark.type == 'code') {
                modifiers += '<code>';
            }
        }
    }
    return modifiers;
}

const genClosingModifiers = (marks) => {
    let modifiers = '';
    if(marks) {
        for(const mark of marks) {
            // add code text
            if(mark.type == 'code') {
                modifiers += '</code>';
            }
            // add underline text
            if(mark.type == 'underline') {
                modifiers += '</u>';
            }
            // add italic modifier
            if(mark.type == 'italic') {
                modifiers += '</i>';
            }
            
            // add bold text
            if(mark.type == 'bold') {
                modifiers += '</b>';
            }
        }
    }
    return modifiers;
}
