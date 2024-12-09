export interface Compra{
    id: number,
    id_articulo: number,
    cantidad: number,
    precio: number,
    iva: number,
    subtotal: number,
    total: number,
    fecha_compra: string | Date | null
}

export interface CompraAgregar{
    id_articulo: number,
    cantidad: number,
    precio: number,
    iva: number,
    subtotal: number,
    total: number,
    fecha_compra: string | Date | null
}