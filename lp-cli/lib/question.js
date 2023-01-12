const inquirer = require('inquirer');

module.exports = () => {
  return inquirer.prompt([
    {
      type: 'list',
      message: '请选择项目类型',
      name: 'type',
      choices: ['vue', 'wxapp'],
    },
    {
      type: 'confirm',
      message: '是否初始化 git 仓库',
      name: 'ifGitInit',
      default: true,
    },
    {
      type: 'confirm',
      message: '下载完成是否自动安装依赖包',
      name: 'ifInstall',
      default: true,
    },
    {
      type: 'list',
      message: '请选择安装方式',
      name: 'installWay',
      choices: ['yarn', 'npm'],
      when: (answers) => {
        return answers.ifInstall;
      },
    },
  ]);
};
