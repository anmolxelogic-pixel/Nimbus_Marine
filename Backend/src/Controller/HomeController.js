import db from "../db/sqldb.js";


const getHomeContent = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM HOMETEXT LIMIT 1"
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Homepage content not found",
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });

  } catch (error) {
    console.error("Get home content error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateHomeContent = async (req, res) => {
  try {

    const {
      heading,
      subtitle,
      primaryButton,
      secondaryButton,
      experienceNumber,
      experienceText,
      isoNumber,
      isoText,
      countriesNumber,
      countriesText,
    } = req.body;


    const [rows] = await db.execute(
      "SELECT id FROM HOMETEXT LIMIT 1"
    );


    if (rows.length === 0) {

      const [result] = await db.execute(
        `INSERT INTO HOMETEXT
        (
          heading,
          subtitle,
          primaryButton,
          secondaryButton,
          experienceNumber,
          experienceText,
          isoNumber,
          isoText,
          countriesNumber,
          countriesText
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          heading,
          subtitle,
          primaryButton,
          secondaryButton,
          experienceNumber,
          experienceText,
          isoNumber,
          isoText,
          countriesNumber,
          countriesText,
        ]
      );


      const [newData] = await db.execute(
        "SELECT * FROM HOMETEXT WHERE id = ?",
        [result.insertId]
      );


      return res.status(201).json({
        success: true,
        message: "Homepage content created successfully",
        data: newData[0],
      });
    }


    const id = rows[0].id;


    await db.execute(
      `UPDATE HOMETEXT
       SET
         heading = ?,
         subtitle = ?,
         primaryButton = ?,
         secondaryButton = ?,
         experienceNumber = ?,
         experienceText = ?,
         isoNumber = ?,
         isoText = ?,
         countriesNumber = ?,
         countriesText = ?
       WHERE id = ?`,
      [
        heading,
        subtitle,
        primaryButton,
        secondaryButton,
        experienceNumber,
        experienceText,
        isoNumber,
        isoText,
        countriesNumber,
        countriesText,
        id,
      ]
    );


    const [updatedData] = await db.execute(
      "SELECT * FROM HOMETEXT WHERE id = ?",
      [id]
    );


    res.status(200).json({
      success: true,
      message: "Homepage content updated successfully",
      data: updatedData[0],
    });

  } catch (error) {

    console.error("Update home content error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export {getHomeContent,updateHomeContent,};