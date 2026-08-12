import db from "../db/sqldb.js";


const getNavbar = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT
                id,
                logo,
                home_text,
                about_text,
                locations_text,
                contact_text,
                career_text,
                services_text,
                sector_text,
                updated_at
            FROM navbar
            WHERE id = 1
        `);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Navbar data not found",
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {
        console.error("Get Navbar Error:", error);

        res.status(500).json({
            message: "Failed to fetch navbar",
            error: error.message,
        });
    }
};

const updateNavbar = async (req, res) => {
    try {
        const {
            home_text,
            about_text,
            locations_text,
            contact_text,
            career_text,
            services_text,
            sector_text,
        } = req.body;

        // Multer gives uploaded file here
        const logo = req.file
            ? `/uploads/${req.file.filename}`
            : null;


        
        if (logo) {

            await db.execute(
                `
                UPDATE navbar
                SET
                    logo = ?,
                    home_text = ?,
                    about_text = ?,
                    locations_text = ?,
                    contact_text = ?,
                    career_text = ?,
                    services_text = ?,
                    sector_text = ?
                WHERE id = 1
                `,
                [
                    logo,
                    home_text,
                    about_text,
                    locations_text,
                    contact_text,
                    career_text,
                    services_text,
                    sector_text,
                ]
            );

        } else {

           

            await db.execute(
                `
                UPDATE navbar
                SET
                    home_text = ?,
                    about_text = ?,
                    locations_text = ?,
                    contact_text = ?,
                    career_text = ?,
                    services_text = ?,
                    sector_text = ?
                WHERE id = 1
                `,
                [
                    home_text,
                    about_text,
                    locations_text,
                    contact_text,
                    career_text,
                    services_text,
                    sector_text,
                ]
            );
        }


        res.status(200).json({
            message: "Navbar updated successfully",
        });

    } catch (error) {

        console.error("Update Navbar Error:", error);

        res.status(500).json({
            message: "Failed to update navbar",
            error: error.message,
        });
    }
};


export {getNavbar,updateNavbar};