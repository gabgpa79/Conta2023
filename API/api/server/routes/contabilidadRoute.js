import { Router } from 'express'
import { c_saldo, c_diarios, c_mayores, c_saldos  } from '../controllers/comprobanteController';

const router = Router();
router.post('/saldo',c_saldo)
router.post('/diarios',c_diarios)
router.post('/mayores',c_mayores)
router.post('/saldos',c_saldos)
export default router;
