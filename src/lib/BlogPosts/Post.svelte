<script>
    export let post, createdAt;

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
            console.log(element)
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

    console.log(createdAt);
    console.log(post);
</script>

<style>
    .post {
        background-color: var(--fff);
        border: 1px solid var(--bbb);
        border-radius: 1.5em;
        color: var(--g333);
        padding: 1.5em 0 2em;
    }

    h3 {
        font-size: 2em;
        text-align: center;
        margin: 0;
    }

    .postType {
        text-align: center;
    }

    .postType a {
        background-color: #00316b;
        color: #fff;
        border-radius: 1em;
        text-decoration: none;
        font-size: 0.8em;
        padding: 0.5em 1em;
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
</style>

<div class="post">
    <h3>{post.title}</h3>
    <div class="postType">
        <a href="/blog?type={post.type}">{post.type}</a>
    </div>
    
    <div class="body">
        {#each post.body.content as paragraph}
            {@html generatePargaraph(paragraph)}
        {/each}
    </div>

    <hr class="divider" />

    <div class="authorAndDate">
        <span class="author">{post.author}</span>
        <span class="date">{createdAt}</span>
    </div>
</div>