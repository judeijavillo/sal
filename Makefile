export PYTHONDONTWRITEBYTECODE=1

setup:
	pip install -r requirements.txt
	cd website && npm install

run-server:
	cd server && python app.py

run-website:
	cd website && npm run start
