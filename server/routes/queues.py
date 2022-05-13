# queues.py: The routes for accessing queues
# 
# Auithors: Jude Javillo and Ronin Sharma
# Version: 4 May 2022

from flask import Blueprint, request

# Create a Blueprint to connect all of the subroutes to
queues = Blueprint("queues", __name__, url_prefix="/queues")

# ROUTES ***********************************************************************

@queues.route("/test", methods=["GET", "POST", "PATCH", "DELETE"])
def check_queues():
    """
    A sanity check endpoint to ensure that the server works correctly for 
    queues paths.
    """
    result = {}
    if request.method == "GET":
        result["message"] = "GET: queues endpoint successful"
    elif request.method == "POST":
        result["message"] = "POST: queues endpoint successful"
    elif request.method == "PATCH":
        result["message"] = "PATCH: queues endpoint successful"
    elif request.method == "DELETE":
        result["message"] = "DELETE: queues endpoint successful"
    return result

# HELPERS **********************************************************************
