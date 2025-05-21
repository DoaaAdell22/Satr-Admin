import ScrollerRenderView from 'components/scroller-render-view'
import MyMenu from '../menu'
import { motion } from 'framer-motion'
import { theme } from 'antd';
import { Link } from 'react-router-dom';

function SubSide({ width , collapsed, variantsSubSide}:{width:ISIdeWidth ,collapsed:boolean ,variantsSubSide:any}) {
  const { token } = theme.useToken();

  return (
    <motion.div
    variants={variantsSubSide}
    style={{
      backgroundColor: token.colorBgContainer,
      width:width.sub
    }}

    className={` box-border inset-y-0  border-r-2 border-indigo-100 shadow-md   `}>
<div className="flex items-center justify-center flex-shrink-0 py-8">
  <Link to={'/'} target="_blank">
  <img
      className="w-24 h-auto"
      src="/Logo-Satr.png"
      width={170}
      height={39}
      alt="masrad-admin"
    />
  </Link>
</div>
<ScrollerRenderView
className={`!h-[calc(100dvh_-_106px)]`}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
<div className='px-4 '>

        <MyMenu collapsed={collapsed} />
</div>
      </ScrollerRenderView>
    </motion.div>

  )
}

export default SubSide