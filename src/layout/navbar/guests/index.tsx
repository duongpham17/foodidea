"use client"

import React from 'react';
import Link from 'next/link';
import Button from '@components/buttons/Style1';

const Guest = () => {
    return (
        <>
            <Button label1={<Link href="/login">Login</Link>} />
        </>
    )
};

export default Guest