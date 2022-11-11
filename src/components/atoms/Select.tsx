import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type Option = {
  label: React.ReactNode
  value: string | number | string[]
}

type SelectProps = UseFormRegisterReturn & { options: Option[] }

const Select = React.forwardRef(
  ({ options, ...props }: SelectProps, ref: any) => (
    <select {...props} ref={ref}>
      {options.map(({ label, value }) => (
        <option key={value as string} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
)

Select.displayName = 'Select'

export default Select
