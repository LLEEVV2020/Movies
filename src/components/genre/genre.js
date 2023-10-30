import { Space, Typography } from 'antd'
const { Text } = Typography
function Genre({ genreName }) {
  return (
    <li className="movie__genres-item">
      <Space direction="vertical">
        <Text code>{genreName}</Text>
      </Space>
    </li>
  )
}

export default Genre
