import { NextPage } from "next";

import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import LeftMenuLayout from "@/app/components/layout/leftMenuLayout/LeftMenuLayout";
import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { CircularProgress } from "@mui/material";
import CreateCategory from "@/app/components/ui/categoryContent/CreateCategory";

const Manufacturer: NextPage = () => {
  const {categories, isLoading} = useGetAllCategories()

    return (
        <HeaderLayout>
          {isLoading && <CircularProgress />}
          {categories && (
            <LeftMenuLayout options={categories} linkTo='category'>
                <CreateCategory />
            </LeftMenuLayout>
          )}
            
        </HeaderLayout>
        
    )
}

export default Manufacturer
