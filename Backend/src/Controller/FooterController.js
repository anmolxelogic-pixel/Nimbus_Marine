import db from "../db/sqldb.js";

const getFooter = async (req, res) => {
    try {
        const [footer] = await db.execute(`
            SELECT
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
                terms_text,

                facebook_url,
                linkedin_url,
                twitter_url,

                updated_at

            FROM footer
            WHERE id = 1
        `);

        if (footer.length === 0) {
            return res.status(404).json({
                message: "Footer data not found"
            });
        }

        return res.status(200).json(footer[0]);

    } catch (error) {
        console.error("Get footer error:", error);

        return res.status(500).json({
            message: "Failed to fetch footer",
            error: error.message
        });
    }
};


const updateFooter = async (req, res) => {
    try {
        console.log("FOOTER BODY:", req.body);
        console.log("FOOTER FILE:", req.file);

        const {
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
            terms_text,
            facebook_url,
            linkedin_url,
            twitter_url
        } = req.body;

        let query;
        let values;

        if (req.file) {
            const logoPath = `/uploads/${req.file.filename}`;

            console.log("New logo path:", logoPath);

            query = `
                UPDATE footer
                SET
                    logo = ?,
                    company_name = ?,
                    company_tagline = ?,
                    company_description = ?,
                    quick_links_title = ?,
                    quick_home = ?,
                    quick_dashboard = ?,
                    quick_profile = ?,
                    quick_support = ?,
                    resources_title = ?,
                    resource_privacy = ?,
                    resource_terms = ?,
                    resource_documentation = ?,
                    resource_help = ?,
                    contact_title = ?,
                    contact_address = ?,
                    contact_phone = ?,
                    contact_email = ?,
                    contact_website = ?,
                    certification_title = ?,
                    certification_one_title = ?,
                    certification_one_description = ?,
                    certification_two_title = ?,
                    certification_two_description = ?,
                    copyright_text = ?,
                    privacy_text = ?,
                    terms_text = ?,
                    facebook_url = ?,
                    linkedin_url = ?,
                    twitter_url = ?
                WHERE id = 1
            `;

            values = [
                logoPath,
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
                terms_text,
                facebook_url,
                linkedin_url,
                twitter_url
            ];
        } else {
            console.log("No new logo uploaded. Keeping existing logo.");

            query = `
                UPDATE footer
                SET
                    company_name = ?,
                    company_tagline = ?,
                    company_description = ?,
                    quick_links_title = ?,
                    quick_home = ?,
                    quick_dashboard = ?,
                    quick_profile = ?,
                    quick_support = ?,
                    resources_title = ?,
                    resource_privacy = ?,
                    resource_terms = ?,
                    resource_documentation = ?,
                    resource_help = ?,
                    contact_title = ?,
                    contact_address = ?,
                    contact_phone = ?,
                    contact_email = ?,
                    contact_website = ?,
                    certification_title = ?,
                    certification_one_title = ?,
                    certification_one_description = ?,
                    certification_two_title = ?,
                    certification_two_description = ?,
                    copyright_text = ?,
                    privacy_text = ?,
                    terms_text = ?,
                    facebook_url = ?,
                    linkedin_url = ?,
                    twitter_url = ?
                WHERE id = 1
            `;

            values = [
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
                terms_text,
                facebook_url,
                linkedin_url,
                twitter_url
            ];
        }

        const [result] = await db.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Footer not found"
            });
        }

        res.status(200).json({
            message: "Footer updated successfully"
        });

    } catch (error) {
        console.error("Update footer error:", error);

        res.status(500).json({
            message: "Failed to update footer",
            error: error.message
        });
    }
};


export {
    getFooter,
    updateFooter
};