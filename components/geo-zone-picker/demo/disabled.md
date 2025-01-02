---
title: 禁用
order: 4
---

禁用状态

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { GeoZonePicker } from '@kdcloudjs/kdesign'

function Demo() {
  const countrys: IGeoZonePickerProps['countryList'] = [
    { code: '001', name: '中国' },
    { code: '002', name: '美国' },
    { code: '003', name: '印度' },
    { code: '004', name: '中非共和国' },
  ]
  const chineseRegion:IGeoZonePickerProps['geoZoneData'] = [
    {
        "code": "11",
        "name": "北京市",
        "group": "B",
        "children": [
            {
                "code": "1101",
                "name": "市辖区",
                "children": [
                    {
                        "code": "110101",
                        "name": "东城区"
                    },
                    {
                        "code": "110102",
                        "name": "西城区"
                    },
                    {
                        "code": "110105",
                        "name": "朝阳区"
                    },
                    {
                        "code": "110106",
                        "name": "丰台区"
                    },
                    {
                        "code": "110107",
                        "name": "石景山区"
                    },
                    {
                        "code": "110108",
                        "name": "海淀区"
                    },
                    {
                        "code": "110109",
                        "name": "门头沟区"
                    },
                    {
                        "code": "110111",
                        "name": "房山区"
                    },
                    {
                        "code": "110112",
                        "name": "通州区"
                    },
                    {
                        "code": "110113",
                        "name": "顺义区"
                    },
                    {
                        "code": "110114",
                        "name": "昌平区"
                    },
                    {
                        "code": "110115",
                        "name": "大兴区"
                    },
                    {
                        "code": "110116",
                        "name": "怀柔区"
                    },
                    {
                        "code": "110117",
                        "name": "平谷区"
                    },
                    {
                        "code": "110118",
                        "name": "密云区"
                    },
                    {
                        "code": "110119",
                        "name": "延庆区"
                    }
                ]
            }
        ]
    },
]


  const provinceGroup:IGeoZonePickerProps['provinceGroup'] = [
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
    } else if (value.name === '印度') {
      setGeoZoneData([])
      setTabOptions(['邦', '区','县'])
    }
  }
  return (
    <div>
      <GeoZonePicker
        geoZoneData={geoZoneData}
        disabled
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
