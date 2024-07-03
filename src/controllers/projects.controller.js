const connection = require("../config/config");
require("dotenv").config();

// Get list of projects
const getProjects = async (req, res) => {
  const sql = "SELECT * FROM Project";
  try {
    const [results, fields] = await connection.query({
      sql,
    });
    console.log(results)
    res.json({ data: results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProjects };
