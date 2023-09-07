import { Route, Routes } from "react-router-dom";
import ArticleDetails from "../../ArticleArea/ArticleDetails/ArticleDetails";
import Register from "../../AuthArea/Register/Register";
import Home from "../Home/Home";

function Routing(): JSX.Element {

  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/article/:id" element={<ArticleDetails />} />

      {/* auth */}
      <Route path="/register" element={<Register />} />

    </Routes>
  );
}

export default Routing;
