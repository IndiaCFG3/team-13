from flask import Flask, redirect, render_template, request, session, url_for
import models

@app.route('/', methods=['POST', 'GET'])
@app.route('/supply', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        pass
        # CALL THE FUNCTION HERE
        return render_template('supply.html')

    return render_template('supply.html')
