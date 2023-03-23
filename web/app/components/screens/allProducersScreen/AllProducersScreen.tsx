import {FC, memo} from 'react'

import { useGetProducersQuery } from '@/app/store/product/product.api'
import Preloader from '@/app/components/shared/preloader/Preloader'
import AllProducersPage from '@/app/components/ui/allProducersPage/AllProducersPage'

const AllProducersScreen: FC = memo(() => {
  const {data: producers, isLoading} = useGetProducersQuery(1)

  if (isLoading) {
    return <Preloader />
  }

  if (!producers) {
    return <div>Not Found</div>
  }

  return <AllProducersPage producers={producers} />
})

export default AllProducersScreen