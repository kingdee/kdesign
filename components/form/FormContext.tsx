import React from 'react'

export interface Forms {
  [name: string]: any
}

export interface FormContextProps {
  registerForm: (name: string, form: any) => void
  unregisterForm: (name: string) => void
}

const FormContext = React.createContext<FormContextProps>({
  // eslint-disable-next-line
  registerForm: () => {},
  // eslint-disable-next-line
  unregisterForm: () => {},
})

const FormProvider: React.FC<any> = ({ children }) => {
  const formContext = React.useContext(FormContext)

  const formsRef = React.useRef<Forms>({})

  return (
    <FormContext.Provider
      value={{
        ...formContext,
        registerForm: (name, form) => {
          if (name) {
            formsRef.current = {
              ...formsRef.current,
              [name]: form,
            }
          }

          formContext.registerForm(name, form)
        },
        unregisterForm: (name) => {
          const newForms = { ...formsRef.current }
          delete newForms[name]
          formsRef.current = newForms

          formContext.unregisterForm(name)
        },
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export { FormProvider }

export default FormContext
