CREATE TABLE 'fxschool_fxdb'.'aaa' (
  'id' VARCHAR(15) NOT NULL,
  'password' VARCHAR(10) NULL,
  'name' VARCHAR(40) NULL,
  'role' VARCHAR(10) NULL,
  PRIMARY KEY ('id'));
insert into 'fxschool_fxdb'.'aaa'('admin', 'password', 'test', 'ROLE_ADMIN');