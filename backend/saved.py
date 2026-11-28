"""
Saved restaurants for the signed-in user.

Routes (the frontend calls them with an /api prefix, which Vite removes):
  GET    /saved                  the user's saved restaurants, newest first
  POST   /saved                  save one restaurant   body: {"restaurantId": "12"}
  DELETE /saved/<restaurant_id>  remove one restaurant

The user is taken from the sign-in session, so people can only see and change their own list.
"""
import pymysql
from flask import Blueprint, jsonify, request, session

saved = Blueprint("saved", __name__)


def get_connection():
   return pymysql.connect(
      host="localhost",
      user="root",
      password="",
      database="restaurant_db",
      port=3306,
      cursorclass=pymysql.cursors.DictCursor,
   )


def signed_in_user():
   return session.get("user_id")


@saved.route("/saved", methods=["GET"])
def list_saved():
   user_id = signed_in_user()
   if not user_id:
      return jsonify({"error": "Sign in to see your saved restaurants."}), 401

   connection = get_connection()
   try:
      with connection.cursor() as cursor:
         cursor.execute(
            """
            SELECT
               restaurant.restaurant_id AS id,
               restaurant.name,
               restaurant.rating,
               restaurant.price,
               restaurant.dining_options AS diningOptions,
               cuisine.name AS cuisine,
               city.name AS city,
               city.state AS state
            FROM saved_restaurants
            INNER JOIN restaurant
               ON saved_restaurants.restaurant_id = restaurant.restaurant_id
            INNER JOIN cuisine
               ON restaurant.cuisine_id = cuisine.cuisine_id
            INNER JOIN city
               ON restaurant.city_id = city.city_id
            WHERE saved_restaurants.user_id = %s
            ORDER BY saved_restaurants.saved_at DESC
            """,
            (user_id,),
         )
         restaurants = cursor.fetchall()
   finally:
      connection.close()

   return jsonify({"results": restaurants})


@saved.route("/saved", methods=["POST"])
def add_saved():
   user_id = signed_in_user()
   if not user_id:
      return jsonify({"error": "Sign in to save restaurants."}), 401

   body = request.get_json(silent=True) or {}
   restaurant_id = str(body.get("restaurantId", "")).strip()
   if not restaurant_id:
      return jsonify({"error": "No restaurant was given."}), 400

   connection = get_connection()
   try:
      with connection.cursor() as cursor:
         cursor.execute("SELECT 1 FROM restaurant WHERE restaurant_id = %s", (restaurant_id,))
         if not cursor.fetchone():
            return jsonify({"error": "That restaurant does not exist."}), 404

         # INSERT IGNORE: saving the same restaurant twice is not an error.
         cursor.execute(
            "INSERT IGNORE INTO saved_restaurants (user_id, restaurant_id) VALUES (%s, %s)",
            (user_id, restaurant_id),
         )
         connection.commit()
   finally:
      connection.close()

   return jsonify({"ok": True}), 201


@saved.route("/saved/<restaurant_id>", methods=["DELETE"])
def remove_saved(restaurant_id):
   user_id = signed_in_user()
   if not user_id:
      return jsonify({"error": "Sign in to change your saved restaurants."}), 401

   connection = get_connection()
   try:
      with connection.cursor() as cursor:
         cursor.execute(
            "DELETE FROM saved_restaurants WHERE user_id = %s AND restaurant_id = %s",
            (user_id, restaurant_id),
         )
         connection.commit()
   finally:
      connection.close()

   return jsonify({"ok": True})