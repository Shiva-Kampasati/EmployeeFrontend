import swal from 'sweetalert2'

export const SuccessAlert=(title, msg, status, showConfirmButton)=>{
   return  swal.fire({title:title,text:msg, icon:status, showConfirmButton:showConfirmButton})
}

export const FailAlert=(title, msg, status, showConfirmButton)=>{
    return  swal.fire({title:title,text:msg, icon:status, showConfirmButton:showConfirmButton})
}