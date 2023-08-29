import { Block } from 'models/block'
import { rowHeight } from 'note'
import BlockItemContent from 'note/components/BlockItemContent'
import PageHeader from 'note/components/PageHeader'
import React, { useEffect, useState } from 'react'
import GridLayout from 'react-grid-layout'
import { useParams } from 'react-router-dom'
import { findOne } from 'repo/block'

/**
 * 主页
 */
const Home: React.FC = () => {
  const { id } = useParams()
  const [page, setPage] = useState<Block>()

  const init = async (id: string) => {
    const block = await findOne(id)
    setPage(block)
  }

  useEffect(() => {
    init(id as string)
  }, [id])

  return (
    <div className="mx-10">
      <div className="flex justify-center">
        <PageHeader block={page} readOnly={true} />
      </div>
      <GridLayout
        layout={page?.layout || []}
        rowHeight={rowHeight}
        width={window.innerWidth - 80}
        margin={[0, 0]}
        cols={24}
        autoSize={true}
        verticalCompact={true}
        isResizable={false}
        isDroppable={false}
        isDraggable={false}
        isBounded={true}
      >
        {(page?.items || []).map((block) => {
          return (
            <div key={block.id}>
              <BlockItemContent
                block={block}
                editable={false}
                onBlockChange={() => console.log()}
              />
            </div>
          )
        })}
      </GridLayout>
    </div>
  )
}

export default Home
