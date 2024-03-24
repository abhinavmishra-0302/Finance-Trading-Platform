DB_NAME = 'stocker'
EXPRESS_SESSION_KEY = 'secret_key_to_be_changed_in_production' // TODO: Change this to a long, random string in production
MONGO_CONNECTION_STRING = 'mongodb+srv://abhinav_stocker:abhinav321@atlascluster.icr73gp.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster'
JWT_VALID_TIME = '1h'
JWT_SECRET_KEY = 'your_secret_key' // TODO: Change this to a long, random string in production
COOKIE_EXPIRY = 60000 * 60 // 1 hour in milliseconds


module.exports = {DB_NAME, EXPRESS_SESSION_KEY, MONGO_CONNECTION_STRING, JWT_VALID_TIME, JWT_SECRET_KEY, COOKIE_EXPIRY}