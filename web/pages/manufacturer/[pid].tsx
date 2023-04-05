
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import ManufacturerLayout from "@/app/components/layout/manufacturerLayout/ManufacturerLayout";
import { RoleContext } from "@/app/providers/roleContextProvider";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";

const Manufacturer: NextPage = () => {
    return (
        <HeaderLayout>
            <ManufacturerLayout />
        </HeaderLayout>
        
    )
}

export default Manufacturer
