import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

const Input = React.forwardRef(
  (
    props: Partial<UseFormRegisterReturn> &
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
    ref: React.LegacyRef<HTMLInputElement> | undefined
  ) => <input {...props} ref={ref} />
)

Input.displayName = 'Input'

export default Input
