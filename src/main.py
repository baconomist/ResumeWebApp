from src import initialize_flask
from src import config

app = initialize_flask.app

if __name__ == "__main__":
    app.run(config.ip, config.port, debug=config.DEBUG)
