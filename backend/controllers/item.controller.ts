import { Request, Response, NextFunction } from 'express';
import {getAllItems, getItemById, createItem, updateItemById, deleteItemById} from "../services/item.service";

export const getAllItemsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const items = await getAllItems();
        res.status(200).json(items);
        console.log("Done fetching all items");
    } catch (err) {
        next(err);
    }
}

export const getItemByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const item = await getItemById(parseInt(req.params.id));
        if (!item?.length) {
            res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
        console.log("Done fetching item with id: ", req.params.id);
    } catch (err) {
        next(err);
    }
}

export const createItemController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await createItem(req.body);
        res.status(201).json(result);
        console.log("Created a new record");
    } catch (err) {
        next(err);
    }
}

export const updateItemByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await updateItemById(req.body, parseInt(req.params.id));
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(result);
        console.log("Updated item with ID: ", req.params.id);
    } catch (err) {
        next(err);
    }
}

export const deleteItemController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const result = await deleteItemById(parseInt(req.params.id));
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(result);
        console.log("Deleted item with ID: ", req.params.id);
    } catch (err) {
        next(err);
    }
}