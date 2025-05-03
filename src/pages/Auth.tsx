import { Layout } from 'antd';
import AuthForm from '../features/auth';

const Auth = () => {
  return (
    <Layout
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AuthForm />
    </Layout>
  );
};

export default Auth;
