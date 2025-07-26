import logSymbols from 'log-symbols';
//封装控制台信息输出方法
const log = {
    success:(message:string)=>{
        console.log(logSymbols.success,message);
    },
    error:(message:string)=>{
        console.log(logSymbols.error,message);
    },
    info:(message:string)=>{
        console.log(logSymbols.info,message);
    },
    warn:(message:string)=>{
        console.log(logSymbols.warning,message);
    }
}
export default log;