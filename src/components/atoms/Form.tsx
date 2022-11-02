import React from 'react'
import { useForm, UseFormProps } from 'react-hook-form'

type Props = {
  defaultValues: UseFormProps
  children: any //React.Node
  onSubmit: any
}

// Search and reaview again typescript generics

// Make a reusable react hook form component with
export default function Form({ defaultValues, children, onSubmit }: Props) {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child
      })}
    </form>
  )
}
