import {PostPropsInt, CategoryPropsInt, postcollectionProps} from '../../TypeScript/App Interfaces'
import {getCategory} from '../../Redux/Actions/CategoryActions'
import {categoryParameter} from '../../TypeScript/App Types'
import {Component} from 'react'
import {connect} from 'react-redux';
import Post from '../PostCard/PostCard';

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
                {DATA && DATA.map(({title, category, image, url, urldomain, tstamp, price, post_id, user_name, upvotes, downvotes, id}:PostPropsInt&postcollectionProps, i:number) => {
                    return <Post title={title} category={category} image={image}
                    url={url} urldomain={urldomain} tstamp={tstamp} price={price}
                    post_id={post_id} user_name={user_name} upvotes={upvotes} downvotes={downvotes} id={id}
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
