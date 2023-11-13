import { Checkbox,InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
	background: rgb(255, 255, 255);
	border-radius: 4px;
	display: flex;
	align-items: center;
	span {
		color: rgb(36, 36, 36);
		font-weight: 400;
		font-size: 13px;
	}
	,
	@media (max-width: 800px) {
		display: none;
	}
`;
export const WrapperStyleHeaderDilivery = styled.div`
  background: rgb(255, 255, 255);
  // padding: 9px 22px;
	margin-top: 13px;
	border-top: 1px solid rgb(255, 255, 255);
	border-bottom: 1px solid rgb(255, 255, 255);
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
  margin-bottom: 4px;
`;

export const WrapperLeft = styled.div`
  width: 810px;
				background-color: rgb(255,255,255);
			color: rgb(33,43,54);
			transition: box - shadow 300ms cubic - bezier(0.4,0,0.2,1) 0ms;
			overflow: hidden;
			box-shadow: 0px 18px 28px rgba(0,0,0,0.15), 0px 0px 1px rgba(0,0,0,0.31);
			border-radius: 16px;
`;
// display: flex;

export const WrapperListOrder = styled.div`
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
	margin: 10px 0px 10px 0px;
  border-bottom: 1px solid #d6d6d4;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  @media (max-width: 800px) {
    display: flex;
  }
`;
export const Lable = styled.span`
  font-size: 12px;
  color: #000;
  font-weight: bold;
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
  width: 75px;
	font-weight: 600;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: "10px !important";
`;

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
	max-height: 210px;
  align-items: center;
			background-color: rgb(255,255,255);
			color: rgb(33,43,54);
			transition: box - shadow 300ms cubic - bezier(0.4,0,0.2,1) 0ms;
			overflow: hidden;
			box-shadow: 0px 18px 28px rgba(0,0,0,0.15), 0px 0px 1px rgba(0,0,0,0.31);
			border-radius: 16px;
			padding: 0px 24px 0px
`;

export const WrapperInfo = styled.div`
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%;
	padding: "11px 16px";
`;
// padding: 20px 0;

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 17px 0px;
  background: #fff;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
`;

export const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #212B36;
    border-color: #212B36;
  }
.ant-checkbox-checked:hover .ant-checkbox-inner:hover {
    border-color: #212B36;
		 background-color: #212B36;
  }
`;
export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number.ant-input-number-sm {
    width: 80px;
		font-size: 15px;
    border-top: none;
    border-bottom: none;
    padding: 0px !important;
    .ant-input-number-handler-wrap {
      display: none !important;
			   width: 80px;
    }
    .ant-input-number-input {
		font-family: Public Sans, sans-serif;
		    padding: 0px !important;
      text-align: center;
    }
  }
`
	;
