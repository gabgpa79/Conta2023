import { Router } from 'express'
import { c_data, c_mostrar, c_update, c_registrar, c_borrar, c_aprobar } from '../controllers/comprobanteController.js';

const router = Router();

router.post('/data/list',c_data)
router.get('/item/:id/:tipo',c_mostrar)
router.put('/:id/:tipo',c_update)
router.post('/:tipo',c_registrar)
router.post('/delete/item/list',c_borrar)
router.put('/aprobar/item/:id',c_aprobar)

export default router;