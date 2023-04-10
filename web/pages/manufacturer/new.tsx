import { NextPage } from "next";

import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import CreateManufacturerScreen from "@/app/components/screens/createManufacturerScreen/CreateManufacturerScreen";
import LeftMenuLayout from "@/app/components/layout/leftMenuLayout/LeftMenuLayout";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import { CircularProgress } from "@mui/material";

const Manufacturer: NextPage = () => {

    const {manufacturers, isLoading} = useGetAllManufacturers()

    return (
        <HeaderLayout>
            {isLoading && <CircularProgress />}
            {manufacturers?.length && (
                <LeftMenuLayout options={manufacturers} linkTo='manufacturer'>
                    <CreateManufacturerScreen />
                </LeftMenuLayout>
            )}
            
        </HeaderLayout>
        
    )
}

export default Manufacturer
