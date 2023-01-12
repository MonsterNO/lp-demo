// 下载模板
const download = require('download-git-repo');
// 命令行操作
const shell = require('shelljs');
// 显示提示图标
const symbols = require('log-symbols');
// 字体加颜色
const chalk = require('chalk');
// 动画效果
const ora = require('ora');

const gitRepo = {
  vue: 'MonsterNO/vue-demp',
  wxapp: 'MonsterNO/pro_template',
};

module.exports = class Generator {
  constructor(answers) {
    this.answers = answers;
  }
  //下载
  downloadGit() {
    let spinner = ora('下载中...');
    return new Promise((resolve, reject) => {
      download(gitRepo[this.answers.type], this.answers.name, (err) => {
        if (err) {
          spinner.fail();
          console.log(symbols.error, chalk.red('项目创建失败'));
          reject(err);
        } else {
          spinner.succeed();
          console.log(symbols.success, chalk.green('项目创建成功'));
          resolve();
        }
      });
    });
  }
  //git初始化
  gitInit() {
    if (this.answers.ifGitInit) {
      shell.cd(this.answers.name).exec('git init', (err) => {
        if (err) {
          console.log(symbols.error, chalk.red(err));
        } else {
          console.log(symbols.success, chalk.green('git 仓库初始化成功'));
        }
      });
    }
  }
  // 安装依赖包
  addPackage() {
    if (this.answers.ifInstall) {
      let spinner = ora('安装中...');
      spinner.start();
      shell.cd(this.answers.name).exec(`${this.answers.installWay == 'yarn' ? 'yarn' : 'npm i'}`, (err) => {
        if (err) {
          spinner.fail();
          console.log(symbols.error, chalk.red(err));
        } else {
          spinner.succeed();
          console.log(symbols.success, chalk.green('依赖包安装成功'));
        }
      });
    }
  }
};
