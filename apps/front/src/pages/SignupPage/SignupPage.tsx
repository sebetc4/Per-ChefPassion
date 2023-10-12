// Styles
import styles from './SignupPage.module.scss';
// Libs
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUserBody } from 'types';
import { signupSchema } from 'schemas';
// App
import { usersApi } from '~/services';
import { Path } from '~/types';

export default function SignupPage() {
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        email: '',
        password: '',
    };

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<CreateUserBody>({
        defaultValues: initialValues,
        resolver: yupResolver(signupSchema),
    });

    const submit = async (data: CreateUserBody) => {
        try {
            await usersApi.createUser(data);
            navigate(Path.SIGNIN);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className={styles.signup}>
            <h1>Inscription</h1>
            <form
                onSubmit={handleSubmit(submit)}
                className={`${styles.form} card`}
            >
                <div className={styles.form__field}>
                    <label htmlFor='username'>Pseudo</label>
                    <input
                        type='text'
                        {...register('username')}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
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
                        S'inscrire
                    </button>
                </div>
            </form>
        </section>
    );
}
