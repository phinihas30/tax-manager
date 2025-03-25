import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import SignInForm from '@/components/auth/SignInForm';
import AuthLayout from '@/components/auth/AuthLayout';

export default async function SignIn() {
  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => {
          cookieStore.set(name, value, options);
        },
        remove: (name, options) => {
          cookieStore.delete(name);
        },
      },
    }
  );
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    redirect('/dashboard');
  }
  
  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-6">
          Sign in to your account
        </h2>
        <SignInForm />
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a 
              href="/auth/signup" 
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
} 