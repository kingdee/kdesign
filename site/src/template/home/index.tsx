import React, { ComponentType } from 'react'
import { Link, withRouter as withRouterComponent } from 'bisheng/router'
import Footer from './../layout/footer'
import { Button } from 'kdesign'
import Star from './component/Star'
import Keyboard from './component/Keyboard'
import Inter from './component/Inter'
import Load from './component/Load'
import Img from '../../static/image/banner_index.png'

export function withRouter<P, C extends ComponentType<P>>(target: C & React.ComponentType<P>): any {
  return withRouterComponent(target)
}

const inforList = [
  { img: '', title: '主题定制', infor: '支持页面模版，组件属性，主题色，icon替换等系统级别定制' },
  { img: '', title: '全键盘', infor: '组件支持键盘操作，快速录入表单' },
  { img: '', title: '国际化', infor: '提供可定制的国际化方案' },
  { img: '', title: '按需加载', infor: '默认支持基于 ES modules 的 tree shaking， 直接引入组件即可按需加载' },
]
function ListItem(props: any) {
  // console.log(props.value.img)
  let list
  if (props.index === 0) list = <Star style={{ width: '80px', height: '80px' }}></Star>
  else if (props.index === 1) list = <Keyboard style={{ width: '80px', height: '80px' }}></Keyboard>
  else if (props.index === 2) list = <Inter style={{ width: '80px', height: '80px' }}></Inter>
  else if (props.index === 3) list = <Load style={{ width: '80px', height: '80px' }}></Load>

  return (
    <div className="item">
      <div className="item_card">
        {list}
        {/* <img src={props.value.img} style={{ width: '80px', height: '80px' }} /> */}
        <h3>{props.value.title}</h3>
        <p>{props.value.infor}</p>
      </div>
    </div>
  )
}

function InforList(props: any) {
  const numbers = props.numbers
  const listItems = numbers.map((number: any, index: number) => {
    return <ListItem key={number.title} value={number} index={index} />
  })
  return <div className="wrapper">{listItems}</div>
}
class Home extends React.Component {
  componentDidMount() {
    document.title = '首页 - KDesign React'
  }

  render() {
    return (
      <div className="home home-container">
        <div className="home-banner">
          <div className="home-banner-holder">
            <div className="home-banner-content">
              <div className="home-banner-content-title">
                <h2 className="home-banner-text">一套基于KDESIGN的 企业级React UI组件库</h2>
                <Link to="/components/overview">
                  <Button type="primary">查看详情</Button>
                </Link>
              </div>
            </div>
            <div className="home-banner-img">
              <img src={Img} alt="" />
            </div>
          </div>
        </div>
        <div className="home-content">
          <div className="home-block-content">
            <h2 className="title">方案能力</h2>
            <InforList numbers={inforList} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default withRouter(Home)
