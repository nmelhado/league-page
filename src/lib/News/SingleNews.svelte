<script>
    import Paper, { Title, Content } from '@smui/paper';

    export let article;
</script>

<style>
    :global(.card-media-square) {
        background-size: 600px;
    }
    
     :global(.article-title) {
        display: flex;
        margin: 1em 0 0.5em;
    }

    .title-link {
        font-weight: 500;
        color: var(--blueOne);
        text-decoration: none;
        text-align: center;
        max-height: 96px;
        margin: 0 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    .title-link:hover {
        color: #920505;
    }

    .body {
        display: flex;
        margin: 2em 0 1em;
    }

    .icon {
        height: 40px;
        width: auto;
    }

    .body-text {
        position: relative;
        flex-grow: 1;
        min-width: 0;
        max-height: 480px;
        margin: 0 auto;
        overflow: hidden;
    }

    .body-text::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 60px;
        top: 420px;
        background: -webkit-linear-gradient(
            var(--fadeOne),
            var(--fadeTwo),
            var(--fadeThree),
            var(--fadeFour)
        ); 
        background-image: -moz-linear-gradient(
            var(--fadeOne),
            var(--fadeTwo),
            var(--fadeThree),
            var(--fadeFour)
        );
        background-image: -o-linear-gradient(
            var(--fadeOne),
            var(--fadeTwo),
            var(--fadeThree),
            var(--fadeFour)
        );
        background-image: linear-gradient(
            var(--fadeOne),
            var(--fadeTwo),
            var(--fadeThree),
            var(--fadeFour)
        );
        background-image: -ms-linear-gradient(
            var(--fadeOne),
            var(--fadeTwo),
            var(--fadeThree),
            var(--fadeFour)
        );
    }

    :global(.body-text p) {
        margin-top: 0;
    }

    :global(.body-text a) {
        margin-top: 0;
        word-break: break-word;
    }

    :global(.body-text blockquote) {
        margin-top: 0;
    }

    :global(.body-text div) {
        overflow-x: scroll;
    }

    .date {
        font-style: italic;
        color: #888;
    }
</style>


<Paper class="article" elevation=3>
    <Title class="article-title">
        <img class="icon" src="{article.icon}" alt="article thumbnial" />
        {#if article.link}
            <a href="{article.link}" target="_blank" class="title-link">{article.title}</a>
        {:else}
            {article.title}
        {/if}
    </Title>
    <Content>
        <div class="body">
            <div class="body-text">{@html article.article}</div>
        </div>
        <hr />
        {#if article.author}
            <span class="author">
                {article.author}
            </span>
        {/if}
        <span class="date">{article.date}</span>
    </Content>
</Paper>