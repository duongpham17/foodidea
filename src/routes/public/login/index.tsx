import styles from './Login.module.scss';
import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import api from '@database/api';

import useForm from '@hooks/useForm';
import Input from '@components/inputs/Input';
import Button from '@components/button/Button';

import validation from './validation';
import { locally } from '@utils/local';

const LoginIndex = () => {

  const router = useRouter()

  const initialState = {
    email: "",
    code: "",
    status: "",
  };

  const {onSubmit, onChange, loading, values, validationErrors, onSetValue, customErrors, onSetCustomErrors} = useForm(initialState, callback, validation);
  
  async function callback(){
    try{

      if(!values.status){
        const {data: {message}} = await api.post('/authentication/login', values);
        return onSetValue({status: message});
      };

      if(values.status === "sent"){
        const {data: {cookie, status}} = await api.post('/authentication/code', values);
        if(status === "success"){  
          localStorage.setItem("user", JSON.stringify(cookie));
          router.push(`/`);
          return
        };
      };

    } catch(err: any){
      onSetCustomErrors({code: "invalid code"});
    }
  };

  useEffect(() => {
    const user = locally("user");
    if(!user) return;
    router.push('/');
  }, [router])

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <h1>Login</h1>

      {values.status === "sent" ?
        <div className={styles.boxes}>
          <Input 
            label1="Code" 
            label2={customErrors.code} 
            name="code" 
            value={values.code} 
            onChange={onChange} 
          />

          <Button 
            type="submit" 
            label1="submit" 
            loading={loading} 
            color="black" 
          />
        </div>
       :
       <div className={styles.boxes}>
          <Input 
            label1="Email Address" 
            label2={validationErrors.email ? "*" : ""} 
            error={validationErrors.email} 
            name="email" 
            value={values.email} 
            onChange={onChange} 
          />

          <Button 
            type="submit" 
            label1="submit" 
            loading={loading} 
            color="black" 
          />
        </div>
       }

    </form>
  )
}

export default LoginIndex