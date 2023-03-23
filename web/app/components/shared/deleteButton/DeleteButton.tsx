import {FC, memo} from 'react'

interface IProps {
  className?: string
  id: string | number
  elementType: string
  children: React.ReactNode
}

const DeleteButton: FC<IProps> = memo(({className = '', id, elementType, children}) => {


  return (
    <button className={className} onClick={onDelete}>
      {children}
    </button>
  )

  function onDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    event.preventDefault()
    event.nativeEvent.stopImmediatePropagation();

    const isConfirmed = confirm("Are you sure?")

    if (isConfirmed) {
      console.log('delete: ', elementType, '/', id)
    }
  }
})

export default DeleteButton