const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');

// video.paused: 这是 <video> 元素的一个只读属性，如果视频当前是暂停的，它就返回 true
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    // 直接用方括号语法 []，把字符串变量 method 作为方法名来调用。JS 会自动解析 method 的值（'play' 或 'pause'），然后执行对应的方法
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

function skip() {
    // parseFloat(...): 将获取到的字符串属性值转换成浮点数
    // dataset 属性返回的值总是字符串类型
    // currentTime 是 <video> 元素的一个可读写属性，代表当前播放的时间（单位：秒）。
    // 直接用 += 在当前时间上增加或减少相应的秒数，实现跳转。
    video.currentTime += parseFloat(this.dataset.skip);
}

// 处理音量和播放速度滑块的变化
function handleRangeUpdate() {
    // this.name: 获取滑块的 name 属性，它们分别是 'volume' 和 'playbackRate'。
    // 使用了动态属性访问！这行代码会根据滑块的 name，直接设置 video 对象上同名的属性。
    video[this.name] = this.value;
}

// 根据视频的当前播放时间，实时更新进度条的长度。
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    // flex-basis可以设置 Flex 项目的初始主尺寸。
    // 动态地把这个百分比赋值给flex-basis`，进度条就会自动伸长。
    progressBar.style.flexBasis = `${percent}%`;
}

// 实现点击或拖动进度条来跳转播放进度的功能。
function scrub(e) {
    // e.offsetX: 鼠标点击事件 e 的属性，表示鼠标点击位置相对于目标元素（这里是 progress 容器）左边缘的水平距离。
    // progress.offsetWidth: progress 容器的总宽度。
    // (e.offsetX / progress.offsetWidth): 计算出鼠标点击的位置在进度条上的百分比。
    // * video.duration: 用这个百分比乘以视频总时长，就能精确计算出用户想要跳转到的时间点。
    // video.currentTime = scrubTime;: 将视频的播放时间直接设置为计算出的目标时间。
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));

// change 事件：当用户更改并确认输入值后触发（如释放鼠标或按回车键）
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
// mousemove 事件：当用户在元素上移动鼠标时持续触发
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);