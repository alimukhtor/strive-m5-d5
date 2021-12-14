import pg from 'pg';


const {Pool} = pg;
const pool = new Pool();

export const testDbConnection = async()=> {
    try {
       const result = await pool.query('SELECT NOW()');
       console.log("The connection is successfully completed");
    } catch (error) {
        console.log("Query is failed!", error)
    }

}
export default pool;