const sensitive = fetch('https://raw.gitmirror.com/konsheng/Sensitive-lexicon/refs/heads/main/Vocabulary/零时-Tencent.txt')
    .then(res => res.text())
    .then(value => {
        const words = value.split('\n')
        words.pop()
        return new RegExp(words.map(string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g')
    })

export default async function review(text: string) {
    return text.replaceAll(await sensitive, match => '\\*'.repeat(match.length))
}