const express = require('express')
const app = express()
const port = 9001
var FCM = require('fcm-node');
var serverKey = require('./pvtkey.json') //put the generated private key path here    
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ship2myid:developer@cluster0.qfdvjan.mongodb.net/test');
const Notification = mongoose.model('notifications', { appName: String, brandName: String });

var fcm = new FCM(serverKey)
const cors = require('cors');
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/send', (req, res) => {
    var message = {
        to: 'czWunOYSTfWNvgxhrNVNVz:APA91bFm6zwzibcq5d0P-Bpy6g3ZGGTXJmL48hWLVNRNyZU95IJjO4L04W6hK6-uJ6frBANBZyj03yg6pxQ1o22zpOwfvyAgm33mJSGjQm4gTpdHWSnDJpcUNm7LkDtHGWSsW8BlWhHF', 
        // collapse_key: 'notification',
        
        notification: {
            title: 'Offer from Adidas - New', 
            body: 'Notification from Adidas' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            app_id: 'ship2myid',
            brand: 'Adidas'
        }
    };
    
    fcm.send(message, function(err, messageId){
        if (err) {
            console.log("Something has gone wrong!",err);
        } else {
            console.log("Sent with message ID: ", messageId);
            const notification = new Notification({ appName: 'ship2myid', brandName: 'Adidas' });
            notification.save().then(() => console.log('Savec'));
        }
    });
    res.send('Done');
})

app.get('/app/allNotifications', async (req, res) => {

    const data = await Notification.find();
    res.json(data);

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
