require('dotenv').config()

const options = {
	port: 5432
};

if (process.env.DATABASE_URL) {
	const { parse } = require("pg-connection-string");
	const  { host, database, user, password } = parse(process.env.DATABASE_URL);

	options.host = host;
	options.database = database;
	options.username = user;
	options.password = password;
}

module.exports = options;