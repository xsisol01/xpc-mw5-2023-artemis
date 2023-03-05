import {AdminLayout, AdminScreen} from "@/app/config/globalExport";
import { NextPage } from "next";


const ErrorPage: NextPage = () => {
    return (
        <AdminLayout>
            <AdminScreen />
        </AdminLayout>
    )
}

export default ErrorPage