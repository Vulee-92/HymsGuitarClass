/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader } from "../HeaderComponents/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Space,
  Upload,
  Select,
  Dropdown,
} from "antd";
import {
  faMagnifyingGlass,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64, renderOptions } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Editor from "../../components/CKeditor/CKeditor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  Container,
  FormControl,
  Icon,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { AvatarTable } from "../AdminUser/style";
import { Label } from "@mui/icons-material";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const searchInput = useRef(null);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [fileList, setFileList] = useState([]);
  const [mode, setMode] = useState(false);

  const [typeSelect, setTypeSelect] = useState("");
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    if (event !== "Thêm type") {
      setStateProduct({
        ...stateProduct,
        type: event,
      });
    } else {
      setTypeSelect(event);
    }

    // const {
    //   target: { value },
    // } = event;
    // setTypeSelect(
    //   // On autofill we get a stringified value.
    //   typeof value === "string" ? value.split(",") : value
    // );
  };
  const inittial = () => ({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
    newType: "",
    discount: "",
  });

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });
  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });
  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = ProductService.deleteManyProduct(ids, token);
    return res;
  });

  const mutation = useMutationHooks((data) => {
    const {
      name,
      price,
      description,
      rating,
      image,
      type,
      countInStock,
      discount,
    } = data;
    const res = ProductService.createProduct({
      name,
      price,
      description,
      rating,
      image,
      type,
      countInStock,
      discount,
    });
    return res;
  });
  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const handleChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value,
    });
  };

  const renderAction = () => {
    return (
      <div>
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <FontAwesomeIcon
          icon={faPen}
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
        {/* <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} /> */}
      </div>
    );
  };
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };
  const [stateProductDetails, setStateProductDetails] = useState(inittial());
  console.log('stateProductDetails', stateProductDetails)
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  console.log('dataUpdated', mutationUpdate)
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

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  console.log('queryProduct', queryProduct)
  const typeProduct = useQuery({
    queryKey: ["type-product"],
    queryFn: fetchAllTypeProduct,
  });
  const { isLoading: isLoadingProducts, data: products } = queryProduct;

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
  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };
  const items = [
    {
      label: (
        <MenuItem onClick={handleDetailsProduct}>
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
  const columns = [
    {
      title: "Name",
      key: "avatarName",
      render: (record) => (
        <Stack direction="row" alignItems="center">
          <AvatarTable size={40} alt={record.image} src={record.image} />
          <Typography variant="subtitle2" noWrap>
            {record.name}
          </Typography>
        </Stack>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 50",
          value: ">=",
        },
        {
          text: "<= 50",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 50;
        }
        return record.price <= 50;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (value) => {
        return value > 1 && value < 3 ? (
          <Label color={"error"}>
            <Typography color={"error"}>{value}</Typography>
          </Label>
        ) : value > 3 && value < 4 ? (
          <Label color={"success"}>
            <Typography color={"success"}>{value}</Typography>
          </Label>
        ) : (
          <Label background={"#000"}>
            <Typography color={"primary"}>{value}</Typography>
          </Label>
        );
      },
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">= 3",
          value: ">=",
        },
        {
          text: "<= 3",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return Number(record.rating) >= 3;
        }
        return Number(record.rating) <= 3;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
    },
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
  const dataTable =
    queryProduct?.data?.data?.length &&
    queryProduct?.data?.data?.map((product) => {
      return { ...product, key: product._id };
    });

  const user = useSelector((state) => state?.user);
  const [form] = Form.useForm();

  // const onUpdateProduct = () => {
  //   mutationUpdate.mutate(
  //     { id: rowSelected, token: user?.access_token, ...stateProductDetails },
  //     {
  //       onSettled: () => {
  //         queryProduct.refetch();
  //       },
  //     }
  //   );
  // };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleDelteManyProducts = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        discount: res?.data?.discount,
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
  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: "",
      countInStock: "",
      discount: "",
      newType: "",
    });
    form.resetFields();
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: "",
      countInStock: "",
      discount: "",
      newType: "",
    });
    form.resetFields();
  };
  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      image: stateProduct.image,
      type:
        stateProduct.type === "add_type"
          ? stateProduct.newType
          : stateProduct.type,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount,
    };
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };
  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeCKeditorNew = (editor) => {
    setStateProduct({
      ...stateProduct,
      description: editor,
    });
  };

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value
    })
  }
  const handleOnchangeCKeditor = (editor) => {
    setStateProductDetails({
      ...stateProductDetails,
      description: editor,
    });
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      setStateProduct({
        ...stateProduct,
        image: file.preview,
      });
    }
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview
    })
  }
  const onUpdateProduct = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }


  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateProductDetails);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateProductDetails, isModalOpen]);
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  //isSuccessDelectedMany
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
      fetchGetDetailsProduct(rowSelected);
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
  const [stateProduct, setStateProduct] = useState(inittial());

  const renderOptions = (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.map((item) => ({
      label: `${item.type} (${item.count})`,
      value: item.type,
    }));
  };
  console.log("renderOptions", renderOptions)
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
            Sản phẩm
          </Typography>
          {/* <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button> */}
        </Stack>
        <Button>
          <FontAwesomeIcon icon={faPlus} onClick={showModal} />
        </Button>
        <TableComponent
          handleDelteMany={handleDelteManyProducts}
          columns={columns}
          data={dataTable}
          isLoading={isLoadingProducts}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
        <ModalComponent
          forceRender
          title="Tạo sản phẩm mới"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Loading isLoading={isLoading}>
            <Form
              name="form1"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
              autoComplete="on"
              form={form}
            >
              <Form.Item
                label="Name"
                name="Name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <InputComponent
                  value={stateProduct.name}
                  onChange={handleOnChange}
                  name="name"
                />
              </Form.Item>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please input your type!" }]}
              >
                <Select
                  name="type"
                  style={{ width: "100%" }}
                  value={stateProduct.type}
                  onChange={handleChangeSelect}
                  options={[
                    ...renderOptions(typeProduct?.data?.data),
                    { label: "Add new type", value: "add_type" },
                  ]}
                />
              </Form.Item>
              {stateProduct.type === "add_type" && (
                <Form.Item
                  label="New type"
                  name="newType"
                  rules={[{ required: true, message: "Please input your type!" }]}
                >
                  <InputComponent
                    value={stateProduct.newType}
                    onChange={handleOnChange}
                    name="newType"
                  />
                </Form.Item>
              )}

              <Form.Item
                label="Count inStock"
                name="countInStock"
                rules={[
                  {
                    required: true,
                    message: "Please input your countInStock!",
                  },
                ]}
              >
                <InputComponent
                  value={stateProduct.countInStock}
                  onChange={handleOnChange}
                  name="countInStock"
                />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Please input your price!" },
                ]}
              >
                <InputComponent
                  value={stateProduct.price}
                  onChange={handleOnChange}
                  name="price"
                />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
              // rules={[{ required: true, message: 'Please input your Description!' }]}
              >
                <ReactQuill
                  theme="snow"
                  value={stateProduct.description}
                  onChange={handleOnchangeCKeditorNew}
                />
                {/* <CKEditor editor={ClassicEditor} data={data} 
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  "height",
                  "200px",
                  editor.editing.view.document.getRoot()
                );
              });
            }}
            onChange = {(event, editor) => {

              const data = editor.getData();

             setStateProduct({...stateProduct, descriptionCkData: data});
            }}
            ></CKEditor> */}
                {/* <CKeditor 
             type="text"
            //  className="form-control"
            //  id="NoiDung"
            // name="description"
             value={stateProduct.description}
             onChange={handleOnChange}
            /> */}
                {/* <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" /> */}
              </Form.Item>
              <Form.Item
                label="Discount"
                name="discount"
                rules={[
                  { required: true, message: "Please input your discount!" },
                ]}
              >
                <InputComponent
                  value={stateProduct.discount}
                  onChange={handleOnChange}
                  name="discount"
                />
              </Form.Item>

              <Form.Item
                label="Rating"
                name="rating"
                rules={[
                  { required: true, message: "Please input your Rating!" },
                ]}
              >
                <InputComponent
                  value={stateProduct.rating}
                  onChange={handleOnChange}
                  name="rating"
                />
              </Form.Item>

              <Form.Item
                label="Image"
                name="image"
                rules={[
                  { required: true, message: "Please input your Rating!" },
                ]}
              >
                <Upload onChange={handleOnchangeAvatar} maxCount={1} accept=".jpg, .jpeg, .png, .webp">
                  <Button>Select File</Button>
                  {stateProduct.image && (
                    <img
                      src={stateProduct.image}
                      alt={stateProduct.image}
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

              <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Loading>
        </ModalComponent>
        <DrawerComponent
          title="Chi tiết sản phẩm"
          isOpen={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
          width="60%"
        >
          <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
            <Form
              name="form2"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ maxWidth: 600 }}
              onFinish={onUpdateProduct}
              autoComplete="on"
              form={form}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <InputComponent
                  value={stateProductDetails.name}
                  onChange={handleOnchangeDetails}
                  name="name"
                />
              </Form.Item>

              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please input your Type!" }]}
              >
                <InputComponent
                  value={stateProductDetails["type"]}
                  onChange={handleOnchangeDetails}
                  name="type"
                />
              </Form.Item>

              <Form.Item
                label="Count inStock"
                name="countInStock"
                rules={[
                  {
                    required: true,
                    message: "Please input your countInStock!",
                  },
                ]}
              >
                <InputComponent
                  value={stateProductDetails.countInStock}
                  onChange={handleOnchangeDetails}
                  name="countInStock"
                />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Please input your price!" },
                ]}
              >
                <InputComponent
                  value={stateProductDetails.price}
                  onChange={handleOnchangeDetails}
                  name="price"
                />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input your Description!" },
                ]}
              >
                <ReactQuill
                  theme="snow"
                  value={stateProductDetails.description}
                  onChange={handleOnchangeCKeditor}
                />
                {/* <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description" /> */}
              </Form.Item>
              <Form.Item
                label="Rating"
                name="rating"
                rules={[
                  { required: true, message: "Please input your Rating!" },
                ]}
              >
                <InputComponent
                  value={stateProductDetails.rating}
                  onChange={handleOnchangeDetails}
                  name="rating"
                />
              </Form.Item>
              <Form.Item
                label="Discount"
                name="discount"
                rules={[
                  { required: true, message: "Please input your discount!" },
                ]}
              >
                <InputComponent
                  value={stateProductDetails.discount}
                  onChange={handleOnchangeDetails}
                  name="discount"
                />
              </Form.Item>

              <Form.Item
                label="Image"
                name="image"
                rules={[
                  { required: true, message: "Please input your Rating!" },
                ]}
              >
                <Upload fileList={fileList} onChange={handleOnchangeAvatarDetails} maxCount={1} accept=".jpg, .jpeg, .png">
                  <Button>Select File</Button>
                  {stateProductDetails.image && (
                    <img
                      src={stateProductDetails.image}
                      alt={stateProductDetails.image}
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
          onOk={handleDeleteProduct}
        >
          <Loading isLoading={isLoadingDeleted}>
            <div>Bạn có chắc xóa sản phẩm này không?</div>
          </Loading>
        </ModalComponent>
      </Container>
    </>
  );
};

export default AdminProduct;
