import json

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