import { Button } from '@/components/ui/button';
import {
    LoginLink,
    RegisterLink
} from '@kinde-oss/kinde-auth-nextjs/components';
import React from 'react';

export default function LoginPage() {
    return (
        <main className="h-dvh flex flex-col items-center gap-6 text-4xl p-4">
            <h1>Reapir Shop</h1>
            <div className="flex gap-4 items-center">
                <Button asChild>
                    <LoginLink>Sign In</LoginLink>
                </Button>
                <Button asChild>
                    <RegisterLink>Sign Up</RegisterLink>
                </Button>
            </div>
        </main>
    );
}
