'use client'
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getProductById} from "@/api";
import Loader from "@/components/Loader";
import {useParams} from "next/navigation";
import styles from "@/styles/product.module.scss"
import {Box, Button, Heading, RadioCards, Text} from "@radix-ui/themes";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useStore} from "@/zustand/store";

const ProductPage = () => {
    const params = useParams()
    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ['productById'],
        queryFn: () => getProductById(params?.id)
    })
    const addToCart = useStore((state) => state.addToCart)
    const removeFromCart = useStore((state) => state.removeFromCart)
    const cart = useStore((state) => state.cart)
    const sizes = ["XS", "S", "M", "L", "XL", "XXl"]
    const colors = ["#FFFFFF", "#000", "#D13028", "#00aaff", "#ffff00", "#3b3a39"]
    const isAdded = () => cart.find(item => item.id === data?.id)
    return (
        isLoading ? <Loader/> :
            <div className="container">
                <div className={styles.productContainer}>
                    <Carousel useKeyboardArrows={true} className={styles.slider}>
                        {data.images.map((item, index) => (
                            <div className="slide" key={index}>
                                <img alt="sample_file" src={item} key={index} draggable={false}/>
                            </div>
                        ))}
                    </Carousel>

                    <div className={styles.info}>
                        <Heading>{data.title}</Heading>
                        <Text as="p" size="8" weight="bold" color="crimson"> {data.price}$ </Text>
                        <Text>Category: <Text color="crimson">{data.category.name}</Text></Text>
                        <Box>
                            <Text as="p" size="6" weight="bold" style={{marginBottom: 10}}> Choose size</Text>
                            <RadioCards.Root defaultValue={sizes[3]} columns={{initial: "3", sm: "4",}}>
                                {sizes.map((item, index) => {
                                    return <RadioCards.Item value={item} key={index}>
                                        <Text weight="bold">{item}</Text>
                                    </RadioCards.Item>
                                })}
                            </RadioCards.Root>
                        </Box>
                        <Box>
                            <Text as="p" size="6" weight="bold" style={{marginBottom: 10}}>Choose color</Text>
                            <RadioCards.Root defaultValue={sizes[3]} columns={{initial: "3", sm: "6",}}
                                             style={{width: 'max-content'}}>
                                {colors.map((item, index) => {
                                    return <RadioCards.Item value={item} key={index} disabled={index === 4}
                                                            style={{width: 50, padding: 0}}>
                                        <Box style={{backgroundColor: item, opacity: index === 4 ? 0.7 : 1}}
                                             width={'50px'} height={'50px'}/>
                                    </RadioCards.Item>
                                })}
                            </RadioCards.Root>
                        </Box>
                        <Button color="cyan">Buy</Button>
                        {
                            isAdded() ?
                                <Button onClick={(e) => {
                                    e.stopPropagation()
                                    removeFromCart(data.id)
                                }}>
                                    Remove from cart
                                </Button>
                                :
                                <Button onClick={(e) => {
                                    e.stopPropagation()
                                    addToCart(data)
                                }}>
                                    Add to cart
                                </Button>
                        }
                    </div>

                </div>
                <Box>
                    <Text as="p" size="6" weight="bold" style={{margin: "20px 0 10px 0"}}>Description</Text>
                    <Text as="p" size="6">{data.description}</Text>
                </Box>
            </div>
    );
};

export default ProductPage;
