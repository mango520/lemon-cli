import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import createLogger from 'progress-estimator';
import chalk from 'chalk';
import log from './log'
import { goodPrinter } from '../utils/figletPrinter';
//配置git选项
const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 克隆目录
  binary: 'git',
  maxConcurrentProcesses: 6, // 最大并发进程数
};

//初始化展示进度条
const logger = createLogger({
    spinner:{
        interval: 100,
	    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.green(item))
    }
})

/**
 * 克隆远程仓库到本地
 *
 * @param url 远程仓库的URL
 * @param prjName 克隆到本地的项目名称
 * @param options 克隆时的选项数组，如 '--depth=1'
 * @returns 返回一个Promise，解析为克隆操作的结果
 */
export async function clone(url: string, prjName: string, options: string[]):Promise<any>{
    const git: SimpleGit = simpleGit(gitOptions);
    try {
        await logger(git.clone(url, prjName, options), '代码下载中...',{
            estimate: 1000 * 12, // 预计耗时，单位为毫秒
        });
        log.success(chalk.green('代码下载成功'));
        await goodPrinter();
        log.info(chalk.blue(' cd ' + prjName + ' 执行 npm install'));
        log.info(chalk.blue(' 初始化项目依赖'));
    } catch (error) {
        log.error(chalk.red(' 代码下载失败'));
        throw error;
    }
}