import Events from "../models/Events.js";
import crypto from 'node:crypto'

export const createEvents = async (req, res) => {

    try {
        const eventsToCreate = {
            id: crypto.randomUUID(),
            nomeEvento: req.body.nomeEvento,
            descricao: req.body.descricao,
            data: req.body.data,
            local: req.body.local,
            nicho: req.body.nicho,
            precificacao: req.body.precificacao,
            limiteInscricoes: req.body.limiteInscricoes,
        }

        const events = await Events.create(eventsToCreate)

        res.status(201).json(events)

    } catch (err) {
        res.status(500).json(err)
    }
}

export const getAllEvents = async (req, res) => {

    const event = await Events.findAll()
    res.status(200).json(event)
}

export const deleteEvent = async (req, res) => {

    const event = await Events.destroy({
        where: { id: req.params.id }
    })
    res.status(200).json(event)
}
