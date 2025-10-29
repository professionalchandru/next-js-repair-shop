import React from 'react';
import TicketSearch from './TicketSearch';
import { getOpenTickets } from '@/lib/queries/getOpenTickets';
import { getTicketSearchResults } from '@/lib/queries/getTicketSearchResults';
import TicketsTable from './TicketsTable';

export const metadata = {
    title: 'Ticket Search'
};

export default async function Tickets({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { searchText } = await searchParams;

    if (!searchText) {
        const results = await getOpenTickets();
        return (
            <>
                <TicketSearch />
                {results.length ? (
                    <TicketsTable data={results} />
                ) : (
                    <p className="mt-4">No open tickets found</p>
                )}
            </>
        );
    }

    // db query search result
    const results = await getTicketSearchResults(searchText);

    // return result
    return (
        <>
            <TicketSearch />
            {results.length ? (
                <TicketsTable data={results} />
            ) : (
                <p className="mt-4">No results found</p>
            )}
        </>
    );
}
