import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowData from "../components/showData";
import AddProduct, { addproduct } from "../components/AddProduct";

const DEFAULT_URL = "/";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={DEFAULT_URL} element={<ShowData />} />
        <Route path={addproduct} element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
