# posts.py: The routes for accessing posts
# 
# Auithors: Jude Javillo and Ronin Sharma
# Version: 4 May 2022

from flask import Blueprint, request
import utils.database as db
import datetime

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


@posts.route("/", methods=["GET"])
def get_posts():
    """
    An endpoint that returns a list of posts
    """
    args = request.args
    school = args.get("school", default="", type=str)
    course = args.get("course", default="", type=str)
    result = db.get("Posts", school, { 
        "course": course, 
        "parent": "" 
    }, sort=True)
    if result is None:
        return { "successful": False }
    return { 
        "successful": True,
        "result": result
    }


@posts.route("/comments", methods=["GET"])
def get_comments():
    """
    An endpoint that returns a list of comments for a given post
    """
    args = request.args
    school = args.get("school", default="", type=str)
    course = args.get("course", default="", type=str)
    parent = args.get("parent", default="", type=str)
    result = db.get("Posts", school, { 
        "course": course, 
        "parent": parent 
    }, sort=True)
    if result is None:
        return { "successful": False }
    result.reverse()
    return { 
        "successful": True,
        "result": result
    }


@posts.route("/", methods=["POST"])
def make_post():
    """
    Creates an entry for the Post and return the Post's id if successful
    """
    # Process the body arguments
    body = request.json
    body["timestamp"] = datetime.datetime.utcnow()

    # Process the header arguments
    args = request.args
    school = args.get("school", default="", type=str)

    # Execute the request
    result = db.post("Posts", school, body)
    return { "_id": str(result.inserted_id) }

# HELPERS **********************************************************************
