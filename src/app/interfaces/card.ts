export interface product {
    id_producto: number;
    nombre: string;
    precio: string;
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
    fabricante: string;
    id_producto: number;
    licencia: string;
    material: string;
    nombre: string;
    origen: string;
    presentacion: string;
    autores: string;
    editoriales: string;
    num_paginas: number;
    color: string;
    isbn: number;
}


export interface ProductResults_detail {
    productos: product_detail[]
}
