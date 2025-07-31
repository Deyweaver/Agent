import type { MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { LoginForm } from '~/components/auth/LoginForm';

export const meta: MetaFunction = () => {
  return [
    { title: 'Sign In | CODO' },
    { name: 'description', content: 'Sign in to your CODO account' },
  ];
};

export default function Login() {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      {() => <LoginForm />}
    </ClientOnly>
  );
}