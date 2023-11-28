import React, { FC } from 'react'
import { HistoryRate } from '../../types/common'

type Props = {
  rate: HistoryRate
}

const ChartBlock:FC<Props> = (props) => {
  const { rate } = props
  return (
     <div className='d-flex flex-column align-items-center justify-content-between' key={rate.effectiveDate}>
          <div
            style={{
              height: `${rate.height.toFixed(0)}px`,
            }}
            className='chart-block'
          >
            <div className='chart-value'>
              {rate.mid}
            </div>
          </div>
          <span className='text-center'>{rate.effectiveDate}</span>
        </div>
  )
}

export default ChartBlock