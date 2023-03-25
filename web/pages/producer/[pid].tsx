import Container from "@/app/components/layout/container/Container";
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import ProducerLayout from "@/app/components/layout/producerLayout/ProducerLayout";
import ProducersContent from "@/app/components/ui/producersContent/ProducersContent";
import { RoleContext } from "@/app/providers/roleContextProvider";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";

const Producer: NextPage = () => {
    return (
        <HeaderLayout>
            <Container>
                <ProducerLayout>
                    <ProducersContent />
                </ProducerLayout>
            </Container>
        </HeaderLayout>
        
    )
}

export default Producer
