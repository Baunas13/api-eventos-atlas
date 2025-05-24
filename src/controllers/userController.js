import User from '../models/User.js'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const validGenders = ['Masculino', 'Feminino', 'Outros'];

    if (!validGenders.includes(req.body.gender)) {
        return res.status(400).json({ error: 'Gênero inválido. Opções válidas: Masculino, Feminino ou Outros.' });
    }

    // const { cpf, cnpj } = req.body;

    // if ((cpf && cnpj) || (!cpf && !cnpj)) {
    //     return res.status(400).json({ error: 'Você deve preencher apenas CPF ou CNPJ, não ambos ou nenhum.' });
    // }

    try {
        const userToCreate = {
            id: crypto.randomUUID(),
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: hashedPassword,
            cpf: req.body.cpf,
            cnpj: req.body.cnpj,
            gender: req.body.gender,
            phone: req.body.phone
        }

        const user = await User.create(userToCreate)

        res.status(201).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
}


export const getAllUsers = async (req, res) => {

    const user = await User.findAll()
    res.status(200).json(user)
}

export const deleteUser = async (req, res) => {

    const user = await User.destroy({
        where: { id: req.params.id }
    })
    res.status(200).json(user)
}