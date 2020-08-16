from flask import Flask, redirect, render_template, request, session, url_for

from application import app

@app.route('/')
def index():
    return render_template('home.html')
