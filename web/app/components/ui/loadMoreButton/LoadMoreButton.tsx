import {FC, memo} from 'react'

import { loadMoreButtonData } from './loadMoreButtonData'

import styles from './loadMoreButton.module.scss'
import ResizingButton from '@/app/components/shared/ResizingButton/ResizingButton'

interface IProps {
    onClick: () => void
}

const LoadMoreButton: FC<IProps> = memo(({onClick}) => {

    return (
        <ResizingButton
            text={loadMoreButtonData.loadMore}
            className={styles.loadMoreButton}
            onClick={onClick}
        />
    )
})

export default LoadMoreButton;