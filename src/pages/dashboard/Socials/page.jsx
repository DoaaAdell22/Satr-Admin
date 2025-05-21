import axios from 'axios';
import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

const Page = () => {
  const [data, setData] = useState([]);
  const idToken = useSelector(state => state.Auth.idToken);
    const [loading , setLoading] =useState(null)

  useEffect(() => {
    axios.get("http://back.satr.net.sa/api/admin/socials", {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }).then(res => {
      setData(res.data.data);
    }).catch(() => {

    });
  }, []);

  const onFinish = (id, values) => {
    setLoading(id)
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', values.name);
    formData.append('link', values.link);

    axios.post(`http://back.satr.net.sa/api/admin/socials/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })
    .then((res) => {
      message.success(res.data.message);
    })
    .catch((err) => {
      message.error(res.data.message);
    }).finally(()=>{
          setLoading(false)

    })
    ;
  };

  return (
    <div>
      <h1 className='text-3xl font-bold'><FormattedMessage id='Socials' /></h1>
      {data.map((el) => (
        <Form
          key={el.id}
          layout="vertical"
          initialValues={{ name: el.name, link: el.link }}
          onFinish={(values) => onFinish(el.id, values)}
        >
          <Form.Item
            label={<FormattedMessage id='name' />} name={"name"}
            rules={[{ required: true, message: 'please Enter name' }]}>
            <Input size='large' placeholder='please Enter name' />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id='link' />} name={"link"}
            rules={[{ required: true, message: 'please Enter link' }]}>
            <Input size='large' placeholder='please Enter link' />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit"              
             loading={loading === el.id}>
              <FormattedMessage id='edit' />
            </Button>
          </Form.Item>

          <hr style={{ margin: '20px 0' }} />
        </Form>
      ))}
    </div>
  );
};

export default Page;
