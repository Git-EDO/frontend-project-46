import path from 'node:path'

const pathToFile = (filepath) => path.resolve(process.cwd(), filepath)

export default pathToFile

