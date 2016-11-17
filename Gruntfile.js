/**
 * Created by Administrator on 2016/11/17 0017.
 */
//包装函数
module.exports = function(grunt) {
    //配置任务，所有插件的配置信息
    grunt.initConfig({
        //获取package.json的信息
        pkg: grunt.file.readJSON('package.json'),

        //uglify插件的配置信息
        uglify: {
            options : {
                stripBanners: true,
                banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/test.js',
                dest: 'dist/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
            }
        },

        //jshint插件的配置信息
        jshint: {
            build: ['Gruntfile.js', 'src/js/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        //css插件的配置信息
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            build: ['src/css/*.css']
        },
        //watch插件的配置信息
        watch: {
            build: {
                files: ['src/js/*.js','src/css/*.css'],
                tasks: ['jshint', 'uglify'],
                options: {spawn: false}
            }
        }
    });

    //告诉grunt我们将如何使用插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    //告诉grunt当我们在终端中输入grunt命令时需要做什么
    grunt.registerTask('default',['jshint','csslint','uglify','watch']);
};
