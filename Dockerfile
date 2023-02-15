FROM python:3.10.6

RUN apt-get update \
&& apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev

RUN pip3 install --upgrade pip

COPY ./backend/ ./
RUN pip3 install -r requirements.txt

COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh

RUN pip3 install gunicorn

RUN export DJANGO_SETTINGS_MODULE="./backend/Django_Rest_Framework_GB/settings_prod"
RUN export DJANGO_SECRET_KEY="b2b6$fi4ypfy2lc6q9d^j!6ah1jova_1k89y-767he16+0!yau"
