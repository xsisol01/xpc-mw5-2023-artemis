import { NextPage } from "next";

import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import { CircularProgress } from "@mui/material";
import LeftMenuLayout from '@/app/components/layout/leftMenuLayout/LeftMenuLayout'

const AllManufacturers: NextPage = () => {
  const {manufacturers, isLoading} = useGetAllManufacturers()
 
  return (
    <HeaderLayout>
      {isLoading && <CircularProgress />}
      {manufacturers && (
        <LeftMenuLayout options={manufacturers} linkTo='manufacturer'>
          <div>
            Select manufacturer
          </div>
        </LeftMenuLayout>
      )}
    </HeaderLayout>
  )
   
}

export default AllManufacturers


