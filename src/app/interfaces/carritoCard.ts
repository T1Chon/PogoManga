export interface productCart {
    id_cesta: string;
    id_usuario: number;
    id_producto: number;
    cantidad: number;
    fecha_cesta: Date;
    nombre: string;
    precio: number;
    tamano: string;
    stock: number;
    categoria: string;
    Segunda_mano: number;
    img: string;

}

export interface CarritocardResults {
    cesta : productCart[]
}