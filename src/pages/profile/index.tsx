import Metadata from '@metadata';
import Profile from 'routes/private/profile';

const Index = () =>  {
  return (
    <>
      <Metadata 
        title="Profile" 
        description='User profile'
      />
      <Profile />
    </>
  )
}

export default Index