import { loadMoreButtonData } from './loadMoreButtonData'

import styles from './loadMoreButton.module.scss'
import ResizingButton from '../../shared/ResizingButton/ResizingButton'

interface IProps {
    onClick: () => void
}

const LoadMoreButton: React.FC<IProps> = ({onClick}) => {

    return (
        <ResizingButton
            text={loadMoreButtonData.loadMore}
            className={styles.loadMoreButton}
            onClick={onClick}
        />
    )
}

export default LoadMoreButton;