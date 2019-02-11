module.exports = {
  mysql: {
    host: '127.0.0.1',
    user: 'root',
    database: 'fxt',
    connectionLimit: 10,
    charset: 'utf8mb4',
    password: 'moon6212'
      // password: process.env.MYSQL_PASSWORD,
      // multipleStatements: true
  }
}

// CREATE TABLE `advisors` (
//   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
//   `name` varchar(100) DEFAULT NULL,
//   `address` varchar(42) NOT NULL DEFAULT '',
//   `amount` int(11) DEFAULT NULL,
//   `scheme` varchar(10) NOT NULL DEFAULT '',
//   `done` tinyint(1) NOT NULL DEFAULT '0',
//   `transfered_at` timestamp NULL DEFAULT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

// CREATE TABLE `bounty` (
//   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
//   `address` varchar(42) NOT NULL DEFAULT '',
//   `amount` int(11) DEFAULT NULL,
//   `done` tinyint(1) NOT NULL DEFAULT '0',
//   `transfered_at` timestamp NULL DEFAULT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;