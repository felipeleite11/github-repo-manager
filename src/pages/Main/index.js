import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'

import api from '../../services/api'

import { Form, SubmitButton, List, InputText, ErrorSpan } from './styles'
import Container from '../../components/Container'

export default class Main extends Component {
    state = {
        newRepo: 'rocketseat/unform',
        repositories: [],
        loading: false,
        repoNotFound: false,
        errorMsg: ''
    }

    handleInputChange = e => {
        this.setState({ 
            newRepo: e.target.value,
            repoNotFound: false,
            errorMsg: ''
        })
    }

    handleInputClick = e => {
        this.setState({ 
            repoNotFound: false,
            errorMsg: ''
        })
    }

    handleSubmit = async e => {
        e.preventDefault()

        const { newRepo, repositories } = this.state

        try {
            if(!newRepo) {
                throw new Error('Informe o nome do repositório.')
            }

            const repoAlreadyExists = repositories.find(repo => repo.name === newRepo)
            if(repoAlreadyExists) {
                throw new Error(`O repositório ${repoAlreadyExists.name} já foi adicionado.`)
            }
            
            this.setState({ loading: true })

            const response = await api.get(`/repos/${newRepo}`)

            const data = {
                id: response.data.id,
                name: response.data.full_name.toLowerCase()
            }

            this.setState({
                repositories: [
                    ...this.state.repositories,
                    data
                ],
                newRepo: '',
                loading: false
            })
        }
        catch(err) {
            this.setState({ 
                errorMsg: err.message.search('404') >= 0 ? `Repositório ${newRepo} não encontrado.` : err.message,
                repoNotFound: true,
                loading: false,
                newRepo: ''
            })

            this.refs.repoName.focus()
        }
    }

    componentDidMount() {
        const repositories = localStorage.getItem('repositories')

        if(repositories) {
            this.setState({
                repositories: JSON.parse(repositories)
            })
        }
    }

    componentDidUpdate(_, prevState) {
        const { repositories } = this.state

        if(prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories))
        }
    }
    
    render() {
        const { newRepo, repositories, loading, repoNotFound, errorMsg } = this.state

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>
    
                <Form onSubmit={this.handleSubmit}>
                    <InputText 
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newRepo}
                        ref="repoName"
                        onChange={this.handleInputChange}
                        onClick={this.handleInputClick}
                        notFound={repoNotFound}
                    />

                    <SubmitButton loading={loading}>
                        { 
                            loading ? 
                                (<FaSpinner color="#fff" size={14} />) :
                                (<FaPlus color="#fff" size={14} />)
                        }
                    </SubmitButton>
                </Form>

                <ErrorSpan>
                    {errorMsg}
                </ErrorSpan>

                <List>
                    {repositories.map(repository => (
                        <li key={repository.id}>
                            <span>{repository.name}</span>
                            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                        </li>
                    ))}
                </List>

            </Container>
        )        
    }
}
