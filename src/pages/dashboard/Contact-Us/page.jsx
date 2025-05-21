import axios from 'axios';
import { message  } from 'antd';
import React, { Fragment , useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Divider } from 'antd';
import {  Button,  Form, Input , Space } from 'antd';
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
  
    useEffect(() => {
        axios.get("http://back.satr.net.sa/api/admin/contact-us" , 
            { headers : {
            Authorization:`Bearer ${idToken}`
            }}
        ).then((res) => {
            setData(res.data.data)
             
            }).catch((err) => {
                
                message.err(`Failed to save data`)
            })
    }, []);




 
      const columns = [
        {
          title : <FormattedMessage id='name' />,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title : <FormattedMessage id='phone' />,
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title : <FormattedMessage id='email' />,
          dataIndex: 'email',
          key: 'email',
        },
        {
          title : <FormattedMessage id='Message' />,
          dataIndex: 'message',
          key: 'message',
        },
        {
          title : <FormattedMessage id='created_at' />,
          dataIndex: 'created_at',
          key: 'created_at',
        },
        {
          title : <FormattedMessage id='updated_at' />,
          dataIndex: 'updated_at',
          key: 'updated_at',
        },
       
      ];
      

  return (
    <div>
        <h1 className='text-3xl font-bold '><FormattedMessage id='Contact-us' /></h1>
            <Table dataSource={data} columns={columns} />
    </div>
  )
}

export default page
