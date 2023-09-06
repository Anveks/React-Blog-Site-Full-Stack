import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Register from "../../AuthArea/Register/Register";

function Routing(): JSX.Element {


  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* auth */}
      <Route path="/register" element={<Register />} />

    </Routes>
  );
}

export default Routing;
