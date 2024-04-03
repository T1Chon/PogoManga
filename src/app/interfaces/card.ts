export interface product {
    nombre: string;
    precio: number;
    tamano: string;
    stock: number;
    categoria: string;
    Segunda_mano: number;
    img: string;
}

export interface ProductResults {
    productos: product[]
}