import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/TV";
import Search from "./Routes/Search";
import Header from "./Components/Header";
import { Helmet } from "react-helmet";

function App() {
  return (
    <Router>
      <Helmet>
        <title>MINFLIX</title>
      </Helmet>
      <Header />
      <Routes>
        <Route path={"/*"} element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
