import express from 'express'
import { addItem, criarCart, deletarCart, getCart, removerItem } from '../controllers/CartController.js'

const router = express.Router()

router.post('/', criarCart)
router.post('/:cartId/item', addItem)
router.get('/:cartId', getCart)
router.delete('/:cartId/item/:itemId', removerItem)
router.delete('/:cartId', deletarCart)

export default router