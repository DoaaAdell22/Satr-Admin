import axios from 'axios';
import { message  } from 'antd';
import React, { Fragment , useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Divider } from 'antd';
import {  Button,  Form, Input , Space } from 'antd';
import {MinusCircleOutlined,PlusOutlined} from "@ant-design/icons"
import { FormattedMessage } from 'react-intl';

const page = () => {
    const [loading , setLoading] =useState(false)
    const [form] = Form.useForm();
    const idToken = useSelector(state => state.Auth.idToken);
    const onFinish = (values) => {
      axios.post("https://backend.masrad.com.sa/api/admin/update-about-page" , values ,
        { headers : {
          Authorization:`Bearer ${idToken}`
          }}
      ).then((res)=>{
        message.success(res.data.message)
      }).catch(()=>{})
    }
    useEffect(() => {
        axios.get("https://backend.masrad.com.sa/api/admin/show-about-page" , 
            { headers : {
            Authorization:`Bearer ${idToken}`
            }}
        ).then((res) => {
            form.setFieldsValue({
                ...res.data.data[0]
                
            })
             
            }).catch((err) => {
                
                message.err(`Failed to save data`)
            })
    }, []);


  return (
    <div>
        <h1 className='text-3xl font-bold '><FormattedMessage id='about' /></h1>
        <div className='flex flex-col items-end justify-center  text-center'>
            <Form
            name="basic"
            form={form}
            layout='vertical'
            style={{ width: '100%' }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off">
            <Divider >القسم 1</Divider>
            <Form.Item 
              label="العنوان"
              name="title_sec1"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
               label="الوصف"
              name="des_sec1"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
            <Input.TextArea />
            </Form.Item>
            <Divider >القسم 2</Divider>
            <Form.Item 
              label="العنوان"
              name="title_sec2"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
               label="الوصف"
              name="des_sec2"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
            <Input.TextArea />
            </Form.Item>
            <h3 className='mb-3'>عناصر القسم</h3>

            <Form.List name="nums_sec2">
        {(fields, { add, remove }) => (
          <Fragment>
            {fields.map(({ key, name, ...restField } , index) => (
              <div key={key} style={{ display: 'flex',gap:10, marginBottom: 8,width:"100%" }} align="baseline">
              <div className='flex flex-col w-[calc(100%_-_50px)]'> 
              {/* <Form.Item
                hidden
                initialValue={`slug-${index}`}
                  {...restField}
                  name={[name, 'slug']}
                  rules={[{ required: true }]}
                >
                  <Input 
                    />
                </Form.Item>                */}
              <Form.Item
                  {...restField}
                  name={[name, 'text']}
                  rules={[{ required: true }]}
                >
                  <Input  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'nums']}
                  rules={[{ required: true }]}
                >
                  <Input  />
                </Form.Item>
                <Divider />

                </div>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                اضافة
              </Button>
            </Form.Item>
          </Fragment>
        )}
      </Form.List>
            <Divider >القسم 3</Divider>
            <Form.Item 
              label="العنوان"
              name="title_sec3"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
               label="الوصف"
              name="des_sec3"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
            <Input.TextArea />
            </Form.Item>
            <Divider >القسم 4</Divider>
            <Form.Item 
              label="العنوان"
              name="title_sec4"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
               label="الوصف"
              name="des_sec4"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
            <Input.TextArea />
            </Form.Item>
            
            <Divider >القسم 5</Divider>
            <Form.Item 
              label="العنوان"
              name="title_sec5"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
               label="الوصف"
              name="des_sec5"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
            <Input.TextArea />
            </Form.Item>
            <Divider >القسم 6</Divider>
            <Form.Item 
              label="العنوان"
              name="title_sec6"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
               label="الوصف"
              name="des_sec6"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
            <Input.TextArea />
            </Form.Item>
            <Divider >القسم 7</Divider>
            <Form.Item 
              label="العنوان"
              name="title_sec7"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
               label="الوصف"
              name="des_sec7"
              rules={[{ required: true, message: 'This field is required ' }]}
            >
            <Input.TextArea />
            </Form.Item>
            <Form.Item className='text-center' >
      <Button className='px-8' type="primary" size='large' htmlType="submit">
        <FormattedMessage id='edit' />
      </Button>
    </Form.Item>
        </Form>
        </div>
    </div>
  )
}

export default page
