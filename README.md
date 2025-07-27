## 🍋lemon-front
![Npm 版本](https://img.shields.io/badge/lemon--front-V1.0.1%20-green)

## 📖简介
- 快速搭建前端项目的脚手架工具

## 🤖技术栈
- vite、vue3、typeScript、Element-plus、pinia、pinia持久化、vue-router、axios、mock

## 安装
```bash
    npm install lemon-front -g
```
## ✅使用
- 选择模板创建项目
```bash
    lemon create [project-name]
```

## 🎬运行项目
```bash
    npm run dev
```

## 📦打包项目
```bash
    npm run build
```


## 目录结构
```
[your-project-name]                  
├─ mock          ## 模拟数据                                                           
├─ src                              
│  ├─ api        ## api接口文件                                                      
│  ├─ assets     ## 静态资源                                                        
│  ├─ components ## 公共组件                                            
│  ├─ layout     ## 模版文件                                                        
│  ├─ router     ## 路由文件                                                        
│  ├─ store      ## pinia全局状态管理                                          
│  ├─ styles     ## 全局样式                                                        
│  ├─ types      ## 类型文件                                                        
│  ├─ utils      ## 工具文件                                                        
│  ├─ views      ## 页面文件                                                        
├─ types         ## 全局类型文件                               
├─ eslint.config.js  ## eslint配置文件                                   
├─ eslintignore.js   ## eslint忽略文件                                    
├─ index.html        ## 入口文件                                                        
├─ package.json      ## 项目配置文件                                                  
├─ README.md         ## 项目说明文件                                                  
├─ tsconfig.json     ## ts配置文件                                                   
└─ vite.config.ts    ## vite配置文件                                        
```