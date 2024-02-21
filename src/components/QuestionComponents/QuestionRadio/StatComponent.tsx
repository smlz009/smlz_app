import React, { FC } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { QuestionRadioStatProps } from './interface'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const StatComponent: FC<QuestionRadioStatProps> = ({ stat }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <PieChart width={400} height={400}>
        <Pie
          data={stat}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="count"
          label={(i) => `${i.name}:${i.count}`}
        >
          {stat.map((item, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}

export default StatComponent
