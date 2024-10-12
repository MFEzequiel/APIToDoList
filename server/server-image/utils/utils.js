import { promises as fs } from 'node:fs'

export async function fsReadJSON(path) {
    const data = await fs.readFile(path, 'utf-8')
    return JSON.parse(data)
}

export async function fsWritheJSON(path, data) {
    await fs.writeFile(path, JSON.stringify(data, null, 2))
}