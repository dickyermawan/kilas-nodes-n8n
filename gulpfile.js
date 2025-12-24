const { src, dest } = require('gulp');

function copyIcons() {
    return src('nodes/**/*.{svg,png}')
        .pipe(dest('dist/nodes'));
}

exports.default = copyIcons;
exports['build:icons'] = copyIcons;
