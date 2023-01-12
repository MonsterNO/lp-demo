#!/usr/bin/env node

const program = require('commander');

program.version(`lp-cli ${require('../package').version}`).usage('<command> [options]');

program
  .command('create [name]')
  .description('创建一个由lp-cli支持的初始化项目')
  .option('create <项目名>', '创建时输入项目名')
  .action((name) => {
    if(!name){
      console.log(
        `\n  Usage: create [projectName]\n`
      );
      return
    }
    require('../lib/create')(name);
  });
program.parse(process.argv);
