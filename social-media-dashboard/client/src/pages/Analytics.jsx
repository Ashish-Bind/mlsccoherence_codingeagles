import { LineChart } from '@mui/x-charts/LineChart'
import { PieChart } from '@mui/x-charts/PieChart'
import Table from '../components/Table'
import VerticalBar from '../components/VerticalBar'
import InfoCard from '../components/InfoCard'

export default function Analytics() {
  const data = [
    { name: 'Subscriber', unit: 1867 },
    { name: 'Watch time', unit: 1200 },
    { name: 'Impressions', unit: '400K' },
    { name: 'Performance', unit: '25%' },
  ]

  return (
    <div className="space-y-2 m-4">
      <div className="flex gap-2 justify-center my-2">
        {data.map((item) => (
          <InfoCard name={item.name} key={item.name} unit={item.unit} />
        ))}
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
