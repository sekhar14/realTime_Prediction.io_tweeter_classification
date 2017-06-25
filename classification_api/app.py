from flask import Flask, jsonify, request
from textblob import TextBlob
import re

app = Flask(__name__)

@app.route('/', methods=['POST'])
def index():
    print(request.json)
    tweet = clean_tweet(request.json["text"])
    analysis = TextBlob(tweet)
    sent = None
    if analysis.sentiment.polarity >= 0:
        sent = "1"
    else:
        sent = "0"
    return jsonify({"sentiment" : sent})



def clean_tweet(tweet):
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())

if __name__ == '__main__':
    app.run(debug=True)
