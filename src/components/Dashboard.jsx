
import { Link } from 'react-router-dom'
import Cart from './Cart'

const Dashboard = () => {
  return (
    <div>
      <Link to={"/Dashboard/Cart"}></Link>
      <Cart/>
    </div>

  )
}

export default Dashboard