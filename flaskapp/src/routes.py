import json
import csv

from faker import Faker

from flaskapp import app, db
from .models import SaleItem, MonthSale
from flask import request

@app.route("/")
def index():
    return "Hello world"

@app.route("/sales/", methods=["GET", "POST"])
def getData():
    if request.method == "GET":
        sales = MonthSale.query.all()
        return json.dumps([sale.to_dict for sale in sales], indent=4)

    fake = Faker()
    month_sale = MonthSale(month=fake.month_name(), year=fake.year())
    db.session.add(month_sale)
    db.session.commit()

    items = ["shoe", "laptop", "hat", "phone"]
    for item in items:
        sale_item = SaleItem(name=item, count=fake.random_digit_not_null(), month_sale=month_sale)
        db.session.add(sale_item)
    db.session.commit()

    return month_sale.to_dict


@app.route("/multiplier/")
def multiplier():
    """
    View to get multiplier data from csv
    the data contains multiplier for differents graph types

    the current graph types is bar and pie, so the multiplier.csv should

    ```
    bar,pie
    100,200
    ```
    :return: json response about multiplier data

    Note: Because its from csv file, the data returned is list.
    """
    with open(app.config.get("MULTIPLIER_CSV")) as multiplier_file:
        multiplier_data = csv.DictReader(multiplier_file)
        return json.dumps([data for data in multiplier_data], indent=4)
