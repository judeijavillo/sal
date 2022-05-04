# app.py: The main entrypoint for the SAL server
# 
# Auithors: Jude Javillo and Ronin Sharma
# Version: 4 May 2022

from flask import Flask, request
from routes.courses import courses
from routes.entries import entries
from routes.posts import posts
from routes.queues import queues
from routes.schools import schools
from routes.users import users

# CONFIGURATION ****************************************************************

app = Flask(__name__)

app.register_blueprint(courses)
app.register_blueprint(entries)
app.register_blueprint(posts)
app.register_blueprint(queues)
app.register_blueprint(schools)
app.register_blueprint(users)

# ROUTES ***********************************************************************

@app.route("/", methods=["GET", "POST", "PATCH", "DELETE"])
def check_app():
    """
    A sanity check endpoint to ensure that the server works correctly for 
    root-level paths.
    """
    result = {}
    if request.method == "GET":
        result["message"] = "GET: app endpoint successful"
    elif request.method == "POST":
        result["message"] = "POST: app endpoint successful"
    elif request.method == "PATCH":
        result["message"] = "PATCH: app endpoint successful"
    elif request.method == "DELETE":
        result["message"] = "DELETE: app endpoint successful"
    return result

if __name__ == '__main__':
    # TODO: Read from a json for this
    app.run(host='localhost', port='5000', debug=True)
