---
title: 设置级别
order: 2
---

当只需要选择一级或二级行政区划时，可以设置`level`

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
        "code": "51",
        "name": "四川省",
        "group": "S",
        "children": [
            {
                "code": "5101",
                "name": "成都市",
                "children": [
                    {
                        "code": "510104",
                        "name": "锦江区"
                    },
                    {
                        "code": "510105",
                        "name": "青羊区"
                    },
                    {
                        "code": "510106",
                        "name": "金牛区"
                    },
                    {
                        "code": "510107",
                        "name": "武侯区"
                    },
                    {
                        "code": "510108",
                        "name": "成华区"
                    },
                    {
                        "code": "510112",
                        "name": "龙泉驿区"
                    },
                    {
                        "code": "510113",
                        "name": "青白江区"
                    },
                    {
                        "code": "510114",
                        "name": "新都区"
                    },
                    {
                        "code": "510115",
                        "name": "温江区"
                    },
                    {
                        "code": "510116",
                        "name": "双流区"
                    },
                    {
                        "code": "510117",
                        "name": "郫都区"
                    },
                    {
                        "code": "510118",
                        "name": "新津区"
                    },
                    {
                        "code": "510121",
                        "name": "金堂县"
                    },
                    {
                        "code": "510129",
                        "name": "大邑县"
                    },
                    {
                        "code": "510131",
                        "name": "蒲江县"
                    },
                    {
                        "code": "510181",
                        "name": "都江堰市"
                    },
                    {
                        "code": "510182",
                        "name": "彭州市"
                    },
                    {
                        "code": "510183",
                        "name": "邛崃市"
                    },
                    {
                        "code": "510184",
                        "name": "崇州市"
                    },
                    {
                        "code": "510185",
                        "name": "简阳市"
                    }
                ]
            },
            {
                "code": "5103",
                "name": "自贡市",
                "children": [
                    {
                        "code": "510302",
                        "name": "自流井区"
                    },
                    {
                        "code": "510303",
                        "name": "贡井区"
                    },
                    {
                        "code": "510304",
                        "name": "大安区"
                    },
                    {
                        "code": "510311",
                        "name": "沿滩区"
                    },
                    {
                        "code": "510321",
                        "name": "荣县"
                    },
                    {
                        "code": "510322",
                        "name": "富顺县"
                    }
                ]
            },
            {
                "code": "5104",
                "name": "攀枝花市",
                "children": [
                    {
                        "code": "510402",
                        "name": "东区"
                    },
                    {
                        "code": "510403",
                        "name": "西区"
                    },
                    {
                        "code": "510411",
                        "name": "仁和区"
                    },
                    {
                        "code": "510421",
                        "name": "米易县"
                    },
                    {
                        "code": "510422",
                        "name": "盐边县"
                    }
                ]
            },
            {
                "code": "5105",
                "name": "泸州市",
                "children": [
                    {
                        "code": "510502",
                        "name": "江阳区"
                    },
                    {
                        "code": "510503",
                        "name": "纳溪区"
                    },
                    {
                        "code": "510504",
                        "name": "龙马潭区"
                    },
                    {
                        "code": "510521",
                        "name": "泸县"
                    },
                    {
                        "code": "510522",
                        "name": "合江县"
                    },
                    {
                        "code": "510524",
                        "name": "叙永县"
                    },
                    {
                        "code": "510525",
                        "name": "古蔺县"
                    }
                ]
            },
            {
                "code": "5106",
                "name": "德阳市",
                "children": [
                    {
                        "code": "510603",
                        "name": "旌阳区"
                    },
                    {
                        "code": "510604",
                        "name": "罗江区"
                    },
                    {
                        "code": "510623",
                        "name": "中江县"
                    },
                    {
                        "code": "510681",
                        "name": "广汉市"
                    },
                    {
                        "code": "510682",
                        "name": "什邡市"
                    },
                    {
                        "code": "510683",
                        "name": "绵竹市"
                    }
                ]
            },
            {
                "code": "5107",
                "name": "绵阳市",
                "children": [
                    {
                        "code": "510703",
                        "name": "涪城区"
                    },
                    {
                        "code": "510704",
                        "name": "游仙区"
                    },
                    {
                        "code": "510705",
                        "name": "安州区"
                    },
                    {
                        "code": "510722",
                        "name": "三台县"
                    },
                    {
                        "code": "510723",
                        "name": "盐亭县"
                    },
                    {
                        "code": "510725",
                        "name": "梓潼县"
                    },
                    {
                        "code": "510726",
                        "name": "北川羌族自治县"
                    },
                    {
                        "code": "510727",
                        "name": "平武县"
                    },
                    {
                        "code": "510781",
                        "name": "江油市"
                    }
                ]
            },
            {
                "code": "5108",
                "name": "广元市",
                "children": [
                    {
                        "code": "510802",
                        "name": "利州区"
                    },
                    {
                        "code": "510811",
                        "name": "昭化区"
                    },
                    {
                        "code": "510812",
                        "name": "朝天区"
                    },
                    {
                        "code": "510821",
                        "name": "旺苍县"
                    },
                    {
                        "code": "510822",
                        "name": "青川县"
                    },
                    {
                        "code": "510823",
                        "name": "剑阁县"
                    },
                    {
                        "code": "510824",
                        "name": "苍溪县"
                    }
                ]
            },
            {
                "code": "5109",
                "name": "遂宁市",
                "children": [
                    {
                        "code": "510903",
                        "name": "船山区"
                    },
                    {
                        "code": "510904",
                        "name": "安居区"
                    },
                    {
                        "code": "510921",
                        "name": "蓬溪县"
                    },
                    {
                        "code": "510923",
                        "name": "大英县"
                    },
                    {
                        "code": "510981",
                        "name": "射洪市"
                    }
                ]
            },
            {
                "code": "5110",
                "name": "内江市",
                "children": [
                    {
                        "code": "511002",
                        "name": "市中区"
                    },
                    {
                        "code": "511011",
                        "name": "东兴区"
                    },
                    {
                        "code": "511024",
                        "name": "威远县"
                    },
                    {
                        "code": "511025",
                        "name": "资中县"
                    },
                    {
                        "code": "511083",
                        "name": "隆昌市"
                    }
                ]
            },
            {
                "code": "5111",
                "name": "乐山市",
                "children": [
                    {
                        "code": "511102",
                        "name": "市中区"
                    },
                    {
                        "code": "511111",
                        "name": "沙湾区"
                    },
                    {
                        "code": "511112",
                        "name": "五通桥区"
                    },
                    {
                        "code": "511113",
                        "name": "金口河区"
                    },
                    {
                        "code": "511123",
                        "name": "犍为县"
                    },
                    {
                        "code": "511124",
                        "name": "井研县"
                    },
                    {
                        "code": "511126",
                        "name": "夹江县"
                    },
                    {
                        "code": "511129",
                        "name": "沐川县"
                    },
                    {
                        "code": "511132",
                        "name": "峨边彝族自治县"
                    },
                    {
                        "code": "511133",
                        "name": "马边彝族自治县"
                    },
                    {
                        "code": "511181",
                        "name": "峨眉山市"
                    }
                ]
            },
            {
                "code": "5113",
                "name": "南充市",
                "children": [
                    {
                        "code": "511302",
                        "name": "顺庆区"
                    },
                    {
                        "code": "511303",
                        "name": "高坪区"
                    },
                    {
                        "code": "511304",
                        "name": "嘉陵区"
                    },
                    {
                        "code": "511321",
                        "name": "南部县"
                    },
                    {
                        "code": "511322",
                        "name": "营山县"
                    },
                    {
                        "code": "511323",
                        "name": "蓬安县"
                    },
                    {
                        "code": "511324",
                        "name": "仪陇县"
                    },
                    {
                        "code": "511325",
                        "name": "西充县"
                    },
                    {
                        "code": "511381",
                        "name": "阆中市"
                    }
                ]
            },
            {
                "code": "5114",
                "name": "眉山市",
                "children": [
                    {
                        "code": "511402",
                        "name": "东坡区"
                    },
                    {
                        "code": "511403",
                        "name": "彭山区"
                    },
                    {
                        "code": "511421",
                        "name": "仁寿县"
                    },
                    {
                        "code": "511423",
                        "name": "洪雅县"
                    },
                    {
                        "code": "511424",
                        "name": "丹棱县"
                    },
                    {
                        "code": "511425",
                        "name": "青神县"
                    }
                ]
            },
            {
                "code": "5115",
                "name": "宜宾市",
                "children": [
                    {
                        "code": "511502",
                        "name": "翠屏区"
                    },
                    {
                        "code": "511503",
                        "name": "南溪区"
                    },
                    {
                        "code": "511504",
                        "name": "叙州区"
                    },
                    {
                        "code": "511523",
                        "name": "江安县"
                    },
                    {
                        "code": "511524",
                        "name": "长宁县"
                    },
                    {
                        "code": "511525",
                        "name": "高县"
                    },
                    {
                        "code": "511526",
                        "name": "珙县"
                    },
                    {
                        "code": "511527",
                        "name": "筠连县"
                    },
                    {
                        "code": "511528",
                        "name": "兴文县"
                    },
                    {
                        "code": "511529",
                        "name": "屏山县"
                    }
                ]
            },
            {
                "code": "5116",
                "name": "广安市",
                "children": [
                    {
                        "code": "511602",
                        "name": "广安区"
                    },
                    {
                        "code": "511603",
                        "name": "前锋区"
                    },
                    {
                        "code": "511621",
                        "name": "岳池县"
                    },
                    {
                        "code": "511622",
                        "name": "武胜县"
                    },
                    {
                        "code": "511623",
                        "name": "邻水县"
                    },
                    {
                        "code": "511681",
                        "name": "华蓥市"
                    }
                ]
            },
            {
                "code": "5117",
                "name": "达州市",
                "children": [
                    {
                        "code": "511702",
                        "name": "通川区"
                    },
                    {
                        "code": "511703",
                        "name": "达川区"
                    },
                    {
                        "code": "511722",
                        "name": "宣汉县"
                    },
                    {
                        "code": "511723",
                        "name": "开江县"
                    },
                    {
                        "code": "511724",
                        "name": "大竹县"
                    },
                    {
                        "code": "511725",
                        "name": "渠县"
                    },
                    {
                        "code": "511781",
                        "name": "万源市"
                    }
                ]
            },
            {
                "code": "5118",
                "name": "雅安市",
                "children": [
                    {
                        "code": "511802",
                        "name": "雨城区"
                    },
                    {
                        "code": "511803",
                        "name": "名山区"
                    },
                    {
                        "code": "511822",
                        "name": "荥经县"
                    },
                    {
                        "code": "511823",
                        "name": "汉源县"
                    },
                    {
                        "code": "511824",
                        "name": "石棉县"
                    },
                    {
                        "code": "511825",
                        "name": "天全县"
                    },
                    {
                        "code": "511826",
                        "name": "芦山县"
                    },
                    {
                        "code": "511827",
                        "name": "宝兴县"
                    }
                ]
            },
            {
                "code": "5119",
                "name": "巴中市",
                "children": [
                    {
                        "code": "511902",
                        "name": "巴州区"
                    },
                    {
                        "code": "511903",
                        "name": "恩阳区"
                    },
                    {
                        "code": "511921",
                        "name": "通江县"
                    },
                    {
                        "code": "511922",
                        "name": "南江县"
                    },
                    {
                        "code": "511923",
                        "name": "平昌县"
                    }
                ]
            },
            {
                "code": "5120",
                "name": "资阳市",
                "children": [
                    {
                        "code": "512002",
                        "name": "雁江区"
                    },
                    {
                        "code": "512021",
                        "name": "安岳县"
                    },
                    {
                        "code": "512022",
                        "name": "乐至县"
                    }
                ]
            },
            {
                "code": "5132",
                "name": "阿坝藏族羌族自治州",
                "children": [
                    {
                        "code": "513201",
                        "name": "马尔康市"
                    },
                    {
                        "code": "513221",
                        "name": "汶川县"
                    },
                    {
                        "code": "513222",
                        "name": "理县"
                    },
                    {
                        "code": "513223",
                        "name": "茂县"
                    },
                    {
                        "code": "513224",
                        "name": "松潘县"
                    },
                    {
                        "code": "513225",
                        "name": "九寨沟县"
                    },
                    {
                        "code": "513226",
                        "name": "金川县"
                    },
                    {
                        "code": "513227",
                        "name": "小金县"
                    },
                    {
                        "code": "513228",
                        "name": "黑水县"
                    },
                    {
                        "code": "513230",
                        "name": "壤塘县"
                    },
                    {
                        "code": "513231",
                        "name": "阿坝县"
                    },
                    {
                        "code": "513232",
                        "name": "若尔盖县"
                    },
                    {
                        "code": "513233",
                        "name": "红原县"
                    }
                ]
            },
            {
                "code": "5133",
                "name": "甘孜藏族自治州",
                "children": [
                    {
                        "code": "513301",
                        "name": "康定市"
                    },
                    {
                        "code": "513322",
                        "name": "泸定县"
                    },
                    {
                        "code": "513323",
                        "name": "丹巴县"
                    },
                    {
                        "code": "513324",
                        "name": "九龙县"
                    },
                    {
                        "code": "513325",
                        "name": "雅江县"
                    },
                    {
                        "code": "513326",
                        "name": "道孚县"
                    },
                    {
                        "code": "513327",
                        "name": "炉霍县"
                    },
                    {
                        "code": "513328",
                        "name": "甘孜县"
                    },
                    {
                        "code": "513329",
                        "name": "新龙县"
                    },
                    {
                        "code": "513330",
                        "name": "德格县"
                    },
                    {
                        "code": "513331",
                        "name": "白玉县"
                    },
                    {
                        "code": "513332",
                        "name": "石渠县"
                    },
                    {
                        "code": "513333",
                        "name": "色达县"
                    },
                    {
                        "code": "513334",
                        "name": "理塘县"
                    },
                    {
                        "code": "513335",
                        "name": "巴塘县"
                    },
                    {
                        "code": "513336",
                        "name": "乡城县"
                    },
                    {
                        "code": "513337",
                        "name": "稻城县"
                    },
                    {
                        "code": "513338",
                        "name": "得荣县"
                    }
                ]
            },
            {
                "code": "5134",
                "name": "凉山彝族自治州",
                "children": [
                    {
                        "code": "513401",
                        "name": "西昌市"
                    },
                    {
                        "code": "513402",
                        "name": "会理市"
                    },
                    {
                        "code": "513422",
                        "name": "木里藏族自治县"
                    },
                    {
                        "code": "513423",
                        "name": "盐源县"
                    },
                    {
                        "code": "513424",
                        "name": "德昌县"
                    },
                    {
                        "code": "513426",
                        "name": "会东县"
                    },
                    {
                        "code": "513427",
                        "name": "宁南县"
                    },
                    {
                        "code": "513428",
                        "name": "普格县"
                    },
                    {
                        "code": "513429",
                        "name": "布拖县"
                    },
                    {
                        "code": "513430",
                        "name": "金阳县"
                    },
                    {
                        "code": "513431",
                        "name": "昭觉县"
                    },
                    {
                        "code": "513432",
                        "name": "喜德县"
                    },
                    {
                        "code": "513433",
                        "name": "冕宁县"
                    },
                    {
                        "code": "513434",
                        "name": "越西县"
                    },
                    {
                        "code": "513435",
                        "name": "甘洛县"
                    },
                    {
                        "code": "513436",
                        "name": "美姑县"
                    },
                    {
                        "code": "513437",
                        "name": "雷波县"
                    }
                ]
            }
        ]
    }
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
      setTabOptions(['州', '市'])
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
        level={2}
        tabOptions={tabOptions}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
