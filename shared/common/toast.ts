import { toast } from 'react-toastify'

export const Toast = {
    success: (message:string) => {
        toast.success(message,{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    },
    info: (message:string) => {
        toast.info(message,{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    },
    error: (message:string) => {
        toast.error(message,{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    },
    warning: (message:string) => {
        toast.success(message,{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    },
    default: (message:string) => {
        toast(message,{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    },
    promise: (callback) => {
        return(toast.promise(callback,
        {
            pending: {
            render(){
                return "I'm loading"
            },
            icon: false,
            },
            success: {
            render({data}){
                return `Hello ${data}`
            },
            // other options
            icon: "🟢",
            },
            error: {
            render({data}){
                // When the promise reject, data will contains the error
                // return <MyErrorComponent message={data.message} />
            }
            }
        }))
    }
}

