import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários'
}

const baseUrl = "http://localhost:8080/api/usersmodel";
const initialState = {
    user: { 
            nomeusuario: '',
            loginusuario: '',
            ativo: true,  
            senhausuario: '' 
        },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                "Content-Type": "application/json;charset=UTF-8"
            },
        }).then(resp => {
                //console.log(resp.data)
                this.setState({ list: resp.data })
            }).catch(function (error) {
                console.log(error);
            });
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.idusuario}` : baseUrl

        //console.log(user);
        axios[method](url, user,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                "Content-Type": "application/json;charset=UTF-8"
            },
        }).then(resp => {
            const list = this.getUpdateList(resp.data)
            this.setState({ user: initialState.user, list })
        }).catch(function (error) {
            console.log(error);
        });
    }

    getUpdateList(user) {
        const list = this.state.list.filter(u => u.idusuario !== user.idusuario)
        list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome:</label>
                            <input type="text" className="form-control"
                                name="nomeusuario"
                                value={this.state.user.nomeusuario}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome"
                            />
                        </div>
                    </div>
                </div>

                <div className="row ">
                    <div className="form-group col-12 col-md-3">
                        <label>Login:</label>
                        <input type="text" className="form-control"
                            name="loginusuario"
                            value={this.state.user.loginusuario}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o Login"
                        />
                    </div>
                    <div className="form-group col-12 col-md-3">
                        <label>Senha:</label>
                        <input type="password" className="form-control"
                            name="senhausuario"
                            value={this.state.user.senhausuario}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a senha"
                        />
                    </div>
                </div>

                <div className="row ">
                    <div className="form-group col-12 col-md-3">
                        <label>Ativo:</label>
                        <input type="text" className="form-control"
                            name="loginusuario"
                            value={this.state.user.loginusuario}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o Login"
                        />
                    </div>
                    <div className="form-group col-12 col-md-3">
                        <label>Dt/hr Último Acesso:</label>
                        <input type="text" className="form-control"
                            name="senhausuario"
                            value={this.state.user.senhausuario}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite a senha"
                        />
                    </div>
                </div>
                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {

        axios.delete(baseUrl, {
            data: user,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                "Content-Type": "application/json;charset=UTF-8"
            },
        }).then(resp => {
            const list = this.state.list.filter(u => u !== user)
            this.setState({ list })
        }).catch(function (error) {
            console.log(error);
        });
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Login</th>
                        <th>Situação</th>
                        <th>Último acesso</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(
            user => {

                let stateUser = user.ativo ? 'Ativo' : 'Inativo';

                return (
                    <tr key={user.idusuario}>
                        <td>{user.idusuario}</td>
                        <td>{user.nomeusuario}</td>
                        <td>{user.loginusuario}</td>
                        <td>{stateUser}</td>
                        <td>{this.formatDateTime(user.tmdataultimoacesso)}</td>
                        <td>
                            <button className="btn btn-warning"
                                onClick={() => this.load(user)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button className="btn btn-danger ml-2"
                                onClick={() => this.remove(user)}>
                                <i className="fa fa-trash"></i>
                            </button>

                        </td>
                    </tr>
                )
            }
        )
    }

    formatDateTime(date) {

        if(date == null){
            return 'Não possui acesso.'
        }else{
            let ano = date.substring(0, 4);
            let mes = date.substring(7, 5);
            let dia = date.substring(10, 8);
            let hr = date.substring(19, 11)
    
            return (dia + '/' + mes + '/' + ano + ' ' + hr);
        }

    }

    render() {
        //console.log(this.state.list);
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}