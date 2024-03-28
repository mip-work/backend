import { useState } from 'react';
import { FieldError, FieldValues, useForm } from 'react-hook-form';
import type { AxiosError } from 'axios';
import InputWithValidation from '../util/InputWithValidation';
import { mipAPI } from '../../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

type APIERROR = { message: string };

interface IPropsFormPwd {
  currentPwd: string;
  newPwd: string;
  email: string;
  repeatNewPwd: string;
}

function ChangePwd() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: loading, isSubmitSuccessful: success },
  } = useForm<IPropsFormPwd>();
  const [error, setError] = useState<string>('');
  const { changePassword } = useAuth()

  const handleChangePwd = async (form: FieldValues) => {
    try {
      await changePassword(form);
      toast('Account password changed');
      setError('');
    } catch (error) {
      setError(((error as AxiosError).response?.data as APIERROR).message);
    }
  };

  return (
    <>
      <h2 className='mt-2 text-2xl text-c-text'>Change Password</h2>
      {success && !error ? (
        <div className='mt-5 grid h-40 place-items-center text-center text-xl font-semibold text-c-text'>
          Password changed successfully 🚀
        </div>
      ) : (
        <>
          <div className='mt-5 flex w-[16.5rem] flex-col gap-4'>
          <InputWithValidation
              label='Email'
              placeholder='insert your email'
              register={register('email', {
                required: {
                  value: true,
                  message: 'email must not be empty',
                },
              })}
              error={errors.email as FieldError}
              darkEnabled
            />
            <InputWithValidation
              label='Current password'
              placeholder='enter your current password'
              register={register('currentPwd', {
                required: {
                  value: true,
                  message: 'password must not be empty',
                },
              })}
              error={errors.currentPwd as FieldError}
              darkEnabled
              type='password'
            />
            <InputWithValidation
              label='New password'
              placeholder='enter your new password'
              register={register('newPwd', {
                required: {
                  value: true,
                  message: 'password must not be empty',
                },
                minLength: {
                  value: 4,
                  message: 'must be at least 4 characters long',
                },
                maxLength: {
                  value: 14,
                  message: 'must be under 15 characters',
                },
              })}
              error={errors.newPwd as FieldError}
              darkEnabled
              type='password'
            />
            <InputWithValidation
              label='Repeat new password'
              placeholder='repeat your new password'
              register={register('repeatNewPwd', {
                required: {
                  value: true,
                  message: 'password must not be empty',
                },
                minLength: {
                  value: 4,
                  message: 'must be at least 4 characters long',
                },
                maxLength: {
                  value: 14,
                  message: 'must be under 15 characters',
                },
              })}
              error={errors.repeatNewPwd as FieldError}
              darkEnabled
              type='password'
            />
          </div>
          {error && <span className='mt-4 block text-left text-red-400'>{error}</span>}
          <button onClick={handleSubmit(handleChangePwd)} className='btn mt-8 w-full'>
            {loading ? 'proceeding ...' : 'Change'}
          </button>
        </>
      )}
    </>
  );
}

export default ChangePwd;