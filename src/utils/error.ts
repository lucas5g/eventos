export function error(error: any) {

  const validations = error?.issues?.reduce((acc: any, error: any) => {
    return { ...acc, [error.path[0]]: error.message }
  }, {})

  if (validations) {
    return {
      status: 400,
      message: {
        message: 'Error Validation', 
        errors:validations
      }
    }

  }
  if(error.message.includes('prisma')){
    return {
      status: 500,
      message: {message: error.message}
    }
  }
  if(error.message.includes('token')){
    return {
      status:403,
      message: {message:error.message}
    }
  }
  return {
    status: 400,
    message:{message:error.message} 
  }
}