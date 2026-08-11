import db from './sqldb.js';

const AdminLogin = await db.execute(`
     CREATE TABLE IF NOT EXISTs ADMINLOGIN(
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     )
`);

console.log("Admin auth created");

export default AdminLogin;