import { Command } from 'commander'
import { version } from '../package.json'
import { createDir } from './command/create'
import { update } from './command/update';
// 命令行中使用 lemon xxx 即可触发
const program = new Command('lemon');
// 在命令行中使用 lemon -v 或者 lemon --version 查看当前版本号
program.version(version,'-v, --version');

//更新项目
program
    .command('update')
    .description('更新到最新版本')
    .action(async ()=>{
        await update()
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
program.parse();
