import { capitalizeText, currencyFormatter, IProduct, Rating, ResizingButton } from "@/app/config/globalExport";
import classNames from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from './productInfo.module.scss'

const AdminProductInfo: React.FC<IProduct> = (props) => {

    const {register, handleSubmit} = useForm<IProduct>({defaultValues: props})

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
                    {...register('title')}
                    type='text'
                />
                <div className={styles.productInfo__category}>
                    {props.category}
                </div>
                <div className={styles.productInfo__price}>
                    {currencyFormatter(props.price)}
                </div>
                <div className={styles.productInfo__rating}>
                    <Rating {...props.rating} />
                </div>
                <textarea {...register('description')} className={styles.productInfo__description} />
                <ResizingButton text='Submit' type='submit' className={styles.productInfo__submit}  />
            </div>
        </form>
    )
}

export default AdminProductInfo