import Drawer from './Drawer'
import Dashborad from './dashborad'
import './cs.css'
import { Route, Routes, } from 'react-router-dom'
import Addfood from './Addfood'
import Editfood from './Editfood'
import User from './User'
import Order from './Order'
import Logout from './Logout'
import Editfoodd from './Editfoodd'
import OrderList from './OrderList'
import OrderForm from './OrderForm'

function Routerr() {
  return (
    <>
      <div className="dbmain">
        <Drawer />
        <Routes>
          <Route path={'/dash'} element={<Dashborad />} />
          <Route path={"/add"} element={<Addfood />} />
          <Route path={"/edit"} element={<Editfood />} />
          <Route path={"/editt"} element={<Editfoodd />} />
          <Route path={"/userr"} element={<User />} />
          <Route path={"/order"} element={<Order />} />
          <Route path={"/log"} element={<Logout />} />
          <Route path={"/od"} elements={<OrderForm />} />
          <Route path="/editfood" element={<Editfood />} />
          <Route path="/edit/:id" element={<Editfoodd />} />
          <Route path="/order-list" element={<OrderList />} />
        </Routes>
      </div>
    </>
  )
}

export default Routerr;
