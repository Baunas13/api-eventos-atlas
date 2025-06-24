import express from 'express'
import { upload } from '../middlewares/upload.js';
import { createEvents, getAllEvents, deleteEvent } from '../controllers/eventsController.js'

const router = express.Router()

router.post('/novoEvento', upload.single('imagem'), createEvents)
router.get('/todos', getAllEvents)
router.delete('/deletar/:id', deleteEvent)

export default router