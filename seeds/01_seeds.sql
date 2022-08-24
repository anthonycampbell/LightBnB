INSERT INTO users (name, email, password)
  VALUES(
    'Jerry',
    'email@email.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ), (
    'Spiderman Thompson',
    'spider@man.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ), (
    'Wolverine Parker',
    'x@men.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  );
INSERT INTO properties (
  owner_id,
  title,
  description,
  thumbnail_photo_url,
  cover_photo_url,
  cost_per_night,
  parking_spaces,
  number_of_bathrooms,
  number_of_bedrooms,
  country,
  street,
  city,
  province,
  post_code
  )
  VALUES (
    1,
    'Baller Manor',
    'Description,',
    'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ',
    'https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68', 
    100,
    1,
    2,
    2,
    'Canada', 
    'Wallaby Way',
    'Vancouver',
    'BC',
    'E43RFA'
  ), (
    2,
    'House',
    'Description,',
    'https://i.picsum.photos/id/1000/5626/3635.jpg?hmac=qWh065Fr_M8Oa3sNsdDL8ngWXv2Jb-EE49ZIn6c0P-g',
    'https://i.picsum.photos/id/1003/1181/1772.jpg?hmac=oN9fHMXiqe9Zq2RM6XT-RVZkojgPnECWwyEF1RvvTZk', 
    1000,
    1234,
    142,
    1241,
    'Canada', 
    'Rebel Rd',
    'Calgary',
    'Alberta',
    '3F56HN'
  ), (
    3,
    'Big Place',
    'Description',
    'https://i.picsum.photos/id/1004/5616/3744.jpg?hmac=Or7EJnz-ky5bsKa9_frdDcDCR9VhCP8kMnbZV6-WOrY',
    'https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY', 
    200,
    123,
    23,
    43,
    'Canada', 
    'Glory Ave',
    'Toronto',
    'Ontario',
    'GH6PQ1'
  );
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
  VALUES (
    Now(),
    '2030-02-03'::DATE,
    1,
    2
  ),(
    '2023-04-12'::DATE,
    '2023-05-09'::DATE,
    2,
    3
  ),(
    '2024-12-11'::DATE,
    '2025-01-26'::DATE,
    3,
    1
  );

INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
  VALUES (
    2, 1, 1, 1, 'Message1'
  ),(
    3, 2, 2, 5, 'Message2'
  ),(
    1, 3, 3, 3, 'Message3'
  );