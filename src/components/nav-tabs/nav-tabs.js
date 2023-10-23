import { Tabs } from 'antd'

import './nav-tabs.css'

const items = [
  {
    key: 'Search',
    label: 'Search',
  },
  {
    key: 'Rated',
    label: 'Rated',
  },
]

function NavTabs() {
  return (
    <div>
      <Tabs defaultActiveKey={'Search'} items={items} onChange={null} centered />
    </div>
  )
}

export default NavTabs
