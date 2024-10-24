import React from 'react';
import "./style.scss"
import {Button, Flex, Heading, Text} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import {useStore} from "@/zustand/store";

const ProductCard = ({card}) => {
    const router = useRouter()
    const addToCart = useStore((state) => state.addToCart)
    const removeFromCart = useStore((state) => state.removeFromCart)
    const cart = useStore((state) => state.cart)
    const isAdded = () => cart.find(item => item.id === card.id)
    return (
        <div className="card" onClick={() => router.push(`/product/${card.id}`)}>
            <img src={card.images[0]?.replace("[", "").replace("]", "").replace(/\\\//g, "/").replace(/"/g, '')}
                 alt={''} draggable={false}/>
            <div className="content">
                <Flex direction="column" gap="1">
                    <Heading size="3">{card.title}</Heading>
                    <Text size="2" className="desc">{card.description}</Text>

                </Flex>
                <Flex direction="column" gap="1">
                    <Flex direction="row" justify="between">
                        <Heading size="3">Price:</Heading>
                        <Text size="2" className="desc">{card.price}$</Text>
                    </Flex>
                    {
                        isAdded() ?
                            <Button onClick={(e) => {
                                e.stopPropagation()
                                removeFromCart(card.id)
                            }}>
                                Remove from cart
                            </Button>
                            :
                            <Button onClick={(e) => {
                                e.stopPropagation()
                                addToCart(card)
                            }}>
                                Add to cart
                            </Button>
                    }

                </Flex>

            </div>
        </div>
    );
};

export default ProductCard;
