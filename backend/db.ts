var mysql = require("mysql2");

export const pool  = mysql.createPool({
    connectionLimit: 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'password',
    database        : 'my_db'
});

const query = async <T = any>(sql: string, params: any[] = []): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        pool.query(sql, params, (error: any, results: T) => {
            if (error) {
                console.error('Error executing query:', error);
                return reject(error);
            }
            resolve(results);
        });
    });
  };

export const initializeTable = async () => {
    const createItemTableSQL = `
        CREATE TABLE IF NOT EXISTS items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description VARCHAR(500),
            price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    `

    try {
        await pool.query(createItemTableSQL)
        console.log('Items table created or already existed');
    } catch (error) {
        console.log()
    }
}

export { query };