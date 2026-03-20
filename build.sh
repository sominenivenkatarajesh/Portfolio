#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python portfolio/manage.py collectstatic --no-input
python portfolio/manage.py migrate
python portfolio/manage.py loaddata portfolio/data.json
