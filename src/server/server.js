// eslint-disable-next-line no-undef
const cors = require('cors');

// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const axios = require('axios');
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors()); 

// استبدل CLIENT_ID و CLIENT_SECRET بالقيم الصحيحة
const CLIENT_ID = 'q1_rFHbjTnevt9fLpmF_LA';
const CLIENT_SECRET = '0iguwdbLPfpc54lgtibHN7rrSpCAZKSh';
app.get("/api/getZoomToken",async(req,res)=>
{
    res.send("sssss")
})
app.post('/api/getZoomToken', async (req, res) => {
    console.log("first")
  try {
    const response = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'client_credentials',
      },
      headers: {
        // eslint-disable-next-line no-undef
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error('Error fetching Zoom token:', error);
    res.status(500).json({ message: 'Error fetching Zoom token' });
  }
});
app.post('/api/createZoomMeeting', async (req, res) => {
    try {
      const { token, meetingData } = req.body;
      console.log(meetingData)
  
      const response = await axios.post(
        'https://api.zoom.us/v2/users/me/meetings',
        meetingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      res.json({ join_url: response.data.join_url });
    } catch (error) {
      console.error('Error creating Zoom meeting:', error);
      res.status(500).json({ message: 'Error creating Zoom meeting' });
    }
  });
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
