#!/usr/bin/env node
import { Command } from 'commander'
import { version } from '../package.json'
import { createDir } from './command/create'
import { update } from './command/update';
import process from 'node:process';
import log from './utils/log'
// 命令行中使用 lemon xxx 即可触发
const program = new Command();

program
    .name('lemon')
    .description('快速搭建前端项目的脚手架工具')
    // 在命令行中使用 lemon -v 或者 lemon --version 查看当前版本号
    .version(version,'-v, --version');


//更新项目
program
    .command('update')
    .description('更新到最新版本')
    .action(()=>{
        update()
    })

//创建项目
program
    .command('create')
    .description('创建一个新项目')
    .argument('[name]','项目名称')
    .action(async (projectName?:string)=>{
        // 执行创建项目操作
        createDir(projectName)
    })

// 解析命令行参数
program.parse();

// 捕获所有未处理的异常
process.on('uncaughtException', (err) => {
  if (err.message.includes('SIGINT')) {
    log.warn(' 已取消操作');
    process.exit(0);
  }
  throw err;
});