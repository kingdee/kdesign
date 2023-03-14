---
title: 可编辑表格
order: 100
---
带单元格编辑功能的表格, 具体逻辑可以根据实际场景定制
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table } from '@kdcloudjs/kdesign'

function Demo() {
  const initDataSource = [
    {"No":1,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"26,800.00","balance":"5,200.00"},
    {"No":2,"order":"AP-202009-00002","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"},
    {"No":3,"order":"AP-202009-00003","from":"陕西环宇科技","to":"深圳环球科技","amount":"246,800.00","balance":"5,300.00"},
    {"No":4,"order":"AP-202009-00004","from":"陕西环宇科技","to":"深圳环球科技","amount":"216,800.00","balance":"5,400.00"},
    {"No":5,"order":"AP-202009-00005","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"}
  ]

  const initColumns = [
    { code: 'No', name: '序号', width: 60, align: 'center' },
    { code: 'order', name: '单据号', width: 200, editable: true  },
    { code: 'from', name: '来户', width: 200, editable: true  },
    { code: 'to', name: '往户', width: 200, editable: true  },
    { code: 'amount', name: '应付金额', width: 100, align: 'right'},
    { code: 'balance', name: '应收余额', width: 100, align: 'right'}
  ]

  const [dataSource,setDataSource] = React.useState(initDataSource)
  const [activeCell, setActiveCell] = React.useState({ row: -1, col: -1 });

  const getCellProps = (col) => (value, record, rowIndex) => {
      return {
        style: {
        },
        onClick(event) {
          const { row: preRow, col: preCol } = activeCell
          if (preRow !== rowIndex || preCol !== col) {
            setActiveCell({ row: rowIndex, col })
          }
        }
      };
    };

  const style = {
      width:'100%',
      height:'30px',
      padding: '2px 10px',
      border: '1px solid #cccccc',
      borderRadius:'2px'
  }

  const Editor = ({ value, colIndex, rowIndex }) => {
    const [cellValue, setValue] = React.useState(value);
    const onChange = (event) => {
      setValue(event.target.value);
    };
    React.useEffect(() => {
      setValue(value);
    }, [value]);

    const onBlur = () => {
      const code = initColumns[colIndex].code
      const newData = [...dataSource]
      newData.splice(rowIndex,1,{ ...dataSource[rowIndex],[code]:cellValue })
      setDataSource(newData)
      setActiveCell({ row: -1, col:-1 })
    };

    return (
      <input
        style={{...style, fontSize: 12}}
        value={cellValue}
        autoFocus
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  };

  const transAction = (col, colIndex) => {
      col.getCellProps = getCellProps(colIndex);
      if (!col.editable) {
          return col
      }
      col.render = (value, record, rowIndex) => {
      if (activeCell.row === rowIndex && activeCell.col === colIndex) {
          return  <Editor
                colIndex={colIndex}
                rowIndex={rowIndex}
                value={value}
              />
      } else {
          return <div style={{...style, display: 'flex' , 'alignItems': 'center'}}>{value}</div>;
      }
      };
      return col;
  };

  const columns = initColumns.map(transAction)

  return <Table dataSource={dataSource} columns={columns}  />
}

ReactDOM.render(<Demo />, mountNode)
```
