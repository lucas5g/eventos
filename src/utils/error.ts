export function error(error:any){
  return {
    status: 400,
    message:error.message
  }
}