import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Flex, Form, Input, message } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useAuthFormFeatures } from '../hooks';
import { useCallback, useState } from 'react';
import { AuthFormValues } from '../types';
import { LoginMutationVariables } from '../api/Login.generated';
import { RegisterMutationVariables } from '../api/Register.generated';

const AuthForm = () => {
  const { t } = useTranslation('features/auth');
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [isLoginForm, setIsLoginForm] = useState(true)
  const { 
    onFinishLogin, 
    onFinishRegister, 
    isLoginPending, 
    isRegisterPending 
  } = useAuthFormFeatures({t, messageApi, form})
  
  const isPending = isLoginPending || isRegisterPending;
  
  const handleFinish = (values: AuthFormValues) => {
    if (isLoginForm) {
      onFinishLogin(values as LoginMutationVariables & { remember: boolean });
    } else {
      onFinishRegister(values as RegisterMutationVariables & { remember: boolean });
    }
  };

  const toggleFormType = useCallback(() => {
    setIsLoginForm(prev => !prev);
    form.resetFields();
  }, [form]);
  return (
    <>
      {contextHolder}
      
      <Form<AuthFormValues>
        form={form}
        name="auth"
        initialValues={{
          remember: true,
          email: localStorage.getItem('rememberedEmail') || '',
        }}
        style={{ maxWidth: 360, minWidth: 300 }}
        onFinish={handleFinish}
      >
        {!isLoginForm && 
          <Form.Item
            name="username"
            rules={[
              { required: true, message: t("usernameRequiredMessage") }
            ]}
          >
            <Input
            prefix={<UserOutlined />}
            placeholder={t('username')}
            disabled={isPending}
            autoComplete="username"
          />
            </Form.Item>}
        <Form.Item
          name="email"
          rules={[
            { required: true, message: t('usernameRequiredMessage') },
            { type: 'email', message: t('invalidEmailFormat') },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder={t('email')}
            disabled={isPending}
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: t('passwordRequiredMessage') }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('password')}
            disabled={isPending}
            autoComplete="current-password"
          />
        </Form.Item>

        {isLoginForm &&
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox disabled={isPending}>{t('rememberMe')}</Checkbox>
            </Form.Item>
            <a href="/forgot-password">{t('forgotPassword')}</a>
          </Flex>
        </Form.Item>
        }

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isPending}
            disabled={isPending}
          >
            {isLoginForm ? t('login') : t('register')}
          </Button>
          <div>
            {t('or')} <a onClick={toggleFormType}>
              {isLoginForm ? t('registerNow') : t('loginNow')}
              </a>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default AuthForm;