import { FC, ReactNode } from 'react'
import classNames from 'classnames'

export type FormErrorMessageProps = {
  className?: string
  children: ReactNode
}

export const FormErrorMessage: FC<FormErrorMessageProps> = ({
  children,
  className,
}) => (
  <p
    className={classNames(
      'block text-left font-serif text-sm text-red-600',
      className
    )}
  >
    {children}
  </p>
)
