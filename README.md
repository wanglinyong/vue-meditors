# vue-meditors编辑器

基于vue-markdown开源项目的二次开发 

[vue-markdown项目地址]( https://zhaoxuhui1122.github.io/vue-markdown/)

**主要增加了一个支持图片上传接口方法**
[GitHub地址]( https://github.com/wanglinyong/vue-meditors)

### 1.简介

**一款使用marked和highlight.js开发的一款markdown编辑器，目前只支持在vue项目中使用。**

**编辑器涵盖了常用的markdown编辑器功能，工具栏可自定义配置，也可进行二次开发。**


**效果**

![enter image description here](https://images.gitbook.cn/ed518110-8e6a-11e9-bc16-45471ed7a203)

### 2.安装

```
npm i vue-meditors

```

### 3.在项目中使用


```
import MarkDown from 'vue-meditor'

...

components:{
    	MarkDown//引入组件
	},
data() {
      return {
        initialValue: "",//，markdown默认值
        theme: 'OneDark'//主题
      };
    },
...

<template>
	<mark-down @on-save="save" ref="md" @on-change="changeImg"
	:theme="theme" :initialValue="initialValue"/>

	<div @click="saveMd()">保存</div>
</template>

```

###  4.获取markdown编辑器内容

通过保存按钮触发点击事件saveMd,从而调用其子组件的保存方法handleSave
	
```
	saveMd(){
	      	console.log(this.$refs.handleSave)
	      	this.$refs.md.handleSave();
	      }

```
然后会触发一个回调函数on-save，并返回一个对象，里面包含了三个属性

```
	value // 编辑器输入的原始内容
    html // 右侧现实的问转义后的内容
    theme // 保存时的主题名字

```

我们监听on-save事件，这里对应我们的save方法，从而获取markdown编辑器的内容

```
	save(content){
	      	console.log("原始内容："+content.value);
	      	console.log("转义后的内容："+content.html);
	      	console.log("主题theme："+content.theme);
	      }

```

### 5.图片上传

通过点击图片图标会弹出选择图片对话框，选择图片后会传递一个on-change事件给我们，所以我们只要监听on-change事件即可，它会将文件对象传递给我们

```
	changeImg(files){
	      	console.log(files)
	      }

```	      

