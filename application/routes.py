from flask import Flask, redirect, render_template, request, session, url_for
from application import models, app

@app.route('/', methods=['POST', 'GET'])
@app.route('/supply', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        startYear = request.form.get('startYear')
        endYear = request.form.get('endYear')
        columnRequired = request.form.get('columnRequired')
        country = request.form.get('country')
        csv_file = models.createCSV(country, startYear, endYear, columnRequired)
        return render_template('supply.html')
    csv_file = models.createCSV('india', 1990, 2000, 'population')
    return render_template('supply.html')
