import Metadata from '@metadata';
import Confirm from 'routes/public/confirm/[id]';

const Index = () => {
  return (
    <>
      <Metadata 
        title="Authentication" 
        description='User being seasoned for cooking'
      />
      <Confirm />
    </>
  )
}

export default Index