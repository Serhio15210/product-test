import React from 'react';
import {Cross1Icon} from "@radix-ui/react-icons";
import {Container, IconButton} from "@radix-ui/themes";
import "./styles.scss"
import Link from "next/link";
import {useRouter} from "next/navigation";
import CartModal from "@/components/cart-modal";

const MobileMenu = ({isOpen, setIsOpen}) => {
    const router = useRouter()
    const link = (ref) => {
        router.push(ref)
        setIsOpen(false)
    }
    return (
        <div className={`mobileMenu ${isOpen ? 'open' : ''}`}>
            <div className={'navRow'}>
                <p onClick={() => link('/')}>Home</p>
                <p onClick={() => link('/about')}>About Us</p>
                <p onClick={() => link('/contacts')}>Contacts</p>

            </div>

            <IconButton onClick={() => setIsOpen(false)}>
                <Cross1Icon color={'var(--crimson-1)'}/>
            </IconButton>

        </div>
    );
};

export default MobileMenu;
