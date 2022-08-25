const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123', 
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const query = `SELECT * FROM users WHERE email=$1;`
  const args = [email];
  return pool.query(query, args)
    .then(response => {
      return response.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const query = `SELECT * FROM users WHERE id=$1;`
  const args = [id];
  return pool.query(query, args)
    .then(response => {
      return response.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const query = `INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *`
  const args = [user.name, user.email, user.password];
  return pool.query(query, args)
    .then(response => {
      return response.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    })
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const query = `
  SELECT properties.*
  FROM users 
    JOIN reservations ON users.id=reservations.guest_id
    JOIN properties ON reservations.property_id = properties.id
  WHERE users.id = $1
  LIMIT $2
  `;
  const args = [guest_id, limit];
  return pool.query(query, args)
  .then(response => {
    return response.rows;
  })
  .catch(err => {
    console.log(err.message);
  })
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const args = [];
  let query = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_reviews.property_id
  `;
  if (options.city){
    args.push(`%${options.city}%`);
    query += `WHERE properties.city LIKE $${args.length}`;
  }
  if (options.owner_id){
    args.push(`${options.owner_id}`);
    query += ` AND properties.owner_id=$${args.length}`;
  }
  if (options.minimum_price_per_night){
    args.push(`${options.minimum_price_per_night*100}`);
    query += ` AND properties.cost_per_night >= $${args.length}`;
  }
  if (options.maximum_price_per_night){
    args.push(`${options.maximum_price_per_night*100}`);
    query += ` AND properties.cost_per_night <= $${args.length}`;
  }

  query += ` GROUP BY properties.id`

  if (options.minimum_rating){
    args.push(`${options.minimum_rating}`);
    query += ` HAVING AVG(property_reviews.rating) >= $${args.length}`;
  }
  args.push(limit);
  query += `
  ORDER BY properties.cost_per_night
  LIMIT $${args.length};
  `
  return pool.query(query, args)
    .then(response => {
      return response.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let query = `
  INSERT INTO properties (
    owner_id, 
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    street, 
    country,
    city,
    province,
    post_code
  )
  VALUES (
  `;
  const args = [
    property.owner_id, 
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night*100,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.street, 
    property.country,
    property.city,
    property.province,
    property.post_code
  ];
  for (let i = 0; i < args.length; i++){
    if (i === args.length - 1){
      query += ` $${i+1}) RETURNING *`;
      continue;
    }
    query += ` $${i+1},`;
  }
  return pool.query(query, args)
    .then(response => {
      return response.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    })
}
exports.addProperty = addProperty;
