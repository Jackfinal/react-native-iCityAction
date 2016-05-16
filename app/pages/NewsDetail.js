/**
 * Created by ljunb on 16/5/12.
 * 新闻详情页
 */
import React from 'react';
import {
    Component,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    WebView,
    ScrollView,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../components/common/Header';
import Common from '../common/Constants';
import CommentToolBar from '../components/common/CommentToolBar';

export default class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore: false,
        }
    }

    render() {

        let { category } = this.props;

        return (
            <View style={{flex: 1}}>
                <Header
                    title="都市频道"
                    leftIcon="ios-arrow-back"
                    leftTouchAction={()=>{this.props.navigator.pop()}}
                    rightIcon="ios-more"
                    rightTouchAction={()=>{this.setState({showMore: !this.state.showMore})}}
                />
                <WebView
                    ref="webView"
                    source={{uri: category.permalink}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    style={styles.webView}
                />
                {this.state.showMore ? this._renderMoreView() : null}
                <CommentToolBar
                    style={styles.toolBar}
                    comment={category.comment}
                    like={category.like}
                    star={category.star}
                />
            </View>
        )
    }

    _renderMoreView() {
        return (
            <View style={styles.moreView}>
                <TouchableOpacity
                    style={[styles.moreViewItem, styles.bottomLine]}
                    onPress={()=>{
                        alert('刷新')
                        this.setState({showMore: false})
                    }}
                >
                    <FontAwesome name="refresh" size={22} color="white" />
                    <Text style={styles.itemFont}>刷新</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.moreViewItem}
                    onPress={()=>{
                        alert('分享')
                        this.setState({showMore: false})
                    }}
                >
                    <FontAwesome name="share" size={22} color="white" />
                    <Text style={styles.itemFont}>分享</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    webView: {
        width: Common.window.width,
        height: Common.window.height - Common.window.navigation_height - 44
    },

    toolBar: {
        position: 'absolute',
        bottom: 0,
    },

    moreView: {
        position: 'absolute',
        right: 0,
        top: 64,
        backgroundColor: 'rgb(183, 37, 40)',
        height: 80,
        width: Common.window.width / 3,
    },

    moreViewItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomLine: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },

    itemFont: {
        marginLeft: 10,
        color: 'white',
        fontSize: 16,
    }
})