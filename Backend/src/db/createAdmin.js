import bcrypt from "bcrypt";
import db from "./sqldb.js";

const email = "admin@gmail.com";
const password = "admin123";

const hash = await bcrypt.hash(password, 10);

await db.execute(
    "UPDATE ADMINLOGIN SET password = ? WHERE email = ?",
    [hash, email]
);

console.log("Admin password updated");
process.exit();