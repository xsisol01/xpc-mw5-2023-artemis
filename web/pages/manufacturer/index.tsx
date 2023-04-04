import { NextPage } from "next";

import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import Container from "@/app/components/layout/container/Container";
import ManufacturerLayout from "@/app/components/layout/manufacturerLayout/ManufacturerLayout";

const AllManufacturers: NextPage = () => {
  return (
    <HeaderLayout>
      <Container>
        <ManufacturerLayout>
          <div>
            Select manufacturer
          </div>
        </ManufacturerLayout>
      </Container>
    </HeaderLayout>
  )
   
}

export default AllManufacturers


