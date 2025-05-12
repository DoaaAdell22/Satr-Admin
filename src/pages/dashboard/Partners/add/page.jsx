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
      const [fileList, setFileList] = useState([])

const [form] = Form.useForm();


    const backHandler = () =>{
        
        return navigate(-1)
        }



       
            const request = (values) => {
  console.log(values); 
                const formData = new FormData();
  formData.append('name', values.name);
  formData.append('created_at', values.created_at);
  formData.append('updated_at', values.updated_at);
  formData.append('media', values.media);


  if (values.image_url && values.image_url.length > 0) {
    formData.append('image', values.image_url[0].originFileObj);
  }

                setLoading(true)
                axios.post("http://back.satr.net.sa/api/admin/partners" , formData ,
                    {  headers: {
                    Authorization: `Bearer ${idToken}`,
                        'Content-Type': 'multipart/form-data',
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
            <Form.Item
            label={<FormattedMessage id='media' />} name={"media"}
            rules={[
                {
                    required : true,
                    message:'please Enter media'
                }
                ]}>
            <Input size='large' placeholder='please Enter media' />
            
            </Form.Item>
             <Form.Item
  label={<FormattedMessage id='image' />}
  name="image_url"
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
            <Button loading={loading}
            className="custom-table px-5"   htmlType='submit' type='primary'><FormattedMessage id='add' /></Button>
            </Form.Item>
        </Form>
    </div> 
  )
}

export default page