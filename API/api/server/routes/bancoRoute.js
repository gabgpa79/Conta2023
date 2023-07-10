import { Router } from 'express'
import { b_mostrar, b_registrar, b_items, b_borrar, b_actualizar, b_data  } from '../controllers/bancoController';

const router = Router();

router.post('/data/list',b_data)
router.get('/item/:id/:tipo',b_mostrar)
router.post('/:tipo',b_registrar)
router.put('/:id/:tipo',b_actualizar)
router.post('/delete/item/list',b_borrar)
router.get('/listas/items',b_items)
export default router;
