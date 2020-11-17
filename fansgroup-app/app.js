import { UI } from '@hyext/hy-ui'
import React, { Component } from 'react'
import './app.hycss'
import SelectGift from './components/SelectGift'
import SelectNum from './components/SelectNum'
const hyExt = global.hyExt
const { View, Text, Button,BackgroundImage,ScrollView,Image ,Tab } = UI



class App extends Component {
  constructor(initialProps) {
    super();
    this.state = {
      value:1,
      giftInfo: [],
      giftIndex: 1,
      giftNum: 1,
      textBar_fans_info: "",
      textBar_fans_passwd: "",
      textBar_fans_pic: "",
      textBar_kaihei_info: "",
      textBar_kaihei_passwd: "",
      textBar_custom_info: "",
      textBar_custom_passwd: "",
      textBar_intro_pic1: "",
      textBar_intro_pic2: "",
      textBar_intro_pic3: "",
      textBar_fuli_info: "",
      textBar_fuli_passwd: "",
      default_step: 1,
      isUserSubscribed:false,
      user_nick:"",
      user_id:"",
      requiredScore:0,
      inWeekRank:false,
    }
  }

  getGiftInfo(){
    hyExt.context.getGiftConf().then(giftInfo => {
      if(giftInfo){
        this.setState({
          giftInfo: giftInfo.filter((item,i)=>{
            return item.giftName&&/https/.test(item.giftGif)
          })
        })
      }
    })
  }


  messageEventListener(){
    hyExt.storage.getItem('msg_fans').then(res => {
      this.setState({
        textBar_fans_info: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('pic_fans').then(res => {
      this.setState({
        textBar_fans_pic: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('passwd_fans').then(res => {
      this.setState({
        textBar_fans_passwd: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('msg_kaihei').then(res => {
      this.setState({
        textBar_kaihei_info: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('passwd_kaihei').then(res => {
      this.setState({
        textBar_kaihei_passwd: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('msg_custom').then(res => {
      this.setState({
        textBar_custom_info: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('passwd_custom').then(res => {
      this.setState({
        textBar_custom_passwd: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('pic_intro1').then(res => {
      this.setState({
        textBar_intro_pic1: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('pic_intro2').then(res => {
      this.setState({
        textBar_intro_pic2: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('pic_intro3').then(res => {
      this.setState({
        textBar_intro_pic3: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('msg_fuli').then(res => {
      this.setState({
        textBar_fuli_info: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })

    hyExt.storage.getItem('passwd_fuli').then(res => {
      this.setState({
        textBar_fuli_passwd: res
      })
    }).catch(err => {
      hyExt.logger.info('获取小程序简易存储键值对失败，错误信息：' + err.message)
    })
  }

  changeGift(step){
    if(step === undefined)  //无参数则按上一次操作来
      step = this.state.default_step;
    else
      this.setState({default_step:step})  //有参数则保存操作

    var {giftIndex} = this.state;
    const maxlen = this.state.giftInfo.length;
    giftIndex = (giftIndex + step + maxlen)%maxlen;

    this.setState({
      giftIndex: giftIndex
    })
  }

  changeNum(step){
    var {giftNum} = this.state;
    giftNum = (giftNum + step)>1?(giftNum + step):1;
    this.setState({
      giftNum: giftNum
    })
  }

  componentDidMount() {
    hyExt.onLoad(()=> {
      hyExt.context.getUserInfo().then(userInfo => {
        hyExt.logger.info('获取用户信息成功', userInfo.userNick);
        console.log('获取用户id成功', userInfo.userUnionId);
        this.setState({
          user_nick: userInfo.userNick,
          user_id:userInfo.userUnionId
        })
        this.isInWeekRank();
        this.getGiftInfo();
        this.messageEventListener();
        this.isStreamerSubscribed();
      })
    });
  }

  sendGift(){
    const giftCount = this.state.giftNum;
    const giftIndex = this.state.giftIndex;
    const giftId = this.state.giftInfo[giftIndex].giftId;
    hyExt.context.sendGift({giftId,giftCount}).then((result)=>{
      console.log(result);
    }).catch((err)=>{
      console.log(err);
    })
  }npx


  subscribeStreamer(){
    hyExt.logger.info('引导当前观众订阅当前主播')
    hyExt.context.leadSubscribe().then(() => {
      hyExt.logger.info('引导当前观众订阅当前主播成功')    
    }).catch(err => {
      hyExt.logger.info('引导当前观众订阅当前主播失败，错误信息：' + err.message)
    })
    this.isStreamerSubscribed();
  }
  isStreamerSubscribed(){
    hyExt.logger.info('获取当前观众订阅状态')
    return hyExt.context.getSubscribeInfo().then(isSubscribed => {
      hyExt.logger.info('获取当前观众订阅状态成功，返回：' + JSON.stringify(isSubscribed));
      if(isSubscribed){
        this.setState({isUserSubscribed:true})
      }else{
        this.setState({isUserSubscribed:false})
      }
    }).catch(err => {
      hyExt.logger.info('获取当前观众订阅状态失败，错误信息：' + err.message)
    })
  }

  isInWeekRank(){
    hyExt.logger.info('获取当前直播间周贡榜数据')
    hyExt.context.getWeekRank().then(weekRank => {
      hyExt.logger.info('获取当前直播间周贡榜数据成功，返回：' + JSON.stringify(weekRank))
      let isInWeekRank=false,requiredScore=0
      const {user_nick, user_id} = this.state;
      for(let i=0;i<weekRank.length;i++){
        hyExt.logger.info('周贡榜数据'+weekRank[i].userNick)
        hyExt.logger.info('周贡榜数据'+weekRank[i].unionId)
        if(weekRank[i].userNick==user_nick&&weekRank[i].unionId==user_id){
          isInWeekRank=true
          break
        }
      }
      hyExt.logger.info('周贡榜数据'+isInWeekRank)
      if(weekRank.length == 50){
        requiredScore = weekRank[49].score
      }
      this.setState({inWeekRank:isInWeekRank,requiredScore:requiredScore}) 
    }).catch(err => {
      hyExt.logger.info('获取当前直播间周贡榜数据失败，错误信息：' + err.message)
    })
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }
  render () {
    
    const {giftInfo, giftIndex, giftNum, textBar_fans_info,textBar_fans_passwd,textBar_fans_pic,textBar_kaihei_info,textBar_kaihei_passwd,textBar_custom_info,textBar_custom_passwd,textBar_fuli_info,textBar_fuli_passwd,inWeekRank,requiredScore,textBar_intro_pic1,textBar_intro_pic2,textBar_intro_pic3} = this.state;
    return (
      giftInfo[giftIndex]?
      <ScrollView className="scrollview" nestedScrollEnabled={true} scrollViewRef={this.$refs} onScroll={this.onScroll}>
        <View className="container">         
            <BackgroundImage className="backgroundImage" src={require('./images/topBackground.jpg')}>
                <View className='titleView'>
                  <Text className="titleText">粉丝群助手</Text>
                </View>
            </BackgroundImage>
        </View>
        <Tab 
            className="tab"
            value={this.state.value}
            data={[{
                value: 1,
                label: '粉丝群'
              },
              {
                value: 2,
                label: '开黑群'
              },
              {
                value: 3,
                label: '福利群'
              },
              {
                value: 4,
                label: '照片墙'
              }
            ]}
            onChange={item => this.handleChange('value', item.value)}
          />
        <View className="container">
                <BackgroundImage className="backgroundImage" src={require('./images/background.jpg')}>
        {(() => {switch(this.state.value){
              case 1:
                return (
                  <View className="text">
                    <Text className="title">粉丝群信息</Text>
                    <Text className="msg">{textBar_fans_info?textBar_fans_info:"暂未收到主播发送的消息~"}</Text>   
                    <Text className="title">粉丝群号</Text> 
                    {this.state.isUserSubscribed
                    ?<Text className="groupNum">{textBar_fans_passwd?textBar_fans_passwd:"暂未收到主播发送的消息~"}</Text> 
                    :<Text className="groupNum">订阅后再次点击订阅键查看群号和二维码</Text> 
                    } 
                    {this.state.isUserSubscribed&&
                     <View className='fansGroupImageView'>{textBar_fans_pic
                          ?<Image className="fansGroupImage" mode="contain" onLoad={this.imgLoad} src={textBar_fans_pic}></Image>
                          :<Text className="msg">暂未收到主播发送的图片~</Text> }
                      </View>
                    } 
                    <View className='imageView'>
                      <Image className="image" mode="cover" onLoad={this.imgLoad} src={require('./images/fans.gif')}></Image>
                    </View>
                    {!this.state.isUserSubscribed&&
                        <Button 
                          className='senderButton' 
                          style={{ borderRadius: 50 }}
                          type='primary'
                          size='md'
                          textColorInverse
                          onPress={() => this.subscribeStreamer()}>
                            <Text className="btnText">订阅</Text>
                        </Button>
                    }
                  
                  <Button 
                          className='senderButton' 
                          style={{ borderRadius: 50 }}
                          type='primary'
                          size='md'
                          textColorInverse
                          onPress={() => this.messageEventListener()}>
                            <Text className="btnText">刷新</Text>
                  </Button>  
                  </View>
              )
              case 2:
                return (
                  <View className="text">
                    <Text className="title">开黑信息</Text>
                    <Text className="msg">{textBar_kaihei_info?textBar_kaihei_info:"暂未收到主播发送的消息~"}</Text>
                    <Text className="title">上车方式</Text>
                    {this.state.isUserSubscribed
                    ?<Text className="groupNum">{textBar_kaihei_passwd?textBar_kaihei_passwd:"暂未收到主播发送的消息~"}</Text>
                    :<Text className="groupNum">订阅后再次点击订阅键查看信息</Text>} 
                    <View className='imageView'>
                      <Image className="image" mode="cover" onLoad={this.imgLoad} src={require('./images/kaihei.gif')}></Image>
                    </View> 
                    {!this.state.isUserSubscribed&&
                        <Button 
                          className='senderButton' 
                          style={{ borderRadius: 50 }}
                          type='primary'
                          size='md'
                          textColorInverse
                          onPress={() => this.subscribeStreamer()}>
                            <Text className="btnText">订阅</Text>
                        </Button>
                    }  
                    <Button 
                          className='senderButton' 
                          style={{ borderRadius: 50 }}
                          type='primary'
                          size='md'
                          textColorInverse
                          onPress={() => this.messageEventListener()}>
                            <Text className="btnText">刷新</Text>
                  </Button>   
                  </View>
                )
              case 3:
                return (
                  <View className="text">
                    <Text className="title">赠送礼物支持主播哟</Text>
                    <Text className="title">周榜可领福利</Text>
                    <Text className="msg">{textBar_fuli_info?textBar_fuli_info:"暂未收到主播发送的消息~"}</Text>
                    <Text className="title">福利群号</Text>
                    {this.state.inWeekRank
                      ?<Text className="groupNum">{textBar_kaihei_passwd?textBar_fuli_passwd:"暂未收到主播发送的消息~"}</Text>
                      :<Text className="groupNum">需要{requiredScore}贡献值上周榜查看福利群号</Text>
                    }
                    <View className='imageView'>
                      <Image className="image" mode="cover" onLoad={this.imgLoad} src={require('./images/fuli.jpg')}></Image>
                    </View>
                    <Button 
                          className='senderButton' 
                          style={{ borderRadius: 50 }}
                          type='primary'
                          size='md'
                          textColorInverse
                          onPress={() => this.sendGift()}>
                            <Text className="btnText">赠送</Text>
                    </Button>
                    <SelectGift data={giftInfo[giftIndex]} changeGift={this.changeGift.bind(this)}></SelectGift>
                    <SelectNum num={giftNum} changeNum={this.changeNum.bind(this)}></SelectNum>
                    <Button 
                          className='senderButton' 
                          style={{ borderRadius: 50 }}
                          type='primary'
                          size='md'
                          textColorInverse
                          onPress={() => this.messageEventListener()}>
                            <Text className="btnText">刷新</Text>
                  </Button> 
                  </View>
                )
              case 4:
                return (
                  <View className="text">
                    <Text className="title">{textBar_custom_info?textBar_custom_info:"暂未收到主播发送的消息~"}</Text>
                    {this.state.isUserSubscribed
                    ?<Text className="groupNum">{textBar_custom_passwd?textBar_custom_passwd:"暂未收到主播发送的消息~"}</Text>
                    :<Text className="groupNum">订阅后再次点击订阅键查看照片</Text>} 
                    {this.state.isUserSubscribed&&
                     <View className='introImage'>{textBar_intro_pic1
                          ?<Image className="fansGroupImage" mode="contain" onLoad={this.imgLoad} src={textBar_intro_pic1}></Image>
                          :<Text className="msg">暂未收到主播发送的图片~</Text> }
                      </View>
                    } 
                    {this.state.isUserSubscribed&&
                     <View className='introImage'>{textBar_intro_pic2
                          ?<Image className="fansGroupImage" mode="contain" onLoad={this.imgLoad} src={textBar_intro_pic2}></Image>
                          :<Text className="msg">暂未收到主播发送的图片~</Text> }
                      </View>
                    } 
                    {this.state.isUserSubscribed&&
                     <View className='introImage'>{textBar_intro_pic3
                          ?<Image className="fansGroupImage" mode="contain" onLoad={this.imgLoad} src={textBar_intro_pic3}></Image>
                          :<Text className="msg">暂未收到主播发送的图片~</Text> }
                      </View>
                    } 
                    <View className='imageView'>
                      <Image className="image" mode="cover" onLoad={this.imgLoad} src={require('./images/call.gif')}></Image>
                    </View>
                    {!this.state.isUserSubscribed&&
                        <Button 
                          className='senderButton' 
                          style={{ borderRadius: 50 }}
                          type='primary'
                          size='md'
                          textColorInverse
                          onPress={() => this.subscribeStreamer()}>
                            <Text className="btnText">订阅</Text>
                        </Button>
                    } 
                    <Button 
                          className='senderButton' 
                          style={{ borderRadius: 50 }}
                          type='primary'
                          size='md'
                          textColorInverse
                          onPress={() => this.messageEventListener()}>
                            <Text className="btnText">刷新</Text>
                  </Button> 
                  </View>
                )
              default:
                return null
            }
          }
        )()}
        </BackgroundImage>
        </View>
        </ScrollView>       
      :
      <Text>loading......</Text>
    )
  }
}

export default App