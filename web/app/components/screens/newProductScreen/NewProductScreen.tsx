import AdminProductInfo from "../../ui/productPage/AdminProductInfo"
import { newProductData } from "./newProduct.data"

const NewProductScreen: React.FC = () => {

  return <AdminProductInfo {...newProductData} />
}

export default NewProductScreen