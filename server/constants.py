# constants.py: A collection of constants used across the SAL server
# 
# Authors: Jude Javillo and Ronin Sharma
# Version: 5 May 2022

# Whether or not the website is running in developer mode
DEVELOPER_MODE = True

# The address of the host of the server
HOST = "127.0.0.1" if DEVELOPER_MODE else "HOST"

# The port of the host of the server
PORT = "5000" if DEVELOPER_MODE else "PORT"
