import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
`;

const defaultValue = "Not provided";

const PopupContent = ({
  name = defaultValue,
  type = defaultValue,
  population = defaultValue,
  wealth = defaultValue,
  authority = defaultValue,
  numGuards = defaultValue,
}) => (
  <Wrapper data-testid="modal">
    <div>Name: {name}</div>
    <div>Type: {type}</div>
    <div>Population: {population}</div>
    <div>Wealth: {wealth}</div>
    <div>Authority: {authority}</div>
    <div>NumGuards: {numGuards}</div>
  </Wrapper>
);

export default PopupContent;
