#!/usr/bin/env python

import requests
import json

SERVERNAME = 'http://localhost:8080'
IMAGES_URI = 'api/images'

initial_state_path = './app/utils/initialState.json'


def get_images():
    url = '{}/{}'.format(SERVERNAME, IMAGES_URI)
    response = requests.get(url)
    return json.loads(response.content)


def parse_images(images):
    return {
        image['id']: {
            'id': image['id'],
            'originalname': image['originalname'],
            'mimetype': image['mimetype'],
            'timestamp': image['timestamp'],
            'filename': image['filename'],
            'rates': image['rates']
        }
        for image in images
    }


def parse_entities():
    images = parse_images(get_images())
    return {'images': images}


def main():
    entities = parse_entities()
    display_images = [key for key in entities['images']]
    isFetching = {
        'fetchImages': False,
        'updateImage': False,
    }
    
    state = {
        'entities': entities,
        'displayImages': display_images,
        'isFetching': isFetching
    }

    entities_stringify = json.dumps(state, indent=4, separators=(',', ':'))
    open(initial_state_path, 'w+').write(entities_stringify)


if __name__ == '__main__':
    main()
