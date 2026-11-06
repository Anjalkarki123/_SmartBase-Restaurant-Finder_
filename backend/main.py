import pymysql 
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/search", methods=["GET"])
def get_restaurants():
   cuisine = request.args.get("cuisine")
   city = request.args.get("city")
   min_rating = request.args.get("minRating", default=0, type=float)
   max_price = request.args.get("maxPrice", type=int)

   connection = pymysql.connect(
      host="localhost",
      user="root",
      password="",
      database="restaurant_db",
      port=3306,
      cursorclass=pymysql.cursors.DictCursor
   )

   try:
      query = """
         SELECT
            restaurant.restaurant_id AS id,
            restaurant.name,
            restaurant.rating,
            restaurant.price,
            restaurant.dining_options AS diningOptions,
            cuisine.name as cuisine,
            city.name AS city,
            city.state AS state
         FROM restaurant
         INNER JOIN cuisine
            ON restaurant.cuisine_id = cuisine.cuisine_id
         INNER JOIN city
            ON restaurant.city_id = city.city_id
         WHERE 1=1
      """

      parameters = []

      if cuisine:
         query += " AND cuisine.name = %s"
         parameters.append(cuisine)

      if city:
         query += " AND city.name = %s"
         parameters.append(city)

      query += " AND restaurant.rating >= %s"
      parameters.append(min_rating)

      if max_price is not None:
         query += """
            AND CASE restaurant.price
               WHEN 'Low' THEN 1
               WHEN 'Moderate' THEN 2
               WHEN 'High' THEN 3
               ELSE 4
            END <= %s   
         """

         parameters.append(max_price)

      query += " ORDER BY restaurant.rating DESC LIMIT 15"

      with connection.cursor() as cursor:
         cursor.execute(query, parameters)
         restaurants = cursor.fetchall()

      for restaurant in restaurants:
         restaurant["exact"] = True
         restaurant["reasons"] = []

      return jsonify({"results": restaurants})
   finally:
      connection.close()
   
@app.route("/options", methods=["GET"])
def get_options():
   connection = pymysql.connect(
      host="localhost",
      user="root",
      password="",
      database="restaurant_db",
      port=3306,
      cursorclass = pymysql.cursors.DictCursor
   )

   try:
      with connection.cursor() as cursor:
         cursor.execute("SELECT name FROM cuisine")
         cuisine_rows = cursor.fetchall()

         cursor.execute("SELECT name, state FROM city")
         city_rows = cursor.fetchall()

      cuisines = []
      for row in cuisine_rows:
         cuisines.append(row["name"])

      cities = []
      for row in city_rows:
         cities.append({
            "city": row["name"],
            "state": row["state"]
         })

      return jsonify({
         "cuisines": cuisines,
         "cities": cities
      })
   finally:
      connection.close()

if __name__ == "__main__":
   app.run(debug=True, port=5000)