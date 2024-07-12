export interface Product {
    id: string,
    name: string,
    description: string,
    status: ProductStatus
}

export enum ProductStatus {
    OPEN='OPEN',
    IN_PROGRESS='IN_PROGRESS',
    CLOSED='CLOSED'
}