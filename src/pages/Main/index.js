import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'

import api from '../../services/api'

import { Form, SubmitButton, List } from './styles'
import Container from '../../components/Container'

export default class Main extends Component {
    state = {
        newRepo: 'rocketseat/unform',
        repositories: [],
        loading: false
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({ loading: true })
        const { newRepo } = this.state
        const response = await api.get(`/repos/${newRepo}`)
        const data = {
            id: response.data.id,
            name: response.data.full_name
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
        const { newRepo, repositories, loading } = this.state

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>
    
                <Form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />
    
                    <SubmitButton loading={loading}>
                        { 
                            loading ? 
                                (<FaSpinner color="#fff" size={14} />) :
                                (<FaPlus color="#fff" size={14} />)
                        }
                    </SubmitButton>
                </Form>

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
