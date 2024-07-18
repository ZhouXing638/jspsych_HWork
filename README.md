## Go_NoGo实验包含的主要部分
### 实验正式开始前
_这一部分一般放在正式实验开始之前，主要的作用是向被试们展示实验发起的机构、实验自身的一些基本内容，同时在这一阶段也会收集实验需要的被试个人信息。在完成这一部分之后，正式开始实验。_
### Go_NoGo实验的流程
_这一部分是整个实验中最重要的，因此在正式编写实验之前，我们需要先一步了解实验的具体流程。以Go_NoGo实验为例：_
_Go_NoGo范式是心理学中的一个经典范式，顾名思义，就是当目标刺激出现时进行按键反应(Go)，当出现的是其他刺激时不按键(NoGo)。例如，我们将“花”定义成目标刺激，将“昆虫”定义成其他刺激，那么当我们向被试呈现“荷花，樱花，菊花，蟑螂，苍蝇，蚊子”这一系列刺激的时候，被试应当只对“荷花，樱花，菊花”作出按键反应。一般Go_NoGo实验会在正式实验开始前设置练习实验，有助于帮助被试有效地区分目标刺激和其他刺激，从而提升实验的效度。_
### 数据记录
_在正式的实验部分结束，作为一个完整的流程，我们还应该向被试呈现“结束指导语”并记录数据。没有数据，实验者将无法进行任何的数据分析，相应地也无法得出任何的结论，因此记录数据部分也非常重要。我们只有提前对实验流程有一个清晰的认识，才能高效地编写出需要的实验。_
## 实验代码编写
### 编写实验前
_确认电脑中有相应的编译软件(Vs.code)，之后新建一个文件夹，用于储存接下来我们的代码文件。
在Vs.code中打开该文件夹，之后新建一个html文件，一个js文件，一个css文件。如果想要新建一个html文件，直接点击标红处，之后将文件的名称定义为“你需要的名称.html”即可，其他两种文件以此类推。其中，jsPsych-6.1.0是本实验所依赖的jsPsych插件，_
__请先下载并解压jsPsych-6.1.0这个压缩包到本地。__
_之后在html文件中输入“！”，之后按“tab”键，将会得到以下代码。
这些代码大家可以理解成html的初始代码，一般情况下不需要改动。但注意下图标红的代码是在打开后网页的名字，可以改成自己需要的。请注意，执行我们命令的代码都应该写在<body></body>中。但其实，一般情况下我们会在js文件中写具体的实验流程代码。因此我们直接在body中引用js文件(在html中的head部分引入需要的jsPsych插件)。_
```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Experiment_ZX</title>
    <!-- 引入以下.js,.css 文件 -->
    <!-- <script src="Go_NoGo.js"></script> -->

    <!-- 引入jspsych.js文件 -->
    <script src="jspsych-6.1.0/jspsych.js"></script>
    <!-- 引入jspsych.css文件 -->
    <link href="jspsych-6.1.0/css/jspsych.css" rel="stylesheet" type="text/css">
    <!-- 引入自己写的css文件experiment.css -->
    <link href="Go_NoGo.css" rel="stylesheet" type="text/css">
    <!-- <script src="https://unpkg.com/jspsych@7.3.4"></script>
    <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.3"></script>
    <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.3"></script>
    <script src="https://unpkg.com/@jspsych/plugin-preload@1.1.3"></script>
    <link href="https://unpkg.com/jspsych@7.3.4/css/jspsych.css" rel="stylesheet" type="text/css" /> -->
    <!-- 引入需要的jspsych包 -->
    <!-- 也可以直接把所有的jspsych包都直接引用进来 -->
    <script src="jspsych-6.1.0/plugins/jspsych-fullscreen.js"></script>
    <script src="jspsych-6.1.0/plugins/jspsych-instructions.js"></script>
    <script src="jspsych-6.1.0/plugins/jspsych-survey-html-form.js"></script>
    <script src="jspsych-6.1.0/plugins/jspsych-html-button-response.js"></script>
    <script src="jspsych-6.1.0/plugins/jspsych-html-keyboard-response.js"></script>
    <script src="jspsych-6.1.0/plugins/jspsych-categorize-html.js"></script>
    <script src="jspsych-6.1.0/plugins/jspsych-survey-text.js"></script>
    <script src="jspsych-6.1.0/plugins/jspsych-html-button-response.js"></script>
    <script src="jspsych-6.1.0/plugins/jspsych-html-keyboard-response.js"></script>
  </head>
  <body>
    <script src="Go_NoGo.js"></script>
  </body>
</html>
```
## JavaScript（.js文件）
### 开始指导语
_在正式开始编写实验之前，我们需要明确一个在jsPsych中非常重要的概念——时间线timeline。
如果将一个完整的时间比喻成一串“珍珠项链”，那么我们可以把每一个功能都看作一个独立的“珍珠”，而timeline则是一条“绳子”。即使当我们完成了对所有“珍珠”的加工，他们也只是分散的“一些珍珠”而没有办法变成一条“珍珠项链”。这时就需要timeline这条“绳子”将这些功能“珍珠”串起来，才能形成一条完整的“项链”即完整的实验。同时，timeline还可以对这些功能的施行顺序进行排序。类似于，我们在“绳子”上标记了每一个“珍珠”的顺序，在最后串成“项链”时，我们也必须严格地按照这个顺序。
因此在JavaScript中，我们使用jsPsych实现功能时，应该首先设置一条timeline，将这些“珍珠”按照想要的顺序连接在一起，之后再按照时间线运行。
let timeline=[];
注意，timeline必须存在，每一个想要实现的功能也必须写在timeline中，否则无法运行该功能。
在进行心理学实验时，一般要求全屏。因为非全屏可能会因为一些其他因素（如浏览器自身）而对实验产生干扰。
想要在实验过程中将浏览器全屏，我们可以使用fullscreen插件进行全屏设置。同时fullscreen中的message参数允许我们在全屏的同时在屏幕上呈现一些文字信息，因此我们可以直接把开始指导语些在写一部分。具体代码如下所示：_
```javascript
// generate a random subject ID with 15 characters
// var subject_id = jsPsych.randomization.randomID(5) // 随机ID
const input = prompt('Please input First letters of your name, eg., "ZhouXing" will be writen to "ZX".')
alert(`Your ID is ${input}`)
let subject_id = input  //通过标签名获取
var subject_id1 = [subject_id]
var sub_save_file = ['data_' + subject_id1 + '.csv']

// pick a random condition for the subject at the start of the experiment
var condition_assignment = jsPsych.randomization.sampleWithoutReplacement(['conditionA', 'conditionB', 'conditionC'], 1)[0];

// record the condition assignment in the jsPsych data
// this adds a property called 'subject' and a property called 'condition' to every trial
jsPsych.data.addProperties({
  subject: subject_id,
  condition: condition_assignment
});

let timeline=[];

var open_fullscreen = {   
    type: 'fullscreen',   
    fullscreen_mode: true,
    message: `
    <p style="font: 48pt 微软雅黑; color: red; text-align: left; line-height: 1.6em">
    <b>
    请你：<br/>
    (1)在电脑上进行测验,并使用主流浏览器打开本网页<br/>
    (Chrome、Edge、Firefox、Safari等,不要用IE)<br/>
    (2)关掉电脑上其他正在运行的程序或将其最小化<br/>
    (3)将手机调至静音,并尽可能减少环境噪音干扰<br/>
    (4)在测验过程中不要退出全屏<br/>
    (5)务必认真作答<br/><br/>
    </b>
    如果你同意参与,并且清楚理解了上述要求,请点击开始：
    </p>`,

    button_label: '点击这里全屏开始',
    delay_after: 100

}

timeline.push(open_fullscreen)
```
_上述代码除了使用fullscreen插件实现了“全屏”这一功能，还将open_fullscreen添加(push)到时间线(timeline)中。这就是所谓地用timeline这个“绳子”将open_fullscreen这个独立的“珍珠”串到真正的实验流程中，因此这一步是必不可少的。在后面编写代码时，我们要记得每完成一块功能的编写，都需要即使地将其push到timeline中。
但此时，以上代码只是将整个实验准备好了，还不能真正地运行。想要运行还需要一个“开关”——在所有功能的最后添加jsPsych.init，这样才能真正地运行。_
```js
jsPsych.init({
    timeline:timeline,
    on_finish: function () {
        jsPsych.data.displayData();
    }
});
```
### 正式实验
#### 导入实验材料
_以本实验为例，要求将“花”定义成目标刺激，将“昆虫”定义成其他刺激，那么当我们向被试呈现“荷花，樱花，菊花，蟑螂，苍蝇，蚊子”这一系列刺激的时候，被试应当只对“荷花，樱花，菊花”作出按键反应。因此导入荷花，樱花，菊花，蟑螂，苍蝇，蚊子”这一系列材料。其中，我们对以上材料使用“stim_type”目的是标记它的类型，方便在之后进行使用。同时，如果正式实验中使用的材料与练习实验中使用的材料一致，那么之后不用再重复导入，直接使用即可。_
_如果你使用的刺激材料是图片，那么请直接把word后面的内容换成图片的路径即可。_
```js
//载入文字材料
var Words = [
    { data: { stim_type: 'flower' , correct_response:' '}, word: '荷花' },
    { data: { stim_type: 'flower' , correct_response:' '}, word: '樱花' },
    { data: { stim_type: 'flower' , correct_response:' '}, word: '菊花' },
    { data: { stim_type: 'insect' , correct_response:jsPsych.NO_KEYS}, word: '蟑螂' },
    { data: { stim_type: 'insect' , correct_response:jsPsych.NO_KEYS}, word: '苍蝇' },
    { data: { stim_type: 'insect' , correct_response:jsPsych.NO_KEYS}, word: '蚊子' },
]
```
#### 指导语和实验材料呈现
_因为现在浏览器页面已经在开始指导语呈现时实现了全屏，因此直接使用html-keyboard-response来呈现指导语。在实验材料呈现时，我们希望先呈现一个500ms的“+”注视点，之后呈现我们的文字材料自己（例如“樱花”），之后再呈现一个“正确”或“错误”的反馈。这里面我们自己构造了一个函数keyCode，目的是将按键转化成其对应的数字。这样做是为了在使用categorize-html中的key_answer参数时，可以有效地进行对应。其中，反馈部分我们可以用categorize-html中自带的参数。correct_text是正确时的反馈，incorrect_text是错误时的反馈，feedback_duration是反馈停留的时间。具体的其他设置可以参考jsPsych文档中categorize-html插件的介绍，里面还包括“呈现反馈时是否同时呈现刺激”等其他可以设置的参数。如果你使用的刺激材料是图片，请把categorize-html换成categorize-image。因为前者只能呈现字符串，只有后者才能呈现图片。具体代码如下所示。_
```javascript
//练习部分
//指导语呈现
var test_prac_instr = {
    type: 'html-keyboard-response',
    stimulus: `
    <p style="text-align: left; color: purple; font-size: 20pt; background-color: white">
    练习任务：<br/><br/>
    下面是一个Go_NoGo任务。<br/>
    屏幕上将依次呈现一些名词,它们分别是<span style="color:green">花</span>或<span style="color:red">昆虫</span>。<br/>
    在每个名词出现之后,请<span style="color:#FFD866">尽量正确并且快速地</span>做出按键反应。<br/>
    - 如果出现<span style="color:green">花</span>,请<span style="color:#FFD866">按“空格”键</span>。<br/>
    - 如果出现<span style="color:red">昆虫</span>,请<span style="color:#FFD866">不按键</span>。<br/>
    每次判断均会有“√”或错误“X”的反馈。<br/><br/>
    现在,请您将手指放在“空格”键上,并保证实验过程中手指不离开键盘。<br/>
    如果您已认真阅读并充分理解了上述要求,请按空格键开始。<br/><br/></p>`,
    choices: [' ']
}
timeline.push(test_prac_instr)


//把按键转化成对应的数字
function keyCode(character) {
    return jsPsych.pluginAPI.convertKeyCharacterToKeyCode(character)
}

//呈现部分
var test_prac = {
    //呈现的材料——即上面导入的材料
    timeline_variables: Words,
    
    //单个试次流程(因为有很多个材料,因此反复执行)
    timeline: [{
            // “+”字注视点
            type: 'html-keyboard-response',
            stimulus: '+',
            choices: jsPsych.NO_KEYS,
            trial_duration: 500,    //单位是ms
            post_trial_gap: 0,
            response_ends_trial: false
        },
        {
            //刺激材料
            type: 'categorize-html',
            data: jsPsych.timelineVariable('data'),
            stimulus: jsPsych.timelineVariable('word'),   //这个地方写什么,就按照什么进行反复执行
            choices: [' '],
            trial_duration: 1000,

            //不同的材料类型,正确的反应
            key_answer: function() {
                switch (jsPsych.timelineVariable('data', true).stim_type) {
                    case 'fruit':
                        return keyCode(' ')
                    case 'insect':
                        return keyCode(jsPsych.NO_KEYS)
                }
            },           
            correct_text: '√',   //正确的反馈,默认值是correct
            incorrect_text:  'x',    //错误的反馈,默认值是wrong
            feedback_duration: 500,    //反馈停留的时间
            show_feedback_on_timeout: true, //超时未反应呈现错误结果
        },
    ],
    //试次的展示
    repetitions: 1,  //材料重复的次数,可以大于1,即重复多次
    randomize_order: true   //乱序
}
timeline.push(test_prac)

//正式实验部分
//指导语呈现
var test_instr = {
    type: 'html-keyboard-response',
    stimulus: `
    <p style="text-align: left; color: purple; font-size: 20pt">
    正式任务：<br/><br/>
    下面是一个Go_NoGo任务。<br/>
    屏幕上将依次呈现一些名词,它们分别是<span style="color:green">花</span>或<span style="color:red">昆虫</span>。<br/>
    在每个名词出现之后,请<span style="color:#FFD866">尽量正确并且快速地</span>做出按键反应。<br/>
    - 如果出现<span style="color:green">花</span>,请<span style="color:#FFD866">按“空格”键</span>。<br/>
    - 如果出现<span style="color:red">昆虫</span>,请<span style="color:#FFD866">不按键</span>。<br/>
    每次判断不再出现反馈。<br/><br/>
    现在,请您将手指放在“空格”键上,并保证实验过程中手指不离开键盘。<br/>
    如果您已认真阅读并充分理解了上述要求,请按空格键开始。<br/><br/></p>`,
    choices: [' ']
}
timeline.push(test_instr)

//呈现部分
var test = {
    timeline_variables: Words,
    timeline: [{
            type: 'html-keyboard-response',
            stimulus: '+',
            choices: jsPsych.NO_KEYS,
            trial_duration: 500,    
            post_trial_gap: 0,
            response_ends_trial: false
        },

        {
            type: 'categorize-html',
            data: jsPsych.timelineVariable('data'),
            stimulus: jsPsych.timelineVariable('word'),  
            choices: [' '],
            trial_duration: 1000,
            key_answer: function() {
                switch (jsPsych.timelineVariable('data', true).stim_type) {
                    case 'fruit':
                        return keyCode(' ')
                    case 'insect':
                        return keyCode(jsPsych.NO_KEYS)
                }
            },           
            correct_text: ' ',   
            incorrect_text:  ' ',    
            feedback_duration: 0,   
            show_feedback_on_timeout: true, 
        },
    ],
    //试次的展示
    repetitions: 2,  
    randomize_order: true   
}
timeline.push(test)
```
### 数据记录
_在实验呈现部分结束后，还需要呈现结束指导语并退出全屏。现在已有的这些代码虽然已经可以满足基本的实验运行需求，但是最后的实验数据全都呈现在实验结束后的浏览器页面上，这显然非常不利于我们进行后续的数据分析。因此我们可以采用一些方法，将其直接储存在csv文件中。也就是将jsPsych.data.displayData();改成jsPsych.data.get().localSave("csv", "data.csv")，这样就可以实现将数据储存在名为data.csv的文件中了。这里是示例，可根据实际情况更改“data.csv”或用变量代替。具体代码如下：_
```javascript
//结束指导语
var end_intro = {
    type: 'html-keyboard-response',
    stimulus: `
    <p style="font: bold 32pt 微软雅黑; color: #B22222">
    实验结束,感谢您的参与！</p>
    <p style="font: 20pt 微软雅黑; color: black"><br/>
    <按任意格键退出全屏模式></p>
    </p>`,
    choices: jsPsych.ALL_KEYS,
    post_trial_gap: 100
}
timeline.push(end_intro)

//退出全屏模式
var quitFullscreenMode = {
    type: "fullscreen",
    fullscreen_mode: false,
    on_finish: function () {
        var bodyNode = document.getElementsByTagName("body");
        for (let i = 0; i < bodyNode.length; i++) {
            bodyNode[i].style.cursor = "none";
        }
    }
};
timeline.push(quitFullscreenMode)

jsPsych.init({
    timeline:timeline,
    on_finish: function () {
        jsPsych.data.displayData('csv');
        jsPsych.data.get().localSave('csv', sub_save_file)
    }
});
```
## CSS 文件
_css是用来为结构化文档（如 HTML 文档或 XML 应用）添加样式（字体、间距和颜色等）的计算机语言。但是因为css文件不可以直接作用于js文件，而本实验的具体流程代码主要是在js文件中完成的，因此发挥的作用并不大。
我们可以直接在css文件中对整个实验流程设置样式，例如把背景颜色设置成黑色等。
本实验中，我们可以设置让被试不能选择文本，即不能复制。其他样式可以根据需求自己进行设定。
注意，想要在实验中设定对象的样式，不一定必须在css文件中进行操作，我们也可以直接使用<p style:""></p>的方式在js文件中直接操作。例如，如果我们想把“这一句话”从默认样式设置成绿色，除了颜色，我们还可以设置诸如字体、字号、是否加粗等多种属性。Flexbox是一种CSS布局模式，它允许你轻松地在容器内排列子元素，无论是水平还是垂直方向。在这个示例中，容器内的子项默认是水平排列的，当屏幕宽度小于768px时，子项会垂直排列，并且每个子项占满容器宽度。这样可以确保布局在不同设备上都能保持良好的响应性。具体代码如下：_
```CSS
/* 基本样式 */
body, html {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
  
  /* 容器样式 */
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
  
  /* 子项样式 */
  .item {
    flex: 1 1 200px; /* 可伸缩的容器 */
    margin: 10px;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    text-align: center;
  }
  
  /* 响应式样式 */
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      align-items: stretch;
    }
    .item {
      flex-basis: 100%; /* 每个子项占满容器宽度 */
    }
  }
```
#### 这是一个简单的CSS文件，展示了如何使用Flexbox实现响应式布局。
# The end！完成上述操作就可以开始完整的经典Go_NoGo实验啦！
