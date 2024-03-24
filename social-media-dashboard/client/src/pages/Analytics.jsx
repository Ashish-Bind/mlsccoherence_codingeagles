import { LineChart } from '@mui/x-charts/LineChart'
import { PieChart } from '@mui/x-charts/PieChart'
import Table from '../components/Table'
import VerticalBar from '../components/VerticalBar'
import InfoCard from '../components/InfoCard'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import axios from 'axios'

export default function Analytics() {
  const [channelData, setChannelData] = useState([])
  const [loading, setLoading] = useState(true)
  const [recentVideos, setRecentVideos] = useState([])
  const [popularVideos, setPopularVideos] = useState([])
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  const fetchChannelData = async (query) => {
    setLoading(true)
    try {
      const res = await axios.get(
        `http://localhost:3000/get-data?search_query=${query}`
      )
      setChannelData(res.data)
    } catch (err) {
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const fetchRecentVideos = async (query) => {
    setLoading(true)
    try {
      const res = await axios.get(
        `http://localhost:3000/recent-videos??search_query=${query}`
      )
      setRecentVideos(res.data)
    } catch (err) {
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const fetchPopularVideos = async (query) => {
    setLoading(true)
    try {
      const res = await axios.get(
        `http://localhost:3000/popular-videos?search_query=${query}`
      )
      setPopularVideos(res.data)
    } catch (err) {
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetchChannelData(search)
    await fetchRecentVideos(search)
    await fetchPopularVideos(search)
  }

  console.log(recentVideos, popularVideos)

  return (
    <>
      <div className="flex justify-center my-2">
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Youtube Channel ID"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: 1100 }}
          />
        </form>
      </div>
      {loading && channelData ? (
        <div className="text-center">
          {!search ? 'Search about a channel' : 'Loading...'}
        </div>
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
              name={'Country'}
              key={channelData.items[0].snippet.country}
              unit={channelData.items[0].snippet.country}
            />
          </div>
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
                      {
                        id: 0,
                        value: channelData.items[0].statistics.subscriberCount,
                        label: 'Subscribers',
                      },
                      {
                        id: 1,
                        value: channelData.items[0].statistics.videoCount,
                        label: 'Videos',
                      },
                      {
                        id: 2,
                        value: channelData.items[0].statistics.viewCount,
                        label: 'views',
                      },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <div className="p-2 border w-max flex flex-col items-center min-w-[500px] ">
              <div className="text-xl font-bold">Popular Videos</div>
              <Table data={popularVideos} />
            </div>
            <div className="p-2 border w-max flex items-center ">
              <VerticalBar />
            </div>
          </div>
          <div className="flex gap-2 justify-center"></div>
        </div>
      )}
    </>
  )
}
