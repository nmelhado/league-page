<script>
    import { stringDate } from "$lib/utils/helper";
    import { fly } from "svelte/transition";

    export let post, createdAt, id = null, direction = 1;

    const generatePargaraph = (paragraph, indent = true) => {
        let paragraphText = '';

        switch (paragraph.nodeType) {
            case 'paragraph':
                if(indent) {
                    paragraphText += '<p class="bodyParagraph">'
                }
                break;
            case 'unordered-list':
                paragraphText += '<ul>'
                break;
            case 'ordered-list':
                paragraphText += '<ol>'
                break;
            case 'blockquote':
                paragraphText += '<blockquote>'
                indent = false;
                break;
            case 'hr':
                paragraphText += '<hr />'
                break;
        
            default:
                break;
        }

        for(const element of paragraph.content) {
            // if the node type is a paragraph, then recursively call generatePargaraph on it
            if(element.nodeType == 'paragraph') {
                paragraphText += generatePargaraph(element, indent);
                continue;
            }

            // add list item
            if(element.nodeType == 'list-item') {
                paragraphText += '<li>';
                paragraphText += generatePargaraph(element, false);
                paragraphText += '</li>';
                continue;
            }

            // add modifiers
            if(element.marks) {
                for(const modifier of element.marks) {
                    // add bold text
                    if(modifier.type == 'bold') {
                        paragraphText += '<b>';
                    }

                    // add italic modifier
                    if(modifier.type == 'italic') {
                        paragraphText += '<i>';
                    }

                    // add underline text
                    if(modifier.type == 'underline') {
                        paragraphText += '<u>';
                    }

                    // add code text
                    if(modifier.type == 'code') {
                        paragraphText += '<code>';
                    }
                }
            }

            // add content
            if(element.nodeType == 'text') {
                paragraphText += element.value;
            }
            if(element.nodeType == 'hyperlink') {
                paragraphText += `<a href="${element.data.uri}" class="blogLink">`;
                paragraphText += generatePargaraph(element);
                paragraphText += '</a>';
            }

            // add closing modifiers
            if(element.marks) {
                for(const modifier of element.marks) {
                    // add code text
                    if(modifier.type == 'code') {
                        paragraphText += '</code>';
                    }

                    // add underline text
                    if(modifier.type == 'underline') {
                        paragraphText += '</u>';
                    }

                    // add italic modifier
                    if(modifier.type == 'italic') {
                        paragraphText += '</i>';
                    }
                    
                    // add bold text
                    if(modifier.type == 'bold') {
                        paragraphText += '</b>';
                    }
                }
            }
        }

        switch (paragraph.nodeType) {
            case 'paragraph':
                paragraphText += '</p>'
                break;
            case 'unordered-list':
                paragraphText += '</ul>'
                break;
            case 'blockquote':
                paragraphText += '</blockquote>'
                break;
            case 'ordered-list':
                paragraphText += '</ol>'
                break;

            default:
                break;
        }
        
        return paragraphText;
    }

    const parseDate = (rawDate) => {
		const ts = Date.parse(rawDate);
		const d = new Date(ts);
		return stringDate(d);
    }

    const duration = 300;
</script>

<style>
    .post {
        background-color: var(--fff);
        border: 1px solid var(--bbb);
        border-radius: 1.5em;
        color: var(--g333);
        padding: 1.5em 0 1em;
        margin: 2em 0;
    }

    h3 {
        font-size: 2em;
        text-align: center;
        margin: 0;
    }

    .authorAndDate a {
        background-color: #00316b;
        color: #fff;
        border-radius: 1em;
        text-decoration: none;
        font-size: 0.8em;
        padding: 0.5em 1em;
        margin-right: 1em;
    }

    .authorAndDate a:hover {
        background-color: #0082c3;
    }

    :global(.body blockquote) {
        margin: 0.1em 0;
        border-left: 3px solid rgb(231, 235, 238);
        margin: 1em 2em;
        padding-left: 0.875em;
    }

    :global(.body .bodyParagraph) {
        margin: 1em 0;
        padding: 0 2em;
    }

    :global(.body ul) {
        margin: 1em 0;
        padding: 0 2em 0 4em;
    }

    :global(.body ol) {
        margin: 1em 0;
        padding: 0 2em 0 4em;
    }

    :global(.body .bodyParagraph a) {
        color: var(--g111);
    }

    .divider {
        border:0;
        margin:0;
        width:100%;
        height:1px;
        background: var(--ddd);
        margin-bottom: 1em;
    }

    .authorAndDate {
        color: var(--g999);
        padding: 0 2em;
    }
</style>

{#key id}
    <div in:fly={{delay: duration, duration: duration, x: 150 * direction}} out:fly={{delay: 0, duration: duration, x: -150 * direction}} class="post">
        <h3>{post.title}</h3>
        
        <div class="body">
            {#each post.body.content as paragraph}
                {@html generatePargaraph(paragraph)}
            {/each}
        </div>

        <hr class="divider" />

        <div class="authorAndDate">
            <a href="/blog?filter={post.type}&page=1">{post.type}</a>
            <span class="author">{post.author} - </span>
            <span class="date"><i>{parseDate(createdAt)}</i></span>
        </div>
    </div>
{/key}