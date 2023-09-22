import { Route, Routes } from "react-router-dom";
import ArticleDetails from "../../ArticleArea/ArticleDetails/ArticleDetails";
import Register from "../../AuthArea/Register/Register";
import Home from "../Home/Home";
import AddArticle from "../../ArticleArea/AddArticle/AddArticle";

function Routing(): JSX.Element {

  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/article/:id" element={<ArticleDetails />} />
      <Route path="/add-article" element={<AddArticle />} />

      {/* auth */}
      <Route path="/register" element={<Register />} />

    </Routes>
  );
}

export default Routing;
