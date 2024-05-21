<div align="center">
  <h1>XNote服务端</h1>
</div>



## 项目介绍

基于 NestJS + Prisma 技术栈的 Nodejs 后台项目
[NestJS 文档](https://docs.nestjs.cn/)
[Prisma 文档](https://www.prisma.io/)

## 环境准备

1. 准备下列其中一种数据库：PostgreSQL、Mysql、SQL Server、SQLite、MongoDB、MariaDB
2. 安装 MinIO

## 快速开始

1. 全局安装NestJS环境
```bash
npm install -g @nestjs/cli
```

2. 安装项目依赖
```bash
npm install
```

3. 修改.env 配置
- 创建 .env 文件，把 .env.example 文件内容拷贝至 .env，
- 修改 DATABASE_URL，设置数据库类型、用户名、密码、地址，参考 [Prisma 文档](https://www.prisma.io/)
- 配置认证相关密钥
- 配置MinIO连接

4. 初始化数据库
```bash
prisma migrate deploy
prisma generate
``` 
5. 启动服务
   
```bash
npm start
``` 

