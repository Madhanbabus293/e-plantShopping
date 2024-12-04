import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, resetCart, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  //total amount computation
  const totalAmout = useSelector((state) => {
    const items = state.cart.items;
    return items.reduce((acc, item) => {
      const itemAmount = item.basePrice * item.quantity;
      acc += itemAmount;
      return acc;
    }, 0);
  });

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleIncrement = (name) => {
    dispatch(updateQuantity({ name, isInc: true }));
  };

  const handleDecrement = (name) => {
    dispatch(updateQuantity({ name, isInc: false }));
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  const onCheckOut = (e) => {
    const value = confirm("please confirm your checkout");
    if (value) {
      dispatch(resetCart());
      onContinueShopping(e);
    }
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>Total Cart Amount: ${totalAmout}</h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item.name)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item.name)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${item.basePrice * item.quantity}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={onCheckOut}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
