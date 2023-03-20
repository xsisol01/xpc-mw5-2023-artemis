import classNames from "classnames"

import styles from './list.module.scss'

interface IProps {
  listItems: string[]
  uid: string
  getParam: (name: string) => string
  setParam: (name: string, value: string) => void
}

const List: React.FC<IProps> = ({uid, listItems, setParam, getParam}) => {

  return (
    <ul>
      {listItems.map(item => (
        <li
          key={item}
          className={classNames({
          [styles.list__item]: true,
          [styles.list__active]: getParam(uid) === item
          })}
          onClick={() => setParam(uid, item)}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default List