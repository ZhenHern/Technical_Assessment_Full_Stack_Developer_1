import { query } from "../db";

export const getAllItems = async () => {
    try {
        const sqlQuery = `
            SELECT * FROM ITEMS
        `;
        const results = await query(sqlQuery); 
        return results;
    } 
    catch (error) {
        throw error;
    }
}

export const getItemById = async (itemId: number) => {
    try {
        const sqlQuery = `
            SELECT * FROM ITEMS
            WHERE ID = ?`
        ;
        const results = await query(sqlQuery, [itemId]); 
        return results;
    } catch (error) {
        
    }
}

export const createItem = async (itemData: { name: String, description: String, price: number}) => {
    try {
        const sqlQuery = `
            INSERT INTO ITEMS (NAME, DESCRIPTION, PRICE)
            VALUES (?, ?, ?);
        `;
        const {name, description, price} = itemData;
        const result = await query(sqlQuery, [name, description, price]);
        return result;
    } catch (error) {
        throw error;
    }
}

export const updateItemById = async (itemData: { name: String, description: String, price: number}, itemId: number) => {
    try {
        const sqlQuery = `
            UPDATE items
            SET NAME = ?, DESCRIPTION = ?, PRICE = ?
            WHERE ID = ?;
        `;
        const {name, description, price} = itemData;
        const result = await query<{ affectedRows: number}>(sqlQuery, [name, description, price, itemId]);
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteItemById = async (itemId: number) => {
    try {
        const sqlQuery = `
            DELETE FROM items
            WHERE ID = ?;
        `;
        const result = await query<{ affectedRows: number}>(sqlQuery, [itemId]);
        return result;
    } catch (error) {
        throw error;
    }
}