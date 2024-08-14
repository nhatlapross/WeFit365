import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import { google } from 'googleapis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req })
    
    if (!session) {
      console.log('No session found')
      return res.status(401).json({ error: 'Unauthorized: No session found' })
    }

    if (!session.accessToken) {
      console.log('No access token found in session')
      return res.status(401).json({ error: 'Unauthorized: No access token in session' })
    }

    console.log('Session found with access token')

    const oauth2Client = new google.auth.OAuth2()
    oauth2Client.setCredentials({ access_token: session.accessToken as string })

    const fitness = google.fitness({ version: 'v1', auth: oauth2Client })

    const now = new Date();
    const startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const response = await fitness.users.dataset.aggregate({
      userId: 'me',
      requestBody: {
        aggregateBy: [{
          dataTypeName: "com.google.step_count.delta",
          dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
        }],
        bucketByTime: { "durationMillis": 86400000 },
        startTimeMillis: startTime.getTime(),
        endTimeMillis: now.getTime(),
      },
    });

    const stepData = response.data.bucket.map((bucket:any) => ({
      date: new Date(parseInt(bucket.startTimeMillis)).toISOString().split('T')[0],
      steps: bucket.dataset[0].point[0]?.value[0]?.intVal || 0,
    }));

    res.status(200).json(stepData);
  } catch (error) {
    console.error('Error in getFitnessData:', error)
    res.status(500).json({ 
      error: 'Failed to fetch fitness data', 
      message: error.message,
      stack: error.stack
    })
  }
}