const {
  override,
  fixBabelImports,
  addLessLoader, // less配置函数
  disableEsLint,
  addWebpackAlias,
  addPostcssPlugins, // 加载postcss
  addDecoratorsLegacy,
  adjustStyleLoaders, // 注入公共sass
  overrideDevServer,
  useEslintRc,
} = require('customize-cra');
//1、自定义环境变量REACT_APP_ENV配置
for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i].indexOf('--') === 0) {
    let item = process.argv[i]
      .substring('--'.length, process.argv[i].length)
      .split('=');
    process.env[item[0]] = item[1];
  }
}
//2、关闭map打包
process.env.GENERATE_SOURCEMAP =
  process.env.REACT_APP_ENV !== 'local' ? 'false' : 'true';

//3、progress 进度条插件
const chalk = require('chalk');
const progressBarPlugin = require('progress-bar-webpack-plugin')({
  width: 60,
  format: `${chalk.green('build')} [ ${chalk.cyan(':bar')} ]` +
    ` ${chalk.cyan(':msg')} ${chalk.red('(:percent)')}`,
  clear: true,
});

//4、修改build文件夹路劲需要
const path = require('path');
const paths = require('react-scripts/config/paths');
const staticFile = 'dist'; //打包出来的资源文件夹（如果不做设置则默认是build文件夹）
paths.appBuild = path.join(path.dirname(paths.appBuild), staticFile);

// 修改sass，CSS Modules命名 及去掉文件.module
// const changeSassModule = (config) => {
//   config.module.rules[1].oneOf[5].exclude = /\.(scss|sass)$/
//   config.module.rules[1].oneOf[6].test = /\.(scss|sass)$/
//   delete config.module.rules[1].oneOf[6].use[1].options.modules.getLocalIdent
//   config.module.rules[1].oneOf[6].use[1].options.modules = {
//     localIdentName: '[local]__[hash:base64:5]'
//   }
// }

// 5、本地开发时代理服务器解决跨域问题（仅仅本地开发有效）
// const devServerConfig = () => (config) => {
//   return {
//       ...config,
//       // 服务开启gzip
//       compress: true,
//       proxy: {
//           '/': {
//               target: 'http://192.168.100.118:8808/api',
//               changeOrigin: true,
//               pathRewrite: {
//                   '^/': '/',
//               },
//           },
//       },
//   };
// };

module.exports = {
  webpack: override(
    // 添加装饰器
    addDecoratorsLegacy(),
    // 6、集成antd的按需加载，新版（好像是4.0以后）的antd也可以不用设置了
    fixBabelImports('import', {
      libraryName: 'antd',
      style: true,
    }),
    //7、样式模块化和antd主题修改等配置
    addLessLoader({
      lessOptions: {
        // 修改antd默认样式
        modifyVars: {
          '@primary-color': '#317CC8', // 全局
          '@layout-header-background': '#317CC8', // 布局头部
          '@layout-body-background': '#fafafa', // 布局body
          // '@modal-confirm-body-padding': '8px',
          // '@table-padding-horizontal': '10px',
          // '@table-padding-vertical': '8px',
          // '@table-header-color': '#F4F4F4',
          // '@link-color': '#1890ff', // 链接色
          // '@success-color': '#52c41a', // 成功色
          // '@warning-color': '#faad14', // 警告色
          // '@error-color': '#f5222d', // 错误色
          // '@font-size-base': '14px', // 主字号
          // '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
          // '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
          // '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
          // '@disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
          // '@border-radius-base': '4px', // 组件/浮层圆角
          // '@border-color-base': '#d9d9d9', // 边框色
          // '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)' // 浮层阴影
        },
        // 无效
        // cssModules: {
        //   localIdentName: "[path][name]__[local]--[hash:base64:5]", 
        // },
        javascriptEnabled: true,
      },
    }),
    disableEsLint(), //忽略eslint警告
    // 8、设置路径别名，这样就不需要在项目中引用公用组件或一些公用模块的时候写很长很长的路径了，可根据实际需要配置
    addWebpackAlias({
      '@': path.join(__dirname, '/src'),
      '@components': path.join(__dirname, '/src/components'),
      '@util': path.join(__dirname, '/src/utils'),
      '@static': path.join(__dirname, '/src/static'),
      '@store': path.join(__dirname, '/src/store'),
      '@common': path.join(__dirname, '/src/common'),
    }),
    adjustStyleLoaders(rule => {
      // sass配置css-module,命名格式xx.scss 不需要加.module
      if (rule.test.toString() == /\.module\.(scss|sass)$/) {
        rule.test = /\.(scss|sass)$/
        // 修改css-module命名
        // rule.use[1].options.modules = {
        //   localIdentName: '[local]__[hash:base64:5]' // 名字+hash
        // }
      }

      if (rule.test.toString().includes('scss')) {
        // 自动注入公共sass
        rule.use.push({
          loader: require.resolve('sass-resources-loader'),
          options: {
            resources: ['./src/style/function.scss'],
          },
        })
        // sass配置css-module,命名格式xx.scss 不需要加.module
        if (rule.exclude) {
          rule.exclude = /\.(scss|sass)$/
        }
      }
    }),
    // 转换vw
    addPostcssPlugins([
      require('postcss-px-to-viewport')({
        viewportWidth: 1920, // 设计稿宽度
        viewportHeight: 1080, // (设计稿高度，可以不指定)
        unitPrecision: 3, // px to vw无法整除时，保留几位小数
        viewportUnit: 'vw', // 转换成vw单位
        selectorBlackList: ['.ignore', '.hairlines'], // (不转换的类名)
        minPixelValue: 1, // (Number) 小于1px不转换
        mediaQuery: false, // (Boolean) 允许媒体查询中转换.
      })
    ]),
    // addDecoratorsLegacy(),//添加装饰器支持
    // 9、webpack的一些配置项修改，此处修改打包输入目录和编译进度条配置
    (config) => {
      // changeSassModule(config);
      // 本地开发无需要设置打包
      if (process.env.REACT_APP_ENV !== 'local') {
        config.output.path = path.join(
          path.dirname(config.output.path || '/'),
          staticFile
        );
      }
      config.plugins.push(progressBarPlugin);
      return config;
    }),
  // 10、本地开发时代理服务器配置
  // devServer: overrideDevServer(devServerConfig()),
};