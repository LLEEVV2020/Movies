import { Space, Typography } from 'antd'
const { Text } = Typography
function Genre() {
  return (
    <li className="movie__genres-item">
      <Space direction="vertical">
        <Text code>text</Text>
      </Space>
    </li>
  )
}

export default Genre
