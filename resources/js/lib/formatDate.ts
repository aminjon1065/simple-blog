const ruFormatter = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
});

const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return '—';
    const d = new Date(date);
    return isNaN(d.getTime()) ? '—' : ruFormatter.format(d);
};

export { formatDate };
