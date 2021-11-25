const path = require('path')
let echartChunkName = 'echarts'
const config = {
  projectName: 'demo',
  date: '2021-7-5',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/services': path.resolve(__dirname, '..', 'src/services'),
    '@/models': path.resolve(__dirname, '..', 'src/models'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
  },
  plugins: ['@tarojs/plugin-mock'],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'global', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    csso: {
      enable: true,
      config: {
      }
    },
    compile: {
      exclude: [
        path.resolve(__dirname, '..', 'src/components/ec-canvas/echarts.js')
      ]
    },
    webpackChain(chain, webpack) {
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              [echartChunkName]: {
                name: echartChunkName,
                priority: 50,
                test: /components[\\/]ec-canvas[\\/]echarts.js/,
                // test(module) {
                //   return /components[\\/]ec-canvas[\\/]echarts.js/.test(
                //     module.resource
                //   );
                // },
              },
            },
          },
        },
      });
    },
    addChunkPages(pages, pagesNames) {
      pages.set("pages/echarts/index", [echartChunkName]);
    },
    commonChunks(commonChunks) {
      commonChunks.push(echartChunkName);
      return commonChunks;
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'global', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },

}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
