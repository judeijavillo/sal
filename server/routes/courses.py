# courses.py: The routes for accessing courses
# 
# Auithors: Jude Javillo and Ronin Sharma
# Version: 4 May 2022

from flask import Blueprint, request

# Create a Blueprint to connect all of the subroutes to
courses = Blueprint('courses', __name__, url_prefix='/courses')

# ROUTES ***********************************************************************

@courses.route("/", methods=["GET", "POST", "PATCH", "DELETE"])
def check_courses():
    """
    A sanity check endpoint to ensure that the server works correctly for 
    courses paths.
    """
    result = {}
    if request.method == "GET":
        result["message"] = "GET: courses endpoint successful"
    elif request.method == "POST":
        result["message"] = "POST: courses endpoint successful"
    elif request.method == "PATCH":
        result["message"] = "PATCH: courses endpoint successful"
    elif request.method == "DELETE":
        result["message"] = "DELETE: courses endpoint successful"
    return result

# HELPERS **********************************************************************
