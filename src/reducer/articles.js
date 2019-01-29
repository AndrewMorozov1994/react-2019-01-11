import {ADD_COMMENT, DELETE_ARTICLE, LOAD_ALL_ARTICLES} from '../constants';
import {arrToMap} from './utils'
import {Record} from 'immutable';

const ArticleRecord = Record({
    id: null,
    text: null,
    title: null,
    date: null,
    comments: []
})

export default (articles = arrToMap([], ArticleRecord), action) => {
    const { type, payload, randomId, response } = action

    switch (type) {
        case LOAD_ALL_ARTICLES:
            return arrToMap(response, ArticleRecord)

        case DELETE_ARTICLE:
            return articles.delete(payload.id)

        case ADD_COMMENT:
            return articles.updateIn(
                [payload.articleId, 'comments'],
                (comments) => {
                    return comments.concat(randomId)
                }
            )

        default:
            return articles
    }
}
