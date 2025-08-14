import { Alert, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  decreaseProductStock,
} from "../features/product/productSlice";

const Product = () => {
  const { data, status } = useSelector((state) => state.products);
  console.log(data,  "product page");
  const dispatch = useDispatch();



  if (status === "loading") {
    return <h1>Loading...</h1>;
  }
  if (status === "error") {
    return <Alert variant="danger">Error</Alert>;
  }

  const cards = data.products?.map((p) => (
    <Col md={3} key={p.id} className="mb-4 " >
      <Card className="h-100 mb-3"
        style={{
          margin: "10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          position:"relative"
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
          <Card.Text style={{marginBottom:"30px"}}>{p.description}</Card.Text>
          <Button  style={{
            position:"absolute",
            bottom:"15px"
          }}
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
