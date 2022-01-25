import React from 'react'

function useForceUpdate() {
  const [, updateState] = React.useState<any>()
  const forceUpdate = React.useCallback(() => {
    updateState({})
  }, [])
  return forceUpdate
}

export default useForceUpdate
