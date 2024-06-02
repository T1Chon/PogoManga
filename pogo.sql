BEGIN;


CREATE TABLE IF NOT EXISTS public.cesta
(
    id_usuario integer,
    id_producto integer,
    cantidad integer,
    fecha_cesta date
);

CREATE TABLE IF NOT EXISTS public.productos
(
    id_producto serial NOT NULL,
    nombre character varying(60) COLLATE pg_catalog."default" NOT NULL,
    precio numeric(6, 2) NOT NULL,
    tamano character varying(20) COLLATE pg_catalog."default" NOT NULL,
    stock integer NOT NULL,
    categoria character varying(20) COLLATE pg_catalog."default" NOT NULL,
    segunda_mano integer NOT NULL,
    img character varying(255) COLLATE pg_catalog."default" NOT NULL,
    tipo integer,
    CONSTRAINT productos_pkey PRIMARY KEY (id_producto)
);

CREATE TABLE IF NOT EXISTS public.tipos
(
    id_tipo integer NOT NULL,
    nombre character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tipos_pkey PRIMARY KEY (id_tipo)
);

CREATE TABLE IF NOT EXISTS public.lineas_pedidos
(
    id_lineas_pedidos serial NOT NULL,
    id_pedido integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad integer NOT NULL,
    precio numeric(6, 2) NOT NULL,
    CONSTRAINT lineas_pedidos_pkey PRIMARY KEY (id_lineas_pedidos)
);

CREATE TABLE IF NOT EXISTS public.pedidos
(
    id_usuario integer NOT NULL,
    id_pedido serial NOT NULL,
    id_metodo_pago integer NOT NULL,
    id_direccion integer,
    precio_total numeric(6, 2) NOT NULL,
    fecha_de_compra date NOT NULL,
    fecha_de_envio date NOT NULL,
    fecha_de_llegada date NOT NULL,
    enviado boolean NOT NULL,
    CONSTRAINT pedidos_pkey PRIMARY KEY (id_pedido)
);

CREATE TABLE IF NOT EXISTS public.direcciones
(
    id_usuario integer NOT NULL,
    id_direccion serial NOT NULL,
    pais character varying(20) COLLATE pg_catalog."default" NOT NULL,
    provincia character varying(20) COLLATE pg_catalog."default" NOT NULL,
    ciudad character varying(20) COLLATE pg_catalog."default" NOT NULL,
    codigo_postal character varying(20) COLLATE pg_catalog."default" NOT NULL,
    calle character varying(20) COLLATE pg_catalog."default" NOT NULL,
    piso character varying(20) COLLATE pg_catalog."default",
    puerta character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT direcciones_pkey PRIMARY KEY (id_direccion)
);

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id_usuario serial NOT NULL,
    usuario character varying(20) COLLATE pg_catalog."default" NOT NULL,
    nombre character varying(20) COLLATE pg_catalog."default" NOT NULL,
    apellido1 character varying(20) COLLATE pg_catalog."default" NOT NULL,
    apellido2 character varying(20) COLLATE pg_catalog."default",
    contrasena character varying(20) COLLATE pg_catalog."default" NOT NULL,
    correo character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario)
);

CREATE TABLE IF NOT EXISTS public.metodos_pago
(
    id_metodo_pago serial NOT NULL,
    id_usuario integer NOT NULL,
    tarjeta character varying(20) COLLATE pg_catalog."default" NOT NULL,
    fecha_caducidad date NOT NULL,
    nombre character varying(20) COLLATE pg_catalog."default" NOT NULL,
    apellido1 character varying(20) COLLATE pg_catalog."default" NOT NULL,
    apellido2 character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT metodos_pago_pkey PRIMARY KEY (id_metodo_pago)
);

CREATE TABLE IF NOT EXISTS public.productos_cliente_info
(
    id_producto_cliente serial NOT NULL,
    id_usuario integer NOT NULL,
    tipo character varying(20) COLLATE pg_catalog."default" NOT NULL,
    nombre character varying(35) COLLATE pg_catalog."default" NOT NULL,
    descripcion character varying(255) COLLATE pg_catalog."default" NOT NULL,
    tamano character varying(20) COLLATE pg_catalog."default",
    cantidad integer NOT NULL,
    precio integer NOT NULL,
    fecha_publicacion date NOT NULL,
    CONSTRAINT productos_cliente_info_pkey PRIMARY KEY (id_producto_cliente)
);

CREATE TABLE IF NOT EXISTS public.productos_figura_cliente_info
(
    id_producto_cliente serial NOT NULL,
    fabricante character varying(20) COLLATE pg_catalog."default",
    material character varying(20) COLLATE pg_catalog."default" NOT NULL,
    origen character varying(20) COLLATE pg_catalog."default",
    licencia character varying(20) COLLATE pg_catalog."default",
    presentacion character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT productos_figura_cliente_info_pkey PRIMARY KEY (id_producto_cliente)
);

CREATE TABLE IF NOT EXISTS public.productos_manga_cliente_info
(
    id_producto_cliente serial NOT NULL,
    autores character varying(20) COLLATE pg_catalog."default" NOT NULL,
    editoriales character varying(20) COLLATE pg_catalog."default" NOT NULL,
    num_paginas integer NOT NULL,
    CONSTRAINT productos_manga_cliente_info_pkey PRIMARY KEY (id_producto_cliente)
);

CREATE TABLE IF NOT EXISTS public.producto_figura
(
    id_producto serial NOT NULL,
    fabricante character varying(30) COLLATE pg_catalog."default" NOT NULL,
    material character varying(40) COLLATE pg_catalog."default" NOT NULL,
    origen character varying(15) COLLATE pg_catalog."default" NOT NULL,
    licencia character varying(40) COLLATE pg_catalog."default" NOT NULL,
    presentacion character varying(40) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT producto_figura_pkey PRIMARY KEY (id_producto)
);

CREATE TABLE IF NOT EXISTS public.producto_manga
(
    id_producto serial NOT NULL,
    autores character varying(20) COLLATE pg_catalog."default" NOT NULL,
    editoriales character varying(20) COLLATE pg_catalog."default" NOT NULL,
    num_paginas smallint NOT NULL,
    color character varying(255) COLLATE pg_catalog."default" NOT NULL,
    isbn bigint NOT NULL,
    CONSTRAINT producto_manga_pkey PRIMARY KEY (id_producto)
);

ALTER TABLE IF EXISTS public.cesta
    ADD CONSTRAINT rel_cesta_productos FOREIGN KEY (id_producto)
    REFERENCES public.productos (id_producto) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS fki_rel_cesta_productos
    ON public.cesta(id_producto);


ALTER TABLE IF EXISTS public.productos
    ADD CONSTRAINT fk_tipos_products FOREIGN KEY (tipo)
    REFERENCES public.tipos (id_tipo) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS fki_fk_tipos_products
    ON public.productos(tipo);


ALTER TABLE IF EXISTS public.lineas_pedidos
    ADD CONSTRAINT rel_pedidos_lineas_pedidos FOREIGN KEY (id_pedido)
    REFERENCES public.pedidos (id_pedido) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.lineas_pedidos
    ADD CONSTRAINT rel_producto_figura_lineas_pedidos FOREIGN KEY (id_producto)
    REFERENCES public.producto_figura (id_producto) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.lineas_pedidos
    ADD CONSTRAINT rel_producto_manga_lineas_pedidos FOREIGN KEY (id_producto)
    REFERENCES public.producto_manga (id_producto) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.lineas_pedidos
    ADD CONSTRAINT rel_productos_lineas_pedidos FOREIGN KEY (id_producto)
    REFERENCES public.productos (id_producto) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.pedidos
    ADD CONSTRAINT rel_direcciones_pedidos FOREIGN KEY (id_direccion)
    REFERENCES public.direcciones (id_direccion) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.pedidos
    ADD CONSTRAINT rel_metodos_pago_pedidos FOREIGN KEY (id_metodo_pago)
    REFERENCES public.metodos_pago (id_metodo_pago) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.pedidos
    ADD CONSTRAINT rel_usuarios_pedidos FOREIGN KEY (id_usuario)
    REFERENCES public.usuarios (id_usuario) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.direcciones
    ADD CONSTRAINT rel_usuarios_direcciones FOREIGN KEY (id_usuario)
    REFERENCES public.usuarios (id_usuario) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.metodos_pago
    ADD CONSTRAINT rel_usuarios_metodos_pago FOREIGN KEY (id_usuario)
    REFERENCES public.usuarios (id_usuario) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.productos_cliente_info
    ADD CONSTRAINT rel_usuarios_productos_cliente_info FOREIGN KEY (id_usuario)
    REFERENCES public.usuarios (id_usuario) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.productos_figura_cliente_info
    ADD CONSTRAINT rel_productos_cliente_info_productos_figura_cliente_info FOREIGN KEY (id_producto_cliente)
    REFERENCES public.productos_cliente_info (id_producto_cliente) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS productos_figura_cliente_info_pkey
    ON public.productos_figura_cliente_info(id_producto_cliente);


ALTER TABLE IF EXISTS public.productos_manga_cliente_info
    ADD CONSTRAINT rel_productos_cliente_info_productos_manga_cliente_info FOREIGN KEY (id_producto_cliente)
    REFERENCES public.productos_cliente_info (id_producto_cliente) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS productos_manga_cliente_info_pkey
    ON public.productos_manga_cliente_info(id_producto_cliente);


ALTER TABLE IF EXISTS public.producto_figura
    ADD CONSTRAINT rel_productos_producto_figura FOREIGN KEY (id_producto)
    REFERENCES public.productos (id_producto) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS producto_figura_pkey
    ON public.producto_figura(id_producto);


ALTER TABLE IF EXISTS public.producto_manga
    ADD CONSTRAINT rel_productos_producto_manga FOREIGN KEY (id_producto)
    REFERENCES public.productos (id_producto) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS producto_manga_pkey
    ON public.producto_manga(id_producto);

END;