/*
 Navicat Premium Data Transfer

 Source Server         : local-pgsql-mamp
 Source Server Type    : PostgreSQL
 Source Server Version : 90503
 Source Host           : localhost
 Source Database       : redsfin
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 90503
 File Encoding         : utf-8

 Date: 03/09/2017 18:14:13 PM
*/

-- ----------------------------
--  Sequence structure for seq_account
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_account";
CREATE SEQUENCE "seq_account" INCREMENT 1 START 762 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_account" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_amounttype
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_amounttype";
CREATE SEQUENCE "seq_amounttype" INCREMENT 1 START 7 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_amounttype" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_asuransi
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_asuransi";
CREATE SEQUENCE "seq_asuransi" INCREMENT 1 START 14 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_asuransi" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_asuransiemp
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_asuransiemp";
CREATE SEQUENCE "seq_asuransiemp" INCREMENT 1 START 19 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_asuransiemp" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_asuransipayhistory
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_asuransipayhistory";
CREATE SEQUENCE "seq_asuransipayhistory" INCREMENT 1 START 67 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_asuransipayhistory" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_clossing
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_clossing";
CREATE SEQUENCE "seq_clossing" INCREMENT 1 START 2318 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_clossing" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_customer
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_customer";
CREATE SEQUENCE "seq_customer" INCREMENT 1 START 8 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_customer" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_dataanak
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_dataanak";
CREATE SEQUENCE "seq_dataanak" INCREMENT 1 START 7 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_dataanak" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_datasutri
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_datasutri";
CREATE SEQUENCE "seq_datasutri" INCREMENT 1 START 16 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_datasutri" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_disbursment
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_disbursment";
CREATE SEQUENCE "seq_disbursment" INCREMENT 1 START 14 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_disbursment" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_employee
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_employee";
CREATE SEQUENCE "seq_employee" INCREMENT 1 START 15 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_employee" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_employeetype
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_employeetype";
CREATE SEQUENCE "seq_employeetype" INCREMENT 1 START 18 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_employeetype" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_inventory
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_inventory";
CREATE SEQUENCE "seq_inventory" INCREMENT 1 START 36 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_inventory" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_inventoryadjitem
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_inventoryadjitem";
CREATE SEQUENCE "seq_inventoryadjitem" INCREMENT 1 START 11 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_inventoryadjitem" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_inventoryadjusment
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_inventoryadjusment";
CREATE SEQUENCE "seq_inventoryadjusment" INCREMENT 1 START 45 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_inventoryadjusment" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_journal
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_journal";
CREATE SEQUENCE "seq_journal" INCREMENT 1 START 450 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_journal" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_journalitem
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_journalitem";
CREATE SEQUENCE "seq_journalitem" INCREMENT 1 START 2366 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_journalitem" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_linkpiutang
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_linkpiutang";
CREATE SEQUENCE "seq_linkpiutang" INCREMENT 1 START 9 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_linkpiutang" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_loginlog
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_loginlog";
CREATE SEQUENCE "seq_loginlog" INCREMENT 1 START 402 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_loginlog" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_master
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_master";
CREATE SEQUENCE "seq_master" INCREMENT 1 START 60 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_master" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_payroll
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_payroll";
CREATE SEQUENCE "seq_payroll" INCREMENT 1 START 55 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_payroll" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_pelanggan
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_pelanggan";
CREATE SEQUENCE "seq_pelanggan" INCREMENT 1 START 9 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_pelanggan" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_potongan
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_potongan";
CREATE SEQUENCE "seq_potongan" INCREMENT 1 START 25 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_potongan" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_prosesgaji
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_prosesgaji";
CREATE SEQUENCE "seq_prosesgaji" INCREMENT 1 START 18 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_prosesgaji" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_purchase
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_purchase";
CREATE SEQUENCE "seq_purchase" INCREMENT 1 START 67 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_purchase" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_purchaseitem
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_purchaseitem";
CREATE SEQUENCE "seq_purchaseitem" INCREMENT 1 START 48 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_purchaseitem" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_receivemoney
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_receivemoney";
CREATE SEQUENCE "seq_receivemoney" INCREMENT 1 START 66 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_receivemoney" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_receivemoneyimport
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_receivemoneyimport";
CREATE SEQUENCE "seq_receivemoneyimport" INCREMENT 1 START 19 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_receivemoneyimport" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_receivemoneyitem
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_receivemoneyitem";
CREATE SEQUENCE "seq_receivemoneyitem" INCREMENT 1 START 78 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_receivemoneyitem" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_reconcile
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_reconcile";
CREATE SEQUENCE "seq_reconcile" INCREMENT 1 START 18 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_reconcile" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_registrasihutang
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_registrasihutang";
CREATE SEQUENCE "seq_registrasihutang" INCREMENT 1 START 17 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_registrasihutang" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_registrasipiutang
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_registrasipiutang";
CREATE SEQUENCE "seq_registrasipiutang" INCREMENT 1 START 33 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_registrasipiutang" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_return
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_return";
CREATE SEQUENCE "seq_return" INCREMENT 1 START 20 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_return" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_riwayatpembsiswa
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_riwayatpembsiswa";
CREATE SEQUENCE "seq_riwayatpembsiswa" INCREMENT 1 START 7 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_riwayatpembsiswa" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_sallary
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_sallary";
CREATE SEQUENCE "seq_sallary" INCREMENT 1 START 8 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_sallary" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_siswa
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_siswa";
CREATE SEQUENCE "seq_siswa" INCREMENT 1 START 548 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_siswa" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_siswapembayaran
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_siswapembayaran";
CREATE SEQUENCE "seq_siswapembayaran" INCREMENT 1 START 43 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_siswapembayaran" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_spendmoney
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_spendmoney";
CREATE SEQUENCE "seq_spendmoney" INCREMENT 1 START 48 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_spendmoney" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_spendmoneyitem
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_spendmoneyitem";
CREATE SEQUENCE "seq_spendmoneyitem" INCREMENT 1 START 45 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_spendmoneyitem" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_supplier
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_supplier";
CREATE SEQUENCE "seq_supplier" INCREMENT 1 START 21 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_supplier" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_sys_menu
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_sys_menu";
CREATE SEQUENCE "seq_sys_menu" INCREMENT 1 START 150 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_sys_menu" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_tambahangaji
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_tambahangaji";
CREATE SEQUENCE "seq_tambahangaji" INCREMENT 1 START 11 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_tambahangaji" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_tambahangajitype
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_tambahangajitype";
CREATE SEQUENCE "seq_tambahangajitype" INCREMENT 1 START 10 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_tambahangajitype" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_tax
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_tax";
CREATE SEQUENCE "seq_tax" INCREMENT 1 START 19 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_tax" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_thr
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_thr";
CREATE SEQUENCE "seq_thr" INCREMENT 1 START 9 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_thr" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_transferkas
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_transferkas";
CREATE SEQUENCE "seq_transferkas" INCREMENT 1 START 12 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_transferkas" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_tunjangan
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_tunjangan";
CREATE SEQUENCE "seq_tunjangan" INCREMENT 1 START 39 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_tunjangan" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_unit
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_unit";
CREATE SEQUENCE "seq_unit" INCREMENT 1 START 22 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_unit" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_upload
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_upload";
CREATE SEQUENCE "seq_upload" INCREMENT 1 START 22 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_upload" OWNER TO "imm";

-- ----------------------------
--  Sequence structure for seq_user_id
-- ----------------------------
DROP SEQUENCE IF EXISTS "seq_user_id";
CREATE SEQUENCE "seq_user_id" INCREMENT 1 START 20 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "seq_user_id" OWNER TO "imm";

-- ----------------------------
--  Table structure for receivemoneyitem
-- ----------------------------
DROP TABLE IF EXISTS "receivemoneyitem";
CREATE TABLE "receivemoneyitem" (
	"idreceivemoneyitem" int8 NOT NULL DEFAULT nextval('seq_receivemoneyitem'::regclass),
	"idaccount" int8,
	"idreceivemoney" int8,
	"amount" float8,
	"memo" varchar(225) COLLATE "default",
	"ratetax" float8,
	"float8" float8,
	"denda" float8,
	"datereceive" date
)
WITH (OIDS=FALSE);
ALTER TABLE "receivemoneyitem" OWNER TO "imm";

-- ----------------------------
--  Table structure for employeetype
-- ----------------------------
DROP TABLE IF EXISTS "employeetype";
CREATE TABLE "employeetype" (
	"idemployeetype" int4 NOT NULL DEFAULT nextval('seq_employeetype'::regclass),
	"nametype" varchar(20) COLLATE "default",
	"description" text COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"idaccountpayroll" int4,
	"idunit" int4,
	"display" int4,
	"idaccount" int4,
	"payrolltypeid" int4,
	"fare" float8,
	"idaccountpaythr" int4,
	"idaccountthr" int4,
	"idcompany" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "employeetype" OWNER TO "imm";

-- ----------------------------
--  Records of employeetype
-- ----------------------------
BEGIN;
INSERT INTO "employeetype" VALUES ('7', 'Guru Tidak Tetap', 'Pegawai Kontrak', 'adminsmk', 'administrator', '2015-04-20 11:04:18', '2015-04-22 06:04:08', '0', null, null, '0', '1', '0', '0', '0', null);
INSERT INTO "employeetype" VALUES ('8', 'Guru Tetap', '', 'administrator', 'administrator', '2015-04-22 06:04:25', '2015-04-22 06:04:39', '0', '12', null, '0', '3', '0', '0', '0', null);
INSERT INTO "employeetype" VALUES ('9', 'Karyawan Tetap', '', 'administrator', 'administrator', '2015-04-22 06:04:54', '2015-04-22 06:04:54', '0', '12', null, '0', '3', '0', '0', '0', null);
INSERT INTO "employeetype" VALUES ('10', 'Karyawan Honorer', '', 'administrator', 'administrator', '2015-04-22 06:04:46', '2015-04-22 06:04:46', '0', '12', null, '0', '2', '0', '0', '0', null);
INSERT INTO "employeetype" VALUES ('11', 'Kepala Sekolah', '', 'administrator', 'administrator', '2015-04-22 06:04:22', '2015-04-24 05:04:23', '0', '12', null, '0', '3', '2500000', '0', '0', null);
COMMIT;

-- ----------------------------
--  Table structure for payrollsettings
-- ----------------------------
DROP TABLE IF EXISTS "payrollsettings";
CREATE TABLE "payrollsettings" (
	"payrollsettingid" int4 NOT NULL,
	"payrolltypeid" int4,
	"payrollname" varchar(100) COLLATE "default",
	"payrolldesc" varchar(225) COLLATE "default",
	"fare" float4,
	"datein" timestamp(6) NULL,
	"userin" varchar(32) COLLATE "default",
	"datemod" timestamp(6) NULL,
	"usermod" varchar(32) COLLATE "default",
	"display" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "payrollsettings" OWNER TO "imm";

-- ----------------------------
--  Table structure for payrolltmp
-- ----------------------------
DROP TABLE IF EXISTS "payrolltmp";
CREATE TABLE "payrolltmp" (
	"idemployee" int4 NOT NULL,
	"firstname" varchar(225) COLLATE "default",
	"lastname" varchar(225) COLLATE "default",
	"namaunit" varchar(100) COLLATE "default",
	"nametype" varchar(100) COLLATE "default",
	"jumlahjam" int4,
	"jumlahkehadiran" int4,
	"totalgaji" float8,
	"totaltunjangan" float8,
	"pph21" float8,
	"totalpotongan" float8,
	"totalpembayaran" float8,
	"payname" varchar(100) COLLATE "default",
	"userin" varchar(100) COLLATE "default",
	"code" varchar(100) COLLATE "default",
	"userid" int4,
	"idemployeetype" int4,
	"payrolltypeid" int4,
	"pembayaranperjamkehadiran" float8,
	"premiinsurance" text COLLATE "default",
	"ptkp" float8,
	"wajibpajak" float8,
	"jenispph21" varchar(53) COLLATE "default",
	"tarifpajak" float8,
	"pphterhutang" float8,
	"idunit" int4 NOT NULL,
	"penambahangaji" float8,
	"numtanggungan" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "payrolltmp" OWNER TO "imm";

-- ----------------------------
--  Table structure for accounthistory
-- ----------------------------
DROP TABLE IF EXISTS "accounthistory";
CREATE TABLE "accounthistory" (
	"idaccount" int8,
	"balance" float8,
	"day" int4,
	"month" char(2) COLLATE "default",
	"year" int4,
	"datein" timestamp(6) NULL,
	"userin" varchar COLLATE "default",
	"idunit" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "accounthistory" OWNER TO "imm";

-- ----------------------------
--  Records of accounthistory
-- ----------------------------
BEGIN;
INSERT INTO "accounthistory" VALUES ('6', '36950000', '26', '04', '2015', '2015-04-26 12:04:08', 'administrator', '14');
INSERT INTO "accounthistory" VALUES ('6', '37945000', '19', '05', '2015', '2015-05-19 13:05:49', 'administrator', '14');
INSERT INTO "accounthistory" VALUES ('6', '38450000', '26', '04', '2015', '2015-04-26 12:04:07', 'administrator', '14');
INSERT INTO "accounthistory" VALUES ('6', '39450000', '26', '04', '2015', '2015-04-26 12:04:32', 'administrator', '14');
INSERT INTO "accounthistory" VALUES ('25', '500000', '26', '04', '2015', '2015-04-26 12:04:32', 'administrator', '14');
INSERT INTO "accounthistory" VALUES ('25', '1000000', '19', '05', '2015', '2015-05-19 13:05:49', 'administrator', '14');
INSERT INTO "accounthistory" VALUES ('52', '50000', '26', '04', '2015', '2015-04-26 12:04:32', 'administrator', '14');
INSERT INTO "accounthistory" VALUES ('52', '55000', '19', '05', '2015', '2015-05-19 13:05:49', 'administrator', '14');
INSERT INTO "accounthistory" VALUES ('62', '2500000', '26', '04', '2015', '2015-04-26 12:04:08', 'administrator', '14');
INSERT INTO "accounthistory" VALUES ('67', '1500000', '26', '04', '2015', '2015-04-26 12:04:07', 'administrator', '14');
COMMIT;

-- ----------------------------
--  Table structure for classificationcf
-- ----------------------------
DROP TABLE IF EXISTS "classificationcf";
CREATE TABLE "classificationcf" (
	"idclassificationcf" int4 NOT NULL,
	"classname" varchar(20) COLLATE "default",
	"description" varchar(200) COLLATE "default",
	"prefixno" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "classificationcf" OWNER TO "imm";

COMMENT ON TABLE "classificationcf" IS 'classification cash flow';

-- ----------------------------
--  Records of classificationcf
-- ----------------------------
BEGIN;
INSERT INTO "classificationcf" VALUES ('1', 'Asset', null, '1');
INSERT INTO "classificationcf" VALUES ('2', 'Liability', null, '2');
INSERT INTO "classificationcf" VALUES ('3', 'Equity', null, '3');
INSERT INTO "classificationcf" VALUES ('4', 'Income', null, '4');
INSERT INTO "classificationcf" VALUES ('5', 'Cost of Sales', null, '5');
INSERT INTO "classificationcf" VALUES ('6', 'Expense', null, '6');
INSERT INTO "classificationcf" VALUES ('7', 'Other Income', null, '8');
INSERT INTO "classificationcf" VALUES ('8', 'Other Expense', null, '9');
COMMIT;

-- ----------------------------
--  Table structure for sequence
-- ----------------------------
DROP TABLE IF EXISTS "sequence";
CREATE TABLE "sequence" (
	"idunit" int4,
	"sequence" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "sequence" OWNER TO "imm";

-- ----------------------------
--  Records of sequence
-- ----------------------------
BEGIN;
INSERT INTO "sequence" VALUES ('1', '61');
INSERT INTO "sequence" VALUES ('1', '61');
INSERT INTO "sequence" VALUES ('2', '29');
INSERT INTO "sequence" VALUES ('2', '29');
INSERT INTO "sequence" VALUES ('9', '47');
INSERT INTO "sequence" VALUES ('14', '8');
INSERT INTO "sequence" VALUES (null, '1');
INSERT INTO "sequence" VALUES (null, '1');
INSERT INTO "sequence" VALUES ('12', '32');
COMMIT;

-- ----------------------------
--  Table structure for piutangpayhistory
-- ----------------------------
DROP TABLE IF EXISTS "piutangpayhistory";
CREATE TABLE "piutangpayhistory" (
	"idregistrasipiutang" int4 NOT NULL,
	"month" varchar(2) COLLATE "default",
	"year" int4,
	"penerimaan" float8,
	"jumlah" float8,
	"sisapiutang" float8,
	"idunit" int4,
	"datein" timestamp(6) NOT NULL,
	"userin" int4,
	"tglpenerimaan" date,
	"idjournal" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "piutangpayhistory" OWNER TO "imm";

-- ----------------------------
--  Table structure for amounttype
-- ----------------------------
DROP TABLE IF EXISTS "amounttype";
CREATE TABLE "amounttype" (
	"idamounttype" int4 NOT NULL,
	"name" varchar(30) COLLATE "default",
	"desc" varchar(80) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "amounttype" OWNER TO "imm";

-- ----------------------------
--  Records of amounttype
-- ----------------------------
BEGIN;
INSERT INTO "amounttype" VALUES ('1', 'Fix Amount', null, null, null, null, null);
INSERT INTO "amounttype" VALUES ('2', 'Persentase', null, null, null, null, null);
COMMIT;

-- ----------------------------
--  Table structure for frequency
-- ----------------------------
DROP TABLE IF EXISTS "frequency";
CREATE TABLE "frequency" (
	"idfrequency" int4 NOT NULL,
	"namefreq" varchar(20) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "frequency" OWNER TO "imm";

-- ----------------------------
--  Records of frequency
-- ----------------------------
BEGIN;
INSERT INTO "frequency" VALUES ('1', 'Harian');
INSERT INTO "frequency" VALUES ('2', 'Mingguan');
INSERT INTO "frequency" VALUES ('3', 'Bulanan');
INSERT INTO "frequency" VALUES ('4', 'Tahunan');
COMMIT;

-- ----------------------------
--  Table structure for thrlist
-- ----------------------------
DROP TABLE IF EXISTS "thrlist";
CREATE TABLE "thrlist" (
	"idthr" int4 NOT NULL,
	"idemployee" int4 NOT NULL,
	"pengali" int4,
	"totalpendapatan" float8,
	"masakerja" int4,
	"jumlahthr" float8,
	"thrtambahan" float8,
	"totalthr" float8,
	"month" varchar(2) NOT NULL COLLATE "default",
	"year" int4 NOT NULL,
	"keterangan" varchar(225) COLLATE "default",
	"kehadiranjam" int4,
	"userid" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "thrlist" OWNER TO "imm";

-- ----------------------------
--  Table structure for inventorydeprecitem
-- ----------------------------
DROP TABLE IF EXISTS "inventorydeprecitem";
CREATE TABLE "inventorydeprecitem" (
	"iddepreciation" int8 NOT NULL,
	"idinventory" int8 NOT NULL,
	"idaccount" int8,
	"onhand" int4,
	"counted" int4,
	"qty" int4,
	"unitcost" float8,
	"amount" float8,
	"memo" varchar(225) COLLATE "default",
	"diference" char(50) COLLATE "default",
	"month" varchar(2) NOT NULL COLLATE "default",
	"year" int4 NOT NULL,
	"penyusutan" float8,
	"bulanpenyusutan" int4,
	"idunit" int4 NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "inventorydeprecitem" OWNER TO "imm";

-- ----------------------------
--  Table structure for returntype
-- ----------------------------
DROP TABLE IF EXISTS "returntype";
CREATE TABLE "returntype" (
	"idreturntype" int4 NOT NULL,
	"namereturn" varchar(50) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "returntype" OWNER TO "imm";

-- ----------------------------
--  Table structure for taxlinkunit
-- ----------------------------
DROP TABLE IF EXISTS "taxlinkunit";
CREATE TABLE "taxlinkunit" (
	"idtax" int4,
	"idunit" int4,
	"acccollectedtax" int4,
	"acctaxpaid" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "taxlinkunit" OWNER TO "imm";

-- ----------------------------
--  Records of taxlinkunit
-- ----------------------------
BEGIN;
INSERT INTO "taxlinkunit" VALUES ('1', '1', '636', '635');
INSERT INTO "taxlinkunit" VALUES ('1', '1', '636', '635');
INSERT INTO "taxlinkunit" VALUES ('1', '2', null, null);
INSERT INTO "taxlinkunit" VALUES ('1', '2', null, null);
INSERT INTO "taxlinkunit" VALUES ('1', '7', null, null);
INSERT INTO "taxlinkunit" VALUES ('1', '8', null, null);
INSERT INTO "taxlinkunit" VALUES ('1', '9', '37', '36');
INSERT INTO "taxlinkunit" VALUES ('1', '10', null, null);
INSERT INTO "taxlinkunit" VALUES ('1', '15', null, null);
INSERT INTO "taxlinkunit" VALUES ('2', '1', null, null);
INSERT INTO "taxlinkunit" VALUES ('2', '1', null, null);
INSERT INTO "taxlinkunit" VALUES ('2', '2', null, null);
INSERT INTO "taxlinkunit" VALUES ('2', '2', null, null);
INSERT INTO "taxlinkunit" VALUES ('2', '7', null, null);
INSERT INTO "taxlinkunit" VALUES ('2', '8', null, null);
INSERT INTO "taxlinkunit" VALUES ('2', '9', null, null);
INSERT INTO "taxlinkunit" VALUES ('2', '10', null, null);
INSERT INTO "taxlinkunit" VALUES ('2', '15', null, null);
INSERT INTO "taxlinkunit" VALUES ('9', '15', null, null);
COMMIT;

-- ----------------------------
--  Table structure for asuransi
-- ----------------------------
DROP TABLE IF EXISTS "asuransi";
CREATE TABLE "asuransi" (
	"idasuransi" int4 NOT NULL DEFAULT nextval('seq_asuransi'::regclass),
	"idasuransitype" int4,
	"idasuransipaytype" int4,
	"namapremi" varchar(30) COLLATE "default",
	"deskripsi" varchar(200) COLLATE "default",
	"fixamount" float8,
	"percentemployee" float8,
	"percentcompany" float8,
	"idaccountemp-deleted" int4,
	"idaccountcomp-deleted" int4,
	"userin" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"usermod" varchar(20) COLLATE "default",
	"datemod" timestamp(6) NULL,
	"display" int4,
	"tampilemp" varchar(2) COLLATE "default",
	"tampilcmp" varchar(2) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "asuransi" OWNER TO "imm";

-- ----------------------------
--  Records of asuransi
-- ----------------------------
BEGIN;
INSERT INTO "asuransi" VALUES ('1', null, '2', 'JKK', 'Jaminan Kecelakaan Kerja BPJS', null, '0', '3', '712', '713', null, null, 'admin', '2015-02-05 13:02:55', null, null, null);
INSERT INTO "asuransi" VALUES ('2', null, '2', 'JK', 'Jaminan Kematian BPJS', null, '0', '4', '712', '713', null, null, 'admin', '2015-02-05 13:02:08', null, null, null);
INSERT INTO "asuransi" VALUES ('3', null, '2', 'JPK', 'Jaminan Pemeliharaan Kesehatan (JPK) Jamsostek', null, '0', '3', '712', '713', null, null, 'admin', '2015-02-04 23:02:44', null, null, null);
INSERT INTO "asuransi" VALUES ('4', null, '1', 'JHT', 'Jaminan Hari Tua - Jamsostek', null, '2.5', '3', '712', '713', null, null, 'admin', '2015-02-05 13:02:27', null, 'on', null);
COMMIT;

-- ----------------------------
--  Table structure for asuransiunit
-- ----------------------------
DROP TABLE IF EXISTS "asuransiunit";
CREATE TABLE "asuransiunit" (
	"idasuransi" int4,
	"idaccountemp" int4,
	"idaccountcomp" int4,
	"idunit" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "asuransiunit" OWNER TO "imm";

-- ----------------------------
--  Records of asuransiunit
-- ----------------------------
BEGIN;
INSERT INTO "asuransiunit" VALUES ('1', null, null, '1');
INSERT INTO "asuransiunit" VALUES ('1', null, null, '1');
INSERT INTO "asuransiunit" VALUES ('1', null, null, '2');
INSERT INTO "asuransiunit" VALUES ('1', null, null, '2');
INSERT INTO "asuransiunit" VALUES ('1', null, null, '7');
INSERT INTO "asuransiunit" VALUES ('1', null, null, '8');
INSERT INTO "asuransiunit" VALUES ('1', null, null, '9');
INSERT INTO "asuransiunit" VALUES ('1', null, null, '10');
INSERT INTO "asuransiunit" VALUES ('1', null, null, '15');
INSERT INTO "asuransiunit" VALUES ('1', null, null, '99');
INSERT INTO "asuransiunit" VALUES ('1', null, null, '99');
INSERT INTO "asuransiunit" VALUES ('2', null, null, '1');
INSERT INTO "asuransiunit" VALUES ('2', null, null, '1');
INSERT INTO "asuransiunit" VALUES ('2', null, null, '2');
INSERT INTO "asuransiunit" VALUES ('2', null, null, '2');
INSERT INTO "asuransiunit" VALUES ('2', null, null, '7');
INSERT INTO "asuransiunit" VALUES ('2', null, null, '8');
INSERT INTO "asuransiunit" VALUES ('2', null, null, '9');
INSERT INTO "asuransiunit" VALUES ('2', null, null, '10');
INSERT INTO "asuransiunit" VALUES ('2', null, null, '15');
INSERT INTO "asuransiunit" VALUES ('2', null, null, '99');
INSERT INTO "asuransiunit" VALUES ('2', null, null, '99');
INSERT INTO "asuransiunit" VALUES ('3', '31', '55', '9');
INSERT INTO "asuransiunit" VALUES ('3', '712', '713', '1');
INSERT INTO "asuransiunit" VALUES ('3', '712', '713', '1');
INSERT INTO "asuransiunit" VALUES ('3', null, null, '2');
INSERT INTO "asuransiunit" VALUES ('3', null, null, '2');
INSERT INTO "asuransiunit" VALUES ('3', null, null, '7');
INSERT INTO "asuransiunit" VALUES ('3', null, null, '8');
INSERT INTO "asuransiunit" VALUES ('3', null, null, '10');
INSERT INTO "asuransiunit" VALUES ('3', null, null, '15');
INSERT INTO "asuransiunit" VALUES ('3', null, null, '99');
INSERT INTO "asuransiunit" VALUES ('3', null, null, '99');
INSERT INTO "asuransiunit" VALUES ('4', '29', '62', '9');
INSERT INTO "asuransiunit" VALUES ('4', '712', '713', '1');
INSERT INTO "asuransiunit" VALUES ('4', '712', '713', '1');
INSERT INTO "asuransiunit" VALUES ('4', null, null, '2');
INSERT INTO "asuransiunit" VALUES ('4', null, null, '2');
INSERT INTO "asuransiunit" VALUES ('4', null, null, '7');
INSERT INTO "asuransiunit" VALUES ('4', null, null, '8');
INSERT INTO "asuransiunit" VALUES ('4', null, null, '10');
INSERT INTO "asuransiunit" VALUES ('4', null, null, '15');
INSERT INTO "asuransiunit" VALUES ('4', null, null, '99');
INSERT INTO "asuransiunit" VALUES ('4', null, null, '99');
COMMIT;

-- ----------------------------
--  Table structure for tunjanganhistory
-- ----------------------------
DROP TABLE IF EXISTS "tunjanganhistory";
CREATE TABLE "tunjanganhistory" (
	"idtunjangan" int4,
	"idprosesgaji" int8,
	"datepaid" date,
	"userin" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"month" varchar(2) COLLATE "default",
	"year" int4,
	"jumlah" float8,
	"idemployee" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "tunjanganhistory" OWNER TO "imm";

-- ----------------------------
--  Records of tunjanganhistory
-- ----------------------------
BEGIN;
INSERT INTO "tunjanganhistory" VALUES ('24', null, '2015-05-31', 'adminsmk', '2015-09-07 11:09:43', '05', '2015', '250000', '6');
INSERT INTO "tunjanganhistory" VALUES ('24', null, '2015-11-01', 'adminsmk', '2015-11-13 19:11:27', '11', '2015', '250000', '6');
COMMIT;

-- ----------------------------
--  Table structure for salesitem
-- ----------------------------
DROP TABLE IF EXISTS "salesitem";
CREATE TABLE "salesitem" (
	"idsalesitem" int8 NOT NULL,
	"idinventory" int8,
	"idsales" int8,
	"qty" int4,
	"price" float8,
	"disc" float8,
	"total" float8
)
WITH (OIDS=FALSE);
ALTER TABLE "salesitem" OWNER TO "imm";

-- ----------------------------
--  Table structure for machine
-- ----------------------------
DROP TABLE IF EXISTS "machine";
CREATE TABLE "machine" (
	"machine_id" int4 NOT NULL,
	"machine_name" int4,
	"machine_description" varchar(225) COLLATE "default",
	"width_material" numeric(12,2),
	"unit_item_id" int4,
	"machine_type_id" int4,
	"idunit" int4,
	"userin" int4,
	"datein" timestamp(6) NULL,
	"usermod" int4,
	"datemod" timestamp(6) NULL,
	"display" int4,
	"brand" varchar(50) COLLATE "default",
	"serial_no" varchar(50) COLLATE "default",
	"machine_result" varchar(150) COLLATE "default",
	"manufacturer" varchar(150) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "machine" OWNER TO "imm";

-- ----------------------------
--  Records of machine
-- ----------------------------
BEGIN;
INSERT INTO "machine" VALUES ('1', '23', '3', '0.00', null, '1', '12', '11', '2017-03-09 16:03:02', '11', '2017-03-09 17:03:50', null, '3', '3', '23', '3');
COMMIT;

-- ----------------------------
--  Table structure for closebook
-- ----------------------------
DROP TABLE IF EXISTS "closebook";
CREATE TABLE "closebook" (
	"idclossing" int4,
	"tanggal" date,
	"idunit" int4,
	"userin" varchar(20) COLLATE "default",
	"type" varchar(20) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "closebook" OWNER TO "imm";

-- ----------------------------
--  Table structure for inventorycat
-- ----------------------------
DROP TABLE IF EXISTS "inventorycat";
CREATE TABLE "inventorycat" (
	"idinventorycat" int4 NOT NULL,
	"namecat" varchar(60) COLLATE "default",
	"description" text COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"display" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "inventorycat" OWNER TO "imm";

-- ----------------------------
--  Records of inventorycat
-- ----------------------------
BEGIN;
INSERT INTO "inventorycat" VALUES ('1', 'Kelompok 1', null, null, null, null, null, null);
INSERT INTO "inventorycat" VALUES ('2', 'Kelompok 2', null, null, null, null, null, null);
INSERT INTO "inventorycat" VALUES ('3', 'Kelompok 3', null, null, null, null, null, null);
INSERT INTO "inventorycat" VALUES ('4', 'Kelompok 4', null, null, null, null, null, null);
INSERT INTO "inventorycat" VALUES ('5', 'Kendaraan Bermotor', null, null, null, null, null, null);
INSERT INTO "inventorycat" VALUES ('6', 'Bangunan Permanen', null, null, null, null, null, null);
INSERT INTO "inventorycat" VALUES ('7', 'Bangunan Non Permanen', null, null, null, null, null, null);
INSERT INTO "inventorycat" VALUES ('45', 'ccc', 'cccc', 'administrator', 'administrator', '2015-04-30 12:04:43', '2015-04-30 12:04:03', '0');
INSERT INTO "inventorycat" VALUES ('52', '123', '123', 'administrator', 'administrator', '2015-05-19 15:05:29', '2015-05-19 15:05:32', '0');
COMMIT;

-- ----------------------------
--  Table structure for brand
-- ----------------------------
DROP TABLE IF EXISTS "brand";
CREATE TABLE "brand" (
	"brand_id" int4 NOT NULL,
	"idunit" int4,
	"brand_name" varchar(105) COLLATE "default",
	"brand_desc" varchar(225) COLLATE "default",
	"display" int2,
	"userin" int4,
	"datein" timestamp(6) NULL,
	"usermod" int4,
	"datemod" timestamp(6) NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "brand" OWNER TO "imm";

-- ----------------------------
--  Table structure for client
-- ----------------------------
DROP TABLE IF EXISTS "client";
CREATE TABLE "client" (
	"clientid" int4 NOT NULL,
	"dateregistered" date,
	"packageid" int4,
	"nextinvoice" date
)
WITH (OIDS=FALSE);
ALTER TABLE "client" OWNER TO "imm";

-- ----------------------------
--  Records of client
-- ----------------------------
BEGIN;
INSERT INTO "client" VALUES ('1', '2015-01-01', '1', '2015-01-23');
COMMIT;

-- ----------------------------
--  Table structure for payrolltype
-- ----------------------------
DROP TABLE IF EXISTS "payrolltype";
CREATE TABLE "payrolltype" (
	"payrolltypeid" int4 NOT NULL,
	"payname" varchar(100) COLLATE "default",
	"description" varchar(225) COLLATE "default",
	"datein" timestamp(6) NULL,
	"userin" varchar COLLATE "default",
	"datemod" timestamp(6) NULL,
	"usermod" varchar COLLATE "default",
	"display" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "payrolltype" OWNER TO "imm";

-- ----------------------------
--  Records of payrolltype
-- ----------------------------
BEGIN;
INSERT INTO "payrolltype" VALUES ('1', 'Jam', null, null, null, null, null, null);
INSERT INTO "payrolltype" VALUES ('2', 'Kehadiran/Harian', null, null, null, null, null, null);
INSERT INTO "payrolltype" VALUES ('3', 'Bulanan', null, null, null, null, null, null);
COMMIT;

-- ----------------------------
--  Table structure for siswapembayaran
-- ----------------------------
DROP TABLE IF EXISTS "siswapembayaran";
CREATE TABLE "siswapembayaran" (
	"idsiswapembayaran" int4 NOT NULL DEFAULT nextval('seq_siswapembayaran'::regclass),
	"idsiswa" int4,
	"idaccountbayar" int4,
	"idjournal" int4,
	"tglbayar" date,
	"bulanpembayaran" varchar(2) COLLATE "default",
	"tahunpembayaran" int4,
	"bulantahunpembayaran" varchar(50) COLLATE "default",
	"bulanbayar" varchar(2) COLLATE "default",
	"tahunbayar" int4,
	"jumlah" float8,
	"userin" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"usermod" varchar(20) COLLATE "default",
	"datemod" timestamp(6) NULL,
	"jatuhtempo" date,
	"haribayar" varchar(2) COLLATE "default",
	"denda" float8,
	"iduser" int4,
	"receivefrom" varchar(20) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "siswapembayaran" OWNER TO "imm";

-- ----------------------------
--  Records of siswapembayaran
-- ----------------------------
BEGIN;
INSERT INTO "siswapembayaran" VALUES ('33', '22', '46', '402', '2015-04-16', '04', '2015', 'April 2015', '04', '2015', '250000', 'adminsmk', '2015-05-03 16:05:38', 'adminsmk', '2015-05-03 16:05:38', null, '16', '2000', '11', null);
INSERT INTO "siswapembayaran" VALUES ('34', '22', '47', '402', '2015-04-16', '04', '2015', 'April 2015', '04', '2015', '150000', 'adminsmk', '2015-05-03 16:05:38', 'adminsmk', '2015-05-03 16:05:38', null, '16', '0', '11', null);
COMMIT;

-- ----------------------------
--  Table structure for sys_group
-- ----------------------------
DROP TABLE IF EXISTS "sys_group";
CREATE TABLE "sys_group" (
	"group_id" int4 NOT NULL,
	"group_name" varchar(20) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"display" int4,
	"description" varchar(225) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "sys_group" OWNER TO "imm";

-- ----------------------------
--  Records of sys_group
-- ----------------------------
BEGIN;
INSERT INTO "sys_group" VALUES ('1', 'Administrator', null, null, null, null, null, null);
INSERT INTO "sys_group" VALUES ('2', 'Admin Unit', null, null, null, null, null, null);
INSERT INTO "sys_group" VALUES ('3', 'Inventory', null, null, null, null, null, null);
INSERT INTO "sys_group" VALUES ('4', 'Purchasing', null, null, null, null, null, null);
INSERT INTO "sys_group" VALUES ('5', 'Sales', null, null, null, null, null, null);
INSERT INTO "sys_group" VALUES ('99', 'Super User', null, null, null, null, null, null);
COMMIT;

-- ----------------------------
--  Table structure for reconcile
-- ----------------------------
DROP TABLE IF EXISTS "reconcile";
CREATE TABLE "reconcile" (
	"idreconcile" int8 NOT NULL DEFAULT nextval('seq_reconcile'::regclass),
	"idaccount" int8,
	"idjournal" int8,
	"datestatement" date,
	"newbalance" float8,
	"calcbalance" float8,
	"outbalance" float8,
	"lastdate" date,
	"servamount" float8,
	"servno" varchar(20) COLLATE "default",
	"servdate" date,
	"servtax" float8,
	"expenseaccount" int8,
	"servmemo" varchar(225) COLLATE "default",
	"intamount" float8,
	"intno" varchar(20) COLLATE "default",
	"intdate" date,
	"inttax" float8,
	"incomeaccount" int8,
	"intmemo" varchar(225) COLLATE "default",
	"display" int4,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"idunit" int4,
	"accbalance" float8
)
WITH (OIDS=FALSE);
ALTER TABLE "reconcile" OWNER TO "imm";

-- ----------------------------
--  Records of reconcile
-- ----------------------------
BEGIN;
INSERT INTO "reconcile" VALUES ('12', '10', null, '2015-11-30', '500', null, '0', '2015-11-13', null, null, null, null, null, null, null, null, null, null, null, null, null, 'adminsmk', 'adminsmk', '2015-11-13 14:11:48', '2015-11-13 14:11:48', '12', '0');
COMMIT;

-- ----------------------------
--  Table structure for siswa
-- ----------------------------
DROP TABLE IF EXISTS "siswa";
CREATE TABLE "siswa" (
	"idsiswa" int8 NOT NULL DEFAULT nextval('seq_siswa'::regclass),
	"idunit" int8,
	"namasiswa" varchar(200) COLLATE "default",
	"namaibu" varchar(200) COLLATE "default",
	"namaayah" varchar(200) COLLATE "default",
	"alamat" text COLLATE "default",
	"kota" varchar(100) COLLATE "default",
	"phone" varchar(100) COLLATE "default",
	"tglmasuk" date,
	"tglkeluar" date,
	"tahunajaranmasuk" varchar(32) COLLATE "default",
	"foto" varchar(100) COLLATE "default",
	"display" int2,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"noinduk" varchar(50) COLLATE "default",
	"kelas" varchar(50) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "siswa" OWNER TO "imm";

-- ----------------------------
--  Records of siswa
-- ----------------------------
BEGIN;
INSERT INTO "siswa" VALUES ('22', '12', 'Ahmad Bahrudin', 'Susi Susanti', 'Budi Anto', 'Ampera. Jakarta Selatan', '2016', '217716621', '2012-04-03', null, '2012-2015', '0', null, 'administrator', 'administrator', '2015-04-29 05:04:18', '2015-05-03 15:05:28', '321321', '217716621');
COMMIT;

-- ----------------------------
--  Table structure for machine_type
-- ----------------------------
DROP TABLE IF EXISTS "machine_type";
CREATE TABLE "machine_type" (
	"machine_type_id" int4 NOT NULL,
	"idunit" int4,
	"machine_type_name" varchar(150) COLLATE "default",
	"machine_type_desc" varchar(225) COLLATE "default",
	"userin" int4,
	"datein" timestamp(6) NULL,
	"usermod" int4,
	"datemod" timestamp(6) NULL,
	"display" int2
)
WITH (OIDS=FALSE);
ALTER TABLE "machine_type" OWNER TO "imm";

-- ----------------------------
--  Records of machine_type
-- ----------------------------
BEGIN;
INSERT INTO "machine_type" VALUES ('1', '12', 'x', 'x', '11', '2017-03-09 16:03:06', '11', '2017-03-09 16:03:16', null);
COMMIT;

-- ----------------------------
--  Table structure for payroll
-- ----------------------------
DROP TABLE IF EXISTS "payroll";
CREATE TABLE "payroll" (
	"idpayroll" int4 NOT NULL,
	"idjournal" int4,
	"month" varchar(2) COLLATE "default",
	"year" int4,
	"userin" int4,
	"datein" timestamp(6) NULL,
	"idunit" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "payroll" OWNER TO "imm";

-- ----------------------------
--  Records of payroll
-- ----------------------------
BEGIN;
INSERT INTO "payroll" VALUES ('48', '410', '05', '2015', '11', '2015-09-07 00:00:00', '12');
INSERT INTO "payroll" VALUES ('49', '414', '11', '2015', '11', '2015-11-13 00:00:00', '12');
COMMIT;

-- ----------------------------
--  Table structure for accounttype
-- ----------------------------
DROP TABLE IF EXISTS "accounttype";
CREATE TABLE "accounttype" (
	"idaccounttype" int8 NOT NULL,
	"acctypename" varchar(60) COLLATE "default",
	"idclassificationcf" int4,
	"display" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "accounttype" OWNER TO "imm";

-- ----------------------------
--  Records of accounttype
-- ----------------------------
BEGIN;
INSERT INTO "accounttype" VALUES ('1', 'Bank', '1', null);
INSERT INTO "accounttype" VALUES ('2', 'Piutang', '1', null);
INSERT INTO "accounttype" VALUES ('3', 'Other Current Asset', '1', '1');
INSERT INTO "accounttype" VALUES ('4', 'Harta Tetap', '1', null);
INSERT INTO "accounttype" VALUES ('5', 'Harta Lainnya', '1', null);
INSERT INTO "accounttype" VALUES ('6', 'Credit Card', '1', null);
INSERT INTO "accounttype" VALUES ('8', 'Other Current Liability', '2', '1');
INSERT INTO "accounttype" VALUES ('9', 'Hutang Jangka Panjang', '2', null);
INSERT INTO "accounttype" VALUES ('10', 'Kewajiban Lainnya', '2', null);
INSERT INTO "accounttype" VALUES ('11', 'Ekuitas', '3', null);
INSERT INTO "accounttype" VALUES ('12', 'Pendapatan', '3', null);
INSERT INTO "accounttype" VALUES ('13', 'Cost of Sales', '5', null);
INSERT INTO "accounttype" VALUES ('14', 'Pengeluaran', '6', null);
INSERT INTO "accounttype" VALUES ('15', 'Pengeluaran Lainnya', '6', null);
INSERT INTO "accounttype" VALUES ('16', 'Pendapatan Lainnya', '4', null);
INSERT INTO "accounttype" VALUES ('17', 'Harta Lancar', '1', null);
INSERT INTO "accounttype" VALUES ('18', 'Hutang Lancar', '2', null);
INSERT INTO "accounttype" VALUES ('19', 'Kas', '1', null);
INSERT INTO "accounttype" VALUES ('20', 'Persediaan', '1', null);
INSERT INTO "accounttype" VALUES ('21', 'Laba Ditahan', null, null);
INSERT INTO "accounttype" VALUES ('23', 'Journal Statement', null, '1');
COMMIT;

-- ----------------------------
--  Table structure for shipping
-- ----------------------------
DROP TABLE IF EXISTS "shipping";
CREATE TABLE "shipping" (
	"idshipping" int8 NOT NULL,
	"nameshipping" varchar(30) COLLATE "default",
	"description" varchar(225) COLLATE "default",
	"userin" varchar(30) COLLATE "default",
	"usermod" varchar(30) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "shipping" OWNER TO "imm";

-- ----------------------------
--  Records of shipping
-- ----------------------------
BEGIN;
INSERT INTO "shipping" VALUES ('1', 'Shipping 1', null, null, null, null, null);
COMMIT;

-- ----------------------------
--  Table structure for purchasetype
-- ----------------------------
DROP TABLE IF EXISTS "purchasetype";
CREATE TABLE "purchasetype" (
	"idpurchasetype" int8 NOT NULL,
	"namepurchase" varchar(20) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "purchasetype" OWNER TO "imm";

-- ----------------------------
--  Table structure for tax
-- ----------------------------
DROP TABLE IF EXISTS "tax";
CREATE TABLE "tax" (
	"idtax" int4 NOT NULL DEFAULT nextval('seq_tax'::regclass),
	"idtaxtype" int4,
	"code" varchar(20) COLLATE "default",
	"nametax" varchar(50) COLLATE "default",
	"description" varchar(225) COLLATE "default",
	"rate" float8,
	"acccollectedtax" int8,
	"acctaxpaid" int8,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"display" int4,
	"idcompany" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "tax" OWNER TO "imm";

-- ----------------------------
--  Records of tax
-- ----------------------------
BEGIN;
INSERT INTO "tax" VALUES ('1', '1', 'PPN', 'PPN', '', '10', '636', '635', null, 'adminunit2', null, '2015-01-07 11:01:36', null, '1');
INSERT INTO "tax" VALUES ('2', '1', 'NON-PPN', 'NON PPN', '', '0', '4', '7', null, 'admin', null, '2014-08-22 16:08:51', null, '1');
INSERT INTO "tax" VALUES ('9', '1', 'PPh21', 'PPh Pasal 22', 'Pajak Penghasilan atas Pembelian Barang Mewah', '0', '0', '0', 'administrator', 'administrator', '2015-04-24 12:04:43', '2015-04-24 12:04:43', null, null);
COMMIT;

-- ----------------------------
--  Table structure for tunjangantype
-- ----------------------------
DROP TABLE IF EXISTS "tunjangantype";
CREATE TABLE "tunjangantype" (
	"idtunjtype" int4 NOT NULL DEFAULT nextval('seq_master'::regclass),
	"idunit" int8 DEFAULT nextval('seq_unit'::regclass),
	"nametunj" varchar(50) COLLATE "default",
	"desctunj" varchar(200) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"display" int4,
	"idcompany" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "tunjangantype" OWNER TO "imm";

-- ----------------------------
--  Records of tunjangantype
-- ----------------------------
BEGIN;
INSERT INTO "tunjangantype" VALUES ('1', '2', 'THR', 'Tunjangan Hari Raya', null, null, null, null, null, '1');
INSERT INTO "tunjangantype" VALUES ('2', '2', 'Tunjangan Transport', 'Tunjangan Transportasi', null, null, null, null, null, '1');
INSERT INTO "tunjangantype" VALUES ('3', '2', 'Tunjangan Istri', null, null, null, null, null, null, '1');
INSERT INTO "tunjangantype" VALUES ('4', '2', 'Tunjangan Anak', null, null, null, null, null, null, '1');
INSERT INTO "tunjangantype" VALUES ('5', '2', 'Tunjangan Kesejahteraan Karyawan', null, null, null, null, null, null, '1');
INSERT INTO "tunjangantype" VALUES ('6', '2', 'Tunjangan Jabatan Khusus', null, null, null, null, null, null, '1');
INSERT INTO "tunjangantype" VALUES ('7', '2', 'Tunjangan Beras', null, null, null, null, null, null, '1');
INSERT INTO "tunjangantype" VALUES ('8', '2', 'Tunjangan Mk Yayasan', null, null, null, null, null, null, '1');
INSERT INTO "tunjangantype" VALUES ('9', '2', 'Tunjangan Jabatan', null, null, null, null, null, null, '1');
INSERT INTO "tunjangantype" VALUES ('10', '2', 'Tunjangan Perumahan', null, null, null, null, null, null, '1');
INSERT INTO "tunjangantype" VALUES ('11', '2', 'Tunjangan Jamsostek', null, null, null, null, null, null, '1');
INSERT INTO "tunjangantype" VALUES ('42', null, 'xxxxxxxx', 'xxxxxx', 'administrator', 'administrator', '2015-04-27 11:04:29', '2015-04-27 11:04:36', '0', '1');
COMMIT;

-- ----------------------------
--  Table structure for hakakses
-- ----------------------------
DROP TABLE IF EXISTS "hakakses";
CREATE TABLE "hakakses" (
	"sys_menu_id" int4 NOT NULL,
	"group_id" int4 NOT NULL,
	"view" bool,
	"edit" bool,
	"delete" bool,
	"usermod" varchar(20) COLLATE "default",
	"datemod" timestamp(6) NULL,
	"add" bool
)
WITH (OIDS=FALSE);
ALTER TABLE "hakakses" OWNER TO "imm";

-- ----------------------------
--  Records of hakakses
-- ----------------------------
BEGIN;
INSERT INTO "hakakses" VALUES ('2', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('2', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('2', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('2', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('2', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('2', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('3', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('3', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('3', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('3', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('3', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('3', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('4', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('4', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('4', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('4', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('4', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('4', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('5', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('5', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('5', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('5', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('5', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('5', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('8', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('8', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('8', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('8', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('8', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('8', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('11', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('11', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('11', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('11', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('11', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('11', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('15', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('15', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('15', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('15', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('15', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('15', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('16', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('16', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('16', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('16', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('16', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('16', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('18', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('18', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('18', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('18', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('18', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('18', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('19', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('19', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('19', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('19', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('19', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('19', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('24', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('24', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('24', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('24', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('24', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('24', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('25', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('25', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('25', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('25', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('25', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('25', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('26', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('26', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('26', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('26', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('26', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('26', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('27', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('27', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('27', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('27', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('27', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('27', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('29', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('29', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('29', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('29', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('29', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('29', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('32', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('32', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('32', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('32', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('32', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('32', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('34', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('34', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('34', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('34', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('34', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('34', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('35', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('35', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('35', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('35', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('35', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('35', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('37', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('37', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('37', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('37', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('37', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('37', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('38', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('38', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('38', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('38', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('38', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('38', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('39', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('39', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('39', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('39', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('39', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('39', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('40', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('40', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('40', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('40', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('40', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('40', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('41', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('41', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('41', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('41', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('41', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('41', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('42', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('42', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('42', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('42', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('42', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('42', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('43', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('43', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('43', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('43', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('43', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('43', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('46', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('46', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('46', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('46', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('46', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('46', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('48', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('48', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('48', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('48', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('48', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('48', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('50', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('50', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('50', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('50', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('50', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('50', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('53', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('53', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('53', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('53', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('53', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('53', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('54', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('54', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('54', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('54', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('54', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('54', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('57', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('57', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('57', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('57', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('57', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('57', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('58', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('58', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('58', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('58', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('58', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('58', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('59', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('59', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('59', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('59', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('59', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('59', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('60', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('60', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('60', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('60', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('60', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('60', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('61', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('61', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('61', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('61', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('61', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('61', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('62', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('62', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('62', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('62', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('62', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('62', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('63', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('63', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('63', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('63', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('63', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('63', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('64', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('64', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('64', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('64', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('64', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('64', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('65', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('65', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('65', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('65', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('65', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('65', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('66', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('66', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('66', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('66', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('66', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('66', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('68', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('68', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('68', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('68', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('68', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('68', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('69', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('69', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('69', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('69', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('69', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('69', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('71', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('71', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('71', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('71', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('71', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('71', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('72', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('72', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('72', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('72', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('72', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('72', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('74', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('74', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('74', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('74', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('74', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('74', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('76', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('76', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('76', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('76', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('76', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('76', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('77', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('77', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('77', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('77', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('77', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('77', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('78', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('78', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('78', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('78', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('78', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('78', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('79', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('79', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('79', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('79', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('79', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('79', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('82', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('82', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('82', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('82', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('82', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('82', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('83', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('83', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('83', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('83', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('83', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('83', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('84', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('84', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('84', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('84', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('84', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('84', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('85', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('85', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('85', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('85', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('85', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('85', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('86', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('86', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('86', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('86', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('86', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('86', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('87', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('87', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('87', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('87', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('87', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('87', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('88', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('88', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('88', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('88', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('88', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('88', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('89', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('89', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('89', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('89', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('89', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('89', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('90', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('90', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('90', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('90', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('90', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('90', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('91', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('91', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('91', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('91', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('91', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('91', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('92', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('92', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('92', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('92', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('92', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('92', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('93', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('93', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('93', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('93', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('93', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('93', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('94', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('94', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('94', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('94', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('94', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('94', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('95', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('95', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('95', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('95', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('95', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('96', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('96', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('96', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('96', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('96', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('96', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('97', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('97', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('97', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('97', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('97', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('97', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('98', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('98', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('98', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('98', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('98', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('98', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('99', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('99', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('99', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('99', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('99', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('99', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('100', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('100', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('100', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('100', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('100', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('100', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('101', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('101', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('101', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('101', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('101', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('101', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('102', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('102', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('102', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('102', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('102', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('102', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('116', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('116', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('116', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('116', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('116', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('116', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('117', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('117', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('117', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('117', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('117', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('117', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('118', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('118', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('118', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('118', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('118', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('118', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('119', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('119', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('119', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('119', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('119', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('119', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('120', '1', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('120', '2', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('120', '3', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('120', '4', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('120', '5', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('120', '99', 't', 't', 't', null, null, 't');
INSERT INTO "hakakses" VALUES ('95', '2', 't', 't', 't', 'adminsmk', '2015-09-07 00:00:00', 't');
INSERT INTO "hakakses" VALUES ('127', '2', 't', null, null, 'staff', '2017-03-08 00:00:00', null);
INSERT INTO "hakakses" VALUES ('130', '2', 't', 't', 't', 'staff', '2017-03-09 00:00:00', 't');
INSERT INTO "hakakses" VALUES ('132', '2', 't', 't', 't', 'staff', '2017-03-09 00:00:00', 't');
INSERT INTO "hakakses" VALUES ('128', '2', 't', 't', 't', 'staff', '2017-03-09 00:00:00', 't');
INSERT INTO "hakakses" VALUES ('129', '2', 't', 't', 't', 'staff', '2017-03-09 00:00:00', 't');
INSERT INTO "hakakses" VALUES ('131', '2', 't', 't', 't', 'staff', '2017-03-09 00:00:00', 't');
COMMIT;

-- ----------------------------
--  Table structure for bussinestype
-- ----------------------------
DROP TABLE IF EXISTS "bussinestype";
CREATE TABLE "bussinestype" (
	"idbussinestype" int8 NOT NULL,
	"namebussines" varchar(150) COLLATE "default",
	"description" varchar(200) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "bussinestype" OWNER TO "imm";

-- ----------------------------
--  Records of bussinestype
-- ----------------------------
BEGIN;
INSERT INTO "bussinestype" VALUES ('1', 'Lembaga Pendidikan', null);
INSERT INTO "bussinestype" VALUES ('2', 'Perusahaan Jasa', null);
INSERT INTO "bussinestype" VALUES ('3', 'Perusahaan Dagang', null);
INSERT INTO "bussinestype" VALUES ('4', 'Perusahaan Manufaktur', null);
COMMIT;

-- ----------------------------
--  Table structure for tambahangajitype
-- ----------------------------
DROP TABLE IF EXISTS "tambahangajitype";
CREATE TABLE "tambahangajitype" (
	"idtambahangajitype" int4 NOT NULL DEFAULT nextval('seq_tambahangajitype'::regclass),
	"idunit" int8 DEFAULT nextval('seq_unit'::regclass),
	"tambahantype" varchar(50) COLLATE "default",
	"deskripsi" varchar(200) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"display" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "tambahangajitype" OWNER TO "imm";

-- ----------------------------
--  Records of tambahangajitype
-- ----------------------------
BEGIN;
INSERT INTO "tambahangajitype" VALUES ('1', '12', 'Penambahan Gaji 1', null, null, null, null, null, null);
INSERT INTO "tambahangajitype" VALUES ('2', '12', 'Penambahan Gaji 2', null, null, null, null, null, null);
INSERT INTO "tambahangajitype" VALUES ('4', '14', '123', '123', 'administrator', 'administrator', '2015-05-19 15:05:46', '2015-05-19 15:05:54', '0');
COMMIT;

-- ----------------------------
--  Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS "employee";
CREATE TABLE "employee" (
	"idemployee" int8 NOT NULL DEFAULT nextval('seq_employee'::regclass),
	"code" varchar(50) COLLATE "default",
	"firstname" varchar(50) COLLATE "default",
	"lastname" varchar(50) COLLATE "default",
	"address" varchar(225) COLLATE "default",
	"telephone" varchar(20) COLLATE "default",
	"handphone" varchar(20) COLLATE "default",
	"fax" varchar(20) COLLATE "default",
	"email" varchar(20) COLLATE "default",
	"website" varchar(20) COLLATE "default",
	"city" varchar(50) COLLATE "default",
	"state" varchar(50) COLLATE "default",
	"postcode" varchar(10) COLLATE "default",
	"country" varchar(15) COLLATE "default",
	"notes" varchar(225) COLLATE "default",
	"display" int2,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"idemployeetype" int4,
	"idunit" int4,
	"idkawin" int4,
	"pegawaitglmasuk" date,
	"norek" varchar(50) COLLATE "default",
	"namabank" varchar(50) COLLATE "default",
	"keaktifan" varchar(32) COLLATE "default",
	"tglresign" date,
	"idjenisptkp" int4,
	"idupload" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "employee" OWNER TO "imm";

-- ----------------------------
--  Table structure for thrlisttmp
-- ----------------------------
DROP TABLE IF EXISTS "thrlisttmp";
CREATE TABLE "thrlisttmp" (
	"idemployee" int4 NOT NULL,
	"pengali" int4,
	"totalpendapatan" float8,
	"masakerja" int4,
	"jumlahthr" float8,
	"thrtambahan" float8,
	"totalthr" float8,
	"month" varchar(2) NOT NULL COLLATE "default",
	"year" int4 NOT NULL,
	"userid" int4,
	"keterangan" varchar(225) COLLATE "default",
	"kehadiranjam" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "thrlisttmp" OWNER TO "imm";

-- ----------------------------
--  Table structure for potonganhistory
-- ----------------------------
DROP TABLE IF EXISTS "potonganhistory";
CREATE TABLE "potonganhistory" (
	"idpotongan" int4,
	"idprosesgaji" int8,
	"datepaid" date,
	"jumlahpotongan" numeric,
	"sisapotongan" numeric,
	"totalpotongan" numeric,
	"userin" varchar(20) COLLATE "default",
	"datein" varchar(20) COLLATE "default",
	"sisaangsuran" int4,
	"month" varchar(2) COLLATE "default",
	"year" int4,
	"idemployee" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "potonganhistory" OWNER TO "imm";

-- ----------------------------
--  Records of potonganhistory
-- ----------------------------
BEGIN;
INSERT INTO "potonganhistory" VALUES ('15', null, '2015-05-31', '1500', '0', '1500', 'adminsmk', '2015-09-07 11:09:43', '-1', '05', '2015', '6');
INSERT INTO "potonganhistory" VALUES ('16', null, '2015-05-31', '500000', '4500000', '5000000', 'adminsmk', '2015-09-07 11:09:43', '9', '05', '2015', '6');
INSERT INTO "potonganhistory" VALUES ('15', null, '2015-11-01', '1500', '0', '1500', 'adminsmk', '2015-11-13 19:11:27', '-2', '11', '2015', '6');
INSERT INTO "potonganhistory" VALUES ('16', null, '2015-11-01', '500000', '4500000', '5000000', 'adminsmk', '2015-11-13 19:11:27', '8', '11', '2015', '6');
COMMIT;

-- ----------------------------
--  Table structure for payrollproceed
-- ----------------------------
DROP TABLE IF EXISTS "payrollproceed";
CREATE TABLE "payrollproceed" (
	"idemployee" int4 NOT NULL,
	"firstname" varchar(225) COLLATE "default",
	"lastname" varchar(225) COLLATE "default",
	"namaunit" varchar(100) COLLATE "default",
	"nametype" varchar(100) COLLATE "default",
	"jumlahjam" int4,
	"jumlahkehadiran" int4,
	"totalgaji" float8,
	"totaltunjangan" float8,
	"pph21" float8,
	"totalpotongan" float8,
	"totalpembayaran" float8,
	"payname" varchar(100) COLLATE "default",
	"userin" varchar(100) COLLATE "default",
	"code" varchar(100) COLLATE "default",
	"userid" int4,
	"idemployeetype" int4,
	"payrolltypeid" int4,
	"pembayaranperjamkehadiran" float8,
	"premiinsurance" text COLLATE "default",
	"ptkp" float8,
	"wajibpajak" float8,
	"jenispph21" varchar(53) COLLATE "default",
	"tarifpajak" float8,
	"pphterhutang" float8,
	"month" varchar(2) NOT NULL COLLATE "default",
	"year" int4 NOT NULL,
	"datein" timestamp(6) NULL,
	"idunit" int4 NOT NULL,
	"idpayroll" int4,
	"penambahangaji" float8,
	"numtanggungan" int4,
	"tglpenggajian" date
)
WITH (OIDS=FALSE);
ALTER TABLE "payrollproceed" OWNER TO "imm";

-- ----------------------------
--  Records of payrollproceed
-- ----------------------------
BEGIN;
INSERT INTO "payrollproceed" VALUES ('6', 'Ratna', 'Dra. Ratna Surya Dhiana', 'PT AYUBERGA', 'Kepala Sekolah', '0', '0', '2500000', '250000', '13125', '514625', '2235375', 'Bulanan', 'adminsmk', '0021', '11', '11', '3', '2500000', '0', '28350000', '3150000', 'K/1', '5', '13125', '05', '2015', null, '12', '48', '0', null, '2015-05-31');
INSERT INTO "payrollproceed" VALUES ('6', 'Ratna', 'Dra. Ratna Surya Dhiana', 'PT AYUBERGA', 'Kepala Sekolah', '0', '0', '2500000', '250000', '13125', '514625', '2235375', 'Bulanan', 'adminsmk', '0021', '11', '11', '3', '2500000', '0', '28350000', '3150000', 'K/1', '5', '13125', '11', '2015', null, '12', '49', '0', null, '2015-11-01');
COMMIT;

-- ----------------------------
--  Table structure for currency
-- ----------------------------
DROP TABLE IF EXISTS "currency";
CREATE TABLE "currency" (
	"idcurrency" int4 NOT NULL DEFAULT nextval('seq_master'::regclass),
	"namecurr" varchar(20) COLLATE "default",
	"symbol" varchar(5) COLLATE "default",
	"description" varchar(100) COLLATE "default",
	"display" inet,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"idunit" int4,
	"rate" numeric(12,2)
)
WITH (OIDS=FALSE);
ALTER TABLE "currency" OWNER TO "imm";

-- ----------------------------
--  Records of currency
-- ----------------------------
BEGIN;
INSERT INTO "currency" VALUES ('1', 'Rupiah', 'Rp', '2', null, null, '11', null, '2017-03-09 10:03:18', '12', '0.00');
INSERT INTO "currency" VALUES ('2', 'USD', '$', '-', null, null, '11', null, '2017-03-09 10:03:26', '12', '132000.00');
INSERT INTO "currency" VALUES ('3', '1', '1', '1', null, '11', '11', '2017-03-09 10:03:03', '2017-03-09 10:03:03', '12', '1.00');
COMMIT;

-- ----------------------------
--  Table structure for tunjangan
-- ----------------------------
DROP TABLE IF EXISTS "tunjangan";
CREATE TABLE "tunjangan" (
	"idtunjangan" int4 NOT NULL DEFAULT nextval('seq_tunjangan'::regclass),
	"idtunjtype" int4,
	"idamounttype" int4,
	"idemployee" int8,
	"idsiklus" int4,
	"namatunjangan" varchar(100) COLLATE "default",
	"startdate" date,
	"enddate" date,
	"jumlah" numeric,
	"display" int4,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"persen" float8,
	"jenisnilai" varchar(20) COLLATE "default",
	"idupload" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "tunjangan" OWNER TO "imm";

-- ----------------------------
--  Records of tunjangan
-- ----------------------------
BEGIN;
INSERT INTO "tunjangan" VALUES ('8', '2', null, '2', '1', '-', '2014-09-02', '2015-03-05', '200000', '0', 'administrator', 'administrator', '2015-02-05 22:02:05', '2015-02-05 22:02:05', null, null, null);
INSERT INTO "tunjangan" VALUES ('10', '3', null, '4', '1', '', '2012-03-01', '2019-03-01', null, null, 'admin', 'admin', '2015-02-23 12:02:20', '2015-02-23 12:02:20', '2.5', 'Persentase', null);
INSERT INTO "tunjangan" VALUES ('13', '5', null, '2', '1', 'Tunjangan Kesejahteraan Karyawan', '2011-02-19', '2019-03-12', '100000', null, 'admin', 'admin', '2015-02-23 16:02:57', '2015-02-23 16:02:23', null, 'Nilai Tetap', null);
INSERT INTO "tunjangan" VALUES ('14', '6', null, '2', '1', '', '2011-02-11', '2019-02-11', '85000', null, 'admin', 'admin', '2015-02-23 16:02:54', '2015-02-23 16:02:54', null, 'Nilai Tetap', null);
INSERT INTO "tunjangan" VALUES ('15', '7', null, '2', '1', '', '2011-02-25', '2019-03-12', '40000', null, 'admin', 'admin', '2015-02-23 16:02:21', '2015-02-23 16:02:21', null, 'Nilai Tetap', null);
INSERT INTO "tunjangan" VALUES ('16', '8', null, '2', '1', '', '2011-02-24', '2019-03-05', '75000', null, 'admin', 'admin', '2015-02-23 16:02:42', '2015-02-23 16:02:42', null, 'Nilai Tetap', null);
INSERT INTO "tunjangan" VALUES ('17', '10', null, '2', '1', '', '2011-02-25', '2019-03-05', '100000', null, 'admin', 'admin', '2015-02-23 17:02:16', '2015-02-23 17:02:16', null, 'Nilai Tetap', null);
INSERT INTO "tunjangan" VALUES ('18', '11', null, '2', '1', '', '2011-03-04', '2019-03-04', '222870', null, 'admin', 'admin', '2015-02-23 17:02:37', '2015-02-23 17:02:37', null, 'Nilai Tetap', null);
INSERT INTO "tunjangan" VALUES ('19', '2', null, '2', '1', '', '2011-03-05', '2019-03-05', '385000', null, 'admin', 'admin', '2015-02-23 17:02:04', '2015-02-23 17:02:04', null, 'Nilai Tetap', null);
INSERT INTO "tunjangan" VALUES ('20', '4', null, '5', '1', 'Tunjangan Anak', '2014-03-19', '2015-03-28', null, null, 'administrator', 'administrator', '2015-03-05 08:03:17', '2015-03-09 04:03:06', '2', 'Persentase', null);
INSERT INTO "tunjangan" VALUES ('21', '3', null, '5', '1', 'Tunjangan Istri', '2014-03-10', '2019-04-10', null, null, 'administrator', 'administrator', '2015-03-05 08:03:31', '2015-03-09 04:03:12', '3', 'Persentase', null);
INSERT INTO "tunjangan" VALUES ('22', '3', null, '6', '1', 'Tunjangan Istri', '2011-03-31', '2015-05-01', '50000', null, 'adminsmk', 'administrator', '2015-04-20 11:04:44', '2015-04-22 06:04:57', null, 'Nilai Tetap', null);
INSERT INTO "tunjangan" VALUES ('23', '9', null, '6', '1', 'dsads', '2011-04-07', '2015-05-01', '150000', null, 'adminsmk', 'adminsmk', '2015-04-20 11:04:03', '2015-04-20 11:04:03', null, 'Nilai Tetap', null);
INSERT INTO "tunjangan" VALUES ('24', '2', null, '6', '1', 'dsadsa', '2011-04-07', '2019-04-27', '250000', null, 'adminsmk', 'adminsmk', '2015-04-20 11:04:23', '2015-04-20 11:04:23', null, 'Nilai Tetap', null);
INSERT INTO "tunjangan" VALUES ('33', '8', '1', '6', '1', null, '2015-04-04', '2015-05-03', '150000', null, 'administrator', 'administrator', '2015-04-29 06:04:51', '2015-04-29 06:04:51', null, 'Nilai Tetap', '15');
COMMIT;

-- ----------------------------
--  Table structure for pelanggan
-- ----------------------------
DROP TABLE IF EXISTS "pelanggan";
CREATE TABLE "pelanggan" (
	"idpelanggan" int4 NOT NULL,
	"idpelanggantype" int4,
	"nama" varchar(30) COLLATE "default",
	"namaperusahaan" varchar(50) COLLATE "default",
	"jabatan" varchar(50) COLLATE "default",
	"npwp" varchar(30) COLLATE "default",
	"telpon1" varchar(20) COLLATE "default",
	"telpon2" varchar(20) COLLATE "default",
	"fax" varchar(20) COLLATE "default",
	"hp" varchar(20) COLLATE "default",
	"email" varchar(50) COLLATE "default",
	"website" varchar(50) COLLATE "default",
	"alamat" varchar(225) COLLATE "default",
	"kota" varchar(20) COLLATE "default",
	"kodepos" int4,
	"pengiriman" varchar(225) COLLATE "default",
	"negara" varchar(20) COLLATE "default",
	"foto" varchar(100) COLLATE "default",
	"catatan" varchar(225) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"idunit" int4,
	"display" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "pelanggan" OWNER TO "imm";

-- ----------------------------
--  Table structure for transferkas
-- ----------------------------
DROP TABLE IF EXISTS "transferkas";
CREATE TABLE "transferkas" (
	"idtransferkas" int4 NOT NULL DEFAULT nextval('seq_transferkas'::regclass),
	"idaccountsumber" int4,
	"idaccounttujuan" int4,
	"idunit" int4,
	"memo" varchar(225) COLLATE "default",
	"tanggal" date,
	"nominal" float8,
	"userin" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"usermod" varchar(20) COLLATE "default",
	"datemod" timestamp(6) NULL,
	"idjournal" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "transferkas" OWNER TO "imm";

-- ----------------------------
--  Records of transferkas
-- ----------------------------
BEGIN;
INSERT INTO "transferkas" VALUES ('2', '681', '623', '2', 'transfer ke kas kecil', '2015-02-23', '1000000', 'adminunit2', '2015-02-27 23:02:02', 'adminunit2', '2015-02-27 23:02:02', null);
INSERT INTO "transferkas" VALUES ('3', '681', '623', '1', 'Transfer Kas', '2015-03-16', '500000', 'administrator', '2015-03-06 00:03:49', 'administrator', '2015-03-06 00:03:49', null);
INSERT INTO "transferkas" VALUES ('4', '681', '623', '1', 'Transfer kas', '2015-03-27', '5000000', 'administrator', '2015-03-09 09:03:07', 'administrator', '2015-03-09 09:03:07', null);
INSERT INTO "transferkas" VALUES ('5', '681', '674', '1', 'Setor Tunai BCA', '2015-03-29', '500000', 'administrator', '2015-03-17 15:03:45', 'administrator', '2015-03-17 15:03:45', '350');
INSERT INTO "transferkas" VALUES ('6', '9', '7', '12', '', '2015-11-13', '500000', 'adminsmk', '2015-11-13 14:11:31', 'adminsmk', '2015-11-13 14:11:31', '412');
COMMIT;

-- ----------------------------
--  Table structure for asuransipaytype
-- ----------------------------
DROP TABLE IF EXISTS "asuransipaytype";
CREATE TABLE "asuransipaytype" (
	"idasuransipaytype" int4 NOT NULL,
	"nametype" varchar(50) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "asuransipaytype" OWNER TO "imm";

-- ----------------------------
--  Records of asuransipaytype
-- ----------------------------
BEGIN;
INSERT INTO "asuransipaytype" VALUES ('1', 'Pengurang Penghasilan');
INSERT INTO "asuransipaytype" VALUES ('2', 'Penambah Penghasilan');
COMMIT;

-- ----------------------------
--  Table structure for asuransiemp
-- ----------------------------
DROP TABLE IF EXISTS "asuransiemp";
CREATE TABLE "asuransiemp" (
	"idasuransiemp" int4 NOT NULL DEFAULT nextval('seq_asuransiemp'::regclass),
	"idasuransi" int4,
	"idemployee" int8,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"display" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "asuransiemp" OWNER TO "imm";

-- ----------------------------
--  Table structure for jenisptkp
-- ----------------------------
DROP TABLE IF EXISTS "jenisptkp";
CREATE TABLE "jenisptkp" (
	"idjenisptkp" int4 NOT NULL,
	"namaptkp" varchar(20) COLLATE "default",
	"deskripsi" varchar(225) COLLATE "default",
	"totalptkp" float8,
	"display" int4,
	"userin" varchar(32) COLLATE "default",
	"usermod" varchar(32) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "jenisptkp" OWNER TO "imm";

-- ----------------------------
--  Records of jenisptkp
-- ----------------------------
BEGIN;
INSERT INTO "jenisptkp" VALUES ('1', 'TK/0', 'Tidak Kawin tidak ada tanggungan', '24300000', null, null, null, null, null);
INSERT INTO "jenisptkp" VALUES ('2', 'TK/1', 'Tidak Kawin memiliki 1 (satu) tanggungan', '26325000', null, null, null, null, null);
INSERT INTO "jenisptkp" VALUES ('3', 'TK/2', 'Tidak Kawin memiliki 2 (dua) tanggungan', '28350000', null, null, null, null, null);
INSERT INTO "jenisptkp" VALUES ('4', 'TK/3', 'Tidak Kawin memiliki 3 (tiga) tanggungan', '30375000', null, null, null, null, null);
INSERT INTO "jenisptkp" VALUES ('5', 'K/0', 'Kawin tidak ada tanggungan', '26325000', null, null, null, null, null);
INSERT INTO "jenisptkp" VALUES ('6', 'K/1', 'Kawin memiliki 1 (satu) tanggungan', '28350000', null, null, null, null, null);
INSERT INTO "jenisptkp" VALUES ('7', 'K/2', 'Kawin memiliki 2 (dua) tanggungan', '30375000', null, null, null, null, null);
INSERT INTO "jenisptkp" VALUES ('8', 'K/3', 'Kawin memiliki 3 (tiga) tanggungan', '32400000', null, null, null, null, null);
INSERT INTO "jenisptkp" VALUES ('9', 'K/I/0', 'Kawin Isteri Bekerja/Usaha tidak ada tanggungan', '50625000', null, null, null, null, null);
INSERT INTO "jenisptkp" VALUES ('10', 'K/I/1', 'Kawin Isteri Bekerja/Usaha memiliki 1 (satu) tanggungan', '52650000', null, null, null, null, null);
INSERT INTO "jenisptkp" VALUES ('11', 'K/I/2', 'Kawin Isteri Bekerja/Usaha memiliki 2 (dua) tanggungan', '54675000', null, null, null, null, null);
INSERT INTO "jenisptkp" VALUES ('12', 'K/I/3', 'Kawin Isteri Bekerja/Usaha memiliki 3 (tiga) tanggungan', '56700000', null, null, null, null, null);
INSERT INTO "jenisptkp" VALUES ('50', '123', '123', '123', '0', 'administrator', 'administrator', '2015-05-19 14:05:31', '2015-05-19 14:05:47');
COMMIT;

-- ----------------------------
--  Table structure for journalitem
-- ----------------------------
DROP TABLE IF EXISTS "journalitem";
CREATE TABLE "journalitem" (
	"idjournalitem" int8 NOT NULL DEFAULT nextval('seq_journalitem'::regclass),
	"idjournal" int8,
	"idaccount" int8,
	"idtax" int4,
	"debit" float8,
	"credit" float8,
	"memo" varchar(225) COLLATE "default",
	"lastbalance" float8,
	"currbalance" float8
)
WITH (OIDS=FALSE);
ALTER TABLE "journalitem" OWNER TO "imm";

-- ----------------------------
--  Table structure for dataanak
-- ----------------------------
DROP TABLE IF EXISTS "dataanak";
CREATE TABLE "dataanak" (
	"datanakid" int4 NOT NULL DEFAULT nextval('seq_dataanak'::regclass),
	"idemployee" int8,
	"namaanak" varchar(100) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"usermod" varchar(20) COLLATE "default",
	"datemod" timestamp(6) NULL,
	"display" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "dataanak" OWNER TO "imm";

-- ----------------------------
--  Records of dataanak
-- ----------------------------
BEGIN;
INSERT INTO "dataanak" VALUES ('1', '2', 'zzzzzzzzzzz', 'admin', '2014-10-17 16:10:22', 'admin', '2014-10-17 16:10:31', null);
COMMIT;

-- ----------------------------
--  Table structure for tmpdepresiasi
-- ----------------------------
DROP TABLE IF EXISTS "tmpdepresiasi";
CREATE TABLE "tmpdepresiasi" (
	"iddepreciation" int4,
	"akumpenyusutaccount" int4,
	"depresiasi" int4,
	"bebanperbulan" float8,
	"idunit" int4,
	"idinventory" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "tmpdepresiasi" OWNER TO "imm";

-- ----------------------------
--  Table structure for userunit
-- ----------------------------
DROP TABLE IF EXISTS "userunit";
CREATE TABLE "userunit" (
	"user_id" int4 NOT NULL,
	"idunit" int8 NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "userunit" OWNER TO "imm";

-- ----------------------------
--  Records of userunit
-- ----------------------------
BEGIN;
INSERT INTO "userunit" VALUES ('7', '12');
INSERT INTO "userunit" VALUES ('11', '12');
COMMIT;

-- ----------------------------
--  Table structure for inventorydeprec
-- ----------------------------
DROP TABLE IF EXISTS "inventorydeprec";
CREATE TABLE "inventorydeprec" (
	"iddepreciation" int8 NOT NULL DEFAULT nextval('seq_inventoryadjusment'::regclass),
	"nojournal" varchar(30) COLLATE "default",
	"memo" varchar(225) COLLATE "default",
	"display" int4,
	"userin" varchar(30) COLLATE "default",
	"usermod" varchar(30) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"idunit" int4,
	"dateadj" date,
	"month" varchar(2) COLLATE "default",
	"year" int4,
	"penyusutanbulan" float8,
	"bebanberjalan" float8,
	"akumulasipenyusutan" float8,
	"nilaibuku" float8,
	"bulanpenyusutan" int4,
	"idclossing" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "inventorydeprec" OWNER TO "imm";

-- ----------------------------
--  Table structure for purchase
-- ----------------------------
DROP TABLE IF EXISTS "purchase";
CREATE TABLE "purchase" (
	"idpurchase" int8 NOT NULL DEFAULT nextval('seq_purchase'::regclass),
	"idcreditterm" int8,
	"idshipping" int8,
	"idpurchasetype" int8,
	"idpurchasestatus" int8,
	"idfrequency" int4,
	"idjournal" int8,
	"idtax" int4,
	"nopurchase" varchar(20) COLLATE "default",
	"name" varchar(225) COLLATE "default",
	"payee" varchar(225) COLLATE "default",
	"shipaddress" varchar(225) COLLATE "default",
	"date" date,
	"includetax" bool,
	"requestdate" date,
	"freigthcost" float8,
	"tax" float8,
	"amountdue" float8,
	"totalamount" float8,
	"paidtoday" float8,
	"totalowed" float8,
	"balance" float8,
	"memo" varchar(225) COLLATE "default",
	"isrecuring" bool,
	"startdate" date,
	"recuntildate" date,
	"recnumtimes" int4,
	"alertto" int8,
	"notifto" int8,
	"display" int4,
	"year" int4,
	"month" varchar(2) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"idpayment" int4,
	"notes" varchar(225) COLLATE "default",
	"duedate" date,
	"paiddate" date,
	"idunit" int4,
	"idcurrency" int4,
	"noinvoice" varchar(50) COLLATE "default",
	"idsupplier" int4,
	"subtotal" float8,
	"totalpaid" float8
)
WITH (OIDS=FALSE);
ALTER TABLE "purchase" OWNER TO "imm";

-- ----------------------------
--  Table structure for siklus
-- ----------------------------
DROP TABLE IF EXISTS "siklus";
CREATE TABLE "siklus" (
	"idsiklus" int4 NOT NULL,
	"namasiklus" varchar(20) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "siklus" OWNER TO "imm";

-- ----------------------------
--  Records of siklus
-- ----------------------------
BEGIN;
INSERT INTO "siklus" VALUES ('1', 'Bulanan');
INSERT INTO "siklus" VALUES ('2', 'Tahunan');
COMMIT;

-- ----------------------------
--  Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS "account";
CREATE TABLE "account" (
	"idaccounttype" int8,
	"idaccount" int8 NOT NULL DEFAULT nextval('seq_account'::regclass),
	"idclassificationcf" int4,
	"idlinked" int4,
	"idparent" int8,
	"accnumber" varchar(30) COLLATE "default",
	"accname" varchar(100) COLLATE "default",
	"tax" varchar(5) COLLATE "default",
	"balance" float8,
	"display" int2,
	"description" varchar(224) COLLATE "default",
	"userin" varchar(30) COLLATE "default",
	"usermod" varchar(30) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"active" bool,
	"idunit" int4 NOT NULL,
	"idaccounttmp" int4,
	"idpos" int4,
	"permanent" bool,
	"lock" bool
)
WITH (OIDS=FALSE);
ALTER TABLE "account" OWNER TO "imm";

-- ----------------------------
--  Records of account
-- ----------------------------
BEGIN;
INSERT INTO "account" VALUES (null, '1', '1', null, '0', '1-0000', 'Aktiva', null, '0', null, null, null, null, null, null, 't', '99', null, '1', null, 't');
INSERT INTO "account" VALUES ('1', '2', '2', null, '1', '1-0100', 'Cheque Account', null, '0', null, '', null, 'admin', null, '2014-08-25 15:08:53', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('1', '3', '2', null, '1', '1-0150', 'Undeposited Funds', null, '0', null, '', null, 'admin', null, '2014-08-25 15:08:20', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('11', '4', '3', null, '1', '1-0200', 'Trade Debitors', null, '0', null, 'deskripsi', null, 'admin', null, '2014-08-25 08:08:10', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('12', '47', '4', null, '45', '4-0002', 'Pendapatan 2', null, '0', null, '', 'systemwizard', 'staff', '2015-04-22 06:04:08', '2017-03-08 19:03:38', 't', '12', '47', '2', null, null);
INSERT INTO "account" VALUES ('17', '5', '1', null, '1', '1-1000', 'Aktiva Lancar', null, '0', null, '', null, 'admin', null, '2014-08-25 15:08:47', 't', '99', null, '1', null, 't');
INSERT INTO "account" VALUES ('19', '6', '2', null, '5', '1-1100', 'Kas Utama', null, '0', null, '', null, 'admin', null, '2014-09-22 23:09:44', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('19', '7', '2', null, '5', '1-1200', 'Kas Kecil', null, '0', null, '', null, 'admin', null, '2014-08-25 15:08:28', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('12', '752', '4', null, '45', '4-0003', 'Software Development', null, '0', '1', '', 'staff', 'staff', '2017-01-26 17:01:30', '2017-01-26 18:01:37', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('1', '8', '1', null, '5', '1-1300', 'Bank', null, '0', null, '', null, 'admin', null, '2014-09-22 22:09:12', 't', '99', null, '1', null, null);
INSERT INTO "account" VALUES ('1', '9', '2', null, '8', '1-1310', 'Bank BCA', null, '0', null, 'Bank BCA', null, 'admin', null, '2014-08-25 15:08:23', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('1', '10', '2', null, '8', '1-1320', 'Bank Mandiri', null, '0', null, '', null, 'admin', null, '2014-08-25 15:08:01', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('2', '18', '1', null, '5', '1-1400', 'Piutang Usaha', null, '0', null, '', 'admin', 'admin', '2014-08-25 15:08:39', '2014-08-25 15:08:39', 't', '99', null, '2', null, 't');
INSERT INTO "account" VALUES ('3', '37', '2', null, '35', '2-1220', 'PPN Keluaran', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '37', '2', null, 't');
INSERT INTO "account" VALUES ('3', '19', '1', null, '5', '1-1500', 'Persediaan barang dagang', null, '0', null, '', 'admin', 'admin', '2014-08-25 15:08:14', '2014-08-25 15:08:35', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('18', '38', '2', null, '28', '2-2000', 'Hutang Jangka Panjang', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '38', '1', null, 't');
INSERT INTO "account" VALUES ('3', '20', '1', null, '5', '1-1600', 'Perlengkapan Kantor', null, '0', null, '', 'admin', 'admin', '2014-08-25 15:08:56', '2014-08-25 15:08:56', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('9', '39', '2', null, '38', '2-2100', 'Hutang Bank BCA', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '39', '2', null, null);
INSERT INTO "account" VALUES ('17', '21', '1', null, '5', '1-1700', 'Biaya Dibayar Dimuka', null, '0', null, '', 'admin', 'admin', '2014-08-25 15:08:05', '2014-08-25 15:08:05', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('11', '40', '3', null, '0', '3-0000', 'Modal', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '40', '1', null, 't');
INSERT INTO "account" VALUES ('3', '22', '1', null, '21', '1-1710', 'Uang muka pembelian', null, '0', null, '', 'admin', 'admin', '2014-08-25 15:08:39', '2014-08-25 15:08:39', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('11', '42', '3', null, '40', '3-2000', 'Laba Ditahan', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '42', '2', null, 't');
INSERT INTO "account" VALUES ('3', '23', '1', null, '21', '1-1720', 'Sewa Dibayar Dimuka', null, '0', null, '', 'admin', 'admin', '2014-08-25 15:08:03', '2014-08-25 15:08:03', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('11', '43', '3', null, '40', '3-2200', 'Laba Periode Berjalan', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '43', '2', null, 't');
INSERT INTO "account" VALUES ('17', '24', '1', null, '1', '1-2000', 'Aktiva Tetap', null, '0', null, '', 'admin', 'admin', '2014-08-25 15:08:31', '2014-08-25 15:08:25', 't', '99', null, '1', null, 't');
INSERT INTO "account" VALUES ('4', '25', '1', null, '24', '1-2100', 'Peralatan Kantor', null, '0', null, '', 'admin', 'admin', '2014-08-25 15:08:08', '2014-08-25 15:08:08', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('11', '44', '3', null, '40', '3-9999', 'Selisih Pembukuan', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '44', '2', null, null);
INSERT INTO "account" VALUES ('4', '26', '1', null, '24', '1-2110', 'Akum. Penyusutan Peralatan', null, '0', null, '', 'admin', 'admin', '2014-08-25 15:08:36', '2014-08-25 15:08:36', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('12', '45', '4', null, '0', '4-0000', 'Pendapatan', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '45', '1', null, 't');
INSERT INTO "account" VALUES ('4', '27', '1', null, '24', '1-2210', 'Akum. Penyusutan Kendaraan', null, '0', null, '', 'admin', 'admin', '2014-08-25 15:08:01', '2014-08-25 15:08:01', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('13', '49', '5', null, '0', '5-0000', 'Harga Pokok', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '49', '1', null, 't');
INSERT INTO "account" VALUES ('18', '28', '2', null, '0', '2-0000', 'Hutang', null, '0', null, '', 'admin', 'admin', '2014-08-25 16:08:09', '2014-08-25 16:08:09', 't', '99', null, '1', null, 't');
INSERT INTO "account" VALUES ('13', '51', '5', null, '49', '5-1100', 'Potongan Pembelian', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '51', '2', null, null);
INSERT INTO "account" VALUES ('18', '29', '2', null, '28', '2-0200', 'Trade Creditors', null, '0', null, '', 'admin', 'admin', '2014-08-25 16:08:55', '2014-08-25 16:08:55', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '53', '6', null, '0', '6-0000', 'Biaya-biaya', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '53', '1', null, 't');
INSERT INTO "account" VALUES ('18', '30', '2', null, '28', '2-1000', 'Hutang Lancar', null, '0', null, '', 'admin', 'admin', '2014-08-25 16:08:14', '2014-08-25 16:08:14', 't', '99', null, '1', null, 't');
INSERT INTO "account" VALUES ('10', '31', '2', null, '28', '2-0300', 'Hutang Usaha', null, '0', null, '', 'admin', 'admin', '2014-08-25 16:08:22', '2014-08-25 16:08:22', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('18', '32', '2', null, '30', '2-1140', 'PPh Pasal 22', null, '0', null, 'Pajak Penghasilan atas Pembelian Barang Mewah', 'admin', 'admin', '2014-08-26 18:08:44', '2014-08-26 18:08:44', 't', '99', null, '2', null, 't');
INSERT INTO "account" VALUES ('14', '56', '6', null, '53', '6-1200', 'Gaji Pengajar', null, '0', '1', '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '56', '2', null, null);
INSERT INTO "account" VALUES ('18', '33', '2', null, '30', '2-1110', 'Pendapatan Diterima Dimuka', null, '0', null, '', 'admin', 'admin', '2014-08-26 18:08:35', '2014-08-26 18:08:35', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '57', '6', null, '53', '6-1101', 'Biaya Pemasaran', null, '0', '1', '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '57', '2', null, null);
INSERT INTO "account" VALUES ('18', '34', '2', null, '30', '2-1120', 'Barang Diterima Dimuka', null, '0', null, '', 'admin', 'admin', '2014-08-26 18:08:34', '2014-08-26 18:08:34', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '58', '6', null, '53', '6-2000', 'Beban Kantor', null, '0', null, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 07:04:37', 't', '12', '58', '1', null, null);
INSERT INTO "account" VALUES ('18', '35', '2', null, '30', '2-1200', 'Hutang PPN', null, '0', null, '', 'admin', 'admin', '2014-08-26 18:08:11', '2014-08-26 18:08:11', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '60', '6', null, '58', '6-2002', 'THR Karyawan', null, '0', null, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 07:04:25', 't', '12', '60', '2', null, null);
INSERT INTO "account" VALUES ('3', '36', '2', null, '35', '2-1210', 'PPN Masukan', null, '0', null, '', 'admin', 'admin', '2014-08-26 18:08:44', '2014-08-26 18:08:44', 't', '99', null, '2', null, 't');
INSERT INTO "account" VALUES ('14', '61', '6', null, '58', '6-2003', 'Listrik', null, '0', null, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 07:04:47', 't', '12', '61', '2', null, null);
INSERT INTO "account" VALUES ('3', '37', '2', null, '35', '2-1220', 'PPN Keluaran', null, '0', null, '', 'admin', 'admin', '2014-08-26 18:08:25', '2014-08-26 18:08:25', 't', '99', null, '2', null, 't');
INSERT INTO "account" VALUES ('18', '38', '2', null, '28', '2-2000', 'Hutang Jangka Panjang', null, '0', null, '', 'admin', 'admin', '2014-08-26 19:08:15', '2014-08-26 19:08:15', 't', '99', null, '1', null, 't');
INSERT INTO "account" VALUES ('9', '39', '2', null, '38', '2-2100', 'Hutang Bank BCA', null, '0', null, '', 'admin', 'admin', '2014-08-26 19:08:06', '2014-08-26 19:08:06', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('11', '40', '3', null, '0', '3-0000', 'Modal', null, '0', null, '', 'admin', 'admin', '2014-08-26 19:08:55', '2014-08-26 19:08:55', 't', '99', null, '1', null, 't');
INSERT INTO "account" VALUES ('11', '41', '3', null, '40', '3-1000', 'Modal Usaha', null, '0', null, '', 'admin', 'admin', '2014-08-26 19:08:05', '2014-08-26 19:08:43', 't', '99', null, '2', null, 't');
INSERT INTO "account" VALUES ('11', '42', '3', null, '40', '3-2000', 'Laba Ditahan', null, '0', null, '', 'admin', 'admin', '2014-08-26 19:08:29', '2014-08-26 19:08:06', 't', '99', null, '2', null, 't');
INSERT INTO "account" VALUES ('11', '43', '3', null, '40', '3-2200', 'Laba Periode Berjalan', null, '0', null, '', 'admin', 'admin', '2014-08-26 19:08:56', '2014-08-26 19:08:56', 't', '99', null, '2', null, 't');
INSERT INTO "account" VALUES ('11', '44', '3', null, '40', '3-9999', 'Selisih Pembukuan', null, '0', null, '', 'admin', 'admin', '2014-08-26 19:08:23', '2014-08-26 19:08:23', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('12', '45', '4', null, '0', '4-0000', 'Pendapatan', null, '0', null, '', 'admin', 'admin', '2014-08-26 19:08:07', '2014-08-26 19:08:49', 't', '99', null, '1', null, 't');
INSERT INTO "account" VALUES ('12', '46', '4', null, '45', '4-1000', 'Penjualan', null, '0', null, '', 'admin', 'admin', '2014-08-26 19:08:04', '2014-08-26 19:08:04', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('12', '47', '4', null, '45', '4-1100', 'Potongan Penjualan', null, '0', null, '', 'admin', 'admin', '2014-08-26 19:08:30', '2014-08-26 19:08:30', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('12', '48', '4', null, '45', '4-1200', 'Pendapatan Jasa Angkut', null, '0', null, '', 'admin', 'admin', '2014-08-26 19:08:57', '2014-08-26 19:08:57', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('13', '49', '5', null, '0', '5-0000', 'Harga Pokok', null, '0', null, '', 'admin', 'admin', '2014-08-26 20:08:54', '2014-08-26 20:08:54', 't', '99', null, '1', null, 't');
INSERT INTO "account" VALUES ('13', '50', '5', null, '49', '5-1000', 'Harga Pokok Barang Dagang', null, '0', null, '', 'admin', 'admin', '2014-08-26 20:08:14', '2014-08-26 20:08:14', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('13', '51', '5', null, '49', '5-1100', 'Potongan Pembelian', null, '0', null, '', 'admin', 'admin', '2014-08-26 20:08:39', '2014-08-26 20:08:39', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('13', '52', '5', null, '49', '5-1200', 'Biaya Angkut Pembelian', null, '0', null, '', 'admin', 'admin', '2014-08-26 20:08:03', '2014-08-26 20:08:03', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '53', '6', null, '0', '6-0000', 'Biaya-biaya', null, '0', null, '', 'admin', 'admin', '2014-08-26 20:08:07', '2014-08-26 20:08:07', 't', '99', null, '1', null, 't');
INSERT INTO "account" VALUES ('14', '55', '6', null, '53', '6-1100', 'Gaji Karyawan', null, '0', null, '', 'admin', 'admin', '2014-08-26 20:08:35', '2014-08-26 20:08:35', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '56', '6', null, '53', '6-1200', 'Gaji Pengajar', null, '0', null, '', 'admin', 'admin', '2014-08-26 20:08:55', '2014-08-26 20:08:55', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '57', '6', null, '53', '6-1101', 'Biaya Pemasaran', null, '0', null, '', 'admin', 'admin', '2014-08-26 20:08:34', '2014-08-26 20:08:34', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('15', '703', '8', null, '0', '9-0000', 'Biaya-biaya lain', null, '0', null, null, null, null, null, null, null, '99', null, '1', null, 't');
INSERT INTO "account" VALUES ('14', '58', '6', null, '53', '6-2000', 'Biaya Administrasi dan Umum', null, '0', null, '', 'admin', 'admin', '2014-08-26 20:08:04', '2014-08-26 20:08:04', 't', '99', null, '1', null, null);
INSERT INTO "account" VALUES ('14', '59', '6', null, '58', '6-2101', 'Biaya listrik, air dan telephone', null, '0', null, '', 'admin', 'admin', '2014-08-26 20:08:10', '2014-08-26 21:08:17', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '60', '6', null, '58', '6-2102', 'Biaya Transportasi', null, '0', null, '', 'admin', 'admin', '2014-08-26 20:08:44', '2014-08-26 21:08:27', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '61', '6', null, '58', '6-2103', 'Biaya Sewa', null, '0', null, '', 'admin', 'admin', '2014-08-26 20:08:02', '2014-08-26 21:08:36', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '62', '6', null, '58', '6-2104', 'Biaya Asuransi', null, '0', null, '', 'admin', 'admin', '2014-08-26 21:08:01', '2014-08-26 21:08:46', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '63', '6', null, '58', '6-2105', 'Biaya Perlengkapan Kantor', null, '0', null, '', 'admin', 'admin', '2014-08-26 21:08:16', '2014-08-26 21:08:16', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '64', '6', null, '58', '6-2106', 'Penyusutan Peralatan', null, '0', null, '', 'admin', 'admin', '2014-08-26 21:08:49', '2014-08-26 21:08:49', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '65', '6', null, '58', '6-2107', 'Penyusutan Kendaraan', null, '0', null, '', 'admin', 'admin', '2014-08-26 21:08:10', '2014-08-26 21:08:10', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('16', '66', '7', null, '0', '8-0000', 'Pendapatan Lain-lain', null, '0', null, '', 'admin', 'admin', '2014-08-26 21:08:50', '2014-08-26 21:08:50', 't', '99', null, '1', null, 't');
INSERT INTO "account" VALUES ('16', '67', '7', null, '66', '8-1000', 'Pendapatan Bunga', null, '0', null, '', 'admin', 'admin', '2014-08-26 21:08:10', '2014-08-26 21:08:10', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('16', '68', '7', null, '66', '8-2000', 'Administrasi Bank', null, '0', null, '', 'admin', 'admin', '2014-08-26 21:08:47', '2014-08-26 21:08:13', 't', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('9', '72', '7', null, '66', '8-111', 'xxx', null, '0', null, 'xxxxx', 'admin', 'admin', '2014-09-02 22:09:00', '2014-09-02 22:09:23', 'f', '99', null, '2', null, null);
INSERT INTO "account" VALUES ('18', '717', '2', null, '30', '2-1130', 'PPh Pasal 21', null, '0', null, 'Akun yang menampung beban pajak PPH21 Karyawan', 'administrator', 'administrator', '2015-04-20 05:04:03', '2015-04-20 05:04:03', 't', '99', null, '2', null, 't');
INSERT INTO "account" VALUES ('18', '744', '2', null, '30', '2-1150', 'PPh Pasal 23', null, null, '1', 'Pajak Penghasilan atas Dividen, Bunga, Royalty, Sewa, Imbalan atas Jasa, dll', null, null, null, null, 't', '99', null, '2', null, 't');
INSERT INTO "account" VALUES ('18', '745', '2', null, '30', '2-1160', 'PPh Pasal 25', null, null, '1', 'Angsuran Pembayaran Pajak Terhutang sesuai dengan Surat Pemberitahuan Pajak (SPT)', null, null, null, null, 't', '99', null, '2', null, 't');
INSERT INTO "account" VALUES ('18', '746', '2', null, '30', '2-1170', 'PPh Pasal 29', null, null, '1', 'Pajak yang Harus Dilunasi Akibat PPh Terhutang dari SPT', null, null, null, null, 't', '99', null, '2', null, 't');
INSERT INTO "account" VALUES ('23', '9090', null, null, '0', '1-1111', 'Ikhtisar Laba/Rugi', null, null, null, null, null, null, null, null, null, '99', null, null, null, 't');
INSERT INTO "account" VALUES ('14', '62', '6', null, '58', '6-2004', 'Telpon', null, '0', null, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 07:04:02', 't', '12', '62', '2', null, null);
INSERT INTO "account" VALUES ('14', '63', '6', null, '58', '6-2005', 'Pemeliharaan Peralatan Kantor', null, '0', null, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 07:04:52', 't', '12', '63', '2', null, null);
INSERT INTO "account" VALUES ('16', '68', '7', null, '66', '8-2000', 'Administrasi Bank', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '68', '2', null, null);
INSERT INTO "account" VALUES ('12', '753', '4', null, '45', '4-0005', 'Other Income', null, '0', null, '', 'staff', 'staff', '2017-01-26 17:01:07', '2017-01-26 17:01:12', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES (null, '1', '1', null, '0', '1-0000', 'Aktiva', null, '0', null, null, 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '1', '1', null, 't');
INSERT INTO "account" VALUES ('1', '2', '2', null, '1', '1-0100', 'Cheque Account', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '2', '2', null, null);
INSERT INTO "account" VALUES ('1', '3', '2', null, '1', '1-0150', 'Undeposited Funds', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '3', '2', null, null);
INSERT INTO "account" VALUES ('11', '4', '3', null, '1', '1-0200', 'Trade Debitors', null, '0', null, 'deskripsi', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '4', '2', null, null);
INSERT INTO "account" VALUES ('17', '5', '1', null, '1', '1-1000', 'Aktiva Lancar', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '5', '1', null, 't');
INSERT INTO "account" VALUES ('1', '8', '1', null, '5', '1-1300', 'Bank', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '8', '1', null, null);
INSERT INTO "account" VALUES ('3', '19', '1', null, '5', '1-1500', 'Persediaan barang dagang', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '19', '2', null, null);
INSERT INTO "account" VALUES ('3', '20', '1', null, '5', '1-1600', 'Perlengkapan Kantor', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '20', '2', null, null);
INSERT INTO "account" VALUES ('17', '21', '1', null, '5', '1-1700', 'Biaya Dibayar Dimuka', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '21', '2', null, null);
INSERT INTO "account" VALUES ('3', '22', '1', null, '21', '1-1710', 'Uang muka pembelian', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '22', '2', null, null);
INSERT INTO "account" VALUES ('3', '23', '1', null, '21', '1-1720', 'Sewa Dibayar Dimuka', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '23', '2', null, null);
INSERT INTO "account" VALUES ('17', '24', '1', null, '1', '1-2000', 'Aktiva Tetap', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '24', '1', null, 't');
INSERT INTO "account" VALUES ('4', '26', '1', null, '24', '1-2110', 'Akum. Penyusutan Peralatan', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '26', '2', null, null);
INSERT INTO "account" VALUES ('4', '27', '1', null, '24', '1-2210', 'Akum. Penyusutan Kendaraan', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '27', '2', null, null);
INSERT INTO "account" VALUES ('18', '28', '2', null, '0', '2-0000', 'Hutang', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '28', '1', null, 't');
INSERT INTO "account" VALUES ('18', '29', '2', null, '28', '2-0200', 'Trade Creditors', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '29', '2', null, null);
INSERT INTO "account" VALUES ('18', '30', '2', null, '28', '2-1000', 'Hutang Lancar', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '30', '1', null, 't');
INSERT INTO "account" VALUES ('18', '35', '2', null, '30', '2-1200', 'Hutang PPN', null, '0', null, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 23:04:01', 't', '12', '35', '1', null, null);
INSERT INTO "account" VALUES ('13', '50', '5', null, '49', '5-1000', 'Harga Pokok Barang Dagang', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '50', '2', null, null);
INSERT INTO "account" VALUES ('1', '10', '2', null, '8', '1-1320', 'Bank Mandiri', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '10', '2', null, null);
INSERT INTO "account" VALUES ('14', '733', '6', null, '732', '6-213', '123', null, '0', '1', '', 'administrator', 'administrator', '2015-04-23 07:04:31', '2015-04-23 07:04:31', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('18', '33', '2', null, '30', '2-1110', 'Pendapatan Diterima Dimuka', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '33', '2', null, null);
INSERT INTO "account" VALUES ('18', '34', '2', null, '30', '2-1120', 'Barang Diterima Dimuka', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '34', '2', null, null);
INSERT INTO "account" VALUES ('3', '36', '2', null, '35', '2-1210', 'PPN Masukan', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '36', '2', null, 't');
INSERT INTO "account" VALUES ('14', '732', '6', null, '53', '6-3000', 'Beban Umum', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:40', '2015-04-23 07:04:40', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('18', '32', '2', null, '30', '2-1140', 'PPh Pasal 22', null, '0', null, 'Pajak Penghasilan atas Pembelian Barang Mewah', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 05:04:44', 't', '12', '32', '2', null, 't');
INSERT INTO "account" VALUES ('18', '717', '2', null, '30', '2-1130', 'PPh Pasal 21', null, '0', null, 'Akun yang menampung beban pajak PPH21 Karyawan', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '717', '2', null, 't');
INSERT INTO "account" VALUES ('14', '59', '6', null, '58', '6-2001', 'Gaji/Honor Karyawan', null, '0', null, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 07:04:03', 't', '12', '59', '2', null, null);
INSERT INTO "account" VALUES ('14', '730', '6', null, '58', '6-2006', 'Biaya Surat Kabar, Pos Surat, Benda POS', null, '0', '1', '', 'administrator', 'administrator', '2015-04-23 07:04:40', '2015-04-23 07:04:40', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '721', '6', null, '53', '6-1000', 'Beban Akademik', null, '0', '0', '', 'administrator', 'administrator', '2015-04-23 06:04:43', '2015-04-23 06:04:43', 't', '12', null, '1', null, null);
INSERT INTO "account" VALUES ('2', '18', '1', null, '5', '1-1400', 'Piutang Usaha', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '18', '2', null, 't');
INSERT INTO "account" VALUES ('14', '739', '6', null, '732', '6-3004', 'Biaya Rumah Tangga', null, '0', '1', '', 'administrator', 'administrator', '2015-04-23 07:04:35', '2015-04-23 07:04:35', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('13', '52', '5', null, '49', '5-1200', 'Biaya Angkut Pembelian', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '52', '2', null, null);
INSERT INTO "account" VALUES ('12', '48', '4', null, '45', '4-0003', 'Uang Daftar Ulang', null, '0', '1', '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 05:04:50', 't', '12', '48', '2', null, null);
INSERT INTO "account" VALUES ('13', '734', '6', null, '732', '6-3333', '31421', null, '0', '1', '', 'administrator', 'administrator', '2015-04-23 07:04:02', '2015-04-23 07:04:02', 't', '12', null, '1', null, null);
INSERT INTO "account" VALUES ('11', '41', '3', null, '40', '3-1000', 'Modal Usaha', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '41', '2', null, 't');
INSERT INTO "account" VALUES ('14', '55', '6', null, '721', '6-1001', 'Gaji/Honor Pendidik', null, '0', null, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 06:04:49', 't', '12', '55', '2', null, null);
INSERT INTO "account" VALUES ('14', '731', '6', null, '58', '6-2007', 'Bantuan GORO/Sumbangan', null, '0', '1', '', 'administrator', 'administrator', '2015-04-23 07:04:05', '2015-04-23 07:04:05', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('19', '6', '2', null, '5', '1-1100', 'Kas Utama', null, '0', null, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 23:04:54', 't', '12', '6', '2', null, null);
INSERT INTO "account" VALUES ('16', '67', '7', null, '66', '8-1000', 'Pendapatan Bunga', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '67', '2', null, null);
INSERT INTO "account" VALUES ('19', '7', '2', null, '5', '1-1200', 'Kas Kecil', null, '0', null, '', 'systemwizard', 'administrator', '2015-04-22 06:04:08', '2015-04-23 23:04:08', 't', '12', '7', '2', null, null);
INSERT INTO "account" VALUES ('12', '46', '4', null, '45', '4-0001', 'Pendapatan 1', null, '0', null, '', 'systemwizard', 'staff', '2015-04-22 06:04:08', '2017-03-08 19:03:24', 't', '12', '46', '2', null, null);
INSERT INTO "account" VALUES ('12', '719', '4', null, '45', '4-0004', 'System Maintenance', null, '0', '1', '', 'administrator', 'staff', '2015-04-23 05:04:07', '2017-01-26 17:01:00', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '64', '6', null, '58', '6-2106', 'Penyusutan Peralatan', null, '0', '1', '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '64', '2', null, null);
INSERT INTO "account" VALUES ('14', '65', '6', null, '58', '6-2107', 'Penyusutan Kendaraan', null, '0', '1', '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '65', '2', null, null);
INSERT INTO "account" VALUES ('16', '66', '7', null, '0', '8-0000', 'Pendapatan Lain-lain', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '66', '1', null, 't');
INSERT INTO "account" VALUES ('14', '722', '6', null, '721', '6-1002', 'THR Pendidik', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 06:04:27', '2015-04-23 06:04:27', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '723', '6', null, '721', '6-1003', 'Alat-alat Tulis', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 06:04:07', '2015-04-23 07:04:54', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '725', '6', null, '721', '6-1005', 'Seragam', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:58', '2015-04-23 07:04:17', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '726', '6', null, '721', '6-1006', 'Praktikum Siswa', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:44', '2015-04-23 07:04:44', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '727', '6', null, '721', '6-1007', 'Rapat, Penataran dan Seminar', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:17', '2015-04-23 07:04:17', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '728', '6', null, '721', '6-1008', 'Pembelian Buku', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:35', '2015-04-23 07:04:35', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '729', '6', null, '721', '6-1009', 'Foto Copy, Laminating dan Jilid Buku', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:05', '2015-04-23 07:04:05', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('12', '720', '4', null, '45', '4-0005', 'Uang BPP', null, '0', '1', '', 'administrator', 'administrator', '2015-04-23 05:04:25', '2015-04-23 05:04:25', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('1', '735', '6', null, '732', '6-12321', '124121', null, '0', '1', '', 'administrator', 'administrator', '2015-04-23 07:04:14', '2015-04-23 07:04:14', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '737', '6', null, '732', '6-3002', 'Pemeliharaan Gedung', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:51', '2015-04-23 07:04:51', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '738', '6', null, '732', '6-3003', 'Transportasi Operasional', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:15', '2015-04-23 07:04:15', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '724', '6', null, '721', '6-1004', 'Penerimaan Siswa Baru', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:35', '2015-04-23 07:04:07', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '740', '6', null, '53', '6-4000', 'Beban Penyusutan', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:58', '2015-04-23 07:04:58', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '741', '6', null, '740', '6-4001', 'Penyusutan Gedung', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:20', '2015-04-23 07:04:20', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '742', '6', null, '740', '6-4002', 'Penyusutan Peralatan', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:52', '2015-04-23 07:04:54', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '743', '6', null, '740', '6-4003', 'Penyusutan Kendaraan', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:29', '2015-04-23 07:04:29', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('18', '744', '2', null, '30', '2-1150', 'PPh Pasal 23', null, '0', '1', 'Pajak Penghasilan atas Dividen, Bunga, Royalty, Sewa, Imbalan atas Jasa, dll', 'administrator', 'administrator', '2015-04-24 11:04:00', '2015-04-24 11:04:00', 't', '12', null, '2', null, 't');
INSERT INTO "account" VALUES ('18', '745', '2', null, '30', '2-1160', 'PPh Pasal 25', null, '0', '1', 'Angsuran Pembayaran Pajak Terhutang sesuai dengan Surat Pemberitahuan Pajak (SPT)', 'administrator', 'administrator', '2015-04-24 11:04:46', '2015-04-24 11:04:46', 't', '12', null, '2', null, 't');
INSERT INTO "account" VALUES ('18', '746', '2', null, '30', '2-1170', 'PPh Pasal 29', null, '0', '1', 'Pajak yang Harus Dilunasi Akibat PPh Terhutang dari SPT', 'administrator', 'administrator', '2015-04-24 11:04:24', '2015-04-24 11:04:24', 't', '12', null, '2', null, 't');
INSERT INTO "account" VALUES ('18', '748', '2', null, '30', '2-1180', 'Pajak Penghasilan Badan Usaha', null, '0', null, 'Pajak Penghasilan Badan Usaha', 'administrator', 'administrator', '2015-04-24 12:04:12', '2015-04-24 12:04:36', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '736', '6', null, '732', '6-3001', 'Pemeliharaan Kendaraan Bermotor', null, '0', null, '', 'administrator', 'administrator', '2015-04-23 07:04:31', '2015-04-23 07:04:31', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '758', '6', null, '756', '6-5002', 'Virtual Private Server', null, '0', null, '', 'staff', 'staff', '2017-01-30 08:01:28', '2017-01-30 10:01:53', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '759', '6', null, '756', '6-5003', 'Hosting', null, '0', null, '', 'staff', 'staff', '2017-01-30 08:01:12', '2017-01-30 08:01:12', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '761', '6', null, '756', '6-5005', 'Library,Plugin,Framework and Other development tools', null, '0', null, '', 'staff', 'staff', '2017-01-30 08:01:39', '2017-01-30 08:01:39', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '757', '6', null, '756', '6-5001', 'Platform as Services', null, '0', null, '', 'staff', 'staff', '2017-01-30 08:01:59', '2017-01-30 08:01:59', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('1', '9', '2', null, '8', '1-1310', 'Bank BRI', null, '0', null, 'Bank BRI', 'systemwizard', 'staff', '2015-04-22 06:04:08', '2017-01-26 17:01:15', 't', '12', '9', '2', null, null);
INSERT INTO "account" VALUES ('14', '754', '6', null, '53', '6-40009', 'Beban Hutang Usaha', null, '0', null, '', 'staff', 'staff', '2017-01-26 18:01:41', '2017-01-26 18:01:41', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '760', '6', null, '756', '6-5004', 'Domain', null, '0', null, '', 'staff', 'staff', '2017-01-30 08:01:28', '2017-01-30 08:01:28', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('14', '755', '6', null, '732', '6-3004', 'Akomodasi Operasional', null, '0', null, '', 'staff', 'staff', '2017-01-26 19:01:46', '2017-01-26 19:01:46', 't', '12', null, '2', null, null);
INSERT INTO "account" VALUES ('18', '31', '2', null, '28', '2-0300', 'Hutang Usaha', null, '0', null, '', 'systemwizard', 'staff', '2015-04-22 06:04:08', '2017-01-26 18:01:03', 't', '12', '31', '2', null, null);
INSERT INTO "account" VALUES ('4', '25', '1', null, '24', '1-2100', 'Peralatan Kantor', null, '0', null, '', 'systemwizard', 'systemwizard', '2015-04-22 06:04:08', '2015-04-22 06:04:08', 't', '12', '25', '2', null, null);
INSERT INTO "account" VALUES ('14', '756', '6', null, '53', '6-5000', 'Beban Development', null, '0', '1', '', 'staff', 'staff', '2017-01-30 08:01:22', '2017-01-30 08:01:45', 't', '12', null, '2', null, null);
COMMIT;

-- ----------------------------
--  Table structure for sales
-- ----------------------------
DROP TABLE IF EXISTS "sales";
CREATE TABLE "sales" (
	"idsales" int8 NOT NULL,
	"idpayment" int8,
	"idemployee" int8,
	"idtax" int4,
	"idjournal" int8,
	"idcustomer" int8,
	"noinvoice" varchar(20) COLLATE "default",
	"date" date,
	"nopo" varchar(30) COLLATE "default",
	"shipto" text COLLATE "default",
	"subtotal" float8,
	"freight" float8,
	"tax" float8,
	"disc" float8,
	"totalamount" float8,
	"paidtoday" float8,
	"balance" float8,
	"comments" text COLLATE "default",
	"isrecuring" bool,
	"startdate" date,
	"recuntildate" date,
	"recnumtimes" int4,
	"alertto" int4,
	"notifto" int4,
	"display" int4,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" date,
	"datemod" date
)
WITH (OIDS=FALSE);
ALTER TABLE "sales" OWNER TO "imm";

-- ----------------------------
--  Table structure for taxtype
-- ----------------------------
DROP TABLE IF EXISTS "taxtype";
CREATE TABLE "taxtype" (
	"idtaxtype" int4 NOT NULL,
	"nametypetax" varchar(40) COLLATE "default",
	"description" varchar(225) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "taxtype" OWNER TO "imm";

-- ----------------------------
--  Records of taxtype
-- ----------------------------
BEGIN;
INSERT INTO "taxtype" VALUES ('1', 'Goods and Service Tax', 'Transaksi penjualan barang dan jasa kena pajak');
INSERT INTO "taxtype" VALUES ('2', 'Sales Tax', 'Tarif pajak penjualan');
INSERT INTO "taxtype" VALUES ('3', 'Consolidate', 'Menggabungkan dua atau lebih tarif pajak ata transaksi kena pajak');
INSERT INTO "taxtype" VALUES ('4', 'Import Duty', 'pajak untuk mencatat biaya import/bea masuk barang');
INSERT INTO "taxtype" VALUES ('5', 'Input Taxed', 'Tidak dibebankan langsung kepada pelanggan. Digunakan untuk pembelian barang untuk perusahaan');
COMMIT;

-- ----------------------------
--  Table structure for sys_group_menu
-- ----------------------------
DROP TABLE IF EXISTS "sys_group_menu";
CREATE TABLE "sys_group_menu" (
	"sys_menu_id" int4 NOT NULL,
	"group_id" int4 NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "sys_group_menu" OWNER TO "imm";

-- ----------------------------
--  Records of sys_group_menu
-- ----------------------------
BEGIN;
INSERT INTO "sys_group_menu" VALUES ('1', '1');
INSERT INTO "sys_group_menu" VALUES ('1', '2');
INSERT INTO "sys_group_menu" VALUES ('1', '3');
INSERT INTO "sys_group_menu" VALUES ('1', '99');
INSERT INTO "sys_group_menu" VALUES ('63', '1');
INSERT INTO "sys_group_menu" VALUES ('63', '2');
INSERT INTO "sys_group_menu" VALUES ('63', '3');
INSERT INTO "sys_group_menu" VALUES ('3', '1');
INSERT INTO "sys_group_menu" VALUES ('3', '2');
INSERT INTO "sys_group_menu" VALUES ('3', '99');
INSERT INTO "sys_group_menu" VALUES ('4', '1');
INSERT INTO "sys_group_menu" VALUES ('4', '2');
INSERT INTO "sys_group_menu" VALUES ('4', '99');
INSERT INTO "sys_group_menu" VALUES ('63', '4');
INSERT INTO "sys_group_menu" VALUES ('63', '99');
INSERT INTO "sys_group_menu" VALUES ('144', '1');
INSERT INTO "sys_group_menu" VALUES ('6', '1');
INSERT INTO "sys_group_menu" VALUES ('6', '2');
INSERT INTO "sys_group_menu" VALUES ('6', '99');
INSERT INTO "sys_group_menu" VALUES ('7', '1');
INSERT INTO "sys_group_menu" VALUES ('7', '2');
INSERT INTO "sys_group_menu" VALUES ('7', '99');
INSERT INTO "sys_group_menu" VALUES ('144', '2');
INSERT INTO "sys_group_menu" VALUES ('144', '3');
INSERT INTO "sys_group_menu" VALUES ('144', '5');
INSERT INTO "sys_group_menu" VALUES ('9', '1');
INSERT INTO "sys_group_menu" VALUES ('9', '2');
INSERT INTO "sys_group_menu" VALUES ('9', '99');
INSERT INTO "sys_group_menu" VALUES ('10', '1');
INSERT INTO "sys_group_menu" VALUES ('10', '2');
INSERT INTO "sys_group_menu" VALUES ('10', '99');
INSERT INTO "sys_group_menu" VALUES ('12', '1');
INSERT INTO "sys_group_menu" VALUES ('12', '2');
INSERT INTO "sys_group_menu" VALUES ('12', '99');
INSERT INTO "sys_group_menu" VALUES ('13', '1');
INSERT INTO "sys_group_menu" VALUES ('13', '2');
INSERT INTO "sys_group_menu" VALUES ('13', '99');
INSERT INTO "sys_group_menu" VALUES ('14', '1');
INSERT INTO "sys_group_menu" VALUES ('14', '2');
INSERT INTO "sys_group_menu" VALUES ('14', '99');
INSERT INTO "sys_group_menu" VALUES ('144', '99');
INSERT INTO "sys_group_menu" VALUES ('144', '4');
INSERT INTO "sys_group_menu" VALUES ('149', '1');
INSERT INTO "sys_group_menu" VALUES ('16', '1');
INSERT INTO "sys_group_menu" VALUES ('16', '2');
INSERT INTO "sys_group_menu" VALUES ('16', '99');
INSERT INTO "sys_group_menu" VALUES ('17', '1');
INSERT INTO "sys_group_menu" VALUES ('17', '2');
INSERT INTO "sys_group_menu" VALUES ('17', '99');
INSERT INTO "sys_group_menu" VALUES ('18', '1');
INSERT INTO "sys_group_menu" VALUES ('18', '2');
INSERT INTO "sys_group_menu" VALUES ('18', '99');
INSERT INTO "sys_group_menu" VALUES ('149', '2');
INSERT INTO "sys_group_menu" VALUES ('149', '3');
INSERT INTO "sys_group_menu" VALUES ('149', '4');
INSERT INTO "sys_group_menu" VALUES ('20', '1');
INSERT INTO "sys_group_menu" VALUES ('20', '2');
INSERT INTO "sys_group_menu" VALUES ('20', '99');
INSERT INTO "sys_group_menu" VALUES ('21', '1');
INSERT INTO "sys_group_menu" VALUES ('21', '2');
INSERT INTO "sys_group_menu" VALUES ('21', '99');
INSERT INTO "sys_group_menu" VALUES ('22', '1');
INSERT INTO "sys_group_menu" VALUES ('22', '2');
INSERT INTO "sys_group_menu" VALUES ('22', '99');
INSERT INTO "sys_group_menu" VALUES ('23', '1');
INSERT INTO "sys_group_menu" VALUES ('23', '2');
INSERT INTO "sys_group_menu" VALUES ('23', '99');
INSERT INTO "sys_group_menu" VALUES ('24', '1');
INSERT INTO "sys_group_menu" VALUES ('24', '2');
INSERT INTO "sys_group_menu" VALUES ('24', '99');
INSERT INTO "sys_group_menu" VALUES ('25', '1');
INSERT INTO "sys_group_menu" VALUES ('25', '2');
INSERT INTO "sys_group_menu" VALUES ('25', '99');
INSERT INTO "sys_group_menu" VALUES ('26', '1');
INSERT INTO "sys_group_menu" VALUES ('26', '2');
INSERT INTO "sys_group_menu" VALUES ('26', '99');
INSERT INTO "sys_group_menu" VALUES ('149', '5');
INSERT INTO "sys_group_menu" VALUES ('149', '99');
INSERT INTO "sys_group_menu" VALUES ('28', '1');
INSERT INTO "sys_group_menu" VALUES ('28', '2');
INSERT INTO "sys_group_menu" VALUES ('28', '99');
INSERT INTO "sys_group_menu" VALUES ('29', '1');
INSERT INTO "sys_group_menu" VALUES ('29', '2');
INSERT INTO "sys_group_menu" VALUES ('29', '99');
INSERT INTO "sys_group_menu" VALUES ('30', '1');
INSERT INTO "sys_group_menu" VALUES ('30', '2');
INSERT INTO "sys_group_menu" VALUES ('30', '99');
INSERT INTO "sys_group_menu" VALUES ('31', '1');
INSERT INTO "sys_group_menu" VALUES ('31', '2');
INSERT INTO "sys_group_menu" VALUES ('31', '99');
INSERT INTO "sys_group_menu" VALUES ('32', '1');
INSERT INTO "sys_group_menu" VALUES ('32', '2');
INSERT INTO "sys_group_menu" VALUES ('32', '99');
INSERT INTO "sys_group_menu" VALUES ('33', '1');
INSERT INTO "sys_group_menu" VALUES ('33', '2');
INSERT INTO "sys_group_menu" VALUES ('33', '99');
INSERT INTO "sys_group_menu" VALUES ('34', '1');
INSERT INTO "sys_group_menu" VALUES ('34', '2');
INSERT INTO "sys_group_menu" VALUES ('34', '99');
INSERT INTO "sys_group_menu" VALUES ('35', '1');
INSERT INTO "sys_group_menu" VALUES ('35', '2');
INSERT INTO "sys_group_menu" VALUES ('35', '99');
INSERT INTO "sys_group_menu" VALUES ('36', '1');
INSERT INTO "sys_group_menu" VALUES ('36', '2');
INSERT INTO "sys_group_menu" VALUES ('36', '99');
INSERT INTO "sys_group_menu" VALUES ('37', '1');
INSERT INTO "sys_group_menu" VALUES ('37', '2');
INSERT INTO "sys_group_menu" VALUES ('37', '99');
INSERT INTO "sys_group_menu" VALUES ('38', '1');
INSERT INTO "sys_group_menu" VALUES ('38', '2');
INSERT INTO "sys_group_menu" VALUES ('38', '99');
INSERT INTO "sys_group_menu" VALUES ('39', '1');
INSERT INTO "sys_group_menu" VALUES ('39', '2');
INSERT INTO "sys_group_menu" VALUES ('39', '99');
INSERT INTO "sys_group_menu" VALUES ('40', '1');
INSERT INTO "sys_group_menu" VALUES ('40', '2');
INSERT INTO "sys_group_menu" VALUES ('40', '99');
INSERT INTO "sys_group_menu" VALUES ('41', '1');
INSERT INTO "sys_group_menu" VALUES ('41', '2');
INSERT INTO "sys_group_menu" VALUES ('41', '99');
INSERT INTO "sys_group_menu" VALUES ('42', '1');
INSERT INTO "sys_group_menu" VALUES ('42', '2');
INSERT INTO "sys_group_menu" VALUES ('42', '99');
INSERT INTO "sys_group_menu" VALUES ('43', '1');
INSERT INTO "sys_group_menu" VALUES ('43', '2');
INSERT INTO "sys_group_menu" VALUES ('43', '99');
INSERT INTO "sys_group_menu" VALUES ('44', '1');
INSERT INTO "sys_group_menu" VALUES ('44', '2');
INSERT INTO "sys_group_menu" VALUES ('44', '99');
INSERT INTO "sys_group_menu" VALUES ('45', '1');
INSERT INTO "sys_group_menu" VALUES ('45', '2');
INSERT INTO "sys_group_menu" VALUES ('45', '99');
INSERT INTO "sys_group_menu" VALUES ('46', '1');
INSERT INTO "sys_group_menu" VALUES ('46', '2');
INSERT INTO "sys_group_menu" VALUES ('46', '99');
INSERT INTO "sys_group_menu" VALUES ('47', '1');
INSERT INTO "sys_group_menu" VALUES ('47', '2');
INSERT INTO "sys_group_menu" VALUES ('47', '99');
INSERT INTO "sys_group_menu" VALUES ('48', '1');
INSERT INTO "sys_group_menu" VALUES ('48', '2');
INSERT INTO "sys_group_menu" VALUES ('48', '99');
INSERT INTO "sys_group_menu" VALUES ('49', '1');
INSERT INTO "sys_group_menu" VALUES ('49', '2');
INSERT INTO "sys_group_menu" VALUES ('49', '99');
INSERT INTO "sys_group_menu" VALUES ('50', '1');
INSERT INTO "sys_group_menu" VALUES ('50', '2');
INSERT INTO "sys_group_menu" VALUES ('50', '99');
INSERT INTO "sys_group_menu" VALUES ('52', '1');
INSERT INTO "sys_group_menu" VALUES ('52', '2');
INSERT INTO "sys_group_menu" VALUES ('52', '99');
INSERT INTO "sys_group_menu" VALUES ('53', '1');
INSERT INTO "sys_group_menu" VALUES ('53', '2');
INSERT INTO "sys_group_menu" VALUES ('53', '99');
INSERT INTO "sys_group_menu" VALUES ('54', '1');
INSERT INTO "sys_group_menu" VALUES ('54', '2');
INSERT INTO "sys_group_menu" VALUES ('54', '99');
INSERT INTO "sys_group_menu" VALUES ('55', '1');
INSERT INTO "sys_group_menu" VALUES ('55', '2');
INSERT INTO "sys_group_menu" VALUES ('55', '99');
INSERT INTO "sys_group_menu" VALUES ('56', '1');
INSERT INTO "sys_group_menu" VALUES ('56', '2');
INSERT INTO "sys_group_menu" VALUES ('56', '99');
INSERT INTO "sys_group_menu" VALUES ('58', '1');
INSERT INTO "sys_group_menu" VALUES ('58', '2');
INSERT INTO "sys_group_menu" VALUES ('58', '99');
INSERT INTO "sys_group_menu" VALUES ('59', '1');
INSERT INTO "sys_group_menu" VALUES ('59', '2');
INSERT INTO "sys_group_menu" VALUES ('59', '99');
INSERT INTO "sys_group_menu" VALUES ('60', '1');
INSERT INTO "sys_group_menu" VALUES ('60', '2');
INSERT INTO "sys_group_menu" VALUES ('60', '99');
INSERT INTO "sys_group_menu" VALUES ('61', '1');
INSERT INTO "sys_group_menu" VALUES ('61', '2');
INSERT INTO "sys_group_menu" VALUES ('61', '3');
INSERT INTO "sys_group_menu" VALUES ('61', '4');
INSERT INTO "sys_group_menu" VALUES ('61', '99');
INSERT INTO "sys_group_menu" VALUES ('62', '1');
INSERT INTO "sys_group_menu" VALUES ('62', '2');
INSERT INTO "sys_group_menu" VALUES ('62', '3');
INSERT INTO "sys_group_menu" VALUES ('62', '99');
INSERT INTO "sys_group_menu" VALUES ('64', '1');
INSERT INTO "sys_group_menu" VALUES ('64', '2');
INSERT INTO "sys_group_menu" VALUES ('64', '3');
INSERT INTO "sys_group_menu" VALUES ('64', '4');
INSERT INTO "sys_group_menu" VALUES ('64', '99');
INSERT INTO "sys_group_menu" VALUES ('65', '1');
INSERT INTO "sys_group_menu" VALUES ('65', '2');
INSERT INTO "sys_group_menu" VALUES ('65', '3');
INSERT INTO "sys_group_menu" VALUES ('65', '4');
INSERT INTO "sys_group_menu" VALUES ('65', '99');
INSERT INTO "sys_group_menu" VALUES ('66', '1');
INSERT INTO "sys_group_menu" VALUES ('66', '2');
INSERT INTO "sys_group_menu" VALUES ('66', '3');
INSERT INTO "sys_group_menu" VALUES ('66', '4');
INSERT INTO "sys_group_menu" VALUES ('66', '99');
INSERT INTO "sys_group_menu" VALUES ('67', '1');
INSERT INTO "sys_group_menu" VALUES ('67', '2');
INSERT INTO "sys_group_menu" VALUES ('67', '99');
INSERT INTO "sys_group_menu" VALUES ('68', '1');
INSERT INTO "sys_group_menu" VALUES ('68', '2');
INSERT INTO "sys_group_menu" VALUES ('68', '99');
INSERT INTO "sys_group_menu" VALUES ('69', '1');
INSERT INTO "sys_group_menu" VALUES ('69', '2');
INSERT INTO "sys_group_menu" VALUES ('69', '99');
INSERT INTO "sys_group_menu" VALUES ('70', '1');
INSERT INTO "sys_group_menu" VALUES ('70', '2');
INSERT INTO "sys_group_menu" VALUES ('70', '99');
INSERT INTO "sys_group_menu" VALUES ('71', '1');
INSERT INTO "sys_group_menu" VALUES ('71', '2');
INSERT INTO "sys_group_menu" VALUES ('71', '99');
INSERT INTO "sys_group_menu" VALUES ('72', '1');
INSERT INTO "sys_group_menu" VALUES ('72', '2');
INSERT INTO "sys_group_menu" VALUES ('72', '99');
INSERT INTO "sys_group_menu" VALUES ('73', '1');
INSERT INTO "sys_group_menu" VALUES ('73', '2');
INSERT INTO "sys_group_menu" VALUES ('73', '3');
INSERT INTO "sys_group_menu" VALUES ('73', '4');
INSERT INTO "sys_group_menu" VALUES ('73', '99');
INSERT INTO "sys_group_menu" VALUES ('74', '1');
INSERT INTO "sys_group_menu" VALUES ('74', '2');
INSERT INTO "sys_group_menu" VALUES ('74', '3');
INSERT INTO "sys_group_menu" VALUES ('74', '99');
INSERT INTO "sys_group_menu" VALUES ('75', '1');
INSERT INTO "sys_group_menu" VALUES ('75', '2');
INSERT INTO "sys_group_menu" VALUES ('75', '99');
INSERT INTO "sys_group_menu" VALUES ('76', '1');
INSERT INTO "sys_group_menu" VALUES ('76', '2');
INSERT INTO "sys_group_menu" VALUES ('76', '99');
INSERT INTO "sys_group_menu" VALUES ('77', '1');
INSERT INTO "sys_group_menu" VALUES ('77', '2');
INSERT INTO "sys_group_menu" VALUES ('77', '99');
INSERT INTO "sys_group_menu" VALUES ('78', '1');
INSERT INTO "sys_group_menu" VALUES ('78', '2');
INSERT INTO "sys_group_menu" VALUES ('78', '99');
INSERT INTO "sys_group_menu" VALUES ('79', '1');
INSERT INTO "sys_group_menu" VALUES ('79', '2');
INSERT INTO "sys_group_menu" VALUES ('79', '99');
INSERT INTO "sys_group_menu" VALUES ('82', '1');
INSERT INTO "sys_group_menu" VALUES ('82', '2');
INSERT INTO "sys_group_menu" VALUES ('82', '99');
INSERT INTO "sys_group_menu" VALUES ('83', '1');
INSERT INTO "sys_group_menu" VALUES ('83', '2');
INSERT INTO "sys_group_menu" VALUES ('83', '99');
INSERT INTO "sys_group_menu" VALUES ('84', '1');
INSERT INTO "sys_group_menu" VALUES ('84', '2');
INSERT INTO "sys_group_menu" VALUES ('84', '99');
INSERT INTO "sys_group_menu" VALUES ('85', '1');
INSERT INTO "sys_group_menu" VALUES ('85', '2');
INSERT INTO "sys_group_menu" VALUES ('85', '99');
INSERT INTO "sys_group_menu" VALUES ('86', '1');
INSERT INTO "sys_group_menu" VALUES ('86', '2');
INSERT INTO "sys_group_menu" VALUES ('86', '99');
INSERT INTO "sys_group_menu" VALUES ('87', '1');
INSERT INTO "sys_group_menu" VALUES ('87', '2');
INSERT INTO "sys_group_menu" VALUES ('87', '99');
INSERT INTO "sys_group_menu" VALUES ('88', '1');
INSERT INTO "sys_group_menu" VALUES ('88', '2');
INSERT INTO "sys_group_menu" VALUES ('88', '99');
INSERT INTO "sys_group_menu" VALUES ('89', '1');
INSERT INTO "sys_group_menu" VALUES ('89', '2');
INSERT INTO "sys_group_menu" VALUES ('89', '99');
INSERT INTO "sys_group_menu" VALUES ('90', '1');
INSERT INTO "sys_group_menu" VALUES ('90', '2');
INSERT INTO "sys_group_menu" VALUES ('90', '99');
INSERT INTO "sys_group_menu" VALUES ('91', '1');
INSERT INTO "sys_group_menu" VALUES ('91', '2');
INSERT INTO "sys_group_menu" VALUES ('91', '99');
INSERT INTO "sys_group_menu" VALUES ('92', '1');
INSERT INTO "sys_group_menu" VALUES ('92', '99');
INSERT INTO "sys_group_menu" VALUES ('93', '1');
INSERT INTO "sys_group_menu" VALUES ('93', '2');
INSERT INTO "sys_group_menu" VALUES ('93', '99');
INSERT INTO "sys_group_menu" VALUES ('94', '1');
INSERT INTO "sys_group_menu" VALUES ('94', '2');
INSERT INTO "sys_group_menu" VALUES ('94', '99');
INSERT INTO "sys_group_menu" VALUES ('95', '1');
INSERT INTO "sys_group_menu" VALUES ('95', '2');
INSERT INTO "sys_group_menu" VALUES ('95', '99');
INSERT INTO "sys_group_menu" VALUES ('96', '1');
INSERT INTO "sys_group_menu" VALUES ('96', '2');
INSERT INTO "sys_group_menu" VALUES ('96', '99');
INSERT INTO "sys_group_menu" VALUES ('97', '1');
INSERT INTO "sys_group_menu" VALUES ('97', '2');
INSERT INTO "sys_group_menu" VALUES ('97', '99');
INSERT INTO "sys_group_menu" VALUES ('98', '1');
INSERT INTO "sys_group_menu" VALUES ('98', '2');
INSERT INTO "sys_group_menu" VALUES ('98', '99');
INSERT INTO "sys_group_menu" VALUES ('99', '1');
INSERT INTO "sys_group_menu" VALUES ('99', '2');
INSERT INTO "sys_group_menu" VALUES ('99', '99');
INSERT INTO "sys_group_menu" VALUES ('100', '1');
INSERT INTO "sys_group_menu" VALUES ('100', '2');
INSERT INTO "sys_group_menu" VALUES ('100', '99');
INSERT INTO "sys_group_menu" VALUES ('101', '1');
INSERT INTO "sys_group_menu" VALUES ('101', '2');
INSERT INTO "sys_group_menu" VALUES ('101', '99');
INSERT INTO "sys_group_menu" VALUES ('102', '1');
INSERT INTO "sys_group_menu" VALUES ('102', '2');
INSERT INTO "sys_group_menu" VALUES ('102', '99');
INSERT INTO "sys_group_menu" VALUES ('116', '1');
INSERT INTO "sys_group_menu" VALUES ('116', '2');
INSERT INTO "sys_group_menu" VALUES ('116', '99');
INSERT INTO "sys_group_menu" VALUES ('117', '1');
INSERT INTO "sys_group_menu" VALUES ('117', '2');
INSERT INTO "sys_group_menu" VALUES ('117', '99');
INSERT INTO "sys_group_menu" VALUES ('118', '1');
INSERT INTO "sys_group_menu" VALUES ('118', '2');
INSERT INTO "sys_group_menu" VALUES ('118', '99');
INSERT INTO "sys_group_menu" VALUES ('119', '1');
INSERT INTO "sys_group_menu" VALUES ('119', '2');
INSERT INTO "sys_group_menu" VALUES ('119', '99');
INSERT INTO "sys_group_menu" VALUES ('120', '1');
INSERT INTO "sys_group_menu" VALUES ('120', '2');
INSERT INTO "sys_group_menu" VALUES ('120', '99');
INSERT INTO "sys_group_menu" VALUES ('8', '1');
INSERT INTO "sys_group_menu" VALUES ('8', '2');
INSERT INTO "sys_group_menu" VALUES ('8', '99');
INSERT INTO "sys_group_menu" VALUES ('19', '1');
INSERT INTO "sys_group_menu" VALUES ('19', '2');
INSERT INTO "sys_group_menu" VALUES ('19', '99');
INSERT INTO "sys_group_menu" VALUES ('57', '1');
INSERT INTO "sys_group_menu" VALUES ('57', '2');
INSERT INTO "sys_group_menu" VALUES ('57', '99');
INSERT INTO "sys_group_menu" VALUES ('142', '1');
INSERT INTO "sys_group_menu" VALUES ('142', '3');
INSERT INTO "sys_group_menu" VALUES ('142', '4');
INSERT INTO "sys_group_menu" VALUES ('142', '2');
INSERT INTO "sys_group_menu" VALUES ('142', '5');
INSERT INTO "sys_group_menu" VALUES ('142', '99');
INSERT INTO "sys_group_menu" VALUES ('145', '2');
INSERT INTO "sys_group_menu" VALUES ('145', '3');
INSERT INTO "sys_group_menu" VALUES ('145', '4');
INSERT INTO "sys_group_menu" VALUES ('145', '5');
INSERT INTO "sys_group_menu" VALUES ('145', '99');
INSERT INTO "sys_group_menu" VALUES ('145', '1');
INSERT INTO "sys_group_menu" VALUES ('150', '1');
INSERT INTO "sys_group_menu" VALUES ('150', '2');
INSERT INTO "sys_group_menu" VALUES ('150', '3');
INSERT INTO "sys_group_menu" VALUES ('150', '4');
INSERT INTO "sys_group_menu" VALUES ('150', '5');
INSERT INTO "sys_group_menu" VALUES ('150', '99');
INSERT INTO "sys_group_menu" VALUES ('139', '1');
INSERT INTO "sys_group_menu" VALUES ('139', '2');
INSERT INTO "sys_group_menu" VALUES ('139', '3');
INSERT INTO "sys_group_menu" VALUES ('139', '4');
INSERT INTO "sys_group_menu" VALUES ('139', '5');
INSERT INTO "sys_group_menu" VALUES ('139', '99');
INSERT INTO "sys_group_menu" VALUES ('127', '1');
INSERT INTO "sys_group_menu" VALUES ('127', '2');
INSERT INTO "sys_group_menu" VALUES ('127', '3');
INSERT INTO "sys_group_menu" VALUES ('127', '4');
INSERT INTO "sys_group_menu" VALUES ('131', '1');
INSERT INTO "sys_group_menu" VALUES ('15', '1');
INSERT INTO "sys_group_menu" VALUES ('15', '2');
INSERT INTO "sys_group_menu" VALUES ('15', '99');
INSERT INTO "sys_group_menu" VALUES ('131', '2');
INSERT INTO "sys_group_menu" VALUES ('131', '3');
INSERT INTO "sys_group_menu" VALUES ('131', '4');
INSERT INTO "sys_group_menu" VALUES ('131', '5');
INSERT INTO "sys_group_menu" VALUES ('131', '99');
INSERT INTO "sys_group_menu" VALUES ('133', '1');
INSERT INTO "sys_group_menu" VALUES ('133', '2');
INSERT INTO "sys_group_menu" VALUES ('133', '3');
INSERT INTO "sys_group_menu" VALUES ('133', '4');
INSERT INTO "sys_group_menu" VALUES ('133', '5');
INSERT INTO "sys_group_menu" VALUES ('133', '99');
INSERT INTO "sys_group_menu" VALUES ('134', '1');
INSERT INTO "sys_group_menu" VALUES ('134', '2');
INSERT INTO "sys_group_menu" VALUES ('134', '3');
INSERT INTO "sys_group_menu" VALUES ('134', '4');
INSERT INTO "sys_group_menu" VALUES ('134', '5');
INSERT INTO "sys_group_menu" VALUES ('134', '99');
INSERT INTO "sys_group_menu" VALUES ('135', '1');
INSERT INTO "sys_group_menu" VALUES ('135', '2');
INSERT INTO "sys_group_menu" VALUES ('135', '3');
INSERT INTO "sys_group_menu" VALUES ('135', '4');
INSERT INTO "sys_group_menu" VALUES ('135', '5');
INSERT INTO "sys_group_menu" VALUES ('135', '99');
INSERT INTO "sys_group_menu" VALUES ('136', '2');
INSERT INTO "sys_group_menu" VALUES ('136', '1');
INSERT INTO "sys_group_menu" VALUES ('136', '3');
INSERT INTO "sys_group_menu" VALUES ('136', '4');
INSERT INTO "sys_group_menu" VALUES ('136', '5');
INSERT INTO "sys_group_menu" VALUES ('136', '99');
INSERT INTO "sys_group_menu" VALUES ('137', '1');
INSERT INTO "sys_group_menu" VALUES ('137', '2');
INSERT INTO "sys_group_menu" VALUES ('137', '3');
INSERT INTO "sys_group_menu" VALUES ('137', '4');
INSERT INTO "sys_group_menu" VALUES ('137', '5');
INSERT INTO "sys_group_menu" VALUES ('137', '99');
INSERT INTO "sys_group_menu" VALUES ('138', '1');
INSERT INTO "sys_group_menu" VALUES ('138', '2');
INSERT INTO "sys_group_menu" VALUES ('138', '3');
INSERT INTO "sys_group_menu" VALUES ('138', '4');
INSERT INTO "sys_group_menu" VALUES ('138', '5');
INSERT INTO "sys_group_menu" VALUES ('138', '99');
INSERT INTO "sys_group_menu" VALUES ('130', '1');
INSERT INTO "sys_group_menu" VALUES ('130', '2');
INSERT INTO "sys_group_menu" VALUES ('130', '3');
INSERT INTO "sys_group_menu" VALUES ('130', '4');
INSERT INTO "sys_group_menu" VALUES ('130', '5');
INSERT INTO "sys_group_menu" VALUES ('130', '99');
INSERT INTO "sys_group_menu" VALUES ('5', '1');
INSERT INTO "sys_group_menu" VALUES ('5', '2');
INSERT INTO "sys_group_menu" VALUES ('5', '99');
INSERT INTO "sys_group_menu" VALUES ('132', '1');
INSERT INTO "sys_group_menu" VALUES ('132', '2');
INSERT INTO "sys_group_menu" VALUES ('132', '5');
INSERT INTO "sys_group_menu" VALUES ('132', '4');
INSERT INTO "sys_group_menu" VALUES ('132', '3');
INSERT INTO "sys_group_menu" VALUES ('132', '99');
INSERT INTO "sys_group_menu" VALUES ('129', '1');
INSERT INTO "sys_group_menu" VALUES ('129', '2');
INSERT INTO "sys_group_menu" VALUES ('129', '3');
INSERT INTO "sys_group_menu" VALUES ('129', '4');
INSERT INTO "sys_group_menu" VALUES ('129', '5');
INSERT INTO "sys_group_menu" VALUES ('129', '99');
INSERT INTO "sys_group_menu" VALUES ('128', '1');
INSERT INTO "sys_group_menu" VALUES ('128', '2');
INSERT INTO "sys_group_menu" VALUES ('128', '3');
INSERT INTO "sys_group_menu" VALUES ('128', '4');
INSERT INTO "sys_group_menu" VALUES ('128', '5');
INSERT INTO "sys_group_menu" VALUES ('128', '99');
INSERT INTO "sys_group_menu" VALUES ('2', '1');
INSERT INTO "sys_group_menu" VALUES ('2', '2');
INSERT INTO "sys_group_menu" VALUES ('2', '99');
INSERT INTO "sys_group_menu" VALUES ('143', '2');
INSERT INTO "sys_group_menu" VALUES ('143', '3');
INSERT INTO "sys_group_menu" VALUES ('143', '4');
INSERT INTO "sys_group_menu" VALUES ('143', '5');
INSERT INTO "sys_group_menu" VALUES ('143', '99');
INSERT INTO "sys_group_menu" VALUES ('143', '1');
INSERT INTO "sys_group_menu" VALUES ('146', '1');
INSERT INTO "sys_group_menu" VALUES ('146', '2');
INSERT INTO "sys_group_menu" VALUES ('146', '3');
INSERT INTO "sys_group_menu" VALUES ('146', '4');
INSERT INTO "sys_group_menu" VALUES ('146', '5');
INSERT INTO "sys_group_menu" VALUES ('146', '99');
INSERT INTO "sys_group_menu" VALUES ('147', '1');
INSERT INTO "sys_group_menu" VALUES ('147', '2');
INSERT INTO "sys_group_menu" VALUES ('147', '3');
INSERT INTO "sys_group_menu" VALUES ('147', '4');
INSERT INTO "sys_group_menu" VALUES ('147', '5');
INSERT INTO "sys_group_menu" VALUES ('147', '99');
INSERT INTO "sys_group_menu" VALUES ('140', '1');
INSERT INTO "sys_group_menu" VALUES ('140', '2');
INSERT INTO "sys_group_menu" VALUES ('140', '3');
INSERT INTO "sys_group_menu" VALUES ('140', '4');
INSERT INTO "sys_group_menu" VALUES ('140', '5');
INSERT INTO "sys_group_menu" VALUES ('140', '99');
INSERT INTO "sys_group_menu" VALUES ('27', '1');
INSERT INTO "sys_group_menu" VALUES ('27', '2');
INSERT INTO "sys_group_menu" VALUES ('27', '99');
INSERT INTO "sys_group_menu" VALUES ('11', '1');
INSERT INTO "sys_group_menu" VALUES ('11', '2');
INSERT INTO "sys_group_menu" VALUES ('11', '99');
INSERT INTO "sys_group_menu" VALUES ('141', '1');
INSERT INTO "sys_group_menu" VALUES ('141', '2');
INSERT INTO "sys_group_menu" VALUES ('141', '5');
INSERT INTO "sys_group_menu" VALUES ('141', '99');
INSERT INTO "sys_group_menu" VALUES ('141', '4');
INSERT INTO "sys_group_menu" VALUES ('141', '3');
INSERT INTO "sys_group_menu" VALUES ('148', '1');
INSERT INTO "sys_group_menu" VALUES ('148', '2');
INSERT INTO "sys_group_menu" VALUES ('148', '3');
INSERT INTO "sys_group_menu" VALUES ('148', '4');
INSERT INTO "sys_group_menu" VALUES ('148', '5');
INSERT INTO "sys_group_menu" VALUES ('148', '99');
COMMIT;

-- ----------------------------
--  Table structure for payment
-- ----------------------------
DROP TABLE IF EXISTS "payment";
CREATE TABLE "payment" (
	"idpayment" int8 NOT NULL,
	"namepayment" varchar(30) COLLATE "default",
	"description" varchar(150) COLLATE "default",
	"userin" varchar(30) COLLATE "default",
	"usermod" varchar(30) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "payment" OWNER TO "imm";

-- ----------------------------
--  Records of payment
-- ----------------------------
BEGIN;
INSERT INTO "payment" VALUES ('1', 'Tunai', null, null, null, null, null);
INSERT INTO "payment" VALUES ('3', 'Kredit', null, null, null, null, null);
INSERT INTO "payment" VALUES ('4', 'Cash on Delivery', null, null, null, null, null);
COMMIT;

-- ----------------------------
--  Table structure for spendmoneyitem
-- ----------------------------
DROP TABLE IF EXISTS "spendmoneyitem";
CREATE TABLE "spendmoneyitem" (
	"idspendmoneyitem" int8 NOT NULL DEFAULT nextval('seq_spendmoneyitem'::regclass),
	"idspendmoney" int8,
	"idaccount" int8,
	"amount" float8,
	"memo" varchar(225) COLLATE "default",
	"ratetax" float8
)
WITH (OIDS=FALSE);
ALTER TABLE "spendmoneyitem" OWNER TO "imm";

-- ----------------------------
--  Records of spendmoneyitem
-- ----------------------------
BEGIN;
INSERT INTO "spendmoneyitem" VALUES ('24', '26', '59', '3500000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('36', '38', '758', '100000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('38', '40', '758', '61290', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('23', '24', '59', '10000000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('37', '39', '760', '238000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('21', '22', '732', '13000000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('42', '44', '761', '319200', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('39', '41', '760', '99000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('26', '28', '59', '3300000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('44', '46', '732', '226100', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('27', '29', '59', '4000000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('34', '36', '760', '120000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('25', '27', '59', '8000000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('28', '30', '757', '477603', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('35', '37', '760', '120000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('30', '32', '757', '133798', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('31', '33', '759', '198000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('22', '23', '59', '10000000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('40', '42', '758', '200000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('33', '35', '758', '83000', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('41', '43', '761', '186200', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('29', '31', '757', '252700', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('43', '45', '732', '505400', null, '0');
INSERT INTO "spendmoneyitem" VALUES ('32', '34', '760', '119000', null, '0');
COMMIT;

-- ----------------------------
--  Table structure for prosesgaji
-- ----------------------------
DROP TABLE IF EXISTS "prosesgaji";
CREATE TABLE "prosesgaji" (
	"idprosesgaji" int8 NOT NULL DEFAULT nextval('seq_prosesgaji'::regclass),
	"idsallary" int4,
	"idpotongan" int4,
	"idtunjangan" int4,
	"jenpph" varchar(30) COLLATE "default",
	"totalpotongan" numeric,
	"totaltunjangan" numeric,
	"biayajabatan" numeric,
	"pph21" numeric,
	"totalpembayaran" numeric,
	"userin" varchar(30) COLLATE "default",
	"usermod" varchar(30) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"bulan" varchar(2) COLLATE "default",
	"tahun" int4,
	"idemployee" int4,
	"gajipokok" float8,
	"idunit" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "prosesgaji" OWNER TO "imm";

-- ----------------------------
--  Table structure for customertype
-- ----------------------------
DROP TABLE IF EXISTS "customertype";
CREATE TABLE "customertype" (
	"idcustomertype" int4 NOT NULL,
	"namecustype" varchar(20) COLLATE "default",
	"description" varchar(225) COLLATE "default",
	"userin" int4,
	"datein" timestamp(6) NULL,
	"usermod" int4,
	"datemod" timestamp(6) NULL,
	"idunit" int4 NOT NULL,
	"display" int2
)
WITH (OIDS=FALSE);
ALTER TABLE "customertype" OWNER TO "imm";

-- ----------------------------
--  Records of customertype
-- ----------------------------
BEGIN;
INSERT INTO "customertype" VALUES ('1', '1', 'dec', '11', '2017-03-09 08:03:37', '11', '2017-03-09 08:03:32', '12', null);
COMMIT;

-- ----------------------------
--  Table structure for sys_menu_unit
-- ----------------------------
DROP TABLE IF EXISTS "sys_menu_unit";
CREATE TABLE "sys_menu_unit" (
	"sys_menu_id" int4,
	"idunit" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "sys_menu_unit" OWNER TO "imm";

-- ----------------------------
--  Table structure for asuransitype
-- ----------------------------
DROP TABLE IF EXISTS "asuransitype";
CREATE TABLE "asuransitype" (
	"idasuransitype" int4 NOT NULL,
	"nametype" varchar(20) COLLATE "default",
	"column_3" char(10) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "asuransitype" OWNER TO "imm";

-- ----------------------------
--  Table structure for disbursment
-- ----------------------------
DROP TABLE IF EXISTS "disbursment";
CREATE TABLE "disbursment" (
	"iddisbursment" int8 NOT NULL DEFAULT nextval('seq_disbursment'::regclass),
	"idpurchase" int8,
	"idaccount" int8,
	"idjournal" int8,
	"datepay" date,
	"nocheque" varchar(50) COLLATE "default",
	"memo" varchar(225) COLLATE "default",
	"totalowed" float8,
	"totalpaid" float8,
	"balance" float8,
	"payee" text COLLATE "default",
	"display" int4,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"idregistrasihutang" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "disbursment" OWNER TO "imm";

-- ----------------------------
--  Table structure for returnitem
-- ----------------------------
DROP TABLE IF EXISTS "returnitem";
CREATE TABLE "returnitem" (
	"idreturnitem" int8,
	"idreturn" int8 NOT NULL,
	"qtyretur" int4,
	"price" float8,
	"total" float8,
	"idinventory" int4 NOT NULL,
	"invno" varchar(50) COLLATE "default",
	"cost" float8,
	"ratetax" float8,
	"returnamount" float8
)
WITH (OIDS=FALSE);
ALTER TABLE "returnitem" OWNER TO "imm";

-- ----------------------------
--  Table structure for thr
-- ----------------------------
DROP TABLE IF EXISTS "thr";
CREATE TABLE "thr" (
	"idthr" int4 NOT NULL,
	"tglthr" date,
	"idjournal" int4,
	"month" varchar(2) COLLATE "default",
	"year" int4,
	"keterangan" varchar(225) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"idunit" int4,
	"totalthr" float8
)
WITH (OIDS=FALSE);
ALTER TABLE "thr" OWNER TO "imm";

-- ----------------------------
--  Table structure for receivepayment
-- ----------------------------
DROP TABLE IF EXISTS "receivepayment";
CREATE TABLE "receivepayment" (
	"idreceivepayment" int4 NOT NULL,
	"idcustomer" int8,
	"idsales" int8,
	"idpayment" int8,
	"idjournal" int8,
	"nopayment" varchar(20) COLLATE "default",
	"depositaccount" int8,
	"datepayment" date,
	"memo" varchar(225) COLLATE "default",
	"ampount" float8,
	"charge" float8,
	"disc" float8,
	"balance" float8,
	"display" int4,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "receivepayment" OWNER TO "imm";

-- ----------------------------
--  Table structure for journalitemrec
-- ----------------------------
DROP TABLE IF EXISTS "journalitemrec";
CREATE TABLE "journalitemrec" (
	"idjournalitemrec" int8 NOT NULL DEFAULT nextval('seq_journalitem'::regclass),
	"idjournalrec" int8,
	"idaccount" int8,
	"idtax" int4,
	"debit" float8,
	"credit" float8,
	"memo" varchar(225) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "journalitemrec" OWNER TO "imm";

-- ----------------------------
--  Table structure for linkedacc
-- ----------------------------
DROP TABLE IF EXISTS "linkedacc";
CREATE TABLE "linkedacc" (
	"idlinked" int4 NOT NULL,
	"idaccounttype" int8,
	"namelinked" varchar(200) COLLATE "default",
	"description" varchar(224) COLLATE "default",
	"idaccount" int4,
	"display" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "linkedacc" OWNER TO "imm";

COMMENT ON TABLE "linkedacc" IS 'linked account';

-- ----------------------------
--  Records of linkedacc
-- ----------------------------
BEGIN;
INSERT INTO "linkedacc" VALUES ('1', null, 'Asuransi Dibayar Dimuka', null, null, '0');
INSERT INTO "linkedacc" VALUES ('2', null, 'Hutang Jangka Panjang', null, null, '0');
INSERT INTO "linkedacc" VALUES ('3', null, 'Laba Ditahan / Retained Earnings', null, null, null);
INSERT INTO "linkedacc" VALUES ('4', null, 'Laba Periode Berjalan / Current Year Earnings', null, null, null);
INSERT INTO "linkedacc" VALUES ('5', null, 'Selisih Pembukuan / Historical Balancing', null, null, '0');
INSERT INTO "linkedacc" VALUES ('6', null, 'Akun penerimaan pendapatan', null, null, null);
INSERT INTO "linkedacc" VALUES ('7', null, 'Undeposited Funds', null, null, null);
INSERT INTO "linkedacc" VALUES ('8', null, 'Piutang Usaha / Tracking Receivables', 'Menampung piutang atas transaksi penjualan customer', null, '0');
INSERT INTO "linkedacc" VALUES ('9', null, 'Akun Penerimaan / Customer Receipts', 'penerimaan kas atas transaksi tunai', null, null);
INSERT INTO "linkedacc" VALUES ('10', null, 'Pendapatan Jasa Angkut', null, null, '0');
INSERT INTO "linkedacc" VALUES ('11', null, 'Pendapatan Diterima Dimuka', 'penerimaan uang muka', null, '0');
INSERT INTO "linkedacc" VALUES ('12', null, 'Potongan Penjualan', null, null, '0');
INSERT INTO "linkedacc" VALUES ('13', null, 'Pendapatan Bunga', 'mencatat denda keterlambatan atas pembayaran piutang', null, null);
INSERT INTO "linkedacc" VALUES ('14', null, 'Hutang Usaha / Tracking Payables', 'transaksi pembelian secara kredit', null, null);
INSERT INTO "linkedacc" VALUES ('15', null, 'Kas / Paying Bills', 'transaksi pembayaran tunai', '6', null);
INSERT INTO "linkedacc" VALUES ('16', null, 'Barang diterima dimuka / Item Receipts', 'Akun sementara untuk menampung barang-barang yang belum dilengkapi tagihan', null, '0');
INSERT INTO "linkedacc" VALUES ('17', null, 'Biaya Angkut Pembelian', null, null, null);
INSERT INTO "linkedacc" VALUES ('18', null, 'Uang Muka Pembelian', null, '22', null);
INSERT INTO "linkedacc" VALUES ('19', null, 'Potongan Pembelian', null, null, null);
INSERT INTO "linkedacc" VALUES ('20', null, 'Biaya Bunga Pembelian', null, null, '0');
INSERT INTO "linkedacc" VALUES ('21', null, 'Akun Pajak Penghasilan Badan Usaha', 'Pajak Penghasilan untuk Badan Usaha. Yaitu Pajak yang didapat dari penghasilan kotor dikurang biaya yang dikeluarkan', null, null);
INSERT INTO "linkedacc" VALUES ('22', null, 'PPH21', 'Akun yang menampung beban pajak PPH21 Karyawan', null, null);
INSERT INTO "linkedacc" VALUES ('23', null, 'Hutang PPH21', 'Akun yang mencatat hutang beban pajak PPH21 Karyawan', null, '0');
COMMIT;

-- ----------------------------
--  Table structure for credittterm
-- ----------------------------
DROP TABLE IF EXISTS "credittterm";
CREATE TABLE "credittterm" (
	"idcreditterm" int8 NOT NULL,
	"namecredit" varchar(50) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "credittterm" OWNER TO "imm";

-- ----------------------------
--  Table structure for unit_item
-- ----------------------------
DROP TABLE IF EXISTS "unit_item";
CREATE TABLE "unit_item" (
	"unit_item_id" int4 NOT NULL,
	"unit_name" varchar(120) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "unit_item" OWNER TO "imm";

-- ----------------------------
--  Records of unit_item
-- ----------------------------
BEGIN;
INSERT INTO "unit_item" VALUES ('1', 'Cm');
INSERT INTO "unit_item" VALUES ('2', 'Mm');
COMMIT;

-- ----------------------------
--  Table structure for tmppurchase
-- ----------------------------
DROP TABLE IF EXISTS "tmppurchase";
CREATE TABLE "tmppurchase" (
	"idinventory" int4,
	"total" float4,
	"idunit" int4 NOT NULL,
	"datein" timestamp(6) NULL,
	"assetaccount" int4 NOT NULL,
	"userin" varchar NOT NULL COLLATE "default",
	"idjournal" int4 NOT NULL,
	"idtax" int4,
	"tax" float4
)
WITH (OIDS=FALSE);
ALTER TABLE "tmppurchase" OWNER TO "imm";

-- ----------------------------
--  Records of tmppurchase
-- ----------------------------
BEGIN;
INSERT INTO "tmppurchase" VALUES ('28', '500000', '9', '2015-04-16 19:04:11', '20', 'adminsmk', '365', null, null);
INSERT INTO "tmppurchase" VALUES ('28', '500000', '9', '2015-04-20 04:04:33', '25', 'adminsmk', '383', '1', '50000');
INSERT INTO "tmppurchase" VALUES ('28', '500000', '12', '2015-09-07 10:09:44', '25', 'adminsmk', '409', '2', '0');
COMMIT;

-- ----------------------------
--  Table structure for bank
-- ----------------------------
DROP TABLE IF EXISTS "bank";
CREATE TABLE "bank" (
	"bank_id" int4 NOT NULL,
	"bank_name" varchar(150) COLLATE "default",
	"branch_name" varchar(225) COLLATE "default",
	"address" varchar(225) COLLATE "default",
	"account_number" varchar(150) COLLATE "default",
	"account_name" varchar(100) COLLATE "default",
	"idunit" int4,
	"display" int2vector,
	"userin" int4,
	"datein" timestamp(6) NULL,
	"usermod" int4,
	"datemod" timestamp(6) NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "bank" OWNER TO "imm";

-- ----------------------------
--  Records of bank
-- ----------------------------
BEGIN;
INSERT INTO "bank" VALUES ('1', '1', '1', '1', '1', '1', '12', null, '11', '2017-03-09 10:03:58', '11', '2017-03-09 10:03:58');
COMMIT;

-- ----------------------------
--  Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS "sys_menu";
CREATE TABLE "sys_menu" (
	"sys_menu_id" int4 NOT NULL DEFAULT nextval('seq_sys_menu'::regclass),
	"menu_name" varchar(200) COLLATE "default",
	"menu_link" varchar(225) COLLATE "default",
	"parent" int4,
	"sort" int4,
	"status" int4,
	"icon" varchar(100) COLLATE "default",
	"display" int4,
	"description" varchar(225) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "sys_menu" OWNER TO "imm";

-- ----------------------------
--  Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO "sys_menu" VALUES ('1', 'Pengaturan', 'settings', '0', '10', null, null, '1', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('3', 'Data Perusahaan', 'TabSetupCompany', '2', '1', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('4', 'Link Akun', 'Gridlinkedacc', '2', '3', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('6', 'Daftar Inventory', 'TabInventory', '2', '6', null, null, '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('7', 'Daftar Akun', 'GridTreeAcc2', '2', '2', null, null, '1', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('9', 'Daftar Akun', 'GridTreeAcc2', '8', '1', null, null, '1', 'Menampilkan daftar akun, membuat, merubah dan menghapus akun', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('10', 'Link Akun', 'Gridlinkedacc', '8', '2', null, null, '1', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('12', 'Input Jurnal', 'CellEditing', '11', '1', null, null, '1', 'Mencatat transaksi-transaksi yang tidak berhubungan dengan Bank, penjualan maupun pembelian.', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('13', 'Transaksi Berulang', 'MainView', '11', '3', null, null, '1', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('14', 'Daftar Jurnal', 'GridJGeneral', '11', '2', null, null, '1', 'Daftar jurnal transaksi yang telah di entry', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('16', 'Input Pembelian', 'EntryPurchase', '15', '1', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('17', 'Pembelian Berulang', null, '15', '2', null, null, '1', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('18', 'Daftar Transaksi', 'TabTransPurchase', '15', '3', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('20', 'Input Inventory', 'inputInventory', '19', null, null, null, '1', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('21', 'Daftar Inventory', 'TabInventory', '19', null, null, null, '1', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('22', 'Penyesuaian ', 'TabInventoryAdj', '19', null, null, null, '0', 'Modul untuk mencocokan jumlah fisik persediaan dengan catatan yang ada pada sistem.', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('23', 'Daftar Konsumen', 'GridcustomerGrid', '0', '4', null, 'konsumen', '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('25', 'Daftar Pegawai', 'PortPegawai', '79', '1', null, 'karyawan', null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('28', 'Akun', null, '27', '16', null, null, '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('29', 'Daftar Akun', 'reportDaftarAkun', '27', '15', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('30', 'Sales', null, '27', '14', null, null, '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('31', 'Sales Tax', null, '27', '13', null, null, '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('32', 'Barang Dibeli', 'reportBarangDibeli', '27', '12', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('33', 'Inventory', '', '27', '11', null, null, '1', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('35', 'Jurnal Umum', 'reportJurnalUmum', '27', '6', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('36', 'Daftar Persediaan', 'reportDaftarBarang', '27', '10', null, null, '1', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('37', 'Neraca Saldo', 'reportNeracaSaldo', '27', '8', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('38', 'Neraca', 'reportNeraca', '27', '4', null, '', null, '', null, 'adminsmk', null, '2015-05-04 01:05:20');
INSERT INTO "sys_menu" VALUES ('39', 'Laba/Rugi', 'reportLabaRugi', '27', '8', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('40', 'Buku Besar', 'reportGeneralLedger', '27', '7', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('41', 'Jurnal Kas Keluar', 'reportKasKeluar', '27', '4', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('42', 'Jurnal Kas Masuk', 'reportKasMasuk', '27', '5', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('43', 'Arus Kas', 'reportArusKas', '27', '9', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('44', 'Penjualan', null, '0', '9', null, 'jual', '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('45', 'Point of Sales', null, '44', null, null, null, '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('46', 'Input Penjualan', null, '44', null, null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('47', 'Retur Pembelian', 'TabReturn', '15', '2', null, null, '0', 'Return Pembelian', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('48', 'Retur Penjualan', null, '44', null, null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('49', 'Penjualan Berulang', null, '44', null, null, null, '1', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('50', 'Penerimaan Piutang', null, '44', null, null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('52', 'Customer Relationship', null, '0', '7', null, 'crm', '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('53', 'Sistem', null, '0', '14', null, 'pengaturan', null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('54', 'Pengelolaan User', 'GridUserManagement', '53', null, null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('55', 'Pengaturan Menu', null, '53', null, null, null, '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('56', 'Backup dan Restore', null, '53', null, null, null, '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('58', 'Penerimaan Kas', 'TabReceiveMoney', '57', '1', null, null, null, 'Mencatat transaksi yang tidak berhubungan dengan penjualan maupun penerimaan piutang. Seperti transaksi penyetoran dana ke bank, penambahan modal, penerimaan pinjaman dan lain-lain', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('59', 'Pengeluaran Kas', 'TabSpendMoney', '57', '4', null, null, null, 'Mencatat transaksi pengeluaran uang perusahaan yang tidak berhubungan dengan hutang usaha. Seperti transaksi pembelian aktiva tetap, pembayaran gaji pegawai, dan lain-lain.', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('60', 'Rekonsiliasi Bank', 'TabReconcile', '57', '7', null, null, null, 'Rekonsiliasi akun berguna untuk membuat penyesuaian saldo kas perusahaan yang ada di bank dan catatan perusahaan', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('61', 'Import Penerimaan Kas', 'TabImportReceiveMoney', '57', '2', null, null, null, 'Import file xlx yang berisi transaksi yang tidak berhubungan dengan penjualan maupun penerimaan piutang. Seperti transaksi penyetoran dana ke bank, penambahan modal, penerimaan pinjaman dan lain-lain', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('62', 'Import Pengeluaran Kas', 'TabImportSpendMoney', '57', '5', null, null, null, 'Import file xlsx  transaksi pengeluaran uang perusahaan yang tidak berhubungan dengan hutang usaha. Seperti transaksi pembelian aktiva tetap, pembayaran gaji pegawai, dan lain-lain.', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('64', 'Akhir Bulan', 'clossingFormMonth', '63', null, null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('65', 'Akhir Tahun', 'clossingFormYear', '63', null, null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('66', 'Saldo Awal Akun', 'EntryOpeningBalance', '2', '4', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('67', 'Penggajian', null, '0', '9', null, 'sallary-icon', '1', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('68', 'Proses Gaji', 'PortProsesGaji', '79', '2', null, 'sallary-icon', null, 'Memproses Gaji Karyawan', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('69', 'Data Penggajian', 'PortPayrollData', '79', '3', null, null, null, 'Melihat data penggajian, mencetak slip gaji, menghapus penggajian', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('70', 'Hapus Gaji', null, '67', '3', null, null, '0', 'Menghapus gaji karyawan yang telah di hasilkan menu Proses Gaji', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('73', 'Link Piutang', 'GridlinkedaccPiutang', '2', '8', null, null, '0', 'Menghubungkan akun piutang dengan akun penerimaan', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('74', 'Daftar Piutang', 'GridregPiutang', '82', '3', null, null, null, 'Pendaftaran Piutang pada awal pembukuan atau awal periode akuntansi', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('75', 'Penggajian', null, '2', '7', null, null, '0', 'Mengatur jumlah pembayaran gaji per jenis karyawan dan jenis pembayaran', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('77', 'Daftar Hutang', 'TabHutang', '82', null, null, null, null, 'Pendaftaran atau pembuatan hutang', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('78', 'Proses THR', 'PortProsesThr', '79', '4', null, null, null, 'Proses THR', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('83', 'Rekap Pembayaran Gaji', 'rekapGaji', '34', null, null, '', null, 'Rekap pembayaran gaji yan telah diproses', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('84', 'Rekap Premi Karyawan', 'RekapPremiKaryawan', '34', null, null, '', null, 'Rekap premi asuransi yang dibebankan kepada karyawan', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('85', 'Rekap Premi Perusahaan', 'RekapPremiPerusahaan', '34', null, null, '', null, 'Rekap premi asuransi yang ditanggung kepada perusahaan', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('86', 'Rekap PPH21', 'RekapPPH21', '34', null, null, '', null, 'Rekap Penghitungan PPH21', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('87', 'Rekap Pembayaran THR', 'RekapTHR', '34', null, null, '', null, 'Rekap Pembayaran THR', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('24', 'Data Supplier', 'GridsupplierGrid', '0', '5', null, 'suplier', '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('15', 'Purchasing', '', '0', '7', null, 'beli', null, '', null, 'staff', null, '2017-03-08 19:03:54');
INSERT INTO "sys_menu" VALUES ('5', 'Taxation', 'GridSetupTax', '127', '9', null, '', null, '', null, '11', null, '2017-03-09 09:03:07');
INSERT INTO "sys_menu" VALUES ('57', 'Accounting', '', '0', '11', null, 'bank', null, '', null, '11', null, '2017-03-09 09:03:48');
INSERT INTO "sys_menu" VALUES ('27', 'Reporting', '', '0', '13', null, 'laporan', null, '', null, '11', null, '2017-03-09 09:03:16');
INSERT INTO "sys_menu" VALUES ('11', 'Jurnal', 'GridJGeneral', '57', '11', null, 'jurnal', null, '', null, '11', null, '2017-03-09 09:03:17');
INSERT INTO "sys_menu" VALUES ('63', 'Close Book', '', '0', '12', null, 'report_key', null, '', null, '11', null, '2017-03-09 09:03:16');
INSERT INTO "sys_menu" VALUES ('82', 'Hutang dan Piutang', null, '0', '10', null, 'hutangpiutang', '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('19', 'Inventory', 'TabInventory', '0', '10', null, 'inventory', null, 'Mengelola Persediaan', null, '11', null, '2017-03-09 09:03:43');
INSERT INTO "sys_menu" VALUES ('88', 'Rekap Potongan Karyawan', 'RekapPotonganKaryawan', '34', null, null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('89', 'Rekap Tunjangan Karyawan', 'RekapTunjanganKaryawan', '34', null, null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('90', 'Transfer Kas', 'TabTransferMoney', '57', '6', null, null, null, 'Mentransfer atau memindahkan saldo ke akun kas/bank lain', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('91', 'Data THR', 'GridDataTHR', '79', '5', null, null, null, 'Data hasil proses THR', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('92', 'Input Persediaan Awal', 'input_persediaan_awal', '2', '7', null, null, null, 'Input Persediaan Awal', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('93', 'Saldo Awal Hutang', 'OpeningHutangPanel', '2', '5', null, null, null, 'Saldo Awal Hutang', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('94', 'Saldo Awal Piutang', 'OpeningPiutangPanel', '2', '6', null, null, null, 'Input Saldo Awal Piutang', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('96', 'Saldo Awal Persediaan', 'OpeningPersediaanPanel', '2', '7', null, null, null, 'Input Saldo Awal Persediaan', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('97', 'Referensi', null, '2', '10', null, null, null, 'Mengelola data-data master seperti jenis tunjangna, potongan dan lain-lain', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('101', 'Kategori Persediaan', 'GridRefInventoryCat', '97', '3', null, null, null, null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('102', 'Menu Aplikasi', 'GridTreeSysMenu', '53', '2', null, null, null, 'Pengaturan menu aplikasi', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('116', 'Kelompok User', 'GridSysGroup', '53', '3', null, '', null, 'Pengalolaan Kelomok User dan Modul Aksesnya', 'administrator', 'administrator', '2015-05-03 12:05:00', '2015-05-03 12:05:00');
INSERT INTO "sys_menu" VALUES ('118', 'Penerimaan Tahunan', 'reportPenerimaanTahun', '27', '1', null, '', null, 'Rekapitulasi Penerimaan Tahunan', 'adminsmk', 'adminsmk', '2015-05-03 19:05:15', '2015-05-03 21:05:47');
INSERT INTO "sys_menu" VALUES ('119', 'Pengeluaran Tahunan', 'reportPengeluaranTahun', '27', '3', null, '', null, 'Rekapitulasi Pengeluaran Tahunan', 'adminsmk', 'adminsmk', '2015-05-04 01:05:04', '2015-05-04 01:05:04');
INSERT INTO "sys_menu" VALUES ('26', 'Data Siswa', 'PortSiswa', '0', '4', null, 'siswa', '1', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('71', 'Penerimaan Siswa', 'TabReceiveMoneySiswa', '57', '3', null, null, '1', 'Mencatat penerimaan dari siswa seperti pembayaran spp, daftar ulang, uang praktek dan lain-lain', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('117', 'Penerimaan Siswa', 'reportPenerimaanSiswaBulan', '27', '2', null, '', '1', 'Laporan Penerimaan Siswa Bulanan', 'adminsmk', 'adminsmk', '2015-05-03 17:05:31', '2015-05-03 19:05:21');
INSERT INTO "sys_menu" VALUES ('79', 'Kepegawaian', null, '0', '3', null, 'karyawan', '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('100', 'Jenis Potongan', 'GridRefPotonganType', '97', '3', null, null, '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('76', 'Asuransi', 'Gridinsuranceacc', '2', '10', null, null, '0', 'Pengaturan premi asuransi yang dibebankan kepada karyawan dan yang ditanggung perusahaan', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('72', 'Jabatan Pegawai', 'GridEmployeeType', '2', '8', null, null, '0', 'Melihat, mengubah dan menghapus data jenis pegawai dengan pengelompokan akun pembayaran gaji dari tiap jenis pegawai.', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('99', 'Jenis Tunjangan', 'GridRefTunjanganType', '97', '2', null, null, '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('34', 'Penggajian', 'reportPenggajian', '27', '10', null, null, '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('120', 'Jenis PTKP', 'GridRefJenisPtkp', '97', null, null, null, '0', 'Data Referensi Nilai Penghasilan Tidak Kena Pajak (PTKP)', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('98', 'Jenis Tambahan Gaji', 'GridRefTambahanGaji', '97', '1', null, null, '0', null, null, null, null, null);
INSERT INTO "sys_menu" VALUES ('143', 'Delivery Order', '', '139', '3', null, '', null, '', '11', '11', '2017-03-09 09:03:36', '2017-03-09 09:03:36');
INSERT INTO "sys_menu" VALUES ('144', 'Sales Invoice', '', '139', '4', null, '', null, '', '11', '11', '2017-03-09 09:03:49', '2017-03-09 09:03:49');
INSERT INTO "sys_menu" VALUES ('145', 'Sales Return', '', '139', '5', null, '', null, '', '11', '11', '2017-03-09 09:03:13', '2017-03-09 09:03:13');
INSERT INTO "sys_menu" VALUES ('133', 'Requesition', '', '15', '1', null, '', null, '', 'staff', 'staff', '2017-03-08 19:03:13', '2017-03-08 19:03:30');
INSERT INTO "sys_menu" VALUES ('146', 'AR Credit Memo', '', '139', '6', null, '', null, '', '11', '11', '2017-03-09 09:03:25', '2017-03-09 09:03:25');
INSERT INTO "sys_menu" VALUES ('134', 'Purchase Order', '', '15', '2', null, '', null, '', 'staff', 'staff', '2017-03-08 19:03:26', '2017-03-08 19:03:53');
INSERT INTO "sys_menu" VALUES ('135', 'Goods Receive', '', '15', '3', null, '', null, '', 'staff', 'staff', '2017-03-08 19:03:39', '2017-03-08 19:03:06');
INSERT INTO "sys_menu" VALUES ('136', 'Invoice', '', '15', '4', null, '', null, '', 'staff', 'staff', '2017-03-08 19:03:50', '2017-03-08 19:03:14');
INSERT INTO "sys_menu" VALUES ('137', 'Return', '', '15', '5', null, '', null, '', 'staff', 'staff', '2017-03-08 19:03:55', '2017-03-08 19:03:24');
INSERT INTO "sys_menu" VALUES ('138', 'AP Credit Memo', '', '15', '6', null, '', null, '', 'staff', 'staff', '2017-03-08 19:03:07', '2017-03-08 19:03:33');
INSERT INTO "sys_menu" VALUES ('147', 'Job Order', '', '140', '1', null, '', null, '', '11', '11', '2017-03-09 09:03:12', '2017-03-09 09:03:12');
INSERT INTO "sys_menu" VALUES ('130', 'Production', 'TabMasterProduction', '127', '1', null, '', null, '', 'staff', '11', '2017-03-08 19:03:23', '2017-03-09 08:03:17');
INSERT INTO "sys_menu" VALUES ('148', 'Production Schedule', '', '140', '2', null, '', null, '', '11', '11', '2017-03-09 09:03:24', '2017-03-09 09:03:24');
INSERT INTO "sys_menu" VALUES ('149', 'Material Ussage', '', '140', '3', null, '', null, '', '11', '11', '2017-03-09 09:03:39', '2017-03-09 09:03:39');
INSERT INTO "sys_menu" VALUES ('8', 'Akun Perkiraan', 'GridTreeAcc2', '0', '3', null, 'akun', '0', 'Menampilkan daftar akun, membuat, merubah dan menghapus akun', null, 'staff', null, '2017-03-08 19:03:30');
INSERT INTO "sys_menu" VALUES ('132', 'Accounting', 'TabMasterFinancial', '127', '1', null, 'akun', null, '', 'staff', '11', '2017-03-08 19:03:59', '2017-03-09 09:03:45');
INSERT INTO "sys_menu" VALUES ('150', 'Receipt From Production', '', '140', '4', null, '', null, '', '11', '11', '2017-03-09 09:03:52', '2017-03-09 09:03:52');
INSERT INTO "sys_menu" VALUES ('129', 'Supplier', 'TabMasterSupplier', '127', '1', null, 'suplier', null, '', 'staff', '11', '2017-03-08 19:03:13', '2017-03-09 09:03:37');
INSERT INTO "sys_menu" VALUES ('128', 'Customer', 'TabMasterCustomer', '127', '1', null, 'pelanggan', null, '', 'staff', '11', '2017-03-08 19:03:07', '2017-03-09 09:03:32');
INSERT INTO "sys_menu" VALUES ('95', 'Data Pelanggan', 'gridPelanggan', '0', '6', null, 'pelanggan', '0', 'Menambah, mengubah dan menghapus pelanggan', null, null, null, null);
INSERT INTO "sys_menu" VALUES ('2', 'Setup', '', '0', '1', null, 'setup', null, 'Pengaturan-pengaturan yang harus di lakukan pada saat awal memulai aplikasi', null, '11', null, '2017-03-09 09:03:25');
INSERT INTO "sys_menu" VALUES ('141', 'Sales Quotation', '', '139', '1', null, '', null, '', '11', '11', '2017-03-09 09:03:12', '2017-03-09 09:03:12');
INSERT INTO "sys_menu" VALUES ('142', 'Sales Order', '', '139', '2', null, '', null, '', '11', '11', '2017-03-09 09:03:24', '2017-03-09 09:03:24');
INSERT INTO "sys_menu" VALUES ('139', 'Sales', '', '0', '8', null, 'sales', null, '', '11', '11', '2017-03-09 09:03:06', '2017-03-09 10:03:24');
INSERT INTO "sys_menu" VALUES ('140', 'Production', '', '0', '9', null, 'production', null, '', '11', '11', '2017-03-09 09:03:31', '2017-03-09 10:03:00');
INSERT INTO "sys_menu" VALUES ('127', 'Master Data', '', '0', '2', null, 'master', null, '', 'staff', '11', '2017-03-08 19:03:22', '2017-03-09 10:03:05');
INSERT INTO "sys_menu" VALUES ('131', 'Inventory Setup', 'TabMasterInventory', '127', '1', null, '', null, '', 'staff', '11', '2017-03-08 19:03:39', '2017-03-09 17:03:06');
COMMIT;

-- ----------------------------
--  Table structure for tmptax
-- ----------------------------
DROP TABLE IF EXISTS "tmptax";
CREATE TABLE "tmptax" (
	"idtax" int4 NOT NULL,
	"tax" float4,
	"idjournal" int4 NOT NULL,
	"idunit" int4 NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "tmptax" OWNER TO "imm";

-- ----------------------------
--  Table structure for scheduletype
-- ----------------------------
DROP TABLE IF EXISTS "scheduletype";
CREATE TABLE "scheduletype" (
	"idscheduletype" int8 NOT NULL,
	"schname" varchar(50) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "scheduletype" OWNER TO "imm";

-- ----------------------------
--  Records of scheduletype
-- ----------------------------
BEGIN;
INSERT INTO "scheduletype" VALUES ('1', 'Terus Menerus');
INSERT INTO "scheduletype" VALUES ('2', 'Jalankan sampai #');
COMMIT;

-- ----------------------------
--  Table structure for linkpiutang
-- ----------------------------
DROP TABLE IF EXISTS "linkpiutang";
CREATE TABLE "linkpiutang" (
	"idlinkpiutang" int4 NOT NULL DEFAULT nextval('seq_linkpiutang'::regclass),
	"idaccountpiutang" int4,
	"idaccount" int4,
	"description" varchar(225) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"display" int4,
	"idunit" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "linkpiutang" OWNER TO "imm";

-- ----------------------------
--  Records of linkpiutang
-- ----------------------------
BEGIN;
INSERT INTO "linkpiutang" VALUES ('3', '708', '684', '---', 'admin', 'admin', '2014-12-01 15:12:16', '2014-12-08 11:12:39', null, '2');
COMMIT;

-- ----------------------------
--  Table structure for month
-- ----------------------------
DROP TABLE IF EXISTS "month";
CREATE TABLE "month" (
	"idmonth" int4 NOT NULL,
	"monthname" varchar(30) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "month" OWNER TO "imm";

-- ----------------------------
--  Table structure for potongantype
-- ----------------------------
DROP TABLE IF EXISTS "potongantype";
CREATE TABLE "potongantype" (
	"idpotongantype" int4 NOT NULL DEFAULT nextval('seq_master'::regclass),
	"namepotongan" varchar(50) COLLATE "default",
	"descpotongan" varchar(50) COLLATE "default",
	"jenispotongan" varchar COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"display" int4,
	"idcompany" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "potongantype" OWNER TO "imm";

-- ----------------------------
--  Records of potongantype
-- ----------------------------
BEGIN;
INSERT INTO "potongantype" VALUES ('1', 'Iuran Keagamaan', 'Iuran Keagamaan', 'Potongan', null, null, null, null, null, '1');
INSERT INTO "potongantype" VALUES ('2', 'Pinjaman Pegawai', 'Pinjaman Pegawai', 'Pinjaman', null, null, null, null, null, '1');
INSERT INTO "potongantype" VALUES ('3', 'Jamsostek', null, 'Potongan', null, null, null, null, null, '1');
INSERT INTO "potongantype" VALUES ('4', 'Goro', null, 'Potongan', null, null, null, null, null, '1');
INSERT INTO "potongantype" VALUES ('5', 'Potongan THR', null, 'Potongan', null, null, null, null, null, '1');
INSERT INTO "potongantype" VALUES ('51', 'dsad', 'dsad', 'Potongan', 'administrator', 'administrator', '2015-05-19 15:05:25', '2015-05-19 15:05:33', '0', '1');
COMMIT;

-- ----------------------------
--  Table structure for prosesgaji_tmp
-- ----------------------------
DROP TABLE IF EXISTS "prosesgaji_tmp";
CREATE TABLE "prosesgaji_tmp" (
	"idemployee" int4,
	"jumlah" float8,
	"userin" int4,
	"idaccountpayroll" int4,
	"idaccountkas" int4,
	"idunit" int4,
	"accnumberpayroll" varchar(30) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "prosesgaji_tmp" OWNER TO "imm";

COMMENT ON COLUMN "prosesgaji_tmp"."jumlah" IS 'tabel temporary untuk penyimpanan hasil proses gaji yang selanjutnya disimpan ke dalam jurnal
';

-- ----------------------------
--  Table structure for clossing
-- ----------------------------
DROP TABLE IF EXISTS "clossing";
CREATE TABLE "clossing" (
	"idclossing" int4 NOT NULL DEFAULT nextval('seq_clossing'::regclass),
	"idaccounttype" int8,
	"idaccount" int8 NOT NULL,
	"idclassificationcf" int4,
	"idlinked" int4,
	"idparent" int8,
	"accnumber" varchar(30) COLLATE "default",
	"accname" varchar(100) COLLATE "default",
	"balance" float8,
	"display" int2,
	"description" varchar(224) COLLATE "default",
	"userin" varchar(30) COLLATE "default",
	"usermod" varchar(30) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"active" bool,
	"idunit" int4,
	"idaccounttmp" int4,
	"month" varchar(2) COLLATE "default",
	"year" int4,
	"dateclose" date,
	"idpos" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "clossing" OWNER TO "imm";

-- ----------------------------
--  Table structure for linkedaccunit
-- ----------------------------
DROP TABLE IF EXISTS "linkedaccunit";
CREATE TABLE "linkedaccunit" (
	"idlinked" int4 NOT NULL,
	"idaccount" int4,
	"idunit" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "linkedaccunit" OWNER TO "imm";

-- ----------------------------
--  Records of linkedaccunit
-- ----------------------------
BEGIN;
INSERT INTO "linkedaccunit" VALUES ('1', null, '13');
INSERT INTO "linkedaccunit" VALUES ('1', null, '15');
INSERT INTO "linkedaccunit" VALUES ('2', null, '13');
INSERT INTO "linkedaccunit" VALUES ('2', null, '15');
INSERT INTO "linkedaccunit" VALUES ('3', '42', '9');
INSERT INTO "linkedaccunit" VALUES ('3', '42', '13');
INSERT INTO "linkedaccunit" VALUES ('3', '42', '14');
INSERT INTO "linkedaccunit" VALUES ('3', null, '13');
INSERT INTO "linkedaccunit" VALUES ('3', null, '15');
INSERT INTO "linkedaccunit" VALUES ('4', '43', '9');
INSERT INTO "linkedaccunit" VALUES ('4', '43', '13');
INSERT INTO "linkedaccunit" VALUES ('4', '43', '14');
INSERT INTO "linkedaccunit" VALUES ('4', null, '13');
INSERT INTO "linkedaccunit" VALUES ('4', null, '15');
INSERT INTO "linkedaccunit" VALUES ('5', null, '13');
INSERT INTO "linkedaccunit" VALUES ('5', null, '15');
INSERT INTO "linkedaccunit" VALUES ('6', null, '13');
INSERT INTO "linkedaccunit" VALUES ('6', null, '15');
INSERT INTO "linkedaccunit" VALUES ('7', null, '13');
INSERT INTO "linkedaccunit" VALUES ('7', null, '15');
INSERT INTO "linkedaccunit" VALUES ('8', null, '13');
INSERT INTO "linkedaccunit" VALUES ('8', null, '15');
INSERT INTO "linkedaccunit" VALUES ('9', null, '13');
INSERT INTO "linkedaccunit" VALUES ('9', null, '15');
INSERT INTO "linkedaccunit" VALUES ('10', null, '13');
INSERT INTO "linkedaccunit" VALUES ('10', null, '15');
INSERT INTO "linkedaccunit" VALUES ('11', null, '13');
INSERT INTO "linkedaccunit" VALUES ('11', null, '15');
INSERT INTO "linkedaccunit" VALUES ('12', null, '13');
INSERT INTO "linkedaccunit" VALUES ('12', null, '15');
INSERT INTO "linkedaccunit" VALUES ('13', null, '13');
INSERT INTO "linkedaccunit" VALUES ('13', null, '15');
INSERT INTO "linkedaccunit" VALUES ('14', '32', '9');
INSERT INTO "linkedaccunit" VALUES ('14', '32', '13');
INSERT INTO "linkedaccunit" VALUES ('14', '32', '14');
INSERT INTO "linkedaccunit" VALUES ('14', null, '13');
INSERT INTO "linkedaccunit" VALUES ('14', null, '15');
INSERT INTO "linkedaccunit" VALUES ('15', '6', '9');
INSERT INTO "linkedaccunit" VALUES ('15', '6', '13');
INSERT INTO "linkedaccunit" VALUES ('15', '6', '14');
INSERT INTO "linkedaccunit" VALUES ('15', null, '13');
INSERT INTO "linkedaccunit" VALUES ('15', null, '15');
INSERT INTO "linkedaccunit" VALUES ('16', null, '13');
INSERT INTO "linkedaccunit" VALUES ('16', null, '15');
INSERT INTO "linkedaccunit" VALUES ('17', '52', '9');
INSERT INTO "linkedaccunit" VALUES ('17', '52', '13');
INSERT INTO "linkedaccunit" VALUES ('17', '52', '14');
INSERT INTO "linkedaccunit" VALUES ('17', null, '13');
INSERT INTO "linkedaccunit" VALUES ('17', null, '15');
INSERT INTO "linkedaccunit" VALUES ('18', null, '13');
INSERT INTO "linkedaccunit" VALUES ('18', null, '15');
INSERT INTO "linkedaccunit" VALUES ('19', null, '13');
INSERT INTO "linkedaccunit" VALUES ('19', null, '15');
INSERT INTO "linkedaccunit" VALUES ('20', null, '13');
INSERT INTO "linkedaccunit" VALUES ('20', null, '15');
INSERT INTO "linkedaccunit" VALUES ('21', null, '13');
INSERT INTO "linkedaccunit" VALUES ('21', null, '15');
INSERT INTO "linkedaccunit" VALUES ('22', '717', '9');
INSERT INTO "linkedaccunit" VALUES ('22', '717', '13');
INSERT INTO "linkedaccunit" VALUES ('22', '717', '14');
INSERT INTO "linkedaccunit" VALUES ('22', null, '13');
INSERT INTO "linkedaccunit" VALUES ('22', null, '15');
INSERT INTO "linkedaccunit" VALUES ('23', null, '13');
INSERT INTO "linkedaccunit" VALUES ('23', null, '15');
COMMIT;

-- ----------------------------
--  Table structure for journaltype
-- ----------------------------
DROP TABLE IF EXISTS "journaltype";
CREATE TABLE "journaltype" (
	"idjournaltype" int8 NOT NULL,
	"namejournal" varchar(20) COLLATE "default",
	"description" varchar(225) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "journaltype" OWNER TO "imm";

-- ----------------------------
--  Records of journaltype
-- ----------------------------
BEGIN;
INSERT INTO "journaltype" VALUES ('1', 'Umum', 'Umum');
INSERT INTO "journaltype" VALUES ('2', 'Pembayaran', null);
INSERT INTO "journaltype" VALUES ('3', 'Penjualan', null);
INSERT INTO "journaltype" VALUES ('4', 'Pembelian', null);
INSERT INTO "journaltype" VALUES ('5', 'Persediaan', null);
INSERT INTO "journaltype" VALUES ('6', 'Kas Masuk', null);
INSERT INTO "journaltype" VALUES ('7', 'Kas Keluar', null);
INSERT INTO "journaltype" VALUES ('8', 'Pendapatan', null);
INSERT INTO "journaltype" VALUES ('9', 'Hutang', null);
INSERT INTO "journaltype" VALUES ('10', 'Piutang', null);
COMMIT;

-- ----------------------------
--  Table structure for spendmoney
-- ----------------------------
DROP TABLE IF EXISTS "spendmoney";
CREATE TABLE "spendmoney" (
	"idspendmoney" int8 NOT NULL,
	"idtax" int4,
	"idjournal" int8,
	"idaccount" int8,
	"totalpaid" float8,
	"tax" float8,
	"balance" float8,
	"display" int4,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"idunit" int4,
	"subtotal" float8,
	"notrans" varchar(20) COLLATE "default",
	"datetrans" date,
	"memo" varchar(225) COLLATE "default",
	"month" varchar(2) COLLATE "default",
	"year" int4,
	"spendfrom" varchar(50) COLLATE "default",
	"idimport" int4,
	"depositaccount" int4,
	"total" float8
)
WITH (OIDS=FALSE);
ALTER TABLE "spendmoney" OWNER TO "imm";

-- ----------------------------
--  Table structure for supplier
-- ----------------------------
DROP TABLE IF EXISTS "supplier";
CREATE TABLE "supplier" (
	"idsupplier" int8 NOT NULL,
	"idpayment" int8,
	"idshipping" int8,
	"code" varchar(50) COLLATE "default",
	"namesupplier" varchar(50) COLLATE "default",
	"companyaddress" text COLLATE "default",
	"companyaddress2" text COLLATE "default",
	"companyaddress3" text COLLATE "default",
	"companyaddress4" text COLLATE "default",
	"shipaddress" varchar(225) COLLATE "default",
	"billaddress" varchar(225) COLLATE "default",
	"telephone" varchar(30) COLLATE "default",
	"handphone" varchar(30) COLLATE "default",
	"fax" varchar(30) COLLATE "default",
	"email" varchar(30) COLLATE "default",
	"website" varchar(30) COLLATE "default",
	"city" varchar(50) COLLATE "default",
	"state" varchar(50) COLLATE "default",
	"postcode" varchar(10) COLLATE "default",
	"country" varchar(15) COLLATE "default",
	"highestpo" float8,
	"avgdaypay" int4,
	"lastpayment" timestamp(6) NULL,
	"lastpurchase" float8,
	"expenseaccount" int8,
	"notes" varchar(225) COLLATE "default",
	"display" int2,
	"userin" varchar(30) COLLATE "default",
	"usermod" varchar(30) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"idcompany" int4,
	"supplier_type_id" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "supplier" OWNER TO "imm";

-- ----------------------------
--  Records of supplier
-- ----------------------------
BEGIN;
INSERT INTO "supplier" VALUES ('21', null, null, '1', '21', '21', '0', '0', null, '21', '0', '21', '212', '2', '12', '1', '312', '213', '13', '12312', null, null, null, null, null, '31', null, '11', '11', '2017-03-09 10:03:34', '2017-03-09 10:03:36', null, '1');
COMMIT;

-- ----------------------------
--  Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS "customer";
CREATE TABLE "customer" (
	"idcustomer" int8 NOT NULL DEFAULT nextval('seq_customer'::regclass),
	"idcustomertype" int4,
	"idpayment" int8,
	"nocustomer" varchar(50) COLLATE "default",
	"namecustomer" varchar(50) COLLATE "default",
	"address" varchar(225) COLLATE "default",
	"shipaddress" varchar(225) COLLATE "default",
	"billaddress" varchar(225) COLLATE "default",
	"telephone" varchar(20) COLLATE "default",
	"handphone" varchar(20) COLLATE "default",
	"fax" varchar(20) COLLATE "default",
	"email" varchar(20) COLLATE "default",
	"website" varchar(20) COLLATE "default",
	"city" varchar(50) COLLATE "default",
	"state" varchar(50) COLLATE "default",
	"postcode" varchar(10) COLLATE "default",
	"country" varchar(15) COLLATE "default",
	"highestpayment" float8,
	"avgdaypayment" int4,
	"lastpayment" timestamp(6) NULL,
	"lastsales" float8,
	"incomeaccount" int8,
	"notes" varchar(225) COLLATE "default",
	"display" int2,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "customer" OWNER TO "imm";

-- ----------------------------
--  Records of customer
-- ----------------------------
BEGIN;
INSERT INTO "customer" VALUES ('8', '1', null, '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', null, null, null, null, null, '1', null, '11', '11', '2017-03-09 08:03:33', '2017-03-09 08:03:33');
COMMIT;

-- ----------------------------
--  Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS "sys_user";
CREATE TABLE "sys_user" (
	"user_id" int4 NOT NULL DEFAULT nextval('seq_user_id'::regclass),
	"username" varchar(20) COLLATE "default",
	"password" varchar(224) COLLATE "default",
	"email" varchar(20) COLLATE "default",
	"laslogin" timestamp(6) NULL,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"group_id" int4,
	"realname" varchar(30) COLLATE "default",
	"idunitbak" int4,
	"iduserparent" int4,
	"display" int4,
	"clientid" int4,
	"idcompany" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "sys_user" OWNER TO "imm";

-- ----------------------------
--  Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO "sys_user" VALUES ('1', 'admin', 'admin', 'admin@admin.com', '2015-04-26 17:04:28', null, 'admin', null, '2014-05-22 07:05:19', '99', 'Super User', null, null, null, null, null);
INSERT INTO "sys_user" VALUES ('7', 'administrator', 'administrator', 'wimarasih', '2017-02-06 14:02:01', null, 'administrator', null, '2015-05-07 08:05:43', '1', '', null, null, null, '1', '1');
INSERT INTO "sys_user" VALUES ('11', 'staff', 'staff', 'info@senusa.co.id', '2017-03-09 08:03:20', 'administrator', 'administrator', '2015-03-21 21:03:06', '2017-01-26 04:01:39', '2', '', null, null, null, null, '1');
COMMIT;

-- ----------------------------
--  Table structure for alerttype
-- ----------------------------
DROP TABLE IF EXISTS "alerttype";
CREATE TABLE "alerttype" (
	"idalerttype" int4 NOT NULL,
	"alertname" varchar(100) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "alerttype" OWNER TO "imm";

-- ----------------------------
--  Records of alerttype
-- ----------------------------
BEGIN;
INSERT INTO "alerttype" VALUES ('1', 'Ingatkan kepada Untuk menjalakan transaksi jurnal');
INSERT INTO "alerttype" VALUES ('2', 'Jalankan transaksi jurnal ini secara otomatis dan beritahukan kepada');
COMMIT;

-- ----------------------------
--  Table structure for purchaseitem
-- ----------------------------
DROP TABLE IF EXISTS "purchaseitem";
CREATE TABLE "purchaseitem" (
	"idpurchaseitem" int8 NOT NULL DEFAULT nextval('seq_purchaseitem'::regclass),
	"idpurchase" int8,
	"idinventory" int8,
	"idtax" int4,
	"itemdesc" text COLLATE "default",
	"qty" int4,
	"received" int4,
	"backorder" int4,
	"price" float8,
	"disc" float8,
	"total" float8,
	"invno" varchar(20) COLLATE "default",
	"ratetax" float8,
	"tax" float4,
	"beforetax" float4
)
WITH (OIDS=FALSE);
ALTER TABLE "purchaseitem" OWNER TO "imm";

-- ----------------------------
--  Table structure for inventoryunit
-- ----------------------------
DROP TABLE IF EXISTS "inventoryunit";
CREATE TABLE "inventoryunit" (
	"idinventory" int4 NOT NULL,
	"idunit" int4 NOT NULL,
	"assetaccount" int4,
	"akumpenyusutaccount" int4,
	"depresiasiaccount" int4,
	"clossed" int4,
	"penyusutanberjalan" float8
)
WITH (OIDS=FALSE);
ALTER TABLE "inventoryunit" OWNER TO "imm";

-- ----------------------------
--  Table structure for return
-- ----------------------------
DROP TABLE IF EXISTS "return";
CREATE TABLE "return" (
	"idreturn" int8 NOT NULL DEFAULT nextval('seq_return'::regclass),
	"idsupplier" int8,
	"idaccount" int8,
	"idreturntype" int4,
	"noreturn" varchar(20) COLLATE "default",
	"date" date,
	"memo" varchar(225) COLLATE "default",
	"payee" varchar(225) COLLATE "default",
	"subtotal" float8,
	"taxreturn" float8,
	"freight" float8,
	"totalreturn" float8,
	"display" int4,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"tglkirim" date,
	"idunit" int4,
	"nopo" varchar(50) COLLATE "default",
	"note" text COLLATE "default",
	"idjournal" int4,
	"saldoterhutang" float4,
	"pembayaranberjalan" float4,
	"pengembaliandana" float4
)
WITH (OIDS=FALSE);
ALTER TABLE "return" OWNER TO "imm";

-- ----------------------------
--  Records of return
-- ----------------------------
BEGIN;
INSERT INTO "return" VALUES ('14', '13', '32', null, 'RET5900025', '2015-01-14', 'Return Pembelian', null, '500000', '0', null, '500000', null, 'adminsmk', 'adminsmk', '2015-04-17 10:04:37', '2015-04-17 10:04:37', '2015-01-07', '9', 'PO4900009', 'xxx', '368', '0', '600000', '600000');
COMMIT;

-- ----------------------------
--  Table structure for registrasihutang
-- ----------------------------
DROP TABLE IF EXISTS "registrasihutang";
CREATE TABLE "registrasihutang" (
	"idregistrasihutang" int4 NOT NULL DEFAULT nextval('seq_registrasihutang'::regclass),
	"idunit" int4,
	"idacchutang" int4,
	"idacckenahutang" int4,
	"jumlah" float8,
	"sisahutang" float8,
	"idjournal" int4,
	"memo" varchar(225) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"usermod" varchar(20) COLLATE "default",
	"display" int4,
	"month" varchar COLLATE "default",
	"year" int4,
	"mulaihutang" date,
	"jatuhtempo" date,
	"idsupplier" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "registrasihutang" OWNER TO "imm";

-- ----------------------------
--  Records of registrasihutang
-- ----------------------------
BEGIN;
INSERT INTO "registrasihutang" VALUES ('15', '12', '31', '754', '6000000', '6000000', '420', 'Hutang kepada wawan', 'staff', '2017-01-26 18:01:12', '2017-01-26 18:01:12', 'staff', null, null, null, '2016-11-16', '2017-01-31', '18');
COMMIT;

-- ----------------------------
--  Table structure for riwayatpembsiswa
-- ----------------------------
DROP TABLE IF EXISTS "riwayatpembsiswa";
CREATE TABLE "riwayatpembsiswa" (
	"idriwayatpemb" int4 NOT NULL DEFAULT nextval('seq_riwayatpembsiswa'::regclass),
	"idsiswa" int8,
	"bulan" varchar(2) COLLATE "default",
	"tahun" int4,
	"jatuhtempo" date,
	"tglbayar" date,
	"jumlahbayar" float8,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"idaccount" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "riwayatpembsiswa" OWNER TO "imm";

-- ----------------------------
--  Table structure for pelanggantype
-- ----------------------------
DROP TABLE IF EXISTS "pelanggantype";
CREATE TABLE "pelanggantype" (
	"idpelanggantype" int4 NOT NULL,
	"pelanggantype" varchar(50) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "pelanggantype" OWNER TO "imm";

-- ----------------------------
--  Records of pelanggantype
-- ----------------------------
BEGIN;
INSERT INTO "pelanggantype" VALUES ('1', 'Perorangan');
INSERT INTO "pelanggantype" VALUES ('2', 'Perusahaan');
COMMIT;

-- ----------------------------
--  Table structure for receivemoneyimport
-- ----------------------------
DROP TABLE IF EXISTS "receivemoneyimport";
CREATE TABLE "receivemoneyimport" (
	"idreceivemoneyimport" int4 NOT NULL DEFAULT nextval('seq_receivemoneyimport'::regclass),
	"filename" varchar(50) COLLATE "default",
	"totalamount" float8,
	"notrans" varchar(50) COLLATE "default",
	"datetrans" date,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"idunit" int4,
	"tipe" varchar(10) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "receivemoneyimport" OWNER TO "imm";

-- ----------------------------
--  Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS "company";
CREATE TABLE "company" (
	"idcompany" int8 NOT NULL,
	"idbussinestype" int8,
	"companyname" varchar(200) COLLATE "default",
	"companyaddress" text COLLATE "default",
	"companyaddress2" text COLLATE "default",
	"companyaddress3" text COLLATE "default",
	"companyaddress4" text COLLATE "default",
	"companyaddress5" text COLLATE "default",
	"telp" varchar(200) COLLATE "default",
	"fax" varchar(200) COLLATE "default",
	"email" varchar(200) COLLATE "default",
	"website" varchar(100) COLLATE "default",
	"country" varchar(100) COLLATE "default",
	"npwp" varchar(200) COLLATE "default",
	"userin" varchar(100) COLLATE "default",
	"usermod" varchar(100) COLLATE "default",
	"datein" time(6) WITH TIME ZONE,
	"datemod" timestamp(6) NULL,
	"display" int4,
	"curfinanceyear" int4,
	"lastmonthfinanceyear" varchar(2) COLLATE "default",
	"conversionmonth" varchar(2) COLLATE "default",
	"numaccperiod" int4,
	"logo" varchar(100) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "company" OWNER TO "imm";

-- ----------------------------
--  Records of company
-- ----------------------------
BEGIN;
INSERT INTO "company" VALUES ('1', '1', 'HOLDING', 'Tangerang', '', '', null, null, '-', '-', 'info@senusa.co.id', '', null, '99221112233213994', 'administrator', 'administrator', '05:04:17+07', '2015-04-22 05:04:17', null, '2012', '12', '09', '12', null);
COMMIT;

-- ----------------------------
--  Table structure for accountingdata
-- ----------------------------
DROP TABLE IF EXISTS "accountingdata";
CREATE TABLE "accountingdata" (
	"idaccountingdata" int8 NOT NULL,
	"curfinyear" int4,
	"finlasmonth" int4,
	"numperiod" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "accountingdata" OWNER TO "imm";

-- ----------------------------
--  Table structure for supplier_type
-- ----------------------------
DROP TABLE IF EXISTS "supplier_type";
CREATE TABLE "supplier_type" (
	"supplier_type_id" int4 NOT NULL,
	"idunit" int4,
	"supplier_type_name" varchar(150) COLLATE "default",
	"supplier_type_desc" varchar(225) COLLATE "default",
	"display" int2,
	"userin" int4,
	"datein" timestamp(6) NULL,
	"usermod" int4,
	"datemod" timestamp(6) NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "supplier_type" OWNER TO "imm";

-- ----------------------------
--  Records of supplier_type
-- ----------------------------
BEGIN;
INSERT INTO "supplier_type" VALUES ('1', '12', 'aaa', 'aaa', null, '11', '2017-03-09 10:03:22', '11', '2017-03-09 10:03:26');
COMMIT;

-- ----------------------------
--  Table structure for sextype
-- ----------------------------
DROP TABLE IF EXISTS "sextype";
CREATE TABLE "sextype" (
	"idsex" int4 NOT NULL,
	"name" varchar(20) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "sextype" OWNER TO "imm";

-- ----------------------------
--  Records of sextype
-- ----------------------------
BEGIN;
INSERT INTO "sextype" VALUES ('1', 'Laki-laki');
INSERT INTO "sextype" VALUES ('2', 'Perempuan');
COMMIT;

-- ----------------------------
--  Table structure for tambahangajihistory
-- ----------------------------
DROP TABLE IF EXISTS "tambahangajihistory";
CREATE TABLE "tambahangajihistory" (
	"idtambahangaji" int4,
	"idpayroll" int8,
	"datepaid" date,
	"userin" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"month" varchar(2) COLLATE "default",
	"year" int4,
	"jumlah" float8,
	"idemployee" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "tambahangajihistory" OWNER TO "imm";

-- ----------------------------
--  Records of tambahangajihistory
-- ----------------------------
BEGIN;
INSERT INTO "tambahangajihistory" VALUES ('4', null, '2015-03-09', 'administrator', '2015-03-09 00:03:28', '03', '2015', '30000', '5');
INSERT INTO "tambahangajihistory" VALUES ('4', null, '2015-03-09', 'administrator', '2015-03-09 00:03:28', '03', '2015', '30000', '5');
INSERT INTO "tambahangajihistory" VALUES ('4', null, '2015-03-09', 'administrator', '2015-03-09 04:03:12', '03', '2015', '30000', '5');
INSERT INTO "tambahangajihistory" VALUES ('4', null, '2015-03-09', 'administrator', '2015-03-09 04:03:12', '03', '2015', '30000', '5');
INSERT INTO "tambahangajihistory" VALUES ('4', null, '2015-03-09', 'administrator', '2015-03-09 04:03:14', '03', '2015', '30000', '5');
INSERT INTO "tambahangajihistory" VALUES ('4', null, '2015-03-09', 'administrator', '2015-03-09 04:03:14', '03', '2015', '30000', '5');
INSERT INTO "tambahangajihistory" VALUES ('4', null, '2015-03-09', 'administrator', '2015-03-09 04:03:29', '03', '2015', '30000', '5');
INSERT INTO "tambahangajihistory" VALUES ('4', null, '2015-03-09', 'administrator', '2015-03-09 04:03:29', '03', '2015', '30000', '5');
INSERT INTO "tambahangajihistory" VALUES ('4', null, '2015-03-09', 'administrator', '2015-03-09 04:03:45', '03', '2015', '30000', '5');
INSERT INTO "tambahangajihistory" VALUES ('4', null, '2015-03-09', 'administrator', '2015-03-09 04:03:45', '03', '2015', '30000', '5');
INSERT INTO "tambahangajihistory" VALUES ('4', null, '2015-03-09', 'administrator', '2015-03-09 04:03:57', '03', '2015', '30000', '5');
INSERT INTO "tambahangajihistory" VALUES ('4', null, '2015-03-09', 'administrator', '2015-03-09 04:03:57', '03', '2015', '30000', '5');
INSERT INTO "tambahangajihistory" VALUES ('4', null, '2015-03-20', 'administrator', '2015-03-20 18:03:21', '03', '2015', '30000', '5');
COMMIT;

-- ----------------------------
--  Table structure for unit
-- ----------------------------
DROP TABLE IF EXISTS "unit";
CREATE TABLE "unit" (
	"idunit" int8 NOT NULL DEFAULT nextval('seq_unit'::regclass),
	"namaunit" varchar(50) COLLATE "default",
	"deskripsi" varchar(225) COLLATE "default",
	"alamat" varchar(225) COLLATE "default",
	"display" int2,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"alamat2" varchar(225) COLLATE "default",
	"alamat3" varchar(225) COLLATE "default",
	"telp" varchar(225) COLLATE "default",
	"fax" varchar(225) COLLATE "default",
	"email" varchar(225) COLLATE "default",
	"website" varchar(225) COLLATE "default",
	"country" varchar(225) COLLATE "default",
	"npwp" varchar(225) COLLATE "default",
	"curfinanceyear" int4,
	"lastmonthfinanceyear" varchar(225) COLLATE "default",
	"conversionmonth" varchar(225) COLLATE "default",
	"numaccperiod" int4,
	"curfinancemonth" varchar(2) COLLATE "default",
	"startfinancemonth" varchar(2) COLLATE "default",
	"startfinanceyear" int4,
	"idbussinestype" int4,
	"logo" varchar(225) COLLATE "default",
	"idcompany" int4,
	"dateformat" varchar(20) COLLATE "default",
	"is_taxable" int2
)
WITH (OIDS=FALSE);
ALTER TABLE "unit" OWNER TO "imm";

-- ----------------------------
--  Records of unit
-- ----------------------------
BEGIN;
INSERT INTO "unit" VALUES ('99', 'unit akun template', null, null, '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO "unit" VALUES ('12', 'PT Alfa Prima Sentosa', '0', 'Tangerang Selatan', null, 'administrator', 'staff', '2015-04-22 06:04:50', '2017-03-08 18:03:37', '', '', '', '', '', '', null, '', '2017', '12', '11', '12', null, null, null, null, null, '1', null, '0');
COMMIT;

-- ----------------------------
--  Table structure for registrasipiutang
-- ----------------------------
DROP TABLE IF EXISTS "registrasipiutang";
CREATE TABLE "registrasipiutang" (
	"idregistrasipiutang" int4 NOT NULL DEFAULT nextval('seq_registrasipiutang'::regclass),
	"idaccount" int4,
	"bulan" varchar(2) COLLATE "default",
	"tahun" int4,
	"description" varchar(225) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"display" int4,
	"jumlah" float8,
	"idunit" int4,
	"sisapiutang" float8,
	"idaccountlink" int4,
	"tglpiutang" date,
	"idjournal" int4,
	"idpelanggan" int4,
	"autodecrease" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "registrasipiutang" OWNER TO "imm";

-- ----------------------------
--  Records of registrasipiutang
-- ----------------------------
BEGIN;
INSERT INTO "registrasipiutang" VALUES ('30', '18', null, null, 'Pembuatan aplikasi Barrier Gate Indonesia Power', 'staff', 'staff', '2017-01-26 18:01:21', '2017-01-26 18:01:21', null, '15000000', '12', '15000000', '752', '2016-12-09', '428', '7', '2');
INSERT INTO "registrasipiutang" VALUES ('31', '18', null, null, 'Development lanjutan aplikasi PPLS unit 5-7. Indonesia Power', 'staff', 'staff', '2017-01-26 18:01:29', '2017-01-26 18:01:29', null, '30000000', '12', '30000000', '752', '2016-11-30', '429', '7', '2');
INSERT INTO "registrasipiutang" VALUES ('29', '18', null, null, 'Development lanjutan pembuatan aplikasi assesment online suzuki', 'staff', 'staff', '2017-01-26 18:01:52', '2017-01-26 18:01:52', null, '12000000', '12', '12000000', '752', '2016-12-09', '427', '6', '2');
COMMIT;

-- ----------------------------
--  Table structure for receivemoney
-- ----------------------------
DROP TABLE IF EXISTS "receivemoney";
CREATE TABLE "receivemoney" (
	"idreceivemoney" int8 NOT NULL DEFAULT nextval('seq_receivemoney'::regclass),
	"idpayment" int8,
	"idjournal" int8,
	"idtax" int4,
	"depositaccount" int8,
	"payorid" int8,
	"notrans" varchar(20) COLLATE "default",
	"datetrans" date,
	"total" float8,
	"balance" float8,
	"memo" varchar(225) COLLATE "default",
	"display" int4,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"receivefrom" varchar(30) COLLATE "default",
	"tax" float8,
	"idunit" int4,
	"subtotal" float8,
	"idreceivemoneyimport" int4,
	"user_id" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "receivemoney" OWNER TO "imm";

-- ----------------------------
--  Table structure for employeetypeakunlink
-- ----------------------------
DROP TABLE IF EXISTS "employeetypeakunlink";
CREATE TABLE "employeetypeakunlink" (
	"idemployeetype" int4,
	"idaccountpayroll" int4,
	"idaccount" int4,
	"idaccountpaythr" int4,
	"idaccountthr" int4,
	"idunit" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "employeetypeakunlink" OWNER TO "imm";

-- ----------------------------
--  Records of employeetypeakunlink
-- ----------------------------
BEGIN;
INSERT INTO "employeetypeakunlink" VALUES ('1', null, null, null, null, '1');
INSERT INTO "employeetypeakunlink" VALUES ('1', null, null, null, null, '1');
INSERT INTO "employeetypeakunlink" VALUES ('1', null, null, null, null, '2');
INSERT INTO "employeetypeakunlink" VALUES ('1', null, null, null, null, '2');
INSERT INTO "employeetypeakunlink" VALUES ('2', '654', '681', null, null, '2');
INSERT INTO "employeetypeakunlink" VALUES ('2', '654', '681', null, null, '2');
INSERT INTO "employeetypeakunlink" VALUES ('2', null, null, '681', '714', '1');
INSERT INTO "employeetypeakunlink" VALUES ('2', null, null, '681', '714', '1');
INSERT INTO "employeetypeakunlink" VALUES ('6', '655', '623', null, null, '1');
INSERT INTO "employeetypeakunlink" VALUES ('6', '655', '623', null, null, '1');
INSERT INTO "employeetypeakunlink" VALUES ('6', null, null, null, null, '2');
INSERT INTO "employeetypeakunlink" VALUES ('6', null, null, null, null, '2');
COMMIT;

-- ----------------------------
--  Table structure for purchasestatus
-- ----------------------------
DROP TABLE IF EXISTS "purchasestatus";
CREATE TABLE "purchasestatus" (
	"idpurchasestatus" int8 NOT NULL,
	"status" varchar(20) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "purchasestatus" OWNER TO "imm";

-- ----------------------------
--  Records of purchasestatus
-- ----------------------------
BEGIN;
INSERT INTO "purchasestatus" VALUES ('1', 'Order');
INSERT INTO "purchasestatus" VALUES ('2', 'Paid');
INSERT INTO "purchasestatus" VALUES ('3', 'Return');
INSERT INTO "purchasestatus" VALUES ('4', 'Open Bills');
COMMIT;

-- ----------------------------
--  Table structure for piutanghistory
-- ----------------------------
DROP TABLE IF EXISTS "piutanghistory";
CREATE TABLE "piutanghistory" (
	"idregistrasipiutang" int4,
	"month" varchar(2) COLLATE "default",
	"year" int4,
	"tanggal" date,
	"diterima" float4,
	"sisa" float4,
	"idjournal" int4,
	"source" varchar(20) COLLATE "default",
	"userin" varchar COLLATE "default",
	"datein" timestamp(6) NULL,
	"idreceivemoney" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "piutanghistory" OWNER TO "imm";

-- ----------------------------
--  Table structure for journal
-- ----------------------------
DROP TABLE IF EXISTS "journal";
CREATE TABLE "journal" (
	"idjournal" int8 NOT NULL DEFAULT nextval('seq_journal'::regclass),
	"idjournaltype" int8,
	"nojournal" varchar(100) COLLATE "default",
	"name" varchar(225) COLLATE "default",
	"datejournal" date,
	"memo" varchar(225) COLLATE "default",
	"totaldebit" float8,
	"totalcredit" float8,
	"totaltax" float8,
	"isrecuring" bool,
	"year" int4,
	"month" varchar(2) COLLATE "default",
	"display" int4,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"lastbalance" float8,
	"currbalance" float8,
	"balance" float8,
	"idunit" int4,
	"idcurrency" int4,
	"idreconcile" int4,
	"idclossing" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "journal" OWNER TO "imm";

-- ----------------------------
--  Records of journal
-- ----------------------------
BEGIN;
INSERT INTO "journal" VALUES ('418', '1', '001', null, '2016-09-30', 'Saldo Awal', '0', '0', null, null, '2016', '09', null, 'staff', 'staff', '2017-01-26 17:01:19', '2017-01-26 17:01:19', null, null, null, null, null, null, null);
COMMIT;

-- ----------------------------
--  Table structure for accountpos
-- ----------------------------
DROP TABLE IF EXISTS "accountpos";
CREATE TABLE "accountpos" (
	"idpos" int4 NOT NULL,
	"namepos" varchar(20) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "accountpos" OWNER TO "imm";

-- ----------------------------
--  Records of accountpos
-- ----------------------------
BEGIN;
INSERT INTO "accountpos" VALUES ('1', 'Akun Kategori');
INSERT INTO "accountpos" VALUES ('2', 'Akun Transaksi');
COMMIT;

-- ----------------------------
--  Table structure for accountlog
-- ----------------------------
DROP TABLE IF EXISTS "accountlog";
CREATE TABLE "accountlog" (
	"idaccountlog" int4,
	"idaccount" int4 NOT NULL,
	"credit" float8,
	"debit" float8,
	"tanggal" date NOT NULL,
	"idjournal" int4 NOT NULL,
	"datein" timestamp(6) NULL,
	"userid" int4 NOT NULL,
	"idunit" int4 NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "accountlog" OWNER TO "imm";

-- ----------------------------
--  Table structure for tambahangaji
-- ----------------------------
DROP TABLE IF EXISTS "tambahangaji";
CREATE TABLE "tambahangaji" (
	"idtambahangaji" int4 NOT NULL DEFAULT nextval('seq_tambahangaji'::regclass),
	"idemployee" int8,
	"idtambahangajitype" int4 NOT NULL,
	"idsiklus" int4,
	"namatambahan" varchar(100) COLLATE "default",
	"startdate" date,
	"enddate" date,
	"jumlah" numeric,
	"display" int4,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"keterangan" varchar(225) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "tambahangaji" OWNER TO "imm";

-- ----------------------------
--  Records of tambahangaji
-- ----------------------------
BEGIN;
INSERT INTO "tambahangaji" VALUES ('2', '4', '1', '1', '0', '2013-02-05', '2015-02-06', '500000', null, 'administrator', 'administrator', '2015-02-06 09:02:10', '2015-02-06 09:02:10', '-');
INSERT INTO "tambahangaji" VALUES ('4', '5', '1', '1', '0', '2013-03-26', '2019-04-10', '30000', null, 'administrator', 'administrator', '2015-03-05 08:03:31', '2015-03-09 04:03:55', '--');
INSERT INTO "tambahangaji" VALUES ('5', '6', '1', '1', '0', '2015-04-01', '2015-04-30', '10000000', null, 'administrator', 'administrator', '2015-04-22 06:04:34', '2015-04-22 06:04:34', '-');
COMMIT;

-- ----------------------------
--  Table structure for asuransipayhistory
-- ----------------------------
DROP TABLE IF EXISTS "asuransipayhistory";
CREATE TABLE "asuransipayhistory" (
	"percente" float8,
	"percentc" float8,
	"amounte" float8,
	"amountc" float8,
	"userin" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"month" varchar(2) NOT NULL COLLATE "default",
	"year" int4 NOT NULL,
	"idasuransi" int4 NOT NULL,
	"idemployee" int4 NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "asuransipayhistory" OWNER TO "imm";

-- ----------------------------
--  Table structure for journalrec
-- ----------------------------
DROP TABLE IF EXISTS "journalrec";
CREATE TABLE "journalrec" (
	"idjournalrec" int8 NOT NULL DEFAULT nextval('seq_journal'::regclass),
	"idfrequency" int4,
	"idscheduletype" int8,
	"idalerttype" int4,
	"idjournaltype" int8,
	"nojournal" varchar(100) COLLATE "default",
	"name" varchar(225) COLLATE "default",
	"datejournal" date,
	"memo" varchar(225) COLLATE "default",
	"totaldebit" float8,
	"totalcredit" float8,
	"totaltax" float8,
	"balance" float8,
	"isrecuring" bool,
	"startdate" date,
	"recuntildate" date,
	"recnumtimes" int4,
	"alertto" int8,
	"notifto" int8,
	"alertmindays" int2,
	"alertondate" int2,
	"year" int4,
	"month" varchar(2) COLLATE "default",
	"display" int4,
	"userin" varchar(20) COLLATE "default",
	"usermod" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "journalrec" OWNER TO "imm";

-- ----------------------------
--  Records of journalrec
-- ----------------------------
BEGIN;
INSERT INTO "journalrec" VALUES ('12', null, '2', '2', '1', '123213', null, '2014-09-05', 'memo jurnal berulang', '500000', '500000', null, '0', 't', null, null, '3', '1', null, null, null, '2014', '09', null, 'admin', 'admin', '2014-08-31 20:08:58', '2014-08-31 20:08:58');
COMMIT;

-- ----------------------------
--  Table structure for package
-- ----------------------------
DROP TABLE IF EXISTS "package";
CREATE TABLE "package" (
	"packageid" int4 NOT NULL,
	"packagename" varchar(30) COLLATE "default",
	"price" float4,
	"description" varchar(225) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "package" OWNER TO "imm";

-- ----------------------------
--  Records of package
-- ----------------------------
BEGIN;
INSERT INTO "package" VALUES ('1', 'UKM', null, null);
INSERT INTO "package" VALUES ('2', 'Menengah', null, null);
INSERT INTO "package" VALUES ('3', 'Corporate', null, null);
COMMIT;

-- ----------------------------
--  Table structure for potongan
-- ----------------------------
DROP TABLE IF EXISTS "potongan";
CREATE TABLE "potongan" (
	"idpotongan" int4 NOT NULL DEFAULT nextval('seq_potongan'::regclass),
	"idpotongantype" int4,
	"idamounttype" int4,
	"idsiklus" int4,
	"idemployee" int8,
	"startdate" date,
	"enddate" date,
	"totalpotongan" numeric,
	"sisapotongan" numeric,
	"jumlahpotongan" numeric,
	"userin" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"usermod" varchar(20) COLLATE "default",
	"datemod" timestamp(6) NULL,
	"jumlahangsuran" int4,
	"keterangan" varchar(225) COLLATE "default",
	"sisaangsuran" int4,
	"display" int4,
	"idupload" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "potongan" OWNER TO "imm";

-- ----------------------------
--  Records of potongan
-- ----------------------------
BEGIN;
INSERT INTO "potongan" VALUES ('10', '2', null, null, '2', '2014-09-17', null, '30000000', '29464286', '535714', 'administrator', '2015-02-05 15:02:10', 'administrator', '2015-02-05 15:02:53', '56', '-', '53', '0', null);
INSERT INTO "potongan" VALUES ('11', '1', null, '1', '2', '2014-09-10', '2015-02-05', '30000', '0', '30000', 'administrator', '2015-02-05 15:02:38', 'administrator', '2015-02-05 15:02:02', '1', '-', '0', '0', null);
INSERT INTO "potongan" VALUES ('12', '3', null, '1', '2', '2011-02-05', '2019-02-19', '273870', '0', '273870', 'admin', '2015-02-23 17:02:47', 'admin', '2015-02-23 17:02:47', '1', '---', '0', null, null);
INSERT INTO "potongan" VALUES ('13', '4', null, '1', '2', '2011-02-12', '2019-02-11', '1500', '0', '1500', 'admin', '2015-02-23 17:02:07', 'admin', '2015-02-23 17:02:07', '1', '---', '0', null, null);
INSERT INTO "potongan" VALUES ('14', '1', null, '1', '5', '2015-03-02', '2019-04-11', '40000', '0', '40000', 'administrator', '2015-03-05 08:03:49', 'administrator', '2015-03-05 08:03:49', '1', '--', '-6', null, null);
INSERT INTO "potongan" VALUES ('18', '1', null, '1', '6', '2015-04-04', '2015-05-03', '20000', '20000', '20000', 'administrator', '2015-04-28 12:04:49', 'administrator', '2015-04-28 12:04:49', '1', null, '1', '0', '13');
INSERT INTO "potongan" VALUES ('19', '1', null, '1', '6', '2015-04-04', '2015-05-03', '20000', '20000', '20000', 'administrator', '2015-04-28 12:04:40', 'administrator', '2015-04-28 12:04:40', '1', null, '1', null, '14');
INSERT INTO "potongan" VALUES ('15', '4', null, '1', '6', '2015-04-01', '2020-04-30', '1500', '0', '1500', 'administrator', '2015-04-22 06:04:06', 'administrator', '2015-04-22 06:04:06', '1', '-', '-2', null, null);
INSERT INTO "potongan" VALUES ('16', '2', null, null, '6', '2015-04-01', null, '5000000', '4500000', '500000', 'administrator', '2015-04-22 07:04:55', 'administrator', '2015-04-22 07:04:55', '10', '', '8', null, null);
COMMIT;

-- ----------------------------
--  Table structure for datasutri
-- ----------------------------
DROP TABLE IF EXISTS "datasutri";
CREATE TABLE "datasutri" (
	"datasutri" int4 NOT NULL DEFAULT nextval('seq_datasutri'::regclass),
	"idemployee" int8,
	"namasutri" varchar(50) COLLATE "default",
	"work" varchar(200) COLLATE "default",
	"samework" bool,
	"userin" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"usermod" varchar(20) COLLATE "default",
	"display" int4,
	"kodekerja" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "datasutri" OWNER TO "imm";

-- ----------------------------
--  Table structure for inventory
-- ----------------------------
DROP TABLE IF EXISTS "inventory";
CREATE TABLE "inventory" (
	"idinventory" int8 NOT NULL DEFAULT nextval('seq_inventory'::regclass),
	"idjournal" int8,
	"invno" varchar(30) COLLATE "default",
	"nameinventory" varchar(30) COLLATE "default",
	"description" varchar(225) COLLATE "default",
	"isinventory" bool,
	"issell" bool,
	"isbuy" bool,
	"cosaccount" int8 DEFAULT 0,
	"incomeaccount" int8,
	"assetaccount" int8,
	"qtystock" int4,
	"images" varchar(30) COLLATE "default",
	"cost" float8,
	"unitmeasure" varchar(30) COLLATE "default",
	"numperunit" int4,
	"minstock" int4,
	"idprimarysupplier" int8,
	"sellingprice" float8,
	"idselingtax" int4,
	"unitmeasuresell" varchar(30) COLLATE "default",
	"numperunitsell" int4,
	"notes" varchar(225) COLLATE "default",
	"display" int4,
	"userin" varchar(30) COLLATE "default",
	"usermod" varchar(30) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"yearbuy" int4,
	"monthbuy" varchar(2) COLLATE "default",
	"datebuy" date,
	"idinventorycat" int4,
	"idbuytax" int4,
	"idunit" int4,
	"residu" float8,
	"umur" int4,
	"akumulasibeban" float8,
	"bebanberjalan" float8,
	"nilaibuku" float8,
	"bebanperbulan" float8,
	"akumulasiakhir" float8
)
WITH (OIDS=FALSE);
ALTER TABLE "inventory" OWNER TO "imm";

-- ----------------------------
--  Table structure for sallary
-- ----------------------------
DROP TABLE IF EXISTS "sallary";
CREATE TABLE "sallary" (
	"idsallary" int4 NOT NULL DEFAULT nextval('seq_sallary'::regclass),
	"idemployee" int8,
	"basicsallary" numeric,
	"nosk" varchar(50) COLLATE "default",
	"tglmulai" date,
	"tglakhir" date,
	"notes" varchar(222) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"usermod" varchar(20) COLLATE "default",
	"datemod" timestamp(6) NULL,
	"jabatan" varchar(100) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "sallary" OWNER TO "imm";

-- ----------------------------
--  Records of sallary
-- ----------------------------
BEGIN;
INSERT INTO "sallary" VALUES ('2', '2', '3000000', null, null, null, null, 'admin', '2014-10-17 00:10:15', 'admin', '2014-10-17 00:10:15', null);
COMMIT;

-- ----------------------------
--  Table structure for upload
-- ----------------------------
DROP TABLE IF EXISTS "upload";
CREATE TABLE "upload" (
	"idupload" int4 NOT NULL,
	"orig_name" varchar(30) COLLATE "default",
	"userin" varchar(20) COLLATE "default",
	"datein" timestamp(6) NULL,
	"type" varchar COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "upload" OWNER TO "imm";

-- ----------------------------
--  Records of upload
-- ----------------------------
BEGIN;
INSERT INTO "upload" VALUES ('4', 'tempate_import_tunjangan.xlsx', 'administrator', '2015-04-27 17:04:07', 'tunjangan');
INSERT INTO "upload" VALUES ('5', 'tempate_import_tunjangan.xlsx', 'administrator', '2015-04-27 23:04:00', 'tunjangan');
INSERT INTO "upload" VALUES ('6', 'tempate_import_tunjangan.xlsx', 'administrator', '2015-04-27 23:04:09', 'tunjangan');
INSERT INTO "upload" VALUES ('7', 'tempate_import_tunjangan.xlsx', 'administrator', '2015-04-27 23:04:47', 'tunjangan');
INSERT INTO "upload" VALUES ('8', 'tempate_import_tunjangan.xlsx', 'administrator', '2015-04-27 23:04:39', 'tunjangan');
INSERT INTO "upload" VALUES ('13', 'tempate_import_potongan.xlsx', 'administrator', '2015-04-28 12:04:49', 'potongan');
INSERT INTO "upload" VALUES ('14', 'tempate_import_potongan.xlsx', 'administrator', '2015-04-28 12:04:40', 'potongan');
INSERT INTO "upload" VALUES ('15', 'tempate_import_tunjangan.xlsx', 'administrator', '2015-04-29 06:04:51', 'tunjangan');
INSERT INTO "upload" VALUES ('16', 'tempate_import_pegawai.xlsx', 'administrator', '2015-05-20 04:05:58', 'potongan');
COMMIT;

-- ----------------------------
--  Table structure for accountsubtype
-- ----------------------------
DROP TABLE IF EXISTS "accountsubtype";
CREATE TABLE "accountsubtype" (
	"idaccountsubtype" int8 NOT NULL,
	"idaccounttype" int8,
	"accsubname" varchar(20) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "accountsubtype" OWNER TO "imm";

-- ----------------------------
--  Table structure for loginlog
-- ----------------------------
DROP TABLE IF EXISTS "loginlog";
CREATE TABLE "loginlog" (
	"pegawainid" varchar(20) COLLATE "default",
	"jammasuk" time(6),
	"tanggal" date,
	"bulan" varchar(16) COLLATE "default",
	"tahun" varchar(16) COLLATE "default",
	"is_referral" varchar(50) COLLATE "default",
	"browser" varchar(50) COLLATE "default",
	"version" varchar(50) COLLATE "default",
	"mobile" varchar(50) COLLATE "default",
	"robot" varchar(50) COLLATE "default",
	"referrer" varchar(50) COLLATE "default",
	"agent_string" varchar(225) COLLATE "default",
	"userin" varchar(50) COLLATE "default",
	"usermod" varchar(50) COLLATE "default",
	"datein" timestamp(6) NULL,
	"datemod" timestamp(6) NULL,
	"ipaddress" varchar(25) COLLATE "default",
	"loginlogid" int4 NOT NULL DEFAULT nextval('seq_loginlog'::regclass),
	"username" varchar(225) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "loginlog" OWNER TO "imm";

-- ----------------------------
--  Records of loginlog
-- ----------------------------
BEGIN;
INSERT INTO "loginlog" VALUES ('1', '11:08:16', '2014-08-19', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-19 11:08:16', '2014-08-19 11:08:16', '127.0.0.1', '2', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:08:09', '2014-08-19', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-19 11:08:09', '2014-08-19 11:08:09', '127.0.0.1', '3', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:08:45', '2014-08-19', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-19 11:08:45', '2014-08-19 11:08:45', '127.0.0.1', '4', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:08:23', '2014-08-19', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-19 11:08:23', '2014-08-19 11:08:23', '127.0.0.1', '5', 'admin');
INSERT INTO "loginlog" VALUES ('1', '21:08:57', '2014-08-19', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-19 21:08:57', '2014-08-19 21:08:57', '127.0.0.1', '6', 'admin');
INSERT INTO "loginlog" VALUES ('1', '10:08:24', '2014-08-20', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-20 10:08:24', '2014-08-20 10:08:24', '127.0.0.1', '7', 'admin');
INSERT INTO "loginlog" VALUES ('1', '17:08:08', '2014-08-20', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-20 17:08:08', '2014-08-20 17:08:08', '127.0.0.1', '8', 'admin');
INSERT INTO "loginlog" VALUES ('1', '00:08:02', '2014-08-21', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-21 00:08:02', '2014-08-21 00:08:02', '127.0.0.1', '9', 'admin');
INSERT INTO "loginlog" VALUES ('1', '16:08:53', '2014-08-21', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-21 16:08:53', '2014-08-21 16:08:53', '127.0.0.1', '10', 'admin');
INSERT INTO "loginlog" VALUES ('1', '21:08:50', '2014-08-21', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-21 21:08:50', '2014-08-21 21:08:50', '127.0.0.1', '11', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:08:49', '2014-08-22', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-22 15:08:49', '2014-08-22 15:08:49', '127.0.0.1', '12', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:08:13', '2014-08-23', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-23 15:08:13', '2014-08-23 15:08:13', '127.0.0.1', '13', 'admin');
INSERT INTO "loginlog" VALUES ('1', '21:08:28', '2014-08-23', '08', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', null, null, '2014-08-23 21:08:28', '2014-08-23 21:08:28', '127.0.0.1', '14', 'admin');
INSERT INTO "loginlog" VALUES ('1', '01:08:49', '2014-08-24', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-24 01:08:49', '2014-08-24 01:08:49', '127.0.0.1', '15', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:08:41', '2014-08-24', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-24 15:08:41', '2014-08-24 15:08:41', '127.0.0.1', '16', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:08:06', '2014-08-24', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-24 15:08:06', '2014-08-24 15:08:06', '127.0.0.1', '17', 'admin');
INSERT INTO "loginlog" VALUES ('1', '22:08:43', '2014-08-24', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-24 22:08:43', '2014-08-24 22:08:43', '127.0.0.1', '18', 'admin');
INSERT INTO "loginlog" VALUES ('1', '23:08:56', '2014-08-25', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-25 23:08:56', '2014-08-25 23:08:56', '127.0.0.1', '19', 'admin');
INSERT INTO "loginlog" VALUES ('1', '18:08:31', '2014-08-26', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-26 18:08:31', '2014-08-26 18:08:31', '127.0.0.1', '20', 'admin');
INSERT INTO "loginlog" VALUES ('1', '20:08:02', '2014-08-26', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-26 20:08:02', '2014-08-26 20:08:02', '127.0.0.1', '21', 'admin');
INSERT INTO "loginlog" VALUES ('1', '23:08:55', '2014-08-27', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/sppd/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-27 23:08:55', '2014-08-27 23:08:55', '127.0.0.1', '22', 'admin');
INSERT INTO "loginlog" VALUES ('1', '00:08:53', '2014-08-28', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/sppd/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-28 00:08:53', '2014-08-28 00:08:53', '127.0.0.1', '23', 'admin');
INSERT INTO "loginlog" VALUES ('1', '07:08:04', '2014-08-28', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-28 07:08:04', '2014-08-28 07:08:04', '127.0.0.1', '24', 'admin');
INSERT INTO "loginlog" VALUES ('1', '07:08:20', '2014-08-28', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-28 07:08:20', '2014-08-28 07:08:20', '127.0.0.1', '25', 'admin');
INSERT INTO "loginlog" VALUES ('1', '10:08:57', '2014-08-28', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-28 10:08:57', '2014-08-28 10:08:57', '127.0.0.1', '26', 'admin');
INSERT INTO "loginlog" VALUES ('1', '16:08:44', '2014-08-28', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-28 16:08:44', '2014-08-28 16:08:44', '127.0.0.1', '27', 'admin');
INSERT INTO "loginlog" VALUES ('1', '14:08:19', '2014-08-29', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-29 14:08:19', '2014-08-29 14:08:19', '127.0.0.1', '28', 'admin');
INSERT INTO "loginlog" VALUES ('1', '17:08:14', '2014-08-29', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-29 17:08:14', '2014-08-29 17:08:14', '127.0.0.1', '29', 'admin');
INSERT INTO "loginlog" VALUES ('1', '22:08:01', '2014-08-29', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-29 22:08:01', '2014-08-29 22:08:01', '127.0.0.1', '30', 'admin');
INSERT INTO "loginlog" VALUES ('1', '00:08:14', '2014-08-30', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-30 00:08:14', '2014-08-30 00:08:14', '127.0.0.1', '31', 'admin');
INSERT INTO "loginlog" VALUES ('1', '00:08:56', '2014-08-30', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-30 00:08:56', '2014-08-30 00:08:56', '127.0.0.1', '32', 'admin');
INSERT INTO "loginlog" VALUES ('1', '23:08:59', '2014-08-30', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-30 23:08:59', '2014-08-30 23:08:59', '127.0.0.1', '33', 'admin');
INSERT INTO "loginlog" VALUES ('1', '19:08:46', '2014-08-31', '08', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-08-31 19:08:46', '2014-08-31 19:08:46', '127.0.0.1', '34', 'admin');
INSERT INTO "loginlog" VALUES ('1', '00:09:55', '2014-09-01', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-01 00:09:55', '2014-09-01 00:09:55', '127.0.0.1', '35', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:09:02', '2014-09-02', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-02 11:09:02', '2014-09-02 11:09:02', '127.0.0.1', '36', 'admin');
INSERT INTO "loginlog" VALUES ('1', '14:09:33', '2014-09-02', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-02 14:09:33', '2014-09-02 14:09:33', '127.0.0.1', '37', 'admin');
INSERT INTO "loginlog" VALUES ('1', '17:09:07', '2014-09-02', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-02 17:09:07', '2014-09-02 17:09:07', '127.0.0.1', '38', 'admin');
INSERT INTO "loginlog" VALUES ('1', '18:09:38', '2014-09-02', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-02 18:09:38', '2014-09-02 18:09:38', '127.0.0.1', '39', 'admin');
INSERT INTO "loginlog" VALUES ('1', '21:09:59', '2014-09-02', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-02 21:09:59', '2014-09-02 21:09:59', '127.0.0.1', '40', 'admin');
INSERT INTO "loginlog" VALUES ('1', '06:09:10', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 06:09:10', '2014-09-04 06:09:10', '127.0.0.1', '41', 'admin');
INSERT INTO "loginlog" VALUES ('2', '07:09:08', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 07:09:08', '2014-09-04 07:09:08', '127.0.0.1', '42', 'unit1');
INSERT INTO "loginlog" VALUES ('2', '07:09:08', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 07:09:08', '2014-09-04 07:09:08', '127.0.0.1', '43', 'unit1');
INSERT INTO "loginlog" VALUES ('1', '07:09:07', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 07:09:07', '2014-09-04 07:09:07', '127.0.0.1', '44', 'admin');
INSERT INTO "loginlog" VALUES ('2', '07:09:15', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 07:09:15', '2014-09-04 07:09:15', '127.0.0.1', '45', 'unit1');
INSERT INTO "loginlog" VALUES ('1', '07:09:13', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 07:09:13', '2014-09-04 07:09:13', '127.0.0.1', '46', 'admin');
INSERT INTO "loginlog" VALUES ('1', '07:09:16', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 07:09:16', '2014-09-04 07:09:16', '127.0.0.1', '47', 'admin');
INSERT INTO "loginlog" VALUES ('2', '07:09:23', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 07:09:23', '2014-09-04 07:09:23', '127.0.0.1', '48', 'unit1');
INSERT INTO "loginlog" VALUES ('1', '07:09:46', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 07:09:46', '2014-09-04 07:09:46', '127.0.0.1', '49', 'admin');
INSERT INTO "loginlog" VALUES ('1', '07:09:42', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 07:09:42', '2014-09-04 07:09:42', '127.0.0.1', '50', 'admin');
INSERT INTO "loginlog" VALUES ('1', '07:09:59', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 07:09:59', '2014-09-04 07:09:59', '127.0.0.1', '51', 'admin');
INSERT INTO "loginlog" VALUES ('2', '07:09:34', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 07:09:34', '2014-09-04 07:09:34', '127.0.0.1', '52', 'unit1');
INSERT INTO "loginlog" VALUES ('1', '07:09:47', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 07:09:47', '2014-09-04 07:09:47', '127.0.0.1', '53', 'admin');
INSERT INTO "loginlog" VALUES ('2', '09:09:19', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 09:09:19', '2014-09-04 09:09:19', '127.0.0.1', '54', 'unit1');
INSERT INTO "loginlog" VALUES ('2', '10:09:29', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 10:09:29', '2014-09-04 10:09:29', '127.0.0.1', '55', 'unit1');
INSERT INTO "loginlog" VALUES ('1', '11:09:28', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 11:09:28', '2014-09-04 11:09:28', '127.0.0.1', '56', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:09:56', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 11:09:56', '2014-09-04 11:09:56', '127.0.0.1', '57', 'admin');
INSERT INTO "loginlog" VALUES ('2', '11:09:23', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 11:09:23', '2014-09-04 11:09:23', '127.0.0.1', '58', 'unit1');
INSERT INTO "loginlog" VALUES ('3', '12:09:08', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 12:09:08', '2014-09-04 12:09:08', '127.0.0.1', '59', 'unit2');
INSERT INTO "loginlog" VALUES ('2', '15:09:32', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 15:09:32', '2014-09-04 15:09:32', '127.0.0.1', '60', 'adminunit1');
INSERT INTO "loginlog" VALUES ('3', '15:09:56', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 15:09:56', '2014-09-04 15:09:56', '127.0.0.1', '61', 'adminunit2');
INSERT INTO "loginlog" VALUES ('1', '16:09:39', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 16:09:39', '2014-09-04 16:09:39', '127.0.0.1', '62', 'admin');
INSERT INTO "loginlog" VALUES ('1', '17:09:02', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 17:09:02', '2014-09-04 17:09:02', '127.0.0.1', '63', 'admin');
INSERT INTO "loginlog" VALUES ('1', '17:09:59', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 17:09:59', '2014-09-04 17:09:59', '127.0.0.1', '64', 'admin');
INSERT INTO "loginlog" VALUES ('1', '17:09:38', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 17:09:38', '2014-09-04 17:09:38', '127.0.0.1', '65', 'admin');
INSERT INTO "loginlog" VALUES ('2', '22:09:39', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 22:09:39', '2014-09-04 22:09:39', '127.0.0.1', '96', 'adminunit1');
INSERT INTO "loginlog" VALUES ('3', '22:09:24', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 22:09:24', '2014-09-04 22:09:24', '127.0.0.1', '97', 'adminunit2');
INSERT INTO "loginlog" VALUES ('3', '23:09:34', '2014-09-04', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', null, null, '2014-09-04 23:09:34', '2014-09-04 23:09:34', '127.0.0.1', '98', 'adminunit2');
INSERT INTO "loginlog" VALUES ('1', '23:09:12', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 23:09:12', '2014-09-04 23:09:12', '127.0.0.1', '99', 'admin');
INSERT INTO "loginlog" VALUES ('3', '23:09:34', '2014-09-04', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-04 23:09:34', '2014-09-04 23:09:34', '127.0.0.1', '100', 'adminunit2');
INSERT INTO "loginlog" VALUES ('1', '15:09:23', '2014-09-05', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-05 15:09:23', '2014-09-05 15:09:23', '127.0.0.1', '101', 'admin');
INSERT INTO "loginlog" VALUES ('1', '20:09:56', '2014-09-05', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-05 20:09:56', '2014-09-05 20:09:56', '127.0.0.1', '102', 'admin');
INSERT INTO "loginlog" VALUES ('1', '20:09:11', '2014-09-05', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', null, null, '2014-09-05 20:09:11', '2014-09-05 20:09:11', '127.0.0.1', '103', 'admin');
INSERT INTO "loginlog" VALUES ('1', '10:09:46', '2014-09-06', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-06 10:09:46', '2014-09-06 10:09:46', '127.0.0.1', '104', 'admin');
INSERT INTO "loginlog" VALUES ('1', '06:09:43', '2014-09-07', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-07 06:09:43', '2014-09-07 06:09:43', '127.0.0.1', '105', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:09:45', '2014-09-07', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-07 15:09:45', '2014-09-07 15:09:45', '127.0.0.1', '106', 'admin');
INSERT INTO "loginlog" VALUES ('1', '18:09:29', '2014-09-07', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-07 18:09:29', '2014-09-07 18:09:29', '127.0.0.1', '107', 'admin');
INSERT INTO "loginlog" VALUES ('1', '20:09:26', '2014-09-07', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-07 20:09:26', '2014-09-07 20:09:26', '127.0.0.1', '108', 'admin');
INSERT INTO "loginlog" VALUES ('3', '06:09:48', '2014-09-08', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-08 06:09:48', '2014-09-08 06:09:48', '127.0.0.1', '109', 'adminunit2');
INSERT INTO "loginlog" VALUES ('2', '06:09:06', '2014-09-08', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-08 06:09:06', '2014-09-08 06:09:06', '127.0.0.1', '110', 'adminunit1');
INSERT INTO "loginlog" VALUES ('1', '06:09:18', '2014-09-08', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-08 06:09:18', '2014-09-08 06:09:18', '127.0.0.1', '111', 'admin');
INSERT INTO "loginlog" VALUES ('1', '12:09:20', '2014-09-08', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-08 12:09:20', '2014-09-08 12:09:20', '127.0.0.1', '112', 'admin');
INSERT INTO "loginlog" VALUES ('1', '06:09:30', '2014-09-09', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-09 06:09:30', '2014-09-09 06:09:30', '127.0.0.1', '113', 'admin');
INSERT INTO "loginlog" VALUES ('1', '09:09:26', '2014-09-09', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-09 09:09:26', '2014-09-09 09:09:26', '127.0.0.1', '114', 'admin');
INSERT INTO "loginlog" VALUES ('1', '17:09:30', '2014-09-09', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-09 17:09:30', '2014-09-09 17:09:30', '127.0.0.1', '115', 'admin');
INSERT INTO "loginlog" VALUES ('1', '06:09:59', '2014-09-10', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-10 06:09:59', '2014-09-10 06:09:59', '127.0.0.1', '116', 'admin');
INSERT INTO "loginlog" VALUES ('1', '08:09:41', '2014-09-10', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-10 08:09:41', '2014-09-10 08:09:41', '127.0.0.1', '117', 'admin');
INSERT INTO "loginlog" VALUES ('1', '21:09:49', '2014-09-10', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-10 21:09:49', '2014-09-10 21:09:49', '127.0.0.1', '118', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:09:49', '2014-09-12', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-12 15:09:49', '2014-09-12 15:09:49', '127.0.0.1', '119', 'admin');
INSERT INTO "loginlog" VALUES ('3', '16:09:07', '2014-09-12', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-12 16:09:07', '2014-09-12 16:09:07', '127.0.0.1', '120', 'adminunit2');
INSERT INTO "loginlog" VALUES ('1', '16:09:55', '2014-09-12', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-12 16:09:55', '2014-09-12 16:09:55', '127.0.0.1', '121', 'admin');
INSERT INTO "loginlog" VALUES ('3', '16:09:25', '2014-09-12', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-12 16:09:25', '2014-09-12 16:09:25', '127.0.0.1', '122', 'adminunit2');
INSERT INTO "loginlog" VALUES ('1', '00:09:03', '2014-09-13', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-13 00:09:03', '2014-09-13 00:09:03', '127.0.0.1', '123', 'admin');
INSERT INTO "loginlog" VALUES ('3', '00:09:19', '2014-09-13', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-13 00:09:19', '2014-09-13 00:09:19', '127.0.0.1', '124', 'adminunit2');
INSERT INTO "loginlog" VALUES ('1', '19:09:13', '2014-09-13', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-13 19:09:13', '2014-09-13 19:09:13', '127.0.0.1', '125', 'admin');
INSERT INTO "loginlog" VALUES ('1', '09:09:17', '2014-09-14', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', null, null, '2014-09-14 09:09:17', '2014-09-14 09:09:17', '127.0.0.1', '126', 'admin');
INSERT INTO "loginlog" VALUES ('1', '13:09:48', '2014-09-14', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-14 13:09:48', '2014-09-14 13:09:48', '127.0.0.1', '127', 'admin');
INSERT INTO "loginlog" VALUES ('1', '21:09:41', '2014-09-14', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-14 21:09:41', '2014-09-14 21:09:41', '127.0.0.1', '128', 'admin');
INSERT INTO "loginlog" VALUES ('1', '09:09:01', '2014-09-15', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-15 09:09:01', '2014-09-15 09:09:01', '127.0.0.1', '129', 'admin');
INSERT INTO "loginlog" VALUES ('1', '19:09:04', '2014-09-15', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-15 19:09:04', '2014-09-15 19:09:04', '127.0.0.1', '130', 'admin');
INSERT INTO "loginlog" VALUES ('1', '14:09:57', '2014-09-16', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-16 14:09:57', '2014-09-16 14:09:57', '127.0.0.1', '131', 'admin');
INSERT INTO "loginlog" VALUES ('1', '16:09:29', '2014-09-18', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-18 16:09:29', '2014-09-18 16:09:29', '127.0.0.1', '132', 'admin');
INSERT INTO "loginlog" VALUES ('1', '17:09:55', '2014-09-18', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-18 17:09:55', '2014-09-18 17:09:55', '127.0.0.1', '133', 'admin');
INSERT INTO "loginlog" VALUES ('1', '10:09:18', '2014-09-19', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-19 10:09:18', '2014-09-19 10:09:18', '127.0.0.1', '134', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:09:33', '2014-09-20', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-20 11:09:33', '2014-09-20 11:09:33', '127.0.0.1', '135', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:09:39', '2014-09-20', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-20 15:09:39', '2014-09-20 15:09:39', '127.0.0.1', '136', 'admin');
INSERT INTO "loginlog" VALUES ('1', '18:09:25', '2014-09-20', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', null, null, '2014-09-20 18:09:25', '2014-09-20 18:09:25', '127.0.0.1', '137', 'admin');
INSERT INTO "loginlog" VALUES ('1', '19:09:17', '2014-09-21', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-21 19:09:17', '2014-09-21 19:09:17', '127.0.0.1', '138', 'admin');
INSERT INTO "loginlog" VALUES ('1', '21:09:12', '2014-09-21', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-21 21:09:12', '2014-09-21 21:09:12', '127.0.0.1', '139', 'admin');
INSERT INTO "loginlog" VALUES ('1', '14:09:33', '2014-09-22', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-22 14:09:33', '2014-09-22 14:09:33', '127.0.0.1', '140', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:09:44', '2014-09-23', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-23 11:09:44', '2014-09-23 11:09:44', '127.0.0.1', '141', 'admin');
INSERT INTO "loginlog" VALUES ('1', '10:09:59', '2014-09-24', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-24 10:09:59', '2014-09-24 10:09:59', '127.0.0.1', '142', 'admin');
INSERT INTO "loginlog" VALUES ('1', '12:09:36', '2014-09-24', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-24 12:09:36', '2014-09-24 12:09:36', '127.0.0.1', '143', 'admin');
INSERT INTO "loginlog" VALUES ('1', '10:09:43', '2014-09-25', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-25 10:09:43', '2014-09-25 10:09:43', '127.0.0.1', '144', 'admin');
INSERT INTO "loginlog" VALUES ('1', '06:09:50', '2014-09-26', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', null, null, '2014-09-26 06:09:50', '2014-09-26 06:09:50', '127.0.0.1', '145', 'admin');
INSERT INTO "loginlog" VALUES ('1', '13:09:15', '2014-09-26', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', null, null, '2014-09-26 13:09:15', '2014-09-26 13:09:15', '127.0.0.1', '146', 'admin');
INSERT INTO "loginlog" VALUES ('1', '21:09:00', '2014-09-26', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-26 21:09:00', '2014-09-26 21:09:00', '127.0.0.1', '147', 'admin');
INSERT INTO "loginlog" VALUES ('1', '13:10:45', '2014-10-21', '10', '2014', '1', 'Firefox', '24.0', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', null, null, '2014-10-21 13:10:45', '2014-10-21 13:10:45', '192.168.56.111', '177', 'admin');
INSERT INTO "loginlog" VALUES ('1', '21:09:51', '2014-09-26', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-26 21:09:51', '2014-09-26 21:09:51', '127.0.0.1', '148', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:09:03', '2014-09-27', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-27 11:09:03', '2014-09-27 11:09:03', '127.0.0.1', '149', 'admin');
INSERT INTO "loginlog" VALUES ('1', '18:09:34', '2014-09-27', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-27 18:09:34', '2014-09-27 18:09:34', '127.0.0.1', '150', 'admin');
INSERT INTO "loginlog" VALUES ('1', '20:09:15', '2014-09-27', '09', '2014', '1', 'Firefox', '24.0', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', null, null, '2014-09-27 20:09:15', '2014-09-27 20:09:15', '127.0.0.1', '151', 'admin');
INSERT INTO "loginlog" VALUES ('1', '23:09:35', '2014-09-28', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-28 23:09:35', '2014-09-28 23:09:35', '127.0.0.1', '152', 'admin');
INSERT INTO "loginlog" VALUES ('1', '10:09:21', '2014-09-30', '09', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-09-30 10:09:21', '2014-09-30 10:09:21', '127.0.0.1', '153', 'admin');
INSERT INTO "loginlog" VALUES ('1', '21:10:54', '2014-10-01', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-10-01 21:10:54', '2014-10-01 21:10:54', '127.0.0.1', '154', 'admin');
INSERT INTO "loginlog" VALUES ('1', '23:10:53', '2014-10-02', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-10-02 23:10:53', '2014-10-02 23:10:53', '127.0.0.1', '155', 'admin');
INSERT INTO "loginlog" VALUES ('1', '07:10:26', '2014-10-03', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-10-03 07:10:26', '2014-10-03 07:10:26', '127.0.0.1', '156', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:10:28', '2014-10-03', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-10-03 15:10:28', '2014-10-03 15:10:28', '127.0.0.1', '157', 'admin');
INSERT INTO "loginlog" VALUES ('1', '07:10:42', '2014-10-05', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-10-05 07:10:42', '2014-10-05 07:10:42', '127.0.0.1', '158', 'admin');
INSERT INTO "loginlog" VALUES ('1', '00:10:10', '2014-10-06', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-10-06 00:10:10', '2014-10-06 00:10:10', '127.0.0.1', '159', 'admin');
INSERT INTO "loginlog" VALUES ('7', '02:10:20', '2014-10-06', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-10-06 02:10:20', '2014-10-06 02:10:20', '127.0.0.1', '160', 'xxx');
INSERT INTO "loginlog" VALUES ('1', '02:10:51', '2014-10-06', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-10-06 02:10:51', '2014-10-06 02:10:51', '127.0.0.1', '161', 'admin');
INSERT INTO "loginlog" VALUES ('1', '09:10:20', '2014-10-06', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-10-06 09:10:20', '2014-10-06 09:10:20', '127.0.0.1', '162', 'admin');
INSERT INTO "loginlog" VALUES ('1', '10:10:09', '2014-10-06', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://localhost/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-10-06 10:10:09', '2014-10-06 10:10:09', '127.0.0.1', '163', 'admin');
INSERT INTO "loginlog" VALUES ('1', '08:10:27', '2014-10-08', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-10-08 08:10:27', '2014-10-08 08:10:27', '192.168.56.1', '164', 'admin');
INSERT INTO "loginlog" VALUES ('1', '08:10:03', '2014-10-08', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-10-08 08:10:03', '2014-10-08 08:10:03', '192.168.56.1', '165', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:10:40', '2014-10-08', '10', '2014', '1', 'Chrome', '31.0.1650.57', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36', null, null, '2014-10-08 15:10:40', '2014-10-08 15:10:40', '192.168.56.1', '166', 'admin');
INSERT INTO "loginlog" VALUES ('1', '20:10:55', '2014-10-08', '10', '2014', '1', 'Chrome', '37.0.2062.124', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36', null, null, '2014-10-08 20:10:55', '2014-10-08 20:10:55', '192.168.56.1', '167', 'admin');
INSERT INTO "loginlog" VALUES ('1', '20:10:35', '2014-10-08', '10', '2014', '1', 'Chrome', '38.0.2125.101', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36', null, null, '2014-10-08 20:10:35', '2014-10-08 20:10:35', '192.168.56.1', '168', 'admin');
INSERT INTO "loginlog" VALUES ('1', '01:10:28', '2014-10-14', '10', '2014', '1', 'Chrome', '38.0.2125.101', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36', null, null, '2014-10-14 01:10:28', '2014-10-14 01:10:28', '192.168.56.1', '169', 'admin');
INSERT INTO "loginlog" VALUES ('1', '14:10:47', '2014-10-14', '10', '2014', '1', 'Chrome', '38.0.2125.101', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36', null, null, '2014-10-14 14:10:47', '2014-10-14 14:10:47', '192.168.56.1', '170', 'admin');
INSERT INTO "loginlog" VALUES ('1', '14:10:01', '2014-10-14', '10', '2014', '1', 'Firefox', '24.0', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0', null, null, '2014-10-14 14:10:01', '2014-10-14 14:10:01', '192.168.56.111', '171', 'admin');
INSERT INTO "loginlog" VALUES ('1', '14:10:16', '2014-10-14', '10', '2014', '1', 'Firefox', '32.0', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0', null, null, '2014-10-14 14:10:16', '2014-10-14 14:10:16', '192.168.56.1', '172', 'admin');
INSERT INTO "loginlog" VALUES ('1', '19:10:34', '2014-10-16', '10', '2014', '1', 'Chrome', '38.0.2125.101', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36', null, null, '2014-10-16 19:10:34', '2014-10-16 19:10:34', '192.168.56.1', '173', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:10:45', '2014-10-17', '10', '2014', '1', 'Chrome', '38.0.2125.101', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36', null, null, '2014-10-17 15:10:45', '2014-10-17 15:10:45', '192.168.56.1', '174', 'admin');
INSERT INTO "loginlog" VALUES ('1', '18:10:04', '2014-10-18', '10', '2014', '1', 'Firefox', '32.0', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0', null, null, '2014-10-18 18:10:04', '2014-10-18 18:10:04', '192.168.56.1', '175', 'admin');
INSERT INTO "loginlog" VALUES ('1', '06:10:01', '2014-10-19', '10', '2014', '1', 'Chrome', '38.0.2125.104', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36', null, null, '2014-10-19 06:10:01', '2014-10-19 06:10:01', '192.168.56.1', '176', 'admin');
INSERT INTO "loginlog" VALUES ('1', '22:10:07', '2014-10-21', '10', '2014', '1', 'Chrome', '38.0.2125.104', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36', null, null, '2014-10-21 22:10:07', '2014-10-21 22:10:07', '192.168.56.1', '178', 'admin');
INSERT INTO "loginlog" VALUES ('1', '13:10:36', '2014-10-23', '10', '2014', '1', 'Chrome', '38.0.2125.104', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36', null, null, '2014-10-23 13:10:36', '2014-10-23 13:10:36', '192.168.56.1', '179', 'admin');
INSERT INTO "loginlog" VALUES ('1', '19:10:59', '2014-10-23', '10', '2014', '1', 'Chrome', '38.0.2125.104', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36', null, null, '2014-10-23 19:10:59', '2014-10-23 19:10:59', '192.168.56.1', '180', 'admin');
INSERT INTO "loginlog" VALUES ('1', '19:10:05', '2014-10-23', '10', '2014', '1', 'Chrome', '29.0.1547.72', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36', null, null, '2014-10-23 19:10:05', '2014-10-23 19:10:05', '192.168.56.1', '181', 'admin');
INSERT INTO "loginlog" VALUES ('1', '19:10:58', '2014-10-23', '10', '2014', '1', 'Chrome', '38.0.2125.104', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36', null, null, '2014-10-23 19:10:58', '2014-10-23 19:10:58', '192.168.56.1', '182', 'admin');
INSERT INTO "loginlog" VALUES ('1', '17:10:20', '2014-10-27', '10', '2014', '1', 'Chrome', '38.0.2125.104', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36', null, null, '2014-10-27 17:10:20', '2014-10-27 17:10:20', '192.168.56.1', '183', 'admin');
INSERT INTO "loginlog" VALUES ('1', '22:10:30', '2014-10-28', '10', '2014', '1', 'Chrome', '38.0.2125.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36', null, null, '2014-10-28 22:10:30', '2014-10-28 22:10:30', '192.168.56.1', '184', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:11:06', '2014-11-04', '11', '2014', '1', 'Firefox', '32.0', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0', null, null, '2014-11-04 11:11:06', '2014-11-04 11:11:06', '192.168.56.1', '185', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:11:00', '2014-11-05', '11', '2014', '1', 'Chrome', '38.0.2125.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36', null, null, '2014-11-05 11:11:00', '2014-11-05 11:11:00', '192.168.56.1', '186', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:11:32', '2014-11-05', '11', '2014', '1', 'Chrome', '38.0.2125.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36', null, null, '2014-11-05 11:11:32', '2014-11-05 11:11:32', '192.168.56.1', '187', 'admin');
INSERT INTO "loginlog" VALUES ('3', '11:11:21', '2014-11-05', '11', '2014', '1', 'Chrome', '38.0.2125.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36', null, null, '2014-11-05 11:11:21', '2014-11-05 11:11:21', '192.168.56.1', '188', 'adminunit2');
INSERT INTO "loginlog" VALUES ('1', '15:11:54', '2014-11-05', '11', '2014', '1', 'Firefox', '32.0', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0', null, null, '2014-11-05 15:11:54', '2014-11-05 15:11:54', '192.168.56.1', '189', 'admin');
INSERT INTO "loginlog" VALUES ('1', '08:11:35', '2014-11-06', '11', '2014', '1', 'Chrome', '38.0.2125.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36', null, null, '2014-11-06 08:11:35', '2014-11-06 08:11:35', '192.168.56.1', '190', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:11:10', '2014-11-20', '11', '2014', '1', 'Chrome', '38.0.2125.122', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36', null, null, '2014-11-20 15:11:10', '2014-11-20 15:11:10', '192.168.56.1', '191', 'admin');
INSERT INTO "loginlog" VALUES ('1', '10:12:20', '2014-12-01', '12', '2014', '1', 'Chrome', '39.0.2171.65', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36', null, null, '2014-12-01 10:12:20', '2014-12-01 10:12:20', '192.168.56.1', '192', 'admin');
INSERT INTO "loginlog" VALUES ('1', '07:12:49', '2014-12-01', '12', '2014', '1', 'Firefox', '33.0', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:33.0) Gecko/20100101 Firefox/33.0', null, null, '2014-12-01 07:12:49', '2014-12-01 07:12:49', '192.168.56.1', '193', 'admin');
INSERT INTO "loginlog" VALUES ('1', '07:12:30', '2014-12-01', '12', '2014', '1', 'Chrome', '39.0.2171.65', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36', null, null, '2014-12-01 07:12:30', '2014-12-01 07:12:30', '192.168.56.1', '194', 'admin');
INSERT INTO "loginlog" VALUES ('1', '07:12:23', '2014-12-01', '12', '2014', '1', 'Chrome', '39.0.2171.65', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36', null, null, '2014-12-01 07:12:24', '2014-12-01 07:12:24', '192.168.56.1', '195', 'admin');
INSERT INTO "loginlog" VALUES ('1', '07:12:49', '2014-12-01', '12', '2014', '1', 'Chrome', '39.0.2171.65', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36', null, null, '2014-12-01 07:12:49', '2014-12-01 07:12:49', '192.168.56.1', '196', 'admin');
INSERT INTO "loginlog" VALUES ('1', '07:12:16', '2014-12-01', '12', '2014', '1', 'Chrome', '39.0.2171.65', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36', null, null, '2014-12-01 07:12:16', '2014-12-01 07:12:16', '192.168.56.1', '197', 'admin');
INSERT INTO "loginlog" VALUES ('1', '14:12:13', '2014-12-01', '12', '2014', '1', 'Chrome', '39.0.2171.65', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36', null, null, '2014-12-01 14:12:13', '2014-12-01 14:12:13', '192.168.56.1', '198', 'admin');
INSERT INTO "loginlog" VALUES ('1', '22:12:34', '2014-12-14', '12', '2014', '1', 'Chrome', '39.0.2171.71', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36', null, null, '2014-12-14 22:12:34', '2014-12-14 22:12:34', '192.168.56.1', '199', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:12:03', '2014-12-26', '12', '2014', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2014-12-26 11:12:03', '2014-12-26 11:12:03', '192.168.56.1', '200', 'admin');
INSERT INTO "loginlog" VALUES ('1', '13:01:20', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 13:01:20', '2015-01-04 13:01:20', '192.168.56.1', '201', 'admin');
INSERT INTO "loginlog" VALUES ('1', '22:01:17', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 22:01:17', '2015-01-04 22:01:17', '192.168.56.1', '202', 'admin');
INSERT INTO "loginlog" VALUES ('1', '22:01:11', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 22:01:11', '2015-01-04 22:01:11', '192.168.56.1', '203', 'admin');
INSERT INTO "loginlog" VALUES ('1', '22:01:45', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 22:01:45', '2015-01-04 22:01:45', '192.168.56.1', '204', 'admin');
INSERT INTO "loginlog" VALUES ('3', '22:01:16', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 22:01:16', '2015-01-04 22:01:16', '192.168.56.1', '205', 'adminunit2');
INSERT INTO "loginlog" VALUES ('2', '22:01:33', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 22:01:33', '2015-01-04 22:01:33', '192.168.56.1', '206', 'adminunit1');
INSERT INTO "loginlog" VALUES ('1', '22:01:03', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 22:01:03', '2015-01-04 22:01:03', '192.168.56.1', '207', 'admin');
INSERT INTO "loginlog" VALUES ('1', '22:01:07', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 22:01:07', '2015-01-04 22:01:07', '192.168.56.1', '208', 'admin');
INSERT INTO "loginlog" VALUES ('1', '22:01:45', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 22:01:45', '2015-01-04 22:01:45', '192.168.56.1', '209', 'admin');
INSERT INTO "loginlog" VALUES ('3', '22:01:57', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 22:01:57', '2015-01-04 22:01:57', '192.168.56.1', '210', 'adminunit2');
INSERT INTO "loginlog" VALUES ('1', '23:01:06', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 23:01:06', '2015-01-04 23:01:06', '192.168.56.1', '211', 'admin');
INSERT INTO "loginlog" VALUES ('7', '23:01:26', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 23:01:26', '2015-01-04 23:01:26', '192.168.56.1', '212', 'xxx');
INSERT INTO "loginlog" VALUES ('7', '23:01:41', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 23:01:41', '2015-01-04 23:01:41', '192.168.56.1', '213', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '23:01:10', '2015-01-04', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-04 23:01:10', '2015-01-04 23:01:10', '192.168.56.1', '214', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '03:01:58', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-05 03:01:58', '2015-01-05 03:01:58', '192.168.56.1', '215', null);
INSERT INTO "loginlog" VALUES ('7', '03:01:06', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-05 03:01:06', '2015-01-05 03:01:06', '192.168.56.1', '216', 'administrator');
INSERT INTO "loginlog" VALUES ('3', '03:01:28', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-05 03:01:28', '2015-01-05 03:01:28', '192.168.56.1', '217', 'adminunit2');
INSERT INTO "loginlog" VALUES ('2', '03:01:46', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-05 03:01:46', '2015-01-05 03:01:46', '192.168.56.1', '218', 'adminunit1');
INSERT INTO "loginlog" VALUES ('1', '04:01:43', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-05 04:01:43', '2015-01-05 04:01:43', '192.168.56.1', '219', 'admin');
INSERT INTO "loginlog" VALUES ('7', '04:01:04', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-05 04:01:04', '2015-01-05 04:01:04', '192.168.56.1', '220', 'administrator');
INSERT INTO "loginlog" VALUES ('1', '11:01:41', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-05 11:01:41', '2015-01-05 11:01:41', '192.168.56.1', '221', 'admin');
INSERT INTO "loginlog" VALUES ('2', '11:01:13', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-05 11:01:13', '2015-01-05 11:01:13', '192.168.56.1', '222', 'adminunit1');
INSERT INTO "loginlog" VALUES ('3', '11:01:41', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-05 11:01:41', '2015-01-05 11:01:41', '192.168.56.1', '223', 'adminunit2');
INSERT INTO "loginlog" VALUES ('1', '11:01:35', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-05 11:01:35', '2015-01-05 11:01:35', '192.168.56.1', '224', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:01:27', '2015-01-05', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-05 11:01:27', '2015-01-05 11:01:27', '192.168.56.1', '225', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:01:56', '2015-01-05', '01', '2015', '1', 'Firefox', '34.0', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0', null, null, '2015-01-05 11:01:56', '2015-01-05 11:01:56', '192.168.56.1', '226', 'admin');
INSERT INTO "loginlog" VALUES ('3', '11:01:40', '2015-01-05', '01', '2015', '1', 'Firefox', '34.0', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0', null, null, '2015-01-05 11:01:40', '2015-01-05 11:01:40', '192.168.56.1', '227', 'adminunit2');
INSERT INTO "loginlog" VALUES ('3', '19:01:05', '2015-01-06', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-06 19:01:05', '2015-01-06 19:01:05', '192.168.56.1', '228', 'adminunit2');
INSERT INTO "loginlog" VALUES ('1', '09:01:58', '2015-01-14', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-14 09:01:58', '2015-01-14 09:01:58', '192.168.56.1', '229', 'admin');
INSERT INTO "loginlog" VALUES ('7', '10:01:05', '2015-01-14', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-14 10:01:05', '2015-01-14 10:01:05', '192.168.56.1', '230', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '11:01:46', '2015-01-14', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-14 11:01:46', '2015-01-14 11:01:46', '192.168.56.1', '231', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '11:01:35', '2015-01-14', '01', '2015', '1', 'Chrome', '39.0.2171.95', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36', null, null, '2015-01-14 11:01:35', '2015-01-14 11:01:35', '192.168.56.1', '232', 'administrator');
INSERT INTO "loginlog" VALUES ('1', '20:01:00', '2015-01-17', '01', '2015', '1', 'Chrome', '39.0.2171.99', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36', null, null, '2015-01-17 20:01:00', '2015-01-17 20:01:00', '192.168.56.1', '233', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:01:53', '2015-01-24', '01', '2015', '1', 'Chrome', '39.0.2171.99', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36', null, null, '2015-01-24 15:01:53', '2015-01-24 15:01:53', '192.168.56.1', '234', 'admin');
INSERT INTO "loginlog" VALUES ('7', '15:01:35', '2015-01-24', '01', '2015', '1', 'Chrome', '39.0.2171.99', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36', null, null, '2015-01-24 15:01:35', '2015-01-24 15:01:35', '192.168.56.1', '235', 'administrator');
INSERT INTO "loginlog" VALUES ('1', '10:01:02', '2015-01-31', '01', '2015', '1', 'Chrome', '40.0.2214.94', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36', null, null, '2015-01-31 10:01:02', '2015-01-31 10:01:02', '192.168.56.1', '236', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:02:49', '2015-02-01', '02', '2015', '1', 'Chrome', '40.0.2214.94', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36', null, null, '2015-02-01 15:02:49', '2015-02-01 15:02:49', '192.168.56.1', '237', 'admin');
INSERT INTO "loginlog" VALUES ('7', '13:02:34', '2015-02-05', '02', '2015', '1', 'Chrome', '40.0.2214.94', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36', null, null, '2015-02-05 13:02:34', '2015-02-05 13:02:34', '192.168.56.1', '238', 'administrator');
INSERT INTO "loginlog" VALUES ('1', '06:02:39', '2015-02-16', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', null, null, '2015-02-16 06:02:39', '2015-02-16 06:02:39', '192.168.56.1', '239', 'admin');
INSERT INTO "loginlog" VALUES ('1', '09:02:50', '2015-02-16', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', null, null, '2015-02-16 09:02:50', '2015-02-16 09:02:50', '192.168.56.1', '240', 'admin');
INSERT INTO "loginlog" VALUES ('1', '11:02:16', '2015-02-22', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', null, null, '2015-02-22 11:02:16', '2015-02-22 11:02:16', '192.168.56.1', '241', 'admin');
INSERT INTO "loginlog" VALUES ('1', '15:02:46', '2015-02-25', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', null, null, '2015-02-25 15:02:46', '2015-02-25 15:02:46', '192.168.56.1', '242', 'admin');
INSERT INTO "loginlog" VALUES ('3', '15:02:58', '2015-02-25', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', null, null, '2015-02-25 15:02:58', '2015-02-25 15:02:58', '192.168.56.1', '243', 'adminunit2');
INSERT INTO "loginlog" VALUES ('3', '15:02:50', '2015-02-25', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', null, null, '2015-02-25 15:02:50', '2015-02-25 15:02:50', '192.168.56.1', '244', 'adminunit2');
INSERT INTO "loginlog" VALUES ('1', '17:02:30', '2015-02-25', '02', '2015', '1', 'Chrome', '29.0.1547.72', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36', null, null, '2015-02-25 17:02:30', '2015-02-25 17:02:30', '192.168.56.1', '245', 'admin');
INSERT INTO "loginlog" VALUES ('1', '17:02:40', '2015-02-25', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', null, null, '2015-02-25 17:02:40', '2015-02-25 17:02:40', '192.168.56.1', '246', 'admin');
INSERT INTO "loginlog" VALUES ('3', '22:02:30', '2015-02-25', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', null, null, '2015-02-25 22:02:30', '2015-02-25 22:02:30', '192.168.56.1', '247', 'adminunit2');
INSERT INTO "loginlog" VALUES ('3', '22:02:29', '2015-02-25', '02', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', null, null, '2015-02-25 22:02:29', '2015-02-25 22:02:29', '192.168.56.1', '248', 'adminunit2');
INSERT INTO "loginlog" VALUES ('3', '12:03:13', '2015-03-02', '03', '2015', '1', 'Chrome', '40.0.2214.111', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', null, null, '2015-03-02 12:03:13', '2015-03-02 12:03:13', '192.168.56.1', '249', 'adminunit2');
INSERT INTO "loginlog" VALUES ('1', '09:03:22', '2015-03-04', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', null, null, '2015-03-04 09:03:22', '2015-03-04 09:03:22', '192.168.56.1', '250', 'admin');
INSERT INTO "loginlog" VALUES ('7', '09:03:12', '2015-03-04', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', null, null, '2015-03-04 09:03:12', '2015-03-04 09:03:12', '192.168.56.1', '251', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '17:03:24', '2015-03-06', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', null, null, '2015-03-06 17:03:24', '2015-03-06 17:03:24', '192.168.56.1', '252', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '17:03:28', '2015-03-06', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', null, null, '2015-03-06 17:03:28', '2015-03-06 17:03:28', '192.168.56.1', '253', 'administrator');
INSERT INTO "loginlog" VALUES ('1', '16:03:58', '2015-03-11', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', null, null, '2015-03-11 16:03:58', '2015-03-11 16:03:58', '192.168.56.1', '254', 'admin');
INSERT INTO "loginlog" VALUES ('7', '18:03:40', '2015-03-11', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', null, null, '2015-03-11 18:03:40', '2015-03-11 18:03:40', '192.168.56.1', '255', 'administrator');
INSERT INTO "loginlog" VALUES ('1', '02:03:16', '2015-03-13', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', null, null, '2015-03-13 02:03:16', '2015-03-13 02:03:16', '192.168.56.1', '256', 'admin');
INSERT INTO "loginlog" VALUES ('7', '02:03:52', '2015-03-13', '03', '2015', '1', 'Chrome', '40.0.2214.115', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36', null, null, '2015-03-13 02:03:52', '2015-03-13 02:03:52', '192.168.56.1', '257', 'administrator');
INSERT INTO "loginlog" VALUES ('1', '11:03:43', '2015-03-13', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-03-13 11:03:43', '2015-03-13 11:03:43', '192.168.56.1', '258', 'admin');
INSERT INTO "loginlog" VALUES ('7', '11:03:59', '2015-03-13', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-03-13 11:03:59', '2015-03-13 11:03:59', '192.168.56.1', '259', 'administrator');
INSERT INTO "loginlog" VALUES ('1', '11:03:19', '2015-03-14', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-03-14 11:03:19', '2015-03-14 11:03:19', '192.168.56.1', '260', 'admin');
INSERT INTO "loginlog" VALUES ('7', '12:03:20', '2015-03-14', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-03-14 12:03:20', '2015-03-14 12:03:20', '192.168.56.1', '261', 'administrator');
INSERT INTO "loginlog" VALUES ('1', '10:03:29', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-03-21 10:03:29', '2015-03-21 10:03:29', '192.168.56.1', '262', 'admin');
INSERT INTO "loginlog" VALUES ('2', '10:03:49', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-03-21 10:03:49', '2015-03-21 10:03:49', '192.168.56.1', '263', 'adminunit1');
INSERT INTO "loginlog" VALUES ('2', '10:03:12', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-03-21 10:03:12', '2015-03-21 10:03:12', '192.168.56.1', '264', 'adminunit1');
INSERT INTO "loginlog" VALUES ('7', '10:03:20', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-03-21 10:03:20', '2015-03-21 10:03:20', '192.168.56.1', '265', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '10:03:12', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-03-21 10:03:12', '2015-03-21 10:03:12', '192.168.56.1', '266', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '12:03:25', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-03-21 12:03:25', '2015-03-21 12:03:25', '192.168.56.1', '267', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '12:03:01', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-03-21 12:03:01', '2015-03-21 12:03:01', '192.168.56.1', '268', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '12:03:37', '2015-03-21', '03', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.56.111/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-03-21 12:03:37', '2015-03-21 12:03:37', '192.168.56.1', '269', 'administrator');
INSERT INTO "loginlog" VALUES ('11', '19:04:25', '2015-04-16', '04', '2015', '1', 'Chrome', '41.0.2272.118', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36', null, null, '2015-04-16 19:04:25', '2015-04-16 19:04:25', '192.168.56.1', '270', 'adminsmk');
INSERT INTO "loginlog" VALUES ('1', '08:04:07', '2015-04-17', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-17 08:04:07', '2015-04-17 08:04:07', '192.168.56.1', '271', 'admin');
INSERT INTO "loginlog" VALUES ('11', '08:04:45', '2015-04-17', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-17 08:04:45', '2015-04-17 08:04:45', '192.168.56.1', '272', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '00:04:34', '2015-04-20', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-20 00:04:34', '2015-04-20 00:04:34', '192.168.56.1', '273', 'adminsmk');
INSERT INTO "loginlog" VALUES ('7', '10:04:56', '2015-04-20', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-20 10:04:56', '2015-04-20 10:04:56', '192.168.56.1', '274', 'administrator');
INSERT INTO "loginlog" VALUES ('11', '12:04:37', '2015-04-20', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-20 12:04:37', '2015-04-20 12:04:37', '192.168.56.1', '275', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '23:04:06', '2015-04-21', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-21 23:04:06', '2015-04-21 23:04:06', '192.168.56.1', '276', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '09:04:24', '2015-04-22', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-22 09:04:24', '2015-04-22 09:04:24', '192.168.56.1', '277', 'adminsmk');
INSERT INTO "loginlog" VALUES ('1', '10:04:08', '2015-04-22', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-22 10:04:08', '2015-04-22 10:04:08', '192.168.1.5', '278', 'admin');
INSERT INTO "loginlog" VALUES ('7', '10:04:33', '2015-04-22', '04', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-04-22 10:04:33', '2015-04-22 10:04:33', '192.168.1.100', '279', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '10:04:54', '2015-04-22', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-22 10:04:54', '2015-04-22 10:04:54', '192.168.1.5', '280', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '11:04:44', '2015-04-22', '04', '2015', '1', 'Chrome', '41.0.2272.89', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36', null, null, '2015-04-22 11:04:44', '2015-04-22 11:04:44', '192.168.1.100', '281', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '13:04:52', '2015-04-23', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-23 13:04:52', '2015-04-23 13:04:52', '192.168.56.1', '282', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '11:04:36', '2015-04-24', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-24 11:04:36', '2015-04-24 11:04:36', '192.168.56.1', '283', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '01:04:01', '2015-04-26', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-26 01:04:01', '2015-04-26 01:04:01', '192.168.56.1', '284', 'administrator');
INSERT INTO "loginlog" VALUES ('1', '17:04:11', '2015-04-26', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-26 17:04:11', '2015-04-26 17:04:11', '192.168.56.1', '285', 'admin');
INSERT INTO "loginlog" VALUES ('1', '17:04:28', '2015-04-26', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-26 17:04:28', '2015-04-26 17:04:28', '192.168.56.1', '286', 'admin');
INSERT INTO "loginlog" VALUES ('7', '17:04:31', '2015-04-26', '04', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-04-26 17:04:31', '2015-04-26 17:04:31', '192.168.56.1', '287', 'administrator');
INSERT INTO "loginlog" VALUES ('11', '20:05:03', '2015-05-03', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-05-03 20:05:03', '2015-05-03 20:05:03', '192.168.56.1', '288', 'adminsmk');
INSERT INTO "loginlog" VALUES ('7', '20:05:52', '2015-05-03', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-05-03 20:05:52', '2015-05-03 20:05:52', '192.168.56.1', '289', 'administrator');
INSERT INTO "loginlog" VALUES ('11', '20:05:43', '2015-05-03', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-05-03 20:05:43', '2015-05-03 20:05:43', '192.168.56.1', '290', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '11:05:43', '2015-05-04', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-05-04 11:05:43', '2015-05-04 11:05:43', '::1', '291', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '11:05:55', '2015-05-04', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-05-04 11:05:55', '2015-05-04 11:05:55', '::1', '292', 'adminsmk');
INSERT INTO "loginlog" VALUES ('7', '11:05:50', '2015-05-04', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', null, null, '2015-05-04 11:05:50', '2015-05-04 11:05:50', '192.168.1.3', '293', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '14:05:06', '2015-05-04', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://localhost/aktiva/login', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-05-04 14:05:06', '2015-05-04 14:05:06', '::1', '294', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '15:05:13', '2015-05-04', '05', '2015', '1', 'Safari', '534.11', 'BlackBerry', '', 'http://192.168.1.100/aktiva/login', 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9320; id) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.398 Mobile Safari/534.11+', null, null, '2015-05-04 15:05:13', '2015-05-04 15:05:13', '192.168.1.8', '295', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '12:05:29', '2015-05-07', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://localhost/aktiva/index.php/login', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', null, null, '2015-05-07 12:05:29', '2015-05-07 12:05:29', '::1', '296', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '12:05:34', '2015-05-07', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', null, null, '2015-05-07 12:05:34', '2015-05-07 12:05:34', '192.168.1.3', '297', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '12:05:17', '2015-05-07', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://192.168.1.100/aktiva/login', 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', null, null, '2015-05-07 12:05:17', '2015-05-07 12:05:17', '192.168.1.3', '298', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '13:05:32', '2015-05-07', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://localhost/aktiva/login', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', null, null, '2015-05-07 13:05:32', '2015-05-07 13:05:32', '::1', '299', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '13:05:54', '2015-05-07', '05', '2015', '1', 'Chrome', '42.0.2311.90', '', '', 'http://192.168.1.100/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36', null, null, '2015-05-07 13:05:54', '2015-05-07 13:05:54', '192.168.1.10', '300', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '13:05:46', '2015-05-07', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://192.168.1.100/aktiva/login', 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', null, null, '2015-05-07 13:05:46', '2015-05-07 13:05:46', '192.168.1.3', '301', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '14:05:11', '2015-05-20', '05', '2015', '1', 'Chrome', '42.0.2311.135', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36', null, null, '2015-05-20 14:05:11', '2015-05-20 14:05:11', '192.168.56.1', '302', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '18:08:09', '2015-08-10', '08', '2015', '1', 'Chrome', '44.0.2403.130', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Safari/537.36', null, null, '2015-08-10 18:08:09', '2015-08-10 18:08:09', '192.168.56.1', '303', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '18:08:00', '2015-08-10', '08', '2015', '1', 'Chrome', '44.0.2403.130', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Safari/537.36', null, null, '2015-08-10 18:08:00', '2015-08-10 18:08:00', '192.168.56.1', '304', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '20:09:57', '2015-09-06', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.112/aktiva/login/', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', null, null, '2015-09-06 20:09:57', '2015-09-06 20:09:57', '192.168.56.1', '305', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '22:09:05', '2015-09-06', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', null, null, '2015-09-06 22:09:05', '2015-09-06 22:09:05', '192.168.56.1', '306', 'administrator');
INSERT INTO "loginlog" VALUES ('7', '22:09:52', '2015-09-06', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', null, null, '2015-09-06 22:09:52', '2015-09-06 22:09:52', '192.168.56.1', '307', 'administrator');
INSERT INTO "loginlog" VALUES ('11', '22:09:15', '2015-09-06', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.112/aktiva/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', null, null, '2015-09-06 22:09:15', '2015-09-06 22:09:15', '192.168.56.1', '308', 'adminsmk');
INSERT INTO "loginlog" VALUES ('7', '09:09:36', '2015-09-07', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', null, null, '2015-09-07 09:09:36', '2015-09-07 09:09:36', '192.168.56.1', '309', 'administrator');
INSERT INTO "loginlog" VALUES ('11', '09:09:47', '2015-09-07', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', null, null, '2015-09-07 09:09:47', '2015-09-07 09:09:47', '192.168.56.1', '310', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '09:09:20', '2015-09-07', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', null, null, '2015-09-07 09:09:20', '2015-09-07 09:09:20', '192.168.56.1', '311', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '09:09:09', '2015-09-07', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', null, null, '2015-09-07 09:09:09', '2015-09-07 09:09:09', '192.168.56.1', '312', 'adminsmk');
INSERT INTO "loginlog" VALUES ('7', '11:09:25', '2015-09-07', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', null, null, '2015-09-07 11:09:25', '2015-09-07 11:09:25', '192.168.56.1', '313', 'administrator');
INSERT INTO "loginlog" VALUES ('11', '11:09:56', '2015-09-07', '09', '2015', '1', 'Chrome', '45.0.2454.85', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36', null, null, '2015-09-07 11:09:56', '2015-09-07 11:09:56', '192.168.56.1', '314', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '09:11:28', '2015-11-12', '11', '2015', '1', 'Chrome', '46.0.2490.80', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36', null, null, '2015-11-12 09:11:28', '2015-11-12 09:11:28', '192.168.56.1', '315', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '13:11:16', '2015-11-12', '11', '2015', '1', 'Chrome', '46.0.2490.80', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36', null, null, '2015-11-12 13:11:16', '2015-11-12 13:11:16', '192.168.56.1', '316', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '13:11:16', '2015-11-13', '11', '2015', '1', 'Chrome', '46.0.2490.86', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36', null, null, '2015-11-13 13:11:16', '2015-11-13 13:11:16', '192.168.56.1', '317', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '13:11:25', '2015-11-16', '11', '2015', '1', 'Chrome', '46.0.2490.86', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36', null, null, '2015-11-16 13:11:25', '2015-11-16 13:11:25', '192.168.56.1', '318', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '13:11:08', '2015-11-19', '11', '2015', '1', 'Chrome', '46.0.2490.86', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36', null, null, '2015-11-19 13:11:08', '2015-11-19 13:11:08', '192.168.56.1', '319', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '12:12:35', '2015-12-04', '12', '2015', '1', 'Chrome', '46.0.2490.86', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36', null, null, '2015-12-04 12:12:35', '2015-12-04 12:12:35', '192.168.56.1', '320', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '12:12:06', '2015-12-16', '12', '2015', '1', 'Chrome', '47.0.2526.80', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36', null, null, '2015-12-16 12:12:06', '2015-12-16 12:12:06', '192.168.56.1', '321', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '10:12:24', '2015-12-23', '12', '2015', '1', 'Chrome', '47.0.2526.106', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36', null, null, '2015-12-23 10:12:24', '2015-12-23 10:12:24', '192.168.56.1', '322', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '11:12:36', '2015-12-23', '12', '2015', '1', 'Chrome', '47.0.2526.106', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36', null, null, '2015-12-23 11:12:36', '2015-12-23 11:12:36', '192.168.56.1', '323', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '19:01:23', '2016-01-04', '01', '2016', '1', 'Chrome', '47.0.2526.106', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36', null, null, '2016-01-04 19:01:23', '2016-01-04 19:01:23', '192.168.56.1', '324', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '18:01:48', '2016-01-17', '01', '2016', '1', 'Chrome', '47.0.2526.106', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36', null, null, '2016-01-17 18:01:48', '2016-01-17 18:01:48', '192.168.56.1', '325', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '21:01:26', '2016-01-27', '01', '2016', '1', 'Firefox', '43.0', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:43.0) Gecko/20100101 Firefox/43.0', null, null, '2016-01-27 21:01:26', '2016-01-27 21:01:26', '192.168.56.1', '326', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '11:02:11', '2016-02-22', '02', '2016', '1', 'Chrome', '48.0.2564.109', '', '', 'http://192.168.56.105/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36', null, null, '2016-02-22 11:02:11', '2016-02-22 11:02:11', '192.168.56.1', '327', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '11:04:09', '2016-04-26', '04', '2016', '1', 'Chrome', '50.0.2661.86', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36', null, null, '2016-04-26 11:04:09', '2016-04-26 11:04:09', '192.168.56.1', '328', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '11:04:22', '2016-04-26', '04', '2016', '1', 'Chrome', '50.0.2661.86', '', '', 'http://192.168.56.101/aktivaabg/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36', null, null, '2016-04-26 11:04:22', '2016-04-26 11:04:22', '192.168.56.1', '329', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '23:05:14', '2016-05-02', '05', '2016', '1', 'Chrome', '50.0.2661.86', '', '', 'http://192.168.56.101/aktivaabg/', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36', null, null, '2016-05-02 23:05:14', '2016-05-02 23:05:14', '192.168.56.1', '330', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '23:05:07', '2016-05-02', '05', '2016', '1', 'Chrome', '50.0.2661.86', '', '', 'http://127.0.0.1:4567/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36', null, null, '2016-05-02 23:05:07', '2016-05-02 23:05:07', '10.0.2.2', '331', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '11:10:23', '2016-10-26', '10', '2016', '1', 'Chrome', '53.0.2785.143', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36', null, null, '2016-10-26 11:10:23', '2016-10-26 11:10:23', '202.62.17.192', '332', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '10:12:34', '2016-12-01', '12', '2016', '1', 'Chrome', '54.0.2840.98', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36', null, null, '2016-12-01 10:12:34', '2016-12-01 10:12:34', '140.0.244.117', '333', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '11:12:16', '2016-12-23', '12', '2016', '1', 'Chrome', '54.0.2840.98', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36', null, null, '2016-12-23 11:12:16', '2016-12-23 11:12:16', '61.94.217.193', '334', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '16:12:25', '2016-12-25', '12', '2016', '1', 'Chrome', '55.0.2883.95', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2016-12-25 16:12:25', '2016-12-25 16:12:25', '36.88.88.2', '335', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '19:12:08', '2016-12-29', '12', '2016', '1', 'Chrome', '55.0.2883.95', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2016-12-29 19:12:08', '2016-12-29 19:12:08', '120.188.2.111', '336', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '16:12:43', '2016-12-30', '12', '2016', '1', 'Chrome', '55.0.2883.87', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', null, null, '2016-12-30 16:12:43', '2016-12-30 16:12:43', '125.165.180.104', '337', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '17:12:29', '2016-12-30', '12', '2016', '1', 'Chrome', '55.0.2883.91', 'Generic Mobile', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Linux; Android 6.0.1; Redmi 3S Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36', null, null, '2016-12-30 17:12:29', '2016-12-30 17:12:29', '120.188.95.163', '338', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '17:12:59', '2016-12-30', '12', '2016', '1', 'Chrome', '55.0.2883.91', 'Generic Mobile', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Linux; Android 6.0.1; Redmi 3S Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36', null, null, '2016-12-30 17:12:59', '2016-12-30 17:12:59', '120.188.95.163', '339', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '09:12:58', '2016-12-31', '12', '2016', '1', 'Chrome', '55.0.2883.95', '', '', 'http://202.77.123.38/dev_sc/web/aktiva/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2016-12-31 09:12:58', '2016-12-31 09:12:58', '112.215.201.189', '340', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '14:01:52', '2017-01-05', '01', '2017', '1', 'Firefox', '50.0', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0', null, null, '2017-01-05 14:01:52', '2017-01-05 14:01:52', '115.178.209.94', '341', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '14:01:57', '2017-01-05', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-05 14:01:57', '2017-01-05 14:01:57', '120.188.7.133', '342', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '21:01:32', '2017-01-05', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-05 21:01:32', '2017-01-05 21:01:32', '120.188.92.163', '343', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '08:01:15', '2017-01-06', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-06 08:01:15', '2017-01-06 08:01:15', '112.215.151.242', '344', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '14:01:39', '2017-01-06', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-06 14:01:39', '2017-01-06 14:01:39', '112.215.65.226', '345', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '14:01:26', '2017-01-09', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-09 14:01:26', '2017-01-09 14:01:26', '112.215.201.127', '346', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '03:01:58', '2017-01-10', '01', '2017', '1', 'Chrome', '55.0.2883.91', 'Generic Mobile', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Linux; Android 6.0.1; Redmi 3S Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36', null, null, '2017-01-10 03:01:58', '2017-01-10 03:01:58', '120.188.2.78', '347', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '03:01:34', '2017-01-10', '01', '2017', '1', 'Chrome', '55.0.2883.87', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', null, null, '2017-01-10 03:01:34', '2017-01-10 03:01:34', '36.78.210.110', '348', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '05:01:54', '2017-01-10', '01', '2017', '1', 'Firefox', '50.0', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0', null, null, '2017-01-10 05:01:54', '2017-01-10 05:01:54', '180.244.10.130', '349', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '05:01:26', '2017-01-10', '01', '2017', '1', 'Chrome', '55.0.2883.87', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', null, null, '2017-01-10 05:01:26', '2017-01-10 05:01:26', '120.188.93.1', '350', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '02:01:17', '2017-01-11', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-11 02:01:17', '2017-01-11 02:01:17', '112.215.45.231', '351', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '03:01:36', '2017-01-11', '01', '2017', '1', 'Chrome', '55.0.2883.87', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', null, null, '2017-01-11 03:01:36', '2017-01-11 03:01:36', '115.178.198.209', '352', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '14:01:12', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://localhost:8888/nusafin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-26 14:01:12', '2017-01-26 14:01:12', '::1', '363', 'staff');
INSERT INTO "loginlog" VALUES ('7', '14:01:54', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://localhost:8888/nusafin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-26 14:01:54', '2017-01-26 14:01:54', '::1', '362', 'administrator');
INSERT INTO "loginlog" VALUES ('11', '05:01:45', '2017-01-16', '01', '2017', '1', 'Chrome', '55.0.2883.87', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', null, null, '2017-01-16 05:01:45', '2017-01-16 05:01:45', '39.254.141.254', '353', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '11:01:53', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://app.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-26 11:01:53', '2017-01-26 11:01:53', '114.4.82.232', '358', 'staff');
INSERT INTO "loginlog" VALUES ('11', '12:01:26', '2017-01-16', '01', '2017', '1', 'Chrome', '55.0.2883.87', '', '', 'http://103.56.206.205/ssaccounting/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', null, null, '2017-01-16 12:01:26', '2017-01-16 12:01:26', '115.178.209.117', '354', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '14:01:34', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://localhost:8888/nusafin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-26 14:01:34', '2017-01-26 14:01:34', '::1', '361', 'staff');
INSERT INTO "loginlog" VALUES ('11', '11:01:01', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://app.nusafin.com/', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-26 11:01:01', '2017-01-26 11:01:01', '114.4.82.232', '360', 'staff');
INSERT INTO "loginlog" VALUES ('11', '11:01:27', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://app.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-26 11:01:27', '2017-01-26 11:01:27', '114.4.82.232', '359', 'staff');
INSERT INTO "loginlog" VALUES ('11', '19:01:57', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://localhost:8888/nusafin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-26 19:01:57', '2017-01-26 19:01:57', '::1', '364', 'staff');
INSERT INTO "loginlog" VALUES ('7', '10:01:40', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://app.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-26 10:01:40', '2017-01-26 10:01:40', '114.4.82.232', '357', 'administrator');
INSERT INTO "loginlog" VALUES ('11', '09:01:34', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://app.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-26 09:01:34', '2017-01-26 09:01:34', '114.4.82.232', '355', 'adminsmk');
INSERT INTO "loginlog" VALUES ('11', '10:01:37', '2017-01-26', '01', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://app.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-01-26 10:01:37', '2017-01-26 10:01:37', '114.4.82.232', '356', 'staff');
INSERT INTO "loginlog" VALUES ('11', '10:01:50', '2017-01-30', '01', '2017', '1', 'Safari', '602.4.8', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/602.4.8 (KHTML, like Gecko) Version/10.0.3 Safari/602.4.8', null, null, '2017-01-30 10:01:50', '2017-01-30 10:01:50', '110.138.88.29', '365', 'staff');
INSERT INTO "loginlog" VALUES ('7', '14:02:01', '2017-02-06', '02', '2017', '1', 'Chrome', '55.0.2883.95', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', null, null, '2017-02-06 14:02:01', '2017-02-06 14:02:01', '182.253.162.193', '366', 'administrator');
INSERT INTO "loginlog" VALUES ('11', '08:02:13', '2017-02-13', '02', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-02-13 08:02:13', '2017-02-13 08:02:13', '120.188.35.195', '367', 'staff');
INSERT INTO "loginlog" VALUES ('11', '08:02:51', '2017-02-13', '02', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-02-13 08:02:51', '2017-02-13 08:02:51', '120.188.35.195', '368', 'staff');
INSERT INTO "loginlog" VALUES ('11', '08:02:49', '2017-02-13', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-02-13 08:02:49', '2017-02-13 08:02:49', '125.161.143.41', '369', 'staff');
INSERT INTO "loginlog" VALUES ('11', '16:02:31', '2017-02-13', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-02-13 16:02:31', '2017-02-13 16:02:31', '125.161.143.41', '370', 'staff');
INSERT INTO "loginlog" VALUES ('11', '17:02:00', '2017-02-16', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-02-16 17:02:00', '2017-02-16 17:02:00', '223.255.229.6', '371', 'staff');
INSERT INTO "loginlog" VALUES ('11', '17:02:58', '2017-02-16', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-02-16 17:02:58', '2017-02-16 17:02:58', '110.136.58.103', '372', 'staff');
INSERT INTO "loginlog" VALUES ('11', '18:02:58', '2017-02-16', '02', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-02-16 18:02:58', '2017-02-16 18:02:58', '120.188.7.221', '373', 'staff');
INSERT INTO "loginlog" VALUES ('11', '16:02:50', '2017-02-17', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-02-17 16:02:50', '2017-02-17 16:02:50', '110.136.58.103', '374', 'staff');
INSERT INTO "loginlog" VALUES ('11', '21:02:13', '2017-02-17', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-02-17 21:02:13', '2017-02-17 21:02:13', '110.136.58.103', '375', 'staff');
INSERT INTO "loginlog" VALUES ('11', '23:02:56', '2017-02-17', '02', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-02-17 23:02:56', '2017-02-17 23:02:56', '110.136.58.103', '376', 'staff');
INSERT INTO "loginlog" VALUES ('11', '01:02:38', '2017-02-23', '02', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-02-23 01:02:38', '2017-02-23 01:02:38', '39.250.126.199', '377', 'staff');
INSERT INTO "loginlog" VALUES ('11', '17:03:10', '2017-03-01', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-01 17:03:10', '2017-03-01 17:03:10', '112.215.200.127', '378', 'staff');
INSERT INTO "loginlog" VALUES ('11', '18:03:26', '2017-03-01', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-03-01 18:03:26', '2017-03-01 18:03:26', '223.255.230.13', '379', 'staff');
INSERT INTO "loginlog" VALUES ('11', '22:03:06', '2017-03-03', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-03 22:03:06', '2017-03-03 22:03:06', '120.188.67.126', '380', 'staff');
INSERT INTO "loginlog" VALUES ('11', '16:03:19', '2017-03-05', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-05 16:03:19', '2017-03-05 16:03:19', '120.188.67.199', '381', 'staff');
INSERT INTO "loginlog" VALUES ('11', '21:03:27', '2017-03-06', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-03-06 21:03:27', '2017-03-06 21:03:27', '36.69.76.0', '382', 'staff');
INSERT INTO "loginlog" VALUES ('11', '21:03:51', '2017-03-06', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-06 21:03:51', '2017-03-06 21:03:51', '36.69.76.0', '383', 'staff');
INSERT INTO "loginlog" VALUES ('11', '00:03:06', '2017-03-07', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-07 00:03:06', '2017-03-07 00:03:06', '36.69.76.0', '384', 'staff');
INSERT INTO "loginlog" VALUES ('11', '11:03:13', '2017-03-07', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-03-07 11:03:13', '2017-03-07 11:03:13', '36.70.216.88', '385', 'staff');
INSERT INTO "loginlog" VALUES ('11', '17:03:37', '2017-03-07', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-03-07 17:03:37', '2017-03-07 17:03:37', '110.136.99.96', '386', 'staff');
INSERT INTO "loginlog" VALUES ('11', '18:03:09', '2017-03-07', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-03-07 18:03:09', '2017-03-07 18:03:09', '110.136.99.96', '387', 'staff');
INSERT INTO "loginlog" VALUES ('11', '02:03:55', '2017-03-08', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-08 02:03:55', '2017-03-08 02:03:55', '120.188.65.82', '388', 'staff');
INSERT INTO "loginlog" VALUES ('11', '18:03:31', '2017-03-08', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-08 18:03:31', '2017-03-08 18:03:31', '120.188.64.21', '389', 'staff');
INSERT INTO "loginlog" VALUES ('11', '22:03:17', '2017-03-08', '03', '2017', '0', 'Chrome', '56.12.2924.87', '', '', '', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.12.2924.87 Safari/537.36', null, null, '2017-03-08 22:03:17', '2017-03-08 22:03:17', '172.98.84.199', '390', 'staff');
INSERT INTO "loginlog" VALUES ('11', '22:03:56', '2017-03-08', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-03-08 22:03:56', '2017-03-08 22:03:56', '110.136.99.96', '391', 'staff');
INSERT INTO "loginlog" VALUES ('11', '22:03:02', '2017-03-08', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-08 22:03:02', '2017-03-08 22:03:02', '110.136.99.96', '392', 'staff');
INSERT INTO "loginlog" VALUES ('11', '22:03:20', '2017-03-08', '03', '2017', '1', 'Firefox', '51.0', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0', null, null, '2017-03-08 22:03:20', '2017-03-08 22:03:20', '110.136.99.96', '393', 'staff');
INSERT INTO "loginlog" VALUES ('11', '22:03:06', '2017-03-08', '03', '2017', '1', 'Chrome', '51.0.2704.79', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393', null, null, '2017-03-08 22:03:06', '2017-03-08 22:03:06', '110.136.99.96', '394', 'staff');
INSERT INTO "loginlog" VALUES ('11', '01:03:18', '2017-03-09', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-09 01:03:18', '2017-03-09 01:03:18', '120.188.66.37', '395', 'staff');
INSERT INTO "loginlog" VALUES ('11', '01:03:16', '2017-03-09', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://dev.nusafin.com/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-09 01:03:16', '2017-03-09 01:03:16', '120.188.66.37', '396', 'staff');
INSERT INTO "loginlog" VALUES ('11', '18:03:44', '2017-03-08', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://localhost:8888/redsfin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-08 18:03:44', '2017-03-08 18:03:44', '::1', '397', 'staff');
INSERT INTO "loginlog" VALUES ('11', '18:03:22', '2017-03-08', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://localhost:8888/redsfin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-08 18:03:22', '2017-03-08 18:03:22', '::1', '398', 'staff');
INSERT INTO "loginlog" VALUES ('11', '19:03:23', '2017-03-08', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://localhost:8888/redsfin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-08 19:03:23', '2017-03-08 19:03:23', '::1', '399', 'staff');
INSERT INTO "loginlog" VALUES ('11', '08:03:43', '2017-03-09', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://localhost:8888/redsfin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-09 08:03:43', '2017-03-09 08:03:43', '::1', '400', 'staff');
INSERT INTO "loginlog" VALUES ('11', '08:03:07', '2017-03-09', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://localhost:8888/redsfin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-09 08:03:07', '2017-03-09 08:03:07', '::1', '401', 'staff');
INSERT INTO "loginlog" VALUES ('11', '08:03:20', '2017-03-09', '03', '2017', '1', 'Chrome', '56.0.2924.87', '', '', 'http://localhost:8888/redsfin/index.php/login', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36', null, null, '2017-03-09 08:03:20', '2017-03-09 08:03:20', '::1', '402', 'staff');
COMMIT;

-- ----------------------------
--  Table structure for taxhistory
-- ----------------------------
DROP TABLE IF EXISTS "taxhistory";
CREATE TABLE "taxhistory" (
	"idtax" int4 NOT NULL,
	"taxval" float4,
	"rate" float4,
	"datein" timestamp(6) NULL,
	"idpurchase" int4,
	"idjournal" int4 NOT NULL,
	"type" varchar(20) COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "taxhistory" OWNER TO "imm";

-- ----------------------------
--  Records of taxhistory
-- ----------------------------
BEGIN;
INSERT INTO "taxhistory" VALUES ('1', '50000', '10', '2015-01-09 00:00:00', null, '379', 'pembelian');
COMMIT;

-- ----------------------------
--  View structure for v_acclinkinventory
-- ----------------------------
DROP VIEW IF EXISTS "v_acclinkinventory";
CREATE VIEW "v_acclinkinventory" AS  SELECT a.idinventory,
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

-- ----------------------------
--  View structure for v_acclinkinventory2
-- ----------------------------
DROP VIEW IF EXISTS "v_acclinkinventory2";
CREATE VIEW "v_acclinkinventory2" AS  SELECT a.idinventory,
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

-- ----------------------------
--  View structure for v_acclinkinventory3
-- ----------------------------
DROP VIEW IF EXISTS "v_acclinkinventory3";
CREATE VIEW "v_acclinkinventory3" AS  SELECT a.idinventory,
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

-- ----------------------------
--  View structure for v_inventory
-- ----------------------------
DROP VIEW IF EXISTS "v_inventory";
CREATE VIEW "v_inventory" AS  SELECT d.idunit,
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

-- ----------------------------
--  View structure for v_tunjanganpayroll
-- ----------------------------
DROP VIEW IF EXISTS "v_tunjanganpayroll";
CREATE VIEW "v_tunjanganpayroll" AS  SELECT a.display,
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

-- ----------------------------
--  View structure for v_tunjanganpayroll-bak
-- ----------------------------
DROP VIEW IF EXISTS "v_tunjanganpayroll-bak";
CREATE VIEW "v_tunjanganpayroll-bak" AS  SELECT a.idtunjangan,
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


-- ----------------------------
--  Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "seq_account" RESTART 763;
ALTER SEQUENCE "seq_amounttype" RESTART 8;
ALTER SEQUENCE "seq_asuransi" RESTART 15;
ALTER SEQUENCE "seq_asuransiemp" RESTART 20;
ALTER SEQUENCE "seq_asuransipayhistory" RESTART 68;
ALTER SEQUENCE "seq_clossing" RESTART 2319;
ALTER SEQUENCE "seq_customer" RESTART 9;
ALTER SEQUENCE "seq_dataanak" RESTART 8;
ALTER SEQUENCE "seq_datasutri" RESTART 17;
ALTER SEQUENCE "seq_disbursment" RESTART 15;
ALTER SEQUENCE "seq_employee" RESTART 16;
ALTER SEQUENCE "seq_employeetype" RESTART 19;
ALTER SEQUENCE "seq_inventory" RESTART 37;
ALTER SEQUENCE "seq_inventoryadjitem" RESTART 12;
ALTER SEQUENCE "seq_inventoryadjusment" RESTART 46;
ALTER SEQUENCE "seq_journal" RESTART 451;
ALTER SEQUENCE "seq_journalitem" RESTART 2367;
ALTER SEQUENCE "seq_linkpiutang" RESTART 10;
ALTER SEQUENCE "seq_loginlog" RESTART 403;
ALTER SEQUENCE "seq_master" RESTART 61;
ALTER SEQUENCE "seq_payroll" RESTART 56;
ALTER SEQUENCE "seq_pelanggan" RESTART 10;
ALTER SEQUENCE "seq_potongan" RESTART 26;
ALTER SEQUENCE "seq_prosesgaji" RESTART 19;
ALTER SEQUENCE "seq_purchase" RESTART 68;
ALTER SEQUENCE "seq_purchaseitem" RESTART 49;
ALTER SEQUENCE "seq_receivemoney" RESTART 67;
ALTER SEQUENCE "seq_receivemoneyimport" RESTART 20;
ALTER SEQUENCE "seq_receivemoneyitem" RESTART 79;
ALTER SEQUENCE "seq_reconcile" RESTART 19;
ALTER SEQUENCE "seq_registrasihutang" RESTART 18;
ALTER SEQUENCE "seq_registrasipiutang" RESTART 34;
ALTER SEQUENCE "seq_return" RESTART 21;
ALTER SEQUENCE "seq_riwayatpembsiswa" RESTART 8;
ALTER SEQUENCE "seq_sallary" RESTART 9;
ALTER SEQUENCE "seq_siswa" RESTART 549;
ALTER SEQUENCE "seq_siswapembayaran" RESTART 44;
ALTER SEQUENCE "seq_spendmoney" RESTART 49;
ALTER SEQUENCE "seq_spendmoneyitem" RESTART 46;
ALTER SEQUENCE "seq_supplier" RESTART 22;
ALTER SEQUENCE "seq_sys_menu" RESTART 151;
ALTER SEQUENCE "seq_tambahangaji" RESTART 12;
ALTER SEQUENCE "seq_tambahangajitype" RESTART 11;
ALTER SEQUENCE "seq_tax" RESTART 20;
ALTER SEQUENCE "seq_thr" RESTART 10;
ALTER SEQUENCE "seq_transferkas" RESTART 13;
ALTER SEQUENCE "seq_tunjangan" RESTART 40;
ALTER SEQUENCE "seq_unit" RESTART 23;
ALTER SEQUENCE "seq_upload" RESTART 23;
ALTER SEQUENCE "seq_user_id" RESTART 21;
-- ----------------------------
--  Primary key structure for table receivemoneyitem
-- ----------------------------
ALTER TABLE "receivemoneyitem" ADD PRIMARY KEY ("idreceivemoneyitem") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table employeetype
-- ----------------------------
ALTER TABLE "employeetype" ADD PRIMARY KEY ("idemployeetype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table payrollsettings
-- ----------------------------
ALTER TABLE "payrollsettings" ADD PRIMARY KEY ("payrollsettingid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table payrolltmp
-- ----------------------------
ALTER TABLE "payrolltmp" ADD PRIMARY KEY ("idemployee", "idunit") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table classificationcf
-- ----------------------------
ALTER TABLE "classificationcf" ADD PRIMARY KEY ("idclassificationcf") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table piutangpayhistory
-- ----------------------------
ALTER TABLE "piutangpayhistory" ADD PRIMARY KEY ("idregistrasipiutang", "datein") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table amounttype
-- ----------------------------
ALTER TABLE "amounttype" ADD PRIMARY KEY ("idamounttype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table frequency
-- ----------------------------
ALTER TABLE "frequency" ADD PRIMARY KEY ("idfrequency") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table thrlist
-- ----------------------------
ALTER TABLE "thrlist" ADD PRIMARY KEY ("idthr", "idemployee", "month", "year") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table inventorydeprecitem
-- ----------------------------
ALTER TABLE "inventorydeprecitem" ADD PRIMARY KEY ("iddepreciation", "idinventory", "month", "year", "idunit") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table returntype
-- ----------------------------
ALTER TABLE "returntype" ADD PRIMARY KEY ("idreturntype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table asuransi
-- ----------------------------
ALTER TABLE "asuransi" ADD PRIMARY KEY ("idasuransi") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table salesitem
-- ----------------------------
ALTER TABLE "salesitem" ADD PRIMARY KEY ("idsalesitem") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table machine
-- ----------------------------
ALTER TABLE "machine" ADD PRIMARY KEY ("machine_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table inventorycat
-- ----------------------------
ALTER TABLE "inventorycat" ADD PRIMARY KEY ("idinventorycat") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table brand
-- ----------------------------
ALTER TABLE "brand" ADD PRIMARY KEY ("brand_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table client
-- ----------------------------
ALTER TABLE "client" ADD PRIMARY KEY ("clientid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table payrolltype
-- ----------------------------
ALTER TABLE "payrolltype" ADD PRIMARY KEY ("payrolltypeid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table siswapembayaran
-- ----------------------------
ALTER TABLE "siswapembayaran" ADD PRIMARY KEY ("idsiswapembayaran") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table sys_group
-- ----------------------------
ALTER TABLE "sys_group" ADD PRIMARY KEY ("group_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table reconcile
-- ----------------------------
ALTER TABLE "reconcile" ADD PRIMARY KEY ("idreconcile") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table siswa
-- ----------------------------
ALTER TABLE "siswa" ADD PRIMARY KEY ("idsiswa") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table machine_type
-- ----------------------------
ALTER TABLE "machine_type" ADD PRIMARY KEY ("machine_type_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table payroll
-- ----------------------------
ALTER TABLE "payroll" ADD PRIMARY KEY ("idpayroll") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table accounttype
-- ----------------------------
ALTER TABLE "accounttype" ADD PRIMARY KEY ("idaccounttype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table shipping
-- ----------------------------
ALTER TABLE "shipping" ADD PRIMARY KEY ("idshipping") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table purchasetype
-- ----------------------------
ALTER TABLE "purchasetype" ADD PRIMARY KEY ("idpurchasetype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table tax
-- ----------------------------
ALTER TABLE "tax" ADD PRIMARY KEY ("idtax") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table tunjangantype
-- ----------------------------
ALTER TABLE "tunjangantype" ADD PRIMARY KEY ("idtunjtype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table hakakses
-- ----------------------------
ALTER TABLE "hakakses" ADD PRIMARY KEY ("sys_menu_id", "group_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table bussinestype
-- ----------------------------
ALTER TABLE "bussinestype" ADD PRIMARY KEY ("idbussinestype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table tambahangajitype
-- ----------------------------
ALTER TABLE "tambahangajitype" ADD PRIMARY KEY ("idtambahangajitype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table employee
-- ----------------------------
ALTER TABLE "employee" ADD PRIMARY KEY ("idemployee") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table thrlisttmp
-- ----------------------------
ALTER TABLE "thrlisttmp" ADD PRIMARY KEY ("idemployee", "month", "year") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table payrollproceed
-- ----------------------------
ALTER TABLE "payrollproceed" ADD PRIMARY KEY ("idemployee", "month", "year", "idunit") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table currency
-- ----------------------------
ALTER TABLE "currency" ADD PRIMARY KEY ("idcurrency") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table tunjangan
-- ----------------------------
ALTER TABLE "tunjangan" ADD PRIMARY KEY ("idtunjangan") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table pelanggan
-- ----------------------------
ALTER TABLE "pelanggan" ADD PRIMARY KEY ("idpelanggan") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table transferkas
-- ----------------------------
ALTER TABLE "transferkas" ADD PRIMARY KEY ("idtransferkas") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table asuransipaytype
-- ----------------------------
ALTER TABLE "asuransipaytype" ADD PRIMARY KEY ("idasuransipaytype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table asuransiemp
-- ----------------------------
ALTER TABLE "asuransiemp" ADD PRIMARY KEY ("idasuransiemp") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table jenisptkp
-- ----------------------------
ALTER TABLE "jenisptkp" ADD PRIMARY KEY ("idjenisptkp") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table journalitem
-- ----------------------------
ALTER TABLE "journalitem" ADD PRIMARY KEY ("idjournalitem") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table dataanak
-- ----------------------------
ALTER TABLE "dataanak" ADD PRIMARY KEY ("datanakid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table userunit
-- ----------------------------
ALTER TABLE "userunit" ADD PRIMARY KEY ("idunit", "user_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table inventorydeprec
-- ----------------------------
ALTER TABLE "inventorydeprec" ADD PRIMARY KEY ("iddepreciation") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table purchase
-- ----------------------------
ALTER TABLE "purchase" ADD PRIMARY KEY ("idpurchase") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table siklus
-- ----------------------------
ALTER TABLE "siklus" ADD PRIMARY KEY ("idsiklus") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table account
-- ----------------------------
ALTER TABLE "account" ADD PRIMARY KEY ("idaccount", "idunit") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table sales
-- ----------------------------
ALTER TABLE "sales" ADD PRIMARY KEY ("idsales") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table taxtype
-- ----------------------------
ALTER TABLE "taxtype" ADD PRIMARY KEY ("idtaxtype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table sys_group_menu
-- ----------------------------
ALTER TABLE "sys_group_menu" ADD PRIMARY KEY ("sys_menu_id", "group_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table payment
-- ----------------------------
ALTER TABLE "payment" ADD PRIMARY KEY ("idpayment") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table spendmoneyitem
-- ----------------------------
ALTER TABLE "spendmoneyitem" ADD PRIMARY KEY ("idspendmoneyitem") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table prosesgaji
-- ----------------------------
ALTER TABLE "prosesgaji" ADD PRIMARY KEY ("idprosesgaji") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table customertype
-- ----------------------------
ALTER TABLE "customertype" ADD PRIMARY KEY ("idcustomertype", "idunit") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table asuransitype
-- ----------------------------
ALTER TABLE "asuransitype" ADD PRIMARY KEY ("idasuransitype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table disbursment
-- ----------------------------
ALTER TABLE "disbursment" ADD PRIMARY KEY ("iddisbursment") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table returnitem
-- ----------------------------
ALTER TABLE "returnitem" ADD PRIMARY KEY ("idreturn", "idinventory") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table thr
-- ----------------------------
ALTER TABLE "thr" ADD PRIMARY KEY ("idthr") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table receivepayment
-- ----------------------------
ALTER TABLE "receivepayment" ADD PRIMARY KEY ("idreceivepayment") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table journalitemrec
-- ----------------------------
ALTER TABLE "journalitemrec" ADD PRIMARY KEY ("idjournalitemrec") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table linkedacc
-- ----------------------------
ALTER TABLE "linkedacc" ADD PRIMARY KEY ("idlinked") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table credittterm
-- ----------------------------
ALTER TABLE "credittterm" ADD PRIMARY KEY ("idcreditterm") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table unit_item
-- ----------------------------
ALTER TABLE "unit_item" ADD PRIMARY KEY ("unit_item_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table tmppurchase
-- ----------------------------
ALTER TABLE "tmppurchase" ADD PRIMARY KEY ("idjournal", "assetaccount") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table bank
-- ----------------------------
ALTER TABLE "bank" ADD PRIMARY KEY ("bank_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table sys_menu
-- ----------------------------
ALTER TABLE "sys_menu" ADD PRIMARY KEY ("sys_menu_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table tmptax
-- ----------------------------
ALTER TABLE "tmptax" ADD PRIMARY KEY ("idtax", "idjournal", "idunit") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table scheduletype
-- ----------------------------
ALTER TABLE "scheduletype" ADD PRIMARY KEY ("idscheduletype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table linkpiutang
-- ----------------------------
ALTER TABLE "linkpiutang" ADD PRIMARY KEY ("idlinkpiutang") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table month
-- ----------------------------
ALTER TABLE "month" ADD PRIMARY KEY ("idmonth") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table potongantype
-- ----------------------------
ALTER TABLE "potongantype" ADD PRIMARY KEY ("idpotongantype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table clossing
-- ----------------------------
ALTER TABLE "clossing" ADD PRIMARY KEY ("idclossing") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table journaltype
-- ----------------------------
ALTER TABLE "journaltype" ADD PRIMARY KEY ("idjournaltype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table spendmoney
-- ----------------------------
ALTER TABLE "spendmoney" ADD PRIMARY KEY ("idspendmoney") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table supplier
-- ----------------------------
ALTER TABLE "supplier" ADD PRIMARY KEY ("idsupplier") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table customer
-- ----------------------------
ALTER TABLE "customer" ADD PRIMARY KEY ("idcustomer") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table sys_user
-- ----------------------------
ALTER TABLE "sys_user" ADD PRIMARY KEY ("user_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table alerttype
-- ----------------------------
ALTER TABLE "alerttype" ADD PRIMARY KEY ("idalerttype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table purchaseitem
-- ----------------------------
ALTER TABLE "purchaseitem" ADD PRIMARY KEY ("idpurchaseitem") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table inventoryunit
-- ----------------------------
ALTER TABLE "inventoryunit" ADD PRIMARY KEY ("idinventory", "idunit") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table return
-- ----------------------------
ALTER TABLE "return" ADD PRIMARY KEY ("idreturn") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table registrasihutang
-- ----------------------------
ALTER TABLE "registrasihutang" ADD PRIMARY KEY ("idregistrasihutang") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table riwayatpembsiswa
-- ----------------------------
ALTER TABLE "riwayatpembsiswa" ADD PRIMARY KEY ("idriwayatpemb") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table pelanggantype
-- ----------------------------
ALTER TABLE "pelanggantype" ADD PRIMARY KEY ("idpelanggantype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table receivemoneyimport
-- ----------------------------
ALTER TABLE "receivemoneyimport" ADD PRIMARY KEY ("idreceivemoneyimport") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table company
-- ----------------------------
ALTER TABLE "company" ADD PRIMARY KEY ("idcompany") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table accountingdata
-- ----------------------------
ALTER TABLE "accountingdata" ADD PRIMARY KEY ("idaccountingdata") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table supplier_type
-- ----------------------------
ALTER TABLE "supplier_type" ADD PRIMARY KEY ("supplier_type_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table sextype
-- ----------------------------
ALTER TABLE "sextype" ADD PRIMARY KEY ("idsex") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table unit
-- ----------------------------
ALTER TABLE "unit" ADD PRIMARY KEY ("idunit") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table registrasipiutang
-- ----------------------------
ALTER TABLE "registrasipiutang" ADD PRIMARY KEY ("idregistrasipiutang") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table receivemoney
-- ----------------------------
ALTER TABLE "receivemoney" ADD PRIMARY KEY ("idreceivemoney") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table purchasestatus
-- ----------------------------
ALTER TABLE "purchasestatus" ADD PRIMARY KEY ("idpurchasestatus") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table journal
-- ----------------------------
ALTER TABLE "journal" ADD PRIMARY KEY ("idjournal") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table accountpos
-- ----------------------------
ALTER TABLE "accountpos" ADD PRIMARY KEY ("idpos") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table accountlog
-- ----------------------------
ALTER TABLE "accountlog" ADD PRIMARY KEY ("idaccount", "tanggal", "idjournal", "userid", "idunit") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table tambahangaji
-- ----------------------------
ALTER TABLE "tambahangaji" ADD PRIMARY KEY ("idtambahangaji") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table asuransipayhistory
-- ----------------------------
ALTER TABLE "asuransipayhistory" ADD PRIMARY KEY ("idasuransi", "idemployee", "year", "month") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table journalrec
-- ----------------------------
ALTER TABLE "journalrec" ADD PRIMARY KEY ("idjournalrec") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table package
-- ----------------------------
ALTER TABLE "package" ADD PRIMARY KEY ("packageid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table potongan
-- ----------------------------
ALTER TABLE "potongan" ADD PRIMARY KEY ("idpotongan") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table datasutri
-- ----------------------------
ALTER TABLE "datasutri" ADD PRIMARY KEY ("datasutri") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table inventory
-- ----------------------------
ALTER TABLE "inventory" ADD PRIMARY KEY ("idinventory") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table sallary
-- ----------------------------
ALTER TABLE "sallary" ADD PRIMARY KEY ("idsallary") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table upload
-- ----------------------------
ALTER TABLE "upload" ADD PRIMARY KEY ("idupload") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table accountsubtype
-- ----------------------------
ALTER TABLE "accountsubtype" ADD PRIMARY KEY ("idaccountsubtype") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table loginlog
-- ----------------------------
ALTER TABLE "loginlog" ADD PRIMARY KEY ("loginlogid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table taxhistory
-- ----------------------------
ALTER TABLE "taxhistory" ADD PRIMARY KEY ("idtax", "idjournal") NOT DEFERRABLE INITIALLY IMMEDIATE;

