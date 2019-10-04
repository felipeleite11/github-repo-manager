import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import api from '../../services/api'

import { Loading, Owner, IssueList, Filter, Pagination, IssuesCount } from './styles'
import Container from '../../components/Container'

export default class Repository extends Component {
    issuesPerPage = 10

    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string
            })
        }).isRequired
    }

    state = {
        repository: {},
        issues: [],
        loading: true,
        state: 'all',
        page: 1,
        issuesCount: 0,
        pagesCount: 0
    }

    async componentDidMount() {
        const { match } = this.props
        const { state } = this.state
        const repositoryName = decodeURIComponent(match.params.repository)
        
        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repositoryName}`),
            api.get(`/repos/${repositoryName}/issues`, {
                params: {
                    state,
                    per_page: this.issuesPerPage
                }
            })
        ])

        this.defineIssuesCount(repositoryName)

        this.setState({ 
            repository: repository.data,
            issues: issues.data,
            loading: false,
        })
    }

    defineIssuesCount = async repositoryName => {
        const { state } = this.state

        const repoSearch = await api.get(`/search/issues?q=repo:${repositoryName}+type:issue${state !== 'all' ? '+state:' + state : ''}`)
        const issuesCount = repoSearch.data.total_count

        const pagesCount = Math.ceil(issuesCount / this.issuesPerPage)

        this.setState({ 
            issuesCount,
            pagesCount
        })
    }

    handleFilterChange = async e => {
        const { repository } = this.state
        const state = e.target.value
        
        const issues = await api.get(`/repos/${repository.full_name.toLowerCase()}/issues`, { params: state !== 'all' ? { 
            state,
            page: 1,
            per_page: this.issuesPerPage
        } : {
            page: 1,
            per_page: this.issuesPerPage
        }})

        this.setState({ 
            issues: issues.data,
            page: 1,
            state
        }, () => {
            this.defineIssuesCount(repository.full_name.toLowerCase())
        })
    }

    handlePageChange = async sign => {
        let { repository, page, state, pagesCount } = this.state

        if(sign === '-') {
            if(page > 1) page--
        }
        else {
            if(page < pagesCount) page++
        }

        const issues = await api.get(`/repos/${repository.full_name}/issues`, {
            params: state === 'all' ? {
                state,
                page,
                per_page: this.issuesPerPage
            } : {
                page,
                per_page: this.issuesPerPage
            }
        })

        this.setState({ 
            page,
            issues: issues.data
        })
    }

    render() {
        const { repository, issues, loading, page, issuesCount, pagesCount } = this.state

        if(loading) {
            return <Loading>Aguarde...</Loading>
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar</Link>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <Filter>
                    <select onChange={this.handleFilterChange}>
                        <option value="all">Todas</option>
                        <option value="open">Abertas</option>
                        <option value="closed">Fechadas</option>
                    </select>
                </Filter>

                <Pagination>
                    <button onClick={() => this.handlePageChange('-')} disabled={page === 1}>
                        <FaArrowLeft />
                    </button>
                    <span>
                        {page}/{pagesCount}
                    </span>
                    <button onClick={() => this.handlePageChange('+')} disabled={page === pagesCount}>
                        <FaArrowRight />
                    </button>
                </Pagination>

                <IssuesCount>
                    <span>{issuesCount} issues</span>
                </IssuesCount>

                <IssueList>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />
                            <div>
                                <strong>
                                    <a href={issue.html_url} target="_blank" rel="noopener noreferrer">{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>
            </Container>
        )
    }
}
