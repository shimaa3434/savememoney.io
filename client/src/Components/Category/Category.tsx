import {PostPropsInt, CategoryPropsInt} from '../../TypeScript/App Interfaces'
import {getCategory} from '../../Redux/Actions/CategoryActions'
import {categoryParameter} from '../../TypeScript/App Types'
import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import Post from '../Post/Post';

const Category:React.FC<CategoryPropsInt> = ({match, DATA, LOADING, CATEGORY, PARAMALERT, getCategory}) => {

    useEffect(() => {
        getCategory(match.params.category);
    }, [])

    return (
        <div>
            {DATA && DATA.map((item:PostPropsInt, i:number) => {
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
    return {getCategory: (parameter:categoryParameter) => {dispatch(getCategory(parameter))}}
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
