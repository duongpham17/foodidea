"use client";

import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { user_authentication } from '@localstorage';
import { api } from '@database/api';
import useForm from '@hooks/useForm';
import validation from './validation';
import Input from '@components/inputs/Style1';
import Button from '@components/buttons/Style1';
import Text from '@components/texts/Style1';

const Login = () => {

  const router = useRouter()

  const initialState = {
    email: "",
    username: "",
    code: "",
    status: "",
  };

  const {onSubmit, onChange, loading, values, validationErrors, onSetValue, customErrors, onSetCustomErrors} = useForm(initialState, callback, validation);
  
  async function callback(){
    try{

      if(!values.status){
        try{
          const {data: {message}} = await api.post('/authentications/signup', values);
          return onSetValue({status: message});
        } catch(err: any){
          console.log(err.response)
          return onSetValue({status: err.response.data.message});
        }
      };

      if(values.status === "sent"){
        const {data: {cookie, status}} = await api.post('/authentications/code', values);
        if(status === "success"){  
          user_authentication.set(cookie)
          return window.location.reload();
        };
      };

    } catch(err: any){
      onSetCustomErrors({code: "invalid code"});
    }
  };

  useEffect(() => {
    const user = user_authentication.get();
    if(!user) return;
    router.push('/');
  }, [router]);

  return (
    <form onSubmit={onSubmit}>

      {values.status === "sent" ?
        <div>
          <Input 
            label1="Code" 
            label2={customErrors.code} 
            name="code" 
            value={values.code} 
            onChange={onChange} 
          />

          <Text message={customErrors.code ? "Incorrect code." : ""} color='red'/> <br/>

          <Button 
            type="submit" 
            label1="Confirm" 
            loading={loading} 
            color="primary" 
          />
        </div>
       :
       <div>
          <Input 
            label1="Username" 
            error={validationErrors.username} 
            placeholder='Enter username'
            name="username" 
            value={values.username} 
            onChange={onChange} 
          />

          <Input 
            label1="Email" 
            error={validationErrors.email} 
            placeholder='Enter your email'
            name="email" 
            value={values.email} 
            onChange={onChange} 
          />

          <Text message={values.status.includes("exists") ? "Email already exist, please sign in." : ""} color="red"/><br/>

          <Button 
            type="submit" 
            label1="Create Account" 
            loading={loading} 
            color="primary" 
          />
        </div>
       }

    </form>
  )
}

export default Login