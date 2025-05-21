import React, { useState  } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Button , Form , Input , InputNumber, message , Select , Upload} from 'antd';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import instance from 'utlis/library/helpers/axios';
import { PlusOutlined } from '@ant-design/icons';
const page = () => {
    const [loading , setLoading] = useState(false)
    const idToken = useSelector(state => state.Auth.idToken);
    const language = useSelector(state => state.LanguageSwitcher.language);
    const navigate = useNavigate()
    const params = useParams();

const [form] = Form.useForm();


    const backHandler = () =>{
        
        return navigate(-1)
        }



       
  
  const request = (values) => {
  
       
  
                setLoading(true)
                axios.post("http://back.satr.net.sa/api/admin/services" , values ,
                    {  headers: {
                    Authorization: `Bearer ${idToken}`,
                        }, }
                    
                ).then((res)=>{
                setLoading(false)
                message.success(res.data.message)
                setTimeout(() => {
                backHandler();
                } , 2000)
                }
                ).catch((err)=>{
                    setLoading(false)
                    message.err('failed added')
                })
                    

            }
                


            

    return (
    <div>
            <Form onFinish={request} layout='vertical'  form={form}>
            <Form.Item
            label={<FormattedMessage id='name' />} name={"name"}
            rules={[
                {
                    required : false,
                    message:'please Enter name'
                }
                ]}>
            <Input size='large' placeholder='please Enter name' />
            
            </Form.Item>
    
            <Form.Item className='text-center' >
            <Button loading={loading}
            className="custom-table px-5"   htmlType='submit' type='primary'><FormattedMessage id='add' /></Button>
            </Form.Item>
        </Form>
    </div> 
  )
}

export default page