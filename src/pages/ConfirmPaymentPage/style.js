import { Radio } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`;

export const WrapperLeft = styled.div`
  width: 140%;
		background-color: rgb(255,255,255);
			color: rgb(33,43,54);
			transition: box - shadow 300ms cubic - bezier(0.4,0,0.2,1) 0ms;
			overflow: hidden;
			box-shadow: 0px 18px 28px rgba(0,0,0,0.15), 0px 0px 1px rgba(0,0,0,0.31);
			border-radius: 16px;
			padding: 0px 24px 0px
`;

export const WrapperListOrder = styled.div``;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: rgb(247, 248, 250);
  margin-top: 12px;
`;

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`;
export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const WrapperRight = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: left;
		background-color: rgb(247, 248, 250);
			color: rgb(33,43,54);
			transition: box - shadow 300ms cubic - bezier(0.4,0,0.2,1) 0ms;
			overflow: hidden;
			// box-shadow: 0px 18px 28px rgba(0,0,0,0.15), 0px 0px 1px rgba(0,0,0,0.31);
			border-radius: 16px;
			padding: 0px 24px 0px;
			margin: 20px
`;

export const WrapperInfo = styled.div`
  padding: 10px 0px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%;
		border-top: 2px solid #e6e6e6;
`;

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 0px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
	border-top: 2px solid #e6e6e6;
	width: 100%
`;

export const Lable = styled.span`
  font-size: 12px;
  color: #000;
  font-weight: bold;
`;

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 20px;
  // background: rgb(240, 248, 255);
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  height: 100%;
	width: 100%;
  padding: 15px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
`;
