import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button , Form , Input , message , Upload } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useForm } from 'antd/es/form/Form';
import { FormattedMessage } from 'react-intl';

const Page = () => {

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
        axios.get(`http://back.satr.net.sa/api/admin/service-lists/${params.id}`,
            { headers: { Authorization: `Bearer ${idToken}` } }


        ).then((res) => {

          const data = res.data
            form.setFieldsValue ({
                title : data.title ,
                des : data.des,
                created_at : data.created_at,
                updated_at : data.updated_at,
                name : data?.service?.name,
            })
            
        }).catch((err) => {
            console.error(err);
        });
    }, []);

   const request = (values) => {
  setLoading(true);

 
  axios.put(`http://back.satr.net.sa/api/admin/service-lists/${params.id}`, values, {
    headers: {
      Authorization: `Bearer ${idToken}`,
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



    return (
        <div>
            <Form onFinish={request} layout='vertical' form={form}>
                <Form.Item
                    label={<FormattedMessage id='title' />} name={"title"}
                    rules={[{ required: true, message: 'please Enter title' }]}>
                    <Input size='large' placeholder='please Enter title' />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='des' />} name={"des"}
                    rules={[{ required: true, message: 'please Enter des' }]}>
                    <Input size='large' placeholder='please Enter des' />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='created_at' />} name={"created_at"}
                    rules={[{ required: true, message: 'please Enter Created at' }]}>
                    <Input size='large' disabled />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='updated_at' />} name={"updated_at"}
                    rules={[{ required: true, message: 'please Enter Updated at' }]}>
                  <Input size='large' disabled />
                </Form.Item>
                <Form.Item
                style={{ marginBottom: -20 }}
                    label={<FormattedMessage id='service' />} name={"service"}
                    rules={[{ required: true, message: 'please Enter service' }]}>
                </Form.Item>
              <Form.Item
                    label={<FormattedMessage id='name' />} name={"name"}
                    rules={[{ required: true, message: 'please Enter name' }]}>
                    <Input size='large' placeholder='please Enter name' />
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



