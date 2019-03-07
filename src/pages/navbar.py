from flask.views import MethodView
from front_end.html_modules.navbar import Navbar
from flask import Markup


# http://flask.pocoo.org/docs/1.0/views/
class NavbarPage(MethodView):
    context = {}
    navbar = Navbar()

    def prepare(self, *args, **kwargs):
        NavbarPage.navbar.update()
        self.context["navbar"] = Markup(NavbarPage.navbar.get_rendered())

    def dispatch_request(self, *args, **kwargs):
        self.context = dict()  # should nullify context on request, since Views classes objects are shared between requests
        self.prepare(self, *args, **kwargs)
        return super(NavbarPage, self).dispatch_request(*args, **kwargs)

