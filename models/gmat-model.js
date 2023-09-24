const pool = require("../mySQL-DB");

const GMATModel = {
  getAll: async () => {
    const connection = await pool.getConnection();

    try {
      // Set the connection character encoding to utf8mb4
      await connection.query("SET NAMES utf8mb4");

      const query = `SELECT * FROM all_questions `;

      // Set the result character encoding to utf8mb4
      const [rows] = await connection.query(query, { encoding: "utf8mb4" });

      return rows;
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
  getFinalMark: async (getFinalMark) => {
    const connection = await pool.getConnection();

    try {
      const query = `SELECT \`${getFinalMark.verbal_score}\` from final_marking where id ='${getFinalMark.quant_score}'`;

      const [rows] = await connection.query(query);

      return rows;
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
};

module.exports = GMATModel;
