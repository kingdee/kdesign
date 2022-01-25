import { features } from '@kdcloudjs/table'

import { TableRowSelection, TablePipeline } from '../interface'

function useRowSelection(pipeline: TablePipeline, rowSelection?: TableRowSelection) {
  if (rowSelection) {
    if (rowSelection.type === 'radio') {
      const { column, fixed, onChange, value, defaultValue, clickArea, ...other } = rowSelection
      pipeline.use(
        features.singleSelect({
          defaultValue: defaultValue?.[0],
          value: value ? (value.length === 0 ? '' : value[0]) : undefined,
          radioColumn: column,
          radioPlacement: fixed,
          onChange: (next) => onChange?.([next]),
          clickArea: clickArea === 'self' ? 'radio' : clickArea,
          ...other,
        }),
      )
    } else {
      const { column, fixed, onChange, clickArea, ...other } = rowSelection
      pipeline.use(
        features.multiSelect({
          checkboxColumn: column,
          checkboxPlacement: fixed,
          onChange: (next, key, keys, action) => onChange?.(next, key, keys, action),
          clickArea: clickArea === 'self' ? 'checkbox' : clickArea,
          ...other,
        }),
      )
    }
  }
}

export default useRowSelection
