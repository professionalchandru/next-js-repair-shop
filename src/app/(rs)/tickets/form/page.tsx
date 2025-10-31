import { getCustomer } from '@/lib/queries/getCustomer';
import { getTicket } from '@/lib/queries/getTicket';
import { BackButton } from '@/components/BackButton';
import * as Sentry from '@sentry/nextjs';
import TicketForm from './TicketForm';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Users, init as KindeInit } from '@kinde/management-api-js';

export async function generateMetadata({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId)
        return {
            title: 'Missing Ticket Id or Customer Id'
        };

    if (customerId) {
        return {
            title: `New Ticket for Customer #${customerId}`
        };
    }

    if (ticketId) {
        return {
            title: `Edit Ticket #${ticketId}`
        };
    }
}

export default async function TicketFormPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    try {
        const { customerId, ticketId } = await searchParams;

        if (!customerId && !ticketId) {
            return (
                <>
                    <h2 className="text-2xl mb-2">
                        Ticket ID or Customer ID required to load ticket form
                    </h2>
                    <BackButton title="Go Back" variant={'default'} />
                </>
            );
        }

        const { getPermission, getUser } = getKindeServerSession();
        const [managerPermission, user] = await Promise.all([
            getPermission('manager'),
            getUser()
        ]);

        const isManager = managerPermission?.isGranted;

        //new ticket form
        if (customerId) {
            const customer = await getCustomer(parseInt(customerId));

            if (!customer) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">
                            Customer ID #{customerId} not found
                        </h2>

                        <BackButton title="Go Back" variant={'default'} />
                    </>
                );
            }

            if (!customer.active) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">
                            Customer ID #{customerId} is not active
                        </h2>

                        <BackButton title="Go Back" variant={'default'} />
                    </>
                );
            }

            if (isManager) {
                KindeInit();
                const { users } = await Users.getUsers();

                const techs = users
                    ? users.map((user) => ({
                          id: user.email
                              ? user.email.toLowerCase()
                              : user.email!,
                          description: user.email
                              ? user.email.toLowerCase()
                              : user.email!
                      }))
                    : [];
                return (
                    <TicketForm
                        customer={customer}
                        techs={techs}
                        isManager={isManager}
                    />
                );
            } else {
                return <TicketForm customer={customer} />;
            }
        }
        if (ticketId) {
            const ticket = await getTicket(parseInt(ticketId));

            if (!ticket) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">
                            Ticket ID #{ticketId} not found
                        </h2>

                        <BackButton title="Go Back" variant={'default'} />
                    </>
                );
            }

            const customer = await getCustomer(ticket.customerId);
            // return  ticket form
            if (isManager) {
                KindeInit();
                const { users } = await Users.getUsers();

                const techs = users
                    ? users.map((user) => ({
                          id: user.email!,
                          description: user.email!
                      }))
                    : [];
                return (
                    <TicketForm
                        customer={customer}
                        ticket={ticket}
                        techs={techs}
                        isManager={isManager}
                    />
                );
            } else {
                const isEditable = user?.email === ticket.tech;
                return (
                    <TicketForm
                        customer={customer}
                        ticket={ticket}
                        isEditable={isEditable}
                    />
                );
            }
        }
    } catch (e) {
        if (e instanceof Error) {
            Sentry.captureException(e);
            throw e;
        }
    }
}
