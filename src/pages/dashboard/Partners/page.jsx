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
 axios.get("http://back.satr.net.sa/api/admin/partners" , 
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
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        
        {
          title: 'Created at',
          dataIndex: 'created_at',
          key: 'created_at',
        },
        {
          title: 'Updated at',
          dataIndex: 'updated_at',
          key: 'updated_at',
        },
        {
          title: 'Image',
          dataIndex: 'image_url',
          key: 'image_url',
          render : (text) => <Image src={text}  width={100} />
        },
        {
          title: 'media',
          dataIndex: 'media',
          key: 'media',
        
        },
        {
          title: 'Action',
          render : (text , record) => 
          (
            <div className='flex gap-3'>
            <Button 
            onClick={() => navigate(`/dashboard/Partners/edit/${record.id}`, { })}><FormattedMessage id='edit' /></Button>
            <Button loading={click === record.id} danger  onClick={()=>{deleteHandler(record.id)}} ><FormattedMessage id='delete' /></Button>
            </div>
          )
          
        },
      ];
      
const deleteHandler = (id) => {
    setClick(id)
    axios.delete(`http://back.satr.net.sa/api/admin/partners/${id}` ,
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
        <h1 className='text-3xl font-bold '><FormattedMessage id='partners' /></h1>
              <Button type='primary'  onClick={()=>{navigate('/dashboard/Partners/add')}}>+<FormattedMessage id='add' / > </Button>
            <Table dataSource={data} columns={columns}       loading={loading} />
    </div>
  )
}

export default page






