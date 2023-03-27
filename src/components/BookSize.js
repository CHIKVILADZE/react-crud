import React from "react";
import styled from "styled-components";

export default function BookSize({
  setWeight,
  setDescription,
}) {
  const handleChangeWeight = (event) => {
    setWeight(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Main>
      <SizeInp>
        <label>Weight (KG)</label>
        <input type="text" name="weight" onChange={handleChangeWeight} />
      </SizeInp>
      <Descript>
        <h6>Product description</h6>
        <textarea onChange={handleChangeDescription} />
      </Descript>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
`;

const SizeInp = styled.div`
  display: flex;
  flex-direction: row;

  width: 70%;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  height: 30px;
`;

const Descript = styled.div`
  width: 95%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  gap: 10px;
`;
