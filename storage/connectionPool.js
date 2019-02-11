const mysql = require('promise-mysql');
const config = require('./config.js');

let pool;

module.exports = {
	getPool: () => {
		if (pool) {
			return pool;
		} else {
			pool = mysql.createPool(config.mysql);
			return pool;
		}
	}
}
