'use client'
import localFont from "next/font/local";
import "@/styles/globals.scss";
import "@/styles/layout.scss";
import {Flex, IconButton, Spinner, Theme} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import Image from "next/image";
import Link from "next/link";
import {Cross1Icon, HamburgerMenuIcon} from "@radix-ui/react-icons";
import {useEffect, useState} from "react";
import MobileMenu from "@/components/mobile-menu";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useStore} from "@/zustand/store";
import CartModal from "@/components/cart-modal";


const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});
const queryClient = new QueryClient()

export default function RootLayout({children}) {

    const [isMobile, setIsMobile] = useState(false)
    const [openMobile, setOpenMobile] = useState(false)
    const [isMobileLoading, setIsMobileLoading] = useState(true)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 500) {
                setIsMobile(true)

            } else {
                setIsMobile(false)
            }
            setIsMobileLoading(false)
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const toggleMenu = () => setOpenMobile(!openMobile)
    const cart = useStore((state) => state.cart)
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryClientProvider client={queryClient}>
            {isMobileLoading ? <Spinner/> :
                <Theme accentColor="crimson" grayColor="red" radius="large">
                    {isMobile &&
                        <MobileMenu isOpen={openMobile} setIsOpen={setOpenMobile}/>
                    }
                    <header>

                        <Image src={'/logo.png'} alt={'logo'} width={80} height={80}/>
                        {isMobile ?
                            <Flex direction="row" align="center" gap="5">
                                <CartModal/>
                                <IconButton onClick={toggleMenu} px={10} size="3">
                                    <HamburgerMenuIcon/>
                                </IconButton>
                            </Flex>

                            : <div className="navContainer">
                                <Link href={'/'}>
                                    <p>Home</p>
                                </Link>
                                <Link href={'/about'}>
                                    <p>About Us</p>
                                </Link>
                                <Link href={'/contacts'}>
                                    <p>Contacts</p>
                                </Link>
                               <CartModal/>

                            </div>
                        }


                    </header>
                    {children}
                    <footer></footer>
                </Theme>
            }
        </QueryClientProvider>
        </body>
        </html>
    );
}
