import { NextPage } from "next";

import AllProducersScreen from "@/app/components/screens/allProducersScreen/AllProducersScreen";
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import Container from "@/app/components/layout/container/Container";
import ProducerLayout from "@/app/components/layout/producerLayout/ProducerLayout";

const AllProducers: NextPage = () => {
  return (
    <HeaderLayout>
      <Container>
        <ProducerLayout>
          <div>
            Select Producer
          </div>
        </ProducerLayout>
      </Container>
    </HeaderLayout>
  )
   
}

export default AllProducers


