import { Row, Tooltip } from 'antd'
import { RiAddLine } from 'react-icons/ri'

export const defaultLabels = [
  '科技',
  '财经',
  '股票',
  '动漫',
  '手机',
  '读书',
  '音乐',
  '历史',
  '体育',
  '旅行',
  '电影',
  '法律',
  '军事',
  '娱乐',
  '故事',
  '教育',
  '游戏',
  '文化',
  '宠物',
  '美食',
  '职场',
  '软件',
  '数码',
  '图片',
  '视频',
  '三农',
  '家居',
  '家电',
  '育儿',
  '艺术',
  '时尚',
  '政法',
  '穿搭',
  '心理',
  '汽车',
  '健身',
  '棋牌',
  '摄影',
  '收藏',
  '保险',
  '搞笑',
  '自然'
]

/**
 * 标签管理
 * TODO 个性化标签持久化(新增、删除、编辑)
 * @returns
 */
const Label: React.FC = () => {
  return (
    <div className="m-1 pl-2">
      <Row gutter={[16, 8]}>
        {defaultLabels.map((label) => {
          return (
            <div
              key={label}
              className="mx-1 cursor-pointer rounded bg-slate-100 px-3 py-1"
            >
              {label}
            </div>
          )
        })}
        <div className="mx-1 cursor-pointer rounded bg-slate-100 px-4 py-1">
          <Tooltip title={'添加标签'}>
            <div className="text-xl">
              <RiAddLine />
            </div>
          </Tooltip>
        </div>
      </Row>
    </div>
  )
}

export default Label
