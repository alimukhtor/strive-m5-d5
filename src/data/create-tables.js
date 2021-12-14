import fs from 'fs-extra'
import path from 'path'
import pool from './connect.js'
const readSqlTables = async()=> {
    try {
        const filePath = path.join(process.cwd(), "src/data/tables.sql")
        const fileContentAsBuffer = await fs.readFile(filePath)
        const fileContentAsString = fileContentAsBuffer.toString()
        await pool.query(fileContentAsString)
        console.log("Default tables are created");
    } catch (error) {
        console.log("Tables are not created!", error);
    }
}

(async()=> {
    await readSqlTables()
})();