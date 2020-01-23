from flaskapp import db


class MonthSale(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    month = db.Column(db.String(64))
    year = db.Column(db.Integer)
    sales = db.relationship("SaleItem", backref="month_sale", lazy="dynamic")

    def __str__(self):
        return f"{self.month} {self.year}"

    @property
    def to_dict(self):
        return dict(title=str(self), items=[item.to_dict for item in self.sales.all()])


class SaleItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    month_sale_id = db.Column(db.Integer, db.ForeignKey("month_sale.id"))

    count = db.Column(db.Integer)
    name = db.Column(db.String(255))

    @property
    def to_dict(self):
        return {
            "count": self.count,
            "name": self.name
        }
