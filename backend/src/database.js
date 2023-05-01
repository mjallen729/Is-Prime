import mysql from 'mysql'
import dotenv from 'dotenv'

let db;
dotenv.config({ path: '../.env' });
let host = 'mysql-hu89';

export default class PrimeDB {
    static async create() {
        if (db) return;

        try {
            // Connect the MySQL database as root
            db = mysql.createPool({
                connectionLimit: 1,
                host: host,
                user: 'root',
                password: process.env.DBAUTH
            });

            db.getConnection((err, conn) => {
                if (err) throw err;

                let q = 'CREATE DATABASE IF NOT EXISTS primes;';
                conn.query(q, (err, res) => {
                    if (err) throw err;
                });

                q = 'USE primes;';
                conn.query(q, (err, res) => {
                    if (err) throw err;
                });

                // Create table for storing numbers
                // Max length for Number is same length as max unsigned long long int
                q = 'CREATE TABLE IF NOT EXISTS CheckedNumbers ';
                q += '(Number varchar(25) NOT NULL PRIMARY KEY, ';
                q += 'IsPrime varchar(8) NOT NULL, ';
                q += 'DateAdded date NOT NULL, ';
                q += 'User varchar(25) NOT NULL);';
                conn.query(q, (err, res) => {
                    if (err) throw err;
                });

                // Create main user
                q = `CREATE USER IF NOT EXISTS 'main'@'localhost' IDENTIFIED BY '${process.env.DBUSERAUTH}';`;
                conn.query(q, (err, res) => {
                    if (err) throw err;
                });

                //Assigning user perms
                q = `GRANT SELECT, INSERT ON primes.* TO 'main'@'localhost';`;
                conn.query(q, (err, res) => {
                    if (err) throw err;
                });

                q = `ALTER USER 'main'@'localhost' IDENTIFIED WITH mysql_native_password BY '${process.env.DBUSERAUTH}';`
                conn.query(q, (err, res) => {
                    if (err) throw err;
                });

                conn.query('flush privileges;', (err, res) => {
                    if (err) throw err;
                });

                console.log('DB connected');

            });

            db = mysql.createPool({
                connectionLimit: 10,
                host: host,
                user: 'main',
                password: process.env.DBUSERAUTH,
                database: 'primes'
            });

            console.log('Created MySQL...');

        } catch (e) {
            console.error(`Unable to create MySQL ${e}`);
        }

    }

    // Check database for entry corresponding to num
    // num: str
    // Returns [RowDataPacket Object (list)]
    static async checkForNum(num, callback) {
        console.log('DB: get conn...');
        db.getConnection((err, conn) => {
            if (err) throw err;

            console.log('DB: send query...');
            conn.query('USE primes;');

            let q = `SELECT * FROM CheckedNumbers WHERE Number = '${num}';`;
            
            conn.query(q, function (err, rows) {
                if (err) throw err;
                
                console.log(`DB: got len ${rows.length}`);
                callback(rows);
            });
        });
    }

    // Adds num to database if not exists
    // num: str
    // isPrime: str (true/false)
    // user: str
    static async addNum(num, isPrime, user) {
        db.getConnection((err, conn) => {
            if (err) throw err;

            const d = new Date();
            let month = ((d.getMonth() + 1).toString().length == 1) ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
            let day = (d.getDate().toString().length == 1) ? `0${d.getDate()}` : `${d.getDate()}`;
            let date = `${d.getFullYear()}-${month}-${day}`;

            let q = `INSERT INTO CheckedNumbers VALUES ('${num}', '${isPrime}', '${date}', '${user}');`;
            conn.query(q, (err, res) => {
                if (err && err.code == 'ER_DUP_ENTRY') {
                    console.log(`Add failed ${err}`);
                    return;

                }

                if (err) {
                    throw err;
                }

            });
        });
    }

}
