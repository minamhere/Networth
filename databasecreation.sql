-- Database creation:

CREATE TABLE Jurisdiction (
   id serial NOT NULL  PRIMARY KEY,
   Name varchar(50) NOT NULL,
   Abbreviation varchar(2) NOT NULL,
   Type varchar(50) NOT NULL,
   Standard_deduction integer NOT NULL,
   Personal_exemption integer NOT NULL
);

CREATE TABLE Applicable_Tax_Jurisdictions (
   id serial NOT NULL  PRIMARY KEY,
   Personal_data_id integer NOT NULL,
   Jurisdiction_id integer NOT NULL,
   FOREIGN KEY (Personal_data_id) REFERENCES Personal_data (id),
   FOREIGN KEY (Jurisdiction_id) REFERENCES Jurisdiction (id)
);

CREATE TABLE Filing_Status (
   id serial NOT NULL  PRIMARY KEY,
   StatusName varchar(25) NOT NULL
);

CREATE TABLE Tax_Brackets (
   id serial NOT NULL  PRIMARY KEY,
   Jurisdiction_id integer NOT NULL,
   TaxYear integer NOT NULL,
   Filing_Status_id integer NOT NULL,
   MinAGI integer NOT NULL,
   MaxAGI integer NOT NULL,
   TaxRate real NOT NULL,
   FOREIGN KEY (Jurisdiction_id) REFERENCES Jurisdiction (id),
   FOREIGN KEY (Filing_Status_id) REFERENCES Filing_Status (id)
);

CREATE TABLE Pay_Schedule (
   id serial NOT NULL  PRIMARY KEY,
   ScheduleName varchar(20) NOT NULL,
   Pay_Periods_Per_Year integer NOT NULL
);

CREATE TABLE Employment_Info (
   id serial NOT NULL  PRIMARY KEY,
   Personal_data_id integer NOT NULL,
   CompanyName varchar(255) NOT NULL,
   Annual_Pay_Periods integer NOT NULL,
   Pay_Schedule_id integer NOT NULL,
   Matching_Type integer NOT NULL,
   Matching_Cap integer NOT NULL,
   Annual_Salary real NOT NULL,
   Matching_Month integer NOT NULL,
   First_Pay_Date date NOT NULL,
   FOREIGN KEY (Personal_data_id) REFERENCES Personal_data (id),
   FOREIGN KEY (Pay_Schedule_id) REFERENCES Pay_Schedule (id)
);