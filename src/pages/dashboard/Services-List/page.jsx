import axios from 'axios';
import { message  } from 'antd';
import React, { Fragment , useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Divider } from 'antd';
import {  Button,  Form, Input , Space } from 'antd';
import {MinusCircleOutlined,PlusOutlined} from "@ant-design/icons"
import { FormattedMessage } from 'react-intl';
import { Table  , Image } from 'antd';
import { useNavigate } from 'react-router-dom';

const page = () => {
    const [data , setData] =useState([])
      const navigate = useNavigate()
  const [click , setClick] = useState(null)

    const [loading , setLoading] =useState(false)
    const [form] = Form.useForm();
    const idToken = useSelector(state => state.Auth.idToken);
   

  const request = () =>{
 axios.get("http://back.satr.net.sa/api/admin/service-lists" , 
            { headers : {
            Authorization:`Bearer ${idToken}`
            }}
        ).then((res) => {
            setData(res.data)
              setLoading(false)
            }).catch((err) => {
                setLoading(false)
                message.err(`Failed to save data`)
            })
  }


    useEffect(() => {
        
    setLoading(true)

    
    request();
    }, []);





 
      const columns = [
        {
          title : <FormattedMessage id='title' />,
          dataIndex: 'title',
          key: 'title',
        },
        {
          title : <FormattedMessage id='des' />,
          dataIndex: 'des',
          key: 'des',
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
        {
          title : <FormattedMessage id='service' />,
          dataIndex: 'service',
          key: 'service',
          render : (text , record) => ( <span>Name : {record.service.name}</span>)
        },
        
      
        {
          title : <FormattedMessage id='actions' />,
          render : (text , record) => 
          (
            <div className='flex gap-3'>
            <Button 
            onClick={() => navigate(`/dashboard/Services-List/edit/${record.id}`, { })}><FormattedMessage id='edit' /></Button>
            <Button loading={click === record.id} danger  onClick={()=>{deleteHandler(record.id)}} ><FormattedMessage id='delete' /></Button>
            </div>
          )
          
        },
      ];
      
const deleteHandler = (id) => {
    setClick(id)
    axios.delete(`http://back.satr.net.sa/api/admin/service-lists/${id}` ,
      {
      headers: { Authorization: `Bearer ${idToken}` }
    })
    .then(() => {
      request();
    })
    .catch(() => {
    });
  };


  return (
    <div>
        <h1 className='text-3xl font-bold '><FormattedMessage id="Services-List" /></h1>
              <Button type='primary'  onClick={()=>{navigate('/dashboard/Services-List/add')}}>+<FormattedMessage id='add' / > </Button>
            <Table dataSource={data} columns={columns}       loading={loading} />
    </div>
  )
}

export default page






