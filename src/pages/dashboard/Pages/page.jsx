import axios from 'axios';
import { message  } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import {  Button} from 'antd';
import { FormattedMessage } from 'react-intl';
import { Table  } from 'antd';
import { useNavigate } from 'react-router-dom';

const page = () => {
    const [data , setData] =useState([])
      const navigate = useNavigate()

    const [loading , setLoading] =useState(false)
    const idToken = useSelector(state => state.Auth.idToken);
   
    useEffect(() => {
      setLoading(true)
        axios.get("http://back.satr.net.sa/api/admin/pages" , 
            { headers : {
            Authorization:`Bearer ${idToken}`
            }}
        ).then((res) => {
            setData(res.data)
            }).catch((err) => {
                message.err(`Failed to save data`)
            }).finally(()=>{
                    setLoading(false)
            })
    }, []);




 
      const columns = [
        {
          title : <FormattedMessage id='name' />,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title : <FormattedMessage id='long_des' />,
          dataIndex: 'long_des',
          key: 'long_des',
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
          title : <FormattedMessage id='actions' />,
          render : (text , record) =>   <Button 
            onClick={() => navigate(`/dashboard/Pages/edit/${record.id}`, { })}><FormattedMessage id='edit' /></Button>
        },
      ];
      

  return (
    <div>
        <h1 className='text-3xl font-bold '><FormattedMessage id='Pages' /></h1>
            <Table dataSource={data} columns={columns} loading={loading}/>
    </div>
  )
}

export default page
