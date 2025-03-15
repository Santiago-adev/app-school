--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: colegio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colegio (
    id_colegio integer NOT NULL,
    nombre_colegio character varying(100) NOT NULL,
    codigo_colegio character varying(20) NOT NULL,
    id_municipio integer
);


ALTER TABLE public.colegio OWNER TO postgres;

--
-- Name: colegio_id_colegio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colegio_id_colegio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.colegio_id_colegio_seq OWNER TO postgres;

--
-- Name: colegio_id_colegio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colegio_id_colegio_seq OWNED BY public.colegio.id_colegio;


--
-- Name: departamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departamento (
    id_departamento integer NOT NULL,
    nombre_departamento character varying(100) NOT NULL,
    codigo_departamento character varying(10) NOT NULL
);


ALTER TABLE public.departamento OWNER TO postgres;

--
-- Name: departamento_id_departamento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departamento_id_departamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departamento_id_departamento_seq OWNER TO postgres;

--
-- Name: departamento_id_departamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departamento_id_departamento_seq OWNED BY public.departamento.id_departamento;


--
-- Name: municipio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.municipio (
    id_municipio integer NOT NULL,
    nombre_municipio character varying(100) NOT NULL,
    codigo_municipio character varying(10) NOT NULL,
    id_departamento integer
);


ALTER TABLE public.municipio OWNER TO postgres;

--
-- Name: municipio_id_municipio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.municipio_id_municipio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.municipio_id_municipio_seq OWNER TO postgres;

--
-- Name: municipio_id_municipio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.municipio_id_municipio_seq OWNED BY public.municipio.id_municipio;


--
-- Name: sede; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sede (
    id_sede integer NOT NULL,
    nombre_sede character varying(100) NOT NULL,
    codigo_sede character varying(20) NOT NULL,
    id_colegio integer
);


ALTER TABLE public.sede OWNER TO postgres;

--
-- Name: sede_id_sede_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sede_id_sede_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sede_id_sede_seq OWNER TO postgres;

--
-- Name: sede_id_sede_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sede_id_sede_seq OWNED BY public.sede.id_sede;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    rol character varying(50) NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: colegio id_colegio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colegio ALTER COLUMN id_colegio SET DEFAULT nextval('public.colegio_id_colegio_seq'::regclass);


--
-- Name: departamento id_departamento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento ALTER COLUMN id_departamento SET DEFAULT nextval('public.departamento_id_departamento_seq'::regclass);


--
-- Name: municipio id_municipio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipio ALTER COLUMN id_municipio SET DEFAULT nextval('public.municipio_id_municipio_seq'::regclass);


--
-- Name: sede id_sede; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sede ALTER COLUMN id_sede SET DEFAULT nextval('public.sede_id_sede_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: colegio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colegio (id_colegio, nombre_colegio, codigo_colegio, id_municipio) FROM stdin;
1	INSTITUCION EDUCATIVA DINAMARCA	250006001048	1
2	INSTITUCION EDUCATIVA VEINTE DE JULIO	150006000934	1
3	INSTITUCION EDUCATIVA JUAN HUMBERTO BAQUERO SOLER	150006001051	1
4	IE LAS ACACIAS (REGIMEN ESPECIAL)	550006000667	1
5	INSTITUCION EDUCATIVA MARIA MONTESSORI	150006000314	1
6	INSTITUCION EDUCATIVA SANTA TERESITA	250006000203	1
7	CENTRO EDUCATIVO BRISAS DEL GUAYURIBA	250006000246	1
8	INSTITUCION EDUCATIVA JUAN ROZO	150006001001	1
9	INSTITUCION EDUCATIVA GABRIELA MISTRAL	150006000322	1
10	INSTITUCION EDUCATIVA LUIS CARLOS GALAN SARMIENTO	150006001035	1
11	INSTITUCION EDUCATIVA CAMPESTRE SAN JOSE	250006000891	1
12	IE PABLO EMILIO RIVEROS	150006000438	1
13	IE UNAD (REGIMEN ESPECIAL)	150006001965	1
14	INSTITUCION EDUCATIVA LOS ALCARAVANES	250006800111	1
15	INSTITUCION EDUCATIVA ESCUELA NORMAL SUPERIOR DE ACACIAS	350006000445	1
16	INSTITUCION EDUCATIVA SAN ISIDRO DE CHICHIMENE	250006000165	1
17	INSTITUCION EDUCATIVA LAS ACACIAS	250006001921	1
\.


--
-- Data for Name: departamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departamento (id_departamento, nombre_departamento, codigo_departamento) FROM stdin;
1	META	50
\.


--
-- Data for Name: municipio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.municipio (id_municipio, nombre_municipio, codigo_municipio, id_departamento) FROM stdin;
1	ACACIAS	006	1
2	BARRANCA DE UPIA	110	1
3	CABUYARO	124	1
4	CASTILLA LA NUEVA	150	1
5	CUBARRAL	223	1
6	CUMARAL	226	1
7	EL CALVARIO	245	1
8	EL CASTILLO	251	1
9	EL DORADO	270	1
10	FUENTE DE ORO	287	1
11	GRANADA	313	1
12	GUAMAL	318	1
13	MAPIRIPAN	325	1
14	MESETAS	330	1
15	LA MACARENA	350	1
16	URIBE	370	1
17	LEJANIAS	400	1
18	PUERTO CONCORDIA	450	1
19	PUERTO GAITAN	568	1
20	PUERTO LOPEZ	573	1
21	PUERTO LLERAS	577	1
22	PUERTO RICO	590	1
23	RESTREPO	606	1
24	SAN CARLOS DE GUAROA	680	1
25	SAN JUAN DE ARAMA	683	1
26	SAN JUANITO	686	1
27	SAN MARTIN	689	1
28	VISTAHERMOSA	711	1
\.


--
-- Data for Name: sede; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sede (id_sede, nombre_sede, codigo_sede, id_colegio) FROM stdin;
1	SEDE PALOMAS	250006000564	1
2	SEDE PRINCIPAL DINAMARCA	250006001048	1
3	SEDE QUEBRADITAS	250006000831	1
4	SEDE PRINCIPAL VEINTE DE JULIO	150006000934	2
5	SEDE LILIA CASTRO DE PARRADO	150006001060	2
6	SEDE EL CARMEN	250006000653	3
7	SEDE PRINCIPAL JUAN HUMBERTO BAQUERO SOLER	150006001051	3
8	CENT EDUC FABIO CAMPO SILVA	550006000667	4
9	SEDE PRINCIPAL MARIA MONTESSORI	150006000314	5
10	SEDE EL ROSARIO	250006000076	6
11	SEDE PRINCIPAL SANTA TERESITA	250006000203	6
12	SEDE SAN CAYETANO	250006000211	6
13	SEDE EL RESGUARDO	250006000238	6
14	SEDE MONTELIBANO	250006000262	6
15	SEDE LAS MARGARITAS	250006000351	6
16	SEDE LA LOMA	250006000815	6
17	SEDE SANTA RITA	250006001706	7
18	SEDE SARDINATA	250006001722	7
19	SEDE PORTACHUELO	250006000343	7
20	SEDE RUR LIBANO ALTO	250006000033	7
21	SEDE VENECIA	250006000114	7
22	SEDE LAS BLANCAS	250006000157	7
23	SEDE PRINCIPAL BRISAS DEL GUAYURIBA	250006000246	7
24	SEDE ALTO ACACIITAS	250006000297	7
25	SEDE LOMA DE SAN PABLO	250006000360	7
26	SEDE LOMA DEL PAŃUELO	250006000386	7
27	SEDE LOS PINOS	250006001102	7
28	SEDE LOMA DE SAN JUAN	250006000092	7
29	SEDE VISTAHERMOSA	250006000807	7
30	SEDE MANZANARES	250006000475	7
31	SEDE SAN CRISTOBAL	250006800099	7
32	SEDE PRINCIPAL JUAN ROZO	150006001001	8
33	SEDE ANTONIO NARIÑO	150006000721	8
34	SEDE ENRIQUE DANIELS	150006000403	8
35	SEDE PABLO SEXTO	150006000306	8
36	SEDE RAFAEL POMBO	150006001698	8
37	SEDE PRINCIPAL GABRIELA MISTRAL	150006000322	9
38	SEDE SAN NICOLAS	250006000378	9
39	SEDE PRINCIPAL LUIS CARLOS GALAN SARMIENTO	150006001035	10
40	SEDE LA CECILITA	250006000131	11
41	SEDE RANCHO GRANDE	250006000173	11
42	SEDE PRINCIPAL CAMPESTRE SAN JOSE	250006000891	11
43	SEDE SAN JUANITO	250006000106	11
44	SEDE VICTOR MANUEL PAEZ GUERRA	250006001912	12
45	SEDE PRINCIPAL PABLO EMILIO RIVEROS	150006000438	12
46	SEDE EL DORADO	150006000764	12
47	SEDE SAGRADO CORAZON	250006000220	12
48	SEDE BTO A DISTANCIA PARA JOVENES Y ADULTOS - UNAD - SEDE PRINCIPAL	150006001965	13
49	SEDE PRINCIPAL LOS ALCARAVANES	250006800111	14
50	SEDE PABLO NERUDA	150006000462	15
51	SEDE PRINCIPAL ESCUELA NORMAL SUPERIOR DE ACACIAS	350006000445	15
52	SEDE EL PLAYON	250006000122	15
53	SEDE MONTEBELLO	250006000017	16
54	SEDE PRINCIPAL SAN ISIDRO DE CHICHIMENE	250006000165	16
55	SEDE SANTA ROSA	250006000181	16
56	SEDE LA ESMERALDA	250006000190	16
57	SEDE LA PRIMAVERA	250006000505	16
58	SEDE MANUELA BELTRAN	250006001081	16
59	SEDE LA UNION	250006001889	16
60	SEDE LOMA DE TIGRE	250006000068	16
61	SEDE EL TRIUNFO	250006000041	16
62	SEDE PRINCIPAL LAS ACACIAS	250006001921	17
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, rol) FROM stdin;
\.


--
-- Name: colegio_id_colegio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colegio_id_colegio_seq', 17, true);


--
-- Name: departamento_id_departamento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departamento_id_departamento_seq', 1, true);


--
-- Name: municipio_id_municipio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.municipio_id_municipio_seq', 28, true);


--
-- Name: sede_id_sede_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sede_id_sede_seq', 62, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, false);


--
-- Name: colegio colegio_codigo_colegio_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colegio
    ADD CONSTRAINT colegio_codigo_colegio_key UNIQUE (codigo_colegio);


--
-- Name: colegio colegio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colegio
    ADD CONSTRAINT colegio_pkey PRIMARY KEY (id_colegio);


--
-- Name: departamento departamento_codigo_departamento_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_codigo_departamento_key UNIQUE (codigo_departamento);


--
-- Name: departamento departamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_pkey PRIMARY KEY (id_departamento);


--
-- Name: municipio municipio_codigo_municipio_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipio
    ADD CONSTRAINT municipio_codigo_municipio_key UNIQUE (codigo_municipio);


--
-- Name: municipio municipio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipio
    ADD CONSTRAINT municipio_pkey PRIMARY KEY (id_municipio);


--
-- Name: sede sede_codigo_sede_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sede
    ADD CONSTRAINT sede_codigo_sede_key UNIQUE (codigo_sede);


--
-- Name: sede sede_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sede
    ADD CONSTRAINT sede_pkey PRIMARY KEY (id_sede);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: colegio colegio_id_municipio_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colegio
    ADD CONSTRAINT colegio_id_municipio_fkey FOREIGN KEY (id_municipio) REFERENCES public.municipio(id_municipio) ON DELETE CASCADE;


--
-- Name: municipio municipio_id_departamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipio
    ADD CONSTRAINT municipio_id_departamento_fkey FOREIGN KEY (id_departamento) REFERENCES public.departamento(id_departamento) ON DELETE CASCADE;


--
-- Name: sede sede_id_colegio_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sede
    ADD CONSTRAINT sede_id_colegio_fkey FOREIGN KEY (id_colegio) REFERENCES public.colegio(id_colegio) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

