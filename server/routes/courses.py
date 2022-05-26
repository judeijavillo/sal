# courses.py: The routes for accessing courses
# 
# Auithors: Jude Javillo and Ronin Sharma
# Version: 4 May 2022

from flask import Blueprint, request
import utils.database as db

# Create a Blueprint to connect all of the subroutes to
courses = Blueprint("courses", __name__, url_prefix="/courses")

# ROUTES ***********************************************************************

@courses.route("/test", methods=["GET", "POST", "PATCH", "DELETE"])
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

@courses.route("/", methods=["GET"])
def get_course():
    """
    An endpoint that returns the Course with the provided id
    """
    args = request.args
    school = args.get("school", default="", type=str)
    _id = args.get("id", default="", type=str)
    course = db.get("Courses", school, one = True, objectId = _id)
    successful =  course is not None
    response = {
        "successful": successful,
        "course": course
    }
    return response

# HELPERS **********************************************************************
