var mysql = require("mysql");

export const pool  = mysql.createPool({
    connectionLimit: 10,
    host            : 'localhost',
    user            : 'arkmind',
    password        : 'arkmind123',
    database        : 'my_db'
});

const query = async (sql: string, params: any[] = []) => {
    return new Promise<any[]>((resolve, reject) => {
        pool.query(sql, params, (error: any, results: any[] | PromiseLike<any[]>) => {
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