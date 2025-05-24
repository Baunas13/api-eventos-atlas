import express from 'express'
import { createEvents, getAllEvents, deleteEvent } from '../controllers/eventsController.js'

const router = express.Router()

router.post('/novoEvento', createEvents)
router.get('/todos', getAllEvents)
router.delete('/deletar/:id', deleteEvent)

export default router