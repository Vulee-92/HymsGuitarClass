import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    color: #fff;
    background: #212B36;
    span {
      color: #fff;
    }
  }
  width: 100%;
  color: #212B36;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointers")};
`;

export const WrapperProducts = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 20px;
  justify-content: center;
`;
export const WrapperTitle = styled.h2`
  font-size: 3em;
  font-weight: 900;
  line-height: 0.85;
  position: relative;
  text-align: left;
  z-index: 10;
  marginTop: 100px;
  margin: 0;
  text-transform: uppercase;
  pointer-events: none;
  [theme.breakpoints.down("sm")]: {
    fontSize: "2em",
    marginTop: "50px"
  }
}`;
export const WrapperDiscountGrid = styled.div`
text-align: center;
	margin: 10em auto 7em;
	position: relative;
	padding: 0 1em;
	width: 100%;
	max-width: 1700px;
	display: grid;
	grid-template-columns: repeat(var(--grid-columns), 1fr);
}`;
