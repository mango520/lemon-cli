import ora from 'ora';
import chalk from 'chalk';
import process from 'child_process';//主要用于执行 shell 命令的模块。
import log from '../utils/log'
//初始化展示加载动画
const oraLoading = ora({
    text: '正在更新请稍候...',
    spinner:{
       interval: 300,
	   frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.blue(item))
    }
})
        
/**
 * 更新 lemon-front 到最新版本
 */
export async function update (){
    oraLoading.start()
    process.exec('npm i lemon-front@latest -g', (error) => {
        oraLoading.stop();
        if (!error) {
            log.success(chalk.green('更新成功'))
        } else {
            log.error(chalk.red(error.message || String(error)))
        }
    })
}