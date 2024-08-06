import "./App.css";
import Header from "./Components/Header";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserHomePage from "./Pages/UserPages/UserHomePage/UserHomePage";
import SignupPage from "./Pages/AuthPages/SignupPage";
import LoginPage from "./Pages/AuthPages/LoginPage";
import ProductPage from "./Pages/UserPages/ProductPage/ProductPage";
import AdminLogin from "./Pages/AuthPages/AdminLogin";
import AdminHeader from "./Components/AdminHeader";
import AdminHomePage from "./Pages/AdminPages/AdminHomePage";
import AddProductPage from "./Pages/AdminPages/AddProductPage";
import CartPage from "./Pages/UserPages/CartPage/CartPage";
import OrderPage from "./Pages/UserPages/OrderPage/OrderPage";
import OrderListPage from "./Pages/AdminPages/OrderListPage";
import React from "react";

axios.defaults.withCredentials = true;

export const UserContext = createContext(null);
export const AdminContext = createContext(null);

const WithUserContext = ({ children, userData }) => (
  <UserContext.Provider value={userData}>{children}</UserContext.Provider>
);

const LayoutWithHeader = ({ children, user, userData, fetchUser }) => (
  <>
    {user ? (
      <Header user={true} userData={userData} fetchUser={fetchUser} />
    ) : (
      <Header user={false} />
    )}
    <div className="mt-5" />
    {children}
  </>
);

const LayoutWithAdminHeader = ({ children }) => {
  const { admin, adminData } = React.useContext(AdminContext);
  return (
    <>
      <AdminHeader admin={admin} adminData={adminData} />
      <div className="mt-5" />
      {children}
    </>
  );
};

function App() {
  const [user, setUser] = useState(false);
  const [data, setData] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [adminData, setAdminData] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.post("http://localhost:4000/", {
        credentials: "include",
      });
      const { user, message, status } = response.data;
      if (status && user != null) {
        setUser(true);
        setData(user);
      } else {
        setUser(false);
        setData({});
      }
    } catch (error) {
      alert(error);
      setUser(false);
      setData({});
    }
  };

  const fetchAdmin = async (admin, adminData) => {
    setAdmin(admin);
    setAdminData(adminData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <LayoutWithHeader user={user} userData={data} fetchUser={fetchUser}>
              <WithUserContext userData={data}>
                <UserHomePage />
              </WithUserContext>
            </LayoutWithHeader>
          }
        />

        <Route
          path="/signup"
          element={
            <LayoutWithHeader user={user} userData={data} fetchUser={fetchUser}>
              <SignupPage fetchUser={fetchUser} />
            </LayoutWithHeader>
          }
        />

        <Route
          path="/login"
          element={
            <LayoutWithHeader user={user} userData={data} fetchUser={fetchUser}>
              <LoginPage fetchUser={fetchUser} />
            </LayoutWithHeader>
          }
        />

        <Route
          path="/products"
          element={
            <LayoutWithHeader user={user} userData={data} fetchUser={fetchUser}>
              <WithUserContext userData={data}>
                <ProductPage />
              </WithUserContext>
            </LayoutWithHeader>
          }
        />

        <Route
          path="/cart"
          element={
            <LayoutWithHeader user={user} userData={data} fetchUser={fetchUser}>
              <WithUserContext userData={data}>
                <CartPage />
              </WithUserContext>
            </LayoutWithHeader>
          }
        />

        <Route
          path="/order"
          element={
            <LayoutWithHeader user={user} userData={data} fetchUser={fetchUser}>
              <WithUserContext userData={data}>
                <OrderPage />
              </WithUserContext>
            </LayoutWithHeader>
          }
        />

        <Route
          path="/adminLogin"
          element={
            <AdminContext.Provider value={{ admin, adminData, fetchAdmin }}>
              <LayoutWithAdminHeader
                admin={admin}
                adminData={adminData}
                fetchAdmin={fetchAdmin}
              >
                <AdminLogin/>
              </LayoutWithAdminHeader>
            </AdminContext.Provider>
          }
        />
        <Route
          path="/adminHomePage"
          element={
            <AdminContext.Provider value={{ admin, adminData, fetchAdmin }}>
              <LayoutWithAdminHeader
                admin={admin}
                adminData={adminData}
                fetchAdmin={fetchAdmin}
              >
                <AdminHomePage />
              </LayoutWithAdminHeader>
            </AdminContext.Provider>
          }
        />
        <Route
          path="/AddProductPage"
          element={
            <AdminContext.Provider value={{ admin, adminData, fetchAdmin }}>
              <LayoutWithAdminHeader
                admin={admin}
                adminData={adminData}
                fetchAdmin={fetchAdmin}
              >
                <AddProductPage />
              </LayoutWithAdminHeader>
            </AdminContext.Provider>
          }
        />
        <Route
          path="/orderListPage"
          element={
            <AdminContext.Provider value={{ admin, adminData, fetchAdmin }}>
              <LayoutWithAdminHeader
                admin={admin}
                adminData={adminData}
                fetchAdmin={fetchAdmin}
              >
                <OrderListPage />
              </LayoutWithAdminHeader>
            </AdminContext.Provider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
