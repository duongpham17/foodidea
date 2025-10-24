import Login from 'routes/public/login';
import {metadata} from '@metadata';

export function generateMetadata() {
  return metadata({
    title: "Login",
    description:"Sign in or Sign up."
  });
};

const LoginPage = () =>  {
  return (
    <main>
      <Login />
    </main>
  )
}

export default LoginPage