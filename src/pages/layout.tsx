import HomeLayoutAnimation from "components/AnimationLayout/home-layout-animation"


function Layout({children}:any) {





  return (<div className="relative antialiased text-slate-500 dark:text-slate-400 bg-[#fafafa] dark:bg-slate-900">
        <div className="backdrop-blur ">
        {children}
        </div>
  </div>
  )
}
export default Layout