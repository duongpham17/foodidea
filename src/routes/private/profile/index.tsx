import styles from './Profile.module.scss';
import React, { useContext } from 'react';
import { api } from '@database/api';
import { IUsersResponse } from '@database/models/users';
import { Context } from '@context/useAuthentication';
import { upload, remove } from '@thirdparty/nftstorage';

import Header from '@components/header/Style1';
import Loading from '@components/loading/Loading';
import Container from '@components/containers/Style1';
import Line from '@components/line/Style1';
import Button from '@components/button/Button';
import Cover from '@components/cover/Cover';
import Input from '@components/inputs/Input';
import File from '@components/file/Single';

import useOpen from '@hooks/useOpen';
import useForm from '@hooks/useForm';

interface Props {
  user: IUsersResponse
}

const Profile = () => {

  const { user, protect } = useContext(Context);

  protect(["user", "admin"]);

  return ( user ?
    <Container width={"500px"}>
      <Header>PROFILE</Header>
      
      <div className={styles.box}>
        <Image user={user}/>
      </div>

      <div className={styles.box}>
        <Button label1={user.email} color="light" />
      </div>

      <div className={styles.box}>
        <Username user={user} />
      </div>

      <div className={styles.box}>
        <CryptoAddresses user={user} />
      </div>

    </Container>
    : 
    <Loading />
  )
}

export default Profile;

const Username = ({user}: Props) => {

  const {open, onOpen} = useOpen({});

  const {values, onChange, onSubmit, loading, edited, setValues} = useForm(user, callback);

  async function callback(){
    try{
      const response = await api.patch("/users", values);
      setValues(response.data.data);
    } catch(err: any){
      console.log(err);
    }
  };

  return (
    <div>
      <Button label1={values.username || "username"} color="light" onClick={onOpen} />
      {open &&
        <Cover onClose={onOpen}>
          <Container width={"500px"}>
            <form onSubmit={onSubmit}>
              <Input label1="Username" name="username" value={values?.username || ""} onChange={onChange} />

              { (edited && !loading) && <Button type="submit" label1="update" loading={loading} color="blue" /> }
            </form>
          </Container>
        </Cover>
      }
    </div>
  )
};

const Image = ({user}: Props) => {

  const {open, onOpen} = useOpen({});

  const onUploadImage = async (blob: any) => {
    try{
      const {url} = await upload(blob);
      await api.patch("/users", {...user, image: url});
    } catch(err){
      console.log(err);
    }
  };

  const onDeleteImage = async (cid: string) => {
    try{
      await remove(cid);
      await api.patch("/users", {...user, image: ""});
    } catch(err){
      console.log(err);
    }
  };

  return (
    <div className={styles.imageContainer}>
        <img className={styles.image} src={user.image} alt="u" onClick={onOpen} />

        {open &&
          <Cover onClose={onOpen}>
            <Container width={"500px"}>
                <File 
                  id="image"
                  src={user.image}
                  onDelete={onDeleteImage}
                  onUpload={onUploadImage}
                />
            </Container>
          </Cover>
        }

    </div>
  )
}

const CryptoAddresses = ({user}: Props) => {

  const {open, onOpen} = useOpen({});

  const {values, onChange, onSubmit, loading, edited, setValues} = useForm(user, callback);

  async function callback(){
    try{
      const response = await api.patch("/users", values);
      setValues(response.data.data);
    } catch(err: any){
      console.log(err);
    }
  };

  return (
    <div>
      <Button label1={"Crypto Addresses"} color="light" onClick={onOpen} />

      {open &&
          <Cover onClose={onOpen}>
            <Container width={"500px"}>
              <form onSubmit={onSubmit}>
                <Input label1="Bitcoin" name="crypto_addresses.bitcoin" value={values.crypto_addresses.bitcoin || ""} onChange={onChange} />
                <Input label1="Ethereum" name="crypto_addresses.ethereum" value={values.crypto_addresses.ethereum || ""} onChange={onChange} />
                <Input label1="Cardano" name="crypto_addresses.cardano" value={values.crypto_addresses.cardano || ""} onChange={onChange} />
                { (edited && !loading) && <Button type="submit" label1="update" loading={loading} color="blue" /> }
              </form>
            </Container>
          </Cover>
        }

    </div>
  )
}