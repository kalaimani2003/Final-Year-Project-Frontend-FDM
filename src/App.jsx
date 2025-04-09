import { Route, Routes, useLocation } from "react-router-dom";
import Routerr from "./Admin/Route";
import UserPanel from "./Admin/UserPanel";
import OrderForm from "./Admin/OrderForm";
import ForgotPass from "./Admin/ForgotPass";
import UserLogin from "./Admin/UserLogin";
import Register from "./Admin/Register";
import AdminLogin from "./Admin/AdminLogin";
import Myorder from "./Admin/Myorder";
import Editfood from './Admin/Editfood'; 
import Editfoodd from './Admin/Editfoodd';
import OrderList from "./Admin/OrderList";
import Dashborad from "./Admin/dashborad";

function App() {
  const location = useLocation();
  console.log(location.pathname); // Check current path

  const route = [
    { path: '/', Component: ForgotPass },
    { path: '/dash', Component: Dashborad },
    { path: '/admin', Component: AdminLogin },
    { path: '/user', Component: UserLogin },
    { path: '/reg', Component: Register },
    { path: '/userpanel', Component: UserPanel },
    { path: '/od', Component: OrderForm },
    { path: '/my', Component: Myorder },
    {path: '/order-list',Component:OrderList}
    
  ];

  const routePaths = route.map((r) => r.path);
  console.log(!routePaths.includes(location.pathname));

  // Define routes where the admin panel should not be displayed
  const hideAdminPanelRoutes = ['/order-list'];

  return (
    <>
      <Routes>
        {/* Define routes for EditFood */}


        {/* Map through route array to dynamically render routes */}
        {route.map((data, index) => (
          <Route key={index} path={data.path} element={<data.Component />} />
        ))}
      </Routes>

      {/* Conditionally render Routerr if the current route is not in hideAdminPanelRoutes */}
      {!hideAdminPanelRoutes.includes(location.pathname) && !routePaths.includes(location.pathname) && <Routerr />}
    </>
  );
}

export default App;
