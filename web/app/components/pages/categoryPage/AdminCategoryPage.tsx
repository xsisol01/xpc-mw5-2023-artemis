import { FC, memo } from "react";
import { useUpdateCategory } from "@/app/hooks/category/useUpdateCategory";
import { ICategory, ICreateCategory } from "@/app/types/category.type";

import RightDeleteButton from "@/app/components/shared/button/deleteButton/RightDeleteButton";
import CategoryForm from "../../shared/form/categoryForm/CategoryForm";
import { categoryPageData } from "./categoryPage.data";


interface IProps {
  category?: ICategory
}

const AdminCategoryPage: FC<IProps> = memo(({category}) => {

  const { isLoading, updateCategory } = useUpdateCategory(category ?? categoryPageData.defaultValues);

  const onSubmit = async (data: ICreateCategory) => {
    const formData = {
      ...data,
      id: category?.id ?? categoryPageData.defaultValues.id,
    };

    await updateCategory(formData);
  };

  return (
    <>
      <CategoryForm
        onSubmit={onSubmit}
        defaultValues={category ?? categoryPageData.defaultValues}
        isLoading={isLoading}
      />
      <RightDeleteButton id={category?.id ?? categoryPageData.defaultValues.id} elementType="category" />
    </>
  );
});

AdminCategoryPage.displayName = "AdminCategoryPage";

export default AdminCategoryPage;
