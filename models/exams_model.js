const pool = require("../mySQL-DB");

const ExamModel = {
  getUserExamData: async (getUserExamData) => {
    const connection = await pool.getConnection();

    let exam_table = "";

    if (getUserExamData.practice_exam === "1") {
      exam_table = "practice_exam_1";
    } else if (getUserExamData.practice_exam === "2") {
      exam_table = "practice_exam_2";
    } else {
      exam_table = "practice_exam_3";
    }

    try {
      // Set the connection character encoding to utf8mb4
      await connection.query("SET NAMES utf8mb4");

      const query = `SELECT * FROM ${exam_table} where user_id=${getUserExamData.id} `;

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
  storeExamData: async (storeExamData) => {
    const connection = await pool.getConnection();
    let exam_table = "";

    if (storeExamData.practice_exam === "1") {
      exam_table = "practice_exam_1";
    } else if (storeExamData.practice_exam === "2") {
      exam_table = "practice_exam_2";
    } else {
      exam_table = "practice_exam_3";
    }

    try {
      const query = `
      INSERT INTO ${exam_table} (
         user_id,
         total_score,
         percentile_rank, 
        time_spent ,
        questions_correct,
        quantitative_reasoning_scaled_score,
        quantitative_reasoning_questions_correct, 
        quantitative_reasoning_questions_incorrect, 
        quantitative_reasoning_time_spent, 
        verbal_reasoning_scaled_score, 
        verbal_reasoning_questions_correct, 
        verbal_reasoning_questions_incorrect, 
        verbal_reasoning_time_spent, 
        integrated_reasoning_scaled_score, 
        integrated_reasoning_questions_correct, 
        integrated_reasoning_questions_incorrect, 
        integrated_reasoning_time_spent, 
        attempt_date )


      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, NOW())
    `;

      const [rows] = await connection.query(query, [
        storeExamData.user_id,
        storeExamData.total_score,
        storeExamData.percentile_rank,
        storeExamData.time_spent,
        storeExamData.questions_correct,

        storeExamData.quantitative_reasoning_scaled_score,
        storeExamData.quantitative_reasoning_questions_correct,
        storeExamData.quantitative_reasoning_questions_incorrect,
        storeExamData.quantitative_reasoning_time_spent,

        storeExamData.verbal_reasoning_scaled_score,
        storeExamData.verbal_reasoning_questions_correct,
        storeExamData.verbal_reasoning_questions_incorrect,
        storeExamData.verbal_reasoning_time_spent,

        storeExamData.integrated_reasoning_scaled_score,
        storeExamData.integrated_reasoning_questions_correct,
        storeExamData.integrated_reasoning_questions_incorrect,
        storeExamData.integrated_reasoning_time_spent,
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
};

module.exports = ExamModel;
