import React from "react";
import styled from "styled-components";


export default function FurnitureSize({
  setHeight,
  setWidth,
  setLength,
  setDescription,
}) {
  const handleChangeHeight = (event) => {
    setHeight(event.target.value);
  };
  const handleChangeWidth = (event) => {
    setWidth(event.target.value);
  };
  const handleChangeLength = (event) => {
    setLength(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Main>
      <SizeInp>
        <label>Height (CM)</label>
        <input
          type="text"
          name="height"
          id="height"
          onChange={handleChangeHeight}
        />
      </SizeInp>
      <SizeInp>
        <label>Width (CM)</label>
        <input
          type="text"
          name="width"
          id="width"
          onChange={handleChangeWidth}
        />
      </SizeInp>
      <SizeInp>
        <label>Length (CM)</label>
        <input
          type="text"
          name="length"
          id="length"
          onChange={handleChangeLength}
        />
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
  margin-top: 20px;
  height: 20px;
`;

const Descript = styled.div`
  width: 95%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  gap: 10px;
`;
