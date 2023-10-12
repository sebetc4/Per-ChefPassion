// Styles
import styles from './SigninPage.module.scss';
// Libs
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SigninBody } from 'types';
import { signinSchema } from 'schemas';
// App
import { useContext } from 'react';
import { AuthContext } from '~/contexts';

export default function SignupPage() {
    const { signin } = useContext(AuthContext);

    const initialValues = {
        email: '',
        password: '',
    };

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<SigninBody>({
        defaultValues: initialValues,
        resolver: yupResolver(signinSchema),
        mode: 'onTouched',
    });

    const submit = async (data: SigninBody) => {
        try {
            await signin(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className={styles.section}>
            <h1>Connexion</h1>
            <form
                onSubmit={handleSubmit(submit)}
                className={`${styles.form} card`}
            >
                <div className={styles.form__field}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        {...register('email')}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className={styles.form__field}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        {...register('password')}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div className='form__buttonSubmitContainer'>
                    <button
                        disabled={isSubmitting}
                        className='btn btn-contained'
                    >
                        Se connecter
                    </button>
                </div>
            </form>
        </section>
    );
}
