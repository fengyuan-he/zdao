# Z岛

## 一键部署

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/fengyuan-he/zdao#DATABASE_URL=&NEXT_PUBLIC_TITLE=z岛&NEXT_PUBLIC_DESCRIPTION=一个没有用户系统的真匿名论坛)

提示：可以去[neon](https://neon.tech)白嫖数据库

## 手动运行

### 第一步：环境变量

创建.env文件，填入：

| 键                       | 必须 | 含义            |
|-------------------------|----|---------------|
| DATABASE_URL            | 是  | Postgres数据库网址 |
| NEXT_PUBLIC_TITLE       | 是  | 网站标题          |
| NEXT_PUBLIC_DESCRIPTION | 否  | 网站描述          |

### 第二步：安装依赖

```bash
pnpm i
```

### 第三步：启动服务

```bash
pnpm dev
```