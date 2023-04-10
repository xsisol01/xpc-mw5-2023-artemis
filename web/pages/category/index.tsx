import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import LeftMenuLayout from "@/app/components/layout/leftMenuLayout/LeftMenuLayout";
import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { CircularProgress } from "@mui/material";
import { NextPage } from "next";

const Categories: NextPage = () => {

  const {categories, isLoading} = useGetAllCategories()

  return (
    <HeaderLayout>
      {isLoading && <CircularProgress />}
      {categories && (
        <LeftMenuLayout options={categories} linkTo='category'>
          <div>
            categories
          </div>
        </LeftMenuLayout>
      )}
      
    </HeaderLayout>
  )
}

export default Categories