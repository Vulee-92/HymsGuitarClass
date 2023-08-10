import { Avatar } from "@mui/material";
import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 14px;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
    & .ant-upload-list-item {
        display: none;
    }
`

export const AvatarTable = styled(Avatar)`
  width: 40px;
  height: 40px;
  font-family: Public Sans, sans-serif;
  font-size: 1.25rem;
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
`;
