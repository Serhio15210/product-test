'use client'
import styles from "@/styles/page.module.scss"
import Filter from "@/components/filter";
import ProductCard from "@/components/product-card";
import {useProducts} from "@/app/(home)/hooks/use-products";
import {Flex, Heading, Spinner} from "@radix-ui/themes";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import Loader from "@/components/Loader";
import ScrollToTop from "react-scroll-to-top";
import MainBlock from "@/components/main-block";


export default function Home() {

    const {
        data,
        isLoading,
        filterPrice,
        setFilterPrice,
        title,
        setTitle,
        categoryId,
        setCategoryId, categories, setLimit, limit
    } = useProducts()
    const {ref, entry,inView} = useInView({threshold: 0, delay: 100});
    useEffect(() => {
        if (inView) {
            setLimit(limit + 20)
        }
    }, [inView]);
    return (
        <>
            <MainBlock/>

        <div className="container main">
            <ScrollToTop smooth color="crimson"/>

            <Filter filterPrice={filterPrice} setFilterPrice={setFilterPrice} title={title} setTitle={setTitle}
                    setCategoryId={setCategoryId} categoryId={categoryId} categories={categories}/>

            <div className={styles.productsContainer}>
                {isLoading ? <Spinner m="auto" size="3"/> :
                    data.length ?
                        <>
                            {data?.map(item => <ProductCard card={item} key={item.id}/>)}
                        </> :
                        <Heading>Not found(</Heading>
                }
            </div>
            {data?.length>0&&data?.length < 60 && <Flex ref={ref} align="center" justify="center" > <Spinner size="3"/></Flex>}
        </div>
        </>
    );
}
