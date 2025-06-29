import express from 'express';
import { upload } from '../middlewares/upload.js';
import { createEvents, getAllEvents, deleteEvent, updateEvent } from '../controllers/eventsController.js';

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', upload.single('imagem'), createEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;