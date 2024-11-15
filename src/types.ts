export type Order = {
    customer_name: string;
    status: statusKeys;
    code: string;
    date: string;
    total: number;
};

export type statusKeys = 'waiting_kitchen_approval' | 'preparing' | 'canceled' | 'ready' | 'delivered';

export type OrdersResult = {
    orders: {
        [key in Partial<statusKeys>]: Order[];
    };
};
