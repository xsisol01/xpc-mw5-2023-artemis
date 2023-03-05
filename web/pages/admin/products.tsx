import {AdminLayout, AdminProducts} from "@/app/config/globalExport";
import { NextPage } from "next";


const Products: NextPage = () => {
    return (
        <AdminLayout>
            <AdminProducts />
        </AdminLayout>
    )
}

export default Products