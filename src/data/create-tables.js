import fs from 'fs-extra'
import path from 'path'

console.log(process.env);
const readSQLFile = async()=> {
    try {
        const filePath = path.join(process.cwd(), "src/data/tables.sql")
        const fileContentAsBuffer = await fs.readFile(filePath)
        const fileContentAsString = fileContentAsBuffer.toString()
        return fileContentAsString
        
    } catch (error) {
        console.log(error);
    }
}

(async()=> {
    const sqlString = await readSQLFile()
    console.log(sqlString);
})();