import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const schema = z
  .object({
    email: z.string().email('유효한 Email 형식을 입력해주세요.'),
    password: z
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
        '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.'
      ),
    confirmPassword: z.string(),
  })
  .refine((arg) => arg.password === arg.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type TAuthForm = z.infer<typeof schema>;

export default function ZodSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: TAuthForm) => {
    // API request
    console.log(data);
  };

  return (
    <section>
      <h1>Zod + React Hook Form Validation SIGN UP</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type='email' {...register('email')} placeholder='user@gmail.com' />
          {errors.email && <p role='alert'>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <input type='password' {...register('password')} placeholder='Password' />
          {errors.password && <p role='alert'>{errors.password.message}</p>}
        </div>

        <div>
          <label>Confirm Password</label>
          <input type='password' {...register('confirmPassword')} />
          {errors.confirmPassword && <p role='alert'>{errors.confirmPassword.message}</p>}
        </div>

        <button type='submit'>Sign up</button>
      </form>
    </section>
  );
}
