const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123', 
  host: 'localhost',
  database: 'lightbnb'
});
module.exports = {
  query: (text, params) => {
    return pool.query(text, params).then(response => {
      if (response.rows.length === 1){
        return response.rows[0];
      }
      return response.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
  },
}