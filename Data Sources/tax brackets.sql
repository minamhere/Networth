-- 2015 Tax Brackets for all states. 
-- INSERT INTO tax_brackets (jurisdiction_id, taxyear, filing_status_id, minagi, maxagi, taxrate, base_tax) VALUES 

--Alabama
INSERT INTO tax_brackets (jurisdiction_id, taxyear, filing_status_id, minagi, maxagi, taxrate, base_tax) VALUES 
(7,2015,1,0,500,2,0),
(7,2015,1,500,3000,4,10),
(7,2015,1,3000,999999,5,100),
(7,2015,2,0,1000,2,0),
(7,2015,2,1000,6000,4,20),
(7,2015,2,6000,999999,5,200),
(7,2015,3,0,500,2,0),
(7,2015,3,500,3000,4,10),
(7,2015,3,3000,999999,5,100),
(7,2015,4,0,500,2,0),
(7,2015,4,500,3000,4,10),
(7,2015,4,3000,999999,5,100);

 --Alaska
INSERT INTO tax_brackets (jurisdiction_id, taxyear, filing_status_id, minagi, maxagi, taxrate, base_tax) VALUES 
(8,2015,1,0,999999,0,0),
(8,2015,2,0,999999,0,0),
(8,2015,3,0,999999,0,0),
(8,2015,4,0,999999,0,0);

--Arizona
INSERT INTO tax_brackets (jurisdiction_id, taxyear, filing_status_id, minagi, maxagi, taxrate, base_tax) VALUES 
(9,2015,1,0,10000,2.59,0),
(9,2015,1,10000,25000,2.88,259),
(9,2015,1,25000,50000,3.36,691),
(9,2015,1,50000,150000,4.24,1531),
(9,2015,1,150000,999999,4.54,5771),
(9,2015,2,0,20000,2.59,0),
(9,2015,2,20000,50000,2.88,518),
(9,2015,2,50000,100000,3.36,1382),
(9,2015,2,100000,300000,4.24,3062),
(9,2015,2,300000,999999,4.54,11542),
(9,2015,3,0,10000,2.59,0),
(9,2015,3,10000,25000,2.88,259),
(9,2015,3,25000,50000,3.36,691),
(9,2015,3,50000,150000,4.24,1531),
(9,2015,3,150000,999999,4.54,5771),
(9,2015,4,0,10000,2.59,0),
(9,2015,4,10000,25000,2.88,259),
(9,2015,4,25000,50000,3.36,691),
(9,2015,4,50000,150000,4.24,1531),
(9,2015,4,150000,999999,4.54,5771);

--Arkansas
 INSERT INTO tax_brackets (jurisdiction_id, taxyear, filing_status_id, minagi, maxagi, taxrate, base_tax) VALUES 
(10,2015,1,0,4299,0.9,0),
(10,2015,1,4299,8399,2.5,38.691),
(10,2015,1,8399,12599,3.5,141.191),
(10,2015,1,12599,20999,4.5,288.191),
(10,2015,1,20999,35099,6,666.191),
(10,2015,1,35099,999999,7,1512.191),
(10,2015,2,0,4299,0.9,0),
(10,2015,2,4299,8399,2.5,38.691),
(10,2015,2,8399,12599,3.5,141.191),
(10,2015,2,12599,20999,4.5,288.191),
(10,2015,2,20999,35099,6,666.191),
(10,2015,2,35099,999999,7,1512.191),
(10,2015,3,0,4299,0.9,0),
(10,2015,3,4299,8399,2.5,38.691),
(10,2015,3,8399,12599,3.5,141.191),
(10,2015,3,12599,20999,4.5,288.191),
(10,2015,3,20999,35099,6,666.191),
(10,2015,3,35099,999999,7,1512.191),
(10,2015,4,0,4299,0.9,0),
(10,2015,4,4299,8399,2.5,38.691),
(10,2015,4,8399,12599,3.5,141.191),
(10,2015,4,12599,20999,4.5,288.191),
(10,2015,4,20999,35099,6,666.191),
(10,2015,4,35099,999999,7,1512.191);

--California
INSERT INTO tax_brackets (jurisdiction_id, taxyear, filing_status_id, minagi, maxagi, taxrate, base_tax) VALUES 
(11,2015,1,0,7749,1,0),
(11,2015,1,7749,18371,2,77.49),
(11,2015,1,18371,28995,4,289.93),
(11,2015,1,28995,40250,6,714.89),
(11,2015,1,40250,50869,8,1390.19),
(11,2015,1,50869,259844,9.3,2239.71),
(11,2015,1,259844,311812,10.3,21674.385),
(11,2015,1,311812,519687,11.3,27027.089),
(11,2015,1,519687,1000000,12.3,50516.964),
(11,2015,1,1000000,9999999,13.3,109595.463),
(11,2015,2,0,15498,1,0),
(11,2015,2,15498,36742,2,154.98),
(11,2015,2,36742,57990,4,579.86),
(11,2015,2,57990,80500,6,1429.78),
(11,2015,2,80500,101738,8,2780.38),
(11,2015,2,101738,519688,9.3,4479.42),
(11,2015,2,519688,623624,10.3,43348.77),
(11,2015,2,623624,1000000,11.3,54054.178),
(11,2015,2,1000000,1039374,12.3,96584.666),
(11,2015,2,1039374,9999999,13.3,101427.668),
(11,2015,3,0,7749,1,0),
(11,2015,3,7749,18371,2,77.49),
(11,2015,3,18371,28995,4,289.93),
(11,2015,3,28995,40250,6,714.89),
(11,2015,3,40250,50869,8,1390.19),
(11,2015,3,50869,259844,9.3,2239.71),
(11,2015,3,259844,311812,10.3,21674.385),
(11,2015,3,311812,519687,11.3,27027.089),
(11,2015,3,519687,1000000,12.3,50516.964),
(11,2015,3,1000000,9999999,13.3,109595.463),
(11,2015,4,0,7749,1,0),
(11,2015,4,7749,18371,2,77.49),
(11,2015,4,18371,28995,4,289.93),
(11,2015,4,28995,40250,6,714.89),
(11,2015,4,40250,50869,8,1390.19),
(11,2015,4,50869,259844,9.3,2239.71),
(11,2015,4,259844,311812,10.3,21674.385),
(11,2015,4,311812,519687,11.3,27027.089),
(11,2015,4,519687,1000000,12.3,50516.964),
(11,2015,4,1000000,9999999,13.3,109595.463);
 
 --Colorado
 INSERT INTO tax_brackets (jurisdiction_id, taxyear, filing_status_id, minagi, maxagi, taxrate, base_tax) VALUES 
 (6,2015,1,0,999999,4.63,0),
 (6,2015,2,0,999999,4.63,0),
 (6,2015,3,0,999999,4.63,0),
 (6,2015,4,0,999999,4.63,0);


--Connecticut
 INSERT INTO tax_brackets (jurisdiction_id, taxyear, filing_status_id, minagi, maxagi, taxrate, base_tax) VALUES 
(12,2015,1,0,10000,3,0),
(12,2015,1,10000,50000,5,300),
(12,2015,1,50000,100000,5.5,2300),
(12,2015,1,100000,200000,6,5050),
(12,2015,1,200000,250000,6.5,11050),
(12,2015,1,250000,9999999,6.7,14300),
(12,2015,2,0,20000,3,0),
(12,2015,2,20000,100000,5,600),
(12,2015,2,100000,200000,5.5,4600),
(12,2015,2,200000,400000,6,10100),
(12,2015,2,400000,500000,6.5,22100),
(12,2015,2,500000,9999999,6.7,28600),
(12,2015,3,0,10000,3,0),
(12,2015,3,10000,50000,5,300),
(12,2015,3,50000,100000,5.5,2300),
(12,2015,3,100000,200000,6,5050),
(12,2015,3,200000,250000,6.5,11050),
(12,2015,3,250000,9999999,6.7,14300),
(12,2015,4,0,10000,3,0),
(12,2015,4,10000,50000,5,300),
(12,2015,4,50000,100000,5.5,2300),
(12,2015,4,100000,200000,6,5050),
(12,2015,4,200000,250000,6.5,11050),
(12,2015,4,250000,9999999,6.7,14300);
--Delaware
--Florida
--Georgia
--Hawaii
--Idaho
--Illinois
--Indiana
--Iowa
--Kansas
--Kentucky
--Louisiana
--Maine
--Maryland
--Massachusetts
--Michigan
--Minnesota
--Mississippi
--Missouri
--Montana
--Nebraska
--Nevada
--New Hampshire
--New Jersey
--New Mexico
--New York
--North Carolina
--North Dakota
--Ohio
--Oklahoma
--Oregon
--Pennsylvania
--Rhode Island
--South Carolina
--South Dakota
--Tennessee
--Texas
--Utah
--Vermont
--Virginia
--Washington
--West Virginia
--Wisconsin
--Wyoming

--American Samoa
--District of Columbia
--Federated States of Micronesia
--Guam
--Marshall Islands
--Northern Mariana Islands
--Palau
--Puerto Rico
--Virgin Islands
