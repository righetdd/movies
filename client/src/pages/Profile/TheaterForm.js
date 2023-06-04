import React from 'react';
import { Form, message, Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { AddTheater, UpdateTheater } from "../../apicalls/theaters";

const { TextArea } = Input;

function TheaterForm({
  showTheaterFormModal,
  setShowTheaterFormModal,
  formType,
  setFormType,
  selectedTheater,
  setSelectedTheater,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    values.owner = user._id;
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        response = await AddTheater(values);
      } else {
        values.theaterId = selectedTheater._id;
        response = await UpdateTheater(values);
      }

      if (response.success) {
        message.success(response.message);
        setShowTheaterFormModal(false);
        setSelectedTheater(null);
        getData();
      } else {
        message.error(response.message);
      }
       
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={showTheaterFormModal}
      onCancel={() => {
        setShowTheaterFormModal(false);
        setSelectedTheater(null);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedTheater}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input theater name!" }]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input theater address!" }]}
        >
         <TextArea type="text" rows={2}/>
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please input theater phone number!" },
          ]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input theater email!" }]}
        >
          <input type="text" />
        </Form.Item>
        <div className="flex justify-end gap-1">
          <Button
            title="Cancel"
            variant="outlined"
            type="button"
            onClick={() => {
              setShowTheaterFormModal(false);
              setSelectedTheater(null);
            }}
          />
          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default TheaterForm;