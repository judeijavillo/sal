# entries.py: The routes for accessing entries
# 
# Auithors: Jude Javillo and Ronin Sharma
# Version: 4 May 2022

from flask import Blueprint, request

# Create a Blueprint to connect all of the subroutes to
entries = Blueprint("entries", __name__, url_prefix="/entries")

# ROUTES ***********************************************************************

@entries.route("/", methods=["GET", "POST", "PATCH", "DELETE"])
def check_entries():
    """
    A sanity check endpoint to ensure that the server works correctly for 
    entries paths.
    """
    result = {}
    if request.method == "GET":
        result["message"] = "GET: entries endpoint successful"
    elif request.method == "POST":
        result["message"] = "POST: entries endpoint successful"
    elif request.method == "PATCH":
        result["message"] = "PATCH: entries endpoint successful"
    elif request.method == "DELETE":
        result["message"] = "DELETE: entries endpoint successful"
    return result

# HELPERS **********************************************************************
