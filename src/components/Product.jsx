  import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const Product = () => {
const [products, setProducts] = useState([])


useEffect(()=>{
fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(data=>setProducts(data.products));

}
,[])

const cards = products.map((p)=>(
  <Col md={3}>
<Card style={{ width: '18rem' , margin: '10px' , border: '1px solid #ccc', borderRadius: '10px' }}>
      <Card.Img variant="top" src={p.images} style={{height:'100px', width:'90px', margin:'auto'}} />
      <Card.Body>
        <Card.Title>{p.title}</Card.Title>
        <Card.Text>
          {p.description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  </Col>

))

  return (
    <div>
      <div c style={{display: 'flex', flexWrap:'wrap' ,justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
      {cards}

      </div>
      </div> 


    

  )
}

export default Product