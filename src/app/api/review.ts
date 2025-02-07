const sensitive = fetch('https://raw.githubusercontent.com/cjh0613/strict-sensitive-word/refs/heads/master/strict-sensitive-word.txt')
    .then(res => res.text())
    .then(value => {
        const words = value.split('\n')
        words.pop()
        return new RegExp(words.map(string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'))
    })

export default async function review(text: string) {
    return text.replace(await sensitive, '\*')
}