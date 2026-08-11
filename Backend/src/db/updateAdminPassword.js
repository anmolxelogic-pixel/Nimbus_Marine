import bcrypt from "bcrypt";
import db from "./sqldb.js";

const hash = await bcrypt.hash("admin123", 10);

await db.execute(
    "UPDATE ADMINLOGIN SET password = ? WHERE email = ?",
    [hash, "admin@gmail.com"]
);

console.log("Admin password updated");
process.exit();