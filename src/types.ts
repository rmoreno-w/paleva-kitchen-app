export type OrderItem = {
    item_name: string;
    serving_description: string;
    serving_price: string;
    number_of_servings: number;
    customer_notes: string;
    subtotal: number;
    discounted_subtotal: number;
};

export type Order = {
    customer_name: string;
    status: statusKeys;
    code: string;
    date: string;
    total: number;
    discounted_total: number;
    items: OrderItem[];
};

export type statusKeys = 'waiting_kitchen_approval' | 'preparing' | 'canceled' | 'ready' | 'delivered';

export type OrdersResult = { orders: Record<statusKeys, Order[]> } | { orders: Order[] };
