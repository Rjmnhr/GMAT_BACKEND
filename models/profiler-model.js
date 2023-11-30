const pool = require("../mySQL-DB");

const ProfilerModel = {
  getIndividualValues: async (getIndividualValues) => {
    const connection = await pool.getConnection();

    const value = getIndividualValues.score;

    try {
      const query = `SELECT * FROM Chances_of_selection_individual WHERE score <= ? ORDER BY score DESC LIMIT 1`;

      // Set the result character encoding to utf8mb4
      const [rows] = await connection.query(query, [value]);

      return rows;
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
  getTotalValues: async (getTotalValues) => {
    const connection = await pool.getConnection();

    const value = getTotalValues.total;

    try {
      const query = `SELECT * FROM Chances_of_selection_total WHERE score <= ? ORDER BY score DESC LIMIT 1`;

      // Set the result character encoding to utf8mb4
      const [rows] = await connection.query(query, [value]);

      return rows;
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
  getCollegeInformation: async (getCollegeInformation) => {
    const connection = await pool.getConnection();

    const { safe, achievable, stretch } = getCollegeInformation;

    try {
      // Query for Safe
      const safeQuery = `SELECT * FROM college_information WHERE category = ?`;
      const [safeRows] = await connection.query(safeQuery, [safe]);

      // Query for Achievable
      const achievableQuery = `SELECT * FROM college_information WHERE category = ?`;
      const [achievableRows] = await connection.query(achievableQuery, [
        achievable,
      ]);

      // Query for Stretch
      const stretchQuery = `SELECT * FROM college_information WHERE category = ?`;
      const [stretchRows] = await connection.query(stretchQuery, [stretch]);

      // Return an object with the three result sets
      return {
        safe: safeRows,
        achievable: achievableRows,
        stretch: stretchRows,
      };
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
};

module.exports = ProfilerModel;
