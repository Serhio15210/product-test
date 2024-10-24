import {useAxios} from "@/api/use-axios";

const axios=useAxios()
export const getProducts=async (offset=0,limit=10,title,price_min,price_max,categoryId) => {
    const url=`/products?offset=${offset}&limit=${limit}`
    const titleUrl=title?`&title=${title}`:''
    const priceUrl=price_min&&price_max?`&price_min=${price_min}&price_max=${price_max}`:''
    const categoryUrl=categoryId?`&categoryId=${categoryId}`:''
    const response = await axios.get(url+titleUrl+priceUrl+categoryUrl)
    return response?.data
}
export const getProductById=async (id) => {
    const url=`/products/${id}`
    const response = await axios.get(url)
    return response?.data
}
export const getCategories=async () => {
    const url=`/categories`
    const response = await axios.get(url)
    return response?.data
}
