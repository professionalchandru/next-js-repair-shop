'use client';

import { useFormContext } from 'react-hook-form';

import {
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage
} from '@/components/ui/form';

import { Textarea } from '@/components/ui/textarea';

import { TextareaHTMLAttributes } from 'react';

type Props<S> = {
    fieldTitle: string;
    nameInSchema: keyof S & string;
    className?: string;
    disabled?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaWithLabel<S>({
    fieldTitle,
    nameInSchema,
    className,
    disabled = false,
    ...props
}: Props<S>) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    <FormLabel
                        htmlFor={nameInSchema}
                        className="text-base mb-2"
                    >
                        {fieldTitle}
                    </FormLabel>

                    <FormControl>
                        <Textarea
                            id={nameInSchema}
                            className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75 ${className}`}
                            disabled={disabled}
                            {...props}
                            {...field}
                        />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
