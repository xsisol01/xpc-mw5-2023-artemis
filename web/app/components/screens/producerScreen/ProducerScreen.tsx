import { FC, memo } from "react";
import ProducerLayout from "../../layout/producerLayout/ProducerLayout";
import ProducersContent from "../../ui/producersContent/ProducersContent";


const ProducerScreen: FC = memo(() => {

  return (
    <ProducerLayout>
      <ProducersContent />
    </ProducerLayout>
  )
})