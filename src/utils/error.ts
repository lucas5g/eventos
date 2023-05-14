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
  // if(error.message.includes('utilizado')){
  //   return {
  //     status:401,
  //     message: {message:error.message}
  //   }
  // }
  return {
    status: 400,
    message:{message:error.message} 
  }
}