import {MigrationInterface, QueryRunner} from "typeorm";

export class mockUsers1630142290015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    insert into "user" ("userId", username, email, password, role) values ('a7e5d267-d587-49de-a5fe-79cc838e21a2','aledson0', 'amcelvine0@last.fm', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('65e71edb-55ef-4a47-9654-cee553ab7cea','lblaw1', 'zcolquete1@1und1.de', 1234, 'admin');
    insert into "user" ("userId", username, email, password, role) values ('66983910-44fc-4b12-a7fc-4997e15430d6','sbaskeyfield2', 'abiffin2@toplist.cz', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('389f3d49-6258-4094-aa7e-3ea4711ce20d','eibbs3', 'kcordery3@vinaora.com', 1234, 'user');
    insert into "user" ("userId", username, email, password, role) values ('3f2d8799-64a4-4376-a839-33701e339161','ajozefowicz4', 'rmehaffey4@cnn.com', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('d92a58fa-bcb6-4084-b1d8-f2b4aac69500','hconsterdine5', 'rfewtrell5@who.int', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('eb1e798c-dd32-4e03-8400-a763de1949f1','lrapo6', 'ajeandel6@unc.edu', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('1138d172-1f0e-4aa3-8d89-56c7d75f8df1','lcoase7', 'gmoehle7@diigo.com', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('922cc4a0-6af3-4cb3-9ec9-37d01f54fba8','htewkesbury8', 'ahapgood8@digg.com', 1234, 'user');
    insert into "user" ("userId", username, email, password, role) values ('ca4a18ae-6a62-44a0-84a6-602ece85b46f','dhamby9', 'asweatman9@ft.com', 1234, 'admin');
    insert into "user" ("userId", username, email, password, role) values ('ca3678f1-d8f6-470b-8e4e-fd4e204320bd','nsproulea', 'smcculloucha@cbsnews.com', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('e1764335-8ca9-4928-9324-9a47fe2452c7','cseniourb', 'cguilderb@people.com.cn', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('583a0a79-5db1-4557-882a-d29f56714424','wlongstaffec', 'agrovesc@studiopress.com', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('0dd45858-be41-4182-a6c5-fe971616e10a','sforred', 'ddunstond@abc.net.au', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('f8411ed7-5244-437a-93e5-3f311643eeed','twigmoree', 'bchildee@nih.gov', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('130ed92e-05a3-413e-9187-040f83b5cbac','cwilkensonf', 'hpedrollof@clickbank.net', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('20fe7b0c-42dd-4fe5-ac7f-b92367209980','kbowlasg', 'jwenng@jalbum.net', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('93b9f956-8e67-45bf-bf92-853e43fed060','zhubatschh', 'cbonefanth@apple.com', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('c4928bdf-7a74-4568-8ff0-ed2615f9e7fb','rrossonii', 'bmooneyi@pcworld.com', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('dbaf8179-63dc-452b-be16-407bc835645b','kgreimj', 'gbernhardtj@i2i.jp', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('53855889-93b3-4ea6-9f1d-b55194d54644','rvasenink', 'yfessierk@army.mil', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('0e47781b-5cbe-4163-a992-5d75171a6b0d','pthiesl', 'awisedalel@youku.com', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('039d8550-22ef-4b7b-be83-b924252f2c19','rgraithm', 'gwoodingtonm@chicagotribune.com', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('3dd0931b-53ef-4fe4-8dff-2d2ac67b93a9','opinen', 'abyarsn@purevolume.com', 1234, 'admin');
    insert into "user" ("userId", username, email, password, role) values ('c7ed11e1-069e-4de5-8448-ab7f7c8d8912','ecoraho', 'cdumbartono@sciencedaily.com', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('0878ef1e-3315-4131-a6d9-636fccf9181d','csommersettp', 'vchokep@admin.ch', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('3163d516-aa12-4956-8935-f2a7f0bd5475','dscapensq', 'zhugq@si.edu', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('b1e7bb17-961b-4f62-8fc8-1348467c7739','gvonsalzbergr', 'rwastellr@omniture.com', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('5bf54f26-798f-44c4-89f8-c48860c4352b','hramas', 'zduces@jigsy.com', 1234, 'customer');
    insert into "user" ("userId", username, email, password, role) values ('ba24ed22-b03d-4448-867b-cfd8b15f3935','csumblert', 'eandryszczakt@bandcamp.com', 1234, 'customer');
    `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
