  import { useEffect, useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { getProducts } from '../features/product/productSlice';


const Product = () => {
const {data, status} = useSelector(state=>state.products);
console.log(data)
const dispatch = useDispatch();

useEffect(()=>{
dispatch(getProducts());
}
,[])

if (status === 'loading') {
  return <h1>Loading...</h1>
}
if (status === 'error') {
  return <Alert variant='danger'>Error</Alert>
}

const cards = data.products?.map((p)=>(
  <Col md={3} key={p.id}>
<Card style={{ margin: '10px' , border: '1px solid #ccc', borderRadius: '10px' }}>
      <Card.Img variant="top" fluid src={p.images} style={{margin:'auto'}} />
      <Card.Body>
        <Card.Title>{p.title}</Card.Title>
        <Card.Text>
          {p.price}
        </Card.Text>
        <Button variant="primary" onClick={()=>dispatch(addToCart(p))}>Add to cart</Button>
      </Card.Body>
    </Card>
  </Col>

))

  return (
    <div>
      <Row >
      {cards}

      </Row>
      </div> 


    

  )
}

export default Product