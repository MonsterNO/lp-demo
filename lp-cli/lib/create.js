const Generator = require('./Generator');
const fs = require('fs-extra')
const inquirer = require('inquirer');
// 字体加颜色
const chalk = require('chalk');

const question = require('./question');

module.exports = async (name) => {
  if(fs.existsSync(name)){
    let {action} = await inquirer.prompt([
      {
        name:'action',
        type:'list',
        message:`文件夹${name}已存在，请选择下一步操作：`,
        choices:[
          {name:'clear',value:'clear'},
          {name:'cancel',value:false}
        ]
      }
    ])
    if(!action){
      return
    }else{
      console.log(`\nRemoving ${chalk.cyan(name)}...`)
      await fs.remove(name)
    }
  }
  let answers = await question();
  answers.name = name
  let generator = new Generator(answers);
  try {
    await generator.downloadGit();
  } catch (err) {
    process.exit(1)
  }
  generator.gitInit();
  generator.addPackage();
};

