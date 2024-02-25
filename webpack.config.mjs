import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: {
    http: resolve(__dirname, 'index.ts'),
    wss: resolve(__dirname, 'src', 'ws_server', 'index.ts'),
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  externals: {
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate',
  },
};
