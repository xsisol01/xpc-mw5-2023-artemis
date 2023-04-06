import { NextPage } from "next";

import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import ManufacturerLayout from "@/app/components/layout/manufacturerLayout/ManufacturerLayout";
import CreateManufacturerScreen from "@/app/components/screens/createManufacturerScreen/CreateManufacturerScreen";

const Manufacturer: NextPage = () => {
    return (
        <HeaderLayout>
            <ManufacturerLayout>
                <CreateManufacturerScreen />
            </ManufacturerLayout>
        </HeaderLayout>
        
    )
}

export default Manufacturer
