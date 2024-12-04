import React from "react";
import { addItem } from "./CartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = (props) => {
  const { name, image, description, cost } = props || {};
  const isAdded = useSelector(
    (store) => store.cart.items?.findIndex((item) => item.name === name) >= 0
  );
  const dispatch = useDispatch()

  const handClick = () => {
    dispatch(addItem(props))
  }

  const propsToPass = isAdded ? {} : { onClick : handClick}

  return (
    <div className="product-card">
      <div className="product-title">{name}</div>
      <img alt={name} src={image} className="product-image" />
      <div>{description}</div>
      <div className="product-price">{cost}</div>
      <button
        {...propsToPass}
        className={`product-button ${isAdded ? "added-to-cart" : ""}`}
      >{isAdded ? 'Added to cart' : 'Add to cart'}</button>
    </div>
  );
};

export default ProductCard;
