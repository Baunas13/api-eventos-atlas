import express from 'express'
import { createUser, getAllUsers, deleteUser } from './controllers/userController.js'
import { createEvents, getAllEvents, deleteEvent } from './controllers/eventsController.js'

const router = express.Router()

router.post('/cadastro', createUser)
router.get('/todos', getAllUsers)
router.delete('/deletar/:id', deleteUser)

router.post('/novoEvento', createEvents)
router.get('/todos', getAllEvents)
router.delete('/delete/:id', deleteEvent)

export default router