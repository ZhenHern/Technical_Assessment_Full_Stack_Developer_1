import {Router} from "express";
import {getAllItemsController, getItemByIdController, createItemController, updateItemByIdController, deleteItemController} from "../controllers/item.controller";

const router = Router();

router.get('/', getAllItemsController)

router.get('/:id', getItemByIdController)

router.post('/', createItemController)

router.put('/:id', updateItemByIdController);

router.delete('/:id', deleteItemController);

export default router;