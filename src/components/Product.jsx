import { useEffect } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseCartStock } from "../features/cart/cartSlice";
import {
  decreaseProductStock,
  getFromLocal,
  getProducts,
  
} from "../features/product/productSlice";

const Product = () => {
  const { data, status } = useSelector((state) => state.products);
  console.log(data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("products")) {
      dispatch(getProducts());
    } else {
      dispatch(getFromLocal());
    }
  }, []);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }
  if (status === "error") {
    return <Alert variant="danger">Error</Alert>;
  }

  const cards = data.products?.map((p) => (
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
          <Card.Text>{p.stock}</Card.Text>
          <Button
            disabled={p.stock === 0}
            variant="primary"
            onClick={() => {
              dispatch(addToCart(p));
              dispatch(decreaseProductStock(p));
              // dispatch(increaseCartStock(p));
            }}
          >
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <div>
      <Row>{cards}</Row>
    </div>
  );
};

export default Product;
