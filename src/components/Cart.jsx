import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFromCart,
  decreaseCartStock,
  increaseCartStock,
  removeFromCart,
  setCartFromDb,
} from "../features/cart/cartSlice";
import { decreaseProductStock, increaseProductStock } from "../features/product/productSlice";
import { useEffect } from "react";
import axios from "axios";

const Cart = () => {

    const products = useSelector((state) => state.products);
  console.log(products, "products");
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cartProducts, "cart-products");
useEffect(() => {
  // Fetch cart data from the server if it doesn't exist in localStorage
  async function fetchCartData() {
    // if(!localStorage.getItem("cart")){
  let cartdata = null;
    try { 
 cartdata = await axios.get("https://localhost:7146/api/cart/getall", { withCredentials: true });
      console.log(cartdata, "cart-data");
      if (cartdata.data) {
        dispatch(setCartFromDb(cartdata.data.allCart));
      }
    }
    catch (error) {
      console.error("Error fetching cart data:", error);
    }
    // }
  
  }
  fetchCartData();

},[]);



  const handleClearCart = () => {
    confirm("Are you sure you want to clear the cart?");
    dispatch(clearFromCart());
  };

  const hanndleRemoveFromCart = (p)=>{
    dispatch(increaseProductStock({...p, type: "add"}));
    dispatch(decreaseCartStock({...p, type: "remove"}));

  }

  const handleIncreaseCart = (p) => {
    debugger;
    console.log(products, "products-handlweIncreaseCart");
      const foundProduct = products?.data?.products?.find(product => product.id === p.id);

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
    <Col md={3} key={p.productId + p.email} className="mb-4">
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
          <Card.Title>{p.productId}</Card.Title>
          <Card.Text>{p.cartQuantity}</Card.Text>
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
              onClick={() => dispatch(hanndleRemoveFromCart(p))}
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
