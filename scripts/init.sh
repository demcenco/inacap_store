#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-'EOSQL'


CREATE SEQUENCE bussiness_bussiness_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;
CREATE TYPE user_type AS ENUM ('seller','admin');
CREATE EXTENSION pg_trgm;
CREATE TABLE "public"."bussiness" (
    "bussiness_id" integer DEFAULT nextval('bussiness_bussiness_id_seq') NOT NULL,
    "rut" text NOT NULL,
    "name" text NOT NULL,
    "type" text NOT NULL,
    "address" text NOT NULL,
    CONSTRAINT "bussiness_pkey" PRIMARY KEY ("bussiness_id"),
    CONSTRAINT "bussiness_rut" UNIQUE ("rut")
) WITH (oids = false);


CREATE SEQUENCE order_order_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."order" (
    "order_id" integer DEFAULT nextval('order_order_id_seq') NOT NULL,
    "user_id" integer NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "updated_at" timestamptz DEFAULT now() NOT NULL,
    "completed" boolean DEFAULT false NOT NULL,
    "shift_id" integer NOT NULL,
    CONSTRAINT "order_pkey" PRIMARY KEY ("order_id")
) WITH (oids = false);


CREATE SEQUENCE order_product_order_product_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."order_product" (
    "order_product_id" bigint DEFAULT nextval('order_product_order_product_id_seq') NOT NULL,
    "product_id" integer NOT NULL,
    "order_id" integer NOT NULL,
    "amount" integer DEFAULT '1' NOT NULL,
    "price" integer NOT NULL,
    CONSTRAINT "order_product_pkey" PRIMARY KEY ("order_product_id"),
    CONSTRAINT "order_amount_positive" CHECK ("amount" > 0),
    CONSTRAINT "order_price_psitive" CHECK ("price" > 0)
) WITH (oids = false);


CREATE TABLE "order_product_v" ("name" text, "order_product_id" bigint, "order_id" integer, "product_id" integer, "amount" integer, "price" integer);


CREATE SEQUENCE product_product_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."product" (
    "product_id" integer DEFAULT nextval('product_product_id_seq') NOT NULL,
    "name" text NOT NULL,
    "desc" text NOT NULL,
    "brand" text NOT NULL,
    "price" integer NOT NULL,
    "stock" integer DEFAULT '99999' NOT NULL,
    "last_update" timestamptz DEFAULT now() NOT NULL
) WITH (oids = false);


CREATE SEQUENCE sale_sale_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."sale" (
    "sale_id" integer DEFAULT nextval('sale_sale_id_seq') NOT NULL,
    "order_id" integer NOT NULL,
    "total" integer NOT NULL,
    "closed_at" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "bussiness_id" integer,
    CONSTRAINT "sale_pkey" PRIMARY KEY ("sale_id")
) WITH (oids = false);


CREATE SEQUENCE shift_shift_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."shift" (
    "shift_id" integer DEFAULT nextval('shift_shift_id_seq') NOT NULL,
    "user_id" integer NOT NULL,
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "active" boolean DEFAULT true NOT NULL,
    CONSTRAINT "shift_pkey" PRIMARY KEY ("shift_id")
) WITH (oids = false);


CREATE SEQUENCE users_user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."user" (
    "user_id" integer DEFAULT nextval('users_user_id_seq') NOT NULL,
    "rut" text NOT NULL,
    "password" text NOT NULL,
    "email" text NOT NULL,
    "name" text NOT NULL,
    "last_name" text NOT NULL,
    "user_type" user_type,
    "active" boolean DEFAULT true NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
) WITH (oids = false);


DROP TABLE IF EXISTS "order_product_v";

CREATE OR REPLACE VIEW "order_product_v" AS SELECT b.name,
    a.order_product_id,
    a.order_id,
    a.product_id,
    a.amount,
    a.price
   FROM (order_product a
     JOIN product b USING (product_id));


INSERT INTO "bussiness" ("bussiness_id", "rut", "name", "type", "address") VALUES
(8,	'14.519.717-1
',	'MEGACORPORACION',	'Servicios P??blicos',	'Av. Longroad 1203'),
(9,	'10.492.411-5',	'HERMANOS LAPIZ',	'Educacion',	'Las Brumas 20220'),
(7,	'13.587.012-9',	'VERDURAS GREENBEAN',	'Mayoristas
',	'Los Robles 3029'),
(10,	'2.311.334-5',	'SOLUCIONES LIMPIEZA',	'Servicio P??blico',	'Av. Shortstreet 9992');

INSERT INTO "product" ("product_id", "name", "desc", "brand", "price", "stock", "last_update") VALUES
(1,	'Leche',	'Leche Entera',	'Colun',	1090,	99999,	'2022-07-15 22:12:30.161195+00'),
(7,	'Azucar',	'Azucar granulado 1Kg',	'IANSA',	1390,	99999,	'2022-07-16 15:18:07.122586+00'),
(2,	'Pan',	'Pan integral',	'Ideal',	1090,	99999,	'2022-07-15 22:12:30.161195+00'),
(11,	'Zanahoria',	'Bolsa 1Kg',	'Frutas y Verduras Propias',	1000,	99999,	'2022-07-16 21:34:13.747466+00'),
(12,	'Piment??n Verde',	'Unidad',	'Frutas Y Verduras Propias',	900,	99999,	'2022-07-16 21:36:01.743974+00'),
(10,	'Palta',	'Malla ',	'Frutas y Verduras Propias',	4500,	99999,	'2022-07-16 21:30:35.088971+00'),
(8,	'Tomate',	'Malla 1Kg',	'Frutas y Verduras Propias',	2000,	99999,	'2022-07-16 21:29:10.818698+00'),
(13,	'Salame Ahumado',	'100g',	'PF',	1400,	99999,	'2022-07-16 21:38:35.983614+00'),
(14,	'Queso Gauda',	'500g',	'Colun',	5100,	99999,	'2022-07-16 21:41:03.3678+00'),
(15,	'Jamon Acaramelado Pavo',	'100g',	'Sopraval',	1500,	99999,	'2022-07-16 21:45:06.819828+00'),
(16,	'Jam??n Pierna Artesanal',	'125g',	'Receta Abuelo',	2000,	99999,	'2022-07-16 21:46:09.226349+00'),
(17,	'Queso Mantecoso',	'500g',	'Quilque',	5800,	99999,	'2022-07-16 21:46:59.141889+00'),
(18,	'Coca-Cola sin Az??car',	'3L',	'Coca-Cola',	2700,	99999,	'2022-07-16 21:48:13.729858+00'),
(19,	'Pepsi Zero',	'3L',	'Pepsi',	2500,	99999,	'2022-07-16 21:49:04.153779+00'),
(20,	'Papel Higi??nico ',	'8U 25m',	'Confort',	2600,	99999,	'2022-07-16 21:50:51.551552+00'),
(21,	'Papel Higi??nico',	'8U 25m',	'Scott',	3600,	99999,	'2022-07-16 21:52:26.197987+00'),
(22,	'Detergente L??quido Concentrado ',	'3L',	'Ariel',	11497,	99999,	'2022-07-17 18:47:59.071056+00'),
(23,	'Detergente Omo Matic L??quido',	'3L',	'Omo',	12500,	99999,	'2022-07-17 18:48:45.896838+00'),
(24,	'Shampoo Manzana',	'375Ml',	'Head & Shoulders',	4200,	99999,	'2022-07-17 18:51:26.63324+00'),
(25,	'Shampoo Camomilla',	'750Ml',	'Familand',	1999,	99999,	'2022-07-17 18:52:35.11473+00'),
(26,	'Jab??n L??quido',	'700Ml',	'Elite',	2099,	99999,	'2022-07-17 18:53:26.527089+00'),
(27,	'Jab??n L??quido Hipoalerg??nico',	'1L',	'Simond''s',	2190,	99999,	'2022-07-17 18:56:57.712895+00'),
(29,	'Cloro Gel Lavanda',	'900mL',	'Clorinda',	1715,	99999,	'2022-07-17 18:59:02.838656+00'),
(30,	'Quitamanchas Polvo',	'450g',	'Vanish',	4990,	99999,	'2022-07-17 18:59:47.293809+00'),
(31,	'Bolsa Basura Mediana',	'10U 70x90cm',	'Superior',	1100,	99999,	'2022-07-17 19:00:57.343247+00'),
(32,	'Servilletas Cocktail',	'200U',	'Elite',	1600,	99999,	'2022-07-17 19:01:23.192981+00'),
(33,	'Esponja Multiuso Lisa',	'4U',	'Virutex',	1300,	99999,	'2022-07-17 19:02:01.624469+00'),
(34,	'Bolsa Basura Grande',	'10U 80x110cm',	'Superior',	1500,	99999,	'2022-07-17 19:02:45.336045+00'),
(35,	'Lavalozas Concentrado',	'750Ml',	'Quix',	2400,	99999,	'2022-07-17 19:03:36.113212+00'),
(36,	'Lavalozas Concentrado Ultra',	'500Ml',	'Magistral',	2800,	99999,	'2022-07-17 19:04:21.793119+00'),
(28,	'Cloro Gel Limpiador',	'900Ml',	'Cif',	2159,	99999,	'2022-07-17 18:57:59.002939+00'),
(37,	'Jab??n Barra',	'1U',	'Dove',	1000,	99999,	'2022-07-17 21:04:38.54977+00');

INSERT INTO "user" ("user_id", "rut", "password", "email", "name", "last_name", "user_type", "active", "created_at") VALUES
(1,	'11.111.111-1',	'$2a$10$ZZKWE/0zWZHAQVOxiirceeQdkBlNOHUKU9l5Ue//xojTLAkIgFwEK',	'ostap.dem@inacapmail.cl',	'Ostap',	'Demcenco',	'seller',	'1',	'2022-07-15 15:59:11.75206+00'),
(3,	'5.126.663-3',	'$2a$10$ca3gpUDfW9h1gw/QUrtSoefV6FfTiOJqld0F5lx6CHsA/mafakeDe',	'benjamin.gomez@inacapmail.cl',	'Benjamin',	'Gomez',	'seller',	'1',	'2022-07-16 19:06:19.490153+00'),
(2,	'11.111.111-2',	'$2a$10$gnChC9gX8m3v3NXHz8Jrh.nDLDiffk8A/HKV/byz4G5KKxJejorp6',	'admin',	'admin',	'admin',	'admin',	'1',	'2022-07-15 15:59:11.75206+00'),
(4,	'5.126.632-3',	'$2a$10$ls/2B.fVw.hPePLRcteKv.Fjgep9Hq5tJRUghNp5Ygcy5ggYUU6Ny',	'martin.pizarro@inacapmail.cl',	'Martin',	'Pizarro',	'seller',	'1',	'2022-07-17 17:37:29.209386+00');




-- INGRESA VENTAS
CREATE OR REPLACE FUNCTION "genera_datos"(_fecha timestamptz)
RETURNS void AS 
$$


WITH shift_d AS 
(
  SELECT    shift_id
  FROM      "shift"
  WHERE     active = true
-- Selecciona un turno
), user_d AS 
(
  SELECT    user_id   
  FROM      "user" 
  WHERE       user_type != 'admin'
  OFFSET    floor(random() * (SELECT count(*) FROM "user" WHERE user_type != 'admin') )
  LIMIT     1
-- Busca usuario al azar
), insert_order AS 
(
INSERT INTO   "order"(user_id,shift_id,completed,created_at, updated_at)
SELECT        a.user_id,
              b.shift_id,
              true,
              _fecha,
              _fecha
FROM          user_d a,
              shift_d b
RETURNING     *
-- Inserta venta en un turno al azar
),random_products AS 
(
  SELECT    *  
  FROM      "product" 
  ORDER BY RANDOM()
  LIMIT     CEIL(RANDOM() * 15)
-- Productos al azar
), insert_products AS 
(
INSERT INTO   "order_product"(product_id, order_id, price,amount)
SELECT        a.product_id, 
              b.order_id, 
              a.price,
              CEIL(RANDOM() * 10)
FROM          random_products a,
              insert_order b
RETURNING     *
-- Insertar productos 
), random_sale_type AS 
(
  SELECT    CASE WHEN CEIL(RANDOM() * 2) = 1 
            THEN 'boleta' 
            ELSE 'factura' 
            END AS sale_type
-- Tipo de venta al azar 
), random_bussiness AS 
(
  SELECT    *
  FROM      "bussiness" 
  OFFSET    floor(random() * (SELECT count(*) FROM "bussiness") )
  LIMIT     1
), sum_products AS 
(
  SELECT    SUM(a.amount * a.price) total, a.order_id
  FROM      insert_products a
  GROUP BY  a.order_id
)
  INSERT INTO "sale"(order_id, total, bussiness_id,closed_at)
  SELECT      a.order_id,
              a.total,
              CASE WHEN   c.sale_type = 'boleta'
              THEN        NULL
              ELSE        d.bussiness_id END ,
              _fecha
  FROM        sum_products a,
              random_sale_type c,
              random_bussiness d
  RETURNING   *


$$ LANGUAGE SQL;



--Inserta turnos
WITH days AS 
(
SELECT    (CURRENT_TIMESTAMP - (a * interval '1 day'))::date fecha, a
FROM      generate_series(1,90) a
ORDER BY  fecha ASC
)
INSERT INTO "shift"(created_at,active,user_id)
SELECT      fecha, false, 2
FROM        days;

-- Turno activo desde el menor id
UPDATE "shift" a
SET     active = true 
FROM    ( SELECT   MIN(shift_id) max  from "shift" ) b
WHERE   shift_id = b.max;



CREATE OR REPLACE FUNCTION "genera_varias_ventas"()
RETURNS VOID AS $$
WITH shift_next AS 
( 
  UPDATE      "shift"
  SET         active = false 
  WHERE       active = true 
  RETURNING   shift_id
)
UPDATE "shift" a
SET     active = true 
FROM    shift_next b
WHERE   a.shift_id = (b.shift_id + 1);

  SELECT  genera_datos(a.created_at)
  FROM    generate_series(1,(CEIL(RANDOM()* 30))::int),
          "shift" a
  WHERE   a.active = true;

$$ LANGUAGE SQL;


SELECT "genera_varias_ventas"()
FROM   generate_series(1,200) a;

EOSQL