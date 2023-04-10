
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import LeftMenuLayout from "@/app/components/layout/leftMenuLayout/LeftMenuLayout";
import AdminManufacturerContent from "@/app/components/ui/manufacturerContent/AdminManufacturerContent";
import ManufacturerContent from "@/app/components/ui/manufacturerContent/ManufacturerContent";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import { useGetManufacturer } from "@/app/hooks/manufacturer/useGetManufacturer";
import { RoleContext } from "@/app/providers/roleContextProvider";
import { CircularProgress } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";

const Manufacturer: NextPage = () => {
    const {isAdmin} = useContext(RoleContext)
    const {query} = useRouter()
    const {pid} = query

    if (!pid) {
        return <CircularProgress />
    }

    const {manufacturer, isLoading} = useGetManufacturer(pid.toString())
    const {manufacturers, isLoading: isManufacturersLoading} = useGetAllManufacturers()
    
    return (
        <HeaderLayout>
            {isManufacturersLoading && <CircularProgress />}
            {manufacturers && (
                <LeftMenuLayout options={manufacturers} linkTo='manufacturer'>
                    {isLoading && <CircularProgress />}
                    {manufacturer && (
                        isAdmin 
                        ? <AdminManufacturerContent {...manufacturer} />
                        : <ManufacturerContent {...manufacturer} />
                    )}
                </LeftMenuLayout>
            )}
        </HeaderLayout>
    )
}

export default Manufacturer
