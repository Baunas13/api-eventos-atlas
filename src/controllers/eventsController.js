import Events from "../models/Events.js";
import Ingressos from "../models/Ingressos.js";
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
            cidade: req.body.cidade,
            estado: req.body.estado,
            imagem: req.file ? req.file.filename : null,
        }

        const events = await Events.create(eventsToCreate)

        if (req.body.ingressos && Array.isArray(req.body.ingressos)) {

            const ingressosToCreate = req.body.ingressos.map(ingresso => ({
                ...ingresso,
                id: String(crypto.randomUUID()),
                eventoId: String(events.id),
            }));

            await Ingressos.bulkCreate(ingressosToCreate);
        }

        const eventComIngressos = await Events.findByPk(events.id, {
            include: [{ model: Ingressos, as: 'ingressos' }]
        });

        res.status(201).json(eventComIngressos);

    } catch (err) {
        res.status(500).json(err);
    }
};


export const getAllEvents = async (req, res) => {

    const event = await Events.findAll({
        include: [{ model: Ingressos, as: 'ingressos' }]
    })
    res.status(200).json(event)
}

export const deleteEvent = async (req, res) => {

    const event = await Events.destroy({
        where: { id: req.params.id }
    })
    res.status(200).json(event)
}
