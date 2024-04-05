const pool = require("../mySQL-DB");

const Users = {
  getUserActivity: async (id) => {
    const connection = await pool.getConnection();

    try {
      const query = `SELECT u.user_id , u.section_order, u.category, u.practice_exam , u.status, u.score_card_id FROM gmat_user_activity as u
      LEFT JOIN 
      gmat_score_card AS s ON s.score_card_id = u.score_card_id
       where u.user_id = ${id}`;

      // Set the result character encoding to utf8mb4
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
  saveUserActivity: async (id, data, scoreCardId) => {
    const connection = await pool.getConnection();

    try {
      const query = `INSERT INTO gmat_user_activity (user_id,section_order,current_section,q_no,category,total_time_spent,section_time,score_card_id,practice_exam,status)
      VALUES(?,?,?,?,?,?,?,?,?,?)`;

      // Set the result character encoding to utf8mb4
      const [rows] = await connection.query(query, [
        id,
        data.section_order,
        data.section,
        data.question_no,
        data.category,
        "",
        data.section_time,
        scoreCardId,
        data.practice_exam,
        data.status,
      ]);

      return rows;
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
  updateUserActivity: async (id, data, scoreCardId) => {
    const connection = await pool.getConnection();

    try {
      const query = `UPDATE gmat_user_activity
      SET current_section = '${data.section}',
      q_no = '${data.question_no}',
      section_time = '${data.section_time}'
      WHERE score_card_id = '${scoreCardId}' ;`;
      // Set the result character encoding to utf8mb4
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
  updateUserActivityStatus: async (scoreCardId) => {
    const connection = await pool.getConnection();

    try {
      const query = `UPDATE gmat_user_activity
      SET status = 'Completed'
      WHERE score_card_id = '${scoreCardId}' ;`;
      // Set the result character encoding to utf8mb4
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
  getByScoreCardId: async (id) => {
    const connection = await pool.getConnection();

    try {
      const query = `SELECT count(*) as count FROM gmat_user_activity where score_card_id = '${id}'`;

      // Set the result character encoding to utf8mb4
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
  saveScoreCard: async (id, data, scoreCardId) => {
    const connection = await pool.getConnection();

    try {
      const query = `INSERT INTO gmat_score_card (score_card_id, user_id, total_score, qa_scaled_score, qa_questions_correct, qa_questions_incorrect, qa_time_spent, verbal_scaled_score, verbal_questions_correct, verbal_questions_incorrect, verbal_time_spent, ir_scaled_score, ir_questions_correct, ir_questions_incorrect, ir_time_spent, exam_category, practice_exam, attempt_date)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())`;

      // Set the result character encoding to utf8mb4
      const [rows] = await connection.query(query, [
        scoreCardId,
        id,
        data.total_score || "",
        data.qa_scaled_score || "",
        data.qa_questions_correct || "",
        data.qa_questions_incorrect || "",
        data.qa_time_spent || "",
        data.verbal_scaled_score || "",
        data.verbal_questions_correct || "",
        data.verbal_questions_incorrect || "",
        data.verbal_time_spent || "",
        data.ir_scaled_score || "",
        data.ir_questions_correct || "",
        data.ir_questions_incorrect || "",
        data.ir_time_spent || "",
        data.category,
        data.practice_exam,
      ]);

      return rows;
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
  updateScoreCard: async (id, data, scoreCardId) => {
    const connection = await pool.getConnection();

    try {
      let query = `UPDATE gmat_score_card SET`;

      if (data.total_score) {
        query += ` total_score = '${data.total_score}',`;
      }

      if (data.qa_scaled_score) {
        query += ` qa_scaled_score = '${data.qa_scaled_score}',`;
      }

      if (data.qa_questions_correct) {
        query += ` qa_questions_correct = '${data.qa_questions_correct}',`;
      }

      if (data.qa_questions_incorrect) {
        query += ` qa_questions_incorrect = '${data.qa_questions_incorrect}',`;
      }

      if (data.qa_time_spent) {
        query += ` qa_time_spent = '${data.qa_time_spent}',`;
      }

      if (data.verbal_scaled_score) {
        query += ` verbal_scaled_score = '${data.verbal_scaled_score}',`;
      }

      if (data.verbal_questions_correct) {
        query += ` verbal_questions_correct = '${data.verbal_questions_correct}',`;
      }

      if (data.verbal_questions_incorrect) {
        query += ` verbal_questions_incorrect = '${data.verbal_questions_incorrect}',`;
      }

      if (data.verbal_time_spent) {
        query += ` verbal_time_spent = '${data.verbal_time_spent}',`;
      }

      if (data.ir_scaled_score) {
        query += ` ir_scaled_score = '${data.ir_scaled_score}',`;
      }

      if (data.ir_questions_correct) {
        query += ` ir_questions_correct = '${data.ir_questions_correct}',`;
      }

      if (data.ir_questions_incorrect) {
        query += ` ir_questions_incorrect = '${data.ir_questions_incorrect}',`;
      }

      if (data.ir_time_spent) {
        query += ` ir_time_spent = '${data.ir_time_spent}',`;
      }

      // Remove the trailing comma if any
      query = query.replace(/,\s*$/, "");

      query += ` WHERE score_card_id = '${scoreCardId}';`;

      // Set the result character encoding to utf8mb4
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

module.exports = Users;
