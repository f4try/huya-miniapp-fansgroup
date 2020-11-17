import { UI } from '@hyext/hy-ui'
import React, { Component } from 'react'
import './app.hycss'
const hyExt = global.hyExt;
const { View, Text, Button, Input, ScrollView,BackgroundImage,Image} = UI

class App extends Component {
  constructor () {
    super()

    this.state = {
      giftInfo: [],
      giftIndex: 1,
      giftNum: 1,
      msg_fans: '', // 广播数据
      pic_fans:'',
      msg_kaihei: '', // 广播数据
      msg_custom:'',
      msg_fuli:'',
      passwd_fuli:'',
      passwd_fans:'',
      passwd_kaihei:'',
      passwd_custom:'',
      giftMsg: [],
      pic_intro1: '',
      pic_intro2: '',
      pic_intro3: '',
    }

  }

  componentDidMount() {
    this.onGiftChange();
    // this.onSubscriberChange();//订阅发生变化自动重新广播
    this.messageEventListener();
  }

  easySetItem(key,value){
    hyExt.logger.info('设置小程序简易存储键值对：' + JSON.stringify(key)+JSON.stringify(value))
    hyExt.storage.setItem(key, value).then(() => {
    hyExt.logger.info('设置小程序简易存储键值对成功')
    }).catch(err => {
      hyExt.logger.info('设置小程序简易存储键值对失败，错误信息：' + err.message)
    })
  }

  emitMessage(){
    let { msg_fans,pic_fans,msg_kaihei,msg_custom,msg_fuli,passwd_fuli,passwd_fans, passwd_kaihei,passwd_custom,pic_intro1,pic_intro2,pic_intro3} = this.state;
    this.easySetItem('msg_fans',msg_fans);
    this.easySetItem('pic_fans',pic_fans);
    this.easySetItem('msg_kaihei',msg_kaihei);
    this.easySetItem('msg_custom',msg_custom);
    this.easySetItem('msg_fuli',msg_fuli);
    this.easySetItem('passwd_fuli',passwd_fuli);
    this.easySetItem('passwd_fans',passwd_fans);
    this.easySetItem('passwd_kaihei',passwd_kaihei);
    this.easySetItem('passwd_custom',passwd_custom);
    this.easySetItem('pic_intro1',pic_intro1);
    this.easySetItem('pic_intro2',pic_intro2);
    this.easySetItem('pic_intro3',pic_intro3);
  }

  showGiftChange(data){
      const {itemName, sendNick, sendItemCount} = data;
      let old_msg = this.state.giftMsg;
      const msg = `感谢${sendNick}送的${sendItemCount}个${itemName}~\n`;
      old_msg.push(msg);
      if(old_msg.length>30)
        old_msg.shift();
      this.setState({giftMsg:old_msg});
  }

  onGiftChange(){
    callback = this.showGiftChange.bind(this);
    hyExt.context.onGiftChange({}, callback).then(() => {
      console.log('监听当前直播间礼物变化消息成功')
    }).catch(err => {
      console.log('监听当前直播间礼物变化消息失败，错误信息：' + err.message)
    })
  }

  // onSubscriberChange(){
  //   callback = this.emitMessage.bind(this);
  //   hyExt.context.onSubscriberChange({}, callback).then(() => {
  //     console.log('监听当前主播订阅变化消息成功')
  //   }).catch(err => {
  //     console.log('监听当前主播订阅变化消息失败，错误信息：' + err.message)
  //   })
  // }

  uploadImage(pic_item){
    hyExt.logger.info('上传图片')
    hyExt.fs.uploadImg().then(msgInfo => {
      hyExt.logger.info('上传图片成功，返回：' + JSON.stringify(msgInfo))
      switch(pic_item){
        case 0:
          this.setState({ pic_fans: msgInfo.url})  
          break
        case 1:
          this.setState({ pic_intro1: msgInfo.url}) 
          break 
        case 2:
          this.setState({ pic_intro2: msgInfo.url}) 
          break
        case 3:
          this.setState({ pic_intro3: msgInfo.url})
          break 
        default:
          break
      }
       
    }).catch(err => {
      hyExt.logger.info('上传图片失败，错误信息：' + err.message)
    })
  }

  messageEventListener(){
    hyExt.storage.getItem('msg_fans').then(res => {
      this.setState({
        msg_fans: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('pic_fans').then(res => {
      this.setState({
        pic_fans: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('passwd_fans').then(res => {
      this.setState({
        passwd_fans: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('msg_kaihei').then(res => {
      this.setState({
        msg_kaihei: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('passwd_kaihei').then(res => {
      this.setState({
        passwd_kaihei: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('msg_custom').then(res => {
      this.setState({
        msg_custom: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('passwd_custom').then(res => {
      this.setState({
        passwd_custom: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('pic_intro1').then(res => {
      this.setState({
        pic_intro1: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('pic_intro2').then(res => {
      this.setState({
        pic_intro2: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('pic_intro3').then(res => {
      this.setState({
        pic_intro3: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('msg_fuli').then(res => {
      this.setState({
        msg_fuli: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('passwd_fuli').then(res => {
      this.setState({
        passwd_fuli: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })
  }
  

  render () {
    const {giftMsg, pic_fans,pic_intro1,pic_intro2,pic_intro3} = this.state;
    const giftMsgs = giftMsg.map((item,index)=>{
      return (<Text>{item}</Text>)
    })
    return (
      <ScrollView className="scrollview" nestedScrollEnabled={true} scrollViewRef={this.$refs} onScroll={this.onScroll}>
      <BackgroundImage className="backgroundImage" src={require('./images/background.jpg')}>
        <View className='container'>
            <BackgroundImage className="title-backgroundImage" src={require('./images/topBackground.jpg')}>
              <View className='titleView'>
                <Text className="titleText">粉丝群助手-主播端</Text>
              </View>
            </BackgroundImage>
            <Text className="baseText">直播间礼物信息</Text>
            <View className="giftMsg">
              <ScrollView><Text className="giftText">{giftMsgs}</Text></ScrollView>
            </View>
            <View>
              <View className='section'>
                <Text className="baseText">粉丝群介绍信息</Text>
                <Input className='input' blurOnSubmit={false} placeholder={this.state.msg_fans?this.state.msg_fans:'输入粉丝群介绍信息'} value={this.state.msg_fans} onChange={v => this.setState({ msg_fans: v })} />
                <Text className="baseText"  onChange={v => this.setState({ msg_fans: v })}>粉丝群号</Text>
                <Input className='password' secureTextEntry={false} blurOnSubmit={false} placeholder={this.state.passwd_fans?this.state.passwd_fans:'输入粉丝群号'} value={this.state.passwd_fans} onChange={v => this.setState({ passwd_fans: v })} />
                <View className='section'>
                  <Button 
                    className='button' 
                    style={{ borderRadius: 50 }}
                    type='primary'
                    size='md'
                    textColorInverse
                    onPress={() => this.uploadImage(0)}>
                      <Text className="baseText">上传二维码截图</Text>
                  </Button>
                  <View className='fansGroupImageView'>{pic_fans
                    ?<Image className="fansGroupImage" mode="contain" onLoad={this.imgLoad} src={pic_fans}></Image>
                    :<Text className="msg">暂未上传图片~</Text> }
                  </View>
                </View>
                <Text className="baseText">开黑介绍信息</Text>
                <Input className='input' blurOnSubmit={false} placeholder={this.state.msg_kaihei?this.state.msg_kaihei:'输入开黑介绍信息'} value={this.state.msg_kaihei} onChange={v => this.setState({ msg_kaihei: v })} />
                <Text className="baseText" onChange={v => this.setState({ msg_fuli: v })}>上车方式</Text>
                <Input className='password' secureTextEntry={false} blurOnSubmit={false} placeholder={this.state.passwd_kaihei?this.state.passwd_kaihei:'输入上车方式'} value={this.state.passwd_kaihei} onChange={v => this.setState({ passwd_kaihei: v })} />
                <Text className="baseText">送礼物福利介绍信息</Text>
                <Input className='input' blurOnSubmit={false} placeholder={this.state.msg_fuli?this.state.msg_fuli:'输入周榜福利介绍信息'} value={this.state.msg_fuli} onChange={v => this.setState({ msg_fuli: v })} />
                <Text className="baseText">福利群号</Text>
                <Input className='input' blurOnSubmit={false} placeholder={this.state.passwd_fuli?this.state.passwd_fuli:'输入周榜福利群号'} value={this.state.passwd_fuli} onChange={v => this.setState({ passwd_fuli: v })} />
                <Text className="baseText">自定义信息标题(如主播介绍、游戏铭文、出装)</Text>
                <Input className='input' blurOnSubmit={false} placeholder={this.state.msg_custom?this.state.msg_custom:'输入自定义信息标题'} value={this.state.msg_custom} onChange={v => this.setState({ msg_custom: v })} />
                <Text className="baseText" onChange={v => this.setState({ msg_fuli: v })}>自定义信息内容（如百穿狩猎）</Text>
                <Input className='password' secureTextEntry={false} blurOnSubmit={false} placeholder={this.state.passwd_custom?this.state.passwd_custom:'输入自定义信息内容'} value={this.state.passwd_custom} onChange={v => this.setState({ passwd_custom: v })} />
                <View className='section'>
                  <Button 
                    className='button' 
                    style={{ borderRadius: 50 }}
                    type='primary'
                    size='md'
                    textColorInverse
                    onPress={() => this.uploadImage(1)}>
                      <Text className="baseText">上传图片1</Text>
                  </Button>
                  <View className='fansGroupImageView'>{pic_intro1
                    ?<Image className="fansGroupImage" mode="contain" onLoad={this.imgLoad} src={pic_intro1}></Image>
                    :<Text className="msg">暂未上传图片~</Text> }
                  </View>
                </View>
                <View className='section'>
                  <Button 
                    className='button' 
                    style={{ borderRadius: 50 }}
                    type='primary'
                    size='md'
                    textColorInverse
                    onPress={() => this.uploadImage(2)}>
                      <Text className="baseText">上传图片2</Text>
                  </Button>
                  <View className='fansGroupImageView'>{pic_intro2
                    ?<Image className="fansGroupImage" mode="contain" onLoad={this.imgLoad} src={pic_intro2}></Image>
                    :<Text className="msg">暂未上传图片~</Text> }
                  </View>
                </View>
                <View className='section'>
                  <Button 
                    className='button' 
                    style={{ borderRadius: 50 }}
                    type='primary'
                    size='md'
                    textColorInverse
                    onPress={() => this.uploadImage(3)}>
                      <Text className="baseText">上传图片3</Text>
                  </Button>
                  <View className='fansGroupImageView'>{pic_intro3
                    ?<Image className="fansGroupImage" mode="contain" onLoad={this.imgLoad} src={pic_intro3}></Image>
                    :<Text className="msg">暂未上传图片~</Text> }
                  </View>
                </View>
              </View>
              <View className='section'>
                <Button 
                  className='submitButton' 
                  style={{ borderRadius: 50 }}
                  type='primary'
                  size='md'
                  textColorInverse
                  onPress={() => this.emitMessage()}>
                    <Text className="submitText">向观众广播信息</Text>
                </Button>
              </View>
            </View>
          </View>
        </BackgroundImage>
        </ScrollView>
    )
  }
}
export default App;