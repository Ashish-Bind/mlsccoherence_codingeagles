import { LineChart } from '@mui/x-charts/LineChart'
import { PieChart } from '@mui/x-charts/PieChart'
import Table from '../components/Table'
import VerticalBar from '../components/VerticalBar'
import InfoCard from '../components/InfoCard'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Analytics() {
  const [channelData, setChannelData] = useState([])
  const [loading, setLoading] = useState(true)
  const [recentVideos, setRecentVideos] = useState([])
  const [popularVideos, setPopularVideos] = useState([])
  const [error, setError] = useState(null)

  const fetchChannelData = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        'http://localhost:3000/get-data?search_query=UCmXmlB4-HJytD7wek0Uo97A'
      )
      setChannelData(res.data)
    } catch (err) {
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const fetchRecentVideos = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        'http://localhost:3000/recent-videos?search_query=UCmXmlB4-HJytD7wek0Uo97A'
      )
      setRecentVideos(res.data)
    } catch (err) {
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const fetchPopularVideos = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        'http://localhost:3000/popular-videos?search_query=UCmXmlB4-HJytD7wek0Uo97A'
      )
      setPopularVideos(res.data)
    } catch (err) {
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChannelData()
    fetchRecentVideos()
    fetchPopularVideos()
  }, [])

  console.log(recentVideos, popularVideos)

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="space-y-2 m-4">
      <div className="flex gap-2 justify-center my-2">
        <InfoCard
          name={channelData.items[0].snippet.localized.title}
          unit={channelData.items[0].snippet.localized.description}
          minWidth={1100}
        />
      </div>
      <div className="flex gap-2 justify-center my-2">
        <InfoCard
          name={'View Count'}
          key={channelData.items[0].statistics.viewCount}
          unit={channelData.items[0].statistics.viewCount}
        />
        <InfoCard
          name={'Subscriber Count'}
          key={channelData.items[0].statistics.subscriberCount}
          unit={channelData.items[0].statistics.subscriberCount}
        />
        <InfoCard
          name={'Total No. of Videos'}
          key={channelData.items[0].statistics.videoCount}
          unit={channelData.items[0].statistics.videoCount}
        />
        <InfoCard
          name={'Total No. of Videos'}
          key={channelData.items[0].statistics.videoCount}
          unit={channelData.items[0].statistics.videoCount}
        />
      </div>
      <div></div>
      <div className="flex gap-2 justify-center">
        <div className="p-2 border w-max">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
        </div>
        <div className="p-2 border w-max flex items-center min-w-[600px]">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'series A' },
                  { id: 1, value: 15, label: 'series B' },
                  { id: 2, value: 20, label: 'series C' },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        <div className="p-2 border w-max flex items-center min-w-[500px]">
          <Table />
        </div>
        <div className="p-2 border w-max flex items-center ">
          <VerticalBar />
        </div>
      </div>
    </div>
  )
}
