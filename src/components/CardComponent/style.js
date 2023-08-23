import styled from "styled-components";
import { Card } from "antd";

export const StyleNameProduct = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgb(56, 56, 61);
  font-weight: 400;
`;
const StyledCardMedia = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});
export const WrapperReportText = styled.div`
  font-size: 11px;
  color: rgb(128, 128, 137);
  display: flex;
  align-items: center;
  margin: 8px 0;
`;

export const WrapperPriceText = styled.div`
  font-size: 16px;
  color: rgb(255, 66, 78);
  font-weight: 500;
`;
export const WrapperDiscountText = styled.span`
  color: rgb(255, 66, 78);
  font-size: 12px;
  font-weight: 500;
`;
export const StyleRoot = styled("Card")``;
export const WrapperDiscountGrid = styled.div`
text-align: center;
	margin: 10em auto 7em;
	position: relative;
  cursor: pointers;
	padding: 0 1em;
	width: 100%;
	max-width: 1000px;
	display: grid;
	grid-template-columns: repeat(var(--grid-columns), 1fr);
}`;
export const WrapperTitle = styled.h2`
  font-size: 5em;
  font-weight: 900;
  line-height: 0.85;
  cursor: pointers;
  position: relative;
  z-index: 10;
  margin: 0;
  padding: 0 5vmax 0 5vmax;
  text-transform: uppercase;
  pointer-events: none;
}`;
export const WrapperProduct = styled.h2`
 height: 100%;
  padding-top: 10em;
  position: relative;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}`;
export const WrapperProductBg = styled.h2`
  background: var(--details-bg-down);
  position: relative;
}`;
export const product__img = styled.img`
max-height: 25em;
  margin: 0 auto;
  display: block;
  position: absolute;
  cursor: pointers;
  top: 0;
  left: 50%;
  pointer-events: none;
  transform: translate3d(-50%, 0, 0);
}`;
export const WrapperProductTiltle = styled.h2`
position: relative;
  margin: 0.5em 0 0;
  text-align: center;
  font-size: 1em;
  color: var(--color-product-title);
  font-family: "Playfair Display", serif;
  font-weight: 700;
  cursor: pointers;
}`;
export const WrapperDiscountGridItem = styled.div`
	padding: 0 4vw;
  cursor: pointers;
	margin: 0 0 12vh;
    &::nth-child(odd) .product {
        	margin-top: -8em;
    }
}`;
