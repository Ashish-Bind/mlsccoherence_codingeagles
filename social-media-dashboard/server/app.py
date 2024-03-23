from flask import Flask, render_template, request, jsonify
from googleapiclient.discovery import build
import pandas as pd
import seaborn as sns
import matplotlib
matplotlib.use('Agg')  # Use Agg backend for non-interactive plotting
import matplotlib.pyplot as plt

# Set up the Flask application
app = Flask(__name__)

# Your API key
api_key = 'AIzaSyCL7embBTo1pBaA6o9a4cIgKMkFOzQTltY'

def get_channel_stats(youtube, channel_id):
    request = youtube.channels().list(
        part='snippet,contentDetails,statistics',
        id=channel_id
    )
    response = request.execute()
    if 'items' in response:
        item = response['items'][0]
        channel_name = item.get('snippet', {}).get('title')
        subscribers = item.get('statistics', {}).get('subscriberCount')
        views = item.get('statistics', {}).get('viewCount')
        total_videos = item.get('statistics', {}).get('videoCount')
        playlist_id = item.get('contentDetails', {}).get('relatedPlaylists', {}).get('uploads')
        return {
            'Channel_name': channel_name,
            'Subscribers': subscribers,
            'Views': views,
            'Total_videos': total_videos,
            'Playlist_id': playlist_id
        }
    else:
        return None

def get_video_ids(youtube, playlist_id):
    request = youtube.playlistItems().list(
        part='contentDetails',
        playlistId=playlist_id,
        maxResults=50  # Adjust as needed
    )
    response = request.execute()
    video_ids = [item['contentDetails']['videoId'] for item in response['items']]
    return video_ids

def get_video_stats(youtube, video_id):
    request = youtube.videos().list(
        part='snippet,statistics',
        id=video_id
    )
    response = request.execute()
    if 'items' in response:
        item = response['items'][0]
        video_title = item.get('snippet', {}).get('title')
        views = item.get('statistics', {}).get('viewCount')
        likes = item.get('statistics', {}).get('likeCount')
        dislikes = item.get('statistics', {}).get('dislikeCount')
        comments = item.get('statistics', {}).get('commentCount')
        return {
            'Video_title': video_title,
            'Views': views,
            'Likes': likes,
            'Dislikes': dislikes,
            'Comments': comments
        }
    else:
        return None

def youtube_build():
    return build('youtube', 'v3', developerKey=api_key)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        channel_id = request.form['channel_id']
        # No need to process the data here, as it will be handled by the new route
        return render_template('index.html')
    return render_template('index.html')

@app.route('/api/channel_data', methods=['GET', 'POST'])
def get_channel_data():
    if request.method == 'POST':
        channel_id = request.form['channel_id']
        youtube = youtube_build()
        channel_stats = get_channel_stats(youtube, channel_id)
        if channel_stats:
            playlist_id = channel_stats['Playlist_id']
            video_ids = get_video_ids(youtube, playlist_id)
            most_viewed_video_id = max(video_ids, key=lambda vid: int(get_video_stats(youtube, vid)['Views']))
            most_recent_video_id = video_ids[0]  # Assuming the first video in the playlist is the most recent
            most_viewed_video_stats = get_video_stats(youtube, most_viewed_video_id)
            most_recent_video_stats = get_video_stats(youtube, most_recent_video_id)

            data = {
                'channel_stats': channel_stats,
                'most_viewed_video_stats': most_viewed_video_stats,
                'most_recent_video_stats': most_recent_video_stats
            }

            return jsonify(data)
        else:
            return jsonify({'error': 'Channel not found'}), 404

    return jsonify({'error': 'Invalid request method'}), 400

if __name__ == '__main__':
    app.run(debug=True)