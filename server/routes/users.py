# users.py: The routes for accessing users
# 
# Auithors: Jude Javillo and Ronin Sharma
# Version: 4 May 2022

from flask import Blueprint, request

# Create a Blueprint to connect all of the subroutes to
users = Blueprint('users', __name__, url_prefix='/users')

# ROUTES ***********************************************************************

@users.route("/", methods=["GET", "POST", "PATCH", "DELETE"])
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

# HELPERS **********************************************************************
