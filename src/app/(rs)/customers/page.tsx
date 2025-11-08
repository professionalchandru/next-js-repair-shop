import React from 'react';
import CustomerSearch from '@/app/(rs)/customers/CustomerSearch';
import { getCustomerSearchResults } from '@/lib/queries/getCustomerSearchResults';
import * as Sentry from '@sentry/nextjs';
import CustomerTable from './CustomerTable';
import { getCustomers } from '@/lib/queries/getCustomers';

export const metadata = {
    title: 'Customer Search'
};

export default async function Customers({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { searchText } = await searchParams;

    if (!searchText) {
        const results = await getCustomers();
        return (
            <>
                <CustomerSearch />
                {results.length ? (
                    <CustomerTable data={results} />
                ) : (
                    <p className="mt-4">No Customer found</p>
                )}
            </>
        );
    }

    const span = Sentry.startInactiveSpan({
        name: 'getCustomerSearchResults-2'
    });
    const results = await getCustomerSearchResults(searchText);
    span.end();

    return (
        <>
            <CustomerSearch />
            {results.length ? (
                <CustomerTable data={results} />
            ) : (
                <p className="mt-4">No results found</p>
            )}
        </>
    );
}
