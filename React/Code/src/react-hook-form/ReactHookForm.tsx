import { SubmitHandler, useForm } from 'react-hook-form';

type TInputs = {
  email: string;
  password: string;
  name: string;
  age: number;
};

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TInputs>();

  const onSubmit: SubmitHandler<TInputs> = (data) => console.log(data);

  return (
    // "handleSubmit" will validate inputs before invoking "onSubmit"
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register input into the hook by invoking the "register" function */}
      <input
        type='email'
        placeholder='email@gmail.com'
        {...register('email', { required: 'Email Address is required' })}
        aria-invalid={errors.email ? 'true' : 'false'}
      />
      {errors.email && <p role='alert'>{errors.email.message}</p>}

      {/* include validation with required or other standard HTML validation rules */}
      <input
        type='password'
        placeholder='Password'
        {...register('password', { required: true, pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/ })}
      />

      {/* errors will return when field validation fails */}
      {errors.password && <span>PASSWORD is required</span>}

      <input
        placeholder='Name'
        {...register('name', { required: true, maxLength: 20 })}
        aria-invalid={errors.name ? 'true' : 'false'}
      />
      {errors.name?.type === 'required' && <p role='alert'>Name is required</p>}

      <input placeholder='Age' type='number' {...register('age', { min: 18, max: 99 })} />

      <input type='submit' />
    </form>
  );
}
