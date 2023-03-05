import {AdminLayout, AdminProducers} from "@/app/config/globalExport";
import { NextPage } from "next";


const Producers: NextPage = () => {
    return (
        <AdminLayout>
            <AdminProducers />
        </AdminLayout>
    )
}

export default Producers