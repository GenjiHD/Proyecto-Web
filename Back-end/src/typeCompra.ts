export interface Compras{ 
    id: number,
    id_articulo: number,
    cantidad: number,
    precio: number,
    iva: number,
    subtotal: number,
    total: number,
    fecha_compra: Date,
};

export interface CompraNueva {
    id_articulo: number,
    cantidad: number,
    precio: number,
    iva: number,
    subtotal: number,
    total: number,
    fecha_compra: Date,
};