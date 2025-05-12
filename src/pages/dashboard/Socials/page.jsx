import axios from 'axios';
import { Button , Form , Input , message , Upload } from 'antd';
import React, { Fragment , useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Divider } from 'antd';
import {MinusCircleOutlined,PlusOutlined} from "@ant-design/icons"
import { FormattedMessage } from 'react-intl';
import { Table  } from 'antd';
import { useNavigate } from 'react-router-dom';

const page = () => {
    const [data , setData] =useState([])
      const navigate = useNavigate()

    const [loading , setLoading] =useState(false)
    const [form] = Form.useForm();
    const idToken = useSelector(state => state.Auth.idToken);
  
   useEffect(()=>{
  axios.get("http://back.satr.net.sa/api/admin/socials" , 
            { headers : {
            Authorization:`Bearer ${idToken}`
            }}
        ).then((res) => {
            const socials = res.data.data;
      setData(socials);
      form.setFieldsValue({ socials });         
        }).catch((err) => {
                
                message.err(`Failed to save data`)
            })
   } ,[] )

    

   
  const handler = (values) => {
    
    axios.post(`http://back.satr.net.sa/api/admin/socials/${params.id}`, values, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then(() => {
        message.success('تم الحفظ بنجاح');
      })
      .catch(() => {
        message.error('فشل الحفظ');
      });
  };


 
      

  return (
    <div>
        <h1 className='text-3xl font-bold '><FormattedMessage id='Socials' /></h1>
 <Form onFinish={handler} layout='vertical' form={form}>
                 {data.map((el, index) => (
    <Fragment key={index}>
      <Form.Item
  label="الاسم"
  name={['socials', index, 'name']}
        rules={[{ required: true, message: 'الرابط مطلوب' }]}
      >
        <Input size="large" placeholder={el.name} />
      </Form.Item>
      <Form.Item
  label="الرابط"
  name={['socials', index, 'link']}
        rules={[{ required: true, message: 'الرابط مطلوب' }]}
      >
        <Input size="large" placeholder={el.link} />
      </Form.Item>
      <Form.Item
  label="تاريخ الإنشاء"
  name={['socials', index, 'created_at']}
        rules={[{ required: true, message: 'الرابط مطلوب' }]}
      >
        <Input size="large" placeholder={el.created_at} />
      </Form.Item>
      <Form.Item
  label="تاريخ التحديث"
  name={['socials', index, 'updated_at']}
        rules={[{ required: true, message: 'الرابط مطلوب' }]}
      >
        <Input size="large" placeholder={el.updated_at} />
      </Form.Item>
      <Form.Item className='text-center' >
                  <Button className='px-8' type="primary" size='large' htmlType="submit">
                    <FormattedMessage id='edit' />
                  </Button>
                </Form.Item> 
      <hr />
    </Fragment>
  ))}
  
                </Form></div>
  )
}

export default page
