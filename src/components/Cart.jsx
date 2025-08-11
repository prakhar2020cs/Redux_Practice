import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../features/cart/cartSlice';

const Cart = () => {
const cartProducts = useSelector(state=>state.cart);
const dispatch = useDispatch()
console.log(cartProducts, "cart products")

const products = cartProducts.map((p)=>(
  <Col md={3} key={p.id}>
<Card style={{ margin: '10px' , border: '1px solid #ccc', borderRadius: '10px' }}>
      <Card.Img variant="top" fluid src={p.images} style={{margin:'auto'}} />
      <Card.Body>
        <Card.Title>{p.title}</Card.Title>
        <Card.Text>
          {p.price}
        </Card.Text>
        <Button variant="danger" onClick={()=>dispatch(removeFromCart(p))}>Remove</Button>
      </Card.Body>
    </Card>
  </Col>

))

  return (
    <div>
      <h1>Cart</h1>
      <Row>
     {products}

      </Row>


    </div>
  )
}

export default Cart