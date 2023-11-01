import styles from './ConfirmId.module.scss';
import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import api from '@database/api'
import { locally } from '@utils/local';
import Loading from '@components/loading/Loading';

const ConfirmIdIndex = () => {

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    const id = router.query.id as string;

    useEffect(() => {
        if(!id) return;

        (async () => {
            try{
                const {data: {cookie, status}} = await api.post("/authentication/email", {token: id});
                if(status === "success") {
                    localStorage.setItem("user", JSON.stringify(cookie));
                    setSuccess(true);
                };
            } catch(err: any){
                setError(true)
            }
        })();
        
    }, [id]);

    useEffect(() => {
        let intervalID = setInterval(() => {
            if(success) router.reload();
        }, 1000);
        return () => clearInterval(intervalID);
    }, [success, router]);

    useEffect(() => {
        const user = locally("user");
        if(!user) return;
        router.push('/');
    }, [router])

    return (
        <div className={styles.container}>
            { error 
                ? <button onClick={() => router.replace('/login')}>Confirmation token has expired, get another one.</button>
                : <Loading />
            }
        </div>
    )
}

export default ConfirmIdIndex