import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, Modal } from "antd";
import React, { FC, useState } from "react";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

/**
 * 编辑图床分区模态框
 * @returns
 */
const EditButtonAndModal: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form?.validateFields();
      console.log(`[yanle] - values`, values);
    } catch (e) {
      console.log(`[yanle] - 表单校验错误`, e);
    }

    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>编辑</Button>

      <Modal
        width={600}
        title="添加图库链接 - 支持添加多个 "
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form initialValues={{ links: [""] }} form={form} name="dynamic_form_item" {...formItemLayoutWithOutLabel}>
          <Form.List
            name="links"
            rules={[
              {
                validator: async (_, links) => {
                  if (!links || links.length < 1) {
                    return Promise.reject(new Error("至少要有一个链接地址"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? "链接地址" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "请输入掘金草稿文档链接地址",
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder="请输入掘金草稿文档链接地址" style={{ width: "90%" }} />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined className="dynamic-delete-button pl-2" onClick={() => remove(field.name)} />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} style={{ width: "90%" }} icon={<PlusOutlined />}>
                    添加字段
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default EditButtonAndModal;
