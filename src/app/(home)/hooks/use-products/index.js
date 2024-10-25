import {useQuery} from "@tanstack/react-query";
import {getCategories, getProducts} from "@/api";
import {useEffect, useState} from "react";

export const useProducts = () => {
    const [title, setTitle] = useState('')
    const [filterPrice, setFilterPrice] = useState([0, 2000])
    const [categoryId, setCategoryId] = useState('')
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(20)
    const {
        data,
        isLoading:isProductLoading,
        refetch,
    } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts(offset, limit, title, filterPrice[0], filterPrice[1], categoryId)
    })
    const {
        data:categories,
        isLoading:isCategoryLoading
    } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    })
    useEffect(() => {
        refetch()
    }, [title,categoryId,filterPrice,limit]);
    const isLoading=isCategoryLoading||isProductLoading
    return {data, isLoading,filterPrice,setFilterPrice,title,setTitle,categoryId,setCategoryId,categories,setLimit,limit}
}
