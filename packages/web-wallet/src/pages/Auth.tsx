import { fetchParams } from 'config';
import { useLogin } from 'graphql/auth';
import { useSession } from 'hooks/useSession';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Form {
  password: string;
}

export default () => {
  const [, setSession] = useSession();

  const { refetch } = useLogin({}, { enabled: false, retry: false });
  const { handleSubmit, register } = useForm<Form>();

  const onSubmit = (data: Form) => {
    fetchParams.headers.Authorization = `Basic ${btoa(`x:${data.password}`)}`;

    refetch({ throwOnError: true })
      .then(() => {
        setSession({
          id: Math.random().toString(),
        });
      })
      .catch(() => {
        toast.error('Login failed');
      });
  };

  return (
    <div className="flex flex-col items-center flex-1 md:justify-center">
      <div className="w-full md:w-96">
        <div className="p-5 mx-3 bg-white shadow-xl dark:bg-gray-800 rounded-xl">
          <h1 className="mb-5 text-3xl font-bold">Auth</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="block w-full p-2 border border-gray-300 rounded dark:border-gray-400 dark:bg-gray-700"
              {...register('password', { required: true })}
            />
            <div className="md:text-right">
              <button
                type="submit"
                className="w-full p-2 px-4 mt-3 text-gray-900 transition duration-150 bg-blue-500 rounded md:w-fit dark:bg-stone-200 hover:bg-blue-400 dark:hover:bg-stone-100"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
