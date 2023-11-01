import Metadata from '@metadata';
import Login from 'routes/public/login';

const Index = () =>  {
  return (
    <>
      <Metadata 
        title="Login" 
        description='Become a member of cookbook and enjoy living a life filled with good food.'
      />
      <Login />
    </>
  )
}

export default Index