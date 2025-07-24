const figlet = require ("figlet") ;
import chalk from 'chalk';

export async function goodPrinter(){
  console.log(chalk.rgb(193, 190, 40).visible("欢迎使用lemon-front脚手架工具!"));
  const data = await figlet('lemon-front');
  console.log(chalk.rgb(193, 190, 40).visible(data));
};