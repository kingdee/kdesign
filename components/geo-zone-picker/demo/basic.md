---
title: 基本使用
order: 0
---

由于行政区划数据量较大，下面例子中只截取了一部分数据作为演示。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { GeoZonePicker } from '@kdcloudjs/kdesign'
import type { IGeoZonePickerProps } from '@kdcloudjs/kdesign'

const Demo = () => {
const countrys: IGeoZonePickerProps['countryList'] = [
    { code: '001', name: '中国' },
    { code: '002', name: '美国' },
    { code: '003', name: '印度' },
    { code: '004', name: '中非共和国' },
  ]
  const chineseRegion: IGeoZonePickerProps['geoZoneData'] = [
    {
      code: '11',
      name: '北京市',
      group: 'B',
      children: [
        {
          code: '1101',
          name: '市辖区',
          children: [
            {
              code: '110101',
              name: '东城区',
            },
            {
              code: '110102',
              name: '西城区',
            },
            {
              code: '110105',
              name: '朝阳区',
            },
            {
              code: '110106',
              name: '丰台区',
            },
            {
              code: '110107',
              name: '石景山区',
            },
            {
              code: '110108',
              name: '海淀区',
            },
            {
              code: '110109',
              name: '门头沟区',
            },
            {
              code: '110111',
              name: '房山区',
            },
            {
              code: '110112',
              name: '通州区',
            },
            {
              code: '110113',
              name: '顺义区',
            },
            {
              code: '110114',
              name: '昌平区',
            },
            {
              code: '110115',
              name: '大兴区',
            },
            {
              code: '110116',
              name: '怀柔区',
            },
            {
              code: '110117',
              name: '平谷区',
            },
            {
              code: '110118',
              name: '密云区',
            },
            {
              code: '110119',
              name: '延庆区',
            },
          ],
        },
      ],
    },
    {
      code: '33',
      name: '浙江省',
      group: 'Z',
      children: [
        {
          code: '3302',
          name: '宁波市',
          children: [
            {
              code: '330203',
              name: '海曙区',
            },
            {
              code: '330205',
              name: '江北区',
            },
            {
              code: '330206',
              name: '北仑区',
            },
            {
              code: '330211',
              name: '镇海区',
            },
            {
              code: '330212',
              name: '鄞州区',
            },
            {
              code: '330213',
              name: '奉化区',
            },
            {
              code: '330225',
              name: '象山县',
            },
            {
              code: '330226',
              name: '宁海县',
            },
            {
              code: '330281',
              name: '余姚市',
            },
            {
              code: '330282',
              name: '慈溪市',
            },
          ],
        },
        {
          code: '3304',
          name: '嘉兴市',
          children: [
            {
              code: '330402',
              name: '南湖区',
            },
            {
              code: '330411',
              name: '秀洲区',
            },
            {
              code: '330421',
              name: '嘉善县',
            },
            {
              code: '330424',
              name: '海盐县',
            },
            {
              code: '330481',
              name: '海宁市',
            },
            {
              code: '330482',
              name: '平湖市',
            },
            {
              code: '330483',
              name: '桐乡市',
            },
          ],
        },
        {
          code: '3306',
          name: '绍兴市',
          children: [
            {
              code: '330602',
              name: '越城区',
            },
            {
              code: '330603',
              name: '柯桥区',
            },
            {
              code: '330604',
              name: '上虞区',
            },
            {
              code: '330624',
              name: '新昌县',
            },
            {
              code: '330681',
              name: '诸暨市',
            },
            {
              code: '330683',
              name: '嵊州市',
            },
          ],
        },
      ],
    },
  ]

  const provinceGroup: IGeoZonePickerProps['provinceGroup'] = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
    ['O', 'P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y', 'Z'],
  ]

  const [geoZoneData, setGeoZoneData] = React.useState<IGeoZonePickerProps['geoZoneData'] | undefined>(undefined)
  const [tabOptions, setTabOptions] = React.useState<IGeoZonePickerProps['tabOptions']>(['省', '市','县']) 
  const handleChange: IGeoZonePickerProps['onChange'] = (value) => {
    console.log(value)
  }
  const handleCountryChange: IGeoZonePickerProps['onCountryChange'] = (value) => {
    if (value.name === '中国') {
      setGeoZoneData(chineseRegion)
      setTabOptions(['省', '市','县'])
    } else if (value.name === '美国') {
      setGeoZoneData([])
      setTabOptions(['州', '市','县'])
      console.log('美国')
    } else if (value.name === '印度') {
      setGeoZoneData([])
      setTabOptions(['邦', '区','县'])
      console.log('印度')
    }
  }
  return (
    <div>
      <GeoZonePicker
        geoZoneData={geoZoneData}
        countryList={countrys}
        provinceGroup={provinceGroup}
        onChange={handleChange}
        onCountryChange={handleCountryChange}
        tabOptions={tabOptions}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
