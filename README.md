# Between Light and Dark
This is a game based on p5js.  
***
我还是用中文来写吧，一方面是我英语比较菜，另一方面是可能用中文能更好的表达我的心情吧（有点鲁迅先生内味了emmm）。  
[这是原来的readme的地址](https://github.com/wujinhjun/FrontEndHomework/tree/main/Homework7)

## 简介

1. 游戏名： 《光暗之间》
2. 背景故事：  
   月，皎洁无瑕，常被众人赋予美好之意，众多文人骚客都为之倾倒，写下无数美好篇章。
一日间，月光不见，自此消失于世间，取而代之的，是暗月，暗月之辉下，有人失去理智只为获得更强大的力量，却在不知不觉间异化为“怪物”，被人称为`暗月者`。有人恪守本心，却又不得不拿起武器，对抗暗月一派，并从其中汲取`圣洁光明`的力量以提升自我，期待着未知的、不知道还能否存在的光明的未来。
3. 设定：  
   主人公是少有的幸运者，他被暗月污染，但却保持了清醒与理智，同时获得了消失不见的“月光”的眷顾，为他手中的武器赋上神眷，赐予他与神沟通的能力，只需要献祭从`暗月者`处得来的光点，即可恢复自身、恢复武器耐久、提升自我战力，于是，他成为了令诸多`暗月者`闻风丧胆的猎杀者，称号`光眷者`  
   但即使是眷者，在这样的世界里，也会遭遇不测，也许他可以对抗明面的攻击，但阴暗处的偷袭，同样会令他防不胜防
   敌人被击杀后析出光点，主角可以拾取，但可能是有毒的，会使主角受伤

4. 规划与实现
   - [X] 1. 简单的UI界面
   - [X] 2. 简单的四叉树实现（在学习了[此视频](https://www.youtube.com/watch?v=OJxEcs0w_kE)后实现的）
   - [X] 3. 简单的物理碰撞(虽然主角的还是存在一些问题orz)
   - [X] 4. 基础游戏性（可以实现击杀、拾取、自动寻路等功能）
   - [X] 5. 实现地图选择
   - [ ] 6. 实现地图大小调节
   - [ ] 7. 实现游戏角色更换
   - [ ] 8. 实现敌人的多样性
   - [ ] 9. 实现技能加点
   - [ ] 10. 实现商店系统
   - [ ] 11. 实现摄像机的聚焦效果（使主角始终处于屏幕中心）  
    不难看出，我只实现了比较简单的几个，像地图调节、摄像机聚焦等完全没有思路实现，而7-10基本属于时间来不及了，就先写文档吧。个人觉得有时候想明白自己要做什么可能比做什么更重要吧。
    当然，在已实现的里其实还可以有更多优化的点，比如子弹的颜色，敌人攻击时的变化、掉落物的闪烁提示等

5. 实现技术：  
   基于p5js框架开发的canvas小游戏，除此之外并未采用其他的库，虽然不知道这究竟算是蠢还是勇气可嘉亦或者是二者兼而有之……

6. [一个演示视频](https://www.bilibili.com/video/BV1nL4y1F77P/)
