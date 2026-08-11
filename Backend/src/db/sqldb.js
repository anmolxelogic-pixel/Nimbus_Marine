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
    CREATE TABLE IF NOT EXISTS hometext (
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
    CREATE TABLE IF NOT EXISTS navbar (
        id INT PRIMARY KEY,
        logo VARCHAR(500),

        home_text VARCHAR(100) NOT NULL DEFAULT 'Home',
        about_text VARCHAR(100) NOT NULL DEFAULT 'About',
        locations_text VARCHAR(100) NOT NULL DEFAULT 'Locations',
        contact_text VARCHAR(100) NOT NULL DEFAULT 'Contact',
        career_text VARCHAR(100) NOT NULL DEFAULT 'Career',
        services_text VARCHAR(100) NOT NULL DEFAULT 'Services',
        sector_text VARCHAR(100) NOT NULL DEFAULT 'Sector',

        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
    )
`);

console.log("Navbar Table Ready");



await db.execute(`
    INSERT INTO navbar (
        id,
        logo,
        home_text,
        about_text,
        locations_text,
        contact_text,
        career_text,
        services_text,
        sector_text
    )
    VALUES (
        1,
        NULL,
        'Home',
        'About',
        'Locations',
        'Contact',
        'Career',
        'Services',
        'Sector'
    )
    ON DUPLICATE KEY UPDATE id = id
`);

console.log("Default Navbar Ready");



await db.execute(`
    CREATE TABLE IF NOT EXISTS footer (
        id INT AUTO_INCREMENT PRIMARY KEY,

        logo VARCHAR(500),

        company_name VARCHAR(255),
        company_tagline VARCHAR(255),
        description TEXT,

            quick_links_title VARCHAR(255),
            quick_home VARCHAR(255),
            quick_dashboard VARCHAR(255),
            quick_profile VARCHAR(255),
            quick_support VARCHAR(255),

        quick_link_1 VARCHAR(255),
        quick_link_2 VARCHAR(255),
        quick_link_3 VARCHAR(255),
        quick_link_4 VARCHAR(255),

        resource_1 VARCHAR(255),
        resource_2 VARCHAR(255),
        resource_3 VARCHAR(255),
        resource_4 VARCHAR(255),

        address TEXT,
        phone VARCHAR(100),
        email VARCHAR(255),
        website VARCHAR(255),

        certification_1_title VARCHAR(255),
        certification_1_description VARCHAR(255),

        certification_2_title VARCHAR(255),
        certification_2_description VARCHAR(255),

        facebook_url VARCHAR(500),
        linkedin_url VARCHAR(500),
        twitter_url VARCHAR(500),

        copyright_text VARCHAR(255),
        privacy_text VARCHAR(255),
        terms_text VARCHAR(255),

        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ON UPDATE CURRENT_TIMESTAMP
    )
`);

console.log("Footer Table Ready");

await db.execute(`
    INSERT INTO footer (
        id,
        logo,
        company_name,
        company_tagline,
        company_description,

        quick_links_title,
        quick_home,
        quick_dashboard,
        quick_profile,
        quick_support,

        resources_title,
        resource_privacy,
        resource_terms,
        resource_documentation,
        resource_help,

        contact_title,
        contact_address,
        contact_phone,
        contact_email,
        contact_website,

        certification_title,
        certification_one_title,
        certification_one_description,
        certification_two_title,
        certification_two_description,

        copyright_text,
        privacy_text,
        terms_text
    )
    VALUES (
        1,
        NULL,

        'Global Maritime',
        'Global Maritime Solutions',
        'Your trusted partner for maritime and offshore solutions.',

        'Quick Links',
        'Home',
        'Dashboard',
        'Profile',
        'Support',

        'Resources',
        'Privacy Policy',
        'Terms & Conditions',
        'Documentation',
        'Help Center',

        'Contact Us',
        'India',
        '+91 0000000000',
        'info@example.com',
        'www.example.com',

        'Certifications',
        'ISO Certified',
        'Internationally certified maritime services.',
        'Quality Certified',
        'Committed to quality and professional standards.',

        '© 2026 Global Maritime. All rights reserved.',
        'Privacy Policy',
        'Terms & Conditions'
    )
    ON DUPLICATE KEY UPDATE id = id
`);

console.log("Default Footer Ready");

export default db;