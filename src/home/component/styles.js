import {Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    loader: {
        flex:1,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    listInnerContainer:{
        margin: 3,
        width:  Dimensions.get('window').width/3 - 5,
        height: 220,
        padding: 3,
    },
    ImageContainer:{
        flex: 1,
        backgroundColor: 'rgba(10, 10, 10, 0.05)'
    },
    footer: {
        paddingVertical: 20
    },
    idText:{
        alignItems: 'center',
        alignSelf: 'center'
    },
    emptyComponent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default styles;