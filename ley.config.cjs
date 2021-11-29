require('dotenv').config()

const options = {
	port: 5432
};

if (process.env.CONNECTION_STRING) {
	const { parse } = require("pg-connection-string");
	const  { host, database, user, password } = parse(process.env.CONNECTION_STRING);

	options.host = host;
	options.database = database;
	options.username = user;
	options.password = password;
}

module.exports = options;