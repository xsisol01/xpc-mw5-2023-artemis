import Container from "@/app/components/layout/container/Container";
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import ManufacturerLayout from "@/app/components/layout/manufacturerLayout/ManufacturerLayout";
import ManufacturerContent from "@/app/components/ui/manufacturersContent/ManufacturersContent";
import { RoleContext } from "@/app/providers/roleContextProvider";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";

const Manufacturer: NextPage = () => {
    return (
        <HeaderLayout>
            <Container>
                <ManufacturerLayout>
                    <ManufacturerContent />
                </ManufacturerLayout>
            </Container>
        </HeaderLayout>
        
    )
}

export default Manufacturer
