import ora from 'ora';
import chalk from 'chalk';
import process from 'child_process';
//初始化展示加载动画
const oraLoading = ora({
    text: '正在更新请稍候...',
    spinner:{
       interval: 300,
	   frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.blue(item))
    }
})
    
        
/**
 * 更新 lemon-cli 到最新版本
 */
export function update (){
    oraLoading.start()
    process.exec('npm -g lemon-cli@latest', (error) => {
        oraLoading.stop();
        if (!error) {
            console.log(chalk.green('更新成功'))
        } else {
            console.log(chalk.red(error.message || String(error)))
        }
    })
}