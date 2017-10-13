import ListErrors from './ListErrors'
import React from 'react'
import { Link } from 'react-router-dom'
import agent from '../agent'
import { connect } from 'react-redux'
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  IDEA_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

const mapStateToProps = state => ({
  ...state.editor
})

const initialValues = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' }
]

const cleanInput = inputValue => {
  // Strip all non-number characters from the input
  return inputValue.replace(/[^0-9]/g, "")
}

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: ADD_TAG }),
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: tag =>
    dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: payload =>
    dispatch({ type: IDEA_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
})

class Editor extends React.Component {
  constructor() {
    super()

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value)
    this.changeTitle = updateFieldEvent('title')
    this.changeDescription = updateFieldEvent('description')
    this.changeBody = updateFieldEvent('body')
    this.changeTagInput = updateFieldEvent('tagInput')

    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault()
        this.props.onAddTag()
      }
    }

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag)
    }

    this.submitForm = ev => {
      ev.preventDefault()
      const idea = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagList: this.props.tagList
      }

      const slug = { slug: this.props.ideaSlug }
      const promise = this.props.ideaSlug ?
        agent.Ideas.update(Object.assign(idea, slug)) :
        agent.Ideas.create(idea)

      this.props.onSubmit(promise)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload()
        return this.props.onLoad(agent.Ideas.get(this.props.match.params.slug))
      }
      this.props.onLoad(null)
    }
  }

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Ideas.get(this.props.match.params.slug))
    }
    this.props.onLoad(null)
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    return (
      <div className='editor-page'>
        <div className='container-fluid page'>
          <div className='row'>
            <div className='col-xs-11'>

              <ListErrors errors={this.props.errors}></ListErrors>

              <form>
                <fieldset>
                  <div className='col-xs-3' />
                  <div className='col-xs-2'>
                    Impact
                  </div>
                  <div className='col-xs-2'>
                    Ease
                  </div>
                  <div className='col-xs-2'>
                    Confidence
                  </div>
                  <div className='col-xs-1'>
                    Avg
                  </div>
                </fieldset>
                <fieldset>
                  <fieldset className='form-group col-xs-3'>
                    <input
                      className='form-control form-control-lg'
                      type='text'
                      placeholder='Idea Title'
                      value={this.props.title}
                      onChange={this.changeTitle} />
                  </fieldset>
                  <fieldset className='form-group col-md-2'>
                    <Select
                      name='impact'
                      value='4'
                      options={initialValues}
                      onInputChange={cleanInput}
                    />
                  </fieldset>
                  <fieldset className='form-group col-md-2'>
                    <Select
                      name='ease'
                      value='4'
                      options={initialValues}
                      onInputChange={cleanInput}
                    />
                  </fieldset>
                  <fieldset className='form-group col-md-2'>
                    <Select
                      name='confidence'
                      value='4'
                      options={initialValues}
                      onInputChange={cleanInput}
                    />
                  </fieldset>
                  <fieldset className='form-group col-md-1'>
                    <div className='tag-list'>
                      {
                        (this.props.tagList || []).map(tag => {
                          return (
                            <span className='tag-default tag-pill' key={tag}>
                              <i  className='ion-close-round'
                                  onClick={this.removeTagHandler(tag)}>
                              </i>
                              {tag}
                            </span>
                          )
                        })
                      }
                    </div>
                  </fieldset>
                  <fieldset className='form-group col-md-2'>
                    <button
                      className='btn btn-xs btn-link'
                      type='button'
                      disabled={this.props.inProgress}
                      onClick={this.submitForm}>
                      <i className="ion-checkmark-round"></i>
                    </button>
                    <Link
                      to="/home"
                      className="btn pull-xs-right btn-outline-primary btn-sm btn-pad-right no-hover" style={{ border: '0', padding: '0.8rem 1rem' }}>
                      <i className="ion-close-round"></i>
                    </Link>
                  </fieldset>
                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
