import path from 'path';

export default {
    mode: 'development',
    entry: path.resolve(__dirname, 'src','app'),
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js','.jsx', '.less']
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader:'babel-loader'
        },
        {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'less-loader'
            }
        ]
        }]
    }
}