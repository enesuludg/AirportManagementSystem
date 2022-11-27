INSERT INTO "aircompany" ("id","name","company_type","founded_at","is_delete","created_at","updated_at") VALUES (DEFAULT,'thy12345', 'standart', '2022-11-17T18:49:55.916Z', false, '2022-11-28 06:40:32.141 +09:00', '2022-11-28 06:40:32.141 +09:00')


INSERT INTO "airplane" ("id","name","factory_serial_number","air_company","flight_distance","fuel_capacity","type","is_delete","created_at","updated_at") VALUES (DEFAULT,'Boing', '2323513', 1, '3232', '2332', 'standart', false, '2022-11-28 06:52:03.580 +09:00', '2022-11-28 06:52:03.580 +09:00')


INSERT INTO "flight" ("id","status","air_company","air_plane","departure_country","destination_country","distance","is_delete","created_at","updated_at") VALUES (default,'PENDING', 1, 1, '', '', '', false,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
