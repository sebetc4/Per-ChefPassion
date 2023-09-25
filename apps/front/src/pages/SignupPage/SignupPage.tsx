import { useForm } from 'react-hook-form';
import styles from './SignupPage.module.scss';
import * as yup from 'yup';
import { Path, SignupBody } from '~/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { usersApi } from '~/services';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
    const navigate = useNavigate();

    const validationSchema = yup.object({
        username: yup
            .string()
            .required('Le pseudo est requis')
            .min(3, 'Le pseudo doit contenir au moins 3 caractères')
            .max(20, 'Le pseudo doit contenir au maximum 20 caractères'),
        email: yup.string().required("L'email est requis").email("L'email n'est pas valide"),
        password: yup
            .string()
            .required('Le mot de passe est requis')
            .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
            .max(40, 'Le mot de passe doit contenir au maximum 40 caractères'),
    });

    const initialValues = {
        username: '',
        email: '',
        password: '',
    };

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    const submit = async (data: SignupBody) => {
        try {
            await usersApi.signup(data);
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
                className={styles.form}
            >
                <div>
                    <label htmlFor='username'>Pseudo</label>
                    <input
                        type='text'
                        {...register('username')}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        {...register('email')}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
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
