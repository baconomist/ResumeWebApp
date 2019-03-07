
from flask import render_template, session
from pages.dashboard_page import DashboardPage

from src.pages.navbar_page import NavbarPage


class IndexPage(NavbarPage):
    def get(self):
        # self.context[""]=""... jinja stuff
        # return render_template('page.html',**self.context)

        # If user not logged in
        if session.get("uid") is None:
            return render_template("index.html", **self.context)
        else:
            return DashboardPage().dispatch_request()
