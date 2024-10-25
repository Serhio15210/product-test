'use client'
import styles from "@/styles/page.module.scss"
import Filter from "@/components/filter";
import ProductCard from "@/components/product-card";
import {useProducts} from "@/app/(home)/hooks/use-products";
import {Heading, Spinner} from "@radix-ui/themes";
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
    const {ref, entry} = useInView({trackVisibility: true, delay: 100});
    useEffect(() => {
        if (entry?.isVisible) {
            setLimit(prev => prev + 20)
        }
    }, [entry]);
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
                            {data.length < 60 && <div ref={ref}  style={{margin:'auto',position:'absolute',bottom:0,left:0,right:0}}><Loader/></div>}

                        </> :
                        <Heading>Not found(</Heading>
                }
            </div>

        </div>
        </>
    );
}
