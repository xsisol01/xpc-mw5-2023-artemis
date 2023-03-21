
import classNames from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";

import { currencyFormatter } from "@/app/utils/currencyFormatter";
import Rating from "@/app/components/shared/rating/Rating";
import ResizingButton from "@/app/components/shared/ResizingButton/ResizingButton";

import { IProduct } from "@/app/store/product/product.type";

import styles from './productInfo.module.scss'
import { useGetCategoriesQuery, useGetProducersQuery } from "@/app/store/product/product.api";
import { productPageData } from "./productPage.data";

const AdminProductInfo: React.FC<IProduct> = (props) => {

    const {register, handleSubmit} = useForm<IProduct>({defaultValues: props})

    const {data: categories} = useGetCategoriesQuery(1);
    const {data: producers} = useGetProducersQuery(1);
    
    const onSubmit: SubmitHandler<IProduct> = (data) => {
        console.log(data)
    }

    return (
        <form
            className={classNames({
                [styles.productInfo]: true,
                [styles.adminProductInfo]: true
            })}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div
            className={styles.productInfo__image}
            style={{backgroundImage: `url("${props.image}")`}}
            ></div>
            <div className={styles.productInfo__text}>
                <input
                    className={styles.productInfo__title}
                    {...register('title', {required: true})}
                    type='text'
                />
 
                <div className={styles.productInfo__flex}>
                    <select {...register('producer', {required: true})} className={styles.productInfo__producer}>
                        {producers?.map(producer => (
                            <option key={producer} value={producer}>
                                {producer}
                            </option>
                        ))}
                    </select>
                    <select {...register('category', {required: true})} className={styles.productInfo__category}>
                        {categories?.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    Price: 
                    <input
                        className={styles.productInfo__price}
                        {...register('price', {required: true})}
                        type='number'
                    />
                </div>
                

                <div className={styles.productInfo__rating}>
                    <Rating {...props.rating} />
                </div>

                <div  className={styles.productInfo__weight}>
                    {productPageData.weight}: 
                    <input
                        className={styles.productInfo__price}
                        {...register('weight', {required: true})}
                        type='number'
                    /> {productPageData.unit}
                </div>
                
                <textarea {...register('description', {required: true})} className={styles.productInfo__description} />

                <div>
                    Count: 
                <input
                    className={styles.productInfo__count}
                    {...register('count', {required: true})}
                    type='number'
                    />
                </div>
                

                <ResizingButton text='Submit' type='submit' className={styles.productInfo__submit}  />
            </div>
        </form>
        
    )
}

export default AdminProductInfo