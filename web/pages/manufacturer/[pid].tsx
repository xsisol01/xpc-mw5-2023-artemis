
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import ManufacturerLayout from "@/app/components/layout/manufacturerLayout/ManufacturerLayout";
import ManufacturerContent from "@/app/components/ui/manufacturerContent/ManufacturerContent";
import { NextPage } from "next";

const Manufacturer: NextPage = () => {
    return (
        <HeaderLayout>
            <ManufacturerLayout>
                <ManufacturerContent />
            </ManufacturerLayout>
        </HeaderLayout>
        
    )
}

export default Manufacturer
