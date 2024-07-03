const connection = require("../config/config");

async function userNameGenerator(firstName, lastName) {
  let mail = firstName.substring(0, 1).toLowerCase() + lastName.toLowerCase();
  const sql = "SELECT username FROM Employee";

  try {
    const [check] = await connection.query(sql);
    let count = 1;
  
    const usernames = check.map(row => row.username);
  
    let mail = `${firstName.substring(0, 1).toLowerCase()}${lastName.toLowerCase().trim()}`;
  
    while (usernames.includes(mail)) {
      mail = `${firstName.substring(0, 1).toLowerCase()}${lastName.toLowerCase().trim()}${String(count)}`;
      count++;
    }
  
    return mail;
  
  } catch (error) {
    console.error("Error fetching usernames:", error);
    throw error;
  }
}

function passwordGenerator(firstName, lastName) {
  var d = new Date();
  var password =
    "@#" +
    firstName.substring(0, 2).toLowerCase() +
    "$#" +
    lastName.substring(0, 2).toLowerCase() +
    d.getHours() +
    "" +
    d.getMinutes();
    return password;
}

module.exports = { userNameGenerator, passwordGenerator };
