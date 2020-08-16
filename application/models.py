import pandas as pd
from flask_mysqldb import MySQL

from application import app

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'myDb'

mysql = MySQL(app)

def ashayFun(startYear, endYear, columnRequired = '*'):
    f = open('output.csv', 'w')
    query='select' + columnRequired + 'from mydata where year>=' + str(startYear) + 'and year<= ' + str(endYear)

    cursor.execute(query)

    while True:
        df = pd.DataFrame(cursor.fetchmany(1000))

        if len(df) == 0:
            break

        else:
            df.to_csv(f, header=False,  encoding='utf-8')

    # Clean up
    f.close()
    cursor.close()
