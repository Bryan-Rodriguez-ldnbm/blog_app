# blog_app
Close to deployment
# Setup
1. Create a new folder; call it whatever and put it anywhere.
2. Open a terminal and cd to that folder and run `python -m venv venv` to make a spanking brand new pythonvirtual environment called `venv`.
3. Activate the virtual environment by doing `source venv/bin/activate` for Mac or most Linux machines or `.\venv\Source\activate` on Windows.
4. Do `pip install -r requirements.txt` to install necessary python packages.
5. Locate settings.py in the **project** folder and change the DATABASES dictionary variable to
  ```py
  DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / 'db.sqlite3',
    }
}
```
6. then do `python manage.py makemigrations` and then `python manage.py migrate` to setup models and database.
7. Finally run `python manage.py runserver` and go to `http://127.0.0.1:8000` in your preferred browser.
