安装包管理工具
npm install

运行项目
npm run dev

开发环境打包
npm run build--dev

生产环境打包
npm run build-prod

自动格式化src_ts下面的所有.ts文件
npm run style:prettier

运行src_ts下面的index.ts文件
npm start

运行tslint
npm run style:lint
tslint.json的配置：
"extend": [ "tslint-config-prettier" ], // 继承 tslint-config-prettier
"linterOptions": {
        "exclude": [ "**/node_modules/**" ]  // 排除 node_modules
    },

使用git commitizen，规范git commit
commitizen init cz-conventional-changelog --save --save-exact （git cz）
``
tsc --init 创建ts.config.js
webpack 配置module.rules.test  \.tsx?  use: {loader: 'ts-loader'}
``
