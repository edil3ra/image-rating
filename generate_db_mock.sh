rm -rf server/uploads/* server/db.json

http post :8080/api/images image@server/images_mock/24888793474_0c72120d22_m.jpg --form
http post :8080/api/images image@server/images_mock/36674393256_0bf9e8b68f_m.jpg --form
http post :8080/api/images image@server/images_mock/4618786477_b6cea108fb_z.jpg --form
http post :8080/api/images image@server/images_mock/35909960083_468dfe33d4_z.jpg --form
http post :8080/api/images image@server/images_mock/36674393436_4ea3a9bc5b_z.jpg --form
http post :8080/api/images image@server/images_mock/5503173238_061a4e233d_m.jpg --form
http post :8080/api/images image@server/images_mock/36325395070_6c23299b43_z.jpg --form
http post :8080/api/images image@server/images_mock/36676372256_9357fd5f04_z.jpg --form
http post :8080/api/images image@server/images_mock/36585352871_2095afa289_m.jpg --form
http post :8080/api/images image@server/images_mock/36677993176_07857a65fd_z.jpg --form



http put :3000/api/images/1 scores:='[3, 2, 4, 1, 2, 1, 3, 1, 4, 3]'
http put :3000/api/images/2 scores:='[3, 2, 2, 4, 5, 3, 2, 4]'
http put :3000/api/images/3 scores:='[5, 5]'
http put :3000/api/images/4 scores:='[1, 4, 5, 1, 2]'
http put :3000/api/images/5 scores:='[2, 3, 3]'
http put :3000/api/images/6 scores:='[2, 3, 3, 1, 1, 2, 2, 4, 1]'
http put :3000/api/images/7 scores:='[2, 4]'
http put :3000/api/images/8 scores:='[3, 1, 4, 1, 2, 1]'
http put :3000/api/images/9 scores:='[4, 4]'
http put :3000/api/images/10 scores:='[4, 4, 2, 4]'
