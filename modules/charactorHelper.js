const _ = require('../utils/lodash.js')
const Q = require('../utils/q.js')
const engine = require('../utils/engine.js');
const charConfig = require('../config/CHARACTORS.js');
const system = require('./system.js');
const evt = require('../utils/event.js');
const inheritPrototype = require('../utils/es5Inherit.js');

function helper(){
  evt.apply(this, arguments);
  this.status = 'notInit';
  //交互锁
  this.actionLock = false;
}

inheritPrototype(helper,evt);

helper.prototype.getStatus = function(){
  return this.status;
};


//更新当前处理状态
helper.prototype.updateStatus = function(){
  //第一个参数为事件key
  var status = [].shift.apply(arguments);

  //其余参数为事件相关数据
  var restArgs = [].map.call(arguments, function (item) { return item });

  //before事件参数
  var beforeArgs = ['before' + status].concat(restArgs);

  //当前事件参数
  var curArgs = [status].concat(restArgs);

  //after事件参数
  var afterArgs = ['after' + status].concat(restArgs);

  //先调用before事件
  this.trigger.call(this, beforeArgs);

  //接下来，当前事件
  this.status = status;
  this.trigger.call(this, curArgs);

  //最后调用after事件
  this.trigger.call(this, afterArgs);
}

//初始化所有chars
//首先
helper.prototype.init = function (canvasWidth, canvasHeight){
  this.trigger('beforeEngineInit');
  this.status = 'engineInitialling';

  var _engine = engine.init(canvasWidth, canvasHeight);

  //初始化上下文环境，如canvas配置
  this.status = 'engineInitialled';
  this.trigger('afterEngineInit');

  //初始化charactor对象
  this.trigger('beforeCharsCreated');
  this.status = 'creatingChars';
  this.chars = [];
  for (var i in charConfig) {
    var charCfg = charConfig[i];
    let _char = _engine.createCharactor(charCfg.charWidth, charCfg.charWidth * charCfg.ratio * charCfg.hwRate); 
    _char.applyKey(i);
    _char.applyName(charCfg.name);
    _char.applyAvatar(charCfg.avatarUrl);
    _char.on("updateChar",function(){
      this.trigger('updateChar', this.selectedChar);
    },this)
    this.chars.push(_char);
  }
  this.status = 'charsCreated';
  this.trigger('afterCharsCreated');
}

helper.prototype.formatCharActions = function(){
  let that = this;
  let _allRequired = [];
  let _allOthers = [];
  this.deferRequiredList ={};
  this.deferOthersList = {};
  let _requiredQList=[];
  let _othersQList = [];

  this.chars.forEach(function (char) {
       //将必要动画与普通动画分离
    charConfig[char.key].actions.forEach(function (action) {
      var fullKey = char.key + '_' + action.actionKey;
      let deferred = Q.defer();
      let info = { key: fullKey, url: action.img, actionName:action.actionName };
      if (action.require) {
        //如果是required，分开
        info.type = 'required';
        _allRequired.push(info);
        that.deferRequiredList[fullKey] = deferred;
        _requiredQList.push(deferred.promise);
      } else {
        //剩下的是普通动画
        info.type = 'others';
        _allOthers.push(info);
        that.deferOthersList[fullKey] = deferred;
        _othersQList.push(deferred.promise);
      }
    });
  });

    this.actionMap = {
        requiredActions: _allRequired,
        otherActions: _allOthers,
        requiredQList: _requiredQList,
        othersQList: _othersQList
    };

    return this.actionMap;
}

//加载必要动作
helper.prototype.loadRequiedActions = function () {
    let that = this;
    console.log('开始加载必要动作');
    return Q.all(this.actionMap.requiredQList).then(function () {
        console.log('必要动作加载完成');
        that.trigger('charRequiredActionsLoaded');
    }).catch(function(err){
      console.log(err);
      throw err;
    });
}

//一次加载其它动作
helper.prototype.loadOtherActions = function () {
    let that = this;
    console.log('开始加载次要动作');
    return Q.all(this.actionMap.othersQList).then(function () {
        console.log('次要动作加载完成');
        that.trigger('charOtherActionsLoaded');
    });
}

//依次加载其它动作
helper.prototype.loadOtherActionsByOrder = function () {
    let that = this;
    console.log('开始加载次要动作');
    return that.actionMap.othersQList.reduce(function (prevAction, currentAction, currentIndex) {
        return prevAction.then(function () {
            return currentAction.then(function () {
                console.log('次要动作' + currentIndex + '加载完成');
                return that.trigger('charOtherActionLoaded');
            });
        });
    });
}

//加载全部动作
helper.prototype.loadAllActions=function () {
    let that=this;
    return this.loadRequiedActions().then(function () {
        //return that.loadOtherActions();//一次加载其它动作
        return that.loadOtherActionsByOrder();//依次加载其它动作
    }).then(function(){
        console.log('全部动作加载完成');
        that.trigger('charAllActionsLoaded');
    }).catch(function(err){
        console.log(err);
    })
}

helper.prototype.splitFullKey =function(fullKey){
  var keyInfo = fullKey.split('_');
  return {
    charKey: keyInfo[0],
    actionKey: keyInfo[1]
  }
}

helper.prototype.getCharByKey = function(charKey){
  for(var i=0;i<this.chars.length;i++){
    if(this.chars[i].key===charKey){
      return this.chars[i];
    }
  }
  return null;
}

helper.prototype.getActionFromCharKeyAndActionKey = function(charKey,actionKey){
  if(!charConfig[charKey]){
    throw new Error('invalid charKey');
  }
  var actions = charConfig[charKey].actions;
  for(var i=0;i<actions.length;i++){
    if (actions[i].actionKey === actionKey) {
      return actions[i];
    }
  }
  return null;
}

helper.prototype.bindCharSpiritByConfig = function (fullKey,actionConfig, spiritWidth, spiritHeight){
  var keyInfo = this.splitFullKey(fullKey);
  var char = this.getCharByKey(keyInfo.charKey);
  var actionCfg = this.getActionFromCharKeyAndActionKey(keyInfo.charKey,keyInfo.actionKey);
  var fullImgWidth = spiritWidth || actionCfg.spiritWidth;
  var fullImgHeight = spiritHeight || actionCfg.spiritHeight;
  char.applySpiritsByFrm(fullKey,actionCfg.frames, fullImgWidth, fullImgHeight, actionCfg.fps,actionCfg.spiriteColCount);
  if (actionCfg.moveConfig){
    char.applyFrmMove(fullKey, actionCfg.moveConfig);
  }
  if (actionCfg.common){
    char.commonActions.push(fullKey);
  }
}

helper.prototype.getChar = function(key){
  for(var i=0;i<this.chars.length;i++){
    if(this.chars[i].key === key){
      return this.chars[i];
    }
  }
  return null;
}

helper.prototype.selectChar = function(key){
  var _char = this.getChar(key);
  if(!_char){
    throw new Error('invalid char key');
  }
  this.selectedChar = _char;
}

helper.prototype.getAllCharData = function(){
  var that = this;
  return this.chars.map(function(char){
    return {
      key:char.key,
      avatar:char.avatarUrl,
      name:char.name,
      registeredActions: that.registeredActionMap?that.registeredActionMap[char.key]:[]
    }
  });
}

//获取已经加载完的动作
helper.prototype.getCharDataByLoaded = function () {
    var that = this;
    var charDataLoaded = [];
    if (that.registeredActionMap){
        this.chars.forEach(function (char, index) {
            if (that.registeredActionMap[char.key]) {
                charDataLoaded.push({
                    key: char.key,
                    avatar: char.avatarUrl,
                    name: char.name,
                    registeredActions: that.registeredActionMap[char.key]
                });
            }
        });
    }
    return charDataLoaded;
}

helper.prototype.registerAction = function (fullKey,actionConfig){
  if(!this.registeredActionMap){
    this.registeredActionMap = {};
  }
  var keyInfo = this.splitFullKey(fullKey);
  var item = { 
    charKey: keyInfo.charKey, 
    actionKey: keyInfo.actionKey, 
    fullKey: fullKey, 
    actionName: actionConfig.actionName,
    type: actionConfig.type
  };
  if (!this.registeredActionMap[keyInfo.charKey]){
    this.registeredActionMap[keyInfo.charKey]=[];
  }
  this.registeredActionMap[keyInfo.charKey].push(item);
}

helper.prototype.playAction = function(charKey,actionKey){
  if(this.actionLock){
    //如果交互锁为true，表示交互行为被锁死
    //所有交互不执行
    //故直接返回
    return;
  }
  
  if (!this.selectedChar) {
    //人物未初始化
    //1. 加锁
    this.actionLock = true;
    //2. 选择人物
    this.selectChar(charKey);
    //3. 切换moveIn动作,并播放
    this.selectedChar.selectAction("moveIn");
    this.selectedChar.ready().play();
    //4. 注册入场后行为
    this.selectedChar.once("finish", function () {
      //4.1 解锁
      this.actionLock = false;
      if (!actionKey || actionKey === "moveIn") {
        //若新人物动作为出场动作，则已经完成，不再继续
        return;
      }
      //6. 新人物动作不是出场，切换动作并播放
      this.selectedChar.selectAction(actionKey);
      this.selectedChar.ready().play();
    }, this);
  }else if (this.selectedChar.key !== charKey) {
    //当前selectedChar与传入的key不一致
    //则需要变更selectedChar
    //1. 终止现有动作
    this.selectedChar.terminate();
    //2. 加锁,任务切换时不可交互
    this.actionLock = true;
    //3. 播放退场动作
    this.selectedChar.selectAction("moveOut");
    this.selectedChar.ready().play();
    //4. 注册旧人物退场动画完毕后的处理逻辑    
    this.selectedChar.once("finish", function () {
      //4.1 变更人物
      this.selectChar(charKey);
      //4.2 切换moveIn动作,并播放
      this.selectedChar.selectAction("moveIn");
      this.selectedChar.ready().play();
      //4.3 注册新人物出场动画完毕后的处理逻辑

      this.selectedChar.once("finish", function () {
        //5. 首先解锁,保证在人物动画切换时有锁
        this.actionLock = false;
        if (!actionKey || actionKey === "moveIn") {
          //若新人物动作为出场动作，则已经完成，不再继续
          return;
        }
        //6. 新人物动作不是出场，切换动作并播放
        this.selectedChar.selectAction(actionKey);
        this.selectedChar.ready().play();
      }, this);
    }, this);
  } else{
    //没有换人物
    /*if (!actionKey || this.selectedChar.curAction.key === [charKey, actionKey].join('_')){
      //如果动作都没变，则啥也不做
      return;
    }*/
    if (!actionKey){
        return;
    }
    //动作变了
    //1. 终止现有动作
    this.selectedChar.terminate();
    //2. 切换动作并播放
    this.selectedChar.selectAction(actionKey);
    this.selectedChar.ready().play();
  }
}

module.exports = helper;