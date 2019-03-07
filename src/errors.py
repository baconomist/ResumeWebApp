from flask import render_template

# 404
def page_not_found(e=None):
    return render_template("errors/404.html"), 404


# 403, when user is already authenticated but not authorized for the requested resource
def forbidden(e=None):
    return render_template("errors/403.html"), 403


# 401, when not logged in
def not_authenticated(e=None):
    return render_template("login.html"), 401
