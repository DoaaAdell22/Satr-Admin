import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd'
import { useEffect } from 'react';

function RollerLoading() {
  return (

<div className='flex flex-col items-center relative'>
   <div className='drop-shadow-xl '>
   <Spin size='large' className='dark:text-[burlywood] absolute inset-1/2 translate-x-[15px] translate-y-[-18px]'/>

   </div>
 </div>
  )
}

export default RollerLoading

