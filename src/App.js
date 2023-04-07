import { Routes, Route } from "react-router-dom";
import "./App.css";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [selectType, setSelectType] = useState("1");
  const [size, setSize] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [length, setLength] = useState(null);
  const [description, setDescription] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Products navigate={navigate} />} />
        <Route
          path="/addproduct"
          element={
            <AddProduct
              products={products}
              setProducts={setProducts}
              navigate={navigate}
              size={size}
              setSize={setSize}
              weight={weight}
              setWeight={setWeight}
              height={height}
              setHeight={setHeight}
              width={width}
              setWidth={setWidth}
              length={length}
              setLength={setLength}
              selectType={selectType}
              setSelectType={setSelectType}
              description={description}
              setDescription={setDescription}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
