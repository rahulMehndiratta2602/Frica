import {
  Routes,
  Route,
} from "react-router-dom"

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Home from "./pages/Home"
import Nav from "./components/Nav"
import RegisterComplete from "./pages/auth/RegisterComplete"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { auth } from "./pages/auth/firebase"
import ForgotPassword from "./pages/auth/ForgotPassword"
import { getCurrentUser } from "./functions/auth"
import UserRoute, { History, Password, Wishlist } from "./pages/User"
import AdminRoute, { Dashboard } from "./pages/Admin"
import Categories from "./pages/Admin/Category"
import SubCategories from "./pages/Admin/SubCategory"
import Products from "./pages/Admin/product"
import CreateProduct from "./pages/Admin/product/CreateProduct"
import UpdateProduct from "./pages/Admin/product/UpdateProduct"
import SingleProductDisplay from "./pages/SingleProductDisplay"
import Shop from "./pages/Shop"


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        getCurrentUser(idTokenResult.token).then(res => {
          dispatch(
            {
              type: "LOGGED_IN_USER",
              payload: {
                email: res.data.user.email,
                token: idTokenResult.token,
                name: res.data.user.name,
                _id: res.data.user._id,
                picture: res.data.user.picture,
                role: res.data.user.role
              }
            })
        }

        ).catch(err => console.log(err))

      }
    })
    return () => unsubscribe()
  }, [dispatch])


  return (<>

    <Nav />
    <ToastContainer autoClose={1000} />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/register/complete' element={<RegisterComplete />} />
      <Route path="/forgot/password" element={<ForgotPassword />} />
      <Route path='/user' element={<UserRoute />}>
        <Route path="history" element={<History />} />
        <Route path="password" element={<Password />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>
      <Route path="/product/:slug" element={<SingleProductDisplay />} />

      <Route path='/admin' element={<AdminRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="subcategories" element={<SubCategories />} />
        <Route path="products" element={<Products />} />
        <Route path="product" element={<CreateProduct />} />
        <Route path="product/update/:slug" element={<UpdateProduct />} />
      </Route>
    </Routes>
  </>)
}

export default App
