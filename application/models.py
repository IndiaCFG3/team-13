import pandas as pd
import json

from application import app

def query(year):
    df = pd.read_csv("dataset/dataset.csv")
    r = df[(df['Year'] == year)]
    return r[['name', 'id', 'Population', 'Volume in Tonnes', 'Protein Supply', 'Consumption']]

def createCSV(country, startYear, endYear, columnRequired):
    dataframe = query(startYear)
    dict = dataframe.to_dict('records')
    with open('dataset/output.json', 'w') as json_file:
        json.dump(dict, json_file)
    return 'output.json'
