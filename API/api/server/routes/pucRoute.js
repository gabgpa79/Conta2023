import { Router } from 'express'
import { p_items, p_data, p_registrar, p_actualizar, p_borrar  } from '../controllers/pucController';

const router = Router();

router.post('/listas/items',p_items)
router.post('/data/list',p_data)
router.post('/:tipo',p_registrar)
router.post('/delete/item/list',p_borrar)
router.put('/:id/:tipo',p_actualizar)
/*
router.put('/:id/:tipo',p_actualizar)
router.get('/item/:id/:tipo',c_mostrar)
*/


export default router;
