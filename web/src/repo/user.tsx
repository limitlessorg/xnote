import { User } from 'models/user'
import http from './http'
import { treeToTreeNode } from 'utils'
import { UserOutlined } from '@ant-design/icons'

/**
 * 获取用户信息
 */
export function getUser(id: string) {
  return http.get(`user/getUser/${id}`)
}

/**
 * 获取用户列表
 */
export function listUser() {
  return http.get(`user/listUser`)
}

/**
 * 搜索用户
 */
export function searchUser(info: string) {
  return http.post(`user/search`, { info })
}

/**
 * 修改信息
 */
export function patchUser(user: User) {
  return http.patch(`user`, user)
}

/**
 * 获取企业人员
 */
export function treeOrgUser() {
  return listUser().then((res: any[]) => {
    const badge = res.filter((user: any) => user.status == '1').length
    return {
      key: 'users',
      title: '人员管理',
      path: `/design/org/user/users`,
      badge,
      icon: <UserOutlined rev={undefined} />,
      operations: [
        {
          key: 'InviteUser',
          label: <span>邀请人员</span>
        }
      ],
      children: treeToTreeNode(res, {
        cb: (item) => {
          item.path = `/design/org/user/${item.id}`
          item.operations = [
            {
              key: 'DeleteUser',
              label: <span>移除人员</span>
            }
          ]
        }
      })
    }
  })
}
