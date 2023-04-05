import {FC, memo} from 'react'

import classNames from "classnames"
import Link from "next/link"

import {TiPlus} from 'react-icons/ti'

import styles from './productItem.module.scss'
import { Card, Grid, Skeleton } from '@mui/material'

const ProductItemPlaceholder: FC = memo(() => {

  return (
    <Grid item xs={12} md={3} sm={6}>
      <Card sx={{height: '100%'}}>
        <Skeleton
          sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
          variant="rectangular"
        />
        </Card>
    </Grid>
  )
})

export default ProductItemPlaceholder