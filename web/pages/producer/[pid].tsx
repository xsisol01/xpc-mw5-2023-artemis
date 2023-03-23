import Container from "@/app/components/layout/container/Container";
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import ProducerLayout from "@/app/components/layout/producerLayout/ProducerLayout";
import ProducersContent from "@/app/components/ui/producersContent/ProducersContent";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Producer: NextPage = (props) => {

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