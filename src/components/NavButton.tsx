import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import React from "react";
import Link from "next/link";

type Props = {
    icon: LucideIcon;
    label: string;
    href?: string;
};

export default function NavButton({ icon: Icon, label, href }: Props) {
    return (
        <Button
            variant="ghost"
            aria-label={label}
            size="icon"
            title={label}
            className="rounded-full"
            asChild
        >
            {href ? (
                <Link href={href}>
                    <Icon />
                </Link>
            ) : (
                <Icon />
            )}
        </Button>
    );
}
