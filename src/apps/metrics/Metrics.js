import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Content, Items, PageContentLayout } from 'components'
import { Chart, ChartFilters, VerificationsCard, VerificationStatistic } from 'fragments'
import { getIdentitiesCount } from 'state/identities'
import { getMerchantStatistic, getMerchantStatisticFilter } from 'state/merchant'

export default function Metrics() {
  const [filter, handleClick] = useState('currentWeek');
  const [reviewNeededCount, setReviewNeededCount] = useState(0);
  const [statistic, setStatistic] = useState({});
  const [chartData, setChartData] = useState([]);
  const token = useSelector(s => s.auth.token)
  const displayName = useSelector(s => s.merchant.displayName)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      getIdentitiesCount(token, { status: 'reviewNeeded' })
    ).then(response => {
      setReviewNeededCount(response.data.count);
    })

    dispatch(
      getMerchantStatistic(token)
    ).then(response => {
      setStatistic(response.data);
    })
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(
      getMerchantStatisticFilter(token, filter)
    ).then(response => {
      setChartData(response.data);
    })
  }, [token, filter, dispatch]);

  return (
    <Content>
      <Items flow="row" gap="4">
        <PageContentLayout navigation={false}>
          <main>
            <Items flow="row">
              <Chart
                title={displayName}
                filter={filter}
                data={chartData}
              >
                <ChartFilters handleClick={handleClick} filter={filter} />
              </Chart>
            </Items>
            <VerificationStatistic statistic={statistic} />
          </main>
          <aside>
            <VerificationsCard count={reviewNeededCount} />
          </aside>
        </PageContentLayout>
      </Items>
    </Content>
  );
}
