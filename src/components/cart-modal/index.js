import React, {useEffect} from 'react';
import {Avatar, Box, Button, Card, Dialog, Flex, IconButton, Text} from "@radix-ui/themes";
import {useStore} from "@/zustand/store";
import {TrashIcon} from "@radix-ui/react-icons";
import "./style.scss"
const CartModal = () => {
    const cart = useStore((state) => state.cart)
    const removeFromCart = useStore((state) => state.removeFromCart)
    const resetCart = useStore((state) => state.resetCart)

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <div className="cart">
                    <img src={"/cart.svg"} alt={''}/>
                    {cart.length > 0 && <div className="count">
                        <b>{cart.length}</b>
                    </div>}
                </div>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px" className="dialog">
                <Dialog.Title color="crimson">Cart</Dialog.Title>
                <Flex direction="column" gap="2" py="10px">
                    {cart.length ?
                        cart.map(item => <Flex direction="row" align="center" gap="1" key={item.id}>
                                <Card style={{width: '100%'}}>
                                    <Flex gap="3" align="center">
                                        <Avatar
                                            size="3"
                                            src={item.images[0]}
                                            radius="full"
                                            fallback="T"
                                        />
                                        <Box>
                                            <Text as="div" size="2" weight="bold">
                                                {item.title}
                                            </Text>
                                            <Text as="div" size="2" color="crimson">
                                                {item.price}$
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                                <IconButton size="3" onClick={() => removeFromCart(item.id)}>
                                    <TrashIcon/>
                                </IconButton>
                            </Flex>
                        ) :
                        <Dialog.Title>Cart is empty</Dialog.Title>
                    }
                    {
                        cart.length > 0 &&
                        <Dialog.Close>
                            <Button color="cyan">Buy</Button>
                        </Dialog.Close>
                    }
                    <Button disabled={cart.length === 0} onClick={resetCart}>Reset cart</Button>
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Close
                        </Button>
                    </Dialog.Close>
                </Flex>


            </Dialog.Content>
        </Dialog.Root>

    );
};

export default CartModal;
