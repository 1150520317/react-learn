import React from 'react';

class NotFound extends React.Component {
    constructor(){
        super();
    }

    render() {
        const imgPath = '/src/img/danong/404.png';
        return(
            <div>
                <img src={imgPath}/>
            </div>
        )
    }

}

export default NotFound