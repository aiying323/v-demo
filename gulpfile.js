let gulp=require('gulp');
let webpack=require('gulp-webpack');
let named=require('vinyl-named');

gulp.task('default',function(){
	//匹配相应的文件，生成同名文件 并打包 到 dist目录下
	return gulp.src(['./src/app.js'])
	.pipe(named())
	.pipe(webpack({
		module:{
			loaders:[
				{test:/\.vue$/,loader:'vue',devtool:'source-map'},
				{test:/\.css$/,loader:'css'},
				{test:/\.json$/,loader:'json'},
				{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
				//解析html
            	{test:/\.html$/,loader:'html'},
            	{
        // edit this for additional asset file types
        			test: /\.(png|jpg|gif)$/,
        			loader: 'file?name=[name].[ext]?[hash]'
      			}
			]
		},
		watch:true,
		babel: {
       		presets: ['es2015'],
        	plugins: ['transform-runtime'] //这个必须install babel-plugin-transform-runtime
    	},
    	resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js 
       		extensions: ['', '.js','.css', '.vue']
    	}
	}))
	.pipe(gulp.dest(__dirname+'/dist/'));
});