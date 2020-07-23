# from dotenv import load_dotenv
# dotenv_path = join(dirname(__file__), '.env')  # Path to .env file
# load_dotenv(dotenv_path)


class Config(object):
    pass

class DevelopmentConfig(Config):
    DEBUG = True
    # debug sql log errors
    SQLALCHEMY_ECHO = True

class ProductionConfig(Config):
    DEBUG = False


app_config = {
    'development':DevelopmentConfig,
    'production':ProductionConfig
}
