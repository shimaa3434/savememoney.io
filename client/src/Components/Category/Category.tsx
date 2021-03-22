import {PostPropsInt, CategoryPropsInt} from '../../TypeScript/App Interfaces'
import {getCategory} from '../../Redux/Actions/CategoryActions'
import {categoryParameter} from '../../TypeScript/App Types'
import {Component} from 'react'
import {connect} from 'react-redux';
import Post from '../Post/Post';

class Category extends Component<CategoryPropsInt> {


    constructor (props:CategoryPropsInt) {
        super(props)
    }

    componentWillMount () {
        this.props.getCategory(this.props.match.params.category)
    }

    render () {
        const { DATA } = this.props;
        
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
}

const mapStateToProps = (store:any) => {

    const { CategoryState } = store;
    const { DATA, LOADING, CATEGORY, PARAMALERT } = CategoryState;

    return {
        DATA,
        LOADING,
        CATEGORY,
        PARAMALERT
    }
}
const mapDispatchToProps = (dispatch:Function) => {
    return {getCategory: (parameter:categoryParameter) => {dispatch(getCategory(parameter))}}
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
