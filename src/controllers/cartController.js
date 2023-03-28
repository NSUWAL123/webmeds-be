const Cart = require("../models/cartModal");

// 1. Returns all the cart of a particular user
const getCart = async (req, res) => {
  const userId = req.user.id

  const getCart = await Cart.find({
    userId: userId
  })
  res.json({ getCart })
};

const addCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const isProductInCart = await Cart.findOne({
    userId: req.user.id,
    productId: productId,
  });

  if (isProductInCart) {
    res.json({
      message: "This product has already been added to the cart.",
    });
    return;
  }

  //if the product by the user is not present in cart
  const response = await Cart.create({
    userId: req.user.id,
    productId: productId,
    quantity: quantity,
    isCheck: false
  });

  res.json({
    data: response,
    message: "Product added to Cart.",
  });
};


// 2. Edits the cart quantity
const editCart = async (req, res) => {
  const {cartId, quantity} = req.body;
  const updateQty = await Cart.findByIdAndUpdate(cartId, {
    quantity: quantity,
  });

  res.json({
    message: "Cart Updated Successfully."
  })
};

const toggleCheck = async (req, res) => {
  const {cartId, isCheck} = req.body;
  const updateCheck = await Cart.findByIdAndUpdate(cartId, {
    isCheck: isCheck,
  }); 
}

// 3. Removes an individual cart item
const removeCart = async (req, res) => {
  const removeCart = await Cart.findByIdAndDelete(req.params.id)

  res.json(removeCart)
};

// 4. Removes all cart items of a user
const removeAllCart = async (req, res) => {

};

module.exports = { getCart, addCart, editCart, removeAllCart, removeCart, toggleCheck };
