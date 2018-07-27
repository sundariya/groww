import  React from 'react';
import { SearchBar } from 'react-native-elements';
import { View, FlatList, ActivityIndicator, Text, Image, ListView } from 'react-native';

import { Api } from '../container/index';
import styles from './styles';

// const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            fatching: false,
            searchText: '',
            pageNo: 1,
            data: [],
        }
        this.search = this.search.bind(this);
        this.searchResult = this.searchResult.bind(this);
    }

    search(pageNo, searchText) {
        this.setState({data: [],loading: true, pageNo: 1}),
        this.searchResult(this.state.pageNo, this.state.searchText);
    }

    searchResult ( pageNo, searchText=this.state.searchText ) {
        Api(pageNo, searchText).then(res => res.json()).then(data => {
            this.setState({data: [...this.state.data, ...data.data], loading: false, fetching: false})
        }).catch(err => alert(err));
    }

    onEndReached  = () => {
        this.setState({pageNo: this.state.pageNo + 1, fetching: true})
        this.searchResult(this.state.pageNo, this.state.searchText);
    }

    footer = () => {
        if (!this.state.fetching) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator color='black' />
            </View>
        );
    }

    emptyComponent = () => {
        return (
            <View style={styles.emptyComponent}>
                <Text>Search for anything and press enter</Text>
            </View>
        );
    }

    render() {
        const {searchText, pageNo, data, loading} = this.state;
        return (
            <View  style={styles.container}>
                <SearchBar
                    onChangeText={searchText => this.setState({searchText})}
                    onSubmitEditing={() => this.search(pageNo, searchText)}
                    icon={{ type: 'font-awesome', name: 'search' }}
                    placeholder='Search...' />
                <View  style={styles.listContainer}>
                    {(!loading) &&
                        // <ListView
                        //     dataSource={this.state.data}
                        //     renderRow={(item) => <GridImage thumbnailURL={item.assets.large_thumb.url} previewURL={item.assets.preview.url} id={item.id}/>}
                        //     horizontal={false}
                        //     pageSize={3}
                        //     initialListSize={20}
                        //     onEndReachedThreshold={this.onEndReached}
                        //     // renderFooter={this.footer.bind(this)}
                        //     enableEmptySections={this.emptyComponent}
                        // />
                        <FlatList
                            keyExtractor={item => item.id}
                            data={this.state.data}
                            renderItem={({item}) => <ImageContainer thumbnailURL={item.assets.large_thumb.url} previewURL={item.assets.preview.url} id={item.id}/>}
                            numColumns={3}
                            onEndReached={this.onEndReached}
                            ListFooterComponent={this.footer}
                            ListEmptyComponent={this.emptyComponent}
                        />
                    }
                    {(loading) &&
                        <View style={styles.loader}>
                            <Loader />
                        </View>
                    }
                </View>
            </View>
        );
    }
}
const Loader = function() {
    return(
        <View>
            <ActivityIndicator color='black' />
        </View>
    );
}

const ImageContainer = function ({ thumbnailURL, previewURL, id }) {
    return (
        <View style={styles.listInnerContainer} >
            <View style={styles.ImageContainer}>
                <Image 
                onLoad={this.imageLoaded}
                style={{flex: 1}}
                source={{uri: previewURL}}
                resizeMode={'cover'}
                />
                <Text style={styles.idText}> id :{id} </Text>
            </View>
        </View>
    );
}