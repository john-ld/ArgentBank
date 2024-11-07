import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
