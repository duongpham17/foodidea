"use client"

import { useContext } from 'react';
import { Context } from '@context/useAuthentication';
import { user_authentication } from '@localstorage';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineLogout } from "react-icons/md";
import Button from '@components/buttons/Style1';
import SlideIn from '@components/slideins/Style1';
import Link from '@components/links/Style1';

const Protected = () => {

    const {user} = useContext(Context);

    const onLogout = () => {
        user_authentication.remove();
        window.location.reload();
    };

    return (
        <SlideIn icon={<Button label1={<AiOutlineUser size={20}/>} />} 
            openTop={user?.username}
            openBottom={<Button label1={user?.email} label2={<MdOutlineLogout/>} onClick={onLogout}/>}
        >
            <ul>
                <li><Link value="Dashboard" href="/dashboard?page=1&limit=10" color="light" /></li>
            </ul>
        </SlideIn>
    )
};

export default Protected