import { useQuery } from '@tanstack/react-query'
import { Input, Tabs } from 'antd'
import React, { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { getCategoryOptions, searchTemplate } from 'repo'
import useSettingStore from 'store/setting'
import TemplateUser from './User'
import { Template as TemplateModel } from 'models/template'
import TemplateItem from './Item'

/**
 * 模板中心
 */
const Template: React.FC = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [category, setCategory] = useState('')
  const { theme } = useSettingStore()

  const { data: templates } = useQuery({
    queryKey: ['searchTemplate', value, { category }],
    queryFn: () => searchTemplate(value, category),
    cacheTime: 0
  })

  const { data: categoryOptions } = useQuery({
    queryKey: ['getCategoryOptions'],
    queryFn: getCategoryOptions
  })

  const onTabChange = (key: string) => {
    setCategory(key)
  }

  return (
    <div className="px-64 py-12">
      <div className="flex justify-center">
        <h1 style={{ color: theme.colorPrimary }}>XNote 笔记</h1>
      </div>
      <div className="flex justify-center px-64 py-4">
        <Input
          suffix={
            <div className="cursor-pointer">
              <RiSearchLine />
            </div>
          }
          placeholder="搜索内容：请输入关键字"
          size="large"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="rounded-2xl"
        />
      </div>
      <div className="flex">
        <div className="w-2/3">
          <Tabs
            defaultActiveKey="all"
            items={(categoryOptions || []).map(
              (c: { value: string; label: string }) => {
                return { key: c.value, label: c.label }
              }
            )}
            onChange={onTabChange}
            size="large"
          />
          <div>
            {(templates || []).map((tpl: TemplateModel) => {
              return <TemplateItem key={tpl.id} template={tpl}></TemplateItem>
            })}
          </div>
        </div>
        <div className="w-1/3">
          <TemplateUser />
        </div>
      </div>
    </div>
  )
}

export default Template
