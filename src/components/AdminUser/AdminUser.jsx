import React, { useEffect, useRef, useState } from "react";
import { AvatarTable, WrapperHeader } from "./style";
import { Button, Dropdown, Form, Space, Switch, Upload } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CStyles from '../../utils/common';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import InputComponent from "../InputComponent/InputComponent";
import Loading from "../LoadingComponent/Loading";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import ReactQuill from "react-quill";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getBase64 } from "../../utils";
import CTable from '../../components/CTable';
import * as UserService from "../../services/UserService";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as message from "../../components/Message/Message";

import {
  Box,
  Container,
  Icon,
  Menu,
  Stack,
  MenuItem,
  Typography,
  Avatar,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import styles from "./stylemui";
import { styled } from "@mui/styles";
const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const searchInput = useRef(null);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const classes = styles();
  // const [dataTableOverview, setDataTableOverview] = useState({
  //   header: [
  //     { name: 'Name', id: 'username', align: 'left', isCustom: true, cell: ({ cell }) => renderCellTeacherName(cell) },
  //     { name: 'Room Class', id: 'fixedRoomCode', isCustom: true, cell: ({ cell }) => renderCellRoomClass(cell) },
  //     // { name: 'Email', id: 'email', isCustom: true, cell: ({ cell }) => renderCellEmail(cell) },
  //   ],
  //   rows: []
  // })

  const [openDetail, setOpenDetail] = useState({
    visible: false,
    data: null
  });
  const renderCellTeacherName = (cell) => {
    let newData = cell;
    return (
      <Box style={CStyles.rowAliCen} onClick={() => setOpenDetail({ visible: true, data: newData })}>
        <Avatar className={classes.iconAvatarThumnailTable} src={cell.avatar} />
        <Typography className={classes.txtNameTeacher}>{cell.username}</Typography>
      </Box>
    )
  }

  const renderCellRoomClass = (cell) => {
    let newData = cell;
    return (
      <Box onClick={() => setOpenDetail({ visible: true, data: newData })} className={classes.conCellActivity} style={{ paddingRight: '20px' }}>
        <Typography>{cell.fixedRoomCode}</Typography>
      </Box>
    )
  }
  const inittial = () => ({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    avatar: "",
    address: "",
  });
  const [stateUser, setStateUser] = useState(inittial());

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });
  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);
    return res;
  });

  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = UserService.deleteManyUser(ids, token);
    return res;
  });
  const mutation = useMutationHooks((data) => {
    const { name, email, phone, isAdmin, avatar, address } = data;
    const res = UserService.signupUser({
      name,
      email,
      phone,
      isAdmin,
      avatar,
      address,
    });
    return res;
  });
  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token);

    return res;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const renderAction = () => {
    return (
      <div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          hover
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => setIsModalOpenDelete(true)}>Xoá</MenuItem>
          {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
          {/* {user?.isAdmin && (
           <MenuItem onClick={() => navigate("/system/admin")}>
             quản lý
           </MenuItem>
         )} */}
          {/* <MenuItem onClick={handleDetailsUser}>Logout</MenuItem> */}
        </Menu>
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <FontAwesomeIcon
          icon={faPen}
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={handleDetailsUser}
        />
        {/* <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} /> */}
      </div>
    );
  };
  const [stateUserDetails, setStateUserDetails] = useState(inittial());
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const { data, isLoading, isSuccess, isError } = mutation;
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted;

  const {
    data: dataDeletedMany,
    isLoading: isLoadingDeletedMany,
    isSuccess: isSuccessDelectedMany,
    isError: isErrorDeletedMany,
  } = mutationDeletedMany;

  const queryUser = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const { isLoading: isLoadingUsers, data: users } = queryUser;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            {" "}
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <FontAwesomeIcon
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      image: file.preview,
    });
  };
  const handleDetailsUser = () => {
    setIsOpenDrawer(true);
  };
  // <FontAwesomeIcon
  //      icon={faTrash}
  //      style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
  //      onClick={() => setIsModalOpenDelete(true)}
  //    />
  //    <FontAwesomeIcon
  //      icon={faPen}
  //      style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
  //      onClick={handleDetailsUser}
  //    />
  const items = [
    {
      label: (
        <MenuItem onClick={handleDetailsUser}>
          <FontAwesomeIcon icon={faPen} />
          <Typography sx={{ ml: 2 }}>Edit</Typography>
        </MenuItem>
      ),
      key: "0",
    },
    {
      label: (
        <MenuItem
          onClick={() => setIsModalOpenDelete(true)}
          sx={{ color: "error.main" }}
        >
          <FontAwesomeIcon icon={faTrash} />
          <Typography sx={{ ml: 2 }}>Delete</Typography>
        </MenuItem>
      ),
      key: "1",
    },
  ];
  // if (data) {

  // }
  // return(
  //     {(isAdmin = true ? "Admin" : "Người dùng")}
  // )
  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

  const NoMaxWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: "none",
    },
  });
  const columns = [
    // {
    //   title: "Avatar",
    //   dataIndex: "avatar",
    //   render: (theImageURL) => (
    //     <Stack direction="row" alignItems="center" spacing={2}>
    //       <AvatarTable size={40} alt={theImageURL} src={theImageURL} />
    //     </Stack>
    //   ),
    // },

    {
      title: "Name",
      key: "avatarName",
      render: (record) => (
        <Stack direction="row" alignItems="center">
          <AvatarTable size={40} alt={record.avatar} src={record.avatar} />
          <Typography variant="subtitle2" noWrap>
            {record.name}
          </Typography>
        </Stack>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (value) => {
        return value === "TRUE" ? (
          <Typography color={(value === "TRUE" && "error") || "success"}>
            Admin
          </Typography>
        ) : (
          <Typography color={(value === "TRUE" && "error") || "success"}>
            Người dùng
          </Typography>
        );
      },
    },
    // <Label style={{ color: "#000" }}>{isAdmin = true ? 'Admin' : 'Người dùng'}</Label>

    // filters:
    //   {
    //     text: ,

    //     value: true,
    //   },
    //   {
    //     text: "False",
    //     value: false,
    //   },
    // ],
    //     </>
    //   }
    // },
    {
      title: "Phone",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (address) => (
        <CustomWidthTooltip title={address}>
          <Typography sx={{ m: 1 }} style={{ cursor: "pointer" }}>
            {address ? `${address.slice(0, 100)}...` : "chưa có"}
          </Typography>
        </CustomWidthTooltip>
        // substring(0, address.length - 30)}...
      ),
    },

    // {
    //   title: "Type",
    //   dataIndex: "type",
    // },

    {
      title: "Action",
      dataIndex: "action",
      key: "x",
      render: () => (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Box onClick={(e) => e.preventDefault()}>
            <Space>
              <Icon
                sx={{ color: "#000", cursor: "pointer" }}
                component={MoreVertIcon}
              />
            </Space>
          </Box>
        </Dropdown>
      ),
    },
  ];
  // const getData = () => {


  //   setDataTableOverview({ ...dataTableOverview, rows: queryUser?.data?.data })
  // }
  // useEffect(() => {
  //   getData();
  // }, []);
  const dataTable =
    queryUser?.data?.data?.length &&
    queryUser?.data?.data?.map((user) => {
      return {
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? "TRUE" : "FALSE",
      };
    }
    );
  const user = useSelector((state) => state?.user);
  const [form] = Form.useForm();

  const onUpdateUser = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateUserDetails },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDelteManyUsers = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected);
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
        avatar: res?.data?.avatar,
        address: res?.data?.address,
      });
    }
    setIsLoadingUpdate(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  // const handleOk = () => {
  //   // setIsModalOpen(false);
  //   onFinish()
  // };
  const handleDeleteUser = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
      avatar: "",
      address: "",
    });
    form.resetFields();
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: "",
      avatar: "",
      address: "",
    });
    form.resetFields();
  };
  const onFinish = () => {
    mutation.mutate(stateUser);
  };
  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await URL.createObjectURL(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview,
    });
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateUserDetails);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateUserDetails, isModalOpen]);
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessDelectedMany && dataDeletedMany?.status === "OK") {
      message.success();
    } else if (isErrorDeletedMany) {
      message.error();
    }
  }, [isSuccessDelectedMany]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);
  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDelected]);

  useEffect(() => {
    setUserAvatar(user?.avatar);
  }, [user?.avatar]);

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          {/* <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button> */}
        </Stack>
        <WrapperHeader>Quản lý người dùng</WrapperHeader>

        <TableComponent
          forceRender
          handleDelteMany={handleDelteManyUsers}
          columns={columns}
          data={dataTable}
          isLoading={isLoadingUsers}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
        {/* <CTable selectedRow={true} className={classes.dataTable} data={dataTableOverview} isSort={false} sx={{ height: { xs: 'auto', sm: '620px' } }} /> */}
        <DrawerComponent
          title="Chi tiết nnguoi dung"
          isOpen={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
          width="60%"
        >
          <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ maxWidth: 600 }}
              onFinish={onUpdateUser}
              autoComplete="on"
              form={form}
            >
              <Form.Item
                label="Avatar"
                name="avatar"
                rules={[
                  { required: true, message: "Please input your avatar!" },
                ]}
              >
                <Upload onChange={handleOnchangeAvatarDetails} maxCount={1}>
                  <Button>Select File</Button>
                  {stateUserDetails.avatar && (
                    <img
                      src={stateUserDetails.avatar}
                      alt={stateUserDetails.avatar}
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </Upload>
              </Form.Item>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <InputComponent
                  value={stateUserDetails.name}
                  onChange={handleOnchangeDetails}
                  name="name"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetails["email"]}
                  onChange={handleOnchangeDetails}
                  name="email"
                />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please input your Phone!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetails.phone}
                  onChange={handleOnchangeDetails}
                  name="phone"
                />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetails.address}
                  onChange={handleOnchangeDetails}
                  name="address"
                />
              </Form.Item>

              {/* <Form.Item
              label="Admin"
              name="isAdmin"
              rules={[
                { required: true, message: "Please input your isAdmin!" },
              ]}
            >
              <InputComponent
                value={stateUserDetails.isAdmin}
                onChange={handleOnchangeDetails}
                name="isAdmin"
              />
            </Form.Item> */}

              {/* <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your Description!" },
              ]}
            >
              <ReactQuill
                theme="snow"
                value={stateUserDetails.description}
                onChange={handleOnchangeCKeditor}
              />
              <InputComponent value={stateUserDetails.description} onChange={handleOnchangeDetails} name="description" />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: "Please input your Rating!" }]}
            >
              <InputComponent
                value={stateUserDetails.rating}
                onChange={handleOnchangeDetails}
                name="rating"
              />
            </Form.Item> */}

              {/* <Form.Item
                label="Avatar"
                name="avatar"
                rules={[
                  { required: true, message: "Please input your avatar!" },
                ]}
              >
                {userAvatar ? (
                  <Box
                    // className={classes.imgAvatar}
                    sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                  >
                    <Avatar
                      // className={classes.imgAvatar}
                      alt="Remy Sharp"
                      src={
                        userAvatar ? userAvatar : "/static/images/avatar/2.jpg"
                      }
                    />
                  </Box>
                ) : (
                <IconButton onClick={handleNavigateLogin} sx={{ p: 0 }}>
                <Avatar className={classes.imgAvatar} alt="Remy Sharp"src={"/static/images/avatar/2.jpg" } /> 
                  </IconButton>
                )}
              </Form.Item> */}

              <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Apply
                </Button>
              </Form.Item>
            </Form>
          </Loading>
        </DrawerComponent>
        <ModalComponent
          forceRender
          title="Xóa sản phẩm"
          open={isModalOpenDelete}
          onCancel={handleCancelDelete}
          onOk={handleDeleteUser}
        >
          <Loading isLoading={isLoadingDeleted}>
            <div>Bạn có chắc xóa sản phẩm này không?</div>
          </Loading>
        </ModalComponent>
      </Container>
    </>
  );
};

export default AdminUser;
