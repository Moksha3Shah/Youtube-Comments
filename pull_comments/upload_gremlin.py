from gremlin_python.driver import client, serializer
import json

# Specify the path to the comments.json file
json_file_path = r'D:\DATA OLD SSD\ADMIN\Documents\Career\Academic\3_MSIM\Sem 2\DBA\Final_Project\comments.json'

# Load the JSON data from the file
with open(json_file_path, 'r') as json_file:
    comments_json = json.load(json_file)

ENDPOINT = 'your_gremlin_endpoint'
PRIMARY_KEY = 'your_primary_key'

# Create a Gremlin client
gremlin_client = client.Client(ENDPOINT, 'g', username="/dbs/YouTubeDB/colls/CommentsCollection", password=PRIMARY_KEY,
                               message_serializer=serializer.GraphSONSerializersV2d0())

# Gremlin query to check if the database exists
database_query = "g.V().has('label', 'database').has('id', 'YouTubeDB')"
database_result = gremlin_client.submit(database_query).all().result()

if not database_result:
    # Create the database if it doesn't exist
    create_database_query = "g.addV('database').property('id', 'YouTubeDB')"
    gremlin_client.submit(create_database_query).all().result()

# Gremlin query to check if the collection exists
collection_query = "g.V().has('label', 'collection').has('id', 'CommentsCollection')"
collection_result = gremlin_client.submit(collection_query).all().result()

if not collection_result:
    # Create the collection if it doesn't exist
    create_collection_query = "g.addV('collection').property('id', 'CommentsCollection')"
    gremlin_client.submit(create_collection_query).all().result()

# Upload comments
for record in comments_json:
    # Upload each comment using Gremlin
    add_comment_query = f"g.addV('comment').property('text', '{record['text']}')"
    gremlin_client.submit(add_comment_query).all().result()

gremlin_client.close()
