"use strict";

const { src, dest, watch, series, parallel } = require("gulp");
const spritesmith = require("gulp.spritesmith");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const merge = require("merge-stream");
// 生成雪碧图
function spriteTask(done) {
  const spriteData = src("image/sprite-fragment/*.png").pipe(
    spritesmith({
      imgName: "sprite.png",
      cssName: "../css/sprite.css",
      padding: 5,
      algorithm: "binary-tree",
    })
  );

  const imgStream = spriteData.img.pipe(dest("image"));
  const cssStream = spriteData.css.pipe(dest("image"));
  done();
  return merge(imgStream, cssStream);
}

// 编译 SASS
function sassTask() {
  return src("./sass/**/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(dest("./css"));
}

// PostCSS 自动前缀
function postcssTask() {
  return src("./css/*.css")
    .pipe(sourcemaps.init())
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: ["ie 7-11", "Firefox > 20", "last 2 versions"],
        }),
      ])
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest("./dest"));
}

// 监听任务
function watchTask() {
  watch("./sass/**/*.scss", sassTask);
}

// 导出任务
exports.sprite = spriteTask;
exports.sass = sassTask;
exports.postcss = postcssTask;
exports.watch = watchTask;
exports.default = series([spriteTask, sassTask, postcssTask]); // 默认任务
