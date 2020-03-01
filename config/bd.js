process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/milibrotec';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;
//db mongo url
//mongodb+srv://juli:juli@cluster0-ugleq.mongodb.net/milibrotec