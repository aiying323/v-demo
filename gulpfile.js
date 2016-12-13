let gulp=require('gulp');
let webpack=require('gulp-webpack');
let named=require('vinyl-named');
gulp.task('default',function(){
	//匹配相应的文件，生成同名文件 并打包 到 dist目录下
	return gulp.src(['app.js']).pipe(named).pipe(webpack()).pipe(gulp.dest('dist/'));
});