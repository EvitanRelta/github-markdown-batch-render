# Batch render markdowns via GitHub-API

For batch-rendering an array of Markdown strings via GitHub's API *(using Octokit/REST)*.

Uses only 1 GitHub-API request to render all the markdown strings.

> Useful for mitigating GitHub's API's request rate-limit.

<br>

## Install

<br>

```bash
npm i github-markdown-batch-render
```

<br>

## Usage

Basic usage:

````typescript
const markdowns = [
    '**bold** _italic_', 
    '# Title\n\nParagrapgh', 
    '```\nCodeblock\n```'
]
const renderedMarkdowns = await ghMdBatchRender(markdowns)
/**
 * 'renderedMarkdowns' will be: [
 *     '<p><strong>bold</strong> <em>italic</em></p>',
 *     '<h1>Title</h1>\n<p>Paragrapgh</p>',
 *     '<pre class="notranslate"><code class="notranslate">Codeblock\n</code></pre>'
 * ]
 */
````

<br>Force use an `Octokit` instance:

```typescript
const octokit = new Octokit({ auth: 'personalaccesstoken' })
const renderedMarkdowns = await ghMdBatchRender(markdowns, { octokit })
```

<br>Passing passing `mode` / `context` option to the [`Octokit.rest.markdown.render`](https://octokit.github.io/rest.js/v19#markdown-render) method:

> Note: `ghMdBatchRender`'s `mode` option defaults to `"gfm"` unlike Octokit, which defaults to `"markdown"`.

```typescript
const renderedMarkdowns = await ghMdBatchRender(markdowns, {
    mode: 'markdown', // default is "gfm"
    context: 'github/linguist',
})
```
