import React from "react";
import styled from "styled-components";
import BookSize from "../components/BookSize";
import DvdSize from "../components/DvdSize";
import FurnitureSize from "../components/FurnitureSize";
import { useState } from "react";


export default function AddProduct({
  navigate,
  size,
  setSize,
  weight,
  setWeight,
  height,
  setHeight,
  width,
  setWidth,
  length,
  setLength,
  selectType,
  setSelectType,
  description,
  setDescription,
}) {
  const [inputs, setInputs] = useState([]);

  const handleChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleChangeType = (event) => {
    setSelectType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    fetch('https://products-crud333.000webhostapp.com/index.php/save', {
      method: 'POST',
      body: JSON.stringify({
        ...inputs,
            type_id: selectType,
           size,
           weight,
           height,
           width,
           length,
           description,
      })
  
    })
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          navigate("/");
          // Handle data
       })
       .catch((err) => {
          console.log(err.message);
       });
      };
      
  return (
    <Main onSubmit={handleSubmit}>
      <Header>
        <h2>Product Add</h2>
        <BtnBox>
          <button type="submit">Save</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </BtnBox>
      </Header>

      <Section>
        <Form>
          <InputBox>
            <label>Sku</label>
            <input
              type="text"
              name="sku"
              id="sku"
              onChange={handleChangeInput}
            />
          </InputBox>
          <InputBox>
            <label>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChangeInput}
            />
          </InputBox>
          <InputBox>
            <label>Price ($)</label>
            <input
              type="text"
              name="price"
              id="price"
              onChange={handleChangeInput}
            />
          </InputBox>

          <SelectBox>
            <h5>Type Switcher</h5>
            <select
              name="type_id"
              value={selectType}
              onChange={handleChangeType}
            >
              <option id="DVD" value="1" name="DvdSize">
                DVD
              </option>
              <option id="Furniture" value="2">
                Furniture
              </option>
              <option id="Book" value="3">
                Book
              </option>
            </select>
          </SelectBox>
          <SizeSection>
            {selectType === "1" && (
              <DvdSize
                size={size}
                setSize={setSize}
                description={description}
                setDescription={setDescription}
              />
            )}
            {selectType === "2" && (
              <FurnitureSize
                height={height}
                setHeight={setHeight}
                width={width}
                setWidth={setWidth}
                length={length}
                setLength={setLength}
                description={description}
                setDescription={setDescription}
              />
            )}
            {selectType === "3" && (
              <BookSize
                weight={weight}
                setWeight={setWeight}
                description={description}
                setDescription={setDescription}
              />
            )}
          </SizeSection>
        </Form>
      </Section>
    </Main>
  );
}

const Main = styled.form`
  width: 100%;
  height: 110vh;
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
  width: 95%;
  height: 100vh;
  margin-top: 10px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.div`
  width: 250px;

  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const SelectBox = styled.div`
  width: 220px;
  display: flex;
  flex-direction: row;

  margin-top: 40px;
  justify-content: space-between;
  align-items: center;
`;

const SizeSection = styled.div`
  width: 35%;
  height: 45vh;
`;
