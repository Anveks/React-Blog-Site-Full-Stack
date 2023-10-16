import { Route, Routes } from "react-router-dom";
import ArticleDetails from "../../ArticleArea/ArticleDetails/ArticleDetails";
import Register from "../../AuthArea/Register/Register";
import Home from "../Home/Home";
import AddArticle from "../../ArticleArea/AddArticle/AddArticle";
import EditArticle from "../../ArticleArea/EditArticle/EditArticle";
import ProfileDetails from "../../ProfileArea/ProfileDetails/ProfileDetails";

function Routing(): JSX.Element {

  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/article/:id" element={<ArticleDetails />} />
      <Route path="/add-article" element={<AddArticle />} />
      <Route path="/edit-article/:id" element={<EditArticle />} />
      <Route path='/profile-details' element={<ProfileDetails />} />

      {/* auth */}
      <Route path="/register" element={<Register />} />

    </Routes>
  );
}

export default Routing;
