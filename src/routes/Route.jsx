import About from "@/pages/About";
import AdminLogin from "@/pages/AdminLogin";
import AdminRegister from "@/pages/AdminRegister";
import Blogs from "@/pages/Blog";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import PaymentForm from "@/pages/CheckoutIPG";
import Contact from "@/pages/Contact";
import Error404 from "@/pages/Error404";
import Faq from "@/pages/Faq";
import ForgotPassword from "@/pages/ForgotPassword";
import Gallery from "@/pages/Gallery";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import PrivacyPol from "@/pages/PrivacyPol";
import ProductPage from "@/pages/ProductPage";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import SearchPage from "@/pages/Search";
import Series from "@/pages/Series";
import Shop from "@/pages/Shop";
import Subcategory from "@/pages/Subcategories";
import SuccessTransactionPage from "@/pages/SuccessTransactionPage";
import AddProduct from "@/pages/Vendordashboard/AddProduct";
import Dashboard from "@/pages/Vendordashboard/Dashboard";
import OrderList from "@/pages/Vendordashboard/OrderList";
import Payments from "@/pages/Vendordashboard/Payments";
import ProductList from "@/pages/Vendordashboard/ProductList";
import Reviews from "@/pages/Vendordashboard/Reviews";
import Settings from "@/pages/Vendordashboard/Settings";
import VendorLogin from "@/pages/VendorLogin";
import VendorRegister from "@/pages/VendorRegister";
import WishList from "@/pages/Wishlist";

export const userRoutes = [
  {
    name: "home",
    title: "Home",
    component: <Home />,
    path: "/",
  },
  {
    name: "product page",
    title: "Product Page",
    component: <ProductPage />,
    path: "/product/:id",
  },
  {
    name: "about",
    title: "About",
    component: <About />,
    path: "/about",
  },
  {
    name: "cart",
    title: "Cart",
    component: <Cart />,
    path: "/cart",
  },
  {
    name: "contact",
    title: "Contact",
    component: <Contact />,
    path: "/contact",
  },
  {
    name: "faqs",
    title: "Faqs",
    component: <Faq />,
    path: "/faqs",
  },
  {
    name: "profile",
    title: "Profile",
    component: <Profile />,
    path: "/profile",
  },
  {
    name: "checkout",
    title: "Checkout",
    component: <Checkout />,
    path: "/checkout",
  },
  {
    name: "checkoutipg",
    title: "CheckoutIPG",
    component: <PaymentForm />,
    path: "/checkoutipg",
  },
  {
    name: "successfull transaction",
    title: "Successfull Transaction",
    component: <SuccessTransactionPage />,
    path: "/successTransaction",
  },
  {
    name: "wishlist",
    title: "Wishlist",
    component: <WishList />,
    path: "/wishlist",
  },
  {
    name: "search",
    title: "Search",
    component: <SearchPage />,
    path: "/search",
  },
  {
    name: "shop",
    title: "Shop",
    component: <Shop />,
    path: "/shop/:category",
  },
  {
    name: "Subcategory",
    title: "Subcategory",
    component: <Subcategory />,
    path: "/shop/:category/:subcategory",
  },
  {
    name: "Series",
    title: "Series",
    component: <Series />,
    path: "/shop/:category/:subcategory/:series",
  },
  {
    name: "blogs",
    title: "Blogs",
    component: <Blogs />,
    path: "/blog/:id",
  },
  {
    name: "register",
    title: "Register",
    component: <Register />,
    path: "/register",
  },
  {
    name: "login",
    title: "Login",
    component: <Login />,
    path: "/login",
  },
  {
    name: "forgot-passowrd",
    title: "Forgot Password",
    component: <ForgotPassword />,
    path: "/forgot-password",
  },
  {
    name: "Vendor Registeration",
    title: "Vendor Registration",
    component: <VendorRegister />,
    path: "/vendor-register",
  },
  {
    name: "Vendor Login",
    title: "Vendor Login",
    component: <VendorLogin />,
    path: "/vendor-login",
  },
  {
    name: "Admin Registeration",
    title: "Admin Registration",
    component: <AdminRegister />,
    path: "/admin-register",
  },
  {
    name: "Admin Login",
    title: "Admin Login",
    component: <AdminLogin />,
    path: "/admin-login",
  },
  {
    name: "Error 404",
    title: "Error 404",
    component: <Error404 />,
    path: "/*",
  },
  {
    name: "privacy-policy",
    title: "privacy-policy",
    component: <PrivacyPol />,
    path: "/privacy-policy",
  },
  {
    name: "Gallery",
    title: "Gallery",
    component: <Gallery />,
    path: "/gallery",
  },
];

export const vendorRoutes = [
  {
    name: "dashboard",
    title: "Dashboard",
    component: <Dashboard />,
    path: "/dashboard",
  },
  {
    name: "reviews",
    title: "Reviews",
    component: <Reviews />,
    path: "/dashboard/reviews",
  },
  {
    name: "addProduct",
    title: "Add Product",
    component: <AddProduct />,
    path: "/dashboard/add-product/*",
  },
  {
    name: "orderList",
    title: "Order List",
    component: <OrderList />,
    path: "/dashboard/orders",
  },
  {
    name: "productList",
    title: "Product List",
    component: <ProductList />,
    path: "/dashboard/products",
  },
  {
    name: "payments",
    title: "Payments",
    component: <Payments />,
    path: "/dashboard/payments",
  },
  {
    name: "settings",
    title: "Settings",
    component: <Settings />,
    path: "/dashboard/settings",
  },
];
