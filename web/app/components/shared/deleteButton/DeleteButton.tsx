import { useDeleteProduct } from '@/app/hooks/product/useDeleteProduct'
import {FC, memo} from 'react'

interface IProps {
  className?: string
  id: string | number
  elementType: string
  children: React.ReactNode
}

const DeleteButton: FC<IProps> = memo(({className = '', id, elementType, children}) => {

  const {isLoading, deleteProduct} = useDeleteProduct(id.toString())

  function onDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    event.preventDefault()
    event.nativeEvent.stopImmediatePropagation();

    const isConfirmed = confirm("Are you sure?")

    if (isConfirmed) {
      deleteProduct(id.toString())
    }
  }

  return (
    <button className={className} onClick={onDelete}>
      {children}
    </button>
  )

  
})

export default DeleteButton