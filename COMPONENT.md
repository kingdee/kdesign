# 新组件贡献指南
感谢你的宝贵时间，我们很高兴您有兴趣为 KDesign 做出贡献。此篇文档旨在帮助 开发者 在新组件开发上提供帮助

## 克隆仓库
1. 通过 [https://github.com/kdcloudone/kdesign](https://github.com/kdcloudone/kdesign) 访问我们的仓库，然后 Fork 此仓库到你的 Repositories。
2. 进入你的 Repositories 里面，找到 Fork 的 KDesign 项目，使用 `git clone` 指令克隆项目到你本地。

## 新组件开发
1. 使用编辑器打开克隆的 KDesign 项目，进入项目的根目录，运行 `yarn new newComponentName` 指令，生成指定的模板文件。
> **newComponentName** 是你新开发的组件名，比如你开发的组件是 button ，那么运行的指令就是 `yarn new button`。组件名使用小写英文，并使用'-'中划线链接，比如颜色选择器，组件名就是 **color-picker**
2. 在仓库根目录下执行 yarn，安装依赖。
3. 执行 yarn start 启动项目，默认会启动8003端口，你可以通过浏览器访问 [http://localhost:8003/components/overview](http://localhost:8003/components/overview).

## 模板目录说明

我们以开发 button 组件为例，下面是是运行 `yarn new button` 产生的模板目录。

```shell
├── __tests__
│   └── index.test.tsx // 单测文件
├── button.tsx        // 组件逻辑文件
├── demo              // 所有demo的md文件存放目录
│   └── basic.md      // demo文件
├── index.md         //  组件api说明
└── style            //  所有样式存放文件
    ├── index.less   //  组件样式文件
    ├── index.tsx
    ├── mixin.less   //  组件公用样式文件
    └── token.tsx   //  组件所有token定义文件
```

### 1. 组件逻辑文件说明
button.tsx 是组件的所有逻辑文件，模板只提供了基本的示例代码。具体大家可以参照目前组件库已有组件的写法，主体上有以下两点需要说明。

#### 全局化配置
全局化的所有默认配置文件存放在 `components/config-provider/compDefaultProps.tsx`, 模板内已经配了全局化配置的示例代码，如下

```js
import React, { FunctionComponentElement, useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'

export interface IButtonProps {
  style?: Record<string, unknown> // 内联样式
  className?: string // 样式名
  prefixCls?: string // 样式前缀
  disabled?: boolean // 是否禁用
}

const Button = (props: IButtonProps): FunctionComponentElement<IButtonProps> => {
  // prefixCls 是默认提供的类名前缀，默认值是'kd';
  // compDefaultProps存放了所有组件全局化配置的默认值，用户可以通过ConfigProvider这个组件区去做修改；
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  // 这里将用户传入的 props 和 Button 组件的全局化默认配置 userDefaultProps 做了合并处理，得到最终 Button 组件渲染的prop
  const buttonProps = getCompProps('Button', userDefaultProps, props)
  // 解构获取需要的操作的属性值 customPrefixcls最终组件的默认类名前缀，如果用户不通过ConfigProvider全局化配置传入，则默认为‘kd’，否则为用户传入值
  const { className, prefixCls: customPrefixcls, disabled, ...others } = buttonProps
  // 获取组件的基类样式前缀，此时buttonPrefixCls的值为 kd-button ，后续的Button组件的样式名都以此开头，使用中划线连接
  const buttonPrefixCls = getPrefixCls!(prefixCls, 'button', customPrefixcls)
  // 混合用户传入的类名 与 组件内部定义的样式名
  const buttonClass = classNames(buttonPrefixCls, className)
  return (
    <div className={buttonClass} disabled={disabled} {...others}>
      Clipboard, name is {props.prefixCls}
    </div>
  )
}

Button.displayName = 'Button'
export default Button
```

大家可参照上述每行的注释进行理解，开发时也可参照目前已有的组件写法进行参考。

#### 国际化

由于不是每个组件都有国际化的内容需要配置，所以模板内并没有提供国际化的代码示例，所有组件国际化的配置在 `components/locale/zh-CN.tsx` 这个文件内，目前 KDesign 组件库只提供了中文的语言包。

```diff
- const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
+ const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps, locale } = useContext(ConfigContext)

// buttonLangMsg获取的是在 `components/locale/zh-CN.tsx` 中定义的所有Button相关的国际化配置
+ const buttonLangMsg = locale.getCompLangMsg({ componentName: 'Button' })
```

进行国际化前你需要现在 `components/locale/zh-CN.tsx` 文件内定义 Button 组件，比如定义 Button.text 然后你就可以使用 `buttonLangMsg.text` 进行赋值操作

### 2. 样式文件说明
KDesign 使用less作为css预处理器，创建模板内的 style 文件夹存放的就是所有的样式文件。
- `index.less`这个文件是组件的左右样式文件，组件的所有样式都在这个文件，这个文件引入了组件的公有样式文件和token变量文件。此外你还能从`components/style/mixins` 和 `components/style/core/motion` 处引入全局定义的公有样式文件
- `mixin.less` 定义了组件使用需要的公有组件样式，这个文件内引入了组件所有暴露出去的token变量。
- `token.less` 文件定义了组件所有token变量，这个文件引入了全局的token变量，文件地址`components/style/themes/token.less`

#### 公用前缀
一般组件库会提供自定义类名的需求，所以在ConfigProvider中提供了改写全局样式的配置项 `prefixCls` , 针对样式文件的自定义类名，我们提供了一个less 变量 `@kd-prefix`, 大家可以在 `components/style/themes/default.less`找到它，这个文件定义了所有的全局的 less 变量。

#### 配置token
`token.less` 文件内定义了组件的全部token变量。下面是对token变量的一些规则说明，具体大家可以参考各组件内部的写法
- token被分为 9 个类别，分别是color、font、line-height、motion、radius、shadow、sizing、spacing、z-index，这些类别通过首字母排序。模板内注释了这些类别，大家按照分类在每个类别下进行书写。
- 模板内类别的注释在后面的token文档自动生成中起到标记作用，大家不要删除。对于此分类下面没有token变量的，可以删除此分类的注释。
- token分为全局级token和组件级token，全局级token以 `--kd-g-` 开头，组件级token以 `--kd-c-` 开头，全局级token定义在 `components/style/themes/token.less` 这个文件内
- token变量是基于css自定义属性来实现的，写法就是使用var函数来声明。组件级token指此变量的变化只影响到当前组件，全局级token指此变量的变化会影响到所有跟随全局变量的组件。
    - 组件级token写法就是 `var(组件级token名, 默认值)`, 组件级token名具体写法规则后续会讲，默认值是指具体的值，比如'#fff'、 '4px'
    - 全局级token写法就是 `var(组件级token名, 全局级token)`，全局级token都定义在了`components/style/themes/token.less` 这个文件内，在文件定义已经引入，大家可以直接在文件中使用。
- token的命名规则如下
    - token名由五部分组成，公有前缀(--kd-c) + 组件细类名(btn-text) + 9个分类(color) + 分类属性值(background) + 状态(disabled)，他们通过中划线连接，所以连在一起就是--kd-c-btn-text-color-background-disabled.
    - 9个分类和每个分类下面可能的值如下表所示
    - 状态可能存在的值是 hover、active、disabled、loading、small、middle、large

|  分类   |   属性值  |
|   ---   |   ---   |
|  color  |  background(背景色)、 border(边框色)、 text(文字色) |
|  font  |  size(字体大小)、 weight(字体粗细)、 style(字体样式) |
|  line-height  |  行高  |
|  motion  |  duration(动画时长) |
|  radius  |  border(圆角半径) |
|  shadow  |  box-shadow |
|  sizing  |  height(高)、width(宽)、max/min-height(最大/最小高度)、max/min-width(最大/最小宽度)、border(边框大小)、square(当宽高值相同时只需要设置一个token变量) |
|  spacing  |  padding-left/right/bottom/top(左/右/下/上内边距)、 margin-left/right/bottom/top(左/右/下/上外边距)、 padding/margin-horizontal/vertical(当上下/左右内外/边距相同时只需要设置一个token变量) |
|  z-index  |  元素的堆叠顺序  |

> 当定义好所有token变量(token.less文件)后可以运行 `yarn token` 指令，它会自动生成token的文档说明，然后插入到组件文档(index.md)中

### 3. 单测文件说明

KDesign 组件库采用的测试框架是 `jest-enzyme`, [文档地址](https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme)。单测文件全部放在__tests__文件夹的 index.test.tsx 文件内。当运行完 `yarn test` 会在__tests__文件夹下生成一个__snapshots__的文件夹，这里存放的是组件的单测快照。在生成的 index.test.tsx 模板文件内，我们详细注释了需要测试的场景，有以下 11种。大家也可以直接在模板文件内看到详细的注释

```markdown
  1. mount test

  2. render test
  - 组件快照 可以测试多个不同props下组件生成的快照。当组件更新结构后，生成的快照会不同，这是跑组件的单测会导致报错
  - 运行 `yarn test:update` 指令可以更新快照

  3. warns in component
  针对不存在的 api 属性值的验证。看各组件内是否需要类似的代码检测，没有的话可以不用验证

  4. render null or undefined without errors
  验证特殊值的渲染是否正确 针对还有子元素Demo.Item的组件也需要对子组件进行验证

  5. displayName
  - 组件的displayName使用驼峰的命名方式
  - 针对父子组件结合的组件，比如dropDown和dropDown.Item都需要测试displayName


  6. class state
  需测试className style能否正确挂载 disabeld状态下是否还能触发事件 data-test能传递下去

  7. component interaction(event)
  事件测试

  8. config provider
  全局化配置测试
  - 属性只需判断一个就好 如果有需要可以写多个
  - 注意要和默认的属性区分开 比如size默认值为'middle',此时应该传入'small'或者'large'
  - 如果有组件有配置国际化的代码，也需要进行测试

  9. ref test
  ref的挂载测试
  - 不是必测项，开放出去了就需要测试
  - 不是每个组件都需要开放ref出去，看具体的业务场景

  10. api test
  - 需要对文档中的所有api进行测试 如果demo中提供了，测试案例中不好测试可以不用测试
  - 针对一些api在上面步骤中已经测试到的也可以不用测试
  - 这里需要特别注意的案例是受控用法的测试 如果提供了value和onChange api是必须要测试受控用法的

  11. special case
  这里写的单测一般是开发在使用过程中在github issues上提出来的 上面的单测没覆盖到的针对一些特殊使用和边界情况的补充。比如点击清空按钮应该触发onClear，而不应该触发onChange
```

> 大家完成新组件的开发后请一定要运行 `yarn test` 确保单测用例能顺利跑通。如果需要快速验证当前组件组件单测用例可以执行 `npx jest --testPathPattern=组件名`

### 4. 组件demo说明
模板的 `index.md` 是组件的文档说明。下面是对文档字段的一些说明
- type: 组件的归类
  - 目前组件分为基础、布局、导航、表单、数据展示、反馈、筛选7个类别。模板默认归类到 `基础`,大家根据要求进行调整。
- order: 组件在归类列表中的排列顺序
  - 目前此字段已经废弃，排列顺序会自动按照组件英文名首字母进行排序
- title: 组件的英文名
  - 组件的英文名采用驼峰命名法，并且首字母大写
- subtitle: 组件的中文名
  - 这个字段是必须，大家可以在页面的左侧组件导航栏看到，组件的导航链接是有组件的中文名和英文名结合组合而成

API文档中的版本需确认具体发版的版本号，比如此组件进过评审通过，将要在v2.0.0发布，那么所有api的版本就写为2.0.0。后续有新增api，则新增api的版本以新版本号为准

如组件引用了其他组件，并且使用了其api并开放出来，需要在API中贴上引用组件的api链接，比如 `更多属性请参考 Tooltip`

大家可能在其他组件的index.md文件中看到有 Design Token的说明，但是模板文件中并没有这部分的代码。其实Design Token的说明代码是通过 `yarn token` 命令实现的，他会根据每个组件的 token.less 文件中的token变量在index.md文件中生成

#### demo书写规则
所有的demo文档都放在模板文件的demo文件夹中，脚手架会自动读取文件夹内的所有md格式的demo文档，然后填充到组件的说明中。
KDesign 的demo采用实时编译，用户可以直接在编辑器中编辑代码就能实时的预览。下面是对demo文档的一些说明
- title: demo的标题
- order: demo的排序规则
  - 文档在页面中的呈现顺序按照order正序排列
- jsx代码示例是固定的模板，大家不需要对模板的主体结构进行修改 只需要修改Demo组件中的代码即可。
- 对于需要使用其他npm包来演示代码的，KDesign也提供了 `lodash`、`date-fns`、 `axios`来进行演示，具体使用办法如下:

```diff
+ import _ from 'lodash'
+ import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfToday, endOfToday, startOfQuarter, endOfQuarter, startOfYear, endOfYear } from 'date-fns'
```
> 新创建的demo文档，需要重启项目后才能再页面上呈现
