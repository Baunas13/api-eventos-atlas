import User from '../models/User.js'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

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
            state: req.body.state,
            city: req.body.city,
            address: req.body.address,
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

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const token = console.log('JWT_SECRET:', process.env.JWT_SECRET);

        jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        const { password: _, ...userWithoutPassword } = user.toJSON();

        return res.status(200).json({
            message: 'Login bem-sucedido!',
            user: userWithoutPassword,
            token,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};