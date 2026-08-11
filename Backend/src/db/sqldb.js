import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

console.log("MySQL Connected Successfully");

await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        address TEXT,
        phoneNumber VARCHAR(15) UNIQUE NOT NULL,
        isActive BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

console.log("Users Table Ready");

await db.execute(`
    CREATE TABLE IF NOT EXISTS ADMINLOGIN (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

console.log("Admin Auth Table Ready");

await db.execute(`
    CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

console.log("Services Table Ready");

await db.execute(`
    CREATE TABLE IF NOT EXISTS home_text (
        id INT AUTO_INCREMENT PRIMARY KEY,
        heading VARCHAR(255) NOT NULL,
        subtitle VARCHAR(500) NOT NULL,
        primaryButton VARCHAR(255) NOT NULL,
        secondaryButton VARCHAR(255) NOT NULL,
        experienceNumber VARCHAR(50) NOT NULL,
        experienceText VARCHAR(255) NOT NULL,
        isoNumber VARCHAR(50) NOT NULL,
        isoText VARCHAR(255) NOT NULL,
        countriesNumber VARCHAR(50) NOT NULL,
        countriesText VARCHAR(255) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
    )
`);

console.log("Home Text Table Ready");

await db.execute(`
    CREATE TABLE IF NOT EXISTS files (
        id INT AUTO_INCREMENT PRIMARY KEY,
        originalname VARCHAR(255) NOT NULL,
        filename VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

console.log("Upload File Ready");

await db.execute(`
    ALTER IMAGE 
    `)

export default db;