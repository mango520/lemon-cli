import figlet from "figlet";
import chalk from 'chalk';
// @ts-ignore
import standardFont from "figlet/importable-fonts/Standard.js"; 

// 手动解析字体
figlet.parseFont("Standard", standardFont);
export function goodPrinter() {
  console.log(chalk.rgb(193, 190, 40).visible("欢迎使用lemon-front脚手架工具!"));
  figlet.text('lemon-front', { font: 'Standard' }, (err, data) => {
    if (err) console.error('Error:', err);
    else console.log(chalk.rgb(193, 190, 40).visible(data!));
  });
}