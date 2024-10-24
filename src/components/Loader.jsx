import React from 'react';
import {Flex, Spinner} from "@radix-ui/themes";

const Loader = () => {
    return (
        <Flex align="center"  style={{width:'100%'}}>
            <Spinner m="auto" size="3"/>
        </Flex>

    );
};

export default Loader;
