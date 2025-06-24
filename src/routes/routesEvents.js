import express from 'express'
import multer from 'multer'
import multerConfig from '../config/multer.js'
import { createEvents, getAllEvents, deleteEvent } from '../controllers/eventsController.js'

const router = express.Router()

const upload = multer(multerConfig)

router.post('/novoEvento', upload.single('imagem'), createEvents)
router.get('/todos', getAllEvents)
router.delete('/deletar/:id', deleteEvent)

export default router