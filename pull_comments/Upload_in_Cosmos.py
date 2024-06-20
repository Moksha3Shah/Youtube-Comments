from pydocumentdb import document_client, documents
import json 

# Specify the path to the comments.json file
json_file_path = r'Path_to_Comments\comments.json'

# Load the JSON data from the file
with open(json_file_path, 'r') as json_file:
    comments_json = json.load(json_file)

ENDPOINT = 'https://yourendpoint:443/'
MASTERKEY = '********************************************************************'
client = document_client.DocumentClient(ENDPOINT, {'masterKey': MASTERKEY})

DATABASE_ID = 'YouTubeDB'
COLLECTION_ID = 'CommentsCollection'

database_definition = {'id': DATABASE_ID}
collection_definition = {'id': COLLECTION_ID}

database = client.CreateDatabase(database_definition)
collection = client.CreateCollection(database['_self'], collection_definition)

for record in comments_json:
    client.UpsertDocument(collection['_self'], record)
