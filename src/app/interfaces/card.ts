export interface product {
    id_producto: number;
    nombre: string;
    precio: number;
    tamano: string;
    stock: number;
    categoria: string;
    segunda_mano: number;
    img: string;
    tipo: number;
}

export interface ProductResults {
    productos: product[]
}

export interface product_detail {
    categoria: string;
    fabricante: string;
    id_producto: number;
    img: string;
    licencia: string;
    material: string;
    nombre: string;
    origen: string;
    precio: number;
    presentacion: string;
    segunda_mano: number;
    stock: number;
    tamano: string;
    tipo: number;
}


export interface ProductResults_detail {
    productos: product_detail[]
}
