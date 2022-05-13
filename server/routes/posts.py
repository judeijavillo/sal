# posts.py: The routes for accessing posts
# 
# Auithors: Jude Javillo and Ronin Sharma
# Version: 4 May 2022

from flask import Blueprint, request

# Create a Blueprint to connect all of the subroutes to
posts = Blueprint("posts", __name__, url_prefix="/posts")

# ROUTES ***********************************************************************

@posts.route("/test", methods=["GET", "POST", "PATCH", "DELETE"])
def check_posts():
    """
    A sanity check endpoint to ensure that the server works correctly for 
    posts paths.
    """
    result = {}
    if request.method == "GET":
        result["message"] = "GET: posts endpoint successful"
    elif request.method == "POST":
        result["message"] = "POST: posts endpoint successful"
    elif request.method == "PATCH":
        result["message"] = "PATCH: posts endpoint successful"
    elif request.method == "DELETE":
        result["message"] = "DELETE: posts endpoint successful"
    return result

# HELPERS **********************************************************************
