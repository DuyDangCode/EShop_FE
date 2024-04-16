import toast from 'react-hot-toast'

const promiseToast = async (
  promise: Promise<any>,
  successMessage: string,
  errorMessage: string,
  loadingMessage: string = 'Loading...',
  id: string = 'toast'
) => {
  toast.promise(
    promise,
    {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage
    },
    { id: id }
  )
}

export { promiseToast }
