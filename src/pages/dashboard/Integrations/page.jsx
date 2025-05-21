import axios from 'axios';
import { Image, message, Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Button, Table } from 'antd';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
const page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const idToken = useSelector(state => state.Auth.idToken);

  useEffect(() => {
    setLoading(true)
    axios.get("http://back.satr.net.sa/api/admin/integrations", {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }).then((res) => {
      setData(res.data);
    }).catch((err) => {
      message.err(`Failed to save data`);
    }).finally(()=>{
          setLoading(false)
    });
  }, [idToken]);

  const columns = [
    {
      title : <FormattedMessage id='title' />,
      dataIndex: 'title',
      key: 'title',
    },
    {
          title : <FormattedMessage id='short-des' />,
      dataIndex: 'short_des',
      key: 'short_des',
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
      title : <FormattedMessage id='image' />,
      dataIndex: 'image_url',
      key: 'image_url',
      render: (text, record) => <Image src={text} width={100} />,
    },
    // {
    //   title : <FormattedMessage id='media' />,
    //   dataIndex: 'media',
    //   key: 'media',
    //   render: (media) =>
    //     media && media.length > 0 ? (
    //       <div >
    //         <Descriptions bordered size="small" column={1}>
    //           {media.map((item, index) => (
    //             <Fragment key={index}>
    //               <Descriptions.Item  label={<FormattedMessage id='Original Image' />}>
    //                 <Image src={item.original_url } width={80} />
    //               </Descriptions.Item>
    //             </Fragment>
    //           ))}
    //         </Descriptions>
    //       </div>
    //     ) : (
    //       <FormattedMessage id='No-media' />
    //     ),
    // },
    {
        title : <FormattedMessage id='actions' />,
        render : (text , record) =>   <Button 
        onClick={() => navigate(`/dashboard/Integrations/edit/${record.id}`, { })}><FormattedMessage id='edit' /></Button>
            },
  ];

  return (
    <div>
      <h1 className="text-3xl  font-bold ">
        <FormattedMessage id="integrations" />
      </h1>
      <Table dataSource={data} columns={columns} loading={loading}/>
    </div>
  );
};

export default page;
