import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, TouchableOpacity, Share, Linking } from 'react-native'
import { Button, Text, Icon } from './'
import { constants, colors } from '../configs'
import { string } from '../assets'
import moment from 'moment'
import { ValidURL, Bookmark } from '../helper'
import actions from '../redux/actions'

class ListBookmarks extends Component {

    static propTypes = {
        data: PropTypes.any,
    }

    constructor(props) {
        super(props)
        this.state = {
            select: undefined,
            selected: (new Map())
        };
    }

    _renderListTags = (item) => {
        return (
            <View
                style={styles.constantarrTagsItem}>
                <Text
                    fontSize={constants.font.sub}
                    italic
                    text={moment(new Date(item.timeCreate).getTime()).fromNow()} />
                {item['tags'].map((v, i) => <Text
                    key={i}
                    text={` #${v.name}`}
                    color={v.color} />)}
            </View>
        )
    }

    _renderSubBookmark = (item) => {
        return (
            <View>
                <Text
                    text={item.content}
                    fontSize={constants.font.sub} />
                <View
                    style={styles.constantButton}>
                    <Icon
                        name='ios-create-outline'
                        onPress={() => this._onPressEdit(item)} />
                    <Icon
                        name='ios-trash-outline' onPress={() => this._onPressRemove(item)} />
                    <Icon
                        name='ios-share-outline'
                        onPress={() => this._onPressShare(item)} />
                </View>
            </View>

        )
    }

    _renderBookmark = ({ item, index }) => {
        let { select } = this.state
        return (
            <TouchableOpacity
                activeOpacity={constants.opacity} style={styles.constantItem}
                onPress={() => this.setState({ select: select === index ? undefined : index })}>
                <Text
                    bold
                    text={item.title.length === 0 ? item.content : item.title} />
                {this._renderListTags(item)}

                {select === index ? this._renderSubBookmark(item) : null}
            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        let { data } = this.props
        return (
            <View
                style={styles.constant}>
                <Text
                    text={string.name_listbookmarks}
                    bold
                    under
                    italic
                    style={styles.name} />
                <FlatList
                    style={{ flex: 1 }}
                    data={data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderBookmark}
                />
            </View >

        )
    }

    _onPressRemove = (item) => {
        this.props.showDialog(string.remove_bookmark, string.remove_bookmark_info, [
            {
                title: string.ok, onPress: () => {
                    Bookmark.remove(item.id);
                    this.props.hideDialog();
                }
            },
            { title: string.canner, onPress: () => this.props.hideDialog() }
        ])
    }

    _onPressShare = (item) => {
        if (ValidURL(item.content)) {
            Linking.openURL(item.content).catch((error) => Share.share({ title: item.title, url: item.content, message: item.content }).catch((error) => console.log(error)))
        } else {
            Share.share({ title: item.title, url: item.content, message: item.content }).catch((error) => console.log(error))
        }
    }

    _onPressEdit = (item) => {

    }
}

const styles = StyleSheet.create({
    constant: {
        flex: 1,
        marginHorizontal: constants.padHor,
        marginVertical: constants.padVer,
    },
    constantItem: {
        paddingBottom: constants.padVer,
        marginVertical: constants.padVer,
        borderBottomWidth: constants.border,
        borderBottomColor: colors.colors
    },
    name: {
        paddingLeft: constants.padHor * 2,
        paddingBottom: constants.padVer
    },
    constantarrTagsItem: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    constantButton: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    showNotify: (data) => actions.showNotify(dispatch)(data),
    showDialog: (title, message, button) => actions.showDialog(dispatch)(title, message, button),
    hideDialog: () => actions.hideDialog(dispatch)
})

export default connect(null, mapDispatchToProps, null, { withRef: true })(ListBookmarks)