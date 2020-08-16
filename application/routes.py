from flask import Flask, redirect, render_template, request, session, url_for
from application import models, app

@app.route('/', methods=['POST', 'GET'])
@app.route('/supply', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        year = request.form.get('year')
        json_file = models.heatMapData(year)
        return render_template('supply.html')
    json_file = models.graphData()
    return render_template('index.html')


@app.route('/supp_chart')
def supp_chart():
    return render_template('supply(chart).html')


@app.route('/dem_chart')
def dem_chart():
    return render_template('demand(chart).html')
