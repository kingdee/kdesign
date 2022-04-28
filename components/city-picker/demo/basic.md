---
title: 基本使用
order: 0
---
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { CityPicker } from '@kdcloudjs/kdesign'

function Demo() {
  const commons = {
    domestic: [
        {
            province: "甘肃省",
            country: "中国",
            "jp": "AKS",
            "name": "阿克塞哈萨克族自治县",
            "id": "334",
            "qp": "Aksai Kazakh Autonomous County",
            "ilid": "1000001"
        },
        {
            province: "甘肃省",
            country: "中国",
            "jp": "ANQ",
            "name": "安宁区",
            "id": "279",
            "qp": "Anning District",
            "ilid": "1000001"
        },
        {
            province: "北京市",
            country: "中国",
            "jp": "bj",
            "name": "北京",
            "id": "124",
            "qp": "beijing",
            "ilid": "1000001"
        },
        {
            province: "云南省",
            country: "中国",
            "jp": "DLB",
            "name": "大理白族自治州",
            "id": "3506",
            "qp": "Dali Bai Autonomous Prefecture",
            "ilid": "1000001"
        },
        {
            province: "广东省",
            country: "中国",
            "jp": "GZS",
            "name": "广州市",
            "id": "383",
            "qp": "Guangzhou City",
            "ilid": "1000001"
        },
        {
            province: "湖北省",
            country: "中国",
            "jp": "JMS",
            "name": "荆门市",
            "id": "1638",
            "qp": "Jingmen City",
            "ilid": "1000001"
        },
        {
            province: "江苏省",
            country: "中国",
            "jp": "NJS",
            "name": "南京市",
            "id": "1917",
            "qp": "Nanjing City",
            "ilid": "1000001"
        },
        {
            province: "广东省",
            country: "中国",
            "jp": "SZS",
            "name": "深圳市",
            "id": "407",
            "qp": "Shenzhen",
            "ilid": "1000001"
        }
    ],
    foreign: [
        {
            province: "",
            country: "日本",
            "jp": "HIJ",
            "name": "广岛",
            "id": "3996",
            "qp": "HIROSHIMA",
            "ilid": "1000009"
        },
        {
            province: "",
            country: "法国",
            "jp": "CFE",
            "name": "克莱蒙费朗",
            "id": "4104",
            "qp": "CLERMONT-FERRAND",
            "ilid": "1000015"
        },
        {
            province: "",
            country: "美国",
            "jp": "LAX",
            "name": "洛杉矶",
            "id": "4150",
            "qp": "LOS ANGELES",
            "ilid": "1000002"
        },
        {
            province: "",
            country: "美国",
            "jp": "NYC",
            "name": "纽约",
            "id": "4310",
            "qp": "NEW YORK",
            "ilid": "1000002"
        },
        {
            province: "",
            country: "韩国",
            "jp": "SEL",
            "name": "首尔",
            "id": "3980",
            "qp": "SEOUL",
            "ilid": "1000007"
        },
        {
            province: "",
            country: "中国台湾",
            "jp": "tb",
            "name": "台北",
            "id": "3783",
            "qp": "taibei",
            "ilid": "1000005"
        },
        {
            province: "",
            country: "中国香港",
            "jp": "HK",
            "name": "香港",
            "id": "3958",
            "qp": "HongKong",
            "ilid": "1000003"
        }
    ]
  }
  const groups = {
    domestic: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
    foreign: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  }

  const cityList = {
    domestic: {
      "A": [
        {
          province: "四川省",
          country: "中国",
          jp: "ABZ",
          name: "阿坝藏族羌族自治州",
          id: "3084",
          qp: "Aba Tibetan and Qiang Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "AKS",
          name: "阿克塞哈萨克族自治县",
          id: "334",
          qp: "Aksai Kazakh Autonomous County",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "AKS",
          name: "阿克苏地区",
          id: "3200",
          qp: "Aksu Area",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "ALE",
          name: "阿拉尔市",
          id: "3272",
          qp: "Alar",
          ilid: "1000001"
        },
        {
          province: "内蒙古自治区",
          country: "中国",
          jp: "ALS",
          name: "阿拉善盟",
          id: "2435",
          qp: "Alxa League",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "ALT",
          name: "阿勒泰地区",
          id: "3255",
          qp: "Altay Area",
          ilid: "1000001"
        },
        {
          province: "西藏自治区",
          country: "中国",
          jp: "ALD",
          name: "阿里地区",
          id: "3376",
          qp: "Ali Area",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "ADQ",
          name: "安定区",
          id: "347",
          qp: "Anding District",
          ilid: "1000001"
        },
        {
          province: "陕西省",
          country: "中国",
          jp: "AKS",
          name: "安康市",
          id: "2914",
          qp: "Ankang",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "ANQ",
          name: "安宁区",
          id: "279",
          qp: "Anning District",
          ilid: "1000001"
        },
        {
          province: "辽宁省",
          country: "中国",
          jp: "ASS",
          name: "鞍山市",
          id: "2245",
          qp: "Anshan City",
          ilid: "1000001"
        },
        {
          province: "贵州省",
          country: "中国",
          jp: "ASS",
          name: "安顺市",
          id: "745",
          qp: "Anshun",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "AYS",
          name: "安阳市",
          id: "1439",
          qp: "Anyang",
          ilid: "1000001"
        }
      ],
      "B": [
        {
          province: "吉林省",
          country: "中国",
          jp: "BCS",
          name: "白城市",
          id: "2200",
          qp: "Baicheng",
          ilid: "1000001"
        },
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "BSS",
          name: "百色市",
          id: "668",
          qp: "Baise",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "BSL",
          name: "白沙黎族自治县",
          id: "985",
          qp: "Baisha Li Autonomous County",
          ilid: "1000001"
        },
        {
          province: "吉林省",
          country: "中国",
          jp: "BSS",
          name: "白山市",
          id: "2187",
          qp: "Baishan City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "BYQ",
          name: "白银区",
          id: "296",
          qp: "Baiyin District",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "BYS",
          name: "白银市",
          id: "295",
          qp: "Silver City",
          ilid: "1000001"
        },
        {
          province: "陕西省",
          country: "中国",
          jp: "BJS",
          name: "宝鸡市",
          id: "2835",
          qp: "Baoji City",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "BSS",
          name: "保山市",
          id: "3427",
          qp: "Baoshan",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "BTL",
          name: "保亭黎族苗族自治县",
          id: "1043",
          qp: "Baoting Li and Miao Autonomous County",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "BYG",
          name: "巴音郭楞蒙古自治州",
          id: "3189",
          qp: "Bayingoleng Mongolian Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "BZS",
          name: "巴中市",
          id: "3073",
          qp: "Bazhong",
          ilid: "1000001"
        },
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "BHS",
          name: "北海市",
          id: "639",
          qp: "Beihai",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "BTS",
          name: "北屯市",
          id: "3263",
          qp: "Beitun City",
          ilid: "1000001"
        },
        {
          province: "辽宁省",
          country: "中国",
          jp: "BXS",
          name: "本溪市",
          id: "2258",
          qp: "Benxi City",
          ilid: "1000001"
        },
        {
          province: "贵州省",
          country: "中国",
          jp: "BJS",
          name: "毕节市",
          id: "772",
          qp: "Bijie",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "BZS",
          name: "滨州市",
          id: "2657",
          qp: "Binzhou",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "BET",
          name: "博尔塔拉蒙古自治州",
          id: "3183",
          qp: "Bortala Mongolian Autonomous Prefecture",
          ilid: "1000001"
        }
      ],
      "C": [
        {
          province: "",
          country: "中国",
          jp: "test1",
          name: "测试省1",
          id: "1011528792633574400",
          qp: "",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "CDS",
          name: "常德市",
          id: "1844",
          qp: "Changde City",
          ilid: "1000001"
        },
        {
          province: "西藏自治区",
          country: "中国",
          jp: "CDS",
          name: "昌都市",
          id: "3318",
          qp: "Changdu",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "CJL",
          name: "昌江黎族自治县",
          id: "1000",
          qp: "Changjiang Li Autonomous County",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "CJH",
          name: "昌吉回族自治州",
          id: "3175",
          qp: "Changji Hui Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "江苏省",
          country: "中国",
          jp: "CZS",
          name: "常州市",
          id: "1951",
          qp: "Changzhou City",
          ilid: "1000001"
        },
        {
          province: "辽宁省",
          country: "中国",
          jp: "CYS",
          name: "朝阳市",
          id: "2312",
          qp: "Chaoyang",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "CZS",
          name: "潮州市",
          id: "572",
          qp: "Chaozhou",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "CDS",
          name: "成都市",
          id: "2933",
          qp: "Chengdu",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "CGQ",
          name: "城关区",
          id: "276",
          qp: "Chengguan District",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "CMX",
          name: "澄迈县",
          id: "955",
          qp: "Chengmai County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "CX",
          name: "成县",
          id: "356",
          qp: "Cheng County",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "CZS",
          name: "郴州市",
          id: "1865",
          qp: "Chenzhou",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "CXX",
          name: "崇信县",
          id: "325",
          qp: "Chongxin County",
          ilid: "1000001"
        },
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "CZS",
          name: "崇左市",
          id: "706",
          qp: "Chongzuo",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "CXY",
          name: "楚雄彝族自治州",
          id: "3470",
          qp: "Chuxiong Yi Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "吉林省",
          country: "中国",
          jp: "CCS",
          name: "长春市",
          id: "2148",
          qp: "Changchun City",
          ilid: "1000001"
        },
        {
          province: "重庆市",
          country: "中国",
          jp: "cq",
          name: "重庆",
          id: "142",
          qp: "chongqing",
          ilid: "1000001"
        }
      ],
      "D": [
        {
          province: "辽宁省",
          country: "中国",
          jp: "DLS",
          name: "大连市",
          id: "2232",
          qp: "Dalian City",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "DLB",
          name: "大理白族自治州",
          id: "3506",
          qp: "Dali Bai Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "辽宁省",
          country: "中国",
          jp: "DDS",
          name: "丹东市",
          id: "2264",
          qp: "Dandong City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "DCX",
          name: "宕昌县",
          id: "358",
          qp: "Dangchang County",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "DZS",
          name: "儋州市",
          id: "856",
          qp: "Danzhou",
          ilid: "1000001"
        },
        {
          province: "黑龙江省",
          country: "中国",
          jp: "DQS",
          name: "大庆市",
          id: "1312",
          qp: "Daqing City",
          ilid: "1000001"
        },
        {
          province: "黑龙江省",
          country: "中国",
          jp: "DXA",
          name: "大兴安岭地区",
          id: "1380",
          qp: "Daxinganling Area",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "DZS",
          name: "达州市",
          id: "3056",
          qp: "Dazhou",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "DHD",
          name: "德宏傣族景颇族自治州",
          id: "3518",
          qp: "Dehong Dai and Jingpo Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "DYS",
          name: "德阳市",
          id: "2975",
          qp: "Deyang City",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "DZS",
          name: "德州市",
          id: "2635",
          qp: "Dezhou",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "DBX",
          name: "迭部县",
          id: "378",
          qp: "Diebu County",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "DAX",
          name: "定安县",
          id: "930",
          qp: "Ding'An County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "DXS",
          name: "定西市",
          id: "346",
          qp: "Dingxi City",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "DQZ",
          name: "迪庆藏族自治州",
          id: "3529",
          qp: "Diqing Tibetan Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "DFS",
          name: "东方市",
          id: "917",
          qp: "Dongfang City",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "DGS",
          name: "东莞市",
          id: "511",
          qp: "Dongguan City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "DXZ",
          name: "东乡族自治县",
          id: "371",
          qp: "Dongxiang Autonomous County",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "DYS",
          name: "东营市",
          id: "2559",
          qp: "Dongying City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "DHS",
          name: "敦煌市",
          id: "336",
          qp: "Dunhuang City",
          ilid: "1000001"
        }
      ],
      "E": [
        {
          province: "内蒙古自治区",
          country: "中国",
          jp: "EED",
          name: "鄂尔多斯市",
          id: "2371",
          qp: "Ordos City",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "EST",
          name: "恩施土家族苗族自治州",
          id: "1683",
          qp: "Enshi Tujia and Miao Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "EZS",
          name: "鄂州市",
          id: "1634",
          qp: "Ezhou City",
          ilid: "1000001"
        }
      ],
      "F": [
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "FCG",
          name: "防城港市",
          id: "644",
          qp: "Fangchenggang",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "FSS",
          name: "佛山市",
          id: "430",
          qp: "Foshan City",
          ilid: "1000001"
        },
        {
          province: "辽宁省",
          country: "中国",
          jp: "FSS",
          name: "抚顺市",
          id: "2250",
          qp: "Fushun City",
          ilid: "1000001"
        },
        {
          province: "辽宁省",
          country: "中国",
          jp: "FXS",
          name: "阜新市",
          id: "2285",
          qp: "Fuxin City",
          ilid: "1000001"
        },
        {
          province: "福建省",
          country: "中国",
          jp: "FZS",
          name: "福州市",
          id: "180",
          qp: "Fuzhou",
          ilid: "1000001"
        },
        {
          province: "江西省",
          country: "中国",
          jp: "FZS",
          name: "抚州市",
          id: "2123",
          qp: "Fuzhou",
          ilid: "1000001"
        }
      ],
      "G": [
        {
          province: "甘肃省",
          country: "中国",
          jp: "GGX",
          name: "甘谷县",
          id: "306",
          qp: "Gangu County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "GNZ",
          name: "甘南藏族自治州",
          id: "373",
          qp: "Gannan Tibetan Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "",
          country: "中国",
          jp: "GSS",
          name: "甘肃省",
          id: "274",
          qp: "Gansu Province",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "GZQ",
          name: "甘州区",
          id: "315",
          qp: "Ganzhou District",
          ilid: "1000001"
        },
        {
          province: "江西省",
          country: "中国",
          jp: "GZS",
          name: "赣州市",
          id: "2079",
          qp: "Ganzhou City",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "GZZ",
          name: "甘孜藏族自治州",
          id: "3097",
          qp: "Ganzi Tibetan Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "GLX",
          name: "皋兰县",
          id: "282",
          qp: "Gaolan County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "GTX",
          name: "高台县",
          id: "319",
          qp: "Gaotai County",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "GAS",
          name: "广安市",
          id: "3049",
          qp: "Guang'An",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "GHX",
          name: "广河县",
          id: "369",
          qp: "Guanghe County",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "GYS",
          name: "广元市",
          id: "2992",
          qp: "Guangyuan City",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "GZS",
          name: "广州市",
          id: "383",
          qp: "Guangzhou City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "GZX",
          name: "瓜州县",
          id: "332",
          qp: "Guazhou County",
          ilid: "1000001"
        },
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "GGS",
          name: "贵港市",
          id: "654",
          qp: "Guigang City",
          ilid: "1000001"
        },
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "GLS",
          name: "桂林市",
          id: "612",
          qp: "Guilin City",
          ilid: "1000001"
        },
        {
          province: "贵州省",
          country: "中国",
          jp: "GYS",
          name: "贵阳市",
          id: "716",
          qp: "Guiyang City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "GLX",
          name: "古浪县",
          id: "312",
          qp: "Gulang County",
          ilid: "1000001"
        },
        {
          province: "青海省",
          country: "中国",
          jp: "GLZ",
          name: "果洛藏族自治州",
          id: "2497",
          qp: "Guoluo Tibetan Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "宁夏回族自治区",
          country: "中国",
          jp: "GYS",
          name: "固原市",
          id: "2457",
          qp: "Guyuan City",
          ilid: "1000001"
        }
      ],
      "H": [
        {
          province: "黑龙江省",
          country: "中国",
          jp: "HEB",
          name: "哈尔滨市",
          id: "1251",
          qp: "Harbin City",
          ilid: "1000001"
        },
        {
          province: "青海省",
          country: "中国",
          jp: "HBZ",
          name: "海北藏族自治州",
          id: "2481",
          qp: "Haibei Tibetan Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "北京市",
          country: "中国",
          jp: "海淀区",
          name: "海淀区1",
          id: "1202022902887659520",
          qp: "haidian",
          ilid: "1000001"
        },
        {
          province: "青海省",
          country: "中国",
          jp: "HDS",
          name: "海东市",
          id: "2474",
          qp: "Haidong City",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "HKS",
          name: "海口市",
          id: "810",
          qp: "Haikou",
          ilid: "1000001"
        },
        {
          province: "青海省",
          country: "中国",
          jp: "HNZ",
          name: "海南藏族自治州",
          id: "2491",
          qp: "Hainan Tibetan Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "青海省",
          country: "中国",
          jp: "HXM",
          name: "海西蒙古族藏族自治州",
          id: "2511",
          qp: "Haixi Mongolian and Tibetan Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "HMS",
          name: "哈密市",
          id: "3171",
          qp: "Hami City",
          ilid: "1000001"
        },
        {
          province: "浙江省",
          country: "中国",
          jp: "HZS",
          name: "杭州市",
          id: "3534",
          qp: "Hangzhou City",
          ilid: "1000001"
        },
        {
          province: "陕西省",
          country: "中国",
          jp: "HZS",
          name: "汉中市",
          id: "2889",
          qp: "Hanzhong",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "HBS",
          name: "鹤壁市",
          id: "1449",
          qp: "Hebi City",
          ilid: "1000001"
        },
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "HCS",
          name: "河池市",
          id: "687",
          qp: "Hechi",
          ilid: "1000001"
        },
        {
          province: "黑龙江省",
          country: "中国",
          jp: "HGS",
          name: "鹤岗市",
          id: "1297",
          qp: "Hegang City",
          ilid: "1000001"
        },
        {
          province: "黑龙江省",
          country: "中国",
          jp: "HHS",
          name: "黑河市",
          id: "1362",
          qp: "Heihe",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "HYS",
          name: "衡阳市",
          id: "1809",
          qp: "Hengyang",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "HSX",
          name: "合水县",
          id: "342",
          qp: "Heshui County",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "HTD",
          name: "和田地区",
          id: "3228",
          qp: "Hotan Area",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "HYS",
          name: "河源市",
          id: "490",
          qp: "Heyuan City",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "HZS",
          name: "菏泽市",
          id: "2665",
          qp: "Heze City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "HZX",
          name: "和政县",
          id: "370",
          qp: "Hezheng County",
          ilid: "1000001"
        },
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "HZS",
          name: "贺州市",
          id: "681",
          qp: "Hezhou",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "HZS",
          name: "合作市",
          id: "374",
          qp: "Cooperative City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "HGQ",
          name: "红古区",
          id: "280",
          qp: "Honggu District",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "HHH",
          name: "红河哈尼族彝族自治州",
          id: "3481",
          qp: "Honghe Hani and Yi Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "HCX",
          name: "华池县",
          id: "341",
          qp: "Huachi County",
          ilid: "1000001"
        },
        {
          province: "江苏省",
          country: "中国",
          jp: "HAS",
          name: "淮安市",
          id: "1990",
          qp: "Huaian city",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "HHS",
          name: "怀化市",
          id: "1888",
          qp: "Huaihua",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "HGS",
          name: "黄冈市",
          id: "1661",
          qp: "Huanggang",
          ilid: "1000001"
        },
        {
          province: "青海省",
          country: "中国",
          jp: "HNZ",
          name: "黄南藏族自治州",
          id: "2486",
          qp: "Huangnan Tibetan Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "HSS",
          name: "黄石市",
          id: "1596",
          qp: "Huangshi City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "HX",
          name: "环县",
          id: "340",
          qp: "Huan County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "HTS",
          name: "华亭市",
          id: "326",
          qp: "Huating City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "HNX",
          name: "会宁县",
          id: "299",
          qp: "Huining County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "HX",
          name: "徽县",
          id: "362",
          qp: "Huixian",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "HZS",
          name: "惠州市",
          id: "470",
          qp: "Huizhou",
          ilid: "1000001"
        },
        {
          province: "辽宁省",
          country: "中国",
          jp: "HLD",
          name: "葫芦岛市",
          id: "2319",
          qp: "Huludao City",
          ilid: "1000001"
        },
        {
          province: "浙江省",
          country: "中国",
          jp: "HZS",
          name: "湖州市",
          id: "3578",
          qp: "Huzhou",
          ilid: "1000001"
        }
      ],
      "J": [
        {
          province: "黑龙江省",
          country: "中国",
          jp: "JMS",
          name: "佳木斯市",
          id: "1338",
          qp: "Jiamusi",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "JMS",
          name: "江门市",
          id: "436",
          qp: "Jiangmen",
          ilid: "1000001"
        },
        {
          province: "江西省",
          country: "中国",
          jp: "JAS",
          name: "吉安市",
          id: "2098",
          qp: "Ji'an City",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "JZS",
          name: "焦作市",
          id: "1467",
          qp: "Jiaozuo",
          ilid: "1000001"
        },
        {
          province: "浙江省",
          country: "中国",
          jp: "JXS",
          name: "嘉兴市",
          id: "3570",
          qp: "Jiaxing City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "JYG",
          name: "嘉峪关市",
          id: "285",
          qp: "Jiayuguan City",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "JYS",
          name: "揭阳市",
          id: "576",
          qp: "Jieyang City",
          ilid: "1000001"
        },
        {
          province: "吉林省",
          country: "中国",
          jp: "JLS",
          name: "吉林市",
          id: "2160",
          qp: "Jilin City",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "JNS",
          name: "济南市",
          id: "2518",
          qp: "Jinan City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "JCS",
          name: "金昌市",
          id: "292",
          qp: "Jinchang",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "JCQ",
          name: "金川区",
          id: "293",
          qp: "Jinchuan District",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "JCX",
          name: "泾川县",
          id: "323",
          qp: "Jingchuan County",
          ilid: "1000001"
        },
        {
          province: "江西省",
          country: "中国",
          jp: "JDZ",
          name: "景德镇市",
          id: "2047",
          qp: "Jingdezhen City",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "JMS",
          name: "荆门市",
          id: "1638",
          qp: "Jingmen City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "JNX",
          name: "静宁县",
          id: "328",
          qp: "Jingning County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "JTX",
          name: "景泰县",
          id: "300",
          qp: "Jingtai County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "JYX",
          name: "靖远县",
          id: "298",
          qp: "Jingyuan County",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "JZS",
          name: "荆州市",
          id: "1652",
          qp: "Jingzhou",
          ilid: "1000001"
        },
        {
          province: "浙江省",
          country: "中国",
          jp: "JHS",
          name: "金华市",
          id: "3592",
          qp: "Jinhua City",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "JNS",
          name: "济宁市",
          id: "2590",
          qp: "Jining City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "JTX",
          name: "金塔县",
          id: "331",
          qp: "Jinta County",
          ilid: "1000001"
        },
        {
          province: "辽宁省",
          country: "中国",
          jp: "JZS",
          name: "锦州市",
          id: "2271",
          qp: "Jinzhou",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "JSS",
          name: "积石山保安族东乡族撒拉族自治县",
          id: "372",
          qp: "Jishishan Baoanzu Dongxiang Salar Autonomous County",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "JSS",
          name: "吉首市",
          id: "1908",
          qp: "Jishou City",
          ilid: "1000001"
        },
        {
          province: "江西省",
          country: "中国",
          jp: "JJS",
          name: "九江市",
          id: "2058",
          qp: "Jiujiang City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "JQS",
          name: "酒泉市",
          id: "329",
          qp: "Jiuquan",
          ilid: "1000001"
        },
        {
          province: "黑龙江省",
          country: "中国",
          jp: "JXS",
          name: "鸡西市",
          id: "1287",
          qp: "Jixi City",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "JYS",
          name: "济源市",
          id: "1478",
          qp: "Jiyuan City",
          ilid: "1000001"
        }
      ],
      "K": [
        {
          province: "河南省",
          country: "中国",
          jp: "KFS",
          name: "开封市",
          id: "1402",
          qp: "Kaifeng",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "KLX",
          name: "康乐县",
          id: "367",
          qp: "Kangle County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "KX",
          name: "康县",
          id: "359",
          qp: "Kang County",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "KSD",
          name: "喀什地区",
          id: "3215",
          qp: "Kashgar Area",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "KLM",
          name: "克拉玛依市",
          id: "3161",
          qp: "Karamay",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "KZL",
          name: "克孜勒苏柯尔克孜自治州",
          id: "3210",
          qp: "Kizilsu Kirgiz Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "KTQ",
          name: "崆峒区",
          id: "322",
          qp: "Kongtong District",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "KMS",
          name: "昆明市",
          id: "3394",
          qp: "Kunming City",
          ilid: "1000001"
        }
      ],
      "L": [
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "LBS",
          name: "来宾市",
          id: "699",
          qp: "Laibin City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LZS",
          name: "兰州市",
          id: "275",
          qp: "Lan'Zhou City",
          ilid: "1000001"
        },
        {
          province: "西藏自治区",
          country: "中国",
          jp: "LSS",
          name: "拉萨市",
          id: "3310",
          qp: "Lhasa",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "LDL",
          name: "乐东黎族自治县",
          id: "1011",
          qp: "Ledong Li Autonomous County",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "LSS",
          name: "乐山市",
          id: "3011",
          qp: "Leshan",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LDX",
          name: "两当县",
          id: "363",
          qp: "Liangdang County",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "LSY",
          name: "凉山彝族自治州",
          id: "3116",
          qp: "Liangshan Yi Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LZQ",
          name: "凉州区",
          id: "310",
          qp: "Liangzhou District",
          ilid: "1000001"
        },
        {
          province: "江苏省",
          country: "中国",
          jp: "LYG",
          name: "连云港市",
          id: "1982",
          qp: "Lianyungang",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "LCS",
          name: "聊城市",
          id: "2648",
          qp: "Liaocheng",
          ilid: "1000001"
        },
        {
          province: "辽宁省",
          country: "中国",
          jp: "LYS",
          name: "辽阳市",
          id: "2292",
          qp: "Liaoyang City",
          ilid: "1000001"
        },
        {
          province: "吉林省",
          country: "中国",
          jp: "LYS",
          name: "辽源市",
          id: "2176",
          qp: "Liaoyuan City",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "LJS",
          name: "丽江市",
          id: "3445",
          qp: "Lijiang City",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "LCS",
          name: "临沧市",
          id: "3461",
          qp: "Lincang",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "LGX",
          name: "临高县",
          id: "972",
          qp: "Lingao County",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "LSL",
          name: "陵水黎族自治县",
          id: "1028",
          qp: "Lingshui Li Autonomous County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LTX",
          name: "灵台县",
          id: "324",
          qp: "Lingtai County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LTX",
          name: "临潭县",
          id: "375",
          qp: "Lintan County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LTX",
          name: "临洮县",
          id: "351",
          qp: "Lintao County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LXH",
          name: "临夏回族自治州",
          id: "364",
          qp: "Linxia Hui Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LXS",
          name: "临夏市",
          id: "365",
          qp: "Linxia",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LXX",
          name: "临夏县",
          id: "366",
          qp: "Linxia County",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "LYS",
          name: "临沂市",
          id: "2621",
          qp: "Linyi City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LZX",
          name: "临泽县",
          id: "318",
          qp: "Linze County",
          ilid: "1000001"
        },
        {
          province: "西藏自治区",
          country: "中国",
          jp: "LZS",
          name: "林芝市",
          id: "3384",
          qp: "Nyingchi",
          ilid: "1000001"
        },
        {
          province: "浙江省",
          country: "中国",
          jp: "LSS",
          name: "丽水市",
          id: "3623",
          qp: "Lishui City",
          ilid: "1000001"
        },
        {
          province: "贵州省",
          country: "中国",
          jp: "LPS",
          name: "六盘水市",
          id: "726",
          qp: "Liupanshui",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LQX",
          name: "碌曲县",
          id: "380",
          qp: "Luqu County",
          ilid: "1000001"
        },
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "LZS",
          name: "柳州市",
          id: "601",
          qp: "Liuzhou",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LX",
          name: "礼县",
          id: "361",
          qp: "Li County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LNS",
          name: "陇南市",
          id: "354",
          qp: "Longnan City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "LXX",
          name: "陇西县",
          id: "349",
          qp: "Longxi County",
          ilid: "1000001"
        },
        {
          province: "福建省",
          country: "中国",
          jp: "LYS",
          name: "龙岩市",
          id: "256",
          qp: "Longyan",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "LDS",
          name: "娄底市",
          id: "1901",
          qp: "Loudi",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "LHS",
          name: "漯河市",
          id: "1509",
          qp: "Luohe",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "LYS",
          name: "洛阳市",
          id: "1413",
          qp: "Luoyang City",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "LZS",
          name: "泸州市",
          id: "2967",
          qp: "Luzhou",
          ilid: "1000001"
        }
      ],
      "M": [
        {
          province: "甘肃省",
          country: "中国",
          jp: "MJQ",
          name: "麦积区",
          id: "303",
          qp: "Maiji District",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "MMS",
          name: "茂名市",
          id: "454",
          qp: "Maoming",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "MQX",
          name: "玛曲县",
          id: "379",
          qp: "Maqu County",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "MSS",
          name: "眉山市",
          id: "3032",
          qp: "Meishan",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "MZS",
          name: "梅州市",
          id: "476",
          qp: "Meizhou",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "MYS",
          name: "绵阳市",
          id: "2982",
          qp: "Mianyang",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "MLX",
          name: "民乐县",
          id: "317",
          qp: "Minle County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "MQX",
          name: "民勤县",
          id: "311",
          qp: "Minqin County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "MX",
          name: "岷县",
          id: "353",
          qp: "Min County",
          ilid: "1000001"
        },
        {
          province: "黑龙江省",
          country: "中国",
          jp: "MDJ",
          name: "牡丹江市",
          id: "1351",
          qp: "Mudanjiang",
          ilid: "1000001"
        }
      ],
      "P": [
        {
          province: "辽宁省",
          country: "中国",
          jp: "PJS",
          name: "盘锦市",
          id: "2300",
          qp: "Panjin City",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "PZH",
          name: "攀枝花市",
          id: "2961",
          qp: "Panzhihua City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "PCQ",
          name: "平川区",
          id: "297",
          qp: "Pingchuan District",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "PDS",
          name: "平顶山市",
          id: "1429",
          qp: "Pingdingshan",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "PLS",
          name: "平凉市",
          id: "321",
          qp: "Pingliang",
          ilid: "1000001"
        },
        {
          province: "江西省",
          country: "中国",
          jp: "PXS",
          name: "萍乡市",
          id: "2052",
          qp: "Pingxiang City",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "PES",
          name: "普洱市",
          id: "3451",
          qp: "Pu'Er City",
          ilid: "1000001"
        },
        {
          province: "福建省",
          country: "中国",
          jp: "PTS",
          name: "莆田市",
          id: "201",
          qp: "Putian City",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "PYS",
          name: "濮阳市",
          id: "1495",
          qp: "Puyang City",
          ilid: "1000001"
        }
      ],
      "Q": [
        {
          province: "贵州省",
          country: "中国",
          jp: "QDN",
          name: "黔东南苗族侗族自治州",
          id: "780",
          qp: "Qiandongnan Miao and Dong Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "QJS",
          name: "潜江市",
          id: "1718",
          qp: "Qianjiang",
          ilid: "1000001"
        },
        {
          province: "贵州省",
          country: "中国",
          jp: "QNB",
          name: "黔南布依族苗族自治州",
          id: "796",
          qp: "Qiannan Buyi and Miao Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "贵州省",
          country: "中国",
          jp: "QXN",
          name: "黔西南布依族苗族自治州",
          id: "763",
          qp: "Buyi and Miao Autonomous Prefecture in Southwest Guizhou",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "QLH",
          name: "七里河区",
          id: "277",
          qp: "Qilihe District",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "QAX",
          name: "秦安县",
          id: "305",
          qp: "Qin'An County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "QCX",
          name: "庆城县",
          id: "339",
          qp: "Qingcheng County",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "QDS",
          name: "青岛市",
          id: "2530",
          qp: "Qingdao City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "QSX",
          name: "清水县",
          id: "304",
          qp: "Qingshui County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "QYS",
          name: "庆阳市",
          id: "337",
          qp: "Qingyang",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "QYS",
          name: "清远市",
          id: "502",
          qp: "Qingyuan City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "QZQ",
          name: "秦州区",
          id: "302",
          qp: "Qinzhou District",
          ilid: "1000001"
        },
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "QZS",
          name: "钦州市",
          id: "649",
          qp: "Qinzhou",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "QHS",
          name: "琼海市",
          id: "840",
          qp: "Qionghai",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "QZL",
          name: "琼中黎族苗族自治县",
          id: "1057",
          qp: "Qiongzhong Li and Miao Autonomous County",
          ilid: "1000001"
        },
        {
          province: "黑龙江省",
          country: "中国",
          jp: "QQH",
          name: "齐齐哈尔市",
          id: "1270",
          qp: "Qiqihar City",
          ilid: "1000001"
        },
        {
          province: "黑龙江省",
          country: "中国",
          jp: "QTH",
          name: "七台河市",
          id: "1347",
          qp: "Qitaihe",
          ilid: "1000001"
        },
        {
          province: "福建省",
          country: "中国",
          jp: "QZS",
          name: "泉州市",
          id: "220",
          qp: "Quanzhou",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "QJS",
          name: "曲靖市",
          id: "3407",
          qp: "Qujing",
          ilid: "1000001"
        },
        {
          province: "浙江省",
          country: "中国",
          jp: "QZS",
          name: "衢州市",
          id: "3602",
          qp: "Quzhou",
          ilid: "1000001"
        }
      ],
      "R": [
        {
          province: "西藏自治区",
          country: "中国",
          jp: "RKZ",
          name: "日喀则市",
          id: "3344",
          qp: "Shigatse",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "RZS",
          name: "日照市",
          id: "2614",
          qp: "Rizhao",
          ilid: "1000001"
        }
      ],
      "N": [
        {
          province: "江西省",
          country: "中国",
          jp: "NCS",
          name: "南昌市",
          id: "2037",
          qp: "Nanchang",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "NCS",
          name: "南充市",
          id: "3022",
          qp: "Nanchong",
          ilid: "1000001"
        },
        {
          province: "江苏省",
          country: "中国",
          jp: "NJS",
          name: "南京市",
          id: "1917",
          qp: "Nanjing City",
          ilid: "1000001"
        },
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "NNS",
          name: "南宁市",
          id: "589",
          qp: "Nanning City",
          ilid: "1000001"
        },
        {
          province: "福建省",
          country: "中国",
          jp: "NPS",
          name: "南平市",
          id: "245",
          qp: "Nanping City",
          ilid: "1000001"
        },
        {
          province: "江苏省",
          country: "中国",
          jp: "NTS",
          name: "南通市",
          id: "1973",
          qp: "Nantong city",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "NYS",
          name: "南阳市",
          id: "1522",
          qp: "Nanyang City",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "NJS",
          name: "内江市",
          id: "3007",
          qp: "Neijiang",
          ilid: "1000001"
        },
        {
          province: "西藏自治区",
          country: "中国",
          jp: "NQS",
          name: "那曲市",
          id: "3364",
          qp: "Nagqu",
          ilid: "1000001"
        },
        {
          province: "浙江省",
          country: "中国",
          jp: "NBS",
          name: "宁波市",
          id: "3547",
          qp: "Ningbo City",
          ilid: "1000001"
        },
        {
          province: "福建省",
          country: "中国",
          jp: "NDS",
          name: "宁德市",
          id: "264",
          qp: "Ningde City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "NX",
          name: "宁县",
          id: "344",
          qp: "Ning County",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "NJL",
          name: "怒江傈僳族自治州",
          id: "3524",
          qp: "Nujiang Lisu Autonomous Prefecture",
          ilid: "1000001"
        }
      ],
      "S": [
        {
          province: "河南省",
          country: "中国",
          jp: "SMX",
          name: "三门峡市",
          id: "1515",
          qp: "Sanmenxia",
          ilid: "1000001"
        },
        {
          province: "福建省",
          country: "中国",
          jp: "SMS",
          name: "三明市",
          id: "207",
          qp: "Sanming",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "SSS",
          name: "三沙市",
          id: "828",
          qp: "Sansha",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "SYS",
          name: "三亚市",
          id: "815",
          qp: "Sanya City",
          ilid: "1000001"
        },
        {
          province: "福建省",
          country: "中国",
          jp: "SMS",
          name: "厦门市",
          id: "194",
          qp: "Xiamen City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "SDX",
          name: "山丹县",
          id: "320",
          qp: "Shandan County",
          ilid: "1000001"
        },
        {
          province: "",
          country: "中国",
          jp: "SHS",
          name: "上海市",
          id: "2675",
          qp: "Shanghai",
          ilid: "1000001"
        },
        {
          province: "陕西省",
          country: "中国",
          jp: "SLS",
          name: "商洛市",
          id: "2925",
          qp: "Shangluo",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "SQS",
          name: "商丘市",
          id: "1536",
          qp: "Shangqiu",
          ilid: "1000001"
        },
        {
          province: "江西省",
          country: "中国",
          jp: "SRS",
          name: "上饶市",
          id: "2134",
          qp: "Shangrao",
          ilid: "1000001"
        },
        {
          province: "西藏自治区",
          country: "中国",
          jp: "SNS",
          name: "山南市",
          id: "3331",
          qp: "Shannan",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "STS",
          name: "汕头市",
          id: "422",
          qp: "Shan Tou",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "SWS",
          name: "汕尾市",
          id: "485",
          qp: "Shanwei City",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "SGS",
          name: "韶关市",
          id: "396",
          qp: "Shaoguan City",
          ilid: "1000001"
        },
        {
          province: "浙江省",
          country: "中国",
          jp: "SXS",
          name: "绍兴市",
          id: "3584",
          qp: "Shaoxing City",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "SYS",
          name: "邵阳市",
          id: "1822",
          qp: "Shaoyang",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "SNJ",
          name: "神农架林区",
          id: "1773",
          qp: "Shennongjia Forest Area",
          ilid: "1000001"
        },
        {
          province: "辽宁省",
          country: "中国",
          jp: "SYS",
          name: "沈阳市",
          id: "2216",
          qp: "Shenyang city",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "SZS",
          name: "深圳市",
          id: "407",
          qp: "Shenzhen",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "SHZ",
          name: "石河子市",
          id: "3264",
          qp: "Shihezi",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "SYS",
          name: "十堰市",
          id: "1603",
          qp: "Shiyan City",
          ilid: "1000001"
        },
        {
          province: "宁夏回族自治区",
          country: "中国",
          jp: "SZS",
          name: "石嘴山市",
          id: "2447",
          qp: "Shizuishan",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "SHS",
          name: "双河市",
          id: "3188",
          qp: "Shuanghe",
          ilid: "1000001"
        },
        {
          province: "黑龙江省",
          country: "中国",
          jp: "SYS",
          name: "双鸭山市",
          id: "1303",
          qp: "Shuangyashan",
          ilid: "1000001"
        },
        {
          province: "吉林省",
          country: "中国",
          jp: "SPS",
          name: "四平市",
          id: "2170",
          qp: "Siping City",
          ilid: "1000001"
        },
        {
          province: "吉林省",
          country: "中国",
          jp: "SYS",
          name: "松原市",
          id: "2194",
          qp: "Songyuan City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "SBM",
          name: "肃北蒙古族自治县",
          id: "333",
          qp: "Subei Mongolian Autonomous County",
          ilid: "1000001"
        },
        {
          province: "黑龙江省",
          country: "中国",
          jp: "SHS",
          name: "绥化市",
          id: "1369",
          qp: "Suihua",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "SNS",
          name: "遂宁市",
          id: "3001",
          qp: "Suining City",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "SZS",
          name: "随州市",
          id: "1679",
          qp: "Suizhou",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "SNY",
          name: "肃南裕固族自治县",
          id: "316",
          qp: "Sunan Yugu Autonomous County",
          ilid: "1000001"
        },
        {
          province: "江苏省",
          country: "中国",
          jp: "SQS",
          name: "宿迁市",
          id: "2030",
          qp: "Suqian City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "SZQ",
          name: "肃州区",
          id: "330",
          qp: "Suzhou District",
          ilid: "1000001"
        },
        {
          province: "江苏省",
          country: "中国",
          jp: "SZS",
          name: "苏州市",
          id: "1958",
          qp: "Suzhou City",
          ilid: "1000001"
        }
      ],
      "T": [
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "TCD",
          name: "塔城地区",
          id: "3248",
          qp: "Tacheng Area",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "TAS",
          name: "泰安市",
          id: "2602",
          qp: "Tai'an City",
          ilid: "1000001"
        },
        {
          province: "江苏省",
          country: "中国",
          jp: "TZS",
          name: "泰州市",
          id: "2023",
          qp: "Taizhou",
          ilid: "1000001"
        },
        {
          province: "浙江省",
          country: "中国",
          jp: "TZS",
          name: "台州市",
          id: "3613",
          qp: "Taizhou",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "TMS",
          name: "天门市",
          id: "1744",
          qp: "Tianmen City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "TSS",
          name: "天水市",
          id: "301",
          qp: "Tianshui City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "TZZ",
          name: "天祝藏族自治县",
          id: "313",
          qp: "Tianzhu Tibetan Autonomous County",
          ilid: "1000001"
        },
        {
          province: "辽宁省",
          country: "中国",
          jp: "TLS",
          name: "铁岭市",
          id: "2305",
          qp: "Tieling",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "TMG",
          name: "铁门关市",
          id: "3199",
          qp: "Tiemenguan City",
          ilid: "1000001"
        },
        {
          province: "陕西省",
          country: "中国",
          jp: "TCS",
          name: "铜川市",
          id: "2830",
          qp: "Tongchuan",
          ilid: "1000001"
        },
        {
          province: "吉林省",
          country: "中国",
          jp: "THS",
          name: "通化市",
          id: "2179",
          qp: "Tonghua",
          ilid: "1000001"
        },
        {
          province: "贵州省",
          country: "中国",
          jp: "TRS",
          name: "铜仁市",
          id: "752",
          qp: "Tongren",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "TWX",
          name: "通渭县",
          id: "348",
          qp: "Tongwei County",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "TLF",
          name: "吐鲁番市",
          id: "3166",
          qp: "Turpan",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "TMS",
          name: "图木舒克市",
          id: "3291",
          qp: "Tumshuk",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "TCX",
          name: "屯昌县",
          id: "944",
          qp: "Tunchang County",
          ilid: "1000001"
        }
      ],
      "W": [
        {
          province: "海南省",
          country: "中国",
          jp: "WNS",
          name: "万宁市",
          id: "899",
          qp: "Wanning City",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "WFS",
          name: "潍坊市",
          id: "2577",
          qp: "Weifang",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "WHS",
          name: "威海市",
          id: "2609",
          qp: "Weihai",
          ilid: "1000001"
        },
        {
          province: "陕西省",
          country: "中国",
          jp: "WNS",
          name: "渭南市",
          id: "2863",
          qp: "Weinan City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "WYX",
          name: "渭源县",
          id: "350",
          qp: "Weiyuan County",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "WCS",
          name: "文昌市",
          id: "878",
          qp: "Wenchang",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "WSZ",
          name: "文山壮族苗族自治州",
          id: "3493",
          qp: "Wenshan Zhuang and Miao Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "WX",
          name: "文县",
          id: "357",
          qp: "Wen County",
          ilid: "1000001"
        },
        {
          province: "浙江省",
          country: "中国",
          jp: "WZS",
          name: "温州市",
          id: "3558",
          qp: "Wenzhou city",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "WDQ",
          name: "武都区",
          id: "355",
          qp: "Wudu District",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "WHS",
          name: "武汉市",
          id: "1580",
          qp: "Wuhan",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "WJQ",
          name: "五家渠市",
          id: "3302",
          qp: "Wujiaqu City",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "WLM",
          name: "乌鲁木齐市",
          id: "3153",
          qp: "Urumqi",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "WSX",
          name: "武山县",
          id: "307",
          qp: "Wushan County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "WWS",
          name: "武威市",
          id: "309",
          qp: "Wuwei City",
          ilid: "1000001"
        },
        {
          province: "江苏省",
          country: "中国",
          jp: "WXS",
          name: "无锡市",
          id: "1930",
          qp: "Wuxi City",
          ilid: "1000001"
        },
        {
          province: "海南省",
          country: "中国",
          jp: "WZS",
          name: "五指山市",
          id: "831",
          qp: "Wuzhishan",
          ilid: "1000001"
        },
        {
          province: "宁夏回族自治区",
          country: "中国",
          jp: "WZS",
          name: "吴忠市",
          id: "2451",
          qp: "Wuzhong City",
          ilid: "1000001"
        },
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "WZS",
          name: "梧州市",
          id: "630",
          qp: "Wuzhou",
          ilid: "1000001"
        }
      ],
      "X": [
        {
          province: "甘肃省",
          country: "中国",
          jp: "XHX",
          name: "夏河县",
          id: "381",
          qp: "Xiahe County",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "XTS",
          name: "湘潭市",
          id: "1803",
          qp: "Xiangtan City",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "XXT",
          name: "湘西土家族苗族自治州",
          id: "1907",
          qp: "Xiangxi Tujia and Miao Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "XYS",
          name: "襄阳市",
          id: "1625",
          qp: "Xiangyang",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "XNS",
          name: "咸宁市",
          id: "1672",
          qp: "Xianning",
          ilid: "1000001"
        },
        {
          province: "陕西省",
          country: "中国",
          jp: "XAS",
          name: "西安市",
          id: "2818",
          qp: "Xi'An",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "XTS",
          name: "仙桃市",
          id: "1692",
          qp: "Xiantao City",
          ilid: "1000001"
        },
        {
          province: "陕西省",
          country: "中国",
          jp: "XYS",
          name: "咸阳市",
          id: "2848",
          qp: "Xianyang",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "XGS",
          name: "孝感市",
          id: "1644",
          qp: "Xiaogan",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "XFQ",
          name: "西峰区",
          id: "338",
          qp: "Xifeng District",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "XGQ",
          name: "西固区",
          id: "278",
          qp: "Xigu District",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "XHX",
          name: "西和县",
          id: "360",
          qp: "Xihe County",
          ilid: "1000001"
        },
        {
          province: "内蒙古自治区",
          country: "中国",
          jp: "XLG",
          name: "锡林郭勒盟",
          id: "2422",
          qp: "Xilin Gol League",
          ilid: "1000001"
        },
        {
          province: "内蒙古自治区",
          country: "中国",
          jp: "XAM",
          name: "兴安盟",
          id: "2415",
          qp: "Xing'an League",
          ilid: "1000001"
        },
        {
          province: "青海省",
          country: "中国",
          jp: "XNS",
          name: "西宁市",
          id: "2468",
          qp: "Xining City",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "XXS",
          name: "新乡市",
          id: "1454",
          qp: "Xinxiang City",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "XYS",
          name: "信阳市",
          id: "1546",
          qp: "Xinyang City",
          ilid: "1000001"
        },
        {
          province: "江西省",
          country: "中国",
          jp: "XYS",
          name: "新余市",
          id: "2072",
          qp: "Xinyu City",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "XSB",
          name: "西双版纳傣族自治州",
          id: "3502",
          qp: "Xishuangbanna Dai Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "XCS",
          name: "许昌市",
          id: "1502",
          qp: "Xuchang City",
          ilid: "1000001"
        },
        {
          province: "江苏省",
          country: "中国",
          jp: "XZS",
          name: "徐州市",
          id: "1940",
          qp: "Xuzhou",
          ilid: "1000001"
        }
      ],
      "Y": [
        {
          province: "四川省",
          country: "中国",
          jp: "YAS",
          name: "雅安市",
          id: "3064",
          qp: "Ya'An City",
          ilid: "1000001"
        },
        {
          province: "陕西省",
          country: "中国",
          jp: "YAS",
          name: "延安市",
          id: "2875",
          qp: "Yan'An",
          ilid: "1000001"
        },
        {
          province: "吉林省",
          country: "中国",
          jp: "YBC",
          name: "延边朝鲜族自治州",
          id: "2206",
          qp: "Yanbian Korean Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "江苏省",
          country: "中国",
          jp: "YCS",
          name: "盐城市",
          id: "1998",
          qp: "Yancheng",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "YJS",
          name: "阳江市",
          id: "497",
          qp: "Yangjiang",
          ilid: "1000001"
        },
        {
          province: "江苏省",
          country: "中国",
          jp: "YZS",
          name: "扬州市",
          id: "2008",
          qp: "Yangzhou",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "YTS",
          name: "烟台市",
          id: "2565",
          qp: "Yantai",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "YBS",
          name: "宜宾市",
          id: "3039",
          qp: "Yibin City",
          ilid: "1000001"
        },
        {
          province: "湖北省",
          country: "中国",
          jp: "YCS",
          name: "宜昌市",
          id: "1612",
          qp: "Yichang City",
          ilid: "1000001"
        },
        {
          province: "黑龙江省",
          country: "中国",
          jp: "YCS",
          name: "伊春市",
          id: "1321",
          qp: "Yichun City",
          ilid: "1000001"
        },
        {
          province: "江西省",
          country: "中国",
          jp: "YCS",
          name: "宜春市",
          id: "2112",
          qp: "Yichun City",
          ilid: "1000001"
        },
        {
          province: "新疆维吾尔自治区",
          country: "中国",
          jp: "YLH",
          name: "伊犁哈萨克自治州",
          id: "3237",
          qp: "Yili Kazakh Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "宁夏回族自治区",
          country: "中国",
          jp: "YCS",
          name: "银川市",
          id: "2440",
          qp: "Yinchuan",
          ilid: "1000001"
        },
        {
          province: "辽宁省",
          country: "中国",
          jp: "YKS",
          name: "营口市",
          id: "2278",
          qp: "Yingkou City",
          ilid: "1000001"
        },
        {
          province: "江西省",
          country: "中国",
          jp: "YTS",
          name: "鹰潭市",
          id: "2075",
          qp: "Yingtan City",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "YYS",
          name: "益阳市",
          id: "1858",
          qp: "Yiyang City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "YCX",
          name: "永昌县",
          id: "294",
          qp: "Yongchang County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "YDX",
          name: "永登县",
          id: "281",
          qp: "Yongdeng County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "YJX",
          name: "永靖县",
          id: "368",
          qp: "Yongjing County",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "YZS",
          name: "永州市",
          id: "1877",
          qp: "Yongzhou",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "YYS",
          name: "岳阳市",
          id: "1835",
          qp: "Yueyang City",
          ilid: "1000001"
        },
        {
          province: "广西壮族自治区",
          country: "中国",
          jp: "YLS",
          name: "玉林市",
          id: "660",
          qp: "Yulin City",
          ilid: "1000001"
        },
        {
          province: "陕西省",
          country: "中国",
          jp: "YLS",
          name: "榆林市",
          id: "2901",
          qp: "Yulin City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "YMS",
          name: "玉门市",
          id: "335",
          qp: "Yumen City",
          ilid: "1000001"
        },
        {
          province: "山西省",
          country: "中国",
          jp: "YCS",
          name: "运城市",
          id: "2756",
          qp: "Yuncheng",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "YFS",
          name: "云浮市",
          id: "582",
          qp: "Yunfu",
          ilid: "1000001"
        },
        {
          province: "青海省",
          country: "中国",
          jp: "YSZ",
          name: "玉树藏族自治州",
          id: "2504",
          qp: "Yushu Tibetan Autonomous Prefecture",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "YXS",
          name: "玉溪市",
          id: "3417",
          qp: "Yuxi City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "YZX",
          name: "榆中县",
          id: "283",
          qp: "Yuzhong County",
          ilid: "1000001"
        }
      ],
      "Z": [
        {
          province: "重庆市",
          country: "中国",
          jp: "zxc",
          name: "万州02",
          id: "990508897972262912",
          qp: "",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "ZZS",
          name: "枣庄市",
          id: "2553",
          qp: "Zaozhuang",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "ZJC",
          name: "张家川回族自治县",
          id: "308",
          qp: "Zhangjiachuan Hui Autonomous County",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "ZJJ",
          name: "张家界市",
          id: "1854",
          qp: "Zhangjiajie City",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "ZSS",
          name: "长沙市",
          id: "1783",
          qp: "Changsha City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "ZX",
          name: "漳县",
          id: "352",
          qp: "Zhang County",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "ZYS",
          name: "张掖市",
          id: "314",
          qp: "Zhangye",
          ilid: "1000001"
        },
        {
          province: "福建省",
          country: "中国",
          jp: "ZZS",
          name: "漳州市",
          id: "233",
          qp: "Zhangzhou",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "ZJS",
          name: "湛江市",
          id: "444",
          qp: "Zhanjiang",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "ZQS",
          name: "肇庆市",
          id: "461",
          qp: "Zhaoqing",
          ilid: "1000001"
        },
        {
          province: "云南省",
          country: "中国",
          jp: "ZTS",
          name: "昭通市",
          id: "3433",
          qp: "Zhaotong City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "ZNX",
          name: "正宁县",
          id: "343",
          qp: "Zhengning County",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "ZZS",
          name: "郑州市",
          id: "1389",
          qp: "Zhengzhou City",
          ilid: "1000001"
        },
        {
          province: "江苏省",
          country: "中国",
          jp: "ZJS",
          name: "镇江市",
          id: "2016",
          qp: "Zhenjiang",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "ZYX",
          name: "镇原县",
          id: "345",
          qp: "Zhenyuan County",
          ilid: "1000001"
        },
        {
          province: "",
          country: "中国",
          jp: "ZQS",
          name: "重庆市",
          id: "141",
          qp: "Chongqing",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "ZSS",
          name: "中山市",
          id: "547",
          qp: "Zhongshan City",
          ilid: "1000001"
        },
        {
          province: "宁夏回族自治区",
          country: "中国",
          jp: "ZWS",
          name: "中卫市",
          id: "2463",
          qp: "Zhongwei",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "ZKS",
          name: "周口市",
          id: "1557",
          qp: "Zhoukou City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "ZQX",
          name: "舟曲县",
          id: "377",
          qp: "Zhouqu County",
          ilid: "1000001"
        },
        {
          province: "浙江省",
          country: "中国",
          jp: "ZSS",
          name: "舟山市",
          id: "3609",
          qp: "Zhoushan City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "ZLX",
          name: "庄浪县",
          id: "327",
          qp: "Zhuanglang County",
          ilid: "1000001"
        },
        {
          province: "广东省",
          country: "中国",
          jp: "ZHS",
          name: "珠海市",
          id: "418",
          qp: "Zhuhai City",
          ilid: "1000001"
        },
        {
          province: "河南省",
          country: "中国",
          jp: "ZMD",
          name: "驻马店市",
          id: "1568",
          qp: "Zhumadian City",
          ilid: "1000001"
        },
        {
          province: "甘肃省",
          country: "中国",
          jp: "ZNX",
          name: "卓尼县",
          id: "376",
          qp: "Zhuoni County",
          ilid: "1000001"
        },
        {
          province: "湖南省",
          country: "中国",
          jp: "ZZS",
          name: "株洲市",
          id: "1793",
          qp: "Zhuzhou City",
          ilid: "1000001"
        },
        {
          province: "山东省",
          country: "中国",
          jp: "ZBS",
          name: "淄博市",
          id: "2544",
          qp: "Zibo",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "ZGS",
          name: "自贡市",
          id: "2955",
          qp: "Zigong City",
          ilid: "1000001"
        },
        {
          province: "四川省",
          country: "中国",
          jp: "ZYS",
          name: "资阳市",
          id: "3079",
          qp: "Ziyang City",
          ilid: "1000001"
        },
        {
          province: "贵州省",
          country: "中国",
          jp: "ZYS",
          name: "遵义市",
          id: "730",
          qp: "Zunyi City",
          ilid: "1000001"
        }
    ] },
    foreign: {}
  }
  const searchData = Array(40).fill({
    province: "贵州省",
    country: "中国",
    jp: "ZYS",
    name: "遵义市",
    id: "730",
    qp: "Zunyi City",
    ilid: "1000001"
  })
  return (
    <div>
      <CityPicker title={'城市'} showTitle commons={commons} groups={groups} cityList={cityList}/>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
