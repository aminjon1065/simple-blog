import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { PaginatedResponse } from '@/types/paginate-response';

type Props<T> = {
    pagination: PaginatedResponse<T>;
};

export function PaginationBar<T>({ pagination }: Props<T>) {
    const pages = pagination?.links ?? [];
    return (
        <Pagination>
            <PaginationContent>
                {pages.map((link, index) => {
                    const isPrevious =
                        link.label.includes('&laquo;') ||
                        link.label.toLowerCase().includes('previous');
                    const isNext =
                        link.label.includes('&raquo;') ||
                        link.label.toLowerCase().includes('next');
                    const isEllipsis = link.label === '...';

                    if (isEllipsis) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    if (isPrevious) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious
                                    href={link.url ?? '#'}
                                    aria-disabled={!link.url}
                                    className={
                                        !link.url
                                            ? 'pointer-events-none opacity-50'
                                            : ''
                                    }
                                />
                            </PaginationItem>
                        );
                    }

                    if (isNext) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext
                                    href={link.url ?? '#'}
                                    aria-disabled={!link.url}
                                    className={
                                        !link.url
                                            ? 'pointer-events-none opacity-50'
                                            : ''
                                    }
                                />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href={link.url ?? '#'}
                                isActive={link.active}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
