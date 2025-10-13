'use client';

import { useFormContext } from 'react-hook-form';

import {
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage
} from '@/components/ui/form';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

import { SelectHTMLAttributes } from 'react';

type DataObj = {
    id: string;
    description: string;
};

type Props<S> = {
    fieldTitle: string;
    nameInSchema: keyof S & string;
    data: DataObj[];
    className?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectWithLabel<S>({
    fieldTitle,
    nameInSchema,
    data,
    className
}: Props<S>) {
    const form = useFormContext();
    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={nameInSchema} className="text-base">
                        {fieldTitle}
                    </FormLabel>

                    <Select {...field} onValueChange={field.onChange}>
                        <FormControl>
                            <SelectTrigger
                                id={nameInSchema}
                                className={`w-full max-w-xs ${className}`}
                            >
                                <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {data.map((item) => (
                                <SelectItem
                                    key={`${nameInSchema}_${item.id}`}
                                    value={item.id}
                                >
                                    {item.description}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
