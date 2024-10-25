import React from 'react';
import {Flex, Spinner} from "@radix-ui/themes";

const Loader = () => {
    return (
        <Flex align="center"  style={{width:'100%',margin:'auto',position:'absolute',top:0,left:0,right:0,bottom:0}}>
            <Spinner m="auto" size="3"/>
        </Flex>

    );
};

export default Loader;
