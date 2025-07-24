import axios, { AxiosResponse } from 'axios';
import log from '../utils/log'
import chalk from 'chalk';
import { gt } from 'lodash';//版本比较函数

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

/**
 * 获取 npm 包的最新版本
 *
 * @param name 包名
 * @returns 返回包的最新版本号
 */
export async function getNpmLastVersion(name:string){
    const { data } = (await getNpmInfo(name)) as AxiosResponse;
    return data['dist-tags'].latest;
}


/**
 * 检查npm包是否有新版本需要更新
 *
 * @param name 包名
 * @param version 当前版本
 * @returns 布尔值，表示是否需要更新
 */
export async function checkVersion(name:string,version:string){
    const lastVersion = await getNpmLastVersion(name);
    //判断是否需要更新
    const needUpdate = gt(lastVersion,version);
    if(needUpdate){
        log.warn(`检测到新版本：${chalk.bgBlueBright(lastVersion)}，当前版本：${chalk.bgYellow(version)}，请更新后再使用！`);
        log.warn(`执行命令：${chalk.green(`npm install -g ${name}@${lastVersion}`)} 或使用 ${chalk.green('lemon update')}更新`);
    }
    return needUpdate
}