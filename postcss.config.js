
module.exports = ({ file, env }) => ({
    parser: file.extname === '.sss' ? 'sugarss' : false, // Handles `.css` && '.sss' files dynamically
    plugins: {
        'postcss-import': {},
        'autoprefixer': {},
        'cssnano': env === 'production' ? {} : false
    }
})
