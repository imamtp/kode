--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: seq_account; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_account
    START WITH 762
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_account OWNER TO senuserpg;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE account (
    idaccounttype bigint,
    idaccount bigint DEFAULT nextval('seq_account'::regclass) NOT NULL,
    idclassificationcf integer,
    idlinked integer,
    idparent bigint,
    accnumber character varying(30),
    accname character varying(100),
    tax character varying(5),
    balance double precision,
    display smallint,
    description character varying(224),
    userin character varying(30),
    usermod character varying(30),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    active boolean,
    idunit integer NOT NULL,
    idaccounttmp integer,
    idpos integer,
    permanent boolean,
    lock boolean
);


ALTER TABLE account OWNER TO senuserpg;

--
-- Name: accounthistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE accounthistory (
    idaccount bigint,
    balance double precision,
    day integer,
    month character(2),
    year integer,
    datein timestamp(6) without time zone,
    userin character varying,
    idunit integer
);


ALTER TABLE accounthistory OWNER TO senuserpg;

--
-- Name: accountingdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE accountingdata (
    idaccountingdata bigint NOT NULL,
    curfinyear integer,
    finlasmonth integer,
    numperiod integer
);


ALTER TABLE accountingdata OWNER TO senuserpg;

--
-- Name: accountlog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE accountlog (
    idaccountlog integer,
    idaccount integer NOT NULL,
    credit double precision,
    debit double precision,
    tanggal date NOT NULL,
    idjournal integer NOT NULL,
    datein timestamp(6) without time zone,
    userid integer NOT NULL,
    idunit integer NOT NULL
);


ALTER TABLE accountlog OWNER TO senuserpg;

--
-- Name: accountpos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE accountpos (
    idpos integer NOT NULL,
    namepos character varying(20)
);


ALTER TABLE accountpos OWNER TO senuserpg;

--
-- Name: accountsubtype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE accountsubtype (
    idaccountsubtype bigint NOT NULL,
    idaccounttype bigint,
    accsubname character varying(20)
);


ALTER TABLE accountsubtype OWNER TO senuserpg;

--
-- Name: accounttype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE accounttype (
    idaccounttype bigint NOT NULL,
    acctypename character varying(60),
    idclassificationcf integer,
    display integer
);


ALTER TABLE accounttype OWNER TO senuserpg;

--
-- Name: alerttype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE alerttype (
    idalerttype integer NOT NULL,
    alertname character varying(100)
);


ALTER TABLE alerttype OWNER TO senuserpg;

--
-- Name: amounttype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE amounttype (
    idamounttype integer NOT NULL,
    name character varying(30),
    "desc" character varying(80),
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone
);


ALTER TABLE amounttype OWNER TO senuserpg;

--
-- Name: seq_asuransi; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_asuransi
    START WITH 14
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_asuransi OWNER TO senuserpg;

--
-- Name: asuransi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE asuransi (
    idasuransi integer DEFAULT nextval('seq_asuransi'::regclass) NOT NULL,
    idasuransitype integer,
    idasuransipaytype integer,
    namapremi character varying(30),
    deskripsi character varying(200),
    fixamount double precision,
    percentemployee double precision,
    percentcompany double precision,
    "idaccountemp-deleted" integer,
    "idaccountcomp-deleted" integer,
    userin character varying(20),
    datein timestamp(6) without time zone,
    usermod character varying(20),
    datemod timestamp(6) without time zone,
    display integer,
    tampilemp character varying(2),
    tampilcmp character varying(2)
);


ALTER TABLE asuransi OWNER TO senuserpg;

--
-- Name: seq_asuransiemp; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_asuransiemp
    START WITH 19
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_asuransiemp OWNER TO senuserpg;

--
-- Name: asuransiemp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE asuransiemp (
    idasuransiemp integer DEFAULT nextval('seq_asuransiemp'::regclass) NOT NULL,
    idasuransi integer,
    idemployee bigint,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    display integer
);


ALTER TABLE asuransiemp OWNER TO senuserpg;

--
-- Name: asuransipayhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE asuransipayhistory (
    percente double precision,
    percentc double precision,
    amounte double precision,
    amountc double precision,
    userin character varying(20),
    datein timestamp(6) without time zone,
    month character varying(2) NOT NULL,
    year integer NOT NULL,
    idasuransi integer NOT NULL,
    idemployee integer NOT NULL
);


ALTER TABLE asuransipayhistory OWNER TO senuserpg;

--
-- Name: asuransipaytype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE asuransipaytype (
    idasuransipaytype integer NOT NULL,
    nametype character varying(50)
);


ALTER TABLE asuransipaytype OWNER TO senuserpg;

--
-- Name: asuransitype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE asuransitype (
    idasuransitype integer NOT NULL,
    nametype character varying(20),
    column_3 character(10)
);


ALTER TABLE asuransitype OWNER TO senuserpg;

--
-- Name: asuransiunit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE asuransiunit (
    idasuransi integer,
    idaccountemp integer,
    idaccountcomp integer,
    idunit integer
);


ALTER TABLE asuransiunit OWNER TO senuserpg;

--
-- Name: bank; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE bank (
    bank_id integer NOT NULL,
    bank_name character varying(150),
    branch_name character varying(225),
    address character varying(225),
    account_number character varying(150),
    account_name character varying(100),
    idunit integer,
    display int2vector,
    userin integer,
    datein timestamp(6) without time zone,
    usermod integer,
    datemod timestamp(6) without time zone
);


ALTER TABLE bank OWNER TO senuserpg;

--
-- Name: brand; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE brand (
    brand_id integer NOT NULL,
    idunit integer,
    brand_name character varying(105),
    brand_desc character varying(225),
    display smallint,
    userin character varying(20),
    datein timestamp(6) without time zone,
    usermod character varying(20),
    datemod timestamp(6) without time zone,
    status smallint,
    deleted smallint
);


ALTER TABLE brand OWNER TO senuserpg;

--
-- Name: bussinestype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE bussinestype (
    idbussinestype bigint NOT NULL,
    namebussines character varying(150),
    description character varying(200)
);


ALTER TABLE bussinestype OWNER TO senuserpg;

--
-- Name: classificationcf; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE classificationcf (
    idclassificationcf integer NOT NULL,
    classname character varying(20),
    description character varying(200),
    prefixno integer
);


ALTER TABLE classificationcf OWNER TO senuserpg;

--
-- Name: TABLE classificationcf; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE classificationcf IS 'classification cash flow';


--
-- Name: client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE client (
    clientid integer NOT NULL,
    dateregistered date,
    packageid integer,
    nextinvoice date
);


ALTER TABLE client OWNER TO senuserpg;

--
-- Name: closebook; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE closebook (
    idclossing integer,
    tanggal date,
    idunit integer,
    userin character varying(20),
    type character varying(20)
);


ALTER TABLE closebook OWNER TO senuserpg;

--
-- Name: seq_clossing; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_clossing
    START WITH 2318
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_clossing OWNER TO senuserpg;

--
-- Name: clossing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE clossing (
    idclossing integer DEFAULT nextval('seq_clossing'::regclass) NOT NULL,
    idaccounttype bigint,
    idaccount bigint NOT NULL,
    idclassificationcf integer,
    idlinked integer,
    idparent bigint,
    accnumber character varying(30),
    accname character varying(100),
    balance double precision,
    display smallint,
    description character varying(224),
    userin character varying(30),
    usermod character varying(30),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    active boolean,
    idunit integer,
    idaccounttmp integer,
    month character varying(2),
    year integer,
    dateclose date,
    idpos integer
);


ALTER TABLE clossing OWNER TO senuserpg;

--
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE company (
    idcompany bigint NOT NULL,
    idbussinestype bigint,
    companyname character varying(200),
    companyaddress text,
    companyaddress2 text,
    companyaddress3 text,
    companyaddress4 text,
    companyaddress5 text,
    telp character varying(200),
    fax character varying(200),
    email character varying(200),
    website character varying(100),
    country character varying(100),
    npwp character varying(200),
    userin character varying(100),
    usermod character varying(100),
    datein time(6) with time zone,
    datemod timestamp(6) without time zone,
    display integer,
    curfinanceyear integer,
    lastmonthfinanceyear character varying(2),
    conversionmonth character varying(2),
    numaccperiod integer,
    logo character varying(100),
    idlocation integer,
    type smallint
);


ALTER TABLE company OWNER TO senuserpg;

--
-- Name: COLUMN company.type; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN company.type IS '1:Head Office 2:Branch';


--
-- Name: credittterm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE credittterm (
    idcreditterm bigint NOT NULL,
    namecredit character varying(50)
);


ALTER TABLE credittterm OWNER TO senuserpg;

--
-- Name: seq_master; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_master
    START WITH 60
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_master OWNER TO senuserpg;

--
-- Name: currency; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE currency (
    idcurrency integer DEFAULT nextval('seq_master'::regclass) NOT NULL,
    namecurr character varying(20),
    symbol character varying(5),
    description character varying(100),
    display inet,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    idunit integer,
    rate numeric(12,2)
);


ALTER TABLE currency OWNER TO senuserpg;

--
-- Name: seq_customer; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_customer
    START WITH 8
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_customer OWNER TO senuserpg;

--
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE customer (
    idcustomer bigint DEFAULT nextval('seq_customer'::regclass) NOT NULL,
    idcustomertype integer,
    idpayment bigint,
    nocustomer character varying(50),
    namecustomer character varying(50),
    address character varying(225),
    shipaddress character varying(225),
    billaddress character varying(225),
    telephone character varying(20),
    handphone character varying(20),
    fax character varying(20),
    email character varying(20),
    website character varying(20),
    city character varying(50),
    state character varying(50),
    postcode character varying(10),
    country character varying(15),
    highestpayment double precision,
    avgdaypayment integer,
    lastpayment timestamp(6) without time zone,
    lastsales double precision,
    incomeaccount bigint,
    notes character varying(225),
    display smallint,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    status smallint,
    deleted smallint
);


ALTER TABLE customer OWNER TO senuserpg;

--
-- Name: customertype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE customertype (
    idcustomertype integer NOT NULL,
    namecustype character varying(20),
    description character varying(225),
    userin integer,
    datein timestamp(6) without time zone,
    usermod integer,
    datemod timestamp(6) without time zone,
    idunit integer NOT NULL,
    display smallint,
    status smallint,
    deleted smallint
);


ALTER TABLE customertype OWNER TO senuserpg;

--
-- Name: seq_dataanak; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_dataanak
    START WITH 7
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_dataanak OWNER TO senuserpg;

--
-- Name: dataanak; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE dataanak (
    datanakid integer DEFAULT nextval('seq_dataanak'::regclass) NOT NULL,
    idemployee bigint,
    namaanak character varying(100),
    userin character varying(20),
    datein timestamp(6) without time zone,
    usermod character varying(20),
    datemod timestamp(6) without time zone,
    display integer
);


ALTER TABLE dataanak OWNER TO senuserpg;

--
-- Name: seq_datasutri; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_datasutri
    START WITH 16
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_datasutri OWNER TO senuserpg;

--
-- Name: datasutri; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE datasutri (
    datasutri integer DEFAULT nextval('seq_datasutri'::regclass) NOT NULL,
    idemployee bigint,
    namasutri character varying(50),
    work character varying(200),
    samework boolean,
    userin character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    usermod character varying(20),
    display integer,
    kodekerja integer
);


ALTER TABLE datasutri OWNER TO senuserpg;

--
-- Name: seq_disbursment; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_disbursment
    START WITH 14
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_disbursment OWNER TO senuserpg;

--
-- Name: disbursment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE disbursment (
    iddisbursment bigint DEFAULT nextval('seq_disbursment'::regclass) NOT NULL,
    idpurchase bigint,
    idaccount bigint,
    idjournal bigint,
    datepay date,
    nocheque character varying(50),
    memo character varying(225),
    totalowed double precision,
    totalpaid double precision,
    balance double precision,
    payee text,
    display integer,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    idregistrasihutang integer
);


ALTER TABLE disbursment OWNER TO senuserpg;

--
-- Name: seq_employee; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_employee
    START WITH 15
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_employee OWNER TO senuserpg;

--
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE employee (
    idemployee bigint DEFAULT nextval('seq_employee'::regclass) NOT NULL,
    code character varying(50),
    firstname character varying(50),
    lastname character varying(50),
    address character varying(225),
    telephone character varying(20),
    handphone character varying(20),
    fax character varying(20),
    email character varying(20),
    website character varying(20),
    city character varying(50),
    state character varying(50),
    postcode character varying(10),
    country character varying(15),
    notes character varying(225),
    display smallint,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    idemployeetype integer,
    idunit integer,
    idkawin integer,
    pegawaitglmasuk date,
    norek character varying(50),
    namabank character varying(50),
    keaktifan character varying(32),
    tglresign date,
    idjenisptkp integer,
    idupload integer
);


ALTER TABLE employee OWNER TO senuserpg;

--
-- Name: seq_employeetype; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_employeetype
    START WITH 18
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_employeetype OWNER TO senuserpg;

--
-- Name: employeetype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE employeetype (
    idemployeetype integer DEFAULT nextval('seq_employeetype'::regclass) NOT NULL,
    nametype character varying(20),
    description text,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    idaccountpayroll integer,
    idunit integer,
    display integer,
    idaccount integer,
    payrolltypeid integer,
    fare double precision,
    idaccountpaythr integer,
    idaccountthr integer,
    idcompany integer
);


ALTER TABLE employeetype OWNER TO senuserpg;

--
-- Name: employeetypeakunlink; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE employeetypeakunlink (
    idemployeetype integer,
    idaccountpayroll integer,
    idaccount integer,
    idaccountpaythr integer,
    idaccountthr integer,
    idunit integer
);


ALTER TABLE employeetypeakunlink OWNER TO senuserpg;

--
-- Name: frequency; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE frequency (
    idfrequency integer NOT NULL,
    namefreq character varying(20)
);


ALTER TABLE frequency OWNER TO senuserpg;

--
-- Name: hakakses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE hakakses (
    sys_menu_id integer NOT NULL,
    group_id integer NOT NULL,
    view boolean,
    edit boolean,
    delete boolean,
    usermod character varying(20),
    datemod timestamp(6) without time zone,
    add boolean
);


ALTER TABLE hakakses OWNER TO senuserpg;

--
-- Name: seq_inventory; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_inventory
    START WITH 36
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_inventory OWNER TO senuserpg;

--
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE inventory (
    idinventory bigint DEFAULT nextval('seq_inventory'::regclass) NOT NULL,
    idjournal bigint,
    invno character varying(30),
    nameinventory character varying(30),
    description character varying(225),
    isinventory boolean,
    issell boolean,
    isbuy boolean,
    cosaccount bigint DEFAULT 0,
    incomeaccount bigint,
    assetaccount bigint,
    qtystock integer,
    images character varying(30),
    cost double precision,
    unitmeasure character varying(30),
    numperunit integer,
    minstock integer,
    idprimarysupplier bigint,
    sellingprice double precision,
    idselingtax integer,
    unitmeasuresell character varying(30),
    numperunitsell integer,
    notes character varying(225),
    display integer,
    userin character varying(30),
    usermod character varying(30),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    yearbuy integer,
    monthbuy character varying(2),
    datebuy date,
    idinventorycat integer,
    idbuytax integer,
    idunit integer,
    residu double precision,
    umur integer,
    akumulasibeban double precision,
    bebanberjalan double precision,
    nilaibuku double precision,
    bebanperbulan double precision,
    akumulasiakhir double precision
);


ALTER TABLE inventory OWNER TO senuserpg;

--
-- Name: inventorycat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE inventorycat (
    idinventorycat integer NOT NULL,
    namecat character varying(60),
    description text,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    display integer
);


ALTER TABLE inventorycat OWNER TO senuserpg;

--
-- Name: seq_inventoryadjusment; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_inventoryadjusment
    START WITH 45
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_inventoryadjusment OWNER TO senuserpg;

--
-- Name: inventorydeprec; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE inventorydeprec (
    iddepreciation bigint DEFAULT nextval('seq_inventoryadjusment'::regclass) NOT NULL,
    nojournal character varying(30),
    memo character varying(225),
    display integer,
    userin character varying(30),
    usermod character varying(30),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    idunit integer,
    dateadj date,
    month character varying(2),
    year integer,
    penyusutanbulan double precision,
    bebanberjalan double precision,
    akumulasipenyusutan double precision,
    nilaibuku double precision,
    bulanpenyusutan integer,
    idclossing integer
);


ALTER TABLE inventorydeprec OWNER TO senuserpg;

--
-- Name: inventorydeprecitem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE inventorydeprecitem (
    iddepreciation bigint NOT NULL,
    idinventory bigint NOT NULL,
    idaccount bigint,
    onhand integer,
    counted integer,
    qty integer,
    unitcost double precision,
    amount double precision,
    memo character varying(225),
    diference character(50),
    month character varying(2) NOT NULL,
    year integer NOT NULL,
    penyusutan double precision,
    bulanpenyusutan integer,
    idunit integer NOT NULL
);


ALTER TABLE inventorydeprecitem OWNER TO senuserpg;

--
-- Name: inventoryunit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE inventoryunit (
    idinventory integer NOT NULL,
    idunit integer NOT NULL,
    assetaccount integer,
    akumpenyusutaccount integer,
    depresiasiaccount integer,
    clossed integer,
    penyusutanberjalan double precision
);


ALTER TABLE inventoryunit OWNER TO senuserpg;

--
-- Name: jenisptkp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE jenisptkp (
    idjenisptkp integer NOT NULL,
    namaptkp character varying(20),
    deskripsi character varying(225),
    totalptkp double precision,
    display integer,
    userin character varying(32),
    usermod character varying(32),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone
);


ALTER TABLE jenisptkp OWNER TO senuserpg;

--
-- Name: seq_journal; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_journal
    START WITH 450
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_journal OWNER TO senuserpg;

--
-- Name: journal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE journal (
    idjournal bigint DEFAULT nextval('seq_journal'::regclass) NOT NULL,
    idjournaltype bigint,
    nojournal character varying(100),
    name character varying(225),
    datejournal date,
    memo character varying(225),
    totaldebit double precision,
    totalcredit double precision,
    totaltax double precision,
    isrecuring boolean,
    year integer,
    month character varying(2),
    display integer,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    lastbalance double precision,
    currbalance double precision,
    balance double precision,
    idunit integer,
    idcurrency integer,
    idreconcile integer,
    idclossing integer
);


ALTER TABLE journal OWNER TO senuserpg;

--
-- Name: seq_journalitem; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_journalitem
    START WITH 2366
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_journalitem OWNER TO senuserpg;

--
-- Name: journalitem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE journalitem (
    idjournalitem bigint DEFAULT nextval('seq_journalitem'::regclass) NOT NULL,
    idjournal bigint,
    idaccount bigint,
    idtax integer,
    debit double precision,
    credit double precision,
    memo character varying(225),
    lastbalance double precision,
    currbalance double precision
);


ALTER TABLE journalitem OWNER TO senuserpg;

--
-- Name: journalitemrec; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE journalitemrec (
    idjournalitemrec bigint DEFAULT nextval('seq_journalitem'::regclass) NOT NULL,
    idjournalrec bigint,
    idaccount bigint,
    idtax integer,
    debit double precision,
    credit double precision,
    memo character varying(225)
);


ALTER TABLE journalitemrec OWNER TO senuserpg;

--
-- Name: journalrec; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE journalrec (
    idjournalrec bigint DEFAULT nextval('seq_journal'::regclass) NOT NULL,
    idfrequency integer,
    idscheduletype bigint,
    idalerttype integer,
    idjournaltype bigint,
    nojournal character varying(100),
    name character varying(225),
    datejournal date,
    memo character varying(225),
    totaldebit double precision,
    totalcredit double precision,
    totaltax double precision,
    balance double precision,
    isrecuring boolean,
    startdate date,
    recuntildate date,
    recnumtimes integer,
    alertto bigint,
    notifto bigint,
    alertmindays smallint,
    alertondate smallint,
    year integer,
    month character varying(2),
    display integer,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone
);


ALTER TABLE journalrec OWNER TO senuserpg;

--
-- Name: journaltype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE journaltype (
    idjournaltype bigint NOT NULL,
    namejournal character varying(20),
    description character varying(225)
);


ALTER TABLE journaltype OWNER TO senuserpg;

--
-- Name: linkedacc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE linkedacc (
    idlinked integer NOT NULL,
    idaccounttype bigint,
    namelinked character varying(200),
    description character varying(224),
    idaccount integer,
    display integer
);


ALTER TABLE linkedacc OWNER TO senuserpg;

--
-- Name: TABLE linkedacc; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE linkedacc IS 'linked account';


--
-- Name: linkedaccunit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE linkedaccunit (
    idlinked integer NOT NULL,
    idaccount integer,
    idunit integer
);


ALTER TABLE linkedaccunit OWNER TO senuserpg;

--
-- Name: seq_linkpiutang; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_linkpiutang
    START WITH 9
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_linkpiutang OWNER TO senuserpg;

--
-- Name: linkpiutang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE linkpiutang (
    idlinkpiutang integer DEFAULT nextval('seq_linkpiutang'::regclass) NOT NULL,
    idaccountpiutang integer,
    idaccount integer,
    description character varying(225),
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    display integer,
    idunit integer
);


ALTER TABLE linkpiutang OWNER TO senuserpg;

--
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE location (
    idlocation integer NOT NULL,
    location_name character varying(50),
    location_code character varying(25),
    status smallint,
    display smallint,
    deleted smallint,
    userin character varying(25),
    datein date,
    usermod character varying(25),
    datemod date
);


ALTER TABLE location OWNER TO senuserpg;

--
-- Name: seq_loginlog; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_loginlog
    START WITH 402
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_loginlog OWNER TO senuserpg;

--
-- Name: loginlog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE loginlog (
    pegawainid character varying(20),
    jammasuk time(6) without time zone,
    tanggal date,
    bulan character varying(16),
    tahun character varying(16),
    is_referral character varying(50),
    browser character varying(50),
    version character varying(50),
    mobile character varying(50),
    robot character varying(50),
    referrer character varying(50),
    agent_string character varying(225),
    userin character varying(50),
    usermod character varying(50),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    ipaddress character varying(25),
    loginlogid integer DEFAULT nextval('seq_loginlog'::regclass) NOT NULL,
    username character varying(225)
);


ALTER TABLE loginlog OWNER TO senuserpg;

--
-- Name: machine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE machine (
    machine_id integer NOT NULL,
    machine_name integer,
    machine_description character varying(225),
    width_material numeric(12,2),
    unit_item_id integer,
    machine_type_id integer,
    idunit integer,
    userin integer,
    datein timestamp(6) without time zone,
    usermod integer,
    datemod timestamp(6) without time zone,
    display integer,
    brand character varying(50),
    serial_no character varying(50),
    machine_result character varying(150),
    manufacturer character varying(150),
    status smallint,
    deleted smallint
);


ALTER TABLE machine OWNER TO senuserpg;

--
-- Name: machine_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE machine_type (
    machine_type_id integer NOT NULL,
    idunit integer,
    machine_type_name character varying(150),
    machine_type_desc character varying(225),
    userin integer,
    datein timestamp(6) without time zone,
    usermod integer,
    datemod timestamp(6) without time zone,
    display smallint,
    status smallint,
    deleted smallint
);


ALTER TABLE machine_type OWNER TO senuserpg;

--
-- Name: month; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE month (
    idmonth integer NOT NULL,
    monthname character varying(30)
);


ALTER TABLE month OWNER TO senuserpg;

--
-- Name: package; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE package (
    packageid integer NOT NULL,
    packagename character varying(30),
    price real,
    description character varying(225)
);


ALTER TABLE package OWNER TO senuserpg;

--
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE payment (
    idpayment bigint NOT NULL,
    namepayment character varying(30),
    description character varying(150),
    userin character varying(30),
    usermod character varying(30),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone
);


ALTER TABLE payment OWNER TO senuserpg;

--
-- Name: payroll; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE payroll (
    idpayroll integer NOT NULL,
    idjournal integer,
    month character varying(2),
    year integer,
    userin integer,
    datein timestamp(6) without time zone,
    idunit integer
);


ALTER TABLE payroll OWNER TO senuserpg;

--
-- Name: payrollproceed; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE payrollproceed (
    idemployee integer NOT NULL,
    firstname character varying(225),
    lastname character varying(225),
    namaunit character varying(100),
    nametype character varying(100),
    jumlahjam integer,
    jumlahkehadiran integer,
    totalgaji double precision,
    totaltunjangan double precision,
    pph21 double precision,
    totalpotongan double precision,
    totalpembayaran double precision,
    payname character varying(100),
    userin character varying(100),
    code character varying(100),
    userid integer,
    idemployeetype integer,
    payrolltypeid integer,
    pembayaranperjamkehadiran double precision,
    premiinsurance text,
    ptkp double precision,
    wajibpajak double precision,
    jenispph21 character varying(53),
    tarifpajak double precision,
    pphterhutang double precision,
    month character varying(2) NOT NULL,
    year integer NOT NULL,
    datein timestamp(6) without time zone,
    idunit integer NOT NULL,
    idpayroll integer,
    penambahangaji double precision,
    numtanggungan integer,
    tglpenggajian date
);


ALTER TABLE payrollproceed OWNER TO senuserpg;

--
-- Name: payrollsettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE payrollsettings (
    payrollsettingid integer NOT NULL,
    payrolltypeid integer,
    payrollname character varying(100),
    payrolldesc character varying(225),
    fare real,
    datein timestamp(6) without time zone,
    userin character varying(32),
    datemod timestamp(6) without time zone,
    usermod character varying(32),
    display integer
);


ALTER TABLE payrollsettings OWNER TO senuserpg;

--
-- Name: payrolltmp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE payrolltmp (
    idemployee integer NOT NULL,
    firstname character varying(225),
    lastname character varying(225),
    namaunit character varying(100),
    nametype character varying(100),
    jumlahjam integer,
    jumlahkehadiran integer,
    totalgaji double precision,
    totaltunjangan double precision,
    pph21 double precision,
    totalpotongan double precision,
    totalpembayaran double precision,
    payname character varying(100),
    userin character varying(100),
    code character varying(100),
    userid integer,
    idemployeetype integer,
    payrolltypeid integer,
    pembayaranperjamkehadiran double precision,
    premiinsurance text,
    ptkp double precision,
    wajibpajak double precision,
    jenispph21 character varying(53),
    tarifpajak double precision,
    pphterhutang double precision,
    idunit integer NOT NULL,
    penambahangaji double precision,
    numtanggungan integer
);


ALTER TABLE payrolltmp OWNER TO senuserpg;

--
-- Name: payrolltype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE payrolltype (
    payrolltypeid integer NOT NULL,
    payname character varying(100),
    description character varying(225),
    datein timestamp(6) without time zone,
    userin character varying,
    datemod timestamp(6) without time zone,
    usermod character varying,
    display integer
);


ALTER TABLE payrolltype OWNER TO senuserpg;

--
-- Name: pelanggan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE pelanggan (
    idpelanggan integer NOT NULL,
    idpelanggantype integer,
    nama character varying(30),
    namaperusahaan character varying(50),
    jabatan character varying(50),
    npwp character varying(30),
    telpon1 character varying(20),
    telpon2 character varying(20),
    fax character varying(20),
    hp character varying(20),
    email character varying(50),
    website character varying(50),
    alamat character varying(225),
    kota character varying(20),
    kodepos integer,
    pengiriman character varying(225),
    negara character varying(20),
    foto character varying(100),
    catatan character varying(225),
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    idunit integer,
    display integer
);


ALTER TABLE pelanggan OWNER TO senuserpg;

--
-- Name: pelanggantype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE pelanggantype (
    idpelanggantype integer NOT NULL,
    pelanggantype character varying(50)
);


ALTER TABLE pelanggantype OWNER TO senuserpg;

--
-- Name: piutanghistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE piutanghistory (
    idregistrasipiutang integer,
    month character varying(2),
    year integer,
    tanggal date,
    diterima real,
    sisa real,
    idjournal integer,
    source character varying(20),
    userin character varying,
    datein timestamp(6) without time zone,
    idreceivemoney integer
);


ALTER TABLE piutanghistory OWNER TO senuserpg;

--
-- Name: piutangpayhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE piutangpayhistory (
    idregistrasipiutang integer NOT NULL,
    month character varying(2),
    year integer,
    penerimaan double precision,
    jumlah double precision,
    sisapiutang double precision,
    idunit integer,
    datein timestamp(6) without time zone NOT NULL,
    userin integer,
    tglpenerimaan date,
    idjournal integer
);


ALTER TABLE piutangpayhistory OWNER TO senuserpg;

--
-- Name: seq_potongan; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_potongan
    START WITH 25
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_potongan OWNER TO senuserpg;

--
-- Name: potongan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE potongan (
    idpotongan integer DEFAULT nextval('seq_potongan'::regclass) NOT NULL,
    idpotongantype integer,
    idamounttype integer,
    idsiklus integer,
    idemployee bigint,
    startdate date,
    enddate date,
    totalpotongan numeric,
    sisapotongan numeric,
    jumlahpotongan numeric,
    userin character varying(20),
    datein timestamp(6) without time zone,
    usermod character varying(20),
    datemod timestamp(6) without time zone,
    jumlahangsuran integer,
    keterangan character varying(225),
    sisaangsuran integer,
    display integer,
    idupload integer
);


ALTER TABLE potongan OWNER TO senuserpg;

--
-- Name: potonganhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE potonganhistory (
    idpotongan integer,
    idprosesgaji bigint,
    datepaid date,
    jumlahpotongan numeric,
    sisapotongan numeric,
    totalpotongan numeric,
    userin character varying(20),
    datein character varying(20),
    sisaangsuran integer,
    month character varying(2),
    year integer,
    idemployee integer
);


ALTER TABLE potonganhistory OWNER TO senuserpg;

--
-- Name: potongantype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE potongantype (
    idpotongantype integer DEFAULT nextval('seq_master'::regclass) NOT NULL,
    namepotongan character varying(50),
    descpotongan character varying(50),
    jenispotongan character varying,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    display integer,
    idcompany integer
);


ALTER TABLE potongantype OWNER TO senuserpg;

--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE product (
    product_id integer NOT NULL,
    product_code character varying(50),
    product_name character varying(75),
    product_desc character varying(150),
    basic_uom integer,
    second_uom integer,
    minimum_stock integer,
    supplier_id integer,
    grade smallint,
    display smallint,
    userin character varying(20),
    datein date,
    usermod character varying(20),
    datemod date,
    idunit integer,
    product_type_id integer,
    brand_id integer,
    thickness_id integer,
    status smallint,
    deleted smallint
);


ALTER TABLE product OWNER TO senuserpg;

--
-- Name: product_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE product_type (
    product_type_id integer NOT NULL,
    display smallint,
    userin character varying(20),
    datein date,
    usermod character varying(20),
    datemod date,
    product_type_name character varying(50),
    product_type_desc character varying(150),
    status smallint,
    deleted smallint
);


ALTER TABLE product_type OWNER TO senuserpg;

--
-- Name: productgrade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE productgrade (
    gradeid integer NOT NULL,
    name character varying(20)
);


ALTER TABLE productgrade OWNER TO senuserpg;

--
-- Name: productmeasurement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE productmeasurement (
    measurement_id integer NOT NULL,
    short_desc character varying(4),
    long_desc character varying(10),
    display smallint,
    userin character varying(20),
    datein date,
    usermod character varying(20),
    datemod date,
    idunit integer,
    deleted smallint,
    status smallint
);


ALTER TABLE productmeasurement OWNER TO senuserpg;

--
-- Name: project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE project (
    project_id integer NOT NULL,
    project_name character varying(150),
    description character varying(255),
    budget double precision,
    expense double precision,
    realization double precision,
    profit double precision,
    status smallint,
    display smallint,
    idunit integer,
    idcustomer integer,
    userin character varying(20),
    datein date,
    usermod character varying(20),
    datemod date,
    startdate date,
    enddate date,
    idtax integer,
    idcurrency integer
);


ALTER TABLE project OWNER TO senuserpg;

--
-- Name: COLUMN project.status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN project.status IS '1:Open 2:Pending 3:On Going 4:Completed 5:Rejected 6.Overdue 7:Cost Overrun';


--
-- Name: seq_prosesgaji; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_prosesgaji
    START WITH 18
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_prosesgaji OWNER TO senuserpg;

--
-- Name: prosesgaji; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE prosesgaji (
    idprosesgaji bigint DEFAULT nextval('seq_prosesgaji'::regclass) NOT NULL,
    idsallary integer,
    idpotongan integer,
    idtunjangan integer,
    jenpph character varying(30),
    totalpotongan numeric,
    totaltunjangan numeric,
    biayajabatan numeric,
    pph21 numeric,
    totalpembayaran numeric,
    userin character varying(30),
    usermod character varying(30),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    bulan character varying(2),
    tahun integer,
    idemployee integer,
    gajipokok double precision,
    idunit integer
);


ALTER TABLE prosesgaji OWNER TO senuserpg;

--
-- Name: prosesgaji_tmp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE prosesgaji_tmp (
    idemployee integer,
    jumlah double precision,
    userin integer,
    idaccountpayroll integer,
    idaccountkas integer,
    idunit integer,
    accnumberpayroll character varying(30)
);


ALTER TABLE prosesgaji_tmp OWNER TO senuserpg;

--
-- Name: COLUMN prosesgaji_tmp.jumlah; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN prosesgaji_tmp.jumlah IS 'tabel temporary untuk penyimpanan hasil proses gaji yang selanjutnya disimpan ke dalam jurnal
';


--
-- Name: seq_purchase; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_purchase
    START WITH 67
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_purchase OWNER TO senuserpg;

--
-- Name: purchase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE purchase (
    idpurchase bigint DEFAULT nextval('seq_purchase'::regclass) NOT NULL,
    idcreditterm bigint,
    idshipping bigint,
    idpurchasetype bigint,
    idpurchasestatus bigint,
    idfrequency integer,
    idjournal bigint,
    idtax integer,
    nopurchase character varying(20),
    name character varying(225),
    payee character varying(225),
    shipaddress character varying(225),
    date date,
    includetax boolean,
    requestdate date,
    freigthcost double precision,
    tax double precision,
    amountdue double precision,
    totalamount double precision,
    paidtoday double precision,
    totalowed double precision,
    balance double precision,
    memo character varying(225),
    isrecuring boolean,
    startdate date,
    recuntildate date,
    recnumtimes integer,
    alertto bigint,
    notifto bigint,
    display integer,
    year integer,
    month character varying(2),
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    idpayment integer,
    notes character varying(225),
    duedate date,
    paiddate date,
    idunit integer,
    idcurrency integer,
    noinvoice character varying(50),
    idsupplier integer,
    subtotal double precision,
    totalpaid double precision
);


ALTER TABLE purchase OWNER TO senuserpg;

--
-- Name: seq_purchaseitem; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_purchaseitem
    START WITH 48
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_purchaseitem OWNER TO senuserpg;

--
-- Name: purchaseitem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE purchaseitem (
    idpurchaseitem bigint DEFAULT nextval('seq_purchaseitem'::regclass) NOT NULL,
    idpurchase bigint,
    idinventory bigint,
    idtax integer,
    itemdesc text,
    qty integer,
    received integer,
    backorder integer,
    price double precision,
    disc double precision,
    total double precision,
    invno character varying(20),
    ratetax double precision,
    tax real,
    beforetax real
);


ALTER TABLE purchaseitem OWNER TO senuserpg;

--
-- Name: purchasestatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE purchasestatus (
    idpurchasestatus bigint NOT NULL,
    status character varying(20)
);


ALTER TABLE purchasestatus OWNER TO senuserpg;

--
-- Name: purchasetype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE purchasetype (
    idpurchasetype bigint NOT NULL,
    namepurchase character varying(20)
);


ALTER TABLE purchasetype OWNER TO senuserpg;

--
-- Name: rack; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE rack (
    rack_id integer NOT NULL,
    rack_name character varying(150),
    rack_type character varying(150),
    rack_desc character varying(150),
    idunit integer,
    display smallint,
    userin character varying(20),
    datein date,
    usermod character varying(20),
    datemod date,
    status smallint,
    deleted smallint
);


ALTER TABLE rack OWNER TO senuserpg;

--
-- Name: seq_receivemoney; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_receivemoney
    START WITH 66
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_receivemoney OWNER TO senuserpg;

--
-- Name: receivemoney; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE receivemoney (
    idreceivemoney bigint DEFAULT nextval('seq_receivemoney'::regclass) NOT NULL,
    idpayment bigint,
    idjournal bigint,
    idtax integer,
    depositaccount bigint,
    payorid bigint,
    notrans character varying(20),
    datetrans date,
    total double precision,
    balance double precision,
    memo character varying(225),
    display integer,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    receivefrom character varying(30),
    tax double precision,
    idunit integer,
    subtotal double precision,
    idreceivemoneyimport integer,
    user_id integer
);


ALTER TABLE receivemoney OWNER TO senuserpg;

--
-- Name: seq_receivemoneyimport; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_receivemoneyimport
    START WITH 19
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_receivemoneyimport OWNER TO senuserpg;

--
-- Name: receivemoneyimport; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE receivemoneyimport (
    idreceivemoneyimport integer DEFAULT nextval('seq_receivemoneyimport'::regclass) NOT NULL,
    filename character varying(50),
    totalamount double precision,
    notrans character varying(50),
    datetrans date,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    idunit integer,
    tipe character varying(10)
);


ALTER TABLE receivemoneyimport OWNER TO senuserpg;

--
-- Name: seq_receivemoneyitem; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_receivemoneyitem
    START WITH 78
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_receivemoneyitem OWNER TO senuserpg;

--
-- Name: receivemoneyitem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE receivemoneyitem (
    idreceivemoneyitem bigint DEFAULT nextval('seq_receivemoneyitem'::regclass) NOT NULL,
    idaccount bigint,
    idreceivemoney bigint,
    amount double precision,
    memo character varying(225),
    ratetax double precision,
    float8 double precision,
    denda double precision,
    datereceive date
);


ALTER TABLE receivemoneyitem OWNER TO senuserpg;

--
-- Name: receivepayment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE receivepayment (
    idreceivepayment integer NOT NULL,
    idcustomer bigint,
    idsales bigint,
    idpayment bigint,
    idjournal bigint,
    nopayment character varying(20),
    depositaccount bigint,
    datepayment date,
    memo character varying(225),
    ampount double precision,
    charge double precision,
    disc double precision,
    balance double precision,
    display integer,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone
);


ALTER TABLE receivepayment OWNER TO senuserpg;

--
-- Name: seq_reconcile; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_reconcile
    START WITH 18
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_reconcile OWNER TO senuserpg;

--
-- Name: reconcile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE reconcile (
    idreconcile bigint DEFAULT nextval('seq_reconcile'::regclass) NOT NULL,
    idaccount bigint,
    idjournal bigint,
    datestatement date,
    newbalance double precision,
    calcbalance double precision,
    outbalance double precision,
    lastdate date,
    servamount double precision,
    servno character varying(20),
    servdate date,
    servtax double precision,
    expenseaccount bigint,
    servmemo character varying(225),
    intamount double precision,
    intno character varying(20),
    intdate date,
    inttax double precision,
    incomeaccount bigint,
    intmemo character varying(225),
    display integer,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    idunit integer,
    accbalance double precision
);


ALTER TABLE reconcile OWNER TO senuserpg;

--
-- Name: seq_registrasihutang; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_registrasihutang
    START WITH 17
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_registrasihutang OWNER TO senuserpg;

--
-- Name: registrasihutang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE registrasihutang (
    idregistrasihutang integer DEFAULT nextval('seq_registrasihutang'::regclass) NOT NULL,
    idunit integer,
    idacchutang integer,
    idacckenahutang integer,
    jumlah double precision,
    sisahutang double precision,
    idjournal integer,
    memo character varying(225),
    userin character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    usermod character varying(20),
    display integer,
    month character varying,
    year integer,
    mulaihutang date,
    jatuhtempo date,
    idsupplier integer
);


ALTER TABLE registrasihutang OWNER TO senuserpg;

--
-- Name: seq_registrasipiutang; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_registrasipiutang
    START WITH 33
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_registrasipiutang OWNER TO senuserpg;

--
-- Name: registrasipiutang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE registrasipiutang (
    idregistrasipiutang integer DEFAULT nextval('seq_registrasipiutang'::regclass) NOT NULL,
    idaccount integer,
    bulan character varying(2),
    tahun integer,
    description character varying(225),
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    display integer,
    jumlah double precision,
    idunit integer,
    sisapiutang double precision,
    idaccountlink integer,
    tglpiutang date,
    idjournal integer,
    idpelanggan integer,
    autodecrease integer
);


ALTER TABLE registrasipiutang OWNER TO senuserpg;

--
-- Name: seq_return; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_return
    START WITH 20
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_return OWNER TO senuserpg;

--
-- Name: return; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE return (
    idreturn bigint DEFAULT nextval('seq_return'::regclass) NOT NULL,
    idsupplier bigint,
    idaccount bigint,
    idreturntype integer,
    noreturn character varying(20),
    date date,
    memo character varying(225),
    payee character varying(225),
    subtotal double precision,
    taxreturn double precision,
    freight double precision,
    totalreturn double precision,
    display integer,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    tglkirim date,
    idunit integer,
    nopo character varying(50),
    note text,
    idjournal integer,
    saldoterhutang real,
    pembayaranberjalan real,
    pengembaliandana real
);


ALTER TABLE return OWNER TO senuserpg;

--
-- Name: returnitem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE returnitem (
    idreturnitem bigint,
    idreturn bigint NOT NULL,
    qtyretur integer,
    price double precision,
    total double precision,
    idinventory integer NOT NULL,
    invno character varying(50),
    cost double precision,
    ratetax double precision,
    returnamount double precision
);


ALTER TABLE returnitem OWNER TO senuserpg;

--
-- Name: returntype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE returntype (
    idreturntype integer NOT NULL,
    namereturn character varying(50)
);


ALTER TABLE returntype OWNER TO senuserpg;

--
-- Name: seq_riwayatpembsiswa; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_riwayatpembsiswa
    START WITH 7
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_riwayatpembsiswa OWNER TO senuserpg;

--
-- Name: riwayatpembsiswa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE riwayatpembsiswa (
    idriwayatpemb integer DEFAULT nextval('seq_riwayatpembsiswa'::regclass) NOT NULL,
    idsiswa bigint,
    bulan character varying(2),
    tahun integer,
    jatuhtempo date,
    tglbayar date,
    jumlahbayar double precision,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    idaccount integer
);


ALTER TABLE riwayatpembsiswa OWNER TO senuserpg;

--
-- Name: sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sales (
    idsales bigint NOT NULL,
    idpayment bigint,
    idemployee bigint,
    idtax integer,
    idjournal bigint,
    idcustomer bigint,
    noinvoice character varying(20),
    date date,
    nopo character varying(30),
    shipto text,
    subtotal double precision,
    freight double precision,
    tax double precision,
    disc double precision,
    totalamount double precision,
    paidtoday double precision,
    balance double precision,
    comments text,
    isrecuring boolean,
    startdate date,
    recuntildate date,
    recnumtimes integer,
    alertto integer,
    notifto integer,
    display integer,
    userin character varying(20),
    usermod character varying(20),
    datein date,
    datemod date
);


ALTER TABLE sales OWNER TO senuserpg;

--
-- Name: salesitem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE salesitem (
    idsalesitem bigint NOT NULL,
    idinventory bigint,
    idsales bigint,
    qty integer,
    price double precision,
    disc double precision,
    total double precision
);


ALTER TABLE salesitem OWNER TO senuserpg;

--
-- Name: seq_sallary; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_sallary
    START WITH 8
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_sallary OWNER TO senuserpg;

--
-- Name: sallary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sallary (
    idsallary integer DEFAULT nextval('seq_sallary'::regclass) NOT NULL,
    idemployee bigint,
    basicsallary numeric,
    nosk character varying(50),
    tglmulai date,
    tglakhir date,
    notes character varying(222),
    userin character varying(20),
    datein timestamp(6) without time zone,
    usermod character varying(20),
    datemod timestamp(6) without time zone,
    jabatan character varying(100)
);


ALTER TABLE sallary OWNER TO senuserpg;

--
-- Name: scheduletype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE scheduletype (
    idscheduletype bigint NOT NULL,
    schname character varying(50)
);


ALTER TABLE scheduletype OWNER TO senuserpg;

--
-- Name: seq_amounttype; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_amounttype
    START WITH 7
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_amounttype OWNER TO senuserpg;

--
-- Name: seq_asuransipayhistory; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_asuransipayhistory
    START WITH 67
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_asuransipayhistory OWNER TO senuserpg;

--
-- Name: seq_inventoryadjitem; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_inventoryadjitem
    START WITH 11
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_inventoryadjitem OWNER TO senuserpg;

--
-- Name: seq_location; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_location
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_location OWNER TO senuserpg;

--
-- Name: seq_payroll; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_payroll
    START WITH 55
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_payroll OWNER TO senuserpg;

--
-- Name: seq_pelanggan; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_pelanggan
    START WITH 9
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_pelanggan OWNER TO senuserpg;

--
-- Name: seq_siswa; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_siswa
    START WITH 548
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_siswa OWNER TO senuserpg;

--
-- Name: seq_siswapembayaran; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_siswapembayaran
    START WITH 43
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_siswapembayaran OWNER TO senuserpg;

--
-- Name: seq_spendmoney; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_spendmoney
    START WITH 48
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_spendmoney OWNER TO senuserpg;

--
-- Name: seq_spendmoneyitem; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_spendmoneyitem
    START WITH 45
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_spendmoneyitem OWNER TO senuserpg;

--
-- Name: seq_supplier; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_supplier
    START WITH 21
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_supplier OWNER TO senuserpg;

--
-- Name: seq_sys_menu; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_sys_menu
    START WITH 150
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_sys_menu OWNER TO senuserpg;

--
-- Name: seq_tambahangaji; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_tambahangaji
    START WITH 11
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_tambahangaji OWNER TO senuserpg;

--
-- Name: seq_tambahangajitype; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_tambahangajitype
    START WITH 10
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_tambahangajitype OWNER TO senuserpg;

--
-- Name: seq_tax; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_tax
    START WITH 19
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_tax OWNER TO senuserpg;

--
-- Name: seq_thr; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_thr
    START WITH 9
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_thr OWNER TO senuserpg;

--
-- Name: seq_transferkas; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_transferkas
    START WITH 12
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_transferkas OWNER TO senuserpg;

--
-- Name: seq_tunjangan; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_tunjangan
    START WITH 39
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_tunjangan OWNER TO senuserpg;

--
-- Name: seq_unit; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_unit
    START WITH 22
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_unit OWNER TO senuserpg;

--
-- Name: seq_upload; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_upload
    START WITH 22
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_upload OWNER TO senuserpg;

--
-- Name: seq_user_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seq_user_id
    START WITH 20
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seq_user_id OWNER TO senuserpg;

--
-- Name: sequence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sequence (
    idunit integer,
    sequence integer
);


ALTER TABLE sequence OWNER TO senuserpg;

--
-- Name: sextype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sextype (
    idsex integer NOT NULL,
    name character varying(20)
);


ALTER TABLE sextype OWNER TO senuserpg;

--
-- Name: shipping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE shipping (
    idshipping bigint NOT NULL,
    nameshipping character varying(30),
    description character varying(225),
    userin character varying(30),
    usermod character varying(30),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone
);


ALTER TABLE shipping OWNER TO senuserpg;

--
-- Name: siklus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE siklus (
    idsiklus integer NOT NULL,
    namasiklus character varying(20)
);


ALTER TABLE siklus OWNER TO senuserpg;

--
-- Name: siswa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE siswa (
    idsiswa bigint DEFAULT nextval('seq_siswa'::regclass) NOT NULL,
    idunit bigint,
    namasiswa character varying(200),
    namaibu character varying(200),
    namaayah character varying(200),
    alamat text,
    kota character varying(100),
    phone character varying(100),
    tglmasuk date,
    tglkeluar date,
    tahunajaranmasuk character varying(32),
    foto character varying(100),
    display smallint,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    noinduk character varying(50),
    kelas character varying(50)
);


ALTER TABLE siswa OWNER TO senuserpg;

--
-- Name: siswapembayaran; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE siswapembayaran (
    idsiswapembayaran integer DEFAULT nextval('seq_siswapembayaran'::regclass) NOT NULL,
    idsiswa integer,
    idaccountbayar integer,
    idjournal integer,
    tglbayar date,
    bulanpembayaran character varying(2),
    tahunpembayaran integer,
    bulantahunpembayaran character varying(50),
    bulanbayar character varying(2),
    tahunbayar integer,
    jumlah double precision,
    userin character varying(20),
    datein timestamp(6) without time zone,
    usermod character varying(20),
    datemod timestamp(6) without time zone,
    jatuhtempo date,
    haribayar character varying(2),
    denda double precision,
    iduser integer,
    receivefrom character varying(20)
);


ALTER TABLE siswapembayaran OWNER TO senuserpg;

--
-- Name: spendmoney; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE spendmoney (
    idspendmoney bigint NOT NULL,
    idtax integer,
    idjournal bigint,
    idaccount bigint,
    totalpaid double precision,
    tax double precision,
    balance double precision,
    display integer,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    idunit integer,
    subtotal double precision,
    notrans character varying(20),
    datetrans date,
    memo character varying(225),
    month character varying(2),
    year integer,
    spendfrom character varying(50),
    idimport integer,
    depositaccount integer,
    total double precision
);


ALTER TABLE spendmoney OWNER TO senuserpg;

--
-- Name: spendmoneyitem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE spendmoneyitem (
    idspendmoneyitem bigint DEFAULT nextval('seq_spendmoneyitem'::regclass) NOT NULL,
    idspendmoney bigint,
    idaccount bigint,
    amount double precision,
    memo character varying(225),
    ratetax double precision
);


ALTER TABLE spendmoneyitem OWNER TO senuserpg;

--
-- Name: supplier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE supplier (
    idsupplier bigint NOT NULL,
    idpayment bigint,
    idshipping bigint,
    code character varying(50),
    namesupplier character varying(50),
    companyaddress text,
    companyaddress2 text,
    companyaddress3 text,
    companyaddress4 text,
    shipaddress character varying(225),
    billaddress character varying(225),
    telephone character varying(30),
    handphone character varying(30),
    fax character varying(30),
    email character varying(30),
    website character varying(30),
    city character varying(50),
    state character varying(50),
    postcode character varying(10),
    country character varying(15),
    highestpo double precision,
    avgdaypay integer,
    lastpayment timestamp(6) without time zone,
    lastpurchase double precision,
    expenseaccount bigint,
    notes character varying(225),
    display smallint,
    userin character varying(30),
    usermod character varying(30),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    idcompany integer,
    supplier_type_id integer,
    status smallint,
    deleted smallint
);


ALTER TABLE supplier OWNER TO senuserpg;

--
-- Name: supplier_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE supplier_type (
    supplier_type_id integer NOT NULL,
    idunit integer,
    supplier_type_name character varying(150),
    supplier_type_desc character varying(225),
    display smallint,
    userin integer,
    datein timestamp(6) without time zone,
    usermod integer,
    datemod timestamp(6) without time zone,
    status smallint,
    deleted smallint
);


ALTER TABLE supplier_type OWNER TO senuserpg;

--
-- Name: sys_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sys_group (
    group_id integer NOT NULL,
    group_name character varying(20),
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    display integer,
    description character varying(225)
);


ALTER TABLE sys_group OWNER TO senuserpg;

--
-- Name: sys_group_menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sys_group_menu (
    sys_menu_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE sys_group_menu OWNER TO senuserpg;

--
-- Name: sys_menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sys_menu (
    sys_menu_id integer DEFAULT nextval('seq_sys_menu'::regclass) NOT NULL,
    menu_name character varying(200),
    menu_link character varying(225),
    parent integer,
    sort integer,
    status integer,
    icon character varying(100),
    display integer,
    description character varying(225),
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone
);


ALTER TABLE sys_menu OWNER TO senuserpg;

--
-- Name: sys_menu_unit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sys_menu_unit (
    sys_menu_id integer,
    idunit integer
);


ALTER TABLE sys_menu_unit OWNER TO senuserpg;

--
-- Name: sys_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sys_user (
    user_id integer DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
    username character varying(20),
    password character varying(224),
    email character varying(20),
    laslogin timestamp(6) without time zone,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    group_id integer,
    realname character varying(30),
    idunitbak integer,
    iduserparent integer,
    display integer,
    clientid integer,
    idcompany integer
);


ALTER TABLE sys_user OWNER TO senuserpg;

--
-- Name: tambahangaji; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tambahangaji (
    idtambahangaji integer DEFAULT nextval('seq_tambahangaji'::regclass) NOT NULL,
    idemployee bigint,
    idtambahangajitype integer NOT NULL,
    idsiklus integer,
    namatambahan character varying(100),
    startdate date,
    enddate date,
    jumlah numeric,
    display integer,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    keterangan character varying(225)
);


ALTER TABLE tambahangaji OWNER TO senuserpg;

--
-- Name: tambahangajihistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tambahangajihistory (
    idtambahangaji integer,
    idpayroll bigint,
    datepaid date,
    userin character varying(20),
    datein timestamp(6) without time zone,
    month character varying(2),
    year integer,
    jumlah double precision,
    idemployee integer
);


ALTER TABLE tambahangajihistory OWNER TO senuserpg;

--
-- Name: tambahangajitype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tambahangajitype (
    idtambahangajitype integer DEFAULT nextval('seq_tambahangajitype'::regclass) NOT NULL,
    idunit bigint DEFAULT nextval('seq_unit'::regclass),
    tambahantype character varying(50),
    deskripsi character varying(200),
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    display integer
);


ALTER TABLE tambahangajitype OWNER TO senuserpg;

--
-- Name: tax; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tax (
    idtax integer DEFAULT nextval('seq_tax'::regclass) NOT NULL,
    idtaxtype integer,
    code character varying(20),
    nametax character varying(50),
    description character varying(225),
    rate double precision,
    acccollectedtax bigint,
    acctaxpaid bigint,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    display integer,
    idcompany integer
);


ALTER TABLE tax OWNER TO senuserpg;

--
-- Name: taxhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE taxhistory (
    idtax integer NOT NULL,
    taxval real,
    rate real,
    datein timestamp(6) without time zone,
    idpurchase integer,
    idjournal integer NOT NULL,
    type character varying(20)
);


ALTER TABLE taxhistory OWNER TO senuserpg;

--
-- Name: taxlinkunit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE taxlinkunit (
    idtax integer,
    idunit integer,
    acccollectedtax integer,
    acctaxpaid integer
);


ALTER TABLE taxlinkunit OWNER TO senuserpg;

--
-- Name: taxtype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE taxtype (
    idtaxtype integer NOT NULL,
    nametypetax character varying(40),
    description character varying(225)
);


ALTER TABLE taxtype OWNER TO senuserpg;

--
-- Name: thickness; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE thickness (
    thickness_id integer NOT NULL,
    item_thickness_tct double precision,
    item_thickness_bmt double precision,
    idunit integer,
    display smallint,
    userin character varying(20),
    datein date,
    usermod character varying(20),
    datemod date,
    status smallint,
    deleted smallint
);


ALTER TABLE thickness OWNER TO senuserpg;

--
-- Name: thr; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE thr (
    idthr integer NOT NULL,
    tglthr date,
    idjournal integer,
    month character varying(2),
    year integer,
    keterangan character varying(225),
    userin character varying(20),
    datein timestamp(6) without time zone,
    idunit integer,
    totalthr double precision
);


ALTER TABLE thr OWNER TO senuserpg;

--
-- Name: thrlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE thrlist (
    idthr integer NOT NULL,
    idemployee integer NOT NULL,
    pengali integer,
    totalpendapatan double precision,
    masakerja integer,
    jumlahthr double precision,
    thrtambahan double precision,
    totalthr double precision,
    month character varying(2) NOT NULL,
    year integer NOT NULL,
    keterangan character varying(225),
    kehadiranjam integer,
    userid integer
);


ALTER TABLE thrlist OWNER TO senuserpg;

--
-- Name: thrlisttmp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE thrlisttmp (
    idemployee integer NOT NULL,
    pengali integer,
    totalpendapatan double precision,
    masakerja integer,
    jumlahthr double precision,
    thrtambahan double precision,
    totalthr double precision,
    month character varying(2) NOT NULL,
    year integer NOT NULL,
    userid integer,
    keterangan character varying(225),
    kehadiranjam integer
);


ALTER TABLE thrlisttmp OWNER TO senuserpg;

--
-- Name: tmpdepresiasi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tmpdepresiasi (
    iddepreciation integer,
    akumpenyusutaccount integer,
    depresiasi integer,
    bebanperbulan double precision,
    idunit integer,
    idinventory integer
);


ALTER TABLE tmpdepresiasi OWNER TO senuserpg;

--
-- Name: tmppurchase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tmppurchase (
    idinventory integer,
    total real,
    idunit integer NOT NULL,
    datein timestamp(6) without time zone,
    assetaccount integer NOT NULL,
    userin character varying NOT NULL,
    idjournal integer NOT NULL,
    idtax integer,
    tax real
);


ALTER TABLE tmppurchase OWNER TO senuserpg;

--
-- Name: tmptax; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tmptax (
    idtax integer NOT NULL,
    tax real,
    idjournal integer NOT NULL,
    idunit integer NOT NULL
);


ALTER TABLE tmptax OWNER TO senuserpg;

--
-- Name: transferkas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE transferkas (
    idtransferkas integer DEFAULT nextval('seq_transferkas'::regclass) NOT NULL,
    idaccountsumber integer,
    idaccounttujuan integer,
    idunit integer,
    memo character varying(225),
    tanggal date,
    nominal double precision,
    userin character varying(20),
    datein timestamp(6) without time zone,
    usermod character varying(20),
    datemod timestamp(6) without time zone,
    idjournal integer
);


ALTER TABLE transferkas OWNER TO senuserpg;

--
-- Name: tunjangan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tunjangan (
    idtunjangan integer DEFAULT nextval('seq_tunjangan'::regclass) NOT NULL,
    idtunjtype integer,
    idamounttype integer,
    idemployee bigint,
    idsiklus integer,
    namatunjangan character varying(100),
    startdate date,
    enddate date,
    jumlah numeric,
    display integer,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    persen double precision,
    jenisnilai character varying(20),
    idupload integer
);


ALTER TABLE tunjangan OWNER TO senuserpg;

--
-- Name: tunjanganhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tunjanganhistory (
    idtunjangan integer,
    idprosesgaji bigint,
    datepaid date,
    userin character varying(20),
    datein timestamp(6) without time zone,
    month character varying(2),
    year integer,
    jumlah double precision,
    idemployee integer
);


ALTER TABLE tunjanganhistory OWNER TO senuserpg;

--
-- Name: tunjangantype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tunjangantype (
    idtunjtype integer DEFAULT nextval('seq_master'::regclass) NOT NULL,
    idunit bigint DEFAULT nextval('seq_unit'::regclass),
    nametunj character varying(50),
    desctunj character varying(200),
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    display integer,
    idcompany integer
);


ALTER TABLE tunjangantype OWNER TO senuserpg;

--
-- Name: unit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE unit (
    idunit bigint DEFAULT nextval('seq_unit'::regclass) NOT NULL,
    namaunit character varying(50),
    deskripsi character varying(225),
    alamat character varying(225),
    display smallint,
    userin character varying(20),
    usermod character varying(20),
    datein timestamp(6) without time zone,
    datemod timestamp(6) without time zone,
    alamat2 character varying(225),
    alamat3 character varying(225),
    telp character varying(225),
    fax character varying(225),
    email character varying(225),
    website character varying(225),
    country character varying(225),
    npwp character varying(225),
    curfinanceyear integer,
    lastmonthfinanceyear character varying(225),
    conversionmonth character varying(225),
    numaccperiod integer,
    curfinancemonth character varying(2),
    startfinancemonth character varying(2),
    startfinanceyear integer,
    idbussinestype integer,
    logo character varying(225),
    idcompany integer,
    dateformat character varying(20),
    is_taxable smallint
);


ALTER TABLE unit OWNER TO senuserpg;

--
-- Name: unit_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE unit_item (
    unit_item_id integer NOT NULL,
    unit_name character varying(120)
);


ALTER TABLE unit_item OWNER TO senuserpg;

--
-- Name: upload; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE upload (
    idupload integer NOT NULL,
    orig_name character varying(30),
    userin character varying(20),
    datein timestamp(6) without time zone,
    type character varying
);


ALTER TABLE upload OWNER TO senuserpg;

--
-- Name: userunit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE userunit (
    user_id integer NOT NULL,
    idunit bigint NOT NULL
);


ALTER TABLE userunit OWNER TO senuserpg;

--
-- Name: v_acclinkinventory; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW v_acclinkinventory AS
 SELECT a.idinventory,
    b.idunit,
    a.assetaccount,
    a.akumpenyusutaccount,
    a.depresiasiaccount,
    b.namaunit,
        CASE
            WHEN ((c.accname)::text <> ''::text) THEN c.accname
            ELSE 'Belum Terdefinisi'::character varying
        END AS accasset,
        CASE
            WHEN ((d.accname)::text <> ''::text) THEN d.accname
            ELSE 'Belum Terdefinisi'::character varying
        END AS akumpenyusut,
        CASE
            WHEN ((e.accname)::text <> ''::text) THEN e.accname
            ELSE 'Belum Terdefinisi'::character varying
        END AS depresiasi
   FROM ((((unit b
     LEFT JOIN inventoryunit a ON ((a.idunit = b.idunit)))
     LEFT JOIN account c ON ((a.assetaccount = c.idaccount)))
     LEFT JOIN account d ON ((a.akumpenyusutaccount = d.idaccount)))
     LEFT JOIN account e ON ((a.depresiasiaccount = e.idaccount)))
  WHERE (b.idunit <> 99);


ALTER TABLE v_acclinkinventory OWNER TO senuserpg;

--
-- Name: v_acclinkinventory2; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW v_acclinkinventory2 AS
 SELECT a.idinventory,
    a.idunit,
    a.assetaccount,
    a.akumpenyusutaccount,
    a.depresiasiaccount,
    b.namaunit,
        CASE
            WHEN ((c.accname)::text <> ''::text) THEN c.accname
            ELSE 'Belum Terdefinisi'::character varying
        END AS accasset,
        CASE
            WHEN ((d.accname)::text <> ''::text) THEN d.accname
            ELSE 'Belum Terdefinisi'::character varying
        END AS akumpenyusut,
        CASE
            WHEN ((e.accname)::text <> ''::text) THEN e.accname
            ELSE 'Belum Terdefinisi'::character varying
        END AS depresiasi
   FROM ((((unit b
     LEFT JOIN inventoryunit a ON ((a.idunit = b.idunit)))
     LEFT JOIN account c ON ((a.assetaccount = c.idaccount)))
     LEFT JOIN account d ON ((a.akumpenyusutaccount = d.idaccount)))
     LEFT JOIN account e ON ((a.depresiasiaccount = e.idaccount)))
  WHERE (b.idunit <> 99);


ALTER TABLE v_acclinkinventory2 OWNER TO senuserpg;

--
-- Name: v_acclinkinventory3; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW v_acclinkinventory3 AS
 SELECT a.idinventory,
    a.idunit,
    a.assetaccount,
    a.akumpenyusutaccount,
    a.depresiasiaccount,
    b.namaunit,
        CASE
            WHEN ((c.accname)::text <> ''::text) THEN c.accname
            ELSE 'Belum Terdefinisi'::character varying
        END AS accasset,
        CASE
            WHEN ((d.accname)::text <> ''::text) THEN d.accname
            ELSE 'Belum Terdefinisi'::character varying
        END AS akumpenyusut,
        CASE
            WHEN ((e.accname)::text <> ''::text) THEN e.accname
            ELSE 'Belum Terdefinisi'::character varying
        END AS depresiasi
   FROM ((((unit b
     LEFT JOIN inventoryunit a ON ((a.idunit = b.idunit)))
     LEFT JOIN account c ON (((a.assetaccount = c.idaccount) AND (a.idunit = c.idunit))))
     LEFT JOIN account d ON (((a.akumpenyusutaccount = d.idaccount) AND (a.idunit = d.idunit))))
     LEFT JOIN account e ON (((a.depresiasiaccount = e.idaccount) AND (a.idunit = e.idunit))))
  WHERE (b.idunit <> 99);


ALTER TABLE v_acclinkinventory3 OWNER TO senuserpg;

--
-- Name: v_inventory; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW v_inventory AS
 SELECT d.idunit,
    d.idinventory,
    a.invno,
    a.nameinventory,
    a.description,
    a.isinventory,
    a.issell,
    a.isbuy,
    a.cosaccount,
    a.incomeaccount,
    d.assetaccount,
    a.qtystock,
    a.images,
    a.cost,
    a.unitmeasure,
    a.numperunit,
    a.minstock,
    a.idprimarysupplier,
    a.sellingprice,
    a.idselingtax,
    a.unitmeasuresell,
    a.numperunitsell,
    a.notes,
    a.display,
    b.namesupplier,
    a.yearbuy,
    a.monthbuy,
    a.datebuy,
    c.namecat,
    sum((a.cost * (a.qtystock)::double precision)) AS saldopersediaan
   FROM (((inventory a
     LEFT JOIN supplier b ON ((a.idprimarysupplier = b.idsupplier)))
     JOIN inventorycat c ON ((a.idinventorycat = c.idinventorycat)))
     JOIN inventoryunit d ON ((a.idinventory = d.idinventory)))
  GROUP BY d.idunit, d.idinventory, a.invno, a.nameinventory, a.description, a.isinventory, a.issell, a.isbuy, a.cosaccount, a.incomeaccount, d.assetaccount, a.qtystock, a.images, a.cost, a.unitmeasure, a.numperunit, a.minstock, a.idprimarysupplier, a.sellingprice, a.idselingtax, a.unitmeasuresell, a.numperunitsell, a.notes, a.display, b.namesupplier, a.yearbuy, a.monthbuy, a.datebuy, c.namecat;


ALTER TABLE v_inventory OWNER TO senuserpg;

--
-- Name: v_tunjanganpayroll; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW v_tunjanganpayroll AS
 SELECT a.display,
    a.idtunjangan,
    a.idemployee,
    b.nametunj AS namatunjangan,
    a.persen,
    a.jenisnilai,
    a.startdate,
    a.enddate,
    b.nametunj,
    c.name AS amounttype,
    d.namasiklus,
        CASE
            WHEN ((a.jumlah)::double precision IS NULL) THEN a.persen
            ELSE (a.jumlah)::double precision
        END AS jumlah,
    a.idtunjtype,
    a.idamounttype,
    a.idsiklus
   FROM (((tunjangan a
     JOIN tunjangantype b ON ((a.idtunjtype = b.idtunjtype)))
     LEFT JOIN amounttype c ON ((a.idamounttype = c.idamounttype)))
     JOIN siklus d ON ((a.idsiklus = d.idsiklus)));


ALTER TABLE v_tunjanganpayroll OWNER TO senuserpg;

--
-- Name: v_tunjanganpayroll-bak; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW "v_tunjanganpayroll-bak" AS
 SELECT a.idtunjangan,
    a.idemployee,
    b.nametunj AS namatunjangan,
    a.persen,
    a.jenisnilai,
    a.startdate,
    a.enddate,
    b.nametunj,
    c.name AS amounttype,
    d.namasiklus,
        CASE
            WHEN ((a.jumlah)::double precision IS NULL) THEN a.persen
            ELSE (a.jumlah)::double precision
        END AS jumlah,
    a.idtunjtype,
    a.idamounttype,
    a.idsiklus
   FROM (((tunjangan a
     JOIN tunjangantype b ON ((a.idtunjtype = b.idtunjtype)))
     LEFT JOIN amounttype c ON ((a.idamounttype = c.idamounttype)))
     JOIN siklus d ON ((a.idsiklus = d.idsiklus)));


ALTER TABLE "v_tunjanganpayroll-bak" OWNER TO senuserpg;

--
-- Name: warehouse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE warehouse (
    warehouse_id integer NOT NULL,
    warehouse_address character varying(150),
    warehouse_cogs_standard character varying(150),
    warehouse_type character varying(100),
    warehouse_desc character varying(150),
    idunit integer,
    display smallint,
    userin character varying(20),
    datein date,
    usermod character varying(20),
    datemod date,
    warehouse_code character varying,
    status smallint,
    deleted smallint
);


ALTER TABLE warehouse OWNER TO senuserpg;

--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (NULL, 1, 1, NULL, 0, '1-0000', 'Aktiva', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, true, 99, NULL, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (1, 2, 2, NULL, 1, '1-0100', 'Cheque Account', NULL, 0, NULL, '', NULL, 'admin', NULL, '2014-08-25 15:08:53', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (1, 3, 2, NULL, 1, '1-0150', 'Undeposited Funds', NULL, 0, NULL, '', NULL, 'admin', NULL, '2014-08-25 15:08:20', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (11, 4, 3, NULL, 1, '1-0200', 'Trade Debitors', NULL, 0, NULL, 'deskripsi', NULL, 'admin', NULL, '2014-08-25 08:08:10', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (12, 47, 4, NULL, 45, '4-0002', 'Pendapatan 2', NULL, 0, NULL, '', 'systemwizard', 'staff', '2015-04-22 06:04:08', '2017-03-08 19:03:38', true, 12, 47, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (17, 5, 1, NULL, 1, '1-1000', 'Aktiva Lancar', NULL, 0, NULL, '', NULL, 'admin', NULL, '2014-08-25 15:08:47', true, 99, NULL, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (19, 6, 2, NULL, 5, '1-1100', 'Kas Utama', NULL, 0, NULL, '', NULL, 'admin', NULL, '2014-09-22 23:09:44', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (19, 7, 2, NULL, 5, '1-1200', 'Kas Kecil', NULL, 0, NULL, '', NULL, 'admin', NULL, '2014-08-25 15:08:28', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (12, 752, 4, NULL, 45, '4-0003', 'Software Development', NULL, 0, 1, '', 'staff', 'staff', '2017-01-26 17:01:30', '2017-01-26 18:01:37', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (1, 8, 1, NULL, 5, '1-1300', 'Bank', NULL, 0, NULL, '', NULL, 'admin', NULL, '2014-09-22 22:09:12', true, 99, NULL, 1, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (1, 9, 2, NULL, 8, '1-1310', 'Bank BCA', NULL, 0, NULL, 'Bank BCA', NULL, 'admin', NULL, '2014-08-25 15:08:23', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (1, 10, 2, NULL, 8, '1-1320', 'Bank Mandiri', NULL, 0, NULL, '', NULL, 'admin', NULL, '2014-08-25 15:08:01', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (2, 18, 1, NULL, 5, '1-1400', 'Piutang Usaha', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 15:08:39', '2014-08-25 15:08:39', true, 99, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (3, 37, 2, NULL, 35, '2-1220', 'PPN Keluaran', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 37, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (3, 19, 1, NULL, 5, '1-1500', 'Persediaan barang dagang', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 15:08:14', '2014-08-25 15:08:35', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 38, 2, NULL, 28, '2-2000', 'Hutang Jangka Panjang', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 38, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (3, 20, 1, NULL, 5, '1-1600', 'Perlengkapan Kantor', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 15:08:56', '2014-08-25 15:08:56', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (9, 39, 2, NULL, 38, '2-2100', 'Hutang Bank BCA', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 39, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (17, 21, 1, NULL, 5, '1-1700', 'Biaya Dibayar Dimuka', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 15:08:05', '2014-08-25 15:08:05', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (11, 40, 3, NULL, 0, '3-0000', 'Modal', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 40, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (3, 22, 1, NULL, 21, '1-1710', 'Uang muka pembelian', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 15:08:39', '2014-08-25 15:08:39', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (11, 42, 3, NULL, 40, '3-2000', 'Laba Ditahan', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 42, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (3, 23, 1, NULL, 21, '1-1720', 'Sewa Dibayar Dimuka', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 15:08:03', '2014-08-25 15:08:03', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (11, 43, 3, NULL, 40, '3-2200', 'Laba Periode Berjalan', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 43, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (17, 24, 1, NULL, 1, '1-2000', 'Aktiva Tetap', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 15:08:31', '2014-08-25 15:08:25', true, 99, NULL, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (4, 25, 1, NULL, 24, '1-2100', 'Peralatan Kantor', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 15:08:08', '2014-08-25 15:08:08', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (11, 44, 3, NULL, 40, '3-9999', 'Selisih Pembukuan', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 44, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (4, 26, 1, NULL, 24, '1-2110', 'Akum. Penyusutan Peralatan', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 15:08:36', '2014-08-25 15:08:36', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (12, 45, 4, NULL, 0, '4-0000', 'Pendapatan', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 45, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (4, 27, 1, NULL, 24, '1-2210', 'Akum. Penyusutan Kendaraan', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 15:08:01', '2014-08-25 15:08:01', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (13, 49, 5, NULL, 0, '5-0000', 'Harga Pokok', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 49, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 28, 2, NULL, 0, '2-0000', 'Hutang', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 16:08:09', '2014-08-25 16:08:09', true, 99, NULL, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (13, 51, 5, NULL, 49, '5-1100', 'Potongan Pembelian', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 51, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 29, 2, NULL, 28, '2-0200', 'Trade Creditors', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 16:08:55', '2014-08-25 16:08:55', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 53, 6, NULL, 0, '6-0000', 'Biaya-biaya', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 53, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 30, 2, NULL, 28, '2-1000', 'Hutang Lancar', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 16:08:14', '2014-08-25 16:08:14', true, 99, NULL, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (10, 31, 2, NULL, 28, '2-0300', 'Hutang Usaha', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-25 16:08:22', '2014-08-25 16:08:22', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 32, 2, NULL, 30, '2-1140', 'PPh Pasal 22', NULL, 0, NULL, 'Pajak Penghasilan atas Pembelian Barang Mewah', 'admin', 'admin', '2014-08-26 18:08:44', '2014-08-26 18:08:44', true, 99, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 56, 6, NULL, 53, '6-1200', 'Gaji Pengajar', NULL, 0, 1, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 56, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 33, 2, NULL, 30, '2-1110', 'Pendapatan Diterima Dimuka', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 18:08:35', '2014-08-26 18:08:35', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 57, 6, NULL, 53, '6-1101', 'Biaya Pemasaran', NULL, 0, 1, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 57, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 34, 2, NULL, 30, '2-1120', 'Barang Diterima Dimuka', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 18:08:34', '2014-08-26 18:08:34', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 58, 6, NULL, 53, '6-2000', 'Beban Kantor', NULL, 0, NULL, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 07:04:37', true, 12, 58, 1, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 35, 2, NULL, 30, '2-1200', 'Hutang PPN', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 18:08:11', '2014-08-26 18:08:11', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 60, 6, NULL, 58, '6-2002', 'THR Karyawan', NULL, 0, NULL, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 07:04:25', true, 12, 60, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (3, 36, 2, NULL, 35, '2-1210', 'PPN Masukan', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 18:08:44', '2014-08-26 18:08:44', true, 99, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 61, 6, NULL, 58, '6-2003', 'Listrik', NULL, 0, NULL, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 07:04:47', true, 12, 61, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (3, 37, 2, NULL, 35, '2-1220', 'PPN Keluaran', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 18:08:25', '2014-08-26 18:08:25', true, 99, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 38, 2, NULL, 28, '2-2000', 'Hutang Jangka Panjang', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 19:08:15', '2014-08-26 19:08:15', true, 99, NULL, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (9, 39, 2, NULL, 38, '2-2100', 'Hutang Bank BCA', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 19:08:06', '2014-08-26 19:08:06', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (11, 40, 3, NULL, 0, '3-0000', 'Modal', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 19:08:55', '2014-08-26 19:08:55', true, 99, NULL, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (11, 41, 3, NULL, 40, '3-1000', 'Modal Usaha', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 19:08:05', '2014-08-26 19:08:43', true, 99, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (11, 42, 3, NULL, 40, '3-2000', 'Laba Ditahan', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 19:08:29', '2014-08-26 19:08:06', true, 99, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (11, 43, 3, NULL, 40, '3-2200', 'Laba Periode Berjalan', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 19:08:56', '2014-08-26 19:08:56', true, 99, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (11, 44, 3, NULL, 40, '3-9999', 'Selisih Pembukuan', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 19:08:23', '2014-08-26 19:08:23', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (12, 45, 4, NULL, 0, '4-0000', 'Pendapatan', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 19:08:07', '2014-08-26 19:08:49', true, 99, NULL, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (12, 46, 4, NULL, 45, '4-1000', 'Penjualan', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 19:08:04', '2014-08-26 19:08:04', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (12, 47, 4, NULL, 45, '4-1100', 'Potongan Penjualan', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 19:08:30', '2014-08-26 19:08:30', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (12, 48, 4, NULL, 45, '4-1200', 'Pendapatan Jasa Angkut', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 19:08:57', '2014-08-26 19:08:57', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (13, 49, 5, NULL, 0, '5-0000', 'Harga Pokok', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 20:08:54', '2014-08-26 20:08:54', true, 99, NULL, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (13, 50, 5, NULL, 49, '5-1000', 'Harga Pokok Barang Dagang', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 20:08:14', '2014-08-26 20:08:14', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (13, 51, 5, NULL, 49, '5-1100', 'Potongan Pembelian', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 20:08:39', '2014-08-26 20:08:39', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (13, 52, 5, NULL, 49, '5-1200', 'Biaya Angkut Pembelian', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 20:08:03', '2014-08-26 20:08:03', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 53, 6, NULL, 0, '6-0000', 'Biaya-biaya', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 20:08:07', '2014-08-26 20:08:07', true, 99, NULL, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 55, 6, NULL, 53, '6-1100', 'Gaji Karyawan', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 20:08:35', '2014-08-26 20:08:35', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 56, 6, NULL, 53, '6-1200', 'Gaji Pengajar', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 20:08:55', '2014-08-26 20:08:55', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 57, 6, NULL, 53, '6-1101', 'Biaya Pemasaran', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 20:08:34', '2014-08-26 20:08:34', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (15, 703, 8, NULL, 0, '9-0000', 'Biaya-biaya lain', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 99, NULL, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 58, 6, NULL, 53, '6-2000', 'Biaya Administrasi dan Umum', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 20:08:04', '2014-08-26 20:08:04', true, 99, NULL, 1, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 59, 6, NULL, 58, '6-2101', 'Biaya listrik, air dan telephone', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 20:08:10', '2014-08-26 21:08:17', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 60, 6, NULL, 58, '6-2102', 'Biaya Transportasi', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 20:08:44', '2014-08-26 21:08:27', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 61, 6, NULL, 58, '6-2103', 'Biaya Sewa', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 20:08:02', '2014-08-26 21:08:36', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 62, 6, NULL, 58, '6-2104', 'Biaya Asuransi', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 21:08:01', '2014-08-26 21:08:46', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 63, 6, NULL, 58, '6-2105', 'Biaya Perlengkapan Kantor', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 21:08:16', '2014-08-26 21:08:16', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 64, 6, NULL, 58, '6-2106', 'Penyusutan Peralatan', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 21:08:49', '2014-08-26 21:08:49', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 65, 6, NULL, 58, '6-2107', 'Penyusutan Kendaraan', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 21:08:10', '2014-08-26 21:08:10', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (16, 66, 7, NULL, 0, '8-0000', 'Pendapatan Lain-lain', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 21:08:50', '2014-08-26 21:08:50', true, 99, NULL, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (16, 67, 7, NULL, 66, '8-1000', 'Pendapatan Bunga', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 21:08:10', '2014-08-26 21:08:10', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (16, 68, 7, NULL, 66, '8-2000', 'Administrasi Bank', NULL, 0, NULL, '', 'admin', 'admin', '2014-08-26 21:08:47', '2014-08-26 21:08:13', true, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (9, 72, 7, NULL, 66, '8-111', 'xxx', NULL, 0, NULL, 'xxxxx', 'admin', 'admin', '2014-09-02 22:09:00', '2014-09-02 22:09:23', false, 99, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 717, 2, NULL, 30, '2-1130', 'PPh Pasal 21', NULL, 0, NULL, 'Akun yang menampung beban pajak PPH21 Karyawan', 'administrator', 'administrator', '2015-04-20 05:04:03', '2015-04-20 05:04:03', true, 99, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 744, 2, NULL, 30, '2-1150', 'PPh Pasal 23', NULL, NULL, 1, 'Pajak Penghasilan atas Dividen, Bunga, Royalty, Sewa, Imbalan atas Jasa, dll', NULL, NULL, NULL, NULL, true, 99, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 745, 2, NULL, 30, '2-1160', 'PPh Pasal 25', NULL, NULL, 1, 'Angsuran Pembayaran Pajak Terhutang sesuai dengan Surat Pemberitahuan Pajak (SPT)', NULL, NULL, NULL, NULL, true, 99, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 746, 2, NULL, 30, '2-1170', 'PPh Pasal 29', NULL, NULL, 1, 'Pajak yang Harus Dilunasi Akibat PPh Terhutang dari SPT', NULL, NULL, NULL, NULL, true, 99, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (23, 9090, NULL, NULL, 0, '1-1111', 'Ikhtisar Laba/Rugi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 99, NULL, NULL, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 62, 6, NULL, 58, '6-2004', 'Telpon', NULL, 0, NULL, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 07:04:02', true, 12, 62, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 63, 6, NULL, 58, '6-2005', 'Pemeliharaan Peralatan Kantor', NULL, 0, NULL, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 07:04:52', true, 12, 63, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (16, 68, 7, NULL, 66, '8-2000', 'Administrasi Bank', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 68, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (12, 753, 4, NULL, 45, '4-0005', 'Other Income', NULL, 0, NULL, '', 'staff', 'staff', '2017-01-26 17:01:07', '2017-01-26 17:01:12', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (NULL, 1, 1, NULL, 0, '1-0000', 'Aktiva', NULL, 0, NULL, NULL, 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 1, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (1, 2, 2, NULL, 1, '1-0100', 'Cheque Account', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 2, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (1, 3, 2, NULL, 1, '1-0150', 'Undeposited Funds', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 3, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (11, 4, 3, NULL, 1, '1-0200', 'Trade Debitors', NULL, 0, NULL, 'deskripsi', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 4, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (17, 5, 1, NULL, 1, '1-1000', 'Aktiva Lancar', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 5, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (1, 8, 1, NULL, 5, '1-1300', 'Bank', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 8, 1, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (3, 19, 1, NULL, 5, '1-1500', 'Persediaan barang dagang', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 19, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (3, 20, 1, NULL, 5, '1-1600', 'Perlengkapan Kantor', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 20, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (17, 21, 1, NULL, 5, '1-1700', 'Biaya Dibayar Dimuka', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 21, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (3, 22, 1, NULL, 21, '1-1710', 'Uang muka pembelian', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 22, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (3, 23, 1, NULL, 21, '1-1720', 'Sewa Dibayar Dimuka', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 23, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (17, 24, 1, NULL, 1, '1-2000', 'Aktiva Tetap', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 24, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (4, 26, 1, NULL, 24, '1-2110', 'Akum. Penyusutan Peralatan', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 26, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (4, 27, 1, NULL, 24, '1-2210', 'Akum. Penyusutan Kendaraan', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 27, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 28, 2, NULL, 0, '2-0000', 'Hutang', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 28, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 29, 2, NULL, 28, '2-0200', 'Trade Creditors', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 29, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 30, 2, NULL, 28, '2-1000', 'Hutang Lancar', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 30, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 35, 2, NULL, 30, '2-1200', 'Hutang PPN', NULL, 0, NULL, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 23:04:01', true, 12, 35, 1, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (13, 50, 5, NULL, 49, '5-1000', 'Harga Pokok Barang Dagang', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 50, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (1, 10, 2, NULL, 8, '1-1320', 'Bank Mandiri', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 10, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 733, 6, NULL, 732, '6-213', '123', NULL, 0, 1, '', 'administrator', 'administrator', '2015-04-23 07:04:31', '2015-04-23 07:04:31', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 33, 2, NULL, 30, '2-1110', 'Pendapatan Diterima Dimuka', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 33, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 34, 2, NULL, 30, '2-1120', 'Barang Diterima Dimuka', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 34, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (3, 36, 2, NULL, 35, '2-1210', 'PPN Masukan', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 36, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 732, 6, NULL, 53, '6-3000', 'Beban Umum', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:40', '2015-04-23 07:04:40', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 32, 2, NULL, 30, '2-1140', 'PPh Pasal 22', NULL, 0, NULL, 'Pajak Penghasilan atas Pembelian Barang Mewah', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 05:04:44', true, 12, 32, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 717, 2, NULL, 30, '2-1130', 'PPh Pasal 21', NULL, 0, NULL, 'Akun yang menampung beban pajak PPH21 Karyawan', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 717, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 59, 6, NULL, 58, '6-2001', 'Gaji/Honor Karyawan', NULL, 0, NULL, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 07:04:03', true, 12, 59, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 730, 6, NULL, 58, '6-2006', 'Biaya Surat Kabar, Pos Surat, Benda POS', NULL, 0, 1, '', 'administrator', 'administrator', '2015-04-23 07:04:40', '2015-04-23 07:04:40', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 721, 6, NULL, 53, '6-1000', 'Beban Akademik', NULL, 0, 0, '', 'administrator', 'administrator', '2015-04-23 06:04:43', '2015-04-23 06:04:43', true, 12, NULL, 1, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (2, 18, 1, NULL, 5, '1-1400', 'Piutang Usaha', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 18, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 739, 6, NULL, 732, '6-3004', 'Biaya Rumah Tangga', NULL, 0, 1, '', 'administrator', 'administrator', '2015-04-23 07:04:35', '2015-04-23 07:04:35', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (13, 52, 5, NULL, 49, '5-1200', 'Biaya Angkut Pembelian', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 52, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (12, 48, 4, NULL, 45, '4-0003', 'Uang Daftar Ulang', NULL, 0, 1, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 05:04:50', true, 12, 48, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (13, 734, 6, NULL, 732, '6-3333', '31421', NULL, 0, 1, '', 'administrator', 'administrator', '2015-04-23 07:04:02', '2015-04-23 07:04:02', true, 12, NULL, 1, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (11, 41, 3, NULL, 40, '3-1000', 'Modal Usaha', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 41, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 55, 6, NULL, 721, '6-1001', 'Gaji/Honor Pendidik', NULL, 0, NULL, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 06:04:49', true, 12, 55, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 731, 6, NULL, 58, '6-2007', 'Bantuan GORO/Sumbangan', NULL, 0, 1, '', 'administrator', 'administrator', '2015-04-23 07:04:05', '2015-04-23 07:04:05', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (19, 6, 2, NULL, 5, '1-1100', 'Kas Utama', NULL, 0, NULL, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 23:04:54', true, 12, 6, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (16, 67, 7, NULL, 66, '8-1000', 'Pendapatan Bunga', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 67, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (19, 7, 2, NULL, 5, '1-1200', 'Kas Kecil', NULL, 0, NULL, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 23:04:08', true, 12, 7, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (12, 46, 4, NULL, 45, '4-0001', 'Pendapatan 1', NULL, 0, NULL, '', 'systemwizard', 'staff', '2015-04-22 06:04:08', '2017-03-08 19:03:24', true, 12, 46, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (12, 719, 4, NULL, 45, '4-0004', 'System Maintenance', NULL, 0, 1, '', 'administrator', 'staff', '2015-04-23 05:04:07', '2017-01-26 17:01:00', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 64, 6, NULL, 58, '6-2106', 'Penyusutan Peralatan', NULL, 0, 1, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 64, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 65, 6, NULL, 58, '6-2107', 'Penyusutan Kendaraan', NULL, 0, 1, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 65, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (16, 66, 7, NULL, 0, '8-0000', 'Pendapatan Lain-lain', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 66, 1, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 722, 6, NULL, 721, '6-1002', 'THR Pendidik', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 06:04:27', '2015-04-23 06:04:27', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 723, 6, NULL, 721, '6-1003', 'Alat-alat Tulis', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 06:04:07', '2015-04-23 07:04:54', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 725, 6, NULL, 721, '6-1005', 'Seragam', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:58', '2015-04-23 07:04:17', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 726, 6, NULL, 721, '6-1006', 'Praktikum Siswa', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:44', '2015-04-23 07:04:44', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 727, 6, NULL, 721, '6-1007', 'Rapat, Penataran dan Seminar', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:17', '2015-04-23 07:04:17', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 728, 6, NULL, 721, '6-1008', 'Pembelian Buku', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:35', '2015-04-23 07:04:35', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 729, 6, NULL, 721, '6-1009', 'Foto Copy, Laminating dan Jilid Buku', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:05', '2015-04-23 07:04:05', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (12, 720, 4, NULL, 45, '4-0005', 'Uang BPP', NULL, 0, 1, '', 'administrator', 'administrator', '2015-04-23 05:04:25', '2015-04-23 05:04:25', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (1, 735, 6, NULL, 732, '6-12321', '124121', NULL, 0, 1, '', 'administrator', 'administrator', '2015-04-23 07:04:14', '2015-04-23 07:04:14', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 737, 6, NULL, 732, '6-3002', 'Pemeliharaan Gedung', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:51', '2015-04-23 07:04:51', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 738, 6, NULL, 732, '6-3003', 'Transportasi Operasional', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:15', '2015-04-23 07:04:15', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 724, 6, NULL, 721, '6-1004', 'Penerimaan Siswa Baru', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:35', '2015-04-23 07:04:07', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 740, 6, NULL, 53, '6-4000', 'Beban Penyusutan', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:58', '2015-04-23 07:04:58', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 741, 6, NULL, 740, '6-4001', 'Penyusutan Gedung', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:20', '2015-04-23 07:04:20', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 742, 6, NULL, 740, '6-4002', 'Penyusutan Peralatan', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:52', '2015-04-23 07:04:54', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 743, 6, NULL, 740, '6-4003', 'Penyusutan Kendaraan', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:29', '2015-04-23 07:04:29', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 744, 2, NULL, 30, '2-1150', 'PPh Pasal 23', NULL, 0, 1, 'Pajak Penghasilan atas Dividen, Bunga, Royalty, Sewa, Imbalan atas Jasa, dll', 'administrator', 'administrator', '2015-04-24 11:04:00', '2015-04-24 11:04:00', true, 12, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 745, 2, NULL, 30, '2-1160', 'PPh Pasal 25', NULL, 0, 1, 'Angsuran Pembayaran Pajak Terhutang sesuai dengan Surat Pemberitahuan Pajak (SPT)', 'administrator', 'administrator', '2015-04-24 11:04:46', '2015-04-24 11:04:46', true, 12, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 746, 2, NULL, 30, '2-1170', 'PPh Pasal 29', NULL, 0, 1, 'Pajak yang Harus Dilunasi Akibat PPh Terhutang dari SPT', 'administrator', 'administrator', '2015-04-24 11:04:24', '2015-04-24 11:04:24', true, 12, NULL, 2, NULL, true);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 748, 2, NULL, 30, '2-1180', 'Pajak Penghasilan Badan Usaha', NULL, 0, NULL, 'Pajak Penghasilan Badan Usaha', 'administrator', 'administrator', '2015-04-24 12:04:12', '2015-04-24 12:04:36', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 736, 6, NULL, 732, '6-3001', 'Pemeliharaan Kendaraan Bermotor', NULL, 0, NULL, '', 'administrator', 'administrator', '2015-04-23 07:04:31', '2015-04-23 07:04:31', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 758, 6, NULL, 756, '6-5002', 'Virtual Private Server', NULL, 0, NULL, '', 'staff', 'staff', '2017-01-30 08:01:28', '2017-01-30 10:01:53', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 759, 6, NULL, 756, '6-5003', 'Hosting', NULL, 0, NULL, '', 'staff', 'staff', '2017-01-30 08:01:12', '2017-01-30 08:01:12', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 761, 6, NULL, 756, '6-5005', 'Library,Plugin,Framework and Other development tools', NULL, 0, NULL, '', 'staff', 'staff', '2017-01-30 08:01:39', '2017-01-30 08:01:39', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 757, 6, NULL, 756, '6-5001', 'Platform as Services', NULL, 0, NULL, '', 'staff', 'staff', '2017-01-30 08:01:59', '2017-01-30 08:01:59', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (1, 9, 2, NULL, 8, '1-1310', 'Bank BRI', NULL, 0, NULL, 'Bank BRI', 'systemwizard', 'staff', '2015-04-22 06:04:08', '2017-01-26 17:01:15', true, 12, 9, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 754, 6, NULL, 53, '6-40009', 'Beban Hutang Usaha', NULL, 0, NULL, '', 'staff', 'staff', '2017-01-26 18:01:41', '2017-01-26 18:01:41', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 760, 6, NULL, 756, '6-5004', 'Domain', NULL, 0, NULL, '', 'staff', 'staff', '2017-01-30 08:01:28', '2017-01-30 08:01:28', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 755, 6, NULL, 732, '6-3004', 'Akomodasi Operasional', NULL, 0, NULL, '', 'staff', 'staff', '2017-01-26 19:01:46', '2017-01-26 19:01:46', true, 12, NULL, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (18, 31, 2, NULL, 28, '2-0300', 'Hutang Usaha', NULL, 0, NULL, '', 'systemwizard', 'staff', '2015-04-22 06:04:08', '2017-01-26 18:01:03', true, 12, 31, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (4, 25, 1, NULL, 24, '1-2100', 'Peralatan Kantor', NULL, 0, NULL, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', true, 12, 25, 2, NULL, NULL);
INSERT INTO account (idaccounttype, idaccount, idclassificationcf, idlinked, idparent, accnumber, accname, tax, balance, display, description, userin, usermod, datein, datemod, active, idunit, idaccounttmp, idpos, permanent, lock) VALUES (14, 756, 6, NULL, 53, '6-5000', 'Beban Development', NULL, 0, 1, '', 'staff', 'staff', '2017-01-30 08:01:22', '2017-01-30 08:01:45', true, 12, NULL, 2, NULL, NULL);


--
-- Data for Name: accounthistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO accounthistory (idaccount, balance, day, month, year, datein, userin, idunit) VALUES (6, 36950000, 26, '04', 2015, '2015-04-26 12:04:08', 'administrator', 14);
INSERT INTO accounthistory (idaccount, balance, day, month, year, datein, userin, idunit) VALUES (6, 37945000, 19, '05', 2015, '2015-05-19 13:05:49', 'administrator', 14);
INSERT INTO accounthistory (idaccount, balance, day, month, year, datein, userin, idunit) VALUES (6, 38450000, 26, '04', 2015, '2015-04-26 12:04:07', 'administrator', 14);
INSERT INTO accounthistory (idaccount, balance, day, month, year, datein, userin, idunit) VALUES (6, 39450000, 26, '04', 2015, '2015-04-26 12:04:32', 'administrator', 14);
INSERT INTO accounthistory (idaccount, balance, day, month, year, datein, userin, idunit) VALUES (25, 500000, 26, '04', 2015, '2015-04-26 12:04:32', 'administrator', 14);
INSERT INTO accounthistory (idaccount, balance, day, month, year, datein, userin, idunit) VALUES (25, 1000000, 19, '05', 2015, '2015-05-19 13:05:49', 'administrator', 14);
INSERT INTO accounthistory (idaccount, balance, day, month, year, datein, userin, idunit) VALUES (52, 50000, 26, '04', 2015, '2015-04-26 12:04:32', 'administrator', 14);
INSERT INTO accounthistory (idaccount, balance, day, month, year, datein, userin, idunit) VALUES (52, 55000, 19, '05', 2015, '2015-05-19 13:05:49', 'administrator', 14);
INSERT INTO accounthistory (idaccount, balance, day, month, year, datein, userin, idunit) VALUES (62, 2500000, 26, '04', 2015, '2015-04-26 12:04:08', 'administrator', 14);
INSERT INTO accounthistory (idaccount, balance, day, month, year, datein, userin, idunit) VALUES (67, 1500000, 26, '04', 2015, '2015-04-26 12:04:07', 'administrator', 14);


--
-- Data for Name: accountingdata; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: accountlog; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: accountpos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO accountpos (idpos, namepos) VALUES (1, 'Akun Kategori');
INSERT INTO accountpos (idpos, namepos) VALUES (2, 'Akun Transaksi');


--
-- Data for Name: accountsubtype; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: accounttype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (1, 'Bank', 1, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (2, 'Piutang', 1, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (3, 'Other Current Asset', 1, 1);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (4, 'Harta Tetap', 1, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (5, 'Harta Lainnya', 1, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (6, 'Credit Card', 1, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (8, 'Other Current Liability', 2, 1);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (9, 'Hutang Jangka Panjang', 2, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (10, 'Kewajiban Lainnya', 2, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (11, 'Ekuitas', 3, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (12, 'Pendapatan', 3, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (13, 'Cost of Sales', 5, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (14, 'Pengeluaran', 6, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (15, 'Pengeluaran Lainnya', 6, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (16, 'Pendapatan Lainnya', 4, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (17, 'Harta Lancar', 1, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (18, 'Hutang Lancar', 2, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (19, 'Kas', 1, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (20, 'Persediaan', 1, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (21, 'Laba Ditahan', NULL, NULL);
INSERT INTO accounttype (idaccounttype, acctypename, idclassificationcf, display) VALUES (23, 'Journal Statement', NULL, 1);


--
-- Data for Name: alerttype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO alerttype (idalerttype, alertname) VALUES (1, 'Ingatkan kepada Untuk menjalakan transaksi jurnal');
INSERT INTO alerttype (idalerttype, alertname) VALUES (2, 'Jalankan transaksi jurnal ini secara otomatis dan beritahukan kepada');


--
-- Data for Name: amounttype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO amounttype (idamounttype, name, "desc", userin, usermod, datein, datemod) VALUES (1, 'Fix Amount', NULL, NULL, NULL, NULL, NULL);
INSERT INTO amounttype (idamounttype, name, "desc", userin, usermod, datein, datemod) VALUES (2, 'Persentase', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: asuransi; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO asuransi (idasuransi, idasuransitype, idasuransipaytype, namapremi, deskripsi, fixamount, percentemployee, percentcompany, "idaccountemp-deleted", "idaccountcomp-deleted", userin, datein, usermod, datemod, display, tampilemp, tampilcmp) VALUES (1, NULL, 2, 'JKK', 'Jaminan Kecelakaan Kerja BPJS', NULL, 0, 3, 712, 713, NULL, NULL, 'admin', '2015-02-05 13:02:55', NULL, NULL, NULL);
INSERT INTO asuransi (idasuransi, idasuransitype, idasuransipaytype, namapremi, deskripsi, fixamount, percentemployee, percentcompany, "idaccountemp-deleted", "idaccountcomp-deleted", userin, datein, usermod, datemod, display, tampilemp, tampilcmp) VALUES (2, NULL, 2, 'JK', 'Jaminan Kematian BPJS', NULL, 0, 4, 712, 713, NULL, NULL, 'admin', '2015-02-05 13:02:08', NULL, NULL, NULL);
INSERT INTO asuransi (idasuransi, idasuransitype, idasuransipaytype, namapremi, deskripsi, fixamount, percentemployee, percentcompany, "idaccountemp-deleted", "idaccountcomp-deleted", userin, datein, usermod, datemod, display, tampilemp, tampilcmp) VALUES (3, NULL, 2, 'JPK', 'Jaminan Pemeliharaan Kesehatan (JPK) Jamsostek', NULL, 0, 3, 712, 713, NULL, NULL, 'admin', '2015-02-04 23:02:44', NULL, NULL, NULL);
INSERT INTO asuransi (idasuransi, idasuransitype, idasuransipaytype, namapremi, deskripsi, fixamount, percentemployee, percentcompany, "idaccountemp-deleted", "idaccountcomp-deleted", userin, datein, usermod, datemod, display, tampilemp, tampilcmp) VALUES (4, NULL, 1, 'JHT', 'Jaminan Hari Tua - Jamsostek', NULL, 2.5, 3, 712, 713, NULL, NULL, 'admin', '2015-02-05 13:02:27', NULL, 'on', NULL);


--
-- Data for Name: asuransiemp; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: asuransipayhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: asuransipaytype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO asuransipaytype (idasuransipaytype, nametype) VALUES (1, 'Pengurang Penghasilan');
INSERT INTO asuransipaytype (idasuransipaytype, nametype) VALUES (2, 'Penambah Penghasilan');


--
-- Data for Name: asuransitype; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: asuransiunit; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (1, NULL, NULL, 1);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (1, NULL, NULL, 1);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (1, NULL, NULL, 2);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (1, NULL, NULL, 2);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (1, NULL, NULL, 7);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (1, NULL, NULL, 8);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (1, NULL, NULL, 9);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (1, NULL, NULL, 10);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (1, NULL, NULL, 15);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (1, NULL, NULL, 99);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (1, NULL, NULL, 99);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (2, NULL, NULL, 1);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (2, NULL, NULL, 1);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (2, NULL, NULL, 2);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (2, NULL, NULL, 2);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (2, NULL, NULL, 7);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (2, NULL, NULL, 8);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (2, NULL, NULL, 9);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (2, NULL, NULL, 10);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (2, NULL, NULL, 15);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (2, NULL, NULL, 99);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (2, NULL, NULL, 99);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (3, 31, 55, 9);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (3, 712, 713, 1);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (3, 712, 713, 1);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (3, NULL, NULL, 2);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (3, NULL, NULL, 2);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (3, NULL, NULL, 7);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (3, NULL, NULL, 8);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (3, NULL, NULL, 10);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (3, NULL, NULL, 15);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (3, NULL, NULL, 99);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (3, NULL, NULL, 99);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (4, 29, 62, 9);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (4, 712, 713, 1);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (4, 712, 713, 1);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (4, NULL, NULL, 2);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (4, NULL, NULL, 2);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (4, NULL, NULL, 7);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (4, NULL, NULL, 8);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (4, NULL, NULL, 10);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (4, NULL, NULL, 15);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (4, NULL, NULL, 99);
INSERT INTO asuransiunit (idasuransi, idaccountemp, idaccountcomp, idunit) VALUES (4, NULL, NULL, 99);


--
-- Data for Name: bank; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO bank (bank_id, bank_name, branch_name, address, account_number, account_name, idunit, display, userin, datein, usermod, datemod) VALUES (1, '1', '1', '1', '1', '1', 12, NULL, 11, '2017-03-09 10:03:58', 11, '2017-03-09 10:03:58');


--
-- Data for Name: brand; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO brand (brand_id, idunit, brand_name, brand_desc, display, userin, datein, usermod, datemod, status, deleted) VALUES (1, 12, 'asda', 'adaasda', NULL, '0', '2017-03-09 23:03:30', '0', '2017-03-09 21:03:51', NULL, NULL);


--
-- Data for Name: bussinestype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO bussinestype (idbussinestype, namebussines, description) VALUES (1, 'Lembaga Pendidikan', NULL);
INSERT INTO bussinestype (idbussinestype, namebussines, description) VALUES (2, 'Perusahaan Jasa', NULL);
INSERT INTO bussinestype (idbussinestype, namebussines, description) VALUES (3, 'Perusahaan Dagang', NULL);
INSERT INTO bussinestype (idbussinestype, namebussines, description) VALUES (4, 'Perusahaan Manufaktur', NULL);


--
-- Data for Name: classificationcf; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO classificationcf (idclassificationcf, classname, description, prefixno) VALUES (1, 'Asset', NULL, 1);
INSERT INTO classificationcf (idclassificationcf, classname, description, prefixno) VALUES (2, 'Liability', NULL, 2);
INSERT INTO classificationcf (idclassificationcf, classname, description, prefixno) VALUES (3, 'Equity', NULL, 3);
INSERT INTO classificationcf (idclassificationcf, classname, description, prefixno) VALUES (4, 'Income', NULL, 4);
INSERT INTO classificationcf (idclassificationcf, classname, description, prefixno) VALUES (5, 'Cost of Sales', NULL, 5);
INSERT INTO classificationcf (idclassificationcf, classname, description, prefixno) VALUES (6, 'Expense', NULL, 6);
INSERT INTO classificationcf (idclassificationcf, classname, description, prefixno) VALUES (7, 'Other Income', NULL, 8);
INSERT INTO classificationcf (idclassificationcf, classname, description, prefixno) VALUES (8, 'Other Expense', NULL, 9);


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO client (clientid, dateregistered, packageid, nextinvoice) VALUES (1, '2015-01-01', 1, '2015-01-23');


--
-- Data for Name: closebook; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: clossing; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO company (idcompany, idbussinestype, companyname, companyaddress, companyaddress2, companyaddress3, companyaddress4, companyaddress5, telp, fax, email, website, country, npwp, userin, usermod, datein, datemod, display, curfinanceyear, lastmonthfinanceyear, conversionmonth, numaccperiod, logo, idlocation, type) VALUES (1, 4, 'Alfa Prima Sentosa', 'Tangerang', '', '', NULL, NULL, '-', '-', 'info@alfa.com', '', NULL, '99221112233213994', 'administrator', 'administrator', '05:04:17+07', '2015-04-22 05:04:17', NULL, 2012, '12', '09', 12, NULL, NULL, NULL);


--
-- Data for Name: credittterm; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: currency; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO currency (idcurrency, namecurr, symbol, description, display, userin, usermod, datein, datemod, idunit, rate) VALUES (1, 'Rupiah', 'Rp', '2', NULL, NULL, '11', NULL, '2017-03-09 10:03:18', 12, 0.00);
INSERT INTO currency (idcurrency, namecurr, symbol, description, display, userin, usermod, datein, datemod, idunit, rate) VALUES (2, 'USD', '$', '-', NULL, NULL, '11', NULL, '2017-03-09 10:03:26', 12, 132000.00);
INSERT INTO currency (idcurrency, namecurr, symbol, description, display, userin, usermod, datein, datemod, idunit, rate) VALUES (3, '1', '1', '1', NULL, '11', '11', '2017-03-09 10:03:03', '2017-03-09 10:03:03', 12, 1.00);


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO customer (idcustomer, idcustomertype, idpayment, nocustomer, namecustomer, address, shipaddress, billaddress, telephone, handphone, fax, email, website, city, state, postcode, country, highestpayment, avgdaypayment, lastpayment, lastsales, incomeaccount, notes, display, userin, usermod, datein, datemod, status, deleted) VALUES (8, 1, NULL, 'cust001', 'prabowo', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', NULL, NULL, NULL, NULL, NULL, '1', NULL, '11', '0', '2017-03-09 08:03:33', '2017-03-20 19:03:28', 1, NULL);


--
-- Data for Name: customertype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO customertype (idcustomertype, namecustype, description, userin, datein, usermod, datemod, idunit, display, status, deleted) VALUES (1, '1', 'dec', 11, '2017-03-09 08:03:37', 0, '2017-03-20 12:03:05', 12, NULL, 1, NULL);


--
-- Data for Name: dataanak; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO dataanak (datanakid, idemployee, namaanak, userin, datein, usermod, datemod, display) VALUES (1, 2, 'zzzzzzzzzzz', 'admin', '2014-10-17 16:10:22', 'admin', '2014-10-17 16:10:31', NULL);


--
-- Data for Name: datasutri; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: disbursment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: employeetype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO employeetype (idemployeetype, nametype, description, userin, usermod, datein, datemod, idaccountpayroll, idunit, display, idaccount, payrolltypeid, fare, idaccountpaythr, idaccountthr, idcompany) VALUES (7, 'Guru Tidak Tetap', 'Pegawai Kontrak', 'adminsmk', 'administrator', '2015-04-20 11:04:18', '2015-04-22 06:04:08', 0, NULL, NULL, 0, 1, 0, 0, 0, NULL);
INSERT INTO employeetype (idemployeetype, nametype, description, userin, usermod, datein, datemod, idaccountpayroll, idunit, display, idaccount, payrolltypeid, fare, idaccountpaythr, idaccountthr, idcompany) VALUES (8, 'Guru Tetap', '', 'administrator', 'administrator', '2015-04-22 06:04:25', '2015-04-22 06:04:39', 0, 12, NULL, 0, 3, 0, 0, 0, NULL);
INSERT INTO employeetype (idemployeetype, nametype, description, userin, usermod, datein, datemod, idaccountpayroll, idunit, display, idaccount, payrolltypeid, fare, idaccountpaythr, idaccountthr, idcompany) VALUES (9, 'Karyawan Tetap', '', 'administrator', 'administrator', '2015-04-22 06:04:54', '2015-04-22 06:04:54', 0, 12, NULL, 0, 3, 0, 0, 0, NULL);
INSERT INTO employeetype (idemployeetype, nametype, description, userin, usermod, datein, datemod, idaccountpayroll, idunit, display, idaccount, payrolltypeid, fare, idaccountpaythr, idaccountthr, idcompany) VALUES (10, 'Karyawan Honorer', '', 'administrator', 'administrator', '2015-04-22 06:04:46', '2015-04-22 06:04:46', 0, 12, NULL, 0, 2, 0, 0, 0, NULL);
INSERT INTO employeetype (idemployeetype, nametype, description, userin, usermod, datein, datemod, idaccountpayroll, idunit, display, idaccount, payrolltypeid, fare, idaccountpaythr, idaccountthr, idcompany) VALUES (11, 'Kepala Sekolah', '', 'administrator', 'administrator', '2015-04-22 06:04:22', '2015-04-24 05:04:23', 0, 12, NULL, 0, 3, 2500000, 0, 0, NULL);


--
-- Data for Name: employeetypeakunlink; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO employeetypeakunlink (idemployeetype, idaccountpayroll, idaccount, idaccountpaythr, idaccountthr, idunit) VALUES (1, NULL, NULL, NULL, NULL, 1);
INSERT INTO employeetypeakunlink (idemployeetype, idaccountpayroll, idaccount, idaccountpaythr, idaccountthr, idunit) VALUES (1, NULL, NULL, NULL, NULL, 1);
INSERT INTO employeetypeakunlink (idemployeetype, idaccountpayroll, idaccount, idaccountpaythr, idaccountthr, idunit) VALUES (1, NULL, NULL, NULL, NULL, 2);
INSERT INTO employeetypeakunlink (idemployeetype, idaccountpayroll, idaccount, idaccountpaythr, idaccountthr, idunit) VALUES (1, NULL, NULL, NULL, NULL, 2);
INSERT INTO employeetypeakunlink (idemployeetype, idaccountpayroll, idaccount, idaccountpaythr, idaccountthr, idunit) VALUES (2, 654, 681, NULL, NULL, 2);
INSERT INTO employeetypeakunlink (idemployeetype, idaccountpayroll, idaccount, idaccountpaythr, idaccountthr, idunit) VALUES (2, 654, 681, NULL, NULL, 2);
INSERT INTO employeetypeakunlink (idemployeetype, idaccountpayroll, idaccount, idaccountpaythr, idaccountthr, idunit) VALUES (2, NULL, NULL, 681, 714, 1);
INSERT INTO employeetypeakunlink (idemployeetype, idaccountpayroll, idaccount, idaccountpaythr, idaccountthr, idunit) VALUES (2, NULL, NULL, 681, 714, 1);
INSERT INTO employeetypeakunlink (idemployeetype, idaccountpayroll, idaccount, idaccountpaythr, idaccountthr, idunit) VALUES (6, 655, 623, NULL, NULL, 1);
INSERT INTO employeetypeakunlink (idemployeetype, idaccountpayroll, idaccount, idaccountpaythr, idaccountthr, idunit) VALUES (6, 655, 623, NULL, NULL, 1);
INSERT INTO employeetypeakunlink (idemployeetype, idaccountpayroll, idaccount, idaccountpaythr, idaccountthr, idunit) VALUES (6, NULL, NULL, NULL, NULL, 2);
INSERT INTO employeetypeakunlink (idemployeetype, idaccountpayroll, idaccount, idaccountpaythr, idaccountthr, idunit) VALUES (6, NULL, NULL, NULL, NULL, 2);


--
-- Data for Name: frequency; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO frequency (idfrequency, namefreq) VALUES (1, 'Harian');
INSERT INTO frequency (idfrequency, namefreq) VALUES (2, 'Mingguan');
INSERT INTO frequency (idfrequency, namefreq) VALUES (3, 'Bulanan');
INSERT INTO frequency (idfrequency, namefreq) VALUES (4, 'Tahunan');


--
-- Data for Name: hakakses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (2, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (2, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (2, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (2, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (2, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (2, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (3, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (3, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (3, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (3, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (3, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (3, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (4, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (4, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (4, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (4, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (4, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (4, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (5, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (5, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (5, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (5, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (5, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (5, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (8, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (8, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (8, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (8, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (8, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (8, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (11, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (11, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (11, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (11, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (11, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (11, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (15, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (15, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (15, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (15, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (15, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (15, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (16, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (16, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (16, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (16, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (16, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (16, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (18, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (18, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (18, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (18, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (18, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (18, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (19, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (19, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (19, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (19, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (19, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (19, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (24, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (24, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (24, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (24, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (24, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (24, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (25, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (25, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (25, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (25, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (25, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (25, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (26, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (26, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (26, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (26, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (26, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (26, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (27, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (27, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (27, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (27, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (27, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (27, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (29, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (29, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (29, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (29, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (29, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (29, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (32, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (32, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (32, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (32, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (32, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (32, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (34, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (34, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (34, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (34, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (34, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (34, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (35, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (35, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (35, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (35, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (35, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (35, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (37, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (37, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (37, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (37, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (37, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (37, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (38, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (38, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (38, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (38, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (38, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (38, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (39, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (39, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (39, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (39, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (39, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (39, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (40, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (40, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (40, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (40, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (40, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (40, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (41, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (41, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (41, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (41, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (41, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (41, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (42, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (42, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (42, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (42, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (42, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (42, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (43, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (43, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (43, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (43, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (43, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (43, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (46, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (46, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (46, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (46, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (46, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (46, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (48, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (48, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (48, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (48, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (48, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (48, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (50, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (50, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (50, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (50, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (50, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (50, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (53, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (53, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (53, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (53, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (53, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (53, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (54, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (54, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (54, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (54, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (54, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (54, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (57, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (57, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (57, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (57, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (57, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (57, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (58, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (58, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (58, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (58, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (58, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (58, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (59, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (59, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (59, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (59, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (59, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (59, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (60, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (60, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (60, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (60, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (60, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (60, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (61, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (61, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (61, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (61, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (61, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (61, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (62, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (62, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (62, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (62, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (62, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (62, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (63, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (63, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (63, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (63, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (63, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (63, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (64, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (64, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (64, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (64, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (64, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (64, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (65, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (65, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (65, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (65, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (65, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (65, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (66, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (66, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (66, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (66, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (66, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (66, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (68, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (68, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (68, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (68, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (68, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (68, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (69, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (69, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (69, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (69, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (69, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (69, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (71, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (71, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (71, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (71, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (71, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (71, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (72, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (72, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (72, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (72, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (72, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (72, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (74, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (74, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (74, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (74, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (74, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (74, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (76, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (76, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (76, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (76, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (76, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (76, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (77, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (77, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (77, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (77, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (77, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (77, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (78, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (78, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (78, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (78, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (78, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (78, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (79, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (79, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (79, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (79, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (79, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (79, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (82, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (82, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (82, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (82, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (82, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (82, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (83, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (83, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (83, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (83, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (83, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (83, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (84, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (84, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (84, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (84, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (84, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (84, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (85, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (85, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (85, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (85, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (85, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (85, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (86, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (86, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (86, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (86, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (86, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (86, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (87, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (87, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (87, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (87, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (87, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (87, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (88, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (88, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (88, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (88, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (88, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (88, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (89, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (89, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (89, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (89, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (89, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (90, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (90, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (90, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (90, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (90, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (90, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (91, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (91, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (91, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (91, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (91, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (91, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (92, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (92, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (92, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (92, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (92, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (92, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (93, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (93, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (93, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (93, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (93, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (93, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (94, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (94, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (94, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (94, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (94, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (94, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (95, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (95, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (95, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (95, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (95, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (96, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (96, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (96, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (96, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (96, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (96, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (97, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (97, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (97, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (97, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (97, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (97, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (98, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (98, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (98, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (98, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (98, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (98, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (99, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (99, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (99, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (99, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (99, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (99, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (100, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (100, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (100, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (100, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (100, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (100, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (101, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (101, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (101, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (101, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (101, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (101, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (102, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (102, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (102, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (102, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (102, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (102, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (116, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (116, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (116, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (116, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (116, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (116, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (117, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (117, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (117, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (117, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (117, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (117, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (118, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (118, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (118, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (118, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (118, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (119, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (119, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (119, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (119, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (119, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (120, 1, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (120, 2, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (120, 3, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (120, 4, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (120, 5, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (120, 99, true, true, true, NULL, NULL, true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (95, 2, true, true, true, 'adminsmk', '2015-09-07 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (127, 2, true, NULL, NULL, 'staff', '2017-03-08 00:00:00', NULL);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (130, 2, true, true, true, 'staff', '2017-03-09 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (132, 2, true, true, true, 'staff', '2017-03-09 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (128, 2, true, true, true, 'staff', '2017-03-09 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (129, 2, true, true, true, 'staff', '2017-03-09 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (131, 2, true, true, true, 'staff', '2017-03-09 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (89, 99, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (168, 1, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (166, 5, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (154, 5, NULL, NULL, NULL, 'staff', '2017-03-14 00:00:00', NULL);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (118, 99, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (169, 99, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (166, 99, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (168, 2, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (166, 1, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (166, 2, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (168, 3, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (166, 3, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (170, 2, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (119, 4, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (170, 1, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (168, 4, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (166, 4, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (167, 1, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (168, 5, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (167, 2, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (170, 3, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (168, 99, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (167, 3, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (167, 4, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (169, 1, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (167, 99, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (171, 2, true, true, true, 'staff', '2017-03-20 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (167, 5, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (170, 99, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (169, 3, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (170, 5, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (169, 2, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (170, 4, true, true, true, 'staff', '2017-03-14 00:00:00', true);
INSERT INTO hakakses (sys_menu_id, group_id, view, edit, delete, usermod, datemod, add) VALUES (169, 5, true, true, true, 'staff', '2017-03-14 00:00:00', true);


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: inventorycat; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO inventorycat (idinventorycat, namecat, description, userin, usermod, datein, datemod, display) VALUES (1, 'Kelompok 1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO inventorycat (idinventorycat, namecat, description, userin, usermod, datein, datemod, display) VALUES (2, 'Kelompok 2', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO inventorycat (idinventorycat, namecat, description, userin, usermod, datein, datemod, display) VALUES (3, 'Kelompok 3', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO inventorycat (idinventorycat, namecat, description, userin, usermod, datein, datemod, display) VALUES (4, 'Kelompok 4', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO inventorycat (idinventorycat, namecat, description, userin, usermod, datein, datemod, display) VALUES (5, 'Kendaraan Bermotor', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO inventorycat (idinventorycat, namecat, description, userin, usermod, datein, datemod, display) VALUES (6, 'Bangunan Permanen', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO inventorycat (idinventorycat, namecat, description, userin, usermod, datein, datemod, display) VALUES (7, 'Bangunan Non Permanen', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO inventorycat (idinventorycat, namecat, description, userin, usermod, datein, datemod, display) VALUES (45, 'ccc', 'cccc', 'administrator', 'administrator', '2015-04-30 12:04:43', '2015-04-30 12:04:03', 0);
INSERT INTO inventorycat (idinventorycat, namecat, description, userin, usermod, datein, datemod, display) VALUES (52, '123', '123', 'administrator', 'administrator', '2015-05-19 15:05:29', '2015-05-19 15:05:32', 0);


--
-- Data for Name: inventorydeprec; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: inventorydeprecitem; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: inventoryunit; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: jenisptkp; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO jenisptkp (idjenisptkp, namaptkp, deskripsi, totalptkp, display, userin, usermod, datein, datemod) VALUES (1, 'TK/0', 'Tidak Kawin tidak ada tanggungan', 24300000, NULL, NULL, NULL, NULL, NULL);
INSERT INTO jenisptkp (idjenisptkp, namaptkp, deskripsi, totalptkp, display, userin, usermod, datein, datemod) VALUES (2, 'TK/1', 'Tidak Kawin memiliki 1 (satu) tanggungan', 26325000, NULL, NULL, NULL, NULL, NULL);
INSERT INTO jenisptkp (idjenisptkp, namaptkp, deskripsi, totalptkp, display, userin, usermod, datein, datemod) VALUES (3, 'TK/2', 'Tidak Kawin memiliki 2 (dua) tanggungan', 28350000, NULL, NULL, NULL, NULL, NULL);
INSERT INTO jenisptkp (idjenisptkp, namaptkp, deskripsi, totalptkp, display, userin, usermod, datein, datemod) VALUES (4, 'TK/3', 'Tidak Kawin memiliki 3 (tiga) tanggungan', 30375000, NULL, NULL, NULL, NULL, NULL);
INSERT INTO jenisptkp (idjenisptkp, namaptkp, deskripsi, totalptkp, display, userin, usermod, datein, datemod) VALUES (5, 'K/0', 'Kawin tidak ada tanggungan', 26325000, NULL, NULL, NULL, NULL, NULL);
INSERT INTO jenisptkp (idjenisptkp, namaptkp, deskripsi, totalptkp, display, userin, usermod, datein, datemod) VALUES (6, 'K/1', 'Kawin memiliki 1 (satu) tanggungan', 28350000, NULL, NULL, NULL, NULL, NULL);
INSERT INTO jenisptkp (idjenisptkp, namaptkp, deskripsi, totalptkp, display, userin, usermod, datein, datemod) VALUES (7, 'K/2', 'Kawin memiliki 2 (dua) tanggungan', 30375000, NULL, NULL, NULL, NULL, NULL);
INSERT INTO jenisptkp (idjenisptkp, namaptkp, deskripsi, totalptkp, display, userin, usermod, datein, datemod) VALUES (8, 'K/3', 'Kawin memiliki 3 (tiga) tanggungan', 32400000, NULL, NULL, NULL, NULL, NULL);
INSERT INTO jenisptkp (idjenisptkp, namaptkp, deskripsi, totalptkp, display, userin, usermod, datein, datemod) VALUES (9, 'K/I/0', 'Kawin Isteri Bekerja/Usaha tidak ada tanggungan', 50625000, NULL, NULL, NULL, NULL, NULL);
INSERT INTO jenisptkp (idjenisptkp, namaptkp, deskripsi, totalptkp, display, userin, usermod, datein, datemod) VALUES (10, 'K/I/1', 'Kawin Isteri Bekerja/Usaha memiliki 1 (satu) tanggungan', 52650000, NULL, NULL, NULL, NULL, NULL);
INSERT INTO jenisptkp (idjenisptkp, namaptkp, deskripsi, totalptkp, display, userin, usermod, datein, datemod) VALUES (11, 'K/I/2', 'Kawin Isteri Bekerja/Usaha memiliki 2 (dua) tanggungan', 54675000, NULL, NULL, NULL, NULL, NULL);
INSERT INTO jenisptkp (idjenisptkp, namaptkp, deskripsi, totalptkp, display, userin, usermod, datein, datemod) VALUES (12, 'K/I/3', 'Kawin Isteri Bekerja/Usaha memiliki 3 (tiga) tanggungan', 56700000, NULL, NULL, NULL, NULL, NULL);
INSERT INTO jenisptkp (idjenisptkp, namaptkp, deskripsi, totalptkp, display, userin, usermod, datein, datemod) VALUES (50, '123', '123', 123, 0, 'administrator', 'administrator', '2015-05-19 14:05:31', '2015-05-19 14:05:47');


--
-- Data for Name: journal; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO journal (idjournal, idjournaltype, nojournal, name, datejournal, memo, totaldebit, totalcredit, totaltax, isrecuring, year, month, display, userin, usermod, datein, datemod, lastbalance, currbalance, balance, idunit, idcurrency, idreconcile, idclossing) VALUES (418, 1, '001', NULL, '2016-09-30', 'Saldo Awal', 0, 0, NULL, NULL, 2016, '09', NULL, 'staff', 'staff', '2017-01-26 17:01:19', '2017-01-26 17:01:19', NULL, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: journalitem; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: journalitemrec; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: journalrec; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO journalrec (idjournalrec, idfrequency, idscheduletype, idalerttype, idjournaltype, nojournal, name, datejournal, memo, totaldebit, totalcredit, totaltax, balance, isrecuring, startdate, recuntildate, recnumtimes, alertto, notifto, alertmindays, alertondate, year, month, display, userin, usermod, datein, datemod) VALUES (12, NULL, 2, 2, 1, '123213', NULL, '2014-09-05', 'memo jurnal berulang', 500000, 500000, NULL, 0, true, NULL, NULL, 3, 1, NULL, NULL, NULL, 2014, '09', NULL, 'admin', 'admin', '2014-08-31 20:08:58', '2014-08-31 20:08:58');


--
-- Data for Name: journaltype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO journaltype (idjournaltype, namejournal, description) VALUES (1, 'Umum', 'Umum');
INSERT INTO journaltype (idjournaltype, namejournal, description) VALUES (2, 'Pembayaran', NULL);
INSERT INTO journaltype (idjournaltype, namejournal, description) VALUES (3, 'Penjualan', NULL);
INSERT INTO journaltype (idjournaltype, namejournal, description) VALUES (4, 'Pembelian', NULL);
INSERT INTO journaltype (idjournaltype, namejournal, description) VALUES (5, 'Persediaan', NULL);
INSERT INTO journaltype (idjournaltype, namejournal, description) VALUES (6, 'Kas Masuk', NULL);
INSERT INTO journaltype (idjournaltype, namejournal, description) VALUES (7, 'Kas Keluar', NULL);
INSERT INTO journaltype (idjournaltype, namejournal, description) VALUES (8, 'Pendapatan', NULL);
INSERT INTO journaltype (idjournaltype, namejournal, description) VALUES (9, 'Hutang', NULL);
INSERT INTO journaltype (idjournaltype, namejournal, description) VALUES (10, 'Piutang', NULL);


--
-- Data for Name: linkedacc; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (1, NULL, 'Asuransi Dibayar Dimuka', NULL, NULL, 0);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (2, NULL, 'Hutang Jangka Panjang', NULL, NULL, 0);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (3, NULL, 'Laba Ditahan / Retained Earnings', NULL, NULL, NULL);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (4, NULL, 'Laba Periode Berjalan / Current Year Earnings', NULL, NULL, NULL);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (5, NULL, 'Selisih Pembukuan / Historical Balancing', NULL, NULL, 0);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (6, NULL, 'Akun penerimaan pendapatan', NULL, NULL, NULL);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (7, NULL, 'Undeposited Funds', NULL, NULL, NULL);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (8, NULL, 'Piutang Usaha / Tracking Receivables', 'Menampung piutang atas transaksi penjualan customer', NULL, 0);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (9, NULL, 'Akun Penerimaan / Customer Receipts', 'penerimaan kas atas transaksi tunai', NULL, NULL);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (10, NULL, 'Pendapatan Jasa Angkut', NULL, NULL, 0);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (11, NULL, 'Pendapatan Diterima Dimuka', 'penerimaan uang muka', NULL, 0);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (12, NULL, 'Potongan Penjualan', NULL, NULL, 0);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (13, NULL, 'Pendapatan Bunga', 'mencatat denda keterlambatan atas pembayaran piutang', NULL, NULL);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (14, NULL, 'Hutang Usaha / Tracking Payables', 'transaksi pembelian secara kredit', NULL, NULL);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (15, NULL, 'Kas / Paying Bills', 'transaksi pembayaran tunai', 6, NULL);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (16, NULL, 'Barang diterima dimuka / Item Receipts', 'Akun sementara untuk menampung barang-barang yang belum dilengkapi tagihan', NULL, 0);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (17, NULL, 'Biaya Angkut Pembelian', NULL, NULL, NULL);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (18, NULL, 'Uang Muka Pembelian', NULL, 22, NULL);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (19, NULL, 'Potongan Pembelian', NULL, NULL, NULL);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (20, NULL, 'Biaya Bunga Pembelian', NULL, NULL, 0);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (21, NULL, 'Akun Pajak Penghasilan Badan Usaha', 'Pajak Penghasilan untuk Badan Usaha. Yaitu Pajak yang didapat dari penghasilan kotor dikurang biaya yang dikeluarkan', NULL, NULL);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (22, NULL, 'PPH21', 'Akun yang menampung beban pajak PPH21 Karyawan', NULL, NULL);
INSERT INTO linkedacc (idlinked, idaccounttype, namelinked, description, idaccount, display) VALUES (23, NULL, 'Hutang PPH21', 'Akun yang mencatat hutang beban pajak PPH21 Karyawan', NULL, 0);


--
-- Data for Name: linkedaccunit; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (1, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (1, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (2, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (2, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (3, 42, 9);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (3, 42, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (3, 42, 14);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (3, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (3, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (4, 43, 9);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (4, 43, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (4, 43, 14);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (4, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (4, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (5, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (5, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (6, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (6, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (7, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (7, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (8, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (8, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (9, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (9, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (10, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (10, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (11, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (11, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (12, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (12, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (13, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (13, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (14, 32, 9);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (14, 32, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (14, 32, 14);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (14, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (14, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (15, 6, 9);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (15, 6, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (15, 6, 14);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (15, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (15, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (16, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (16, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (17, 52, 9);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (17, 52, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (17, 52, 14);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (17, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (17, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (18, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (18, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (19, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (19, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (20, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (20, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (21, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (21, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (22, 717, 9);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (22, 717, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (22, 717, 14);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (22, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (22, NULL, 15);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (23, NULL, 13);
INSERT INTO linkedaccunit (idlinked, idaccount, idunit) VALUES (23, NULL, 15);


--
-- Data for Name: linkpiutang; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO linkpiutang (idlinkpiutang, idaccountpiutang, idaccount, description, userin, usermod, datein, datemod, display, idunit) VALUES (3, 708, 684, '---', 'admin', 'admin', '2014-12-01 15:12:16', '2014-12-08 11:12:39', NULL, 2);


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO location (idlocation, location_name, location_code, status, display, deleted, userin, datein, usermod, datemod) VALUES (1, '1111', 'sfsds', 1, NULL, NULL, '0', '2017-03-20', '0', '2017-03-20');


--
-- Data for Name: loginlog; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:08:16', '2014-08-19', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-19 11:08:16', '2014-08-19 11:08:16', '127.0.0.1', 2, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:08:09', '2014-08-19', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-19 11:08:09', '2014-08-19 11:08:09', '127.0.0.1', 3, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:08:45', '2014-08-19', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-19 11:08:45', '2014-08-19 11:08:45', '127.0.0.1', 4, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:08:23', '2014-08-19', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-19 11:08:23', '2014-08-19 11:08:23', '127.0.0.1', 5, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '21:08:57', '2014-08-19', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-19 21:08:57', '2014-08-19 21:08:57', '127.0.0.1', 6, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '10:08:24', '2014-08-20', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-20 10:08:24', '2014-08-20 10:08:24', '127.0.0.1', 7, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '17:08:08', '2014-08-20', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-20 17:08:08', '2014-08-20 17:08:08', '127.0.0.1', 8, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '00:08:02', '2014-08-21', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-21 00:08:02', '2014-08-21 00:08:02', '127.0.0.1', 9, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '16:08:53', '2014-08-21', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-21 16:08:53', '2014-08-21 16:08:53', '127.0.0.1', 10, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '21:08:50', '2014-08-21', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-21 21:08:50', '2014-08-21 21:08:50', '127.0.0.1', 11, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:08:49', '2014-08-22', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-22 15:08:49', '2014-08-22 15:08:49', '127.0.0.1', 12, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:08:13', '2014-08-23', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-23 15:08:13', '2014-08-23 15:08:13', '127.0.0.1', 13, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '21:08:28', '2014-08-23', '08', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', NULL, NULL, '2014-08-23 21:08:28', '2014-08-23 21:08:28', '127.0.0.1', 14, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '01:08:49', '2014-08-24', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-24 01:08:49', '2014-08-24 01:08:49', '127.0.0.1', 15, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:08:41', '2014-08-24', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-24 15:08:41', '2014-08-24 15:08:41', '127.0.0.1', 16, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:08:06', '2014-08-24', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-24 15:08:06', '2014-08-24 15:08:06', '127.0.0.1', 17, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '22:08:43', '2014-08-24', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-24 22:08:43', '2014-08-24 22:08:43', '127.0.0.1', 18, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '23:08:56', '2014-08-25', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-25 23:08:56', '2014-08-25 23:08:56', '127.0.0.1', 19, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '18:08:31', '2014-08-26', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-26 18:08:31', '2014-08-26 18:08:31', '127.0.0.1', 20, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '20:08:02', '2014-08-26', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-26 20:08:02', '2014-08-26 20:08:02', '127.0.0.1', 21, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '23:08:55', '2014-08-27', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/sppd/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-27 23:08:55', '2014-08-27 23:08:55', '127.0.0.1', 22, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '00:08:53', '2014-08-28', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/sppd/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-28 00:08:53', '2014-08-28 00:08:53', '127.0.0.1', 23, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:08:04', '2014-08-28', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-28 07:08:04', '2014-08-28 07:08:04', '127.0.0.1', 24, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:08:20', '2014-08-28', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-28 07:08:20', '2014-08-28 07:08:20', '127.0.0.1', 25, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '10:08:57', '2014-08-28', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-28 10:08:57', '2014-08-28 10:08:57', '127.0.0.1', 26, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '16:08:44', '2014-08-28', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-28 16:08:44', '2014-08-28 16:08:44', '127.0.0.1', 27, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '14:08:19', '2014-08-29', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-29 14:08:19', '2014-08-29 14:08:19', '127.0.0.1', 28, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '17:08:14', '2014-08-29', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-29 17:08:14', '2014-08-29 17:08:14', '127.0.0.1', 29, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '22:08:01', '2014-08-29', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-29 22:08:01', '2014-08-29 22:08:01', '127.0.0.1', 30, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '00:08:14', '2014-08-30', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-30 00:08:14', '2014-08-30 00:08:14', '127.0.0.1', 31, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '00:08:56', '2014-08-30', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-30 00:08:56', '2014-08-30 00:08:56', '127.0.0.1', 32, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '23:08:59', '2014-08-30', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-30 23:08:59', '2014-08-30 23:08:59', '127.0.0.1', 33, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '19:08:46', '2014-08-31', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-08-31 19:08:46', '2014-08-31 19:08:46', '127.0.0.1', 34, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '00:09:55', '2014-09-01', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-01 00:09:55', '2014-09-01 00:09:55', '127.0.0.1', 35, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:09:02', '2014-09-02', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-02 11:09:02', '2014-09-02 11:09:02', '127.0.0.1', 36, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '14:09:33', '2014-09-02', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-02 14:09:33', '2014-09-02 14:09:33', '127.0.0.1', 37, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '17:09:07', '2014-09-02', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-02 17:09:07', '2014-09-02 17:09:07', '127.0.0.1', 38, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '18:09:38', '2014-09-02', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-02 18:09:38', '2014-09-02 18:09:38', '127.0.0.1', 39, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '21:09:59', '2014-09-02', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-02 21:09:59', '2014-09-02 21:09:59', '127.0.0.1', 40, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '06:09:10', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 06:09:10', '2014-09-04 06:09:10', '127.0.0.1', 41, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '07:09:08', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 07:09:08', '2014-09-04 07:09:08', '127.0.0.1', 42, 'unit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '07:09:08', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 07:09:08', '2014-09-04 07:09:08', '127.0.0.1', 43, 'unit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:09:07', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 07:09:07', '2014-09-04 07:09:07', '127.0.0.1', 44, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '07:09:15', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 07:09:15', '2014-09-04 07:09:15', '127.0.0.1', 45, 'unit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:09:13', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 07:09:13', '2014-09-04 07:09:13', '127.0.0.1', 46, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:09:16', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 07:09:16', '2014-09-04 07:09:16', '127.0.0.1', 47, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '07:09:23', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 07:09:23', '2014-09-04 07:09:23', '127.0.0.1', 48, 'unit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:09:46', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 07:09:46', '2014-09-04 07:09:46', '127.0.0.1', 49, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:09:42', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 07:09:42', '2014-09-04 07:09:42', '127.0.0.1', 50, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:09:59', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 07:09:59', '2014-09-04 07:09:59', '127.0.0.1', 51, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '07:09:34', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 07:09:34', '2014-09-04 07:09:34', '127.0.0.1', 52, 'unit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:09:47', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 07:09:47', '2014-09-04 07:09:47', '127.0.0.1', 53, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '09:09:19', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 09:09:19', '2014-09-04 09:09:19', '127.0.0.1', 54, 'unit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '10:09:29', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 10:09:29', '2014-09-04 10:09:29', '127.0.0.1', 55, 'unit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:09:28', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 11:09:28', '2014-09-04 11:09:28', '127.0.0.1', 56, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:09:56', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 11:09:56', '2014-09-04 11:09:56', '127.0.0.1', 57, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '11:09:23', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 11:09:23', '2014-09-04 11:09:23', '127.0.0.1', 58, 'unit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '12:09:08', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 12:09:08', '2014-09-04 12:09:08', '127.0.0.1', 59, 'unit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '15:09:32', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 15:09:32', '2014-09-04 15:09:32', '127.0.0.1', 60, 'adminunit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '15:09:56', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 15:09:56', '2014-09-04 15:09:56', '127.0.0.1', 61, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '16:09:39', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 16:09:39', '2014-09-04 16:09:39', '127.0.0.1', 62, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '17:09:02', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 17:09:02', '2014-09-04 17:09:02', '127.0.0.1', 63, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '17:09:59', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 17:09:59', '2014-09-04 17:09:59', '127.0.0.1', 64, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '17:09:38', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 17:09:38', '2014-09-04 17:09:38', '127.0.0.1', 65, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '22:09:39', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 22:09:39', '2014-09-04 22:09:39', '127.0.0.1', 96, 'adminunit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '22:09:24', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 22:09:24', '2014-09-04 22:09:24', '127.0.0.1', 97, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '23:09:34', '2014-09-04', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', NULL, NULL, '2014-09-04 23:09:34', '2014-09-04 23:09:34', '127.0.0.1', 98, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '23:09:12', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 23:09:12', '2014-09-04 23:09:12', '127.0.0.1', 99, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '23:09:34', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-04 23:09:34', '2014-09-04 23:09:34', '127.0.0.1', 100, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:09:23', '2014-09-05', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-05 15:09:23', '2014-09-05 15:09:23', '127.0.0.1', 101, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '20:09:56', '2014-09-05', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-05 20:09:56', '2014-09-05 20:09:56', '127.0.0.1', 102, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '20:09:11', '2014-09-05', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', NULL, NULL, '2014-09-05 20:09:11', '2014-09-05 20:09:11', '127.0.0.1', 103, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '10:09:46', '2014-09-06', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-06 10:09:46', '2014-09-06 10:09:46', '127.0.0.1', 104, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '06:09:43', '2014-09-07', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-07 06:09:43', '2014-09-07 06:09:43', '127.0.0.1', 105, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:09:45', '2014-09-07', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-07 15:09:45', '2014-09-07 15:09:45', '127.0.0.1', 106, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '18:09:29', '2014-09-07', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-07 18:09:29', '2014-09-07 18:09:29', '127.0.0.1', 107, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '20:09:26', '2014-09-07', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-07 20:09:26', '2014-09-07 20:09:26', '127.0.0.1', 108, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '06:09:48', '2014-09-08', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-08 06:09:48', '2014-09-08 06:09:48', '127.0.0.1', 109, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '06:09:06', '2014-09-08', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-08 06:09:06', '2014-09-08 06:09:06', '127.0.0.1', 110, 'adminunit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '06:09:18', '2014-09-08', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-08 06:09:18', '2014-09-08 06:09:18', '127.0.0.1', 111, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '12:09:20', '2014-09-08', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-08 12:09:20', '2014-09-08 12:09:20', '127.0.0.1', 112, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '06:09:30', '2014-09-09', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-09 06:09:30', '2014-09-09 06:09:30', '127.0.0.1', 113, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '09:09:26', '2014-09-09', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-09 09:09:26', '2014-09-09 09:09:26', '127.0.0.1', 114, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '17:09:30', '2014-09-09', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-09 17:09:30', '2014-09-09 17:09:30', '127.0.0.1', 115, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '06:09:59', '2014-09-10', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-10 06:09:59', '2014-09-10 06:09:59', '127.0.0.1', 116, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '08:09:41', '2014-09-10', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-10 08:09:41', '2014-09-10 08:09:41', '127.0.0.1', 117, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '21:09:49', '2014-09-10', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-10 21:09:49', '2014-09-10 21:09:49', '127.0.0.1', 118, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:09:49', '2014-09-12', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-12 15:09:49', '2014-09-12 15:09:49', '127.0.0.1', 119, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '16:09:07', '2014-09-12', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-12 16:09:07', '2014-09-12 16:09:07', '127.0.0.1', 120, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '16:09:55', '2014-09-12', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-12 16:09:55', '2014-09-12 16:09:55', '127.0.0.1', 121, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '16:09:25', '2014-09-12', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-12 16:09:25', '2014-09-12 16:09:25', '127.0.0.1', 122, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '00:09:03', '2014-09-13', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-13 00:09:03', '2014-09-13 00:09:03', '127.0.0.1', 123, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '00:09:19', '2014-09-13', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-13 00:09:19', '2014-09-13 00:09:19', '127.0.0.1', 124, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '19:09:13', '2014-09-13', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-13 19:09:13', '2014-09-13 19:09:13', '127.0.0.1', 125, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '09:09:17', '2014-09-14', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', NULL, NULL, '2014-09-14 09:09:17', '2014-09-14 09:09:17', '127.0.0.1', 126, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '13:09:48', '2014-09-14', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-14 13:09:48', '2014-09-14 13:09:48', '127.0.0.1', 127, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '21:09:41', '2014-09-14', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-14 21:09:41', '2014-09-14 21:09:41', '127.0.0.1', 128, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '09:09:01', '2014-09-15', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-15 09:09:01', '2014-09-15 09:09:01', '127.0.0.1', 129, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '19:09:04', '2014-09-15', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-15 19:09:04', '2014-09-15 19:09:04', '127.0.0.1', 130, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '14:09:57', '2014-09-16', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-16 14:09:57', '2014-09-16 14:09:57', '127.0.0.1', 131, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '16:09:29', '2014-09-18', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-18 16:09:29', '2014-09-18 16:09:29', '127.0.0.1', 132, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '17:09:55', '2014-09-18', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-18 17:09:55', '2014-09-18 17:09:55', '127.0.0.1', 133, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '10:09:18', '2014-09-19', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-19 10:09:18', '2014-09-19 10:09:18', '127.0.0.1', 134, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:09:33', '2014-09-20', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-20 11:09:33', '2014-09-20 11:09:33', '127.0.0.1', 135, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:09:39', '2014-09-20', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-20 15:09:39', '2014-09-20 15:09:39', '127.0.0.1', 136, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '18:09:25', '2014-09-20', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', NULL, NULL, '2014-09-20 18:09:25', '2014-09-20 18:09:25', '127.0.0.1', 137, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '19:09:17', '2014-09-21', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-21 19:09:17', '2014-09-21 19:09:17', '127.0.0.1', 138, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '21:09:12', '2014-09-21', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-21 21:09:12', '2014-09-21 21:09:12', '127.0.0.1', 139, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '14:09:33', '2014-09-22', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-22 14:09:33', '2014-09-22 14:09:33', '127.0.0.1', 140, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:09:44', '2014-09-23', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-23 11:09:44', '2014-09-23 11:09:44', '127.0.0.1', 141, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '10:09:59', '2014-09-24', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-24 10:09:59', '2014-09-24 10:09:59', '127.0.0.1', 142, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '12:09:36', '2014-09-24', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-24 12:09:36', '2014-09-24 12:09:36', '127.0.0.1', 143, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '10:09:43', '2014-09-25', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-25 10:09:43', '2014-09-25 10:09:43', '127.0.0.1', 144, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '06:09:50', '2014-09-26', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', NULL, NULL, '2014-09-26 06:09:50', '2014-09-26 06:09:50', '127.0.0.1', 145, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '13:09:15', '2014-09-26', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', NULL, NULL, '2014-09-26 13:09:15', '2014-09-26 13:09:15', '127.0.0.1', 146, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '21:09:00', '2014-09-26', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-26 21:09:00', '2014-09-26 21:09:00', '127.0.0.1', 147, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '13:10:45', '2014-10-21', '10', '2014', '1', 'Firefox', '24.0', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', NULL, NULL, '2014-10-21 13:10:45', '2014-10-21 13:10:45', '192.168.56.111', 177, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '21:09:51', '2014-09-26', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-26 21:09:51', '2014-09-26 21:09:51', '127.0.0.1', 148, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:09:03', '2014-09-27', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-27 11:09:03', '2014-09-27 11:09:03', '127.0.0.1', 149, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '18:09:34', '2014-09-27', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-27 18:09:34', '2014-09-27 18:09:34', '127.0.0.1', 150, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '20:09:15', '2014-09-27', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', NULL, NULL, '2014-09-27 20:09:15', '2014-09-27 20:09:15', '127.0.0.1', 151, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '23:09:35', '2014-09-28', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-28 23:09:35', '2014-09-28 23:09:35', '127.0.0.1', 152, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '10:09:21', '2014-09-30', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-09-30 10:09:21', '2014-09-30 10:09:21', '127.0.0.1', 153, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '21:10:54', '2014-10-01', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-10-01 21:10:54', '2014-10-01 21:10:54', '127.0.0.1', 154, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '23:10:53', '2014-10-02', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-10-02 23:10:53', '2014-10-02 23:10:53', '127.0.0.1', 155, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:10:26', '2014-10-03', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-10-03 07:10:26', '2014-10-03 07:10:26', '127.0.0.1', 156, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:10:28', '2014-10-03', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-10-03 15:10:28', '2014-10-03 15:10:28', '127.0.0.1', 157, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:10:42', '2014-10-05', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-10-05 07:10:42', '2014-10-05 07:10:42', '127.0.0.1', 158, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '00:10:10', '2014-10-06', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-10-06 00:10:10', '2014-10-06 00:10:10', '127.0.0.1', 159, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '02:10:20', '2014-10-06', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-10-06 02:10:20', '2014-10-06 02:10:20', '127.0.0.1', 160, 'xxx');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '02:10:51', '2014-10-06', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-10-06 02:10:51', '2014-10-06 02:10:51', '127.0.0.1', 161, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '09:10:20', '2014-10-06', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-10-06 09:10:20', '2014-10-06 09:10:20', '127.0.0.1', 162, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '10:10:09', '2014-10-06', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-10-06 10:10:09', '2014-10-06 10:10:09', '127.0.0.1', 163, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '08:10:27', '2014-10-08', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-10-08 08:10:27', '2014-10-08 08:10:27', '192.168.56.1', 164, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '08:10:03', '2014-10-08', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-10-08 08:10:03', '2014-10-08 08:10:03', '192.168.56.1', 165, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:10:40', '2014-10-08', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', NULL, NULL, '2014-10-08 15:10:40', '2014-10-08 15:10:40', '192.168.56.1', 166, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '20:10:55', '2014-10-08', '10', '2014', '1', 'Chrome', '37.0.2062.124', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36', NULL, NULL, '2014-10-08 20:10:55', '2014-10-08 20:10:55', '192.168.56.1', 167, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '20:10:35', '2014-10-08', '10', '2014', '1', 'Chrome', '38.0.2125.101', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36', NULL, NULL, '2014-10-08 20:10:35', '2014-10-08 20:10:35', '192.168.56.1', 168, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '01:10:28', '2014-10-14', '10', '2014', '1', 'Chrome', '38.0.2125.101', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36', NULL, NULL, '2014-10-14 01:10:28', '2014-10-14 01:10:28', '192.168.56.1', 169, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '14:10:47', '2014-10-14', '10', '2014', '1', 'Chrome', '38.0.2125.101', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36', NULL, NULL, '2014-10-14 14:10:47', '2014-10-14 14:10:47', '192.168.56.1', 170, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '14:10:01', '2014-10-14', '10', '2014', '1', 'Firefox', '24.0', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', NULL, NULL, '2014-10-14 14:10:01', '2014-10-14 14:10:01', '192.168.56.111', 171, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '14:10:16', '2014-10-14', '10', '2014', '1', 'Firefox', '32.0', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0', NULL, NULL, '2014-10-14 14:10:16', '2014-10-14 14:10:16', '192.168.56.1', 172, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '19:10:34', '2014-10-16', '10', '2014', '1', 'Chrome', '38.0.2125.101', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36', NULL, NULL, '2014-10-16 19:10:34', '2014-10-16 19:10:34', '192.168.56.1', 173, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:10:45', '2014-10-17', '10', '2014', '1', 'Chrome', '38.0.2125.101', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36', NULL, NULL, '2014-10-17 15:10:45', '2014-10-17 15:10:45', '192.168.56.1', 174, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '18:10:04', '2014-10-18', '10', '2014', '1', 'Firefox', '32.0', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0', NULL, NULL, '2014-10-18 18:10:04', '2014-10-18 18:10:04', '192.168.56.1', 175, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '06:10:01', '2014-10-19', '10', '2014', '1', 'Chrome', '38.0.2125.104', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36', NULL, NULL, '2014-10-19 06:10:01', '2014-10-19 06:10:01', '192.168.56.1', 176, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '22:10:07', '2014-10-21', '10', '2014', '1', 'Chrome', '38.0.2125.104', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36', NULL, NULL, '2014-10-21 22:10:07', '2014-10-21 22:10:07', '192.168.56.1', 178, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '13:10:36', '2014-10-23', '10', '2014', '1', 'Chrome', '38.0.2125.104', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36', NULL, NULL, '2014-10-23 13:10:36', '2014-10-23 13:10:36', '192.168.56.1', 179, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '19:10:59', '2014-10-23', '10', '2014', '1', 'Chrome', '38.0.2125.104', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36', NULL, NULL, '2014-10-23 19:10:59', '2014-10-23 19:10:59', '192.168.56.1', 180, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '19:10:05', '2014-10-23', '10', '2014', '1', 'Chrome', '29.0.1547.72', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36', NULL, NULL, '2014-10-23 19:10:05', '2014-10-23 19:10:05', '192.168.56.1', 181, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '19:10:58', '2014-10-23', '10', '2014', '1', 'Chrome', '38.0.2125.104', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36', NULL, NULL, '2014-10-23 19:10:58', '2014-10-23 19:10:58', '192.168.56.1', 182, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '17:10:20', '2014-10-27', '10', '2014', '1', 'Chrome', '38.0.2125.104', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36', NULL, NULL, '2014-10-27 17:10:20', '2014-10-27 17:10:20', '192.168.56.1', 183, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '22:10:30', '2014-10-28', '10', '2014', '1', 'Chrome', '38.0.2125.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36', NULL, NULL, '2014-10-28 22:10:30', '2014-10-28 22:10:30', '192.168.56.1', 184, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:11:06', '2014-11-04', '11', '2014', '1', 'Firefox', '32.0', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0', NULL, NULL, '2014-11-04 11:11:06', '2014-11-04 11:11:06', '192.168.56.1', 185, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:11:00', '2014-11-05', '11', '2014', '1', 'Chrome', '38.0.2125.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36', NULL, NULL, '2014-11-05 11:11:00', '2014-11-05 11:11:00', '192.168.56.1', 186, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:11:32', '2014-11-05', '11', '2014', '1', 'Chrome', '38.0.2125.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36', NULL, NULL, '2014-11-05 11:11:32', '2014-11-05 11:11:32', '192.168.56.1', 187, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '11:11:21', '2014-11-05', '11', '2014', '1', 'Chrome', '38.0.2125.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36', NULL, NULL, '2014-11-05 11:11:21', '2014-11-05 11:11:21', '192.168.56.1', 188, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:11:54', '2014-11-05', '11', '2014', '1', 'Firefox', '32.0', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0', NULL, NULL, '2014-11-05 15:11:54', '2014-11-05 15:11:54', '192.168.56.1', 189, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '08:11:35', '2014-11-06', '11', '2014', '1', 'Chrome', '38.0.2125.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36', NULL, NULL, '2014-11-06 08:11:35', '2014-11-06 08:11:35', '192.168.56.1', 190, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:11:10', '2014-11-20', '11', '2014', '1', 'Chrome', '38.0.2125.122', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36', NULL, NULL, '2014-11-20 15:11:10', '2014-11-20 15:11:10', '192.168.56.1', 191, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '10:12:20', '2014-12-01', '12', '2014', '1', 'Chrome', '39.0.2171.65', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36', NULL, NULL, '2014-12-01 10:12:20', '2014-12-01 10:12:20', '192.168.56.1', 192, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:12:49', '2014-12-01', '12', '2014', '1', 'Firefox', '33.0', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:33.0) Gecko/20100101 Firefox/33.0', NULL, NULL, '2014-12-01 07:12:49', '2014-12-01 07:12:49', '192.168.56.1', 193, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:12:30', '2014-12-01', '12', '2014', '1', 'Chrome', '39.0.2171.65', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36', NULL, NULL, '2014-12-01 07:12:30', '2014-12-01 07:12:30', '192.168.56.1', 194, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:12:23', '2014-12-01', '12', '2014', '1', 'Chrome', '39.0.2171.65', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36', NULL, NULL, '2014-12-01 07:12:24', '2014-12-01 07:12:24', '192.168.56.1', 195, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:12:49', '2014-12-01', '12', '2014', '1', 'Chrome', '39.0.2171.65', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36', NULL, NULL, '2014-12-01 07:12:49', '2014-12-01 07:12:49', '192.168.56.1', 196, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '07:12:16', '2014-12-01', '12', '2014', '1', 'Chrome', '39.0.2171.65', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36', NULL, NULL, '2014-12-01 07:12:16', '2014-12-01 07:12:16', '192.168.56.1', 197, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '14:12:13', '2014-12-01', '12', '2014', '1', 'Chrome', '39.0.2171.65', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36', NULL, NULL, '2014-12-01 14:12:13', '2014-12-01 14:12:13', '192.168.56.1', 198, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '22:12:34', '2014-12-14', '12', '2014', '1', 'Chrome', '39.0.2171.71', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36', NULL, NULL, '2014-12-14 22:12:34', '2014-12-14 22:12:34', '192.168.56.1', 199, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:12:03', '2014-12-26', '12', '2014', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2014-12-26 11:12:03', '2014-12-26 11:12:03', '192.168.56.1', 200, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '13:01:20', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 13:01:20', '2015-01-04 13:01:20', '192.168.56.1', 201, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '22:01:17', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 22:01:17', '2015-01-04 22:01:17', '192.168.56.1', 202, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '22:01:11', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 22:01:11', '2015-01-04 22:01:11', '192.168.56.1', 203, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '22:01:45', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 22:01:45', '2015-01-04 22:01:45', '192.168.56.1', 204, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '22:01:16', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 22:01:16', '2015-01-04 22:01:16', '192.168.56.1', 205, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '22:01:33', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 22:01:33', '2015-01-04 22:01:33', '192.168.56.1', 206, 'adminunit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '22:01:03', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 22:01:03', '2015-01-04 22:01:03', '192.168.56.1', 207, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '22:01:07', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 22:01:07', '2015-01-04 22:01:07', '192.168.56.1', 208, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '22:01:45', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 22:01:45', '2015-01-04 22:01:45', '192.168.56.1', 209, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '22:01:57', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 22:01:57', '2015-01-04 22:01:57', '192.168.56.1', 210, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '23:01:06', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 23:01:06', '2015-01-04 23:01:06', '192.168.56.1', 211, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '23:01:26', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 23:01:26', '2015-01-04 23:01:26', '192.168.56.1', 212, 'xxx');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '23:01:41', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 23:01:41', '2015-01-04 23:01:41', '192.168.56.1', 213, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '23:01:10', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-04 23:01:10', '2015-01-04 23:01:10', '192.168.56.1', 214, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '03:01:58', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-05 03:01:58', '2015-01-05 03:01:58', '192.168.56.1', 215, NULL);
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '03:01:06', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-05 03:01:06', '2015-01-05 03:01:06', '192.168.56.1', 216, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '03:01:28', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-05 03:01:28', '2015-01-05 03:01:28', '192.168.56.1', 217, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '03:01:46', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-05 03:01:46', '2015-01-05 03:01:46', '192.168.56.1', 218, 'adminunit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '04:01:43', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-05 04:01:43', '2015-01-05 04:01:43', '192.168.56.1', 219, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '04:01:04', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-05 04:01:04', '2015-01-05 04:01:04', '192.168.56.1', 220, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:01:41', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-05 11:01:41', '2015-01-05 11:01:41', '192.168.56.1', 221, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '11:01:13', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-05 11:01:13', '2015-01-05 11:01:13', '192.168.56.1', 222, 'adminunit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '11:01:41', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-05 11:01:41', '2015-01-05 11:01:41', '192.168.56.1', 223, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:01:35', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-05 11:01:35', '2015-01-05 11:01:35', '192.168.56.1', 224, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:01:27', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-05 11:01:27', '2015-01-05 11:01:27', '192.168.56.1', 225, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:01:56', '2015-01-05', '01', '2015', '1', 'Firefox', '34.0', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0', NULL, NULL, '2015-01-05 11:01:56', '2015-01-05 11:01:56', '192.168.56.1', 226, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '11:01:40', '2015-01-05', '01', '2015', '1', 'Firefox', '34.0', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0', NULL, NULL, '2015-01-05 11:01:40', '2015-01-05 11:01:40', '192.168.56.1', 227, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '19:01:05', '2015-01-06', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-06 19:01:05', '2015-01-06 19:01:05', '192.168.56.1', 228, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '09:01:58', '2015-01-14', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-14 09:01:58', '2015-01-14 09:01:58', '192.168.56.1', 229, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '10:01:05', '2015-01-14', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-14 10:01:05', '2015-01-14 10:01:05', '192.168.56.1', 230, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '11:01:46', '2015-01-14', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-14 11:01:46', '2015-01-14 11:01:46', '192.168.56.1', 231, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '11:01:35', '2015-01-14', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', NULL, NULL, '2015-01-14 11:01:35', '2015-01-14 11:01:35', '192.168.56.1', 232, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '20:01:00', '2015-01-17', '01', '2015', '1', 'Chrome', '39.0.2171.99', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36', NULL, NULL, '2015-01-17 20:01:00', '2015-01-17 20:01:00', '192.168.56.1', 233, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:01:53', '2015-01-24', '01', '2015', '1', 'Chrome', '39.0.2171.99', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36', NULL, NULL, '2015-01-24 15:01:53', '2015-01-24 15:01:53', '192.168.56.1', 234, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '15:01:35', '2015-01-24', '01', '2015', '1', 'Chrome', '39.0.2171.99', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36', NULL, NULL, '2015-01-24 15:01:35', '2015-01-24 15:01:35', '192.168.56.1', 235, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '10:01:02', '2015-01-31', '01', '2015', '1', 'Chrome', '40.0.2214.94', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36', NULL, NULL, '2015-01-31 10:01:02', '2015-01-31 10:01:02', '192.168.56.1', 236, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:02:49', '2015-02-01', '02', '2015', '1', 'Chrome', '40.0.2214.94', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36', NULL, NULL, '2015-02-01 15:02:49', '2015-02-01 15:02:49', '192.168.56.1', 237, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '13:02:34', '2015-02-05', '02', '2015', '1', 'Chrome', '40.0.2214.94', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36', NULL, NULL, '2015-02-05 13:02:34', '2015-02-05 13:02:34', '192.168.56.1', 238, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '06:02:39', '2015-02-16', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', NULL, NULL, '2015-02-16 06:02:39', '2015-02-16 06:02:39', '192.168.56.1', 239, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '09:02:50', '2015-02-16', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', NULL, NULL, '2015-02-16 09:02:50', '2015-02-16 09:02:50', '192.168.56.1', 240, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:02:16', '2015-02-22', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', NULL, NULL, '2015-02-22 11:02:16', '2015-02-22 11:02:16', '192.168.56.1', 241, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '15:02:46', '2015-02-25', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', NULL, NULL, '2015-02-25 15:02:46', '2015-02-25 15:02:46', '192.168.56.1', 242, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '15:02:58', '2015-02-25', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', NULL, NULL, '2015-02-25 15:02:58', '2015-02-25 15:02:58', '192.168.56.1', 243, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '15:02:50', '2015-02-25', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', NULL, NULL, '2015-02-25 15:02:50', '2015-02-25 15:02:50', '192.168.56.1', 244, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '17:02:30', '2015-02-25', '02', '2015', '1', 'Chrome', '29.0.1547.72', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36', NULL, NULL, '2015-02-25 17:02:30', '2015-02-25 17:02:30', '192.168.56.1', 245, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '17:02:40', '2015-02-25', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', NULL, NULL, '2015-02-25 17:02:40', '2015-02-25 17:02:40', '192.168.56.1', 246, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '22:02:30', '2015-02-25', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', NULL, NULL, '2015-02-25 22:02:30', '2015-02-25 22:02:30', '192.168.56.1', 247, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '22:02:29', '2015-02-25', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', NULL, NULL, '2015-02-25 22:02:29', '2015-02-25 22:02:29', '192.168.56.1', 248, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('3', '12:03:13', '2015-03-02', '03', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', NULL, NULL, '2015-03-02 12:03:13', '2015-03-02 12:03:13', '192.168.56.1', 249, 'adminunit2');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '09:03:22', '2015-03-04', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', NULL, NULL, '2015-03-04 09:03:22', '2015-03-04 09:03:22', '192.168.56.1', 250, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '09:03:12', '2015-03-04', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', NULL, NULL, '2015-03-04 09:03:12', '2015-03-04 09:03:12', '192.168.56.1', 251, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '17:03:24', '2015-03-06', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', NULL, NULL, '2015-03-06 17:03:24', '2015-03-06 17:03:24', '192.168.56.1', 252, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '17:03:28', '2015-03-06', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', NULL, NULL, '2015-03-06 17:03:28', '2015-03-06 17:03:28', '192.168.56.1', 253, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '16:03:58', '2015-03-11', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', NULL, NULL, '2015-03-11 16:03:58', '2015-03-11 16:03:58', '192.168.56.1', 254, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '18:03:40', '2015-03-11', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', NULL, NULL, '2015-03-11 18:03:40', '2015-03-11 18:03:40', '192.168.56.1', 255, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '02:03:16', '2015-03-13', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', NULL, NULL, '2015-03-13 02:03:16', '2015-03-13 02:03:16', '192.168.56.1', 256, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '02:03:52', '2015-03-13', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', NULL, NULL, '2015-03-13 02:03:52', '2015-03-13 02:03:52', '192.168.56.1', 257, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:03:43', '2015-03-13', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-03-13 11:03:43', '2015-03-13 11:03:43', '192.168.56.1', 258, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '11:03:59', '2015-03-13', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-03-13 11:03:59', '2015-03-13 11:03:59', '192.168.56.1', 259, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '11:03:19', '2015-03-14', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-03-14 11:03:19', '2015-03-14 11:03:19', '192.168.56.1', 260, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '12:03:20', '2015-03-14', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-03-14 12:03:20', '2015-03-14 12:03:20', '192.168.56.1', 261, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '10:03:29', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-03-21 10:03:29', '2015-03-21 10:03:29', '192.168.56.1', 262, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '10:03:49', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-03-21 10:03:49', '2015-03-21 10:03:49', '192.168.56.1', 263, 'adminunit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('2', '10:03:12', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-03-21 10:03:12', '2015-03-21 10:03:12', '192.168.56.1', 264, 'adminunit1');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '10:03:20', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-03-21 10:03:20', '2015-03-21 10:03:20', '192.168.56.1', 265, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '10:03:12', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-03-21 10:03:12', '2015-03-21 10:03:12', '192.168.56.1', 266, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '12:03:25', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-03-21 12:03:25', '2015-03-21 12:03:25', '192.168.56.1', 267, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '12:03:01', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-03-21 12:03:01', '2015-03-21 12:03:01', '192.168.56.1', 268, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '12:03:37', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-03-21 12:03:37', '2015-03-21 12:03:37', '192.168.56.1', 269, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '19:04:25', '2015-04-16', '04', '2015', '1', 'Chrome', '41.0.2272.118', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36', NULL, NULL, '2015-04-16 19:04:25', '2015-04-16 19:04:25', '192.168.56.1', 270, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '08:04:07', '2015-04-17', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-17 08:04:07', '2015-04-17 08:04:07', '192.168.56.1', 271, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '08:04:45', '2015-04-17', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-17 08:04:45', '2015-04-17 08:04:45', '192.168.56.1', 272, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '00:04:34', '2015-04-20', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-20 00:04:34', '2015-04-20 00:04:34', '192.168.56.1', 273, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '10:04:56', '2015-04-20', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-20 10:04:56', '2015-04-20 10:04:56', '192.168.56.1', 274, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '12:04:37', '2015-04-20', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-20 12:04:37', '2015-04-20 12:04:37', '192.168.56.1', 275, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '23:04:06', '2015-04-21', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-21 23:04:06', '2015-04-21 23:04:06', '192.168.56.1', 276, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '09:04:24', '2015-04-22', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-22 09:04:24', '2015-04-22 09:04:24', '192.168.56.1', 277, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '10:04:08', '2015-04-22', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-22 10:04:08', '2015-04-22 10:04:08', '192.168.1.5', 278, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '10:04:33', '2015-04-22', '04', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-04-22 10:04:33', '2015-04-22 10:04:33', '192.168.1.100', 279, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '10:04:54', '2015-04-22', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-22 10:04:54', '2015-04-22 10:04:54', '192.168.1.5', 280, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '11:04:44', '2015-04-22', '04', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', NULL, NULL, '2015-04-22 11:04:44', '2015-04-22 11:04:44', '192.168.1.100', 281, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '13:04:52', '2015-04-23', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-23 13:04:52', '2015-04-23 13:04:52', '192.168.56.1', 282, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '11:04:36', '2015-04-24', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-24 11:04:36', '2015-04-24 11:04:36', '192.168.56.1', 283, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '01:04:01', '2015-04-26', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-26 01:04:01', '2015-04-26 01:04:01', '192.168.56.1', 284, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '17:04:11', '2015-04-26', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-26 17:04:11', '2015-04-26 17:04:11', '192.168.56.1', 285, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('1', '17:04:28', '2015-04-26', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-26 17:04:28', '2015-04-26 17:04:28', '192.168.56.1', 286, 'admin');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '17:04:31', '2015-04-26', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-04-26 17:04:31', '2015-04-26 17:04:31', '192.168.56.1', 287, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '20:05:03', '2015-05-03', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-05-03 20:05:03', '2015-05-03 20:05:03', '192.168.56.1', 288, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '20:05:52', '2015-05-03', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-05-03 20:05:52', '2015-05-03 20:05:52', '192.168.56.1', 289, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '20:05:43', '2015-05-03', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-05-03 20:05:43', '2015-05-03 20:05:43', '192.168.56.1', 290, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:05:43', '2015-05-04', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-05-04 11:05:43', '2015-05-04 11:05:43', '::1', 291, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:05:55', '2015-05-04', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-05-04 11:05:55', '2015-05-04 11:05:55', '::1', 292, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '11:05:50', '2015-05-04', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', NULL, NULL, '2015-05-04 11:05:50', '2015-05-04 11:05:50', '192.168.1.3', 293, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '14:05:06', '2015-05-04', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://localhost/aktiva/login', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-05-04 14:05:06', '2015-05-04 14:05:06', '::1', 294, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '15:05:13', '2015-05-04', '05', '2015', '1', 'Safari', '534.11', 'BlackBerry', '', 'http://192.168.1.100/aktiva/login', 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9320; id) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.398 Mobile Safari/534.11+', NULL, NULL, '2015-05-04 15:05:13', '2015-05-04 15:05:13', '192.168.1.8', 295, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '12:05:29', '2015-05-07', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', NULL, NULL, '2015-05-07 12:05:29', '2015-05-07 12:05:29', '::1', 296, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '12:05:34', '2015-05-07', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', NULL, NULL, '2015-05-07 12:05:34', '2015-05-07 12:05:34', '192.168.1.3', 297, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '12:05:17', '2015-05-07', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://192.168.1.100/aktiva/login', 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', NULL, NULL, '2015-05-07 12:05:17', '2015-05-07 12:05:17', '192.168.1.3', 298, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '13:05:32', '2015-05-07', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://localhost/aktiva/login', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', NULL, NULL, '2015-05-07 13:05:32', '2015-05-07 13:05:32', '::1', 299, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '13:05:54', '2015-05-07', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', NULL, NULL, '2015-05-07 13:05:54', '2015-05-07 13:05:54', '192.168.1.10', 300, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '13:05:46', '2015-05-07', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://192.168.1.100/aktiva/login', 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', NULL, NULL, '2015-05-07 13:05:46', '2015-05-07 13:05:46', '192.168.1.3', 301, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '14:05:11', '2015-05-20', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', NULL, NULL, '2015-05-20 14:05:11', '2015-05-20 14:05:11', '192.168.56.1', 302, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '18:08:09', '2015-08-10', '08', '2015', '1', 'Chrome', '44.0.2403.130', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Safari/537.36', NULL, NULL, '2015-08-10 18:08:09', '2015-08-10 18:08:09', '192.168.56.1', 303, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '18:08:00', '2015-08-10', '08', '2015', '1', 'Chrome', '44.0.2403.130', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Safari/537.36', NULL, NULL, '2015-08-10 18:08:00', '2015-08-10 18:08:00', '192.168.56.1', 304, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '20:09:57', '2015-09-06', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.112/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', NULL, NULL, '2015-09-06 20:09:57', '2015-09-06 20:09:57', '192.168.56.1', 305, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '22:09:05', '2015-09-06', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', NULL, NULL, '2015-09-06 22:09:05', '2015-09-06 22:09:05', '192.168.56.1', 306, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '22:09:52', '2015-09-06', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', NULL, NULL, '2015-09-06 22:09:52', '2015-09-06 22:09:52', '192.168.56.1', 307, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '22:09:15', '2015-09-06', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', NULL, NULL, '2015-09-06 22:09:15', '2015-09-06 22:09:15', '192.168.56.1', 308, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '09:09:36', '2015-09-07', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', NULL, NULL, '2015-09-07 09:09:36', '2015-09-07 09:09:36', '192.168.56.1', 309, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '09:09:47', '2015-09-07', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', NULL, NULL, '2015-09-07 09:09:47', '2015-09-07 09:09:47', '192.168.56.1', 310, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '09:09:20', '2015-09-07', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', NULL, NULL, '2015-09-07 09:09:20', '2015-09-07 09:09:20', '192.168.56.1', 311, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '09:09:09', '2015-09-07', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', NULL, NULL, '2015-09-07 09:09:09', '2015-09-07 09:09:09', '192.168.56.1', 312, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '11:09:25', '2015-09-07', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', NULL, NULL, '2015-09-07 11:09:25', '2015-09-07 11:09:25', '192.168.56.1', 313, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:09:56', '2015-09-07', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', NULL, NULL, '2015-09-07 11:09:56', '2015-09-07 11:09:56', '192.168.56.1', 314, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '09:11:28', '2015-11-12', '11', '2015', '1', 'Chrome', '46.0.2490.80', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36', NULL, NULL, '2015-11-12 09:11:28', '2015-11-12 09:11:28', '192.168.56.1', 315, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '13:11:16', '2015-11-12', '11', '2015', '1', 'Chrome', '46.0.2490.80', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36', NULL, NULL, '2015-11-12 13:11:16', '2015-11-12 13:11:16', '192.168.56.1', 316, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '13:11:16', '2015-11-13', '11', '2015', '1', 'Chrome', '46.0.2490.86', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36', NULL, NULL, '2015-11-13 13:11:16', '2015-11-13 13:11:16', '192.168.56.1', 317, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '13:11:25', '2015-11-16', '11', '2015', '1', 'Chrome', '46.0.2490.86', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36', NULL, NULL, '2015-11-16 13:11:25', '2015-11-16 13:11:25', '192.168.56.1', 318, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '13:11:08', '2015-11-19', '11', '2015', '1', 'Chrome', '46.0.2490.86', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36', NULL, NULL, '2015-11-19 13:11:08', '2015-11-19 13:11:08', '192.168.56.1', 319, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '12:12:35', '2015-12-04', '12', '2015', '1', 'Chrome', '46.0.2490.86', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36', NULL, NULL, '2015-12-04 12:12:35', '2015-12-04 12:12:35', '192.168.56.1', 320, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '12:12:06', '2015-12-16', '12', '2015', '1', 'Chrome', '47.0.2526.80', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36', NULL, NULL, '2015-12-16 12:12:06', '2015-12-16 12:12:06', '192.168.56.1', 321, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '10:12:24', '2015-12-23', '12', '2015', '1', 'Chrome', '47.0.2526.106', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36', NULL, NULL, '2015-12-23 10:12:24', '2015-12-23 10:12:24', '192.168.56.1', 322, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:12:36', '2015-12-23', '12', '2015', '1', 'Chrome', '47.0.2526.106', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36', NULL, NULL, '2015-12-23 11:12:36', '2015-12-23 11:12:36', '192.168.56.1', 323, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '19:01:23', '2016-01-04', '01', '2016', '1', 'Chrome', '47.0.2526.106', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36', NULL, NULL, '2016-01-04 19:01:23', '2016-01-04 19:01:23', '192.168.56.1', 324, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '18:01:48', '2016-01-17', '01', '2016', '1', 'Chrome', '47.0.2526.106', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36', NULL, NULL, '2016-01-17 18:01:48', '2016-01-17 18:01:48', '192.168.56.1', 325, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '21:01:26', '2016-01-27', '01', '2016', '1', 'Firefox', '43.0', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:43.0) Gecko/20100101 Firefox/43.0', NULL, NULL, '2016-01-27 21:01:26', '2016-01-27 21:01:26', '192.168.56.1', 326, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:02:11', '2016-02-22', '02', '2016', '1', 'Chrome', '48.0.2564.109', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36', NULL, NULL, '2016-02-22 11:02:11', '2016-02-22 11:02:11', '192.168.56.1', 327, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:04:09', '2016-04-26', '04', '2016', '1', 'Chrome', '50.0.2661.86', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36', NULL, NULL, '2016-04-26 11:04:09', '2016-04-26 11:04:09', '192.168.56.1', 328, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:04:22', '2016-04-26', '04', '2016', '1', 'Chrome', '50.0.2661.86', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36', NULL, NULL, '2016-04-26 11:04:22', '2016-04-26 11:04:22', '192.168.56.1', 329, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '23:05:14', '2016-05-02', '05', '2016', '1', 'Chrome', '50.0.2661.86', '', '', 'http://192.168.56.101/aktivaabg/', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36', NULL, NULL, '2016-05-02 23:05:14', '2016-05-02 23:05:14', '192.168.56.1', 330, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '23:05:07', '2016-05-02', '05', '2016', '1', 'Chrome', '50.0.2661.86', '', '', 'http://127.0.0.1:4567/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36', NULL, NULL, '2016-05-02 23:05:07', '2016-05-02 23:05:07', '10.0.2.2', 331, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:10:23', '2016-10-26', '10', '2016', '1', 'Chrome', '53.0.2785.143', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36', NULL, NULL, '2016-10-26 11:10:23', '2016-10-26 11:10:23', '202.62.17.192', 332, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '10:12:34', '2016-12-01', '12', '2016', '1', 'Chrome', '54.0.2840.98', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36', NULL, NULL, '2016-12-01 10:12:34', '2016-12-01 10:12:34', '140.0.244.117', 333, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:12:16', '2016-12-23', '12', '2016', '1', 'Chrome', '54.0.2840.98', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36', NULL, NULL, '2016-12-23 11:12:16', '2016-12-23 11:12:16', '61.94.217.193', 334, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '16:12:25', '2016-12-25', '12', '2016', '1', 'Chrome', '55.0.2883.95', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2016-12-25 16:12:25', '2016-12-25 16:12:25', '36.88.88.2', 335, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '19:12:08', '2016-12-29', '12', '2016', '1', 'Chrome', '55.0.2883.95', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2016-12-29 19:12:08', '2016-12-29 19:12:08', '120.188.2.111', 336, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '16:12:43', '2016-12-30', '12', '2016', '1', 'Chrome', '55.0.2883.87', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', NULL, NULL, '2016-12-30 16:12:43', '2016-12-30 16:12:43', '125.165.180.104', 337, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '17:12:29', '2016-12-30', '12', '2016', '1', 'Chrome', '55.0.2883.91', 'Generic Mobile', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Linux; Android 6.0.1; Redmi 3S Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36', NULL, NULL, '2016-12-30 17:12:29', '2016-12-30 17:12:29', '120.188.95.163', 338, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '17:12:59', '2016-12-30', '12', '2016', '1', 'Chrome', '55.0.2883.91', 'Generic Mobile', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Linux; Android 6.0.1; Redmi 3S Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36', NULL, NULL, '2016-12-30 17:12:59', '2016-12-30 17:12:59', '120.188.95.163', 339, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '09:12:58', '2016-12-31', '12', '2016', '1', 'Chrome', '55.0.2883.95', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2016-12-31 09:12:58', '2016-12-31 09:12:58', '112.215.201.189', 340, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '14:01:52', '2017-01-05', '01', '2017', '1', 'Firefox', '50.0', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0', NULL, NULL, '2017-01-05 14:01:52', '2017-01-05 14:01:52', '115.178.209.94', 341, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '14:01:57', '2017-01-05', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-05 14:01:57', '2017-01-05 14:01:57', '120.188.7.133', 342, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '21:01:32', '2017-01-05', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-05 21:01:32', '2017-01-05 21:01:32', '120.188.92.163', 343, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '08:01:15', '2017-01-06', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-06 08:01:15', '2017-01-06 08:01:15', '112.215.151.242', 344, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '14:01:39', '2017-01-06', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-06 14:01:39', '2017-01-06 14:01:39', '112.215.65.226', 345, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '14:01:26', '2017-01-09', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-09 14:01:26', '2017-01-09 14:01:26', '112.215.201.127', 346, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '03:01:58', '2017-01-10', '01', '2017', '1', 'Chrome', '55.0.2883.91', 'Generic Mobile', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Linux; Android 6.0.1; Redmi 3S Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36', NULL, NULL, '2017-01-10 03:01:58', '2017-01-10 03:01:58', '120.188.2.78', 347, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '03:01:34', '2017-01-10', '01', '2017', '1', 'Chrome', '55.0.2883.87', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', NULL, NULL, '2017-01-10 03:01:34', '2017-01-10 03:01:34', '36.78.210.110', 348, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '05:01:54', '2017-01-10', '01', '2017', '1', 'Firefox', '50.0', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0', NULL, NULL, '2017-01-10 05:01:54', '2017-01-10 05:01:54', '180.244.10.130', 349, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '05:01:26', '2017-01-10', '01', '2017', '1', 'Chrome', '55.0.2883.87', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', NULL, NULL, '2017-01-10 05:01:26', '2017-01-10 05:01:26', '120.188.93.1', 350, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '02:01:17', '2017-01-11', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-11 02:01:17', '2017-01-11 02:01:17', '112.215.45.231', 351, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '03:01:36', '2017-01-11', '01', '2017', '1', 'Chrome', '55.0.2883.87', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', NULL, NULL, '2017-01-11 03:01:36', '2017-01-11 03:01:36', '115.178.198.209', 352, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '14:01:12', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://localhost:8888/nusafin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-26 14:01:12', '2017-01-26 14:01:12', '::1', 363, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '14:01:54', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://localhost:8888/nusafin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-26 14:01:54', '2017-01-26 14:01:54', '::1', 362, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '05:01:45', '2017-01-16', '01', '2017', '1', 'Chrome', '55.0.2883.87', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', NULL, NULL, '2017-01-16 05:01:45', '2017-01-16 05:01:45', '39.254.141.254', 353, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:01:53', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://app.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-26 11:01:53', '2017-01-26 11:01:53', '114.4.82.232', 358, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '12:01:26', '2017-01-16', '01', '2017', '1', 'Chrome', '55.0.2883.87', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', NULL, NULL, '2017-01-16 12:01:26', '2017-01-16 12:01:26', '115.178.209.117', 354, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '14:01:34', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://localhost:8888/nusafin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-26 14:01:34', '2017-01-26 14:01:34', '::1', 361, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:01:01', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://app.nusafin.com/', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-26 11:01:01', '2017-01-26 11:01:01', '114.4.82.232', 360, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:01:27', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://app.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-26 11:01:27', '2017-01-26 11:01:27', '114.4.82.232', 359, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '19:01:57', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://localhost:8888/nusafin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-26 19:01:57', '2017-01-26 19:01:57', '::1', 364, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '10:01:40', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://app.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-26 10:01:40', '2017-01-26 10:01:40', '114.4.82.232', 357, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '09:01:34', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://app.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-26 09:01:34', '2017-01-26 09:01:34', '114.4.82.232', 355, 'adminsmk');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '10:01:37', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://app.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-01-26 10:01:37', '2017-01-26 10:01:37', '114.4.82.232', 356, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '10:01:50', '2017-01-30', '01', '2017', '1', 'Safari', '602.4.8', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/602.4.8 (KHTML, like Gecko) Version/10.0.3 Safari/602.4.8', NULL, NULL, '2017-01-30 10:01:50', '2017-01-30 10:01:50', '110.138.88.29', 365, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('7', '14:02:01', '2017-02-06', '02', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', NULL, NULL, '2017-02-06 14:02:01', '2017-02-06 14:02:01', '182.253.162.193', 366, 'administrator');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '08:02:13', '2017-02-13', '02', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-02-13 08:02:13', '2017-02-13 08:02:13', '120.188.35.195', 367, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '08:02:51', '2017-02-13', '02', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-02-13 08:02:51', '2017-02-13 08:02:51', '120.188.35.195', 368, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '08:02:49', '2017-02-13', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-02-13 08:02:49', '2017-02-13 08:02:49', '125.161.143.41', 369, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '16:02:31', '2017-02-13', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-02-13 16:02:31', '2017-02-13 16:02:31', '125.161.143.41', 370, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '17:02:00', '2017-02-16', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-02-16 17:02:00', '2017-02-16 17:02:00', '223.255.229.6', 371, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '17:02:58', '2017-02-16', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-02-16 17:02:58', '2017-02-16 17:02:58', '110.136.58.103', 372, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '18:02:58', '2017-02-16', '02', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-02-16 18:02:58', '2017-02-16 18:02:58', '120.188.7.221', 373, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '16:02:50', '2017-02-17', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-02-17 16:02:50', '2017-02-17 16:02:50', '110.136.58.103', 374, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '21:02:13', '2017-02-17', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-02-17 21:02:13', '2017-02-17 21:02:13', '110.136.58.103', 375, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '23:02:56', '2017-02-17', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-02-17 23:02:56', '2017-02-17 23:02:56', '110.136.58.103', 376, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '01:02:38', '2017-02-23', '02', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-02-23 01:02:38', '2017-02-23 01:02:38', '39.250.126.199', 377, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '17:03:10', '2017-03-01', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-01 17:03:10', '2017-03-01 17:03:10', '112.215.200.127', 378, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '18:03:26', '2017-03-01', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-03-01 18:03:26', '2017-03-01 18:03:26', '223.255.230.13', 379, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '22:03:06', '2017-03-03', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-03 22:03:06', '2017-03-03 22:03:06', '120.188.67.126', 380, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '16:03:19', '2017-03-05', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-05 16:03:19', '2017-03-05 16:03:19', '120.188.67.199', 381, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '21:03:27', '2017-03-06', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-03-06 21:03:27', '2017-03-06 21:03:27', '36.69.76.0', 382, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '21:03:51', '2017-03-06', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-06 21:03:51', '2017-03-06 21:03:51', '36.69.76.0', 383, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '00:03:06', '2017-03-07', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-07 00:03:06', '2017-03-07 00:03:06', '36.69.76.0', 384, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:03:13', '2017-03-07', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-03-07 11:03:13', '2017-03-07 11:03:13', '36.70.216.88', 385, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '17:03:37', '2017-03-07', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-03-07 17:03:37', '2017-03-07 17:03:37', '110.136.99.96', 386, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '18:03:09', '2017-03-07', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-03-07 18:03:09', '2017-03-07 18:03:09', '110.136.99.96', 387, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '02:03:55', '2017-03-08', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-08 02:03:55', '2017-03-08 02:03:55', '120.188.65.82', 388, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '18:03:31', '2017-03-08', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-08 18:03:31', '2017-03-08 18:03:31', '120.188.64.21', 389, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '22:03:17', '2017-03-08', '03', '2017', '0', 'Chrome', '56.12.2924.87', '', '', '', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.12.2924.87 Safari/537.36', NULL, NULL, '2017-03-08 22:03:17', '2017-03-08 22:03:17', '172.98.84.199', 390, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '22:03:56', '2017-03-08', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-03-08 22:03:56', '2017-03-08 22:03:56', '110.136.99.96', 391, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '22:03:02', '2017-03-08', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-08 22:03:02', '2017-03-08 22:03:02', '110.136.99.96', 392, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '22:03:20', '2017-03-08', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', NULL, NULL, '2017-03-08 22:03:20', '2017-03-08 22:03:20', '110.136.99.96', 393, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '22:03:06', '2017-03-08', '03', '2017', '1', 'Chrome', '51.0.2704.79', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393', NULL, NULL, '2017-03-08 22:03:06', '2017-03-08 22:03:06', '110.136.99.96', 394, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '01:03:18', '2017-03-09', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-09 01:03:18', '2017-03-09 01:03:18', '120.188.66.37', 395, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '01:03:16', '2017-03-09', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-09 01:03:16', '2017-03-09 01:03:16', '120.188.66.37', 396, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '18:03:44', '2017-03-08', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://localhost:8888/redsfin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-08 18:03:44', '2017-03-08 18:03:44', '::1', 397, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '18:03:22', '2017-03-08', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://localhost:8888/redsfin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-08 18:03:22', '2017-03-08 18:03:22', '::1', 398, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '19:03:23', '2017-03-08', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://localhost:8888/redsfin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-08 19:03:23', '2017-03-08 19:03:23', '::1', 399, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '08:03:43', '2017-03-09', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://localhost:8888/redsfin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-09 08:03:43', '2017-03-09 08:03:43', '::1', 400, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '08:03:07', '2017-03-09', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://localhost:8888/redsfin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-09 08:03:07', '2017-03-09 08:03:07', '::1', 401, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '08:03:20', '2017-03-09', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://localhost:8888/redsfin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', NULL, NULL, '2017-03-09 08:03:20', '2017-03-09 08:03:20', '::1', 402, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '22:03:05', '2017-03-09', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-09 22:03:05', '2017-03-09 22:03:05', '127.0.0.1', 403, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '08:03:21', '2017-03-10', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-10 08:03:21', '2017-03-10 08:03:21', '127.0.0.1', 404, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '08:03:56', '2017-03-10', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-10 08:03:56', '2017-03-10 08:03:56', '127.0.0.1', 405, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '08:03:01', '2017-03-10', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-10 08:03:01', '2017-03-10 08:03:01', '127.0.0.1', 406, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '09:03:06', '2017-03-10', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-10 09:03:06', '2017-03-10 09:03:06', '127.0.0.1', 407, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '22:03:16', '2017-03-10', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-10 22:03:16', '2017-03-10 22:03:16', '127.0.0.1', 408, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '10:03:59', '2017-03-13', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-13 10:03:59', '2017-03-13 10:03:59', '127.0.0.1', 409, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '13:03:43', '2017-03-13', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost:3000/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-13 13:03:43', '2017-03-13 13:03:43', '127.0.0.1', 410, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '13:03:10', '2017-03-13', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost:3000/redsfin/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-13 13:03:10', '2017-03-13 13:03:10', '127.0.0.1', 411, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '13:03:00', '2017-03-13', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost:3000/redsfin/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-13 13:03:00', '2017-03-13 13:03:00', '127.0.0.1', 412, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '13:03:35', '2017-03-13', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost:3000/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-13 13:03:35', '2017-03-13 13:03:35', '127.0.0.1', 413, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '14:03:10', '2017-03-13', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-13 14:03:10', '2017-03-13 14:03:10', '127.0.0.1', 414, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '14:03:44', '2017-03-13', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-13 14:03:44', '2017-03-13 14:03:44', '127.0.0.1', 415, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '14:03:01', '2017-03-13', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-13 14:03:01', '2017-03-13 14:03:01', '127.0.0.1', 416, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '14:03:41', '2017-03-13', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-13 14:03:41', '2017-03-13 14:03:41', '127.0.0.1', 417, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '23:03:20', '2017-03-13', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-13 23:03:20', '2017-03-13 23:03:20', '127.0.0.1', 418, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '23:03:36', '2017-03-13', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-13 23:03:36', '2017-03-13 23:03:36', '127.0.0.1', 419, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '12:03:05', '2017-03-14', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-14 12:03:05', '2017-03-14 12:03:05', '127.0.0.1', 420, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '07:03:11', '2017-03-15', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-15 07:03:11', '2017-03-15 07:03:11', '127.0.0.1', 421, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '10:03:06', '2017-03-15', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-15 10:03:06', '2017-03-15 10:03:06', '127.0.0.1', 422, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '11:03:24', '2017-03-15', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-15 11:03:24', '2017-03-15 11:03:24', '127.0.0.1', 423, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '10:03:22', '2017-03-16', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-16 10:03:22', '2017-03-16 10:03:22', '127.0.0.1', 424, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '12:03:38', '2017-03-16', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-16 12:03:38', '2017-03-16 12:03:38', '127.0.0.1', 425, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '09:03:39', '2017-03-17', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-17 09:03:39', '2017-03-17 09:03:39', '127.0.0.1', 426, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '14:03:20', '2017-03-17', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-17 14:03:20', '2017-03-17 14:03:20', '127.0.0.1', 427, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '00:03:34', '2017-03-20', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-20 00:03:34', '2017-03-20 00:03:34', '127.0.0.1', 428, 'staff');
INSERT INTO loginlog (pegawainid, jammasuk, tanggal, bulan, tahun, is_referral, browser, version, mobile, robot, referrer, agent_string, userin, usermod, datein, datemod, ipaddress, loginlogid, username) VALUES ('11', '21:03:01', '2017-03-20', '03', '2017', '1', 'Firefox', '52.0', '', '', 'http://localhost/redsfin/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0', NULL, NULL, '2017-03-20 21:03:01', '2017-03-20 21:03:01', '127.0.0.1', 429, 'staff');


--
-- Data for Name: machine; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO machine (machine_id, machine_name, machine_description, width_material, unit_item_id, machine_type_id, idunit, userin, datein, usermod, datemod, display, brand, serial_no, machine_result, manufacturer, status, deleted) VALUES (1, 23, '3', 0.00, NULL, 1, 12, 11, '2017-03-09 16:03:02', 0, '2017-03-20 12:03:52', NULL, '3', '3', '23', '3', 1, NULL);


--
-- Data for Name: machine_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO machine_type (machine_type_id, idunit, machine_type_name, machine_type_desc, userin, datein, usermod, datemod, display, status, deleted) VALUES (1, 12, 'x', 'x', 11, '2017-03-09 16:03:06', 0, '2017-03-20 12:03:03', NULL, 1, NULL);


--
-- Data for Name: month; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: package; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO package (packageid, packagename, price, description) VALUES (1, 'UKM', NULL, NULL);
INSERT INTO package (packageid, packagename, price, description) VALUES (2, 'Menengah', NULL, NULL);
INSERT INTO package (packageid, packagename, price, description) VALUES (3, 'Corporate', NULL, NULL);


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO payment (idpayment, namepayment, description, userin, usermod, datein, datemod) VALUES (1, 'Tunai', NULL, NULL, NULL, NULL, NULL);
INSERT INTO payment (idpayment, namepayment, description, userin, usermod, datein, datemod) VALUES (3, 'Kredit', NULL, NULL, NULL, NULL, NULL);
INSERT INTO payment (idpayment, namepayment, description, userin, usermod, datein, datemod) VALUES (4, 'Cash on Delivery', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: payroll; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO payroll (idpayroll, idjournal, month, year, userin, datein, idunit) VALUES (48, 410, '05', 2015, 11, '2015-09-07 00:00:00', 12);
INSERT INTO payroll (idpayroll, idjournal, month, year, userin, datein, idunit) VALUES (49, 414, '11', 2015, 11, '2015-11-13 00:00:00', 12);


--
-- Data for Name: payrollproceed; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO payrollproceed (idemployee, firstname, lastname, namaunit, nametype, jumlahjam, jumlahkehadiran, totalgaji, totaltunjangan, pph21, totalpotongan, totalpembayaran, payname, userin, code, userid, idemployeetype, payrolltypeid, pembayaranperjamkehadiran, premiinsurance, ptkp, wajibpajak, jenispph21, tarifpajak, pphterhutang, month, year, datein, idunit, idpayroll, penambahangaji, numtanggungan, tglpenggajian) VALUES (6, 'Ratna', 'Dra. Ratna Surya Dhiana', 'PT AYUBERGA', 'Kepala Sekolah', 0, 0, 2500000, 250000, 13125, 514625, 2235375, 'Bulanan', 'adminsmk', '0021', 11, 11, 3, 2500000, '0', 28350000, 3150000, 'K/1', 5, 13125, '05', 2015, NULL, 12, 48, 0, NULL, '2015-05-31');
INSERT INTO payrollproceed (idemployee, firstname, lastname, namaunit, nametype, jumlahjam, jumlahkehadiran, totalgaji, totaltunjangan, pph21, totalpotongan, totalpembayaran, payname, userin, code, userid, idemployeetype, payrolltypeid, pembayaranperjamkehadiran, premiinsurance, ptkp, wajibpajak, jenispph21, tarifpajak, pphterhutang, month, year, datein, idunit, idpayroll, penambahangaji, numtanggungan, tglpenggajian) VALUES (6, 'Ratna', 'Dra. Ratna Surya Dhiana', 'PT AYUBERGA', 'Kepala Sekolah', 0, 0, 2500000, 250000, 13125, 514625, 2235375, 'Bulanan', 'adminsmk', '0021', 11, 11, 3, 2500000, '0', 28350000, 3150000, 'K/1', 5, 13125, '11', 2015, NULL, 12, 49, 0, NULL, '2015-11-01');


--
-- Data for Name: payrollsettings; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payrolltmp; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payrolltype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO payrolltype (payrolltypeid, payname, description, datein, userin, datemod, usermod, display) VALUES (1, 'Jam', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO payrolltype (payrolltypeid, payname, description, datein, userin, datemod, usermod, display) VALUES (2, 'Kehadiran/Harian', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO payrolltype (payrolltypeid, payname, description, datein, userin, datemod, usermod, display) VALUES (3, 'Bulanan', NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: pelanggan; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: pelanggantype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO pelanggantype (idpelanggantype, pelanggantype) VALUES (1, 'Perorangan');
INSERT INTO pelanggantype (idpelanggantype, pelanggantype) VALUES (2, 'Perusahaan');


--
-- Data for Name: piutanghistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: piutangpayhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: potongan; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO potongan (idpotongan, idpotongantype, idamounttype, idsiklus, idemployee, startdate, enddate, totalpotongan, sisapotongan, jumlahpotongan, userin, datein, usermod, datemod, jumlahangsuran, keterangan, sisaangsuran, display, idupload) VALUES (10, 2, NULL, NULL, 2, '2014-09-17', NULL, 30000000, 29464286, 535714, 'administrator', '2015-02-05 15:02:10', 'administrator', '2015-02-05 15:02:53', 56, '-', 53, 0, NULL);
INSERT INTO potongan (idpotongan, idpotongantype, idamounttype, idsiklus, idemployee, startdate, enddate, totalpotongan, sisapotongan, jumlahpotongan, userin, datein, usermod, datemod, jumlahangsuran, keterangan, sisaangsuran, display, idupload) VALUES (11, 1, NULL, 1, 2, '2014-09-10', '2015-02-05', 30000, 0, 30000, 'administrator', '2015-02-05 15:02:38', 'administrator', '2015-02-05 15:02:02', 1, '-', 0, 0, NULL);
INSERT INTO potongan (idpotongan, idpotongantype, idamounttype, idsiklus, idemployee, startdate, enddate, totalpotongan, sisapotongan, jumlahpotongan, userin, datein, usermod, datemod, jumlahangsuran, keterangan, sisaangsuran, display, idupload) VALUES (12, 3, NULL, 1, 2, '2011-02-05', '2019-02-19', 273870, 0, 273870, 'admin', '2015-02-23 17:02:47', 'admin', '2015-02-23 17:02:47', 1, '---', 0, NULL, NULL);
INSERT INTO potongan (idpotongan, idpotongantype, idamounttype, idsiklus, idemployee, startdate, enddate, totalpotongan, sisapotongan, jumlahpotongan, userin, datein, usermod, datemod, jumlahangsuran, keterangan, sisaangsuran, display, idupload) VALUES (13, 4, NULL, 1, 2, '2011-02-12', '2019-02-11', 1500, 0, 1500, 'admin', '2015-02-23 17:02:07', 'admin', '2015-02-23 17:02:07', 1, '---', 0, NULL, NULL);
INSERT INTO potongan (idpotongan, idpotongantype, idamounttype, idsiklus, idemployee, startdate, enddate, totalpotongan, sisapotongan, jumlahpotongan, userin, datein, usermod, datemod, jumlahangsuran, keterangan, sisaangsuran, display, idupload) VALUES (14, 1, NULL, 1, 5, '2015-03-02', '2019-04-11', 40000, 0, 40000, 'administrator', '2015-03-05 08:03:49', 'administrator', '2015-03-05 08:03:49', 1, '--', -6, NULL, NULL);
INSERT INTO potongan (idpotongan, idpotongantype, idamounttype, idsiklus, idemployee, startdate, enddate, totalpotongan, sisapotongan, jumlahpotongan, userin, datein, usermod, datemod, jumlahangsuran, keterangan, sisaangsuran, display, idupload) VALUES (18, 1, NULL, 1, 6, '2015-04-04', '2015-05-03', 20000, 20000, 20000, 'administrator', '2015-04-28 12:04:49', 'administrator', '2015-04-28 12:04:49', 1, NULL, 1, 0, 13);
INSERT INTO potongan (idpotongan, idpotongantype, idamounttype, idsiklus, idemployee, startdate, enddate, totalpotongan, sisapotongan, jumlahpotongan, userin, datein, usermod, datemod, jumlahangsuran, keterangan, sisaangsuran, display, idupload) VALUES (19, 1, NULL, 1, 6, '2015-04-04', '2015-05-03', 20000, 20000, 20000, 'administrator', '2015-04-28 12:04:40', 'administrator', '2015-04-28 12:04:40', 1, NULL, 1, NULL, 14);
INSERT INTO potongan (idpotongan, idpotongantype, idamounttype, idsiklus, idemployee, startdate, enddate, totalpotongan, sisapotongan, jumlahpotongan, userin, datein, usermod, datemod, jumlahangsuran, keterangan, sisaangsuran, display, idupload) VALUES (15, 4, NULL, 1, 6, '2015-04-01', '2020-04-30', 1500, 0, 1500, 'administrator', '2015-04-22 06:04:06', 'administrator', '2015-04-22 06:04:06', 1, '-', -2, NULL, NULL);
INSERT INTO potongan (idpotongan, idpotongantype, idamounttype, idsiklus, idemployee, startdate, enddate, totalpotongan, sisapotongan, jumlahpotongan, userin, datein, usermod, datemod, jumlahangsuran, keterangan, sisaangsuran, display, idupload) VALUES (16, 2, NULL, NULL, 6, '2015-04-01', NULL, 5000000, 4500000, 500000, 'administrator', '2015-04-22 07:04:55', 'administrator', '2015-04-22 07:04:55', 10, '', 8, NULL, NULL);


--
-- Data for Name: potonganhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO potonganhistory (idpotongan, idprosesgaji, datepaid, jumlahpotongan, sisapotongan, totalpotongan, userin, datein, sisaangsuran, month, year, idemployee) VALUES (15, NULL, '2015-05-31', 1500, 0, 1500, 'adminsmk', '2015-09-07 11:09:43', -1, '05', 2015, 6);
INSERT INTO potonganhistory (idpotongan, idprosesgaji, datepaid, jumlahpotongan, sisapotongan, totalpotongan, userin, datein, sisaangsuran, month, year, idemployee) VALUES (16, NULL, '2015-05-31', 500000, 4500000, 5000000, 'adminsmk', '2015-09-07 11:09:43', 9, '05', 2015, 6);
INSERT INTO potonganhistory (idpotongan, idprosesgaji, datepaid, jumlahpotongan, sisapotongan, totalpotongan, userin, datein, sisaangsuran, month, year, idemployee) VALUES (15, NULL, '2015-11-01', 1500, 0, 1500, 'adminsmk', '2015-11-13 19:11:27', -2, '11', 2015, 6);
INSERT INTO potonganhistory (idpotongan, idprosesgaji, datepaid, jumlahpotongan, sisapotongan, totalpotongan, userin, datein, sisaangsuran, month, year, idemployee) VALUES (16, NULL, '2015-11-01', 500000, 4500000, 5000000, 'adminsmk', '2015-11-13 19:11:27', 8, '11', 2015, 6);


--
-- Data for Name: potongantype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO potongantype (idpotongantype, namepotongan, descpotongan, jenispotongan, userin, usermod, datein, datemod, display, idcompany) VALUES (1, 'Iuran Keagamaan', 'Iuran Keagamaan', 'Potongan', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO potongantype (idpotongantype, namepotongan, descpotongan, jenispotongan, userin, usermod, datein, datemod, display, idcompany) VALUES (2, 'Pinjaman Pegawai', 'Pinjaman Pegawai', 'Pinjaman', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO potongantype (idpotongantype, namepotongan, descpotongan, jenispotongan, userin, usermod, datein, datemod, display, idcompany) VALUES (3, 'Jamsostek', NULL, 'Potongan', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO potongantype (idpotongantype, namepotongan, descpotongan, jenispotongan, userin, usermod, datein, datemod, display, idcompany) VALUES (4, 'Goro', NULL, 'Potongan', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO potongantype (idpotongantype, namepotongan, descpotongan, jenispotongan, userin, usermod, datein, datemod, display, idcompany) VALUES (5, 'Potongan THR', NULL, 'Potongan', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO potongantype (idpotongantype, namepotongan, descpotongan, jenispotongan, userin, usermod, datein, datemod, display, idcompany) VALUES (51, 'dsad', 'dsad', 'Potongan', 'administrator', 'administrator', '2015-05-19 15:05:25', '2015-05-19 15:05:33', 0, 1);


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO product (product_id, product_code, product_name, product_desc, basic_uom, second_uom, minimum_stock, supplier_id, grade, display, userin, datein, usermod, datemod, idunit, product_type_id, brand_id, thickness_id, status, deleted) VALUES (1, 'A1', 'dada', '', 1, 2, NULL, 21, 3, NULL, '0', '2017-03-10', '0', '2017-03-18', 12, 1, NULL, NULL, NULL, NULL);
INSERT INTO product (product_id, product_code, product_name, product_desc, basic_uom, second_uom, minimum_stock, supplier_id, grade, display, userin, datein, usermod, datemod, idunit, product_type_id, brand_id, thickness_id, status, deleted) VALUES (2, 'A2', 'ada', 'asda', 4, 2, NULL, 21, 2, NULL, '0', '2017-03-10', '0', '2017-03-20', 12, 1, 1, 1, 1, NULL);


--
-- Data for Name: product_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO product_type (product_type_id, display, userin, datein, usermod, datemod, product_type_name, product_type_desc, status, deleted) VALUES (1, NULL, '0', '2017-03-09', '0', '2017-03-20', 'ada', 'aweq', 1, NULL);


--
-- Data for Name: productgrade; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO productgrade (gradeid, name) VALUES (1, 'NOT GOOD');
INSERT INTO productgrade (gradeid, name) VALUES (2, 'INTERMEDIATE');
INSERT INTO productgrade (gradeid, name) VALUES (3, 'GOOD');


--
-- Data for Name: productmeasurement; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO productmeasurement (measurement_id, short_desc, long_desc, display, userin, datein, usermod, datemod, idunit, deleted, status) VALUES (1, 'm', 'meter', NULL, '0', '2017-03-10', '0', '2017-03-17', 12, NULL, NULL);
INSERT INTO productmeasurement (measurement_id, short_desc, long_desc, display, userin, datein, usermod, datemod, idunit, deleted, status) VALUES (2, 'mm', 'milimeter', NULL, '0', '2017-03-17', '0', '2017-03-17', 12, NULL, NULL);
INSERT INTO productmeasurement (measurement_id, short_desc, long_desc, display, userin, datein, usermod, datemod, idunit, deleted, status) VALUES (4, 'Lbr', 'Lembar', NULL, '0', '2017-03-17', '0', '2017-03-17', 12, NULL, NULL);
INSERT INTO productmeasurement (measurement_id, short_desc, long_desc, display, userin, datein, usermod, datemod, idunit, deleted, status) VALUES (3, 'Kg', 'Kilogram', NULL, '0', '2017-03-17', '0', '2017-03-20', 12, NULL, 1);


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO project (project_id, project_name, description, budget, expense, realization, profit, status, display, idunit, idcustomer, userin, datein, usermod, datemod, startdate, enddate, idtax, idcurrency) VALUES (1, 'tes', 'desc', 250000, 0, 0, 0, 1, NULL, 12, 8, '0', '2017-03-20', '0', '2017-03-20', '2017-03-20', '2017-04-20', 1, 1);


--
-- Data for Name: prosesgaji; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: prosesgaji_tmp; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: purchase; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: purchaseitem; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: purchasestatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO purchasestatus (idpurchasestatus, status) VALUES (1, 'Order');
INSERT INTO purchasestatus (idpurchasestatus, status) VALUES (2, 'Paid');
INSERT INTO purchasestatus (idpurchasestatus, status) VALUES (3, 'Return');
INSERT INTO purchasestatus (idpurchasestatus, status) VALUES (4, 'Open Bills');


--
-- Data for Name: purchasetype; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: rack; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO rack (rack_id, rack_name, rack_type, rack_desc, idunit, display, userin, datein, usermod, datemod, status, deleted) VALUES (1, 'asdad', 'dfdf', 'asa', 12, NULL, '0', '2017-03-10', '0', '2017-03-10', NULL, NULL);
INSERT INTO rack (rack_id, rack_name, rack_type, rack_desc, idunit, display, userin, datein, usermod, datemod, status, deleted) VALUES (2, 'tes', 'tes', 'qqweq', 12, NULL, '0', '2017-03-20', '0', '2017-03-20', 1, NULL);


--
-- Data for Name: receivemoney; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: receivemoneyimport; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: receivemoneyitem; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: receivepayment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: reconcile; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO reconcile (idreconcile, idaccount, idjournal, datestatement, newbalance, calcbalance, outbalance, lastdate, servamount, servno, servdate, servtax, expenseaccount, servmemo, intamount, intno, intdate, inttax, incomeaccount, intmemo, display, userin, usermod, datein, datemod, idunit, accbalance) VALUES (12, 10, NULL, '2015-11-30', 500, NULL, 0, '2015-11-13', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'adminsmk', 'adminsmk', '2015-11-13 14:11:48', '2015-11-13 14:11:48', 12, 0);


--
-- Data for Name: registrasihutang; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO registrasihutang (idregistrasihutang, idunit, idacchutang, idacckenahutang, jumlah, sisahutang, idjournal, memo, userin, datein, datemod, usermod, display, month, year, mulaihutang, jatuhtempo, idsupplier) VALUES (15, 12, 31, 754, 6000000, 6000000, 420, 'Hutang kepada wawan', 'staff', '2017-01-26 18:01:12', '2017-01-26 18:01:12', 'staff', NULL, NULL, NULL, '2016-11-16', '2017-01-31', 18);


--
-- Data for Name: registrasipiutang; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO registrasipiutang (idregistrasipiutang, idaccount, bulan, tahun, description, userin, usermod, datein, datemod, display, jumlah, idunit, sisapiutang, idaccountlink, tglpiutang, idjournal, idpelanggan, autodecrease) VALUES (30, 18, NULL, NULL, 'Pembuatan aplikasi Barrier Gate Indonesia Power', 'staff', 'staff', '2017-01-26 18:01:21', '2017-01-26 18:01:21', NULL, 15000000, 12, 15000000, 752, '2016-12-09', 428, 7, 2);
INSERT INTO registrasipiutang (idregistrasipiutang, idaccount, bulan, tahun, description, userin, usermod, datein, datemod, display, jumlah, idunit, sisapiutang, idaccountlink, tglpiutang, idjournal, idpelanggan, autodecrease) VALUES (31, 18, NULL, NULL, 'Development lanjutan aplikasi PPLS unit 5-7. Indonesia Power', 'staff', 'staff', '2017-01-26 18:01:29', '2017-01-26 18:01:29', NULL, 30000000, 12, 30000000, 752, '2016-11-30', 429, 7, 2);
INSERT INTO registrasipiutang (idregistrasipiutang, idaccount, bulan, tahun, description, userin, usermod, datein, datemod, display, jumlah, idunit, sisapiutang, idaccountlink, tglpiutang, idjournal, idpelanggan, autodecrease) VALUES (29, 18, NULL, NULL, 'Development lanjutan pembuatan aplikasi assesment online suzuki', 'staff', 'staff', '2017-01-26 18:01:52', '2017-01-26 18:01:52', NULL, 12000000, 12, 12000000, 752, '2016-12-09', 427, 6, 2);


--
-- Data for Name: return; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO return (idreturn, idsupplier, idaccount, idreturntype, noreturn, date, memo, payee, subtotal, taxreturn, freight, totalreturn, display, userin, usermod, datein, datemod, tglkirim, idunit, nopo, note, idjournal, saldoterhutang, pembayaranberjalan, pengembaliandana) VALUES (14, 13, 32, NULL, 'RET5900025', '2015-01-14', 'Return Pembelian', NULL, 500000, 0, NULL, 500000, NULL, 'adminsmk', 'adminsmk', '2015-04-17 10:04:37', '2015-04-17 10:04:37', '2015-01-07', 9, 'PO4900009', 'xxx', 368, 0, 600000, 600000);


--
-- Data for Name: returnitem; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: returntype; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: riwayatpembsiswa; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: salesitem; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: sallary; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO sallary (idsallary, idemployee, basicsallary, nosk, tglmulai, tglakhir, notes, userin, datein, usermod, datemod, jabatan) VALUES (2, 2, 3000000, NULL, NULL, NULL, NULL, 'admin', '2014-10-17 00:10:15', 'admin', '2014-10-17 00:10:15', NULL);


--
-- Data for Name: scheduletype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO scheduletype (idscheduletype, schname) VALUES (1, 'Terus Menerus');
INSERT INTO scheduletype (idscheduletype, schname) VALUES (2, 'Jalankan sampai #');


--
-- Name: seq_account; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_account', 763, false);


--
-- Name: seq_amounttype; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_amounttype', 8, false);


--
-- Name: seq_asuransi; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_asuransi', 15, false);


--
-- Name: seq_asuransiemp; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_asuransiemp', 20, false);


--
-- Name: seq_asuransipayhistory; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_asuransipayhistory', 68, false);


--
-- Name: seq_clossing; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_clossing', 2319, false);


--
-- Name: seq_customer; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_customer', 9, false);


--
-- Name: seq_dataanak; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_dataanak', 8, false);


--
-- Name: seq_datasutri; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_datasutri', 17, false);


--
-- Name: seq_disbursment; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_disbursment', 15, false);


--
-- Name: seq_employee; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_employee', 16, false);


--
-- Name: seq_employeetype; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_employeetype', 19, false);


--
-- Name: seq_inventory; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_inventory', 37, false);


--
-- Name: seq_inventoryadjitem; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_inventoryadjitem', 12, false);


--
-- Name: seq_inventoryadjusment; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_inventoryadjusment', 46, false);


--
-- Name: seq_journal; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_journal', 451, false);


--
-- Name: seq_journalitem; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_journalitem', 2367, false);


--
-- Name: seq_linkpiutang; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_linkpiutang', 10, false);


--
-- Name: seq_location; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_location', 1, true);


--
-- Name: seq_loginlog; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_loginlog', 429, true);


--
-- Name: seq_master; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_master', 61, false);


--
-- Name: seq_payroll; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_payroll', 56, false);


--
-- Name: seq_pelanggan; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_pelanggan', 10, false);


--
-- Name: seq_potongan; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_potongan', 26, false);


--
-- Name: seq_prosesgaji; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_prosesgaji', 19, false);


--
-- Name: seq_purchase; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_purchase', 68, false);


--
-- Name: seq_purchaseitem; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_purchaseitem', 49, false);


--
-- Name: seq_receivemoney; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_receivemoney', 67, false);


--
-- Name: seq_receivemoneyimport; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_receivemoneyimport', 20, false);


--
-- Name: seq_receivemoneyitem; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_receivemoneyitem', 79, false);


--
-- Name: seq_reconcile; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_reconcile', 19, false);


--
-- Name: seq_registrasihutang; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_registrasihutang', 18, false);


--
-- Name: seq_registrasipiutang; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_registrasipiutang', 34, false);


--
-- Name: seq_return; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_return', 21, false);


--
-- Name: seq_riwayatpembsiswa; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_riwayatpembsiswa', 8, false);


--
-- Name: seq_sallary; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_sallary', 9, false);


--
-- Name: seq_siswa; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_siswa', 549, false);


--
-- Name: seq_siswapembayaran; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_siswapembayaran', 44, false);


--
-- Name: seq_spendmoney; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_spendmoney', 49, false);


--
-- Name: seq_spendmoneyitem; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_spendmoneyitem', 46, false);


--
-- Name: seq_supplier; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_supplier', 22, true);


--
-- Name: seq_sys_menu; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_sys_menu', 171, true);


--
-- Name: seq_tambahangaji; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_tambahangaji', 12, false);


--
-- Name: seq_tambahangajitype; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_tambahangajitype', 11, false);


--
-- Name: seq_tax; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_tax', 20, false);


--
-- Name: seq_thr; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_thr', 10, false);


--
-- Name: seq_transferkas; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_transferkas', 13, false);


--
-- Name: seq_tunjangan; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_tunjangan', 40, false);


--
-- Name: seq_unit; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_unit', 23, false);


--
-- Name: seq_upload; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_upload', 23, false);


--
-- Name: seq_user_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('seq_user_id', 21, false);


--
-- Data for Name: sequence; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO sequence (idunit, sequence) VALUES (1, 61);
INSERT INTO sequence (idunit, sequence) VALUES (1, 61);
INSERT INTO sequence (idunit, sequence) VALUES (2, 29);
INSERT INTO sequence (idunit, sequence) VALUES (2, 29);
INSERT INTO sequence (idunit, sequence) VALUES (9, 47);
INSERT INTO sequence (idunit, sequence) VALUES (14, 8);
INSERT INTO sequence (idunit, sequence) VALUES (NULL, 1);
INSERT INTO sequence (idunit, sequence) VALUES (NULL, 1);
INSERT INTO sequence (idunit, sequence) VALUES (12, 32);


--
-- Data for Name: sextype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO sextype (idsex, name) VALUES (1, 'Laki-laki');
INSERT INTO sextype (idsex, name) VALUES (2, 'Perempuan');


--
-- Data for Name: shipping; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO shipping (idshipping, nameshipping, description, userin, usermod, datein, datemod) VALUES (1, 'Shipping 1', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: siklus; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO siklus (idsiklus, namasiklus) VALUES (1, 'Bulanan');
INSERT INTO siklus (idsiklus, namasiklus) VALUES (2, 'Tahunan');


--
-- Data for Name: siswa; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO siswa (idsiswa, idunit, namasiswa, namaibu, namaayah, alamat, kota, phone, tglmasuk, tglkeluar, tahunajaranmasuk, foto, display, userin, usermod, datein, datemod, noinduk, kelas) VALUES (22, 12, 'Ahmad Bahrudin', 'Susi Susanti', 'Budi Anto', 'Ampera. Jakarta Selatan', '2016', '217716621', '2012-04-03', NULL, '2012-2015', '0', NULL, 'administrator', 'administrator', '2015-04-29 05:04:18', '2015-05-03 15:05:28', '321321', '217716621');


--
-- Data for Name: siswapembayaran; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO siswapembayaran (idsiswapembayaran, idsiswa, idaccountbayar, idjournal, tglbayar, bulanpembayaran, tahunpembayaran, bulantahunpembayaran, bulanbayar, tahunbayar, jumlah, userin, datein, usermod, datemod, jatuhtempo, haribayar, denda, iduser, receivefrom) VALUES (33, 22, 46, 402, '2015-04-16', '04', 2015, 'April 2015', '04', 2015, 250000, 'adminsmk', '2015-05-03 16:05:38', 'adminsmk', '2015-05-03 16:05:38', NULL, '16', 2000, 11, NULL);
INSERT INTO siswapembayaran (idsiswapembayaran, idsiswa, idaccountbayar, idjournal, tglbayar, bulanpembayaran, tahunpembayaran, bulantahunpembayaran, bulanbayar, tahunbayar, jumlah, userin, datein, usermod, datemod, jatuhtempo, haribayar, denda, iduser, receivefrom) VALUES (34, 22, 47, 402, '2015-04-16', '04', 2015, 'April 2015', '04', 2015, 150000, 'adminsmk', '2015-05-03 16:05:38', 'adminsmk', '2015-05-03 16:05:38', NULL, '16', 0, 11, NULL);


--
-- Data for Name: spendmoney; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: spendmoneyitem; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (24, 26, 59, 3500000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (36, 38, 758, 100000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (38, 40, 758, 61290, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (23, 24, 59, 10000000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (37, 39, 760, 238000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (21, 22, 732, 13000000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (42, 44, 761, 319200, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (39, 41, 760, 99000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (26, 28, 59, 3300000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (44, 46, 732, 226100, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (27, 29, 59, 4000000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (34, 36, 760, 120000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (25, 27, 59, 8000000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (28, 30, 757, 477603, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (35, 37, 760, 120000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (30, 32, 757, 133798, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (31, 33, 759, 198000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (22, 23, 59, 10000000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (40, 42, 758, 200000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (33, 35, 758, 83000, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (41, 43, 761, 186200, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (29, 31, 757, 252700, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (43, 45, 732, 505400, NULL, 0);
INSERT INTO spendmoneyitem (idspendmoneyitem, idspendmoney, idaccount, amount, memo, ratetax) VALUES (32, 34, 760, 119000, NULL, 0);


--
-- Data for Name: supplier; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO supplier (idsupplier, idpayment, idshipping, code, namesupplier, companyaddress, companyaddress2, companyaddress3, companyaddress4, shipaddress, billaddress, telephone, handphone, fax, email, website, city, state, postcode, country, highestpo, avgdaypay, lastpayment, lastpurchase, expenseaccount, notes, display, userin, usermod, datein, datemod, idcompany, supplier_type_id, status, deleted) VALUES (22, NULL, NULL, '22', 'dgdg', 'adad', '0', '0', NULL, '', '0', '1231', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, '', NULL, '0', '0', '2017-03-10 07:03:35', '2017-03-10 07:03:35', NULL, 1, NULL, NULL);
INSERT INTO supplier (idsupplier, idpayment, idshipping, code, namesupplier, companyaddress, companyaddress2, companyaddress3, companyaddress4, shipaddress, billaddress, telephone, handphone, fax, email, website, city, state, postcode, country, highestpo, avgdaypay, lastpayment, lastpurchase, expenseaccount, notes, display, userin, usermod, datein, datemod, idcompany, supplier_type_id, status, deleted) VALUES (21, NULL, NULL, '1', 'asdas', '21', '0', '0', NULL, '21', '0', '21', '212', '2', '12', '1', '312', '213', '13', '12312', NULL, NULL, NULL, NULL, NULL, '31', NULL, '11', '0', '2017-03-09 10:03:34', '2017-03-20 12:03:06', NULL, 1, 1, NULL);


--
-- Data for Name: supplier_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO supplier_type (supplier_type_id, idunit, supplier_type_name, supplier_type_desc, display, userin, datein, usermod, datemod, status, deleted) VALUES (1, 12, 'aaa', 'aaa', NULL, 11, '2017-03-09 10:03:22', 0, '2017-03-20 12:03:12', 1, NULL);


--
-- Data for Name: sys_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO sys_group (group_id, group_name, userin, usermod, datein, datemod, display, description) VALUES (1, 'Administrator', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_group (group_id, group_name, userin, usermod, datein, datemod, display, description) VALUES (2, 'Admin Unit', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_group (group_id, group_name, userin, usermod, datein, datemod, display, description) VALUES (3, 'Inventory', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_group (group_id, group_name, userin, usermod, datein, datemod, display, description) VALUES (4, 'Purchasing', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_group (group_id, group_name, userin, usermod, datein, datemod, display, description) VALUES (5, 'Sales', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_group (group_id, group_name, userin, usermod, datein, datemod, display, description) VALUES (99, 'Super User', NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: sys_group_menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (1, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (1, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (1, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (1, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (63, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (63, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (63, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (3, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (3, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (3, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (4, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (4, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (4, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (63, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (63, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (144, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (6, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (6, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (6, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (7, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (7, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (7, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (144, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (144, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (144, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (9, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (9, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (9, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (10, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (10, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (10, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (12, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (12, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (12, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (13, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (13, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (13, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (14, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (14, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (14, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (144, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (144, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (149, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (16, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (16, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (16, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (17, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (17, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (17, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (18, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (18, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (18, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (149, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (149, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (149, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (20, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (20, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (20, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (21, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (21, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (21, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (22, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (22, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (22, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (23, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (23, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (23, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (24, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (24, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (24, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (25, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (25, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (25, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (26, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (26, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (26, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (149, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (149, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (28, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (28, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (28, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (29, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (29, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (29, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (30, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (30, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (30, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (31, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (31, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (31, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (32, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (32, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (32, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (33, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (33, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (33, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (34, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (34, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (34, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (35, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (35, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (35, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (36, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (36, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (36, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (37, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (37, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (37, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (38, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (38, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (38, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (39, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (39, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (39, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (40, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (40, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (40, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (41, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (41, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (41, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (42, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (42, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (42, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (43, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (43, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (43, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (44, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (44, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (44, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (45, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (45, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (45, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (46, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (46, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (46, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (47, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (47, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (47, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (48, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (48, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (48, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (49, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (49, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (49, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (50, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (50, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (50, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (52, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (52, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (52, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (53, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (53, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (53, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (54, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (54, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (54, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (55, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (55, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (55, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (56, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (56, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (56, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (58, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (58, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (58, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (59, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (59, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (59, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (60, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (60, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (60, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (61, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (61, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (61, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (61, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (61, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (62, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (62, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (62, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (62, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (64, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (64, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (64, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (64, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (64, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (65, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (65, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (65, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (65, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (65, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (66, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (66, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (66, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (66, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (66, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (67, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (67, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (67, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (68, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (68, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (68, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (69, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (69, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (69, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (70, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (70, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (70, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (71, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (71, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (71, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (72, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (72, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (72, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (73, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (73, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (73, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (73, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (73, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (74, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (74, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (74, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (74, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (75, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (75, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (75, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (76, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (76, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (76, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (77, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (77, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (77, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (78, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (78, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (78, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (79, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (79, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (79, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (82, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (82, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (82, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (83, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (83, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (83, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (84, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (84, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (84, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (85, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (85, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (85, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (86, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (86, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (86, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (87, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (87, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (87, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (88, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (88, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (88, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (89, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (89, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (89, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (90, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (90, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (90, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (91, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (91, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (91, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (92, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (92, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (93, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (93, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (93, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (94, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (94, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (94, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (95, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (95, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (95, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (96, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (96, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (96, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (97, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (97, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (97, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (98, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (98, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (98, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (99, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (99, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (99, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (100, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (100, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (100, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (102, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (102, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (102, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (116, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (116, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (116, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (117, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (117, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (117, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (118, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (118, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (118, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (119, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (119, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (119, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (120, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (120, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (120, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (8, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (8, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (8, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (19, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (19, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (19, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (57, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (57, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (57, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (145, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (145, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (145, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (145, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (145, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (145, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (150, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (150, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (150, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (150, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (150, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (150, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (139, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (139, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (139, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (139, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (139, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (139, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (127, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (127, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (127, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (127, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (131, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (15, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (15, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (15, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (131, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (131, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (131, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (131, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (131, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (133, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (133, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (133, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (133, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (133, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (133, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (134, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (134, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (134, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (134, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (134, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (134, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (135, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (135, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (135, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (135, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (135, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (135, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (136, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (136, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (136, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (136, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (136, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (136, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (137, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (137, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (137, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (137, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (137, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (137, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (138, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (138, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (138, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (138, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (138, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (138, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (130, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (130, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (130, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (130, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (130, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (130, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (5, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (5, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (5, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (132, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (132, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (132, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (132, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (132, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (132, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (129, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (129, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (129, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (129, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (129, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (129, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (128, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (128, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (128, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (128, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (128, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (128, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (2, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (2, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (2, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (143, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (143, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (143, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (143, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (143, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (143, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (146, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (146, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (146, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (146, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (146, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (146, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (147, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (147, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (147, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (147, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (147, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (147, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (140, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (140, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (140, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (140, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (140, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (140, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (27, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (27, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (27, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (11, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (11, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (11, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (141, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (141, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (141, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (141, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (141, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (141, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (148, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (148, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (148, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (148, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (148, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (148, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (151, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (151, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (151, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (153, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (153, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (153, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (152, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (152, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (152, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (154, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (154, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (154, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (142, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (142, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (142, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (142, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (142, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (142, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (166, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (166, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (166, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (166, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (166, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (166, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (167, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (167, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (167, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (167, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (167, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (167, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (168, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (168, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (168, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (168, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (168, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (168, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (169, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (169, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (169, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (169, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (169, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (169, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (170, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (170, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (170, 3);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (170, 4);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (170, 5);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (170, 99);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (171, 1);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (171, 2);
INSERT INTO sys_group_menu (sys_menu_id, group_id) VALUES (171, 99);


--
-- Data for Name: sys_menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (1, 'Pengaturan', 'settings', 0, 10, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (3, 'Data Perusahaan', 'TabSetupCompany', 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (4, 'Link Akun', 'Gridlinkedacc', 2, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (6, 'Daftar Inventory', 'TabInventory', 2, 6, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (7, 'Daftar Akun', 'GridTreeAcc2', 2, 2, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (9, 'Daftar Akun', 'GridTreeAcc2', 8, 1, NULL, NULL, 1, 'Menampilkan daftar akun, membuat, merubah dan menghapus akun', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (10, 'Link Akun', 'Gridlinkedacc', 8, 2, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (12, 'Input Jurnal', 'CellEditing', 11, 1, NULL, NULL, 1, 'Mencatat transaksi-transaksi yang tidak berhubungan dengan Bank, penjualan maupun pembelian.', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (13, 'Transaksi Berulang', 'MainView', 11, 3, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (14, 'Daftar Jurnal', 'GridJGeneral', 11, 2, NULL, NULL, 1, 'Daftar jurnal transaksi yang telah di entry', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (16, 'Input Pembelian', 'EntryPurchase', 15, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (17, 'Pembelian Berulang', NULL, 15, 2, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (18, 'Daftar Transaksi', 'TabTransPurchase', 15, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (20, 'Input Inventory', 'inputInventory', 19, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (21, 'Daftar Inventory', 'TabInventory', 19, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (22, 'Penyesuaian ', 'TabInventoryAdj', 19, NULL, NULL, NULL, 0, 'Modul untuk mencocokan jumlah fisik persediaan dengan catatan yang ada pada sistem.', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (23, 'Daftar Konsumen', 'GridcustomerGrid', 0, 4, NULL, 'konsumen', 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (25, 'Daftar Pegawai', 'PortPegawai', 79, 1, NULL, 'karyawan', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (28, 'Akun', NULL, 27, 16, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (29, 'Daftar Akun', 'reportDaftarAkun', 27, 15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (30, 'Sales', NULL, 27, 14, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (31, 'Sales Tax', NULL, 27, 13, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (32, 'Barang Dibeli', 'reportBarangDibeli', 27, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (33, 'Inventory', '', 27, 11, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (35, 'Jurnal Umum', 'reportJurnalUmum', 27, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (36, 'Daftar Persediaan', 'reportDaftarBarang', 27, 10, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (37, 'Neraca Saldo', 'reportNeracaSaldo', 27, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (38, 'Neraca', 'reportNeraca', 27, 4, NULL, '', NULL, '', NULL, 'adminsmk', NULL, '2015-05-04 01:05:20');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (39, 'Laba/Rugi', 'reportLabaRugi', 27, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (40, 'Buku Besar', 'reportGeneralLedger', 27, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (41, 'Jurnal Kas Keluar', 'reportKasKeluar', 27, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (42, 'Jurnal Kas Masuk', 'reportKasMasuk', 27, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (43, 'Arus Kas', 'reportArusKas', 27, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (44, 'Penjualan', NULL, 0, 9, NULL, 'jual', 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (45, 'Point of Sales', NULL, 44, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (46, 'Input Penjualan', NULL, 44, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (47, 'Retur Pembelian', 'TabReturn', 15, 2, NULL, NULL, 0, 'Return Pembelian', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (48, 'Retur Penjualan', NULL, 44, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (49, 'Penjualan Berulang', NULL, 44, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (50, 'Penerimaan Piutang', NULL, 44, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (52, 'Customer Relationship', NULL, 0, 7, NULL, 'crm', 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (53, 'Sistem', NULL, 0, 14, NULL, 'pengaturan', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (54, 'Pengelolaan User', 'GridUserManagement', 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (55, 'Pengaturan Menu', NULL, 53, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (56, 'Backup dan Restore', NULL, 53, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (58, 'Penerimaan Kas', 'TabReceiveMoney', 57, 1, NULL, NULL, NULL, 'Mencatat transaksi yang tidak berhubungan dengan penjualan maupun penerimaan piutang. Seperti transaksi penyetoran dana ke bank, penambahan modal, penerimaan pinjaman dan lain-lain', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (59, 'Pengeluaran Kas', 'TabSpendMoney', 57, 4, NULL, NULL, NULL, 'Mencatat transaksi pengeluaran uang perusahaan yang tidak berhubungan dengan hutang usaha. Seperti transaksi pembelian aktiva tetap, pembayaran gaji pegawai, dan lain-lain.', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (60, 'Rekonsiliasi Bank', 'TabReconcile', 57, 7, NULL, NULL, NULL, 'Rekonsiliasi akun berguna untuk membuat penyesuaian saldo kas perusahaan yang ada di bank dan catatan perusahaan', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (61, 'Import Penerimaan Kas', 'TabImportReceiveMoney', 57, 2, NULL, NULL, NULL, 'Import file xlx yang berisi transaksi yang tidak berhubungan dengan penjualan maupun penerimaan piutang. Seperti transaksi penyetoran dana ke bank, penambahan modal, penerimaan pinjaman dan lain-lain', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (62, 'Import Pengeluaran Kas', 'TabImportSpendMoney', 57, 5, NULL, NULL, NULL, 'Import file xlsx  transaksi pengeluaran uang perusahaan yang tidak berhubungan dengan hutang usaha. Seperti transaksi pembelian aktiva tetap, pembayaran gaji pegawai, dan lain-lain.', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (64, 'Akhir Bulan', 'clossingFormMonth', 63, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (65, 'Akhir Tahun', 'clossingFormYear', 63, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (66, 'Saldo Awal Akun', 'EntryOpeningBalance', 2, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (67, 'Penggajian', NULL, 0, 9, NULL, 'sallary-icon', 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (68, 'Proses Gaji', 'PortProsesGaji', 79, 2, NULL, 'sallary-icon', NULL, 'Memproses Gaji Karyawan', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (69, 'Data Penggajian', 'PortPayrollData', 79, 3, NULL, NULL, NULL, 'Melihat data penggajian, mencetak slip gaji, menghapus penggajian', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (70, 'Hapus Gaji', NULL, 67, 3, NULL, NULL, 0, 'Menghapus gaji karyawan yang telah di hasilkan menu Proses Gaji', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (73, 'Link Piutang', 'GridlinkedaccPiutang', 2, 8, NULL, NULL, 0, 'Menghubungkan akun piutang dengan akun penerimaan', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (74, 'Daftar Piutang', 'GridregPiutang', 82, 3, NULL, NULL, NULL, 'Pendaftaran Piutang pada awal pembukuan atau awal periode akuntansi', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (75, 'Penggajian', NULL, 2, 7, NULL, NULL, 0, 'Mengatur jumlah pembayaran gaji per jenis karyawan dan jenis pembayaran', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (77, 'Daftar Hutang', 'TabHutang', 82, NULL, NULL, NULL, NULL, 'Pendaftaran atau pembuatan hutang', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (78, 'Proses THR', 'PortProsesThr', 79, 4, NULL, NULL, NULL, 'Proses THR', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (83, 'Rekap Pembayaran Gaji', 'rekapGaji', 34, NULL, NULL, '', NULL, 'Rekap pembayaran gaji yan telah diproses', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (84, 'Rekap Premi Karyawan', 'RekapPremiKaryawan', 34, NULL, NULL, '', NULL, 'Rekap premi asuransi yang dibebankan kepada karyawan', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (85, 'Rekap Premi Perusahaan', 'RekapPremiPerusahaan', 34, NULL, NULL, '', NULL, 'Rekap premi asuransi yang ditanggung kepada perusahaan', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (86, 'Rekap PPH21', 'RekapPPH21', 34, NULL, NULL, '', NULL, 'Rekap Penghitungan PPH21', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (87, 'Rekap Pembayaran THR', 'RekapTHR', 34, NULL, NULL, '', NULL, 'Rekap Pembayaran THR', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (24, 'Data Supplier', 'GridsupplierGrid', 0, 5, NULL, 'suplier', 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (15, 'Purchasing', '', 0, 7, NULL, 'beli', NULL, '', NULL, 'staff', NULL, '2017-03-08 19:03:54');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (5, 'Taxation', 'GridSetupTax', 127, 9, NULL, '', NULL, '', NULL, '11', NULL, '2017-03-09 09:03:07');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (57, 'Accounting', '', 0, 11, NULL, 'bank', NULL, '', NULL, '11', NULL, '2017-03-09 09:03:48');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (27, 'Reporting', '', 0, 13, NULL, 'laporan', NULL, '', NULL, '11', NULL, '2017-03-09 09:03:16');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (11, 'Jurnal', 'GridJGeneral', 57, 11, NULL, 'jurnal', NULL, '', NULL, '11', NULL, '2017-03-09 09:03:17');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (63, 'Close Book', '', 0, 12, NULL, 'report_key', NULL, '', NULL, '11', NULL, '2017-03-09 09:03:16');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (82, 'Hutang dan Piutang', NULL, 0, 10, NULL, 'hutangpiutang', 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (19, 'Inventory', 'TabInventory', 0, 10, NULL, 'inventory', NULL, 'Mengelola Persediaan', NULL, '11', NULL, '2017-03-09 09:03:43');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (88, 'Rekap Potongan Karyawan', 'RekapPotonganKaryawan', 34, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (89, 'Rekap Tunjangan Karyawan', 'RekapTunjanganKaryawan', 34, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (90, 'Transfer Kas', 'TabTransferMoney', 57, 6, NULL, NULL, NULL, 'Mentransfer atau memindahkan saldo ke akun kas/bank lain', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (91, 'Data THR', 'GridDataTHR', 79, 5, NULL, NULL, NULL, 'Data hasil proses THR', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (92, 'Input Persediaan Awal', 'input_persediaan_awal', 2, 7, NULL, NULL, NULL, 'Input Persediaan Awal', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (93, 'Saldo Awal Hutang', 'OpeningHutangPanel', 2, 5, NULL, NULL, NULL, 'Saldo Awal Hutang', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (94, 'Saldo Awal Piutang', 'OpeningPiutangPanel', 2, 6, NULL, NULL, NULL, 'Input Saldo Awal Piutang', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (96, 'Saldo Awal Persediaan', 'OpeningPersediaanPanel', 2, 7, NULL, NULL, NULL, 'Input Saldo Awal Persediaan', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (97, 'Referensi', NULL, 2, 10, NULL, NULL, NULL, 'Mengelola data-data master seperti jenis tunjangna, potongan dan lain-lain', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (102, 'Menu Aplikasi', 'GridTreeSysMenu', 53, 2, NULL, NULL, NULL, 'Pengaturan menu aplikasi', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (116, 'Kelompok User', 'GridSysGroup', 53, 3, NULL, '', NULL, 'Pengalolaan Kelomok User dan Modul Aksesnya', 'administrator', 'administrator', '2015-05-03 12:05:00', '2015-05-03 12:05:00');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (118, 'Penerimaan Tahunan', 'reportPenerimaanTahun', 27, 1, NULL, '', NULL, 'Rekapitulasi Penerimaan Tahunan', 'adminsmk', 'adminsmk', '2015-05-03 19:05:15', '2015-05-03 21:05:47');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (119, 'Pengeluaran Tahunan', 'reportPengeluaranTahun', 27, 3, NULL, '', NULL, 'Rekapitulasi Pengeluaran Tahunan', 'adminsmk', 'adminsmk', '2015-05-04 01:05:04', '2015-05-04 01:05:04');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (26, 'Data Siswa', 'PortSiswa', 0, 4, NULL, 'siswa', 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (71, 'Penerimaan Siswa', 'TabReceiveMoneySiswa', 57, 3, NULL, NULL, 1, 'Mencatat penerimaan dari siswa seperti pembayaran spp, daftar ulang, uang praktek dan lain-lain', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (117, 'Penerimaan Siswa', 'reportPenerimaanSiswaBulan', 27, 2, NULL, '', 1, 'Laporan Penerimaan Siswa Bulanan', 'adminsmk', 'adminsmk', '2015-05-03 17:05:31', '2015-05-03 19:05:21');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (79, 'Kepegawaian', NULL, 0, 3, NULL, 'karyawan', 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (100, 'Jenis Potongan', 'GridRefPotonganType', 97, 3, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (76, 'Asuransi', 'Gridinsuranceacc', 2, 10, NULL, NULL, 0, 'Pengaturan premi asuransi yang dibebankan kepada karyawan dan yang ditanggung perusahaan', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (72, 'Jabatan Pegawai', 'GridEmployeeType', 2, 8, NULL, NULL, 0, 'Melihat, mengubah dan menghapus data jenis pegawai dengan pengelompokan akun pembayaran gaji dari tiap jenis pegawai.', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (99, 'Jenis Tunjangan', 'GridRefTunjanganType', 97, 2, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (34, 'Penggajian', 'reportPenggajian', 27, 10, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (120, 'Jenis PTKP', 'GridRefJenisPtkp', 97, NULL, NULL, NULL, 0, 'Data Referensi Nilai Penghasilan Tidak Kena Pajak (PTKP)', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (98, 'Jenis Tambahan Gaji', 'GridRefTambahanGaji', 97, 1, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (143, 'Delivery Order', '', 139, 3, NULL, '', NULL, '', '11', '11', '2017-03-09 09:03:36', '2017-03-09 09:03:36');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (144, 'Sales Invoice', '', 139, 4, NULL, '', NULL, '', '11', '11', '2017-03-09 09:03:49', '2017-03-09 09:03:49');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (145, 'Sales Return', '', 139, 5, NULL, '', NULL, '', '11', '11', '2017-03-09 09:03:13', '2017-03-09 09:03:13');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (133, 'Requesition', '', 15, 1, NULL, '', NULL, '', 'staff', 'staff', '2017-03-08 19:03:13', '2017-03-08 19:03:30');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (146, 'AR Credit Memo', '', 139, 6, NULL, '', NULL, '', '11', '11', '2017-03-09 09:03:25', '2017-03-09 09:03:25');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (134, 'Purchase Order', '', 15, 2, NULL, '', NULL, '', 'staff', 'staff', '2017-03-08 19:03:26', '2017-03-08 19:03:53');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (135, 'Goods Receive', '', 15, 3, NULL, '', NULL, '', 'staff', 'staff', '2017-03-08 19:03:39', '2017-03-08 19:03:06');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (136, 'Invoice', '', 15, 4, NULL, '', NULL, '', 'staff', 'staff', '2017-03-08 19:03:50', '2017-03-08 19:03:14');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (137, 'Return', '', 15, 5, NULL, '', NULL, '', 'staff', 'staff', '2017-03-08 19:03:55', '2017-03-08 19:03:24');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (138, 'AP Credit Memo', '', 15, 6, NULL, '', NULL, '', 'staff', 'staff', '2017-03-08 19:03:07', '2017-03-08 19:03:33');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (147, 'Job Order', '', 140, 1, NULL, '', NULL, '', '11', '11', '2017-03-09 09:03:12', '2017-03-09 09:03:12');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (130, 'Production', 'TabMasterProduction', 127, 1, NULL, '', NULL, '', 'staff', '11', '2017-03-08 19:03:23', '2017-03-09 08:03:17');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (148, 'Production Schedule', '', 140, 2, NULL, '', NULL, '', '11', '11', '2017-03-09 09:03:24', '2017-03-09 09:03:24');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (149, 'Material Ussage', '', 140, 3, NULL, '', NULL, '', '11', '11', '2017-03-09 09:03:39', '2017-03-09 09:03:39');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (8, 'Akun Perkiraan', 'GridTreeAcc2', 0, 3, NULL, 'akun', 0, 'Menampilkan daftar akun, membuat, merubah dan menghapus akun', NULL, 'staff', NULL, '2017-03-08 19:03:30');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (132, 'Accounting', 'TabMasterFinancial', 127, 1, NULL, 'akun', NULL, '', 'staff', '11', '2017-03-08 19:03:59', '2017-03-09 09:03:45');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (150, 'Receipt From Production', '', 140, 4, NULL, '', NULL, '', '11', '11', '2017-03-09 09:03:52', '2017-03-09 09:03:52');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (129, 'Supplier', 'TabMasterSupplier', 127, 1, NULL, 'suplier', NULL, '', 'staff', '11', '2017-03-08 19:03:13', '2017-03-09 09:03:37');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (128, 'Customer', 'TabMasterCustomer', 127, 1, NULL, 'pelanggan', NULL, '', 'staff', '11', '2017-03-08 19:03:07', '2017-03-09 09:03:32');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (95, 'Data Pelanggan', 'gridPelanggan', 0, 6, NULL, 'pelanggan', 0, 'Menambah, mengubah dan menghapus pelanggan', NULL, NULL, NULL, NULL);
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (2, 'Setup', '', 0, 1, NULL, 'setup', NULL, 'Pengaturan-pengaturan yang harus di lakukan pada saat awal memulai aplikasi', NULL, '11', NULL, '2017-03-09 09:03:25');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (141, 'Sales Quotation', '', 139, 1, NULL, '', NULL, '', '11', '11', '2017-03-09 09:03:12', '2017-03-09 09:03:12');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (139, 'Sales', '', 0, 8, NULL, 'sales', NULL, '', '11', '11', '2017-03-09 09:03:06', '2017-03-09 10:03:24');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (140, 'Production', '', 0, 9, NULL, 'production', NULL, '', '11', '11', '2017-03-09 09:03:31', '2017-03-09 10:03:00');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (127, 'Master Data', '', 0, 2, NULL, 'master', NULL, '', 'staff', '11', '2017-03-08 19:03:22', '2017-03-09 10:03:05');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (131, 'Inventory Setup', 'TabMasterInventory', 127, 1, NULL, '', NULL, '', 'staff', '11', '2017-03-08 19:03:39', '2017-03-09 17:03:06');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (151, 'Post Periods', 'TabPostPeriods', 2, 11, NULL, '', NULL, 'Membuat periode pembukuan tahunan', 'staff', '0', '2017-03-13 14:59:40.709016', '2017-03-13 15:03:31');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (153, 'Upload/Import Data', 'GridUploadImportData', 2, 13, NULL, '', NULL, 'Upload/Import Data', 'staff', '0', '2017-03-13 15:07:01.769595', '2017-03-13 15:03:56');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (152, 'Document Numbering', 'GridDocumentNumbering', 2, 12, NULL, '', NULL, 'Input format penomoran dokumen', 'staff', '0', '2017-03-13 15:07:01.769595', '2017-03-13 15:03:13');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (154, 'Conversion Table', 'GridConversionTable', 2, 14, NULL, '', NULL, 'Pengaturan Konversi Satuan Coil', 'staff', '0', '2017-03-13 15:07:01.769595', '2017-03-13 15:03:28');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (166, 'Sales Report', 'TabReportSales', 27, 15, NULL, '', NULL, '', '0', '0', '2017-03-14 02:03:17', '2017-03-14 03:03:39');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (142, 'Sales Order', '', 139, 2, NULL, '', NULL, '', '11', '0', '2017-03-09 09:03:24', '2017-03-14 02:03:56');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (167, 'AR Report', 'TabReportAR', 27, 16, NULL, '', NULL, '', '0', '0', '2017-03-14 02:03:48', '2017-03-14 14:03:01');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (168, 'Purchase Report', 'TabReportPurchase', 27, 16, NULL, '', NULL, '', '0', '0', '2017-03-14 18:03:56', '2017-03-14 18:03:56');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (169, 'AP Report', 'TabReportAP', 27, 17, NULL, '', NULL, '', '0', '0', '2017-03-14 19:03:37', '2017-03-14 19:03:37');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (170, 'Inventory Report', 'TabReportInventory', 27, 17, NULL, '', NULL, '', '0', '0', '2017-03-14 19:03:31', '2017-03-14 19:03:31');
INSERT INTO sys_menu (sys_menu_id, menu_name, menu_link, parent, sort, status, icon, display, description, userin, usermod, datein, datemod) VALUES (171, 'Project', 'GridMasterProject', 127, 7, NULL, '', NULL, '', '0', '0', '2017-03-20 18:03:20', '2017-03-20 18:03:20');


--
-- Data for Name: sys_menu_unit; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: sys_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO sys_user (user_id, username, password, email, laslogin, userin, usermod, datein, datemod, group_id, realname, idunitbak, iduserparent, display, clientid, idcompany) VALUES (1, 'admin', 'admin', 'admin@admin.com', '2015-04-26 17:04:28', NULL, 'admin', NULL, '2014-05-22 07:05:19', 99, 'Super User', NULL, NULL, NULL, NULL, NULL);
INSERT INTO sys_user (user_id, username, password, email, laslogin, userin, usermod, datein, datemod, group_id, realname, idunitbak, iduserparent, display, clientid, idcompany) VALUES (7, 'administrator', 'administrator', 'wimarasih', '2017-02-06 14:02:01', NULL, 'administrator', NULL, '2015-05-07 08:05:43', 1, '', NULL, NULL, NULL, 1, 1);
INSERT INTO sys_user (user_id, username, password, email, laslogin, userin, usermod, datein, datemod, group_id, realname, idunitbak, iduserparent, display, clientid, idcompany) VALUES (11, 'staff', 'staff', 'info@alfa.com', '2017-03-20 21:03:01', 'administrator', 'administrator', '2015-03-21 21:03:06', '2017-01-26 04:01:39', 2, '', NULL, NULL, NULL, NULL, 1);


--
-- Data for Name: tambahangaji; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tambahangaji (idtambahangaji, idemployee, idtambahangajitype, idsiklus, namatambahan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, keterangan) VALUES (2, 4, 1, 1, '0', '2013-02-05', '2015-02-06', 500000, NULL, 'administrator', 'administrator', '2015-02-06 09:02:10', '2015-02-06 09:02:10', '-');
INSERT INTO tambahangaji (idtambahangaji, idemployee, idtambahangajitype, idsiklus, namatambahan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, keterangan) VALUES (4, 5, 1, 1, '0', '2013-03-26', '2019-04-10', 30000, NULL, 'administrator', 'administrator', '2015-03-05 08:03:31', '2015-03-09 04:03:55', '--');
INSERT INTO tambahangaji (idtambahangaji, idemployee, idtambahangajitype, idsiklus, namatambahan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, keterangan) VALUES (5, 6, 1, 1, '0', '2015-04-01', '2015-04-30', 10000000, NULL, 'administrator', 'administrator', '2015-04-22 06:04:34', '2015-04-22 06:04:34', '-');


--
-- Data for Name: tambahangajihistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tambahangajihistory (idtambahangaji, idpayroll, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (4, NULL, '2015-03-09', 'administrator', '2015-03-09 00:03:28', '03', 2015, 30000, 5);
INSERT INTO tambahangajihistory (idtambahangaji, idpayroll, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (4, NULL, '2015-03-09', 'administrator', '2015-03-09 00:03:28', '03', 2015, 30000, 5);
INSERT INTO tambahangajihistory (idtambahangaji, idpayroll, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (4, NULL, '2015-03-09', 'administrator', '2015-03-09 04:03:12', '03', 2015, 30000, 5);
INSERT INTO tambahangajihistory (idtambahangaji, idpayroll, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (4, NULL, '2015-03-09', 'administrator', '2015-03-09 04:03:12', '03', 2015, 30000, 5);
INSERT INTO tambahangajihistory (idtambahangaji, idpayroll, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (4, NULL, '2015-03-09', 'administrator', '2015-03-09 04:03:14', '03', 2015, 30000, 5);
INSERT INTO tambahangajihistory (idtambahangaji, idpayroll, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (4, NULL, '2015-03-09', 'administrator', '2015-03-09 04:03:14', '03', 2015, 30000, 5);
INSERT INTO tambahangajihistory (idtambahangaji, idpayroll, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (4, NULL, '2015-03-09', 'administrator', '2015-03-09 04:03:29', '03', 2015, 30000, 5);
INSERT INTO tambahangajihistory (idtambahangaji, idpayroll, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (4, NULL, '2015-03-09', 'administrator', '2015-03-09 04:03:29', '03', 2015, 30000, 5);
INSERT INTO tambahangajihistory (idtambahangaji, idpayroll, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (4, NULL, '2015-03-09', 'administrator', '2015-03-09 04:03:45', '03', 2015, 30000, 5);
INSERT INTO tambahangajihistory (idtambahangaji, idpayroll, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (4, NULL, '2015-03-09', 'administrator', '2015-03-09 04:03:45', '03', 2015, 30000, 5);
INSERT INTO tambahangajihistory (idtambahangaji, idpayroll, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (4, NULL, '2015-03-09', 'administrator', '2015-03-09 04:03:57', '03', 2015, 30000, 5);
INSERT INTO tambahangajihistory (idtambahangaji, idpayroll, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (4, NULL, '2015-03-09', 'administrator', '2015-03-09 04:03:57', '03', 2015, 30000, 5);
INSERT INTO tambahangajihistory (idtambahangaji, idpayroll, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (4, NULL, '2015-03-20', 'administrator', '2015-03-20 18:03:21', '03', 2015, 30000, 5);


--
-- Data for Name: tambahangajitype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tambahangajitype (idtambahangajitype, idunit, tambahantype, deskripsi, userin, usermod, datein, datemod, display) VALUES (1, 12, 'Penambahan Gaji 1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO tambahangajitype (idtambahangajitype, idunit, tambahantype, deskripsi, userin, usermod, datein, datemod, display) VALUES (2, 12, 'Penambahan Gaji 2', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO tambahangajitype (idtambahangajitype, idunit, tambahantype, deskripsi, userin, usermod, datein, datemod, display) VALUES (4, 14, '123', '123', 'administrator', 'administrator', '2015-05-19 15:05:46', '2015-05-19 15:05:54', 0);


--
-- Data for Name: tax; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tax (idtax, idtaxtype, code, nametax, description, rate, acccollectedtax, acctaxpaid, userin, usermod, datein, datemod, display, idcompany) VALUES (1, 1, 'PPN', 'PPN', '', 10, 636, 635, NULL, 'adminunit2', NULL, '2015-01-07 11:01:36', NULL, 1);
INSERT INTO tax (idtax, idtaxtype, code, nametax, description, rate, acccollectedtax, acctaxpaid, userin, usermod, datein, datemod, display, idcompany) VALUES (2, 1, 'NON-PPN', 'NON PPN', '', 0, 4, 7, NULL, 'admin', NULL, '2014-08-22 16:08:51', NULL, 1);
INSERT INTO tax (idtax, idtaxtype, code, nametax, description, rate, acccollectedtax, acctaxpaid, userin, usermod, datein, datemod, display, idcompany) VALUES (9, 1, 'PPh21', 'PPh Pasal 22', 'Pajak Penghasilan atas Pembelian Barang Mewah', 0, 0, 0, 'administrator', 'administrator', '2015-04-24 12:04:43', '2015-04-24 12:04:43', NULL, NULL);


--
-- Data for Name: taxhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO taxhistory (idtax, taxval, rate, datein, idpurchase, idjournal, type) VALUES (1, 50000, 10, '2015-01-09 00:00:00', NULL, 379, 'pembelian');


--
-- Data for Name: taxlinkunit; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (1, 1, 636, 635);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (1, 1, 636, 635);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (1, 2, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (1, 2, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (1, 7, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (1, 8, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (1, 9, 37, 36);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (1, 10, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (1, 15, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (2, 1, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (2, 1, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (2, 2, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (2, 2, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (2, 7, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (2, 8, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (2, 9, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (2, 10, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (2, 15, NULL, NULL);
INSERT INTO taxlinkunit (idtax, idunit, acccollectedtax, acctaxpaid) VALUES (9, 15, NULL, NULL);


--
-- Data for Name: taxtype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO taxtype (idtaxtype, nametypetax, description) VALUES (1, 'Goods and Service Tax', 'Transaksi penjualan barang dan jasa kena pajak');
INSERT INTO taxtype (idtaxtype, nametypetax, description) VALUES (2, 'Sales Tax', 'Tarif pajak penjualan');
INSERT INTO taxtype (idtaxtype, nametypetax, description) VALUES (3, 'Consolidate', 'Menggabungkan dua atau lebih tarif pajak ata transaksi kena pajak');
INSERT INTO taxtype (idtaxtype, nametypetax, description) VALUES (4, 'Import Duty', 'pajak untuk mencatat biaya import/bea masuk barang');
INSERT INTO taxtype (idtaxtype, nametypetax, description) VALUES (5, 'Input Taxed', 'Tidak dibebankan langsung kepada pelanggan. Digunakan untuk pembelian barang untuk perusahaan');


--
-- Data for Name: thickness; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO thickness (thickness_id, item_thickness_tct, item_thickness_bmt, idunit, display, userin, datein, usermod, datemod, status, deleted) VALUES (1, 0.450000000000000011, 0.359999999999999987, 12, NULL, '0', '2017-03-09', '0', '2017-03-20', 1, NULL);


--
-- Data for Name: thr; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: thrlist; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: thrlisttmp; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tmpdepresiasi; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tmppurchase; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tmppurchase (idinventory, total, idunit, datein, assetaccount, userin, idjournal, idtax, tax) VALUES (28, 500000, 9, '2015-04-16 19:04:11', 20, 'adminsmk', 365, NULL, NULL);
INSERT INTO tmppurchase (idinventory, total, idunit, datein, assetaccount, userin, idjournal, idtax, tax) VALUES (28, 500000, 9, '2015-04-20 04:04:33', 25, 'adminsmk', 383, 1, 50000);
INSERT INTO tmppurchase (idinventory, total, idunit, datein, assetaccount, userin, idjournal, idtax, tax) VALUES (28, 500000, 12, '2015-09-07 10:09:44', 25, 'adminsmk', 409, 2, 0);


--
-- Data for Name: tmptax; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: transferkas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO transferkas (idtransferkas, idaccountsumber, idaccounttujuan, idunit, memo, tanggal, nominal, userin, datein, usermod, datemod, idjournal) VALUES (2, 681, 623, 2, 'transfer ke kas kecil', '2015-02-23', 1000000, 'adminunit2', '2015-02-27 23:02:02', 'adminunit2', '2015-02-27 23:02:02', NULL);
INSERT INTO transferkas (idtransferkas, idaccountsumber, idaccounttujuan, idunit, memo, tanggal, nominal, userin, datein, usermod, datemod, idjournal) VALUES (3, 681, 623, 1, 'Transfer Kas', '2015-03-16', 500000, 'administrator', '2015-03-06 00:03:49', 'administrator', '2015-03-06 00:03:49', NULL);
INSERT INTO transferkas (idtransferkas, idaccountsumber, idaccounttujuan, idunit, memo, tanggal, nominal, userin, datein, usermod, datemod, idjournal) VALUES (4, 681, 623, 1, 'Transfer kas', '2015-03-27', 5000000, 'administrator', '2015-03-09 09:03:07', 'administrator', '2015-03-09 09:03:07', NULL);
INSERT INTO transferkas (idtransferkas, idaccountsumber, idaccounttujuan, idunit, memo, tanggal, nominal, userin, datein, usermod, datemod, idjournal) VALUES (5, 681, 674, 1, 'Setor Tunai BCA', '2015-03-29', 500000, 'administrator', '2015-03-17 15:03:45', 'administrator', '2015-03-17 15:03:45', 350);
INSERT INTO transferkas (idtransferkas, idaccountsumber, idaccounttujuan, idunit, memo, tanggal, nominal, userin, datein, usermod, datemod, idjournal) VALUES (6, 9, 7, 12, '', '2015-11-13', 500000, 'adminsmk', '2015-11-13 14:11:31', 'adminsmk', '2015-11-13 14:11:31', 412);


--
-- Data for Name: tunjangan; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (8, 2, NULL, 2, 1, '-', '2014-09-02', '2015-03-05', 200000, 0, 'administrator', 'administrator', '2015-02-05 22:02:05', '2015-02-05 22:02:05', NULL, NULL, NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (10, 3, NULL, 4, 1, '', '2012-03-01', '2019-03-01', NULL, NULL, 'admin', 'admin', '2015-02-23 12:02:20', '2015-02-23 12:02:20', 2.5, 'Persentase', NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (13, 5, NULL, 2, 1, 'Tunjangan Kesejahteraan Karyawan', '2011-02-19', '2019-03-12', 100000, NULL, 'admin', 'admin', '2015-02-23 16:02:57', '2015-02-23 16:02:23', NULL, 'Nilai Tetap', NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (14, 6, NULL, 2, 1, '', '2011-02-11', '2019-02-11', 85000, NULL, 'admin', 'admin', '2015-02-23 16:02:54', '2015-02-23 16:02:54', NULL, 'Nilai Tetap', NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (15, 7, NULL, 2, 1, '', '2011-02-25', '2019-03-12', 40000, NULL, 'admin', 'admin', '2015-02-23 16:02:21', '2015-02-23 16:02:21', NULL, 'Nilai Tetap', NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (16, 8, NULL, 2, 1, '', '2011-02-24', '2019-03-05', 75000, NULL, 'admin', 'admin', '2015-02-23 16:02:42', '2015-02-23 16:02:42', NULL, 'Nilai Tetap', NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (17, 10, NULL, 2, 1, '', '2011-02-25', '2019-03-05', 100000, NULL, 'admin', 'admin', '2015-02-23 17:02:16', '2015-02-23 17:02:16', NULL, 'Nilai Tetap', NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (18, 11, NULL, 2, 1, '', '2011-03-04', '2019-03-04', 222870, NULL, 'admin', 'admin', '2015-02-23 17:02:37', '2015-02-23 17:02:37', NULL, 'Nilai Tetap', NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (19, 2, NULL, 2, 1, '', '2011-03-05', '2019-03-05', 385000, NULL, 'admin', 'admin', '2015-02-23 17:02:04', '2015-02-23 17:02:04', NULL, 'Nilai Tetap', NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (20, 4, NULL, 5, 1, 'Tunjangan Anak', '2014-03-19', '2015-03-28', NULL, NULL, 'administrator', 'administrator', '2015-03-05 08:03:17', '2015-03-09 04:03:06', 2, 'Persentase', NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (21, 3, NULL, 5, 1, 'Tunjangan Istri', '2014-03-10', '2019-04-10', NULL, NULL, 'administrator', 'administrator', '2015-03-05 08:03:31', '2015-03-09 04:03:12', 3, 'Persentase', NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (22, 3, NULL, 6, 1, 'Tunjangan Istri', '2011-03-31', '2015-05-01', 50000, NULL, 'adminsmk', 'administrator', '2015-04-20 11:04:44', '2015-04-22 06:04:57', NULL, 'Nilai Tetap', NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (23, 9, NULL, 6, 1, 'dsads', '2011-04-07', '2015-05-01', 150000, NULL, 'adminsmk', 'adminsmk', '2015-04-20 11:04:03', '2015-04-20 11:04:03', NULL, 'Nilai Tetap', NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (24, 2, NULL, 6, 1, 'dsadsa', '2011-04-07', '2019-04-27', 250000, NULL, 'adminsmk', 'adminsmk', '2015-04-20 11:04:23', '2015-04-20 11:04:23', NULL, 'Nilai Tetap', NULL);
INSERT INTO tunjangan (idtunjangan, idtunjtype, idamounttype, idemployee, idsiklus, namatunjangan, startdate, enddate, jumlah, display, userin, usermod, datein, datemod, persen, jenisnilai, idupload) VALUES (33, 8, 1, 6, 1, NULL, '2015-04-04', '2015-05-03', 150000, NULL, 'administrator', 'administrator', '2015-04-29 06:04:51', '2015-04-29 06:04:51', NULL, 'Nilai Tetap', 15);


--
-- Data for Name: tunjanganhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tunjanganhistory (idtunjangan, idprosesgaji, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (24, NULL, '2015-05-31', 'adminsmk', '2015-09-07 11:09:43', '05', 2015, 250000, 6);
INSERT INTO tunjanganhistory (idtunjangan, idprosesgaji, datepaid, userin, datein, month, year, jumlah, idemployee) VALUES (24, NULL, '2015-11-01', 'adminsmk', '2015-11-13 19:11:27', '11', 2015, 250000, 6);


--
-- Data for Name: tunjangantype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tunjangantype (idtunjtype, idunit, nametunj, desctunj, userin, usermod, datein, datemod, display, idcompany) VALUES (1, 2, 'THR', 'Tunjangan Hari Raya', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO tunjangantype (idtunjtype, idunit, nametunj, desctunj, userin, usermod, datein, datemod, display, idcompany) VALUES (2, 2, 'Tunjangan Transport', 'Tunjangan Transportasi', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO tunjangantype (idtunjtype, idunit, nametunj, desctunj, userin, usermod, datein, datemod, display, idcompany) VALUES (3, 2, 'Tunjangan Istri', NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO tunjangantype (idtunjtype, idunit, nametunj, desctunj, userin, usermod, datein, datemod, display, idcompany) VALUES (4, 2, 'Tunjangan Anak', NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO tunjangantype (idtunjtype, idunit, nametunj, desctunj, userin, usermod, datein, datemod, display, idcompany) VALUES (5, 2, 'Tunjangan Kesejahteraan Karyawan', NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO tunjangantype (idtunjtype, idunit, nametunj, desctunj, userin, usermod, datein, datemod, display, idcompany) VALUES (6, 2, 'Tunjangan Jabatan Khusus', NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO tunjangantype (idtunjtype, idunit, nametunj, desctunj, userin, usermod, datein, datemod, display, idcompany) VALUES (7, 2, 'Tunjangan Beras', NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO tunjangantype (idtunjtype, idunit, nametunj, desctunj, userin, usermod, datein, datemod, display, idcompany) VALUES (8, 2, 'Tunjangan Mk Yayasan', NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO tunjangantype (idtunjtype, idunit, nametunj, desctunj, userin, usermod, datein, datemod, display, idcompany) VALUES (9, 2, 'Tunjangan Jabatan', NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO tunjangantype (idtunjtype, idunit, nametunj, desctunj, userin, usermod, datein, datemod, display, idcompany) VALUES (10, 2, 'Tunjangan Perumahan', NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO tunjangantype (idtunjtype, idunit, nametunj, desctunj, userin, usermod, datein, datemod, display, idcompany) VALUES (11, 2, 'Tunjangan Jamsostek', NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO tunjangantype (idtunjtype, idunit, nametunj, desctunj, userin, usermod, datein, datemod, display, idcompany) VALUES (42, NULL, 'xxxxxxxx', 'xxxxxx', 'administrator', 'administrator', '2015-04-27 11:04:29', '2015-04-27 11:04:36', 0, 1);


--
-- Data for Name: unit; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO unit (idunit, namaunit, deskripsi, alamat, display, userin, usermod, datein, datemod, alamat2, alamat3, telp, fax, email, website, country, npwp, curfinanceyear, lastmonthfinanceyear, conversionmonth, numaccperiod, curfinancemonth, startfinancemonth, startfinanceyear, idbussinestype, logo, idcompany, dateformat, is_taxable) VALUES (99, 'unit akun template', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO unit (idunit, namaunit, deskripsi, alamat, display, userin, usermod, datein, datemod, alamat2, alamat3, telp, fax, email, website, country, npwp, curfinanceyear, lastmonthfinanceyear, conversionmonth, numaccperiod, curfinancemonth, startfinancemonth, startfinanceyear, idbussinestype, logo, idcompany, dateformat, is_taxable) VALUES (12, 'PT Alfa Prima Sentosa', '0', 'Tangerang Selatan', NULL, 'administrator', 'staff', '2015-04-22 06:04:50', '2017-03-08 18:03:37', '', '', '', '', '', '', NULL, '', 2017, '12', '11', 12, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0);


--
-- Data for Name: unit_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO unit_item (unit_item_id, unit_name) VALUES (1, 'Cm');
INSERT INTO unit_item (unit_item_id, unit_name) VALUES (2, 'Mm');


--
-- Data for Name: upload; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO upload (idupload, orig_name, userin, datein, type) VALUES (4, 'tempate_import_tunjangan.xlsx', 'administrator', '2015-04-27 17:04:07', 'tunjangan');
INSERT INTO upload (idupload, orig_name, userin, datein, type) VALUES (5, 'tempate_import_tunjangan.xlsx', 'administrator', '2015-04-27 23:04:00', 'tunjangan');
INSERT INTO upload (idupload, orig_name, userin, datein, type) VALUES (6, 'tempate_import_tunjangan.xlsx', 'administrator', '2015-04-27 23:04:09', 'tunjangan');
INSERT INTO upload (idupload, orig_name, userin, datein, type) VALUES (7, 'tempate_import_tunjangan.xlsx', 'administrator', '2015-04-27 23:04:47', 'tunjangan');
INSERT INTO upload (idupload, orig_name, userin, datein, type) VALUES (8, 'tempate_import_tunjangan.xlsx', 'administrator', '2015-04-27 23:04:39', 'tunjangan');
INSERT INTO upload (idupload, orig_name, userin, datein, type) VALUES (13, 'tempate_import_potongan.xlsx', 'administrator', '2015-04-28 12:04:49', 'potongan');
INSERT INTO upload (idupload, orig_name, userin, datein, type) VALUES (14, 'tempate_import_potongan.xlsx', 'administrator', '2015-04-28 12:04:40', 'potongan');
INSERT INTO upload (idupload, orig_name, userin, datein, type) VALUES (15, 'tempate_import_tunjangan.xlsx', 'administrator', '2015-04-29 06:04:51', 'tunjangan');
INSERT INTO upload (idupload, orig_name, userin, datein, type) VALUES (16, 'tempate_import_pegawai.xlsx', 'administrator', '2015-05-20 04:05:58', 'potongan');


--
-- Data for Name: userunit; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO userunit (user_id, idunit) VALUES (7, 12);
INSERT INTO userunit (user_id, idunit) VALUES (11, 12);


--
-- Data for Name: warehouse; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO warehouse (warehouse_id, warehouse_address, warehouse_cogs_standard, warehouse_type, warehouse_desc, idunit, display, userin, datein, usermod, datemod, warehouse_code, status, deleted) VALUES (1, 'ada', 'adsa', 'fsf', '', 12, NULL, '0', '2017-03-10', '0', '2017-03-20', 'ada', 1, NULL);


--
-- Name: account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_pkey PRIMARY KEY (idaccount, idunit);


--
-- Name: accountingdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accountingdata
    ADD CONSTRAINT accountingdata_pkey PRIMARY KEY (idaccountingdata);


--
-- Name: accountlog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accountlog
    ADD CONSTRAINT accountlog_pkey PRIMARY KEY (idaccount, tanggal, idjournal, userid, idunit);


--
-- Name: accountpos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accountpos
    ADD CONSTRAINT accountpos_pkey PRIMARY KEY (idpos);


--
-- Name: accountsubtype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accountsubtype
    ADD CONSTRAINT accountsubtype_pkey PRIMARY KEY (idaccountsubtype);


--
-- Name: accounttype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accounttype
    ADD CONSTRAINT accounttype_pkey PRIMARY KEY (idaccounttype);


--
-- Name: alerttype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY alerttype
    ADD CONSTRAINT alerttype_pkey PRIMARY KEY (idalerttype);


--
-- Name: amounttype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY amounttype
    ADD CONSTRAINT amounttype_pkey PRIMARY KEY (idamounttype);


--
-- Name: asuransi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY asuransi
    ADD CONSTRAINT asuransi_pkey PRIMARY KEY (idasuransi);


--
-- Name: asuransiemp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY asuransiemp
    ADD CONSTRAINT asuransiemp_pkey PRIMARY KEY (idasuransiemp);


--
-- Name: asuransipayhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY asuransipayhistory
    ADD CONSTRAINT asuransipayhistory_pkey PRIMARY KEY (idasuransi, idemployee, year, month);


--
-- Name: asuransipaytype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY asuransipaytype
    ADD CONSTRAINT asuransipaytype_pkey PRIMARY KEY (idasuransipaytype);


--
-- Name: asuransitype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY asuransitype
    ADD CONSTRAINT asuransitype_pkey PRIMARY KEY (idasuransitype);


--
-- Name: bank_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY bank
    ADD CONSTRAINT bank_pkey PRIMARY KEY (bank_id);


--
-- Name: brand_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY brand
    ADD CONSTRAINT brand_pkey PRIMARY KEY (brand_id);


--
-- Name: bussinestype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY bussinestype
    ADD CONSTRAINT bussinestype_pkey PRIMARY KEY (idbussinestype);


--
-- Name: classificationcf_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classificationcf
    ADD CONSTRAINT classificationcf_pkey PRIMARY KEY (idclassificationcf);


--
-- Name: client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client
    ADD CONSTRAINT client_pkey PRIMARY KEY (clientid);


--
-- Name: clossing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY clossing
    ADD CONSTRAINT clossing_pkey PRIMARY KEY (idclossing);


--
-- Name: company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY company
    ADD CONSTRAINT company_pkey PRIMARY KEY (idcompany);


--
-- Name: credittterm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY credittterm
    ADD CONSTRAINT credittterm_pkey PRIMARY KEY (idcreditterm);


--
-- Name: currency_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY currency
    ADD CONSTRAINT currency_pkey PRIMARY KEY (idcurrency);


--
-- Name: customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (idcustomer);


--
-- Name: customertype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY customertype
    ADD CONSTRAINT customertype_pkey PRIMARY KEY (idcustomertype, idunit);


--
-- Name: dataanak_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY dataanak
    ADD CONSTRAINT dataanak_pkey PRIMARY KEY (datanakid);


--
-- Name: datasutri_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY datasutri
    ADD CONSTRAINT datasutri_pkey PRIMARY KEY (datasutri);


--
-- Name: disbursment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY disbursment
    ADD CONSTRAINT disbursment_pkey PRIMARY KEY (iddisbursment);


--
-- Name: employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (idemployee);


--
-- Name: employeetype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY employeetype
    ADD CONSTRAINT employeetype_pkey PRIMARY KEY (idemployeetype);


--
-- Name: frequency_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY frequency
    ADD CONSTRAINT frequency_pkey PRIMARY KEY (idfrequency);


--
-- Name: gradeid; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY productgrade
    ADD CONSTRAINT gradeid PRIMARY KEY (gradeid);


--
-- Name: hakakses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY hakakses
    ADD CONSTRAINT hakakses_pkey PRIMARY KEY (sys_menu_id, group_id);


--
-- Name: idlocation; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY location
    ADD CONSTRAINT idlocation PRIMARY KEY (idlocation);


--
-- Name: inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (idinventory);


--
-- Name: inventorycat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY inventorycat
    ADD CONSTRAINT inventorycat_pkey PRIMARY KEY (idinventorycat);


--
-- Name: inventorydeprec_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY inventorydeprec
    ADD CONSTRAINT inventorydeprec_pkey PRIMARY KEY (iddepreciation);


--
-- Name: inventorydeprecitem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY inventorydeprecitem
    ADD CONSTRAINT inventorydeprecitem_pkey PRIMARY KEY (iddepreciation, idinventory, month, year, idunit);


--
-- Name: inventoryunit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY inventoryunit
    ADD CONSTRAINT inventoryunit_pkey PRIMARY KEY (idinventory, idunit);


--
-- Name: jenisptkp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY jenisptkp
    ADD CONSTRAINT jenisptkp_pkey PRIMARY KEY (idjenisptkp);


--
-- Name: journal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY journal
    ADD CONSTRAINT journal_pkey PRIMARY KEY (idjournal);


--
-- Name: journalitem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY journalitem
    ADD CONSTRAINT journalitem_pkey PRIMARY KEY (idjournalitem);


--
-- Name: journalitemrec_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY journalitemrec
    ADD CONSTRAINT journalitemrec_pkey PRIMARY KEY (idjournalitemrec);


--
-- Name: journalrec_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY journalrec
    ADD CONSTRAINT journalrec_pkey PRIMARY KEY (idjournalrec);


--
-- Name: journaltype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY journaltype
    ADD CONSTRAINT journaltype_pkey PRIMARY KEY (idjournaltype);


--
-- Name: linkedacc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY linkedacc
    ADD CONSTRAINT linkedacc_pkey PRIMARY KEY (idlinked);


--
-- Name: linkpiutang_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY linkpiutang
    ADD CONSTRAINT linkpiutang_pkey PRIMARY KEY (idlinkpiutang);


--
-- Name: loginlog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY loginlog
    ADD CONSTRAINT loginlog_pkey PRIMARY KEY (loginlogid);


--
-- Name: machine_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY machine
    ADD CONSTRAINT machine_pkey PRIMARY KEY (machine_id);


--
-- Name: machine_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY machine_type
    ADD CONSTRAINT machine_type_pkey PRIMARY KEY (machine_type_id);


--
-- Name: month_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY month
    ADD CONSTRAINT month_pkey PRIMARY KEY (idmonth);


--
-- Name: package_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY package
    ADD CONSTRAINT package_pkey PRIMARY KEY (packageid);


--
-- Name: payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (idpayment);


--
-- Name: payroll_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payroll
    ADD CONSTRAINT payroll_pkey PRIMARY KEY (idpayroll);


--
-- Name: payrollproceed_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payrollproceed
    ADD CONSTRAINT payrollproceed_pkey PRIMARY KEY (idemployee, month, year, idunit);


--
-- Name: payrollsettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payrollsettings
    ADD CONSTRAINT payrollsettings_pkey PRIMARY KEY (payrollsettingid);


--
-- Name: payrolltmp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payrolltmp
    ADD CONSTRAINT payrolltmp_pkey PRIMARY KEY (idemployee, idunit);


--
-- Name: payrolltype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payrolltype
    ADD CONSTRAINT payrolltype_pkey PRIMARY KEY (payrolltypeid);


--
-- Name: pelanggan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY pelanggan
    ADD CONSTRAINT pelanggan_pkey PRIMARY KEY (idpelanggan);


--
-- Name: pelanggantype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY pelanggantype
    ADD CONSTRAINT pelanggantype_pkey PRIMARY KEY (idpelanggantype);


--
-- Name: piutangpayhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY piutangpayhistory
    ADD CONSTRAINT piutangpayhistory_pkey PRIMARY KEY (idregistrasipiutang, datein);


--
-- Name: potongan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY potongan
    ADD CONSTRAINT potongan_pkey PRIMARY KEY (idpotongan);


--
-- Name: potongantype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY potongantype
    ADD CONSTRAINT potongantype_pkey PRIMARY KEY (idpotongantype);


--
-- Name: product_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY product
    ADD CONSTRAINT product_id PRIMARY KEY (product_id);


--
-- Name: product_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY product_type
    ADD CONSTRAINT product_type_pkey PRIMARY KEY (product_type_id);


--
-- Name: productmeasurement_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY productmeasurement
    ADD CONSTRAINT productmeasurement_id PRIMARY KEY (measurement_id);


--
-- Name: project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY project
    ADD CONSTRAINT project_pkey PRIMARY KEY (project_id);


--
-- Name: prosesgaji_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY prosesgaji
    ADD CONSTRAINT prosesgaji_pkey PRIMARY KEY (idprosesgaji);


--
-- Name: purchase_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY purchase
    ADD CONSTRAINT purchase_pkey PRIMARY KEY (idpurchase);


--
-- Name: purchaseitem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY purchaseitem
    ADD CONSTRAINT purchaseitem_pkey PRIMARY KEY (idpurchaseitem);


--
-- Name: purchasestatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY purchasestatus
    ADD CONSTRAINT purchasestatus_pkey PRIMARY KEY (idpurchasestatus);


--
-- Name: purchasetype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY purchasetype
    ADD CONSTRAINT purchasetype_pkey PRIMARY KEY (idpurchasetype);


--
-- Name: rack_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rack
    ADD CONSTRAINT rack_id PRIMARY KEY (rack_id);


--
-- Name: receivemoney_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY receivemoney
    ADD CONSTRAINT receivemoney_pkey PRIMARY KEY (idreceivemoney);


--
-- Name: receivemoneyimport_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY receivemoneyimport
    ADD CONSTRAINT receivemoneyimport_pkey PRIMARY KEY (idreceivemoneyimport);


--
-- Name: receivemoneyitem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY receivemoneyitem
    ADD CONSTRAINT receivemoneyitem_pkey PRIMARY KEY (idreceivemoneyitem);


--
-- Name: receivepayment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY receivepayment
    ADD CONSTRAINT receivepayment_pkey PRIMARY KEY (idreceivepayment);


--
-- Name: reconcile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reconcile
    ADD CONSTRAINT reconcile_pkey PRIMARY KEY (idreconcile);


--
-- Name: registrasihutang_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY registrasihutang
    ADD CONSTRAINT registrasihutang_pkey PRIMARY KEY (idregistrasihutang);


--
-- Name: registrasipiutang_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY registrasipiutang
    ADD CONSTRAINT registrasipiutang_pkey PRIMARY KEY (idregistrasipiutang);


--
-- Name: return_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY return
    ADD CONSTRAINT return_pkey PRIMARY KEY (idreturn);


--
-- Name: returnitem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY returnitem
    ADD CONSTRAINT returnitem_pkey PRIMARY KEY (idreturn, idinventory);


--
-- Name: returntype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY returntype
    ADD CONSTRAINT returntype_pkey PRIMARY KEY (idreturntype);


--
-- Name: riwayatpembsiswa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY riwayatpembsiswa
    ADD CONSTRAINT riwayatpembsiswa_pkey PRIMARY KEY (idriwayatpemb);


--
-- Name: sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (idsales);


--
-- Name: salesitem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY salesitem
    ADD CONSTRAINT salesitem_pkey PRIMARY KEY (idsalesitem);


--
-- Name: sallary_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sallary
    ADD CONSTRAINT sallary_pkey PRIMARY KEY (idsallary);


--
-- Name: scheduletype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY scheduletype
    ADD CONSTRAINT scheduletype_pkey PRIMARY KEY (idscheduletype);


--
-- Name: sextype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sextype
    ADD CONSTRAINT sextype_pkey PRIMARY KEY (idsex);


--
-- Name: shipping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY shipping
    ADD CONSTRAINT shipping_pkey PRIMARY KEY (idshipping);


--
-- Name: siklus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY siklus
    ADD CONSTRAINT siklus_pkey PRIMARY KEY (idsiklus);


--
-- Name: siswa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY siswa
    ADD CONSTRAINT siswa_pkey PRIMARY KEY (idsiswa);


--
-- Name: siswapembayaran_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY siswapembayaran
    ADD CONSTRAINT siswapembayaran_pkey PRIMARY KEY (idsiswapembayaran);


--
-- Name: spendmoney_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY spendmoney
    ADD CONSTRAINT spendmoney_pkey PRIMARY KEY (idspendmoney);


--
-- Name: spendmoneyitem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY spendmoneyitem
    ADD CONSTRAINT spendmoneyitem_pkey PRIMARY KEY (idspendmoneyitem);


--
-- Name: supplier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY supplier
    ADD CONSTRAINT supplier_pkey PRIMARY KEY (idsupplier);


--
-- Name: supplier_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY supplier_type
    ADD CONSTRAINT supplier_type_pkey PRIMARY KEY (supplier_type_id);


--
-- Name: sys_group_menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sys_group_menu
    ADD CONSTRAINT sys_group_menu_pkey PRIMARY KEY (sys_menu_id, group_id);


--
-- Name: sys_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sys_group
    ADD CONSTRAINT sys_group_pkey PRIMARY KEY (group_id);


--
-- Name: sys_menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sys_menu
    ADD CONSTRAINT sys_menu_pkey PRIMARY KEY (sys_menu_id);


--
-- Name: sys_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sys_user
    ADD CONSTRAINT sys_user_pkey PRIMARY KEY (user_id);


--
-- Name: tambahangaji_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tambahangaji
    ADD CONSTRAINT tambahangaji_pkey PRIMARY KEY (idtambahangaji);


--
-- Name: tambahangajitype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tambahangajitype
    ADD CONSTRAINT tambahangajitype_pkey PRIMARY KEY (idtambahangajitype);


--
-- Name: tax_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tax
    ADD CONSTRAINT tax_pkey PRIMARY KEY (idtax);


--
-- Name: taxhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY taxhistory
    ADD CONSTRAINT taxhistory_pkey PRIMARY KEY (idtax, idjournal);


--
-- Name: taxtype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY taxtype
    ADD CONSTRAINT taxtype_pkey PRIMARY KEY (idtaxtype);


--
-- Name: thickness_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY thickness
    ADD CONSTRAINT thickness_id PRIMARY KEY (thickness_id);


--
-- Name: thr_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY thr
    ADD CONSTRAINT thr_pkey PRIMARY KEY (idthr);


--
-- Name: thrlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY thrlist
    ADD CONSTRAINT thrlist_pkey PRIMARY KEY (idthr, idemployee, month, year);


--
-- Name: thrlisttmp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY thrlisttmp
    ADD CONSTRAINT thrlisttmp_pkey PRIMARY KEY (idemployee, month, year);


--
-- Name: tmppurchase_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tmppurchase
    ADD CONSTRAINT tmppurchase_pkey PRIMARY KEY (idjournal, assetaccount);


--
-- Name: tmptax_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tmptax
    ADD CONSTRAINT tmptax_pkey PRIMARY KEY (idtax, idjournal, idunit);


--
-- Name: transferkas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transferkas
    ADD CONSTRAINT transferkas_pkey PRIMARY KEY (idtransferkas);


--
-- Name: tunjangan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tunjangan
    ADD CONSTRAINT tunjangan_pkey PRIMARY KEY (idtunjangan);


--
-- Name: tunjangantype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tunjangantype
    ADD CONSTRAINT tunjangantype_pkey PRIMARY KEY (idtunjtype);


--
-- Name: unit_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY unit_item
    ADD CONSTRAINT unit_item_pkey PRIMARY KEY (unit_item_id);


--
-- Name: unit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY unit
    ADD CONSTRAINT unit_pkey PRIMARY KEY (idunit);


--
-- Name: upload_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY upload
    ADD CONSTRAINT upload_pkey PRIMARY KEY (idupload);


--
-- Name: userunit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY userunit
    ADD CONSTRAINT userunit_pkey PRIMARY KEY (idunit, user_id);


--
-- Name: warehouse_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warehouse
    ADD CONSTRAINT warehouse_id PRIMARY KEY (warehouse_id);


--
-- Name: project_idcustomer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY project
    ADD CONSTRAINT project_idcustomer_fkey FOREIGN KEY (idcustomer) REFERENCES customer(idcustomer);


--
-- Name: project_idunit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY project
    ADD CONSTRAINT project_idunit_fkey FOREIGN KEY (idunit) REFERENCES unit(idunit);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

