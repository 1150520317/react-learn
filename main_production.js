import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute
} from 'react-router';
import * as Pages from './src/js/router.config';

import { 
    NavBar, 
    Container,
    OffCanvas,
    OffCanvasTrigger,
    Button,
    List
} from './src/js/common.config';
import ViewInfoConfig from './src/js/view.info.config';
import SideBar from './src/js/danong/sidebar/sidebar';
import './src/plugin/amazeui-touch/scss/amazeui.touch.scss';
import './src/plugin/li/li-1.2.0.scss';
import './src/scss/common.scss';


let {
    NotFound,
    Index,
    ...Components
} = Pages;

class Page extends React.Component {
    constructor(){
        super();
    }

    render() {
        
        return (
            <Container >
                <div>1234</div>
            </Container >
            
        )
    }
}

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            data: {}
        };
    }

    render() {
        let {
            location,
            params,
            children,
            ...props
            } = this.props;

        return (
            <Container direction="column">
                <Container fill={true}>
                    {React.cloneElement(children, {key: location.key, params: params, location: location})}
                </Container>
            </Container>
        )
    }
}


// 在webpack编译过程中，会静态地解析require.ensure中的模块，并将其添加到一个单独的chunk中，从而实现代码的按需加载。
// 语法如下：
// require.ensure(dependencies: String[], callback: function(require), errorCallback: function(error), chunkName: String)
// 例子如下：
// childRoutes : {
//     path: 'home',
//     getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//             cb(null, require(PAGE_BASIC_PATH + "Home"));
//         },"home")
//     }
// }

const PAGE_BASIC_PATH = "./src/js/";
const rootRoute = {
    childRoutes: [{
        path: '/',
        component: App,
        indexRoute: { component: Index },
        childRoutes: [
            {
                path: 'usercenter',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH + "danong/user/usercenter"));
                    })
                }
            },
            {
                path: 'Shop',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require(PAGE_BASIC_PATH + "danong/shop/shop"));
                    })
                }
            }
        ]
    }]
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <Router 
            history={hashHistory}
            routes={rootRoute}
            onError={function (err) { console.error("error about react-router happen,error message:", err) }}    
        />      
        , document.getElementById('root'));
})
