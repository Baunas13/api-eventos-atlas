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
            // precificacao: req.body.precificacao,
            // limiteInscricoes: req.body.limiteInscricoes,
            cidade: req.body.cidade,
            estado: req.body.estado,
            imagem: req.file ? req.file.filename : null,
        }

        const events = await Events.create(eventsToCreate)

        if (req.body.ingressos) {
            let ingressosArray;

            try {
                if (typeof req.body.ingressos === 'string') {
                    ingressosArray = JSON.parse(req.body.ingressos);
                } else {
                    ingressosArray = req.body.ingressos;
                }

                if (Array.isArray(ingressosArray)) {
                    const ingressosToCreate = ingressosArray.map(ingresso => ({
                        ...ingresso,
                        id: String(crypto.randomUUID()),
                        eventoId: String(events.id),
                    }));

                    await Ingressos.bulkCreate(ingressosToCreate);
                }
            } catch (e) {
                console.error("Erro ao parsear ingressos:", e);
            }
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
    try {
        const events = await Events.findAll({
            include: [{ model: Ingressos, as: 'ingressos' }]
        });
        res.status(200).json(events);
    } catch (err) {
        console.error("Erro ao listar eventos:", err);
        res.status(500).json({ error: "Falha ao listar eventos." });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const result = await Events.destroy({
            where: { id: req.params.id }
        });
        if (result === 0) {
            return res.status(404).json({ error: "Evento não encontrado para deletar." });
        }
        res.status(200).json({ message: "Evento deletado com sucesso." });
    } catch (err) {
        console.error("Erro ao deletar evento:", err);
        res.status(500).json({ error: "Falha ao deletar evento." });
    }
};

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Events.findByPk(id);
        if (!event) {
            return res.status(404).json({ error: 'Evento não encontrado.' });
        }

        const [updated] = await Events.update(req.body, {
            where: { id: id }
        });

        if (updated) {
            const updatedEvent = await Events.findByPk(id, { include: [{ model: Ingressos, as: 'ingressos' }] });
            return res.status(200).json(updatedEvent);
        }
        throw new Error('Nenhuma linha foi atualizada.');
    } catch (error) {
        console.error("Erro ao atualizar evento:", error);
        res.status(500).json({ error: error.message });
    }
};