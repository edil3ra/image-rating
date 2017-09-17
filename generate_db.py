#!/usr/bin/env python

import os
import requests
import shutil
import time
import random

SERVERNAME = 'http://localhost:8080'
IMAGES_URI = 'api/images'

IMAGES_MOCK_FOLDER = './server/images_mock'
API_UPLOAD_FOLDER = './server/upload'
API_DB = './server/db.json'


def clean():
    print('drop db')
    if os.path.isfile(API_DB):
        os.remove(API_DB)
    if os.path.isdir(API_UPLOAD_FOLDER):
        shutil.rmtree(API_UPLOAD_FOLDER)
    os.mkdir(API_UPLOAD_FOLDER)
    print('create db')


def post_images():
    url = '{}/{}'.format(SERVERNAME, IMAGES_URI)
    files_path = [
        os.path.join(os.getcwd(), 'server/images_mock', name)
        for name in os.listdir(IMAGES_MOCK_FOLDER)
    ]
    files = [{'image': open(file_path, 'rb')} for file_path in files_path]
    print('start image creation')
    for i, f in enumerate(files):
        time.sleep(0.2)
        print('+' * (i - 1) + '-' * (len(files) - i - 1))
        requests.post(url, files=f)
    print('end image creation')


def put_images():
    url = '{}/{}'.format(SERVERNAME, IMAGES_URI)
    max_id = len(os.listdir(IMAGES_MOCK_FOLDER)) + 1
    rates = [[
        random.choice(range(1, 6)) for y in range(random.randint(0, 10))
    ] for i in range(1, max_id)]
    print('start rating randamization')
    for i, rate in enumerate(rates):

        time.sleep(0.2)
        print('+' * (i + 1) + '-' * (len(rates) - i - 1))
        requests.put('{}/{}'.format(url, i + 1), json={'rates': rate})
    print('end rating randmization')


def main():
    clean()
    print('\n*****************************\n')
    post_images()
    print('\n*****************************\n')
    put_images()


if __name__ == '__main__':
    main()
