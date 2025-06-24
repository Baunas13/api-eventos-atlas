import express from 'express'
import { createUser, getAllUsers, deleteUser, loginUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/cadastro', createUser)
router.post('/login', loginUser)
router.get('/todos', getAllUsers)
router.delete('/deletar/:id', deleteUser)

export default router