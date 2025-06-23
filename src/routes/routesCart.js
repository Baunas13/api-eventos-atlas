import express from 'express'
import { addItem, criarCart, deletarCart, getCart, removerItem } from '../controllers/CartController.js'


const router = express.Router()

router.post('/cart', criarCart)
router.post('/cart/:cartId/item', addItem)
router.get('/cart/:cartId', getCart)
router.delete('/cart/:cartId/item/:itemId', removerItem)
router.delete('/cart/:cartId', deletarCart)

export default router
