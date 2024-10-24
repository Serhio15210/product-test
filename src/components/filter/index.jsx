import React, {useState} from 'react';
import styles from "./style.scss";
import {Button, Flex, Heading, Select, Slider, TextField} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import * as Form from "@radix-ui/react-form";

const Filter = ({filterPrice, setFilterPrice, title, setTitle, categoryId, setCategoryId, categories}) => {
    const [price, setPrice] = useState(filterPrice)
    const [query, setQuery] = useState(title)
    return (
        <div className="filterContainer">
            <div className="searchRow">
                <Heading size="8">WELCOME</Heading>
                <Form.Root onSubmit={(e) => {
                    e.preventDefault()
                    const data = Object.fromEntries(new FormData(e.currentTarget));
                    setTitle(data.query)
                }} className="formRow">
                    <Form.Field name="query" style={{flex: 1}}>
                        <TextField.Root placeholder="Search…" size="3" className={styles.search} value={query}
                                        name="query"
                                        onChange={(e) => setQuery(e.target.value)}

                        >
                            <TextField.Slot>
                                <MagnifyingGlassIcon height="16" width="16"/>
                            </TextField.Slot>
                        </TextField.Root>
                    </Form.Field>
                    <Button type="submit">Search</Button>
                </Form.Root>

            </div>
            <div className="searchRow">
                <Heading size="5">Choose price</Heading>
                <div className="rangeContainer">
                    <Flex direction="row" gap="2" justify="between" style={{width: '100%'}}>
                        <Heading size="3">From {price[0]}</Heading>
                        <Heading size="3">To {price[1]}</Heading>
                    </Flex>
                    <Slider defaultValue={[0, 2000]} max={5000} onValueCommit={(value, index) => {
                        setFilterPrice(value)
                        setPrice(value)
                    }} onValueChange={(value, index) => {
                        setPrice(value)
                    }}/>
                </div>
            </div>
            <div className="searchRow">
                <Heading size="5">Choose Category</Heading>
                <Select.Root   style={{width: '100%'}} size="3"
                               value={categoryId}
                             onValueChange={setCategoryId}>
                    <Select.Trigger placeholder="Choose category" />
                    <Select.Content>
                        {categories?.map(item => <Select.Item key={item.id} value={item.id}>{item.name}</Select.Item>)}

                    </Select.Content>
                </Select.Root>
            </div>

        </div>
    );
};

export default Filter;
