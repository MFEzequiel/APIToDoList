import fs from 'node:fs/promises'

export const readJSON = async path => {
  const data = await fs.readFile(path, 'utf-8')
  return JSON.parse(data)
}
