import { promises as fs } from 'node:fs'

export async function readUsers(path) {
    const data = await fs.readFile(path, 'utf-8')
    return JSON.parse(data)
}

export async function writeUsers(path, data) {
    await fs.writeFile(path, JSON.stringify(data, null, 2))
}