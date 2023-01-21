require('dotenv').config()

const options = {};

if (process.env.CONNECTION_STRING) {
	const { parse } = require("pg-connection-string");
	const  { host, database, port, user, password } = parse(process.env.CONNECTION_STRING);

	options.host = host;
	options.database = database;
	options.username = user;
	options.password = password;
	options.port = port;
}

module.exports = options;