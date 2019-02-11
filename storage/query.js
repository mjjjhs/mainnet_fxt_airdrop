const connectionPool = require('./connectionPool.js');

const pool = connectionPool.getPool();

module.exports = {
	getBeneficiary: async (table) => {
		const conn = await pool.getConnection();

		const sql = `SELECT * from ${table}`;
		const rows = await conn.query(sql);
		conn.release(); // cf. await conn.release(); this is not working?

		return rows; // cf. return Promise.resolve(rows);
	},

	updateBeneficiaryState: async (table, addr, result) => {
		let conn;

		try {
			conn = await pool.getConnection();
      const optSql = (result == 1 ? `tx_result = 1, ` : ``);
			const sql = `UPDATE ${table} \
				SET ${optSql} transfered_at = now() \
				WHERE eth_addr = '${addr}'`;
			const rows = await conn.query(sql);
			conn.release(); // cf. await conn.release(); this is not working?

			return rows; // cf. return Promise.resolve(rows);
		} catch (e) {
			console.error(e);
			conn.release();

			return {};
		}
	},

  insertOne: async (tableName, value) => {
    console.log(tableName, value);
		let conn;

		try {
			conn = await pool.getConnection();

			const sql = `INSERT INTO ${tableName} SET ?`;

			const rows = await conn.query(sql, value);
			conn.release(); // cf. await conn.release(); this is not working?

			return rows; // cf. return Promise.resolve(rows);
		} catch (e) {
			console.error(e);
			conn.release();

			return {};
		}
  },

	end: async () => {
		await pool.end();

		return;
	}
}
