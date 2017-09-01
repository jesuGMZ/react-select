
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const standalone = process.env.STANDALONE;
const uglifyBuild = process.env.UGLIFY;

console.log('STANDALONE', standalone);
console.log('UGLIFY', uglifyBuild);
export default {
    input: 'src/index.umd.js',
    output: {
      name: 'Select',
      file: standalone ? 'examples/dist/standalone.js': getDist(uglifyBuild),
      format: 'umd',
    },
    globals: {
      react: 'React',
      'prop-types': 'PropTypes',
      'react-dom': 'ReactDOM',
      'react-input-autosize': 'AutosizeInput',
      'classnames': 'classNames',
    },
    external: [
      'classnames',
      'prop-types',
      'react-input-autosize',
      'react',
      'react-dom',
    ],
    plugins: [
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: [['es2015', { 'modules': false }], 'stage-0', 'react'],
        plugins: ['external-helpers', 'transform-class-properties', 'transform-object-rest-spread']
      }),
      resolve(),
      uglifyBuild && uglify({}, minify) ,
    ]
};


function getDist (uglify) {
  return uglify ? 'dist/react-select.min.js' : 'dist/react-select.js';
}
