import { ApolloError } from '@apollo/client'

type graphQLErrorsField = {
  property: any // setError first arg accepts enum?
  errorMessage: {
    message: string
  }
}

export const parsedErrors = ({
  graphQLErrors: errors,
  message,
}: ApolloError) => {
  let graphQLErrors: graphQLErrorsField = {
    property: '',
    errorMessage: { message: '' },
  }

  // it would be better to separate each different errors becuase of different outputs and scenarios

  errors.forEach(({ extensions }) => {
    // This error is comming from nestjs/common UnauthorizedException
    if (extensions.code === 'INTERNAL_SERVER_ERROR') {
      if ((extensions.exception as any).response.sampleErrors) {
        ;(extensions.exception as any).response.sampleErrors.forEach(
          (fieldError: any) => {
            graphQLErrors = {
              property: fieldError.property,
              errorMessage: { message: fieldError.message },
            }
          }
        )
      }
    }

    // This error is comming from apollo-server-express AuthenticationError
    // pwede ra dli mag add ug condition kung equal ba siya sa iyang status code para ma capture tanan graphql errors
    if (extensions.code === 'UNAUTHENTICATED') {
      if (extensions.sampleErrors && Array.isArray(extensions.sampleErrors)) {
        extensions.sampleErrors.forEach((fieldError) => {
          graphQLErrors = {
            property: fieldError.property,
            errorMessage: { message: fieldError.message },
          }
        })
      } else {
        graphQLErrors = {
          property: '',
          errorMessage: { message },
        }
      }
    }
  })

  return graphQLErrors
}
