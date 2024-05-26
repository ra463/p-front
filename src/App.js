import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Register = lazy(() => import("./pages/Auth/Register.jsx"));
const AllProperties = lazy(() => import("./pages/Property/AllProperties.jsx"));
const Property = lazy(() => import("./pages/Property/Property.jsx"));
const MyProperties = lazy(() => import("./pages/Property/MyProperties.jsx"));
const RegisterProperty = lazy(() =>
  import("./pages/Property/RegisterProperty.jsx")
);
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const App = () => {
  const token = localStorage.getItem("token");
  const user = token ? true : false;
  return (
    <Router>
      <Suspense
        fallback={
          <div className="loading">
            <h5>Loading...</h5>
          </div>
        }
      >
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/my-properties" element={<MyProperties />} />
            <Route path="/property/:id" element={<Property />} />
            <Route path="/register-property" element={<RegisterProperty />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/all-properties" element={<AllProperties />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Register />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
