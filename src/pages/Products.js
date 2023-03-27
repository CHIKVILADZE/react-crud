import styled from "styled-components";

import { useEffect, useState } from "react";

export default function Products({ navigate}) {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    fetch("https://products-crud333.000webhostapp.com/")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }

  const handleClick = () => {
    navigate("/addproduct");
  };

  const handleCheck = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts((prev) => prev.filter((pid) => pid !== id));
      console.log(selectedProducts)
    } else {
      setSelectedProducts((prev) => [...prev, id]);
      console.log(selectedProducts)
    }
  };

  const deleteProduct = () => {
    selectedProducts.forEach((id) => {
      fetch(`https://products-crud333.000webhostapp.com/index.php/${id}/delete`, {
        method: 'POST',
        body: JSON.stringify({
          type:"delete",
          
        })
      }).then(() => {
        getProducts();
      });
    });
  };

  
  return (
    <Main>
      <Header>
        <h2>Product List</h2>
        <BtnBox>
          <button onClick={handleClick}>Add</button>
          <Btn onClick={() => deleteProduct(products.id)}>Mass Delete</Btn>

          <form></form>
        </BtnBox>
      </Header>
      <Section>
        {products.map((product, key) => {
          return (
            <Box key={key}>
              <ul>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() => handleCheck(product.id)}
                />
                <li>{product.sku}</li>
                <li>{product.name}</li>
                <li>{product.price} $</li>

                {product.type_id === "1" && <li>Size: {product.size} MB</li>}
                {product.type_id === "2" && (
                  <li>
                    Dimension: {product.height}x{product.width}x{product.length}{" "}
                  </li>
                )}
                {product.type_id === "3" && <li>Weight:{product.weight}KG</li>}

                <br />
              </ul>
            </Box>
          );
        })}
      </Section>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 95%;
  height: 40px;
  margin-top: 50px;
  border: none;
  border-bottom: 2px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 10px;

  gap: 20px;
`;

const Section = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 70px;
  gap: 50px;
`;

const Box = styled.div`
  width: 20%;
  height: 150px;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Btn = styled.button`
  margin-top: 0;
`;
