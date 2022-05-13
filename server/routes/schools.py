# schools.py: The routes for accessing schools
# 
# Auithors: Jude Javillo and Ronin Sharma
# Version: 4 May 2022

from flask import Blueprint, request

# Create a Blueprint to connect all of the subroutes to
schools = Blueprint("schools", __name__, url_prefix="/schools")

# ROUTES ***********************************************************************

@schools.route("/test", methods=["GET", "POST", "PATCH", "DELETE"])
def check_schools():
    """
    A sanity check endpoint to ensure that the server works correctly for 
    schools paths.
    """
    result = {}
    if request.method == "GET":
        result["message"] = "GET: schools endpoint successful"
    elif request.method == "POST":
        result["message"] = "POST: schools endpoint successful"
    elif request.method == "PATCH":
        result["message"] = "PATCH: schools endpoint successful"
    elif request.method == "DELETE":
        result["message"] = "DELETE: schools endpoint successful"
    return result

# HELPERS **********************************************************************
