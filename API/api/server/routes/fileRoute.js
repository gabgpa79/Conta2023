import { Router } from 'express'
import { e_file } from '../controllers/fileController'

const router = Router()
router.put('/empresa/item/:id',e_file)
export default router;