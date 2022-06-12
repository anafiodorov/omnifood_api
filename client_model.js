const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'omnifood_adm',
  host: 'localhost',
  database: 'omnifood',
  password: 'ugix',
  port: 5432,
});

const getClients = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM clients ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};
const createClient = (body) => {
  return new Promise(function (resolve, reject) {
    const { entredFullName, entredEmail, entredOption } = body;
    console.log(body);
    pool.query(
      'INSERT INTO clients (fullname, email, optionclient) VALUES ($1, $2, $3) RETURNING *',
      [entredFullName, entredEmail, entredOption],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results) {
          resolve(`A new client has been added added: ${results.rows[0]}`);
        }
      }
    );
  });
};
const deleteClient = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id);
    pool.query(
      'DELETE FROM merchants WHERE id = $1',
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Merchant deleted with ID: ${id}`);
      }
    );
  });
};

module.exports = {
  getClients,
  createClient,
  deleteClient,
};
