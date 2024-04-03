import * as React from 'react'

function getUseId() {
  const fullClone: any = {
    ...React,
  }

  return fullClone?.useId
}

let uuid = 0

const useOriginId = getUseId()

export default useOriginId
  ? function useId(id?: string) {
      const reactId = useOriginId()

      if (id) {
        return id
      }

      return reactId
    }
  : function useCompatId(id?: string) {
      const [innerId, setInnerId] = React.useState<string>('ssr-id')

      React.useEffect(() => {
        const nextId = uuid
        uuid += 1

        setInnerId(`kd_unique_${nextId}`)
      }, [])

      if (id) {
        return id
      }

      return innerId
    }
