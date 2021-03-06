import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import {getCategory} from '../../Redux/Actions/CategoryActions'
import Post from '../Post/Post';


interface DataArrayInt {
    postid: string, title: string,
    category: string, image: string,
    url: string, urldomain: string,
    tstamp: number, price: string
}

interface PropsInt {
    match: any, DATA: any,
    LOADING: boolean, CATEGORY: null | string,
    PARAMALERT: null | string, getCategory: Function
}

type Parameter = undefined | string;

const Category:React.FC<PropsInt> = ({match, DATA, LOADING, CATEGORY, PARAMALERT, getCategory}) => {

    useEffect(() => {
        getCategory(match.params.category);
    }, [])

    return (
        <div>
            {DATA && DATA.map((item:DataArrayInt, i:number) => {
                const {title, category, image, url, urldomain, tstamp, price} = item;
                return <Post title={title} category={category} image={image}
                url={url} urldomain={urldomain} tstamp={tstamp} price={price}
                />
            })}
        </div>
    )
}

const mapStateToProps = (store:any) => {
    return {
        DATA: store.CategoryState.DATA,
        LOADING: store.CategoryState.LOADING,
        CATEGORY: store.CategoryState.CATEGORY,
        PARAMALERT: store.CategoryState.PARAMALERT,
    }
}
const mapDispatchToProps = (dispatch:Function) => {
    return {
        getCategory: (parameter:Parameter) => {dispatch(getCategory(parameter))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
