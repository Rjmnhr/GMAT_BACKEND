const pool = require("../mySQL-DB");
const CryptoJS = require("crypto-js");

const Users = {
  getUserDetails: async (id) => {
    const connection = await pool.getConnection();

    try {
      const query = `SELECT id , first_name, last_name, user_type, phone FROM users where id = ${id}`;

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
  createGoogleUser: async (createGoogleUser) => {
    const connection = await pool.getConnection();

    try {
      const password = "Google password";

      const query = `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES (?, ?, ?, ?)
    `;

      const [rows] = await connection.query(query, [
        createGoogleUser.first_name,
        createGoogleUser.last_name,
        createGoogleUser.email,
        password,
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
  createUser: async (createUser) => {
    const connection = await pool.getConnection();

    try {
      const password = CryptoJS.AES.encrypt(
        createUser.password,
        process.env.SECRET_KEY
      ).toString();
      const query = `
        INSERT INTO users (first_name, last_name, email, password, phone)
        VALUES (?, ?, ?, ?, ?)
      `;

      const [rows] = await connection.query(query, [
        createUser.first_name,
        createUser.last_name,
        createUser.email,
        password,
        createUser.phone,
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

  loginUser: async (loginUser) => {
    const connection = await pool.getConnection();
    try {
      let query = `SELECT * FROM users WHERE email = '${loginUser.email}'`;
      const [rows, fields] = await connection.query(query);
      return rows;
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
  resetPassword: async (resetPassword) => {
    const connection = await pool.getConnection();
    try {
      const password = CryptoJS.AES.encrypt(
        resetPassword.password,
        process.env.SECRET_KEY
      ).toString();
      let query = `UPDATE users SET password = "${password}" WHERE id = "${resetPassword.id}"`;
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
  changeEmail: async (changeEmail) => {
    const connection = await pool.getConnection();
    try {
      let query = `UPDATE users SET email ="${changeEmail.email}" WHERE id = "${changeEmail.id}"`;
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
