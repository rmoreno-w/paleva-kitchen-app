const statusTranslations = {
    waiting_kitchen_approval: 'Aguardando aprovação da cozinha',
    preparing: 'Preparando',
    canceled: 'Cancelado',
    ready: 'Pronto',
    delivered: 'Entregue',
};

function formatDate(date: string) {
    const dateObject = new Date(date);
    return Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(dateObject);
}

function formatCurrency(ammount: number) {
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ammount);
}

export { formatCurrency, formatDate, statusTranslations };
