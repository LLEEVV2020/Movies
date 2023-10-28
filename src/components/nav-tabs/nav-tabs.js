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

function NavTabs({ onChnage }) {
  return (
    <>
      <Tabs defaultActiveKey={items['Search']} items={items} onChange={onChnage} centered />
    </>
  )
}

export default NavTabs
