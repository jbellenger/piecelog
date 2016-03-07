import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import webConfig from '../../config/webpack.web';
import Main from './main';

const compiler = webpack(webConfig);
const server = new WebpackDevServer(compiler, {
  stats: {
    colors: true
  },
  contentBase: './static',
  publicPath: '/assets/',
  historyApiFallback: true,
});

const port = 8080;
server.listen(port, () => {
  console.log(`webpack dev server listening on port ${port}`);
});
