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
    axios.get("http://back.satr.net.sa/api/admin/integrations", {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }).then((res) => {
      setData(res.data);
    }).catch((err) => {
      message.err(`Failed to save data`);
    });
  }, [idToken]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Long Description',
      dataIndex: 'long_des',
      key: 'long_des',
    },
    {
      title: 'Description',
      dataIndex: 'des',
      key: 'des',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: 'Image',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (text, record) => <Image src={text} width={100} />,
    },
    {
      title: 'Media',
      dataIndex: 'media',
      key: 'media',
      render: (media) =>
        media && media.length > 0 ? (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Descriptions bordered size="small" column={1}>
              {media.map((item, index) => (
                <Fragment key={index}>
                  <Descriptions.Item label="Model Type">{item.model_type || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="UUID">{item.uuid || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Collection Name">{item.collection_name || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Name">{item.name || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="File Name">{item.file_name || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Mime Type">{item.mime_type || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Disk">{item.disk || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Conversions Disk">{item.conversions_disk || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Size">{item.size ? `${(item.size / 1024).toFixed(1)} KB` : 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Manipulations">{item.manipulations || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Custom Properties">{item.custom_properties || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Generated Conversions">{item.generated_conversions || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Responsive Images">{item.responsive_images || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Order Column">{item.order_column || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Created At">{item.created_at || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Updated At">{item.updated_at || 'No media'}</Descriptions.Item>
                  <Descriptions.Item label="Original Image">
                    <Image src={item.original_url } width={80} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Preview Image">
                    <Image src={item.preview_url } width={80} />
                  </Descriptions.Item>
                </Fragment>
              ))}
            </Descriptions>
          </div>
        ) : (
          'No media'
        ),
    },
    {
        title: 'Action',
        render : (text , record) =>   <Button 
        onClick={() => navigate(`/dashboard/Integrations/edit/${record.id}`, { })}><FormattedMessage id='edit' /></Button>
            },
  ];

  return (
    <div>
      <h1 className="text-3xl  font-bold ">
        <FormattedMessage id="integrations" />
      </h1>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default page;
