import { TFunction } from "i18next";
import { LoginMutationVariables, useLoginMutation } from "../api/Login.generated";
import { useAuth } from "./useAuth";
import { MessageInstance } from "antd/es/message/interface";
import { useNavigate } from "react-router";
import { FormInstance } from "antd";
import { RegisterMutationVariables, useRegisterMutation } from "../api/Register.generated";

interface getAuthFormUtilsProps {
    t: TFunction<"features/auth">,
    messageApi: MessageInstance,
    form: FormInstance
}

export const useAuthFormFeatures = (props: getAuthFormUtilsProps) => {
    const { setAuthToken } = useAuth();
    const navigate = useNavigate();
    const { t, messageApi, form } = props;

    /** Метод для Входа в аккаунт */
    const { 
        mutate: login, 
        isPending: isLoginPending 
    } = useLoginMutation({
        onSuccess: (data) => {
            setAuthToken(data.login.token);
            messageApi.success(t('loginSuccess'));
            navigate('/'); 
        },
        onError: () => {
            messageApi.error(t('loginError'));
            form.setFields([
            {
                name: 'password',
                errors: [t('invalidCredentials')],
            },
            ]);
        },
    });

    /** Метод для Регистрации аккаунта */
    const { 
        mutate: register, 
        isPending: isRegisterPending 
    } = useRegisterMutation({
        onSuccess: (data) => {
            setAuthToken(data.register.token);
            messageApi.success(t('registerSuccess'));
            navigate('/')
        }
    })
    
    const onFinishLogin = (
        values: LoginMutationVariables & { remember: boolean }
    ) => {
        login(
            { 
                email: values.email, 
                password: values.password 
            },
            {
            onSettled: () => {
                if (values.remember) {
                localStorage.setItem('rememberedEmail', values.email);
                } else {
                localStorage.removeItem('rememberedEmail');
                }
            },
            }
        );
    }

    const onFinishRegister = (values: RegisterMutationVariables & { remember: boolean }) => {
        register(
            { 
                username: values.username, 
                email: values.email,
                password: values.password
            }
        )
    }

    return { 
        onFinishLogin, 
        isLoginPending, 
        isRegisterPending, 
        onFinishRegister
    }
} 
;