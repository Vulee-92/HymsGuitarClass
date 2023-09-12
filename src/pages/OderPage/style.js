import { Checkbox } from "antd";
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
  width: 910px;
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
  margin-top: 12px;
  @media (max-width: 800px) {
    display: flex;
  }
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
  margin-top: "10px !important";
`;

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
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
    background-color: #9255fd;
    border-color: #9255fd;
  }
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #9255fd;
  }
`;
