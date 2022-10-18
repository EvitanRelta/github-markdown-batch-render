import { Octokit } from '@octokit/rest'

const numbers = Array.from({ length: 10 }, (_, i) => i.toString())
const upperCaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65))
const lowerCaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97))
const base62Mapping = numbers.concat(upperCaseLetters, lowerCaseLetters)

const getBase62Char = (n: number) => base62Mapping[n]
const getRandomBase62Char = () => getBase62Char(Math.floor(Math.random() * 62))
const getRandomBase62Str = (length: number) =>
    Array(length).fill(null).map(getRandomBase62Char).join('')

export type Options = {
    /**
     * The rendering mode.
     * @default "gfm"
     * */
    mode?: 'gfm' | 'markdown'
    /**
     * The repository context to use when creating references in gfm mode.
     * For example, setting context to octo-org/octo-repo will change the text
     * #42 into an HTML link to issue 42 in the octo-org/octo-repo repository.
     * */
    context?: string
    /** The `Octokit` instance to use. */
    octokit?: Octokit
}

/**
 * Batch-render markdowns via GitHub-API.
 *
 * Useful for mitigating GitHub's request rate-limit.
 * @param markdowns Array of markdown strings to render.
 * @param options Octokit options.
 * @returns Array of rendered markdown strings.
 */
export const ghMdBatchRender = async (markdowns: string[], options: Options = {}) => {
    const { mode = 'gfm', context, octokit = new Octokit() } = options
    const base62Str = getRandomBase62Str(30)
    const separator = '\n\n' + base62Str + '\n\n'
    const htmlStr = await octokit.rest.markdown
        .render({ text: markdowns.join(separator), mode, context })
        .then((x) => x.data)
    return htmlStr.split(new RegExp(`\n<p[^>]*>${base62Str}<\\/p>\n`))
}
