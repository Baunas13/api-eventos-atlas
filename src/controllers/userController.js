import User from '../models/User.js'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const validGenders = ['Masculino', 'Feminino', 'Outros', 'Prefiro não dizer'];

    if (req.body.gender && !validGenders.includes(req.body.gender)) {
        return res.status(400).json({ error: 'Gênero inválido. Opções válidas: Masculino, Feminino, Outros ou Prefiro não dizer.' });
    }

    if (!req.body.cpf && !req.body.cnpj) {
        return res.status(400).json({ error: 'É necessário informar pelo menos o CPF ou o CNPJ.' });
    }


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