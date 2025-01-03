import {Router} from "express";
import {getAllItemsController, getItemByIdController, createItemController, updateItemByIdController, deleteItemController} from "../controllers/item.controller";
import validate from '../middlewares/validation';
import { itemSchema } from '../schemas/itemSchema';

const router = Router();

router.get('/', getAllItemsController)

router.get('/:id', getItemByIdController)

router.post('/', validate(itemSchema), createItemController)

router.put('/:id', validate(itemSchema), updateItemByIdController);

router.delete('/:id', deleteItemController);

export default router;