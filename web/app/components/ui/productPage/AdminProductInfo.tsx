import {FC, memo} from 'react'

import classNames from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";

import ResizingButton from "@/app/components/shared/ResizingButton/ResizingButton";

import { IProduct, ICreateProduct } from "@/app/store/product/product.type";

import styles from './productInfo.module.scss'
import { productPageData } from "./productPage.data";
import ProductInfoImages from "./productInfoImage/ProductInfoImages";
import { useRouter } from 'next/router';
import { useGetAllCategories } from '@/app/hooks/category/useGetAllCategories';
import { useGetAllProducers } from '@/app/hooks/producer/useGetAllProducers';

const AdminProductInfo: FC<IProduct | ICreateProduct> = memo((props) => {

    const {categories} = useGetAllCategories();
    const {producers} = useGetAllProducers();

    const router = useRouter()
    const {producer} = router.query

    let defaultValues = props 

    if (producer) {

        defaultValues = {
            ...props,
            producer: producers?.find(t => t.id === producer)?.name ?? ''
        }
    }

    const {register, handleSubmit} = useForm<IProduct>({defaultValues})
    
    
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
            <ProductInfoImages image={props.image} isAdmin={true} />
            <div className={styles.productInfo__text}>
                Title:
                <input
                    className={styles.productInfo__title}
                    {...register('title', {required: true})}
                    type='text'
                />
 
                <div className={styles.productInfo__flex}>
                    <div>
                        Producer:
                        <select {...register('producer', {required: true})} className={styles.productInfo__producer}>
                            {producers?.map(producer => (
                                <option key={producer.id} value={producer.name}>
                                    {producer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        Category:
                        <select {...register('category', {required: true})} className={styles.productInfo__category}>
                            {categories?.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                </div>

                <div>
                    Price: 
                    <input
                        className={styles.productInfo__price}
                        {...register('price', {required: true})}
                        type='number'
                    />
                    CZK
                </div>
                
                <div  className={styles.productInfo__weight}>
                    {productPageData.weight}: 
                    <input
                        className={styles.productInfo__price}
                        {...register('weight', {required: true})}
                        type='number'
                    /> {productPageData.unit}
                </div>
                
                <div>
                    Description:
                    <textarea {...register('description', {required: true})} className={styles.productInfo__description} />
                </div>
                
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
})

export default AdminProductInfo