from flask import Flask

from flask_sslify import SSLify

import os
import logging

from . import config
from . import errors

# Clear server.log
open(os.path.join(os.path.dirname(__file__), "server.log"), "w").close()

# Comment out these lines to disable logging
logging.basicConfig(filename=os.path.join(os.path.dirname(__file__), "server.log"), level=logging.DEBUG)
rootLogger = logging.getLogger()
consoleHandler = logging.StreamHandler()
rootLogger.addHandler(consoleHandler)

# static_url_path="" so that static files can be accessed at www.apheltech.ca/static_file
app = Flask(__name__, static_url_path="", static_folder=config.static_dir, template_folder=config.template_dir)
sslify = SSLify(app, subdomains=True)

# Secret key needed for flask-sessions
app.secret_key = os.urandom(24)

# 404 page, page not found
app.register_error_handler(404, errors.page_not_found)

# 403 page, forbidden/not logged in/can't access resource
app.register_error_handler(403, errors.forbidden)
