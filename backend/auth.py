"""
Google sign-in (SSO) for SmartBase.
POST /auth/google  sign in with a Google token
GET  /auth/me      who is signed in
POST /auth/logout  sign out
"""
import os
import pymysql
from flask import Blueprint, jsonify, request, session
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token

auth = Blueprint("auth", __name__)

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "496981636219-7biscb3r39kprpe75134ddga5pi2l0pq.apps.googleusercontent.com")


def get_connection():
   return pymysql.connect(
      host="localhost",
      user="root",
      password="",
      database="restaurant_db",
      port=3306,
      cursorclass=pymysql.cursors.DictCursor,
   )


def user_to_json(row):
   return {
      "id": row["user_id"],
      "email": row["email"],
      "name": row["name"],
      "picture": row["picture_url"],
   }


@auth.route("/auth/google", methods=["POST"])
def google_login():
   if not GOOGLE_CLIENT_ID:
      return jsonify({"error": "Google sign-in is not set up on the server (GOOGLE_CLIENT_ID is missing)."}), 500

   body = request.get_json(silent=True) or {}
   credential = body.get("credential")
   if not credential:
      return jsonify({"error": "No Google credential was sent."}), 400

   try:
      info = id_token.verify_oauth2_token(credential, google_requests.Request(), GOOGLE_CLIENT_ID)
   except ValueError:
      return jsonify({"error": "Google sign-in could not be verified. Please try again."}), 401

   if not info.get("email_verified"):
      return jsonify({"error": "This Google account's email is not verified."}), 401

   google_id = info["sub"]
   email = info.get("email", "")
   name = info.get("name") or email
   picture = info.get("picture")

   connection = get_connection()
   try:
      with connection.cursor() as cursor:
         cursor.execute(
            """
            INSERT INTO users (google_id, email, name, picture_url, last_login)
            VALUES (%s, %s, %s, %s, NOW())
            ON DUPLICATE KEY UPDATE
               email = VALUES(email),
               name = VALUES(name),
               picture_url = VALUES(picture_url),
               last_login = NOW()
            """,
            (google_id, email, name, picture),
         )
         connection.commit()
         cursor.execute(
            "SELECT user_id, email, name, picture_url FROM users WHERE google_id = %s",
            (google_id,),
         )
         row = cursor.fetchone()
   finally:
      connection.close()

   session.clear()
   session["user_id"] = row["user_id"]
   return jsonify({"user": user_to_json(row)})


@auth.route("/auth/me", methods=["GET"])
def current_user():
   user_id = session.get("user_id")
   if not user_id:
      return jsonify({"user": None})

   connection = get_connection()
   try:
      with connection.cursor() as cursor:
         cursor.execute(
            "SELECT user_id, email, name, picture_url FROM users WHERE user_id = %s",
            (user_id,),
         )
         row = cursor.fetchone()
   finally:
      connection.close()

   if not row:
      session.clear()
      return jsonify({"user": None})
   return jsonify({"user": user_to_json(row)})


@auth.route("/auth/logout", methods=["POST"])
def logout():
   session.clear()
   return jsonify({"ok": True})