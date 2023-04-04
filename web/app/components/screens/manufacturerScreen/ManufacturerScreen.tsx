import { FC, memo } from "react";
import ManufacturerLayout from "@/app/components/layout/manufacturerLayout/ManufacturerLayout";
import ManufacturersContent from "@/app/components/ui/manufacturersContent/ManufacturersContent";


const ManufacturerScreen: FC = memo(() => {

  return (
    <ManufacturerLayout>
      <ManufacturersContent />
    </ManufacturerLayout>
  )
})