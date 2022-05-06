export PYTHONDONTWRITEBYTECODE=1

setup:
	pip install -r requirements.txt
	cd website && npm install

run-server:
	echo "Starting SAL Server"
	cd server && python app.py

run-website:
	echo "Starting SAL Website"
	cd website && npm run start

run-aws:
	echo "Connecting to SAL Dev Server at 3.138.173.189 and linking to port 27017"
	cd aws && ssh -i "SimplifyAfterLecture.pem" -L 27017:localhost:27017 ec2-user@ec2-3-138-173-189.us-east-2.compute.amazonaws.com
