import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, message, Upload } from 'antd';
import { useSelector } from "react-redux";
import { useForm } from 'antd/es/form/Form';
import { FormattedMessage } from 'react-intl';
import { PlusOutlined } from '@ant-design/icons';

const Page = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const params = useParams();
  const idToken = useSelector(state => state.Auth.idToken);
  const navigate = useNavigate();

  const backHandler = () => navigate(-1);

  useEffect(() => {
    axios.get(`http://back.satr.net.sa/api/admin/integrations/${params.id}`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })
    .then((res) => {
      form.setFieldsValue({
        title: res.data.title,
        short_des: res.data.short_des,
        des: res.data.des,
        created_at: res.data.created_at,
        updated_at: res.data.updated_at,
      });

      if (res.data.image_url) {
        const imageItem = {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: res.data.image_url,
        };
        setFileList([imageItem]);
        form.setFieldsValue({ image: [imageItem] });
      }
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
    });
  }, []);

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    form.setFieldsValue({ image: fileList });
  };

  const handler = (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('title', values.title);
    formData.append('short_des', values.short_des);
    formData.append('des', values.des);
    formData.append('created_at', values.created_at || '');
    formData.append('updated_at', values.updated_at || '');

    if (values.image && values.image[0]?.originFileObj) {
      formData.append('image', values.image[0].originFileObj);
    }

    axios.post(`http://back.satr.net.sa/api/admin/integrations/${params.id}`, formData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      message.success('Data updated successfully');
      setTimeout(() => {
        backHandler();
      }, 2000);
    })
    .catch((err) => {
      message.error('Failed to update data');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div>
      <Form onFinish={handler} layout="vertical" form={form}>
        <Form.Item
          label={<FormattedMessage id='title' />}
          name="title"
          rules={[{ required: true, message: 'Please enter title' }]}
        >
          <Input size="large" placeholder="Please enter title" />
        </Form.Item>

        <Form.Item
          label={<FormattedMessage id='short_des' />}
          name="short_des"
          rules={[{ required: true, message: 'Please enter short description' }]}
        >
          <Input size="large" placeholder="Please enter short description" />
        </Form.Item>

        <Form.Item
          label={<FormattedMessage id='des' />}
          name="des"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input size="large" placeholder="Please enter description" />
        </Form.Item>

        <Form.Item label={<FormattedMessage id='created_at' />} name="created_at">
          <Input disabled />
        </Form.Item>

        <Form.Item label={<FormattedMessage id='updated_at' />} name="updated_at">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label={<FormattedMessage id='image' />}
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => Array.isArray(e?.fileList) ? e.fileList : []}
          rules={[{ required: true, message: 'Please upload an image' }]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            onChange={handleChange}
            fileList={fileList}
            maxCount={1}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>
                  <FormattedMessage id='upload' />
                </div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item className="text-center">
          <Button className="px-8" type="primary" size="large" htmlType="submit" loading={loading}>
            <FormattedMessage id='edit' />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Page;
