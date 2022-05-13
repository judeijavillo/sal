# users.py: The routes for accessing users
# 
# Auithors: Jude Javillo and Ronin Sharma
# Version: 4 May 2022

from flask import Blueprint, request
import utils.database as db
import bcrypt

# Create a Blueprint to connect all of the subroutes to
users = Blueprint("users", __name__, url_prefix="/users")

# ROUTES ***********************************************************************

@users.route("/test", methods=["GET", "POST", "PATCH", "DELETE"])
def check_users():
    """
    A sanity check endpoint to ensure that the server works correctly for 
    users paths.
    """
    result = {}
    if request.method == "GET":
        result["message"] = "GET: users endpoint successful"
    elif request.method == "POST":
        result["message"] = "POST: users endpoint successful"
    elif request.method == "PATCH":
        result["message"] = "PATCH: users endpoint successful"
    elif request.method == "DELETE":
        result["message"] = "DELETE: users endpoint successful"
    return result


@users.route("/", methods=[])
def getUser():
    """
    An endpoint that returns the User with the provided id
    """
    args = request.args
    school = args.get("school", default="", type=str)
    _id = args.get("id", default="", type=str)
    user = db.get("Users", school, one = True, objectId = _id)
    successful =  user is not None
    response = {
        "successful": successful,
        "user": user
    }
    return response


@users.route("/email", methods=["GET"])
def check_email():
    """
    An endpoint to check if the user's email is taken
    """
    args = request.args
    school = args.get("school", default="", type=str)
    email = args.get("email", default="", type=str)
    result = db.get("Users", school, filter = { "email": email })
    return { "result": len(result) == 0 }


@users.route("/signup", methods=["POST"])
def signup_user():
    """
    Creates an entry for the User and return the User's id if successful
    """
    # Process the body arguments
    body = request.json
    if body["password"] == "":
        body.pop("password")
        body["auth"] = "Google"
    else:    
        body["password"] = bcrypt.hashpw(body["password"].encode("utf-8"), bcrypt.gensalt())
        body["auth"] = "SAL"

    # Process the header arguments
    args = request.args
    school = args.get("school", default="", type=str)

    # Execute the request
    result = db.post("Users", school, body)
    return { "_id": str(result.inserted_id) }


@users.route("/login", methods=["POST"])
def login_user():
    """
    Returns the user's ID if the email/password combination is valid
    """
    body = request.json
    args = request.args
    school = args.get("school", default="", type=str)
    result = db.get("Users", school, { "email": body["email"] })
    failed = { "message": "Authentication failed", "_id": "" }

    # No users found
    if len(result) == 0:
        return failed

    # User found, login with SAL
    elif body["password"] != "":
        success = bcrypt.checkpw(body["password"].encode("utf-8"), result[0]["password"])
        if success:
            return { 
                "message": "Authentication successful",
                "_id": str(result[0]["_id"])
            }
        else:
            return failed
    
    # User found, login with Google
    else:
        success = result[0]["auth"] == "Google"
        if success:
            return { 
                "message": "Authentication successful",
                "_id": str(result[0]["_id"])
            }
        else:
            return failed

# HELPERS **********************************************************************
