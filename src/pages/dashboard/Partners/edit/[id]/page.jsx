import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button , Form , Input , message , Upload } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useForm } from 'antd/es/form/Form';
import { FormattedMessage } from 'react-intl';
import { PlusOutlined } from '@ant-design/icons';

const Page = () => {
      const [fileList, setFileList] = useState([])

    const [form] = useForm();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const idToken = useSelector(state => state.Auth.idToken);
    const navigate = useNavigate();
    const language = useSelector(state => state.LanguageSwitcher.language);

    const backHandler = () => {
        return navigate(-1);
    }

    useEffect(() => {
        axios.get(`http://back.satr.net.sa/api/admin/partners/${params.id}`,
            { headers: { Authorization: `Bearer ${idToken}` } }
        ).then((res) => {
            form.setFieldsValue ({
                ...res.data
            })
            
        }).catch((err) => {
            console.error(err);
        });
    }, []);

   const handler = (values) => {
  setLoading(true);

  const formData = new FormData();
  formData.append('name', values.name);
  formData.append('created_at', values.created_at);
  formData.append('updated_at', values.updated_at);

  if (values.image && values.image.length > 0) {
    formData.append('image', values.image[0].originFileObj);
  }

  axios.put(`http://back.satr.net.sa/api/admin/partners/${params.id}`, formData, {
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => {
    message.success(res.data.message);
    setLoading(false);
    setTimeout(() => {
      backHandler();
    }, 2000);
  }).catch((err) => {
    setLoading(false);
    message.error('Failed to update');
  });
};


  const handleChange = ({ fileList }) => {
  if (fileList.length <= 1) {
    setFileList(fileList);
    form.setFieldsValue({ image: fileList });
  } else {
    message.error('You can only upload a maximum of 1 image');
  }
};


    return (
        <div>
            <Form onFinish={handler} layout='vertical' form={form}>
                <Form.Item
                    label={<FormattedMessage id='name' />} name={"name"}
                    rules={[{ required: true, message: 'please Enter name' }]}>
                    <Input size='large' placeholder='please Enter name' />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='created_at' />} name={"created_at"}
                    rules={[{ required: true, message: 'please Enter Created at' }]}>
                    <Input size='large' placeholder='please Enter Created at' />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='updated_at' />} name={"updated_at"}
                    rules={[{ required: true, message: 'please Enter Updated at' }]}>
                    <Input size='large' placeholder='please Enter Updated at' />
                </Form.Item>
               <Form.Item
  label={<FormattedMessage id='image' />}
  name="image"
  valuePropName="fileList"
  getValueFromEvent={(e) => e?.fileList}
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

                <Form.Item className='text-center' >
                <Button className='px-8' type="primary" size='large' htmlType="submit">
                  <FormattedMessage id='edit' />
                </Button>
              </Form.Item>   
            </Form>
        </div>
    )
}

export default Page;



