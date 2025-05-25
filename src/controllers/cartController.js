import Cart from '../models/Cart.js'
import CartItem from '../models/CartItem.js'
import Events from '../models/Events.js'

export const criarCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body)
    return res.status(201).json(cart)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const addItem = async (req, res) => {
  try {
    const { cartId } = req.params
    const { eventId, quantity } = req.body

    const event = await Events.findByPk(eventId)
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }
    const price = event.precificacao * quantity
    const item = await CartItem.create({ cartId, eventId, quantity, price })

    const cart = await Cart.findByPk(cartId)
    cart.total = parseFloat(cart.total) + price
    await cart.save()

    return res.status(201).json(item)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getCart = async (req, res) => {
  try {
    const { cartId } = req.params

    const cart = await Cart.findByPk(cartId, {
      include: [{ model: CartItem, as: 'items' }]
    })

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' })
    }

    return res.json(cart)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const removerItem = async (req, res) => {
  try {
    const { cartId, itemId } = req.params

    const item = await CartItem.findOne({ where: { id: itemId, cartId } })
    if (!item) {
      return res.status(404).json({ error: 'Item not found' })
    }

    const cart = await Cart.findByPk(cartId)
    cart.total = parseFloat(cart.total) - parseFloat(item.price)
    await cart.save()

    await item.destroy()

    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const deletarCart = async (req, res) => {
  try {
    const { cartId } = req.params
    await CartItem.destroy({ where: { cartId } })
    await Cart.destroy({ where: { id: cartId } })
    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export default {
  criarCart,
  addItem,
  getCart,
  removerItem,
  deletarCart
}
