import { Avatar, Card, Col, Row, Statistic } from 'antd'
import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import useSpaceStore from 'store/space'

const TemplateUser: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useSpaceStore()

  return (
    <div className="mt-6 rounded-lg bg-gray-50">
      <div className="p-4">
        <div className="flex cursor-pointer" onClick={() => navigate('/page')}>
          <Avatar size={32} src={user?.logo} shape="square" />
          <div className="flex px-2 text-xl font-bold">
            <span>{user?.name}</span>
            <div className="px-2">
              <AiOutlineArrowRight />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center px-4 pb-6">
        <Row gutter={16} className="w-full text-center">
          <Col span={8}>
            <Card bordered={false}>
              <Statistic title="文章" value={12} />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic title="获赞" value={223} />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic title="评论" value={48} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default TemplateUser
