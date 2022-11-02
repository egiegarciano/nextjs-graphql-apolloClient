import React from 'react'

type Props = {
  register: any
  name: string
  rest: any
  label?: string
}

const Input = ({ register, name, label, ...rest }: Props) => {
  return (
    <>
      <label>{label}</label>
      <input {...register(name)} {...rest} />
    </>
  )
}

export default Input
