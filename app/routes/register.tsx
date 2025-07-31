import type { MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { RegisterForm } from '~/components/auth/RegisterForm';

export const meta: MetaFunction = () => {
  return [
    { title: 'Create Account | CODO' },
    { name: 'description', content: 'Create a new CODO account' },
  ];
};

export default function Register() {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      {() => <RegisterForm />}
    </ClientOnly>
  );
}