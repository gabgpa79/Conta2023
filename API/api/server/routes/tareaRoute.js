import { Router } from 'express'
import { t_data, t_registrar, t_actualizar  } from '../controllers/tareaController';

const router = Router();

router.post('/lista/items',t_data)
router.post('/:tipo',t_registrar)
router.put('/:id/:tipo',t_actualizar)
/*
router.post('/listas/items',c_items)*/

export default router;