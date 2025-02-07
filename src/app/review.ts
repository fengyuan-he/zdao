const sensitive = fetch('https://raw.githubusercontent.com/cjh0613/tencent-sensitive-words/refs/heads/main/sensitive_words_lines.txt')
    .then(res => res.text())
    .then(value => {
        const words = value.split('\n')
        words.pop()
        return new RegExp(words.map(string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g')
    })

export default async function review(text: string) {
    return text.replaceAll(await sensitive, match => '\\*'.repeat(match.length))
}