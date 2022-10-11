import { ApolloError } from '@apollo/client'

type graphQLErrorsField = {
  property: any // setError first arg accepts enum?
  message: string
}

export const parsedClassValidatorErrors = ({
  graphQLErrors: errors,
}: ApolloError) => {
  let graphQLErrors: graphQLErrorsField[] = []

  // how about using try catch block

  errors.forEach(({ extensions }) => {
    // Parsing error from class-validator
    if (extensions.code === 'BAD_USER_INPUT') {
      ;(extensions.response as any).message.forEach((fieldError: any) => {
        const messageVal: any = Object.values(fieldError?.constraints).reduce(
          (previousValue: any, currentValue: any) => {
            return previousValue + ` and ${currentValue}`
          }
        )

        graphQLErrors.push({
          property: fieldError.property,
          message: messageVal,
        })
      })
    }
  })

  return graphQLErrors
}
