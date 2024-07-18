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

jsPsych.init({
    timeline:timeline,
    on_finish: function () {
        jsPsych.data.displayData();
    }
});


//载入文字材料
var Words = [
    { data: { stim_type: 'flower' , correct_response:' '}, word: '荷花' },
    { data: { stim_type: 'flower' , correct_response:' '}, word: '樱花' },
    { data: { stim_type: 'flower' , correct_response:' '}, word: '菊花' },
    { data: { stim_type: 'insect' , correct_response:jsPsych.NO_KEYS}, word: '蟑螂' },
    { data: { stim_type: 'insect' , correct_response:jsPsych.NO_KEYS}, word: '苍蝇' },
    { data: { stim_type: 'insect' , correct_response:jsPsych.NO_KEYS}, word: '蚊子' },
]

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
