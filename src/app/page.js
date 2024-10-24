'use client'
import styles from "@/styles/page.module.scss"
import Filter from "@/components/filter";
import ProductCard from "@/components/product-card";
import {useProducts} from "@/app/(home)/hooks/use-products";
import {Heading, Spinner} from "@radix-ui/themes";


export default function Home() {

    const {
        data,
        isLoading,
        filterPrice,
        setFilterPrice,
        title,
        setTitle,
        categoryId,
        setCategoryId,categories
    } = useProducts()

    return (
        <div className="container">
            <Filter filterPrice={filterPrice} setFilterPrice={setFilterPrice} title={title} setTitle={setTitle}
                    setCategoryId={setCategoryId} categoryId={categoryId} categories={categories}/>

            <div className={styles.productsContainer}>
                {isLoading ? <Spinner m="auto" size="3"/> :
                    data.length ?
                        data?.map(item => <ProductCard card={item} key={item.id}/>) :
                        <Heading>Not found(</Heading>
                }
            </div>

        </div>

    );
}
