const pool = require("../mySQL-DB");

const GMATModel = {
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
