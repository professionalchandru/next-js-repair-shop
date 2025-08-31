import React from 'react';
import NavButton from '@/components/NavButton';
import { File, HomeIcon, LogOut, UsersRound } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from '@/components/ModeToggle';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Button } from '@/components/ui/button';

export default function Header() {
    return (
        <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
            <div className="flex h-8 items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <NavButton icon={HomeIcon} label="Home" href="/home" />
                    <Link
                        className="flex justify-center items-center gap-2 ml-0"
                        title="Home"
                        href={'/home'}
                    >
                        <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
                            Computer Repair Shop
                        </h1>
                    </Link>
                </div>

                <div className="flex items-center">
                    <NavButton icon={File} label="Tickets" href="/tickets" />

                    <NavButton
                        icon={UsersRound}
                        label="Customers"
                        href="/customers"
                    />

                    <ModeToggle />
                    <Button
                        variant={'ghost'}
                        aria-label="Logout"
                        title="Logout"
                        className="rounded-full"
                        size={'icon'}
                        asChild
                    >
                        <LogoutLink>
                            <LogOut />
                        </LogoutLink>
                    </Button>
                </div>
            </div>
        </header>
    );
}
