import path from 'path';
import fs from 'fs-extra';
import { input,select } from '@inquirer/prompts';
import { clone } from '../utils/clone';
import { name,version } from '../../package.json'
import axios, { AxiosResponse } from 'axios';
import { gt } from 'lodash'
import chalk from 'chalk';

//定义模版信息接口
export interface templateInfo {
    name: string;       //模版名
    cloneUrl: string;   //克隆地址
    description: string;//项目描述
    branch: string;     //分支名
}
//模板列表信息
export const templates: Map<string, templateInfo> = new Map([
    ["vite-vue3-TS-template", {
        name: "vite-vue3-TS-template",
        cloneUrl: "https://gitee.com/NetLemon/base-front.git",
        description: "基于Vue3+Vite+TypeScript的脚手架",
        branch: "master"
    }],
    ["vite-vue3-TS-base-template", {
        name: "vite-vue3-TS-template",
        cloneUrl: "https://gitee.com/NetLemon/base-front.git",
        description: "基于Vue3+Vite+TypeScript的脚手架",
        branch: "dev1"
    }]
]);

//创建项目
/**
 * 异步创建目录函数
 *
 * @param projectName 项目名称，可选参数
 * @returns 无返回值
 */
export async function createDir(projectName?:string) {
    //校验版本信息 保证当前版本与发布版本一致
    await checkVersion(name,version);
    //初始化模版信息
    const templateList = Array.from(templates).map((item:[string,templateInfo])=>{
        const [name,info] = item;
        return { name, value: name,description: info.description };
    });
    //如果未传入项目名称，则提示用户输入
    if(!projectName){
        //提示输入项目名称，并赋值
        projectName = await input({ message: '请输入项目名称' });
    }
    const filePath = path.resolve(process.cwd(), projectName);
    //判断项目是否存在，如果存在则询问用户是否覆盖
    if(fs.existsSync(filePath)){
        const overwrite = await isOverwrite(projectName);
        if(overwrite){
            //删除已存在的文件
            await fs.remove(filePath);
        }else{
            console.warn('项目创建已取消！');
            return;
        }
    }
    //选择使用哪个模板
    const templateName = await select({
        message: '请选择模板',
        choices: templateList,
    });
    
    //获取模板信息
    const info = templates.get(templateName);
    // console.log(projectName);
    // console.log(info);
    if(info){
        //克隆模板到本地
        await clone(info.cloneUrl,projectName,['-b',`${info.branch}`]);
    }
}

/**
 * 询问用户是否覆盖已存在的文件
 *
 * @param fileName 文件名
 * @returns 返回布尔值，true 表示覆盖，false 表示取消
 */
export async function isOverwrite(fileName: string): Promise<boolean> {
  console.warn(`${fileName} 目录已存在 !`)
  return select({
    message: '是否覆盖原文件: ',
    choices: [
      {name: '覆盖', value: true},
      {name: '取消', value: false}
    ]
  });
}

/**
 * 获取npm包的信息
 *
 * @param name npm包的名称
 * @returns 返回npm包的信息对象，如果请求失败则返回空对象
 */
export async function getNpmInfo(name:string){
    const npmUrl = `https://registry.npmjs.org/${name}`;
    let res = {};
    try{
        res = await axios.get(npmUrl) as AxiosResponse;
    }catch(e){
        console.error(e);
    }
    return res;
}

export async function getNpmLastVersion(name:string){
    const { data } = (await getNpmInfo(name)) as AxiosResponse;
    return data['dist-tags'].latest;
}


/**
 * 检查指定包的版本是否是最新的
 *
 * @param name 包名
 * @param version 当前版本
 * @returns 无返回值
 */
export async function checkVersion(name:string,version:string){
    const lastVersion = await getNpmLastVersion(name);
    //判断是否需要更新
    const needUpdate = gt(lastVersion,version);
    if(needUpdate){
        console.warn(`检测到新版本：${chalk.bgBlueBright(lastVersion)}，当前版本：${chalk.bgYellow(version)}，请更新后再使用！`);
        console.warn(`执行命令：${chalk.green(`npm install -g ${name}@${lastVersion}`)} 或使用 ${chalk.green('lemon update')}更新`);
    }
    return needUpdate
}
