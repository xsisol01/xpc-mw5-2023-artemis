
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import ManufacturerLayout from "@/app/components/layout/manufacturerLayout/ManufacturerLayout";
import AdminManufacturerContent from "@/app/components/ui/manufacturerContent/AdminManufacturerContent";
import ManufacturerContent from "@/app/components/ui/manufacturerContent/ManufacturerContent";
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
    
    return (
        <HeaderLayout>
            <ManufacturerLayout>
            {isLoading && <CircularProgress />}
            {manufacturer && (
                isAdmin 
                ? <AdminManufacturerContent {...manufacturer} />
                : <ManufacturerContent {...manufacturer} />
            )}
            </ManufacturerLayout>
        </HeaderLayout>
        
    )
}

export default Manufacturer
