import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFromCart,
  decreaseCartStock,
  increaseCartStock,
  removeFromCart,
} from "../features/cart/cartSlice";
import { decreaseProductStock, increaseProductStock } from "../features/product/productSlice";

const Cart = () => {
  const products = useSelector((state) => state.products.data);
  console.log(products, "products-cartPage");
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cartProducts, "cart products");

  const handleClearCart = () => {
    confirm("Are you sure you want to clear the cart?");
    dispatch(clearFromCart());
  };

  const handleIncreaseCart = (p) => {
    debugger;
    console.log(products, "products-handlweIncreaseCart");
      const foundProduct = products.data.find(product => product.id === p.id);

    if (!foundProduct) {
    alert("Product not found");
    return;
  }

  if (foundProduct.stock === 0) {
    alert("Out of stock");
    return;
  }
    dispatch(increaseCartStock(p));
    dispatch(decreaseProductStock(p));
    
  };
  const handleDecreaseCart = (p) => {
    dispatch(decreaseCartStock(p));
    dispatch(increaseProductStock(p));
  };

  const productCards = cartProducts.map((p) => (
    <Col md={3} key={p.id}>
      <Card
        style={{
          margin: "10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <Card.Img
          variant="top"
          fluid
          src={p.images}
          style={{ margin: "auto" }}
        />
        <Card.Body>
          <Card.Title>{p.title}</Card.Title>
          <Card.Text>{p.price}</Card.Text>
          <Card.Text>
            <button
              className="btn btn-info"
              onClick={() => handleDecreaseCart(p)}
            >
              -
            </button>{" "}
            {p.stock}{" "}
            <button
              className="btn btn-info"
              onClick={() => handleIncreaseCart(p)}
            >
              +
            </button>
          </Card.Text>
          <div className="buttons">
            <Button
              className="ms-auto"
              variant="danger"
              onClick={() => dispatch(removeFromCart(p))}
            >
              Remove
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <div>
      <h1>Cart</h1>
      <div className="d-flex">
        <button
          onClick={() => handleClearCart()}
          className="btn btn-danger w-25 ms-auto"
        >
          Clear Cart
        </button>
      </div>

      <Row>{productCards}</Row>
    </div>
  );
};

export default Cart;
