SELECT properties.city, COUNT(*) AS total_reservations
FROM reservations
  JOIN properties ON property_id=properties.id
GROUP BY city
ORDER BY COUNT(*) DESC;