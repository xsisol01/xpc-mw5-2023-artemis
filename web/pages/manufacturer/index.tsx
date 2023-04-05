import { NextPage } from "next";

import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import ManufacturerLayout from "@/app/components/layout/manufacturerLayout/ManufacturerLayout";

const AllManufacturers: NextPage = () => {
  return (
    <HeaderLayout>
        <ManufacturerLayout>
          <div>
            Select manufacturer
          </div>
        </ManufacturerLayout>
    </HeaderLayout>
  )
   
}

export default AllManufacturers


