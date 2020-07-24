from app.main import create_app



config_name = 'development'
app = create_app(config_name)


  
@app.route('/')
def home():
    return 'Home'


if __name__ == 'main':
    app.run()
